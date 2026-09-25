# Handover — synthetic students on the physics mechanics launch set

For any Claude session (any account) continuing this work with no prompt from the owner. Read this
file, then `CLAUDE.md`, then `docs/history/synthetic-students.md` (the tool and every run's
findings) and `docs/architecture/ARCHITECTURE_ROADMAP_TO_10.md` §0 (the owner decisions).

## STOP — synthetic runs paused (2026-09-25 04:30 UTC): Groq spend limit reached

Production log, every Groq attempt since ~04:00 UTC: `400 spend_limit_reached — "Organization has
blocked API access because a spend alert threshold was met. Please visit
https://console.groq.com/settings/billing to manage your spend alerts."` Failover works (Gemini
serves every turn, `gemini-3.5-flash-lite`), so learners still get answers — but this is the
single-provider position of the 2026-08-20 outage (CLAUDE.md), with OpenRouter as the only backstop.

The synthetic runs are a likely contributor: each run is ~116 turns × ~10k prompt tokens (~1.2M
tokens), and ~9 runs happened between 2026-09-24 18:00 and 2026-09-25 04:30 UTC.

Status checks (owner loop "keep updating handover file"): 2026-09-25 ~04:35 UTC — Groq still `spend_limit_reached` (118 refusals in the last 30 min, all from run 2); Gemini serving.

2026-09-25 05:33 UTC — no AI calls in production in the last hour (no traffic), so Groq's state is unobserved; last seen blocked at ~04:27. Egress idle: rows 189,640,604 (+707 since F7). Runs still paused.

