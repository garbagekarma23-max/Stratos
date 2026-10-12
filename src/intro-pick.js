/* ---------- intro-sounds.html only: three buttons that replay the intro with each sound ----------
   build.py adds this file to a copy of v2 called intro-sounds.html, so the intro and its sound are exactly what v2
   plays. v2.html itself never has this. */
(() => {
  const SOUNDS = [['glass', 'Glass', 'Clear soft bells with a shimmer.'], ['haze', 'Haze', 'A warm, blurred pad with a slow wobble, over a low E.'], ['halo', 'Halo', 'Soft bells floating over a warm pad and a low E.']];
  const box = document.createElement('div');
  box.id = 'pick';
  box.innerHTML = '<p class="h2">Pick the intro sound</p>' +
    '<p class="fine">Each button plays the intro with that sound. The notes and timing are the same in all three. The app plays ' +
    SOUNDS.find(s => s[0] === INTRO_SOUND)[1] + ' for now.</p>' +
    '<div class="pick-row">' + SOUNDS.map((s, i) => '<button class="ghost" type="button" data-k="' + s[0] + '"><b>' + (i + 1) + '. ' + s[1] + '</b><span>' + s[2] + '</span></button>').join('') + '</div>' +
    '<p class="fine" id="pickOff" hidden>Sound is switched off in You. Switch it on to hear these.</p>';
  const css = document.createElement('style');
  css.textContent = '#pick{position:fixed;left:0;right:0;bottom:0;max-width:720px;margin:0 auto;z-index:30;display:grid;gap:8px;padding:14px 16px calc(14px + env(safe-area-inset-bottom,0px));background:var(--paper);border-top:1px solid var(--line)}' +
    '#pick .pick-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}' +
    '#pick button{display:grid;align-content:start;justify-content:stretch;align-items:start;gap:2px;justify-items:start;min-height:0;padding:10px 12px;border-radius:14px;text-align:left;white-space:normal}' +
    '#pick button span{font-size:12px;font-weight:400;line-height:1.3;color:var(--ink-2)}' +
    '#pick button[aria-pressed="true"]{border-color:var(--accent)}';
  document.head.appendChild(css);
  document.body.appendChild(box);
  box.addEventListener('click', ev => {
    const b = ev.target.closest('button[data-k]'); if (!b) return;
    $('#pickOff').hidden = saved.sound !== false;
    box.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
    /* The tap is what lets the browser play sound, so the notes wait for it to say yes. */
    playIntro({sound: b.dataset.k, force: true, wait: true});
  });
})();
