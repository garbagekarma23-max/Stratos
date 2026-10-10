/* ---------- maths practice: a flight worked on the keypad ----------
   The same flight as Economics (60-practice.js), with one maths question per slide and the keypad at the bottom.
   The game on top:
   - The combo flame counts lines. Each right line adds one, a wrong line puts it back to zero.
   - Altitude counts answers, as in Economics: each right answer at Done, first try, multiplies it by
     2 x (right answers in a row) x difficulty. Difficulty is 2 in chapter 1 and 3 in chapter 2.
   - Done has one clear moment: the working lines tick again one after another, the ping climbs, the rocket lifts,
     then the next question comes in.
   - A clock runs for the flight. The fastest finished flight for each set of questions is kept. */
const MATHS_D = p => p.ci === 0 ? 2 : 3;
const fSegs = $('#fSegs'), fClock = $('#fClock');
const TICK_MS = 110;                    /* the gap between one line's tick and the next in the Done moment */

/* True while a maths flight is on screen. The keypad sends its lines and Done here when it is. */
function mpOn() { return ui.tab === 'practice' && !!P && !!P.maths; }

/* The points a maths flight can ask about, most useful first: weak ones, then ones not practised yet,
   then the ones answered right longest ago. Only points that are not new count. */
function mathsPool(mode, chId) {
  const ps = [];
  ALL.forEach(p => {
    if (statusOf(p.id) === 'new' || (mode === 'chapter' && p.ch !== chId)) return;
    const h = mHist(p.id), last = h[h.length - 1];
    ps.push({p: p.id, rank: !last.ok ? 0 : (h.some(r => r.src === 'p') ? 2 : 1), t: last.t});
  });
  return ps.sort((x, y) => x.rank - y.rank || x.t - y.t);
}
/* The questions for a flight of len (0 means each point once). With fewer points than questions,
   the list goes round the points again in the same order, so each one comes back with new numbers. */
function mathsPick(pool, len) {
  if (!pool.length) return [];
  const n = len ? len : pool.length, out = [];
  for (let i = 0; i < n; i++) out.push(pool[i % pool.length]);
  return out;
}
/* Which set of questions a best time belongs to: everything or one chapter, and how many questions. */
const bestKey = (mode, ch, n) => (mode === 'chapter' ? ch : 'all') + ':' + n;
function clockText(ms) { const s = Math.floor(ms / 1000); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }

