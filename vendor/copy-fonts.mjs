// Copies the typefaces the pages use from node_modules into fonts/, so no page asks Google (or any other website)
// for its lettering. It also writes the two style sheets that name them (fonts/stratos.css and fonts/first.css).
// Run it from the vendor folder: npm install, then npm run copy. fonts/README.md says more.
//
// The files come from Fontsource (fontsource.org), which packages the Google Fonts files on npm.
// Archivo is only the logo, the word Stratos, so it is cut down to those six letters at the one width and weight the
// logo uses. That step needs Python with fontTools and brotli: py -m pip install fonttools brotli
import fs from 'fs';
import os from 'os';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
const MODULES = fileURLToPath(new URL('./node_modules/', import.meta.url));
const TO = fileURLToPath(new URL('../fonts/', import.meta.url));
// Latin, and Latin Extended for letters with accents (as Google's own style sheets give). A browser fetches the
// Latin Extended file only when a page has one of its letters, because of the unicode-range in each rule.
const SUBSETS = ['latin-ext', 'latin'];

// Each typeface: its package, the plain name the pages' CSS uses, which of the package's style sheets has the
// files we want, which weights, the licence file it gets in fonts/, and the style sheet it goes in.
const FACES = [
  {pkg: '@fontsource-variable/hanken-grotesk', family: 'Hanken Grotesk', css: 'wght.css', weight: '400 700', licence: 'OFL-HankenGrotesk.txt', sheet: 'stratos.css'},
  {pkg: '@fontsource-variable/figtree', family: 'Figtree', css: 'wght.css', weight: '400 700', licence: 'OFL-Figtree.txt', sheet: 'first.css'},
  {pkg: '@fontsource-variable/unbounded', family: 'Unbounded', css: 'wght.css', weight: '600 800', licence: 'OFL-Unbounded.txt', sheet: 'first.css'},
  {pkg: '@fontsource/b612-mono', family: 'B612 Mono', css: 'latin-400.css', licence: 'OFL-B612Mono.txt', sheet: 'first.css'},
  {pkg: '@fontsource/b612-mono', family: 'B612 Mono', css: 'latin-700.css', licence: 'OFL-B612Mono.txt', sheet: 'first.css'},
];
const ARCHIVO = '@fontsource-variable/archivo';

const versionOf = pkg => JSON.parse(fs.readFileSync(path.join(MODULES, pkg, 'package.json'), 'utf8')).version;

// Start clean: take out the font files, licences and style sheets this script made last time. README.md stays.
fs.mkdirSync(TO, {recursive: true});
for (const f of fs.readdirSync(TO)) if (/\.(woff2|css)$|^OFL-.*\.txt$|^VERSION$/.test(f)) fs.rmSync(path.join(TO, f));

const head = (what) => '/* ' + what + '\n   Written by vendor/copy-fonts.mjs from the Fontsource packages on npm. Do not edit it by hand: change the script\n' +
  '   and run it again (fonts/README.md). Each rule names one file in this folder; unicode-range tells the browser\n' +
  '   which letters are in it, so it fetches only the files a page needs. font-display: swap shows the text in a\n' +
  '   system font while the file arrives. */\n';
const sheets = {
  'stratos.css': head('The typefaces v2.html and the Maths Lab use: Hanken Grotesk for every word, and Archivo for the logo.'),
  'first.css': head('The typefaces index.html, the first prototype, uses: Figtree, Unbounded and B612 Mono.'),
};
const versions = [];

for (const f of FACES) {
  const dir = path.join(MODULES, f.pkg);
  const css = fs.readFileSync(path.join(dir, f.css), 'utf8');
  // Each @font-face rule in the package's style sheet, keeping only upright (not italic) faces in our subsets.
  for (const rule of css.match(/@font-face\s*{[^}]*}/g)) {
    const file = /url\(\.\/files\/([^)]+\.woff2)\)/.exec(rule)[1];
    const range = (/unicode-range:\s*([^;]+);/.exec(rule) || [])[1];
    const weight = f.weight || /font-weight:\s*([^;]+);/.exec(rule)[1];
    if (/italic/.test(file) || !SUBSETS.some(s => file.includes('-' + s + '-'))) continue;
    fs.copyFileSync(path.join(dir, 'files', file), path.join(TO, file));
    sheets[f.sheet] += '\n@font-face {\n  font-family: \'' + f.family + '\';\n  font-style: normal;\n  font-weight: ' + weight + ';\n' +
      '  font-display: swap;\n  src: url(' + file + ') format(\'woff2\');\n' + (range ? '  unicode-range: ' + range + ';\n' : '') + '}\n';
  }
  fs.copyFileSync(path.join(dir, 'LICENSE'), path.join(TO, f.licence));
  const line = f.pkg + ' ' + versionOf(f.pkg);
  if (!versions.includes(line)) versions.push(line);
}

// Archivo, for the logo only: the variable font is set to its widest width (125) and semibold (600), then cut down to
// the letters of Stratos. That makes a file of a few KB in place of 90 KB, like Google's own text=Stratos did.
const LOGO = 'archivo-stratos.woff2';
const py = process.platform === 'win32' ? 'py' : 'python3';
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'stratos-fonts-'));
const fixed = path.join(tmp, 'archivo-125-600.woff2');
execFileSync(py, ['-m', 'fontTools.varLib.instancer', path.join(MODULES, ARCHIVO, 'files', 'archivo-latin-wdth-normal.woff2'),
  'wdth=125', 'wght=600', '-o', fixed], {stdio: 'inherit'});
execFileSync(py, ['-m', 'fontTools.subset', fixed, '--text=Stratos', '--layout-features=*', '--name-IDs=*',
  '--flavor=woff2', '--output-file=' + path.join(TO, LOGO)], {stdio: 'inherit'});
fs.rmSync(tmp, {recursive: true, force: true});
fs.copyFileSync(path.join(MODULES, ARCHIVO, 'LICENSE'), path.join(TO, 'OFL-Archivo.txt'));
versions.push(ARCHIVO + ' ' + versionOf(ARCHIVO));
sheets['stratos.css'] += '\n/* The logo: only S, t, r, a, o and s, at the widest width and semibold. */\n@font-face {\n  font-family: \'Archivo\';\n' +
  '  font-style: normal;\n  font-weight: 600;\n  font-stretch: 125%;\n  font-display: swap;\n  src: url(' + LOGO + ') format(\'woff2\');\n' +
  '  unicode-range: U+0053,U+0061,U+006F,U+0072-0074;\n}\n';

for (const [name, text] of Object.entries(sheets)) fs.writeFileSync(path.join(TO, name), text);
fs.writeFileSync(path.join(TO, 'VERSION'), versions.join('\n') + '\n');
console.log('copied ' + versions.join(', ') + ' to fonts/');
