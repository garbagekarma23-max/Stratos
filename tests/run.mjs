// Runs every test file in turn and says how many checks passed. Build v2.html first: python3 build.py
// The Maths Lab tests (lab-maths.mjs, lab.mjs) need no build: maths-lab.html is the page itself.
// maths-content.mjs checks the maths worked examples and templates without a browser. maths.mjs runs maths in v2,
// maths-practice.mjs runs a maths Practice flight, and maths-games.mjs runs maths challenges and races. altitude.mjs checks altitude is written out in full and fits.
// preview.mjs checks the page titles, icons, link preview tags and web app manifests, with no browser.
// fullscreen.mjs checks both pages full screen on phones with safe areas.
// edexcel.mjs runs the Edexcel International A Level Economics course: switching to it, its own progress, Coming soon and Draft.
// places.mjs runs the subject sheet's steps: the country guessed from the phone, the country list and search, the state,
// the international courses in every country, and switching courses.
// intro.mjs checks the intro that plays when v2.html opens. Every other test skips it.
// merge.mjs checks how two copies of the progress are put together, and rls.mjs the rules in supabase/schema.sql,
// both with no browser. account.mjs runs signing in and sync against a fake Supabase.
// welcome.mjs checks the welcome screen on first open, the offer to save progress after the first chapter, and Home's
// top bar (Sign in while signed out, and the store). Every other test skips the welcome screen and the offer.
// first-open.mjs runs a device's first open: the intro, where you study, the course, the welcome screen, then Home.
// Every other test skips the course steps.
// friends-db.mjs checks the friends rules in supabase/friends.sql with no browser, and friends.mjs runs real friends
// (usernames, search, codes, requests, block) on several devices against the fake Supabase.
// messages-db.mjs checks the rules and the filter in supabase/messages.sql with no browser, and messages.mjs runs
// messages between real friends (requests, sending, refused messages, report, warnings and bans) on two devices.
// report-email.mjs checks the email to the owner on each report (supabase/report-email.sql), with no browser.
// challenges-db.mjs checks the challenge rules in supabase/challenges.sql with no browser, and challenges.mjs runs
// challenges between real friends (start, play, result, decline, limits, block) on two devices.
// live-db.mjs checks supabase/live.sql with no browser (who can see a student online, and who can join or send on a
// chat's Realtime channel), and live.mjs runs online status and the typing bubble on several devices.
// week-db.mjs checks the weekly table's rules in supabase/week.sql with no browser, and week.mjs runs the weekly table
// with real friends (sending right answers, the table, the switch, offline, sign out) on several devices.
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
const runs = [['flow.mjs'], ['social.mjs'], ['edge.mjs'], ['monkey.mjs', '1500', '7'], ['monkey.mjs', '1500', '4242'], ['lab-maths.mjs'], ['lab.mjs'], ['maths-content.mjs'], ['maths.mjs'], ['maths-practice.mjs'], ['maths-games.mjs'], ['edexcel.mjs'], ['places.mjs'], ['altitude.mjs'], ['preview.mjs'], ['fullscreen.mjs'], ['intro.mjs'], ['merge.mjs'], ['rls.mjs'], ['account.mjs'], ['friends-db.mjs'], ['friends.mjs'], ['messages-db.mjs'], ['report-email.mjs'], ['messages.mjs'], ['challenges-db.mjs'], ['challenges.mjs'], ['live-db.mjs'], ['live.mjs'], ['week-db.mjs'], ['week.mjs'], ['welcome.mjs'], ['first-open.mjs']];
let ok = 0, bad = 0;
for (const r of runs) {
  const out = spawnSync('node', r, {cwd: fileURLToPath(new URL('.', import.meta.url)), encoding: 'utf8'});
  const text = (out.stdout || '') + (out.stderr || '');
  const pass = (text.match(/^ok /gm) || []).length, fail = (text.match(/^FAIL /gm) || []).length;
  const broke = out.status !== 0 || /ERRORS after|PAGEERROR|errors: \[[^\]]/.test(text);
  ok += pass; bad += fail + (broke && !fail ? 1 : 0);
  console.log((broke ? 'FAILED ' : 'passed ') + r.join(' ') + ': ' + pass + ' checks ok' + (fail ? ', ' + fail + ' failed' : ''));
  if (broke) console.log(text.split('\n').filter(l => !l.startsWith('ok ')).join('\n'));
}
console.log(bad ? 'SOME TESTS FAILED' : 'all tests passed (' + ok + ' checks)');
process.exit(bad ? 1 : 0);
