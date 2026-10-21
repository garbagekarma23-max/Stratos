// Runs messages between real friends in v2 on two devices against the fake Supabase (fake-supabase.mjs), whose
// database is PGlite with schema.sql, friends.sql and messages.sql loaded, so the rules and the filter are the real
// ones. Ana is an Australian phone and Ben a French one, so each sees the help details for their country.
// node messages.mjs shots also saves the chat screens at 390 by 844 in light and dark.
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
async function chat(p) {
  await friendsPage(p);
  await p.click('.p-body [data-page="chat"]');
  await p.waitForFunction(() => !/^Loading/.test(document.querySelector('.p-body.thread .sys')?.textContent || ''), null, {timeout: 6000});
}
const box = p => p.locator('#msgIn');
// The number of new things Home's friends button says it has: messages, requests and the sample friends' messages.
const homeNew = async p => +((/, (\d+) new/.exec(await p.locator('#v-home [data-page="friends"]').getAttribute('aria-label')) || [0, 0])[1]);
async function type(p, s) { await box(p).fill(s); await p.waitForTimeout(50); }
async function sendText(p, s) { await type(p, s); await p.click('[data-act="msend"]'); await p.waitForTimeout(400); }
const bubbles = p => p.locator('.p-body .msg .bubble').allTextContents();
const fits = p => p.evaluate(() => [...document.querySelectorAll('.p-body, .panel, .composer')].every(el => el.scrollWidth <= el.clientWidth + 1) && document.documentElement.scrollWidth <= innerWidth);
async function both(p, name) {
  if (!SHOTS) return;
  await shot(p, name + '-light');
  await p.emulateMedia({colorScheme: 'dark'}); await p.waitForTimeout(100);
  await shot(p, name + '-dark');
  await p.emulateMedia({colorScheme: 'light'}); await p.waitForTimeout(100);
}

// Two students who are friends already: Ana (Australian phone) and Ben (French phone).
const ua = await f.user('ana@example.com'), ub = await f.user('ben@example.com');
await call(ua.id, 'set_username', {new_username: 'ana.chat'});
await call(ub.id, 'set_username', {new_username: 'ben.chat'});
await f.as(ua.id, "insert into public.profiles (id, call_sign) values ($1, 'Ana') on conflict (id) do update set call_sign = 'Ana'", [ua.id]);
await f.as(ub.id, "insert into public.profiles (id, call_sign) values ($1, 'Ben') on conflict (id) do update set call_sign = 'Ben'", [ub.id]);
await call(ua.id, 'send_friend_request', {friend_code: (await call(ub.id, 'friends_state')).me.code});
await call(ub.id, 'accept_friend_request', {ref: (await call(ub.id, 'friends_state')).incoming[0].ref});
const ref = (await call(ua.id, 'friends_state')).friends[0].ref;

const A = await device(), B = await device({locale: 'fr-FR', tz: 'Europe/Paris'});
await signIn(A.p, 'ana@example.com');
await signIn(B.p, 'ben@example.com');

// ---------- a message request ----------
await friendsPage(A.p);
check((await text(A.p, '.p-body [data-page="chat"] .fr-who span')).startsWith('@ben.chat, friends since '), 'before any chat, a friend\'s row says since when', R);
await A.p.click('.p-body [data-page="chat"]');
await A.p.waitForSelector('[data-act="mask"]');
check((await text(A.p, '.p-body .sys')) === 'You and Ben are friends. Send a message request to start chatting. Ben can accept or decline.', 'a friend\'s chat starts with a message request', R);
check((await text(A.p, '.p-body .fine')) === 'Messages are text only. Stratos doesn’t send messages with links, phone numbers, email addresses or words it doesn’t allow.', 'and says what Stratos doesn\'t send', R);
check(await box(A.p).count() === 0, 'there is no box to type in yet', R);
await both(A.p, 'chat-request');
await A.p.click('[data-act="mask"]');
check(await toastSays(A.p, 'Message request sent.'), 'Send message request says it is sent', R);
check(await until(async () => (await text(A.p, '.p-body .sys')) === 'Message request sent. You can message Ben once they accept.') && await A.p.locator('[data-act="mcancel"]').count() === 1, 'then the chat says it is waiting, with Cancel request', R);

