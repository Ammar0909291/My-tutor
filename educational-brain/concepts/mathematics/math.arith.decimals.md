# Decimals — `math.arith.decimals`

## Identity

- **Concept ID**: `math.arith.decimals` (canonical mathematics KG)
- **Curriculum location**: mathematics / arithmetic — no parent in
  KG; children: `math.arith.decimal-operations`, `math.arith.
  repeating-decimals`, `math.arith.terminating-decimals`
- **Prerequisites**: `math.arith.fractions` (decimals are fractions
  restricted to power-of-10 denominators), `math.arith.place-value`
  (the positional framework this concept extends rightward past the
  decimal point).
- **Unlocks**: `math.arith.percentages`, `math.arith.rounding`.
- **Related** (from KG): `math.arith.fractions`, `math.arith.
  percentages`.
- **Difficulty**: developing · **Bloom**: apply · **Mastery
  threshold**: 0.85 · **Est. hours**: 10
- **Blueprint**: `docs/curriculum/blueprints/math.arith.decimals.md`
  (PACKAGE_READY; MAMR: MC-1 LONGER-DECIMAL-IS-LARGER is
  FOUNDATIONAL; P76_mode independence, cross_links=[]).
- **Aliases** (from KG): "decimal fractions", "decimal notation".

## Learning Objective

The learner can: read, write, and compare decimals correctly using
place value (not digit count or digit string length); correctly add
and subtract decimals with proper place-value alignment, carrying
across the decimal point exactly as between whole-number columns; and
correctly predict whether multiplying or dividing by a decimal will
increase or decrease a quantity, recognizing the whole-number
"multiplication makes bigger, division makes smaller" rule fails once
factors strictly between 0 and 1 are involved.

## Core Understanding

A decimal extends `math.arith.place-value`'s positional system
rightward past the decimal point: each digit right of the point has
value 1/10^j for its position j (tenths=10⁻¹, hundredths=10⁻²,
thousandths=10⁻³, …), the identical base-10 positional principle
already used for whole numbers, continuing to NEGATIVE powers of 10.
COMPARISON requires aligning by place value (padding with trailing
zeros as needed) and comparing column by column from the LEFT — the
first column where digits differ decides the comparison, however many
digits follow; digit COUNT plays no role at all. ADDITION and
SUBTRACTION require the SAME continuous place-value system across the
decimal point — carrying (or borrowing) flows across it exactly as
between ones and tens columns, never treating the whole-number and
decimal parts as two separate, independently-combined numbers.
MULTIPLICATION and DIVISION by a decimal STRICTLY BETWEEN 0 and 1
reverse the whole-number intuition: multiplying by such a factor
SHRINKS the result (taking a fraction of the original), while dividing
by such a factor GROWS the result (asking how many small pieces fit,
which is a bigger count) — the direction each operation pushes a
sub-1 factor is OPPOSITE, not the same.

## Mental Models

- **Beginner model — "decimals are compared by how many digits they
  have, or by reading the digits after the point as a whole number"**:
  the learner judges 0.36 as larger than 0.4 because "36 is bigger than
  4," treating the decimal portion as an independent whole-number
  string rather than place-value-weighted digits. Shelf-life warning:
  this model produces correct comparisons whenever the longer decimal
  also happens to be larger, delaying detection until a case like
  0.36 vs. 0.4 exposes the error.
- **Intermediate model — "I compare decimals correctly by aligning
  columns, and I can add/subtract with carrying across the decimal
  point, but I still default to whole-number intuition when predicting
  multiplication/division direction with a sub-1 factor"**: the
  learner has cleared MC-1 and MC-2 but still expects multiplying to
  always increase and dividing to always decrease a value, not
  recognizing the direction flips once the other factor is strictly
  between 0 and 1. Upgrade trigger: being asked to predict, WITHOUT
  computing, whether 8×0.25 is bigger or smaller than 8, and whether
  8÷0.25 is bigger or smaller than 8.
