// Runs real friends in v2 against the fake Supabase (fake-supabase.mjs), whose database is PGlite with schema.sql and
// friends.sql loaded, so the rules are the real ones. Each open() is a separate device. Email addresses are
// placeholders on example.com.
// node friends.mjs shots also saves the Friends screens at 390 by 844 in light and dark.
import { open, shot, tab as tabOnly, check } from './lib.mjs';
import { fakeSupabase } from './fake-supabase.mjs';

const R = [], SHOTS = process.argv[2] === 'shots';
const f = await fakeSupabase();
const all = [];
const wait = ms => new Promise(r => setTimeout(r, ms));
const until = async (fn, ms = 6000) => { const end = Date.now() + ms; while (Date.now() < end) { if (await fn()) return true; await wait(100); } return false; };
const device = async (o = {}) => { const d = await open(Object.assign({supabase: f}, o)); all.push(d); return d; };
const text = async (p, sel) => ((await p.locator(sel).first().textContent()) || '').trim();
const toastSays = (p, s) => until(async () => (await text(p, '#toast')).includes(s), 4000);
// Close any page open over the tabs, then switch tab.
async function tab(p, t) {
  while (await p.locator('#pages [data-act="back"]').count()) { await p.locator('#pages [data-act="back"]').last().click(); await p.waitForTimeout(80); }
  await tabOnly(p, t);
}
const uid = async email => (await f.admin('select id from auth.users where email = $1', [email])).rows[0].id;

/* Sign in from You with the code the fake "emailed". Then the call sign sheet opens: give it one, or close it. */
async function signIn(p, email, callSign) {
  await tab(p, 'you');
  await p.click('#v-you [data-act="signin"]'); await p.waitForTimeout(100);
  await p.fill('#emailIn', email);
  await p.click('[data-act="sendcode"]');
  await p.waitForSelector('#codeIn');
  await p.fill('#codeIn', f.codes[email]);
  await p.click('[data-act="verifycode"]');
  await p.waitForSelector('#nameIn', {timeout: 8000});
  if (callSign) { await p.fill('#nameIn', callSign); await p.click('[data-act="savename"]'); await p.waitForSelector('#sheet', {state: 'hidden'}); }
  else await p.click('#sheetClose');
  await p.waitForTimeout(200);
}
async function friendsPage(p) {
  await tab(p, 'home');
  await p.click('[data-act="page"][data-page="friends"]');
  await p.waitForTimeout(150);
}
async function pickUsername(p, name) {
  await p.waitForSelector('.p-body .unameIn');
  await p.fill('.p-body .unameIn', name);
  await p.click('.p-body [data-act="unamesave"]');
  await p.waitForSelector('.p-body [data-act="frcode"]');
}
async function addSheet(p, how) {
  await p.click('[data-act="fradd"]'); await p.waitForTimeout(100);
  // The sheet opens on the side used last time, so pick the side wanted.
  await p.click('#sheetBody [data-act="fradd"][data-v="' + (how || 'name') + '"]'); await p.waitForTimeout(80);
}
async function search(p, q) {
  await p.fill('#findIn', q);
  await p.click('[data-act="frfind"]');
  await p.waitForTimeout(300);
}
async function sendCode(p, code) {
  await p.fill('#fcodeIn', code);
  await p.click('[data-act="frsendcode"]');
  await p.waitForTimeout(300);
}
const errText = p => text(p, '#frErr');
const fits = p => p.evaluate(() => [...document.querySelectorAll('.p-body, .panel')].every(el => el.scrollWidth <= el.clientWidth + 1) && document.documentElement.scrollWidth <= innerWidth);
// A screenshot in light, then dark, then back to light.
async function both(p, name) {
  if (!SHOTS) return;
  await shot(p, name + '-light');
  await p.emulateMedia({colorScheme: 'dark'}); await p.waitForTimeout(100);
  await shot(p, name + '-dark');
  await p.emulateMedia({colorScheme: 'light'}); await p.waitForTimeout(100);
}
const codeOn = async p => (await text(p, '[data-act="frcode"] .val')).replace(' ', '');

// ---------- accounts switched off: the page as before ----------
{
  const d = await open({accounts: false});
  all.push(d);
  await friendsPage(d.p);
  check(await d.p.locator('.fr-out').count() === 0 && await d.p.locator('.p-body .fr-h').count() === 0, 'with accounts off, Friends has no real friends part', R);
  check((await text(d.p, '.p-body .row')).includes('Needs accounts') && (await text(d.p, '.notice')).includes('Real friends need accounts'), 'and keeps the Add a friend row and notice it had', R);
}

