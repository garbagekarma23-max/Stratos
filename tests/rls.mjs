// Checks the rules in supabase/schema.sql with no browser. The file is loaded into PGlite (Postgres running inside
// Node) with a small stand-in for Supabase's sign-in tables, then each request runs as one student, as someone not
// signed in, or as another student, and the test checks what the database lets through.
import fs from 'fs';
import { fakeSupabase } from './fake-supabase.mjs';
import { check } from './lib.mjs';

const R = [];
const f = await fakeSupabase();
const a = await f.user('a@example.com'), b = await f.user('b@example.com');
const fails = async (uid, sql, params) => { try { await f.as(uid, sql, params); return false; } catch (e) { return e.code || true; } };
const rows = async (uid, sql, params) => (await f.as(uid, sql, params)).rows;

// Row-level security is on for every table the app can reach.
const tables = (await f.admin("select c.relname, c.relrowsecurity from pg_class c join pg_namespace n on n.oid = c.relnamespace where n.nspname = 'public' and c.relkind = 'r'")).rows;
check(tables.length === 2 && tables.every(t => t.relrowsecurity), 'row-level security is on for every table: ' + tables.map(t => t.relname).join(', '), R);

// Someone not signed in gets nothing.
check(await fails(null, 'select * from public.progress') === '42501', 'not signed in: cannot read progress', R);
check(await fails(null, 'select * from public.profiles') === '42501', 'not signed in: cannot read profiles', R);
check(await fails(null, "insert into public.progress (user_id, data) values ($1, '{}')", [a.id]) === '42501', 'not signed in: cannot add progress', R);
check(await fails(null, 'select public.delete_account()') === '42501', 'not signed in: cannot call delete_account', R);

// Each student adds their own rows.
await f.as(a.id, "insert into public.progress (user_id, data) values ($1, '{\"v\":1,\"ans\":{\"c1p1a\":{\"ok\":true,\"n\":1,\"t\":1}}}')", [a.id]);
await f.as(b.id, "insert into public.progress (user_id, data) values ($1, '{\"v\":1}')", [b.id]);
await f.as(a.id, "insert into public.profiles (id, call_sign) values ($1, 'Ace')", [a.id]);
await f.as(b.id, "insert into public.profiles (id, call_sign) values ($1, 'Bee')", [b.id]);
check(true, 'a student can add their own progress and profile', R);

// Reading: only your own row.
const seen = await rows(a.id, 'select user_id from public.progress');
check(seen.length === 1 && seen[0].user_id === a.id, 'a student sees only their own progress, even asking for all of it', R);
check((await rows(a.id, 'select * from public.progress where user_id = $1', [b.id])).length === 0, 'asking for another student\'s progress by id gives nothing', R);
const names = await rows(a.id, 'select call_sign from public.profiles');
check(names.length === 1 && names[0].call_sign === 'Ace', 'a student sees only their own profile', R);

// Adding: only with your own id.
check(await fails(a.id, "insert into public.progress (user_id, data) values ($1, '{}')", [b.id]) === '42501', 'a student cannot add a progress row for someone else', R);
const c = await f.user('c@example.com');
check(await fails(a.id, "insert into public.profiles (id, call_sign) values ($1, 'Fake')", [c.id]) === '42501', 'a student cannot add a profile for someone else', R);

// Changing: only your own row, and it stays yours.
await f.as(a.id, "update public.progress set data = '{\"v\":1}', rev = 2 where user_id = $1", [b.id]);
const bNow = (await f.admin('select rev, data from public.progress where user_id = $1', [b.id])).rows[0];
check(bNow.rev === '1' || bNow.rev === 1, 'a student cannot change another student\'s progress (the change touches no rows)', R);
check(await fails(a.id, 'update public.progress set user_id = $1 where user_id = $2', [c.id, a.id]) === '42501', 'a student cannot move their progress to another id', R);
check(await fails(a.id, 'update public.profiles set id = $1 where id = $2', [c.id, a.id]) === '42501', 'a student cannot change their profile\'s id', R);
await f.as(a.id, "update public.profiles set call_sign = 'Hacked' where id = $1", [b.id]);
check((await f.admin('select call_sign from public.profiles where id = $1', [b.id])).rows[0].call_sign === 'Bee', 'a student cannot change another student\'s call sign', R);
check(await fails(a.id, "update public.progress set updated_at = '2000-01-01' where user_id = $1", [a.id]) === '42501', 'updated_at is set by the database, not the student', R);

