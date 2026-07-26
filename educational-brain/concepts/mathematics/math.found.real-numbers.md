# Real Numbers — `math.found.real-numbers`

## Identity

- **Concept ID**: `math.found.real-numbers` (canonical mathematics KG)
- **Curriculum location**: mathematics / foundations (no parent in KG;
  no children in KG)
- **Prerequisites**: `math.found.irrational-numbers`, `math.found.
  rational-numbers` (this concept synthesizes both directly: ℝ=ℚ∪(ℝ∖ℚ)).
- **Unlocks**: `math.func.real-valued-function`, `math.calc.limits`,
  `math.real.completeness`.
- **Related** (from KG): `math.found.complex-numbers`, `math.real.
  completeness-axiom`.
- **Difficulty**: developing · **Bloom**: understand · **Mastery
  threshold**: 0.85 · **Est. hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.found.
  real-numbers.md` (PACKAGE_READY; MAMR: MC-1 REAL-IS-DECIMAL is
  FOUNDATIONAL, cleared before MC-2 or MC-3 in all repair routing; P76
  cross-link mode, cross_links=[math.calc.limits, math.real.
  completeness]).
- **Aliases** (from KG): "ℝ", "real line", "continuum".

## Learning Objective

The learner can: correctly classify EVERY integer, rational, and
irrational number as real, recognizing ℝ as the UMBRELLA set (ℝ=ℚ∪(ℝ∖
ℚ)) rather than a special decimal-only category; state the
**completeness property** (every non-empty, bounded-above subset of ℝ
has a least upper bound in ℝ) and explain, via the {q∈ℚ:q²<2} example,
why ℚ fails this property while ℝ satisfies it; state the density
theorem (both a rational and an irrational exist strictly between any
two distinct reals); and explain why a convergent sequence of rationals
can have an irrational limit, and why this limit exists in ℝ but not in
ℚ.

## Core Understanding

`math.found.rational-numbers` and `math.found.irrational-numbers`
already establish ℚ and its complement ℝ∖ℚ. **ℝ is defined directly as
the union**: ℝ=ℚ∪(ℝ∖ℚ) — the UNIQUE complete ordered field containing
every rational and every irrational. Critically, ℝ is not a separate
category alongside integers and fractions — it is the UMBRELLA: every
natural number, every integer, every rational, and every irrational IS
a real number (ℕ⊂ℤ⊂ℚ⊂ℝ, and ℝ∖ℚ⊂ℝ too). "Real" contrasts with
"complex" (ℂ), never with "rational" or "integer." The single defining
structural feature that distinguishes ℝ from ℚ is **completeness**
(the least upper bound / LUB property): if A⊆ℝ is non-empty and
bounded above, then sup A∈ℝ exists. `math.found.rational-numbers`
already established ℚ is DENSE (a rational exists between any two
distinct rationals) but NOT complete; this concept makes that gap
concrete via A={q∈ℚ:q²<2} — A is non-empty (1∈A) and bounded above
(e.g., by 2), and its least upper bound would need to be √2, but
√2∉ℚ (per `math.found.irrational-numbers`'s own proof), so A has NO
supremum within ℚ. In ℝ, sup A=√2∈ℝ — the gap is filled. This is
precisely why `math.found.rational-numbers`'s own density-vs-
completeness distinction matters: density alone (no two elements are
adjacent) does NOT guarantee completeness (every bounded subset has a
supremum) — ℚ has the former but not the latter; ℝ has both. The
**density theorem** extends both directions: between any two distinct
reals a<b, a rational r exists with a<r<b, AND an irrational s exists
with a<s<b. Every real number has an infinite decimal expansion
(rational↔eventually repeating; irrational↔non-repeating,
non-terminating), but critically, a decimal string is a NAME for a
real number, not the number itself — the same real can have multiple
decimal names (0.999…=1; 0.5=0.4999…). Finally, completeness is what
makes **limits** well-defined: the rational sequence 1,1.4,1.41,
1.414,… converges to √2 — this sequence has NO limit within ℚ (since
√2∉ℚ) but converges in ℝ precisely because completeness guarantees the
limit of any bounded monotone (or Cauchy) sequence exists in ℝ — the
direct bridge to `math.calc.limits`.

## Mental Models

- **Beginner model — "real numbers are the ones with decimal points;
  integers and fractions are different, more basic categories"**: the
  learner treats "real" as a special decimal-notation category rather
  than the umbrella set containing every number type already
  encountered. Shelf-life warning: this model produces outright wrong
  classifications ("is 7 a real number?" answered "no") and blocks
  every downstream concept that assumes ℝ as a codomain or ambient set.
- **Intermediate model — "ℝ=ℚ∪(ℝ∖ℚ) is the umbrella containing every
  number type, and ℚ is dense but has gaps that ℝ fills"**: the learner
  correctly classifies all number types as real and can state that ℚ
  has gaps, but may not yet distinguish DENSITY from COMPLETENESS
  precisely, or may still see irrationals as rare exceptions. Upgrade
  trigger: being asked whether {q∈ℚ:q²<2} has a supremum within ℚ.
- **Advanced model — "ℝ is precisely characterized by the least-upper-
  bound completeness property — the single structural feature ℚ lacks
  — and this completeness is exactly why bounded sequences with
  irrational limits, like the rational approximations to √2, converge
  in ℝ but not in ℚ"**: the learner fluently applies the LUB property
  to identify suprema, distinguishes density from completeness with
  concrete counterexamples, and connects completeness directly to why
  limits require ℝ rather than ℚ. Upgrade trigger: being asked why ℝ,
  rather than ℚ, is the natural setting for calculus.
- **Do not upgrade early**: a learner still excluding integers or
  fractions from "real numbers" (beginner model, directly triggering
  MC-1) should not be pushed toward completeness or density reasoning
  (advanced model) before the umbrella-set framing is fully secure —
  MC-1 is FOUNDATIONAL per the Blueprint's own MAMR.

## Why Students Fail

The dominant, FOUNDATIONAL failure treats "real number" as meaning
"number with a decimal point" — a special, restrictive category
distinct from integers and fractions — missing that ℝ is the UMBRELLA
containing every number type already encountered (7 is real, 1/3 is
real, √2 is real; "real" contrasts only with "complex," never with
"rational" or "integer"). A second failure believes ℚ, being dense (a
rational always exists between any two rationals), is therefore
already "complete" with no gaps — directly confusing DENSITY with
COMPLETENESS, missing that {q∈ℚ:q²<2} is bounded above yet has no
supremum within ℚ (its supremum, √2, is irrational). A third failure,
inherited directly from `math.found.irrational-numbers`'s own MC-3,
believes irrational numbers are rare special cases, missing that ℚ is
countable while ℝ is uncountable, so ℝ∖ℚ is itself uncountable and
overwhelmingly more numerous than ℚ.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: REAL-IS-DECIMAL (Foundational; Type 3 — language contamination)
**Trigger**: "Is 7 a real number?" answered "no," or treating "real
number" as meaning specifically "number with an infinite non-repeating
decimal expansion."
**Diagnostic note**: classified Type 3 — the everyday phrase "real
number" SOUNDS like it names a distinct, special category (reinforced
by decimal representations of √2 or π being the most visually salient
examples), rather than the learner overgeneralizing from limited
examples.
**Repair**: every integer is real (7=7.000…), every rational is real
(1/3=0.333…), every irrational is real (√2, π, e). ℝ is the UNION
ℕ⊂ℤ⊂ℚ⊂ℝ (plus ℝ∖ℚ), not a separate category. "Real" contrasts with
"complex" (ℂ), not with "integer" or "rational." Mnemonic: REAL=RULER —
every point on a number line is real, regardless of type.
**MAMR**: FOUNDATIONAL — must be cleared before MC-2 or MC-3, since
every subsequent completeness discussion presupposes ℝ is correctly
understood as the umbrella containing all number types.

### MC-2: RATIONAL-IS-COMPLETE (Moderate; Type 3 — language contamination, directly inherited from `math.found.rational-numbers`'s own MC-2)
**Trigger**: "Since ℚ is dense, it has no gaps" or claiming
{q∈ℚ:q²<2} has a least upper bound within ℚ.
**Repair**: DENSITY (between any two rationals, another rational
exists) is NOT the same as COMPLETENESS (every bounded non-empty
subset has a supremum). A={q∈ℚ:q²<2} is non-empty (1∈A) and bounded
above (by 2), but its supremum would need to be √2, and √2∉ℚ — no
rational can be A's least upper bound (for any candidate r<√2, r²<2
puts r inside A rather than bounding it; for any r>√2, a smaller
upper bound exists between √2 and r). A has no supremum within ℚ. In
ℝ, sup A=√2∈ℝ.

### MC-3: IRRATIONALS-ARE-RARE (Moderate; Type 1 — overgeneralization, directly inherited from `math.found.irrational-numbers`'s own MC-3)
**Trigger**: believing named irrationals (√2, π, e) are rare special
cases, and "most" real numbers are rational.
**Repair**: reusing `math.found.countable-set`/`math.found.
uncountable-set`'s own machinery — ℚ is countable (listable); ℝ is
uncountable (Cantor's diagonal argument); so ℝ∖ℚ is itself uncountable.
In a precise measure-theoretic sense, ℚ occupies "measure zero" of the
real line — almost every real number is irrational. Named irrationals
are memorable, not numerous.

## Analogies

**Primary — the infinitely fine ruler (Blueprint's own analogy)**: a
ruler marked only in fractions can measure 1.5 cm, 1.41 cm, 1.414 cm —
but no matter how finely subdivided, some lengths (like a unit square's
diagonal, √2) fall between every possible fraction mark. The REAL
number line is the idealized, infinitely fine ruler where EVERY
conceivable length — rational or irrational — has a corresponding
mark. The ruler doesn't stop at fractions and doesn't skip irrational
lengths.

**Secondary — dense fog with hidden gaps (Blueprint's own analogy,
targets MC-2)**: ℚ is like a dense fog that appears to fill a room
completely, but there are genuine gaps between individual fog particles
even though the fog LOOKS continuous. ℚ appears to fill the number
line (density), but √2 is a specific gap no rational number can plug
(incompleteness).

**Anti-analogy to retire**: "Real numbers are what you get when you
write any number as a decimal." This directly invites MC-1 by framing
realness as a property of DECIMAL NOTATION rather than of the number
itself — 7 and 1/3 are just as real as √2, despite one having a
terminating decimal and the other a non-terminating irrational one.

## Demonstrations

**The umbrella classification (Blueprint's own contrast table)**: −7∈
ℤ⊂ℚ⊂ℝ; 0∈ℤ⊂ℚ⊂ℝ; 2/3∈ℚ⊂ℝ; √2∈ℝ∖ℚ⊂ℝ; π∈ℝ∖ℚ⊂ℝ; e∈ℝ∖ℚ⊂ℝ — all six ARE
real; being rational, irrational, integer, or natural never excludes a
number from ℝ.

**The completeness gap (Blueprint's own central demonstration)**:
A={q∈ℚ:q²<2} is non-empty and bounded above in ℚ, yet has no supremum
within ℚ (its would-be supremum is √2∉ℚ). In ℝ, sup A=√2∈ℝ exactly —
the gap that `math.found.rational-numbers`'s own density-without-
completeness distinction identified, now filled.

**Sequence convergence (breaks the "approximating is converging"
confusion)**: the sequence 1,1.4,1.41,1.414,1.4142,… (each term
rational) converges to √2 — this sequence has NO limit within ℚ (since
√2∉ℚ, it genuinely diverges as a sequence IN ℚ), but converges in ℝ
precisely because completeness guarantees the limit exists there.

**0.999…=1 (a standard, decisive surprise, directly reusing
`math.found.rational-numbers`'s own algebraic trick)**: x=0.999…,
10x=9.999…, 9x=9, x=1 — the same real number can have multiple decimal
representations; the decimal string is a NAME, not the number itself.

## Discovery Questions

Present the set A={q∈ℚ:q<√3} and ask the learner to find the SMALLEST
rational upper bound — the learner discovers, through repeated
attempts (each candidate rational upper bound admits a smaller one),
that no rational can serve as the least upper bound, directly
experiencing the completeness gap before it's stated formally.
Recommendation: guided discovery for the "no rational supremum exists"
insight (directly experiential from repeated candidate-testing); direct
instruction for the formal LUB property statement and the density
theorem (both directions), since precise quantifier structure requires
explicit scaffolding to state correctly.

## Teaching Sequence

MC-1 (real-is-decimal) is addressed first and is FOUNDATIONAL per the
Blueprint's own MAMR — it must be cleared before either MC-2 or MC-3,
since every subsequent completeness discussion presupposes ℝ's
umbrella-set framing is already accepted. MC-2 (rational-is-complete)
and MC-3 (irrationals-are-rare) are addressed FIFO after MC-1 clears
(per the Blueprint's Component 3 MAMR Enforcement).

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (real-is-decimal) | CONTRAST PAIR: umbrella classification table across integer/rational/irrational | Teaching Actions: SHOW §2 |
| MC-2 active (rational-is-complete) | DEMONSTRATION: the {q∈ℚ:q²<2} completeness-gap example | Teaching Actions: SHOW §3 |
| MC-3 active (irrationals-are-rare) | DEMONSTRATION: countable-ℚ vs. uncountable-ℝ abundance contrast | Teaching Actions: SHOW §3 |
| Ready for transfer | THOUGHT EXPERIMENT: (1+1/n)ⁿ→e sequence, completeness-guarantees-the-limit argument (Blueprint P76) | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "ℝ is the complete ordered field" rather than "ℝ is
all the numbers" — and distinguish "supremum" (least upper bound, may
or may not be in the set) from "maximum" (largest element, must be in
the set) explicitly, per the Blueprint's own Language Precision note.

**Wait-time**: After posing the {q∈ℚ:q²<2} supremum question, give
extended wait-time before revealing no rational supremum exists — let
the learner attempt several candidate rationals and discover each one
admits a smaller upper bound themselves.

**Load-bearing sentences**:
- "'Real' contrasts with 'complex,' never with 'integer' or
  'rational' — every number you've ever used is real."
- "Density means no two points are adjacent; completeness means every
  bounded set has a supremum — ℚ has the first, not the second."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Directly reusing the Blueprint's own P77 4-problem gate set and P76
transfer probe, not restated in full — cite by reference:

**Gate 1** (Blueprint Problem 1): classify −√16, 0.272727…(=3/11), ∛7,
0 by all applicable categories. Pass: correct multi-category
classification for each.

**Gate 2** (Blueprint Problem 2): for A={q∈ℚ:q³<5}, determine
non-emptiness, boundedness, sup A in ℝ, and whether sup A∈ℚ. Pass:
correct completeness-gap reasoning.

**Gate 3** (Blueprint Problem 3): prove an irrational number always
exists between any two distinct rationals. Pass: correct construction
(e.g., a+√2(b−a)/2).

**Gate 4** (Blueprint Problem 4): address the "0.999… and 1 are
different numbers" claim. Pass: correct algebraic-trick proof that
0.999…=1.

**Gate 5** (Blueprint P76, cross-link transfer probe, `math.calc.
limits`): given the sequence (1+1/n)ⁿ→e, determine whether each term is
rational, what completeness guarantees about the limit, whether e is
rational, and why ℝ (not ℚ) is the natural setting for limits. Pass:
correct completeness-based reasoning throughout.

**Mastery criterion**: 5/5 on the full Blueprint item bank (4 P77
problems + P76), consistent with KG mastery_threshold 0.85
(⌈0.85×5⌉=5).

## Tutor Recovery Strategy

Likeliest utterance: "wait, so is 7 a 'real number' or is it just an
integer?" — the concept-specific smaller question: "can 7 be placed
somewhere on the number line?" reframes the confusion from "real number
is a separate category from integer" (MC-1's language-contamination
root, treating category membership as mutually exclusive) to "every
number type sits inside the umbrella set ℝ," directly isolating MC-1
by grounding the umbrella framing in the shared number-line
representation every prior number-system concept has already used.

## Memory Hooks

**Type**: declarative (the ℝ=ℚ∪(ℝ∖ℚ) umbrella definition, the LUB
completeness property, the density theorem) + procedural (supremum-
finding for bounded rational sets, directly reusing `math.found.
rational-numbers`'s own density machinery extended into the
completeness gap). Review form: fresh {q∈ℚ:bounded condition} supremum-
finding prompts, periodically paired with a sequence-convergence
question (does this rational sequence converge in ℚ or only in ℝ?) to
keep the completeness-vs-density distinction active. Interleaving
partners: `math.found.rational-numbers` and `math.found.
irrational-numbers` (the two sets this concept's entire definition
synthesizes).

## Transfer Connections

**Near transfer**:
- `math.found.complex-numbers` (per KG `related`; the next and final
  extension in the ℕ⊂ℤ⊂ℚ⊂ℝ⊂ℂ chain, directly requiring ℝ)
- `math.real.completeness-axiom` (per KG `related`; the formal deepening
  of this concept's own LUB property into Cauchy sequences, Bolzano-
  Weierstrass, Heine-Borel)

**Far transfer**:
- `math.calc.limits` (completeness is the exact property that makes
  limits well-defined; the (1+1/n)ⁿ→e transfer probe bridges directly,
  per KG `cross_links`)
- `math.func.real-valued-function` (functions f:D→ℝ require ℝ as
  codomain, per KG `unlocks`)
- Numerical analysis: floating-point arithmetic's inherent inability to
  represent ℝ's completeness exactly is the direct practical
  consequence of this concept's own decimal-representation distinction

## Cross-Subject Connections

Per KG `cross_links` [`math.calc.limits`, `math.real.completeness`]:
neither has an Educational Brain entry yet (verified via directory
listing) — this entry's P76 transfer probe (the (1+1/n)ⁿ→e sequence)
directly anticipates `math.calc.limits`'s own content per the
Blueprint's own explicit cross-link declaration, to be genuinely
activated once that concept is authored. Not fabricated beyond what the
KG and Blueprint state.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.found.real-numbers.md`
(PACKAGE_READY, all structural/grammar/content validators + AIR PASS).

Full Protocol A teaching sequence (TA-A01 through TA-A04), Protocol B
repair chains (B-1 through B-3), and the P89 spaced-repetition schedule
reused by reference above and not restated in full; the Misconception
Registry (MC-1 through MC-3) and the P77/P76 mastery-gate item bank
cited directly by ID.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's two prerequisites
(`math.found.irrational-numbers`, `math.found.rational-numbers`) are
exactly sufficient to state ℝ as their union. Its three `unlocks`
(`math.func.real-valued-function`, `math.calc.limits`, `math.real.
completeness`) match the Blueprint's own Component 7 Output Unlocks
table exactly. Both KG `cross_links` targets remain unauthored (noted
above, not a defect). Estimated hours (5) and mastery threshold (0.85)
are appropriate for a concept synthesizing two prior number systems
into a single, structurally distinguishing property (completeness).

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.found domain, Wave 15, autonomous loop) | Initial entry, grounded in the existing PACKAGE_READY Blueprint. |
