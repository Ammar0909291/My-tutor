# Teaching Content Library — `phys.meas.measurement-errors`
# Measurement Errors and Uncertainty

**Status:** CANDIDATE ASSETS — not yet in production blueprint
**Concept ID:** `phys.meas.measurement-errors`
**KG canonical ID:** `phys.meas.errors`
**TCL Version:** 2.0 — Educational Brain Teaching Assets Standard
**Authored against:** KG node phys.meas.errors (developing, bloom: apply, requires: [phys.meas.units])
**Date:** 2026-07-14
**Asset count:** 10
**Governing misconceptions:** M1 (error means mistake), M2 (better instruments eliminate all error), M3 (random error and systematic error are the same), M4 (repeating measurements and averaging gives you the true value)

---

## Purpose

The Teaching Content Library is the asset pool from which the Teaching Engine retrieves
interventions rather than generating them from scratch. Every intervention is a decision
node — it knows when to be chosen, what success looks like, what failure looks like, and
where to route next. Together, the ten interventions form a Teaching Decision Graph.

The core insight every intervention must install:

> **Error is not a mistake — it is a property of measurement.
> Every measurement is a range, not a point. The question is never
> "is there error?" — only "how much, and what kind?"**

---

## Intervention Graph Overview

```
Entry points (no prior attempt):  ME-01 (default) · ME-10 (young/anxious) · ME-02 (curious)

After ME-01 fails:  ME-10 → ME-04 → ME-05
After ME-02 fails:  ME-01 → ME-07
After ME-03 fails:  ME-01 → ME-04
After ME-04 fails:  ME-10 → ME-01
After ME-05 fails:  ME-04 → ME-01
After ME-06 fails:  ME-05 → ME-01
After ME-07 fails:  ME-01 → ME-04
After ME-08 fails:  ME-05 → ME-04
After ME-09 fails:  ME-01 → ME-03
After ME-10 fails:  prerequisite check (phys.meas.units — measurement concept secure?)

After any success:  Novel measurement classification probe → mastery gate
                    If M1 still active → ME-01 (relabel: blunders vs errors)
```

---

## ME-01 — The Arrow and the Bullseye

### Identity

| Field | Value |
|---|---|
| Intervention ID | ME-01 |
| Title | The Arrow and the Bullseye |
| Concept ID | phys.meas.measurement-errors |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Analogy |
| Target Learner | Age 12–16, first encounter |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Understand |
| Estimated Duration | 5–7 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Medium — the archery target diagram is powerful |
| Voice Requirement | Medium |
| Interaction Type | Analogy + Dialogue |

### Pedagogical Metadata

**Why this strategy works:**
The archery target is the universally used visual for accuracy and precision —
and it is universally used because it works. The student can see, in a single
image, all four combinations: (precise+accurate, precise+inaccurate,
imprecise+accurate, imprecise+inaccurate). The visual directly prevents M3
and sets up the precision/accuracy distinction.

**Mental model installed:**
"Precision is about spread — how clustered are the results?
Accuracy is about bias — how close to the true value?
These are independent. You can be precise and wrong (all arrows cluster
in the wrong ring). You can be accurate and imprecise (arrows scattered
around the bullseye). The best is both."

**Misconceptions prevented:** M3 — visually shows random (spread = imprecision)
vs systematic (offset = inaccuracy) as different things.

**Misconceptions recovered:** M3.

**Prerequisite knowledge assumed:** phys.meas.units. Understands what measurement is.

**Cognitive load:** Low. The image does most of the work.

### Teaching Script

*Draw or describe four archery targets:*

```
Target 1: arrows clustered tightly at the bullseye — PRECISE + ACCURATE
Target 2: arrows clustered tightly, but in the wrong ring — PRECISE + INACCURATE
Target 3: arrows scattered widely, centred on the bullseye — IMPRECISE + ACCURATE
Target 4: arrows scattered widely and off-centre — IMPRECISE + INACCURATE
```

*Say:*

"Four archers shoot five arrows each. Let's describe what happened.

Target 1: all five arrows hit the bullseye cluster. This archer is both
precise — the arrows are tight together — and accurate — they're in the right place.

Target 2: all five arrows hit the same spot — but it's the outer ring.
This archer is precise — very consistent — but inaccurate — consistently wrong.
Their bow might be wrongly calibrated (systematic error).

Target 3: arrows scattered all over the target, but if you took the
average position, it's the bullseye. Imprecise — high spread — but accurate
on average. This is random error at high level.

Target 4: scattered everywhere AND off-centre. Both problems at once.

Now here's the key question: which problems can you fix by shooting more arrows?"

*Wait. They will probably say 3 and 4 — but the answer is only 3.*

"Shooting more arrows — taking more measurements — averages out the randomness
of Target 3. But Target 2's offset doesn't go away with more shots. It moves
consistently in the same wrong direction. More measurements of a systematic
error just confirms the error. You have to find and remove the bias itself."

### Success Model

**Success signals:**
- Student correctly classifies the four targets
- Student explains why random error can be reduced by repeating and systematic cannot
- Student distinguishes precision (spread) from accuracy (bias)

**Failure signals:**
- Student conflates precision and accuracy (M3 persisting)
- Student thinks repeating measurements fixes systematic errors

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "A thermometer always reads 2°C too high. Is this precise, accurate, both, or neither?" → mastery if student says precise (consistent offset) but inaccurate |
| Unsuccessful — visual needed | Redraw the targets or use ME-02 (throwing darts — active version) |
| Unsuccessful — concept not landing | Route to ME-10 (simpler framing) |

### Retrieval Tags

