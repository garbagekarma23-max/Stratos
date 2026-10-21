-- Stratos messages: chats between friends, message requests, the message filter, reports, and moderation.
-- Run supabase/schema.sql and supabase/friends.sql first (both are in already). Then paste this whole file into the
-- SQL Editor in the Supabase dashboard and press Run. Running it again is safe: it only adds what is missing and puts
-- the rules back as written.
--
-- How it is protected, in short:
-- * Only friends can message, and only after one asks and the other accepts (a message request).
-- * The chat tables are locked like the friends tables: row-level security on, no rules, no permissions. The app
--   reaches them only through the functions below, which find the caller with auth.uid() and only touch chats the
--   caller is in. A chat is named to the app by its friendship's ref, never by the other student's account id.
-- * Every message is checked here, inside the database, before it is saved (message_problem below). A message sent
--   straight to the database, not through the app, is checked too.
-- * Reports, warnings and bans live in their own schema, moderation, which Supabase's API cannot reach. Only the
--   project owner sees them, in the dashboard. Students cannot read a report, not even their own.
-- * Removing or blocking a friend deletes the chat and its messages for both students (on delete cascade from
--   friendships). Deleting an account deletes its chats and messages. Messages are deleted after 90 days.
--
-- The limits, all in one place:
--   message length .............. 1 to 500 characters
--   messages .................... 10 a minute (refused tries count too), 300 a day
--   message requests ............ 10 a day
--   after a decline ............. 7 days before the same friend's new request shows
--   unanswered requests ......... go after 30 days
--   reports ..................... 20 a day, one per message
--   kept ........................ messages 90 days, refusal counts 7 days, reports 12 months


-- ---------- which banned words apply to messages ----------
-- Usernames and call signs refuse every word in banned_words. Messages use a narrower list: slurs and explicit sexual
-- words only, so history (Hitler), biology, "sex discrimination", "homo economicus" and mild words (damn, crap) pass.
-- in_messages: tick it in Table Editor to refuse a word in messages too. Bullying phrases ("kys", "kill yourself") are
-- checked separately, below, with their own message.
alter table public.banned_words add column if not exists in_messages boolean not null default false;
update public.banned_words set in_messages = true where word in (
  'nigger', 'nigga', 'faggot', 'fag', 'fags', 'kike', 'wetback', 'spic', 'chink', 'coon', 'paki', 'dyke', 'poofter',
  'poof', 'tranny', 'retard', 'abo', 'boong', 'gook',
  'fuck', 'fuk', 'fck', 'motherf', 'cunt', 'porn', 'dildo', 'jizz', 'blowjob', 'handjob', 'hentai', 'pussy', 'cum',
  'milf', 'clit', 'horny', 'nudes', 'cock', 'cocks', 'tits', 'anal', 'bitch', 'whore', 'slut', 'skank', 'thot');


-- ---------- the tables ----------
-- One chat per pair of friends, made when one of them sends a message request. friendship ties it to the friendship,
-- so removing or blocking the friend deletes the chat and every message in it. a and b are the two students, the
-- smaller id first, as in friendships.
-- asked_by and asked_at: the request waiting, if any. open_at: when it was accepted (null until then).
-- declined_at: the last decline. The sender is never told. Their screen keeps saying the request is waiting, and a new
-- request from them shows only once 7 days have passed since the decline.
-- a_read and b_read: the last message number each has seen, for the unread dot. last_n: the last message number.
create table if not exists public.chats (
  id uuid primary key default gen_random_uuid(),
  friendship uuid not null unique references public.friendships (id) on delete cascade,
  a uuid not null references auth.users (id) on delete cascade,
  b uuid not null references auth.users (id) on delete cascade,
  asked_by uuid references auth.users (id) on delete cascade,
  asked_at timestamptz,
  open_at timestamptz,
  declined_at timestamptz,
  a_read int not null default 0,
  b_read int not null default 0,
  last_n int not null default 0,
  check (a < b)
);

-- One message. n counts up within its chat (1, 2, 3), so the app can ask for "everything after 41".
-- care: the message talks about how the sender feels (suicide, self-harm). It is sent as normal, and the app shows
-- each side a short line about getting help.
create table if not exists public.messages (
  chat uuid not null references public.chats (id) on delete cascade,
  n int not null,
  sender uuid not null references auth.users (id) on delete cascade,
  body text not null check (char_length(body) between 1 and 500),
  care boolean not null default false,
  sent_at timestamptz not null default now(),
  primary key (chat, n)
);
create index if not exists messages_sent_at on public.messages (sent_at);
create index if not exists messages_sender on public.messages (sender);

-- What the limits count: a message sent, a message refused (with the reason, never the text), a message request, or a
-- report. Refused rows are kept 7 days, for moderation.refusals; the rest a day.
create table if not exists public.message_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  kind text not null check (kind in ('sent', 'refused', 'ask', 'report')),
  reason text,
  at timestamptz not null default now()
);
create index if not exists message_log_user on public.message_log (user_id, kind, at);

