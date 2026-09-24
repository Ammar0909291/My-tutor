# Synthetic students on the launch set

Started 2026-09-24. Owner decisions that set this up: no school boards; launch with physics
mechanics; there is no real traffic yet because the product is not ready for learners, so synthetic
students stand in for it (`docs/architecture/ARCHITECTURE_ROADMAP_TO_10.md` §0, items 0.7 / 0.8).

## The tool

`scripts/qa/synthetic/`:

| File | What it holds |
|---|---|
| `launchSet.ts` | The 26 `phys.mech.*` launch topics, foundational → proficient, in prerequisite order (pinned by `src/tests/syntheticStudentRunner.test.ts` against `docs/physics/kg/graph.json`). |
| `personas.ts` | Five rule-based students: beginner (misconception answers), careless (slips, typed numbers), strong (always right), confused (distress, diagram requests), off-track (side questions while a question is on screen). |
| `checks.ts` | Per-turn defect checks from the outside, each one a defect already seen in production. |
| `scorecard.ts` | Readiness per topic: 3 runs, every persona masters every time, zero critical defects. Combines run files: `npx tsx scripts/qa/synthetic/scorecard.ts a.json b.json c.json`. |
| `run.ts` | Drives disposable accounts against the deployed app; capped turns; deletes each account and proves re-login is blocked. |

Run it:

```
RUNNER_TOPICS=2 RUNNER_MAX_TURNS=18 RUNNER_MAX_TOTAL_TURNS=180 \
QA_OUT=run.json QA_SCORECARD=scorecard.md npx tsx scripts/qa/synthetic/run.ts
```

- `RUNNER_TOPICS` is the first N launch topics, or a comma list of ids.
- `RUNNER_PERSONAS` defaults to all five.
- A turn takes about 20 s against production: each one waits for the real tutor reply, and the
  runner pauses between turns for provider rate limits. 180 turns is about an hour.

**Why rule-based, not model-driven.** This container has no AI key. Deterministic students also make
the scorecard a regression instrument: the same run sends the same messages, so a changed result is
a changed tutor. What they cannot do is answer the tutor's own free-text questions sensibly; they
ask to be checked with a question instead. A model-driven student and a model-based marker for
factual errors need an AI key added to the environment's secrets.

**Egress.** The runner never reads the database. Each turn costs what a real learner's turn costs
(5 GB/month Supabase quota), so keep the turn caps small and check the Supabase usage page after
large runs.

## 2026-09-24 — smoke run (1 lesson) and the first defect found

- **Run:** strong student, `phys.mech.displacement`, production at `aace297`.
- **What happened:**
  - The student answered three questions right: OBSERVE → DEMONSTRATE → GUIDE → CHECK.
  - At CHECK no question came. "can we move faster? give me a question", sent 6 times, walked the
    ladder CHECK → GUIDE → DEMONSTRATE.
  - The tutor produced "Got it—let's jump right in with a quick check." with no question, and
    "I hear you — let's keep things moving forward."
  - The lesson closed with "Let's pause Displacement and Distance here for now. Worth another look
    later" — for a student who never answered wrong.
- **Root cause:** `recoveryGuard.isNextItemRequest` only matched a request at the start of the
  message.
  - "can we move faster? give me a question", "got it. test me please" and "cool. ok test me" were
    not requests.
  - Repeated, each read as 'frustrated'; recovery refused every question and stepped the phase
    down.
  - This is the same class as the "can you test me?" pilot finding.
- **Fix:** each clause after the first is also tested when it names what is asked for.
- **Checks added from this run:** `demoted-without-wrong-answer`, `question-request-ignored`,
  `announced-not-asked`, `no-feedback-on-answer`, `content-free-reply`, `unfair-close`.

## 2026-09-24 — Before-baseline: 2 topics × 5 students (production `aace297`, before any fix)

`RUNNER_TOPICS=2 RUNNER_MAX_TURNS=18 RUNNER_MAX_TOTAL_TURNS=180`: 128 turns, about 32 minutes, 5
disposable accounts, all deleted with re-login blocked.

