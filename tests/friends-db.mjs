// Checks the friends rules in supabase/friends.sql with no browser. Both SQL files are loaded into PGlite (Postgres
// running inside Node) through fake-supabase.mjs, then each call runs as one student, as another, or as someone not
// signed in, and the test checks what the database lets through. Banned words are read from the table, never
// spelled out here.
import fs from 'fs';
import { fakeSupabase } from './fake-supabase.mjs';
import { check } from './lib.mjs';

const R = [];
const f = await fakeSupabase();
const FRIENDS_SQL = fs.readFileSync(new URL('../supabase/friends.sql', import.meta.url), 'utf8');
let n = 0;
const user = async (name, findable = true) => {
  const u = await f.user((name || 'u' + (++n)) + '@example.com');
  if (name) {
    const r = await call(u.id, 'set_username', {new_username: name});
    if (r.result !== 'ok') throw new Error('could not set ' + name + ': ' + r.result);
    if (!findable) await call(u.id, 'set_findable', {findable_on: false});
  }
  return u;
};
// Call one of the app's functions as a student, by name, the way the app does.
async function call(uid, fn, args = {}) {
  const keys = Object.keys(args);
  const r = await f.as(uid, 'select public.' + fn + '(' + keys.map((k, i) => k + ' => $' + (i + 1)).join(', ') + ') as v', keys.map(k => args[k]));
  return r.rows[0].v;
}
const fails = async (uid, sql, params) => { try { await f.as(uid, sql, params); return false; } catch (e) { return e.code || true; } };
const failMsg = async (uid, sql, params) => { try { await f.as(uid, sql, params); return ''; } catch (e) { return e.message; } };
const state = uid => call(uid, 'friends_state');
const codeOf = async uid => (await state(uid)).me.code;
const logs = async (uid, kind) => (await f.admin('select count(*)::int c from public.friend_log where user_id = $1 and kind = $2', [uid, kind])).rows[0].c;
const inWindow = async uid => (await f.admin("select count(*)::int c from public.friend_log where user_id = $1 and kind in ('search', 'taken') and at > now() - interval '15 minutes'", [uid])).rows[0].c;
// Move a student's log, and the list of students their searches showed, back in time.
const ago = async (uid, mins) => {
  await f.admin('update public.friend_log set at = at - make_interval(mins => $2) where user_id = $1', [uid, mins]);
  await f.admin('update public.friend_seen set at = at - make_interval(mins => $2) where user_id = $1', [uid, mins]);
};
const keysOf = o => Object.keys(o).sort().join(',');
const TABLES = ['friend_codes', 'friend_requests', 'friendships', 'blocks', 'friend_log', 'friend_seen', 'banned_words'];
const APP = ['friends_state', 'set_username', 'set_findable', 'new_friend_code', 'find_students', 'send_friend_request_to',
  'send_friend_request', 'accept_friend_request', 'decline_friend_request', 'cancel_friend_request', 'remove_friend', 'block_student', 'unblock_student'];
// The functions in supabase/messages.sql, which fake-supabase.mjs loads too. messages-db.mjs checks them.
const MESSAGES = ['chats_state', 'ask_to_message', 'accept_message_request', 'decline_message_request', 'cancel_message_request',
  'chat_messages', 'send_message', 'report_message', 'seen_notice'];

