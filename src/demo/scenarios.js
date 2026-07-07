// Scripted demo responses only — no LLM call, no backend. Every reply below is
// hand-written and fixed; free-text input is matched against these triggers.
// Crisis keywords always win, regardless of language or other matches.

export const CRISIS_KEYWORDS = [
  'suicide', 'kill myself', 'end my life', 'harm myself', 'hurt myself', 'no reason to live',
  'خودکشی', 'انتحار',
];

export const CRISIS_TURN = {
  agent: 'Escalation & Safety Agent',
  agentColor: 'maroon',
  risk: 'emergency',
  reply:
    "I hear you, and I want you to be safe right now. If you're in immediate danger, please call 999. You can also reach Qatar's National Mental Health Helpline confidentially on 16000, option 4. I'm connecting a human navigator to follow up with you directly — you don't have to go through this alone.",
  action: 'Incident created · human navigator alerted immediately · pre-consented employer contact notified per protocol',
};

export const FALLBACK_TURN = {
  agent: 'Psychoeducation Agent',
  agentColor: 'oasis',
  risk: 'low',
  reply:
    "Thank you for sharing that. It sounds like something worth talking through properly. Would you like a few self-help resources for this, or would you prefer I connect you with a human navigator?",
  action: null,
};

export const SCENARIOS = [
  {
    id: 'sleep',
    label: 'Sleep & work stress',
    lang: 'ur',
    dir: 'rtl',
    userText: 'نیند نہیں آتی، کام کا بہت دباؤ ہے',
    userTranslation: '"I can\'t sleep, the work pressure is heavy"',
    keywords: ['sleep', 'insomnia', 'tired', 'نیند'],
    turns: [
      { agent: 'Intake & Triage Agent', agentColor: 'gold', risk: 'low', reply: 'That sounds exhausting, and you did the right thing saying it out loud. On a rough night, how many hours would you say you\'re actually sleeping?' },
      { agent: 'Psychoeducation Agent', agentColor: 'oasis', risk: 'low', reply: 'A short wind-down routine before bed — screens off, lights low, one calming task — often helps within a few nights. Want me to send you a 5-minute audio version in Urdu, or would you rather talk to a human navigator tomorrow morning?' },
      { agent: 'Navigator Agent', agentColor: 'maroon', risk: 'low', reply: 'Done — I\'ve booked a navigator callback for 9:00 AM tomorrow, in Urdu.', action: 'Navigator callback booked · 9:00 AM · Urdu · logged anonymously' },
    ],
  },
  {
    id: 'burnout',
    label: 'Manager & burnout',
    lang: 'en',
    dir: 'ltr',
    userText: "My manager keeps piling on tasks and I feel completely burnt out.",
    userTranslation: null,
    keywords: ['burnout', 'burnt out', 'manager', 'overload', 'exhausted'],
    turns: [
      { agent: 'Intake & Triage Agent', agentColor: 'gold', risk: 'moderate', reply: 'That\'s a heavy load to carry, and burnout like this is exactly the kind of thing worth escalating past self-help. I\'d like to connect you with a human navigator rather than just sending resources — is that alright?' },
      { agent: 'Navigator Agent', agentColor: 'maroon', risk: 'moderate', reply: 'I\'ve booked you a confidential callback with a navigator within 24 hours. They can also loop in a manager-coaching resource if that would help — entirely your call.', action: 'Navigator callback booked · within 24h · English · risk flagged moderate (aggregate only)' },
    ],
  },
  {
    id: 'financial',
    label: 'Financial & housing stress',
    lang: 'ar',
    dir: 'rtl',
    userText: 'الإيجار والمصاريف يسببان لي ضغطاً كبيراً هذا الشهر',
    userTranslation: '"Rent and expenses are causing me a lot of pressure this month"',
    keywords: ['rent', 'money', 'financial', 'مصاريف', 'إيجار'],
    turns: [
      { agent: 'Intake & Triage Agent', agentColor: 'gold', risk: 'low', reply: 'شكراً لمشاركتك هذا. الضغط المالي مرهق فعلاً. هل تود بعض موارد التخطيط المالي، أم تفضل التحدث مع مرشد بشري؟' },
      { agent: 'Psychoeducation Agent', agentColor: 'oasis', risk: 'low', reply: 'حسناً — إليك دليل قصير للتخطيط المالي بالعربية، وأنا هنا إن احتجت لاحقاً.', action: 'Self-help resource sent · Arabic · logged anonymously' },
    ],
  },
];