revoke all on public.chats, public.messages, public.message_log from anon, authenticated;
alter table public.chats enable row level security;
alter table public.messages enable row level security;
alter table public.message_log enable row level security;


-- ---------- moderation: only the project owner, in the dashboard ----------
-- Supabase's API only reaches the public schema, so nothing in here can be read or called by a student, signed in or
-- not. Row-level security is on as well, with no rules, in case the schema is ever exposed by mistake.
create schema if not exists moderation;
revoke all on schema moderation from public, anon, authenticated;

-- A report: the reported message and up to 10 messages either side, from both students, copied when the report is
-- made. reporter and reported are cleared if either account is deleted; the copy stays until the report is 12
-- months old. chat is the chat's id as plain text, so the report outlives the chat.
create table if not exists moderation.reports (
  id uuid primary key default gen_random_uuid(),
  at timestamptz not null default now(),
  reason text not null check (reason in ('bullying', 'sexual', 'personal', 'harm', 'spam', 'other')),
  reporter uuid references auth.users (id) on delete set null,
  reported uuid references auth.users (id) on delete set null,
  chat uuid not null,
  message_n int not null,
  messages jsonb not null,
  status text not null default 'new' check (status in ('new', 'reviewed', 'warned', 'banned')),
  done_at timestamptz
);
create index if not exists reports_status on moderation.reports (status, at);
create index if not exists reports_reported on moderation.reports (reported);
create unique index if not exists reports_once on moderation.reports (reporter, chat, message_n);

-- A ban from messaging. until null means always.
create table if not exists moderation.bans (
  user_id uuid primary key references auth.users (id) on delete cascade,
  until timestamptz,
  at timestamptz not null default now(),
  report uuid
);

-- A warning, shown to the student once, the next time they open Friends.
create table if not exists moderation.notices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  report uuid,
  at timestamptz not null default now(),
  seen_at timestamptz
);
create index if not exists notices_user on moderation.notices (user_id);

-- Everything the owner did, for an account's history.
create table if not exists moderation.actions (
  id uuid primary key default gen_random_uuid(),
  at timestamptz not null default now(),
  user_id uuid references auth.users (id) on delete cascade,
  report uuid,
  action text not null check (action in ('reviewed', 'warned', 'banned', 'unbanned')),
  until timestamptz
);

revoke all on all tables in schema moderation from public, anon, authenticated;
alter table moderation.reports enable row level security;
alter table moderation.bans enable row level security;
alter table moderation.notices enable row level security;
alter table moderation.actions enable row level security;


-- ---------- the filter: helpers, which students cannot call ----------

-- A copy of a message tidied for checking (never for saving): lower case; accents, invisible characters and
-- Unicode look-alike forms undone (full-width letters, circled and bold letters, emoji digits in boxes become plain digits); common
-- Cyrillic and Greek letters that look Latin turned into Latin; spaces made single; and a run of 3 or more single
-- characters with spaces between joined up, so "g m a i l . c o m" and "k y s" are read whole.
create or replace function public.msg_norm(t text)
returns text
language plpgsql
immutable
set search_path = ''
as $$
declare
  s text;
  tok text;
  run text[] := '{}';
  out_ text[] := '{}';
begin
  s := lower(normalize(coalesce(t, ''), NFKD));
  s := regexp_replace(s, '[\u0300-\u036f\u0483-\u0489\u20d0-\u20ff\ufe00-\ufe0f\u200b-\u200f\u202a-\u202e\u2060-\u206f\ufeff\u00ad\u180e]', '', 'g');
  s := translate(s, 'аеорсухіјкмтвнѕԁѵαορτικνε', 'aeopcyxijkmtbhsdvaoptikve');
  s := btrim(regexp_replace(s, '\s+', ' ', 'g'));
  foreach tok in array string_to_array(s, ' ') loop
    if char_length(tok) = 1 then
      run := run || tok;
    else
      if cardinality(run) >= 3 then out_ := out_ || array_to_string(run, ''); else out_ := out_ || run; end if;
      run := '{}';
      out_ := out_ || tok;
    end if;
  end loop;
  if cardinality(run) >= 3 then out_ := out_ || array_to_string(run, ''); else out_ := out_ || run; end if;
  return array_to_string(out_, ' ');
end;
$$;

-- The words of a tidied message, each read the way the username check reads names: look-alike digits and symbols
-- as letters (0 o, 1 i, 3 e, 4 a, 5 s, 7 t, 8 b, @ a, $ s), and dots, dashes and other marks inside the word
-- dropped, so "s.h.i.t" is one word. Punctuation at either end is dropped first, so "word!" is "word".
create or replace function public.msg_words(t text)
returns text[]
language sql
immutable
set search_path = ''
as $$
  select coalesce(array_agg(w) filter (where w <> ''), '{}')
  from (select regexp_replace(translate(regexp_replace(x, '^[^a-z0-9@$]+|[^a-z0-9@$]+$', '', 'g'), '0134578@$', 'oieastbas'), '[^a-z]', '', 'g') as w
        from unnest(string_to_array(t, ' ')) x) words;
