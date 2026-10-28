// Checks how two copies of the progress are put together (src/84-merge.js), with no browser.
import fs from 'fs';
import { check } from './lib.mjs';

const src = fs.readFileSync(new URL('../src/84-merge.js', import.meta.url), 'utf8');
const {syncPart, merge, canon, hasProgress} = new Function(src + '; return {syncPart, merge, canon, hasProgress};')();
const R = [];
const T = 1760000000000, min = 60000;

// What goes to the account and what stays on the device.
const dev = {ans: {c1p1a: {ok: true, n: 1, t: T}}, m: {h: {}, best: {}, cur: 'm1', start: 'm1'}, c: {edexcel: {cur: 'e1', start: 'e1'}}, subject: 'eco', cur: 'c1', start: 'c1',
  theme: 'dark', bg: 'sky', sound: false, music: false, place: {country: 'AU', state: 'nsw'}, th: {aisha: []}, unread: {}, mid: 10, name: 'Ace', rocket: 'classic', exhaust: 'kerosene', streak: 2, lastDay: '2026-10-16'};
const part = syncPart(dev);
check(['ans', 'm', 'c', 'subject', 'cur', 'start', 'rocket', 'exhaust', 'streak', 'lastDay'].every(k => k in part), 'the account gets answers, records, the chapter, the streak, the rocket', R);
check(['theme', 'bg', 'sound', 'music', 'place', 'th', 'unread', 'mid', 'name'].every(k => !(k in part)), 'appearance, sound, the place, the sample messages and the call sign stay out of it', R);
part.ans.c1p1a.ok = false;
check(dev.ans.c1p1a.ok === true, 'the synced part is a copy: changing it leaves the save alone', R);
check(hasProgress(dev) && !hasProgress({ans: {}, m: {h: {m1p1: []}}}) && hasProgress({m: {h: {m1p1: [{ok: true, t: 1, q: 'a'}]}}}), 'hasProgress sees answers in either subject', R);

// Economics: the latest answer to each question wins; tries are the larger count.
const a = {ans: {c1p1a: {ok: true, n: 2, t: T}, c1p2a: {ok: true, n: 1, t: T}}};
const b = {ans: {c1p1a: {ok: false, n: 1, t: T + min}, c1p3b: {ok: true, n: 1, t: T}}};
const ab = merge(a, b);
check(ab.ans.c1p1a.ok === false && ab.ans.c1p1a.t === T + min, 'the more recent answer to a question wins (wrong on the other device later makes it weak)', R);
check(ab.ans.c1p1a.n === 2, 'the try count is the larger of the two', R);
check(ab.ans.c1p2a && ab.ans.c1p3b, 'questions answered on only one device are kept', R);
check(canon(merge(a, b)) === canon(merge(b, a)), 'the order the two copies are given in makes no difference', R);
check(canon(merge(ab, b)) === canon(ab) && canon(merge(ab, ab)) === canon(ab), 'putting a copy together with itself, or again, changes nothing', R);

// Maths: answers put together in time order, each kept once, the last six stay.
const r = (i, ok, q) => ({ok: ok, day: '2026-10-1' + (i % 9), q: q || 'q' + i, t: T + i * min});
const ma = {m: {h: {m1p1: [r(1, true), r(3, true)]}}}, mb = {m: {h: {m1p1: [r(1, true), r(2, true), r(4, false)]}}};
const mab = merge(ma, mb).m.h.m1p1;
check(mab.map(x => x.t - T).join() === [1, 2, 3, 4].map(i => i * min).join(), 'maths answers from both devices go together in time order, the shared one once', R);
const long = merge({m: {h: {m1p2: [1, 2, 3, 4, 5].map(i => r(i, true))}}}, {m: {h: {m1p2: [6, 7, 8].map(i => r(i, true))}}}).m.h.m1p2;
check(long.length === 6 && long[0].t === T + 3 * min, 'only the last six maths answers stay', R);
// Proven needs the last three right with different numbers. Each device has two right; together they make it proven.
const pa = {m: {h: {m1p3: [r(1, true, 'x=1'), r(3, true, 'x=3')]}}}, pb = {m: {h: {m1p3: [r(2, true, 'x=2')]}}};
const last3 = merge(pa, pb).m.h.m1p3.slice(-3);
check(last3.every(x => x.ok) && new Set(last3.map(x => x.q)).size === 3, 'two right on one device and one on the other make three in a row', R);

