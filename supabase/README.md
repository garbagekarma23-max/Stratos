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

Supabase only lets the templates be changed once step 6 is done. Until then students get Supabase's own email, which
has the link and no code. The app works with that: the sheet after sending leads with the link, and the code box is
there for when the email has one.

## 6. A sender for real students

Supabase's built-in email only sends to members of your Supabase team, and only about 2 emails an hour. That is
enough for you to try it with your own address. It will not work for testers.

Before testers use it, set up your own sender under **Authentication**, then **Emails**, then **SMTP Settings**.
That needs a domain you own and an email service such as Resend or Brevo. Then raise the email limit under
**Authentication**, then **Rate Limits**.

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

## If the project pauses

A free project pauses after a week with no use. The app keeps working on each device while it is paused. Press
**Restore** on the project's page and syncing starts again.
