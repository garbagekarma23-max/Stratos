// Runs who is online and the typing bubble in v2 on several devices against the fake Supabase (fake-supabase.mjs).
// Its database is PGlite with every SQL file loaded, live.sql included, and its Realtime only lets a phone join or
// send on a channel when the rules in live.sql allow it, so these are the real rules.
// Ana and Ben are friends. Cara is Ana's friend with no message request. Dev is nobody's friend.
// node live.mjs shots also saves live-friends, live-chat, live-typing, live-challenge and live-account, light and
// dark, at 390 by 844.
import { open, shot, tab as tabOnly, check } from './lib.mjs';
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
async function friendsPage(p) {
  await tab(p, 'home');
  await p.click('[data-act="page"][data-page="friends"]');
  await p.waitForSelector('.p-body [data-page="chat"]', {timeout: 8000});
}
const row = (p, name) => p.locator('.p-body .fr-friend', {hasText: name});
const rowOnline = async (p, name) => await row(p, name).locator('.online').count() === 1;
async function chat(p, name) {
  await friendsPage(p);
  await row(p, name).locator('[data-page="chat"]').click();
  await p.waitForFunction(() => !/^Loading/.test(document.querySelector('.p-body.thread .sys')?.textContent || ''), null, {timeout: 6000});
}
const box = p => p.locator('#msgIn');
const typing = p => p.locator('.p-body .msg.typing');
const bubbles = p => p.locator('.p-body .msg:not(.typing) .bubble').allTextContents();
const fits = p => p.evaluate(() => [...document.querySelectorAll('.p-body, .panel, .composer, .p-bar')].every(el => el.scrollWidth <= el.clientWidth + 1) && document.documentElement.scrollWidth <= innerWidth);
// The app in the background or in front, as a phone does when the student switches apps.
const hidden = (p, h) => p.evaluate(h => {
  Object.defineProperty(document, 'hidden', {configurable: true, get: () => h});
  Object.defineProperty(document, 'visibilityState', {configurable: true, get: () => h ? 'hidden' : 'visible'});
  document.dispatchEvent(new Event('visibilitychange'));
}, h);
const isMarked = async u => (await f.admin('select 1 from public.online where user_id = $1 and until > now()', [u.id])).rows.length === 1;
async function both(p, name) {
  if (!SHOTS) return;
  await shot(p, name + '-light');
  await p.emulateMedia({colorScheme: 'dark'}); await p.waitForTimeout(100);
  await shot(p, name + '-dark');
  await p.emulateMedia({colorScheme: 'light'}); await p.waitForTimeout(100);
}

// ---------- four students ----------
const ua = await f.user('ana@example.com'), ub = await f.user('ben@example.com'), uc = await f.user('cara@example.com'), ud = await f.user('dev@example.com');
for (const [u, name, sign] of [[ua, 'ana.live', 'Ana'], [ub, 'ben.live', 'Ben'], [uc, 'cara.live', 'Cara'], [ud, 'dev.live', 'Dev']]) {
  await call(u.id, 'set_username', {new_username: name});
  await f.as(u.id, "insert into public.profiles (id, call_sign) values ($1, $2) on conflict (id) do update set call_sign = $2", [u.id, sign]);
}
async function befriend(x, y) {
  await call(x.id, 'send_friend_request', {friend_code: (await call(y.id, 'friends_state')).me.code});
  await call(y.id, 'accept_friend_request', {ref: (await call(y.id, 'friends_state')).incoming[0].ref});
  return (await call(x.id, 'friends_state')).friends.find(fr => fr.username === (y === ub ? 'ben.live' : 'cara.live')).ref;
}
const ref = await befriend(ua, ub), refC = await befriend(ua, uc);
// Dev asks Ana to be friends, and she hasn't answered.
await call(ud.id, 'send_friend_request', {friend_code: (await call(ua.id, 'friends_state')).me.code});

// Ana's phone keeps reduced motion on (the default in these tests). Ben's has it off.
const A = await device(), B = await device({motion: true});
await signIn(A.p, 'ana@example.com');

