import { useEffect, useState } from 'react';
import { ArrowLeft, MessageCircle, LayoutDashboard, Headset, Cpu, Zap } from 'lucide-react';
import { StarMark } from '../components/Nav.jsx';
import EmployeeChat from './EmployeeChat.jsx';
import HRDashboard from './HRDashboard.jsx';
import NavigatorConsole from './NavigatorConsole.jsx';
import { probeBackend } from './api.js';

function EngineBadge({ backend }) {
  if (backend === undefined) return null; // still probing
  if (backend === null) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-sand border border-ink/10 text-ink-soft text-xs font-medium px-3 py-1.5">
        <Cpu className="w-3.5 h-3.5" /> Scripted demo — no backend on this deploy
      </span>
    );
  }
  return backend.engine === 'llm' ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-oasis text-ivory text-xs font-semibold px-3 py-1.5">
      <Zap className="w-3.5 h-3.5" /> Live prototype · agentic ({backend.model})
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 border border-gold/40 text-ink text-xs font-semibold px-3 py-1.5">
      <Zap className="w-3.5 h-3.5" /> Live prototype · deterministic engine (add ANTHROPIC_API_KEY for agentic)
    </span>
  );
}

const TABS = [
  { id: 'chat', label: 'Employee experience', icon: MessageCircle },
  { id: 'dashboard', label: 'HR dashboard', icon: LayoutDashboard },
  { id: 'console', label: 'Navigator console', icon: Headset },
];

export default function Demo() {
  const [tab, setTab] = useState('chat');
  const [backend, setBackend] = useState(undefined);

  useEffect(() => {
    probeBackend().then(setBackend);
  }, []);

  const live = Boolean(backend);

  return (
    <div className="min-h-screen bg-ivory">
      <header className="sticky top-0 z-50 bg-ivory/90 backdrop-blur-md border-b border-ink/10">
        <div className="max-w-page mx-auto flex items-center justify-between px-5 sm:px-8 py-4">
          <a href="#" className="flex items-center gap-2.5 text-ink-soft hover:text-ink transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to site
          </a>
          <div className="flex items-center gap-2">
            <StarMark className="w-5 h-5 text-maroon" />
            <span className="font-display text-lg font-semibold">Raaha — working prototype</span>
          </div>
          <div className="w-24 hidden sm:block" />
        </div>
      </header>

      <div className="max-w-page mx-auto px-5 sm:px-8 py-8 sm:py-12">
        <div className="flex flex-wrap items-center gap-3">
          <p className="eyebrow">Prototype · real orchestrator, risk pipeline &amp; database when live</p>
          <EngineBadge backend={backend} />
        </div>
        <h1 className="font-display font-light text-3xl sm:text-4xl tracking-tight mt-3 mb-8 max-w-2xl">
          One conversation through the agents — and what HR and navigators each see on their side.
        </h1>

        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                tab === t.id ? 'bg-maroon text-ivory' : 'bg-white border border-ink/10 text-ink-soft hover:text-ink'
              }`}
            >
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        {tab === 'chat' && <EmployeeChat backend={backend ?? null} />}
        {tab === 'dashboard' && <HRDashboard live={live} />}
        {tab === 'console' && <NavigatorConsole live={live} />}
      </div>
    </div>
  );
}
