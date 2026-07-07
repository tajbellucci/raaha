import { Sparkles, GraduationCap, Landmark, BookMarked, Microscope, Award, Link2 } from 'lucide-react';

const PROOF = [
  {
    icon: Sparkles,
    label: 'DilKiBaat',
    detail: "Pakistan's first national CBT-based mental health platform — 50+ bilingual clinicians, live since Nov 2024",
  },
  {
    icon: Landmark,
    label: 'National Incubation Center',
    detail: 'DilKiBaat is incubated here — Pakistan’s flagship government-backed startup incubator',
  },
  {
    icon: GraduationCap,
    label: '123CBT.online',
    detail: 'Built for the World Psychiatric Association — a multilingual learning platform used by psychiatrists globally',
  },
  {
    icon: BookMarked,
    label: 'Cambridge-published pilot study',
    detail: 'Taj’s culturally-adapted, low-literacy animated intervention series was independently evaluated and published',
  },
  {
    icon: Microscope,
    label: 'Southampton Adaptation Framework',
    detail: 'Farooq’s cultural-CBT-adaptation methodology has informed 30+ randomized controlled trials worldwide',
  },
  {
    icon: Award,
    label: 'Global CBT Ambassador (Asia), 2025',
    detail: 'World Confederation of Cognitive and Behavioural Therapies — plus a 2021 Lifetime Achievement Award',
  },
];

export default function Founders() {
  return (
    <section className="max-w-page mx-auto px-5 sm:px-8 py-20 sm:py-28">
      <div data-reveal>
        <p className="eyebrow">Built by operators, not tourists</p>
        <h2 className="font-display font-light text-4xl sm:text-5xl tracking-tight mt-4 leading-[1.08] max-w-2xl">
          Not two founders who met at a pitch competition. <em className="text-maroon">Five years into the same work, together.</em>
        </h2>
        <p className="text-ink-soft text-lg leading-relaxed mt-5 max-w-2xl">
          Farooq founded the institution. Taj built and ran its digital infrastructure for five
          years. Raaha formalizes a research-to-product relationship that already exists.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mt-12">
        <div
          data-reveal
          className="rounded-2xl bg-white border border-ink/10 shadow-[0_16px_44px_-28px_rgba(30,43,43,0.5)] p-7"
        >
          <div className="flex items-center gap-4">
            <span className="w-14 h-14 rounded-full bg-maroon text-ivory font-display text-xl flex items-center justify-center shrink-0">
              TM
            </span>
            <div>
              <p className="font-display text-xl">Taj Magsi</p>
              <p className="text-ink-soft text-sm">Founder &amp; Managing Director, DilKiBaat</p>
            </div>
          </div>
          <p className="text-ink-soft text-[0.95rem] leading-relaxed mt-4">
            Five-plus years inside Pakistan&rsquo;s national cognitive-therapy association (PACT) —
            building the clinical-technology systems, not just observing them, including
            123CBT.online for the World Psychiatric Association. Native Urdu and Punjabi speaker;
            the same authentic voice this product is built to carry.
          </p>
        </div>

        <div
          data-reveal
          style={{ '--reveal-delay': '90ms' }}
          className="rounded-2xl bg-white border border-ink/10 shadow-[0_16px_44px_-28px_rgba(30,43,43,0.5)] p-7"
        >
          <div className="flex items-center gap-4">
            <span className="w-14 h-14 rounded-full bg-oasis text-ivory font-display text-xl flex items-center justify-center shrink-0">
              FN
            </span>
            <div>
              <p className="font-display text-xl">Prof. Farooq Naeem</p>
              <p className="text-ink-soft text-sm">Professor of Psychiatry, University of Toronto · Founder, PACT</p>
            </div>
          </div>
          <p className="text-ink-soft text-[0.95rem] leading-relaxed mt-4">
            British-Canadian academic of South Asian origin. Pioneered culturally adapted CBT for
            South Asia, North Africa and the Middle East — the exact regions and problem Raaha
            operationalizes as software.
          </p>
          <a
            href="https://en.wikipedia.org/wiki/Farooq_Naeem"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-oasis text-sm font-medium mt-3 hover:underline"
          >
            <Link2 className="w-3.5 h-3.5" /> Wikipedia
          </a>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {PROOF.map((p, i) => (
          <div
            key={p.label}
            data-reveal
            style={{ '--reveal-delay': `${(i + 2) * 80}ms` }}
            className="rounded-xl bg-sand/50 border border-ink/10 p-5"
          >
            <p.icon className="w-5 h-5 text-maroon" />
            <p className="font-semibold text-sm mt-2.5">{p.label}</p>
            <p className="text-ink-soft text-xs leading-relaxed mt-1">{p.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
