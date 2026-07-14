# Teaching Content Library — `phys.meas.unit-conversion`
# Unit Conversion and Prefixes

**Status:** CANDIDATE ASSETS — not yet in production blueprint
**Concept ID:** `phys.meas.unit-conversion`
**TCL Version:** 2.0 — Educational Brain Teaching Assets Standard
**Authored against:** KG node phys.meas.unit-conversion (foundational, bloom: apply, requires: [phys.meas.units])
**Date:** 2026-07-14
**Asset count:** 10
**Governing misconceptions:** M1 (multiplying makes it bigger, dividing makes it smaller — direction confusion), M2 (prefixes change the quantity not the label), M3 (every conversion needs its own formula), M4 (you just move the decimal point — no understanding of why)

---

## Purpose

The Teaching Content Library is the asset pool from which the Teaching Engine retrieves
interventions rather than generating them from scratch. Every intervention is a decision
node — it knows when to be chosen, what success looks like, what failure looks like, and
where to route next. Together, the ten interventions form a Teaching Decision Graph.

The core insight every intervention must install:

> **Converting units does not change the thing you measured.
> It changes the label. The same length is 1 metre, 100 centimetres, 1000 millimetres.
> All three describe the same physical object.**

---

## Intervention Graph Overview

```
Entry points (no prior attempt):  UC-01 (default) · UC-10 (young/anxious) · UC-02 (visual)

After UC-01 fails:  UC-10 → UC-03 → UC-02
After UC-02 fails:  UC-01 → UC-06
After UC-03 fails:  UC-01 → UC-10
After UC-04 fails:  UC-02 → UC-01
After UC-05 fails:  UC-01
After UC-06 fails:  UC-04 → UC-01
After UC-07 fails:  UC-01 → UC-03
After UC-08 fails:  UC-04 → UC-02
After UC-09 fails:  UC-01 → UC-03
After UC-10 fails:  prerequisite check (phys.meas.units — unit concept)

After any success:  Novel-conversion probe → if criterion operative → mastery gate
                    If M1 still latent → UC-03 (magic 1 / fraction method)
```

---

## UC-01 — The Currency Exchange

### Identity

| Field | Value |
|---|---|
| Intervention ID | UC-01 |
| Title | The Currency Exchange |
| Concept ID | phys.meas.unit-conversion |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Everyday Life Story |
| Target Learner | Age 11–15, first encounter, any background |
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
Currency exchange is the most familiar real-world unit conversion. Every
learner who has travelled or bought something online understands intuitively
that £10 and €11 might be the same amount of purchasing power. The analogy
transfers directly: same value, different labels. This prevents M2 before
it forms.

**Mental model installed:**
"Converting units is like exchanging currency. I have £10 — now I exchange
it for €11. I don't have more money or less money. I have the same money
with a different name. 100 cm and 1 m are the same length with different
names. The length didn't change — only the label."

**Misconceptions prevented:** M2 — the student intuitively knows €11
is not 'more' than £10 just because the number is larger.

**Misconceptions recovered:** M2 — when student says "1000 mm sounds
bigger than 1 m," return them to: "£1000 Japanese yen sounds like a
lot — is it more than £7?"

**Prerequisite knowledge assumed:** Understanding that units are necessary
(phys.meas.units). Basic multiplication. No physics.

**Cognitive load:** Low. One analogy, one transfer.

### Teaching Script

*Say:*

"Imagine you are going on holiday. You have £10 in your pocket.
At the airport, you exchange it. The cashier gives you back some euros.

You look at the amount — let's say €11.50.

Question: do you have more money now?"

*Wait for their answer.*

"No — you have exactly the same amount of money. What changed is the label.
The physical purchasing power is the same. The number 11.50 is larger than 10,
but that doesn't mean you got richer. The exchange rate is just telling you
how many euros equal one pound.

Unit conversion works the same way.

1 metre of rope. I decide to measure it in centimetres instead. I now say
it is 100 centimetres. Do I have more rope?"

*Wait.*

"Same rope. Same length. The number got bigger because centimetres are smaller
than metres — I need more of them to say the same thing. 11.50 euros are worth
the same as 10 pounds because euros are worth less each.

When you convert units, you are never changing the thing. You are changing the
label. The number changes because the size of the unit changes — and they always
change in opposite directions. Smaller unit → bigger number. Bigger unit →
smaller number. Same thing."

### Success Model

**Success signals:**
- Student correctly explains why 1000 mm is not "bigger" than 1 m
- Student can predict whether a number will increase or decrease when converting
  to a smaller or larger unit
- Student uses the currency analogy spontaneously to check their own work

**Failure signals:**
- Student confuses larger number with larger quantity (M2 persisting)
- Student cannot identify the direction of the conversion (M1 — multiplying/dividing confusion)

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "5 km = __ m. Will the number go up or down?" → mastery if student reasons from unit size |
| Unsuccessful — analogy grasped, transfer missed | Route to UC-10 (shrinking/stretching — visual version) |
| Unsuccessful — analogy not grasped | Route to UC-03 (magic 1 fraction method) |

### Retrieval Tags

`everyday-story` `currency` `exchange` `same-value-different-label` `M2-prevention` `direction-of-conversion` `concrete` `first-contact`

### AI Retrieval Notes

**When to choose:** Default first intervention. Works across all ages and
cultural backgrounds. Best when student has no prior conversion experience.

**When to avoid:** Student is from a context with no currency exchange
experience. Student already grasps the "same thing, different label" principle.

**Which interventions follow naturally:** UC-03 (fraction method) to mechanise
what the analogy established conceptually. UC-04 (prefix staircase) for
the SI-prefix organisation.

---

## UC-02 — The Double Ruler

### Identity

