# Setting up Supabase for Stratos accounts

The project's address and publishable key are in `src/85-account.js`, so accounts are on. With them empty, accounts
are switched off, the app works exactly as before, and You shows no account row.

Do these steps in the Supabase dashboard for the project called stratos.

## 1. Check the region

The project's region is on its settings page. It should be Sydney (`ap-southeast-2`), so the data stays in
Australia and syncing is quick. A region cannot be changed later. If it is somewhere else, delete the project and
make a new one in Sydney while it is still empty.

## 2. Add the tables and rules

1. Open **SQL Editor** and start a new query.
2. Paste the whole of `supabase/schema.sql` and press **Run**. It should say Success. No rows returned.
3. Open **Table Editor**. There should be two tables, `profiles` and `progress`, and neither should be marked as
   unprotected (Supabase warns about a table without row-level security).
4. Open **Advisors**, then **Security Advisor**. There should be no warnings about these two tables or the
   `delete_account` function.

Running the file again later is safe. It keeps the data.

## 3. Sign-in settings

**Authentication**, then **Sign In / Providers**, then **Email**:

- Email: on.
- Confirm email: on.
- Email OTP Expiration: 900 seconds (15 minutes).
- Email OTP Length: 6.

Leave **Anonymous sign-ins** and **Phone** off. Google comes in its own pull request.

## 4. Web addresses

**Authentication**, then **URL Configuration**:

- Site URL: `https://garbagekarma23-max.github.io/Stratos/v2.html`
- Redirect URLs: add `https://garbagekarma23-max.github.io/Stratos/v2.html`

## 5. The emails

**Authentication**, then **Emails**, then **Templates**. Put the text in `supabase/emails.md` into both Magic Link
and Confirm signup.

Done. Both templates have the 6-digit code (`{{ .Token }}`) and the link. The app asks for the code first, and the
link still signs in the browser it opens in.

## 6. A sender for real students

Done: custom SMTP through Resend, sending from noreply@stratosstudy.com. It is under **Authentication**, then
**Emails**, then **SMTP Settings**.

Two things to check from time to time:

- **Authentication**, then **Rate Limits**: the email limit should be high enough for every tester to sign in. Supabase
  sets it low until custom SMTP is on.
- In Resend, click tracking (link tracking) should be off. It rewrites the link in the email, which Supabase says
  can break it.

## 7. The two values for the code

Open **Settings**, then **API Keys** (or the **Connect** button at the top of the project).

| Value | Starts with | Where it goes |
| --- | --- | --- |
| Project URL | `https://` and ends `.supabase.co` | `url` in `SUPA` at the top of `src/85-account.js` |
| Publishable key | `sb_publishable_` | `key` in `SUPA` at the top of `src/85-account.js` |
| Secret key | `sb_secret_` (the older one is called `service_role`) | **Nowhere.** Not in the code, not on GitHub, not in a chat. |

The publishable key is meant to be public. It only lets a browser ask, and the rules in `schema.sql` decide what it
may do. It replaces the older "anon" key, which Supabase is retiring at the end of 2026. Nothing in Stratos needs
the secret key, because it passes every rule.

After the values are in, run `python3 build.py`, run the tests, and commit `src/` and `v2.html` together.

## 8. Check it with two accounts

Once the site is updated:

1. On your phone, sign in with one email. Answer a question.
2. On a computer, sign in with the same email. The answer should be there.
3. In **Table Editor**, open `progress`. There should be one row, with an id and no email.
4. Sign in on a second browser with a different email that is on your Supabase team. Its You page should show
   none of the first account's progress.
5. On the second account, tap **Delete account** twice. In **Authentication**, then **Users**, only the first
   account should be left, and `progress` should have one row.

## 9. Add friends

Do this once the pull request with `supabase/friends.sql` is merged.

1. Open **SQL Editor** and start a new query.
2. Paste the whole of `supabase/friends.sql` and press **Run**. It should say Success. No rows returned. It needs the
   tables from step 2, which are in already, so do not run `schema.sql` again.
3. Open **Table Editor**. There should be seven new tables: `friend_codes`, `friend_requests`, `friendships`,
   `blocks`, `friend_log`, `friend_seen` and `banned_words`, and `profiles` should have three new columns:
   `username`, `findable` and `username_at`. None of the tables should be marked as unprotected.
