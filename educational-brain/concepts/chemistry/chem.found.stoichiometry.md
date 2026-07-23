# Stoichiometry — `chem.found.stoichiometry`

## Identity

- **KG ID**: chem.found.stoichiometry
- **Subject**: Chemistry
- **Domain**: Foundations (chem.found)
- **Difficulty**: developing
- **Bloom level**: apply
- **Estimated hours**: 4
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.found.mole-concept
- **Unlocks**: chem.anal.gravimetric
- **Cross-links**: none

## Learning Objective

Students can balance chemical equations by inspection; use mole ratios from balanced equations to calculate masses and moles of reactants and products; identify the limiting reagent in a reaction given masses of two or more reactants; and calculate theoretical yield and percent yield.

## Core Understanding

A balanced chemical equation is a mole-level statement: the coefficients are mole ratios, not mass ratios. Stoichiometry uses these ratios as conversion factors, combined with the molar mass bridge from the mole concept, to convert any given quantity (mass, moles, volume of gas) of one reactant or product into any other.

The **limiting reagent** is the reactant that is completely consumed first, determining the maximum amount of product that can form. The other reactant(s) are in excess. Identifying the limiting reagent requires comparing the available moles of each reactant with the mole ratio demanded by the balanced equation.

**Theoretical yield** = amount of product calculated from the limiting reagent assuming 100% conversion. **Percent yield** = (actual yield / theoretical yield) × 100%. Percent yield < 100% always in practice, due to side reactions, incomplete reaction, mechanical losses.

## Mental Models

**The recipe model**: A balanced equation is a recipe. If a cookie recipe needs 2 cups of flour for every 1 cup of sugar, and you have 3 cups of flour and 2 cups of sugar, sugar is the limiting ingredient (it only allows 1 batch, not 1.5 batches). Stoichiometry is recipe-scaling, with moles as the unit.

**The mole ratio as a conversion factor**: 2H₂ + O₂ → 2H₂O tells you that for every 2 moles of H₂ consumed, 1 mole of O₂ is consumed and 2 moles of H₂O are produced. These ratios are exact (from coefficients) and define all inter-species conversions.

## Why Students Fail

1. **Using mass ratios instead of mole ratios**: Students multiply mass by the coefficient ratio (2:1) instead of first converting to moles, applying the ratio, then converting back to mass.
2. **Limiting reagent identification by mass**: Students pick the smallest mass as the limiting reagent instead of comparing moles-available to moles-required.
3. **Forgetting to convert mass to moles first**: The stoichiometric pathway is always: mass → moles (÷ molar mass) → moles of other species (× mole ratio) → mass or particles (× molar mass or × Nₐ). Students skip steps.
4. **Percent yield > 100% accepted**: Students calculate 105% yield without questioning it; in practice this signals an arithmetic error or impure product.

## Misconceptions

**MC-1 — Coefficients represent mass ratios** (Type 5, instruction-induced)
- *Mechanism*: The coefficient 2 in "2H₂" looks like "2 grams of H₂."
- *Diagnostic probe*: "The reaction 2H₂ + O₂ → 2H₂O. If you use 4 g of H₂, how many grams of O₂ are needed? Show each step."
- *Characteristic phrase*: "2 grams of hydrogen reacts with 1 gram of oxygen."
- *Repair*: 4 g H₂ ÷ 2.016 g/mol = 1.98 mol H₂. Mole ratio: 1.98 mol H₂ × (1 mol O₂ / 2 mol H₂) = 0.99 mol O₂. Mass: 0.99 mol × 32.00 g/mol = 31.7 g O₂. Not 2 g O₂.

**MC-2 — Smallest mass = limiting reagent** (Type 1, overgeneralization)
- *Diagnostic probe*: "You have 4.0 g of H₂ and 32.0 g of O₂. For the reaction 2H₂ + O₂ → 2H₂O, which is the limiting reagent?"
- *Characteristic phrase*: "H₂ is the limiting reagent because 4.0 g < 32.0 g."
- *Repair*: Calculate moles of each: H₂ = 4.0/2.016 = 1.98 mol; O₂ = 32.0/32.00 = 1.00 mol. Required ratio from equation: 2:1. Available ratio: 1.98:1.00 = 1.98:1 — this is less than the 2:1 required, so H₂ is limiting in this case. But the comparison must be done by moles and ratio, not raw mass.

**MC-3 — Percent yield can exceed 100%** (Type 5, instruction-induced)
- *Mechanism*: Students accept the computed number without physical reasoning.
- *Diagnostic probe*: "If your percent yield calculation gives 112%, what does this mean? Is it possible in principle?"
- *Repair*: >100% yield means the "actual yield" used in the calculation is larger than the theoretical maximum — physically impossible unless the product is contaminated. The error is in the measurement or calculation, not in the chemistry.

## Analogies

**Cookie recipe**: Recipe calls for 2 cups flour + 1 cup sugar per batch. Available: 3 cups flour + 2 cups sugar. Flour allows 3/2 = 1.5 batches; sugar allows 2/1 = 2 batches. Flour is limiting (allows fewer batches). Result: 1.5 batches of cookies. Stoichiometry is this same calculation with moles and mole ratios.

## Demonstrations

**Demonstration 1 — Limiting reagent visualisation**
- Mix known masses of BaCl₂ solution and Na₂SO₄ solution. The precipitate (BaSO₄) formed represents the theoretical yield from the limiting reagent. Filter, dry, and weigh the precipitate to determine actual yield and percent yield.

