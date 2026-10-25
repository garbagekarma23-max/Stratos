-- Stratos challenges: a friend plays the same questions you played, and both see who won.
-- Run supabase/schema.sql, friends.sql and messages.sql first (all three are in already). Then paste this whole file
-- into the SQL Editor in the Supabase dashboard and press Run. Running it again is safe: it only adds what is missing
-- and puts the rules back as written. Then run messages.sql once more, so the daily clean-up clears old challenges too.
--
-- How a challenge works:
-- * The challenger picks a chapter. start_challenge makes the challenge and picks its seed, a random whole number.
--   The questions come from the seed alone (in the app), so the friend gets exactly the same ones.
-- * The challenger plays, and finish_challenge saves their score and time. Only then does the friend see it.
-- * The friend taps Play: play_challenge hands over the seed, once. They play, and finish_challenge saves their score.
-- * More right answers wins. Level scores go to the faster time. Level times are a draw. The app works this out.
--
-- How it is protected, in short:
-- * The tables are locked like the friends tables: row-level security on, no rules, no permissions. The app reaches
--   them only through the functions below, which find the caller with auth.uid() and only touch their own challenges.
-- * Only friends can challenge each other. A challenge is tied to the friendship, so removing or blocking the friend
--   deletes every challenge between the two (on delete cascade). Deleting an account deletes its challenges.
-- * A friend sees only what the challenge needs: the chapter, the number of questions, and the scores and times.
--   No account id or email is in any answer. A challenge is named to the app by its own ref, a random id.
--
-- What the database checks (the app marks its own answers, so a score is the app's word):
-- * The chapter is one in challenge_chapters, which also fixes how many questions it has.
-- * A score is from 0 to the number of questions.
-- * Each player starts once and finishes once. The seed is only handed to the friend when they start.
-- * A time is never faster than a set time per question, and never slower than the time the database measured from
--   start to finish (plus 10 seconds). A time outside these is moved to the nearest one, never refused.
--
-- The limits, all in one place:
--   challenges started .......... 20 a day, finished or not
--   waiting for one friend ...... 3 of yours, not played yet
--   waiting for one student ..... 30, from all their friends
--   time to play ................ 7 days from when it was sent
--   time to finish .............. 2 hours from starting. A challenger who doesn't finish never sends it. A friend who
--                                 doesn't finish gets 0 right, shown as "Didn't finish".
--   kept ........................ 90 days


-- ---------- the chapters a challenge can be on ----------
-- One row per chapter: its course, how many questions a challenge on it has, and the fastest time a question can
-- count as, in milliseconds. NSW Economics and the Edexcel course ask up to 8 questions, two per point, so a chapter
-- with 2 points has 4 and one with 3 points has 6. Maths asks 5. tests/challenges-db.mjs checks this list matches
-- the app's chapters. A new chapter needs a line here, and this file run again.
create table if not exists public.challenge_chapters (
  ch text primary key,
  course text not null,
  total int not null check (total between 1 and 8),
  per_q_ms int not null check (per_q_ms > 0)
);
insert into public.challenge_chapters (ch, course, total, per_q_ms) values
  ('c1', 'eco', 8, 1500), ('c2', 'eco', 8, 1500), ('c3', 'eco', 8, 1500), ('c4', 'eco', 8, 1500),
  ('m1', 'maths', 5, 4000), ('m2', 'maths', 5, 4000),
  ('x1c1', 'edexcel', 8, 1500), ('x1c2', 'edexcel', 8, 1500), ('x1c3', 'edexcel', 4, 1500), ('x1c4', 'edexcel', 8, 1500),
  ('x1c5', 'edexcel', 8, 1500), ('x1c6', 'edexcel', 8, 1500), ('x2c1', 'edexcel', 8, 1500), ('x2c2', 'edexcel', 8, 1500),
  ('x2c3', 'edexcel', 6, 1500), ('x2c4', 'edexcel', 8, 1500), ('x2c5', 'edexcel', 8, 1500), ('x2c6', 'edexcel', 8, 1500)
on conflict (ch) do update set course = excluded.course, total = excluded.total, per_q_ms = excluded.per_q_ms;
-- The courses made by the content pipeline (src/made.js): one row for each chapter with points in src/courses.
-- python3 content/pipeline.py publish writes the lines between these two markers. Do not edit them by hand.
-- made chapters start
insert into public.challenge_chapters (ch, course, total, per_q_ms) values
  ('nsw-bus-11-1-1', 'nsw-bus-11', 8, 1500),
  ('nsw-bus-11-1-2', 'nsw-bus-11', 8, 1500),
  ('nsw-bus-11-1-3', 'nsw-bus-11', 8, 1500),
  ('nsw-bus-11-1-4', 'nsw-bus-11', 6, 1500)
on conflict (ch) do update set course = excluded.course, total = excluded.total, per_q_ms = excluded.per_q_ms;
-- made chapters end


-- ---------- the tables ----------
-- One challenge. from_id sent it and to_id plays it back. friendship ties it to the friendship, so removing or blocking
-- the friend deletes it. seed is from 0 to 4294967295, the range the app's seeded numbers use.
-- made_at: when the challenger started. sent_at: when they finished, which is when the friend sees it (null until then).
-- to_start and to_done: when the friend started and finished. declined_at: the friend declined. The challenger is not
-- told; to them it waits until the 7 days are up.
-- from_seen: the challenger has opened the chat since the result came in, for the dot on Home.
create table if not exists public.challenges (
  id uuid primary key default gen_random_uuid(),
  friendship uuid not null references public.friendships (id) on delete cascade,
  from_id uuid not null references auth.users (id) on delete cascade,
  to_id uuid not null references auth.users (id) on delete cascade,
  ch text not null references public.challenge_chapters (ch) on delete cascade,
  total int not null check (total between 1 and 8),
  seed bigint not null check (seed between 0 and 4294967295),
  made_at timestamptz not null default now(),
  sent_at timestamptz,
  from_right int check (from_right between 0 and total),
  from_ms int check (from_ms >= 0),
  to_start timestamptz,
  to_done timestamptz,
  to_right int check (to_right between 0 and total),
  to_ms int check (to_ms >= 0),
  declined_at timestamptz,
  from_seen boolean not null default false,
  check (from_id <> to_id)
);
create index if not exists challenges_friendship on public.challenges (friendship);
create index if not exists challenges_from on public.challenges (from_id, made_at);
create index if not exists challenges_to on public.challenges (to_id, sent_at);
create index if not exists challenges_ch on public.challenges (ch);

-- What the daily limit counts: a challenge started. Rows older than a day are cleared whenever they are counted.
create table if not exists public.challenge_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  at timestamptz not null default now()
);
create index if not exists challenge_log_user on public.challenge_log (user_id, at);