/* ---------- the start screen for maths ---------- */
function renderMathsStart() {
  const learned = learnedPoints();
  if (!learned.length) {
    startEl.innerHTML = '<h1 class="h1">Practice</h1><div class="empty"><p class="lede">Practice asks about points you have learned. Learn your first point to start.</p><button class="primary" type="button" data-act="golearn">Open Learn</button></div>';
    return;
  }
  const chs = CH.filter(c => chStats(c).learned > 0);
  let sc = chOf(ui.scopeCh);
  if (!sc || chs.indexOf(sc) < 0) sc = chs.indexOf(curCh()) >= 0 ? curCh() : chs[0];
  ui.scopeCh = sc.id;
  const all = mathsPool('mix'), one = mathsPool('chapter', sc.id), pool = ui.scope === 'chapter' ? one : all;
  const lens = [8, 16, 0];
  if (lens.indexOf(ui.len) < 0) ui.len = lens[0];
  const pick = mathsPick(pool, ui.len), seen = {}, parts = [];
  pick.forEach(x => { seen[x.p] = x.rank; });
  const ranks = Object.keys(seen).map(k => seen[k]), count = r => ranks.filter(x => x === r).length;
  if (count(0)) parts.push(plural(count(0), 'weak point'));
  if (count(1)) parts.push(count(1) + ' not practised yet');
  if (count(2)) parts.push(count(2) + ' for review');
  const best = fmt(saved.m.bestKm || 0), bt = saved.m.best[bestKey(ui.scope, sc.id, pick.length)];
  const choice = (v, title, small, val) => '<button class="choice" type="button" role="radio" aria-checked="' + (ui.scope === v) + '" data-act="scope" data-v="' + v + '"><i class="radio"></i><span class="t">' + title + '<small>' + esc(small) + '</small></span><span class="v">' + val + '</span></button>';
  startEl.innerHTML =
    '<h1 class="h1">Practice</h1>' +
    '<p class="lede">Weak points come first, then points you have not practised, then the ones you got right longest ago. Each question has new numbers. Each right line builds your combo, and each right answer in a row multiplies your altitude.</p>' +
    '<p class="label" id="fromL">Questions from</p>' +
    '<div role="radiogroup" aria-labelledby="fromL">' +
      choice('mix', 'Everything I have learned', plural(learned.length, 'point'), plural(all.length, 'point')) +
      choice('chapter', 'One chapter', (CH.indexOf(sc) + 1) + '. ' + sc.title, plural(one.length, 'point')) +
    '</div>' +
    (ui.scope === 'chapter' && chs.length > 1 ? '<button class="textbtn" type="button" data-act="scopech">Change chapter</button>' : '') +
    '<div class="lenrow"><span class="label flat" id="lenL">Length</span><div class="seg3" role="group" aria-labelledby="lenL">' + lens.map(v => '<button type="button" data-act="len" data-v="' + v + '" aria-pressed="' + (ui.len === v) + '">' + (v || 'All ' + pool.length) + '</button>').join('') + '</div></div>' +
    '<p class="mix">This flight: ' + plural(pick.length, 'question') + ' on ' + parts.join(', ') + '.</p>' +
    '<button class="primary wide" type="button" data-act="start">Start flight</button>' +
    '<dl class="stats four"><div><dt>Best altitude</dt><dd>' + best.n + ' ' + best.u + '</dd></div><div><dt>Best combo</dt><dd>×' + (saved.m.bestCombo || 0) + '</dd></div>' +
      '<div><dt>Best time</dt><dd id="bestT">' + (bt ? clockText(bt) : 'None yet') + '</dd></div><div><dt>Day streak</dt><dd>' + streakNow() + '</dd></div></dl>' +
    '<p class="fine">Best time is for ' + (ui.scope === 'chapter' ? 'chapter ' + (CH.indexOf(sc) + 1) : 'everything') + ', ' + plural(pick.length, 'question') + ', with none skipped or shown.</p>';
}

/* ---------- a maths flight ---------- */
function startMathsFlight(o) {
  const len = o.len === 999 ? 0 : (o.len || 8);
  const picked = mathsPick(mathsPool(o.mode, o.ch), len);
  closeSheet(); closeAllPages();
  if (!picked.length) { go('practice'); return; }
  token++;
  clearTimeout(raceTimer);
  if (pad) pad.stop();
  P = {maths: true, mode: o.mode, ch: o.ch || null, len: o.len || 8, friend: null, msg: null, them: null,
    items: picked.map(x => ({p: x.p, back: false})), res: [], total: picked.length,
    combo: 0, row: 0, best: 0, alt: 0, done: false, cut: false, pb: false, first: 0, sent: false,
    lines: 0, wrong: 0, ms: 0, newBest: false, busy: false, before: CH.map(c => chStats(c).pct), race: null};
  mountRun();
  go('practice');
  playLaunch(launchCard(), () => paintWork());
}
/* What a new slide in the flight is: Economics or maths. Called by mountRun and appendNext. */
function slideFor(i) { return P.maths ? mpEl(i) : qEl(P, i); }

