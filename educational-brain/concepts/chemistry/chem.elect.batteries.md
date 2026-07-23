# Batteries and Fuel Cells — `chem.elect.batteries`

## Identity
- **KG ID**: chem.elect.batteries
- **Subject**: chemistry
- **Domain**: chem.elect
- **Difficulty**: developing
- **Bloom level**: understand
- **Estimated hours**: 2
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.elect.galvanic-cell
- **Unlocks**: (none — terminal node)

## Learning Objective
Distinguish primary from secondary batteries; describe the chemistry of the dry cell (Leclanché), lead-acid, and lithium-ion batteries; explain the operating principle of a hydrogen fuel cell; and evaluate efficiency and environmental considerations of each technology.

## Core Understanding
**Primary batteries (non-rechargeable)**:
The electrode reactions are not easily reversed — once the reactants are consumed, the cell is discarded.

- **Dry cell (Leclanché cell)**:
  - Anode: Zn(s) → Zn²⁺ + 2e⁻ (zinc can, negative terminal)
  - Cathode: 2MnO₂(s) + 2NH₄⁺ + 2e⁻ → Mn₂O₃(s) + 2NH₃ + H₂O (paste of MnO₂ + NH₄Cl)
  - NH₃ produced at cathode complexes Zn²⁺ (ZnCl₂·2NH₃) to prevent local ZnCl₂ precipitation. E ≈ 1.5 V.
  - Limitation: NH₄Cl paste dries out; low-temperature performance poor; internal resistance increases on discharge.
  - **Alkaline dry cell**: NH₄Cl replaced by KOH electrolyte; better performance at low temperatures and higher current drain; longer shelf life. Same Zn/MnO₂ redox couple. E ≈ 1.5 V.

**Secondary (rechargeable) batteries**:
Electrode reactions can be reversed by applying an external e.m.f. → recharging.

- **Lead-acid battery** (car battery):
  - Anode (discharge): Pb(s) + SO₄²⁻ → PbSO₄(s) + 2e⁻
  - Cathode (discharge): PbO₂(s) + SO₄²⁻ + 4H⁺ + 2e⁻ → PbSO₄(s) + 2H₂O
  - Electrolyte: dilute H₂SO₄ (38% w/v at full charge).
  - E° per cell ≈ 2.04 V; typical 12 V battery = 6 cells in series.
  - On recharging: both reactions reverse — PbSO₄ on both electrodes is converted back to Pb (negative) and PbO₂ (positive).
  - Diagnostic: specific gravity of H₂SO₄ decreases on discharge (H₂SO₄ consumed) → measured with a hydrometer to assess state of charge.
  - High energy density per unit cost; excellent high-current delivery for engine starting. Heavy; lead is toxic; H₂ gas can evolve on overcharging (explosive).

- **Lithium-ion battery (Li-ion)**:
  - Anode: graphite layers intercalated with Li⁺ → Li_x C₆ → discharge releases Li⁺ and e⁻ into circuit.
  - Cathode: LiCoO₂ (or LiFePO₄, LiMn₂O₄) → Li⁺ intercalates during discharge.
  - Overall: Li⁺ shuttles from anode to cathode on discharge (and back on charging) through an organic electrolyte/LiPF₆ solution; electrons travel through the external circuit.
  - E ≈ 3.6 V per cell (vs. 1.5 V for alkaline → fewer cells needed for equivalent voltage).
  - High energy density (~150–250 Wh/kg), light, no memory effect. Disadvantages: flammable electrolyte (thermal runaway risk), cost of cobalt (LiCoO₂), cycle life limit.

**Fuel cells**:
Unlike batteries, fuel cells are not a stored-energy device — they generate electricity continuously as long as fuel and oxidant are supplied (they are flow reactors, not sealed vessels).