// ---------- online ----------
await friendsPage(A.p);
check(!(await rowOnline(A.p, 'Ben')) && !(await rowOnline(A.p, 'Cara')), 'before Ben opens the app, nobody shows online', R);
check(await until(() => isMarked(ua), 4000), 'Ana\'s app checks in while it is open', R);
await signIn(B.p, 'ben@example.com');
await friendsPage(B.p);
check(await until(() => isMarked(ub), 4000), 'so does Ben\'s', R);
check(await until(() => rowOnline(A.p, 'Ben'), 13000), 'Ben shows online on Ana\'s friends list within a refresh', R);
check((await text(A.p, '.fr-friend .online')) === 'Online' && !(await rowOnline(A.p, 'Cara')), 'with a dot and the word Online, and only next to Ben', R);
check(await until(() => rowOnline(B.p, 'Ana'), 13000), 'and Ana shows online on Ben\'s', R);
const dot = await A.p.evaluate(() => { const i = document.querySelector('.fr-friend .online'), b = getComputedStyle(i, '::before'), t = document.createElement('i'); t.style.color = 'var(--good)'; document.body.appendChild(t); const good = getComputedStyle(t).color; t.remove(); return {dot: b.backgroundColor, word: getComputedStyle(i).color, good, round: b.borderRadius}; });
check(dot.dot === dot.good && dot.word === dot.good && dot.round === '50%', 'the dot is round and green, the word green (' + dot.good + ')', R);
const pendingSees = await call(ud.id, 'online_now', {here: true});
check(pendingSees.online.length === 0 && !(await A.p.locator('.p-body .fr-row', {hasText: 'Dev'}).locator('.online').count()), 'Dev, whose request is waiting, sees nobody online and shows online to nobody', R);
await both(A.p, 'live-friends');
await A.p.setViewportSize({width: 360, height: 740});
check(await fits(A.p), 'the list fits at 360 px with Online beside a name', R);
await A.p.emulateMedia({colorScheme: 'dark'});
check(await fits(A.p), 'and in dark', R);
await A.p.emulateMedia({colorScheme: 'light'});
await A.p.setViewportSize({width: 390, height: 844});

// The challenge sheet
await row(A.p, 'Ben').locator('[data-act="pickch"]').click(); await A.p.waitForTimeout(150);
check((await text(A.p, '#sheetTitle')) === 'Challenge Ben' && (await text(A.p, '#sheetBody .on-now .online')) === 'Online', 'the challenge sheet says Ben is online', R);
await both(A.p, 'live-challenge');
await A.p.click('#sheetClose');
await row(A.p, 'Cara').locator('[data-act="pickch"]').click(); await A.p.waitForTimeout(150);
check(await A.p.locator('#sheetBody .on-now').count() === 0, 'and says nothing for Cara, who isn\'t', R);
await A.p.click('#sheetClose');

// The app in the background
await hidden(B.p, true);
check(await until(async () => !(await isMarked(ub)), 3000), 'Ben\'s app going into the background takes his mark away at once', R);
check(await until(async () => !(await rowOnline(A.p, 'Ben')), 13000), 'and Ana sees him go within a refresh', R);
await hidden(B.p, false);
check(await until(() => rowOnline(A.p, 'Ben'), 13000), 'back in front, he shows again', R);

// The switch
await tab(B.p, 'you');
await B.p.click('[data-act="account"]');
await B.p.waitForSelector('#sheetBody [data-act="frshowon"]');
check((await text(B.p, '#setOnline')) === 'Show when I’m online' && (await B.p.getAttribute('[data-act="frshowon"]', 'aria-pressed')) === 'true', 'the account sheet has Show when I’m online, on', R);
check((await text(B.p, '#acctFr .fr-acct:last-of-type + .fine')).startsWith('When this is off, nobody sees when you’re online. You still see friends who show it.'), 'and says what off does', R);
await both(B.p, 'live-account');
await B.p.click('[data-act="frshowon"]');
check(await until(async () => (await text(B.p, '#toast')).includes('Nobody can see when you’re online now.')) && (await B.p.getAttribute('[data-act="frshowon"]', 'aria-pressed')) === 'false', 'turning it off says so', R);
check(!(await isMarked(ub)) && (await f.admin('select show_online from public.profiles where id = $1', [ub.id])).rows[0].show_online === false, 'and takes his mark away', R);
check(await until(async () => !(await rowOnline(A.p, 'Ben')), 13000), 'Ana no longer sees him online', R);
await B.p.click('#sheetClose');
await friendsPage(B.p);
await B.p.waitForTimeout(11000);
check(await rowOnline(B.p, 'Ana') && !(await isMarked(ub)), 'he still sees Ana online, and checking in never marks him', R);
await tab(B.p, 'you');
await B.p.click('[data-act="account"]');
await B.p.waitForSelector('#sheetBody [data-act="frshowon"][aria-pressed="false"]');
check(true, 'the switch stays off when the sheet opens again', R);
await B.p.click('[data-act="frshowon"]');
check(await until(() => isMarked(ub), 3000), 'on again, he is marked again', R);
await B.p.click('#sheetClose');
check(await until(() => rowOnline(A.p, 'Ben'), 13000), 'and Ana sees him', R);
const kept = await B.p.evaluate(() => Object.keys(localStorage).map(k => k + '=' + localStorage.getItem(k)).join('\n'));
check(!/online|show_online|until/i.test(kept.replace(/"findable":(true|false)/g, '')), 'nothing about who is online is kept on the device', R);