// ---------- signed out ----------
const A = await device(), B = await device();
const logStart = f.log.length;
await friendsPage(A.p);
check((await text(A.p, '.fr-out .h2')) === 'Friends need an account', 'signed out, Friends says friends need an account', R);
check((await text(A.p, '.fr-out .fine')) === 'Find friends by username, or add them with a code you share in person. Friends see only your call sign and username, never your email or progress.', 'and what friends see', R);
check((await text(A.p, '.p-body .fr-h')) === 'Sample friends' && await A.p.locator('.p-body .thr').count() === 4, 'the four sample friends stay, under their own heading', R);
check((await text(A.p, '.notice')) === 'These four are sample friends, and their scores are made up. Chats with sample friends use cards and preset replies.', 'with the notice saying they are samples', R);
await A.p.click('[data-act="ftab"][data-v="week"]'); await A.p.waitForTimeout(80);
check((await text(A.p, '.fr-later')) === 'Sample friends only. Real friends join this table in a later update.', 'This week says it is sample friends only for now', R);
await A.p.click('[data-act="ftab"][data-v="msgs"]'); await A.p.waitForTimeout(80);
await both(A.p, 'friends-signedout');
check(f.log.length === logStart, 'signed out, the Friends page asks nothing of Supabase', R);
await A.p.click('.fr-out [data-act="signin"]'); await A.p.waitForTimeout(150);
check((await text(A.p, '#sheetTitle')) === 'Sign in' && await A.p.locator('#emailIn').count() === 1, 'Sign in opens the email sheet, titled Sign in', R);
await A.p.click('#sheetClose'); await A.p.click('[data-act="back"]');

// ---------- signing in, call signs and usernames ----------
await signIn(A.p, 'ace@example.com', 'Ace');
await signIn(B.p, 'bee@example.com', '');
const word = (await f.admin('select word from public.banned_words where anywhere order by word limit 1')).rows[0].word;
await tab(B.p, 'you');
await B.p.click('[data-act="editname"]'); await B.p.waitForTimeout(100);
await B.p.fill('#nameIn', 'Big' + word);
await B.p.click('[data-act="savename"]');
check(await until(async () => (await text(B.p, '#nameErr')) === 'That call sign has a word Stratos doesn’t allow. Try another.'), 'signed in, a call sign with a banned word gets a message and is not saved', R);
check(await B.p.locator('#nameIn').count() === 1 && !(await B.p.evaluate(() => JSON.parse(localStorage.getItem('stratos2.v1') || '{}').name)), 'the sheet stays open and the device keeps no call sign', R);
await B.p.fill('#nameIn', 'Bee'); await B.p.click('[data-act="savename"]');
await B.p.waitForSelector('#sheet', {state: 'hidden'});
check(await until(async () => (await f.admin("select call_sign from public.profiles where id = $1", [await uid('bee@example.com')])).rows[0]?.call_sign === 'Bee'), 'an allowed call sign saves, to the account too', R);

await friendsPage(A.p);
await A.p.waitForSelector('.p-body .uform');
check((await text(A.p, '.p-body .uform .h2')) === 'Pick a username', 'the first time, Friends asks for a username', R);
check((await text(A.p, '.p-body .uform .sub')) === 'Friends can find you by your username. Other students see it when they search, so don’t use your real name.', 'and says who sees it', R);
check(await A.p.locator('.p-body [data-act="fradd"]').count() === 0, 'nothing else about friends shows until it is picked', R);
await both(A.p, 'friends-username');
await A.p.fill('.p-body .unameIn', 'ab'); await A.p.click('.p-body [data-act="unamesave"]');
check((await text(A.p, '.p-body .uform .err')) === 'Use 3 to 20 letters (a to z), numbers, dots or underscores.', 'a short username gets a message', R);
await A.p.fill('.p-body .unameIn', 'ace..x'); await A.p.click('.p-body [data-act="unamesave"]');
check((await text(A.p, '.p-body .uform .err')) === 'A username can’t start or end with a dot, or have two dots together.', 'two dots get a message', R);
await A.p.fill('.p-body .unameIn', 'the' + word); await A.p.click('.p-body [data-act="unamesave"]');
check(await until(async () => (await text(A.p, '.p-body .uform .err')) === 'That username has a word Stratos doesn’t allow. Try another.'), 'a banned word gets a message from the database', R);
await A.p.fill('.p-body .unameIn', '');
await A.p.type('.p-body .unameIn', 'Ace.Test');
check((await A.p.inputValue('.p-body .unameIn')) === 'ace.test', 'capitals turn to lower case as they are typed', R);
await A.p.click('.p-body [data-act="unamesave"]');
await A.p.waitForSelector('.p-body [data-act="frcode"]');
check((await text(A.p, '.fr-none')) === 'No friends yet. Find a friend by username, or show them your code.', 'then the page shows no friends yet', R);
check(/^[2-9A-HJKMNP-Z]{4} [2-9A-HJKMNP-Z]{4}$/.test(await text(A.p, '[data-act="frcode"] .val')), 'and the friend code, in two halves', R);
await friendsPage(B.p);
await B.p.fill('.p-body .unameIn', 'ace.test'); await B.p.click('.p-body [data-act="unamesave"]');
check(await until(async () => (await text(B.p, '.p-body .uform .err')) === 'That username is taken. Try another.'), 'a username someone has is taken', R);
await pickUsername(B.p, 'bee.test');

