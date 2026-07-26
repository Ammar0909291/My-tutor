# Teaching Blueprint: Concentration Units

## 0. Concept Metadata
| Field | Value |
|---|---|
| **Concept ID** | chem.found.concentration |
| **Name** | Concentration Units |
| **Domain** | Chemistry Foundations |
| **Difficulty** | Developing |
| **Bloom Level** | Apply |
| **Estimated Hours** | 3 |
| **Mastery Threshold** | 0.75 |
| **Prerequisites** | chem.found.mole-concept |
| **Unlocks** | chem.anal.volumetric, chem.equil.kw-ph, chem.kinet.rate, chem.redox.titrations, chem.sol.types |

---

## 1. Concept Spine

**One-sentence definition:** Different concentration units (molarity, molality, mole fraction, mass percent, ppm) each define concentration relative to a DIFFERENT reference quantity (solution volume vs. solvent mass vs. total moles vs. total mass), and confusing which reference quantity a given unit uses is the central error this concept eliminates — most critically, molarity uses solution VOLUME while molality uses solvent MASS, a distinction with real, non-interchangeable numerical consequences.

**The core insight:** "Concentration" is not one single idea — it is a family of related but numerically DIFFERENT quantities, each dividing "how much solute" by a different reference denominator. Molarity divides by total solution volume (which changes with temperature, since volume expands/contracts). Molality divides by solvent mass alone (unaffected by temperature, since mass doesn't change). Mixing up which denominator a given unit uses — especially the molarity/molality volume-vs-mass confusion — produces answers that are numerically wrong, not just imprecisely labeled.

**Conceptual chain:**
1. Molarity (M) = moles solute / litres of SOLUTION (the total volume after mixing, not the volume of solvent used before mixing).
2. Molality (m) = moles solute / kilograms of SOLVENT alone (never solution mass or volume) — this is why molality, unlike molarity, does not change with temperature (mass doesn't expand/contract; volume does).
3. Mole fraction (χ) = moles of one component / total moles of ALL components (solute + solvent combined).
4. Mass percent = (mass of solute / mass of total solution) × 100 — a ratio of masses, not moles or volumes.
5. Parts per million (ppm) generalizes mass percent to far more dilute solutions, and itself has TWO different conventions (mg solute per kg solution = ppm by mass; mg solute per L solution = ppm by volume) that coincide numerically only for dilute AQUEOUS solutions (density ≈ 1 g/mL) — not for denser or non-aqueous solutions.
6. Dilution calculations (C₁V₁ = C₂V₂) use the FINAL total solution volume as V₂, never the volume of water added — a frequently confused distinction, since the volume of water added equals V₂ − V₁, appearing in neither side of the dilution equation directly.

**Central relations:**
- Molarity: moles / L of SOLUTION (volume, temperature-dependent).
- Molality: moles / kg of SOLVENT (mass, temperature-independent).
- C₁V₁ = C₂V₂: V₂ is the FINAL total solution volume, never the volume of water added.
- ppm by mass ≠ ppm by volume in general; they coincide only for dilute aqueous solutions (density ≈ 1 g/mL).

---

## 2. Four-Stage CPA+ Mental Model

### Concrete (Enactive)
- A physical (or described) comparison: preparing a molar solution by adding solute to a volumetric flask and filling to the calibration MARK with solvent (final volume matters, not how much solvent was actually added) versus preparing a molal solution by weighing out a specific mass of solvent on a balance FIRST, then adding solute (solvent mass is fixed and known before mixing).
- A dilution walkthrough: starting with 25.0 mL of concentrated stock solution, adding water until the TOTAL volume reaches 250.0 mL (not until 250.0 mL of water has been added).

### Representational (Iconic)
- A concentration-unit comparison table: unit name, formula, reference denominator (volume of solution / mass of solvent / total moles / mass of solution), and whether it's temperature-dependent.
- A dilution diagram showing a small stock-solution volume V₁ diluted up to a larger final volume V₂, with V₂ explicitly labeled as the TOTAL final volume, and (V₂ − V₁) separately labeled as "water added" off to the side, visually separated from the main C₁V₁=C₂V₂ relationship.

### Abstract (Symbolic)
- M = mol solute / L solution; m = mol solute / kg solvent; χ = mol component / total mol; mass % = (mass solute/mass solution) × 100.
- C₁V₁ = C₂V₂, with V₂ always meaning final total solution volume.

### Transfer (+)
- Titration calculations (a direct successor) depend entirely on correct molarity and dilution reasoning.
- Chemical kinetics (rate laws) express reaction rates in terms of molar concentration changes over time.
- Environmental and biomedical science report contaminant/drug concentrations in ppm or mass percent, requiring correct unit interpretation for safety and dosage decisions.

---

## 3. Why Beginners Fail

**Mode 1 — Treating molarity and molality as interchangeable, both volume-based:** Correct: molarity uses solution VOLUME (temperature-dependent); molality uses solvent MASS alone (temperature-independent) — a genuinely different denominator producing genuinely different numerical values for the same solution.

**Mode 2 — Using the volume of water ADDED as V₂ in dilution calculations:** Correct: V₂ in C₁V₁=C₂V₂ is always the FINAL TOTAL solution volume after dilution, never the volume of water added alone — these are different quantities related by V(water added) = V₂ − V₁.

**Mode 3 — Assuming ppm always means the same thing (mg/L) regardless of solution density:** Correct: ppm by mass (mg/kg) and ppm by volume (mg/L) are numerically identical only for dilute solutions with density approximately 1 g/mL (like dilute aqueous solutions) — they genuinely differ for denser solutions like seawater.

---

## 4. Misconception Library

### MC-1: "Molality uses volume like molarity"
- **Probe:** "What is the molality of a solution made by dissolving 10.0 g NaCl in 500.0 g water?"
- **Characteristic phrase:** "10.0 g NaCl in 500 mL of solution."
- **Trigger:** Language contamination — molarity and molality sound and look nearly identical, inviting students to mentally merge their definitions.
- **Conflict evidence [P28]:** The problem specifies 500.0 g of WATER (a mass, the solvent), not a volume of solution — molality is defined specifically using solvent mass, so this problem is directly solvable with the given information via m = mol solute / kg solvent = (10.0 g ÷ 58.44 g/mol) / 0.5000 kg ≈ 0.342 mol/kg. Attempting to treat 500 g as if it were 500 mL of solution (molarity's denominator) would require an unstated density assumption and use the wrong formula's logic entirely.
- **Bridge [P30]:** "Molality = moles solute divided by KILOGRAMS OF SOLVENT — never solution volume, never solution mass. Compute the moles of NaCl (10.0 g ÷ 58.44 g/mol ≈ 0.171 mol), convert the given water mass to kg (500.0 g = 0.5000 kg), then divide: 0.171 mol / 0.5000 kg = 0.342 mol/kg."
- **Replacement [P31]:** Molality's denominator is solvent mass (kg), fundamentally different from molarity's solution-volume (L) denominator — never interchange the two.
- **Discrimination pairs [P33]:** "10.0 g NaCl in 500.0 g water" (a mass-based problem — use molality's formula) vs. "10.0 g NaCl dissolved to make 500.0 mL of solution" (a volume-based problem — use molarity's formula) — visually similar wording, genuinely different required formula.
- **S6 repair path:** Re-state the given information explicitly as "mass of solvent" vs. "volume of solution" before selecting a formula.

### MC-2: "In dilution, V₂ = V(water added)"
- **Probe:** "You dilute 25.0 mL of 6.00 M HCl to make 250.0 mL of solution. What is the final concentration? What volume of water did you add?"
- **Characteristic phrase:** "C₂ = C₁V₁/(water added) = 6.00 × 25.0 / 225.0."
- **Trigger:** Instruction-induced — students conflate "the volume added during dilution" (water added) with "the final total volume" (V₂), which the dilution equation actually requires.
- **Conflict evidence [P28]:** The dilution equation C₁V₁=C₂V₂ (a direct restatement of "moles of solute don't change during dilution") requires V₂ to be the TOTAL final volume, since that's the volume the same fixed number of solute moles is now distributed through. Using 225.0 mL (water added, not total volume) instead of 250.0 mL (the stated final total volume) in the formula gives a numerically wrong, and conceptually inconsistent, answer.
- **Bridge [P30]:** "The dilution formula tracks moles of solute, which don't change when you add water — only the volume they're spread through changes. V₂ is always the FINAL TOTAL volume (250.0 mL here, as stated in the problem), not the water you poured in. The water-added amount (225.0 mL) is a separate, related quantity — it equals V₂ minus V₁ — but it never appears directly in the C₁V₁=C₂V₂ formula itself."
- **Replacement [P31]:** V₂ in the dilution equation is always the final total solution volume; the volume of water added (V₂ − V₁) is a related but separate quantity that never appears directly in the formula.
- **Discrimination pairs [P33]:** C₂ = (6.00)(25.0)/250.0 = 0.600 M (correct — using final total volume) vs. a wrongly-computed C₂ = (6.00)(25.0)/225.0 (using water-added volume instead).
- **S6 repair path:** Explicitly label the diluted flask's TOTAL volume (V₂) separately from the water-added amount (V₂−V₁) before applying the formula.

### MC-3: "ppm is always mg/L"
- **Probe:** "Is 1 ppm of lead in seawater (density 1.025 g/mL) the same as 1 ppm in pure water? Why or why not?"
- **Trigger:** Instruction-induced — for very dilute aqueous solutions (density ≈ 1 g/mL), mg/kg and mg/L happen to be numerically nearly identical, and this coincidental approximation gets generalized as an exact, universal rule.
- **Conflict evidence [P28]:** ppm by MASS (mg solute per kg solution) and ppm by VOLUME (mg solute per L solution) are only numerically equal when solution density equals exactly 1 kg/L. Seawater's density (1.025 g/mL) means these two conventions genuinely diverge for seawater — 1 ppm by mass in seawater is NOT numerically identical to 1 ppm by volume in seawater, unlike the near-exact coincidence for pure water.
- **Bridge [P30]:** "ppm by mass is milligrams per kilogram of solution; ppm by volume is milligrams per litre of solution. These only give the same number when density is exactly 1 kg/L — true (approximately) for very dilute aqueous solutions, but genuinely false for denser solutions like seawater, or any non-aqueous solvent. Always check which convention a reported ppm value is using."
- **Replacement [P31]:** ppm by mass and ppm by volume are numerically equal only for solutions with density approximately 1 g/mL; they diverge for denser or non-aqueous solutions, so the specific convention must always be checked.
- **Discrimination pairs [P33]:** 1 ppm lead in pure water (mass and volume conventions nearly coincide, density ≈ 1 g/mL) vs. 1 ppm lead in seawater (conventions genuinely diverge, density 1.025 g/mL).
- **S6 repair path:** Explicitly compute both ppm-by-mass and ppm-by-volume for the seawater case and show the numerical divergence before returning to the probe.

---

## 5. Explanation Library

**Explanation A — Different denominators, different units (conceptual):**
"Every concentration unit divides 'how much solute' by a DIFFERENT reference quantity. Molarity divides by solution volume — a quantity that expands and contracts with temperature. Molality divides by solvent mass alone — a quantity completely unaffected by temperature. Mole fraction divides by total moles of everything present. Mass percent divides by total solution mass. Before doing any calculation, identify exactly which denominator the requested unit uses, and check whether the given information matches that denominator directly or needs conversion first."

**Explanation B — The dilution equation tracks moles, not water volume (conceptual):**
"C₁V₁ = C₂V₂ works because it's really just 'moles before dilution = moles after dilution' (since adding water never removes or creates solute). V₁ and V₂ are the total solution volumes at each stage — before and after adding water — never the volume of water itself. The amount of water added is simply V₂ minus V₁, a useful but separate quantity from what the formula directly uses."

---

## 6. Analogy Library

**Primary analogy — Recipe measured by total dish weight vs. by ingredient weight alone:**
Molarity is like measuring "spice per total finished dish weight" (spice amount ÷ total dish, which changes if you add more broth/water to the pot). Molality is like measuring "spice per pound of the base ingredient alone" (spice amount ÷ base ingredient mass only, unaffected by how much broth you later add) — these give genuinely different numbers for the same amount of spice, depending on which reference you're dividing by.

**Breaking point:** A recipe's "base ingredient" is usually a fixed, obvious choice; in a solution, correctly identifying which component is the "solvent" (for molality's denominator) versus the "solution" (for molarity's denominator) requires more careful, explicit checking than the recipe analogy alone conveys.

**Anti-analogy:** Do NOT describe molality as "basically the same as molarity, just for really precise work" — this reinforces MC-1's core conflation; the two units differ in their actual DEFINITION (mass vs. volume denominator), not merely in precision level.

---

## 7. Demonstration Library

**Demo 1 — Molarity vs. molality preparation comparison:**
Contrast preparing a solution to a volumetric flask's calibration mark (molarity — final volume fixed) against weighing out a fixed mass of solvent first (molality — solvent mass fixed), directly targeting MC-1.

**Demo 2 — Dilution volume-labeling diagram:**
Draw the dilution flask explicitly labeling V₁ (stock), V₂ (final total, after adding water), and V₂−V₁ (water added) as three separate, clearly distinguished quantities, directly targeting MC-2.

**Demo 3 — ppm-by-mass vs. ppm-by-volume seawater calculation:**
Compute both conventions explicitly for the seawater density case, showing the genuine numerical divergence, directly targeting MC-3.

---

## 8. Discovery Lesson

**Opening (5 min):** "Molarity and molality sound almost identical and are spelled almost identically. Are they actually the same thing, just spelled differently?"

**Exploration (15 min):**
- Run Demo 1 (preparation comparison), directly targeting MC-1.
- Build Explanation A (different denominators) step by step, applying it to all five concentration units.

**Synthesis (10 min):**
- Run Demo 2 (dilution volume-labeling diagram), directly targeting MC-2, then build Explanation B.
- Run Demo 3 (ppm-by-mass vs. ppm-by-volume), directly targeting MC-3.

**Closure:** "Five different concentration units, five different denominators. Before you calculate anything, ask: which denominator does this specific unit actually use — solution volume, solvent mass, total moles, or total mass? Get that question right, and the rest is arithmetic."

---

## 9. Teaching Actions

*(session_cap = 4 actions)*

**TA-1 [DEMONSTRATE + EXPLAIN]:** Demo 1 (molarity vs. molality preparation) alongside Explanation A, directly probing MC-1.

**TA-2 [DEMONSTRATE + EXPLAIN]:** Demo 2 (dilution volume-labeling diagram) alongside Explanation B, directly probing MC-2.

**TA-3 [DEMONSTRATE]:** Demo 3 (ppm-by-mass vs. ppm-by-volume), directly probing MC-3.

**TA-4 [PRACTICE]:** Mixed practice problems requiring students to first identify the correct denominator before calculating.

---

## 10. Voice Teaching

**Opening:**
"Molarity and molality — they sound almost the same, they're spelled almost the same. Are they actually the same thing?"

**At the molarity/molality clarification:**
"Molarity divides by the volume of the WHOLE solution — and volume changes with temperature. Molality divides by the mass of just the SOLVENT — and mass never changes with temperature. That's not a minor technical difference. It's why chemists use molality, not molarity, whenever temperature might shift during an experiment."

**At the dilution clarification:**
"C-one-V-one equals C-two-V-two tracks moles of solute, which never change when you add water. V-two is always the FINAL total volume — not how much water you poured in. If you diluted 25 mL up to 250 mL total, V-two is 250, full stop, even though you only added 225 mL of water to get there."

---

## 11. Assessment

**Mastery gate:** Student correctly applies the molarity and molality formulas using the correct denominator, correctly applies the dilution equation with the correct V₂, and correctly explains when ppm-by-mass and ppm-by-volume diverge. Score ≥ 75%.

**FA-1 — Molarity vs. molality:**
*Q: A solution is made by dissolving 5.00 g of KCl in enough water to make 250.0 mL of solution. Is this scenario best solved using molarity or molality? Compute the value.*
Expected: Molarity (the problem gives final solution volume, not solvent mass); M = (5.00 g / 74.55 g/mol) / 0.2500 L ≈ 0.268 M.
Threshold: Must correctly identify molarity as the appropriate unit from the given information type, not just compute a number.

**FA-2 — Dilution:**
*Q: 10.0 mL of 2.00 M NaOH is diluted to a final total volume of 100.0 mL. What is the new concentration? How much water was added?*
Expected: C₂ = (2.00)(10.0)/100.0 = 0.200 M; water added = 100.0 − 10.0 = 90.0 mL (computed separately, not used in the C₁V₁=C₂V₂ formula itself).
Threshold: Must use 100.0 mL (not 90.0 mL) as V₂ in the concentration calculation.

**FA-3 — ppm convention:**
*Q: Explain why "5 ppm of a contaminant" in a dense industrial solvent (density 1.4 g/mL) might mean a different actual mass than "5 ppm" in dilute water, even using the same numerical value.*
Expected: ppm by mass (mg/kg) and ppm by volume (mg/L) coincide only near density 1 g/mL; a denser solvent makes the two conventions diverge, so the SAME "5 ppm" number represents different actual masses depending on which convention and which solvent.
Threshold: Must correctly explain the density-dependence of the mass/volume convention divergence.

**Confidence calibration:** After FA-1, students rate confidence before revealing the answer; students confident but wrong are walked through Demo 1's preparation comparison again before re-attempting a parallel item.

**Delayed retrieval (session + 3):** "Explain why molality does not change with temperature while molarity does." Expected: molality's denominator (solvent mass) is temperature-independent; molarity's denominator (solution volume) expands/contracts with temperature.

---

## 12. Recovery Notes

**S3:** Student can recite all five formulas but selects the wrong one for a given problem. Re-run Explanation A's denominator-identification framework explicitly against the specific problem before returning to the probe.

**S4:** Student uses water-added volume instead of final total volume in dilution calculations (MC-2). Re-run Demo 2's explicit volume-labeling diagram for the specific problem.

**S6:** Student is anxious about "five different units, too much to memorize." Anchor entirely in the single organizing question — "what is this unit's denominator?" — rather than memorizing five formulas independently.

**S9:** Extend into mole-fraction-to-molality interconversion as enrichment, previewing solution-property calculations in later domains.

---

## 13. Memory & Review

**Memory type:** Procedural/conceptual (denominator-identification framework, dilution volume tracking) — retrieval practice should emphasize selecting the correct formula for novel problem phrasings, not just reciting formulas.

**Spaced retrieval schedule:**
- Session + 1: "Identify the correct concentration unit and denominator for a given problem's stated information."
- Session + 3: "Apply the dilution equation correctly, using final total volume as V₂."
- Session + 7: "Explain when ppm-by-mass and ppm-by-volume diverge."

**Interleaving partners:** chem.found.mole-concept (prerequisite — mole calculations reused directly), chem.sol.types (successor — deepens solution-property applications), chem.kinet.rate (successor — rate laws expressed in molar concentration).

---

## 14. Transfer Map

**Near transfer:** Titrations and volumetric analysis (direct successors) depend entirely on correct molarity and dilution reasoning to determine unknown concentrations from measured volumes.

**Far transfer:** Chemical kinetics (rate laws expressed in molar concentration change over time), equilibrium (Kw/pH calculations directly using molarity), environmental/biomedical reporting (ppm-based contaminant/dosage reporting) all depend on this concept's unit-discrimination fluency.

**Structural abstraction:** "A quantity described as 'concentration' or 'ratio' is only fully specified once its exact reference denominator is identified — the same numerator (amount of solute) can produce genuinely different reported values depending on what it's divided by." This denominator-awareness principle recurs throughout quantitative reasoning generally (rates, densities, and ratios of all kinds).

---

## 15. Curriculum Feedback

- **Prerequisite adequacy:** chem.found.mole-concept is necessary and sufficient — this concept directly extends mole calculations into multiple concentration-unit contexts.
- **Unlock readiness:** All five direct unlocks (volumetric analysis, Kw/pH, reaction rates, redox titrations, solution types) depend critically on concentration-unit fluency established here; this concept correctly serves as a high-leverage hub.
- **Difficulty calibration:** Developing/Apply at 0.75 mastery threshold is appropriate — correctly selecting and applying the right formula among five options for a novel problem requires genuine procedural application beyond the Foundational tier's simpler recall demands.
- **No open issues:** description, prerequisites, and unlocks are internally consistent with the Chemistry KG's Foundations domain.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
