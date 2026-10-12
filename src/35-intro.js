/* ---------- the intro: as the app opens, the rocket flies a ring round the word Stratos, then spirals away ----------
   The path is worked out in 34-intro-path.js. This file draws it and runs the timers.
   It plays each time the page loads (start() in 90-boot.js), never on a change of tab.
   A tap anywhere, or any key, skips it. With reduced motion the rocket stays parked in front of the word.
   A safety timer takes it away at 1.8 s whatever happens. Tests turn it off with window.STRATOS_INTRO = false. */
const introEl = $('#intro'), introWord = $('#introWord'), introCv = {back: $('#introBack'), front: $('#introFront')};
let introRun = null;

/* The picked rocket as shapes a canvas can draw. RK in 10-core.js holds each rocket as SVG; the same shapes and
   colours are drawn here. top is where the flame starts, so the flicker can stretch it from there. */
function rocketShapes(id) {
  const out = [], re = /<(path|circle|rect|ellipse) class="([\w-]+)" ([^>]*?)\/>/g;
  let m;
  while ((m = re.exec(RK[id] || RK.classic))) {
    const at = {}, kind = m[1];
    m[3].replace(/([\w-]+)="([^"]*)"/g, (all, k, v) => { at[k] = v; });
    let p;
    if (kind === 'path') p = new Path2D(at.d);
    else {
      p = new Path2D();
      if (kind === 'circle') p.arc(+at.cx, +at.cy, +at.r, 0, 2 * Math.PI);
      else if (kind === 'ellipse') p.ellipse(+at.cx, +at.cy, +at.rx, +at.ry, 0, 0, 2 * Math.PI);
      else if (at.rx && p.roundRect) p.roundRect(+at.x, +at.y, +at.width, +at.height, +at.rx);
      else p.rect(+at.x, +at.y, +at.width, +at.height);
    }
    const top = kind === 'path' ? /^M\s*[\d.]+[\s,]+([\d.]+)/.exec(at.d) : null;
    out.push({cls: m[2], path: p, top: top ? +top[1] : 20});
  }
  return out;
}
/* The rocket's colours, the same as .rk in style.css. */
function rocketColours() {
  return {hull: cssVar('--ink'), port: cssVar('--paper'), noz: cssVar('--ink-3'), fin: cssVar('--fin'), 'rk-flame': cssVar('--flame')};
}

/* Size the canvases to the stage, sharp on any screen, and find the ring: centred on the word, 26 px wider than it
   on each side. On a narrow phone the word is made smaller, so the ring and the rocket fit. */
function introMeasure(run) {
  const w = introEl.clientWidth, h = introEl.clientHeight, dpr = Math.min(window.devicePixelRatio || 1, 3);
  for (const k in introCv) {
    const c = introCv[k];
    if (c.width !== Math.round(w * dpr)) { c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); }
    c.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  introWord.style.fontSize = '';
  let r = introWord.getBoundingClientRect();
  const room = w / 2 - INTRO.rocket * 0.7 - INTRO.margin;
  if (r.width / 2 > room) { introWord.style.fontSize = (44 * room * 2 / r.width).toFixed(1) + 'px'; r = introWord.getBoundingClientRect(); }
  const box = introEl.getBoundingClientRect();
  const ring = {cx: r.left - box.left + r.width / 2, cy: r.top - box.top + r.height / 2, a: r.width / 2 + INTRO.margin};
  /* Work out the widening again only if the ring has changed, such as when the typeface arrives. */
  if (!run.ring || Math.abs(run.ring.a - ring.a) > 0.5 || run.w !== w || run.h !== h) {
    run.grow = introGrow(ring, w, h);
    run.exit = introExit(ring, run.grow, w, h);
  }
  run.ring = ring; run.w = w; run.h = h;
}

function drawRocket(cx, p, angle, run, flick) {
  const k = INTRO.rocket / 40 * p.scale;
  cx.save();
  cx.globalAlpha = p.alpha;
  cx.translate(p.x, p.y); cx.rotate(angle); cx.scale(k, k); cx.translate(-12, -20);
  for (const s of run.shapes) {
    cx.fillStyle = run.col[s.cls] || run.col.hull;
    if (s.cls === 'rk-flame') {
      /* The flame flickers: a little longer or shorter, wider or thinner, brighter or dimmer, every frame. */
      cx.save();
      cx.globalAlpha = p.alpha * flick.a;
      cx.translate(12, s.top); cx.scale(flick.w, flick.l); cx.translate(-12, -s.top);
      cx.fill(s.path);
      cx.restore();
    } else cx.fill(s.path);
  }
  cx.restore();
}

/* The trail: a thin line in the Stratos blue along where the rocket was over the last 0.3 s, thinner and fainter
   the older it is. Each piece is drawn behind or in front of the word, wherever the rocket was at that moment.
   Nothing is added once the rocket has left the frame, so the trail drains away after it. */
