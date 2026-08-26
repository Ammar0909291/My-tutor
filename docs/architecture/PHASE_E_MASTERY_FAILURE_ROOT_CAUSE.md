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

## D. Is 12 turns enough?

**Yes, and this is not a budget problem.**

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
