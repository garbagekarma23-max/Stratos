// Copies the parts of MathLive the Maths Lab needs from node_modules into lab/mathlive,
// so the page is served from this repository and does not depend on another website.
// Run it from the lab folder: npm install, then npm run copy.
import fs from 'fs';
const from = new URL('./node_modules/mathlive/', import.meta.url);
const to = new URL('./mathlive/', import.meta.url);
const version = JSON.parse(fs.readFileSync(new URL('package.json', from), 'utf8')).version;
fs.rmSync(to, {recursive: true, force: true});
fs.mkdirSync(new URL('fonts/', to), {recursive: true});
// The script and its licence.
for (const f of ['mathlive.min.js', 'LICENSE.txt']) fs.copyFileSync(new URL(f, from), new URL(f, to));
// The maths fonts. MathLive loads them itself from MathfieldElement.fontsDirectory.
for (const f of fs.readdirSync(new URL('fonts/', from))) if (f.endsWith('.woff2')) fs.copyFileSync(new URL('fonts/' + f, from), new URL('fonts/' + f, to));
fs.writeFileSync(new URL('VERSION', to), version + '\n');
console.log('copied MathLive ' + version + ' to lab/mathlive');
