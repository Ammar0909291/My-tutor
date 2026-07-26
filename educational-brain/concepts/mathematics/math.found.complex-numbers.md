# Complex Numbers — `math.found.complex-numbers`

## Identity

- **Concept ID**: `math.found.complex-numbers` (canonical mathematics
  KG)
- **Curriculum location**: mathematics / foundations (no parent in KG;
  no children in KG) — the FINAL concept in the `math.found` domain
  (82/82 upon this entry's completion)
- **Prerequisites**: `math.found.real-numbers` (ℝ, square roots, and
  why x²=−1 has no real solution — the direct motivation for this
  concept's extension).
- **Unlocks**: `math.alg.complex-polynomial-roots`, `math.cx.
  complex-numbers-analysis`.
- **Related** (from KG): `math.found.real-numbers`, `math.trig.
  polar-form-complex`.
- **Difficulty**: proficient · **Bloom**: understand · **Mastery
  threshold**: 0.8 · **Est. hours**: 8
- **Blueprint**: `docs/curriculum/blueprints/math.found.
  complex-numbers.md` (PACKAGE_READY; MAMR: MC-1
  SQRT-NEGATIVE-UNDEFINED is FOUNDATIONAL; P76_mode cross-link-probe,
  cross_links=[math.cx.complex-numbers-analysis, math.trig.
  polar-form-complex]).
- **Aliases** (from KG): "ℂ", "imaginary numbers", "a + bi".

## Learning Objective

The learner can: state the definition of ℂ={a+bi:a,b∈ℝ, i²=−1},
correctly understanding i as a DEFINED number (not a computed one);
perform complex arithmetic (addition, multiplication), always
substituting i²=−1 to fully simplify; plot complex numbers on the
complex plane and compute the modulus |a+bi|=√(a²+b²); apply the
powers-of-i cycle (period 4) to simplify any integer power of i; and
correctly state that ℝ⊂ℂ (every real number is complex with b=0),
never treating "complex" as meaning "not real."

## Core Understanding

`math.found.real-numbers` already establishes that x²+1=0 has NO
solution within ℝ (equivalently, √(−1) is undefined over ℝ). **ℂ is
constructed by declaring, by DEFINITION, a new number i satisfying
i²=−1** — this is the SAME kind of move as extending ℚ to include √2:
i is not computed FROM anything, it is declared to exist, and once
accepted, all of algebra remains consistent. **ℂ={a+bi:a,b∈ℝ}**, with
a called the real part and b the imaginary part. **Arithmetic**:
addition combines real and imaginary parts separately
((a+bi)+(c+di)=(a+c)+(b+d)i); multiplication expands algebraically and
then MANDATORILY substitutes i²=−1 to eliminate every i² term
((a+bi)(c+di)=(ac−bd)+(ad+bc)i). The **complex plane** represents
a+bi as the point (a,b): the real axis horizontal, the imaginary axis
vertical; the **modulus** |a+bi|=√(a²+b²) is the distance from the
origin (Pythagorean theorem, directly reusing `math.found.
real-numbers`'s own number-line geometric intuition extended to two
dimensions). Critically, multiplication in ℂ encodes ROTATION AND
SCALING geometrically — multiplying by i rotates a point 90°
anticlockwise — a genuinely two-dimensional structure with no analogue
in ℝ's one-dimensional line. **Powers of i cycle with period 4**:
i¹=i, i²=−1, i³=i²·i=−i, i⁴=i³·i=−i²=1, i⁵=i⁴·i=i (the cycle
restarts) — so iⁿ is determined entirely by n mod 4, and {1,i,−1,−i}
forms a cyclic group of order 4 under multiplication. Finally, ℝ⊂ℂ:
every real number a equals a+0i, making ℝ literally the real AXIS of
the complex plane, a proper SUBSET of ℂ — "complex" is a historical
term meaning "a+bi form," never a claim of "not real"; the purely
imaginary numbers (a=0, b≠0) are the ones that are genuinely NOT real,
and 0=0+0i is the unique number that is both real and purely
imaginary.

## Mental Models

- **Beginner model — "i is computed as √(−1), and since square roots
  of negative numbers don't exist, i must be some kind of fictional or
  invalid object"**: the learner correctly recalls that √(−1) is
  undefined over ℝ, but incorrectly applies that fact to conclude i
  itself is illegitimate, missing that i is DEFINED rather than
  computed. Shelf-life warning: this model treats every subsequent
  complex-number computation as suspect or "not really valid math."
- **Intermediate model — "i is a new number, DECLARED by the rule
  i²=−1, and ℂ=ℝ² with a specific rotation-and-scaling multiplication
  rule; every i² in a computation must be substituted with −1"**: the
  learner correctly accepts i's definitional status and reliably
  applies the i²=−1 substitution, but may still treat "complex" and
  "real" as disjoint categories, or leave i as an unreduced symbolic
  term in edge cases. Upgrade trigger: being asked whether a specific
  real number, like 7, is also complex.
- **Advanced model — "ℂ is the algebraically complete two-dimensional
  extension of ℝ, ℝ⊂ℂ as the real axis, multiplication is
  geometrically rotation+scaling, and the powers-of-i cycle reflects a
  cyclic group structure"**: the learner fluently moves between
  algebraic and geometric representations, correctly classifies every
  number by its real/imaginary/complex status, and predicts geometric
  effects of multiplication from magnitude and angle. Upgrade trigger:
  being asked to interpret multiplying two complex numbers
  geometrically (magnitudes multiply, angles add).
- **Do not upgrade early**: a learner still doubting i's legitimacy as
  a defined mathematical object (beginner model, directly triggering
  MC-1) should not be pushed toward geometric rotation-and-scaling
  reasoning (advanced model) before the definitional status of i is
  fully secure — MC-1 is FOUNDATIONAL per the Blueprint's own MAMR.

## Why Students Fail

The dominant, FOUNDATIONAL failure believes i is computed as √(−1) and
therefore inherits the "undefined" status square roots of negatives
carry over ℝ, missing that i is instead DEFINED by declaration (i²=−1)
— exactly the same kind of extension move that introduced √2 into ℚ —
and that once accepted, this definition makes all of complex algebra
internally consistent. A second failure treats i as an unspecified
algebraic variable (like x), leaving i² unsimplified in final answers
rather than treating the substitution i²=−1 as a MANDATORY reduction
step, not an optional simplification. A third failure interprets the
everyday-English connotation of "complex" (meaning "complicated" or
"not simple") as implying "not real," believing ℝ and ℂ are disjoint
categories, missing that ℝ⊂ℂ — every real number a equals a+0i and is
therefore genuinely complex as well as real.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: SQRT-NEGATIVE-UNDEFINED (Foundational; Type 4 — notation-induced)
**Trigger**: "You can't take the square root of −1, so i is not a real
mathematical object."
**Diagnostic note**: classified Type 4 (notation-induced) rather than
Type 1 overgeneralization — the specific symbol "√(−1)" is what
triggers the confusion, since prior instruction correctly states this
symbolic expression is undefined over ℝ; the learner correctly imports
that rule but fails to notice the number system has been extended,
making it a notation-carryover error rather than a broad
overgeneralization from examples.
**Repair**: i is NOT computed from anything — it is DECLARED to exist,
defined by the rule i²=−1. This is the same move as extending ℚ by
declaring √2 exists (per `math.found.irrational-numbers`'s own
extension pattern) or extending ℕ by declaring negative integers exist
(per `math.found.integers`'s own extension pattern). Once accepted,
all of algebra remains consistent — the payoff is the Fundamental
Theorem of Algebra: every polynomial has a root in ℂ, unlike in ℝ.
**MAMR**: FOUNDATIONAL — must be cleared before MC-2 or MC-3, since
every subsequent computation or classification presupposes i's
legitimacy as a defined number.

### MC-2: I-IS-JUST-A-SYMBOL (Moderate; Type 1 — overgeneralization)
**Trigger**: leaving i² unsimplified in a final answer, e.g.
"(2+i)(3+i)=6+2i+3i+i²=6+5i+i²" without substituting i²=−1.
**Repair**: i is NOT a variable like x — it is a specific, defined
number satisfying i²=−1. Every time i² appears in a computation, it
MUST be replaced with −1 — this is a mandatory rule, not an aesthetic
simplification choice. There is only one value for i²: −1.

### MC-3: COMPLEX-NUMBERS-ARE-NOT-REAL (Moderate; Type 3 — language contamination)
**Trigger**: "7 is not complex — it's real, not imaginary," treating
ℝ and ℂ as disjoint categories.
**Diagnostic note**: classified Type 3 — the everyday-English sense of
"complex" ("complicated," "not simple") is imported directly as the
technical meaning, invited by the word's surface form rather than the
learner overgeneralizing from limited examples.
**Repair**: every real number a equals a+0i, making it genuinely
complex with b=0. ℝ is literally the real AXIS of the complex plane —
a proper subset of ℂ, not a disjoint category. "Complex" is a
historical term meaning "a+bi form," never a claim of "not real." The
purely imaginary numbers (a=0, b≠0) are the ones that ARE genuinely
not real; 0=0+0i is the unique number that is both real and purely
imaginary.

## Analogies

**Primary — extending the number line into a number plane (directly
extends `math.found.real-numbers`'s own ruler analogy)**: just as ℝ
extended ℚ by declaring irrational lengths (like √2) exist to fill
gaps on the number LINE, ℂ extends ℝ by declaring a new dimension
exists — the imaginary axis — turning the one-dimensional number line
into a two-dimensional number PLANE. Every real number still has its
place (on the horizontal axis), but now there's a whole vertical
direction of new numbers too.

**Secondary — multiplication as rotation (Blueprint's own geometric
insight)**: multiplying a complex number by i is like rotating a
clock hand 90° anticlockwise around the origin — the number's distance
from the origin stays the same, but its direction changes by exactly a
quarter-turn. This is a genuinely new kind of "multiplication" with no
analogue in ℝ, where multiplying only scales (and possibly flips
direction by 180°, never 90°).

**Anti-analogy to retire**: "i is basically a placeholder for
'undefined,' like dividing by zero." This directly invites MC-1 by
equating i's status with a genuine mathematical impossibility (division
by zero), rather than a legitimate, internally consistent DEFINITION
that extends the number system, exactly as √2 and negative integers
did at earlier stages.

## Demonstrations

**Definitional extension (breaks MC-1)**: x²+1=0 has no solution in
ℝ. We DECLARE i satisfies i²=−1 (not computed — declared, exactly as
√2 was declared to exist when extending ℚ). Now x=i and x=−i solve
x²+1=0.

**Mandatory i² substitution (breaks MC-2)**: (2+3i)(1−2i)=2−4i+3i−6i²
=2−i−6(−1)=2−i+6=8−i — the i² term is ALWAYS eliminated via
substitution, never left unsimplified.

**The complex plane and modulus**: z=3−4i plots at point (3,−4);
|z|=√(3²+(−4)²)=√25=5, directly reusing the Pythagorean-distance
intuition.

**ℝ⊂ℂ (breaks MC-3)**: 7=7+0i is complex (b=0, purely real); −5i=0−5i
is purely imaginary, NOT real (a=0, b≠0); 0=0+0i is the unique number
that is both real and purely imaginary.

**Powers-of-i cycle**: i¹=i, i²=−1, i³=−i, i⁴=1, i⁵=i (cycle
restarts, period 4). i²²: 22 mod 4=2 → i²²=−1 (verified:
i²²=(i²)¹¹=(−1)¹¹=−1). i⁴⁷: 47 mod 4=3 → i⁴⁷=−i.

## Discovery Questions

Present x²+1=0 and ask the learner what number, squared, gives −1 —
after establishing no real number works, ask them to simply DECLARE
such a number exists and name it i, then explore what consequences
follow (i²=−1 by declaration, so i³=i²·i=−i, and so on) — the learner
discovers the powers-of-i cycle largely unaided by repeated
multiplication, directly experiencing the definitional-extension move
before it's stated formally. Recommendation: guided discovery for the
powers-of-i cycle (directly experiential from repeated multiplication
by i); direct instruction for the complex-plane-as-rotation-and-scaling
geometric interpretation, since that connection requires explicit
scaffolding (the magnitude-multiplies/angle-adds pattern) not
independently rediscoverable from arithmetic alone.

## Teaching Sequence

MC-1 (sqrt-negative-undefined) is addressed first and is FOUNDATIONAL
per the Blueprint's own MAMR — it must be cleared before either MC-2 or
MC-3, since every subsequent computation or classification presupposes
i's legitimacy as a defined number. MC-3 (complex-numbers-are-not-real)
is addressed second (per the Blueprint's own TA-A02 sequencing, before
TA-A03's powers-of-i content), since classification concepts naturally
precede the arithmetic-heavy powers-of-i work. MC-2
(i-is-just-a-symbol) is addressed third, once several multiplication
examples have already been worked, as the specific execution-level
habit of mandatory i² substitution.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (sqrt-negative-undefined) | CONTRAST PAIR: "computed vs. declared" framing, parallel to √2's own extension | Teaching Actions: SHOW §2 |
| MC-3 active (complex-numbers-are-not-real) | CONTRAST PAIR: ℝ-vs-ℂ critical contrast table (dimension, ordering, multiplication) | Teaching Actions: SHOW §2 |
| MC-2 active (i-is-just-a-symbol) | WORKED EXAMPLE: mandatory i² substitution across multiple products | Teaching Actions: SHOW §1 |
| Ready for transfer | THOUGHT EXPERIMENT: z₁·z₂ magnitude-multiplies/angle-adds interpretation (Blueprint P76, cross-linking `math.trig.polar-form-complex`) | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "i is DEFINED by i²=−1" rather than "i EQUALS
√(−1)" — the Blueprint's own explicit word-choice guidance: avoid
calling ℂ "imaginary" at any point, since this reinforces MC-1; always
say "complex numbers" or "the number i defined by i²=−1."

**Wait-time**: After presenting a multiplication like (1+i)², give
extended wait-time before revealing the i²=−1 substitution step — let
the learner notice the unsimplified i² term and decide what to do with
it themselves.

**Load-bearing sentences**:
- "i is not computed — it's declared, exactly the same move as
  declaring √2 exists when we extended ℚ."
- "Every real number is complex with b=0 — 'complex' contrasts with
  nothing real, it's the umbrella, just as ℝ was for ℚ and irrationals."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Directly reusing the Blueprint's own P77 4-problem gate set and P76
transfer probe, not restated in full — cite by reference:

**Gate 1** (Blueprint Item 1): compute (2+3i)(1−2i) fully simplified.
Pass: 8−i.

**Gate 2** (Blueprint Item 2): compute i³¹. Pass: −i (31 mod 4=3).

**Gate 3** (Blueprint Item 3): state whether every real number is also
complex (true/false, directly addressing MC-3). Pass: TRUE, correctly
justified via a=a+0i.

**Gate 4** (Blueprint Item 4): plot z=−2+3i and compute |z|. Pass:
point (−2,3); |z|=√13.

**Gate 5** (Blueprint P76, cross-link transfer probe, `math.trig.
polar-form-complex`): given z₁=1+i, z₂=1−i, find moduli and angles,
compute z₁·z₂, and interpret the product geometrically. Pass: correct
moduli (√2 each), correct product (2, real), correct
magnitude-multiplies/angle-adds interpretation.

**Mastery criterion**: 4/5 on the full Blueprint item bank (4 P77 items
+ P76), consistent with KG mastery_threshold 0.8 (⌈0.80×5⌉=4).

## Tutor Recovery Strategy

Likeliest utterance: "isn't i just made up — there's no REAL number
that squares to −1" — the concept-specific smaller question: "when we
first said irrational numbers like √2 exist, was that a computation or
a declaration that extended what 'number' meant?" reframes the
confusion from "i is fictional because √(−1) is undefined" (MC-1's
notation-carryover root) to "number systems have always been extended
by declaration when the old system couldn't answer a question,"
directly isolating MC-1 by connecting it to the learner's own already-
accepted prior extensions (irrationals, negative integers).

## Memory Hooks

**Type**: procedural (complex arithmetic with mandatory i² substitution,
directly extending `math.found.real-numbers`'s own algebraic
manipulation vocabulary) + declarative (the definitional-extension
framing, the powers-of-i cycle, the ℝ⊂ℂ subset relation). Review form:
fresh multiplication-and-simplify prompts paired with a real/complex
classification question, periodically paired with a powers-of-i
mod-4 computation to keep the cycle pattern active. Interleaving
partner: `math.found.real-numbers` (the direct prerequisite this
concept's entire extension-by-declaration framing and geometric
distance intuition are built on).

## Transfer Connections

**Near transfer**:
- `math.trig.polar-form-complex` (currently unauthored; per KG
  `related`/`cross_links`; the polar form z=r(cosθ+i sinθ) directly
  extends this concept's own modulus-and-angle machinery, anticipated
  in the Blueprint's own P76 transfer probe)
- `math.alg.complex-polynomial-roots` (per KG `unlocks`; the
  Fundamental Theorem of Algebra — every polynomial has a root in ℂ —
  is the direct payoff of this concept's own definitional extension)

**Far transfer**:
- `math.cx.complex-numbers-analysis` (per KG `unlocks`; analytic
  functions of a complex variable, a deep extension of this concept's
  own algebraic-plus-geometric structure)
- Electrical engineering: AC circuit analysis uses complex impedance
  directly, with multiplication-as-rotation-and-scaling modeling phase
  shifts
- Signal processing: the Fourier transform's use of complex exponentials
  directly builds on this concept's own rotation interpretation of
  multiplication by i

## Cross-Subject Connections

Per KG `cross_links` [`math.cx.complex-numbers-analysis`, `math.trig.
polar-form-complex`]: neither has an Educational Brain entry yet
(verified via directory listing) — this entry's Blueprint-derived P76
transfer probe (z₁=1+i, z₂=1−i, magnitude-multiplies/angle-adds)
directly anticipates `math.trig.polar-form-complex`'s own content, to
be genuinely activated once that concept is authored. Not fabricated
beyond what the KG and Blueprint state.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.found.complex-numbers.md`
(PACKAGE_READY, all structural/content/mastery-gate/AIR checks PASS).

Full Protocol A teaching sequence (TA-A01 through TA-A04/mastery gate),
Protocol B repair chains (TA-B01 through TA-B03), and the P89
spaced-repetition schedule reused by reference above and not restated
in full; the Misconception Registry (MC-1 through MC-3) and the P77/P76
mastery-gate item bank cited directly by ID.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's single prerequisite
(`math.found.real-numbers`) is exactly sufficient to motivate the
extension (x²+1=0 has no real solution). Its two `unlocks`
(`math.alg.complex-polynomial-roots`, `math.cx.
complex-numbers-analysis`) match the Blueprint's own Component 7
Unlocked Blueprints exactly. Both KG `cross_links` targets remain
unauthored (noted above, not a defect). Estimated hours (8, the
highest among the recently authored math.found concepts) and mastery
threshold (0.8) are appropriate for a proficient-level concept
synthesizing definitional extension, algebraic manipulation, and a
genuinely new geometric (two-dimensional, rotational) structure.

**Domain-completion note**: this is the 82nd and final concept in the
`math.found` domain — with this entry, `math.found` reaches 82/82,
making it eligible for Domain Certification per `ROADMAP.md` §3's own
standing gate. See `COVERAGE.md`'s Delivery history for the full
domain-completion record.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.found domain, Wave 16 — FINAL WAVE, autonomous loop) | Initial entry, grounded in the existing PACKAGE_READY Blueprint. Completes the math.found domain at 82/82. |
