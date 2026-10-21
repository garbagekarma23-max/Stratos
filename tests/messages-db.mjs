// Checks the messages rules in supabase/messages.sql with no browser. All three SQL files are loaded into PGlite
// (Postgres running inside Node) through fake-supabase.mjs, then each call runs as one student, as another, or as
// someone not signed in. Slurs are read from the banned_words table, never spelled out here.
import fs from 'fs';
import { fakeSupabase } from './fake-supabase.mjs';
import { check } from './lib.mjs';

const R = [];
const f = await fakeSupabase();
const MESSAGES_SQL = fs.readFileSync(new URL('../supabase/messages.sql', import.meta.url), 'utf8');
let n = 0;
async function call(uid, fn, args = {}) {
  const keys = Object.keys(args);
  const r = await f.as(uid, 'select public.' + fn + '(' + keys.map((k, i) => k + ' => $' + (i + 1)).join(', ') + ') as v', keys.map(k => args[k]));
  return r.rows[0].v;
}
const fails = async (uid, sql, params) => { try { await f.as(uid, sql, params); return false; } catch (e) { return e.code || true; } };
const admin = async (sql, params) => (await f.admin(sql, params)).rows;
const user = async name => {
  const u = await f.user((name || 'm' + (++n)) + '@example.com');
  if (name) await call(u.id, 'set_username', {new_username: name});
  return u;
};
// Make two students friends, and give back the ref of their friendship as each sees it (the same ref).
async function friends(x, y) {
  await call(x.id, 'send_friend_request', {friend_code: (await call(y.id, 'friends_state')).me.code});
  const r = (await call(y.id, 'friends_state')).incoming[0].ref;
  await call(y.id, 'accept_friend_request', {ref: r});
  return (await call(x.id, 'friends_state')).friends.find(fr => fr.username === (y.name || fr.username)).ref;
}
async function pair(nameA, nameB) {
  const a = await user(nameA), b = await user(nameB);
  a.name = nameA; b.name = nameB;
  const ref = await friends(a, b);
  return {a, b, ref};
}
async function open(p) {
  await call(p.a.id, 'ask_to_message', {friend: p.ref});
  await call(p.b.id, 'accept_message_request', {friend: p.ref});
}
const chatOf = async (uid, ref) => (await call(uid, 'chats_state')).chats.find(c => c.ref === ref) || {state: 'none'};
const send = async (uid, ref, body) => call(uid, 'send_message', {friend: ref, body});
const msgs = async (uid, ref, extra = {}) => call(uid, 'chat_messages', Object.assign({friend: ref}, extra));
const keysOf = o => Object.keys(o).sort().join(',');
const leaks = (s, u) => JSON.stringify(s).includes(u.id) || JSON.stringify(s).includes(u.email);
// Clear a student's message log, so the limits do not get in the way of a later check.
const fresh = uid => f.admin('delete from public.message_log where user_id = $1', [uid]);
const TABLES = ['chats', 'messages', 'message_log'];
const APP = ['chats_state', 'ask_to_message', 'accept_message_request', 'decline_message_request', 'cancel_message_request',
  'chat_messages', 'send_message', 'report_message', 'seen_notice'];
const Z = "'00000000-0000-0000-0000-000000000000'";

// ---------- locked tables, the moderation schema, and who may call what ----------
const rls = await admin("select c.relname, c.relrowsecurity, n.nspname from pg_class c join pg_namespace n on n.oid = c.relnamespace where c.relkind = 'r' and n.nspname in ('public', 'moderation')");
check(TABLES.every(t => rls.some(r => r.relname === t && r.nspname === 'public' && r.relrowsecurity)), 'row-level security is on for chats, messages and message_log', R);
check(['reports', 'bans', 'notices', 'actions'].every(t => rls.some(r => r.relname === t && r.nspname === 'moderation' && r.relrowsecurity)), 'and for every table in the moderation schema', R);
const pol = (await admin("select count(*)::int c from pg_policies where (schemaname = 'public' and tablename = any($1)) or schemaname = 'moderation'", [TABLES]))[0].c;
check(pol === 0, 'none of them has a rule for students, so only the functions reach them', R);
const p1 = await pair('ana.msg', 'ben.msg');
let blocked = 0;
for (const t of TABLES) {
  if (await fails(p1.a.id, 'select * from public.' + t) === '42501') blocked++;
  if (await fails(null, 'select * from public.' + t) === '42501') blocked++;
}
check(blocked === 6, 'no student and nobody signed out can read chats, messages or the log directly', R);
let mod = 0;
for (const t of ['reports', 'bans', 'notices', 'actions', 'open_reports', 'refusals', 'history']) {
  if (await fails(p1.a.id, 'select * from moderation.' + t) === '42501') mod++;
  if (await fails(null, 'select * from moderation.' + t) === '42501') mod++;
}
check(mod === 14, 'no student and nobody signed out can reach any table or view in the moderation schema', R);
check(await fails(p1.a.id, "select moderation.warn(" + Z + ")") === '42501' && await fails(p1.a.id, "select moderation.unban('ben.msg')") === '42501' && await fails(p1.a.id, 'select moderation.cleanup()') === '42501',
  'or call a moderation function', R);
