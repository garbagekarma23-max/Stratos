// Checks supabase/live.sql with no browser: who can see a student online, and who can join or send on a chat's
// Realtime channel. All the SQL files are loaded into PGlite (Postgres running inside Node) through fake-supabase.mjs,
// with a stand-in for Realtime's rules table (tests/supabase-standin.sql). Each call runs as one student, as another,
// or as someone not signed in. Channels are checked the way Supabase's Realtime checks them (f.channelOk).
import fs from 'fs';
import { fakeSupabase } from './fake-supabase.mjs';
import { check } from './lib.mjs';

const R = [];
const f = await fakeSupabase();
const LIVE_SQL = fs.readFileSync(new URL('../supabase/live.sql', import.meta.url), 'utf8');
let n = 0;
async function call(uid, fn, args = {}) {
  const keys = Object.keys(args);
  const r = await f.as(uid, 'select public.' + fn + '(' + keys.map((k, i) => k + ' => $' + (i + 1)).join(', ') + ') as v', keys.map(k => args[k]));
  return r.rows[0].v;
}
const fails = async (uid, sql, params) => { try { await f.as(uid, sql, params); return false; } catch (e) { return e.code || true; } };
const admin = async (sql, params) => (await f.admin(sql, params)).rows;
const user = async name => {
  const u = await f.user((name || 'l' + (++n)) + '@example.com');
  u.name = name;
  if (name) await call(u.id, 'set_username', {new_username: name});
  return u;
};
async function friends(x, y) {
  await call(x.id, 'send_friend_request', {friend_code: (await call(y.id, 'friends_state')).me.code});
  const r = (await call(y.id, 'friends_state')).incoming[0].ref;
  await call(y.id, 'accept_friend_request', {ref: r});
  return (await call(x.id, 'friends_state')).friends.find(fr => fr.username === y.name).ref;
}
async function pair(nameA, nameB) {
  const a = await user(nameA), b = await user(nameB);
  return {a, b, ref: await friends(a, b)};
}
// Open the chat: a message request, accepted.
async function openChat(p) {
  await call(p.a.id, 'ask_to_message', {friend: p.ref});
  await call(p.b.id, 'accept_message_request', {friend: p.ref});
}
const here = (uid, on = true) => call(uid, 'online_now', {here: on});
const sees = async (uid, ref) => (await here(uid)).online.includes(ref);
const hear = (uid, ref) => f.channelOk(uid, 'chat:' + ref, false);
const send = (uid, ref) => f.channelOk(uid, 'chat:' + ref, true);
const keysOf = o => Object.keys(o).sort().join();

// ---------- locked ----------
const rls = await admin("select c.relrowsecurity from pg_class c join pg_namespace s on s.oid = c.relnamespace where s.nspname = 'public' and c.relname = 'online'");
check(rls.length === 1 && rls[0].relrowsecurity, 'online has row-level security on', R);
const p0 = await pair('ana.live', 'ben.live');
check(await fails(p0.a.id, 'select * from public.online') === '42501' && await fails(null, 'select * from public.online') === '42501',
  'nobody can read the online table directly, signed in or not', R);
check(await fails(p0.a.id, "insert into public.online values ($1, now() + interval '1 hour')", [p0.a.id]) === '42501',
  'or write it', R);
check(await fails(p0.a.id, 'update public.profiles set show_online = false where id = $1', [p0.a.id]) === '42501',
  'a student cannot write show_online directly', R);
check(await fails(null, 'select public.online_now(true)') === '42501' && await fails(null, 'select public.set_show_online(false)') === '42501',
  'someone not signed in can call neither function', R);
check(await fails(p0.a.id, "select live.chat_ok('chat:' || $1, false)", [p0.ref]) === false && await fails(null, "select live.chat_ok('x', false)") === '42501',
  'the channel check can be used by a signed-in student (Realtime runs it as them) and nobody else', R);
check(await fails(p0.a.id, 'select moderation.online_cleanup()') === '42501', 'students cannot run the clean-up', R);
const liveFns = (await admin("select p.proname from pg_proc p join pg_namespace s on s.oid = p.pronamespace where s.nspname = 'live' order by 1")).map(r => r.proname);
check(liveFns.join() === 'chat_ok', 'the live schema holds only chat_ok: ' + liveFns.join(), R);
const cron = await admin("select schedule, command from cron.job where jobname = 'stratos-online'");
check(cron.length === 1 && cron[0].schedule === '* * * * *' && /online_cleanup/.test(cron[0].command), 'Cron clears old marks every minute', R);

