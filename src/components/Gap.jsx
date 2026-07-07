import { PhoneMissed, EyeOff, TrendingDown } from 'lucide-react';

const CARDS = [
  {
    icon: PhoneMissed,
    title: 'The hotline nobody calls',
    body: 'Traditional EAPs sit unused: an English-only number on a poster, far from the languages, shifts and stigma realities of a Doha workforce. Utilization stays in the low single digits — and renewal season becomes an argument about a service no one touched.',
  },
  {
    icon: TrendingDown,
    title: 'Distress becomes attrition',
    body: 'McKinsey’s GCC survey found employees with burnout symptoms are 4× more likely to intend to leave. Every silent resignation is a rehire, a re-visa, a re-training — replacement cost that never appears on a wellbeing budget line, but always appears in operations.',
  },
  {
    icon: EyeOff,
    title: 'HR is flying blind',
    body: 'Site managers feel something is wrong at Camp B or the night shift — but there is no signal, only anecdote. Without anonymized, aggregated insight, wellbeing spend is allocated by guesswork and defended by hope.',
  },
];

export default function Gap() {
  return (
    <section id="gap" className="max-w-page mx-auto px-5 sm:px-8 py-20 sm:py-28">
      <div className="max-w-2xl" data-reveal>
        <p className="eyebrow">The gap</p>
        <h2 className="font-display font-light text-4xl sm:text-5xl tracking-tight mt-4 leading-[1.08]">
          Support exists. <em className="text-maroon">Reaching it</em> is what fails.
        </h2>
        <p className="text-ink-soft text-lg leading-relaxed mt-5">
          Qatar already has serious services — a national helpline, licensed clinicians, workers&rsquo;
          welfare pathways. What&rsquo;s missing is the navigation layer between a struggling employee
          and the right door, in a language they trust, at the hour they need it.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mt-14">
        {CARDS.map((c, i) => (
          <article
            key={c.title}
            data-reveal
            style={{ '--reveal-delay': `${i * 110}ms` }}
            className="group rounded-2xl bg-white border border-ink/10 p-7 shadow-[0_12px_36px_-24px_rgba(30,43,43,0.4)] hover:-translate-y-1.5 hover:shadow-[0_20px_44px_-24px_rgba(138,21,56,0.35)] transition-all duration-300"
          >
            <span className="inline-flex w-11 h-11 rounded-xl bg-sand items-center justify-center">
              <c.icon className="w-5 h-5 text-maroon" />
            </span>
            <h3 className="font-display text-2xl mt-5">{c.title}</h3>
            <p className="text-ink-soft leading-relaxed mt-3 text-[0.95rem]">{c.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
