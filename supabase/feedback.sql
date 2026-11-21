-- Stratos feedback: "Could we improve this?" on a card or a question.
-- Run supabase/schema.sql, friends.sql, messages.sql, report-email.sql, challenges.sql, live.sql and week.sql first
-- (all are in already). Then paste this whole file into the SQL Editor in the Supabase dashboard and press Run.
-- Running it again is safe: it only adds what is missing and puts the rules back as written. It keeps the feedback.
--
-- How it works, in short:
-- * A student taps "Could we improve this?" under a card or an answered question, picks a reason, and may add a note.
--   The app sends it with add_feedback. With no connection it waits on the phone and is sent later.
-- * What is kept: the point's id, which part (a card line, or question a or b), the reason, the note, the course it was
--   seen in and the app's version. Nothing about the student: no email, no name, no device details.
-- * A signed-in student's account id is kept with it, only to count the limit below. It is never shown anywhere: the
--   owner's view leaves it out, and it is cleared if the account is deleted.
-- * Anyone can send feedback, signed in or not, but nobody can read it, their own included. Only the owner can, in the
--   dashboard, through moderation.feedback_by_point.
--
-- How it is protected:
-- * The table is locked like the friends tables: row-level security on, no rules, no permissions. Only add_feedback
--   reaches it, and it only adds rows.
-- * The point must be one the app has (public.week_points, from week.sql), and every part is held to its format.
--
-- The limits, all in one place:
--   the note .............. up to 300 characters, or none
--   signed in ............. 20 a day for each student, and the same point, part and reason once a day
--   signed out ............ 60 an hour and 300 a day, from everyone who is not signed in, together. Nothing about a
--                           signed-out student is kept, so there is nothing else to count them by.
--   kept .................. 12 months, then deleted (daily by Cron)
-- A try over a limit is answered with a word and saves nothing. add_feedback never raises an error for these, so the
-- app can tell a refusal (drop it) from no connection (keep it and try again).


-- ---------- the feedback ----------
create table if not exists public.feedback (
  id bigint generated always as identity primary key,
  at timestamptz not null default now(),
  point text not null check (char_length(point) between 1 and 80),
  part text not null check (part ~ '^(card|card ([1-9]|1[0-9]|20)|a|b|example|question)$'),
  reason text not null check (reason in ('wrong', 'unclear', 'typo', 'other')),
  note text check (note is null or char_length(note) between 1 and 300),
  course text not null check (course ~ '^[a-z0-9-]{1,60}$'),
  version text not null check (version ~ '^[a-z0-9.-]{1,40}$'),
  signed_in boolean not null,
  -- For the limit only. Deleting the account clears it, and the feedback stays.
  user_id uuid references auth.users (id) on delete set null
);
create index if not exists feedback_user on public.feedback (user_id, at);
create index if not exists feedback_signed_out on public.feedback (at) where not signed_in;
create index if not exists feedback_point on public.feedback (point, at);


-- ---------- who may do what ----------
-- First take away everything Supabase gives by default, then give nothing back. Row-level security is on with no
-- rules, so even a permission given by mistake later would still let no rows through.
alter table public.feedback enable row level security;
revoke all on public.feedback from public, anon, authenticated;


-- ---------- the function the app calls ----------
-- Add one piece of feedback. Answers a word:
--   ok        saved
--   already   this student sent the same point, part and reason in the last day (nothing saved)
--   limit     over a limit above (nothing saved)
--   unknown   the point is not one the app has
--   long      the note is over 300 characters
--   bad       a part, reason, course or version that is not in the right format
create or replace function public.add_feedback(point_id text, which_part text, why text, note_text text, course_id text, app_version text)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
  note_in text := nullif(btrim(coalesce(note_text, '')), '');