const schemaUse = (await admin("select has_schema_privilege('authenticated', 'moderation', 'usage') a, has_schema_privilege('anon', 'moderation', 'usage') b"))[0];
check(!schemaUse.a && !schemaUse.b, 'signed-in students and people signed out have no use of the moderation schema at all', R);
check(await fails(p1.a.id, "insert into public.messages (chat, n, sender, body) values (gen_random_uuid(), 1, $1, 'hi')", [p1.a.id]) === '42501', 'a student cannot write a message directly, past the filter', R);
check(await fails(p1.a.id, "update public.banned_words set in_messages = false") === '42501', 'or change which words messages refuse', R);
let anonOut = 0;
for (const fn of APP) {
  const args = fn === 'chats_state' || fn === 'seen_notice' ? '' : fn === 'send_message' ? Z + ", 'hi'" : fn === 'report_message' ? Z + ", 1, 'spam'" : Z;
  if (await fails(null, 'select public.' + fn + '(' + args + ')') === '42501') anonOut++;
}
check(anonOut === APP.length, 'someone not signed in can call none of the ' + APP.length + ' message functions', R);
check(await fails(p1.a.id, "select public.message_problem('x')") === '42501' && await fails(p1.a.id, "select public.msg_norm('x')") === '42501' && await fails(p1.a.id, 'select public.msg_ban($1)', [p1.b.id]) === '42501',
  'the filter and the other helpers cannot be called by a student', R);

// ---------- message requests ----------
const stranger = await user('cal.msg');
check((await call(stranger.id, 'ask_to_message', {friend: p1.ref})).result === 'gone' && (await msgs(stranger.id, p1.ref)).result === 'gone' && (await send(stranger.id, p1.ref, 'hi')).result === 'gone',
  'a student who is not in the friendship cannot ask, read or send with its ref', R);
check((await chatOf(p1.a.id, p1.ref)).state === 'none' && (await send(p1.a.id, p1.ref, 'hi')).result === 'closed', 'friends start with no chat, and cannot send a message yet', R);
check((await call(p1.a.id, 'ask_to_message', {friend: p1.ref})).result === 'sent', 'a friend can send a message request', R);
check((await chatOf(p1.a.id, p1.ref)).state === 'sent' && (await chatOf(p1.b.id, p1.ref)).state === 'asked', 'the sender sees sent and the friend sees asked', R);
check((await send(p1.a.id, p1.ref, 'hi')).result === 'closed' && (await send(p1.b.id, p1.ref, 'hi')).result === 'closed', 'neither can send a message until it is accepted', R);
check((await call(p1.a.id, 'ask_to_message', {friend: p1.ref})).result === 'sent_already' && (await call(p1.a.id, 'accept_message_request', {friend: p1.ref})).result === 'gone',
  'asking again says sent already, and the sender cannot accept their own request', R);
check((await call(p1.b.id, 'decline_message_request', {friend: p1.ref})) === 'ok', 'the friend can decline', R);
check((await chatOf(p1.b.id, p1.ref)).state === 'none' && (await chatOf(p1.a.id, p1.ref)).state === 'sent', 'a decline is silent: it goes from the friend\'s side, and the sender still sees it waiting', R);
check((await call(p1.a.id, 'cancel_message_request', {friend: p1.ref})) === 'ok' && (await call(p1.a.id, 'ask_to_message', {friend: p1.ref})).result === 'sent' && (await chatOf(p1.b.id, p1.ref)).state === 'none',
  'cancelling and asking again inside 7 days does not show the friend a new request', R);
await f.admin("update public.chats set declined_at = declined_at - interval '8 days' where friendship = $1", [p1.ref]);
check((await chatOf(p1.b.id, p1.ref)).state === 'asked', 'once 7 days have passed since the decline, the new request shows', R);
check((await call(p1.b.id, 'accept_message_request', {friend: p1.ref})).result === 'open' && (await chatOf(p1.a.id, p1.ref)).state === 'open' && (await chatOf(p1.b.id, p1.ref)).state === 'open',
  'accepting opens the chat for both', R);
