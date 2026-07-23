# Crystal Systems and Unit Cells — `chem.solid.crystal-systems`

## Identity
- **KG ID**: chem.solid.crystal-systems
- **Subject**: chemistry
- **Domain**: chem.solid
- **Difficulty**: proficient
- **Bloom level**: understand
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.bond.metallic-bonding, chem.bond.ionic-bonding
- **Unlocks**: chem.solid.amorphous, chem.solid.defects, chem.solid.packing

## Learning Objective
Describe the three cubic unit cells (simple cubic, BCC, FCC/CCP), calculate packing efficiency and atoms per unit cell for each, identify the coordination numbers, and explain the structures of ionic crystals (NaCl, CsCl, ZnS zinc blende, CaF₂ fluorite) in terms of radius ratio and coordination requirements.

## Core Understanding
A **crystal** is a periodic, long-range ordered arrangement of atoms/ions/molecules. The **unit cell** is the smallest repeating structural unit that, when stacked in three dimensions, generates the entire crystal. All macroscopic crystal properties derive from the unit cell.

**Three cubic unit cell types** (for identical spheres — metal crystals):

| Type | Atoms per cell | Coord. number | Packing efficiency | Close-packed? |
|------|---------------|---------------|-------------------|---------------|
| Simple cubic (SC) | 1 (8 × ⅛) | 6 | 52% | No |
| Body-centred cubic (BCC) | 2 (8 × ⅛ + 1) | 8 | 68% | No |
| Face-centred cubic (FCC) / cubic close-packing (CCP) | 4 (8 × ⅛ + 6 × ½) | 12 | 74% | Yes — maximum possible |

- SC: one atom at each corner; atoms TOUCH along cube edge; a = 2r. Only Po adopts SC.
- BCC: atoms at each corner + one atom at body centre; atoms TOUCH along body diagonal (√3a = 4r). Metals: Fe (α), W, Cr, Mo, Na, K.
- FCC/CCP: atoms at each corner + one atom at centre of each face; atoms TOUCH along face diagonal (√2a = 4r). Metals: Cu, Ag, Au, Al, Ni, Pb, Fe (γ).

**Hexagonal close-packing (HCP)**: same 74% packing and CN=12 as FCC but different layer stacking (ABABAB... vs ABCABC...). Not a cubic system — not always assessed at same depth.

**Calculation of packing efficiency**:
Packing efficiency = (volume of atoms per cell) / (volume of unit cell) × 100%.
- For BCC: 2 × (4/3)π r³ / a³; substitute a = 4r/√3 → 68%.
- Students should know the result, not re-derive; examinations ask for packing efficiency or coordination number, not derivations.

**Ionic crystal structures** (two-component systems — cation and anion of different sizes):

**Rock salt (NaCl)** — prototype: many 1:1 binary ionic compounds.
- Na⁺ : Cl⁻ = 1:1 ratio.
- Cl⁻ in FCC arrangement; Na⁺ in all octahedral holes (each Na⁺ surrounded by 6 Cl⁻; each Cl⁻ surrounded by 6 Na⁺).
- Coordination: **6:6**.
- Unit cell contents: 4 NaCl formula units (4 Na⁺ + 4 Cl⁻).
- Examples: NaCl, KCl, MgO, CaO (important — MgO and CaO are isostructural with NaCl despite different charges because the radius ratio falls in the same range).

**Caesium chloride (CsCl)** — NOT BCC of one atom type; two different atoms.
- Cl⁻ at cube corners; Cs⁺ at body centre (or vice versa).
- Coordination: **8:8** (Cs⁺ surrounded by 8 Cl⁻ and vice versa).
- Larger cation (Cs⁺ radius ratio r⁺/r⁻ = 0.732–1.000 range) favours higher coordination.
- Unit cell: 1 formula unit of CsCl.
- Examples: CsCl, CsBr, CsI; TlCl, TlBr.

**Zinc blende (ZnS)** — 1:1 ratio with small cation.
- S²⁻ in FCC arrangement; Zn²⁺ in HALF (alternate) tetrahedral holes.
- Coordination: **4:4** (each Zn²⁺ surrounded by 4 S²⁻ and each S²⁻ by 4 Zn²⁺).
- Small radius ratio (r⁺/r⁻ = 0.225–0.414) favours tetrahedral (4-coordinate) geometry.
- Unit cell: 4 ZnS formula units.
- Examples: ZnS, CuCl, AgI, GaAs (semiconductor), diamond (all C in zinc blende arrangement).

**Fluorite (CaF₂)** — 1:2 ratio (more anions than cations).
- Ca²⁺ in FCC arrangement; F⁻ in ALL tetrahedral holes (every tetrahedral hole occupied).
- Coordination: **8:4** (each Ca²⁺ surrounded by 8 F⁻; each F⁻ surrounded by 4 Ca²⁺).
- Unit cell: 4 formula units (4 Ca²⁺ + 8 F⁻).
- Anti-fluorite structure (Li₂O, Na₂O): cation and anion roles reversed → O²⁻ in FCC, Li⁺ in tetrahedral holes; coordination 4:8.
- Examples: CaF₂, SrF₂, BaF₂, ThO₂; UO₂ (nuclear fuel); ZrO₂.

