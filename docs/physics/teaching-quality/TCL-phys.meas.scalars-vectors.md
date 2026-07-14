# Teaching Content Library — `phys.meas.scalars-vectors`
# Scalar and Vector Quantities

**Status:** CANDIDATE ASSETS — not yet in production blueprint  
**Concept ID:** `phys.meas.scalars-vectors`  
**TCL Version:** 2.0 — Educational Brain Teaching Assets Standard  
**Authored against:** EB Concept Entry v1.0 + Teaching Blueprint v1.0  
**Date:** 2026-07-14  
**Asset count:** 10  
**Governing misconceptions:** M1 (list-recall), M2 (speed=velocity), M3 (direction absolute), M4 (magnitude-only)

---

## Purpose

The Teaching Content Library is the asset pool from which the Teaching Engine retrieves
interventions rather than generating them from scratch. Every intervention is a decision
node — it knows when to be chosen, what success looks like, what failure looks like, and
where to route next. Together, the ten interventions form a Teaching Decision Graph.

The core insight every intervention must install:

> **Some measurements are complete without direction. Others are incomplete without it.
> The second kind is called a vector.**

---

## Intervention Graph Overview

```
Entry points (no prior attempt):   SV-01 (default) · SV-10 (young/anxious) · SV-06 (curious)

After SV-01 fails:                 SV-10 → SV-06 → SV-05
After SV-02 fails:                 SV-01 → SV-10
After SV-03 fails:                 SV-05 → SV-04
After SV-04 fails:                 SV-05
After SV-05 fails:                 SV-01
After SV-06 fails:                 SV-01
After SV-07 fails:                 SV-04 → SV-02
After SV-08 fails:                 SV-04
After SV-09 fails:                 SV-04
After SV-10 fails:                 Prerequisite check (phys.meas.units)

After any success:                 Novel-quantity probe → if criterion operative → mastery gate
                                   If M1 still latent → SV-06 (criterion test)
```

---

## SV-01 — The Incomplete Sentence

### Identity

| Field | Value |
|---|---|
| Intervention ID | SV-01 |
| Title | The Incomplete Sentence |
| Concept ID | phys.meas.scalars-vectors |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Everyday Life Story |
| Target Learner | Age 10–14, first encounter, any cultural background |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Understand |
| Estimated Duration | 3–5 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | None |
| Voice Requirement | Recommended — the "Go." pause lands hardest when spoken |
| Interaction Type | Story + Question |

### Pedagogical Metadata

**Why this strategy works:**
Every learner has experienced being given incomplete instructions and feeling the
incompleteness in their body before they can name it. The post-office scenario
produces that feeling — the student will not move, or will ask "which way?" —
before any physics vocabulary appears. The gap becomes real before it becomes named.

**Mental model installed:**
"A measurement is like a sentence. A scalar is a complete sentence — one number tells
you everything. A vector is an unfinished sentence — you haven't said everything until
you specify a direction. The test is: can I act on this measurement? If not, it's
missing a direction."

**Misconceptions prevented:** M1 — installs the criterion before the names, so the
names become labels for a felt distinction rather than entries in a list.

**Misconceptions recovered:** M1 — when the student is recalling lists rather than
applying the criterion, this returns them to the root question: is the sentence finished?

**Prerequisite knowledge assumed:** Colloquial understanding of distance and direction.
No physics terminology required. "800 metres away" and "north" must be meaningful.

**Cognitive load:** Very low. One situation, one instruction, one felt gap, one criterion.

### Teaching Script

*Say:*

"I want you to walk to the post office for me.

It's 800 metres away.

Go."

*Pause. Wait. The student will not move, or will ask: 'Which way?'*

"Why aren't you going?"

*Let them answer.*

"Right. 800 metres tells you how far — but not which way. The sentence is unfinished.
You can't act on it.

Now: the post office is 800 metres north.

Go."

*That sentence is complete.*

"In physics, some measurements are like '800 metres' — they're a complete sentence.
Temperature is 30 degrees. Mass is 5 kilograms. Those are finished thoughts.

Other measurements are like '800 metres' with no direction — they're incomplete
sentences. Velocity. Force. Displacement. You haven't said everything yet.

Physics gives these two types of measurement different names.
The complete kind: **scalar**.
The incomplete kind — the kind that needs a direction to be finished: **vector**."

### Key Insight

The test is not "what category is this?" — the test is "is the sentence finished?"
A student who learns to ask "is the sentence finished?" can classify any physical
quantity they will ever encounter.

### Success Model

**Success signals:**
- Student does not move (or asks "which way?") before being prompted — the incompleteness lands physically
- Student says "Oh — so direction IS part of the measurement, not extra info"
- Student can finish the sentence for a new quantity: "Force is 10 newtons ___" and feels the gap

**Failure signals:**
- Student says "I'd just walk any direction and look around" — incompleteness not felt
- Student says "So scalars are simpler, better to use" — missing that vectors aren't optional
- Student repeats the names (scalar/vector) without being able to state the criterion

### Recovery Graph

**If successful →** Novel-quantity probe: "Is electric current scalar or vector? Use the sentence test."
Then SV-06 (Sorting Game) to verify the criterion is operative across multiple quantities.

