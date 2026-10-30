# The content pipeline

Turns a course outline into study content for Stratos. You write the outline: the course, its units and chapters, and a short brief for each point, in your own words. First the pipeline looks for points already written, in any course, subject or state: a point can be reused as it is, adapted with small changes, or written new (see Reusing points from other courses and states). Then it sends each chapter to Claude, which writes the card, the remember line, the check question and the practice question for each point. The content check runs on each one, then a separate Claude call checks it for wrong answers, options that could also be right, and factual errors. You review only the points it flags, on a page on your own computer. Then the pipeline writes the cleared points into the app.

The commands below are for PowerShell on Windows. They also work in Git Bash, so Claude Code can run them as written.

## For Claude Code

If you are Claude Code helping the owner with these steps:

- Never ask for the API key, and never read, set, print or save it. The owner sets it in a PowerShell window of their own (step 5), and runs `run`, `run-many`, `recheck`, `rebalance` and the exact `estimate` there, with or without `--now`. When it is time, give them the command to paste.
- You can run every other step: `status`, `estimate` (a rough one, with no key), `autoreview` (it makes no API calls), `recheck --dry-run` and `rebalance --dry-run` (rough estimates, with no key), `review`, `publish`, the build, the checks and git.
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

There are two sets of settings to pick from, at the top of `content/pipeline.py`:

| Step | `original` (the first run) | `cheaper` (a new course) |
| --- | --- | --- |
| Match | Claude Opus 5.5, low effort. A match it is not highly sure of comes to you | Claude Haiku 5.5, medium effort. A match it is not highly sure of goes to Claude Opus 5.5, medium effort |
| Adapt | Claude Opus 5.5, medium effort | Claude Sonnet 5.5, low effort |
| Write | Claude Opus 5.5, medium effort, one point per request | Claude Sonnet 5.5, low effort, a chapter per request |
| Check | Claude Opus 5.5, high effort, every point | Claude Opus 5.5, high effort, every point |
| Fix | Claude Opus 5.5, medium effort | Claude Opus 5.5, medium effort |

The trial of nsw-bus-11 on `cheaper` (step 10) matched the first run's quality and flag rate, at about half the cost.

A third set, `screened`, is `cheaper` with a Claude Haiku 5.5 check before the Opus one: only the points Haiku flags or is not sure of go on to Opus. In the trial, Haiku sent all 20 points on, so it saved nothing. It stays in the code in case a later Haiku does better, and a course only uses it if you run it with `--settings screened`.

A course keeps the settings it started on. nsw-bus-11 started before there were settings, so it stays on `original` unless you run it with `--settings cheaper`.

For the Business Studies chapter (20 points), the estimate gives:

| | `original` | `cheaper` |
| --- | --- | --- |
| With batches | US$0.73 to US$0.90 (3.7 to 4.5 cents a point) | US$0.40 to US$0.54 (2 to 2.7 cents a point) |
| With `--now` | US$1.46 to US$1.79 | US$0.80 to US$1.07 |

These match what the two runs of nsw-bus-11 cost with batches: about 3.7 cents a point on `original` (US$0.73 for 20 points) and about 2 cents on `cheaper`. Claude's output, thinking included, is the uncertain part, and the estimate's guess for it at each step is set from those runs. Batch prices are half the normal price: per million tokens in and out, Opus US$2 and US$10, Sonnet US$1 and US$5, Haiku US$0.05 and US$0.25.

## 7. Write and check the points

In the key window:

```powershell
py content/pipeline.py run content/outlines/nsw-bus-11.yaml --max-dollars 5
```

- `--max-dollars` is the most this course may cost in total, counting earlier runs. The pipeline refuses to send a batch that could take it past that.
- Before sending anything, it shows how the points split (reuse, adapt, new, and how many are still to be matched) and the estimate, as `estimate` does. Once matching has decided more points, it shows the split again before the next batch.
- Each step is one batch, so a run waits for several in turn: matching (for points the shortlist found a likely bank point for), adapting, writing, checking and fixes. Batches usually take under an hour each, at most 24.
- `--now` sends the requests to the normal API instead, 4 at a time, so a run finishes in minutes. It costs twice as much, and it only runs when at most 50 points are waiting. Use it for tests and small courses:

  ```powershell
  py content/pipeline.py run content/outlines/nsw-bus-11.yaml --now --max-dollars 5
  ```

  If you press Ctrl+C during `--now`, the requests still running are lost but may be billed. The pipeline counts their highest possible cost as spent, so `--max-dollars` still holds.