2026-09-25 ~06:15 UTC — owner said "keep working" (no Groq/billing decision yet), so work continued WITHOUT runs:
- **Runner provider guard** (`scripts/qa/synthetic/run.ts`): `RUNNER_ALLOWED_PROVIDERS` (default `groq,memory`) and `RUNNER_MAX_OFF_PROVIDER_TURNS` (default 2). Two consecutive turns served by any other provider stop the whole run; those lessons are left out of the scorecard. The run file is now written after every lesson (a container restart can no longer lose a run's results).
- **Phantom simulation claim** (`visualRegistry.ts`): "…the 3D Newton's Forces simulation on your screen." with nothing attached is now stripped; simulation/animation/visualization added to the present-tense claim patterns (not to `VISUAL_PROMISE_RE`, which drives force-rendering).
- When the owner clears the stop, the guard makes the next run safe: if Groq is still blocked, the run ends after 2 turns instead of spending Gemini's quota.

2026-09-25 ~06:30 UTC — two more notes:
- **Vercel log queries now fail with `ExceedsBillingLimitError`** (runtime-logs API). Log-based diagnosis (TURN_EVENT, `[c5]`, `[dont-know-ceiling]`) is unavailable until that limit resets or the owner raises it. Do not retry in a loop.
- **The runner's `figure` field is per-turn only.** Replaying all 1,317 recorded replies through `stripPhantomVisualClaims` flags 57 sentences on `figure:false` turns, but most say "diagram … on your screen" — which the OLD pattern already matched — and still reached the learner, so production had a graphical decision on those turns (a figure sent on an earlier turn, still visible). So `figure:false` ≠ nothing on screen, and the `phantom-figure` check (which requires no figure earlier in the lesson) remains the right checker rule. The new simulation/animation nouns only act when the server itself decided no visual this turn — the same rule the old nouns always followed. Whether the N1L t5 turn was graphical could not be confirmed (logs blocked).

2026-09-25 07:14 UTC — owner said "Go"; readiness run 3 (force + newtons-first-law) started under the new provider guard and **stopped itself after 3 turns** (2 consecutive Gemini turns): **Groq is still blocked.** Cost: 3 turns, 1 disposable account (deleted, re-login blocked). Egress rows 189,642,408 before. Future runs are safe to attempt: the guard ends them within 2 turns while Groq is down.

2026-09-25 07:50 UTC — owner: "Try to avoid vercel and keep studying n fixing" → no Vercel tools (logs/deployments); runs allow Gemini (`RUNNER_ALLOWED_PROVIDERS=groq,gemini,memory`), OpenRouter still excluded (last backstop); deploys verified by waiting ~6 min after a push instead of the Vercel API. Owner then: **physics → chemistry → English; no biology/maths.** Egress 2026-09-25 ≈ 159 MB (slightly over the ~150 guideline) — no more runs until 00:00 UTC.
Open (not fixed, needs the model's raw text which only the Vercel logs hold): the tutor's text sometimes sets up a scenario that does not match the attached authored question ("Imagine two people pushing a box … 10 N and 15 N." above a motion-misconception MCQ). Likely the model's own question was withheld and `trimTrailingQuestions` kept its setup sentences.

**Do not start another run until the owner has (1) decided on the Groq spend alert/billing and
(2) set a token budget for synthetic runs.** Further runs would now spend the Gemini quota that
real learners depend on. The runner has no provider budget of its own — adding one (e.g. a
`RUNNER_MAX_TOKENS` estimate and a pre-run provider health check) is a sensible next step.

## Egress budget (owner, 2026-09-25 12:30 UTC): "Go with physics. It's okay until egress 1gb" — synthetic runs may continue until the day's egress reaches ~1 GB (was ~150 MB/day). Keep measuring every run.

## Subject order (owner, 2026-09-25) — binding

**Physics first, then chemistry, then English. Do NOT study biology or mathematics.** Finish the
physics mechanics launch set (26 topics) before moving to chemistry; English after chemistry. The
runner is physics-only today (`LAUNCH_SUBJECT='physics'`); chemistry needs its own launch set and
answer-key wiring before it can run.

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
| S9 | Next pair: `phys.mech.force,phys.mech.newtons-first-law`, 3 runs (then newtons-second/third-law, …). Launch-set status: READY = displacement, velocity, kinematics-1d; blocked = acceleration (owner decision) | run 1 (prod `b382d17`): **10/10 mastered, 0 critical, 0 major**, 1 minor. Run 2: **10/10 mastered, 0 critical**, 1 major (`announced-not-asked`: Gemini wrote "Let's check how this applies to a brand-new scenario with the 3D Newton's Forces simulation on your screen." — the `ANNOUNCES_A_CHECK` tail is capped at 80 chars; this one is ~85), 3 minor. **Every turn of run 2 was served by Gemini** — see STOP below Run 3 (07:15-07:48 UTC, Gemini-served, `RUNNER_ALLOWED_PROVIDERS=groq,gemini,memory` by owner "Go"/"keep studying"): **10/10, 0 critical, 0 major, 0 minor → force + newtons-first-law READY** |
| S10 | Newton's second + third law (owner: "Keep working using Gemini. Use vercel too") | run 1 (08:18-09:00 UTC, prod `9945db4`, Gemini): **10/10 mastered, 0 critical, 0 major**, 1 minor (`ungradeable-question`, strong N2L t5). Runs 2-3 after 00:00 UTC. `[gate-contract]` now logs the model text a withheld question cut (`2604147`) to diagnose the scenario/question mismatch Run 2 (09:49-10:17 UTC, prod `2604147`): **10/10, 0 critical, 0 major**, 2 minor — both checker false positives ("ready?", "have I got that right?"); the checker now uses the production `askedAnswerableQuestion`. The new `[gate-contract]` text logging found a real defect: a rhetorical "how does a rocket accelerate…? It carries its own…" made the stray-question withhold cut a teaching paragraph from 693 chars to 37 — fixed `e9903f0` Run 3 (10:25-10:58 UTC, prod `1a51db9`): **10/10, 0 critical → Newton's 2nd + 3rd law READY**; 2 majors, both fixed the same hour: (a) Gemini wrote `<!--MCq=… correct="A"-->` and it leaked with the answer key — residual sweep now takes mixed-case tag names (`1e9fc47`); (b) "…Imagine you are standing on a skateboard and you throw a heavy medicine ball forward. [question withheld]" left a bare set-up — a scenario opener that ends a paragraph after its question is removed now goes with it |
| S11 | Free-body diagram + normal force, run 1 (prod `f343273`) | **5/10 mastered**, 1 critical, 18 major. Three causes (production TURN_EVENT/arbitration logs): (1) `authored-pool-exhausted` — careless/confused normal-force stuck at verified 2/1: five gradeable probes do not survive one wrong answer → **Batch 17** in `physicsDepthSeedAssets.ts` adds 2 gradeable probes to each concept (only free ladder slots; 0 duplicate identities across 10,409 items; physics contract 261/261); (2) **CLOSING trap** — beginner ×2: two consecutive graded wrongs spend the affect budget, the episode goes CLOSING, every question is blocked (`blockedBy: arbitrationAllowsProbe, notClosingTurn`), a later right answer does not reopen it (by design, pinned by `affectBudgetSpiral.test.ts §H1`) — **OWNER DECISION** below; (3) concept budget closed confused/free-body at t12 right after a wrong answer ("Let's pause … Worth another look later") | Batch 17 deployed but **NOT seeded** — see BLOCKER |
| S12 | Tension + friction run 1 (prod `2d2cc0b`, Gemini) | **6/10 mastered**. Same two causes: pool exhaustion (careless/tension stuck at verified 2/1) and the CLOSING trap (beginner/tension; strong/friction; offtrack/tension). New: the strong student's two "wrong" answers were guesses at **model-invented** MCQs (no authored key — "heavy crate … μ = 0.40, N = 150 N", "normal force for a 10 kg box on a 30° incline"), graded against the model's own key, and they alone spent the affect budget → CLOSING. `applySignalToEpisode` reads `teachingSignal`, so an unauthored-key grade counts as a real failure — added to the CLOSING-trap decision. Checker: `unfair-close` no longer fires when the lesson had unkeyed guesses. Production pool audit (active gradeable HIGH probes): **every** launch topic has only 4-5 (acceleration, impulse, inclined-plane, kinematics-1d, N2L, N3L, normal-force, tension at 4) — pool exhaustion is corpus-wide and needs content + the seeding BLOCKER fixed |

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
| F7 | 2026-09-25 04:28:39 | 10,636,738 | 189,639,897 | force + newtons-first-law run 2: +51,950 rows / 112 turns, about 16 MB. **Today: about 129 MB. Runs paused (Groq spend limit)** |
| F8 | 2026-09-25 07:48:45 | 10,666,449 | 189,742,780 | force + N1L run 3: +100,372 rows since 07:14, about 30 MB. **Today ≈ 159 MB — stop until 00:00 UTC** |
| F9 | 2026-09-25 09:00:06 | 10,696,336 | 189,866,432 | N2L + N3L run 1: +123,652 rows since F8, about 37 MB. **Today ≈ 196 MB (over the 150 guideline, owner-approved) — no more runs until 00:00 UTC** |
| F10 | 2026-09-25 10:17:08 | 10,724,437 | 189,943,031 | N2L + N3L run 2: +76,241 rows since 09:48, about 23 MB. **Today ≈ 219 MB (owner: keep going)** |
| F11 | 2026-09-25 10:58:43 | 10,753,162 | 190,006,866 | N2L + N3L run 3: +63,835 rows, about 19 MB. **Today ≈ 238 MB** |
| F12 | 2026-09-25 11:58:54 | 10,787,678 | 190,106,470 | free-body + normal-force run 1: +99,604 rows, about 30 MB. **Today ≈ 268 MB — runs paused until 00:00 UTC (free-tier rule)** |
| F13 | 2026-09-25 13:12:04 | 10,820,965 | 190,283,563 | tension + friction run 1 (+ bootstrap cold starts): +177,093 rows, about 53 MB. **Today ≈ 321 MB** (owner cap 1 GB) |

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

## DECIDED (owner "Approved", 2026-09-25) — held-question answer leak: option A implemented (`[answer-leak]` guard also covers an authored held question, except help/recovery turns)

### Original write-up

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

## BLOCKER (2026-09-25 12:15 UTC) — new seed content is not reaching production

Batch 17 (4 new physics probes, `2d2cc0b`) is deployed (READY) but its rows are absent from
`asset_identity` after three cold starts. The maths `math.de` batches committed 2026-09-24 04:07 UTC
(`eabba05` and earlier) have **zero rows** in production after 30+ hours. Every retained cold-start log
reads `asset bootstrap: 12000ms boot deadline reached — continuing in the background; the next cold
start resumes`.

Likely cause (from `src/instrumentation.ts`'s own comments): the bootstrap gets a bounded 12 s slice per
cold start, most of it fixed cost BEFORE the first write (Prisma connect, evaluating the seed source,
validating identities). The deadline was measured against 1.37 MB of seed source; it is now **11.9 MB**
(10,409 items). If the fixed cost now exceeds 12 s, no cold start ever reaches a write, and every new
seed item — any subject — stays unseeded.

Measured 2026-09-25 (local, no DB): loading + validating the full seed corpus (`seed-knowledge-assets.ts --draft --dry-run`) takes ≈ 7.8 s over a 0.8 s tsx baseline. Production adds Prisma connect + a cross-region DB and cold-start CPU, so the fixed cost plausibly consumes most or all of the 12 s slice before the first write — consistent with the zero-rows evidence, not yet proof.

Also found: `phys.mech.normal-force:misconception_probe:en:high` is DEPRECATED in production, so normal
force had only FOUR active gradeable probes (not five) — why it ran out first.

Options (owner — production state / egress-sensitive code, not changed unilaterally):
- **A:** raise `ASSET_BOOTSTRAP_DEADLINE_MS` (Vercel env) enough for one cold start to finish, then lower
  it again. Costs one slow cold start.
- **B:** make the bootstrap scope its fixed cost (load only subjects whose expected-slug count differs)
  — code change in `instrumentation.ts`; read `docs/history/egress-incidents.md` first.
- **C:** owner-authorized SQL insert of the missing rows generated from the seed files (the biology
  2026-09-22 precedent).

Until this is fixed, content additions (including Batch 17) do not help learners, and the
free-body/normal-force re-runs would measure the old pool.

## DECIDED (owner "Approved", 2026-09-25) — the CLOSING trap: option A implemented (`sessionLifecycle.closedBy`, spiral closes reopen on an authored right answer, explicit closes stay final, unauthored grades do not spend the budget)

### Original write-up

After two consecutive graded wrong answers the session episode goes CLOSING ("affect budget spent",
`sessionLifecycle.applySignalToEpisode`). CLOSING blocks every question (turnArbitration CLOSE +
`closingTurnWithholdsQuestion`) and has no exit by design. Measured (synthetic run, free-body diagram
and normal force, beginner): the learner then answered correctly and asked "can you test me with a
question?" three times; each got re-teaching or "have I got that right?", and the lesson ended without
mastery. The lesson itself never closes, so the learner is stranded rather than wound down.
Options:
- **A (recommended):** a GRADED-CORRECT answer while CLOSING, followed by an explicit practice request,
  reopens the episode to CORE (the spiral is over; the learner asked). Explicit "I'm done" closes stay
  absolute (`forceClosing` is untouched).
- **B:** CLOSING actually closes: deliver the close + "come back later" and end the lesson, instead of
  continuing to teach with questions blocked.
- **C:** keep as is.

Related (2026-09-25, tension/friction run): a wrong tap on a MODEL-INVENTED question (no authored key) also spends the affect budget, because `applySignalToEpisode` reads `teachingSignal`. Option A should also say: only authored-key grades spend the budget.

This changes when the tutor stops assessing, so it is CLAUDE.md G2 — not implemented without approval.

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
