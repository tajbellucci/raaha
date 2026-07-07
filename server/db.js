// SQLite persistence via node:sqlite (Node 22.5+, stable in 24) — zero native deps.
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(here, 'data');
mkdirSync(dataDir, { recursive: true });

export const db = new DatabaseSync(path.join(dataDir, 'raaha.db'));

db.exec(`
  PRAGMA journal_mode = WAL;

  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    tenant TEXT NOT NULL DEFAULT 'demo',
    site TEXT NOT NULL DEFAULT 'main',
    language TEXT NOT NULL DEFAULT 'en',
    consent_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  -- Conversation log. PII-bearing free text lives ONLY here; the aggregate
  -- layer below never joins to this table.
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL REFERENCES sessions(id),
    sender TEXT NOT NULL CHECK (sender IN ('user','agent')),
    agent TEXT,
    content TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS triage_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL REFERENCES sessions(id),
    risk TEXT NOT NULL CHECK (risk IN ('low','moderate','high','emergency')),
    topic TEXT NOT NULL DEFAULT 'other',
    agent TEXT NOT NULL,
    engine TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS incidents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL REFERENCES sessions(id),
    severity TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open','acknowledged','closed')),
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    closed_at TEXT
  );

  CREATE TABLE IF NOT EXISTS audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT,
    event TEXT NOT NULL,
    detail TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

export function audit(sessionId, event, detail = null) {
  db.prepare('INSERT INTO audit_log (session_id, event, detail) VALUES (?, ?, ?)').run(
    sessionId,
    event,
    detail ? JSON.stringify(detail).slice(0, 2000) : null,
  );
}

export function getOrCreateSession(id, language = 'en', site = 'main') {
  const row = db.prepare('SELECT * FROM sessions WHERE id = ?').get(id);
  if (row) return row;
  db.prepare('INSERT INTO sessions (id, language, site) VALUES (?, ?, ?)').run(id, language, site);
  audit(id, 'session.created', { language, site });
  return db.prepare('SELECT * FROM sessions WHERE id = ?').get(id);
}

export function recordConsent(sessionId) {
  db.prepare("UPDATE sessions SET consent_at = datetime('now') WHERE id = ?").run(sessionId);
  audit(sessionId, 'consent.granted');
}

export function saveMessage(sessionId, sender, content, agent = null) {
  db.prepare('INSERT INTO messages (session_id, sender, content, agent) VALUES (?, ?, ?, ?)').run(
    sessionId,
    sender,
    content,
    agent,
  );
}

export function recentMessages(sessionId, limit = 12) {
  return db
    .prepare(
      'SELECT sender, agent, content FROM messages WHERE session_id = ? ORDER BY id DESC LIMIT ?',
    )
    .all(sessionId, limit)
    .reverse();
}

export function recordTriage(sessionId, { risk, topic, agent, engine }) {
  db.prepare(
    'INSERT INTO triage_events (session_id, risk, topic, agent, engine) VALUES (?, ?, ?, ?, ?)',
  ).run(sessionId, risk, topic, agent, engine);
}

export function openIncident(sessionId, severity) {
  const res = db
    .prepare('INSERT INTO incidents (session_id, severity) VALUES (?, ?)')
    .run(sessionId, severity);
  audit(sessionId, 'incident.opened', { severity });
  return res.lastInsertRowid;
}

// ---- Employer insights: aggregate-only, k-anonymity enforced here in the
// data layer (not the UI). No query in this function touches messages.content.
const K_FLOOR = Number(process.env.RAAHA_K_FLOOR || 8);

export function insights() {
  const suppress = (rows, countKey = 'n') => rows.filter((r) => r[countKey] >= K_FLOOR);

  const totalSessions = db.prepare('SELECT COUNT(*) AS n FROM sessions').get().n;
  const byLanguage = suppress(
    db
      .prepare(
        `SELECT s.language AS label, COUNT(DISTINCT t.session_id) AS n
         FROM triage_events t JOIN sessions s ON s.id = t.session_id
         GROUP BY s.language ORDER BY n DESC`,
      )
      .all(),
  );
  const byRisk = suppress(
    db.prepare('SELECT risk AS label, COUNT(*) AS n FROM triage_events GROUP BY risk').all(),
  );
  const byTopic = suppress(
    db
      .prepare('SELECT topic AS label, COUNT(*) AS n FROM triage_events GROUP BY topic ORDER BY n DESC')
      .all(),
  );
  const openIncidents = db
    .prepare("SELECT COUNT(*) AS n FROM incidents WHERE status = 'open'")
    .get().n;

  return {
    k_floor: K_FLOOR,
    note: 'Aggregates only. Cells under the k-anonymity floor are suppressed. This endpoint has no access to conversation text.',
    total_sessions: totalSessions,
    by_language: byLanguage,
    by_risk: byRisk,
    by_topic: byTopic,
    open_incidents: openIncidents,
  };
}

export function navigatorQueue() {
  // Navigator console sees triage context + incident state — not full transcripts.
  return db
    .prepare(
      `SELECT i.id, i.session_id, i.severity, i.status, i.created_at,
              s.language, s.site
       FROM incidents i JOIN sessions s ON s.id = i.session_id
       WHERE i.status != 'closed'
       ORDER BY CASE i.severity WHEN 'emergency' THEN 0 WHEN 'high' THEN 1 ELSE 2 END, i.created_at`,
    )
    .all();
}
