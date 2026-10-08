/* Stratos Maths Lab: the keypad.
   The order follows the Casio fx-82AU, the calculator most NSW students use in exams:
   the number block at the bottom with the operators to its right, and the functions in rows above.
     row 1  the topic's own keys (from topics.js), then the two arrows
     row 2  fraction, root, square, power, brackets: the Casio's □/□ √□ x² x^□ order
     rows 3 to 6  the Casio's number block. Its AC is Undo, its ×10ˣ is =, and its Ans and = are one wide Enter.
   Every key goes down and clicks the moment a finger lands. Most also act then.
   Delete and Enter can be held: Delete clears the line, Enter copies it. The arrows repeat while held. */
const Keypad = (() => {
  'use strict';
  const ROWS = [
    'topic',
    ['frac', 'sqrt', 'square', 'power', 'brackets'],
    ['7', '8', '9', 'delete', 'undo'],
    ['4', '5', '6', 'times', 'divide'],
    ['1', '2', '3', 'plus', 'minus'],
    ['0', 'point', 'equals', 'enter']
  ];
  /* Line icons in the style of src/10-core.js. A slot is an empty box, drawn the way MathLive draws one. */
  const svg = (d, w) => '<svg class="kf" viewBox="0 0 ' + (w || 28) + ' 28" aria-hidden="true">' + d + '</svg>';
  const icon = d => '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">' + d + '</svg>';
  const slot = (x, y, w, h) => '<rect class="slot" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="1.6"/>';
  const KEYS = {
    frac: {face: svg(slot(9, 2.5, 10, 8) + '<path d="M5.5 14h17"/>' + slot(9, 17.5, 10, 8)), name: 'Fraction', shape: '\\frac{\\placeholder{}}{\\placeholder{}}'},
    sqrt: {face: svg('<path d="M2.5 16l3-1.5 4 8.5 4.5-18.5h12"/>' + slot(15.5, 9, 9, 10)), name: 'Square root', shape: '\\sqrt{\\placeholder{}}'},
    square: {face: svg(slot(5, 10, 12, 13) + '<text class="sup" x="18.5" y="11.5">2</text>'), name: 'Square', script: '^{2}', alone: '\\placeholder{}^{2}'},
    power: {face: svg(slot(4, 10, 12, 13) + slot(18, 3, 7.5, 8)), name: 'Power', script: '^{\\placeholder{}}', alone: '\\placeholder{}^{\\placeholder{}}'},
    brackets: {face: svg('<path d="M8 3.5C4.5 8 4.5 20 8 24.5M20 3.5c3.5 4.5 3.5 16.5 0 21"/>' + slot(9.5, 9, 9, 10)), name: 'Brackets', shape: '\\left(\\placeholder{}\\right)'},
    left: {face: icon('<path d="M15 6l-6 6 6 6"/>'), name: 'Move left', cmd: 'left', repeat: true},
    right: {face: icon('<path d="M9 6l6 6-6 6"/>'), name: 'Move right', cmd: 'right', repeat: true},
    delete: {face: icon('<path d="M9 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-6-7z"/><path d="M12.5 9.5l5 5M17.5 9.5l-5 5"/>'), name: 'Delete. Hold to clear the line', cmd: 'delete', hold: true},
    undo: {face: 'Undo', name: 'Undo', cmd: 'undo', word: true},
    times: {face: icon('<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>'), name: 'Times', put: '\\times', op: true},
    divide: {face: icon('<path d="M5 12h14"/><circle class="dot" cx="12" cy="6.5" r="1.5"/><circle class="dot" cx="12" cy="17.5" r="1.5"/>'), name: 'Divide', put: '\\div', op: true},
    plus: {face: icon('<path d="M12 5v14M5 12h14"/>'), name: 'Plus', put: '+', op: true},
    minus: {face: icon('<path d="M5 12h14"/>'), name: 'Minus', put: '-', op: true},
    equals: {face: icon('<path d="M5 9h14M5 15h14"/>'), name: 'Equals', put: '=', op: true},
    point: {face: '.', name: 'Decimal point', put: '.', num: true},
    enter: {face: 'Enter', name: 'Enter. Checks the line. Hold to copy it to the next line', cmd: 'enter', hold: true, onRelease: true, word: true, wide: true}
  };
  for (let d = 0; d <= 9; d++) KEYS[String(d)] = {face: String(d), name: String(d), put: String(d), num: true};

  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
  const HOLD = 450, REPEAT_AFTER = 380, REPEAT_EVERY = 70, STEP_PX = 14;

  /* Build the keys into el. topic gives the first row. send(name, how) is called with how = 'tap', 'hold' or 'repeat'. */
  function build(el, topic, send) {
    const defs = {};
    topic.keys.forEach((k, i) => { defs['t' + i] = {face: k.icon ? icon(k.icon) : esc(k.face), name: k.name, put: k.put, maths: k.maths, word: !k.maths && !k.icon, topic: true}; });
    let html = '';
    ROWS.forEach(row => {
      const names = row === 'topic' ? Object.keys(defs).concat(['left', 'right']) : row;
      names.forEach(n => {
        const k = defs[n] || KEYS[n];
        defs[n] = k;
        const cls = ['key', k.num || k.op ? 'num' : 'fn', k.op ? 'op' : '', k.maths ? 'maths' : '', k.word ? 'word' : '', n === 'enter' ? 'enter' : '', k.wide ? 'wide' : ''].filter(Boolean).join(' ');
        html += '<button class="' + cls + '" type="button" tabindex="-1" data-key="' + n + '" aria-label="' + k.name + '">' + k.face + '</button>';
      });
    });
    el.innerHTML = html;
    el.style.setProperty('--cols', 5);
    wire(el, defs, send);
    return defs;
  }

  function wire(el, defs, send) {
    const live = new Map();          /* fingers that are down right now, by pointer id */
    const down = (b, on) => { if (on) b.classList.add('down'); else b.classList.remove('down'); };
    el.addEventListener('pointerdown', ev => {
      const b = ev.target.closest('.key');
      if (!b || !el.contains(b) || b.disabled) return;
      ev.preventDefault();             /* keeps focus and the cursor where they are, and stops text selection */
      if (el.getAttribute('aria-disabled') === 'true') return;
      const name = b.dataset.key, k = defs[name];
      try { b.setPointerCapture(ev.pointerId); } catch (e) {}
      const press = {b: b, name: name, k: k, at: performance.now(), timer: 0, held: false};
      live.set(ev.pointerId, press);
      down(b, true);
      send(name, 'land');
      if (k.repeat) {
        send(name, 'tap');
        press.timer = setTimeout(function again() { press.held = true; send(name, 'repeat'); press.timer = setTimeout(again, REPEAT_EVERY); }, REPEAT_AFTER);
      } else if (k.hold) {
        if (!k.onRelease) send(name, 'tap');
        press.timer = setTimeout(() => { press.held = true; down(b, false); b.classList.add('held'); send(name, 'hold'); }, HOLD);
      } else send(name, 'tap');
    });
    const finish = (ev, cancelled) => {
      const press = live.get(ev.pointerId);
      if (!press) return;
      live.delete(ev.pointerId);
      clearTimeout(press.timer);
      /* Keep the pressed look on screen long enough to see, even for a very quick tap. */
      const left = Math.max(0, 70 - (performance.now() - press.at));
      setTimeout(() => { down(press.b, false); press.b.classList.remove('held'); }, left);
      if (!cancelled && press.k.onRelease && !press.held) send(press.name, 'tap');
    };
    el.addEventListener('pointerup', ev => finish(ev, false));
    el.addEventListener('pointercancel', ev => finish(ev, true));
    /* On phones, also stop the touch itself, so a long press never selects text, opens the magnifier or zooms. */
    el.addEventListener('touchstart', ev => { if (ev.cancelable) ev.preventDefault(); }, {passive: false});
    el.addEventListener('contextmenu', ev => ev.preventDefault());
    /* A key pressed with a keyboard (Space or Enter on a focused key) still works. */
    el.addEventListener('click', ev => {
      const b = ev.target.closest('.key');
      if (!b || ev.detail !== 0 || el.getAttribute('aria-disabled') === 'true') return;
      send(b.dataset.key, 'land'); send(b.dataset.key, 'tap');
    });
  }

  /* The strip above the keys. Dragging along it moves the cursor one place for every few pixels,
     like holding the iPhone space bar. step(-1) moves left, step(1) moves right. */
  function strip(el, step, onStart) {
    let id = null, from = 0;
    el.addEventListener('pointerdown', ev => {
      ev.preventDefault();
      id = ev.pointerId; from = ev.clientX;
      try { el.setPointerCapture(id); } catch (e) {}
      el.classList.add('on');
      if (onStart) onStart();
    });
    el.addEventListener('pointermove', ev => {
      if (ev.pointerId !== id) return;
      let dx = ev.clientX - from;
      while (Math.abs(dx) >= STEP_PX) { const s = dx > 0 ? 1 : -1; step(s); from += s * STEP_PX; dx -= s * STEP_PX; }
    });
    const end = ev => { if (ev.pointerId !== id) return; id = null; el.classList.remove('on'); };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
    el.addEventListener('touchstart', ev => { if (ev.cancelable) ev.preventDefault(); }, {passive: false});
  }

  return {build: build, strip: strip, KEYS: KEYS};
})();
