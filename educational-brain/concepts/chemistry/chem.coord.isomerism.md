# Isomerism in Complexes — `chem.coord.isomerism`

## Identity
- **KG ID**: chem.coord.isomerism
- **Subject**: chemistry
- **Domain**: chem.coord
- **Difficulty**: proficient
- **Bloom level**: analyze
- **Estimated hours**: 4
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.coord.nomenclature
- **Unlocks**: (none — terminal node)

## Learning Objective
Classify and distinguish the four types of structural (constitutional) isomerism in complexes (ionization, hydrate, linkage, coordination isomers); assign geometric cis/trans isomers and facial/meridional isomers in octahedral complexes; and identify optical isomers (Δ/Λ) in tris-chelate and cis-bis-chelate complexes.

## Core Understanding
**Structural (constitutional) isomers — same molecular formula, different connectivity**:

**1. Ionization isomers**: differ in which ion is inside the coordination sphere vs. outside as the counter-ion.
- Example: [CoBr(NH₃)₅]SO₄ vs. [Co(SO₄)(NH₃)₅]Br. Add AgNO₃: the first gives an immediate yellow AgBr precipitate (Br⁻ outside sphere = free); the second gives a white BaSO₄ precipitate with BaCl₂ (SO₄²⁻ outside sphere). AgNO₃ test thus distinguishes ionization isomers operationally.

**2. Hydrate (solvate) isomers**: differ in how many water molecules are inside vs. outside the coordination sphere.
- Classic example: [CrCl₂(H₂O)₄]Cl·2H₂O (violet, two Cl⁻ free, four H₂O coordinated), [CrCl(H₂O)₅]Cl₂·H₂O (pale green, one Cl⁻ free), [Cr(H₂O)₆]Cl₃ (grey-green, all Cl⁻ free). Adding AgNO₃: precipitates 1, 2, 3 mol of AgCl respectively for equal amounts — the coordination-sphere water does not change the Ag⁺ test.

**3. Linkage isomers**: arise from ambidentate ligands — ligands that can coordinate through either of two donor atoms.
- NO₂⁻ (nitrite): binds through N (nitro, N-bonded, –NO₂) or through O (nitrito, O-bonded, –ONO). Example: [Co(NO₂)(NH₃)₅]²⁺ (nitro, N-bonded, yellow) vs. [Co(ONO)(NH₃)₅]²⁺ (nitrito, O-bonded, red). Nitrito is less stable (kinetic product in some cases) and converts thermally to the nitro form.
- SCN⁻ (thiocyanate): binds through S (thiocyanato, harder metals like Hg) or through N (isothiocyanato, softer metals like Co, Fe). HSAB principle: S-donor favours soft metals; N-donor favours harder metals.

**4. Coordination isomers**: in a salt where BOTH cation and anion are complex ions — ligands can be redistributed between the two metal centres.
- Example: [Co(NH₃)₆][Cr(CN)₆] vs. [Cr(NH₃)₆][Co(CN)₆] — same formula, different metal–ligand assignment.

**Geometric (cis/trans) isomerism**:
- **Square planar MA₂B₂**: cis (two B groups on the same side) vs. trans (B groups on opposite sides). Example: cis- and trans-[PtCl₂(NH₃)₂] — cisplatin (anticancer) vs. transplatin (inactive).
- **Octahedral MA₂B₄ or MA₄B₂**: only one isomer each (all equivalent positions). MA₃B₃: fac (facial — 3 identical ligands occupy a triangular face, like the three apices of a face of the octahedron) vs. mer (meridional — 3 identical ligands in a row around the equatorial plane, forming a T-shape in one projection).
  - Example: fac-[CoCl₃(NH₃)₃] vs. mer-[CoCl₃(NH₃)₃].
- **Octahedral MA₂B₂C₂**: up to 5 geometric isomers (cis,cis,trans etc.) — enumeration requires systematic analysis.

**Optical isomerism (Δ/Λ)**:
- **Tris-chelate complexes [M(A–A)₃]**: the three bidentate ligands wrap around the metal in a propeller arrangement. The right-handed propeller (metal + chelates like a right-hand screw) = Λ (lambda); left-handed = Δ (delta). These are non-superimposable mirror images → enantiomers → optically active. Example: [Co(en)₃]³⁺ — exists as Λ and Δ enantiomers; [Co(ox)₃]³⁻ similarly.
- **cis-[MA₂(A–A)₂]**: cis geometry with two identical chelate ligands also gives rise to Δ/Λ optical isomers.
- **trans-[M(A–A)₂X₂]**: no optical isomers — the trans arrangement has a mirror plane.
- **Note**: simple monodentate ligands with no chirality at the ligand itself cannot generate optical isomers in square planar complexes.

**Distinguishing isomers experimentally**:
- Ionization: AgNO₃ test (free halide vs. coordinated halide).
- Hydrate: CaCl₂ dehydration or mole of water lost at 110°C.
- Linkage: IR spectroscopy (M–N–O stretch ≠ M–O–N stretch); colour.
- Geometric: UV-vis spectrum (different Δ), dipole moment, X-ray crystallography.
- Optical: polarimetry (rotate plane-polarised light); CD (circular dichroism) spectroscopy.

