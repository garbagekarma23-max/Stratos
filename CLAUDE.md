# Stratos

## Mission

Stratos is school as a social app. Students open it the way they open Instagram, but the feed is their syllabus: short cards that teach a point, then questions that prove they know it. The app tracks what each student has learned, what is weak and what is proven, and always serves the weak points first, so time spent in it is time spent on what they don't know yet. It should feel clinical and trustworthy on the surface, like a tool, with a game underneath: combos, altitude, sound and a rocket that make getting answers right feel good. Friends make it competitive through challenges, races and a weekly table, using cards and preset replies with no free typing. Money comes from cosmetics at fixed prices, such as rockets, backgrounds, exhausts and sounds. Nothing is sold by chance and user data is never sold. The long-term aim is every syllabus, broken into chapters, with study that structures itself around each student. The first tester said the first build felt like a game to use after studying, so every change should make Stratos more of a place to learn, without losing what makes it fun.

A study app prototype for Australian senior students. GitHub Pages serves this repository from the main branch.

- `index.html` is the first prototype, a single question feed. Leave it alone unless asked.
- `v2.html` is the second prototype. It is built from `src/`. Never edit it by hand.
- `maths-lab.html` is the Maths Lab, a separate page for writing maths working on a phone. Its code is in `lab/`. See the Maths Lab section below.
- Live at https://garbagekarma23-max.github.io/Stratos/, https://garbagekarma23-max.github.io/Stratos/v2.html and https://garbagekarma23-max.github.io/Stratos/maths-lab.html

The owner is new to programming and reads this code to learn. Explain what you changed in plain words, and keep code comments in plain English.

## Build and test

- Build: `python3 build.py` writes `v2.html`. Run it after every change in `src/` and commit `v2.html` with the source, because the site serves that file.
- Content check: `node check_content.mjs`.
- Tests: `cd tests && npm install && npm test`. They open `../v2.html` in Chromium with Playwright, so build first. Use the Chromium already on the machine. Do not download a browser.
- Screenshots: `cd tests && node shots.mjs` writes PNGs to `tests/shots/` (light, dark, Sky, small phone, desktop). `node shots.mjs light` takes the light-mode flight set. Look at them after any visual change.
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
| `lab/keypad.js` | The keys, presses, holds and the drag strip. |
| `lab/app.js` | The screen, the lines, Done, Skip, the results and saving. |
| `lab/lab.css` | The look. Its colour block is copied from `src/style.css` and a test keeps them the same. |

To move to a new MathLive version: change the version in `lab/package.json`, then `cd lab && npm install && npm run copy`, then run the tests.

Rules to keep:
- Working is typed, one line at a time. The phone's own keyboard must never appear. MathLive's hidden input is marked `inputmode="none"`, our keys never take focus, and a test checks focus after every tap.
- Lines are checked by numbers, against the question, never against the line above. A line is right if it has exactly the same solutions as the question: each answer is put into the line, then x from minus a million to a million is searched for any other solution, most finely near 0,, and spread-out values check it is not true for every x. A wrong line gets a quiet mark in the weak-point colour and one plain sentence. A line with no = sign gets a hint, not a mark.
- The calculator display does what an HSC calculator does and no more. It works out the plain arithmetic after the last = sign and shows nothing for anything with x, ± or "or" in it. It never solves, expands or simplifies algebra. Tapping it swaps the arithmetic for its value.
- The keys follow the Casio fx-82AU: the number block at the bottom with the operators to its right, the shape keys (fraction, root, square, power, brackets) in the row above in the Casio's order, and the topic row on top. The Casio's AC is Undo, its ×10ˣ is =, and its Ans and = are one wide Enter.
- Enter checks the line and opens a new one. Enter on an empty line does nothing. Holding Enter checks the line and starts the next as a copy. Holding Delete clears the line, and one Undo brings it back.
- Done checks the final answer and sits at the opposite corner from Enter. It accepts x on its own in any exact form, or a decimal to at least 2 places, worked out to one number. Questions with two answers need both.
- The topic row belongs to the topic: x, ± and "or" for equations. A later topic swaps in its own keys through `lab/topics.js`, not new code.
- The look is v2's: the same colour values and names, Hanken Grotesk for words, MathLive's maths font for maths, flat keys with one corner size and no shadows. Enter has the darker fill of v2's main button. Only Done uses the blue.
- Results (time per question, lines, wrong lines, deletes, undos, skips) are saved on the device only, under `stratos-lab.v1`. Copy results puts them on the clipboard as text. Nothing is sent anywhere.

Later ideas, parked: a scratch area for drawing (a diagram, a number line, rough working).

Known gaps:
- Never tried on a real iPhone. The click and ping need the iPhone silent switch off, and iPhones do not vibrate for websites.
- On a computer keyboard, Control and Z uses MathLive's own undo, which takes back a run of typing at once. The keypad's Undo goes one key at a time.

## Layout of src/

| File | What it holds |
| --- | --- |
| `content.js` | Study content: chapters, points, cards, questions. The right answer is always `opts[0]`. |
| `10-core.js` | Icons, rockets, the store list, sample friends, saved progress, the status rules, altitude formatting. |
| `20-sound.js` | The ping, the recorded blast and the race music. `recordings.json` is injected at the `REC` marker. |
| `30-shell.js` | Tabs, pages, the sheet, toasts, sparks. Every button has a `data-act` name looked up in `ACT`. |
| `40-home.js` | Home and the sheet for one point. |
| `50-feed.js` | Question slides shared by Learn and Practice, and Learn itself. |
| `60-practice.js` | The start screen, a flight, challenges, races, the result slide. |
| `70-social.js` | Friends, messages, the store, You, Search. |
| `90-boot.js` | Keyboard, appearance, start-up. |
| `style.css`, `body.html`, `head.html` | Looks, fixed markup, title and typeface links. |

## How it works

- Each point has a card, a check question (`a`) and a practice question (`b`). A point is new until one is answered, weak while either was last answered wrong, proven when both were last right, learned in between.
- A chapter's bar is the share of its questions that are right. Home's button picks the next step.
- Practice only asks about points that are not new: weak questions first, then untried, then the ones right longest ago.
- Scoring: each correct answer multiplies altitude by 2 x combo x difficulty. Combo tiers start at 3, 5, 8 and 12.
- Progress is in `localStorage` under `stratos2.v1`. Nothing is sent anywhere.
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
