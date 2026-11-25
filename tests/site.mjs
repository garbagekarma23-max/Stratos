// The live site, as GitHub builds it: python3 build.py --site DIR writes v2.html and copies every other file the site
// serves into one folder (.github/workflows/site.yml uploads that folder to GitHub Pages). This builds it into a new
// folder, then checks nothing the pages use is missing: every file and folder in SITE, every local address in the
// pages, the manifests and the scripts, and every file the three pages ask for when opened from that folder alone,
// with maths open in v2 and the Maths Lab (MathLive, and its fonts once a maths box shows). It also checks the tools' own files stay out,
// and that the typefaces come from the site's own fonts/ folder: no page or file in the site names Google's font servers,
// and no page asks another website for a font or a style sheet.
import { chromium } from 'playwright';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { serve } from './serve.mjs';
import { check } from './lib.mjs';
const R = [];
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'stratos-site-'));
const SITE = path.join(DIR, 'site');
const py = process.platform === 'win32' ? 'py' : 'python3';
const b = spawnSync(py, ['build.py', '--site', SITE], {cwd: ROOT, encoding: 'utf8'});
check(b.status === 0, 'build.py --site writes the site: ' + ((b.stdout || '') + (b.stderr || '')).trim(), R);
const has = f => fs.existsSync(path.join(SITE, f));
const read = f => fs.readFileSync(path.join(SITE, f), 'utf8');

// The folder has the pages, and v2.html is the same page build.py writes on its own.
for (const f of ['index.html', 'v2.html', 'maths-lab.html', 'manifest-v2.webmanifest', 'manifest-lab.webmanifest', 'icons/favicon.svg',
  'icons/preview-v2.png', 'fonts/stratos.css', 'fonts/first.css', 'fonts/archivo-stratos.woff2', 'fonts/OFL-HankenGrotesk.txt', 'lab/mathlive/mathlive.min.js', 'lab/mathlive/fonts/KaTeX_Main-Regular.woff2', 'vendor/supabase/supabase.js'])
  check(has(f), 'the site has ' + f, R);
// PYTHONIOENCODING: on Windows, Python would otherwise print in the old Windows character set and stop at a minus sign.
const built = spawnSync(py, ['-c', 'import build; print(build.standalone(), end="")'], {cwd: ROOT, encoding: 'utf8', maxBuffer: 64 << 20, env: {...process.env, PYTHONIOENCODING: 'utf8'}});
check(built.status === 0 && has('v2.html') && read('v2.html') === built.stdout, 'the site\'s v2.html is the page build.py writes', R);
// The tools' files stay out: the npm files, the copy scripts, MathLive's build for Node, and the repository's own files.
const all = [];
(function walk(d) { for (const e of fs.readdirSync(d, {withFileTypes: true})) { const f = path.join(d, e.name); if (e.isDirectory()) walk(f); else all.push(path.relative(SITE, f).split(path.sep).join('/')); } })(SITE);
const tools = all.filter(f => /(^|\/)(node_modules|package(-lock)?\.json|copy-[^/]*\.mjs|mathlive-ssr\.min\.mjs)$|^(src|content|tests|supabase|\.claude|\.github)\/|\.(py|md)$/.test(f));
check(tools.length === 0, 'none of the tools\' files are in the site' + (tools.length ? ': ' + tools.join(', ') : ''), R);

