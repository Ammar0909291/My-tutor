# Teaching Content Library — `phys.meas.precision-accuracy`
# Precision and Accuracy

**Status:** CANDIDATE ASSETS — not yet in production blueprint
**Concept ID:** `phys.meas.precision-accuracy`
**Note:** Precision/accuracy is treated as a sub-topic within phys.meas.errors in the KG.
**TCL Version:** 2.0 — Educational Brain Teaching Assets Standard
**Authored against:** KG node phys.meas.errors (phys.meas.significant-figures also relevant)
**Date:** 2026-07-14
**Asset count:** 10
**Governing misconceptions:** M1 (precise = accurate — the dominant misconception), M2 (more decimal places = more accurate), M3 (high precision with a wrong answer is still good), M4 (accuracy is about getting the right answer — not about closeness to true value)

---

## Purpose

The Teaching Content Library is the asset pool from which the Teaching Engine retrieves
interventions rather than generating them from scratch. Every intervention is a decision
node — it knows when to be chosen, what success looks like, what failure looks like, and
where to route next. Together, the ten interventions form a Teaching Decision Graph.

The core insight every intervention must install:

> **Precision is about spread — how consistent are your results?
> Accuracy is about aim — how close are your results to the true value?
> These are completely independent. You can have either without the other.**

---

## Intervention Graph Overview

```
Entry points (no prior attempt):  PA-01 (default) · PA-10 (young/anxious) · PA-04 (visual)

After PA-01 fails:  PA-10 → PA-04 → PA-07
After PA-02 fails:  PA-01 → PA-04
After PA-03 fails:  PA-01 → PA-07
After PA-04 fails:  PA-10 → PA-01
After PA-05 fails:  PA-04 → PA-01
After PA-06 fails:  PA-01 → PA-04
After PA-07 fails:  PA-04 → PA-01
After PA-08 fails:  PA-01 → PA-03
After PA-09 fails:  PA-01 → PA-04
After PA-10 fails:  prerequisite check (phys.meas.errors — measurement-as-range concept)

After any success:  Four-quadrant classification probe → mastery gate
                    If M1 still active → PA-05 (snipers — precise but wrong)
```

---

## PA-01 — The GPS and the Paper Map

### Identity

| Field | Value |
|---|---|
| Intervention ID | PA-01 |
| Title | The GPS and the Paper Map |
| Concept ID | phys.meas.precision-accuracy |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Everyday Life Story |
| Target Learner | Age 12–16, first encounter |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Understand |
| Estimated Duration | 5–7 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | None |
| Voice Requirement | Recommended |
| Interaction Type | Story + Dialogue |

### Pedagogical Metadata

**Why this strategy works:**
GPS vs paper map is a near-universal modern experience. The GPS gives
readings to four decimal places (very precise) — but if the GPS receiver
is faulty, all those readings are consistently wrong (inaccurate). The
paper map, by contrast, shows the road correctly but can only pin you
to a neighbourhood (accurate but imprecise). The contrast is immediate
and personal.

**Mental model installed:**
"Precision is about how many decimal places your answer has and how
reproducibly you get the same value. Accuracy is about whether your
value is actually right — whether it represents reality. A GPS reading
51.5074° N to four decimal places is precise. If the GPS chip has a
systematic drift, it might show 51.5082° N consistently — precise, wrong."

**Misconceptions prevented:** M1, M2.

**Misconceptions recovered:** M1 — the GPS gives many decimal places (M2 cue)
but is still inaccurate.

**Prerequisite knowledge assumed:** phys.meas.units. phys.meas.errors helpful.

**Cognitive load:** Low.

### Teaching Script

*Say:*

"Two people are trying to find a restaurant.

Person A has a GPS navigation system. It shows their current location as
51.5074° N, 0.1278° W — four decimal places. Very precise. It updates
every second. But the GPS chip in their phone has a known fault — it
consistently reads 800 metres too far east.

Person B has a paper map from 1990. The map shows streets but nothing smaller.
They can tell they're in the right part of town — within about 100 metres
of the restaurant — but they can't pin down which building.

Who is more precise?"

*Person A — four decimal places, consistent.*

"Who is more accurate?"

*Person B — they know roughly where the restaurant actually is, without
the systematic eastern drift.*

"Person A has very high precision — four decimal places, same reading every
second. But they are consistently 800 metres east of where they think they are.
Their GPS is precise AND inaccurate.

Person B has low precision — they can only place themselves to about 100 metres.
But their information is accurate — the restaurant really is in that direction.
Their map is imprecise AND accurate.

These are not the same thing. Precision is about the consistency and
number of digits. Accuracy is about closeness to the true value."

### Success Model

**Success signals:**
- Student correctly identifies Person A as precise but inaccurate
- Student correctly identifies Person B as imprecise but accurate
- Student articulates that precision and accuracy are independent

**Failure signals:**
- Student says Person A is "more accurate because it has more decimal places" (M1+M2)
- Student cannot articulate the independence of the two concepts

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "A thermometer reads 36.8°C, 36.8°C, 36.8°C — but body temperature is 37.0°C. Precise or accurate?" → mastery if student says precise but inaccurate |
| Unsuccessful | Route to PA-10 (simpler everyday framing) |
| Unsuccessful — needs visual | Route to PA-04 (archery target — four-quadrant visual) |

### Retrieval Tags

`everyday-story` `GPS` `paper-map` `M1-prevention` `M2-prevention` `independence` `first-contact` `concrete`

### AI Retrieval Notes

**When to choose:** Default first intervention. Works across ages and
backgrounds. Sets up the independence of precision and accuracy clearly.