`analogy` `archery` `accuracy-vs-precision` `systematic-vs-random` `M3-prevention` `visual` `four-targets` `first-contact`

### AI Retrieval Notes

**When to choose:** Default first intervention. The archery visual is the
most efficient setup for the accuracy/precision distinction (covers M3).
Best for any student at first encounter.

**When to avoid:** Student already knows the archery diagram — needs ME-02
or ME-05 for a different entry point.

**Which interventions follow naturally:** ME-05 (random vs systematic —
explicit treatment) after the visual establishes the distinction.
ME-04 (measurement as a range) for the uncertainty angle.

---

## ME-02 — The Archer's Story

### Identity

| Field | Value |
|---|---|
| Intervention ID | ME-02 |
| Title | The Archer Who Never Missed |
| Concept ID | phys.meas.measurement-errors |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Historical Discovery |
| Target Learner | Age 12–16, curious, story-driven |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Understand |
| Estimated Duration | 6–8 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | None |
| Voice Requirement | High |
| Interaction Type | Story + Discussion |

### Pedagogical Metadata

**Why this strategy works:**
The story of early physicists — who believed that sufficiently careful
measurement would approach the "true value" exactly — and the later discovery
that uncertainty is irreducible, produces a conceptual shift through historical
narrative. The student sees that scientists themselves had to revise this belief.

**Mental model installed:**
"For centuries, physicists believed that careful enough measurement would
reach the true value. Then quantum mechanics showed that some uncertainty is
not a measurement failure — it is a property of nature. Even ignoring quantum
effects, instrument uncertainty is irreducible: you can always improve precision
but never reach zero uncertainty. Measurement is always a range."

**Misconceptions prevented:** M2 — better instruments improve, but don't eliminate.
M4 — even perfect repeating does not reach the true value.

**Misconceptions recovered:** M2, M4.

**Prerequisite knowledge assumed:** phys.meas.units. ME-01 helpful.

**Cognitive load:** Low — the story carries it.

### Teaching Script

*Say:*

"For most of the history of science, physicists believed something like this:
if we just had a good enough instrument, we could measure anything exactly.
Errors were regarded as failures — of the instrument, of the experimenter,
of the conditions.

The goal was to eliminate error entirely. Build a better thermometer, get a
steadier hand, control the temperature — and you approach the true value.

This view held for centuries.

Then, in the 20th century, two things happened.

First, Werner Heisenberg showed that at the atomic scale, position and momentum
cannot both be known precisely at the same time — not because of instrument
limitations, but as a fundamental property of nature. You cannot know exactly
where a particle is and how fast it's moving simultaneously. This is the
Uncertainty Principle.

But even before quantum mechanics — even for everyday objects like a table
or a brick — we learned that error is not eliminable. Every measuring
instrument has a finite resolution. Every reading involves an estimate.
Every experiment has uncontrolled influences. The question is never
'does my measurement have error?' It is always 'how much error, and of
what type?'

The word 'error' in physics does not mean 'mistake.' It means 'the gap
between what we measured and what is actually true.' And that gap
is never exactly zero."

### Success Model

**Success signals:**
- Student correctly states that error is a property of measurement, not a mistake
- Student can distinguish measurement uncertainty from careless mistakes
- Student understands that averaging reduces uncertainty but doesn't eliminate it

**Failure signals:**
- Student still uses "error" to mean "wrong answer"
- Student believes a good enough instrument would have zero error

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "A physicist says their measurement of a length is 4.73 ± 0.02 cm. What does ±0.02 mean?" → mastery if student correctly interprets as uncertainty range |
| Unsuccessful | Route to ME-01 (archery target — visual concrete version) |
| Unsuccessful — historical too abstract | Route to ME-10 (ruler limits — concrete immediate experience) |

### Retrieval Tags

`history` `heisenberg` `uncertainty-principle` `error-not-mistake` `M2-recovery` `M4-recovery` `narrative` `curious-learner`

### AI Retrieval Notes

**When to choose:** Curious student, responds to history of science.
Good for students who ask "why?" about concepts. Best after ME-01
establishes the basic framework.

**When to avoid:** Young students for whom quantum mechanics is too distant.
Student who needs immediate practical application.

**Which interventions follow naturally:** ME-04 (measurement as a range)
to formalise the ± notation introduced here.

---

## ME-03 — The Faulty Thermometer

### Identity

| Field | Value |
|---|---|
| Intervention ID | ME-03 |
| Title | The Faulty Thermometer |
| Concept ID | phys.meas.measurement-errors |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Everyday Life Story |
| Target Learner | Age 12–16, practical context |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Understand |
| Estimated Duration | 5–7 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | None |
| Voice Requirement | Medium |
| Interaction Type | Story + Question |

### Pedagogical Metadata

**Why this strategy works:**
A thermometer that consistently reads 2°C too high is a vivid, familiar
example of systematic error. The student can immediately distinguish this
from a shaky hand (random). The "always too high" qualifier is the
characteristic feature of systematic error — direction and magnitude are
consistent, not random.

**Mental model installed:**
"A systematic error has a direction. It doesn't scatter around the
true value — it shifts everything by a consistent amount in a consistent
direction. You can detect it by comparing to a known standard.
You cannot average it away — it will be in every measurement."

**Misconceptions prevented:** M1, M3.

**Misconceptions recovered:** M3 — provides a clear concrete example
of systematic error's distinguishing feature.

**Prerequisite knowledge assumed:** phys.meas.units. ME-01 helpful for the precision/accuracy vocabulary.

**Cognitive load:** Very low.

### Teaching Script

*Say:*

