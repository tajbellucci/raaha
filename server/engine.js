// Orchestrator engine. Two paths, one contract:
//  - LLM path: claude-opus-4-8 with structured outputs (guaranteed-valid JSON
//    triage object). Active when Anthropic credentials resolve.
//  - Deterministic fallback: keyword-routed scripted replies. Active with zero
//    credentials so the prototype always runs.
// Crisis turns never reach either path — server/safety.js pre-gates them.

import Anthropic from '@anthropic-ai/sdk';
import { culturalContext } from './culture.js';

export const MODEL = process.env.RAAHA_MODEL || 'claude-opus-4-8';

const TRIAGE_SCHEMA = {
  type: 'object',
  properties: {
    agent: {
      type: 'string',
      enum: ['intake_triage', 'psychoeducation', 'navigator', 'escalation_safety'],
      description: 'Which specialist agent produced this turn',
    },
    risk: { type: 'string', enum: ['low', 'moderate', 'high', 'emergency'] },
    topic: {
      type: 'string',
      enum: ['stress', 'sleep', 'burnout', 'manager', 'family', 'financial', 'homesick', 'crisis', 'other'],
    },
    language: { type: 'string', description: 'BCP-47-ish tag of the language you replied in, e.g. ur, ar, en, ml, tl' },
    reply: { type: 'string', description: 'The message to send the employee, in their language' },
    action: {
      type: ['string', 'null'],
      description: 'Operational action taken (booking, referral, resource sent), phrased for an audit chip; null if none',
    },
  },
  required: ['agent', 'risk', 'topic', 'language', 'reply', 'action'],
  additionalProperties: false,
};

const SYSTEM_PROMPT = `You are Raaha, a multilingual employee wellbeing navigation assistant for employers in the Gulf. You are a navigation and early-support layer — NOT a clinic and NOT a therapist.

You orchestrate four specialist roles and answer as exactly one of them each turn:
- intake_triage: first contact; understand what's wrong with warm, short questions, one at a time; classify risk.
- psychoeducation: brief evidence-aligned self-help for low-risk topics (sleep routines, stress, homesickness, financial-stress coping). Only content a clinician would consider safe psychoeducation.
- navigator: book a human callback or send a referral/resource when the user accepts one, or when risk is moderate. State the booking plainly (time window, language).
- escalation_safety: you will almost never use this — the server handles crisis turns before you see them. If you still judge risk high/emergency, use this role; the server will override your reply with the official protocol.

Hard rules:
1. Never diagnose, never name disorders as verdicts, never prescribe, never promise confidentiality beyond platform policy.
2. Reply in the user's language (Urdu, Arabic, English, Malayalam, Tagalog — including Roman-script Urdu/Hindi). Match their script.
3. Keep replies short and warm: 1–3 sentences, one question maximum.
4. Moderate risk (persistent distress, hopeless tone without danger, workplace conflict escalating) → offer a human navigator callback; if accepted or clearly needed, role=navigator with a concrete booking in "action".
5. Anything suggesting danger to self or others → risk=high or emergency.
6. Culturally attuned, not stereotyped: acknowledge realities (distance from family, remittance pressure, shift work) without assuming them.`;

// ---------------- LLM path ----------------

let client = null;
function getClient() {
  if (!client) client = new Anthropic();
  return client;
}

export function llmConfigured() {
  return Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);
}

export async function llmTurn(history, userText) {
  const flags = culturalContext();
  const contextNote = flags.length
    ? `\n\nCurrent context for the workforce (weave in only when relevant, never recite):\n- ${flags.join('\n- ')}`
    : '';

  const messages = [
    ...history.map((m) => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.content,
    })),
    { role: 'user', content: userText },
  ];

  const response = await getClient().messages.create({
    model: MODEL,
    max_tokens: 8192,
    system: SYSTEM_PROMPT + contextNote,
    messages,
    output_config: { format: { type: 'json_schema', schema: TRIAGE_SCHEMA } },
  });

  if (response.stop_reason === 'refusal') {
    return {
      agent: 'navigator',
      risk: 'moderate',
      topic: 'other',
      language: 'en',
      reply:
        "I want to make sure you get the right kind of help for this. Let me connect you with a human navigator who can talk it through with you properly.",
      action: 'Navigator callback offered · model declined to answer directly',
      engine: 'llm',
    };
  }

  const text = response.content.find((b) => b.type === 'text')?.text ?? '{}';
  const parsed = JSON.parse(text); // structured outputs guarantee schema-valid JSON
  return { ...parsed, engine: 'llm' };
}

// ---------------- Deterministic fallback path ----------------

const FALLBACK_ROUTES = [
  {
    match: /sleep|insomnia|tired|نیند|thak/i,
    topic: 'sleep',
    turns: [
      {
        agent: 'intake_triage',
        reply:
          "That sounds exhausting, and you did the right thing saying it out loud. On a rough night, how many hours would you say you're actually sleeping?",
      },
      {
        agent: 'psychoeducation',
        reply:
          'A short wind-down routine before bed — screens off, lights low, one calming task — often helps within a few nights. Want me to book a human navigator callback instead, in your language?',
      },
      {
        agent: 'navigator',
        reply: "Done — I've booked a navigator callback for tomorrow morning, in your preferred language.",
        action: 'Navigator callback booked · next morning · logged anonymously',
      },
    ],
  },
  {
    match: /burn|manager|overload|workload|boss|exhaust/i,
    topic: 'burnout',
    turns: [
      {
        agent: 'intake_triage',
        reply:
          "That's a heavy load to carry, and it's worth more than self-help tips. I'd like to connect you with a human navigator rather than just sending resources — is that alright?",
      },
      {
        agent: 'navigator',
        reply:
          "I've booked you a confidential callback with a navigator within 24 hours. Entirely your call what you share.",
        action: 'Navigator callback booked · within 24h · risk noted moderate (aggregate only)',
      },
    ],
  },
  {
    match: /rent|money|salary|debt|financial|مصاريف|إيجار|qarz/i,
    topic: 'financial',
    turns: [
      {
        agent: 'intake_triage',
        reply:
          'Thank you for sharing that — money pressure is genuinely draining. Would some financial-planning resources help, or would you rather talk it through with a human navigator?',
      },
      {
        agent: 'psychoeducation',
        reply: "Here's a short budgeting-under-pressure guide. I'm here if you want to talk more.",
        action: 'Self-help resource sent · logged anonymously',
      },
    ],
  },
];

const FALLBACK_DEFAULT = {
  agent: 'psychoeducation',
  risk: 'low',
  topic: 'other',
  language: 'en',
  reply:
    'Thank you for sharing that. It sounds like something worth talking through properly. Would you like a few self-help resources, or would you prefer I connect you with a human navigator?',
  action: null,
};

const fallbackState = new Map(); // sessionId -> { topic, step }

export function fallbackTurn(sessionId, userText) {
  const prev = fallbackState.get(sessionId);
  const route =
    (prev && FALLBACK_ROUTES.find((r) => r.topic === prev.topic)) ||
    FALLBACK_ROUTES.find((r) => r.match.test(userText));

  if (!route) return { ...FALLBACK_DEFAULT, engine: 'deterministic' };

  const step = prev && prev.topic === route.topic ? Math.min(prev.step + 1, route.turns.length - 1) : 0;
  fallbackState.set(sessionId, { topic: route.topic, step });
  const turn = route.turns[step];
  return {
    agent: turn.agent,
    risk: route.topic === 'burnout' ? 'moderate' : 'low',
    topic: route.topic,
    language: 'en',
    reply: turn.reply,
    action: turn.action ?? null,
    engine: 'deterministic',
  };
}
