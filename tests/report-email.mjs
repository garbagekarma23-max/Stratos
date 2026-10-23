// Checks the report emails in supabase/report-email.sql with no browser. All four SQL files are loaded into PGlite
// (Postgres running inside Node) through fake-supabase.mjs, with stand-ins for Vault and pg_net: the stand-in pg_net
// sends nothing and keeps each request in net.sent, so the test can read exactly what would go to Resend.
import fs from 'fs';
import { fakeSupabase } from './fake-supabase.mjs';
import { check } from './lib.mjs';

const R = [];
const f = await fakeSupabase();
const SQL = fs.readFileSync(new URL('../supabase/report-email.sql', import.meta.url), 'utf8');
const KEY = 're_made_up_for_tests', TO = 'you@example.com';
let n = 0;
async function call(uid, fn, args = {}) {
  const keys = Object.keys(args);
  const r = await f.as(uid, 'select public.' + fn + '(' + keys.map((k, i) => k + ' => $' + (i + 1)).join(', ') + ') as v', keys.map(k => args[k]));
  return r.rows[0].v;
}
const fails = async (uid, sql, params) => { try { await f.as(uid, sql, params); return false; } catch (e) { return e.code || true; } };
const admin = async (sql, params) => (await f.admin(sql, params)).rows;
const user = async name => {
  const u = await f.user(name + '@example.com');
  await call(u.id, 'set_username', {new_username: name});
  return u;
};
// Two friends with an open chat, each with a call sign, and the reported one's messages numbered.
async function pair(nameA, nameB, says) {
  const a = await user(nameA), b = await user(nameB);
  await f.admin('update public.profiles set call_sign = $1 where id = $2', [nameA.split('.')[0].toUpperCase() + 'sign', a.id]);
  await f.admin('update public.profiles set call_sign = $1 where id = $2', [nameB.split('.')[0].toUpperCase() + 'sign', b.id]);
  await call(a.id, 'send_friend_request', {friend_code: (await call(b.id, 'friends_state')).me.code});
  await call(b.id, 'accept_friend_request', {ref: (await call(b.id, 'friends_state')).incoming[0].ref});
  const ref = (await call(a.id, 'friends_state')).friends[0].ref;
  await call(a.id, 'ask_to_message', {friend: ref});
  await call(b.id, 'accept_message_request', {friend: ref});
  const texts = [];
  // Ten messages a minute is the limit, so the log is cleared as they go.
  for (let i = 1; i <= says; i++) {
    if (i % 10 === 0) await f.admin('delete from public.message_log where user_id = $1', [b.id]);
    texts.push(nameB + ' secret line ' + i);
    await call(b.id, 'send_message', {friend: ref, body: texts[i - 1]});
  }
  return {a, b, ref, texts, next: 1};
}
// A reports the next of B's messages, and the report answer comes back.
const report = (p, reason) => call(p.a.id, 'report_message', {friend: p.ref, n: p.next++, reason});
const sent = async () => admin('select * from net.sent order by id');
const lastAlert = async () => (await admin('select * from moderation.alerts order by id desc limit 1'))[0];
// Move every email back in time, so the 5-minute wait is over.
const later = (mins = 6) => f.admin("update moderation.alerts set at = at - ($1 || ' minutes')::interval", [String(mins)]);
const reportCount = async () => (await admin('select count(*)::int c from moderation.reports'))[0].c;

await f.admin("insert into vault.decrypted_secrets values ('resend_api_key', $1), ('report_email_to', $2)", [KEY, TO]);
const p1 = await pair('ana.rep', 'ben.rep', 30);
const p2 = await pair('cat.rep', 'dan.rep', 30);

// ---------- locked away from students ----------
const rls = await admin("select c.relrowsecurity from pg_class c join pg_namespace s on s.oid = c.relnamespace where s.nspname = 'moderation' and c.relname = 'alerts'");
check(rls[0] && rls[0].relrowsecurity, 'row-level security is on for moderation.alerts', R);
check((await admin("select count(*)::int c from pg_policies where schemaname = 'moderation'"))[0].c === 0, 'with no rules, so only the owner reaches it', R);
let locked = 0;
for (const t of ['alerts', 'alert_status']) {
  if (await fails(p1.a.id, 'select * from moderation.' + t) === '42501') locked++;
  if (await fails(null, 'select * from moderation.' + t) === '42501') locked++;
}
check(locked === 4, 'no student and nobody signed out can read the emails list', R);
check(await fails(p1.a.id, "select moderation.email_answer(1, now())") === '42501' && await fails(p1.a.id, "select moderation.reason_label('spam')") === '42501' &&
  await fails(p1.a.id, 'select moderation.email_catchup()') === '42501' && await fails(p1.a.id, "select moderation.queue_email('Spam', false, true)") === '42501' &&
  await fails(p1.a.id, 'select moderation.emailed_lately()') === '42501', 'or call the email functions, the catch-up included', R);
