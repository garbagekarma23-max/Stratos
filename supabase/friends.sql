-- Stratos friends: usernames, friend codes, requests, friends, blocks, and the rules that protect them.
-- Run supabase/schema.sql first (it is in already). Then paste this whole file into the SQL Editor in the Supabase
-- dashboard and press Run. Running it again is safe: it only adds what is missing and puts the rules back as written.
--
-- How it is protected, in short:
-- * The friends tables are locked. Row-level security is on and students get no rules and no permissions on them,
--   so nobody can read or write them directly, signed in or not.
-- * The app reaches them only through the functions below. Each one finds the student who called it with auth.uid()
--   (worked out by Supabase from their sign-in, so nobody can pretend to be someone else) and only touches rows that
--   student is part of.
-- * A friend sees only a call sign and a username. Account ids, emails, progress and places never leave these
--   functions. Rows are named to the app by random ids made for each friendship, request or block (called ref).
-- * Every limit (wrong codes, searches, numbers of friends and requests) is counted here, not in the app.
--
-- The limits, all in one place:
--   wrong friend codes .......... 5 in 15 minutes, 20 in a day
--   searches and taken names .... 10 in 15 minutes, 30 in a day
--   search results .............. at most 5
--   friends ..................... 100 each
--   requests you sent, waiting .. 10
--   requests to one student ..... 20 waiting
--   requests sent ............... 20 a day
--   username changes ............ once a day


-- ---------- usernames and the search switch, on profiles ----------
-- username: lower case, 3 to 20 of a to z, 0 to 9, dot and underscore, unique. Empty until the student picks one.
-- collate "C" compares letters by their plain code, which lets the database find "names starting with" quickly.
-- findable: whether search can find this student. On unless they turn it off. Codes work either way.
-- username_at: when the username was last set, for the once-a-day limit.
-- Students cannot write these three columns directly (schema.sql lets them change call_sign only). Only
-- set_username and set_findable below can, so a username always passes every check.
alter table public.profiles add column if not exists username text collate "C";
alter table public.profiles add column if not exists findable boolean not null default true;
alter table public.profiles add column if not exists username_at timestamptz;
alter table public.profiles drop constraint if exists profiles_username_format;
alter table public.profiles add constraint profiles_username_format check (
  username is null or (username ~ '^[a-z0-9._]{3,20}$' and username !~ '(^\.|\.$|\.\.)'));
create unique index if not exists profiles_username_key on public.profiles (username);


-- ---------- the tables ----------
-- Every account id points at Supabase's list of accounts with on delete cascade, so deleting an account deletes
-- its code, requests, friendships, blocks and log rows, on both sides.

-- One code per student: 8 characters from 2 to 9 and the letters without I, L and O, so 0/O and 1/I/L never mix.
create table if not exists public.friend_codes (
  user_id uuid primary key references auth.users (id) on delete cascade,
  code text not null unique check (code ~ '^[2-9A-HJKMNP-Z]{8}$'),
  made_at timestamptz not null default now()
);

-- A request waiting for an answer. asked_code or asked_name is what the sender typed, shown to the sender only, so
-- they can tell their requests apart without learning anything new about the other student.
create table if not exists public.friend_requests (
  id uuid primary key default gen_random_uuid(),
  from_id uuid not null references auth.users (id) on delete cascade,
  to_id uuid not null references auth.users (id) on delete cascade,
  asked_code text,
  asked_name text,
  sent_at timestamptz not null default now(),
  unique (from_id, to_id),
  check (from_id <> to_id)
);
create index if not exists friend_requests_to on public.friend_requests (to_id);

-- Two friends. One row per pair, with the smaller id first, so a pair can never be in here twice.
create table if not exists public.friendships (
  id uuid primary key default gen_random_uuid(),
  a uuid not null references auth.users (id) on delete cascade,
  b uuid not null references auth.users (id) on delete cascade,
  since timestamptz not null default now(),
  unique (a, b),
  check (a < b)
);
create index if not exists friendships_b on public.friendships (b);