// ---------- typing: never before a message request is accepted ----------
await chat(A.p, 'Ben');
check((await text(A.p, '.p-bar .p-sub .online')) === 'Online', 'the chat\'s header says Ben is online', R);
await A.p.waitForTimeout(1500);
check(!f.rt.log.some(x => x.join) && f.rt.members('chat:' + ref) === 0, 'with no message request, the app does not join the chat\'s channel', R);
await call(ua.id, 'ask_to_message', {friend: ref});
await call(ub.id, 'accept_message_request', {friend: ref});
await tab(A.p, 'home');
await chat(A.p, 'Ben');
await chat(B.p, 'Ana');
check(await until(async () => f.rt.members('chat:' + ref) === 2, 5000), 'once accepted, both apps join the chat\'s channel', R);
check(f.rt.log.filter(x => x.join).every(x => x.ok && x.join === 'chat:' + ref), 'and only that channel', R);
await both(A.p, 'live-chat');

// ---------- typing ----------
await box(A.p).pressSequentially('Did you', {delay: 40});
check(await until(async () => await typing(B.p).count() === 1, 1500), 'when Ana types, Ben sees the typing bubble within a second', R);
check(await B.p.evaluate(() => { const b = document.querySelector('.p-body'), last = [...b.children].pop(); return last.classList.contains('typing') && !last.classList.contains('mine'); }), 'at the bottom left, where her next message will appear', R);
check((await text(B.p, '.msg.typing .sr')) === 'Ana is typing' && await B.p.locator('.msg.typing i').count() === 3 && (await B.p.getAttribute('.msg.typing', 'role')) === 'status', 'with three dots, and "Ana is typing" for screen readers', R);
const anim = await B.p.evaluate(() => getComputedStyle(document.querySelector('.msg.typing i')).animationName);
check(anim === 'typing', 'the dots move on Ben\'s phone', R);
await both(B.p, 'live-typing');
check(await typing(A.p).count() === 0, 'Ana doesn\'t see her own bubble', R);
// Ben is half way through typing when Ana's bubble comes and goes: his box, its words and the cursor are left alone.
await box(B.p).focus();
await box(B.p).pressSequentially('I th', {delay: 30});
await B.p.evaluate(() => { window.boxEl = document.querySelector('#msgIn'); });
await box(A.p).pressSequentially('nk', {delay: 30});
await A.p.waitForTimeout(400);
await box(A.p).fill(''); await A.p.locator('#msgIn').dispatchEvent('input');
await until(async () => await typing(B.p).count() === 0, 1500);
check(await B.p.evaluate(() => document.querySelector('#msgIn') === window.boxEl && document.activeElement === window.boxEl && window.boxEl.value === 'I th' && window.boxEl.selectionStart === 4),
  'the bubble coming and going leaves the box being typed in alone', R);
await box(B.p).fill(''); await B.p.locator('#msgIn').dispatchEvent('input');
await box(A.p).pressSequentially('Did you', {delay: 40});
await until(async () => await typing(B.p).count() === 1, 1500);
await box(A.p).fill('');
await A.p.locator('#msgIn').dispatchEvent('input');
check(await until(async () => await typing(B.p).count() === 0, 1500), 'emptying the box takes it away at once', R);
await box(A.p).pressSequentially('Hm', {delay: 40});
check(await until(async () => await typing(B.p).count() === 1, 1500), 'typing again brings it back', R);
const t0 = Date.now();
await until(async () => await typing(B.p).count() === 0, 7000);
const gone = Date.now() - t0;
check(gone > 3000 && gone < 5500, 'when she stops for 4 seconds, it goes: ' + gone + ' ms', R);