4. Open **Advisors**, then **Security Advisor**. Two kinds of notice are expected, and nothing else:
   - "RLS enabled, no policy" on the seven new tables. That is on purpose: no student may reach them directly, only
     the functions in the file.
   - A note that signed-in users can run a `security definer` function, if Supabase shows that check. That is on
     purpose too: each of those functions finds the caller with `auth.uid()` and only touches their rows.

   Anything else is a problem. Send it to Claude.

Running the file again later is safe. It keeps the data.

If friends are in already, run `supabase/friends.sql` once more after the pull request that fixed Nigeria is merged.
Before that fix, the check refused usernames and call signs such as "nigeria" and "Niger", because a banned word with a
double letter matched the same letters with one. Running the file again puts the fixed check in and keeps the data.

To ban another word in usernames and call signs, open **Table Editor**, then `banned_words`, and insert a row: the word
in lower case letters only, and `anywhere` ticked if it should be caught inside longer names too (leave it unticked
for short words that are part of ordinary ones). It applies to new and changed names straight away.

## 10. Check friends with two accounts

Once the site is updated. Use your own email for the first account and the same address with +test before the @ for
the second (written here as you@example.com and you+test@example.com). Supabase treats them as two accounts, and both
emails arrive in your inbox.

1. Sign in with you@example.com on your phone (A) and you+test@example.com on a computer (B). Give A the call sign
   Ace and B the call sign Bee.
2. On both, open Friends and pick a username, such as ace.test and bee.test.
3. On B, tap Add a friend and search ACE in capitals. @ace.test shows, with "No mutual friends" and nothing else.
   Tap Send request.
4. On A, within about 10 seconds, Bee shows under Requests. Tap Accept. Both lists now show the other's call sign.
5. In **Table Editor**, `friendships` has one row of two ids. Neither table shows an email.
6. On A, open You, then Account, and turn off "Let people find me by username". On B, search ace: "No one found".
   Turn it back on.
7. On B, try a call sign with a banned word: it is refused with a message.
8. On B, open Your friend code and tap Make a new code. On A, use the Code side of Add a friend with the old code:
   "That code didn't work". Type six more made-up codes: the last says to wait 15 minutes.
9. On A, tap Bee, then Block, then Tap again. B's list empties, with no message. On B, search ace: "No one found".
   On A, Unblock Bee under Blocked.
10. On B, open Account and tap Delete account twice. Bee leaves A's lists, and `friend_codes`, `friendships`,
    `friend_requests` and `blocks` have no rows with B's id. The username bee.test can be picked again.

## 11. Add messages

Do this once the pull request with `supabase/messages.sql` is merged. Until then the app still works: Friends shows
the list, and a chat only says it is loading.

1. Open **SQL Editor** and start a new query.
2. Paste the whole of `supabase/messages.sql` and press **Run**. It should say Success. No rows returned. It needs the
   tables from steps 2 and 9, which are in already, so do not run the other files again.
3. Open **Table Editor**. In the `public` schema there should be three new tables, `chats`, `messages` and
   `message_log`, none marked as unprotected, and `banned_words` should have a new column, `in_messages`.
4. In the schema list at the top left of Table Editor, pick `moderation`. It should have four tables, `reports`,
   `bans`, `notices` and `actions`.
5. Open **Settings**, then **API** (or **Data API**). Under **Exposed schemas**, leave it as it is: `public` and
   `graphql_public`. Never add `moderation`. That is what keeps reports away from students.
6. Open **Advisors**, then **Security Advisor**. Expected, and nothing else: "RLS enabled, no policy" on the three new
   tables (only the functions in the file reach them), and the note about `security definer` functions from step 9.

Running the file again later is safe. It keeps the data.

Messages refuse fewer words than usernames: slurs and explicit sexual words only. To refuse another word in messages,
open **Table Editor**, then `banned_words`, find the word (or add it, as in step 9) and tick `in_messages`.

## 12. Turn on the daily clean-up

Messages are deleted after 90 days and reports after 12 months. The app never shows anything older, but the rows only
leave the database when the clean-up runs.

1. Open **Integrations**, then **Cron**, and turn it on (it installs the `pg_cron` extension).
2. Open **SQL Editor** and run `supabase/messages.sql` once more. With Cron on, it adds a job called
   `stratos-cleanup` that runs every day at 17:17 UTC (early morning in Sydney).
3. In **Integrations**, then **Cron**, the job `stratos-cleanup` should be listed. To run it once by hand, run
   `select moderation.cleanup();` in **SQL Editor**. It answers with how many old messages it deleted.

## 13. Check messages with two accounts

Once the site is updated. Use you@example.com and you+test@example.com, already friends from step 10 (make them
friends again if step 10 ended with a deleted account).

