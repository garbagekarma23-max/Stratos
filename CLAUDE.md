# Stratos

## Mission

Stratos is school as a social app. Students open it the way they open Instagram, but the feed is their syllabus: short cards that teach a point, then questions that prove they know it. The app tracks what each student has learned, what is weak and what is proven, and always serves the weak points first, so time spent in it is time spent on what they don't know yet. It should feel clinical and trustworthy on the surface, like a tool, with a game underneath: combos, altitude, sound and a rocket that make getting answers right feel good. Friends make it competitive through challenges, races and a weekly table, using cards and preset replies with no free typing. Money comes from cosmetics at fixed prices, such as rockets, backgrounds, exhausts and sounds. Nothing is sold by chance and user data is never sold. The long-term aim is every syllabus, broken into chapters, with study that structures itself around each student. The first tester said the first build felt like a game to use after studying, so every change should make Stratos more of a place to learn, without losing what makes it fun.

A study app prototype for Australian senior students. GitHub Pages serves this repository from the main branch.

- `index.html` is the first prototype, a single question feed. Leave it alone unless asked.
- `v2.html` is the second prototype. It is built from `src/` (and the shared maths files in `lab/`). Never edit it by hand. It has two subjects: Economics and Maths (Learn and Practice; races and challenges are Economics only so far).
- `maths-lab.html` is the Maths Lab, a separate page for writing maths working on a phone. Its code is in `lab/`. See the Maths Lab section below.
- Live at https://garbagekarma23-max.github.io/Stratos/, https://garbagekarma23-max.github.io/Stratos/v2.html and https://garbagekarma23-max.github.io/Stratos/maths-lab.html

The owner is new to programming and reads this code to learn. Explain what you changed in plain words, and keep code comments in plain English.

## Build and test

