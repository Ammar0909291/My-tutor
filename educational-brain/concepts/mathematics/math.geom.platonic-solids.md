## Identity

- **KG ID**: `math.geom.platonic-solids`
- **Name**: Platonic Solids
- **Domain**: Geometry
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.75
- **Estimated hours**: 5
- **Requires**: `math.geom.solid-3d`, `math.geom.regular-polygon`
- **Unlocks**: (none)
- **Cross-links**: `math.top.euler-characteristic`
- **Blueprint**: none — not yet produced by the Curriculum Production Pipeline as of 2026-07-28

## Learning Objective

Name and describe the five Platonic solids (tetrahedron, cube, octahedron, dodecahedron, icosahedron); state their face type, face count, vertex count, and edge count; verify Euler's formula V − E + F = 2 for each; and explain why exactly five Platonic solids exist using the angle-at-vertex argument.

## Core Understanding

A **Platonic solid** is a convex polyhedron whose faces are all identical regular polygons meeting at every vertex in the same arrangement. Exactly five exist:

| Solid | Face | F | V | E | Each interior vertex angle sum |
|---|---|---|---|---|---|
| Tetrahedron | Equilateral triangle | 4 | 4 | 6 | 3 × 60° = 180° |
| Cube (hexahedron) | Square | 6 | 8 | 12 | 3 × 90° = 270° |
| Octahedron | Equilateral triangle | 8 | 6 | 12 | 4 × 60° = 240° |
| Dodecahedron | Regular pentagon | 12 | 20 | 30 | 3 × 108° = 324° |
| Icosahedron | Equilateral triangle | 20 | 12 | 30 | 5 × 60° = 300° |

**Euler's formula** holds for each: V − E + F = 2. (e.g., cube: 8 − 12 + 6 = 2.)

**Why exactly five?** For a solid to close up at a vertex, the face angles meeting there must sum to less than 360° (otherwise the vertex is flat or concave). Triangular faces (60° each) can contribute 3, 4, or 5 at a vertex (180°, 240°, 300° — all < 360°; 6 × 60° = 360° is flat, not a solid). Square faces (90° each): 3 at a vertex (270° < 360°; 4 × 90° = 360° is flat). Pentagonal faces (108° each): 3 at a vertex (324° < 360°; 4 × 108° = 432° > 360°, impossible). Hexagonal faces (120° each): 3 × 120° = 360° — already flat. No Platonic solid with hexagonal or higher faces is possible.

## Mental Models

- **Vertex angle budget**: a convex solid's vertex must have face angles that sum to strictly less than 360°. You are "spending" degrees at each vertex; if you hit exactly 360°, the surface goes flat; if you go over, it can't close as a convex solid.
- **Classification by face type and vertex count**: the Platonic solids are indexed by (face shape, faces per vertex). Only five valid combinations pass the <360° budget rule.
- **Dual pairs**: the tetrahedron is self-dual; the cube and octahedron are duals of each other (swap F and V); the dodecahedron and icosahedron are duals of each other (swap F and V). The duality explains why their (V, F) pairs are mirror images.

## Why Students Fail

