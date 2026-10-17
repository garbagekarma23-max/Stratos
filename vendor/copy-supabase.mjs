// Copies the Supabase library v2.html needs for accounts from node_modules into vendor/supabase,
// so the page is served from this repository and does not depend on another website for its code.
// Run it from the vendor folder: npm install, then npm run copy.
import fs from 'fs';
const from = new URL('./node_modules/@supabase/supabase-js/', import.meta.url);
const to = new URL('./supabase/', import.meta.url);
const version = JSON.parse(fs.readFileSync(new URL('package.json', from), 'utf8')).version;
fs.rmSync(to, {recursive: true, force: true});
fs.mkdirSync(to, {recursive: true});
// The one-file build that sets window.supabase, and its licence.
fs.copyFileSync(new URL('dist/umd/supabase.js', from), new URL('supabase.js', to));
fs.copyFileSync(new URL('LICENSE', from), new URL('LICENSE', to));
fs.writeFileSync(new URL('VERSION', to), version + '\n');
console.log('copied supabase-js ' + version + ' to vendor/supabase');
