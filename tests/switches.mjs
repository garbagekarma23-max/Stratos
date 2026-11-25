// Runs the three sharing switches in v2 against the fake Supabase (fake-supabase.mjs): a new account starts with all
// three off, and an account from before supabase/switches.sql keeps what it had and sees a notice once, explaining
// each switch, with a button to the Account sheet. Email addresses are placeholders on example.com.
// node switches.mjs shots also saves the notice and the Account sheet at 390 by 844 in light and dark.
import { open, shot, tab as tabOnly, check } from './lib.mjs';
import { fakeSupabase } from './fake-supabase.mjs';

const R = [], SHOTS = process.argv[2] === 'shots';
// The database as it was before switches.sql: the switches start on. The file is run part way through, as the owner will.
const f = await fakeSupabase({before: true});
const all = [];
const wait = ms => new Promise(r => setTimeout(r, ms));
const until = async (fn, ms = 6000) => { const end = Date.now() + ms; while (Date.now() < end) { if (await fn()) return true; await wait(100); } return false; };
const device = async (o = {}) => { const d = await open(Object.assign({supabase: f}, o)); all.push(d); return d; };
const text = async (p, sel) => ((await p.locator(sel).first().textContent()) || '').trim();
async function tab(p, t) {
  while (await p.locator('#pages [data-act="back"]').count()) { await p.locator('#pages [data-act="back"]').last().click(); await p.waitForTimeout(80); }
  await tabOnly(p, t);
}
const uid = async email => (await f.admin('select id from auth.users where email = $1', [email])).rows[0].id;
const prof = async email => (await f.admin('select to_jsonb(p) j from public.profiles p where id = $1', [await uid(email)])).rows[0].j;
const notice = p => p.evaluate(() => !document.querySelector('#sheet').hidden && document.querySelector('#sheetTitle').textContent === 'Your sharing switches');
const fits = p => p.evaluate(() => [...document.querySelectorAll('.p-body, .panel')].every(el => el.scrollWidth <= el.clientWidth + 1) && document.documentElement.scrollWidth <= innerWidth);
async function both(p, name) {
  if (!SHOTS) return;
  await shot(p, name + '-light');
  await p.emulateMedia({colorScheme: 'dark'}); await p.waitForTimeout(100);
  await shot(p, name + '-dark');
  await p.emulateMedia({colorScheme: 'light'}); await p.waitForTimeout(100);
}
async function signIn(p, email) {
  await tab(p, 'you');
  await p.click('#v-you [data-act="signin"]'); await p.waitForTimeout(100);
  await p.fill('#emailIn', email);
  await p.click('[data-act="sendcode"]');
  await p.waitForSelector('#codeIn');
  await p.fill('#codeIn', f.codes[email]);
  await p.click('[data-act="verifycode"]');
  await p.waitForSelector('#nameIn', {timeout: 8000});
  await p.click('#sheetClose');
  await p.waitForTimeout(200);
}
async function pickUsername(p, name) {
  await tab(p, 'home');
  await p.click('[data-act="page"][data-page="friends"]');
  await p.waitForSelector('.p-body .unameIn');
  await p.fill('.p-body .unameIn', name);
  await p.click('.p-body [data-act="unamesave"]');
  await p.waitForSelector('.p-body [data-act="frcode"]');
}
const switches = p => p.evaluate(() => ['frfindable', 'frshowon', 'wkshow'].map(a => { const b = document.querySelector('#sheetBody [data-act="' + a + '"]'); return b ? b.getAttribute('aria-pressed') : 'none'; }).join());

// ---------- an account from before ----------
const A = await device({w: 360});
await signIn(A.p, 'ana@example.com');
await pickUsername(A.p, 'ana.old');
await tab(A.p, 'home');
// Ana turned "Show when I'm online" off before the change.
await f.admin('update public.profiles set show_online = false where id = $1', [await uid('ana@example.com')]);
await f.runSwitches();
const p0 = await prof('ana@example.com');
check(p0.findable && !p0.show_online && p0.show_week && p0.switch_notice, 'after switches.sql, Ana keeps her switches as they were, with a notice to see', R);