- **Hydrogen fuel cell (PEM — proton exchange membrane)**:
  - Anode: H₂(g) → 2H⁺ + 2e⁻ (oxidation; Pt catalyst)
  - Cathode: ½ O₂(g) + 2H⁺ + 2e⁻ → H₂O(l) (reduction; Pt catalyst)
  - Net: H₂ + ½ O₂ → H₂O; ΔG° = −237 kJ/mol; E° = 1.23 V
  - The PEM membrane allows only H⁺ to pass (separating H₂ and O₂ gases; prevents explosive mixing); electrons flow through the external circuit.
  - Efficiency: ~40–60% (compared to ~25–35% for an internal combustion engine burning the same hydrogen). Higher efficiency arises because fuel cells convert chemical → electrical energy directly; ICE goes chemical → thermal → mechanical → electrical with losses at each step.
  - **Only byproduct is water** — zero CO₂ at the point of use. But overall environmental impact depends on how H₂ is produced: grey H₂ (steam methane reforming, high CO₂), blue H₂ (SMR + CCS), green H₂ (electrolysis using renewable electricity — the truly low-carbon pathway).
  - Limitations: platinum catalyst (expensive, scarce), H₂ storage/distribution infrastructure, membrane durability.

**Efficiency comparison**:
| Type | Typical efficiency | Byproducts |
|---|---|---|
| Dry cell | N/A (single use) | Zn/Mn waste |
| Lead-acid | ~70–80% round-trip | Pb waste, H₂SO₄ |
| Li-ion | ~90–95% round-trip | Li/Co extraction impact |
| H₂ fuel cell | ~40–60% (H₂→elect) | H₂O only (at point of use) |

## Mental Models
**Battery vs. fuel cell as reservoir vs. river**: a battery is a reservoir — it stores a fixed amount of chemical energy and is exhausted when the chemicals are used up (primary) or must be refilled by reverse reaction (secondary). A fuel cell is a river — it runs continuously as long as the fuel (H₂) flows in and the oxidant (O₂) flows in from the atmosphere. The distinction is between a closed system (battery) and an open flow system (fuel cell).

**Intercalation as a hotel**: in a Li-ion battery, Li⁺ ions check into and check out of graphite "rooms" (intercalation layers) on discharge/charging. No room is destroyed; the rooms (graphite structure) remain intact. This is why Li-ion batteries can be recharged thousands of times without structural degradation (within cycle-life limits).

## Why Students Fail
Students say the lead-acid battery "runs out of lead" on full discharge — in fact both electrodes become coated in PbSO₄ (not destroyed). They confuse the fuel cell with a combustion engine (fuel cell does NOT burn hydrogen — it reacts electrochemically without flame). They also say "fuel cells are 100% efficient" without realising Gibbs-energy and overpotential losses constrain real efficiency below 100%.

## Misconceptions
- **MC-1 (Type 3 — language contamination)**: "Recharging a battery 'refills' it with electricity — like filling a water tank." Probe: "In a lead-acid battery on discharge, what happens to the Pb and PbO₂ electrodes chemically? What drives the recharge?" Characteristic phrase: "charging puts electricity back into the battery." Intervention: recharging drives REVERSE CHEMICAL REACTIONS — it converts PbSO₄ back into Pb (at the anode) and PbO₂ (at the cathode) by forcing electrons against the spontaneous flow using an external voltage. The battery does NOT store electricity — it stores CHEMICAL potential energy. 'Electrical energy' is only the output form, not what is stored.
- **MC-2 (Type 5 — instruction-induced)**: "The hydrogen fuel cell is 100% efficient because it only produces water." Probe: "If ΔG° = −237 kJ/mol for the reaction H₂ + ½O₂ → H₂O, and E° = 1.23 V, what is the maximum theoretical efficiency?" Characteristic phrase: "only water comes out so all the energy is converted." Intervention: thermodynamic maximum efficiency of a fuel cell is ΔG/ΔH ≈ 83% (at room temperature for H₂/O₂). But real cells also suffer from: activation overpotentials at Pt electrodes, ohmic resistance losses in the membrane, concentration polarisation at high current densities. Real PEM fuel cells operate at 40–60% efficiency at useful current densities. "Only water" means zero CO₂ byproduct, NOT 100% thermodynamic efficiency.
- **MC-3 (Type 2 — perceptual intuition)**: "Hydrogen fuel cells burn hydrogen like a combustion engine." Probe: "What is the temperature in a hydrogen fuel cell? Is there a flame?" Characteristic phrase: "fuel cells combust the hydrogen electrochemically." Intervention: fuel cells operate at near room temperature (PEM: 80°C) — no flame, no combustion. The hydrogen is ELECTROCHEMICALLY oxidised at the Pt anode (H₂ → 2H⁺ + 2e⁻) — a catalytic heterogeneous electrochemical process, not a combustion reaction. The chemical energy of hydrogen is directly converted to electrical energy without the thermal step that limits combustion engine efficiency (Carnot theorem does NOT limit fuel cell efficiency — it limits heat engines).

