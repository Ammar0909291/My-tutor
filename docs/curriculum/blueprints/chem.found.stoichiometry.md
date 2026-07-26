# Teaching Blueprint: Stoichiometry

## 0. Concept Metadata
| Field | Value |
|---|---|
| **Concept ID** | chem.found.stoichiometry |
| **Name** | Stoichiometry |
| **Domain** | Chemistry Foundations |
| **Difficulty** | Developing |
| **Bloom Level** | Apply |
| **Estimated Hours** | 4 |
| **Mastery Threshold** | 0.75 |
| **Prerequisites** | chem.found.mole-concept |
| **Unlocks** | chem.anal.gravimetric |

---

## 1. Concept Spine

**One-sentence definition:** A balanced equation's coefficients specify MOLE ratios (never mass ratios), so every stoichiometry calculation must convert given masses to moles first, apply the mole ratio from the balanced equation, then convert back to mass — skipping the moles step and reading coefficients as mass ratios is the single most common error in the entire topic.

**The core insight:** The equation 2H₂ + O₂ → 2H₂O does NOT mean "2 grams of hydrogen reacts with 1 gram of oxygen" — it means 2 MOLES of H₂ react with 1 MOLE of O₂, and since a mole of H₂ and a mole of O₂ have very different masses (2.016 g/mol vs. 32.00 g/mol), the actual mass ratio required is nothing like 2:1. Every stoichiometry problem is fundamentally a mole-ratio problem wearing a mass-ratio disguise, and the mandatory three-step conversion (mass → moles → mole ratio → moles → mass) is what correctly translates between them.

**Conceptual chain:**
1. A balanced chemical equation's coefficients state the MOLE ratio in which reactants combine and products form — never a mass ratio, never a volume ratio (except for gases under specific conditions, a separate later topic).
2. To use a given mass in a stoichiometry calculation, first convert to moles (mass ÷ molar mass), then apply the mole ratio from the balanced equation, then convert the resulting moles back to whatever final unit is needed (mass, particles, volume).
3. A LIMITING REAGENT is identified by comparing the ACTUAL mole ratio of reactants present to the REQUIRED mole ratio from the balanced equation — never by comparing raw masses or raw mole counts alone, since the required ratio itself may not be 1:1.
4. Theoretical yield is the maximum product mass calculable from the limiting reagent via the mole-ratio method; actual yield (measured in the lab) is always LESS THAN OR EQUAL TO theoretical yield, since real reactions lose some product to side reactions, incomplete reaction, or physical transfer losses.
5. Percent yield = (actual yield / theoretical yield) × 100 — a result GREATER than 100% signals a measurement or calculation error (contamination, arithmetic mistake), never a genuinely "better than perfect" reaction.

**Central relations:**
- Balanced equation coefficients = mole ratio (never mass ratio).
- Stoichiometry calculation path: mass → moles (÷ molar mass) → mole ratio (× coefficient ratio) → moles → mass (× molar mass).
- Limiting reagent: compare ACTUAL mole ratio present to REQUIRED mole ratio from the equation, not raw mass or raw mole count alone.
- Percent yield = actual/theoretical × 100; a result >100% indicates an error, not a physically real outcome.

---

## 2. Four-Stage CPA+ Mental Model

### Concrete (Enactive)
- A sandwich-assembly analogy acted out: a recipe requiring 2 bread slices + 1 cheese slice → 1 sandwich; given 10 bread slices and 3 cheese slices, cheese is limiting (only 3 sandwiches possible, using 6 bread and leaving 4 bread slices unused) — a direct mole-ratio-comparison parallel with everyday, countable units.
- A worked calculation walked through step by step on the board: given mass → moles → mole ratio → moles → given mass, with each arrow and conversion factor explicitly labeled.

### Representational (Iconic)
- The four-step stoichiometry "map" diagram: mass A -> moles A -> moles B (via equation ratio) -> mass B, drawn as a literal flowchart with the specific conversion factor labeled on each arrow.
- A limiting-reagent bar chart: available moles of each reactant shown as bars, with the REQUIRED ratio (from the balanced equation) overlaid to visually reveal which reactant runs out first.

### Abstract (Symbolic)
- The mole-ratio bridge: mol A × (coefficient B / coefficient A) = mol B, directly read off the balanced equation's coefficients.
- Percent yield = (actual yield / theoretical yield) × 100, with theoretical yield always computed FROM the limiting reagent specifically.

