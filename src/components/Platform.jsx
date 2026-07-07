import { Waypoints, MessageCircle, Compass, BookOpen, ShieldAlert, BarChart3, Lock } from 'lucide-react';

const AGENTS = [
  {
    icon: MessageCircle,
    name: 'Intake & Triage Agent',
    body: 'Structured, in-language conversation — one question at a time — to understand what’s wrong. Outputs a risk level and routes accordingly.',
  },
  {
    icon: Compass,
    name: 'Navigator Agent',
    body: 'Books the human-navigator callback, licensed-partner referral or workshop slot, and sends reminders. Executes decisions; never makes clinical ones.',
  },
  {
    icon: BookOpen,
    name: 'Psychoeducation Agent',
    body: 'Delivers self-help modules and coping prompts from an approved content library only — never open-ended clinical advice.',
  },
  {
    icon: ShieldAlert,
    name: 'Escalation & Safety Agent',
    body: 'Owns the crisis protocol — low to imminent — with live handoff to a human navigator, official helpline, or emergency services. Never fires alone.',
  },
  {
    icon: BarChart3,
    name: 'Employer Insights Agent',
    body: 'Builds the anonymized dashboard: utilization, themes, site and language patterns, outcome trends. Structurally cannot see raw transcripts.',
  },
];

export default function Platform() {
  return (
    <section id="platform" className="bg-ink text-ivory">
      <div className="max-w-page mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow !text-gold">Agentic architecture, not a chatbot</p>
          <h2 className="font-display font-light text-4xl sm:text-5xl tracking-tight mt-4 leading-[1.08]">
            One orchestrator. Five specialist agents.
            <br />
            <em className="text-gold">Zero autonomous crisis decisions.</em>
          </h2>
          <p className="text-ivory/75 leading-relaxed mt-5">
            A single conversation — on WhatsApp, web, or a live voice call, with full parity across
            all three — arrives at an <strong className="text-ivory">Orchestrator</strong> that
            classifies intent and urgency, then routes it to the right specialist agent below.
            Voice isn&rsquo;t a bolted-on IVR; it&rsquo;s the same orchestrator, the same agents,
            the same governance, just spoken instead of typed.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {AGENTS.map((a, i) => (
            <article
              key={a.name}
              data-reveal
              style={{ '--reveal-delay': `${i * 90}ms` }}
              className="rounded-2xl bg-ivory/[0.04] border border-ivory/15 p-6 hover:bg-ivory/[0.07] transition-colors"
            >
              <span className="inline-flex w-10 h-10 rounded-xl bg-gold/15 items-center justify-center">
                <a.icon className="w-5 h-5 text-gold" />
              </span>
              <h3 className="font-display text-xl mt-4">{a.name}</h3>
              <p className="text-ivory/70 text-[0.92rem] leading-relaxed mt-2">{a.body}</p>
            </article>
          ))}

          {/* Governance card, visually distinct — the fence around every agent */}
          <article
            data-reveal
            style={{ '--reveal-delay': `${AGENTS.length * 90}ms` }}
            className="rounded-2xl bg-gold/10 border border-gold/40 p-6"
          >
            <span className="inline-flex w-10 h-10 rounded-xl bg-gold/25 items-center justify-center">
              <Lock className="w-5 h-5 text-gold" />
            </span>
            <h3 className="font-display text-xl mt-4 text-gold">Governance &amp; Control Tower</h3>
            <p className="text-ivory/70 text-[0.92rem] leading-relaxed mt-2">
              Not an agent — the fence around all of them. Consent ledger, audit log, redaction
              gate, retention policy. What a procurement officer is actually buying: proof every
              agent stayed inside its lane.
            </p>
          </article>
        </div>

        <div className="flex items-start gap-3 mt-10 rounded-2xl border border-ivory/15 bg-ivory/[0.03] px-6 py-5 max-w-3xl" data-reveal>
          <Waypoints className="w-5 h-5 text-gold mt-0.5 shrink-0" />
          <p className="text-ivory/60 text-sm leading-relaxed">
            Raaha is a navigation and early-support layer — not a clinic. We never diagnose, never
            prescribe, and never let AI handle a crisis alone. Serious situations route to human
            navigators, contracted clinical partners, national mental-health helplines, or
            emergency services, following pre-agreed, per-country protocols.
          </p>
        </div>
      </div>
    </section>
  );
}
