/* Stratos maths: the working sheet and the keypad that writes on it.
   Shared by the Maths Lab (maths-lab.html) and the main app (v2.html, which build.py fills from this file).
   One question's working sits on the sheet, one line per row. Each line is a MathLive field.
   Only the line being written can be typed in; tapping another line moves there.
   The page that uses the sheet decides what happens around it: what Done does, what is saved, what is counted.

   Sheet.create(o) sets up the keypad once. o holds:
     keys, calc, strip, done   the keypad's elements: the keys, the calculator display, the drag strip, the Done button
     topic                     the topic row of keys and the short names they type (see lab/topics.js)
     sound                     wake(), click() and step() for the keys
     buzz(pattern)             vibration
     say(text), toast(text)    words for screen readers, and a short message on screen
     live()                    true while typing with no line in focus should go to the sheet
     onDone()                  Done, or Control and Enter
     onNext()                  Enter after the question is over
     onLine(kind)              a line was checked: kind is right, wrong or hint
     count(name)               counts for the page: wrong, deletes, undos
     changed()                 the lines changed, so the page can save them
   It returns a sheet. sheet.start(...) puts one question's working on a list element. */
const Sheet = (() => {
  'use strict';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
  const TICK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  /* What typing on a computer keyboard turns into. */
  /* (+ then - and o then r are handled in typeChar below, so they work at any typing speed.) */
  const SHORTCUTS = {'*': '\\times', 'sqrt': '\\sqrt{#?}'};
  const BASELESS = /(^|[{(=+\-]|\\(?:times|div|pm|mp|or|cdot)\s*)\^/;
  /* = and "or" never belong inside a power, fraction, root or brackets, so they first step the cursor out to the main line. */
  const STEPS_OUT = new Set(['=', '\\or']);

  /* LaTeX for drawing only (not typing): the topic's short names written out in full, so \or draws as the word or. */
  const drawnWith = macros => latex => Object.keys(macros || {}).reduce((s, k) => s.replace(new RegExp('\\\\' + k + '(?![a-zA-Z])', 'g'), macros[k]), String(latex));

  function create(o) {
    const nop = () => {};
    const sound = o.sound || {}, buzz = o.buzz || nop, say = o.say || nop, toast = o.toast || nop;
    const count = o.count || nop, changed = o.changed || nop, onLine = o.onLine || nop;
    const live = o.live || (() => true);
    const MACROS = {};
    Object.keys(o.topic.macros || {}).forEach(k => { MACROS[k] = {def: o.topic.macros[k], expand: false, captureSelection: true}; });
    /* MathLive's own sounds, vibration and on-screen keyboard are not used. Ours are. */
    try { MathfieldElement.soundsDirectory = null; } catch (e) {}
    try { MathfieldElement.keypressVibration = false; } catch (e) {}

    /* S is the question on the sheet: its list element (el), its answers as numbers, its lines,
       the line being written (active), and whether it is still open for writing. */
    let S = null;

    function addLine(latex) {
      const li = document.createElement('li');
      li.className = 'line';
      const mf = new MathfieldElement();
      mf.mathVirtualKeyboardPolicy = 'manual';
      mf.setAttribute('aria-label', 'Working line');
      li.append(mf);
      li.insertAdjacentHTML('beforeend', '<span class="mk" aria-hidden="true"></span><p class="say"></p>');
      S.el.append(li);
      mf.menuItems = [];
      mf.macros = Object.assign({}, mf.macros, MACROS);
      mf.inlineShortcuts = SHORTCUTS;
      mf.value = latex || '';
      mf.readOnly = true;
      const L = {li: li, mf: mf, checked: null, kind: null, say: '', history: [], deleted: false, box: null};
      S.lines.push(L);
      mf.addEventListener('input', () => edited(L));
      /* MathLive's long-press menu stays closed. */
      mf.addEventListener('contextmenu', ev => ev.preventDefault());
      /* A tap inside the line moves the cursor itself, so an open box (see the keypad) no longer applies. */
      mf.addEventListener('pointerdown', () => { L.box = null; });
      /* Tap a line to write on it. */
      li.addEventListener('pointerdown', ev => {
        if (!S || !S.open || S.active === L || !S.lines.includes(L)) return;
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
      mf.focus({preventScroll: true});
    }
    /* Keep a row in sight inside the sheet, which scrolls on its own. */
    function reveal(el) {
      const box = S.el, a = box.getBoundingClientRect(), b = el.getBoundingClientRect();
      if (b.bottom > a.bottom - 8) box.scrollTop += b.bottom - a.bottom + 8;
      else if (b.top < a.top) box.scrollTop -= a.top - b.top + 4;
    }
    function activate(L, toEnd) {
      if (S.active && S.active !== L) { S.active.li.classList.remove('active'); S.active.mf.blur(); S.active.mf.readOnly = true; }
      S.active = L;
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
      if (S && L === S.active) refreshCalc();
      changed();
    }

    /* ---------- checking ---------- */
    function check(L) {
      const latex = L.mf.value;
      if (L.checked === latex && L.kind) return L.kind;
      const r = LabMaths.checkLine(latex, S.answers);
      if (!r) return null;
      L.checked = latex; L.kind = r.kind; L.say = r.say;
      paint(L);
      if (r.kind === 'right') say('Right line.');
      else { if (r.kind === 'wrong') count('wrong'); say(r.say); }
      onLine(r.kind, L);
      return r.kind;
    }
    /* Enter checks the line and opens a new one below. Held, it starts the new line as a copy. */
    function enter(copy) {
      const L = S.active, latex = L.mf.value;
      if (!latex.trim()) return;
      check(L);
      let next = S.lines[S.lines.length - 1];
      if (next === L || next.mf.value.trim()) next = addLine('');
      if (copy) { remember(next); next.mf.value = latex; }
      activate(next, true);
      changed();
    }

    /* ---------- the calculator display ---------- */
    let calcNow = null;
    function refreshCalc() {
      const r = S && S.open && S.active ? LabMaths.calc(S.active.mf.value) : null;
      calcNow = r && !r.error ? r : null;
      o.calc.classList.toggle('on', !!calcNow);
      o.calc.classList.toggle('err', !!(r && r.error));
      o.calc.disabled = !calcNow;
      const lab = o.calc.querySelector('.lab'), val = o.calc.querySelector('.val');
      if (!r) { lab.textContent = ''; val.textContent = ''; o.calc.removeAttribute('aria-label'); }
      else if (r.error) { lab.textContent = ''; val.textContent = 'Math error'; o.calc.setAttribute('aria-label', 'Math error'); }
      else { lab.textContent = 'Tap to use'; val.innerHTML = '<math-span>' + esc(r.latex) + '</math-span>'; o.calc.setAttribute('aria-label', 'Use ' + r.text); }
    }
    /* Tapping the value puts it into the line in place of the arithmetic it came from. */
    function useCalc() {
      if (!calcNow || !S || !S.open) return;
      const L = S.active, latex = L.mf.value, r = LabMaths.calc(latex);
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
    /* Each step keeps the line, the cursor or selection (so an empty box comes back selected), and any open box. */
    const snap = L => ({v: L.mf.value, sel: JSON.parse(JSON.stringify(L.mf.selection)), box: L.box ? Object.assign({}, L.box) : null});
    function restore(L, h) {
      L.mf.value = h.v;
      try { L.mf.selection = h.sel; } catch (e) { L.mf.position = L.mf.lastOffset; }
      L.box = h.box ? Object.assign({}, h.box) : null;
    }
    function remember(L) { L.history.push(snap(L)); if (L.history.length > 500) L.history.shift(); }
    function forgetIfSame(L) { const h = L.history[L.history.length - 1]; if (h && h.v === L.mf.value) L.history.pop(); }
    function stepOut(mf) {
      for (let i = 0; i < 20; i++) { const at = mf.position; mf.executeCommand('moveAfterParent'); if (mf.position === at) break; }
    }
    /* Square or power on an empty spot drops an empty box with the cursor in it. The box takes the number typed next
       (digits, the point, or a letter such as x). The first other key closes the box first: the cursor jumps past the
       square, or past the power. Without this, MathLive would carry the ² along to whatever comes next, so 7 = 49 after
       the box became 7 = 49².
       The box remembers how many cursor places came after it; closing puts the cursor back that far from the end. */
    const fills = k => !!(k.num || (k.topic && /^[a-zA-Z]$/.test(k.put || '')));
    function closeBox(L, stay) {
      const box = L.box;
      L.box = null;
      if (!box || stay) return false;
      L.mf.position = Math.max(0, L.mf.lastOffset - box.tail);
      return true;
    }
    /* Delete on an empty line removes it, as in a notes app, and the cursor goes to the end of the line above.
       The first line always stays. */
    function removeLine(L) {
      const i = S.lines.indexOf(L);
      if (i <= 0 || L.mf.value) return false;
      S.lines.splice(i, 1);
      L.mf.blur();
      L.li.remove();
      S.active = null;
      activate(S.lines[i - 1], true);
      count('deletes');
      say('Line removed.');
      changed();
      return true;
    }
    let pressRemoved = false;      /* a Delete press that removed a line does nothing more when it is held */
    const defs = Keypad.build(o.keys, o.topic, (name, how) => {
      if (how === 'land') { pressRemoved = false; if (sound.wake) sound.wake(); if (sound.click) sound.click(); buzz(6); return; }
      if (!S || !S.open) return;
      const L = S.active, mf = L.mf, k = defs[name];
      focusField(mf);
      if (L.box && k.cmd === 'delete' && how === 'tap') {
        /* Delete inside a box takes back one number at a time, then the box's last number leaves the box empty,
           and Delete on the empty box takes the square or power away. */
        const box = L.box;
        remember(L);
        if (box.n > 1) { mf.executeCommand('deleteBackward'); box.n--; }
        else if (box.n === 1) restore(L, box.empty);
        else restore(L, box.before);
        count('deletes');
        L.deleted = true;
        edited(L);
        return;
      }
      if (L.box && !fills(k)) {
        /* The right arrow on a power box goes on into the power, as normal. Anywhere else it just closes the box. */
        if (k.cmd === 'right' && L.box.power) L.box = null;
        /* Delete, Undo and the left arrow work on the box itself. Any other key goes after it, even if it is still empty,
           so the empty box stays in sight and the line says so. */
        else if (closeBox(L, k.cmd === 'delete' || k.cmd === 'undo' || k.cmd === 'left') && k.cmd === 'right') { edited(L); return; }
      }
      if (k.cmd === 'enter') { enter(how === 'hold'); return; }
      if (k.cmd === 'undo') {
        count('undos');
        const h = L.history.pop();
        if (h) restore(L, h);
        edited(L);
        return;
      }
      if (k.cmd === 'delete' && how === 'hold') {
        if (pressRemoved) return;
        /* Held: the line clears. The first touch already took one thing away, so the line from before that touch
           is what one Undo brings back. */
        if (L.deleted) { const h = L.history.pop(); if (h) restore(L, h); }
        if (mf.value) { remember(L); setLine(L, '', 0); buzz(16); }
        L.deleted = false;
        edited(L);
        return;
      }
      if (k.cmd === 'delete' && !mf.value) { pressRemoved = removeLine(L); return; }
      remember(L);
      if (STEPS_OUT.has(k.put)) stepOut(mf);
      if (k.put) mf.insert(k.put);
      else if (k.shape) mf.insert(k.shape, {selectionMode: 'placeholder'});
      else if (k.script) {
        /* Square and power go on whatever is just before the cursor, as on the Casio. With nothing there, they bring an empty box. */
        const before = L.history[L.history.length - 1];
        mf.insert(k.script, {selectionMode: 'placeholder'});
        if (BASELESS.test(mf.value) && !BASELESS.test(before.v)) {
          restore(L, before);
          const tail = mf.lastOffset - mf.position;
          mf.insert(k.alone, {selectionMode: 'placeholder'});
          L.box = {tail: tail, n: 0, power: name === 'power', before: before, empty: null};
          L.box.empty = snap(L);
        }
      } else if (k.cmd === 'left') mf.executeCommand('moveToPreviousChar');
      else if (k.cmd === 'right') mf.executeCommand('moveToNextChar');
      else if (k.cmd === 'delete') { mf.executeCommand('deleteBackward'); count('deletes'); }
      if (L.box && fills(k)) L.box.n++;
      forgetIfSame(L);
      L.deleted = k.cmd === 'delete' && L.history.length > 0 && L.history[L.history.length - 1].v !== mf.value;
      edited(L);
    });
    Keypad.strip(o.strip, dir => {
      if (!S || !S.open) return;
      const mf = S.active.mf, before = mf.position;
      S.active.box = null;
      focusField(mf);
      mf.executeCommand(dir < 0 ? 'moveToPreviousChar' : 'moveToNextChar');
      if (mf.position !== before) { if (sound.step) sound.step(); buzz(3); }
    }, () => { if (sound.wake) sound.wake(); });

    /* Buttons around the keypad click when pressed and do not take focus from the line. */
    function pressable(b) {
      b.addEventListener('pointerdown', ev => {
        ev.preventDefault();
        if (b.disabled) return;
        if (sound.wake) sound.wake(); if (sound.click) sound.click(); buzz(6);
        b.classList.add('down');
      });
      const up = () => setTimeout(() => b.classList.remove('down'), 70);
      b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up); b.addEventListener('pointerleave', up);
    }
    pressable(o.done); pressable(o.calc);
    o.done.addEventListener('click', () => { if (o.onDone) o.onDone(); });
    o.calc.addEventListener('click', useCalc);

    /* ---------- a computer keyboard ----------
       MathLive takes the typing. Enter checks, Shift and Enter copies, Control and Enter is Done. */
    /* Keys typed into a line are caught here, on the whole window, before MathLive sees them. Browsers differ in when a
       listener on the line itself runs: Safari can run it after MathLive, which already handled Backspace by then. The
       window always comes first, in every browser. */
    window.addEventListener('keydown', ev => {
      if (!S) return;
      const path = ev.composedPath ? ev.composedPath() : [ev.target];
      const L = S.lines.find(l => path.includes(l.mf));
      if (L) fieldKey(L, ev); else looseKey(ev);
    }, true);
    const done = () => { if (o.onDone) o.onDone(); };
    const next = () => { if (o.onNext) o.onNext(); };
    function fieldKey(L, ev) {
      if (!S.open) {
        if (ev.key === 'Enter') { ev.preventDefault(); ev.stopPropagation(); next(); }
        return;
      }
      /* Focus takes a moment to move to a new line. Keys that land on another line meanwhile go to the one being written. */
      if (L !== S.active) { ev.preventDefault(); ev.stopPropagation(); typeKey(ev); return; }
      if (ev.key === 'Enter') {
        ev.preventDefault(); ev.stopPropagation();
        if (ev.metaKey || ev.ctrlKey) done(); else enter(ev.shiftKey);
        return;
      }
      if (ev.key === 'Backspace' && !ev.metaKey && !ev.ctrlKey && !ev.altKey) {
        /* Backspace is done here, not by MathLive, so it works the same in every browser:
           on an empty line it removes the line, otherwise it deletes one thing. */
        ev.preventDefault(); ev.stopPropagation();
        L.box = null;
        if (!L.mf.value && removeLine(L)) return;
        L.mf.executeCommand('deleteBackward'); count('deletes'); edited(L);
        return;
      }
      if (ev.key.length === 1 && !ev.metaKey && !ev.ctrlKey && !ev.altKey) {
        /* Characters with a meaning of their own here are typed by typeChar, so they behave the same at any speed. */
        if (L.box || ev.key === '=' || ev.key === '-' || ev.key === 'r') { ev.preventDefault(); ev.stopPropagation(); typeChar(L, ev.key); return; }
      } else if (ev.key !== 'Shift') L.box = null;
      if ((ev.metaKey || ev.ctrlKey) && !ev.shiftKey && ev.key.toLowerCase() === 'z') count('undos');
      else if (ev.key === 'Backspace' || ev.key === 'Delete') count('deletes');
    }
    /* Typing while no line has focus (just after Start, or after a click elsewhere) goes to the line being written. */
    function looseKey(ev) {
      if (!live() || ev.defaultPrevented) return;
      if ((ev.metaKey || ev.ctrlKey || ev.altKey) && ev.key !== 'Enter') return;
      const t = ev.target;
      if (t && t.closest && t.closest('math-field')) return;
      if (t && t.tagName === 'BUTTON' && (ev.key === 'Enter' || ev.key === ' ')) return;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      if (!S.open) { if (ev.key === 'Enter') { ev.preventDefault(); next(); } return; }
      typeKey(ev);
    }
    function typeKey(ev) {
      const L = S.active;
      if (ev.key === 'Enter') { ev.preventDefault(); ev.stopPropagation(); focusField(L.mf); if (ev.metaKey || ev.ctrlKey) done(); else enter(ev.shiftKey); }
      else if (ev.key === 'Backspace') {
        ev.preventDefault(); ev.stopPropagation(); focusField(L.mf);
        if (!L.mf.value && removeLine(L)) return;
        L.mf.executeCommand('deleteBackward'); count('deletes'); edited(L);
      }
      else if (ev.key.length === 1 && ev.key !== ' ' && !ev.metaKey && !ev.ctrlKey && !ev.altKey) { ev.preventDefault(); ev.stopPropagation(); focusField(L.mf); typeChar(L, ev.key); }
    }
    /* One typed character. + then - makes ±, and o then r makes the word "or", however fast they are typed.
       = steps out of any power or fraction first, as on the keypad. */
    function typeChar(L, ch) {
      const mf = L.mf;
      if (L.box) { if (/^[0-9.a-zA-Z]$/.test(ch)) L.box.n++; else closeBox(L); }
      const prev = mf.position > 0 ? mf.getValue(mf.position - 1, mf.position) : '';
      if (ch === '-' && prev === '+') { mf.executeCommand('deleteBackward'); mf.insert('\\pm'); }
      else if (ch === 'r' && prev === 'o') { mf.executeCommand('deleteBackward'); mf.insert('\\or'); }
      else if (ch === '=') { stepOut(mf); mf.insert('='); }
      else mf.insert(ch === '*' ? '\\times' : ch === '/' ? '\\div' : ch);
      edited(L);
    }

    /* ---------- one question on the sheet ---------- */
    /* Put a question's working on the list element q.el.
       q.answers  the question's solutions, as numbers
       q.given    lines already written for the student, as {latex, note}. They are locked and cannot be changed.
       q.rows     the student's lines so far, as {latex, kind, checked, say}. One empty line if there are none.
       q.at       which of those lines to write on
       q.open     false if the question is already over */
    function start(q) {
      stop();
      const el = q.el;
      el.textContent = '';
      S = {el: el, answers: q.answers, lines: [], active: null, open: q.open !== false};
      (q.given || []).forEach(g => {
        el.insertAdjacentHTML('beforeend', '<li class="line given"><math-span>' + esc(drawn(g.latex)) + '</math-span><span class="mk" aria-hidden="true"></span>' +
          (g.note ? '<p class="say">' + esc(g.note) + '</p>' : '') + '</li>');
      });
      const rows = q.rows && q.rows.length ? q.rows : [{latex: ''}];
      rows.forEach(r => {
        const L = addLine(typeof r.latex === 'string' ? r.latex : '');
        if (r.kind === 'right' || r.kind === 'wrong' || r.kind === 'hint') { L.kind = r.kind; L.checked = r.checked; L.say = r.say || ''; paint(L); }
      });
      if (S.open) {
        o.keys.removeAttribute('aria-disabled');
        activate(S.lines[q.at] || S.lines[S.lines.length - 1], true);
      } else lock();
      return S;
    }
    /* Stop writing: the keys go quiet and every line is read only. */
    function lock() {
      if (!S) return;
      S.open = false;
      o.keys.setAttribute('aria-disabled', 'true');
      S.lines.forEach(L => { L.mf.readOnly = true; L.li.classList.remove('active'); });
      if (S.active) S.active.mf.blur();
      refreshCalc();
    }
    /* Let go of the sheet on screen, without changing it. */
    function stop() {
      if (S) S.lines.forEach(L => { try { L.mf.blur(); } catch (e) {} });
      S = null;
      refreshCalc();
    }
    /* Empty lines left at the bottom go, so the sheet ends with the working. */
    function trim() {
      while (S.lines.length > 1 && !S.lines[S.lines.length - 1].mf.value.trim()) { const L = S.lines.pop(); L.mf.blur(); L.li.remove(); }
      if (!S.lines.includes(S.active)) S.active = S.lines[S.lines.length - 1];
    }
    /* The line Done checks: the one being written, or the last line with something on it. */
    function finalLine() {
      let L = S.active;
      if (!L || !L.mf.value.trim()) L = S.lines.slice().reverse().find(l => l.mf.value.trim());
      return L || null;
    }
    /* One sentence under a line, such as what Done found wrong. */
    function note(L, text) { L.say = text; paint(L); say(text); }
    const drawn = drawnWith(o.topic.macros);

    return {
      start: start, lock: lock, stop: stop, trim: trim, finalLine: finalLine, check: check, note: note, reveal: el => reveal(el),
      pressable: pressable, drawn: drawn,
      /* Go back to the line being written, as it was. */
      focus: () => { if (S && S.open && S.active) activate(S.active, false); },
      get open() { return !!S && S.open; },
      get el() { return S ? S.el : null; },
      get active() { return S ? S.active : null; },
      /* The lines as plain data, for saving. */
      rows: () => S ? S.lines.map(L => ({latex: L.mf.value, checked: L.checked, kind: L.kind, say: L.say})) : [],
      at: () => S ? Math.max(0, S.lines.indexOf(S.active)) : 0,
      count: () => S ? S.lines.filter(l => l.mf.value.trim()).length : 0,
      /* The ticks land again, one line after another, step ms apart (all at once if step is 0).
         each(i, n) runs as line i of n ticks. Returns how many lines tick. */
      celebrate: (step, each) => {
        const right = S ? S.lines.filter(L => L.kind === 'right') : [];
        right.forEach((L, i) => {
          const go = () => { const mk = L.li.querySelector('.mk'); if (mk) mk.innerHTML = mk.innerHTML; if (each) each(i, right.length); };
          if (step) setTimeout(go, i * step); else go();
        });
        return right.length;
      }
    };
  }

  return {create: create, drawnWith: drawnWith};
})();