$$;

-- A banned word as a pattern where each letter may be said over and over, but never fewer times than in the word:
-- "shit" becomes s+h+i+t+, so "shiiit" is caught, and a word with a double letter keeps it, so a slur spelled with
-- "gg" never matches "Nigeria".
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

-- Why a message cannot be sent, or null if it can. The reasons, checked in this order:
--   bullying  telling someone to hurt themselves: kys, kill yourself, neck yourself and the like
--   word      a banned word ticked for messages (in_messages)
--   email     an email address, also written "name (at) mail dot com" or "name at gmail"
--   link      a web address: http, www, :// or a name, a dot and a common ending (.com, .au, .gg), also written
--             "dot com", "(dot) com" or "[.]com"
--   offsite   an @handle, or a phrase that moves the chat to another app ("add me on", "my snap", "dm me on")
--   phone     8 or more digits with only spaces, dashes, brackets or + between them. Digit words count (zero to
--             nine), and so do O and l written next to digits. Numbers with commas (1,250,000), decimals (3.14159)
--             and a year range (2008-2009) are not phone numbers.
-- Words about how the sender feels (suicide, self-harm, "want to die") are never refused. See message_care.
create or replace function public.message_problem(raw text)
returns text
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  t text := public.msg_norm(raw);
  words text[] := public.msg_words(t);
  letters text := array_to_string(public.msg_words(t), '');
  w text := ' ' || btrim(regexp_replace(t, '[^a-z0-9]+', ' ', 'g')) || ' ';
  apps constant text := '(snap|snapchat|sc|insta|instagram|ig|tiktok|discord|whatsapp|telegram|kik|wechat|socials|handle)';
  pat_any text;
  pat_whole text;
  d text;
  p text;
begin
  -- bullying
  if exists (select 1 from unnest(words) x where x ~ '^k+y+s+$')
     or letters ~ '(ki+l+|neck|unalive)(your|ur|yo|ya)sel(f|ves)|hopeyoud+i+e|drinkbleach' then
    return 'bullying';
  end if;

  -- banned words: those marked anywhere are found inside a word, the rest only as a whole word
  select '(' || string_agg(public.word_pattern(b.word), '|') filter (where b.anywhere) || ')',
         '^(' || string_agg(public.word_pattern(b.word), '|') filter (where not b.anywhere) || ')$'
    into pat_any, pat_whole
    from public.banned_words b where b.in_messages;
  if exists (select 1 from unnest(words) x where (pat_any is not null and x ~ pat_any) or (pat_whole is not null and x ~ pat_whole)) then
    return 'word';
  end if;

  -- email addresses
  if t ~ '[a-z0-9._%+-]\s?(@|[(\[{<]\s*at\s*[)\]}>])\s?[a-z0-9-]+\s?(\.|[(\[{<]\s*dot\s*[)\]}>]|\sdot\s)\s?[a-z]{2,}'
     or t ~ '[a-z0-9]\s?(@|[(\[{<]\s*at\s*[)\]}>])\s?(gmail|hotmail|yahoo|icloud|outlook|protonmail|proton|bigpond|aol|msn|live)\M'
     or t ~ '\mat\s+(gmail|hotmail|yahoo|icloud|protonmail|bigpond|aol|msn)\M' then
    return 'email';
  end if;

  -- links. "the dot com bubble" and the like are economics, not addresses.
  if t ~ '(https?|hxxps?|ftp)\s?:\s?/' or t ~ '://' or t ~ '\mwww\s?(\.|,|\sdot\s|[(\[{<]\s*dot\s*[)\]}>])' then return 'link'; end if;
  d := regexp_replace(t, '\m(the|a|an|that|this|of)\s+dot\s*-?\s*com\M', ' ', 'g');
  d := regexp_replace(d, '\mdot\s*-?\s*com\s+(boom|bubble|crash|bust|era|compan[a-z]*|stocks?|shares?|startups?|firms?)', ' ', 'g');
  d := regexp_replace(d, '\s*[(\[{<]\s*(dot|\.)\s*[)\]}>]\s*', '.', 'g');
  d := regexp_replace(d, '\s+dot\s+', '.', 'g');
  if d ~ '[a-z0-9-]{2,}\.(com|net|org|edu|gov|au|io|gg|co|uk|nz|app|dev|xyz|info|biz|tv|ly|gl|ru)\M' or d ~ '\m(t|wa)\.me\M' then
    return 'link';
  end if;

  -- moving the chat off Stratos: @handles and phrases. An app's name on its own is fine.
  if t ~ '(^|[^a-z0-9._%+-])@[a-z0-9_][a-z0-9._]+'
     or w ~ '\m(add|dm|follow|text|message|msg|snap|ping) me on\M'
     or w ~ '\m(hit me up|hmu) on\M'
     or w ~ ('\m(my|ur|your|yr) ' || apps || '\M')
     or w ~ ('\m(talk|chat|message|text|dm|call|facetime) (me )?(on|over|through|thru) ' || apps || '\M')
     or w ~ ('\m(move|switch|go) (this |it )?(to|on|onto) ' || apps || '\M')
     or w ~ '\msnap me\M'
     or w ~ '\m(whats|what s|what is|wats|send me|give me|gimme) (ur|your|yr) (phone|mobile|digits)\M' then
    return 'offsite';
  end if;

  -- phone numbers
  p := t;
  p := replace(replace(replace(replace(replace(p, 'zero', '0'), 'nought', '0'), 'one', '1'), 'two', '2'), 'three', '3');
  p := replace(replace(replace(replace(replace(replace(p, 'four', '4'), 'five', '5'), 'six', '6'), 'seven', '7'), 'eight', '8'), 'nine', '9');
  p := regexp_replace(p, '(\d[\s()+\u2013\u2014-]?)o', '\10', 'g');
  p := regexp_replace(p, '(\d[\s()+\u2013\u2014-]?)o', '\10', 'g');
  p := regexp_replace(p, 'o([\s()+\u2013\u2014-]?\d)', '0\1', 'g');
  p := regexp_replace(p, '(\d[\s()+\u2013\u2014-]?)[li]', '\11', 'g');
  p := regexp_replace(p, '(\d[\s()+\u2013\u2014-]?)[li]', '\11', 'g');
  p := regexp_replace(p, '[li]([\s()+\u2013\u2014-]?\d)', '1\1', 'g');
  p := regexp_replace(p, '\d*\.\d+', ' d ', 'g');
  p := regexp_replace(p, '(19|20)\d\d\s*[\u2013\u2014-]\s*((19|20)\d\d|\d\d)\M', ' y ', 'g');
  if p ~ '\d([\s()+\u2013\u2014-]*\d){7,}' then return 'phone'; end if;

  return null;
