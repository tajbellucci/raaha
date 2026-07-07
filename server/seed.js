// Seeds synthetic aggregate data so the HR dashboard has k-anonymity-passing
// cells to display on a fresh install. Synthetic sessions carry NO message
// text — only triage events, which is all the insights layer reads anyway.
import { db } from './db.js';

const already = db.prepare("SELECT COUNT(*) AS n FROM sessions WHERE tenant = 'seed'").get().n;
if (already > 0) {
  console.log(`[seed] ${already} synthetic sessions already present — skipping`);
  process.exit(0);
}

const langs = ['ur', 'ur', 'ur', 'ar', 'ar', 'en', 'en', 'ml', 'tl'];
const topics = ['stress', 'sleep', 'burnout', 'manager', 'financial', 'family', 'homesick'];
const risks = ['low', 'low', 'low', 'low', 'low', 'low', 'low', 'moderate', 'moderate', 'high'];
const sites = ['site-a', 'site-a', 'site-b', 'hq'];

const insertSession = db.prepare(
  "INSERT INTO sessions (id, tenant, site, language, consent_at) VALUES (?, 'seed', ?, ?, datetime('now'))",
);
const insertTriage = db.prepare(
  'INSERT INTO triage_events (session_id, risk, topic, agent, engine) VALUES (?, ?, ?, ?, ?)',
);

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

for (let i = 0; i < 120; i++) {
  const id = `seed-${i}`;
  insertSession.run(id, pick(sites), pick(langs));
  const events = 1 + Math.floor(Math.random() * 3);
  for (let j = 0; j < events; j++) {
    const risk = pick(risks);
    insertTriage.run(
      id,
      risk,
      pick(topics),
      risk === 'low' ? 'psychoeducation' : 'navigator',
      'seed',
    );
  }
}

console.log('[seed] inserted 120 synthetic sessions with triage events');