1. On A, open Friends and tap B. Tap **Send message request**. It says "Message request sent."
2. On B, B's row says "Wants to message you", with a dot. Open it and tap **Accept**.
3. Send messages both ways. Each arrives within about 5 seconds while the chat is open.
4. On A, send `call me on 0412 345 678`. It stays in the box with "Messages can’t have phone numbers." Then send
   `add me on snap`: "Keep chats on Stratos."
5. On A, send `I want to die`. A sees a line about Kids Helpline. B sees "might be going through something".
6. On B, tap that message, then **Report message**, then a reason. In **SQL Editor**, run
   `select * from moderation.open_reports;`. The report is there, with the conversation written out.
7. Try each action in step 14 on A: warn (A sees the warning next time Friends opens), ban for 1 day (A's box is
   replaced with "You can’t send messages until"), then unban.
8. In **Table Editor**, `messages` has the messages and `chats` one row. Neither has an email.
9. On B, open the chat, tap the button at the top right, then **Block** twice. The chat closes on both phones, and
   `chats` and `messages` are empty. The report stays in `moderation.reports`.

## 14. Acting on reports

Everything here is done in **SQL Editor**. Each command answers in words, saying what it did. A report's id is the
long code in the `id` column of `open_reports`. Copy it and paste it between the quote marks.

| To | Run | What happens |
| --- | --- | --- |
| See new reports | `select * from moderation.open_reports;` | One row per new report, oldest first: when, the reason, who reported, who was reported, how many reports and warnings that student has had, and the conversation. The reported message starts with `>>`. |
| Mark one reviewed | `select moderation.reviewed('report id');` | The report leaves the list. Nothing else changes, and nobody is told. |
| Warn | `select moderation.warn('report id');` | The student sees "A message you sent was reported", with the rules for messages, the next time they open Friends. Once only. They are not told who reported them. |
| Ban from messaging | `select moderation.ban('report id', 7);` | For 7 days (any number of days). The student can still read chats and use friends, but cannot send messages or message requests, or accept one. Their box says until when, with support@stratosstudy.com. |
| Ban for good | `select moderation.ban('report id', null);` | Until you lift it. The box says "Messaging is turned off for your account." |
| Ban without a report | `select moderation.ban_user('username', 7);` | The same, found by username (with or without the @). |
| Lift a ban | `select moderation.unban('username');` | They can send messages again straight away. |
| See refused messages | `select * from moderation.refusals;` | How many messages each student had refused in the last 7 days, and why (phone, link, word). No text is kept. Many refusals for phone numbers or other apps is worth a look. |
| See what you have done | `select * from moderation.history;` | Every review, warning, ban and unban, newest first. Add `where username = '@name'` before the `;` to see one student. |

Reports can also be browsed in **Table Editor**: pick the `moderation` schema, then `reports`. Change nothing there
by hand: the commands above also record what you did and tell the student.

Step 15 emails you when a report arrives. Check `open_reports` from time to time as well, in case an email goes
astray.

## 15. Email me when a report comes in

Each report sends you an email through Resend, from noreply@stratosstudy.com. The email says only that a report came
in, its reason, how many reports are open, and to run `select * from moderation.open_reports;`. It never has the
messages, usernames or anything else about a student.

- A "Hurting themselves or others" report is urgent: the subject starts with URGENT, and it always sends.
- Other reports send at most one email every 5 minutes, across all students, because Resend's 100 emails a day are
  shared with sign-in codes. A report held back by that limit is still in `open_reports`, and the next email counts
  it. If no other email comes, a catch-up every 15 minutes sends one email about the reports held back, inside the
  same limit.
- If the email fails for any reason, the report is still saved.

The code is `supabase/report-email.sql`. The Resend key and your address are secrets in Supabase, never in the code.
Do this once the pull request with that file is merged.

### A Resend key that can only send

1. Open resend.com, then **API Keys**, then **Create API Key**.
2. Name it `Stratos report alerts`.
3. For **Permission**, pick **Sending access**, not Full access.
4. For **Domain**, pick `stratosstudy.com`, so the key cannot send from any other domain.
5. Press **Add**. Resend shows the key once. It starts with `re_`. Copy it and go straight to the next part. Never
   paste it into a chat, a file or the SQL Editor (the SQL Editor keeps a history of what was typed).

This key is separate from the one Supabase uses for sign-in emails, so deleting it later never touches sign-in.

### Put the two secrets in Supabase

1. Open **Integrations**, then **Vault**. On some dashboards Vault is under **Project Settings**. If it asks to
   install Vault, install it.
