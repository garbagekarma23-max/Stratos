-- Stratos live: who is online now, and the typing indicator in a chat.
-- Run supabase/schema.sql, friends.sql, messages.sql, report-email.sql and challenges.sql first (all are in already).
-- Then paste this whole file into the SQL Editor in the Supabase dashboard and press Run. Running it again is safe: it
-- only adds what is missing and puts the rules back as written. Then, in Realtime's settings, turn off public access
-- (README step 18), so a phone can only join a channel these rules allow.
--
-- Online, in short:
-- * While the app is open and on screen, it checks in every 10 to 30 seconds (online_now). Each check-in marks the
--   student online for the next 60 seconds. When the app goes into the background, it says so and the mark goes at once.
-- * The table keeps one row per student who is online now, holding only when the mark runs out. There is no history
--   and no "last seen": a row is deleted as soon as its time passes (on every check-in, and by Cron every minute),
--   when the app goes into the background, when the student turns the switch off, and with the account.
-- * The table is locked like the friends tables. Only online_now reads it, and it answers only with the refs of the
--   caller's own friendships whose friend is online. Someone not a friend, someone with a request still waiting, and
--   anyone blocked either way has no friendship, so they never appear.
-- * "Show when I'm online" (show_online) is on unless the student turns it off. Off, they are never marked online.
--   They still see friends who show theirs.
--
-- Typing and new messages, in short:
-- * They go through Supabase Realtime, on a private channel for each chat, named chat:<the friendship's ref>. The
--   app sends "typing", "stop" and "new" (a message number, so the friend's app fetches it). Nothing else, and never
--   message text: messages still only arrive through chat_messages in messages.sql, after the filter and every rule.
-- * Realtime does not save these events. It checks the rules on realtime.messages below when a phone asks to join a
--   channel or send on one, and refuses unless the caller is signed in, is one of the two friends, and the chat's
--   message request has been accepted. Sending also needs the caller not to be banned from messaging.
-- * Realtime remembers a phone's answer until it joins again or its sign-in refreshes (about an hour). So the app
--   leaves the channel the moment its student blocks or removes the friend. A blocked student whose app is still
--   connected can only send into a channel nobody is listening to, and the database refuses their messages at once.


-- ---------- online ----------
-- show_online: whether friends can see this student online. On unless they turn it off. Students cannot write it
-- directly (schema.sql lets them change call_sign only). Only set_show_online below can.
alter table public.profiles add column if not exists show_online boolean not null default true;

-- One row per student who is online now. until: when the mark runs out. Nothing else is kept.
create table if not exists public.online (
  user_id uuid primary key references auth.users (id) on delete cascade,
  until timestamptz not null
);
create index if not exists online_until on public.online (until);
alter table public.online enable row level security;
revoke all on public.online from anon, authenticated;

-- Check in, and see which friends are online. here: true while the app is open and on screen, false when it goes
-- into the background. Answers {online: [refs of friendships whose friend is online], show: the caller's switch}.
create or replace function public.online_now(here boolean)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
  showing boolean;
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  delete from public.online where until < now();
  select coalesce((select p.show_online from public.profiles p where p.id = me), true) into showing;
  if coalesce(here, false) and showing then
    insert into public.online (user_id, until) values (me, now() + interval '60 seconds')
      on conflict (user_id) do update set until = excluded.until;
  else
    delete from public.online where user_id = me;
  end if;
  return jsonb_build_object('show', showing, 'online', coalesce((
    select jsonb_agg(f.id order by f.id)
    from public.friendships f
    join public.online o on o.user_id = case when f.a = me then f.b else f.a end
    left join public.profiles p on p.id = o.user_id
    where (f.a = me or f.b = me) and o.until > now() and coalesce(p.show_online, true)
      and not exists (select 1 from public.blocks k where (k.blocker = f.a and k.blocked = f.b) or (k.blocker = f.b and k.blocked = f.a))
  ), '[]'::jsonb));
end;
$$;

-- Turn "Show when I'm online" on or off. Off takes the student's mark away at once.
create or replace function public.set_show_online(show_on boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  insert into public.profiles (id, show_online) values (me, coalesce(show_on, true))
    on conflict (id) do update set show_online = excluded.show_online;
  if not coalesce(show_on, true) then delete from public.online where user_id = me; end if;
end;
$$;

revoke all on function public.online_now(boolean), public.set_show_online(boolean) from public, anon, authenticated;
grant execute on function public.online_now(boolean), public.set_show_online(boolean) to authenticated;

-- Marks whose time has passed. Cron runs this every minute, so no row outlives its minute by more than another.
create or replace function moderation.online_cleanup()
returns void
language sql
set search_path = ''
as $$
  delete from public.online where until < now();
$$;
revoke all on function moderation.online_cleanup() from public, anon, authenticated;


-- ---------- who may join a chat's channel in Realtime ----------
-- The check lives in its own schema, live, which Supabase's API does not reach (never add it to Exposed schemas).
-- Realtime runs the rules below as the student asking, so they need to be able to use this one function, and nothing
-- else in live. It answers only true or false, and only about the caller's own chats.
create schema if not exists live;
revoke all on schema live from public, anon;
grant usage on schema live to authenticated;

-- True when the caller may use the channel named topic: it is chat:<ref>, ref is a friendship the caller is in, its
-- chat's message request has been accepted, and neither has blocked the other. sending: also not banned from messaging.
create or replace function live.chat_ok(topic text, sending boolean)
returns boolean
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
  ref uuid;
  them uuid;
begin
  if me is null or topic is null
     or topic !~ '^chat:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' then return false; end if;
  ref := substr(topic, 6)::uuid;
  select case when f.a = me then f.b else f.a end into them
    from public.friendships f join public.chats c on c.friendship = f.id
    where f.id = ref and (f.a = me or f.b = me) and c.open_at is not null;
  if them is null then return false; end if;
  if exists (select 1 from public.blocks k where (k.blocker = me and k.blocked = them) or (k.blocker = them and k.blocked = me)) then return false; end if;
  if sending and public.msg_ban(me) is not null then return false; end if;
  return true;
end;
$$;
revoke all on function live.chat_ok(text, boolean) from public, anon, authenticated;
grant execute on function live.chat_ok(text, boolean) to authenticated;

-- Realtime asks these rules about realtime.messages. select is joining and hearing a channel; insert is sending on
-- it. Only broadcast (no presence), only for signed-in students, only for chat channels chat_ok allows. Rules on a
-- table add up, so any other rule written on realtime.messages later would let more in: check them all if you add one.
alter table realtime.messages enable row level security;
drop policy if exists "stratos chat hear" on realtime.messages;
create policy "stratos chat hear" on realtime.messages
  for select to authenticated
  using (realtime.messages.extension = 'broadcast' and live.chat_ok((select realtime.topic()), false));
drop policy if exists "stratos chat send" on realtime.messages;
create policy "stratos chat send" on realtime.messages
  for insert to authenticated
  with check (realtime.messages.extension = 'broadcast' and live.chat_ok((select realtime.topic()), true));


-- ---------- Cron ----------
-- Clear marks whose time has passed, every minute, once Supabase Cron is turned on (README step 12). If it is not on
-- yet, this does nothing: turn it on and run this file again. Without it, online_now still never shows an old mark.
do $$
begin
  if exists (select 1 from pg_extension where extname = 'pg_cron') or to_regprocedure('cron.schedule(text, text, text)') is not null then
    perform cron.schedule('stratos-online', '* * * * *', 'select moderation.online_cleanup()');
  end if;
end;
$$;
