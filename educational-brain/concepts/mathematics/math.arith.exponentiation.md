# Exponentiation — `math.arith.exponentiation`

## Identity

- **Concept ID**: `math.arith.exponentiation` (canonical mathematics
  KG)
- **Curriculum location**: mathematics / arithmetic — no parent in
  KG; children: `math.arith.exponent-rules`, `math.arith.
  square-numbers`, `math.arith.cube-numbers`
- **Prerequisites**: `math.arith.multiplication` (exponentiation is
  defined as iterated multiplication).
- **Unlocks**: `math.arith.square-roots`, `math.arith.
  scientific-notation`, `math.alg.exponent-rules`.
- **Related** (from KG): `math.arith.square-roots`, `math.alg.
  logarithm`.
- **Difficulty**: developing · **Bloom**: apply · **Mastery
  threshold**: 0.85 · **Est. hours**: 10
- **Blueprint**: `docs/curriculum/blueprints/
  math.arith.exponentiation.md` (PACKAGE_READY; MAMR: MC-1
  EXPONENT-MULTIPLIES-BASE is FOUNDATIONAL; P76_mode independence,
  cross_links=[math.alg.exponential-function, NOT Tier 1]).
- **Aliases** (from KG): "powers", "indices", "aⁿ".

## Learning Objective

The learner can: expand aⁿ as a chain of n copies of a multiplied
together and compute the result; correctly distinguish aⁿ from a×n,
recognizing the exponent counts multiplications, not additions or a
single multiplication by n; and correctly apply the special cases
a⁰=1 (for nonzero a) and a⁻ⁿ=1/aⁿ, deriving both from the pattern of
repeatedly dividing by the base as the exponent decreases.

## Core Understanding

Exponentiation aⁿ ("a to the power n") means multiplying a by itself n
times: aⁿ=a×a×…×a (n factors) — the base a is the repeated factor;
the exponent n counts how many times it appears. Exponentiation is
NOT a×n (multiplying the base by the exponent) and NOT a+a+…+a (adding
the base n times, which is actually ordinary multiplication a×n) —
exponentiation is a genuinely higher level in the
addition→multiplication→exponentiation "tower," where each level is
built from repeated application of the level below. Special cases,
derived from a decreasing-exponent PATTERN (each step dividing by a):
a⁰=1 for a≠0 (zero factors gives the multiplicative identity, not
zero — "zero multiplications" is fundamentally different from "zero
additions," which would give 0); a⁻ⁿ=1/aⁿ (extending the pattern below
zero, each further step continuing to divide by a).

## Mental Models

- **Beginner model — "aⁿ means multiply a by n"**: the learner
  computes 2³ as 2×3=6, treating the exponent as an ordinary
  multiplier rather than a repetition counter. Shelf-life warning:
  this model can produce correct-looking small values that aren't
  obviously wrong without checking against the true repeated-
  multiplication definition.
- **Intermediate model — "I correctly expand aⁿ as n copies of a
  multiplied together, but I sometimes add the copies instead of
  multiplying them, or believe a⁰=0"**: the learner has moved past
  treating the exponent as a simple multiplier but hasn't fully
  distinguished repeated multiplication from repeated addition, or
  hasn't derived the zero-exponent special case. Upgrade trigger:
  being asked to compute aⁿ step by step, explicitly multiplying (not
  adding) at each stage, and to derive a⁰ from the decreasing-exponent
  pattern.
- **Advanced model — "aⁿ is n factors of a multiplied together — a
  genuinely different, higher-level operation than a×n; a⁰=1 and
  a⁻ⁿ=1/aⁿ both follow directly from extending the decreasing-
  exponent division pattern; and this repeated-multiplication tower
  extends naturally to scientific notation's powers of 10"**: the
  learner fluently computes aⁿ for any positive integer n, correctly
  derives and applies both special cases, and recognizes the
  addition→multiplication→exponentiation hierarchy. Upgrade trigger:
  being asked to apply exponentiation directly to powers of 10 in a
  scientific-notation context.
- **Do not upgrade early**: a learner who still computes aⁿ as a×n
  (beginner model, MC-1) should not be pushed toward the special
  cases (intermediate/advanced models) before the repeated-
  multiplication definition itself is fully secure — MC-1 is
  FOUNDATIONAL per the Blueprint's own MAMR, since it confuses
  exponentiation with multiplication at the definitional level.

## Why Students Fail