// Deleting rows: nobody can.
check(await fails(a.id, 'delete from public.progress where user_id = $1', [a.id]) === '42501', 'a student cannot delete progress rows directly', R);
check(await fails(a.id, 'delete from public.profiles where id = $1', [a.id]) === '42501', 'a student cannot delete profile rows directly', R);

// What a row may hold.
check(await fails(a.id, "update public.profiles set call_sign = 'abcdefghijklmnopq' where id = $1", [a.id]) === '23514', 'a call sign longer than 16 characters is refused', R);
check(await fails(a.id, "update public.profiles set call_sign = '' where id = $1", [a.id]) === '23514', 'an empty call sign is refused (no call sign is null)', R);
const big = JSON.stringify({v: 1, junk: Array.from({length: 6000}, (_, i) => 'x'.repeat(40) + i)});
check(await fails(a.id, 'update public.progress set data = $1::jsonb where user_id = $2', [big, a.id]) === '23514', 'progress over the size cap is refused', R);
const real = JSON.stringify({v: 1, ans: Object.fromEntries(Array.from({length: 400}, (_, i) => ['c9p' + i + 'a', {ok: true, n: 3, t: 1760000000000 + i}]))});
check(!(await fails(a.id, 'update public.progress set data = $1::jsonb where user_id = $2', [real, a.id])), 'a large real save (' + Math.round(real.length / 1024) + ' KB, 400 answers) fits', R);

// The delete function takes nothing in and uses only auth.uid().
const sql = fs.readFileSync(new URL('../supabase/schema.sql', import.meta.url), 'utf8');
const defs = sql.match(/create (or replace )?function public\.delete_account\s*\([^)]*\)/gi) || [];
check(defs.length === 1 && /delete_account\s*\(\)/.test(defs[0]), 'schema.sql defines delete_account() once, with no arguments', R);
const body = /function public\.delete_account\(\)[\s\S]*?\$\$([\s\S]*?)\$\$/.exec(sql)[1].trim();
check(body === 'delete from auth.users where id = (select auth.uid());', 'its body deletes only the account whose id is auth.uid(): ' + body, R);
const args = (await f.admin("select pronargs from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname = 'public' and p.proname = 'delete_account'")).rows;
check(args.length === 1 && args[0].pronargs === 0, 'the database has one delete_account, taking no arguments', R);
check(await fails(a.id, 'select public.delete_account($1::uuid)', [b.id]) === '42883', 'calling it with another account\'s id is refused: no such function', R);
check(await fails(a.id, 'select public.delete_account(id => $1::uuid)', [b.id]) === '42883', 'calling it with a named id is refused too', R);
await f.as(a.id, 'select public.delete_account()');
const left = (await f.admin('select email from auth.users order by email')).rows.map(r => r.email);
check(left.join() === 'b@example.com,c@example.com', 'delete_account deletes the caller only: ' + left.join(', '), R);
check((await f.admin('select count(*)::int n from public.progress where user_id = $1', [a.id])).rows[0].n === 0, 'the caller\'s progress goes with the account', R);
check((await f.admin('select count(*)::int n from public.profiles where id = $1', [a.id])).rows[0].n === 0, 'and their profile', R);
check((await f.admin('select count(*)::int n from public.progress where user_id = $1', [b.id])).rows[0].n === 1, 'another student\'s progress stays', R);

// Running the file again is safe.
await f.db.exec(sql);
check((await f.admin('select count(*)::int n from public.profiles')).rows[0].n === 1, 'running schema.sql a second time keeps the data', R);

console.log(R.join('\n'));