"Your bathroom thermometer reads 38.5°C when you feel ill.
Your mother says: 'That's a fever — but I don't trust this thermometer.
Last week it read 2 degrees high when we checked it against the doctor's one.'

If the thermometer reads consistently 2°C too high, what is your actual temperature?"

*Wait: 36.5°C — not a fever.*

"Now — does taking your temperature five times and averaging the results help?"

*Wait.*

"If the thermometer always reads 2°C too high, then measuring five times
gives: 38.5, 38.5, 38.5, 38.4, 38.6. Average: 38.5. Still 2°C too high.

This is systematic error. It has a direction (always too high), it has
a magnitude (approximately 2°C), and it is present in every reading.

You cannot average it away. The only fixes are:
(1) calibrate the instrument — compare it to a known standard and apply a correction
(2) replace it with a properly calibrated instrument

Now compare: your hand shakes slightly as you hold the thermometer.
The readings jump: 38.3, 38.7, 38.5, 38.4, 38.6. Average: 38.5.

That scatter is random error. Different direction each time. Different magnitude.
Averaging reduces it. More readings = more stable average.

Same measured object. Two completely different error types. Different fixes."

### Success Model

**Success signals:**
- Student correctly identifies the 2°C offset as systematic
- Student explains why averaging doesn't fix systematic error
- Student identifies random error as the alternative and explains why averaging helps

**Failure signals:**
- Student confuses the thermometer example as a mistake rather than systematic error (M1)
- Student thinks recalibration is the fix for random error

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "A scale always reads 0.5 kg too heavy. You weigh yourself 10 times. Does the average correct this?" → mastery if student says no |
| Unsuccessful | Route to ME-01 (archery target — visual shows the distinction) |
| Unsuccessful — M1 persisting | Route to ME-09 (blunders vs errors — explicit M1 recovery) |

### Retrieval Tags

`everyday-story` `thermometer` `systematic-error` `calibration` `M1-recovery` `M3-prevention` `concrete` `direction-and-magnitude`

### AI Retrieval Notes

**When to choose:** M3 is detected (student conflates systematic and random).
Good when students have health/home context. Best after ME-01 establishes
the archery framework.

**When to avoid:** First contact if ME-01 hasn't established the vocabulary yet.

**Which interventions follow naturally:** ME-05 (systematic vs random —
formal classification) to complete the treatment.

---

## ME-04 — Measurement as a Range

### Identity

| Field | Value |
|---|---|
| Intervention ID | ME-04 |
| Title | Measurement as a Range |
| Concept ID | phys.meas.measurement-errors |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Visual Mental Picture + Procedure |
| Target Learner | Age 13–16, analytical |
| Difficulty | Beginner |
| CPA Stage | Representational |
| Bloom Level | Apply |
| Estimated Duration | 7–9 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | High — the ± notation and number line are central |
| Voice Requirement | Medium |
| Interaction Type | Visual Explanation + Practice |

### Pedagogical Metadata

**Why this strategy works:**
The ± (plus-or-minus) notation physically shows what uncertainty means:
the measurement is not a point but an interval. Students who see this
spatially stop treating measurements as exact numbers and start treating
them as ranges — which is the correct physical picture.

**Mental model installed:**
"4.73 ± 0.02 cm means the true value is somewhere between 4.71 and 4.75 cm.
I am not saying it is exactly 4.73 — I am saying it is somewhere in that range.
The ± is not a disclaimer; it is the measurement. A measurement without ±
is an incomplete statement."

**Misconceptions prevented:** M4.

**Misconceptions recovered:** M4.

**Prerequisite knowledge assumed:** phys.meas.units. ME-01 helpful.

**Cognitive load:** Medium — the ± notation is new.

### Teaching Script

*Draw a number line:*

"Here is a measurement: 4.73 ± 0.02 cm.

Draw a number line. Mark 4.71 and 4.75. The true value is somewhere in that range.

```
|-------|---|-------|
4.71  4.73  4.75
        ↑
     stated value
     (centre of range)
```

The ± 0.02 is the uncertainty — the half-width of the range.

Now here is a second measurement from a better instrument: 4.726 ± 0.003 cm.

Mark 4.723 and 4.729 on the number line. Much narrower range.

These two measurements overlap — the range 4.723–4.729 is inside the
range 4.71–4.75. So they are consistent. They do not contradict each other.

Now a third measurement: 4.70 ± 0.01 cm.

Mark 4.69 to 4.71. Does this overlap with the first? Barely — 4.71 is
the edge of both. They might be consistent, might not.

This is how physicists compare measurements. Not 'which one is right?'
but 'do their ranges overlap?' If yes — consistent. If no — there is a
genuine disagreement that requires investigation."

*Practice: student works through two comparisons.*

### Success Model

**Success signals:**
- Student correctly draws the ± interval on a number line
- Student correctly identifies two measurements as consistent or inconsistent
  by checking overlap
- Student stops treating the central value as exact

**Failure signals:**
- Student treats ± as a footnote rather than part of the measurement
- Student compares central values without considering ranges (M4 variant)

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "Two labs measure the same length: 10.3 ± 0.2 cm and 10.8 ± 0.1 cm. Do they agree?" → mastery if student correctly identifies non-overlap (10.1–10.5 vs 10.7–10.9) |
| Unsuccessful — notation unfamiliar | Route to ME-10 (simpler "somewhere between" language) |
| Unsuccessful — conceptual | Route to ME-01 (archery — visual foundation) |

### Retrieval Tags

`visual` `plus-minus` `uncertainty-interval` `number-line` `M4-prevention` `comparison` `representational` `overlap-test`

### AI Retrieval Notes

