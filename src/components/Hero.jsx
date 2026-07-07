import { useEffect, useState } from 'react';
import { Mic, ArrowRight, UserRound, PlayCircle } from 'lucide-react';

const WORDS = [
  { text: 'ease', lang: 'en', cls: 'font-display italic' },
  { text: 'سكون', lang: 'ar', dir: 'rtl', cls: 'font-naskh' },
  { text: 'سکون', lang: 'ur', dir: 'rtl', cls: 'font-naskh' },
  { text: 'സമാധാനം', lang: 'ml', cls: 'font-mlym' },
  { text: 'ginhawa', lang: 'tl', cls: 'font-display italic' },
];

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="word-stack text-maroon">
      {WORDS.map((w, idx) => (
        <span key={w.lang} lang={w.lang} dir={w.dir} className={`${w.cls} ${idx === i ? 'active' : ''}`}>
          {w.text}
        </span>
      ))}
    </span>
  );
}

function Waveform() {
  return (
    <span className="flex items-center gap-[3px] h-4" aria-hidden="true">
      {[0.5, 0.9, 0.65, 1, 0.7, 0.45, 0.85].map((h, i) => (
        <span
          key={i}
          className="wave-bar w-[3px] rounded-full bg-oasis"
          style={{ height: `${h * 100}%`, animationDelay: `${i * 0.12}s` }}
        />
      ))}
    </span>
  );
}

const STATS = [
  { n: '33M+', d: 'GCC workforce Raaha is built to reach' },
  { n: '1 in 3', d: 'GCC employees report burnout symptoms' },
  { n: '5', d: 'launch languages, native-script and voice' },
  { n: '< 60s', d: 'to first supportive response, any shift, any hour' },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden star-field">
      <div className="max-w-page mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-12 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-8 items-center">
        {/* Editorial block */}
        <div>
          <p className="eyebrow rise" style={{ '--rise-delay': '0ms' }}>
            Employer wellbeing navigation · Middle East · launching from Doha
          </p>
          <h1
            className="rise font-display font-light text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.4rem] tracking-tight mt-5"
            style={{ '--rise-delay': '90ms' }}
          >
            The Middle East&rsquo;s workforce speaks five languages.
            <br />
            Their support should speak <RotatingWord />
            <span className="text-ink">.</span>
          </h1>
          <p
            className="rise text-ink-soft text-lg leading-relaxed max-w-xl mt-7"
            style={{ '--rise-delay': '180ms' }}
          >
            Raaha is an agentic wellbeing navigation OS for the Middle East&rsquo;s multilingual
            employers — a warm, voice-integrated AI that helps employees find the right support
            early, and gives HR anonymized insight instead of silence. It plugs into the services
            you already have; it doesn&rsquo;t replace them. Built in Pakistan, launching from Qatar,
            built for the region.
          </p>
          <div className="rise flex flex-wrap items-center gap-4 mt-9" style={{ '--rise-delay': '270ms' }}>
            <a
              href="#pilot"
              className="inline-flex items-center gap-2 rounded-full bg-maroon hover:bg-maroon-deep text-ivory font-semibold px-7 py-3.5 transition-colors"
            >
              Request the 12-week pilot <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#platform"
              className="inline-flex items-center gap-2 rounded-full border border-ink/25 hover:border-maroon hover:text-maroon font-semibold px-7 py-3.5 transition-colors"
            >
              See how it works
            </a>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 text-ink-soft hover:text-maroon font-semibold px-2 py-3.5 transition-colors"
            >
              <PlayCircle className="w-5 h-5" /> Try the live demo
            </a>
          </div>
        </div>

        {/* Conversation mock */}
        <div className="rise relative" style={{ '--rise-delay': '320ms' }}>
          <div className="absolute -inset-6 rounded-[2rem] bg-sand/70 rotate-[1.5deg]" aria-hidden="true" />
          <div className="relative rounded-[1.6rem] bg-white shadow-[0_24px_60px_-24px_rgba(30,43,43,0.35)] border border-ink/10 p-5 sm:p-6">
            <div className="flex items-center justify-between pb-4 border-b border-ink/10">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-full bg-oasis-soft flex items-center justify-center">
                  <Mic className="w-4 h-4 text-oasis" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Raaha assistant</p>
                  <p className="text-xs text-ink-soft">WhatsApp · confidential</p>
                </div>
              </div>
              <Waveform />
            </div>

            <div className="flex flex-col gap-3 pt-4 text-[0.92rem] leading-relaxed">
              <div className="self-end max-w-[85%] rounded-2xl rounded-br-sm bg-oasis-soft px-4 py-3">
                <p dir="rtl" lang="ur" className="font-naskh text-base">
                  نیند نہیں آتی، کام کا بہت دباؤ ہے
                </p>
                <p className="text-xs text-ink-soft mt-1.5 italic">
                  &ldquo;I can&rsquo;t sleep, the work pressure is heavy&rdquo; — voice note, Urdu
                </p>
              </div>
              <div className="self-start max-w-[88%] rounded-2xl rounded-bl-sm bg-ivory border border-ink/10 px-4 py-3">
                <p>
                  That sounds exhausting, and you did the right thing saying it out loud. Would a
                  short sleep routine help tonight, or would you rather talk to a human navigator
                  tomorrow morning — in Urdu?
                </p>
              </div>
              <div className="self-start flex items-center gap-2 rounded-xl bg-sand/70 border border-gold/30 px-3.5 py-2.5">
                <UserRound className="w-4 h-4 text-maroon" />
                <p className="text-xs font-medium">
                  Navigator callback booked · 9:00 AM · Urdu · logged anonymously
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stat strip */}
      <div className="border-y border-ink/15 bg-ivory/70">
        <div className="max-w-page mx-auto px-5 sm:px-8 grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.n}
              data-reveal
              style={{ '--reveal-delay': `${i * 80}ms` }}
              className={`py-6 sm:py-7 pr-6 ${i > 0 ? 'lg:border-l lg:border-ink/15 lg:pl-6' : ''}`}
            >
              <p className="font-display text-3xl sm:text-4xl text-maroon">{s.n}</p>
              <p className="text-sm text-ink-soft mt-1.5 leading-snug">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
