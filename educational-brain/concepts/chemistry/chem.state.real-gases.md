# Real Gases and van der Waals Equation — `chem.state.real-gases`

## Identity

- **KG ID**: chem.state.real-gases
- **Subject**: Chemistry
- **Domain**: States of Matter (chem.state)
- **Difficulty**: proficient
- **Bloom level**: analyze
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.state.gas-laws
- **Unlocks**: chem.state.phase-diagram
- **Cross-links**: none

## Learning Objective

Students can explain why real gases deviate from ideal behaviour using intermolecular forces and finite molecular volume; interpret the compressibility factor Z in terms of attractive and repulsive forces; apply the van der Waals equation (P + a/V²)(V − b) = RT to calculate corrections to ideal gas behaviour; explain conditions (high P, low T) under which deviations are largest; and qualitatively explain gas liquefaction and critical constants.

## Core Understanding

**Ideal gas assumptions violated by real gases**:
1. Ideal: gas particles have no volume (point particles). Real: molecules have finite volume — at high pressures, the actual space available for motion is less than the container volume.
2. Ideal: no intermolecular forces. Real: attractions (van der Waals / London / dipole-dipole) slow down molecules approaching the walls → fewer/weaker impacts → lower pressure than ideal.

**Compressibility factor Z = PV/(nRT)**:
- Z = 1 for ideal gas.
- Z < 1 at moderate pressures: attractive forces dominate (molecules pulled back before they reach the walls → lower pressure → lower PV product). Most real gases at moderate pressures.
- Z > 1 at high pressures: repulsive forces dominate (finite volume of molecules means they hit walls more often than ideal) → higher PV than ideal.
- Z > 1 at very high T (for H₂, He at all practical pressures): these gases have negligible intermolecular attractions; repulsion (molecular volume effect) always wins.

**Van der Waals equation** (corrected ideal gas law):
(P + a/Vm²)(Vm − b) = RT  [per mole, Vm = molar volume]

- **a/Vm²**: pressure correction — adds back the "lost" pressure from intermolecular attractions (a reflects the strength of intermolecular attractions). Units: Pa·m⁶·mol⁻² or L²·atm·mol⁻².
- **b**: volume correction — subtracts the volume excluded by molecules themselves (b ≈ 4 × actual molecular volume per mole). Units: L·mol⁻¹ or m³·mol⁻¹.

Significant deviations at **high P** (molecules are close, exclusion volume matters; a/Vm² term large) and **low T** (molecules slow, intermolecular attractions not overcome by KE; a term dominates).

**Critical constants**: at the critical point (Tc, Pc, Vc), a gas cannot be liquefied by pressure alone regardless of how high the pressure is raised — above Tc, only a supercritical fluid exists. Below Tc, sufficient pressure liquefies the gas. Related to van der Waals constants: Tc = 8a/(27Rb), Pc = a/(27b²), Vc = 3b.

## Mental Models

**The crowded room model**: ideal gas = infinite, empty room where people (molecules) don't interact. Real gas = finite room with some sticky attraction between people (intermolecular forces) AND each person takes up real space (finite volume). Both effects matter at high crowding (high pressure): exclusion dominates (can't walk through people → Z > 1), but attraction can also dominate at intermediate crowding (people gravitating toward each other → lower pressure than expected → Z < 1).

**The van der Waals equation as two patches**: the ideal gas law has two flaws for real gases. The a/Vm² patch fixes the pressure (accounting for internal attraction). The −b patch fixes the volume (subtracting excluded volume). Each patch increases accuracy at the cost of two gas-specific constants.

## Why Students Fail

1. **Which direction Z deviates**: students expect real gases always have Z < 1 (attraction dominates). In reality Z > 1 at high P (exclusion dominates) and for gases with negligible attraction (H₂, He) even at moderate P.
2. **Conditions for maximum deviation**: students state "high temperature and low pressure" (ideal conditions!) rather than "high pressure and low temperature" for maximum real gas deviations.
3. **Van der Waals a vs. b roles**: students confuse which constant addresses which non-ideal effect. a = attractions (pressure correction); b = molecular volume (volume correction). A helpful mnemonic: **a** corrects **a**ttractions; **b** corrects **b**ulk.
4. **Critical temperature interpretation**: students think above Tc the gas is automatically a vapour. Above Tc, neither gas nor liquid is the correct label — it is a supercritical fluid with intermediate properties.

## Misconceptions

