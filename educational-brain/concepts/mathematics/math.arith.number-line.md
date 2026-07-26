# Number Line — `math.arith.number-line`

## Identity

- **Concept ID**: `math.arith.number-line` (canonical mathematics KG)
- **Curriculum location**: mathematics / arithmetic — no parent or
  children in KG
- **Prerequisites**: `math.arith.counting` (the counting sequence 1, 2,
  3, … this concept extends into a continuous geometric picture with
  direction and an origin).
- **Unlocks**: `math.arith.negative-numbers`, `math.arith.ordering`.
- **Related** (from KG): `math.arith.negative-numbers`,
  `math.found.real-numbers`.
- **Difficulty**: foundational · **Bloom**: understand · **Mastery
  threshold**: 0.9 · **Est. hours**: 4
- **Blueprint**: `docs/curriculum/blueprints/math.arith.number-line.md`
  (PACKAGE_READY; MAMR: MC-1 NEGATIVE-ORDERING-BY-MAGNITUDE is
  FOUNDATIONAL; P76_mode cross-link probe, cross_links=
  [math.geom.coordinate-plane], Tier 1).
- **Aliases** (from KG): "real line model", "number ray".

## Learning Objective

The learner can: correctly order numbers, including negatives, by
their POSITION on the number line (further right = larger, further
left = smaller), without relying on magnitude-based shortcuts;
correctly distinguish a number's DISTANCE from zero (magnitude) from
its actual ORDER on the line, recognizing that a large-magnitude
negative number is still a SMALL number; and correctly recognize the
number line is continuously filled with numbers (including fractions
and decimals between any two marked integers), not merely a sequence
of isolated integer points with gaps.

## Core Understanding

The number line extends the counting sequence (`math.arith.counting`)
into a continuous geometric picture: a line with a designated origin
(0), a unit length, and a direction, on which every number occupies an
exact position. The ORDERING RULE is purely positional: for any two
numbers a, b, a < b if and only if a is positioned to the LEFT of b —
this single rule applies uniformly to positive numbers, negative
numbers, and zero, with magnitude (distance from zero) playing no
direct role. This is precisely why negative numbers invert
whole-number size intuition: -5 sits further LEFT than -2, so -5 < -2,
even though 5 (the magnitude) is bigger than 2. The line is also
CONTINUOUSLY filled — between any two marked integers (e.g., 2 and 3),
infinitely many other numbers exist, each with its own exact position;
the integers are merely convenient, evenly-spaced reference markers on
an otherwise unbroken line.

## Mental Models

- **Beginner model — "bigger digit means bigger number, always"**: the
  learner applies whole-number size intuition uniformly, so -5 is
  judged "bigger" than -2 because 5 > 2 — a rule that works perfectly
  for positive numbers but inverts entirely once negatives are
  introduced. Shelf-life warning: this model is reinforced by years of
  correct experience with positive numbers before negatives are ever
  introduced, making it an unusually sticky default.
- **Intermediate model — "order is decided by position on the line, not
  magnitude — I can correctly order any two numbers by locating them,
  but I still think of magnitude and order as usually the same thing
  that just happens to diverge for negatives"**: the learner correctly
  applies the position-based rule when prompted but has not yet
  internalized that magnitude and order are two entirely INDEPENDENT
  properties that simply happen to coincide for positive numbers.
  Upgrade trigger: being asked to compare a huge-magnitude negative
  (e.g., -100) against a tiny positive (e.g., 1) and articulate why
  magnitude and order genuinely disagree here, not just apply the rule
  mechanically.
- **Advanced model — "position (order) and distance-from-zero
  (magnitude) are two independent properties of a number; they only
  happen to align for non-negative numbers, and the number line is
  additionally continuously filled with no smallest gap between any
  two distinct numbers"**: the learner fluently separates order and
  magnitude questions for any pair of numbers and can locate a number
  strictly between two arbitrarily close values by construction (e.g.,
  averaging). Upgrade trigger: being asked whether the position-based
  ordering rule extends to points in a 2D plane (it does not, without
  additional structure — see cross-link transfer probe).
- **Do not upgrade early**: a learner who still orders negatives by
  magnitude (beginner model, MC-1) should not be pushed toward the
  continuous-fill property (advanced model) before position-based
  ordering of negatives is fully secure — MC-1 is FOUNDATIONAL per the
  Blueprint's own MAMR, since it inverts the ordering relationship for
  every negative number and directly enables MC-2's more general
  confusion.

## Why Students Fail

