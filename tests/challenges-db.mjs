// Checks the challenge rules in supabase/challenges.sql with no browser. All the SQL files are loaded into PGlite
// (Postgres running inside Node) through fake-supabase.mjs, then each call runs as one student, as another, or as
// someone not signed in. The list of chapters is checked against the app's own content files.
import fs from 'fs';
import vm from 'vm';
import { fakeSupabase } from './fake-supabase.mjs';
import { check } from './lib.mjs';

const R = [];
const f = await fakeSupabase();
const CHALLENGES_SQL = fs.readFileSync(new URL('../supabase/challenges.sql', import.meta.url), 'utf8');
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
  const u = await f.user((name || 'c' + (++n)) + '@example.com');
  u.name = name;
  if (name) await call(u.id, 'set_username', {new_username: name});
  return u;
};
// Make two students friends, and give back the ref of their friendship (the same for both).
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
const list = async uid => (await call(uid, 'challenges_state')).challenges;
const one = async (uid, ref) => (await list(uid)).find(c => c.ref === ref) || null;
const start = (uid, friend, ch) => call(uid, 'start_challenge', {friend, ch});
const finish = (uid, ref, right_n, ms) => call(uid, 'finish_challenge', {ref, right_n, ms});
const play = (uid, ref) => call(uid, 'play_challenge', {ref});
// Start a challenge and send it: the challenger plays and finishes.
async function sent(p, ch = 'c1', right = 6) {
  const s = await start(p.a.id, p.ref, ch);
  await finish(p.a.id, s.ref, right, 60000);
  return s.ref;
}
const leaks = (s, u) => JSON.stringify(s).includes(u.id) || JSON.stringify(s).includes(u.email);
const keysOf = o => Object.keys(o).sort().join(',');
const Z = "'00000000-0000-0000-0000-000000000000'";
const TABLES = ['challenge_chapters', 'challenges', 'challenge_log'];
const APP = ['challenges_state', 'start_challenge', 'play_challenge', 'finish_challenge', 'decline_challenge', 'seen_challenges'];

// ---------- locked tables, and who may call what ----------
const rls = await admin("select relname, relrowsecurity from pg_class where relname = any($1) and relkind = 'r'", [TABLES]);
check(rls.length === 3 && rls.every(r => r.relrowsecurity), 'row-level security is on for challenge_chapters, challenges and challenge_log', R);
check((await admin('select count(*)::int c from pg_policies where tablename = any($1)', [TABLES]))[0].c === 0, 'none of them has a rule for students, so only the functions reach them', R);
const p1 = await pair('ann.ch', 'bob.ch');
let blocked = 0;
for (const t of TABLES) {
  if (await fails(p1.a.id, 'select * from public.' + t) === '42501') blocked++;
  if (await fails(null, 'select * from public.' + t) === '42501') blocked++;
}
check(blocked === 6, 'no student and nobody signed out can read the challenge tables directly', R);
check(await fails(p1.a.id, "insert into public.challenges (friendship, from_id, to_id, ch, total, seed) values ($1, $2, $3, 'c1', 8, 1)", [p1.ref, p1.a.id, p1.b.id]) === '42501' &&
  await fails(p1.a.id, "update public.challenge_chapters set per_q_ms = 1") === '42501', 'or write a challenge, or change a chapter, past the functions', R);
const callable = (await admin(`select p.proname from pg_proc p join pg_namespace s on s.oid = p.pronamespace
  where s.nspname = 'public' and (p.proname like '%challenge%') and has_function_privilege('authenticated', p.oid, 'execute') order by 1`)).map(r => r.proname);
check(callable.join() === APP.slice().sort().join(), 'a signed-in student can call exactly the app\'s six functions, and no helper: ' + callable.join(', '), R);
let anonOut = 0;
for (const fn of APP) {
  const args = fn === 'challenges_state' ? '' : fn === 'start_challenge' ? Z + ", 'c1'" : fn === 'finish_challenge' ? Z + ', 1, 1000' : Z;
  if (await fails(null, 'select public.' + fn + '(' + args + ')') === '42501') anonOut++;
}
check(anonOut === APP.length, 'someone not signed in can call none of them', R);
check(await fails(p1.a.id, 'select moderation.challenge_cleanup()') === '42501', 'and a student cannot run the clean-up', R);

