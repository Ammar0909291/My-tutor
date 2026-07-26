# Unit Rate — `math.arith.unit-rate`

## Identity

- **Concept ID**: `math.arith.unit-rate` (canonical mathematics KG)
- **Curriculum location**: mathematics / arithmetic — child of
  `math.arith.ratios` (no children in KG)
- **Prerequisites**: `math.arith.ratios` (a unit rate is a special
  case of a ratio whose denominator is 1).
- **Unlocks**: none in KG.
- **Related** (from KG): `math.arith.proportion`.
- **Difficulty**: developing · **Bloom**: apply · **Mastery
  threshold**: 0.85 · **Est. hours**: 3
- **Blueprint**: none exists at `docs/curriculum/blueprints/
  math.arith.unit-rate.md` (verified via directory listing).
  Misconceptions below authored directly via the birth-taxonomy
  diagnostic procedure (`educational-brain/misconceptions/
  01-birth-types.md`).
- **Aliases** (from KG): "rate per unit", "unit price".

## Learning Objective

The learner can: define a unit rate as a ratio whose denominator is 1,
expressing the amount of one quantity per single unit of another
(e.g., km/h, price per kg); correctly compute a unit rate from a given
ratio by dividing to reduce the denominator to 1, keeping the correct
quantity in the numerator; and correctly use unit rates to compare
different-sized quantities on a common footing (e.g., comparing two
differently-sized packages by price-per-unit rather than total price).

## Core Understanding

A unit rate is a ratio a/b in which b, the denominator, has been
reduced to exactly 1 — expressing "how much of quantity A corresponds
to exactly ONE unit of quantity B." Computing a unit rate means
dividing the numerator quantity by the denominator quantity: if a car
travels 150 km in 3 hours, the unit rate is 150÷3 = 50 km per 1 hour
(50 km/h). Unit rates are the single most useful form of a ratio for
COMPARISON, because reducing every rate to "per one unit" puts
different-sized quantities on directly comparable footing — a 500g
jar priced at $4 (unit rate: $0.008/g) can be compared directly against
a 750g jar priced at $5.25 (unit rate: $0.007/g) even though the total
prices and package sizes differ. The word "unit" in "unit rate" refers
to the NUMBER one (a single unit of the denominator quantity), not to
a "unit of measurement" in the sense of meters or kilograms.

## Mental Models

- **Beginner model — "unit rate always means something per hour, like
  speed"**: the learner has generalized from the most common
  introductory example (km/h, miles/h) to believe unit rate
  specifically means a rate measured against time, missing that "per
  single unit of ANY quantity" is the general definition (price per
  kg, calories per serving, students per classroom are all equally
  valid unit rates). Shelf-life warning: this model produces correct
  answers on speed problems while failing on price-per-unit or
  density-style problems, delaying detection.
- **Intermediate model — "unit rate means reducing the denominator to
  1, and I can do this correctly for time-based and quantity-based
  rates alike, but I sometimes place the wrong quantity in the
  numerator"**: the learner correctly generalizes beyond time-based
  rates but occasionally computes distance/time when the question asks
  for time/distance (or price/weight when the question asks for
  weight/price), producing a numerically valid but differently-shaped
  answer than intended. Upgrade trigger: being asked to compute BOTH
  "price per kg" and "kg per dollar" from the same data and explain why
  they are reciprocals, not the same quantity.
- **Advanced model — "a unit rate is defined by WHICH quantity sits in
  the denominator (reduced to 1) — this determines both the numeric
  value and the units of the answer, and choosing the correct
  denominator for the question being asked is itself part of solving
  the problem, not an afterthought"**: the learner reliably identifies,
  from a word problem's phrasing, which quantity belongs in the
  denominator, and correctly computes the reciprocal relationship
  between "A per unit B" and "B per unit A." Upgrade trigger: given a
  three-quantity comparison problem (e.g., comparing three package
  sizes at different prices), correctly identifying the single unit
  rate that makes all three directly comparable.
