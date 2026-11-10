// Run with: node tests/cycle.test.mjs
import assert from 'node:assert/strict';
import { analyze, getPeriods, addDays, findPatterns, monthGrid } from '../js/cycle.js';

const settings = { cycleLength: 28, periodLength: 5, lateAfter: 5, showFertility: true };
const range = (s, n) => Array.from({ length: n }, (_, i) => addDays(s, i));
const mk = (days, extra = {}) => ({ settings, periodDays: days, endedPeriods: [], logs: {}, ...extra });

// grouping, with a one-day gap allowed
assert.deepEqual(getPeriods(['2026-01-01', '2026-01-02', '2026-01-04', '2026-02-01']).map(p => p.length), [4, 1]);

// no data
assert.equal(analyze(mk([]), '2026-03-01').phase, 'none');

// 3 periods, 30-day cycles
const days = [...range('2026-08-01', 5), ...range('2026-08-31', 5), ...range('2026-09-30', 5)];
const ended = ['2026-08-01', '2026-08-31', '2026-09-30'];
let A = analyze(mk(days, { endedPeriods: ended }), '2026-10-10');
assert.equal(A.avgCycle, 30);
assert.equal(A.avgPeriod, 5);
assert.equal(A.nextStart, '2026-10-30');
assert.equal(A.daysUntil, 20);
assert.equal(A.phase, 'follicular');
assert.equal(A.ovulation, '2026-10-16');
assert.ok(A.predicted.has('2026-10-30') && A.predicted.has('2026-11-29'));

assert.equal(analyze(mk(days, { endedPeriods: ended }), '2026-10-15').phase, 'fertile');
assert.equal(analyze(mk(days, { endedPeriods: ended }), '2026-10-20').phase, 'luteal');
assert.equal(analyze(mk(days, { endedPeriods: ended }), '2026-10-27').phase, 'pms');
A = analyze(mk(days, { endedPeriods: ended }), '2026-11-01');
assert.equal(A.daysLate, 2); assert.equal(A.phase, 'pms'); assert.equal(A.isLate, false);
A = analyze(mk(days, { endedPeriods: ended }), '2026-11-05');
assert.equal(A.daysLate, 6); assert.equal(A.phase, 'late'); assert.equal(A.isLate, true);
assert.ok(!A.predicted.has('2026-11-05'));

// in period, and "still going?" the day after the last logged day
const cur = [...days, '2026-10-30'];
A = analyze(mk(cur, { endedPeriods: ended }), '2026-10-30');
assert.equal(A.phase, 'period'); assert.equal(A.periodDayNum, 1);
A = analyze(mk(cur, { endedPeriods: ended }), '2026-10-31');
assert.equal(A.askContinue, true); assert.equal(A.periodDayNum, 2);
A = analyze(mk(cur, { endedPeriods: [...ended, '2026-10-30'] }), '2026-10-31');
assert.equal(A.askContinue, false); assert.notEqual(A.phase, 'period');

// outlier gap ignored for average
A = analyze(mk([...range('2026-01-01', 4), ...range('2026-04-15', 4), ...range('2026-05-13', 4)], { endedPeriods: ['2026-01-01', '2026-04-15', '2026-05-13'] }), '2026-05-20');
assert.equal(A.avgCycle, 28);

// patterns
const logs = { '2026-08-29': { symptoms: ['headache'] }, '2026-09-28': { symptoms: ['headache'] }, '2026-08-02': { mood: ['sad'] } };
const pats = findPatterns({ logs }, getPeriods(days), { sym: { headache: 'headaches' }, mood: { sad: 'sad' } });
assert.equal(pats.length, 1);
assert.match(pats[0].text, /headaches in the 1–3 days before/);

// calendar grid: Nov 2026 starts on a Sunday -> Monday-first grid starts 26 Oct
assert.equal(monthGrid('2026-11')[0][0], '2026-10-26');

console.log('All cycle tests passed ✓');
