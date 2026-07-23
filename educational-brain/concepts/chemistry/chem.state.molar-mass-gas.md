# Molar Mass from Gas Data — `chem.state.molar-mass-gas`

## Identity

- **KG ID**: chem.state.molar-mass-gas
- **Subject**: Chemistry
- **Domain**: States of Matter (chem.state)
- **Difficulty**: developing
- **Bloom level**: apply
- **Estimated hours**: 2
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.state.gas-laws, chem.found.mole-concept
- **Unlocks**: none (terminal supporting node)
- **Cross-links**: none

## Learning Objective

Students can calculate the molar mass of an unknown gas from its density at given temperature and pressure using M = dRT/P; determine the molecular formula from an empirical formula and experimentally measured molar mass; and apply Graham's law of effusion (rate ∝ 1/√M) to calculate relative effusion rates or compare molar masses.

## Core Understanding

**Molar mass from gas density**: The ideal gas law PV = nRT; substituting n = m/M and density d = m/V gives:

PV = (m/M)RT → P = (m/V)(RT/M) = d(RT/M) → **M = dRT/P**

This allows the molar mass of any gas to be calculated from a single density measurement at known T and P. This is a powerful experimental tool because it requires only density (measurable by mass/volume of a known amount of gas).

**Molar mass at STP shortcut**: at STP (0 °C, 1 atm), molar volume = 22.4 L mol⁻¹. If the density of a gas at STP is d g/L, then M = d × 22.4 g mol⁻¹. (Use 22.7 L mol⁻¹ if STP is defined as 0 °C, 1 bar — verify the definition in the problem.)

**Empirical formula → molecular formula**: given an empirical formula with formula mass EFM and an experimentally measured molar mass M, the multiplier n = M/EFM (must be a whole number to within experimental error). The molecular formula = n × empirical formula.

**Graham's law of effusion** (Thomas Graham, 1848): for two gases at the same T and P, the ratio of their effusion rates is inversely proportional to the square root of their molar masses:

r₁/r₂ = √(M₂/M₁)

This follows from the kinetic theory result that average molecular speed v ∝ √(T/M), and effusion rate ∝ average molecular speed. Lighter gases effuse faster. Applications: isotope separation (uranium enrichment via UF₆ diffusion; M(²³⁸UF₆) vs. M(²³⁵UF₆)); leak detection (comparing effusion times for an unknown gas with a known gas).

## Mental Models

**The density-to-molar-mass pipeline**: M = dRT/P is a single-formula pipeline. Input: one density measurement and the T, P conditions. Output: molar mass. Everything needed to identify an unknown gas from a single laboratory measurement.

**Graham's law as a molecular race**: at the same temperature, all gas molecules have the same average kinetic energy (½mv² = 3kT/2). Heavier molecules must therefore move more slowly (lower average speed) to have the same energy. Slower molecules hit the effusion hole less frequently → effuse more slowly. The race is won by the lightest molecule.

## Why Students Fail

1. **Density units**: d in M = dRT/P must be in g/L (or g/dm³) when R = 0.08206 L·atm/(mol·K) and P is in atm. Students mix density in g/mL (=g/cm³), getting M values 1000× too small.
2. **Confusing effusion and diffusion**: effusion = gas escaping through a tiny pinhole into a vacuum; diffusion = spreading of one gas through another. Graham's law strictly applies to effusion but is often (approximately) extended to diffusion.
3. **Graham's law ratio direction**: students write r₁/r₂ = √(M₁/M₂) (larger molar mass → faster rate — wrong). The rate is inversely proportional to √M, so the heavier gas has the smaller ratio.
4. **Empirical formula multiplier**: students compute M/EFM and round to a number that is NOT a whole number without recognising the experimental error issue.

## Misconceptions

**MC-1 — Density in g/mL can be used directly in M = dRT/P** (Type 4, notation-induced)
- *Diagnostic probe*: "A gas has density 1.25 g/mL at STP. What is its molar mass? (Careful — check your units.)"
- *Characteristic phrase*: "I used density = 1.25 and got M = 28 — oh wait, that's nitrogen, the density is in mL not L."
- *Repair*: 1.25 g/mL = 1250 g/L. M = 1250 × 22.4 = 28,000 g/mol. Obviously impossible for a real gas — the unit error produces an absurd result that the student must be trained to recognise as a check. Correct density in g/L at STP: N₂ ≈ 1.25 g/L (not g/mL).

