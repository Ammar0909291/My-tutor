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

## 2026-09-24 — After-run 2 (production `dc07f2d`: arbitration fix `ae9caf6`)

126 turns, 5 disposable accounts deleted, egress E3 → E4 = +110,107 rows (about 33 MB).

| Student | displacement | velocity |
|---|---|---|
| beginner | mastered, 12 turns | mastered, 12 turns |
| careless | mastered, 11 turns | mastered, 11 turns |
| strong | mastered, 9 turns | mastered, 9 turns |
| confused | **mastered, 15 turns** (was stuck) | **mastered, 15 turns** |
| offtrack | mastered, 14 turns | not mastered, 18 turns, stuck at TRANSFER 1/1 |

**9/10 mastered** (baseline 4/10, after-run 1 8/10).

The one critical finding, `answer-leak`, was a checker false positive. The answer was the lesson's own
concept name ("Displacement — a vector…", lesson "Displacement and Distance"), named by the authored
explanation above the question. The server guard `dropAnswerLeaks` had the same weakness, so on
another path it could have stripped every teaching sentence that names the concept.

The off-track velocity failure had two causes, both from production `TURN_EVENT`s for that session:

1. `ANSWER_ATTEMPT … server-key true … excursionActive true`: the lesson's own on-screen question,
   answered correctly during a side-question excursion, got no credit (every excursion turn freezes
   the ladder).
2. `PRACTICE_REQUEST PRACTICE -> TRANSFER, gradeSource none, signalSuppressedReason null`: on "ok,
   next question please" the model's own SIGNAL said correct, and the plain counter moved the
   lesson to TRANSFER below the verified bar. TRANSFER adds no credit of any kind, so mastery
   became unreachable.

Fixes:

- **Practice request.** A practice request never carries self-reported correctness
  (`practice-request-not-an-answer`, before the ladder and before `PROBE_OUTCOME`).
- **Excursion.** `ExcursionState.heldQuestion` records the lesson question on screen when an
  excursion opens. Answering exactly that question closes it as `closed-answered-lesson`, and
  `turnCountsForLesson` counts that turn for the lesson. It survives `parseExcursionState`.
- **Concept name.** `dropAnswerLeaks(text, mcq, conceptTitle)` and the runner's check skip an
  answer that is the lesson's own concept name.

Not done, and flagged for the owner: **TRANSFER below the verified bar.** Plain counters (which
include model self-reports on genuine prose answers) can carry a lesson PRACTICE → TRANSFER while
verified practice is below 2. After that no counter moves and the gate attaches no authored
question (TRANSFER is not a mastery-gate phase), so verified mastery is unreachable. Rule-based
students cannot answer prose questions, so the runner under-samples this. Real learners who answer
the tutor's prose questions would hit it.

Proposed fix, which changes the ladder and so needs review:

- At TRANSFER, while verified CHECK < 1 or verified PRACTICE < 2, let the gate attach authored
  questions.
- Let a server-graded correct answer top up the lowest unmet verified counter.

## 2026-09-24 ~21:00-21:32 UTC — after-run 3 (production `1e14df3`: fixes `49efe8f` heldQuestion/practice-request + `db78d8a` TRANSFER below the verified bar)

Same 2 topics (displacement, velocity) × 5 students.

| Student | displacement | velocity |
|---|---|---|
| beginner | mastered (12 turns, v=1/2) | mastered (12, v=1/2) |
| careless | mastered (11, v=2/2) | mastered (11, v=2/2) |
| strong | mastered (9, v=1/2) | mastered (9, v=1/2) |
| confused | mastered (15, v=2/2) | mastered (15, v=2/2) |
| offtrack | mastered (11, v=1/2) | mastered (11, v=1/2) |

**10/10 mastered, 0 critical, 0 major, 1 minor** (`ungradeable-question`: a model-written question at CHECK on the turn the learner answered the held question). Trend: baseline 4/10 (12 critical) -> after-run 1 8/10 (1) -> after-run 2 9/10 (1) -> after-run 3 10/10 (0).

Off-track evidence that the fixes work: turn 11 ("5 km — the straight-line separation…", answered while the favourite-physics-fact detour was open) moved PRACTICE v=1/1 -> TRANSFER v=1/2, i.e. the answer to the held lesson question was credited and certified the lesson.

Operational: a container restart killed the run after 8 lessons (the run JSON was not written; the per-turn log survived). The off-track student was re-run alone (`RUNNER_PERSONAS=offtrack RUNNER_MAX_TOTAL_TURNS=40`). The killed part's 4 disposable accounts were not deleted.