- `--settings cheaper`, `--settings original` or `--settings screened` changes the course's settings, and they are saved for its next runs.
- You can press Ctrl+C at any time and run the same command later. Everything is saved as it arrives, in `content/work/nsw-bus-11/`, and nothing is sent twice.
- `--no-wait` sends or collects once, then stops instead of waiting.
- `py content/pipeline.py status content/outlines/nsw-bus-11.yaml` shows where each point is, with no API calls.
- At the end of each run it prints, for the course, the cost per point written, how many points were flagged for you, and how many went to the Opus checker (with `screened`, also why).

### Several courses at once

```powershell
py content/pipeline.py run-many content/outlines --max-dollars 20
```

`run-many` takes several outlines, or a folder of them. It shows the combined estimate first, then puts every course's requests for a round into one shared batch: all the writing together, then all the checks and all the fixes. A batch with more than 5,000 requests is split into several (`BATCH_MOST` at the top of `pipeline.py`), to stay inside the account's batch queue.

- `--max-dollars` is the most all the courses may cost together, counting earlier runs. Each course gets a share: what it has spent, plus the rest split by how much each could still cost. The shares are printed before anything is sent. A course that would pass its share is held back and the others carry on. Run the same command again to share out the money again.
- Each course keeps its own work folder, settings and costs, and a course whose outline has a problem, or that stops, does not hold up the others.
- `--now`, `--settings` and `--no-wait` work as with `run`. At the end it prints the numbers for each course.

## Reusing points from other courses and states

Many ideas are taught in more than one course: supply and demand in NSW Economics and in Victoria's, z-scores in two maths courses, the share market in Business Studies and Economics. A point reused as it is costs nothing more to write or check, and a student's progress on it counts in every course that has it. So before writing, each new point is matched against every point already published, in every bank.

### How a point is matched

1. **The shortlist, with no API call.** Every published point in every bank gets a score from the words it shares with the new point's title and brief (rare words count for more, and "multi-stage" counts the same as "multistage"). The score is lowered for a different subject (Business Studies and Economics count as the same, and so do the maths courses) and for years far apart. The best 5 (`MATCH_MOST`) that score at least 0.2 (`MATCH_MIN`) go on. A point with none is written new, with no match request at all. On the NSW courses, the 21 points you or the matcher already matched all came out top of their shortlists.
2. **The match: Claude Haiku 5.5.** It sees the new point, its course and state, and each shortlisted point in full (card and both questions), with the courses it is used in. It answers reuse, adapt or new, how sure it is, and for adapt, the changes needed.
3. **The match check: Claude Opus 5.5**, only when Haiku says reuse or adapt but is not highly sure. Opus gets the same request and is not told Haiku's answer. Its answer decides.
4. **You**, only when Opus is not highly sure either. The review page shows it as a possible match.

### The three outcomes

- **Reuse**: the bank point fits as it is. Nothing is written, checked or reviewed: the chapter lists the bank point's id, as `reuse:` in an outline does. A reuse still comes to you if it is about a sensitive topic or for an English course (those points are always reviewed), and is written new if the course already has that bank point. If the bank point fails the content check for this course (a word only another subject allows, such as landscape in Geography), it is adapted instead.
- **Adapt**: the bank point teaches the same idea at the right depth, but needs small changes for this syllabus: a term or notation, which formulas are given, a law or body that differs between states, or a local example. Claude Sonnet 5.5 gets the bank point part by part and the list of changes, and answers with only the parts it changes (`prompts/adapter.md`). Both questions are always worded afresh, because no two questions may share the same text (step 9). The adapted point is a new point in this course's bank, with its own id and its own progress, and goes through the content check, the checker, the fix, autoreview and recheck like any other. Its file has an `adapt` entry: the bank point it came from, the changes asked for, and the parts that changed.
- **New**: written from scratch, as before.

Each point's file keeps its `shortlist` (with the scores), Haiku's answer (`match`), Opus's (`confirm`) and what was decided (`matched` or `adapt`), with each step's cost.

### What it costs

The shortlist is free. A Haiku match is about 0.03 cents a point with batches, and an Opus match check about 1 to 2 cents. Before, every point in a course whose subject had a bank went to Opus with every point in that bank: Business Studies Year 12's 106 match requests cost US$0.77, and the four NSW wave 2 courses that matched spent US$2.37 on it. The ten other wave 2 courses were never matched at all.

