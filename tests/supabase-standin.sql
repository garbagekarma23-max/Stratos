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
