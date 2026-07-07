import { Mic } from 'lucide-react';

const LANGS = [
  { name: 'Arabic', native: 'العربية', dir: 'rtl', lang: 'ar', cls: 'font-naskh' },
  { name: 'English', native: 'English', lang: 'en', cls: 'font-display italic' },
  { name: 'Urdu · Hindi', native: 'اردو', dir: 'rtl', lang: 'ur', cls: 'font-naskh' },
  { name: 'Malayalam', native: 'മലയാളം', lang: 'ml', cls: 'font-mlym' },
  { name: 'Tagalog', native: 'Tagalog', lang: 'tl', cls: 'font-display italic' },
];

const SECTORS = ['Hospitality', 'Facilities management', 'Logistics', 'Healthcare', 'Education', 'Staffing & services'];

export default function Languages() {
  return (
    <section id="languages" className="max-w-page mx-auto px-5 sm:px-8 py-20 sm:py-28">
      <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-start">
        <div data-reveal>
          <p className="eyebrow">An authentic voice</p>
          <h2 className="font-display font-light text-4xl sm:text-5xl tracking-tight mt-4 leading-[1.08]">
            Stigma doesn&rsquo;t fill in forms. <em className="text-maroon">It talks — quietly, in its mother tongue.</em>
          </h2>
          <p className="text-ink-soft text-lg leading-relaxed mt-5">
            76.7% of Qatar&rsquo;s population is expatriate. A worker who would never email HR about
            stress will send a voice note at midnight in Urdu. Raaha answers in kind: a warm,
            culturally attuned voice — not a chatbot script translated five times. Every language
            gets native source content, cultural phrasing and human review on sensitive replies,
            not machine translation.
          </p>
          <div className="flex items-center gap-3 mt-8 rounded-2xl bg-oasis-soft border border-oasis/20 px-5 py-4 max-w-md">
            <Mic className="w-5 h-5 text-oasis shrink-0" />
            <p className="text-sm leading-snug">
              Voice-first by design: for low-literacy, fatigued or deskless teams, speaking is the
              only interface that works.
            </p>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {LANGS.map((l, i) => (
              <div
                key={l.name}
                data-reveal
                style={{ '--reveal-delay': `${i * 90}ms` }}
                className="rounded-2xl bg-white border border-ink/10 px-5 py-6 text-center shadow-[0_10px_30px_-22px_rgba(30,43,43,0.45)]"
              >
                <p dir={l.dir} lang={l.lang} className={`${l.cls} text-2xl sm:text-[1.7rem] text-ink`}>
                  {l.native}
                </p>
                <p className="text-xs uppercase tracking-[0.14em] text-ink-soft mt-2.5">{l.name}</p>
              </div>
            ))}
            <div
              data-reveal
              style={{ '--reveal-delay': '450ms' }}
              className="rounded-2xl border border-dashed border-ink/25 px-5 py-6 text-center flex flex-col items-center justify-center"
            >
              <p className="font-display italic text-xl text-ink-soft">+ yours</p>
              <p className="text-xs uppercase tracking-[0.14em] text-ink-soft mt-2.5">Nepali, Bangla next</p>
            </div>
          </div>

          <div className="mt-8" data-reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">
              Built for multilingual, shift-based sectors
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {SECTORS.map((s) => (
                <span key={s} className="text-sm rounded-full bg-sand px-4 py-2">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
