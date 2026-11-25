# Privacy review

Written 23 November 2026, from the code in `src/`, `lab/` and `supabase/*.sql` as they stand on main, plus the
setup notes in `supabase/README.md` and `CLAUDE.md`. Nothing here changes how the app behaves. The draft privacy
policy that goes with it is in the app (You, then Privacy), and its text is in `src/87-privacy.js`.

This is not legal advice. Before launch, have a lawyer read the policy and the gap list.

Updated 24 November 2026 with the owner's first decisions (see Decisions for the owner at the end): the three sharing
switches start off for new accounts, the typefaces come from this site instead of Google Fonts, students' feedback notes
stay out of the public repository, accounts unused for 2 years are deleted, `CLAUDE.md` describes Stratos as a study app
first, and the policy names "Stratos" with support@stratosstudy.com as the operator.

## The short version

- Without an account, Stratos keeps everything on the device. Two things still leave it: the page load (GitHub Pages
  sees the IP address and browser; the typefaces now come from the same site), and feedback a student sends, which
  carries no account.
- With an account, Stratos keeps an email address, a call sign, a username, progress, friends, messages for 90 days,
  challenges for 90 days, right answers for 15 days, an online mark for 60 seconds, feedback and reports for 12 months.
  An account nobody signs in to or uses for 2 years is deleted with everything in it.
- Every table has row-level security, students reach other students' data only through functions that return a ref,
  a call sign, a username and a few numbers, and Delete account removes nearly everything at once. That is a strong
  base.
- The largest gap left against the draft Children's Online Privacy Code: no age question and no parental consent for
  under-15s. Also open: no written process for access or deletion requests by email. The three sharing switches now
  start off for new accounts, and the draft privacy policy is in the app.

## Does the law apply?

Stratos is most likely covered by the Privacy Act's small business exemption (s 6D): an operator with annual turnover
of A$3 million or less is not an APP entity, unless an exception applies. The exceptions that could matter later are
disclosing personal information for a benefit (s 6D(4)(c) and (d)), choosing to opt in (s 6EA), or Parliament removing
the exemption, which the government has proposed. The draft Children's Online Privacy Code binds APP entities, so,
on the commentary below, it would not bind Stratos while the exemption applies.

So everything in the gap list is a recommendation, not a legal requirement today. It is still the standard the OAIC
will expect of a service built for children, and Stratos is plainly "likely to be accessed by children". Building to
it now is cheaper than retrofitting once the exemption goes or turnover grows.

## Sources, and what could not be checked

This session's network could not reach oaic.gov.au or legislation.gov.au, so the draft Code, the Online Safety Act and
the minimum age Rules were read through law-firm and eSafety summaries, not the primary text. Clause numbers below are
secondhand. Check each against the primary text before relying on it.