// Every local address the pages, the manifests and the page scripts name is in the site.
const local = new Set();
const add = (from, ref) => { if (!/^(https?:|data:|mailto:|#|\/\/)/.test(ref)) local.add(path.posix.normalize(path.posix.join(path.posix.dirname(from), ref.split(/[?#]/)[0]))); };
for (const page of ['index.html', 'v2.html', 'maths-lab.html']) {
  const h = read(page);
  // A tag written by the page's script with its address put in at runtime (an image's src, from its figure) is not a
  // fixed address: the pictures it can name are checked below, from their records.
  for (const m of h.matchAll(/<(?:link|script|img)\b[^>]*?\b(?:href|src)="([^"]+)"/g)) if (!/' \+ /.test(m[1])) add(page, m[1]);
  // Scripts loaded later by the page itself: MathLive when maths opens, Supabase for a student who signs in.
  for (const m of h.matchAll(/['"]((?:lab|vendor|icons)\/[^'"\s]+\.(?:js|css|png|svg|woff2))['"]/g)) add(page, m[1]);
  // Pictures the page shows, each named in the records build.py put into it (PICS) and in the points that show it.
  const pics = /\/\*PICS\*\/(.*?)\/\*PICS-END\*\//s.exec(h);
  if (pics) { const r = JSON.parse(pics[1].replace(/<\\\//g, '</')); for (const src of [...Object.keys(r.images), ...Object.keys(r.diagrams)]) add(page, src); }
  for (const m of h.matchAll(/"src": ?"(pictures\/(?:images|diagrams)\/[^"]+)"/g)) add(page, m[1]);
}
for (const f of ['manifest-v2.webmanifest', 'manifest-lab.webmanifest']) {
  const m = JSON.parse(read(f));
  add(f, m.start_url); for (const i of m.icons) add(f, i.src);
}
// Every file a local style sheet names with url(), such as each font file in fonts/stratos.css. A browser fetches a
// font only when the page has one of its letters, so opening the pages below would not find a missing one.
for (const f of [...local].filter(f => f.endsWith('.css') && has(f)))
  for (const m of read(f).matchAll(/url\(['"]?([^'")]+)['"]?\)/g)) add(f, m[1]);
const fontFiles = [...local].filter(f => f.startsWith('fonts/') && f.endsWith('.woff2'));
check(fontFiles.length >= 9, 'the style sheets in fonts/ name ' + fontFiles.length + ' font files, each checked below', R);
const missing = [...local].filter(f => !has(f));
// No page and no file in the site names Google's font servers, the pages in the repository included.
const google = /googleapis|gstatic/i;
const named = all.filter(f => /\.(html|css|js|mjs|json|webmanifest|svg|txt)$/.test(f) && google.test(read(f)));
for (const f of ['index.html', 'v2.html', 'maths-lab.html', 'src/head.html']) if (fs.existsSync(path.join(ROOT, f)) && google.test(fs.readFileSync(path.join(ROOT, f), 'utf8'))) named.push('(repository) ' + f);
check(named.length === 0, "no page or file in the site names Google's font servers (googleapis, gstatic)" + (named.length ? ': ' + named.join(', ') : ''), R);
check(local.size >= 15 && missing.length === 0, 'every local address in the pages and manifests is in the site (' + local.size + ')' + (missing.length ? ', missing: ' + missing.join(', ') : ''), R);

// Open each page from the site folder alone and note anything it asks the server for that is not there.
const server = await serve(SITE + path.sep);
const EXE = process.env.CHROMIUM_PATH || (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
const browser = await chromium.launch(EXE ? {executablePath: EXE} : {});
async function visit(page, seed, ready) {
  const ctx = await browser.newContext({viewport: {width: 390, height: 844}, locale: 'en-AU', timezoneId: 'Australia/Sydney'});
  // Nothing outside the site folder: no typefaces from Google and no Supabase.
  await ctx.route(u => !u.href.startsWith(server.url), r => r.abort());
  if (seed) await ctx.addInitScript(s => { localStorage.setItem('stratos2.v1', JSON.stringify(s)); window.stratosIntro = false; window.stratosSetup = false; window.stratosWelcome = false; window.stratosStart = false; }, seed);
  const p = await ctx.newPage(), bad = [], asked = [], errs = [], outside = [];
  // A font or style sheet asked of another website (the route above stops it, so it is noted here).
  p.on('request', r => { if (!r.url().startsWith(server.url) && ['font', 'stylesheet'].includes(r.resourceType())) outside.push(r.url()); });
  p.on('response', r => { if (r.url().startsWith(server.url)) { asked.push(r.url()); if (r.status() >= 400) bad.push(r.status() + ' ' + r.url().slice(server.url.length)); } });
  p.on('pageerror', e => errs.push(e.message));
  const res = await p.goto(server.url + page, {waitUntil: 'load'});
  // Once MathLive is in, a maths box on the page makes it load its fonts, from lab/mathlive/fonts next to its script.
  if (ready) await p.waitForFunction(() => !!window.MathfieldElement, null, {timeout: 15000})
    .then(() => p.evaluate(() => { const m = document.createElement('math-field'); m.value = 'x^2'; document.body.append(m); }))
    .then(() => p.waitForFunction(ready, null, {timeout: 15000}))
    .catch(e => errs.push('never ready: ' + e.message.split('\n')[0]));
  await p.waitForTimeout(500);
  // The typefaces the page drew with, each with its file from the site's fonts/ folder.
  await p.evaluate(() => document.fonts.ready);
  const faces = await p.evaluate(() => [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family.replace(/["']/g, '')));
  await ctx.close();
  return {status: res.status(), bad, asked, errs, outside, faces};
}
const fontsIn = () => [...document.fonts].some(f => /KaTeX/.test(f.family) && f.status === 'loaded');
// Each page's typefaces arrived from fonts/ and nothing was asked of another website for a font or a style sheet.
function ownFonts(name, r, families) {
  const missing = families.filter(f => !r.faces.includes(f));
  const files = r.asked.filter(u => u.startsWith(server.url + 'fonts/') && u.endsWith('.woff2')).length;
  check(!r.outside.length && !missing.length && files > 0, name + ' draws ' + families.join(', ') + " from the site's fonts/ folder (" + files + ' files) and asks no other website for a font' +
    (r.outside.length ? ', but asked: ' + r.outside.join(', ') : '') + (missing.length ? ', but not loaded: ' + missing.join(', ') : ''), R);
}
const first = await visit('index.html');
check(first.status === 200 && !first.bad.length && !first.errs.length, 'index.html opens from the site with nothing missing' + (first.bad.length ? ': ' + first.bad.join(', ') : '') + (first.errs.length ? ': ' + first.errs.join('; ') : ''), R);
ownFonts('index.html', first, ['Figtree', 'Unbounded', 'B612 Mono']);
const v2 = await visit('v2.html', {subject: 'maths'}, fontsIn);
check(v2.status === 200 && !v2.bad.length && !v2.errs.length, 'v2.html opens from the site on maths, with MathLive and its fonts, and nothing missing' + (v2.bad.length ? ': ' + v2.bad.join(', ') : '') + (v2.errs.length ? ': ' + v2.errs.join('; ') : ''), R);
check(v2.asked.some(u => u.endsWith('lab/mathlive/mathlive.min.js')) && v2.asked.some(u => /KaTeX_.*\.woff2$/.test(u)), 'v2.html loaded MathLive and a maths font from the site', R);
ownFonts('v2.html', v2, ['Hanken Grotesk', 'Archivo']);
const lab = await visit('maths-lab.html', null, fontsIn);
check(lab.status === 200 && !lab.bad.length && !lab.errs.length, 'maths-lab.html opens from the site with nothing missing' + (lab.bad.length ? ': ' + lab.bad.join(', ') : '') + (lab.errs.length ? ': ' + lab.errs.join('; ') : ''), R);
check(lab.asked.some(u => u.endsWith('lab/app.js')) && lab.asked.some(u => /KaTeX_.*\.woff2$/.test(u)), 'maths-lab.html loaded its scripts and a maths font from the site', R);
ownFonts('maths-lab.html', lab, ['Hanken Grotesk', 'Archivo']);
await browser.close();
server.close();
fs.rmSync(DIR, {recursive: true, force: true});
console.log(R.join('\n'));