check(!(await admin("select has_function_privilege('authenticated', 'moderation.email_report()', 'execute') a"))[0].a, 'or the trigger function', R);

// ---------- the first email ----------
check(await report(p1, 'spam') === 'ok', 'a report still answers ok', R);
let s = await sent();
check(s.length === 1 && s[0].url === 'https://api.resend.com/emails', 'it queues one email to Resend', R);
const e1 = s[0];
check(e1.headers.Authorization === 'Bearer ' + KEY && e1.headers['Content-Type'] === 'application/json', 'with the Resend key from Vault', R);
check(e1.body.from === 'Stratos <noreply@stratosstudy.com>' && JSON.stringify(e1.body.to) === JSON.stringify([TO]), 'from noreply@stratosstudy.com to the address in Vault', R);
check(e1.body.subject === 'Stratos: new report (Spam)', 'the subject names the reason', R);
const BODY = r => 'A new report came in on Stratos.\n\nReason: ' + r[0] + '\nOpen reports: ' + r[1] + '\n\nOpen Supabase, then SQL Editor, and run:\nselect * from moderation.open_reports;\n';
check(e1.body.text === BODY(['Spam', 1]), 'the text is exactly: a report came in, the reason, how many are open, and the query to run', R);
check(Object.keys(e1.body).sort().join() === 'from,subject,text,to', 'and the email has nothing else in it', R);
const rep1 = (await admin('select * from moderation.reports'))[0];
const chatId = (await admin('select id from public.chats where friendship = $1', [p1.ref]))[0].id;
const secrets = [...p1.texts, 'ana.rep', 'ben.rep', 'ANAsign', 'BENsign', p1.a.id, p1.b.id, p1.a.email, p1.b.email, p1.ref, chatId, rep1.id];
const leaked = secrets.filter(x => JSON.stringify(e1.body).toLowerCase().includes(String(x).toLowerCase()));
check(!leaked.length, 'no message text, username, call sign, account id, email, chat or report id is in it', R);
let a = await lastAlert();
check(a.report === rep1.id && a.outcome === 'sent' && !a.urgent && a.request === Number(e1.id), 'moderation.alerts records the email as sent, with pg_net\'s number for it', R);

// ---------- at most one non-urgent email every 5 minutes, across all students ----------
check(await report(p1, 'bullying') === 'ok' && (await sent()).length === 1, 'a second report from the same student inside 5 minutes sends no email', R);
check(await report(p2, 'sexual') === 'ok' && (await sent()).length === 1, 'and nor does a report from a different student', R);
a = await lastAlert();
check(a.outcome === 'skipped' && a.why === 'five_minutes' && await reportCount() === 3, 'each is recorded as skipped, and every report is saved', R);
check((await admin("select count(*)::int c from moderation.open_reports"))[0].c === 3, 'and all three are in open_reports', R);

// ---------- urgent always sends ----------
check(await report(p2, 'harm') === 'ok', 'an urgent report answers ok', R);
s = await sent();
check(s.length === 2 && s[1].body.subject === 'URGENT: Stratos: new report (Hurting themselves or others)', 'a Hurting themselves or others report sends inside the 5 minutes, with URGENT at the start of the subject', R);
check(s[1].body.text === BODY(['Hurting themselves or others', 4]), 'and counts every open report, the skipped ones too', R);
check(await report(p1, 'harm') === 'ok' && (await sent()).length === 3, 'a second urgent report straight after sends too', R);
a = await lastAlert();
check(a.urgent && a.outcome === 'sent', 'urgent emails are recorded as urgent', R);
check(await report(p2, 'spam') === 'ok' && (await sent()).length === 3, 'a non-urgent report is still held back by the last non-urgent email', R);
await f.admin("update moderation.alerts set at = at - interval '6 minutes' where not urgent");
check(await report(p2, 'spam') === 'ok' && (await sent()).length === 4, 'urgent emails do not count toward the 5 minutes: once the last non-urgent one is 5 minutes old, the next sends', R);