// Ben types to Ana: her phone has reduced motion, so the dots stay still.
await box(B.p).pressSequentially('Yes', {delay: 40});
check(await until(async () => await typing(A.p).count() === 1, 1500), 'Ben typing shows on Ana\'s phone', R);
const still = await A.p.evaluate(() => { const s = getComputedStyle(document.querySelector('.msg.typing i')); return parseFloat(s.animationDuration) < 0.01 && s.animationIterationCount === '1'; });
check(still, 'with reduced motion, the dots stay still', R);
await box(B.p).fill('');
await B.p.locator('#msgIn').dispatchEvent('input');

// ---------- a message arrives at once ----------
await box(A.p).fill('Did you get question 4?');
await A.p.locator('#msgIn').dispatchEvent('input');
check(await until(async () => await typing(B.p).count() === 1, 1500), 'Ana typing her message shows', R);
const s0 = Date.now();
await A.p.click('[data-act="msend"]');
check(await until(async () => (await bubbles(B.p)).includes('Did you get question 4?'), 4000), 'her message reaches Ben without waiting for the 5-second fetch: ' + (Date.now() - s0) + ' ms', R);
check(await typing(B.p).count() === 0, 'and the typing bubble is gone', R);
check(Date.now() - s0 < 2500, 'within 2.5 seconds', R);
await box(B.p).fill('Yes, 42');
await B.p.click('[data-act="msend"]');
check(await until(async () => (await bubbles(A.p)).includes('Yes, 42'), 2500), 'and the other way', R);
const sends = f.rt.log.filter(x => x.send);
check(sends.length > 0 && sends.every(x => ['typing', 'stop', 'new'].includes(x.event) && Object.keys(x.payload).every(k => k === 'n') && x.ok), 'Realtime only carried typing, stop and new with a message number, never text', R);
check(!JSON.stringify(sends).includes('question 4') && !JSON.stringify(sends).includes('42"'), 'no message text went through Realtime', R);
check((await f.admin('select count(*)::int c from realtime.messages')).rows[0].c === 0, 'and nothing was kept in realtime.messages', R);
// Polling slows while the channel is joined.
const fetchesBefore = f.log.filter(l => l.includes('/rpc/chat_messages')).length;
await A.p.waitForTimeout(12000);
const fetches = f.log.filter(l => l.includes('/rpc/chat_messages')).length - fetchesBefore;
check(fetches <= 2, 'with the channel joined, the chats are fetched less often (' + fetches + ' in 12 seconds for both phones)', R);

// ---------- leaving the chat ----------
await box(A.p).pressSequentially('one more', {delay: 30});
check(await until(async () => await typing(B.p).count() === 1, 1500), 'Ana typing shows again', R);
await A.p.click('#pages [data-act="back"]');
check(await until(async () => await typing(B.p).count() === 0, 1500), 'leaving the chat takes the bubble away at once', R);
check(await until(async () => f.rt.members('chat:' + ref) === 1, 2500), 'and her app leaves the channel', R);
await hidden(B.p, true);
check(await until(async () => f.rt.members('chat:' + ref) === 0, 2500), 'Ben\'s app leaves it when it goes into the background', R);
await hidden(B.p, false);
check(await until(async () => f.rt.members('chat:' + ref) === 1, 2500), 'and joins again when it comes back', R);

// ---------- nobody else can join ----------
const C = await device();
await signIn(C.p, 'cara@example.com');
await friendsPage(C.p);
check(await until(() => rowOnline(C.p, 'Ana'), 13000), 'Cara, Ana\'s friend, sees her online', R);
check(!(await rowOnline(C.p, 'Ben')) && await C.p.locator('.p-body .fr-friend', {hasText: 'Ben'}).count() === 0, 'and never sees Ben, who isn\'t her friend', R);
// Cara's app would never ask, so the test asks for her, the way someone writing their own code would: a client of
// their own, with her sign-in, joining Ana and Ben's channel by its name.
const snoop = await C.p.evaluate(async name => {
  const heard = [];
  window.own = window.supabase.createClient(window.stratosSupabase.url, window.stratosSupabase.key, {auth: {storageKey: 'stratos2.auth', persistSession: true, autoRefreshToken: false, detectSessionInUrl: false}});
  await window.own.auth.getSession();
  const ch = window.own.channel(name, {config: {private: true}});
  ch.on('broadcast', {event: '*'}, m => heard.push(m.event));
  const status = await new Promise(ok => { ch.subscribe(s => ok(s)); setTimeout(() => ok('waited'), 5000); });
  window.snoopHeard = heard;
  return status;
}, 'chat:' + ref);
check(snoop === 'CHANNEL_ERROR', 'Cara asking to join Ana and Ben\'s channel is refused: ' + snoop, R);
await chat(A.p, 'Ben');
await box(A.p).pressSequentially('secret plans', {delay: 30});
await A.p.waitForTimeout(800);
check((await C.p.evaluate(() => window.snoopHeard.length)) === 0 && await typing(B.p).count() === 1, 'and hears nothing while Ana types to Ben', R);
const pub = await C.p.evaluate(async name => {
  await window.own.removeAllChannels();
  const ch = window.own.channel(name);
  return new Promise(ok => { ch.subscribe(s => ok(s)); setTimeout(() => ok('waited'), 5000); });
}, 'chat:' + ref);
check(pub === 'CHANNEL_ERROR', 'a public channel of the same name is refused too: ' + pub, R);
await C.p.evaluate(() => window.own.removeAllChannels());
await box(A.p).fill(''); await A.p.locator('#msgIn').dispatchEvent('input');