-- A block: blocker never hears from blocked again until they unblock.
create table if not exists public.blocks (
  id uuid primary key default gen_random_uuid(),
  blocker uuid not null references auth.users (id) on delete cascade,
  blocked uuid not null references auth.users (id) on delete cascade,
  at timestamptz not null default now(),
  unique (blocker, blocked),
  check (blocker <> blocked)
);
create index if not exists blocks_blocked on public.blocks (blocked);

-- What the limits count: a wrong code, a request sent, a search, or a username that was taken.
-- Each student's rows older than a day are cleared whenever they are counted.
create table if not exists public.friend_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  kind text not null check (kind in ('wrong', 'sent', 'search', 'taken')),
  at timestamptz not null default now()
);
create index if not exists friend_log_user on public.friend_log (user_id, kind, at);

-- The students a search showed, for 15 minutes, so sending one of them a request does not count as a second search.
create table if not exists public.friend_seen (
  user_id uuid not null references auth.users (id) on delete cascade,
  seen uuid not null references auth.users (id) on delete cascade,
  at timestamptz not null default now(),
  primary key (user_id, seen)
);
create index if not exists friend_seen_seen on public.friend_seen (seen);

-- Words not allowed in usernames and call signs. anywhere: banned anywhere in a name. Otherwise banned only as a whole
-- word, so a short word inside a longer one ("classic", "grass") is fine. Add a word in Table Editor at any time;
-- it applies to new and changed names straight away. The list is at the end of this file.
create table if not exists public.banned_words (
  word text primary key check (word ~ '^[a-z]+$'),
  anywhere boolean not null default false
);


-- ---------- who may do what ----------
-- First take away everything Supabase gives by default, then give nothing back. Row-level security is on with no
-- rules, so even a permission given by mistake later would still let no rows through.
revoke all on public.friend_codes, public.friend_requests, public.friendships, public.blocks, public.friend_log,
  public.friend_seen, public.banned_words from anon, authenticated;
alter table public.friend_codes enable row level security;
alter table public.friend_requests enable row level security;
alter table public.friendships enable row level security;
alter table public.blocks enable row level security;
alter table public.friend_log enable row level security;
alter table public.friend_seen enable row level security;
alter table public.banned_words enable row level security;


-- ---------- helpers, which students cannot call ----------
-- These run only from inside the functions further down. Each has search_path = '', so every name in it is written
-- in full and nobody can slip in a function or table of the same name.

-- A banned word as a pattern where each letter may be said over and over, but never fewer times than in the word:
-- "shit" becomes s+h+i+t+, so "shiiit" is caught, and a word with a double letter keeps it, so a slur spelled with
-- "gg" never matches "Nigeria" or "Niger".
create or replace function public.word_pattern(w text)
returns text
language plpgsql
immutable
set search_path = ''
as $$
declare
  p text := '';
  i int := 1;
  k int;
  c text;
begin
  while i <= char_length(w) loop
    c := substr(w, i, 1);
    k := 1;
    while substr(w, i + k, 1) = c loop k := k + 1; end loop;
    p := p || c || case when k = 1 then '+' else '{' || k || ',}' end;
    i := i + k;
  end loop;
  return p;
end;
$$;

-- True if a name has a banned word. Capitals are ignored, look-alike digits and symbols are read as letters
-- (0 o, 1 i, 3 e, 4 a, 5 s, 7 t, 8 b, @ a, $ s), and dots, underscores and spaces are ignored. For the words banned
-- anywhere, a letter said over and over ("shiiit") still matches, through word_pattern. Whole words are compared
-- exactly, because reading double letters once would turn ordinary names into banned ones.
create or replace function public.has_banned_word(t text)
returns boolean
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  s text;
  joined text;
  parts text[];
begin
  if t is null then return false; end if;
  s := translate(lower(t), '0134578@$', 'oieastbas');
  joined := regexp_replace(s, '[^a-z]', '', 'g');
  parts := array_remove(regexp_split_to_array(s, '[^a-z]+'), '');
  return exists (
    select 1 from public.banned_words w
    where (w.anywhere and joined ~ public.word_pattern(w.word))
       or (not w.anywhere and (w.word = any (parts) or w.word = joined))
  );
