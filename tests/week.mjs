// Runs the weekly table with real friends in v2 on several devices against the fake Supabase (fake-supabase.mjs),
// whose database has week.sql loaded, so these are the real rules.
// Ana and Ben are friends. Cara has no friends. Dev is a stranger with answers of his own.
// It checks: accounts off and signed out as before (with Sign in), nothing kept or sent for an answer given signed
// out, a right answer kept on the phone and sent, the table (you and your friends, most first, equal totals sharing a
// place, the lines under it), no id or email in what the page receives, the switch on the Account sheet (Hidden from
// friends, gone from the friend's table, answers still counting), no friends yet and Add a friend, offline and back,
// answers kept for another account dropped, sign out sending first and erasing, and 360 px in light and dark.
// node week.mjs shots also saves week-table, week-hidden, week-empty, week-signedout and week-account, light and
// dark, at 390 by 844.
import { open, shot, tab as tabOnly, check, pick } from './lib.mjs';
import { fakeSupabase } from './fake-supabase.mjs';

const R = [], SHOTS = process.argv[2] === 'shots';
const f = await fakeSupabase();
const all = [];
const wait = ms => new Promise(r => setTimeout(r, ms));
const until = async (fn, ms = 6000) => { const end = Date.now() + ms; while (Date.now() < end) { if (await fn()) return true; await wait(100); } return false; };
const device = async (o = {}) => { const d = await open(Object.assign({supabase: f}, o)); all.push(d); return d; };
const text = async (p, sel) => ((await p.locator(sel).first().textContent()) || '').trim();
async function tab(p, t) {
  while (await p.locator('#pages [data-act="back"]').count()) { await p.locator('#pages [data-act="back"]').last().click(); await p.waitForTimeout(80); }
  await tabOnly(p, t);
}
const call = async (uid, fn, args = {}) => {
  const keys = Object.keys(args);
  return (await f.as(uid, 'select public.' + fn + '(' + keys.map((k, i) => k + ' => $' + (i + 1)).join(', ') + ') as v', keys.map(k => args[k]))).rows[0].v;
};
const rows = async (sql, params) => (await f.admin(sql, params)).rows;
const countOf = async u => (await rows('select count(*)::int c from public.week_answers where user_id = $1', [u.id]))[0].c;
async function signIn(p, email) {
  await tab(p, 'you');
  await p.click('#v-you [data-act="signin"]'); await p.waitForTimeout(100);
  await p.fill('#emailIn', email);
  await p.click('[data-act="sendcode"]');
  await p.waitForSelector('#codeIn');
  await p.fill('#codeIn', f.codes[email]);
  await p.click('[data-act="verifycode"]');
  await p.waitForSelector('#sheet', {state: 'hidden', timeout: 8000});
  await p.waitForTimeout(300);
}
// One right answer: the check question after a card in Learn.
async function answerRight(p) {
  await tab(p, 'home');
  await p.click('.hero .primary'); await p.waitForTimeout(150);
  await p.locator('#learnFeed .card .next').last().click(); await p.waitForTimeout(60);
  const k = await pick(p, '#learnFeed', true);
  await p.waitForTimeout(1700);           // more than the 1.5 seconds the database needs between answers
  return k.id;
}
const queue = p => p.evaluate(() => JSON.parse(localStorage.getItem('stratos2.wk') || 'null'));
async function weekTab(p) {
  await tab(p, 'home');
  await p.click('[data-act="page"][data-page="friends"]'); await p.waitForTimeout(100);
  await p.click('[data-act="ftab"][data-v="week"]'); await p.waitForTimeout(100);
}
// The table's rows on screen: [place, name, total].
// Your own row's name has (you) after it.
const table = p => p.evaluate(() => [...document.querySelectorAll('.p-body .lb li')].map(li => [li.querySelector('.rank').textContent,
  li.querySelector('.nm').firstChild.textContent.replace(' (you)', ''), li.querySelector('.sc').textContent]));
