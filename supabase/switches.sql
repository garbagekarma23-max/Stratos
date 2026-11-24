-- Stratos sharing switches: new accounts start with all three off, and accounts from before see a notice once.
-- Run supabase/schema.sql, friends.sql, messages.sql, report-email.sql, challenges.sql, live.sql, week.sql and
-- feedback.sql first (all are in already). Then paste this whole file into the SQL Editor in the Supabase dashboard and
-- press Run. Running it again is safe: it changes nobody's switches and keeps every notice as it is.
--
-- The three switches, on the Account sheet in the app:
-- * "Let people find me by username" (profiles.findable, friends.sql). On, anyone signed in can find the student by
--   typing the start of their username. Off, only people they give their friend code to can add them.
-- * "Show when I'm online" (profiles.show_online, live.sql). On, friends see a green dot while the app is open.
-- * "Show me on friends' weekly table" (profiles.show_week, week.sql). On, friends see the student's call sign and
--   their number of right answers this week.
--
-- What this file does:
-- * Every account made from now on starts with all three off. The student turns each one on if they want it. The
--   draft Children's Online Privacy Code asks for settings that share something to start off (docs/privacy-review.md).
-- * Accounts from before keep exactly what they had. The first time this file runs, every account with no profiles row
--   yet gets one, with the old settings (all on), so nobody's settings change underneath them.
-- * Accounts from before get switch_notice, so the app shows them a notice once, explaining each switch and opening
--   the Account sheet to change them. New accounts never see it: theirs start off, and the switches are on the
--   Account sheet with a line each.


-- ---------- the notice, on profiles ----------
-- switch_notice: true while the student has a notice to see. Students cannot write it directly (schema.sql lets them
-- change call_sign only). Only seen_switch_notice below can, and only to false.
-- The first run is told apart by switch_notice not being there yet. Only then are the old accounts given profiles rows
-- and the notice. Adding the column with true marks every row there now; the default is then false for new rows.
do $$
begin
  if not exists (select 1 from information_schema.columns
                 where table_schema = 'public' and table_name = 'profiles' and column_name = 'switch_notice') then
    -- The old settings, all on, for every account with no row yet. A new account gets a row only when it picks a
    -- call sign or a username, so some old accounts have none.
    alter table public.profiles alter column findable set default true;
    alter table public.profiles alter column show_online set default true;
    alter table public.profiles alter column show_week set default true;
    insert into public.profiles (id)
      select u.id from auth.users u where not exists (select 1 from public.profiles p where p.id = u.id)
      on conflict (id) do nothing;
    alter table public.profiles add column switch_notice boolean not null default true;
  end if;
end;
$$;

-- From now on, every new row starts with the three switches off and no notice.
alter table public.profiles alter column findable set default false;
alter table public.profiles alter column show_online set default false;
alter table public.profiles alter column show_week set default false;
alter table public.profiles alter column switch_notice set default false;


-- ---------- the functions the app calls ----------
-- Each runs with the database's own permission (security definer), finds the caller with auth.uid(), refuses anyone
-- not signed in, and only touches the caller's own row.

-- Whether to show the notice, with where each switch stands now, so the notice says it as it is:
-- {show, findable, online, week}. show is false for a new account, and once the notice has been seen.
create or replace function public.switch_notice()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  return (select jsonb_build_object('show', coalesce(p.switch_notice, false), 'findable', coalesce(p.findable, false),
                                    'online', coalesce(p.show_online, false), 'week', coalesce(p.show_week, false))
          from (select 1) one left join public.profiles p on p.id = me);
end;
$$;

-- The notice has been shown. It never shows again, on any device.
create or replace function public.seen_switch_notice()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  me uuid := auth.uid();
begin
  if me is null then raise exception 'not signed in' using errcode = '42501'; end if;
  update public.profiles set switch_notice = false where id = me and switch_notice;
end;
$$;

revoke all on function public.switch_notice(), public.seen_switch_notice() from public, anon, authenticated;
grant execute on function public.switch_notice(), public.seen_switch_notice() to authenticated;