end;
$$;

-- Usernames nobody can take, so nobody can pose as Stratos or as staff. Dots and underscores are ignored, and
-- anything starting with stratos is reserved too.
create or replace function public.is_reserved(name text)
returns boolean
language sql
immutable
set search_path = ''
as $$
  select replace(replace(name, '.', ''), '_', '') like 'stratos%'
      or replace(replace(name, '.', ''), '_', '') in ('admin', 'administrator', 'support', 'help', 'helpdesk', 'teacher',
         'teachers', 'moderator', 'mod', 'mods', 'official', 'staff', 'team', 'system', 'security', 'root', 'null',
         'undefined', 'anonymous', 'everyone', 'nobody', 'owner', 'founder', 'pearson', 'edexcel', 'nesa', 'school',
         'principal', 'police', 'safety');
$$;

-- The call sign check: a call sign or username with a banned word is refused, however it is written to profiles.
-- It runs inside the database on every write, so a call sign sent straight to the table, not through the app, is
-- refused too. The app looks for the words banned_word in the error.
create or replace function public.profiles_clean()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if public.has_banned_word(new.call_sign) or public.has_banned_word(new.username) then
    raise exception 'banned_word' using errcode = 'P0001';
  end if;
  return new;
end;
$$;
drop trigger if exists profiles_clean on public.profiles;
create trigger profiles_clean before insert or update on public.profiles
  for each row execute function public.profiles_clean();

-- Hold both students still while a function checks limits and changes rows, so two taps at the same moment cannot
-- go over a limit or make two of something. Always in the same order, so two functions never wait on each other.
create or replace function public.friend_lock(x uuid, y uuid)
returns void
language plpgsql
set search_path = ''
as $$
begin
  if x = y then
    perform pg_advisory_xact_lock(hashtextextended(x::text, 0));
  elsif x < y then
    perform pg_advisory_xact_lock(hashtextextended(x::text, 0));
    perform pg_advisory_xact_lock(hashtextextended(y::text, 0));
  else
    perform pg_advisory_xact_lock(hashtextextended(y::text, 0));
    perform pg_advisory_xact_lock(hashtextextended(x::text, 0));
  end if;
end;
$$;

-- Whether a student is over a limit: 'soon' (too many in 15 minutes), 'day' (too many in a day), or null.
-- Their log rows older than a day are cleared first.
create or replace function public.friend_limit(who uuid, kinds text[], per15 int, perday int)
returns text
language plpgsql
set search_path = ''
as $$
begin
  delete from public.friend_log where user_id = who and at < now() - interval '1 day';
  if (select count(*) from public.friend_log where user_id = who and kind = any (kinds)) >= perday then return 'day'; end if;
  if (select count(*) from public.friend_log where user_id = who and kind = any (kinds) and at > now() - interval '15 minutes') >= per15 then return 'soon'; end if;
  return null;
end;
$$;

create or replace function public.friend_count(who uuid)
returns int
language sql
stable
set search_path = ''
as $$
  select count(*)::int from public.friendships where a = who or b = who;
$$;

-- The ids of a student's friends.
create or replace function public.friend_ids(who uuid)
returns setof uuid
language sql
stable
set search_path = ''
as $$
  select case when a = who then b else a end from public.friendships where a = who or b = who;
$$;

-- What a student shows to another: only the call sign and the username.
create or replace function public.friend_face(who uuid)
returns jsonb
language sql
stable
set search_path = ''
as $$
  select jsonb_build_object('name', p.call_sign, 'username', p.username)
  from (select 1) one left join public.profiles p on p.id = who;
$$;

-- A new code. The bytes come from gen_random_uuid(), which uses the computer's secure random numbers. A byte is used
-- only if it is under 248 (8 times 31), so each of the 31 characters is equally likely. A code that is taken
-- already, or that would spell a banned word, is thrown away and another made.
create or replace function public.make_friend_code()
returns text
language plpgsql
volatile
set search_path = ''
as $$
declare
  abc constant text := '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
  raw bytea;
  made text;
  i int;
  v int;