const tableIs = (p, want) => until(async () => JSON.stringify(await table(p)) === JSON.stringify(want), 8000);
// Coming back to the app: it sends anything waiting when put away, and fetches the table on coming back.
const hidden = (p, h) => p.evaluate(h => {
  Object.defineProperty(document, 'hidden', {configurable: true, get: () => h});
  Object.defineProperty(document, 'visibilityState', {configurable: true, get: () => h ? 'hidden' : 'visible'});
  document.dispatchEvent(new Event('visibilitychange'));
}, h);
const refresh = async p => { await hidden(p, true); await p.waitForTimeout(200); await hidden(p, false); };
const fits = p => p.evaluate(() => [...document.querySelectorAll('.p-body, .panel')].every(el => el.scrollWidth <= el.clientWidth + 1) && document.documentElement.scrollWidth <= innerWidth);
const weekCalls = () => f.log.filter(l => /rpc\/(count_answers|week_table|set_show_week)/.test(l));
async function both(p, name) {
  if (!SHOTS) return;
  await shot(p, name + '-light');
  await p.emulateMedia({colorScheme: 'dark'}); await p.waitForTimeout(100);
  await shot(p, name + '-dark');
  await p.emulateMedia({colorScheme: 'light'}); await p.waitForTimeout(100);
}

// ---------- accounts off ----------
{
  const d = await open({accounts: false}); all.push(d);
  await weekTab(d.p);
  check(await d.p.locator('.p-body .lb li').count() === 5 && !(await d.p.locator('.p-body .fr-later').count()) && !(await d.p.locator('.p-body [data-act="signin"]').count()),
    'with accounts off, This week is the sample table as before, with no line about signing in', R);
}

// ---------- four students ----------
const ua = await f.user('ana@example.com'), ub = await f.user('ben@example.com'), uc = await f.user('cara@example.com'), ud = await f.user('dev@example.com');
for (const [u, name, sign] of [[ua, 'ana.week', 'Ana'], [ub, 'ben.week', 'Ben'], [uc, 'cara.week', 'Cara'], [ud, 'dev.week', 'Dev']]) {
  await call(u.id, 'set_username', {new_username: name});
  await f.as(u.id, "insert into public.profiles (id, call_sign) values ($1, $2) on conflict (id) do update set call_sign = $2", [u.id, sign]);
}
await call(ua.id, 'send_friend_request', {friend_code: (await call(ub.id, 'friends_state')).me.code});
await call(ub.id, 'accept_friend_request', {ref: (await call(ub.id, 'friends_state')).incoming[0].ref});
// Dev, a stranger, has answers this week. He must never show.
await call(ud.id, 'count_answers', {answers: JSON.stringify([{q: 'c1p1a', at: Date.now() - 60000}, {q: 'c1p2a', at: Date.now() - 50000}])});

// ---------- signed out ----------
const A = await device();
const logStart = f.log.length;
await weekTab(A.p);
check(await A.p.locator('.p-body .lb li').count() === 5 && (await text(A.p, '.p-body .fr-later')) === 'Sample friends only. Sign in to see your real friends here.',
  'signed out, This week is the sample friends, with a line saying to sign in', R);
check(await A.p.locator('.p-body [data-act="signin"]').count() === 1, 'and a Sign in button', R);
check((await text(A.p, '.notice')).startsWith('These four are sample friends'), 'the notice still says they are samples', R);
await both(A.p, 'week-signedout');
await answerRight(A.p);
check(await queue(A.p) === null, 'a right answer given signed out is not kept for the table', R);
check(f.log.length === logStart, 'and nothing is asked of Supabase', R);

// ---------- signed in ----------
const bodies = [];
A.p.on('response', async r => { if (/rpc\/(week_table|count_answers)/.test(r.url())) { try { bodies.push(await r.text()); } catch (e) {} } });
await signIn(A.p, 'ana@example.com');
await A.p.waitForTimeout(3500);
check(await countOf(ua) === 0, 'signing in sends nothing from before: the answer given signed out never counts', R);
const q1 = await answerRight(A.p);
const kept = await queue(A.p);
check(kept && kept.uid === ua.id && kept.list.length === 1 && kept.list[0].q === q1 && Math.abs(kept.list[0].at - Date.now()) < 5000,
  'signed in, a right answer is kept on the phone with its question and when: ' + JSON.stringify(kept && kept.list), R);
check(await until(async () => await countOf(ua) === 1, 12000), 'and sent within 10 seconds', R);
// The database saves the answer before its reply reaches the phone, so give the reply a moment to arrive.
check(await until(async () => await queue(A.p) === null, 2000), 'then the phone keeps nothing', R);
const sent = (await rows('select q from public.week_answers where user_id = $1', [ua.id]))[0].q;
check(sent === q1, 'the database has the question: ' + sent, R);

