# Stratos

## Mission

Stratos is school as a social app. Students open it the way they open Instagram, but the feed is their syllabus: short cards that teach a point, then questions that prove they know it. The app tracks what each student has learned, what is weak and what is proven, and always serves the weak points first, so time spent in it is time spent on what they don't know yet. It should feel clinical and trustworthy on the surface, like a tool, with a game underneath: combos, altitude, sound and a rocket that make getting answers right feel good. Friends make it competitive through challenges, races and a weekly table, using cards and preset replies with no free typing. Money comes from cosmetics at fixed prices, such as rockets, backgrounds, exhausts and sounds. Nothing is sold by chance and user data is never sold. The long-term aim is every syllabus, broken into chapters, with study that structures itself around each student. The first tester said the first build felt like a game to use after studying, so every change should make Stratos more of a place to learn, without losing what makes it fun.

A study app prototype for Australian senior students. GitHub Pages serves this repository from the main branch.

- `index.html` is the first prototype, a single question feed. Leave it alone unless asked.
- `v2.html` is the second prototype. It is built from `src/`. Never edit it by hand.
- Live at https://garbagekarma23-max.github.io/Stratos/ and https://garbagekarma23-max.github.io/Stratos/v2.html

The owner is new to programming and reads this code to learn. Explain what you changed in plain words, and keep code comments in plain English.

## Build and test

- Build: `python3 build.py` writes `v2.html`. Run it after every change in `src/` and commit `v2.html` with the source, because the site serves that file.
- Content check: `node check_content.mjs`.
- Tests: `cd tests && npm install && npm test`. They open `../v2.html` in Chromium with Playwright, so build first. Use the Chromium already on the machine. Do not download a browser.
- Screenshots: `cd tests && node shots.mjs` writes PNGs to `tests/shots/` (light, dark, Sky, small phone, desktop). `node shots.mjs light` takes the light-mode flight set. Look at them after any visual change.
- The site only updates when the pull request is merged into main.

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
| `style.css`, `body.html`, `head.html` | Looks, fixed markup, title and typeface link. |

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
- After a change: build, run the tests, look at screenshots if anything visual moved, then commit `src/` and `v2.html` together.
- If a test fails, fix the cause. Do not weaken the test.
- Never commit `tests/node_modules` or `tests/shots`.
