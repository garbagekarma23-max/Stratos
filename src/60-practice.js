/* ---------- practice: the start screen ---------- */
const startEl = $('#pracStart'), gauge = $('#gauge'), marksEl = $('#marks'), launch = $('#launch'), endBtn = $('#endBtn');
const altNum = $('#altNum'), altUnit = $('#altUnit'), altLayer = $('#altLayer'), comboEl = $('#combo'), comboNum = $('#comboNum'), comboTier = $('#comboTier');

/* The questions a flight can draw from, most useful first:
   weak ones, then ones not tried yet, then the ones answered right longest ago. Only learned points count. */
function poolFor(mode, chId) {
  const qs = [];
  ALL.forEach(p => {
    if (statusOf(p.id) === 'new' || (mode === 'chapter' && p.ch !== chId)) return;
    ['a', 'b'].forEach(k => { const r = ansOf(p.id, k); qs.push({p: p.id, k: k, rank: !r ? 1 : (r.ok ? 2 : 0), t: r ? r.t : 0}); });
  });
  return qs.sort((x, y) => x.rank - y.rank || x.t - y.t);
}
function enterPractice() {
  if (P) { showRun(true); return; }
  showRun(false);
  if (isMaths()) renderMathsStart(); else renderStart();
}
/* Practice for maths comes in the next build. Until then the tab says so, and offers Economics. */
function renderMathsStart() {
  startEl.innerHTML = '<h1 class="h1">Practice</h1><div class="empty"><p class="lede">Practice for maths comes in the next test build. For now, Learn teaches each maths point and checks it.</p>' +
    '<button class="primary" type="button" data-act="praceco">Practise Economics</button><button class="ghost" type="button" data-act="golearn">Open Learn</button></div>';
}
ACT.praceco = () => { useSubject('eco', true); toast('Switched to Economics: The Global Economy'); enterPractice(); };
function showRun(on) {
  run.hidden = !on; startEl.hidden = on;
  views.practice.classList.toggle('fixed', on);
  if (on) views.practice.scrollTop = 0;
}
function renderStart() {
  const learned = learnedPoints();
  if (!learned.length) {
    startEl.innerHTML = '<h1 class="h1">Practice</h1><div class="empty"><p class="lede">Practice asks about points you have learned. Learn your first point to start.</p><button class="primary" type="button" data-act="golearn">Open Learn</button></div>';
    return;
  }
  const chs = CH.filter(c => chStats(c).learned > 0);
  let sc = chOf(ui.scopeCh);
  if (!sc || chs.indexOf(sc) < 0) sc = chs.indexOf(curCh()) >= 0 ? curCh() : chs[0];
  ui.scopeCh = sc.id;
  const all = poolFor('mix'), one = poolFor('chapter', sc.id), pool = ui.scope === 'chapter' ? one : all;
  const lens = pool.length > 16 ? [8, 16, 0] : (pool.length > 8 ? [8, 0] : [0]);
  if (lens.indexOf(ui.len) < 0) ui.len = lens[0];
  const n = ui.len ? Math.min(ui.len, pool.length) : pool.length, pick = pool.slice(0, n);
  const weak = pick.filter(q => q.rank === 0).length, fresh = pick.filter(q => q.rank === 1).length, rev = n - weak - fresh, parts = [];
  if (weak) parts.push(plural(weak, 'weak question'));
  if (fresh) parts.push(fresh + ' you have not tried');
  if (rev) parts.push(rev + ' for review');
  const best = fmt(saved.bestKm || 0);
  const choice = (v, title, small, val) => '<button class="choice" type="button" role="radio" aria-checked="' + (ui.scope === v) + '" data-act="scope" data-v="' + v + '"><i class="radio"></i><span class="t">' + title + '<small>' + esc(small) + '</small></span><span class="v">' + val + '</span></button>';
  startEl.innerHTML =
    '<h1 class="h1">Practice</h1>' +
    '<p class="lede">Weak points come first, then questions you have not tried, then the ones you got right longest ago. Each correct answer in a row multiplies your altitude.</p>' +
    '<p class="label" id="fromL">Questions from</p>' +
    '<div role="radiogroup" aria-labelledby="fromL">' +
      choice('mix', 'Everything I have learned', plural(learned.length, 'point'), plural(all.length, 'question')) +
      choice('chapter', 'One chapter', (CH.indexOf(sc) + 1) + '. ' + sc.title, plural(one.length, 'question')) +
    '</div>' +
    (ui.scope === 'chapter' && chs.length > 1 ? '<button class="textbtn" type="button" data-act="scopech">Change chapter</button>' : '') +
    (lens.length > 1 ? '<div class="lenrow"><span class="label flat" id="lenL">Length</span><div class="seg3" role="group" aria-labelledby="lenL">' + lens.map(v => '<button type="button" data-act="len" data-v="' + v + '" aria-pressed="' + (ui.len === v) + '">' + (v || 'All ' + pool.length) + '</button>').join('') + '</div></div>' : '') +
    '<p class="mix">This flight: ' + parts.join(', ') + '.</p>' +
    '<button class="primary wide" type="button" data-act="start">Start flight</button>' +
    '<dl class="stats"><div><dt>Best altitude</dt><dd>' + best.n + ' ' + best.u + '</dd></div><div><dt>Best combo</dt><dd>×' + (saved.bestCombo || 0) + '</dd></div><div><dt>Day streak</dt><dd>' + streakNow() + '</dd></div></dl>';
}
ACT.golearn = () => openLearn(curCh().id);
ACT.scope = b => { ui.scope = b.dataset.v; renderStart(); const again = $('.choice[data-v="' + ui.scope + '"]', startEl); if (again) again.focus({preventScroll: true}); };
ACT.len = b => { ui.len = +b.dataset.v; renderStart(); const again = $('.seg3 [data-v="' + ui.len + '"]', startEl); if (again) again.focus({preventScroll: true}); };
ACT.scopech = () => {
  openSheet('Pick a chapter', '<div class="picks">' + CH.map((c, i) => {
    const s = chStats(c);
    return '<button class="pick" type="button" data-act="setscopech" data-ch="' + c.id + '"' + (s.learned ? '' : ' disabled') + '><span class="t">' + (i + 1) + '. ' + esc(c.title) + '<small>' + (s.learned ? esc(chStage(c).t) : 'Nothing learned here yet') + '</small></span></button>';
  }).join('') + '</div>');
};
ACT.setscopech = b => { ui.scopeCh = b.dataset.ch; ui.scope = 'chapter'; closeSheet(); renderStart(); };
ACT.start = () => startPractice({mode: ui.scope, ch: ui.scopeCh, len: ui.len || 999});

