# Teaching Blueprint: Gas Laws

## 0. Concept Metadata
| Field | Value |
|---|---|
| **Concept ID** | chem.state.gas-laws |
| **Name** | Gas Laws |
| **Domain** | States of Matter |
| **Difficulty** | Developing |
| **Bloom Level** | Apply |
| **Estimated Hours** | 3 |
| **Mastery Threshold** | 0.75 |
| **Prerequisites** | chem.state.kinetic-theory, chem.found.measurement |
| **Unlocks** | chem.sol.solubility, chem.state.molar-mass-gas, chem.state.real-gases |

---

## 1. Concept Spine

**One-sentence definition:** The individual gas laws (Boyle's, Charles's, Gay-Lussac's, Avogadro's) each isolate ONE pair of variables while holding the others constant, unify into the single ideal gas law PV=nRT, and every calculation requires temperature strictly in Kelvin (never Celsius) and a value of R matched to the pressure/volume units actually being used.

**The core insight:** PV=nRT is not a formula to memorize in isolation — it is the unification of four separate empirical observations (Boyle's inverse P-V relationship, Charles's direct V-T relationship, Gay-Lussac's direct P-T relationship, Avogadro's direct V-n relationship), each discovered by holding the OTHER variables fixed. Getting gas-law calculations right requires three specific disciplines: correctly identifying whether a relationship is direct or inverse proportionality, converting temperature to Kelvin without exception, and matching R's numerical value to whatever pressure/volume units the problem actually uses.

**Conceptual chain:**
1. Boyle's law (constant T, n): P and V are INVERSELY proportional — P₁V₁ = P₂V₂. Compressing a gas (smaller V) increases collision frequency with container walls, increasing P.
2. Charles's law (constant P, n): V and T are DIRECTLY proportional (T in Kelvin) — V₁/T₁ = V₂/T₂. Heating increases average particle speed and thus the volume needed to maintain constant pressure.
3. Gay-Lussac's law (constant V, n): P and T are DIRECTLY proportional (T in Kelvin) — P₁/T₁ = P₂/T₂. Heating at fixed volume increases collision force/frequency, raising pressure.
4. Avogadro's law (constant P, T): V and n (moles) are DIRECTLY proportional — equal volumes of different gases at the same temperature and pressure contain equal numbers of moles.
5. Combining all four relationships into one equation gives the ideal gas law: PV = nRT, with R the gas constant, whose NUMERICAL VALUE depends entirely on which units P and V are expressed in (0.0821 L·atm/(mol·K) for atm/L; 8.314 J/(mol·K) for Pa/m³).
6. Every gas-law calculation requires temperature in ABSOLUTE Kelvin — using Celsius directly produces answers that can be wrong by enormous factors, since gas-law proportionality is to absolute temperature, not to the arbitrary Celsius scale.

**Central relations:**
- Boyle's: P₁V₁ = P₂V₂ (inverse, constant T,n).
- Charles's: V₁/T₁ = V₂/T₂ (direct, constant P,n, T in Kelvin).
- Gay-Lussac's: P₁/T₁ = P₂/T₂ (direct, constant V,n, T in Kelvin).
- Avogadro's: V₁/n₁ = V₂/n₂ (direct, constant P,T).
- PV = nRT, with R's numerical value matched to the units of P and V being used.

---

## 2. Four-Stage CPA+ Mental Model

