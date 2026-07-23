# Covalent Bonding — `chem.bond.covalent-bonding`

## Identity

- **KG ID**: chem.bond.covalent-bonding
- **Subject**: Chemistry
- **Domain**: Chemical Bonding (chem.bond)
- **Difficulty**: developing
- **Bloom level**: understand
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.period.electron-affinity
- **Unlocks**: chem.bond.bond-parameters, chem.bond.coordinate-bond, chem.bond.hybridization, chem.bond.resonance, chem.bond.vsepr, chem.org.iupac
- **Cross-links**: none

## Learning Objective

Students can define a covalent bond as a shared electron pair between two atoms; draw Lewis structures (electron dot diagrams) for simple molecules and polyatomic ions; distinguish single, double, and triple bonds by bond order; explain why covalent bonding occurs in terms of electrostatic attraction; identify polar and non-polar covalent bonds using electronegativity differences; and describe the properties of covalent molecular compounds (low melting points, poor electrical conduction).

## Core Understanding

**Definition**:
A covalent bond forms when two atoms SHARE one or more pairs of electrons. Each atom contributes one electron to a shared pair (in a normal covalent bond). The electrostatic attraction between the shared electron pair and both nuclei holds the atoms together.

Covalent bonding occurs typically between NON-METALS (similar electronegativities — neither atom can win all the electrons to form ions). When electronegativity difference Δχ < ~1.7 (Pauling scale), covalent bonding predominates; Δχ > 1.7, ionic bonding predominates (this is a rule of thumb, not a sharp boundary).

**Lewis structures (electron dot structures)**:
Rules for drawing Lewis structures:
1. Count total valence electrons from all atoms (add 1e⁻ per negative charge on an ion; remove 1e⁻ per positive charge).
2. Connect atoms with single bonds (each = 2 shared electrons).
3. Distribute remaining electrons as lone pairs to satisfy each atom's octet (or duet for H, which needs 2 electrons total).
4. If any atom is electron-deficient after step 3, convert lone pairs on adjacent atoms to additional bonds (double or triple bonds).

Examples:
- H₂O: O has 6 valence electrons; 2 H each contribute 1. Total: 8. Two O–H bonds (4 electrons in bonds) + 2 lone pairs on O (4 electrons) = 8. Correct.
- CO₂: C contributes 4; each O contributes 6. Total: 16. Two C=O double bonds (8 electrons) + 2 lone pairs on each O (4×2=8) = 16. Correct. Linear geometry (from the double bonds, not lone pairs on C).
- N₂: each N contributes 5. Total: 10. Triple bond (6 electrons) + 1 lone pair on each N (2×2=4) = 10. N≡N.

**Bond order**:
- Single bond: 1 shared pair (σ bond). Longest and weakest of the three types.
- Double bond: 2 shared pairs (1 σ + 1 π). Shorter and stronger than single.
- Triple bond: 3 shared pairs (1 σ + 2 π). Shortest and strongest.
Bond length and bond energy are inversely related: higher bond order → shorter bond → stronger bond (higher bond energy).

**Polar vs. non-polar covalent bonds**:
- Non-polar covalent: Δχ ≈ 0 (e.g., H–H, Cl–Cl, C–C). Shared electrons are evenly distributed.
- Polar covalent: Δχ > 0 but < ~1.7 (e.g., H–Cl: Δχ = 1.0; H–O: Δχ = 1.4; H–N: Δχ = 0.9). The more electronegative atom pulls the shared pair closer → partial negative charge (δ−) on that atom; partial positive charge (δ+) on the other. This creates a bond dipole.
- A bond dipole is a vector; molecular polarity is the vector sum of all bond dipoles. A symmetrical molecule can have polar bonds but be non-polar overall (e.g., CO₂: two equal C=O bond dipoles point in opposite directions, cancel → non-polar molecule; CF₄: four equal C–F dipoles in tetrahedral arrangement, cancel → non-polar molecule).

**Properties of covalent molecular compounds**:
- Discrete molecules held together by weak intermolecular forces (London dispersion, dipole-dipole, or hydrogen bonding) — NOT the strong covalent bonds within the molecule.
- Low melting and boiling points (weak intermolecular forces broken on melting/boiling, not the bonds).
- Poor electrical conductors in solid or liquid state (no free ions or electrons to carry charge). Exception: polar covalent compounds that ionise in water (HCl → H⁺ + Cl⁻) can produce conducting solutions.
- Often soluble in non-polar solvents ("like dissolves like").

Contrast with covalent network solids (SiO₂, diamond): covalent bonds extend throughout the structure → very high melting points, very hard, but still non-conducting (no free electrons or ions).

## Mental Models