await friendsPage(B.p);
check(await until(async () => (await text(B.p, '.p-body [data-page="chat"] .fr-who span')) === 'Wants to message you' && await B.p.locator('.p-body [data-page="chat"] .dot').count() === 1, 12000), 'the friend\'s row says Wants to message you, with a dot', R);
await tab(B.p, 'home');
const samples = (await B.p.evaluate(() => JSON.parse(localStorage.getItem('stratos2.v1') || '{}').unread)) || {};
const sampleNew = Object.values(samples).reduce((a, b) => a + b, 0);
check(await homeNew(B.p) === sampleNew + 1, 'and Home\'s friends button counts it with the sample friends\' messages (' + (sampleNew + 1) + ' new)', R);
await chat(B.p);
check((await text(B.p, '.p-body .h2')) === 'Ana wants to message you.' && (await text(B.p, '.p-body .sub')) === 'Accept only if you know Ana and want to chat. You can block them at any time.', 'the chat asks whether to accept', R);
await both(B.p, 'chat-asked');
await B.p.click('[data-act="mdecline"]'); await B.p.waitForTimeout(100);
check((await text(B.p, '#sheetTitle')) === 'Decline Ana’s message request?' && (await text(B.p, '#sheetBody .sub')) === 'They won’t be told. You stay friends.' && await B.p.locator('#sheetBody [data-act="frblock"]').count() === 1,
  'Decline asks first, with Decline and block', R);
await B.p.click('[data-act="mdeclineok"]');
check(await toastSays(B.p, 'Declined.') && await until(async () => await B.p.locator('[data-act="mask"]').count() === 1), 'declining goes back to the request screen', R);
await A.p.waitForTimeout(5600);
check((await text(A.p, '.p-body .sys')).startsWith('Message request sent.'), 'the sender is not told: their chat still says it is waiting', R);
await B.p.click('[data-act="mask"]');
check(await toastSays(B.p, 'You can message Ana now.') && await until(async () => await box(B.p).count() === 1), 'asking back opens the chat', R);
check(await until(async () => await box(A.p).count() === 1, 7000), 'and the other side opens within one refresh', R);
check((await text(A.p, '.p-body .sys')) === 'Only you and Ben can read this chat. Messages are deleted after 90 days.', 'the open chat says who can read it and how long it is kept', R);
check((await text(A.p, '.p-body .sys:nth-of-type(2)')) === 'No messages yet. Say hello.' && await A.p.locator('[data-act="msend"]:disabled').count() === 1, 'it starts empty, with Send off until something is typed', R);

// ---------- sending ----------
await type(A.p, 'Hi Ben, did you get question 4?');
check(await A.p.locator('[data-act="msend"]:disabled').count() === 0, 'typing turns Send on', R);
const t0 = Date.now();
await A.p.click('[data-act="msend"]');
check(await until(async () => (await bubbles(A.p)).includes('Hi Ben, did you get question 4?') && (await box(A.p).inputValue()) === ''), 'Send empties the box and the message shows', R);
check(await until(async () => (await bubbles(B.p)).includes('Hi Ben, did you get question 4?'), 7000) && Date.now() - t0 < 7500, 'the friend sees it within one refresh (' + Math.round((Date.now() - t0) / 100) / 10 + ' s)', R);
check(await B.p.locator('.p-body .msg:not(.mine) button.bubble').count() === 1 && await A.p.locator('.p-body .msg.mine .bubble').count() === 1, 'yours on the right, theirs on the left as a button', R);
await type(B.p, 'Yes. Line one\nline two');
await B.p.click('[data-act="msend"]');
check(await until(async () => (await bubbles(A.p)).includes('Yes. Line one\nline two'), 7000), 'a message keeps its line break', R);
const C = await device({w: 1100, h: 800});
await signIn(C.p, 'ana@example.com');
await chat(C.p);
await type(C.p, 'from the computer');
await box(C.p).press('Enter');
check(await until(async () => (await bubbles(C.p)).includes('from the computer')), 'on a computer keyboard, Enter sends', R);
await box(C.p).fill('one'); await box(C.p).press('Shift+Enter'); await box(C.p).type('two');
check((await box(C.p).inputValue()) === 'one\ntwo', 'and Shift and Enter starts a new line', R);
await C.b.close(); all.splice(all.indexOf(C), 1);