/* Questions not to ask again: the worked example, this flight's questions on the point, and its last few answers. */
function mpAvoid(pid) {
  return [MAKE.example(PT[pid]).eq].concat(P.items.filter(it => it.p === pid && it.q).map(it => it.q.eq), mHist(pid).slice(-3).map(r => r.q));
}
/* A maths question slide in a flight. Each one is made fresh from the point's templates, with new numbers. */
function mpEl(i) {
  const it = P.items[i], p = PT[it.p], sec = document.createElement('section');
  if (!it.q) { it.q = MAKE.question(p, {avoid: mpAvoid(it.p)}); it.ans = it.q.answers.map(LabMaths.number); }
  sec.className = 'slide mq'; sec.dataset.i = i;
  sec.innerHTML =
    '<p class="meta"><span>Question ' + (i + 1) + (it.back ? '' : ' of ' + P.total) + '</span><span>' + esc(p.title) + '</span>' + (it.back ? '<span class="back">Back again</span>' : '') + '</p>' +
    '<div class="mq-head"><div class="mq-q"><span class="ask">' + esc(MATHS.ask) + '</span>' + mathsEq(it.q.eq) + '</div>' +
      '<div class="actions">' + (it.back ? '' : mpBtn('mpskip', IC.skip, 'Skip')) + mpBtn('mpreveal', IC.eye, 'Answer') + '</div></div>' +
    '<ol class="work" aria-label="Your working"></ol>' +
    '<div class="note" hidden></div>' +
    '<div class="foot"><button class="next" type="button" data-act="nextslide" hidden>Next' + IC.down + '</button></div>';
  if (!mathsReady) loadMaths();
  return sec;
}
/* Skip and Answer. On a narrow phone they show the icon only, so the question keeps its room. */
const mpBtn = (name, ic, label) => '<button class="act" type="button" data-act="' + name + '" aria-label="' + label + '">' + ic + '<span class="t">' + label + '</span></button>';
/* The maths question waiting for an answer, if there is one. */
function mpWaiting() {
  if (!P || !P.maths || P.done) return null;
  const i = P.res.length, sec = $('.slide[data-i="' + i + '"]', feed);
  return sec ? {i: i, sec: sec, it: P.items[i]} : null;
}

/* Each checked line. A right line builds the combo by one, a wrong line puts it back to zero. */
function mpLine(kind) {
  const c = mpWaiting();
  if (!c || P.busy) return;
  if (kind === 'right') {
    const was = tierOf(P.combo);
    P.combo++; P.best = Math.max(P.best, P.combo);
    const t = tierOf(P.combo);
    paintHud(true);
    sound.correct(P.combo, 0);
    buzz(BUZZ[0]);
    if (t > was) toast(TIERS[t].label + '. Combo ×' + P.combo);
  } else if (kind === 'wrong') {
    P.wrong++;
    mpDrop();
  }
}
/* The combo goes back to zero, with a puff of smoke if it was alight. */
function mpDrop() {
  const was = P.combo;
  P.combo = 0;
  paintHud(false);
  if (was >= 3) { const p = centre(comboEl); puff(p.x, p.y); }
}
function mpRequeue(it) { P.items.push({p: it.p, back: true}); }

/* Done: check the final answer. The first real answer to each question counts toward the point's status,
   the same as a check question in Learn. A line that is not an answer yet gets a hint and does not count. */
function mpDone() {
  const c = mpWaiting();
  if (!c || P.busy || !pad.open || pad.el !== $('.work', c.sec)) return;
  const line = pad.finalLine();
  if (!line) { toast('Write the answer first, like x = 4.'); return; }
  pad.check(line);
  const r = LabMaths.checkAnswer(line.mf.value, c.it.ans);
  if (!r.ok && !COUNTS.has(r.say)) { pad.note(line, r.say); return; }
  if (!c.it.tried) { c.it.tried = true; recordMaths(c.it.p, c.it.q.eq, r.ok, 'p'); }
  if (r.ok) { mpRight(c); return; }
  const first = !c.it.wrong;
  c.it.wrong = true;
  P.row = 0;
  if (P.combo) mpDrop();
  if (first && !c.it.back) mpRequeue(c.it);
  pad.note(line, r.say + (first ? ' Fix the working and press Done again, or tap Answer. A question like it comes back later in this flight.' : ''));
  sound.wrong(); buzzFor(false, 0);
  paintSegs();
}
/* A right answer. First try, it lifts the rocket. Then the Done moment: each right line ticks again in turn
   with the ping climbing, the rocket lifts, and the next question comes in. With reduced motion it is one ping. */
