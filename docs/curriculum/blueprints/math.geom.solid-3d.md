# Teaching Blueprint: Three-Dimensional Solids (`math.geom.solid-3d`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.solid-3d` |
| name | Three-Dimensional Solids |
| domain | Geometry |
| difficulty | proficient |
| bloom | understand |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 10 |
| requires | `math.geom.polygon` |
| unlocks | `math.geom.surface-area`, `math.geom.volume` |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — physical solid models before Euler's formula |
| description (KG) | Geometric solids: prisms (uniform cross-section), pyramids (apex), cones, cylinders, spheres; characterized by faces, edges, vertices and their counts satisfying Euler's formula V−E+F=2. |

## Component 1 — Learning Objectives

- LO1: Identify and describe the standard families of three-dimensional solids: **prisms** (uniform polygon cross-section extended along an axis), **pyramids** (a polygon base tapering to a single apex), **cones** and **cylinders** (circular-base analogues of pyramids/prisms), and **spheres** (no flat faces at all).
- LO2: Count the **faces (F)**, **edges (E)**, and **vertices (V)** of a given polyhedron (a solid with flat polygonal faces), and state and apply **Euler's formula** $V-E+F=2$ to verify a count or to find a missing count given the other two.
- LO3: Recognize that Euler's formula applies specifically to **polyhedra without holes** (topologically sphere-like solids) — correctly identify that curved solids like spheres, cones, and cylinders require adjusted/different counting conventions (e.g. treating a curved surface as a single "face" is a convention choice, not a universal rule), and that a solid with a hole (like a torus/donut shape) genuinely violates $V-E+F=2$.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.polygon` (closed straight-sided plane figures, which serve as the cross-sections/bases of prisms and pyramids).

## Component 3 — Core Explanation

**Prisms**: a solid with two parallel, congruent polygonal bases connected by rectangular (or parallelogram) side faces — the cross-section is uniform along the prism's length. E.g. a triangular prism (triangular bases), a rectangular prism (box shape).

**Pyramids**: a solid with one polygonal base and triangular side faces all meeting at a single point, the **apex**. E.g. a square pyramid (square base, 4 triangular sides).

**Cones and cylinders**: the circular-base analogues — a cylinder is like a prism with a circular cross-section (two parallel circular bases, one curved side surface); a cone is like a pyramid with a circular base tapering to an apex.

**Spheres**: a solid with no flat faces at all — every point on its surface is equidistant from the center.

**Faces, edges, vertices, and Euler's formula**: for a **polyhedron** (a solid entirely bounded by flat polygonal faces, with no holes), counting **faces (F)**, **edges (E)**, and **vertices (V)** always satisfies:
$$V - E + F = 2$$
This is **Euler's formula** — a genuinely deep topological fact (not just a coincidence of specific shapes), holding for EVERY polyhedron topologically equivalent to a sphere (i.e., no holes through it), regardless of how irregular its faces are.