// ---------- open count, and each reason's words ----------
await admin("select moderation.reviewed(id) from moderation.reports where reason = 'bullying'");
await later();
await report(p1, 'personal');
s = await sent();
check(s.at(-1).body.text.includes('Open reports: 7\n'), 'a reviewed report is not counted as open', R);
const labels = {bullying: 'Bullying or threats', sexual: 'Sexual or rude', personal: 'Asking for personal details or to meet', spam: 'Spam', other: 'Something else'};
const subjects = [];
for (const [reason, label] of Object.entries(labels)) {
  await later();
  await f.admin('delete from public.message_log where user_id = $1', [p2.a.id]);
  await report(p2, reason);
  subjects.push((await sent()).at(-1).body.subject === 'Stratos: new report (' + label + ')');
}
check(subjects.every(Boolean), 'each reason is written as the report sheet words it, with no URGENT', R);

// ---------- a failed email never stops a report ----------
await f.admin('delete from public.message_log');
await later();
await f.admin("create or replace function net.http_post(url text, body jsonb default '{}', params jsonb default '{}', headers jsonb default '{}', timeout_milliseconds int default 5000) returns bigint language plpgsql as $$ begin raise exception 'queue full'; end $$");
let before = await reportCount();
check(await report(p1, 'spam') === 'ok' && await report(p2, 'harm') === 'ok' && await reportCount() === before + 2, 'when pg_net errors, the report still answers ok and is saved, urgent or not', R);
a = await lastAlert();
check(a.outcome === 'failed' && a.why === 'error P0001' && a.request === null, 'the failure is recorded with its error code', R);
await f.admin("alter function net.http_post(text, jsonb, jsonb, jsonb, int) rename to http_post_off");
before = await reportCount();
check(await report(p1, 'harm') === 'ok' && await reportCount() === before + 1 && (await lastAlert()).why === 'no_pg_net', 'with pg_net off, the report is saved and the alert says pg_net is off', R);
await f.admin("drop function net.http_post_off(text, jsonb, jsonb, jsonb, int)");
await f.admin("create function net.http_post(url text, body jsonb default '{}', params jsonb default '{}', headers jsonb default '{}', timeout_milliseconds int default 5000) returns bigint language sql as $$ insert into net.sent (url, headers, body) values (url, headers, body) returning id $$");
const countSent = (await sent()).length;
await f.admin("delete from vault.decrypted_secrets where name = 'resend_api_key'");
check(await report(p1, 'harm') === 'ok' && (await lastAlert()).why === 'no_key' && (await sent()).length === countSent, 'with no Resend key in Vault, nothing is sent and the report is saved', R);
await f.admin("insert into vault.decrypted_secrets values ('resend_api_key', $1)", [KEY]);
await f.admin("update vault.decrypted_secrets set decrypted_secret = '  ' where name = 'report_email_to'");
check(await report(p1, 'harm') === 'ok' && (await lastAlert()).why === 'no_address' && (await sent()).length === countSent, 'with no address in Vault, the same', R);
await f.admin("update vault.decrypted_secrets set decrypted_secret = $1 where name = 'report_email_to'", [' ' + TO + ' ']);
check(await report(p1, 'harm') === 'ok' && JSON.stringify((await sent()).at(-1).body.to) === JSON.stringify([TO]), 'spaces around a secret are trimmed', R);
// A rule that refuses every new row, so writing the alert fails for certain.
await f.admin('alter table moderation.alerts add constraint refuse_all check (false) not valid');
before = await reportCount();
const alertsBefore = (await admin('select count(*)::int c from moderation.alerts'))[0].c;
check(await report(p1, 'harm') === 'ok' && await reportCount() === before + 1 && (await admin('select count(*)::int c from moderation.alerts'))[0].c === alertsBefore,
  'even if the alert cannot be written, the report is saved', R);
await f.admin('alter table moderation.alerts drop constraint refuse_all');

