// Cultural-calendar awareness — deterministic date logic, no API needed.
// Hijri dates drift ~11 days/year; ranges below are approximate and should be
// replaced by a maintained table before production. Good enough to demonstrate
// the USP: content that knows what season the workforce is living through.

const RAMADAN_RANGES = [
  // [startISO, endISO] approximate
  ['2026-02-17', '2026-03-19'],
  ['2027-02-07', '2027-03-08'],
];

export function culturalContext(now = new Date()) {
  const iso = now.toISOString().slice(0, 10);
  const month = now.getUTCMonth() + 1;
  const day = now.getUTCDate();

  const flags = [];

  if (RAMADAN_RANGES.some(([a, b]) => iso >= a && iso <= b)) {
    flags.push(
      'It is Ramadan: many employees are fasting — energy dips, disrupted sleep, and changed schedules are normal; frame advice around suhoor/iftar rhythms and avoid suggesting daytime eating/drinking.',
    );
  }
  if (month >= 6 && month <= 9) {
    flags.push(
      'It is Gulf summer heat season: outdoor and site workers face heat stress; midday work bans apply; fatigue and dehydration compound mental strain.',
    );
  }
  if (day >= 25 || day <= 3) {
    flags.push(
      'It is the payday/remittance window: financial pressure and family-remittance obligations peak now for many expatriate workers.',
    );
  }
  return flags;
}
