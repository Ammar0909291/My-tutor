# Gravimetric Analysis — `chem.anal.gravimetric`

## Identity

- **KG ID**: chem.anal.gravimetric
- **Subject**: Chemistry
- **Domain**: Analytical Chemistry (chem.anal)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.found.stoichiometry, chem.equil.solubility
- **Unlocks**: none (terminal node)
- **Cross-links**: none

## Learning Objective

Students can describe the four stages of a gravimetric analysis (precipitation, digestion, filtration/washing, ignition/drying); apply the gravimetric factor to convert precipitate mass to analyte mass; calculate analyte percentage from experimental data using BaSO₄ and AgCl as standard examples; and identify major sources of error in gravimetric procedures.

## Core Understanding

**Principle**:
Gravimetric analysis determines the mass of an analyte by converting it quantitatively into a pure, stable, weighable form — usually a precipitate — and measuring that mass.

**Four operational stages**:
1. **Precipitation**: add excess precipitating reagent to convert the analyte quantitatively into an insoluble compound. Low solubility is essential (Ksp must be very small). Conditions (pH, temperature, concentration) are controlled to minimise co-precipitation and promote large crystal formation.
2. **Digestion**: heat the precipitate suspension (just below boiling) for 30–60 min. Ostwald ripening dissolves small crystals and redeposits material onto larger ones → fewer, purer, more filterable crystals.
3. **Filtration and washing**: filter through ashless filter paper or a sintered-glass crucible; wash with a small volume of dilute precipitating agent or cold water to remove occluded impurities without dissolving the precipitate.
4. **Ignition (or drying)**: heat to constant mass in a furnace (ignition converts the precipitate to a well-defined, stoichiometric form) or dry in an oven at lower temperature. Examples: BaSO₄ is stable as-is at ~120°C; Fe(OH)₃ is ignited to Fe₂O₃.

**Gravimetric factor (GF)**:
GF = (molar mass of analyte species) / (molar mass of precipitate form)
× (stoichiometric ratio of analyte formula units to precipitate formula units)

mass of analyte = mass of precipitate × GF

*Examples*:
- Determining SO₄²⁻ via BaSO₄: GF = M(SO₄²⁻)/M(BaSO₄) = 96.06/233.39 = 0.4116. One mole BaSO₄ contains one mole SO₄²⁻.
- Determining Cl⁻ via AgCl: GF = M(Cl)/M(AgCl) = 35.45/143.32 = 0.2474.
- Determining Fe via Fe₂O₃: GF = 2M(Fe)/M(Fe₂O₃) = 2(55.85)/159.69 = 0.6994 (factor of 2 because one formula unit Fe₂O₃ comes from two Fe atoms).

**Percentage analyte**:
%analyte = (mass of precipitate × GF / mass of sample) × 100%

**Sources of error**:
- *Incomplete precipitation*: solubility too high → analyte lost → result low. Remedy: add excess precipitant; adjust pH.
- *Co-precipitation*: foreign ions trapped in crystal lattice or adsorbed on surface → precipitate contaminated → result high. Remedy: digestion (ripening expels trapped ions); reprecipitation (dissolve, re-precipitate from purer solution).
- *Post-precipitation*: a second compound precipitates slowly after the primary precipitate → result high. Remedy: filter promptly.
- *Loss of precipitate*: poor filtration technique, precipitate through paper → result low.
- *Incomplete ignition*: residual carbon or moisture → result high (extra mass).
- *Hygroscopic product*: absorbs atmospheric moisture during weighing → result high.

## Mental Models

**The conversion-by-weighing model**: gravimetry is "analytical stoichiometry made physical." The precipitate IS the analyte in a different chemical dress. The gravimetric factor is the costume-change ratio — it undresses the precipitate back to the analyte's mass. Every gram of BaSO₄ hides 0.4116 g of SO₄²⁻.

**The crystal-quality model for digestion**: imagine stirring a bag of sand and pebbles under hot water. Surface energy drives small grains to dissolve and redeposit on larger pebbles (Ostwald ripening). After digestion you have a few large, pure pebbles — far easier to filter, far less surface area for impurity adsorption, far more stoichiometrically pure.