check((await call(p1.a.id, 'ask_to_message', {friend: p1.ref})).result === 'open_already', 'asking in an open chat says so', R);
const p2 = await pair('dee.msg', 'eli.msg');
await call(p2.a.id, 'ask_to_message', {friend: p2.ref});
check((await call(p2.b.id, 'ask_to_message', {friend: p2.ref})).result === 'open' && (await chatOf(p2.a.id, p2.ref)).state === 'open', 'asking each other opens the chat at once', R);
const p3 = await pair('fay.msg', 'gus.msg');
await call(p3.a.id, 'ask_to_message', {friend: p3.ref});
check((await call(p3.a.id, 'cancel_message_request', {friend: p3.ref})) === 'ok' && (await chatOf(p3.b.id, p3.ref)).state === 'none' && (await call(p3.b.id, 'cancel_message_request', {friend: p3.ref})) === 'gone',
  'only the sender can cancel, and a cancelled request goes from both sides', R);
await call(p3.a.id, 'ask_to_message', {friend: p3.ref});
await f.admin("update public.chats set asked_at = asked_at - interval '31 days' where friendship = $1", [p3.ref]);
check((await chatOf(p3.a.id, p3.ref)).state === 'none' && (await chatOf(p3.b.id, p3.ref)).state === 'none', 'a request nobody answers in 30 days goes', R);
const asker = await user('hal.msg');
const askRefs = [];
for (let i = 0; i < 11; i++) { const o = await user(); askRefs.push(await friends(asker, o)); }
const asks = [];
for (const r of askRefs) asks.push((await call(asker.id, 'ask_to_message', {friend: r})).result);
check(asks.slice(0, 10).every(r => r === 'sent') && asks[10] === 'day', '10 message requests a day, then no more until the day has passed', R);

// ---------- sending and reading ----------
const sa = await send(p1.a.id, p1.ref, '  Hi Ben\r\n\r\n\r\n\r\nsee you\u0007 at lunch  ');
check(sa.result === 'ok' && sa.n === 1 && sa.care === false, 'a message is saved and numbered from 1', R);
let rb = await msgs(p1.b.id, p1.ref);
check(rb.messages.length === 1 && rb.messages[0].text === 'Hi Ben\n\nsee you at lunch', 'it is tidied: spaces trimmed, no more than one blank line, control characters gone', R);
check(keysOf(rb.messages[0]) === 'at,care,mine,n,text' && rb.messages[0].mine === false && keysOf(rb) === 'ban,messages,more,result,state', 'each message is only n, mine, text, time and care', R);
check((await chatOf(p1.b.id, p1.ref)).unread === 0 && (await chatOf(p1.a.id, p1.ref)).unread === 0, 'reading the chat counts it as seen, and your own messages are never unread', R);
await send(p1.a.id, p1.ref, 'two'); await send(p1.a.id, p1.ref, 'three');
const cs = await chatOf(p1.b.id, p1.ref);
check(cs.unread === 2 && cs.last.text === 'three' && cs.last.mine === false && keysOf(cs) === 'last,ref,state,unread', 'the list shows 2 unread and the last message', R);
check((await msgs(p1.b.id, p1.ref, {after_n: 1})).messages.map(m => m.n).join() === '2,3', 'asking for messages after one gives only the new ones', R);
check((await chatOf(p1.b.id, p1.ref)).unread === 0, 'and counts them as seen', R);
const all = [await call(p1.a.id, 'chats_state'), await call(p1.b.id, 'chats_state'), await msgs(p1.a.id, p1.ref), await msgs(p1.b.id, p1.ref)];
check(!all.some(s => leaks(s, p1.a) || leaks(s, p1.b)), 'no answer holds either student\'s account id or email', R);
check((await send(p1.b.id, p1.ref, '   ')).result === 'empty' && (await send(p1.b.id, p1.ref, 'x'.repeat(501))).result === 'long' && (await send(p1.b.id, p1.ref, 'é'.repeat(500))).result === 'ok',
  'a message must be 1 to 500 characters (500 accented letters are fine)', R);
