# First Law of Thermodynamics — `chem.thermo.first-law`

## Identity

- **KG ID**: chem.thermo.first-law
- **Subject**: Chemistry
- **Domain**: Thermodynamics (chem.thermo)
- **Difficulty**: developing
- **Bloom level**: understand
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.thermo.system
- **Unlocks**: chem.thermo.enthalpy, chem.thermo.entropy, chem.thermo.heat-capacities
- **Cross-links**: none

## Learning Objective

Students can state the first law of thermodynamics (ΔU = q + w), apply the sign conventions for q (heat) and w (PV work) from the system's perspective, calculate work done during expansion/compression (w = −PextΔV), distinguish between qv (heat at constant volume = ΔU) and qp (heat at constant pressure), and apply ΔH = ΔU + ΔnRT to interconvert ΔH and ΔU for reactions involving gases.

## Core Understanding

The first law states that the total internal energy of an isolated system is conserved: ΔU = q + w. Energy can change form (heat, work) but not be created or destroyed.

**Sign conventions (from the system's perspective)**:
- q > 0: heat flows INTO the system (endothermic); system gains energy.
- q < 0: heat flows OUT of the system (exothermic); system loses energy.
- w > 0: work done ON the system (compression); surroundings do work on system.
- w < 0: work done BY the system (expansion); system does work on surroundings.

**PV work**: w = −PextΔV. A system expanding against external pressure Pext increases its volume (ΔV > 0), does work on surroundings → w is negative (system loses energy as work). Compression: ΔV < 0 → w is positive (system gains energy).

**qv vs. qp**: At constant volume (bomb calorimeter), no PV work is done → ΔU = qv. At constant pressure (coffee cup calorimeter, most lab reactions open to atmosphere), ΔH = qp = ΔU + PΔV. For ideal gases: ΔH = ΔU + ΔngasRT, where Δngas is the change in moles of gas.

## Mental Models

**The bank account model (extended from chem.thermo.system)**: ΔU = q + w is the account balance equation. q is cash deposited (heat in) or withdrawn (heat out). w is electronic transfers in (work on system) or out (work by system). ΔU is the change in balance — total.

**The expanding balloon as work-doer**: When a gas expands, it pushes back the atmosphere — it does work against external pressure. This energy leaves the system as work, reducing the system's internal energy. The balloon's cooler temperature after expansion (like expanding aerosol cans) is the observable consequence.

**PV work as force × distance**: Pressure = force/area; volume = area × distance. PΔV = (force/area)(area × distance) = force × distance = work. The energy expelled as PV work is real mechanical energy transferred to the surroundings.

## Why Students Fail

1. **Sign convention reversal**: Students flip the sign of w (thinking w is positive when the system expands, intuitively "the gas does more work"). The sign convention is from the system's energy gain/loss perspective.
2. **ΔH = qp only at constant pressure**: Students apply ΔH = qp to bomb calorimeter (constant volume) problems, getting incorrect answers.
3. **ΔU vs. ΔH conflation**: Students treat ΔU and ΔH as the same quantity; they differ by the PV work term.
4. **Δngas = coefficient sum error**: Students count all species (not just gases) when computing Δngas in ΔH = ΔU + ΔngasRT.

## Misconceptions

**MC-1 — Expansion means w is positive** (Type 5, instruction-induced)
- *Mechanism*: "The gas does work" and "the system gains work" sound like the same thing. Students confuse "doing work" (exerting force) with "gaining energy from work."
- *Diagnostic probe*: "A gas expands from 1 L to 3 L against a constant external pressure of 2 atm. Is w positive or negative for the gas? Calculate w."
- *Characteristic phrase*: "The gas did work by expanding, so w is positive."
- *Repair*: w = −Pext × ΔV = −2 atm × (3 − 1) L = −4 L·atm (convert to J: × 101.3 = −405 J). The gas's energy decreases (w is negative) because it gave energy to the surroundings. "Doing work" on the surroundings costs the system energy.

**MC-2 — ΔH equals ΔU always** (Type 5, instruction-induced)
- *Diagnostic probe*: "The combustion of methane produces 803 kJ/mol at 25 °C (constant pressure). Is this ΔH or ΔU? Are they the same for this reaction?"
- *Characteristic phrase*: "ΔH and ΔU are just different names for the same thing."
- *Repair*: CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l). Δngas = 1 − 3 = −2 mol. ΔH = ΔU + ΔngasRT = ΔU + (−2)(8.314)(298)/1000 = ΔU − 4.96 kJ. They differ by 4.96 kJ for this reaction.

**MC-3 — qp and qv differ only in name** (Type 3, language contamination)
- *Mechanism*: Students see both as "heat" and don't track which quantity equals which thermodynamic state function.
- *Diagnostic probe*: "A combustion reaction in a bomb calorimeter releases 500 kJ. Is this ΔH or ΔU? What additional information would you need to calculate ΔH?"
- *Repair*: Bomb calorimeter = constant volume → qv = ΔU. To get ΔH, you need Δngas and T: ΔH = ΔU + ΔngasRT.

## Analogies

**Compression pump analogy**: A bicycle pump warms up when you compress air. You're doing work ON the gas (positive w from gas perspective) → gas's internal energy increases → temperature rises. Conversely, aerosol cans cool when gas expands — gas does work ON surroundings (negative w) → gas's internal energy decreases → temperature drops.

## Demonstrations

**Demonstration 1 — Work from gas expansion**
- Use a syringe filled with gas. Compress quickly (adiabatic) and check the temperature rise with a thermometer or by touch. Release and feel cooling. The temperature change is from w, not q (adiabatic process, q ≈ 0, so ΔU = w).