### Transfer (+)
- Gravimetric analysis (the immediate successor) uses stoichiometric mass relationships to determine an unknown sample's composition from a precipitate's measured mass.
- Industrial chemical process design and cost estimation depend entirely on correctly predicting reactant requirements and product yields at scale.
- Pharmaceutical synthesis yield optimization uses the identical limiting-reagent and percent-yield framework to evaluate reaction efficiency.

---

## 3. Why Beginners Fail

**Mode 1 — Reading balanced-equation coefficients as mass ratios:** Correct: coefficients state MOLE ratios; since different substances have different molar masses, the actual mass ratio required is almost never the same as the coefficient ratio, and must be computed via the moles bridge.

**Mode 2 — Identifying the limiting reagent by comparing raw mass or raw mole count alone, without the required ratio:** Correct: identifying the limiting reagent requires comparing the ACTUAL available mole ratio to the REQUIRED mole ratio from the equation — a reactant with a smaller raw mass or mole count is not automatically limiting if the required ratio isn't 1:1.

**Mode 3 — Accepting a percent yield calculation above 100% at face value:** Correct: percent yield above 100% is physically impossible for a genuine, uncontaminated product measurement — it signals a measurement error, calculation error, or product contamination, and should prompt re-checking rather than acceptance.

---

## 4. Misconception Library

### MC-1: "Coefficients represent mass ratios"
- **Probe:** "The reaction 2H₂ + O₂ → 2H₂O. If you use 4 g of H₂, how many grams of O₂ are needed? Show each step."
- **Characteristic phrase:** "2 grams of hydrogen reacts with 1 gram of oxygen."
- **Trigger:** Instruction-induced — the coefficient "2" appearing directly next to "H₂" looks visually like "2 grams of H₂," inviting a direct mass-ratio reading without the moles conversion step.
- **Conflict evidence [P28]:** Converting 4 g H₂ to moles first (4 g ÷ 2.016 g/mol ≈ 1.98 mol H₂), applying the mole ratio (1.98 mol H₂ × (1 mol O₂ / 2 mol H₂) = 0.99 mol O₂), then converting back to mass (0.99 mol × 32.00 g/mol ≈ 31.7 g O₂) gives an answer nothing like the naive "2 g O₂" a direct-mass-ratio reading would suggest — the correct mass ratio (4 g : 31.7 g, roughly 1:8) is wildly different from the coefficient ratio (2:1), precisely because H₂ and O₂ have very different molar masses.
- **Bridge [P30]:** "The coefficient '2' in front of H₂ means 2 MOLES, never 2 grams. Moles is the only bridge between the equation's coefficients and any mass calculation — always convert given mass to moles first, apply the mole ratio from the coefficients, then convert the result back to mass. Skipping the moles step and reading coefficients directly as mass ratios will always give a wrong answer unless the two substances happen to have identical molar masses."
- **Replacement [P31]:** Balanced-equation coefficients state mole ratios; converting to and from mass always requires the moles bridge (mass ÷ molar mass, then × mole ratio, then × molar mass).
- **Discrimination pairs [P33]:** 4 g H₂ requiring 31.7 g O₂ (correct, via the moles bridge) vs. a naively-computed 2 g O₂ (wrong, from directly reading the 2:1 coefficient ratio as a mass ratio).
- **S6 repair path:** Re-run the full four-step conversion (mass -> moles -> mole ratio -> moles -> mass) explicitly, labeling each step, before returning to the probe.