- **Do not upgrade early**: a learner still restricting "unit rate" to
  time-based examples (beginner model, MC-2) should not be pushed
  toward numerator/denominator flexibility (advanced model) before the
  general "per single unit of any quantity" definition is fully
  secure — MC-1 (numerator/denominator confusion) is FOUNDATIONAL and
  should clear alongside the generalization.

## Why Students Fail

The dominant, FOUNDATIONAL failure confuses which quantity belongs in
the numerator versus the denominator when computing a unit rate —
computing time/distance instead of distance/time, for instance —
producing a numerically valid but wrongly-shaped rate that answers a
different question than the one asked. A second failure believes
"unit rate" specifically means "per hour" (or another time unit),
having over-generalized from the most common introductory examples
(speed problems) to the entire concept, missing that a unit rate can
express "per" any single unit of any quantity — price per kilogram,
calories per serving, and so on. A third failure misreads the word
"unit" in "unit rate" as referring to a measurement unit (meters,
kilograms) rather than to the NUMBER one — the everyday, dual meaning
of "unit" contaminates the mathematical term.

## Misconceptions

Authored directly via the birth-taxonomy diagnostic procedure — no
Blueprint exists for this concept:

### MC-1: NUMERATOR-DENOMINATOR-CONFUSION (Foundational; Type 5 — instruction-induced)
**Description**: Learner computes the reciprocal of the intended unit
rate — e.g., computing hours-per-kilometer (time/distance) when the
question asks for kilometers-per-hour (distance/time) — because the
procedure "divide one quantity by the other" is often taught without
enough emphasis on WHICH quantity goes on top.
**Trigger condition**: any word problem where the question's phrasing
("how many km per hour" vs. "how many hours per km") determines which
quantity must be the numerator, and the two quantities are given in an
order that doesn't match the required numerator/denominator
arrangement.
**Repair target**: explicitly identify the denominator FIRST by asking
"per ONE of WHAT?" — the answer to that question is always the
denominator; the other quantity is always the numerator.

### MC-2: UNIT-RATE-MEANS-PER-HOUR (Moderate; Type 1 — overgeneralization)
**Description**: Learner believes "unit rate" specifically refers to
rates measured per unit of time (like speed), having over-generalized
from the most common introductory examples (km/h, mph) to the entire
concept.
**Trigger condition**: given a non-time-based unit-rate problem (e.g.,
price per kilogram, students per classroom) and asked to identify or
compute "the unit rate," learner either fails to recognize it as a
unit-rate problem or attempts to force a time-based framing onto it.
**Repair target**: demonstrate several non-time-based unit rates
(price/kg, calories/serving, students/classroom) alongside the
familiar km/h example, showing the SAME "reduce the denominator to 1"
procedure applies regardless of what the two quantities are.

### MC-3: UNIT-MEANS-MEASUREMENT-UNIT (Moderate; Type 3 — language contamination)
**Description**: Learner interprets the word "unit" in "unit rate" as
referring to a unit of MEASUREMENT (like meters or kilograms) rather
than to the NUMBER one — the everyday dual meaning of the word "unit"
(a measurement unit vs. the quantity 1) contaminates the mathematical
term.
**Trigger condition**: asked to explain what "unit" means in "unit
rate," learner describes it in terms of the measurement units involved
(km, kg) rather than the denominator being reduced to exactly 1.
**Repair target**: explicitly distinguish the two senses of "unit" —
"a unit of measurement" (km, kg, hours) describes WHAT is being
measured; "unit rate" refers to reducing the AMOUNT of the
denominator quantity to exactly the number 1, regardless of which
measurement unit is used.

## Analogies