- Build: `python3 build.py` writes `v2.html`. Run it after every change in `src/` and commit `v2.html` with the source, because the site serves that file.
- Content check: `node check_content.mjs`.
- Tests: `cd tests && npm install && npm test`. They open `v2.html` and `maths-lab.html` in Chromium with Playwright, through the small web server in `tests/serve.mjs` (MathLive's fonts do not load from a file path), so build first. Use the Chromium already on the machine. Do not download a browser.
- `tests/maths-practice.mjs` runs a maths Practice flight with keypad taps only: the start screen, the order of questions, the combo on lines, altitude on answers, Practice answers counting toward proven, the Done moment with and without reduced motion, the clock and best time, ending early.
- `tests/altitude.mjs` checks that altitude is written out in full everywhere ("2 billion km", "4.1 billion light-years", never "2 B km" or "ly", and "light-years" never split over two lines) and that the flight screen's altitude line fits at 360 and 390 px. `node altitude.mjs shots` also saves the flight screen high up: `altitude-360.png`, `altitude-390.png`, with a maths clock (`-clock`), and at 280 px (`altitude-280-clock.png`).
- `tests/maths-content.mjs` checks the maths content with the lab's line checker, no browser: every worked example line ticks, and every template run 200 times makes right, clean answers. `tests/maths.mjs` runs maths in v2: the subject switch, the status rules, and Learn on both chapters with keypad taps only.
- Screenshots: `cd tests && node shots.mjs` writes PNGs to `tests/shots/` (light, dark, Sky, small phone, desktop). `node shots.mjs light` takes the light-mode flight set. Look at them after any visual change.
- Maths screenshots in v2: `cd tests && node maths-shots.mjs` writes Home, a worked example, a guided question and the point sheet, light and dark, plus `maths-compare-light-1.png` (and `-2`, and dark), which put each next to the same Economics screen, and `maths-practice-light.png` (and dark): a maths flight and its result next to Economics.
- Maths Lab screenshots: `cd tests && node lab-shots.mjs` writes the lab at iPhone size, light and dark, plus `compare-light.png` and `compare-dark.png`, which put it next to v2's Home and a practice question.
- The site only updates when the pull request is merged into main.

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
- Build order, one pull request each: (1) the maths subject with Learn (done), (2) maths Practice with the game (done), (3) races and challenges with maths, next.
- Practice for maths: the keypad with the game on top. Weak points first. The combo builds with each right line and resets on a wrong one. The rocket climbs on each right answer. Done gets one clear moment.
- Proven for maths: three right answers in a row on a point, each with different numbers. No day limits anywhere. A wrong answer makes the point weak and resets its run.
- Proving a chapter runs in one sitting: questions from the chapter's unproven points, mixed, until every point is proven or the student leaves.
- Spacing happens in Practice, never as a lock: Practice keeps bringing back the points right longest ago. Nothing in the app ever tells a student to come back later.

### Maths in v2

- Maths is a second subject next to Economics, picked from the subject sheet on Home ("Equations, Maths, Year 11"). It uses the same chapters, points, statuses, two-tone bar and weak-points-first rule.
- Subjects: `10-core.js` indexes both topics. `PT` holds every point of both. `SUB` is the subject picked, and `CH` and `ALL` are its chapters and points; `setSubject` changes them. `useSubject` in `40-home.js` switches Home, Learn and Search, and remembers the pick in `saved.subject`.
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
- Home's button for maths opens Learn: new points, then weak points in full, then Prove this chapter. Once every point is proven it offers a mixed flight. Races and challenges still switch to Economics.

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

Known gaps:
- Tested on a real iPhone: the iPhone keyboard never appeared, holding Enter copied the line with no magnifier or text selection, the clicks and pings played with the silent switch off, and all ten questions could be finished. Sound needs the silent switch off, and iPhones do not vibrate for websites.
- On a computer keyboard, Control and Z uses MathLive's own undo, which takes back a run of typing at once. The keypad's Undo goes one key at a time.

## Layout of src/

| File | What it holds |
| --- | --- |
| `content.js` | Study content: chapters, points, cards, questions. The right answer is always `opts[0]`. |
| `maths-content.js` | Maths content: chapters, points, and the templates that make questions and worked examples. |
| `10-core.js` | Icons, rockets, the store list, sample friends, saved progress, the subjects, the status rules (both subjects), altitude formatting. |
| `15-maths-make.js` | Turns a maths template into a question with its answers and worked steps. No screen code. |
| `20-sound.js` | The ping, the recorded blast and the race music. `recordings.json` is injected at the `REC` marker. |
| `30-shell.js` | Tabs, pages, the sheet, toasts, sparks. Every button has a `data-act` name looked up in `ACT`. |
| `40-home.js` | Home and the sheet for one point. |
| `50-feed.js` | Question slides shared by Learn and Practice, and Learn itself. |
| `55-maths.js` | Maths in Learn: loading MathLive, the worked example card, guided and check questions, work mode, the maths point sheet. |
| `60-practice.js` | The start screen, a flight, challenges, races, the result slide. |
| `62-maths-practice.js` | Maths in Practice: the start screen, which points, a flight on the keypad, the combo on lines, the Done moment, the clock and best time. |
| `70-social.js` | Friends, messages, the store, You, Search. |
| `90-boot.js` | Keyboard, appearance, start-up. |
| `style.css`, `body.html`, `head.html` | Looks, fixed markup, title and typeface links. |

## How it works

- Each point has a card, a check question (`a`) and a practice question (`b`). A point is new until one is answered, weak while either was last answered wrong, proven when both were last right, learned in between.
- Home's bar shows the current chapter's points learned and points proven, and each chapter row says its stage in words. Home's button picks the next step, and it is always something that can change progress now.
- Practice only asks about points that are not new: weak questions first, then untried, then the ones right longest ago.
- Scoring: each correct answer multiplies altitude by 2 x combo x difficulty. Combo tiers start at 3, 5, 8 and 12.
- Altitude is written out in full everywhere (`fmt` in `10-core.js`): "384,400 km", "2 billion km", "4.1 billion light-years", from million up to decillion, then a power of ten ("10⁴⁰ light-years"). Only km stays short. "light-years" has a hyphen and an invisible word joiner (U+2060) after it, so it never breaks across two lines. The non-breaking hyphen character is not used because Hanken Grotesk has no drawing for it. On the flight screen, if the words do not fit beside the number, the layer name and the clock, they move to the line under the number (`fitAlt` in `60-practice.js`, `#run.alt2`). At 360 px everything fits; the line under is for narrower screens, such as a folded Galaxy Fold at 280 px.
- Progress is in `localStorage` under `stratos2.v1`, with maths under its `m` key. Nothing is sent anywhere.
- Races have music: a ticking clock made in code, from Go until the race ends. It builds at halfway (3 correct) and again one from winning (5), dips under each ping, and has its own switch in You.
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
- Nothing is sold by chance. User data is never sold.
- Label pretend things as pretend.
- Sound levels were measured and tuned (`MASTER = 0.4`). Do not change them unless asked.

## Parked on purpose

- Syllabus work. The content is a first draft of NSW Economics Stage 6 (2009), Topic 1. Do not expand or restructure it until asked. A new syllabus (2025) replaces it for Year 11 from Term 1 2027 and Year 12 from Term 4 2027.
- Real accounts, real friends, payments.

## Known gaps

- Maths in v2 (Learn and Practice) has not been tried on a real iPhone yet. A maths Learn session, like an Economics one, is lost if the page reloads, though answers already given are saved.
- The first time maths opens, MathLive (about 820 KB) and its fonts load, which takes a moment on a slow connection. Maths slides stay blank until it arrives.
- Never tested on a real iPhone. Web sound is muted by the iPhone silent switch, and iPhone browsers do not vibrate.
- A flight in progress is lost if the page reloads.
- The radio rows on the Practice start screen have no arrow-key support, and the sheet does not trap focus.
- Long cards on small phones scroll inside their slide.
- Locked store items are previews only.

## Working agreement

- One change per session and per pull request. Keep changes small.
- After a change: build, run the tests, look at screenshots if anything visual moved, then commit `src/` and `v2.html` together. A Maths Lab change needs no build: run the tests and `node lab-shots.mjs`, then commit `lab/`, `maths-lab.html` and the tests.
- If a test fails, fix the cause. Do not weaken the test.
- Never commit `tests/node_modules`, `tests/shots` or `lab/node_modules`.