**Radius ratio rules** (predict which structure type):
- r⁺/r⁻ 0.155–0.225: trigonal planar (3-coordinate), rare.
- r⁺/r⁻ 0.225–0.414: tetrahedral → zinc blende (4:4).
- r⁺/r⁻ 0.414–0.732: octahedral → rock salt (6:6).
- r⁺/r⁻ 0.732–1.000: cubic → CsCl (8:8).
Rules are approximate (polarisation effects often override the purely geometric prediction), but useful for examination-level prediction.

## Mental Models
**The sphere-packing hierarchy**: imagine filling a box with oranges. Placing them in a simple square grid (SC) leaves the most gaps; offsetting every other row slightly (BCC) does better; nesting each layer into the hollows of the previous one (FCC/CCP) achieves the densest possible packing (74%). The choice of arrangement is the unit cell; the packing efficiency tells you how much of the box is orange.

**The hole-filling model for ionic crystals**: start with the larger ion (usually the anion) packing in an FCC arrangement. The smaller ion (cation) slots into the holes. The type of hole (tetrahedral vs octahedral) and the fraction filled determine the structure and stoichiometry. NaCl fills ALL octahedral holes (6:6); ZnS fills HALF the tetrahedral holes (4:4); CaF₂ fills ALL tetrahedral holes in the FCC Ca²⁺ arrangement but must use twice as many F⁻ as Ca²⁺ to do so (8:4).

## Why Students Fail
Students confuse the CsCl structure with BCC — CsCl has one Cs⁺ at the body centre and Cl⁻ at corners (or vice versa), which is topologically like BCC but is NOT the same because the two sites are different atom types. BCC has identical atoms at all sites.

Students confuse coordination number (of the cation in the ionic structure) with the atoms-per-unit-cell count — these are completely different quantities.

## Misconceptions
- **MC-1 (Type 6 — analogy overextension)**: "CsCl has a BCC structure because there's an atom at the body centre." Probe: "Is the atom at the body centre of CsCl the same type as the corner atoms?" Characteristic phrase: "CsCl is like iron — BCC." Intervention: BCC means ALL atoms are IDENTICAL (one atomic species at corners and body centre). CsCl has Cs⁺ at body centre and Cl⁻ at corners — two DIFFERENT species — this is the CsCl structure type, NOT BCC. The topological position looks the same but the physics is fundamentally different (lattice energy, electrostatics, physical properties all differ).
- **MC-2 (Type 4 — notation-induced)**: "4 atoms per FCC unit cell means 4 individual atoms can be seen in the corner+face drawing." Probe: "How many atoms does the FCC unit cell picture show at corners and faces? What is the contribution of each?" Characteristic phrase: "I count 14 atoms in the diagram." Intervention: atoms are SHARED between unit cells. Corner atom: shared by 8 unit cells → contributes ⅛. Face atom: shared by 2 unit cells → contributes ½. Calculation: 8 corners × ⅛ + 6 faces × ½ = 1 + 3 = 4 atoms. This is not the number of atoms you see in the picture; it is the number that belong to one unit cell after sharing.
- **MC-3 (Type 1 — overgeneralization)**: "NaCl coordination 6:6 means every sodium is bonded to 6 chlorides because it forms 6 bonds." Probe: "Is the Na–Cl interaction in NaCl a covalent bond?" Characteristic phrase: "6 bonds means 6 covalent bonds." Intervention: in ionic crystals there are no discrete covalent bonds — each Na⁺ is surrounded by 6 nearest-neighbour Cl⁻ through electrostatic (ionic) attraction, not covalent bond pairs. The coordination number describes the nearest-neighbour count, not bond order or type.

## Analogies
**Valid**: the unit cell as a LEGO base plate — the plate itself is the repeating unit; stack millions of identical plates in three dimensions and you get the full crystal. The pattern on the plate (atom positions) determines every property of the bulk material. Just as a single LEGO plate tile tells you the whole floor plan if you know how the tiles connect, a single unit cell + the space group tells you the whole crystal structure.

## Demonstrations
**Unit cell model kits** (or 3D-printed models): physical models of SC, BCC, FCC, NaCl, and CsCl unit cells; students count atoms at corners/faces/body centres and apply the ⅛/½/1 fractions directly. No other teaching method makes the shared-atom concept as concrete as holding a physical model and seeing how corner spheres sit at the meeting point of 8 cubes.

**NaCl crystal cleavage**: NaCl crystals cleave along {100} planes (right angles) because these planes have equal numbers of + and − charges, minimising surface energy. The cleavage demonstrates the underlying cubic structure and the electrostatic nature of ionic bonding simultaneously.

## Discovery Questions
1. "A metal crystallises in an FCC structure with a unit cell edge length a = 408 pm. Calculate: (a) the radius of one metal atom; (b) the density of the metal given its molar mass is 108 g/mol. (Avogadro's number = 6.022 × 10²³ mol⁻¹.)"
2. "The radius ratio r⁺/r⁻ for CsI is approximately 0.75. Predict whether CsI adopts the NaCl (6:6), zinc blende (4:4), or CsCl (8:8) structure type. Explain your reasoning using the radius ratio rules."

