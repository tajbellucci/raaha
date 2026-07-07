// Load server/.env if present (Node 21+ built-in; silently skipped if absent).
try {
  process.loadEnvFile(new URL('./.env', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
} catch {
  /* no .env — fine, deterministic engine runs */
}

import express from 'express';
import Anthropic from '@anthropic-ai/sdk';
import { elevenConfigured, ttsStream, stt } from './voice.js';
import {
  getOrCreateSession,
  recordConsent,
  saveMessage,
  recentMessages,
  recordTriage,
  openIncident,
  insights,
  navigatorQueue,
  audit,
  db,
} from './db.js';
import { isCrisisText, isCrisisRisk, CRISIS_REPLY } from './safety.js';
import { llmConfigured, llmProvider, llmTurn, fallbackTurn, MODEL } from './engine.js';

const app = express();
app.use(express.json({ limit: '32kb' }));

const PORT = Number(process.env.RAAHA_SERVER_PORT || process.env.PORT || 8787);

app.get('/api/health', (_req, res) => {
  const provider = llmProvider();
  res.json({
    ok: true,
    engine: provider ? 'llm' : 'deterministic',
    provider,
    model: provider === 'anthropic' ? MODEL : provider === 'openrouter' ? (process.env.RAAHA_OPENROUTER_MODEL || 'openrouter/auto') : null,
    voice: elevenConfigured() ? 'elevenlabs' : 'browser',
  });
});

// ---- ElevenLabs voice proxy (key never reaches the browser) ----
app.post('/api/tts', async (req, res) => {
  if (!elevenConfigured()) return res.status(503).json({ error: 'voice not configured' });
  const text = String(req.body?.text ?? '').trim();
  if (!text) return res.status(400).json({ error: 'text required' });
  try {
    const upstream = await ttsStream(text);
    res.setHeader('Content-Type', 'audio/mpeg');
    const buf = Buffer.from(await upstream.arrayBuffer());
    res.end(buf);
  } catch (err) {
    console.error('[tts]', err.message);
    res.status(502).json({ error: 'tts failed' });
  }
});

app.post('/api/stt', express.raw({ type: ['audio/*'], limit: '8mb' }), async (req, res) => {
  if (!elevenConfigured()) return res.status(503).json({ error: 'voice not configured' });
  if (!req.body?.length) return res.status(400).json({ error: 'audio body required' });
  try {
    const result = await stt(req.body, req.headers['content-type'] || 'audio/webm');
    res.json(result);
  } catch (err) {
    console.error('[stt]', err.message);
    res.status(502).json({ error: 'stt failed' });
  }
});

app.post('/api/consent', (req, res) => {
  const { sessionId, language = 'en', site = 'main' } = req.body ?? {};
  if (!sessionId) return res.status(400).json({ error: 'sessionId required' });
  getOrCreateSession(sessionId, language, site);
  recordConsent(sessionId);
  res.json({ ok: true });
});

app.post('/api/chat', async (req, res) => {
  const { sessionId, message, language = 'en', site = 'main' } = req.body ?? {};
  if (!sessionId || !message?.trim()) {
    return res.status(400).json({ error: 'sessionId and message required' });
  }
  const text = String(message).slice(0, 4000);
  getOrCreateSession(sessionId, language, site);
  saveMessage(sessionId, 'user', text);

  // ---- Crisis pre-gate: deterministic, runs before ANY engine. ----
  if (isCrisisText(text)) {
    const incidentId = openIncident(sessionId, 'emergency');
    recordTriage(sessionId, { risk: 'emergency', topic: 'crisis', agent: 'escalation_safety', engine: 'pre-gate' });
    saveMessage(sessionId, 'agent', CRISIS_REPLY.reply, 'escalation_safety');
    audit(sessionId, 'crisis.pre_gate_fired', { incidentId });
    return res.json({ ...CRISIS_REPLY, engine: 'pre-gate', incidentId });
  }

  let turn;
  if (llmConfigured()) {
    try {
      turn = await llmTurn(recentMessages(sessionId), text);
    } catch (err) {
      const status = err?.status ?? 0;
      const recoverable =
        err instanceof Anthropic.AuthenticationError ||
        err instanceof Anthropic.RateLimitError ||
        (err instanceof Anthropic.APIError && status >= 500) ||
        // OpenRouter path throws plain errors with .status
        status === 401 || status === 402 || status === 403 || status === 429 || status >= 500;
      if (recoverable) {
        audit(sessionId, 'llm.falling_back', { status, message: String(err.message).slice(0, 200) });
        turn = fallbackTurn(sessionId, text);
      } else {
        throw err;
      }
    }
  } else {
    turn = fallbackTurn(sessionId, text);
  }

  // ---- Crisis post-gate: if any engine judges high/emergency, protocol wins. ----
  if (isCrisisRisk(turn.risk)) {
    const incidentId = openIncident(sessionId, turn.risk);
    recordTriage(sessionId, { risk: turn.risk, topic: 'crisis', agent: 'escalation_safety', engine: turn.engine });
    saveMessage(sessionId, 'agent', CRISIS_REPLY.reply, 'escalation_safety');
    audit(sessionId, 'crisis.post_gate_fired', { incidentId, engine: turn.engine });
    return res.json({ ...CRISIS_REPLY, risk: turn.risk, engine: turn.engine, incidentId });
  }

  recordTriage(sessionId, { risk: turn.risk, topic: turn.topic, agent: turn.agent, engine: turn.engine });
  saveMessage(sessionId, 'agent', turn.reply, turn.agent);
  res.json(turn);
});

app.get('/api/insights', (_req, res) => res.json(insights()));

app.get('/api/navigator/queue', (_req, res) => res.json(navigatorQueue()));

app.post('/api/navigator/incidents/:id/ack', (req, res) => {
  db.prepare("UPDATE incidents SET status = 'acknowledged' WHERE id = ?").run(Number(req.params.id));
  audit(null, 'incident.acknowledged', { id: req.params.id });
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(
    `[raaha-server] listening on :${PORT} · engine=${llmConfigured() ? `llm (${MODEL})` : 'deterministic (no Anthropic credentials — set ANTHROPIC_API_KEY to go agentic)'}`,
  );
});