**MC-1 — Real gases always have lower pressure than ideal (Z < 1 always)** (Type 1, overgeneralization)
- *Mechanism*: students learn that attractive forces reduce the impact of molecules on the walls → lower pressure → Z < 1, and overgeneralise.
- *Diagnostic probe*: "At very high pressures (10,000 atm), is Z for nitrogen likely to be greater than or less than 1? What force dominates?"
- *Characteristic phrase*: "Attractions always pull molecules back, so real gases always have lower pressure."
- *Repair*: at high pressures, the molecules are so closely packed that their own finite volumes dominate. The effective free volume Vm − b becomes much smaller than Vm → PVm/(RT) > 1 → Z > 1. The repulsive forces (steric exclusion) exceed the attractive forces when molecules are this close.

**MC-2 — Deviations are largest at high T and low P** (Type 5, instruction-induced)
- *Mechanism*: students confuse "conditions where ideal gas law works well" (high T, low P) with "conditions where deviations are largest."
- *Diagnostic probe*: "A sample of CO₂ deviates significantly from ideal behaviour. Under which conditions is the deviation smallest? Under which is it largest?"
- *Characteristic phrase*: "Deviations are largest at high temperature because the gas has more energy."
- *Repair*: the ideal gas law works best (smallest deviations) at high T (molecules have enough KE to overcome attractions) and low P (molecules are far apart — negligible exclusion and negligible attraction). Deviations are LARGEST at low T (attractions not overcome, Z < 1 can be large) and high P (exclusion volume matters, Z > 1).

**MC-3 — The van der Waals a constant corrects for molecular volume** (Type 4, notation-induced)
- *Diagnostic probe*: "If you compare two gases with the same a value but different b values, what physical property differs between them?"
- *Characteristic phrase*: "a is the volume correction because a is the first letter in the equation."
- *Repair*: a = pressure correction for intermolecular **a**ttractions; b = **b**ulk (excluded) volume correction. Larger a → stronger intermolecular attractions (CO₂: a = 3.59 vs. He: a = 0.034 — CO₂ has much stronger van der Waals forces). Larger b → larger molecular size (b ≈ 4 × actual molecular volume per mole).

## Analogies

**The attractions-as-rubber-bands model**: imagine a gas molecule heading toward the container wall to exert a collision force. Other molecules behind it are connected to it by tiny rubber bands (van der Waals attractions). The rubber bands slow it down — it hits the wall with less force. The measured pressure is lower than ideal. This is the a/Vm² correction.

**The passengers-in-a-subway model**: ideal gas molecules are infinitely small people in a subway car. Real gas molecules are large people. Packing the car with large people: the available standing room (V − nb) is much less than the car volume (V). Equivalently, the effective pressure on the walls is higher because the molecules have less room to manoeuvre — Z > 1 at high density.

## Demonstrations

**Demonstration 1 — Z vs. P plot**
- Show a standard PV/RT vs. P plot for N₂, H₂, CO₂, and ideal gas. Students observe: ideal gas is Z = 1 (horizontal line); N₂ dips below 1 at moderate P (attraction wins) then rises above 1 at high P (exclusion wins); CO₂ dips lower (stronger attractions); H₂ is always above 1 (no significant attractions, exclusion dominates immediately). Interpret each feature in terms of a and b.

## Discovery Questions

1. "The van der Waals constants for CO₂ are a = 3.59 L²·atm·mol⁻², b = 0.0427 L·mol⁻¹. Calculate the pressure of 1.00 mol of CO₂ in a 1.00 L vessel at 400 K using (a) the ideal gas law and (b) the van der Waals equation. Explain the direction of the difference." (Targets: (a) P_ideal = nRT/V = 1×0.08206×400/1 = 32.8 atm; (b) P_vdW = nRT/(V − nb) − an²/V² = 0.08206×400/(1 − 0.0427) − 3.59/1 = 34.26 − 3.59 = 30.7 atm. P_vdW < P_ideal at this condition (attractions dominate at 400 K, 1 L).)
2. "He has a = 0.034 L²·atm·mol⁻², CO₂ has a = 3.59. Explain why He behaves more ideally than CO₂ at 25 °C." (Targets: He has negligible intermolecular attractions (a ≈ 0); the only non-ideal effect is the finite size of He atoms (b = 0.0238), which is small at low pressures. CO₂ has strong London forces + quadrupole interactions (large a) — these pull molecules toward each other at the walls, reducing pressure relative to ideal. At 25 °C, CO₂'s attraction effect is significant; He's is negligible.)
3. "Why can CO₂ be stored as a liquid in a fire extinguisher at room temperature (25 °C), while N₂ cannot be liquefied by pressure alone at 25 °C?" (Targets: Tc(CO₂) = 31.1 °C > 25 °C, so 25 °C is below Tc → CO₂ can be liquefied by compression. Tc(N₂) = −147 °C, so 25 °C is far above Tc → no amount of pressure will liquefy N₂ at room temperature; a supercritical fluid would form instead.)

## Teaching Sequence