await weekTab(A.p);
check(await tableIs(A.p, [['1', 'Ana', '1'], ['2', 'Ben', '0']]), 'Ana\'s table: her and Ben, most first: ' + JSON.stringify(await table(A.p)), R);
check((await text(A.p, '.p-body .lb-cap')) === 'Correct answers since Monday, all subjects.', 'with the same line above it', R);
check((await text(A.p, '.p-body .you-row .nm')) === 'Ana (you)' && await A.p.locator('.p-body .lb-sub').count() === 0, 'her row says (you)', R);
check((await text(A.p, '.p-body .fr-later')) === 'Counts answers given while signed in, up to 300 in 24 hours. Starts again Monday at midnight, your time.',
  'the line under it says what counts and when it starts again', R);
check((await text(A.p, '.notice')) === 'Friends see only your call sign or username and your total. To leave the table, open You, then Account.',
  'and the notice says what friends see and how to leave', R);
check(await A.p.locator('.p-body .lb li').count() === 2 && !(await A.p.locator('.p-body [data-act="wkadd"]').count()), 'no sample friends, no Dev, and no Add a friend', R);
await call(ub.id, 'count_answers', {answers: JSON.stringify([{q: 'c2p1a', at: Date.now() - 600000}])});
await refresh(A.p);
check(await tableIs(A.p, [['1', 'Ana', '1'], ['1', 'Ben', '1']]), 'equal totals share a place, A to Z: ' + JSON.stringify(await table(A.p)), R);
await call(ub.id, 'count_answers', {answers: JSON.stringify([{q: 'c2p2a', at: Date.now() - 300000}])});
await refresh(A.p);
check(await tableIs(A.p, [['1', 'Ben', '2'], ['2', 'Ana', '1']]), 'Ben goes first with more', R);
check(await fits(A.p), 'the table fits at 390 px', R);
await both(A.p, 'week-table');
check(bodies.length > 0 && bodies.every(t => !t.includes(ub.id) && !t.includes(ua.id) && !t.includes('@example') && !t.includes('c1p')),
  'nothing the page received holds an account id, an email or a question', R);

// Ben's phone sees Ana
const B = await device();
await signIn(B.p, 'ben@example.com');
await weekTab(B.p);
check(await tableIs(B.p, [['1', 'Ben', '2'], ['2', 'Ana', '1']]), 'Ben\'s table shows Ana with her total', R);

// ---------- the switch ----------
await tab(A.p, 'you');
await A.p.click('[data-act="account"]');
await A.p.waitForSelector('#sheetBody [data-act="wkshow"]');
check((await text(A.p, '#setWeek')) === 'Show me on friends’ weekly table' && (await A.p.getAttribute('[data-act="wkshow"]', 'aria-pressed')) === 'true',
  'the Account sheet has the switch, on', R);
check((await A.p.locator('#sheetBody .fine').allTextContents()).includes('When this is off, friends don’t see you on This week. You still see them, and your answers still count.'),
  'with a line saying what off does', R);
await both(A.p, 'week-account');
await A.p.click('[data-act="wkshow"]');
check(await until(async () => (await rows('select show_week from public.profiles where id = $1', [ua.id]))[0].show_week === false) &&
  (await text(A.p, '#toast')).includes('Friends can’t see you on the weekly table now.'), 'off: saved in the account, with a toast', R);
await A.p.keyboard.press('Escape'); await A.p.waitForTimeout(200);
await refresh(B.p);
check(await tableIs(B.p, [['1', 'Ben', '2']]), 'Ana leaves Ben\'s table', R);
await weekTab(A.p);
check(await tableIs(A.p, [['1', 'Ben', '2'], ['2', 'Ana', '1']]) && (await text(A.p, '.p-body .lb-sub')) === 'Hidden from friends',
  'Ana still sees Ben, and her row says Hidden from friends', R);
await both(A.p, 'week-hidden');
await answerRight(A.p);
check(await until(async () => await countOf(ua) === 2, 12000), 'her answers still count while hidden', R);
await tab(A.p, 'you');
await A.p.click('[data-act="account"]');
await A.p.waitForSelector('#sheetBody [data-act="wkshow"][aria-pressed="false"]');
await A.p.click('[data-act="wkshow"]');
check(await until(async () => (await rows('select show_week from public.profiles where id = $1', [ua.id]))[0].show_week === true), 'on again', R);
await A.p.keyboard.press('Escape'); await A.p.waitForTimeout(200);
await refresh(B.p);
check(await tableIs(B.p, [['1', 'Ana', '2'], ['1', 'Ben', '2']]), 'and Ana is back on Ben\'s table with every answer counted', R);

