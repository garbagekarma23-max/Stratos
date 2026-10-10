// Makes the page icons and the link preview pictures in icons/, from the Stratos look: white paper, ink,
// Hanken Grotesk, the Archivo wordmark, one blue, and the app's own rocket. Run it again after changing a design here.
//   node make-icons.mjs
// Writes: icons/favicon-32.png (for browsers without SVG icons), icons/apple-touch-icon.png (180 by 180, for iPhone
// home screens and Messages), icons/preview-v2.png and icons/preview-lab.png (1200 by 630, the picture a link shows
// in Messages, Instagram and other apps). icons/favicon.svg is written by hand.
import fs from 'fs';
import { chromium } from 'playwright';
import { serve } from './serve.mjs';
const OUT = new URL('../icons/', import.meta.url);
const EXE = process.env.CHROMIUM_PATH || (fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);
const server = await serve();
const b = await chromium.launch(EXE ? {executablePath: EXE} : {});

// The classic rocket from src/10-core.js (RK.classic), in the app's colours. flame adds the orange exhaust.
const rocket = (w, flame) => '<svg width="' + w + '" height="' + (w * 40 / 24) + '" viewBox="0 0 24 40">' +
  (flame ? '<path fill="#ff7a1a" d="M8.5 28C8.5 33 10.5 36 12 39.5C13.5 36 15.5 33 15.5 28Z"/>' : '') +
  '<path fill="#ff7a1a" d="M4 20L1 28L1 30L6.2 27Z"/><path fill="#ff7a1a" d="M20 20L23 28L23 30L17.8 27Z"/>' +
  '<path fill="#0d0f14" d="M12 1C16.5 5 18 11 18 18L18 27L6 27L6 18C6 11 7.5 5 12 1Z"/><circle fill="#ffffff" cx="12" cy="13.5" r="2.7"/>' +
  '<rect fill="#6e7380" x="9" y="27" width="6" height="2" rx="1"/></svg>';
const FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&display=swap">' +
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@125,600&text=Stratos&display=swap">';
const BASE = '<style>*{box-sizing:border-box;margin:0}body{background:#ffffff;color:#0d0f14;font-family:"Hanken Grotesk",system-ui,sans-serif;overflow:hidden}' +
  '.word{font-family:"Archivo","Hanken Grotesk";font-weight:600;font-stretch:125%;letter-spacing:.01em}</style>';

async function render(file, w, h, html, wait) {
  const p = await b.newPage({viewport: {width: w, height: h}, deviceScaleFactor: 1});
  await p.goto(server.url + 'tests/serve.mjs');                 /* any page on the server, so lab/ files load */
  await p.setContent('<!doctype html><html><head><meta charset="utf-8">' + FONTS + BASE + '</head><body>' + html + '</body></html>', {waitUntil: 'networkidle'});
  await p.evaluate(() => document.fonts.ready);
  if (wait) await wait(p);
  await p.waitForTimeout(300);
  await p.screenshot({path: new URL(file, OUT).pathname, omitBackground: file === 'favicon-32.png'});
  await p.close();
}

// The favicon as a PNG, the same drawing as favicon.svg.
await render('favicon-32.png', 32, 32, '<style>body{background:transparent}</style><img src="' + server.url + 'icons/favicon.svg" width="32" height="32">');

// The home screen icon: the rocket with its flame on white paper. iPhone rounds the corners itself.
await render('apple-touch-icon.png', 180, 180, '<div style="width:180px;height:180px;display:grid;place-items:center">' + rocket(78, true) + '</div>');

// The two-tone bar from Home: points learned (pale) and points proven (blue).
const bar = '<div style="height:10px;border-radius:5px;background:#e9ebef;position:relative;overflow:hidden">' +
  '<i style="position:absolute;inset:0 auto 0 0;width:72%;background:#c3d3f1"></i><i style="position:absolute;inset:0 auto 0 0;width:44%;background:#1f58c2"></i></div>';
