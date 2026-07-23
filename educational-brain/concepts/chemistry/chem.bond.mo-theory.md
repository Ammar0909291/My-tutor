# Molecular Orbital Theory — `chem.bond.mo-theory`

## Identity
- **KG ID**: chem.bond.mo-theory
- **Subject**: chemistry
- **Domain**: chem.bond
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Estimated hours**: 4
- **Mastery threshold**: 0.80
- **Prerequisites**: chem.atomic.orbitals, chem.bond.hybridization
- **Unlocks**: chem.coord.bonding

## Learning Objective
Construct molecular orbital (MO) diagrams for homonuclear diatomics of the first and second periods, calculate bond order from MO filling, predict magnetic properties from electron pairing, and explain why O₂ is paramagnetic — a result that Lewis structures cannot produce.

## Core Understanding
MO theory treats electrons as belonging to the WHOLE molecule, not to individual atoms. Atomic orbitals (AOs) from contributing atoms combine linearly (LCAO — Linear Combination of Atomic Orbitals) to form MOs that span the entire molecule. For two AOs combining: one **bonding MO** (lower energy, constructive interference of wavefunctions, electron density BETWEEN nuclei) and one **antibonding MO** (higher energy, destructive interference, nodal plane between nuclei, denoted with *).

**MO filling rules**: same rules as for atoms — Aufbau (fill lowest energy first), Pauli exclusion (2 electrons per MO, opposite spin), Hund's rule (degenerate MOs fill singly before pairing).

**MO diagram for H₂**:
- 1s + 1s → σ1s (bonding, 2 electrons) and σ*1s (antibonding, 0 electrons).
- Bond order = ½(bonding electrons − antibonding electrons) = ½(2−0) = 1. ✓ Matches H–H single bond.
- He₂: σ1s²σ*1s² → BO = ½(2−2) = 0 → molecule does not exist. ✓

**MO diagram for second-period homonuclear diatomics** (Li₂ to Ne₂):
Energy ordering of MOs (two orderings):
- **O₂, F₂, Ne₂** (and B₂, C₂, N₂ before the 2s-2p mixing crossover): σ2s < σ*2s < σ2p < π2p (×2) < π*2p (×2) < σ*2p.
- **Li₂–N₂** (significant 2s–2p mixing lowers σ2p): σ2s < σ*2s < **π2p (×2) < σ2p** < π*2p (×2) < σ*2p.
  (π2p falls BELOW σ2p for B₂, C₂, N₂ due to sp mixing — not required in most pre-university courses; state it as a fact when needed.)

**Key second-period diatomics**:

| Molecule | Valence e⁻ | MO filling | BO | Magnetic property |
|---------|-----------|-----------|-----|------------------|
| Li₂ | 2 | σ2s² | 1 | diamagnetic |
| B₂ | 6 | σ2s²σ*2s²π2p¹π2p¹ | 1 | paramagnetic (2 unpaired) |
| C₂ | 8 | σ2s²σ*2s²π2p²π2p² | 2 | diamagnetic |
| N₂ | 10 | σ2s²σ*2s²π2p²π2p²σ2p² | 3 | diamagnetic |
| O₂ | 12 | σ2s²σ*2s²σ2p²π2p²π2p²π*2p¹π*2p¹ | 2 | **paramagnetic (2 unpaired)** |
| F₂ | 14 | …π*2p²π*2p² | 1 | diamagnetic |
| Ne₂ | 16 | all filled | 0 | does not exist |

