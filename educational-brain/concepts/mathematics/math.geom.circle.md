# math.geom.circle

## Identity
- **KG ID**: `math.geom.circle`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.point`, `math.geom.line-segment`
- **Unlocks**: `math.trig.unit-circle`
- **Cross-links**: `math.trig.unit-circle` (Tier 1, Blueprint exists, no Educational Brain entry yet; P76_mode = cross-link probe), `math.geom.circle-equation` (not Tier 1, not authored).
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 12
- **Blueprint**: `docs/curriculum/blueprints/math.geom.circle.md` (reused by reference throughout this entry).

## Learning Objective
The student will define a circle as the locus of all points in a plane equidistant from a fixed center, correctly distinguish radius from diameter (and never substitute one for the other in formulas), treat π as an exact constant rather than a decimal approximation, correctly distinguish an arc (curved boundary path) from a chord (straight segment between the same endpoints), and derive the standard algebraic equation of a circle from its geometric definition.

## Core Understanding
Per the Blueprint's Component 1: a circle is the locus {P : d(P,C) = r} — the set of all points P in a plane at exactly distance r (the radius) from a fixed center C. This single definition generates all circle vocabulary: radius (center to boundary), diameter (d=2r, a chord through the center), chord (segment between two boundary points, not necessarily through center), arc (a curved portion of the boundary), and circumference (the full boundary length). The ratio circumference/diameter is the same constant π ≈ 3.14159... for every circle, giving C=πd=2πr and A=πr². π is exact — "10π cm" is a precise answer, while "31.4 cm" is a rounded approximation. Algebraically, the distance formula applied to the locus definition yields the standard equation (x−h)²+(y−k)²=r² for a circle centered at (h,k) with radius r.

## Mental Models
1. **The equidistant-club model** (Blueprint TA-A01, P03): membership in an exclusive "club" requires living exactly r units from a fixed headquarters — every valid member forms a perfect ring, which is the circle.
2. **The radius-is-the-definition's-own-distance model** (Blueprint TA-A02, TA-B01): the formula uses r because the circle IS defined by that distance; the diameter (d=2r) must always be converted to r before substituting into any formula.
3. **The exact-versus-approximate model** (Blueprint TA-A03, TA-B02): leaving π symbolic (e.g. "10π cm") is exact and precise; substituting 3.14 immediately produces a rounded, less precise answer, just as leaving √2 unevaluated is more precise than writing 1.414.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is confusing radius and diameter, using d=2r incorrectly by substituting the diameter directly into formulas requiring the radius (writing C=2πd or A=πd², each off by a fixed factor). A secondary failure is treating π as merely an approximate decimal (3.14) rather than an exact constant, making symbolic answers like "6π" feel incomplete or wrong. A third failure is measuring an arc's length using the straight chord between its endpoints, confusing the curved boundary path with the straight segment connecting the same two points.

## Misconceptions
Reused by reference from the Blueprint's Component 2 Misconception Registry, with birth-type classification added:

- **MC-1 — RADIUS-DIAMETER-CONFUSION** (FOUNDATIONAL)
  - **Blueprint description**: using d=2r incorrectly in formulas — writing C=2πd or A=πd², substituting the diameter where the radius is required.
  - **Birth type**: Type 4, notation-induced — both r and d denote linear measures of the same circle, and without an explicit "convert to r first" habit, whichever value is given (often the diameter, stated directly in problems) gets substituted straight into a radius-based formula.
  - **Repair approach**: Blueprint Repair Action TA-B01 — always converting the given diameter to radius (r=d/2) as an explicit first step before substituting into any formula.

- **MC-2 — PI-IS-APPROXIMATE-ONLY** (Secondary)
  - **Blueprint description**: writing 3.14×r² for exact area, unable to work with symbolic π; treating π as a decimal approximation rather than an exact constant.
  - **Birth type**: Type 3, language contamination — calculator and everyday usage almost always presents π as "3.14" or "3.14159," obscuring that these are rounded approximations of a genuinely exact mathematical constant.
  - **Repair approach**: Blueprint Repair Action TA-B02 — the exact/approximate/wrong-decimal contrast table, directly parallel to leaving √2 unevaluated rather than writing 1.414.

- **MC-3 — ARC-IS-CHORD** (Secondary)
  - **Blueprint description**: measuring arc length using the straight chord between its endpoints, confusing the curved boundary path with the straight segment.
  - **Birth type**: Type 6, analogy overextension — the already-familiar concept of "distance between two points" (a straight segment) is over-applied to the boundary path, which is genuinely curved and longer.
  - **Repair approach**: Blueprint Repair Action TA-B03 — the semicircle contrast (chord=diameter=2r straight, versus arc=half-circumference=πr curved), using π>3>2 to make the arc visibly longer.

## Analogies
- **The equidistant-club analogy** (Blueprint TA-A01, P03): a club requiring members to live exactly 5km from City Hall produces a ring of valid addresses — that ring is the circle, City Hall the center, 5km the radius.

## Demonstrations
- The on/inside/outside classification of points at varying distances from a center, using exact equality to r as the only "on the circle" criterion (Blueprint TA-A01, P49).
- The radius-vs-diameter formula contrast: C=2πr (correct) versus the common C=2πd error (Blueprint TA-A02, P06), targeting MC-1.
- The π-by-pattern-induction table measuring circumference/diameter across three different-sized circles, all converging to ≈3.14159 (Blueprint TA-A03, P04), targeting MC-2.
- The algebraic derivation (x−h)²+(y−k)²=r² from the distance-formula application to the locus definition (Blueprint TA-A04, P11).

## Discovery Questions
1. "Is a point exactly 4 units from the center 'on' the circle, or 'inside' it, if the radius is also 4?"
2. "If a circle's diameter is 10cm, what do you substitute into C=2πr — the 10, or something derived from it?"
3. "Is the arc between two points on a circle the same length as the straight chord between them?"

## Teaching Sequence
Follows the Blueprint's Component 4 exactly: TA-A01 (circle as a locus, equidistant-club analogy) → TA-A02 (radius vs. diameter contrast) → TA-A03 (π by pattern induction) → TA-A04 (representation shift to the algebraic equation) → TA-A05 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Analogy** — the equidistant-club membership rule defining a circle (Blueprint TA-A01).
- **TEST-THINKING: Error Analysis** — the radius-vs-diameter formula contrast (Blueprint TA-A02), targeting MC-1.
- **DO: Worked Example** — measuring circumference/diameter across several circles to induce the constant π (Blueprint TA-A03), targeting MC-2.
- **SHOW: Demonstration** — deriving the standard equation (x−h)²+(y−k)²=r² from the distance formula (Blueprint TA-A04).

## Voice Teaching Notes
Before any circle formula is applied, ask "is that number the radius, or something you need to convert first?" as a standing check directly targeting MC-1's radius/diameter substitution error.

## Assessment Signals
- **P76 (transfer probe, cross-link probe mode against `math.trig.unit-circle` per the Blueprint's Component 7 — cross_links includes this Tier 1 target)**: reused verbatim from the Blueprint's Component 4 TA-A05 — verifying (3/5,4/5) lies on the unit circle, its exact circumference, and why cos²θ+sin²θ=1 places (cosθ,sinθ) on it.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set plus P76 (Component 4 TA-A05), MAMR 5/5.

## Tutor Recovery Strategy
If MC-1 persists, require the student to explicitly write "r = ___" as a separate first line before substituting into any circle formula, converting from diameter if necessary, until the habit becomes automatic.

## Memory Hooks
- "A point is 'on' the circle only if its distance to the center EQUALS r exactly."
- "Formulas use r — always convert a given diameter to radius first."
- "π is exact, not 3.14 — leave it symbolic unless asked for a decimal."
- "An arc is curved and longer; a chord is straight and shorter, for the same two endpoints."

## Transfer Connections
- `math.trig.unit-circle` (unlocks) is the circle with center (0,0) and radius 1, the canonical circle underlying all trigonometric function definitions.
- `math.geom.point` and `math.geom.line-segment` (require) supply the distance and segment concepts this concept's locus definition and chord/radius vocabulary directly build on.

## Cross-Subject Connections
- Physics: circular motion (orbits, rotating wheels) is modeled directly using this locus definition, with radius as the key parameter.

## Blueprint References
`docs/curriculum/blueprints/math.geom.circle.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (`math.trig.unit-circle` Tier 1, authored Blueprint; `math.geom.circle-equation` not Tier 1) was independently re-verified at authoring time and remains accurate.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 4 part 1.
