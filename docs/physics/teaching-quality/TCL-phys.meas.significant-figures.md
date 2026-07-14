# Teaching Content Library — `phys.meas.significant-figures`
# Significant Figures and Precision

**Status:** CANDIDATE ASSETS — not yet in production blueprint
**Concept ID:** `phys.meas.significant-figures`
**TCL Version:** 2.0 — Educational Brain Teaching Assets Standard
**Authored against:** KG node phys.meas.significant-figures (developing, bloom: apply, requires: [phys.meas.errors])
**Date:** 2026-07-14
**Asset count:** 10
**Governing misconceptions:** M1 (more digits always means more precision), M2 (significant figures are about decimal places), M3 (trailing zeros are never significant), M4 (calculators give you significant figures)

---

## Purpose

The Teaching Content Library is the asset pool from which the Teaching Engine retrieves
interventions rather than generating them from scratch. Every intervention is a decision
node — it knows when to be chosen, what success looks like, what failure looks like, and
where to route next. Together, the ten interventions form a Teaching Decision Graph.

The core insight every intervention must install:

> **Significant figures are a honesty system.
> They tell the reader how confident you actually are in your measurement.
> Writing 4.73821 kg when you only measured to the nearest 100 g is lying
> with numbers.**

---

## Intervention Graph Overview

```
Entry points (no prior attempt):  SF-01 (default) · SF-10 (young/anxious) · SF-02 (curious)

After SF-01 fails:  SF-10 → SF-04 → SF-03
After SF-02 fails:  SF-01 → SF-04
After SF-03 fails:  SF-04 → SF-01
After SF-04 fails:  SF-10 → SF-01
After SF-05 fails:  SF-04 → SF-01
After SF-06 fails:  SF-04 → SF-03
After SF-07 fails:  SF-01 → SF-03
After SF-08 fails:  SF-03 → SF-04
After SF-09 fails:  SF-04 → SF-01
After SF-10 fails:  prerequisite check (phys.meas.errors — measurement uncertainty concept)

After any success:  Novel measurement sig-fig probe → if criterion operative → mastery gate
                    If M1 still active → SF-06 (calculator counterexample)
```

---

## SF-01 — The Honest Measurement

### Identity

| Field | Value |
|---|---|
| Intervention ID | SF-01 |
| Title | The Honest Measurement |
| Concept ID | phys.meas.significant-figures |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Everyday Life Story |
| Target Learner | Age 13–17, first encounter |
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
Framing significant figures as a honesty system rather than a rule system
changes the student's relationship to the concept. Rules must be memorised.
Honesty is a value. The student who understands "reporting more precision
than you measured is lying" will not over-report digits — not because they
remembered the rule, but because they understand what they're communicating.

**Mental model installed:**
"Every measurement has an honest precision — the smallest thing your
instrument can reliably detect. Reporting more digits than that is not
wrong arithmetic; it is claiming a level of precision you don't actually
have. Significant figures are how physics tracks honesty."

**Misconceptions prevented:** M1 — more digits is not honesty; it can
be dishonesty. M4 — a calculator has no instrument; it cannot assign sig figs.

**Misconceptions recovered:** M1, M4.

**Prerequisite knowledge assumed:** phys.meas.errors (measurement uncertainty). 
phys.meas.units.

**Cognitive load:** Low.

### Teaching Script

*Say:*

"You step on a bathroom scale. It has big chunky numbers. It reads 68 kg.

Now you go to a doctor's clinic. The nurse weighs you on a proper medical scale.
It reads 68.3 kg.

You get a body composition scan at a sports lab. The result: 68.27 kg.

Three measurements of the same thing. Three different numbers of digits.

Question: which one is most precise?"

*Answer: the sports lab.*

"Correct. Now here's the trap.

What if I wrote your bathroom scale reading as 68.00000 kg?

Would that be more precise?"

*No — it would be dishonest.*

"The bathroom scale can't tell the difference between 68 kg and 68.4 kg —
its markings only go to whole kilograms. Writing 68.00000 is claiming
precision the instrument doesn't have.

Significant figures are the physics way of saying: 'I'll only write down
the digits I actually measured. The rest would be lies.'

68 kg (bathroom scale) — 2 significant figures.
68.3 kg (medical scale) — 3 significant figures.
68.27 kg (lab scan) — 4 significant figures.

The number of significant figures tells the reader how precise your
instrument was. No more. No less. Physics runs on this honesty system."

### Success Model

**Success signals:**
- Student correctly identifies which measurement is most precise from the digit count
- Student articulates why more digits is not always more honest
- Student can explain why writing 68.00000 from a bathroom scale is dishonest

**Failure signals:**
- Student still equates more digits with better (M1)
- Student thinks 68.3 and 68.30 convey the same information

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "A ruler measures to 1 mm. You measure a book. Can you write the result as 14.000 cm?" → mastery if student says no and explains why |
| Unsuccessful | Route to SF-10 (simpler "honest guess" framing) |
| Unsuccessful — concept not landing | Route to SF-04 (the ruler and its limits — physical grounding) |

### Retrieval Tags

`everyday-story` `honesty-system` `bathroom-scale` `M1-prevention` `M4-prevention` `precision-vs-digits` `first-contact` `concrete`

### AI Retrieval Notes

**When to choose:** Default first intervention. Sets up the honesty
framing that prevents M1 from forming. Best when student has no prior
sig-fig exposure.

**When to avoid:** Student who already has the honesty framing and
needs the counting rules. Younger students who may not connect with
the "sports lab" context.

**Which interventions follow naturally:** SF-03 (counting rules) to
mechanise what the story established conceptually. SF-06 (calculator)
to reinforce M4 prevention.

---

## SF-02 — The Island of Uncertainty

