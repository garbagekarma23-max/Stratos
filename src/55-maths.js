/* ---------- maths in Learn: the worked example, guided and check questions, and the keypad ----------
   The keypad, the sheet of working lines and the line checker are the Maths Lab's own (lab/keypad.js, lab/sheet.js,
   lab/maths.js), copied into this page by build.py, so there is one copy of each.
   MathLive, which draws and types the maths, is big. It loads from lab/mathlive the first time maths is opened,
   so Economics stays as quick to open as before. */
const MPAD = TOPICS[0];                 /* the equations keypad: x, ± and or on the top row */
const mPad = $('#mPad'), mClose = $('#mClose');
const drawn = Sheet.drawnWith(MPAD.macros);
let mathsLoad = null, mathsReady = false, pad = null, mRow = 0;

function loadMaths() {
  if (!mathsLoad) mathsLoad = new Promise((ok, fail) => {
    if (window.MathfieldElement) { ok(); return; }
    const s = document.createElement('script');
    s.src = 'lab/mathlive/mathlive.min.js';
    s.onload = ok;
    s.onerror = () => { mathsLoad = null; fail(new Error('MathLive did not load')); };
    document.head.appendChild(s);
  }).then(() => {
    mathsReady = true;
    if (!pad) pad = Sheet.create({
      keys: $('#mKeys'), calc: $('#mCalc'), strip: $('#mStrip'), done: $('#mDone'), topic: MPAD,
      sound: sound, buzz: buzz, say: say, toast: toast,
      live: () => app.dataset.work !== undefined && sheet.hidden && !pages.length,
      /* The keypad is shared by Learn and a Practice flight. Done and each checked line go to whichever is on screen. */
      onDone: () => { if (mpOn()) mpDone(); else mathsDone(); },
      onNext: () => {},
      /* In Learn each right line rings the ping one step higher. In Practice it builds the combo (62-maths-practice.js). */
      onLine: kind => {
        if (mpOn()) { mpLine(kind); return; }
        if (kind === 'right') { mRow++; sound.correct(mRow, 0); buzz(BUZZ[0]); } else if (kind === 'wrong') mRow = 0;
      }
    });
    paintWork();
  });
  mathsLoad.catch(() => toast('Maths could not load. Check the connection, then open Learn again.'));
  return mathsLoad;
}
/* Let go of the question on the keypad, for example when the session is rebuilt. */
function mathsStop() { if (pad) pad.stop(); mRow = 0; paintWork(); }

/* A list of maths lines, each with its note beside it. Used by the worked example and the point sheet. */
function stepsHtml(steps) {
  return '<ol class="wsteps">' + steps.map(s => '<li><math-span>' + esc(drawn(s.latex)) + '</math-span><span class="wn">' + esc(s.note || '') + '</span></li>').join('') + '</ol>';
}
const mathsEq = latex => '<math-span>' + esc(drawn(latex)) + '</math-span>';

/* The worked example card: one question solved line by line, with a note on each step. */
function wexEl(i) {
  const p = PT[L.items[i].p], ch = chOf(p.ch), ex = MAKE.example(p), sec = document.createElement('section');
  sec.className = 'slide card wex'; sec.dataset.i = i;
  sec.innerHTML =
    '<p class="meta"><span>Point ' + (p.pi + 1) + ' of ' + ch.points.length + '</span><span>Worked example</span></p>' +
    '<h2 class="ctitle">' + esc(p.title) + '</h2>' +
    '<p class="intro">' + esc(p.intro) + '</p>' +
    '<div class="wex-q"><span class="ask">' + esc(MATHS.ask) + '</span>' + mathsEq(ex.eq) + '</div>' +
    stepsHtml(ex.steps) +
    '<p class="rem"><b>Remember</b>' + esc(p.remember) + '</p>' +
    '<div class="foot"><button class="next" type="button" data-act="nextslide">' + (L.items[i + 1] && L.items[i + 1].k === 'guided' ? 'Try one' : 'Check it') + IC.down + '</button></div>';
  if (!mathsReady) loadMaths();
  return sec;
}

/* Proving a chapter, in one sitting: the next check question goes to whichever unproven point was asked longest ago
   in this sitting, so the points mix, and a point answered wrong comes back after the others. Not the same point twice
   in a row while another is left. Returns false when every point is proven. */