**When to choose:** Student needs to work with ± notation (lab context,
exam). After conceptual understanding is established via ME-01 or ME-03.

**When to avoid:** First contact. Student who hasn't grasped that error
is not a mistake.

**Which interventions follow naturally:** ME-06 (uncertainty propagation)
to extend ± through calculations.

---

## ME-05 — Two Thieves in Your Measurement

### Identity

| Field | Value |
|---|---|
| Intervention ID | ME-05 |
| Title | Two Thieves in Your Measurement |
| Concept ID | phys.meas.measurement-errors |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Analogy |
| Target Learner | Age 12–16, any background, M3 recovery target |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Understand |
| Estimated Duration | 5–7 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | None |
| Voice Requirement | Medium |
| Interaction Type | Analogy + Dialogue |

### Pedagogical Metadata

**Why this strategy works:**
"Two thieves stealing from your measurements" is a vivid metaphor that
makes the systematic/random distinction memorable by giving each a distinct
character. Systematic error steals the same amount every time, in the same
direction. Random error steals a different amount each time, in random
directions. The student can "profile" each thief.

**Mental model installed:**
"Random error is like a thief who takes a different amount each time —
sometimes a little, sometimes a lot, sometimes nothing — always in a
random direction. Average many measurements and the thief's net effect
approaches zero. Systematic error is like a thief who always takes exactly
the same amount, in the same pocket. Averaging does not stop them."

**Misconceptions prevented:** M3.

**Misconceptions recovered:** M3.

**Prerequisite knowledge assumed:** phys.meas.units. ME-01 helpful.

**Cognitive load:** Low.

### Teaching Script

*Say:*

"Your measurements are being stolen by two thieves.

Thief One is Random Error. This thief is unpredictable. Sometimes they
steal a small amount. Sometimes a large amount. Sometimes they steal,
sometimes they add. The direction and magnitude change every time.

If you measure the same thing 50 times, Thief One's effects will partly
cancel each other — sometimes they went left, sometimes right, sometimes
they were absent. The average of many measurements is much closer to the
true value than any single measurement.

Thief Two is Systematic Error. This thief is consistent. Every time you
measure, they steal exactly the same amount, from the same pocket, in the
same direction. If your scale is 0.5 kg heavy, Systematic Error adds 0.5 kg
to every reading. Forever.

If you measure 50 times, Thief Two steals 0.5 kg fifty times. The average
is also 0.5 kg too heavy. Averaging does nothing.

The only way to catch Thief Two is to compare your measurements to a
known standard — a calibrated reference. When you find the discrepancy,
you know the thief's signature and can subtract it.

Every measurement has both thieves present. Your job as a scientist is
to know which thief is responsible for which part of your uncertainty —
because only then can you choose the right countermeasure."

### Success Model

**Success signals:**
- Student can name the two "thieves" and describe their different characters
- Student correctly explains why averaging defeats Random but not Systematic
- Student knows the correct fix for each (averaging vs calibration)

**Failure signals:**
- Student cannot distinguish the two after the analogy
- Student thinks calibration fixes random error

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "You measure a room 20 times and get scatter around 4.73 m. Which thief did you reduce?" → mastery if student says Random, and adds that Systematic is still unknown |
| Unsuccessful | Route to ME-03 (faulty thermometer — concrete systematic example first) |
| Unsuccessful — analogy not gripping | Route to ME-01 (archery target — visual version of same distinction) |

### Retrieval Tags

`analogy` `two-thieves` `random-vs-systematic` `M3-recovery` `averaging` `calibration` `concrete` `memorable`

### AI Retrieval Notes

**When to choose:** M3 is active (student treats systematic and random
as equivalent). Works well as a memorable hook before the formal classification.

**When to avoid:** Student who prefers direct formal explanation over metaphors.

**Which interventions follow naturally:** ME-03 (faulty thermometer) for
a concrete systematic example. ME-06 (propagation) to extend the understanding.

---

## ME-06 — Error Doesn't Disappear in the Calculator

### Identity

| Field | Value |
|---|---|
| Intervention ID | ME-06 |
| Title | Error Doesn't Disappear in the Calculator |
| Concept ID | phys.meas.measurement-errors |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Guided Discovery |
| Target Learner | Age 13–17, computational, M4 recovery target |
| Difficulty | Intermediate |
| CPA Stage | Abstract |
| Bloom Level | Apply |
| Estimated Duration | 8–10 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | None |
| Voice Requirement | Medium |
| Interaction Type | Worked Example + Practice |

### Pedagogical Metadata

**Why this strategy works:**
Students who understand measurement uncertainty often forget it when
they start calculating with uncertain measurements. Error propagation
demonstrates that uncertainty does not vanish in calculation — it
accumulates. This is a practical skill and a conceptual reinforcement
simultaneously.

**Mental model installed:**
"If I add two uncertain measurements, their uncertainties add. If I
multiply, the fractional uncertainties add. Error is not removed by
calculation — it compounds. The final answer must carry an uncertainty
that reflects the uncertainties of all inputs."

**Misconceptions prevented:** M4.

**Misconceptions recovered:** M4.

**Prerequisite knowledge assumed:** ME-04 (± notation). Fraction arithmetic.

**Cognitive load:** Medium — the propagation rules are new.

### Teaching Script

*Say:*

"You measure two lengths:
  A = 4.73 ± 0.02 cm
  B = 2.10 ± 0.05 cm

You want the total length A + B. What is the uncertainty in your answer?

The simplest rule for addition: add the uncertainties.
A + B = (4.73 + 2.10) ± (0.02 + 0.05) = 6.83 ± 0.07 cm