// The altimeter from a flight: a thin track with the rocket climbing it.
const gauge = '<div style="position:relative;width:150px;height:486px">' +
  '<i style="position:absolute;left:74px;top:0;bottom:0;width:3px;border-radius:2px;background:#c5c8d0"></i>' +
  '<i style="position:absolute;left:74px;bottom:0;height:70%;width:3px;border-radius:2px;background:#0d0f14"></i>' +
  [10, 52, 72, 90].map(t => '<i style="position:absolute;left:70px;top:' + t + '%;width:11px;height:11px;border-radius:50%;border:2px solid ' + (t > 30 ? '#0d0f14;background:#0d0f14' : '#6e7380;background:#ffffff') + '"></i>').join('') +
  '<div style="position:absolute;left:45px;top:' + Math.round(486 * 0.3 - 72) + 'px">' + rocket(60, true) + '</div></div>';

// The link preview for v2.html.
await render('preview-v2.png', 1200, 630,
  '<div style="width:1200px;height:630px;padding:72px 80px;display:flex;gap:40px">' +
    '<div style="flex:1;display:flex;flex-direction:column">' +
      '<p class="word" style="font-size:44px">Stratos</p>' +
      '<h1 style="margin-top:56px;font-size:64px;line-height:1.08;font-weight:600;letter-spacing:-.01em">Learn a point.<br>Then prove it.</h1>' +
      '<p style="margin-top:24px;font-size:28px;line-height:1.35;color:#555a66">Short cards and questions, weak points first.<br>Year 12 Economics and Year 11 Maths.</p>' +
      '<div style="margin-top:auto">' + bar + '<p style="margin-top:14px;font-size:22px;color:#555a66">Learned, 3 of 7 proven</p></div>' +
    '</div>' + gauge +
  '</div>');

// The link preview for maths-lab.html: a question and its working, ticked line by line, on the keypad's sheet.
const tick = '<svg width="34" height="34" viewBox="0 0 24 24" style="fill:none;stroke:#0e7748;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
const line = latex => '<div style="display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid #e1e3e8"><math-span style="font-size:44px">' + latex + '</math-span>' + tick + '</div>';
await render('preview-lab.png', 1200, 630,
  '<script src="' + server.url + 'lab/mathlive/mathlive.min.js"></script>' +
  '<div style="width:1200px;height:630px;padding:72px 80px;display:flex;gap:72px">' +
    '<div style="flex:1;display:flex;flex-direction:column">' +
      '<p class="word" style="font-size:44px">Stratos</p>' +
      '<h1 style="margin-top:56px;font-size:64px;line-height:1.08;font-weight:600;letter-spacing:-.01em">Maths Lab</h1>' +
      '<p style="margin-top:24px;font-size:28px;line-height:1.35;color:#555a66">Write your working one line at a time, on a keypad made for phones. Each line is checked as you go.</p>' +
    '</div>' +
    '<div style="width:440px;padding-top:8px">' +
      '<p style="font-size:24px;color:#555a66">Solve for x.</p>' +
      '<div style="padding:10px 0 18px;border-bottom:1px solid #e1e3e8"><math-span style="font-size:52px">3x+5=20</math-span></div>' +
      line('3x=15') + line('x=5') +
      '<div style="margin-top:34px;display:flex;gap:12px">' +
        '<span style="padding:14px 30px;border-radius:999px;background:#1f58c2;color:#ffffff;font-size:26px;font-weight:600">Done</span>' +
        '<span style="flex:1;padding:14px 0;border-radius:14px;background:#0d0f14;color:#ffffff;font-size:26px;font-weight:600;text-align:center">Enter</span>' +
      '</div>' +
    '</div>' +
  '</div>',
  p => p.waitForFunction(() => window.MathfieldElement && document.querySelectorAll('math-span .ML__latex, math-span .ML__base, math-span span').length > 0, null, {timeout: 8000}).catch(() => {}));

await b.close();
console.log('wrote icons/favicon-32.png, apple-touch-icon.png, preview-v2.png, preview-lab.png');
process.exit();