// ---------- the chapters match the app ----------
// The content files are loaded on their own, as the build puts them in v2.html, and each chapter's size worked out
// the way gameSize in src/10-core.js does: two questions per point up to 8 in Economics, 5 in maths.
const src = ['content.js', 'maths-content.js', 'econ-points.js', 'edexcel-content.js'].map(x => fs.readFileSync(new URL('../src/' + x, import.meta.url), 'utf8')).join('\n');
const C = vm.runInNewContext(src + '\n;({TOPIC, MATHS, EDEXCEL})');
const want = {};
C.TOPIC.chapters.forEach(c => { want[c.id] = ['eco', Math.min(8, 2 * c.points.length), 1500]; });
C.MATHS.chapters.forEach(c => { want[c.id] = ['maths', 5, 4000]; });
C.EDEXCEL.units.forEach(u => u.chapters.forEach(c => { if (c.points.length) want[c.id] = ['edexcel', Math.min(8, 2 * c.points.length), 1500]; }));
const have = {};
(await admin('select * from public.challenge_chapters')).forEach(r => { have[r.ch] = [r.course, r.total, r.per_q_ms]; });
check(JSON.stringify(Object.keys(have).sort()) === JSON.stringify(Object.keys(want).sort()), 'challenge_chapters has every chapter the app has, and no other: ' + Object.keys(have).length, R);
const wrongSize = Object.keys(want).filter(k => JSON.stringify(have[k]) !== JSON.stringify(want[k]));
check(!wrongSize.length, 'each with its course, the same number of questions as the app, and its time per question' + (wrongSize.length ? ': ' + wrongSize.join(', ') : ''), R);
check(have.x1c3[1] === 4 && have.x2c3[1] === 6 && have.m1[1] === 5 && have.c1[1] === 8, 'Supply (2 points) has 4 questions, Aggregate supply (3) has 6, maths 5, NSW 8', R);

// ---------- one challenge, from start to result ----------
const stranger = await user('cy.ch');
check((await start(stranger.id, p1.ref, 'c1')).result === 'gone', 'a student who is not in the friendship cannot start a challenge on it', R);
check((await start(p1.a.id, p1.ref, 'c9')).result === 'chapter' && (await start(p1.a.id, p1.ref, 'nope')).result === 'chapter', 'a chapter not on the list is refused', R);
const s1 = await start(p1.a.id, p1.ref, 'm1');
check(s1.result === 'ok' && Number.isInteger(s1.seed) && s1.seed >= 0 && s1.seed <= 4294967295 && s1.total === 5 && keysOf(s1) === 'ref,result,seed,total', 'start_challenge answers the ref, a seed from 0 to 4294967295, and 5 questions for maths', R);
check(!(await list(p1.b.id)).length && !(await list(p1.a.id)).length, 'before the challenger finishes, it is in nobody\'s list', R);
check((await play(p1.b.id, s1.ref)).result === 'gone', 'and the friend cannot play it yet', R);
const badScores = [await finish(p1.a.id, s1.ref, -1, 9000), await finish(p1.a.id, s1.ref, 6, 9000), await finish(p1.a.id, s1.ref, null, 9000)];
check(badScores.every(r => r.result === 'bad'), 'a score under 0, over the number of questions, or missing is refused', R);
check((await finish(p1.b.id, s1.ref, 3, 30000)).result === 'gone', 'the friend cannot finish it before playing', R);
check((await finish(stranger.id, s1.ref, 5, 30000)).result === 'gone', 'and a stranger cannot finish it at all', R);
const f1 = await finish(p1.a.id, s1.ref, 4, 50);
check(f1.result === 'ok' && f1.ms === 20000, 'a time faster than 4 seconds a question counts as 20 seconds for 5 maths questions', R);
check((await finish(p1.a.id, s1.ref, 5, 30000)).result === 'done', 'a challenger finishes once', R);
const bSees = await one(p1.b.id, s1.ref), aSees = await one(p1.a.id, s1.ref);
check(bSees && bSees.state === 'open' && !bSees.mine && bSees.them.right === 4 && bSees.them.ms === 20000 && bSees.me === null && bSees.ch === 'm1' && bSees.total === 5 && bSees.friend === p1.ref,
  'the friend now sees it to play, with the score and time to beat', R);
