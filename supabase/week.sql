-- Stratos weekly table: each student and their friends, ranked by right answers this week.
-- Run supabase/schema.sql, friends.sql, messages.sql, report-email.sql, challenges.sql and live.sql first (all are in
-- already). Then paste this whole file into the SQL Editor in the Supabase dashboard and press Run. Running it again
-- is safe: it only adds what is missing and puts the rules and the list of points back as written.
--
-- How it works, in short:
-- * While a student is signed in, the app sends each right answer: the question and when it was answered. Answers
--   given offline wait on the phone and are sent later, with the time they were given.
-- * count_answers decides which of them count. The app's word is taken that the answer was right (the app marks its
--   own answers), but nothing else: the database checks the question is a real one, the answers are not too close
--   together, the same question is not counted twice in an hour, and no more than 300 count in any 24 hours.
-- * week_table answers with the caller's own total and each friend's total since a moment the app sends: Monday at
--   midnight on the caller's phone. So everyone in one student's table is counted over the same hours.
-- * Friends see only a call sign or username and a total. Never which questions, when, an id or an email.
--
-- How it is protected:
-- * The tables are locked like the friends tables: row-level security on, no rules, no permissions. Only the three
--   functions below reach them, each finding the caller with auth.uid() and refusing anyone not signed in.
-- * A student can only add answers for themselves, and only see totals for themselves and their friends. Someone with
--   a request still waiting, a stranger, and anyone blocked either way has no friendship, so never appears.
-- * "Show me on friends' weekly table" (show_week) is on unless the student turns it off. Off, they are left out of
--   every friend's table. They still see their friends, and their own answers still count.
--
-- The limits, all in one place:
--   real questions ........ the question's point is in week_points: Economics questions are the point's id and a or
--                            b (c1p1a), maths answers the point's id, a colon, and the question (m1p1:3x+5=20)
--   the gap ................ 1.5 seconds between two counted answers (4 seconds for maths), measured by when each was
--                            answered. An answer closer than that to one already counted does not count.
--   the same question ...... counts once an hour
--   the cap ................ 300 in any 24 hours
--   how late ............... an answer counts if it arrives within 2 days of being given
--   one call ............... at most 50 answers
--   kept ................... 15 days, then deleted (each student's own on every call, and everyone's daily by Cron)
-- An answer that fails a check is skipped, not refused, so the rest of the call still counts.


-- ---------- the points an answer can be on ----------
-- One row per point the app has: its id, and whether it is maths. tests/week-db.mjs checks this list matches the
-- app's content. A new point needs a line here, and this file run again.
create table if not exists public.week_points (
  pid text primary key,
  maths boolean not null
);
delete from public.week_points;
insert into public.week_points (pid, maths) values
  -- NSW Economics
  ('c1p1', false), ('c1p2', false), ('c1p3', false), ('c1p4', false), ('c1p5', false), ('c1p6', false),
  ('c1p7', false), ('c2p1', false), ('c2p2', false), ('c2p3', false), ('c2p4', false), ('c2p5', false),
  ('c2p6', false), ('c2p7', false), ('c3p1', false), ('c3p2', false), ('c3p3', false), ('c3p4', false),
  ('c3p5', false), ('c4p1', false), ('c4p2', false), ('c4p3', false), ('c4p4', false), ('c4p5', false),
  ('c4p6', false), ('c4p7', false),
  -- Maths
  ('m1p1', true), ('m1p2', true), ('m1p3', true), ('m1p4', true), ('m1p5', true), ('m2p1', true), ('m2p2', true),
  -- Edexcel International A Level Economics
  ('e-nature', false), ('e-positive', false), ('e-scarcity', false), ('e-ppf', false), ('e-special', false),
  ('e-systems', false), ('e-rational', false), ('e-demand', false), ('e-ped', false), ('e-yed', false),
  ('e-xed', false), ('e-supply', false), ('e-pes', false), ('e-equilibrium', false), ('e-surplus', false),
  ('e-pricemech', false), ('e-taxsub', false), ('e-failure', false), ('e-externality', false), ('e-public', false),
  ('e-info', false), ('e-bubbles', false), ('e-correct', false), ('e-maxmin', false), ('e-permits', false),
  ('e-govfail', false), ('e-gdp', false), ('e-living', false), ('e-cpi', false), ('e-inflation', false),
  ('e-labour', false), ('e-unemployment', false), ('e-bop', false), ('e-ad', false), ('e-consumption', false),
  ('e-investment', false), ('e-govtrade', false), ('e-sras', false), ('e-lras', false), ('e-lrasshift', false),
  ('e-income', false), ('e-flow', false), ('e-macroeq', false), ('e-multiplier', false), ('e-growthcause', false),
  ('e-outputgap', false), ('e-growthgain', false), ('e-growthcost', false), ('e-objectives', false),
  ('e-monetary', false), ('e-fiscal', false), ('e-supplyside', false), ('e-conflicts', false);
