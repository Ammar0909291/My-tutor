# Decimal Operations — `math.arith.decimal-operations`

## Identity

- **Concept ID**: `math.arith.decimal-operations` (canonical
  mathematics KG)
- **Curriculum location**: mathematics / arithmetic — child of
  `math.arith.decimals` (no children in KG)
- **Prerequisites**: `math.arith.decimals` (this concept applies the
  four arithmetic operations to decimal numbers specifically).
- **Unlocks**: none in KG.
- **Related** (from KG): `math.arith.decimals`.
- **Difficulty**: developing · **Bloom**: apply · **Mastery
  threshold**: 0.85 · **Est. hours**: 6
- **Blueprint**: none exists at `docs/curriculum/blueprints/
  math.arith.decimal-operations.md` (verified via directory listing).
  Misconceptions below authored directly via the birth-taxonomy
  diagnostic procedure (`educational-brain/misconceptions/
  01-birth-types.md`).
- **Aliases** (from KG): "adding decimals", "multiplying decimals",
  "decimal arithmetic".

## Learning Objective

The learner can: correctly multiply two decimal numbers by
multiplying the digits as whole numbers, then placing the decimal
point by counting the TOTAL number of decimal places across BOTH
factors; correctly divide by a decimal by first shifting the decimal
point in both divisor and dividend to make the divisor a whole number;
and avoid over-applying addition/subtraction's decimal-point-alignment
procedure to multiplication and division, where it does not apply.

## Core Understanding

`math.arith.decimals` already established comparison and addition/
subtraction (which require aligning decimal points column by column).
MULTIPLICATION of decimals works differently: multiply the digits
exactly as if they were whole numbers (ignoring the decimal points
entirely during the multiplication step), then count the TOTAL number
of decimal places across BOTH original factors, and place the decimal
point that many places from the right in the product — 2.5×1.4:
multiply 25×14=350, count 1+1=2 total decimal places, giving 3.50 (=
3.5). DIVISION by a decimal requires first eliminating the decimal
point from the DIVISOR: shift the decimal point in the divisor to make
it a whole number, and shift the dividend's decimal point the IDENTICAL
number of places (multiplying both by the same power of 10 preserves
the quotient) — 4.8÷0.6 becomes 48÷6=8 (both shifted one place right).
Critically, multiplication and division do NOT use the "align decimal
points" procedure that addition and subtraction require — attempting
to align points before multiplying, or forgetting to shift the divisor
to a whole number before dividing, both produce a decimal point in the
wrong position in the answer.

## Mental Models

- **Beginner model — "whatever I do with decimals for addition and
  subtraction, I should do the same thing for multiplication and
  division — line up the decimal points"**: the learner over-extends
  the addition/subtraction alignment procedure onto multiplication,
  attempting to align decimal points before multiplying, which is not
  how decimal multiplication works at all. Shelf-life warning: this
  model can produce a plausible-looking (though wrong) decimal
  placement by coincidence for certain simple examples, delaying
  detection.
- **Intermediate model — "I multiply decimal digits as whole numbers
  and place the point by counting total decimal places, but I
  sometimes miscount by using only ONE factor's decimal places instead
  of both factors' combined"**: the learner has the correct general
  procedure but occasionally undercounts the total, particularly when
  the two factors have a different number of decimal places from each
  other. Upgrade trigger: being asked to multiply two decimals with a
  DIFFERENT number of decimal places each (e.g., 3.25×1.4) and
  correctly count 2+1=3 total places.
- **Advanced model — "decimal multiplication ignores decimal points
  during the multiply step and places the point afterward by counting
  BOTH factors' decimal places combined; decimal division shifts BOTH
  the divisor and dividend by the same power of 10 to eliminate the
  divisor's decimal point first"**: the learner fluently multiplies and
  divides decimals of any length, correctly counting total decimal
  places and correctly shifting both dividend and divisor together.
  Upgrade trigger: being asked to explain WHY shifting both the divisor
  and dividend by the same power of 10 doesn't change the quotient
  (multiplying both parts of a division by the same nonzero number
  preserves the ratio).