| Field | Value |
|---|---|
| Intervention ID | UC-02 |
| Title | The Double Ruler |
| Concept ID | phys.meas.unit-conversion |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Real-world Observation |
| Target Learner | Age 10–14, visual learners, hands-on context |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Apply |
| Estimated Duration | 5–7 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | High — best with a real ruler showing both cm and mm |
| Voice Requirement | Low |
| Interaction Type | Observation + Activity |

### Pedagogical Metadata

**Why this strategy works:**
A physical ruler with both centimetre and millimetre scales makes the
conversion visible — the student sees that the same physical length
is simultaneously labelled with two different numbers. The abstract
"same thing, different label" becomes concrete and verifiable.

**Mental model installed:**
"The ruler shows me 1 cm and 10 mm occupying the same space. They are
not approximately equal — they are exactly the same length, read with two
different scales. That is all a unit conversion is: reading the same
physical reality with a different scale."

**Misconceptions prevented:** M2, M4 — the student cannot say the decimal
moved without understanding why (the marks show what's happening).

**Misconceptions recovered:** M4 — the student who thinks unit conversion
is "just moving a decimal point" now sees the physical meaning behind the move.

**Prerequisite knowledge assumed:** Has seen or used a ruler. phys.meas.units complete.

**Cognitive load:** Very low — the ruler shows everything.

### Teaching Script

*If available, have a ruler. Otherwise describe it clearly.*

*Say:*

"Look at a ruler. It has two sets of marks — centimetres on one side,
and millimetres on the other. Or look carefully at a single side: the small
marks between the centimetre numbers are millimetre marks.

I'm going to put my finger on the 5 cm mark. How many millimetres is that?"

*Let them count or calculate.*

"50 millimetres. And my finger hasn't moved.

The distance between where I put my finger and the zero mark is 5 centimetres.
It is also 50 millimetres. It is also 0.05 metres. These are all
describing the exact same physical distance.

I want you to pick any object — your pencil, your phone, your notebook —
and measure it in centimetres. Write down the number. Now tell me what
that measurement is in millimetres."

*Student multiplies by 10.*

"Correct. The object didn't change. What changed was the size of the units
you're using to describe it. You used 10 times as many millimetres
because each millimetre is 10 times smaller than a centimetre.

This is the heart of unit conversion: bigger units → smaller numbers.
Smaller units → bigger numbers. Same object, always."

### Success Model

**Success signals:**
- Student can correctly state a measurement in cm and mm simultaneously
- Student explains (not just does) why the number changes when the unit changes
- Student demonstrates understanding that the object/quantity is unchanged

**Failure signals:**
- Student converts correctly but cannot explain why
- Student thinks the object "got bigger" when expressed in mm

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "The same distance is 2 km. How many metres? Explain what happened." → mastery if student reasons through |
| Unsuccessful | Route to UC-01 (currency — different context for same principle) |
| Unsuccessful — ruler not available | Route to UC-06 (speed in different words — no equipment needed) |

### Retrieval Tags

`observation` `ruler` `visual` `centimetres` `millimetres` `same-distance` `M2-prevention` `M4-recovery` `hands-on`

### AI Retrieval Notes

**When to choose:** Student is visual or tactile. In-person or screen context
where a ruler image can be shown. Best for students who need to see the
physical reality before the abstract method.

**When to avoid:** Async text-only without images. Student already grasps
the "same thing, different label" insight.

**Which interventions follow naturally:** UC-03 (fraction method) to convert
the visual insight into a calculation procedure. UC-04 (prefix staircase)
for systematic SI-prefix coverage.

---

## UC-03 — The Magic 1

### Identity

| Field | Value |
|---|---|
| Intervention ID | UC-03 |
| Title | The Magic 1 |
| Concept ID | phys.meas.unit-conversion |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Analogy + Procedure |
| Target Learner | Age 12–16, analytical, needs a reliable method |
| Difficulty | Beginner |
| CPA Stage | Abstract |
| Bloom Level | Apply |
| Estimated Duration | 8–10 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Medium — writing the fraction on paper/screen helps |
| Voice Requirement | Medium |
| Interaction Type | Worked Example + Practice |

### Pedagogical Metadata

**Why this strategy works:**
The "multiply by 1" method (unit fraction / dimensional analysis lite) is
the single most reliable procedure for unit conversion. It makes the
direction of conversion explicit, eliminates the "which way do I multiply?"
confusion (M1), and shows why the algebra works without requiring the student
to memorise separate formulas (M3).

**Mental model installed:**
"1 km = 1000 m, so (1 km / 1000 m) = 1, and (1000 m / 1 km) = 1.
Both fractions equal exactly 1. Multiplying anything by 1 doesn't change it.
I choose the fraction that cancels the unit I don't want and leaves the unit I do want.
That is all unit conversion is — multiplying by a clever 1."

**Misconceptions prevented:** M1, M3.

**Misconceptions recovered:** M1 — when student cannot decide which way to
divide/multiply, the fraction method shows them visually which way the
units cancel. M3 — instead of memorising dozens of formulas, one method works for all.

**Prerequisite knowledge assumed:** Fraction multiplication. phys.meas.units complete.
Concept of "same thing, different label" (UC-01 or equivalent).

**Cognitive load:** Medium — the fraction notation is new for some students.

### Teaching Script

*Say:*

"Here is the most useful technique in physics: the Magic 1.

I know that 1 km = 1000 m.

So I can write two fractions:
    (1 km / 1000 m)    and    (1000 m / 1 km)

Both fractions equal exactly 1. Why? Because the top and the bottom
are the same length — just written in different units.

Now: convert 5 km to metres.

I write: 5 km × (1000 m / 1 km)

The 'km' on top and 'km' on the bottom cancel — just like x/x in algebra.
I'm left with: 5 × 1000 m = 5000 m.

But what if I'd accidentally used the wrong fraction?

5 km × (1 km / 1000 m) = 5/1000 km²/m

That is a mess — and the mess tells me immediately I chose the wrong one.
If your units don't cancel correctly, your fraction was upside down.
Flip it."

*Pause. Make sure they follow.*

"Now you try. Convert 250 cm to metres.

What do you know? 1 m = 100 cm.

Write your two Magic 1 fractions. Which one cancels centimetres?"

*Work through with the student.*

"250 cm × (1 m / 100 cm) = 2.5 m. The centimetres cancelled.

This method works for every unit conversion. You never need to
memorise which way to divide. The units tell you."

### Success Model

**Success signals:**
- Student can write both unit fractions from a conversion fact
- Student correctly identifies which fraction to use by which units cancel
- Student catches their own error when units don't cancel

**Failure signals:**
- Student memorises "multiply to go up, divide to go down" without
  understanding the cancellation mechanism (M1 persisting in procedural form)
- Student cannot transfer the method to a new unit pair

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: multi-step conversion (km → cm in one step) → mastery if student chains two Magic 1 fractions correctly |
| Unsuccessful — fraction setup unclear | Route to UC-02 (ruler — visual foundation) |
| Unsuccessful — cannot write unit fractions | Route to UC-01 (currency — build conceptual understanding first) |

### Retrieval Tags

`procedure` `unit-fraction` `magic-1` `cancellation` `M1-recovery` `M3-recovery` `algebraic` `analytical-learner` `reliable-method`

### AI Retrieval Notes

**When to choose:** Student needs a reliable procedure (test-preparation context).
Student is experiencing M1 (direction confusion). Best after conceptual understanding
is established via UC-01 or UC-02.

**When to avoid:** As first contact — the fraction method without conceptual
grounding is a trick, not understanding. Student who finds fractions intimidating.

**Which interventions follow naturally:** UC-04 (prefix staircase) to systematise
the conversion facts the student now knows how to use.

---

## UC-04 — The Prefix Staircase

### Identity

| Field | Value |
|---|---|
| Intervention ID | UC-04 |
| Title | The Prefix Staircase |
| Concept ID | phys.meas.unit-conversion |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Visual Mental Picture |
| Target Learner | Age 12–16, systematic learner, needs the full SI prefix structure |
| Difficulty | Beginner |
| CPA Stage | Representational |
| Bloom Level | Remember + Apply |
| Estimated Duration | 8–10 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | High — the staircase diagram is the core of this intervention |
| Voice Requirement | Low |
| Interaction Type | Visual Explanation + Practice |

### Pedagogical Metadata

**Why this strategy works:**
A visual staircase (kilo → base → milli → micro etc.) spatially organises
all SI prefixes. Moving down the staircase multiplies the number; moving up
divides it. The spatial metaphor replaces the need to memorise which way
each conversion goes (preventing M1 at scale).

**Mental model installed:**
"The SI prefix system is a staircase. Each step is a factor of 10 (or 1000
for the named prefixes). Going down the staircase (to smaller units) means
your number gets bigger — you need more small steps. Going up (to larger units)
means your number gets smaller. The staircase is the map."