// ---------- your code ----------
await A.p.click('[data-act="frcode"]'); await A.p.waitForTimeout(100);
const aCode1 = (await text(A.p, '.fr-code')).replace(' ', '');
check((await text(A.p, '#sheetTitle')) === 'Your friend code' && aCode1 === await codeOn(A.p), 'Your friend code shows the same code, large', R);
check((await text(A.p, '#sheetBody .sub')) === 'Show this to a friend in person, so they can type it. Anyone with your code can send you a request, and you choose whether to accept.', 'and says how to share it', R);
await both(A.p, 'friends-code');
await A.p.click('[data-act="frnewcode"]');
check(await toastSays(A.p, 'New code made. The old one no longer works.'), 'Make a new code says the old one no longer works', R);
const aCode = (await text(A.p, '.fr-code')).replace(' ', '');
check(aCode !== aCode1 && /^[2-9A-HJKMNP-Z]{8}$/.test(aCode), 'and shows the new code', R);
await A.p.click('#sheetClose');

// ---------- search by username, a request, accept ----------
const bodiesA = [];
A.p.on('response', async r => { if (r.url().includes('/rpc/')) { try { bodiesA.push(await r.text()); } catch (e) {} } });
await B.p.click('[data-act="fradd"]'); await B.p.waitForTimeout(100);
check((await text(B.p, '#sheetTitle')) === 'Add a friend' && await B.p.locator('#findIn').count() === 1, 'Add a friend opens on Username', R);
await search(B.p, 'ac');
check((await errText(B.p)) === 'Type at least 3 characters.', 'fewer than 3 characters asks for more, without searching', R);
await search(B.p, 'ac%');
check((await errText(B.p)) === 'Usernames have only letters, numbers, dots and underscores.', 'a wildcard is refused', R);
check(!f.log.some(l => l.includes('find_students')), 'neither reached the database', R);
await B.p.fill('#findIn', ''); await B.p.type('#findIn', 'ACE');
check((await B.p.inputValue('#findIn')) === 'ace', 'the search box turns capitals to lower case', R);
await B.p.click('[data-act="frfind"]');
await B.p.waitForSelector('#findOut .fr-row');
check(await B.p.locator('#findOut .fr-row').count() === 1 && (await text(B.p, '#findOut .fr-who b')) === '@ace.test', 'searching the start of a username finds it', R);
check((await text(B.p, '#findOut .fr-who span')) === 'No mutual friends' && !(await text(B.p, '#findOut')).includes('Ace '), 'a result shows only the username and the mutual friends, not the call sign', R);
await both(B.p, 'friends-search');
await B.p.click('#findOut [data-act="frsendname"]');
check(await toastSays(B.p, 'Request sent. You’ll be friends once they accept.'), 'Send request says it is sent', R);
check(await until(async () => (await text(B.p, '#findOut .fr-state')) === 'Request sent'), 'and the result now says Request sent', R);
await B.p.click('#sheetClose');
check(await until(async () => (await text(B.p, '.p-body .fr-row.two .fr-who b')) === '@ace.test'), 'Requests you sent shows the username the student found', R);
check(await until(async () => await A.p.locator('[data-act="fraccept"]').count() === 1, 12000), 'the request reaches the other student within one refresh', R);
check((await text(A.p, '.p-body .fr-h')) === 'Requests' && (await text(A.p, '.p-body .fr-row .fr-who b')) === 'Bee' && (await text(A.p, '.p-body .fr-row .fr-who span')) === '@bee.test', 'under Requests, with the call sign and username', R);
await both(A.p, 'friends-request');
await A.p.click('[data-act="back"]'); await A.p.waitForTimeout(150);
check(await A.p.locator('.top [data-page="friends"] .dot').count() === 1 && (await A.p.locator('.top [data-page="friends"]').getAttribute('aria-label')).includes('new'), 'Home\'s friends button has a dot for the request', R);
await A.p.click('[data-act="page"][data-page="friends"]'); await A.p.waitForTimeout(150);
await A.p.click('[data-act="fraccept"]');
check(await toastSays(A.p, 'You’re now friends with Bee.'), 'Accept says they are friends now', R);
check(await until(async () => (await text(A.p, '[data-page="chat"] .fr-who b')) === 'Bee' && (await text(A.p, '[data-page="chat"] .fr-who span')).startsWith('@bee.test, friends since ')), 'the friends list shows the call sign, the username and since when', R);
check(await until(async () => (await text(B.p, '[data-page="chat"] .fr-who b')) === 'Ace', 12000), 'and the other side shows them too', R);
const bId = await uid('bee@example.com');
check(bodiesA.length > 0 && bodiesA.every(t => !t.includes(bId) && !t.includes('bee@example.com')), 'nothing the page received holds the friend\'s account id or email', R);
await addSheet(B.p);
await search(B.p, 'ace.t');
check((await text(B.p, '#findOut .fr-state')) === 'Friends', 'searching a friend shows Friends', R);
await B.p.click('#sheetClose');

