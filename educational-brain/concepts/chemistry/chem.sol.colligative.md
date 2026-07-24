# Colligative Properties — `chem.sol.colligative`

## Identity
- **KG ID**: chem.sol.colligative
- **Subject**: Chemistry
- **Domain**: Solutions (chem.sol)
- **Prerequisites**: chem.sol.vapour-pressure
- **Difficulty**: proficient
- **Bloom level**: apply
- **Estimated hours**: 2.5

## Learning Objective
Define and calculate the four colligative properties (vapour pressure lowering, boiling point elevation, freezing point depression, osmotic pressure), apply the van 't Hoff factor i for electrolytes, and explain the common physical cause — lowering of solvent chemical potential — underlying all four properties.

## Core Understanding
**Colligative** means "depending on number" — the four properties depend ONLY on the number of dissolved particles per unit of solvent, not on the chemical identity of the solute. The root cause is the LOWERING OF SOLVENT CHEMICAL POTENTIAL (equivalently, lowering of solvent vapour pressure) when a solute is dissolved; the four properties are four measurable consequences of the same thermodynamic effect. **Property 1 — Vapour pressure lowering** (covered in chem.sol.vapour-pressure): ΔP = x_solute × P° (Raoult's law). **Property 2 — Boiling point elevation**: a solution has a lower VP than the pure solvent; to boil (VP must reach atmospheric pressure), it must be heated to a higher temperature. ΔTb = Kb × m × i, where Kb is the ebullioscopic constant (solvent-specific; 0.512°C·kg/mol for water), m is the molality of the solute formula units, and i is the van 't Hoff factor (number of particles per formula unit: i = 1 for glucose, 2 for NaCl, 3 for Na₂SO₄, etc.). **Property 3 — Freezing point depression**: the solution's VP curve is below the pure solvent's curve; it intersects the solid-phase VP curve at a LOWER temperature, giving a lower freezing point. ΔTf = Kf × m × i, where Kf is the cryoscopic constant (solvent-specific; 1.86°C·kg/mol for water — much larger than Kb; freezing point depression is a more sensitive measurement). Note: ΔTf is the DEPRESSION (positive value for ΔTf means the freezing point DECREASES by ΔTf). **Property 4 — Osmotic pressure**: a semipermeable membrane (permeable to solvent, not solute) separates pure solvent from a solution; solvent flows from lower to higher chemical potential (from pure solvent into solution) to equalise μ; the pressure required to stop this flow is the osmotic pressure π. π = iMRT, where M is molarity, R = 8.314 J/mol·K, T = temperature in K. Osmotic pressure is the most sensitive of the four (useful for very dilute solutions such as polymer molecular weight determination and biological osmolality). **Van 't Hoff factor (i)**: for non-electrolytes, i = 1; for electrolytes, i = number of ions per formula unit in IDEAL dilute solution (complete dissociation): NaCl → 2, CaCl₂ → 3, AlCl₃ → 4, Na₂SO₄ → 3; in practice, incomplete dissociation and ion-pairing make i < the ideal value (measured by the ratio of the observed colligative effect to the calculated one for i = 1). **Comparative sensitivity**: for equal molality m at equal i, osmotic pressure is most sensitive (measurable at 10⁻⁵ M), then ΔTf (1.86°C/mol/kg, larger constant), then ΔTb (0.512°C/mol/kg), then VP lowering (smallest fractional change); this explains why osmotic pressure is used for polymer molar mass determination. **Molar mass determination**: from any colligative measurement, the molar mass can be calculated from the number of moles: e.g., dissolve m_solute grams of unknown polymer in m_solvent grams of solvent; measure ΔTf; calculate m = ΔTf / (Kf × i); moles = m_solvent (kg) × m (mol/kg); molar mass M = m_solute / moles.

## Mental Models
- **Chemical potential as water height**: the chemical potential of the solvent is like the height of water in a tank; pure solvent = full height; adding solute LOWERS the height; mixing two tanks at different heights (pure solvent and solution separated by a membrane) causes flow from the higher tank (pure solvent) to the lower one (solution) — that is osmosis. The external pressure required to prevent the flow is the osmotic pressure.
- **The four-branch colligative tree**: vapour pressure lowering is the trunk; the four branches grow from it because: (a) lower VP means you need higher T to boil (bp elevation); (b) lower VP means the VP curve meets the solid-VP curve at lower T (fp depression); (c) lower chemical potential drives solvent flow (osmotic pressure). All branches from one trunk.
- **The i-factor as a multiplier**: if one mole of salt gives two moles of ions, the colligative effect is doubled. The i-factor converts formula-unit molality to particle molality — the quantity colligative properties actually respond to.

## Why Students Fail
- Confusing molarity (mol/L) with molality (mol/kg) in the ΔTb/ΔTf equations — these use MOLALITY (temperature-independent, based on mass of solvent); osmotic pressure uses MOLARITY.
- Forgetting to apply the i-factor for electrolytes — treating NaCl as i = 1 and getting exactly half the correct ΔTf.
- Not knowing that Kf > Kb for water — students assume both constants are similar, leading to comparison errors.

## Misconceptions
1. **"Molarity and molality are the same in dilute aqueous solution"** (Type 1 — overgeneralization: for very dilute aqueous solutions the numerical difference is small; students extend this approximation to all contexts, leading to errors in ΔTb/ΔTf calculations at moderate concentrations and loss of the conceptual distinction).
   - Probe: "A solution is made by dissolving 10 g of glucose in 100 g of water. Is the molality the same as the molarity? Calculate both."
   - Characteristic phrase: "they're basically the same for dilute solutions" / "just use mol/L for everything"
   - Intervention: calculate molality = 0.0556 mol / 0.100 kg = 0.556 mol/kg; to calculate molarity, we'd need the volume of solution (~110 mL for this dilute case), giving ~0.505 mol/L — these are close but not identical, and the equations for ΔTb/ΔTf specifically require molality (it is temperature-independent; molarity changes with T because volume changes).

2. **"NaCl raises the boiling point by the same amount as glucose at the same molar concentration"** (Type 5 — instruction-induced: the i-factor is taught but students forget to apply it when moving between examples; glucose is used as the standard example, and NaCl is treated analogously).
   - Probe: "Compare ΔTb for 0.1 mol/kg NaCl and 0.1 mol/kg glucose. Which is larger?"
   - Characteristic phrase: "both 0.1 molal so ΔTb = Kb × 0.1 for both"
   - Intervention: NaCl: i ≈ 2 → ΔTb = 0.512 × 0.1 × 2 = 0.102°C; glucose: i = 1 → ΔTb = 0.512 × 0.1 × 1 = 0.051°C. NaCl produces TWICE the colligative effect. This is the i-factor in practice.

3. **"Osmotic pressure is a small, negligible effect"** (Type 5 — instruction-induced: osmotic pressure is sometimes taught after boiling point elevation and freezing point depression, which have numerically smaller effects at moderate molality; students assume osmotic pressure is also small; but at biological concentrations osmotic pressure is 7–8 atm, a substantial mechanical force).
   - Probe: "Blood plasma is approximately 0.28 mol/L in osmolarity. Calculate the osmotic pressure at 37°C."
   - Characteristic phrase: "osmotic pressure is too small to matter" / "you'd need a very concentrated solution"
   - Intervention: π = iMRT = 1 × 0.28 × 8.314 × 310 ≈ 720 kPa ≈ 7.1 atm. This is the osmotic pressure that red blood cell membranes must withstand. Placing a cell in pure water → 7 atm inward pressure → cell lyses. Far from negligible.

## Analogies
- **Good**: Colligative properties are like the four ways you notice that a party has more guests than expected: (1) fewer snacks per person (VP lowering), (2) the party runs longer before ending (bp elevation), (3) the party starts later in winter (fp depression), (4) more people push through the door (osmotic pressure). All four effects follow from the same cause: more guests (more solute particles).
- **Anti-analogy**: Do NOT say "osmotic pressure is like suction" — osmosis is driven by a chemical potential DIFFERENCE (the thermodynamic tendency of solvent to equalise its activity); there is no actual suction mechanism; the membrane doesn't pull the water, it just blocks the solute while the water moves spontaneously down its chemical potential gradient.

## Demonstrations
- **Egg in salt water vs. fresh water**: place a raw egg in highly concentrated salt solution (egg shrinks, water leaves by osmosis) then in pure water (egg swells, water enters) — dramatic osmosis demonstration.
- **Antifreeze**: add ethylene glycol to water; measure ΔTf; confirm that it is much larger than expected for i = 1 (ethylene glycol is a non-electrolyte, i = 1, but high molality gives measurable depression of several degrees); connect to car radiator antifreeze function (ΔTf protects against freezing at −40°C with ~50% v/v solution).
- **Potato osmosis**: cut equal potato cylinders; one in pure water (swells, gains mass), one in concentrated NaCl (shrinks, loses mass), one in 0.9% saline (no change — isotonic); the isotonic point demonstrates osmotic equilibrium quantitatively.

## Discovery Questions
1. You dissolve 18 g of glucose (M = 180 g/mol) in 500 g of water. Calculate the boiling point and freezing point of the solution.
2. Which depresses the freezing point more: 0.1 mol/kg NaCl, 0.1 mol/kg CaCl₂, or 0.1 mol/kg Al₂(SO₄)₃? Rank them and calculate ΔTf for each.
3. A polymer solution (1 g polymer in 100 g water) has an osmotic pressure of 0.0036 atm at 25°C. Calculate the molar mass of the polymer.
4. Why is Kf for water (1.86) larger than Kb (0.512)? What does this tell you about which measurement is more sensitive for dilute solutions?

## Teaching Sequence
1. **Recap vapour pressure lowering** and connect to "lowering of solvent chemical potential" as the root.
2. **Boiling point elevation**: show on the P–T diagram that the solution's VP curve meets atmospheric pressure at a higher T; state the equation ΔTb = Kb × m × i; work one non-electrolyte example.
3. **Freezing point depression**: show on the P–T diagram; state ΔTf = Kf × m × i; note Kf > Kb for water; work one example; connect to road salt and antifreeze.
4. **Van 't Hoff factor**: introduce i formally; calculate for NaCl (2), CaCl₂ (3), Na₂SO₄ (3), glucose (1); work one electrolyte ΔTf example.
5. **Osmotic pressure**: membrane diagram; solvent flows from low to high concentration; π = iMRT; work one biological example (blood plasma).
6. **Comparative sensitivity**: rank the four properties for sensitivity at the same molality; explain why osmotic pressure is used for polymer molar mass.
7. **Molar mass determination**: work through a ΔTf-based molar mass calculation for an unknown solute.

## Tutor Actions
- **If student uses molarity in ΔTb/ΔTf**: "Which equation is this?" ΔTb = Kb × m; "what does m stand for here?" — molality; "what are the units of molality?" — mol/kg of solvent.
- **If student omits i**: "Is the solute an electrolyte?" if yes, "how many ions per formula unit?" multiply.
- **If student underestimates osmotic pressure**: do the calculation together for blood plasma; the ~7 atm result is usually surprising and memorable.

## Voice Teaching Notes
- "All four properties have one cause: the solute dilutes the solvent, lowering its chemical potential." Say this before every colligative property calculation.
- "Molality — grams of solvent, not grams of solution — and it is moles of solute formula units divided by kilograms of solvent."
- "The i-factor doubles, triples, quadruples the effect. Never forget it for an ionic solute."
- For osmotic pressure: "Seven atmospheres for normal blood. That's what your red blood cell membranes hold every second."

## Assessment Signals
- **Green**: calculates ΔTb, ΔTf, and π correctly for both non-electrolyte and electrolyte; applies i correctly for di/trivalent salts; explains why all four are colligative (count-dependent); explains the chemical-potential / VP-lowering root cause.
- **Amber**: correct formula but incorrect i; uses molarity instead of molality for ΔTf; knows the equations but cannot explain why freezing is depressed (does not have the P–T diagram argument).
- **Red**: says colligative properties depend on solute identity; omits i for electrolytes; confuses molarity and molality.

## Tutor Recovery Strategy
- Molarity/molality confusion: go back to definitions; state explicitly "molality does not change with temperature because it uses mass (kg of solvent), not volume; molarity changes with T because volume expands."
- i-factor omission: ask "does NaCl give 1 particle or 2 when dissolved?" — the answer immediately implies the need for i.
- Chemical potential argument: draw the P–T diagram with two VP curves (pure solvent above, solution below); show where each meets the atmospheric pressure line (bp) and the solid VP curve (fp); the visual argument is more convincing than the equation alone.

## Memory Hooks
- **ΔTb = Kb × m × i; ΔTf = Kf × m × i; π = iMRT** — the three equations; note molality in ΔT, molarity in π.
- **Kf (water) = 1.86; Kb (water) = 0.512** — freezing more sensitive by ~3.6×.
- **i = number of ions per formula unit** — 1 (glucose), 2 (NaCl), 3 (CaCl₂ or Na₂SO₄), 4 (AlCl₃).
- **One cause, four effects** — the colligative mantra.

## Transfer Connections
- **Vapour pressure lowering** (chem.sol.vapour-pressure): the root cause; Raoult's law is the quantitative statement; here we see its four consequences.
- **Phase diagrams** (chem.state.phase-diagram): the P–T diagram explains why both bp elevation and fp depression occur from the same VP curve shift.
- **Osmotic pressure in biological systems**: blood osmolality regulation; intravenous drip isotonicity; dialysis; plant cell turgor — all governed by π = iMRT.
- **Cryoscopy for molar mass**: measuring ΔTf to determine molar mass of an unknown polymer or protein (a classic undergraduate physical chemistry experiment).

## Cross-Subject Connections
- **Biology**: osmoregulation in fish (freshwater fish maintain lower osmolarity than their surroundings and actively pump solutes out; marine fish have the reverse problem); plant osmosis (guard cells control stomata opening by changing osmolarity); kidney concentrating urine by osmotic gradient.
- **Engineering**: road salting — depressing the freezing point of water by spreading NaCl (ΔTf ≈ 3.7°C per 0.1 mol/kg × i=2); the use of CaCl₂ gives ~double the depression per mole (i=3) and is preferred at very low temperatures.
- **Food science**: salt and sugar lower the water activity (and VP) in food, creating an osmotic environment that inhibits microbial growth — food preservation is an applied colligative property.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.sol.colligative`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.sol.colligative` as of 2026-07-23.

## Curriculum Feedback
- The KG prerequisite for this node is only `chem.sol.vapour-pressure`, which is correct since the physical origin of all four properties is the VP lowering. However, for the P–T diagram explanation of bp elevation and fp depression, students ideally should also have covered `chem.state.phase-diagram`; a cross-link would improve the conceptual grounding.
- The molar mass determination application (from ΔTf or osmotic pressure) is one of the most practically useful skills arising from colligative properties; it should be explicitly flagged as an assessment skill, not just mentioned in passing.

## Version History
- v1.0.0 — 2026-07-24 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