// The next time the app opens, the notice shows on Home.
await A.p.reload(); await A.p.waitForTimeout(300);
check(await until(() => notice(A.p)), 'the next time the app opens, Home shows "Your sharing switches"', R);
const rows = await A.p.locator('#sheetBody .set').evaluateAll(els => els.map(e => e.querySelector('.t').textContent + ': ' + e.querySelector('.val').textContent));
check(rows.join(' | ') === 'Let people find me by username: On | Show when I’m online: Off | Show me on friends’ weekly table: On', 'it names each switch with where hers stands: ' + rows.join(' | '), R);
const lines = await A.p.locator('#sheetBody .fine').allTextContents();
check(lines.length === 3 && lines.every(l => /^On, .+ Off, /.test(l)), 'each switch has one line in plain words saying what On and Off do', R);
check((await text(A.p, '#sheetBody .sub')).startsWith('New accounts now start with these three switches off. Yours are as you left them.'), 'and it says new accounts start off and hers are as she left them', R);
check(await fits(A.p), 'the notice fits at 360 px with no sideways scroll', R);
await both(A.p, 'switch-notice');
check(await until(async () => (await prof('ana@example.com')).switch_notice === false), 'showing it marks it seen in her account', R);
await A.p.click('#sheetBody [data-act="account"]');
await A.p.waitForSelector('#sheetBody [data-act="frshowon"]');
check(await until(async () => (await switches(A.p)) === 'true,false,true'), 'Change them opens the Account sheet, with the three switches as they are', R);
check(await fits(A.p), 'the Account sheet fits at 360 px', R);
await both(A.p, 'switch-account');
await A.p.click('#sheetClose');

// Never again: not after a reload, and not on another device.
await A.p.reload(); await A.p.waitForTimeout(2500);
check(!(await notice(A.p)), 'after a reload it does not show again', R);
const B = await device();
await signIn(B.p, 'ana@example.com');
await tab(B.p, 'home'); await B.p.waitForTimeout(2500);
check(!(await notice(B.p)), 'nor on another device signed in to the same account', R);

// It waits for Home or You with nothing else open, so it never covers a question.
await f.admin('update public.profiles set switch_notice = true where id = $1', [await uid('ana@example.com')]);
// The answer is held back a moment, so the student is already in Practice when it comes.
await A.ctx.route(/rpc\/switch_notice/, async r => { await wait(1500); await r.fallback(); });
await A.p.reload(); await A.p.waitForTimeout(100);
await tab(A.p, 'practice'); await A.p.waitForTimeout(2500);
check(!(await notice(A.p)) && (await prof('ana@example.com')).switch_notice === true, 'it waits while Practice is open, and stays unseen', R);
await tab(A.p, 'home');
check(await until(() => notice(A.p), 35000), 'and shows on the next refresh of the friends list (30 seconds) once Home is open', R);
await A.p.click('#sheetBody [data-act="sheetclose"]');
check(await until(async () => (await prof('ana@example.com')).switch_notice === false) && sheetHidden(A.p), 'Keep them as they are closes it', R);
function sheetHidden(p) { return p.evaluate(() => document.querySelector('#sheet').hidden); }

// ---------- a new account ----------
const N = await device({w: 360, scheme: 'dark'});
await signIn(N.p, 'new@example.com');
await pickUsername(N.p, 'new.one');
const pn = await prof('new@example.com');
check(!pn.findable && !pn.show_online && !pn.show_week && !pn.switch_notice, 'a new account starts with all three switches off and no notice', R);
await N.p.click('.p-body [data-act="frcode"]'); await N.p.waitForTimeout(150);
check((await N.p.locator('#sheetBody .fine').allTextContents()).some(t => t.startsWith('Friends can’t find you by searching your username while “Let people find me by username” is off.')),
  'its friend code sheet says friends can’t find it by username while the switch is off', R);
await N.p.click('#sheetClose');
await tab(N.p, 'home'); await N.p.waitForTimeout(1500);
check(!(await notice(N.p)), 'a new account never sees the notice', R);
await tab(N.p, 'you');
await N.p.click('#v-you [data-act="account"]');
await N.p.waitForSelector('#sheetBody [data-act="wkshow"]');
check(await until(async () => (await switches(N.p)) === 'false,false,false'), 'its Account sheet shows all three switches off', R);
const nl = await N.p.locator('#sheetBody .fr-acct + .fine').allTextContents();
check(nl.length === 3 && nl.every(l => l.startsWith('On, ')), 'with a line under each saying what On does', R);
check(await fits(N.p), 'the Account sheet fits at 360 px in dark', R);
await N.p.click('#sheetBody [data-act="frfindable"]');
check(await until(async () => (await prof('new@example.com')).findable === true), 'turning one on saves it in the account', R);

check(f.log.every(l => !/@(?!example\.com)[a-z0-9.-]+\.[a-z]+/i.test(decodeURIComponent(l))), 'every email used in this test is on example.com', R);
for (const d of all) { if (d.errs.length) R.push('FAIL page errors: ' + d.errs.join(' | ')); await d.b.close(); }
console.log(R.join('\n'));
console.log('errors: ' + JSON.stringify(all.flatMap(d => d.errs)));
process.exit(R.some(r => r.startsWith('FAIL')) ? 1 : 0);
