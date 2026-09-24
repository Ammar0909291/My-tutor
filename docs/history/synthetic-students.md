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