begin
  if which_part is null or which_part !~ '^(card|card ([1-9]|1[0-9]|20)|a|b|example|question)$'
    or why is null or why not in ('wrong', 'unclear', 'typo', 'other')
    or course_id is null or course_id !~ '^[a-z0-9-]{1,60}$'
    or app_version is null or app_version !~ '^[a-z0-9.-]{1,40}$' then
    return 'bad';
  end if;
  if point_id is null or not exists (select 1 from public.week_points w where w.pid = point_id) then return 'unknown'; end if;
  if char_length(note_in) > 300 then return 'long'; end if;
  if me is not null then
    -- One call at a time for each student, so two phones sending at once cannot both slip under the limit.
    perform pg_advisory_xact_lock(hashtextextended('stratos-feedback:' || me::text, 0));
    if exists (select 1 from public.feedback f where f.user_id = me and f.point = point_id and f.part = which_part and f.reason = why
               and f.at > now() - interval '1 day') then
      return 'already';
    end if;
    if (select count(*) from public.feedback f where f.user_id = me and f.at > now() - interval '1 day') >= 20 then return 'limit'; end if;
  else
    perform pg_advisory_xact_lock(hashtextextended('stratos-feedback:signed-out', 0));
    if (select count(*) from public.feedback f where not f.signed_in and f.at > now() - interval '1 hour') >= 60
      or (select count(*) from public.feedback f where not f.signed_in and f.at > now() - interval '1 day') >= 300 then
      return 'limit';
    end if;
  end if;
  insert into public.feedback (point, part, reason, note, course, version, signed_in, user_id)
    values (point_id, which_part, why, note_in, course_id, app_version, me is not null, me);
  return 'ok';
end;
$$;

revoke all on function public.add_feedback(text, text, text, text, text, text) from public, anon, authenticated;
grant execute on function public.add_feedback(text, text, text, text, text, text) to anon, authenticated;


-- ---------- the owner's view ----------
-- In the dashboard: Table Editor, the moderation schema, feedback_by_point. Or in SQL Editor:
--   select * from moderation.feedback_by_point;
-- One row per point, newest feedback first: when the last came in, how many, how many for each reason, the courses it
-- was seen in, and items, every piece of feedback on the point as JSON (newest first). Export it as CSV for
--   py content/pipeline.py feedback import FILE
-- which sends each point made by the content pipeline back to the review list (content/README.md, step 15).
-- No account id is in it. The moderation schema is never exposed to the app (messages.sql), so students cannot read it.
create schema if not exists moderation;
drop view if exists moderation.feedback_by_point;
create view moderation.feedback_by_point with (security_invoker = true) as
  select f.point,
    max(f.at) as last_at,
    count(*)::int as total,
    count(*) filter (where f.reason = 'wrong')::int as wrong,
    count(*) filter (where f.reason = 'unclear')::int as unclear,
    count(*) filter (where f.reason = 'typo')::int as typo,
    count(*) filter (where f.reason = 'other')::int as other,
    string_agg(distinct f.course, ', ') as courses,
    jsonb_agg(jsonb_build_object('id', f.id, 'at', f.at, 'part', f.part, 'reason', f.reason, 'note', f.note,
      'course', f.course, 'version', f.version) order by f.at desc, f.id desc) as items
  from public.feedback f
  group by f.point
  order by max(f.at) desc;
revoke all on moderation.feedback_by_point from public, anon, authenticated;

-- Feedback older than 12 months. Cron runs this daily.
create or replace function moderation.feedback_cleanup()
returns void
language sql
set search_path = ''
as $$
  delete from public.feedback where at < now() - interval '12 months';
$$;
revoke all on function moderation.feedback_cleanup() from public, anon, authenticated;


-- ---------- Cron ----------
-- Clear old feedback every day at 17:29 UTC (3:29 or 4:29 in the morning in Sydney), once Supabase Cron is turned on
-- (README step 12). If it is not on yet, this does nothing: turn it on and run this file again.
do $$
begin
  if exists (select 1 from pg_extension where extname = 'pg_cron') or to_regprocedure('cron.schedule(text, text, text)') is not null then
    perform cron.schedule('stratos-feedback', '29 17 * * *', 'select moderation.feedback_cleanup()');
  end if;
end;
$$;