-- The courses made by the content pipeline (src/made.js): one row for each point in src/bank. python3
-- content/pipeline.py publish writes the lines between these two markers. Do not edit them by hand.
-- made points start
-- made points end


-- ---------- the answers ----------
-- One row per right answer that counted: who, the question, and when it was answered. Nothing else.
create table if not exists public.week_answers (
  user_id uuid not null references auth.users (id) on delete cascade,
  q text not null check (char_length(q) between 1 and 80),
  at timestamptz not null
);
create index if not exists week_answers_user on public.week_answers (user_id, at);
create index if not exists week_answers_at on public.week_answers (at);

-- show_week: whether friends see this student on their weekly table. On unless they turn it off. Students cannot
-- write it directly (schema.sql lets them change call_sign only). Only set_show_week below can.
alter table public.profiles add column if not exists show_week boolean not null default true;


-- ---------- who may do what ----------
-- First take away everything Supabase gives by default, then give nothing back. Row-level security is on with no
-- rules, so even a permission given by mistake later would still let no rows through.
alter table public.week_points enable row level security;
alter table public.week_answers enable row level security;
revoke all on public.week_points, public.week_answers from anon, authenticated;


-- ---------- the functions the app calls ----------
-- Send right answers. answers is a list of {q, at}: the question, and when it was answered in milliseconds since
-- 1970 (the phone's clock). Answers {counted: how many counted}.
create or replace function public.count_answers(answers jsonb)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
  a record;
  point text;
  is_maths boolean;
  gap interval;
  counted int := 0;
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  -- One call at a time for each student, so two phones sending at once cannot both slip under the cap.
  perform pg_advisory_xact_lock(hashtextextended('stratos-week:' || me::text, 0));
  delete from public.week_answers where user_id = me and at < now() - interval '15 days';
  for a in
    select x.q, least(to_timestamp((x.ms)::float8 / 1000), now()) as at
    from (
      select e->>'q' as q, (e->>'at')::numeric as ms
      from jsonb_array_elements(case when jsonb_typeof(answers) = 'array' then answers else '[]'::jsonb end) e
      where jsonb_typeof(e) = 'object' and jsonb_typeof(e->'q') = 'string' and jsonb_typeof(e->'at') = 'number'
      limit 50
    ) x
    -- Not older than 2 days, and not more than a minute ahead (a phone's clock can be a little fast).
    where x.ms between extract(epoch from now() - interval '2 days') * 1000 and extract(epoch from now() + interval '1 minute') * 1000
      and char_length(x.q) between 1 and 80
    order by 2
  loop
    -- A real question: an Economics point's id with a or b after it, or a maths point's id, a colon and the question.
    if position(':' in a.q) > 0 then
      point := split_part(a.q, ':', 1);
      is_maths := true;
      if char_length(a.q) <= char_length(point) + 1 then continue; end if;
    else
      point := left(a.q, -1);
      is_maths := false;
      if right(a.q, 1) not in ('a', 'b') then continue; end if;
    end if;
    if not exists (select 1 from public.week_points w where w.pid = point and w.maths = is_maths) then continue; end if;
    -- Not too close to an answer already counted, before or after it.
    gap := case when is_maths then interval '4 seconds' else interval '1.5 seconds' end;
    if exists (select 1 from public.week_answers w where w.user_id = me and w.at > a.at - gap and w.at < a.at + gap) then continue; end if;
    -- The same question counts once an hour.
    if exists (select 1 from public.week_answers w where w.user_id = me and w.q = a.q and w.at > a.at - interval '1 hour' and w.at < a.at + interval '1 hour') then continue; end if;
    -- At most 300 in any 24 hours. Checking the 24 hours either side of each answer as it comes in keeps that true
    -- for every 24 hours, even for answers sent late and out of order.
    if (select count(*) from public.week_answers w where w.user_id = me and w.at > a.at - interval '24 hours' and w.at < a.at + interval '24 hours') >= 300 then continue; end if;
    insert into public.week_answers (user_id, q, at) values (me, a.q, a.at);
    counted := counted + 1;
  end loop;
  return jsonb_build_object('counted', counted);
end;
$$;

-- The table. since: Monday at midnight on the caller's phone. A moment in the future or more than 8 days ago is
-- replaced by Monday at midnight UTC. It only changes what the caller sees.
-- Answers {show: the caller's switch, me: the caller's total, friends: [{ref, name, username, n}]}, with only the
-- friends who show on the table. ref is the friendship's ref, as in friends_state.
create or replace function public.week_table(since timestamptz)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
  start timestamptz := since;
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  if start is null or start > now() or start < now() - interval '8 days' then
    start := date_trunc('week', now() at time zone 'UTC') at time zone 'UTC';
  end if;
  return jsonb_build_object(
    'show', coalesce((select p.show_week from public.profiles p where p.id = me), true),
    'me', (select count(*) from public.week_answers w where w.user_id = me and w.at >= start)::int,
    'friends', coalesce((
      select jsonb_agg(jsonb_build_object('ref', f.id, 'name', p.call_sign, 'username', p.username,
          'n', (select count(*) from public.week_answers w where w.user_id = p.id and w.at >= start)::int) order by f.id)
      from public.friendships f
      join public.profiles p on p.id = case when f.a = me then f.b else f.a end
      where (f.a = me or f.b = me) and p.show_week
        and not exists (select 1 from public.blocks k where (k.blocker = f.a and k.blocked = f.b) or (k.blocker = f.b and k.blocked = f.a))
    ), '[]'::jsonb));
end;
$$;

-- Turn "Show me on friends' weekly table" on or off.
create or replace function public.set_show_week(show_on boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  insert into public.profiles (id, show_week) values (me, coalesce(show_on, true))
    on conflict (id) do update set show_week = excluded.show_week;
end;
$$;

revoke all on function public.count_answers(jsonb), public.week_table(timestamptz), public.set_show_week(boolean) from public, anon, authenticated;
grant execute on function public.count_answers(jsonb), public.week_table(timestamptz), public.set_show_week(boolean) to authenticated;

-- Answers older than 15 days, for every student. Cron runs this daily.
create or replace function moderation.week_cleanup()
returns void
language sql
set search_path = ''
as $$
  delete from public.week_answers where at < now() - interval '15 days';
$$;
revoke all on function moderation.week_cleanup() from public, anon, authenticated;


-- ---------- Cron ----------
-- Clear old answers every day at 17:23 UTC (3:23 or 4:23 in the morning in Sydney), once Supabase Cron is turned on
-- (README step 12). If it is not on yet, this does nothing: turn it on and run this file again. Without it, each
-- student's old answers are still cleared whenever they send new ones, and nothing older than a week is ever counted.
do $$
begin
  if exists (select 1 from pg_extension where extname = 'pg_cron') or to_regprocedure('cron.schedule(text, text, text)') is not null then
    perform cron.schedule('stratos-week', '23 17 * * *', 'select moderation.week_cleanup()');
  end if;
end;
$$;