**O₂ paramagnetism explained**: MO theory places 2 electrons in the degenerate π*2p pair with one electron each (Hund's rule) → 2 unpaired electrons → paramagnetic. Lewis structure would draw O=O with all paired electrons → wrongly predicts diamagnetic. This is MO theory's most famous experimental vindication: liquid O₂ is attracted to a magnet (demonstrable in the lab).

**Heteronuclear diatomics** (extension): for NO, CO, HF — the lower-electronegativity atom's AOs are higher in energy; MO diagram is asymmetric. CO is isoelectronic with N₂ (BO = 3, very stable triple bond); HOMO of CO is σ2p (C-centred) → CO is a Lewis base donating from C (not O) in metal carbonyls.

**Bond order and properties**: BO increases → bond length decreases, bond enthalpy increases, stretching frequency increases. This unifies MO theory with the measurable data from bond parameters.

**Paramagnetism vs diamagnetism**: paramagnetism = at least one unpaired electron (attracted to magnetic field); diamagnetism = all electrons paired (weakly repelled). MO bond order = 0 means the molecule is unstable (He₂, Ne₂).

## Mental Models
**The wave interference model**: two AOs meeting are like two waves on a string meeting: constructive interference (both positive-phase lobes overlap) → bonding MO (electron density builds between nuclei, stabilising); destructive interference (positive meets negative) → antibonding MO (a nodal plane between nuclei, destabilising). The energy stabilisation of the bonding MO and the destabilisation of the antibonding MO are equal in magnitude — electrons in bonding MOs lower energy; electrons in antibonding MOs raise it by the same amount.

**The electron counter for bond order**: BO = ½(bonding − antibonding) is simply an electron-counting rule. Each electron in a bonding MO contributes +½ to bond order; each in an antibonding MO contributes −½. The net result is the bond order. This collapses the complexity of the MO diagram to a single number that connects to the observable (bond length, enthalpy).

## Why Students Fail
Students apply Lewis structure thinking inside MO diagrams — they draw electron pairs in individual MOs rather than following Hund's rule for degenerate MOs. The key failure is filling π*2p with two electrons in the same orbital for O₂ (giving diamagnetic), instead of one in each (Hund's rule → paramagnetic).

Students confuse bond order with valence electrons. Bond order is a derived quantity from MO filling, not the number of electrons donated.

## Misconceptions
- **MC-1 (Type 6 — analogy overextension)**: "Antibonding orbitals cancel bonding orbitals, so filling them both has no net effect on the molecule." Probe: "If σ1s has 2 electrons and σ*1s also has 2 electrons, what is the bond order and does the molecule exist?" Characteristic phrase: "bonding and antibonding just cancel." Intervention: BO = ½(2−2) = 0 → He₂ does NOT exist. Antibonding electrons DO cancel the stabilising effect of bonding electrons. A molecule with BO = 0 is not a 'neutral' molecule — it simply does not form. The cancellation is not neutral: the molecule has no net stabilisation energy relative to separated atoms.
- **MC-2 (Type 5 — instruction-induced)**: "O₂ should be diamagnetic because the Lewis structure shows a double bond with all paired electrons." Probe: "Liquid oxygen is attracted to a magnet. What does that tell you about electron pairing in O₂?" Characteristic phrase: "the double bond has 4 paired electrons." Intervention: Lewis structures draw the VSEPR summary of where electrons approximately are, but they cannot represent degenerate MOs. In MO theory, the two π*2p MOs are at equal energy → Hund's rule fills each with one electron → 2 unpaired → paramagnetic. This is the most famous case where Lewis structure theory and experiment disagree: MO theory wins.
- **MC-3 (Type 1 — overgeneralization)**: "Higher bond order always means shorter bond length and the molecule is more stable overall." Probe: "N₂ has BO = 3 and O₂ has BO = 2. Is N₂ definitely more stable than O₂ in all chemical contexts?" Characteristic phrase: "BO 3 is always better than BO 2." Intervention: BO predicts bond strength (energy per bond) and bond length, not overall chemical reactivity. N₂ has a stronger bond than O₂ per molecule, but both are stable diatomics. 'More stable' depends on context — N₂ is kinetically inert (triple bond very hard to break) but that's a kinetic statement, not just a bond order statement. Also, BO comparison is only straightforward for isoelectronic species.

## Analogies
**Valid**: MO formation as two tuning forks near each other — when vibrating in phase (constructive), the sound amplitude between them is amplified (bonding MO: electron density builds between nuclei); when vibrating out of phase (destructive), the sound cancels between them with a quiet point (antibonding MO: nodal plane between nuclei). The two forks together produce exactly two modes; two AOs combine into exactly two MOs.

## Demonstrations
**O₂ paramagnetism with liquid nitrogen and a magnet**: pour liquid O₂ (cooled from liquid air or from a Dewar) near a strong magnet — the liquid O₂ is visibly attracted to and clings to the magnet's pole. N₂ (also liquid, from the same Dewar separation) is NOT attracted. This is the most direct empirical proof that MO theory is correct and Lewis structures are wrong for O₂. Available as a well-known video demonstration if liquid O₂ is not accessible.

## Discovery Questions
1. "Write the MO electron configuration for N₂⁺ (remove one electron from N₂). Calculate the bond order and state whether N₂⁺ has a stronger or weaker bond than N₂. Which orbital is the HOMO of N₂?"
2. "CO is isoelectronic with N₂ (both 10 valence electrons). Draw the MO diagram for CO and show that the HOMO is σ-type and centred primarily on carbon. Explain why metal carbonyls are formed when CO donates through C, not O."