-- ---------- who may do what ----------
-- First take away everything Supabase gives by default, then give nothing back. Row-level security is on with no
-- rules, so even a permission given by mistake later would still let no rows through.
revoke all on public.challenge_chapters, public.challenges, public.challenge_log from anon, authenticated;
alter table public.challenge_chapters enable row level security;
alter table public.challenges enable row level security;
alter table public.challenge_log enable row level security;


-- ---------- helpers, which students cannot call ----------

-- Where a challenge stands for one of its two students:
--   playing   the friend started it and has up to 2 hours to finish
--   waiting   sent, the friend has not played it yet (also after a silent decline)
--   open      for this student to play
--   declined  this student declined it
--   expired   nobody played it within 7 days
--   done      both have a score (a friend who started and did not finish in 2 hours has 0)
-- A challenge the challenger has not finished is none: it was never sent.
create or replace function public.challenge_state(c public.challenges, me uuid)
returns text
language sql
stable
set search_path = ''
as $$
  select case
    when c.sent_at is null then 'none'
    when c.to_done is not null or c.to_start < now() - interval '2 hours' then 'done'
    when c.to_start is not null then 'playing'
    when c.sent_at < now() - interval '7 days' then 'expired'
    when c.declined_at is not null then case when c.to_id = me then 'declined' else 'waiting' end
    when c.to_id = me then 'open'
    else 'waiting' end;
$$;

-- A challenge as one student sees it. me and them are each {right, ms, quit}, or null while that side has no score
-- to show. The challenger's score is shown to the friend before they play, as the score to beat. The friend's score
-- is shown to the challenger only once it is done. quit: started but not finished in 2 hours.
create or replace function public.challenge_face(c public.challenges, me uuid)
returns jsonb
language sql
stable
set search_path = ''
as $$
  with s as (select public.challenge_state(c, me) as st),
  sides as (
    select jsonb_build_object('right', c.from_right, 'ms', c.from_ms, 'quit', false) as f,
      case when c.to_done is not null then jsonb_build_object('right', c.to_right, 'ms', c.to_ms, 'quit', false)
           when c.to_start < now() - interval '2 hours' then jsonb_build_object('right', 0, 'ms', null, 'quit', true) end as t
  )
  select jsonb_build_object(
    'ref', c.id, 'friend', c.friendship, 'ch', c.ch, 'total', c.total, 'mine', c.from_id = me, 'state', s.st,
    'at', c.sent_at, 'ends', c.sent_at + interval '7 days',
    'me', case when c.from_id = me then sides.f else case when s.st = 'done' then sides.t end end,
    'them', case when c.from_id = me then case when s.st = 'done' then sides.t end else sides.f end,
    'new', c.from_id = me and s.st = 'done' and not c.from_seen)
  from s, sides;
