import { ShieldCheck } from 'lucide-react';

const CONTROLS = [
  ['Anonymized-only reporting', 'HR dashboards show aggregates and trends. No raw transcripts, no names, no individual flags — contractually and technically.'],
  ['Qatar data-privacy alignment', 'Designed around Law No. 13 of 2016 (Personal Data Privacy Protection): minimum-necessary data, lawful basis, disclosure duties.'],
  ['Consent ledger', 'Explicit, versioned, withdrawable consent for every employee — logged immutably, honored instantly.'],
  ['PII redaction before analytics', 'Names, numbers, IDs and medical specifics are stripped before anything reaches reporting or model pipelines.'],
  ['Human-reviewed escalation', 'Crisis handling is a rules-based protocol with human navigators — never an autonomous chatbot decision.'],
  ['Data residency posture', 'Qatar-region hosting by default for sensitive data, with audit logs, retention limits and role-based access.'],
];

export default function Privacy() {
  return (
    <section id="privacy" className="max-w-page mx-auto px-5 sm:px-8 py-20 sm:py-28">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12">
        <div data-reveal>
          <p className="eyebrow">Privacy is the product</p>
          <h2 className="font-display font-light text-4xl sm:text-5xl tracking-tight mt-4 leading-[1.08]">
            Trust is built <em className="text-maroon">before</em> the first conversation.
          </h2>
          <p className="text-ink-soft text-lg leading-relaxed mt-5">
            An employee who suspects HR can read their words will never send the first message.
            So the wall between individual conversations and employer reporting is Raaha&rsquo;s
            founding constraint — not a settings toggle.
          </p>
          <div className="inline-flex items-center gap-3 mt-8 rounded-2xl bg-white border border-ink/10 px-5 py-4">
            <ShieldCheck className="w-6 h-6 text-oasis" />
            <p className="text-sm font-medium">DPA, subprocessor register and retention policy available for procurement review.</p>
          </div>
        </div>

        <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-7">
          {CONTROLS.map(([t, d], i) => (
            <div key={t} data-reveal style={{ '--reveal-delay': `${i * 70}ms` }} className="rule-double pt-4">
              <dt className="font-semibold">{t}</dt>
              <dd className="text-sm text-ink-soft leading-relaxed mt-1.5">{d}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