// ---------- unread dot ----------
await tab(B.p, 'home');
await friendsPage(B.p);
await call(ua.id, 'send_message', {friend: ref, body: 'are you there?'});
check(await until(async () => (await text(B.p, '.p-body [data-page="chat"] .fr-who span')) === 'are you there?' && await B.p.locator('.p-body [data-page="chat"] .dot').count() === 1, 12000),
  'on Friends, the row shows the new message and a dot within one refresh', R);
await tab(B.p, 'home');
const withNew = await homeNew(B.p);
check(withNew >= 1 && await B.p.locator('#v-home [data-page="friends"] .dot').count() === 1, 'and Home\'s friends button has a dot', R);
await chat(B.p);
await tab(B.p, 'home');
check(await until(async () => await homeNew(B.p) === sampleNew), 'reading the chat takes its messages off Home\'s count, leaving the sample friends\' (' + withNew + ' to ' + sampleNew + ')', R);
await chat(B.p);

// ---------- refused messages ----------
const word = (await f.admin("select word from public.banned_words where in_messages and anywhere order by word limit 1")).rows[0].word;
const refusals = [
  ['call me on 0412 345 678', 'Messages can’t have phone numbers. Write big numbers with commas, like 1,250,000.'],
  ['go to example dot com', 'Messages can’t have links or website addresses.'],
  ['ana (at) example dot com', 'Messages can’t have email addresses.'],
  ['add me on snap', 'Keep chats on Stratos. Messages can’t have @handles or ask to chat on other apps.'],
  ['@ana_22', 'Keep chats on Stratos. Messages can’t have @handles or ask to chat on other apps.'],
  ['you ' + word, 'That message has a word Stratos doesn’t allow. Change it to send.'],
  ['k y s', 'Stratos doesn’t send messages telling someone to hurt themselves.']
];
const wrong = [];
for (const [msg, say] of refusals) {
  await sendText(A.p, msg);
  await until(async () => !(await A.p.locator('#msErr').isHidden()), 3000);
  const got = await text(A.p, '#msErr'), kept = await box(A.p).inputValue();
  if (got !== say || kept !== msg) wrong.push(msg + ' => ' + got + ' / box: ' + kept);
  await f.admin('delete from public.message_log where user_id = $1', [ua.id]);
}
check(!wrong.length, 'each refused message stays in the box with one line saying why' + (wrong.length ? ': ' + wrong.join('; ') : ''), R);
check(!(await bubbles(A.p)).some(t => t.includes('0412')) && !(await f.admin("select 1 from public.messages where body like '%0412%'")).rows.length, 'a refused message is never sent or saved', R);
await sendText(A.p, 'call me on 0412 345 678');
await both(A.p, 'chat-refused');
await A.p.locator('#msgIn').press('End'); await A.p.keyboard.type('!');
check(await A.p.locator('#msErr').isHidden(), 'the line goes once the message is changed', R);
await type(A.p, 'Hitler, homo economicus and sex discrimination. Damn, that was crap.');
await A.p.click('[data-act="msend"]');
check(await until(async () => (await bubbles(A.p)).includes('Hitler, homo economicus and sex discrimination. Damn, that was crap.')), 'history, economics and mild words send', R);
await type(A.p, 'x'.repeat(450));
check((await text(A.p, '.ms-count')) === '450 of 500' && !(await A.p.locator('.ms-count').isHidden()), 'from 400 characters a count shows', R);
await type(A.p, 'x'.repeat(510));
await A.p.click('[data-act="msend"]'); await A.p.waitForTimeout(150);
check((await text(A.p, '#msErr')) === 'Messages can be up to 500 characters.' && await A.p.locator('.ms-count.over').count() === 1, 'over 500 says so, and the count turns red', R);
await type(A.p, '');
await f.admin('delete from public.message_log where user_id = $1', [ua.id]);

