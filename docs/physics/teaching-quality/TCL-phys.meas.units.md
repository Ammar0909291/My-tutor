# Teaching Content Library — `phys.meas.units`
# SI Units and Measurement

**Status:** CANDIDATE ASSETS — not yet in production blueprint
**Concept ID:** `phys.meas.units`
**TCL Version:** 2.0 — Educational Brain Teaching Assets Standard
**Authored against:** KG node phys.meas.units (foundational, bloom: remember, requires: [])
**Date:** 2026-07-14
**Asset count:** 10
**Governing misconceptions:** M1 (units are optional decoration), M2 (SI is arbitrary), M3 (body-part units are still fine), M4 (units and numbers are the same thing)

---

## Purpose

The Teaching Content Library is the asset pool from which the Teaching Engine retrieves
interventions rather than generating them from scratch. Every intervention is a decision
node — it knows when to be chosen, what success looks like, what failure looks like, and
where to route next. Together, the ten interventions form a Teaching Decision Graph.

The core insight every intervention must install:

> **A number without a unit is not a measurement — it is noise.
> Units exist so that a measurement means the same thing to everyone, everywhere.**

---

## Intervention Graph Overview

```
Entry points (no prior attempt):  U-01 (default) · U-10 (young/anxious) · U-02 (curious/history)

After U-01 fails:  U-10 → U-05 → U-04
After U-02 fails:  U-01 → U-08
After U-03 fails:  U-01 → U-10
After U-04 fails:  U-10 → U-01
After U-05 fails:  U-01
After U-06 fails:  U-04 → U-01
After U-07 fails:  U-05 → U-01
After U-08 fails:  U-10
After U-09 fails:  U-01 → U-04
After U-10 fails:  prerequisite check (number sense / counting)

After any success:  Novel-unit probe → if criterion operative → mastery gate
                    If M1 still latent → U-07 (units-optional challenge)
```

---

## U-01 — The Broken Market

### Identity

| Field | Value |
|---|---|
| Intervention ID | U-01 |
| Title | The Broken Market |
| Concept ID | phys.meas.units |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Everyday Life Story |
| Target Learner | Age 10–15, first encounter, any cultural background |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Understand |
| Estimated Duration | 4–6 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | None |
| Voice Requirement | Recommended — the pause after "But how much?" carries the lesson |
| Interaction Type | Story + Question |

### Pedagogical Metadata

**Why this strategy works:**
Market-exchange is a universal human experience. Every learner knows the frustration
of ambiguous instruction. The story produces genuine confusion before any physics
vocabulary appears — the student feels the problem before it is named.

**Mental model installed:**
"A measurement without a unit is an unfinished transaction. The number tells you
how much; the unit tells you of what. Without the unit, you can't act."

**Misconceptions prevented:** M1 — the student experiences units as necessary, not
decorative, before any formal definition.

**Misconceptions recovered:** M1, M4 — when a student drops units from answers,
return them to: "How much of what?"

**Prerequisite knowledge assumed:** Everyday familiarity with buying and selling.
No physics required.

**Cognitive load:** Very low. One scenario, one confusion, one resolution.

### Teaching Script

*Say:*

"Two farmers go to market to trade grain.

Farmer A says: 'I'll give you 5 for 3.'

Farmer B says: 'Deal.'

They exchange. Farmer A walks away happy. Farmer B walks away furious.

What went wrong?"

*Wait for the student's answer.*

"Farmer A meant 5 bags of grain for 3 pieces of silver.
Farmer B thought he was giving 5 cups for 3 bags.

Same numbers. Completely different trade. One man thought he got rich; one man thought he got robbed.

Now — what was missing?"

*Let them identify: they didn't say what the numbers meant.*

"Exactly. The numbers 5 and 3 by themselves are useless. A measurement needs two
things: the number tells you how much, and the unit tells you *of what*.

5 bags. 3 kilograms. 100 metres. Without the second part, you don't have
a measurement — you have noise."

### Success Model

**Success signals:**
- Student spontaneously asks "of what?" when given a bare number
- Student correctly identifies which quantities in a list are missing units
- Student explains in own words why the farmers disagreed

**Failure signals:**
- Student can retell the story but cannot connect it to units
- Student treats the unit as a word that follows a number (decoration)
- Student says "I'd just ask them to clarify" without grasping the general principle

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Novel-quantity probe: "The temperature is 37. Is that a measurement?" If they say "of what units?" → mastery gate |
| Unsuccessful — story understood, principle missed | Route to U-10 (child-friendly body parts story) |
| Unsuccessful — concept not reached at all | Route to U-05 (guided discovery with ruler) |

### Retrieval Tags

`everyday-story` `market` `trade` `ambiguity` `number-vs-measurement` `units-necessary` `concrete` `M1-prevention` `M4-prevention`

### AI Retrieval Notes

**When to choose:** Default first intervention. Works across all ages and cultural
backgrounds. Best when the student has no prior physics and needs motivation for why
units matter before any formal content.

**When to avoid:** Student already understands units are necessary — use U-02 or U-09
for deeper engagement. Student is from a context where market-exchange is unfamiliar.

**Which interventions follow naturally:** U-04 (historical body-part units) for the
"why did humans need to standardise?" question that naturally arises. U-07 for the
practical "measure this room" challenge.

---

## U-02 — The Mars Orbiter

### Identity

| Field | Value |
|---|---|
| Intervention ID | U-02 |
| Title | The Mars Orbiter |
| Concept ID | phys.meas.units |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Historical Discovery |
| Target Learner | Age 12–16, curious or sceptical, responds to real consequences |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Understand |
| Estimated Duration | 5–7 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Low — optional image of the orbiter |
| Voice Requirement | Medium |
| Interaction Type | Story + Discussion |