**The arm-wrestling model**: two non-metal atoms of similar electronegativity reach for the same electron pair and neither wins outright — they share the electrons between them. The shared pair is attracted by both nuclei simultaneously (like a knot held by two ropes). The stable bond length is where attraction to both nuclei balances the repulsion between the nuclei themselves.

**The tug-of-war model for polar bonds**: in a polar covalent bond, one atom is slightly stronger (more electronegative) and pulls the shared pair closer — but not all the way to itself (which would be ionic). The stronger atom gets a partial negative charge (δ−), the weaker one a partial positive charge (δ+). The partial charges are fractions, not integers.

## Why Students Fail

1. **Lewis structure octet rule applied to H and B**: H needs only 2 electrons (duet). B in BCl₃ has only 6 valence electrons and is a Lewis acid (incomplete octet — this is legitimate and does not violate the rules). Many students add a "phantom" bond to B to force an octet.
2. **Molecular polarity = bond polarity**: students say CO₂ is polar because C=O bonds are polar. Molecular polarity requires BOTH polar bonds AND asymmetric geometry. CO₂ is linear → bond dipoles cancel → non-polar molecule.
3. **Covalent compounds have high melting points**: students confuse the strength of the covalent bond (very strong) with the energy needed to melt the substance (weak intermolecular forces). Melting molecular covalent compounds breaks intermolecular forces, not covalent bonds.

## Misconceptions

**MC-1 — Molecular polarity always follows bond polarity** (Type 1, overgeneralization: "polar bonds = polar molecule")
- *Mechanism*: students correctly learn that H–Cl is polar, extend to "all bonds → molecule is polar."
- *Diagnostic probe*: "CO₂ has two polar C=O bonds. Is the CO₂ molecule polar? Explain."
- *Characteristic phrase*: "CO₂ is a polar molecule because it contains polar C=O bonds."
- *Repair*: CO₂ is linear (the two C=O double bonds are collinear, pointing in exactly opposite directions). The two bond dipoles are equal in magnitude and point in opposite directions → they exactly cancel. Net dipole = zero → non-polar molecule. Molecular polarity requires BOTH polar bonds AND a geometry that prevents cancellation. Test: draw dipole vectors from the more-electronegative atom; if their vector sum is zero, the molecule is non-polar.

**MC-2 — Covalent compounds have high melting points because covalent bonds are strong** (Type 5, instruction-induced: "strong bond = hard to melt")
- *Mechanism*: students learn covalent bonds are strong; they then predict high melting points. The link is broken by the distinction between intra- (within molecule) and inter-molecular forces.
- *Diagnostic probe*: "Why does ice melt at 0°C if the O–H bond has a bond energy of 459 kJ/mol?"
- *Characteristic phrase*: "Covalent compounds are hard to melt because covalent bonds are so strong."
- *Repair*: melting a molecular covalent compound does NOT break covalent bonds. It breaks the INTERMOLECULAR forces holding separate molecules together (hydrogen bonds in water, London dispersion forces in wax). The O–H bond (459 kJ/mol) remains intact in liquid water. The intermolecular H-bonds in ice (≈20 kJ/mol) are what break on melting → low melting point for a molecular compound. Covalent NETWORK solids (diamond, SiO₂) DO have high melting points because every bond throughout the structure is covalent.

**MC-3 — All covalent bonds involve each atom contributing one electron** (Type 5, instruction-induced: "sharing" language implies equal contribution)
- *Mechanism*: students learn "each atom contributes one electron to a shared pair" as the general rule and don't recognise the coordinate (dative) covalent bond exception.
- *Diagnostic probe*: "In the ammonium ion NH₄⁺, how is the fourth N–H bond different from the other three?"
- *Characteristic phrase*: "All four N–H bonds in NH₄⁺ are formed by N and H each contributing one electron."
- *Repair*: the fourth N–H bond in NH₄⁺ is a COORDINATE (dative) covalent bond — N contributes BOTH electrons from its lone pair to bond with H⁺ (which has no electrons at all). Once formed, the coordinate bond is indistinguishable from the other three N–H bonds in terms of bond length and energy. This is covered fully in chem.bond.coordinate-bond, but the distinction between normal and coordinate bonds must be noted here.

## Analogies

**The handshake analogy**: a normal covalent bond is a handshake where each person extends one hand (one electron). Both hands touch in the middle (shared pair). A double bond is a two-handed handshake; a triple bond is as tight as three overlapping grasps. The stronger the grip (more shared pairs), the closer the people stand (shorter bond length).

**The dipole-as-arrow analogy**: draw an arrow from δ+ to δ− (or from less electronegative to more electronegative atom — physics convention has it pointing from − to +, but the direction convention matters less than consistency within a problem). For a molecule, add all the arrows as vectors. If they cancel, the molecule is non-polar. If they don't, the molecule has a net dipole.

