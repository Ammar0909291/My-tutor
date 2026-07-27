# math.geom.perpendicular-lines

## Identity
- **KG ID**: `math.geom.perpendicular-lines`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.angle`
- **Unlocks**: `math.geom.right-triangle`
- **Cross-links**: none (KG lists no cross-links for this concept; P76_mode = independence).
- **Difficulty**: foundational
- **Bloom level**: understand
- **Mastery threshold**: 0.90 (⌈0.90×5⌉ = 5/5)
- **Estimated hours**: 3
- **Blueprint**: `docs/curriculum/blueprints/math.geom.perpendicular-lines.md` (reused by reference throughout this entry).

## Learning Objective
The student will define perpendicular lines by the exact 90° intersection condition regardless of orientation, correctly distinguish "intersecting" (any angle) from "perpendicular" (exactly 90°), and correctly identify the perpendicular segment from an external point to a line as the unique shortest distance to that line.

## Core Understanding
Per the Blueprint's Component 1: two lines ℓ and m are perpendicular (ℓ ⊥ m) if and only if they intersect at exactly 90° — when they do, all four angles at the intersection are 90°. Perpendicularity requires intersection (parallel lines cannot be perpendicular) and is orientation-independent: lines at 45° and 135° from horizontal are perpendicular purely because their difference is 90°, with no requirement that either line be horizontal or vertical. The perpendicular from an external point P to a line ℓ is the unique line through P meeting ℓ at 90°; the perpendicular distance |PF| (F the foot of the perpendicular) is the shortest possible distance from P to any point on ℓ — every other (oblique) segment from P to ℓ is strictly longer, since in the right triangle formed, the perpendicular segment is a leg and any oblique segment is a hypotenuse, and a hypotenuse always exceeds a leg.

## Mental Models
1. **The T-square model** (Blueprint TA-A01, P03): a carpenter's T-square always marks a right angle no matter how the workpiece is tilted — perpendicularity lives in the 90° angle itself, not in any particular orientation of the lines.
2. **The angle-difference model** (Blueprint TA-A02, P64): two lines are perpendicular exactly when their angles from horizontal differ by 90° (mod 180°) — orientation is irrelevant; only the difference matters.
3. **The leaning-ladder model** (Blueprint TA-A03, P06): a vertical (perpendicular) ladder from a point to a wall is always shorter than any tilted ladder reaching the same wall — the perpendicular segment is the uniquely shortest path.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is believing lines are perpendicular only if one is horizontal and one is vertical, from overfitting to textbook diagrams that overwhelmingly show axis-aligned examples. A second failure is conflating "intersecting" with "perpendicular," labeling any crossing lines as perpendicular without checking whether the angle is exactly 90°. A third failure is failing to recognize that the perpendicular segment from a point to a line is uniquely the shortest such segment, treating any nearby oblique segment as equally valid for measuring distance.

## Misconceptions
Reused by reference from the Blueprint's Component 2 Misconception Registry, with birth-type classification added:

- **MC-1 — PERPENDICULAR-ONLY-H-V** (FOUNDATIONAL)
  - **Blueprint description**: believing lines are perpendicular only if one is horizontal and one is vertical.
  - **Birth type**: Type 1, overgeneralization — the overwhelming majority of textbook perpendicular-line examples are axis-aligned, so the visual pattern "one horizontal, one vertical" is over-generalized into the defining property itself, displacing the true 90°-angle condition.
  - **Repair approach**: Blueprint Repair Action TA-B01 — the angle-difference table showing 45°+135°, 20°+110°, and horizontal+vertical all yield a 90° difference and are all perpendicular, regardless of orientation.

- **MC-2 — INTERSECTING-IS-PERPENDICULAR** (Secondary)
  - **Blueprint description**: believing any two lines that cross are perpendicular.
  - **Birth type**: Type 1, overgeneralization — "lines cross" is over-extended to mean "lines are perpendicular," dropping the requirement that the crossing angle specifically equal 90° rather than any of the infinitely many other possible angles.
  - **Repair approach**: Blueprint Repair Action TA-B02 — the intersecting-vs-perpendicular contrast table, isolating 90° as the one special case among all possible intersection angles.

- **MC-3 — CLOSEST-NOT-PERPENDICULAR** (Secondary)
  - **Blueprint description**: treating any segment from a point to a line as equally valid for "the shortest distance," not recognizing the perpendicular as uniquely minimal.
  - **Birth type**: Type 2, perceptual intuition — without an explicit right-triangle argument, a nearby oblique segment can look just as short as the true perpendicular, so the geometric guarantee of uniqueness goes unnoticed.
  - **Repair approach**: Blueprint Repair Action TA-B03 — the right-triangle leg-versus-hypotenuse argument, proving any oblique segment is strictly longer than the perpendicular.

## Analogies
- **The T-square analogy** (Blueprint TA-A01, P03): a carpenter's T-square held against a workpiece always marks a 90° angle regardless of how the board is tilted, mirroring how perpendicularity is defined by the angle itself, not by orientation in space.
- **The leaning-ladder analogy** (Blueprint TA-A03, P06): a tilted ladder reaching the same height as a vertical one always requires more length — directly paralleling why any oblique segment from a point to a line is longer than the perpendicular segment.

## Demonstrations
- The angle-difference test applied to horizontal+vertical, 45°+135°, and 20°+110° pairs, all confirming perpendicularity via a 90° difference (Blueprint TA-A02, P64), targeting MC-1.
- The oblique-versus-perpendicular-segment length contrast using a right triangle's leg-hypotenuse relationship (Blueprint TA-A03, P06), targeting MC-3.
- The four-angles-at-an-intersection argument: if one angle is 90°, its vertical angle and both supplementary adjacent angles are forced to 90° as well (Blueprint TA-A04, P77 Q1).

## Discovery Questions
1. "Are two lines at 45° and 135° from horizontal perpendicular, even though neither is horizontal or vertical?"
2. "If two lines cross, are they automatically perpendicular?"
3. "Is a segment drawn at an angle from a point to a line ever shorter than the perpendicular segment to that same line?"

## Teaching Sequence
Follows the Blueprint's Component 4 exactly: TA-A01 (perpendicular lines and the 90° condition, T-square analogy) → TA-A02 (misconception gate: PERPENDICULAR-ONLY-H-V) → TA-A03 (perpendicular distance as the shortest path) → TA-A04 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Analogy** — the T-square bridge to the orientation-independent 90° condition (Blueprint TA-A01).
- **TEST-THINKING: Error Analysis** — the angle-difference contrast across differently-oriented perpendicular pairs (Blueprint TA-A02), targeting MC-1.
- **SHOW: Demonstration** — the leaning-ladder contrast between oblique and perpendicular segment lengths (Blueprint TA-A03), targeting MC-3.
- **TELL: Explanation** — the intersecting-vs-perpendicular distinction, isolating 90° as the special case (Blueprint TA-B02).

## Voice Teaching Notes
When a student calls two crossing lines "perpendicular," ask "what's the actual angle at the crossing — did you check it's exactly 90°?" as a standing check directly targeting MC-2.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 0 — cross_links = none)**: reused verbatim from the Blueprint's Component 4 TA-A04 — the city-planner street scenario finding a perpendicular street's angle, comparing an oblique 75° pedestrian path to the 100m perpendicular distance, and confirming the perpendicular route's uniqueness.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set plus P76 (Component 4 TA-A04), MAMR 5/5.

## Tutor Recovery Strategy
If MC-1 persists, require the student to compute the angle difference explicitly for several differently-oriented line pairs (never just horizontal/vertical) before accepting or rejecting a perpendicularity claim, until orientation-independence is reliably applied.

## Memory Hooks
- "Perpendicular means exactly 90° at the crossing — orientation doesn't matter."
- "Crossing lines aren't automatically perpendicular — check the actual angle."
- "The perpendicular segment to a line is always the shortest path from a point to it."

## Transfer Connections
- `math.geom.right-triangle` (unlocks) contains exactly one 90° angle — the angle formed by two perpendicular sides this concept defines.
- `math.geom.angle` (requires) supplies the right angle (90°) that is the defining condition for perpendicularity.

## Cross-Subject Connections
- Physics: normal force and normal-incidence optics both rely directly on the perpendicular-to-a-surface construction and its shortest-distance property defined here.

## Blueprint References
`docs/curriculum/blueprints/math.geom.perpendicular-lines.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None found at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 5.
