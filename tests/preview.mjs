// The page icons and link previews for v2.html and maths-lab.html. No browser: it reads the two pages and the files.
// Each page needs a clear title and description, the icons, and the tags apps such as Messages and Instagram read
// to show a preview card (og:title, og:description, og:image and the rest). The preview picture must be a 1200 by 630
// PNG at a full web address, because apps fetch it from outside the page. The pictures are made by make-icons.mjs.
import fs from 'fs';
import { check } from './lib.mjs';
const R = [];
const ROOT = new URL('../', import.meta.url), SITE = 'https://garbagekarma23-max.github.io/Stratos/';
const read = f => fs.readFileSync(new URL(f, ROOT), 'utf8');
// Width and height of a PNG, from its header.
function pngSize(f) { const b = fs.readFileSync(new URL(f, ROOT)); return b.toString('ascii', 1, 4) === 'PNG' ? [b.readUInt32BE(16), b.readUInt32BE(20)] : null; }
const meta = (html, attr, name) => { const m = html.match(new RegExp('<meta ' + attr + '="' + name + '" content="([^"]*)">')); return m ? m[1] : null; };
const link = (html, rel, extra) => { const m = html.match(new RegExp('<link rel="' + rel + '" href="([^"]*)"' + (extra || ''))); return m ? m[1] : null; };

for (const [page, img] of [['v2.html', 'preview-v2.png'], ['maths-lab.html', 'preview-lab.png']]) {
  const h = read(page), head = h.slice(0, h.indexOf('</head>'));
  const title = (head.match(/<title>([^<]*)<\/title>/) || [])[1] || '', desc = meta(head, 'name', 'description') || '';
  check(title.startsWith('Stratos') && title.length > 'Stratos'.length + 8 && title.length <= 60, page + ': a clear title: ' + title, R);
  check(desc.length >= 60 && desc.length <= 160, page + ': a description of 60 to 160 characters (' + desc.length + ')', R);
  check(meta(head, 'property', 'og:title') === title && meta(head, 'property', 'og:description') === desc, page + ': the preview card uses the same title and description', R);
  check(meta(head, 'property', 'og:url') === SITE + page && meta(head, 'property', 'og:type') === 'website' && meta(head, 'property', 'og:site_name') === 'Stratos', page + ': the preview card has the page address and site name', R);
  check(meta(head, 'property', 'og:image') === SITE + 'icons/' + img, page + ': the preview picture is at a full web address', R);
  const size = pngSize('icons/' + img);
  check(size && size[0] === 1200 && size[1] === 630 && meta(head, 'property', 'og:image:width') === '1200' && meta(head, 'property', 'og:image:height') === '630', page + ': the preview picture is a 1200 by 630 PNG, and the tags say so', R);
  check((meta(head, 'property', 'og:image:alt') || '').length > 20 && meta(head, 'name', 'twitter:card') === 'summary_large_image', page + ': the picture has a description, and a large card is asked for', R);
  const svg = link(head, 'icon', ' type="image/svg\\+xml"'), png = link(head, 'icon', ' sizes="32x32"'), touch = link(head, 'apple-touch-icon');
  check(svg === 'icons/favicon.svg' && fs.existsSync(new URL(svg, ROOT)), page + ': the SVG favicon is linked and exists', R);
  check(png && JSON.stringify(pngSize(png)) === '[32,32]', page + ': the 32 px PNG favicon is linked and is 32 by 32', R);
  check(touch && JSON.stringify(pngSize(touch)) === '[180,180]', page + ': the home screen icon is linked and is 180 by 180', R);
  check(!/—/.test(title + desc), page + ': no em dashes in the title or description', R);
}
const svg = read('icons/favicon.svg');
check(/prefers-color-scheme: dark/.test(svg) && /viewBox="0 0 40 40"/.test(svg), 'the SVG favicon is square and has colours for dark browser bars', R);

console.log(R.join('\n'));