## Demonstrations

**Demonstration 1 — Polarity test with a charged rod**
- Fill a burette with water and with cyclohexane (or tetrachloromethane, CCl₄). Bring a charged plastic rod near each stream. The water stream deflects (polar molecule, aligns with field); the cyclohexane or CCl₄ stream does not deflect (non-polar molecule, no net dipole). Students observe directly the consequence of molecular polarity (or lack thereof), connecting Lewis structure geometry to macroscopic behaviour.

## Discovery Questions

1. "Draw the Lewis structure of SO₂ (sulfur dioxide). Count total valence electrons. How many lone pairs are on S? Is there a double bond?" (Targets: S (6) + 2×O (6) = 18 valence electrons. Connect S to two O atoms: 2 bonds = 4 electrons used. Remaining: 14 electrons. Add lone pairs: complete octets on both O atoms (2×3 lone pairs = 12 electrons); S now has 2 electrons left → 1 lone pair on S. Check S: 2 bonds + 1 lone pair = 2+2+2=6 electrons (not an octet). Convert one lone pair on one O to a double bond: now S has 1 double bond, 1 single bond, 1 lone pair → 10 electrons around S — wait, S is period 3, can have expanded octet. Correct Lewis: S has one double bond, one single bond, one lone pair → 3 pairs around S + the bonds = ok. Formal charge check (advanced): all atoms in the structure with one S=O and one S–O give formal charges of 0 on S, 0 on =O, −1 on –O. Total formal charge = −1, but SO₂ is neutral → must use resonance. The standard structure has S with one double and one single bond plus a lone pair — two resonance structures interchange the double bond. Final: 18 valence electrons, two resonance structures with S having 1 double bond, 1 single bond, 1 lone pair in each; O atoms have 2 lone pairs each.)
2. "Classify each bond as non-polar covalent, polar covalent, or ionic: (a) H–H (b) N–H (c) Na–Cl (d) C–O (e) F–F. Use Pauling electronegativities: H=2.1, N=3.0, Na=0.9, Cl=3.0, C=2.5, O=3.5, F=4.0." (Targets: (a) H–H: Δχ = 0 → non-polar covalent. (b) N–H: Δχ = 3.0−2.1 = 0.9 → polar covalent (N is δ−). (c) Na–Cl: Δχ = 3.0−0.9 = 2.1 > 1.7 → ionic. (d) C–O: Δχ = 3.5−2.5 = 1.0 → polar covalent (O is δ−). (e) F–F: Δχ = 0 → non-polar covalent.)
3. "Explain why CH₄ is non-polar despite having four polar C–H bonds (Δχ = 0.4)." (Targets: CH₄ is tetrahedral (109.5°). The four C–H bond dipoles are all equal in magnitude and point from C to H. In a perfect tetrahedron, the four vectors point symmetrically outward — their vector sum is exactly zero. The molecule is non-polar. This is a geometry argument, not a bond argument: the bonds ARE polar, but the arrangement causes them to cancel. Compare with CHCl₃ (chloroform): replacing three H with Cl makes the molecule asymmetric → bond dipoles no longer cancel → CHCl₃ is polar.)

## Teaching Sequence

1. Review from chem.period.electron-affinity: electronegativity trends; Pauling scale; the Mulliken formula linking IE and EA to χ.
2. Introduce covalent bonding: shared electron pair, electrostatic attraction from both nuclei. Compare with ionic (electron transfer between atoms with large Δχ). Δχ < 1.7 rule of thumb.
3. Lewis structures: systematic seven-step procedure. Work on H₂O, CO₂, N₂. Address MC-3 (coordinate bonds noted but deferred to chem.bond.coordinate-bond).
4. Bond order: single, double, triple. Bond length and bond energy inverse relationship.
5. Polar vs. non-polar bonds (Δχ). Molecular polarity: vector sum of bond dipoles. Address MC-1. Work Discovery Question 3.
6. Properties of covalent molecular compounds vs. network covalent solids. Address MC-2.
7. Work Discovery Questions 1 and 2.

## Tutor Actions

- If student says polar bonds → polar molecule automatically → MC-1 repair: draw the bond dipole vectors; vector sum must be non-zero for the molecule to be polar; CO₂ linear → cancellation.
- If student says covalent compounds have high melting points → MC-2 repair: melting breaks intermolecular forces (weak), not covalent bonds (strong); molecular covalent compounds melt easily; network covalent solids melt at very high temperature.
- If student says all covalent bonds have equal electron contributions → MC-3 repair: coordinate bonds have one atom supply both electrons; noted here, full treatment in chem.bond.coordinate-bond.
- Advance when student can draw Lewis structures for common molecules, assign bond polarity from Δχ, determine molecular polarity by vector cancellation, and correctly predict melting-point range for a molecular vs. network covalent substance.