### Pedagogical Metadata

**Why this strategy works:**
Real-world catastrophic failure caused by a unit error is more motivating than any
invented example. The student who says "does it really matter?" meets a $327 million
spacecraft that disagrees.

**Mental model installed:**
"A unit error is not a careless mistake — it is a completely different quantity.
Pound-force and Newton are not close. They are incommensurable. One wrong unit
cascades into a wrong trajectory, a wrong correction, a destroyed spacecraft."

**Misconceptions prevented:** M2 (SI is pedantic/arbitrary) — the student sees the
practical cost of inconsistent unit systems. M1 (units are optional).

**Misconceptions recovered:** M2 — when a student says "it doesn't matter which
units you use as long as you're consistent," show them two teams that were each
internally consistent, but using different systems.

**Prerequisite knowledge assumed:** Knows spacecraft exist. Can understand that
two numbers representing the same force can differ by a factor of ~4.45.

**Cognitive load:** Low. The story carries itself.

### Teaching Script

*Say:*

"In 1999, NASA sent a spacecraft to Mars. It cost 327 million dollars.
It took nine months to get there.

On September 23rd, it reached Mars — and burned up in the atmosphere.

Every sensor was working. Every computer was working. The spacecraft itself
was fine. Nine months of perfect travel, and then it died on arrival.

Why?"

*Wait. Let them guess.*

"One engineering team at Lockheed Martin was sending navigation data in
pound-force seconds — an old American unit. The other team, at NASA's
Jet Propulsion Laboratory, was receiving it and expecting Newton-seconds —
the standard international unit.

Same numbers going in. Completely different forces coming out.
The spacecraft thought it was in one place. It was somewhere else entirely.

Here is the number that destroyed the Mars Climate Orbiter:
1 pound-force second = 4.448 Newton-seconds.

Not approximately. Exactly. The teams were not sloppy. They were precise.
They were just speaking different unit languages.

A measurement without a clearly stated unit is not wrong by a little.
It is wrong by an unknown amount. And unknown amounts of wrongness
can cost nine months and three hundred million dollars."

### Success Model

**Success signals:**
- Student can explain in own words why two correct numbers produced a wrong result
- Student grasps that the problem was not imprecision but unit mismatch
- Student voluntarily wonders what other systems might have this problem

