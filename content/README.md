# The content pipeline

Turns a course outline into study content for Stratos. You write the outline: the course, its units and chapters, and a short brief for each point, in your own words. The pipeline sends each chapter to Claude, which writes the card, the remember line, the check question and the practice question for each point. The content check runs on each one, then a separate Claude call checks it for wrong answers, options that could also be right, and factual errors. You review only the points it flags, on a page on your own computer. Then the pipeline writes the cleared points into the app.

The commands below are for PowerShell on Windows. They also work in Git Bash, so Claude Code can run them as written.

## For Claude Code

If you are Claude Code helping the owner with these steps:

- Never ask for the API key, and never read, set, print or save it. The owner sets it in a PowerShell window of their own (step 5), and runs `run`, `run-many` and the exact `estimate` there, with or without `--now`. When it is time, give them the command to paste.
- You can run every other step: `status`, `estimate` (a rough one, with no key), `review`, `publish`, the build, the checks and git.
- `py content/pipeline.py review` keeps running until it is stopped: start it in the background, then tell the owner the address.
- Never edit `src/bank/` or `src/courses/` by hand. A change to a point goes through the review page, then `publish`.
- Follow CLAUDE.md in the repository folder, as in any session.

## 1. Install the tools (once)

Open PowerShell and run:

```powershell
winget install --id Git.Git -e
winget install --id Python.Python.3.13 -e
winget install --id OpenJS.NodeJS.LTS -e
```

Close PowerShell and open it again, so it finds the new tools. Then check each one prints a version:

```powershell
git --version
py --version
node --version
```

If you don't have Claude Code yet, install it with `irm https://claude.ai/install.ps1 | iex`, then close and reopen PowerShell. The steps are at https://code.claude.com/docs if that line has changed.

## 2. Get the repository

```powershell
cd $HOME\Documents
git clone https://github.com/garbagekarma23-max/Stratos.git
cd Stratos
```

Every command from here on runs in this `Stratos` folder. To get the latest version later, run `git pull` in it.

## 3. Install the libraries (once)

```powershell
py -m pip install -r content/requirements.txt
cd tests
npm install
cd ..
```

The first line installs the Anthropic library and PyYAML for the pipeline. The other three install what the content's database tests need.

## 4. Set up the Anthropic Console (once)

