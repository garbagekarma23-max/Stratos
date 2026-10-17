# Stratos

## Mission

Stratos is school as a social app. Students open it the way they open Instagram, but the feed is their syllabus: short cards that teach a point, then questions that prove they know it. The app tracks what each student has learned, what is weak and what is proven, and always serves the weak points first, so time spent in it is time spent on what they don't know yet. It should feel clinical and trustworthy on the surface, like a tool, with a game underneath: combos, altitude, sound and a rocket that make getting answers right feel good. Friends make it competitive through challenges, races and a weekly table, using cards and preset replies with no free typing. Money comes from cosmetics at fixed prices, such as rockets, backgrounds, exhausts and sounds. Nothing is sold by chance and user data is never sold. The long-term aim is every syllabus, broken into chapters, with study that structures itself around each student. The first tester said the first build felt like a game to use after studying, so every change should make Stratos more of a place to learn, without losing what makes it fun.

A study app prototype for Australian senior students. GitHub Pages serves this repository from the main branch.

- `index.html` is the first prototype, a single question feed. Leave it alone unless asked.
- `v2.html` is the second prototype. It is built from `src/` (and the shared maths files in `lab/`). Never edit it by hand. It has three subjects: NSW Economics and Maths, each with Learn, Practice, challenges and races, and the Edexcel International A Level Economics course (the AS year, Units 1 and 2), with Learn and Practice.
- `maths-lab.html` is the Maths Lab, a separate page for writing maths working on a phone. Its code is in `lab/`. See the Maths Lab section below.
- Live at https://garbagekarma23-max.github.io/Stratos/, https://garbagekarma23-max.github.io/Stratos/v2.html and https://garbagekarma23-max.github.io/Stratos/maths-lab.html

The owner is new to programming and reads this code to learn. Explain what you changed in plain words, and keep code comments in plain English.

## Build and test

