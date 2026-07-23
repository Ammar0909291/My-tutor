# Close-Packing in Crystals — `chem.solid.packing`

## Identity
- **KG ID**: chem.solid.packing
- **Subject**: chemistry
- **Domain**: chem.solid
- **Difficulty**: proficient
- **Bloom level**: apply
- **Estimated hours**: 3
- **Mastery threshold**: 0.80
- **Prerequisites**: chem.solid.crystal-systems
- **Unlocks**: chem.solid.ionic-solids

## Learning Objective
Describe cubic close-packed (CCP/FCC) and hexagonal close-packed (HCP) structures in terms of layer stacking sequences; locate and count tetrahedral and octahedral holes; explain how filling of these holes generates known ionic crystal structures; and connect packing efficiency to atomic radius and unit cell parameters.

## Core Understanding
**Close-packed layers**: in a single plane, hard spheres of equal radius can be packed most efficiently in a hexagonal arrangement — each sphere touches 6 neighbours. This layer is called layer A. A second layer (B) sits in the hollows of layer A. For a third layer, there are TWO choices:
- Place it in hollows DIRECTLY above layer A atoms → gives ABABAB... stacking = **Hexagonal Close Packing (HCP)**.
- Place it in hollows that are NOT above A atoms (a new position C) → gives ABCABC... stacking = **Cubic Close Packing (CCP)**, equivalent to Face-Centred Cubic (FCC).

**Both CCP and HCP achieve**:
- Packing efficiency: 74.05% (maximum possible for identical spheres — proved by Kepler conjecture).
- Coordination number: 12 (each sphere touches 6 in the same layer + 3 above + 3 below).

**CCP (ABCABC) = FCC**: the lattice is face-centred cubic. The (111) plane of the FCC unit cell is the close-packed layer. Metals with CCP structure: Cu, Al, Ni, Ag, Au, Pt (many engineering metals).

**HCP (ABABAB)**: the c-axis is perpendicular to the close-packed layers. Metals with HCP structure: Mg, Ti, Zn, Co, Cd.

**Holes in close-packed structures**:
Close-packed structures are NOT fully filled — gaps (holes/voids/interstices) exist between the spheres. There are TWO types:

1. **Tetrahedral holes**: formed where ONE sphere sits on TOP of a triangular group of 3 spheres from the layer below. The 4 surrounding spheres are at the corners of a tetrahedron. In CCP (FCC), there are **2 tetrahedral holes per sphere** (i.e. per atom in the unit cell). Each tetrahedral hole can accommodate a sphere with radius ≤ 0.225× the radius of the close-packed sphere.

2. **Octahedral holes**: formed between 3 spheres in one layer and 3 spheres in the adjacent layer, giving a site surrounded by 6 spheres at the corners of an octahedron. In CCP (FCC), there is **1 octahedral hole per sphere**. The octahedral hole is larger: radius ≤ 0.414× the packing sphere radius.

**Ionic crystal structures from hole-filling (CCP/FCC arrangement of the larger anion)**:
- **Rock-salt structure (NaCl)**: Cl⁻ in CCP (FCC arrangement); Na⁺ occupies ALL octahedral holes. Ratio: 1 octahedral hole per Cl⁻ → 1 Na⁺ per Cl⁻ → NaCl stoichiometry. Na⁺ CN = 6 (octahedral); Cl⁻ CN = 6. Confirmed: 4 NaCl formula units per FCC unit cell (4 Cl⁻ in FCC + 4 Na⁺ in all octahedral holes).
- **Zinc blende (ZnS)**: S²⁻ in CCP; Zn²⁺ fills HALF the tetrahedral holes (alternating, so that no two occupied tetrahedral holes are adjacent). 2 tetrahedral holes per S²⁻; half filled → 1 Zn²⁺ per S²⁻ → ZnS stoichiometry. Zn²⁺ CN = 4 (tetrahedral); S²⁻ CN = 4.
- **Fluorite (CaF₂)**: Ca²⁺ in CCP; F⁻ fills ALL tetrahedral holes. 2 tetrahedral holes per Ca²⁺; all filled → 2 F⁻ per Ca²⁺ → CaF₂ stoichiometry. Ca²⁺ CN = 8 (surrounded by 8 F⁻ at corners of a cube — this is NOT octahedral despite 8 neighbours, because the tetrahedral holes when ALL filled create a cubic arrangement around each FCC atom); F⁻ CN = 4.
- **Anti-fluorite**: like fluorite but with anion and cation roles REVERSED. Example: Na₂O, where O²⁻ is in CCP and Na⁺ occupies all tetrahedral holes (2 Na⁺ per O²⁻). Used for Li₂O, Na₂O, K₂O.