begin
  loop
    made := '';
    while length(made) < 8 loop
      raw := uuid_send(gen_random_uuid());
      -- bytes 6 and 8 of a uuid hold its version, so only the others are used
      foreach i in array array[0, 1, 2, 3, 4, 5, 7, 9, 10, 11, 12, 13, 14, 15] loop
        v := get_byte(raw, i);
        if v < 248 and length(made) < 8 then made := made || substr(abc, v % 31 + 1, 1); end if;
      end loop;
    end loop;
    if not exists (select 1 from public.friend_codes where code = made) and not public.has_banned_word(made) then
      return made;
    end if;
  end loop;
end;
$$;

-- A student's code, made the first time it is asked for.
create or replace function public.code_of(who uuid)
returns text
language plpgsql
set search_path = ''
as $$
declare
  found_code text;
begin
  select code into found_code from public.friend_codes where user_id = who;
  if found_code is null then
    found_code := public.make_friend_code();
    insert into public.friend_codes (user_id, code) values (who, found_code);
  end if;
  return found_code;
end;
$$;

-- Ask to be friends, once the other student is known. Shared by the code and the username ways in.
-- Returns {result} and, when the two are or become friends, {name, username} of the other student.
-- 'hidden' means they blocked the caller. Each way in turns that into its own not-found answer, so a blocked student
-- is never told.
create or replace function public.friend_ask(me uuid, them uuid, typed_code text, typed_name text)
returns jsonb
language plpgsql
set search_path = ''
as $$
declare
  back uuid;
begin
  if them = me then return jsonb_build_object('result', 'self'); end if;
  perform public.friend_lock(me, them);
  if exists (select 1 from public.blocks where blocker = me and blocked = them) then return jsonb_build_object('result', 'you_blocked'); end if;
  if exists (select 1 from public.blocks where blocker = them and blocked = me) then return jsonb_build_object('result', 'hidden'); end if;
  if exists (select 1 from public.friendships where a = least(me, them) and b = greatest(me, them)) then
    return jsonb_build_object('result', 'friends_already') || public.friend_face(them);
  end if;
  if exists (select 1 from public.friend_requests where from_id = me and to_id = them) then return jsonb_build_object('result', 'sent_already'); end if;
  -- They had already asked: asking back makes the two friends.
  select id into back from public.friend_requests where from_id = them and to_id = me;
  if back is not null then
    if public.friend_count(me) >= 100 then return jsonb_build_object('result', 'full'); end if;
    if public.friend_count(them) >= 100 then return jsonb_build_object('result', 'their_full'); end if;
    delete from public.friend_requests where id = back;
    insert into public.friendships (a, b) values (least(me, them), greatest(me, them));
    return jsonb_build_object('result', 'now_friends') || public.friend_face(them);
  end if;
  if public.friend_limit(me, array['sent'], 1000000, 20) is not null then return jsonb_build_object('result', 'sent_day'); end if;
  if public.friend_count(me) >= 100 then return jsonb_build_object('result', 'full'); end if;
  if (select count(*) from public.friend_requests where from_id = me) >= 10 then return jsonb_build_object('result', 'out_full'); end if;
  if (select count(*) from public.friend_requests where to_id = them) >= 20 then return jsonb_build_object('result', 'their_in_full'); end if;
  insert into public.friend_requests (from_id, to_id, asked_code, asked_name) values (me, them, typed_code, typed_name);
  insert into public.friend_log (user_id, kind) values (me, 'sent');
  return jsonb_build_object('result', 'sent');
end;
$$;

revoke all on function public.word_pattern(text), public.has_banned_word(text), public.is_reserved(text), public.profiles_clean(),
  public.friend_lock(uuid, uuid), public.friend_limit(uuid, text[], int, int), public.friend_count(uuid),
  public.friend_ids(uuid), public.friend_face(uuid), public.make_friend_code(), public.code_of(uuid),
  public.friend_ask(uuid, uuid, text, text) from public, anon, authenticated;