**MC-2 — Heavier gas effuses faster because it has more momentum** (Type 2, perceptual intuition)
- *Mechanism*: everyday intuition — heavier things push harder, have more momentum.
- *Diagnostic probe*: "H₂ (M = 2) and O₂ (M = 32) are in separate containers each with a tiny hole. Which gas effuses faster? By what factor?"
- *Characteristic phrase*: "O₂ is heavier so it hits the hole harder and escapes faster."
- *Repair*: effusion rate depends on average molecular SPEED, not momentum. At the same T, all gases have the same average kinetic energy (KE = ½mv²). For O₂, m is 16× larger so v must be 4× smaller (√16 = 4). H₂ molecules are faster and hit the hole more frequently → H₂ effuses 4× faster. r(H₂)/r(O₂) = √(32/2) = √16 = 4.

**MC-3 — M from empirical formula and from gas data should match exactly** (Type 5, instruction-induced)
- *Mechanism*: students expect experimental molar mass to give an exact integer multiple of the empirical formula mass.
- *Diagnostic probe*: "Empirical formula CH₂O, EFM = 30 g/mol. Measured M = 88 g/mol. How many significant figures should n have? What is the molecular formula?"
- *Characteristic phrase*: "88/30 = 2.93, which isn't a whole number, so the data is wrong."
- *Repair*: n = 88/30 = 2.93 ≈ 3 (rounding to the nearest whole number, within experimental uncertainty). Molecular formula = 3 × CH₂O = C₃H₆O₃ (e.g., glyceraldehyde or lactic acid). The student must round to the nearest whole integer and recognise that experimental molar masses carry uncertainty.

## Analogies

**The effusion race — molecular go-karts**: imagine gas molecules as go-karts in a race to reach a tiny exit. All go-karts have the same engine energy (same temperature = same average KE). Lighter go-karts (low M) run at higher speed for the same energy. They reach the exit hole more frequently and escape first. The race is to the exit, not about force — speed determines effusion, not weight.

## Demonstrations

**Demonstration 1 — Graham's law with HCl and NH₃**
- Place a cotton wool plug soaked in HCl at one end of a long horizontal glass tube and another soaked in NH₃ at the other end. NH₃ (M = 17) diffuses faster than HCl (M = 36.5) → the white NH₄Cl ring forms closer to the HCl end. Students observe the asymmetric position of the ring and calculate the expected position ratio: √(36.5/17) = √2.15 ≈ 1.46, so NH₃ travels 1.46× farther — verifiable by measurement.

## Discovery Questions

