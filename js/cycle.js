// Date helpers and all cycle maths (predictions, phases, stats, patterns).
// Dates are stored as plain "YYYY-MM-DD" text so time zones never shift them.

const DAY_MS = 86400000;
const pad = (n) => String(n).padStart(2, '0');

export function keyFromDate(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
export function todayKey() {
  return keyFromDate(new Date());
}
export function toNum(key) {
  const [y, m, d] = key.split('-').map(Number);
  return Math.round(Date.UTC(y, m - 1, d) / DAY_MS);
}
export function fromNum(n) {
  const d = new Date(n * DAY_MS);
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}
export const addDays = (key, n) => fromNum(toNum(key) + n);
export const diffDays = (a, b) => toNum(b) - toNum(a);
export function isValidKey(k) {
  return typeof k === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(k) && fromNum(toNum(k)) === k;
}
export function toLocalDate(key) {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}
export function fmt(key, opts = { day: 'numeric', month: 'short' }) {
  return toLocalDate(key).toLocaleDateString('en-GB', opts);
}
export const fmtLong = (key) => fmt(key, { weekday: 'short', day: 'numeric', month: 'short' });

const mean = (arr) => arr.reduce((x, y) => x + y, 0) / arr.length;
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

// Group period days into periods. A single missed day inside a period is allowed.
export function getPeriods(days) {
  const nums = [...new Set((days || []).filter(isValidKey).map(toNum))].sort((a, b) => a - b);
  const out = [];
  let cur = null;
  for (const n of nums) {
    if (cur && n - cur.e <= 2) cur.e = n;
    else {
      cur = { s: n, e: n };
      out.push(cur);
    }
  }
  return out.map((p) => ({ start: fromNum(p.s), end: fromNum(p.e), length: p.e - p.s + 1 }));
}

export function analyze(data, today = todayKey()) {
  const s = data.settings;
  const t = toNum(today);
  const periods = getPeriods(data.periodDays).filter((p) => toNum(p.start) <= t);
  const ended = new Set(data.endedPeriods || []);

  const cycles = [];
  for (let i = 0; i < periods.length - 1; i++) {
    cycles.push({ start: periods[i].start, length: diffDays(periods[i].start, periods[i + 1].start) });
  }
  // Ignore odd gaps (probably a forgotten log) when averaging.
  const validCycles = cycles.map((c) => c.length).filter((l) => l >= 15 && l <= 60);
  const recentCycles = validCycles.slice(-6);
  const avgCycle = recentCycles.length ? Math.round(mean(recentCycles)) : s.cycleLength;

  const last = periods[periods.length - 1];
  const lastStillGoing = last && !ended.has(last.start) && toNum(last.end) >= t - 1;
  const finished = periods.filter((p) => !(p === last && lastStillGoing)).map((p) => p.length).filter((l) => l <= 14);
  const recentLens = finished.slice(-6);
  const avgPeriod = recentLens.length ? clamp(Math.round(mean(recentLens)), 1, 10) : s.periodLength;

  const stats = {
    cyclesLogged: validCycles.length,
    shortest: validCycles.length ? Math.min(...validCycles) : null,
    longest: validCycles.length ? Math.max(...validCycles) : null,
  };
  stats.variation = validCycles.length >= 2 ? stats.longest - stats.shortest : null;

  const base = { today, periods, cycles, validCycles, avgCycle, avgPeriod, stats, usingDefaults: !recentCycles.length };

  if (!last) {
    return { ...base, hasData: false, phase: 'none', predicted: new Set(), fertile: new Set(), ovulationDays: new Set() };
  }

  const periodToday = (data.periodDays || []).includes(today);
  const askContinue = !periodToday && !ended.has(last.start) && toNum(last.end) === t - 1 && last.length < 10;
  const inPeriod = periodToday || askContinue;
  const cycleDay = t - toNum(last.start) + 1;
  const nextNum = toNum(last.start) + avgCycle;
  const daysUntil = nextNum - t;
  const daysLate = !inPeriod && daysUntil < 0 ? -daysUntil : 0;
  const isLate = daysLate >= s.lateAfter;
  const ovNum = nextNum - 14;
  const fertileStartNum = ovNum - 5;
  const fertileEndNum = ovNum + 1;

  let phase;
  if (inPeriod) phase = 'period';
  else if (isLate) phase = 'late';
  else if (daysUntil <= 5) phase = 'pms';
  else if (t >= fertileStartNum && t <= fertileEndNum) phase = 'fertile';
  else if (t < fertileStartNum) phase = 'follicular';
  else phase = 'luteal';

  // Calendar predictions
  const actual = new Set(data.periodDays || []);
  const predicted = new Set();
  const fertile = new Set();
  const ovulationDays = new Set();
  const addFertile = (startNum) => {
    const ov = startNum - 14;
    for (let n = ov - 5; n <= ov + 1; n++) {
      const k = fromNum(n);
      if (!actual.has(k)) fertile.add(k);
    }
    if (!actual.has(fromNum(ov))) ovulationDays.add(fromNum(ov));
  };
  // Past cycles (estimated from real period starts)
  for (let i = 1; i < periods.length; i++) addFertile(toNum(periods[i].start));
  // Current cycle
  addFertile(nextNum);
  // Future cycles. If late, the next period could come any day, so we start counting from today.
  const anchor = daysLate > 0 ? t : nextNum;
  for (let k = 0; k < 6; k++) {
    const st = anchor + k * avgCycle;
    if (!(daysLate > 0 && k === 0)) {
      for (let i = 0; i < avgPeriod; i++) {
        const n = st + i;
        if (n > t || (n === t && !inPeriod)) {
          const key = fromNum(n);
          if (!actual.has(key)) predicted.add(key);
        }
      }
    }
    if (k > 0) addFertile(st);
  }

  return {
    ...base,
    hasData: true,
    last,
    periodToday,
    askContinue,
    inPeriod,
    cycleDay,
    periodDayNum: inPeriod ? cycleDay : null,
    nextStart: fromNum(nextNum),
    daysUntil,
    daysLate,
    isLate,
    ovulation: fromNum(ovNum),
    ovulationToday: t === ovNum,
    fertileStart: fromNum(fertileStartNum),
    fertileEnd: fromNum(fertileEndNum),
    phase,
    predicted,
    fertile,
    ovulationDays,
  };
}

// Calendar grid: weeks (Monday first) for "YYYY-MM".
export function monthGrid(ym) {
  const [y, m] = ym.split('-').map(Number);
  const first = `${y}-${pad(m)}-01`;
  const dow = (new Date(y, m - 1, 1).getDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(y, m, 0).getDate();
  const start = addDays(first, -dow);
  const weeks = Math.ceil((dow + daysInMonth) / 7);
  const grid = [];
  for (let w = 0; w < weeks; w++) {
    const row = [];
    for (let d = 0; d < 7; d++) row.push(addDays(start, w * 7 + d));
    grid.push(row);
  }
  return grid;
}
export function shiftMonth(ym, n) {
  const [y, m] = ym.split('-').map(Number);
  const d = new Date(y, m - 1 + n, 1);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
}

// Look for symptoms or moods that keep coming back at the same point of the cycle.
export function findPatterns(data, periods, labels) {
  if (periods.length < 2) return [];
  const starts = periods.map((p) => toNum(p.start));
  const counts = new Map();
  for (const [key, log] of Object.entries(data.logs || {})) {
    if (!isValidKey(key) || !log) continue;
    const items = [...(log.symptoms || []).map((x) => ['sym', x]), ...(log.mood || []).map((x) => ['mood', x])];
    if (!items.length) continue;
    const n = toNum(key);
    let bucket = null;
    let cycleId = null;
    const inside = periods.find((p) => n >= toNum(p.start) && n <= toNum(p.end));
    if (inside) {
      bucket = 'during';
      cycleId = inside.start;
    } else {
      const next = starts.find((st) => st > n);
      if (next !== undefined) {
        const before = next - n;
        if (before <= 3) bucket = 'before3';
        else if (before <= 7) bucket = 'before7';
        cycleId = next;
      }
    }
    if (!bucket) continue;
    for (const [kind, id] of items) {
      const k = `${kind}|${id}|${bucket}`;
      if (!counts.has(k)) counts.set(k, new Set());
      counts.get(k).add(cycleId);
    }
  }
  const bucketText = {
    during: 'during your period',
    before3: 'in the 1–3 days before your period',
    before7: 'about a week before your period',
  };
  const out = [];
  for (const [k, set] of counts) {
    if (set.size < 2) continue;
    const [kind, id, bucket] = k.split('|');
    const label = labels[kind]?.[id];
    if (!label) continue;
    out.push({ kind, id, bucket, cycles: set.size, text: `${kind === 'mood' ? 'You often feel' : 'You often get'} ${label} ${bucketText[bucket]}` });
  }
  return out.sort((a, b) => b.cycles - a.cycles).slice(0, 6);
}