- OAIC, exposure draft of the Privacy (Children's Online Privacy) Code 2026, released 31 March 2026, consultation
  closed 5 June 2026. The final Code must be registered by 10 December 2026 (Privacy Act s 26GC). No commencement date
  had been announced at the time of writing.
  https://www.oaic.gov.au/news/media-centre/oaic-releases-exposure-draft-of-the-childrens-online-privacy-code
- Summaries: Baker McKenzie (May 2026), Bird & Bird, Allens, Gilbert + Tobin, MinterEllison, McCullough Robertson,
  Corrs, Russell Kennedy.
- Online Safety Act 2021 s 63C, and the Online Safety (Age-Restricted Social Media Platforms) Rules 2025
  (F2025L00889), amended March 2026 (F2026L00370). eSafety's assessment guidance and FAQs.
- Not checked from here: the Supabase project's region (`supabase/README.md` step 1 says it should be Sydney), how long
  Supabase keeps sign-in logs on this project's plan, and how long Resend keeps its email logs.

## What Stratos collects

"Owner" means the person who runs the Supabase project. The owner can read every table in the Supabase dashboard,
including messages, because the dashboard passes every rule. No student can read another student's rows directly.

### On the device (browser storage)

| Stored as | What | Why | Kept until |
| --- | --- | --- | --- |
| `stratos2.v1` | Answers with times, records, streak, chapters, the course and starting chapter, call sign, appearance, sound, the place picked (country and state), the sample friends' pretend messages, `welcomed`, `offered`, `picked` | The app runs from it | Reset or Sign out |
| `stratos2.sync` | Account id, email, `rev`, the account copy as last seen, the call sign | Keeping in step with the account | Sign out, Reset, Delete account |
| `stratos2.auth` | Supabase's sign-in session (access and refresh tokens, which hold the email) | Staying signed in | Sign out |
| `stratos2.friends` | The last friends list: refs, friends' call signs and usernames, requests, blocks | Showing Friends offline | Sign out, Reset, Delete account |
| `stratos2.chal` | A challenge score not sent yet, with the account id | Sending it later | Sent, or Sign out |
| `stratos2.wk` | Right answers waiting for the weekly table (question id and time, at most 400), with the account id | Sending them later | Sent, or Sign out |
| `stratos2.fb` | Feedback waiting to be sent (at most 20, 30 days) | Sending it when online | Sent, refused, or 30 days. Not erased by Reset or Sign out |
| `stratos-lab.v1` | Maths Lab results (times, lines, deletes, undos) | The lab's results screen | Never erased by the app. Separate page |

Messages and challenges with real friends are never kept on the device.

### Sent off the device without an account

| Recipient | What | Why | Where | Kept |
| --- | --- | --- | --- | --- |
| GitHub Pages | IP address, browser, the pages and files asked for | Hosting the site | United States | GitHub's logs, its own policy |
| Supabase, `add_feedback` | Point id, part, reason, the note (free text, up to 300 characters), course id, app version, time | Could we improve this? | Supabase project | 12 months |

Nothing else is sent while signed out. The Supabase library only loads for feedback, the sign-in sheet or a device
already signed in. MathLive, the pictures and the typefaces (`fonts/`, since 24 November 2026; Google Fonts before)
come from this site. `tests/site.mjs` fails if any page names Google's font servers or loads a font from another site.

### With an account (Supabase)

| Data | Table | Why | Who sees it | Kept | Student can see or delete |
| --- | --- | --- | --- | --- | --- |
| Email, account id, sign-in times | `auth.users` (Supabase) | Signing in | Owner | Until Delete account | Account sheet shows the email. Delete account |
| IP address, browser, sign-in events | Supabase Auth sessions and logs | Security, run by Supabase | Owner, Supabase | Supabase's settings (not checked) | No |
| Email address and the 6-digit code | Resend, via Supabase's SMTP | Sending sign-in emails | Resend | Resend's logs (not checked) | No |
| Call sign | `profiles.call_sign` | Shown to friends | Friends, owner | Until changed or Delete account | You, Edit |
| Username, when changed, three switches, whether the switches notice is waiting | `profiles.username`, `username_at`, `findable`, `show_online`, `show_week`, `switch_notice` | Search and friends | Friends see the username; search shows it to anyone signed in only if `findable` is on. All three switches start off for accounts made after `supabase/switches.sql` | Until Delete account | Account sheet |
| Progress | `progress.data` (answers with times, records, streak, chapters, rocket) | Sync | Owner only | Until Delete account | Shown in the app. Delete account |
| Friend code | `friend_codes` | Adding friends | The student | Until Make a new code or Delete account | Account sheet |
| Friend requests, with the code or username typed | `friend_requests` | Requests | Both students | Until answered or cancelled. No expiry | Cancel, Delete account |
| Friendships, blocks | `friendships`, `blocks` | Friends list | Both students (a block only to the blocker) | Until removed, unblocked, or Delete account | Remove, Unblock |
| Search and limit logs | `friend_log`, `friend_seen` | Rate limits | Nobody through the app | A day, and 15 minutes | No |
| Message requests, read marks | `chats` | Messaging | Both students | Until the friendship ends | Remove, Block |
| Messages | `messages` | Messaging | Both students, owner | 90 days, or at once on remove, block or Delete account | In the chat. Remove or block deletes the chat for both |
| Message limit log, refused message reasons (never the text) | `message_log` | Limits, moderation | Owner (`moderation.refusals`) | 1 day, refusals 7 days | No |
| Reports: reason, reporter, reported, a copy of up to 21 messages from both | `moderation.reports` | Moderation | Owner | 12 months. Ids cleared on Delete account, the copy stays | No |
| Warnings, bans, the owner's actions | `moderation.notices`, `bans`, `actions` | Moderation | Owner; the student sees their own warning or ban | Actions 12 months, seen notices 12 months, unseen notices and bans until lifted or Delete account | No |
| Report emails | `moderation.alerts`, Resend | Telling the owner a report came in | Owner. The email holds only the reason and a count | With the report, or 12 months | n/a |
| Challenges: chapter, seed, scores, times | `challenges`, `challenge_log` | Challenges | Both students | 90 days, at once on remove or block | Shown on the friend's sheet |
| Online mark | `online` | The green dot | Friends, only if `show_online` is on | 60 seconds | Switch on the Account sheet |
| Typing, stop, new | Supabase Realtime | The typing bubble | The friend in the chat | Not stored | n/a |
| Each right answer: question and time | `week_answers` | Weekly table | Friends see only the total, only if `show_week` is on | 15 days | Switch on the Account sheet |
| Feedback, with account id for the limit | `feedback` | Fixing content | Owner (`moderation.feedback_by_point`, without the id) | 12 months. Id cleared on Delete account | No |
| Feedback once imported into the content pipeline | `content/work/<course>/points/*.json` (committed, public) and `content/local/feedback.json` (the owner's computer, git-ignored) | Fixing content | The public repository holds only each piece's database number and reason. The note, part, day, course and app version stay on the owner's computer | Until the owner deletes the local file | No |

Every account: `supabase/inactive.sql` deletes an account nobody has signed in to or used for 2 years, with all of the
above, daily through Supabase Cron (`stratos-inactive`). "Used" counts a sign-in, the app refreshing its sign-in (about
hourly while open), and progress saved, so a student who stays signed in is never deleted. Reports and feedback stay
until 12 months old with the account id cleared, as with Delete account. There is no warning email first.

Region: `supabase/README.md` step 1 asks for Sydney (`ap-southeast-2`). The draft policy says the database is in Sydney.
Confirm this in the dashboard before merging.

## Compared with the draft Children's Online Privacy Code

Severity: high means the Code clearly expects something Stratos does not do; medium means Stratos partly does it;
low means a small change or a rule to keep.

| # | Gap | Code (secondhand) | Severity | What fixing it involves |
| --- | --- | --- | --- | --- |
| 1 | No age is asked, so there is no parental consent for under-15s. Years 7 to 9 are mostly 12 to 15. | Consent from a parent or guardian for under-15s, with reasonable steps to check they are one; the child's assent too for anything not strictly necessary; consent renewed every 12 months | High | Decide what needs consent. Signing in to sync progress is arguably strictly necessary; friends, messages and the weekly table are not. Ask the year level or birth year at sign-up (one more field). For under-15s, keep the social features off until a parent agrees: the student gives a parent's email, the parent gets a link (Resend, sharing the 100-a-day limit with sign-in codes), and a `consents` table records who agreed and when. A database function would then refuse friends and messages without it. Several pull requests, and tests for each |
| 2 | "Let people find me by username", "Show when I'm online" and "Show me on friends' weekly table" all defaulted to on | s 9: settings default to high privacy for anything not strictly necessary | Fixed 24 November 2026 | New accounts start with all three off (`supabase/switches.sql`, and the defaults in `friends.sql`, `live.sql` and `week.sql`). Existing accounts kept their settings, as the owner decided, and see a notice once explaining each switch, with a button to the Account sheet. The Account sheet and the friend code sheet say what each switch does. Search finds fewer students, so codes matter more |
| 3 | No privacy policy or collection notices existed | A child-specific privacy policy (s 23) and notices in language a child can follow | Medium, partly fixed here | This pull request adds the policy page and a line at sign-up. Still to do: a one-line notice where each thing is collected (picking a username, the first message request, the weekly table, the feedback note) |
| 4 | The policy names "Stratos" and support@stratosstudy.com, not a legal entity | APP 1.4 and the Code expect the entity's identity and contact details | Low, decided | The owner decided on "Stratos" with the support email and no personal name. If a business name or company (with ABN) is registered, add it under Questions or problems |
| 5 | Access and correction work only by email, with no written process. Parents have no way in | s 32: destroy a child's information on request from the child or a parent | Medium | Write the steps: how to check the request comes from the account's email or a parent, a 30-day reply, and running `delete_account` for that user from the SQL Editor. Later, a "Download my information" button calling a function that returns the student's rows as JSON |
| 6 | The owner can read every message in the dashboard. The policy promises to read them only on a report, to fix a problem, or to keep someone safe | Best interests of the child; use only for the purpose collected | Medium | A short written rule for yourself, and keep it. Optionally move message reading behind `moderation` functions that log each look in `moderation.actions` |
| 7 | Feedback notes are free text and unfiltered. `pipeline.py feedback import` used to copy them into `content/work/<course>/` files, which are committed to this public repository | Collect only what is needed; security | Partly fixed 24 November 2026 | Import now keeps only each piece's database number and reason in `content/work`, and the note and the rest in `content/local/feedback.json`, which `.gitignore` keeps out of git and the review page reads. `content/test_pipeline.py` fails if a note reaches any file git would commit, and checks every point file in `content/work`. No feedback had been imported before, so nothing leaked. Still open: running `message_problem` on notes so emails and phone numbers are refused, and the CSV the owner downloads, which stays in Downloads until deleted |
| 8 | Overseas: GitHub Pages gets every visitor's IP address in the United States, signed in or not, and Resend gets every sign-in email. Google Fonts did too, until 24 November 2026 | APP 8 (cross-border disclosure); collect only what is needed | Low, partly fixed | The typefaces are in `fonts/` now (Fontsource copies, SIL Open Font License), so Google drops out completely, for v2, the Maths Lab and the first prototype. GitHub Pages and Resend are needed to run; the policy names them |
| 9 | Friend requests never expire, and unseen warnings and bans stay. Inactive accounts had no limit until 24 November 2026 | Retention no longer than needed | Low, partly fixed | `supabase/inactive.sql` deletes accounts unused for 2 years, with their data, daily by Cron, and the policy says so. Still open: a warning email before deleting (it would share Resend's 100 a day), and friend requests deleted after 30 days, like message requests |
| 10 | No privacy impact assessment or yearly review | The draft asks for assessments, published, and a review at least once a year | Low | Treat this file as the first one. Date it and review it each year and before each new social feature (races) |
| 11 | Reset leaves unsent feedback (`stratos2.fb`) and the Maths Lab's results on the device | Deletion | Low | Remove `stratos2.fb` in `eraseDevice`; a Reset button in the lab. The draft policy only claims Reset erases progress and settings |
| 12 | Direct marketing | The draft narrows direct marketing to children sharply, and limits nudge techniques | Low (none today) | Stratos sends no marketing. Keep it that way when buying turns on: no emails or notifications about the store, no countdowns or limited-time offers, and streak rewards that never point at the store |
| 13 | Data breach plan | Notifiable data breaches apply to APP entities | Low | One page: who to tell, how to rotate the publishable key, how to email affected students |

Things the Code asks for that Stratos already does well: no location (the country is guessed on the device and stays
there), no profiling or recommendations, no ads, no third-party trackers or analytics, no data sold, messages filtered
before they are saved, no contact from strangers (friends only, after a request), Delete account that cascades through
every table, short retention for messages, answers and online status, and age-appropriate care lines in messages.

## The social media minimum age

From 10 December 2025, an "age-restricted social media platform" must take reasonable steps to stop under-16s having
accounts. Under s 63C(1) of the Online Safety Act, a service is one if its sole or a significant purpose is to enable
online social interaction between end-users, it lets them link to or interact with each other, and it lets them post
material. The Rules then exclude services whose sole or primary purpose is, among others, supporting the education of
end-users (s 5(1)(e) on the summaries read), and messaging and online gaming services.

Stratos's position: study is the predominant use. Messages are friends-only, need a request, are filtered, and the
friends features (challenges, races, the weekly table) are study activities scored on syllabus questions. It fits the
education exclusion, and arguably does not meet the "significant purpose" test at all.

eSafety's guidance says "primary" means the predominant or most important purpose, that education services with
messaging are not meant to be caught, and that a service can become caught if social features become its "noticeable
common use". Services should assess again when they add features.

Risks to watch:

- `CLAUDE.md`, which is public, used to open with "Stratos is school as a social app" and compare it with Instagram.
  Since 24 November 2026 it describes Stratos as a study app first, with friends, challenges and the weekly table as
  support for studying, and no comparison with a social media service. Keep new writing about Stratos the same way.
- Races with real friends (step 5's last piece) and any free-text feature add social weight. Assess again before each.
- The March 2026 amendment reportedly adds a condition about a "recommender feature" or "logged-in feature". The
  definitions could not be read from here. Stratos has no recommender feed, but check the text.
- Keep a dated note of this assessment. eSafety expects services to be able to show their reasoning.

## Decisions for the owner

Decided on 24 November 2026:

- The three sharing switches start off for new accounts. Existing accounts keep their settings and see a one-time
  notice that explains each switch and opens the Account sheet (gap 2).
- The operator is named as "Stratos", with support@stratosstudy.com, and no personal name (gap 4). The policy already
  says this. A business name or ABN can be added later if one is registered.
- The typefaces are hosted in this repository, and nothing loads from Google (gap 8).
- Feedback notes stay in a git-ignored local file the review page reads. Committed files keep only the point id, the
  piece's number and its reason, and a test fails if a note reaches a committed file (gap 7).
- Accounts with no sign-in or use for 2 years are deleted with their data, by Cron, and the policy says so (gap 9).
- `CLAUDE.md` opens with Stratos as a study app first, with no comparison with Instagram.

Still open:

1. Under-15s: require a parent's consent for the social features, for any account, or not yet. This shapes the next
   several pull requests.
2. Confirm the Supabase region is Sydney, since the draft says so.
3. Whether the promises in the draft are ones you will keep: reading messages only on a report, to fix a problem or to
   keep someone safe; telling the police or an emergency service if someone may be in danger; telling students in the
   app before keeping anything new.
4. A warning email before an unused account is deleted, and an expiry for friend requests.
5. Filtering feedback notes for emails and phone numbers, as messages are.
