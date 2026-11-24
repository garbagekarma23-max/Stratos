// Checks supabase/switches.sql with no browser: new accounts start with the three sharing switches off, accounts from
// before keep what they had and get a notice once, and running the file again changes nothing. The database is made the
// way the real one was before the file (every SQL file but switches.sql, with the old defaults), accounts are made the
// old way, then the file is run as the owner will run it.
import { fakeSupabase } from './fake-supabase.mjs';
import { check } from './lib.mjs';

const R = [];
const f = await fakeSupabase({before: true});
const call = async (uid, fn, args = {}) => {
  const keys = Object.keys(args);
  const r = await f.as(uid, 'select public.' + fn + '(' + keys.map((k, i) => k + ' => $' + (i + 1)).join(', ') + ') as v', keys.map(k => args[k]));
  return r.rows[0].v;
};
const fails = async (uid, sql, params) => { try { await f.as(uid, sql, params); return false; } catch (e) { return e.code || true; } };
const prof = async uid => ((await f.admin('select to_jsonb(p) j from public.profiles p where id = $1', [uid])).rows[0] || {}).j;
const sw = p => p && [p.findable, p.show_online, p.show_week].join();

// ---------- accounts from before ----------
// Ana picked a username and kept the switches as they were (all on). Ben turned online and the weekly table off.
// Cy has an account but never picked a call sign or username, so has no profiles row.
const ana = await f.user('ana@example.com'), ben = await f.user('ben@example.com'), cy = await f.user('cy@example.com');
await call(ana.id, 'set_username', {new_username: 'ana.old'});
await call(ben.id, 'set_username', {new_username: 'ben.old'});
await call(ben.id, 'set_show_online', {show_on: false});
await call(ben.id, 'set_show_week', {show_on: false});
const before = {ana: sw(await prof(ana.id)), ben: sw(await prof(ben.id))};
check(before.ana === 'true,true,true' && before.ben === 'true,false,false' && !(await prof(cy.id)), 'before the file: the old defaults, on', R);

await f.runSwitches();
const a1 = await prof(ana.id), b1 = await prof(ben.id), c1 = await prof(cy.id);
check(sw(a1) === before.ana && sw(b1) === before.ben, 'accounts from before keep exactly the switches they had', R);
check(sw(c1) === 'true,true,true', 'an account from before with no profiles row gets one, with the old settings, so nothing changes for it', R);
check(a1.switch_notice && b1.switch_notice && c1.switch_notice, 'every account from before has the notice to see', R);
const n = await call(ben.id, 'switch_notice');
check(n.show === true && n.findable === true && n.online === false && n.week === false, 'switch_notice says to show it, with where each switch stands now', R);

// ---------- new accounts ----------
const dee = await f.user('dee@example.com');
await call(dee.id, 'set_username', {new_username: 'dee.new'});
const d1 = await prof(dee.id);
check(sw(d1) === 'false,false,false' && d1.switch_notice === false, 'a new account starts with all three switches off and no notice', R);
const eve = await f.user('eve@example.com');
const e1 = await call(eve.id, 'switch_notice');
check(e1.show === false && !e1.findable && !e1.online && !e1.week, 'a new account with no profiles row yet: no notice, and every switch off', R);
const st = await call(eve.id, 'friends_state');
check(st.me.findable === false, 'and friends_state says it cannot be found by username', R);
const on = await call(eve.id, 'online_now', {here: true});
check(on.show === false && !(await f.admin('select 1 from public.online where user_id = $1', [eve.id])).rows.length, 'and it is never marked online', R);
const wk = await call(eve.id, 'week_table', {since: new Date().toISOString()});
check(wk.show === false, 'and the weekly table says it is hidden from friends', R);
const found = await call(ana.id, 'find_students', {search: 'dee'});
check(found.result === 'ok' && found.found.length === 0, 'search does not show a new account until it turns the switch on', R);
await call(dee.id, 'set_findable', {findable_on: true});
check((await call(ana.id, 'find_students', {search: 'dee'})).found.length === 1, 'and shows it once it does', R);
await call(dee.id, 'set_findable', {findable_on: null});
check((await prof(dee.id)).findable === false, 'a switch set with nothing turns it off', R);

// ---------- seeing the notice ----------
await call(ana.id, 'seen_switch_notice');
check((await call(ana.id, 'switch_notice')).show === false && (await prof(ben.id)).switch_notice, 'seen_switch_notice clears only the caller\'s notice', R);
check(sw(await prof(ana.id)) === before.ana, 'and changes no switch', R);
check(await fails(ben.id, 'update public.profiles set switch_notice = false where id = $1', [ben.id]) === '42501', 'a student cannot write switch_notice directly', R);
check(await fails(null, 'select public.switch_notice()') === '42501' && await fails(null, 'select public.seen_switch_notice()') === '42501',
  'someone not signed in can call neither function', R);
const anon = (await f.admin("select p.proname from pg_proc p join pg_namespace n on n.oid = p.pronamespace where p.proname in ('switch_notice', 'seen_switch_notice') and has_function_privilege('anon', p.oid, 'execute')")).rows;
check(!anon.length, 'and neither is granted to signed-out visitors', R);

// ---------- running the file again ----------
await f.runSwitches();
check(sw(await prof(ana.id)) === before.ana && sw(await prof(ben.id)) === before.ben && sw(await prof(dee.id)) === 'false,false,false',
  'running the file again changes nobody\'s switches', R);
check((await prof(ana.id)).switch_notice === false && (await prof(ben.id)).switch_notice === true && (await prof(dee.id)).switch_notice === false,
  'and keeps every notice as it was: seen stays seen, waiting stays waiting, and new accounts get none', R);
const fred = await f.user('fred@example.com');
await call(fred.id, 'set_username', {new_username: 'fred.new'});
check(sw(await prof(fred.id)) === 'false,false,false' && (await prof(fred.id)).switch_notice === false, 'an account made after the second run still starts off, with no notice', R);
const defs = (await f.admin("select column_name, column_default from information_schema.columns where table_schema = 'public' and table_name = 'profiles' and column_name in ('findable', 'show_online', 'show_week', 'switch_notice')")).rows;
check(defs.length === 4 && defs.every(d => d.column_default === 'false'), 'every column\'s default is off', R);

console.log(R.join('\n'));