check((await send(p1.b.id, p1.ref, '\u200b\u200b')).result === 'empty', 'a message of invisible characters only is empty', R);
await f.admin("insert into public.messages (chat, n, sender, body) select c.id, c.last_n + g, $2, 'old ' || (c.last_n + g) from public.chats c, generate_series(1, 120) g where friendship = $1", [p1.ref, p1.a.id]);
await f.admin('update public.chats set last_n = last_n + 120 where friendship = $1', [p1.ref]);
const latest = await msgs(p1.b.id, p1.ref);
check(latest.messages.length === 100 && latest.more === true && latest.messages[99].n === 124, 'opening a long chat gives the latest 100, and says there are earlier ones', R);
const earlier = await msgs(p1.b.id, p1.ref, {before_n: latest.messages[0].n});
check(earlier.messages.length === 24 && earlier.messages[23].n === latest.messages[0].n - 1 && earlier.more === false, 'Show earlier gives the ones before, oldest first, and then no more', R);
await fresh(p1.a.id); await fresh(p1.b.id);

// ---------- limits ----------
const quick = [];
for (let i = 0; i < 11; i++) quick.push((await send(p2.a.id, p2.ref, 'msg ' + i)).result);
check(quick.slice(0, 10).every(r => r === 'ok') && quick[10] === 'soon', '10 messages a minute, then wait', R);
await f.admin("update public.message_log set at = at - interval '61 seconds' where user_id = $1", [p2.a.id]);
check((await send(p2.a.id, p2.ref, 'after a minute')).result === 'ok', 'after a minute messages send again', R);
await fresh(p2.a.id);
const refusedRun = [];
for (let i = 0; i < 10; i++) refusedRun.push((await send(p2.a.id, p2.ref, 'call 0412 345 67' + i)).result);
check(refusedRun.every(r => r === 'phone') && (await send(p2.a.id, p2.ref, 'hello')).result === 'soon', 'refused tries count toward the minute too', R);
const refusedLog = await admin("select reason from public.message_log where user_id = $1 and kind = 'refused'", [p2.a.id]);
check(refusedLog.length === 10 && refusedLog.every(r => r.reason === 'phone'), 'a refused message is counted with its reason', R);
check(!(await admin("select count(*)::int c from public.message_log where user_id = $1 and (reason like '%0412%')", [p2.a.id]))[0].c && !(await admin("select count(*)::int c from public.messages where body like 'call 0412%'"))[0].c,
  'and its text is never kept anywhere', R);
await fresh(p2.a.id);
await f.admin("insert into public.message_log (user_id, kind, at) select $1, 'sent', now() - interval '2 hours' from generate_series(1, 300)", [p2.a.id]);
check((await send(p2.a.id, p2.ref, 'one more')).result === 'day', '300 messages a day, then no more until the day has passed', R);
await fresh(p2.a.id);