// ---------- a code, decline and block, unblock ----------
const C = await device();
await signIn(C.p, 'cat@example.com', '');
await friendsPage(C.p);
await pickUsername(C.p, 'cat.test');
await addSheet(C.p, 'code');
check((await text(C.p, '#sheetBody .sub')) === 'Type your friend’s code. They’ll see your call sign and username, and can accept or decline.', 'the Code side says what the friend sees', R);
await sendCode(C.p, 'OOOO1111');
check((await errText(C.p)) === 'Codes use letters and numbers, with no 0, O, 1, I or L.', 'a code with letters codes never have gets a message', R);
await sendCode(C.p, 'ABC');
check((await errText(C.p)) === 'A friend code has 8 letters and numbers.', 'a short code gets a message', R);
await sendCode(C.p, aCode.toLowerCase().slice(0, 4) + ' ' + aCode.toLowerCase().slice(4));
check(await toastSays(C.p, 'Request sent. You’ll be friends once they accept.'), 'a code typed in lower case with a space sends a request', R);
check(await until(async () => (await text(C.p, '.p-body .fr-row.two .fr-who span')) === 'Code ' + aCode.slice(0, 4) + ' ' + aCode.slice(4) + ', waiting for them to accept'), 'Requests you sent shows only the code typed', R);
check(await until(async () => await A.p.locator('[data-act="frdecline"]').count() === 1, 12000), 'the other student sees it', R);
await A.p.click('[data-act="frdecline"]'); await A.p.waitForTimeout(100);
check((await text(A.p, '#sheetTitle')) === 'Decline @cat.test’s request?' && (await text(A.p, '#sheetBody .sub')) === 'They won’t be told. They can send another one later.', 'Decline asks first, naming the student by username when they have no call sign', R);
await A.p.click('#sheetBody [data-act="frblock"]');
check(await toastSays(A.p, 'Blocked. They can’t send you a request.'), 'Decline and block blocks them', R);
check(await until(async () => (await text(A.p, '.p-body .fr-row [data-act="frunblock"]')) === 'Unblock'), 'the Blocked list shows them with Unblock', R);
await addSheet(C.p, 'code');
await sendCode(C.p, aCode);
check((await errText(C.p)) === 'That code didn’t work. Check it with your friend.', 'a blocked student\'s request looks like a wrong code', R);
await C.p.click('#sheetBody [data-act="fradd"][data-v="name"]'); await C.p.waitForTimeout(80);
await search(C.p, 'ace.test');
check((await errText(C.p)) === 'No one found. Check the spelling with your friend.', 'and the student who blocked them does not show in search', R);
await C.p.click('#sheetClose');
await A.p.click('[data-act="frunblock"]');
check(await toastSays(A.p, 'Unblocked. They can send you a request again.'), 'Unblock says they can ask again', R);
check(await until(async () => await A.p.locator('[data-act="frunblock"]').count() === 0), 'and the Blocked list goes', R);