**Primary — the per-person slice of pizza**: if 3 pizzas are split
among 12 people, the "per-person" unit rate answers "how much pizza
does ONE person get?" — 3÷12 = 0.25 pizzas per person. This is exactly
what a unit rate always computes: the amount of one quantity (pizza)
corresponding to exactly ONE unit of another quantity (a person) —
the same structure applies whether the "one unit" is a person, an
hour, a kilogram, or a classroom.

**Anti-analogy to retire**: "Unit rate is basically speed — like
km/h." This directly invites MC-2 by anchoring the entire concept to
one familiar time-based example, obscuring that the "reduce to one
unit" procedure generalizes to any pair of quantities.

## Demonstrations

**Numerator/denominator reciprocal contrast (targets MC-1)**: from "a
car travels 150 km in 3 hours," compute BOTH km/h (150÷3 = 50 km per
hour) and h/km (3÷150 = 0.02 hours per km) side by side, showing they
are reciprocals of each other, not the same quantity — asking "per ONE
of WHAT?" determines which one the question actually wants.

**Non-time-based generalization (targets MC-2)**: compute unit rates
for a 500g jar priced at $4 ($0.008 per gram), a classroom of 30
students with 6 tables (5 students per table), and a recipe yielding
12 cookies from 3 cups of flour (4 cookies per cup) — none involve
time, all use the identical "reduce denominator to 1" procedure.

**"Unit" disambiguation (targets MC-3)**: contrast "the unit of
measurement here is kilometers" (describing WHAT is measured) against
"the unit RATE here is 50 km per 1 hour" (describing that the
denominator has been reduced to the NUMBER one) — the same word
"unit" plays two genuinely different roles in these two sentences.

## Discovery Questions