## Mental Models
**Coordination sphere as an inner box**: the coordination sphere is a sealed compartment. Ligands and ions inside it stay put (don't ionize freely, don't escape). Ligands and ions outside it are free in solution. Structural isomers differ in what's inside vs. outside the box, or in which donor atom of an ambidentate ligand is used.

**Geometric isomers as seating arrangements**: in a square planar MA₂B₂ complex, imagine 4 seats around a square table — cis has the B guests seated next to each other; trans has them seated across from each other. You cannot interconvert them without remaking the bonds (they are NOT conformational isomers).

## Why Students Fail
Students confuse ionization isomers with hydrate isomers (different mechanism for each). They say "fac and mer are the same complex seen from different angles" — they are not (they have different symmetry and different properties). They miss optical isomers in tris-chelate complexes because they don't visualise the propeller handedness.

## Misconceptions
- **MC-1 (Type 3 — language contamination)**: "Geometric isomers are the same as conformational isomers — they just have different shapes." Probe: "Can you interconvert cis-[PtCl₂(NH₃)₂] and trans-[PtCl₂(NH₃)₂] by rotating bonds at room temperature?" Characteristic phrase: "they're both square planar — just different conformations." Intervention: geometric isomers are STRUCTURAL isomers in coordination chemistry — they have DIFFERENT CONNECTIVITY (which positions are occupied by which ligands). Interconversion requires BREAKING and REFORMING metal–ligand bonds (high activation energy). Conformational isomers (in organic chemistry) interconvert freely by bond rotation. Geometric isomers of complexes are isolable, distinct compounds with different physical and chemical properties (cisplatin vs. transplatin). They are NOT the same compound in different conformations.
- **MC-2 (Type 5 — instruction-induced)**: "Linkage isomers exist because the ligand switches which end is bonded during the reaction — they are at equilibrium and cannot be isolated." Probe: "What is the kinetic product of forming [Co(ONO)(NH₃)₅]²⁺ vs. the thermodynamic product, and can each be isolated?" Characteristic phrase: "they just interconvert continuously." Intervention: linkage isomers CAN be isolated as distinct compounds — they require breaking a coordinate bond and re-forming it through a different donor atom (activation energy ≈ the bond dissociation enthalpy of the coordinate bond). At room temperature they are STABLE; they interconvert only at elevated temperature or under UV irradiation. The nitrito isomer [Co(ONO)(NH₃)₅]²⁺ converts to the nitro isomer [Co(NO₂)(NH₃)₅]²⁺ on warming — a LINKAGE ISOMERIZATION, not a continuous equilibrium at room temperature.
- **MC-3 (Type 2 — perceptual intuition)**: "A complex with a mirror plane cannot be chiral — so [Co(en)₂Cl₂]⁺ cannot have optical isomers." Probe: "Which geometric isomers of [Co(en)₂Cl₂]⁺ exist? Does each of them have a mirror plane?" Characteristic phrase: "it's symmetric, so no optical isomers." Intervention: [Co(en)₂Cl₂]⁺ has TWO geometric isomers — cis and trans. The TRANS isomer has a mirror plane (C₂ and σ through the Cl–Co–Cl axis) → NOT chiral. The CIS isomer has NO internal mirror plane → IS chiral → exists as Δ and Λ enantiomers. The key check is NOT whether the overall formula is symmetric, but whether the SPECIFIC geometric isomer has an internal symmetry element.

## Analogies
**Valid**: linkage isomers are like a chameleon ligand — it has two possible "contact surfaces" (two donor atoms). When it attaches to the metal, it can present either face. The two resulting complexes are like two different handshakes: a ligand extending its right hand (N-donor) vs. its left hand (O-donor) — different contacts, different properties, isolable compounds.

## Demonstrations
**AgNO₃ test for ionization isomers**: dissolve equal amounts of [CoBr(NH₃)₅]SO₄ and [Co(SO₄)(NH₃)₅]Br in water; add AgNO₃ solution. Only [Co(SO₄)(NH₃)₅]Br gives an immediate yellow precipitate (AgBr) — the Br⁻ is outside the sphere. The other gives no yellow precipitate (Br⁻ is coordinated and not free to precipitate). Students see the operationally distinguishing test in action.

**fac vs. mer models**: build molecular models of fac- and mer-[CoCl₃(NH₃)₃]. Have students try to rotate one into the other — impossible. Then compare IR and UV-vis spectra (fac has C₃ᵥ symmetry; mer has C₂ᵥ symmetry → different selection rules → different spectral features).

## Discovery Questions
1. "How many geometric isomers are possible for [PtBrClI(NH₃)] (square planar, 4 different groups)? Draw all of them. How many are optically active? Give the test you would use to distinguish them experimentally."
2. "[Co(en)₃]³⁺ is optically active. (a) Explain why a tris-chelate complex is chiral. (b) Draw and label the Δ and Λ enantiomers. (c) How would you prepare the pure Λ enantiomer from the racemic mixture?"