// ---------- locked tables, and who may call what ----------
const rls = (await f.admin("select c.relname, c.relrowsecurity from pg_class c join pg_namespace n on n.oid = c.relnamespace where n.nspname = 'public' and c.relkind = 'r'")).rows;
check(TABLES.every(t => rls.some(r => r.relname === t && r.relrowsecurity)), 'row-level security is on for every friends table', R);
const pol = (await f.admin("select count(*)::int c from pg_policies where schemaname = 'public' and tablename = any($1)", [TABLES])).rows[0].c;
check(pol === 0, 'the friends tables have no rules for students at all, so only the functions reach them', R);
const a = await user('ace.test'), b = await user('bee.test');
let blocked = 0;
for (const t of TABLES) {
  if (await fails(a.id, 'select * from public.' + t) === '42501') blocked++;
  if (await fails(null, 'select * from public.' + t) === '42501') blocked++;
}
check(blocked === TABLES.length * 2, 'no student and nobody signed out can read any friends table directly', R);
check(await fails(a.id, 'insert into public.friendships (a, b) values ($1, $2)', [a.id < b.id ? a.id : b.id, a.id < b.id ? b.id : a.id]) === '42501', 'a student cannot make a friendship directly', R);
check(await fails(a.id, 'insert into public.friend_requests (from_id, to_id) values ($1, $2)', [a.id, b.id]) === '42501', 'a student cannot add a request directly', R);
check(await fails(a.id, 'delete from public.blocks') === '42501', 'a student cannot remove blocks directly', R);
check(await fails(a.id, "insert into public.banned_words (word) values ('zzz')") === '42501', 'a student cannot change the banned words', R);
let anonOut = 0;
for (const fn of APP) if (await fails(null, 'select public.' + fn + '(' + (/(accept|decline|cancel|remove|block|unblock)/.test(fn) ? "'00000000-0000-0000-0000-000000000000'" : /^(set_username|find_students|send_friend_request_to|send_friend_request)$/.test(fn) ? "'abc'" : fn === 'set_findable' ? 'true' : '') + ')') === '42501') anonOut++;
check(anonOut === APP.length, 'someone not signed in can call none of the ' + APP.length + ' friends functions', R);
const exposed = (await f.admin("select p.proname from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname = 'public' and p.prorettype <> 'trigger'::regtype and has_function_privilege('authenticated', p.oid, 'execute') order by 1")).rows.map(r => r.proname);
check(exposed.join() === APP.concat(MESSAGES, ['delete_account']).sort().join(), 'signed-in students can call exactly the app functions (friends and messages) and delete_account, no helpers: ' + exposed.join(', '), R);
const anonFns = (await f.admin("select p.proname from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname = 'public' and p.prorettype <> 'trigger'::regtype and has_function_privilege('anon', p.oid, 'execute')")).rows;
check(anonFns.length === 0, 'someone not signed in can call no function at all', R);
check(await fails(a.id, "select public.has_banned_word('x')") === '42501' && await fails(a.id, 'select public.friend_ask($1, $2, null, null)', [a.id, b.id]) === '42501' && await fails(a.id, 'select public.code_of($1)', [b.id]) === '42501',
  'helpers (the banned-word check, friend_ask, code_of) cannot be called by a student', R);

// ---------- codes ----------
const codes = (await f.admin('select public.make_friend_code() c from generate_series(1, 2000)')).rows.map(r => r.c);
check(codes.every(c => /^[2-9A-HJKMNP-Z]{8}$/.test(c)), '2,000 codes are all 8 characters, with no 0, O, 1, I or L', R);
check(new Set(codes.join('')).size === 31, 'every one of the 31 allowed characters turns up', R);
const anyBanned = (await f.admin('select count(*)::int c from unnest($1::text[]) x where public.has_banned_word(x)', [codes])).rows[0].c;
check(anyBanned === 0, 'no code spells a banned word', R);
const aCode = await codeOf(a.id);
check(aCode === await codeOf(a.id), 'a student keeps the same code until they make a new one', R);

// ---------- usernames ----------
const c = await user();
const un = async (uid, name) => (await call(uid, 'set_username', {new_username: name})).result;
check(await un(c.id, 'ab') === 'bad' && await un(c.id, 'a'.repeat(21)) === 'bad', 'a username must be 3 to 20 characters', R);
check(await un(c.id, 'a b c') === 'bad' && await un(c.id, 'abc%') === 'bad' && await un(c.id, 'abc*') === 'bad' && await un(c.id, 'zoë.k') === 'bad' && await un(c.id, 'аce.k') === 'bad',
  'spaces, wildcards, accents and look-alike letters from other alphabets are refused', R);
