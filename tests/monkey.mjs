// Taps things at random for a while and reports any script error. Usage: node t-monkey.mjs [steps] [seed]
import { open, saved } from './lib.mjs';
const steps = +(process.argv[2] || 1500), seed0 = +(process.argv[3] || 7);
const {b, ctx, p, errs} = await open({clock: true});
const log = [];
for (let done = 0; done < steps; done += 50) {
  const names = await p.evaluate(({n, seed}) => {
    let s = seed; const rnd = () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296;
    const out = [];
    for (let i = 0; i < n; i++) {
      const all = Array.from(document.querySelectorAll('[data-act]')).filter(el => {
        if (el.disabled || !el.offsetParent) return false;
        const r = el.getBoundingClientRect(); if (!r.width || !r.height) return false;
        const x = r.left + r.width / 2, y = r.top + r.height / 2;
        if (x < 0 || y < 0 || x > innerWidth || y > innerHeight) return false;
        const top = document.elementFromPoint(x, y); return !!top && (top === el || el.contains(top));
      });
      if (!all.length) { out.push('(nothing to tap)'); continue; }
      const el = all[Math.floor(rnd() * all.length)];
      out.push(el.dataset.act + (el.dataset.tab ? ':' + el.dataset.tab : '') + (el.dataset.page ? ':' + el.dataset.page : ''));
      el.click();
      if (rnd() < 0.08) { const f = document.querySelector('.view.on .feed'); if (f) f.scrollTop = rnd() < 0.5 ? f.scrollHeight : 0; }
      if (rnd() < 0.03) { const q = document.querySelector('#q'); q.value = ['tar', 'IMF', 'x', 'trade (', ''][Math.floor(rnd() * 5)]; q.dispatchEvent(new Event('input')); }
    }
    return out;
  }, {n: 50, seed: seed0 + done});
  log.push(...names);
  await ctx.clock.runFor(1000 + (done % 400 === 0 ? 30000 : 0));
  await p.waitForTimeout(20);
  if (errs.length) break;
}
const counts = {};
log.forEach(n => { const k = n.split(':')[0]; counts[k] = (counts[k] || 0) + 1; });
console.log('taps by action:', JSON.stringify(counts));
const s = await saved(p);
console.log('answers saved:', Object.keys(s.ans || {}).length, '| messages:', Object.values(s.th || {}).map(t => t.length).join('/'));
console.log('sideways scroll:', await p.evaluate(() => document.documentElement.scrollWidth > innerWidth));
console.log(errs.length ? 'ERRORS after ' + log.length + ' taps:\n' + errs.join('\n') + '\nlast taps: ' + log.slice(-12).join(', ') : 'no errors in ' + log.length + ' taps');
await b.close();
