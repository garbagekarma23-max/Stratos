// Checks supabase/inactive.sql with no browser: deleting accounts nobody has used for 2 years. All the SQL files are
// loaded into PGlite (Postgres running inside Node) through fake-supabase.mjs, with stand-ins for Supabase's accounts
// and sign-ins (auth.users and auth.sessions, in tests/supabase-standin.sql). It checks: only the owner can run it (not
// a student, not someone signed out, and it is in the moderation schema, which the API cannot reach); the Cron job and
// its time; an account unused for 2 years and a day deleted with everything that holds its id, and its reports kept
// with the id cleared; what counts as use (a sign-in, the account's age, a sign-in refreshed by the phone through
// updated_at or refreshed_at, progress saved), each keeping an account; an account with no dates kept; the friend of a
// deleted account keeping everything but what they shared; at most 500 a run, oldest first; running the file twice
// deleting nothing and leaving one Cron job; and a project with no refreshed_at column still working.
import fs from 'fs';
import { fakeSupabase } from './fake-supabase.mjs';
import { check } from './lib.mjs';

const R = [];
const f = await fakeSupabase();
const SQL = fs.readFileSync(new URL('../supabase/inactive.sql', import.meta.url), 'utf8');
const admin = async (sql, params) => (await f.admin(sql, params)).rows;
const fails = async (uid, sql, params) => { try { await f.as(uid, sql, params); return false; } catch (e) { return e.code || true; } };
async function call(uid, fn, args = {}) {
  const keys = Object.keys(args);
  const r = await f.as(uid, 'select public.' + fn + '(' + keys.map((k, i) => k + ' => $' + (i + 1)).join(', ') + ') as v', keys.map(k => args[k]));
  return r.rows[0].v;
}
// Run the clean-up as the owner (Cron runs it as the owner too). Answers how many accounts it deleted.
const run = async () => (await admin('select moderation.delete_inactive() as v'))[0].v;
const exists = async u => (await admin('select count(*)::int c from auth.users where id = $1', [u.id]))[0].c === 1;

let n = 0;
const user = async name => {
  const u = await f.user((name || 'in' + (++n)) + '@example.com');
  u.name = name;
  if (name) await call(u.id, 'set_username', {new_username: name});
  return u;
};
// When the account was last used, set by hand, the way Supabase would have left it. Each is an interval ago (such as
// '2 years 1 day') or null for none. progress.updated_at is set by a trigger on every change, so it is turned off for
// the moment it takes to write the old date.
async function used(u, o) {
  const at = v => v == null ? null : "now() - interval '" + v + "'";
  await admin('update auth.users set created_at = ' + (at(o.made) || 'created_at') + ', last_sign_in_at = ' + (at(o.signin) || 'null') + ' where id = $1', [u.id]);
  await admin('delete from auth.sessions where user_id = $1', [u.id]);
  if (o.session !== undefined) await admin('insert into auth.sessions (user_id, created_at, updated_at, refreshed_at) values ($1, ' +
    (at(o.sessionMade || o.session) || 'null') + ', ' + (at(o.session) || 'null') + ', ' + (o.refreshed ? '(' + at(o.refreshed) + ")::timestamp" : 'null') + ')', [u.id]);
  if (o.progress !== undefined) {
    await f.db.exec('alter table public.progress disable trigger progress_touch');
    await admin("insert into public.progress (user_id, data, updated_at) values ($1, '{\"ans\": {}}', " + at(o.progress) + ') on conflict (user_id) do update set updated_at = excluded.updated_at', [u.id]);
    await f.db.exec('alter table public.progress enable trigger progress_touch');
  }
}
// Two friends, and the ref of their friendship as the first one sees it.
async function friends(x, y) {
  await call(x.id, 'send_friend_request', {friend_code: (await call(y.id, 'friends_state')).me.code});
  const r = (await call(y.id, 'friends_state')).incoming[0].ref;
  await call(y.id, 'accept_friend_request', {ref: r});
  return {
    xRef: (await call(x.id, 'friends_state')).friends.find(fr => fr.username === y.name).ref,
    yRef: (await call(y.id, 'friends_state')).friends.find(fr => fr.username === x.name).ref};
}
// How many rows hold a student's id, table by table.
const HOLDS = {
  'public.profiles': ['id'], 'public.progress': ['user_id'], 'public.friend_codes': ['user_id'], 'public.friendships': ['a', 'b'],
  'public.friend_requests': ['from_id', 'to_id'], 'public.blocks': ['blocker', 'blocked'], 'public.friend_log': ['user_id'],
  'public.friend_seen': ['user_id', 'seen'], 'public.chats': ['a', 'b'], 'public.messages': ['sender'], 'public.message_log': ['user_id'],
  'public.challenges': ['from_id', 'to_id'], 'public.challenge_log': ['user_id'], 'public.week_answers': ['user_id'], 'public.online': ['user_id'],
  'public.feedback': ['user_id'], 'auth.sessions': ['user_id'], 'moderation.bans': ['user_id'], 'moderation.notices': ['user_id'],
  'moderation.actions': ['user_id'], 'moderation.reports': ['reporter', 'reported']};