### MC-2: "Smallest mass = limiting reagent"
- **Probe:** "You have 4.0 g of H₂ and 32.0 g of O₂. For the reaction 2H₂ + O₂ → 2H₂O, which is the limiting reagent?"
- **Characteristic phrase:** "H₂ is the limiting reagent because 4.0 g < 32.0 g."
- **Trigger:** Overgeneralization — a simple "smaller number wins" heuristic feels intuitive but ignores that the required reaction ratio (2:1, not 1:1) must be accounted for.
- **Conflict evidence [P28]:** Converting both masses to moles (H₂: 4.0/2.016 ≈ 1.98 mol; O₂: 32.0/32.00 = 1.00 mol) and comparing to the required 2:1 ratio: the available ratio is 1.98:1.00, which is LESS than the required 2:1 (since 1.98 < 2.00 for the same 1.00 mol of O₂) — meaning H₂ actually IS limiting in this specific case, but this conclusion required the full mole-ratio comparison, not the raw-mass comparison alone (which happened to give the same answer here by coincidence, not by valid reasoning).
- **Bridge [P30]:** "Never compare limiting reagent by raw mass, and not even by raw mole count alone — always compare the ACTUAL mole ratio present to the REQUIRED mole ratio from the balanced equation. Convert both reactants' masses to moles, form the actual ratio, and check whether it matches, exceeds, or falls short of what the equation requires. Whichever reactant falls short relative to its required amount is limiting."
- **Replacement [P31]:** Limiting reagent is identified by comparing the actual mole ratio of reactants present to the required mole ratio from the balanced equation — never by comparing raw mass or raw mole count in isolation.
- **Discrimination pairs [P33]:** Correctly identifying H₂ as limiting via the 1.98:1.00-vs-2:1 mole-ratio comparison (valid reasoning) vs. incorrectly identifying H₂ as limiting purely because "4.0 g is a smaller number than 32.0 g" (invalid reasoning that happens to reach the same conclusion here, but would fail on a differently-proportioned problem).
- **S6 repair path:** Re-run the full mole-ratio comparison procedure explicitly on a DIFFERENT example where raw-mass comparison gives the WRONG answer, to break the false heuristic.

### MC-3: "Percent yield can exceed 100%"
- **Probe:** "If your percent yield calculation gives 112%, what does this mean? Is it possible in principle?"
- **Trigger:** Instruction-induced — students accept a computed calculator output at face value without applying physical reasoning to check whether the result is even possible.
- **Conflict evidence [P28]:** Theoretical yield represents the maximum possible product mass achievable from complete, perfectly efficient conversion of the limiting reagent — by definition, no real reaction (with inevitable losses to side reactions, incomplete conversion, or transfer losses) can exceed this theoretical maximum. A measured "actual yield" exceeding theoretical yield is physically impossible for a pure, correctly-identified product, and necessarily indicates either a measurement/calculation error or product contamination (extra mass from an impurity, not the actual product itself).
- **Bridge [P30]:** "Percent yield above 100% is not a lucky outcome — it's a red flag. It means the 'actual yield' number used in the calculation is larger than the true theoretical maximum, which is only possible if something is wrong: a calculation error somewhere upstream, or the measured product is contaminated with something else (unreacted starting material, drying-flask residue, etc.), inflating its measured mass beyond the pure product's true mass."
- **Replacement [P31]:** Percent yield above 100% is physically impossible for a genuine, pure product measurement; it signals a measurement error, calculation error, or contamination requiring investigation, not a valid "better than perfect" result.
- **Discrimination pairs [P33]:** A percent yield of 85% (physically plausible, typical of real reactions with some loss) vs. 112% (physically impossible, signals an error requiring investigation).
- **S6 repair path:** Walk through the theoretical-yield-as-maximum-possible reasoning explicitly, then have the student propose specific error sources that could explain the >100% result.

---

## 5. Explanation Library

**Explanation A — The four-step stoichiometry bridge (procedural):**
"Every stoichiometry calculation follows the same four-step path: given mass of substance A, divide by A's molar mass to get moles of A; multiply by the mole ratio from the balanced equation's coefficients (coefficient of B over coefficient of A) to get moles of B; multiply by B's molar mass to get the mass of B. Skipping the moles conversion at either end and working directly with masses or coefficients alone will always produce a wrong answer, except in the rare coincidental case where two substances share the same molar mass."

**Explanation B — Limiting reagent via ratio comparison, not raw quantity (procedural):**
"Convert every reactant's given mass to moles first. Then compare the ACTUAL ratio of moles present to the REQUIRED ratio stated by the balanced equation's coefficients. Whichever reactant would run out first — falls short of what the required ratio demands — is the limiting reagent, and only ITS mole count should be carried forward into the rest of the calculation (theoretical yield, product mass, etc.)."

---

## 6. Analogy Library

**Primary analogy — A sandwich recipe with a fixed ratio:**
If a sandwich recipe requires exactly 2 bread slices for every 1 cheese slice, having 10 bread slices and only 3 cheese slices means cheese runs out first (limiting), leaving 4 bread slices unused — you cannot simply compare "10 vs. 3" and conclude cheese is limiting just because 3 is the smaller raw number; you must compare the ACTUAL 10:3 ratio against the REQUIRED 2:1 ratio to see that cheese falls proportionally short.