-- ---------- the functions the app calls ----------
-- Each runs with the database's own permission (security definer), which is the only way past the locked tables.
-- So each one starts by finding the caller with auth.uid() and refusing anyone not signed in, and only ever touches
-- rows the caller is part of. Calling them is taken away from everyone, then given back to signed-in students only.
-- They answer with a result word rather than an error where they can, so a wrong code or a search is always counted:
-- an error would undo the row that counts it.

-- Everything the Friends page shows: your username, switch and code (made the first time), your friends, requests
-- to you, requests you sent and the students you blocked. Other students appear only as a ref, a call sign and a
-- username. A request you sent shows only what you typed.
create or replace function public.friends_state()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  return jsonb_build_object(
    'me', (select jsonb_build_object('username', p.username, 'findable', coalesce(p.findable, true), 'code', public.code_of(me))
           from (select 1) one left join public.profiles p on p.id = me),
    'friends', coalesce((select jsonb_agg(jsonb_build_object('ref', f.id, 'since', f.since) || public.friend_face(case when f.a = me then f.b else f.a end) order by f.since desc)
                from public.friendships f where f.a = me or f.b = me), '[]'::jsonb),
    'incoming', coalesce((select jsonb_agg(jsonb_build_object('ref', r.id, 'at', r.sent_at) || public.friend_face(r.from_id) order by r.sent_at desc)
                 from public.friend_requests r where r.to_id = me), '[]'::jsonb),
    'outgoing', coalesce((select jsonb_agg(jsonb_build_object('ref', r.id, 'at', r.sent_at, 'code', r.asked_code, 'asked', r.asked_name) order by r.sent_at desc)
                 from public.friend_requests r where r.from_id = me), '[]'::jsonb),
    'blocked', coalesce((select jsonb_agg(jsonb_build_object('ref', k.id, 'at', k.at) || public.friend_face(k.blocked) order by k.at desc)
                from public.blocks k where k.blocker = me), '[]'::jsonb)
  );
end;
$$;

