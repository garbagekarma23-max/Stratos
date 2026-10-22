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
--   day are shared with sign-in codes. A report that sends no email is still in open_reports, and the next email
--   counts it.
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
-- One row per report: whether an email went, and if not, why. request is pg_net's number for the email, which finds
-- Resend's answer. Nothing about a student is kept here: the report has that. The row goes when its report goes
-- (12 months, in moderation.cleanup).
-- outcome: sent (queued for Resend), skipped (another email went in the 5 minutes before), or failed.
-- why, for skipped and failed: five_minutes, no_key, no_address, no_pg_net, or error and the error's code.
create table if not exists moderation.alerts (
  report uuid primary key references moderation.reports (id) on delete cascade,
  at timestamptz not null default now(),
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

-- Runs after each report is saved. It never raises an error, so it can never stop a report.
create or replace function moderation.email_report()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  urgent boolean := new.reason = 'harm';
  label text := moderation.reason_label(new.reason);
  api_key text;
  send_to text;
  open_count int;
  req bigint;
  why text;
begin
  begin
    if not urgent then
      -- One report at a time from here, so two reports at the same moment cannot both send.
      perform pg_advisory_xact_lock(hashtextextended('stratos-report-email', 0));
      if exists (select 1 from moderation.alerts a where not a.urgent and a.outcome = 'sent' and a.at > now() - interval '5 minutes') then
        why := 'five_minutes';
      end if;
    end if;
    if why is null then
      select trim(s.decrypted_secret) into api_key from vault.decrypted_secrets s where s.name = 'resend_api_key';
      select trim(s.decrypted_secret) into send_to from vault.decrypted_secrets s where s.name = 'report_email_to';
      if coalesce(api_key, '') = '' then why := 'no_key';
      elsif coalesce(send_to, '') = '' then why := 'no_address';
      else
        select count(*) into open_count from moderation.reports r where r.status = 'new';
        req := net.http_post(
          url := 'https://api.resend.com/emails',
          headers := jsonb_build_object('Content-Type', 'application/json', 'Authorization', 'Bearer ' || api_key),
          body := jsonb_build_object(
            'from', 'Stratos <noreply@stratosstudy.com>',
            'to', jsonb_build_array(send_to),
            'subject', case when urgent then 'URGENT: ' else '' end || 'Stratos: new report (' || label || ')',
            'text', 'A new report came in on Stratos.' || chr(10) || chr(10) ||
              'Reason: ' || label || chr(10) ||
              'Open reports: ' || open_count || chr(10) || chr(10) ||
              'Open Supabase, then SQL Editor, and run:' || chr(10) ||
              'select * from moderation.open_reports;' || chr(10)),
          timeout_milliseconds := 10000);
      end if;
    end if;
  exception
    when undefined_function or invalid_schema_name then why := 'no_pg_net'; req := null;
    when others then why := 'error ' || sqlstate; req := null;
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
select a.at, a.report, moderation.reason_label(r.reason) as reason, a.urgent,
  case
    when a.outcome = 'sent' then moderation.email_answer(a.request, a.at)
    when a.why = 'five_minutes' then 'Not sent: another email went in the 5 minutes before. The report is in open_reports.'
    when a.why = 'no_key' then 'Not sent: Vault has no secret called resend_api_key.'
    when a.why = 'no_address' then 'Not sent: Vault has no secret called report_email_to.'
    when a.why = 'no_pg_net' then 'Not sent: pg_net is off. Turn it on in Database, then Extensions.'
    else 'Not sent: ' || coalesce(a.why, 'unknown error') || '.'
  end as what_happened
from moderation.alerts a
join moderation.reports r on r.id = a.report
order by a.at desc;

revoke all on all functions in schema moderation from public, anon, authenticated;
revoke all on all tables in schema moderation from public, anon, authenticated;