## Analogies
**Valid**: a battery is a wound-up clockwork spring — it stores a fixed amount of energy and runs down (primary) or can be rewound by an external force (secondary). A fuel cell is a water-wheel — it converts flowing energy into useful work continuously, limited only by the flow rate of fuel and oxidant, and does not "run down" in the same way.

## Demonstrations
**Lead-acid battery monitoring**: discharge a small lead-acid cell by connecting a load; use a hydrometer or multimeter (E decreases with discharge); then recharge. Measure density of H₂SO₄ before and after discharge → density decrease visible (H₂SO₄ consumed). This directly shows the role of H₂SO₄ in the redox chemistry.

**Electrolysis-as-fuel-cell demo**: electrolyse water → collect H₂ and O₂ in two test tubes. Connect the collected gas to a simple fuel cell (or demonstrate that the gas in the H₂ tube burns with a squeaky pop, and the O₂ tube relights a glowing splint). Link back: fuel cell uses the reverse of electrolysis.

## Discovery Questions
1. "The specific gravity of a fully charged 12 V lead-acid battery is 1.28 g/mL. After discharge, it falls to 1.12 g/mL. (a) Explain why the density changes. (b) Write the cell reaction showing consumption of H₂SO₄. (c) If the battery is left fully discharged for weeks, lead sulfate crystallises and cannot be reconverted on recharge. Explain why prolonged discharge damages the battery permanently."
2. "Compare a hydrogen fuel cell (efficiency 55%) with a combustion engine burning hydrogen (efficiency 30%) for the same mass of H₂. (a) Calculate the extra work output per mole of H₂ from the fuel cell. (b) State two practical barriers that prevent fuel cells from replacing combustion engines in all vehicles today."

## Teaching Sequence
1. Recall galvanic cell principles: spontaneous redox → E_cell → electrical work. Apply to batteries.
2. Primary cells: dry cell (Leclanché) and alkaline — electrode reactions, E, limitations.
3. Secondary cells: lead-acid — discharge reactions, E per cell, 6-cell series = 12 V; recharging reverses reactions; hydrometer diagnostic. Li-ion — intercalation, high E, high energy density.
4. Fuel cells: open vs. closed system. H₂ PEM fuel cell electrode reactions, E°, only-water byproduct. Efficiency comparison with ICE (Carnot vs. electrochemical). H₂ production routes (grey/blue/green).
5. Environmental considerations: Li/Co mining impact; lead recycling rate (~99% for lead-acid in developed countries); green H₂ challenges.

## Tutor Actions
- **If student says "charging puts electricity into the battery"**: immediately ask "What substance stores the energy in a lead-acid battery?" (PbSO₄ on both plates converted back to Pb and PbO₂.) "So the battery stores CHEMICAL energy — electricity is just the output form."
- **If student says fuel cells are 100% efficient**: ask "What is ΔH for H₂ combustion vs. ΔG? Are they the same? The fraction ΔG/ΔH is the thermodynamic limit — is that 100%?" (No — ΔH includes entropy term TΔS which is not convertible.)
- **FRAGILE sign**: can name battery types and cite applications but cannot write the electrode reactions correctly or explain what is chemically reversed during recharging.