// ---------- the limits ----------
await addSheet(C.p, 'code');
const lockMsgs = [];
for (let i = 0; i < 6; i++) { await sendCode(C.p, '22222222'); lockMsgs.push(await errText(C.p)); }
check(lockMsgs[0] === 'That code didn’t work. Check it with your friend.' && lockMsgs[lockMsgs.length - 1] === 'Too many codes that didn’t work. Try again in 15 minutes.', 'after 5 wrong codes, codes wait 15 minutes', R);
await C.p.click('#sheetBody [data-act="fradd"][data-v="name"]'); await C.p.waitForTimeout(80);
const searchMsgs = [];
for (let i = 0; i < 10; i++) { await search(C.p, 'zz' + i); searchMsgs.push(await errText(C.p)); }
check(searchMsgs[0] === 'No one found. Check the spelling with your friend.' && searchMsgs[searchMsgs.length - 1] === 'Too many searches. Try again in 15 minutes.', 'after 10 searches, search waits 15 minutes', R);
await C.p.click('#sheetClose');

// ---------- the account sheet: username and the search switch ----------
await tab(A.p, 'you');
await A.p.click('#v-you [data-act="account"]'); await A.p.waitForTimeout(200);
check(await until(async () => (await text(A.p, '#acctFr .fr-un')) === '@ace.test'), 'the account sheet shows the username', R);
check((await A.p.getAttribute('[data-act="frfindable"]', 'aria-pressed')) === 'true' && (await text(A.p, '#setFind')) === 'Let people find me by username', 'and "Let people find me by username", on by default', R);
await both(A.p, 'friends-account');
await A.p.click('[data-act="frfindable"]');
check(await toastSays(A.p, 'Nobody can find you by username now.'), 'turning it off says so', R);
check(await until(async () => (await f.admin('select findable from public.profiles where id = $1', [await uid('ace@example.com')])).rows[0].findable === false), 'and the account keeps it off', R);
await addSheet(B.p);
await search(B.p, 'ace');
check((await errText(B.p)) === 'No one found. Check the spelling with your friend.', 'with it off, search cannot find them, even by a friend', R);
await B.p.click('#sheetClose');
await A.p.click('[data-act="frfindable"]');
check(await toastSays(A.p, 'People can find you by username.'), 'turning it back on says so', R);
await A.p.click('#acctFr [data-act="unamechange"]'); await A.p.waitForTimeout(100);
check((await text(A.p, '#sheetTitle')) === 'Change username' && (await A.p.inputValue('#sheetBody .unameIn')) === 'ace.test', 'Change opens the username sheet with the username in it', R);
await A.p.fill('#sheetBody .unameIn', 'ace.two'); await A.p.click('#sheetBody [data-act="unamesave"]');
check(await until(async () => (await text(A.p, '#sheetBody .uform .err')) === 'You changed your username today. Try again tomorrow.'), 'a username changes once a day', R);
await A.p.click('#sheetClose');

// ---------- offline ----------
await friendsPage(A.p);
f.down = true;
await addSheet(A.p);
await search(A.p, 'bee');
check((await errText(A.p)) === 'No connection. Try again when you are online.', 'with no connection, search says so', R);
await A.p.click('#sheetClose');
check(await until(async () => (await text(A.p, '.fr-off')).startsWith('Offline. This list is from '), 12000), 'and the list says it is from earlier', R);
check(await A.p.locator('[data-page="chat"]').count() === 1, 'the friends from last time still show', R);
f.down = false;
check(await until(async () => await A.p.locator('.fr-off').count() === 0, 12000), 'back online, the note goes', R);

// ---------- at 360 px, light and dark ----------
await addSheet(A.p, 'code');
await sendCode(A.p, (await codeOn(C.p)));
check(await until(async () => await A.p.locator('[data-act="frcancel"]').count() === 1 && await A.p.locator('[data-page="chat"]').count() === 1), 'the page now has a friend and a request sent', R);
await both(A.p, 'friends-list');
for (const scheme of ['light', 'dark']) {
  await A.p.emulateMedia({colorScheme: scheme});
  await A.p.setViewportSize({width: 360, height: 740});
  await A.p.waitForTimeout(150);
  check(await fits(A.p), 'Friends fits at 360 px in ' + scheme, R);
  await addSheet(A.p);
  await search(A.p, 'bee');
  check(await fits(A.p), 'Add a friend with a result fits at 360 px in ' + scheme, R);
  await A.p.click('#sheetClose');
}
await A.p.setViewportSize({width: 390, height: 844});

