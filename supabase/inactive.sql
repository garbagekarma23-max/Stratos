-- Stratos: delete accounts nobody has used for 2 years, with everything in them.
-- Run supabase/schema.sql, friends.sql, messages.sql, report-email.sql, challenges.sql, live.sql, week.sql and
-- feedback.sql first (all are in already). Then paste this whole file into the SQL Editor in the Supabase dashboard
-- and press Run. Running it again is safe: it only puts the function and the Cron job back as written, and deletes
-- nothing by itself. Only the Cron job (or the owner running moderation.delete_inactive() by hand) deletes accounts.
--
-- What counts as using an account. An account is kept while ANY of these is less than 2 years ago:
--   * auth.users.last_sign_in_at   the last time the student signed in with a code or a link
--   * auth.users.created_at        when the account was made, so a new account is never deleted
--   * auth.sessions                the latest updated_at (or refreshed_at, see below) of any of its sign-ins
--   * public.progress.updated_at   the last time a phone saved progress to the account
-- Why not only the last sign-in: Supabase changes last_sign_in_at only when a student signs in with a code or a link.
-- A phone that stays signed in keeps its sign-in fresh on its own, about once an hour while the app is open, and that
-- never counts as signing in again. So a student who opens the app every day for 2 years without signing out would
-- look unused by last_sign_in_at alone. Their sign-in (auth.sessions) is updated each time the phone refreshes it,
-- and their progress each time they study, so either of those keeps the account.
-- refreshed_at: newer Supabase projects also note on each sign-in when it was last refreshed, in refreshed_at. Older
-- ones do not have that column. It is read in a way that gives nothing, not an error, when the column is not there,
-- so the file works on both.
-- An account with no dates at all is kept: the function only deletes an account it knows is old.
--
-- What goes with it: the same as Delete account (schema.sql). Deleting the account from auth.users deletes every row
-- that holds its id (on delete cascade): the profile, progress, friend code, requests, friendships and blocks on both
-- sides, chats and messages, challenges, the weekly table's answers, the online mark, bans, warnings and the logs.
-- Reports and feedback stay, with the account id cleared (on delete set null), until they are 12 months old.
--
-- The limits, all in one place:
--   unused for ............ 2 years
--   at most ............... 500 accounts each run, so one run never holds the database for long. A backlog clears
--                           over the days that follow.
--   runs .................. daily by Cron, at 17:41 UTC


-- ---------- the function ----------
-- Deletes up to 500 accounts unused for 2 years, oldest first, and answers how many it deleted.
-- It lives in the moderation schema, which Supabase's API cannot reach (messages.sql), and nobody but the owner may
-- call it: not a student, and not someone signed out.
-- security definer lets it delete from Supabase's own list of accounts, as delete_account does. search_path is empty,
-- so every name in it is written in full and nothing can stand in for one.
create schema if not exists moderation;
revoke all on schema moderation from public, anon, authenticated;

create or replace function moderation.delete_inactive()
returns int
language plpgsql
security definer
set search_path = ''
as $$
declare
  cutoff timestamptz := now() - interval '2 years';
  gone int;
begin
  -- Only one run at a time, so the Cron job and a run by hand never pick the same accounts.
  perform pg_advisory_xact_lock(hashtextextended('stratos-inactive', 0));
  with old as (
    select u.id
    from auth.users u
    -- The sign-in and the account's age. greatest() skips a date that is empty, and an account with neither is kept.
    where greatest(u.last_sign_in_at, u.created_at) < cutoff
      -- No sign-in of theirs was made, used or refreshed in the 2 years. refreshed_at is read through to_jsonb, so a
      -- project without that column gets nothing here instead of an error. It is stored with no time zone; read as
      -- one it can be out by a few hours, which does not matter against 2 years.
      and not exists (
        select 1 from auth.sessions s
        where s.user_id = u.id
          and greatest(s.created_at, s.updated_at, (to_jsonb(s) ->> 'refreshed_at')::timestamptz) >= cutoff)
      -- No progress saved in the 2 years.
      and not exists (
        select 1 from public.progress p
        where p.user_id = u.id and p.updated_at >= cutoff)
    order by greatest(u.last_sign_in_at, u.created_at), u.id
    limit 500
  )
  delete from auth.users d using old where d.id = old.id;
  get diagnostics gone = row_count;
  return gone;
end;
$$;
revoke all on function moderation.delete_inactive() from public, anon, authenticated;


-- ---------- Cron ----------
-- Delete unused accounts every day at 17:41 UTC (3:41 or 4:41 in the morning in Sydney), once Supabase Cron is turned
-- on (README step 12). Scheduling the same name again replaces the job, so running this file twice leaves one job. If
-- Cron is not on yet, this does nothing: turn it on and run this file again.
do $$
begin
  if exists (select 1 from pg_extension where extname = 'pg_cron') or to_regprocedure('cron.schedule(text, text, text)') is not null then
    perform cron.schedule('stratos-inactive', '41 17 * * *', 'select moderation.delete_inactive()');
  end if;
end;
$$;