The estimate counts a point still to be matched both ways: its low end as if it were reused, its high end as if it were written new and checked by Opus too. Plan for the high number.

### Courses from other states

- Name the state in `place`: `vic`, `qld`, `sa`, `wa`, `tas`, `act` or `nt` (or `nsw`, or `international`). A state's courses show on the subject sheet once its first course is published. Until then it says Courses coming, as now.
- Victoria and Queensland name their years by units, and South Australia and the Northern Territory by stages (Stage 1 and Stage 2). Give the outline a `level` line, such as `level: Units 1 and 2` or `level: Stage 1`, and keep `years` (`[11]` for Units 1 and 2 or Stage 1, `[12]` for Units 3 and 4 or Stage 2), which matching uses. The subject sheet lists the course under its level, as it lists NSW courses under Year 11 and Year 12, and Home names it "Economics, Units 1 and 2".
- Publish the courses you want reused first. Matching only sees published points, so two courses in the same `run-many` can't reuse each other's points.
- Haiku's matching has not been measured against Opus yet. For the first run of another state's courses, look over a few reuses and adapts before publishing: each point's file says which bank point it came from.

## 8. Review the flagged points

### Clear the safe ones first (optional)

`autoreview` clears some flagged points for you by using the checker's fix, the same as pressing **Use the fix**. It makes no API calls and needs no key, so it can run in any window. It only reads the checker's saved answers.

It clears a point only when all of these hold:

- The checker was highly sure.
- Every problem the checker named is of kind **wording** or **other**. Wording covers confusing words, a question whose wording gives the answer away, filler about the course, and "forces" or "always" where the card says "can" or "may". Other covers a term that belongs to another point, a remember line that splits ideas more neatly than the card or contradicts it, a clue that gives the answer away, and a why that contradicts the card.
- No problem's explanation uses "incorrect", "wrong", "false", "inaccurate", "not true", "error" or "mistake", whatever kind it is labelled.
- The checker picked the writer's answer to both questions, and said no other option could also be right.
- There is no sensitive topic.
- There is a fix, it passes the content check, and it keeps the same right answer to both questions.

Everything else stays for you: a possible factual error, a problem with the level, anything the checker was not highly sure of, a sensitive topic, a point with no fix, a possible match in the bank, and a point that could not be written.

After you merge this pull request, on your own computer:

```powershell
git checkout main
git pull
py content/pipeline.py autoreview --dry-run
```

With no outline it looks at every course in `content/work/` (trials are left out). To look at some courses only, name their outlines, or a folder of them:

```powershell
py content/pipeline.py autoreview content/outlines/nsw-bus-11.yaml --dry-run
```

The dry run changes nothing. For each course it prints how many points it would clear, which ones, how many it would keep as spot checks, and how many are left for you, with the reasons. It also replays the rules on the points you have already reviewed, next to what you chose, so you can see whether they agree with you. When the numbers look right, run it again without `--dry-run`:

```powershell
py content/pipeline.py autoreview
```

- **Spot checks**: 1 in 10 automatic decisions (the 1st, 11th, 21st and so on in each course) is not cleared. It stays in the review list labelled **Spot check**, with a note saying autoreview would have used the fix. Decide it as you would any other. If you reject one, every summary after that (`autoreview`, `status` and the end of a run) shows a warning. The rate is `AUTO_SPOT_EVERY` at the top of `content/pipeline.py`: 10 is 1 in 10, and 20 would be 1 in 20.
- **The record**: each point it clears gets an `auto` entry in its file in `content/work/<course>/points/`, with when, the problems and their kinds, how sure the checker was, and "used the fix", and a line in its log. The first draft stays in the file. `content/work/<course>/autoreview.json` counts the decisions and keeps your answer to each spot check.
- **Undo**: `py content/pipeline.py autoreview content/outlines/nsw-bus-11.yaml --undo` sends every point it cleared in that course back to the review list. Add `--point bus-business` for one point. Add `--dry-run` to see what would go back first. A point sent back is never cleared automatically again. If the course was already published, run `publish` again: a chapter with a point waiting for you shows as Coming soon until you clear it.
- Running it again never decides a point twice. Run it after each `run`, before you open the review page.
- Commit the work folders afterwards, as in step 9, so the decisions are kept.

### Recheck the fixes (optional)

