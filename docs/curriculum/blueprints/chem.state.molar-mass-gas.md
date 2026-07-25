# chem.state.molar-mass-gas — Molar Mass from Gas Data

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.state.molar-mass-gas` |
| Domain | States of Matter |
| Requires | `chem.state.gas-laws`, `chem.found.mole-concept` |
| Unlocks | (none) |
| Difficulty | developing |
| Bloom Level | apply |
| Mastery Threshold | 0.75 |
| Estimated Hours | 2 |

## 1. Concept Spine

The formula M=dRT/P requires density d in g/L (matching R's units, L·atm/mol·K), never g/mL — using g/mL directly without conversion produces an absurdly large molar mass (a factor-of-1000 error) that should be immediately recognizable as physically impossible; effusion rate depends on average molecular SPEED, not momentum or mass alone — at the same temperature, all gases share the same average kinetic energy (½mv²), so a heavier gas must move SLOWER (not faster) to have equal KE, making the LIGHTER gas effuse faster (Graham's law, r∝1/√M); and when computing molecular formula from empirical formula mass (EFM) and experimentally measured molar mass, the ratio n=M/EFM should be ROUNDED to the nearest whole number (never rejected as "wrong data" for not being an exact integer), since experimental molar mass measurements inherently carry uncertainty.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Computing M=dRT/P explicitly with a density value first left in g/mL (producing an obviously wrong M≈28,000 g/mol) then correctly converted to g/L (M≈28 g/mol, matching N₂), making the unit-conversion checkpoint concrete.

**Representational**: A side-by-side kinetic-energy diagram for H₂ and O₂ at the same temperature, showing equal KE but showing the O₂ molecule's velocity arrow visibly shorter (slower) than H₂'s, despite O₂'s larger mass.

**Abstract**: The general principle that unit consistency must be verified before applying any gas-law-derived formula, with implausible results serving as a diagnostic flag; the general kinetic-molecular-theory principle that equal temperature implies equal average KE, not equal speed; the general expectation that experimental n=M/EFM ratios round to integers within measurement uncertainty, rather than needing to be exact.

**Transfer**: Given unfamiliar gas density/molar-mass data, correctly applying unit-consistent formulas (catching absurd results as unit errors), correctly ranking effusion rates from molar mass via Graham's law, and correctly rounding an experimental n ratio to determine molecular formula.

## 3. Why Beginners Fail

Students plug a given gas density directly into M=dRT/P without checking whether the units match what the formula (and R's units) require, missing that density expressed in g/mL is 1000× larger than the required g/L, producing a molar mass answer that is absurdly, obviously too large — a red flag that should trigger a units check but often goes unnoticed; students carry over an everyday intuition that heavier objects, having "more momentum," should move through a small hole faster, missing that effusion rate depends specifically on molecular SPEED, and that at a shared temperature all gases have equal average kinetic energy, meaning the HEAVIER gas must actually move SLOWER — the LIGHTER gas therefore effuses faster; and students expect the ratio of experimentally-measured molar mass to empirical formula mass (n=M/EFM) to come out to an exact whole number, and when it doesn't (e.g., 2.93 instead of 3), they conclude the data must be flawed, missing that experimental molar-mass measurements always carry some uncertainty, and the correct procedure is to round n to the nearest whole integer rather than reject the result.

## 4. Misconception Library

### MC-1: Density in g/mL can be used directly in M = dRT/P
- **Probe**: "A gas has density 1.25 g/mL at STP. What is its molar mass? (Careful — check your units.)"
- **Characteristic phrase**: "I used density = 1.25 and got M = 28 — oh wait, that's nitrogen, the density is in mL not L."
- **Trigger (Type 4, notation-induced)**: The formula M=dRT/P doesn't visually flag which density units are required, and students substitute whatever numerical value is given without verifying unit consistency with R.
- **Conflict evidence [P28]**: 1.25g/mL=1250g/L. M=1250×22.4=28,000g/mol. Obviously impossible for a real gas — the unit error produces an absurd result that the student must be trained to recognise as a check. Correct density in g/L at STP: N₂≈1.25g/L (not g/mL).
- **Bridge [P30]**: The formula M=dRT/P is only dimensionally correct when every quantity is expressed in units consistent with the gas constant R (typically L·atm/mol·K) — density specifically must be in g/L, and substituting a g/mL value without converting introduces a 1000-fold error that manifests as an obviously implausible molar mass, which should itself serve as a built-in sanity check.
- **Replacement [P31]**: Always verify that density is expressed in g/L (matching R's units) before substituting into M=dRT/P — treat an implausibly large resulting molar mass as a signal to check units, never as evidence of an unusual gas.
- **Discrimination pairs [P33]**: Density correctly converted to g/L (M≈28g/mol, matches N₂, plausible) vs. density left in g/mL (M≈28,000g/mol, implausible, unit error).
- **S6 repair path**: Walk through the explicit g/mL-to-g/L conversion step, then recompute M, contrasting the plausible vs. implausible results.

### MC-2: Heavier gas effuses faster because it has more momentum
- **Probe**: "H₂ (M = 2) and O₂ (M = 32) are in separate containers each with a tiny hole. Which gas effuses faster? By what factor?"
- **Characteristic phrase**: "O₂ is heavier so it hits the hole harder and escapes faster."
- **Trigger (Type 2, perceptual intuition)**: Everyday intuition — heavier things push harder, have more momentum, which students associate with "escaping faster."
- **Conflict evidence [P28]**: Effusion rate depends on average molecular SPEED, not momentum. At the same T, all gases have the same average kinetic energy (KE=½mv²). For O₂, m is 16× larger so v must be 4× smaller (√16=4). H₂ molecules are faster and hit the hole more frequently → H₂ effuses 4× faster. r(H₂)/r(O₂)=√(32/2)=√16=4.
- **Bridge [P30]**: Effusion rate is governed by how frequently molecules encounter and pass through the small hole, which depends on molecular SPEED (how fast a molecule travels, hence how often it reaches the hole) — not on momentum or mass alone; since kinetic energy (not speed) is what's held constant across gases at a given temperature, and KE depends on BOTH mass and the square of speed, a larger mass must be compensated by a correspondingly SMALLER speed to keep KE equal, making heavier gas molecules genuinely slower, not faster.
- **Replacement [P31]**: Effusion rate is inversely proportional to the square root of molar mass (Graham's law, r∝1/√M) — lighter gases effuse faster because they move faster at a given temperature, never assume heavier means faster from a momentum intuition.
- **Discrimination pairs [P33]**: H₂ (M=2, faster, effuses 4× faster than O₂) vs. O₂ (M=32, slower despite greater mass) — same temperature, same average KE, opposite speed/effusion-rate ranking from mass.
- **S6 repair path**: Present the explicit KE=½mv² derivation, showing how equal KE at equal T forces the heavier gas to have the smaller velocity.

### MC-3: M from empirical formula and from gas data should match exactly
- **Probe**: "Empirical formula CH₂O, EFM = 30 g/mol. Measured M = 88 g/mol. How many significant figures should n have? What is the molecular formula?"
- **Characteristic phrase**: "88/30 = 2.93, which isn't a whole number, so the data is wrong."
- **Trigger (Type 5, instruction-induced)**: Students expect experimental molar mass to give an exact integer multiple of the empirical formula mass, not accounting for measurement uncertainty.
- **Conflict evidence [P28]**: n=88/30=2.93≈3 (rounding to the nearest whole number, within experimental uncertainty). Molecular formula=3×CH₂O=C₃H₆O₃ (e.g., glyceraldehyde or lactic acid). The student must round to the nearest whole integer and recognise that experimental molar masses carry uncertainty.
- **Bridge [P30]**: Any experimentally measured quantity (including molar mass determined from gas density data) inherently carries some measurement uncertainty — expecting a perfectly exact integer ratio from real experimental data sets an unrealistic standard; the correct procedure treats a value close to a whole number (like 2.93, close to 3) as consistent with that whole number within reasonable experimental error, not as evidence of a flawed measurement.
- **Replacement [P31]**: Always round the experimental n=M/EFM ratio to the nearest whole integer before determining molecular formula — never reject data simply because the raw ratio isn't a perfect integer.
- **Discrimination pairs [P33]**: n=2.93 correctly rounded to 3 (→C₃H₆O₃, a valid molecular formula) vs. n=2.93 rejected as "wrong data" (incorrectly discards valid, usably-close experimental data).
- **S6 repair path**: Present the explicit rounding step and resulting molecular formula, reinforcing that experimental uncertainty is expected and normal.

## 5. Explanation Library

**Primary explanation**: Molar mass calculated from gas density (M=dRT/P) requires strict unit consistency — density must be expressed in g/L to match the gas constant R's units, and a resulting molar mass that seems implausibly large should be treated as a signal to re-check units, not as an unusual finding. Effusion rate depends on molecular speed, which — since kinetic energy is held constant across gases at a shared temperature — is inversely related to the square root of molar mass (Graham's law): lighter gases move faster and effuse faster, despite carrying less momentum per molecule.

**Secondary explanation (experimental uncertainty in molecular formula determination)**: When determining molecular formula from an empirical formula mass and an experimentally measured molar mass, the resulting ratio n=M/EFM should be rounded to the nearest whole integer, since real experimental measurements carry inherent uncertainty and rarely produce a perfectly exact ratio.

## 6. Analogy Library

- **Primary analogy**: A shared energy budget split between two runners of different weight (kinetic energy fixed by temperature) — the lighter runner must move faster to spend the same energy budget as the heavier runner moving slower, exactly as lighter gas molecules move faster than heavier ones at the same temperature.
- **Breaking point**: The shared-energy-budget analogy conveys the KE-and-speed relationship well but doesn't naturally capture the unit-consistency checkpoint (MC-1) or the experimental-rounding expectation (MC-3) — those need the explicit unit-conversion walkthrough and the rounding-with-uncertainty argument.
- **Anti-analogy**: Do NOT say "heavier molecules hit harder, so they escape faster" — this directly reinforces MC-2 by conflating momentum with effusion rate.

## 7. Demonstration Library

- **Demonstration 1 (unit-conversion checkpoint for M=dRT/P)**: Compute M with density left in g/mL (implausible result) and then correctly converted to g/L (plausible result), contrasting the two explicitly.
- **Demonstration 2 (KE-equality-derives-speed-difference for Graham's law)**: Derive the H₂/O₂ effusion-rate ratio explicitly from KE=½mv² equality at a shared temperature.
- **Demonstration 3 (rounding-with-uncertainty molecular-formula determination)**: Walk through the CH₂O/88g/mol example, rounding n=2.93 to 3 and deriving the molecular formula.

## 8. Discovery Lesson

**Opening**: "A gas has density 1.25 g/mL. Can you plug that directly into M=dRT/P?"

**Exploration**: Students compute M with the raw g/mL value, discovering an absurdly large result, then correct the units and get a plausible answer.

**Synthesis**: Guide toward: always verify unit consistency before applying a gas-law formula — an implausible result is a checkpoint, not an answer.

**Closure**: "H₂ and O₂ are released into a container with a tiny hole. Which effuses faster, and why?" (Directly resolves MC-2.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit unit-conversion checkpoint for M=dRT/P.
- **TA-2 (TELL)**: State Graham's law explicitly, anchored to the KE=½mv² derivation.
- **TA-3 (DO)**: Student computes n=M/EFM for an unfamiliar empirical-formula/molar-mass pair and rounds correctly.
- **TA-4 (TEST-THINKING)**: Present the H₂-vs-O₂ effusion probe and ask the student to justify the 4× factor from kinetic energy equality.

## 10. Voice Teaching

Whenever M=dRT/P is used, narrate "check that density is in g/L — an absurd answer means a units error." Whenever effusion rate is compared, state "equal temperature means equal kinetic energy, not equal speed" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly apply M=dRT/P with proper unit consistency, catching implausible results as unit errors, (b) correctly rank effusion rates via Graham's law from molar mass, (c) correctly round an experimental n ratio to determine molecular formula.

- **FA-1**: "A gas has density 1.25 g/mL at STP. What is its molar mass?" — targets MC-1.
- **FA-2**: "H₂ and O₂ are in separate containers each with a tiny hole. Which gas effuses faster? By what factor?" — targets MC-2.
- **FA-3**: "Empirical formula CH₂O, EFM=30g/mol. Measured M=88g/mol. What is the molecular formula?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-2 among students who have not yet connected kinetic energy equality to a speed-mass tradeoff.

**Delayed retrieval**: Re-probe MC-1's unit-consistency checkpoint and MC-2's Graham's-law reasoning as foundational knowledge for subsequent gas-law and kinetic-theory applications.

## 12. Recovery Notes

- **S3 (stuck)**: For the unit-conversion confusion, have the student explicitly write out the required units for each variable in M=dRT/P before substituting any numbers.
- **S4 (frustrated)**: Normalize — the momentum-vs-speed confusion in effusion is genuinely common on first exposure, since everyday intuition favors momentum-based reasoning.
- **S6 (collision)**: Use the explicit KE=½mv² derivation for MC-2; use the rounding-with-uncertainty argument for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why an implausibly large molar mass should trigger a units check.

## 13. Memory & Review

Tag as one procedural memory (unit-consistent M=dRT/P application) plus two conceptual-correction memories (KE-equality-derives-speed for Graham's law; experimental rounding for molecular formula). Schedule a spaced check at ~1 week.

## 14. Transfer Map

This concept has no direct KG unlocks but consolidates gas-law and mole-concept reasoning built across `chem.state.gas-laws` and `chem.found.mole-concept`, forming a capstone quantitative-application skill.

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