/* ---------- practice: a flight ---------- */
marksEl.innerHTML = MILES.filter(m => m.m).map(m => {
  const l = Math.log10(m.at);
  return '<i class="ms ' + m.m.k + '" data-l="' + l.toFixed(3) + '" style="bottom:' + (l / TOP_L * 100).toFixed(2) + '%;--c:' + (m.m.c || '#ffffff') + ';--s:' + (m.m.s || 7) + 'px"></i>';
}).join('');
const marks = Array.from(marksEl.children).map(el => ({el: el, l: +el.dataset.l, on: false}));

/* Start a flight. o.mode is mix or chapter (your own practice), challenge (8 set questions) or race (first to 6). */
function startPractice(o) {
  sound.wake();
  /* Flights, challenges and races are Economics for now. */
  if (isMaths()) { useSubject('eco', true); toast('Practice uses Economics for now.'); }
  let picked;
  if (o.mode === 'challenge' || o.mode === 'race') {
    const ch = chOf(o.ch), as = shuffle(ch.points.map(p => ({p: p.id, k: 'a'}))), bs = shuffle(ch.points.map(p => ({p: p.id, k: 'b'})));
    picked = o.mode === 'race' ? as.concat(bs) : bs.concat(as).slice(0, 8);
  } else picked = poolFor(o.mode, o.ch).slice(0, o.len || 8);
  closeSheet(); closeAllPages();
  if (!picked.length) { go('practice'); return; }
  picked.sort((x, y) => dOf(x) - dOf(y));               /* easiest first, so a combo can build */
  token++;
  clearTimeout(raceTimer);
  P = {mode: o.mode, ch: o.ch || null, len: o.len || 8, friend: o.friend || null, msg: o.msg || null, them: o.them == null ? null : o.them,
    items: picked.map(x => ({p: x.p, k: x.k, perm: shuffle([0, 1, 2, 3]), back: false})), res: [], total: picked.length,
    combo: 0, best: 0, alt: 0, clue: false, done: false, cut: false, pb: false, first: 0, sent: false, before: CH.map(c => chStats(c).pct),
    race: o.mode === 'race' ? {target: 6, me: 0, them: 0, over: false, left: false} : null};
  mountRun();
  go('practice');
  playLaunch(launchCard(), P.race ? () => { P.race.go = true; raceMusic(); raceArm(); } : null);
}
function launchCard() {
  const f = P.friend ? friend(P.friend).name : '';
  if (P.mode === 'race') return {title: 'Race ' + f, line: 'First to ' + P.race.target + ' correct wins', count: true};
  if (P.mode === 'challenge') return {title: 'Challenge', line: P.them == null ? plural(P.total, 'question') + '. ' + f + ' plays the same set after you.' : f + ' scored ' + P.them + ' of ' + P.total + '. Beat it.'};
  if (P.mode === 'chapter') return {title: 'Chapter ' + (CH.indexOf(chOf(P.ch)) + 1), line: plural(P.total, 'question') + ', weak points first'};
  return {title: 'Mixed flight', line: plural(P.total, 'question') + ', weak points first'};
}
function modeLabel() {
  if (P.mode === 'race') return 'Race to ' + P.race.target;
  if (P.mode === 'challenge') return P.them == null ? 'Challenge for ' + friend(P.friend).name : 'Challenge, ' + friend(P.friend).name + ' got ' + P.them + ' of ' + P.total;
  if (P.mode === 'chapter') return 'Chapter ' + (CH.indexOf(chOf(P.ch)) + 1);
  return 'Mixed flight';
}
function mountRun() {
  showRun(true);
  run.dataset.mode = P.mode;
  applyBg();
  $('#rkSlot').innerHTML = rocketSvg(saved.rocket);
  $('#modeT').textContent = modeLabel();
  $('#lanes').hidden = !P.race;
  if (P.race) { $('#laneWho').textContent = friend(P.friend).name; paintLanes(); }
  feed.textContent = '';
  feed.appendChild(qEl(P, 0));
  feed.scrollTop = 0;
  shown.L = 0;
  resize();
  paintHud(false); paintAlt(0);
  disarmEnd();
}
function closeRun() {
  token++;
  clearTimeout(raceTimer);
  P = null;
  raceMusic();
  feed.textContent = '';
  launch.hidden = true;
  app.dataset.tier = 0;
  disarmEnd();
  if (ui.tab === 'practice') { enterPractice(); paintChrome(); }
}
function applyBg() {
  run.dataset.bg = saved.bg;
  if (saved.bg !== 'sky') ['--sky-top', '--sky-bot', '--glass'].forEach(k => run.style.removeProperty(k));
  paintChrome();
  if (P) { paintAlt(shown.L); drawStars(shown.L, 0); }
}
function applyLook() {
  app.style.setProperty('--fin', EXHAUST[saved.exhaust].c[0]);
  app.style.setProperty('--plume', EXHAUST[saved.exhaust].c[1]);
  app.style.setProperty('--flame', flameAt(P ? tierOf(P.combo) : 0));
}

