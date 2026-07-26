# Reciprocal — `math.arith.fraction-reciprocal`

## Identity

- **Concept ID**: `math.arith.fraction-reciprocal` (canonical
  mathematics KG)
- **Curriculum location**: mathematics / arithmetic (parent:
  `math.arith.fraction-multiplication`; no children in KG)
- **Prerequisites**: `math.arith.fractions` (fraction notation,
  fraction×fraction multiplication).
- **Unlocks**: none listed in KG `unlocks` for this node.
- **Related** (from KG): `math.arith.fraction-multiplication`.
- **Difficulty**: developing · **Bloom**: understand · **Mastery
  threshold**: 0.9 · **Est. hours**: 2
- **Blueprint**: `docs/curriculum/blueprints/math.arith.
  fraction-reciprocal.md` (PACKAGE_READY, Educational Brain v1.0
  format; MAMR: MC-1 reciprocal-as-negative is FOUNDATIONAL, must clear
  before MC-2/MC-3; cross_links=[math.abst.field], bridge informational
  only at this Bloom level — the word "field" is never introduced).
- **Aliases** (from KG): "multiplicative inverse", "1/x", "flip".

## Learning Objective

The learner can: state that for any nonzero fraction a/b, the
reciprocal is b/a, defined by the property a/b×b/a=1 (the product
test, not merely "flip it"); correctly find reciprocals of proper
fractions, whole numbers (n=n/1→1/n), and mixed numbers (convert to
improper form FIRST, then flip); and explain why "reciprocal" (the
multiplicative inverse) is entirely distinct from "negative" (the
additive inverse) — reciprocal swaps numerator/denominator, negative
flips sign.

## Core Understanding

`math.arith.fractions` already establishes fraction notation and
fraction×fraction multiplication. The **reciprocal** of a nonzero
fraction a/b is b/a — defined not as "the flipped fraction" but as
**the unique number that multiplies with a/b to give exactly 1**: the
flip merely happens to produce that number; the PRODUCT TEST
(a/b×b/a=ab/ab=1) is the actual definition. This distinction matters
because reciprocal-finding extends beyond simple fractions: every
whole number n is secretly the fraction n/1, so its reciprocal is 1/n
(check: n×1/n=n/n=1); a mixed number must first be converted to an
improper fraction, THEN flipped (2½=5/2→reciprocal=2/5; flipping only
the fractional part, giving ½→2, is a genuine error, since
2½×2=5≠1). Zero has NO reciprocal (0×anything=0, never 1). The
reciprocal relationship directly explains fraction DIVISION: dividing
by c/d is equivalent to multiplying by its reciprocal d/c, since
multiplying by the reciprocal is precisely what "undoes" multiplying
by the original — this is why "invert and multiply" works as a
division procedure, not an arbitrary rule. Critically, the reciprocal
of a NEGATIVE fraction preserves the sign — swapping numerator and
denominator only, never flipping the sign — genuinely distinct from the
ADDITIVE inverse (negative), which flips sign only, never swapping
numerator/denominator.

## Mental Models

- **Beginner model — "the reciprocal of a fraction is basically its
  opposite, like the negative"**: the learner conflates the
  multiplicative inverse (reciprocal) with the additive inverse
  (negative), since both are informally called "the opposite" in
  everyday language. Shelf-life warning: this model produces
  systematically wrong signs, writing the reciprocal of 3/4 as −3/4.
