# math.geom.angle-measurement

## Identity
- **KG ID**: `math.geom.angle-measurement`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.angle`
- **Unlocks**: `math.trig.angle-measure`
- **Cross-links**: `math.trig.angle-measure` (Blueprint exists, no Educational Brain entry yet; P76_mode = cross-link probe).
- **Difficulty**: foundational
- **Bloom level**: apply
- **Mastery threshold**: 0.90 (⌈0.90×6⌉ = 6/6)
- **Estimated hours**: 3
- **Blueprint**: `docs/curriculum/blueprints/math.geom.angle-measurement.md` (reused by reference throughout this entry).

## Learning Objective
The student will correctly read an angle's measure from a protractor by identifying which of its two opposing scales to use, convert between degrees and radians using the exact formula (never dropping the π factor), and correctly infer a reflex angle's measure from the non-reflex portion the protractor directly measures.

## Core Understanding
Per the Blueprint's Component 1: a standard protractor measures angles from 0° to 180° by placing the angle's vertex at the center hole, aligning one ray along the 0° baseline, and reading where the second ray crosses the arc. A protractor carries two overlapping scales running in opposite directions (0→180° left-to-right and 0→180° right-to-left); the correct scale to read is the one whose 0° lines up with the ray lying along the baseline on that same side — reading the other scale gives the supplementary value (180°−θ) instead. Degrees and radians are two units for the same rotation: θ_rad = θ_deg × π/180, and θ_deg = θ_rad × 180/π; a full rotation is 360° = 2π rad, with key benchmarks 30°=π/6, 45°=π/4, 60°=π/3, 90°=π/2, 180°=π. A standard protractor only reads 0°–180° directly; a reflex angle (180°–360°) is inferred as 360° minus the protractor's direct reading of the angle's non-reflex portion.

## Mental Models
1. **The speedometer-as-rotation-meter model** (Blueprint TA-A01, P03): a protractor, like a speedometer measuring rotation from a resting needle, reads how much rotation has occurred between a fixed "at rest" ray and the rotated second ray.
2. **The same-side-scale model** (Blueprint TA-A02, P64): the correct scale to read is always the one whose 0° mark sits on the same side as the baseline ray — never the opposite scale, which yields the supplement.
3. **The multiply-don't-divide model** (Blueprint TA-B02, P06): converting degrees to radians is a multiplication by the fraction π/180, not a division by 180 alone — the π factor is never optional.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is reading the wrong one of a protractor's two overlapping scales, producing a supplementary reading (θ instead of 180°−θ) with no rule for which scale matches the angle's actual opening direction. A second failure is converting degrees to radians by dividing by 180 alone, omitting the π factor and producing a dimensionless ratio rather than a true radian measure. A third failure is treating a protractor's 180° limit as an absolute barrier, concluding reflex angles (>180°) simply cannot be measured, rather than inferring them from the measurable non-reflex portion.

## Misconceptions
Reused by reference from the Blueprint's Component 2 Misconception Registry, with birth-type classification added:

- **MC-1 — PROTRACTOR-WRONG-SCALE** (FOUNDATIONAL)
  - **Blueprint description**: reading the wrong scale on the protractor, giving a supplementary reading (θ instead of 180°−θ or vice versa).
  - **Birth type**: Type 4, notation-induced — the protractor's two overlapping, oppositely-directed number scales carry no built-in rule for which to read, so learners pick arbitrarily or default to always reading the same one.
  - **Repair approach**: Blueprint Repair Action TA-B01 — the visual sanity check that an acute-looking angle must read below 90°, paired with the same-side-scale rule.

- **MC-2 — CONVERSION-FORMULA-MISSING-PI** (Secondary)
  - **Blueprint description**: converting degrees to radians as θ_rad = θ_deg / 180, forgetting the π factor.
  - **Birth type**: Type 1, overgeneralization — "divide by 180" is remembered as the whole rule from a partially-recalled formula, dropping the multiplicative π term that makes the result a true angular measure rather than a bare ratio.
  - **Repair approach**: Blueprint Repair Action TA-B02 — the side-by-side contrast of correct (θ_deg × π/180) versus incorrect (θ_deg / 180) results for 90°, 180°, and a full circle.

- **MC-3 — REFLEX-ANGLE-UNMEASURABLE** (Secondary)
  - **Blueprint description**: believing a reflex angle cannot be measured because a standard protractor only goes to 180°.
  - **Birth type**: Type 4, notation-induced — the protractor's physical 180° scale limit is mistaken for an absolute mathematical limit on what angles it can help measure.
  - **Repair approach**: Blueprint Repair Action TA-B03 — reflex = 360° − (measured non-reflex portion), directly using the protractor's actual reading rather than treating it as unusable.

## Analogies
- **The speedometer analogy** (Blueprint TA-A01, P03): a car speedometer's needle rotates from a resting 0-position exactly as a protractor's second ray rotates from the 0° baseline — both instruments read how much rotation has occurred, not an absolute position.

## Demonstrations
- The two-scale protractor reading contrast: an angle opening right read as 40° (correct, right-side scale) versus 140° (wrong, left-side scale) (Blueprint TA-A02, P07), targeting MC-1.
- The degree-radian benchmark table (30°=π/6 through 360°=2π), inducing the ×π/180 pattern (Blueprint TA-A03, P04).
- The reflex-angle inference: a 250° reflex angle measured indirectly as 360°−110° from its 110° non-reflex portion (Blueprint TA-A04, P07), targeting MC-3.

## Discovery Questions
1. "A protractor shows two numbers where a ray crosses the arc — how do you know which one is the real measure?"
2. "If you convert degrees to radians by only dividing by 180, what units does your answer actually have?"
3. "Can a protractor that only shows 0° to 180° still help you find an angle of 250°?"

## Teaching Sequence
Follows the Blueprint's Component 4 exactly: TA-A01 (protractor as a rotation meter, speedometer analogy) → TA-A02 (misconception gate: PROTRACTOR-WRONG-SCALE) → TA-A03 (degree-radian benchmarks by pattern induction) → TA-A04 (reflex angles and conversion practice) → TA-A05 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Analogy** — the speedometer-as-rotation-meter bridge to protractor reading (Blueprint TA-A01).
- **TEST-THINKING: Error Analysis** — the two-scale reading contrast for angles opening right vs. left (Blueprint TA-A02), targeting MC-1.
- **DO: Worked Example** — the degree-radian benchmark table, inducing the conversion pattern (Blueprint TA-A03).
- **DO: Worked Example** — reflex angle inference and non-benchmark conversions (Blueprint TA-A04), targeting MC-3.

## Voice Teaching Notes
Before accepting any protractor reading, ask "does that reading look right for how wide the angle looks?" as a standing visual sanity check directly targeting MC-1's wrong-scale error.

## Assessment Signals
- **P76 (transfer probe, cross-link probe mode against `math.trig.angle-measure` per the Blueprint's Component 0 — cross_links includes this target)**: reused verbatim from the Blueprint's Component 4 TA-A05 — the compass-bearing scenario converting a 120° bearing to radians, classifying a 210° bearing as reflex, and converting a 3π/4 rad turn back to degrees.
- **P77 (mastery gate)**: the Blueprint's 5-item problem set plus P76 (Component 4 TA-A05), MAMR 6/6.

## Tutor Recovery Strategy
If MC-1 persists, require the student to state out loud which side of the baseline the angle opens toward before reading either scale, confirming the reading matches a same-side visual sanity check, until the habit becomes automatic.

## Memory Hooks
- "Read the scale that starts at 0° on the same side your angle opens from."
- "Degrees to radians: multiply by π/180 — never just divide."
- "A protractor's 180° limit isn't a wall — reflex = 360° minus what it shows you."

## Transfer Connections
- `math.trig.angle-measure` (unlocks, cross-link) builds directly on protractor-based measurement and degree-radian conversion as its entry point into trigonometric angle work.
- `math.geom.angle` (requires) supplies the definition of angle as rotation between two rays that this concept's measurement skills operationalize.

## Cross-Subject Connections
- Physics: angular measurements in rotational motion and navigation bearings both rely directly on this concept's degree-radian conversion and reflex-angle inference.

## Blueprint References
`docs/curriculum/blueprints/math.geom.angle-measurement.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None found at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 5.
