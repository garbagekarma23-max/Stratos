/* ---------- keyboard: A to D answer, Enter and the arrows move between slides ---------- */
document.addEventListener('keydown', ev => {
  if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
  if (ev.key === 'Escape') { if (!sheet.hidden) closeSheet(); else if (pages.length) closePage(); return; }
  if (!sheet.hidden || pages.length) return;
  /* While a maths question is being worked, typing goes to the line (see lab/sheet.js), never to the slides. */
  if (app.dataset.work !== undefined) return;
  const tag = ev.target && ev.target.tagName ? ev.target.tagName.toLowerCase() : '';
  if (tag === 'input' || tag === 'textarea') return;
  const f = ui.tab === 'learn' ? learnFeed : (ui.tab === 'practice' && P && launch.hidden ? feed : null);
  if (!f) return;
  const k = ev.key.length === 1 ? ev.key.toLowerCase() : ev.key, view = viewing(f), c = f === feed ? current() : learnCurrent();
  if (c && view === c.sec && k.length === 1) {
    let n = 'abcd'.indexOf(k); if (n < 0) n = '1234'.indexOf(k);
    if (n >= 0) { ev.preventDefault(); if (f === feed) answer(c.sec, n); else learnAnswer(c.sec, n); return; }
    if (k === 'h') { if (f === feed) clue(); else learnClue(); return; }
    if (f === feed && k === 's') { skip(); return; }
    if (f === feed && k === 'r') { reveal(); return; }
  }
  if (k === 'ArrowDown' || ((k === 'Enter' || k === ' ') && tag !== 'button')) {
    if (view && view.nextElementSibling) { ev.preventDefault(); scrollToEl(f, view.nextElementSibling); }
  } else if (k === 'ArrowUp') {
    if (view && view.previousElementSibling) { ev.preventDefault(); scrollToEl(f, view.previousElementSibling); }
  }
});
window.addEventListener('resize', () => {
  const a = P ? viewing(feed) : null, b = L ? viewing(learnFeed) : null;
  resize();
  fitAlt();
  if (a) feed.scrollTop = a.offsetTop;
  if (b) learnFeed.scrollTop = b.offsetTop;
  paintWork();
});

/* ---------- appearance ----------
   System follows the device, or the page this is shown inside if that page has set a theme. */
const rootEl = document.documentElement, hostTheme = rootEl.getAttribute('data-theme');
function applyTheme() {
  if (saved.theme === 'light' || saved.theme === 'dark') rootEl.setAttribute('data-theme', saved.theme);
  else if (hostTheme) rootEl.setAttribute('data-theme', hostTheme);
  else rootEl.removeAttribute('data-theme');
  /* The phone's status bar takes the theme-color. With Light or Dark picked here, both tags take that colour,
     so the bar matches the app whatever the phone is set to. With System, each tag keeps its own. */
  const t = rootEl.getAttribute('data-theme');
  $$('meta[name="theme-color"]').forEach(m => { m.content = t === 'dark' || (!t && /dark/.test(m.media)) ? '#15161a' : '#ffffff'; });
}

/* ---------- start ---------- */
let started = false;
function start(data) {
  if (started) return;
  started = true;
  loadSaved();
  applyTheme(); applyLook(); applyBg();
  paintSearchFor();
  if (isMaths()) loadMaths();
  resize();
  const t = data && data.v === 1 && (data.tab === 'search' || data.tab === 'you') ? data.tab : 'home';
  go(t);
  /* On a device's first open, the course steps wait under the intro, and the welcome screen comes after them.
     Without the steps (a course saved already, or tests), the welcome screen waits there itself, if it is due. */
  if (!showSetup()) showWelcome();
  /* The intro plays when the app is opened, but not when a new version of the page carries on from the old one. */
  intro.play(!(data && data.v === 1 && data.tab));
  acctBoot();
}
/* When a new version of this page is published, the open tab carries over. */
const hot = window.claude && window.claude.hot;
try { if (hot && typeof hot.snapshot === 'function') hot.snapshot(() => ({v: 1, tab: ui.tab})); } catch (e) {}
if (hot && typeof hot.ready === 'function') {
  try { hot.ready(start); } catch (e) { start({}); }
  setTimeout(() => start({}), 1500);
} else {
  start((hot && hot.data) || {});
}