check(await un(c.id, '.cat') === 'dots' && await un(c.id, 'cat.') === 'dots' && await un(c.id, 'ca..t') === 'dots', 'a username cannot start or end with a dot, or have two together', R);
check(await un(c.id, 'BEE.TEST') === 'taken' && await un(c.id, '@bee.test') === 'taken', 'usernames are unique, ignoring capitals and a leading @', R);
check(await un(c.id, 'admin') === 'taken' && await un(c.id, 'stratos_team') === 'taken' && await un(c.id, 's.t.r.a.t.o.s') === 'taken', 'reserved names answer taken', R);
const word = (await f.admin('select word from public.banned_words where anywhere order by word limit 1')).rows[0].word;
const wholeWord = (await f.admin("select word from public.banned_words where not anywhere and word ~ '[saeoit]' order by word limit 1")).rows[0].word;
const leet = w => w.replace(/s/, '5').replace(/a/, '4').replace(/e/, '3').replace(/o/, '0').replace(/i/, '1').replace(/t/, '7');
check(await un(c.id, 'xx' + word + 'xx') === 'banned' && await un(c.id, 'the.' + wholeWord) === 'banned' && await un(c.id, 'the_' + leet(wholeWord)) === 'banned',
  'a username with a banned word is refused: anywhere words inside a name, whole words between dots, and look-alike spellings', R);
check(await un(c.id, 'classic.grass') === 'ok', 'a short banned word inside a longer one ("classic", "grass") is fine', R);
const doubled = (await f.admin("select word from public.banned_words where anywhere and word ~ '(.)\\1' and word ~ '[aeiou]' order by word limit 1")).rows[0].word;
const stretched = w => w.replace(/([aeiou])/, '$1$1$1');
const g = await user();
check(await un(g.id, 'xx' + stretched(word)) === 'banned' && await un(g.id, 'xx' + stretched(doubled)) === 'banned', 'a banned word with a letter said over and over is still refused', R);
check(await un(g.id, 'xx' + doubled.replace(/(.)\1/, '$1')) === 'ok', 'but a word with a double letter is not matched by the same word with one letter', R);
const geo = [];
for (const name of ['nigeria', 'niger.fan', 'nigerian_k']) geo.push(await un((await user()).id, name));
check(geo.every(r => r === 'ok'), 'the usernames nigeria, niger.fan and nigerian_k are allowed: ' + geo.join(', '), R);
check((await f.admin("select public.has_banned_word('NigeriaFan') a, public.has_banned_word('Niger') b")).rows.every(r => !r.a && !r.b), 'and so are the call signs NigeriaFan and Niger', R);
check(await un(c.id, 'Cat.Test') === 'today', 'a username can change only once a day', R);
await f.admin("update public.profiles set username_at = now() - interval '25 hours' where id = $1", [c.id]);
check(await un(c.id, 'Cat.Test') === 'ok' && (await state(c.id)).me.username === 'cat.test', 'after a day it can change, and is kept in lower case', R);
check(await un(c.id, 'cat.test') === 'ok', 'setting the same username again is fine', R);
check(await fails(c.id, "update public.profiles set username = 'sneaky' where id = $1", [c.id]) === '42501', 'a student cannot write their username directly', R);
check(await fails(c.id, 'update public.profiles set findable = false where id = $1', [c.id]) === '42501', 'or the search switch', R);
const d0 = await f.user('fresh@example.com');
check(await fails(d0.id, "insert into public.profiles (id, username) values ($1, 'sneaky')", [d0.id]) === '42501', 'or add a profile with a username in it', R);

// ---------- call signs and banned words ----------
const banMsg = await failMsg(c.id, 'update public.profiles set call_sign = $1 where id = $2', [word.charAt(0).toUpperCase() + word.slice(1), c.id]);
check(banMsg === 'banned_word', 'a call sign with a banned word, written straight to profiles, is refused with banned_word', R);
check(await failMsg(c.id, 'update public.profiles set call_sign = $1 where id = $2', ['The ' + leet(wholeWord), c.id]) === 'banned_word', 'a look-alike spelling of a whole word is refused too', R);
check(await failMsg(d0.id, 'insert into public.profiles (id, call_sign) values ($1, $2)', [d0.id, word + '99']) === 'banned_word', 'and when the profile is first added', R);
check(await failMsg(c.id, "update public.profiles set call_sign = 'Classic' where id = $1", [c.id]) === '' && await failMsg(c.id, "update public.profiles set call_sign = 'Grass' where id = $1", [c.id]) === '',
  '"Classic" and "Grass" are fine as call signs', R);