- **Do not upgrade early**: a learner who still attempts to align
  decimal points before multiplying (beginner model, MC-1) should not
  be pushed toward decimal-place counting nuances or division-shifting
  (intermediate/advanced models) before recognizing that
  multiplication and division use an entirely different procedure from
  addition/subtraction — MC-1 is FOUNDATIONAL, since it misapplies the
  wrong procedure to the wrong operation entirely.

## Why Students Fail

The dominant, FOUNDATIONAL failure over-extends addition/subtraction's
decimal-point-ALIGNMENT procedure onto multiplication, attempting to
line up decimal points before multiplying two decimals — this
procedure simply does not apply to multiplication, where digits are
multiplied as whole numbers first and the decimal point is placed
afterward by counting total decimal places. A second failure, when
dividing by a decimal, fails to shift the decimal point in BOTH the
divisor and dividend before dividing, instead attempting to divide
with the decimal point still in the divisor — typically taught as a
mechanical shifting step without the underlying "multiplying both
parts by the same power of 10 preserves the quotient" justification,
making the step feel arbitrary and easy to skip. A third failure, when
multiplying decimals, miscounts the total number of decimal places
that should appear in the product — using only ONE factor's decimal
place count instead of the SUM of both factors' counts.

## Misconceptions

Authored directly via the birth-taxonomy diagnostic procedure — no
Blueprint exists for this concept:

### MC-1: DECIMAL-MULTIPLICATION-POINT-ALIGNMENT (Foundational; Type 6 — analogy overextension)
**Description**: Learner attempts to align decimal points (as required
for addition/subtraction) before multiplying two decimals, rather than
multiplying the digits as whole numbers first and placing the point
afterward — over-extends the alignment procedure from the operations
where it genuinely applies onto multiplication, where it does not.
**Trigger condition**: any decimal multiplication problem, especially
when the two factors have different numbers of decimal places (making
"alignment" ambiguous or nonsensical).
**Repair target**: multiply the digits exactly as whole numbers,
completely ignoring the decimal points during the multiplication step
itself — only AFTER getting the whole-number product does the decimal
point get placed, by counting total decimal places across both
original factors.
**MAMR**: FOUNDATIONAL — misapplying the wrong procedure to the wrong
operation undermines every decimal multiplication attempt; must clear
before MC-2 or MC-3.

### MC-2: DECIMAL-DIVISION-POINT-NOT-SHIFTED (Moderate; Type 5 — instruction-induced)
**Description**: When dividing by a decimal, learner fails to shift
the decimal point in the divisor (and correspondingly in the dividend)
to make the divisor a whole number first — the shifting step is often
taught as a memorized mechanical rule without the underlying
justification, making it feel skippable.
**Trigger condition**: any division problem where the divisor itself
is a decimal (e.g., 4.8÷0.6).
**Repair target**: shift the decimal point in the DIVISOR until it
becomes a whole number, and shift the dividend's decimal point the
IDENTICAL number of places in the same direction — 4.8÷0.6 becomes
48÷6 (both shifted one place right) — because multiplying both parts
of a division by the same power of 10 doesn't change the quotient.

### MC-3: DECIMAL-PLACE-COUNT-UNDERCOUNTED (Moderate; Type 1 — overgeneralization)
**Description**: When placing the decimal point in a product, learner
counts only ONE factor's decimal places rather than the SUM of both
factors' decimal place counts — over-generalizes from single-decimal-
place examples (where undercounting happens to look plausible) to a
general (incorrect) one-factor-only counting habit.
**Trigger condition**: multiplying two decimals with a DIFFERENT
number of decimal places each (e.g., 3.25×1.4, with 2 and 1 decimal
places respectively).
**Repair target**: explicitly count the decimal places in EACH factor
separately, then ADD those two counts together for the total number
of decimal places in the product — 3.25 (2 places) × 1.4 (1 place) =
2+1=3 total decimal places in the final product.

## Analogies