The dominant, FOUNDATIONAL failure computes aⁿ as a×n (the base times
the exponent) rather than n copies of a multiplied together — 2³
computed as 2×3=6 instead of 2×2×2=8 — confusing the notation for
multiplication with the notation for exponentiation. A second, subtler
failure computes aⁿ as repeated ADDITION rather than repeated
MULTIPLICATION — 2³ computed as 2+2+2=6 (which is actually 2×3,
ordinary multiplication) rather than 2×2×2=8 — missing that
exponentiation is one level higher than multiplication in the same way
multiplication is one level higher than addition. A third failure
computes a⁰=0, reasoning "no factor, no value," rather than applying
the multiplicative-identity convention (a⁰=1) — over-generalizing
"zero of something gives zero" from addition's empty-sum rule, which
does not apply to multiplication's empty-product rule.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: EXPONENT-MULTIPLIES-BASE (Foundational; Type 4 — notation-induced)
**Trigger**: computes 2³ as 2×3=6 (or 5² as 5×2=10) — confuses the
superscript exponentiation notation with an ordinary inline
multiplication.
**Repair**: the exponent is a counter — it counts how many times the
base appears as a factor: 2³ means 2×2×2 (three 2s multiplied), not
2×3; memory anchor: the exponent sits "in the air" (superscript),
counting factors above the expression, never multiplying the base
directly.
**MAMR**: FOUNDATIONAL — confuses exponentiation with multiplication
at the definitional level; must be cleared before special-case and
extension work.

### MC-2: EXPONENT-ADDS-COPIES (Moderate; Type 1 — overgeneralization)
**Trigger**: computes 2³ as 2+2+2=6 (repeated addition) rather than
2×2×2=8 (repeated multiplication) — over-generalizes the
"multiplication is repeated addition" pattern one level too far.
**Repair**: 2+2+2=6 is actually 2×3 (ordinary multiplication, repeated
addition); 2×2×2=8 is 2³ (exponentiation, repeated multiplication) —
just as multiplication is repeated addition, exponentiation is
repeated multiplication, one level higher in the same tower.

### MC-3: ZERO-EXPONENT-GIVES-ZERO (Moderate; Type 1 — overgeneralization)
**Trigger**: computes a⁰=0, reasoning "zero multiplications gives
zero" — over-generalizes addition's empty-sum rule (zero additions
gives 0) onto multiplication's empty-product rule, which is different.
**Repair**: observe the decreasing-exponent pattern for base 5:
5⁴=625, 5³=125 (625÷5), 5²=25 (125÷5), 5¹=5 (25÷5), 5⁰=? (5÷5=1) —
each step divides by 5; one more step gives 5÷5=1, so 5⁰=1, not 0.

## Analogies

**Primary — paper folding and layer count (Blueprint's own opening
analogy)**: fold one sheet of paper once → 2 layers (2¹). Fold again →
4 layers (2²). Fold again → 8 layers (2³). The layer count doubles
(multiplies by 2) with each fold — the exponent counts the folds; each
fold multiplies the running total by the base. This is why 2³ means
2×2×2, not 2×3.

**Anti-analogy to retire**: "The exponent just tells you what to
multiply the base by." This directly invites MC-1 by describing the
exponent as a multiplier rather than a repetition counter.

## Demonstrations