function mpRight(c) {
  const it = c.it, first = !it.wrong, prevAlt = P.alt;
  let mult = 0;
  if (first) {
    P.row++;
    mult = 2 * P.row * MATHS_D(PT[it.p]);                      /* the same rule as Economics, counted in answers */
    P.alt = Math.min(P.alt > 0 ? P.alt * mult : mult, 1e300);
    if (!it.back) P.first++;
  }
  P.busy = true;
  pad.trim(); pad.lock();
  const t = token, n = pad.celebrate(reduce ? 0 : TICK_MS, reduce ? null : i => sound.correct(i + 1, 0));
  const lift = () => {
    if (t !== token || !P) return;
    const tier = tierOf(P.combo);
    if (first) {
      let passed = null;
      for (let i = 0; i < MILES.length; i++) if (MILES[i].toast && MILES[i].at > prevAlt && MILES[i].at <= P.alt) passed = MILES[i];
      const box = c.sec.getBoundingClientRect(), home = run.getBoundingClientRect();
      paintHud(true);
      floatGain(box.right - home.left - 70, box.top - home.top + 40, prevAlt > 0 ? '×' + mult : 'Lift-off');
      exhaust(tier);
      sound.correct(reduce ? Math.max(1, P.row) : n + 1, tier);
      buzzFor(true, tier);
      if (passed) { toast(passed.toast); sound.layer(); }
      say('Right. Altitude times ' + mult + '. Now ' + fmt(P.alt).long + '.');
    } else {
      sound.correct(reduce ? 1 : n + 1, 0);
      buzzFor(true, 0);
      say('Right. It still counts as a miss this time.');
    }
    mpFinish(c, first ? 'correct' : 'fixed', mult);
  };
  if (reduce) lift(); else setTimeout(lift, n * TICK_MS + 140);
}
/* Answer shows the answer and the worked solution. Not answered yet, it counts as wrong. */
ACT.mpreveal = b => {
  const c = mpWaiting();
  if (!c || P.busy || b.closest('.slide') !== c.sec) return;
  if (!c.it.tried) { c.it.tried = true; recordMaths(c.it.p, c.it.q.eq, false, 'p'); }
  if (!c.it.wrong && !c.it.back) mpRequeue(c.it);
  P.row = 0;
  if (P.combo) mpDrop();
  say('The answer is ' + MAKE.words(c.it.q.show) + '.');
  mpFinish(c, 'revealed', 0);
};
/* Skip moves on and brings a question on the same point back at the end. It counts as wrong, as in Economics. */
ACT.mpskip = b => {
  const c = mpWaiting();
  if (!c || P.busy || c.it.back || b.closest('.slide') !== c.sec) return;
  if (!c.it.tried) { c.it.tried = true; recordMaths(c.it.p, c.it.q.eq, false, 'p'); }
  if (!c.it.wrong) mpRequeue(c.it);
  P.row = 0;
  say('Skipped. A question like it comes back at the end.');
  mpFinish(c, 'skipped', 0);
};

/* The question is over: mark it, add the next slide (or the result), and move on.
   A right answer moves straight to the next question. Anything else stays, with the worked solution, until Next. */
function mpFinish(c, o, gain) {
  const it = c.it, sec = c.sec, note = $('.note', sec);
  if (pad.el === $('.work', sec)) { pad.trim(); P.lines += pad.count(); pad.lock(); }
  P.res.push({o: o, gain: gain});
  P.busy = false;
  sec.classList.add('done');
  $('.mq-head .actions', sec).hidden = true;
  const end = document.createElement('li');
  end.className = 'end';
  if (o === 'correct') end.innerHTML = '<b>Right</b><span>' + (gain ? 'First try. Altitude ×' + gain + '.' : 'First try.') + '</span>';
  else if (o === 'fixed') end.innerHTML = '<b>Right</b><span>Fixed. It still counts as a miss this time.</span>';
  else if (o === 'skipped') end.innerHTML = '<b>Skipped</b><span>A question like it comes back at the end.</span>';
  else end.innerHTML = '<b>Answer</b>' + mathsEq(it.q.show);
  $('.work', sec).append(end);
  if (o === 'correct' || o === 'skipped') note.hidden = true;
  else {
    note.hidden = false; note.className = 'note';
    note.innerHTML = '<b>Worked solution</b>' + stepsHtml(it.q.steps) + '<p class="after">' + (it.back ? 'Marked as a weak point.' : 'Marked as a weak point. A question like it comes back later in this flight.') + '</p>';
  }
  paintSegs();
  const el = appendNext(sec);
  if (o === 'correct' || o === 'skipped') {
    /* Straight on: the next slide comes in from below, with no scroll for the keypad to wait on. */
    feed.scrollTop = el.offsetTop;
    if (!reduce) anim(el, 'arrive');
    paintWork();
  } else {
    paintWork();
    showFoot(sec);
  }
}