**Primary — multiply first, decorate second (a general framing for
decimal multiplication)**: multiplying two decimals is like building a
plain structure first (the whole-number product, ignoring decimal
points entirely) and only THEN adding the finishing detail (placing
the decimal point, based on how many decimal places both original
numbers had combined) — the decimal point placement is a final
adjustment step, never part of the multiplication itself.

**Anti-analogy to retire**: "Whatever rule works for decimal addition
also works for decimal multiplication and division." This directly
invites MC-1 by suggesting a single, universal decimal-point procedure
applies uniformly across all four operations, when addition/
subtraction and multiplication/division actually require genuinely
different procedures.

## Demonstrations

**Multiplication procedure (targets MC-1 and MC-3)**: 2.5×1.4 —
multiply as whole numbers: 25×14=350; count total decimal places:
2.5 has 1, 1.4 has 1, total=2; place the point 2 places from the
right in 350: 3.50 (=3.5). Contrast with a wrong attempt to "align"
the points before multiplying, which produces no sensible procedure at
all.

**Division procedure (targets MC-2)**: 4.8÷0.6 — shift the divisor's
decimal point one place right to make it a whole number (0.6→6), and
shift the dividend's decimal point the SAME one place right (4.8→48);
now divide as whole numbers: 48÷6=8. Verify: 8×0.6=4.8 ✓.

**Decimal-place-counting contrast (targets MC-3)**: 3.25×1.4 — 3.25
has 2 decimal places, 1.4 has 1 decimal place, total=2+1=3; multiply as
whole numbers: 325×14=4550; place the point 3 places from the right:
4.550 (=4.55).

## Discovery Questions

