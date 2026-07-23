# d-Block Elements — General Characteristics — `chem.dblock.general`

## Identity
- **KG ID**: chem.dblock.general
- **Subject**: chemistry
- **Domain**: chem.dblock
- **Difficulty**: proficient
- **Bloom level**: understand
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.atomic.electronic-config, chem.period.periodic-properties
- **Unlocks**: chem.dblock.first-row, chem.dblock.lanthanides, chem.dblock.organometallics

## Learning Objective
Explain the general properties of d-block (transition) elements — variable oxidation states, paramagnetism, catalytic activity, coloured compounds, and complex formation — in terms of the electronic configuration of partially filled d subshells.

## Core Understanding
d-Block elements occupy Groups 3–12 and have their highest-energy electrons in a d subshell in one or more oxidation states. The term "transition element" is formally applied only to elements with an INCOMPLETE d subshell in at least one stable oxidation state — this excludes Zn, Cd, Hg (d¹⁰ in all common states) and Sc, Y (d⁰ in their only common state, +3, though Sc metal is [Ar]3d¹4s²).

**Electronic configuration**:
- General: [noble gas core] (n−1)d¹⁻¹⁰ ns²
- Exceptions: Cr ([Ar]3d⁵4s¹, half-filled d, more stable) and Cu ([Ar]3d¹⁰4s¹, fully filled d, more stable); similar exceptions in 4d and 5d series (Mo, Pd, Ag, Au etc.).
- In ion formation: d-block atoms lose ns electrons FIRST (even though ns is filled before (n−1)d), because once the atom is formed, (n−1)d is lower in energy than ns due to effective nuclear charge. This is why Fe²⁺ is [Ar]3d⁶ and Fe³⁺ is [Ar]3d⁵, not [Ar]3d⁴4s² and [Ar]3d³4s².

**Variable oxidation states**: partially filled d orbitals allow electrons to be removed at a range of energies; successive ionisation energies are close in value for d electrons. Example: Mn: +2 (MnO), +3 (Mn₂O₃), +4 (MnO₂), +6 (MnO₄²⁻), +7 (MnO₄⁻). The most common states are typically the lower ones; higher OS require strongly electronegative ligands (O²⁻, F⁻) or strong oxidising conditions.

**Paramagnetism and magnetic properties**: unpaired d electrons give a non-zero magnetic moment; the more unpaired electrons, the stronger the paramagnetism. Fe³⁺ ([Ar]3d⁵, 5 unpaired electrons) is strongly paramagnetic; Zn²⁺ ([Ar]3d¹⁰, 0 unpaired) is diamagnetic. Measured by a Gouy balance (mass in a magnetic field).

**Coloured compounds**: most transition metal compounds are coloured. Colour arises from d–d electronic transitions: electrons absorb visible-wavelength photons to jump between d orbital energy levels split by ligand field (crystal field) interactions. The energy gap (ΔO for octahedral complexes) falls in the visible range (400–700 nm). The observed colour is the complement of the absorbed colour. Complexes with d⁰ (TiO₂, white) or d¹⁰ (ZnO, white) configurations have no d–d transitions and are colourless/white.