/* The title card and lift-off at the start of a flight. A race counts down first. */
function playLaunch(o, then) {
  const t = token, T = reduce ? 200 : 600, mark = $('#launchMark');
  launch.hidden = false; launch.classList.remove('go', 'out');
  launch.style.setProperty('--t', T + 'ms');
  $('#rkBigSlot').innerHTML = rocketSvg(saved.rocket, 'rk-big');
  mark.innerHTML = '<span class="word2">' + esc(o.title) + '</span><span class="line">' + esc(o.line) + '</span>';
  const lift = () => {
    if (t !== token) return;
    void launch.offsetWidth;
    if (!reduce) launch.classList.add('go');
    sound.liftoff();
    setTimeout(() => { if (t === token) launch.classList.add('out'); }, T);
    setTimeout(() => { if (t === token) { launch.hidden = true; if (then) then(); } }, T + 280);
  };
  if (!o.count) { setTimeout(lift, reduce ? 0 : 480); return; }
  let n = 3;
  const down = () => {
    if (t !== token) return;
    if (!n) { mark.innerHTML = '<span class="count">Go</span>'; lift(); return; }
    mark.innerHTML = '<span class="count">' + n + '</span><span class="line">' + esc(o.line) + '</span>';
    sound.tap();
    n--;
    setTimeout(down, reduce ? 120 : 620);
  };
  setTimeout(down, reduce ? 120 : 950);
}

