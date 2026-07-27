# math.geom.length

## Identity
- **KG ID**: `math.geom.length`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.line-segment`
- **Unlocks**: `math.geom.distance-formula`
- **Cross-links**: `math.geom.distance-formula` (Blueprint exists, no Educational Brain entry yet; P76_mode = cross-link probe).
- **Difficulty**: foundational
- **Bloom level**: apply
- **Mastery threshold**: 0.95 (⌈0.95×5⌉ = 5/5)
- **Estimated hours**: 2
- **Blueprint**: none exists yet for this concept as of this entry's authoring date; misconceptions authored directly via the birth-taxonomy diagnostic procedure (`educational-brain/misconceptions/01-birth-types.md`).

## Learning Objective
The student will state that a length measurement is only complete when paired with its unit, correctly recognize that the total distance traveled along a bent (non-straight) path is generally different from the straight-line distance between its endpoints, and correctly convert between units before comparing or combining two length measurements.

## Core Understanding
Length is the one-dimensional measure of a line segment — a distance, extended to curves via arc length. Per this concept's own scope (distinct from `math.geom.line-segment`'s prior finding that a segment exists as a geometric object independent of whether it's ever measured): length develops the actual MEASUREMENT of that segment, always requiring both a numeric value and a unit (a bare "5" is not a complete length; "5 cm" is). Length is additive along a straight, collinear path (segment AB plus segment BC equals segment AC when A, B, C are collinear) — but this additivity does NOT extend to bent, non-collinear paths: the total distance traveled walking three blocks east then four blocks north is seven blocks, genuinely different from the five-block straight-line distance between start and end. Comparing or combining two lengths given in different units (e.g., 3 meters and 250 centimeters) requires converting to a common unit first — the bare numerals 3 and 250 are not directly comparable.

## Mental Models
1. **The number-plus-unit model**: a length measurement is only complete with both parts — the number alone ("5") is meaningless without stating what it counts (cm, m, miles).
2. **The path-versus-displacement model**: the total distance traveled along a bent path (sum of each segment's length) is generally different from — and always at least as large as — the straight-line distance between the path's start and end points.
3. **The common-unit-first model**: comparing or adding lengths given in different units requires converting to a shared unit before the numerals can be meaningfully compared.

## Why Students Fail
The foundational failure is treating a bare number as a complete length measurement, omitting the unit that gives the number meaning. A second failure is believing the total distance traveled along a bent, non-straight path equals the straight-line distance between its start and end points, incorrectly extending the additivity of collinear segment lengths to paths that change direction. A third failure is comparing or combining two lengths given in different units by comparing their bare numerals directly, without converting to a common unit first.

## Misconceptions
Authored directly via the birth-taxonomy diagnostic procedure (no Blueprint exists for this concept):

- **LENGTH-VALUE-INCOMPLETE-WITHOUT-UNITS** (FOUNDATIONAL)
  - **Description**: treating a bare number as a complete length measurement, omitting the unit.
  - **Birth type**: Type 4, notation-induced — numeric answers are frequently accepted or checked without requiring units in casual practice, teaching students the number alone is sufficient.
  - **Repair approach**: require every stated length to be immediately followed by its unit, refusing to accept a bare numeral as a finished answer, until the habit becomes automatic.

- **LENGTH-ASSUMED-ADDITIVE-FOR-ANY-PATH** (Foundational)
  - **Description**: believing the total distance traveled along a bent, non-collinear path equals the straight-line distance between its endpoints.
  - **Birth type**: Type 1, overgeneralization — the correct additivity of collinear segment lengths (segment AB plus segment BC equals segment AC when the three points lie on one line) is over-applied to paths that change direction, where it genuinely fails.
  - **Repair approach**: compute the total distance walked (3 blocks east + 4 blocks north = 7 blocks) directly beside the straight-line distance between start and end (5 blocks, via the not-yet-formalized distance formula), confirming the two answers genuinely differ.

- **LENGTH-COMPARISON-ASSUMED-VALID-ACROSS-UNITS-WITHOUT-CONVERSION** (Moderate)
  - **Description**: comparing or combining two lengths given in different units by comparing their bare numerals directly, without converting to a common unit.
  - **Birth type**: Type 2, perceptual intuition — a larger numeral perceptually feels like a larger quantity, regardless of the unit scale it's paired with (e.g., assuming 250 must be more than 3, missing that 250cm equals only 2.5m, less than 3m).
  - **Repair approach**: convert both quantities to the same unit before comparing (e.g., 3m = 300cm, directly comparable to 250cm), confirming the correct ordering only emerges after conversion.

## Analogies
- **The path-versus-shortcut analogy**: walking around two sides of a rectangular field covers more ground than cutting straight across the diagonal — the path length and the straight-line distance are genuinely different quantities for a bent route.

## Demonstrations
- Stating a length as "5" without units, then asking what is actually being claimed, targeting the units-incomplete misconception.
- Computing total distance walked (east then north) versus straight-line distance between start and end, confirming they differ, targeting the path-additivity misconception.
- Comparing 3 meters and 250 centimeters by converting both to the same unit first, confirming 3m > 250cm despite 250 being the larger bare numeral, targeting the unit-comparison misconception.

## Discovery Questions
1. "Is '5' a complete length measurement on its own?"
2. "If you walk 3 blocks east then 4 blocks north, is the total distance you walked the same as the straight-line distance from start to finish?"
3. "Is 250 centimeters more or less than 3 meters — can you tell just by comparing 250 and 3?"

## Teaching Sequence
1. Establish that every length needs a stated unit, refusing bare numerals as complete answers.
2. Compute total path distance versus straight-line distance for a bent path, confirming they differ.
3. Compare two lengths in different units, requiring conversion to a common unit before comparison.
4. Mastery gate: state a measured length with correct units, compute total path length versus straight-line distance for a given bent path, and correctly order two lengths given in different units.

## Tutor Actions
- **TEST-THINKING: Error Analysis** — presenting a bare numeral as a "length" and asking what's missing, targeting the units-incomplete misconception.
- **DO: Worked Example** — computing total path distance versus straight-line distance for an east-then-north walk, targeting the path-additivity misconception.
- **DO: Worked Example** — converting 3m and 250cm to a common unit before comparing, targeting the unit-comparison misconception.
- **TELL: Explanation** — the collinear-additivity rule and precisely why it fails once the path bends.

## Voice Teaching Notes
When a student states a length, ask "what's the unit?" as a standing check directly targeting the units-incomplete misconception before accepting any numeric answer.

## Assessment Signals
- **P76 (transfer probe, cross-link probe mode against `math.geom.distance-formula` per this concept's own cross-link)**: "A student walks 3 blocks east, then 4 blocks north. (a) What is the total distance walked? (b) Using the idea that will become the distance formula, what is the straight-line distance from start to finish? (c) Are these two answers the same? Explain why or why not, using this lesson's path-versus-straight-line-distance distinction."
- **Mastery gate (4-item problem set)**: (1) state a segment's length with correct units, given a diagram; (2) compute total distance walked for a two-leg bent path; (3) compute the straight-line distance for the same path (informally, without the full distance formula) and confirm it's shorter; (4) determine which is larger, 4m or 350cm, by converting to a common unit first. MAMR 5/5.

## Tutor Recovery Strategy
If the path-additivity misconception persists, require the student to physically trace (or describe tracing) each leg of a bent path separately before summing, contrasted directly against drawing the single straight segment connecting start to finish, until the two quantities are reliably distinguished.

## Memory Hooks
- "A number alone isn't a length — you need the unit too."
- "Walking around a bend covers more ground than cutting straight across."
- "Convert to the same unit before comparing two lengths — don't trust the bare numbers."

## Transfer Connections
- `math.geom.distance-formula` (unlocks, cross-link) formalizes the straight-line-distance computation this concept's path-versus-distance distinction previews.
- `math.geom.line-segment` (requires) supplies the geometric object whose measurable property this concept develops.

## Cross-Subject Connections
- Physics: the distinction between total distance traveled and net displacement is a direct application of this concept's path-versus-straight-line-distance distinction.

## Blueprint References
None — no Blueprint exists for this concept as of this entry's authoring date.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None found at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 4 part 2.
