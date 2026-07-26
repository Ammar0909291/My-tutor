# chem.thermo.first-law — The First Law of Thermodynamics

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.thermo.first-law` |
| Domain | Thermodynamics |
| Requires | `chem.thermo.system` |
| Unlocks | `chem.thermo.enthalpy`, `chem.thermo.entropy`, `chem.thermo.heat-capacities` |
| Difficulty | developing |
| Bloom Level | understand |
| Mastery Threshold | 0.75 |
| Estimated Hours | 3 |

## 1. Concept Spine

The first law of thermodynamics states energy is conserved: ΔU = q + w, where q is heat added to the system and w is work done on the system (sign convention: both positive when energy flows into the system) — with PV work at constant external pressure given by w = −PextΔV, and the useful derived relationship ΔH = ΔU + ΔnRT connecting the heat measured at constant volume (qv = ΔU) to the heat measured at constant pressure (qp = ΔH) via the change in moles of gas.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: A gas-filled syringe pushing against a weight — as the gas expands, it visibly does work lifting the weight, losing energy to the surroundings in the process.

**Representational**: An energy-flow diagram with q and w arrows crossing the system boundary, each independently signed, summing into a single ΔU change.

**Abstract**: ΔU = q + w with the sign convention that work done ON the system is positive, work done BY the system (as in expansion) is negative; the qv/qp/ΔH bookkeeping relationship ΔH = ΔU + ΔngasRT.

**Transfer**: Given any process description (expansion, compression, combustion at constant volume or pressure), correctly assigning signs to q and w and computing ΔU or ΔH as needed, including cases where ΔH ≠ ΔU.

## 3. Why Beginners Fail

Students conflate "the system does work" (which costs the system energy, w negative under this convention) with "the system gains energy from doing work" (backwards), assume ΔH and ΔU are simply two names for the same quantity rather than distinct state functions related by a gas-mole-dependent correction term, and don't track which measured heat quantity (qv from a constant-volume bomb calorimeter vs. qp from a constant-pressure setup) corresponds to which thermodynamic state function (ΔU vs. ΔH respectively).

## 4. Misconception Library

### MC-1: Expansion means w is positive
- **Probe**: "A gas expands from 1 L to 3 L against a constant external pressure of 2 atm. Is w positive or negative for the gas? Calculate w."
- **Characteristic phrase**: "The gas did work by expanding, so w is positive."
- **Trigger (Type 5, instruction-induced)**: "The gas does work" and "the system gains work" sound like the same statement, but students confuse "exerting force/doing work on something else" with "gaining energy from work."
- **Conflict evidence [P28]**: w = −PextΔV = −2 atm × (3−1) L = −4 L·atm (≈ −405 J) — the gas's internal energy decreases from the work term because it gave energy to the surroundings by pushing against them, not gained energy.
- **Bridge [P30]**: "Doing work on the surroundings" (expanding, pushing outward) costs the system energy under the ΔU = q+w convention where w is defined as work done ON the system; work done BY the system carries a negative sign in this term.
- **Replacement [P31]**: Expansion against external pressure always gives w < 0 (system loses energy via work); compression always gives w > 0 (system gains energy via work), under the w = −PextΔV convention.
- **Discrimination pairs [P33]**: Expansion (ΔV > 0, w < 0) vs. compression (ΔV < 0, w > 0) — the sign of w is opposite to the sign of ΔV.
- **S6 repair path**: Compute w = −PextΔV numerically for the given expansion and show the negative sign directly, then connect it to "the gas gave energy away by pushing out."

### MC-2: ΔH equals ΔU always
- **Probe**: "The combustion of methane produces 803 kJ/mol at 25°C (constant pressure). Is this ΔH or ΔU? Are they the same for this reaction?"
- **Characteristic phrase**: "ΔH and ΔU are just different names for the same thing."
- **Trigger (Type 5, instruction-induced)**: Both ΔH and ΔU are commonly called "the energy released," without distinguishing which measurement condition (constant volume vs. constant pressure) each one corresponds to.
- **Conflict evidence [P28]**: For CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l), Δngas = 1 − 3 = −2 mol; ΔH = ΔU + ΔngasRT = ΔU + (−2)(8.314)(298)/1000 = ΔU − 4.96 kJ — a real, computable 4.96 kJ difference between ΔH and ΔU for this specific reaction.
- **Bridge [P30]**: ΔH and ΔU coincide only when the reaction produces no net change in moles of gas (Δngas = 0); any reaction changing gas moles will have ΔH ≠ ΔU by an amount proportional to that change.
- **Replacement [P31]**: ΔH = ΔU + ΔngasRT — the two state functions are related but distinct, differing by a term that depends on the reaction's gas-mole change.
- **Discrimination pairs [P33]**: A reaction with Δngas = 0 (ΔH = ΔU exactly) vs. methane combustion with Δngas = −2 (ΔH and ΔU differ by 4.96 kJ).
- **S6 repair path**: Compute the ΔH−ΔU gap explicitly for methane combustion using the ΔngasRT term.

### MC-3: qp and qv differ only in name
- **Probe**: "A combustion reaction in a bomb calorimeter releases 500 kJ. Is this ΔH or ΔU? What additional information would you need to calculate ΔH?"
- **Trigger (Type 3, language contamination)**: Students see both qp and qv described simply as "heat released" and don't track which measured quantity equals which specific thermodynamic state function.
- **Conflict evidence [P28]**: A bomb calorimeter operates at constant volume, so the heat it measures is qv, which equals ΔU directly (no PV work possible at constant volume) — not ΔH, which additionally requires knowing Δngas and T to compute via ΔH = ΔU + ΔngasRT.
- **Bridge [P30]**: The measurement condition (constant volume vs. constant pressure) determines which state function the measured heat equals — qv = ΔU always, qp = ΔH always, but the two symbols aren't interchangeable labels for one quantity.
- **Replacement [P31]**: Bomb calorimeter (constant volume) → qv = ΔU directly; open/constant-pressure setup → qp = ΔH directly; converting between them requires the Δngas correction.
- **Discrimination pairs [P33]**: Bomb calorimeter data (gives ΔU directly) vs. open-flask/constant-pressure data (gives ΔH directly) — different apparatus, different state function measured.
- **S6 repair path**: Ask directly what additional information (Δngas, T) is needed to convert the bomb-calorimeter qv into ΔH.

## 5. Explanation Library

**Primary explanation**: The first law states that a system's internal energy can only change by heat flowing in or out (q) or work being done on or by the system (w): ΔU = q + w, using the convention where both q and w are positive when energy flows into the system. For gas expansion/compression against a constant external pressure, w = −PextΔV — negative for expansion (system loses energy pushing outward), positive for compression (system gains energy from being pushed inward).

**Secondary explanation (ΔH vs ΔU framing)**: Enthalpy (H = U + PV) is a convenience state function equal to the heat measured at constant pressure (qp = ΔH), just as internal energy is the heat measured at constant volume (qv = ΔU). The two are related by ΔH = ΔU + ΔngasRT, differing whenever a reaction changes the number of moles of gas.

## 6. Analogy Library

- **Primary analogy**: A bank account (internal energy U) that can only change through two channels — deposits/withdrawals labeled "heat" (q) and deposits/withdrawals labeled "work" (w); the total balance change is always the sum of both channels, regardless of how the money moved through each one.
- **Breaking point**: The bank-account analogy captures conservation and additivity well, but doesn't naturally convey why expansion work has a negative sign under this convention — that needs the explicit force-times-distance PV work derivation.
- **Anti-analogy**: Do NOT say "doing work always means gaining energy" — this directly reinforces MC-1's sign confusion.

## 7. Demonstration Library

- **Demonstration 1 (gas-syringe expansion)**: A gas-filled syringe pushes a weighted piston outward against atmospheric pressure — measure the distance moved and compute w = −PextΔV directly, then discuss where that energy went (into lifting the weight, i.e., out of the gas system).
- **Demonstration 2 (bomb vs. open calorimetry)**: Compare a sealed bomb calorimeter (constant volume, measures qv=ΔU) against an open coffee-cup calorimeter (constant pressure, measures qp=ΔH) for conceptually parallel reactions, highlighting that each apparatus measures a different state function.

## 8. Discovery Lesson

**Opening**: "A gas expands and pushes a piston outward. Does the gas gain energy or lose energy from doing that?"

**Exploration**: Students compute w = −PextΔV for a concrete expansion example and are guided to connect the negative sign to "the gas gave energy to the surroundings by pushing them."

**Synthesis**: Guide toward: "doing work" (exerting force, pushing outward) costs the system energy; the negative sign in w = −PextΔV directly encodes this energy loss.

**Closure**: "If a bomb calorimeter measures qv, and today's reaction happens in an open flask instead — which state function are you actually measuring, and are the two numbers going to be the same?" (Bridges into MC-2/MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the gas-syringe expansion demonstration, computing w numerically live.
- **TA-2 (TELL)**: State the ΔH = ΔU + ΔngasRT relationship explicitly, worked through for methane combustion.
- **TA-3 (DO)**: Student computes w for a given expansion/compression scenario and correctly assigns the sign.
- **TA-4 (TEST-THINKING)**: Present MC-3's bomb-calorimeter scenario and ask the student to identify what's directly measured (qv=ΔU) and what additional data is needed for ΔH.

## 10. Voice Teaching

State the sign convention explicitly and repeatedly at the start of every w calculation: "work done ON the system is positive; the gas pushing outward against the surroundings costs the system energy, giving w a negative sign." Never introduce qp/qv without immediately naming which apparatus (bomb calorimeter vs. open/constant-pressure) measures which one.

## 11. Assessment

**Mastery gate**: Student can (a) correctly compute and sign w for a given expansion or compression, (b) correctly state whether ΔH = ΔU for a given reaction based on Δngas, (c) correctly identify which state function a bomb calorimeter vs. an open calorimeter measures.

- **FA-1**: "A gas expands from 1 L to 3 L against 2 atm external pressure. Is w positive or negative? Calculate it." — targets MC-1.
- **FA-2**: "Is ΔH the same as ΔU for methane combustion? Why or why not?" — targets MC-2.
- **FA-3**: "A bomb calorimeter releases 500 kJ. Is this ΔH or ΔU? What else would you need to find the other one?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-1 among students transferring "the system did work" language from everyday physics contexts without the sign convention attached.

**Delayed retrieval**: Re-probe MC-2's ΔH/ΔU distinction before `chem.thermo.enthalpy` develops standard enthalpies of formation and Hess's law, both of which assume this distinction is already solid.

## 12. Recovery Notes

- **S3 (stuck)**: For sign confusion, return to the numeric computation of w = −PextΔV and have the student state in words what the negative result means physically before moving to the next problem.
- **S4 (frustrated)**: Normalize — the everyday phrase "doing work" genuinely does suggest gaining something, making the thermodynamic sign convention a real linguistic trap, not a careless mistake.
- **S6 (collision)**: Use the explicit ΔngasRT computation for methane combustion for MC-2; use the bomb-vs-open calorimeter apparatus comparison for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why a combustion reaction that decreases gas moles has ΔH < ΔU (in magnitude terms, given the sign of the correction).

## 13. Memory & Review

Tag as a sign-convention procedural memory (w and q signs) plus a conceptual-correction memory (ΔH ≠ ΔU in general, apparatus-to-state-function mapping). Schedule a spaced check at ~1 week and again before `chem.thermo.enthalpy`.

## 14. Transfer Map

Feeds directly into `chem.thermo.enthalpy` (standard enthalpies and Hess's law build on the qp=ΔH identification established here), `chem.thermo.entropy` (state-function reasoning generalizes to entropy), and `chem.thermo.heat-capacities` (qv/qp distinctions underlie the definitions of Cv and Cp).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