await f.admin('alter table public.profiles disable trigger profiles_clean');
await f.admin('update public.profiles set call_sign = $1 where id = $2', [word, b.id]);
await f.admin('alter table public.profiles enable trigger profiles_clean');
await f.db.exec(FRIENDS_SQL);
check((await f.admin('select call_sign from public.profiles where id = $1', [b.id])).rows[0].call_sign === null, 'running friends.sql clears a call sign saved before the check that fails it', R);
await f.as(a.id, "update public.profiles set call_sign = 'Ace' where id = $1", [a.id]);
await f.as(b.id, "update public.profiles set call_sign = 'Bee' where id = $1", [b.id]);

// ---------- requests by code ----------
const bCode = await codeOf(b.id);
const typed = bCode.toLowerCase().slice(0, 4) + ' - ' + bCode.toLowerCase().slice(4);
check((await call(a.id, 'send_friend_request', {friend_code: typed})).result === 'sent', 'a code works typed in lower case with a space and a dash', R);
let sa = await state(a.id), sb = await state(b.id);
check(sb.incoming.length === 1 && keysOf(sb.incoming[0]) === 'at,name,ref,username' && sb.incoming[0].name === 'Ace' && sb.incoming[0].username === 'ace.test',
  'the request shows on the other side with only a ref, the time, the call sign and the username', R);
check(sa.outgoing.length === 1 && sa.outgoing[0].code === bCode && sa.outgoing[0].asked === null && !('name' in sa.outgoing[0]) && !('username' in sa.outgoing[0]),
  'the sender sees only the code they typed, not who it reached', R);
const leaks = (s, u) => JSON.stringify(s).includes(u.id) || JSON.stringify(s).includes(u.email);
check(!leaks(sa, b) && !leaks(sb, a), 'neither side\'s answer holds the other\'s account id or email', R);
check((await call(a.id, 'send_friend_request', {friend_code: bCode})).result === 'sent_already', 'sending again says it is sent already', R);
check((await call(a.id, 'accept_friend_request', {ref: sb.incoming[0].ref})).result === 'gone', 'the sender cannot accept their own request', R);
check((await call(c.id, 'accept_friend_request', {ref: sb.incoming[0].ref})).result === 'gone' && (await call(c.id, 'decline_friend_request', {ref: sb.incoming[0].ref})) === 'gone',
  'another student cannot accept or decline it with its ref', R);
const acc = await call(b.id, 'accept_friend_request', {ref: sb.incoming[0].ref});
check(acc.result === 'friends' && acc.name === 'Ace', 'accepting makes them friends and names the friend', R);
sa = await state(a.id); sb = await state(b.id);
check(sa.friends.length === 1 && sb.friends.length === 1 && keysOf(sa.friends[0]) === 'name,ref,since,username' && sa.friends[0].name === 'Bee' && sb.friends[0].username === 'ace.test',
  'both lists show the friend with only a ref, since when, the call sign and the username', R);
check(!leaks(sa, b) && !leaks(sb, a) && !sa.incoming.length && !sa.outgoing.length, 'still no ids or emails, and the request is gone', R);
check((await call(a.id, 'send_friend_request', {friend_code: bCode})).result === 'friends_already', 'a code for a friend says already friends', R);
check((await call(a.id, 'send_friend_request', {friend_code: aCode})).result === 'self', 'your own code says so', R);
check((await call(c.id, 'remove_friend', {ref: sa.friends[0].ref})) === 'gone' && (await call(c.id, 'block_student', {ref: sa.friends[0].ref})) === 'gone' && (await state(a.id)).friends.length === 1,
  'another student cannot remove or block with someone else\'s friendship ref', R);