2. Press **Add new secret**. Name: `resend_api_key`. Secret: the `re_` key. Save.
3. Press **Add new secret** again. Name: `report_email_to`. Secret: the address the emails should go to. Save.

The names must be exactly these. To change the address later, edit `report_email_to` in Vault. Nothing else needs
running.

### Add the code

1. Open **Database**, then **Extensions**, search `pg_net`, and turn it on if it is off. It lets the database send
   the email. The file below tries to turn it on too.
2. Open **SQL Editor**, paste the whole of `supabase/report-email.sql` and press **Run**. It should say Success. No
   rows returned. It needs the tables from steps 2, 9 and 11, which are in already.
3. In **Table Editor**, the `moderation` schema has a new table, `alerts`: one row per email tried, saying whether it
   went. It has nothing about a student.
4. In **Integrations**, then **Cron**, there is a new job, `stratos-report-catchup`, every 15 minutes. Cron is on
   from step 12. If the job is missing, turn Cron on and run the file again. To run the catch-up once by hand, run
   `select moderation.email_catchup();`. It answers what it did.
5. If **Security Advisor** lists `alerts` as "RLS enabled, no policy", that is on purpose, as in step 11.

Running the file again later is safe. It keeps the data.

To see each report's email, newest first, run `select * from moderation.alert_status;`. `what_happened` says Resend
accepted it, Resend refused it (with Resend's reason, such as a wrong key), it was not sent because another email went
in the 5 minutes before, or what is missing (a Vault secret, or pg_net). A catch-up email shows as Catch-up. Resend's
answers are kept for 6 hours.

### Check it with two accounts

Use A and B from step 13, with the chat open and about eight messages each way. Each message can be reported once.

1. On B, tap one of A's messages, then **Report message**, then **Spam**. Within about a minute an email arrives with
   the subject "Stratos: new report (Spam)" and "Open reports: 1". Check it has no names and no message text.
2. On A, within 5 minutes of step 1, report one of B's messages as **Spam**. No email arrives, because the limit is for
   everyone. In **SQL Editor**, `select * from moderation.alert_status;` shows it as not sent, and `open_reports`
   shows both reports.
3. On B, still within the 5 minutes, report one of A's messages as **Hurting themselves or others**. An email arrives
   with the subject "URGENT: Stratos: new report (Hurting themselves or others)" and "Open reports: 3".
4. Within 15 minutes of step 2, with no other report, the catch-up sends one more email: "Stratos: new report
   (Spam)" and "Open reports: 3". That is the step 2 report, which no email had counted. To see it sooner, wait
   until 5 minutes have passed since step 1 and run `select moderation.email_catchup();` in **SQL Editor**: it
   answers "Sent one email about 1 report."
5. Run `select moderation.email_catchup();` again. It answers "No reports waiting for an email."
6. Check that a failed email cannot stop a report. In Vault, edit `report_email_to` to `not-an-email`. On B, report
   one of A's messages as **Hurting themselves or others** (urgent, so the 5 minutes do not matter). B still sees
   "Thanks for reporting". The report is in `open_reports`, no email arrives, and `alert_status` says Resend refused
   it. Set `report_email_to` back to your address.
7. Mark the test reports reviewed with `moderation.reviewed`, as in step 14.

If no email arrives in step 1, `alert_status` says why.

## 16. Add challenges

Do this once the pull request with `supabase/challenges.sql` is merged. Until then the app still works: Friends shows
the list, and Challenge says something went wrong.

1. Open **SQL Editor** and start a new query.
2. Paste the whole of `supabase/challenges.sql` and press **Run**. It should say Success. No rows returned. It needs the
   tables from steps 2, 9 and 11, which are in already.
3. Start a new query, paste the whole of `supabase/messages.sql` again and press **Run**. This adds challenges to the
   daily clean-up from step 12. Running it again is safe: it keeps every chat, message and report.
4. Open **Table Editor**. There should be three new tables, `challenge_chapters`, `challenges` and `challenge_log`,
   none marked as unprotected. `challenge_chapters` has 18 rows, one for each chapter a challenge can use.
5. Open **Advisors**, then **Security Advisor**. Expected, and nothing else new: "RLS enabled, no policy" on the three
   new tables (only the functions in the file reach them), and the note about `security definer` functions.

Running `challenges.sql` again later is safe. It keeps the data, and puts `challenge_chapters` back as the file says.
A new chapter in the app needs a line in that list and the file run again. A test checks the list matches the app.

## 17. Check challenges with two accounts

Once the site is updated. Use A and B from step 13, friends, each with a call sign. A needs one chapter where every
point is learned.

1. On A, open Friends and tap **Challenge** on B's row. A chapter A has not learned says "Learn every point first" and
   cannot be picked. Pick the learned one. A plays 8 questions, and the result says "Sent to B. They have 7 days to
   play it."
2. In **Table Editor**, `challenges` has one row, with A's score in `from_right` and time in `from_ms`. There is no
   email or name in it.
3. On B, within about 10 seconds with Friends open, the challenge shows under **Challenges to play**, with the score
   and time to beat. Home's friends button has a dot. Tap **Play**. B gets the same questions as A, in the same order.
4. Both chats show the card with both scores and who won. On A, B's row says the result, with a dot that goes when
   the chat opens.
5. On A, send another challenge. On B, tap **Decline**. B sees "Declined. A isn’t told." A's card still says it is
   waiting.
6. On A, open the chat, tap the button at the top right, and check the tally under **Challenges**.
7. On B, block A. `challenges` is empty.
8. To run the clean-up by hand: `select moderation.cleanup();`. It also deletes challenges older than 90 days and
   ones a challenger started and never finished.

## 18. Add online status and the typing bubble

Do this once the pull request with `supabase/live.sql` is merged. Until then the app still works: nobody shows online,
the typing bubble never shows, and new messages arrive within 5 seconds as before.

1. Open **SQL Editor** and start a new query.
2. Paste the whole of `supabase/live.sql` and press **Run**. It should say Success. No rows returned. It needs the
   tables from steps 2, 9, 11 and 16, which are in already.
3. Open **Realtime**, then **Settings**. Turn off **Allow public access**, and save. Now a phone can only join a
   private channel that the rules in `live.sql` allow. Stratos uses no public channels, so nothing else changes. (If
   the dashboard words it differently, it is the setting that allows only private channels.)
4. Open **Table Editor**. There should be one new table, `online`, not marked as unprotected. It holds a row only for
   a student who has the app open now, and only until when that lasts.
5. Open **Authentication**, then **Policies**, and pick the `realtime` schema. `messages` should have exactly two
   policies, `stratos chat hear` and `stratos chat send`. Rules on a table add up, so any other policy here would let
   more phones in. Don't add one without checking it against these two.
6. In **Integrations**, then **Cron**, there should be a job called `stratos-online` that runs every minute. It deletes
   marks whose minute has passed. If it is missing, Cron was off: turn it on (step 12) and run `live.sql` again.
7. Open **Advisors**, then **Security Advisor**. Expected, and nothing else new: "RLS enabled, no policy" on `online`
   (only the functions in the file reach it), and the note about `security definer` functions.
8. Open **Project Settings**, then **Data API**. **Exposed schemas** must not include `live` or `moderation`. They
   aren't there unless someone adds them.

Running `live.sql` again later is safe. It keeps the data and puts the rules back as written.

An early copy of `live.sql` had the line `alter table realtime.messages enable row level security;`, which fails in the
SQL Editor with "must be owner of table messages". Supabase owns that table and already has row-level security on it,
so the line is gone. If you ran the file with that line deleted, as the project already has, nothing needs running
again: the file now is exactly what you ran.

What it keeps: one row per student who has the app open, holding only when their mark runs out (a minute after their
last check-in). No history, and no "last seen". Typing and the "new message" signal pass through Realtime and are
never saved. Message text never goes through Realtime: the friend's app still fetches it with `chat_messages`.

## 19. Check online status and typing with two accounts

Once the site is updated. Use A and B from step 13, friends, with an accepted message request.

1. Open the app on both. On A, open Friends. Within about 10 seconds, B's row shows a green dot and "Online". The
   chat's header and the Challenge sheet for B say Online too.
2. In **Table Editor**, `online` has two rows. Each `until` is about a minute ahead.
3. On B, switch to another app. On A, B goes from the list within about 10 seconds, and B's row in `online` is gone.
4. On B, open You, then Account, and turn off **Show when I’m online**. A no longer sees B online. B still sees A.
   Turn it on again.
5. Open the chat on both. On A, type without sending. On B, three dots show at the bottom left within a second, and
   go a few seconds after A stops, when A empties the box, or when A leaves the chat.
6. On A, send a message. It shows on B within a second or two.
7. On A, block B. On B, typing no longer reaches A, and the chat closes within about 5 seconds.

## If the project pauses

A free project pauses after a week with no use. The app keeps working on each device while it is paused. Press
**Restore** on the project's page and syncing starts again.