- **Intermediate model — "the reciprocal of a/b is b/a, found by
  swapping numerator and denominator, and I can verify it multiplies to
  1"**: the learner correctly finds and verifies reciprocals of proper
  fractions, but may still leave whole-number reciprocals unchanged
  (treating n's reciprocal as n itself) or flip only the fractional
  part of a mixed number. Upgrade trigger: being asked for the
  reciprocal of a whole number or a mixed number.
- **Advanced model — "reciprocal is precisely defined by the
  product-equals-1 test; every nonzero number — fraction, whole number,
  or mixed number — has exactly one reciprocal, found by writing it as
  a fraction first, then swapping"**: the learner fluently handles all
  three input types and correctly connects the reciprocal to division
  ("invert and multiply" as multiplying by the reciprocal). Upgrade
  trigger: being asked to explain WHY dividing by a fraction is
  equivalent to multiplying by its reciprocal.
- **Do not upgrade early**: a learner still confusing reciprocal with
  negative (beginner model, directly triggering MC-1) should not be
  pushed toward whole-number/mixed-number reciprocal-finding (advanced
  model) before the sign distinction is fully secure — MC-1 is
  FOUNDATIONAL per the Blueprint's own MAMR.

## Why Students Fail

The dominant, FOUNDATIONAL failure confuses the reciprocal
(multiplicative inverse) with the negative (additive inverse), since
both are colloquially called "the opposite" — writing the reciprocal of
3/4 as −3/4 rather than 4/3. A second failure correctly handles proper
fractions but leaves whole-number reciprocals unchanged (writing the
reciprocal of 5 as 5, not 1/5), missing that every whole number n is
secretly n/1 and must be treated as a fraction before the flip rule
applies. A third failure, when finding the reciprocal of a mixed
number, flips only the fractional part (e.g., writing the reciprocal of
2½ as ½ or 2/1, rather than converting to the improper fraction 5/2
first and THEN flipping to 2/5), missing that the flip rule only
applies to a number already in single-fraction form.

## Misconceptions

Reusing the Blueprint's Misconception Registry (Educational Brain v1.0
format), birth-type classification added per this program's diagnostic
procedure — not re-derived:

### MC-1: Reciprocal = negative (Foundational; Type 3 — language contamination)
**Trigger**: writes the reciprocal of 3/4 as −3/4.
**Diagnostic note**: classified Type 3 — the everyday-English word
"opposite" is used loosely for BOTH the additive inverse (negative) and
the multiplicative inverse (reciprocal), so the learner imports the
sign-flipping meaning of "opposite" onto a context that actually calls
for numerator/denominator swapping.
**Repair**: the Blueprint's own contrastive table — ADDITIVE inverse of
3/4 is −3/4 (test: 3/4+(−3/4)=0, sign change only); MULTIPLICATIVE
inverse (reciprocal) of 3/4 is 4/3 (test: 3/4×4/3=1, numerator/
denominator swap only). These are completely different operations with
different tests. For a negative fraction, the sign is PART of the
number and is preserved: reciprocal of −2/5 is −5/2 (check:
(−2/5)×(−5/2)=10/10=1).
**MAMR**: FOUNDATIONAL — must be cleared before MC-2 or MC-3, since all
subsequent product-test verification depends on the learner not
defaulting to a sign-flip.

### MC-2: Whole-number reciprocal blind spot (Moderate; Type 1 — overgeneralization)
**Trigger**: correctly finds the reciprocal of a/b but writes the
reciprocal of 5 as 5 (no change).
**Repair**: every whole number n is secretly the fraction n/1 — apply
the swap rule: n/1→1/n. Check: n×1/n=n/n=1. The reciprocal of 15 is
1/15, not 15 (15×15=225≠1, confirming 15 is NOT its own reciprocal).

### MC-3: Mixed-number flip error (Moderate; Type 1 — overgeneralization)
**Trigger**: writes the reciprocal of 2½ as ½ (flipping only the
fractional part) rather than first converting to the improper fraction
5/2, then flipping to 2/5.
**Repair**: mixed numbers are NOT fractions in standard form — the flip
rule only applies to a single fraction. Required step: convert first
(2½=5/2), THEN flip (reciprocal=2/5). Check: 5/2×2/5=10/10=1. Flipping
½ alone gives 2, and 2½×2=5≠1 — not the reciprocal.

## Analogies