## Voice Teaching Notes

"Before any Lewis structure: count ALL valence electrons first. Write the number. Then connect. Then distribute. Never skip the count."

"Molecular polarity: draw the arrows (bond dipoles), then add them as vectors. If they cancel = non-polar molecule. If they don't = polar molecule. Always check geometry."

## Assessment Signals

**Mastery gate**:
1. Student correctly draws Lewis structures for 2-heavy-atom molecules with single, double, and triple bonds.
2. Student correctly classifies bonds as non-polar/polar covalent/ionic by Δχ.
3. Student correctly determines molecular polarity from bond polarity + geometry (including cancellation cases like CO₂, CCl₄).
4. Student correctly explains low melting point of molecular covalent compounds (intermolecular forces, not covalent bonds, are broken).

**FRAGILE signal**: student draws Lewis structures correctly but always concludes the molecule is polar because bonds are polar — no geometry analysis applied.

**MISCONCEIVING signal**: student says "CO₂ is polar because it has C=O bonds." Address MC-1 with the vector cancellation before any polarity question.

## Tutor Recovery Strategy

If stuck:
1. For Lewis structures: "Step 1: count valence electrons (sum all group numbers, adjust for charge). Write the number. Step 2: connect every non-H atom to the central atom with a single bond (each bond uses 2 electrons, subtract from count). Step 3: complete octets on all outer atoms first (H is satisfied with 2). Step 4: if electrons remain, add lone pairs to the central atom. Step 5: if the central atom is electron deficient, move a lone pair from an adjacent atom to form a double (or triple) bond. Never skip the count."
2. For molecular polarity: "Draw the molecule. For each bond, draw an arrow from the less electronegative to the more electronegative atom. Now add up all arrows as if they were force vectors. If the arrowheads balance each other (symmetric geometry), the molecule is non-polar. If one direction dominates, the molecule is polar. CO₂: arrow from C to each O, in exactly opposite directions → they cancel → non-polar."
3. For melting points: "Ask: is this substance made of separate molecules, or is it one giant covalent network? Separate molecules: when you heat it, you only need to overcome the attraction BETWEEN molecules (weak: London, dipole, or H-bonds). The covalent bonds within each molecule stay intact. Network solid (diamond, quartz): every bond throughout the crystal IS a covalent bond — to melt it you break every one → very high mp."

## Memory Hooks

- **Covalent bond = shared electron pair. Non-metals share when Δχ < 1.7 (neither can fully win the electrons).**
- **Bond order: single < double < triple. Bond length order: opposite. Bond energy order: same as bond order.**
- **Polar bond: Δχ > 0. Polar molecule: polar bonds + asymmetric geometry (dipoles don't cancel).**
- **CO₂: polar bonds, linear geometry → dipoles cancel → non-polar molecule.**
- **Molecular covalent compound: low mp (weak intermolecular forces broken). Network covalent: high mp (strong covalent bonds throughout).**

## Transfer Connections

- **chem.bond.vsepr**: VSEPR theory predicts geometry from the Lewis structure's electron pair count — this node provides the Lewis structure input, VSEPR provides the 3D shape. Molecular polarity (this node's vector sum concept) requires the VSEPR geometry.
- **chem.bond.bond-parameters**: bond order, bond length, and bond energy relationships introduced here are expanded quantitatively in that node (tabulated values, trends across bond types, relationship to reaction enthalpy via bond enthalpy cycles).

## Cross-Subject Connections

- **Biology (macromolecules)**: covalent bonds form the backbone of all biological macromolecules (DNA's sugar-phosphate backbone, protein peptide bonds, glycosidic bonds in polysaccharides). Understanding covalent bonding is the foundation of all structural biochemistry.
- **Materials science (plastics and polymers)**: polymer chains are held together by covalent bonds (strong) within the chain and weak van der Waals or H-bond forces between chains (which determine flexibility, melting temperature, tensile strength). This node's intra vs. intermolecular distinction is directly applied in polymer science.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.bond.covalent-bonding`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.bond.covalent-bonding` as of 2026-07-23.

## Curriculum Feedback

High-connectivity gateway node: unlocks 6 downstream nodes (VSEPR, hybridization, resonance, coordinate bond, bond parameters, IUPAC nomenclature). Lewis structures are the single most tested skill across secondary chemistry curricula globally and must be mastered here before any downstream node is accessible. The three misconceptions (molecular polarity from bond polarity, melting point from bond strength, coordinate bond confusion) are the three highest-frequency Lewis-structure errors in examinations.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