check(aSees && aSees.state === 'waiting' && aSees.mine && aSees.me.right === 4 && aSees.them === null, 'the challenger sees it waiting, with no score for the friend', R);
check(keysOf(bSees) === 'at,ch,ends,friend,me,mine,new,ref,state,them,total' && Math.round((new Date(bSees.ends) - new Date(bSees.at)) / 864e5) === 7, 'each challenge is only these fields, and ends 7 days after it was sent', R);
check(!leaks(await call(p1.b.id, 'challenges_state'), p1.a) && !leaks(await call(p1.a.id, 'challenges_state'), p1.b) && !leaks(s1, p1.b), 'no answer holds the other student\'s account id or email', R);
check((await play(stranger.id, s1.ref)).result === 'gone' && (await play(p1.a.id, s1.ref)).result === 'gone', 'only the friend it was sent to can play it', R);
const pl = await play(p1.b.id, s1.ref);
check(pl.result === 'ok' && pl.seed === s1.seed && pl.total === 5 && pl.ch === 'm1', 'Play hands the friend the same seed', R);
check((await play(p1.b.id, s1.ref)).result === 'started', 'and only once, so the questions cannot be looked at and played again', R);
check((await one(p1.a.id, s1.ref)).state === 'playing' && (await one(p1.b.id, s1.ref)).state === 'playing', 'while the friend plays, both see it as playing', R);
await f.admin("update public.challenges set to_start = now() - interval '5 minutes' where id = $1", [s1.ref]);
const f2 = await finish(p1.b.id, s1.ref, 4, 10 * 3600 * 1000);
check(f2.result === 'ok' && f2.ms >= 300000 && f2.ms <= 312000, 'a time slower than the time since starting (5 minutes) counts as that time plus 10 seconds: ' + f2.ms, R);
check((await finish(p1.b.id, s1.ref, 5, 1000)).result === 'done', 'the friend finishes once too', R);
const aDone = await one(p1.a.id, s1.ref), bDone = await one(p1.b.id, s1.ref);
check(aDone.state === 'done' && aDone.them.right === 4 && aDone.them.ms === f2.ms && aDone.me.ms === 20000 && aDone.new === true, 'the challenger sees both scores and times, marked new', R);
check(bDone.state === 'done' && bDone.me.right === 4 && bDone.them.right === 4 && bDone.new === false, 'the friend sees both too', R);
check((await call(stranger.id, 'seen_challenges', {friend: p1.ref})) === 'gone' && (await one(p1.a.id, s1.ref)).new === true, 'a stranger cannot mark it seen', R);
check((await call(p1.a.id, 'seen_challenges', {friend: p1.ref})) === 'ok' && (await one(p1.a.id, s1.ref)).new === false, 'the challenger opening the chat marks it seen', R);
// A time inside the limits is kept as the app measured it.
const s2 = await start(p1.b.id, p1.ref, 'c2');
check(s2.total === 8, 'an NSW Economics challenge has 8 questions', R);
await f.admin("update public.challenges set made_at = now() - interval '5 minutes' where id = $1", [s2.ref]);
check((await finish(p1.b.id, s2.ref, 7, 123456)).ms === 123456, 'a time inside the limits is saved as it is', R);
check((await one(p1.a.id, s2.ref)).state === 'open' && (await one(p1.a.id, s2.ref)).them.right === 7, 'either friend can challenge the other', R);
const seeds = new Set();
for (let i = 0; i < 200; i++) seeds.add(Number((await admin('select public.challenge_seed() s'))[0].s));
check(seeds.size === 200 && [...seeds].every(x => x >= 0 && x <= 4294967295), 'seeds are random, in range and never repeated in 200', R);