function paintAlt(Lv) {
  const km = (Lv === 0 && (!P || P.alt === 0)) ? 0 : Math.pow(10, Lv), f = fmt(km);
  altNum.textContent = f.n; altUnit.textContent = f.u;
  altLayer.textContent = layerOf(km).name;
  gauge.style.setProperty('--pct', (clamp(Lv / TOP_L, 0, 1) * 100).toFixed(2));
  for (let k = 0; k < marks.length; k++) {
    const m = marks[k], on = Lv >= m.l - 0.0005;
    if (on !== m.on) { m.on = on; m.el.classList.toggle('on', on); }
  }
  if (run.dataset.bg !== 'sky') return;
  /* The Sky background darkens from blue sky to space as the rocket climbs. */
  let i = 0;
  while (i < SKY.length - 2 && Lv >= SKY[i + 1][0]) i++;
  const A = SKY[i], B = SKY[i + 1], t = clamp((Lv - A[0]) / (B[0] - A[0]), 0, 1);
  const mix = (x, y) => 'rgb(' + x.map((v, j) => Math.round(v + (y[j] - v) * t)).join(',') + ')';
  run.style.setProperty('--sky-top', mix(A[1], B[1]));
  run.style.setProperty('--sky-bot', mix(A[2], B[2]));
  run.style.setProperty('--glass', 'rgba(6,14,46,' + (0.44 + 0.34 * clamp((Lv - 1.2) / 1.2, 0, 1)).toFixed(2) + ')');
}
function paintHud(bump) {
  const t = P ? tierOf(P.combo) : 0;
  app.dataset.tier = t;
  applyLook();
  comboNum.textContent = '×' + (P ? P.combo : 0);
  comboTier.textContent = TIERS[t].label;
  if (bump) anim(comboEl, 'bump');
  kick();
}
function paintLanes() {
  const R = P.race;
  $('#laneMe').textContent = R.me; $('#laneThem').textContent = R.them;
  $('.lane.you .trk i', run).style.setProperty('--v', Math.min(1, R.me / R.target));
  $('.lane.them .trk i', run).style.setProperty('--v', Math.min(1, R.them / R.target));
  raceMusic();
}
function floatGain(x, y, text) {
  const d = document.createElement('div');
  d.className = 'gain'; d.textContent = text; d.style.left = x + 'px'; d.style.top = y + 'px';
  run.appendChild(d); setTimeout(() => d.remove(), 1000);
}
/* Thruster blast out of the altimeter rocket. Bigger with each combo tier. */
function exhaust(t) {
  if (reduce) return;
  const p = centre($('.rk', gauge)), col = flameAt(t), light = saved.bg === 'sky' ? '#ffffff' : EXHAUST[saved.exhaust].c[1];
  for (let i = 0; i < 6 + t * 7; i++) sparks.push({x: p.x + (Math.random() - 0.5) * 6, y: p.y + 12, vx: (Math.random() - 0.5) * (1.2 + t * 0.5), vy: Math.random() * 4 + 2 + t, g: -0.03, life: 0.9, dec: 0.03 + Math.random() * 0.03, r: Math.random() * 2.2 + 1.2, c: i % 3 ? col : light, grow: 0});
  feed.style.setProperty('--kick', (2 + t * 2) + 'px');
  anim(feed, 'thrust');
  kick();
}

/* The question waiting for an answer, if there is one. */
function current() {
  if (!P || P.done) return null;
  const i = P.res.length, sec = $('.slide[data-i="' + i + '"]', feed);
  return sec ? {i: i, sec: sec, it: P.items[i], q: PT[P.items[i].p][P.items[i].k]} : null;
}
/* Your own practice has clues, answers, skips and second tries. Challenges and races do not. */
const solo = () => !!P && (P.mode === 'mix' || P.mode === 'chapter');
function requeue(it) { P.items.push({p: it.p, k: it.k, perm: shuffle([0, 1, 2, 3]), back: true}); }

