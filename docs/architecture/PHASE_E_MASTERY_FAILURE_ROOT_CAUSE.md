# Phase E — root cause of the 3/4 mastery failure

**Status: investigation complete. No production code changed. No fix implemented.**

Reproduction: `npx tsx scripts/qa/phase-e-ladder-repro.ts` (no provider, no database,
no network — it imports the real production modules and is deterministic).
Live evidence: the Phase E run #2 transcript on deploy `cedd8cc`, four lessons,
`chem.bond.vsepr` MASTERED and `phys.mech.rolling-motion` / `phys.qm.particle-in-box` /
`chem.bond.mo-theory` closed on budget at `check=0 practice=0`.

---

## A. Root cause, in one sentence

The ladder can only climb on two inputs — a **server-graded correct answer** or an
**acknowledgement** — and for the learner this product exists for **both are
unavailable below GUIDE**: the authored-probe gate is structurally forbidden from
attaching a gradeable question at OBSERVE or DEMONSTRATE, and the acknowledgement
detector does not recognise that learner's acknowledgements, so the number of rungs
a lesson can climb collapses to the number of questions the *model* happened to
volunteer — 2 or 3, against a 6-rung ladder.

## B. The chain, each link measured

| # | Link | Evidence |
|---|------|----------|
| 1 | Mastery needs 6 rungs: OBSERVE→DEMONSTRATE→GUIDE→CHECK, then 1 correct at CHECK and 2 at PRACTICE. | Section C of the repro: a learner who answers correctly on **every** turn needs **6 turns** minimum. Budget is 12. |
| 2 | A rung moves on exactly two inputs. | `advanceConversationState`: the `succeeded` switch and the `else if (evidence.acknowledgement)` switch. Nothing else moves a phase upward. |
| 3 | Below GUIDE there is no deterministic gradeable question. | `gateAssessment.isProbeAttachablePhase` = `GUIDE \|\| CHECK \|\| PRACTICE`. At OBSERVE and DEMONSTRATE the authored gate cannot fire, so a graded answer depends on the model volunteering an MCQ. |
| 4 | So below GUIDE the acknowledgement is the **only** deterministic rung-mover. | Follows from 2 + 3. |
| 5 | This learner's acknowledgements are invisible. | `isLowSignalAcknowledgement('ok') === true`; `isLowSignalAcknowledgement('ok sir') === false`. Same for `got it sir`, `yes sir`, `okay sir`. `LOW_SIGNAL_TOKENS_RE` is a whole-string anchored match over a closed token list containing no vocative. |
| 6 | The one deterministic way to open the gate at GUIDE is also invisible. | `asksForPractice` returns **false** for all three phrasings the live run sent: `sir can you give me one question to try`, `i want practice please`, `give me one more question sir`. It returns **true** for `ask me a question`, `quiz me`, `can you give me a practice question`. |
| 7 | Therefore the lesson's progress is model variance. | MCQs served per lesson: vsepr **6/12**, rolling-motion 3/12, particle-in-box 2/12, mo-theory 2/12. Rungs climbed: 6, 3, 2, 1. |

## C. Successful vs failed — the first divergence

Both traces are identical in shape for four turns. They part at **turn 5**, the first
wrong answer:

* **vsepr** — the wrong answer left an MCQ on screen, so turn 6 answered it correctly
  and the ladder moved. From there vsepr was asked something gradeable on 6 of 13 turns.
* **rolling-motion / particle-in-box** — the wrong answer cleared the MCQ. The next
  three turns had nothing to answer, and the next question only arrived at turn 8.
  Those three turns are the entire difference: vsepr reached DEMONSTRATE on turn 6,
  rolling-motion on turn 9.
* **mo-theory** never received a correct grade at all and sat at OBSERVE for the whole
  lesson. `ok sir` on turn 7 would have exited OBSERVE had it been read as an
  acknowledgement; it was not.

The offline replay reproduces all four end states from the real fold
(repro section B): CHECK/0/0, GUIDE/0/0, OBSERVE/0/0, and TRANSFER/1/2 MASTERED.
One deviation, stated rather than smoothed: the live mo-theory ended at DEMONSTRATE
because its final answer graded correct; the replay models it as ungraded and ends at
OBSERVE. Everything else matches turn for turn.

## C2. Twelve lessons, three runs — the outcome is bimodal, not slow

All three live runs are on disk (`reverify.log` 03:00, `phaseE.log` 04:20,
`phaseE2.log` 05:07). MCQs served per lesson, in run order:

```
run 1   wave-function 6   spin 2            covalent-bonding 2   ionic-bonding 3
run 2   rolling-motion 3  particle-in-box 1 mo-theory 2          vsepr 2
run 3   rolling-motion 3  particle-in-box 2 mo-theory 2          vsepr 6
```

Twelve lessons. **Both 6s mastered. None of the ten below did. Not one lesson
served four or five.** A "the weak learner is simply slower" model predicts a
spread across the range; the data has a hole in the middle of it.

The reason is that this is a **latch**, not a linear cost:

