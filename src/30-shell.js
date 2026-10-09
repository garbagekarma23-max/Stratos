/* ---------- the stage: views, tabs, pages, the sheet and the sparks ---------- */
const app = $('#app'), toastEl = $('#toast'), liveEl = $('#live'), sheet = $('#sheet'), sheetTitle = $('#sheetTitle'), sheetBody = $('#sheetBody'), pagesEl = $('#pages');
const views = {home: $('#v-home'), learn: $('#v-learn'), practice: $('#v-practice'), search: $('#v-search'), you: $('#v-you')};
const run = $('#run'), feed = $('#feed'), learnFeed = $('#learnFeed');
const sparksCv = $('#sparks'), starsCv = $('#stars'), pctx = sparksCv.getContext('2d'), sctx = starsCv.getContext('2d');
const ui = {tab: 'home', cur: null, open: null, bar: null, scope: 'mix', scopeCh: null, len: 8, ftab: 'msgs'};
const ACT = {};          /* what each button does, looked up by its data-act name */
const PAGE = {};         /* how to draw each page that opens over the tabs */
let pages = [];          /* the pages open right now, bottom to top */
let P = null, L = null;  /* the Practice flight and the Learn session in progress */
let token = 0;           /* goes up whenever a flight starts or ends, so late timers know to do nothing */

function centre(el) { const a = app.getBoundingClientRect(), r = el.getBoundingClientRect(); return {x: r.left - a.left + r.width / 2, y: r.top - a.top + r.height / 2}; }
function anim(el, cls) { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }
function cssVar(name) { return getComputedStyle(app).getPropertyValue(name).trim() || '#888888'; }
let toastTimer = 0, toastAt = 0;
function toast(msg) {
  toastEl.textContent = msg; toastEl.classList.add('show');
  toastAt = feed.scrollTop;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1800 + msg.length * 25);
}
/* A toast steps aside once the next question scrolls into place. */
feed.addEventListener('scroll', () => { if (Math.abs(feed.scrollTop - toastAt) > 120) toastEl.classList.remove('show'); }, {passive: true});
function say(msg) { liveEl.textContent = msg; }
let epoch = 0;          /* goes up on a reset, so pretend replies that were on their way are dropped */
function later(ms, fn) { const e = epoch; setTimeout(() => { if (e !== epoch) return; try { fn(); } catch (err) {} }, ms); }

/* Every button carries a data-act name. One listener on the stage finds the action for it. */
app.addEventListener('click', ev => {
  const b = ev.target.closest('[data-act]');
  if (!b || b.disabled || !app.contains(b)) return;
  const fn = ACT[b.dataset.act];
  if (fn) fn(b, ev);
});

