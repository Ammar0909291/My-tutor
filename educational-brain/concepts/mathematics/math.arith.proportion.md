# Proportion — `math.arith.proportion`

## Identity

- **Concept ID**: `math.arith.proportion` (canonical mathematics KG)
- **Curriculum location**: mathematics / arithmetic — child of
  `math.arith.ratios` (no children in KG)
- **Prerequisites**: `math.arith.ratios` (a ratio a:b or a/b as a
  comparison of two quantities by division — this concept's entire
  equation-of-two-ratios definition builds on it directly).
- **Unlocks**: `math.arith.direct-variation`, `math.arith.
  inverse-variation`.
- **Related** (from KG): `math.arith.direct-variation`.
- **Difficulty**: developing · **Bloom**: apply · **Mastery
  threshold**: 0.85 · **Est. hours**: 8
- **Blueprint**: `docs/curriculum/blueprints/math.arith.proportion.md`
  (PACKAGE_READY; MAMR: MC-1 QUANTITY-POSITIONS-MISMATCHED-
  ACROSS-RATIOS is Foundational; P76_mode independence, cross_links=
  [math.func.linear-function], not yet authored — verified via
  directory listing).
- **Aliases** (from KG): "equal ratios", "proportionality".

## Learning Objective

The learner can: define a proportion as an equation stating two ratios
are equal, a/b = c/d, and solve for an unknown term using
cross-multiplication (ad = bc); correctly set up a proportion from a
word problem, ensuring the SAME kind of quantity occupies the
corresponding position in both ratios; and distinguish a genuinely
proportional relationship (constant ratio, y = kx) from a superficially
similar but non-proportional one (e.g., one involving a fixed
additive offset), using the ratio-constancy test rather than visual
impressions of "growing together."

## Core Understanding

A proportion is an equation stating that two ratios are equal:
a/b = c/d. Cross-multiplication (ad = bc, multiplying diagonally
across the equals sign) solves for an unknown term — this works
because multiplying both sides by bd clears both denominators. The
single most important step in SETTING UP a proportion correctly is
ensuring the same kind of quantity occupies the corresponding position
in both ratios (e.g., in a map-scale problem, "map distance" must sit
on top — or bottom — in BOTH ratios consistently). Two quantities are
GENUINELY proportional only if their ratio stays constant as both
scale: y = kx for a fixed constant k, so y/x = k always. A relationship
like y = x + 5 (a fixed additive offset) is NOT proportional, even
though y still grows as x grows — checking whether y/x stays constant
across different values is the definitive test, distinguishing true
proportionality from a merely co-increasing relationship.

## Mental Models

- **Beginner model — "cross-multiplication is a mechanical trick I
  apply whenever I see two fractions set equal"**: the learner can
  execute ad = bc correctly once an equation is given but does not
  verify that the equation itself correctly represents the intended
  relationship — quantities may be mismatched across the two ratios,
  or the underlying relationship may not even be proportional at all.
  Shelf-life warning: the mechanical procedure produces a numerically
  clean answer even when applied to an incorrectly set-up or invalid
  equation, giving false confidence.
- **Intermediate model — "I check that quantities match position across
  both ratios before cross-multiplying, and I can solve correctly set
  up proportions reliably"**: the learner correctly verifies
  quantity-position consistency but may still assume any
  "both-quantities-increase-together" relationship is automatically
  proportional, without explicitly testing ratio constancy. Upgrade
  trigger: being asked to test whether a flat-fee-plus-rate cost
  structure (e.g., taxi fare) is truly proportional to distance.
- **Advanced model — "proportionality is defined by CONSTANT ratio
  (y/x = k for all values), which I test explicitly rather than infer
  from co-increasing behavior; I also verify quantity-position
  consistency before ever cross-multiplying"**: the learner fluently
  distinguishes genuinely proportional relationships from
  flat-fee-plus-rate structures by computing the ratio at two or more
  different values and checking for constancy. Upgrade trigger: being
  asked to connect this ratio-constancy test to a linear function's
  y-intercept (proportional relationships pass through the origin;
  non-proportional linear relationships with a nonzero offset do not).