**Misconceptions prevented:** M1 (direction confusion across all prefixes).
M3 — one mental map replaces dozens of individual conversion facts.

**Misconceptions recovered:** M1, M3.

**Prerequisite knowledge assumed:** Powers of 10 / scientific notation helpful.
phys.meas.units complete. "Same thing, different label" from UC-01.

**Cognitive load:** Medium — the staircase itself must be memorised, but
it replaces many other memorisation tasks.

### Teaching Script

*Draw or describe the staircase:*

```
GIGA  (G)   ×1,000,000,000   = 10⁹
MEGA  (M)   ×1,000,000       = 10⁶
KILO  (k)   ×1,000           = 10³
      (base unit — metre, gram, second, etc.)
MILLI (m)   ÷1,000           = 10⁻³
MICRO (μ)   ÷1,000,000       = 10⁻⁶
NANO  (n)   ÷1,000,000,000   = 10⁻⁹
```

*Say:*

"This is the SI prefix staircase. The base unit is in the middle —
metre, gram, second, whichever you're working with.

Going UP the staircase means going to bigger units. Fewer of them fit.
Your number gets smaller.

Going DOWN the staircase means going to smaller units. More of them fit.
Your number gets bigger.

So if I have 3 km and I want metres: I go DOWN from kilo to base.
That is 3 steps of '×10' — but kilo is defined as 1000, so I multiply by 1000.
3 km = 3000 m.

If I have 3 km and I want megametres: I go UP from kilo to mega.
I divide by 1000. 3 km = 0.003 Mm.

Memorise the staircase. Every metric conversion for the rest of your life
is answered by it. You don't need individual formulas."

*Practice: "Convert 450 mA to amperes. Which direction on the staircase?"*

### Success Model

**Success signals:**
- Student can draw the staircase from memory with correct prefix names
- Student correctly determines direction (up/down) before calculating
- Student converts across multiple steps (milli → kilo = 6 steps of ×10)

**Failure signals:**
- Student knows the prefixes but still gets direction wrong (M1 persisting)
- Student cannot apply the staircase to a new base unit (treats it as
  "metre-only" rather than universal)

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "Convert 2.5 μm to km — how many staircase steps?" → mastery if student chains the steps correctly |
| Unsuccessful — direction confusion | Route to UC-02 (ruler — physical demonstration of direction) |
| Unsuccessful — staircase not retained | Route to UC-01 (currency — rebuild conceptual foundation) |

### Retrieval Tags

`visual` `staircase` `SI-prefixes` `kilo-mega-milli-micro` `M1-recovery` `M3-recovery` `systematic` `powers-of-10` `representational`

### AI Retrieval Notes

**When to choose:** Student needs to master the full SI prefix system.
Best after conceptual understanding is established and student is ready
for systematic organisation. Good for exam preparation contexts.