Present two differently-sized, differently-priced grocery items (e.g.,
a 500g jar at $4 and a 750g jar at $5.25) and ask the learner which is
the better value — the learner discovers that comparing total prices
directly is misleading (different sizes), motivating the need to
reduce both to a common "per gram" (or "per unit") footing before
comparing. Recommendation: guided discovery for the comparison
motivation (directly experiential from the misleading total-price
comparison); direct instruction for the "per ONE of WHAT?" procedure
for correctly identifying the denominator (MC-1's repair), since this
diagnostic question is not independently rediscoverable without being
taught.

## Teaching Sequence

MC-3 (unit means measurement unit) is addressed first, since correctly
understanding what "unit" means in "unit rate" is the conceptual
foundation both later misconceptions depend on. MC-1
(numerator-denominator confusion) is addressed second, via the "per
ONE of WHAT?" diagnostic question. MC-2 (unit rate means per hour) is
addressed last, via explicit exposure to multiple non-time-based
examples, since it is a scope-restriction error rather than a
procedural one.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-3 active (unit means measurement unit) | WORKED EXAMPLE: "unit of measurement" vs. "unit rate" disambiguation contrast | Teaching Actions: SHOW §1 |
| MC-1 active (numerator/denominator confusion) | WORKED EXAMPLE: reciprocal contrast (km/h vs. h/km from the same data) | Teaching Actions: SHOW §1 |
| MC-2 active (unit rate means per hour) | WORKED EXAMPLE: non-time-based unit rate set (price/kg, students/table, cookies/cup) | Teaching Actions: SHOW §1 |
| Ready for transfer | THOUGHT EXPERIMENT: three-item grocery comparison requiring unit-rate normalization to determine best value | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "per ONE unit of [quantity]" explicitly rather than
just "the rate" — naming the specific denominator quantity is
load-bearing and directly guards against MC-1 and MC-2.

**Wait-time**: After presenting the two differently-sized grocery
items, give extended wait-time before revealing the unit-rate
comparison — let the learner attempt (and likely stumble on) a direct
total-price comparison first.

**Load-bearing sentences**:
- "Ask yourself: per ONE of what? That answer is always the
  denominator."
- "Unit rate means reducing the denominator to the number one — not a
  particular unit of measurement."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

### Gate 1 (MC-3 check)
Explain, in one sentence, what "unit" refers to in "unit rate." Pass:
correctly identifies "unit" as the number one (the denominator
reduced to 1), not a measurement unit.

### Gate 2 (MC-1 check)
Given "a car travels 240 km in 4 hours," compute the unit rate for
"kilometers per hour" and separately for "hours per kilometer,"
identifying which is which. Pass: 60 km/h and (1/60) h/km, correctly
distinguished as reciprocals, not interchangeable.

### Gate 3 (MC-2 check)
Compute the unit rate for a non-time-based scenario: a 12-cookie
recipe using 3 cups of flour — cookies per cup. Pass: 4 cookies per
cup, correctly computed without forcing a time-based framing.

### Gate 4 (comparison application)
Given a 500g jar at $4 and a 750g jar at $5.25, compute both unit
prices (price per gram) and determine which is the better value. Pass:
$0.008/g vs. $0.007/g; correctly identifies the 750g jar as better
value.

### Transfer probe (independence mode — no cross_links)
A phone plan offers "1,000 minutes for $25" and a competing plan
offers "1,500 minutes for $33." Using unit rates, determine which plan
offers a lower cost per minute, and explain why comparing total prices
alone would be misleading. Pass: correctly computes $0.025/min vs.
$0.022/min, identifies the second plan as cheaper per minute, and
explains that total price comparison ignores the different minute
allowances.

**Mastery criterion**: correct performance on all 4 gates plus the
transfer probe, consistent with KG mastery_threshold 0.85.

## Tutor Recovery Strategy

Likeliest utterance: "I divided the two numbers but I'm not sure if I
did it the right way around" — the concept-specific smaller question:
"per ONE of which quantity does the question want the answer?"
directly resolves MC-1 by converting an ambiguous "which way around"
worry into a single, answerable question the learner can apply to any
future rate problem, not just the one in front of them.

## Memory Hooks

**Type**: procedural (identifying the correct denominator via "per ONE
of WHAT?" and computing the resulting division) + declarative (the
"unit" = the number one, not a measurement unit). Review form: fresh
unit-rate comparison problems mixing time-based and non-time-based
scenarios, periodically paired with a "compute both directions and
identify which is which" reciprocal-check exercise to keep MC-1's
guard-rail active. Interleaving partner: `math.arith.ratios` (the
general ratio concept unit rate specializes).

## Transfer Connections

**Near transfer**:
- `math.arith.proportion` (per KG `related`; comparing two unit rates
  for equality, or scaling a unit rate to a larger quantity, is a
  direct application of proportional reasoning)

**Far transfer**:
- Real-world value comparison (grocery unit pricing, fuel efficiency,
  wage rates) — the single most common everyday application of unit
  rate reasoning
- Physics: velocity (distance per unit time), density (mass per unit
  volume), and similar per-unit quantities all directly instantiate
  the unit-rate structure

## Cross-Subject Connections

Per KG `cross_links` [] (empty) — no Tier 1 cross-subject link exists
for this concept. No cross-subject connection is fabricated beyond
what the KG states.

## Blueprint References

None exists at `docs/curriculum/blueprints/math.arith.unit-rate.md`
(verified via directory listing before authoring this entry). All
misconceptions, demonstrations, and assessment items above are
authored directly for this Educational Brain entry, not sourced from a
Blueprint.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's single prerequisite
(`math.arith.ratios`) and empty `unlocks`/`cross_links` are consistent
with its narrow, terminal-leaf role in the domain (a specialized,
practically-oriented ratio form, not itself a formal prerequisite of
any further KG concept). Its `related` link to `math.arith.proportion`
is a genuine conceptual connection (comparing or scaling unit rates
uses proportional reasoning) though not a formal KG prerequisite
relationship.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 3, autonomous loop) | Initial entry. No Blueprint exists; misconceptions authored directly via the birth-taxonomy diagnostic procedure. |
