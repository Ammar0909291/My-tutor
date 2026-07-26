# Multiplication and Division of Fractions — `math.arith.fraction-multiplication`

## Identity

- **Concept ID**: `math.arith.fraction-multiplication` (canonical
  mathematics KG)
- **Curriculum location**: mathematics / arithmetic (parent:
  `math.arith.fractions`; children: `math.arith.fraction-reciprocal`)
- **Prerequisites**: `math.arith.fractions` (fraction notation).
- **Unlocks**: `math.arith.ratios`.
- **Related** (from KG): `math.arith.fraction-addition`.
- **Difficulty**: developing · **Bloom**: apply · **Mastery
  threshold**: 0.85 · **Est. hours**: 6
- **Blueprint**: `docs/curriculum/blueprints/math.arith.
  fraction-multiplication.md` (PACKAGE_READY, Educational Brain v1.0
  format; MAMR: MC-1 addition-algorithm-for-multiplication is
  FOUNDATIONAL for MC-2, must clear first; MC-3 independent;
  cross_links=[], P76 independence).
- **Aliases** (from KG): "multiplying fractions", "dividing fractions",
  "reciprocal".

## Learning Objective

The learner can: compute (a/b)×(c/d)=(ac)/(bd) by multiplying
numerators together and denominators together (never adding); compute
(a/b)÷(c/d)=(a/b)×(d/c) by multiplying by the divisor's reciprocal;
correctly multiply a whole number by a fraction by treating the whole
number as n/1; and explain the AREA MODEL justifying the multiplication
rule and the INVERSE-OPERATION justification for why dividing by a
fraction equals multiplying by its reciprocal — not merely execute both
algorithms by memorized procedure.

## Core Understanding

`math.arith.fractions` already establishes fraction notation. **Fraction
multiplication**: (a/b)×(c/d)=(ac)/(bd) — multiply numerators together,
denominators together. This is grounded in the **area model**: to
compute 2/3×3/4, draw a rectangle with 4 columns (denominator of 3/4)
and 3 rows (denominator of 2/3); shading 3 of 4 columns and 2 of 3 rows
produces a doubly-shaded region of 2×3=6 cells out of 3×4=12 total
cells — 6/12=1/2. In general: total cells=denominator product; shaded
cells=numerator product. **Fraction division**: (a/b)÷(c/d)=(a/b)×(d/c)
— multiply by the divisor's RECIPROCAL. This is grounded in the
inverse-operation relationship (directly reusing `math.arith.
fraction-reciprocal`'s own product-equals-1 definition): dividing by
c/d asks "how many times does c/d fit into a/b," and multiplying by
d/c (the reciprocal of c/d) is precisely the operation that "undoes"
multiplying by c/d. **Whole numbers**: a whole number n is secretly
n/1, so n×(a/b)=(n×a)/b — the whole number multiplies the numerator
ONLY (never the denominator). Word-problem operation selection follows
a consistent pattern: "a fraction OF an amount" signals multiplication;
"how many X-sized pieces fit into Y" signals division.

## Mental Models

- **Beginner model — "multiplying fractions works like adding them —
  find a common structure and combine top-with-top, bottom-with-
  bottom"**: the learner over-generalizes the addition procedure
  (which requires a common denominator) onto multiplication, producing
  answers like 1/2×1/3=2/5 (adding numerators and denominators).
  Shelf-life warning: this model produces answers LARGER than either
  original fraction, violating the intuition that "a fraction of a
  smaller fraction should be smaller still."
- **Intermediate model — "multiply numerators together and denominators
  together; to divide, flip the second fraction and multiply"**: the
  learner correctly executes both algorithms, but may not yet connect
  multiplication to the area model or explain why the reciprocal
  "undoes" division, and may still misplace whole numbers as
  denominators. Upgrade trigger: being asked to justify the algorithm
  using the area model rather than just applying it.
- **Advanced model — "the area model justifies (a/b)×(c/d)=(ac)/(bd)
  as counting shaded cells over total cells, and dividing by a
  fraction is multiplying by its reciprocal because reciprocal
  multiplication is the exact operation that undoes the divisor"**: the
  learner fluently connects both algorithms to their conceptual
  grounding and correctly selects operations from word-problem context
  ("of an amount" = multiply; "how many fit" = divide). Upgrade
  trigger: being asked to construct a word problem requiring fraction
  division and explain what signals the division operation.
- **Do not upgrade early**: a learner still applying the addition
  algorithm to multiplication (beginner model, directly triggering
  MC-1) should not be pushed toward division or whole-number extensions
  (advanced model) before the multiplication algorithm itself is
  secure — MC-1 is FOUNDATIONAL for MC-2 per the Blueprint's own MAMR.

## Why Students Fail

The dominant, foundational failure over-generalizes the addition
procedure (add numerators, add or find common denominators) onto
multiplication, since addition is the first and most heavily practiced
fraction operation — producing answers like 1/2×1/3=2/5 that are
larger than either factor, violating the logical expectation that a
fraction OF a smaller fraction should itself be smaller. A second
failure, dependent on the first being resolved, divides fractions by
dividing numerators and denominators SEPARATELY (3/4÷1/2 as
(3÷1)/(4÷2)=3/2) — an analogy to integer division that only
accidentally produces a clean answer when numerators and denominators
happen to divide evenly, failing for cases like 5/6÷2/3. A third,
independent failure places a whole number in the DENOMINATOR position
when multiplying (computing 3×2/5 as 2/15), pattern-matching "the
denominator tells you how many parts" onto any number appearing near
the fraction, without understanding the whole number's actual role.

## Misconceptions

Reusing the Blueprint's Misconception Registry (Educational Brain v1.0
format), birth-type classification added per this program's diagnostic
procedure — not re-derived:

### MC-1: Addition algorithm applied to multiplication (Foundational; Type 1 — overgeneralization)
**Trigger**: computes 1/2×1/3=2/5 (adds numerators, adds denominators)
or 2/6 (adds numerators, multiplies denominators).
**Root cause** (Blueprint's own): addition is the first and most
heavily practiced fraction operation; the "same denominator" procedure
is over-generalized to multiplication by familiarity.
**Repair**: the area model directly contradicts the additive answer —
folding a square in half then into thirds produces a doubly-shaded
region of 1/6, not 2/5; and 2/5>1/2, but a fraction OF a half must be
SMALLER than a half — a logical check the additive answer fails.
Multiply numerators together (top×top) and denominators together
(bottom×bottom).
**MAMR**: FOUNDATIONAL for MC-2 — division's algorithm uses correct
multiplication as a sub-step; a learner still carrying MC-1 will
produce an incorrect cross-check when MC-2's repair is attempted.

### MC-2: Dividing numerators and denominators separately (Moderate; Type 1 — overgeneralization)
**Trigger**: computes 3/4÷1/2 as (3÷1)/(4÷2)=3/2 — coincidentally
correct here, but fails for 5/6÷2/3 (5÷2 and 6÷3 don't divide evenly).
**Root cause** (Blueprint's own): analogy to integer division (6÷3=2
by dividing each part), over-generalizing positional symmetry.
**Repair**: dividing by c/d asks "how many times does c/d fit into
a/b" — multiplying by d/c (the reciprocal of c/d, directly reusing
`math.arith.fraction-reciprocal`'s own definition) is precisely the
operation that undoes multiplying by c/d. 5/6÷2/3=5/6×3/2=15/12=5/4 —
clean and verifiable; the separate-division method gives a non-clean,
unverifiable result for this pair.

### MC-3: Whole number placed in denominator (Moderate; Type 1 — overgeneralization)
**Trigger**: computes 3×2/5=2/15 (places 3 in the denominator
position).
**Root cause** (Blueprint's own): "the denominator tells you how many
parts" prompts denominator placement for any number appearing near a
fraction, pattern-matching position without understanding role.
**Repair**: write the whole number as a fraction first — 3=3/1 — then
apply the ordinary multiplication rule: 3/1×2/5=(3×2)/(1×5)=6/5. The
whole number multiplies the NUMERATOR only, since it occupies the
numerator position once written as n/1.

## Analogies

**Primary — the area model as a rectangle (Blueprint's own core
demonstration)**: fraction multiplication is finding the AREA of a
rectangle whose side lengths are the two fractions — the denominators
determine how finely the rectangle is subdivided (total cells); the
numerators determine how many subdivisions are shaded in each
direction (shaded cells). This directly explains why numerators
multiply together and denominators multiply together, rather than
addition's "same-size-parts" logic.

**Secondary — reciprocal as the "undo" operation (directly reuses
`math.arith.fraction-reciprocal`'s own "undo" scoop analogy)**:
dividing by c/d and multiplying by d/c are inverse moves — whatever c/d
did, d/c reverses it, which is exactly why "invert and multiply" works
as a division procedure rather than an arbitrary trick.

**Anti-analogy to retire**: "Multiplying fractions is like adding them,
just with a different combining rule for the bottoms." This directly
invites MC-1 by framing multiplication as a variant of the additive
combining procedure, rather than a fundamentally different (area-based)
operation.

## Demonstrations

**Area model for 2/3×3/4 (Blueprint's own worked example)**: a
rectangle with 4 columns and 3 rows; shading 3 columns and 2 rows
produces 2×3=6 doubly-shaded cells out of 3×4=12 total — 6/12=1/2.

**Reciprocal-division verification (breaks MC-2)**: 5/6÷2/3=5/6×3/2=
15/12=5/4; check by multiplying back: 5/4×2/3=10/12=5/6 ✓ — the
separate-division method (5÷2)/(6÷3) does not produce a clean or
verifiable result for this pair.

**Whole-number-as-n/1 (breaks MC-3)**: 4×3/7: write 4 as 4/1, then
4/1×3/7=(4×3)/(1×7)=12/7 — the whole number multiplies the numerator
only.

**Word-problem operation selection**: "you use 2/3 of a 3/4 kg bag of
flour" (multiplication: a FRACTION OF an amount, 2/3×3/4=1/2 kg)
versus "a ribbon is 5/6 m; you cut pieces each 1/4 m — how many
pieces?" (division: HOW MANY fit, 5/6÷1/4=10/3 pieces).

## Discovery Questions

Present the area-model fold activity from the Blueprint's own TA-A01:
fold a square paper in half (shade 1/2), then fold that shaded half
into thirds — the learner counts the resulting doubly-shaded region
directly (1 of 6 equal regions) and discovers 1/2×1/3=1/6 by direct
observation, before the algorithm is stated abstractly. Recommendation:
guided discovery for the area-model construction insight (directly
experiential from physical folding); direct instruction for the
reciprocal-division justification (MC-2's repair) and the
whole-number-as-n/1 rule (MC-3's repair), since both require an
explicit conceptual bridge (the inverse-operation argument;
the fraction-form rewriting) not independently rediscoverable.

## Teaching Sequence

MC-1 (addition algorithm applied to multiplication) is addressed first
and is FOUNDATIONAL per the Blueprint's own MAMR — it must be cleared
before MC-2, since division's algorithm relies on correct
multiplication as a verification sub-step. MC-3 (whole number placed
in denominator) is independent and may be addressed alongside or after
MC-1, per the Blueprint's own protocol structure. MC-2 (dividing
numerators/denominators separately) is addressed once MC-1 is cleared,
as the division-specific extension of the same underlying algorithm
family.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (addition algorithm for multiplication) | WORKED EXAMPLE: area-model fold demonstration + logical size-check (result must be smaller) | Blueprint TA-C02 |
| MC-2 active (dividing parts separately) | WORKED EXAMPLE: reciprocal-multiplication verification on a pair that fails the separate-division shortcut | Blueprint TA-C03 |
| MC-3 active (whole number in denominator) | WORKED EXAMPLE: n=n/1 rewriting before multiplication | Blueprint TA-C04 |
| Ready for transfer | THOUGHT EXPERIMENT: recipe-scaling word problem requiring operation selection (Blueprint P76) | Blueprint TA-A07 mastery gate |

## Voice Teaching Notes

**Register**: Say "multiply straight across — top times top, bottom
times bottom" for multiplication, and "flip the second fraction, then
multiply" for division — keep the two algorithms verbally distinct,
since blurring them invites cross-contamination between MC-1 and MC-2.

**Wait-time**: After presenting the area-model rectangle for a new
fraction pair, give extended wait-time before revealing the cell count
— let the learner count total and shaded cells themselves.

**Load-bearing sentences**:
- "A fraction OF a smaller fraction must be smaller — if your answer
  is bigger than both factors, something went wrong."
- "Dividing by a fraction means multiplying by its reciprocal — that's
  the operation that undoes it."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Directly reusing the Blueprint's own 5-probe mastery gate (Educational
Brain v1.0 format), not restated in full — cite by reference:

**Gate 1** (Blueprint P77): write and solve one fraction×fraction
problem and one fraction÷fraction problem, using fractions not
previously used in the session. Pass: both correct with working shown.

**Gate 2** (Blueprint P76, independence transfer): a car travels 2/3
km per minute; how far in 3/4 minute? Pass: 2/3×3/4=1/2 km (correctly
identifies multiplication, not division).

**Gate 3** (Blueprint P75, boundary probe): what is (5/8)÷(5/8)?
what is (5/8)×(8/5)? are these the same, and what does this illustrate?
Pass: both=1; a/b×b/a=1 because reciprocals multiply to 1, and dividing
by a fraction is multiplying by its reciprocal.

**Gate 4** (Blueprint P74, classification): label each as multiply or
divide: (a) 3/5 of 4/7 (b) how many 1/4 lengths in 3/8 (c) 5/6×?. Pass:
(a) multiply, (b) divide, (c) multiply, with correct computation.

**Gate 5** (Blueprint P78, explanation): explain in one sentence why
(a/b)×(c/d)=(ac)/(bd) is not the same as fraction addition. Pass:
correctly distinguishes area-counting (multiplication) from
common-denominator combining (addition).

**Mastery criterion**: 5/5, consistent with KG mastery_threshold 0.85.

## Tutor Recovery Strategy

Likeliest utterance: "why is 1/2 times 1/3 SMALLER than both of them —
doesn't multiplying make things bigger?" — the concept-specific smaller
question: "if you take half of a third of a pizza, do you end up with
more pizza or less pizza than a third alone?" reframes the confusion
from "multiplication always grows a number" (an intuition trained on
whole numbers ≥1) to "taking a FRACTION of something smaller than 1
shrinks it," directly addressing the size-intuition gap that makes
MC-1's inflated additive answer (2/5) feel plausible in the first
place.

## Memory Hooks

**Type**: procedural (area-model construction for multiplication,
reciprocal-multiplication for division, directly reusing `math.arith.
fraction-reciprocal`'s own product-test machinery for the division
step) + declarative (the area-model justification, the
inverse-operation justification for division). Review form: fresh
multiplication-and-division pairs requiring operation selection from
word-problem context, periodically paired with a whole-number×fraction
prompt to keep MC-3's guard-rail active. Interleaving partner:
`math.arith.fraction-reciprocal` (the child concept this concept's
division algorithm directly depends on).

## Transfer Connections

**Near transfer**:
- `math.arith.fraction-reciprocal` (per KG `children`; the reciprocal
  concept this concept's own division algorithm directly requires)
- `math.arith.ratios` (per KG `unlocks`; ratio simplification and
  scaling directly reuse fraction multiplication)

**Far transfer**:
- `math.arith.fraction-addition` (per KG `related`; the direct contrast
  case — addition requires common denominators, multiplication does
  not, a distinction this concept's own MC-1 repair makes explicit)
- Physics/chemistry: unit-rate and dimensional-analysis calculations
  (e.g., converting speed×time) directly apply fraction multiplication

## Cross-Subject Connections

None via KG `cross_links` (empty for this node), matching the
Blueprint's own explicit P76-independence declaration (the rate×time
transfer probe is self-contained). Not fabricated beyond what the KG
and Blueprint state.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.arith.
fraction-multiplication.md` (PACKAGE_READY, all 20 V-checks PASS,
Educational Brain v1.0 format).

Full Student State Protocols (A-E), the Misconception Registry (MC-1
through MC-3), and the 5-probe mastery gate reused by reference above
and not restated in full.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's single prerequisite
(`math.arith.fractions`) is exactly sufficient to state both
algorithms. Its single `unlocks` (`math.arith.ratios`) matches the
Blueprint's own stated purpose, and its KG `children` correctly
includes `math.arith.fraction-reciprocal` (authored this same wave, in
the reverse dependency direction — reciprocal requires only
`math.arith.fractions` directly, not this concept, confirmed via the
live KG). Estimated hours (6) and mastery threshold (0.85) are
appropriate for a concept combining two distinct algorithms (one
compact, one requiring a genuine conceptual inversion) with three
independent misconception risks.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 2, autonomous loop) | Initial entry, grounded in the existing PACKAGE_READY Blueprint (Educational Brain v1.0 format). |
