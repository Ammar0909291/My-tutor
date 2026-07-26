# Irrational Numbers — `math.found.irrational-numbers`

## Identity

- **Concept ID**: `math.found.irrational-numbers` (canonical
  mathematics KG)
- **Curriculum location**: mathematics / foundations (no parent in KG;
  no children in KG)
- **Prerequisites**: `math.found.rational-numbers` (ℚ, its
  decimal characterization, and its density-without-completeness
  property — irrationals are defined directly as the complement ℝ∖ℚ).
- **Unlocks**: `math.found.real-numbers`.
- **Related** (from KG): `math.found.rational-numbers`, `math.found.
  real-numbers`.
- **Difficulty**: developing · **Bloom**: understand · **Mastery
  threshold**: 0.8 · **Est. hours**: 4
- **Blueprint**: `docs/curriculum/blueprints/math.found.
  irrational-numbers.md` (PACKAGE_READY; MAMR: MC-1
  IRRATIONAL-IMPRECISE is FOUNDATIONAL, cleared before MC-2 or MC-3 in
  all repair routing; P76_MODE independence, cross_links=[]).
- **Aliases** (from KG): "non-rational reals", "√2, π, e".

## Learning Objective

The learner can: state the formal definition of an irrational number
(a real number NOT expressible as p/q with p,q∈ℤ, q≠0) and correctly
apply the decimal-characterization diagnostic (non-terminating AND
non-repeating); follow and reproduce the proof-by-contradiction that √2
is irrational; correctly distinguish an irrational number as an EXACT
mathematical object from its rational decimal APPROXIMATIONS; and
explain why irrationals are NOT closed under addition or multiplication
while correctly stating that irrationals vastly outnumber rationals in
a precise cardinality sense.

## Core Understanding

