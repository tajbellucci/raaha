const VISIONS = [
  {
    country: 'Qatar',
    native: 'قطر',
    strategy: 'Qatar National Vision 2030',
    detail:
      'Names human development — health and education — alongside social cohesion and economic diversification as a founding pillar.',
  },
  {
    country: 'Saudi Arabia',
    native: 'السعودية',
    strategy: 'Vision 2030 · Quality of Life Program',
    detail:
      'The National Center for Mental Health Promotion (est. 2019, under the Ministry of Health) drives workplace wellness as prevention-oriented care, alongside stigma-reduction campaigns.',
  },
  {
    country: 'UAE',
    native: 'الإمارات',
    strategy: 'National Strategy for Wellbeing 2031',
    detail:
      'Cabinet-approved: 14 components, 90 initiatives, and a National Wellbeing Observatory to put real data behind workplace policy.',
  },
];

export default function NationalVision() {
  return (
    <section className="bg-sand/40 border-y border-ink/10">
      <div className="max-w-page mx-auto px-5 sm:px-8 py-16 sm:py-20">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow">Not a trend. A named national priority.</p>
          <h2 className="font-display font-light text-3xl sm:text-4xl tracking-tight mt-4 leading-[1.1]">
            Three governments already committed to this.
            <br />
            <em className="text-maroon">None have built the operating layer yet.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {VISIONS.map((v, i) => (
            <div
              key={v.country}
              data-reveal
              style={{ '--reveal-delay': `${i * 100}ms` }}
              className="rounded-2xl bg-white border border-ink/10 p-6"
            >
              <div className="flex items-baseline justify-between">
                <p className="font-display text-xl">{v.country}</p>
                <p dir="rtl" lang="ar" className="font-naskh text-lg text-ink-soft">
                  {v.native}
                </p>
              </div>
              <p className="text-maroon text-sm font-semibold mt-2">{v.strategy}</p>
              <p className="text-ink-soft text-sm leading-relaxed mt-3">{v.detail}</p>
            </div>
          ))}
        </div>

        <p className="text-ink-soft text-sm leading-relaxed max-w-3xl mt-8" data-reveal>
          Every Gulf state has already named workplace mental health a national priority. None has
          built the layer that gets it into an actual WhatsApp conversation, in an actual worker&rsquo;s
          language, this week. Raaha&rsquo;s anonymized employer dashboard is, in effect, a private-sector
          wellbeing observatory — the same data-for-policy logic these strategies already call for,
          delivered per employer, starting now.
        </p>
      </div>
    </section>
  );
}