**Breaking point:** Sandwich ingredients are typically already counted in discrete, directly-usable units (slices); real chemical reactants are given in MASS, requiring the extra molar-mass conversion step to reach a comparable mole count — the sandwich analogy illustrates the ratio-comparison logic perfectly but skips the mass-to-moles conversion that real stoichiometry problems require.

**Anti-analogy:** Do NOT describe a balanced equation's coefficients as "just like a recipe's ingredient amounts in grams" — this directly reinforces MC-1's mass-ratio misreading; coefficients are mole counts, and a recipe analogy should specify "servings" or "moles," never grams, to avoid this confusion.

---

## 7. Demonstration Library

**Demo 1 — Full four-step mass-to-mass conversion walkthrough:**
Work through the 4 g H₂ → grams O₂ calculation explicitly, labeling each of the four steps, directly targeting MC-1.

**Demo 2 — Limiting reagent bar-chart comparison:**
Present available moles of two reactants as bars, with the required stoichiometric ratio overlaid, visually revealing which reactant runs out first, directly targeting MC-2.

**Demo 3 — Percent yield sanity-check drill:**
Present several percent-yield results (72%, 95%, 108%) and have students classify each as plausible or requiring investigation, directly targeting MC-3.

---

## 8. Discovery Lesson

**Opening (5 min):** "The equation 2H₂ + O₂ → 2H₂O has a '2' in front of H₂ and no visible number in front of O₂. Does that mean you need twice as much MASS of hydrogen as oxygen?"

**Exploration (15 min):**
- Run Demo 1 (four-step conversion walkthrough), directly targeting MC-1.
- Build Explanation A (the four-step bridge) step by step.

**Synthesis (10 min):**
- Run Demo 2 (limiting reagent bar chart), directly targeting MC-2, then build Explanation B.
- Run Demo 3 (percent yield sanity-check), directly targeting MC-3.

**Closure:** "Every stoichiometry problem you'll ever solve runs through the same four-step bridge: mass to moles, mole ratio, moles to mass. Memorize that one path, and every 'how much product' or 'which reactant runs out first' question becomes the same mechanical procedure."

---

## 9. Teaching Actions

*(session_cap = 4 actions)*

**TA-1 [DEMONSTRATE + EXPLAIN]:** Demo 1 (four-step conversion) alongside Explanation A, directly probing MC-1.

**TA-2 [DEMONSTRATE + EXPLAIN]:** Demo 2 (limiting reagent bar chart) alongside Explanation B, directly probing MC-2.

**TA-3 [DEMONSTRATE]:** Demo 3 (percent yield sanity-check drill), directly probing MC-3.

**TA-4 [PRACTICE]:** Full multi-step practice problems combining limiting reagent identification, theoretical yield, and percent yield calculation.

---

## 10. Voice Teaching

**Opening:**
"Two H-two plus O-two makes two H-two-O. There's a '2' in front of hydrogen and no visible number in front of oxygen. Does that mean you need twice as much MASS of hydrogen as oxygen?"

**At the mole-ratio clarification:**
"That '2' means two MOLES, never two grams. Moles is the only bridge that connects the equation to any real mass calculation. Convert your given mass to moles first, apply the ratio from the coefficients, then convert back to mass at the end. Skip that bridge, and you'll get an answer that's wrong by a huge factor."

**At the limiting-reagent clarification:**
"Don't just compare which number is smaller. Compare the ratio you actually HAVE to the ratio the equation REQUIRES. Ten bread slices and three cheese slices, needing two bread per one cheese — you'd think you have plenty of bread, and you do, but cheese still runs out first, because three cheese slices only support six bread slices' worth of sandwiches, leaving four bread slices sitting unused."

---

## 11. Assessment

**Mastery gate:** Student correctly converts mass through the four-step stoichiometry bridge, correctly identifies the limiting reagent via ratio comparison, and correctly evaluates a percent yield result for physical plausibility. Score ≥ 75%.

**FA-1 — Mass-to-mass conversion:**
*Q: For N₂ + 3H₂ → 2NH₃, how many grams of NH₃ form from 10.0 g of N₂ (assuming excess H₂)?*
Expected: 10.0 g ÷ 28.02 g/mol ≈ 0.357 mol N₂ × (2 mol NH₃/1 mol N₂) = 0.714 mol NH₃ × 17.03 g/mol ≈ 12.2 g NH₃.
Threshold: Must show all four steps explicitly, not just state a final number.