## Teaching Sequence
1. Define crystal vs. amorphous; define unit cell.
2. Three cubic unit cells: draw each; count atoms (with fractions); state CN and packing efficiency.
3. FCC close-packing: face diagonal = 4r; derive a = 2√2 r; connect to packing efficiency (74%).
4. Ionic crystal structures: NaCl (hole-filling in anion FCC); then ZnS, CsCl, CaF₂ — each introduced as a different hole-filling scenario.
5. Radius ratio rules: introduce as predictive tool with caveat that polarisation can override.
6. Calculation practice: atoms per cell, density, radius from a.

## Tutor Actions
- **If student confuses CsCl with BCC**: draw them side by side; label the atom type at each site; ask "in BCC iron, are the corner atoms and body centre atom the same element?" (yes); "in CsCl?" (no — Cs and Cl are different); the difference is in the identity of the atoms, not their positions.
- **If student miscounts atoms per cell**: slow down to the individual contribution rule; pick one atom in the diagram, ask "how many unit cells share this corner atom?" (8); "so this corner contributes how much?" (⅛). Do this for one corner, one face, one body centre atom, then sum.
- **FRAGILE sign**: can state that NaCl is 6:6 but cannot explain what that means structurally (which ion is in which hole, or that it means octahedral coordination of each ion by the other).

## Voice Teaching Notes
The atoms-per-unit-cell calculation is the single most reliably examined calculation in this topic — drill the fraction rule (⅛ corner, ½ face, 1 body) as a reflex before connecting to structure. Students who lose marks almost always do so because they counted 14 or 8 instead of 4 for FCC.

The ionic structure comparison (NaCl vs. CsCl vs. ZnS vs. CaF₂) is best taught as four variations of one principle (hole-filling) rather than as four separate memorisation tasks. The principle is: anions form FCC; cations fill holes; stoichiometry determines which holes and how many.

## Assessment Signals
- **Green**: correctly calculates atoms per unit cell for SC, BCC, FCC; states CN for each; identifies NaCl, CsCl, ZnS, CaF₂ coordination numbers; can use radius ratio to predict structure type.
- **Amber**: correct packing efficiency and CN but incorrectly applies fractions (counts corner atoms as 1 instead of ⅛).
- **Red**: confuses CsCl with BCC; cannot apply the shared-atom fraction; cannot state what coordination number means in ionic crystals.
- **Probe**: "An ionic compound MX has r⁺/r⁻ = 0.50. Predict its structure type and coordination number. Draw the arrangement of ions in the unit cell and count the formula units per cell."

## Tutor Recovery Strategy
If student cannot do the atoms-per-unit-cell calculation: use a 2D analogy first — a square tile where each corner is shared by 4 tiles (contribution ¼ in 2D); now extend to 3D where each corner is shared by 8 cubes (contribution ⅛). Use this one-step analogy and practise with SC (only corners) until the fraction is automatic before introducing BCC and FCC.

## Memory Hooks
- **Atoms per cell**: "SC=1, BCC=2, FCC=4. For FCC: 8×⅛ + 6×½ = 1+3 = 4."
- **Packing efficiency**: "SC 52%, BCC 68%, FCC/CCP 74% (densest possible for equal spheres)."
- **Ionic structures coordination**: "NaCl = 6:6 (octahedral holes). CsCl = 8:8 (cubic holes). ZnS = 4:4 (half tetrahedral holes). CaF₂ = 8:4 (all tetrahedral holes, Ca:F = 1:2 ratio)."
- **Radius ratio quick guide**: "Small cation (0.225–0.414) → tetrahedral (4). Medium (0.414–0.732) → octahedral (6). Large (>0.732) → cubic (8)."

## Transfer Connections
- **chem.solid.packing**: this node introduces the concept of close-packing and packing efficiency; chem.solid.packing extends to HCP and the relationship between ABCABC and ABABAB stacking sequences.
- **chem.solid.defects**: point defects (Schottky, Frenkel) are defined relative to the ideal crystal structures described here; understanding the ideal structure is a prerequisite for understanding deviations from it.

## Cross-Subject Connections
- **Physics**: band theory of solids (conductors/semiconductors/insulators) depends on the crystal structure — the FCC structure of metals like Cu gives a nearly-spherical Brillouin zone, explaining isotropic conductivity; the zinc blende structure of GaAs (direct band gap) vs. Si (indirect band gap) determines their different uses in LEDs vs. conventional transistors.
- **Materials science**: the FCC→BCC phase transition of iron at 912°C (and its reverse at 1394°C) is the metallurgical basis of steel heat treatment — austenite (FCC γ-Fe, interstitial C fits in octahedral holes) vs. ferrite (BCC α-Fe, smaller interstitial holes hold less C) determines the carbon content and properties of different steel grades.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.solid.crystal-systems`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.solid.crystal-systems` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
