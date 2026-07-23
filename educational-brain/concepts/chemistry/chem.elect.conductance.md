# Electrolytic Conductance — `chem.elect.conductance`

## Identity

- **KG ID**: chem.elect.conductance
- **Subject**: Chemistry
- **Domain**: Electrochemistry (chem.elect)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Estimated hours**: 4
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.found.measurement
- **Unlocks**: chem.elect.electrolysis
- **Cross-links**: none

## Learning Objective

Students can define resistance (R), conductance (G = 1/R), conductivity (κ = G × cell constant), and molar conductivity (Λm = κ/c); apply Kohlrausch's law of independent migration of ions to calculate limiting molar conductivity of a weak electrolyte; and calculate the degree of dissociation of a weak electrolyte from its molar conductivity at a given concentration.

## Core Understanding

Electrolytic solutions conduct electricity through the movement of ions (not electrons, unlike metallic conductors). The resistance (R, Ω) of a solution decreases as ionic concentration increases; its reciprocal, **conductance** (G = 1/R, S or Ω⁻¹), increases.

**Conductivity** (specific conductance, κ, S/m or S/cm) is the cell-constant-corrected conductance — normalised for the geometry of the conductance cell (κ = G × l/A, where l/A is the cell constant). It removes the geometry dependence and is a property of the solution.

**Molar conductivity** (Λm = κ/c) normalises further by concentration, measuring how conducting one mole of electrolyte is at that concentration. For strong electrolytes, Λm increases slightly as c → 0 (Debye-Hückel-Onsager limit). For weak electrolytes, Λm increases dramatically at low c as dissociation increases.

**Kohlrausch's law**: At infinite dilution, each ion migrates independently. The limiting molar conductivity (Λ°m) of any electrolyte is the sum of the limiting molar conductivities of its constituent ions: Λ°m = ν₊λ°₊ + ν₋λ°₋. This is important for weak electrolytes whose Λ°m cannot be measured directly (they never fully dissociate at any finite concentration) but can be computed from ion data.

**Degree of dissociation** of a weak electrolyte: α = Λm / Λ°m.

## Mental Models

**Highway and ion model**: Conductance is like the traffic flow on a highway. More ions = more cars = more current. Conductivity = traffic capacity of the road regardless of length. Molar conductivity = traffic capacity per car — how efficiently each unit of dissolved electrolyte moves charge.

**Kohlrausch independence as parallel lanes**: At infinite dilution, each ion type travels in its own independent lane without interfering with others. The total flow is the sum of individual lane flows.

## Why Students Fail

1. **Conductance vs. conductivity vs. molar conductivity**: Students confuse the three related but distinct quantities and mix their units.
2. **Kohlrausch's law as applicable to all concentrations**: The law of independent migration applies only at infinite dilution (limiting molar conductivity). At finite concentrations, inter-ionic interactions affect mobility.
3. **Degree of dissociation formula derivation**: Students use α = Λm/Λ°m without understanding that it assumes the conductivity is proportional to the fraction of dissociated species.
4. **Strong vs. weak electrolyte molar conductivity trend**: Students expect both to behave similarly. Strong electrolytes decrease Λm linearly with √c (Onsager equation); weak electrolytes show a dramatic rise in Λm as c → 0 due to increasing α.

## Misconceptions

**MC-1 — Conductance and conductivity are the same** (Type 3, language contamination)
- *Diagnostic probe*: "If you measure the conductance of a solution in a beaker, then pour the same solution into a larger beaker, how does the conductance change? The conductivity?"
- *Characteristic phrase*: "Conductivity is just another word for conductance."
- *Repair*: Conductance depends on cell geometry (G = κ × A/l); conductivity (κ) removes the geometry dependence and is a true material property. Larger cell → different conductance, same conductivity.

**MC-2 — Kohlrausch's law applies at all concentrations** (Type 5, instruction-induced)
- *Diagnostic probe*: "Why is Kohlrausch's law of independent migration specifically stated as being applicable at infinite dilution?"
- *Repair*: At finite concentrations, inter-ionic attractions slow down ions. As c → 0, ions are so far apart that they no longer influence each other — only then is their migration truly independent.

**MC-3 — Strong electrolytes fully dissociate at all concentrations** (Type 1, overgeneralization)
- *Mechanism*: "Strong electrolyte" is often taught as "completely dissociates," leading students to assume this is true at all concentrations.
- *Diagnostic probe*: "Does the molar conductivity of NaCl change with concentration? What does that tell you about ionic interactions at higher concentrations?"
- *Repair*: "Complete dissociation" refers to the equilibrium — essentially all NaCl dissociates into Na⁺ and Cl⁻. But the mobilities of the ions are reduced by inter-ionic interactions at higher concentrations. Λm is lower at higher c not because less is dissociated, but because ionic mobility is reduced.

## Analogies

**Cell constant as a ruler**: The cell constant (l/A) corrects conductance for the geometry of the measuring cell — like using a ruler of known length to calibrate distance measurements. Without it, G values measured in differently shaped cells are not comparable.

## Demonstrations