// ---------- how a student feels ----------
await sendText(A.p, 'honestly I want to die');
check(await until(async () => (await text(A.p, '.p-body .care.mine')).startsWith('If you’re not okay, you don’t have to deal with it alone. Kids Helpline: 1800 55 1800, any time. In an emergency, call 000.')),
  'a message about how the sender feels is sent, with a line about getting help (Australia: Kids Helpline)', R);
check(await A.p.locator('.p-body .care.mine a[href="tel:1800551800"]').count() === 1, 'the number can be tapped to call', R);
check(await until(async () => (await text(B.p, '.p-body .care:not(.mine)')) === 'Ana might be going through something. Check in with them, and tell an adult you trust if you’re worried.', 7000),
  'the friend sees a line about checking in with them', R);
await both(A.p, 'chat-care');
await call(ub.id, 'send_message', {friend: ref, body: 'I feel suicidal'});
check(await until(async () => (await text(B.p, '.p-body .care.mine')).includes('Find free support in your country at findahelpline.com. In an emergency, call your local emergency number.'), 7000),
  'outside Australia, the help line points to findahelpline.com', R);

// ---------- report ----------
const target = B.p.locator('.p-body .msg:not(.mine) button.bubble', {hasText: 'honestly I want to die'});
await target.click(); await B.p.waitForTimeout(100);
check((await text(B.p, '#sheetTitle')) === 'Message from Ana' && (await text(B.p, '#sheetBody .ms-quote')) === 'honestly I want to die', 'tapping a friend\'s message shows it, with Report message', R);
await B.p.click('[data-act="mreport"]'); await B.p.waitForTimeout(100);
check((await text(B.p, '#sheetTitle')) === 'Report this message' && (await text(B.p, '#sheetBody .sub')) === 'Ana won’t be told. Stratos will see this message and the messages around it.', 'the report sheet says Ana won\'t be told', R);
check((await B.p.locator('#sheetBody .pick .t').allTextContents()).join('|') === 'Bullying or threats|Sexual or rude|Asking for personal details or to meet|Hurting themselves or others|Spam|Something else', 'with the six reasons', R);
await both(B.p, 'chat-report');
await B.p.click('[data-act="mreportas"][data-why="harm"]');
await B.p.waitForFunction(() => document.querySelector('#sheetTitle').textContent === 'Thanks for reporting');
check((await text(B.p, '#sheetBody .sub')) === 'Stratos will look at it. Do you want to block Ana too? Blocking removes them as a friend and deletes this chat for both of you.', 'then it thanks them and offers to block', R);
check((await text(B.p, '#sheetBody .care-help')) === 'Find free support in your country at findahelpline.com. In an emergency, call your local emergency number.', 'for Hurting themselves or others it shows the help details', R);
await both(B.p, 'chat-reported');
await B.p.click('#sheetBody [data-act="sheetclose"]');
const rep = (await f.admin('select * from moderation.reports')).rows;
check(rep.length === 1 && rep[0].reason === 'harm' && rep[0].reporter === ub.id && rep[0].reported === ua.id && rep[0].messages.some(m => m.this && m.text === 'honestly I want to die'), 'the report is saved with the message and the ones around it', R);
await target.click(); await B.p.click('[data-act="mreport"]'); await B.p.click('[data-act="mreportas"][data-why="spam"]');
check(await until(async () => (await text(B.p, '#msRepErr')) === 'You’ve reported this message already.'), 'the same message cannot be reported twice', R);
await B.p.click('#sheetClose');