Why add? Because in the worst case, both measurements are off in the
same direction — if A is 0.02 too high AND B is 0.05 too high,
the total could be 0.07 too high. So the maximum uncertainty is their sum.

Now: you want the product A × B. Area = A × B.

For multiplication, add the fractional (relative) uncertainties:
  Fractional uncertainty of A: 0.02/4.73 ≈ 0.0042 = 0.42%
  Fractional uncertainty of B: 0.05/2.10 ≈ 0.024 = 2.4%
  Sum: 0.0042 + 0.024 = 0.028 = 2.8%

Area = 4.73 × 2.10 = 9.93 cm²
Uncertainty in area = 2.8% × 9.93 ≈ 0.28 cm²
So: Area = 9.93 ± 0.28 cm²

Notice: the uncertainty in B dominated (2.4% vs 0.42%).
The weakest measurement dominates the uncertainty of the result —
just as in significant figures, the weakest link controls.

You cannot make the final answer more precise than the least
precise input. Error does not disappear in the calculator."

### Success Model

**Success signals:**
- Student correctly propagates uncertainty through addition
- Student correctly computes fractional uncertainty for multiplication
- Student identifies the dominant uncertainty source

**Failure signals:**
- Student writes the result without any uncertainty (M4)
- Student confuses the addition rule with the multiplication rule

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "A = 10.0 ± 0.1 m, B = 10.0 ± 1.0 m. Which measurement limits A+B's precision?" → mastery if student says B |
| Unsuccessful — rules unclear | Route to ME-04 (± notation — rebuild the ± foundation) |
| Unsuccessful — conceptual | Route to ME-05 (two thieves — rebuild why error persists) |

### Retrieval Tags

`guided-discovery` `error-propagation` `addition-rule` `multiplication-rule` `fractional-uncertainty` `M4-recovery` `intermediate` `computational`

### AI Retrieval Notes

**When to choose:** Lab context, computational work. Student is ready to
calculate with uncertainty. After ME-04 is solid.

**When to avoid:** First contact. Student who hasn't grasped ± notation.

**Which interventions follow naturally:** ME-08 (significant figures
and errors — connecting both topics).

---

## ME-07 — The Crooked Tape Measure

### Identity

| Field | Value |
|---|---|
| Intervention ID | ME-07 |
| Title | The Crooked Tape Measure |
| Concept ID | phys.meas.measurement-errors |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Simple Experiment |
| Target Learner | Age 12–15, hands-on, tactile |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Apply |
| Estimated Duration | 7–10 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | High — a real tape measure or ruler is ideal |
| Voice Requirement | Low |
| Interaction Type | Activity |

### Pedagogical Metadata

**Why this strategy works:**
The student physically introduces systematic and random errors by
(1) deliberately misaligning the tape measure (systematic — always
gives too long or too short) and (2) rushing their reading (random —
varies each time). They discover both error types through their own actions.

**Mental model installed:**
"I created a systematic error by misaligning the start point — every
measurement was consistently off by the same amount. I created random
error by rushing and reading inconsistently. I felt the difference
physically before I named them."

**Misconceptions prevented:** M1, M3.

**Misconceptions recovered:** M3 — felt, not just told.

**Prerequisite knowledge assumed:** phys.meas.units. Can use a ruler.

**Cognitive load:** Very low — activity is self-guiding.

### Teaching Script

*Setup: ruler or tape measure, pencil, something to measure.*

"Let's create some errors deliberately.

Step 1 — Systematic error:
Measure the length of your book. But start your ruler at 1 cm, not 0 cm.
Record five measurements. They should all be about 1 cm short — same
direction, same magnitude, every time."

*Student records.*

"This is systematic error. You introduced a known offset. Notice:
all five readings cluster around the same wrong value."

"Step 2 — Random error:
Now measure the same book five times, but don't look too carefully.
Glance at the ruler quickly. Record five measurements."

*Student records — they will vary.*

"These scatter. Different readings, no consistent direction.
This is random error. Notice: the average of these is close to the
true value, even if each individual reading isn't."

"Step 3 — Remove the systematic:
Re-measure five times, carefully, starting from 0. Average them.
How does the average compare to the 'book's actual length?'"

*The average from step 2 was close; the step 3 average should be even closer.*

"You just demonstrated that:
  Systematic error → averaging doesn't help; correcting the setup does.
  Random error → averaging helps."

### Success Model

**Success signals:**
- Student correctly identifies which readings were systematically off and which randomly
- Student explains the mechanism of each error type (misalignment vs inconsistent reading)
- Student can describe the appropriate fix for each type

**Failure signals:**
- Student cannot connect the activity to the error types
- Student thinks averaging fixed the systematic error (M4 variant)

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "Identify a systematic error source in a real laboratory experiment." → mastery if student gives a plausible source |
| Unsuccessful — no equipment | Route to ME-03 (faulty thermometer — verbal systematic example) |
| Unsuccessful — concept not grasped | Route to ME-01 (archery target — visual framework) |

### Retrieval Tags

`experiment` `hands-on` `tape-measure` `systematic-vs-random` `M1-prevention` `M3-recovery` `tactile` `create-errors`

### AI Retrieval Notes

**When to choose:** In-person or lab session. Tactile learner. Student
who benefits from creating phenomena before naming them.

**When to avoid:** Text-only async session. Student who needs concept
before activity.

**Which interventions follow naturally:** ME-05 (two thieves) to
name what the activity demonstrated.

---

## ME-08 — What ±0.02 Is Telling You

### Identity