// ---------- running out of time, leaving and declining ----------
const p2 = await pair('dot.ch', 'eve.ch');
const late = await start(p2.a.id, p2.ref, 'c1');
await f.admin("update public.challenges set made_at = now() - interval '3 hours' where id = $1", [late.ref]);
check((await finish(p2.a.id, late.ref, 8, 60000)).result === 'late' && !(await list(p2.b.id)).length, 'a challenger who finishes more than 2 hours after starting never sends it', R);
const quit = await sent(p2);
await play(p2.b.id, quit);
await f.admin("update public.challenges set to_start = now() - interval '3 hours' where id = $1", [quit]);
const q = await one(p2.a.id, quit);
check(q.state === 'done' && q.them.right === 0 && q.them.quit === true && q.them.ms === null, 'a friend who starts and does not finish in 2 hours has 0, shown as didn\'t finish', R);
check((await finish(p2.b.id, quit, 8, 60000)).result === 'late', 'and cannot finish after that', R);
const dec = await sent(p2);
check((await call(stranger.id, 'decline_challenge', {ref: dec})) === 'gone' && (await call(p2.a.id, 'decline_challenge', {ref: dec})) === 'gone', 'only the friend it was sent to can decline it', R);
check((await call(p2.b.id, 'decline_challenge', {ref: dec})) === 'ok' && (await call(p2.b.id, 'decline_challenge', {ref: dec})) === 'gone', 'the friend declines it, once', R);
check((await one(p2.b.id, dec)).state === 'declined' && (await one(p2.a.id, dec)).state === 'waiting', 'decline is silent: the challenger still sees it waiting', R);
check((await play(p2.b.id, dec)).result === 'gone', 'a declined challenge cannot be played', R);
await f.admin("update public.challenges set sent_at = now() - interval '8 days' where id = $1", [dec]);
check((await one(p2.a.id, dec)).state === 'expired', 'after 7 days the challenger sees it as not played in time', R);
const exp = await sent(p2);
await f.admin("update public.challenges set sent_at = now() - interval '8 days' where id = $1", [exp]);
check((await one(p2.b.id, exp)).state === 'expired' && (await play(p2.b.id, exp)).result === 'expired', 'a challenge not played in 7 days runs out for both, and cannot be played', R);
const slow = await sent(p2);
await f.admin("update public.challenges set sent_at = now() - interval '7 days' + interval '1 minute' where id = $1", [slow]);
await play(p2.b.id, slow);
await f.admin("update public.challenges set sent_at = now() - interval '8 days' where id = $1", [slow]);
check((await one(p2.b.id, slow)).state === 'playing' && (await finish(p2.b.id, slow, 3, 60000)).result === 'ok', 'started inside the 7 days, it can still be finished', R);

// ---------- the limits ----------
const p3 = await pair('fin.ch', 'gil.ch');
const three = [await sent(p3), await sent(p3)];
const playing = await start(p3.a.id, p3.ref, 'c1');
check((await start(p3.a.id, p3.ref, 'c1')).result === 'friend_full', '3 of yours waiting for one friend, one still being played, and a 4th is refused', R);
await call(p3.b.id, 'decline_challenge', {ref: three[0]});
const again = await start(p3.a.id, p3.ref, 'c1');
check(again.result === 'ok', 'a declined one does not count toward the 3', R);
await play(p3.b.id, three[1]);
check((await start(p3.a.id, p3.ref, 'c1')).result === 'ok', 'nor does one the friend has started', R);
check((await start(p3.b.id, p3.ref, 'c1')).result === 'ok', 'the limit is for each way, so the friend can still challenge back', R);
await f.admin("update public.challenges set sent_at = now() - interval '8 days', made_at = now() - interval '8 days' where friendship = $1 and to_start is null", [p3.ref]);
check((await start(p3.a.id, p3.ref, 'c1')).result === 'ok', 'and ones that ran out do not count', R);
const before = (await admin('select count(*)::int c from public.challenge_log where user_id = $1', [p3.a.id]))[0].c;
await f.admin("insert into public.challenge_log (user_id) select $1 from generate_series(1, $2)", [p3.a.id, 20 - before]);
await f.admin("delete from public.challenges where friendship = $1", [p3.ref]);
check((await start(p3.a.id, p3.ref, 'c1')).result === 'day', '20 started in a day, finished or not, and the 21st is refused', R);
await f.admin("update public.challenge_log set at = now() - interval '25 hours' where user_id = $1", [p3.a.id]);
check((await start(p3.a.id, p3.ref, 'c1')).result === 'ok', 'a day later it works again', R);
// 30 waiting for one student, from all their friends.
const popular = await user('hal.ch'), fans = [];
for (let i = 0; i < 11; i++) { const u = await user('fan' + i + '.ch'); fans.push({a: u, ref: await friends(u, popular)}); }
for (let i = 0; i < 10; i++) for (let k = 0; k < 3; k++) await sent(fans[i]);
check((await start(fans[10].a.id, fans[10].ref, 'c1')).result === 'their_full', 'with 30 waiting for one student from all their friends, another is refused', R);
check((await list(popular.id)).filter(c => c.state === 'open').length === 30, 'and those 30 are all there to play', R);

