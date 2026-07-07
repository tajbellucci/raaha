import { useEffect, useRef, useState } from 'react';
import { Mic, Send, Loader2 } from 'lucide-react';
import { SCENARIOS, CRISIS_KEYWORDS, CRISIS_TURN, FALLBACK_TURN } from './scenarios.js';

const AGENT_DOT = { gold: 'bg-gold', oasis: 'bg-oasis', maroon: 'bg-maroon' };
const AGENT_TEXT = { gold: 'text-gold', oasis: 'text-oasis', maroon: 'text-maroon' };

function AgentBubble({ turn }) {
  return (
    <div className="flex flex-col items-start gap-1.5 max-w-[85%]">
      <span className={`flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-wide ${AGENT_TEXT[turn.agentColor]}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${AGENT_DOT[turn.agentColor]}`} />
        {turn.agent}
      </span>
      <div
        className={`rounded-2xl rounded-bl-sm border px-4 py-3 text-[0.92rem] leading-relaxed ${
          turn.risk === 'emergency'
            ? 'bg-maroon/5 border-maroon/30 text-ink'
            : 'bg-white border-ink/10 text-ink'
        }`}
      >
        {turn.reply}
      </div>
      {turn.action && (
        <div className="flex items-center gap-2 rounded-xl bg-sand/70 border border-gold/30 px-3.5 py-2 text-xs font-medium text-ink-soft">
          {turn.action}
        </div>
      )}
    </div>
  );
}

function TypingIndicator({ label }) {
  return (
    <div className="flex items-center gap-2 text-ink-soft text-xs">
      <Loader2 className="w-3.5 h-3.5 animate-spin" />
      {label}
    </div>
  );
}

export default function EmployeeChat() {
  const [messages, setMessages] = useState([]); // { kind: 'user'|'agent'|'typing', ... }
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  function matchScenario(text) {
    const lower = text.toLowerCase();
    if (CRISIS_KEYWORDS.some((k) => lower.includes(k.toLowerCase()) || text.includes(k))) {
      return { turns: [CRISIS_TURN] };
    }
    const hit = SCENARIOS.find((s) => s.keywords.some((k) => lower.includes(k.toLowerCase()) || text.includes(k)));
    return hit ? hit : { turns: [FALLBACK_TURN] };
  }

  async function playTurns(turns, userDir = 'ltr') {
    setBusy(true);
    for (const turn of turns) {
      setMessages((m) => [...m, { kind: 'typing', label: `${turn.agent} is responding…` }]);
      await new Promise((r) => setTimeout(r, 700 + Math.random() * 400));
      setMessages((m) => [...m.slice(0, -1), { kind: 'agent', turn, dir: userDir }]);
      await new Promise((r) => setTimeout(r, 250));
    }
    setBusy(false);
  }

  function sendScenario(scenario) {
    if (busy) return;
    setMessages((m) => [
      ...m,
      { kind: 'user', text: scenario.userText, translation: scenario.userTranslation, dir: scenario.dir, lang: scenario.lang },
    ]);
    playTurns(scenario.turns, scenario.dir);
  }

  function sendFreeText() {
    const text = input.trim();
    if (!text || busy) return;
    setInput('');
    setMessages((m) => [...m, { kind: 'user', text, dir: 'ltr', lang: 'en' }]);
    const scenario = matchScenario(text);
    playTurns(scenario.turns, 'ltr');
  }

  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-5">
      {/* scenario picker */}
      <div className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
        <p className="hidden lg:block text-xs font-semibold uppercase tracking-wide text-ink-soft mb-1">
          Try a scenario
        </p>
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            onClick={() => sendScenario(s)}
            disabled={busy}
            className="shrink-0 lg:shrink text-left rounded-xl border border-ink/10 bg-white hover:border-maroon/40 hover:bg-sand/40 px-4 py-3 text-sm font-medium transition-colors disabled:opacity-50"
          >
            {s.label}
          </button>
        ))}
        <p className="hidden lg:block text-xs text-ink-soft leading-relaxed mt-2">
          Or type your own message below — the demo also recognizes crisis language and always
          routes it to the Escalation &amp; Safety Agent with real helpline numbers, never an
          autonomous reply.
        </p>
      </div>

      {/* chat window */}
      <div className="rounded-2xl bg-white border border-ink/10 shadow-[0_16px_44px_-28px_rgba(30,43,43,0.5)] flex flex-col h-[32rem]">
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-ink/10">
          <span className="w-9 h-9 rounded-full bg-oasis-soft flex items-center justify-center">
            <Mic className="w-4 h-4 text-oasis" />
          </span>
          <div>
            <p className="text-sm font-semibold">Raaha assistant</p>
            <p className="text-xs text-ink-soft">WhatsApp · confidential · illustrative demo</p>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
          {messages.length === 0 && (
            <p className="text-ink-soft text-sm italic m-auto text-center max-w-xs">
              Pick a scenario on the left, or type a message below, to see the orchestrator route
              it to the right agent.
            </p>
          )}
          {messages.map((m, i) => {
            if (m.kind === 'typing') return <TypingIndicator key={i} label={m.label} />;
            if (m.kind === 'user') {
              return (
                <div key={i} className="self-end max-w-[85%] rounded-2xl rounded-br-sm bg-oasis-soft px-4 py-3">
                  <p dir={m.dir} lang={m.lang} className={m.dir === 'rtl' ? 'font-naskh text-base' : 'text-[0.92rem]'}>
                    {m.text}
                  </p>
                  {m.translation && <p className="text-xs text-ink-soft mt-1.5 italic">{m.translation}</p>}
                </div>
              );
            }
            return <AgentBubble key={i} turn={m.turn} />;
          })}
        </div>

        <div className="flex items-center gap-2 px-4 py-3 border-t border-ink/10">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendFreeText()}
            placeholder="Type a message…"
            disabled={busy}
            className="flex-1 rounded-full bg-ivory border border-ink/10 px-4 py-2.5 text-sm outline-none focus:border-oasis/50 disabled:opacity-60"
          />
          <button
            onClick={sendFreeText}
            disabled={busy || !input.trim()}
            className="w-10 h-10 rounded-full bg-maroon hover:bg-maroon-deep disabled:opacity-40 text-ivory flex items-center justify-center shrink-0 transition-colors"
            aria-label="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
