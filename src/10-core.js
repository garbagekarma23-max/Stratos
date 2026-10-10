/* ---------- small tools ---------- */
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
const plural = (n, word) => n + ' ' + word + (n === 1 ? '' : 's');
const reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

/* ---------- icons and rockets, drawn as small SVG pictures ---------- */
const icon = d => '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">' + d + '</svg>';
const IC = {
  tick: '<svg class="tick" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  cross: '<svg class="cross" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  clue: icon('<path d="M9.5 19h5M10.5 22h3"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.2h5c0-.9.4-1.7 1.1-2.2A6 6 0 0 0 12 3z"/>'),
  eye: icon('<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
  skip: icon('<path d="M5 5l9 7-9 7z"/><path d="M19 5v14"/>'),
  down: icon('<path d="M6 9l6 6 6-6"/>'),
  right: icon('<path d="M9 6l6 6-6 6"/>'),
  left: icon('<path d="M15 6l-6 6 6 6"/>'),
  lock: icon('<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),
  send: icon('<path d="M21 3 10.5 13.5"/><path d="M21 3l-6.5 18-4-7.5-7.5-4z"/>'),
  book: icon('<path d="M5 19.5V5a2 2 0 0 1 2-2h12v14H7a2 2 0 0 0-2 2.5z"/><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-4"/><path d="M9 7.5h6"/>'),
  sound: icon('<path d="M4 10v4h3.5L12 18V6L7.5 10z"/><path d="M15.5 9.5a3.5 3.5 0 0 1 0 5M18 7a7 7 0 0 1 0 10"/>')
};
const RK = {
  classic: '<path class="rk-flame" d="M8.5 28C8.5 33 10.5 36 12 39.5C13.5 36 15.5 33 15.5 28Z"/><path class="fin" d="M4 20L1 28L1 30L6.2 27Z"/><path class="fin" d="M20 20L23 28L23 30L17.8 27Z"/><path class="hull" d="M12 1C16.5 5 18 11 18 18L18 27L6 27L6 18C6 11 7.5 5 12 1Z"/><circle class="port" cx="12" cy="13.5" r="2.7"/><rect class="noz" x="9" y="27" width="6" height="2" rx="1"/>',
  needle: '<path class="rk-flame" d="M9.5 30C9.5 34 11 37 12 39.5C13 37 14.5 34 14.5 30Z"/><path class="fin" d="M8.5 21L4.5 29.5L4.5 31L8.5 29Z"/><path class="fin" d="M15.5 21L19.5 29.5L19.5 31L15.5 29Z"/><path class="hull" d="M12 0.5C14.6 5 15.5 10 15.5 16L15.5 29L8.5 29L8.5 16C8.5 10 9.4 5 12 0.5Z"/><rect class="fin" x="8.5" y="17.5" width="7" height="1.8"/><circle class="port" cx="12" cy="11.5" r="1.9"/><rect class="noz" x="10" y="29" width="4" height="1.6" rx=".8"/>',
  shuttle: '<path class="rk-flame" d="M9 30C9 34 10.8 37 12 39.5C13.2 37 15 34 15 30Z"/><path class="fin" d="M7.5 13L1.5 27L1.5 29.5L7.5 28Z"/><path class="fin" d="M16.5 13L22.5 27L22.5 29.5L16.5 28Z"/><path class="hull" d="M12 2C15 4.5 16.5 8.5 16.5 14L16.5 29L7.5 29L7.5 14C7.5 8.5 9 4.5 12 2Z"/><path class="port" d="M9.4 10C10 8 11 6.8 12 6C13 6.8 14 8 14.6 10Z"/><rect class="noz" x="9.5" y="29" width="5" height="1.8" rx=".9"/>',
  saucer: '<path class="rk-flame" d="M9 23C9 30 10.8 35 12 39C13.2 35 15 30 15 23Z"/><path class="fin" d="M6.5 17C6.5 11.5 9 9 12 9C15 9 17.5 11.5 17.5 17Z"/><ellipse class="hull" cx="12" cy="19" rx="11" ry="4.5"/><circle class="port" cx="6" cy="19.3" r="1"/><circle class="port" cx="12" cy="20.3" r="1"/><circle class="port" cx="18" cy="19.3" r="1"/>',
  comet: '<path class="rk-flame" d="M5.5 15C5.5 26 9.5 34 12 39.5C14.5 34 18.5 26 18.5 15Z"/><circle class="hull" cx="12" cy="13" r="8"/><path class="fin" d="M4.25 15L19.75 15L18.8 17.2L5.2 17.2Z"/><circle class="port" cx="12" cy="10.5" r="2.4"/>'
};
const rocketSvg = (id, cls) => '<svg class="rk' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 40" aria-hidden="true">' + (RK[id] || RK.classic) + '</svg>';

/* ---------- the game: combo tiers, exhaust colours and the journey ---------- */
/* Exhaust colours: four combo tiers each, coolest to hottest. */
const EXHAUST = {
  kerosene: {name: 'Kerosene', c: ['#ff7a1a', '#ffab2e', '#ffd84a', '#fff3c4']},
  ion: {name: 'Ion', c: ['#35c2ff', '#6fdcff', '#a7f0ff', '#f0fdff']},
  plasma: {name: 'Plasma', c: ['#ff4fb3', '#ff7fd0', '#d39bff', '#f7eaff']},
  aurora: {name: 'Aurora', c: ['#2ee6a6', '#7cf58d', '#d4ff6a', '#fbffe0']},
  solar: {name: 'Solar', c: ['#ffd23f', '#ffe27a', '#fff0b3', '#ffffff'], price: '$0.99'},
  nebula: {name: 'Nebula', c: ['#8f7bff', '#b79bff', '#ff9be8', '#ffe9fb'], price: '$0.99'}
};
const TIERS = [{at: 0, label: 'Combo'}, {at: 3, label: 'Ignition'}, {at: 5, label: 'Burn'}, {at: 8, label: 'Afterburner'}, {at: 12, label: 'White hot'}];
const BUZZ = [12, 22, [22, 30, 34], [30, 30, 50], [40, 30, 80]];

/* The journey. Distances are real, in km from Earth.
   The altimeter is logarithmic: 1 km at the bottom, 10^24 km at the top.
   Scoring: every correct answer multiplies the altitude by 2 x combo x difficulty. */
const LY = 9.461e12, TOP_L = 24;
const MILES = [
  {at: 0, name: 'Troposphere', end: 'You stayed in the troposphere.'},
  {at: 12, name: 'Stratosphere', stop: 'the stratosphere', toast: 'Stratosphere reached', end: 'You reached the stratosphere.', m: {k: 'tick'}},
  {at: 50, name: 'Mesosphere', end: 'You reached the mesosphere.'},
  {at: 85, name: 'Thermosphere', end: 'You reached the thermosphere.'},
  {at: 100, name: 'Space', stop: 'space', toast: 'Kármán line crossed. You are in space.', end: 'You made it to space.', m: {k: 'tick'}},
  {at: 400, name: 'Earth orbit', stop: 'orbit', toast: 'Orbit reached. ISS altitude.', end: 'You made it to orbit.', m: {k: 'dot', c: '#ffffff', s: 5}},
  {at: 384400, name: 'Past the Moon', stop: 'the Moon', toast: 'You passed the Moon.', end: 'You flew past the Moon.', m: {k: 'dot', c: '#d9dee9', s: 7}},
  {at: 5.5e7, name: 'Past Mars', stop: 'Mars', toast: 'You passed Mars.', end: 'You flew past Mars.', m: {k: 'dot', c: '#e8734a', s: 7}},
  {at: 5.9e8, name: 'Past Jupiter', stop: 'Jupiter', toast: 'You passed Jupiter.', end: 'You flew past Jupiter.', m: {k: 'dot', c: '#e0b98c', s: 10}},
  {at: 4.3e9, name: 'Past Neptune', stop: 'Neptune', toast: 'You passed Neptune, the last planet.', end: 'You flew past Neptune.', m: {k: 'dot', c: '#5b8dff', s: 8}},
  {at: 2.5e10, name: 'Interstellar space', stop: 'Voyager 1', toast: 'You passed Voyager 1, the farthest thing humans have launched.', end: 'You reached interstellar space.', m: {k: 'dot', c: '#ffffff', s: 4}},
  {at: 4.0e13, name: 'Among the stars', stop: 'the nearest star', toast: 'You passed Proxima Centauri, the nearest star.', end: 'You flew past the nearest star.', m: {k: 'star', c: '#ffe08a', s: 7}},
  {at: 9.5e17, name: 'Between galaxies', stop: 'the far side of the Milky Way', toast: 'You have flown farther than the Milky Way is wide.', end: 'You left the Milky Way behind.', m: {k: 'galaxy', c: '#c9a7ff'}},
  {at: 2.4e19, name: 'Past Andromeda', stop: 'the Andromeda galaxy', toast: 'You passed Andromeda, the nearest big galaxy.', end: 'You flew past the Andromeda galaxy.', m: {k: 'galaxy', c: '#9fd0ff'}},
  {at: 4.4e23, name: 'Multiverse', stop: 'the edge of the observable universe', toast: 'You left the observable universe. Welcome to the multiverse.', end: 'You left the observable universe and reached the multiverse.', m: {k: 'edge'}}
];
/* Sky colour stops for the Sky background, by log10(km): [level, top rgb, bottom rgb] */
const SKY = [
  [0, [31, 88, 194], [50, 116, 214]],
  [1.08, [26, 71, 171], [42, 98, 196]],
  [2, [12, 28, 94], [23, 53, 132]],
  [2.6, [5, 11, 48], [12, 26, 82]],
  [5.6, [3, 6, 28], [8, 15, 54]],
  [10.4, [5, 4, 30], [13, 10, 60]],
  [13.6, [10, 5, 38], [23, 11, 72]],
  [18, [20, 6, 46], [42, 12, 82]],
  [19.4, [28, 6, 48], [58, 13, 84]],
  [23.64, [58, 10, 82], [8, 60, 80]],
  [26, [58, 10, 82], [8, 60, 80]]
];
/* The names for big numbers, written out in full on screen. */
const BIG = [[1e6, 'million'], [1e9, 'billion'], [1e12, 'trillion'], [1e15, 'quadrillion'], [1e18, 'quintillion'], [1e21, 'sextillion'],
  [1e24, 'septillion'], [1e27, 'octillion'], [1e30, 'nonillion'], [1e33, 'decillion']];

/* ---------- the store. Prices are examples. Nothing here can be bought in this test. ---------- */
const BGS = [
  {id: 'plain', name: 'Plain', cls: 'bg-plain'},
  {id: 'sky', name: 'Sky', cls: 'bg-sky'},
  {id: 'deep', name: 'Deep field', cls: 'bg-deep', price: '$2.99'},
  {id: 'aurora', name: 'Aurora', cls: 'bg-aurora', price: '$2.99'},
  {id: 'dusk', name: 'Dusk', cls: 'bg-dusk', price: '$2.99'},
  {id: 'blue', name: 'Blueprint', cls: 'bg-blue', price: '$2.99'}
];
const ROCKETS = [
  {id: 'classic', name: 'Classic'},
  {id: 'needle', name: 'Needle'},
  {id: 'shuttle', name: 'Shuttle', price: '$1.99'},
  {id: 'saucer', name: 'Saucer', price: '$1.99'},
  {id: 'comet', name: 'Comet', earn: 30}
];
const SOUNDS = [
  {id: 'ignition', name: 'Ignition'},
  {id: 'thunder', name: 'Thunder', price: '$1.99'},
  {id: 'arcade', name: 'Arcade', price: '$1.99'}
];
const PACK = {name: 'Deep space pack', items: 'Deep field, Saucer and Nebula together', price: '$4.99'};

/* ---------- sample friends. week is their correct answers this week, skill and pace drive the pretend play ---------- */
const FRIENDS = [
  {id: 'aisha', name: 'Aisha', week: 64, skill: 0.86, pace: 11},
  {id: 'noah', name: 'Noah', week: 41, skill: 0.76, pace: 13},
  {id: 'mia', name: 'Mia', week: 27, skill: 0.68, pace: 15},
  {id: 'tom', name: 'Tom', week: 12, skill: 0.55, pace: 18}
];
const friend = id => FRIENDS.find(f => f.id === id) || FRIENDS[0];
const REPLIES = ['Nice one', 'Rematch?', 'Too easy', 'Good game'];

/* ---------- saved settings, progress and messages (this device only) ---------- */
const KEY = 'stratos2.v1';
let saved = {};
function save(patch) { if (patch) Object.assign(saved, patch); try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) {} }
function loadSaved() {
  try { saved = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { saved = {}; }
  tidySaved();
}
function tidySaved() {
  if (!saved || typeof saved !== 'object' || Array.isArray(saved)) saved = {};
  if (!saved.ans || typeof saved.ans !== 'object') saved.ans = {};
  /* Maths keeps its own progress under m, apart from Economics: h holds each point's last answers, cur its chapter. */
  if (!saved.m || typeof saved.m !== 'object' || Array.isArray(saved.m)) saved.m = {};
  if (!saved.m.h || typeof saved.m.h !== 'object') saved.m.h = {};
  /* best: the fastest finished maths flight for each set of questions ('all' or a chapter id, then the length), in ms. */
  if (!saved.m.best || typeof saved.m.best !== 'object' || Array.isArray(saved.m.best)) saved.m.best = {};
  if (saved.subject !== 'maths') saved.subject = 'eco';
  setSubject(saved.subject);
  if (!EXHAUST[saved.exhaust] || EXHAUST[saved.exhaust].price) saved.exhaust = 'kerosene';
  if (saved.bg !== 'sky') saved.bg = 'plain';
  if (saved.theme !== 'light' && saved.theme !== 'dark') saved.theme = 'system';
  if (!saved.th || typeof saved.th !== 'object' || !FRIENDS.every(f => Array.isArray(saved.th[f.id]))) seedThreads();
  if (!saved.unread || typeof saved.unread !== 'object') saved.unread = {};
  if (!ownsRocket(saved.rocket)) saved.rocket = 'classic';
  /* A challenge a friend was still playing when the page closed is finished now. */
  FRIENDS.forEach(f => saved.th[f.id].forEach(m => { if (m.kind === 'challenge' && m.state === 'wait') { m.them = pretendScore(f, m.total); m.state = 'done'; } }));
}
function seedThreads() {
  const now = Date.now(), hour = 36e5;
  saved.th = {
    aisha: [{id: 1, from: 'them', kind: 'race', ch: 'c1', state: 'open', t: now - hour}],
    noah: [{id: 2, from: 'them', kind: 'result', km: 1.65e8, combo: 9, first: 7, total: 8, t: now - 2 * hour}],
    mia: [{id: 3, from: 'them', kind: 'challenge', ch: 'c1', them: 6, me: null, total: 8, state: 'open', t: now - 3 * hour}],
    tom: []
  };
  saved.unread = {aisha: 1, mia: 1};
  saved.mid = 10;
}
function pretendScore(f, total) { let n = 0; for (let i = 0; i < total; i++) if (Math.random() < f.skill) n++; return n; }
function ownsRocket(id) { const r = ROCKETS.find(x => x.id === id); return !!r && !r.price && (!r.earn || streakNow() >= r.earn); }

const dayKey = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
function yesterday() { const y = new Date(); y.setDate(y.getDate() - 1); return dayKey(y); }
function weekKey() { const d = new Date(); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return dayKey(d); }
function markDay() {
  const today = dayKey(new Date());
  if (saved.lastDay === today) return;
  save({streak: saved.lastDay === yesterday() ? (saved.streak || 0) + 1 : 1, lastDay: today});
}
function streakNow() {
  if (!saved.lastDay) return 0;
  return (saved.lastDay === dayKey(new Date()) || saved.lastDay === yesterday()) ? (saved.streak || 0) : 0;
}
function weekCount() { return saved.week && saved.week.k === weekKey() ? saved.week.n : 0; }

/* ---------- the content, indexed ----------
   Two subjects: Economics (content.js) and Maths (maths-content.js). PT holds every point of both, by id.
   Maths ids start with m, so they never clash with Economics ids.
   SUB is the subject picked on Home. CH and ALL are its chapters and its points, and change when the subject does. */
const PT = {};
function indexTopic(topic, sub) {
  const all = [];
  topic.chapters.forEach((c, ci) => {
    c.sub = sub;
    c.points.forEach((p, pi) => { p.ch = c.id; p.ci = ci; p.pi = pi; p.sub = sub; if (p.a) p.a.d = 1; PT[p.id] = p; all.push(p); });
  });
  return {id: sub, topic: topic, ch: topic.chapters, all: all};
}
const SUBJECTS = {eco: indexTopic(TOPIC, 'eco'), maths: indexTopic(MATHS, 'maths')};
let SUB = SUBJECTS.eco, CH = SUB.ch, ALL = SUB.all;
function setSubject(id) { SUB = SUBJECTS[id] || SUBJECTS.eco; CH = SUB.ch; ALL = SUB.all; }
const isMaths = () => SUB.id === 'maths';
const chOf = id => SUBJECTS.eco.ch.find(c => c.id === id) || SUBJECTS.maths.ch.find(c => c.id === id);
const dOf = x => PT[x.p][x.k].d;

/* ---------- what the student knows ----------
   Economics: every answer is remembered per question: ok is the latest result, n counts the tries and t is the time.
   A point is new until one of its two questions is answered. It is weak while either was last answered wrong,
   proven when both were last answered right, and learned in between. */
const ansOf = (pid, k) => saved.ans[pid + k] || null;
function statusOf(pid) {
  if (PT[pid] && PT[pid].sub === 'maths') return mathsStatus(pid);
  const a = ansOf(pid, 'a'), b = ansOf(pid, 'b');
  if (!a && !b) return 'new';
  if ((a && !a.ok) || (b && !b.ok)) return 'weak';
  return a && b ? 'proven' : 'learned';
}
/* Maths: each point keeps its last six answers: right or not (ok), the day, the question (q, which tells
   different numbers apart) and the time (t). One right answer does not show a student can do the type, so:
   a point is new with no answers, and weak if the last answer was wrong (a wrong answer also ends its run).
   It is proven when the last three answers were all right, each with different numbers. It is learned in between.
   There is no rule about days: spacing comes from Practice bringing back points, never from a lock. */
const mHist = pid => saved.m.h[pid] || [];
function runOf(pid) { const h = mHist(pid); let n = 0; for (let i = h.length - 1; i >= 0 && h[i].ok; i--) n++; return n; }
function mathsStatus(pid) {
  const h = mHist(pid), last = h.slice(-3);
  if (!h.length) return 'new';
  if (!h[h.length - 1].ok) return 'weak';
  if (last.length === 3 && last.every(r => r.ok) && new Set(last.map(r => r.q)).size === 3) return 'proven';
  return 'learned';
}
/* src is 'p' for an answer given in Practice, so Practice can tell points it has never asked about. */
function recordMaths(pid, q, ok, src) {
  const r = {ok: ok, day: dayKey(new Date()), q: q, t: Date.now()};
  if (src) r.src = src;
  saved.m.h[pid] = mHist(pid).concat([r]).slice(-6);
  counted(ok);
  save();
}
const STATUS = {new: 'New', learned: 'Learned', weak: 'Weak', proven: 'Proven'};
function record(pid, k, ok) {
  const id = pid + k, r = saved.ans[id];
  saved.ans[id] = {ok: ok, n: (r ? r.n : 0) + 1, t: Date.now()};
  counted(ok);
  save();
}
/* Every answer, in either subject, counts toward the study day, the streak and the week's right answers. */
function counted(ok) {
  const today = dayKey(new Date());
  if (!saved.day || saved.day.k !== today) saved.day = {k: today, n: 0};
  saved.day.n++;
  if (saved.day.n >= 5) markDay();                      /* five answers make a study day */
  if (ok) {
    if (!saved.week || saved.week.k !== weekKey()) saved.week = {k: weekKey(), n: 0};
    saved.week.n++;
  }
}
/* A chapter's bar. Economics: the share of its questions that are right, two per point.
   Maths: each point counts three thirds. Each right answer in a row fills one, and the last third only fills
   once the point is proven, so the bar never shows 100% for a chapter that is not proven. */
function chStats(ch) {
  let learned = 0, weak = 0, proven = 0, ok = 0;
  const maths = ch.sub === 'maths', per = maths ? 3 : 2;
  ch.points.forEach(p => {
    const s = statusOf(p.id);
    if (s !== 'new') learned++;
    if (s === 'weak') weak++;
    if (s === 'proven') proven++;
    if (maths) ok += s === 'proven' ? 3 : Math.min(runOf(p.id), 2);
    else ['a', 'b'].forEach(k => { const r = ansOf(p.id, k); if (r && r.ok) ok++; });
  });
  const n = ch.points.length;
  return {n: n, learned: learned, weak: weak, proven: proven, ok: ok, pct: Math.round(ok / (per * n) * 100), lpct: Math.round(learned / n * 100), ppct: Math.round(proven / n * 100)};
}
/* What a chapter row says. Learning comes first, then proving, so a learned chapter never looks unfinished. */
function chStage(ch) {
  const s = chStats(ch);
  if (!s.learned) return {t: 'Not started'};
  if (s.learned < s.n) return {t: s.learned + ' of ' + s.n + ' learned'};
  if (s.proven === s.n) return {t: 'Proven'};
  return {t: 'Learned, ' + s.proven + ' of ' + s.n + ' proven'};
}
/* The best altitude and best combo for the subject picked. Each subject keeps its own:
   Economics in bestKm and bestCombo, Maths in m.bestKm and m.bestCombo (its combo counts lines, not answers). */
const records = () => isMaths() ? {km: saved.m.bestKm || 0, combo: saved.m.bestCombo || 0} : {km: saved.bestKm || 0, combo: saved.bestCombo || 0};
const weakPoints = () => ALL.filter(p => statusOf(p.id) === 'weak');
const learnedPoints = () => ALL.filter(p => statusOf(p.id) !== 'new');
const provenCount = () => ALL.filter(p => statusOf(p.id) === 'proven').length;
/* The chapter Home shows: the one the student last opened, or the first that is not finished.
   Each subject remembers its own: Economics in cur, Maths in m.cur. */
function setCur(id) { if (isMaths()) { saved.m.cur = id; save(); } else save({cur: id}); }
function curCh() {
  const id = isMaths() ? saved.m.cur : saved.cur, c = CH.find(x => x.id === id);
  if (c && chStats(c).pct < 100) return c;
  return CH.find(x => chStats(x).pct < 100) || CH[CH.length - 1];
}
const names = pts => pts.map(p => p.title).join(', ');
/* What the big button on Home does next. */
function nextStep() {
  if (isMaths()) return mathsNext();
  const ch = curCh(), st = chStats(ch), weak = weakPoints();
  if (CH.every(c => chStats(c).pct === 100)) return {label: 'Keep it sharp', sub: 'Every point is proven. A mixed flight keeps it that way.', run: () => startPractice({mode: 'mix', len: 8})};
  const nxt = ch.points.find(p => statusOf(p.id) === 'new');
  if (weak.length >= 3 || (weak.length && !nxt)) return {label: 'Fix ' + plural(weak.length, 'weak point'), sub: names(weak.slice(0, 3)) + (weak.length > 3 ? ' and ' + (weak.length - 3) + ' more' : ''), run: () => startPractice({mode: 'mix', len: 8})};
  if (nxt) return {label: st.learned ? 'Learn the next point' : 'Start this chapter', sub: st.learned ? 'Next: ' + nxt.title : 'Learn teaches a point, then checks it. Practice brings it back later, weak points first.', run: () => openLearn(ch.id)};
  return {label: 'Prove this chapter', sub: plural(st.n * 2 - st.ok, 'question') + ' left to get right.', run: () => startPractice({mode: 'chapter', ch: ch.id, len: 8})};
}
/* Maths: the next step opens Learn, which teaches new points and teaches weak points again in full,
   then proves a chapter in one sitting. Practice is the tab for flights; once everything is proven, Home offers one. */
const lastAt = pid => { const h = mHist(pid); return h.length ? h[h.length - 1].t : 0; };
function mathsNext() {
  const ch = curCh(), st = chStats(ch), weak = weakPoints(), ids = ps => ps.map(p => p.id);
  const nxt = ch.points.find(p => statusOf(p.id) === 'new');
  if (CH.every(c => chStats(c).proven === c.points.length)) {
    return {label: 'Keep it sharp', sub: 'Every point is proven. A mixed flight keeps it that way.', run: () => startPractice({mode: 'mix', len: 8})};
  }
  if (weak.length >= 3 || (weak.length && !nxt)) return {label: 'Fix ' + plural(weak.length, 'weak point'), sub: names(weak.slice(0, 3)) + (weak.length > 3 ? ' and ' + (weak.length - 3) + ' more' : ''), run: () => openLearn(weak[0].ch, {pts: ids(weak)})};
  if (nxt) return {label: st.learned ? 'Learn the next point' : 'Start this chapter', sub: st.learned ? 'Next: ' + nxt.title : 'Learn shows a worked example, then you finish one and do one on your own.', run: () => openLearn(ch.id)};
  const todo = ch.points.filter(p => statusOf(p.id) !== 'new' && statusOf(p.id) !== 'proven');
  /* One sitting: check questions from the chapter's unproven points, mixed, until every point is proven. */
  return {label: 'Prove this chapter', sub: plural(todo.length, 'point') + ' still to prove. Questions keep coming until each has three right in a row.', run: () => openLearn(ch.id, {prove: true})};
}

/* ---------- altitude ---------- */
function tierOf(c) { let t = 0; for (let i = 0; i < TIERS.length; i++) if (c >= TIERS[i].at) t = i; return t; }
/* On white paper the hotter exhaust colours are too pale to see, so the plain light look keeps the base colour. */
function lightPlain() {
  if (saved.bg === 'sky') return false;
  const t = document.documentElement.getAttribute('data-theme');
  return t ? t !== 'dark' : !(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
}
function flameAt(t) { const c = EXHAUST[saved.exhaust].c; return lightPlain() ? c[0] : c[Math.max(0, t - 1)]; }
function level(km) { return km > 1 ? Math.log10(km) : 0; }
function layerOf(km) { let l = MILES[0]; for (let i = 0; i < MILES.length; i++) if (km >= MILES[i].at) l = MILES[i]; return l; }
function nextStop(km) { for (let i = 0; i < MILES.length; i++) if (MILES[i].stop && MILES[i].at > km) return MILES[i]; return null; }
/* Distances as people say them, with the words written out: km up to a light year, light years after that.
   "2 billion km", "4.1 billion light years". Only km stays short. n is the number and u the words after it
   (unit is the same, kept for older callers). long is the whole thing for screen readers. */
function sig3(v) { const p = Math.pow(10, Math.floor(Math.log10(v)) - 2); return Math.round(v / p) * p; }
const SUPER = '⁰¹²³⁴⁵⁶⁷⁸⁹';
function fmt(km) {
  if (km < 1) return {n: '0', u: 'km', unit: 'km', long: '0 km'};
  let v = km, ly = false, word = 'km';
  if (km >= LY) { v = km / LY; ly = true; word = 'light years'; }
  const out = (n, u, said) => ({n: n, u: u, unit: u, long: (said || n) + ' ' + u});
  if (v < 1e6) {
    const x = ly && v < 100 ? Math.round(v * 10) / 10 : (v < 1000 || !ly ? Math.round(v) : sig3(v));
    if (x >= 1e6) return fmt(ly ? 1e6 * LY : 1e6);            /* 999,999.6 rounds up to 1 million */
    return out(x.toLocaleString('en-AU'), ly && x === 1 ? 'light year' : word);
  }
  if (v >= BIG[BIG.length - 1][0] * 1000) {             /* past the last name, a power of ten: 10³⁹ light years */
    const e = String(Math.floor(Math.log10(v)));
    return out('10' + e.split('').map(d => SUPER[d]).join(''), word, '10 to the power of ' + e);
  }
  let i = 0;
  while (i < BIG.length - 1 && v >= BIG[i + 1][0]) i++;
  let y = v / BIG[i][0], r = y < 100 ? Math.round(y * 10) / 10 : Math.round(y);
  if (r >= 1000 && i < BIG.length - 1) { i++; r = Math.round(v / BIG[i][0] * 10) / 10; }   /* 999.97 million is 1 billion */
  return out(r.toLocaleString('en-AU'), BIG[i][1] + ' ' + word);
}