## Voice Teaching Notes
Distinguish primary vs. secondary with one question: "Can you recharge it?" Then immediately drill electrode reactions for each. In voice, lead-acid electrode reactions are the most challenging to recall verbatim — simplify: "Pb gives electrons (anode), PbO₂ takes electrons (cathode), and SO₄²⁻ is used at BOTH electrodes on discharge — that's why H₂SO₄ density drops." The symmetric sulfation of both electrodes is the memorable surprise that drives recall.

## Assessment Signals
- **Green**: writes correct electrode reactions for dry cell and lead-acid; explains Li-ion intercalation; describes H₂ fuel cell with correct membrane function (H⁺ only) and electrode reactions; distinguishes fuel cell efficiency from combustion engine (Carnot not applicable to electrochemical cells); names grey/green H₂ with CO₂ implications.
- **Amber**: knows battery types and names but writes electrode reactions incorrectly (wrong products or wrong direction for recharge); or says fuel cell is 100% efficient.
- **Red**: says recharging "fills electricity into the battery"; says fuel cells burn hydrogen; says lead-acid discharges by consuming lead (not PbSO₄ formation).
- **Probe**: "A lead-acid battery in a car has 6 cells each at 2.0 V under load. (a) What is the terminal voltage? (b) On discharge, what happens to the mass of the negative (Pb) electrode? (c) Why does the H₂SO₄ electrolyte density decrease during discharge? (d) On recharge, which electrode does current enter from the external supply?"

## Tutor Recovery Strategy
If student cannot write lead-acid electrode reactions: give the mnemonic "PbSO₄ forms at BOTH electrodes on discharge." Scaffold: "At the negative plate, Pb is oxidised — what is the sulfate product?" (PbSO₄.) "At the positive plate, PbO₂ is reduced — what is the sulfate product?" (PbSO₄ + H₂O.) "So H₂SO₄ is consumed at both plates (H⁺ and SO₄²⁻ each used). As SO₄²⁻ is removed from solution, the H₂SO₄ density drops — density measures state of charge." Build from the PbSO₄ symmetry outward.

## Memory Hooks
- **Primary vs. secondary**: "Primary = single use (dry cell, alkaline). Secondary = rechargeable (lead-acid, Li-ion) — reverse the reaction to recharge."
- **Lead-acid discharges**: "Pb → PbSO₄ (anode); PbO₂ → PbSO₄ (cathode). H₂SO₄ consumed → density drops. 6 cells × 2V = 12V."
- **Li-ion**: "Li⁺ shuttles between graphite (anode) and LiCoO₂ (cathode). E ≈ 3.6V. High energy density, no memory effect."
- **Fuel cell**: "H₂ → 2H⁺ + 2e⁻ (anode). ½O₂ + 2H⁺ + 2e⁻ → H₂O (cathode). PEM passes H⁺ only. No Carnot limit → ~55% real efficiency."

## Transfer Connections
No further chemistry concepts unlock from this terminal node. It is a synthesis endpoint for battery and fuel cell chemistry.

## Cross-Subject Connections
- **Physics / energy systems**: Ragone charts (energy density vs. power density) compare batteries and fuel cells with capacitors and combustion engines as part of energy storage technology benchmarking in engineering physics.
- **Environmental science**: lifecycle assessment (LCA) of EV vs. ICE vehicle is a major applied chemistry/environmental science topic — battery manufacture (lithium, cobalt), grid carbon intensity, and end-of-life recycling all determine whether EVs reduce net CO₂ vs. petrol. The green H₂ pathway for fuel cells involves similar LCA complexity.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.elect.batteries`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.elect.batteries` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
