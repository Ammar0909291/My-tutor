# Galvanic Cells and Electrochemical Cells — `chem.elect.galvanic-cell`

## Identity
- **KG ID**: chem.elect.galvanic-cell
- **Subject**: chemistry
- **Domain**: chem.elect
- **Difficulty**: proficient
- **Bloom level**: apply
- **Estimated hours**: 4
- **Mastery threshold**: 0.80
- **Prerequisites**: chem.redox.activity-series, chem.thermo.cell-thermo
- **Unlocks**: (none — terminal node)

## Learning Objective
Describe the construction and operation of a galvanic cell; apply the Nernst equation to calculate cell EMF under non-standard conditions; relate cell EMF to Gibbs energy; explain the Daniell cell as a worked example; and describe concentration cells and practical electrochemical cells.

## Core Understanding
**Galvanic (voltaic) cell construction**:
A galvanic cell converts chemical energy to electrical energy via a spontaneous redox reaction occurring in two HALF-CELLS connected by:
- An external circuit (wire) through which electrons flow from anode to cathode.
- A SALT BRIDGE (or porous frit) that maintains electrical neutrality: ions migrate through it to balance charge as electrons leave one compartment and arrive in the other. Without the salt bridge, charge accumulates and the cell stops.

**Conventions (CRITICAL)**:
- ANODE: oxidation occurs; conventional current exits THROUGH solution but ELECTRONS flow TO the external circuit. Left in cell diagrams.
- CATHODE: reduction occurs; electrons arrive from external circuit. Right in cell diagrams.
- "An Ox, a Red Cat" — Anode Oxidation, Cathode Reduction.
- Cell notation: anode | anode solution || cathode solution | cathode. Single vertical bar = phase boundary; double vertical bar = salt bridge. Example: Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s).

**Daniell cell** (the canonical worked example):
- Anode half-cell: Zn(s) → Zn²⁺(aq) + 2e⁻ [oxidation, E°= −0.76 V vs SHE]
- Cathode half-cell: Cu²⁺(aq) + 2e⁻ → Cu(s) [reduction, E° = +0.34 V vs SHE]
- E°cell = E°cathode − E°anode = +0.34 − (−0.76) = +1.10 V. Positive → spontaneous.
- Observation: Zn electrode dissolves; Cu deposits at cathode; [Zn²⁺] increases; [Cu²⁺] decreases. Salt bridge carries SO₄²⁻ from cathode to anode compartment (to neutralise the accumulating Zn²⁺ charge), and/or K⁺ in the other direction.

**Nernst equation**:
For the cell reaction: E_cell = E°_cell − (RT/nF) ln Q
At 298 K: E_cell = E°_cell − (0.0257/n) ln Q = E°_cell − (0.0592/n) log Q
- R = 8.314 J mol⁻¹ K⁻¹; T = temperature in K; n = moles of electrons transferred per mole of reaction as written; F = 96,485 C mol⁻¹; Q = reaction quotient.
- At equilibrium: E_cell = 0 and Q = K_eq → 0 = E°_cell − (RT/nF) ln K → **ln K = nFE°/RT** or **log K = nE°/0.0592** at 298 K.
- Increasing [reactant species] or decreasing [product species] → Q decreases → E_cell increases (Nernst favours the forward reaction when far from equilibrium).
- pH effect: for half-cells involving H⁺, pH affects E. Example: MnO₄⁻/Mn²⁺ half-cell depends strongly on [H⁺] (see the 8H⁺ in the half-equation).

**Relationship between EMF and Gibbs energy**:
ΔG° = −nFE°_cell
ΔG = −nFE_cell (non-standard conditions)
- ΔG° < 0 ↔ E°_cell > 0 ↔ spontaneous. Confirmed from the linking equation.
- At equilibrium: ΔG = 0, E_cell = 0.
- Temperature effect on E°: ΔG° = ΔH° − TΔS° and E° = −ΔG°/nF → the temperature coefficient dE°/dT = ΔS°/nF.