// ---------- the filter ----------
const anyWord = (await admin("select word from public.banned_words where in_messages and anywhere and char_length(word) between 4 and 6 and word ~ '[aeiost]' order by word limit 1"))[0].word;
const wholeWord = (await admin("select word from public.banned_words where in_messages and not anywhere and char_length(word) >= 4 and word ~ '[aeiost]' order by word limit 1"))[0].word;
const doubled = (await admin("select word from public.banned_words where in_messages and anywhere and word ~ '(.)\\1' order by word limit 1"))[0].word;
const leet = w => w.replace(/s/, '5').replace(/a/, '4').replace(/e/, '3').replace(/o/, '0').replace(/i/, '1').replace(/t/, '7');
const stretch = w => w.replace(/([aeiou])/, '$1$1$1$1');
const names = (await admin("select word from public.banned_words where not in_messages")).map(r => r.word);
const refuse = [
  ['bullying', 'kys'], ['bullying', 'k y s'], ['bullying', 'just kill yourself'], ['bullying', 'go kill urself'], ['bullying', 'neck yourself lol'], ['bullying', 'i hope you die'],
  ['word', 'you ' + anyWord], ['word', 'xx' + anyWord + 'xx'], ['word', leet(anyWord)], ['word', stretch(anyWord)], ['word', anyWord.split('').join(' ')],
  ['word', anyWord.split('').join('.')], ['word', anyWord.toUpperCase() + '!'], ['word', 'what a ' + wholeWord], ['word', leet(wholeWord)],
  ['word', anyWord.replace(/a/, 'а').replace(/o/, 'о').replace(/e/, 'е')], ['word', anyWord.split('').map(c => String.fromCharCode(c.charCodeAt(0) + 0xfee0)).join('')],
  ['word', anyWord.split('').join('\u200b')],
  ['email', 'email me at ben@example.com'], ['email', 'ben (at) example dot com'], ['email', 'ben [at] example [dot] com'], ['email', 'its ben at gmail'], ['email', 'ben @ hotmail'],
  ['link', 'go to google.com'], ['link', 'www.example.org'], ['link', 'https://x.y'], ['link', 'hxxp://thing'], ['link', 'example dot com'], ['link', 'example (dot) com'],
  ['link', 'example[.]net'], ['link', 'g o o g l e . c o m'], ['link', 'bit.ly/abc'], ['link', 't.me/joe'], ['link', 'discord.gg/abc'], ['link', 'ｇ\uff4f\uff4fｇｌ\uff45．ｃ\uff4fｍ'], ['link', 'site.com.au'],
  ['offsite', 'add me on snap'], ['offsite', 'my snap is ben22'], ['offsite', 'dm me on insta'], ['offsite', 'follow me on tiktok'], ['offsite', 'text me on whatsapp'],
  ['offsite', 'hmu on discord'], ['offsite', "what's your phone"], ['offsite', 'whats ur insta'], ['offsite', '@ben_22'], ['offsite', 'find me @ben.k'], ['offsite', 'lets move to discord'],
  ['phone', '0412 345 678'], ['phone', '+61 412 345 678'], ['phone', '(02) 9876 5432'], ['phone', '0412-345-678'], ['phone', 'zero four one two three four five six seven eight'],
  ['phone', '04 one two 345 678'], ['phone', 'O4I2 345 678'], ['phone', '0 4 1 2 3 4 5 6 7 8'], ['phone', '4\ufe0f\u20e30\ufe0f\u20e34\ufe0f\u20e31\ufe0f\u20e32\ufe0f\u20e33\ufe0f\u20e34\ufe0f\u20e35\ufe0f\u20e3'],
  ['phone', 'GDP grew by 2 000 000 000'], ['phone', '1929 1933']
];
const allow = [
  'see you at lunch', 'Hitler and the Nazis wrecked the Weimar economy', 'Nazi Germany', 'homo economicus is a model', 'sex discrimination in wages',
  'damn', 'that was crap', 'the penis, the vagina and the testicles', 'Nigeria and Niger', 'the classic grass', 'the dot com bubble', 'the dot-com crash',
  'GDP was 1,250,000,000', 'from 2008-2009 the GFC hit', '2008-09', 'pi is 3.14159265', 'the U.K. and the U.S.', 'e.g. inflation, i.e. prices', 'I use snapchat',
  'saw it on insta', 'Discord is down', 'x = 12 or x = -3', 'meet @ lunch', '21/10/2026', 'Question 3 is 45 marks', 'I feel suicidal', 'I want to die', 'self-harm',
  'kms', 'I keep cutting myself', 'Mitsubishi', 'happiness'
];
const wrongRefuse = [], wrongAllow = [];
for (const [why, text] of refuse) { const got = (await admin('select public.message_problem($1) p', [text]))[0].p; if (got !== why) wrongRefuse.push(JSON.stringify(text) + ' gave ' + got + ', not ' + why); }
for (const text of allow) { const got = (await admin('select public.message_problem($1) p', [text]))[0].p; if (got !== null) wrongAllow.push(JSON.stringify(text) + ' gave ' + got); }
check(!wrongRefuse.length, refuse.length + ' messages are refused, each for the right reason' + (wrongRefuse.length ? ': ' + wrongRefuse.join('; ') : ''), R);
check(!wrongAllow.length, allow.length + ' messages pass, including history, biology, economics, mild words and numbers' + (wrongAllow.length ? ': ' + wrongAllow.join('; ') : ''), R);
const nameOnly = names.filter(w => !['kys', 'killyourself'].includes(w));
const passNames = [];
for (const w of nameOnly) { const got = (await admin('select public.message_problem($1) p', ['the ' + w + ' thing']))[0].p; if (got !== null) passNames.push(w + ' (' + got + ')'); }
check(!passNames.length, 'every word banned in usernames but not ticked for messages passes in a message (' + nameOnly.length + ' words)' + (passNames.length ? ': ' + passNames.length + ' did not' : ''), R);
check((await admin("select public.message_problem($1) p", [doubled.replace(/(.)\1/, '$1')]))[0].p === null, 'a banned word with a double letter is not matched by the same word with one letter, so Nigeria is safe', R);
const knownWrong = ['scunthorpe', 'fire retardant'];
const kw = [];
for (const t of knownWrong) kw.push((await admin('select public.message_problem($1) p', [t]))[0].p);
check(kw.every(r => r === 'word'), 'known wrong blocks, written down so a change shows: Scunthorpe and "fire retardant" are refused', R);
const careOf = async t => (await admin('select public.message_care($1) c', [t]))[0].c;
const cares = ['I feel suicidal', 'thinking about suicide', 'I self-harm', 'self harm', 'I want to die', 'i wanna die', 'kms', 'I want to kill myself', 'I keep hurting myself', "I don't want to be here anymore", 'better off dead'];
const notCares = ['the dot com bubble', 'kill the lights', 'I died laughing', 'this homework is killing me', 'die Mauer'];
const careWrong = [];
for (const t of cares) if (!(await careOf(t))) careWrong.push(t);
for (const t of notCares) if (await careOf(t)) careWrong.push('not: ' + t);
check(!careWrong.length, 'words about how a student feels are marked care, and ordinary words are not' + (careWrong.length ? ': ' + careWrong.join('; ') : ''), R);
const sc = await send(p1.a.id, p1.ref, 'honestly I want to die');
const scB = await msgs(p1.b.id, p1.ref);
check(sc.result === 'ok' && sc.care === true && scB.messages[scB.messages.length - 1].care === true, 'such a message is sent, and both sides get it marked care', R);
const word0 = await send(p1.a.id, p1.ref, 'you ' + anyWord);
check(word0.result === 'word' && (await msgs(p1.b.id, p1.ref)).messages.length === scB.messages.length, 'a refused message is not saved', R);
await fresh(p1.a.id);