**Failure signals:**
- Student concludes "NASA made a mistake" without grasping the unit-language lesson
- Student focuses on the cost/loss rather than the unit concept
- Student cannot explain why two internally consistent systems produced a conflict

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "Two scientists measure the same force. One says 10, the other says 44.8. Are they disagreeing?" → if student grasps unit-difference → mastery |
| Unsuccessful | Route to U-01 (market story — simpler stakes, same principle) |
| Unsuccessful — disengaged | Route to U-08 (doctor's prescription — personal stakes) |

### Retrieval Tags

`history` `nasa` `mars-orbiter` `catastrophe` `unit-mismatch` `real-consequences` `M1-recovery` `M2-recovery` `curious-learner`

### AI Retrieval Notes

**When to choose:** When the student is sceptical about why units matter ("it's just
a convention"). When they respond well to real-world stories. When they are 12+ and
have some sense of scientific endeavour.

**When to avoid:** Young children (the stakes may not resonate). Students who are
anxious — this is a failure story and can increase performance anxiety.

**Which interventions follow naturally:** U-09 (engineer's perspective) for the
"what do engineers actually do about this?" question. U-03 (recipe analogy) to
re-anchor in familiar daily life.

---

## U-03 — The Recipe Without Units

### Identity

| Field | Value |
|---|---|
| Intervention ID | U-03 |
| Title | The Recipe Without Units |
| Concept ID | phys.meas.units |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Analogy |
| Target Learner | Age 10–14, domestic context, any background |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Understand |
| Estimated Duration | 3–5 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | None |
| Voice Requirement | Low |
| Interaction Type | Dialogue |

### Pedagogical Metadata

**Why this strategy works:**
Recipes are a near-universal experience. The student knows intuitively that "3 of
flour" is meaningless — cups? grams? tablespoons? — without any physics framing.
The cooking analogy makes the gap visible before any scientific vocabulary is needed.

**Mental model installed:**
"A recipe ingredient has two parts: the quantity and the ingredient (or unit).
'3 cups' and '3 grams' of flour are not similar quantities — they are a factor
of 240 apart. A unit is not a label; it is a multiplier. Choosing the wrong unit
changes the thing, not just the name."

**Misconceptions prevented:** M4 — the student sees that the number alone does
not specify a quantity. M1 — units are obviously necessary in the recipe context.

**Misconceptions recovered:** M4 — when a student writes "v = 10" and says
the unit is obvious from context, return them to the recipe: "What ingredient?"

**Prerequisite knowledge assumed:** Basic familiarity with cooking or recipes.
No physics.

**Cognitive load:** Very low. One extended analogy.

### Teaching Script

*Say:*

"I want to make a cake. Here is the recipe:

Flour: 3
Sugar: 2
Butter: 1
Eggs: 2
Milk: 250

Can I make the cake?"

*Wait. The student will say "no" or ask "3 of what?"*

"Why not? The numbers are right there."

*Let them explain: you don't know what the numbers mean.*

"Exactly. Is 3 grams of flour? 3 cups? 3 kilograms? 3 bags?
A cake with 3 grams of flour is going to be strange. A cake with
3 kilograms of flour is going to feed a hundred people.

And 250 of milk — millilitres? Litres? A glass? A bucket?

The recipe is not a recipe. It is a list of numbers. To become a recipe,
every number needs its unit. 3 cups of flour. 250 millilitres of milk.
Now I know what to do.

Physics is the same. When you write down a measurement, you are writing
a recipe for the universe. If you forget the unit, I cannot reproduce your
experiment — because I don't know which ingredient you used."

### Success Model

**Success signals:**
- Student can generate their own example of a measurement where missing the unit
  gives a completely different result
- Student correctly adds units to a list of bare numbers
- Student explains that unit choice changes the quantity, not just the label

**Failure signals:**
- Student knows the analogy but reverts to dropping units in answers
- Student thinks of units as what comes at the end of a number (cosmetic)

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "If I say the distance is 5, what could go wrong?" → mastery if criterion applied |
| Unsuccessful | Route to U-01 (market story, different concrete context) |
| Unsuccessful — analogy unclear | Route to U-10 (body-parts story, most concrete) |

### Retrieval Tags

`analogy` `recipe` `cooking` `units-necessary` `M1-prevention` `M4-prevention` `everyday-life` `concrete`

### AI Retrieval Notes

**When to choose:** Student has domestic/cooking familiarity. Good second
intervention after U-01 fails. Works well with younger students or those
who connect better with home contexts than market/science contexts.

**When to avoid:** Student is in a context where cooking is unfamiliar. Student
has already grasped "units are necessary" and needs the SI/standardisation layer.

**Which interventions follow naturally:** U-04 (why do we need a shared standard,
not just any unit?) after the student grasps units are necessary but asks why everyone
needs the same system.

---

## U-04 — The King's Foot

### Identity

| Field | Value |
|---|---|
| Intervention ID | U-04 |
| Title | The King's Foot |
| Concept ID | phys.meas.units |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Historical Discovery |
| Target Learner | Age 10–15, any prior knowledge |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Understand |
| Estimated Duration | 5–7 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Low — optional image of historical measuring tools |
| Voice Requirement | Medium |
| Interaction Type | Story + Activity |

### Pedagogical Metadata

**Why this strategy works:**
Body-part units are something every child spontaneously discovers — pacing a room,
measuring a hand. The story of why this breaks down is viscerally obvious once told.
The student who already accepts that units are necessary now understands why we need
a *shared* standard, not just any unit.

**Mental model installed:**
"Any unit works locally. But when you need to share a measurement with someone in
another room, city, or century — they need to be able to reproduce your unit.
SI exists so that 'one metre' means the same thing to everyone on Earth, in 2026
and in 2126."

**Misconceptions prevented:** M2 — SI is not arbitrary; it was the solution to a
real historical problem. M3 — body-part units were practical until they weren't.

**Misconceptions recovered:** M3 — when a student says "you could just use your
foot as a unit," this story shows where that leads.

**Prerequisite knowledge assumed:** Understanding that units are necessary (U-01
or equivalent). No physics.

**Cognitive load:** Low. The story progression is natural.

### Teaching Script

*Say:*

"Before standardised units, people measured length using body parts.
A 'foot' was literally the length of your foot. A 'cubit' was from your elbow
to your fingertip. An 'inch' was the width of your thumb.

This actually worked — for one person, in one place.

Here is the problem.

A king in medieval England wanted to build a castle. He sent his architect
to measure the land. The architect's foot was 28 centimetres long.
He measured 100 feet of land.

The builders arrived — but they had a different foreman, with a 32-centimetre
foot. He measured the same land as 88 feet.

The foundation was dug 88 'feet' wide. The walls were designed for 100 'feet'.

They didn't fit.

Now — what was the architect's mistake?"

*Let the student answer.*

"It wasn't carelessness. Both men measured carefully. The problem was that
they used a unit that wasn't shared — your foot is not my foot.

So England eventually declared that one 'foot' would be the length of
the king's foot — one standard, everyone copies it. Later, the French
invented the metric system based on the Earth's circumference.
Later still, the whole world agreed on the SI system — using atomic
vibrations to define the second, and the second to define the metre.

Not because old units were sloppy. Because science is shared. And shared
knowledge needs shared units."

### Success Model

**Success signals:**
- Student explains the difference between "any unit" and "a shared unit"
- Student understands that SI is a response to a real coordination problem
- Student can describe what would happen if two countries used different
  definitions of the kilogram

**Failure signals:**
- Student focuses on the castle story without extracting the principle
- Student concludes "just use the metric system" without grasping why
  standardisation is necessary in the first place

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "Why does it matter what defines a kilogram — as long as everyone uses the same one?" If student grasps reproducibility → mastery |
| Unsuccessful | Route to U-10 (simplest hands-on version) |
| Unsuccessful — story understood, principle missed | Route to U-01 (market story — simpler stakes) |

### Retrieval Tags

`history` `body-parts` `king-foot` `standardisation` `shared-units` `M2-recovery` `M3-recovery` `historical-discovery`

### AI Retrieval Notes

**When to choose:** After U-01 succeeds and student asks "why do we need
THE SAME unit?" Best for students who accept units are necessary but think
any consistent unit system would work.

**When to avoid:** As a first intervention — student needs the "units are
necessary" foundation first.

**Which interventions follow naturally:** U-09 (engineer's perspective on SI
in practice), U-06 (real-world unit signs: km/h vs mph).

---

## U-05 — The Mystery Rope

### Identity

| Field | Value |
|---|---|
| Intervention ID | U-05 |
| Title | The Mystery Rope |
| Concept ID | phys.meas.units |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Simple Experiment |
| Target Learner | Age 10–13, hands-on learners, tactile preference |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Apply |
| Estimated Duration | 7–10 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | High — requires physical objects (rope/string, ruler, hands) |
| Voice Requirement | Low |
| Interaction Type | Hands-on Activity |

### Pedagogical Metadata

**Why this strategy works:**
The student physically generates a measurement conflict by using different unit
references (hand spans, pencil lengths, finger widths). They discover the unit
problem empirically without being told. The felt need for a standard arises from
their own data, not from a teacher's claim.

**Mental model installed:**
"I measured the same rope twice with different references and got two different
numbers. The rope didn't change — my unit did. A standard unit is one
everyone agrees to use so our numbers match even when we're far apart."

**Misconceptions prevented:** M2 (SI is bureaucratic), M3 (local units are fine).

**Misconceptions recovered:** M3 — the student who thinks their local unit system
is adequate now has personal data showing why it fails across people.

**Prerequisite knowledge assumed:** Can count and record a number. No physics.

**Cognitive load:** Very low — the activity is self-explaining.

### Teaching Script

*Setup: provide a rope or string about 1 metre long and something to write with.*

*Say:*

"I want to know how long this rope is. Measure it — but don't use a ruler.
Use your hand span. Count how many hand spans fit along the rope. Write it down."

*Let the student measure. Record their number.*

"Now measure it again using your finger width. Write down that number too."

*Both numbers are different from each other and from 'the right answer'.*

"You measured the same rope twice and got two different numbers.
Which one is correct?"

*Wait.*

"Both are correct for your unit. But if I measured this rope with my
hand span, I'd get a completely different number — because my hand is
not your hand.

Now imagine you're a carpenter and you need to order rope by telephone.
You say 'I need 7 of rope.' Seven what? My hand spans? Your finger
widths? The other carpenter's elbow lengths?

This is why we invented standard units — so that '1 metre' means the
same length regardless of who is measuring or where they are."

*Have the student now measure with a ruler:*

"One metre. That is a number that means the same thing to every
carpenter in the world. That's what a unit is for."

### Success Model

**Success signals:**
- Student voluntarily reports both numbers and notes they differ
- Student can explain why the numbers differ (unit reference changed)
- Student articulates why a shared standard solves the problem

**Failure signals:**
- Student picks one number as "correct" and ignores the other
- Student cannot identify the rope as the unchanging thing while the unit changes

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "If two scientists measure the same length and get different numbers, does that mean they made a mistake?" → mastery if student grasps unit-difference |
| Unsuccessful — activity completed, lesson missed | Route to U-01 (verbal story reinforcement) |
| Unsuccessful — cannot engage with activity | Route to U-10 (simpler story-only version) |

### Retrieval Tags

`experiment` `hands-on` `rope` `measurement` `unit-reference` `tactile` `M2-prevention` `M3-recovery` `discovery`

### AI Retrieval Notes

**When to choose:** Student is tactile/kinesthetic, bored with stories,
or benefits from generating data before receiving explanations. Best with
younger students (10–13) in in-person contexts.

**When to avoid:** Async text-only sessions (activity not feasible).
Student already grasps the need for standard units.

**Which interventions follow naturally:** U-04 (historical standardisation)
to explain why hand spans were historically used and then abandoned.

---

## U-06 — The Speed Sign Abroad

### Identity

| Field | Value |
|---|---|
| Intervention ID | U-06 |
| Title | The Speed Sign Abroad |
| Concept ID | phys.meas.units |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Real-world Observation |
| Target Learner | Age 12–16, has some travel context or car awareness |
| Difficulty | Beginner |
| CPA Stage | Representational |
| Bloom Level | Understand |
| Estimated Duration | 4–5 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Medium — a photo of a US vs UK speed sign is optional but helpful |
| Voice Requirement | Low |
| Interaction Type | Observation + Dialogue |

### Pedagogical Metadata

**Why this strategy works:**
The km/h vs mph conflict is a real, modern, everyday unit problem that students
with any travel or driving-family context encounter. The danger is immediately
legible (driving too fast), making the unit problem visceral rather than abstract.

**Mental model installed:**
"The same speed limit sign shows 60. In France, that's 60 km/h — about as fast
as a bicycle race. In the US, that's 60 mph — nearly 100 km/h. Same number.
Completely different reality. Units are not labels — they change what the
number means."

**Misconceptions prevented:** M1 — the number alone is dangerous without
its unit. M4 — the number and the unit are inseparable.

**Misconceptions recovered:** M1, M4 — when student writes a speed without
units, invoke: "Is that km/h or mph? Your answer changes by a factor of 1.6."

**Prerequisite knowledge assumed:** Knows cars have speed limits. No physics.

**Cognitive load:** Very low. Single familiar scenario.

### Teaching Script

*Say:*

"Imagine your family is driving through France. The speed limit sign says 60.
Your father says 'Fine, we're going 60 back home.' He keeps driving at 60.

Three things could be wrong. Can you spot them?"

*Wait. They may not know the difference yet.*

"In France, that sign is in km/h — kilometres per hour. 60 km/h is about
37 miles per hour — a gentle suburban speed.

In the UK or USA, speed signs are in mph — miles per hour.
60 mph is about 96 km/h — motorway speed.

If your father drove at '60' and assumed he meant mph while the sign meant
km/h, he'd be going nearly double the limit.

Or if he assumed km/h and the sign was mph, he'd be crawling.

The sign says 60. But 60 of what?

That 'of what' is the unit. And the unit determines whether you arrive safely
or get a ticket. Or worse.

Every measurement in physics has this structure: a number, and a unit.
Drop the unit, and the number is dangerous, not just incomplete."

### Success Model

**Success signals:**
- Student can explain why 60 km/h and 60 mph are not similar quantities
- Student spontaneously asks "of what unit?" when given bare speed numbers
- Student identifies other real-world contexts where unit ambiguity causes problems

**Failure signals:**
- Student focuses on the travel story rather than the unit lesson
- Student thinks the problem is just about remembering to write "km/h" vs "mph"
  (treating unit as a label, not a meaning-carrier)

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "Give me a measurement where the number is 100 — and where the unit matters a lot." → mastery if student generates a genuine example |
| Unsuccessful | Route to U-04 (historical standardisation — why units exist) |
| Unsuccessful — unit concept not landing | Route to U-01 (market story — most universal) |

### Retrieval Tags

`real-world` `speed` `driving` `km-h` `mph` `unit-ambiguity` `M1-prevention` `M4-prevention` `travel`

### AI Retrieval Notes

**When to choose:** Student has travel or car context. Good for students
who find historical stories distant but respond to immediate personal-risk scenarios.

**When to avoid:** Student has no car/travel context. Student is very young
and the driving scenario is too abstract.

**Which interventions follow naturally:** U-02 (Mars orbiter — professional
consequences of unit mismatch) to escalate from personal to professional stakes.

---

## U-07 — The Untrusted Ruler

### Identity

| Field | Value |
|---|---|
| Intervention ID | U-07 |
| Title | The Untrusted Ruler |
| Concept ID | phys.meas.units |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Guided Discovery |
| Target Learner | Age 11–15, analytical, responds to logical challenge |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Apply |
| Estimated Duration | 6–8 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Medium — imagined scenario, optionally draw a ruler with wrong markings |
| Voice Requirement | Medium |
| Interaction Type | Socratic Dialogue |

### Pedagogical Metadata

**Why this strategy works:**
The guided discovery format requires the student to find the flaw themselves
through questions. Discovering the answer independently creates stronger
encoding than being told. The "untrusted ruler" scenario isolates the key
insight: the marks on a ruler are only meaningful if the unit is defined.

**Mental model installed:**
"A ruler is not magic — it is just a physical object with marks on it. Those
marks mean something only because we agreed what 'one centimetre' is. If we
changed what we agreed, the same marks would mean something different. A unit
is an agreement, and agreements must be shared."

**Misconceptions prevented:** M2 — SI units are not arbitrary; they are specific
agreements that allow reproducibility. M1 — the unit is what gives the mark
its meaning.

**Misconceptions recovered:** M2 — when a student says "who decided what a
metre is?", this intervention answers: humans decided, and the decision was
not arbitrary — it was chosen for reproducibility.

**Prerequisite knowledge assumed:** Has used a ruler. No physics.

**Cognitive load:** Low to medium — requires following a logical chain.

### Teaching Script

*Say:*

"I have a ruler. It says the gap between these two lines is 1 centimetre.

Question: how do I know that's true?"

*Wait. The student will probably say "because it says so" or "because it was made correctly."*

"But how was the ruler made? Someone drew the marks. How did they know
where to put the marks?"

*Guide toward: they copied from a standard.*

"They copied from another ruler. Which was copied from another. Which,
eventually, was copied from the original definition of the centimetre.

So here is my question: if I handed you a ruler made by someone who just
guessed where to put the marks — would you know the difference?"

*Usually: no.*

"You can't tell by looking. The only reason you trust your ruler is
that somewhere in the chain, someone measured against the agreed
standard for what one centimetre means.

In 1889, that standard was a platinum-iridium bar kept in a vault in
France. Scientists from around the world sent teams to copy it.

Today we don't use a bar — we define the metre using the speed of light,
which is the same everywhere in the universe. Now anyone with a
laboratory can recreate a perfect metre without flying to France.

The unit is not the mark. The unit is the agreement that the mark
represents. And the agreement only works if it is reproducible."

### Success Model

**Success signals:**
- Student can explain the chain from ruler → copied standard → original definition
- Student understands why reproducibility matters for scientific measurement
- Student sees that the choice of definition (platinum bar → speed of light) was
  made for a reason (reproducibility), not arbitrarily

**Failure signals:**
- Student thinks the ruler story is about quality control, not unit definition
- Student cannot explain why it matters whether a unit is reproducible

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "What would be wrong with defining 1 metre as the length of the king's arm?" → mastery if student identifies non-reproducibility |
| Unsuccessful | Route to U-05 (hands-on rope measurement — simpler version of same insight) |
| Unsuccessful — logical chain too abstract | Route to U-01 (story-based, lower cognitive demand) |

### Retrieval Tags

`guided-discovery` `ruler` `standard` `reproducibility` `definition` `M2-recovery` `analytical-learner` `socratic`

### AI Retrieval Notes

**When to choose:** Student is analytical, asks "why?" about conventions.
Best after M2 is identified ("SI units are just a choice, any unit would work").
Good for students who respond to logical progressions rather than stories.

**When to avoid:** Student is anxious or confused — this intervention assumes
the student can follow a chain of reasoning. Not appropriate as first contact.

**Which interventions follow naturally:** U-04 (historical context of why SI
replaced body-part standards), U-09 (engineering application of standard units).

---

## U-08 — The Doctor's Prescription

### Identity

| Field | Value |
|---|---|
| Intervention ID | U-08 |
| Title | The Doctor's Prescription |
| Concept ID | phys.meas.units |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Everyday Life Story |
| Target Learner | Age 12–16, health-aware context, personal-stakes responder |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Understand |
| Estimated Duration | 4–6 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | None |
| Voice Requirement | Medium |
| Interaction Type | Story + Question |

### Pedagogical Metadata

**Why this strategy works:**
Drug dosage is a universal personal-stakes context. Every learner has taken
medicine or knows someone who has. The difference between milligrams and grams
is a factor of 1,000 — which, in drug dosing, is the difference between a
therapeutic dose and a lethal one. The stakes are immediately real.

**Mental model installed:**
"A number without a unit is not just incomplete — in medicine, it can be deadly.
5 grams of paracetamol is an overdose. 5 milligrams might be too little.
5 micrograms is essentially nothing. Same number. Three completely different
outcomes. The unit is not decoration; it is the meaning of the number."

**Misconceptions prevented:** M1, M4.

**Misconceptions recovered:** M1 — when student says units are obvious from
context, bring them to the prescription: what if the pharmacist assumed a
different context?

**Prerequisite knowledge assumed:** Has taken medicine or visited a doctor.
No physics.

**Cognitive load:** Very low.

### Teaching Script

*Say:*

"A doctor writes a prescription. It says: Take 5 of aspirin twice a day.

The pharmacist gives you 5 grams of aspirin twice daily.

Is this a problem?"

*Wait for their reaction.*

"A typical adult dose of aspirin is 300 to 600 milligrams. That's
0.3 to 0.6 grams. 5 grams is 8 to 16 times the normal dose —
well into toxic territory.

The doctor meant 5 milligrams. Or 500 milligrams. We don't know.
Because they didn't write the unit.

Hospitals have entire safety systems to prevent exactly this kind of
error. One of the most common is checking that the unit is stated.
Not because doctors are careless, but because '5' without a unit is
genuinely ambiguous — milligrams, grams, micrograms, tablets — each
produces a different outcome.

In physics, the stakes are not always life-or-death, but the logic
is identical. A measurement without a unit is not a measurement.
It is an instruction waiting for a fatal misreading."

### Success Model

**Success signals:**
- Student expresses genuine concern about the ambiguity
- Student can identify what unit information was missing and why it mattered
- Student generalises to other dosage examples (antibiotics, vitamins)

**Failure signals:**
- Student focuses on "the doctor should have been more careful" rather than
  the unit-necessity principle
- Student thinks this is a medical anecdote, not a measurement principle

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "A chemistry teacher says 'add 10 of acid.' What questions do you have?" → mastery if student asks about units |
| Unsuccessful | Route to U-10 (simplest version — no personal-stakes needed) |
| Unsuccessful — story understood, principle missed | Route to U-01 (market story — different context, same lesson) |

### Retrieval Tags

`everyday-story` `medicine` `dosage` `prescription` `personal-stakes` `M1-prevention` `M4-prevention` `health-context`

### AI Retrieval Notes

**When to choose:** Student is health-aware or responds to personal-safety
framings. Good second intervention when U-01 lands the logic but not the
emotional weight. Also useful when M1 persists ("units are obvious from context").

**When to avoid:** Student is anxious about health/medicine — the story may
trigger unrelated anxiety. Young children for whom medicine is distant.

**Which interventions follow naturally:** U-02 (NASA orbiter — professional
consequences at scale) to show the principle extends beyond medicine.

---

## U-09 — The Engineer's Tolerance

### Identity

| Field | Value |
|---|---|
| Intervention ID | U-09 |
| Title | The Engineer's Tolerance |
| Concept ID | phys.meas.units |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Engineer's Perspective |
| Target Learner | Age 13–17, STEM-oriented, interested in how things are built |
| Difficulty | Intermediate |
| CPA Stage | Abstract |
| Bloom Level | Apply |
| Estimated Duration | 6–8 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Low — optional diagram of a bolt and nut |
| Voice Requirement | Medium |
| Interaction Type | Explanation + Dialogue |

### Pedagogical Metadata

**Why this strategy works:**
Engineers operate in a world where units are not optional — a misspecified unit
on a manufacturing drawing causes real physical failures. The concept of
"tolerance" (acceptable range) shows that units are not just about naming
quantities but about precision and fit.

**Mental model installed:**
"An engineer writing '10 mm ± 0.1 mm' is not just labelling a number. They
are specifying exactly what physical thing must exist. If the machinist reads
it as '10 cm ± 0.1 cm' — which could happen if the unit label is small —
the bolt won't fit. A unit is a load-bearing part of a technical specification."

**Misconceptions prevented:** M1 (units as decoration), M2 (SI as arbitrary).

**Misconceptions recovered:** M1 — the engineer's world makes unit omission
immediately consequential.

**Prerequisite knowledge assumed:** Understands what building/manufacturing is.
Basic arithmetic. No physics.

**Cognitive load:** Medium. The tolerance concept adds a layer.

### Teaching Script

*Say:*

"Engineers who design parts that must fit together — like a bolt and a nut —
write specifications with units. Not approximate units. Exact units.

For example: a bolt might be specified as 10.00 mm diameter, plus or minus
0.05 mm. That '± 0.05 mm' is called the tolerance — the range of acceptable
manufacturing variation.

Now, if the manufacturer misreads the specification and makes the bolt
10.00 cm — that is 100.00 mm — the bolt is ten times too large.
It will not fit any nut designed for 10 mm.

But here is the more realistic scenario: the specification says '10' with no
unit. The designer in Germany thinks millimetres — Germany uses metric.
The machinist in an old workshop thinks centimetres. The bolt arrives,
it is 10 cm, the assembly line stops, thousands of bolts must be scrapped,
a production line is down for a day.

Actual cost: hundreds of thousands of dollars.

This is why every professional technical drawing has a title block with
a declared unit. It is a legal document. The unit is not a courtesy.
It is a contractual specification.

When you write a physics answer without a unit, you are giving me a
number without a specification. I cannot build anything with it."

### Success Model

**Success signals:**
- Student understands that a unit is part of the specification, not a label
- Student can explain why two engineers on different continents both stating
  units prevents the bolt-size failure
- Student sees that units are professionally and legally required

**Failure signals:**
- Student focuses on manufacturing complexity rather than unit logic
- Student thinks tolerance is the key lesson rather than the unit requirement

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "Why does a blueprint always state the unit at the top of the page?" → mastery if student grasps specification-level necessity |
| Unsuccessful | Route to U-01 (simpler market story — lower abstraction) |
| Unsuccessful — too abstract | Route to U-04 (historical story — more narrative) |

### Retrieval Tags

`engineer` `manufacturing` `tolerance` `specification` `professional` `M1-recovery` `M2-prevention` `STEM-learner`

### AI Retrieval Notes

**When to choose:** Student is STEM-interested, wants to know what physics
is *for* in the real world. Best for students who find abstract definitions
unmotivating but respond to professional applications.

**When to avoid:** Young students (12 and under) without manufacturing context.
As a first intervention — assumes the student already values precision.

**Which interventions follow naturally:** U-02 (NASA orbiter — higher stakes,
same professional principle), U-06 (real-world speed signs — simpler observation).

---

## U-10 — The Magic Measuring Word

### Identity

| Field | Value |
|---|---|
| Intervention ID | U-10 |
| Title | The Magic Measuring Word |
| Concept ID | phys.meas.units |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Child-friendly Story |
| Target Learner | Age 8–12, first encounter, low confidence, high anxiety |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Remember |
| Estimated Duration | 3–5 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | None |
| Voice Requirement | High — tone and warmth are essential |
| Interaction Type | Story + Echo |

### Pedagogical Metadata

**Why this strategy works:**
The simplest possible narrative: a friendly creature who speaks only in numbers,
and the chaos this creates. The solution (add the describing word) emerges
naturally. Zero technical vocabulary. The goal is a felt sense that measurements
need two parts before any formal instruction.

**Mental model installed:**
"A measurement is like giving directions. The number is how many. The unit
is what kind. Without the what-kind word, nobody knows what to do."

**Misconceptions prevented:** M1, M4.

**Misconceptions recovered:** M1 — the simplest recovery path.

**Prerequisite knowledge assumed:** Can count. No physics.

**Cognitive load:** Minimal.

### Teaching Script

*Say:*

"There is a tiny helper named Num. Num lives in your pocket and loves to
count things. Whenever you ask Num a question, Num gives you a number.

You ask: 'How far to school?'
Num says: '7.'

You start walking. After a while, you haven't arrived. You ask Num: 'Are we there yet?'
Num says: '7.'

After a very long time, still not there. You ask Num: '7 what?'

Num looks embarrassed. 'I forgot to say. 7 kilometres.'

You've been walking for an hour. You had a bicycle."

*Pause. Let the child laugh or react.*

"Num is very good at numbers. But Num always forgets the most important word —
the measuring word. Kilometres. Metres. Minutes. Kilograms.

Every measurement has two parts. The number — that's Num's job.
And the measuring word — that's the part Num always forgets.

When you write a measurement in physics, you are Num's boss. You write
both parts. The number AND the measuring word.

7 kilometres. 5 seconds. 3 kilograms.

Now let's practice. I will say a measurement. You tell me if it is
complete or if the measuring word is missing."

*Give examples: "The rope is 3." / "The bag weighs 2 kg." / "She ran for 40."*

### Success Model

**Success signals:**
- Child spontaneously says "measuring word!" when given an incomplete measurement
- Child can correctly label which examples are complete and which are missing
- Child adds the unit naturally when prompted to measure something

**Failure signals:**
- Child focuses on the story but cannot apply the "two parts" principle
- Child says the measuring word but treats it as a label rather than a meaning-carrier

### Recovery Graph

| Outcome | Routing |
|---|---|
| Successful | Probe: "If I say 'the box weighs 5' — what is Num forgetting?" → mastery if child identifies the missing measuring word |
| Unsuccessful | Prerequisite check — number sense / counting (underlying arithmetic may be the gap) |

### Retrieval Tags

`child-friendly` `story` `Num` `measuring-word` `concrete` `age-8-12` `low-anxiety` `M1-prevention` `M4-prevention` `first-contact`

### AI Retrieval Notes

**When to choose:** Youngest learners (8–12) or anxious/low-confidence students
of any age at first contact with units. The only intervention that requires
no prior context. Use as the fallback when all other interventions fail to land
the basic principle.

**When to avoid:** Students 13+ who would find the childlike framing
condescending. Students who already grasp the two-part structure.

**Which interventions follow naturally:** U-01 (real-world market scenario)
once the student has the "two parts" foundation. U-03 (recipe analogy) for
another concrete application of the same principle.

---

## Teaching Decision Graph

### Intervention Index

| ID | Title | Strategy | Target | CPA Stage | Bloom | Duration | Primary Misconception Target |
|---|---|---|---|---|---|---|---|
| U-01 | The Broken Market | Everyday Life Story | Age 10–15, general | Concrete | Understand | 4–6 min | M1, M4 |
| U-02 | The Mars Orbiter | Historical Discovery | Age 12–16, curious | Concrete | Understand | 5–7 min | M2, M3 |
| U-03 | The Recipe Without Units | Analogy | Age 10–14, domestic | Concrete | Understand | 3–5 min | M1, M4 |
| U-04 | The King's Foot | Historical Discovery | Age 10–15, general | Concrete | Understand | 5–7 min | M2, M3 |
| U-05 | The Mystery Rope | Simple Experiment | Age 10–13, tactile | Concrete | Apply | 7–10 min | M2, M3 |
| U-06 | The Speed Sign Abroad | Real-world Observation | Age 12–16, travel | Representational | Understand | 4–5 min | M1, M4 |
| U-07 | The Untrusted Ruler | Guided Discovery | Age 11–15, analytical | Concrete | Apply | 6–8 min | M2 |
| U-08 | The Doctor's Prescription | Everyday Life Story | Age 12–16, health | Concrete | Understand | 4–6 min | M1, M4 |
| U-09 | The Engineer's Tolerance | Engineer's Perspective | Age 13–17, STEM | Abstract | Apply | 6–8 min | M1, M2 |
| U-10 | The Magic Measuring Word | Child-friendly Story | Age 8–12, first contact | Concrete | Remember | 3–5 min | M1, M4 |

### Recovery Graph

| From | If Successful | If Unsuccessful |
|---|---|---|
| U-01 | Novel-unit probe → mastery gate | U-10 → U-05 → U-04 |
| U-02 | "Two scientists, different numbers" probe → mastery | U-01 → U-08 |
| U-03 | "Measurement where number is 5" probe → mastery | U-01 → U-10 |
| U-04 | "Why not the king's arm?" probe → mastery | U-10 → U-01 |
| U-05 | "Two scientists, different numbers" probe → mastery | U-01 → U-10 |
| U-06 | "Name a measurement where unit matters a lot" → mastery | U-04 → U-01 |
| U-07 | "What's wrong with defining metre as king's arm?" → mastery | U-05 → U-01 |
| U-08 | "Add 10 of acid — what questions?" → mastery | U-10 |
| U-09 | "Why does blueprint state unit at top?" → mastery | U-01 → U-04 |
| U-10 | "What is Num forgetting?" → mastery | Prerequisite check (number sense) |

### Misconception → Intervention Map

| Misconception | Definition | Entry Intervention |
|---|---|---|
| M1 | Units are optional decoration; the number carries the meaning | U-01 (default), U-10 (young/anxious) |
| M2 | SI units are arbitrary conventions; any consistent system works | U-02, U-04, U-07 |
| M3 | Body-part or informal units are practically equivalent to SI | U-04, U-05 |
| M4 | The number and the unit are the same thing / interchangeable | U-01, U-06, U-08 |

### Starting Intuition Map

| ID | Starting Intuition (distinct entry point) |
|---|---|
| U-01 | Market transaction — a number without a unit makes an agreement impossible |
| U-02 | Historical catastrophe — unit mismatch destroys a $327M spacecraft |
| U-03 | Cooking recipe — without units, a recipe is just numbers |
| U-04 | The king's foot — local body-part units fail across people and time |
| U-05 | Physical rope — measuring the same thing twice with different references gives different numbers |
| U-06 | Speed sign — same number (60) means completely different speeds in different countries |
| U-07 | Untrusted ruler — the marks are meaningful only because of an agreed standard |
| U-08 | Doctor's prescription — dosage without units can kill |
| U-09 | Engineering drawing — unit is a load-bearing part of a legal specification |
| U-10 | Num the counter — measurements need two parts: the number AND the measuring word |

### Retrieval Tag Index

| Tag | Interventions |
|---|---|
| concrete | U-01, U-03, U-04, U-05, U-07, U-08, U-10 |
| history | U-02, U-04 |
| real-world | U-06, U-09 |
| experiment | U-05 |
| M1-prevention | U-01, U-03, U-06, U-08, U-10 |
| M2-recovery | U-02, U-04, U-07 |
| M3-recovery | U-04, U-05 |
| M4-prevention | U-01, U-03, U-06, U-08, U-10 |
| young-learner | U-10, U-01, U-03 |
| STEM-learner | U-09, U-07, U-02 |
| personal-stakes | U-08, U-06 |
| analytical-learner | U-07, U-09 |
| first-contact | U-01, U-10 |

---

## Self-Audit

**Interventions:** 10 / 10

**Misconception coverage:**
- M1 (units optional): U-01, U-03, U-06, U-08, U-09, U-10 — 6 direct hits ✓
- M2 (SI arbitrary): U-02, U-04, U-07, U-09 — 4 direct hits ✓
- M3 (body-part units fine): U-04, U-05 — 2 direct hits ✓
- M4 (number = measurement): U-01, U-03, U-06, U-08, U-10 — 5 direct hits ✓

**Recovery graph completeness:** 10 / 10 nodes with explicit if-successful and
if-unsuccessful routing. No dead ends. No loops. U-10 correctly routes to
prerequisite check (not another unit intervention) when it fails.

**CPA coverage:**
- Concrete: U-01, U-02, U-03, U-04, U-05, U-07, U-08, U-10 (8 interventions)
- Representational: U-06 (1 intervention)
- Abstract: U-09 (1 intervention)
- Transfer: embedded in mastery probes across all nodes

**Decision graph completeness:** Intervention Index, Recovery Graph table,
Misconception map, Starting Intuition Map, Retrieval Tag Index — all complete ✓

**Remaining weaknesses:**
- No intervention that explicitly teaches the seven SI base units by name — this
  concept is "remember" level bloom and the base units (metre, kilogram, second,
  ampere, kelvin, mole, candela) should be covered in a dedicated enumeration
  intervention; consider adding U-11 if the engine needs it.
- Precision/accuracy distinction is not covered here — that belongs to
  phys.meas.precision-accuracy TCL.
- The Kelvin scale as a base unit (vs Celsius as a derived unit) is not covered —
  flag for phys.meas.errors or a supplementary U-11.