**Concentration cells**:
- Both half-cells have the same electrode material and redox couple but at DIFFERENT concentrations. E°_cell = 0 (same half-reactions), but E_cell ≠ 0 due to the Nernst equation.
- Example: Cu | Cu²⁺(0.001 M) || Cu²⁺(1.0 M) | Cu. E_cell = −(0.0592/2) log(0.001/1.0) = −(0.0296)(−3) = +0.0888 V. The cell with higher [Cu²⁺] is the cathode (is reduced preferentially). Concentration cells drive ions from high to low concentration.
- Biological relevance: nerve impulses driven by concentration gradients (Na⁺ out, K⁺ in) across the cell membrane are electrochemical concentration cells.

**Practical cells**:
- **Lead-acid battery**: Pb(s) | H₂SO₄(aq) | PbO₂(s); discharge: Pb → PbSO₄ (anode); PbO₂ → PbSO₄ (cathode); E° ≈ 2.0 V per cell (12 V battery = 6 cells). Rechargeable: reverses the reaction. Self-discharge occurs by loss of SO₄²⁻ from the electrolyte as PbSO₄ precipitates onto electrodes — ageing mechanism.
- **Lithium-ion battery (brief)**: Li⁺ intercalation/deintercalation at graphite anode (LiC₆ → C + Li⁺ + e⁻) and metal oxide cathode (e.g. LiCoO₂). High energy density; no aqueous electrolyte (organic solvent); thermal runaway risk at overcharge. E° ≈ 3.6–4.2 V.
- **Fuel cells**: H₂ oxidised at anode; O₂ reduced at cathode; H₂O is the product; E° = 1.23 V. No Carnot efficiency limit (compared to heat engines) — theoretical efficiency >83%.

## Mental Models
**Galvanic cell as a two-room chemical race**: electrons "race" through the external wire from the room where oxidation is happening (anode, Zn dissolving) to the room where reduction is happening (cathode, Cu depositing). The salt bridge is the corridor that allows ions to move between rooms to keep the electrical balance. If you block the corridor (remove the salt bridge), the race stops.

**Nernst equation as a "Q vs. K" thermometer**: E°_cell tells you the voltage at standard conditions (all concentrations = 1 M). The Nernst term adjusts for the actual reaction quotient Q: if Q < K (far from equilibrium, lots of reactants), the cell has more energy to release → E_cell > E°_cell. If Q = K (equilibrium), E_cell = 0 — the cell is exhausted.

## Why Students Fail
Students reverse the anode/cathode assignment or the electron flow direction. They apply E°_cell = E°_cathode − E°_anode as "larger minus smaller" rather than "cathode minus anode", leading to sign errors for electrodes where both are negative (e.g. Zn vs. Ni). They forget that Q in the Nernst equation uses the SAME convention as K (products over reactants as written), and they confuse n (moles of electrons per mole of reaction) with the total electrons transferred.