// ---------- alert_status, in words ----------
await f.admin('delete from moderation.alerts');
await f.admin('delete from public.message_log');
await report(p2, 'spam');
const id1 = (await lastAlert()).request;
let st = (await admin('select * from moderation.alert_status'))[0];
check(st.reason === 'Spam' && st.urgent === false && st.what_happened === 'Sent. Waiting for Resend to answer.', 'alert_status shows a new email as waiting for Resend', R);
await f.admin("insert into net._http_response (id, status_code, content) values ($1, 200, '{}')", [id1]);
st = (await admin('select * from moderation.alert_status'))[0];
check(st.what_happened === 'Sent. Resend accepted it.', 'then as accepted once Resend answers', R);
await report(p2, 'other');
st = (await admin('select * from moderation.alert_status'))[0];
check(st.what_happened.startsWith('Not sent: another email went in the 5 minutes before.'), 'a skipped one says why', R);
await later();
await report(p2, 'spam');
await f.admin("insert into net._http_response (id, status_code, content) values ($1, 401, '{\"message\":\"API key is invalid\"}')", [(await lastAlert()).request]);
st = (await admin('select * from moderation.alert_status'))[0];
check(st.what_happened === 'Resend refused it (401): {"message":"API key is invalid"}', 'a refused one shows Resend\'s answer', R);
await f.admin("update moderation.alerts set at = at - interval '7 hours'");
await report(p2, 'harm');
st = (await admin('select * from moderation.alert_status'))[1];
check(st.what_happened.startsWith('Resend refused it') && (await admin("select count(*)::int c from moderation.alert_status where what_happened like 'Sent. Resend''s answer is no longer kept%'"))[0].c === 0,
  'answers pg_net still has are shown however old', R);
await f.admin("delete from net._http_response");
check((await admin("select count(*)::int c from moderation.alert_status where what_happened like 'Sent. Resend''s answer is no longer kept%'"))[0].c === 2, 'and one whose answer pg_net has cleared after 6 hours says so', R);
await f.admin('alter table net._http_response rename to responses_away');
check((await admin("select count(*)::int c from moderation.alert_status where what_happened = 'pg_net is off, so there is no answer.'"))[0].c === 3, 'with pg_net off, the list still opens and says so', R);
await f.admin('alter table net.responses_away rename to _http_response');

// ---------- kept and cleaned up with the report ----------
const r1 = (await lastAlert()).report;
await f.admin('delete from moderation.reports where id = $1', [r1]);
check(!(await admin('select 1 from moderation.alerts where report = $1', [r1])).length, 'an alert goes when its report goes (the 12-month clean-up)', R);

// ---------- the catch-up every 15 minutes ----------
const catchup = async () => (await admin('select moderation.email_catchup() r'))[0].r;
const job = (await admin("select * from cron.job where jobname = 'stratos-report-catchup'"))[0];
check(job && job.schedule === '*/15 * * * *' && job.command === 'select moderation.email_catchup()', 'the file adds a Cron job that runs the catch-up every 15 minutes', R);
await f.admin('delete from moderation.alerts');
await f.admin('delete from public.message_log');
await f.admin("update moderation.reports set status = 'reviewed'");
check(await catchup() === 'No reports waiting for an email.', 'with nothing held back, the catch-up sends nothing', R);
await report(p2, 'spam');
await report(p1, 'sexual');
let had = (await sent()).length;
check((await lastAlert()).outcome === 'skipped' && await catchup() === 'Waiting: an email went in the last 5 minutes.' && (await sent()).length === had,
  'a report held back inside the 5 minutes: the catch-up waits too, inside the same limit', R);
await later();
check(await catchup() === 'Sent one email about 1 report.' && (await sent()).length === had + 1, 'once the 5 minutes are over, the catch-up sends one email', R);
const c1 = (await sent()).at(-1);
check(c1.body.subject === 'Stratos: new report (Sexual or rude)' && c1.body.text === BODY(['Sexual or rude', 2]) && c1.headers.Authorization === 'Bearer ' + KEY,
  'in the same format, with the held-back report\'s reason and every open report counted', R);
