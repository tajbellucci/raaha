import { ShieldCheck } from 'lucide-react';

// All figures below are illustrative demo data — not from a real deployment.
const LANGUAGES = [
  { label: 'Urdu · Hindi', value: 38, color: 'bg-maroon' },
  { label: 'Arabic', value: 27, color: 'bg-oasis' },
  { label: 'English', value: 20, color: 'bg-gold' },
  { label: 'Malayalam', value: 11, color: 'bg-ink-soft' },
  { label: 'Tagalog', value: 4, color: 'bg-dune' },
];

const TOPICS = [
  { label: 'Stress & sleep', value: 34 },
  { label: 'Burnout / workload', value: 24 },
  { label: 'Manager / conflict', value: 16 },
  { label: 'Financial / housing', value: 14 },
  { label: 'Family', value: 8 },
  { label: 'Other', value: 4 },
];

const RISK = [
  { label: 'Low', value: 71, color: 'bg-oasis' },
  { label: 'Moderate', value: 24, color: 'bg-gold' },
  { label: 'High', value: 4, color: 'bg-maroon-deep' },
  { label: 'Emergency', value: 1, color: 'bg-maroon' },
];

const TREND = [38, 42, 45, 44, 49, 53, 55, 58, 61, 64, 63, 67]; // 12 weeks, utilization %

function Bar({ label, value, color, suffix = '%' }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-ink">{label}</span>
        <span className="text-ink-soft font-medium">{value}{suffix}</span>
      </div>
      <div className="h-2.5 rounded-full bg-sand overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function HRDashboard() {
  const maxTrend = Math.max(...TREND);
  return (
    <div>
      <div className="flex items-center gap-2.5 rounded-xl bg-oasis-soft border border-oasis/20 px-4 py-3 mb-6">
        <ShieldCheck className="w-4.5 h-4.5 text-oasis shrink-0" />
        <p className="text-sm text-ink-soft">
          Illustrative demo data for a 1,000-employee pilot — no real employee data. Everything
          below is aggregated; HR never sees a transcript or an individual identity.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {[
          ['1,000', 'covered employees'],
          ['18%', 'active users this month'],
          ['< 24h', 'median navigator response'],
        ].map(([num, label]) => (
          <div key={label} className="rounded-2xl bg-white border border-ink/10 p-5">
            <p className="font-display text-3xl text-maroon">{num}</p>
            <p className="text-sm text-ink-soft mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="rounded-2xl bg-white border border-ink/10 p-6">
          <p className="font-semibold mb-4">Conversations by language</p>
          <div className="flex flex-col gap-3.5">
            {LANGUAGES.map((l) => (
              <Bar key={l.label} {...l} />
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-ink/10 p-6">
          <p className="font-semibold mb-4">Risk-level distribution</p>
          <div className="flex flex-col gap-3.5">
            {RISK.map((r) => (
              <Bar key={r.label} {...r} />
            ))}
          </div>
          <p className="text-xs text-ink-soft italic mt-4">
            High/emergency conversations are handled by human navigators the same day — this
            aggregate view is the only signal that reaches HR.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-ink/10 p-6">
          <p className="font-semibold mb-4">Themes this month</p>
          <div className="flex flex-col gap-3.5">
            {TOPICS.map((t) => (
              <Bar key={t.label} label={t.label} value={t.value} color="bg-maroon" suffix="%" />
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-ink/10 p-6">
          <p className="font-semibold mb-4">Utilization trend, 12 weeks</p>
          <div className="flex items-end gap-1.5 h-32">
            {TREND.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-oasis"
                  style={{ height: `${(v / maxTrend) * 100}%` }}
                  title={`Week ${i + 1}: ${v}%`}
                />
              </div>
            ))}
          </div>
          <p className="text-xs text-ink-soft mt-2">Week 1 → Week 12, engagement climbing as trust builds.</p>
        </div>
      </div>
    </div>
  );
}