## Discovery Questions

1. "For the reaction N₂(g) + 3H₂(g) → 2NH₃(g), ΔH = −92 kJ/mol. Calculate ΔU at 298 K." (Targets: Δngas = 2 − 4 = −2; ΔH = ΔU + ΔngasRT → ΔU = ΔH − ΔngasRT = −92 − (−2)(8.314×10⁻³)(298) = −92 + 4.96 = −87 kJ/mol.)
2. "A gas expands against a constant pressure of 1.50 atm from 2.00 L to 5.00 L while absorbing 400 J of heat. Calculate ΔU." (Targets: w = −PextΔV = −1.50 × 3.00 = −4.50 L·atm × 101.3 J/(L·atm) = −456 J; ΔU = q + w = 400 + (−456) = −56 J.)
3. "Why does the first law require no known exceptions, yet perpetual motion machines (which would violate it) have never been built?" (Targets: the first law is a statement of conservation of energy — one of the most thoroughly tested principles in science. A PMM would create energy from nothing, which contradicts every calorimetric measurement ever made.)

## Teaching Sequence

1. Review from chem.thermo.system: system boundary, heat and work as energy flows, state functions.
2. State the first law: ΔU = q + w. Explain the state function nature of U and the path function nature of q and w.
3. Establish sign conventions carefully — from the system's perspective. Use the bank account model: q > 0 = deposit into system; w > 0 = deposit into system (compression = surroundings do work on system).
4. Derive PV work: w = −PextΔV. Work through Demonstration 1 and Discovery Question 2.
5. Constant volume: ΔV = 0 → w = 0 → ΔU = qv. Introduce the bomb calorimeter.
6. Constant pressure: ΔH = qp = ΔU + PΔV. Introduce the coffee cup calorimeter.
7. For gas reactions: PΔV = ΔngasRT (from ideal gas law). Derive ΔH = ΔU + ΔngasRT.
8. Work Discovery Question 1.

## Tutor Actions

- If student says expansion gives positive w → MC-1 repair: define w as energy INTO the system; expansion pushes energy OUT (negative w).
- If student says ΔH = ΔU always → MC-2 repair: compute ΔngasRT for any gas-phase reaction to show the difference.
- If student applies qp to bomb calorimeter → MC-3 repair: name the instrument, state which variable is constant, identify the correct thermodynamic quantity.
- Advance when student can correctly compute ΔU from q and w, and convert between ΔH and ΔU using Δngas.

## Voice Teaching Notes

The sign convention for work is the highest source of conceptual error in this topic. The IUPAC convention (ΔU = q + w, where w is work done ON the system) is used here — physics often uses the chemistry convention reversed (ΔU = q − w, where w is work done BY the system). Alert students to this difference when they encounter physics textbooks.

Memorise the sign convention in physical terms: "Compression pumps energy into the gas (positive w). Expansion releases energy from the gas (negative w)." This physical statement is memorable and avoids the pure sign rule.

## Assessment Signals

**Mastery gate**:
1. Student correctly computes w = −PextΔV for three cases (expansion, compression, constant volume).
2. Student correctly applies ΔU = q + w with correct signs.
3. Student correctly identifies which calorimeter measures qv (bomb) and which measures qp (coffee cup).
4. Student correctly computes ΔU from ΔH and Δngas for a given reaction.

**FRAGILE signal**: student correctly applies the formula but reverses signs in specific cases (always negative when positive should be used, or vice versa). Systematic — needs targeted sign-convention drill.

**MISCONCEIVING signal**: student says ΔU = q + w and then writes positive w for gas expansion. The sign convention must be retaught from the physical definition: compression = energy in = positive.

## Tutor Recovery Strategy

If stuck:
1. For sign convention: return to the physical definition — "work that increases the system's energy is positive." Compression decreases volume → surroundings push on system → energy in → w > 0. Draw the boundary and arrow directions.
2. For ΔH vs. ΔU: verify that the student can correctly compute ΔngasRT for a simple reaction. If they can't count Δngas correctly, address that first.
3. For calorimeter confusion: pair each calorimeter with its name and its defining constraint: "bomb calorimeter = sealed = constant V = qv = ΔU." "Coffee cup = open = constant P = qp = ΔH." Repeat until automatic.

## Memory Hooks

- **ΔU = q + w**: "U depends on heat and work." First law in one equation.
- **w = −PextΔV**: "Expansion (ΔV > 0) gives negative w — system gives energy away."
- **ΔH = ΔU + ΔngasRT**: "Enthalpy adds back the PV work for gas-producing reactions."
- **"Bomb calorimeter = constant V = ΔU. Coffee cup = constant P = ΔH."**

## Transfer Connections

- **chem.thermo.enthalpy**: enthalpy is defined as H = U + PV; ΔH = qp follows from the first law at constant pressure.
- **chem.thermo.heat-capacities**: heat capacities at constant volume (Cv) and constant pressure (Cp) differ by R for ideal gases — a direct consequence of the first law.
- **chem.thermo.entropy**: the second law and entropy build on the first law's energy bookkeeping.

## Cross-Subject Connections

- **Physics (phys.therm.first-law)**: the first law of thermodynamics is identical in physics, where it is often written as ΔU = Q − W (work done BY the system is positive in physics convention — alert students to this).

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.thermo.first-law`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.thermo.first-law` as of 2026-07-23.

## Curriculum Feedback

None. Correct dependencies and unlocks.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