The dominant, FOUNDATIONAL failure orders negative numbers by their
magnitude rather than their position, believing -5 is "bigger" than -2
because 5 > 2 — years of correct whole-number size intuition (bigger
digit = bigger number) become actively counterproductive the moment
negatives are introduced, since position-based order and
magnitude-based comparison diverge completely for negatives. A second,
closely related failure treats distance-from-zero as automatically
determining size, believing a large-magnitude negative number must be
"bigger" because it's "far from zero" — this is really the same
magnitude-based reasoning as the first failure, generalized to
comparisons mixing negative and positive numbers. A third failure
treats the number line as containing only the marked integer points,
missing that it is continuously filled — every fraction and decimal
has its own exact position between any two integers, with no genuine
gap anywhere.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: NEGATIVE-ORDERING-BY-MAGNITUDE (Foundational; Type 1 — overgeneralization)
**Trigger**: asked which is bigger, -9 or -4, learner answers -9
"since 9 is bigger than 4" — over-generalizing whole-number size
intuition ("bigger digit = bigger number") to negatives, where it
inverts.
**Repair**: locate both on the number line — -9 sits further LEFT than
-4; further left always means smaller, regardless of magnitude, so -4
(further right) is the bigger number.
**MAMR**: FOUNDATIONAL — inverts the ordering relationship for EVERY
negative number and directly enables MC-2's generalized confusion;
must clear before MC-2 or MC-3.

### MC-2: DISTANCE-FROM-ZERO-DETERMINES-ORDER (Moderate; Type 1 — overgeneralization)
**Trigger**: told -30 is farther from zero than 5, learner concludes
-30 must be bigger — the same magnitude-based reasoning as MC-1,
generalized to comparisons mixing negative and positive numbers.
**Repair**: being far from zero and being a big number are independent
facts; -30 is far from zero (distance 30) but far to the LEFT (very
negative), making it small — smaller than 5, which is only slightly
right of zero.

### MC-3: NUMBER-LINE-HAS-GAPS (Moderate; Type 2 — perceptual intuition)
**Trigger**: asked if there is any number between 7 and 8, learner
answers no — the visual impression of discrete, evenly-spaced integer
tick marks on a drawn number line perceptually suggests the line
consists only of those marked points, with nothing filling the space
between them.
**Repair**: average the two integers — (7+8)/2 = 7.5, a genuine number
strictly between them; the line is completely filled, with infinitely
many more numbers (7.1, 7.25, 7.99999, …) also existing in that same
"gap."

## Analogies

**Primary — a walking path with mile markers (extending the Blueprint's
own position-vs-magnitude framing)**: mile markers on a walking path
are convenient labeled reference points, but the path itself is
continuously walkable at every point between them — there is no
"jump" between mile marker 3 and mile marker 4, just continuous
ground. The number line's integers are exactly these mile markers:
useful labels, but the line itself is unbroken between them.

**Anti-analogy to retire**: "The number line is just a row of numbered
dots, like stepping stones." This directly invites MC-3 by framing the
line as inherently discrete (isolated stones with genuine gaps between
them) rather than a continuously filled geometric object.

## Demonstrations

**Position-vs-magnitude contrast (Blueprint's own extreme-gap
demonstration)**: compare -100 and 1. -100 has a HUGE magnitude
(distance 100 from zero); 1 has a tiny magnitude. Yet on the number
line, -100 sits way to the left and 1 sits just right of zero: -100 <
1 — the larger-magnitude number is the SMALLER number, precisely
because it is negative.

**Continuous-fill demonstration (Blueprint's own averaging
construction)**: between 3 and 4, the line is NOT empty — it contains
3.1, 3.25, 3½, 3.9999…, and every other real number strictly between
them. There is no smallest "gap" or "next number" after 3 — between
any two numbers, however close, infinitely many others can always be
found by averaging.

## Discovery Questions

Present the pair -8 and -3 and ask the learner to determine which is
larger using a drawn number line, before any rule is stated — the
learner discovers the position-based answer (-3 is larger, since it
sits further right) directly from the drawing, which may conflict with
their initial magnitude-based guess. Recommendation: guided discovery
for the position-based ordering rule (directly experiential from
marking and comparing points); direct instruction for the
continuous-fill property's infinite regress (MC-3's repair, the
"infinitely many numbers between any two" fact), since this is not
independently rediscoverable without the averaging construction being
demonstrated.

## Teaching Sequence

MC-1 (negative ordering by magnitude) is addressed first, as the
single most consequential number-line error — it inverts the ordering
relationship for every negative number and is this concept's
FOUNDATIONAL misconception. MC-2 (distance-from-zero determines order)
is addressed second, as MC-1's underlying error generalized to
mixed-sign comparisons. MC-3 (number-line has gaps) is addressed last,
as a structurally separate perceptual issue about the line's
continuity rather than its ordering rule.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (negative ordering by magnitude) | DEMONSTRATION: position-based marking of -5 vs. -2 on a drawn number line | Teaching Actions: SHOW §3 |
| MC-2 active (distance-from-zero determines order) | DEMONSTRATION: extreme-gap contrast (-100 vs. 1) | Teaching Actions: SHOW §3 |
| MC-3 active (number line has gaps) | DEMONSTRATION: continuous-fill averaging construction between 7 and 8 | Teaching Actions: SHOW §3 |
| Ready for transfer | THOUGHT EXPERIMENT: does 1D position-based ordering extend to a total order on 2D coordinate-plane points (Blueprint P76, cross-link) | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "further left/right" rather than "bigger/smaller
digit" when discussing order — the position framing is load-bearing
and directly guards against MC-1 and MC-2.