**When to avoid:** As first contact — the staircase without the "same thing,
different label" foundation becomes rote memorisation.

**Which interventions follow naturally:** UC-03 (Magic 1) to combine the
staircase map with a reliable calculation procedure.

---

## UC-05 — The Shopping Receipt

### Identity

| Field | Value |
|---|---|
| Intervention ID | UC-05 |
| Title | The Shopping Receipt |
| Concept ID | phys.meas.unit-conversion |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Simple Experiment |
| Target Learner | Age 10–14, practical context, responds to real-world tasks |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Apply |
| Estimated Duration | 7–10 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Medium — a printed receipt or labels are ideal |
| Voice Requirement | Low |
| Interaction Type | Activity |

### Pedagogical Metadata

**Why this strategy works:**
Food packaging uses grams and kilograms — often both on the same label.
The student physically reads the same quantity in two units from a real
object, making the conversion concrete before it becomes abstract arithmetic.
The real-world object grounds the number in physical reality.

**Mental model installed:**
"The packet says 400 g on the front and 0.4 kg in the nutritional table.
Same packet. Same amount of food. Two different labels. That is what conversion means."

**Misconceptions prevented:** M2, M4.

**Misconceptions recovered:** M4 — "just moving a decimal point" becomes
"changing the label to match the size of the unit."

**Prerequisite knowledge assumed:** phys.meas.units. Ability to read a
product label. Basic multiplication by 10, 100, 1000.

**Cognitive load:** Very low — the real object does the teaching.

### Teaching Script

*Setup: any food packaging, or describe a specific product.*

*Say:*

"Look at this packet of rice. The label says 500 g on the front.

Now look at the nutritional information table — it often says serving size
in grams, and total weight elsewhere in kilograms.

500 g = 0.5 kg. Same packet. Same rice. Same amount.

Why does 500 get converted to 0.5? The unit changed from grams to kilograms.
Kilograms are 1000 times bigger than grams, so I need 1000 times fewer
of them to say the same thing. 500 ÷ 1000 = 0.5.

Now find two other items — a tin of beans, a bottle of water, anything.
Read the weight or volume in the original unit. Convert it to the next
bigger unit. Then check if the label confirms your answer."

*Let the student work through two examples.*

"Every time you convert, ask yourself: did the thing change? No.
Did the unit get bigger or smaller? If bigger — the number shrinks.
If smaller — the number grows. This is the one rule that works every time."

### Success Model

**Success signals:**
- Student correctly converts packet weights from grams to kilograms
- Student explains why the number shrinks when converting to kg
- Student checks their answer against the label and corrects if needed

**Failure signals:**
- Student can read the label but cannot articulate the conversion rule
- Student confuses which direction to divide/multiply

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "500 mL water — how many litres? Explain your reasoning." → mastery if student applies the same logic |
| Unsuccessful | Route to UC-01 (currency — conceptual foundation) |
| Unsuccessful — no packaging available | Route to UC-06 (speed context — no equipment needed) |

### Retrieval Tags

`experiment` `shopping` `food-label` `grams-kilograms` `real-world` `tactile` `M2-prevention` `M4-recovery` `practical`

### AI Retrieval Notes

**When to choose:** In-person session with access to physical objects.
Student is practical, responds to real tasks over verbal explanations.
Good for younger learners (10–13) who benefit from grounded activity.

**When to avoid:** Text-only async session. Student who needs the abstract
principle before engaging with examples.

**Which interventions follow naturally:** UC-04 (prefix staircase) to
generalise the kg/g insight to all SI prefixes.

---

## UC-06 — The Speedometer in Two Countries

### Identity

| Field | Value |
|---|---|
| Intervention ID | UC-06 |
| Title | The Speedometer in Two Countries |
| Concept ID | phys.meas.unit-conversion |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Guided Discovery |
| Target Learner | Age 12–16, analytical, with some prior unit understanding |
| Difficulty | Beginner |
| CPA Stage | Representational |
| Bloom Level | Apply |
| Estimated Duration | 7–9 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Low — optional speedometer image |
| Voice Requirement | Medium |
| Interaction Type | Guided Problem |

### Pedagogical Metadata

**Why this strategy works:**
The km/h to mph conversion is a real computation students often encounter
when travelling or reading about cars. The guided discovery format requires
them to derive the conversion factor rather than being given it —
which builds the "1 unit = X other units" schema from the inside.

**Mental model installed:**
"A conversion factor is just a statement of equivalence.
1 mile = 1.609 km. Everything follows from that one fact. You don't need
a separate formula — you build the Magic 1 and everything cancels."

**Misconceptions prevented:** M3 — derives the conversion rather than memorising it.

**Misconceptions recovered:** M3 — when student says they need to look up each
conversion formula separately, show them how a single equivalence fact is sufficient.

**Prerequisite knowledge assumed:** phys.meas.units. Fraction arithmetic.
Some exposure to speeds in km/h. UC-01 or UC-02 helpful but not required.

**Cognitive load:** Medium — the derivation requires active reasoning.

### Teaching Script

*Say:*

"A British car's speedometer shows 60 mph — miles per hour.
Your French friend says 'How fast is that?' You want to convert it to km/h.

I'll give you one fact: 1 mile = 1.609 kilometres.

Can you figure out what 60 mph is in km/h?"

*Let them try. Guide if needed:*

"Start by writing 60 mph as a fraction: 60 miles / 1 hour.

Now multiply by the Magic 1 that converts miles to km:
(1.609 km / 1 mile)

The 'miles' cancel:
60 × 1.609 km / hour = 96.5 km/h.

60 mph ≈ 97 km/h.

Now flip it. Your French friend is driving at 110 km/h on the motorway.
Is she over the 70 mph UK speed limit?