## Misconceptions
- **MC-1 (Type 5 — instruction-induced)**: "The more reactive (more negative E°) metal is always the anode." Probe: "If you construct a cell from Zn (E° = −0.76 V) and Al (E° = −1.66 V), which is the anode?" Characteristic phrase: "the anode has the lower (more negative) E° always." Intervention: The ANODE is where OXIDATION occurs — which is the LESS NOBLE (lower E°) electrode, which DOES lose electrons. So the more negative E° = lower reduction potential = more easily oxidised = ANODE. In the Zn/Al cell, Al (E° = −1.66 V) is the anode (oxidised), Zn is the cathode (reduced). The statement is actually correct — but students often apply it incorrectly by forgetting that the more negative E° standard reduction potential corresponds to the MORE READILY OXIDISED (anode) electrode. The common error is confusing "more negative" with "cathode". Memory anchor: anode = more negative E°; cathode = more positive E°.
- **MC-2 (Type 4 — notation-induced)**: "In the Nernst equation, n = the total number of electrons in the balanced equation as you see it." Probe: "For the Daniel cell (Zn + Cu²⁺ → Zn²⁺ + Cu), n = ?" Characteristic phrase: "n = number of electrons exchanged per molecule, but confusing 2e per atom with 4 for the overall." Intervention: n = the STOICHIOMETRIC number of MOLES of electrons transferred per mole of reaction AS WRITTEN. For Zn + Cu²⁺ → Zn²⁺ + Cu: Zn loses 2e⁻ per formula unit, Cu²⁺ gains 2e⁻ → n = 2. If the equation were doubled (2Zn + 2Cu²⁺ → ...), n = 4 — E°_cell is unchanged (intensive) but ΔG° is doubled. The Nernst equation's E_cell is intensive (doesn't change with how many moles you write); only ΔG = −nFE depends on n.
- **MC-3 (Type 3 — language contamination)**: "The salt bridge carries electricity (electrons) between the half-cells." Probe: "What species move through the salt bridge, and what is their purpose?" Characteristic phrase: "electrons go through the salt bridge." Intervention: ELECTRONS travel only through the EXTERNAL WIRE (metal conductor). The salt bridge carries IONS (typically K⁺ and NO₃⁻ or K⁺ and Cl⁻, chosen to be electrochemically inert). Its function is to maintain ELECTRICAL NEUTRALITY in both half-cells. As Zn²⁺ accumulates in the anode compartment (building up positive charge), NO₃⁻ migrates from the salt bridge into that compartment; as Cu²⁺ is depleted from the cathode compartment (reducing positive charge), K⁺ migrates in. The salt bridge is an ionic conductor, not an electronic conductor.

## Analogies
**Valid**: a galvanic cell is like a controlled avalanche machine. The potential energy difference (E°_cell) is the height difference; electrons rolling through the wire are the avalanche; the salt bridge is a second path that prevents charge from building up at the base (without it, the avalanche stops). The more height (E°_cell), the more electrical energy available (ΔG = −nFE°_cell).

## Demonstrations
**Daniell cell construction**: build a working Daniell cell (Zn rod in ZnSO₄, Cu rod in CuSO₄, connected by a salt-bridge of KNO₃-soaked filter paper). Connect to a voltmeter — students measure ≈1.1 V. Connect to an LED — students observe it light up. Remove the salt bridge — voltage drops to zero immediately. This single demonstration covers construction, measurement, salt-bridge function, and spontaneity.

**Concentration cell**: same Cu/Cu²⁺ setup in two beakers, one with 0.001 M CuSO₄ and one with 1.0 M CuSO₄. Measure the small but real voltage — students compute it from the Nernst equation and compare to the observed value. Connect the E°_cell = 0 insight to the presence of a measurable E_cell via the Nernst log term.

## Discovery Questions
1. "A galvanic cell consists of Fe(s) | Fe²⁺(0.010 M) || Ag⁺(2.0 M) | Ag(s). (a) Write the cell reaction. (b) Calculate E°_cell and E_cell at 298 K. (c) Calculate ΔG° and K_eq. (Given: E°(Fe²⁺/Fe) = −0.44 V; E°(Ag⁺/Ag) = +0.80 V.)"
2. "Explain why the EMF of a hydrogen-oxygen fuel cell is 1.23 V but the actual efficiency of a real fuel cell can approach 60–70% while a petrol engine is limited to ~25%. What does 'efficiency' mean in each case?"

## Teaching Sequence
1. Recap standard electrode potentials from chem.redox.activity-series.
2. Galvanic cell construction: two half-cells, salt bridge, external circuit; anode/cathode convention.
3. Daniell cell as worked example: cell notation, E°_cell calculation, what each electrode does.
4. ΔG = −nFE°_cell; sign convention confirmation.
5. Nernst equation derivation from ΔG = ΔG° + RT ln Q; full expression and the 298 K simplification.
6. Nernst equation applied: Q expressions; E_cell at various concentrations; equilibrium (E = 0) → ln K = nFE°/RT.
7. Concentration cells: E° = 0 but E_cell ≠ 0; calculation; biological example.
8. Practical cells: lead-acid battery (qualitative), Li-ion (principles), fuel cell.

