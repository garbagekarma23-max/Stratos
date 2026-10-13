/* ---------- the intro: the word Stratos with the student's rocket flying round it ----------
   It plays each time the app is opened (start() in 90-boot.js), never when switching tabs.
   The rocket flies a tilted ring round the word, like a ring round a planet seen from slightly above. It starts at
   the bottom of the ring, in front of the word, and goes 1.25 laps, right side first, speeding up. On the lower half
   it is in front of the word and a little larger; on the upper half it is behind the word, a little smaller and
   faded. Then the ring widens, so the rocket spirals out of the frame without turning. 1.5 seconds in all, then a
   quick fade into Home. A tap skips it. With reduced motion the rocket is parked in front of the word, still. */
const intro = (() => {
  const el = $('#intro');
  const TILT = -12 * Math.PI / 180;   /* the ring is tilted 12 degrees, right side up (up is minus on a screen) */
  const GAP = 28;                     /* how far the ring reaches past each end of the word, in px */
  const FLAT = 0.2;                   /* the ring's height is 20% of its width */
  const LAPS = 1.25, ORBIT = 1.1, LEAVE = 0.4, END = ORBIT + LEAVE, TRAIL = 0.3;
  const LEN = 30;                     /* the rocket's length in px, flame included */
  const SLOW = 0.4;                   /* how fast it starts, against its average speed round the ring */
  const FADE = 0.15, SKIP = 0.12, HOLD = 1, SAFE = 1800;
  /* The angle round the ring. During the orbit it speeds up evenly: it starts at SLOW times the average speed and
     ends at 2 - SLOW times it. After the orbit it keeps that last speed. */
  const PHI = LAPS * 2 * Math.PI, W1 = PHI * (2 - SLOW) / ORBIT;
  const phiAt = t => t <= ORBIT ? PHI * (SLOW * t / ORBIT + (1 - SLOW) * (t / ORBIT) * (t / ORBIT)) : PHI + W1 * (t - ORBIT);
  let ring = null, grow = 0, view = {w: 0, h: 0};
  /* How much bigger the ring is. It starts widening at zero speed, so the path has no corner in it. */
  const sizeAt = t => { const u = Math.max(0, t - ORBIT); return 1 + grow * u * u; };
  /* Where the rocket is at time t, in px from the top left of the screen. d is 1 at the front of the ring (the
     bottom, nearest us), -1 at the back (the top), and 0 at the two ends. */
  function at(t) {
    const f = phiAt(t), s = sizeAt(t), x = s * ring.a * Math.sin(f), y = s * ring.b * Math.cos(f);
    return {x: ring.cx + x * Math.cos(TILT) - y * Math.sin(TILT), y: ring.cy + x * Math.sin(TILT) + y * Math.cos(TILT), d: Math.cos(f)};
  }
  /* Out of the frame: the rocket's middle is more than m past an edge. With m at half its length, none of it shows. */
  const outside = (p, m) => p.x < -m || p.x > view.w + m || p.y < -m || p.y > view.h + m;
  /* The smallest widening that takes the rocket well out of the frame a little before the end, worked out for this
     screen, so it leaves a phone and a wide computer window alike. gone is the moment none of it shows any more. */
  let gone = Infinity;
  function solveGrow() {
    const leaves = (g, m) => { grow = g; for (let t = ORBIT; t <= END - 0.08; t += 1 / 480) if (outside(at(t), m)) return t; return 0; };
    let lo = 0, hi = 4000;
    for (let i = 0; i < 32; i++) { const g = (lo + hi) / 2; if (leaves(g, LEN * 1.5)) hi = g; else lo = g; }
    gone = leaves(hi, LEN * 0.6) || END;
  }

  /* The canvases, sharp on any screen. */
  const back = $('.i-back', el), front = $('.i-front', el), bx = back.getContext('2d'), fx = front.getContext('2d');
  const text = $('.i-text', el), base = $('.i-base', el);
  function size() {
    const w = el.clientWidth, h = el.clientHeight, dpr = Math.min(window.devicePixelRatio || 1, 3);
    if (w === view.w && h === view.h) return false;
    view = {w: w, h: h};
    [back, front].forEach(c => { c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); });
    [bx, fx].forEach(c => c.setTransform(dpr, 0, 0, dpr, 0, 0));
    return true;
  }
  /* The ring is centred on the word as it looks: across its width, and halfway up its capital letters. */
  function measure() {
    const r = text.getBoundingClientRect(), o = el.getBoundingClientRect(), fs = parseFloat(getComputedStyle(text).fontSize) || 44;
    bx.font = '600 ' + fs + 'px Archivo';
    const cap = bx.measureText('S').actualBoundingBoxAscent || fs * 0.7;
    const a = r.width / 2 + GAP, next = {cx: r.left - o.left + r.width / 2, cy: base.getBoundingClientRect().bottom - o.top - cap / 2, a: a, b: a * FLAT};
    const moved = !ring || ['cx', 'cy', 'a'].some(k => Math.abs(ring[k] - next[k]) > 0.5);
    if (moved) ring = next;
    return moved;
  }

  /* The rocket, drawn from the same shapes as everywhere else in the app (RK in 10-core.js). */
  let rk = null, col = null;
  function shapes(id) {
    const tpl = document.createElement('template'), out = [];
    let flameTop = 28;
    tpl.innerHTML = rocketSvg(id);
    $$('svg > *', tpl.content).forEach(n => {
      const g = new Path2D(), A = k => parseFloat(n.getAttribute(k)) || 0, cls = n.getAttribute('class');
      if (n.localName === 'path') g.addPath(new Path2D(n.getAttribute('d')));
      else if (n.localName === 'circle') g.arc(A('cx'), A('cy'), A('r'), 0, 2 * Math.PI);
      else if (n.localName === 'ellipse') g.ellipse(A('cx'), A('cy'), A('rx'), A('ry'), 0, 0, 2 * Math.PI);
      else if (n.localName === 'rect') { if (g.roundRect) g.roundRect(A('x'), A('y'), A('width'), A('height'), A('rx')); else g.rect(A('x'), A('y'), A('width'), A('height')); }
      else return;
      if (cls === 'rk-flame') { const m = /M\s*([\d.]+)[\s,]+([\d.]+)/.exec(n.getAttribute('d')); if (m) flameTop = +m[2]; }
      out.push({cls: cls, g: g});
    });
    return {list: out, flameTop: flameTop};
  }
  /* ang is the way the nose points. k is the size, alpha how faded, and flick how long the flame is. */
  function drawRocket(c, p, ang, k, alpha, flick) {
    const sc = k * LEN / 40;
    c.save();
    c.globalAlpha = alpha;
    c.translate(p.x, p.y); c.rotate(ang + Math.PI / 2); c.scale(sc, sc); c.translate(-12, -20);
    rk.list.forEach(s => {
      c.fillStyle = col[s.cls] || col.hull;
      if (s.cls !== 'rk-flame') { c.fill(s.g); return; }
      c.save();
      c.translate(12, rk.flameTop); c.scale(0.92 + 0.08 * flick, flick); c.translate(-12, -rk.flameTop);
      c.globalAlpha = alpha * (0.75 + 0.25 * Math.min(1, flick));
      c.fill(s.g);
      c.restore();
    });
    c.restore();
  }
  const sizeFor = d => d > 0 ? 1 + 0.16 * d : 1 + 0.08 * d;
  const fadeFor = d => d > 0 ? 1 : 1 - 0.35 * -d;
  function heading(t) { const a = at(t - 0.003), b = at(t + 0.003); return Math.atan2(b.y - a.y, b.x - a.x); }

  /* One frame. The trail is the path itself over the last 0.3 seconds, so it is a smooth curve at any frame rate.
     Each piece of it goes on the front or the back canvas, by where the rocket was then. */
  function draw(t) {
    const resized = size(), moved = measure();
    if (resized || moved) solveGrow();
    bx.clearRect(0, 0, view.w, view.h); fx.clearRect(0, 0, view.w, view.h);
    const p = at(t);
    const from = Math.max(0, t - TRAIL), to = Math.min(t, gone), step = 1 / 250;
    let q = from < to ? at(from) : null;
    [bx, fx].forEach(c => { c.strokeStyle = col.trail; c.lineCap = 'round'; });
    for (let s = from + step; q && s <= to + 1e-9; s += step) {
      const n = at(s), life = 1 - (t - s) / TRAIL, c = q.d + n.d > 0 ? fx : bx;
      c.globalAlpha = 0.85 * life * fadeFor((q.d + n.d) / 2);
      c.lineWidth = 0.5 + 1.3 * life;
      c.beginPath(); c.moveTo(q.x, q.y); c.lineTo(n.x, n.y); c.stroke();
      q = n;
    }
    [bx, fx].forEach(c => { c.globalAlpha = 1; });
    if (t >= gone) return;
    const flick = 0.86 + 0.12 * Math.sin(t * 61) * Math.sin(t * 23 + 1) + 0.1 * (Math.random() - 0.5);
    drawRocket(p.d > 0 ? fx : bx, p, heading(t), sizeFor(p.d), fadeFor(p.d), flick);
  }
  /* Reduced motion: the rocket parked at the front of the ring, pointing along it, with a still flame. */
  function drawStill() {
    size(); measure();
    bx.clearRect(0, 0, view.w, view.h); fx.clearRect(0, 0, view.w, view.h);
    drawRocket(fx, at(0), heading(0), sizeFor(1), 1, 1);
  }

  let live = false, leaving = false, t0 = 0, raf = 0, timers = [];
  function frame(now) {
    if (!live) return;
    const t = Math.max(0, (now - t0) / 1000);
    try { draw(t); } catch (e) { finish(); return; }
    if (t < END + TRAIL) raf = requestAnimationFrame(frame);
  }
  /* Fade into Home. At the natural end taps go straight through; after a skip the layer keeps the tap. */
  function fadeOut(dur, letThrough) {
    if (leaving) return;
    leaving = true;
    el.style.setProperty('--out', dur + 's');
    if (letThrough) el.classList.add('late');
    el.classList.add('out');
    timers.push(setTimeout(finish, dur * 1000));
  }
  function finish() {
    if (!el.isConnected) return;
    live = false;
    cancelAnimationFrame(raf);
    timers.forEach(clearTimeout); timers = [];
    window.removeEventListener('keydown', onKey, true);
    window.removeEventListener('resize', onResize);
    el.remove();
  }
  /* The tap that skips must not also press a button on Home underneath. The skip happens as the finger lands, and
     the click from that same tap comes when it lifts, by which time the intro may be gone. So the next click is
     eaten, unless a new tap starts first (that is a real tap on Home), and the guard gives up after a second. */
  function eatClick() {
    const stop = () => { window.removeEventListener('click', eat, true); window.removeEventListener('pointerdown', stop, true); clearTimeout(t); };
    const eat = ev => { ev.preventDefault(); ev.stopPropagation(); stop(); };
    window.addEventListener('click', eat, true);
    window.addEventListener('pointerdown', stop, true);
    const t = setTimeout(stop, 1000);
  }
  /* A tap, click or key during the intro skips it: a quick fade into Home. */
  function skip(tap) {
    if (!live || leaving) return;
    if (tap) eatClick();
    fadeOut(SKIP, false);
  }
  function onKey(ev) { if (!leaving) { ev.preventDefault(); ev.stopPropagation(); skip(false); } }
  function onResize() { if (reduce && live) try { drawStill(); } catch (e) {} }

  /* play(false) takes the intro away at once: tests do this, and so does a new version of the page carrying on
     from the old one. */
  function play(on) {
    if (!el) return;
    if (on === false || window.stratosIntro === false) { finish(); return; }
    live = true;
    timers.push(setTimeout(finish, SAFE));                 /* the safety timer: gone by 1.8 seconds whatever happens */
    el.addEventListener('pointerdown', ev => { ev.preventDefault(); skip(true); });
    window.addEventListener('keydown', onKey, true);
    window.addEventListener('resize', onResize);
    try {
      rk = shapes(saved.rocket);
      col = {hull: cssVar('--ink'), fin: cssVar('--fin'), port: cssVar('--paper'), noz: cssVar('--ink-3'), 'rk-flame': cssVar('--flame'), trail: cssVar('--accent')};
      if (reduce) {
        drawStill();
        /* The word may still be on its way. Draw again once it is, so the ring fits the real word. */
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (live) try { drawStill(); } catch (e) {} });
        timers.push(setTimeout(() => fadeOut(0.2, true), HOLD * 1000));
      } else {
        t0 = performance.now();
        raf = requestAnimationFrame(frame);
        timers.push(setTimeout(() => fadeOut(FADE, true), END * 1000));
      }
    } catch (e) { finish(); }
  }
  return {play: play};
})();