**Wait-time**: After presenting the -100 vs. 1 extreme-gap contrast,
give extended wait-time before revealing the resolution — let the
learner sit with the apparent tension between "-100 looks huge" and
"-100 is actually smaller."

**Load-bearing sentences**:
- "Further left always means smaller — no exceptions, not even for
  negatives."
- "Distance from zero and size are different questions; they only
  happen to agree for positive numbers."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Directly reusing the Blueprint's own P77 4-problem gate set and P76
cross-link transfer probe, not restated in full — cite by reference:

**Gate 1** (Blueprint Problem 1): which is larger, -12 or -7? Pass: -7
(−12 sits further left).

**Gate 2** (Blueprint Problem 2): order -3, 5, -10, 0 from smallest to
largest. Pass: -10, -3, 0, 5.

**Gate 3** (Blueprint Problem 3): which has the larger magnitude, -20
or 6? Which is the larger number? Pass: -20 has larger magnitude; 6 is
the larger number.

**Gate 4** (Blueprint Problem 4): name a number strictly between 0.4
and 0.5. Pass: any valid value, e.g. 0.45.

**Gate 5** (Blueprint P76, cross-link probe to `math.geom.
coordinate-plane`): compare x-coordinates of two points on the x-axis
using the position-based rule; evaluate whether "further right AND
further up" gives a single total order on 2D points (it does not,
without additional structure); explain why 1D ordering does not
directly extend to 2D. Pass: correct x-coordinate comparison and
correct explanation of why 2D points lack a natural single total
order.

**Mastery criterion**: 5/5 on the full Blueprint item bank (4 P77 items
+ P76), consistent with KG mastery_threshold 0.9 (⌈0.9×5⌉=5).

## Tutor Recovery Strategy

Likeliest utterance: "but -100 is such a huge number, how can it be
smaller than 1?" — the concept-specific smaller question: "which one
sits further to the right?" reframes the confusion from a
magnitude-driven intuition into a directly checkable positional fact,
using the learner's own ability to locate both numbers on a drawn line
as the resolving evidence.

## Memory Hooks

**Type**: perceptual/procedural (marking and comparing positions on a
drawn number line, including negatives) + declarative (the
position-based ordering rule; the continuous-fill property). Review
form: fresh mixed positive/negative ordering tasks, periodically paired
with a "find a number between these two close values" prompt to keep
MC-3's guard-rail active. Interleaving partner: `math.arith.counting`
(the sequence this concept extends into a continuous geometric
picture).

## Transfer Connections

**Near transfer**:
- `math.arith.negative-numbers` (per KG `unlocks`; the number line's
  leftward extension past zero is exactly where negative numbers are
  introduced and given meaning)
- `math.arith.ordering` (per KG `unlocks`; the formal position-based
  ordering rule developed here becomes the general theory of ordering
  numbers)

**Far transfer**:
- `math.found.real-numbers` (per KG `related`; the number line's
  continuous-fill property is the geometric intuition underlying the
  real number system's completeness)
- `math.geom.coordinate-plane` (per KG `cross_links`, Tier 1; the
  x-axis and y-axis are each themselves number lines, extended
  perpendicular to one another)

## Cross-Subject Connections

Per KG `cross_links` [`math.geom.coordinate-plane`], Tier 1 (already
authored per the Blueprint): P76_mode is cross-link probe. The
transfer probe extends the number line's position-based ordering rule
directly to x-coordinates on the coordinate plane, then examines the
rule's LIMITS — no single natural total order exists on full 2D points
the way one does on a single number line — deepening understanding of
exactly what the one-dimensional ordering rule does and does not
provide.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.arith.number-line.md`
(PACKAGE_READY, all structural/grammar/content/AIR checks PASS).

Full Protocol A teaching sequence (TA-A01 through TA-A03/mastery
gate), Protocol B repair chains (B01 through B03), and the P89
spaced-repetition schedule reused by reference above and not restated
in full; the Misconception Registry (MC-1 through MC-3) and the P77/P76
mastery-gate item bank cited directly by ID.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's single prerequisite
(`math.arith.counting`) and its two unlocks (`math.arith.
negative-numbers`, `math.arith.ordering`) match the Blueprint's own
Component 7 exactly. The Tier 1 cross-link to `math.geom.
coordinate-plane` is confirmed already authored (per the Blueprint's
own note), enabling a genuine cross-link transfer probe rather than an
independence-mode substitute.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 3, autonomous loop) | Initial entry, grounded in the existing PACKAGE_READY Blueprint. |