function provePush() {
  const left = chOf(L.ch).points.filter(p => statusOf(p.id) !== 'new' && statusOf(p.id) !== 'proven');
  if (!left.length) return false;
  const lastP = L.items.length ? L.items[L.items.length - 1].p : null;
  const pool = left.length > 1 ? left.filter(p => p.id !== lastP) : left;
  const asked = id => { for (let i = L.items.length - 1; i >= 0; i--) if (L.items[i].p === id) return i; return -1; };
  const low = Math.min.apply(null, pool.map(p => asked(p.id)));
  L.items.push({t: 'mq', p: shuffle(pool.filter(p => asked(p.id) === low))[0].id, k: 'check'});
  return true;
}
/* Questions not to ask again: the worked example, the ones already made in this session, and the last few answered. */
function avoidFor(pid) {
  return [MAKE.example(PT[pid]).eq].concat(L.items.filter(it => it.p === pid && it.q).map(it => it.q.eq), mHist(pid).slice(-3).map(r => r.q));
}
/* A maths question slide. A guided one has its first lines written in; a check one starts blank. */
function mqEl(i) {
  const it = L.items[i], p = PT[it.p], sec = document.createElement('section');
  if (!it.q) { it.q = MAKE.question(p, {avoid: avoidFor(it.p)}); it.ans = it.q.answers.map(LabMaths.number); }
  const guided = it.k === 'guided';
  sec.className = 'slide mq'; sec.dataset.i = i;
  sec.innerHTML =
    '<p class="meta"><span>' + (guided ? 'Guided' : 'Check') + '</span><span>' + esc(p.title) + '</span></p>' +
    '<div class="mq-head"><div class="mq-q"><span class="ask">' + esc(MATHS.ask) + '</span>' + mathsEq(it.q.eq) + '</div>' + actBtn('mreveal', IC.eye, 'Answer') + '</div>' +
    '<p class="mq-tip">' + (guided ? 'The first lines are written for you. Finish the working, then press Done.' : 'On your own now. Write each step, then press Done.') + '</p>' +
    '<ol class="work" aria-label="Your working"></ol>' +
    '<div class="note" hidden></div>' +
    '<div class="foot"><button class="next" type="button" data-act="nextslide" hidden>Next' + IC.down + '</button></div>';
  if (!mathsReady) loadMaths();
  return sec;
}
/* The maths question waiting for an answer, if there is one. */
function mathsWaiting() {
  if (!L || L.over) return null;
  const i = L.shown - 1, it = L.items[i];
  if (!it || it.t !== 'mq' || L.res[i]) return null;
  const sec = $('.slide[data-i="' + i + '"]', learnFeed);
  return sec ? {i: i, sec: sec, it: it} : null;
}

/* Work mode: while a maths question fills the screen (in Learn, or in a Practice flight), the keypad sits at the bottom
   where the phone keyboard would be, the tab bar steps aside, and the slides stay still so a swipe never moves them
   mid-working. The one keypad moves into whichever of the two screens needs it. */
function paintWork() {
  const fl = mpOn(), c = fl ? mpWaiting() : mathsWaiting(), f = fl ? feed : learnFeed;
  const on = !!c && mathsReady && !!pad && ui.tab === (fl ? 'practice' : 'learn') && !pages.length && viewing(f) === c.sec && (!fl || launch.hidden);
  const was = app.dataset.work !== undefined;
  if (on) {
    const host = fl ? run : views.learn;
    if (mPad.parentNode !== host) host.appendChild(mPad);
    const el = $('.work', c.sec);
    if (pad.el !== el) {
      mRow = 0;
      pad.start({el: el, answers: c.it.ans, given: c.it.k === 'guided' ? c.it.q.steps.slice(0, c.it.q.give) : [], open: true});
      say((fl ? 'Question ' + (c.i + 1) + '. ' : c.it.k === 'guided' ? 'Guided question. ' : 'Check question. ') + 'Solve ' + c.it.q.text + '.');
    }
    app.dataset.work = '';
    mPad.hidden = false; mClose.hidden = fl;
    c.sec.classList.add('working');
    f.style.bottom = mPad.offsetHeight + 'px';
    if (fl) gauge.style.bottom = (mPad.offsetHeight + 24) + 'px';
    toastEl.style.bottom = fl ? (mPad.offsetHeight + 12) + 'px' : '';     /* in a flight, toasts sit just above the keys */
    f.scrollTop = c.sec.offsetTop;
    if (!was) pad.focus();
  } else {
    delete app.dataset.work;
    mPad.hidden = true; mClose.hidden = true;
    learnFeed.style.bottom = ''; feed.style.bottom = ''; gauge.style.bottom = ''; toastEl.style.bottom = '';
    $$('.slide.working').forEach(s => s.classList.remove('working'));
  }
}
ACT.mclose = () => go('home');