end;
$$;

-- True if a message talks about how the sender feels: suicide, self-harm, wanting to die, hurting themselves.
-- The message is sent as normal. The app shows the sender a line about getting help, and the friend a line about
-- checking in with them.
create or replace function public.message_care(raw text)
returns boolean
language sql
immutable
set search_path = ''
as $$
  select (' ' || btrim(regexp_replace(public.msg_norm(raw), '[^a-z0-9]+', ' ', 'g')) || ' ') ~
    ('\m(suicid[a-z]*|self ?harm[a-z]*|kms|kill(ing)? my ?self|want(ed|ing)? to die|wanna die|end(ing)? my life|' ||
     'end(ing)? it all|hurt(ing)? my ?self|cut(ting)? my ?self|unalive my ?self|don ?t want to (be here|live|exist)|' ||
     'no reason to live|better off dead)\M');
$$;

-- A message tidied for saving: line endings made plain, control characters and invisible or direction-changing
-- characters removed, tabs made spaces, no more than one blank line in a row, and spaces trimmed from both ends.
create or replace function public.msg_tidy(raw text)
returns text
language sql
immutable
set search_path = ''
as $$
  select btrim(regexp_replace(regexp_replace(regexp_replace(regexp_replace(regexp_replace(coalesce(raw, ''),
    '\r\n?', E'\n', 'g'), '[\u0001-\u0008\u000b\u000c\u000e-\u001f\u007f]', '', 'g'),
    '[\u200b\u200c\u200e\u200f\u202a-\u202e\u2060-\u2064\ufeff\u00ad]', '', 'g'), '\t', ' ', 'g'), '\n{3,}', E'\n\n', 'g'), E' \n');
$$;

-- Whether a student is over a limit on the kinds given: 'soon' (perwindow in the last secs seconds), 'day' (perday in
-- a day), or null. Their sent, request and report rows older than a day, and refused rows older than 7 days, are
-- cleared first.
create or replace function public.msg_limit(who uuid, kinds text[], secs int, perwindow int, perday int)
returns text
language plpgsql
set search_path = ''
as $$
begin
  delete from public.message_log where user_id = who
    and ((kind = 'refused' and at < now() - interval '7 days') or (kind <> 'refused' and at < now() - interval '1 day'));
  if perday is not null and (select count(*) from public.message_log where user_id = who and kind = any (kinds) and at > now() - interval '1 day') >= perday then return 'day'; end if;
  if perwindow is not null and (select count(*) from public.message_log where user_id = who and kind = any (kinds) and at > now() - make_interval(secs => secs)) >= perwindow then return 'soon'; end if;
  return null;
end;
$$;

-- A student's ban from messaging, as {until} (null until means always), or null if they are not banned.
create or replace function public.msg_ban(who uuid)
returns jsonb
language sql
stable
set search_path = ''
as $$
  select jsonb_build_object('until', b.until) from moderation.bans b where b.user_id = who and (b.until is null or b.until > now());
$$;

