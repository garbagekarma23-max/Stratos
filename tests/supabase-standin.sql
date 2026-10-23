-- A small stand-in for the parts of a Supabase project that supabase/schema.sql relies on, so the tests can run
-- that file in PGlite (Postgres running inside Node). Supabase makes these itself; never paste this into Supabase.

-- anon is anyone not signed in, authenticated is a signed-in student. Requests run as one of these.
create role anon nologin;
create role authenticated nologin;

-- Supabase's own list of accounts. Students cannot reach it.
create schema auth;
create table auth.users (id uuid primary key default gen_random_uuid(), email text unique not null);
grant usage on schema auth to anon, authenticated;

-- The id of the student who sent the request. Supabase reads it from their sign-in; the fake sets it for each request.
create function auth.uid() returns uuid language sql stable
  as $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;

-- Supabase gives anon and authenticated everything on new tables and functions by default. The stand-in does the
-- same, so the tests show that schema.sql takes it back.
grant usage on schema public to anon, authenticated;
alter default privileges in schema public grant all on tables to anon, authenticated;
alter default privileges in schema public grant all on functions to anon, authenticated;

-- Vault, where Supabase keeps secrets such as the Resend key. The real one keeps them encrypted; the tests put
-- made-up values straight in.
create schema vault;
create table vault.decrypted_secrets (name text primary key, decrypted_secret text);

-- pg_net, which calls a web address from the database. The stand-in sends nothing: it keeps each request in net.sent
-- so a test can read it. A test writes Resend's answers into net._http_response by hand.
create schema net;
create table net.sent (id bigserial primary key, url text, headers jsonb, body jsonb, at timestamptz default now());
create table net._http_response (id bigint, status_code int, content text, error_msg text, timed_out boolean, created timestamptz default now());
create function net.http_post(url text, body jsonb default '{}', params jsonb default '{}',
    headers jsonb default '{"Content-Type": "application/json"}', timeout_milliseconds int default 5000)
  returns bigint language sql
  as $$ insert into net.sent (url, headers, body) values (url, headers, body) returning id $$;

-- Supabase Cron (pg_cron), which runs SQL on a timetable. The stand-in only keeps the jobs; nothing runs on its own.
create schema cron;
create table cron.job (jobname text primary key, schedule text, command text);
create function cron.schedule(job_name text, schedule text, command text) returns bigint language sql
  as $$ insert into cron.job values (job_name, schedule, command)
        on conflict (jobname) do update set schedule = excluded.schedule, command = excluded.command;
        select 1::bigint $$;

-- Realtime's table of rules for channels. Supabase makes it with row-level security on. Realtime sets realtime.topic
-- to the channel's name, then asks as the student whether they may read (join and hear) or insert (send). The fake's
-- Realtime (fake-supabase.mjs) asks the same way. Nothing is ever kept in it: every check is rolled back.
-- In Supabase the schema and table belong to supabase_realtime_admin, not to postgres, the user the SQL Editor runs
-- as. So postgres cannot alter the table (enable row-level security on it, add a column, change its owner, and so on).
-- The one thing Supabase lets postgres do there is add, change and drop policies on realtime.messages (its supautils
-- extension's policy_grants). The stand-in has the same owner.
create role supabase_realtime_admin nologin;
create schema realtime authorization supabase_realtime_admin;
create table realtime.messages (id bigserial primary key, topic text not null, extension text not null, event text,
  payload jsonb, private boolean default true, inserted_at timestamptz default now());
alter table realtime.messages enable row level security;
alter table realtime.messages owner to supabase_realtime_admin;
create function realtime.topic() returns text language sql stable
  as $$ select nullif(current_setting('realtime.topic', true), '')::text $$;
grant usage on schema realtime to anon, authenticated;
grant select, insert on realtime.messages to anon, authenticated;
grant usage on sequence realtime.messages_id_seq to anon, authenticated;

-- The tests run every SQL file as PGlite's superuser, who skips the owner check that stops postgres in Supabase. This
-- puts that check back for the realtime schema: while the SQL files load, any command on something in it other than
-- create, alter or drop policy on realtime.messages fails the way Supabase fails it, with "must be owner". Setup
-- above ran before this, and the tests' own reads and checks (which change nothing in the schema) never meet it.
create function public.standin_realtime_owner() returns event_trigger language plpgsql as $$
declare c record;
begin
  for c in select * from pg_event_trigger_ddl_commands() loop
    if c.schema_name = 'realtime' and not (c.command_tag in ('CREATE POLICY', 'ALTER POLICY')
        and c.object_identity like '% on realtime.messages') then
      raise exception 'must be owner of %', c.object_identity using errcode = '42501';
    end if;
  end loop;
end;
$$;
create event trigger standin_realtime_owner on ddl_command_end execute function public.standin_realtime_owner();
create function public.standin_realtime_drop() returns event_trigger language plpgsql as $$
declare c record;
begin
  for c in select * from pg_event_trigger_dropped_objects() loop
    if c.schema_name = 'realtime' and not (c.object_type = 'policy' and c.object_identity like '% on realtime.messages') then
      raise exception 'must be owner of %', c.object_identity using errcode = '42501';
    end if;
  end loop;
end;
$$;
create event trigger standin_realtime_drop on sql_drop execute function public.standin_realtime_drop();
revoke all on function public.standin_realtime_owner() from public, anon, authenticated;
revoke all on function public.standin_realtime_drop() from public, anon, authenticated;