/* ---------- the bar of segments and the clock ---------- */
/* One segment per question in the flight. It fills when the question is finished: blue if right first time,
   the weak-point colour if not. The question on screen is darker until it is done. */
function paintSegs() {
  if (!P || !P.maths) { fSegs.hidden = true; fSegs.textContent = ''; return; }
  fSegs.hidden = false;
  const cur = P.done ? -1 : P.res.length;
  fSegs.innerHTML = P.items.map((it, i) => {
    const r = P.res[i], fill = !r ? '' : (r.o === 'correct' ? ' fin' : ' miss');
    return '<i class="seg' + fill + (i === cur ? ' cur' : '') + '"></i>';
  }).join('');
}
/* The clock runs only while the flight is on screen: not during lift-off, on another tab, or with the page hidden. */
let clockLast = 0;
setInterval(() => {
  const now = performance.now(), dt = now - (clockLast || now);
  clockLast = now;
  if (!P || !P.maths || P.done) return;
  if (ui.tab === 'practice' && launch.hidden && !document.hidden && !pages.length) P.ms += Math.min(dt, 1000);
  fClock.textContent = clockText(P.ms);
}, 250);
/* Set the flight's extras up when it is mounted: segments and clock for maths, neither for Economics. */
function mpMount() {
  run.dataset.sub = P.maths ? 'maths' : 'eco';
  fClock.hidden = !P.maths;
  fClock.textContent = '0:00';
  paintSegs();
}
/* The end of a maths flight: stop the clock and keep the best time if this one is faster.
   A best time needs a finished flight with no question skipped or shown. */
function mpEnd() {
  if (pad) pad.stop();
  const k = bestKey(P.mode, P.ch, P.total), clean = !P.cut && P.res.every(r => r.o === 'correct' || r.o === 'fixed');
  P.bestKey = k;
  if (clean && P.ms > 0 && (!saved.m.best[k] || P.ms < saved.m.best[k])) { P.newBest = true; saved.m.best[k] = Math.round(P.ms); }
  saved.m.bestCombo = Math.max(saved.m.bestCombo || 0, P.best);
  saved.m.bestKm = Math.max(saved.m.bestKm || 0, P.alt);
  fClock.textContent = clockText(P.ms);
  paintSegs();
}
/* The extra lines on a maths result: time, lines written and wrong lines, and the best time for this set. */
function mpSummary() {
  const b = saved.m.best[P.bestKey], scope = P.mode === 'chapter' ? 'chapter ' + (CH.indexOf(chOf(P.ch)) + 1) : 'everything';
  return '<dl class="stats"><div><dt>Time</dt><dd>' + clockText(P.ms) + '</dd></div><div><dt>Lines</dt><dd>' + P.lines + '</dd></div><div><dt>Wrong lines</dt><dd>' + P.wrong + '</dd></div></dl>' +
    '<p class="sumline">' + (b ? 'Best time for ' + scope + ', ' + plural(P.total, 'question') + ': ' + clockText(b) + '.' : 'A best time needs every question answered, with none skipped or shown.') + '</p>';
}

/* While the flight scrolls (after Next), the keypad waits until the slide has settled. */
let mpTick = 0;
feed.addEventListener('scroll', () => {
  if (!P || !P.maths) return;
  clearTimeout(mpTick); mpTick = setTimeout(() => { paintWork(); paintSegs(); }, 140);
}, {passive: true});
