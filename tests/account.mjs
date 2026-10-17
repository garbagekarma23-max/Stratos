// Runs accounts and sync against a fake Supabase (fake-supabase.mjs), never the real one. The fake's database is
// PGlite with supabase/schema.sql loaded, so its rules are the real ones. Each open() is a separate device.
// node account.mjs shots also saves the sheets at 390 by 844 in light and dark.
import { open, shot, tab, saved, pick, check } from './lib.mjs';
import { fakeSupabase } from './fake-supabase.mjs';
import fs from 'fs';

const R = [], SHOTS = process.argv[2] === 'shots';
const f = await fakeSupabase();
const all = [];
const device = async (o = {}) => { const d = await open(Object.assign({supabase: f}, o)); all.push(d); return d; };
const wait = ms => new Promise(r => setTimeout(r, ms));
const row = async email => {
  const r = await f.admin('select p.data, p.rev from public.progress p join auth.users u on u.id = p.user_id where u.email = $1', [email]);
  return r.rows[0] || null;
};
const profile = async email => (await f.admin('select call_sign from public.profiles p join auth.users u on u.id = p.id where u.email = $1', [email])).rows[0] || null;
const until = async (fn, ms = 6000) => { const end = Date.now() + ms; while (Date.now() < end) { if (await fn()) return true; await wait(100); } return false; };
const ans = (id, ok, t) => ({[id]: {ok: ok, n: 1, t: t}});
const T = Date.now() - 36e5;

/* Sign in from You with the code the fake "emailed". */
async function signIn(p, email, wrongFirst) {
  await tab(p, 'you');
  await p.click('[data-act="signin"]'); await p.waitForTimeout(100);
  await p.fill('#emailIn', email);
  await p.click('[data-act="sendcode"]');
  await p.waitForSelector('#codeIn');
  if (wrongFirst) {
    await p.fill('#codeIn', '000000'.replace(/./g, (c, i) => String((Number(f.codes[email][i]) + 1) % 10)));
    await p.click('[data-act="verifycode"]');
    await p.waitForSelector('#acctErr:not([hidden])');
  }
  await p.fill('#codeIn', f.codes[email]);
  await p.click('[data-act="verifycode"]');
}
async function answerOne(p) {
  await tab(p, 'home');
  await p.click('.hero .primary'); await p.waitForTimeout(150);
  await p.locator('#learnFeed .card .next').last().click(); await p.waitForTimeout(60);
  const k = await pick(p, '#learnFeed', true);
  return k.id;
}

// ---------- accounts switched off: no project filled in ----------
{
  const d = await open({accounts: false});
  all.push(d);
  const asked = [];
  d.p.on('request', q => { if (/supabase/.test(q.url())) asked.push(q.url()); });
  await tab(d.p, 'you');
  check(await d.p.locator('[data-act="signin"]').count() === 0, 'with no project filled in, You has no account row', R);
  check((await d.p.locator('.you .fine').last().textContent()).endsWith('Nothing you do here is sent anywhere.'), 'and says nothing is sent anywhere', R);
  check(asked.length === 0, 'and nothing is asked of Supabase or its library', R);
}

// ---------- the build as committed: the real project filled in, never reached by the tests ----------
{
  const d = await open();
  all.push(d);
  const asked = [];
  d.p.on('request', q => { if (/supabase/.test(q.url())) asked.push(q.url()); });
  const supa = /const SUPA = window\.stratosSupabase \|\| \{url: '([^']*)', key: '([^']*)'\}/.exec(fs.readFileSync(new URL('../v2.html', import.meta.url), 'utf8'));
  check(supa && /^https:\/\/[a-z]+\.supabase\.co$/.test(supa[1]) && supa[2].startsWith('sb_publishable_'), 'the build has the project address and a publishable key, so accounts are on', R);
  await tab(d.p, 'you');
  check(await d.p.locator('[data-act="signin"]').count() === 1, 'and You offers Save progress to an account', R);
  await tab(d.p, 'home');
  check(asked.length === 0, 'signed out, the build asks nothing of Supabase and does not load its library', R);
}