-- Where a student stands in a chat: open, sent (they asked; also after a silent decline), asked (the other asked and
-- it shows), or none. Requests older than 30 days count as gone.
create or replace function public.chat_state(c public.chats, me uuid)
returns text
language sql
stable
set search_path = ''
as $$
  select case
    when c.id is null then 'none'
    when c.open_at is not null then 'open'
    when c.asked_at is null or c.asked_at < now() - interval '30 days' then 'none'
    when c.asked_by = me then 'sent'
    when c.declined_at is null or (c.asked_at > c.declined_at and c.declined_at < now() - interval '7 days') then 'asked'
    else 'none' end;
$$;

revoke all on function public.msg_norm(text), public.msg_words(text), public.word_pattern(text), public.message_problem(text),
  public.message_care(text), public.msg_tidy(text), public.msg_limit(uuid, text[], int, int, int), public.msg_ban(uuid),
  public.chat_state(public.chats, uuid) from public, anon, authenticated;


-- ---------- the functions the app calls ----------
-- Each one finds the caller with auth.uid(), refuses anyone not signed in, and takes the friend as the ref of the
-- friendship (from friends_state), which only works for the caller's own friendships. They answer with a result word.

-- Every chat the student is in: the friend's ref, where they stand, how many messages they have not seen, and the last
-- message. Also whether they are banned from messaging, and whether a warning is waiting for them.
create or replace function public.chats_state()
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
    'me', jsonb_build_object('ban', public.msg_ban(me),
      'warned', exists (select 1 from moderation.notices n where n.user_id = me and n.seen_at is null)),
    'chats', coalesce((select jsonb_agg(jsonb_build_object(
        'ref', c.friendship,
        'state', public.chat_state(c, me),
        'unread', case when c.open_at is null then 0 else (select count(*)::int from public.messages m
          where m.chat = c.id and m.sender <> me and m.n > case when c.a = me then c.a_read else c.b_read end
          and m.sent_at > now() - interval '90 days') end,
        'last', (select jsonb_build_object('text', m.body, 'mine', m.sender = me, 'at', m.sent_at, 'care', m.care)
          from public.messages m where c.open_at is not null and m.chat = c.id and m.sent_at > now() - interval '90 days'
          order by m.n desc limit 1)))
      from public.chats c where c.a = me or c.b = me), '[]'::jsonb));
end;
$$;