// ---------- reports ----------
const ref = p1.ref;
for (let i = 0; i < 12; i++) { await send(p1.b.id, ref, 'b says ' + i); await send(p1.a.id, ref, 'a says ' + i); await fresh(p1.a.id); await fresh(p1.b.id); }
await fresh(p1.a.id); await fresh(p1.b.id);
const list = (await msgs(p1.a.id, ref)).messages;
const target = list.filter(m => !m.mine)[6];
check((await call(p1.a.id, 'report_message', {friend: ref, n: list.filter(m => m.mine)[0].n, reason: 'bullying'})) === 'own', 'you cannot report your own message', R);
check((await call(p1.a.id, 'report_message', {friend: ref, n: target.n, reason: 'mean'})) === 'bad', 'the reason must be one of the list', R);
check((await call(stranger.id, 'report_message', {friend: ref, n: target.n, reason: 'spam'})) === 'gone', 'a student outside the chat cannot report in it', R);
check((await call(p1.a.id, 'report_message', {friend: ref, n: target.n, reason: 'bullying'})) === 'ok', 'a student can report a friend\'s message', R);
const rep = (await admin('select * from moderation.reports'))[0];
check(rep.reporter === p1.a.id && rep.reported === p1.b.id && rep.reason === 'bullying' && rep.status === 'new', 'the report names both students, the reason and is new', R);
check(rep.messages.length === 21 && rep.messages.filter(m => m.this).length === 1 && rep.messages.find(m => m.this).n === target.n && rep.messages[0].n === target.n - 10 && rep.messages[20].n === target.n + 10,
  'it copies the message and the 10 messages either side, with the reported one marked', R);
check(rep.messages.every(m => (m.from === 'reported') === m.text.startsWith('b says') || m.from === 'reporter' && !m.text.startsWith('b says')), 'each copied message says whether it is from the reporter or the reported student', R);
check((await call(p1.a.id, 'report_message', {friend: ref, n: target.n, reason: 'spam'})) === 'already', 'the same message cannot be reported twice', R);
const bState = JSON.stringify([await call(p1.b.id, 'chats_state'), await msgs(p1.b.id, ref)]);
check(!/report/i.test(bState) && (await call(p1.b.id, 'chats_state')).me.warned === false, 'the reported student is not told', R);
const others = list.filter(m => !m.mine && m.n !== target.n);
await f.admin("insert into public.message_log (user_id, kind, at) select $1, 'report', now() - interval '2 hours' from generate_series(1, 18)", [p1.a.id]);
const rep20 = await call(p1.a.id, 'report_message', {friend: ref, n: others[0].n, reason: 'other'});
const rep21 = await call(p1.a.id, 'report_message', {friend: ref, n: others[1].n, reason: 'other'});
check(rep20 === 'ok' && rep21 === 'day', '20 reports a day, then no more until the day has passed', R);
await fresh(p1.a.id);
await f.admin("delete from moderation.reports where id <> $1", [rep.id]);