1. Sign in at https://platform.claude.com and add a payment method under Billing.
2. Set a spending limit for the whole account: on the Billing page (https://platform.claude.com/settings/billing), under Spend limits, choose **Set limit** and enter a monthly amount, such as US$20.
3. Make a workspace just for this: Settings, then Workspaces, then create one called `Stratos content`. Give it its own spend limit, such as US$10 a month. (The default workspace can't have one.)
4. Make the API key inside that workspace: Settings, then API keys, then **Create key**, and pick the `Stratos content` workspace. Copy it. The Console shows it only once.
5. Keep the key in a password manager. Never put it in this folder, in a chat, in an email or in a screenshot.
6. If you pay with prepaid credits, buy a small amount and turn auto-reload off. That is a third limit.

When a limit is reached, the API stops answering, and the pipeline stops with a message saying so. Run it again once the limit allows.

## 5. Set the key for one PowerShell window

Open a **new** PowerShell window for this, separate from the one Claude Code runs in. Claude Code uses `ANTHROPIC_API_KEY` itself if it starts in a window that has it, which would bill its own work to this key.

```powershell
cd $HOME\Documents\Stratos
$k = Read-Host 'Anthropic API key' -AsSecureString
$env:ANTHROPIC_API_KEY = [System.Net.NetworkCredential]::new('', $k).Password
Remove-Variable k
```

Paste the key when it asks. It shows as stars, and it is not saved in PowerShell's history. The key lives only in this window and is gone when you close it. To check it is there without showing it:

```powershell
if ($env:ANTHROPIC_API_KEY) { 'The key is set.' }
```

## 6. Check the cost

```powershell
py content/pipeline.py estimate content/outlines/nsw-bus-11.yaml
```

In the key window, it counts the real prompts with the API, which is free. Anywhere else it gives a rough figure from the length of the prompts. The first time, it also writes an id under each chapter and point title in the outline.

It shows each step, the model that does it and how hard it thinks, then two totals: with batches (the default) and with `--now` (step 7), which costs twice as much. Add `--settings original` to see the cost with the first run's settings. Give it several outlines, or a folder of them, for one combined estimate.

There are two sets of settings, at the top of `content/pipeline.py`:

| Step | `original` (the first run) | `cheaper` (a new course) |
| --- | --- | --- |
| Write | Claude Opus 5.5, medium effort, one point per request | Claude Sonnet 5.5, low effort, a chapter per request |
| Screen | none | Claude Haiku 5.5, medium effort |
| Check | Claude Opus 5.5, high effort | Claude Opus 5.5, high effort |
| Fix | Claude Opus 5.5, medium effort | Claude Opus 5.5, medium effort |

With `cheaper`, Haiku checks every point first. A point it passes cleanly (the writer's answers, no other option right, no problems, sure, no sensitive topic) is cleared. Everything else goes to the Opus checker, which is not told what Haiku said. A point Haiku says is sensitive always comes to you. A point whose brief or draft has a word such as mental health, drugs, sexual or Aboriginal skips Haiku and goes to Opus, and so does every point in an English course. One in 10 of the points Haiku passes goes to Opus anyway, so you can see how often Haiku misses something.

A course keeps the settings it started on. nsw-bus-11 started before there were settings, so it stays on `original` unless you run it with `--settings cheaper`.

For the Business Studies chapter (20 points), from the length of the prompts:

| | `original` | `cheaper` |
| --- | --- | --- |
| With batches | US$1.35 to US$2.70 (7 to 14 cents a point) | US$0.50 to US$1.40 (2.5 to 7 cents a point) |
| With `--now` | US$2.70 to US$5.40 | US$1.00 to US$2.70 |

Claude's output, thinking included, is the uncertain part. With `cheaper`, most of the cost is the Opus checks and fixes, so it depends on how many points Haiku sends on. The estimate guesses 30% to 60% until a course has screened 5 points, then uses that course's own share. Batch prices are half the normal price: per million tokens in and out, Opus US$2 and US$10, Sonnet US$1 and US$5, Haiku US$0.05 and US$0.25.

## 7. Write and check the points

In the key window:

```powershell
py content/pipeline.py run content/outlines/nsw-bus-11.yaml --max-dollars 5
```

- `--max-dollars` is the most this course may cost in total, counting earlier runs. The pipeline refuses to send a batch that could take it past that.
- Each step is one batch, so a run waits for several in turn: matching (if the bank has points in the same subject), writing, the Haiku screen, checking and fixes. Batches usually take under an hour each, at most 24.
- `--now` sends the requests to the normal API instead, 4 at a time, so a run finishes in minutes. It costs twice as much, and it only runs when at most 50 points are waiting. Use it for tests and small courses:

  ```powershell
  py content/pipeline.py run content/outlines/nsw-bus-11.yaml --now --max-dollars 5
  ```

  If you press Ctrl+C during `--now`, the requests still running are lost but may be billed. The pipeline counts their highest possible cost as spent, so `--max-dollars` still holds.
- `--settings cheaper` or `--settings original` changes the course's settings, and they are saved for its next runs.
- You can press Ctrl+C at any time and run the same command later. Everything is saved as it arrives, in `content/work/nsw-bus-11/`, and nothing is sent twice.
- `--no-wait` sends or collects once, then stops instead of waiting.
- `py content/pipeline.py status content/outlines/nsw-bus-11.yaml` shows where each point is, with no API calls.
- At the end of each run it prints, for the course, the cost per point written, how many points were flagged for you, and how many went to the Opus checker and why.

### Several courses at once

```powershell
py content/pipeline.py run-many content/outlines --max-dollars 20
```

`run-many` takes several outlines, or a folder of them. It shows the combined estimate first, then puts every course's requests for a round into one shared batch: all the writing together, then all the screening, all the checks and all the fixes. A batch with more than 5,000 requests is split into several (`BATCH_MOST` at the top of `pipeline.py`), to stay inside the account's batch queue.

- `--max-dollars` is the most all the courses may cost together, counting earlier runs. Each course gets a share: what it has spent, plus the rest split by how much each could still cost. The shares are printed before anything is sent. A course that would pass its share is held back and the others carry on. Run the same command again to share out the money again.
- Each course keeps its own work folder, settings and costs, and a course whose outline has a problem, or that stops, does not hold up the others.
- `--now`, `--settings` and `--no-wait` work as with `run`. At the end it prints the numbers for each course.

## 8. Review the flagged points

```powershell
py content/pipeline.py review
```

This opens http://localhost:8765 in your browser. Only this computer can open it. It lists only the points waiting for you:

- **Flagged**: the checker found a problem. On the left is the point as students would see it, with the right option marked. On the right are the checker's reasons and how sure it was. If it suggested a fix, **The fix** shows it with the changed words in blue.
- **Possible match**: the bank already has a point that may teach the same idea. **Reuse** shares that point, and each student's progress on it, with the courses that already use it. **Write a new point** has one written for this course.
- **Not written**: Claude declined to write it, or it failed three times.

The buttons:
- **Approve as written** and **Use the fix** clear the point.
- **Edit** lets you change any part. Saving runs the content check first, and says what to fix if it fails.
- **Reject and rewrite** sends it back to be written again on the next run, with your note.

Keys: J and K move between points, A approves, F uses the fix, E edits, R goes to the note. Points that weren't flagged are cleared already and don't show here. Points about mental health, drugs, sexual health, Aboriginal and Torres Strait Islander histories and cultures, or facts about a set text always come here.

After rejecting points, run step 7 again to rewrite them. Press Ctrl+C in the window to stop the review page.

## 9. Publish, check and send it as a pull request

```powershell
py content/pipeline.py publish content/outlines/nsw-bus-11.yaml
py build.py
node check_content.mjs
py content/test_pipeline.py
cd tests
node week-db.mjs
node challenges-db.mjs
cd ..
```

`publish` never publishes a trial (step 10). It writes the cleared points into `src/bank/bus.js`, the course into `src/courses/nsw-bus-11.js`, and the course's lines into `supabase/week.sql` and `supabase/challenges.sql`. A chapter goes in only when every point in it is cleared. Until then it shows on Home as Coming soon. Then commit everything on a new branch:

```powershell
git checkout -b content/nsw-bus-11
git add content/outlines/nsw-bus-11.yaml content/work/nsw-bus-11 src/bank src/courses supabase/week.sql supabase/challenges.sql v2.html
git commit -m "Add Business Studies, Year 11: Nature of business"
git push -u origin content/nsw-bus-11
```

Open the pull request on GitHub. The browser tests (`npm test`) need Chromium, so ask a Claude Code session on the web to run them on the branch. After it is merged, paste `supabase/week.sql` and then `supabase/challenges.sql` into the Supabase SQL Editor and run each, so the weekly table counts the new points.

## 10. Compare the settings with a trial

To see whether the cheaper settings keep the quality, run the same outline again under another name. In the key window:

```powershell
py content/pipeline.py run content/outlines/nsw-bus-11.yaml --as nsw-bus-11-cheaper --settings cheaper --now --max-dollars 4
```

- The trial has its own folder, `content/work/nsw-bus-11-cheaper/`, with the same point ids. It never publishes, and its points never show in the review list, so nothing in it reaches students.
- In a trial, Opus checks every point, including the ones Haiku passed. That is the only way to see what Haiku would have let through. At the end it says how many points Haiku passed and how many of those Opus flagged, and what the trial would have cost without the extra Opus checks.
- For the Business chapter, a trial costs about US$1.80 to US$3.70 with `--now`, or half that with batches.

Then open the review page (step 8) and choose **Compare**. It shows the numbers for both runs, then each point twice, side by side, as students would see it. With **Hide which side is which until I pick** on, the sides are mixed up, and each point's run, checkers and cost show only after you pick **Left is better**, **About the same** or **Right is better**. Tap your pick again to clear it. Your picks are saved in the trial's folder, and the totals are at the top.

Twenty points is a small sample, and two runs on the same settings also differ. Look for anything clearly worse. If Opus flags more than one or two of the points Haiku passed, tell Claude Code, and keep Opus checking every point.

You can commit the trial's folder with the course, so the comparison is kept, or delete it.

## Writing an outline

Copy `content/outlines/nsw-bus-11.yaml` and change it. Each line:

| Line | What it is |
| --- | --- |
| `id` | The course's id: lower-case words joined by dashes, such as `nsw-bus-11`. Progress is saved by it. |
| `subject` | The subject's name, such as `Business Studies`. |
| `bank` | The shared bank its new points go in: 2 to 4 letters, such as `bus`. Courses in the same subject share a bank. |
| `name`, `about` | The course's row on the subject sheet, and the line under it. |
| `short` | A short name for Search ("Search Business Studies"). |
| `years` | The years it is for, from 7 to 12, such as `[11]` or `[7, 8]`. |
| `place` | `nsw`, or `international`. |
| `kind` | `standard`; `english` (techniques, text types, modules, context and themes of set texts, essay structure, and never more than 10 words quoted); `maths` (cards and multiple choice until the keypad comes to the course); or `theory` (for practical subjects such as Visual Arts, Music, Drama and practical PDHPE: theory and history only). |
| `syllabus` | Which syllabus and part, in a few words, so Claude pitches it right. |
| `note` | The line under the course name on Home and the subject sheet. |
| `chips` | Optional. Words to try on the Search page. |
| `also_match` | Optional. Other banks to look for the same idea in, such as `[e]` for the Economics bank. |
| `units` | Each unit has a `title` and `chapters`. Each chapter has a `title` and `points`. |
| points | Each point has a `title` and a `brief`: what it teaches, in a sentence or two of your own words. `codes` can list syllabus outcome codes. `reuse: e-ped` uses a bank point exactly as it is, with no brief. |

Rules:
- Write the briefs in your own words. Never paste syllabus text, a textbook or a past paper. The structure and the outcome codes are fine.
- A title or brief with a colon and a space in it needs quote marks around it: `brief: "Two kinds: goods and services."`
- The pipeline adds an `id:` line under each chapter and point the first time it runs. Never change an id once the course is published: progress is saved by it.
- Changing a point's title or brief later starts that point again from the beginning on the next run.
- Keep a chapter to about 3 to 7 points, so a Learn session stays short.

## Files

| File | What it holds |
| --- | --- |
| `pipeline.py` | The pipeline: the commands, the requests, saving, the review page's server, and publishing. The settings at the top set the model and how hard it thinks at each step, the prices, and the limits for `--now` and batches. |
| `prompts/` | What Claude is told: `writer.md` (with three points from the Economics bank as examples), `checker.md`, `matcher.md`, and the extra rules for each kind in `kinds/`. |
| `review/index.html` | The review page, and its Compare tab. |
| `outlines/` | One outline per course. |
| `work/` | What each run saved: `state.json` (the batches and the money spent) and a file per point (each version, the checker's answer and your decisions). Commit it with the content. |
| `load.mjs`, `dump.mjs` | Read the content in `src/` the way the build does, for the pipeline, the content check and the tests. |
| `test_pipeline.py` | The pipeline's tests, with a stand-in for the API. No key needed. `tests/pipeline-old-run/` is a run saved by the pipeline from before settings, which the tests finish with this one. |