1. Review from chem.state.gas-laws: ideal gas assumptions (point particles, no forces). Pose the question: "What goes wrong with these assumptions for real gases?"
2. Introduce two failures: finite volume and intermolecular attractions. Connect to intermolecular forces (already known from pure-substances, states-of-matter).
3. Introduce Z = PV/(nRT). Establish Z = 1 for ideal gas. Work through the Z vs. P plot (Demonstration 1). Address MC-1 and MC-2.
4. Derive the van der Waals correction terms qualitatively (not from statistical mechanics): a/Vm² adds back lost pressure; Vm − b subtracts excluded volume. Work Discovery Question 1.
5. Address MC-3: a = attractions, b = bulk volume. Compare a and b values for He, N₂, CO₂.
6. Introduce critical constants: Tc, Pc, Vc. Explain liquefaction condition (T < Tc). Work Discovery Question 3.

## Tutor Actions

- If student says Z < 1 always → MC-1 repair: draw the Z vs. P plot; mark where exclusion dominates (Z > 1 at high P).
- If student says deviations largest at high T/low P → MC-2 repair: ask "what makes a real gas IDEAL?" (high T, low P — small deviations). Then the opposite gives the largest deviations.
- If student confuses a and b roles → MC-3 repair: the mnemonic (a → attractions; b → bulk). Verify with a numerical example (large a means strong attraction).
- Advance when student can calculate van der Waals pressure for a given gas and correctly interpret Z values.

## Voice Teaching Notes

The Z vs. P plot is the most information-dense visual in this topic. Return to it repeatedly. Every behaviour (Z dips below 1 → attractions; Z rises above 1 → exclusion; He starts above 1 immediately → negligible attractions) should be traced back to the physical meaning of a and b.

The critical temperature concept is counterintuitive — "no matter how hard you push, you can't liquify CO₂ above 31 °C." A fire extinguisher kept at 32 °C is a useful concrete example of why Tc matters in practice.

## Assessment Signals

**Mastery gate**:
1. Student correctly interprets Z < 1 (attractions dominate) and Z > 1 (exclusion dominates) for a given gas at given conditions.
2. Student correctly identifies which conditions (low T, high P) produce the largest deviations from ideal behaviour.
3. Student correctly assigns a and b to their physical meanings (a = intermolecular attraction, b = molecular volume).
4. Student correctly explains why a gas with Tc below room temperature cannot be liquefied by pressure alone at room temperature.

**FRAGILE signal**: student can apply the van der Waals equation numerically but cannot explain the direction of the calculated correction.

**MISCONCEIVING signal**: student says Z is always < 1. Show the Z vs. P plot for H₂ (Z always > 1 at room temperature) immediately.

## Tutor Recovery Strategy

If stuck:
1. For Z > 1: the crowded room thought experiment — at extremely high density, molecular bodies physically block each other → more wall impacts than at equivalent ideal density → Z > 1. Ask: "If molecules were as big as basketballs, could you fit the same number in the container?" This drives home the exclusion volume idea.
2. For a vs. b confusion: ask "what does a fix?" (the pressure is too low → a adds back the missing pressure from attraction). "What does b fix?" (the volume is too large by the molecular bulk → b subtracts the excluded volume).
3. For critical constants: use the CO₂ fire extinguisher scenario. "Why can we store liquid CO₂ in a steel cylinder at room temperature?" This anchors Tc conceptually before the formula is introduced.

## Memory Hooks

- **Z = PV/(nRT): Z = 1 ideal; Z < 1 attractions dominant; Z > 1 repulsion/exclusion dominant.**
- **Largest deviations: HIGH pressure + LOW temperature** (the opposite of ideal conditions).
- **a corrects attractions (pressure); b corrects bulk (volume).** a → attractions; b → bulk.
- **Tc is the gateway to liquefaction: T < Tc allows liquefaction by pressure. T > Tc → only supercritical fluid.**

## Transfer Connections

- **chem.state.phase-diagram**: the phase diagram and the concept of critical point (Tc, Pc, Vc) are unlocked by this node; the critical constants from van der Waals constants quantitatively predict where the critical point appears on the phase diagram.
- **chem.thermo.entropy**: real gas deviations from ideal behaviour contribute to entropy calculations; ΔS for compression of a real gas differs from the ideal gas result by terms involving the a and b corrections.

## Cross-Subject Connections

- **Physics (phys.therm.kinetic-theory)**: the van der Waals equation is the simplest correction to the ideal gas law; physics courses derive the equation from intermolecular potential energy and integrate it to obtain the kinetic-theory pressure with corrections.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.state.real-gases`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.state.real-gases` as of 2026-07-23.

## Curriculum Feedback

None. Correct placement and unlock structure. The proficient difficulty tag is appropriate for analyze-level work requiring van der Waals equation calculations and critical constants.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