- **Advanced model — "decimal comparison, carrying, and the
  multiply/divide-by-a-sub-1-factor asymmetry are all direct
  consequences of ONE continuous place-value system extended to
  negative powers of 10 — I can predict the direction of any
  operation's effect before computing, based purely on whether the
  other factor is above or below 1"**: the learner fluently compares,
  computes, and predicts across all three skill clusters and correctly
  distinguishes the OPPOSITE direction multiplication and division push
  a sub-1 factor. Upgrade trigger: being asked to evaluate a claim that
  "since 0.8 is less than 1, both multiplying and dividing by 0.8
  should shrink the result" and identify exactly where the claim
  breaks down.
- **Do not upgrade early**: a learner who still compares decimals by
  digit count (beginner model, MC-1) should not be pushed toward the
  multiply/divide asymmetry (advanced model, MC-3) before place-value
  comparison is fully secure — MC-1 is FOUNDATIONAL per the Blueprint's
  own MAMR, since it is a prerequisite skill for self-checking whether
  any addition, subtraction, multiplication, or division result is even
  plausible in size.

## Why Students Fail

The dominant, FOUNDATIONAL failure compares decimals by treating the
digits after the point as if they formed a whole number — concluding
0.36>0.4 because "36 is bigger than 4" — this is the single most
extensively documented decimal misconception in mathematics education
research (the "longer-is-larger" error), and it corrupts every
subsequent skill, since a student who cannot correctly order decimals
has no way to sanity-check an addition or multiplication result. A
second failure adds or subtracts decimals by combining the
whole-number parts and decimal parts as two SEPARATE, independent
computations (1.9+2.9 computed as "1+2=3" and "9+9=18" glued as
"3.18"), not carrying across the decimal point when the decimal-part
sum exceeds one whole unit. A third failure assumes multiplication
always increases and division always decreases a positive number,
failing for factors/divisors strictly between 0 and 1, where BOTH
operations reverse their usual whole-number direction.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: LONGER-DECIMAL-IS-LARGER (Foundational; Type 1 — overgeneralization)
**Trigger**: comparing 0.36 and 0.4, learner concludes 0.36 is larger
"since 36 is bigger than 4" — over-generalizing whole-number
digit-string comparison ("more digits/bigger digit string = bigger
value") onto decimals, where digit count after the point carries no
such meaning.
**Repair**: align by place value (0.36 vs. 0.40) and compare from the
LEFT, highest place value first — tenths: 3 vs. 4, already decided;
0.40 wins regardless of the hundredths digit that follows.
**MAMR**: FOUNDATIONAL — a student who cannot correctly order decimals
has no way to sanity-check whether an addition (MC-2) or
multiplication/division (MC-3) result is even plausible; must clear
before MC-2 or MC-3.

### MC-2: WHOLE-AND-DECIMAL-PARTS-SEPARATE (Moderate; Type 1 — overgeneralization)
**Trigger**: computing 1.9+2.9, learner adds whole-number and decimal
parts as two independent sums ("1+2=3" and "9+9=18," glued as "3.18")
— over-generalizes treating each "part" of a mixed number
independently, missing that the decimal parts summing to 18 tenths
exceeds one whole and must carry.
**Repair**: check the tenths column specifically — 9+9=18 tenths,
which is more than one whole (10 tenths=1 one), so it MUST carry: 18
tenths = 1 one + 8 tenths, added into the ones-column sum
(1+2+1=4). Correct answer: 4.8, not 3.18.

### MC-3: MULTIPLY-BIGGER-DIVIDE-SMALLER-ALWAYS (Moderate; Type 1 — overgeneralization)
**Trigger**: asked whether 10×0.2 is bigger or smaller than 10,
learner answers bigger "since multiplying always makes things
bigger" — over-generalizes the whole-number rule, which silently
assumes the other factor exceeds 1.
**Repair**: multiplying by a number less than 1 means taking a
FRACTION of the original (10×0.2=2, one-fifth of 10 — smaller);
dividing by a number less than 1 asks how many small pieces fit
(10÷0.2=50 — many fit, since each piece is small — bigger).

## Analogies

**Primary — the place-value grid extended (Blueprint's own opening
representation)**: the same grid used for whole-number ones/tens/
hundreds simply continues rightward past a decimal point into tenths,
hundredths, thousandths — the decimal point is not a divider between
"two separate numbers," it's a marker within ONE continuous
place-value system, and carrying flows across it exactly as it flows
between ones and tens.

**Anti-analogy to retire**: "The digits after the decimal point are
basically their own separate little number." This directly invites
both MC-1 (comparing that "separate number" as if bigger digit strings
win) and MC-2 (adding that "separate number" independently of the
whole-number part).

## Demonstrations

**Comparison contrast (Blueprint's own Contrast 1)**: 0.199 vs. 0.2 —
align as 0.199 vs. 0.200; tenths: 1 vs. 2, already decided, 0.2>0.199,
even though 0.199 has three digits after the point and "199" looks
much bigger than "2." Digit count is irrelevant; only the place value
of the FIRST differing digit matters.

**Carrying-across-the-point contrast (Blueprint's own Contrast 2)**:
3.6+2.7 — correct (carrying): tenths 6+7=13 tenths=1 one+3 tenths,
carry 1; ones 3+2+1=6; result 6.3. Incorrect (separated-parts error):
"3+2=5" and "6+7=13" glued as "5.13" — wrong, since 13 tenths exceeds
one whole and must carry, exactly like 13 ones must carry into tens in
whole-number addition.

**Multiply/divide asymmetry table (Blueprint's own Contrast 3)**:
8×3=24 (bigger, confirms whole-number intuition, factor>1); 8×0.25=2
(SMALLER than 8, factor<1); 8÷2=4 (smaller, confirms intuition,
divisor>1); 8÷0.25=32 (LARGER than 8, divisor<1) — the whole-number
rule silently assumes the other factor exceeds 1; the moment it's
sub-1, BOTH operations flip direction.

## Discovery Questions

Present the comparison 0.199 vs. 0.2 and ask the learner which is
larger before any alignment rule is stated — the learner's likely
"0.199 is bigger, it has more digits" guess is directly falsifiable by
aligning and comparing tenths, motivating the place-value-alignment
rule from a concrete, self-checkable surprise. Recommendation: guided
discovery for the comparison-by-alignment insight (directly
experiential from the surprising 0.2>0.199 result); direct instruction
for the multiply/divide direction asymmetry (MC-3's repair), since the
opposite-direction effect of multiplication versus division on a sub-1
factor is not independently rediscoverable without the side-by-side
contrast being shown.

## Teaching Sequence

Per the Blueprint's own MAMR: MC-1 (longer-decimal-is-larger) is
FOUNDATIONAL and cleared first — reliable decimal comparison is the
self-checking tool every later skill (addition, multiplication/
division prediction) depends on. MC-2 (whole-and-decimal-parts
separate) follows, via the explicit carrying-across-the-point
demonstration. MC-3 (multiply-bigger-divide-smaller-always) is
addressed last, as a prediction/intuition error carried over from
whole-number arithmetic rather than a procedural comparison or
carrying error.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (longer decimal is larger) | DEMONSTRATION: aligned-column comparison contrast (0.199 vs. 0.2) | Teaching Actions: SHOW §3 |
| MC-2 active (whole/decimal parts separate) | WORKED EXAMPLE: carrying-across-the-point addition (3.6+2.7) | Teaching Actions: SHOW §1 |
| MC-3 active (multiply-bigger-divide-smaller-always) | DEMONSTRATION: multiply/divide-by-sub-1-factor asymmetry table | Teaching Actions: SHOW §3 |
| Ready for transfer | THOUGHT EXPERIMENT: fabric-pricing/cutting scenario applying the same decimal to both multiplication and division (Blueprint P76) | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "align by place value first" as the default opening
move for any decimal comparison — the alignment step is load-bearing
and directly guards against MC-1.

**Wait-time**: After presenting the multiply/divide asymmetry table
(8×0.25 vs. 8÷0.25), give extended wait-time before revealing why they
diverge — let the learner sit with the apparent tension of the
identical 0.25 producing opposite effects.

**Load-bearing sentences**:
- "Compare from the left, highest place value first — digit count
  after the point never decides it."
- "A factor less than 1 shrinks when you multiply by it, but grows when
  you divide by it — the two operations respond in opposite directions."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Directly reusing the Blueprint's own P77 4-problem gate set and P76
transfer probe, not restated in full — cite by reference:

**Gate 1** (Blueprint Problem 1): which is larger, 0.099 or 0.1? Pass:
0.1 (tenths: 0 vs. 1, decisive).

**Gate 2** (Blueprint Problem 2): compute 5.7+4.6, showing carrying.
Pass: 10.3, with the tenths-carry step shown.

**Gate 3** (Blueprint Problem 3): without fully computing, state
whether 12×0.75 and 12÷0.75 are bigger or smaller than 12. Pass:
12×0.75 smaller; 12÷0.75 bigger.

**Gate 4** (Blueprint Problem 4): evaluate a flawed digit-count-based
claim that 0.5 km is longer than 0.45 km, identifying the reasoning
error even though the numerical conclusion happens to be correct.
Pass: correctly identifies the invalid reasoning and the correct
place-value-based comparison.

**Gate 5** (Blueprint P76, independence transfer probe): a fabric
pricing/cutting scenario applying the same decimal (0.8) to a
multiplication and a division of $12.50, evaluating a claim that "both
should shrink since 0.8<1." Pass: correctly identifies the claim as
wrong for the division case, explaining the multiply-vs-divide
asymmetry.

**Mastery criterion**: 5/5 on the full Blueprint item bank (4 P77 items
+ P76), consistent with KG mastery_threshold 0.85 (⌈0.85×5⌉=5).

## Tutor Recovery Strategy

Likeliest utterance: "I thought 0.36 was bigger than 0.4 because it
has more digits, but I'm being told I'm wrong?" — the concept-specific
smaller question: "what's in the tenths place of each number?"
directly resolves MC-1 by pointing the learner at the single column
that decides the comparison, converting a vague digit-counting
intuition into a concrete, checkable place-value fact.

## Memory Hooks

**Type**: procedural (aligning and comparing decimal columns; carrying
across the decimal point in addition/subtraction) + declarative (the
multiply/divide-by-a-sub-1-factor direction asymmetry). Review form:
fresh decimal comparison and addition/subtraction problems with
varying digit lengths, periodically paired with a "predict the
direction before computing" multiply/divide prompt to keep MC-3's
guard-rail active. Interleaving partner: `math.arith.fractions` (the
part-whole intuition decimals restrict to power-of-10 denominators).

## Transfer Connections

**Near transfer**:
- `math.arith.percentages` (per KG `unlocks`; percentages are decimals
  scaled by 100, transferring the place-value and multiply/divide
  skills directly)
- `math.arith.rounding` (per KG `unlocks`; rounding decimals requires
  the identical column-by-column place-value reading established here)

**Far transfer**:
- `math.arith.fractions` (per KG `related`; decimals are fractions
  restricted to power-of-10 denominators, so decimal comparison and
  fraction comparison share the same underlying part-whole logic)

## Cross-Subject Connections

Per KG `cross_links` [] (empty) — no Tier 1 cross-subject link exists
for this concept, consistent with the Blueprint's own Component 7
GR-9 determination (P76_mode independence). Not fabricated beyond what
the KG and Blueprint state.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.arith.decimals.md`
(PACKAGE_READY, all structural/grammar/content/AIR checks PASS).

Full Protocol A teaching sequence (TA-A01 through TA-A04/mastery
gate), Protocol B repair actions (B01 through B03), and the P89
spaced-repetition schedule reused by reference above and not restated
in full; the Misconception Registry (MC-1 through MC-3) and the P77/P76
mastery-gate item bank cited directly by ID.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's two prerequisites
(`math.arith.fractions`, `math.arith.place-value`) and two unlocks
(`math.arith.percentages`, `math.arith.rounding`) match the Blueprint's
own Component 7 exactly. Its relatively high estimated hours (10) is
appropriate given the concept's genuine three-skill-cluster scope
(comparison, carrying addition/subtraction, multiply/divide direction
prediction) explicitly acknowledged in the Blueprint's own Teaching
Notes.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 4 part 1, autonomous loop) | Initial entry, grounded in the existing PACKAGE_READY Blueprint. |