## Teaching Sequence
1. Motivation: Lewis structures fail for O₂ (all electrons paired prediction vs. experimental paramagnetism).
2. LCAO principle: two AOs → two MOs (bonding + antibonding); energy diagram.
3. Homonuclear diatomics of period 1: H₂, He₂ — calculate BO, verify prediction vs experiment.
4. Period 2 ordering: state the two-ordering fact; derive BO for B₂, N₂, O₂, F₂.
5. O₂ in detail: Hund's rule in π*2p → 2 unpaired → paramagnetic → match with experiment.
6. Bond order–property relationship: correlate BO with bond length and enthalpy from data tables.

## Tutor Actions
- **If student fills both π*2p with same orbital before Hund's rule**: ask "Are the two π*2p orbitals at the same energy?" (yes); "What does Hund's rule say about degenerate orbitals?" (fill singly first); "So how many unpaired electrons does O₂ have?" (2) → paramagnetic conclusion follows.
- **If student confuses BO with number of bonds in Lewis structure**: draw H₂ (Lewis: 1 bond, BO = 1) and O₂ (Lewis: 2 bonds, BO = 2) side by side to show they AGREE in these cases; then use He₂ (BO = 0 by MO but Lewis would draw 1 bond if forced) to show MO gives the correct result when Lewis fails.
- **FRAGILE sign**: gets correct BO for O₂ but cannot explain WHY O₂ is paramagnetic (states it as a fact rather than deriving from Hund's rule in degenerate MOs).

## Voice Teaching Notes
MO theory is the first topic where students genuinely encounter the failure of a model they've used successfully for years (Lewis structures). Frame the O₂ result as a triumph of scientific theory over intuition — "the magnet knows Lewis structures are wrong." This emotional framing helps students commit the result to memory and appreciate why MO theory is necessary, not just more complicated.

## Assessment Signals
- **Green**: writes MO configurations for N₂, O₂, F₂; calculates BO correctly; predicts paramagnetism from unpaired count; explains the O₂ result as the failure of Lewis structures.
- **Amber**: correct BO calculations but cannot explain paramagnetism; or correct paramagnetism prediction but wrong MO filling.
- **Red**: violates Hund's rule for degenerate MOs; predicts O₂ is diamagnetic; confuses bonding MO with a lone pair.
- **Probe**: "Write the MO configuration of O₂²⁻ (the peroxide ion). Calculate BO and predict whether it is paramagnetic or diamagnetic."

## Tutor Recovery Strategy
If student cannot build the MO diagram: return to the simplest case (H₂) and build it atom by atom — two separate H 1s orbitals → combine → σ1s and σ*1s → fill with 2 electrons → BO = 1. Verify this matches the known H–H bond. Then extend to He₂ (4 electrons → fill both → BO = 0 → no molecule). The principle established with one-electron orbitals is identical to the period-2 case.

## Memory Hooks
- **BO formula**: "BO = ½(bonding − antibonding). BO = 0 → molecule doesn't exist."
- **O₂ magnetic property**: "O₂ is paramagnetic — 2 unpaired in π*2p by Hund's rule. Lewis structures get this WRONG."
- **Period-2 BO list**: "N₂: BO=3 (triple bond). O₂: BO=2 (double bond). F₂: BO=1 (single bond)." These match Lewis structures; the magnetic properties do NOT all match.

## Transfer Connections
- **chem.coord.bonding**: metal–ligand bonding in transition metal complexes uses MO-based d–p overlap (σ and π donation); the coordination bonding node extends MO ideas to multi-atom systems.

## Cross-Subject Connections
- **Physics**: the bonding/antibonding MO splitting is the molecular analogue of band formation in solid-state physics; extend to macroscopic crystal → bonding band (valence band) and antibonding band (conduction band). The band gap IS the energetic gap between the top of the valence band and the bottom of the conduction band — a direct consequence of the MO splitting extended over N atoms.
- **Biochemistry**: the Fe–O₂ binding in haemoglobin involves partial electron transfer into the π* MO of O₂ (which is why O₂ bound to haem has partial superoxide character); MO theory is required to understand the bonding in oxyhaemoglobin.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.bond.mo-theory`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.bond.mo-theory` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
