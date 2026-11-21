// Checks supabase/feedback.sql with no browser: the rules for Could we improve this?. All the SQL files are loaded into
// PGlite (Postgres running inside Node) through fake-supabase.mjs. Each call runs as one student, as another, or as
// someone not signed in. It checks the table is locked (nobody reads, changes or deletes feedback, their own
// included), only add_feedback is callable, what it keeps (and the account id only for a signed-in student), each
// format rule and its answer, the note's 300 characters, the limits (20 a day for each student, the same point, part
// and reason once a day, 60 an hour and 300 a day signed out, counted apart), Delete account clearing the account id
// and leaving the feedback, the owner's view (one row per point, newest first, the count for each reason, no account
// id), the clean-up after 12 months, and running the file twice keeping the feedback.
import fs from 'fs';
import { fakeSupabase } from './fake-supabase.mjs';
import { check } from './lib.mjs';

const R = [];
const f = await fakeSupabase();
const SQL = fs.readFileSync(new URL('../supabase/feedback.sql', import.meta.url), 'utf8');
const admin = async (sql, params) => (await f.admin(sql, params)).rows;
const fails = async (uid, sql, params) => { try { await f.as(uid, sql, params); return false; } catch (e) { return e.code || true; } };
// Send feedback as a student (uid) or as someone not signed in (null). Answers the word add_feedback gives back.
const add = async (uid, o = {}) => {
  const a = Object.assign({point_id: 'c1p1', which_part: 'a', why: 'wrong', note_text: null, course_id: 'eco', app_version: '2026-11-21.6b26180'}, o);
  const keys = Object.keys(a);
  return (await f.as(uid, 'select public.add_feedback(' + keys.map((k, i) => k + ' => $' + (i + 1)).join(', ') + ') as v', keys.map(k => a[k]))).rows[0].v;
};
const count = async (where = 'true', params) => (await admin('select count(*)::int c from public.feedback where ' + where, params))[0].c;
const clear = () => admin('delete from public.feedback');
const ana = await f.user('fb.ana@example.com'), ben = await f.user('fb.ben@example.com');

// ---------- locked ----------
check((await admin("select relrowsecurity r from pg_class where relname = 'feedback' and relkind = 'r'"))[0].r === true, 'row-level security is on for feedback', R);
check((await admin("select count(*)::int c from pg_policies where tablename = 'feedback'"))[0].c === 0, 'it has no rule for students, so only add_feedback reaches it', R);
check(await add(ana.id) === 'ok' && await add(null, {why: 'typo'}) === 'ok', 'a student and someone not signed in can both send feedback', R);
let locked = 0;
for (const uid of [ana.id, null]) {
  if (await fails(uid, 'select * from public.feedback') === '42501') locked++;
  if (await fails(uid, "insert into public.feedback (point, part, reason, course, version, signed_in) values ('c1p1', 'a', 'wrong', 'eco', 'dev', false)") === '42501') locked++;
  if (await fails(uid, "update public.feedback set note = 'x'") === '42501') locked++;
  if (await fails(uid, 'delete from public.feedback') === '42501') locked++;
  if (await fails(uid, 'select * from moderation.feedback_by_point') === '42501') locked++;
}
check(locked === 10, 'nobody can read, add, change or delete feedback directly, or read the owner\'s view, signed in or not', R);
check(await count() === 2, 'so the feedback is still there', R);
const callable = role => admin(`select p.proname from pg_proc p join pg_namespace s on s.oid = p.pronamespace
  where s.nspname in ('public', 'moderation') and p.proname like '%feedback%' and has_function_privilege($1, p.oid, 'execute') order by 1`, [role]);
check((await callable('authenticated')).map(r => r.proname).join() === 'add_feedback' && (await callable('anon')).map(r => r.proname).join() === 'add_feedback',
  'add_feedback is the only feedback function anyone can call: the clean-up is not', R);

// ---------- what it keeps ----------
const rows = await admin('select point, part, reason, note, course, version, signed_in, user_id from public.feedback order by id');
check(rows[0].signed_in === true && rows[0].user_id === ana.id && rows[1].signed_in === false && rows[1].user_id === null,
  'a signed-in student\'s account id is kept for the limit, and nothing about someone signed out', R);
check(Object.keys((await admin('select * from public.feedback limit 1'))[0]).sort().join() === 'at,course,id,note,part,point,reason,signed_in,user_id,version',
  'the table holds only the point, part, reason, note, course, version, when, and the account id for the limit', R);
