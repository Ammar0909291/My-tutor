# Atomic Radius — `chem.period.atomic-radius`

## Identity

- **KG ID**: chem.period.atomic-radius
- **Subject**: Chemistry
- **Domain**: Periodic Table (chem.period)
- **Difficulty**: developing
- **Bloom level**: analyze
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.period.modern-periodic-law
- **Unlocks**: chem.period.ionization-energy, chem.bond.covalent-bonding, chem.bond.ionic-bonding
- **Cross-links**: none

## Learning Objective

Students can distinguish covalent, van der Waals, and ionic radii and explain how each is measured; describe and explain the trend in atomic radius across a period (decreasing) and down a group (increasing); explain anomalies including the d-block contraction; compare radii of isoelectronic species; and use atomic radius trends to predict and rationalise bond lengths and ionic sizes.

## Core Understanding

**Types of atomic radius**:
- *Covalent radius*: half the distance between the nuclei of two identical bonded atoms in a covalent molecule (e.g., half the Cl–Cl bond length in Cl₂ = 99 pm for Cl). For heteronuclear bonds: bond length ≈ sum of covalent radii.
- *Van der Waals radius*: half the distance between nuclei of two adjacent non-bonded atoms in a solid or liquid (e.g., in solid noble gases). Always larger than the covalent radius for the same atom — the electron cloud of a non-bonded atom extends further than a bonded one (no bonding pulls the clouds together).
- *Ionic radius*: the effective radius of an ion in an ionic crystal, derived from crystal unit-cell dimensions (X-ray diffraction). Cation < parent atom (electrons removed, Zeff rises per remaining electron, cloud contracts). Anion > parent atom (electrons added, electron-electron repulsion expands the cloud at the same nuclear charge).

**Trend across a period (left to right): DECREASING radius**:
Across a period, the nuclear charge Z increases by 1 for each element, but electrons are added to the same principal shell (same n). The additional electrons partially shield each other (inter-electron repulsion in the SAME subshell is incomplete shielding), so the effective nuclear charge Zeff = Z − σ increases across the period. Higher Zeff pulls ALL electrons closer to the nucleus → radius decreases.

