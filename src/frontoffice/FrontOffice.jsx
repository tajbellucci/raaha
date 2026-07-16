import { useEffect, useState } from 'react';
import {
  ArrowRight, PhoneMissed, Languages as LangIcon, TrendingDown,
  MessageCircle, CalendarClock, BellRing, BarChart3, Check, ArrowLeft,
} from 'lucide-react';

// Working brand name — swap this one constant to rename the whole product.
const BRAND = 'Ahlan';
const BRAND_AR = 'أهلاً';

const PILOT_CONTACT =
  'mailto:pactofficialorg@gmail.com?subject=' +
  encodeURIComponent(`${BRAND} 30-day front-office pilot — [Business]`) +
  '&body=' +
  encodeURIComponent('Business:\nType (clinic/salon/training center/other):\nLocations:\nLanguages your customers use:\nPreferred start:');

function Mark({ className = 'w-6 h-6' }) {
  // Distinct from Raaha's star — a speech/reception mark, teal.
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      <path
        d="M6 7h20a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H14l-6 5v-5H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"
        fill="currentColor"
      />
      <circle cx="12" cy="14.5" r="1.6" fill="var(--ivory)" />
      <circle cx="16.5" cy="14.5" r="1.6" fill="var(--ivory)" />
      <circle cx="21" cy="14.5" r="1.6" fill="var(--ivory)" />
    </svg>
  );
}

const WORDS = [
  { text: 'welcome', lang: 'en', cls: 'font-display italic' },
  { text: 'أهلاً', lang: 'ar', dir: 'rtl', cls: 'font-naskh' },
  { text: 'خوش آمدید', lang: 'ur', dir: 'rtl', cls: 'font-naskh' },
  { text: 'സ്വാഗതം', lang: 'ml', cls: 'font-mlym' },
  { text: 'mabuhay', lang: 'tl', cls: 'font-display italic' },
];

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="word-stack text-oasis">
      {WORDS.map((w, idx) => (
        <span key={w.lang} lang={w.lang} dir={w.dir} className={`${w.cls} ${idx === i ? 'active' : ''}`}>
          {w.text}
        </span>
      ))}
    </span>
  );
}

const STATS = [
  { n: '5', d: 'languages, switched mid-conversation like your customers actually talk' },
  { n: '24/7', d: 'every missed call, weekend WhatsApp and midnight booking answered' },
  { n: '< 60s', d: 'to first reply — on WhatsApp, voice, or web' },
  { n: '0', d: 'staff hours spent on reminders, reschedules and no-show chasing' },
];

const PAINS = [
  {
    icon: PhoneMissed,
    title: 'The call that rang out',
    body: 'A missed call at a clinic, salon or training center isn’t a statistic — it’s a booking that went to whoever picked up. After hours and across shifts, the front desk is the leakiest point in the business, and hiring more receptionists only moves the leak.',
  },
  {
    icon: LangIcon,
    title: 'Software that speaks one language',
    body: 'Your customer opens in Arabic, gives details in Urdu, confirms in English — one WhatsApp thread. Tools sold into the Gulf handle exactly one of those, so staff drop back to manual replies and the tool goes unused.',
  },
  {
    icon: TrendingDown,
    title: 'Follow-up that never happens',
    body: 'No-shows unreminded, quotes unanswered, invoices unchased — because follow-up is nobody’s job at 9 PM. Revenue leaks quietly between visits, and no dashboard ever shows the number.',
  },
];

const AGENTS = [
  {
    icon: MessageCircle,
    name: 'Reception Agent',
    body: 'Answers every call, WhatsApp and web message in the language the customer opened with. Understands what they want, one question at a time, and routes it.',
  },
  {
    icon: CalendarClock,
    name: 'Scheduling Agent',
    body: 'Books, moves and confirms appointments against your real calendar — and never double-books. Anything outside your rules comes straight to you.',
  },
  {
    icon: BellRing,
    name: 'Follow-up & Payments Agent',
    body: 'Reminders before the visit, check-ins after, quotes followed up, invoices nudged — the after-hours work that quietly recovers revenue.',
  },
  {
    icon: BarChart3,
    name: 'Owner Insights Agent',
    body: 'A weekly picture: calls recovered, bookings made, busiest hours, language mix, revenue saved. The pilot’s own scoreboard.',
  },
];