function answer(sec, n) {
  const c = current(); if (!c || (sec && c.sec !== sec) || !launch.hidden) return;
  const right = c.it.perm[n] === 0, prevCombo = P.combo, prevAlt = P.alt, prevTier = tierOf(prevCombo);
  let mult = 0;
  if (right) {
    P.combo++; P.best = Math.max(P.best, P.combo);
    mult = 2 * P.combo * c.q.d;                                  /* the multiplier grows with the combo and the difficulty */
    if (P.clue) mult = Math.max(2, Math.round(mult / 2));        /* a clue halves it */
    P.alt = Math.min(P.alt > 0 ? P.alt * mult : mult, 1e300);    /* the first correct answer lifts off from 1 km */
    if (!c.it.back) P.first++;
  } else {
    P.combo = 0;
    if (solo() && !c.it.back) requeue(c.it);
  }
  P.res.push({o: right ? 'correct' : 'wrong', pick: n, clue: P.clue, gain: mult});
  P.clue = false;
  record(c.it.p, c.it.k, right);
  paintResolved(P, c.sec, c.i);
  const btn = $('.opt[data-n="' + n + '"]', c.sec);
  if (right) {
    const t = tierOf(P.combo), p = centre(btn), box = btn.getBoundingClientRect(), home = run.getBoundingClientRect();
    let passed = null;
    for (let i = 0; i < MILES.length; i++) if (MILES[i].toast && MILES[i].at > prevAlt && MILES[i].at <= P.alt) passed = MILES[i];
    paintHud(true);
    anim(btn, 'pop');
    burst(p.x, p.y, Math.min(20 + P.combo * 4, 64), sparkColours(t));
    floatGain(box.right - home.left - 62, box.top - home.top - 4, prevAlt > 0 ? '×' + mult : 'Lift-off');
    if (t >= 1) exhaust(t);
    sound.correct(P.combo, t);
    buzzFor(true, t);
    if (passed) { toast(passed.toast); sound.layer(); }
    else if (t > prevTier) toast(TIERS[t].label + '. Combo ×' + P.combo);
    say('Correct. Altitude times ' + mult + '. Now ' + fmt(P.alt).long + '. Combo ' + P.combo + '.');
    if (P.race) { P.race.me++; paintLanes(); if (P.race.me >= P.race.target) { P.race.over = true; clearTimeout(raceTimer); raceMusic(); } }
    settle(c.sec, 0);
  } else {
    paintHud(false);
    anim(btn, 'shake');
    sound.wrong(); buzzFor(false);
    if (prevCombo >= 3) { const p = centre(comboEl); puff(p.x, p.y); }
    say('Not this time. The answer is ' + c.q.opts[0] + '.');
    settle(c.sec, 1300);
    showFoot(c.sec);
  }
}
function clue() {
  const c = current(); if (!c || !solo() || P.clue) return;
  P.clue = true; paintClue(c.sec, c.q);
  say('Clue. ' + c.q.clue);
}
function skip() {
  const c = current(); if (!c || !solo() || c.it.back) return;
  requeue(c.it);
  P.res.push({o: 'skipped', pick: null, clue: P.clue, gain: 0});
  P.clue = false;
  record(c.it.p, c.it.k, false);
  paintResolved(P, c.sec, c.i);
  if (document.activeElement && document.activeElement.disabled) feed.focus({preventScroll: true});
  scrollToEl(feed, appendNext(c.sec));
  say('Skipped. This one comes back at the end.');
}
function reveal() {
  const c = current(); if (!c || !solo()) return;
  const prevCombo = P.combo;
  P.combo = 0;
  if (!c.it.back) requeue(c.it);
  P.res.push({o: 'revealed', pick: null, clue: P.clue, gain: 0});
  P.clue = false;
  record(c.it.p, c.it.k, false);
  paintResolved(P, c.sec, c.i);
  paintHud(false);
  if (prevCombo >= 3) { const p = centre(comboEl); puff(p.x, p.y); }
  say('The answer is ' + c.q.opts[0] + '.');
  settle(c.sec, 1300);
  showFoot(c.sec);
}
ACT.skip = skip;
ACT.reveal = reveal;