**If unsuccessful →** SV-10 (Hot and Cold Don't Point) — shift to the most primitive sensory
contrast. If SV-10 also fails, check that `phys.meas.units` is secure before returning.

### Retrieval Tags

`first-explanation` `default-opening` `child` `teen` `adult` `voice-lesson` `classroom`
`self-study` `low-confidence` `M1-recovery` `zero-prior-knowledge`

### AI Retrieval Notes

**When to choose:** First session, no prior exposure to scalars/vectors, any age 10 or above.
Default opening intervention when no student state signals a more specific match.

**When to avoid:** Student has already encountered the definition and needs a different mental
model entry point. Purely text-based asynchronous session where the "Go." pause doesn't land.

**Naturally followed by:** SV-06 (Sorting Game) to test whether the criterion is now operative;
or direct novel-quantity classification practice.

---

## SV-02 — The Weather Forecast

### Identity

| Field | Value |
|---|---|
| Intervention ID | SV-02 |
| Title | The Weather Forecast |
| Concept ID | phys.meas.scalars-vectors |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Real-world Observation |
| Target Learner | Age 12+, any level, particularly strong for visual and contextual learners |
| Difficulty | Beginner |
| CPA Stage | Concrete → Representational |
| Bloom Level | Understand |
| Estimated Duration | 4–6 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Diagram — Recommended (weather forecast screenshot or image enriches significantly; works without) |
| Voice Requirement | Optional |
| Interaction Type | Observation + Question |

### Pedagogical Metadata

**Why this strategy works:**
The student already navigates scalar and vector information daily in weather forecasts
without knowing it. This intervention names a distinction the student is already making
intuitively. The naming should not be the learning — recognising an already-familiar
thing in physics terms produces immediate ownership.

**Mental model installed:**
"Some measurements fully describe a quantity with one number — temperature, 22°C.
Others require a number plus a direction to be actionable — wind velocity, 30 km/h
from the northwest. The forecast tells you both because both are physically real.
I've been reading scalars and vectors every morning without knowing the words."

**Misconceptions prevented:** M2 — wind speed (scalar) and wind velocity (vector) appear
side by side in the forecast, modelling the distinction naturally without requiring
pre-existing physics vocabulary.

**Misconceptions recovered:** M2 — when the student uses "speed" and "velocity"
interchangeably, the forecast concretely demonstrates that physics chose two different
words because they carry two different amounts of information.

**Prerequisite knowledge assumed:** Can interpret a weather forecast; knows that wind has
both speed and direction; knows that temperature is "just a number."

**Cognitive load:** Very low — familiar context eliminates almost all extraneous load.
The distinction rides on an already-understood domain.

### Teaching Script

"Look at a weather forecast. You'll see two kinds of information about the wind.

Wind speed: 30 km/h.
Wind direction: from the northwest.

Why does the forecast tell you BOTH?

Think about it — if you knew the wind was 30 km/h but you didn't know which way it
was coming from, could you decide whether to carry an umbrella?

*Not really* — if the rain is coming from behind you, an umbrella is useful;
if it's coming from the south and you're walking north, it's in your face.

The speed alone isn't enough. You need the direction.

Now look at the temperature: 22 degrees.

Does the temperature have a direction? Does it matter which way the 22 degrees
is coming from?

No. Temperature is just a number. It doesn't point anywhere. You don't need to
know the direction of 'warmness.'

This is the entire distinction in physics:
- Quantities like temperature — a number, no direction needed — are called **scalars**.
- Quantities like wind velocity — a number PLUS a direction — are called **vectors**.

Every time you see a measurement in physics, you can ask: 'does this measurement
need to tell me which way?' If yes: vector. If no: scalar."

### Key Insight

The student already navigates scalar and vector information daily. Physics is naming
something they do intuitively. The naming *should not be the learning* — the
distinction already exists in their experience.

### Success Model

**Success signals:**
- Student says "Oh — so wind *speed* is scalar but wind *velocity* is a vector, that's why they're different words"
- Student spontaneously says "temperature doesn't point anywhere"
- Student can apply the criterion: "rainfall amount — that's a scalar, just a number"

**Failure signals:**
- Student says "But I always knew which way the wind was blowing" — misses that the physics quantity still requires direction
- Student says "Weather is complicated, that's why you need both pieces" — attributes the need for direction to weather complexity, not physical necessity
- Student connects the observation but cannot transfer the criterion to a new quantity

### Recovery Graph

**If successful →** SV-07 (Interrogation) to deepen the M2 distinction; or probe with
a novel quantity: "Is rainfall amount scalar or vector? Is rainfall velocity scalar or vector?"

**If unsuccessful →** SV-01 (Incomplete Sentence) — simpler language-based entry;
or SV-10 for younger learners.

### Retrieval Tags

`first-explanation` `real-world` `teen` `adult` `visual-learner` `contextual-learner`
`M2-recovery` `self-study` `classroom` `sceptical-student`

### AI Retrieval Notes

**When to choose:** Student is sceptical about why the distinction matters (real-world
relevance is immediate). Student has already heard definitions but needs grounding in
observable reality. Student is 12+ with reliable access to weather information.

**When to avoid:** Student is younger than 12 and has limited weather-reading experience.
Student lives somewhere with minimal wind (makes the direction less salient).

**Naturally followed by:** SV-07 (Interrogation) to extend M2 reasoning; or direct
classification practice using quantity pairs (speed/velocity, temperature/wind velocity).

---

## SV-03 — The Treasure Map

### Identity

| Field | Value |
|---|---|
| Intervention ID | SV-03 |
| Title | The Treasure Map |
| Concept ID | phys.meas.scalars-vectors |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Analogy |
| Target Learner | Age 10–13, strong imagination, story-oriented learners |
| Difficulty | Beginner |
| CPA Stage | Representational |
| Bloom Level | Understand |
| Estimated Duration | 4–5 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Diagram — Recommended (even a crude hand-drawn circle around a tree amplifies the scenario dramatically) |
| Voice Requirement | Optional |
| Interaction Type | Story + Challenge |

### Pedagogical Metadata

**Why this strategy works:**
The treasure map encodes scalar and vector information in a spatially concrete,
emotionally engaging format. The consequence of missing direction is vivid and
personal — you can't find the treasure. The student experiences that direction
isn't added information; it's the difference between an answer and no answer.

**Mental model installed:**
"A vector without direction doesn't narrow down the answer — it gives you a whole
circle of equally-possible locations. Direction is what collapses infinite possibilities
into one. Removing direction from a vector quantity doesn't simplify — it makes the
measurement useless."

**Misconceptions prevented:** M4 — the treasure map makes ignoring direction produce
no answer, not a simplified answer. The circle-of-possibilities is the anti-M4 image.

**Misconceptions recovered:** M4 — when the student is treating direction as optional
decoration on a "real" magnitude, the circle image makes clear that the magnitude
alone gave them nothing actionable.

**Prerequisite knowledge assumed:** Basic spatial reasoning; familiar with the concept
of searching in a circle; no physics terminology required.

**Cognitive load:** Low — the story provides its own scaffolding; the circle versus point
contrast is visually natural.

### Teaching Script

"Imagine someone hides treasure and leaves you a note.

Note 1: 'The treasure is 50 paces from the old oak tree.'

Can you find it?

No — you'd have to walk in a circle around the tree covering every direction.
50 paces could be anywhere on that circle.

Note 2: 'The treasure is 50 paces north-east from the old oak tree.'

Can you find it now?

Yes. One answer. One place.

The distance — 50 paces — doesn't change between the two notes. But Note 2 gives
you a *direction*, and that direction makes all the difference between lost and found.

In physics, quantities that come with a built-in direction are called **vectors**.
Quantities that are just a number — no direction, like the 50 paces without 'north-east'
— are called **scalars**.

Here's the test: if you removed the direction from the measurement and it became
useless for telling you what to DO, it was a vector. If it still tells you everything
you need to know, it was a scalar.

Force is a vector — 'push 10 newtons' with no direction is useless. Which way?
Mass is a scalar — '5 kilograms' tells you everything. No direction needed."

### Key Insight

The direction is not decoration on a vector — it is *operative information* that
determines what happens. The treasure map makes 'operative' concrete: without the
direction, you can't act.

### Success Model

**Success signals:**
- Student says "Without the direction, 50 paces is useless — you'd be searching in a circle"
- Student generates the test independently: "if removing direction makes the measurement useless, it was a vector"
- Student transfers: "push 10 newtons — which way? So force is a vector."

**Failure signals:**
- Student says "I'd search near the tree and get lucky" — not feeling the mathematical impossibility
- Student says "You could use GPS to find it" — anachronistic thinking deflects the story
- Story is engaging but student cannot transfer the principle: "I see the map thing but what does that have to do with physics?"

### Recovery Graph

**If successful →** SV-04 (Two People, One Number) to install the prediction-failure
consequence of M4 and cement the operational importance of direction.

**If unsuccessful →** SV-05 (Three-Step Walk) — embodied experiment makes direction's
consequence physical rather than spatial-imaginative.

### Retrieval Tags

`first-explanation` `child` `teen` `imaginative-learner` `story-learner` `M4-recovery`
`voice-lesson` `classroom`

### AI Retrieval Notes

**When to choose:** Student is 10–13 and responds to narrative. Student has been told
the definition but treats direction as optional. Visual diagram of the circle is available.

**When to avoid:** Student is highly literal and resists analogical reasoning ("but treasure
maps aren't physics"). Student is 14+ and may find the scenario childish.

**Naturally followed by:** SV-04 (Two People, One Number) to test whether the M4 insight
generalises from spatial navigation to force prediction.

---

## SV-04 — Two People, One Number

### Identity

| Field | Value |
|---|---|
| Intervention ID | SV-04 |
| Title | Two People, One Number |
| Concept ID | phys.meas.scalars-vectors |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Visual Mental Picture |
| Target Learner | Any age; strongest for learners who think in scenes; strong recovery intervention |
| Difficulty | Beginner → Intermediate |
| CPA Stage | Concrete → Representational |
| Bloom Level | Understand → Apply |
| Estimated Duration | 4–6 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Diagram — Recommended (simple tug-of-war sketch cements the two-picture contrast) |
| Voice Requirement | Recommended — the prediction request and pause before revealing the answer are most effective live |
| Interaction Type | Demonstration (thought experiment with explicit prediction) |

### Pedagogical Metadata

**Why this strategy works:**
The student is asked to predict the outcome before being told. When the prediction is
wrong (most students say "20 newtons" for the opposite-direction case), the surprise
creates a memory anchor. The student has now *experienced* the consequence of ignoring
direction — not been told it. That experience is retrievable in future calculations
when they are tempted to add magnitudes without tracking direction.

**Mental model installed:**
"Two forces with the same number produce completely different physical outcomes when
their directions differ. Identical magnitudes, opposite results. The direction is not
a label on the force — it is the information that determines what physically happens.
I can't treat force as a number alone; the number is incomplete."

**Misconceptions prevented:** M4 — the two-picture contrast makes treating magnitude
as the complete description demonstrably wrong before any definition.

**Misconceptions recovered:** M4 — strongest single intervention for a student who is
correctly labelling quantities as vectors but then dropping direction from calculations.
The box-doesn't-move memory fires when they later try to add magnitudes as scalars.

**Prerequisite knowledge assumed:** Intuitive sense that forces can push in different
directions; no formal definition needed. The word "newtons" must be familiar enough
not to derail the intervention.

**Cognitive load:** Low — two pictures, one comparison, one question.

### Teaching Script

"Picture this.

Two people are standing outside your house. Each one is holding a rope attached
to a 10-kilogram box sitting on the ground.

One person stands to the left. One person stands to the right.

Each person pulls with exactly 10 newtons of force.

What happens to the box?"

*Let the student answer. Common wrong answer: 'it moves with 20 newtons.'*

"The box doesn't move at all. The two forces cancel each other out exactly.

Now change the picture. Both people stand on the SAME side — left. Both pull left
with 10 newtons.

What happens?"

*Student: 'The box moves left with 20 newtons.'*

"Right. Now both forces are the same number — 10 newtons — but the results are
completely different. In the first picture: no movement. In the second: movement.

What changed? Not the number. Not the unit. Only the *direction*.

This is why physicists cannot treat force as just a number. The direction carries
essential information — without it, you cannot predict what will happen.

A measurement that carries direction information is called a **vector**.
A measurement where you never need to know 'which way' is called a **scalar**."

### Key Insight

Two forces with identical numbers produce completely different physical outcomes
when their directions differ. This is the strongest possible demonstration that
direction is not a label — it is predictive information.

### Success Model

**Success signals:**
- Student correctly predicts the box doesn't move before being told (rare but definitive)
- Student is surprised and says "Oh — the direction is what determines what actually happens"
- Student generates a second example: "same thing with two people pushing a car from opposite sides"

**Failure signals:**
- Student is confused about why the forces cancel — lacks the prerequisite intuition about opposing pulls
- Student says "The box would wobble" — not grasping cancellation
- Student says "This is about forces, not scalars and vectors" — fails to generalise to the classification criterion

### Recovery Graph

**If successful →** Novel-quantity probe; then SV-06 (Sorting Game) to test whether
the criterion is now operative across a range of quantities.

**If unsuccessful →** SV-05 (Three-Step Walk) — more embodied, no force-cancellation
reasoning required; the student discovers direction consequences through their own movement.

### Retrieval Tags

`recovery` `second-explanation` `visual-learner` `teen` `adult` `classroom`
`M4-recovery` `voice-lesson` `prediction-failure`

### AI Retrieval Notes

**When to choose:** Student is getting calculation answers wrong by adding magnitudes
without tracking direction. Student has passed verbal understanding but is not using
direction operationally. Strong as second or third intervention.

**When to avoid:** Student has not yet encountered forces (may produce confusion about
cancellation before the scalar/vector distinction is clear). For very young learners,
the force-cancellation inference may be too abstract — use SV-05 instead.

**Naturally followed by:** Classification practice using force-specific examples;
or SV-06 (Sorting Game) to generalise the criterion beyond force.

---

## SV-05 — The Three-Step Walk

### Identity

| Field | Value |
|---|---|
| Intervention ID | SV-05 |
| Title | The Three-Step Walk |
| Concept ID | phys.meas.scalars-vectors |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Simple Experiment |
| Target Learner | Any age; primary for kinaesthetic/embodied learners; strong follow-up for any learner |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Apply |
| Estimated Duration | 5–8 min (physical); 3–5 min (narrated) |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Physical Demonstration — Recommended; narrated visualisation also works |
| Voice Requirement | Required (physical version) · Recommended (narrated version) |
| Interaction Type | Experiment |

### Pedagogical Metadata

**Why this strategy works:**
The student makes a concrete prediction (7 steps), physically tests it, and is
surprised by the result (5 steps). The gap between prediction and measurement creates
genuine curiosity — not a question the teacher asked, but one the student's own body
posed. This productive confusion motivates the explanation that follows.
The Pythagorean result is the proof that direction was not optional — scalar addition
gave the wrong answer.

**Mental model installed:**
"Distance is arithmetic on a path — you add the steps as you go. Displacement is a
straight line from start to finish, with a direction. These are different measurements
of the same journey. They agree only when the path is straight. The Pythagorean
result (7 walked ≠ 5 from start) is not a coincidence — it's what happens when
you track direction properly and scalar-addition doesn't apply."

**Misconceptions prevented:** M3 — experiencing direction as "which way the path bends"
rather than "which way the arrow points" dissolves the idea that direction is an
absolute cosmetic label on a quantity.

**Misconceptions recovered:** M3 — when the student can't use signed directions in
calculations because they treat direction as "forward/backward" rather than as a
component of how numbers combine, the walk produces the felt experience of direction
mattering to the *result*, not just the *label*.

**Prerequisite knowledge assumed:** Can count steps; has intuitive sense of "how far
from where I started." No prior physics required.

**Cognitive load:** Very low for the physical action; the productive surprise generates
intrinsic motivation for the explanation.

### Teaching Script

"Stand up. We're going to measure two things: how far you walked, and where you
ended up.

Step 1: Walk 3 steps north. Stop.
Step 2: Walk 4 steps east. Stop.

Before I ask you anything — how far from where you started are you?

*Let them guess. Most will say 7 steps.*

Now walk in a straight line back to where you started and count.

*They count: 5 steps.*

How many steps did you walk total? Seven. How far are you from where you started? Five.

Those are two different questions — and they have two different answers.

The total distance you walked — 7 steps — is called a **scalar quantity**. It's just
a number. You add it up as you go.

The straight-line distance from start to finish — 5 steps, in a specific direction
— is called **displacement**, and it's a **vector quantity**. You can't find it by
adding up the individual steps as numbers. You have to account for direction at every step.

The fact that you walked 3 north then 4 east — and ended up 5 steps away on a diagonal
— that's the Pythagorean theorem, and it works because displacement is a vector.
If you had added 3 + 4 as scalars, you'd have gotten 7, which is wrong.

That's the difference between scalars and vectors in one walk."

### Key Insight

The same physical journey produces two different numbers depending on whether you
track direction (displacement, a vector) or don't (distance, a scalar). Both numbers
are real. They answer different questions. This is not a naming convention — it's a
computational difference with practical consequences.

### Success Model

**Success signals:**
- Student is genuinely surprised that 7 walked ≠ 5 from start
- Student says "Oh — because I changed direction in the middle, so you can't just add"
- Student states the distinction: "Distance is total path; displacement is where I actually ended up"

**Failure signals:**
- Student says "I already knew it would be 5 because of Pythagoras" — no productive surprise; they already have this knowledge
- Student is disoriented by north/east and cannot execute the experiment
- Student says "So which one is the 'real' distance?" — confused about why two measurements of the same trip exist

### Recovery Graph

**If successful →** Displacement calculation problems (numeric, not just narrative);
then SV-07 or SV-06 to generalise the criterion beyond distance/displacement.

**If unsuccessful →** SV-01 (Incomplete Sentence) — student needs a language-based
entry point rather than an embodied one.

### Retrieval Tags

`first-explanation` `kinaesthetic-learner` `child` `teen` `experiment` `classroom`
`voice-lesson` `M3-recovery` `follow-up` `physical-activity`

### AI Retrieval Notes

**When to choose:** Student learns by doing; classroom or live session where movement
is possible. Student understands the verbal definition but doesn't use direction in
calculations. Narrated version works for any session type.

**When to avoid:** Student already knows the Pythagorean theorem deeply and won't be
surprised. Session is purely asynchronous text-only with no visualisation capability.

**Naturally followed by:** Numeric displacement problems (3 m north, 4 m east: find
displacement magnitude and direction); then SV-06 to test the criterion on non-spatial quantities.

---

## SV-06 — The Sorting Game

### Identity

| Field | Value |
|---|---|
| Intervention ID | SV-06 |
| Title | The Sorting Game |
| Concept ID | phys.meas.scalars-vectors |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Guided Discovery |
| Target Learner | Any age; primary for curious, self-directed, discussion-oriented learners |
| Difficulty | Beginner |
| CPA Stage | Abstract |
| Bloom Level | Analyze |
| Estimated Duration | 6–10 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | None — or list of quantities on a whiteboard/screen |
| Voice Requirement | Recommended — discussion is the mechanism |
| Interaction Type | Challenge |

### Pedagogical Metadata

**Why this strategy works:**
The student arrives at the criterion themselves. A learner who generates their own
rule owns it — they cannot forget something they discovered, only something they were
told. The open-ended sorting challenge also reveals which classification errors the
student makes naturally, giving the teacher direct diagnostic information.

**Mental model installed:**
"The scalar/vector criterion is a real distinction in nature — not a label physicists
invented. I found the rule myself from the quantities. The names 'scalar' and 'vector'
are the physicists' names for the groups I made."

**Misconceptions prevented:** M1 — experiencing that the criterion generates the list
(rather than the list being the content) makes list-recall structurally impossible.
The student classified things *before* knowing the names.

**Misconceptions recovered:** M1 — the strongest intervention for a student who has
been recalling from lists. Forces the student to reason from first principles rather
than retrieve.

**Prerequisite knowledge assumed:** Can name common physical quantities and has
sufficient familiarity with each to consider whether it needs a direction. Some
exposure to physics vocabulary (force, velocity, mass, etc.) is needed.

**Cognitive load:** Medium — open-ended task with no scaffolded right/wrong signal.
Active reasoning required throughout. Not suitable as a zero-knowledge first contact.

### Teaching Script

"I'm going to give you eight physical measurements. Your job is to sort them into
two groups. I'm not going to tell you what the groups are. You decide.

Here are the measurements:

- Temperature: 25°C
- Force: 30 newtons
- Mass: 2 kilograms
- Velocity: 15 m/s
- Energy: 500 joules
- Displacement: 10 metres
- Time: 60 seconds
- Weight: 20 newtons

Take a moment. Sort them into two groups. Any groups you like. What matters is that
every measurement in one group shares something that the measurements in the other
group don't.

*Give the student time. Most land close to the right answer by instinct.*

Tell me your two groups and the rule you used.

*Listen. Common criteria: 'ones with arrows' / 'ones that move' / 'ones that need a direction.'*

Now I want to test your rule. Take force. If I say 'I'm pushing this box with 30 newtons'
— does that tell you everything? Can you predict what happens to the box?

*Prompt them to notice: no, you don't know which way the force is pushing.*

What about mass? 'This box has a mass of 2 kilograms.' Does that tell you everything
you need to know about the mass?

*Yes — mass doesn't have a 'which way.'*

So your rule — whatever it was — was it something like: 'some measurements need a
direction and some don't'?

*Confirm. Then:*

Physicists found the same distinction. They named the two groups **scalars** (no
direction needed) and **vectors** (direction is part of the measurement). The names
are yours now — because you found the rule first."

### Key Insight

The criterion "does this need a direction?" is discoverable by a twelve-year-old
from first principles. That means it is a *real distinction in nature*, not an
arbitrary label assigned by physicists. The student who discovers it owns it.

### Success Model

**Success signals:**
- Student generates the direction criterion spontaneously without prompting
- Student can defend their classification when challenged ("why did you put velocity there?")
- Student says "So I can figure out any new quantity — I don't need to remember a list"

**Failure signals:**
- Student groups by intuition but cannot state any rule
- Student says "I don't know enough physics to sort these" — insufficient prerequisite knowledge
- Student generates the wrong criterion ("ones that have units in metres") and defends it even when the force-test reveals it fails

### Recovery Graph

**If successful →** Test with five novel quantities not in the game (power, impulse,
electric field, pressure, magnetic flux). If the student can classify all five using
the criterion, mastery is operative. Advance to mastery gate.

**If unsuccessful →** SV-01 (Incomplete Sentence) — provide the criterion directly
via a concrete scenario rather than through open discovery.

### Retrieval Tags

`first-explanation` `second-explanation` `curious-learner` `teen` `adult` `self-directed`
`discussion-learner` `M1-recovery` `classroom` `voice-lesson` `criterion-test`

### AI Retrieval Notes

**When to choose:** Student has just received any other explanation and can state the
names but hasn't proven the criterion is operative. Excellent criterion-test after
any prior intervention succeeds. Also strong as a first explanation for curious,
analytically-inclined students who prefer to discover over being told.

**When to avoid:** Student has minimal physics vocabulary and will not be able to
reason about whether "500 joules" needs a direction. Use SV-01 or SV-10 first.

**Naturally followed by:** Novel-quantity classification probe (five quantities not in
the game). If the student can classify all five with justification → mastery gate.

---

## SV-07 — The Interrogation

### Identity

| Field | Value |
|---|---|
| Intervention ID | SV-07 |
| Title | The Interrogation |
| Concept ID | phys.meas.scalars-vectors |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Socratic Dialogue |
| Target Learner | Age 14+; analytical students; students who claim to already know this |
| Difficulty | Intermediate |
| CPA Stage | Abstract |
| Bloom Level | Analyze → Evaluate |
| Estimated Duration | 5–8 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | None |
| Voice Requirement | Required — the dynamic is entirely verbal; pausing is the mechanism |
| Interaction Type | Dialogue |

### Pedagogical Metadata

**Why this strategy works:**
The Socratic method exposes what the student does not know without telling them they
are wrong. The student discovers the gap in their own understanding by being asked to
act on their claim. The intersection scenario makes the incompleteness of "60 km/h"
personally consequential — the student realises they gave an answer that couldn't
actually keep anyone safe.

**Mental model installed:**
"Velocity without direction is not a simpler version of velocity — it's incomplete
information. I proved this to myself by trying to use it. The criterion is not a rule
I was given; it's something I derived by testing whether my own answer was sufficient."

**Misconceptions prevented:** M2 — the velocity/speed distinction is made vivid by
the student experiencing the gap in their own answer about the car.

**Misconceptions recovered:** M2 — directly probes the student's conflation by asking
them to complete the velocity description and making clear what information is missing
and why it matters.

**Prerequisite knowledge assumed:** Can make and defend a claim; has sufficient
metacognitive ability to reflect on their own answers; familiar enough with velocity
in everyday life to give an initial answer.

**Cognitive load:** Medium-High — requires metacognitive awareness (examining one's
own answers for sufficiency). Not suitable for anxious or low-confidence learners.

### Teaching Script

"Tell me: what is the velocity of a car?"

*Student likely says something like '60 km/h' or 'fast.'*

"60 km/h. Is that everything I need to know about the car's velocity?"

*Student: probably 'yes.'*

"I'm standing at an intersection. The car is 200 metres away, moving at 60 km/h.
Am I in danger?"

*Student: 'it depends which way it's going.'*

"Interesting. So 60 km/h wasn't everything you needed to know."

*Pause.*

"What was missing?"

*Student: 'the direction.'*

"Right. Now: what is the temperature in this room?"

*Student: '22 degrees' or similar.*

"Is that everything I need to know about the temperature?"

*Student: 'yes.'*

"There's no direction I need to specify? No 'which way is the 22 degrees going'?"

*Student: 'No, temperature doesn't have a direction.'*

"So temperature tells you everything with just one number. Velocity doesn't —
you need two pieces of information: how fast, and which way.

Do you notice that these are fundamentally different kinds of measurement?

One is complete with a number. The other requires a number plus a direction.

Physics has a name for each kind. But before I tell you the names — what would
YOU call them? If you were a physicist inventing the language, what would you call
a 'complete-with-just-a-number' measurement versus a 'needs-a-direction-too' measurement?"

*Let the student invent names. Then:*

"Physicists call them **scalars** and **vectors**. Same distinction you just made.
Different names."

### Key Insight

The student who reaches the conclusion through their own reasoning — not through
being told — has a fundamentally different relationship with the concept. They have
now experienced that the criterion is *necessary*, not arbitrary.

### Success Model

**Success signals:**
- Student spontaneously corrects their own answer: "Actually, 60 km/h isn't complete — I'd need to say north or towards the junction"
- Student invents their own names for the two categories before being given the words
- Student says "I thought I knew what velocity meant and I actually didn't"

**Failure signals:**
- Student becomes defensive or anxious when questioned ("you're confusing me on purpose")
- Student cannot generate the missing information even when told "something is missing"
- Student says "OK, velocity needs direction" but gives no reason — rote compliance, not understanding

### Recovery Graph

**If successful →** Novel-quantity probe ("Is power a scalar or vector? Reason it out.");
then SV-06 (Sorting Game) to test criterion across multiple quantities.

**If unsuccessful →** SV-04 (Two People, One Number) — needs a concrete visual
demonstration of the consequence; the abstract verbal approach didn't suit this student.
Then SV-02 (Weather Forecast) to ground M2 in familiar observation.

### Retrieval Tags

`first-explanation` `teen` `adult` `analytical-learner` `high-confidence`
`confident-student` `voice-lesson` `classroom` `M2-recovery` `Socratic`

### AI Retrieval Notes

**When to choose:** Student says "I already know what vectors are" at the start of
the session — use this to find out. Student is 14+ and responds to intellectual
challenge. Student has good metacognitive awareness and won't feel attacked by being
questioned.

**When to avoid:** Low-confidence or anxious student — being questioned on claims can
feel threatening. Student under 13 — metacognitive demands are too high. Text-only
session where conversational pausing is ineffective.

**Naturally followed by:** SV-06 (Sorting Game) to verify the criterion is operative;
or direct novel-quantity classification.

---

## SV-08 — The Ship's Navigator

### Identity

| Field | Value |
|---|---|
| Intervention ID | SV-08 |
| Title | The Ship's Navigator |
| Concept ID | phys.meas.scalars-vectors |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Historical Discovery |
| Target Learner | Age 13+; history-minded, contextually-motivated learners; adult learners |
| Difficulty | Intermediate |
| CPA Stage | Representational → Abstract |
| Bloom Level | Understand → Analyze |
| Estimated Duration | 5–7 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Diagram — Optional (a chart with three bearing lines transforms the story dramatically; works without) |
| Voice Requirement | Optional |
| Interaction Type | Story |

### Pedagogical Metadata

**Why this strategy works:**
The scalar/vector distinction was not invented by mathematicians — it was forced on
navigators by necessity. When the student learns that the distinction solved real
problems that killed people when ignored, the concept acquires a weight that
"it will appear on your exam" cannot provide. Historical necessity is the strongest
possible answer to "why does this matter?"

**Mental model installed:**
"The vector concept was discovered by necessity, not invented by physics professors.
Three numbers without bearings are useless at sea. Three numbers with bearings give
a precise position. The same is true of every force, velocity, and displacement in
physics. The direction was always part of the measurement — navigators just named it
before physicists did."

**Misconceptions prevented:** M4 — in the navigator's log, direction is not decoration
on the distance sailed; it is literally the information that makes the distance useful.
Without bearings, the three numbers tell you nothing about where the ship is.

**Misconceptions recovered:** M4 — when the student treats direction as supplemental
to the "real" magnitude, the navigator story makes clear that the magnitude with no
bearing was useless for centuries.

**Prerequisite knowledge assumed:** Basic compass directions; understanding that ships
navigate by tracking position; some appreciation that historical problems motivated
scientific language.

**Cognitive load:** Low-Medium — the narrative is self-supporting; the log comparison
is the key mechanism.

### Teaching Script

"Before GPS, before radio, the only way a ship's navigator could know where they were
was by tracking every leg of the journey from the last known position.

The navigator's log might read:

  Day 1: 120 nautical miles.
  Day 2: 80 nautical miles.
  Day 3: 200 nautical miles.

Total: 400 miles sailed.

Now: where is the ship?

Somewhere within 400 miles of the start point. That's all you know. You can't plot
a position. You can't find land. You can't calculate how many days to port.
400 miles is useless information for navigation.

The navigator's actual log read:

  Day 1: 120 nautical miles, bearing 045° (north-east).
  Day 2: 80 nautical miles, bearing 090° (due east).
  Day 3: 200 nautical miles, bearing 135° (south-east).

Now the navigator could draw each leg on a chart and find the ship's position exactly.

The same three numbers — 120, 80, 200 — meant nothing for navigation as distances alone.
With bearings, they became a precise position.

Navigators discovered this practically, centuries before physicists named it.

The distance sailed each day: a quantity that adds as a simple number. We now call
it a **scalar** — complete with just a magnitude.

The displacement each day — distance plus bearing: a quantity that requires direction
to be useful. We now call it a **vector**.

Every force, every velocity, every displacement in physics is a vector for exactly
the same reason the navigator needed bearings. The direction carries *information that
changes the outcome*."

### Key Insight

The scalar/vector distinction was forced on humans by the physical world, not invented
by physicists. Navigation, engineering, and artillery all independently required the
concept. Physics formalised something that necessity had already discovered.

### Success Model

**Success signals:**
- Student says "So 400 miles with no bearing is literally useless — you know nothing about where you are"
- Student transfers: "Same as force — 50 newtons with no direction tells me nothing about what moves"
- Student asks "Did physicists learn from navigators?" — historically engaged and reasoning beyond the content

**Failure signals:**
- Student is unfamiliar with maritime navigation and cannot visualise the problem
- Student says "They should have just used GPS" — anachronistic thinking blocks the story
- Student says "Interesting story but I still don't see how it applies to physics problems" — fails to transfer

### Recovery Graph

**If successful →** Displacement calculation practice; or SV-07 (Interrogation) to
test whether M2 (speed/velocity) is also resolved.

**If unsuccessful →** SV-04 (Two People, One Number) — needs an immediate visual
prediction failure rather than a narrative historical argument.

### Retrieval Tags

`second-explanation` `adult` `teen` `history-minded` `contextually-motivated`
`M4-recovery` `self-study` `curious-learner` `why-does-this-matter`

### AI Retrieval Notes

**When to choose:** Student has asked "why does physics need these words?" or "when
will I use this?" Student responds to context and motivation. Adult learner who
has not been in a physics classroom for years and needs a non-textbook entry point.

**When to avoid:** Student under 13 and unfamiliar with navigation. Student who
resists stories and wants mathematical treatment immediately.

**Naturally followed by:** Displacement problems; or SV-09 (Structural Engineer) to
extend the historical-necessity argument into a modern professional context.

---

## SV-09 — The Structural Engineer

### Identity

| Field | Value |
|---|---|
| Intervention ID | SV-09 |
| Title | The Structural Engineer |
| Concept ID | phys.meas.scalars-vectors |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Engineer's Perspective |
| Target Learner | Age 14+; technically-minded learners; students aiming for engineering or applied science |
| Difficulty | Intermediate |
| CPA Stage | Abstract → Transfer |
| Bloom Level | Apply → Analyze |
| Estimated Duration | 5–7 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | Diagram — Recommended (bridge cross-section with force arrows from different directions transforms the scenario) |
| Voice Requirement | Optional |
| Interaction Type | Demonstration (professional scenario) |

### Pedagogical Metadata

**Why this strategy works:**
Engineers deal with forces on structures daily. The bridge scenario makes treating
a vector as a scalar not an abstract error but a professional failure with physical
consequences. The student can identify with the engineer role and experience the
inadequacy of magnitude-only information at a professional level.

**Mental model installed:**
"In engineering, ignoring direction doesn't produce a simpler problem — it produces
the wrong problem entirely. 50,000 newtons with no direction doesn't let me start
the design; it tells me only the worst-case size, not where to put the steel.
Every force, velocity, and displacement in physics requires direction for exactly
the same reason: direction determines what happens."

**Misconceptions prevented:** M4 — direction is not an annotation on the force; it
is the information that determines the entire structural response.

**Misconceptions recovered:** M4 — for the student who is correctly identifying
quantities as vectors but then dropping direction from calculations, the bridge
story provides the professional consequence of exactly that error.

**Prerequisite knowledge assumed:** Some sense of how structures support loads;
sufficient motivation from engineering or applied contexts. The word "newtons" must be
familiar. Not suitable for students with zero physics or engineering context.

**Cognitive load:** Low-Medium — professional context is intrinsically motivating for
the target learner; the bridge is a universal reference.

### Teaching Script

"You're a structural engineer. You're designing a bridge.

The wind load specification says: maximum wind force 50,000 newtons.

Question: is that enough information to design the bridge?

Think about it — does it matter which direction the wind comes from?

Of course. Wind hitting the side of the bridge is a completely different engineering
problem from wind hitting the front. The bridge needs different reinforcements in
different directions. A force from above loads the deck; a force from the side loads
the towers; a force at an angle does something different again.

50,000 newtons tells you the size of the problem. It doesn't tell you *where to
put the steel*.

Now compare: the total weight of the deck — let's say 2,000,000 kilograms.

Does the direction of the mass matter for your calculations?

No — mass is mass. It doesn't point anywhere. You don't need to know the direction
of 'heaviness.' The number is the complete specification.

Engineers discovered that physical quantities split into two types:

Type 1 — fully specified by a number. Mass, temperature, energy, time.
You can do all your calculations with the number alone.

Type 2 — requires a number AND a direction. Force, velocity, displacement, acceleration.
Without the direction, you cannot solve any real problem.

Physics calls Type 1 **scalars** and Type 2 **vectors**.

A structural engineer who ignores the direction of a force and treats it as a
scalar will design a bridge that falls down in the wrong wind. This has happened.
This is why the distinction exists."

### Key Insight

The failure mode of treating vectors as scalars is not a mathematical error — it is
a *prediction failure*. The engineer who ignores direction builds the wrong thing.
The physicist who ignores direction gets the wrong answer. The distinction is grounded
in the difference between predictions that work and predictions that don't.

### Success Model

**Success signals:**
- Student says "So 50,000 newtons with no direction is actually LESS useful than it looks — I can't start the design"
- Student generates a second engineering case: "same with a building — roof load vs. side load are completely different"
- Student states the consequence: "treating a force as a scalar gives you the wrong structure"

**Failure signals:**
- Student is not motivated by engineering and cannot identify with the scenario
- Student says "Engineers just use safety margins, so direction doesn't matter as much"
- Student says "I understand the engineering part but what does this have to do with scalars and vectors?"

### Recovery Graph

**If successful →** Advance directly to force problems where direction is operationally
required; or SV-06 (Sorting Game) to verify the criterion generalises beyond force.

**If unsuccessful →** SV-04 (Two People, One Number) — simpler visual,
same M4 target, no engineering context required; direct prediction test.

### Retrieval Tags

`first-explanation` `second-explanation` `teen` `adult` `technical-learner`
`aspiring-engineer` `M4-recovery` `self-study` `why-does-this-matter` `applied-physics`

### AI Retrieval Notes

**When to choose:** Student has expressed interest in engineering or applied science.
Student has asked "when will I use this in real life?" Student is getting force
calculations right in classification but wrong in application (dropping direction).

**When to avoid:** Student has no engineering or applied-science interest and will not
identify with the professional scenario. Student under 14 for whom the bridge design
context is too removed from their experience.

**Naturally followed by:** Force calculation problems with direction; or SV-08
(Ship's Navigator) to add the historical-necessity dimension.

---

## SV-10 — Hot and Cold Don't Point

### Identity

| Field | Value |
|---|---|
| Intervention ID | SV-10 |
| Title | Hot and Cold Don't Point |
| Concept ID | phys.meas.scalars-vectors |
| Version | 1.0 |

### Teaching Metadata

| Field | Value |
|---|---|
| Teaching Strategy | Child-friendly Explanation |
| Target Learner | Age 8–12 (primary); anxious adult beginners (secondary) |
| Difficulty | Beginner |
| CPA Stage | Concrete |
| Bloom Level | Remember → Understand |
| Estimated Duration | 3–5 minutes |

### Delivery Metadata

| Field | Value |
|---|---|
| Visual Requirement | None |
| Voice Requirement | Recommended — the ball-throw mime is most effective live |
| Interaction Type | Story + Question |

### Pedagogical Metadata

**Why this strategy works:**
Warmth and thrown balls are among the earliest physical experiences a child has.
The contrast between "hot is just everywhere" (no direction) and "a ball has a
direction and you can't catch it without knowing which way" is pre-conceptual —
the child has already felt both sides of the distinction in their body. Physics
is naming an already-known difference.

**Mental model installed:**
"Hot is just a number. A thrown ball has a direction. These are different kinds of
experiences and different kinds of measurements. My own body already knows the
difference. Physics has names for the two kinds: scalar and vector."

**Misconceptions prevented:** M1 — the criterion ("does it have a direction it's
pointing?") is installed as a *test*, not a list. The student ends with a question
to ask, not a category to remember.

**Misconceptions recovered:** M1 — the deepest recovery intervention; suitable for
a student who is completely lost and needs the simplest possible re-entry point.
Also the prerequisite-gap indicator: if this fails, the issue is not scalar/vector
knowledge but the foundation concept (`phys.meas.units`).

**Prerequisite knowledge assumed:** None beyond basic sensory experience (feeling
heat, throwing and catching objects). No physics vocabulary required.

**Cognitive load:** Minimal — two maximally familiar, maximally contrasted scenarios.

### Teaching Script

"I want to ask you something strange.

If this room is hot — can you tell me which way the hot is coming from?

*Let them think.*

The room is just... hot, right? Hot everywhere. The hot isn't pointing anywhere.
It's just a number — 35 degrees, or 22 degrees, or whatever. You can write the
temperature with one number and that's everything. Done.

Now: imagine I throw you a ball.

*Mime throwing a ball.*

Can you tell which way it's going?

Yes! It has a direction. If you don't know the direction, you can't catch it.
'The ball is moving at 5 metres per second' — does that help you catch it?

Not without knowing which way it's heading.

Hot and cold are one kind of thing in physics. Just numbers. No direction needed.

A thrown ball is another kind of thing. You need the number AND the direction.

Hot and cold belong to a group physicists call **scalars**. A scalar is anything
where one number gives you the complete picture.

The ball's velocity belongs to a group called **vectors**. A vector always needs
two things: how much, and which way.

Here's your test for anything: ask yourself 'does this have a direction it's
pointing?' If yes — vector. If no — scalar.

Temperature: does it point? No. Scalar.
Force: does it point? Yes — I can push you left or right. Vector.
Mass: does it point? No. Scalar.
Displacement: does it point? Yes — I moved north. Vector."

### Key Insight

The most fundamental sensory experiences a child has — warmth has no direction,
a thrown object always has one — are already a perfect model of the scalar/vector
distinction. Physics is naming what the body already knows.

### Success Model

**Success signals:**
- Student nods or says "Oh — temperature just IS, it doesn't point. A ball's direction matters."
- Student applies the test unprompted to a new quantity: "So force points — it's a vector. Temperature doesn't — it's a scalar."
- Student says "That's much simpler than I thought"

**Failure signals:**
- Student says "But heat does come from somewhere — like the sun" — conflates the heat source with the quantity
- Student says "The ball's speed matters too, not just direction" — introduces M2 rather than resolving M1
- Student is anxious and cannot commit to the test even after seeing the worked examples

### Recovery Graph

**If successful →** SV-06 (Sorting Game) — test whether the criterion is now
operative on novel quantities not used in this intervention.

**If unsuccessful →** Prerequisite check. If a student cannot engage with this
intervention, the issue is likely not scalar/vector knowledge — it is that
`phys.meas.units` (physical quantities and their measurement) is not yet secure.
Do not re-attempt this concept; address the prerequisite first.

### Retrieval Tags

`first-explanation` `recovery-from-zero` `child` `anxious-adult` `low-confidence`
`M1-recovery` `voice-lesson` `classroom` `self-study` `zero-prior-knowledge`
`prerequisite-check-on-failure`

### AI Retrieval Notes

**When to choose:** Student is 8–12. Student is anxious or has expressed difficulty
with physics before. Student has failed one or more other interventions and needs
re-entry at the simplest possible level. Default second attempt after SV-01 fails.

**When to avoid:** Student is 14+ and has basic physics vocabulary — the scenario
may feel too simple and produce disengagement. Student who explicitly wants a
mathematical or technical explanation.

**Naturally followed by:** SV-06 (Sorting Game) to test whether the criterion is
operative; or simple classification questions using the test ("does this point?").
If this intervention fails, check `phys.meas.units` before retrying `phys.meas.scalars-vectors`.

---

## Teaching Decision Graph

### Intervention Index

| ID | Title | Strategy | CPA | Bloom | Duration | Primary Misconception |
|---|---|---|---|---|---|---|
| SV-01 | The Incomplete Sentence | Everyday Life Story | Concrete | Understand | 3–5 min | M1 |
| SV-02 | The Weather Forecast | Real-world Observation | Concrete→Rep | Understand | 4–6 min | M2 |
| SV-03 | The Treasure Map | Analogy | Representational | Understand | 4–5 min | M4 |
| SV-04 | Two People, One Number | Visual Mental Picture | Concrete→Rep | Understand→Apply | 4–6 min | M4 |
| SV-05 | The Three-Step Walk | Simple Experiment | Concrete | Apply | 5–8 min | M3 |
| SV-06 | The Sorting Game | Guided Discovery | Abstract | Analyze | 6–10 min | M1 |
| SV-07 | The Interrogation | Socratic Dialogue | Abstract | Analyze→Evaluate | 5–8 min | M2 |
| SV-08 | The Ship's Navigator | Historical Discovery | Rep→Abstract | Understand→Analyze | 5–7 min | M4 |
| SV-09 | The Structural Engineer | Engineer's Perspective | Abstract→Transfer | Apply→Analyze | 5–7 min | M4 |
| SV-10 | Hot and Cold Don't Point | Child-friendly | Concrete | Remember→Understand | 3–5 min | M1 |

### Recovery Graph — Complete

| If this intervention fails → | Try next |
|---|---|
| SV-01 | SV-10 (simpler sensory entry) · then SV-06 (generate criterion) |
| SV-02 | SV-01 (language-based entry) · or SV-10 (younger learner) |
| SV-03 | SV-05 (embodied, not spatial-imaginative) · then SV-04 |
| SV-04 | SV-05 (embodied; no force-cancellation reasoning required) |
| SV-05 | SV-01 (language-based entry point instead of embodied) |
| SV-06 | SV-01 (provide criterion directly; discovery approach failed) |
| SV-07 | SV-04 (concrete visual consequence) · then SV-02 (ground M2) |
| SV-08 | SV-04 (immediate visual; historical story didn't transfer) |
| SV-09 | SV-04 (same M4 target, no engineering context required) |
| SV-10 | Prerequisite check — address `phys.meas.units` before retrying |

### Misconception → Intervention Map

| Active Misconception | Primary | Secondary | Tertiary |
|---|---|---|---|
| M1 — list-recall | SV-01 · SV-10 · SV-06 | — | — |
| M2 — speed = velocity | SV-02 · SV-07 | — | — |
| M3 — direction absolute | SV-05 | — | — |
| M4 — magnitude-only | SV-03 · SV-04 · SV-08 · SV-09 | — | — |
| None detected | SV-01 (default) · SV-10 (young/anxious) | SV-06 (curious) | — |

### Starting Intuition Map (no two interventions share an entry point)

| Intervention | Starting Intuition |
|---|---|
| SV-01 | Incompleteness of language |
| SV-02 | Daily information consumption |
| SV-03 | Spatial navigation |
| SV-04 | Physical prediction failure |
| SV-05 | Embodied measurement |
| SV-06 | Self-generated classification |
| SV-07 | Interrogating what you already said |
| SV-08 | Historical professional necessity |
| SV-09 | Engineering design consequence |
| SV-10 | Most primitive sensory experience |

### Retrieval Tag Index

| Tag | Interventions |
|---|---|
| `first-explanation` | SV-01, SV-02, SV-03, SV-05, SV-06, SV-07, SV-09, SV-10 |
| `recovery` | SV-04 |
| `second-explanation` | SV-04, SV-06, SV-08, SV-09 |
| `recovery-from-zero` | SV-10 |
| `M1-recovery` | SV-01, SV-06, SV-10 |
| `M2-recovery` | SV-02, SV-07 |
| `M3-recovery` | SV-05 |
| `M4-recovery` | SV-03, SV-04, SV-08, SV-09 |
| `child` (8–12) | SV-01, SV-03, SV-05, SV-10 |
| `teen` (12–18) | SV-01–SV-09 |
| `adult` | SV-02, SV-04, SV-07, SV-08, SV-09, SV-10 |
| `low-confidence` | SV-01, SV-10 |
| `high-confidence` | SV-07 |
| `voice-lesson` | SV-01, SV-03, SV-04, SV-05, SV-06, SV-07, SV-10 |
| `classroom` | SV-01, SV-04, SV-05, SV-06, SV-07, SV-10 |
| `self-study` | SV-02, SV-06, SV-08, SV-09, SV-10 |
| `kinaesthetic-learner` | SV-05 |
| `visual-learner` | SV-02, SV-04 |
| `analytical-learner` | SV-06, SV-07 |
| `curious-learner` | SV-06, SV-08 |
| `technical-learner` | SV-09 |
| `aspiring-engineer` | SV-09 |
| `criterion-test` | SV-06 |
| `prerequisite-check-on-failure` | SV-10 |
| `zero-prior-knowledge` | SV-01, SV-10 |

---

## Authoring Notes — v2.0 Standard

This file is the canonical implementation of the Teaching Content Library v2.0 format.
The metadata structure here is the permanent standard for every future TCL asset.

**What makes this format a decision graph, not a list:**

Every intervention knows:
1. Its own identity and teaching metadata
2. What it is doing pedagogically (mental model, prerequisite knowledge, cognitive load)
3. What success and failure look like (concrete observable signals)
4. Where to route next in both cases (never loops, always progresses)
5. Its retrieval tags for AI selection
6. When it should be chosen and when it should be avoided

**The non-duplication invariant:**
No two interventions share a starting intuition. When one fails, the next candidate
addresses the same concept from a different root. The Teaching Engine navigating this
graph never repeats the same mental model — only the same destination.

**The prerequisite-check rule:**
If SV-10 fails (the simplest possible intervention), the issue is the prerequisite
concept (`phys.meas.units`), not this concept. The Teaching Engine must route to
the prerequisite rather than continuing to attempt interventions for this concept.

---

*CANDIDATE ASSETS — pending integration into `docs/curriculum/blueprints/phys.meas.scalars-vectors.md`*  
*All assets grounded in EB Concept Entry v1.0 misconception library and explanation library.*  
*Teaching scripts unchanged from v1.0. All metadata added in v2.0 upgrade.*  
*This format is the permanent Teaching Content Library standard for all future Physics concepts.*
