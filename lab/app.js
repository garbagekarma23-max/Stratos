/* Stratos Maths Lab: the screen.
   One question at a time. The question sits at the top, the working goes on the sheet under it,
   one line per row, and the keypad sits at the bottom where the phone keyboard would be.
   The sheet and the keypad are in lab/sheet.js, shared with the main app. This file runs the lab around them:
   the ten questions, Done and Skip, the clock, the results and saving.
   Times and counts are saved on this device only, under their own name, apart from v2's progress. */
(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
  const plural = (n, word) => n + ' ' + word + (n === 1 ? '' : 's');
  /* Icons in the line style of src/10-core.js. */
  const icon = d => '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">' + d + '</svg>';
  const SOUND_ON = icon('<path d="M4 10v4h3.5L12 18V6L7.5 10z"/><path d="M15.5 9.5a3.5 3.5 0 0 1 0 5M18 7a7 7 0 0 1 0 10"/>');
  const SOUND_OFF = icon('<path d="M4 10v4h3.5L12 18V6L7.5 10z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>');

  /* ---------- the topic ---------- */
  const TOPIC = TOPICS[0], QS = TOPIC.questions;
  const ANSWERS = QS.map(q => q.answers.map(LabMaths.number));

  /* ---------- the page ---------- */
  const app = $('#app'), intro = $('#intro'), lab = $('#lab'), results = $('#results');
  const sheetEl = $('#sheet'), qnum = $('#qnum'), qmath = $('#qmath');
  const doneBtn = $('#done'), keysEl = $('#keys'), skipBtn = $('#skip'), muteBtn = $('#mute');
  const toastEl = $('#toast'), liveEl = $('#live');
  const say = msg => { liveEl.textContent = msg; };
  let toastTimer = 0;
  function toast(msg) {
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1800 + msg.length * 25);
  }

  /* ---------- saved on this device ----------
     run is the run in progress: the question it is on (qi), counts for each question (per),
     and the lines on the sheet, so a reload carries on where it was. past keeps finished runs. */
  const KEY = 'stratos-lab.v1';
  let saved = {};
  function load() {
    try { saved = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { saved = {}; }
    if (typeof saved !== 'object' || Array.isArray(saved)) saved = {};
    if (saved.sound !== false) saved.sound = true;
    if (!Array.isArray(saved.past)) saved.past = [];
    const r = saved.run;
    if (r && !(r.topic === TOPIC.id && Number.isInteger(r.qi) && r.qi >= 0 && r.qi <= QS.length && Array.isArray(r.per))) saved.run = null;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) {} }
  const fresh = () => ({ms: 0, lines: 0, wrong: 0, deletes: 0, undos: 0, tries: 0, skipped: false});

  /* ---------- the question on screen ----------
     Q is the question: its number (i), its state (open, right or skip) and when its clock last started (since).
     The lines themselves are kept by the sheet (lab/sheet.js), which is shared with the main app. */
  let Q = null, keepTimer = 0;
  const stat = () => saved.run.per[Q.i];
  /* Skip shows only while a question is open. */
  function setOpen() { if (Q && Q.state === 'open' && app.dataset.mode === 'q') app.dataset.open = ''; else delete app.dataset.open; }
  function setMode(m) {
    app.dataset.mode = m;
    setOpen();
    intro.hidden = m !== 'intro'; lab.hidden = m !== 'q'; results.hidden = m !== 'results';
  }

  /* The clock for each question only runs while the page is on screen. */
  function clockOn() { if (Q && Q.state === 'open' && Q.since === null && !document.hidden) Q.since = performance.now(); }
  function clockOff() { if (Q && Q.since !== null) { stat().ms += performance.now() - Q.since; Q.since = null; } }
  function keep() {
    if (!Q || !saved.run) return;
    clockOff(); clockOn();
    saved.run.sheet = {lines: sheet.rows(), active: sheet.at()};
    saved.run.state = Q.state;
    save();
  }
  function keepSoon() { clearTimeout(keepTimer); keepTimer = setTimeout(keep, 600); }
  document.addEventListener('visibilitychange', () => { if (document.hidden) { keep(); clockOff(); } else clockOn(); });
  window.addEventListener('pagehide', () => { keep(); clockOff(); });

  /* ---------- the sheet and the keypad ---------- */
  const sheet = Sheet.create({
    keys: keysEl, calc: $('#calc'), strip: $('#strip'), done: doneBtn, topic: TOPIC,
    sound: labSound, buzz: labBuzz, say: say, toast: toast,
    live: () => app.dataset.mode === 'q' && !!Q,
    onDone: done, onNext: () => { if (Q && Q.state !== 'open') next(); },
    onLine: kind => { if (kind === 'right') { labSound.right(); labBuzz(24); } },
    count: name => { if (Q && saved.run && Q.state === 'open') stat()[name]++; },
    changed: keepSoon
  });

  /* Done checks the final answer: the line being written, or the last line with something on it. */
  function done() {
    if (!Q) return;
    if (Q.state !== 'open') { next(); return; }
    const L = sheet.finalLine();
    if (!L) { toast('Write the answer first, like x = 4.'); return; }
    sheet.check(L);
    const r = LabMaths.checkAnswer(L.mf.value, ANSWERS[Q.i]);
    stat().tries++;
    if (r.ok) { finish('right'); return; }
    sheet.note(L, r.say);
    keep();
  }
  function finish(kind) {
    clockOff();
    Q.state = kind;
    sheet.trim();
    const st = stat();
    st.skipped = kind === 'skip';
    st.lines = sheet.count();
    if (kind === 'right') { labSound.solved(); labBuzz([24, 40, 24]); }
    sheet.lock();
    showEnd();
    setOpen();
    keep();
  }
  function showEnd() {
    const q = QS[Q.i], end = document.createElement('li');
    end.className = 'end';
    if (Q.state === 'right') { end.innerHTML = '<b>Right</b><span>' + clockText(stat().ms) + '</span>'; say('Right. Question done.'); }
    else { end.innerHTML = '<b>Answer</b><math-span>' + esc(sheet.drawn(q.show)) + '</math-span>'; say('Skipped. The answer is shown.'); }
    sheetEl.append(end);
    sheet.reveal(end);
    doneBtn.textContent = Q.i + 1 < QS.length ? 'Next question' : 'See results';
  }

  /* Skip and the sound switch click when pressed and do not take focus from the line, like the keypad's own buttons. */
  sheet.pressable(skipBtn); sheet.pressable(muteBtn);
  skipBtn.addEventListener('click', () => { if (Q && Q.state === 'open') finish('skip'); });
  function paintMute() {
    muteBtn.innerHTML = saved.sound ? SOUND_ON : SOUND_OFF;
    muteBtn.setAttribute('aria-pressed', String(!!saved.sound));
  }
  muteBtn.addEventListener('click', () => { saved.sound = !saved.sound; save(); paintMute(); toast(saved.sound ? 'Sound on' : 'Sound off'); });
  labSound.use(() => saved.sound !== false);

  /* Tapping the empty part of the sheet goes back to the line being written. */
  sheetEl.addEventListener('pointerdown', ev => {
    if (ev.target !== sheetEl || !Q || Q.state !== 'open' || !sheet.active) return;
    ev.preventDefault();
    sheet.focus();
  });
  /* Phones only let sound start inside a tap, so every kind of tap gets it ready. */
  ['pointerdown', 'touchend', 'click', 'keydown'].forEach(t => document.addEventListener(t, () => labSound.wake(), {capture: true, passive: true}));
  document.addEventListener('contextmenu', ev => { if (app.contains(ev.target)) ev.preventDefault(); });

  /* ---------- moving between questions ---------- */
  function showQuestion() {
    const run = saved.run, i = run.qi, q = QS[i];
    if (!run.per[i]) run.per[i] = fresh();
    Q = {i: i, state: run.state === 'right' || run.state === 'skip' ? run.state : 'open', since: null};
    setMode('q');
    qnum.innerHTML = '<span>Question ' + (i + 1) + ' of ' + QS.length + '</span><span>' + esc(TOPIC.ask) + '</span>';
    qmath.innerHTML = '<math-span>' + esc(sheet.drawn(q.eq)) + '</math-span>';
    const rows = run.sheet && Array.isArray(run.sheet.lines) ? run.sheet.lines : [];
    doneBtn.textContent = 'Done';
    sheet.start({el: sheetEl, answers: ANSWERS[i], rows: rows, at: run.sheet ? run.sheet.active : -1, open: Q.state === 'open'});
    if (Q.state === 'open') clockOn();
    else showEnd();
    setOpen();
    say('Question ' + (i + 1) + '. ' + q.text);
  }
  function next() {
    const run = saved.run;
    clockOff();
    run.qi++; run.sheet = null; run.state = 'open';
    if (run.qi >= QS.length) {
      run.complete = true; run.end = Date.now();
      saved.past.push({at: run.at, end: run.end, per: run.per});
      if (saved.past.length > 50) saved.past = saved.past.slice(-50);
      save();
      showResults();
    } else { save(); showQuestion(); }
  }
  function startRun() {
    saved.run = {topic: TOPIC.id, at: Date.now(), qi: 0, per: [], sheet: null, state: 'open'};
    save();
    showQuestion();
  }
  $('#start').addEventListener('click', startRun);

  /* ---------- results ---------- */
  function clockText(ms) {
    const s = Math.round(ms / 1000), m = Math.floor(s / 60), h = Math.floor(m / 60);
    return (h ? h + ':' + String(m % 60).padStart(2, '0') : m) + ':' + String(s % 60).padStart(2, '0');
  }
  function totals(per) {
    const t = fresh(); t.skips = 0;
    per.forEach(p => { if (!p) return; ['ms', 'lines', 'wrong', 'deletes', 'undos', 'tries'].forEach(k => { t[k] += p[k] || 0; }); if (p.skipped) t.skips++; });
    return t;
  }
  const detail = p => plural(p.lines, 'line') + ', ' + p.wrong + ' wrong, ' + plural(p.deletes, 'delete') + ', ' + plural(p.undos, 'undo');
  function resultsText() {
    const run = saved.run, t = totals(run.per);
    const when = new Date(run.at).toLocaleString('en-AU', {day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit'});
    const out = ['Stratos Maths Lab results', when,
      'Total: ' + clockText(t.ms) + ', ' + plural(t.lines, 'line') + ', ' + plural(t.wrong, 'wrong line') + ', ' + plural(t.deletes, 'delete') + ', ' + plural(t.undos, 'undo') + ', ' + plural(t.skips, 'skip')];
    QS.forEach((q, i) => { const p = run.per[i] || fresh(); out.push((i + 1) + '. ' + q.text + ': ' + clockText(p.ms) + (p.skipped ? ', skipped' : '') + ', ' + detail(p)); });
    return out.join('\n');
  }
  function showResults() {
    sheet.stop();
    Q = null; sheetEl.textContent = '';
    setMode('results');
    const run = saved.run, t = totals(run.per);
    const cell = (k, v) => '<div><dt>' + k + '</dt><dd>' + v + '</dd></div>';
    let h = '<p class="kicker">Maths Lab</p><h1 class="h1">Results</h1>' +
      '<dl class="stats6">' + cell('Time', clockText(t.ms)) + cell('Lines', t.lines) + cell('Wrong lines', t.wrong) +
      cell('Deletes', t.deletes) + cell('Undos', t.undos) + cell('Skips', t.skips) + '</dl>' +
      '<section class="sec"><h2 class="h2">Each question</h2><ol class="qrows">';
    QS.forEach((q, i) => {
      const p = run.per[i] || fresh();
      h += '<li class="qrow"><span class="n">' + (i + 1) + '</span><math-span>' + esc(sheet.drawn(q.eq)) + '</math-span><span class="t">' + clockText(p.ms) + '</span>' +
        '<span class="d">' + (p.skipped ? 'Skipped. ' : '') + esc(detail(p)) + '</span></li>';
    });
    h += '</ol></section><div class="cta"><button class="primary wide" type="button" id="copy">Copy results</button>' +
      '<button class="ghost wide" type="button" id="again">Start again</button></div>' +
      '<p class="fine">Saved on this device only. Nothing is sent anywhere. Copy puts the results on your clipboard, so you can paste them into a message.</p>';
    results.innerHTML = h;
    results.scrollTop = 0;
    $('#copy').addEventListener('click', () => copyText(resultsText()));
    $('#again').addEventListener('click', () => { saved.run = null; save(); showIntro(); });
    say('Results.');
  }
  function copyText(text) {
    const told = ok => toast(ok ? 'Copied' : 'Could not copy. Take a screenshot instead.');
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(() => told(true), () => told(copyOld(text)));
    else told(copyOld(text));
  }
  /* The older way to copy, for browsers without the clipboard API. It selects hidden text, never a text box. */
  function copyOld(text) {
    const pre = document.createElement('pre');
    pre.textContent = text;
    pre.style.cssText = 'position:fixed;left:-9999px;top:0;white-space:pre;-webkit-user-select:text;user-select:text';
    document.body.append(pre);
    const range = document.createRange(), sel = getSelection();
    range.selectNodeContents(pre); sel.removeAllRanges(); sel.addRange(range);
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) {}
    sel.removeAllRanges(); pre.remove();
    return ok;
  }
  function showIntro() { sheet.stop(); Q = null; sheetEl.textContent = ''; setMode('intro'); intro.scrollTop = 0; }

  /* ---------- start ---------- */
  load();
  paintMute();
  if (!saved.run) showIntro();
  else if (saved.run.complete || saved.run.qi >= QS.length) showResults();
  else showQuestion();
})();
