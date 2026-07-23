# Concentration Units — `chem.found.concentration`

## Identity

- **KG ID**: chem.found.concentration
- **Subject**: Chemistry
- **Domain**: Foundations (chem.found)
- **Difficulty**: developing
- **Bloom level**: apply
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.found.mole-concept
- **Unlocks**: chem.anal.volumetric, chem.equil.kw-ph, chem.kinet.rate, chem.redox.titrations, chem.sol.types
- **Cross-links**: none

## Learning Objective

Students can calculate and interconvert among molarity (M = n/V), molality (m = n/kg solvent), mole fraction (χ = n_i/Σn), mass percent (w% = mass solute / mass solution × 100), and ppm (mg/kg or mg/L); perform dilution calculations (C₁V₁ = C₂V₂); and prepare a solution of specified molarity from a solid solute or by dilution from a stock solution.

## Core Understanding

**Concentration** quantifies how much solute is dissolved per unit of solvent or solution. Five units serve different purposes: **molarity** (mol/L) is the workhorse for titrations, equilibrium expressions, and kinetics — it uses volume of solution, which is easy to measure in the lab. **Molality** (mol/kg solvent) is temperature-independent (mass doesn't change with T; volume does) and is required for colligative property calculations. **Mole fraction** (dimensionless, 0 to 1) is the cleanest theoretical quantity for mixtures. **Mass percent** and **ppm** are used for impurities and environmental/analytical chemistry.

Dilution is the addition of solvent to a solution: the moles of solute are unchanged, so C₁V₁ = C₂V₂ (in compatible units).

## Mental Models

**The crowd-per-room model**: Concentration is like the number of people (solute) per room (solution volume). A crowded room = high concentration. Adding extra room by dilution reduces the density.

**Unit-purpose map**: Why five units?
- Molarity = lab-bench default (volumetric glassware measures volume).
- Molality = temperature-sensitive experiments (freezing point depression, boiling point elevation).
- Mole fraction = vapour pressure, Raoult's law calculations.
- Mass % = food labels, industrial formulations.
- ppm = environmental trace analysis.

## Why Students Fail

1. **Molarity vs. molality unit confusion**: M uses volume of solution (L); m uses mass of solvent (kg) — students confuse the denominator and get wrong answers.
2. **Forgetting to convert volume to litres**: Students use mL without dividing by 1000, giving molarity 1000× too large.
3. **Dilution: which volume to use**: In C₁V₁ = C₂V₂, V₁ is the volume taken from the stock solution, V₂ is the final total volume — not the volume of water added.
4. **Mass percent as mass/volume**: Students divide by volume instead of total mass of solution.

## Misconceptions

**MC-1 — Molality uses volume like molarity** (Type 3, language contamination)
- *Diagnostic probe*: "What is the molality of a solution made by dissolving 10.0 g NaCl in 500.0 g water?"
- *Characteristic phrase*: "10.0 g NaCl in 500 mL of solution."
- *Repair*: Molality = moles solute / kg solvent (not kg solution). 10.0 g / 58.44 g/mol = 0.171 mol NaCl. 500.0 g water = 0.5000 kg. m = 0.171 mol / 0.5000 kg = 0.342 mol/kg.

**MC-2 — In dilution, V₂ = V(water added)** (Type 5, instruction-induced)
- *Diagnostic probe*: "You dilute 25.0 mL of 6.00 M HCl to make 250.0 mL of solution. What is the final concentration? What volume of water did you add?"
- *Characteristic phrase*: "C₂ = C₁V₁/(water added) = 6.00 × 25.0 / 225.0."
- *Repair*: C₁V₁ = C₂V₂ gives C₂ = (6.00)(25.0) / 250.0 = 0.600 M. V₂ = 250.0 mL (the final total volume, not the volume of water added). Water added = 250.0 − 25.0 = 225.0 mL, but it appears in neither formula.

**MC-3 — ppm is always mg/L** (Type 5, instruction-induced)
- *Mechanism*: For dilute aqueous solutions, the density is approximately 1 g/mL, making mg/kg ≈ mg/L. But this is an approximation valid only for very dilute aqueous solutions; ppm by mass (mg/kg) and ppm by volume (mg/L) differ for denser solutions or non-aqueous solvents.
- *Diagnostic probe*: "Is 1 ppm of lead in seawater (density 1.025 g/mL) the same as 1 ppm in pure water? Why or why not?"
- *Repair*: ppm by mass = mg per kg; ppm by volume = mg per L. For seawater (1.025 kg/L), 1 ppm by mass ≠ 1 ppm by volume. Always specify which definition applies.

## Analogies

**The laundry detergent measure**: Concentrated detergent in a small bottle (high concentration) vs. the same amount of cleaning agent in a large bottle of diluted detergent (low concentration) — the same moles of surfactant, different volumes. C₁V₁ = C₂V₂ in household chemistry.

## Demonstrations

**Demonstration 1 — Making a standard NaCl solution**
- Weigh 2.922 g NaCl (0.05000 mol). Transfer quantitatively to a 500.0 mL volumetric flask. Dissolve with ~400 mL water, swirl, make up to the mark. Ask: "What is the molarity?" (0.05000 mol / 0.5000 L = 0.1000 M.) Then demonstrate a serial dilution: take 50.0 mL → 500.0 mL → 0.01000 M.

## Discovery Questions

1. "A 35.0% (w/w) HCl solution has a density of 1.18 g/mL. Calculate its molarity." (Targets: assume 1 L = 1180 g solution; mass HCl = 0.350 × 1180 = 413 g; mol HCl = 413/36.46 = 11.3 mol; M = 11.3/1.000 = 11.3 M — this is the common calculation to find molarity of commercial concentrated acids from their mass-percent label.)
2. "A seawater sample contains 35 ppm Hg by mass. What is its concentration in molarity? (density seawater = 1.025 g/mL)" (Targets: 35 mg Hg per kg seawater; 1 L seawater = 1025 g; Hg per litre = 35 × 1.025 = 35.875 mg = 0.035875 g; mol Hg = 0.035875/200.59 = 1.79 × 10⁻⁴ mol; M = 1.79 × 10⁻⁴ mol/L.)
3. "Why are colligative property calculations (freezing point depression, boiling point elevation) done in molality rather than molarity?" (Targets: volume changes with temperature; mass does not → molality is T-independent → ΔTf = Kf × m gives consistent results regardless of temperature.)

## Teaching Sequence

1. Review the mole bridge from chem.found.mole-concept.
2. Introduce molarity: definition, units, calculation from solid. Run Demonstration 1.
3. Introduce molality: definition, units. Contrast denominator with molarity (solution volume vs. solvent mass).
4. Introduce mole fraction: definition; note that Σχᵢ = 1 always.
5. Introduce mass percent and ppm: definitions, units, interconversion from density when needed.
6. Dilution calculations: C₁V₁ = C₂V₂. Address MC-2 directly.
7. Interconversion among units: work through the commercial-acid calculation (Discovery Question 1).
8. Practice: one calculation in each unit plus two interconversions.

## Tutor Actions

- If student uses volume in molality → MC-1 probe (weighing vs. volume measurement); emphasise "mass of solvent."
- If student uses water-added as V₂ → MC-2 probe with the full dilution setup; require them to label V₁ and V₂ before calculating.
- If student says ppm always = mg/L → MC-3 probe with a dense solution example.
- Advance when student calculates molarity, molality, and mass percent correctly for a given solution description.

## Voice Teaching Notes

"Molarity is mol/L of solution. Molality is mol/kg of solvent. One word different — volume vs. mass, solution vs. solvent — complete difference." This oral contrast, repeated at the start of any session involving both, prevents MC-1.

The dilution calculation (C₁V₁ = C₂V₂) should be accompanied always by a diagram showing V₁ as the volume taken from stock and V₂ as the volume of the final solution. The diagram prevents MC-2 more reliably than any verbal explanation.

## Assessment Signals

**Mastery gate**:
1. Student correctly calculates molarity, molality, and mass percent for a single described solution.
2. Student correctly performs a dilution calculation (both directions: find C₂ given V₁, C₁, V₂; and find V₁ needed to prepare a given C₂ in given V₂).
3. Student correctly identifies why molality is used for colligative properties.

**FRAGILE signal**: student calculates molarity correctly but switches denominator to volume when calculating molality.

**MISCONCEIVING signal**: student adds water volume (not final volume) to the dilution formula.

## Tutor Recovery Strategy

If stuck:
1. For the molarity/molality denominator: write them side by side: "Molarity = mol / L(solution). Molality = mol / kg(solvent)." Ask student to underline the denominator in each and say it aloud. Spoken distinction reinforces the written one.
2. For dilution: use the "moles don't change" proof: n = C₁V₁ = C₂V₂ because moles before = moles after. V₂ is always the final total volume. Draw it.
3. For interconversions (mass% → molarity): always start with a known mass of solution (e.g., 1 L or 100 g). The rest follows from algebra.

## Memory Hooks

- **"M = mol/L solution; m = mol/kg solvent."** Two letters, two formulas, key distinction.
- **C₁V₁ = C₂V₂**: "The moles don't change when you dilute — only the volume does."
- **ppm = mg/kg**: "parts per million = milligrams per kilogram." (Specify if mg/L applies: "only for dilute aqueous solutions where density ≈ 1 g/mL.")

## Transfer Connections

- **chem.equil.kw-ph**: Ka, Kb, Kw expressions use molar concentrations in mol/L.
- **chem.kinet.rate**: rate laws use molar concentrations; rate = k[A]^m[B]^n.
- **chem.sol.types**: solutions are classified partly by solute concentration; solubility is expressed in mol/L or g/100g.
- **chem.redox.titrations**: titration calculations use molarity and the C₁V₁ = C₂V₂ principle at the equivalence point.

## Cross-Subject Connections

- **Biology (bio.cell / biochemistry)**: enzyme kinetics use substrate concentration in mol/L; blood chemistry reports in mM (millimolar).
- **Environmental science**: pollutant concentrations in water (ppm, ppb) are the concentration units of environmental analytical chemistry.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.found.concentration`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.found.concentration` as of 2026-07-23.

## Curriculum Feedback

None. The node correctly gates equilibrium, kinetics, and titrations — all require molarity as the starting point.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