function drawTrail(ms, run) {
  const from = Math.max(0, ms - INTRO.trail), to = Math.min(ms, run.exit);
  if (to <= from) return;
  const cv = {back: introCv.back.getContext('2d'), front: introCv.front.getContext('2d')};
  for (const k in cv) { cv[k].strokeStyle = run.blue; cv[k].lineCap = 'butt'; }
  let prev = null;
  for (let t = from; ; t = Math.min(t + 6, to)) {
    const p = introAt(t, run.ring, run.grow), h = introHeading(t, run.ring, run.grow), back = 10 * p.scale;
    const pt = {x: p.x - Math.sin(h) * back, y: p.y + Math.cos(h) * back};
    if (prev) {
      const f = Math.max(0, 1 - (ms - t) / INTRO.trail), cx = cv[p.front ? 'front' : 'back'];
      cx.globalAlpha = Math.pow(f, 1.4) * 0.85 * p.alpha;
      cx.lineWidth = (0.6 + 1.6 * f) * p.scale;
      cx.beginPath(); cx.moveTo(prev.x, prev.y); cx.lineTo(pt.x, pt.y); cx.stroke();
    }
    prev = pt;
    if (t >= to) break;
  }
  for (const k in cv) cv[k].globalAlpha = 1;
}

/* One frame at ms after the start. */
function introDraw(run, ms) {
  for (const k in introCv) introCv[k].getContext('2d').clearRect(0, 0, run.w, run.h);
  if (!run.still) drawTrail(ms, run);
  if (ms < run.exit) {
    const p = introAt(ms, run.ring, run.grow);
    const flick = run.still ? {l: 1, w: 1, a: 1} : {l: 0.8 + Math.random() * 0.35, w: 0.9 + Math.random() * 0.15, a: 0.78 + Math.random() * 0.22};
    drawRocket(introCv[p.front ? 'front' : 'back'].getContext('2d'), p, introHeading(ms, run.ring, run.grow), run, flick);
  }
  introWord.style.opacity = run.still ? 1 : Math.min(1, ms / INTRO.wordIn).toFixed(3);
}
function introFrame() {
  const run = introRun; if (!run || run.ending) return;
  const ms = performance.now() - run.t0;
  try { introDraw(run, ms); } catch (e) { endIntro(run); return; }
  if (ms < INTRO.total) run.raf = requestAnimationFrame(introFrame);
}

/* Start the intro. intro-sounds.html uses the options: o.sound picks the notes' sound, o.force plays it even where
   tests have turned it off, and o.wait lets the notes wait for the browser to allow sound, because a tap started it. */
function playIntro(o) {
  o = o || {};
  if (window.STRATOS_INTRO === false && !o.force) return;
  if (introRun) endIntro(introRun);
  const run = {t0: performance.now(), raf: 0, timers: [], still: reduce, ending: false};
  introRun = run;
  /* The safety timer comes first, so nothing below can stop it. */
  run.timers.push(setTimeout(() => endIntro(run), INTRO.safety));
  introEl.classList.remove('out'); introEl.style.removeProperty('--fade');
  introEl.hidden = false;
  try {
    const id = RK[saved.rocket] ? saved.rocket : 'classic';
    introEl.dataset.rocket = id;
    run.shapes = rocketShapes(id); run.col = rocketColours(); run.blue = cssVar('--accent');
    introMeasure(run);
    if (document.fonts && document.fonts.addEventListener) {
      run.fonts = () => { if (introRun === run) { introMeasure(run); if (run.still) introDraw(run, 0); } };
      document.fonts.addEventListener('loadingdone', run.fonts);
    }
    sound.intro(o.sound, o.wait);
    if (run.still) {
      /* Reduced motion: the word, and the rocket parked in front of it at the bottom of the ring. No movement. */
      introDraw(run, 0);
      run.timers.push(setTimeout(() => leaveIntro(run, 300), 900));
    } else {
      introWord.style.opacity = 0;
      run.raf = requestAnimationFrame(introFrame);
      run.timers.push(setTimeout(() => leaveIntro(run, INTRO.fadeOut), INTRO.total - INTRO.fadeOut));
    }
  } catch (e) { endIntro(run); }
}
/* Fade into Home over ms, then take the intro away. */
function leaveIntro(run, ms) {
  if (introRun !== run || run.ending) return;
  run.ending = true;
  introEl.style.setProperty('--fade', ms + 'ms');
  introEl.classList.add('out');
  run.timers.push(setTimeout(() => endIntro(run), ms));
}
function endIntro(run) {
  if (introRun !== run) return;
  cancelAnimationFrame(run.raf);
  run.timers.forEach(clearTimeout);
  if (run.fonts) document.fonts.removeEventListener('loadingdone', run.fonts);
  introEl.hidden = true; introEl.classList.remove('out');
  introRun = null;
}
/* A tap anywhere on the intro, or any key, skips it and fades the notes out. The key goes no further. */
function skipIntro() {
  const run = introRun; if (!run || run.ending) return;
  sound.introFade();
  cancelAnimationFrame(run.raf);
  leaveIntro(run, INTRO.fadeOut);
}
introEl.addEventListener('pointerdown', ev => {
  ev.preventDefault();
  /* The tap that skips the intro must not also press whatever is under it on Home, once the intro has gone. */
  const stop = e => { e.stopPropagation(); e.preventDefault(); };
  window.addEventListener('click', stop, true);
  setTimeout(() => window.removeEventListener('click', stop, true), 600);
  skipIntro();
});
window.addEventListener('keydown', ev => {
  if (!introRun || introRun.ending) return;
  ev.preventDefault(); ev.stopPropagation(); skipIntro();
}, true);