### Identity

| Field | Value |
|---|---|
| Intervention ID | SF-02 |
| Title | The Island of Uncertainty |
| Concept ID | phys.meas.significant-figures |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Visual Mental Picture |
| Target Learner | Age 13–16, visual thinkers, responds to spatial metaphors |
| Difficulty | Beginner |
| CPA Stage | Representational |
| Bloom Level | Understand |
| Estimated Duration | 5–7 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | High — the "island" diagram is central |
| Voice Requirement | Low |
| Interaction Type | Visual Explanation |

### Pedagogical Metadata

**Why this strategy works:**
A number line where the last significant digit is solid ground and the
digits beyond it are "ocean" (unknown territory) makes the concept
spatially visible. The student can point to where their certainty ends.

**Mental model installed:**
"Every measurement has an 'island of certainty' — the digits that are
solid, known, reliable. Beyond the last known digit is ocean — we don't
know what's there. Significant figures count the digits on the island.
Zeros at the beginning are just water; zeros at the end of the island are
real — they tell you the island extends that far."

**Misconceptions prevented:** M2, M3.

**Misconceptions recovered:** M3 — trailing zeros on the island ARE
significant; leading zeros are ocean.

**Prerequisite knowledge assumed:** phys.meas.errors, phys.meas.units. SF-01 helpful.

**Cognitive load:** Low to medium — the visual requires construction.

### Teaching Script

*Draw or describe:*

"Picture a number as an island in the ocean.

The measured value 0.00473 — draw it as a number line:

  0 . 0 0 4 7 3
  ↑               ↑
  ocean           island starts here (4)

The leading zeros — 0.00 — are just marking where we are on the number line.
They don't say anything about the measurement. They're ocean.

The island starts at 4. Then 7. Then 3. Three digits of solid ground.
We measured those. We know them.

Beyond the 3 — ocean. We don't know what's there. We stopped measuring.

So 0.00473 has 3 significant figures.

Now: 4730.

  4 7 3 0
  ↑   ↑
  island      ambiguous — is this the shore, or ocean?

The zero at the end might be significant (measured to the ones place)
or might be padding (measured to the tens place and we're just using
a zero to fill the ones place).

This ambiguity is why scientific notation was invented: 4.73 × 10³
tells you clearly — three significant figures. 4.730 × 10³ tells you
— four significant figures. The zero on the island, written explicitly.

When writing measurements, use scientific notation to eliminate the
ambiguity. Your sig figs will be as clear as a map."

### Success Model

**Success signals:**
- Student can identify the "island" in any measurement (first significant digit)
- Student correctly counts sig figs in numbers with leading zeros
- Student grasps why trailing zeros are ambiguous and why scientific notation resolves this

**Failure signals:**
- Student counts leading zeros as significant (M3 inverted — overcounting)
- Student thinks all zeros are never significant (M3 — undercounting)

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "How many sig figs in 0.04030?" → mastery if student says 3 and identifies ocean/island boundary |
| Unsuccessful — leading zeros | Route to SF-03 (counting rules — explicit rule for leading zeros) |
| Unsuccessful — trailing zeros | Route to SF-05 (zero classification — explicit treatment of zero types) |

### Retrieval Tags

`visual` `island-ocean` `metaphor` `leading-zeros` `trailing-zeros` `scientific-notation` `M2-prevention` `M3-recovery` `representational`

### AI Retrieval Notes

**When to choose:** Visual learner. Student who confuses leading vs
trailing zeros. Good second intervention after SF-01 establishes the
honesty framing.

**When to avoid:** Student who needs the counting rules procedurally —
go to SF-03 after SF-01 instead.

**Which interventions follow naturally:** SF-05 (zero classification)
for explicit rule-by-case treatment of all zero positions.

---

## SF-03 — The Counting Rules

### Identity

| Field | Value |
|---|---|
| Intervention ID | SF-03 |
| Title | The Counting Rules |
| Concept ID | phys.meas.significant-figures |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Guided Discovery + Procedure |
| Target Learner | Age 13–17, analytical, exam-preparation context |
| Difficulty | Beginner |
| CPA Stage | Abstract |
| Bloom Level | Apply |
| Estimated Duration | 8–10 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Medium — written examples are essential |
| Voice Requirement | Medium |
| Interaction Type | Worked Examples + Practice |

### Pedagogical Metadata

**Why this strategy works:**
The counting rules (which digits are significant) are genuinely counter-
intuitive for zeros. A procedural worked-example sequence with immediate
practice is the most reliable way to install the correct rule set before
student error patterns can form.

**Mental model installed:**
"The rules follow from one principle: significant figures are digits
that carry measurement information. Leading zeros don't — they just
show the scale. Sandwiched zeros do — they're between measured digits.
Trailing zeros after a decimal point do — they show you measured that far.
Trailing zeros before a decimal and no decimal point — ambiguous."

**Misconceptions prevented:** M2, M3.

**Misconceptions recovered:** M2, M3.

**Prerequisite knowledge assumed:** SF-01 (honesty framing). phys.meas.errors.

**Cognitive load:** Medium — four rule cases to process.

### Teaching Script

*Write each rule as you explain it:*

"Rule 1: Non-zero digits are always significant.
  473 → 3 sig figs. Simple.

Rule 2: Zeros between non-zero digits are significant.
  4003 → 4 sig figs. The two zeros are 'sandwiched' — they're
  between measured digits. They tell you the measurement occupied
  those positions.

Rule 3: Leading zeros are never significant.
  0.00473 → 3 sig figs. The three zeros before 4 are just
  telling you where the decimal is. Strip them and count: 473.
  Same island, three digits.

