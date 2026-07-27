# math.geom.solid-3d

## Identity
- **KG ID**: `math.geom.solid-3d`
- **Domain**: math.geom (Geometry)
- **Requires**: `math.geom.polygon`
- **Unlocks**: `math.geom.surface-area`, `math.geom.volume`
- **Cross-links**: none (KG lists no cross-links for this concept; P76_mode = independence).
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.8 (⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 10
- **Blueprint**: `docs/curriculum/blueprints/math.geom.solid-3d.md` (reused by reference throughout this entry).

## Learning Objective
The student will identify and describe the standard solid families (prisms, pyramids, cones, cylinders, spheres), count a polyhedron's faces, edges, and vertices and apply Euler's formula V−E+F=2, and correctly recognize that Euler's formula applies specifically to flat-faced polyhedra without holes, not universally to curved solids or solids with holes.

## Core Understanding
Per the Blueprint's Component 3: a prism has two parallel, congruent polygonal bases connected by rectangular side faces, uniform cross-section along its length; a pyramid has one polygonal base and triangular side faces meeting at a single apex; cones and cylinders are the circular-base analogues of pyramids and prisms; a sphere has no flat faces at all, every surface point equidistant from the center. For a polyhedron (a solid bounded entirely by flat polygonal faces, with no holes), counting faces (F), edges (E), and vertices (V) always satisfies V−E+F=2 — Euler's formula, a genuinely deep topological fact holding for every polyhedron topologically equivalent to a sphere, regardless of how irregular its faces are. Curved solids require a convention choice for what counts as a face/edge/vertex, and applying the basic formula to them (e.g. a cylinder treated as 2 flat faces + 1 curved face, 2 edges, 0 vertices) gives 0−2+3=1≠2, since it isn't a genuine polyhedron; a solid with a hole through it (a torus) genuinely has V−E+F=0, a real topological difference, not a counting error.

## Mental Models
1. **The defining-structural-feature model** (Blueprint TA-A01, P11): sort any solid by asking "uniform cross-section all the way through? Prism. Tapers to a single point from a polygon base? Pyramid. Same tapering with a circular base? Cone. Uniform cross-section but circular? Cylinder. No flat faces anywhere? Sphere."
2. **The flat-faces-only-scope model** (Blueprint TA-A02, P06): Euler's formula V−E+F=2 was derived specifically for solids bounded entirely by flat polygon faces with no holes — applying it to curved solids isn't the formula failing, it's a signal the solid isn't a genuine polyhedron.
3. **The genuine-topological-difference model** (Blueprint TA-A02, P06): a solid with a hole (a torus) has V−E+F=0, not because of a counting mistake, but because a hole genuinely changes this topological quantity's value.

## Why Students Fail
Per the Blueprint's Misconception Registry: the foundational failure is believing Euler's formula applies universally to all 3D solids, including curved ones, rather than recognizing it as specifically derived for flat-faced polyhedra without holes. A second failure is confusing prisms (uniform cross-section throughout) with pyramids (tapering to a single apex), particularly for solids with unfamiliar or irregular polygon bases. A third failure is believing a solid with a hole through it must still satisfy V−E+F=2 if counted carefully enough, rather than recognizing the formula's value genuinely differs for such solids.

## Misconceptions
Reused by reference from the Blueprint's Component 6 Misconception Registry, with birth-type classification added:

- **MC-1 — EULERS-FORMULA-OVERGENERALIZED-TO-CURVED-SOLIDS** (Foundational)
  - **Blueprint description**: believing Euler's formula applies universally to all 3D solids, including curved ones, rather than recognizing it as specifically derived for flat-faced polyhedra without holes.
  - **Birth type**: Type 1, overgeneralization — the formula's genuine elegance and memorability (always exactly 2) makes it tempting to over-apply beyond its actual scope, since nothing in the equation itself signals the flat-faced restriction.
  - **Repair approach**: Blueprint Repair Action B01 — working through the cylinder counterexample explicitly, showing the formula genuinely fails to apply cleanly and explaining why (flat-faced-polyhedron scope, not universal applicability).

- **MC-2 — PRISM-PYRAMID-CONFLATED** (Moderate)
  - **Blueprint description**: confusing prisms (uniform cross-section throughout) with pyramids (tapering to a single apex), particularly for solids with unfamiliar or irregular polygon bases.
  - **Birth type**: Type 2, perceptual intuition — familiar examples (a box vs. a classic pyramid) make the distinction obvious, but an unfamiliar or irregular base shape removes the usual visual cues.
  - **Repair approach**: Blueprint Repair Action B02 — re-anchoring on the defining structural test: does the cross-section stay the same size all the way through (prism), or shrink to a single point (pyramid)?

- **MC-3 — HOLE-IN-SOLID-ASSUMED-TO-STILL-SATISFY-EULERS-FORMULA** (Moderate)
  - **Blueprint description**: believing a solid with a hole through it must still satisfy V−E+F=2 if counted carefully enough, rather than recognizing the formula's value genuinely differs.
  - **Birth type**: Type 1, overgeneralization — since Euler's formula holds robustly across many differently-shaped sphere-like solids, learners over-generalize that careful-enough counting will always force the value back to 2.
  - **Repair approach**: Blueprint Repair Action B03 — re-anchoring on "a hole through a solid is a genuine topological difference, not a counting inconvenience — the formula's value reflects a real structural distinction."

## Analogies
- **The furniture-designer analogy** (Blueprint Component 5, P76): a designer building a flat-panel decorative object (8 vertices, 12 edges) can use Euler's formula to predict the required number of panel faces, but an alternative torus-shaped ceramic prototype with a hole through it cannot use the same formula to predict any missing count, regardless of how carefully faces/edges/vertices are defined for it.

## Demonstrations
- Sorting physical or described models (box, pyramid, cone, cylinder, ball) into the five standard solid families by their defining structural feature (Blueprint TA-A01, Example 1).
- Verifying Euler's formula on a cube (V=8, E=12, F=6, giving 8−12+6=2) and using it to find a missing count for a triangular prism (Blueprint TA-A02, Example 2/3).
- Attempting the same formula on a cylinder (2 flat faces + 1 curved face, 2 edges, 0 vertices, giving 0−2+3=1≠2), confirming this signals a non-polyhedron rather than a computational error (Blueprint TA-A02, Example 3), targeting MC-1.

## Discovery Questions
1. "Does Euler's formula, V−E+F=2, apply to a sphere or a cylinder the same way it applies to a cube?"
2. "Given an unfamiliar solid with an irregular base, how do you tell if it's a prism or a pyramid?"
3. "If you count a torus's faces, edges, and vertices carefully enough, will you always get V−E+F=2?"

## Teaching Sequence
Follows the Blueprint's Component 4 exactly: TA-A01 (the standard solid families via physical models) → TA-A02 (Euler's formula, its scope, and solids with holes) → TA-A03 (Mastery Gate, P91).