### Concrete (Enactive)
- A physical (or described) syringe demonstration: pushing the plunger in (decreasing V) makes the gas noticeably harder to push further (increasing P), directly demonstrating Boyle's inverse relationship.
- A balloon in a warm versus cold environment: visibly larger in warm air (Charles's law, direct V-T relationship at constant atmospheric pressure).

### Representational (Iconic)
- A four-law summary table: law name, held-constant variable, relationship type (direct/inverse), and the specific equation for each.
- A Celsius-vs-Kelvin gas-law error comparison graph, showing the dramatically different (correct vs. wildly wrong) volume-ratio results from the same 25°C-to-50°C heating scenario.

### Abstract (Symbolic)
- PV = nRT as the unifying equation, with each individual law derivable by holding the appropriate variables constant.
- R's two common numerical values (0.0821 L·atm/(mol·K) vs. 8.314 J/(mol·K)) explicitly tied to their required unit systems.

### Transfer (+)
- Molar mass determination from gas density (the immediate successor concept) directly applies PV=nRT to identify unknown gases.
- Real gas behavior (a direct successor) explores where and why the ideal gas law's assumptions break down at high pressure or low temperature.
- Industrial and engineering applications (compressed gas cylinder safety, scuba diving decompression calculations, weather balloon design) all depend on correct gas-law application.

---

## 3. Why Beginners Fail

**Mode 1 — Using Celsius temperature directly in any gas-law calculation:** Correct: every gas law's proportionality to temperature requires absolute (Kelvin) temperature — Celsius conversion is not optional, and skipping it can produce errors of a large multiplicative factor, not just a small rounding difference.

**Mode 2 — Confusing which gas-law relationships are direct versus inverse:** Correct: Boyle's law (P-V) is inverse; Charles's, Gay-Lussac's, and Avogadro's laws are all direct — mixing up direct and inverse for any of these produces a qualitatively backwards prediction (volume increasing when it should decrease, or vice versa).

**Mode 3 — Using R's numerical value without checking it matches the problem's units:** Correct: R has different numerical values depending on which units P and V are expressed in, and using the wrong R value with a given unit system produces an answer wrong by whatever conversion factor separates the two unit systems.

---

## 4. Misconception Library

### MC-1: "Temperature in Celsius gives correct results"
- **Probe:** "A gas at 25°C is heated to 50°C at constant pressure. By what factor does its volume increase? (Show with both Celsius and Kelvin and compare.)"
- **Characteristic phrase:** "The volume doubles because the temperature doubled from 25 to 50."
- **Trigger:** Instruction-induced — the "temperature doubled" framing feels intuitively correct using the given Celsius numbers, without recognizing the proportionality specifically requires absolute temperature.
- **Conflict evidence [P28]:** Using Celsius directly: 50/25 = 2, suggesting volume doubles. Using the CORRECT Kelvin conversion: T₁ = 298 K, T₂ = 323 K, giving V₂/V₁ = 323/298 ≈ 1.084 — only an 8.4% increase, not a 100% increase. The Celsius-based answer is wrong by roughly a factor of 20 in this specific example — a large, consequential error, not a minor rounding difference.
- **Bridge [P30]:** "Gas law proportionality to temperature specifically requires ABSOLUTE (Kelvin) temperature — Celsius's zero point is arbitrary and breaks the proportionality entirely. Always convert to Kelvin FIRST, before touching any gas-law equation. In this example, the Celsius-based answer is wrong by a factor of roughly 20 — this is not a small error to shrug off."
- **Replacement [P31]:** Gas-law temperature proportionality requires absolute Kelvin temperature; Celsius conversion is mandatory, not optional, and skipping it can produce errors of a large multiplicative factor.
- **Discrimination pairs [P33]:** V₂/V₁ = 323/298 ≈ 1.084 (correct, using Kelvin) vs. V₂/V₁ = 50/25 = 2 (wrong, using Celsius directly).
- **S6 repair path:** Compute both the Celsius-based and Kelvin-based answers explicitly side by side, quantifying the error magnitude, before returning to the probe.

### MC-2: "Boyle's law: pressure and volume are directly proportional"
- **Probe:** "If you double the pressure on a gas at constant temperature, what happens to its volume? By what factor?"
- **Characteristic phrase:** "Volume doubles when pressure doubles."
- **Trigger:** Instruction-induced — students confuse "directly proportional" and "inversely proportional" as general terms, without connecting the specific physical mechanism (compression increases collision frequency, raising pressure) to the correct inverse relationship.
- **Conflict evidence [P28]:** P₁V₁ = P₂V₂ (Boyle's law) directly implies that if P doubles, V must HALVE to keep the product constant — the OPPOSITE of "volume doubles." The molecular mechanism confirms this: compressing a gas into a smaller volume squeezes particles closer together, increasing how often they collide with the container walls, which is exactly what raises pressure — smaller volume causes higher pressure, not the same-direction change a "directly proportional" reading would suggest.
- **Bridge [P30]:** "P₁V₁ = P₂V₂ means the PRODUCT stays constant — if one factor doubles, the other must halve to keep the product the same. Picture the mechanism directly: squeezing a gas into a smaller volume packs particles closer together, so they hit the container walls more often, raising pressure. Smaller volume causes higher pressure — an inverse relationship, never a direct one."
- **Replacement [P31]:** Boyle's law is an inverse relationship — doubling pressure halves volume (at constant T, n), confirmed by the collision-frequency mechanism.
- **Discrimination pairs [P33]:** Doubling P halves V (correct, inverse relationship) vs. doubling P doubles V (wrong, would be a direct-relationship error).
- **S6 repair path:** Re-derive the answer from P₁V₁=P₂V₂ explicitly, then connect it to the collision-frequency mechanism, before returning to the probe.

### MC-3: "R has one set of units"
- **Probe:** "PV = nRT. P = 2.0 atm, V = 5.0 L, n = 0.50 mol, T = 300 K. Calculate R from this data. What units does it have?"
- **Trigger:** Notation-induced — students memorize R = 8.314 J/(mol·K) as THE value of R, without recognizing this specific number requires SI units (Pa, m³) and using it with atm/L data produces a unit mismatch.
- **Conflict evidence [P28]:** Solving R = PV/(nT) from the given atm/L data: R = (2.0 atm)(5.0 L)/(0.50 mol × 300 K) ≈ 0.0667 L·atm/(mol·K), close to the standard 0.0821 L·atm/(mol·K) value used specifically for atm/L problems — a COMPLETELY different number from 8.314 J/(mol·K), because the units of P and V here (atm, L) don't match the SI units (Pa, m³) that 8.314 is defined for.
- **Bridge [P30]:** "R's numerical value isn't fixed — it changes depending on what units you're using for P and V. If your problem gives pressure in atm and volume in L, use R = 0.0821 L·atm/(mol·K). If everything is in SI units (Pa, m³), use R = 8.314 J/(mol·K). Always check your problem's units FIRST, then choose the matching R value — never default to 8.314 without checking."
- **Replacement [P31]:** R's numerical value must be chosen to match the specific units of P and V used in a given problem — there is no single universal number to apply blindly.
- **Discrimination pairs [P33]:** R = 0.0821 L·atm/(mol·K) (for atm/L problems) vs. R = 8.314 J/(mol·K) (for Pa/m³ problems) — genuinely different numbers, chosen based on the problem's given units.
- **S6 repair path:** Explicitly identify the units of P and V given in the problem before selecting R's value.

---

## 5. Explanation Library

**Explanation A — Four laws, one unifying equation (conceptual):**
"Each individual gas law isolates one specific pair of variables by holding everything else constant: Boyle's law holds T and n fixed to isolate the P-V relationship (inverse); Charles's law holds P and n fixed to isolate V-T (direct); Gay-Lussac's law holds V and n fixed to isolate P-T (direct); Avogadro's law holds P and T fixed to isolate V-n (direct). Combining all four relationships into a single equation gives PV = nRT, the ideal gas law — not a separate fifth law, but the unification of the other four."

**Explanation B — Choosing R correctly (procedural):**
"Before using PV = nRT, identify the units your problem gives for pressure and volume. If they're atm and L, use R = 0.0821 L·atm/(mol·K). If they're Pa and m³ (standard SI), use R = 8.314 J/(mol·K). Using the wrong R value with mismatched units produces an answer off by a large, specific conversion factor — always check units before selecting R, every single time."

---

## 6. Analogy Library

**Primary analogy — A seesaw for Boyle's law, a straight ramp for the others:**
Boyle's law (P and V) behaves like a seesaw — push one side down (decrease V), the other side rises (P increases), always moving in OPPOSITE directions to keep balance. Charles's, Gay-Lussac's, and Avogadro's laws behave like a straight ramp — both quantities rise or fall together, in the SAME direction.

**Breaking point:** A seesaw's two sides are related by a simple linear balance; Boyle's law's P-V relationship is a genuine INVERSE proportion (P×V = constant), a multiplicative rather than additive relationship — the seesaw analogy illustrates "opposite direction" well but shouldn't be pushed toward implying a simple linear balance.

**Anti-analogy:** Do NOT describe "temperature doubling" in Celsius as causing a proportional gas-law effect — this directly reinforces MC-1's core error; always specify Kelvin explicitly whenever discussing temperature ratios in a gas-law context.

---

## 7. Demonstration Library

**Demo 1 — Celsius vs. Kelvin gas-law error comparison:**
Compute the 25°C-to-50°C volume-ratio problem explicitly using both Celsius (wrong) and Kelvin (correct) temperatures, quantifying the ~20x error magnitude, directly targeting MC-1.

**Demo 2 — Syringe compression demonstration:**
Physically demonstrate (or describe) compressing a syringe's plunger, connecting increased resistance (pressure) to decreased volume, directly targeting MC-2.

**Demo 3 — R-value unit-matching drill:**
Present 3-4 problems with different unit combinations (atm/L, Pa/m³) and have students select the matching R value for each, directly targeting MC-3.

---

## 8. Discovery Lesson

**Opening (5 min):** "A gas at 25°C is heated to 50°C at constant pressure. Did its volume double, since the temperature doubled?"

**Exploration (15 min):**
- Run Demo 1 (Celsius vs. Kelvin comparison), directly targeting MC-1.
- Build Explanation A (four laws, one equation) step by step, covering all four individual laws.

**Synthesis (10 min):**
- Run Demo 2 (syringe compression), directly targeting MC-2.
- Run Demo 3 (R-value unit-matching drill), directly targeting MC-3, then build Explanation B.

**Closure:** "Four separate observations, one unifying equation: PV=nRT. Get temperature in Kelvin, get the direction of each relationship right, and match R to your units — every gas-law problem you'll ever face reduces to careful bookkeeping of these three things."

---

## 9. Teaching Actions

*(session_cap = 4 actions)*

**TA-1 [DEMONSTRATE + EXPLAIN]:** Demo 1 (Celsius vs. Kelvin comparison) alongside Explanation A, directly probing MC-1.

**TA-2 [DEMONSTRATE]:** Demo 2 (syringe compression), directly probing MC-2.

**TA-3 [DEMONSTRATE + EXPLAIN]:** Demo 3 (R-value unit-matching drill) alongside Explanation B, directly probing MC-3.

**TA-4 [PRACTICE]:** Mixed multi-law practice problems requiring correct law selection, Kelvin conversion, and R-value matching together.

---

## 10. Voice Teaching

**Opening:**
"A gas at 25 degrees Celsius gets heated to 50 degrees Celsius, same pressure the whole time. Did its volume just double, since the temperature doubled?"

**At the Kelvin clarification:**
"Using Celsius directly gives you double — completely wrong. Convert to Kelvin first: 298 and 323. The real increase is only about 8 percent, not 100 percent. That's not a small rounding error, that's being wrong by a factor of twenty. Kelvin, every single time, no exceptions."

**At the Boyle's law clarification:**
"P-one-V-one equals P-two-V-two means the PRODUCT stays fixed. Double one side, the other side has to halve to keep that product the same. Squeeze a gas into half its volume, and its particles are hitting the container walls twice as often — that's exactly why pressure goes up when volume goes down, never the other way around."

---

## 11. Assessment

**Mastery gate:** Student correctly converts to Kelvin before any gas-law calculation, correctly identifies direct vs. inverse relationships for each law, and correctly matches R's value to the given units. Score ≥ 75%.

**FA-1 — Kelvin requirement:**
*Q: A gas at 100 kPa and 20°C is heated at constant volume until pressure reaches 150 kPa. Find the final temperature in Kelvin and Celsius.*
Expected: Using Gay-Lussac's (T in Kelvin): T₁=293 K, P₁/T₁=P₂/T₂ gives T₂ = 293×(150/100) = 439.5 K = 166.5°C.
Threshold: Must perform the calculation entirely in Kelvin before converting the final answer back to Celsius.

**FA-2 — Direct vs. inverse identification:**
*Q: For each of Boyle's, Charles's, and Gay-Lussac's laws, state whether the relationship is direct or inverse.*
Expected: Boyle's (P-V) — inverse; Charles's (V-T) — direct; Gay-Lussac's (P-T) — direct.
Threshold: Must correctly classify all three without confusion.

**FA-3 — R-value selection:**
*Q: A problem gives P in atm and V in L. Which value of R should be used, and why not the other common value?*
Expected: R = 0.0821 L·atm/(mol·K), matching the given units; 8.314 J/(mol·K) requires SI units (Pa, m³) instead.
Threshold: Must correctly justify the choice by unit-matching, not just state the number.

**Confidence calibration:** After FA-1, students rate confidence before revealing the answer; students confident but wrong are walked through Demo 1's Celsius-vs-Kelvin comparison again before re-attempting a parallel item.

**Delayed retrieval (session + 3):** "Explain why using Celsius temperature directly in a gas-law calculation can produce an answer wrong by a large factor, using a specific numerical example." Expected: gas-law proportionality requires absolute temperature; Celsius's arbitrary zero point breaks the proportionality, producing large errors especially when the temperature values are far from absolute zero in relative terms.

---

## 12. Recovery Notes

**S3:** Student can state all four laws but cannot identify which applies to a given scenario. Re-run Explanation A's held-constant-variable framework explicitly against the specific scenario.

**S4:** Student confuses direct and inverse for Boyle's law specifically (MC-2). Re-run Demo 2's syringe demonstration and the collision-frequency mechanism explicitly.

**S6:** Student is anxious about "which R value do I even use." Anchor entirely in the unit-checking-first procedure (Demo 3) as a single repeatable check, not a memorization burden.

**S9:** Extend into combined gas law (P₁V₁/T₁ = P₂V₂/T₂, all three variables changing at once) as enrichment, previewing more complex multi-variable problems.

---

## 13. Memory & Review

**Memory type:** Procedural/conceptual (Kelvin conversion discipline, direct/inverse relationship identification, R-value matching) — retrieval practice should emphasize applying the correct law and unit discipline to novel scenarios, not just reciting the four laws.

**Spaced retrieval schedule:**
- Session + 1: "Solve a gas-law problem requiring Kelvin conversion."
- Session + 3: "Classify each of the four gas laws as direct or inverse."
- Session + 7: "Select the correct R value for a problem with given units."

**Interleaving partners:** chem.state.kinetic-theory (prerequisite — the Kelvin-temperature discipline directly reused), chem.found.measurement (prerequisite — unit-factor conversion method), chem.state.molar-mass-gas (successor — direct PV=nRT application).

---

## 14. Transfer Map

**Near transfer:** Molar mass determination from gas density (the immediate successor) directly applies PV=nRT to identify an unknown gas from its measured mass, volume, pressure, and temperature.

**Far transfer:** Scuba diving decompression calculations, weather balloon design, and compressed gas cylinder safety engineering all depend directly on correct gas-law application, including the Kelvin-conversion and unit-matching disciplines established here.

**Structural abstraction:** "A complex multi-variable relationship can be understood by systematically isolating pairs of variables (holding others constant) before unifying into one general equation — and correctly applying that general equation requires disciplined attention to which specific units and scales the equation's constants were defined for." This isolate-then-unify pattern, and the units-discipline principle, recur throughout physical chemistry and engineering.

---

## 15. Curriculum Feedback

- **Prerequisite adequacy:** chem.state.kinetic-theory (Kelvin-temperature discipline) and chem.found.measurement (unit-factor conversion) are both necessary and jointly sufficient.
- **Unlock readiness:** All three direct unlocks (solubility, molar mass of gases, real gases) depend directly on PV=nRT fluency established here; sequencing is well-motivated.
- **Difficulty calibration:** Developing/Apply at 0.75 mastery threshold is appropriate — correctly selecting the right law, converting units, and matching R requires genuine multi-step procedural application.
- **No open issues:** description, prerequisites, and unlocks are internally consistent with the Chemistry KG's States of Matter domain.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
