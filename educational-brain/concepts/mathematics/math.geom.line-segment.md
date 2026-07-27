# math.geom.line-segment

## Identity
- **KG ID**: `math.geom.line-segment`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.line`
- **Unlocks**: `math.geom.length`
- **Cross-links**: none (KG lists none; Blueprint confirms).
- **Difficulty**: foundational
- **Bloom level**: remember
- **Mastery threshold**: 0.95 (⌈0.95×4⌉ = 4/4)
- **Estimated hours**: 1
- **Blueprint**: `docs/curriculum/blueprints/math.geom.line-segment.md` (reused by reference throughout this entry).

## Learning Objective
The student will state that a line segment is the bounded set of all points on a line between two endpoints (including the endpoints themselves), recognize that a segment has exactly two endpoints and a finite, measurable length, correctly identify that segment AB equals segment BA (unordered, unlike a directed vector), and recognize that a segment exists as a well-defined geometric object independent of whether it is ever measured.

## Core Understanding
Per the Blueprint's Component 1: a line segment ─AB is the set of all points on line ↔AB between A and B, including A and B themselves. A segment has exactly two endpoints — A and B — neither "first" nor "last" in a directed sense. Its length |AB| (the distance between A and B) is a measurable, finite, positive real number. Segments are symmetric: segment AB equals segment BA, since both denote the identical set of points — unlike vectors, which are directed and for which →AB ≠ →BA. Every segment lies on exactly one parent line. The midpoint M of segment AB satisfies |AM|=|MB|=|AB|/2.

## Mental Models
1. **The taut-rope model** (Blueprint TA-A01, P03): a rope stretched between two nails has two fixed endpoints, a definite length, and does not extend past the nails — directly mirroring a segment's bounded, two-endpoint structure.
2. **The subset-of-a-line model** (Blueprint TA-A02, P64): a segment ─AB is a bounded subset of the infinite line ↔AB — ─AB ⊂ ↔AB.
3. **The unordered-pair model** (Blueprint TA-B02, P06): a segment is an unordered pair of endpoints (AB=BA), fundamentally different from a directed vector (→AB≠→BA).

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is using "line" and "segment" interchangeably, or believing a segment extends beyond its endpoints — reinforced by everyday language ("draw a line from A to B" actually means draw a segment). A second failure is believing segment AB differs from segment BA, incorrectly importing the directedness of vectors onto segments, which are genuinely symmetric. A third failure is believing a segment is only well-defined once its length is known or measured, conflating the geometric object (a set of points) with the measurement tool (length).

## Misconceptions
Reused by reference from the Blueprint's Component 2 Misconception Registry, with birth-type classification added:

- **MC-1 — SEGMENT-IS-LINE** (FOUNDATIONAL)
  - **Blueprint description**: using "line" and "segment" interchangeably, or believing a segment extends beyond its endpoints.
  - **Birth type**: Type 3, language contamination — everyday language uses "line" to mean "a mark from here to there," which is precisely a segment, directly conflicting with the geometric term's meaning.
  - **Repair approach**: Blueprint Repair Action TA-B01 — contrasting the infinite geometric line (no endpoints) against the finite segment (two endpoints, tick marks), reinforcing that arrows signal infinite extent while tick marks signal a bounded object.

- **MC-2 — SEGMENT-DIRECTED** (see Blueprint Component 2)
  - **Blueprint description**: believing segment AB differs from segment BA, confusing segments with directed vectors.
  - **Birth type**: Type 6, analogy overextension — the directedness of vectors (→AB≠→BA) is over-applied by analogy to segments, which have no direction at all.
  - **Repair approach**: Blueprint Repair Action TA-B02 — contrasting segments (symmetric, AB=BA) directly against vectors (directed, →AB≠→BA), confirming segments are simply the unordered set of points between two endpoints.

- **MC-3 — SEGMENT-NEEDS-MEASUREMENT** (see Blueprint Component 2)
  - **Blueprint description**: believing a segment is only well-defined once its length is known, conflating the geometric object with the measurement of length.
  - **Birth type**: Type 5, instruction-induced — length computation is introduced and practiced heavily alongside segments, making measurement feel constitutive of the object rather than an optional property.
  - **Repair approach**: Blueprint Repair Action TA-B03 — confirming the segment between two room corners exists as a geometric object regardless of whether anyone measures it; length is a property one can compute, not a defining requirement.

## Analogies
- **The taut-rope-between-nails analogy** (Blueprint TA-A01, P03): a rope stretched between two nails has fixed endpoints and a definite length and does not extend past the nails — the nails are the segment's endpoints, the rope is the segment.

## Demonstrations
- The endpoint-count contrast: a segment has 2 endpoints, a line has 0 (Blueprint TA-A01, P49), targeting MC-1.
- The classification exercise distinguishing a line, a segment (a ruler's edge from 0 to 30cm), and a ray (Blueprint TA-A02, P49), targeting MC-1.
- The midpoint computation on a segment of length 10cm, confirming |PM|=5cm (Blueprint P77 Q3).

## Discovery Questions
1. "How many endpoints does a line segment have, compared to a geometric line?"
2. "Is segment AB the same object as segment BA?"
3. "Does a segment need to be measured to exist as a well-defined geometric object?"

## Teaching Sequence
Follows the Blueprint's Component 4 exactly: TA-A01 (segment as a bounded piece of a line, using the taut-rope analogy) → TA-A02 (misconception gate for SEGMENT-IS-LINE, classifying line/segment/ray) → TA-A03 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Analogy** — the taut rope stretched between two nails (Blueprint TA-A01).
- **TEST-THINKING: Error Analysis** — classifying a line, segment, and ray from a labeled diagram (Blueprint TA-A02), targeting MC-1.
- **TELL: Explanation** — the segment-versus-vector contrast, confirming segments are unordered (Blueprint TA-B02), targeting MC-2.
- **DO: Worked Example** — computing the midpoint of a 10cm segment (Blueprint P77 Q3).

## Voice Teaching Notes
When a student names a segment "AB," ask "would segment BA be a different object?" as a standing check directly targeting MC-2's directedness confusion.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 7 — cross_links=[])**: reused verbatim from the Blueprint's Component 4 TA-A03 — the downtown-to-airport road scenario, confirming segment identification, endpoint count, and AB=BA symmetry.
- **P77 (mastery gate)**: the Blueprint's 3-item problem set plus P76 (Component 4 TA-A03), MAMR 4/4.

## Tutor Recovery Strategy
If MC-1 persists, require the student to redraw any "segment" they name with explicit tick marks at both ends (confirming no arrows are present) before accepting further claims about the object.

## Memory Hooks
- "A segment has exactly two endpoints — it never extends past them."
- "Segment AB and segment BA are the same object — no direction."
- "A segment exists as a set of points whether or not you ever measure it."

## Transfer Connections
- `math.geom.length` (unlocks) develops the measurable property |AB| this concept introduces.
- `math.geom.line` (requires) supplies the parent infinite line on which every segment lies.

## Cross-Subject Connections
- Physics: measured distances between two physical points (e.g., displacement magnitude) reuse this same bounded, symmetric segment structure.

## Blueprint References
`docs/curriculum/blueprints/math.geom.line-segment.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (cross_links=[]) was independently re-verified at authoring time and remains accurate.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 3.