// ---------- device A: used without an account, then signs in ----------
const A = await device({seed: {ans: Object.assign(ans('c1p1a', true, T), ans('c1p2a', false, T + 1000)), name: ''}});
const askedA = [];
A.p.on('request', q => { if (/supabase/.test(q.url())) askedA.push(q.url()); });
await answerOne(A.p);
await tab(A.p, 'you');
check(await A.p.locator('[data-act="signin"]').count() === 1, 'You offers Save progress to an account', R);
check((await A.p.locator('[data-act="signin"] .val').textContent()) === 'Optional', 'and says it is optional', R);
check(askedA.length === 0 && f.log.length === 0, 'signed out, the app asks nothing of Supabase and does not load its library', R);
check((await A.p.locator('.you .fine').last().textContent()).endsWith('sent anywhere unless you sign in.'), 'the fine print says nothing is sent unless you sign in', R);

await A.p.click('[data-act="signin"]'); await A.p.waitForTimeout(100);
if (SHOTS) await shot(A.p, 'account-email-light');
await A.p.fill('#emailIn', 'not an email');
await A.p.click('[data-act="sendcode"]'); await A.p.waitForTimeout(100);
check((await A.p.locator('#acctErr').textContent()).startsWith('Type the whole email'), 'a half-typed email gets a plain message', R);
await A.p.click('#sheetClose');
await signIn(A.p, 'a@example.com', true);
check(true, 'a wrong code gets a message and the right one can still be typed', R);
check(await until(async () => (await A.p.locator('#nameIn').count()) === 1), 'with no call sign anywhere, the call sign sheet opens after signing in', R);
check((await A.p.locator('#sheetBody .sub').textContent()).startsWith('Signed in. This device’s progress is saved to your account.'), 'and says the progress is saved to the account', R);
if (SHOTS) await shot(A.p, 'account-callsign-light');
await A.p.fill('#nameIn', 'Ace'); await A.p.keyboard.press('Enter');
check(await until(async () => (await profile('a@example.com'))?.call_sign === 'Ace'), 'the call sign goes to the account’s profile', R);
let rA = await row('a@example.com');
const sA = await saved(A.p);
check(rA && Object.keys(rA.data.ans).length === 3 && rA.data.ans.c1p2a.ok === false, 'the device’s answers, before and after signing in, are in the account', R);
check(rA && !('theme' in rA.data) && !('place' in rA.data) && !('th' in rA.data) && !('name' in rA.data), 'appearance, the place, messages and the call sign are not in the progress row', R);
check(Object.keys(sA.ans).length === 3, 'and the device still has them', R);
check((await A.p.locator('[data-act="account"] .val').textContent()) === 'Saved', 'You says Saved', R);

// A change goes up a moment later.
const revBefore = Number(rA.rev);
const newId = await answerOne(A.p);
check(await until(async () => { const r = await row('a@example.com'); return r && r.data.ans[newId] && Number(r.rev) === revBefore + 1; }), 'an answer reaches the account about 2 seconds later, one rev up', R);

// The magic link signs in a browser too. Made here as the fake would make it.
{
  const u = await f.user('a@example.com'), s = f.session(u);
  const d = await device({query: '#access_token=' + s.access_token + '&refresh_token=' + s.refresh_token + '&expires_in=3600&expires_at=' + s.expires_at + '&token_type=bearer&type=magiclink'});
  check(await until(async () => Object.keys((await saved(d.p)).ans || {}).length >= 4), 'a link from the email signs in the browser it opens in, and the progress comes down', R);
  check(!(await d.p.evaluate(() => location.hash)), 'and the sign-in is cleared from the address bar', R);
  await d.b.close();
}

