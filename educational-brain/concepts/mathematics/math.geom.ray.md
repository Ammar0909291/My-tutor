# math.geom.ray

## Identity
- **KG ID**: `math.geom.ray`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.line`
- **Unlocks**: `math.geom.angle`
- **Cross-links**: none (KG lists none; Blueprint confirms).
- **Difficulty**: foundational
- **Bloom level**: remember
- **Mastery threshold**: 0.95 (⌈0.95×4⌉ = 4/4)
- **Estimated hours**: 1
- **Blueprint**: `docs/curriculum/blueprints/math.geom.ray.md` (reused by reference throughout this entry).

## Learning Objective
The student will state that a ray is a half-line with exactly one endpoint that extends infinitely in one direction, correctly identify that ray →AB and ray →BA are different rays (directed, unlike segments), and recognize that a ray has no finite length — the second named point is a direction marker, not a second endpoint.

## Core Understanding
Per the Blueprint's Component 1: a ray →AB is the set of all points on line ↔AB that start at A and continue through B and beyond, including A itself. A is the sole endpoint (origin) of the ray; B is merely a direction marker the ray passes through on its way to infinity. A ray has infinite extent — no finite length — since it extends without end in one direction from its endpoint. Rays are directed: →AB and →BA are different rays, since the first letter names the endpoint and the second fixes the direction; swapping the letters changes both. A ray lies on its parent line, specifically the half of that line beginning at its endpoint. Two opposite rays sharing an endpoint together form a complete line.

## Mental Models
1. **The flashlight-beam model** (Blueprint TA-A01, P03): a flashlight (the endpoint) shines a beam through a point in the air and continues past it to infinity — the flashlight is the one fixed start; the beam has no end.
2. **The one-endpoint-one-direction-marker model** (Blueprint TA-A02, P64): →AB has exactly one endpoint (A); B is a direction label the ray passes through, not a stopping point.
3. **The half-of-a-line model** (Blueprint TA-B03, P27): a ray is half of an infinite LINE, not half of a finite segment — "half-line" names an infinite object cut at one point, not a shortened finite one.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is believing a ray has two endpoints (both A and B), since the notation →AB visually names two points and the diagram can look like a finite object. A second failure is believing ray →AB and ray →BA are the same ray, incorrectly importing segment symmetry onto rays, which are genuinely directed. A third failure is believing a ray is "half of a segment" with a finite length, misreading "half-line" as halving a finite object rather than halving an infinite one.

## Misconceptions
Reused by reference from the Blueprint's Component 2 Misconception Registry, with birth-type classification added:

- **MC-1 — RAY-HAS-TWO-ENDPOINTS** (FOUNDATIONAL)
  - **Blueprint description**: believing a ray has two endpoints — a start at A and an end at B.
  - **Birth type**: Type 4, notation-induced — the visual notation →AB names two points, and the diagram's finite-looking appearance invites modeling the ray as a segment with an arrow rather than a genuinely infinite half-line.
  - **Repair approach**: Blueprint Repair Action TA-B01 — confirming a ray's only tick mark is at its endpoint, with an arrow (not a tick) past the direction marker signaling infinite continuation.

- **MC-2 — RAY-DIRECTION-INDETERMINATE** (see Blueprint Component 2)
  - **Blueprint description**: believing ray →AB and ray →BA are the same ray, incorrectly applying segment symmetry to directed rays.
  - **Birth type**: Type 6, analogy overextension — the just-learned segment symmetry (AB=BA) is over-applied by analogy to rays, which are genuinely directed and asymmetric.
  - **Repair approach**: Blueprint Repair Action TA-B02 — contrasting →AB (starts at A, through B, to infinity) against →BA (starts at B, through A, to infinity) as having different endpoints and opposite directions.

- **MC-3 — RAY-IS-HALF-SEGMENT** (see Blueprint Component 2)
  - **Blueprint description**: believing a ray is "half of a segment" with a finite length, rather than half of an infinite line.
  - **Birth type**: Type 3, language contamination — the term "half-line" is misheard as "halving" a finite segment rather than halving an already-infinite line at one point.
  - **Repair approach**: Blueprint Repair Action TA-B03 — confirming a ray's length is infinite/undefined, contrasted directly against a segment's finite, measurable length.

## Analogies
- **The flashlight-beam analogy** (Blueprint TA-A01, P03): the flashlight is the ray's fixed endpoint; the beam passes through a marked point in the air and continues on to infinity, illustrating the one-endpoint, infinite-extent structure.

## Demonstrations
- The endpoint-count check: →AB has exactly one endpoint (A), contrasted against a line (0) and a segment (2) (Blueprint TA-A02, P49), targeting MC-1.
- The direction contrast: →PQ and →QP have different endpoints and opposite directions (Blueprint TA-B02), targeting MC-2.
- The length question: a ray extending from P through Q and beyond has no finite length (Blueprint P77 Q3), targeting MC-3.

## Discovery Questions
1. "Does ray →AB stop at B, or does it just pass through B?"
2. "Are ray →AB and ray →BA the same object?"
3. "Does a ray have a measurable length, or does it extend forever?"

## Teaching Sequence
Follows the Blueprint's Component 4 exactly: TA-A01 (ray as a half-line, using the flashlight-beam analogy) → TA-A02 (misconception gate for RAY-HAS-TWO-ENDPOINTS) → TA-A03 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Analogy** — the flashlight beam passing through a marked point to infinity (Blueprint TA-A01).
- **TEST-THINKING: Error Analysis** — identifying which of line/segment/ray has exactly one endpoint (Blueprint TA-A02), targeting MC-1.
- **TELL: Explanation** — the direction contrast between →AB and →BA (Blueprint TA-B02), targeting MC-2.
- **TEST-THINKING: Prediction** — before answering, ask whether the ray's length is finite or infinite, targeting MC-3.

## Voice Teaching Notes
When a student names a ray "→AB," ask "is B where it stops, or just a point along the way?" as a standing check directly targeting MC-1's two-endpoints confusion.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 7 — cross_links=[])**: reused verbatim from the Blueprint's Component 4 TA-A03 — the lighthouse-beam scenario, confirming ray identification, single endpoint location, and the asymmetry of →LS versus →SL.
- **P77 (mastery gate)**: the Blueprint's 3-item problem set plus P76 (Component 4 TA-A03), MAMR 4/4.

## Tutor Recovery Strategy
If MC-1 persists, require the student to state explicitly, for every ray they name, "which letter is the endpoint?" before accepting any further claim about the object.

## Memory Hooks
- "A ray has exactly one endpoint — the second letter is just a direction marker."
- "→AB and →BA are different rays — direction matters."
- "A ray never ends — its length is infinite."

## Transfer Connections
- `math.geom.angle` (unlocks) is formed by two rays sharing a common endpoint (the vertex).
- `math.geom.line` (requires) supplies the parent line whose half this concept's ray occupies.

## Cross-Subject Connections
- Physics: light rays and force vectors originating from a fixed source reuse this same one-endpoint, infinite-direction structure.

## Blueprint References
`docs/curriculum/blueprints/math.geom.ray.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None — the Blueprint's own cross-link finding (cross_links=[]) was independently re-verified at authoring time and remains accurate.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 3.
