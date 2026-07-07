// Thin client for the Raaha prototype backend. All calls go through the Vite
// dev proxy (/api → localhost:8787). On the static GitHub Pages deploy there
// is no backend; probe() fails fast and the demo falls back to scripted mode.

export async function probeBackend() {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 1500);
    const res = await fetch('/api/health', { signal: ctrl.signal });
    clearTimeout(t);
    if (!res.ok) return null;
    return await res.json(); // { ok, engine: 'llm'|'deterministic', model }
  } catch {
    return null;
  }
}

export async function sendChat(sessionId, message) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, message }),
  });
  if (!res.ok) throw new Error(`chat failed: ${res.status}`);
  return res.json();
}

export async function fetchInsights() {
  const res = await fetch('/api/insights');
  if (!res.ok) throw new Error(`insights failed: ${res.status}`);
  return res.json();
}

export async function fetchQueue() {
  const res = await fetch('/api/navigator/queue');
  if (!res.ok) throw new Error(`queue failed: ${res.status}`);
  return res.json();
}

export async function ackIncident(id) {
  const res = await fetch(`/api/navigator/incidents/${id}/ack`, { method: 'POST' });
  if (!res.ok) throw new Error(`ack failed: ${res.status}`);
  return res.json();
}