// ---------- with Realtime out of reach, polling still works ----------
await A.p.click('#pages [data-act="back"]');
await B.p.click('#pages [data-act="back"]');
f.rt.down = true;
f.rt.drop();
await chat(A.p, 'Ben');
await chat(B.p, 'Ana');
await box(A.p).fill('Still there?');
await A.p.click('[data-act="msend"]');
check(await until(async () => (await bubbles(B.p)).includes('Still there?'), 7000), 'with Realtime down, the message still arrives within one 5-second fetch', R);
check(await typing(B.p).count() === 0, 'with no typing bubble', R);
f.rt.down = false;
await A.p.click('#pages [data-act="back"]');
await B.p.click('#pages [data-act="back"]');
// After a failure the app waits a minute before trying again. A reload tries straight away.
await A.p.reload(); await B.p.reload();
await A.p.waitForTimeout(800); await B.p.waitForTimeout(800);
await chat(A.p, 'Ben');
await chat(B.p, 'Ana');
check(await until(async () => f.rt.members('chat:' + ref) === 2, 8000), 'once it is back, both join again', R);

// ---------- 360 px ----------
await box(A.p).pressSequentially('typing at 360', {delay: 30});
await B.p.setViewportSize({width: 360, height: 740});
await until(async () => await typing(B.p).count() === 1, 1500);
check(await typing(B.p).count() === 1 && await fits(B.p), 'the chat fits at 360 px with the header and the typing bubble', R);
await B.p.emulateMedia({colorScheme: 'dark'});
check(await fits(B.p), 'and in dark', R);
await B.p.emulateMedia({colorScheme: 'light'});
await B.p.setViewportSize({width: 390, height: 844});
await box(A.p).fill(''); await A.p.locator('#msgIn').dispatchEvent('input');

// ---------- block ----------
await A.p.click('.p-bar [data-act="frfriend"]'); await A.p.waitForTimeout(100);
await A.p.click('#sheetBody [data-act="frblock"]'); await A.p.waitForTimeout(80);
await A.p.click('#sheetBody [data-act="frblock"]');
check(await until(async () => f.rt.members('chat:' + ref) <= 1, 1000), 'blocking leaves the channel at once', R);
const before = f.rt.log.length;
await box(B.p).pressSequentially('hello?', {delay: 30});
await B.p.waitForTimeout(600);
const after = f.rt.log.slice(before).filter(x => x.send);
check(after.every(x => !x.ok), 'Ben\'s typing, while his chat is still open, is refused by the rules', R);
check(await typing(A.p).count() === 0, 'and never reaches Ana', R);
check(await until(async () => f.rt.members('chat:' + ref) === 0, 25000), 'Ben\'s app leaves too once it learns', R);
const afterBlock = await call(ub.id, 'online_now', {here: true});
check(afterBlock.online.length === 0 && (await call(ua.id, 'online_now', {here: true})).online.every(r => r !== ref), 'after the block, neither sees the other online', R);

// ---------- signing out ----------
await tab(C.p, 'you');
await C.p.click('[data-act="account"]');
await C.p.click('#sheetBody [data-act="signout"]');
await C.p.waitForTimeout(300);
if (await C.p.locator('[data-act="signoutanyway"]').count()) await C.p.click('[data-act="signoutanyway"]');
check(await until(async () => !(await isMarked(uc)), 3000), 'signing out takes the mark away at once', R);

const errs = all.flatMap(d => d.errs);
check(!errs.length, 'no script errors: ' + errs.join(' | '), R);
for (const d of all) await d.b.close();
console.log(R.join('\n'));
process.exit(process.exitCode || 0);
