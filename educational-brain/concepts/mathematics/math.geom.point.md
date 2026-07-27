# math.geom.point

## Identity
- **KG ID**: `math.geom.point`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.found.mathematical-thinking`
- **Unlocks**: `math.geom.line`, `math.geom.plane`
- **Cross-links**: none (KG lists none; Blueprint confirms).
- **Difficulty**: foundational
- **Bloom level**: remember
- **Mastery threshold**: 0.95 (⌈0.95×5⌉ = 5/5)
- **Estimated hours**: 1
- **Blueprint**: `docs/curriculum/blueprints/math.geom.point.md` (reused by reference throughout this entry).

## Learning Objective
The student will state that a geometric point is a dimensionless location — no length, width, or depth — recognize points as primitive (undefined) terms characterized by their properties rather than constructed from simpler objects, correctly distinguish a point from its physical or drawn representation, and recognize that coordinates describe where a point is in a chosen reference frame without being what defines the point itself.

## Core Understanding
Per the Blueprint's Component 1: a geometric point is a dimensionless location — it has position but no extent in any dimension. Points are primitive terms in Euclidean geometry, characterized by their properties and relationships rather than defined via simpler objects. A point is not the same as the dot drawn to represent it — the dot is an imperfect physical mark with actual size; the point is the abstract, zero-dimensional concept. Coordinates (an ordered pair in the plane, an ordered triple in space) locate a point within a chosen reference frame, but do not define it — Euclid's geometry, and its points, existed and were reasoned about for roughly 2000 years before Descartes introduced coordinates.

## Mental Models
1. **The limit-of-shrinking model** (Blueprint TA-A01, P03): imagine zooming into a physical dot endlessly — a geometric point is the limit of this process, what you'd get if you could zoom forever, with no size at all.
2. **The symbol-versus-referent model** (Blueprint TA-B02, P03): the dot is to the point as the word "cat" is to a cat — a symbol representing the thing, not the thing itself.
3. **The invariant-location model** (Blueprint TA-A03, P11): the point exists independently of any coordinate system; changing the reference frame changes the coordinate label, never the point itself.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is believing a point has some (perhaps very small) size, conflating the abstract concept with the visible size of the physical marks (dots, pixels) used to represent it. A second failure is identifying the abstract point with its physical instantiation — believing the dot IS the point rather than representing it. A third failure is believing a point only exists once it has been assigned coordinates, missing that Euclid's purely geometric definition requires none.

## Misconceptions
Reused by reference from the Blueprint's Component 2 Misconception Registry, with birth-type classification added:

- **MC-1 — POINT-HAS-SIZE** (FOUNDATIONAL)
  - **Blueprint description**: believing a point is "a very tiny dot" or that zooming in far enough reveals a point has some width; conflating physical marks (which have visible size) with the abstract, sizeless concept.
  - **Birth type**: Type 2, perceptual intuition — every physically-drawn or displayed representation of a point (a pencil dot, a pixel) genuinely has visible size, making the sizeless abstraction perceptually counterintuitive.
  - **Repair approach**: Blueprint Repair Action TA-B01 — contrasting a pencil dot, a pixel, and the intersection of two laser beams (all having some size, however small) against the true geometric point (zero size), reinforcing that physical marks can only ever approximate, never equal, the abstract point.

- **MC-2 — POINT-AS-MARK** (see Blueprint Component 2)
  - **Blueprint description**: identifying the abstract concept with its physical instantiation — believing the drawn dot "is" the geometric point rather than representing one.
  - **Birth type**: Type 3, language contamination — everyday language routinely says "the point is right there" while pointing at a mark, blurring the distinction between the abstract object and its physical stand-in.
  - **Repair approach**: Blueprint Repair Action TA-B02 — the word/animal analogy ("cat" the word is not the animal), reinforced by noting that erasing a drawn dot does not erase the geometric location it represented.

- **MC-3 — COORDINATE-REQUIRED** (see Blueprint Component 2)
  - **Blueprint description**: believing a point only exists once assigned coordinates, refusing Euclid's purely geometric (coordinate-free) definition.
  - **Birth type**: Type 5, instruction-induced — most students first encounter points via plotting coordinates on a number line or plane, making coordinates feel constitutive of the concept rather than one descriptive tool among several.
  - **Repair approach**: Blueprint Repair Action TA-B03 — noting Euclid defined points and proved theorems about them roughly 2000 years before Descartes introduced coordinates, and that projective geometry validly uses points without standard coordinates at all.

## Analogies
- **The zoom-to-the-limit analogy** (Blueprint TA-A01, P03): zooming into a physical dot endlessly approaches, but never reaches, the true geometric point — a city hall's location on a map is marked with a dot, but at maximum precision its location is a genuine geometric point.
- **The word-and-animal analogy** (Blueprint TA-B02, P03): a drawn dot is to a geometric point as the word "cat" is to an actual cat — a symbol, not the referent.

## Demonstrations
- The contrast table of physical representations (pencil dot, pixel, laser-beam intersection) each having some size, versus the true point having none (Blueprint TA-B01), targeting MC-1.
- The three-representation shift — abstract label, 1D coordinate, 2D coordinate, 3D coordinate — showing the point exists independently of any of them (Blueprint TA-A03, P11), targeting MC-3.
- The GPS transfer probe: the same physical location marked on two maps at different scales (a large dot versus a barely-visible pinprick), demonstrating the underlying geometric point is invariant while its representation varies (Blueprint TA-A04, P76).

## Discovery Questions
1. "How many dimensions does a geometric point have?"
2. "Is the dot you draw on paper the same thing as the geometric point, or just a representation of it?"
3. "If I change the coordinate system, does the point itself change, or just its coordinate label?"

## Teaching Sequence
Follows the Blueprint's Component 4 exactly: TA-A01 (definition as a dimensionless, primitive location; MC-1 hook) → TA-A02 (notation and physical representation contrast) → TA-A03 (coordinate representation and primitive status; MC-3 hook) → TA-A04 (Mastery Gate, P91).

## Tutor Actions
- **TELL: Explanation** — the primitive, dimensionless definition of a point (Blueprint TA-A01).
- **TEST-THINKING: Error Analysis** — the contrast table of physical representations versus the true point (Blueprint TA-B01), targeting MC-1.
- **SHOW: Demonstration** — the three-representation shift from abstract label to coordinates (Blueprint TA-A03).
- **DO: Worked Example** — the GPS transfer probe comparing two differently-scaled maps of the same location (Blueprint P76).

## Voice Teaching Notes
When a student describes a point, ask "is that the point itself, or just how it's drawn?" as a standing check directly targeting MC-2's symbol/referent conflation before it calcifies.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 7 — cross_links=[])**: reused verbatim from the Blueprint's Component 4 TA-A04 — the GPS/map-scale scenario, confirming the geometric point is invariant while its physical representation varies.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set (Component 4 TA-A04), MAMR 5/5.

## Tutor Recovery Strategy
If MC-1 persists, ask the student directly whether they could ever physically draw an exact geometric point, reinforcing that any physical mark necessarily has positive size and geometry reasons about the ideal, sizeless abstraction instead.

## Memory Hooks
- "A point has zero dimensions — no length, width, or depth, however small you shrink a dot."
- "The dot represents the point; it is never the point itself."
- "Coordinates locate a point in a chosen frame — they don't define it."

## Transfer Connections
- `math.geom.line` (unlocks) is defined by two distinct points.
- `math.geom.plane` (unlocks) is defined by three non-collinear points.

## Cross-Subject Connections
- Physics: idealized point masses and point charges reuse this same dimensionless-location abstraction as a foundational modeling simplification.

## Blueprint References
`docs/curriculum/blueprints/math.geom.point.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (cross_links=[]) was independently re-verified at authoring time and remains accurate.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 1.