await clear();
check(await add(null, {note_text: '  Two options say the same thing.  '}) === 'ok' && (await admin('select note from public.feedback'))[0].note === 'Two options say the same thing.', 'the note is kept with the spaces at its ends taken off', R);
check(await add(null, {note_text: '   ', which_part: 'b'}) === 'ok' && (await admin("select note from public.feedback where part = 'b'"))[0].note === null, 'a note of only spaces is kept as no note', R);

// ---------- the format of each part ----------
await clear();
const parts = ['card', 'card 1', 'card 9', 'card 10', 'card 20', 'a', 'b', 'example', 'question'];
let good = 0;
for (const p of parts) if (await add(null, {which_part: p, point_id: p === 'example' || p === 'question' ? 'm1p1' : 'c1p1'}) === 'ok') good++;
check(good === parts.length, 'every part the app sends is accepted: ' + parts.join(', '), R);
await clear();
const bad = [
  [{which_part: 'card 0'}, 'card 0'], [{which_part: 'card 21'}, 'card 21'], [{which_part: 'c'}, 'question c'], [{which_part: 'Card'}, 'a part in capitals'], [{which_part: null}, 'no part'],
  [{why: 'rude'}, 'a reason the sheet does not have'], [{why: null}, 'no reason'],
  [{course_id: 'Eco'}, 'a course in capitals'], [{course_id: 'eco; drop table'}, 'a course with other characters'], [{course_id: 'x'.repeat(61)}, 'a course over 60 characters'], [{course_id: null}, 'no course'],
  [{app_version: 'v 1'}, 'a version with a space'], [{app_version: 'x'.repeat(41)}, 'a version over 40 characters'], [{app_version: null}, 'no version']];
let refused = 0;
for (const [o] of bad) if (await add(null, o) === 'bad') refused++;
check(refused === bad.length, 'each wrong format is answered bad: ' + bad.map(b => b[1]).join(', '), R);
check(await add(null, {point_id: 'c9p9'}) === 'unknown' && await add(null, {point_id: null}) === 'unknown' && await add(null, {point_id: "c1p1' or 1=1"}) === 'unknown',
  'a point the app does not have is answered unknown', R);
check(await add(null, {point_id: 'e-scarcity'}) === 'ok' && await add(null, {point_id: 'm1p1', which_part: 'question'}) === 'ok', 'Edexcel and maths points are accepted', R);
const made = (await admin("select pid from public.week_points where pid like '%-%' and pid not like 'e-%' limit 1"))[0];
check(!made || await add(null, {point_id: made.pid}) === 'ok', 'and a point the content pipeline made' + (made ? ' (' + made.pid + ')' : ''), R);
check(await add(null, {note_text: 'x'.repeat(301), why: 'typo'}) === 'long' && await add(null, {note_text: 'x'.repeat(300), why: 'typo'}) === 'ok', 'a note of 301 characters is answered long, and 300 is fine', R);
check(await add(null, {note_text: '😀'.repeat(300), why: 'unclear'}) === 'ok', 'an emoji counts as one character, as the sheet counts it', R);
check(await count('note is not null and char_length(note) > 300') === 0, 'nothing over 300 characters is ever kept', R);
check(await fails(null, "select public.add_feedback(point_id => 'c1p1', which_part => 'a', why => 'wrong', note_text => null, course_id => 'eco', app_version => 'dev', extra => 'x')") !== false,
  'nothing else can be sent with it', R);

// ---------- the limits ----------
// A signed-in student: the same point, part and reason once a day.
await clear();
check(await add(ana.id, {why: 'unclear'}) === 'ok' && await add(ana.id, {why: 'unclear', note_text: 'again'}) === 'already', 'the same point, part and reason twice in a day is answered already', R);
check(await add(ana.id, {why: 'typo'}) === 'ok' && await add(ana.id, {why: 'unclear', which_part: 'b'}) === 'ok' && await add(ben.id, {why: 'unclear'}) === 'ok',
  'another reason, another part or another student is fine', R);