// ---------- no friends yet ----------
const C = await device({w: 360});
await signIn(C.p, 'cara@example.com');
await weekTab(C.p);
check(await tableIs(C.p, [['1', 'Cara', '0']]), 'Cara, with no friends, sees only herself', R);
check((await text(C.p, '.p-body .fr-none')) === 'Friends you add show here, unless they turn the table off.', 'with a line saying friends show here', R);
check(await fits(C.p), 'it fits at 360 px', R);
await both(C.p, 'week-empty');
await C.p.emulateMedia({colorScheme: 'dark'}); await C.p.waitForTimeout(100);
check(await fits(C.p), 'and in dark', R);
await C.p.emulateMedia({colorScheme: 'light'});
await C.p.click('.p-body [data-act="wkadd"]');
check(await until(async () => await C.p.locator('#sheet:not([hidden]) #findIn').count() === 1, 4000) &&
  (await C.p.getAttribute('[data-act="ftab"][data-v="msgs"]', 'aria-pressed')) === 'true', 'Add a friend goes to Messages and opens Add a friend', R);
await C.p.keyboard.press('Escape'); await C.p.waitForTimeout(150);
// 360 px with friends, light and dark
await weekTab(B.p);
await B.p.setViewportSize({width: 360, height: 740}); await B.p.waitForTimeout(150);
check(await fits(B.p), 'Ben\'s table fits at 360 px', R);
await B.p.emulateMedia({colorScheme: 'dark'}); await B.p.waitForTimeout(100);
check(await fits(B.p), 'and in dark', R);
await B.p.emulateMedia({colorScheme: 'light'});

// ---------- offline ----------
await weekTab(A.p);
// The phone says it is offline, and the fake Supabase can't be reached.
await A.ctx.setOffline(true); f.down = true;
await A.p.waitForTimeout(200);
await answerRight(A.p);
await A.p.waitForTimeout(11000);
check((await queue(A.p) || {list: []}).list.length === 1 && await countOf(ua) === 2, 'offline, a right answer waits on the phone', R);
await weekTab(A.p);
await refresh(A.p);
check(await until(async () => (await A.p.locator('.p-body .fr-off').count()) === 1, 6000) && /^Offline\. This table is from /.test(await text(A.p, '.p-body .fr-off')) &&
  await A.p.locator('.p-body .lb li').count() === 2, 'the table on screen stays, with a line saying it is from earlier', R);
f.down = false; await A.ctx.setOffline(false);
check(await until(async () => await countOf(ua) === 3, 8000), 'back online, the answer is sent', R);
await refresh(A.p);
check(await tableIs(A.p, [['1', 'Ana', '3'], ['2', 'Ben', '2']]) && !(await A.p.locator('.p-body .fr-off').count()), 'and the table catches up', R);

// ---------- answers kept for another account ----------
const before = (await rows('select count(*)::int c from public.week_answers'))[0].c;
await A.p.evaluate(() => localStorage.setItem('stratos2.wk', JSON.stringify({uid: '00000000-0000-0000-0000-000000000000', list: [{q: 'c4p1a', at: Date.now()}]})));
await A.p.reload(); await A.p.waitForTimeout(4500);
check(await queue(A.p) === null && (await rows('select count(*)::int c from public.week_answers'))[0].c === before, 'answers kept for another account are dropped, not sent', R);

// ---------- signing out ----------
await answerRight(A.p);
check((await queue(A.p) || {list: []}).list.length === 1, 'an answer waits a moment before it is sent', R);
await tab(A.p, 'you');
await A.p.click('[data-act="account"]');
await A.p.click('#sheetBody [data-act="signout"]');
await A.p.waitForTimeout(600);
if (await A.p.locator('[data-act="signoutanyway"]').count()) await A.p.click('[data-act="signoutanyway"]');
check(await countOf(ua) === 4, 'signing out sends it first', R);
check(await queue(A.p) === null, 'and leaves nothing on the phone', R);
await weekTab(A.p);
check(await A.p.locator('.p-body .lb li').count() === 5 && (await text(A.p, '.p-body .fr-later')).startsWith('Sample friends only'), 'signed out again, This week is the sample table', R);
check(weekCalls().every(l => !l.includes(ud.id)), 'Dev never came up', R);

const errs = all.flatMap(d => d.errs);
check(!errs.length, 'no script errors: ' + errs.join(' | '), R);
for (const d of all) await d.b.close();
console.log(R.join('\n'));
process.exit(process.exitCode || 0);
