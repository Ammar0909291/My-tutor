# Mixed Numbers — `math.arith.mixed-numbers`

## Identity

- **Concept ID**: `math.arith.mixed-numbers` (canonical mathematics
  KG)
- **Curriculum location**: mathematics / arithmetic (parent:
  `math.arith.fractions`; no children in KG)
- **Prerequisites**: `math.arith.fractions` (fraction notation,
  numerator/denominator, equivalent fractions, finding a common
  denominator, adding/subtracting proper fractions with unlike
  denominators).
- **Unlocks**: none listed in KG `unlocks` for this node.
- **Related** (from KG): `math.arith.improper-fractions`.
- **Difficulty**: developing · **Bloom**: apply · **Mastery
  threshold**: 0.85 · **Est. hours**: 3
- **Blueprint**: `docs/curriculum/blueprints/math.arith.
  mixed-numbers.md` (PACKAGE_READY, Educational Brain v1.0 format;
  MAMR: MC-1 addition-without-LCD is FOUNDATIONAL, must clear before
  MC-2; MC-3 independent; cross_links=[], self-contained transfer
  probes).
- **Aliases** (from KG): "mixed fractions", "whole and fraction".

## Learning Objective

The learner can: state that a mixed number is a whole part plus a
proper fraction (e.g. 3½ = 3 + ½); add and subtract mixed numbers,
including with unlike denominators (finding the LCD first) and with
regrouping (borrowing 1 whole, converting it to denominator/denominator,
when the minuend's fraction part is smaller than the subtrahend's); and
apply mixed-number arithmetic to real-world word problems, correctly
selecting addition versus subtraction from context.

## Core Understanding

`math.arith.fractions` already establishes fraction notation and
common-denominator addition of proper fractions. A **mixed number** is
a whole part plus a proper fraction (2¾ = 2 whole units + ¾ of another).
**Addition/subtraction with unlike denominators**: find the LCD of the
two fraction parts, convert both to that LCD, then combine whole parts
and fraction parts separately; if the fraction-part SUM is ≥1, carry 1
to the whole part (e.g. 3¾+2¾: fraction 6/4=1½, carry gives 5+1=6,
result 6½). **Subtraction with regrouping**: when the minuend's
fraction part is SMALLER than the subtrahend's (e.g. 3¼−1¾, since
¼<¾), borrow 1 from the whole-number part, convert that borrowed 1 to
denominator/denominator (4/4), add it to the existing fraction part
(¼+4/4=5/4), THEN subtract (5/4−3/4=2/4=½), and subtract the reduced
whole parts (2−1=1) — result 1½, verified by adding back (1½+1¾=3¼).
**Multiplication of mixed numbers** (addressed as a related but
secondary skill in this concept's own Protocol C repair chain) requires
converting BOTH numbers to improper fractions FIRST, then multiplying
straight across — never adding whole parts and multiplying fraction
parts separately, since multiplication distributes across the whole
number+fraction structure in a way addition's part-by-part method
cannot capture. Word-problem operation selection follows contextual
cues: "how much in total" or "combined" signals addition; "how much
remains" or "cut off" signals subtraction.

## Mental Models

- **Beginner model — "adding mixed numbers means adding the whole
  parts and adding the fraction parts, whatever their denominators
  are"**: the learner correctly combines whole parts but adds fraction
  parts directly without finding a common denominator, producing
  systematically wrong (and often illogical) results. Shelf-life
  warning: this model produces answers that fail a basic decimal
  sanity check (e.g., 2⅓+1½ computed as 3 2/5≈3.4 when the true sum is
  ≈3.83).
- **Intermediate model — "unlike-denominator addition/subtraction
  requires finding the LCD first; subtraction sometimes requires
  regrouping when the minuend's fraction is too small"**: the learner
  correctly executes both algorithms with explicit LCD-finding, but may
  not yet reliably CHECK whether regrouping is needed before
  subtracting, defaulting to "subtract smaller from larger regardless
  of position." Upgrade trigger: being asked to subtract two mixed
  numbers where the minuend's fraction part is visibly smaller.
- **Advanced model — "every mixed-number operation reduces to a
  reliable checklist: find LCD, check whether regrouping is needed
  (compare fraction parts before subtracting), and verify the result by
  the inverse operation or a rough decimal estimate"**: the learner
  fluently applies both self-verification tools (estimate-first,
  verify-by-adding-back) and correctly selects operations from
  word-problem context. Upgrade trigger: being asked to solve a
  multi-step word problem requiring both addition and subtraction of
  mixed numbers.
- **Do not upgrade early**: a learner still adding fraction parts
  without finding a common denominator (beginner model, directly
  triggering MC-1) should not be pushed toward subtraction-regrouping
  or word-problem application (advanced model) before the LCD step is
  fully automatic — MC-1 is FOUNDATIONAL per the Blueprint's own MAMR.

## Why Students Fail

The dominant, foundational failure adds the fraction parts of two
mixed numbers directly, without first finding a common denominator
(2⅓+1½ computed as 3 2/5 rather than 3 5/6) — this becomes especially
dangerous because the ERROR is not always visually obvious, unlike
adding whole numbers with mismatched place values. A second failure,
specifically in subtraction, subtracts the smaller fraction from the
larger REGARDLESS of position (treating 3¼−1¾ as if ¾−¼=½ rather than
recognizing ¼<¾ requires borrowing first), producing a plausible-
looking but wrong answer. A third, independent failure applies the
addition strategy to multiplication — adding whole number parts and
multiplying fraction parts separately (2½×3 computed as 5½ rather than
7½) — missing that multiplication distributes across the whole+fraction
structure in a way that requires converting to improper fractions
first.

## Misconceptions

Reusing the Blueprint's Misconception Registry (Educational Brain v1.0
format), birth-type classification added per this program's diagnostic
procedure — not re-derived:

### MC-1: Addition without LCD (Foundational; Type 1 — overgeneralization)
**Trigger**: adds whole parts correctly but adds fraction parts
directly without finding a common denominator (e.g., 2⅓+1½→3 2/5
instead of 3 5/6).
**Repair**: the Blueprint's own decimal-check alarm — ⅓≈0.333, ½=0.5,
true sum≈0.833; 5/6≈0.833 matches, but 2/5=0.4 is far too small. Never
add ⅓+½ directly — find LCD(3,2)=6 first: ⅓=2/6, ½=3/6, then 2/6+3/6=
5/6.
**MAMR**: FOUNDATIONAL — subtraction's regrouping step depends on
correct fraction-part addition (adding the borrowed denominator/
denominator back in), so MC-1 must clear before MC-2's repair is
coherent.

### MC-2: Subtraction regrouping omitted (Moderate; Type 1 — overgeneralization)
**Trigger**: when the minuend's fraction part is smaller than the
subtrahend's, subtracts smaller from larger regardless of position
(3¼−1¾→2 2/4 instead of 1½).
**Repair**: the subtraction rule requires the top fraction to be AT
LEAST as large as the bottom fraction — if not, borrow 1 whole from
the whole-number part, convert it to denominator/denominator (1=4/4
for fourths), add to the existing fraction part (¼+4/4=5/4), THEN
subtract (5/4−3/4=2/4=½). Verify: 1½+1¾=3¼ ✓.

### MC-3: Mixed multiplication adds whole parts (Moderate; Type 1 — overgeneralization)
**Trigger**: for mixed×whole or mixed×mixed, adds whole-number parts
and multiplies fraction parts separately (2½×3→5½ instead of 7½).
**Repair**: multiplication distributes across the whole+fraction
structure — (2+½)(3)=2×3+½×3, not simply "add the whole parts." Convert
BOTH numbers to improper fractions first: 2½=5/2, 3=3/1, then
5/2×3/1=15/2=7½.

## Analogies