The word "regular" in everyday speech means "common" or "standard," not "all faces and angles equal." This causes students to doubt that a cube is a Platonic solid (it's made of squares, not equilateral triangles — but squares ARE regular polygons) or to believe that a rectangular box is also Platonic (rectangles are NOT regular polygons). The dodecahedron and icosahedron have names that sound similar and are easily confused — students associate them with each other's face counts. Euler's formula V − E + F = 2 is a pattern, but memorizing it without verification against even one Platonic solid leaves students uncertain which way the signs go (V + E − F? V − E − F? etc.).

## Misconceptions

### MC-1 — CUBE-IS-NOT-PLATONIC-BECAUSE-NOT-TRIANGLES
**Birth type**: Type 3 (language contamination — "regular solid" or "perfect solid" language suggests the faces should be the most "basic" shape, which students associate with triangles; squares are seen as a less fundamental face type)
**Mechanism**: The student has formed the impression that Platonic solids must have triangular faces (perhaps because three of the five do, and the tetrahedron is the simplest example introduced). When told the cube is Platonic, they object: "but it's made of squares, not triangles — it doesn't seem as regular."
**Diagnostic probe**: "Is a cube a Platonic solid?" — watch for "no" or "I thought only triangles counted."
**Characteristic phrases**: "I thought Platonic solids were made of triangles" / "the cube uses squares, so it's different."

### MC-2 — RECTANGULAR-BOX-IS-ALSO-PLATONIC
**Birth type**: Type 2 (perceptual intuition — a rectangular box looks regular and symmetric to the eye; the technical distinction between a square face and a rectangular face is visually subtle)
**Mechanism**: The learner applies the regularity condition loosely — "all faces are quadrilaterals" is confused with "all faces are regular quadrilaterals (squares)." A rectangular box has six identical faces, and looks symmetric, so it "feels" Platonic.
**Diagnostic probe**: "Is a rectangular shoebox a Platonic solid?" — watch for "yes" or "I think so."
**Characteristic phrases**: "It has the same shape on every side" / "all the faces are the same (rectangles)" / not distinguishing squares from rectangles in this context.

### MC-3 — EULER-FORMULA-SIGN-CONFUSION
**Birth type**: Type 5 (instruction-induced — the formula V − E + F = 2 has an alternating sign pattern that feels arbitrary to memorize; students invert a sign or the order of terms)
**Mechanism**: The student remembers the formula involves V, E, F, and the number 2, but mixes up whether the formula is V − E + F, V + E − F, F − E + V, or another combination.
**Diagnostic probe**: "State Euler's formula for polyhedra." Watch for V + E − F = 2 or F − E + V = 0 or other incorrect variants.
**Characteristic phrases**: "Is it V plus E minus F?" / "I can never remember which sign goes where."

### MC-4 — DODECAHEDRON-ICOSAHEDRON-FACE-COUNT-SWAP
**Birth type**: Type 4 (notation-induced — "dodeca-" means 12 and "icosa-" means 20; both numerical prefixes are from Greek and unfamiliar, causing the counts to be swapped)
**Mechanism**: The student correctly identifies both solids but swaps their face counts: assigning 20 faces to the dodecahedron (which has 12) and 12 to the icosahedron (which has 20).
**Diagnostic probe**: "How many faces does a dodecahedron have? An icosahedron?" — watch for the swap.
**Characteristic phrases**: "Isn't the dodecahedron the one with 20 faces?" / "I always mix those two up."

## Analogies

- **Vertex budget as a paper model test**: if you cut out regular polygons and try to fold them up around a vertex, the fold only works if the angles leave a "gap" (< 360°). If the angles exactly fill 360°, you get flat tiling (like hexagonal honeycomb). If they exceed 360°, the faces buckle outward — impossible for a convex solid. Physical paper models make this concrete.
- **Dual solids as inside-out**: if you place a dot at the center of each face of a cube and connect the dots, you get an octahedron inside the cube. The cube's 6 faces become the octahedron's 6 vertices; the cube's 8 vertices become the octahedron's 8 faces. The two solids are structurally inside-out versions of each other.

## Demonstrations

1. **Paper model construction**: build at least two Platonic solids from nets (flat patterns). Fold up the tetrahedron net (4 equilateral triangles) and the cube net (6 squares). Observe that the fold works because the vertex angle sum is < 360°. Attempt 6 equilateral triangles meeting at a vertex — it lies flat (360°), confirming why an icosahedron only permits 5 triangles per vertex.
2. **Euler's formula verification**: for each of the five solids, fill in the table (F, V, E) and compute V − E + F. All give 2. This pattern holds for any convex polyhedron.
3. **Dual pair visual**: show side-by-side images of a cube and an octahedron. Mark the face centers of the cube; note their positions match the octahedron's vertices. Name the swap: cube (F=6, V=8) → octahedron (F=8, V=6).

## Discovery Questions

- "How many equilateral triangles can meet at a vertex of a solid before the shape won't close up?"
- "If V − E + F = 2 for all five Platonic solids, is this a coincidence or a theorem? Does it hold for a sphere?"
- "Why can't there be a Platonic solid with hexagonal faces?"

## Teaching Sequence

1. Define a Platonic solid precisely: convex, all faces are congruent regular polygons, identical vertex arrangement everywhere.
2. Build the vertex angle budget argument: for triangles (60°), show which counts < 360° (3, 4, 5); for squares (90°) and pentagons (108°), show only 3 per vertex works.
3. Name all five solids; state their (face type, F, V, E) from the table.
4. Verify Euler's formula for at least two solids.
5. Dual pairs: show that swapping (F, V) between dual pairs gives the other solid's counts.
6. Assessment gate.

## Tutor Actions

- MC-1 intervention: confirm that "regular polygon" includes squares — regular means all sides and angles equal. A square has 4 equal sides and 4 equal angles. Then walk through why the cube passes the Platonic definition.
- MC-2 intervention: contrast a square face (all four sides equal) with a rectangular face (two pairs of equal sides, but different pairs differ). A 3×4×5 box has rectangular faces — not regular polygons — so it fails the definition.
- MC-3 intervention: verify Euler's formula for the tetrahedron (V=4, E=6, F=4: 4−6+4=2) and cube (V=8, E=12, F=6: 8−12+6=2). Make the verification a habit so the formula is reconstructed, not memorized.
- MC-4 intervention: etymological anchor — "dodeca-" = 12 (like a clock has 12 hours); "icosa-" = 20 (like the number of sides on an icosahedron). Or use a physical model: a dodecahedron has 12 pentagonal faces (count them on a photo).

## Voice Teaching Notes

- Ask "what makes a polygon regular?" before introducing Platonic solids — confirming the learner can correctly classify a square as regular (and a rectangle as not) prevents MC-1 and MC-2 before they arise.
- Use physical models or images at this stage — Platonic solids have strong spatial structure that prose and formulas cannot convey as efficiently as a 3D object.
- When introducing dodecahedron/icosahedron, say the prefix etymologies aloud immediately: "dodeca = 12, icosa = 20 — like an icosahedron has 20 triangular faces."

## Assessment Signals

- **Classification probe**: show five shapes (including a rectangular box and a cube) — which are Platonic solids?
- **Face/vertex/edge retrieval**: complete the (F, V, E) table for all five solids from memory.
- **Euler's formula probe**: compute V − E + F for a named solid; state the formula.
- **Why five probe**: explain, in one argument, why no sixth Platonic solid exists.
- **Dual pair probe**: which two Platonic solids are duals of the dodecahedron and icosahedron?

## Tutor Recovery Strategy

- **MC-1**: re-derive the Platonic solid definition from first principles; confirm "regular polygon" covers squares; then verify the cube has six congruent square faces meeting three per vertex with angle sum 3×90° = 270° < 360°.
- **MC-2**: side-by-side comparison of a square and a rectangle; mark that a rectangle's sides are not all equal; apply the test to the rectangular box.
- **MC-3**: verify Euler's formula from the (F,V,E) table rather than reciting it. After two successful verifications, the formula's signs become part of a pattern the student has checked, not a sequence to recall cold.
- **MC-4**: write "dodeca = 12" and "icosa = 20" in a prominent location during the lesson; have the student say the Greek prefix and the number together three times. Then use only names (not descriptions) in subsequent problems to force active retrieval.

## Memory Hooks

- **Five solids, face types**: "3 with triangles (4/8/20 faces), 1 with squares (6 faces), 1 with pentagons (12 faces)."
- **Euler's formula**: V − E + F = 2. Verbalize as "Vertices minus Edges plus Faces equals Two." The alternating signs match the word order V, E, F with minus first: V(+) then −E then +F.
- **Dodeca = 12, Icosa = 20**: "a dozen faces = dodecahedron; a score of faces = icosahedron."
- **Dual pairs**: cube ↔ octahedron (swap 6 and 8); dodecahedron ↔ icosahedron (swap 12 and 20); tetrahedron ↔ itself.

## Transfer Connections

- `math.geom.solid-3d`: Platonic solids are the most symmetric special cases of general polyhedra.
- `math.geom.regular-polygon`: the face constraint for Platonic solids requires the faces to be regular polygons; this entry supplies that prerequisite.
- `math.top.euler-characteristic`: V − E + F = 2 is the Euler characteristic of a sphere; every convex polyhedron is topologically a sphere, which is why this formula holds universally for convex polyhedra.

## Cross-Subject Connections

- Chemistry: crystal structures — the regular tetrahedron appears in carbon bonding (methane), the cube in ionic lattices (NaCl unit cell), the octahedron in transition metal complexes.
- Art and architecture: the Platonic solids were used by Kepler in his model of planetary orbits; they appear in design, sculpture, and sacred geometry throughout history.
- Biology: many viral capsids have icosahedral symmetry — the icosahedron minimizes surface area for a given volume among these structures.

## Blueprint References

- No Blueprint file exists for `math.geom.platonic-solids` as of 2026-07-28.
- Misconceptions authored directly via the birth-taxonomy diagnostic procedure (EDUCATIONAL_BRAIN_STANDARD.md §4.2).

## Runtime Asset References

- Explanation assets: `math.geom.platonic-solids:EXPLANATION:en` (DRAFT, live-capture path)
- Probe assets: `math.geom.platonic-solids:PROBE:en` (DRAFT, live-capture)

## Curriculum Feedback

- The KG description accurately captures the concept scope. The cross-link to `math.top.euler-characteristic` is well-placed — the Euler formula V − E + F = 2, which is the most computationally tractable result here, is a special case of that topology concept.
- The KG difficulty = proficient is appropriate: this requires integrating solid geometry knowledge (solid-3d) with regular polygon knowledge (regular-polygon) and applying the vertex-angle-budget argument — this is not a recall task.

## Version History

- v1.0 (2026-07-28): Initial entry. No Blueprint. 4 misconceptions authored via birth-taxonomy diagnostic.