- **Do not upgrade early**: a learner who still cross-multiplies
  mechanically without verifying quantity-position consistency
  (beginner model, MC-1/MC-3) should not be pushed toward the
  genuine-proportionality test (advanced model, MC-2) before correct
  setup is fully secure — MC-1 is FOUNDATIONAL per the Blueprint's own
  MAMR.

## Why Students Fail

The dominant, FOUNDATIONAL failure sets up a proportion with
corresponding quantity types in inconsistent positions across the two
ratios (e.g., map distance on top in one ratio, real distance on top
in the other), producing an answer to the wrong question despite
executing cross-multiplication flawlessly — the procedure itself never
signals that the setup was wrong. A second failure assumes any
relationship where both quantities increase together must be a true
proportion, without ever checking whether their ratio actually stays
constant — a flat-fee-plus-rate cost structure (like a taxi fare) LOOKS
proportional because cost clearly rises with distance, but the ratio
changes at every value, confirming it is not. A third, related failure
applies the mechanical cross-multiplication procedure to an equation
that was never a valid proportion setup in the first place (mismatched
units or quantities), producing a numerically "correct" but
meaningless result — this is the broader failure class that the first
(quantity-position mismatch) is the leading specific instance of.

## Misconceptions

Reusing the Blueprint's Misconception Registry, birth-type
classification added per this program's diagnostic procedure — not
re-derived:

### MC-1: QUANTITY-POSITIONS-MISMATCHED-ACROSS-RATIOS (Foundational; Type 5 — instruction-induced)
**Trigger**: setting up a map-scale proportion as 2cm/50km = 175km/x
(real distance now on top in the second ratio) rather than keeping map
distance on top in BOTH ratios — the mechanical cross-multiplication
procedure is typically taught before an explicit setup-verification
step, so students learn to solve the equation without first learning
to check that it represents the intended relationship.
**Repair**: before cross-multiplying, always verify — is the SAME type
of quantity in matching positions (both numerators, or both
denominators) across both ratios? Fix the setup before solving, not
after.
**MAMR**: FOUNDATIONAL — a mismatched setup produces a numerically
clean but meaningless answer to the wrong question; must clear before
MC-2 or MC-3.

### MC-2: ANY-INCREASING-RELATIONSHIP-ASSUMED-PROPORTIONAL (Foundational; Type 1 — overgeneralization)
**Trigger**: a flat-fee-plus-rate taxi cost (C = 5 + 2m) is assumed
proportional to miles because cost clearly increases as miles
increase — over-generalizing "grows together" to mean "proportional,"
without checking ratio constancy.
**Repair**: compute the ratio C/m at two different values — at m=5,
C/m=3; at m=10, C/m=2.5 — the ratio CHANGES, confirming this is NOT a
proportional relationship, even though cost clearly increases with
miles.

### MC-3: CROSS-MULTIPLICATION-APPLIED-WITHOUT-VALID-PROPORTION-SETUP (Moderate; Type 5 — instruction-induced)
**Trigger**: given a proportion with a units or quantity mismatch,
learner cross-multiplies immediately without questioning whether the
setup itself is valid — the broader failure class that MC-1's
position-mismatch is the leading specific instance of.
**Repair**: cross-multiplication is a valid algebraic step only once
the proportion itself correctly represents the intended relationship —
garbage in, garbage out; setup verification always precedes
mechanical solving.

## Analogies

**Primary — the scale-model bridge (Blueprint's own opening
anchor)**: a scale model states "1 inch represents 10 feet." To find
the real-world length of a 3.5-inch model measurement, set up
1in/10ft = 3.5in/x ft and cross-multiply: x = 35 feet. Cross-
multiplying is just clearing the fractions — multiply diagonally, then
solve the resulting simple equation, PROVIDED both ratios keep
model-measurement on top and real-world-measurement on bottom
consistently.

**Anti-analogy to retire**: "If both numbers in a relationship go up
together, it's a proportion." This directly invites MC-2 by treating
co-increasing behavior as sufficient for proportionality, when a fixed
additive offset (flat fee) breaks the required constant-ratio
property.

## Demonstrations