async function holds(u) {
  const out = {};
  for (const [t, cols] of Object.entries(HOLDS))
    out[t] = (await admin('select count(*)::int c from ' + t + ' where ' + cols.map(c => c + ' = $1').join(' or '), [u.id]))[0].c;
  return out;
}
const total = async t => (await admin('select count(*)::int c from ' + t))[0].c;

// ---------- only the owner can run it ----------
const fn = (await admin(`select s.nspname, p.prosecdef, p.proconfig from pg_proc p join pg_namespace s on s.oid = p.pronamespace where p.proname = 'delete_inactive'`));
check(fn.length === 1 && fn[0].nspname === 'moderation', 'delete_inactive is in the moderation schema, and nowhere else', R);
check(fn[0].prosecdef === true && String(fn[0].proconfig) === 'search_path=""', 'it is security definer with an empty search_path', R);
const priv = (await admin(`select has_function_privilege('authenticated', 'moderation.delete_inactive()', 'execute') a, has_function_privilege('anon', 'moderation.delete_inactive()', 'execute') b,
  has_schema_privilege('authenticated', 'moderation', 'usage') c, has_schema_privilege('anon', 'moderation', 'usage') d`))[0];
check(!priv.a && !priv.b && !priv.c && !priv.d, 'neither a student nor someone signed out may call it, or even reach the moderation schema', R);
const someone = await user('in.someone');
check(await fails(someone.id, 'select moderation.delete_inactive()') === '42501' && await fails(null, 'select moderation.delete_inactive()') === '42501',
  'calling it as a student or signed out is refused', R);
check((await admin("select count(*)::int c from pg_proc p join pg_namespace s on s.oid = p.pronamespace where s.nspname = 'public' and p.proname like '%inactive%'"))[0].c === 0,
  'nothing about it is in the public schema, the one the API reaches', R);

// ---------- the Cron job ----------
const cron = await admin("select schedule, command from cron.job where jobname = 'stratos-inactive'");
check(cron.length === 1 && cron[0].schedule === '41 17 * * *' && cron[0].command === 'select moderation.delete_inactive()', 'the Cron job stratos-inactive runs it every day at 17:41 UTC', R);

// ---------- the students ----------
// Ana: unused for 2 years and a day. She has a bit of everything, made the way the app makes it.
const ana = await user('in.ana'), ben = await user('in.ben'), cam = await user('in.cam');
const ab = await friends(ana, ben);
await friends(ana, cam);
// The search and online switches are set by hand, so the test does not hang on what they start as.
await call(someone.id, 'set_findable', {findable_on: true});
await call(ana.id, 'set_show_online', {show_on: true});
await call(ana.id, 'send_friend_request_to', {friend_username: 'in.someone'});
await call(ana.id, 'ask_to_message', {friend: ab.xRef});
await call(ben.id, 'accept_message_request', {friend: ab.yRef});
await call(ana.id, 'send_message', {friend: ab.xRef, body: 'Ready for the test?'});
await call(ben.id, 'send_message', {friend: ab.yRef, body: 'Nearly.'});
await call(ana.id, 'send_message', {friend: ab.xRef, body: 'Same.'});
const msgs = await call(ben.id, 'chat_messages', {friend: ab.yRef});
const anaN = (msgs.messages || msgs).find(m => !m.mine).n, benN = (msgs.messages || msgs).find(m => m.mine).n;
check(await call(ben.id, 'report_message', {friend: ab.yRef, n: anaN, reason: 'spam'}) === 'ok' && await call(ana.id, 'report_message', {friend: ab.xRef, n: benN, reason: 'other'}) === 'ok',
  'set-up: Ana and Ben each report a message of the other', R);
