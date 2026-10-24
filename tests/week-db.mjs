// Checks supabase/week.sql with no browser: the weekly table's rules. All the SQL files are loaded into PGlite
// (Postgres running inside Node) through fake-supabase.mjs. Each call runs as one student, as another, or as someone
// not signed in. It checks the tables are locked, which answers count (real questions, the gap, once an hour, 300 in
// any 24 hours, 2 days late at most, 50 a call), who sees whom on the table, the switch, block, remove and Delete
// account, the clean-up, and that the list of points matches the app's content.
import fs from 'fs';
import { loadContent, unitCourses } from '../content/load.mjs';
import { fakeSupabase } from './fake-supabase.mjs';
import { check } from './lib.mjs';

const R = [];
const f = await fakeSupabase();
const WEEK_SQL = fs.readFileSync(new URL('../supabase/week.sql', import.meta.url), 'utf8');
let n = 0;
async function call(uid, fn, args = {}) {
  const keys = Object.keys(args);
  const r = await f.as(uid, 'select public.' + fn + '(' + keys.map((k, i) => k + ' => $' + (i + 1)).join(', ') + ') as v', keys.map(k => args[k]));
  return r.rows[0].v;
}
const fails = async (uid, sql, params) => { try { await f.as(uid, sql, params); return false; } catch (e) { return e.code || true; } };
const admin = async (sql, params) => (await f.admin(sql, params)).rows;
const user = async name => {
  const u = await f.user((name || 'w' + (++n)) + '@example.com');
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
const keysOf = o => Object.keys(o).sort().join(',');
const S = 1000, MIN = 60 * S, H = 60 * MIN;
// Send answers as a student: each is [question, how long ago in ms]. Answers how many counted.
const send = async (u, list) => (await call(u.id, 'count_answers', {answers: JSON.stringify(list.map(([q, ago]) => ({q, at: Date.now() - ago})))})).counted;
const one = (u, q, ago = 0) => send(u, [[q, ago]]);
const rowsOf = async u => (await admin('select q, at from public.week_answers where user_id = $1 order by at', [u.id]));
const clear = u => admin('delete from public.week_answers where user_id = $1', [u.id]);
const table = (u, since = new Date(Date.now() - 3 * 864e5).toISOString()) => call(u.id, 'week_table', {since});
const totalOf = async (viewer, ref) => { const r = (await table(viewer)).friends.find(x => x.ref === ref); return r ? r.n : null; };
// Every Economics question the app has, to send many different ones.
// The content is read as the build puts it in v2.html (content/load.mjs), with the courses the content pipeline made.
const C = loadContent();
const ECO = [], MATHS = [];
C.TOPIC.chapters.forEach(c => c.points.forEach(p => ECO.push(p.id)));
unitCourses(C).forEach(k => k.units.forEach(u => u.chapters.forEach(c => c.points.forEach(p => { if (!ECO.includes(p)) ECO.push(p); }))));
C.MATHS.chapters.forEach(c => c.points.forEach(p => MATHS.push(p.id)));
const QS = ECO.flatMap(p => [p + 'a', p + 'b']);

// ---------- locked ----------
const TABLES = ['week_points', 'week_answers'];
const rls = await admin("select relname, relrowsecurity from pg_class where relname = any($1) and relkind = 'r'", [TABLES]);
check(rls.length === 2 && rls.every(r => r.relrowsecurity), 'row-level security is on for week_points and week_answers', R);
check((await admin('select count(*)::int c from pg_policies where tablename = any($1)', [TABLES]))[0].c === 0, 'neither has a rule for students, so only the functions reach them', R);
const ana = await user('ana.wk'), ben = await user('ben.wk');
const ref = await friends(ana, ben);
let blocked = 0;
for (const t of TABLES) {
  if (await fails(ana.id, 'select * from public.' + t) === '42501') blocked++;
  if (await fails(null, 'select * from public.' + t) === '42501') blocked++;
}
check(blocked === 4, 'no student and nobody signed out can read the weekly tables directly', R);
check(await fails(ana.id, "insert into public.week_answers (user_id, q, at) values ($1, 'c1p1a', now())", [ana.id]) === '42501' &&
  await fails(ana.id, "insert into public.week_points values ('fake', false)") === '42501', 'or write an answer or a point past the functions', R);
check(await fails(ana.id, 'update public.profiles set show_week = false where id = $1', [ana.id]) === '42501', 'a student cannot write show_week directly', R);
const APP = ['count_answers', 'set_show_week', 'week_table'];
const callable = (await admin(`select p.proname from pg_proc p join pg_namespace s on s.oid = p.pronamespace
  where s.nspname = 'public' and (p.proname like '%week%' or p.proname like '%answer%') and has_function_privilege('authenticated', p.oid, 'execute') order by 1`)).map(r => r.proname);
check(callable.join() === APP.join(), 'a signed-in student can call exactly the three functions: ' + callable.join(', '), R);
check(await fails(null, "select public.count_answers('[]')") === '42501' && await fails(null, 'select public.week_table(now())') === '42501' &&
  await fails(null, 'select public.set_show_week(false)') === '42501', 'someone not signed in can call none of them', R);
check(await fails(ana.id, 'select moderation.week_cleanup()') === '42501', 'a student cannot run the clean-up', R);
const cron = await admin("select schedule, command from cron.job where jobname = 'stratos-week'");
check(cron.length === 1 && cron[0].schedule === '23 17 * * *' && /week_cleanup/.test(cron[0].command), 'Cron clears old answers every day', R);

// ---------- the points match the app ----------
const have = {};
(await admin('select pid, maths from public.week_points')).forEach(r => { have[r.pid] = r.maths; });
const want = {};
ECO.forEach(p => { want[p] = false; });
MATHS.forEach(p => { want[p] = true; });
check(JSON.stringify(Object.keys(have).sort()) === JSON.stringify(Object.keys(want).sort()), 'week_points has every point the app has, and no other: ' + Object.keys(have).length, R);
check(Object.keys(want).every(k => have[k] === want[k]), 'each marked maths or not as in the app', R);

// ---------- what counts ----------
check(await one(ana, 'c1p1a') === 1, 'a right answer to a real Economics question counts', R);
let rows = await admin('select * from public.week_answers where user_id = $1', [ana.id]);
check(rows.length === 1 && keysOf(rows[0]) === 'at,q,user_id', 'the table keeps only who, the question and when', R);
check(await one(ana, 'e-pedb', 10 * S) === 1 && await one(ana, 'm1p1:3x+5=20', 20 * S) === 1, 'so does an Edexcel question, and a maths question with its numbers', R);
await clear(ana);
const bad = ['c9p9a', 'c1p1c', 'c1p1', 'm1p1', 'm1p1a', 'm1p1:', 'c1p1:x', 'e-pedx', '', 'x'.repeat(81), 'm1p1:' + 'x'.repeat(80)];
let none = 0;
for (let i = 0; i < bad.length; i++) if (await one(ana, bad[i], i * 10 * S) === 0) none++;
check(none === bad.length, 'an unknown point, a wrong letter, maths without its question, Economics with a colon, empty or too long: none count', R);
const odd = [[{q: 1, at: Date.now()}], [{q: 'c1p1a'}], [{q: 'c1p1a', at: 'now'}], ['c1p1a'], {q: 'c1p1a', at: Date.now()}, null];
let oddNone = 0;
for (const o of odd) { try { if ((await call(ana.id, 'count_answers', {answers: JSON.stringify(o)})).counted === 0) oddNone++; } catch (e) {} }
check(oddNone === odd.length, 'answers in the wrong shape count nothing and cause no error', R);
check(!(await rowsOf(ana)).length, 'and nothing was kept', R);

// the gap
check(await send(ana, [['c1p1a', 10 * S], ['c1p2a', 9 * S]]) === 1, 'two Economics answers 1 second apart: only the first counts', R);
check(await one(ana, 'c1p3a', 8.4 * S) === 1, '1.6 seconds after it counts', R);
check(await one(ana, 'c1p4a', 9.5 * S) === 0 && await one(ana, 'c1p4a', 11 * S) === 0, 'an answer sent late, close before or after one already counted, does not', R);
await clear(ana);
check(await send(ana, [['m1p1:2x=4', 30 * S], ['m1p2:x+1=3', 27 * S], ['m1p3:x-1=3', 25.4 * S]]) === 2, 'maths needs 4 seconds between answers: 3 seconds is too close, 4.6 is fine', R);
await clear(ana);

// the same question
check(await one(ana, 'c2p1a', 2 * H) === 1 && await one(ana, 'c2p1a', 90 * MIN) === 0, 'the same question again within the hour does not count', R);
check(await one(ana, 'c2p1b', 89 * MIN) === 1, 'the point\'s other question does', R);
check(await one(ana, 'c2p1a', 58 * MIN) === 1, 'and the same question just over an hour later does', R);
check(await one(ana, 'm1p1:2x=6', 50 * MIN) === 1 && await one(ana, 'm1p1:2x=6', 40 * MIN) === 0 && await one(ana, 'm1p1:2x=8', 30 * MIN) === 1,
  'a maths question with the same numbers counts once an hour, with new numbers it counts', R);
await clear(ana);

// how late, and the phone's clock
check(await one(ana, 'c3p1a', 47 * H) === 1 && await one(ana, 'c3p2a', 49 * H) === 0, 'an answer from 47 hours ago counts, one from 49 hours ago does not', R);
check(await one(ana, 'c3p3a', -30 * S) === 1, 'one from a clock 30 seconds fast counts', R);
rows = await rowsOf(ana);
check(Math.abs(new Date(rows[rows.length - 1].at) - Date.now()) < 5 * S, 'stored as now, never in the future', R);
check(await one(ana, 'c3p4a', -5 * MIN) === 0, 'one from 5 minutes in the future does not', R);
await clear(ana);
const many = Array.from({length: 60}, (_, i) => [QS[i], (60 - i) * 2 * S]);
check(await send(ana, many) === 50, 'one call counts at most 50 answers', R);
await clear(ana);

// the cap: 300 in any 24 hours
const day = [];
for (let i = 0; i < 300; i++) day.push([QS[i % QS.length], 23 * H + 50 * MIN - i * 2 * MIN]);
let got = 0;
for (let i = 0; i < day.length; i += 50) got += await send(ana, day.slice(i, i + 50));
check(got === 300, '300 answers spread over 10 hours all count: ' + got, R);
check(await one(ana, 'm1p1:5x=10', 0) === 0, 'the 301st within 24 hours does not', R);
check(await send(ana, [['m1p2:x=1', 24 * H + 30 * MIN], ['m1p3:x=2', 26 * H]]) === 0, 'nor one sent late, a little before them', R);
check(await one(ana, 'm1p4:x=3', 47 * H + 55 * MIN) === 1, 'one from nearly 2 days ago, more than 24 hours before most of them, counts', R);
const most = (await admin(`select max((select count(*) from public.week_answers y where y.user_id = x.user_id and y.at >= x.at and y.at < x.at + interval '24 hours'))::int m
  from public.week_answers x where x.user_id = $1`, [ana.id]))[0].m;
check(most === 300, 'no 24 hours holds more than 300: ' + most, R);
await clear(ana);

// old answers
await admin("insert into public.week_answers (user_id, q, at) values ($1, 'c4p1a', now() - interval '16 days')", [ana.id]);
await one(ana, 'c4p2a');
check((await rowsOf(ana)).length === 1, 'a student\'s answers older than 15 days are deleted when they send new ones', R);
await admin("insert into public.week_answers (user_id, q, at) values ($1, 'c4p1a', now() - interval '16 days'), ($2, 'c4p1a', now() - interval '16 days')", [ana.id, ben.id]);
await admin('select moderation.week_cleanup()');
check(!(await admin("select 1 from public.week_answers where at < now() - interval '15 days'")).length && (await rowsOf(ana)).length === 1,
  'the clean-up deletes everyone\'s older than 15 days, and keeps the rest', R);
await clear(ana);

// ---------- the table ----------
await send(ana, [['c1p1a', 30 * MIN], ['c1p2a', 20 * MIN], ['c1p3a', 10 * MIN]]);
await one(ben, 'c2p2a', 5 * MIN);
let t = await table(ana);
check(keysOf(t) === 'friends,me,show' && t.me === 3 && t.show === true, 'week_table answers your total, your switch (on by default) and your friends', R);
check(t.friends.length === 1 && keysOf(t.friends[0]) === 'n,name,ref,username' && t.friends[0].ref === ref && t.friends[0].n === 1 && t.friends[0].username === 'ben.wk',
  'each friend as a ref, a call sign, a username and a total', R);
const raw = JSON.stringify(await table(ben));
check(!raw.includes(ana.id) && !raw.includes(ben.id) && !raw.includes('@') && !raw.includes('c1p1'), 'no account id, email or question in any answer', R);
t = await table(ana, new Date(Date.now() - 15 * MIN).toISOString());
check(t.me === 1 && t.friends[0].n === 1, 'only answers since the moment sent are counted', R);
await admin("insert into public.week_answers (user_id, q, at) values ($1, 'c4p5a', now() - interval '9 days')", [ana.id]);
const monday = (await admin("select (select count(*) from public.week_answers w where w.user_id = $1 and w.at >= date_trunc('week', now() at time zone 'UTC') at time zone 'UTC')::int c", [ana.id]))[0].c;
const odds = [await table(ana, new Date(Date.now() + H).toISOString()), await table(ana, new Date(Date.now() - 9 * 864e5).toISOString()), await table(ana, null)];
check(odds.every(x => x.me === monday), 'a moment in the future, more than 8 days ago, or none counts from Monday at midnight UTC: ' + monday, R);

// the switch
await call(ana.id, 'set_show_week', {show_on: false});
check((await table(ben)).friends.length === 0, 'with the switch off, a student leaves their friends\' tables', R);
t = await table(ana);
check(t.show === false && t.friends.length === 1 && t.me === 3, 'they still see their friends and their own total', R);
check(await one(ana, 'c1p4a') === 1 && (await table(ana)).me === 4, 'and their answers still count', R);
await call(ana.id, 'set_show_week', {show_on: true});
check(await totalOf(ben, ref) === 4, 'on again, they show again with every answer counted', R);

// who never shows
const cara = await user('cara.wk'), dev = await user('dev.wk');
await one(cara, 'c1p1a');
check((await table(cara)).friends.length === 0 && (await table(ana)).friends.length === 1, 'a stranger sees nobody, and nobody sees them', R);
await call(dev.id, 'send_friend_request', {friend_code: (await call(ana.id, 'friends_state')).me.code});
check((await table(dev)).friends.length === 0 && (await table(ana)).friends.length === 1, 'a request still waiting shows nothing either way', R);
const eli = await user('eli.wk'), fay = await user('fay.wk');
const ref2 = await friends(eli, fay);
check((await table(eli)).friends.length === 1, 'before a block, a friend shows', R);
await call(eli.id, 'block_student', {ref: ref2});
check((await table(eli)).friends.length === 0 && (await table(fay)).friends.length === 0, 'after a block, neither sees the other', R);
const gus = await user('gus.wk'), hal = await user('hal.wk');
const ref3 = await friends(gus, hal);
await call(hal.id, 'remove_friend', {ref: ref3});
check((await table(gus)).friends.length === 0 && (await table(hal)).friends.length === 0, 'after remove, neither sees the other', R);

// Delete account
const ivy = await user('ivy.wk');
const ref4 = await friends(ana, ivy);
await one(ivy, 'c1p1a');
check(await totalOf(ana, ref4) === 1, 'a new friend shows with their total', R);
await f.as(ivy.id, 'select public.delete_account()');
check(!(await rowsOf(ivy)).length && (await table(ana)).friends.every(x => x.ref !== ref4), 'Delete account deletes the student\'s answers and takes them off every table', R);

// running the file again
const before = (await admin('select count(*)::int c from public.week_answers'))[0].c;
await f.db.exec(WEEK_SQL);
check((await admin('select count(*)::int c from public.week_answers'))[0].c === before && (await admin('select count(*)::int c from public.week_points'))[0].c === Object.keys(want).length &&
  (await table(ben)).friends.length === 1, 'running the file again keeps the answers, the switch and the list of points', R);
check(!/@(?!example\.com)[a-z0-9-]+\.[a-z]/i.test(WEEK_SQL), 'no real email address in week.sql', R);

console.log(R.join('\n'));
