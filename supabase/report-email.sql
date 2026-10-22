-- Stratos report emails: an email to the owner each time a student reports a message.
-- Run supabase/schema.sql, supabase/friends.sql and supabase/messages.sql first (they are in already). Put the two
-- secrets in Vault (README step 15), then paste this whole file into the SQL Editor and press Run. Running it again is
-- safe: it keeps what is stored and puts the code back as written.
--
-- How it works, in short:
-- * When a report is saved in moderation.reports, a trigger decides whether to email, then puts the email in pg_net's
--   queue. pg_net is Supabase's extension for calling a web address from the database. It sends the email to Resend
--   only after the report is saved, and apart from the student's request, so a slow or broken Resend never holds a
--   report up.
-- * Any error here (pg_net off, a secret missing, anything else) is caught and written down in moderation.alerts. The
--   report is saved every time.
-- * The email says only that a report came in, its reason, how many reports are open, and the query to run. It never
--   holds the messages, a username, a call sign, an id or an email of a student, because it lands in an ordinary inbox.
-- * "Hurting themselves or others" is urgent: URGENT at the start of the subject, and it always sends.
-- * Every other report sends at most one email every 5 minutes, across all students, because Resend's 100 emails a
--   day are shared with sign-in codes. A report held back by that limit is still in open_reports, and the next email
--   counts it. If no other email comes, a catch-up every 15 minutes (Supabase Cron) sends one, inside the same limit.
-- * The Resend key and the address to send to are secrets in Vault, named resend_api_key and report_email_to. They are
--   never in this file or anywhere in the repository.


-- ---------- pg_net ----------
-- Turn pg_net on, if this project has it. If it cannot be turned on here, turn it on in Database, then Extensions.
-- Until it is on, reports are still saved, and moderation.alert_status says pg_net is off.
do $$
begin
  if exists (select 1 from pg_available_extensions where name = 'pg_net') then
    create extension if not exists pg_net with schema extensions;
  end if;
end;
$$;


-- ---------- the table ----------
-- One row per email tried: one for each report, and one for each catch-up email (report empty). request is pg_net's
-- number for the email, which finds Resend's answer. Nothing about a student is kept here: the report has that. A
-- report's row goes when its report goes (12 months, in moderation.cleanup); a catch-up row after 12 months.
-- outcome: sent (queued for Resend), skipped (another email went in the 5 minutes before), or failed.
-- why, for skipped and failed: five_minutes, no_key, no_address, no_pg_net, or error and the error's code.
-- at is the moment the row is written, after the lock below, so it puts the emails in the order they really went.
-- An early copy of this table, with one row per report and no id, was only ever made by hand before this file was
-- merged, and holds nothing worth keeping. It is replaced.
do $$
begin
  if to_regclass('moderation.alerts') is not null and not exists (select 1 from information_schema.columns
      where table_schema = 'moderation' and table_name = 'alerts' and column_name = 'id') then
    drop table moderation.alerts cascade;
  end if;
end;
$$;
create table if not exists moderation.alerts (
  id bigint generated always as identity primary key,
  report uuid unique references moderation.reports (id) on delete cascade,
  at timestamptz not null default clock_timestamp(),
  urgent boolean not null,
  outcome text not null check (outcome in ('sent', 'skipped', 'failed')),
  why text,
  request bigint
);
create index if not exists alerts_at on moderation.alerts (at);

revoke all on moderation.alerts from public, anon, authenticated;
alter table moderation.alerts enable row level security;


-- ---------- the email ----------
-- A reason as the report sheet in the app words it.
create or replace function moderation.reason_label(reason text)
returns text
language sql
immutable
set search_path = ''
as $$
  select case reason
    when 'bullying' then 'Bullying or threats'
    when 'sexual' then 'Sexual or rude'
    when 'personal' then 'Asking for personal details or to meet'
    when 'harm' then 'Hurting themselves or others'
    when 'spam' then 'Spam'
    when 'other' then 'Something else'
    else reason end;
$$;

-- Put one email in pg_net's queue. reasons: the reasons, in words, joined with commas; many: more than one report.
-- Answers pg_net's number for it, or why it was not sent (no_key, no_address, no_pg_net, or error and a code). It
-- never raises an error.
create or replace function moderation.queue_email(reasons text, many boolean, urgent boolean, out req bigint, out why text)
language plpgsql
security definer
set search_path = ''
as $$
declare
  api_key text;
  send_to text;
  open_count int;
begin
  select trim(s.decrypted_secret) into api_key from vault.decrypted_secrets s where s.name = 'resend_api_key';
  select trim(s.decrypted_secret) into send_to from vault.decrypted_secrets s where s.name = 'report_email_to';
  if coalesce(api_key, '') = '' then why := 'no_key'; return; end if;
  if coalesce(send_to, '') = '' then why := 'no_address'; return; end if;
  select count(*) into open_count from moderation.reports r where r.status = 'new';
  req := net.http_post(
    url := 'https://api.resend.com/emails',
    headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || api_key),
    body := jsonb_build_object(
      'from', 'Stratos <noreply@stratosstudy.com>',
      'to', jsonb_build_array(send_to),
      'subject', case when urgent then 'URGENT: ' else '' end || 'Stratos: new report' || case when many then 's' else '' end || ' (' || reasons || ')',
      'text', case when many then 'New reports came in on Stratos.' else 'A new report came in on Stratos.' end || chr(10) || chr(10) ||
        case when many then 'Reasons: ' else 'Reason: ' end || reasons || chr(10) ||
        'Open reports: ' || open_count || chr(10) || chr(10) ||
        'Open Supabase, then SQL Editor, and run:' || chr(10) ||
        'select * from moderation.open_reports;' || chr(10)),
    timeout_milliseconds := 10000);