const repAna = (await admin('select id from moderation.reports where reported = $1', [ana.id]))[0].id;
await admin('select moderation.warn($1)', [repAna]);
await admin('select moderation.ban($1, 7)', [repAna]);
const ch = await call(ana.id, 'start_challenge', {friend: ab.xRef, ch: 'c1'});
await call(ana.id, 'finish_challenge', {ref: ch.ref, right_n: 5, ms: 60000});
await call(ana.id, 'count_answers', {answers: JSON.stringify([{q: 'c1p1a', at: Date.now() - 60000}, {q: 'c1p2a', at: Date.now() - 50000}])});
await call(ben.id, 'count_answers', {answers: JSON.stringify([{q: 'c1p1a', at: Date.now() - 60000}])});
await call(ana.id, 'online_now', {here: true});
await call(ana.id, 'add_feedback', {point_id: 'c1p1', which_part: 'a', why: 'typo', note_text: null, course_id: 'eco', app_version: 'dev'});
await f.as(ana.id, "insert into public.profiles (id, call_sign) values ($1, 'Ana') on conflict (id) do update set call_sign = 'Ana'", [ana.id]);
await call(cam.id, 'block_student', {ref: (await call(cam.id, 'friends_state')).friends.find(fr => fr.username === 'in.ana').ref});
await used(ana, {made: '3 years', signin: '2 years 1 day', session: '2 years 1 day', progress: '2 years 1 day'});
const anaBefore = await holds(ana), benBefore = await holds(ben);
const filled = ['public.profiles', 'public.progress', 'public.friend_codes', 'public.friendships', 'public.friend_requests', 'public.blocks', 'public.chats',
  'public.messages', 'public.message_log', 'public.challenges', 'public.challenge_log', 'public.week_answers', 'public.online', 'public.feedback',
  'auth.sessions', 'moderation.bans', 'moderation.notices', 'moderation.actions', 'moderation.reports'];
check(filled.every(t => anaBefore[t] > 0), 'set-up: Ana has rows in ' + filled.length + ' tables' + (filled.some(t => !anaBefore[t]) ? ' (missing: ' + filled.filter(t => !anaBefore[t]).join(', ') + ')' : ''), R);

// Ben, Cam and the others are used recently, each in only one way.
await used(ben, {made: '3 years', signin: '3 years', session: '7 days', sessionMade: '3 years'});
await used(cam, {made: '3 years', signin: '3 years', progress: '30 days'});
await used(someone, {made: '1 day', signin: '1 day'});
const edge = await user(), refreshed = await user(), fresh = await user(), never = await user(), blank = await user(), madeOnly = await user();
await used(edge, {made: '3 years', signin: '2 years -1 day', session: '2 years -1 day', progress: '2 years -1 day'});
await used(refreshed, {made: '3 years', signin: '3 years', session: '3 years', refreshed: '7 days'});
await used(fresh, {made: '1 hour'});
await used(never, {made: '2 years 1 day'});
await admin('update auth.users set created_at = null, last_sign_in_at = null where id = $1', [blank.id]);
await used(madeOnly, {made: '1 year', signin: '3 years', session: '3 years', progress: '3 years'});

const usersBefore = await total('auth.users');
const gone = await run();
check(gone === 2, 'one run deletes the 2 accounts unused for 2 years (Ana, and an account made 2 years and a day ago that never signed in): ' + gone, R);
check(!await exists(ana) && !await exists(never) && await total('auth.users') === usersBefore - 2, 'they are gone from the list of accounts', R);

// ---------- everything of Ana's went with her ----------
const anaAfter = await holds(ana);
const left = Object.entries(anaAfter).filter(([, c]) => c > 0).map(([t]) => t);
check(left.length === 0, 'no row anywhere holds her id any more: profile, progress, friend code, friendships, requests, blocks, chats, messages, logs, challenges, week answers, online mark, sign-ins, bans, warnings and history' + (left.length ? ' (left: ' + left.join(', ') + ')' : ''), R);
const reps = await admin('select reporter, reported, messages from moderation.reports order by at');
check(reps.length === 2 && reps.every(r => r.reporter !== ana.id && r.reported !== ana.id && r.messages && r.messages.length > 0),
  'both reports stay, with her id cleared and their copy of the messages kept, as with Delete account', R);
check(reps.some(r => r.reporter === ben.id) && reps.some(r => r.reported === ben.id), 'and Ben is still named in them', R);
check((await admin("select count(*)::int c from public.feedback where user_id is null and point = 'c1p1'"))[0].c === 1, 'her feedback stays with no account id', R);

// ---------- Ben, her friend, keeps his own ----------
const benAfter = await holds(ben);
check(await exists(ben) && benAfter['public.profiles'] === 1 && benAfter['public.progress'] === 0 && benAfter['public.friend_codes'] === 1
  && benAfter['public.week_answers'] === benBefore['public.week_answers'] && benAfter['auth.sessions'] === 1,
  'Ben keeps his account, profile, friend code, week answers and sign-in', R);