| Field | Value |
|---|---|
| Intervention ID | ME-08 |
| Title | What ±0.02 Is Telling You |
| Concept ID | phys.meas.measurement-errors |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Socratic Dialogue |
| Target Learner | Age 13–17, analytical |
| Difficulty | Intermediate |
| CPA Stage | Abstract |
| Bloom Level | Analyze |
| Estimated Duration | 7–9 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Low |
| Voice Requirement | High |
| Interaction Type | Dialogue |

### Pedagogical Metadata

**Why this strategy works:**
Unpacking what a ± statement actually claims — the range within which
the true value probably lies — requires the student to think about
statistical interpretation. The Socratic format makes the student
derive the interpretation rather than receive it.

**Mental model installed:**
"4.73 ± 0.02 cm means: I am reasonably confident the true value lies
between 4.71 and 4.75 cm. 'Reasonably confident' has a technical meaning
— typically 68% (one standard deviation) or 95% (two standard deviations)
confidence. The uncertainty communicates both the range AND the confidence level."

**Misconceptions prevented:** M4.

**Misconceptions recovered:** M4.

**Prerequisite knowledge assumed:** ME-04 (± notation). Basic statistics helpful.

**Cognitive load:** Medium-high.

### Teaching Script

*Say:*

"A measurement is reported as 4.73 ± 0.02 cm. Let me ask you a series
of questions.

Question 1: Is 4.74 consistent with this measurement?"

*Yes — within range.*

"Question 2: Is 4.76 consistent?"

*No — outside range.*

"Question 3: Is the true value definitely 4.73?"

*No — anywhere in 4.71–4.75.*

"Question 4: Is the true value definitely inside 4.71–4.75?"

*Here they pause — the answer is: probably, but not certainly.*

"This is the subtlety. The ± 0.02 is typically a standard uncertainty —
meaning there is about a 68% probability the true value lies within the
stated range. Or it might be given at 95% confidence — which would cover
a wider range. The notation ± alone doesn't specify the confidence level.

Professional scientific papers always state the confidence level.
'4.73 ± 0.02 cm (1σ)' means one standard deviation — 68% confidence.
'4.73 ± 0.04 cm (2σ)' means two standard deviations — 95% confidence.

The ± is not a hard boundary — it's a probability statement. The true
value might be outside it. The question is: how likely?"

### Success Model

**Success signals:**
- Student correctly identifies consistent and inconsistent values
- Student grasps that ± is probabilistic, not a hard boundary
- Student asks for the confidence level when seeing a ± statement

**Failure signals:**
- Student treats ± as a hard boundary (true value definitely inside)
- Student cannot explain why two ± ranges might overlap but still show disagreement

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "Two labs report 10.3 ± 0.2 cm (1σ) and 10.8 ± 0.2 cm (1σ). Is the discrepancy significant?" → mastery if student correctly reasons about 2.5σ separation |
| Unsuccessful | Route to ME-04 (± notation as a range — simpler interpretation) |
| Unsuccessful — statistics too advanced | Route to ME-05 (two thieves — intuitive probabilistic language) |

### Retrieval Tags

`socratic` `plus-minus-interpretation` `confidence-level` `M4-recovery` `statistical` `analytical` `intermediate` `1-sigma` `2-sigma`

### AI Retrieval Notes

**When to choose:** Advanced student who is ready for statistical
interpretation. Lab context or higher physics.

**When to avoid:** First contact. Student who hasn't mastered the basic
± notation.

**Which interventions follow naturally:** ME-06 (error propagation)
to use the uncertainty in calculations.

---

## ME-09 — Blunders, Errors, and Mistakes

### Identity

| Field | Value |
|---|---|
| Intervention ID | ME-09 |
| Title | Blunders, Errors, and Mistakes |
| Concept ID | phys.meas.measurement-errors |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Engineer's Perspective |
| Target Learner | Age 12–17, M1 recovery target |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Understand |
| Estimated Duration | 5–7 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | None |
| Voice Requirement | Medium |
| Interaction Type | Explanation + Classification |

### Pedagogical Metadata

**Why this strategy works:**
M1 (error = mistake) is the most persistent misconception in this topic.
Giving the student a three-way vocabulary (blunder, systematic error,
random error) with clear definitions eliminates the ambiguity that lets
M1 persist. Blunders (true mistakes) are a third category that gets
excluded from the scientific error framework.

**Mental model installed:**
"Scientists distinguish three things most people call 'error':
Blunders (reading 23 when you meant 32 — human mistakes, not discussed
in error analysis), Systematic errors (consistent offset from a bias),
Random errors (statistical scatter). The word 'error' in physics refers
only to Systematic and Random. Blunders are found by outlier detection
and discarded."

**Misconceptions prevented:** M1.

**Misconceptions recovered:** M1.

**Prerequisite knowledge assumed:** phys.meas.units. ME-01 helpful.

**Cognitive load:** Low — three-category classification.

### Teaching Script

*Say:*

"Here is a problem: in everyday English, 'error' means 'mistake.'
In physics, 'error' does NOT mean mistake. This causes enormous confusion.

Let me give you three things and ask you to classify each:

(1) You mean to write 4.73 but you write 4.37. You transpose two digits.
    What is this?

(2) Your scale is improperly calibrated — every reading is 0.3 kg too heavy.
    What is this?

(3) Your hand trembles slightly as you read a scale — each reading varies
    by a few hundredths.
    What is this?

Physicists use three words:

(1) is a BLUNDER — a human mistake, a transcription error, an accident.
    Solution: check your work, repeat carefully, discard obvious outliers.
    Blunders are not included in error analysis. They are found and eliminated.

(2) is a SYSTEMATIC ERROR — a consistent bias. Not a mistake. The instrument
    is doing what it was built to do — but it was built or set incorrectly.
    Solution: calibration, comparison to a standard.