```
no recognised input -> no rung -> the phase stays below GUIDE
-> the authored gate cannot attach -> no gradeable question
-> no gradeable input -> no rung -> ...
```

Proved rather than argued (repro section G): run the weak register for **100
turns with the budget ignored** and the ladder **never moves once**, serving zero
questions. The same hundred turns in standard register move a rung at turn 7 and
reach TRANSFER. A lesson either breaks into the gate early enough to sustain
itself, or it never receives a second gradeable question at all — which is
exactly the hole in the distribution.

`chem.bond.vsepr` demonstrates the loop from the other side. In run 2 the harness
still mangled mathematical options, so its answers were ungradeable: 2 MCQs,
GUIDE, not mastered. In run 3 with readable answers: 6 MCQs, TRANSFER, mastered.
Not a clean natural experiment — the input genuinely differed — but it is the
same feedback loop, entered through unreadable answers instead of unread
acknowledgements, and it ends in the same place.

## D. Is 12 turns enough?

**Yes. Raising it could not have rescued a single one of these lessons** — section
G runs 100 turns with no budget at all and nothing moves. The budget is not
merely sufficient; it is irrelevant to this failure.

* A perfect learner needs 6 turns. Slack = 6.
* The vocative-strip simulation (repro section F) takes the *unchanged* weak-register
  script to **TRANSFER, check=1 practice=2, MASTERED on turn 13** — inside the existing
  one-time extension, with `CONCEPT_TURN_BUDGET` untouched.
* The extension is nevertheless mis-targeted and worth recording separately:
  `qualifiesForBudgetExtension` requires `correctAtCheck + correctAtPractice >= 1`, so it
  is **denied** to a learner who reached CHECK on the final turn with nothing answered
  yet (rolling-motion) and **granted** to the one already converting (vsepr). It is not
  the root cause — it is the last gate the three failures hit, not the first.

## E. The one-word experiment

The same twelve turns, one word changed:

```
learner says "ok"      -> TRANSFER  check=1 practice=2  MASTERED
learner says "ok sir"  -> CHECK     check=0 practice=0  not mastered
```

Politeness costs this learner the lesson. Six standard-English forms and their
weak-learner equivalents, run through the real detectors, are 6 for 6:

```
"I don't understand"                 explain_differently   |  "sir i not understand this"                  null
"I am confused"                      explain_differently   |  "i am bit confused sir"                       null
"can you explain it more simply"     explain_differently   |  "sorry sir can you say more simple"           null
"explain it again"                   explain_differently   |  "please explain one more time simple words"   null
"I didn't get it"                    explain_differently   |  "hmm i think i get little bit"                null
"ok"                                 ACK                   |  "ok sir"                                      null
```

The `explain_differently` misses do **not** cause the mastery failure (that branch
returns early and never advances a rung), but they are the same defect class and they
disable the G-2 gate-hold for exactly the learner G-2 was written for.

## F. The smallest fix — described, not implemented

**Normalise the message for the two existing detectors. Do not add a detector.**

Strip a short, closed set of address and politeness tokens (`sir`, `ma'am`, `madam`,
`miss`, `teacher`, `please`, `thanks`) before `isLowSignalAcknowledgement` and
`asksForPractice` read the string, and widen `PRACTICE_REQUEST_RE` on the two features
that actually differ — `one` alongside `a|another|some|more`, and `i want practice`
alongside `i want to practice`.

What it must NOT do:

* not change `CONCEPT_TURN_BUDGET` or `BUDGET_EXTENSION_TURNS`;
* not touch `MASTERY_CHECK_REQUIRED` / `MASTERY_PRACTICE_REQUIRED` — an acknowledgement
  still cannot increment `correctAtCheck` or `correctAtPractice`; the mastery-gate cases
  of both switches stay exactly as they are;
* not touch `gradeMcqAnswer` or any grading path;
* not reach the raw message anywhere else. The normalised string is for these detectors
  only. Feeding it to the grader, the topic resolver, or the visual layer is the change
  shape that produced the L1 qualifier defect, and is explicitly out of scope;
* not open the authored gate at OBSERVE or DEMONSTRATE. Link 3 is real, but changing it
  is a separate decision with its own risk, and section F shows it is not needed.

Tests it needs: the politeness cliff in both directions for both detectors; the
one-word experiment as a pinned pair; a negative control that `don't ask me questions
sir` still does **not** read as a practice request; and a pinned check that mastery
counters are unmoved by any acknowledgement, however phrased.

## G. Was the harness telling the truth?

Checked before any verdict was drawn from it, because six harnesses in this repository
have been on the verge of condemning working code.

* **Answer forms are honest.** Since `cedd8cc` the harness echoes the option on a word
  boundary and strips nothing, so notation survives. Every MCQ served was answered on
  the following turn; none was silently dropped.
* **The register is realistic** for the stated persona — lowercase, missing auxiliaries,
  vocative.
* **One real caveat, and it matters:** the harness's learner is *uniformly* polite and
  never once types a bare `ok`. A real learner would mix registers and would therefore
  do better than these traces. The failure is register-specific, not universal — the
  correct claim is "this product cannot reliably teach a learner who speaks this way",
  not "this product cannot teach".