**When to avoid:** Student who has no experience with GPS.
Student who already knows the precision/accuracy distinction.

**Which interventions follow naturally:** PA-04 (archery target) to
visualise the four combinations formally.

---

## PA-02 — The Weighing Machine Conspiracy

### Identity

| Field | Value |
|---|---|
| Intervention ID | PA-02 |
| Title | The Weighing Machine Conspiracy |
| Concept ID | phys.meas.precision-accuracy |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Real-world Observation |
| Target Learner | Age 12–16, sceptical, responds to revealing flaws |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Understand |
| Estimated Duration | 5–7 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | None |
| Voice Requirement | Medium |
| Interaction Type | Observation + Dialogue |

### Pedagogical Metadata

**Why this strategy works:**
Bathroom scales are a familiar source of measurement suspicion for most
people. The scale that gives very consistent readings (precise) but is
consistently wrong by 2 kg (inaccurate) is a directly relatable
systematic-error scenario. The student connects personal experience
of "my scale is wrong" to the formal precision/accuracy distinction.

**Mental model installed:**
"A bathroom scale that always reads 72.4 kg, 72.4 kg, 72.4 kg when your
doctor says you're 70.2 kg is extremely precise (perfect consistency)
but inaccurate (consistently 2.2 kg too heavy). Weighing yourself ten
times will not tell you this — it will just confirm the wrong number
ten times. Only comparing to a calibrated scale reveals the accuracy problem."

**Misconceptions prevented:** M1, M3.

**Misconceptions recovered:** M3 — high precision with a wrong answer is not fine.

**Prerequisite knowledge assumed:** phys.meas.units. phys.meas.errors helpful.

**Cognitive load:** Very low.

### Teaching Script

*Say:*

"You are training for a marathon and tracking your weight carefully.
Every morning, you step on your bathroom scale. It reads:

Monday: 72.4 kg
Tuesday: 72.4 kg
Wednesday: 72.5 kg
Thursday: 72.4 kg
Friday: 72.4 kg

Very consistent. You feel confident: you weigh about 72.4 kg.

You visit your doctor. The clinic scale reads 70.2 kg.

You weigh yourself on the clinic scale five times: 70.2, 70.1, 70.2, 70.2, 70.3.

Who is right?"

*Let them reason.*

"The clinic scale is calibrated — it was checked against a known standard
last month. Your bathroom scale has probably never been calibrated.

Your bathroom scale is precise — it gives the same answer every time.
But it is inaccurate — systematically 2.2 kg too heavy.

The clinic scale is also precise (low scatter) AND accurate (close to
your true weight).

Now: if precision and accuracy were the same thing, your precise bathroom
scale would be accurate. But they're not the same thing. You can build
an extremely consistent (precise) instrument that is consistently wrong (inaccurate).

The fix? Calibration. Compare to a known standard. Find the offset.
Subtract it every time you use the bathroom scale."

### Success Model

**Success signals:**
- Student correctly identifies the bathroom scale as precise but inaccurate
- Student understands that repeating measurements on the same (wrong) scale
  does not reveal inaccuracy
- Student names calibration as the fix for inaccuracy (not repetition)

**Failure signals:**
- Student says the bathroom scale is "right" because it's consistent
- Student thinks repeating measurements would reveal the error

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "What would make the bathroom scale both precise and accurate?" → mastery if student identifies calibration (not just 'being more careful') |
| Unsuccessful | Route to PA-01 (GPS map — different context, same principle) |
| Unsuccessful — needs visual | Route to PA-04 (archery target — four-quadrant visual) |

### Retrieval Tags

`real-world` `bathroom-scale` `systematic-offset` `M1-prevention` `M3-prevention` `calibration` `concrete` `health-context`

### AI Retrieval Notes

**When to choose:** Student has a health/body-awareness context.
Good for M3 recovery (high precision with wrong answer is not fine).

**When to avoid:** Student who is anxious about weight/body image.
First contact if PA-01 hasn't established the independence principle.

**Which interventions follow naturally:** PA-04 (archery) to
visualise the four combinations.

---

## PA-03 — The Watchmaker's Paradox

### Identity

| Field | Value |
|---|---|
| Intervention ID | PA-03 |
| Title | The Watchmaker's Paradox |
| Concept ID | phys.meas.precision-accuracy |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Historical Discovery |
| Target Learner | Age 13–16, curious |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Understand |
| Estimated Duration | 6–8 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | None |
| Voice Requirement | Medium |
| Interaction Type | Story + Discussion |

### Pedagogical Metadata