/* After an answer: add the next slide, or the result when the flight is over. */
function settle(sec, delay) {
  if (document.activeElement && document.activeElement.disabled) feed.focus({preventScroll: true});
  if (!delay) { appendNext(sec); return; }
  const t = token;
  setTimeout(() => { if (t === token && P) appendNext(sec); }, delay);
}
function appendNext(prev) {
  const more = !P.done && !P.cut && !(P.race && P.race.over);
  /* A race keeps going until someone wins, so it goes round the questions again if it has to. */
  if (more && P.race && P.res.length >= P.items.length) shuffle(P.items.slice()).forEach(it => P.items.push({p: it.p, k: it.k, perm: shuffle([0, 1, 2, 3]), back: false}));
  let el;
  if (more && P.res.length < P.items.length) el = qEl(P, P.res.length);
  else { finish(); el = summaryEl(); }
  feed.appendChild(el);
  const nb = prev ? $('.next', prev) : null;
  if (nb) { if (el.classList.contains('summary')) nb.firstChild.nodeValue = 'See the result'; nb.hidden = false; }
  return el;
}
function finish() {
  if (P.done) return;
  P.done = true;
  clearTimeout(raceTimer);
  P.pb = P.alt > 0 && P.alt > (saved.bestKm || 0);
  save({bestKm: Math.max(saved.bestKm || 0, P.alt), bestCombo: Math.max(saved.bestCombo || 0, P.best)});
  postResult();
}
function summaryEl() {
  const f = fmt(P.alt), nx = nextStop(P.alt), sec = document.createElement('section'), fr = P.friend ? friend(P.friend) : null;
  const asked = P.items.filter((it, i) => !it.back && P.res[i] && P.res[i].o !== 'closed').length;
  const seen = [];
  P.items.forEach(it => { if (seen.indexOf(it.p) < 0) seen.push(it.p); });
  const still = seen.filter(pid => statusOf(pid) === 'weak').map(pid => PT[pid]);
  const proved = CH.filter((c, i) => P.before[i] < 100 && chStats(c).pct === 100).map(c => 'Chapter ' + (CH.indexOf(c) + 1) + ' is proven. Every question in it is right.');
  const weakLine = '<p class="sumline">' + (still.length ? 'Still weak: ' + esc(names(still)) + '.' : 'No weak points left from this flight.') + '</p>' + proved.map(t => '<p class="sumline strong">' + t + '</p>').join('');
  const homeBtn = '<button class="textbtn" type="button" data-act="home">Back to Home</button>';
  let h;
  if (P.mode === 'challenge') {
    const out = P.them == null ? fr.name + ' is playing the same set now.' : (P.first > P.them ? 'You won. ' : P.first < P.them ? fr.name + ' won. ' : 'A draw. ') + fr.name + ' scored ' + P.them + '.';
    h = '<p class="meta"><span>Challenge complete</span></p>' +
      '<p class="big"><span>' + P.first + ' of ' + P.total + '</span><small>' + (P.cut ? 'You ended early, so the rest count as wrong' : 'right') + '</small></p>' +
      '<h2 class="verdict">' + esc(out) + '</h2>' +
      '<dl class="stats"><div><dt>Altitude</dt><dd>' + f.n + ' ' + f.u + '</dd></div><div><dt>Best combo</dt><dd>×' + P.best + '</dd></div><div><dt>Day streak</dt><dd>' + streakNow() + '</dd></div></dl>' +
      weakLine +
      '<div class="cta"><button class="primary" type="button" data-act="tothread" data-f="' + fr.id + '">See it in messages</button></div>' + homeBtn;
  } else if (P.mode === 'race') {
    const R = P.race, out = R.left ? 'You left the race.' : (R.me >= R.target ? 'You won the race.' : fr.name + ' won the race.');
    h = '<p class="meta"><span>Race over</span></p>' +
      '<p class="big"><span>' + R.me + ' to ' + R.them + '</span><small>You against ' + esc(fr.name) + ', first to ' + R.target + '</small></p>' +
      '<h2 class="verdict">' + esc(out) + '</h2>' +
      '<dl class="stats"><div><dt>Altitude</dt><dd>' + f.n + ' ' + f.u + '</dd></div><div><dt>Best combo</dt><dd>×' + P.best + '</dd></div><div><dt>Day streak</dt><dd>' + streakNow() + '</dd></div></dl>' +
      weakLine +
      '<div class="cta"><button class="primary" type="button" data-act="tothread" data-f="' + fr.id + '">See it in messages</button></div>' + homeBtn;
  } else {
    const size = clamp(Math.floor((Math.min(app.clientWidth || 390, 440) - 76) / (Math.max(f.n.length, 2) * 0.62)), 30, 60);
    h = '<p class="meta"><span>' + (P.cut ? 'Flight ended early' : 'Flight complete') + '</span></p>' +
      (P.pb ? '<span class="pb">New personal best</span>' : '') +
      '<p class="big"><span style="font-size:' + size + 'px">' + f.n + '</span><small>' + esc(f.unit) + '</small></p>' +
      '<h2 class="verdict">' + esc(layerOf(P.alt).end) + '</h2>' +
      '<dl class="stats"><div><dt>Best combo</dt><dd>×' + P.best + '</dd></div><div><dt>First try</dt><dd>' + P.first + ' of ' + asked + '</dd></div><div><dt>Day streak</dt><dd>' + streakNow() + '</dd></div></dl>' +
      '<p class="sumline">' + (nx ? 'Next stop: ' + esc(nx.stop) + ', ' + fmt(nx.at).long + ' from Earth.' : 'There is no next stop. You are off the map.') + '</p>' +
      weakLine +
      '<div class="cta"><button class="primary" type="button" data-act="again">Fly again</button><button class="ghost" type="button" data-act="sendres">Send to a friend</button></div>' + homeBtn;
  }
  sec.className = 'slide summary';
  sec.innerHTML = h;
  return sec;
}
ACT.again = () => startPractice({mode: P.mode, ch: P.ch, len: P.len});
ACT.home = () => { closeRun(); go('home'); };