**Setup-mismatch contrast (Blueprint's own Contrast 1, targets MC-1)**:
the CORRECT map-scale setup 2cm/50km = xcm/175km (map on top
consistently) placed directly beside the INCORRECT mixed setup
2/50 = 175/x (positions swapped) — solving both gives DIFFERENT
answers, only one of which is correct.

**Genuine-vs-superficial proportionality contrast (Blueprint's own
Contrast 2, targets MC-2)**: a flat-fee taxi (C = 5 + 2m, ratio C/m
changes: 3 at m=5, 2.5 at m=10 — NOT proportional) versus a flat-rate
taxi (C = 3m, ratio C/m = 3 always — genuinely proportional) —
computing the ratio at two different values is the definitive test.

## Discovery Questions

Present the flat-fee-taxi cost structure (C = 5 + 2m) alongside a
flat-rate structure (C = 3m) and ask the learner to compute cost at two
different mileages for each, then compare cost/mile ratios — the
learner discovers the ratio changes for one structure and stays
constant for the other before the formal definition is stated.
Recommendation: guided discovery for the ratio-constancy test itself
(directly experiential from computing and comparing ratios); direct
instruction for the formal cross-multiplication procedure and setup-
verification rule (MC-1's repair), since the algebraic justification
(clearing denominators by multiplying by bd) is not independently
rediscoverable without being shown.

## Teaching Sequence

MC-1 (quantity positions mismatched) is addressed first, since correct
setup is the FOUNDATIONAL prerequisite for any proportion problem to
be meaningful at all. MC-3 (cross-multiplication without valid setup)
is addressed alongside MC-1, as the broader failure class MC-1
instantiates. MC-2 (any increasing relationship assumed proportional)
is addressed last, as a conceptually distinct question (genuine
proportionality vs. mere co-increase) rather than a setup-mechanics
issue.

## Tutor Actions

| Student state | Recommended action | Source |
|---|---|---|
| MC-1 active (quantity positions mismatched) | WORKED EXAMPLE: correct vs. mismatched map-scale setup contrast | Teaching Actions: SHOW §1 |
| MC-3 active (cross-multiplication without valid setup) | WORKED EXAMPLE: units/quantity-mismatch detection exercise before solving | Teaching Actions: SHOW §1 |
| MC-2 active (any increasing relationship assumed proportional) | DEMONSTRATION: flat-fee vs. flat-rate taxi ratio-constancy contrast | Teaching Actions: SHOW §3 |
| Ready for transfer | THOUGHT EXPERIMENT: photo-enlargement aspect-ratio proportion vs. flat-fee print-cost non-proportion (Blueprint P76) | Teaching Actions: TEST-THINKING §4 |

## Voice Teaching Notes

**Register**: Say "check the setup before solving" rather than jumping
straight to "cross-multiply" — the setup-verification step is
load-bearing and directly guards against MC-1 and MC-3.

**Wait-time**: After presenting the flat-fee taxi's cost formula, give
extended wait-time before revealing the ratio computation — let the
learner predict whether the relationship is proportional before
checking.

**Load-bearing sentences**:
- "Before cross-multiplying, check: is the same type of quantity in
  the same position in both ratios?"
- "Growing together is not the same as proportional — check whether
  the ratio itself stays constant."

**Voice channel note**: See `foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Directly reusing the Blueprint's own P77 4-problem gate set and P76
transfer probe, not restated in full — cite by reference:

**Gate 1** (Blueprint Problem 1): solve 5/8 = x/40 using
cross-multiplication. Pass: x = 25.

**Gate 2** (Blueprint Problem 2): a recipe uses 3 cups flour per 2 cups
sugar; find sugar needed for 10 cups flour, keeping quantities
consistently positioned. Pass: correct setup and solution (sugar =
20/3 cups).

**Gate 3** (Blueprint Problem 3): determine, via the ratio test,
whether a flat $20-plus-$0.05-per-text phone plan's cost is
proportional to number of texts. Pass: correctly computes the ratio
at two values and concludes not proportional.

**Gate 4** (Blueprint Problem 4): identify and fix a mismatched
map-scale proportion setup. Pass: correctly diagnoses the position
mismatch and produces a corrected setup.

**Gate 5** (Blueprint P76, independence transfer probe): set up and
solve a photo-enlargement proportion preserving aspect ratio; separately
explain why a flat-fee print-cost structure is not proportional to
print area using the ratio-constancy test. Pass: correct proportion
solution and correct non-proportionality explanation.

**Mastery criterion**: 5/5 on the full Blueprint item bank (4 P77 items
+ P76), consistent with KG mastery_threshold 0.85 (⌈0.85×5⌉=5).

## Tutor Recovery Strategy

Likeliest utterance: "I cross-multiplied and got an answer, so why is
it wrong?" — the concept-specific smaller question: "does the same
type of quantity sit in the same position — both numerators, or both
denominators — in both ratios?" reframes the confusion from "the
procedure must have failed" to "the setup, not the procedure, needs
checking," directly isolating MC-1/MC-3 by walking the learner back to
the step before cross-multiplication.

## Memory Hooks

**Type**: procedural (setup-verification followed by
cross-multiplication) + declarative (the ratio-constancy test for
genuine proportionality). Review form: fresh word-problem proportion
setups mixing correctly and incorrectly matched quantity positions,
periodically paired with a "is this relationship truly proportional?"
ratio-check prompt to keep MC-2's guard-rail active. Interleaving
partner: `math.arith.ratios` (the single-ratio concept this
equation-of-two-ratios definition builds on directly).

## Transfer Connections

**Near transfer**:
- `math.arith.direct-variation` (per KG `unlocks`; direct variation,
  y = kx, is exactly the genuinely-proportional relationship this
  concept's genuine-vs-superficial test contrasts against
  non-proportional cases)
- `math.arith.inverse-variation` (per KG `unlocks`; inverse variation,
  xy = k, is a related but structurally different proportional
  relationship building on the same ratio-constancy reasoning)

**Far transfer**:
- `math.func.linear-function` (per KG `cross_links`; a proportional
  relationship y = kx is exactly a linear function with zero
  y-intercept, while a non-proportional linear relationship y = mx + b
  with b≠0 draws the identical distinction this concept's Example 3
  makes informally)

## Cross-Subject Connections

Per KG `cross_links` [`math.func.linear-function`]: this entry's own
Blueprint (`docs/curriculum/blueprints/math.arith.proportion.md`)
determined P76_mode = independence, having verified via directory
listing at the Blueprint's own authoring time that no Blueprint yet
existed for `math.func.linear-function`. **Correction (2026-07-26,
Wave 4 part 2, discovered while authoring `math.arith.
direct-variation`)**: a Blueprint for `math.func.linear-function` now
exists (`docs/curriculum/blueprints/math.func.linear-function.md`,
dated 2026-07-22) — the claim above was accurate when this concept's
own Blueprint was authored but is now stale. No Educational Brain
entry yet exists for `math.func.linear-function` itself (verified via
directory listing). This entry's own P76 mastery-gate content (the
photo-enlargement/print-cost probe, independence mode) is NOT rewritten
here, since it correctly reflects this concept's OWN Blueprint's
already-authored assessment content; a future revision may add a
genuine cross-link probe alongside it, connecting this concept's
genuine-proportionality test to `math.func.linear-function`'s own
documented classification of y = mx (proportional) versus y = mx + b,
b≠0 (linear but not proportional).

## Blueprint References

Blueprint: `docs/curriculum/blueprints/math.arith.proportion.md`
(all structural/grammar/content/AIR checks PASS).

Full Teaching Actions (A01 through A03/mastery gate) and Protocol B
repair actions (B01 through B03) reused by reference above and not
restated in full; the Misconception Registry (MC-1 through MC-3) and
the P77/P76 mastery-gate item bank cited directly by ID.

## Runtime Asset References

None seeded yet in `src/lib/teaching/assets/brainSeedAssets.ts` or the
live DB for this concept — this entry does not create any.

## Curriculum Feedback

No structural KG issues found. This concept's single prerequisite
(`math.arith.ratios`) and its two unlocks (`math.arith.
direct-variation`, `math.arith.inverse-variation`) match the
Blueprint's own Component 7 exactly. The `math.func.linear-function`
cross-link is confirmed genuinely not-yet-authored (consistent with
the Blueprint's own V-5 check), carried forward here rather than
invented — the same honest-gap pattern already recorded for
`math.arith.ratios`'s identical cross-link in this program's prior
wave.

## Version History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | 2026-07-26 | Curriculum Completion Program (math.arith domain, Wave 3, autonomous loop) | Initial entry, grounded in the existing PACKAGE_READY Blueprint. |
