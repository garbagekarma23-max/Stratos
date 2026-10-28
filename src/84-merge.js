/* ---------- the part of the save that goes to an account, and putting two copies together ----------
   No screen code here, so tests/merge.mjs can check it on its own.
   The account keeps study progress: answers, records, the chapter open, where the class was up to (start), the streak and the counts, the rocket and
   exhaust. These stay on the device: appearance, Sky, sound and race music (a phone and a laptop can differ), the
   place picked on the subject sheet (no location goes to the account), and the sample friends' messages (pretend).
   The call sign goes to the account too, but in its own table, profiles, not in here. */
const SYNC_TOP = ['ans', 'cur', 'start', 'bestKm', 'bestCombo', 'subject', 'streak', 'lastDay', 'day', 'week', 'rocket', 'exhaust'];
const isObj = x => !!x && typeof x === 'object' && !Array.isArray(x);
const copy = x => x === undefined ? undefined : JSON.parse(JSON.stringify(x));

/* The synced part of a save, as a fresh object. v says which shape it is, in case it ever changes. */
function syncPart(s) {
  const out = {v: 1};
  SYNC_TOP.forEach(k => { if (s[k] !== undefined) out[k] = copy(s[k]); });
  if (isObj(s.m)) out.m = copy(s.m);
  if (isObj(s.c)) out.c = copy(s.c);
  return out;
}

/* True if a save has any answers in it, in any subject. */
function hasProgress(s) {
  if (!isObj(s)) return false;
  if (isObj(s.ans) && Object.keys(s.ans).length) return true;
  return isObj(s.m) && isObj(s.m.h) && Object.keys(s.m.h).some(k => Array.isArray(s.m.h[k]) && s.m.h[k].length);
}

/* The time of the latest answer in a save, in any subject. The copy answered most recently decides the choices
   that cannot be added together: the subject, the chapter open, the starting chapter, the rocket and the exhaust. */
function lastAnswer(s) {
  let t = 0;
  if (isObj(s.ans)) Object.keys(s.ans).forEach(k => { const r = s.ans[k]; if (r && r.t > t) t = r.t; });
  if (isObj(s.m) && isObj(s.m.h)) Object.keys(s.m.h).forEach(k => (s.m.h[k] || []).forEach(r => { if (r && r.t > t) t = r.t; }));
  return t;
}

/* Put two synced parts together. Nothing either copy has learned is lost:
   - Economics: for each question, the most recent answer wins, so weak and proven come out right.
     The number of tries is the larger of the two.
   - Maths: both copies' answers on a point go together in time order, the same answer seen twice is kept once,
     and the last six stay. The proven rule then runs on the combined list.
   - Records: the higher altitude and combo, and the faster best time.
   - Streak: the copy that studied on the later day decides. On the same day, the longer streak wins.
   - Today's and this week's counts: the later day or week wins. On the same one, the higher count.
   - Everything else: the copy answered most recently. */
function merge(a, b) {
  a = isObj(a) ? a : {}; b = isObj(b) ? b : {};
  const newer = lastAnswer(b) > lastAnswer(a) ? b : a, older = newer === a ? b : a;
  const out = syncPart(newer);
  out.v = 1;
  ['cur', 'start', 'subject', 'rocket', 'exhaust'].forEach(k => { if (out[k] === undefined && older[k] !== undefined) out[k] = older[k]; });

  out.ans = {};
  const ansA = isObj(a.ans) ? a.ans : {}, ansB = isObj(b.ans) ? b.ans : {};
  new Set(Object.keys(ansA).concat(Object.keys(ansB))).forEach(id => {
    const x = ansA[id], y = ansB[id];
    if (!x || !y) { out.ans[id] = copy(x || y); return; }
    const win = (y.t || 0) > (x.t || 0) ? y : x;
    out.ans[id] = {ok: win.ok, n: Math.max(x.n || 0, y.n || 0), t: win.t};
  });

  const ma = isObj(a.m) ? a.m : {}, mb = isObj(b.m) ? b.m : {};
  out.m = isObj(out.m) ? out.m : {};
  ['cur', 'start'].forEach(k => { if (out.m[k] === undefined && (newer === a ? mb : ma)[k] !== undefined) out.m[k] = (newer === a ? mb : ma)[k]; });
  out.m.h = {};
  const ha = isObj(ma.h) ? ma.h : {}, hb = isObj(mb.h) ? mb.h : {};
  new Set(Object.keys(ha).concat(Object.keys(hb))).forEach(pid => {
    const seen = new Set(), list = [];
    (ha[pid] || []).concat(hb[pid] || []).forEach(r => {
      if (!r) return;
      const k = r.t + '|' + r.q;
      if (!seen.has(k)) { seen.add(k); list.push(copy(r)); }
    });
    list.sort((x, y) => (x.t || 0) - (y.t || 0));
    out.m.h[pid] = list.slice(-6);
  });
  out.m.best = {};
  const ba = isObj(ma.best) ? ma.best : {}, bb = isObj(mb.best) ? mb.best : {};
  new Set(Object.keys(ba).concat(Object.keys(bb))).forEach(k => {
    const t = [ba[k], bb[k]].filter(x => typeof x === 'number' && x > 0);
    if (t.length) out.m.best[k] = Math.min.apply(null, t);
  });
  const most = (x, y, k) => Math.max(x[k] || 0, y[k] || 0);
  ['bestKm', 'bestCombo'].forEach(k => {
    if (a[k] || b[k]) out[k] = most(a, b, k);
    if (ma[k] || mb[k]) out.m[k] = most(ma, mb, k);
  });

  const ca = isObj(a.c) ? a.c : {}, cb = isObj(b.c) ? b.c : {};
  out.c = isObj(out.c) ? out.c : {};
  new Set(Object.keys(ca).concat(Object.keys(cb))).forEach(id => {
    const x = isObj(ca[id]) ? ca[id] : {}, y = isObj(cb[id]) ? cb[id] : {};
    const c = out.c[id] = isObj(out.c[id]) ? out.c[id] : {};
    ['cur', 'start'].forEach(k => { if (c[k] === undefined) { const o = newer === a ? y : x; if (o[k] !== undefined) c[k] = o[k]; } });
    ['bestKm', 'bestCombo'].forEach(k => { if (x[k] || y[k]) c[k] = most(x, y, k); });
  });

  /* The streak. Days are written YYYY-MM-DD, so the later day is the larger text. */
  const la = a.lastDay || '', lb = b.lastDay || '';
  if (la || lb) {
    const s = la === lb ? (Math.max(a.streak || 0, b.streak || 0)) : la > lb ? (a.streak || 0) : (b.streak || 0);
    out.lastDay = la > lb ? la : lb; out.streak = s;
  }
  ['day', 'week'].forEach(k => {
    const x = isObj(a[k]) ? a[k] : null, y = isObj(b[k]) ? b[k] : null;
    if (!x && !y) return;
    if (!x || !y) { out[k] = copy(x || y); return; }
    out[k] = x.k === y.k ? {k: x.k, n: Math.max(x.n || 0, y.n || 0)} : copy(x.k > y.k ? x : y);
  });
  return out;
}

/* The same object always gives the same text, whatever order its keys are in. The database keeps keys in its own
   order, so this is how the app tells whether the account already has exactly what the device has. */
function canon(x) {
  if (Array.isArray(x)) return '[' + x.map(canon).join(',') + ']';
  if (isObj(x)) return '{' + Object.keys(x).filter(k => x[k] !== undefined).sort().map(k => JSON.stringify(k) + ':' + canon(x[k])).join(',') + '}';
  return JSON.stringify(x === undefined ? null : x);
}