/* Done: check the final answer. On a check question, the first real answer counts toward the point's status.
   A line that is not an answer yet (x not on its own, a sum not worked out) gets a hint and does not count. */
const COUNTS = new Set(['This isn’t the answer.', 'One of these isn’t an answer.', 'There is a second answer.', 'There is one more answer.', 'There are more answers.', 'Give the answer exactly, or to 2 decimal places.']);
function mathsDone() {
  const c = mathsWaiting();
  if (!c || !pad.open || pad.el !== $('.work', c.sec)) return;
  const line = pad.finalLine();
  if (!line) { toast('Write the answer first, like x = 4.'); return; }
  pad.check(line);
  const r = LabMaths.checkAnswer(line.mf.value, c.it.ans);
  if (!r.ok && !COUNTS.has(r.say)) { pad.note(line, r.say); return; }
  if (c.it.k === 'check' && !c.it.tried) {
    c.it.tried = true;
    recordMaths(c.it.p, c.it.q.eq, r.ok);
    if (r.ok) L.right++;
    paintLearnBar();
  }
  if (r.ok) { mathsFinish(c, 'right'); return; }
  c.it.wrong = true;
  pad.note(line, r.say + (c.it.k === 'check' && !c.it.told ? ' The point is marked weak. Fix the working and press Done again, or tap Answer.' : ''));
  c.it.told = true;
  mRow = 0;
  sound.wrong(); buzzFor(false, 0);
}
/* Answer shows the answer and the worked solution. On a check question not yet answered, it counts as wrong. */
ACT.mreveal = b => {
  const c = mathsWaiting();
  if (!c || b.closest('.slide') !== c.sec) return;
  if (c.it.k === 'check' && !c.it.tried) { c.it.tried = true; recordMaths(c.it.p, c.it.q.eq, false); paintLearnBar(); }
  mathsFinish(c, 'shown');
};
function mathsFinish(c, how) {
  const it = c.it, sec = c.sec, note = $('.note', sec), nb = $('.next', sec);
  L.res[c.i] = {o: how === 'right' ? (it.wrong ? 'fixed' : 'correct') : 'revealed'};
  if (pad.el === $('.work', sec)) { pad.trim(); pad.lock(); }
  sec.classList.add('done');
  $('.mq-head .act', sec).hidden = true;
  $('.mq-tip', sec).hidden = true;
  const end = document.createElement('li');
  end.className = 'end';
  if (how === 'right') end.innerHTML = '<b>Right</b><span>' + (it.k === 'guided' ? 'You finished the working.' : it.wrong ? 'Fixed. It still counts as a miss this time.' : 'First try.') + '</span>';
  else end.innerHTML = '<b>Answer</b>' + mathsEq(it.q.show);
  $('.work', sec).append(end);
  note.hidden = false; note.className = 'note';
  if (how === 'right' && !it.wrong) {
    note.className = 'note quiet';
    note.innerHTML = it.k === 'check' ? '<p>' + esc(mathsMeans(it.p)) + '</p>' : '<p>Now one on your own, with nothing filled in.</p>';
  } else {
    note.innerHTML = '<b>Worked solution</b>' + stepsHtml(it.q.steps) + (it.k === 'check' ? '<p class="after">Marked as a weak point. Home will bring it back first.</p>' : '');
  }
  if (how === 'right') {
    const p = centre(end);
    anim(end, 'pop');
    burst(p.x, p.y, 18, sparkColours(1));
    sound.correct(Math.max(1, mRow), 0);
    buzzFor(true, 0);
    say('Right. ' + (it.k === 'guided' ? 'Now one on your own.' : ''));
  } else say('The answer is ' + MAKE.words(it.q.show) + '.');
  if (L.mode === 'prove' && L.shown >= L.items.length) provePush();
  if (L.shown < L.items.length) fillLearn();
  else { L.over = true; learnFeed.appendChild(learnEndEl()); }
  nb.firstChild.nodeValue = L.over ? 'Finish' : it.k === 'guided' ? 'On your own' : L.mode === 'prove' ? 'Next question' : 'Next point';
  nb.hidden = false;
  paintWork();
  learnFeed.scrollTop = sec.offsetTop;
  paintLearnBar();
  showFoot(sec);
}