Rule 4: Trailing zeros after a decimal point are significant.
  47.30 → 4 sig figs. That final zero was written deliberately —
  it says 'I measured to the hundredths place and it was zero.'

Rule 5: Trailing zeros before a decimal point are ambiguous.
  4700 — could be 2, 3, or 4 sig figs. We don't know without
  more context. Use scientific notation to be clear:
    4.7 × 10³ → 2 sig figs
    4.70 × 10³ → 3 sig figs
    4.700 × 10³ → 4 sig figs"

*Practice round:*
- 0.05040 → ?
- 30700 → ?
- 1.0050 → ?

*Answers: 3, ambiguous (2-4), 5*

"These rules follow from the principle: sig figs count the digits
that carry real information about your measurement. If you always
ask 'does this digit tell me something about what I measured?' —
the answer is the rule."

### Success Model

**Success signals:**
- Student correctly applies all five rules to new examples
- Student identifies ambiguous cases (trailing zeros without decimal)
  and resolves them with scientific notation
- Student explains rules in terms of the principle, not just memorises them

**Failure signals:**
- Student always counts all zeros as not significant (M3)
- Student cannot handle cases with multiple zero types in one number

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "0.05040 — which zeros are significant and why, for each one?" → mastery if student traces through each zero |
| Unsuccessful — zero confusion | Route to SF-05 (zero classification — dedicated zero treatment) |
| Unsuccessful — principle not grasped | Route to SF-02 (island-ocean — visual foundation for the rules) |

### Retrieval Tags

`procedure` `counting-rules` `five-rules` `zeros` `scientific-notation` `M2-recovery` `M3-recovery` `exam-preparation` `analytical`

### AI Retrieval Notes

**When to choose:** Student needs the procedural rules (exam context,
or after conceptual understanding is established). Best after SF-01
or SF-02 establishes why sig figs exist.

**When to avoid:** As first contact — the rules without the honesty
framing become rote memorisation.

**Which interventions follow naturally:** SF-07 (arithmetic rules —
sig figs through calculations) to extend counting to arithmetic operations.

---

## SF-04 — The Ruler and Its Limits

### Identity

| Field | Value |
|---|---|
| Intervention ID | SF-04 |
| Title | The Ruler and Its Limits |
| Concept ID | phys.meas.significant-figures |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Simple Experiment |
| Target Learner | Age 12–16, tactile, hands-on learner |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Apply |
| Estimated Duration | 7–10 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | High — requires a physical or on-screen ruler |
| Voice Requirement | Low |
| Interaction Type | Activity |

### Pedagogical Metadata

**Why this strategy works:**
The student physically reads a ruler to its last certain digit and
estimates one beyond. They discover from their own measurement what
"precision" means — the ruler sets an honest limit, and any digits
beyond that limit are invented, not measured.

**Mental model installed:**
"My ruler has marks every millimetre. I can read the millimetre marks
with certainty. I can estimate the tenth of a millimetre by eye —
maybe 0.3 or 0.5 — but the next digit (hundredths of mm) would be
a guess. I report what I can honestly read: the certain digits plus
one estimated digit. That is what significant figures mean physically."

**Misconceptions prevented:** M1, M4.

**Misconceptions recovered:** M1 — the student cannot get more sig figs
than the instrument allows, regardless of how many decimal places
they write.

**Prerequisite knowledge assumed:** phys.meas.units, phys.meas.errors. Can read a ruler.

**Cognitive load:** Very low — the activity is self-guiding.

### Teaching Script

*If a physical ruler is available:*

*Say:*

"Here is a ruler with marks every millimetre.

Step 1: Measure the length of your pencil. Read the centimetre and
millimetre marks exactly. Write that number down."

*Student writes, say, 14.7 cm (read from the 1-mm marks).*

"Step 2: Now look very carefully between the millimetre marks. Can you
estimate where the pencil end falls between them? Write a digit
representing that estimate."

*Student writes 14.73 cm, estimating 0.3 of a mm.*

"Step 3: Try to add another digit. What would come after the 3?"

*Student realises: they can't — the marks aren't that close together.*

"Right. You've reached the honest limit of this ruler. 14.73 cm is
three to four significant figures — you read two certainly (14) and
estimated one (0.7 = 7 mm, then 0.03 = estimated). Any more digits
would be invented, not measured.

This is what significant figures tell the reader: how far the ruler's
marks go. A physicist reading '14.73 cm' knows you measured to
about 0.1 mm precision. If you wrote '14.73000 cm' — they'd know
you were lying about the precision, because rulers don't go that far."

### Success Model

**Success signals:**
- Student correctly reads to the last honest digit and stops
- Student can explain why they can't report more digits than the marks allow
- Student sees the connection between ruler marks and significant figures

**Failure signals:**
- Student reads only to the nearest cm or mm (not attempting the estimate)
- Student tries to add invented digits beyond the ruler's resolution

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "You measure a table with a tape measure marked every cm. Can you report the answer as 203.47 cm?" → mastery if student says no |
| Unsuccessful | Route to SF-01 (verbal honesty-system framing — build the concept first) |
| Unsuccessful — no ruler available | Route to SF-02 (island-ocean — visual alternative) |

### Retrieval Tags

`experiment` `ruler` `hands-on` `honest-limit` `M1-prevention` `M4-prevention` `tactile` `physical-grounding` `concrete`

### AI Retrieval Notes

**When to choose:** In-person session, tactile learner, student has
a ruler available. Most powerful when the student discovers the limit
themselves before any rule is stated.

**When to avoid:** Text-only async context. Student who needs the
conceptual framing before the physical activity.

**Which interventions follow naturally:** SF-03 (counting rules) to
generalise from the ruler experience to all measurement contexts.

---

## SF-05 — The Zero Classification Game

### Identity