Egress: E5->E6 +70,195 rows (~21 MB, 8 lessons), E6->E7 +7,577 rows (~2 MB, 2 lessons). Day total about 126 MB (< 150 MB/day cap).

Checker fix (`1b576c2`): both after-run 2 `announced-not-asked` majors were false positives (a conditional offer; "Quick check:" followed by a question). The check now requires no question after the announcement and no offer lead-in.

Next: readiness runs 2 and 3 after midnight UTC; then widen to `RUNNER_TOPICS=6`.

## 2026-09-25 00:16-01:29 UTC — readiness runs 2 and 3 (production `dd31beb`)

| Run | Mastered | Critical | Major | Minor |
|---|---|---|---|---|
| 1 (= after-run 3, 2026-09-24) | 10/10 | 0 | 0 | 1 |
| 2 | 10/10 | 0 | 0 | 1 (`ungradeable-question`) |
| 3 | 10/10 | 0 | 1 (`content-free-reply`) | 2 (`ungradeable-question`) |

**phys.mech.displacement and phys.mech.velocity are READY** by the scorecard rule (3 runs, every student masters, 0 critical). Median turns to verified mastery: strong 9, careless 11, off-track 11, beginner 12, confused 15. Every disposable account deleted and re-login blocked in runs 2 and 3.

Run 3's major, traced in the Vercel log (session `cmug9b3bj…`, 01:06:40): confused student's second "I don't know" -> recovery turn; the model returned 377 chars; `[dont-know-ceiling] {"reason":"question-withheld","run":2}` removed the question and everything sharing its paragraph, leaving "I hear you—it's completely okay to feel stuck. Let's take a tiny step together." A reconstruction with two teaching sentences before the question is already kept correctly, so the real text was likely a single teaching sentence + question (the documented known cost in `trimTrailingQuestions`) or a pure-question paragraph. Not fixed on a guess; the ceiling log now records the text it cut. Recurring minor: `ungradeable-question` on the turn the off-track student answers the held question (the model writes its own question at CHECK).

Egress: run 2 ~28 MB, run 3 ~11 MB (F0-F2).

## 2026-09-25 01:29-02:10 UTC — widening: acceleration + kinematics-1d run 1 (production `651276f`)

10/10 mastered (median turns: strong 9, careless 11, off-track 11, beginner 12, confused 15), 0 critical, 0 major, 2 minor. Egress ~27 MB (F2->F3).

The recurring minor `ungradeable-question` (off-track, turn 5, on all four topics so far) turned out to be a real verdict defect. Production log (session `cmugb4zkl…`, 01:54): `gradeSource: server-key, gradedCorrect: true`, model reply in full: "So you calculated the train's average acceleration as 3 metres per second squared, right? Is that correct?", and `[c5] {"event":"servedGradedCorrect","confirmed":true}`. `confirmCorrectAnswer` skipped its prepend because `CONFIRMS_CORRECT` matched `\bcorrect\b` inside the question. The learner was asked to grade their own right answer; the verdict arrived a turn late. Fix: `statesCorrect()` in `answerConfirmation.ts` tests the same regex against statements only (sentences not ending in "?"); used by the enforcer and the `[c5]` telemetry. The regex itself is unchanged (`confirmationDetectorParity` pins it to `scripts/qa/rubricScore.ts`). Note: the QA scorer's C5 criterion still counts "Is that correct?" as confirmed.

## 2026-09-25 02:10-03:30 UTC — acceleration + kinematics-1d runs 2 and 3

| Run | Build | Mastered | Critical | Major | Minor |
|---|---|---|---|---|---|
| 1 | `651276f` | 10/10 | 0 | 0 | 2 (verdict defect, fixed in `dbd3b77`) |
| 2 | `dbd3b77` | 10/10 | 1 (`answer-leak`, acceleration) | 0 | 1 |
| 3 | `dbd3b77` | 10/10 | 0 | 1 (`announced-not-asked`) | 0 |

**kinematics-1d READY.** Acceleration blocked by run 2's critical. The authored question "Acceleration is defined as the rate of change of which quantity?" (key: velocity) was held on screen, and the reply to "will this be on the exam?" said "understanding acceleration — how velocity changes with time". The leak guard covers only a question attached this turn. Extending it to held turns would strip real teaching on help requests, so it went to the owner as a decision (handover: OWNER DECISION NEEDED).

Run 3's major: "can you quiz me?" -> "Sure! Here's a quick check on acceleration:" + figure pointer, no question. Fixed in `gateAssessment.ts` (`announcesACheck`, noun-form colon announcements); cause: the figure pointer is appended before the delivery contract, so the trailing-colon rule no longer saw a trailing colon.

Egress: run 2 ~20 MB, run 3 ~7 MB. Day total ~93 MB.