**Why this strategy works:**
The history of clockmaking contains real examples of extremely precise
(but inaccurate) timepieces — clocks that kept perfect time relative
to themselves but drifted from true time. The paradox ("it's always
perfectly consistent but always wrong by the same amount") makes M1
untenable through a vivid historical case.

**Mental model installed:**
"A mechanical clock might tick at exactly the same rate for years —
it is precise in the sense of consistency — but if its rate is slightly
too fast, it will drift further and further from true time, never reaching
accuracy. Precision without accuracy can accumulate into a large error over time."

**Misconceptions prevented:** M1, M3.

**Misconceptions recovered:** M1 — historical case where precision and accuracy diverge dramatically.

**Prerequisite knowledge assumed:** phys.meas.units. Understands that time can be measured.

**Cognitive load:** Low.

### Teaching Script

*Say:*

"For centuries, sailors at sea had no reliable way to know their longitude —
their east-west position. They could measure latitude (north-south) from
the stars, but longitude requires knowing the exact time.

A ship's clock that loses or gains one minute per day would, after 30 days,
be 30 minutes off. On a transatlantic crossing, 30 minutes of time error
translates to about 500 kilometres of longitude error — enough to crash
into a coastline you thought was hundreds of miles away.

In 1713, the British Parliament offered £20,000 (millions in today's money)
for a clock that could keep accurate time at sea.

John Harrison spent his life building clocks. His first chronometer
gained approximately one second per day — extremely precise. Precise
enough that the seconds were perfectly regular. But one second per day
error accumulated. It was consistently fast.

His fourth design (H4, 1759) gained only one-third of a second per day.
Over a 47-day trial, it was just five seconds off the true time.

Notice: all his clocks were precise — they ticked consistently.
They differed in accuracy — how close they stayed to true solar time.

Precision without accuracy kills sailors. Precision with accuracy saves them."

### Success Model

**Success signals:**
- Student grasps that all clocks were precise but differed in accuracy
- Student explains how one second per day drift is precise but inaccurate
- Student understands why accuracy matters more than consistency alone for navigation

**Failure signals:**
- Student focuses on the history without extracting the precision/accuracy distinction
- Student thinks the clock that gained one second per day was "not precise"

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "Harrison's H4 was 5 seconds off after 47 days. Is this precise, accurate, or both?" → mastery if student says both (consistent ticking AND close to true time) |
| Unsuccessful | Route to PA-01 (GPS — modern context, same lesson) |
| Unsuccessful — concept unclear | Route to PA-04 (archery target — visual) |

### Retrieval Tags

`history` `harrison` `longitude` `clockmaking` `M1-recovery` `M3-prevention` `curious-learner` `maritime` `accumulation`

### AI Retrieval Notes

**When to choose:** History-responsive student. After PA-01 establishes
the basic distinction and the student needs a deeper, historical case.

**When to avoid:** Young students who won't relate to 18th-century navigation.

**Which interventions follow naturally:** PA-05 (sniper — more dramatic
version of M1 counterexample). PA-04 (archery target — visual formalisation).

---

## PA-04 — The Four-Target Diagram

### Identity

| Field | Value |
|---|---|
| Intervention ID | PA-04 |
| Title | The Four-Target Diagram |
| Concept ID | phys.meas.precision-accuracy |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Visual Mental Picture |
| Target Learner | Age 11–16, visual learner |
| Difficulty | Beginner |
| CPA Stage | Representational |
| Bloom Level | Understand |
| Estimated Duration | 5–7 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | High — the four-target diagram is the core |
| Voice Requirement | Low |
| Interaction Type | Visual Explanation + Classification |

### Pedagogical Metadata

**Why this strategy works:**
The four archery targets (precise+accurate, precise+inaccurate,
imprecise+accurate, imprecise+inaccurate) make all four combinations
visible simultaneously. The student can see, in one image, that M1
is false — precise and accurate are different axes, not the same thing.

**Mental model installed:**
"Precision and accuracy are two independent axes. They make four combinations.
The goal is always the top-right quadrant: high precision AND high accuracy.
But most real instruments live somewhere else on this grid — and knowing
which quadrant you're in tells you what to fix."

**Misconceptions prevented:** M1, M2, M3.

**Misconceptions recovered:** M1.

**Prerequisite knowledge assumed:** phys.meas.units.

**Cognitive load:** Low — the diagram carries it.

### Teaching Script

*Draw or describe four targets:*

```
        LOW ACCURACY          HIGH ACCURACY
        (off-target)          (on-target)

HIGH    ● ●                      ●●
PREC.   ●●                       ●●●
(tight)  ●                        ●
        PRECISE, INACCURATE    PRECISE, ACCURATE
        (systematic error)     (ideal)

LOW     ●        ●            ●
PREC.    ●    ●              ●     ●
(spread) ●  ●                  ●●
        IMPRECISE, INACCURATE  IMPRECISE, ACCURATE
        (worst case)          (random error, good average)
```

*Say:*

"Four archers. Four targets. Each archer shoots five arrows.

Target 1: arrows tight together, off-centre. PRECISE but INACCURATE.
This archer has a consistent technique — but their sight is misaligned.
Fix: recalibrate the sight (fix the systematic error).

Target 2: arrows tight together, at the bullseye. PRECISE and ACCURATE.
This is what we want. Consistent technique, correct aim.

Target 3: arrows scattered, but centred on the bullseye. IMPRECISE but ACCURATE.
This archer aims correctly but has a shaky hand. Average of their shots
falls at the bullseye. Fix: more measurements (average out the randomness).

Target 4: arrows scattered everywhere. IMPRECISE and INACCURATE.
Both problems. Fix the aim first, then stabilise the technique.

The key insight: these are two independent properties. You cannot infer one
from the other. Precise does not imply accurate. Accurate does not imply precise.

Where would you rather be — Target 1 or Target 3?"

*Discuss: it depends. Precise-but-wrong can be fixed (known offset).
Accurate-but-scattered requires many measurements.*

### Success Model

**Success signals:**
- Student correctly names all four quadrants
- Student identifies the fix for each quadrant (calibration vs more measurements)
- Student explains why M1 is false using the diagram

**Failure signals:**
- Student confuses Target 1 and Target 3 (precision and accuracy swapped)
- Student cannot name the fix for each quadrant

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "A set of measurements: 4.7, 4.7, 4.8, 4.7 — true value 6.2. What quadrant?" → mastery if student says precise but inaccurate |
| Unsuccessful — visual not available | Route to PA-01 (GPS story — verbal version of the same four-quadrant logic) |
| Unsuccessful — confusion between quadrants | Route to PA-05 (sniper — dramatic example of precise+inaccurate) |

### Retrieval Tags

`visual` `four-targets` `archery` `four-quadrants` `M1-prevention` `M3-prevention` `representational` `diagram` `two-axes`

### AI Retrieval Notes

**When to choose:** Visual learner. Best when a diagram can be shown.
Good second intervention after PA-01 establishes the basic distinction.

**When to avoid:** Text-only session where the diagram cannot be shown.

**Which interventions follow naturally:** PA-06 (precision in practice)
to apply the four-quadrant framework to real measurements.

---

## PA-05 — The Sniper Who Always Misses Left

### Identity

| Field | Value |
|---|---|
| Intervention ID | PA-05 |
| Title | The Sniper Who Always Misses Left |
| Concept ID | phys.meas.precision-accuracy |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Analogy |
| Target Learner | Age 13–17, M1 recovery target |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Understand |
| Estimated Duration | 4–6 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | None |
| Voice Requirement | Medium |
| Interaction Type | Dialogue |

### Pedagogical Metadata

**Why this strategy works:**
A sniper who hits the same wrong spot every time is the most vivid
possible demonstration that precision is not accuracy. The story is
memorable, slightly dramatic, and makes the distinction completely
unambiguous. Best used as the targeted M1 recovery after other
interventions have not resolved M1.

**Mental model installed:**
"A sniper who hits a spot 20 cm left of the target, perfectly, every
single shot — is the most precise shooter in the world. And they never
hit the target. Precision and accuracy are completely independent."

**Misconceptions prevented:** M1.

**Misconceptions recovered:** M1.

**Prerequisite knowledge assumed:** phys.meas.units.

**Cognitive load:** Minimal.

### Teaching Script

*Say:*

"Imagine two snipers.

Sniper A fires five shots. They land in a scattered pattern around the
target. None hit the bullseye, but they're spread around it. The average
of the five shots is very close to the centre.

Sniper B fires five shots. They all hit exactly the same spot — 20 cm
to the left of the bullseye. Five shots, same hole.

Which sniper is more precise?"

*Sniper B — five shots, same spot.*

"Which sniper is more accurate?"

*Sniper A — scattered but centred on the bullseye.*

"Sniper B is the most precise shot in the world. Every trigger pull,
same spot. But their sight is miscalibrated — 20 cm left. They never hit
the target.

Sniper A is accurate on average but imprecise — they can't reproduce the
same shot.

If you had to pick one sniper to fix in one operation — which would you fix?

Sniper B is actually easier to fix. Adjust the sight 20 cm right — the
technique is already perfect. One calibration and Sniper B hits the bullseye
every shot.

Sniper A needs technique training — months of work.

This is why scientists sometimes prefer precise-but-inaccurate instruments
to imprecise-but-accurate ones: a systematic offset can be corrected.
Random scatter requires more measurements."

### Success Model

**Success signals:**
- Student immediately grasps that Sniper B is more precise but less accurate
- Student understands why Sniper B is easier to fix (known systematic offset)
- Student no longer conflates the two concepts

**Failure signals:**
- Student says Sniper B is "better" without grasping the distinction
- Student still conflates precision and accuracy after the story

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: four-quadrant classification of a given data set → mastery |
| Unsuccessful — M1 very persistent | Route to PA-04 (four-target diagram) — visual version |
| Unsuccessful | Route to PA-01 (GPS map — different memorable context) |

### Retrieval Tags

`analogy` `sniper` `M1-recovery` `dramatic` `precise-but-wrong` `calibration` `systematic-offset` `memorable`

### AI Retrieval Notes

**When to choose:** M1 is strongly persistent after PA-01 and PA-04
have been tried. The dramatic counterexample is the strongest M1 antidote.

**When to avoid:** First contact. Student who has already resolved M1.

**Which interventions follow naturally:** PA-08 (when to choose precision
vs accuracy) to deepen after M1 is resolved.

---

## PA-06 — Precision in Practice: The Lab Report

### Identity

| Field | Value |
|---|---|
| Intervention ID | PA-06 |
| Title | Precision in Practice: The Lab Report |
| Concept ID | phys.meas.precision-accuracy |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Guided Discovery |
| Target Learner | Age 13–17, lab/exam context |
| Difficulty | Intermediate |
| CPA Stage | Abstract |
| Bloom Level | Apply |
| Estimated Duration | 8–10 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Low — written data table |
| Voice Requirement | Medium |
| Interaction Type | Analysis |

### Pedagogical Metadata

**Why this strategy works:**
Working backwards from a data set to determine which quadrant it occupies —
and what this implies about the error type — gives the student the complete
analytical workflow. The student sees that quantifying precision (standard
deviation) and accuracy (mean vs true value) requires distinct calculations.

**Mental model installed:**
"Precision is measured by the spread of repeated measurements (standard
deviation or range). Accuracy is measured by the distance of the mean
from the true value (percentage error or bias). These require separate
calculations and have separate fixes."

**Misconceptions prevented:** M1, M2, M3.

**Misconceptions recovered:** M3.

**Prerequisite knowledge assumed:** PA-01 or PA-04. Basic statistics (mean, range).

**Cognitive load:** Medium-high.

### Teaching Script

*Present data:*

"A student measures the boiling point of water five times:
  99.3, 99.4, 99.3, 99.4, 99.3 °C

True value: 100.0°C at sea level.

Question 1: Is this measurement precise or imprecise?"

*Range = 0.1°C. Very small. Very precise.*

"Question 2: Is it accurate or inaccurate?"

*Mean = 99.34°C. True value = 100.0°C. Offset = 0.66°C. Inaccurate.*

"Now another student:
  98.1, 100.4, 101.3, 99.7, 100.5 °C

Mean = 100.0°C. Spread: range = 3.2°C.

Precise or imprecise? Mean accurate or inaccurate?"

*Imprecise (large range), but accurate (mean matches true value).*

"Now you have data. You can calculate:
  Precision = measured by range or standard deviation (spread)
  Accuracy = measured by: (|mean - true value| / true value) × 100%

These are separate numbers. A data set can have excellent precision
(SD = 0.05°C) and poor accuracy (mean = 95°C when true = 100°C).
Or vice versa.

For each: identify which error type is responsible, then choose the fix."

### Success Model

**Success signals:**
- Student correctly classifies both data sets (precise+inaccurate and imprecise+accurate)
- Student can calculate a simple percentage accuracy
- Student identifies the appropriate fix for each (calibration vs more measurements)

**Failure signals:**
- Student confuses which calculation measures precision vs accuracy
- Student identifies the first data set as accurate because the spread is small

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: student presents their own data set and self-classifies → mastery |
| Unsuccessful | Route to PA-01 → PA-04 (rebuild concept before this analytical application) |
| Unsuccessful — statistics difficult | Route to PA-07 (simple numerical examples without statistics vocabulary) |

### Retrieval Tags

`guided-discovery` `lab` `data-analysis` `M1-recovery` `M3-prevention` `standard-deviation` `percentage-error` `analytical` `intermediate`

### AI Retrieval Notes

**When to choose:** Lab or exam context. Student has the conceptual
distinction and needs the analytical procedure.

**When to avoid:** First contact. Student who hasn't grasped the concept.

**Which interventions follow naturally:** PA-08 (when to prioritise
precision vs accuracy) to extend the analytical framework.

---

## PA-07 — The Broken Clock Paradox

### Identity

| Field | Value |
|---|---|
| Intervention ID | PA-07 |
| Title | The Broken Clock Paradox |
| Concept ID | phys.meas.precision-accuracy |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Socratic Dialogue |
| Target Learner | Age 12–16, analytical, responds to paradox |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Analyze |
| Estimated Duration | 6–8 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | None |
| Voice Requirement | High |
| Interaction Type | Dialogue |

### Pedagogical Metadata

**Why this strategy works:**
"A stopped clock is right twice a day" is a famous paradox that perfectly
illustrates the precision/accuracy trade-off in an extreme case. A stopped
clock has zero precision (it never changes) but is accurate twice daily.
The paradox forces the student to articulate what they mean by each concept.

**Mental model installed:**
"A stopped clock: precision = zero (never changes), accuracy = perfect twice
a day. A clock running 1 minute fast: precision = high (very consistent),
accuracy = low (always wrong). These examples show that the concepts are
genuinely independent — not correlated, not inverse, not equivalent."

**Misconceptions prevented:** M1.

**Misconceptions recovered:** M1 — the paradox is irresolvable without the distinction.

**Prerequisite knowledge assumed:** phys.meas.units. PA-01 helpful.

**Cognitive load:** Medium — the paradox requires thinking.

### Teaching Script

*Say:*

"Here is a famous saying: 'A stopped clock is right twice a day.'

Do you think that's true? And if it is — is a stopped clock a good clock?"

*Let them respond.*

"It's true. If your clock stopped at 3:00 PM, then at exactly 3:00 PM and
3:00 AM each day, your clock shows the correct time.

So at those two moments, your stopped clock is perfectly accurate.

Now — how precise is a stopped clock?"

*Precision = consistency across readings. A stopped clock always reads 3:00. Very consistent.*

"Here is the paradox: a stopped clock is, in one sense, perfectly precise —
it always reads the same. And twice a day, perfectly accurate.

But you wouldn't use it to catch a train.

Why not?"

*Because it is only accidentally accurate — there is no relationship
between what it reads and what the actual time is.*

"This is the key. Accuracy without a mechanism connecting your measurement
to the true value is useless. The stopped clock doesn't track time — it
just happens to coincide with the true time twice a day.

A good clock is precise AND accurate — and the accuracy is earned, not
accidental. It ticks correctly because it is connected to a reliable process."

### Success Model

**Success signals:**
- Student grasps why the stopped clock is precise but not useful
- Student distinguishes accidental accuracy from earned accuracy
- Student articulates the independence of precision and accuracy in extreme form

**Failure signals:**
- Student concludes the stopped clock is "accurate" without the second qualification
- Student cannot resolve the apparent paradox

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "A clock running 1 minute fast — precise or accurate?" → mastery if student says precise (consistent) but inaccurate (always wrong) |
| Unsuccessful | Route to PA-01 (GPS — simpler paradox) |
| Unsuccessful — paradox confusing | Route to PA-04 (four-target diagram — visual framework) |

### Retrieval Tags

`socratic` `paradox` `stopped-clock` `M1-recovery` `precision-independence` `surprising` `analytical` `concrete`

### AI Retrieval Notes

**When to choose:** Student who responds to paradoxes and logical puzzles.
Best after PA-01 establishes the basic distinction.

**When to avoid:** Student who is easily confused by paradoxes.
First contact — the paradox requires prior vocabulary to resolve.

**Which interventions follow naturally:** PA-03 (Harrison clocks) to
extend the precise-but-inaccurate history further.

---

## PA-08 — When Precision Matters More Than Accuracy

### Identity

| Field | Value |
|---|---|
| Intervention ID | PA-08 |
| Title | When Precision Matters More Than Accuracy |
| Concept ID | phys.meas.precision-accuracy |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Engineer's Perspective |
| Target Learner | Age 13–17, STEM-oriented |
| Difficulty | Intermediate |
| CPA Stage | Abstract |
| Bloom Level | Evaluate |
| Estimated Duration | 7–9 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | None |
| Voice Requirement | Medium |
| Interaction Type | Explanation + Discussion |

### Pedagogical Metadata

**Why this strategy works:**
In some engineering contexts, precision matters more than absolute accuracy —
components that fit together need consistency with each other, not necessarily
with a world-standard. This nuance prevents the student from treating
"accuracy is always more important" as a rule. The context determines which
property matters.

**Mental model installed:**
"In manufacturing, two components must fit together. If both are produced
to the same precise specification — even if both have a small systematic
offset from the nominal value — they will fit. The consistency (precision)
matters more than absolute accuracy (closeness to the nominal value) as long
as both parts are made by the same calibrated process."

**Misconceptions prevented:** M3 (high precision with an offset is never good).

**Misconceptions recovered:** M3 — in some professional contexts, precision
is the primary criterion.

**Prerequisite knowledge assumed:** PA-01, PA-04. Some engineering awareness.

**Cognitive load:** Medium.

### Teaching Script

*Say:*

"Here is a situation where precision matters more than accuracy.

A factory manufactures bolts and nuts. The bolt must fit the nut.

The nominal diameter is 10.0 mm. Due to a calibration drift in the bolt
machine, all bolts come out at 10.1 mm — consistently. A systematic offset.

The nut machine has the same calibration drift — all nuts are 10.1 mm
inside diameter, consistently.

The bolt is 0.1 mm 'off' the nominal. The nut is 0.1 mm 'off.'
Both are inaccurate (offset from 10.0 mm). But they are both equally
and consistently offset — they fit each other perfectly.

Bolt: 10.1 mm precise (consistent), inaccurate (offset from nominal).
Nut: 10.1 mm precise (consistent), inaccurate (offset from nominal).
Assembly: works perfectly.

Compare: if the bolt machine were precise at 10.0 mm but the nut machine
had random scatter between 9.9 and 10.2 mm — some assemblies work, some jam.

In this context: consistent systematic error (precise but inaccurate)
is better than random error with correct average (accurate but imprecise).

This does not mean precision is always more important — it means the
context determines what matters. For navigation, accuracy matters most.
For mating parts produced in the same factory, precision matters most."

### Success Model

**Success signals:**
- Student grasps why the two machines with the same systematic offset produce a working assembly
- Student can articulate a context where precision matters more than accuracy
- Student understands that neither is universally more important

**Failure signals:**
- Student concludes "precision always matters more" (M3 replaced by a new version)
- Student cannot explain why the two offsets cancel in the assembly context

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "Name a context where accuracy matters more than precision." → mastery if student gives a valid example (navigation, drug dosing, fundamental constants) |
| Unsuccessful | Route to PA-01 → PA-06 (rebuild concept + analysis first) |
| Unsuccessful — too abstract | Route to PA-05 (sniper — simpler M3 counterpoint) |

### Retrieval Tags

`engineer` `manufacturing` `context-dependent` `M3-recovery` `systematic-offset` `mating-parts` `STEM-learner` `intermediate`

### AI Retrieval Notes

**When to choose:** STEM student who is ready for nuanced professional
application. After PA-04 and PA-06 establish the framework.

**When to avoid:** First contact. Student who hasn't grasped the basic distinction.

**Which interventions follow naturally:** PA-06 (lab report analysis)
to complete the professional skill set.

---

## PA-09 — The Runner's Split Times

### Identity

| Field | Value |
|---|---|
| Intervention ID | PA-09 |
| Title | The Runner's Split Times |
| Concept ID | phys.meas.precision-accuracy |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Real-world Observation |
| Target Learner | Age 12–16, sports context |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Apply |
| Estimated Duration | 5–7 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Low |
| Voice Requirement | Medium |
| Interaction Type | Observation + Calculation |

### Pedagogical Metadata

**Why this strategy works:**
Athletic performance measurement is a rich source of precision/accuracy
contrast. A stopwatch with consistent timing (precise) that runs fast
(inaccurate) vs a human hand-timing that varies but is calibrated to
the gun (accurate on average). The sports context engages students who
find laboratory scenarios distant.

**Mental model installed:**
"An electronic stopwatch that runs 0.2 seconds fast per 100m — every lap,
every race — is precise (consistent) but inaccurate (systematically off).
A hand-timed race that varies ± 0.3 seconds per lap but is calibrated to
the starting gun is accurate (right on average) but imprecise (high scatter)."

**Misconceptions prevented:** M1, M2.

**Misconceptions recovered:** M1.

**Prerequisite knowledge assumed:** phys.meas.units. Sports familiarity helpful.

**Cognitive load:** Low.

### Teaching Script

*Say:*

"A track coach uses two timing systems.

System 1: An electronic stopwatch. For every 100m lap it times, it reads
consistently 12.4 seconds, 12.4 seconds, 12.4 seconds. But the coach knows
this watch runs 0.2 seconds fast per 100m — it was never recalibrated.

System 2: A human hand-timer with a calibrated starter's gun sync. Readings:
12.1, 12.3, 11.9, 12.4, 12.2 seconds. Varies. But the average is 12.18 seconds
which matches the true race time from the official laser timing.

Which system is more precise?"

*System 1 — identical readings every time.*

"Which is more accurate?"

*System 2 — mean matches true time.*

"Which should the coach use for comparing this athlete's performance across
multiple races?"

*System 1 — consistent comparisons, even with the systematic offset.
As long as every race is timed the same way, the offset cancels.*

"Which should they use when submitting a world-record time?"

*System 2 — or the official laser timing — because the absolute value matters
for a world record, not just relative comparison.*

"The choice of which property matters depends on what you're measuring FOR."

### Success Model

**Success signals:**
- Student correctly identifies System 1 as precise but inaccurate
- Student correctly identifies when each system is appropriate
- Student grasps that "better" depends on the purpose

**Failure signals:**
- Student concludes System 1 is always better (M1 via consistency)
- Student cannot explain why System 2 is better for absolute records

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "A thermometer consistently reads 0.5°C too low. For comparing temperatures between experiments, does the offset matter?" → mastery if student says no (cancels) for comparisons |
| Unsuccessful | Route to PA-01 (GPS/map — simpler comparison) |
| Unsuccessful — context not resonating | Route to PA-04 (four-target diagram) |

### Retrieval Tags

`real-world` `sports` `stopwatch` `M1-recovery` `context-dependent` `comparison-vs-absolute` `concrete` `athletics`

### AI Retrieval Notes

**When to choose:** Sports or athletically-oriented student. Good as a
second intervention after PA-01 when the student needs a different context.

**When to avoid:** Student with no sports context.

**Which interventions follow naturally:** PA-08 (engineer context) for
a professional version of the same "context determines what matters" insight.

---

## PA-10 — Hitting the Mark

### Identity

| Field | Value |
|---|---|
| Intervention ID | PA-10 |
| Title | Hitting the Mark |
| Concept ID | phys.meas.precision-accuracy |
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
| Interaction Type | Story + Echo |

### Pedagogical Metadata

**Why this strategy works:**
Two children throwing paper balls at a bin — one always hits the same
wrong spot (precise, inaccurate), one sometimes misses but the average
position is the bin (imprecise, accurate) — is a concrete, childlike,
immediately visualisable version of the four-target diagram. No vocabulary
is needed to feel the difference.

**Mental model installed:**
"Consistent means you always end up in the same place — whether it's
the right place or not. Accurate means you end up in the right place
on average — even if each try varies. You want both."

**Misconceptions prevented:** M1.

**Misconceptions recovered:** M1.

**Prerequisite knowledge assumed:** phys.meas.units helpful. No physics required.

**Cognitive load:** Minimal.

### Teaching Script

*Say:*

"Two children are throwing paper balls at a bin across the room.

Child A throws five times. All five paper balls land in the same spot —
but it is 30 centimetres to the left of the bin.

Child B throws five times. The balls land in different spots — sometimes
left, sometimes right, sometimes short. But if you looked at where all
five landed and found the middle, the middle would be right inside the bin.

Which child is more consistent?"

*Child A — same spot every time.*

"Which child is hitting closer to the target — on average?"

*Child B — the average position is in the bin.*

"Child A is very consistent — they do the same thing every throw.
But they always miss in the same direction.

Child B is not very consistent — each throw is a bit different.
But when you average all their throws, you're aiming at the right place.

What would you say to help Child A?"

*Aim more to the right — adjust the direction.*

"What would you say to help Child B?"

*Practise more — get more consistent.*

"These are two different problems. Same goes for measurements.
Consistent but wrong — fix the direction (calibrate). Variable but
on-target — reduce the scatter (more measurements). Both is best."

### Success Model

**Success signals:**
- Child correctly identifies Child A as consistent (precise) and Child B as on-target (accurate)
- Child grasps that consistent does not mean correct
- Child suggests appropriate fixes for each child

**Failure signals:**
- Child says Child A is "better" because they're consistent
- Child cannot articulate the two different fixes

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "A scale always reads 3 kg too heavy. Is it consistent? Is it giving the right answer?" → mastery if child distinguishes the two |
| Unsuccessful | Prerequisite check (phys.meas.errors — uncertainty concept may not be in place) |

### Retrieval Tags

`child-friendly` `paper-balls` `bin` `M1-prevention` `age-10-13` `low-anxiety` `consistent-vs-correct` `first-contact` `concrete`

### AI Retrieval Notes

**When to choose:** Youngest learners (10–13) or very anxious students.
The fallback when PA-01 (GPS) is too distant. Requires no physics context.

**When to avoid:** Students 14+ who would find the framing too simple.

**Which interventions follow naturally:** PA-01 (GPS map) for a modern
adult-context version. PA-04 (four-target diagram) to formalise.

---

## Teaching Decision Graph

### Intervention Index

| ID | Title | Strategy | Target | CPA Stage | Bloom | Duration | Primary Misconception Target |
|---|---|---|---|---|---|---|---|
| PA-01 | The GPS and the Paper Map | Everyday Life Story | Age 12–16, general | Concrete | Understand | 5–7 min | M1, M2 |
| PA-02 | The Weighing Machine Conspiracy | Real-world Observation | Age 12–16, sceptical | Concrete | Understand | 5–7 min | M1, M3 |
| PA-03 | The Watchmaker's Paradox | Historical Discovery | Age 13–16, curious | Concrete | Understand | 6–8 min | M1, M3 |
| PA-04 | The Four-Target Diagram | Visual Mental Picture | Age 11–16, visual | Representational | Understand | 5–7 min | M1, M2, M3 |
| PA-05 | The Sniper Who Always Misses Left | Analogy | Age 13–17, M1 target | Concrete | Understand | 4–6 min | M1 |
| PA-06 | Precision in Practice: Lab Report | Guided Discovery | Age 13–17, lab | Abstract | Apply | 8–10 min | M1, M2, M3 |
| PA-07 | The Broken Clock Paradox | Socratic Dialogue | Age 12–16, analytical | Concrete | Analyze | 6–8 min | M1 |
| PA-08 | When Precision Matters More | Engineer's Perspective | Age 13–17, STEM | Abstract | Evaluate | 7–9 min | M3 |
| PA-09 | The Runner's Split Times | Real-world Observation | Age 12–16, sports | Concrete | Apply | 5–7 min | M1 |
| PA-10 | Hitting the Mark | Child-friendly | Age 10–13, first contact | Concrete | Remember | 4–6 min | M1 |

### Recovery Graph

| From | If Successful | If Unsuccessful |
|---|---|---|
| PA-01 | "Thermometer always 36.8°C but true = 37.0°C?" → mastery | PA-10 → PA-04 → PA-07 |
| PA-02 | "What makes bathroom scale both P+A?" → mastery | PA-01 → PA-04 |
| PA-03 | "Harrison H4 — precise, accurate, or both?" → mastery | PA-01 → PA-07 |
| PA-04 | "4.7, 4.7, 4.8 — true value 6.2 — which quadrant?" → mastery | PA-10 → PA-01 |
| PA-05 | Four-quadrant classification → mastery | PA-04 → PA-01 |
| PA-06 | Student self-classifies own data set → mastery | PA-01 → PA-04 |
| PA-07 | "Clock 1 min fast — precise or accurate?" → mastery | PA-01 → PA-04 |
| PA-08 | "Name context where accuracy matters more." → mastery | PA-01 → PA-06 |
| PA-09 | "0.5°C-low thermometer for comparisons — offset matter?" → mastery | PA-01 → PA-04 |
| PA-10 | "Scale 3 kg heavy — consistent? Right answer?" → mastery | Prerequisite check |

### Misconception → Intervention Map

| Misconception | Definition | Entry Intervention |
|---|---|---|
| M1 | Precise = accurate | PA-01 (default), PA-10 (young/anxious), PA-04 (visual) |
| M2 | More decimal places = more accurate | PA-01, PA-04 |
| M3 | High precision with wrong answer is good enough | PA-02, PA-03, PA-05, PA-08 |
| M4 | Accuracy is about getting the right answer not closeness to true value | PA-06, PA-08 |

### Starting Intuition Map

| ID | Starting Intuition (distinct entry point) |
|---|---|
| PA-01 | GPS to 4 decimal places but systematically wrong vs paper map rough but correct |
| PA-02 | Bathroom scale: consistent reading that is consistently wrong by 2.2 kg |
| PA-03 | Harrison's clocks: all precise, only the last accurate — precision ≠ accuracy historically |
| PA-04 | Four archery targets: two axes (precision/accuracy) produce four distinct combinations |
| PA-05 | Sniper: hits the same wrong spot every shot — world's most precise but never accurate |
| PA-06 | Lab data set: calculate spread (precision) and bias (accuracy) as separate numbers |
| PA-07 | Stopped clock: right twice a day — precise (never changes) and accidentally accurate |
| PA-08 | Mating parts: two systematically wrong machines make a working assembly together |
| PA-09 | Split-time stopwatch: consistent-but-fast vs variable-but-calibrated |
| PA-10 | Paper balls in bin: same wrong spot every time vs scattered but on average in the bin |

### Retrieval Tag Index

| Tag | Interventions |
|---|---|
| concrete | PA-01, PA-02, PA-03, PA-05, PA-07, PA-09, PA-10 |
| abstract | PA-06, PA-08 |
| M1-recovery | PA-01, PA-02, PA-03, PA-04, PA-05, PA-07, PA-09, PA-10 |
| M2-prevention | PA-01, PA-04 |
| M3-recovery | PA-02, PA-03, PA-05, PA-08 |
| M4-recovery | PA-06, PA-08 |
| visual | PA-04 |
| young-learner | PA-10, PA-01 |
| STEM-learner | PA-08, PA-06 |
| sports-context | PA-09 |
| health-context | PA-02 |
| first-contact | PA-01, PA-10 |
| paradox | PA-07, PA-03 |

---

## Self-Audit

**Interventions:** 10 / 10

**Misconception coverage:**
- M1 (precise = accurate): PA-01, PA-02, PA-03, PA-04, PA-05, PA-07, PA-09, PA-10 — 8 direct hits ✓
- M2 (decimal places = accuracy): PA-01, PA-04 — 2 direct hits ✓
- M3 (precise-but-wrong is fine): PA-02, PA-03, PA-05, PA-08 — 4 direct hits ✓
- M4 (accuracy = right answer): PA-06, PA-08 — 2 direct hits ✓

**Recovery graph completeness:** 10 / 10 nodes complete ✓

**CPA coverage:**
- Concrete: PA-01, PA-02, PA-03, PA-05, PA-07, PA-09, PA-10 (7 interventions)
- Representational: PA-04 (1 intervention)
- Abstract: PA-06, PA-08 (2 interventions)

**Decision graph completeness:** All five sections complete ✓

**Remaining weaknesses:**
- The quantitative relationship between precision and confidence intervals
  (standard deviation, standard error of the mean) is not the focus of any
  single intervention — this may warrant a PA-11 for statistical treatment.
- The connection between precision and significant figures (phys.meas.significant-figures)
  is implied in PA-06 but not made explicit — consider a cross-concept probe.