const p = await user('pat.test'), q = await user('quin.test');
await call(p.id, 'send_friend_request', {friend_code: await codeOf(q.id)});
const both = await call(q.id, 'send_friend_request', {friend_code: await codeOf(p.id)});
check(both.result === 'now_friends' && (await state(p.id)).friends.length === 1 && !(await state(q.id)).outgoing.length, 'asking each other makes two students friends, with no request left over', R);
const e = await user('eve.test');
await call(e.id, 'send_friend_request', {friend_code: aCode});
const eRef = (await state(a.id)).incoming[0].ref;
check((await call(a.id, 'decline_friend_request', {ref: eRef})) === 'ok' && !(await state(e.id)).outgoing.length && !(await state(a.id)).incoming.length, 'declining removes the request from both sides', R);
await call(e.id, 'send_friend_request', {friend_code: aCode});
const eOut = (await state(e.id)).outgoing[0].ref;
check((await call(a.id, 'cancel_friend_request', {ref: eOut})) === 'gone' && (await call(e.id, 'cancel_friend_request', {ref: eOut})) === 'ok' && !(await state(a.id)).incoming.length,
  'only the sender can cancel a request', R);
const oldB = bCode, newB = await call(b.id, 'new_friend_code');
check(newB !== oldB && /^[2-9A-HJKMNP-Z]{8}$/.test(newB) && (await call(e.id, 'send_friend_request', {friend_code: oldB})).result === 'wrong', 'a new code stops the old one working', R);
check((await call(e.id, 'send_friend_request', {friend_code: newB})).result === 'sent' && (await state(b.id)).friends.length === 1, 'the new one works, and friends stay friends', R);

// ---------- wrong codes are limited ----------
const w = await user();
const wrong = () => call(w.id, 'send_friend_request', {friend_code: '22222222'});
check((await call(w.id, 'send_friend_request', {friend_code: 'OOOO1111'})).result === 'bad' && await logs(w.id, 'wrong') === 0, 'a code with characters codes never have is refused without counting', R);
const five = [];
for (let i = 0; i < 5; i++) five.push((await wrong()).result);
check(five.every(r => r === 'wrong') && await logs(w.id, 'wrong') === 5, 'each wrong code is counted before the answer', R);
check((await wrong()).result === 'soon' && (await call(w.id, 'send_friend_request', {friend_code: newB})).result === 'soon', 'after 5 wrong codes in 15 minutes every code is refused, even a right one', R);
check((await call(w.id, 'find_students', {search: 'ace'})).result === 'ok', 'a wrong-code lock does not stop searching', R);
await ago(w.id, 16);
check((await call(w.id, 'send_friend_request', {friend_code: newB})).result === 'sent', 'after 15 minutes codes work again', R);
for (let i = 0; i < 14; i++) { await wrong(); if (i % 4 === 3) await ago(w.id, 16); }
await ago(w.id, 16);
check(await logs(w.id, 'wrong') === 19 && (await wrong()).result === 'wrong' && (await wrong()).result === 'day', 'after 20 wrong codes in a day codes are refused until the day has passed', R);
await ago(w.id, 24 * 60);
check((await wrong()).result === 'wrong' && await logs(w.id, 'wrong') === 1, 'log rows older than a day are cleared, and codes work again', R);

// ---------- search ----------
const s = await user('sam.test'), x = await user('xan.test'), y = await user('yas.test');
const names = ['mia.k', 'mia.kay', 'mia.q', 'mia_k', 'miami', 'mia.z'];
const mia = {};
for (const nm of names) mia[nm] = await user(nm);
mia.hidden = await user('mia.hidden', false);
mia.blocker = await user('mia.blocker');
mia.blocked = await user('mia.blocked');
const friendsWith = async (u1, u2) => { await call(u1.id, 'send_friend_request', {friend_code: await codeOf(u2.id)}); const r = (await state(u2.id)).incoming[0].ref; await call(u2.id, 'accept_friend_request', {ref: r}); };
await friendsWith(s, x); await friendsWith(s, y);
await friendsWith(mia['mia.z'], x); await friendsWith(mia['mia.z'], y); await friendsWith(mia.miami, x);
await friendsWith(mia.blocker, s);
await call(mia.blocker.id, 'block_student', {ref: (await state(mia.blocker.id)).friends.find(fr => fr.username === 'sam.test').ref});
await call(mia.blocked.id, 'send_friend_request', {friend_code: await codeOf(s.id)});
await call(s.id, 'block_student', {ref: (await state(s.id)).incoming[0].ref});
const find = async (uid, t) => call(uid, 'find_students', {search: t});
const res = await find(s.id, 'Mia');
check(res.result === 'ok' && res.found.length === 5, 'a search shows at most 5 usernames', R);
check(res.found.map(r => r.username).join() === 'mia.z,miami,mia.k,mia.kay,mia.q', 'mutual friends first, then A to Z: ' + res.found.map(r => r.username).join(', '), R);
check(res.found[0].mutual === 2 && res.found[1].mutual === 1 && res.found[2].mutual === 0, 'each result has the number of mutual friends, worked out in the database', R);
check(res.found.every(r => keysOf(r) === 'mutual,state,username') && !JSON.stringify(res).includes('@') && !Object.values(mia).some(u => JSON.stringify(res).includes(u.id)),
  'each result is only the username, the mutual count and where you stand: no call sign, id, email or who the mutual friends are', R);
