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
| S5 | Push S3 + baseline fixes (verdict after gate-contract replacement, "Got it" announcement, `asksForPractice` next-question/check-me) to `main`; confirm the deploy is READY | **in progress** |
| S6 | After-run: the same 2 topics × 5 students on the fixed build; compare with S4 | pending |
| S7 | Fix the top remaining defect class from S6, validate, deploy, re-run. Known candidates: (a) the ladder stays frozen when the learner answers the lesson's own held question during an excursion (`route.ts` `excursionFrozeLadderThisTurn`; touches evidence, so needs care and tests); (b) the KG-description fallback repeats verbatim turn after turn | pending |
| S8 | Widen to more launch topics (`RUNNER_TOPICS=6`, then more) within the egress cap | pending |

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

## Known open defects (from the S2 smoke run; check whether S6 still shows them)

- "Here is your next question." after an answer, with no verdict (`no-feedback-on-answer`).
- A check announced but never asked: "Got it—let's jump right in with a quick check."
  `dropUndeliveredCheckAnnouncements` in `src/lib/teaching/gateAssessment.ts` misses "jump right
  in with a quick check".
- Content-free replies: "I hear you — let's keep things moving forward."
- At CHECK after three right answers, no question was served even before the repeats started.
  Check whether S3 alone fixes this.