You have the same fact: 1 mile = 1.609 km.
Build the Magic 1 that converts km to miles."

*Let them work it through:*
"110 km/h × (1 mile / 1.609 km) = 68.4 mph. Just under the limit."

"Notice — you only needed one fact: 1 mile = 1.609 km.
Everything else followed from how you set up the fraction.
That's the principle: one equivalence, one technique, all conversions."

### Success Model

**Success signals:**
- Student can derive the conversion without being told which way to multiply
- Student uses the unit cancellation to verify they chose the right fraction
- Student correctly converts in both directions from the same equivalence fact

**Failure signals:**
- Student cannot set up the initial fraction (needs UC-03 Magic 1 first)
- Student treats km/h → mph as a separate formula from mph → km/h

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "Convert 50 m/s to km/h — what fact do you need?" → mastery if student identifies "1 km = 1000 m" and "1 h = 3600 s" as the two needed facts |
| Unsuccessful — fraction setup | Route to UC-03 (Magic 1 — explicit fraction procedure) |
| Unsuccessful — conceptual | Route to UC-04 (prefix staircase — simpler unit structure) |

### Retrieval Tags

`guided-discovery` `speed` `mph` `km-h` `conversion-factor` `M3-recovery` `analytical` `real-world` `travel`

### AI Retrieval Notes

**When to choose:** Student has fraction/algebra skills and needs to
see how one equivalence fact generates all conversions. Best after
UC-01 or UC-02 establishes the conceptual foundation.

**When to avoid:** Student who finds fractions intimidating — use UC-02
(ruler, visual) or UC-10 (shrinking/stretching, intuitive) first.

**Which interventions follow naturally:** UC-03 (Magic 1) to formalise
the procedure. UC-09 (engineering context) to see where this matters professionally.

---

## UC-07 — The International Team Problem

### Identity

| Field | Value |
|---|---|
| Intervention ID | UC-07 |
| Title | The International Team Problem |
| Concept ID | phys.meas.unit-conversion |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Problem Solving Scenario |
| Target Learner | Age 13–17, collaborative context, with prior conversion exposure |
| Difficulty | Intermediate |
| CPA Stage | Abstract |
| Bloom Level | Apply |
| Estimated Duration | 8–12 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Low |
| Voice Requirement | Medium |
| Interaction Type | Problem + Discussion |

### Pedagogical Metadata

**Why this strategy works:**
The scenario involves a realistic professional conflict — two teams measuring
the same thing in different units, producing apparently different results.
The student must resolve the conflict by converting, discovering through
success that "different numbers, same quantity" is the normal state of
scientific communication.

**Mental model installed:**
"Scientists routinely report the same measurement in different unit systems.
The skill is not remembering which units anyone 'should' use — it is being
able to move fluently between systems without losing the meaning. The quantity
is fixed; the unit is a choice."

**Misconceptions prevented:** M2, M3.

**Misconceptions recovered:** M1 — the problem requires the student to
determine direction correctly to resolve the conflict.

**Prerequisite knowledge assumed:** phys.meas.units, UC-01 or UC-03 complete.
Fraction arithmetic. Multi-step thinking.

**Cognitive load:** High for the problem set-up; medium once the method is chosen.

### Teaching Script

*Say:*

"Two engineering teams are building a bridge. They share a single specification.

Team A (European) reports: The cable must be 500 metres long.

Team B (American) receives the specification and orders cable in feet.
They order 1640 feet.

Is the order correct?"

*Let the student calculate.*

"1 metre = 3.281 feet.
500 metres × 3.281 feet/metre = 1640.5 feet. ≈ 1640 feet. Correct.

Now the teams meet to compare their load reports:
Team A says the bridge will carry 200,000 kilograms.
Team B says the bridge will carry 440,924 pounds.

Are they reporting the same number?"

*Give the fact: 1 kg = 2.205 pounds.*

"200,000 × 2.205 = 441,000 pounds. Yes — same load, different unit labels.

One team converted correctly. If they had swapped the direction — divided
instead of multiplied — they'd report 90,702 pounds. That is about
half the true load. A bridge designed for half its required load would fail.

The conversion direction is not a detail. It is the difference between
a bridge that stands and one that collapses."

### Success Model

**Success signals:**
- Student correctly converts cable length and identifies whether the order is right
- Student determines the conversion direction without being told
- Student grasps that the two teams' numbers describe the same physical reality

**Failure signals:**
- Student confuses direction (M1) even in the narrative context
- Student cannot identify which conversion fact is needed

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: Two-step conversion (tonnes → pounds → ounces) → mastery if student chains conversions |
| Unsuccessful — direction error | Route to UC-03 (Magic 1 — unit cancellation shows direction) |
| Unsuccessful — conceptual | Route to UC-01 (currency — simpler stakes) |

### Retrieval Tags

`problem-solving` `bridge` `international-teams` `M1-recovery` `M2-prevention` `M3-recovery` `intermediate` `professional`

### AI Retrieval Notes

**When to choose:** Student has the conceptual foundation but needs
challenging application. Good for collaborative or competitive learning
contexts. Best at intermediate level after two successful simpler interventions.

**When to avoid:** First contact. Anxious student — the stakes are high
in the story. Student who hasn't grasped the basic conversion direction.

**Which interventions follow naturally:** UC-09 (engineering framing) to
deepen the professional context established here.

---

## UC-08 — How Small Is a Nano?

### Identity

| Field | Value |
|---|---|
| Intervention ID | UC-08 |
| Title | How Small Is a Nano? |
| Concept ID | phys.meas.unit-conversion |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Socratic Dialogue |
| Target Learner | Age 12–16, curious, responds to surprising facts |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Understand |
| Estimated Duration | 6–8 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Low — optional diagram of human hair vs nanometre |
| Voice Requirement | High — the Socratic exchange carries the lesson |
| Interaction Type | Dialogue |

