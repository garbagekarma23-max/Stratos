-- Stratos accounts: the two tables, the rules that protect them, and the function that deletes an account.
-- Paste this whole file into the SQL Editor in the Supabase dashboard and press Run.
-- Running it again is safe: it only adds what is missing and puts the rules back as written here.
--
-- auth.uid() is the id of the student who sent the request. Supabase works it out from their sign-in, so a student
-- cannot pretend to be someone else. A request from someone not signed in has no id.


-- ---------- profiles: one row per student, for the call sign ----------
-- id is the account's random id, made by Supabase. Deleting the account deletes the row.
-- Friends (later) will see the call sign, so nothing else about the student goes in this table.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  call_sign text check (call_sign is null or char_length(call_sign) between 1 and 16),
  created_at timestamptz not null default now()
);


-- ---------- progress: one row per student, for study progress ----------
-- data is the synced part of the save, in the shape the app already uses (see src/84-merge.js).
-- rev goes up by one on every save. A device saves only if rev is still what it last saw, so two devices
-- saving at the same moment cannot write over each other.
-- The size check stops anyone filling the database with junk. Real progress is a few KB. It measures the data
-- written out as text, because the size the database stores is after squeezing, and junk squeezes very small.
create table if not exists public.progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null default '{}'::jsonb constraint progress_size check (octet_length(data::text) <= 200000),
  rev bigint not null default 1 check (rev >= 1),
  updated_at timestamptz not null default now()
);

-- updated_at is set by the database on every change, not by the app.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;
drop trigger if exists progress_touch on public.progress;
create trigger progress_touch before insert or update on public.progress
  for each row execute function public.touch_updated_at();


-- ---------- who may do what ----------
-- First take away everything Supabase gives by default, then give back only what the app needs.
-- anon is anyone not signed in: they get nothing at all.
-- authenticated is a signed-in student: they may read, add and change rows, and only the columns named.
-- Nobody may delete a row. Rows go when the account is deleted.
revoke all on public.profiles, public.progress from anon, authenticated;
grant select on public.profiles, public.progress to authenticated;
grant insert (id, call_sign) on public.profiles to authenticated;
grant update (call_sign) on public.profiles to authenticated;
grant insert (user_id, data, rev) on public.progress to authenticated;
grant update (data, rev) on public.progress to authenticated;

-- Row-level security: with it on, the database refuses every row unless a rule below allows it.
alter table public.profiles enable row level security;
alter table public.progress enable row level security;

-- profiles, rule 1: a student can read only their own row.
drop policy if exists "read own profile" on public.profiles;
create policy "read own profile" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);

-- profiles, rule 2: a student can add only a row with their own id.
drop policy if exists "add own profile" on public.profiles;
create policy "add own profile" on public.profiles
  for insert to authenticated with check ((select auth.uid()) = id);

-- profiles, rule 3: a student can change only their own row, and it must stay theirs.
drop policy if exists "change own profile" on public.profiles;
create policy "change own profile" on public.profiles
  for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

-- progress, rule 1: a student can read only their own row.
drop policy if exists "read own progress" on public.progress;
create policy "read own progress" on public.progress
  for select to authenticated using ((select auth.uid()) = user_id);

-- progress, rule 2: a student can add only a row with their own id.
drop policy if exists "add own progress" on public.progress;
create policy "add own progress" on public.progress
  for insert to authenticated with check ((select auth.uid()) = user_id);

-- progress, rule 3: a student can change only their own row, and it must stay theirs.
drop policy if exists "change own progress" on public.progress;
create policy "change own progress" on public.progress
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);


-- ---------- deleting an account ----------
-- The app calls this when a student taps Delete account. It takes nothing in: it deletes the account of whoever
-- called it, found with auth.uid(), so there is no way to name another account. Someone not signed in has no id,
-- so it deletes nothing, and they are not allowed to call it anyway.
-- security definer lets it delete from Supabase's own list of accounts, which students cannot touch directly.
-- Deleting the account deletes its profiles and progress rows with it (on delete cascade above).
create or replace function public.delete_account()
returns void
language sql
security definer
set search_path = ''
as $$
  delete from auth.users where id = (select auth.uid());
$$;
revoke all on function public.delete_account() from public, anon, authenticated;
grant execute on function public.delete_account() to authenticated;