**Expansion mechanics (Blueprint's own worked example pair)**: 3⁴ —
expand as 3×3×3×3 (4 copies), multiply left to right: 3×3=9, 9×3=27,
27×3=81. Result: 3⁴=81. Similarly 2⁵=2×2×2×2×2=32.

**Multiplication-vs-exponentiation contrast (Blueprint's own contrast
pair)**: 4×3=4+4+4=12 (three 4s added — multiplication) versus
4³=4×4×4=64 (three 4s multiplied — exponentiation); exponentiation
grows far faster than multiplication for the same inputs.

**Decreasing-exponent pattern (Blueprint's own pattern induction)**:
2⁴=16, 2³=8 (16÷2), 2²=4 (8÷2), 2¹=2 (4÷2), 2⁰=1 (2÷2), 2⁻¹=1/2 (1÷2),
2⁻²=1/4 (1/2÷2) — each step divides by 2, deriving both a⁰=1 and
a⁻ⁿ=1/aⁿ from one consistent pattern.

## Discovery Questions

Present the decreasing-exponent table for base 3 (3²=9, 3¹=3) and ask
the learner to predict 3⁰ by continuing the pattern (dividing by 3
each step) before the rule is stated — the learner discovers 3⁰=1
themselves from the pattern (3÷3=1), rather than being told to
memorize it. Recommendation: guided discovery for the zero-exponent
and negative-exponent special cases (directly experiential from
extending the decreasing-exponent division pattern); direct
instruction for the fundamental repeated-multiplication definition
itself and the exponentiation-vs-multiplication distinction (MC-1/
MC-2's repairs), since the base definition is not independently
rediscoverable without being demonstrated.

## Teaching Sequence

Per the Blueprint's own MAMR: MC-1 (exponent multiplies base) is
FOUNDATIONAL and cleared first — confuses exponentiation with
multiplication at the definitional level, so nothing later can be
correctly built without it. MC-2 (exponent adds copies) follows,
refining the repeated-multiplication definition against a subtler
repeated-addition confusion. MC-3 (zero exponent gives zero) is
addressed last, once the core repeated-multiplication definition is
secure, via the decreasing-exponent pattern.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (exponent multiplies base) | WORKED EXAMPLE: paper-fold layer-count analogy and expansion mechanics | Teaching Actions: SHOW §1 |
| MC-2 active (exponent adds copies) | DEMONSTRATION: multiplication-vs-exponentiation side-by-side contrast | Teaching Actions: SHOW §3 |
| MC-3 active (zero exponent gives zero) | DEMONSTRATION: decreasing-exponent pattern induction (base 5, dividing to reach 5⁰=1) | Teaching Actions: SHOW §3 |
| Ready for transfer | THOUGHT EXPERIMENT: powers of 10 in scientific notation, including 10⁰ (Blueprint P76) | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "how many copies multiplied" rather than "multiply
by the exponent" when introducing aⁿ — the repetition-counter framing
is load-bearing and directly guards against MC-1.

**Wait-time**: After presenting the decreasing-exponent pattern up to
2¹=2, give extended wait-time before revealing 2⁰=1 — let the learner
predict the next step (2÷2) themselves.

**Load-bearing sentences**:
- "The exponent counts factors, it doesn't multiply the base."
- "Zero exponent means zero multiplications — the multiplicative
  identity, 1 — not zero."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Directly reusing the Blueprint's own P77 4-problem gate set and P76
transfer probe, not restated in full — cite by reference:

**Gate 1** (Blueprint Problem 1): compute 3⁴, showing the expansion.
Pass: 81.

**Gate 2** (Blueprint Problem 2): compute 2⁵. Pass: 32.

**Gate 3** (Blueprint Problem 3): true/false — 5²=5×2=10. Pass: false;
5²=5×5=25.

**Gate 4** (Blueprint Problem 4): compute 7⁰. Pass: 1.

**Gate 5** (Blueprint P76, independence transfer probe): compute
10¹, 10², 10³, and 10⁰, identifying the pattern; expand 10⁸ as a full
number for the speed of light (3×10⁸ m/s). Pass: pattern correctly
identified (each power of 10 adds a zero); 10⁰=1; 10⁸=100,000,000
(9 digits total).

**Mastery criterion**: 5/5 on the full Blueprint item bank (4 P77 items
+ P76), consistent with KG mastery_threshold 0.85 (⌈0.85×5⌉=5).

## Tutor Recovery Strategy

Likeliest utterance: "I computed 2³ as 2×3=6, but you're saying that's
wrong?" — the concept-specific smaller question: "how many times does
2 appear if you write it out as a multiplication chain?" directly
redirects the learner from treating the exponent as a multiplier
toward correctly counting how many factors of the base should appear,
converting an abstract notational confusion into a concrete counting
task.

## Memory Hooks

**Type**: procedural (expanding aⁿ as a repeated-multiplication chain
and computing the result) + declarative (a⁰=1 and a⁻ⁿ=1/aⁿ, both
derived from the decreasing-exponent pattern). Review form: fresh
exponentiation prompts of varying bases and exponents, periodically
paired with a "is this aⁿ or a×n?" spot-check to keep MC-1's
guard-rail active. Interleaving partner: `math.arith.multiplication`
(the operation exponentiation is built from via repetition).

## Transfer Connections

**Near transfer**:
- `math.arith.square-roots` (per KG `unlocks`; the inverse of squaring,
  a^(1/2)×a^(1/2)=a, builds directly on the exponentiation definition)
- `math.arith.scientific-notation` (per KG `unlocks`; numbers written
  as c×10ⁿ directly use the powers-of-10 exponentiation this concept's
  transfer probe previews)
- `math.alg.exponent-rules` (per KG `unlocks`; the product rule
  aᵐ×aⁿ=aᵐ⁺ⁿ and power rule (aᵐ)ⁿ=aᵐⁿ all depend on the
  repeated-multiplication definition established here)

**Far transfer**:
- `math.alg.logarithm` (per KG `related`; logarithms are exponentiation's
  inverse operation)
- Compound interest, population growth, and other exponential-growth
  models directly build on repeated multiplication by a fixed base

## Cross-Subject Connections

Per KG `cross_links` [`math.alg.exponential-function`], NOT Tier 1:
P76_mode is independence per the Blueprint's own GR-9 determination —
the transfer probe instead uses a scientific-notation (powers-of-10)
context, a genuinely new applied setting rather than the cross-linked
concept itself.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.arith.exponentiation.md`
(PACKAGE_READY, all structural/grammar/content/AIR checks PASS).

Full Protocol A teaching sequence (TA-A01 through TA-A05/mastery
gate), Protocol B repair chains (B01 through B03), and the P89
spaced-repetition schedule reused by reference above and not restated
in full; the Misconception Registry (MC-1 through MC-3) and the P77/P76
mastery-gate item bank cited directly by ID.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's single prerequisite
(`math.arith.multiplication`) and three unlocks (`math.arith.
square-roots`, `math.arith.scientific-notation`, `math.alg.
exponent-rules`) match the Blueprint's own Component 7 exactly. Its
relatively high estimated hours (10) is appropriate given the
Blueprint's own note that this concept is a gateway for square roots,
scientific notation, and all subsequent exponent-rule algebra.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 6 part 1, autonomous loop) | Initial entry, grounded in the existing PACKAGE_READY Blueprint. |