**Deriving ionic radii from X-ray diffraction**: the unit cell edge length (a) is measured precisely from XRD (Bragg's law: nλ = 2d sin θ). For NaCl FCC, the face diagonal = 4r(Cl⁻) and the cell parameter gives 2r(Na⁺) + 2r(Cl⁻) = a√2/2 = a/√2. From two equations + the Pauling ionic radii constraint, experimental ionic radii can be derived.

## Mental Models
**The layered orange model**: imagine oranges in a box arranged in the most compact triangular pattern (one layer, A). Place a second layer (B) in the dips. Now choose: third layer over A (gives ABAB = HCP, like a honeycomb arrangement seen from the side) or over the third unique position C (gives ABC = CCP, where looking from a tilted direction reveals the FCC cube). The choice of third layer gives entirely different crystal structures despite the same local environment.

**Holes as building templates**: the holes between close-packed anions are the "slots" available for cations. A crystal structure is the PATTERN of which slots you fill: ALL octahedral → NaCl; HALF tetrahedral → ZnS; ALL tetrahedral → CaF₂. The stoichiometry is determined solely by how many slots of each type you fill.

## Why Students Fail
Students memorise the four structures (NaCl, ZnS, CaF₂, CsCl) without understanding that three of them (NaCl, ZnS, CaF₂) arise from filling different fractions of different hole types in a CCP anion sublattice. This means they cannot derive the stoichiometry or coordination numbers from first principles and cannot answer "what structure would CaTe form?" by reasoning through hole-filling.

Students also confuse the number of holes with the ratio of atoms: "2 tetrahedral holes per atom" does NOT mean a 2:1 ratio of atoms in the crystal — it means you have 2 holes AVAILABLE; the actual ratio depends on how many you fill.

## Misconceptions
- **MC-1 (Type 5 — instruction-induced)**: "HCP and CCP are different in every respect — they have different coordination numbers, different packing efficiencies, and different local environments." Probe: "Compare the coordination number and packing efficiency of HCP and CCP." Characteristic phrase: "HCP and CCP are completely different types of packing." Intervention: HCP and CCP are identical in BOTH coordination number (12 in each) AND packing efficiency (74.05% in each). The ONLY difference is the STACKING SEQUENCE (ABAB vs. ABCABC). The local environment of any sphere (touching 12 neighbours) is the same in both — but the ARRANGEMENT of the 12 neighbours differs: HCP has a slight rotation between the top and bottom layers of 6; CCP does not. This gives different symmetry (hexagonal vs. cubic) despite identical density and coordination.
- **MC-2 (Type 4 — notation-induced)**: "The fluorite structure has Ca²⁺ in octahedral holes because CaF₂ has Ca:F = 1:2 and octahedral holes are more common." Probe: "In the fluorite structure, which type of hole do the F⁻ ions occupy, and why?" Characteristic phrase: "1:2 stoichiometry → octahedral holes because there's one per atom." Intervention: in fluorite, Ca²⁺ is in CCP and F⁻ fills ALL TETRAHEDRAL holes (2 per Ca²⁺ in CCP → 2 F⁻ per Ca²⁺ → CaF₂). The ratio is satisfied because the number of tetrahedral holes is TWICE the number of CCP atoms — not because octahedral holes are involved. Octahedral holes (1 per atom) would give a 1:1 ratio (like NaCl).
- **MC-3 (Type 2 — perceptual intuition)**: "Simple cubic packing (primitive cubic) is denser than close packing because the atoms are arranged in a neat grid with no wasted space." Probe: "Calculate the packing efficiency of a simple cubic structure (each atom at a corner, touching along the edge) and compare to CCP." Characteristic phrase: "the neat square grid must be more efficient than the irregular hexagonal arrangement." Intervention: for simple cubic, r = a/2 (atom touches neighbours along cell edge); 1 atom per unit cell; packing efficiency = (4/3)πr³ / a³ = π/6 ≈ 52.4%. For CCP/FCC: 4 atoms per unit cell (FCC), 4r = a√2, packing ≈ 74%. The close-packed arrangement is far more efficient — the apparent "neatness" of simple cubic is visual, not quantitative.

## Analogies
**Valid**: the hole-filling analogy as a hotel with differently sized rooms. The CCP anion sublattice is a hotel with two sizes of rooms: larger "octahedral suites" (6 neighbours, 1 per anion) and smaller "tetrahedral studios" (4 neighbours, 2 per anion). The crystal structure is determined by which rooms you fill with cations: rent all suites (NaCl), rent half the studios (ZnS), rent all studios (CaF₂). The number of occupied rooms divided by the number of anions gives the cation:anion ratio.

## Demonstrations
**3D model/animation of CCP vs. HCP**: physical ball-and-stick models (or projection of a 3D animation) showing ABCABC vs. ABABAB stacking, zooming out to reveal the FCC unit cell from the (111) direction. The visual transformation from layer stacking to cubic symmetry is the most difficult conceptual step and most students need to SEE it, not just read it.

**Unit cell atom counting**: build an FCC unit cell from physical spheres and count atoms: 8 corners × 1/8 = 1; 6 faces × 1/2 = 3; total = 4. Confirm the packing efficiency calculation.

## Discovery Questions
1. "The compound MX₂ (cation M²⁺, anion X²⁻) crystallises with X²⁻ in CCP arrangement. If M²⁺ occupies ALL octahedral holes, derive the formula of the compound, the coordination numbers of M²⁺ and X²⁻, and name the structure type."
2. "Using the radius ratio rule, predict whether Zn²⁺ (r = 74 pm) would be expected to prefer tetrahedral or octahedral coordination in a sulphide lattice with S²⁻ (r = 184 pm), and identify the likely crystal structure."

## Teaching Sequence
1. Close-packed single layer: hexagonal arrangement, 6 nearest neighbours.
2. Second layer: where the B layer sits (hollows of A).
3. Third layer choice: A (→HCP, ABABAB) or C (→CCP/FCC, ABCABC). Both give CN=12 and 74% packing.
4. Holes: define tetrahedral (4 neighbours) and octahedral (6 neighbours). Count: 2 tet. holes and 1 oct. hole per CCP atom.
5. NaCl = all octahedral holes filled (1 Na⁺ per Cl⁻ → NaCl, 6:6 CN).
6. ZnS = half tetrahedral holes filled (1 Zn²⁺ per 2 holes per S²⁻ → but only half taken → ZnS, 4:4 CN).
7. CaF₂ = all tetrahedral holes filled (2 F⁻ per Ca²⁺ → CaF₂, Ca 8-coordinate, F 4-coordinate).
8. Packing efficiency calculations (FCC: 4 atoms, 74%).
9. Derivation of ionic radii from XRD cell parameters.

## Tutor Actions
- **If student confuses HCP and CCP packing efficiency or CN**: state explicitly "both are 74% and CN=12; the ONLY difference is ABAB vs. ABCABC stacking sequence." Draw a 2×2 comparison table (efficiency / CN / stacking / symmetry) and fill it together.
- **If student cannot predict the formula from hole-filling**: count holes per anion aloud together — "in CCP, 1 anion provides 2 tetrahedral holes and 1 octahedral hole. If I fill all octahedral holes, how many cations do I get per anion?" (1) → stoichiometry: 1:1 → NaCl. Work through all three cases with the student counting rather than memorising.
- **FRAGILE sign**: memorises "NaCl fills octahedral holes" but cannot derive the stoichiometry or coordination numbers from the hole-filling argument.

## Voice Teaching Notes
The conceptual leap from close-packed layers to the FCC unit cell is the hardest visual step — students who have not seen it in 3D often cannot follow the ABCABC→FCC argument from text alone. In voice teaching, describe the layer stacking with careful spatial language ("the third layer is placed over the GAPS that are NOT above the A atoms — a new position — called C"), and explicitly tell students that if they cannot visualise this, a 3D model is required before continuing.

## Assessment Signals
- **Green**: describes ABAB (HCP) and ABCABC (CCP/FCC) stacking; states 2 tet. holes and 1 oct. hole per CCP atom; derives formula and CN for NaCl (all oct.), ZnS (half tet.), CaF₂ (all tet.); calculates packing efficiency for FCC.
- **Amber**: correct structures for NaCl/ZnS/CaF₂ from memory but cannot derive them from first principles (hole-filling argument); or confuses tet. and oct. hole counts.
- **Red**: believes HCP is less efficient than CCP; cannot count atoms in a FCC unit cell; says fluorite fills octahedral holes.
- **Probe**: "An ionic compound AB₂ has A in CCP. If B fills all tetrahedral holes, write the formula, state coordination numbers of A and B, and name the structure type."

## Tutor Recovery Strategy
If student cannot locate holes: start with a 2D analogy — close-packed circles in one layer; put a small circle in the gap where 3 circles meet (= 2D analogue of tetrahedral hole). Show that every three-sphere triangle creates one such gap. Then extend to 3D: two such triangles pointing up and down create an octahedron. This builds the concept without requiring 3D visualisation skills upfront.

## Memory Hooks
- **Stacking sequences**: "HCP = ABABAB (two-layer repeat). CCP = ABCABC (three-layer repeat) = FCC."
- **Hole counts (per CCP atom)**: "2 Tetrahedral, 1 Octahedral. (2TO rule)"
- **Structure from holes**: "NaCl: ALL OCT (CN 6:6). ZnS: HALF TET (CN 4:4). CaF₂: ALL TET (CN 8 for Ca, 4 for F)."
- **Packing efficiency**: "CCP = HCP = 74%. Both maximum. Simple cubic = 52%. BCC = 68%."

## Transfer Connections
- **chem.solid.ionic-solids**: this node provides the structural foundation (hole-filling in CCP) that chem.solid.ionic-solids uses to explain lattice energies, Born-Landé equation, and the Madelung constant for each structure type.

## Cross-Subject Connections
- **Materials science**: CCP metals (Cu, Al, Au) are the most ductile and formable metals — the ABCABC stacking allows dislocation motion across multiple equivalent slip planes simultaneously. HCP metals (Ti, Zn) have fewer slip systems → less ductile → more difficult to deform. The packing structure directly determines forming behaviour in manufacturing.
- **Mineralogy**: the fluorite structure (CaF₂) is the structural prototype for many important minerals and functional materials: UO₂ (nuclear fuel), CeO₂ (catalytic converter oxygen storage), and the anti-fluorite Na₂O — all derived from the same hole-filling motif.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.solid.packing`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.solid.packing` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