const all = (await find(s.id, 'mia.')).found.map(r => r.username);
check(!all.includes('mia.hidden') && (await find(s.id, 'mia.hidden')).found.length === 0, 'a student with "Let people find me" off never appears, even searched by their whole username', R);
check(!all.includes('mia.blocker') && !all.includes('mia.blocked') && (await find(s.id, 'mia.blocker')).found.length === 0 && (await find(s.id, 'mia.blocked')).found.length === 0,
  'neither a student who blocked you nor one you blocked appears', R);
check((await find(mia.blocker.id, 'sam.t')).found.length === 0, 'and you do not appear in their search either', R);
check((await find(s.id, 'mi_')).found.length === 0 && (await find(s.id, 'mia_')).found.map(r => r.username).join() === 'mia_k', 'an underscore matches only an underscore, never any character', R);
check((await find(s.id, 'ia.k')).found.length === 0, 'it matches the start of a username, not the middle', R);
const before = await logs(s.id, 'search');
check((await find(s.id, 'mi')).result === 'short' && (await find(s.id, 'mia%')).result === 'bad' && (await find(s.id, 'mia*')).result === 'bad' && (await find(s.id, "mia' or 1=1")).result === 'bad',
  'fewer than 3 characters, wildcards and anything else that is not a username character are refused', R);
check(await logs(s.id, 'search') === before, 'and those refusals are not counted', R);
check(await logs(s.id, 'search') === 8, 'every real search is counted, found or not', R);
check((await find(s.id, 'mia.k')).found.find(r => r.username === 'mia.k').state === 'none', 'a stranger shows as none', R);
const sendTo = async (uid, nm) => call(uid, 'send_friend_request_to', {friend_username: nm});
check((await sendTo(s.id, 'mia.k')).result === 'sent' && await logs(s.id, 'search') === 9, 'sending a request to a student the search just showed does not count again', R);
await ago(s.id, 16);
check((await find(s.id, 'mia.k')).found.find(r => r.username === 'mia.k').state === 'sent' && (await find(s.id, 'xan')).found[0].state === 'friends', 'results show a request sent and an existing friend', R);
await sendTo(mia['mia.q'].id, 'sam.test');
check((await find(s.id, 'mia.q')).found[0].state === 'asked', 'and a student who has asked you', R);
while (await inWindow(s.id) < 9) await find(s.id, 'zzz');
check((await find(s.id, 'zzz')).result === 'ok', 'the tenth search in 15 minutes still works', R);
check((await find(s.id, 'mia')).result === 'soon' && (await sendTo(s.id, 'miami')).result === 'soon', 'the eleventh is refused, and so is sending by username to a student not just shown', R);
check((await call(s.id, 'send_friend_request', {friend_code: await codeOf(mia.miami.id)})).result === 'sent', 'a search lock does not stop codes', R);
await ago(s.id, 16);
const t0 = await logs(s.id, 'search');
check((await sendTo(s.id, 'mia.kay')).result === 'sent' && await logs(s.id, 'search') === t0 + 1, 'sending by username with no search first counts as a search', R);
check((await sendTo(s.id, 'mia.hidden')).result === 'none' && (await sendTo(s.id, 'mia.blocker')).result === 'none' && (await sendTo(s.id, 'nobody.here')).result === 'none',
  'by username, switched off, blocked and no such name all answer none', R);
