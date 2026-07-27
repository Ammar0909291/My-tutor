# math.geom.distance-formula

## Identity
- **KG ID**: `math.geom.distance-formula`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.pythagorean-theorem`, `math.geom.coordinate-plane`
- **Unlocks**: `math.geom.circle-equation`, `math.geom.midpoint-formula`
- **Cross-links**: `math.linalg.norm` (Blueprint exists, no Educational Brain entry yet; P76_mode = cross-link probe).
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9 (⌈0.9×5⌉ = 5/5)
- **Estimated hours**: 4
- **Blueprint**: `docs/curriculum/blueprints/math.geom.distance-formula.md` (reused by reference throughout this entry).

## Learning Objective
The student will derive d=√((x₂−x₁)²+(y₂−y₁)²) by constructing a right triangle between two points, recognize that swapping which point is (x₁,y₁) versus (x₂,y₂) never changes the computed distance, and apply the formula correctly when the two points share an x- or y-coordinate, with no special-casing needed.

## Core Understanding
Per the Blueprint's Component 3: given two points (x₁,y₁) and (x₂,y₂), the horizontal segment of length |x₂−x₁| and the vertical segment of length |y₂−y₁| connecting them via a right-angle corner are the legs of a right triangle, and the direct distance between the two original points is exactly this triangle's hypotenuse — applying `math.geom.pythagorean-theorem`'s c=√(a²+b²) directly gives the distance formula. Swapping which point is labeled (x₁,y₁) versus (x₂,y₂) changes (x₂−x₁) to its negative, but since both are squared, (x₂−x₁)²=(x₁−x₂)² always, so the computed distance is identical either way — order matters for identifying which point is which (per `math.geom.coordinate-plane`), but not for computing the distance between them. When the two points share the same x-coordinate (a vertical segment) or y-coordinate (a horizontal segment), the corresponding squared term is simply 0, and the formula reduces automatically to the ordinary vertical or horizontal distance — no special case is needed.

## Mental Models
1. **The formula-is-the-theorem model** (Blueprint TA-A01, P11): the distance formula IS the Pythagorean theorem — the two legs are just the horizontal and vertical coordinate differences between the points.
2. **The squaring-erases-the-sign model** (Blueprint TA-A02, P28): distance is symmetric because squaring makes both orderings give identical results, regardless of which point is called first.
3. **The automatic-reduction model** (Blueprint TA-A03, P06): the general formula already simplifies correctly for purely vertical or horizontal segments — one term simply becomes zero, with no modification needed.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is adding the horizontal and vertical coordinate differences directly, rather than squaring, summing, and taking the square root per the Pythagorean relationship. A second failure is believing swapping which point is called (x₁,y₁) versus (x₂,y₂) changes the computed distance, missing that squaring eliminates the sign difference. A third failure is believing the general distance formula must be modified or replaced for purely vertical or horizontal segments, missing that it already simplifies correctly on its own.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — COORDINATE-DIFFERENCES-ADDED-WITHOUT-SQUARING** (Foundational)
  - **Blueprint description**: adding the horizontal and vertical coordinate differences directly, rather than squaring, summing, and taking the square root.
  - **Birth type**: Type 1, overgeneralization — ordinary one-dimensional distance (a single subtraction) is over-applied to the two-dimensional case, without recognizing the Pythagorean relationship genuinely requires squaring rather than simple addition.
  - **Repair approach**: Blueprint Repair Action B01 — re-walking the full derivation, re-anchoring on "the legs must be squared, summed, and square-rooted — never simple addition."

- **MC-2 — POINT-ORDER-ASSUMED-TO-AFFECT-DISTANCE** (Foundational)
  - **Blueprint description**: believing swapping which point is called (x₁,y₁) versus (x₂,y₂) changes the computed distance, missing that squaring eliminates the sign difference.
  - **Birth type**: Type 6, analogy overextension — `math.geom.coordinate-plane`'s own emphasis that order matters for identifying points is over-applied to the distance computation, where it genuinely doesn't matter.
  - **Repair approach**: Blueprint Repair Action B02 — recomputing the identical distance with points swapped, showing the squared legs match exactly.

- **MC-3 — VERTICAL-OR-HORIZONTAL-SEGMENTS-ASSUMED-TO-NEED-A-SEPARATE-FORMULA** (Moderate)
  - **Blueprint description**: believing the general distance formula must be modified or replaced for purely vertical or horizontal segments, missing that it already simplifies correctly on its own.
  - **Birth type**: Type 4, notation-induced — the general two-term formula visually "looks like" it always needs both terms present, obscuring that either term can silently vanish to zero.
  - **Repair approach**: Blueprint Repair Action B03 — working both a vertical-segment and horizontal-segment case, showing the general formula automatically reduces correctly.

## Analogies
- **The vector-norm framing** (Blueprint Component 5, P76): the distance formula between two points is exactly the norm of their difference vector, specifically the p=2 (Euclidean) case of the more general p-norm framework.

## Demonstrations
- Deriving distance via the right triangle for (1,2) and (4,6): legs 3 and 4, distance √(9+16)=5 (Blueprint A01, Example 1), targeting MC-1.
- Recomputing the same distance with points swapped, confirming identical squared legs and the same result of 5 (Blueprint A02, Example 2), targeting MC-2.
- Applying the formula to a vertical segment ((2,5) to (2,9), giving 4) and a horizontal segment ((3,7) to (8,7), giving 5), both reducing automatically with no special case (Blueprint A03, Example 3), targeting MC-3.

## Discovery Questions
1. "To find the distance between two points, do you add the horizontal and vertical differences directly, or is something else needed?"
2. "If you swap which point is (x₁,y₁) and which is (x₂,y₂), does the computed distance change?"
3. "Does the distance formula need to be modified when the two points are directly above/below or left/right of each other?"

## Teaching Sequence
Follows the Blueprint's Component 5 exactly: A01 (building the right triangle from coordinate differences) → A02 (point order doesn't affect distance) → A03 (no special case needed for vertical or horizontal segments) → A04 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Demonstration** — deriving the distance formula as a direct application of the Pythagorean theorem (Blueprint A01).
- **TEST-THINKING: Error Analysis** — recomputing distance with points swapped, confirming no change (Blueprint A02), targeting MC-2.
- **DO: Worked Example** — the vertical-segment and horizontal-segment cases, confirming automatic reduction (Blueprint A03), targeting MC-3.
- **TELL: Explanation** — why the operation must be square-sum-square-root, never simple addition, targeting MC-1.

## Voice Teaching Notes
Before accepting a distance computation, ask "did you square the differences, or just add them?" as a standing check directly targeting MC-1.

## Assessment Signals
- **P76 (transfer probe, cross-link probe mode against `math.linalg.norm` per the Blueprint's Component 0 — cross_links includes this target)**: reused verbatim from the Blueprint's Component 5 A04 — connecting the distance formula to the vector norm of the difference vector, the p=2 norm specifically, and the symmetry property following from the norm's homogeneity.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set plus P76 (Component 5 A04), MAMR 5/5.

## Tutor Recovery Strategy
If MC-1 persists, require the student to explicitly label which two segments are the "legs" and state "Pythagorean theorem" out loud before computing any distance, until squaring becomes the automatic first step.

## Memory Hooks
- "The distance formula IS the Pythagorean theorem — legs are the coordinate differences."
- "Squaring erases the sign — swapping the two points never changes the distance."
- "One term becomes zero for a vertical or horizontal segment — no new formula needed."

## Transfer Connections
- `math.geom.circle-equation` (unlocks) is a circle defined as the set of points at a fixed distance from a center, directly using this concept's formula.
- `math.geom.midpoint-formula` (unlocks) is a related coordinate-geometry construction between two points.
- `math.geom.pythagorean-theorem` and `math.geom.coordinate-plane` (require) supply the c=√(a²+b²) formula and the signed coordinate differences this concept's legs are built from.
- `math.linalg.norm` (cross-link, Blueprint exists, no EB entry) frames this concept's formula as the p=2 case of a more general vector-norm idea.

## Cross-Subject Connections
- Physics: computing the magnitude of a displacement vector between two positions is a direct application of this formula.

## Blueprint References
`docs/curriculum/blueprints/math.geom.distance-formula.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None found at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 8.