| Student | displacement | velocity |
|---|---|---|
| beginner | mastered, 12 turns | mastered, 16 turns |
| careless | mastered, 11 turns | mastered, 11 turns |
| strong | closed unmastered (demoted CHECK→DEMONSTRATE) | same |
| confused | stuck at DEMONSTRATE, 0/0 | same |
| offtrack | stuck at PRACTICE, 1/1 | same |

4/10 lessons mastered. 12 critical findings in 128 turns: 6 `demoted-without-wrong-answer`, 4
`stuck`, 2 `unfair-close`. Major: 45 `question-request-ignored`, 4 `content-free-reply`, 3
`repeated-reply`, 2 `no-feedback-on-answer`, 2 `announced-not-asked`, 2 `correct-not-credited`,
1 `degraded-turn`.

Causes found by reading the transcripts:

1. **Strong.** "can we move faster? give me a question", repeated, was read as frustration. The
   smoke-run defect; fixed in `a029624`.
2. **Confused.**
   - The tutor asked in prose at GUIDE ("where does the point end up?"). A rule-based student
     cannot answer that, so it kept asking for a question. That part is a runner limit.
   - The tutor then never served a question in 7 requests.
   - It repeated the KG-description fallback "Displacement is the vector change in position while
     distance is the total scalar path length." four times. That is the `conceptFallbackText`
     net: better than "Let's stay with this idea", but still content-free when repeated.
   - "can you check me with a question?" was not a practice request (`asksForPractice`).
3. **Off-track.**
   - After "what's your favourite physics fact?" a side-question excursion opened.
   - The learner then answered the lesson's own on-screen question right: "That's right.", but no
     credit, because the ladder is frozen for every excursion turn (`route.ts`
     `excursionFrozeLadderThisTurn`).
   - "ok, next question please" ×5 got five different favourite physics facts. That message is
     not a practice request, so the `closed-wants-practice` exit never fired.
4. **Gate-contract replacement.** When the model wrote its own competing question, the reply was
   replaced by the bare "Here is your next question.", dropping the verdict already added.
5. **Announcement filter.** "Got it—let’s jump right in with a quick check." slipped through
   because "Got it" was not an allowed lead-in.

Fixed after this run: 1 (`a029624`), 2 and 3's request detection (`asksForPractice` +
"next/another/new question", "check me / check my understanding"; "check" added to the negation
guard), 4 (the verdict is re-applied after the gate-contract replacement), and 5 (lead-in list).

Still open: the ladder stays frozen when the learner answers the lesson's own held question during
an excursion. This touches what counts as evidence, so it is its own step. The same goes for the
repeated KG-description fallback.

## 2026-09-24 — After-run 1 (production `1f438cd`: fixes `a029624` + `f6281f8`)

Same set as the baseline: 120 turns, 5 disposable accounts, all deleted.

| Student | displacement | velocity |
|---|---|---|
| beginner | mastered, 17 turns | mastered, 15 turns |
| careless | mastered, 11 turns | mastered, 11 turns |
| strong | **mastered, 11 turns** (was closed unmastered) | **mastered, 11 turns** |
| confused | stuck at GUIDE | closed unmastered |
| offtrack | **mastered, 14 turns** (was stuck) | **mastered, 9 turns** |

**8/10 mastered (was 4/10). Critical findings: 1 (was 12).**

Remaining cause, from the Vercel `[arbitration]` and `[gate-eligibility]` logs: a practice request
that carries a "?" claims the LEARNER_QUESTION rung, which denies AUTHORED_PROBE (`blockedBy:
["arbitrationAllowsProbe"]` at CHECK and GUIDE). Two measured examples:

- "can we move faster? give me a question" — delayed the strong student by 2 turns
- "can you check me with a question?" — kept the confused student stuck

The same turn read `PRACTICE_REQUEST`. Fix: `genuineQuestionActive … && !turnIntent.wantsPractice`.

**Egress:** E1 → E2 = +116,921 rows over about 120 turns, about 975 rows/turn, so about 35 MB per
run at about 300 B/row. That is under the 50 MB per-run cap; about 4 runs/day fit in the 150 MB/day
guard.
