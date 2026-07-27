# math.geom.similar-triangles

## Identity
- **KG ID**: `math.geom.similar-triangles`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.triangle`, `math.arith.ratios`
- **Unlocks**: `math.trig.right-triangle-trig`
- **Cross-links**: `math.trig.right-triangle-trig` (Tier 1, Blueprint exists, no Educational Brain entry yet; P76_mode = cross-link probe).
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85 (⌈0.85×5⌉ = 5/5)
- **Estimated hours**: 8
- **Blueprint**: `docs/curriculum/blueprints/math.geom.similar-triangles.md` (reused by reference throughout this entry).

## Learning Objective
The student will establish triangle similarity via AA, SAS, or SSS criteria, correctly compute a scale factor and apply it uniformly to all corresponding sides while respecting vertex correspondence order, and apply similarity to indirect-measurement problems such as shadow-based height calculations.

## Core Understanding
Per the Blueprint's Component 1: two triangles are similar (△ABC ~ △DEF) if they have the same shape but possibly different sizes — corresponding angles are equal and corresponding sides are proportional by a single scale factor k. Similarity is established by AA (two matching angles — the third is automatically forced by the 180° angle-sum theorem), SAS (a matching angle with proportional adjacent sides), or SSS (all three pairs of sides proportional). Congruence is precisely the special case k=1. Vertex correspondence in a similarity statement is an ORDERED pairing — in △ABC ~ △DEF, A corresponds to D, B to E, C to F — so AB corresponds to DE, not to any side chosen by visual position in a diagram. Similar right triangles underlie indirect measurement (a stick and a tree casting proportional shadows at the same sun angle) and are the foundation of trigonometry itself: all right triangles sharing the same acute angle are similar, so the ratio opposite/hypotenuse is constant regardless of triangle size.

## Mental Models
1. **The map-and-terrain model** (Blueprint TA-A01, P03): a road map is a scaled copy of the terrain it represents — every turn and angle matches, every distance scales by the same factor; △ABC ~ △DEF works identically, with k as the map's scale.
2. **The angle-sum-forces-the-third-angle model** (Blueprint TA-B02, P64): once two angles of a triangle are known, the third is automatically determined by the 180° sum — AA is not "incomplete" information, it is exactly sufficient.
3. **The ordered-correspondence model** (Blueprint TA-B03, P64): the similarity statement's letter order — not the diagram's visual layout — tells you which sides and angles correspond; always read correspondence from the letters, never from position.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is conflating congruence (same shape and same size) with similarity (same shape, any size), from the everyday-language sense of "similar" as "somewhat alike but different," which clashes with the mathematical sense that includes the k=1 congruent case. A second failure is believing AA (two equal angles) is insufficient and that all three angles must be separately verified, from over-generalizing a completeness instinct without recognizing the angle-sum constraint forces the third angle automatically. A third failure is setting up side ratios by visual position in a diagram rather than by the vertex correspondence stated in the similarity notation, leading to incorrectly paired ratios.

## Misconceptions
Reused by reference from the Blueprint's Component 2 Misconception Registry, with birth-type classification added:

- **MC-1 — CONGRUENT-MEANS-SIMILAR** (FOUNDATIONAL)
  - **Blueprint description**: conflating congruence (same shape and same size, k=1) with similarity (same shape, any size); believing similar must mean different in size, or that congruent triangles are not similar.
  - **Birth type**: Type 3, language contamination — everyday English uses "similar" to mean "somewhat alike but different," while mathematical similarity is a precise property that explicitly includes the k=1 congruent case.
  - **Repair approach**: Blueprint Repair Action B01 — the conceptual shift that similarity requires equal angles and proportional sides for ANY k>0, so congruence (k=1) is a special case, not a separate, mutually exclusive category.

- **MC-2 — AA-NEEDS-THREE-ANGLES** (Secondary)
  - **Blueprint description**: believing AA (two equal angles) is insufficient to establish similarity, that all three angles must be separately verified.
  - **Birth type**: Type 1, overgeneralization — a general "check everything given" instinct is applied even where the angle-sum theorem already guarantees the third angle is determined once two are known.
  - **Repair approach**: Blueprint Repair Action B02 — direct computation showing the third angle is forced (180°−known two), so AA is exactly sufficient, never incomplete.

- **MC-3 — CORRESPONDENCE-ORDER-DOESNT-MATTER** (Secondary)
  - **Blueprint description**: setting up side ratios by visual position in the diagram (e.g., both "bottom" sides) rather than by the paired vertices named in the similarity statement.
  - **Birth type**: Type 4, notation-induced — the similarity statement's ordered-letter notation (△ABC ~ △DEF) is rarely explained explicitly, so learners default to reading the diagram visually instead of symbolically.
  - **Repair approach**: Blueprint Repair Action B03 — explicit correspondence arrows drawn from the letter order (A↔D, B↔E, C↔F), re-anchoring ratio setup on the notation rather than the drawing.

## Analogies
- **The map-and-terrain analogy** (Blueprint TA-A01, P03): a road map or blueprint is a scaled copy preserving every angle and proportion of the real terrain or building — directly mirroring how △ABC ~ △DEF preserves every angle while scaling every side by the same factor k.

## Demonstrations
- Scaling all three sides of a triangle by a single factor k=5/2 given one corresponding pair, confirming uniform application across all sides (Blueprint TA-A01, P49), targeting MC-3.
- The shadow-based indirect measurement of a tree's height from a stick's known height and both shadows' lengths, using AA similarity from a shared sun angle (Blueprint TA-A02, Worked Example 2).
- The direct contrast table between similarity (proportional sides, any k) and congruence (equal sides, k=1 only), including the area-scales-by-k² relationship (Blueprint TA-A03, P06), targeting MC-1.

## Discovery Questions
1. "If two triangles have the same shape but different sizes, are they still related in a precise mathematical way?"
2. "If you know two angles of a triangle, do you also automatically know the third?"
3. "In the statement △ABC ~ △DEF, which side of △DEF corresponds to side AB of △ABC?"

## Teaching Sequence
Follows the Blueprint's Component 4 exactly: TA-A01 (map-and-terrain analogy, scale factor application) → TA-A02 (AA similarity and indirect measurement via shadows) → TA-A03 (contrast with congruence) → TA-A04 (Mastery Gate, P91).

## Tutor Actions
- **SHOW: Analogy** — the map-and-terrain bridge to scale factor and preserved angles (Blueprint TA-A01).
- **DO: Worked Example** — the shadow-based indirect measurement of a tree's height (Blueprint TA-A02, Worked Example 2).
- **ORGANIZE: Concept Map** — the similarity-vs-congruence contrast table (Blueprint TA-A03), targeting MC-1.
- **TEST-THINKING: Error Analysis** — vertex-correspondence checks using deliberately non-aligned diagram orientations (Blueprint TA-B03), targeting MC-3.

## Voice Teaching Notes
Before accepting a side-ratio setup, ask "which vertex corresponds to which, by the letter order in the similarity statement?" as a standing check directly targeting MC-3.

## Assessment Signals
- **P76 (transfer probe, cross-link probe mode against `math.trig.right-triangle-trig` per the Blueprint's Component 0 — cross_links includes this Tier 1 target)**: reused verbatim from the Blueprint's Component 4 — two right triangles sharing the same acute angle θ, confirming their opposite/hypotenuse ratios are equal despite different sizes, establishing why sin θ is well-defined independent of triangle size.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set plus P76 (Component 4), MAMR 5/5.

## Tutor Recovery Strategy
If MC-3 persists, require the student to draw explicit correspondence arrows from the similarity statement's letter order before writing any ratio equation, using only rotated or differently-oriented diagrams for practice until visual-position shortcuts stop appearing.

## Memory Hooks
- "Every congruent triangle pair is similar (k=1) — but not every similar pair is congruent."
- "Two matching angles are enough — the third is forced by the 180° sum."
- "Read correspondence from the letters in the similarity statement, never from the picture."

## Transfer Connections
- `math.trig.right-triangle-trig` (unlocks, cross-link) is directly enabled by this concept: sin/cos/tan are well-defined because all right triangles sharing an acute angle are similar, making the ratio opposite/hypotenuse constant.
- `math.geom.triangle` and `math.arith.ratios` (require) supply the angle-sum property and the ratio/proportion mechanics this concept's criteria and scale-factor computations directly build on.
- `math.geom.congruent-triangles` connects directly, since congruence is this concept's own k=1 special case.

## Cross-Subject Connections
- Physics: optical lens and pinhole-camera image-formation problems routinely use similar-triangle ratios to relate object distance, image distance, and magnification.

## Blueprint References
`docs/curriculum/blueprints/math.geom.similar-triangles.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None found at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 6.