## Teaching Sequence
1. Structural isomers: introduce the concept of coordination sphere as the boundary. Ionization isomers (inside/outside halide); hydrate isomers (inside/outside water); identify by AgNO₃ and CaCl₂ tests.
2. Linkage isomers: ambidentate ligands (NO₂⁻, SCN⁻); two contact modes; isolable compounds; HSAB principle for SCN⁻ binding preference.
3. Coordination isomers: only in salts where both cation and anion are complexes; redistributed ligands.
4. Geometric isomers: square planar MA₂B₂ (cis/trans) and MA₂BC; octahedral MA₃B₃ (fac/mer); how fac ≠ mer by symmetry analysis.
5. Optical isomers: Δ/Λ convention; tris-chelate and cis-bis-chelate; trans-bis-chelate has mirror plane → achiral. Detection by polarimetry.

## Tutor Actions
- **If student confuses geometric with conformational isomers**: ask "Can you interconvert cis- and trans-[PtCl₂(NH₃)₂] without breaking a Pt–Cl or Pt–N bond?" (No.) "That means they are structurally different — not different conformations. Conformational isomers interconvert by rotation, no bond breaking needed."
- **If student misses optical isomers in cis-bis-chelate**: physically draw the Δ and Λ propellers on paper. "Look for an internal mirror plane in cis-[Co(en)₂Cl₂]⁺. Can you find one?" (No.) "So it is chiral."
- **FRAGILE sign**: can list the 4 types of structural isomers and name geometric isomers correctly but cannot DRAW the fac vs. mer structures or identify whether a given complex is optically active.

## Voice Teaching Notes
In voice, the most testable distinction is fac vs. mer in MA₃B₃ complexes. In voice: "I want you to imagine an octahedron. Place three identical ligands X on positions that form a triangular face — that is fac. Now place them in a row through the equatorial plane — that is mer. The key point: they are different compounds. Can you tell me which has a C₃ rotation axis?" (fac.) "And which looks like a T in one projection?" (mer.) Anchoring to symmetry elements makes fac/mer reliably distinguishable.

## Assessment Signals
- **Green**: correctly identifies all 4 structural isomer types with examples; draws cis/trans for square planar and fac/mer for octahedral MA₃B₃; identifies which geometric isomers of a given complex are optically active (using mirror plane test); describes Δ/Λ for tris-chelate; identifies AgNO₃ and IR tests for structural isomers.
- **Amber**: knows isomer names and one example each but cannot draw fac vs. mer or correctly apply the mirror-plane test for optical activity.
- **Red**: says geometric isomers interconvert freely at room temperature; says linkage isomers are always at rapid equilibrium and cannot be isolated; misidentifies trans-bis-chelate as optically active.
- **Probe**: "For [Co(NH₃)₄Cl₂]⁺: (a) draw all geometric isomers; (b) identify whether each is optically active; (c) state whether it exhibits any structural isomers, and if so, of what type."

## Tutor Recovery Strategy
If student cannot identify fac vs. mer: use an octahedral diagram with numbered vertices (1=top, 2=bottom, 3=front, 4=back, 5=left, 6=right). "Fac: place three X ligands at positions 1, 3, 5 (a triangular face). Mer: place three X ligands at positions 1, 2, 3 (a straight line through the centre — a meridian). Now rotate the fac structure — can you ever get the mer? No. They are genuinely different shapes." This numbered-vertex approach makes the symmetry difference concrete.

## Memory Hooks
- **4 structural isomer types**: "Ionization (in/out halide), Hydrate (in/out water), Linkage (which donor atom), Coordination (swap ligands between two complexes)."
- **Geometric in octahedral MA₃B₃**: "FAC = FACE (triangle on face of octahedron). MER = MERIDIAN (row through equator)."
- **Optical activity check**: "Find a mirror plane in the geometric isomer. Mirror plane present → achiral (no optical isomers). Mirror plane absent → chiral → Δ and Λ enantiomers."
- **Δ/Λ**: "Right-hand propeller = Λ (like λ rotating right). Left-hand = Δ."

## Transfer Connections
No further chemistry concepts unlock from this terminal node. It is a synthesis endpoint for coordination isomerism.

## Cross-Subject Connections
- **Pharmacology (cisplatin)**: the cis/trans geometric isomerism of [PtCl₂(NH₃)₂] is the most famous example in medicinal chemistry — cisplatin is a blockbuster anticancer drug; transplatin is clinically inactive. The structural distinction has enormous biological consequences.
- **Stereochemistry (organic)**: the concepts of R/S and E/Z in organic isomerism are directly analogous to the Δ/Λ notation in coordination isomerism — both describe non-superimposable mirror-image spatial arrangements. Cross-reference with chem.org.isomerism.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.coord.isomerism`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.coord.isomerism` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
