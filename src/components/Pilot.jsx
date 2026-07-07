import { Check, ArrowRight } from 'lucide-react';

const CONTACT =
  'mailto:pactofficialorg@gmail.com?subject=Raaha%2012-week%20pilot%20—%20[Company]&body=Company%3A%0AEmployees%20covered%3A%0ASectors%2Fsites%3A%0ALanguages%20needed%3A%0APreferred%20start%3A';

const TIERS = [
  {
    name: 'Pilot Lite',
    price: 'QAR 25,000',
    scope: 'Up to 250 employees',
    features: ['WhatsApp + web support', 'One language pair', 'HR dashboard', 'One on-site workshop'],
    featured: false,
  },
  {
    name: 'Pilot Core',
    price: 'QAR 45,000',
    scope: 'Up to 1,000 employees',
    features: [
      'Everything in Lite',
      'Multilingual triage (up to 4 languages)',
      'Human navigator SLA',
      'Two workshops + manager intake',
    ],
    featured: true,
  },
  {
    name: 'Pilot Plus',
    price: 'QAR 85,000',
    scope: 'Up to 3,000 employees',
    features: [
      'Everything in Core',
      'Voice AI check-ins',
      'Site / camp segmentation',
      'Manager training + weekly executive report',
    ],
    featured: false,
  },
];

export default function Pilot() {
  return (
    <section id="pilot" className="bg-sand/60 star-field border-y border-ink/10">
      <div className="max-w-page mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow">The 12-week pilot</p>
          <h2 className="font-display font-light text-4xl sm:text-5xl tracking-tight mt-4 leading-[1.08]">
            Prove it on <em className="text-maroon">your</em> workforce, before any annual contract.
          </h2>
          <p className="text-ink-soft text-lg leading-relaxed mt-5">
            Twelve weeks, real employees, weekly anonymized reporting. At the end you hold the
            evidence: utilization, response times, themes, and what your people actually needed.
            Convert to an annual plan (QAR 8–30 per employee per month) only if the numbers earn it.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-14 items-stretch">
          {TIERS.map((t, i) => (
            <article
              key={t.name}
              data-reveal
              style={{ '--reveal-delay': `${i * 110}ms` }}
              className={`relative rounded-2xl p-7 flex flex-col ${
                t.featured
                  ? 'bg-ink text-ivory shadow-[0_28px_60px_-24px_rgba(30,43,43,0.6)] md:-translate-y-2'
                  : 'bg-white border border-ink/10 shadow-[0_12px_36px_-24px_rgba(30,43,43,0.4)]'
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-maroon text-ivory text-xs font-semibold tracking-wide px-3.5 py-1.5">
                  Most chosen
                </span>
              )}
              <h3 className="font-display text-2xl">{t.name}</h3>
              <p className={`text-sm mt-1 ${t.featured ? 'text-ivory/70' : 'text-ink-soft'}`}>{t.scope} · 12 weeks</p>
              <p className={`font-display text-4xl mt-5 ${t.featured ? 'text-gold' : 'text-maroon'}`}>{t.price}</p>
              <ul className="flex flex-col gap-2.5 mt-6 mb-8">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-[0.95rem] leading-snug">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${t.featured ? 'text-gold' : 'text-oasis'}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={CONTACT}
                className={`mt-auto inline-flex items-center justify-center gap-2 rounded-full font-semibold px-6 py-3 transition-colors ${
                  t.featured
                    ? 'bg-maroon hover:bg-maroon-deep text-ivory'
                    : 'border border-ink/25 hover:border-maroon hover:text-maroon'
                }`}
              >
                Start with {t.name.split(' ')[1]} <ArrowRight className="w-4 h-4" />
              </a>
            </article>
          ))}
        </div>

        <p className="text-sm text-ink-soft mt-8 max-w-2xl" data-reveal>
          <span className="font-semibold text-maroon">Founding cohort:</span> we are onboarding
          three design-partner employers in Doha this quarter at pilot pricing locked for the first
          annual term. Design partners shape the referral directory and language QA.
        </p>
      </div>
    </section>
  );
}