| Field | Value |
|---|---|
| Intervention ID | SF-05 |
| Title | The Zero Classification Game |
| Concept ID | phys.meas.significant-figures |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Guided Discovery |
| Target Learner | Age 13–17, analytical, M2/M3 recovery target |
| Difficulty | Beginner |
| CPA Stage | Abstract |
| Bloom Level | Apply |
| Estimated Duration | 6–8 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Medium — written numbers required |
| Voice Requirement | Medium |
| Interaction Type | Classification Activity |

### Pedagogical Metadata

**Why this strategy works:**
Zeros are where significant-figure errors concentrate (M2, M3). A
dedicated classification game isolates every zero type and forces the
student to categorise each one individually. Pattern recognition built
through classification is more durable than memorising a rule list.

**Mental model installed:**
"Every zero is one of three things: a placeholder (not significant),
a measured zero between measured digits (significant), or a trailing
precision indicator (significant after a decimal point). Ask 'what
is this zero's job?' — and the answer determines significance."

**Misconceptions prevented:** M2, M3.

**Misconceptions recovered:** M2, M3.

**Prerequisite knowledge assumed:** SF-01 or SF-03 (honesty framing or
counting rules). Basic place-value number sense.

**Cognitive load:** Medium — classification requires active reasoning.

### Teaching Script

*Say:*

"Zeros are the most confusing part of significant figures. Let's sort them out once.

Every zero in a measured number has a job. I'll give you four numbers.
For each zero, tell me: what is its job?"

```
Number 1: 0.0047
Number 2: 402
Number 3: 47.30
Number 4: 4700
```

*Work through each:*

"0.0047 — the zeros before 4 are placeholders. Their job: to tell you
the decimal is there. They don't measure anything. NOT significant.
Only 4 and 7 are. → 2 sig figs.

402 — the zero is between 4 and 2. Its job: to fill the tens place
where a measurement occurred. If that zero weren't significant,
you'd be saying 4 and 2 are adjacent in the hundreds and ones places.
But they're not — the tens digit is genuinely zero. SIGNIFICANT. → 3 sig figs.

47.30 — the trailing zero after the decimal point. Its job: to say
'I measured to the hundredths place, and it was zero.' It's a
precision claim. If it weren't significant, you wouldn't write it.
SIGNIFICANT. → 4 sig figs.