await admin("update public.feedback set at = now() - interval '25 hours' where user_id = $1", [ana.id]);
check(await add(ana.id, {why: 'unclear'}) === 'ok', 'and the same again is fine after a day', R);
// 20 a day for each student.
await clear();
const qs = ['c1p1', 'c1p2', 'c1p3', 'c1p4', 'c1p5', 'c1p6', 'c1p7', 'c2p1', 'c2p2', 'c2p3', 'c2p4', 'c2p5'];
let okd = 0;
for (let i = 0; i < 20; i++) if (await add(ana.id, {point_id: qs[i % qs.length], which_part: i < qs.length ? 'a' : 'b'}) === 'ok') okd++;
check(okd === 20 && await add(ana.id, {point_id: 'c3p1'}) === 'limit', 'a student can send 20 a day, and the 21st is answered limit', R);
check(await count('user_id = $1', [ana.id]) === 20, 'and nothing is kept for it', R);
check(await add(ben.id, {point_id: 'c3p1'}) === 'ok' && await add(null, {point_id: 'c3p1'}) === 'ok', 'another student, and someone signed out, are not held back by it', R);
await admin("update public.feedback set at = now() - interval '25 hours' where user_id = $1 and point = 'c1p1'", [ana.id]);
check(await add(ana.id, {point_id: 'c3p1'}) === 'ok', 'once the oldest is a day old, the student can send one more', R);
// Signed out: 60 an hour and 300 a day, from everyone signed out together.
await clear();
await admin("insert into public.feedback (point, part, reason, course, version, signed_in) select 'c1p1', 'a', 'other', 'eco', 'dev', false from generate_series(1, 59)");
check(await add(null) === 'ok' && await add(null) === 'limit', 'signed out, the 60th in an hour is kept and the 61st is answered limit', R);
check(await add(ana.id) === 'ok', 'a signed-in student is not held back by it', R);
await admin("update public.feedback set at = now() - interval '2 hours' where not signed_in");
check(await add(null) === 'ok', 'an hour later, signed-out feedback goes in again', R);
await admin("insert into public.feedback (point, part, reason, course, version, signed_in, at) select 'c1p1', 'a', 'other', 'eco', 'dev', false, now() - interval '3 hours' from generate_series(1, 238)");
check(await count('not signed_in') === 299 && await add(null) === 'ok' && await add(null) === 'limit', 'and the 301st in a day is answered limit', R);
await admin("update public.feedback set at = now() - interval '25 hours' where not signed_in");
check(await add(null) === 'ok', 'a day later, it goes in again', R);
// Signed-in feedback never counts toward the signed-out limit, even once the account is deleted.
await clear();
await admin("insert into public.feedback (point, part, reason, course, version, signed_in, user_id) select 'c1p1', 'a', 'other', 'eco', 'dev', true, $1 from generate_series(1, 70)", [ben.id]);
await admin('delete from auth.users where id = $1', [ben.id]);
check(await count('user_id is null and signed_in') === 70, 'Delete account clears the account id and leaves the feedback', R);
check(await add(null) === 'ok', 'and a deleted account\'s feedback never counts toward the signed-out limit', R);

// ---------- the owner's view ----------
await clear();
await add(ana.id, {point_id: 'c1p2', why: 'typo', note_text: 'Spelling in line 2.', which_part: 'card 2'});
await admin("update public.feedback set at = now() - interval '2 days'");
await add(ana.id, {point_id: 'c1p1', why: 'wrong'});
await add(null, {point_id: 'c1p1', why: 'wrong', note_text: 'B is right too.'});
await add(null, {point_id: 'c1p1', why: 'unclear', course_id: 'edexcel'});
const view = await admin('select * from moderation.feedback_by_point');
check(view.length === 2 && view[0].point === 'c1p1' && view[1].point === 'c1p2', 'the view has one row per point, newest feedback first', R);
check(view[0].total === 3 && view[0].wrong === 2 && view[0].unclear === 1 && view[0].typo === 0 && view[0].other === 0 && view[0].courses === 'eco, edexcel',
  'with the count for each reason and the courses it was seen in', R);
const items = view[0].items;
check(items.length === 3 && items[0].reason === 'unclear' && items[2].reason === 'wrong' && items[1].note === 'B is right too.' && Object.keys(items[0]).sort().join() === 'at,course,id,note,part,reason,version',
  'and each piece of feedback, newest first, with its part, reason, note, course and version', R);
check(Object.keys(view[0]).sort().join() === 'courses,items,last_at,other,point,total,typo,unclear,wrong' && !JSON.stringify(view).includes(ana.id), 'no account id is anywhere in the view', R);

// ---------- clean-up, and running the file again ----------
await admin("insert into public.feedback (point, part, reason, course, version, signed_in, at) values ('c1p3', 'a', 'other', 'eco', 'dev', false, now() - interval '13 months')");
await admin('select moderation.feedback_cleanup()');
check(await count("point = 'c1p3'") === 0 && await count() === 4, 'the clean-up deletes feedback older than 12 months and keeps the rest', R);
await f.db.exec(SQL);
check(await count() === 4 && (await admin('select * from moderation.feedback_by_point')).length === 2, 'running feedback.sql again keeps the feedback and the view', R);
check(await fails(null, 'select * from public.feedback') === '42501' && await add(null, {point_id: 'c1p4'}) === 'ok', 'and the rules are back as written', R);

check(!/@(?!example\.com)[a-z0-9-]+\.[a-z]/i.test(SQL), 'no real email address in feedback.sql', R);

console.log(R.join('\n'));