check((await sendTo(s.id, 'mia.blocked')).result === 'you_blocked', 'by username, one you blocked says to unblock first, as with a code', R);
check((await call(s.id, 'send_friend_request', {friend_code: await codeOf(mia.hidden.id)})).result === 'sent', 'codes still work for a student with search off', R);
const tk = await user();
for (let i = 0; i < 10; i++) await un(tk.id, 'mia.k');
check(await logs(tk.id, 'taken') === 10 && await un(tk.id, 'mia.k') === 'soon' && (await find(tk.id, 'mia')).result === 'soon', 'a taken username counts toward the search limits', R);
await ago(tk.id, 16);
for (let i = 0; i < 20; i++) { await find(tk.id, 'zz' + i); if (i % 4 === 3) await ago(tk.id, 16); }
await ago(tk.id, 16);
check((await find(tk.id, 'mia')).result === 'day', 'after 30 searches and taken names in a day, search waits until the day has passed', R);

// ---------- limits on numbers ----------
const many = [];
for (let i = 0; i < 101; i++) many.push((await f.user('many' + i + '@example.com')).id);
const lim = await user('lim.test');
await f.admin('insert into public.friendships (a, b) select least($1::uuid, m), greatest($1::uuid, m) from unnest($2::uuid[]) m', [lim.id, many.slice(0, 100)]);
check((await call(lim.id, 'send_friend_request', {friend_code: aCode})).result === 'full', 'with 100 friends a student cannot ask for more', R);
await call(e.id, 'send_friend_request', {friend_code: await codeOf(lim.id)});
check((await call(lim.id, 'accept_friend_request', {ref: (await state(lim.id)).incoming[0].ref})).result === 'full', 'or accept more', R);
await call(lim.id, 'remove_friend', {ref: (await state(lim.id)).friends[0].ref});
await f.admin('insert into public.friendships (a, b) values (least($1::uuid, $2::uuid), greatest($1::uuid, $2::uuid))', [lim.id, many[100]]);
const fan = await user('fan.test');
await call(fan.id, 'send_friend_request', {friend_code: await codeOf(lim.id)});
check((await call(fan.id, 'send_friend_request', {friend_code: await codeOf(lim.id)})).result === 'sent_already', 'a request can still be sent to a student with 100 friends', R);
await call(lim.id, 'remove_friend', {ref: (await state(lim.id)).friends[0].ref});
await f.admin('insert into public.friendships (a, b) values (least($1::uuid, $2::uuid), greatest($1::uuid, $2::uuid))', [fan.id, lim.id]);
const out = await user('out.test');
for (let i = 0; i < 10; i++) await f.admin("insert into public.friend_requests (from_id, to_id) values ($1, $2)", [out.id, many[i]]);
check((await call(out.id, 'send_friend_request', {friend_code: aCode})).result === 'out_full', 'with 10 requests waiting, a student cannot send another', R);
const pop = await user('pop.test');
for (let i = 0; i < 20; i++) await f.admin("insert into public.friend_requests (from_id, to_id) values ($1, $2)", [many[i], pop.id]);
check((await call(e.id, 'send_friend_request', {friend_code: await codeOf(pop.id)})).result === 'their_in_full', 'a student with 20 requests waiting cannot be sent another', R);
const spam = await user('spam.test');
for (let i = 0; i < 20; i++) await f.admin("insert into public.friend_log (user_id, kind, at) values ($1, 'sent', now() - interval '2 hours')", [spam.id]);
check((await call(spam.id, 'send_friend_request', {friend_code: aCode})).result === 'sent_day', 'after 20 requests sent in a day, no more until the day has passed', R);