// ---------- block, remove and Delete account ----------
const p4 = await pair('ida.ch', 'jon.ch');
await sent(p4); const played4 = await sent(p4); await play(p4.b.id, played4); await finish(p4.b.id, played4, 2, 60000);
await call(p4.b.id, 'block_student', {ref: p4.ref});
check(!(await admin('select 1 from public.challenges where friendship = $1', [p4.ref])).length && !(await list(p4.a.id)).length, 'blocking deletes every challenge between the two, played or not', R);
const p5 = await pair('kit.ch', 'lee.ch');
await sent(p5);
await call(p5.a.id, 'remove_friend', {ref: p5.ref});
check(!(await admin('select 1 from public.challenges where friendship = $1', [p5.ref])).length, 'removing a friend does too', R);
const p6 = await pair('max.ch', 'ned.ch'), p7 = await friends(p6.a, stranger);
await sent(p6); await sent({a: stranger, ref: p7});
await f.as(p6.a.id, 'select public.delete_account()');
check(!(await admin('select 1 from public.challenges where from_id = $1 or to_id = $1', [p6.a.id])).length && !(await admin('select 1 from public.challenge_log where user_id = $1', [p6.a.id])).length,
  'Delete account deletes the student\'s challenges on both sides, and their log', R);
check(!(await list(p6.b.id)).length && !(await list(stranger.id)).some(c => c.friend === p7), 'and they are gone from each friend\'s list', R);

// ---------- how long things are kept ----------
const p8 = await pair('oli.ch', 'pat.ch');
const old = await sent(p8), fresh = await sent(p8), abandoned = (await start(p8.a.id, p8.ref, 'c1')).ref, justStarted = (await start(p8.b.id, p8.ref, 'c1')).ref;
await f.admin("update public.challenges set made_at = now() - interval '91 days', sent_at = now() - interval '91 days' where id = $1", [old]);
await f.admin("update public.challenges set made_at = now() - interval '3 hours' where id = $1", [abandoned]);
check(!(await list(p8.b.id)).some(c => c.ref === old), 'a challenge older than 90 days is never shown, even before the clean-up runs', R);
await f.admin("insert into public.challenge_log (user_id, at) values ($1, now() - interval '2 days')", [p8.a.id]);
const clean = (await admin('select moderation.cleanup() r'))[0].r;
const left = (await admin('select id from public.challenges where friendship = $1', [p8.ref])).map(r => r.id);
check(/old messages deleted/.test(clean) && !left.includes(old) && !left.includes(abandoned) && left.includes(fresh) && left.includes(justStarted),
  'the daily clean-up (moderation.cleanup) deletes challenges older than 90 days and starts never finished after 2 hours, and keeps the rest', R);
check(!(await admin("select 1 from public.challenge_log where at < now() - interval '1 day'")).length, 'and old log rows', R);

// ---------- running the files again ----------
const count = async () => (await admin('select count(*)::int c from public.challenges'))[0].c;
const was = await count();
await f.admin("update public.challenge_chapters set total = 3 where ch = 'c1'");
await f.db.exec(CHALLENGES_SQL);
check(await count() === was && (await admin("select total from public.challenge_chapters where ch = 'c1'"))[0].total === 8, 'running challenges.sql again keeps every challenge and puts the chapter sizes back', R);
await f.db.exec(MESSAGES_SQL);
const p9 = await pair('quinn.ch', 'ray.ch');
const old9 = await sent(p9);
await f.admin("update public.challenges set made_at = now() - interval '91 days' where id = $1", [old9]);
await admin('select moderation.cleanup()');
check(!(await admin('select 1 from public.challenges where id = $1', [old9])).length, 'running messages.sql again keeps the clean-up clearing old challenges', R);

console.log(R.join('\n'));
