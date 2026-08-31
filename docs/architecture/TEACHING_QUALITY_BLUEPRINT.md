# Blueprint — every physics and chemistry concept at 9/10

**Owner:** engineering. **Subjects:** physics (238 concepts), chemistry (186).
**Written:** 2026-08-30, after a 56-session measured run, a 12-transcript hand
audit, and five lessons learned by hand on the real account.

---

## 0. The honest frame

Three things have to be said before any plan, because each one has already cost
this programme time.

**"9/10" must be scoreable or it cannot be finished.** Today's two numbers for
the same product are 78% ("mastery", from a harness replaying canned lines) and
5.8/10 (hand-read transcripts). They disagree because the harness watches a
counter and cannot see a tutor refusing to confirm a correct answer. Section 1
replaces both with a rubric that can be scored per lesson.

**Quality is not evenly missing — it is inconsistent.** The hand audit found
8/10 lessons (`phys.mech.pressure-fluids`, `phys.em.electrical-power`) beside
4/10 ones (`phys.therm.refrigerators`, `phys.wave.sound-intensity`) in the same
product on the same day. The good ones already do everything this blueprint
asks for. **The gap is reliability, not capability** — which is the difference
between a plan that can work and one that cannot.

**Some criteria can be GUARANTEED and some can only be RAISED.** A server can
refuse to ship an ungradeable question; it cannot guarantee a good analogy.
Section 1 marks every criterion as ENFORCED (a server-side invariant, held by
a test) or INFLUENCED (prompt-shaped, measured, floor-capped). Claiming 9/10 on
an INFLUENCED criterion by fiat is how this programme would lie to itself.

---

## 1. The rubric — what 9/10 means

Ten points, one per criterion, scored from a captured transcript. Seven are
machine-scoreable; three need a human read, and are sampled.

| # | Criterion | Type | Scored by |
|---|---|---|---|
| 1 | Opens on a concrete anchor, not a definition dump | INFLUENCED | human |
| 2 | On "this is too hard", the next turn uses a DIFFERENT approach, not a restatement | ENFORCED | machine (repetition detector) |
| 3 | A diagram request yields a real scene, or an honest statement that none exists — **never a false "I can't show pictures" while a scene is attached** | ENFORCED | machine |
| 4 | Every question put to the learner is gradeable by the server | ENFORCED | machine |
| 5 | A correct answer is explicitly confirmed as correct | ENFORCED | machine |
| 6 | A wrong answer gets a specific reason, not a restatement of the question | INFLUENCED | human |
| 7 | No verbatim reuse of content already served this session | ENFORCED | machine |
| 8 | No content-free turns ("Let's stay with this idea for a moment") | ENFORCED | machine |
| 9 | Reaches CHECK and PRACTICE, and credits correct answers there | ENFORCED | machine |
| 10 | Closes with an honest mastery statement matching the evidence | ENFORCED | machine |

**A concept passes at 9/10 when it scores >= 9 with NO enforced criterion
failing.** An enforced failure is a bug, not a low score.

**Baseline, measured today:** criterion 4 is at 22%, criterion 5 is not
instrumented, criterion 9 credits 54% of correct answers, criterion 3 failed in
3 of 5 hand lessons. Nothing here is speculative — every one of these was
observed.

---

## 2. Why one workstream finishes both subjects

Both contracts are already closed: physics 261/261 (concept, band) pairs meet
`assetContract.ts`, chemistry 186/186. Neither subject is short of content in
the sense the contract measures.

Every criterion in section 1 that is currently failing is failing in SHARED
code — `route.ts` arbitration, `conversationState.ts` credit, the prompt layer.
None of it is physics-specific or chemistry-specific. **Fixing the engine once
moves both subjects; fixing chemistry separately would duplicate it.**

The one genuinely per-subject dependency is probe inventory, section 4.

---

## 3. Engine work (shared — physics and chemistry together)

### E1 — Make every question gradeable. *Criterion 4: 22% -> >=70%.*

Measured: **283 of 362 questions the tutor asked carried no server answer key
(78%)**, and 226 of those were asked at OBSERVE or DEMONSTRATE. Answering them
cannot be recorded, so the ladder never reaches a gate, so mastery is
unreachable. This is the ceiling.

Keyed probes are barred below GUIDE today, and the stated reason is real:
mastery needs three graded answers, and spending one early would starve
CHECK/PRACTICE. **That reason holds only for concepts with exactly three.**

    concepts holding exactly 3 probes:  physics 102, chemistry  86
    concepts holding 5 or more:         physics 136, chemistry  28

So: **allow a keyed probe below GUIDE only when the concept's pool exceeds the
mastery minimum.** Data-gated, respects the existing constraint instead of
overriding it, and covers 136 + 28 concepts on day one with no content work.

The remainder is unblocked by C1 (section 4).

Second half, same criterion: when the engine's move is `ask` and no keyed probe
can attach, the turn must NOT ship a question. `turnDecision.ts` already detects
this as `QUESTION_SHIPPED_WITHOUT_PROBE` and says of itself: *"Returns findings;
changes nothing, blocks nothing... acting on it is a later phase and
deliberately not done here."* E1 is that later phase.

**Exit:** >= 70% of asked turns carry a keyed probe, on a 40-concept run per
subject. **Falsifiable within one run.**

### E2 — Confirm and credit. *Criteria 5 and 9.*

Two distinct failures that a learner experiences as one:

- **Not confirmed.** Hand session: a correct worked example took FIVE attempts
  to get a yes/no, meeting the stock phrase *"Let's check that one carefully
  rather than me just agreeing"* — which appeared verbatim in two different
  lessons, i.e. it is a canned deflection, not a response.
- **Not credited.** 46% of correct answers to real keyed probes move no
  counter, because credit accrues only at CHECK and PRACTICE.