4700 — the trailing zeros before the decimal (which isn't written).
Their job: ambiguous. Could be placeholders (measured to nearest 100,
zeros just fill the tens/ones). Could be precise measurements.
Without a decimal point or context, we cannot tell. AMBIGUOUS. → 2, 3, or 4.
Solution: write 4.7 × 10², 4.70 × 10², or 4.700 × 10²."

*Practice: give 5 new numbers with zeros in various positions.*

### Success Model

**Success signals:**
- Student correctly classifies the role of each zero type
- Student uses the "what is this zero's job?" diagnostic spontaneously
- Student resolves 4700 ambiguity using scientific notation

**Failure signals:**
- Student applies "zeros are never significant" (M3)
- Student counts all zeros as significant

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "Does 10.050 have more or fewer sig figs than 10.05? Explain." → mastery if student distinguishes (5 vs 4) |
| Unsuccessful — leading zero confusion | Route to SF-02 (island-ocean — visual location of leading zeros) |
| Unsuccessful — sandwiched vs trailing confusion | Route to SF-03 (full counting rules with explicit case-by-case) |

### Retrieval Tags

`guided-discovery` `zeros` `classification` `placeholder` `M2-recovery` `M3-recovery` `analytical` `pattern-recognition` `abstract`

### AI Retrieval Notes

**When to choose:** M2 or M3 detected (student systematically miscounts
zeros). Best as a targeted remediation after SF-01/SF-03 has been attempted.

**When to avoid:** First contact. Student who hasn't grasped the honesty
framing — classification without motivation is pure memorisation.

**Which interventions follow naturally:** SF-07 (arithmetic rules) to
extend the zero-sensitivity into calculations.

---

## SF-06 — When the Calculator Lies

### Identity

| Field | Value |
|---|---|
| Intervention ID | SF-06 |
| Title | When the Calculator Lies |
| Concept ID | phys.meas.significant-figures |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Real-world Observation |
| Target Learner | Age 13–17, calculator-dependent, M4 recovery target |
| Difficulty | Beginner |
| CPA Stage | Representational |
| Bloom Level | Understand |
| Estimated Duration | 5–7 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Low — a calculator display shown on screen is optional |
| Voice Requirement | Medium |
| Interaction Type | Observation + Discussion |

### Pedagogical Metadata

**Why this strategy works:**
The calculator is the most common source of false precision in student
work. Showing that a calculator output of 8.23756219 is not more precise
than 8 — when the inputs were both measured to 1 sig fig — directly
confronts M4 with a concrete demonstration.

**Mental model installed:**
"A calculator processes numbers — it does not know where the numbers came
from. It doesn't know that 5 was measured to the nearest unit and not
the nearest thousandth. So it gives you as many digits as it can hold.
Those extra digits are not precision — they are noise. Precision comes from
your instrument, not from your calculator."

**Misconceptions prevented:** M4.

**Misconceptions recovered:** M4.

**Prerequisite knowledge assumed:** SF-01. Uses a calculator.

**Cognitive load:** Very low — one concrete demonstration.

### Teaching Script

*Say:*

"You measure two lengths with a ruler marked only in centimetres:
  Length 1: 5 cm (no decimal — the ruler only shows whole centimetres)
  Length 2: 3 cm

You multiply them to find an area: 5 × 3 = ?

Your calculator says: 15.

Now someone else does the same experiment differently — using a
rougher estimate, or a different instrument:

  Length 1: 5 cm
  Length 2: 3 cm

They also get 15.

But a third person has a better ruler marked in millimetres and writes:
  Length 1: 5.2 cm
  Length 2: 3.1 cm
  Area: 5.2 × 3.1 = 16.12 cm²

Now your calculator gives: 16.12

Four digits. Is this more accurate than 15?"

*Wait.*

"If they used a millimetre ruler, then yes — that's genuinely 4 sig figs
and 16.12 may be accurate.

But if you used your centimetre ruler and wrote 5.0 × 3.0 = 15.0 —
that trailing zero after the decimal point is a precision claim.
15.0 says 'I know this to three sig figs.'

But your ruler only gave you 5 and 3 — one sig fig each.
5 × 3 = 20 (1 sig fig). Not 15 and definitely not 15.00000000.

The calculator gave you 15 because 5 × 3 = 15 exactly.
But that 15 is only 1-sig-fig trustworthy.

Your calculator doesn't know your ruler only had centimetre marks.
It just multiplied two numbers. The precision of the result
is your responsibility — the calculator cannot help you with it."

### Success Model

**Success signals:**
- Student correctly identifies that 5 × 3 = 15 has only 1 sig fig of validity
- Student explains why the calculator cannot assign significant figures
- Student begins to round calculated results to the appropriate sig figs

**Failure signals:**
- Student accepts the calculator's full display as the answer's precision
- Student thinks writing more calculator digits makes the answer more accurate

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "A calculator gives 6.283185307. How many sig figs should you report if your input data had 2 sig figs?" → mastery if student says 2 (6.3) |
| Unsuccessful | Route to SF-04 (ruler activity — physical grounding for precision limits) |
| Unsuccessful — M4 persisting strongly | Route to SF-01 (honesty framing — rebuild from principle) |

### Retrieval Tags

`real-world` `calculator` `false-precision` `M4-recovery` `representational` `calculator-dependent-learner`

### AI Retrieval Notes

**When to choose:** M4 is active (student reports all calculator digits).
Best immediately when this misconception is detected.

**When to avoid:** Student who doesn't use a calculator or has already
grasped precision limits.

**Which interventions follow naturally:** SF-07 (arithmetic rules) to
give the student the correct calculation method.

---

## SF-07 — The Chain of Honesty

### Identity

| Field | Value |
|---|---|
| Intervention ID | SF-07 |
| Title | The Chain of Honesty |
| Concept ID | phys.meas.significant-figures |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Analogy + Procedure |
| Target Learner | Age 13–17, computational context |
| Difficulty | Intermediate |
| CPA Stage | Abstract |
| Bloom Level | Apply |
| Estimated Duration | 8–10 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Medium — written calculations required |
| Voice Requirement | Medium |
| Interaction Type | Worked Example |

### Pedagogical Metadata

**Why this strategy works:**
The "weakest link" metaphor makes the sig-fig arithmetic rules memorable
and principled rather than arbitrary. A chain is only as strong as its
weakest link — a calculation is only as precise as its least precise input.

**Mental model installed:**
"Multiplying 4.73 by 6.1 does not give a result more precise than 6.1.
The result inherits the precision of the weakest measurement. Two sig figs
in × anything = two sig figs out. You cannot create precision by arithmetic."

**Misconceptions prevented:** M1, M4.

**Misconceptions recovered:** M1, M4.

**Prerequisite knowledge assumed:** SF-03 (counting rules). Arithmetic operations.

**Cognitive load:** Medium.

### Teaching Script

*Say:*

"You've heard the saying 'a chain is only as strong as its weakest link.'

Precision in calculations works the same way.

Rule for multiplication and division:
Your answer gets the same number of significant figures as the measurement
with the FEWEST significant figures.

Example: 4.73 m × 6.1 m = ?
  4.73 has 3 sig figs.
  6.1 has 2 sig figs.
  Calculator gives: 28.853
  But: 2 sig figs is the weakest link.
  Answer: 29 m² (2 sig figs).

You lost a digit. But that digit was never real — 6.1 only measured
to one decimal place. Any fake precision beyond that is invented.

Rule for addition and subtraction:
Your answer gets the same number of DECIMAL PLACES as the measurement
with the FEWEST decimal places (not sig figs — decimal places).

Example: 4.736 m + 0.12 m = ?
  4.736 has 3 decimal places.
  0.12 has 2 decimal places.
  Calculator gives: 4.856
  But: 2 decimal places is the weakest link.
  Answer: 4.86 m (2 decimal places).

Different rule for adding than for multiplying — because adding shifts
precision location, not count."

*Practice: 2 multiplication and 2 addition problems.*

### Success Model

**Success signals:**
- Student applies correct rule (sig figs for ×÷, decimal places for +-)
- Student correctly identifies which measurement is the weakest link
- Student can explain why the weakest link determines the result

**Failure signals:**
- Student applies sig-fig rule to addition/subtraction (common error)
- Student cannot identify the limiting measurement

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: mixed calculation (multiply then add) → mastery if student applies each rule at the correct step |
| Unsuccessful — rule confusion | Route to SF-03 (counting rules — rebuild the counting foundation) |
| Unsuccessful — conceptual | Route to SF-01 (honesty framing — rebuild from why) |

### Retrieval Tags

`procedure` `arithmetic-rules` `weakest-link` `multiplication` `addition` `decimal-places` `M1-recovery` `M4-recovery` `intermediate`

### AI Retrieval Notes

**When to choose:** Student has mastered counting rules and now needs
the arithmetic rules. Computational/exam context.

**When to avoid:** First contact. Student who hasn't mastered basic
counting (SF-03) yet.

**Which interventions follow naturally:** SF-09 (engineer's perspective)
to see these rules in professional context.

---

## SF-08 — The Precision Paradox

### Identity

| Field | Value |
|---|---|
| Intervention ID | SF-08 |
| Title | The Precision Paradox |
| Concept ID | phys.meas.significant-figures |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Socratic Dialogue |
| Target Learner | Age 14–17, advanced thinker |
| Difficulty | Intermediate |
| CPA Stage | Abstract |
| Bloom Level | Analyze |
| Estimated Duration | 7–9 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | None |
| Voice Requirement | High |
| Interaction Type | Dialogue |

### Pedagogical Metadata

**Why this strategy works:**
The "paradox" — you can know something exactly without significant figure
limitation, and yet you can't always tell from the digits — challenges the
student's understanding at a deeper level. Exact numbers (counting, defined
constants) have infinite significant figures, but measured numbers don't.
This distinction is subtle and often missed.

**Mental model installed:**
"There are two kinds of numbers in physics: measured numbers and exact
numbers. Exact numbers (counted: 12 eggs exactly; defined: 1 km = 1000 m
exactly) have infinite sig figs — they don't limit your precision.
Measured numbers always have finite sig figs — determined by your instrument.
When you multiply '12 eggs × 68.3 g each,' the '12' doesn't limit you.
Only 68.3 does."

**Misconceptions prevented:** M1, M2 (refinement).

**Misconceptions recovered:** M1 (subtle form — over-applying the sig-fig rules to exact numbers).

**Prerequisite knowledge assumed:** SF-03, SF-07. Advanced level.

**Cognitive load:** High — requires distinguishing two categories of numbers.

### Teaching Script

*Say:*

"Here is a puzzle.

You have exactly 12 identical metal balls. You weigh one and get 47.3 g.
What is the total mass?

12 × 47.3 = 567.6 g

How many significant figures in 567.6?"

*Student will probably say 3, matching 47.3.*

"But wait — how many sig figs does 12 have?"

*They might say 2, which would limit the answer to 2.*

"Here is the thing: 12 is not a measurement. It is a count. You counted
exactly 12 balls — there was no instrument uncertainty. 12 means exactly
twelve, not approximately twelve. It has infinite significant figures.

So 12 × 47.3 g is limited only by 47.3 — three sig figs. 567.6 g is correct.

Contrast: if you had weighed the collection of balls and your scale read
567.6 g, that 567.6 carries 4 sig figs of measurement precision.

And another type of exact number: defined constants.
1 km = exactly 1000 m — defined. The 1000 does not limit your precision.
If you know a distance is 3.46 km, converting to metres gives 3460 m —
still 3 sig figs, because the 1000 in the conversion factor is exact.

The skill: recognise which numbers are counted/defined (exact, infinite sig figs)
and which are measured (finite sig figs). Only measured numbers limit precision."

### Success Model

**Success signals:**
- Student correctly identifies counted and defined numbers as exact
- Student applies the weakest-link rule only to measured quantities
- Student can reconstruct why 12 × 47.3 = 567.6 (not 570)

**Failure signals:**
- Student applies 2 sig figs from "12" to the answer
- Student thinks all numbers in a calculation limit sig figs

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "1 mile = 1.609 km (exact definition). A race is 26.2 miles. Convert to km with correct sig figs." → mastery if student uses 3 sig figs |
| Unsuccessful | Route to SF-03 (counting rules — rebuild) |
| Unsuccessful — conceptual too advanced | Route to SF-06 (calculator lies — simpler version of same theme) |

### Retrieval Tags

`socratic` `exact-numbers` `counted-numbers` `defined-constants` `M1-recovery` `advanced` `precision-paradox` `abstract`

### AI Retrieval Notes

**When to choose:** Advanced student who over-applies sig-fig rules.
After SF-07 is mastered. Best for students headed toward higher-level physics.

**When to avoid:** Students who haven't mastered basic counting and
arithmetic rules. First contact.

**Which interventions follow naturally:** SF-07 (arithmetic rules) if not yet complete.

---

## SF-09 — The Surveyor's Report

### Identity

| Field | Value |
|---|---|
| Intervention ID | SF-09 |
| Title | The Surveyor's Report |
| Concept ID | phys.meas.significant-figures |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Engineer's Perspective |
| Target Learner | Age 13–17, STEM-oriented |
| Difficulty | Intermediate |
| CPA Stage | Abstract |
| Bloom Level | Apply |
| Estimated Duration | 7–9 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Low |
| Voice Requirement | Medium |
| Interaction Type | Scenario + Calculation |

### Pedagogical Metadata

**Why this strategy works:**
A professional surveying report requires explicitly stated precision because
buyers, engineers, and lawyers will use those numbers in subsequent
decisions. The sig-fig convention is how professional precision is
communicated unambiguously. This gives the student a real-world use case
where the conventions matter legally and contractually.

**Mental model installed:**
"When a surveyor writes 47.30 metres, they mean something specific: they
measured to the nearest centimetre. A property line at 47.30 m and 47.3 m
are different legal claims — one is centimetre-precise, one is decimetre-
precise. In professional reports, significant figures are not a school rule —
they are a legal precision declaration."

**Misconceptions prevented:** M1, M4.

**Misconceptions recovered:** M1 — professional context shows over-precision
is a real problem, not just a school rule.

**Prerequisite knowledge assumed:** SF-01, SF-03. Some professional context.

**Cognitive load:** Medium.

### Teaching Script

*Say:*

"A land surveyor is measuring a property boundary for a legal deed.

They use a basic tape measure — calibrated to centimetres. Their
measurement: 47.3 metres (3 sig figs — to the nearest decimetre).

A different surveyor uses an electronic total station — accurate to
millimetres. Their measurement: 47.30 metres (4 sig figs — centimetre precise).

A third uses a GPS survey system — accurate to a millimetre.
Their measurement: 47.302 metres (5 sig figs — millimetre precise).

These three measurements of the same property line will appear very
differently in the legal documentation. And they should — because the
legal claim they support is different:

  47.3 m: the boundary is somewhere between 47.25 and 47.35 metres.
  47.30 m: the boundary is somewhere between 47.295 and 47.305 metres.
  47.302 m: the boundary is somewhere between 47.3015 and 47.3025 metres.

In a property dispute, the difference between 47.3 and 47.30 could
be the difference between a garden and a wall.

Professional scientists and engineers report measurements with exactly
the right number of significant figures — not to follow a school rule,
but because their numbers are used by other people who need to know
precisely how precise those numbers are."

### Success Model

**Success signals:**
- Student understands the legal/professional weight of sig-fig choice
- Student can calculate the implied uncertainty from a sig-fig count
- Student articulates why over-reporting precision is professionally dishonest

**Failure signals:**
- Student focuses on the property story without extracting the principle
- Student cannot connect sig-fig count to implied measurement uncertainty

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "A chemical analysis reports 0.0450 g. What does the trailing zero tell a chemist?" → mastery if student says 'measured to 4 sig figs / to nearest 0.0001 g' |
| Unsuccessful | Route to SF-01 (honesty framing — rebuild the professional-honesty motivation) |
| Unsuccessful — precision calculation | Route to SF-03 (counting rules — explicit connection of digit count to precision) |

### Retrieval Tags

`engineer` `surveyor` `legal` `professional` `M1-recovery` `M4-prevention` `precision-declaration` `STEM-learner` `intermediate`

### AI Retrieval Notes

**When to choose:** STEM-oriented student. Best after SF-01/SF-03
establishes the concept — this deepens professional motivation.

**When to avoid:** Young students without professional context.
First contact.

**Which interventions follow naturally:** SF-07 (arithmetic rules) to
see how precision propagates through calculations in professional work.

---

## SF-10 — The Honest Guess

### Identity

| Field | Value |
|---|---|
| Intervention ID | SF-10 |
| Title | The Honest Guess |
| Concept ID | phys.meas.significant-figures |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Child-friendly |
| Target Learner | Age 11–14, first encounter, low confidence |
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
Children understand the difference between a good guess and an impossible
guess. "About 5 cm" is honest; "exactly 5.0000000 cm" from a glance is
dishonest. The story uses social honesty (don't claim to know more than
you do) as the hook for a physics convention.

**Mental model installed:**
"When someone asks me a question, I should be honest about how sure I am.
'About 5 cm' is honest — I measured roughly. '5.0000000 cm' from a glance
would be a lie — I don't know that. Significant figures are the same idea:
only write the digits you actually know."

**Misconceptions prevented:** M1, M4.

**Misconceptions recovered:** M1.

**Prerequisite knowledge assumed:** phys.meas.units. phys.meas.errors helpful.

**Cognitive load:** Minimal.

### Teaching Script

*Say:*

"Imagine I show you a book and ask: 'How long do you think this is?'

You look at it for a second and say: 'About 20 centimetres.'

Then I give you a ruler. You measure carefully. You say: '19.7 centimetres.'

Then I give you a very precise instrument. After careful measurement you say:
'19.73 centimetres.'

Which answer is most honest?"

*They'll say the last one — but redirect:*

"They're all honest — for what you had available.

'About 20 cm' was an honest guess — you looked at the book without
measuring. Claiming '19.73 cm' from a glance would be lying.

'19.7 cm' was honest — you used a ruler that reads to millimetres.
Claiming '19.73' from that ruler would be lying (unless your ruler has marks
at 0.1 mm, which most don't).

'19.73 cm' was honest — only from the precise instrument.

Significant figures are the physics way of being honest about what you
know. Two significant figures means: 'I measured roughly, I'm sure of
the first two digits.' Four significant figures means: 'I measured
very carefully, I'm sure of four digits.'

You should never write more digits than you are honest about knowing.
Not because the teacher says so — because it would be a lie."

### Success Model

**Success signals:**
- Student grasps the "honest about what you know" principle
- Student can identify when a given precision claim is honest vs dishonest
- Student stops adding zeros to "look precise"

**Failure signals:**
- Student thinks more digits = better without grasping the honesty principle
- Student cannot identify why claiming "19.73" from a glance is dishonest

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "Your scale shows 68 kg. Your friend says you weigh 68.0000 kg. Is that honest?" → mastery if student says no and explains why |
| Unsuccessful | Prerequisite check (phys.meas.errors — uncertainty concept may not be in place) |

### Retrieval Tags

`child-friendly` `honest-guess` `M1-prevention` `M4-prevention` `age-11-14` `low-anxiety` `honesty` `social-framing` `concrete`

### AI Retrieval Notes

**When to choose:** Youngest learners (11–14) or very anxious students.
The fallback when SF-01 doesn't land because the "sports lab / medical
scale" context is too distant.

**When to avoid:** Students 15+ who would find the simple framing
patronising. Student who already grasps the principle.

**Which interventions follow naturally:** SF-01 (bathroom scale story)
to add the physics framing. SF-03 (counting rules) once the principle is clear.

---

## Teaching Decision Graph

### Intervention Index

| ID | Title | Strategy | Target | CPA Stage | Bloom | Duration | Primary Misconception Target |
|---|---|---|---|---|---|---|---|
| SF-01 | The Honest Measurement | Everyday Life Story | Age 13–17, general | Concrete | Understand | 5–7 min | M1, M4 |
| SF-02 | The Island of Uncertainty | Visual Mental Picture | Age 13–16, visual | Representational | Understand | 5–7 min | M2, M3 |
| SF-03 | The Counting Rules | Guided Discovery + Procedure | Age 13–17, analytical | Abstract | Apply | 8–10 min | M2, M3 |
| SF-04 | The Ruler and Its Limits | Simple Experiment | Age 12–16, tactile | Concrete | Apply | 7–10 min | M1, M4 |
| SF-05 | The Zero Classification Game | Guided Discovery | Age 13–17, M2/M3 target | Abstract | Apply | 6–8 min | M2, M3 |
| SF-06 | When the Calculator Lies | Real-world Observation | Age 13–17, M4 target | Representational | Understand | 5–7 min | M4 |
| SF-07 | The Chain of Honesty | Analogy + Procedure | Age 13–17, computational | Abstract | Apply | 8–10 min | M1, M4 |
| SF-08 | The Precision Paradox | Socratic Dialogue | Age 14–17, advanced | Abstract | Analyze | 7–9 min | M1 (subtle) |
| SF-09 | The Surveyor's Report | Engineer's Perspective | Age 13–17, STEM | Abstract | Apply | 7–9 min | M1, M4 |
| SF-10 | The Honest Guess | Child-friendly | Age 11–14, first contact | Concrete | Remember | 4–6 min | M1, M4 |

### Recovery Graph

| From | If Successful | If Unsuccessful |
|---|---|---|
| SF-01 | "Can you write 14.000 cm from a 1 mm ruler?" → mastery | SF-10 → SF-04 → SF-03 |
| SF-02 | "0.04030 — count sig figs" → mastery | SF-03 → SF-05 |
| SF-03 | "0.05040 — which zeros significant, why?" → mastery | SF-05 → SF-02 |
| SF-04 | "203.47 cm from cm tape measure?" → mastery | SF-01 → SF-02 |
| SF-05 | "10.050 vs 10.05 sig figs?" → mastery | SF-02 → SF-03 |
| SF-06 | "2 sig-fig inputs, report calculator output?" → mastery | SF-04 → SF-01 |
| SF-07 | Mixed multiply-then-add calculation → mastery | SF-03 → SF-01 |
| SF-08 | "26.2 miles × 1.609 km/mile sig figs?" → mastery | SF-03 → SF-06 |
| SF-09 | "0.0450 g trailing zero meaning?" → mastery | SF-01 → SF-03 |
| SF-10 | "68 kg → 68.0000 kg honest?" → mastery | Prerequisite check (phys.meas.errors) |

### Misconception → Intervention Map

| Misconception | Definition | Entry Intervention |
|---|---|---|
| M1 | More digits always means more precision | SF-01 (default), SF-10 (young/anxious) |
| M2 | Significant figures are about decimal places | SF-02, SF-03 |
| M3 | Trailing zeros are never significant | SF-05, SF-02 |
| M4 | Calculators give you significant figures | SF-06, SF-04, SF-01 |

### Starting Intuition Map

| ID | Starting Intuition (distinct entry point) |
|---|---|
| SF-01 | Bathroom scale vs sports lab — reporting precision honestly |
| SF-02 | Island in the ocean — certainty ends at the last measured digit |
| SF-03 | Five counting rules with the principle behind each |
| SF-04 | Physical ruler — the marks define the honest limit |
| SF-05 | Each zero has a job — classify what each zero's job is |
| SF-06 | Calculator displays noise — it doesn't know where numbers came from |
| SF-07 | Chain of honesty — precision of result = weakest input |
| SF-08 | Exact vs measured numbers — counted and defined numbers don't limit precision |
| SF-09 | Legal surveying report — sig figs are professional precision declarations |
| SF-10 | Honest guess — write only what you honestly know |

### Retrieval Tag Index

| Tag | Interventions |
|---|---|
| concrete | SF-01, SF-04, SF-10 |
| abstract | SF-03, SF-05, SF-07, SF-08, SF-09 |
| M1-recovery | SF-01, SF-04, SF-06, SF-07, SF-08, SF-09, SF-10 |
| M2-recovery | SF-02, SF-03, SF-05 |
| M3-recovery | SF-02, SF-03, SF-05 |
| M4-recovery | SF-01, SF-04, SF-06, SF-07, SF-09, SF-10 |
| young-learner | SF-10, SF-01, SF-04 |
| STEM-learner | SF-09, SF-08, SF-07 |
| exam-strategy | SF-03, SF-07 |
| visual | SF-02, SF-04 |
| first-contact | SF-01, SF-10 |
| calculator-fix | SF-06 |

---

## Self-Audit

**Interventions:** 10 / 10

**Misconception coverage:**
- M1 (more digits = more precision): SF-01, SF-04, SF-06, SF-07, SF-08, SF-09, SF-10 — 7 hits ✓
- M2 (sig figs = decimal places): SF-02, SF-03, SF-05 — 3 hits ✓
- M3 (trailing zeros never significant): SF-02, SF-03, SF-05 — 3 hits ✓
- M4 (calculators assign sig figs): SF-01, SF-04, SF-06, SF-07, SF-09, SF-10 — 6 hits ✓

**Recovery graph completeness:** 10 / 10 nodes complete ✓

**CPA coverage:**
- Concrete: SF-01, SF-04, SF-10 (3 interventions)
- Representational: SF-02, SF-06 (2 interventions)
- Abstract: SF-03, SF-05, SF-07, SF-08, SF-09 (5 interventions)

**Decision graph completeness:** All five sections complete ✓

**Remaining weaknesses:**
- Scientific notation as a tool for declaring sig figs is introduced but not the
  focus of any single intervention — may warrant an SF-11 dedicated to scientific
  notation's precision-declaration role.
- Sig figs in logarithms and trigonometry (a separate advanced topic) are not covered.