Quantitative check (Slater's rules give σ): across period 2, Zeff rises from Li (~1.3) to F (~5.2), radius falls from ~167 pm (Li) to ~64 pm (F). Noble gas has full outer shell — radius comparisons are typically made using van der Waals rather than covalent radii for noble gases.

**Trend down a group: INCREASING radius**:
Each successive period adds one new principal shell (higher n). Despite increasing Z, the new shell is further from the nucleus by the quantum-mechanical radial distribution, and inner shells provide strong shielding (σ ≈ 0.85 per inner-shell electron in Slater's rules). Net Zeff increases only modestly down a group compared to the dramatic increase in shell size → radius increases.

**d-block contraction (lanthanide contraction)**:
The 4f subshell (lanthanides, period 6) fills BEFORE the 5d subshell. f orbitals provide very poor shielding (they are core-penetrating but diffuse). As 14 f electrons are added across the lanthanides, Zeff experienced by the 5d and 6s electrons rises substantially, contracting those outer orbitals. Consequence: 5th and 6th period transition metals have nearly identical radii (e.g., Zr ≈ Hf, Mo ≈ W, Ru ≈ Os) — the expected increase down group 4, 6, 8 from period 5 to 6 is mostly cancelled by the lanthanide contraction. This also makes Pt, Ir, Os denser and harder to separate chemically from their lighter congeners.

**Isoelectronic series**:
Isoelectronic species have the same number of electrons but different nuclear charges. Radius decreases as Z increases within an isoelectronic series (same electron configuration, higher Z → higher Zeff → smaller radius).
Example: O²⁻ (Z=8, 10 e⁻) > F⁻ (Z=9, 10 e⁻) > Ne (Z=10, 10 e⁻) > Na⁺ (Z=11, 10 e⁻) > Mg²⁺ (Z=12, 10 e⁻) > Al³⁺ (Z=13, 10 e⁻).

**Ionic radius and charge**:
Cation: radius < parent atom. More electrons removed → higher Zeff per electron → smaller radius. Multiple cations of the same element decrease in radius with increasing charge (Fe²⁺ > Fe³⁺; Mn²⁺ > Mn³⁺ > Mn⁴⁺).
Anion: radius > parent atom (extra electrons, same Z, more repulsion per electron).

## Mental Models

**The nucleus-as-anchor model**: the nucleus is an anchor pulling in the electron cloud. Across a period: more anchors added without building a new floor → cloud pulled tighter → smaller radius. Down a group: a new floor is added (new principal shell) that is further from the anchor → cloud extends outward despite the larger anchor.

**The isoelectronic size model**: imagine 10 people (electrons) in a room. If you add more chairs (nuclear charge) without adding people, the chairs all move closer together (more nuclear attraction, same electron-electron repulsion) → radius shrinks. O²⁻ has 10 electrons pulled by 8 protons; Al³⁺ has 10 electrons pulled by 13 protons — the same crowd in a much smaller room.

## Why Students Fail

1. **Radius increases across a period**: students see more electrons → "bigger atom." The key concept (same shell + higher Zeff = contraction) requires distinguishing between the number of electrons and the distance from the nucleus.
2. **Ionic radius: cation > parent atom**: students think adding electrons to form an anion is irrelevant to size; they know cations are formed by loss and expect "less = smaller" and "more = bigger" without the mechanism.
3. **d-block elements all follow the same group trends**: students extrapolate the simple s/p-block trend (radius increases down a group) to ALL groups, missing the lanthanide contraction.

## Misconceptions

**MC-1 — Atomic radius increases across a period (more electrons = bigger atom)** (Type 2, perceptual intuition: size follows count)
- *Mechanism*: students intuit that accumulating electrons should mean a bigger atom, without considering the simultaneous increase in nuclear charge.
- *Diagnostic probe*: "Why does sodium (Z=11) have a larger atomic radius than chlorine (Z=17), even though chlorine has more electrons?"
- *Characteristic phrase*: "Chlorine is bigger than sodium because it has more electrons and therefore a larger electron cloud."
- *Repair*: across period 3, electrons are added to the same n=3 shell. But nuclear charge rises from 11 to 17, and the extra electrons only partially shield each other (same shell → poor shielding). Zeff experienced by any electron rises from ~2.2 (Na) to ~6.1 (Cl). Higher Zeff pulls the cloud in → radius falls. Na (186 pm) > Cl (99 pm), despite Cl having more electrons.

**MC-2 — Cation radius > anion radius for the same element** (Type 1, overgeneralization: "positive ion means more, so bigger")
- *Mechanism*: students conflate the charge sign with physical size; they associate "positive = more of something = larger."
- *Diagnostic probe*: "Compare the radius of Na (neutral) with Na⁺ and with Cl⁻. Which is largest?"
- *Characteristic phrase*: "Na⁺ is larger than Cl⁻ because Na has a positive charge and Cl has a negative charge."
- *Repair*: Na (neutral): 186 pm. Na⁺ (lost one electron, same Z=11, but now 10 electrons instead of 11 → less electron-electron repulsion, same nuclear charge pulls harder → 102 pm). Cl⁻ (gained one electron, Z=17, 18 electrons → more repulsion at same nuclear charge → 181 pm). Order: Na⁺ (102) < Cl⁻ (181) < Na (186). The SIGN of the charge tells you whether electrons are lost (→ smaller) or gained (→ larger), not which is numerically "more."

**MC-3 — Period 6 d-block elements are always larger than period 5 congeners** (Type 5, instruction-induced from the "radius increases down a group" rule applied without exceptions)
- *Mechanism*: the general trend (radius increases down a group) is taught first; exceptions for d-block 5→6 transition are rarely emphasised.
- *Diagnostic probe*: "Compare the atomic radii of Zr (period 5, Group 4) and Hf (period 6, Group 4). Which is larger?"
- *Characteristic phrase*: "Hf is larger than Zr because it is in a lower period."
- *Repair*: the lanthanide contraction (14 f-electrons with poor shielding inserted before the 5d→6d step) causes Zr and Hf to have nearly identical radii (~155 pm vs. ~159 pm). The expected increase down the group is almost entirely cancelled. This is why separating Zr and Hf is one of the hardest separations in industrial chemistry — their nearly identical radii give nearly identical chemistry.

## Analogies

**The magnet-and-marbles analogy**: place a magnet (nucleus) and marbles (electrons) on a table. Stronger magnet (more protons) pulls marbles closer together. Add a new ring of marbles far out (new electron shell) and they're pulled out to that ring's distance, but the inner rings are still pulled tight. Isoelectronic series: same number of marbles, stronger magnet → smaller cluster.

**The floors-in-a-building analogy for periodic trends**: each period is a new floor. Going across a floor, the rooms get smaller because more weight (nuclear charge) is applied to the same floor level. Going to a higher floor (next period), rooms start large again because the structural supports (inner shells) push you out to a new level, even as the building itself (Z) gets heavier.

## Demonstrations

**Demonstration 1 — Visual inspection of period 3 element sizes**
- Display samples of Na, Mg, Al, Si, P, S, Cl (as elements where safe and available). Compare size of unit cells or crystal structures using a molecular model set or a digital visualisation. Sodium's large, silvery bulk contrasts with the compact crystal of sulfur or the gas phase of chlorine. Connect the visible density trend (Na: 0.97 g/cm³; Al: 2.7 g/cm³; S: 2.07 g/cm³) to the atomic radius trend (smaller atoms in dense crystals for similar structures).

## Discovery Questions

1. "Place the following in order of INCREASING atomic/ionic radius: Mg²⁺, Na⁺, Ne, F⁻, O²⁻. All are isoelectronic (10 electrons). Explain the order." (Targets: all have 10 electrons. Higher Z → higher Zeff → smaller radius. Order from smallest to largest: Mg²⁺ (Z=12, smallest) < Na⁺ (Z=11) < Ne (Z=10) < F⁻ (Z=9) < O²⁻ (Z=8, largest). Reasoning: same electron repulsion across the series; only Zeff changes; lower Z → weaker pull → larger radius.)
2. "Explain why the atomic radius of Al (143 pm) is slightly larger than that of Mg (160 pm) — wait, reconsider. Al (143 pm) is SMALLER than Mg (160 pm). Explain this using Zeff." (Targets: Mg (Z=12) and Al (Z=13) are adjacent in period 3. Al has one more proton (+1 in nuclear charge) and adds one electron to the 3p subshell. The extra electron is in 3p, which does not shield the other 3s electrons very well. Zeff for the outer electrons increases from Mg (~3.3) to Al (~4.1). Higher Zeff → cloud pulled closer → Al (143 pm) < Mg (160 pm).)
3. "The Group 6 elements Cr (period 4), Mo (period 5), and W (period 6) have atomic radii of approximately 128, 139, and 139 pm. Why are Mo and W nearly the same size?" (Targets: Mo (period 5) and W (period 6) are expected to differ in radius as the trend down group 6 from Cr to Mo is 128→139 pm. But 14 lanthanide elements intervene between period 5 and 6, filling the 4f subshell. f electrons provide very poor shielding. This lanthanide contraction substantially increases Zeff for W's outer electrons, cancelling most of the expected radius increase from the added 6th principal shell. Mo and W end up nearly identical in radius → very similar chemistry → difficult to separate industrially.)

## Teaching Sequence

1. Review from chem.period.modern-periodic-law: block structure; Zeff concept; shielding by core vs. valence electrons.
2. Introduce the three radius types (covalent, van der Waals, ionic). Explain each measurement method briefly.
3. Periodic trend across a period: same n + increasing Z + poor same-shell shielding → Zeff rises → radius falls. Address MC-1.
4. Periodic trend down a group: increasing n (new shell far from nucleus) + strong inner-shell shielding → radius rises.
5. Isoelectronic series: same electron count, different Z → radius decreases with increasing Z. Work Discovery Question 1.
6. Ionic radii: cation < parent < anion. Compare directly (Na, Na⁺, Cl⁻). Address MC-2. Work Discovery Question 2.
7. Lanthanide contraction: poor f-shielding → Zeff rise for period 6 d-block → Mo ≈ W etc. Address MC-3. Work Discovery Question 3.

## Tutor Actions

- If student says radius increases left to right → MC-1 repair: same shell, Zeff rises across period, cloud contracts; count the Zeff not the electrons.
- If student says cation > parent or cation > anion irrationally → MC-2 repair: losing electrons = less repulsion + same Z = cloud contracts; gaining electrons = more repulsion + same Z = cloud expands.
- If student says period 6 d-block is always larger than period 5 → MC-3 repair: lanthanide contraction; f-electrons do not shield 5d/6s effectively; Mo≈W, Zr≈Hf.
- Advance when student can rank any set of species (neutral atoms, cations, anions, isoelectronic series) correctly and explain each ordering in terms of Zeff and shell number.

## Voice Teaching Notes

"Before any radius question: say Zeff first. More protons in same shell → higher Zeff → smaller. New shell added → bigger. Isoelectronic: same electrons, higher Z → smaller."

"Ionic: cation lost electrons → smaller. Anion gained electrons → bigger. Positive means loss, loss means smaller. Negative means gain, gain means bigger."

## Assessment Signals

**Mastery gate**:
1. Student correctly states radius decreases across a period and increases down a group, with mechanism (Zeff).
2. Student correctly ranks isoelectronic species by radius.
3. Student correctly predicts cation < neutral < anion for the same element.
4. Student can identify the lanthanide contraction and name at least one pair of congeners with nearly identical radii.

**FRAGILE signal**: student correctly ranks species but attributes the trend to "number of electrons" alone without mentioning Zeff — the causal mechanism is absent.

**MISCONCEIVING signal**: student says radius increases across a period. Address MC-1 with the Na vs. Cl direct comparison (186 pm vs. 99 pm) before any trend analysis.

## Tutor Recovery Strategy

If stuck:
1. For radius across a period: "Write Z and n for Na (11, 3) and Cl (17, 3). Same n (same principal shell). Z goes up by 6. Those extra protons are all pulling in the SAME electron cloud in the SAME shell. Same shell = poor shielding between those electrons. Net result: Z up 6, shielding up only ~4 → Zeff up ~2 → cloud pulled in → smaller radius. Count the Zeff, not the electrons."
2. For ionic radius: "Na loses one electron: 11 protons pull 10 electrons instead of 11 → less repulsion between electrons → nuclear charge wins → cloud contracts. Na⁺ is smaller than Na. Cl gains one electron: 17 protons pull 18 electrons → more repulsion → cloud expands. Cl⁻ is bigger than Cl."
3. For lanthanide contraction: "Draw the periodic table. Between period 5 Mo and period 6 W, you cross 14 lanthanide elements (4f filling). Those 14 electrons add to a core-like subshell that barely shields the 5d/6s electrons. Zeff for W's outer electrons is much higher than expected → outer cloud pulled in → W smaller than expected → approximately same size as Mo."

## Memory Hooks

- **Across a period: radius DECREASES (same shell, more protons, higher Zeff pulls cloud in).**
- **Down a group: radius INCREASES (new shell added, shell size dominates).**
- **Isoelectronic series: same electrons, higher Z → SMALLER radius.**
- **Cation < neutral atom < anion (for same element).**
- **Lanthanide contraction: Mo ≈ W, Zr ≈ Hf (period 5 ≈ period 6 d-block due to poor f-shielding).**

## Transfer Connections

- **chem.period.ionization-energy**: ionization energy trends are driven by the same Zeff argument — smaller, higher-Zeff atoms hold their electrons more tightly → higher IE. This node's Zeff framework transfers directly.
- **chem.bond.covalent-bonding**: bond length = sum of covalent radii; bond strength inversely correlates with bond length (shorter bond = stronger generally). Radius data from this node feeds directly into bond analysis.

## Cross-Subject Connections

- **Physics (atomic physics)**: quantum-mechanical radial distribution functions (derived from |ψ|²) predict the shell radius concept quantitatively. The Bohr radius (a₀ = 53 pm) is the simplest example; Slater's rules are the semi-empirical approximation to what the Schrödinger equation computes.
- **Materials science**: ionic radius data govern crystal structure type (radius ratio rules — which coordination geometry a crystal adopts) and lattice energy (Born-Landé equation). The lanthanide contraction explains why lanthanide ores are chemically inseparable — a major challenge in rare-earth metal production for electronics.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.period.atomic-radius`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.period.atomic-radius` as of 2026-07-23.

## Curriculum Feedback

This node correctly unlocks ionization energy, as that node uses atomic radius to rationalise IE anomalies (smaller radius → harder to remove → higher IE). The developing/analyze classification is appropriate — students must move beyond stating the trend to explaining it mechanistically via Zeff and applying it to non-obvious cases (isoelectronic series, ionic radii, lanthanide contraction). The three radius types (covalent, van der Waals, ionic) are a source of persistent confusion in exam contexts and should all be clearly defined before trend discussion begins.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
