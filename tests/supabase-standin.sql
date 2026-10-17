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
