/* Stratos Maths Lab: the screen.
   One question at a time. The question sits at the top, the working goes on the sheet under it,
   one line per row, and the keypad sits at the bottom where the phone keyboard would be.
   Each line is a MathLive field. Only the line being written can be typed in; tapping another line moves there.
   Times and counts are saved on this device only, under their own name, apart from v2's progress. */
(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
  const plural = (n, word) => n + ' ' + word + (n === 1 ? '' : 's');
  /* Icons in the line style of src/10-core.js. The tick is the main app's tick. */
  const icon = d => '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">' + d + '</svg>';
  const TICK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  const SOUND_ON = icon('<path d="M4 10v4h3.5L12 18V6L7.5 10z"/><path d="M15.5 9.5a3.5 3.5 0 0 1 0 5M18 7a7 7 0 0 1 0 10"/>');
  const SOUND_OFF = icon('<path d="M4 10v4h3.5L12 18V6L7.5 10z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>');

  /* ---------- the topic ---------- */
  const TOPIC = TOPICS[0], QS = TOPIC.questions;
  const ANSWERS = QS.map(q => q.answers.map(LabMaths.number));
  const MACROS = {};
  Object.keys(TOPIC.macros || {}).forEach(k => { MACROS[k] = {def: TOPIC.macros[k], expand: false, captureSelection: true}; });
  /* LaTeX for drawing only (not typing): the topic's short names written out in full. */
  const drawn = latex => Object.keys(TOPIC.macros || {}).reduce((s, k) => s.replace(new RegExp('\\\\' + k + '(?![a-zA-Z])', 'g'), TOPIC.macros[k]), latex);
  /* What typing on a computer keyboard turns into. */
  const SHORTCUTS = {'*': '\\times', '+-': '\\pm', 'or': '\\or', 'sqrt': '\\sqrt{#?}'};

  /* MathLive's own sounds, vibration and on-screen keyboard are not used. Ours are. */
  try { MathfieldElement.soundsDirectory = null; } catch (e) {}
  try { MathfieldElement.keypressVibration = false; } catch (e) {}

  /* ---------- the page ---------- */
  const app = $('#app'), intro = $('#intro'), lab = $('#lab'), results = $('#results');
  const sheet = $('#sheet'), qnum = $('#qnum'), qmath = $('#qmath');
  const doneBtn = $('#done'), calcBtn = $('#calc'), keysEl = $('#keys'), skipBtn = $('#skip'), muteBtn = $('#mute');
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
     Q.lines holds each line: its row (li), its MathLive field (mf), the text last checked,
     the result (kind: right, wrong or hint) and its sentence (say). */
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
    saved.run.sheet = {lines: Q.lines.map(L => ({latex: L.mf.value, checked: L.checked, kind: L.kind, say: L.say})), active: Math.max(0, Q.lines.indexOf(Q.active))};
    saved.run.state = Q.state;
    save();
  }
  function keepSoon() { clearTimeout(keepTimer); keepTimer = setTimeout(keep, 600); }
  document.addEventListener('visibilitychange', () => { if (document.hidden) { keep(); clockOff(); } else clockOn(); });
  window.addEventListener('pagehide', () => { keep(); clockOff(); });

  function addLine(latex) {
    const li = document.createElement('li');
    li.className = 'line';
    const mf = new MathfieldElement();
    mf.mathVirtualKeyboardPolicy = 'manual';
    mf.setAttribute('aria-label', 'Working line');
    li.append(mf);
    li.insertAdjacentHTML('beforeend', '<span class="mk" aria-hidden="true"></span><p class="say"></p>');
    sheet.append(li);
    mf.menuItems = [];
    mf.macros = Object.assign({}, mf.macros, MACROS);
    mf.inlineShortcuts = SHORTCUTS;
    mf.value = latex || '';
    mf.readOnly = true;
    const L = {li: li, mf: mf, checked: null, kind: null, say: '', history: [], deleted: false};
    Q.lines.push(L);
    mf.addEventListener('input', () => edited(L));
    mf.addEventListener('keydown', ev => fieldKey(L, ev), {capture: true});
    /* MathLive's long-press menu stays closed. */
    mf.addEventListener('contextmenu', ev => ev.preventDefault());
    /* Tap a line to write on it. */
    li.addEventListener('pointerdown', ev => {
      if (!Q || Q.state !== 'open' || Q.active === L) return;
      ev.preventDefault();
      activate(L, true);
    });
    return L;
  }
  function paint(L) {
    L.li.classList.toggle('right', L.kind === 'right');
    L.li.classList.toggle('wrong', L.kind === 'wrong');
    L.li.classList.toggle('hint', L.kind === 'hint');
    const mk = L.li.querySelector('.mk'), want = L.kind === 'right' ? 'right' : L.kind === 'wrong' ? 'wrong' : '';
    if (mk.dataset.k !== want) { mk.dataset.k = want; mk.innerHTML = want === 'right' ? TICK : want === 'wrong' ? '<i></i>' : ''; }
    L.li.querySelector('.say').textContent = L.say || '';
  }
  /* MathLive finishes moving focus 60 ms after it is asked, and gives up if focus moved anywhere else in that time.
     So a button that had focus (like Start, which then hides) lets go first. */
  function focusField(mf) {
    if (document.activeElement === mf) return;
    const a = document.activeElement;
    if (a && a !== document.body && a.tagName !== 'MATH-FIELD' && a.blur) a.blur();
    mf.focus();
  }
  function reveal(el) {
    const a = sheet.getBoundingClientRect(), b = el.getBoundingClientRect();
    if (b.bottom > a.bottom - 8) sheet.scrollTop += b.bottom - a.bottom + 8;
    else if (b.top < a.top) sheet.scrollTop -= a.top - b.top + 4;
  }
  function activate(L, toEnd) {
    if (Q.active && Q.active !== L) { Q.active.li.classList.remove('active'); Q.active.mf.blur(); Q.active.mf.readOnly = true; }
    Q.active = L;
    L.li.classList.add('active');
    L.mf.readOnly = false;
    focusField(L.mf);
    if (toEnd) L.mf.position = L.mf.lastOffset;
    reveal(L.li);
    refreshCalc();
  }
  /* A line that changes after it was checked loses its mark until Enter checks it again. */
  function edited(L) {
    if (L.kind && L.mf.value !== L.checked) { L.kind = null; L.say = ''; paint(L); }
    if (L === (Q && Q.active)) refreshCalc();
    keepSoon();
  }

  /* ---------- checking ---------- */
  function check(L) {
    const latex = L.mf.value;
    if (L.checked === latex && L.kind) return L.kind;
    const r = LabMaths.checkLine(latex, ANSWERS[Q.i]);
    if (!r) return null;
    L.checked = latex; L.kind = r.kind; L.say = r.say;
    paint(L);
    if (r.kind === 'right') { labSound.right(); labBuzz(24); say('Right line.'); }
    else { if (r.kind === 'wrong') stat().wrong++; say(r.say); }
    return r.kind;
  }
  /* Enter checks the line and opens a new one below. Held, it starts the new line as a copy. */
  function enter(copy) {
    const L = Q.active, latex = L.mf.value;
    if (!latex.trim()) return;
    check(L);
    let next = Q.lines[Q.lines.length - 1];
    if (next === L || next.mf.value.trim()) next = addLine('');
    if (copy) { remember(next); next.mf.value = latex; }
    activate(next, true);
    keep();
  }
  /* Done checks the final answer: the line being written, or the last line with something on it. */
  function done() {
    if (!Q) return;
    if (Q.state !== 'open') { next(); return; }
    let L = Q.active;
    if (!L.mf.value.trim()) L = Q.lines.slice().reverse().find(l => l.mf.value.trim());
    if (!L) { toast('Write the answer first, like x = 4.'); return; }
    check(L);
    const r = LabMaths.checkAnswer(L.mf.value, ANSWERS[Q.i]);
    stat().tries++;
    if (r.ok) { finish('right'); return; }
    L.say = r.say; paint(L); say(r.say);
    keep();
  }
  function finish(kind) {
    clockOff();
    Q.state = kind;
    /* Empty lines left at the bottom go, so the sheet ends with the working. */
    while (Q.lines.length > 1 && !Q.lines[Q.lines.length - 1].mf.value.trim()) { const L = Q.lines.pop(); L.mf.blur(); L.li.remove(); }
    if (!Q.lines.includes(Q.active)) Q.active = Q.lines[Q.lines.length - 1];
    const st = stat();
    st.skipped = kind === 'skip';
    st.lines = Q.lines.filter(l => l.mf.value.trim()).length;
    if (kind === 'right') { labSound.solved(); labBuzz([24, 40, 24]); }
    lock();
    showEnd();
    setOpen();
    keep();
  }
  function showEnd() {
    const q = QS[Q.i], end = document.createElement('li');
    end.className = 'end';
    if (Q.state === 'right') { end.innerHTML = '<b>Right</b><span>' + clockText(stat().ms) + '</span>'; say('Right. Question done.'); }
    else { end.innerHTML = '<b>Answer</b><math-span>' + esc(drawn(q.show)) + '</math-span>'; say('Skipped. The answer is shown.'); }
    sheet.append(end);
    reveal(end);
    doneBtn.textContent = Q.i + 1 < QS.length ? 'Next question' : 'See results';
  }
  function lock() {
    keysEl.setAttribute('aria-disabled', 'true');
    Q.lines.forEach(L => { L.mf.readOnly = true; L.li.classList.remove('active'); });
    if (Q.active) Q.active.mf.blur();
    refreshCalc();
  }

  /* ---------- the calculator display ---------- */
  let calcNow = null;
  function refreshCalc() {
    const r = Q && Q.state === 'open' && Q.active ? LabMaths.calc(Q.active.mf.value) : null;
    calcNow = r && !r.error ? r : null;
    calcBtn.classList.toggle('on', !!calcNow);
    calcBtn.classList.toggle('err', !!(r && r.error));
    calcBtn.disabled = !calcNow;
    const lab = calcBtn.querySelector('.lab'), val = calcBtn.querySelector('.val');
    if (!r) { lab.textContent = ''; val.textContent = ''; calcBtn.removeAttribute('aria-label'); }
    else if (r.error) { lab.textContent = ''; val.textContent = 'Math error'; calcBtn.setAttribute('aria-label', 'Math error'); }
    else { lab.textContent = 'Tap to use'; val.innerHTML = '<math-span>' + esc(r.latex) + '</math-span>'; calcBtn.setAttribute('aria-label', 'Use ' + r.text); }
  }
  /* Tapping the value puts it into the line in place of the arithmetic it came from. */
  function useCalc() {
    if (!calcNow || !Q || Q.state !== 'open') return;
    const L = Q.active, latex = L.mf.value, r = LabMaths.calc(latex);
    if (!r || r.error) return;
    focusField(L.mf);
    remember(L);
    L.mf.value = latex.slice(0, r.from) + r.latex;
    L.mf.position = L.mf.lastOffset;
    edited(L);
  }

  /* ---------- the keypad ---------- */
  /* Each line keeps its own list of how it looked before each key that changed it, so Undo steps back one key at a time.
     (MathLive has its own undo, which joins runs of typing together. The keypad does not use it.) */
  function setLine(L, value, at) { L.mf.value = value; L.mf.position = Math.min(at, L.mf.lastOffset); }
  function remember(L) { L.history.push({v: L.mf.value, at: L.mf.position}); if (L.history.length > 500) L.history.shift(); }
  function forgetIfSame(L) { const h = L.history[L.history.length - 1]; if (h && h.v === L.mf.value) L.history.pop(); }
  const BASELESS = /(^|[{(=+\-]|\\(?:times|div|pm|mp|or|cdot)\s*)\^/;
  const defs = Keypad.build(keysEl, TOPIC, (name, how) => {
    if (how === 'land') { labSound.wake(); labSound.click(); labBuzz(6); return; }
    if (!Q || Q.state !== 'open') return;
    const L = Q.active, mf = L.mf, k = defs[name];
    focusField(mf);
    if (k.cmd === 'enter') { enter(how === 'hold'); return; }
    if (k.cmd === 'undo') {
      stat().undos++;
      const h = L.history.pop();
      if (h) setLine(L, h.v, h.at);
      edited(L);
      return;
    }
    if (k.cmd === 'delete' && how === 'hold') {
      /* Held: the line clears. The first touch already took one thing away, so the line from before that touch
         is what one Undo brings back. */
      if (L.deleted) { const h = L.history.pop(); if (h) setLine(L, h.v, h.at); }
      if (mf.value) { remember(L); setLine(L, '', 0); labBuzz(16); }
      L.deleted = false;
      edited(L);
      return;
    }
    remember(L);
    if (k.put) mf.insert(k.put);
    else if (k.shape) mf.insert(k.shape, {selectionMode: 'placeholder'});
    else if (k.script) {
      /* Square and power go on whatever is just before the cursor, as on the Casio. With nothing there, they bring an empty box. */
      const before = L.history[L.history.length - 1];
      mf.insert(k.script, {selectionMode: 'placeholder'});
      if (BASELESS.test(mf.value) && !BASELESS.test(before.v)) { setLine(L, before.v, before.at); mf.insert(k.alone, {selectionMode: 'placeholder'}); }
    } else if (k.cmd === 'left') mf.executeCommand('moveToPreviousChar');
    else if (k.cmd === 'right') mf.executeCommand('moveToNextChar');
    else if (k.cmd === 'delete') { mf.executeCommand('deleteBackward'); stat().deletes++; }
    forgetIfSame(L);
    L.deleted = k.cmd === 'delete' && L.history.length > 0 && L.history[L.history.length - 1].v !== mf.value;
    edited(L);
  });
  Keypad.strip($('#strip'), dir => {
    if (!Q || Q.state !== 'open') return;
    const mf = Q.active.mf, before = mf.position;
    focusField(mf);
    mf.executeCommand(dir < 0 ? 'moveToPreviousChar' : 'moveToNextChar');
    if (mf.position !== before) { labSound.step(); labBuzz(3); }
  }, () => labSound.wake());

  /* Done, Skip, the display and the sound switch click when pressed and do not take focus from the line. */
  [doneBtn, calcBtn, skipBtn, muteBtn].forEach(b => {
    b.addEventListener('pointerdown', ev => {
      ev.preventDefault();
      if (b.disabled) return;
      labSound.wake(); labSound.click(); labBuzz(6);
      b.classList.add('down');
    });
    const up = () => setTimeout(() => b.classList.remove('down'), 70);
    b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up); b.addEventListener('pointerleave', up);
  });
  doneBtn.addEventListener('click', done);
  calcBtn.addEventListener('click', useCalc);
  skipBtn.addEventListener('click', () => { if (Q && Q.state === 'open') finish('skip'); });
  function paintMute() {
    muteBtn.innerHTML = saved.sound ? SOUND_ON : SOUND_OFF;
    muteBtn.setAttribute('aria-pressed', String(!!saved.sound));
  }
  muteBtn.addEventListener('click', () => { saved.sound = !saved.sound; save(); paintMute(); toast(saved.sound ? 'Sound on' : 'Sound off'); });
  labSound.use(() => saved.sound !== false);

  /* Tapping the empty part of the sheet goes back to the line being written. */
  sheet.addEventListener('pointerdown', ev => {
    if (ev.target !== sheet || !Q || Q.state !== 'open') return;
    ev.preventDefault();
    activate(Q.active, false);
  });

  /* ---------- a computer keyboard ----------
     MathLive takes the typing. Enter checks, Shift and Enter copies, Control and Enter is Done. */
  function fieldKey(L, ev) {
    if (!Q) return;
    if (Q.state !== 'open') {
      if (ev.key === 'Enter') { ev.preventDefault(); ev.stopPropagation(); next(); }
      return;
    }
    /* Focus takes a moment to move to a new line. Keys that land on another line meanwhile go to the one being written. */
    if (L !== Q.active) { ev.preventDefault(); ev.stopPropagation(); typeKey(ev); return; }
    if (ev.key === 'Enter') {
      ev.preventDefault(); ev.stopPropagation();
      if (ev.metaKey || ev.ctrlKey) done(); else enter(ev.shiftKey);
      return;
    }
    if ((ev.metaKey || ev.ctrlKey) && !ev.shiftKey && ev.key.toLowerCase() === 'z') stat().undos++;
    else if (ev.key === 'Backspace' || ev.key === 'Delete') stat().deletes++;
  }
  /* Typing while nothing has focus goes to the line being written. */
  document.addEventListener('keydown', ev => {
    if (app.dataset.mode !== 'q' || ev.defaultPrevented || !Q) return;
    if ((ev.metaKey || ev.ctrlKey || ev.altKey) && ev.key !== 'Enter') return;
    const t = ev.target;
    if (t && t.closest && t.closest('math-field')) return;
    if (t && t.tagName === 'BUTTON' && (ev.key === 'Enter' || ev.key === ' ')) return;
    if (Q.state !== 'open') { if (ev.key === 'Enter') { ev.preventDefault(); next(); } return; }
    typeKey(ev);
  });
  function typeKey(ev) {
    const L = Q.active;
    if (ev.key === 'Enter') { ev.preventDefault(); focusField(L.mf); if (ev.metaKey || ev.ctrlKey) done(); else enter(ev.shiftKey); }
    else if (ev.key === 'Backspace') { ev.preventDefault(); focusField(L.mf); L.mf.executeCommand('deleteBackward'); stat().deletes++; edited(L); }
    else if (ev.key.length === 1 && ev.key !== ' ' && !ev.metaKey && !ev.ctrlKey && !ev.altKey) { ev.preventDefault(); focusField(L.mf); L.mf.insert(ev.key === '*' ? '\\times' : ev.key === '/' ? '\\div' : ev.key); edited(L); }
  }
  /* Phones only let sound start inside a tap, so every kind of tap gets it ready. */
  ['pointerdown', 'touchend', 'click', 'keydown'].forEach(t => document.addEventListener(t, () => labSound.wake(), {capture: true, passive: true}));
  document.addEventListener('contextmenu', ev => { if (app.contains(ev.target)) ev.preventDefault(); });

  /* ---------- moving between questions ---------- */
  function showQuestion() {
    if (Q) Q.lines.forEach(L => { try { L.mf.blur(); } catch (e) {} });
    sheet.textContent = '';
    const run = saved.run, i = run.qi, q = QS[i];
    if (!run.per[i]) run.per[i] = fresh();
    Q = {i: i, lines: [], active: null, state: run.state === 'right' || run.state === 'skip' ? run.state : 'open', since: null};
    setMode('q');
    qnum.innerHTML = '<span>Question ' + (i + 1) + ' of ' + QS.length + '</span><span>' + esc(TOPIC.ask) + '</span>';
    qmath.innerHTML = '<math-span>' + esc(drawn(q.eq)) + '</math-span>';
    const rows = run.sheet && Array.isArray(run.sheet.lines) && run.sheet.lines.length ? run.sheet.lines : [{latex: ''}];
    rows.forEach(r => {
      const L = addLine(typeof r.latex === 'string' ? r.latex : '');
      if (r.kind === 'right' || r.kind === 'wrong' || r.kind === 'hint') { L.kind = r.kind; L.checked = r.checked; L.say = r.say || ''; paint(L); }
    });
    doneBtn.textContent = 'Done';
    if (Q.state === 'open') {
      keysEl.removeAttribute('aria-disabled');
      const at = run.sheet && Q.lines[run.sheet.active] ? Q.lines[run.sheet.active] : Q.lines[Q.lines.length - 1];
      activate(at, true);
      clockOn();
    } else { lock(); showEnd(); }
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
    if (Q) Q.lines.forEach(L => { try { L.mf.blur(); } catch (e) {} });
    Q = null; sheet.textContent = '';
    setMode('results');
    const run = saved.run, t = totals(run.per);
    const cell = (k, v) => '<div><dt>' + k + '</dt><dd>' + v + '</dd></div>';
    let h = '<p class="kicker">Maths Lab</p><h1 class="h1">Results</h1>' +
      '<dl class="stats6">' + cell('Time', clockText(t.ms)) + cell('Lines', t.lines) + cell('Wrong lines', t.wrong) +
      cell('Deletes', t.deletes) + cell('Undos', t.undos) + cell('Skips', t.skips) + '</dl>' +
      '<section class="sec"><h2 class="h2">Each question</h2><ol class="qrows">';
    QS.forEach((q, i) => {
      const p = run.per[i] || fresh();
      h += '<li class="qrow"><span class="n">' + (i + 1) + '</span><math-span>' + esc(drawn(q.eq)) + '</math-span><span class="t">' + clockText(p.ms) + '</span>' +
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
  function showIntro() { Q = null; sheet.textContent = ''; setMode('intro'); intro.scrollTop = 0; }

  /* ---------- start ---------- */
  load();
  paintMute();
  if (!saved.run) showIntro();
  else if (saved.run.complete || saved.run.qi >= QS.length) showResults();
  else showQuestion();
})();