## Discovery Questions

1. "The thermite reaction: 2Al(s) + Fe₂O₃(s) → Al₂O₃(s) + 2Fe(l). If 27.0 g of Al reacts with 160.0 g of Fe₂O₃, what mass of iron is produced? Which reagent is limiting?" (Targets: Al = 1.00 mol, Fe₂O₃ = 1.00 mol; ratio needed = 2:1; Al/needed = 1/2 × ratio = 0.5; Fe₂O₃ needed for 1 mol Al = 0.5 mol → Fe₂O₃ in excess; Al is limiting; iron produced = 1.00 mol × (2 mol Fe / 2 mol Al) × 55.85 g/mol = 55.85 g.)
2. "A student isolates 45.3 g of BaSO₄ from a reaction expected to produce 49.7 g. What is the percent yield? What could explain the remainder?" (Targets: 45.3/49.7 × 100 = 91.1%; incomplete transfer, filtration losses, impure product.)
3. "Why is it impossible to achieve 100% yield in a real reaction, even if the limiting reagent is fully consumed?" (Targets: mechanical losses, side reactions, competing equilibria, dissolution of product in solution.)

## Teaching Sequence

1. Review the mole bridge from chem.found.mole-concept: mass ↔ moles ↔ particles.
2. Introduce balanced equations: coefficients as exact mole ratios. Practise balancing three equations by inspection.
3. Introduce the stoichiometric calculation pathway: mass A → moles A → moles B → mass B. Work three examples, requiring students to write each step.
4. Introduce limiting reagent: present the cookie-recipe analogy; then work a quantitative problem step by step, comparing available moles to required moles.
5. Introduce theoretical and percent yield: definitions, formulas, worked example.
6. Address MC-1 (mass ratio error) and MC-2 (mass = limiting) with targeted probes before or after examples.
7. Practice: 5 multi-step problems covering all three skills (stoichiometric conversion, limiting reagent, percent yield).

## Tutor Actions

- If student divides masses by coefficients directly → MC-1 repair: convert to moles first, use mole ratio, convert back.
- If student picks smallest mass as limiting → MC-2 repair: calculate moles and compare the mole ratio to the required ratio.
- If student accepts >100% yield → MC-3 repair: ask "can you make more product than the stoichiometry allows?"
- Advance when student correctly completes a full limiting reagent + percent yield problem, showing all steps.

## Voice Teaching Notes

The stoichiometric pathway (mass → moles → moles → mass) should be stated as a four-step mantra before every calculation in the first three sessions: "Step 1: convert to moles. Step 2: use the mole ratio. Step 3: convert back to the required quantity." Over-stating the steps prevents the most common errors.

The limiting reagent concept is best taught with the recipe analogy before any chemical example — it neutralises the most common misconceptions (smallest mass wins) before they form.

## Assessment Signals

**Mastery gate**:
1. Student correctly balances two equations of moderate complexity.
2. Student correctly computes the mass of product from a given mass of reactant, showing all four steps explicitly.
3. Student correctly identifies the limiting reagent when given two reactant masses, showing the mole-ratio comparison.
4. Student correctly computes percent yield and recognises that > 100% is physically impossible.

**FRAGILE signal**: student gets the mole-ratio step right but makes systematic errors in the molar mass calculation (usually wrong formula mass for a compound).

**MISCONCEIVING signal**: student consistently picks the smallest mass as limiting without mole calculation. Requires the comparison procedure to be drilled explicitly for 3-4 problems before proceeding.

## Tutor Recovery Strategy

If stuck:
1. Return to the recipe analogy and solve a cookie problem first (pure counting, no chemistry). Then map: cookies → moles; recipe ratio → mole ratio; cups flour/sugar → grams.
2. For the limiting reagent: require the student to set up the ratio table (available moles : required ratio) for every problem. The table makes the comparison explicit and reduces arithmetic errors.
3. For mass ratio errors: give a problem where the coefficients are unequal (e.g., 4:3 ratio) so the mass-ratio error is obviously wrong. This breaks the misconception more forcefully than a 1:1 or 2:1 ratio where the error might go unnoticed.

## Memory Hooks

- **Stoichiometry pathway**: "Mass → Moles → Moles → Mass." Four words, four steps.
- **Limiting reagent**: "Which runs out first? Compare moles available to moles needed by the ratio." — not mass.
- **Percent yield**: "Actual over theoretical, times 100. Never more than 100 in practice."

## Transfer Connections

- **chem.anal.gravimetric**: gravimetric analysis extends stoichiometry to the quantitative determination of an analyte by precipitate mass — the limiting-reagent logic applied analytically.
- **chem.found.concentration**: concentration calculations combine stoichiometry (mole relationships) with volume — the starting point for solution stoichiometry.
- **chem.redox.balancing**: balancing redox reactions (half-reaction method) requires the same coefficient-as-mole-ratio principle applied to more complex equation balancing.

## Cross-Subject Connections

- **Mathematics**: stoichiometry is applied ratio and proportion — a direct extension of arithmetic reasoning in a chemical context.
- **Biology (bio.cell / biochemistry)**: metabolic pathways involve stoichiometric relationships between substrates and products (e.g., respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O).

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.found.stoichiometry`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.found.stoichiometry` as of 2026-07-23.

## Curriculum Feedback

None. Stoichiometry correctly gates gravimetric analysis (the first analytical application of stoichiometric reasoning).

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