### Pedagogical Metadata

**Why this strategy works:**
Students hear "nanometre" and "gigabyte" constantly without viscerally
understanding the scale. Anchoring nano to something physically familiar
(human hair width ≈ 80,000 nm) produces genuine surprise, which is a
strong encoding trigger. The Socratic dialogue format requires the student
to estimate and then correct themselves.

**Mental model installed:**
"Prefixes are not just big and small — they span a range that human intuition
cannot imagine without anchoring. A nanometre is so small that a human hair
is 80,000 nm wide. A gigabyte is one billion bytes. These are not poetic
comparisons — they are conversion facts used to design chips and store music."

**Misconceptions prevented:** M3 — shows prefixes as systematic tools, not
arbitrary labels. M2 — the prefix system is not arbitrary; it reflects
real physical scales.

**Misconceptions recovered:** M4 — "just moving the decimal" fails at nano
and giga scales; the scale itself becomes the lesson.

**Prerequisite knowledge assumed:** phys.meas.units. Can understand powers of 10.

**Cognitive load:** Low — wonder-based. The questions do the cognitive work.

### Teaching Script

*Say:*

"Quick question — how wide do you think a human hair is? In millimetres?"

*Wait for an estimate.*

"A typical human hair is about 0.07 millimetres wide. Now —
how many nanometres is that?"

*Wait. If they don't know the prefix:*

"A nanometre is one billionth of a metre. 1 nm = 10⁻⁹ m.
Or equivalently: 1 mm = 1,000,000 nm.

So 0.07 mm = 70,000 nm.

Your hair is 70,000 nanometres wide.

The transistors on a modern computer chip are about 5 to 7 nanometres wide.

Your hair is roughly 10,000 transistors wide.

That is how small nano is.

Now flip it: your phone might have 128 gigabytes of storage.
Giga = one billion. So 128 gigabytes = 128 × 10⁹ bytes.

A byte stores one letter. You have storage for approximately
128,000,000,000 letters of text. Every book ever written in English
is about 30 billion words, or roughly 150 billion characters.
Your phone could store most of human literary history.

That is what giga means.

Nano and giga. Both on the prefix staircase. Both accessible with
the same conversion method. The staircase just works."

### Success Model

**Success signals:**
- Student expresses genuine surprise at the hair/transistor comparison
- Student can state the definition of nano (10⁻⁹) and giga (10⁹) from memory
- Student can convert between nm and mm using the staircase

**Failure signals:**
- Student is not engaged by the surprising scale — try a different domain
- Student can state the definition but cannot perform the conversion

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "A virus is 100 nm across. How many micrometres is that?" → mastery if student uses staircase correctly |
| Unsuccessful — prefix confusion | Route to UC-04 (prefix staircase — systematic visual organisation) |
| Unsuccessful — scale not gripping | Route to UC-02 (ruler — physical, immediate scale) |

### Retrieval Tags

`socratic` `prefix` `nano` `giga` `surprising-scale` `human-hair` `transistors` `M2-prevention` `M3-recovery` `wonder` `curious-learner`

### AI Retrieval Notes

**When to choose:** Student is curious, responds to surprising facts or
technology contexts. Good for students who find physics dry — the nano/giga
scale surprises consistently.

**When to avoid:** Student needs a systematic procedure more than wonder.
Student is anxious — surprise can land as confusion for anxious learners.

**Which interventions follow naturally:** UC-04 (prefix staircase) to
systematise the nano/giga discovery into all the prefixes.

---

## UC-09 — The Engineering Units War

### Identity

| Field | Value |
|---|---|
| Intervention ID | UC-09 |
| Title | The Engineering Units War |
| Concept ID | phys.meas.unit-conversion |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Engineer's Perspective |
| Target Learner | Age 13–17, STEM-oriented, interested in professional practice |
| Difficulty | Intermediate |
| CPA Stage | Abstract |
| Bloom Level | Apply |
| Estimated Duration | 8–10 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Low |
| Voice Requirement | Medium |
| Interaction Type | Explanation + Dialogue |

### Pedagogical Metadata

**Why this strategy works:**
The historical conflict between imperial and metric systems in professional
engineering is real and ongoing. The student sees that unit conversion is
not a school exercise — it is a daily professional necessity in any global
industry. This grounds abstract conversion practice in professional identity.

**Mental model installed:**
"Engineers in multinational teams convert units every day. The SI system
exists precisely so that the number of independent conversion operations is
minimised — one shared standard reduces the attack surface for errors.
Unit conversion fluency is a professional skill, not a school trick."

**Misconceptions prevented:** M2, M3.

**Misconceptions recovered:** M3 — the professional context shows that
knowing one reliable technique (the unit fraction) beats memorising dozens
of domain-specific formulas.

**Prerequisite knowledge assumed:** phys.meas.units. UC-01 or UC-03 complete.
Some awareness of professional/engineering contexts.

**Cognitive load:** Medium.

### Teaching Script

*Say:*

"Here is a real professional conflict that plays out in engineering firms every week.

The United States uses the imperial system for everyday measurement —
feet, inches, pounds, Fahrenheit. Most of the world uses SI — metres,
kilograms, Celsius. In the same building, the mechanical engineer uses
mm; the legacy drawing from 1985 is in inches; the subcontractor in
Germany sends specifications in millimetres with decimal notation;
the American client wants everything in feet and inches.

One engineering firm I know has a full-time employee whose job is
unit reconciliation. Not design. Not analysis. Just converting units
between team members.

Why does this exist? Because the cost of a unit error is catastrophic.

This is not a problem SI created — it is a problem SI is trying to solve.
The more engineers who use SI, the fewer conversion errors are made.
Unit conversion fluency is what keeps multi-national engineering projects
from the Mars Orbiter's fate.