$$;

-- A new seed: 32 random bits from gen_random_uuid(), which uses the computer's secure random numbers.
create or replace function public.challenge_seed()
returns bigint
language sql
volatile
set search_path = ''
as $$
  select ('x' || left(replace(gen_random_uuid()::text, '-', ''), 8))::bit(32)::bigint;
$$;

revoke all on function public.challenge_state(public.challenges, uuid), public.challenge_face(public.challenges, uuid),
  public.challenge_seed() from public, anon, authenticated;


-- ---------- the functions the app calls ----------
-- Each one finds the caller with auth.uid() and refuses anyone not signed in. A friend is the ref of the friendship
-- (from friends_state), and a challenge is its own ref (from challenges_state or start_challenge), which only work
-- for the caller's own. They answer with a result word.

-- Every challenge the student is in from the last 90 days, newest first: challenges they sent once they finished
-- them, and challenges sent to them. A challenger's unfinished start is left out.
create or replace function public.challenges_state()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  return jsonb_build_object('challenges', coalesce((
    select jsonb_agg(public.challenge_face(c, me) order by c.sent_at desc)
    from (select * from public.challenges x
          where (x.from_id = me or x.to_id = me) and x.sent_at is not null and x.made_at > now() - interval '90 days'
          order by x.sent_at desc limit 300) c), '[]'::jsonb));
end;
$$;