**Demonstration 1 — Conductance of NaCl solutions at different concentrations**
- Measure G of 0.001 M, 0.01 M, 0.1 M, 1 M NaCl using a conductance meter. Calculate Λm for each. Plot Λm vs. √c and observe the linear Onsager trend. This establishes the experimental basis for the strong electrolyte behaviour.

## Discovery Questions

1. "The limiting molar conductivity of acetic acid (CH₃COOH) cannot be measured directly. How could you calculate it?" (Targets: Kohlrausch's law → Λ°m(CH₃COOH) = λ°(H⁺) + λ°(CH₃COO⁻); use tabulated λ° values for each ion.)
2. "A 0.01 M solution of a weak acid has Λm = 15 S·cm²·mol⁻¹ and Λ°m = 390 S·cm²·mol⁻¹. What is its degree of dissociation?" (Targets: α = 15/390 ≈ 0.038, so about 3.8% dissociated.)
3. "Why is the molar conductivity of a weak acid much more sensitive to dilution than that of a strong acid?" (Targets: weak acid's α increases dramatically on dilution, strong acid's α is already ~1.)

## Teaching Sequence

1. Introduce the electrolytic conductor vs. metallic conductor distinction: ions vs. electrons as current carriers.
2. Define resistance and conductance. Introduce the Wheatstone bridge or conductance meter as the measurement device.
3. Introduce conductivity: normalize conductance by cell geometry. Establish the cell constant concept.
4. Introduce molar conductivity: normalize conductivity by concentration. Discuss why this quantity is chemically useful.
5. Contrast strong and weak electrolyte Λm-vs-c behaviour experimentally (Demonstration 1 for strong; sketch the weak electrolyte curve).
6. Introduce Kohlrausch's law with worked example: calculate Λ°m of acetic acid from ion values.
7. Derive α = Λm/Λ°m for weak electrolytes. Work through Discovery Question 2.

## Tutor Actions

- If student confuses conductance and conductivity → MC-1 probe with cell-geometry argument.
- If student applies Kohlrausch's law at finite concentrations → MC-2 repair.
- If student says strong electrolyte fully dissociates at any concentration therefore Λm doesn't change → MC-3 repair with Onsager equation.
- Advance when student can compute Λ°m from ion data and calculate α from experimental Λm.

## Voice Teaching Notes

The three-level hierarchy (conductance → conductivity → molar conductivity) should be explicitly stated and revisited at the start and end of the session. The student should be able to say, from memory: "Conductance is G = 1/R. Conductivity is κ = G × cell constant. Molar conductivity is Λm = κ/c."

This is a proficient-level concept requiring more mathematical fluency than earlier foundational concepts. Ensure chem.found.measurement is secure before teaching the unit calculations here.

## Assessment Signals

**Mastery gate**:
1. Student correctly states the formula and units of κ and Λm.
2. Student correctly applies Kohlrausch's law to compute Λ°m of a weak acid from tabulated λ° values.
3. Student correctly calculates α for a given weak electrolyte at a given concentration.

**FRAGILE signal**: student can apply formulas but cannot explain why Λm changes with concentration differently for weak vs. strong electrolytes.

**MISCONCEIVING signal**: student applies Kohlrausch's law at a finite, non-zero concentration. Requires the "at infinite dilution only" caveat drill.

## Tutor Recovery Strategy

If stuck:
1. Return to the three-level definitions with units: write them in a column and ask the student to explain each in one sentence.
2. For Kohlrausch's law: start with an analogy — independent car lanes on a highway make sense only when traffic is light (infinite dilution). When congested (finite concentration), cars slow each other down.
3. For α calculation: verify that the student understands what Λ°m represents (the molar conductivity if the electrolyte were 100% dissociated). Then α = fraction that is actually dissociated = Λm/Λ°m.

## Memory Hooks

- **Conductance hierarchy**: G → κ → Λm (divide by cell constant area; divide by concentration).
- **Kohlrausch's law**: "At infinite dilution, ions go their own way." Sum of limiting ion conductivities.
- **α = Λm / Λ°m**: "Actual fraction = what you measured / maximum possible."

## Transfer Connections

- **chem.elect.electrolysis**: electrolysis uses the same electrolytic solution; understanding ionic conductance is the prerequisite for understanding what carries the current during electrolysis.
- **chem.equil.weak-acid**: the degree of dissociation α from conductance measurements is the experimental link to the Ka expression — two ways to measure the same quantity.

## Cross-Subject Connections

- **Physics (phys.elect.current)**: Ohm's law, resistance, and conductance are shared with physics electronics; the distinction is that in chemistry the charge carriers are ions, not electrons.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.elect.conductance`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.elect.conductance` as of 2026-07-23.

## Curriculum Feedback

The difficulty rating (proficient) seems elevated relative to its position in the dependency chain — it depends only on chem.found.measurement and appears at level 2 topologically, but the content (Kohlrausch's law, molar conductivity, degree of dissociation) is genuinely advanced. The placement may reflect that this is an early-appearing advanced topic rather than a foundational one. No KG change recommended; note as curriculum feedback for review.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