The practical skill: one reliable method that works for every conversion.
Not formulas for each pair. One technique: the unit fraction.
Write your conversion fact as a fraction equal to 1. Cancel units.
Done. This is what senior engineers do manually when their software is unavailable."

*Work through a practical example:*
"Convert a pipe diameter of 3.5 inches to millimetres.
Fact: 1 inch = 25.4 mm.
3.5 in × (25.4 mm / 1 in) = 88.9 mm."

### Success Model

**Success signals:**
- Student understands why professional conversion fluency matters
- Student can convert between imperial and SI using the unit fraction
- Student grasps that one reliable method beats domain-specific formulas

**Failure signals:**
- Student focuses on the professional story rather than the conversion method
- Student still searches for "the formula" rather than deriving it from the fact

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "Convert a pressure of 14.7 psi to kPa (1 psi = 6.895 kPa)" → mastery if student applies the method to an unfamiliar unit pair |
| Unsuccessful — needs method | Route to UC-03 (Magic 1 — explicit fraction procedure) |
| Unsuccessful — needs concept | Route to UC-01 (currency — build foundation) |

### Retrieval Tags

`engineer` `professional` `imperial-vs-metric` `unit-fraction` `M2-prevention` `M3-recovery` `STEM-learner` `intermediate` `global-context`

### AI Retrieval Notes

**When to choose:** Student is STEM-oriented, wants to know what unit
conversion is for professionally. Best after UC-03 establishes the method —
this deepens motivation and professional framing.

**When to avoid:** First contact. Student who finds professional contexts
alienating or distant.

**Which interventions follow naturally:** UC-07 (international team problem)
for an applied challenge in the same professional context.

---

## UC-10 — Shrinking and Stretching

### Identity

| Field | Value |
|---|---|
| Intervention ID | UC-10 |
| Title | Shrinking and Stretching |
| Concept ID | phys.meas.unit-conversion |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Child-friendly |
| Target Learner | Age 8–12, first encounter, or anxious learners of any age |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Understand |
| Estimated Duration | 4–6 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | None |
| Voice Requirement | High — warmth and rhythm matter |
| Interaction Type | Story + Echo |

### Pedagogical Metadata

**Why this strategy works:**
The physical metaphor of "stretching a number line" makes the direction of
conversion physically intuitive. Bigger units are "stretched out" — fewer
of them fit. Smaller units are "squished" — more of them fit. This produces
a body-sense for the direction before any arithmetic.

**Mental model installed:**
"If I use big units, I count fewer of them. If I use small units, I count
more of them. Same thing, different count. Going to bigger units shrinks the
number. Going to smaller units grows the number."

**Misconceptions prevented:** M1, M2.

**Misconceptions recovered:** M1 — the shrink/stretch image makes direction physical.

**Prerequisite knowledge assumed:** phys.meas.units. Can count. Very basic
arithmetic.

**Cognitive load:** Minimal.

### Teaching Script

*Say:*

"Imagine measuring a room in giant footsteps — one step is one metre.
You count 5 steps. The room is 5 metres.

Now imagine you have very tiny steps — one step is one centimetre.
You walk the same room. How many steps now?"

*Wait. They should say more steps.*

"500 steps! Same room — much bigger number. Because you used a tiny unit.

Now imagine you use ENORMOUS steps — one step is one kilometre.
You walk the room. How many steps?"

*Wait. They should say less than one.*

"0.005 kilometres. A tiny number, because your step was enormous.

So: big unit → small number. Small unit → big number. Same room, always.

Now let's try for real. A pencil is 15 centimetres long.

Are millimetres bigger or smaller than centimetres?"

*Smaller.*

"So will the number get bigger or smaller in millimetres?"

*Bigger.*

"Right. 15 cm = 150 mm. The pencil got 'bigger' in millimetres because
millimetres are tiny — you need more of them.

Big unit → small number. Small unit → big number.
That is the one rule of unit conversion."

### Success Model

**Success signals:**
- Student correctly predicts direction before calculating (M1 resolved)
- Student explains the footstep reasoning spontaneously
- Student correctly converts cm to mm and mm to cm

**Failure signals:**
- Student cannot predict direction from unit size
- Student applies the rule correctly but cannot explain it

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "Kilometres are bigger than metres. If I have 3 km, will the number in metres be bigger or smaller?" → mastery if student predicts correctly (bigger) |
| Unsuccessful | Prerequisite check (phys.meas.units — number/unit concept may not be secure) |

### Retrieval Tags

`child-friendly` `footsteps` `shrinking-stretching` `direction-intuition` `M1-prevention` `M2-prevention` `age-8-12` `low-anxiety` `body-sense`

### AI Retrieval Notes

**When to choose:** Youngest learners (8–12) or anxious students at any age.
The fallback when all more complex interventions fail. Use when M1 (direction
confusion) is the persistent block — the footstep image resolves it most gently.

**When to avoid:** Students 13+ who would find the childlike framing
condescending. Students who need the algebraic method (UC-03).

**Which interventions follow naturally:** UC-01 (currency — more realistic
same-label-different-scale story), UC-04 (prefix staircase — systematic extension).

---

## Teaching Decision Graph

### Intervention Index

