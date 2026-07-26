# chem.elect.nernst — Nernst Equation

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.elect.nernst` |
| Domain | Electrochemistry |
| Requires | `chem.elect.standard-electrode`, `chem.equil.kc-kp` |
| Unlocks | `chem.elect.concentration-cell` |
| Difficulty | proficient |
| Bloom Level | apply |
| Mastery Threshold | 0.8 |
| Estimated Hours | 4 |

## 1. Concept Spine

Q in the Nernst equation is the reaction quotient for the OVERALL cell reaction written in its spontaneous direction (products/reactants, stoichiometric exponents, solids omitted) — computed exactly like K_c/K_p, never as two separate half-reaction quotients combined afterward; E°=0 (as in a concentration cell) means the STANDARD potential is zero, NOT that the actual cell voltage E is zero — the Nernst correction term −(0.0592/n)logQ is nonzero whenever the two half-cell concentrations differ, so a concentration cell genuinely generates real voltage purely from the concentration gradient; and the voltage shift per decade of Q is (0.0592/n) volts at 298K, which DECREASES as n increases — reactions transferring more electrons are LESS sensitive to concentration changes per decade, so the n-value must always be correctly identified and divided into the 0.0592 factor.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Writing Q explicitly for the Daniell cell (Zn(s)+Cu²⁺(aq)→Zn²⁺(aq)+Cu(s), Q=[Zn²⁺]/[Cu²⁺]) as a single overall-reaction quotient, never as separate half-cell terms.

**Representational**: A worked concentration-cell computation (dilute vs. concentrated Cu²⁺ half-cells) showing E°=0 but E=+0.0888V, visually anchoring that standard potential and actual potential are distinct quantities.

**Abstract**: The general principle that Q in the Nernst equation follows the same overall-reaction-quotient rules as K_c/K_p; the general 1/n scaling of the voltage-per-decade sensitivity.

**Transfer**: Given an unfamiliar cell (standard or concentration cell, any n), correctly writing the overall-reaction Q, correctly computing E from E° and the Nernst correction term (including cells where E°=0), and correctly scaling the per-decade voltage shift by 1/n.

## 3. Why Beginners Fail

Students write Q as separate concentration terms for each half-cell (treating the Nernst equation's Q as somehow different from the K_c/K_p reaction quotient they already know), missing that Q follows the exact same overall-cell-reaction-quotient convention (products over reactants, solids omitted) that applies to any equilibrium expression; they assume E°=0 (as in a concentration cell, where both electrodes are chemically identical) means the cell generates zero voltage entirely, missing that the Nernst correction term −(0.0592/n)logQ is independent of E° and becomes nonzero whenever the two half-cell concentrations genuinely differ — a concentration cell can and does generate real, measurable voltage purely from a concentration gradient; and they assume the voltage change per 10-fold concentration change is a universal fixed constant (0.0592V) regardless of the reaction, missing that this factor must be DIVIDED by n (the number of electrons transferred in the balanced half-reaction), so reactions with larger n show smaller voltage shifts per decade of concentration change.

## 4. Misconception Library

### MC-1: Q in the Nernst equation is calculated from the half-reaction at each electrode separately and then combined
- **Probe**: "For the Daniell cell Zn/Cu, write Q. Is it [Zn²⁺]/[Cu²⁺] or [Cu²⁺]/[Zn²⁺] or something else?"
- **Characteristic phrase**: "Q has four concentration terms, two for each half-cell."
- **Trigger (Type 4, notation-induced)**: Students see half-reactions written separately during cell setup and assume this separation persists into the Q expression, rather than recognizing Q applies to the combined overall equation.
- **Conflict evidence [P28]**: Q in the Nernst equation is the reaction quotient for the OVERALL CELL REACTION written in the spontaneous direction. For Zn(s)+Cu²⁺(aq)→Zn²⁺(aq)+Cu(s): Q=[Zn²⁺]/[Cu²⁺]. This is the standard equilibrium-expression format (products/reactants, raised to stoichiometric coefficients, solids omitted). The same rules as for K_c/K_p apply to Q in the Nernst equation — it is the SAME reaction quotient concept applied to the cell's overall equation.
- **Bridge [P30]**: The Nernst equation's Q is not a new or special quantity distinct from the reaction quotient already learned for equilibrium — it is computed identically, from the single balanced OVERALL cell equation (combining both half-reactions into one net equation first), never from four separate half-cell terms.
- **Replacement [P31]**: Always combine the two half-reactions into the single balanced overall cell equation first, then write Q from that overall equation using standard products-over-reactants convention — never write separate half-cell Q terms.
- **Discrimination pairs [P33]**: Correct Q=[Zn²⁺]/[Cu²⁺] (from the overall balanced equation) vs. an incorrect four-term expression treating each half-cell separately.
- **S6 repair path**: Walk through combining the two half-reactions into the overall equation explicitly before writing Q, reinforcing that Q always follows from ONE net equation.

### MC-2: A concentration cell has E° = 0, so it can't generate any voltage — it's always a dead cell
- **Probe**: "If one half-cell has [Cu²⁺] = 0.001 M and the other has [Cu²⁺] = 1.0 M, does E = E° − (0.0592/n) log Q give zero?"
- **Characteristic phrase**: "E° = 0 means no voltage."
- **Trigger (Type 2, perceptual intuition)**: Students perceive "standard potential is zero" as equivalent to "this cell produces no voltage at all," not distinguishing the standard (fixed-condition) potential from the actual (condition-dependent) potential.
- **Conflict evidence [P28]**: E°=0 means the cell has no voltage under STANDARD CONDITIONS (both concentrations at 1M). The Nernst correction term −(0.0592/n)logQ is NOT zero when concentrations differ. If [Cu²⁺]=0.001M (dilute, anode side) and [Cu²⁺]=1.0M (concentrated, cathode side): Q=0.001/1.0=10⁻³; logQ=−3; E=0−(0.0592/2)(−3)=+0.0888V. A real voltage exists purely from the concentration gradient.
- **Bridge [P30]**: E° is a FIXED reference value defined specifically at standard (1M, 1atm, 298K) conditions — it says nothing about the cell's behavior at any OTHER set of conditions. The actual, condition-dependent voltage E is always E° PLUS a correction term that depends on how far the real concentrations deviate from standard — this correction can be substantial even when E° itself is exactly zero.
- **Replacement [P31]**: E°=0 is not the same as E=0 — it only means the standard potential is zero; the actual cell voltage is entirely determined by the Nernst correction term whenever real concentrations differ from standard, and this can be a real, nonzero, measurable voltage.
- **Discrimination pairs [P33]**: E°=0, standard conditions (E=0, truly dead) vs. E°=0, dilute/concentrated concentration cell (E=+0.0888V, genuinely functional).
- **S6 repair path**: Present the explicit numerical Nernst computation for the concentration cell, showing E°=0 substituted in but E≠0 as the final result.

### MC-3: Increasing the concentration of the oxidant always increases the cell potential by the same amount per decade
- **Probe**: "If n=1, what is the change in E per 10-fold change in the oxidant concentration? What if n=2?"
- **Characteristic phrase**: "every 10× concentration change gives the same voltage shift."
- **Trigger (Type 5, instruction-induced)**: Students memorize "0.0592V per decade" as a fixed constant from an early single-electron example without registering the 1/n dependence explicitly.
- **Conflict evidence [P28]**: The change in E per decade of Q change is (0.0592/n) volts at 298K. For n=1: 0.0592V per decade; for n=2: 0.0296V per decade; for n=6: 0.00987V per decade. The n-dependence means that reactions transferring more electrons are LESS sensitive to concentration changes per decade — the 0.0592/n factor decreases.
- **Bridge [P30]**: 0.0592V is only the per-decade shift when n=1; it is not a universal constant independent of the specific half-reaction's electron count — the full factor is 0.0592/n, and n must always be read off correctly from the balanced half-reaction before applying this sensitivity.
- **Replacement [P31]**: Always divide 0.0592V by the correct n (electrons transferred in the balanced half-reaction) before computing per-decade voltage sensitivity — never apply 0.0592V directly regardless of n.
- **Discrimination pairs [P33]**: n=1 reaction (0.0592V/decade, highly concentration-sensitive) vs. n=6 reaction (0.00987V/decade, weakly concentration-sensitive) — same underlying Nernst equation, very different practical sensitivity.
- **S6 repair path**: Compute the per-decade shift explicitly for two different n values side by side, isolating the 1/n scaling.

## 5. Explanation Library

**Primary explanation**: The Nernst equation's Q is computed exactly like any reaction quotient (K_c/K_p style) from the single balanced overall cell equation, never from separate half-cell terms. Standard potential E° and actual potential E are genuinely distinct quantities — E° is fixed at standard (1M) conditions, while E includes a correction term −(0.0592/n)logQ that captures the real, condition-dependent voltage, which can be substantial (and measurable) even when E°=0, as in a concentration cell.

**Secondary explanation (n-dependence of concentration sensitivity)**: The voltage change per 10-fold change in Q is (0.0592/n) volts at 298K — this factor is not a universal constant but scales inversely with n, the number of electrons transferred in the balanced half-reaction, so reactions transferring more electrons show a smaller voltage response per decade of concentration change.

## 6. Analogy Library

- **Primary analogy**: A "sea-level reference" for E° (a fixed baseline defined at one specific set of conditions) vs. actual "altitude" E at real, varying conditions — knowing sea level is 0 doesn't mean every location's actual altitude is 0; the Nernst correction term is the "altitude adjustment" from real conditions.
- **Breaking point**: The sea-level analogy conveys the E°-vs-E distinction well but doesn't naturally capture the Q-construction rule (MC-1) or the n-dependence of sensitivity (MC-3) — those need the explicit overall-equation Q derivation and the side-by-side n-value computation.
- **Anti-analogy**: Do NOT say "E°=0 means this cell is electrically dead" — this directly reinforces MC-2 by conflating standard potential with actual voltage.

## 7. Demonstration Library

- **Demonstration 1 (overall-equation Q derivation)**: Combine the Daniell cell's two half-reactions into the overall equation explicitly, then derive Q from it, contrasted with an incorrect four-term half-cell version.
- **Demonstration 2 (concentration-cell numerical Nernst computation)**: Compute E explicitly for the dilute/concentrated Cu²⁺ concentration cell, showing E°=0 substituted in but a nonzero final E.
- **Demonstration 3 (n-dependence side-by-side)**: Compute the per-decade voltage shift for n=1, n=2, and n=6 explicitly, isolating the 1/n scaling.

## 8. Discovery Lesson

**Opening**: "If E°=0 for a cell, does that mean the cell produces absolutely no voltage under any conditions?"

**Exploration**: Students compute E explicitly for a concentration cell with genuinely different concentrations on each side, discovering a real, nonzero voltage despite E°=0.

**Synthesis**: Guide toward: E° is a fixed standard-condition reference; E is the actual, condition-dependent voltage, and the two are only equal at standard conditions.

**Closure**: "Does a 10× concentration change always shift the voltage by the same 0.0592V, regardless of the reaction?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the overall-equation Q derivation for the Daniell cell explicitly.
- **TA-2 (TELL)**: State the E°-vs-E distinction explicitly, anchored to the concentration-cell numerical example.
- **TA-3 (DO)**: Student computes E for an unfamiliar concentration cell with specified concentrations and n.
- **TA-4 (TEST-THINKING)**: Present the n=1-vs-n=2 probe and ask the student to justify why the per-decade voltage shift differs.

## 10. Voice Teaching

Whenever Q is written for the Nernst equation, narrate "combine into the overall equation first — never separate half-cell terms." Whenever E° and E are discussed, state "E°=0 is not E=0 — check the concentrations" as the standing reminder.

## 11. Assessment

**Mastery gate**: Student can (a) correctly write Q from the overall balanced cell equation, (b) correctly compute a nonzero E for a concentration cell despite E°=0, (c) correctly scale per-decade voltage sensitivity by 1/n.

- **FA-1**: "For the Daniell cell Zn/Cu, write Q correctly." — targets MC-1.
- **FA-2**: "Compute E for a Cu²⁺ concentration cell with [Cu²⁺]=0.001M and 1.0M on either side." — targets MC-2.
- **FA-3**: "What is the change in E per 10-fold change in oxidant concentration for n=1 vs. n=2?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on MC-2 among students who haven't yet encountered a concentration cell and default to "E°=0 means dead cell."

**Delayed retrieval**: Re-probe MC-1's overall-equation Q rule and MC-2's E°-vs-E distinction before `chem.elect.concentration-cell` requires fluent, independent Nernst-based reasoning about concentration cells specifically.

## 12. Recovery Notes

- **S3 (stuck)**: For the Q-construction confusion, have the student explicitly write the combined overall equation before attempting Q, never starting from separate half-reactions.
- **S4 (frustrated)**: Normalize — the E°-vs-E distinction is genuinely subtle and a very common point of confusion on first exposure to concentration cells.
- **S6 (collision)**: Use the explicit numerical concentration-cell computation for MC-2; use the side-by-side n-value computation for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why a concentration cell with E°=0 can still generate real voltage.

## 13. Memory & Review

Tag as a procedural memory (overall-equation Q construction; n-scaled per-decade sensitivity) plus one conceptual-correction memory (E°-vs-E distinction). Schedule a spaced check at ~1 week and again before `chem.elect.concentration-cell`.

## 14. Transfer Map

Feeds directly into `chem.elect.concentration-cell` (concentration cells are a direct, specialized application of the Nernst equation with E°=0 established here).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
