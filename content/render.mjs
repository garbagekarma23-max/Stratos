// Draws diagrams as the app draws them, for the picture checker (content/pipeline.py cc-picture-check export) and for
// looking at one by hand: each SVG put into the page with the app's colours, 296 px wide as on a 360 px phone, in light
// and dark, saved as PNG. It needs Playwright and its browser (cd tests && npm install).
//   node content/render.mjs OUT_FOLDER pictures/diagrams/a.svg ...   prints {"pictures/diagrams/a.svg": ["OUT/a-light.png", ...]}
// A .json file instead of a diagram holds one figure, a chart or a graph, and is drawn the same way, with its maths drawn by
// MathLive. An image is drawn with
// its credit, from pictures/licences.json.
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { serve } from '../tests/serve.mjs';
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const [out, ...srcs] = process.argv.slice(2);
let chromium;
try { ({ chromium } = createRequire(path.join(ROOT, 'tests', 'package.json'))('playwright')); }
catch { process.stdout.write('{}\n'); process.exit(0); }
fs.mkdirSync(out, {recursive: true});
const css = fs.readFileSync(path.join(ROOT, 'src', 'style.css'), 'utf8');
const page = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>${css}</style><style>body{display:block!important;width:auto!important;margin:0;padding:12px 32px;background:var(--paper);color:var(--ink);font-family:var(--f)}#w{width:296px}</style>
<script>const esc = s => String(s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[c]);</script>
<script src="lab/maths.js"></script><script src="src/05-maths-text.js"></script><script src="src/06-figure.js"></script></head><body><div id="w"></div></body></html>`;
const name = '_render-' + process.pid + '.html';
const exe = process.env.CHROMIUM_PATH || (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
const srv = await serve(), b = await chromium.launch(exe ? {executablePath: exe} : {}), done = {};
try {
  fs.writeFileSync(path.join(ROOT, name), page);
  for (const src of srcs) {
    done[src] = [];
    for (const scheme of ['light', 'dark']) {
      const p = await b.newPage({viewport: {width: 360, height: 800}, colorScheme: scheme, deviceScaleFactor: 2});
      await p.goto(srv.url + name);
      if (src.endsWith('.json')) {
        // A graph with no description of its own is an option's graph, drawn at an option's size. Maths in a label is
        // drawn by MathLive, as in the app.
        const fig = JSON.parse(fs.readFileSync(path.resolve(ROOT, src), 'utf8'));
        await p.evaluate(f => {
          const w = document.getElementById('w'), opt = f.kind === 'graph' && f.alt === undefined;
          if (opt) w.style.width = '140px';
          w.innerHTML = FIG.html(f, opt ? 'opt' : 'card', {tx});
        }, fig);
        await p.waitForFunction(() => [...document.querySelectorAll('#w math-span')].every(m => m.shadowRoot && m.shadowRoot.childElementCount), null, {timeout: 8000}).catch(() => {});
      } else if (src.startsWith('pictures/images/')) {
        const recs = JSON.parse(fs.readFileSync(path.join(ROOT, 'pictures', 'licences.json'), 'utf8'));
        await p.evaluate(([s, r]) => { FIG.use(r); document.getElementById('w').innerHTML = FIG.html({kind: 'image', src: s, alt: 'An image to check.'}, 'card'); }, [src, recs]);
        await p.waitForFunction(() => { const i = document.querySelector('#w img'); return i && i.complete; }, null, {timeout: 5000}).catch(() => {});
      } else {
        const [w, h] = await p.evaluate(async s => { const t = await (await fetch(s)).text(); const m = /viewBox="\s*[\d.-]+[\s,]+[\d.-]+[\s,]+([\d.]+)[\s,]+([\d.]+)/.exec(t); return m ? [+m[1], +m[2]] : [4, 3]; }, src);
        await p.evaluate(([s, w, h]) => { FIG.use({images: {}, diagrams: {[s]: {title: '', made: '', size: [w, h]}}}); document.getElementById('w').innerHTML = FIG.html({kind: 'diagram', src: s, alt: 'A diagram to check.'}, 'card'); }, [src, w, h]);
        await p.waitForSelector('#w svg', {timeout: 5000}).catch(() => {});
      }
      const file = path.join(out, path.basename(src).replace(/\.(svg|json|jpg|png|webp)$/, '') + '-' + scheme + '.png');
      // 8 px round the figure, as the card's margin in the app: a word just past its edge (the origin's O) shows there too.
      const r = await p.locator('#w').boundingBox();
      await p.screenshot({path: file, clip: {x: r.x - 8, y: r.y - 8, width: r.width + 16, height: r.height + 16}});
      done[src].push(file);
      await p.close();
    }
  }
} finally {
  await b.close(); srv.close(); fs.rmSync(path.join(ROOT, name), {force: true});
}
process.stdout.write(JSON.stringify(done) + '\n');