// ---------- online ----------
let r = await here(p0.a.id);
check(keysOf(r) === 'online,show' && r.show === true && r.online.length === 0, 'online_now answers only the refs online and your switch (on by default)', R);
check(await sees(p0.b.id, p0.ref), 'a friend who checked in shows as online, by the friendship\'s ref', R);
const rows = await admin('select * from public.online where user_id = $1', [p0.a.id]);
check(rows.length === 1 && keysOf(rows[0]) === 'until,user_id', 'the table keeps only who and until when', R);
const left = (rows[0].until - Date.now()) / 1000;
check(left > 50 && left <= 61, 'a check-in lasts about 60 seconds: ' + Math.round(left), R);
await here(p0.a.id, false);
check(!(await sees(p0.b.id, p0.ref)) && !(await admin('select 1 from public.online where user_id = $1', [p0.a.id])).length,
  'going into the background removes the mark at once', R);
await here(p0.a.id);
await admin("update public.online set until = now() - interval '1 second' where user_id = $1", [p0.a.id]);
check(!(await sees(p0.b.id, p0.ref)), 'a mark whose time has passed is not shown', R);
check(!(await admin('select 1 from public.online where user_id = $1', [p0.a.id])).length, 'and the next check-in by anyone deletes it', R);
await here(p0.a.id);
await admin("update public.online set until = now() - interval '1 second' where user_id = $1", [p0.a.id]);
await admin('select moderation.online_cleanup()');
check(!(await admin('select 1 from public.online where user_id = $1', [p0.a.id])).length, 'the clean-up deletes it too', R);
const raw = JSON.stringify(await here(p0.b.id));
check(!raw.includes(p0.a.id) && !raw.includes('@') && !/until|seen|at"/.test(raw), 'no account id, email or time in any answer', R);

// the switch
await here(p0.a.id);
await call(p0.a.id, 'set_show_online', {show_on: false});
check(!(await sees(p0.b.id, p0.ref)) && !(await admin('select 1 from public.online where user_id = $1', [p0.a.id])).length,
  'turning the switch off removes the mark at once', R);
r = await here(p0.a.id);
check(r.show === false && !(await sees(p0.b.id, p0.ref)), 'with it off, checking in never marks you online', R);
await here(p0.b.id);
check((await here(p0.a.id)).online.includes(p0.ref), 'with it off, you still see friends who show theirs', R);
await call(p0.a.id, 'set_show_online', {show_on: true});
await here(p0.a.id);
check((await here(p0.a.id)).show === true && await sees(p0.b.id, p0.ref), 'on again, you show again', R);
await admin("update public.profiles set show_online = false where id = $1", [p0.a.id]);
check(!(await sees(p0.b.id, p0.ref)), 'a mark left from before the switch went off is never shown', R);
await admin("update public.profiles set show_online = true where id = $1", [p0.a.id]);

// who never sees it
const stranger = await user('cara.live');
await here(p0.a.id);
check((await here(stranger.id)).online.length === 0, 'someone not a friend sees nobody online', R);
const asker = await user('dev.live');
await call(asker.id, 'send_friend_request', {friend_code: (await call(p0.a.id, 'friends_state')).me.code});
await here(asker.id);
check((await here(asker.id)).online.length === 0 && (await here(p0.a.id)).online.length === 1,
  'a request still waiting shows nothing either way', R);
const p1 = await pair('eli.live', 'fay.live');
await here(p1.a.id); await here(p1.b.id);
check(await sees(p1.b.id, p1.ref), 'before a block, a friend shows', R);
await call(p1.a.id, 'block_student', {ref: p1.ref});
check((await here(p1.b.id)).online.length === 0 && (await here(p1.a.id)).online.length === 0, 'after a block, neither sees the other', R);
const p2 = await pair('gus.live', 'hal.live');
await here(p2.a.id);
await call(p2.b.id, 'remove_friend', {ref: p2.ref});
check((await here(p2.b.id)).online.length === 0, 'after remove, the old friend is not shown', R);
const gone = await pair('ivy.live', 'jo.live');
await here(gone.a.id);
await f.as(gone.a.id, 'select public.delete_account()');
check(!(await admin('select 1 from public.online where user_id = $1', [gone.a.id])).length && (await here(gone.b.id)).online.length === 0,
  'Delete account removes the mark', R);

// ---------- Realtime: the chat's channel ----------
const c = await pair('kim.live', 'lee.live');
check(!(await hear(c.a.id, c.ref)) && !(await send(c.a.id, c.ref)), 'friends with no message request cannot join or send', R);
await call(c.a.id, 'ask_to_message', {friend: c.ref});
check(!(await hear(c.a.id, c.ref)) && !(await hear(c.b.id, c.ref)) && !(await send(c.b.id, c.ref)), 'nor with a request waiting', R);
await call(c.b.id, 'accept_message_request', {friend: c.ref});
check(await hear(c.a.id, c.ref) && await hear(c.b.id, c.ref) && await send(c.a.id, c.ref) && await send(c.b.id, c.ref),
  'once accepted, both friends can join and send', R);
check(!(await hear(stranger.id, c.ref)) && !(await send(stranger.id, c.ref)), 'someone else cannot join or send, even knowing the ref', R);
check(!(await hear(null, c.ref)) && !(await send(null, c.ref)), 'nor can someone not signed in', R);
check(!(await f.channelOk(c.a.id, 'chat:' + c.ref, false, 'presence')) && !(await f.channelOk(c.a.id, 'chat:' + c.ref, true, 'presence')),
  'presence is never allowed, only broadcast', R);
let bad = 0;
for (const t of ['chat:' + c.ref.toUpperCase(), 'chat:' + c.ref + ' ', 'chat:' + c.ref + 'x', 'chats:' + c.ref, c.ref, 'chat:', 'chat:not-a-uuid', 'chat:%', '', 'online'])
  if (await f.channelOk(c.a.id, t, false) || await f.channelOk(c.a.id, t, true)) bad++;
check(bad === 0, 'only the exact name chat:<ref> works, nothing near it', R);
await admin("select moderation.ban_user('kim.live', 3)");
check(await hear(c.a.id, c.ref) && !(await send(c.a.id, c.ref)), 'a student banned from messaging can hear but not send', R);
await admin("select moderation.unban('kim.live')");
check(await send(c.a.id, c.ref), 'and can send again once unbanned', R);
check(!(await admin('select 1 from realtime.messages')).length, 'no check leaves anything in realtime.messages', R);

const cb = await pair('max.live', 'ned.live');
await openChat(cb);
await call(cb.b.id, 'block_student', {ref: cb.ref});
check(!(await hear(cb.a.id, cb.ref)) && !(await send(cb.a.id, cb.ref)) && !(await hear(cb.b.id, cb.ref)), 'after a block, neither can join or send', R);
await call(cb.b.id, 'unblock_student', {ref: (await call(cb.b.id, 'friends_state')).blocked[0].ref});
const again = await friends(cb.a, cb.b);
await openChat({a: cb.a, b: cb.b, ref: again});
check(!(await hear(cb.a.id, cb.ref)) && await hear(cb.a.id, again), 'friends again, the old channel stays closed and the new chat has its own', R);
const cr = await pair('oli.live', 'pip.live');
await openChat(cr);
await call(cr.a.id, 'remove_friend', {ref: cr.ref});
check(!(await hear(cr.b.id, cr.ref)) && !(await send(cr.b.id, cr.ref)), 'after remove, neither can join or send', R);

// ---------- running the file again ----------
await here(c.a.id);
await f.db.exec(LIVE_SQL);
check(await sees(c.b.id, c.ref) && await hear(c.a.id, c.ref), 'running live.sql again keeps the data and the rules', R);
const rt = await admin("select c.relrowsecurity as on, pg_get_userbyid(c.relowner) as owner from pg_class c join pg_namespace s on s.oid = c.relnamespace where s.nspname = 'realtime' and c.relname = 'messages'");
check(rt[0].on && rt[0].owner === 'supabase_realtime_admin', 'realtime.messages belongs to Supabase and has row-level security on, as in a real project', R);
check(await admin('alter table realtime.messages enable row level security').then(() => false, e => e.code) === '42501',
  'the SQL Editor cannot alter realtime.messages, so live.sql never tries', R);
const pol = (await admin("select polname from pg_policy where polrelid = 'realtime.messages'::regclass order by 1")).map(x => x.polname);
check(pol.join() === 'stratos chat hear,stratos chat send', 'exactly two rules on realtime.messages: ' + pol.join(), R);
check(!/@(?!example\.com)[a-z0-9-]+\.[a-z]/i.test(LIVE_SQL.replace(/support@stratosstudy\.com/g, '')), 'no real email address in live.sql', R);

console.log(R.join('\n'));