// ---------- block and unblock ----------
const fr = (await state(a.id)).friends.find(x2 => x2.username === 'bee.test');
await call(b.id, 'send_friend_request', {friend_code: aCode});
check((await call(a.id, 'block_student', {ref: fr.ref})) === 'ok', 'a student can block a friend', R);
sa = await state(a.id); sb = await state(b.id);
check(!sa.friends.some(x2 => x2.username === 'bee.test') && !sb.friends.some(x2 => x2.username === 'ace.test'), 'blocking removes the friendship on both sides', R);
check(!sa.incoming.length && !sb.outgoing.length, 'and ends any request between them', R);
check(sa.blocked.length === 1 && keysOf(sa.blocked[0]) === 'at,name,ref,username' && sa.blocked[0].username === 'bee.test' && !leaks(sa, b), 'the blocked list shows only a ref, the time, the call sign and the username', R);
const wb = await logs(b.id, 'wrong');
check((await call(b.id, 'send_friend_request', {friend_code: aCode})).result === 'wrong' && await logs(b.id, 'wrong') === wb + 1, 'the blocked student\'s request looks exactly like a wrong code, and counts as one', R);
check((await sendTo(b.id, 'ace.test')).result === 'none' && (await find(b.id, 'ace.te')).found.length === 0, 'they cannot find or ask by username either', R);
check((await call(a.id, 'send_friend_request', {friend_code: await codeOf(b.id)})).result === 'you_blocked', 'the student who blocked is told to unblock first', R);
check((await call(c.id, 'unblock_student', {ref: sa.blocked[0].ref})) === 'gone' && (await state(a.id)).blocked.length === 1, 'another student cannot unblock with someone else\'s ref', R);
const cCode = await codeOf(c.id);
await call(e.id, 'send_friend_request', {friend_code: cCode});
check((await call(c.id, 'block_student', {ref: (await state(c.id)).incoming[0].ref})) === 'ok' && (await state(c.id)).blocked[0].username === 'eve.test' && !(await state(e.id)).outgoing.some(o => o.code === cCode),
  'a student can block from a request sent to them', R);
check((await call(a.id, 'unblock_student', {ref: sa.blocked[0].ref})) === 'ok' && !(await state(a.id)).blocked.length, 'unblocking removes the block', R);
check(!(await state(a.id)).friends.some(x2 => x2.username === 'bee.test') && (await call(b.id, 'send_friend_request', {friend_code: aCode})).result === 'sent',
  'it does not make them friends again, and they can send a request again', R);

// ---------- deleting an account ----------
const del = await user('del.test');
await friendsWith(del, a);
await call(del.id, 'send_friend_request', {friend_code: await codeOf(c.id)});
await call(e.id, 'send_friend_request', {friend_code: await codeOf(del.id)});
await call(del.id, 'block_student', {ref: (await state(del.id)).incoming[0].ref});
await find(del.id, 'ace'); await call(del.id, 'send_friend_request', {friend_code: '22222222'});
await call(x.id, 'find_students', {search: 'del.t'});
const rowsOf = async id => (await f.admin(`select
  (select count(*) from public.friend_codes where user_id = $1) + (select count(*) from public.friend_requests where from_id = $1 or to_id = $1) +
  (select count(*) from public.friendships where a = $1 or b = $1) + (select count(*) from public.blocks where blocker = $1 or blocked = $1) +
  (select count(*) from public.friend_log where user_id = $1) + (select count(*) from public.friend_seen where user_id = $1 or seen = $1) as n`, [id])).rows[0].n;
check(Number(await rowsOf(del.id)) >= 7, 'a student has a code, friendships, requests, blocks, log rows and search rows', R);
const aFriends = (await state(a.id)).friends.length;
await f.as(del.id, 'select public.delete_account()');
check(Number(await rowsOf(del.id)) === 0, 'deleting the account removes every one of them, on both sides', R);
check((await state(a.id)).friends.length === aFriends - 1 && (await state(c.id)).incoming.length === 0, 'their friend\'s list and the student they asked lose them', R);
check(await un((await user()).id, 'del.test') === 'ok', 'and their username is free again', R);
check((await f.admin('select count(*)::int c from public.friendships')).rows[0].c > 0, 'everyone else\'s friendships stay', R);

// ---------- running the file again ----------
const count = async () => (await f.admin('select (select count(*) from public.friendships) + (select count(*) from public.friend_codes) + (select count(*) from public.profiles where username is not null) as n')).rows[0].n;
const was = await count();
await f.db.exec(FRIENDS_SQL);
check(Number(await count()) === Number(was), 'running friends.sql a second time keeps friendships, codes and usernames', R);

console.log(R.join('\n'));
