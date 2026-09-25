# Handover — synthetic students on the physics mechanics launch set

For any Claude session (any account) continuing this work with no prompt from the owner. Read this
file, then `CLAUDE.md`, then `docs/history/synthetic-students.md` (the tool and every run's
findings) and `docs/architecture/ARCHITECTURE_ROADMAP_TO_10.md` §0 (the owner decisions).

## What the owner asked for (2026-09-24)

- **No school boards.** The product is subject + concept map only.
- **Launch with physics mechanics:** the 26 topics in `scripts/qa/synthetic/launchSet.ts`.
- **No real traffic yet.** The product isn't ready for learners, so synthetic students stand in:
  "Go with physics mechanics, build the runner."
- **"Keep working until you finish, update file on git to pick up from other account to
  continue."**

**The goal of the loop:** run the synthetic students on the launch set, fix the top defect at its
shared cause, deploy, re-run, and repeat. A topic is **ready** when, over 3 runs, all 5 students
reach verified mastery every time with zero critical defects (`scripts/qa/synthetic/scorecard.ts`).

## LIVE STATE (update this table at every step)

| Step | What | Status |
|---|---|---|
| S1 | Build runner (`scripts/qa/synthetic/*`, tests `src/tests/syntheticStudentRunner.test.ts`) | **done** `4685b2d` |
| S2 | Smoke run: 1 lesson, strong student, displacement | **done**. Critical defect found: "give me a question" read as frustration → demotion CHECK→DEMONSTRATE → unfair close |
| S3 | Fix S2 (`recoveryGuard.isNextItemRequest`, clause-level) | **committed** `a029624`. Full suite 723/14,908, tsc and build clean |
| S4 | Before-baseline: 2 topics × 5 students on production **without** the S3 fix | **done**: 4/10 mastered, 12 critical / 128 turns (details in `docs/history/synthetic-students.md`) |
| S5 | Push S3 + baseline fixes (verdict after gate-contract replacement, "Got it" announcement, `asksForPractice` next-question/check-me) to `main`; confirm the deploy is READY | **done**: `f6281f8`; production READY at `1f438cd` (19:0x UTC) |
| S6 | After-run: the same 2 topics × 5 students on the fixed build; compare with S4 | **done**: 8/10 mastered (was 4/10); critical 1 (was 12). Only confused fails |
| S6a | Root cause of "asked for a question, got none" (Vercel `[arbitration]` + `[gate-eligibility]` logs): a practice request with a "?" ("give me a question?", "can you check me with a question?") claims LEARNER_QUESTION, which denies AUTHORED_PROBE. Fix: `genuineQuestionActive … && !turnIntent.wantsPractice` in route.ts | **pushed** (full suite 723/14,915, tsc and build clean); next: after-run 2 |
| S6b | After-run 2 on production `dc07f2d` (arbitration fix `ae9caf6`), same 2 topics × 5 students | **done**: 9/10 mastered (confused now masters both). Remaining: off-track velocity stuck at TRANSFER 1/1; 1 checker false positive |
| S6c | Fixes from S6b: practice request never carries self-reported correctness; excursion `heldQuestion` (answering the lesson's held question closes the detour and counts); concept-name exemption in `dropAnswerLeaks` and the checker | **pushed** `49efe8f` |
| S6d | TRANSFER-below-bar fix (owner-approved) | **pushed** `db78d8a` (full suite 725/14,937, tsc and build clean); production READY at `1e14df3` (21:0x UTC) |
| S6e | After-run 3 on production `1e14df3` (fixes `49efe8f` + `db78d8a`), same 2 topics × 5 students | **done: 10/10 mastered, 0 critical, 0 major, 1 minor** (was 9/10, 1 critical). A container restart killed the run after 8 lessons (all mastered); the off-track student was re-run alone (`RUNNER_PERSONAS=offtrack`) and mastered both, including credit for the lesson question answered during a detour (heldQuestion fix confirmed). The 4 disposable accounts of the killed part (beginner, careless, strong, confused) were **not deleted** — harmless `qa-*@mytutor-qa.invalid` rows, clean up when convenient |
| S6f | Checker: an offered check, or "Quick check:" followed by the model's own question, is not `announced-not-asked` (both after-run 2 majors were checker false positives) | **pushed** `1b576c2` |
| S7 | Readiness runs 2 and 3 on displacement + velocity (production `dd31beb`) | **done — both topics READY**: run 2 10/10 mastered, 0 critical, 0 major; run 3 10/10, 0 critical, 1 major (`content-free-reply`, see below). With after-run 3 (run 1) that is 3 consecutive runs, all 5 students mastering both topics, 0 critical. (After-run 3's run file was lost to a container restart, so the scorecard CLI can only combine runs 2 and 3; runs 1 is recorded from its log.) |
| S7a | Run 3's content-free reply: confused student, "I still don't get it" (2nd don't-know) -> only "I hear you—it's completely okay to feel stuck. Let's take a tiny step together." Production log: model wrote 377 chars, `[dont-know-ceiling] question-withheld run:2` cut the rest. Could not reproduce (the model's raw text is not logged; a reconstructed teaching+question paragraph is already kept by `trimTrailingQuestions`). **No speculative fix**: the ceiling log now records `before`/`beforeChars`/`afterChars` (model text only), so the next occurrence is diagnosable. Likely cause: the known cost in `trimTrailingQuestions` (a single teaching sentence before its question is dropped) | **pushed** (logging only) |
| S8 | Widen: next launch topics two at a time (`RUNNER_TOPICS=phys.mech.acceleration,phys.mech.kinematics-1d`, then force + newtons-first-law, …), 3 runs each, within ~150 MB/day | **in progress**. acceleration + kinematics-1d run 1 (prod `651276f`): 10/10 mastered, 0 critical, 0 major, 2 minor |
| S8a | The recurring minor `ungradeable-question` (off-track t5, every topic) is a real defect: a server-graded-CORRECT answer got "…3 m/s², right? Is that correct?" and no verdict, because `CONFIRMS_CORRECT` matched "correct" inside the question (`[c5] confirmed:true`). Fix: `statesCorrect()` tests only statements; regex unchanged (scorer parity) | **pushed** (full suite 725/14,941, tsc and build clean); deployed `dbd3b77`; run 2 confirms the verdict is now prepended ("That's right. …") |
| S8b | Run 2 (prod `dbd3b77`): 10/10 mastered, **1 critical** `answer-leak` (acceleration, off-track t7): the authored question "Acceleration is defined as the rate of change of which quantity?" (key: velocity) stayed on screen from t6; learner asked "will this be on the exam?"; reply: "…understanding acceleration — how velocity changes with time — is definitely important." The leak guard (`dropAnswerLeaks`, route.ts ~L6425) runs only for a question attached THIS turn (owner-approved scope), not for a held question re-served by `mcqToServe`. **Needs owner decision** (see OWNER DECISION below) | open |
| S8c | Run 3 on acceleration + kinematics-1d (prod `dbd3b77`) | **done**: 10/10 mastered, 0 critical, 1 major (`announced-not-asked`, see S8d); the off-track t5 verdict flag is gone. **kinematics-1d READY** (3/3 runs, all master, 0 critical). acceleration NOT ready: run 2's critical waits on the OWNER DECISION below |
| S8d | "can you quiz me?" at t1 -> "Sure! Here's a quick check on acceleration:" + figure pointer, no question. `ANNOUNCES_A_CHECK` rejects a colon ending, and the trailing-colon rule missed it because `ensureVisualAcknowledged` (route ~L9954) appends the figure pointer before the delivery contract (~L12389). Fix: noun-form colon announcements ("here's a/your/another/the next … check/quiz/question/test:") are dropped too; still only when the text asks nothing | **pushed** (full suite 725/14,944, tsc and build clean) |
| S9 | Next pair: `phys.mech.force,phys.mech.newtons-first-law`, 3 runs (then newtons-second/third-law, …). Launch-set status: READY = displacement, velocity, kinematics-1d; blocked = acceleration (owner decision) | run 1 (prod `b382d17`): **10/10 mastered, 0 critical, 0 major**, 1 minor. Run 2 started 04:01 UTC (last run allowed today) |

If S4's run file is lost (the session ended), **skip the before-baseline**. S2's smoke run already
shows the defect; go straight to S5.

## How to run a step

1. **Deploy state.** Check the latest production deployment is READY and its commit includes the
   fix under test. Use the Vercel MCP `list_deployments` tool with project
   `prj_FwjmRdthApGhwdQY7FyDYThD7WJD`, team `team_ZHSoYXkAEang6oq1I9hAPn45`, target
   `production`.
2. **Run** (disposable `qa-*@mytutor-qa.invalid` accounts; no password needed; each account is
   deleted at the end):
   ```
   RUNNER_TOPICS=2 RUNNER_MAX_TURNS=18 RUNNER_MAX_TOTAL_TURNS=180 \
   QA_OUT=<scratchpad>/syn-run-N.json QA_SCORECARD=<scratchpad>/syn-run-N.md \
   npx tsx scripts/qa/synthetic/run.ts
   ```
   - About 20 s per turn; 180 turns is 30–60 minutes. Run it in the background.
   - Combine runs with: `npx tsx scripts/qa/synthetic/scorecard.ts a.json b.json c.json`
3. **Read the findings** in the run file (`lessons[].findings`, `lessons[].turns`). Read the
   transcripts of critical findings before believing them. A check can be wrong; if it is, fix the
   check and add a test.
4. **Fix at the shared cause.**
   - Reproduce with the production text against the real module.
   - Add a test with that text.
   - Then run `npx tsc --noEmit`, the full `npx vitest run`, and `npm run build`.
5. **Commit and push:**
   `git push origin HEAD:main && git push origin HEAD:claude/physics-master-completion-u7wgrl`.
   While a before-run is in flight, push only to the feature branch, because production deploys
   from `main`.
6. **Record** the run's scorecard and findings as a dated section in
   `docs/history/synthetic-students.md`, then **update the LIVE STATE table above**.

## Egress guard (owner: "keep egress size under free tier" — standing, checked every iteration)

5 GB/month Supabase free tier. The Supabase usage meter is not queryable from a session, so each
run is measured with the `pg_stat_statements` delta method from `docs/history/egress-incidents.md`.
It counts rows returned (cumulative since project creation, never reset).

1. **Before a run:** snapshot the totals and the top queries (read-only, tiny result):
   ```sql
   select now() as at, sum(calls)::bigint as calls, sum(rows)::bigint as rows,
     (select json_agg(t) from (select left(regexp_replace(query,'\s+',' ','g'),90) as q, calls, rows
        from pg_stat_statements order by rows desc limit 10) t) as top
   from pg_stat_statements;
   ```
2. **After the run:** snapshot again. Rows per synthetic turn = Δrows / turns. Estimate bytes at
   about 300 B/row; `spine_events` measured about 470 B/row.
3. **Stop rule:**
   - If a run's estimated egress exceeds **50 MB**, pause further runs.
   - Also pause if the daily total trends above about **150 MB/day** (≈ 4.5 GB/month).
   - Then find the query that grew in the top-10 delta before running again.
   - Never add per-turn DB reads. The runner itself reads no DB.
4. The Supabase dashboard also costs egress: every page load runs `pg_timezone_names`. Keep that
   tab closed.

| Snapshot | At (UTC) | calls | rows | Note |
|---|---|---|---|---|
| E0 | 2026-09-24 18:41:52 | 10,355,126 | 188,905,370 | after the S4 baseline |
| E1 | 2026-09-24 19:04:00 | 10,355,590 | 188,905,885 | start of the S6 after-run; +515 rows in 22 idle minutes, so background traffic is negligible |
| E2 | 2026-09-24 19:40:08 | 10,383,880 | 189,022,806 | end of S6: +116,921 rows over ~120 turns, about 35 MB. Today so far: 2 runs, about 70 MB |
| E3 | 2026-09-24 19:48:30 | 10,384,238 | 189,023,228 | start of after-run 2 (+422 idle) |
| E4 | 2026-09-24 20:28:44 | 10,414,424 | 189,133,335 | end of after-run 2: +110,107 rows / 126 turns, about 33 MB. **Today: 3 runs, about 103 MB. One more run allowed today (cap about 150 MB/day)** |
| E5 | 2026-09-24 20:58:16 | 10,414,791 | 189,134,610 | start of after-run 3 (+1,275 idle over 30 min) |
| E6 | 2026-09-24 21:26:12 | 10,437,240 | 189,204,805 | killed part of after-run 3: +70,195 rows / ~95 turns, about 21 MB |
| E7 | 2026-09-24 21:32:06 | 10,442,535 | 189,212,382 | off-track re-run: +7,577 rows / 22 turns, about 2 MB. **Today: about 126 MB. No more runs today** |
| F0 | 2026-09-25 00:16:47 | 10,442,945 | 189,213,160 | new UTC day; +778 rows overnight |
| F1 | 2026-09-25 00:46:38 | 10,470,441 | 189,305,444 | readiness run 2: +92,284 rows / 116 turns, about 28 MB |
| F2 | 2026-09-25 01:29:00 | 10,497,795 | 189,341,815 | readiness run 3: +36,371 rows / 116 turns, about 11 MB. **Today: about 39 MB** |
| F3 | 2026-09-25 01:59:44 | 10,526,228 | 189,430,620 | acceleration + kinematics-1d run 1: +88,805 rows / 116 turns, about 27 MB. **Today: about 66 MB** |
| F4 | 2026-09-25 02:46:24 | 10,554,623 | 189,498,627 | acceleration + kinematics-1d run 2: +68,007 rows / 116 turns, about 20 MB. **Today: about 86 MB** |
| F5 | 2026-09-25 03:27:24 | 10,582,795 | 189,522,853 | acceleration + kinematics-1d run 3 (+ idle): +24,226 rows, about 7 MB. **Today: about 93 MB** |
| F6 | 2026-09-25 04:00:48 | 10,610,301 | 189,587,947 | force + newtons-first-law run 1: +65,094 rows / 116 turns, about 20 MB. **Today: about 113 MB; one more run allowed** |

## Rules that bind this work

- **Egress:** 5 GB/month Supabase.
  - The runner reads no DB, but every turn costs what a learner's turn costs.
  - Keep `RUNNER_MAX_TOTAL_TURNS` at 180 or below per run, and no more than about 3 runs a day
    without checking the Supabase usage page.
  - Any SQL must be aggregate-only. Never add per-turn DB reads.
- **Governance:** fixing a detection or delivery bug is in scope. A change to assessment policy
  (mastery bar, what counts as evidence, question selection) needs owner approval first
  (CLAUDE.md G1/G2).
- **Accounts:** use disposable accounts only. Never write any real account's password anywhere.
  `suaibamr@gmail.com` is physics-saturated.
- **Branches:** `main` plus the feature pointer. Never force-push. No PRs unless asked.
- **Reporting:** every turn ends with the CLAUDE.md report (one fenced block, git info).
- **No AI key in the container.** Students are rule-based, and the model-based factual marker is
  not built. It needs a key added to the environment secrets by the owner.

## OWNER DECISION NEEDED (2026-09-25) — the held question's answer in the teaching

The leak guard hides the answer only on the turn the server attaches a question. While the question
stays on screen unanswered, the tutor's reply can state the answer (S8b: "acceleration — how velocity
changes"). Extending the guard to every held turn is NOT safe as-is: on an acceleration lesson every
explanation mentions velocity, so an "I'm lost, explain differently" turn would lose its teaching.
Options:

- **A (recommended):** extend the guard to held turns *except* when the learner asked for help
  (lost / explain / example). Side questions, "will this be on the exam?", chit-chat: answer sentences
  dropped. Help requests: the teaching stays — and then the held question is **released** (not
  graded, the next authored question is used), so a question whose answer was just taught never
  produces mastery evidence.
- **B:** extend the guard to all held turns (strictest; costs teaching on help turns).
- **C:** leave as is (the checker keeps reporting it as critical, so acceleration cannot pass
  readiness while this path occurs).

This changes what counts as evidence, so it is CLAUDE.md G2 — not implemented without approval.

## DONE — owner-approved 2026-09-24 ("Approved, implement the TRANSFER fix")

**TRANSFER below the verified bar.**

- `conversationState.ts`: `transferBelowVerifiedBar()`. At TRANSFER a server-graded right answer
  tops up the lowest unmet verified counter — CHECK first — never past the bar and never past
  plain.
- `route.ts`: at TRANSFER below the bar, `phaseAllowsProbe`, `probeAttachablePhase` and
  `probeWouldCountThisPhase` let authored questions attach.
- Tests: `src/tests/transferBelowVerifiedBar.test.ts`.

## Known open defects (from the S2 smoke run; check whether S6 still shows them)

- "Here is your next question." after an answer, with no verdict (`no-feedback-on-answer`).
- A check announced but never asked: "Got it—let's jump right in with a quick check."
  `dropUndeliveredCheckAnnouncements` in `src/lib/teaching/gateAssessment.ts` misses "jump right
  in with a quick check".
- Content-free replies: "I hear you — let's keep things moving forward."
- At CHECK after three right answers, no question was served even before the repeats started.
  Check whether S3 alone fixes this.