## Tutor Actions
- **If student confuses anode/cathode**: draw the cell diagram with the cell notation convention (anode left, cathode right). Anchor with "An Ox, a Red Cat." Then check: "which electrode is being oxidised? That's the anode."
- **If student makes Nernst Q error**: extract Q from the balanced cell reaction (same convention as any K: products/reactants). Write Q explicitly before substituting into the Nernst equation.
- **FRAGILE sign**: calculates E°_cell correctly but cannot apply the Nernst equation or cannot identify n for a non-obvious cell.

## Voice Teaching Notes
Salt bridge function is the most-missed conceptual element in voice sessions (students say "electrons go through") — address it explicitly and early: "The salt bridge carries IONS, not electrons. Electrons go through the wire only." Then ask: "if the salt bridge carries ions, why do we need it?" Students who understand will say "to maintain charge balance" — students who don't will say "to carry electrons from one side to the other." The probe distinguishes them cleanly.

## Assessment Signals
- **Green**: draws and labels a galvanic cell correctly (anode oxidation left, cathode reduction right, salt bridge, electron flow direction); calculates E°_cell = E°_cathode − E°_anode; applies Nernst equation with correct n and Q; derives K from E°; explains the salt bridge function; describes the Daniell cell.
- **Amber**: correct E°_cell and ΔG° calculations but cannot apply Nernst equation correctly; or reverses salt bridge function.
- **Red**: says electrons flow through the salt bridge; says cathode is where oxidation occurs; applies E°_cell = E°_anode − E°_cathode.
- **Probe**: "Cell: Sn(s) | Sn²⁺(0.100 M) || Pb²⁺(0.001 M) | Pb(s). E°(Sn²⁺/Sn) = −0.14 V; E°(Pb²⁺/Pb) = −0.13 V. (a) Identify anode and cathode. (b) Calculate E°_cell. (c) Calculate E_cell using the Nernst equation. (d) Is the cell spontaneous under standard conditions? Under the stated conditions?"

## Tutor Recovery Strategy
If student cannot apply Nernst: strip the formula to first principles. "Q is just the reaction quotient — products over reactants. Write Q for the cell reaction. Now: if Q > 1 (more products than reactants), the forward reaction is less favourable → E_cell < E°. If Q < 1 (more reactants), the forward reaction is more favourable → E_cell > E°. The Nernst equation just makes this quantitative." Build from the qualitative direction first, then introduce the logarithm.

## Memory Hooks
- **Anode/cathode**: "An Ox (Anode Oxidation). Red Cat (Reduction Cathode). Anode left, cathode right in cell notation."
- **E°_cell**: "E°_cell = E°_cathode − E°_anode. Positive = spontaneous."
- **ΔG relationship**: "ΔG° = −nFE°_cell."
- **Nernst**: "E = E° − (0.0592/n) log Q at 298 K."
- **Equilibrium**: "When E_cell = 0: log K = nE°/0.0592."
- **Salt bridge**: "Carries IONS (not electrons) to maintain charge neutrality."

## Transfer Connections
No further chemistry concepts unlock from this terminal node. It is a synthesis endpoint for electrochemistry.

## Cross-Subject Connections
- **Biochemistry**: the mitochondrial electron transport chain is a biological galvanic cell — electrons flow from NADH (low E°) through a series of cytochrome complexes to O₂ (high E°); the ΔE across each step drives proton pumping (ATP synthesis). E°_cell for the overall reaction (NADH + ½O₂ → NAD⁺ + H₂O) ≈ 1.14 V → ΔG° = −nFE° = −2 × 96485 × 1.14 ≈ −220 kJ mol⁻¹ per NADH.
- **Engineering**: corrosion is an unwanted galvanic cell (iron + atmospheric oxygen in the presence of water → spontaneous cell → rusting). Cathodic protection sacrifices a more active metal (zinc, magnesium) as the anode to protect steel — an intentional galvanic cell where the engineering goal is to keep the iron as the cathode.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.elect.galvanic-cell`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.elect.galvanic-cell` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
