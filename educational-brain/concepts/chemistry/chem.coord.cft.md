# Crystal Field Theory — `chem.coord.cft`

## Identity
- **KG ID**: chem.coord.cft
- **Subject**: chemistry
- **Domain**: chem.coord
- **Difficulty**: proficient
- **Bloom level**: analyze
- **Estimated hours**: 4
- **Mastery threshold**: 0.80
- **Prerequisites**: chem.coord.werner, chem.atomic.orbitals
- **Unlocks**: (none — terminal node)

## Learning Objective
Apply crystal field theory to predict d-orbital splitting in octahedral and tetrahedral fields; determine electron configurations and spin states for octahedral d^n complexes given a strong or weak field ligand; calculate crystal field stabilisation energies; explain the origin of colour in transition metal complexes; and identify the Jahn-Teller effect.

## Core Understanding
**Crystal Field Theory (CFT) premise**: treats the interaction between a central metal ion and its ligands as PURELY ELECTROSTATIC — ligands are modelled as point negative charges. The key insight is that ligand charge clouds DIFFERENTIALLY destabilise the five d orbitals depending on their orientations relative to the ligands.

**Octahedral field (O_h)**:
- An octahedral arrangement of six ligands points along the ±x, ±y, ±z axes.
- d orbitals with lobes ALONG the axes (d_z², d_x²−y²) point directly toward the ligands → suffer GREATER electrostatic repulsion → raised energy. These form the **e_g** set.
- d orbitals with lobes BETWEEN the axes (d_xy, d_xz, d_yz) point between the ligands → less repulsion → lower energy. These form the **t₂g** set.
- The energy gap between t₂g and e_g is **Δ_oct** (also written 10Dq). The t₂g set is stabilised by −(4/10)Δ_oct per electron; the e_g set is destabilised by +(6/10)Δ_oct per electron (the barycentre rule: the total energy in the d manifold is conserved — 3 × (−4/10) + 2 × (6/10) = 0).