check(benBefore['public.friendships'] === 1 && benAfter['public.friendships'] === 0 && benAfter['public.chats'] === 0 && benAfter['public.messages'] === 0 && benAfter['public.challenges'] === 0,
  'and loses only what he shared with her: the friendship, the chat with its messages, and the challenge', R);
check(benAfter['moderation.reports'] === 2 && (await call(ben.id, 'friends_state')).friends.length === 0, 'his reports stay, and his friends list is empty', R);
check(await exists(cam) && (await holds(cam))['public.blocks'] === 0 && await exists(someone) && (await holds(someone))['public.friend_requests'] === 0,
  'Cam, who blocked her, and the student she asked to be friends keep their accounts, and the block and the request are gone', R);

// ---------- what counts as use ----------
check(await exists(edge), 'an account last used 2 years less a day ago is kept', R);
check(await exists(ben), 'an account that signed in 3 years ago but whose sign-in was refreshed last week (updated_at) is kept', R);
check(await exists(refreshed), 'so is one whose sign-in shows only in refreshed_at, last week', R);
check(await exists(cam), 'an account whose progress was saved last month is kept', R);
check(await exists(fresh) && await exists(someone), 'a new account that has not signed in, and one that signed in yesterday, are kept', R);
check(await exists(madeOnly), 'an account made a year ago is kept, even with its sign-in, session and progress older', R);
check(await exists(blank), 'an account with no dates at all is kept', R);
check(await run() === 0, 'a second run deletes nothing more', R);

// ---------- at most 500 a run, oldest first ----------
await admin(`insert into auth.users (email, created_at, last_sign_in_at)
  select 'in.bulk' || g || '@example.com', now() - interval '3 years' + g * interval '1 minute', now() - interval '3 years' + g * interval '1 minute' from generate_series(1, 502) g`);
await admin(`insert into public.profiles (id) select id from auth.users where email like 'in.bulk%'`);
const first = await run();
const bulkLeft = await admin("select email from auth.users where email like 'in.bulk%' order by email");
check(first === 500 && bulkLeft.length === 2, 'with 502 old accounts, one run deletes 500 and leaves 2', R);
check(bulkLeft.map(r => r.email).sort().join() === 'in.bulk501@example.com,in.bulk502@example.com', 'the 500 used longest ago go first', R);
check(await run() === 2 && (await admin("select count(*)::int c from auth.users where email like 'in.bulk%'"))[0].c === 0 && (await total('public.profiles')) > 0,
  'the next run deletes the last 2, with their profiles', R);

// ---------- running the file again ----------
const old = await user();
await used(old, {made: '3 years', signin: '3 years'});
const count = await total('auth.users'), profiles = await total('public.profiles'), reports = await total('moderation.reports');
await f.db.exec(SQL);
await f.db.exec(SQL);
check(await total('auth.users') === count && await exists(old) && await total('public.profiles') === profiles && await total('moderation.reports') === reports,
  'running inactive.sql twice deletes nothing by itself: only a run of the function does', R);
check((await admin("select count(*)::int c from cron.job where command like '%delete_inactive%'"))[0].c === 1 && (await admin("select count(*)::int c from cron.job where jobname = 'stratos-inactive'"))[0].c === 1,
  'and leaves one Cron job', R);
check(!(await admin("select has_function_privilege('authenticated', 'moderation.delete_inactive()', 'execute') a"))[0].a && await fails(null, 'select moderation.delete_inactive()') === '42501',
  'and the function is still the owner\'s only', R);
check(await run() === 1 && !await exists(old), 'and the next run deletes the old account', R);

// ---------- a project with no refreshed_at ----------
// Older Supabase projects have no refreshed_at on their sign-ins. The function must still run, using updated_at.
await admin('alter table auth.sessions drop column refreshed_at');
let ranOk = true, again;
try { again = await run(); } catch (e) { ranOk = false; again = e.message; }
check(ranOk && await exists(ben) && await exists(edge), 'with no refreshed_at column it still runs, and updated_at still keeps an account: ' + again, R);
check(!await exists(refreshed), 'there, the account seen only through refreshed_at has nothing else to keep it, so it goes', R);

check(!/@(?!example\.com)[a-z0-9-]+\.[a-z]/i.test(SQL), 'no real email address in inactive.sql', R);

console.log(R.join('\n'));
