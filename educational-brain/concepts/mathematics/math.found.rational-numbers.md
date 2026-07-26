# Rational Numbers — `math.found.rational-numbers`

## Identity

- **Concept ID**: `math.found.rational-numbers` (canonical mathematics
  KG)
- **Curriculum location**: mathematics / foundations (no parent in KG;
  no children in KG)
- **Prerequisites**: `math.found.integers` (ℤ, the ring structure this
  concept extends by supplying multiplicative inverses).
- **Unlocks**: `math.arith.fractions`, `math.found.irrational-numbers`.
- **Related** (from KG): `math.found.integers`, `math.found.
  real-numbers`.
- **Difficulty**: developing · **Bloom**: understand · **Mastery
  threshold**: 0.85 · **Est. hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.found.
  rational-numbers.md` (PACKAGE_READY; MAMR: MC-1 FRACTION-UNIQUE is
  FOUNDATIONAL, cleared before MC-2 or MC-3 in all repair routing; P76
  cross-link mode active, cross_links=[math.arith.fractions]).
- **Aliases** (from KG): "ℚ", "fractions", "ratios".

## Learning Objective

The learner can: state the formal definition ℚ={p/q:p∈ℤ,q∈ℤ,q≠0}, with
p/q=r/s iff p×s=q×r, and correctly accept that a single rational number
has infinitely many equivalent fraction representations; state that ℚ
is a FIELD (closed under +,−,×,÷ by nonzero elements — every nonzero
rational has a multiplicative inverse), the key structural upgrade over
ℤ's mere ring structure; state that ℚ is densely ordered (a rational
always exists between any two distinct rationals) but NOT complete
(the ℚ-approximation sequence to √2 has no limit within ℚ); and
classify a rational's decimal expansion as terminating or eventually
repeating based on the reduced denominator's prime factorization.

## Core Understanding

`math.found.integers` already establishes ℤ as a ring — closed under
+,−,×, but NOT closed under ÷ (e.g., 1÷3∉ℤ). ℚ is constructed
specifically to close this gap: ℚ={p/q:p∈ℤ,q∈ℤ,q≠0}, where p/q and r/s
NAME THE SAME rational iff p×s=q×r — every rational number is
technically an EQUIVALENCE CLASS of integer pairs under this relation,
with infinitely many fraction representations (1/2=2/4=3/6=… all name
the identical number), and a unique CANONICAL (reduced) form where
GCD(|p|,q)=1 and q>0. This equivalence-class structure — a rational
number IS the whole class, any fraction is a valid representative name
for it — is the concept's single most load-bearing idea. Structurally,
ℚ is a **field**: closed under +,−,×, and ÷ by nonzero elements, with
every nonzero rational p/q possessing a multiplicative inverse
(p/q)⁻¹=q/p — ℤ, by contrast, is only a ring, since integers other than
±1 lack multiplicative inverses within ℤ. Order-theoretically, ℚ is
**densely ordered**: between any two distinct rationals a<b, another
rational c=(a+b)/2 always exists strictly between them — genuinely
unlike ℤ, where no integer sits between consecutive integers. But
density is NOT completeness: ℚ has "holes" — the rational sequence
1,1.4,1.41,1.414,… converges toward √2, yet √2∉ℚ, so this Cauchy
sequence has no limit WITHIN ℚ. Every rational has either a
TERMINATING or an EVENTUALLY REPEATING decimal expansion — terminating
exactly when the reduced denominator's only prime factors are 2 and 5
(since base 10=2×5); any other prime factor in the denominator produces
an eventually repeating (never terminating) decimal, which is still
fully rational (e.g., 1/3=0.333…, convertible back to 1/3 via a
standard algebraic trick). ℚ sits in the extension chain
ℕ⊂ℤ⊂ℚ⊂ℝ⊂ℂ as the FIRST system in the chain forming a field.

## Mental Models

- **Beginner model — "a fraction is a specific pair of numbers written
  with a slash, and different-looking fractions are different
  numbers"**: the learner treats the SYMBOL p/q itself as the
  mathematical object, rather than as one of many names for an
  underlying equivalence class. Shelf-life warning: this model directly
  produces MC-1 — rejecting simplification as "changing the number"
  rather than choosing a different, equally valid name for the same
  number.
- **Intermediate model — "a rational number is the equivalence class of
  all fractions p/q related by p×s=q×r, and canonical form is just the
  standard, chosen representative"**: the learner correctly separates
  the number from its many names, and can verify equivalence via
  cross-multiplication, but may still conflate ℚ's density with
  completeness, or believe all rationals terminate. Upgrade trigger:
  being shown the ℚ-approximation sequence to √2 and asked whether its
  limit is rational.
- **Advanced model — "ℚ is a field (unlike ℤ's mere ring structure),
  densely but not completely ordered, with a precise terminating-vs-
  repeating decimal characterization tied directly to the reduced
  denominator's prime factors"**: the learner fluently reasons about
  which structural properties ℚ gains over ℤ (multiplicative inverses,
  density) and which it still lacks (completeness), and can predict
  decimal termination without computing the division. Upgrade trigger:
  being asked to predict, from the reduced denominator alone, whether a
  given fraction's decimal terminates.
- **Do not upgrade early**: a learner still treating different fraction
  representations as different numbers (beginner model, directly
  triggering MC-1) should not be pushed toward field-structure or
  density-vs-completeness reasoning (advanced model) before the
  equivalence-class identity is fully secure — MC-1 is FOUNDATIONAL per
  the Blueprint's own MAMR.

## Why Students Fail

The dominant, FOUNDATIONAL failure treats each fraction SYMBOL as a
distinct number, rejecting 1/2 and 2/4 as "different" rational numbers
— a direct consequence of elementary education teaching fraction
symbols before teaching equivalence, so visually different fractions
feel like different objects rather than different names for the same
underlying point on the number line. A second failure conflates
DENSITY (no two rationals are adjacent — a third always sits between
any two) with COMPLETENESS (every convergent sequence has its limit
IN the set), believing ℚ "fills the entire number line with no gaps" —
missing that the ℚ-approximation sequence to √2 demonstrates a genuine
hole, since its limit is irrational. A third failure, from early,
heavy exposure to terminating fractions like 1/2, 1/4, 3/4, believes
ALL rationals have terminating decimals, excluding repeating-decimal
numbers like 1/3 or 1/7 from ℚ altogether — missing that the defining
property of ℚ is purely p/q with p,q∈ℤ, q≠0, with no reference
whatsoever to decimal termination.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: FRACTION-UNIQUE (Foundational; Type 3 — language contamination)
**Trigger**: "1/2 and 2/4 are different rational numbers" or "each
rational number has exactly one fraction."
**Diagnostic note**: classified Type 3 (language contamination) rather
than Type 1 overgeneralization — elementary education presents each
fraction symbol as though it were a self-contained, complete
mathematical object (importing the notation's surface form as the
number's identity), rather than the learner overgeneralizing from a
narrow set of examples.
**Repair**: a rational number is not a fraction symbol — it is a
NUMBER, a specific position on the number line; p/q is notation
POINTING to that position. The formal test: p/q=r/s iff p×s=q×r. Check:
1/2 vs 2/4: 1×4=4, 2×2=4 — equal, so they name the same number.
Canonical (reduced) form is the officially CHOSEN representative, not
the only legitimate one.

### MC-2: DENSITY-COMPLETENESS (Moderate; Type 3 — language contamination)
**Trigger**: "Since there's always a rational between any two
rationals, ℚ must fill the entire number line."
**Diagnostic note**: classified Type 3 — the everyday-English sense of
"dense" ("no gaps," "packed solid") is imported as the technical
meaning, rather than the precise property (no two elements are
adjacent, which is compatible with genuine holes elsewhere).
**Repair**: the sequence 1,1.4,1.41,1.414,1.4142,… — each term
terminates, hence rational — converges toward √2, but √2∉ℚ (no p/q
satisfies (p/q)²=2 exactly). ℚ is dense (no rational is "adjacent" to
another) but NOT complete (this convergent sequence has no limit
within ℚ). The number line has irrational "dust" filling gaps ℚ can't
reach.

### MC-3: RATIONAL-TERMINATING (Moderate; Type 1 — overgeneralization)
**Trigger**: "1/3 isn't really a rational because its decimal never
ends" or "all fractions have terminating decimals."
**Repair**: the defining property of ℚ is purely p/q with p,q∈ℤ, q≠0 —
nothing about decimal termination. Every rational has a TERMINATING or
EVENTUALLY REPEATING decimal; termination depends solely on whether the
reduced denominator's only prime factors are 2 and 5. 1/3=0.333… is
fully rational — confirmed via the algebraic trick: x=0.333…,
10x=3.333…, 9x=3, x=1/3.

## Analogies

**Primary — fence posts with gaps filled in (Blueprint's own analogy)**:
ℤ is a fence line with posts at …,−2,−1,0,1,2,… — evenly spaced, with
nothing between consecutive posts. ℚ fills the gaps between the
integer fence posts with infinitely many points: 1/2 is halfway between
0 and 1; 1/3 and 2/3 divide the gap into thirds; and infinitely more
rationals sit between any two already placed. This directly motivates
WHY ℚ exists: ℤ failed closure under division; ℚ adds exactly the
points needed to make division (by nonzero elements) always possible.

**Anti-analogy to retire**: "A fraction and its simplified form are
technically different numbers that happen to be equal, like two
different people who look the same." This directly invites MC-1 by
suggesting equivalence is a coincidental external relationship between
two genuinely distinct objects, rather than two names naming the exact
same single object.

## Demonstrations

**Equivalence verification and canonical form**: 12/18 and 8/12 both
reduce to 2/3 (GCD(12,18)=6; GCD(8,12)=4); cross-multiplication
confirms 12×12=144=18×8, verifying they name the same number.

**Field vs. ring contrast**: ℤ lacks multiplicative inverses (no
integer 1/2); ℚ has them for every nonzero element ((p/q)⁻¹=q/p) — the
single structural upgrade that makes ℚ a field where ℤ is only a ring.

**Density-vs-completeness contrast (breaks MC-2)**: between 1 and 2
there is no integer, but between any two rationals there are always
infinitely many more rationals (dense); yet the sequence
1,1.4,1.41,1.414,… converges to √2∉ℚ (not complete).

**Terminating vs. repeating pattern**: 1/2=0.5, 1/4=0.25, 1/5=0.2 all
terminate (denominators 2,4,5 have only prime factors 2 and 5); 1/3=
0.333…, 1/7=0.142857142857… repeat (denominators 3,7 have other prime
factors). 0.999…=1 exactly (via the algebraic trick x=0.999…,
10x=9.999…, 9x=9, x=1) — a standard, decisive surprise at this level.

## Discovery Questions

Ask the learner: "between the integers 0 and 1, how many rational
numbers exist — can you always find one between any two you already
have?" — the learner discovers, by repeatedly bisecting ((a+b)/2 is
always rational and strictly between a and b), that this process never
terminates, directly experiencing density before it's named formally.
Recommendation: guided discovery for the density insight (directly
experiential from repeated bisection); direct instruction for the
density-vs-completeness distinction (MC-2's repair) and the
terminating/repeating decimal characterization, since both require an
already-worked concrete example (the √2 sequence; the prime-
factorization pattern) to internalize correctly.

## Teaching Sequence

MC-1 (fraction-unique) is addressed first and is FOUNDATIONAL per the
Blueprint's own MAMR — it must be cleared before either MC-2 or MC-3,
since every subsequent discussion of ℚ's structure presupposes
fractions are accepted as names for numbers, not the numbers
themselves. MC-2 (density-completeness) and MC-3 (rational-
terminating) are addressed FIFO after MC-1 clears (per the Blueprint's
Component 3 MAMR Enforcement): if both are active, MC-2 is addressed
before MC-3.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (fraction-unique) | WORKED EXAMPLE: cross-multiplication equivalence test + canonical-form derivation | Teaching Actions: SHOW §1 |
| MC-2 active (density confused with completeness) | DEMONSTRATION: √2-approximation sequence with no limit in ℚ | Teaching Actions: SHOW §3 |
| MC-3 active (rational-terminating overgeneralized) | WORKED EXAMPLE: terminating/repeating pattern table tied to denominator's prime factors | Teaching Actions: SHOW §1 |
| Ready for transfer | THOUGHT EXPERIMENT: recipe-scaling fraction multiplication (Blueprint P76, cross-linking `math.arith.fractions`) | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Distinguish the FRACTION (a symbol/address) from the
RATIONAL NUMBER (the position it names) explicitly and repeatedly —
never let "1/2" and "the rational number 1/2" blur together without
that distinction, since collapsing them is exactly MC-1's mechanism.

**Wait-time**: After posing the √2-approximation sequence and asking
whether its limit is rational, give extended wait-time before revealing
it isn't — let the learner reason through why "the sequence looks like
it should converge to SOMETHING in ℚ" is exactly the intuition MC-2
exploits.

**Load-bearing sentences**:
- "1/2 and 2/4 are two names for the same number — canonical form is
  the official name, not the only valid one."
- "ℚ is dense — no rational is adjacent to another — but that's not
  the same as complete: ℚ still has holes at every irrational."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Directly reusing the Blueprint's own P77 7-problem gate set and P76
transfer probe, not restated in full — cite by reference:

**Gate 1** (Blueprint Q1): identify which of 22/7, √4, 0.6̄, √3 is NOT
rational. Pass: √3 (irrational); correctly recognizes 22/7, √4=2, and
0.6̄=2/3 as rational.

**Gate 2** (Blueprint Q2): reduce 48/60 to canonical form. Pass: 4/5.

**Gate 3** (Blueprint Q3): calculate 2/3×9/4 as a reduced fraction.
Pass: 3/2.

**Gate 4** (Blueprint Q4): determine whether 7/40 terminates or
repeats, justified by factoring the denominator. Pass: terminates;
40=2³×5.

**Gate 5** (Blueprint Q5): prove 0.999…=1 (addressing the "these are
different numbers" claim). Pass: correct algebraic-trick proof.

**Gate 6** (Blueprint Q6): name one structural property ℚ has that ℤ
lacks, related to ordering rather than field structure. Pass: density
(a rational always exists between any two distinct rationals).

**Gate 7** (Blueprint P76, cross-link transfer probe, `math.arith.
fractions`): recipe-scaling problem — compute scale factors and scaled
ingredient quantities as reduced fractions. Pass: correct fraction
multiplication and reduction, grounding rational arithmetic in a
concrete context.

**Mastery criterion**: 6/7 on the full Blueprint item bank (Q1-Q6 +
P76), consistent with KG mastery_threshold 0.85 (⌈0.85×7⌉=6).

## Tutor Recovery Strategy

Likeliest utterance: "how can 1/2 and 2/4 be the SAME thing — they
don't even look alike?" — the concept-specific smaller question: "if
you cut a pizza into 2 equal slices and take 1, versus cutting it into
4 equal slices and taking 2, do you end up with the same amount of
pizza?" reframes the confusion from "different symbols mean different
numbers" (MC-1's symbol-as-identity root) to "different symbols can
point to the same quantity," directly isolating MC-1 using a concrete,
directly-comparable physical instance — reusing the same concrete
pizza-based grounding `math.arith.fractions`'s own Beginner mental
model already establishes for this program's audience.

## Memory Hooks

**Type**: declarative (the equivalence-class definition, the field-vs-
ring distinction, the density-vs-completeness distinction, the
terminating/repeating decimal rule) + procedural (cross-multiplication
equivalence verification, canonical-form reduction via GCD, directly
extending `math.found.integers`'s own ring-structure vocabulary into
field territory). Review form: fresh equivalence-verification and
decimal-classification prompts, periodically paired with a density-vs-
completeness true/false question to keep MC-2's guard-rail active.
Interleaving partners: `math.found.integers` (the base ring structure
this concept extends to a field) and `math.arith.fractions` (the
computational operations this concept's formal structure grounds, per
the Blueprint's own P76 cross-link).

## Transfer Connections

**Near transfer**:
- `math.found.irrational-numbers` (currently unauthored; defined
  directly as ℝ∖ℚ, requiring ℚ to be precisely characterized first, per
  KG `unlocks`)
- `math.found.real-numbers` (per KG `related`; ℝ is the completion of
  ℚ, filling exactly the holes this concept's own density-vs-
  completeness distinction identifies)

**Far transfer**:
- `math.arith.fractions` (the computational, operational counterpart —
  addition with LCD, multiplication, simplification — grounded in this
  concept's formal equivalence-class and field structure, per KG
  `cross_links`)
- Computer science: floating-point representation limitations directly
  mirror the terminating-vs-repeating decimal distinction (binary
  floating point can only exactly represent rationals with
  denominators that are powers of 2)

## Cross-Subject Connections

Per KG `cross_links` [`math.arith.fractions`]: ℚ provides the formal
number-theoretic foundation (equivalence classes, field axioms,
density); `math.arith.fractions` provides the computational procedures
and concrete applications (already authored — see that entry's own
Core Understanding and Mental Models sections, not restated here per
this program's standing no-duplication convention). The Blueprint's own
P76 recipe-scaling probe bridges formal multiplication in ℚ with
practical fraction arithmetic directly.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.found.rational-numbers.md`
(PACKAGE_READY, V-1 through V-20 PASS, AIR PASS).

Full Protocol A teaching sequence (TA-A01 through TA-A07), Protocol B
repair chains (TA-B01 through TA-B03), and the P89 spaced-repetition
schedule reused by reference above and not restated in full; the
Misconception Registry (MC-1 through MC-3) and the TA-A07 mastery-gate
item bank (Q1-Q6 + P76) cited directly by ID.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found in this concept's own prerequisite or
unlocks structure. One cross-entry topological-order note, not a
defect requiring a KG change: `math.arith.fractions` (already authored,
Delivery 5, 2026-07-10, predating this program's strict prerequisite-
order discipline) lists `math.found.rational-numbers` among its own KG
`requires`, meaning strictly this concept should have been authored
BEFORE `math.arith.fractions`. This was inherited pre-existing content,
not an ordering violation by this program's own Wave-by-wave process
(which has followed strict topological order throughout); recorded
honestly here rather than silently ignored. Estimated hours (5) and
mastery threshold (0.85) are appropriate for a concept combining a
definitional shift (equivalence classes) with two genuinely
counterintuitive results (density-without-completeness; repeating
decimals as fully rational).

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.found domain, Wave 13, autonomous loop) | Initial entry, grounded in the existing PACKAGE_READY Blueprint. |