**Catalytic activity**: transition metals and their compounds are effective catalysts because:
1. Variable OS allows them to cycle through oxidation states (redox catalysis).
2. d-orbital symmetry allows interaction with reactant orbitals (electronic factor).
3. Surface d orbitals adsorb and activate reactants (heterogeneous catalysis, as in Haber process: Fe).
4. Transition metal complexes can coordinate substrates in specific orientations (homogeneous catalysis: Wilkinson's catalyst RhCl(PPh₃)₃ for hydrogenation).

**Complex formation**: transition metal ions are Lewis acids with available d orbitals; they form coordination complexes with Lewis base ligands (donors of lone pairs). This is previewed by chem.bond.coordinate-bond and fully developed in chem.coord.werner. Complex formation alters colour, solubility, and reactivity significantly.

**Trends within the d-block** (first row, Period 4):
- Atomic radius: roughly constant or slightly decreasing across the row (d electrons provide poor shielding → Zeff increases gradually but d electron addition partially offsets → small net change).
- Ionisation energies: increase gradually but less steeply than p-block because d electrons are less penetrating.
- Melting points and hardness: generally high (except Mn, which has an anomalously complex crystal structure); maximum near the centre of the row (Cr, Mo, W — most unpaired d electrons available for metallic bonding).
- Density: higher than s-block and lighter p-block elements (smaller atomic radii, more protons per mole).

## Mental Models
**The orbital energy toolbox model**: the d subshell is like a toolbox with 5 compartments (orbitals); each can hold 2 electrons (10 max). An incompletely filled toolbox (1–9 electrons) means some compartments have partially different energy depending on surrounding ligands (colour) and unpaired electrons (magnetism). The variable number of items in the toolbox gives variable OS.

**The Zeff shielding compromise model**: going across the d-block, nuclear charge increases but each added d electron poorly shields the next (d–d shielding inefficient) and does not increase the principal quantum number — so atomic radius stays roughly constant unlike across s and p blocks. The gradually increasing Zeff produces the moderate, slow changes in d-block properties.

## Why Students Fail
Students apply the building-up principle naively and place d electrons in the outermost shell when ions form — they predict Fe²⁺ as [Ar]3d⁴4s² instead of [Ar]3d⁶. This error cascades into wrong OS assignments and wrong unpaired-electron counts.

Students claim all transition metals are always coloured — Zn²⁺ and Sc³⁺ (d⁰ and d¹⁰ or d⁰) compounds are colourless or white; the colour arises from d–d transitions requiring a PARTIALLY FILLED d subshell.

## Misconceptions
- **MC-1 (Type 5 — instruction-induced)**: "Transition metal ions lose their 3d electrons first when ionized." Probe: "Write the electron configuration of Fe³⁺." Characteristic phrase: "Fe³⁺ is [Ar]3d³4s²." Intervention: the 4s electrons are ALWAYS lost first in ionization, regardless of the Aufbau order used to fill. Fe atom = [Ar]3d⁶4s²; Fe²⁺ = [Ar]3d⁶ (4s² removed); Fe³⁺ = [Ar]3d⁵ (one 3d removed after both 4s). Rationale: once the atom is formed and core electrons are present, the 3d orbital is lower in energy than 4s due to higher Zeff from the added protons; 4s is thus the outermost and is removed first.
- **MC-2 (Type 1 — overgeneralization)**: "All transition metal compounds are coloured." Probe: "Why is ZnSO₄ solution colourless?" Characteristic phrase: "transition metals always make coloured compounds." Intervention: colour requires d–d transitions; Zn²⁺ has a full d¹⁰ configuration — no empty d orbital exists for a d electron to jump into → no d–d transition possible → colourless. Similarly, TiO₂ (Ti⁴⁺, d⁰) is white.
- **MC-3 (Type 3 — language contamination)**: "'Variable oxidation state' means the element can have any whole-number OS." Probe: "Can Mn exhibit OS = +8 or +9?" Intervention: variable OS is limited by the number of accessible d+s electrons and the stability of the resulting compound; Mn's highest common OS is +7 (all 3d⁵4s² electrons removed); OS beyond that are not accessible under normal chemical conditions.

## Analogies
**Valid**: The d subshell as a parking lot with 5 spaces (10 total with spin). When partially filled (1–9 cars), some spaces are occupied and some empty; the arrangement (number of unpaired cars) determines the magnetic response, and the energy gap between floor levels (ligand field splitting) determines what colour of light the cars absorb when jumping to a higher space.

**Anti-analogy**: Do NOT say d-block elements have "more room for electrons and that's why they have variable OS." The number of electrons that can be removed depends on ionization energies, not on the number of available orbitals.

## Demonstrations
**Oxidation state series for vanadium**: dissolve ammonium vanadate(V) in acidified water (yellow, VO₂⁺, V⁵⁺) and reduce stepwise with zinc amalgam in HCl: V⁴⁺ (blue, VO²⁺) → V³⁺ (green) → V²⁺ (violet). Four colours, four oxidation states in one experiment — directly demonstrates variable OS and links it to colour change.

**Magnetic property comparison**: use a Gouy balance or strong neodymium magnet to compare MnSO₄ (Mn²⁺, 5 unpaired d electrons, strongly paramagnetic) with ZnSO₄ (Zn²⁺, d¹⁰, diamagnetic). The difference in attraction to the magnet directly demonstrates unpaired electron effect.

**Coloured complex series**: compare [Cu(H₂O)₆]²⁺ (pale blue), [Cu(NH₃)₄(H₂O)₂]²⁺ (deep blue), and [CuCl₄]²⁻ (yellow) — same metal, different colour due to different ligand field splitting. Previews coordination chemistry while demonstrating d–d transition basis for colour.

## Discovery Questions
1. "All transition metals lose electrons from 4s before 3d when ionized. Yet the Aufbau principle says 4s fills before 3d. Why is there an apparent contradiction, and how is it resolved?"
2. "Why does chromium form a +6 oxidation state in CrO₄²⁻ (chromate) but the +6 state is strongly oxidizing, while Mn⁷⁺ in KMnO₄ is even more strongly oxidizing? Connect to d electron configuration."
3. "Titanocene dichloride (Cp₂TiCl₂) has a Ti²⁺ centre with d² configuration. Predict whether it will be paramagnetic, and how many unpaired electrons it has. (Cp = cyclopentadienyl, each as one electron-donor ligand.)"

## Teaching Sequence
1. **Define d-block and transition elements**: location in the periodic table; formal definition (incomplete d in at least one stable OS); identify which elements are excluded (Zn, Cd, Hg; Sc in practice).
2. **Electronic configurations**: write for Ti, V, Cr (exception), Mn, Fe, Co, Ni, Cu (exception), Zn; confirm ns electrons lost first in ionisation; practice Fe → Fe²⁺, Fe³⁺; Cr → Cr³⁺.
3. **Variable oxidation states**: work through Mn (+2 to +7); show that each OS corresponds to a stable compound; identify common OS for Fe, Cu, Cr.
4. **Colour and d–d transitions**: qualitative explanation — ligand field splits d orbitals, visible light absorbed for d–d jump, complementary colour observed; d⁰ and d¹⁰ exceptions.
5. **Paramagnetism**: count unpaired electrons for Fe²⁺, Fe³⁺, Cu²⁺, Zn²⁺; connect to Gouy balance result.
6. **Catalytic activity**: briefly discuss the two mechanisms (redox cycling for homogeneous; surface adsorption for heterogeneous); give Fe/Haber and V₂O₅/Contact as key examples.
7. **Complex formation**: preview ligand field and coordination number; detailed treatment deferred to chem.coord.werner.

## Tutor Actions
- **If student writes 4s last to be removed in ionization**: trace back to the energy ordering once the atom is formed (core electrons increase Zeff → 3d becomes lower in energy than 4s); confirm with Fe²⁺ configuration being [Ar]3d⁶ (experimental).
- **If student says all d-block compounds are coloured**: immediately ask about ZnSO₄; the white Zn(II) compound is the direct refutation; connect to the d¹⁰ configuration and lack of available empty d orbital for the transition.
- **If student cannot connect unpaired electrons to paramagnetism**: start from spin magnetic moment — each unpaired electron acts as a tiny magnet; paired electrons cancel each other. More unpaired = stronger net magnetic moment = stronger paramagnetism.
- **FRAGILE sign**: writes correct ion configurations for presented examples but cannot predict the configuration of an unfamiliar d-block ion in an unusual OS (e.g., Mn⁴⁺ in MnO₂).

## Voice Teaching Notes
The 4s-before-3d ionization issue is the single most commonly confused concept in d-block chemistry — address it explicitly in the first lesson; do not assume students carry a correct model from their Aufbau study.

"Variable oxidation states" is best taught with a visible experiment (vanadium colour series) rather than abstract OS numbers; the physical colour change makes the abstraction concrete.

Adult learners often ask about the philosophical question of why Aufbau fills 4s first but ionisation removes 4s first; give the orbital energy ordering explanation (Zeff effect once the nucleus is larger), not a hand-wave.

## Assessment Signals
- **Green**: writes correct configurations for Fe, Fe²⁺, Fe³⁺, Cu, Cu²⁺; identifies OS in Mn compounds from formula; predicts paramagnetic vs. diamagnetic from configuration; explains why ZnSO₄ is colourless.
- **Amber**: correct configurations for neutral atoms but errors in ions (retains 4s electrons); correct trend understanding but specific OS assignments wrong.
- **Red**: removes 3d electrons first in ionisation; claims all transition metal compounds are coloured; cannot connect unpaired electrons to magnetism.
- **Probe**: "Write the electronic configurations of (a) Cr, (b) Cr³⁺, (c) Cu²⁺. For each ion, predict paramagnetic or diamagnetic."

## Tutor Recovery Strategy
If student persistently applies ionization in the wrong order: draw an energy level diagram for the d-block atom specifically (not from Aufbau memory) showing that 3d is BELOW 4s in energy for atomic numbers > 21; the highest energy orbital is 4s and is removed first. If this diagram doesn't work, use an empirical argument: experiments show Fe²⁺ obeys the [Ar]3d⁶ configuration (confirmed by paramagnetism — 4 unpaired electrons); [Ar]3d⁴4s² would predict only 4 unpaired electrons too... walk through the count both ways and show that spectroscopy confirms the 3d⁶ configuration.

## Memory Hooks
- **4s electrons out first**: "LAST in, first out — the 4s fills last in the Aufbau but leaves first in ionisation."
- **d¹⁰/d⁰ = colourless**: "Full or empty d = no d–d transition = no colour absorption = white/colourless."
- **Variable OS from d electrons**: "Every d electron is a potential oxidation-state level — partially filled d means multiple accessible states."

## Transfer Connections
- **chem.dblock.first-row**: detailed chemistry of individual first-row d-block elements; requires the general framework established here.
- **chem.dblock.lanthanides**: the lanthanide contraction (4f shielding) is responsible for period-5/6 d-block pairs being nearly identical in size; requires understanding of why d-block properties change slowly.
- **chem.coord.werner**: coordination compounds are where complex formation and ligand field effects are developed fully; this node provides the necessary electronic configuration foundation.

## Cross-Subject Connections
- **Biology (metalloenzymes)**: haemoglobin (Fe²⁺/Fe³⁺ redox), cytochrome P450 (Fe redox cycling for drug metabolism), carbonic anhydrase (Zn²⁺ Lewis acid catalyst), cobalamin vitamin B12 (Co³⁺) — all exploit d-block properties established here.
- **Catalysis / industry**: ammonia synthesis (Fe catalyst, Haber), sulfuric acid (V₂O₅, Contact process), petroleum cracking (zeolites + transition metal oxides), hydrogenation (Ni, Pd, Pt) — the economic importance of d-block catalysis is enormous.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.dblock.general`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.dblock.general` as of 2026-07-23.

## Curriculum Feedback
None. Unlocking chem.dblock.first-row, chem.dblock.lanthanides, and chem.dblock.organometallics is appropriate; all three require the general d-block framework established here.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