**Curved solids and holes**: Euler's formula, in its basic $V-E+F=2$ form, applies to POLYHEDRA (flat faces only). Curved solids (spheres, cones, cylinders) require a CONVENTION choice for what counts as a "face," "edge," or "vertex" (e.g., a cylinder is sometimes counted as having 2 faces — the two circles — plus 1 curved "face," 2 edges — the two circle boundaries — and 0 vertices, giving $0-2+3=1\neq2$, since this isn't a genuine polyhedron in the strict sense). A solid with a hole through it (a torus) has $V-E+F=0$, genuinely DIFFERENT from 2 — this isn't a counting error, it reflects the solid's different topological structure (having a hole changes the formula's value, a fact from a deeper branch of mathematics called topology).

## Component 4 — Worked Examples

**Example 1 (LO1 — identifying solid families)**: A tent shaped like a triangular cross-section extended along its length is a **triangular prism** (uniform cross-section). An Egyptian-style structure with a square base and four triangular faces meeting at a point is a **square pyramid** (apex). A party hat is a **cone** (circular base, tapering to an apex).

**Example 2 (LO2 — Euler's formula on a cube)**: A cube has 6 faces (F=6), 12 edges (E=12), 8 vertices (V=8). Check: $V-E+F = 8-12+6=2$. ✓ Confirms Euler's formula.

**Example 3 (LO2/LO3 — Euler's formula to find a missing count, and the curved-solid caveat, breaking MC-1)**: A polyhedron has 5 faces and 9 edges. Find its vertex count using Euler's formula: $V-9+5=2 \Rightarrow V=6$ (this describes a triangular prism: 2 triangular faces + 3 rectangular faces = 5 faces; 9 edges; 6 vertices — consistent). Now apply the SAME formula, naively, to a cylinder using one common convention (2 flat circular faces + 1 curved face = 3 "faces," 2 circular edges = 2 "edges," 0 vertices): $0-2+3=1\neq2$ — this does NOT satisfy Euler's formula, correctly signaling that a cylinder is not a polyhedron in the strict sense the formula was derived for, not a computational mistake.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Standard Solid Families, via Physical Models (Primitive P11: Representation Shift)

Present (or describe) physical models: a box (prism), a pyramid model, a cone, a cylinder, a ball (sphere). Sort them by defining feature: "does it have a uniform cross-section all the way through? Prism. Does it taper to a single point from a polygon base? Pyramid. Same tapering, but a circular base? Cone. Uniform cross-section, but circular? Cylinder. No flat faces anywhere? Sphere." Work Example 1's identification exercise.

Shift representation to counting: for the cube (a familiar prism), count F, E, V explicitly by examining a physical or drawn model, working Example 2's verification.

- **MC-1 hook**: ask "does Euler's formula, $V-E+F=2$, apply to a sphere or a cylinder the same way it applies to a cube?" — a "yes, it always works for any 3D solid" answer reveals MC-1 (over-generalizing Euler's formula to ALL solids, including curved ones, without recognizing the formula's derivation specifically assumes flat polygonal faces).

### Teaching Action A02 — Euler's Formula, Its Scope, and Solids with Holes (Primitive P06: Contrast Pair)

**Contrast 1**: Work Example 3's forward application (5 faces, 9 edges → find V=6 for a triangular prism), reinforcing the formula as a genuinely useful predictive tool for polyhedra.

**Contrast 2 (targets MC-1)**: Apply the same formula attempt to a cylinder (Example 3's second half), getting $1\neq2$, and explicitly discuss why: "the formula $V-E+F=2$ was derived specifically for solids bounded ENTIRELY by flat polygon faces, with no holes through them — a cylinder has curved surfaces, and there's no single 'correct' way to force it into the face/edge/vertex counting scheme the formula assumes. This isn't the formula failing — it's a signal that cylinders are a genuinely different kind of object, not a polyhedron." Briefly mention: "a donut-shaped solid (torus), which genuinely HAS a hole through it, gives $V-E+F=0$ even when counted with perfectly flat polygonal faces — this ISN'T a counting error either; a hole through a solid genuinely changes this topological quantity's value, a fact belonging to a deeper field called topology."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Identify which solid family (prism, pyramid, cone, cylinder, sphere) best describes: a can of soup, a wizard's hat, a gemstone with a rectangular cross-section extended along its length.
  2. A square pyramid has 5 faces (1 square base + 4 triangular sides), 8 edges, and 5 vertices. Verify Euler's formula for this solid.
  3. A polyhedron has 12 vertices and 30 edges. Using Euler's formula, find the number of faces.
  4. Explain why applying $V-E+F=2$ directly to a sphere (which has no clearly countable faces, edges, or vertices in the usual sense) doesn't straightforwardly make sense the way it does for a cube, connecting your answer to what kind of solid the formula was actually derived for.
- **P76 (Transfer Probe, mode = independence)**: "A furniture designer is prototyping a decorative object built by gluing together flat polygon panels (no curved surfaces at all) with 8 vertices and 12 edges. (a) Using Euler's formula, predict how many flat panel faces the finished object must have. (b) The designer's alternative prototype instead uses a smoothly curved ceramic donut shape (a torus) with a hole through the middle — explain, using this lesson's discussion of solids-with-holes, why you could NOT use the same $V-E+F=2$ formula to predict a missing count for this second object, even in principle, regardless of how carefully faces/edges/vertices might be defined for it."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | EULERS-FORMULA-OVERGENERALIZED-TO-CURVED-SOLIDS | Believing Euler's formula $V-E+F=2$ applies universally to all 3D solids, including curved ones (spheres, cones, cylinders), rather than recognizing it as specifically derived for flat-faced polyhedra without holes | Foundational |
| MC-2 | PRISM-PYRAMID-CONFLATED | Confusing prisms (uniform cross-section throughout) with pyramids (tapering to a single apex), particularly for solids with unfamiliar or irregular polygon bases | Moderate |
| MC-3 | HOLE-IN-SOLID-ASSUMED-TO-STILL-SATISFY-EULERS-FORMULA | Believing a solid with a hole through it (like a torus) must still satisfy $V-E+F=2$ if it is counted carefully enough, rather than recognizing the formula's value genuinely differs for such solids | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Euler's Formula Overgeneralization") → P41 (detect: ask whether $V-E+F=2$ applies directly to a sphere or cylinder) → P64 (conceptual shift: work through Example 3's cylinder attempt explicitly, showing the formula genuinely fails to apply cleanly, and explaining why — flat-faced-polyhedron scope, not universal applicability).
- **B02 (targets MC-2)**: P27 (name it: "Prism/Pyramid Confusion") → P41 (detect: present an unfamiliar solid, e.g. a hexagonal-based solid, and ask whether it's a prism or pyramid based on a brief description, checking whether "uniform cross-section vs. tapering to a point" is correctly applied) → P64 (conceptual shift: re-anchor on the defining structural test — does the cross-section stay the SAME size all the way through (prism), or does it shrink to a single point (pyramid)?).
- **B03 (targets MC-3)**: P27 (name it: "Hole-Still-Satisfies-Formula Assumption") → P41 (detect: ask whether a torus, counted carefully, must still satisfy $V-E+F=2$) → P64 (conceptual shift: re-anchor on "a hole through a solid is a genuine topological difference, not a counting inconvenience — the formula's value (0 for a torus, vs. 2 for a sphere-like solid) reflects a real structural distinction, correctly computed either way").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.polygon` (the polygon bases/cross-sections that define prisms and pyramids).
- **Unlocks**: `math.geom.surface-area` (computing surface area requires correctly identifying and measuring each face of a solid, exactly as classified here), `math.geom.volume` (volume formulas are specific to each solid family identified here).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 10 with a proficient/understand tag places this at the "2 main TAs + gate" tier — A01 (the five standard solid families via physical models) and A02 (Euler's formula, its scope, and the hole/curved-solid caveat) jointly cover all three LOs; despite the broad content (five distinct solid families plus a genuinely deep topological formula), a third TA was judged unnecessary since the underlying skill (recognize the defining structural feature of each family; apply and correctly scope Euler's formula) is conceptually unified.
- MC-1 (Euler's-formula-overgeneralized) was given the most extensive treatment because Euler's formula's genuine elegance and memorability (a simple equation, always exactly 2) makes it especially tempting to over-apply beyond its actual scope — the cylinder counterexample (Example 3, second half) was chosen specifically because it's a familiar, everyday solid where the naive attempt visibly and instructively fails, rather than an exotic shape that might seem like an edge case unlikely to matter in practice.
- The torus/hole discussion (MC-3) was deliberately kept brief and descriptive (stating the fact — $V-E+F=0$ for a torus — without deriving it), consistent with this concept's understand-level Bloom target: the goal is correct AWARENESS that holes genuinely change the formula's value (a real mathematical fact, not folklore), not derivation of the general Euler characteristic formula for arbitrary genus, which belongs to topology proper.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.geom.polygon`) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: physical solid models before Euler's formula) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO2/LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