## Why Students Fail

1. **Gravimetric factor inverted**: students write GF = M(precipitate)/M(analyte) — the reciprocal. Dimensional analysis is the fix: mass_analyte = mass_precipitate × GF must have units g × (g analyte/g precipitate) → g analyte. If GF > 1 the analyte would be heavier than the precipitate, which is physically impossible for the BaSO₄/SO₄²⁻ pair — a simple sanity check catches the inversion.
2. **Stoichiometric ratio omitted from GF**: for Fe₂O₃/Fe, students write M(Fe)/M(Fe₂O₃) = 0.350 instead of 2M(Fe)/M(Fe₂O₃) = 0.699. The stoichiometric ratio (how many analyte formula units per one precipitate formula unit) must always be included.
3. **Co-precipitation direction**: students expect co-precipitation always lowers the result (it adds foreign mass → result is HIGH, not low). Only loss of precipitate gives a LOW result.

## Misconceptions

**MC-1 — Gravimetric factor is M(precipitate)/M(analyte)** (Type 4, notation-induced: the ratio direction is ambiguous without units)
- *Mechanism*: students see two molar masses and guess the larger over the smaller, or apply a ratio without tracking directionality.
- *Diagnostic probe*: "A sample contains SO₄²⁻. You precipitate it as BaSO₄ (M = 233.39 g/mol). Calculate the mass of SO₄²⁻ (M = 96.06 g/mol) in 0.4856 g of BaSO₄."
- *Characteristic phrase*: "GF = 233.39/96.06" or answer of 1.18 g SO₄²⁻ from 0.49 g BaSO₄ (which is impossible — the analyte can't outweigh the precipitate that contains it plus barium).
- *Repair*: GF converts precipitate to analyte. Analyte is lighter than precipitate (it's only part of the precipitate). GF = M(analyte)/M(precipitate) × stoichiometric ratio, always < 1 for these pairs (0.41 for BaSO₄, 0.25 for AgCl). Sanity check: GF should produce a SMALLER number than the precipitate mass.

**MC-2 — Co-precipitation always lowers the result** (Type 2, perceptual intuition: contamination = loss)
- *Mechanism*: "contamination" sounds like impurity diluting the analyte → students expect a lower % result.
- *Diagnostic probe*: "Co-precipitation of Na₂SO₄ occurs when precipitating BaSO₄. Does this make the measured %SO₄²⁻ too high or too low?"
- *Characteristic phrase*: "Co-precipitation dilutes the precipitate so the result is lower than the true value."
- *Repair*: co-precipitation ADDS mass to the precipitate (the co-precipitated impurity weighs the crucible down more). When converted back via GF, the excess mass is attributed to SO₄²⁻ — the calculated %SO₄²⁻ is HIGHER than the truth. Only losing precipitate (incomplete precipitation, filter breakthrough) gives a LOW result.

**MC-3 — Excess precipitating agent is always bad** (Type 5, instruction-induced: "excess" in stoichiometry context signals waste or error)
- *Mechanism*: students learn to use stoichiometric quantities; adding "excess" feels wrong or wasteful.
- *Diagnostic probe*: "Why is a 10–20% molar excess of BaCl₂ added when precipitating SO₄²⁻?"
- *Characteristic phrase*: "You should add exactly stoichiometric BaCl₂ to avoid contaminating the precipitate."
- *Repair*: excess precipitating agent is DELIBERATE. It drives the solubility equilibrium further left (common-ion effect → lower Ksp-based solubility → more complete precipitation → less analyte lost in the filtrate). The excess BaCl₂ is washed away in the filtration step. A small excess is an intentional Le Chatelier strategy to push precipitation to completion.

## Analogies

**The goldsmith analogy for GF**: a jeweller converts raw gold ore into pure gold bars. The conversion factor (g Au / g ore) tells them how much gold to expect per gram of ore processed. GF plays exactly the same role: for every gram of BaSO₄ "ore" you weigh, GF says how many grams of SO₄²⁻ "gold" are hidden inside.

**The panning-for-sand analogy for digestion**: panning washes away fine silt (small crystals with adsorbed impurities) and concentrates large, clean nuggets (pure large crystals). Digestion at elevated temperature is the chemical equivalent — it sweeps away the fine impure fraction and concentrates the analyte mass into large, filterable crystals.

## Demonstrations

**Demonstration 1 — Determination of Cl⁻ in table salt as AgCl**
- Dissolve a known mass of table salt in dilute HNO₃. Add excess AgNO₃ solution. Observe white AgCl precipitate form immediately. Filter through ashless paper, wash with dilute HNO₃, dry at 110°C to constant mass. Calculate %Cl using GF = 35.45/143.32 = 0.2474. Compare calculated %Cl with theoretical 60.66% for pure NaCl. Deviations reveal impurities or procedural error — an ideal opportunity to discuss each error source.

## Discovery Questions

1. "A 0.4856 g sample of a barium salt is dissolved, and all SO₄²⁻ is precipitated as BaSO₄. The dried precipitate weighs 0.4124 g. (a) Calculate the mass of SO₄²⁻ in the sample. (b) Calculate %SO₄²⁻ in the sample. (GF for SO₄²⁻/BaSO₄ = 0.4116.)" (Targets: (a) 0.4124 × 0.4116 = 0.1697 g SO₄²⁻. (b) (0.1697/0.4856) × 100 = 34.95% SO₄²⁻.)
2. "An analyst performs a gravimetric determination of iron. Fe³⁺ is precipitated as Fe(OH)₃ and ignited to Fe₂O₃ (M = 159.69 g/mol). The Fe₂O₃ weighs 0.3612 g. Calculate the mass of Fe (M = 55.85 g/mol) in the sample." (Targets: GF = 2 × 55.85/159.69 = 0.6994. Mass Fe = 0.3612 × 0.6994 = 0.2527 g. Note: factor of 2 because 1 mol Fe₂O₃ contains 2 mol Fe.)
3. "List three ways in which the result of a gravimetric analysis could be falsely HIGH and one way it could be falsely LOW. In each case, explain the mechanism." (Targets: HIGH: co-precipitation (foreign ions add mass); post-precipitation (extra precipitate forms); incomplete ignition (residual carbon/water adds mass); hygroscopic product (absorbs moisture). LOW: incomplete precipitation (analyte stays in solution, not collected); loss through filter; precipitate dissolved during washing.)

## Teaching Sequence

1. Review from chem.equil.solubility: Ksp, common-ion effect, Q_sp — the equilibrium foundation for why precipitation is complete.
2. Introduce the four stages. Connect each to an underlying chemical principle (Le Chatelier for precipitation completeness; surface energy for Ostwald ripening; Ksp for washing conditions).
3. Derive the gravimetric factor using dimensional analysis. Work BaSO₄/SO₄²⁻ and AgCl/Cl⁻. Introduce the stoichiometric-ratio term with Fe₂O₃/Fe. Address MC-1 and MC-3.
4. Work Discovery Question 1 (BaSO₄) and Discovery Question 2 (Fe₂O₃) in sequence.
5. Error sources: classify each as giving a HIGH or LOW result. Address MC-2 (co-precipitation → HIGH, not LOW). Work Discovery Question 3.

## Tutor Actions

- If student inverts GF → MC-1 repair: GF = M(analyte)/M(precipitate). Sanity-check: precipitate contains both analyte and the precipitating ion, so analyte fraction must be LESS than 1. GF < 1 for BaSO₄ and AgCl.
- If student says co-precipitation gives a low result → MC-2 repair: co-precipitation ADDS foreign mass; the excess mass is falsely counted as analyte → result HIGH.
- If student says adding excess precipitant is bad → MC-3 repair: deliberate excess drives precipitation to completion via the common-ion effect; excess is washed away; the benefit outweighs the small contamination risk.
- Advance when student can set up GF correctly for any analyte/precipitate pair (including multi-formula-unit cases like Fe₂O₃) and classify each error type as giving a high or low result.

## Voice Teaching Notes

"Before any GF calculation: say 'GF goes analyte over precipitate' — analyte on top, precipitate on bottom. BaSO₄: 96 over 233. Always less than 1. If you get a GF bigger than 1 for a typical precipitate pair, you've flipped it."

"For error direction: LOSS of precipitate → LOW. ADDITION of anything extra → HIGH. Co-precipitation adds; it makes the answer high."

## Assessment Signals

**Mastery gate**:
1. Student correctly writes GF = M(analyte species) × stoich ratio / M(precipitate).
2. Student correctly calculates %analyte from precipitate mass + GF + sample mass.
3. Student correctly classifies co-precipitation as HIGH error, incomplete precipitation as LOW error.
4. Student can explain the purpose of digestion (Ostwald ripening → larger, purer crystals).

**FRAGILE signal**: student correctly computes the GF and final percentage, but cannot explain why excess precipitating reagent is used (no connection to Le Chatelier/common-ion effect).

**MISCONCEIVING signal**: student writes GF > 1 for the BaSO₄/SO₄²⁻ pair. Address MC-1 immediately before any calculation proceeds.

## Tutor Recovery Strategy

If stuck:
1. For GF direction: "The precipitate BaSO₄ contains Ba²⁺ + SO₄²⁻. The analyte you want is only SO₄²⁻. The SO₄²⁻ is a PART of the precipitate. So the analyte mass must be LESS than the precipitate mass. GF must be less than 1 — it's a shrinkage factor, not a growth factor."
2. For stoichiometric ratio: "Write the ignition reaction: 2Fe(OH)₃ → Fe₂O₃ + 3H₂O. One mole Fe₂O₃ came from TWO moles of Fe atoms. So GF = 2 × M(Fe) / M(Fe₂O₃). The '2' is the stoichiometric coefficient of Fe in the reaction you wrote."
3. For error classification: "Ask two questions: (1) Did anything get ADDED to the precipitate that shouldn't be there? → HIGH result. (2) Did the analyte ESCAPE without being collected? → LOW result. Co-precipitation = adds something → HIGH. Incomplete precipitation = analyte escapes → LOW."

## Memory Hooks

- **GF = M(analyte) × stoich ratio / M(precipitate). Always less than 1 for typical pairs (BaSO₄: 0.41; AgCl: 0.25).**
- **Four stages: Precipitate → Digest → Filter/Wash → Ignite/Dry.**
- **Co-precipitation adds foreign mass → result HIGH. Incomplete precipitation loses analyte → result LOW.**
- **Digestion = Ostwald ripening: small crystals dissolve, large crystals grow, fewer impurities trapped.**

## Transfer Connections

- **chem.equil.solubility**: the quantitative basis for why precipitation is (nearly) complete — Ksp sets the floor on how much analyte remains in solution; the common-ion effect deliberately lowers that floor further.
- **chem.anal.chromatography**: both nodes belong to the analytical chemistry domain — gravimetric analysis separates by precipitation/mass; chromatography separates by differential partitioning. Together they form the core of classical and instrumental separation methods.

## Cross-Subject Connections

- **Biology (nutritional analysis)**: gravimetric determination of fat content in food (Soxhlet extraction, solvent evaporation, weighing residue) and crude fibre analysis both apply the same precipitate-and-weigh logic.
- **Environmental science (particulate matter)**: PM₂.₅ and PM₁₀ air quality measurement uses gravimetry — air is drawn through a pre-weighed filter; the mass difference after sampling = mass of particulates. The gravimetric method remains the regulatory reference method.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.anal.gravimetric`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.anal.gravimetric` as of 2026-07-23.

## Curriculum Feedback

Terminal node, appropriate for a procedural analytical technique at the proficient/apply level. The gravimetric factor calculation is the principal mastered skill; error classification is the secondary mastered skill. This node pairs naturally with chem.anal.chromatography as a two-node analytical chemistry domain — both are classical analysis methods and provide a complete picture of pre-instrumental analytical chemistry for most university-entrance curricula.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