* **The `n % 4` practice cadence is mechanical**, but each phrasing is a sentence a
  person would actually type, which is the property that matters here.

## H. Can Phase E close?

Not yet. G-1 and G-2 are real and are working — the ladder now reaches CHECK, which it
could not before — but they fixed the rungs, not the fuel. Phase E closes when the
detector gap above is fixed and a live four-concept run reaches verified mastery on
concepts the fix was not derived from.

---

# Phase E verification run — 2 of 4, and the second latch

**Deploy `c120790` (the detector fix). Disjoint concept set, none of it used to
derive the fix. Server-side `lesson_attempts` quoted, not inferred.**

| lesson | ladder reached | mcqs | check/practice | conceptsMastered | budgetExhaustions |
|---|---|---|---|---|---|
| phys.wave.standing-waves | …→CHECK→PRACTICE→TRANSFER | 5 | 1 / 2 | `["phys.wave.standing-waves"]` | 0 |
| phys.em.faradays-law | …→CHECK→PRACTICE→TRANSFER | 6 | 1 / 2 | `["phys.em.faradays-law"]` | 0 |
| chem.org.isomerism | …→GUIDE→CHECK | 2 | 0 / 0 | `[]` — needsReview | 1 |
| chem.equil.le-chatelier | …→GUIDE→CHECK | 1 | 0 / 0 | `[]` — needsReview | 1 |

**2 of 4 meet the strict bar. This does not close Phase E.**

## What the fix demonstrably did

Both failures now CLIMB. `chem.org.isomerism` and `chem.equil.le-chatelier`
each reached CHECK on turn 9, and in both the move that got them out of GUIDE
was the learner typing `ok sir` — the exact utterance that was inert before.
Compare the pre-fix runs on the same harness: `chem.bond.mo-theory` sat at
OBSERVE for all 12 turns, `phys.qm.particle-in-box` stalled at GUIDE. The
fixed point below GUIDE is gone in production, not just offline.

Mastery went 1 of 4 (and that one only on the budget extension, at turn 13) to
2 of 4, both inside budget with `budgetExhaustions: 0`.

## The second latch — measured, not hypothesised

Both chemistry lessons reached CHECK and were then never asked a question.
Production `[gate-eligibility]` for the window, tallied:

```
"phase":"CHECK","move":"ask","eligible":false,"blockedBy":["arbitrationAllowsProbe","notClosingTurn"]   × 6
"phase":"GUIDE","move":"ask","eligible":false,"blockedBy":["arbitrationAllowsProbe","notClosingTurn"]   × 6
"phase":"CHECK","move":"teach","eligible":false,"blockedBy":["arbitrationAllowsProbe","notClosingTurn"] × 3
```

`move: 'ask'` — the engine wanted a question and the gate refused. Both
blockers are the same fact: `closingTurnWithholdsQuestion(episode.phase)` is
true, and Phase 3's ladder puts CLOSE above AUTHORED_PROBE. The arbitration log
confirms it verbatim: `owner: 'CLOSE', overridden: ['TEACH'], denied: [...]`.

The chain, each link from source or log:

1. `applySignalToEpisode` moves CORE → CLOSING at `visibleFailures >= 2`
   (budget 2; 1 in lesson one).
2. CLOSING is a property of the EPISODE. Once entered it is never left —
   there is no CLOSING → CORE transition in `sessionLifecycle.ts`.
3. `closingTurnWithholdsQuestion` then denies the authored probe on EVERY
   remaining turn of that lesson.
4. So the learner sits at CHECK with nothing to answer until the 12-turn
   concept budget runs out — `budgetExhaustions: 1` on exactly the two
   lessons that failed, `0` on the two that passed.

**This is a second latch of the same shape as the first**: the ladder can only
climb on evidence, the evidence needs a question, and a condition unrelated to
the learner's current state permanently removes the question. The first latch
was a deaf detector; this one is a one-way phase.

Two wrong answers is a low bar for the learner this product exists for, and the
harness's weak learner deliberately answers wrong once by design. Ruled out as
the cause: this is NOT cross-lesson leakage — `clearEpisodeForLessonOpen()`
resets `sessionEpisode` and `sessionFailureCount` at every lesson open, and it
is called. Each chemistry lesson earned its own CLOSING.

## Not the cause, checked

* **Content.** All four concepts hold >= 3 ACTIVE gradeable MCQ probes and an
  explanation at the HIGH band, verified against production before the run.
* **Provider outage.** 1 degraded turn in isomerism, 2 in le-chatelier, 0-1 in
  the physics lessons. Degraded turns do not consume budget and did not move
  the ladder either way.
* **Prior mastery carry-in.** Both chemistry concepts were mastered in older
  attempts (16:51 and 18:16 rows), so the content is teachable; those rows are
  history, and this run's rows are distinct and start clean.

## Not fixed

Investigation only, per instruction. Nothing about CLOSE's precedence, the
affect budget, or the episode machine has been changed, and no production code
was touched by this run.