// Records: highest altitude and combo, fastest time.
const rec = merge({bestKm: 100, bestCombo: 9, m: {bestKm: 5, best: {'all:8': 90000}}, c: {edexcel: {bestKm: 7}}},
  {bestKm: 50, bestCombo: 12, m: {bestKm: 8, bestCombo: 3, best: {'all:8': 80000, 'm1:16': 200000}}, c: {edexcel: {bestKm: 3, bestCombo: 4}}});
check(rec.bestKm === 100 && rec.bestCombo === 12, 'Economics keeps the higher altitude and the higher combo', R);
check(rec.m.bestKm === 8 && rec.m.bestCombo === 3 && rec.m.best['all:8'] === 80000 && rec.m.best['m1:16'] === 200000, 'maths keeps its records and the faster best time for each set', R);
check(rec.c.edexcel.bestKm === 7 && rec.c.edexcel.bestCombo === 4, 'a course keeps its own records', R);

// Streak and counts.
const s1 = merge({streak: 5, lastDay: '2026-10-15'}, {streak: 1, lastDay: '2026-10-17'});
check(s1.streak === 1 && s1.lastDay === '2026-10-17', 'the streak comes from the device that studied on the later day', R);
check(merge({streak: 5, lastDay: '2026-10-17'}, {streak: 3, lastDay: '2026-10-17'}).streak === 5, 'studied on the same day: the longer streak wins', R);
const wk = merge({week: {k: '2026-10-12', n: 30}, day: {k: '2026-10-17', n: 4}}, {week: {k: '2026-10-12', n: 12}, day: {k: '2026-10-16', n: 9}});
check(wk.week.n === 30 && wk.day.k === '2026-10-17' && wk.day.n === 4, 'the same week keeps the higher count; a later day wins', R);
check(merge({week: {k: '2026-10-05', n: 80}}, {week: {k: '2026-10-12', n: 2}}).week.n === 2, 'a new week replaces last week', R);

// The rest: the device answered most recently.
const older = {ans: {c1p1a: {ok: true, n: 1, t: T}}, subject: 'maths', cur: 'c1', rocket: 'classic', m: {cur: 'm1'}};
const newer = {ans: {c1p2a: {ok: true, n: 1, t: T + min}}, subject: 'eco', cur: 'c2', rocket: 'needle', m: {cur: 'm2'}};
const n1 = merge(older, newer);
check(n1.subject === 'eco' && n1.cur === 'c2' && n1.rocket === 'needle' && n1.m.cur === 'm2', 'the subject, chapter and rocket come from the device answered most recently', R);
check(merge({}, newer).subject === 'eco' && merge(older, {}).subject === 'maths', 'an empty copy takes everything from the other', R);

// Where the class was up to (start), in each subject: the device answered most recently, or the only one that has it.
const st1 = merge({ans: {c1p1a: {ok: true, n: 1, t: T}}, start: 'c2', m: {start: 'm2'}, c: {edexcel: {start: 'x2c1'}}},
  {ans: {c1p2a: {ok: true, n: 1, t: T + min}}, start: 'c3', c: {edexcel: {}}});
check(st1.start === 'c3' && st1.m.start === 'm2' && st1.c.edexcel.start === 'x2c1', 'the starting chapter comes from the device answered most recently, or from the one copy that has it', R);
check(syncPart({start: 'c2', m: {start: 'm2'}, c: {edexcel: {start: 'x1c3'}}}).start === 'c2' && canon(merge(st1, {})) === canon(merge({}, st1)), 'the starting chapter goes to the account, and the order makes no difference', R);

// canon gives the same text whatever order the keys are in, as the database returns them.
check(canon({b: 1, a: {d: [1, {y: 2, x: 1}], c: null}}) === canon({a: {c: null, d: [1, {x: 1, y: 2}]}, b: 1}), 'canon ignores the order of keys', R);

console.log(R.join('\n'));