exception
  when undefined_function or invalid_schema_name then req := null; why := 'no_pg_net';
  when others then req := null; why := 'error ' || sqlstate;
end;
$$;

-- An email went in the last 5 minutes that was not urgent. Urgent ones do not count toward the limit.
create or replace function moderation.emailed_lately()
returns boolean
language sql
stable
set search_path = ''
as $$
  select exists (select 1 from moderation.alerts a where not a.urgent and a.outcome = 'sent' and a.at > clock_timestamp() - interval '5 minutes');
$$;

-- Runs after each report is saved. It never raises an error, so it can never stop a report.
create or replace function moderation.email_report()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  urgent boolean := new.reason = 'harm';
  req bigint;
  why text;
begin
  begin
    -- One email at a time from here, urgent or not, so two reports at the same moment cannot both send, and every
    -- email counts the reports saved before it.
    perform pg_advisory_xact_lock(hashtextextended('stratos-report-email', 0));
    if not urgent and moderation.emailed_lately() then
      why := 'five_minutes';
    else
      select q.req, q.why into req, why from moderation.queue_email(moderation.reason_label(new.reason), false, urgent) q;
    end if;
  exception
    when others then req := null; why := 'error ' || sqlstate;
  end;
  begin
    insert into moderation.alerts (report, urgent, outcome, why, request)
    values (new.id, urgent, case when req is not null then 'sent' when why = 'five_minutes' then 'skipped' else 'failed' end, why, req);
  exception when others then null;
  end;
  return null;
end;
$$;

create or replace trigger email_report after insert on moderation.reports
  for each row execute function moderation.email_report();

-- The catch-up, every 15 minutes. Reports held back by the 5-minute limit, still new, that no email since has
-- counted: one email about them all, unless an email went in the last 5 minutes (that one, or the next catch-up,
-- covers them). An email that failed is tried again next time. Answers what it did, in words.
create or replace function moderation.email_catchup()
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  held int;
  reasons text;
  req bigint;
  why text;
begin
  perform pg_advisory_xact_lock(hashtextextended('stratos-report-email', 0));
  delete from moderation.alerts where report is null and at < now() - interval '12 months';
  select count(*), string_agg(distinct moderation.reason_label(r.reason), ', ' order by moderation.reason_label(r.reason)) into held, reasons
  from moderation.alerts a join moderation.reports r on r.id = a.report
  where a.outcome = 'skipped' and r.status = 'new'
    and not exists (select 1 from moderation.alerts b where b.outcome = 'sent' and b.at > a.at);
  if held = 0 then return 'No reports waiting for an email.'; end if;
  if moderation.emailed_lately() then return 'Waiting: an email went in the last 5 minutes.'; end if;
  select q.req, q.why into req, why from moderation.queue_email(reasons, held > 1, false) q;
  insert into moderation.alerts (report, urgent, outcome, why, request)
  values (null, false, case when req is not null then 'sent' else 'failed' end, why, req);
  if req is null then return 'Not sent: ' || why || '. It is tried again next time.'; end if;
  return 'Sent one email about ' || held || case when held = 1 then ' report.' else ' reports.' end;
end;
$$;


-- ---------- what the owner runs in the SQL Editor ----------
-- Resend's answer to one email, in words. pg_net keeps answers for 6 hours.
create or replace function moderation.email_answer(req bigint, sent_at timestamptz)
returns text
language plpgsql
stable
set search_path = ''
as $$
declare
  r record;
begin
  select h.status_code, h.content, h.error_msg, h.timed_out into r from net._http_response h where h.id = req;
  if not found then
    if sent_at > now() - interval '6 hours' then return 'Sent. Waiting for Resend to answer.'; end if;
    return 'Sent. Resend''s answer is no longer kept (pg_net keeps answers 6 hours).';
  end if;
  if r.timed_out then return 'Resend did not answer in time.'; end if;
  if r.error_msg is not null then return 'Could not reach Resend: ' || r.error_msg; end if;
  if r.status_code between 200 and 299 then return 'Sent. Resend accepted it.'; end if;
  return 'Resend refused it (' || r.status_code || '): ' || left(coalesce(r.content, ''), 200);
exception
  when undefined_table or invalid_schema_name then return 'pg_net is off, so there is no answer.';
end;
$$;

-- Each report's email, newest first: select * from moderation.alert_status;
create or replace view moderation.alert_status as
select a.at, a.report, coalesce(moderation.reason_label(r.reason), 'Catch-up') as reason, a.urgent,
  case
    when a.outcome = 'sent' then moderation.email_answer(a.request, a.at)
    when a.why = 'five_minutes' then 'Not sent: another email went in the 5 minutes before. The next email, or the catch-up within 15 minutes, counts it.'
    when a.why = 'no_key' then 'Not sent: Vault has no secret called resend_api_key.'
    when a.why = 'no_address' then 'Not sent: Vault has no secret called report_email_to.'
    when a.why = 'no_pg_net' then 'Not sent: pg_net is off. Turn it on in Database, then Extensions.'
    else 'Not sent: ' || coalesce(a.why, 'unknown error') || '.'
  end as what_happened
from moderation.alerts a
left join moderation.reports r on r.id = a.report
order by a.at desc;

revoke all on all functions in schema moderation from public, anon, authenticated;
revoke all on all tables in schema moderation from public, anon, authenticated;

-- Run the catch-up every 15 minutes, once Supabase Cron is turned on (README step 12). If it is not on yet, this does
-- nothing: turn it on and run this file again.
do $$
begin
  if to_regprocedure('cron.schedule(text, text, text)') is not null then
    perform cron.schedule('stratos-report-catchup', '*/15 * * * *', 'select moderation.email_catchup()');
  end if;
end;
$$;