## Tutor Actions
- **ORGANIZE: Concept Map** — sorting solids into the five families by their defining structural feature (Blueprint TA-A01).
- **DO: Worked Example** — verifying and applying Euler's formula on a cube and a triangular prism (Blueprint TA-A02, Example 2/3).
- **TEST-THINKING: Error Analysis** — the cylinder's naive Euler's-formula attempt yielding 1≠2 (Blueprint TA-A02, Example 3), targeting MC-1.
- **TELL: Explanation** — the topological distinction between sphere-like solids (V−E+F=2) and solids with holes like a torus (V−E+F=0).

## Voice Teaching Notes
Before applying Euler's formula to any solid, ask "is this bounded entirely by flat polygon faces, with no holes?" as a standing check directly targeting MC-1.

## Assessment Signals
- **P76 (transfer probe, independence mode per the Blueprint's Component 7 — cross_links = none)**: reused verbatim from the Blueprint's Component 5 A03 — the furniture-designer scenario predicting a flat-panel object's face count via Euler's formula, and explaining why the same formula cannot predict a torus prototype's missing count.
- **P77 (mastery gate)**: the Blueprint's 4-item problem set plus P76 (Component 5 A03), MAMR 4/5.

## Tutor Recovery Strategy
If MC-1 persists, require the student to first state explicitly whether a given solid is bounded entirely by flat polygonal faces with no holes before ever applying Euler's formula to it, practicing on a mix of genuine polyhedra and curved solids until the scope restriction is applied automatically.

## Memory Hooks
- "Prism: same cross-section all the way through. Pyramid: tapers to one point."
- "Euler's formula V−E+F=2 is for flat-faced polyhedra without holes — not a universal law for every 3D shape."
- "A hole through a solid genuinely changes the formula's value — that's not a counting mistake."

## Transfer Connections
- `math.geom.surface-area` (unlocks) requires correctly identifying and measuring each face of a solid, exactly as classified here.
- `math.geom.volume` (unlocks) uses volume formulas specific to each solid family identified here.
- `math.geom.polygon` (requires) supplies the polygon bases and cross-sections that define prisms and pyramids.

## Cross-Subject Connections
- Chemistry: molecular and crystal lattice geometries are frequently classified using these same solid-family distinctions (prisms, pyramids) and face/edge/vertex counting.

## Blueprint References
`docs/curriculum/blueprints/math.geom.solid-3d.md` — all worked examples, teaching actions, and the P76/P77 assessment items reused by reference, not restated in full.

## Runtime Asset References
None seeded yet in `src/lib/teaching/assets/` for this concept as of this entry's authoring date.

## Curriculum Feedback
None found at authoring time.

## Version History
- v1.0 (2026-07-26): Initial authoring, Domain Certification Mode, math.geom Wave 7.