// ---------- remove and block from a friend's sheet ----------
await friendsPage(B.p);
// A friend's row opens their chat. The button at the top right of the chat opens the friend's sheet.
await B.p.click('.p-body [data-page="chat"]'); await B.p.waitForTimeout(300);
await B.p.click('#pages .p-bar [data-act="frfriend"]'); await B.p.waitForTimeout(100);
check((await text(B.p, '#sheetTitle')) === 'Ace' && (await text(B.p, '#sheetBody .sub')).startsWith('@ace.test. Friends since '), 'a friend\'s sheet shows their call sign, username and since when', R);
await B.p.click('[data-act="frremove"]');
check((await text(B.p, '[data-act="frremove"]')) === 'Tap again to remove Ace', 'Remove friend asks for a second tap', R);
await B.p.click('[data-act="frremove"]');
check(await toastSays(B.p, 'Ace is no longer your friend.'), 'the second tap removes them', R);
check(await until(async () => await B.p.locator('[data-page="chat"]').count() === 0), 'and the list is empty', R);
check(await until(async () => await A.p.locator('[data-page="chat"]').count() === 0, 12000), 'on both sides', R);

// ---------- a call sign picked while signed out, with a banned word ----------
const E = await device({seed: {name: 'Mr' + word, ans: {c1p1a: {ok: true, n: 1, t: Date.now()}}}});
await tab(E.p, 'you');
await E.p.click('#v-you [data-act="signin"]'); await E.p.waitForTimeout(100);
await E.p.fill('#emailIn', 'eve@example.com');
await E.p.click('[data-act="sendcode"]');
await E.p.waitForSelector('#codeIn');
await E.p.fill('#codeIn', f.codes['eve@example.com']);
await E.p.click('[data-act="verifycode"]');
check(await until(async () => (await E.p.locator('#nameErr:not([hidden])').count()) === 1, 8000), 'signing in with a banned call sign from before opens the call sign sheet', R);
check((await text(E.p, '#nameErr')) === 'That call sign has a word Stratos doesn’t allow. Try another.' && !(await E.p.evaluate(() => JSON.parse(localStorage.getItem('stratos2.v1') || '{}').name)), 'with the message, and the device no longer has it', R);
check((await f.admin('select call_sign from public.profiles where id = $1', [await uid('eve@example.com')])).rows[0].call_sign === null, 'and the account never got it', R);

// ---------- signing out and deleting the account erase the list here ----------
check(await B.p.evaluate(() => !!localStorage.getItem('stratos2.friends')), 'the last list loaded is kept on the device', R);
await tab(B.p, 'you');
await B.p.click('#v-you [data-act="account"]'); await B.p.waitForTimeout(150);
await B.p.click('[data-act="signout"]'); await B.p.waitForTimeout(400);
check(await B.p.evaluate(() => !localStorage.getItem('stratos2.friends')), 'signing out erases it', R);
await tab(C.p, 'you');
await C.p.click('#v-you [data-act="account"]'); await C.p.waitForTimeout(150);
await C.p.click('[data-act="delacct"]'); await C.p.click('[data-act="delacct"]');
check(await until(async () => C.p.evaluate(() => !localStorage.getItem('stratos2.friends'))), 'deleting the account erases it too', R);
check(await until(async () => await A.p.locator('[data-act="frcancel"]').count() === 0, 12000), 'and the request to the deleted student leaves the other side', R);

// ---------- the emails in the repository ----------
check(f.log.every(l => !/@(?!example\.com)[a-z0-9.-]+\.[a-z]+/i.test(decodeURIComponent(l))), 'every email used in this test is on example.com', R);

for (const d of all) { if (d.errs.length) R.push('FAIL page errors: ' + d.errs.join(' | ')); await d.b.close(); }
console.log(R.join('\n'));
console.log('errors: ' + JSON.stringify(all.flatMap(d => d.errs)));
process.exit(R.some(r => r.startsWith('FAIL')) ? 1 : 0);