Autoreview keeps a point for you when the fix changes a right answer or the checker named a possible factual error. Often the fix is fine, but you can't tell that from simple rewording without reading it closely. `recheck` sends each of those fixes to the Opus checker again, as a fresh check. The checker gets the fix as if it were a new point: never the first draft or the problems found in it. It costs about 1 cent a fix with batches.

It clears a point with the fix only when the fresh check:

- picks the fix's right answer to both questions,
- says no other option could also be right,
- finds no problems,
- names no sensitive topic,
- and is highly sure.

Anything else stays for you, with the fresh check's reasons on the review page under **Fresh check of the fix**.

It never sends a point with a sensitive topic, a point you sent back with `--undo`, a fix that fails the content check, a point with no fix, or a spot check. It also skips points autoreview can clear for free, so run autoreview first. A point is rechecked once only.

In the key window, after autoreview:

```powershell
py content/pipeline.py recheck --dry-run
```

The dry run lists the fixes it would send, why the others stay with you, the estimate, and what the course has spent so far. It sends nothing. Then:

```powershell
py content/pipeline.py recheck --max-dollars 5
```

- `--max-dollars` works as in `run`: the most the course may cost in total, counting earlier runs. With several courses, they share it as in `run-many`. It refuses to send a batch that could pass it.
- The fixes go in one batch, which usually takes under an hour. `--no-wait` sends or collects once, then stops. Ctrl+C is safe, and running the same command again carries on.
- At the end it prints, for each course, how many fixes it rechecked, how many it cleared, the spot checks, how many it kept for you, and why.
- **Spot checks**: 1 in 10 of the points recheck would clear (the 1st, 11th and so on in each course) stays in the review list as a **Spot check**, as with autoreview. These are counted apart from autoreview's. Rejecting one puts the same warning in every summary.
- Each point it clears has `cleared_by: "recheck"`, an `auto` entry and a `recheck` entry with the fresh check's answer in its file. `autoreview --undo` sends these back to you too, and they are never cleared automatically again.
- With no outline it looks at every course in `content/work/`, apart from trials. Name outlines, or a folder of them, to recheck some courses only.

### Rebalance the options (optional)

In a good question, a student can't pick the right option by its look. Many courses written so far have the right option as the longest of the four far more often than chance: `node check_content.mjs` prints a warning for each one (see below). The writer and the checker are told about this now, so new courses should not need it. `rebalance` fixes a course that is already written.

For each cleared point, it finds the questions whose right option is clearly the longest: longer than every wrong option, and at least 5 characters longer than their average. For each one, Claude Sonnet 5.5 rewrites only the three wrong options, so they match the right one in length and detail. It is asked to keep each wrong option's mistake, so the explanation still fits, and to keep it clearly wrong. The question, the right option, the card, the explanation and the clue never change: the pipeline copies them from the old version.

Then each rewritten point goes to the course's checker, Claude Opus 5.5 at high effort, as if it were a new point. The checker is never told the old options or that anything was rewritten. Opus is the only checker measured on this content: Haiku sent every point on in the one trial, and Sonnet has never been tried as a checker. With batches, a rewrite costs well under 1 cent and its check about 1 cent.

The new options are used only when:

- there are three of them, all different from each other and from the right option,
- the right option is no longer clearly the longest,
- the point passes the content check with them,
- and the check picks the right option in both questions, says no other option could also be right, finds no problems, names no sensitive topic and is highly sure.

Otherwise the point keeps its old options, and its file says why. A rewrite the check turned down is kept in the file too (`tried`), with the check. A point is rebalanced once only. A point still waiting for you is left out: decide it on the review page first. So is a point about a sensitive topic, which you approved as written.

In the key window:

```powershell
py content/pipeline.py rebalance --dry-run
```

The dry run lists the questions it would rewrite, the estimate for the rewrites and for their checks, and what each course has spent so far. It sends nothing. Its last line gives the numbers to pass for the highest estimate. Then:

```powershell
py content/pipeline.py rebalance --max-new-dollars 3
```

- `--max-new-dollars` is the most this rebalance may spend, not counting earlier runs. With several courses, they share it by how much each could cost.
- `--max-dollars` also works, as in `recheck`: the most the courses may cost in total, counting what earlier runs spent. On the 11 courses written so far, US$14.87 is spent already, so `--max-new-dollars 3` is the same as `--max-dollars 17.87`. Pass one or the other, not both.
- Before sending anything, it refuses if the rewrites and all their checks could cost more than the limit, so no rewrite is paid for without its check. It also refuses any batch that could pass the limit.
- The rewrites go in one batch, then the checks in another. Each usually takes under an hour. `--no-wait` sends or collects once, then stops. Ctrl+C is safe, and running the same command again carries on, with any check still to send.
- At the end it prints, for each course, how many questions it rebalanced, how many points kept their old options, and why.
- Each point it changes has a `rebalance` entry in its file, with the old options. Only the version students get (`final`) changes.
- With no outline it looks at every course in `content/work/`, apart from trials. Name outlines, or a folder of them, to rebalance some courses only.
- Then publish each course it changed again (step 9), and look over a few of the new options in the app.

