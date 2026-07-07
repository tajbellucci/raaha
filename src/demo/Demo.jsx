import { useState } from 'react';
import { ArrowLeft, MessageCircle, LayoutDashboard } from 'lucide-react';
import { StarMark } from '../components/Nav.jsx';
import EmployeeChat from './EmployeeChat.jsx';
import HRDashboard from './HRDashboard.jsx';

export default function Demo() {
  const [tab, setTab] = useState('chat');

  return (
    <div className="min-h-screen bg-ivory">
      <header className="sticky top-0 z-50 bg-ivory/90 backdrop-blur-md border-b border-ink/10">
        <div className="max-w-page mx-auto flex items-center justify-between px-5 sm:px-8 py-4">
          <a href="#" className="flex items-center gap-2.5 text-ink-soft hover:text-ink transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to site
          </a>
          <div className="flex items-center gap-2">
            <StarMark className="w-5 h-5 text-maroon" />
            <span className="font-display text-lg font-semibold">Raaha — clickable demo</span>
          </div>
          <div className="w-24 hidden sm:block" />
        </div>
      </header>

      <div className="max-w-page mx-auto px-5 sm:px-8 py-8 sm:py-12">
        <p className="eyebrow">Illustrative demo · scripted, not connected to a real backend</p>
        <h1 className="font-display font-light text-3xl sm:text-4xl tracking-tight mt-3 mb-8 max-w-2xl">
          See how one conversation moves through the agents — and what HR sees on the other end.
        </h1>

        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setTab('chat')}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              tab === 'chat' ? 'bg-maroon text-ivory' : 'bg-white border border-ink/10 text-ink-soft hover:text-ink'
            }`}
          >
            <MessageCircle className="w-4 h-4" /> Employee experience
          </button>
          <button
            onClick={() => setTab('dashboard')}
            className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              tab === 'dashboard' ? 'bg-maroon text-ivory' : 'bg-white border border-ink/10 text-ink-soft hover:text-ink'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> HR dashboard
          </button>
        </div>

        {tab === 'chat' ? <EmployeeChat /> : <HRDashboard />}
      </div>
    </div>
  );
}