-- Send a message request to a friend. Answers sent, open (they had asked, so the chat opens now), sent_already,
-- open_already, day (10 a day), banned, or gone (not friends).
create or replace function public.ask_to_message(friend uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
  them uuid;
  c public.chats;
  ban jsonb;
  s text;
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  select case when f.a = me then f.b else f.a end into them from public.friendships f where f.id = friend and (f.a = me or f.b = me);
  if them is null then return jsonb_build_object('result', 'gone'); end if;
  perform public.friend_lock(me, them);
  ban := public.msg_ban(me);
  if ban is not null then return jsonb_build_object('result', 'banned') || ban; end if;
  select * into c from public.chats where friendship = friend;
  s := public.chat_state(c, me);
  if s = 'open' then return jsonb_build_object('result', 'open_already'); end if;
  if s = 'sent' then return jsonb_build_object('result', 'sent_already'); end if;
  -- They had asked (even if this student declined it before): asking back opens the chat.
  if c.id is not null and c.asked_by = them and c.asked_at > now() - interval '30 days' then
    update public.chats set open_at = now() where id = c.id;
    return jsonb_build_object('result', 'open');
  end if;
  if public.msg_limit(me, array['ask'], 60, null, 10) is not null then return jsonb_build_object('result', 'day'); end if;
  insert into public.chats (friendship, a, b, asked_by, asked_at) values (friend, least(me, them), greatest(me, them), me, now())
    on conflict (friendship) do update set asked_by = excluded.asked_by, asked_at = excluded.asked_at;
  insert into public.message_log (user_id, kind) values (me, 'ask');
  return jsonb_build_object('result', 'sent');
end;
$$;

-- Accept a message request from a friend. Answers open, banned, or gone (no request showing).
create or replace function public.accept_message_request(friend uuid)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
  them uuid;
  c public.chats;
  ban jsonb;
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  select case when f.a = me then f.b else f.a end into them from public.friendships f where f.id = friend and (f.a = me or f.b = me);
  if them is null then return jsonb_build_object('result', 'gone'); end if;
  perform public.friend_lock(me, them);
  ban := public.msg_ban(me);
  if ban is not null then return jsonb_build_object('result', 'banned') || ban; end if;
  select * into c from public.chats where friendship = friend;
  if public.chat_state(c, me) <> 'asked' then return jsonb_build_object('result', 'gone'); end if;
  update public.chats set open_at = now() where id = c.id;
  return jsonb_build_object('result', 'open');
end;
$$;

-- Decline a message request. The sender is not told: their request keeps showing as waiting. Answers ok or gone.
create or replace function public.decline_message_request(friend uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
  c public.chats;
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  select ch.* into c from public.chats ch join public.friendships f on f.id = ch.friendship
    where ch.friendship = friend and (f.a = me or f.b = me);
  if public.chat_state(c, me) <> 'asked' then return 'gone'; end if;
  update public.chats set declined_at = now() where id = c.id;
  return 'ok';
end;
$$;

-- Cancel a message request you sent. Answers ok or gone.
create or replace function public.cancel_message_request(friend uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
  c public.chats;
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  select ch.* into c from public.chats ch join public.friendships f on f.id = ch.friendship
    where ch.friendship = friend and (f.a = me or f.b = me);
  if public.chat_state(c, me) <> 'sent' then return 'gone'; end if;
  update public.chats set asked_by = null, asked_at = null where id = c.id;
  return 'ok';
end;
$$;

-- The messages in a chat with a friend: the latest 100, or those after after_n (new ones), or the 100 before before_n
-- (Show earlier). Each is only {n, mine, text, at, care}. Fetching new or latest ones counts them as seen. Also where
-- the caller stands, whether there are earlier messages, and their ban. Answers gone if they are not friends.
create or replace function public.chat_messages(friend uuid, after_n int default 0, before_n int default null)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
  them uuid;
  c public.chats;
  s text;
  list jsonb := '[]'::jsonb;
  lo int;
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  select case when f.a = me then f.b else f.a end into them from public.friendships f where f.id = friend and (f.a = me or f.b = me);
  if them is null then return jsonb_build_object('result', 'gone'); end if;
  select * into c from public.chats where friendship = friend;
  s := public.chat_state(c, me);
  if s = 'open' then
    with picked as (
      select m.* from public.messages m
      where m.chat = c.id and m.sent_at > now() - interval '90 days'
        and (case when before_n is not null then m.n < before_n when coalesce(after_n, 0) > 0 then m.n > after_n else true end)
      order by case when before_n is null and coalesce(after_n, 0) > 0 then m.n else -m.n end
      limit case when before_n is null and coalesce(after_n, 0) > 0 then 200 else 100 end
    )
    select coalesce(jsonb_agg(jsonb_build_object('n', p.n, 'mine', p.sender = me, 'text', p.body, 'at', p.sent_at, 'care', p.care) order by p.n), '[]'::jsonb), min(p.n)
      into list, lo from picked p;
    if before_n is null then
      if c.a = me then update public.chats set a_read = greatest(a_read, c.last_n) where id = c.id;
      else update public.chats set b_read = greatest(b_read, c.last_n) where id = c.id; end if;
    end if;
  end if;
  return jsonb_build_object('result', 'ok', 'state', s, 'messages', list, 'ban', public.msg_ban(me),
    'more', lo is not null and exists (select 1 from public.messages m where m.chat = c.id and m.n < lo and m.sent_at > now() - interval '90 days'));
end;
$$;

-- Send a message to a friend. Answers {result: ok, n, at, care}, or a reason it was not sent: empty, long, gone (not
-- friends), closed (no open chat), banned (with until), soon (10 a minute), day (300 a day), or what the filter found
-- (bullying, word, link, email, offsite, phone). A refused message is counted, with its reason but not its text.
create or replace function public.send_message(friend uuid, body text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
  them uuid;
  c public.chats;
  ban jsonb;
  lim text;
  why text;
  txt text := public.msg_tidy(body);
  num int;
  sent timestamptz := now();
  cares boolean;
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  if txt = '' then return jsonb_build_object('result', 'empty'); end if;
  if char_length(txt) > 500 then return jsonb_build_object('result', 'long'); end if;
  select case when f.a = me then f.b else f.a end into them from public.friendships f where f.id = friend and (f.a = me or f.b = me);
  if them is null then return jsonb_build_object('result', 'gone'); end if;
  perform public.friend_lock(me, them);
  select * into c from public.chats where friendship = friend;
  if public.chat_state(c, me) <> 'open' then return jsonb_build_object('result', 'closed'); end if;
  ban := public.msg_ban(me);
  if ban is not null then return jsonb_build_object('result', 'banned') || ban; end if;
  lim := public.msg_limit(me, array['sent', 'refused'], 60, 10, null);
  if lim is null then lim := public.msg_limit(me, array['sent'], 60, null, 300); end if;
  if lim is not null then return jsonb_build_object('result', lim); end if;
  why := public.message_problem(txt);
  if why is not null then
    insert into public.message_log (user_id, kind, reason) values (me, 'refused', why);
    return jsonb_build_object('result', why);
  end if;
  num := c.last_n + 1;
  cares := public.message_care(txt);
  insert into public.messages (chat, n, sender, body, care, sent_at) values (c.id, num, me, txt, cares, sent);
  if c.a = me then update public.chats set last_n = num, a_read = num where id = c.id;
  else update public.chats set last_n = num, b_read = num where id = c.id; end if;
  insert into public.message_log (user_id, kind) values (me, 'sent');
  return jsonb_build_object('result', 'ok', 'n', num, 'at', sent, 'care', cares);
end;
$$;

-- Report a friend's message, with one of the reasons. The message and up to 10 messages either side are copied into
-- moderation.reports. The friend is not told. Answers ok, already, own (your own message), bad (not a reason), day
-- (20 a day), or gone.
create or replace function public.report_message(friend uuid, n int, reason text)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
  them uuid;
  c public.chats;
  who uuid;
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  if reason is null or reason not in ('bullying', 'sexual', 'personal', 'harm', 'spam', 'other') then return 'bad'; end if;
  select case when f.a = me then f.b else f.a end into them from public.friendships f where f.id = friend and (f.a = me or f.b = me);
  if them is null then return 'gone'; end if;
  select * into c from public.chats where friendship = friend;
  if c.id is null then return 'gone'; end if;
  select m.sender into who from public.messages m where m.chat = c.id and m.n = report_message.n and m.sent_at > now() - interval '90 days';
  if who is null then return 'gone'; end if;
  if who = me then return 'own'; end if;
  perform pg_advisory_xact_lock(hashtextextended(me::text, 0));
  if exists (select 1 from moderation.reports r where r.reporter = me and r.chat = c.id and r.message_n = report_message.n) then return 'already'; end if;
  if public.msg_limit(me, array['report'], 60, null, 20) is not null then return 'day'; end if;
  insert into moderation.reports (reason, reporter, reported, chat, message_n, messages)
  select report_message.reason, me, them, c.id, report_message.n,
    coalesce(jsonb_agg(jsonb_build_object('n', m.n, 'from', case when m.sender = me then 'reporter' else 'reported' end,
      'text', m.body, 'at', m.sent_at, 'this', m.n = report_message.n) order by m.n), '[]'::jsonb)
  from public.messages m
  where m.chat = c.id and m.n between report_message.n - 10 and report_message.n + 10 and m.sent_at > now() - interval '90 days';
  insert into public.message_log (user_id, kind) values (me, 'report');
  return 'ok';
end;
$$;

-- The student has read their warning.
create or replace function public.seen_notice()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  update moderation.notices set seen_at = now() where user_id = me and seen_at is null;
end;
$$;

revoke all on function public.chats_state(), public.ask_to_message(uuid), public.accept_message_request(uuid),
  public.decline_message_request(uuid), public.cancel_message_request(uuid), public.chat_messages(uuid, int, int),
  public.send_message(uuid, text), public.report_message(uuid, int, text), public.seen_notice() from public, anon, authenticated;
grant execute on function public.chats_state(), public.ask_to_message(uuid), public.accept_message_request(uuid),
  public.decline_message_request(uuid), public.cancel_message_request(uuid), public.chat_messages(uuid, int, int),
  public.send_message(uuid, text), public.report_message(uuid, int, text), public.seen_notice() to authenticated;


-- ---------- moderation: what the owner runs in the SQL Editor ----------
-- See supabase/README.md step 14. Each answers in words, saying what it did.

-- A student shown as @username, or what happened to them.
create or replace function moderation.who(id uuid)
returns text
language sql
stable
set search_path = ''
as $$
  select case when id is null then '(deleted account)' else coalesce((select '@' || p.username from public.profiles p where p.id = who.id), '(no username)') end;
$$;

-- New reports, oldest first, with the conversation written out. The reported message is marked >>.
create or replace view moderation.open_reports as
select r.id, r.at, r.reason, moderation.who(r.reporter) as reporter, moderation.who(r.reported) as reported,
  (select count(*) from moderation.reports o where o.reported = r.reported and r.reported is not null) as reports_against,
  (select count(*) from moderation.actions a where a.user_id = r.reported and a.action in ('warned', 'banned')) as warnings_and_bans,
  (select string_agg(case when (m->>'this')::boolean then '>> ' else '   ' end ||
     case m->>'from' when 'reported' then moderation.who(r.reported) else moderation.who(r.reporter) end || ': ' || (m->>'text'),
     E'\n' order by (m->>'n')::int) from jsonb_array_elements(r.messages) m) as conversation
from moderation.reports r
where r.status = 'new'
order by r.at;

-- How many messages each student had refused in the last 7 days, and why. No text is kept.
create or replace view moderation.refusals as
select moderation.who(l.user_id) as student, l.reason, count(*) as refused, max(l.at) as last_at
from public.message_log l
where l.kind = 'refused' and l.at > now() - interval '7 days'
group by l.user_id, l.reason
order by count(*) desc;

-- Every warning, ban, unban and review, newest first.
create or replace view moderation.history as
select a.at, moderation.who(a.user_id) as username, a.action, a.until, a.report
from moderation.actions a
order by a.at desc;

-- The account behind a username.
create or replace function moderation.account(name text)
returns uuid
language sql
stable
set search_path = ''
as $$
  select p.id from public.profiles p where p.username = lower(regexp_replace(btrim(name), '^@', ''));
$$;

-- Mark a report reviewed. Nothing else changes.
create or replace function moderation.reviewed(report_id uuid)
returns text
language plpgsql
set search_path = ''
as $$
declare
  r moderation.reports;
begin
  update moderation.reports set status = 'reviewed', done_at = now() where id = report_id returning * into r;
  if r.id is null then return 'No report with that id.'; end if;
  insert into moderation.actions (user_id, report, action) values (r.reported, r.id, 'reviewed');
  return 'Report marked reviewed.';
end;
$$;

-- Warn the reported student. They see the warning once, the next time they open Friends.
create or replace function moderation.warn(report_id uuid)
returns text
language plpgsql
set search_path = ''
as $$
declare
  r moderation.reports;
begin
  update moderation.reports set status = 'warned', done_at = now() where id = report_id returning * into r;
  if r.id is null then return 'No report with that id.'; end if;
  if r.reported is null then return 'That account has been deleted. The report is marked warned.'; end if;
  insert into moderation.notices (user_id, report) values (r.reported, r.id);
  insert into moderation.actions (user_id, report, action) values (r.reported, r.id, 'warned');
  return 'Warned ' || moderation.who(r.reported) || '. They will see it the next time they open Friends.';
end;
$$;

-- Ban a student from messaging for some days, or always (days null). Used by ban and ban_user.
create or replace function moderation.ban_account(who uuid, days int, report_id uuid)
returns text
language plpgsql
set search_path = ''
as $$
declare
  ends timestamptz := case when days is null then null else now() + make_interval(days => days) end;
begin
  insert into moderation.bans (user_id, until, report) values (who, ends, report_id)
    on conflict (user_id) do update set until = excluded.until, at = now(), report = excluded.report;
  insert into moderation.actions (user_id, report, action, until) values (who, report_id, 'banned', ends);
  return 'Banned ' || moderation.who(who) || ' from messaging ' ||
    case when ends is null then 'until you lift it.' else 'until ' || to_char(ends at time zone 'Australia/Sydney', 'FMDD FMMonth YYYY, HH24:MI') || ' Sydney time.' end;
end;
$$;

-- Ban the reported student from messaging, for days days, or always with null.
create or replace function moderation.ban(report_id uuid, days int)
returns text
language plpgsql
set search_path = ''
as $$
declare
  r moderation.reports;
begin
  if days is not null and days < 1 then return 'Days must be 1 or more, or null for always.'; end if;
  update moderation.reports set status = 'banned', done_at = now() where id = report_id returning * into r;
  if r.id is null then return 'No report with that id.'; end if;
  if r.reported is null then return 'That account has been deleted. The report is marked banned.'; end if;
  return moderation.ban_account(r.reported, days, r.id);
end;
$$;

-- Ban a student by username, with no report.
create or replace function moderation.ban_user(name text, days int)
returns text
language plpgsql
set search_path = ''
as $$
declare
  who uuid := moderation.account(name);
begin
  if who is null then return 'No student with that username.'; end if;
  if days is not null and days < 1 then return 'Days must be 1 or more, or null for always.'; end if;
  return moderation.ban_account(who, days, null);
end;
$$;

-- Lift a ban.
create or replace function moderation.unban(name text)
returns text
language plpgsql
set search_path = ''
as $$
declare
  who uuid := moderation.account(name);
begin
  if who is null then return 'No student with that username.'; end if;
  delete from moderation.bans where user_id = who;
  if not found then return moderation.who(who) || ' was not banned.'; end if;
  insert into moderation.actions (user_id, action) values (who, 'unbanned');
  return moderation.who(who) || ' can send messages again.';
end;
$$;

-- The daily clean-up: messages older than 90 days, requests nobody answered in 30 days, old log rows, reports and
-- history older than 12 months, and bans that have ended. Supabase Cron runs it every day (README step 12). Even
-- without it, nothing older than these limits is ever shown to a student.
create or replace function moderation.cleanup()
returns text
language plpgsql
set search_path = ''
as $$
declare
  gone int;
begin
  delete from public.messages where sent_at < now() - interval '90 days';
  get diagnostics gone = row_count;
  update public.chats set asked_by = null, asked_at = null where open_at is null and asked_at < now() - interval '30 days';
  delete from public.message_log where (kind = 'refused' and at < now() - interval '7 days') or (kind <> 'refused' and at < now() - interval '1 day');
  delete from moderation.reports where at < now() - interval '12 months';
  delete from moderation.actions where at < now() - interval '12 months';
  delete from moderation.notices where seen_at < now() - interval '12 months';
  delete from moderation.bans where until < now();
  return gone || ' old messages deleted.';
end;
$$;

revoke all on all functions in schema moderation from public, anon, authenticated;
revoke all on all tables in schema moderation from public, anon, authenticated;

-- Run the clean-up every day at 17:17 UTC (3:17 or 4:17 in the morning in Sydney), once Supabase Cron is turned on.
-- If it is not on yet, this does nothing: turn it on (README step 12) and run this file again.
do $$
begin
  if exists (select 1 from pg_extension where extname = 'pg_cron') then
    perform cron.schedule('stratos-cleanup', '17 17 * * *', 'select moderation.cleanup()');
  end if;
end;
$$;