const SECTORS = ['Clinics & dental', 'Salons & spas', 'Training centers', 'Property & real estate', 'Hospitality', 'Trading & services'];

const LANGS = [
  { name: 'Arabic', native: 'العربية', dir: 'rtl', lang: 'ar', cls: 'font-naskh' },
  { name: 'English', native: 'English', lang: 'en', cls: 'font-display italic' },
  { name: 'Urdu · Hindi', native: 'اردو', dir: 'rtl', lang: 'ur', cls: 'font-naskh' },
  { name: 'Malayalam', native: 'മലയാളം', lang: 'ml', cls: 'font-mlym' },
  { name: 'Tagalog', native: 'Tagalog', lang: 'tl', cls: 'font-display italic' },
];

const PILOT_FEATURES = [
  'Every missed call answered on WhatsApp within 60 seconds',
  'Bookings, reschedules and confirmations against your calendar',
  'Reminders, follow-ups and payment nudges on autopilot',
  'Your customers’ languages — code-switch native',
  'Weekly recovered-revenue report',
];

export default function FrontOffice() {
  useEffect(() => {
    document.title = `${BRAND} — An AI front desk for Gulf service businesses`;
    const els = document.querySelectorAll('[data-reveal]');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grain">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-ivory/90 backdrop-blur-md border-b border-ink/10">
        <nav className="max-w-page mx-auto flex items-center justify-between px-5 sm:px-8 py-4">
          <a href="#top" className="flex items-center gap-2.5 text-ink">
            <Mark className="w-7 h-7 text-oasis" />
            <span className="font-display text-xl font-semibold tracking-tight">{BRAND}</span>
            <span dir="rtl" lang="ar" className="font-naskh text-lg text-ink-soft hidden sm:inline">
              {BRAND_AR}
            </span>
          </a>
          <div className="hidden md:flex items-center gap-7">
            <a href="#how" className="text-sm font-medium text-ink-soft hover:text-oasis transition-colors">How it works</a>
            <a href="#who" className="text-sm font-medium text-ink-soft hover:text-oasis transition-colors">Who it’s for</a>
            <a href="#pricing" className="text-sm font-medium text-ink-soft hover:text-oasis transition-colors">Pricing</a>
            <a href={PILOT_CONTACT} className="rounded-full bg-oasis hover:bg-[#255952] text-ivory text-sm font-semibold px-5 py-2.5 transition-colors">
              Book a pilot
            </a>
          </div>
          <a href="#top" className="md:hidden rounded-full bg-oasis text-ivory text-sm font-semibold px-4 py-2">Book</a>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section id="top" className="relative overflow-hidden star-field">
          <div className="max-w-page mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-12 grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-8 items-center">
            <div>
              <p className="rise text-xs font-semibold uppercase tracking-[0.22em] text-oasis" style={{ '--rise-delay': '0ms' }}>
                Agentic AI front desk · Gulf service businesses · from Doha
              </p>
              <h1 className="rise font-display font-light text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.4rem] tracking-tight mt-5" style={{ '--rise-delay': '90ms' }}>
                Never miss another booking.
                <br />
                Your front desk says <RotatingWord />
                <span className="text-ink">.</span>
              </h1>
              <p className="rise text-ink-soft text-lg leading-relaxed max-w-xl mt-7" style={{ '--rise-delay': '180ms' }}>
                {BRAND} is an AI front desk for the Gulf&rsquo;s service businesses — a team of agents
                that answers every call and WhatsApp, books and reschedules appointments, and chases
                the reminders and payments, switching between Arabic, English, Urdu, Malayalam and
                Tagalog the way your customers actually talk.
              </p>
              <div className="rise flex flex-wrap items-center gap-4 mt-9" style={{ '--rise-delay': '270ms' }}>
                <a href={PILOT_CONTACT} className="inline-flex items-center gap-2 rounded-full bg-oasis hover:bg-[#255952] text-ivory font-semibold px-7 py-3.5 transition-colors">
                  Book a 30-day pilot <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#how" className="inline-flex items-center gap-2 rounded-full border border-ink/25 hover:border-oasis hover:text-oasis font-semibold px-7 py-3.5 transition-colors">
                  See how it works
                </a>
              </div>
            </div>

            {/* Conversation mock */}
            <div className="rise relative" style={{ '--rise-delay': '320ms' }}>
              <div className="absolute -inset-6 rounded-[2rem] bg-oasis-soft/70 rotate-[1.5deg]" aria-hidden="true" />
              <div className="relative rounded-[1.6rem] bg-white shadow-[0_24px_60px_-24px_rgba(30,43,43,0.35)] border border-ink/10 p-5 sm:p-6">
                <div className="flex items-center justify-between pb-4 border-b border-ink/10">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-full bg-oasis-soft flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-oasis" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{BRAND} front desk</p>
                      <p className="text-xs text-ink-soft">WhatsApp · after closing time</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 pt-4 text-[0.92rem] leading-relaxed">
                  <div className="self-end max-w-[85%] rounded-2xl rounded-br-sm bg-oasis-soft px-4 py-3">
                    <p dir="rtl" lang="ur" className="font-naskh text-base">
                      کل کی اپائنٹمنٹ جمعرات شام کر سکتے ہیں؟
                    </p>
                    <p className="text-xs text-ink-soft mt-1.5 italic">
                      &ldquo;Can you move tomorrow&rsquo;s appointment to Thursday evening?&rdquo; — voice note, Urdu
                    </p>
                  </div>
                  <div className="self-start max-w-[88%] rounded-2xl rounded-bl-sm bg-ivory border border-ink/10 px-4 py-3">
                    <p>
                      Of course — Thursday has 6:00 or 7:30 PM open with the same specialist. Shall I
                      book 6:00 and send the reminder in Urdu, as usual?
                    </p>
                  </div>
                  <div className="self-start flex items-center gap-2 rounded-xl bg-sand/70 border border-gold/30 px-3.5 py-2.5">
                    <CalendarClock className="w-4 h-4 text-oasis" />
                    <p className="text-xs font-medium">Rebooked · Thursday 6:00 PM · reminder scheduled · zero staff time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stat strip */}
          <div className="border-y border-ink/15 bg-ivory/70">
            <div className="max-w-page mx-auto px-5 sm:px-8 grid grid-cols-2 lg:grid-cols-4">
              {STATS.map((s, i) => (
                <div key={s.d} data-reveal style={{ '--reveal-delay': `${i * 80}ms` }}
                  className={`py-6 sm:py-7 pr-6 ${i > 0 ? 'lg:border-l lg:border-ink/15 lg:pl-6' : ''}`}>
                  <p className="font-display text-3xl sm:text-4xl text-oasis">{s.n}</p>
                  <p className="text-sm text-ink-soft mt-1.5 leading-snug">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem */}
        <section className="max-w-page mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <div className="max-w-2xl" data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oasis">The leak</p>
            <h2 className="font-display font-light text-4xl sm:text-5xl tracking-tight mt-4 leading-[1.08]">
              The demand exists. <em className="text-oasis">Answering it</em> is what fails.
            </h2>
            <p className="text-ink-soft text-lg leading-relaxed mt-5">
              The Gulf&rsquo;s service economy runs on WhatsApp, phone calls and walk-ins — in five
              languages, across every shift. What&rsquo;s missing is a front desk that answers every
              one of them, in the language the customer opened with, at the hour they asked.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mt-14">
            {PAINS.map((c, i) => (
              <article key={c.title} data-reveal style={{ '--reveal-delay': `${i * 110}ms` }}
                className="group rounded-2xl bg-white border border-ink/10 p-7 shadow-[0_12px_36px_-24px_rgba(30,43,43,0.4)] hover:-translate-y-1.5 hover:shadow-[0_20px_44px_-24px_rgba(47,109,98,0.35)] transition-all duration-300">
                <span className="inline-flex w-11 h-11 rounded-xl bg-oasis-soft items-center justify-center">
                  <c.icon className="w-5 h-5 text-oasis" />
                </span>
                <h3 className="font-display text-2xl mt-5">{c.title}</h3>
                <p className="text-ink-soft leading-relaxed mt-3 text-[0.95rem]">{c.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="bg-ink text-ivory">
          <div className="max-w-page mx-auto px-5 sm:px-8 py-20 sm:py-28">
            <div className="max-w-2xl" data-reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Agentic, not a chatbot</p>
              <h2 className="font-display font-light text-4xl sm:text-5xl tracking-tight mt-4 leading-[1.08]">
                One front desk. <em className="text-gold">Four agents behind it.</em>
              </h2>
              <p className="text-ivory/75 leading-relaxed mt-5">
                Every conversation — WhatsApp, web, or a live voice call — arrives at an orchestrator
                that works out what the customer wants and routes it to the right agent below. Voice
                isn&rsquo;t a bolted-on IVR; it&rsquo;s the same agents, spoken instead of typed.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
              {AGENTS.map((a, i) => (
                <article key={a.name} data-reveal style={{ '--reveal-delay': `${i * 90}ms` }}
                  className="rounded-2xl bg-ivory/[0.04] border border-ivory/15 p-6 hover:bg-ivory/[0.07] transition-colors">
                  <span className="inline-flex w-10 h-10 rounded-xl bg-gold/15 items-center justify-center">
                    <a.icon className="w-5 h-5 text-gold" />
                  </span>
                  <h3 className="font-display text-xl mt-4">{a.name}</h3>
                  <p className="text-ivory/70 text-[0.92rem] leading-relaxed mt-2">{a.body}</p>
                </article>
              ))}
            </div>
            <p className="text-ivory/55 text-sm leading-relaxed mt-8 max-w-3xl" data-reveal>
              Agents act only inside the rules you set — your hours, your services, your prices.
              Anything unusual, sensitive, or off-script comes straight to a human. You stay in
              control; the busywork doesn&rsquo;t.
            </p>
          </div>
        </section>

        {/* Who it's for + languages */}
        <section id="who" className="max-w-page mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-start">
            <div data-reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oasis">Code-switch native</p>
              <h2 className="font-display font-light text-4xl sm:text-5xl tracking-tight mt-4 leading-[1.08]">
                Your customer switches language mid-sentence. <em className="text-oasis">So does {BRAND}.</em>
              </h2>
              <p className="text-ink-soft text-lg leading-relaxed mt-5">
                76.7% of Qatar&rsquo;s population is expatriate. A real Gulf conversation opens in
                Arabic, negotiates in Urdu, and confirms in English inside one thread. {BRAND} is
                built for that thread — not a chatbot script translated five times, but native
                handling of mixed-language conversation, with cultural phrasing per language.
              </p>
              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.18em] text-ink-soft font-semibold">Built for the Gulf’s service businesses</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {SECTORS.map((s) => (
                    <span key={s} className="text-sm rounded-full bg-sand px-4 py-2">{s}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {LANGS.map((l, i) => (
                <div key={l.name} data-reveal style={{ '--reveal-delay': `${i * 90}ms` }}
                  className="rounded-2xl bg-white border border-ink/10 px-5 py-6 text-center shadow-[0_10px_30px_-22px_rgba(30,43,43,0.45)]">
                  <p dir={l.dir} lang={l.lang} className={`${l.cls} text-2xl sm:text-[1.7rem] text-ink`}>{l.native}</p>
                  <p className="text-xs uppercase tracking-[0.14em] text-ink-soft mt-2.5">{l.name}</p>
                </div>
              ))}
              <div data-reveal style={{ '--reveal-delay': '450ms' }}
                className="rounded-2xl border border-dashed border-ink/25 px-5 py-6 text-center flex flex-col items-center justify-center">
                <p className="font-display italic text-xl text-ink-soft">+ yours</p>
                <p className="text-xs uppercase tracking-[0.14em] text-ink-soft mt-2.5">Nepali, Bangla next</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="bg-sand/60 star-field border-y border-ink/10">
          <div className="max-w-page mx-auto px-5 sm:px-8 py-20 sm:py-28">
            <div className="max-w-2xl" data-reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-oasis">Start with a pilot</p>
              <h2 className="font-display font-light text-4xl sm:text-5xl tracking-tight mt-4 leading-[1.08]">
                Prove it on <em className="text-oasis">your</em> front desk, in 30 days.
              </h2>
              <p className="text-ink-soft text-lg leading-relaxed mt-5">
                One month, your real calls and messages, one number at the end: bookings recovered.
                Convert to a monthly plan only if it pays for itself — which is the whole point.
              </p>
            </div>
            <div className="mt-12 rounded-2xl bg-ink text-ivory p-8 sm:p-10 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-center shadow-[0_28px_60px_-24px_rgba(30,43,43,0.6)]" data-reveal>
              <div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex w-11 h-11 rounded-xl bg-gold/15 items-center justify-center">
                    <PhoneMissed className="w-5 h-5 text-gold" />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl">30-day front-desk pilot</h3>
                    <p className="text-ivory/60 text-sm">For a single clinic, salon, or service location</p>
                  </div>
                </div>
                <ul className="flex flex-col gap-2.5 mt-6">
                  {PILOT_FEATURES.map((f) => (
                    <li key={f} className="flex gap-2.5 text-[0.95rem] leading-snug text-ivory/85">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-gold" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center lg:text-left lg:border-l lg:border-ivory/15 lg:pl-8">
                <p className="font-display text-4xl text-gold">QAR 3,500–6,000</p>
                <p className="text-ivory/60 text-sm mt-1">per month · 30-day pilot · cancel anytime</p>
                <a href={PILOT_CONTACT} className="inline-flex items-center justify-center gap-2 rounded-full bg-oasis hover:bg-[#255952] text-ivory font-semibold px-7 py-3.5 mt-6 transition-colors">
                  Book the 30-day pilot <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
            <p className="text-sm text-ink-soft mt-8 max-w-2xl" data-reveal>
              <span className="font-semibold text-oasis">Founding cohort:</span> a handful of Doha
              businesses this quarter, at pilot pricing locked for the first year. Founding partners
              shape the product roadmap.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-ink text-ivory">
        <div className="max-w-page mx-auto px-5 sm:px-8 py-20 sm:py-24 text-center" data-reveal>
          <Mark className="w-9 h-9 text-gold mx-auto" />
          <h2 className="font-display font-light text-4xl sm:text-5xl tracking-tight mt-6 leading-[1.08]">
            A front desk that <em className="text-gold">never misses a call.</em>
          </h2>
          <p className="text-ivory/70 text-lg mt-5 max-w-xl mx-auto">
            Founding-partner slots open in Doha this quarter. One 30-minute call to see the agents
            speak your customers&rsquo; languages.
          </p>
          <a href={PILOT_CONTACT} className="inline-flex items-center gap-2 rounded-full bg-oasis hover:bg-[#255952] text-ivory font-semibold px-8 py-4 mt-9 transition-colors">
            Book the pilot call <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <div className="border-t border-ivory/15">
          <div className="max-w-page mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-ivory/60">
            <p className="flex items-center gap-2">
              <span className="font-display text-ivory">{BRAND}</span>
              <span dir="rtl" lang="ar" className="font-naskh">{BRAND_AR}</span>
              <span>· an AI front desk for the Gulf</span>
            </p>
            <p className="flex items-center gap-4">
              <span>Built by the team behind Raaha &amp; DilKiBaat · NIC-incubated</span>
              <a href="#top" onClick={() => { window.location.hash = ''; }} className="inline-flex items-center gap-1 hover:text-ivory transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" /> Raaha
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