(3) is a RANDOM ERROR — statistical scatter. Also not a mistake. The
    instrument and experimenter are doing their best — the scatter comes
    from uncontrolled variations. Solution: averaging, more measurements.

When a physicist says 'my measurement has an error of ± 0.02 cm,' they do
not mean they made a mistake. They mean the uncertainty in their measurement
is 0.02 cm — and that is a precise, professional statement."

### Success Model

**Success signals:**
- Student correctly classifies the three scenarios
- Student uses "blunder," "systematic error," and "random error" correctly in context
- Student stops using "error" to mean mistake in physics contexts

**Failure signals:**
- Student still conflates blunder and systematic error
- Student thinks all three can be fixed by "being more careful"

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "Your data has one reading of 99.7 when all others are around 4.73. What type is this?" → mastery if student says blunder (outlier) |
| Unsuccessful | Route to ME-01 (archery — show what the error types look like visually) |
| Unsuccessful — all "mistakes" | Route to ME-02 (historical framing — error as a property of measurement) |

### Retrieval Tags

`classification` `blunder-vs-error` `M1-recovery` `three-categories` `systematic-vs-random` `vocabulary` `engineer` `fundamental`

### AI Retrieval Notes

**When to choose:** M1 is active (student says "error" to mean mistake).
This should be the targeted M1 recovery intervention.

**When to avoid:** Student who already uses "error" correctly in the
physics sense.

**Which interventions follow naturally:** ME-03 (thermometer — concrete
systematic example) and ME-05 (two thieves — vivid systematic vs random).

---

## ME-10 — The Everywhere-Between Game

### Identity

| Field | Value |
|---|---|
| Intervention ID | ME-10 |
| Title | The Everywhere-Between Game |
| Concept ID | phys.meas.measurement-errors |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Child-friendly |
| Target Learner | Age 10–13, first encounter, low confidence |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Remember |
| Estimated Duration | 4–6 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | None |
| Voice Requirement | High |
| Interaction Type | Story + Game |

### Pedagogical Metadata

**Why this strategy works:**
Young learners understand estimating ("somewhere between") without
needing formal vocabulary. The "somewhere between" framing is the
informal foundation for uncertainty before ± notation is introduced.
Playing the game first, then naming the concept, follows the concrete-
before-abstract sequence.

**Mental model installed:**
"Every measurement is 'somewhere between' two values — not exactly
one number. When a scientist says their answer is 4.73 ± 0.02, they
mean 'somewhere between 4.71 and 4.75.' The 'somewhere between' is
the real measurement."

**Misconceptions prevented:** M1, M4.

**Misconceptions recovered:** M1.

**Prerequisite knowledge assumed:** phys.meas.units. Can read simple
numbers. No formal physics.

**Cognitive load:** Minimal.

### Teaching Script

*Say:*

"Let's play a game. I'm going to ask you to guess my weight.

You look at me and say: 'About 70 kg.'

I say: 'Could it be 65 kg?'
You say: 'Maybe.'

I say: 'Could it be 90 kg?'
You say: 'Probably not.'

So your guess is: somewhere between 65 and 80 kg. Maybe. Not exactly 70.

That 'somewhere between' feeling — that is what scientists mean by uncertainty.

Every measurement in science is 'somewhere between.' Not exactly one number —
somewhere in a range.

A thermometer might read 37.2°C. But is it exactly 37.2?
Or is it somewhere between 37.1 and 37.3?

It's somewhere between. The thermometer's marks only go to 0.1 degrees.
So the true temperature is somewhere in a range around 37.2.

This is not a mistake. This is just how measuring works. No measurement
is ever exactly, perfectly, perfectly right. Every measurement is a
'somewhere between.'

Scientists write this as 37.2 ± 0.1°C. The '± 0.1' is the somewhere-between size."

### Success Model

**Success signals:**
- Child understands that measurements are ranges, not exact points
- Child can express a "somewhere between" range for a given measurement
- Child grasps that ± means "somewhere between"

**Failure signals:**
- Child thinks the measurement is still exactly the stated number
- Child cannot estimate a plausible "somewhere between" range

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "A ruler reads 5.3 cm. What would you write as the somewhere-between?" → mastery if child gives a plausible range (5.2–5.4 or 5.25–5.35) |
| Unsuccessful | Prerequisite check (phys.meas.units — measurement concept may not be in place) |

### Retrieval Tags

`child-friendly` `somewhere-between` `range` `M1-prevention` `M4-prevention` `age-10-13` `low-anxiety` `first-contact` `intuitive`

### AI Retrieval Notes

**When to choose:** Youngest learners (10–13) or very anxious students.
The fallback when ME-01 (archery) is too abstract for first contact.

**When to avoid:** Students 14+ who would find the framing too simple.
Student who already has the ± concept.

**Which interventions follow naturally:** ME-01 (archery target) to
formalise what the somewhere-between game introduced.
ME-04 (measurement as a range) for the ± notation.

---

## Teaching Decision Graph

### Intervention Index