// ---------- moderation ----------
const open1 = (await admin('select * from moderation.open_reports'))[0];
check(open1.id === rep.id && open1.reporter === '@ana.msg' && open1.reported === '@ben.msg' && open1.conversation.split('\n').length === 21, 'open_reports lists the report with both usernames and the conversation written out', R);
check(open1.conversation.split('\n').filter(l => l.startsWith('>> @ben.msg: b says')).length === 1 && open1.conversation.includes('   @ana.msg: a says'), 'the reported line is marked >>', R);
check((await admin("select moderation.reviewed($1) r", [rep.id]))[0].r === 'Report marked reviewed.' && !(await admin('select * from moderation.open_reports')).length, 'reviewed marks it and takes it off the list', R);
check((await admin("select moderation.warn($1) r", [rep.id]))[0].r.startsWith('Warned @ben.msg') && (await call(p1.b.id, 'chats_state')).me.warned === true, 'warn says so, and the student has a warning waiting', R);
await call(p1.b.id, 'seen_notice');
check((await call(p1.b.id, 'chats_state')).me.warned === false && (await call(p1.a.id, 'chats_state')).me.warned === false, 'once seen it does not come back, and the reporter never had one', R);
const banMsg = (await admin("select moderation.ban($1, 7) r", [rep.id]))[0].r;
check(/^Banned @ben\.msg from messaging until \d+ \w+ \d{4}/.test(banMsg), 'ban says who and until when: ' + banMsg, R);
const banned = await send(p1.b.id, ref, 'hello');
check(banned.result === 'banned' && banned.until && new Date(banned.until) > new Date(Date.now() + 6.9 * 864e5), 'a banned student cannot send, and is told until when', R);
const pB = await user(); const refB = await friends(p1.b, pB);
check((await call(p1.b.id, 'ask_to_message', {friend: refB})).result === 'banned', 'or send a message request', R);
await call(pB.id, 'ask_to_message', {friend: refB});
check((await call(p1.b.id, 'accept_message_request', {friend: refB})).result === 'banned', 'or accept one', R);
check((await msgs(p1.b.id, ref)).messages.length > 0 && (await msgs(p1.b.id, ref)).ban.until && (await call(p1.b.id, 'chats_state')).me.ban.until, 'they can still read their chats, and both answers say they are banned', R);
check((await admin("select moderation.unban('BEN.msg') r"))[0].r === '@ben.msg can send messages again.' && (await send(p1.b.id, ref, 'hello again')).result === 'ok', 'unban lifts it', R);
check((await admin("select moderation.ban_user('@ben.msg', null) r"))[0].r === 'Banned @ben.msg from messaging until you lift it.' && (await send(p1.b.id, ref, 'x')).result === 'banned' && (await call(p1.b.id, 'chats_state')).me.ban.until === null,
  'ban_user bans by username, and null means always', R);
await f.admin("update moderation.bans set until = now() - interval '1 minute'");
check((await send(p1.b.id, ref, 'later')).result === 'ok', 'a ban with an end stops at that time', R);
check((await admin("select moderation.ban_user('nobody.here', 3) r"))[0].r === 'No student with that username.' && (await admin("select moderation.warn(" + Z + ") r"))[0].r === 'No report with that id.' && (await admin("select moderation.ban($1, 0) r", [rep.id]))[0].r.startsWith('Days must'),
  'a wrong username, report id or number of days is answered in words', R);
const hist = await admin('select * from moderation.history');
check(hist.map(h => h.action).join() === 'banned,unbanned,banned,warned,reviewed' && hist.every(h => h.username === '@ben.msg'), 'history lists every action, newest first', R);
await send(p2.a.id, p2.ref, 'call me 0412 345 678');
const refusals = await admin('select * from moderation.refusals');
check(refusals.some(r => r.student === '@dee.msg' && r.reason === 'phone' && Number(r.refused) >= 1), 'refusals counts refused messages by student and reason', R);

// ---------- removing, blocking and deleting ----------
const chatRows = async r => (await admin('select count(*)::int c from public.chats ch join public.messages m on m.chat = ch.id where ch.friendship = $1', [r]))[0].c;
check(await chatRows(p2.ref) > 0, 'a chat has messages', R);
await call(p2.a.id, 'remove_friend', {ref: p2.ref});
check(await chatRows(p2.ref) === 0 && !(await admin('select 1 from public.chats where friendship = $1', [p2.ref])).length, 'removing a friend deletes the chat and every message, for both', R);
const p4 = await pair('ivy.msg', 'jon.msg');
await open(p4);
await send(p4.b.id, p4.ref, 'something mean');
const n4 = (await msgs(p4.a.id, p4.ref)).messages[0].n;
await call(p4.a.id, 'report_message', {friend: p4.ref, n: n4, reason: 'bullying'});
await call(p4.a.id, 'block_student', {ref: p4.ref});
check(!(await admin('select 1 from public.chats where friendship = $1', [p4.ref])).length && (await admin("select count(*)::int c from moderation.reports where messages::text like '%something mean%'"))[0].c === 1,
  'blocking deletes the chat too, but a report made first keeps its copy', R);