**Primary — the pie-and-slices picture (Blueprint's own analogy)**:
2¾ means 2 COMPLETE pies plus ¾ of a third pie — the whole number
counts complete pies, the fraction counts the partial one. When adding
two such pie-collections, complete pies combine directly, but the
partial-pie fractions must be measured in the SAME slice size (common
denominator) before they can be combined.

**Secondary — the borrow-a-whole-pie move (targets MC-2)**: subtracting
3¼−1¾ is like having 3 pies plus a quarter-slice, and needing to remove
1¾ pies — since a quarter-slice isn't enough to remove three-quarters
from, you first slice one of your WHOLE pies into quarters (borrowing
1=4/4), giving yourself 2 whole pies plus 5/4 of a pie to work with.

**Anti-analogy to retire**: "Adding mixed numbers is just like adding
two separate numbers — the whole part and the fraction part, each on
their own." This directly invites MC-1 by suggesting the fraction parts
can always be combined directly, without checking whether their
denominators first need to match.

## Demonstrations

**LCD-required addition (breaks MC-1)**: 3¾+2¾ (same denominator):
fraction 3/4+3/4=6/4=1½, carry gives whole 5+1=6, result 6½. 2⅓+1½
(unlike denominators): LCD=6, ⅓=2/6, ½=3/6, whole 2+1=3, fraction
2/6+3/6=5/6, result 3 5/6.

**Regrouping subtraction (breaks MC-2)**: 3¼−1¾: ¼<¾, so borrow 1 from
3→2, add 4/4 to ¼ giving 5/4; 5/4−3/4=2/4=½; whole 2−1=1; result 1½.
Verify: 1½+1¾=3¼ ✓.

**Improper-fraction multiplication (breaks MC-3)**: 2⅓×1½: convert
2⅓=7/3, 1½=3/2; 7/3×3/2=21/6=3½. Estimate check: 2.33×1.5≈3.5 ✓.

**Word-problem operation selection**: "a baker uses 3½ cups for bread
and 1⅔ cups for muffins — how much flour in total?" (addition,
"total" signals combining, 3½+1⅔=5⅙); "how much more did the bread
use?" (subtraction, "more" signals difference, 3½−1⅔=1⅚).

## Discovery Questions