- Build: `python3 build.py` writes `v2.html`. Run it after every change in `src/` and commit `v2.html` with the source, because the site serves that file.
- Content check: `node check_content.mjs`. It bans the word key but lets Keynes through.
- Tests: `cd tests && npm install && npm test`. They open `v2.html` and `maths-lab.html` in Chromium with Playwright, through the small web server in `tests/serve.mjs` (MathLive's fonts do not load from a file path), so build first. Use the Chromium already on the machine. Do not download a browser.
- `tests/maths-practice.mjs` runs a maths Practice flight with keypad taps only: the start screen, the order of questions, the combo on lines, altitude on answers, Practice answers counting toward proven, the Done moment with and without reduced motion, the clock and best time, ending early, and Fly again starting a clean flight.
- `tests/altitude.mjs` checks that altitude is written out in full everywhere ("2 billion km", "4.1 billion light-years", never "2 B km" or "ly", and "light-years" never split over two lines) and that the flight screen's altitude line fits at 360 and 390 px. `node altitude.mjs shots` also saves the flight screen high up: `altitude-360.png`, `altitude-390.png`, with a maths clock (`-clock`), and at 280 px (`altitude-280-clock.png`).
- A script error in any test prints only its message. `STACK=1 node <test>.mjs` also prints where in `v2.html` it happened. `open()` in `tests/lib.mjs` takes `route` to hold back or change a file the page loads (the tests use it to delay MathLive), and `waitUntil` for when the page counts as open.
- `tests/preview.mjs` checks each page's title, description, icons and link preview tags, and the sizes of the pictures, with no browser. It also checks the web app manifests and the Home Screen tags.
- `tests/fullscreen.mjs` opens both pages as Home Screen apps on four phones (an iPhone with its home indicator, the same with the page under the status bar, an Android phone and an iPhone SE). Chromium is told each phone's safe areas. It checks nothing scrolls, nothing sits under the status bar, every key and button is above the home indicator, the tab bar and keypad reach the bottom edge in their own colour (also on Sky), and the status bar colour follows Light or Dark picked in You. Screenshots: `fs-v2-<phone>-<screen>.png` and `fs-lab-<phone>-<scheme>.png`.
- `tests/intro.mjs` checks the intro: it plays on opening; a tap, click or key skips it without pressing what is underneath; reduced motion keeps it still; it never blocks the app for more than 2 seconds (even with animation frames stopped or a script error); switching tabs never plays it; and it makes no sound (it counts every sound context and tone the page makes). Every other test skips the intro: `open()` in `tests/lib.mjs` sets `window.stratosIntro = false` unless a test passes `intro: true`. `node intro.mjs shots` saves `intro-light.png` and `intro-dark.png`, five moments side by side (0.1, 0.4, 0.7, 1.0 and 1.3 s).
- `tests/maths-content.mjs` checks the maths content with the lab's line checker, no browser: every worked example line ticks, every template run 200 times makes right, clean answers, and the same challenge seed always makes the same five questions.
- `tests/maths-games.mjs` runs maths challenges and races with keypad taps only: the subject switch on the friend sheet, a challenge sent and finished, the seed giving the same questions on the page as outside it, a rematch staying in maths, a race won and a race lost, and the sample friends' maths pace. `tests/maths.mjs` runs maths in v2: the subject switch, the status rules, and Learn on both chapters with keypad taps only.
- `tests/edexcel.mjs` runs the Edexcel course: the subject sheet row and the Pearson line, switching to it and back, the two units and 12 chapters with their points in order, no Draft label anywhere now that every chapter is checked (and, with one chapter marked draft again, the label on the hero, its chapter row, the point sheet, each Learn card and Home's note), Search (Unit 1 and Unit 2 points, never NSW ones), the chapter sheets in Learn and Practice with each unit's name above its chapters, Learn through Chapter 1 and the offer of Chapter 2 at its end, Learn from the end of Unit 1 into Unit 2, a Practice flight, Home moving on to Chapter 2 once Chapter 1 is proven, its progress and records kept apart from NSW and Maths, and the friend sheet staying on the other subjects. Every chapter has points now, so it checks Coming soon by opening the page with one chapter emptied. `node edexcel.mjs shots` saves `edexcel-home-light.png`, `edexcel-chapters-light.png`, `edexcel-card-light.png`, `edexcel-picker-light.png` (the Learn chapter sheet) and `edexcel-unit2-card-light.png` (and dark) at 390 by 844.
- `tests/merge.mjs` checks how two copies of the progress are put together (`src/84-merge.js`), with no browser: what goes to the account and what stays, each merge rule, and that the order of the two copies makes no difference.
- `tests/rls.mjs` checks the rules in `supabase/schema.sql` with no browser. It loads the file into PGlite (Postgres running inside Node) with `tests/supabase-standin.sql`, a stand-in for Supabase's sign-in tables, then runs requests as one student, as another and as someone not signed in: row-level security on every table, reading, adding and changing only your own rows, no deleting rows, the call sign and size limits, and `delete_account()` taking no arguments and deleting only the caller.
- `tests/account.mjs` runs accounts in v2 against a fake Supabase (`tests/fake-supabase.mjs`): PGlite with `schema.sql` loaded, so its rules are the real ones, and a pretend sign-in that keeps the codes it would have emailed. It checks: no account row with no project filled in; nothing asked of Supabase while signed out; signing in with a code (and a wrong one first); the call sign; an answer reaching the account; the email link; a second empty device; a device with its own progress (Add, and Use the account's only); two devices saving at once; offline and back; signing out with unsaved progress; Reset while signed in; an account deleted elsewhere; Delete account calling `delete_account` with nothing in it and deleting only that account, while a try to read or delete another account is refused; and the code sheet at 360 px. `open()` in `tests/lib.mjs` blocks every real `supabase.co` address, and takes `supabase` to point the page at the fake. `node account.mjs shots` saves `account-email-light`, `account-callsign-light`, `account-choice-light`, `account-sheet-light`, `account-sheet-offline-light`, and `account-code-light` and `-dark` (at 360 px).
- `tests/places.mjs` runs the subject sheet's steps: the country guessed from the phone's language and time zone (an Australian phone, US English in Sydney or Melbourne, en-GB in London gives United Kingdom, fr-FR with UTC gives France, and more), nothing picked when the settings name no country, the guess not saved until confirmed, every country named by the browser, the list's order, search (capitals and accents ignored, No country matches.), the state step, Change, the place kept after a reload, the international courses in every place with the right "coming" line, switching courses with each one's progress kept, Open now, a saved place this build does not know, and 360 px in light and dark. It checks nothing is sent and the location feature is never asked for. `open()` in `tests/lib.mjs` makes every test an Australian phone (`en-AU`, `Australia/Sydney`) unless it passes `locale` and `tz`, and `course(p, id)` switches course through the sheet, taking the guess if the country step shows. `node places.mjs shots` saves `place-country`, `place-search`, `place-state`, `place-courses-nsw`, `place-country-france` and `place-courses-france`, light and dark, at 390 by 844.
- Screenshots: `cd tests && node shots.mjs` writes PNGs to `tests/shots/` (light, dark, Sky, small phone, desktop). `node shots.mjs light` takes the light-mode flight set. Look at them after any visual change.
- Maths screenshots in v2: `cd tests && node maths-shots.mjs` writes Home, a worked example, a guided question and the point sheet, light and dark, plus `maths-compare-light-1.png` (and `-2`, and dark), which put each next to the same Economics screen, and `maths-practice-light.png` (and dark): a maths flight and its result next to Economics. It also writes `maths-race-light.png` (a maths race part way through), `maths-challenge-light.png` (a thread with maths challenge cards), both in dark too, and `maths-games-light.png` (and dark), which puts them next to an Economics race.
- Maths Lab screenshots: `cd tests && node lab-shots.mjs` writes the lab at iPhone size, light and dark, plus `compare-light.png` and `compare-dark.png`, which put it next to v2's Home and a practice question.
- Icons and link previews: `icons/` holds `favicon.svg` (written by hand, the app's classic rocket, with dark-browser colours), and the pictures `cd tests && node make-icons.mjs` makes from the Stratos look: `favicon-32.png`, `apple-touch-icon.png` (180 px), the same rocket at 192 and 512 px for Android (`icon-192.png`, `icon-512.png`), and the 1200 by 630 link previews `preview-v2.png` and `preview-lab.png`. The tags that use them are in `src/head.html` (for v2.html) and at the top of `maths-lab.html`. Apps such as Messages fetch the preview picture from the live site, so its tag uses the full web address, and a new picture only shows once the pull request is merged. Apps also keep old previews for a while.
- The site only updates when the pull request is merged into main.

## Accounts and sync

- Signing in is optional. Without an account, everything works as before and nothing contacts Supabase: the account code only loads the Supabase library for a student who opens the sign-in sheet or is signed in already. While `SUPA` at the top of `src/85-account.js` is empty, accounts are switched off and You shows no account row.
- Backend: Supabase. `supabase/README.md` is the setup in the dashboard, `supabase/schema.sql` the tables and rules (pasted into the SQL Editor), and `supabase/emails.md` the sign-in email. Only the Project URL and the publishable key (`sb_publishable_`) go in the code. They are public by design. The secret key never goes in this repository.
- Sign-in: email first. The student types an email, gets a 6-digit code and types it in (`verifyOtp`). The email also has a link, which signs in the browser it opens in (the implicit flow, so any browser). The code is the main way in, because a Home Screen app on an iPhone has its own storage apart from Safari, where links open, and school email systems often open links before the student does. Google comes in its own pull request.
- The library is a pinned copy of supabase-js in `vendor/supabase/`, like MathLive in `lab/mathlive/`. To move to a new version: change it in `vendor/package.json`, then `cd vendor && npm install && npm run copy`, then run the tests.
- Data. `profiles`: the account's random id and the call sign (1 to 16 characters, or none). `progress`: the id, `data` (the synced part of the save), `rev` and `updated_at`. No email, real name, birthday or location in either. Supabase's own sign-in records keep the email, sign-in times and, for a while, IP addresses. The app never reads them.
- What goes to the account (`syncPart` in `src/84-merge.js`): answers, records, the chapter open in each subject, the subject, the streak, today's and this week's counts, the rocket and exhaust. The call sign goes to `profiles`. These stay on the device: appearance, Sky, sound, race music, the place picked on the subject sheet, and the sample friends' messages.
- The rules, in `schema.sql`: row-level security on both tables. Someone not signed in gets nothing. A signed-in student can read, add and change only rows with their own id, and only the columns named; nobody can delete a row. Data is capped at 200 KB written out as text (the stored size is after compression, and junk compresses very small). `delete_account()` takes no arguments and deletes `auth.uid()`, the caller, and nobody else; the rows go with the account.
- Sync (`src/85-account.js`): the device's save is always the one the app reads. A change is sent 2 seconds later (`syncSoon`, called from `save()`), and when the app is put away or the connection comes back. The account's copy is fetched when the app opens and when it comes back on screen. Each save checks `rev`: if another device saved first, nothing is written, and the device fetches that copy, merges and tries again. With no connection, changes wait. `stratos2.sync` keeps the account id, email, `rev`, the account copy as last seen (`canon` text, to tell whether anything is unsaved) and the call sign as last in step. The library keeps its sign-in under `stratos2.auth`.
- Merging (`merge` in `src/84-merge.js`): Economics, the latest answer to each question wins; maths, both lists of answers together in time order, each once, the last six kept; records, the higher altitude and combo and the faster best time; the streak from the later study day; today's and the week's counts, the higher on the same day or week; the subject, chapters and rocket from the device answered most recently. A sync just after opening, on Home, may move the device to the account's subject and chapter; later syncs keep the student where they are.
- First sign-in on a device: an empty account takes the device's progress; an empty device takes the account's; if both have progress, the student picks Add this device's progress, or Use the account's only (for a shared device). The account's call sign wins, or the device's goes up; with neither, the call sign sheet opens.
- You: "Save progress to an account" above Friends, then Account with Saved, Saving or Waiting for a connection. The Account sheet has the email, when it last saved, Sign out and Delete account (two taps). Sign out erases this device's copy (for shared computers) and asks first if something has not reached the account. Reset while signed in signs out too. An account deleted on another device signs this one out and leaves its progress.
- Progress is written by the client, so a student could fake their own records, answers or streak. That is fine while progress is private: it only fools themselves. Step 5 (friends) must count anything friends can see, such as the weekly table, on the server, never trust a number the app sends, and must never let friends read `progress`. Give each shared thing its own table with its own "friends can read this" rule.
- Ready for friends, not built: friends will be added by a code shared in person, not by searching call signs, so call signs need not be unique.

## The intro

- Each time v2 is opened, the word "Stratos" (the logo typeface, 44 px) shows on the plain background, light or dark, and the student's rocket flies round it. The code is `src/80-intro.js`, the markup `#intro` is at the end of `src/body.html`, and `start()` in `90-boot.js` plays it. Switching tabs never plays it, and nor does a new version of the page carrying on from the old one.
- The path: a ring centred on the word, 28 px past each end, its height 20% of its width, tilted 12 degrees so the right side rises. The rocket starts at the bottom, in front, and goes 1.25 laps right side first in 1.1 s, speeding up. In front it is up to 16% larger; behind, up to 8% smaller and up to 35% faded. Then it keeps the same speed round while the ring widens, so it spirals out. The widening is worked out for the screen size, so it leaves by about 1.4 s on any screen, and is not drawn again. The nose points along the path. A thin blue trail follows it for 0.3 s. At 1.5 s the intro fades into Home over 0.15 s.
- Two canvases, one behind the word and one in front, so the rocket and the trail can pass behind the word. The ring is measured from the word on every frame, so it fits even if the typeface arrives late.
- A tap, click or key skips it: a quick fade into Home. The skip happens as the finger lands (pointerdown), and the click from that same tap is eaten, so it never presses a button on Home. The guard stops at the next new tap, or after a second. With reduced motion the rocket is parked in front of the word, still, for 1 s, then it fades.
- Safety: a timer removes it 1.8 s after it starts, and a CSS animation on `#intro` fades it and stops it catching taps by 1.8 s even if the script never runs.
- The intro makes no sound. It had three dings, but browsers hold sound back until a page is first tapped, so they did not play reliably, and they were removed. The notes are parked below.

## Full screen from the Home Screen

- Added to the Home Screen (Share, then Add to Home Screen on an iPhone; Install app or Add to Home screen in Chrome on Android), each page opens as its own app, full screen, with no browser bars.
- Android reads a web app manifest: `manifest-v2.webmanifest` and `manifest-lab.webmanifest`, next to the pages. Each has `display: standalone`, its own `id`, and a `scope` of its own page, so v2 and the lab install as two apps. The icons are the rocket at 192 and 512 px. Android needs both sizes to install a page as an app.
- iPhones read the tags in `src/head.html` and at the top of `maths-lab.html`: `apple-mobile-web-app-capable`, the name under the icon (`apple-mobile-web-app-title`: Stratos, Maths Lab), and `apple-mobile-web-app-status-bar-style` set to `default`, which gives the status bar its own space above the page in the theme-color.
- The status bar colour is the `theme-color`: white in light mode and the dark paper colour (#15161a) in dark mode. In v2, Light or Dark picked in You sets both tags to that colour (`applyTheme` in `90-boot.js`), so the bar matches the app whatever the phone is set to.
- Safe areas: the page is padded for any top safe area (in `build.py` for v2, `:root` in `lab/lab.css` for the lab). v2's bottom pieces reach under the home indicator in their own colour and pad their buttons up out of its way: the tab bar, the keypad, the sheet, the message bar and the end of a page (`--sab` in `src/style.css`, 0 on a computer). The lab pads the bottom of the page instead, and its stage is the screen's height less both safe areas.

## Maths Lab

A first prototype of doing maths working on a phone. One question at a time: the question at the top, the student's working on a sheet under it, one line per row, and our own keypad at the bottom where the phone keyboard would be. It tests one thing: is writing working with this keypad quick and satisfying enough to use instead of paper? So there is no rocket, combo or altitude here. The good feeling comes from the keys, the sounds and the ticks.

It has no build step. `maths-lab.html` is the page itself and loads these files in order:

| File | What it holds |
| --- | --- |
| `lab/mathlive/` | MathLive, which draws and types the maths. A pinned copy from npm, so the page needs no other website. |
| `lab/topics.js` | The topics as data: the questions in order, their answers, the line Skip shows, and the topic row of keys. A new topic needs no new code. |
| `lab/maths.js` | Reads a line, checks working lines and final answers, and runs the calculator display. No screen code, so it is tested on its own. |
| `lab/sound.js` | The key click, the ping and the finishing notes. The chain and levels are copied from `src/20-sound.js`. |
| `lab/keypad.js` | The keys, presses, holds and the drag strip. Shared with v2. |
| `lab/sheet.js` | The working sheet: the lines, Enter, Undo, Delete, the square box, the display, and computer keys caught on the window. The page around it passes in what Done does and what is saved. Shared with v2. |
| `lab/keys.css` | The look of the sheet and the keypad, all under `.work` and `.keypad`. Shared with v2. |
| `lab/app.js` | The lab around the sheet: the ten questions, Done, Skip, the clock, the results and saving. |
| `lab/lab.css` | The rest of the lab's look. Its colour block is copied from `src/style.css` and a test keeps them the same. |

`build.py` copies `lab/topics.js`, `lab/maths.js`, `lab/keypad.js`, `lab/sheet.js` and `lab/keys.css` into `v2.html`, so a change to them changes both pages. Run the lab tests and the v2 tests after one.

To move to a new MathLive version: change the version in `lab/package.json`, then `cd lab && npm install && npm run copy`, then run the tests.

Rules to keep:
- Working is typed, one line at a time. The phone's own keyboard must never appear. MathLive's hidden input is marked `inputmode="none"`, our keys never take focus, and a test checks focus after every tap.
- Lines are checked by numbers, against the question, never against the line above. A line is right if it has exactly the same solutions as the question: each answer is put into the line, then x from minus a million to a million is searched for any other solution, most finely near 0, and spread-out values check it is not true for every x. A wrong line gets a quiet mark in the weak-point colour and one plain sentence. A line with no = sign gets a hint, not a mark. A line with an empty box left in it says so, because some boxes (an empty power after a number) are small enough to miss.
- The calculator display does what an HSC calculator does and no more. It works out the plain arithmetic after the last = sign and shows nothing for anything with x, ± or "or" in it. It never solves, expands or simplifies algebra. Tapping it swaps the arithmetic for its value.
- The keys follow the Casio fx-82AU: the number block at the bottom with the operators to its right, the shape keys (fraction, root, square, power, brackets) in the row above in the Casio's order, and the topic row on top. The Casio's AC is Undo, its ×10ˣ is =, and its Ans and = are one wide Enter.
- Enter checks the line and opens a new one. Enter on an empty line does nothing. Holding Enter checks the line and starts the next as a copy. Holding Delete clears the line, and one Undo brings it back. Delete or Backspace on an empty line removes it and goes to the end of the line above, as in a notes app. The first line always stays.
- = and "or" step out of any power, fraction, root or brackets before they go in. Square or power on an empty spot drops a box that takes the next number (or x); the next other key goes after the square. MathLive would otherwise carry the ² along to whatever is typed next.
- On a computer keyboard, + then − makes ± and o then r makes "or" at any typing speed. The lab does these itself rather than leaving them to MathLive's shortcuts, which missed keys typed while focus was moving to a new line.
- Computer keys are caught once, on the whole window, before MathLive sees them. Browsers differ in when a listener on a line itself runs (Safari can run it after MathLive), so the window is the one place that comes first everywhere. Enter and Backspace are always done by the lab, never by MathLive.
- Done checks the final answer and sits at the opposite corner from Enter. It accepts x on its own in any exact form, or a decimal to at least 2 places, worked out to one number. Questions with two answers need both.
- The topic row belongs to the topic: x, ± and "or" for equations. A later topic swaps in its own keys through `lab/topics.js`, not new code.
- The look is v2's: the same colour values and names, Hanken Grotesk for words, MathLive's maths font for maths, flat keys with one corner size and no shadows. Enter has the darker fill of v2's main button. Only Done uses the blue.
- Results (time per question, lines, wrong lines, deletes, undos, skips) are saved on the device only, under `stratos-lab.v1`. Copy results puts them on the clipboard as text. Nothing is sent anywhere.

Later ideas, parked: a scratch area for drawing (a diagram, a number line, rough working).

### Where maths is going

- `maths-lab.html` stays as the alpha test page. Leave it working.
- Build order, one pull request each: (1) the maths subject with Learn (done), (2) maths Practice with the game (done), (3) races and challenges with maths (done).
- Practice for maths: the keypad with the game on top. Weak points first. The combo builds with each right line and resets on a wrong one. The rocket climbs on each right answer. Done gets one clear moment.
- Proven for maths: three right answers in a row on a point, each with different numbers. No day limits anywhere. A wrong answer makes the point weak and resets its run.
- Proving a chapter runs in one sitting: questions from the chapter's unproven points, mixed, until every point is proven or the student leaves.
- Spacing happens in Practice, never as a lock: Practice keeps bringing back the points right longest ago. Nothing in the app ever tells a student to come back later.

### Maths in v2

- Maths is a second subject next to Economics, picked from the subject sheet on Home ("Maths, Year 11", "HSC, Equations", under New South Wales). It uses the same chapters, points, statuses, two-tone bar and weak-points-first rule.
- Subjects: `10-core.js` indexes every course in `COURSE_LIST` (`src/places.js`). `PT` holds every point of both. `SUB` is the subject picked, and `CH` and `ALL` are its chapters and points; `setSubject` changes them. `useSubject` in `40-home.js` switches Home, Learn and Search, and remembers the pick in `saved.subject`.
- Content: `src/maths-content.js`. Each point has an intro, a remember line and forms. A form is a template: the numbers it picks, sums worked out from them, rules they must pass, the question, the answers, and the worked steps with a note on each. Anything in [square brackets] is worked out from the numbers. `src/15-maths-make.js` turns a form into a question. The worked example is the first form with its `ex` numbers. Answers are whole numbers, except x on both sides, where one form gives halves or thirds.
- Learn for a new or weak point: the worked example card, then a guided question (new numbers, the first `give` steps written in and locked), then a check question with nothing filled in. A learned or proven point goes straight to a check question. Only the check question counts. `src/55-maths.js` builds these slides.
- On a check question, the first real answer at Done counts. A line that is not an answer yet (x not on its own, a sum not worked out) gets a hint and does not count. Answer before Done counts as wrong. The guided question never counts.
- Proven for maths: three right answers in a row on a point, each with different numbers. There is no day rule. A wrong answer makes it weak and resets its run. Each point keeps its last six answers in `saved.m.h[pid]` as `{ok, day, q, t}`, where q is the question, which tells the numbers apart. `mathsStatus` in `10-core.js` applies the rule, and the point sheet explains it.
- Chapter rows on Home show learning, then proving, as words, in both subjects: "Not started", "3 of 5 learned", "Learned, 2 of 5 proven", then "Proven" (`chStage` in `10-core.js`). There is no percentage on the rows. The bar at the top of Home has the same words: points learned (pale) and points proven (blue).
- Prove this chapter (`openLearn(ch, {prove: true})`, mode `prove`): one check question at a time from the chapter's unproven points. `provePush` in `55-maths.js` picks the point asked longest ago in the sitting, never the same one twice in a row while another is left, so a point answered wrong comes back after the others. When the last point is proven, the end slide says Chapter proven and offers the next chapter.
- The segments at the top of Learn are one per question in the session, in both subjects. Each fills when its question is finished: blue if right first time, the weak-point colour if not. The one on screen is a darker thin bar.
- Saved: Economics answers stay in `saved.ans` and `saved.cur`, exactly as before. Maths is under `saved.m`. Maths ids start with `m` (`m1p1`), so they never clash.
- Work mode: when a maths question fills the Learn screen, `#app` gets `data-work`. The tab bar hides, the keypad (`#mPad`) sits at the bottom, the cards stop scrolling, and the A to D keys do nothing. The × in the Learn bar goes Home and keeps the question.
- MathLive loads from `lab/mathlive/` the first time maths is opened (`loadMaths`), never for Economics.
- A right line rings v2's ping one step higher each time (`sound.correct`). The key click and the strip tick are in `20-sound.js`, copied from `lab/sound.js` at the lab's measured level.
- Home's button for maths opens Learn: new points, then weak points in full, then Prove this chapter. Once every point is proven it offers a mixed flight.

### Maths Practice

- The code is `src/62-maths-practice.js`. A maths flight is the Economics flight (`60-practice.js`) with `P.maths` set: `startPractice` hands mix and chapter flights to `startMathsFlight`, and `slideFor` makes a maths slide instead of an Economics one. The one keypad moves into `#run` while a maths question is on screen (`paintWork` in `55-maths.js`).
- Which points: only points that are not new. Weak first (last answer wrong), then points never answered in Practice, then the rest, right longest ago first (`mathsPool`). Answers given in Practice are saved with `src: 'p'`, which is how Practice tells them apart.
- Lengths: 8, 16, or All (each point once). With fewer points than questions, the flight goes round the points again in the same order (`mathsPick`). Every question is made fresh from the point's templates, avoiding the worked example, the flight's other questions on the point and its last three.
- A Practice answer counts toward proven exactly as a check question in Learn: the first real answer at Done is saved in `saved.m.h`. Answer and Skip count as wrong. A wrong answer, Answer or Skip brings a question on the same point back at the end, once.
- The combo flame counts lines: each right line adds one, a wrong line or a wrong answer puts it back to zero. Same tiers and flame as Economics.
- Altitude counts answers, the same rule as Economics, so the two subjects stay level in races and the weekly table: each right answer at Done, first try, multiplies altitude by 2 x (right answers in a row) x difficulty. Difficulty is 2 for chapter 1 and 3 for chapter 2 (`MATHS_D`). A fixed answer (right after a wrong one) does not lift the rocket.
- The Done moment (`mpRight`): the keys lock, each right line ticks again in turn (`pad.celebrate`, 110 ms apart) with the ping one step higher each time, the rocket lifts, then the next question comes in. With reduced motion it is one ping and the next question at once. Anything but a first-try answer stays on screen with the worked solution until Next.
- The bar of segments under the altitude has one segment per question, as in Learn. The clock beside the altitude runs only while the flight is on screen.
- Best time: `saved.m.best`, keyed by everything or the chapter id, then the number of questions (`all:8`, `m1:16`), in ms. Only a finished flight with nothing skipped or shown sets one. The start screen and the result show it.
- The result is the Economics result plus a row of time, lines written and wrong lines. Each subject keeps its own records: maths in `saved.m.bestKm` and `saved.m.bestCombo`, Economics in `saved.bestKm` and `saved.bestCombo`. The Practice start screen, the result's New personal best and the You page all use the subject picked (`records()` in `10-core.js`).
- On a narrow phone (under 400 px), Skip and Answer show their icons only. In a flight, toasts sit just above the keypad.

### Maths challenges and races

- The code: `startPractice` in `60-practice.js` sends a maths challenge or race to `startMathsFlight` in `62-maths-practice.js`, the same flight as maths Practice. `game()` is true in either, and means one try per question: a wrong answer ends the question with the worked solution and waits for Next, there is no Skip, and nothing comes back at the end. Answer shows the worked solution and counts as wrong. The combo, altitude and the Done moment are as in Practice. Answers count toward proven, as in Practice.
- Sizes are in `GAME` in `10-core.js`: a maths challenge is 5 questions (Economics 8), a maths race is first to 4 (Economics 6). A maths question takes about three times as long as tapping an option, so these take about as long as Economics' 8 and 6.
- Same questions for both: each maths challenge has a seed, a whole number saved on its message. `MAKE.set(points, seed, 5)` in `15-maths-make.js` makes the questions from the seed alone, with `MAKE.seeded(seed)` in place of `Math.random`: the order of points, the templates and the numbers. Nothing about either player goes in, so the same seed gives the same set on any phone. A chapter 1 challenge asks one question on each of its 5 points. A change to a template changes the questions an old seed makes.
- Who wins a maths challenge: more right answers, then the faster time if the scores are level ("You won on time"). `challengeOutcome` in `70-social.js`. The card and the result show both scores and both times. Times are kept on the message as `meMs` and `themMs`. Economics cards have no times.
- A maths race shows the lanes in place of the segment bar, because it has no fixed number of questions. Questions keep coming from the chapter, made fresh, until someone gets to 4. A right answer scores at Done, so the friend cannot win during the Done moment. If the friend gets there first, the open question is closed and the keypad goes.
- The sample friends' maths pace is `mpace` in `FRIENDS`: seconds per right answer in chapter 1 (Aisha 25, Noah 30, Mia 36, Tom 45), times `MATHS_SLOW` for chapter 2 (1.3), give or take 35%. `paceOf` gives the pace for a chapter in either subject. A friend's pretend challenge time is their pace for each question, give or take a fifth (`pretendTime`). These are first guesses, to tune after a phone test.
- Starting one: exactly where Economics ones start. Send a challenge or Start a race in a thread opens the friend sheet, with an Economics and Maths switch at the top (it starts on the subject picked on Home) and that subject's chapters under it. A card a friend sent has Play. Starting a game in the other subject switches Home to it. There is no game button on the Practice start screen, in either subject.
- Rematch: the friend sends a challenge on the subject and chapter of the last game in the thread, with a new seed for maths. With no game yet in the thread, it uses the chapter Home shows.
- The weekly table counts right answers in every subject together (NSW Economics, Maths and the Edexcel course), and says so. Two tables would split four friends into smaller groups, and the table is about showing up to study. A maths answer takes longer, so a mostly maths week scores lower. If testers notice, a maths answer could count as 2.
- Saved: a maths challenge message has `seed`, `total` 5, and `meMs` and `themMs` once played. An older build's maths challenge with no seed gets one, and 5 questions, when the page loads (`tidySaved`). A message on a chapter this build does not have moves to the first Economics chapter.

Known gaps:
- Tested on a real iPhone: the iPhone keyboard never appeared, holding Enter copied the line with no magnifier or text selection, the clicks and pings played with the silent switch off, and all ten questions could be finished. Sound needs the silent switch off, and iPhones do not vibrate for websites.
- On a computer keyboard, Control and Z uses MathLive's own undo, which takes back a run of typing at once. The keypad's Undo goes one key at a time.

## Edexcel International A Level Economics

- A course next to NSW Economics and Maths: "Economics, AS year", "International A Level (Edexcel)", under International courses on the subject sheet, starting with the AS year (Units 1 and 2, 12 chapters, 53 points). Home calls it "Economics, International A Level (Edexcel)".
- Unit 1, Markets in action (26 points): Chapter 1 Introductory concepts (6 points), 2 Consumer behaviour and demand (5), 3 Supply (2), 4 Price determination (4), 5 Market failure (5), 6 Government intervention (4).
- Unit 2, Macroeconomic performance and policy (27 points): Chapter 1 Measures of economic performance (7), 2 Aggregate demand (4), 3 Aggregate supply (3), 4 National income (4), 5 Economic growth (4), 6 Macroeconomic objectives and policies (5).
- Questions worked out from numbers. Unit 1, five elasticities: PED (both questions on `e-ped`), YED, XED and PES (the practice question on each). Unit 2, eight: real GDP (`e-gdp` b), inflation from the CPI (`e-cpi` a), the unemployment rate (`e-labour` a), the current account (`e-bop` b), AD (`e-ad` a), the multiplier (both questions on `e-multiplier`) and a budget deficit (`e-fiscal` b).
- A chapter with no points shows on Home as Coming soon and cannot be opened. No chapter is empty now, but the A2 year's units will start that way.
- Chapters are numbered within their unit, so the chapter sheets in Learn and Practice put each unit's name above its chapters (`chPicks` in `10-core.js`).
- Under the course name, on the subject sheet and on Home: "Covers Pearson Edexcel International A Level Economics. Not affiliated with or endorsed by Pearson." No Pearson logos or branding anywhere.
- Data: the points are in a bank, `src/econ-points.js` (`ECON_POINTS`), keyed by ids that name the idea (`e-scarcity`), not the course. The course, `src/edexcel-content.js` (`EDEXCEL`), has units, chapters and, in each chapter, a list of point ids. A point has the same parts as in `content.js`, right answer first. Written fresh, not from Pearson's specification, textbooks, past papers or mark schemes.
- Sharing, set up but not built: a later course (say Cambridge) can list the same point ids. Progress is kept by point id, so a shared point would share its progress. That is the plan. The app still gives each point one chapter (`p.ch`), so a second course that shares points needs each course to keep its own place for a point.
- Draft: each chapter has `check: 'draft'` or `'checked'`. All 12 are `'checked'`: the content has been reviewed, so no Draft label shows. A draft chapter with points shows a Draft label on the Home hero, its chapter row, the point sheet and each Learn card, and Home's note adds "Chapters marked Draft have not been checked by a teacher yet." (`isDraft` and `DRAFT` in `10-core.js`). The code stays for later courses: mark a new chapter `'draft'` until a teacher has checked it.
- Code: `indexCourse` in `10-core.js` builds the course's chapters from the ids. `CH` holds only chapters with points, so Learn, Practice, Search and Home's button never reach a Coming soon one. `SUB.units` holds every chapter for Home's list. Chapters are numbered within their unit (`c.n`), and `chName` writes "Unit 1, chapter 1".
- Saved: answers in `saved.ans` with the NSW ones (the ids never clash). The course's chapter and records are in `saved.c.edexcel` (`cur`, `bestKm`, `bestCombo`). `subStore()` in `10-core.js` finds where the subject picked keeps these.
- It uses NSW Economics' Learn, Practice and Search: a card, a check question, then Practice. Challenges and races are not in this course yet: with it picked, the friend sheet opens on NSW Economics, and a rematch with no game yet uses an NSW chapter.

## The subject sheet: where you study

- The book button and the course name on Home open it (`ACT.subject` in `40-home.js`). The first time, it asks where you study, with a guess already picked. After that it opens on the courses, with the place at the top and Change beside it.
- Step 1, "Where do you study?": every country, named by the browser (`Intl.DisplayNames`, so no names are stored), with a search box that filters as you type and ignores capitals and accents. The country picked comes first, then countries with courses of their own (Australia, with "NSW courses and international courses" under it), then the rest A to Z. The button stays at the bottom of the sheet: Next for a country with states, Show courses otherwise. "This uses no location, and nothing is sent anywhere."
- Step 2, "Which state or territory?", only for a country with states: Australia's eight. NSW says HSC, the others "Courses coming", and any can be picked.
- Step 3, "Courses": the place's own courses under its name, with a line under them (NSW: "More NSW subjects are coming."), or "Courses for [place] are coming. The international courses below work anywhere." Then International courses, which show in every place, and "Taught in schools around the world." If the course open now is not offered there, it shows under Open now, so Home never names a course the sheet hides. Each row is a plain name and the exam it leads to ("Economics, Year 12", "HSC, The Global Economy"). Open or Switch on the right, as before.
- The guess (`guessPlace` in `10-core.js`) reads only the phone's settings: the region in each language (`en-AU`) and the time zone (`Australia/Perth`). A language's country with its own courses wins, then a country the time zone names, then any language's country. Many Australian phones use US English, so the time zone comes before a plain language. The state comes from the time zone, or is NSW if it does not say. With neither, nothing is picked. The guess is saved only when the student taps Show courses.
- Saved: `saved.place = {country, state}`, a two-letter code and a state id or null. A code or state this build does not know is dropped when the page loads, and the sheet asks again.
- Data, in `src/places.js`: `COURSE_LIST` (every course, its content, its plain name and exam line), `CURRICULA` (a place's own courses), `INTERNATIONAL`, `COUNTRY_CODES` (244 countries; uninhabited places left out) and `PLACES` (a country's curriculum or states, and the time zones that guess it). A new country, state, curriculum or course of an existing kind is data here (a course also needs its content file in `build.py`).

## Layout of src/

| File | What it holds |
| --- | --- |
| `content.js` | Study content: chapters, points, cards, questions. The right answer is always `opts[0]`. |
| `maths-content.js` | Maths content: chapters, points, and the templates that make questions and worked examples. |
| `econ-points.js` | A bank of Economics points that belongs to no one course. The right answer is always `opts[0]`. |
| `edexcel-content.js` | The Edexcel International A Level Economics course: units, chapters, draft or checked, and the point ids in each. |
| `places.js` | Every course, which countries and states teach which, the country codes and the time zones that guess them. |
| `10-core.js` | Icons, rockets, the store list, sample friends, saved progress, the subjects and courses, the status rules, altitude formatting. |
| `15-maths-make.js` | Turns a maths template into a question with its answers and worked steps. No screen code. |
| `20-sound.js` | The ping, the recorded blast and the race music. `recordings.json` is injected at the `REC` marker. |
| `30-shell.js` | Tabs, pages, the sheet, toasts, sparks. Every button has a `data-act` name looked up in `ACT`. |
| `40-home.js` | Home and the sheet for one point. |
| `50-feed.js` | Question slides shared by Learn and Practice, and Learn itself. |
| `55-maths.js` | Maths in Learn: loading MathLive, the worked example card, guided and check questions, work mode, the maths point sheet. |
| `60-practice.js` | The start screen, a flight, challenges, races, the result slide. |
| `62-maths-practice.js` | Maths in Practice: the start screen, which points, a flight on the keypad, the combo on lines, the Done moment, the clock and best time. Maths challenges and races use the same flight. |
| `70-social.js` | Friends, messages (with the subject switch for games and who won a challenge), the store, You, Search. |
| `80-intro.js` | The intro that plays when the app opens: the word, the rocket's ring, the trail, skipping, reduced motion and the safety timer. |
| `84-merge.js` | The part of the save that goes to an account, and putting two copies together. No screen code. |
| `85-account.js` | Accounts: the Supabase project, loading the library, the sign-in sheets, sync and when it happens, sign out and Delete account. |
| `90-boot.js` | Keyboard, appearance, start-up. |
| `style.css`, `body.html`, `head.html` | Looks, fixed markup, title and typeface links. |

## How it works

- Each point has a card, a check question (`a`) and a practice question (`b`). A point is new until one is answered, weak while either was last answered wrong, proven when both were last right, learned in between.
- Home's bar shows the current chapter's points learned and points proven, and each chapter row says its stage in words. Home's button picks the next step, and it is always something that can change progress now.
- Practice only asks about points that are not new: weak questions first, then untried, then the ones right longest ago.
- Scoring: each correct answer multiplies altitude by 2 x combo x difficulty. Combo tiers start at 3, 5, 8 and 12.
- Altitude is written out in full everywhere (`fmt` in `10-core.js`): "384,400 km", "2 billion km", "4.1 billion light-years", from million up to decillion, then a power of ten ("10⁴⁰ light-years"). Only km stays short. "light-years" has a hyphen and an invisible word joiner (U+2060) after it, so it never breaks across two lines. The non-breaking hyphen character is not used because Hanken Grotesk has no drawing for it. On the flight screen, if the words do not fit beside the number, the layer name and the clock, they move to the line under the number (`fitAlt` in `60-practice.js`, `#run.alt2`). At 360 px everything fits; the line under is for narrower screens, such as a folded Galaxy Fold at 280 px.
- Progress is in `localStorage` under `stratos2.v1`, with maths under its `m` key. Without an account, nothing is sent anywhere. With one, a copy of the progress is kept in the account (see Accounts and sync).
- Races have music: a ticking clock made in code, from Go until the race ends. It builds at halfway (3 correct in Economics, 2 in maths) and again one from winning (5, or 3 in maths), dips under each ping, and has its own switch in You.
- The weekly table on Friends counts right answers since Monday in every subject together.
- The four friends are samples. Their scores and replies are pretend and run on timers.
- The store shows example prices. Buying is switched off.

## Rules to keep

Design:
- Clinical, like the ChatGPT home page: white paper, one typeface (Hanken Grotesk), thin lines, one blue for progress.
- The logo is the one exception: "Stratos" in Archivo at its widest setting (semibold), in the middle of Home's top bar. Only its seven letters are loaded.
- No gradients in the interface, no emoji as icons, no grids of identical cards, no all-caps labels.
- The game mechanics stay: combo, altitude, the rocket, sound, vibration on correct answers.
- The Sky background is the only place the first build's look returns.
- It must work at 360 px wide, in light and dark, with no sideways scroll.

Words on screen, and anything written to the owner:
- Short, direct sentences. Sentence case. Australian spelling. No em dashes.
- Never use: crucial, delve, enhance, foster, garner, highlight (verb), interplay, intricate, key (as filler), landscape (metaphor), meticulous, pivotal, showcase, tapestry, testament, underscore (verb), valuable, vibrant, groundbreaking, renowned.
- No promotional tone. Say what a button does.

Product:
- Messages are cards and preset replies. No free typing.
- Challenges and races work in NSW Economics and Maths (not the Edexcel course yet), and start in the same places in each: the friend sheet from a thread, and Play on a card. A rematch keeps the subject and chapter of the game it answers.
- Nothing is sold by chance. User data is never sold.
- Label pretend things as pretend.
- Sound levels were measured and tuned (`MASTER = 0.4`). Do not change them unless asked.

## Parked on purpose

- Syllabus work. The content is a first draft of NSW Economics Stage 6 (2009), Topic 1. Do not expand or restructure it until asked. A new syllabus (2025) replaces it for Year 11 from Term 1 2027 and Year 12 from Term 4 2027.
- Real friends, payments. Google sign-in comes in its own pull request.
- Three notes, once the intro's dings, in case they are used elsewhere later: 355.1, 281.8 and 563.7 Hz, in that order. They are exact frequencies, not the nearest standard notes (each is about 29 cents sharp of F4, C#4 and C#5). The second is four semitones below the first, and the third is an octave above the second. They played at 0, 0.3 and 0.6 s as glass dings: the note itself strongest, with quieter overtones at 2 and 3 times its frequency and a very faint one at 2.76 times.

## Known gaps

- Edexcel Units 1 and 2: cards are words only, with no diagrams, so the shifts, surplus areas, tax incidence, AD and AS curves, and output gaps are explained in words.
- The Learn bar and the Practice start screen name a course chapter by its number in its unit ("1. Measures of economic performance"), without the unit.
- Some card parts have no question on them yet: financial markets (`e-special`), diminishing marginal utility (`e-demand`), state provision and regulation (`e-permits`), and distorted price signals (`e-govfail`).

- Maths in v2 (Learn, Practice, challenges and races) has not been tried on a real iPhone yet. The sample friends' maths pace is a first guess. A maths Learn session, like an Economics one, is lost if the page reloads, though answers already given are saved.
- The first time maths opens, MathLive (about 820 KB) and its fonts load, which takes a moment on a slow connection. Maths slides stay blank until it arrives.
- Never tested on a real iPhone. Web sound is muted by the iPhone silent switch, and iPhone browsers do not vibrate.
- A flight in progress is lost if the page reloads.
- The radio rows on the Practice start screen have no arrow-key support, and the sheet does not trap focus.
- Long cards on small phones scroll inside their slide.
- Locked store items are previews only.
- Accounts have not been tried against the real Supabase project yet: the URL and key are not in `src/85-account.js`. They are tested against the fake only.
- Opening v2.html with no connection depends on the browser's cache, because there is no service worker. Once open, it works offline and syncs when the connection is back.
- Two devices studying on the same day may undercount the day's and the week's answers, because the merge takes the higher count, not the sum. Step 5 will count the week on the server.

## Working agreement

- One change per session and per pull request. Keep changes small.
- After a change: build, run the tests, look at screenshots if anything visual moved, then commit `src/` and `v2.html` together. A Maths Lab change needs no build: run the tests and `node lab-shots.mjs`, then commit `lab/`, `maths-lab.html` and the tests.
- If a test fails, fix the cause. Do not weaken the test.
- Never commit `tests/node_modules`, `tests/shots`, `lab/node_modules` or `vendor/node_modules`.