The check is strict, so some good rewrites will be kept out. A point the check turns down keeps the options it has now.

#### The warning in the content check

For each course, `node check_content.mjs` prints how often the right option is the longest, against chance (a quarter of the questions), and how often it is clearly the longest. When the count is well above chance (2 standard deviations, which luck alone gives about 1 course in 40, in a course of 20 or more questions), it prints a warning under WARNINGS with the `rebalance` command to run. A warning does not fail the check.

### The review page

```powershell
py content/pipeline.py review
```

This opens http://localhost:8765 in your browser. Only this computer can open it. It lists only the points waiting for you:

- **Flagged**: the checker found a problem. On the left is the point as students would see it, with the right option marked. On the right are the checker's reasons and how sure it was. If it suggested a fix, **The fix** shows it with the changed words in blue.
- **Possible match**: the bank already has a point that may teach the same idea, and neither Haiku nor Opus was highly sure, or it is a reuse about a sensitive topic or for an English course. It shows the bank point, which courses use it, what the model said and the changes it suggested. **Reuse** shares that point, and each student's progress on it, with the courses that already use it. **Adapt it** has a new point adapted from it on the next run, with those changes. **Write a new point** has one written for this course from scratch.
- **Not written**: Claude declined to write it, or it failed three times.

The buttons:
- **Approve as written** and **Use the fix** clear the point.
- **Edit** lets you change any part. Saving runs the content check first, and says what to fix if it fails.
- **Reject and rewrite** sends it back to be written again on the next run, with your note.

Keys: J and K move between points, A approves, F uses the fix, E edits, R goes to the note. Points that weren't flagged are cleared already and don't show here, and nor do the points autoreview or recheck cleared, apart from their spot checks. Points about mental health, drugs, sexual health, Aboriginal and Torres Strait Islander histories and cultures, or facts about a set text always come here.

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

`node check_content.mjs` fails if two questions anywhere in the banks (or in NSW Economics) share the same text, ignoring capitals, spaces and the mark at the end. The pipeline runs the same check on each point as it is written or adapted, so a copy is written again before it reaches you.

`publish` never publishes a trial (step 10). It writes the cleared points into `src/bank/bus.js`, the course into `src/courses/nsw-bus-11.js`, and the course's lines into `supabase/week.sql` and `supabase/challenges.sql`. A chapter goes in only when every point in it is cleared. Until then it shows on Home as Coming soon. Then commit everything on a new branch:

```powershell
git checkout -b content/nsw-bus-11
git add content/outlines/nsw-bus-11.yaml content/work/nsw-bus-11 src/bank src/courses supabase/week.sql supabase/challenges.sql v2.html
git commit -m "Add Business Studies, Year 11: Nature of business"
git push -u origin content/nsw-bus-11
```

Open the pull request on GitHub, but do not merge it yet. The browser tests must pass first, every time. They need Chromium, which a Claude Code session on the web has, so open one on the branch and ask it to run the full suite:

```
cd tests && npm install && npm test
```

Merge only when every test passes. A new course changes the subject sheet, so tests that list a place's courses (such as `places.mjs` and `first-open.mjs`) may need the new course added. Ask the session to add it to them, never to loosen or remove a check, and to push the change to the same branch. Then run the suite again.

After it is merged, paste `supabase/week.sql` and then `supabase/challenges.sql` into the Supabase SQL Editor and run each, so the weekly table counts the new points.

## 10. Compare the settings with a trial

To see whether other settings keep the quality, run the same outline again under another name. In the key window:

```powershell
py content/pipeline.py run content/outlines/nsw-bus-11.yaml --as nsw-bus-11-cheaper --settings cheaper --now --max-dollars 4
```