// ---------- the email has only a link, no code (Supabase's own email, before our template is in) ----------
// The student asks for the email in one tab, then taps the link, which opens a new tab in the same browser.
{
  const d = await device();
  await tab(d.p, 'you');
  await d.p.click('[data-act="signin"]'); await d.p.waitForTimeout(100);
  await d.p.fill('#emailIn', 'a@example.com');
  await d.p.click('[data-act="sendcode"]');
  await d.p.waitForSelector('#codeIn');
  check((await d.p.locator('#sheetBody .sub').textContent()).includes('Tap the link in it to sign in.'), 'the sheet after sending leads with the link', R);
  check(await d.p.evaluate(() => document.activeElement.id !== 'codeIn'), 'the code box is not focused, so a phone keyboard does not open for a code that may not come', R);
  await d.p.click('[data-act="verifycode"]');
  check((await d.p.locator('#acctErr').textContent()).startsWith('Tap the link in the email.'), 'Sign in with nothing typed points to the link', R);
  check(await d.p.locator('#sheetBody [data-act="signin"]').count() === 1 && await d.p.locator('#sheetClose').isVisible(), 'and Use a different email and close are there, so nobody is stuck', R);
  const u = await f.user('a@example.com'), s = f.session(u);
  const linkTab = await d.ctx.newPage();
  await linkTab.goto(d.p.url().replace(/#.*$/, '') + '#access_token=' + s.access_token + '&refresh_token=' + s.refresh_token + '&expires_in=3600&expires_at=' + s.expires_at + '&token_type=bearer&type=magiclink');
  check(await until(async () => Object.keys((await saved(linkTab)).ans || {}).length >= 4), 'the link signs in the tab it opens in', R);
  check(await until(async () => (await d.p.locator('#codeIn').count()) === 0), 'the first tab hears of it and closes the email sheet', R);
  await tab(d.p, 'home'); await tab(d.p, 'you');
  check(await until(async () => (await d.p.locator('[data-act="account"]').count()) === 1), 'and shows the Account row there too', R);
  await d.b.close();
}
// A link that has run out, or that a school's email system opened first, comes back with an error in the address.
{
  const d = await device({query: '#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired'});
  check(await until(async () => /run out or was used already\. Ask for a new one in You\./.test(await d.p.locator('#toast').textContent().catch(() => ''))), 'a used or old link says so and points to You', R);
  check(!(await d.p.evaluate(() => location.hash)), 'and the error is cleared from the address bar', R);
  await tab(d.p, 'you');
  check(await d.p.locator('[data-act="signin"]').count() === 1, 'and the student can ask for a new email', R);
  await d.b.close();
}

// ---------- device B: empty, signs in to the same account ----------
const B = await device();
await signIn(B.p, 'a@example.com');
check(await until(async () => Object.keys((await saved(B.p)).ans || {}).length >= 4), 'a second, empty device gets the account’s progress', R);
check(await until(async () => (await saved(B.p)).name === 'Ace'), 'and its call sign', R);
await tab(B.p, 'home'); await tab(B.p, 'you');
check((await B.p.locator('.me .h1').textContent()) === 'Ace', 'You shows the account’s call sign', R);
// B answers; A sees it when it comes back on screen.
const bId = await answerOne(B.p);
check(await until(async () => !!(await row('a@example.com')).data.ans[bId]), 'the second device’s answer reaches the account', R);
await A.p.evaluate(() => { Object.defineProperty(document, 'hidden', {value: true, configurable: true}); document.dispatchEvent(new Event('visibilitychange')); });
await A.p.evaluate(() => { Object.defineProperty(document, 'hidden', {value: false, configurable: true}); document.dispatchEvent(new Event('visibilitychange')); });
check(await until(async () => !!(await saved(A.p)).ans[bId]), 'the first device gets it when it comes back on screen', R);

// Reload: still signed in, still in step.
await B.p.reload(); await B.p.waitForTimeout(500);
await tab(B.p, 'you');
check(await B.p.locator('[data-act="account"]').count() === 1, 'after a reload the device is still signed in', R);

// ---------- two devices saving at once ----------
// Another device saves a new answer straight into the account, so A's next save finds rev has moved on.
{
  rA = await row('a@example.com');
  const extra = Object.assign({}, rA.data, {ans: Object.assign({}, rA.data.ans, ans('c1p5a', true, Date.now()))});
  await f.admin('update public.progress set data = $1::jsonb, rev = rev + 1 where user_id = (select id from auth.users where email = $2)', [JSON.stringify(extra), 'a@example.com']);
  const aId = await answerOne(A.p);
  check(await until(async () => { const r = await row('a@example.com'); return r.data.ans.c1p5a && r.data.ans[aId]; }), 'when another device saved first, both answers end up in the account', R);
  check(await until(async () => !!(await saved(A.p)).ans.c1p5a), 'and on this device', R);
}

// ---------- device C: has its own progress, signs in to an account with progress ----------
const C = await device({seed: {ans: ans('c1p6a', true, T)}});
await signIn(C.p, 'a@example.com');
check(await until(async () => (await C.p.locator('[data-act="acctadd"]').count()) === 1), 'a device with its own progress asks: add it, or use the account’s only', R);
if (SHOTS) await shot(C.p, 'account-choice-light');
await C.p.click('#sheetClose');
await tab(C.p, 'you');
check((await C.p.locator('[data-act="account"] .val').textContent()) === 'Not saved yet', 'closing the choice leaves the device signed in but not saved', R);
await C.p.click('[data-act="account"]'); await C.p.waitForTimeout(100);
check(await C.p.locator('[data-act="acctadd"]').count() === 1, 'and the Account row asks again', R);
await C.p.click('[data-act="acctadd"]');
check(await until(async () => !!(await row('a@example.com')).data.ans.c1p6a), 'Add puts this device’s answers into the account', R);
check(await until(async () => Object.keys((await saved(C.p)).ans).length >= 6), 'and the account’s onto this device', R);

const D = await device({seed: {ans: ans('c1p7a', true, T)}});
await signIn(D.p, 'a@example.com');
await until(async () => (await D.p.locator('[data-act="acctuse"]').count()) === 1);
await D.p.click('[data-act="acctuse"]');
check(await until(async () => Object.keys((await saved(D.p)).ans).length >= 6), 'Use the account’s only brings the account’s progress down', R);
await wait(2500);
check(!(await saved(D.p)).ans.c1p7a && !(await row('a@example.com')).data.ans.c1p7a, 'and this device’s own answer is gone, here and in the account', R);
await D.b.close();

// A device that signs out instead of choosing keeps its own progress, because it never reached the account.
const F = await device({seed: {ans: ans('c1p4b', true, T)}});
await signIn(F.p, 'a@example.com');
await until(async () => (await F.p.locator('[data-act="acctuse"]').count()) === 1);
await F.p.click('#sheetBody [data-act="signout"]');
check(await until(async () => (await F.p.evaluate(() => !localStorage.getItem('stratos2.auth')))), 'Sign out instead signs the device out', R);
check(!!(await saved(F.p)).ans.c1p4b && !(await row('a@example.com')).data.ans.c1p4b, 'and its own progress stays on the device, out of the account', R);
await F.b.close();

// ---------- no connection ----------
const revOff = Number((await row('a@example.com')).rev);
f.down = true;
await A.ctx.setOffline(true);
const offId = await answerOne(A.p), offT = (await saved(A.p)).ans[offId].t;
await wait(2500);
await tab(A.p, 'you');
check((await A.p.locator('[data-act="account"] .val').textContent()) === 'Waiting for a connection', 'offline, You says Waiting for a connection', R);
check(Number((await row('a@example.com')).rev) === revOff, 'the answer waits on the device: the account has not changed', R);
check(!!(await saved(A.p)).ans[offId], 'and the app carried on as normal', R);
await A.p.click('[data-act="account"]'); await A.p.waitForTimeout(100);
if (SHOTS) await shot(A.p, 'account-sheet-offline-light');
await A.p.click('[data-act="signout"]');
check(await until(async () => (await A.p.locator('[data-act="signoutanyway"]').count()) === 1), 'signing out with progress not yet saved asks first', R);
await A.p.click('#sheetBody [data-act="sheetclose"]');
f.down = false;
await A.ctx.setOffline(false);
check(await until(async () => ((await row('a@example.com')).data.ans[offId] || {}).t === offT), 'when the connection is back, the answer goes up', R);
check(await until(async () => (await A.p.locator('[data-act="account"] .val').textContent()) === 'Saved'), 'and You says Saved again', R);

// ---------- sign out ----------
await A.p.click('[data-act="account"]'); await A.p.waitForTimeout(100);
await A.p.click('[data-act="signout"]');
check(await until(async () => Object.keys((await saved(A.p)).ans || {}).length === 0), 'signing out erases this device’s copy', R);
check(await A.p.evaluate(() => !localStorage.getItem('stratos2.auth') && !localStorage.getItem('stratos2.sync')), 'and forgets the account on this device', R);
check(!!(await row('a@example.com')).data.ans[offId], 'the account keeps its progress', R);
check(await A.p.locator('#v-home.on').count() === 1, 'and goes back to Home', R);
await tab(A.p, 'you');
check(await A.p.locator('[data-act="signin"]').count() === 1, 'You offers signing in again', R);

// ---------- Reset while signed in ----------
await tab(B.p, 'you');
check((await B.p.locator('.you .fine').last().textContent()).includes('signs you out. Your account keeps its progress.'), 'signed in, the Reset line says the account keeps its progress', R);
await B.p.click('[data-act="reset"]'); await B.p.click('[data-act="reset"]'); await B.p.waitForTimeout(300);
check(await B.p.evaluate(() => !localStorage.getItem('stratos2.sync')), 'Reset while signed in signs the device out', R);
check(Object.keys((await row('a@example.com')).data.ans).length >= 6, 'and the account keeps its progress', R);

// ---------- deleting an account ----------
// Student b has an account with progress. Student a signs in on C (already signed in) and deletes theirs.
const E = await device({seed: {ans: ans('c1p3a', true, T)}});
await signIn(E.p, 'b@example.com');
check(await until(async () => !!(await row('b@example.com'))), 'a second student has their own account', R);
// With a's sign-in, try to reach b's row, and to delete b's account by naming it.
const bId2 = (await f.admin("select id from auth.users where email = 'b@example.com'")).rows[0].id;
const tries = await C.p.evaluate(async ([url, key, other]) => {
  const tok = JSON.parse(localStorage.getItem('stratos2.auth')).access_token;
  const h = {apikey: key, authorization: 'Bearer ' + tok, 'content-type': 'application/json'};
  const read = await (await fetch(url + '/rest/v1/progress?select=data&user_id=eq.' + other, {headers: h})).json();
  const del = await fetch(url + '/rest/v1/rpc/delete_account', {method: 'POST', headers: h, body: JSON.stringify({id: other})});
  const anon = await fetch(url + '/rest/v1/rpc/delete_account', {method: 'POST', headers: {apikey: key, 'content-type': 'application/json'}, body: '{}'});
  return {read: read.length, del: del.status, anon: anon.status};
}, [f.url, f.key, bId2]);
check(tries.read === 0, 'signed in as one student, asking for another’s progress gives nothing', R);
check(tries.del === 404, 'delete_account given another account’s id is refused: it takes no arguments', R);
check(tries.anon === 403 || tries.anon === 401, 'delete_account with no sign-in is refused', R);
check(!!(await row('b@example.com')), 'the other student’s account is untouched', R);

const logFrom = f.log.length;
await tab(C.p, 'you');
await C.p.click('[data-act="account"]'); await C.p.waitForTimeout(100);
if (SHOTS) await shot(C.p, 'account-sheet-light');
await C.p.click('[data-act="delacct"]');
check((await C.p.locator('[data-act="delacct"]').textContent()).startsWith('Tap again'), 'Delete account asks for a second tap', R);
await C.p.click('[data-act="delacct"]');
check(await until(async () => !(await row('a@example.com'))), 'the second tap deletes the account and its progress', R);
const calls = f.log.slice(logFrom).filter(l => l.includes('/rpc/'));
check(calls.length === 1 && calls[0] === 'POST /rest/v1/rpc/delete_account {}', 'the app calls delete_account with nothing in it: ' + calls.join(' '), R);
const users = (await f.admin('select email from auth.users order by email')).rows.map(r => r.email);
check(users.join() === 'b@example.com', 'only the student who asked is deleted: ' + users.join(', '), R);
check(!!(await row('b@example.com')) && (await profile('b@example.com')) !== null, 'the other student keeps their progress and profile', R);
check(await until(async () => (await C.p.locator('[data-act="signin"]').count()) === 1), 'the device is signed out', R);
check(Object.keys((await saved(C.p)).ans).length >= 6, 'and keeps its progress', R);

// The account is deleted somewhere else while E is signed in to it. E notices when it next syncs.
await f.admin("delete from auth.users where email = 'b@example.com'");
await E.p.evaluate(() => { Object.defineProperty(document, 'hidden', {value: false, configurable: true}); document.dispatchEvent(new Event('visibilitychange')); });
check(await until(async () => E.p.evaluate(() => !localStorage.getItem('stratos2.sync'))), 'an account deleted on another device signs this one out', R);
check(!!(await saved(E.p)).ans.c1p3a, 'and this device keeps its progress', R);

// ---------- fits at 360 px, light and dark ----------
for (const scheme of ['light', 'dark']) {
  const d = await device({w: 360, h: 740, scheme: scheme});
  await tab(d.p, 'you');
  await d.p.click('[data-act="signin"]'); await d.p.fill('#emailIn', 'someone.with.a.long.address@example.com');
  await d.p.click('[data-act="sendcode"]'); await d.p.waitForSelector('#codeIn');
  const over = await d.p.evaluate(() => document.documentElement.scrollWidth > innerWidth || [...document.querySelectorAll('#sheet button, #sheet input')].some(e => e.getBoundingClientRect().right > innerWidth));
  check(!over, 'the code sheet fits at 360 px in ' + scheme, R);
  if (SHOTS) await shot(d.p, 'account-code-' + scheme);
  await d.b.close();
}

const errs = all.flatMap(d => d.errs);
console.log(R.join('\n'));
console.log('errors:', errs);
for (const d of all) await d.b.close().catch(() => {});