-- Pick or change your username. Answers ok, bad (length or characters), dots, same, today (changed in the last day),
-- banned, taken, soon or day (too many tries). A taken name counts toward the search limits, because learning that a
-- name is in use is a kind of search. Reserved names answer taken too.
create or replace function public.set_username(new_username text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
  wanted text := lower(btrim(coalesce(new_username, '')));
  had text;
  had_at timestamptz;
  lim text;
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  wanted := regexp_replace(wanted, '^@', '');
  if wanted !~ '^[a-z0-9._]{3,20}$' then return jsonb_build_object('result', 'bad'); end if;
  if wanted ~ '(^\.|\.$|\.\.)' then return jsonb_build_object('result', 'dots'); end if;
  perform pg_advisory_xact_lock(hashtextextended(me::text, 0));
  select username, username_at into had, had_at from public.profiles where id = me;
  if had = wanted then return jsonb_build_object('result', 'ok', 'username', wanted); end if;
  if had is not null and had_at > now() - interval '1 day' then return jsonb_build_object('result', 'today'); end if;
  lim := public.friend_limit(me, array['search', 'taken'], 10, 30);
  if lim is not null then return jsonb_build_object('result', lim); end if;
  if public.has_banned_word(wanted) then return jsonb_build_object('result', 'banned'); end if;
  if public.is_reserved(wanted) or exists (select 1 from public.profiles where username = wanted) then
    insert into public.friend_log (user_id, kind) values (me, 'taken');
    return jsonb_build_object('result', 'taken');
  end if;
  begin
    insert into public.profiles (id, username, username_at) values (me, wanted, now())
      on conflict (id) do update set username = excluded.username, username_at = excluded.username_at;
  exception when unique_violation then
    -- someone took it at the same moment
    insert into public.friend_log (user_id, kind) values (me, 'taken');
    return jsonb_build_object('result', 'taken');
  end;
  return jsonb_build_object('result', 'ok', 'username', wanted);
end;
$$;

-- Turn "Let people find me by username" on or off. Off, search never shows you. Codes and friends are not touched.
create or replace function public.set_findable(findable_on boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  insert into public.profiles (id, findable) values (me, coalesce(findable_on, true))
    on conflict (id) do update set findable = excluded.findable;
end;
$$;

-- Make a new code. The old one stops working at once. Friends and requests are not touched.
create or replace function public.new_friend_code()
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
  made text;
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  perform pg_advisory_xact_lock(hashtextextended(me::text, 0));
  made := public.make_friend_code();
  insert into public.friend_codes (user_id, code, made_at) values (me, made, now())
    on conflict (user_id) do update set code = excluded.code, made_at = excluded.made_at;
  return made;
end;
$$;

-- Search by username. What is typed must be 3 to 20 of the username characters, so % and * (and any other wildcard)
-- are refused. It finds usernames that start with what is typed, letter for letter: it compares the start of each
-- name, so _ and . are only ever themselves. At most 5, mutual friends first, then A to Z. Never shown: the caller,
-- students with the switch off, and anyone either side has blocked. Each result is only the username, how many
-- friends the two have in common (a number, never who), and where the caller stands with them.
-- Every search counts toward the limits, found or not, because finding a name also tells you it is in use.
create or replace function public.find_students(search text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
  q text := lower(btrim(coalesce(search, '')));
  lim text;
  found jsonb;
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  q := regexp_replace(q, '^@', '');
  if length(q) < 3 then return jsonb_build_object('result', 'short'); end if;
  if q !~ '^[a-z0-9._]{3,20}$' then return jsonb_build_object('result', 'bad'); end if;
  perform pg_advisory_xact_lock(hashtextextended(me::text, 0));
  lim := public.friend_limit(me, array['search', 'taken'], 10, 30);
  if lim is not null then return jsonb_build_object('result', lim); end if;
  insert into public.friend_log (user_id, kind) values (me, 'search');
  delete from public.friend_seen where user_id = me and at < now() - interval '15 minutes';
  with hits as (
    select p.id, p.username,
      (select count(*)::int from public.friend_ids(me) m where m in (select public.friend_ids(p.id))) as mutual
    from public.profiles p
    where p.username >= q and p.username < q || '~' and starts_with(p.username, q)
      and p.findable and p.id <> me
      and not exists (select 1 from public.blocks k where (k.blocker = me and k.blocked = p.id) or (k.blocker = p.id and k.blocked = me))
    order by mutual desc, p.username
    limit 5
  ), seen as (
    insert into public.friend_seen (user_id, seen, at) select me, h.id, now() from hits h
      on conflict (user_id, seen) do update set at = excluded.at
  )
  select coalesce(jsonb_agg(jsonb_build_object(
      'username', h.username,
      'mutual', h.mutual,
      'state', case
        when exists (select 1 from public.friendships f where f.a = least(me, h.id) and f.b = greatest(me, h.id)) then 'friends'
        when exists (select 1 from public.friend_requests r where r.from_id = me and r.to_id = h.id) then 'sent'
        when exists (select 1 from public.friend_requests r where r.from_id = h.id and r.to_id = me) then 'asked'
        else 'none' end
    ) order by h.mutual desc, h.username), '[]'::jsonb) into found
  from hits h;
  return jsonb_build_object('result', 'ok', 'found', found);
end;
$$;

-- Send a request by username: the whole username, exactly. A student the caller's search showed in the last 15
-- minutes costs nothing more. Anyone else counts as a search, so the search limits cannot be skipped by sending
-- straight away. Not found, switch off and blocked all answer none.
create or replace function public.send_friend_request_to(friend_username text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
  wanted text := regexp_replace(lower(btrim(coalesce(friend_username, ''))), '^@', '');
  them uuid;
  lim text;
  out jsonb;
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  if wanted !~ '^[a-z0-9._]{3,20}$' then return jsonb_build_object('result', 'none'); end if;
  select id into them from public.profiles where username = wanted and findable;
  -- Hold both students (or just the caller, if nobody has the name) before counting.
  if them is null or them = me then perform public.friend_lock(me, me); else perform public.friend_lock(me, them); end if;
  if them is null or not exists (select 1 from public.friend_seen where user_id = me and seen = them and at > now() - interval '15 minutes') then
    lim := public.friend_limit(me, array['search', 'taken'], 10, 30);
    if lim is not null then return jsonb_build_object('result', lim); end if;
    insert into public.friend_log (user_id, kind) values (me, 'search');
  end if;
  if them is null then return jsonb_build_object('result', 'none'); end if;
  out := public.friend_ask(me, them, null, wanted);
  if out->>'result' = 'hidden' then return jsonb_build_object('result', 'none'); end if;
  return out;
end;
$$;

-- Send a request with a friend code. Capitals, spaces and dashes do not matter. A wrong code is counted before the
-- answer, and while the caller is over the limit every code is refused, even a right one. A student who blocked the
-- caller answers wrong, exactly like a code that does not exist, and counts as a wrong try.
create or replace function public.send_friend_request(friend_code text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
  typed text := upper(regexp_replace(coalesce(friend_code, ''), '[\s-]', '', 'g'));
  them uuid;
  lim text;
  out jsonb;
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  if typed !~ '^[2-9A-HJKMNP-Z]{8}$' then return jsonb_build_object('result', 'bad'); end if;
  select user_id into them from public.friend_codes where code = typed;
  -- Hold both students (or just the caller, if the code is nobody's) before counting.
  if them is null or them = me then perform public.friend_lock(me, me); else perform public.friend_lock(me, them); end if;
  lim := public.friend_limit(me, array['wrong'], 5, 20);
  if lim is not null then return jsonb_build_object('result', lim); end if;
  if them is null then
    insert into public.friend_log (user_id, kind) values (me, 'wrong');
    return jsonb_build_object('result', 'wrong');
  end if;
  out := public.friend_ask(me, them, typed, null);
  if out->>'result' = 'hidden' then
    insert into public.friend_log (user_id, kind) values (me, 'wrong');
    return jsonb_build_object('result', 'wrong');
  end if;
  return out;
end;
$$;

-- Accept a request sent to you. Answers friends (with their call sign and username), full, their_full or gone.
create or replace function public.accept_friend_request(ref uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
  them uuid;
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  select from_id into them from public.friend_requests where id = ref and to_id = me;
  if them is null then return jsonb_build_object('result', 'gone'); end if;
  perform public.friend_lock(me, them);
  if not exists (select 1 from public.friend_requests where id = ref and to_id = me) then return jsonb_build_object('result', 'gone'); end if;
  if public.friend_count(me) >= 100 then return jsonb_build_object('result', 'full'); end if;
  if public.friend_count(them) >= 100 then return jsonb_build_object('result', 'their_full'); end if;
  delete from public.friend_requests where (from_id = them and to_id = me) or (from_id = me and to_id = them);
  insert into public.friendships (a, b) values (least(me, them), greatest(me, them)) on conflict (a, b) do nothing;
  return jsonb_build_object('result', 'friends') || public.friend_face(them);
end;
$$;

-- Decline a request sent to you. The sender is not told: it just leaves their list.
create or replace function public.decline_friend_request(ref uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  delete from public.friend_requests where id = ref and to_id = me;
  return case when found then 'ok' else 'gone' end;
end;
$$;

-- Cancel a request you sent.
create or replace function public.cancel_friend_request(ref uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  delete from public.friend_requests where id = ref and from_id = me;
  return case when found then 'ok' else 'gone' end;
end;
$$;

-- Remove a friend. They are not told.
create or replace function public.remove_friend(ref uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  delete from public.friendships where id = ref and (a = me or b = me);
  return case when found then 'ok' else 'gone' end;
end;
$$;

-- Block the student behind one of your friendships or a request sent to you. It removes the friendship and any
-- request either way, and from then on their requests look like a wrong code or a name nobody has, and neither of
-- you shows in the other's search. They are not told.
create or replace function public.block_student(ref uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
  them uuid;
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  select case when a = me then b else a end into them from public.friendships where id = ref and (a = me or b = me);
  if them is null then select from_id into them from public.friend_requests where id = ref and to_id = me; end if;
  if them is null then return 'gone'; end if;
  perform public.friend_lock(me, them);
  delete from public.friendships where a = least(me, them) and b = greatest(me, them);
  delete from public.friend_requests where (from_id = them and to_id = me) or (from_id = me and to_id = them);
  insert into public.blocks (blocker, blocked) values (me, them) on conflict (blocker, blocked) do nothing;
  return 'ok';
end;
$$;

-- Unblock a student you blocked. They can send you a request again. It does not make you friends again.
create or replace function public.unblock_student(ref uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  delete from public.blocks where id = ref and blocker = me;
  return case when found then 'ok' else 'gone' end;
end;
$$;

revoke all on function public.friends_state(), public.set_username(text), public.set_findable(boolean),
  public.new_friend_code(), public.find_students(text), public.send_friend_request_to(text),
  public.send_friend_request(text), public.accept_friend_request(uuid), public.decline_friend_request(uuid),
  public.cancel_friend_request(uuid), public.remove_friend(uuid), public.block_student(uuid),
  public.unblock_student(uuid) from public, anon, authenticated;
grant execute on function public.friends_state(), public.set_username(text), public.set_findable(boolean),
  public.new_friend_code(), public.find_students(text), public.send_friend_request_to(text),
  public.send_friend_request(text), public.accept_friend_request(uuid), public.decline_friend_request(uuid),
  public.cancel_friend_request(uuid), public.remove_friend(uuid), public.block_student(uuid),
  public.unblock_student(uuid) to authenticated;


-- ---------- the banned words ----------
-- Words for slurs, sex, swearing and hurting yourself or others. Students cannot read this table, and the app never
-- gets the list; it only gets told a name was refused. anywhere = true for words that are never part of an ordinary
-- word; the rest only count as a whole word. To add one, use Table Editor, or another line here and run the file again.
insert into public.banned_words (word, anywhere) values
  ('fuck', true), ('fuk', false), ('fck', true), ('cunt', true), ('nigger', true), ('nigga', true), ('faggot', true),
  ('motherf', true), ('shit', true), ('bitch', true), ('whore', true), ('slut', true), ('asshole', true),
  ('arsehole', true), ('bastard', true), ('bollock', true), ('wank', false), ('wanker', true), ('twat', true), ('dildo', true),
  ('jizz', true), ('blowjob', true), ('handjob', true), ('hentai', true), ('porn', true), ('penis', true),
  ('vagina', true), ('pussy', true), ('retard', true), ('nazi', false), ('nazis', false), ('hitler', true), ('pedo', false), ('pedophile', true), ('paedophile', true),
  ('paedo', true), ('rapist', false), ('orgasm', true), ('testicle', true), ('scrotum', true), ('clitoris', true),
  ('poofter', true), ('tranny', true), ('kike', true), ('wetback', true), ('killyourself', true),
  ('fag', false), ('fags', false), ('ass', false), ('arse', false), ('dick', false), ('dicks', false), ('cock', false),
  ('cocks', false), ('cum', false), ('tit', false), ('tits', false), ('boob', false), ('boobs', false), ('sex', false),
  ('sexy', false), ('anal', false), ('anus', false), ('rape', false), ('raped', false), ('nude', false),
  ('nudes', false), ('naked', false), ('horny', false), ('milf', false), ('semen', false), ('clit', false),
  ('spic', false), ('chink', false), ('coon', false), ('paki', false), ('dyke', false), ('homo', false),
  ('poof', false), ('abo', false), ('boong', false), ('gook', false), ('skank', false), ('slag', false),
  ('hoe', false), ('hoes', false), ('thot', false), ('kys', false), ('kms', false), ('suicide', false),
  ('crap', false), ('piss', false), ('damn', false), ('prick', false), ('bugger', false), ('bellend', false)
on conflict (word) do nothing;

-- A call sign saved before this check that fails it is cleared once, here. That student's device clears it too on
-- its next sync, and they can pick another.
update public.profiles set call_sign = null where call_sign is not null and public.has_banned_word(call_sign);