/* ---------- tabs ---------- */
function go(name) {
  if (!views[name]) return;
  ui.tab = name;
  Object.keys(views).forEach(k => views[k].classList.toggle('on', k === name));
  $$('.tab').forEach(b => { if (b.dataset.tab === name) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
  paint();
  paintChrome();
}
function paint() {
  if (ui.tab === 'home') renderHome();
  else if (ui.tab === 'learn') enterLearn();
  else if (ui.tab === 'practice') enterPractice();
  else if (ui.tab === 'search') runSearch();
  else renderYou();
}
/* The tab bar goes dark while a flight is on screen with the Sky background. */
function paintChrome() { app.dataset.chrome = (ui.tab === 'practice' && P && !pages.length && saved.bg === 'sky') ? 'sky' : 'plain'; paintWork(); }
ACT.tab = b => {
  const t = b.dataset.tab;
  if (t === ui.tab) { if (t !== 'learn' && t !== 'practice') views[t].scrollTo({top: 0, behavior: reduce ? 'auto' : 'smooth'}); return; }
  go(t);
};

/* ---------- pages ---------- */
function topPage() { return pages[pages.length - 1] || null; }
function pageIs(name, arg) { const t = topPage(); return !!t && t.name === name && (arg === undefined || t.arg === arg); }
function openPage(name, arg) {
  const t = topPage(), body = $('.p-body', pagesEl);
  if (t && body) t.scroll = body.scrollTop;
  pages.push({name: name, arg: arg, scroll: 0});
  paintPage('push');
}
function closePage() { pages.pop(); paintPage('pop'); if (!pages.length) paint(); }
function closeAllPages() { if (!pages.length) return; pages = []; paintPage('pop'); }
function paintPage(how) {
  const t = topPage(), old = $('.p-body', pagesEl), keep = old ? old.scrollTop : 0;
  pagesEl.textContent = '';
  paintChrome();
  if (!t) return;
  const d = PAGE[t.name](t.arg), el = document.createElement('div');
  el.className = 'page';
  if (how !== 'push') el.style.animation = 'none';
  el.innerHTML = '<header class="p-bar"><button class="icon-btn" type="button" data-act="back" aria-label="Back">' + IC.left + '</button>' + (d.avatar || '') + '<h2>' + esc(d.title) + '</h2></header>' +
    '<div class="p-body' + (d.cls ? ' ' + d.cls : '') + '">' + d.html + '</div>' + (d.foot || '');
  pagesEl.appendChild(el);
  const body = $('.p-body', el);
  if (d.bottom) body.scrollTop = body.scrollHeight;
  else body.scrollTop = how === 'same' ? keep : (how === 'pop' ? t.scroll || 0 : 0);
  if (how === 'push') $('.icon-btn', el).focus({preventScroll: true});
}
ACT.page = b => openPage(b.dataset.page, b.dataset.f);
ACT.back = closePage;

/* ---------- the sheet that rises from the bottom ---------- */
let sheetFrom = null;
function openSheet(title, html) {
  if (sheet.hidden) sheetFrom = document.activeElement;
  sheetTitle.textContent = title;
  sheetBody.innerHTML = html;
  sheet.hidden = false;
  toastEl.classList.remove('show');
  $('.panel', sheet).scrollTop = 0;
  $('#sheetClose').focus({preventScroll: true});
}
function closeSheet() {
  if (sheet.hidden) return;
  sheet.hidden = true;
  sheetBody.textContent = '';
  if (sheetFrom && sheetFrom.isConnected) { try { sheetFrom.focus({preventScroll: true}); } catch (e) {} }
  sheetFrom = null;
}
ACT.sheetclose = closeSheet;
sheet.addEventListener('click', ev => { if (ev.target === sheet) closeSheet(); });

/* ---------- sparks, and the stars of the Sky background ---------- */
let W = 0, H = 0, SW = 0, SH = 0, raf = 0;
const shown = {L: 0};    /* the altitude on screen, as log10(km). It eases towards the real one. */
const stars = Array.from({length: 90}, () => ({x: Math.random(), y: Math.random(), r: Math.random() * 1.1 + 0.4, d: Math.random() * 0.7 + 0.3, h: Math.floor(Math.random() * 360)}));
const sparks = [];
function resize() {
  W = app.clientWidth; H = app.clientHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  sparksCv.width = Math.round(W * dpr); sparksCv.height = Math.round(H * dpr);
  pctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  SW = run.clientWidth || W; SH = run.clientHeight || Math.max(0, H - 58);
  starsCv.width = Math.round(SW * dpr); starsCv.height = Math.round(SH * dpr);
  sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawStars(shown.L, 0);
}
/* Stars slide down as the rocket climbs, and stretch into streaks during a big jump. */
function drawStars(Lv, speed) {
  sctx.clearRect(0, 0, SW, SH);
  if (run.dataset.bg !== 'sky') return;
  const vis = clamp((Lv - 1.2) / 1.2, 0, 1);
  if (vis <= 0) return;
  const multi = Lv >= 23.64, streak = Math.min(speed * 150, 70);
  for (let i = 0; i < stars.length; i++) {
    const s = stars[i], x = s.x * SW, y = (s.y * SH + Lv * 70 * s.d) % SH, col = multi ? 'hsl(' + s.h + ',90%,82%)' : '#ffffff';
    sctx.globalAlpha = vis * (0.35 + 0.65 * s.d);
    if (streak > 1.5) {
      sctx.strokeStyle = col; sctx.lineWidth = s.r * 1.4; sctx.lineCap = 'round';
      sctx.beginPath(); sctx.moveTo(x, y); sctx.lineTo(x, y - streak * s.d); sctx.stroke();
    } else {
      sctx.fillStyle = col;
      sctx.beginPath(); sctx.arc(x, y, s.r, 0, 6.2832); sctx.fill();
    }
  }
  sctx.globalAlpha = 1;
}
function burst(x, y, n, colours) {
  if (reduce) return;
  for (let i = 0; i < n; i++) sparks.push({x: x, y: y, vx: (Math.random() - 0.5) * 6, vy: -(Math.random() * 5.5 + 1.5), g: 0.2, life: 1, dec: 0.018 + Math.random() * 0.02, r: Math.random() * 2.4 + 1.4, c: colours[i % colours.length], grow: 0});
  kick();
}
function puff(x, y) {
  if (reduce) return;
  for (let i = 0; i < 9; i++) sparks.push({x: x + (Math.random() - 0.5) * 14, y: y, vx: (Math.random() - 0.5) * 0.9, vy: -(Math.random() * 1.2 + 0.5), g: -0.01, life: 0.6, dec: 0.014, r: Math.random() * 3 + 3, c: '#a9b0c0', grow: 0.12});
  kick();
}
function sparkColours(t) {
  const sky = ui.tab === 'practice' && saved.bg === 'sky';
  return [flameAt(Math.max(1, t)), sky ? '#ffffff' : cssVar('--accent'), sky ? '#3ddc9a' : cssVar('--good')];
}
function stepSparks() {
  pctx.clearRect(0, 0, W, H);
  for (let i = sparks.length - 1; i >= 0; i--) {
    const p = sparks[i];
    p.x += p.vx; p.y += p.vy; p.vy += p.g; p.r += p.grow; p.life -= p.dec;
    if (p.life <= 0) { sparks.splice(i, 1); continue; }
    pctx.globalAlpha = Math.max(0, p.life);
    pctx.fillStyle = p.c;
    pctx.beginPath(); pctx.arc(p.x, p.y, p.r, 0, 6.2832); pctx.fill();
  }
  pctx.globalAlpha = 1;
}
function kick() { if (!raf) raf = requestAnimationFrame(frame); }
function frame() {
  raf = 0;
  if (P) {
    const target = level(P.alt), diff = target - shown.L;
    let speed = 0;
    if (reduce || Math.abs(diff) < 0.004) shown.L = target;
    else { speed = diff * 0.12; shown.L += speed; }
    paintAlt(shown.L);
    drawStars(shown.L, Math.abs(speed));
    if (shown.L !== target) kick();
  }
  stepSparks();
  if (sparks.length) kick();
}
