// Crisis handling is a deterministic, rules-based gate. It runs BEFORE the LLM
// (keyword pre-gate) and AFTER it (risk post-gate). No engine — LLM or
// fallback — can produce an outbound message on a crisis turn without this
// module deciding the reply and opening an incident. That invariant is the
// product's core safety promise; do not weaken it for demo polish.

export const CRISIS_PATTERNS = [
  /suicid/i,
  /kill (myself|me)/i,
  /end (my|it all)/i,
  /(hurt|harm)(ing)? myself/i,
  /no reason to live/i,
  /don'?t want to (live|be alive)/i,
  /want to die/i,
  /خودکشی/, // Urdu: suicide
  /انتحار/, // Arabic: suicide
  /مرنا چاہتا/, // Urdu: want to die
];

export function isCrisisText(text) {
  return CRISIS_PATTERNS.some((re) => re.test(text));
}

export const CRISIS_REPLY = {
  agent: 'escalation_safety',
  risk: 'emergency',
  topic: 'crisis',
  reply:
    "I hear you, and I want you to be safe right now. If you're in immediate danger, please call 999. You can also reach Qatar's National Mental Health Helpline confidentially on 16000, option 4. I'm alerting a human navigator to follow up with you directly — you don't have to go through this alone.",
  action:
    'Incident opened · human navigator alerted immediately · escalation per pre-agreed protocol',
};

export function isCrisisRisk(risk) {
  return risk === 'emergency' || risk === 'high';
}