**Warning to whoever takes this.** A fix was attempted today that advanced
OBSERVE on substantive engagement. Seven behavioural tests across four files
failed, because OBSERVE is a DIAGNOSTIC phase and the concluding mechanism
already exists (`observeFailures`, threshold 2).
`observeDiagnosticConcludes.test.ts` rules it out in its own header. **Read that
file before touching the ladder.** E2 is about confirmation and credit at the
gates, NOT about adding ladder edges.

**Exit:** >= 85% of correct answers to keyed probes move a counter; a
confirmation detector reports >= 90%.

### E3 — Give D4b a ceiling. *Criterion 4, second-order.*

`D4b-ANSWER-STUDENT-FIRST` ("never drill past a question") is correct behaviour
with no upper bound. Measured, and holding under two controls: a help-request
turn gets a keyed probe **21%** of the time against **43%** otherwise, and the
stalled sessions carry a median help-request fraction of 0.50 against 0.31.

After N consecutive help-request turns with nothing graded, the turn must answer
the learner AND attach a probe, rather than choosing between them.

**Sequencing:** E3 AFTER E1. Both touch what gets asked; changing them together
makes the next run uninterpretable.

### E4 — Never contradict the app's own state. *Criterion 3.*

The tutor said *"I can't attach a picture"* on a turn where a rendered scene
with ten objects was attached, and offered ASCII art beside a real diagram. This
teaches a visually-dependent learner to stop asking — the single most damaging
thing in the hand audit.

Deterministic post-check: if a scene is attached and the reply claims inability
to show one, the claim is stripped. Cheapest item here, highest perceived gain.

---

## 4. Content work (per-subject — parallelisable, no engine files)

### C1 — Lift thin concepts from 3 probes to 5.

**188 concepts hold exactly the mastery minimum** (physics 102, chemistry 86).
They cannot afford an early probe, so E1 cannot reach them. Authoring two more
each unblocks E1 across the whole corpus.

Touches `src/lib/teaching/assets/*SeedAssets.ts` and the asset tables. **It does
not touch the teaching engine**, needs no measurement runs, and therefore
neither collides with E1-E4 nor contends for the QA account. This is the correct
work for a second, parallel session.

**Exit:** every physics and chemistry concept holds >= 5 ACTIVE closed-choice
probes at its served band; `assetContract.ts` still passes.

### C2 — Visual coverage, measured by what is SERVED.

Registry bindings are physics 78/238 (32%), chemistry 13/186 (7%) — but
generation is live and fills much of the gap on demand, so bindings OVERSTATE
the problem. The number that matters is the share of sessions that show a real
visual: physics 76%.

**Do not hand-author registry entries before measuring the served rate for
chemistry.** That measurement is running now.

---

## 5. Verification — how 9/10 is proven, not asserted

Scoring 424 concepts by hand is not possible; trusting a regex to judge teaching
is not honest. So:

1. **Extend `teachingDefectScan.ts` into a rubric scorer** for the seven ENFORCED
   criteria. It already counts seven defect signatures and already refuses to
   call itself a quality score; the enforced criteria are exactly the part that
   CAN be machine-scored.
2. **Calibrate it against the 12 hand-rated transcripts** that already exist. If
   machine score and human score disagree by more than 2 points on any of them,
   the scorer is wrong and gets fixed before it is trusted.
3. **Per subject: a 40-concept seeded run**, scored. Report the DISTRIBUTION, not
   the mean — "every concept at 9/10" is a floor claim, and a mean hides a 4/10.
4. **Per subject: 5 lessons learned by hand**, by a person, each turn a genuine
   reaction. This found more real defects in 30 minutes than seven hours of
   automated sweeps, and it is the only check that sees criteria 1 and 6.
5. **No claim ships without the run behind it.** Three engine fixes shipped today
   moved their own targets and did NOT move mastery. That must be reported as
   prominently when it happens again.

---

## 6. Sequence and gates

| Phase | Work | Gate to pass |
|---|---|---|
| 1 | E4, E1 (surplus-gated) | criterion 4 >= 70% on a 40-concept run, both subjects |
| 2 | E2 | criterion 9 >= 85%, criterion 5 >= 90% |
| 3 | E3 | GUIDE stalls with nothing graded -> 0 |
| 4 | C1 (parallel from day 1) | all 424 concepts hold >= 5 probes |
| 5 | E1 re-run over the concepts C1 unblocked | criterion 4 >= 70% corpus-wide |
| 6 | Rubric scorer calibrated; 40-concept run + 5 hand lessons per subject | **>= 9/10 with no enforced failure, reported as a distribution** |

Phases 1-3 are strictly serial: each changes what gets asked, and running them
together makes the measurement uninterpretable. Phase 4 is parallel throughout.

---

## 7. What could make this fail, stated in advance

- **The stochastic half.** Criteria 1 and 6 depend on model output. They can be
  raised and floor-capped, not guaranteed. If the floor cannot be held, the
  honest response is to say 9/10 was reached on the enforced criteria and report
  the measured distribution on the rest — not to quietly rescore.
- **Enforcing criterion 4 may reduce how often the tutor asks anything.** If
  "don't ship an ungradeable question" makes lessons passive, that is a
  regression even with the criterion green. Watch questions-asked-per-lesson
  alongside it.
- **Precedent for the fixes not landing.** Three engine fixes today moved their
  targets and left mastery flat. E1-E3 aim at a mechanism that has now been
  measured rather than guessed, but the same outcome is possible and the gates
  above exist to catch it within one run rather than one day.
- **Four confident hypotheses were falsified today** (probe starvation, QL-2
  permanence, a GUIDE deadlock, an OBSERVE ladder edge). Expect more. Measure
  before acting; record what was falsified so it is not re-derived.