Present two fraction strips of different denominators (e.g., thirds
and halves) representing two mixed numbers to be added, and ask the
learner to combine them physically — the learner discovers the strips
must first be re-marked in a common subdivision (sixths) before the
shaded portions can be meaningfully combined, directly experiencing the
LCD requirement before it's stated as an abstract rule. Recommendation:
guided discovery for the LCD-necessity insight (directly experiential
from mismatched-strip combination); direct instruction for the
regrouping procedure (MC-2's repair) and the improper-fraction
multiplication rule (MC-3's repair), since both require an explicit,
non-obvious conversion step.

## Teaching Sequence

MC-1 (addition without LCD) is addressed first and is FOUNDATIONAL per
the Blueprint's own MAMR — it must be cleared before MC-2, since
subtraction's regrouping step itself depends on correctly adding a
borrowed denominator/denominator quantity to the existing fraction
part. MC-3 (mixed multiplication adds whole parts) is independent and
may be addressed once MC-1 clears, per the Blueprint's own protocol
structure. MC-2 (subtraction regrouping omitted) is addressed once MC-1
is cleared, as the direct subtraction-specific extension.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (addition without LCD) | CONTRAST PAIR: decimal-check alarm on a wrong-vs-right LCD computation | Blueprint TA-C02 |
| MC-2 active (regrouping omitted) | WORKED EXAMPLE: borrow-and-convert regrouping sequence with verify-by-adding-back | Blueprint TA-C03 |
| MC-3 active (multiplication adds whole parts) | WORKED EXAMPLE: convert-both-to-improper-then-multiply | Blueprint TA-C04 |
| Ready for transfer | THOUGHT EXPERIMENT: multi-step word problem requiring both addition and subtraction (Blueprint TA-A06/P76) | Blueprint TA-A07 mastery gate |

## Voice Teaching Notes

**Register**: Say "find the LCD first, always" whenever introducing
unlike-denominator mixed-number addition or subtraction — and say
"check: is the top fraction big enough?" before every subtraction, to
make the regrouping decision an explicit, spoken step rather than an
implicit assumption.

**Wait-time**: After presenting a subtraction where the minuend's
fraction is visibly smaller, give extended wait-time before revealing
whether regrouping is needed — let the learner attempt the comparison
themselves.

**Load-bearing sentences**:
- "Before adding two fractions with different denominators, the first
  step is always finding the LCD — never skip it."
- "If the top fraction isn't big enough to subtract from, borrow 1
  whole and convert it to a fraction with the same denominator."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Directly reusing the Blueprint's own 5-probe mastery gate (Educational
Brain v1.0 format), not restated in full — cite by reference:

**Gate 1** (Blueprint P77): state the LCD rule for addition, the
regrouping condition for subtraction, and the regrouping procedure
itself. Pass: all three correctly stated.

**Gate 2** (Blueprint P76, transfer probe): a wall is 5⅓ m wide; two
pictures of 1¾ m and 2⅝ m need to hang with at least ¼ m gap between —
is there enough room? Pass: correct total-width computation and
comparison.

**Gate 3** (Blueprint P75, misconception probe): identify the error in
a student's incorrect regrouping-omitted subtraction and give the
correct answer. Pass: correctly identifies MC-2 and computes the fix.

**Gate 4** (Blueprint P74, application probe): compute three mixed-
number expressions including addition, subtraction, and a mixed
addition-then-subtraction chain. Pass: all three correct.

**Gate 5** (Blueprint P78, mastery gate synthesis): passes only if all
of P77/P76/P75/P74 are correct.

**Mastery criterion**: all probes correct, consistent with KG
mastery_threshold 0.85.

## Tutor Recovery Strategy

Likeliest utterance: "I don't get why I have to find a common
denominator — can't I just add the fractions?" — the concept-specific
smaller question: "if I have a third of a pizza and half of a
DIFFERENT-sized pizza, can I just say I have 'a third plus a half' of
one pizza?" reframes the confusion from "fractions can always be
combined directly" (MC-1's overgeneralized addition intuition) to
"unlike-sized pieces must be re-measured in a common unit before they
can be meaningfully combined," directly isolating MC-1 with a concrete
size-mismatch scenario.

## Memory Hooks

**Type**: procedural (LCD-finding for addition, borrow-and-convert
regrouping for subtraction, directly reusing `math.arith.fractions`'s
own common-denominator machinery) + declarative (the regrouping
condition check, the estimate-and-verify confidence tools). Review
form: fresh addition/subtraction pairs requiring an explicit
regrouping-needed check, periodically paired with a decimal-estimate
sanity check to keep MC-1's guard-rail active. Interleaving partner:
`math.arith.fractions` (the base common-denominator machinery this
concept's entire LCD-finding step depends on).

## Transfer Connections

**Near transfer**:
- `math.arith.improper-fractions` (per KG `related`; the alternate
  representation this concept's own multiplication repair chain
  converts to)

**Far transfer**:
- Cooking and construction measurement: recipe scaling and material-
  length calculations are the most common real-world instance of
  mixed-number addition/subtraction
- `math.arith.ratios` (per the domain's own dependency chain; scaling
  and proportion problems frequently involve mixed-number quantities)

## Cross-Subject Connections

None via KG `cross_links` (empty for this node); the Blueprint's own
P76 transfer probes use self-contained real-world measurement contexts
(home decoration, fabric, lumber). Not fabricated beyond what the KG
and Blueprint state.

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.arith.mixed-numbers.md`
(PACKAGE_READY, Educational Brain v1.0 format).

Full Student State Protocols (A-D), the Misconception Registry (MC-1
through MC-3), and the 5-probe mastery gate reused by reference above
and not restated in full.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's single prerequisite
(`math.arith.fractions`) is exactly sufficient to state both
algorithms. The Blueprint's own Component 2 explicitly notes that
`math.arith.improper-fractions` (the KG `related` field) is NOT a
formal prerequisite — this concept develops mixed-number arithmetic
independently, converting to improper-fraction form only inline where
needed (multiplication). Estimated hours (3) and mastery threshold
(0.85) are appropriate for a concept combining a compact addition
algorithm with a genuinely error-prone subtraction extension
(regrouping).

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 2 part 2, autonomous loop) | Initial entry, grounded in the existing PACKAGE_READY Blueprint (Educational Brain v1.0 format). |