// ---------- a warning and a ban ----------
await f.admin('select moderation.warn($1)', [rep[0].id]);
await A.p.locator('#pages [data-act="back"]').last().click();
check(await until(async () => (await text(A.p, '#sheetTitle')) === 'A message you sent was reported', 8000), 'a warned student sees it the next time they open Friends', R);
check((await text(A.p, '#sheetBody .sub')).startsWith('Stratos checked it, and it breaks the rules for messages: be kind, nothing sexual'), 'with the rules for messages', R);
await both(A.p, 'chat-warned');
await A.p.click('[data-act="mwarnok"]');
check(await until(async () => (await f.admin('select count(*)::int c from moderation.notices where seen_at is null')).rows[0].c === 0), 'OK marks it seen', R);
await friendsPage(A.p); await A.p.waitForTimeout(600);
check(await A.p.locator('#sheet').isHidden(), 'and it does not come back', R);
await A.p.click('.p-body [data-page="chat"]'); await A.p.waitForSelector('#msgIn');
await f.admin('select moderation.ban($1, 7)', [rep[0].id]);
check(await until(async () => /^You can’t send messages until \d+ \w+\.$/.test(await text(A.p, '.ms-banned .sub')), 7000), 'a ban shows within one refresh, with when it ends', R);
check((await text(A.p, '.ms-banned .fine')) === 'This is because of a report. You can still read your chats, and friends still work. Questions? Email support@stratosstudy.com.' && await box(A.p).count() === 0,
  'and the support address, in place of the box', R);
await both(A.p, 'chat-banned');
await f.admin("select moderation.ban_user('ana.chat', null)");
check(await until(async () => (await text(A.p, '.ms-banned .sub')) === 'Messaging is turned off for your account.', 7000), 'a ban with no end says messaging is off', R);
await f.admin("select moderation.unban('ana.chat')");
check(await until(async () => await box(A.p).count() === 1, 7000), 'unban brings the box back', R);

// ---------- what stays on the device, 360 px ----------
const stored = await A.p.evaluate(() => Object.keys(localStorage).map(k => localStorage.getItem(k)).join('\n'));
check(!stored.includes('did you get question 4') && !stored.includes('honestly I want to die'), 'no message is kept on the device', R);
check(!stored.includes(ub.id) && !stored.includes('ben@example.com'), 'and nothing on the device holds the friend\'s id or email', R);
await A.p.setViewportSize({width: 360, height: 740});
await sendText(A.p, 'a very long message with a longwordthatdoesnotbreakanywhereatallinthebubbleandkeepsgoing and more words after it');
check(await fits(A.p), 'at 360 px the chat has no sideways scroll, in light', R);
await A.p.emulateMedia({colorScheme: 'dark'}); await A.p.waitForTimeout(100);
check(await fits(A.p), 'and in dark', R);
await A.p.emulateMedia({colorScheme: 'light'});
await A.p.setViewportSize({width: 390, height: 844});
await both(A.p, 'chat-open');

// ---------- block from the chat ----------
await B.p.click('#pages .p-bar [data-act="frfriend"]'); await B.p.waitForTimeout(100);
check((await text(B.p, '#sheetBody .fine:last-child')).includes('Either one deletes your chat for both of you.'), 'the friend\'s sheet says removing or blocking deletes the chat', R);
await B.p.click('#sheetBody [data-act="frblock"]'); await B.p.click('#sheetBody [data-act="frblock"]');
check(await toastSays(B.p, 'Blocked.') && await until(async () => !(await B.p.locator('#pages .p-body.thread').count())), 'blocking closes the chat', R);
check(await until(async () => !(await A.p.locator('#pages .p-body.thread').count()), 8000), 'and the other student\'s chat closes within one refresh', R);
check(!(await f.admin('select 1 from public.chats')).rows.length && !(await f.admin('select 1 from public.messages')).rows.length && (await f.admin('select count(*)::int c from moderation.reports')).rows[0].c === 1,
  'the chat and its messages are deleted, and the report stays', R);

// ---------- the sample friends still work ----------
await tab(A.p, 'home');
await A.p.click('[data-act="page"][data-page="friends"]'); await A.p.waitForTimeout(200);
await A.p.click('.p-body .thr'); await A.p.waitForTimeout(150);
const chips = await A.p.locator('.replies .chip').count();
await A.p.click('.replies .chip');
check(chips > 0 && await until(async () => await A.p.locator('.p-body .msg.mine .bubble').count() > 0) && await A.p.locator('#msgIn').count() === 0, 'a sample friend\'s chat still has preset replies and no box', R);
check((await text(A.p, '.p-body .sys')).includes('is a sample friend'), 'and still says it is a sample friend', R);

for (const d of all) { check(!d.errs.length, 'no script errors: ' + d.errs.join(' | '), R); await d.b.close(); }
console.log(R.join('\n'));