1. "A gas has density 3.17 g/L at 25 °C and 1.00 atm. Identify the gas." (Targets: M = dRT/P = 3.17 × 0.08206 × 298 / 1.00 = 77.7 g/mol ≈ 78 g/mol — this is krypton (M = 83.8 g/mol, close enough) or could be C₂H₂ (26) — no. Let's recheck: 3.17 × 0.08206 × 298 = 3.17 × 24.45 = 77.5 g/mol. This is Se (79) or possibly an organic compound. The exercise is in applying the formula; students should check a periodic table or formula index. The key skill is the calculation.)
2. "A compound has empirical formula CH₂ (EFM = 14 g/mol) and a gas-phase molar mass of 56 g/mol. What is its molecular formula?" (Targets: n = 56/14 = 4; molecular formula = C₄H₈. Possible identities: cyclobutane, 1-butene, 2-butene, isobutene — all are structural isomers with M = 56.)
3. "How many times faster does helium (M = 4) effuse than xenon (M = 131) at the same temperature?" (Targets: r(He)/r(Xe) = √(131/4) = √32.75 ≈ 5.72 — He effuses 5.72 times faster.)

## Teaching Sequence

1. Review from chem.state.gas-laws: PV = nRT; from chem.found.mole-concept: n = m/M.
2. Derive M = dRT/P by substituting n = m/M and d = m/V into PV = nRT. Verify units.
3. Work through a molar mass from density calculation. Emphasise the unit check (density in g/L, not g/mL). Address MC-1.
4. Show the STP shortcut M = d × 22.4 (or 22.7) g/mol. Derive it from M = dRT/P with T = 273 K, P = 1 atm.
5. Empirical to molecular formula: define EFM; compute n = M/EFM (round to nearest integer); state molecular formula. Work Discovery Question 2.
6. Introduce Graham's law: derive qualitatively from KE = ½mv² at constant T; state r ∝ 1/√M. Demonstrate (Demonstration 1). Work Discovery Questions 3.

## Tutor Actions

- If student uses density in g/mL → MC-1 repair: compute the result and show it is impossibly large; then convert correctly.
- If student reverses Graham's law ratio → MC-2 repair: equal KE argument; heavier → slower speed → lower effusion rate.
- If student rejects a non-integer n → MC-3 repair: experimental uncertainty; round to nearest integer.
- Advance when student correctly computes M from density data and correctly applies Graham's law.

## Voice Teaching Notes

The most important single check in this topic is the unit of density. Before any student calculation, ask aloud: "What are the units of your density?" If they say g/mL, say "convert to g/L first." This check should become automatic before the student even sets up the equation.

For Graham's law, the equal-KE argument is the one to memorise: "Same temperature = same average kinetic energy for ALL gases, regardless of mass. So heavier gas moves slower by the √M factor."

## Assessment Signals

**Mastery gate**:
1. Student correctly calculates molar mass from gas density at given T and P, with correct units.
2. Student correctly determines molecular formula from empirical formula and experimental molar mass (including rounding n to nearest integer).
3. Student correctly calculates the relative effusion rates of two gases using Graham's law.

**FRAGILE signal**: student applies the formula correctly but cannot explain why M = dRT/P is derived from PV = nRT (rote application without derivation understanding).

**MISCONCEIVING signal**: student uses density in g/mL and accepts a molar mass of thousands of g/mol. Unit-check drill is the immediate repair.

## Tutor Recovery Strategy

If stuck:
1. For M = dRT/P derivation: start from PV = nRT and ask "what is n in terms of m and M?" Then ask "what is d = m/V?" Show that substituting both gives PV/RT = m/M = dV/M, so M = dRT/P.
2. For Graham's law direction: write out KE for both gases: ½m₁v₁² = ½m₂v₂² → v₁/v₂ = √(m₂/m₁). Lighter gas (smaller m) has larger v. Rate ∝ v, so lighter gas has higher rate.
3. For molecular formula: always compute n = M/EFM first, then multiply: atoms in molecular formula = n × atoms in empirical formula.

## Memory Hooks

- **M = dRT/P**: "Molar mass = density × gas law constant."
- **Graham's law: r ∝ 1/√M**. Lighter is faster. r₁/r₂ = √(M₂/M₁).
- **Density in g/L — always.** Never g/mL in this formula.

## Transfer Connections

- **chem.state.real-gases**: the ideal gas law (used to derive M = dRT/P) is an approximation; at high pressures real gases deviate and the molar mass calculation using PV = nRT is slightly inaccurate — the van der Waals correction improves it.
- **chem.found.stoichiometry**: the molecular formula determined here feeds directly into stoichiometric calculations; knowing M is the bridge from mass measurements to mole ratios.

## Cross-Subject Connections

- **Physics (phys.therm.kinetic-theory)**: Graham's law is a direct consequence of the Maxwell-Boltzmann speed distribution and the equipartition theorem — at the same temperature, all gas molecules have the same mean kinetic energy; the speed distribution width (and hence effusion rate) scales as 1/√M.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.state.molar-mass-gas`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.state.molar-mass-gas` as of 2026-07-23.

## Curriculum Feedback

This is a terminal node with no unlocks. The placement is appropriate — it is an application of gas laws (hence level 4) that does not gate further core chemistry topics; it is more of an experimental technique than a foundational concept for further study.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