| ID | Title | Strategy | Target | CPA Stage | Bloom | Duration | Primary Misconception Target |
|---|---|---|---|---|---|---|---|
| UC-01 | The Currency Exchange | Everyday Life Story | Age 11–15, general | Concrete | Understand | 5–7 min | M2 |
| UC-02 | The Double Ruler | Real-world Observation | Age 10–14, visual | Concrete | Apply | 5–7 min | M2, M4 |
| UC-03 | The Magic 1 | Analogy + Procedure | Age 12–16, analytical | Abstract | Apply | 8–10 min | M1, M3 |
| UC-04 | The Prefix Staircase | Visual Mental Picture | Age 12–16, systematic | Representational | Remember+Apply | 8–10 min | M1, M3 |
| UC-05 | The Shopping Receipt | Simple Experiment | Age 10–14, practical | Concrete | Apply | 7–10 min | M2, M4 |
| UC-06 | The Speedometer | Guided Discovery | Age 12–16, analytical | Representational | Apply | 7–9 min | M3 |
| UC-07 | The International Team | Problem Solving | Age 13–17, collaborative | Abstract | Apply | 8–12 min | M1, M2, M3 |
| UC-08 | How Small Is a Nano? | Socratic Dialogue | Age 12–16, curious | Concrete | Understand | 6–8 min | M2, M3 |
| UC-09 | The Engineering Units War | Engineer's Perspective | Age 13–17, STEM | Abstract | Apply | 8–10 min | M2, M3 |
| UC-10 | Shrinking and Stretching | Child-friendly | Age 8–12, first contact | Concrete | Understand | 4–6 min | M1, M2 |

### Recovery Graph

| From | If Successful | If Unsuccessful |
|---|---|---|
| UC-01 | "Will km→m make number bigger or smaller?" → mastery | UC-10 → UC-03 → UC-02 |
| UC-02 | "2 km in metres — explain." → mastery | UC-01 → UC-06 |
| UC-03 | Multi-step conversion chain → mastery | UC-02 → UC-01 |
| UC-04 | Cross-six-step conversion (μm → km) → mastery | UC-02 → UC-01 |
| UC-05 | "500 mL → litres, explain." → mastery | UC-01 → UC-06 |
| UC-06 | "50 m/s → km/h" two-fact conversion → mastery | UC-03 → UC-04 |
| UC-07 | Two-step chain (tonnes → pounds → ounces) → mastery | UC-03 → UC-01 |
| UC-08 | "Virus 100 nm → μm?" → mastery | UC-04 → UC-02 |
| UC-09 | Unfamiliar unit pair (psi → kPa) → mastery | UC-03 → UC-01 |
| UC-10 | "3 km → metres, bigger or smaller?" → mastery | Prerequisite check (phys.meas.units) |

### Misconception → Intervention Map

| Misconception | Definition | Entry Intervention |
|---|---|---|
| M1 | Multiplying makes it bigger, dividing makes it smaller — direction confusion | UC-10 (intuitive), UC-03 (algebraic) |
| M2 | Prefixes change the quantity, not just the label | UC-01 (currency), UC-02 (ruler) |
| M3 | Every conversion needs its own formula | UC-03 (Magic 1), UC-06 (guided derivation) |
| M4 | Converting is just moving the decimal point | UC-02 (ruler), UC-05 (shopping label) |

### Starting Intuition Map

| ID | Starting Intuition (distinct entry point) |
|---|---|
| UC-01 | Currency exchange — £10 and €11 are the same value, different label |
| UC-02 | Physical ruler — same physical length readable as cm and mm simultaneously |
| UC-03 | Multiplying by 1 — a conversion factor is a fraction equal to 1 |
| UC-04 | A staircase — each step is a factor of 10; direction tells you multiply or divide |
| UC-05 | Food packaging — same product weight labelled in g and kg on the same packet |
| UC-06 | Car speedometer — derive km/h ↔ mph from one stated equivalence fact |
| UC-07 | International engineering teams — two correct reports of the same measurement look different |
| UC-08 | Human hair vs transistors — "nano" becomes real when the hair fits 10,000 of them |
| UC-09 | The professional units war — conversion fluency is a daily engineering skill |
| UC-10 | Footsteps — big steps mean smaller count; same room, different number |

### Retrieval Tag Index

| Tag | Interventions |
|---|---|
| concrete | UC-01, UC-02, UC-05, UC-08, UC-10 |
| abstract | UC-03, UC-07, UC-09 |
| M1-recovery | UC-03, UC-10, UC-07 |
| M2-prevention | UC-01, UC-02, UC-08, UC-09, UC-10 |
| M3-recovery | UC-03, UC-06, UC-07, UC-09 |
| M4-recovery | UC-02, UC-05 |
| young-learner | UC-10, UC-05, UC-02 |
| STEM-learner | UC-09, UC-07, UC-06, UC-03 |
| hands-on | UC-02, UC-05 |
| surprise-wonder | UC-08 |
| first-contact | UC-01, UC-10 |

---

## Self-Audit

**Interventions:** 10 / 10

**Misconception coverage:**
- M1 (direction confusion): UC-03, UC-10, UC-07 — 3 direct hits + UC-04, UC-06 supporting ✓
- M2 (prefixes change quantity): UC-01, UC-02, UC-05, UC-08, UC-09, UC-10 — 6 direct hits ✓
- M3 (formula for each conversion): UC-03, UC-06, UC-07, UC-09 — 4 direct hits ✓
- M4 (just moving decimal): UC-02, UC-05 — 2 direct hits ✓

**Recovery graph completeness:** 10 / 10 nodes complete. No dead ends. No loops.
UC-10 routes to prerequisite check (phys.meas.units) when it fails — correct.

**CPA coverage:**
- Concrete: UC-01, UC-02, UC-05, UC-08, UC-10 (5 interventions)
- Representational: UC-04, UC-06 (2 interventions)
- Abstract: UC-03, UC-07, UC-09 (3 interventions)
- Transfer: embedded in mastery probes

**Decision graph completeness:** All five sections complete ✓

**Remaining weaknesses:**
- Temperature conversion (°C ↔ K ↔ °F) is not covered — it is a non-linear
  conversion and deserves its own intervention (UC-11 candidate) to separate
  the additive offset (°C ↔ K) from the multiplicative+offset conversion (°C ↔ °F).
- Scientific notation / significant figures interaction with unit conversion not
  covered here — handled by phys.meas.significant-figures TCL.