/* The last slide of a maths session. */
function mathsEndEl() {
  const ch = chOf(L.ch), st = chStats(ch), nextCh = CH[CH.indexOf(ch) + 1];
  const checks = L.items.filter(it => it.t === 'mq' && it.k === 'check').length, sec = document.createElement('section');
  let title, body;
  if (L.mode === 'prove') {
    title = st.proven === st.n ? 'Chapter proven' : 'Session done';
    body = st.proven === st.n ? 'Every point has three right answers in a row. ' + (nextCh ? 'Chapter ' + (CH.indexOf(nextCh) + 1) + ' is next.' : 'That is every chapter in this topic.') : st.proven + ' of ' + st.n + ' points proven.';
  } else if (L.mode === 'one' && checks === 1) {
    title = 'Point checked';
    body = L.right ? 'Right. ' + mathsMeans(L.items[L.items.length - 1].p) : 'Not this time. It is marked weak, and Home will bring it back.';
  } else if (!checks) {
    title = 'You have learned every point in this chapter';
    body = st.proven === st.n ? 'Every point is proven.' : 'Now prove them: three right answers in a row on each point. Home brings them back.';
  } else {
    title = st.learned === st.n && L.mode === 'new' ? 'Chapter learned' : 'Session done';
    body = L.right + ' of ' + checks + ' checks right first time.' + (st.weak ? ' ' + plural(st.weak, 'weak point') + ' to fix. Home brings them back first.' : ' Three right in a row on each point proves it.');
  }
  sec.className = 'slide endslide';
  sec.innerHTML =
    '<p class="meta"><span>Chapter ' + (CH.indexOf(ch) + 1) + '</span><span>' + st.learned + ' of ' + st.n + ' points learned</span></p>' +
    '<h2 class="ctitle">' + title + '</h2>' +
    '<p class="lede">' + body + '</p>' +
    '<div class="cta">' +
      (L.mode === 'prove' && st.proven === st.n && nextCh
        ? '<button class="primary" type="button" data-act="learnch" data-ch="' + nextCh.id + '">Go to chapter ' + (CH.indexOf(nextCh) + 1) + '</button><button class="ghost" type="button" data-act="tab" data-tab="home">Back to Home</button>'
        : '<button class="primary" type="button" data-act="tab" data-tab="home">Back to Home</button>' +
          (nextCh ? '<button class="ghost" type="button" data-act="learnch" data-ch="' + nextCh.id + '">Go to chapter ' + (CH.indexOf(nextCh) + 1) + '</button>' : '')) +
      (L.mode === 'review' ? '' : '<button class="textbtn" type="button" data-act="review" data-ch="' + ch.id + '">See the worked examples again</button>') +
    '</div>';
  return sec;
}

/* The point sheet for maths: where the point stands, the rule for proven, and its worked example. */
function mathsSheet(p, st) {
  const ex = MAKE.example(p);
  if (!mathsReady) loadMaths();
  openSheet(p.title,
    '<p class="statusline"><i class="st ' + st + '"></i><span>' + STATUS[st] + '. ' + esc(mathsMeans(p.id)) + '</span></p>' +
    '<p class="rule">' + esc(MATHS_RULE) + '</p>' +
    '<p class="intro">' + esc(p.intro) + '</p>' +
    '<div class="wex-q"><span class="ask">Worked example</span>' + mathsEq(ex.eq) + '</div>' +
    stepsHtml(ex.steps) +
    '<p class="rem"><b>Remember</b>' + esc(p.remember) + '</p>' +
    '<p class="sub">Chapter ' + (p.ci + 1) + ': ' + esc(chOf(p.ch).title) + '</p>' +
    '<div class="cta"><button class="primary" type="button" data-act="learnpoint" data-p="' + p.id + '">' +
      (st === 'new' ? 'Learn this point' : st === 'weak' ? 'Learn it again' : 'Check this point again') + '</button></div>');
}