**High spin vs. low spin (octahedral)**:
- When placing electrons in the split d manifold, there is a competition: PAIRING ENERGY (P, energy cost of forcing two electrons into the same orbital — coulombic repulsion + exchange energy loss) vs. Δ_oct (energy cost of promoting an electron to e_g instead of pairing in t₂g).
- WEAK FIELD ligands: small Δ_oct. If Δ_oct < P, electrons avoid pairing → fill e_g before pairing in t₂g → HIGH SPIN configuration (maximum unpaired electrons, follows Hund's rule across the whole d manifold, as if no splitting occurred). Examples: F⁻, Cl⁻, Br⁻, I⁻, H₂O.
- STRONG FIELD ligands: large Δ_oct. If Δ_oct > P, electrons pair in t₂g before entering e_g → LOW SPIN configuration (minimum unpaired electrons). Examples: CN⁻, CO, NO⁺, en (ethylenediamine), NH₃, pyridine, NO₂⁻, PPh₃.
- The **spectrochemical series** ranks ligands from weak to strong field: I⁻ < Br⁻ < S²⁻ < SCN⁻ < Cl⁻ < NO₃⁻ < F⁻ < OH⁻ < ox < H₂O < NCS⁻ < CH₃CN < py < NH₃ < en < bipy < NO₂⁻ < PPh₃ < CN⁻ ≈ CO. (Mnemonic: learn water's position — ligands to its left are WEAK, to its right are STRONG relative to water.)
- High spin vs. low spin ONLY applies for d⁴–d⁷ in octahedral: d⁰–d³ and d⁸–d¹⁰ have only ONE possible filling regardless of field strength.

**Crystal Field Stabilisation Energy (CFSE)**:
- CFSE = sum of energy changes relative to barycentre = n(t₂g) × (−4/10)Δ_oct + n(e_g) × (6/10)Δ_oct.
- CFSE is always negative (stabilising) in octahedral except d⁰ and d¹⁰ (CFSE = 0 by symmetry).
- Example: [Fe(CN)₆]⁴⁻, Fe²⁺ (d⁶), low spin → t₂g⁶ e_g⁰; CFSE = 6 × (−4/10)Δ_oct = −12/5 Δ_oct (= −2.4Δ_oct). [Fe(H₂O)₆]²⁺, Fe²⁺ (d⁶), high spin → t₂g⁴ e_g²; CFSE = 4(−4/10) + 2(6/10) = −4/5 Δ_oct (= −0.4Δ_oct). Low spin complex has a much larger CFSE → more stable.

**Tetrahedral field**:
- A tetrahedral arrangement of four ligands points along alternating corners of a cube, BETWEEN the axes — they point more toward the d_xy, d_xz, d_yz orbitals (e set in T_d symmetry is lower, t₂ set is higher — REVERSED from octahedral).
- Δ_tet = (4/9)Δ_oct for the SAME metal and ligands — tetrahedral splitting is SMALLER because: (1) only 4 ligands not 6, (2) no ligand points directly along any d-orbital lobe.
- Because Δ_tet is always < P for most ligands, **tetrahedral complexes are almost always HIGH SPIN**. Low-spin tetrahedral complexes exist only for very strong field ligands with heavy metals.

**Colour in transition metal complexes**:
- Complexes absorb visible light when Δ_oct or Δ_tet falls in the visible range (400–700 nm) — a d–d transition promotes an electron from t₂g to e_g.
- The COMPLEMENTARY colour is observed: [Ti(H₂O)₆]³⁺ is purple (absorbs yellow-green ~510 nm; transmits violet+red → purple); [Cu(H₂O)₆]²⁺ absorbs red/orange (~800 nm, near-IR edge + red) → blue/green.
- Selection rules (partly relaxed for observation): d–d transitions are LAPORTE FORBIDDEN (g→g transition, since d orbitals are gerade), spin-forbidden if Δm_S ≠ 0. Relaxation mechanisms (vibronic coupling in octahedral, mixing of p and d in tetrahedral — no centre of inversion → not Laporte forbidden) explain why d–d absorptions are seen but are relatively weak (ε ≈ 1–100 L mol⁻¹ cm⁻¹).
- d⁰ and d¹⁰ complexes: no d–d transition possible → colourless. TiO₂ (d⁰) and ZnO (d¹⁰) are white.

**Jahn-Teller distortion**:
- In any non-linear molecule, if the ground state electronic configuration is degenerate (unevenly filled e_g in octahedral: d⁹, d⁴ high-spin), the molecule will distort to remove the degeneracy and lower its energy.
- Most common: axial elongation (z-axis ligands move away) in octahedral d⁹ and high-spin d⁴ → distorted octahedron (tetragonal distortion) → [Cu(H₂O)₆]²⁺ has 4 short equatorial + 2 long axial bonds.
- Consequences: unequal Cu–O bond lengths; split d absorption bands; observed in XRD as tetragonal symmetry rather than perfect O_h.

## Mental Models
**The d-orbital lottery in an octahedral field**: imagine six angry magnets placed along the ±x, ±y, ±z axes. Two d orbitals (z² and x²−y²) have their lobes pointed directly at the magnets — they receive maximum repulsion. Three d orbitals (xy, xz, yz) have their lobes pointed diagonally away — they receive less repulsion. The "magnets" split the five d orbitals into two groups; the gap between groups is Δ_oct.

**High spin vs. low spin as a two-force tug-of-war**: Δ_oct pulls electrons downward (into t₂g); pairing energy P resists pairing. If the ligand's Δ_oct > P, pairing wins (low spin, few unpaired). If Δ_oct < P, promotion wins (high spin, many unpaired). Strong-field ligands (CN⁻, CO) generate large Δ_oct and always win the tug of war for 3d metals.

## Why Students Fail
Students memorise high-spin/low-spin configurations for specific complexes without understanding that the competition is between Δ_oct and P, and without knowing which ligands are strong-field and which are weak-field from the spectrochemical series. They also confuse Laporte selection rule (g→g forbidden) with spin selection rule and cannot explain why coloured d–d absorptions are observed at all despite being formally forbidden.

## Misconceptions
- **MC-1 (Type 5 — instruction-induced)**: "Strong field ligands always give more stable complexes." Probe: "Is stability determined by CFSE alone? Give a counterexample." Characteristic phrase: "CN⁻ always gives the most stable complex." Intervention: CFSE increases with Δ_oct (strong field → large CFSE), so there IS a stabilising contribution from strong field. But thermodynamic stability of a complex depends on MULTIPLE factors: ionic radius ratio, charge, CFSE, π-bonding contributions, and entropy effects. Low-spin complexes are often kinetically inert (slow ligand exchange — especially for CN⁻ and CO), which is a kinetic not thermodynamic property. Moreover, for d⁰ and d¹⁰, CFSE = 0 regardless of ligand — stability comes from electrostatics, not CFSE.
- **MC-2 (Type 4 — notation-induced)**: "Δ_tet > Δ_oct because tetrahedral has 4 ligands and their repulsion is concentrated." Probe: "Compare Δ_oct and Δ_tet for the same metal and ligands." Characteristic phrase: "fewer ligands, more concentrated field, larger splitting." Intervention: Δ_tet ≈ (4/9)Δ_oct — tetrahedral splitting is SMALLER, not larger. Two geometric factors combine: (1) only 4 ligands instead of 6 → less total electrostatic interaction; (2) no tetrahedral ligand points directly along a d-orbital lobe — the overlap is reduced. The smaller Δ_tet is why tetrahedral complexes are almost always high-spin.
- **MC-3 (Type 2 — perceptual intuition)**: "Colourless complexes must be d⁰ — transition metals always have colour." Probe: "ZnSO₄ solution is colourless. Zn is a d-block element. Explain." Characteristic phrase: "all transition metal complexes are coloured." Intervention: colour requires a d–d transition, which requires (1) partially filled d orbitals (to have both a ground and excited state differing in d-electron arrangement) AND (2) Δ in the visible range. Zn²⁺ is d¹⁰ — the d shell is completely full. There is no empty d orbital for an electron to be promoted into → no d–d transition possible → colourless. Similarly, Ti⁴⁺ (d⁰) has no electrons to promote → colourless. The vibrant colours of transition metals arise specifically from d¹–d⁹.

## Analogies
**Valid**: spectrochemical series as a battery-size analogy — weak-field ligands are AAA batteries (small voltage = small Δ_oct); strong-field ligands are 12V car batteries (large voltage = large Δ_oct). The same appliance (metal ion, same pairing energy) will behave differently depending on which battery you insert.

## Demonstrations
**Colour change with ligand substitution**: add concentrated HCl to [Cu(H₂O)₆]²⁺ (blue) → [CuCl₄]²⁻ (yellow-green tetrahedral complex); dilute back with water → blue returns. The colour change is direct evidence that Δ changes with ligand identity and geometry.

**Magnetic moments from spin states**: prepare [Fe(CN)₆]⁴⁻ and [Fe(H₂O)₆]²⁺ (both Fe²⁺, d⁶). Test paramagnetism with a magnet or balance: [Fe(H₂O)₆]²⁺ is paramagnetic (high spin, 4 unpaired electrons); [Fe(CN)₆]⁴⁻ is diamagnetic (low spin, 0 unpaired electrons). Same metal ion, same oxidation state, same d-electron count — completely different magnetic behaviour depending on the ligand.

## Discovery Questions
1. "[Ni(H₂O)₆]²⁺ is green, [Ni(en)₃]²⁺ is violet, and [Ni(CN)₄]²⁻ is yellow. (a) Explain why [Ni(en)₃]²⁺ absorbs at a shorter wavelength (higher energy) than [Ni(H₂O)₆]²⁺. (b) [Ni(CN)₄]²⁻ is square planar. Predict whether it is likely to be high-spin or low-spin and explain why."
2. "Using CFT, explain why [CoF₆]³⁻ is paramagnetic with 4 unpaired electrons while [Co(CN)₆]³⁻ is diamagnetic. Calculate the CFSE for each complex in terms of Δ_oct. Which complex would you expect to be more kinetically inert? Why?"

## Teaching Sequence
1. Recap d-orbital shapes and orientations from chem.atomic.orbitals.
2. Octahedral crystal field: which orbitals point at vs. between ligands → t₂g/e_g split → Δ_oct definition.
3. Barycentre rule: t₂g stabilised by −4/10Δ, e_g destabilised by +6/10Δ.
4. Electron filling: d¹–d³ trivial; d⁴–d⁷ the competition (Δ vs. P); d⁸–d¹⁰ trivial.
5. High spin vs. low spin — worked examples for d⁴ and d⁶.
6. Spectrochemical series — teach position of H₂O as reference; CN⁻, CO as strongest; F⁻, Cl⁻ as weak.
7. CFSE calculation: count t₂g/e_g electrons, apply weights, compute CFSE.
8. Tetrahedral field: orbital labels reversed, Δ_tet = (4/9)Δ_oct, why always high spin.
9. Colour: d–d transition, complementary colour, d⁰/d¹⁰ colourless, selection rules (briefly).
10. Jahn-Teller: degeneracy → distortion → d⁹ and d⁴ high-spin examples.

## Tutor Actions
- **If student confuses which orbitals are t₂g vs e_g**: draw the octahedron with ligands on axes; draw d_z² and d_x²−y² pointing AT ligands (→ e_g, destabilised); d_xy etc. pointing BETWEEN ligands (→ t₂g, stabilised). The geometry argument is the foundation.
- **If student cannot determine spin state**: write down Δ_oct and P as unknowns; state "if the ligand is in the spectrochemical series above [something], Δ > P → low spin." Always verify using the spectrochemical series.
- **FRAGILE sign**: can draw the d-orbital splitting diagram but cannot calculate CFSE or determine spin state from the spectrochemical series without prompting.

## Voice Teaching Notes
In voice, the key is establishing WHICH orbitals are higher (e_g) before any other concept. Use spatial language: "the d_z² and d_x²−y² point directly at the ligands — imagine driving a car directly into a wall. The other three (d_xy, d_xz, d_yz) point between the walls — they avoid the ligands." Once students have the spatial image, the energy consequences (e_g higher, t₂g lower) follow directly.

## Assessment Signals
- **Green**: draws octahedral splitting diagram correctly; fills d electrons with correct spin state given spectrochemical series position; calculates CFSE; explains why d⁰/d¹⁰ are colourless; states Δ_tet ≈ (4/9)Δ_oct; explains Jahn-Teller distortion in d⁹; names three strong-field and three weak-field ligands.
- **Amber**: correct high-spin/low-spin assignments from memory for common complexes but cannot use the spectrochemical series to predict an unfamiliar case; or cannot calculate CFSE from electron counts.
- **Red**: says e_g orbitals are lower in energy than t₂g; believes tetrahedral splitting is larger than octahedral; says all d-block complexes are coloured.
- **Probe**: "For d⁵ Fe³⁺: (a) draw the d-orbital splitting diagram and fill in the electrons for both [Fe(CN)₆]³⁻ and [FeCl₆]³⁻; (b) calculate the CFSE for each; (c) predict the magnetic behaviour of each complex; (d) which complex is more likely to be coloured?"

## Tutor Recovery Strategy
If student cannot fill d electrons in the split diagram: start from the simpler case of atomic d electron filling (Hund's rule in degenerate orbitals) before introducing the split. "If all 5 d orbitals were the same energy, how would you fill 6 electrons?" (Hund: pair in one, then fill others). "Now I split those 5 into two groups: 3 lower (t₂g) and 2 higher (e_g). Does it still cost P to pair two electrons in the same orbital? YES. Does it cost Δ_oct to put an electron in the upper group instead of pairing in the lower? YES. Now you choose the cheaper option."

## Memory Hooks
- **t₂g/e_g**: "t₂g = Between axes (lower). e_g = Along axes (higher). Ligands are on the axes."
- **CFSE weights**: "t₂g = −4/10Δ per electron. e_g = +6/10Δ per electron."
- **Spectrochemical anchor**: "I⁻ (weak) ... H₂O (mid) ... CN⁻/CO (strong)."
- **Tetrahedral**: "Δ_tet = 4/9 Δ_oct. Always high spin."
- **Colour rule**: "d⁰ and d¹⁰ = colourless. d¹–d⁹ can absorb visible if Δ in visible range."
- **Jahn-Teller**: "Unequal e_g filling (d⁴ HS, d⁹) → tetragonal elongation."

## Transfer Connections
No further chemistry concepts unlock from this terminal node. It is a synthesis endpoint for coordination chemistry.

## Cross-Subject Connections
- **Bioinorganic chemistry**: haemoglobin's Fe²⁺ centre — O₂ is a strong-field ligand (shifts Fe²⁺ from high-spin to low-spin on binding, a cooperative effect that drives the sigmoidal O₂-binding curve); CO is an even stronger-field ligand and binds ~250× more tightly than O₂, blocking O₂ uptake (CO poisoning).
- **Materials science and pigments**: the intense blue of ultramarine (charge transfer, not d–d), the colour of Ruby (Cr³⁺ in Al₂O₃, d-d transition of Cr³⁺ gives the red), the blue of sapphire (Fe²⁺/Fe³⁺/Ti⁴⁺ charge transfer in Al₂O₃) — all are applications of crystal field effects.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.coord.cft`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.coord.cft` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