| ID | Title | Strategy | Target | CPA Stage | Bloom | Duration | Primary Misconception Target |
|---|---|---|---|---|---|---|---|
| ME-01 | The Arrow and the Bullseye | Analogy | Age 12–16, general | Concrete | Understand | 5–7 min | M3 |
| ME-02 | The Archer Who Never Missed | Historical Discovery | Age 12–16, curious | Concrete | Understand | 6–8 min | M2, M4 |
| ME-03 | The Faulty Thermometer | Everyday Life Story | Age 12–16, practical | Concrete | Understand | 5–7 min | M1, M3 |
| ME-04 | Measurement as a Range | Visual + Procedure | Age 13–16, analytical | Representational | Apply | 7–9 min | M4 |
| ME-05 | Two Thieves in Your Measurement | Analogy | Age 12–16, M3 target | Concrete | Understand | 5–7 min | M3 |
| ME-06 | Error Doesn't Disappear in Calculator | Guided Discovery | Age 13–17, computational | Abstract | Apply | 8–10 min | M4 |
| ME-07 | The Crooked Tape Measure | Simple Experiment | Age 12–15, tactile | Concrete | Apply | 7–10 min | M1, M3 |
| ME-08 | What ±0.02 Is Telling You | Socratic Dialogue | Age 13–17, analytical | Abstract | Analyze | 7–9 min | M4 |
| ME-09 | Blunders, Errors, and Mistakes | Engineer's Perspective | Age 12–17, M1 target | Concrete | Understand | 5–7 min | M1 |
| ME-10 | The Everywhere-Between Game | Child-friendly | Age 10–13, first contact | Concrete | Remember | 4–6 min | M1, M4 |

### Recovery Graph

| From | If Successful | If Unsuccessful |
|---|---|---|
| ME-01 | "Thermometer reads 2°C too high — precise or accurate?" → mastery | ME-10 → ME-04 → ME-05 |
| ME-02 | "4.73 ± 0.02 — what does ± mean?" → mastery | ME-01 → ME-07 |
| ME-03 | "Scale always 0.5 kg heavy — does averaging fix it?" → mastery | ME-01 → ME-09 |
| ME-04 | "10.3±0.2 vs 10.8±0.1 — do they agree?" → mastery | ME-10 → ME-01 |
| ME-05 | "You measure room 20 times — which thief reduced?" → mastery | ME-03 → ME-01 |
| ME-06 | "Which input dominates A+B uncertainty?" → mastery | ME-04 → ME-05 |
| ME-07 | "Name a systematic error source in a real lab." → mastery | ME-03 → ME-01 |
| ME-08 | "10.3±0.2 vs 10.8±0.2 (1σ) — significant?" → mastery | ME-04 → ME-05 |
| ME-09 | "Reading of 99.7 vs all others ≈4.73 — what type?" → mastery | ME-01 → ME-02 |
| ME-10 | "Ruler reads 5.3 cm — somewhere-between range?" → mastery | Prerequisite check |

### Misconception → Intervention Map

| Misconception | Definition | Entry Intervention |
|---|---|---|
| M1 | Error means mistake | ME-09 (classification), ME-03 (thermometer), ME-10 (young/anxious) |
| M2 | Better instruments eliminate all error | ME-02 (history), ME-05 (two thieves) |
| M3 | Random error and systematic error are the same | ME-01 (archery), ME-05 (two thieves) |
| M4 | Repeating and averaging gives the true value | ME-04 (range), ME-06 (propagation), ME-08 (statistical) |

### Starting Intuition Map

| ID | Starting Intuition (distinct entry point) |
|---|---|
| ME-01 | Archery target — four combinations of precision and accuracy visualised |
| ME-02 | History of physics — scientists once believed error was eliminable |
| ME-03 | Faulty thermometer — a 2°C offset that averaging doesn't fix |
| ME-04 | Number line — measurement is an interval, not a point |
| ME-05 | Two thieves — random steals differently each time; systematic steals the same |
| ME-06 | Error propagation — uncertainty compounds through calculations |
| ME-07 | Crooked tape measure — student creates systematic and random error physically |
| ME-08 | Statistical confidence — ± is a probability statement, not a hard boundary |
| ME-09 | Three-category vocabulary — blunders are not errors in the physics sense |
| ME-10 | Somewhere-between game — every measurement is a range before it has a name |

### Retrieval Tag Index

| Tag | Interventions |
|---|---|
| concrete | ME-01, ME-02, ME-03, ME-05, ME-07, ME-09, ME-10 |
| abstract | ME-06, ME-08 |
| M1-recovery | ME-03, ME-07, ME-09, ME-10 |
| M2-recovery | ME-02, ME-05 |
| M3-recovery | ME-01, ME-03, ME-05, ME-07 |
| M4-recovery | ME-04, ME-06, ME-08 |
| visual | ME-01, ME-04 |
| young-learner | ME-10, ME-03, ME-01 |
| STEM-learner | ME-06, ME-08, ME-09 |
| first-contact | ME-01, ME-10 |
| hands-on | ME-07 |

---

## Self-Audit

**Interventions:** 10 / 10

**Misconception coverage:**
- M1 (error = mistake): ME-03, ME-07, ME-09, ME-10 — 4 direct hits ✓
- M2 (instruments eliminate error): ME-02, ME-05 — 2 direct hits ✓
- M3 (random = systematic): ME-01, ME-03, ME-05, ME-07 — 4 direct hits ✓
- M4 (averaging gives true value): ME-04, ME-06, ME-08 — 3 direct hits ✓

**Recovery graph completeness:** 10 / 10 nodes complete ✓

**CPA coverage:**
- Concrete: ME-01, ME-02, ME-03, ME-05, ME-07, ME-09, ME-10 (7 interventions)
- Representational: ME-04 (1 intervention)
- Abstract: ME-06, ME-08 (2 interventions)

**Decision graph completeness:** All five sections complete ✓

**Remaining weaknesses:**
- Percentage error and relative error are not explicitly treated — these are
  natural extensions that could form ME-11.
- The distinction between uncertainty and error (error = difference from true
  value; uncertainty = our estimate of the error) is introduced in ME-08
  but not the focus of any single intervention.