Present 2.5×1.4 and ask the learner to attempt "aligning the decimal
points" the way they would for addition, before the correct procedure
is stated — the learner discovers this doesn't produce any sensible
way to proceed (there's no meaningful way to "align" points before
multiplying), directly motivating why multiplication needs a
genuinely different procedure. Recommendation: guided discovery for
recognizing multiplication needs a different approach (directly
experiential from the failed alignment attempt); direct instruction for
the whole-number-multiply-then-place-the-point procedure and the
divisor-shifting rule (MC-1/MC-2's repairs), since neither procedure is
independently rediscoverable without being demonstrated.

## Teaching Sequence

MC-1 (decimal multiplication point alignment) is addressed first,
since recognizing that multiplication requires an entirely different
procedure from addition/subtraction is the foundational insight every
later step depends on. MC-3 (decimal place count undercounted) is
addressed second, refining the correct multiplication procedure's
place-counting step. MC-2 (decimal division point not shifted) is
addressed last, as a structurally separate operation (division) with
its own distinct procedure.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (decimal multiplication point alignment) | DEMONSTRATION: failed-alignment-attempt vs. correct whole-number-multiply-then-place-point procedure | Teaching Actions: SHOW §3 |
| MC-3 active (decimal place count undercounted) | WORKED EXAMPLE: different-decimal-place-count multiplication (3.25×1.4) | Teaching Actions: SHOW §1 |
| MC-2 active (decimal division point not shifted) | WORKED EXAMPLE: divisor-and-dividend-shifted-together division (4.8÷0.6) | Teaching Actions: SHOW §1 |
| Ready for transfer | THOUGHT EXPERIMENT: explain why shifting both divisor and dividend by the same power of 10 preserves the quotient | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "multiply first, place the point after" for decimal
multiplication and "shift both numbers together" for decimal
division — these two distinct, named procedures are load-bearing and
directly guard against MC-1's cross-operation confusion.

**Wait-time**: After presenting 2.5×1.4 and asking the learner to try
aligning the points, give extended wait-time before revealing that
this approach doesn't work — let the learner attempt it and notice the
dead end themselves.

**Load-bearing sentences**:
- "Multiplying decimals means multiply the digits first, decimal point
  after — never align points before multiplying."
- "Dividing by a decimal means shift both numbers together until the
  divisor is a whole number."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

### Gate 1 (MC-1 check)
Compute 3.2×2.1 by multiplying as whole numbers first, then placing
the decimal point. Pass: 32×21=672; 1+1=2 total decimal places; 6.72.

### Gate 2 (MC-3 check)
Compute 4.15×2.3, correctly counting the total decimal places from
BOTH factors. Pass: 415×23=9545; 2+1=3 total decimal places; 9.545.

### Gate 3 (MC-2 check)
Compute 7.2÷0.4 by first shifting both numbers to eliminate the
decimal in the divisor. Pass: shift both one place right (72÷4=18).

### Gate 4 (application)
A recipe requires 2.5 times the amount of a 1.6-cup ingredient. Compute
the total cups needed. Pass: 2.5×1.6=4.00 (=4) cups, using the
correct multiplication procedure.

### Transfer probe (independence mode — no cross_links)
Verify that 7.2÷0.4=18 is correct by using multiplication: does
18×0.4 equal 7.2? Explain why this verification method works for any
division problem. Pass: 18×0.4=7.2, confirmed; correctly explains that
division and multiplication are inverse operations, so multiplying the
quotient by the divisor should recover the dividend.

**Mastery criterion**: correct performance on all 4 gates plus the
transfer probe, consistent with KG mastery_threshold 0.85.

## Tutor Recovery Strategy

Likeliest utterance: "I tried lining up the decimal points like I do
for adding, but I don't know what to do next" — the concept-specific
smaller question: "what if you multiplied the numbers as if the
decimal points weren't there at all?" directly redirects the learner
away from the addition/subtraction alignment procedure (which doesn't
apply here) toward the genuinely different whole-number-first
multiplication approach.

## Memory Hooks

**Type**: procedural (whole-number-multiply-then-place-the-point for
multiplication; shift-both-numbers-together for division) +
declarative (multiplication/division use different decimal procedures
than addition/subtraction). Review form: fresh decimal multiplication
and division prompts with varying decimal-place counts in each factor,
periodically paired with a "would you align the points here?" check to
keep MC-1's guard-rail active. Interleaving partner: `math.arith.
decimals` (the comparison and addition/subtraction procedures this
concept's multiplication/division procedures deliberately contrast
against).

## Transfer Connections

**Near transfer**:
- `math.arith.multiplication` (the whole-number multiplication
  procedure this concept's decimal-point-placement step is built on
  top of)
- `math.arith.division` (the whole-number division procedure this
  concept's divisor-shifting step is built on top of)

**Far transfer**:
- Scientific notation and unit conversion both rely on correctly
  shifting decimal points by powers of 10
- Financial calculations (currency conversion, unit pricing, interest)
  routinely require decimal multiplication and division

## Cross-Subject Connections

Per KG `cross_links` [] (empty) — no Tier 1 cross-subject link exists
for this concept. No cross-subject connection is fabricated beyond
what the KG states.

## Blueprint References

None exists at `docs/curriculum/blueprints/
math.arith.decimal-operations.md` (verified via directory listing
before authoring this entry). All misconceptions, demonstrations, and
assessment items above are authored directly for this Educational
Brain entry, not sourced from a Blueprint.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's single prerequisite
(`math.arith.decimals`) and empty `unlocks`/`cross_links` are
consistent with its narrow, procedural, terminal-leaf role in the
domain. Noted honestly: this concept's misconceptions are deliberately
scoped to MULTIPLICATION and DIVISION procedures specifically, since
`math.arith.decimals`'s own registry already covers comparison and
addition/subtraction (MC-1 LONGER-DECIMAL-IS-LARGER, MC-2
WHOLE-AND-DECIMAL-PARTS-SEPARATE) and the multiply/divide DIRECTION
prediction (MC-3) — this entry's misconceptions instead address the
MECHANICAL PROCEDURES for actually executing decimal multiplication
and division, avoiding duplication of that concept's own scope.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 5 part 2, autonomous loop) | Initial entry. No Blueprint exists; misconceptions authored directly via the birth-taxonomy diagnostic procedure. |
