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

## If the project pauses

A free project pauses after a week with no use. The app keeps working on each device while it is paused. Press
**Restore** on the project's page and syncing starts again.