const c1Leak = [...p1.texts, ...p2.texts, 'ana.rep', 'cat.rep', 'ANAsign', 'CATsign', p1.a.id, p2.a.id, p1.a.email, p2.a.email].filter(x => JSON.stringify(c1.body).toLowerCase().includes(String(x).toLowerCase()));
check(!c1Leak.length, 'with nothing about a student in it', R);
check(await catchup() === 'No reports waiting for an email.', 'once it has gone, the next catch-up has nothing to send', R);
await report(p2, 'bullying');
check((await lastAlert()).outcome === 'skipped', 'the catch-up email counts toward the 5 minutes, so a report straight after is held back', R);
await report(p1, 'personal');
await later();
check(await catchup() === 'Sent one email about 2 reports.', 'several held-back reports make one email', R);
const c2 = (await sent()).at(-1);
check(c2.body.subject === 'Stratos: new reports (Asking for personal details or to meet, Bullying or threats)' &&
  c2.body.text === 'New reports came in on Stratos.\n\nReasons: Asking for personal details or to meet, Bullying or threats\nOpen reports: 4\n\nOpen Supabase, then SQL Editor, and run:\nselect * from moderation.open_reports;\n',
  'which names each reason once', R);
await later();
await report(p2, 'spam');
await report(p1, 'other');
await report(p2, 'harm');
await later();
check((await admin("select outcome from moderation.alerts order by id desc limit 3")).map(r => r.outcome).join() === 'sent,skipped,sent' && await catchup() === 'No reports waiting for an email.',
  'a held-back report that a later email counted (an urgent one too) needs no catch-up', R);
await report(p1, 'spam');
await report(p2, 'other');
await admin("select moderation.reviewed(report) from moderation.alerts where outcome = 'skipped' order by id desc limit 1");
await later();
check(await catchup() === 'No reports waiting for an email.', 'nor does one already reviewed', R);
await report(p1, 'spam');
await report(p2, 'sexual');
await later();
await f.admin("alter function net.http_post(text, jsonb, jsonb, jsonb, int) rename to http_post_off");
check(await catchup() === 'Not sent: no_pg_net. It is tried again next time.' && (await lastAlert()).outcome === 'failed' && (await lastAlert()).report === null,
  'a catch-up email that fails is recorded and raises no error', R);
await f.admin("alter function net.http_post_off(text, jsonb, jsonb, jsonb, int) rename to http_post");
check(await catchup() === 'Sent one email about 1 report.', 'and is tried again by the next catch-up', R);
st = (await admin('select * from moderation.alert_status'))[0];
check(st.reason === 'Catch-up' && st.report === null && st.what_happened === 'Sent. Waiting for Resend to answer.', 'alert_status lists a catch-up email as Catch-up', R);
await f.admin("update moderation.alerts set at = at - interval '13 months' where report is null");
await catchup();
check(!(await admin("select 1 from moderation.alerts where at < now() - interval '12 months'")).length, 'catch-up rows older than 12 months are deleted', R);

// ---------- running the file again ----------
const keep = (await admin('select count(*)::int c from moderation.alerts'))[0].c;
await f.db.exec(SQL);
check((await admin('select count(*)::int c from moderation.alerts'))[0].c === keep && keep > 0, 'running report-email.sql a second time keeps the alerts', R);
check((await admin("select count(*)::int c from pg_trigger where tgname = 'email_report'"))[0].c === 1 && (await admin("select count(*)::int c from cron.job where command like '%email_catchup%'"))[0].c === 1, 'and leaves one trigger and one catch-up Cron job', R);
await later();
check(await report(p2, 'spam') === 'ok' && (await lastAlert()).outcome === 'sent', 'which still sends', R);

// An early copy of the alerts table, one row per report with no id, made by hand before the file was merged, is replaced.
await f.admin('drop table moderation.alerts cascade');
await f.admin("create table moderation.alerts (report uuid primary key references moderation.reports (id) on delete cascade, at timestamptz not null default now(), urgent boolean not null, outcome text not null, why text, request bigint)");
await f.db.exec(SQL);
await later();
check(await report(p2, 'spam') === 'ok' && (await lastAlert()).outcome === 'sent' && (await admin('select * from moderation.alert_status')).length === 1, 'an early copy of the alerts table is replaced, and emails work after', R);

// ---------- nothing secret in the repository ----------
check(!/re_[A-Za-z0-9]{8,}/.test(SQL) && !/[A-Za-z0-9._%+-]+@(?!stratosstudy\.com|example\.com)[A-Za-z0-9.-]+\.[a-z]{2,}/i.test(SQL), 'the SQL file has no Resend key and no address but stratosstudy.com and example.com', R);

console.log(R.join('\n'));