`math.found.rational-numbers` already establishes ℚ={p/q:p,q∈ℤ,q≠0}
with its own decimal characterization (terminating or eventually
repeating) and its density-without-completeness property. An
**irrational number** is defined directly as the complement: a real
number that CANNOT be expressed as p/q — equivalently, ℝ∖ℚ. The
**decimal-characterization diagnostic** directly extends `math.found.
rational-numbers`'s own terminating/repeating rule: a real number is
irrational IFF its decimal expansion is BOTH non-terminating AND
non-repeating (terminating implies rational; non-terminating-but-
repeating also implies rational, per that concept's own algebraic-
trick machinery; only non-terminating AND non-repeating implies
irrational). The canonical proof, **√2 is irrational** (by
contradiction): assume √2=p/q in lowest terms (GCD(p,q)=1). Then
2=p²/q², so p²=2q², so p² is even, so p is even (p=2k). Substituting:
4k²=2q², so q²=2k², so q is even too. But both p and q even contradicts
GCD(p,q)=1 — contradiction. So √2∉ℚ. π, e, φ=(1+√5)/2, and ln(2) are
also irrational, though their proofs (Niven 1947 for π; Euler 1737 for
e) are not accessible at this level and are stated as facts with
references, not derived. Critically, irrationals are **NOT closed**
under + or ×: √2+(−√2)=0∈ℚ and √2×√2=2∈ℚ — sums and products of
irrationals CAN be rational — genuinely counterintuitive, since both ℚ
and ℝ themselves ARE closed under these operations. Finally, on
**abundance**: `math.found.countable-set` establishes ℚ is countable
(listable); `math.found.uncountable-set` establishes ℝ is uncountable
(via Cantor's diagonal argument) — therefore ℝ∖ℚ is itself uncountable,
meaning irrationals are not rare exceptions but VASTLY outnumber
rationals (ℚ has measure zero in ℝ; picking a real number "at random"
from an interval lands on a rational with probability exactly zero).

## Mental Models

- **Beginner model — "irrational numbers like √2 are basically just
  their decimal approximations, like 1.414"**: the learner conflates
  the exact mathematical object with a truncated, rational
  approximation of it. Shelf-life warning: this model cannot support
  any exact algebraic manipulation involving √2 (e.g., correctly
  computing (√2)²=2 exactly, versus (1.414)²=1.999396≠2).
- **Intermediate model — "an irrational number is exactly defined by
  its own precise property (e.g., 'the positive number whose square is
  2'), and its decimal expansion is non-terminating and non-repeating —
  distinct from any rational approximation to it"**: the learner
  correctly separates the exact object from its approximations and can
  apply the decimal diagnostic, but may still believe any non-
  terminating decimal is automatically irrational, or believe
  irrationals are rare special cases. Upgrade trigger: being asked to
  classify a specific non-terminating but clearly repeating decimal
  (e.g., 0.313131…).
- **Advanced model — "irrationals are precisely characterized by non-
  terminating, non-repeating decimals, are NOT closed under + or ×
  (unlike both ℚ and ℝ), and vastly outnumber rationals in a rigorous
  cardinality sense"**: the learner fluently reasons about which
  operations preserve or break irrationality, correctly predicts
  closure failures with counterexamples, and can state the countable-
  vs-uncountable abundance argument. Upgrade trigger: being asked
  whether the sum of two irrational numbers must always be irrational,
  with justification either way.
- **Do not upgrade early**: a learner still treating √2 as
  interchangeable with 1.414 (beginner model, directly triggering
  MC-1) should not be pushed toward closure-failure or abundance
  reasoning (advanced model) before the exact-vs-approximate distinction
  is fully secure — MC-1 is FOUNDATIONAL per the Blueprint's own MAMR.

## Why Students Fail

The dominant, FOUNDATIONAL failure treats an irrational number's
decimal approximation (1.414 for √2) as EQUAL to the number itself
rather than merely close to it, conflating the exact mathematical
object (defined by a precise property, like "the positive number whose
square is 2") with any finite rational truncation of its decimal
expansion — this becomes a genuine algebraic error the moment exact
computation is required (e.g., squaring √2 exactly versus squaring
1.414). A second failure over-generalizes the correct observation that
irrationals have non-terminating decimals into believing ANY non-
terminating decimal must be irrational, forgetting the repeating case
already established by `math.found.rational-numbers` (0.333… never
terminates, yet is fully rational). A third failure, arising from
irrationals typically being introduced in school as exceptional cases
(√2, π) against a rational "default," believes irrationals are rare or
unusual, missing that ℚ's own countability (`math.found.countable-set`)
against ℝ's uncountability (`math.found.uncountable-set`) means
irrationals vastly outnumber rationals — the reverse of the intuitive
impression.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: IRRATIONAL-IMPRECISE (Foundational; Type 4 — notation-induced)
**Trigger**: "√2 is not an exact number — it's just an approximation
like 1.414" or "irrational numbers are inexact."
**Diagnostic note**: classified Type 4 (notation-induced) rather than
Type 1 overgeneralization — the "=" sign is routinely, informally used
in place of "≈" when writing decimal approximations in casual
mathematical practice (e.g., "√2 = 1.414" on a calculator display),
directly training the learner to conflate the two relations at the
notation level, rather than the confusion arising from limited
examples.
**Repair**: √2 is the NUMBER: the exact, unique positive real number
whose square is 2, defined precisely by x²=2. 1.414 is a RATIONAL
APPROXIMATION: 1.414=1414/1000∈ℚ, and (1.414)²=1.999396≠2 — close but
NOT equal to √2. Analogy: "one-third" is exactly 1/3; writing 0.33 is
an approximation, not the number itself. Irrational numbers are EXACT
mathematical objects — their defining property is not imprecision, but
the impossibility of a finite fraction representation.

### MC-2: INFINITE-DECIMAL-IRRATIONAL (Moderate; Type 1 — overgeneralization)
**Trigger**: "Any decimal that goes on forever must be irrational" or
"0.333… is irrational because it never ends."
**Repair**: the correct test requires TWO conditions: non-terminating
AND non-repeating. Non-terminating but repeating decimals are
RATIONAL, per `math.found.rational-numbers`'s own algebraic-trick
machinery — 0.333…=1/3, 1/7=0.142857142857… (period 6), both fully
rational. Only non-terminating AND non-repeating (like 1.41421356… for
√2) indicates irrationality.

### MC-3: IRRATIONAL-RARE (Moderate; Type 1 — overgeneralization)
**Trigger**: "Irrational numbers are unusual special cases; most
numbers are rational" or "you only need irrationals for square roots."
**Repair**: ℚ is countable (`math.found.countable-set`'s own baseline,
listable via, e.g., 0,1,−1,1/2,−1/2,2,−2,1/3,…); ℝ is uncountable
(`math.found.uncountable-set`'s own Cantor diagonal argument).
Therefore ℝ∖ℚ is uncountable — irrationals are not rare, they vastly
outnumber rationals. Between any two rationals (e.g., 1.41 and 1.42)
lie infinitely many irrationals (e.g., √2≈1.41421356…).

## Analogies

**Primary — the diagonal that no ruler marked in fractions can measure
(Blueprint's own analogy)**: a unit square's diagonal, by the
Pythagorean theorem, has length √2 — a definite, physically measurable
distance. Yet no ruler marked ONLY in fraction subdivisions (however
finely divided) can ever land exactly on that mark; the diagonal
occupies a genuine "hole" in ℚ's dense-but-incomplete covering of the
number line — directly extending `math.found.rational-numbers`'s own
density-vs-completeness distinction with a concrete, constructible
example of exactly where a hole sits.

**Anti-analogy to retire**: "An irrational number is basically its
decimal expansion rounded to however many digits you need." This
directly invites MC-1 by suggesting the number IS its (necessarily
truncated, hence rational) decimal representation, rather than an
exact object that no finite decimal can ever fully capture.

## Demonstrations

**√2 is irrational (proof by contradiction, Blueprint's own proof)**:
assume √2=p/q, lowest terms. p²=2q²→p² even→p even (p=2k).
(2k)²=2q²→q²=2k²→q even. Both p,q even contradicts GCD(p,q)=1. So
√2∉ℚ.

**Decimal classification table (Blueprint's own pattern-induction
table)**: 3/4=0.75 terminates (rational); 1/3=0.333… repeats period 1
(rational); √2=1.41421356… neither terminates nor repeats (irrational);
π, e likewise (irrational, proofs not accessible here).

**Closure failure (breaks the "irrationals behave like ℚ or ℝ"
intuition)**: √2×√2=2∈ℚ; √2+(−√2)=0∈ℚ — both counterexamples to
closure under × and + respectively, despite ℚ and ℝ both being closed
under these same operations.

**Abundance contrast**: ℚ is listable (countable); ℝ is not
(uncountable, `math.found.uncountable-set`'s own Cantor diagonal
argument) — so ℝ∖ℚ is uncountable, and ℚ has measure zero in ℝ.

## Discovery Questions

Present the unit-square-diagonal construction and ask the learner to
try to find integers p,q with (p/q)²=2 exactly — the learner discovers,
through repeated failed attempts (or the proof-by-contradiction's own
logic once guided), that no such fraction can work, directly
experiencing the "hole in ℚ" before the formal proof is presented in
full. Recommendation: guided discovery for the "no fraction quite
works" insight (directly experiential from attempted construction);
direct instruction for the full proof-by-contradiction's formal steps
(the even/even parity argument) and the abundance argument (MC-3's
repair), since both require precise logical scaffolding not
independently rediscoverable.

## Teaching Sequence

MC-1 (irrational-imprecise) is addressed first and is FOUNDATIONAL per
the Blueprint's own MAMR — it must be cleared before either MC-2 or
MC-3, since every subsequent discussion of irrationals' exact
properties (closure failure, abundance) presupposes they're accepted
as exact objects, not approximations. MC-2 (infinite-decimal-
irrational) and MC-3 (irrational-rare) are addressed FIFO after MC-1
clears (per the Blueprint's Component 3 MAMR Enforcement): if both are
active, MC-2 is addressed before MC-3.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (irrational-imprecise) | WORKED EXAMPLE: exact-vs-approximate contrast table + (√2)² vs (1.414)² computation | Teaching Actions: SHOW §1 |
| MC-2 active (infinite-decimal-irrational overgeneralized) | WORKED EXAMPLE: decimal classification table tied to termination/repetition | Teaching Actions: SHOW §1 |
| MC-3 active (irrational-rare) | DEMONSTRATION: countable-ℚ vs. uncountable-ℝ abundance contrast | Teaching Actions: SHOW §3 |
| Ready for transfer | THOUGHT EXPERIMENT: surveyor's exact-vs-approximate diagonal-length problem (Blueprint P76) | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Use "≈" audibly and explicitly ("approximately equals")
whenever a decimal approximation of an irrational is spoken, never
"equals" — this distinction is exactly what MC-1 exploits when
notation blurs it.

**Wait-time**: After presenting the √2-is-irrational proof's parity
argument (p even, then q even), give extended wait-time before stating
the contradiction — let the learner notice the GCD(p,q)=1 clash
themselves.

**Load-bearing sentences**:
- "√2 is the exact number whose square is 2 — 1.414 is a rational
  number close to it, never equal to it."
- "Irrationals are NOT rare — ℚ is countable, ℝ is not, so irrationals
  vastly outnumber rationals."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Directly reusing the Blueprint's own P77 4-problem gate set and P76
transfer probe, not restated in full — cite by reference:

**Gate 1** (Blueprint Q1): classify √4, √5, 0.121212…, π as rational or
irrational. Pass: √4=2 rational; √5 irrational; 0.121212… rational
(=4/33); π irrational.

**Gate 2** (Blueprint Q2): state whether the product of two irrationals
is always irrational, with a counterexample if false. Pass: FALSE;
√2×√2=2∈ℚ.

**Gate 3** (Blueprint Q3): given √7's decimal begins 2.6457513…,
determine whether it terminates or repeats, and what this implies.
Pass: neither terminates nor repeats; √7 is irrational.

**Gate 4** (Blueprint Q4): identify the error in "π≈22/7, so π is
rational." Pass: correctly identifies the confusion of approximation
(≈) with equality (=).

**Gate 5** (Blueprint P76, independence transfer probe): surveyor's
exact-vs-approximate diagonal length problem. Pass: correctly
identifies √2 km as exact, 1.414 km as a rational approximation, with
justification.

**Mastery criterion**: 4/5 on the full Blueprint item bank (Q1-Q4 +
P76), consistent with KG mastery_threshold 0.8 (⌈0.80×5⌉=4).

## Tutor Recovery Strategy

Likeliest utterance: "isn't √2 basically the same as 1.414 for all
practical purposes?" — the concept-specific smaller question: "if you
square exactly 1.414, do you get exactly 2?" reframes the confusion
from "close enough counts as equal" (MC-1's practical-approximation
framing, which is genuinely valid for many real-world purposes) to
"mathematically, exact and approximate are fundamentally different
relations," directly isolating MC-1 while validating that the
learner's practical instinct is reasonable in engineering contexts,
just not in exact mathematics.

## Memory Hooks

**Type**: declarative (the exact-vs-approximate distinction, the
decimal-characterization diagnostic, the closure-failure fact, the
abundance argument) + procedural (the √2 proof-by-contradiction
structure, directly extending `math.found.rational-numbers`'s own
decimal-classification vocabulary into the complementary irrational
case). Review form: fresh decimal-classification prompts paired with a
closure true/false question, periodically paired with a short proof-
sketch reconstruction (e.g., for √5 or √3) to keep the proof-structure
skill active. Interleaving partners: `math.found.rational-numbers` (the
direct complement this concept's entire definition depends on) and
`math.found.uncountable-set`/`math.found.countable-set` (the abundance
argument's own source machinery).

## Transfer Connections

**Near transfer**:
- `math.found.real-numbers` (currently unauthored; ℝ=ℚ∪(ℝ∖ℚ), directly
  requiring both this concept and `math.found.rational-numbers` to be
  understood first, per KG `unlocks`)
- `math.found.uncountable-set` and `math.found.countable-set` (the
  direct source of this concept's abundance argument)

**Far transfer**:
- Numerical analysis and floating-point computing: every computed
  "irrational" value in software is necessarily a rational
  approximation, directly the practical instance of MC-1's exact-vs-
  approximate distinction
- Algebra and analysis: distinguishing algebraic irrationals (roots of
  polynomial equations, like √2) from transcendental irrationals (π,
  e, not roots of any polynomial with rational coefficients) — a finer
  classification building directly on this concept's baseline

## Cross-Subject Connections

None via KG `cross_links` (empty for this node), matching the
Blueprint's own explicit P76-independence declaration (the surveyor
transfer probe is self-contained, not cross-linked). Not fabricated
beyond what the KG and Blueprint state.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.found.
irrational-numbers.md` (PACKAGE_READY, V-1 through V-20 PASS, AIR
PASS).

Full Protocol A teaching sequence (TA-A01 through TA-A05), Protocol B
repair chains (TA-B01 through TA-B03), and the P89 spaced-repetition
schedule reused by reference above and not restated in full; the
Misconception Registry (MC-1 through MC-3) and the TA-A05 mastery-gate
item bank (Q1-Q4 + P76) cited directly by ID.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's single prerequisite
(`math.found.rational-numbers`) is exactly sufficient to state
irrationals as the complement ℝ∖ℚ. Its single `unlocks`
(`math.found.real-numbers`) matches the Blueprint's own Component 7
Output Unlocks table exactly. Estimated hours (4) and mastery threshold
(0.8) are appropriate for a concept combining one accessible formal
proof (√2's irrationality) with two genuinely counterintuitive results
(closure failure; abundance).

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.found domain, Wave 14, autonomous loop) | Initial entry, grounded in the existing PACKAGE_READY Blueprint. |