**Primary — the "undo" measuring scoop (Blueprint's own analogy)**: if
a scoop holds 2/3 of a cup, how many scoopfuls make exactly one whole
cup? You need 3/2 scoopfuls, because 2/3×3/2=1 — the reciprocal is
precisely the "undo" quantity that restores the whole. This concretely
grounds the product-equals-1 definition before any symbolic swap rule
is introduced.

**Anti-analogy to retire**: "The reciprocal is just the fraction's
opposite, like the opposite of a number on the number line." This
directly invites MC-1 by reusing "opposite" — the exact word for the
additive inverse (negative) — for an entirely different (multiplicative)
relationship.

## Demonstrations

**Product-test verification (breaks MC-1)**: reciprocal of 3/4 is 4/3
(check: 3/4×4/3=12/12=1) — NOT −3/4 (check: 3/4×(−3/4)=−9/16≠1).

**Whole-number reciprocal (breaks MC-2)**: reciprocal of 6 is 1/6,
found via 6=6/1→1/6. Check: 6×1/6=6/6=1.

**Mixed-number conversion (breaks MC-3)**: reciprocal of 3⅓: convert
3⅓=10/3, flip→3/10. Check: 10/3×3/10=30/30=1. (Flipping ⅓ alone to get
3 would give 3⅓×3=10≠1 — not the reciprocal.)

**Division connection**: 2/3÷4/5=2/3×5/4=10/12=5/6, since the
reciprocal of 4/5 is 5/4 — "invert and multiply" is multiplying by the
reciprocal.

## Discovery Questions

Present the physical strip activity from the Blueprint's own TA-A01:
shade 2/3 of a paper strip and ask how many such shaded pieces make
exactly one whole strip — the learner discovers 3/2 largely unaided,
directly experiencing the "undo" quantity before the swap rule is
named formally. Recommendation: guided discovery for the "undo"
quantity insight (directly experiential from the strip activity);
direct instruction for the whole-number and mixed-number extension
rules (MC-2/MC-3's repair), since both require an explicit
"write-as-a-fraction-first" scaffolding step not independently
rediscoverable.

## Teaching Sequence

MC-1 (reciprocal = negative) is addressed first and is FOUNDATIONAL per
the Blueprint's own MAMR — it must be cleared before MC-2 or MC-3,
since every subsequent product-test verification presupposes the
learner is not defaulting to a sign flip. MC-2 (whole-number blind
spot) and MC-3 (mixed-number flip error) are addressed FIFO once MC-1
clears, as the Blueprint's own protocols confirm — both are independent
extensions of the same swap rule to different input types.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (reciprocal = negative) | CONTRAST PAIR: additive-vs-multiplicative-inverse table with product tests | Blueprint TA-C02 |
| MC-2 active (whole-number blind spot) | WORKED EXAMPLE: n=n/1→1/n conversion, product check | Blueprint TA-C03 |
| MC-3 active (mixed-number flip error) | WORKED EXAMPLE: convert-then-flip three-step sequence | Blueprint TA-C04 |
| Ready for transfer | THOUGHT EXPERIMENT: recipe scoop-count / gear-ratio inversion (Blueprint P76) | Blueprint TA-A05 mastery gate |

## Voice Teaching Notes

**Register**: Never say "the opposite of a fraction" for reciprocal —
use "the multiplicative inverse" or "the reciprocal" explicitly, since
"opposite" is exactly the word that invites MC-1's sign confusion.

**Wait-time**: After posing the whole-number reciprocal question (e.g.,
"what is the reciprocal of 8?"), give extended wait-time before
revealing n=n/1 — let the learner attempt the swap on the bare integer
first and notice the difficulty.

**Load-bearing sentences**:
- "The reciprocal is defined by its product with the original equaling
  1 — the swap is just how we find it, not the definition itself."
- "Reciprocal preserves sign; negative flips sign — these are
  completely different operations."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Directly reusing the Blueprint's own 5-probe mastery gate (Educational
Brain v1.0 format), not restated in full — cite by reference:

**Gate 1** (Blueprint P77): define reciprocal in one's own words,
including how to find it and the product test that confirms it. Pass:
correctly states "product=1."

**Gate 2** (Blueprint P76, transfer probe, informational
`math.abst.field` cross-link): a recipe uses 2/3 cup of sugar; how many
scoops of that size fill exactly one cup, expressed via a reciprocal?
Pass: 3/2, correctly grounded in the "undo" framing.

**Gate 3** (Blueprint P75, misconception probe): evaluate the claim
"the reciprocal of −3/4 is −4/3 (flip preserving sign), but the
reciprocal of 3 is 3 (whole numbers don't flip)." Pass: correctly
identifies the first half as correct, the second as MC-2 (reciprocal of
3 is 1/3).

**Gate 4** (Blueprint P74, application probe): find and verify the
reciprocal of (a) 7, (b) 4⅓, (c) 0.5 (as a fraction first). Pass: (a)
1/7, (b) 13/3→3/13, (c) 1/2→2.

**Gate 5** (Blueprint P78, mastery gate synthesis): passes only if all
of P77/P76/P75/P74 are correct with product verifications shown.

**Mastery criterion**: 5/5 (all probes), consistent with KG
mastery_threshold 0.9.

## Tutor Recovery Strategy

Likeliest utterance: "isn't the reciprocal just the negative version?"
— the concept-specific smaller question: "does 3/4 plus its reciprocal
equal 0, or does 3/4 TIMES its reciprocal equal 1?" reframes the
confusion from "reciprocal = opposite sign" (MC-1's language-
contamination root, treating "opposite" as a single unambiguous
operation) to "two entirely different tests define two entirely
different inverses," directly isolating MC-1 by forcing the learner to
notice which operation (+ or ×) each "opposite" actually corresponds
to.

## Memory Hooks

**Type**: procedural (finding and verifying reciprocals across proper
fractions, whole numbers, and mixed numbers, directly reusing
`math.arith.fractions`'s own multiplication machinery for the product
test) + declarative (the additive-vs-multiplicative inverse
distinction, the convert-then-flip rule for mixed numbers). Review form:
fresh reciprocal-and-verify prompts across all three input types,
periodically paired with a sign-focused true/false question ("is the
reciprocal of a negative number positive?") to keep MC-1's guard-rail
active. Interleaving partner: `math.arith.fraction-multiplication` (the
parent concept whose division procedure this concept's reciprocal
directly explains).

## Transfer Connections

**Near transfer**:
- `math.arith.fraction-multiplication` (per KG `related`; the parent
  concept — "invert and multiply" for division IS multiplying by this
  concept's own reciprocal)

**Far transfer**:
- `math.abst.field` (per KG `cross_links`; every nonzero rational
  having a multiplicative inverse is a direct field axiom — this
  concept provides the concrete arithmetic instance, bridge
  informational only at this Bloom level per the Blueprint's own
  Component 6 note)
- Physics/engineering: gear ratios, optical magnification, and
  electrical resistance-conductance relationships are all direct
  real-world reciprocal pairs

## Cross-Subject Connections

Per KG `cross_links` [`math.abst.field`]: the Blueprint's own Component
6 states this bridge is informational only at the "understand" Bloom
level and difficulty=2 — the word "field" is never introduced in any
teaching action; P76 transfer probes use self-contained real-world
contexts (measuring, gear ratios, photography aspect ratios) instead.
Not fabricated beyond what the KG and Blueprint state.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.arith.
fraction-reciprocal.md` (PACKAGE_READY, all 20 V-checks PASS,
Educational Brain v1.0 format).

Full Student State Protocols (A-E), the Misconception Registry (MC-1
through MC-3), and the 5-probe mastery gate reused by reference above
and not restated in full.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's single prerequisite
(`math.arith.fractions`) is exactly sufficient to state the reciprocal
definition via the product test. Estimated hours (2, the shortest
math.arith concept authored so far) and mastery threshold (0.9) are
appropriate for a compact but precisely-defined concept whose main risk
is a specific, well-characterized sign confusion (MC-1).

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 2, autonomous loop) | Initial entry, grounded in the existing PACKAGE_READY Blueprint (Educational Brain v1.0 format). |