/* The cross in the corner. A flight in progress needs two taps to end. */
let endArm = 0;
function disarmEnd() { clearTimeout(endArm); endBtn.dataset.armed = ''; }
ACT.end = () => {
  if (!P) return;
  if (P.done || !P.res.length) { closeRun(); return; }
  if (endBtn.dataset.armed !== '1') { endBtn.dataset.armed = '1'; toast('Tap the cross again to end this flight'); endArm = setTimeout(disarmEnd, 3200); return; }
  disarmEnd();
  const c = current();
  token++;
  P.cut = true;
  if (P.race) { P.race.over = true; P.race.left = true; raceMusic(); }
  if (c) c.sec.remove();
  scrollToEl(feed, appendNext(feed.lastElementChild));
};

/* ---------- a race: the sample friend scores on a timer ---------- */
let raceTimer = 0;
/* The race music plays from Go until the race ends, and builds as either score gets close to 6.
   run.dataset.music says what it is doing, so the tests can check it. */
function raceMusic() {
  const R = P && P.race, top = R ? Math.max(R.me, R.them) : 0;
  const level = !R || !R.go || R.over || document.hidden || saved.music === false ? -1 : top >= R.target - 1 ? 2 : top >= R.target / 2 ? 1 : 0;
  run.dataset.music = level < 0 ? 'off' : level;
  sound.music(level);
}
document.addEventListener('visibilitychange', raceMusic);
function raceArm() {
  if (!P || !P.race || P.race.over) return;
  const t = token, ms = friend(P.friend).pace * 1000 * (0.65 + Math.random() * 0.7);
  raceTimer = setTimeout(() => {
    if (t !== token || !P || !P.race || P.race.over) return;
    P.race.them++; paintLanes();
    if (P.race.them >= P.race.target) raceLost(); else raceArm();
  }, ms);
}
function raceLost() {
  const c = current();
  P.race.over = true;
  raceMusic();
  token++;                                                     /* stops a slide that was about to be added */
  if (c) { P.res.push({o: 'closed'}); paintResolved(P, c.sec, c.i); }
  const el = appendNext(feed.lastElementChild), t = token;
  toast(friend(P.friend).name + ' reached ' + P.race.target + ' first');
  sound.wrong();
  setTimeout(() => { if (t === token && P) scrollToEl(feed, el); }, 900);
}