const p5 = await pair('kai.msg', 'lou.msg');
await open(p5);
await send(p5.a.id, p5.ref, 'hi'); await send(p5.b.id, p5.ref, 'mean thing');
await call(p5.a.id, 'report_message', {friend: p5.ref, n: 2, reason: 'spam'});
await admin("select moderation.ban(id, 3) from moderation.reports where messages::text like '%mean thing%'");
await admin("select moderation.warn(id) from moderation.reports where messages::text like '%mean thing%'");
await f.as(p5.b.id, 'select public.delete_account()');
const leftB = (await admin(`select (select count(*) from public.chats where a = $1 or b = $1) + (select count(*) from public.messages where sender = $1) +
  (select count(*) from public.message_log where user_id = $1) + (select count(*) from moderation.bans where user_id = $1) +
  (select count(*) from moderation.notices where user_id = $1) + (select count(*) from moderation.actions where user_id = $1) as n`, [p5.b.id]))[0].n;
check(Number(leftB) === 0, 'deleting an account deletes its chats, messages, log, bans, warnings and history', R);
const kept = (await admin("select * from moderation.reports where messages::text like '%mean thing%'"))[0];
check(kept && kept.reported === null && kept.reporter === p5.a.id, 'a report about the deleted account stays, with its account id cleared', R);
await f.as(p5.a.id, 'select public.delete_account()');
const kept2 = (await admin("select * from moderation.reports where messages::text like '%mean thing%'"))[0];
check(kept2 && kept2.reporter === null && kept2.messages.length === 2, 'and when the reporter goes too, the copy stays with both ids cleared', R);
check((await admin("select reported from moderation.open_reports where conversation like '%mean thing%'")).every(r => r.reported === '(deleted account)'), 'open_reports shows a deleted account as deleted', R);

// ---------- how long things are kept ----------
const p6 = await pair('max.msg', 'noa.msg');
await open(p6);
await send(p6.a.id, p6.ref, 'old one'); await send(p6.a.id, p6.ref, 'new one');
await f.admin("update public.messages m set sent_at = now() - interval '91 days' from public.chats c where c.id = m.chat and c.friendship = $1 and m.n = 1", [p6.ref]);
const kept6 = await msgs(p6.b.id, p6.ref);
check(kept6.messages.map(m => m.text).join() === 'new one' && kept6.more === false, 'a message older than 90 days is never shown, even before the clean-up runs', R);
check((await call(p6.a.id, 'report_message', {friend: p6.ref, n: 1, reason: 'spam'})) === 'gone', 'and cannot be reported', R);
await f.admin("update moderation.reports set at = now() - interval '13 months' where messages::text like '%something mean%'");
await f.admin("insert into public.message_log (user_id, kind, reason, at) values ($1, 'refused', 'phone', now() - interval '8 days')", [p6.a.id]);
const clean = (await admin('select moderation.cleanup() r'))[0].r;
check(/^\d+ old messages deleted\.$/.test(clean) && !(await admin("select 1 from public.messages where body = 'old one'")).length && (await admin("select 1 from public.messages where body = 'new one'")).length === 1,
  'the clean-up deletes messages older than 90 days and keeps the rest', R);
check(!(await admin("select 1 from moderation.reports where messages::text like '%something mean%'")).length && (await admin('select count(*)::int c from moderation.reports'))[0].c > 0, 'and reports older than 12 months', R);
check(!(await admin("select 1 from public.message_log where at < now() - interval '7 days'")).length, 'and old log rows', R);

// ---------- running the file again ----------
const count = async () => (await admin('select (select count(*) from public.chats) + (select count(*) from public.messages) + (select count(*) from moderation.reports) as n'))[0].n;
await f.admin("update public.banned_words set in_messages = true where word = $1", [nameOnly[0]]);
const was = await count();
await f.db.exec(MESSAGES_SQL);
check(Number(await count()) === Number(was), 'running messages.sql a second time keeps chats, messages and reports', R);
check((await admin('select in_messages from public.banned_words where word = $1', [nameOnly[0]]))[0].in_messages === true, 'and keeps a word the owner ticked for messages', R);

console.log(R.join('\n'));