- The trial has its own folder, `content/work/nsw-bus-11-cheaper/`, with the same point ids. It never publishes, and its points never show in the review list, so nothing in it reaches students.
- A trial on `screened` has Opus check every point, including the ones Haiku passed. That is the only way to see what Haiku would have let through. At the end it says how many points Haiku passed and how many of those Opus flagged, and what the trial would have cost without the extra Opus checks.
- For the Business chapter, a trial on `cheaper` costs about US$0.80 to US$1.10 with `--now`, or half that with batches.

Then open the review page (step 8) and choose **Compare**. It shows the numbers for both runs, then each point twice, side by side, as students would see it. With **Hide which side is which until I pick** on, the sides are mixed up, and each point's run, checkers and cost show only after you pick **Left is better**, **About the same** or **Right is better**. Tap your pick again to clear it. Your picks are saved in the trial's folder, and the totals are at the top.

Twenty points is a small sample, and two runs on the same settings also differ. Look for anything clearly worse. On a `screened` trial, if Opus flags more than one or two of the points Haiku passed, keep Opus checking every point.

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
| `years` | The years it is for, from 7 to 12, such as `[11]` or `[7, 8]`. Matching uses them, so keep them for a course named by units too. |
| `level` | Optional. The heading the course is listed under, for a state that names its years another way, such as `Units 1 and 2`. Short, in sentence case. Without it, the course is listed under its year. |
| `place` | `nsw`, `vic`, `qld`, `sa`, `wa`, `tas`, `act` or `nt`, or `international`. |
| `kind` | `standard`; `english` (techniques, text types, modules, context and themes of set texts, essay structure, and never more than 10 words quoted); `maths` (cards and multiple choice until the keypad comes to the course); or `theory` (for practical subjects such as Visual Arts, Music, Drama and practical PDHPE: theory and history only). |
| `syllabus` | Which syllabus and part, in a few words, so Claude pitches it right. |
| `note` | The line under the course name on Home and the subject sheet. |
| `chips` | Optional. Words to try on the Search page. |
| `also_match` | Optional. Matching looks in every bank now. A bank named here counts as the same subject, so its points score higher, such as `[e]` for the Economics bank. |
| `units` | Each unit has a `title` and `chapters`. Each chapter has a `title` and `points`. |
| points | Each point has a `title` and a `brief`: what it teaches, in a sentence or two of your own words. `codes` can list syllabus outcome codes. `reuse: e-ped` uses a bank point exactly as it is, with no brief. |

Rules:
- Write the briefs in your own words. Never paste syllabus text, a textbook or a past paper. The structure and the outcome codes are fine.
- A title or brief with a colon and a space in it needs quote marks around it: `brief: "Two kinds: goods and services."`
- The pipeline adds an `id:` line under each chapter and point the first time it runs. Never change an id once the course is published: progress is saved by it.
- Changing a point's title or brief later starts that point again from the beginning on the next run.
- Keep a chapter to about 3 to 7 points, so a Learn session stays short.
- Write each brief so it says what the point teaches in plain words. The shortlist matches on the words in the title and brief, so a brief that names the idea finds a point already written.

## Files

| File | What it holds |
| --- | --- |
| `pipeline.py` | The pipeline: the commands, the requests, saving, the review page's server, and publishing. The settings at the top set the model and how hard it thinks at each step, the prices, and the limits for `--now` and batches. |
| `prompts/` | What Claude is told: `writer.md` (with three points from the Economics bank as examples, and the rules from your review of the first course), `checker.md` (which looks for the same things), `matcher.md` (reuse, adapt or new), `adapter.md` (only the changes an adapted point needs), `rebalance.md` (rewriting wrong options to match the right one), and the extra rules for each kind in `kinds/`. |
| `review/index.html` | The review page, and its Compare tab. |
| `outlines/` | One outline per course. `outlines/later/` holds outlines that are not ready to run: `run-many content/outlines` reads only the files directly in `outlines/`, so it skips them, and the README there says why each one waits. |
| `work/` | What each run saved: `state.json` (the batches and the money spent), `autoreview.json` (how many decisions autoreview and recheck have made, and your spot check answers) and a file per point (each version, the checker's answer, the fresh check of the fix, autoreview's or recheck's decision and yours, and the old options rebalance replaced). Commit it with the content. |
| `load.mjs`, `dump.mjs` | Read the content in `src/` the way the build does, for the pipeline, the content check and the tests. |
| `test_pipeline.py` | The pipeline's tests, with a stand-in for the API. No key needed. `tests/pipeline-old-run/` is a run saved by the pipeline from before settings, which the tests finish with this one. `tests/made/` and `tests/units/` are courses it publishes, which the browser tests open. |
