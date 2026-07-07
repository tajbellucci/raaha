import { useEffect, useState } from 'react';
import { ShieldAlert, Check } from 'lucide-react';
import { fetchQueue, ackIncident } from './api.js';

const SEV_STYLE = {
  emergency: 'bg-maroon text-ivory',
  high: 'bg-maroon-deep text-ivory',
  moderate: 'bg-gold text-ink',
};

export default function NavigatorConsole({ live }) {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    if (!live) return;
    let on = true;
    const load = () => fetchQueue().then((q) => on && setQueue(q)).catch(() => {});
    load();
    const t = setInterval(load, 4000);
    return () => {
      on = false;
      clearInterval(t);
    };
  }, [live]);

  async function ack(id) {
    await ackIncident(id).catch(() => {});
    setQueue((q) => q.map((i) => (i.id === id ? { ...i, status: 'acknowledged' } : i)));
  }

  if (!live) {
    return (
      <p className="text-ink-soft italic max-w-md">
        The navigator console needs the live backend — it reads the real incident queue. Run the
        prototype server to see it.
      </p>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-2.5 rounded-xl bg-sand/70 border border-gold/30 px-4 py-3 mb-6">
        <ShieldAlert className="w-4.5 h-4.5 text-maroon shrink-0" />
        <p className="text-sm text-ink-soft">
          Human-navigator view: incidents opened by the crisis protocol, prioritized by severity.
          Navigators see triage context and language — never the employer, and the employer never
          sees this queue.
        </p>
      </div>

      {queue.length === 0 ? (
        <p className="text-ink-soft italic">Queue clear — no open incidents.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {queue.map((i) => (
            <div key={i.id} className="flex items-center gap-4 rounded-2xl bg-white border border-ink/10 px-5 py-4">
              <span className={`text-xs font-semibold uppercase tracking-wide rounded-full px-3 py-1 ${SEV_STYLE[i.severity] || 'bg-ivory'}`}>
                {i.severity}
              </span>
              <div className="flex-1 text-sm">
                <p className="font-medium">Incident #{i.id} · session {i.session_id}</p>
                <p className="text-ink-soft text-xs mt-0.5">
                  {i.language.toUpperCase()} · {i.site} · opened {i.created_at} UTC · status: {i.status}
                </p>
              </div>
              {i.status === 'open' && (
                <button
                  onClick={() => ack(i.id)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-oasis hover:bg-oasis/90 text-ivory text-xs font-semibold px-4 py-2 transition-colors"
                >
                  <Check className="w-3.5 h-3.5" /> Acknowledge
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