**FA-2 — Limiting reagent:**
*Q: For N₂ + 3H₂ → 2NH₃, you have 2.0 mol N₂ and 3.0 mol H₂. Which is limiting? Justify using the required ratio.*
Expected: Required ratio is 1 N₂ : 3 H₂. Available ratio is 2.0:3.0, which needs 6.0 mol H₂ to fully react with 2.0 mol N₂ but only 3.0 mol H₂ is available — H₂ is limiting.
Threshold: Must explicitly compare available to required ratio, not just state an answer.

**FA-3 — Percent yield evaluation:**
*Q: A student calculates 95% yield in one experiment and 118% yield in another. Which result is plausible, and what should the student do about the other?*
Expected: 95% is plausible (typical real-reaction loss); 118% is physically impossible and indicates a measurement/calculation error or contamination requiring investigation, not acceptance.
Threshold: Must correctly flag the >100% result as requiring investigation, not simply report both as valid data.

**Confidence calibration:** After FA-1, students rate confidence before revealing the answer; students confident but wrong are walked through Demo 1's four-step conversion again before re-attempting a parallel item.

**Delayed retrieval (session + 3):** "Explain why a balanced equation's coefficients cannot be read directly as a mass ratio." Expected: coefficients state mole ratios; different substances have different molar masses, so the actual mass ratio required depends on both the mole ratio AND each substance's molar mass.

---

## 12. Recovery Notes

**S3:** Student can state "convert to moles first" but skips the step under time pressure. Re-run Demo 1's four-step walkthrough with explicit step labeling before returning to the probe.

**S4:** Student compares raw mass or raw mole count for limiting reagent instead of ratio (MC-2). Re-run Demo 2's bar-chart comparison with a new example where the "smaller raw number" reactant is NOT actually limiting, to break the false heuristic directly.

**S6:** Student is anxious about "too many steps to remember." Anchor entirely in the single four-step bridge diagram (Explanation A) as one repeatable procedure, rather than memorizing separate procedures for different problem types.

**S9:** Extend into sequential/multi-reaction stoichiometry (product of one reaction as reactant in the next) as enrichment, previewing more advanced synthesis-pathway problems.

---

## 13. Memory & Review

**Memory type:** Procedural (four-step conversion bridge, ratio-comparison limiting-reagent method) — retrieval practice should emphasize applying the full procedure to novel equations, not just reciting the steps abstractly.

**Spaced retrieval schedule:**
- Session + 1: "Perform a full mass-to-mass stoichiometric conversion for a given balanced equation."
- Session + 3: "Identify the limiting reagent for given reactant amounts using ratio comparison."
- Session + 7: "Evaluate a given percent yield result for physical plausibility."

**Interleaving partners:** chem.found.mole-concept (prerequisite — the moles bridge reused directly), chem.anal.gravimetric (successor — applies stoichiometric mass relationships to unknown-sample analysis).

---

## 14. Transfer Map

**Near transfer:** Gravimetric analysis (the immediate successor) uses the identical mole-ratio bridge to determine an unknown sample's composition from a precipitate's measured mass.

**Far transfer:** Industrial process design (predicting reactant requirements and costs at production scale), pharmaceutical synthesis yield optimization, and environmental remediation calculations (reagent dosing for treatment reactions) all depend directly on this concept's mole-ratio and limiting-reagent framework.

**Structural abstraction:** "A ratio stated in one unit system (moles, here) cannot be directly applied to quantities given in a different unit system (mass) without an explicit conversion bridge — and comparing two quantities for a 'which is bigger/limiting' judgment requires comparing them in the SAME unit system as the ratio being tested against, not their originally-given units." This unit-bridging-before-comparison principle recurs throughout quantitative chemistry and engineering.

---

## 15. Curriculum Feedback

- **Prerequisite adequacy:** chem.found.mole-concept is necessary and sufficient — this concept directly extends the mass-mole-particle bridge into multi-substance reaction contexts.
- **Unlock readiness:** chem.anal.gravimetric depends directly on the stoichiometric mass-relationship framework established here; sequencing is well-motivated.
- **Difficulty calibration:** Developing/Apply at 0.75 mastery threshold is appropriate — the four-step bridge and ratio-comparison limiting-reagent method require genuine multi-step procedural application, matching the Apply Bloom level.
- **No open issues:** description, prerequisites, and unlocks are internally consistent with the Chemistry KG's Foundations domain.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