-- Start a challenge for a friend on a chapter. Answers {result: ok, ref, seed, total}, or gone (not friends), chapter
-- (not a chapter challenges can use), day (20 started today), friend_full (3 of yours waiting for this friend) or
-- their_full (30 waiting for them from everyone).
create or replace function public.start_challenge(friend uuid, ch text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
  them uuid;
  chap public.challenge_chapters;
  made public.challenges;
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  select case when f.a = me then f.b else f.a end into them from public.friendships f where f.id = friend and (f.a = me or f.b = me);
  if them is null then return jsonb_build_object('result', 'gone'); end if;
  select * into chap from public.challenge_chapters k where k.ch = start_challenge.ch;
  if chap.ch is null then return jsonb_build_object('result', 'chapter'); end if;
  perform public.friend_lock(me, them);
  delete from public.challenge_log where user_id = me and at < now() - interval '1 day';
  if (select count(*) from public.challenge_log where user_id = me) >= 20 then return jsonb_build_object('result', 'day'); end if;
  -- Waiting: sent and not started, inside the 7 days, not declined. A start of yours still being played counts too.
  if (select count(*) from public.challenges c where c.from_id = me and c.to_id = them and c.to_start is null and c.declined_at is null
      and ((c.sent_at is not null and c.sent_at > now() - interval '7 days') or (c.sent_at is null and c.made_at > now() - interval '2 hours'))) >= 3 then
    return jsonb_build_object('result', 'friend_full');
  end if;
  if (select count(*) from public.challenges c where c.to_id = them and c.to_start is null and c.declined_at is null
      and c.sent_at > now() - interval '7 days') >= 30 then
    return jsonb_build_object('result', 'their_full');
  end if;
  insert into public.challenges (friendship, from_id, to_id, ch, total, seed)
    values (friend, me, them, chap.ch, chap.total, public.challenge_seed()) returning * into made;
  insert into public.challenge_log (user_id) values (me);
  return jsonb_build_object('result', 'ok', 'ref', made.id, 'seed', made.seed, 'total', made.total);
end;
$$;

-- Play a challenge a friend sent. Hands over the seed, once, and starts the friend's 2 hours. Answers
-- {result: ok, seed, total, ch}, or started (played already), expired (7 days are up), or gone (no such challenge
-- for this student, declined, or no longer friends).
create or replace function public.play_challenge(ref uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
  c public.challenges;
  s text;
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  select * into c from public.challenges x where x.id = ref and x.to_id = me;
  if c.id is null then return jsonb_build_object('result', 'gone'); end if;
  perform public.friend_lock(c.from_id, me);
  select * into c from public.challenges x where x.id = ref and x.to_id = me;
  if c.id is null then return jsonb_build_object('result', 'gone'); end if;
  s := public.challenge_state(c, me);
  if s in ('playing', 'done') then return jsonb_build_object('result', 'started'); end if;
  if s = 'expired' then return jsonb_build_object('result', 'expired'); end if;
  if s <> 'open' then return jsonb_build_object('result', 'gone'); end if;
  update public.challenges set to_start = now() where id = c.id;
  return jsonb_build_object('result', 'ok', 'seed', c.seed, 'total', c.total, 'ch', c.ch);
end;
$$;

-- Save a score: the challenger's (which sends the challenge) or the friend's (which finishes it). right is how many
-- were right first try, ms the time the app measured. Answers {result: ok, ms} with the time saved, or done (already
-- saved), late (more than 2 hours after starting), bad (a score outside 0 to the number of questions), or gone.
-- The time saved is the app's time, but never under the chapter's time per question for every question, and never
-- over the time since starting plus 10 seconds.
create or replace function public.finish_challenge(ref uuid, right_n int, ms int)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
  c public.challenges;
  began timestamptz;
  most int;
  least_ms int;
  t int;
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  select * into c from public.challenges x where x.id = ref and (x.from_id = me or x.to_id = me);
  if c.id is null then return jsonb_build_object('result', 'gone'); end if;
  perform public.friend_lock(c.from_id, c.to_id);
  select * into c from public.challenges x where x.id = ref and (x.from_id = me or x.to_id = me);
  if c.id is null then return jsonb_build_object('result', 'gone'); end if;
  if c.from_id = me then
    if c.sent_at is not null then return jsonb_build_object('result', 'done'); end if;
    began := c.made_at;
  else
    if c.to_done is not null then return jsonb_build_object('result', 'done'); end if;
    if c.to_start is null then return jsonb_build_object('result', 'gone'); end if;
    began := c.to_start;
  end if;
  if began < now() - interval '2 hours' then return jsonb_build_object('result', 'late'); end if;
  if right_n is null or right_n < 0 or right_n > c.total then return jsonb_build_object('result', 'bad'); end if;
  select k.per_q_ms * c.total into least_ms from public.challenge_chapters k where k.ch = c.ch;
  most := (extract(epoch from now() - began) * 1000)::int + 10000;
  t := greatest(least(coalesce(ms, most), most), least_ms);
  if c.from_id = me then
    update public.challenges set sent_at = now(), from_right = right_n, from_ms = t where id = c.id;
  else
    update public.challenges set to_done = now(), to_right = right_n, to_ms = t where id = c.id;
  end if;
  return jsonb_build_object('result', 'ok', 'ms', t);
end;
$$;

-- Decline a challenge a friend sent. They are not told: to them it waits until the 7 days are up. Answers ok or gone.
create or replace function public.decline_challenge(ref uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  update public.challenges set declined_at = now()
    where id = ref and to_id = me and sent_at is not null and to_start is null and declined_at is null;
  return case when found then 'ok' else 'gone' end;
end;
$$;

-- The challenger has seen the results with a friend (they opened the chat), so the dot goes. Answers ok or gone.
create or replace function public.seen_challenges(friend uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  if not exists (select 1 from public.friendships f where f.id = friend and (f.a = me or f.b = me)) then return 'gone'; end if;
  update public.challenges c set from_seen = true
    where c.friendship = friend and c.from_id = me and not c.from_seen and public.challenge_state(c, me) = 'done';
  return 'ok';
end;
$$;

revoke all on function public.challenges_state(), public.start_challenge(uuid, text), public.play_challenge(uuid),
  public.finish_challenge(uuid, int, int), public.decline_challenge(uuid), public.seen_challenges(uuid)
  from public, anon, authenticated;
grant execute on function public.challenges_state(), public.start_challenge(uuid, text), public.play_challenge(uuid),
  public.finish_challenge(uuid, int, int), public.decline_challenge(uuid), public.seen_challenges(uuid) to authenticated;


-- ---------- the clean-up ----------
-- Challenges older than 90 days, challenges the challenger started and never finished (after 2 hours), and log rows
-- older than a day. moderation.cleanup() in messages.sql calls this every day through Supabase Cron. Even before it
-- runs, nothing older than 90 days is shown to a student.
create or replace function moderation.challenge_cleanup()
returns int
language plpgsql
set search_path = ''
as $$
declare
  gone int;
begin
  delete from public.challenges where made_at < now() - interval '90 days' or (sent_at is null and made_at < now() - interval '2 hours');
  get diagnostics gone = row_count;
  delete from public.challenge_log where at < now() - interval '1 day';
  return gone;
end;
$$;

revoke all on function moderation.challenge_cleanup() from public, anon, authenticated;
