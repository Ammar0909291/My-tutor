# Gibbs Free Energy and Spontaneity — `chem.thermo.gibbs`

## Identity

- **KG ID**: chem.thermo.gibbs
- **Subject**: Chemistry
- **Domain**: Thermodynamics (chem.thermo)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Estimated hours**: 4
- **Mastery threshold**: 0.80
- **Prerequisites**: chem.thermo.enthalpy, chem.thermo.entropy
- **Unlocks**: chem.equil.concept, chem.thermo.cell-thermo
- **Cross-links**: none

## Learning Objective

Students can define Gibbs free energy (G = H − TS); use ΔG = ΔH − TΔS to predict the sign of ΔG and hence spontaneity at a given temperature; identify the four ΔH/ΔS sign combinations and predict at what temperature (if any) spontaneity changes; calculate ΔG° from standard enthalpies and entropies of formation; use ΔG° = −RT ln K to relate standard free energy change to the equilibrium constant; and explain the concept of reaction coupling.

## Core Understanding

**Gibbs free energy (G)**: defined as G = H − TS. The Gibbs free energy change at constant T and P:
ΔG = ΔH − TΔS

**Spontaneity criterion at constant T, P**: a process is spontaneous if ΔG < 0; non-spontaneous if ΔG > 0; at equilibrium if ΔG = 0.

This replaces the ΔS_universe criterion (equivalent: ΔG = −TΔS_universe at constant T, P) with a quantity that refers only to the system — much more convenient for chemistry.

**Four ΔH/ΔS combinations**:

| ΔH | ΔS | ΔG = ΔH − TΔS | Spontaneity |
|---|---|---|---|
| − | + | always − | Spontaneous at all T |
| + | − | always + | Non-spontaneous at all T |
| − | − | − at low T, + at high T | Spontaneous below T_cross |
| + | + | + at low T, − at high T | Spontaneous above T_cross |

**Temperature of crossover**: ΔG = 0 when T = ΔH/ΔS. Above or below this temperature, spontaneity changes.

**Standard Gibbs free energy change (ΔG°)**:
ΔG°rxn = Σ ΔG°f(products) − Σ ΔG°f(reactants)

Or equivalently (and often more numerically reliable):
ΔG°rxn = ΔH°rxn − T ΔS°rxn (at standard T = 298 K)

where ΔG°f = 0 for elements in their standard states (same convention as ΔH°f).

**Relationship to equilibrium constant**:
ΔG° = −RT ln K

where R = 8.314 J mol⁻¹ K⁻¹ and K is the dimensionless equilibrium constant.

Consequence:
- ΔG° < 0 → K > 1 (products favoured at equilibrium)
- ΔG° > 0 → K < 1 (reactants favoured at equilibrium)
- ΔG° = 0 → K = 1

Also: ΔG = ΔG° + RT ln Q (non-standard conditions), where Q is the reaction quotient. Spontaneity direction depends on whether Q < K (→ forward), Q > K (→ reverse), Q = K (equilibrium).

**Reaction coupling**: a non-spontaneous reaction (ΔG > 0) can be driven by coupling it to a spontaneous reaction (ΔG < 0) if the two reactions can be summed to give a net ΔG < 0. Classic biological example: ATP hydrolysis (ΔG° ≈ −30 kJ mol⁻¹) coupled to endergonic biosynthetic steps.

## Mental Models

**The ΔH/ΔS tug-of-war model**: ΔH is one contestant (energy change), TΔS is the other (entropy × temperature). At low T, entropy is barely amplified by T, so enthalpy wins. At high T, TΔS is large — entropy drives the competition. The sign of ΔG tells you who won.

**The K-on-a-number-line model**: ΔG° = −RT ln K. Place K on a log scale: K >> 1 means ΔG° is a large negative number (products overwhelmingly favoured); K ≈ 1 means ΔG° ≈ 0 (near-equal mix); K << 1 means ΔG° is a large positive number (reactants overwhelmingly favoured). A 10-kJ change in ΔG° shifts K by a factor of ~57 at 298 K (from K = e^(10,000/8.314/298) ≈ 57).

## Why Students Fail

1. **ΔG° = 0 means no reaction occurs**: students confuse the equilibrium condition (ΔG = 0 at equilibrium, which is a dynamic state of equal forward and reverse rates) with ΔG° = 0 (which means K = 1, a significant extent of reaction in both directions).
2. **ΔG° predicts spontaneity under all conditions**: ΔG° uses standard-state concentrations (1 mol L⁻¹). Under non-standard conditions, use ΔG = ΔG° + RT ln Q. A reaction with ΔG° > 0 can still proceed spontaneously if Q < K.
3. **T_cross = ΔH/ΔS is in the wrong units**: students substitute ΔH in kJ/mol and ΔS in J/(mol·K) without converting, getting T in inconsistent units.
4. **ΔG < 0 means the reaction goes to completion**: ΔG < 0 means the reaction is spontaneous (favoured direction is forward), not that it goes to 100% completion. Equilibrium may still leave significant reactants.

## Misconceptions

**MC-1 — ΔG° = 0 means the reaction doesn't occur** (Type 3, language contamination)
- *Mechanism*: students conflate ΔG = 0 (equilibrium) with ΔG° = 0 (specific condition where K = 1).
- *Diagnostic probe*: "For a reaction with ΔG° = 0, what is K? Does the reaction occur?"
- *Characteristic phrase*: "ΔG° = 0 means no energy is available, so nothing happens."
- *Repair*: ΔG° = 0 → K = e^(0) = 1 → [products]/[reactants] = 1 at equilibrium. The reaction DOES occur — both forward and reverse are equally favoured. K = 1 is the most balanced equilibrium possible. "No energy available" confuses ΔG° with ΔG° being the driving force FOR the reaction from standard state to equilibrium — but when ΔG° = 0, the standard state IS the equilibrium state (Q = K = 1 initially).

**MC-2 — ΔG° determines spontaneity at all concentrations** (Type 5, instruction-induced)
- *Mechanism*: ΔG° is the number computed from tables and is the one discussed in class; students apply it universally without noting the standard-state caveat.
- *Diagnostic probe*: "A reaction has ΔG° = +20 kJ mol⁻¹. A student mixes 0.001 mol L⁻¹ of product and 10 mol L⁻¹ of reactant. Is the forward reaction spontaneous?"
- *Characteristic phrase*: "ΔG° is positive, so the reaction won't go forward."
- *Repair*: ΔG = ΔG° + RT ln Q. With very low Q (reactants >> products), RT ln Q is a large negative number that can overwhelm a positive ΔG°, giving ΔG < 0. This is exactly the thermodynamic basis of driving reactions by using Le Chatelier's principle (extreme excess of reactants). Compute Q, compare to K, and evaluate ΔG = ΔG° + RT ln(Q/K) corrects this.

**MC-3 — T_cross = ΔH/ΔS without unit checking** (Type 4, notation-induced)
- *Mechanism*: students learn the formula T = ΔH/ΔS but mix ΔH in kJ and ΔS in J/K.
- *Diagnostic probe*: "ΔH = −100 kJ mol⁻¹, ΔS = −200 J mol⁻¹ K⁻¹. At what temperature does ΔG change sign?"
- *Characteristic phrase*: "T = −100/−200 = 0.5 K — the reaction stops being spontaneous at 0.5 K."
- *Repair*: convert ΔH to J first (−100 kJ = −100,000 J). T = ΔH/ΔS = −100,000/−200 = 500 K. The 0.5 K answer is 1000× too small — a physically absurd temperature that should trigger a units check. Always: "ΔH must be in J (or ΔS in kJ/K) before dividing."

## Analogies

**The bank-account analogy**: ΔH is money coming in or going out (enthalpy); TΔS is money that the universe's "entropy bank" gains. ΔG = ΔH − TΔS is the NET balance for the system. If ΔG < 0, the system "pays" the universe and the process is spontaneous; the universe (entropy bank) profits.

**The concert-ticket analogy for coupling**: ATP hydrolysis (ΔG < 0) is like a subsidy. It pays for the endergonic biosynthesis reaction (ΔG > 0 alone) — the combined ticket price is cheaper than zero so the reaction now runs. Coupling = the two reactions share a common intermediate (ATP/ADP) so their ΔG values genuinely add.

## Demonstrations

**Demonstration 1 — Ice melting at different temperatures**
- Show: at 5 °C (278 K), ΔG_melt < 0 (spontaneous); at −5 °C (268 K), ΔG_melt > 0 (non-spontaneous — freezes). Compute ΔG = ΔH − TΔS at both temperatures using ΔH°_fus = 6.01 kJ mol⁻¹, ΔS°_fus = 22.0 J mol⁻¹ K⁻¹ (= ΔH/T_m = 6010/273 = 22.0). At 278 K: ΔG = 6010 − 278 × 22.0 = 6010 − 6116 = −106 J mol⁻¹ < 0. At 268 K: ΔG = 6010 − 268 × 22.0 = 6010 − 5896 = +114 J mol⁻¹ > 0. T_cross = 6010/22.0 = 273 K = 0 °C — exactly the melting point! This closes the loop from chem.thermo.entropy to Gibbs energy elegantly.

## Discovery Questions

1. "Calculate ΔG° at 298 K for the reaction 2H₂(g) + O₂(g) → 2H₂O(l). Given: ΔH°rxn = −572 kJ mol⁻¹, ΔS°rxn = −326.8 J mol⁻¹ K⁻¹. Comment on spontaneity." (Targets: ΔG° = −572,000 − 298 × (−326.8) = −572,000 + 97,386 = −474,614 J mol⁻¹ ≈ −475 kJ mol⁻¹. Strongly negative → spontaneous at 298 K. Note: highly negative ΔS° (3 mol gas → 0 mol gas) doesn't make the reaction non-spontaneous because ΔH° is enormous and negative.)
2. "For a reaction with ΔG° = −8.0 kJ mol⁻¹ at 298 K, calculate K." (Targets: K = e^(−ΔG°/RT) = e^(8000/(8.314 × 298)) = e^(3.227) ≈ 25. K > 1 confirms products are favoured, but not overwhelmingly so — significant reactant remains.)
3. "A reaction has ΔH = +50 kJ mol⁻¹ and ΔS = +150 J mol⁻¹ K⁻¹. (a) Calculate T_cross. (b) Is the reaction spontaneous at 500 K? (c) At 200 K?" (Targets: (a) T_cross = 50,000/150 = 333 K. (b) At 500 K > 333 K: ΔG = 50,000 − 500 × 150 = 50,000 − 75,000 = −25,000 J mol⁻¹ < 0 → spontaneous. (c) At 200 K < 333 K: ΔG = 50,000 − 200 × 150 = 50,000 − 30,000 = +20,000 J mol⁻¹ > 0 → non-spontaneous.)

## Teaching Sequence

1. Review from chem.thermo.enthalpy: ΔH < 0 = exothermic; Hess's law. Review from chem.thermo.entropy: ΔS_universe > 0 criterion; ΔS_surr = −ΔH/T.
2. Derive ΔG = ΔH − TΔS by substituting ΔS_universe = ΔS_sys − ΔH/T; multiply by −T → ΔG = −TΔS_universe. Establish ΔG < 0 ↔ spontaneous.
3. Four ΔH/ΔS combinations table: work through each case qualitatively, emphasising T_cross for the two temperature-dependent cases. Address MC-3 (unit trap) before any T_cross calculation.
4. ΔG° from tables: ΔG°rxn = ΔH°rxn − TΔS°rxn. Work Discovery Question 1.
5. ΔG° = −RT ln K. Derive from first principles (or present as established); build the K-on-a-number-line mental model. Work Discovery Question 2.
6. ΔG = ΔG° + RT ln Q for non-standard conditions. Address MC-2. Address MC-1 (ΔG° = 0 → K = 1, not "no reaction").
7. Work Discovery Question 3 (T_cross calculation, both sub-questions).
8. Demonstration 1 (ice melting — closes the loop from entropy to ΔG).

## Tutor Actions

- If student says ΔG° = 0 means no reaction → MC-1 repair: ΔG° = 0 → K = 1 → equal products and reactants at equilibrium; reaction occurs in both directions equally.
- If student applies ΔG° to non-standard conditions → MC-2 repair: ΔG = ΔG° + RT ln Q; under extreme reactant excess, RT ln Q is large and negative, overriding positive ΔG°.
- If student gets T_cross in wrong units → MC-3 repair: ΔH must be in J before dividing by ΔS in J/K; check: T_cross in K must be a physically reasonable temperature (> 0 K, reasonable for the context).
- Advance when student correctly predicts spontaneity from ΔH and ΔS at given T, calculates K from ΔG°, and identifies T_cross for temperature-dependent cases.

## Voice Teaching Notes

The four-quadrant table (ΔH/ΔS sign combinations) is the most useful summary in this topic. Say it aloud for each quadrant: "Negative ΔH, positive ΔS — exothermic AND entropy increases — ALWAYS spontaneous." Run through all four verbally; students who say it out loud retain it better than those who just read the table.

For ΔG° = −RT ln K: the minus sign is critical. "If ΔG° is negative, K is greater than 1 — because −RT times a negative ΔG° gives ln K positive, which means K = e^(something positive) > 1." Say the sign logic explicitly every time rather than leaving it to students to infer.

## Assessment Signals

**Mastery gate**:
1. Student correctly predicts ΔG sign and spontaneity for all four ΔH/ΔS combinations at a given temperature.
2. Student correctly calculates T_cross (with correct unit conversion).
3. Student correctly calculates K from ΔG° using ΔG° = −RT ln K.
4. Student correctly identifies when ΔG° vs ΔG applies and adjusts for non-standard Q.

**FRAGILE signal**: student predicts spontaneity correctly from ΔG° tables but cannot explain the physical meaning of the four ΔH/ΔS sign combinations.

**MISCONCEIVING signal**: student says ΔG° = 0 means "no reaction." Correct immediately — this is the K = 1 case, not a dead reaction.

## Tutor Recovery Strategy

If stuck:
1. For the four combinations: take the (−ΔH, +ΔS) case first ("always spontaneous — this is the easiest case, both driving forces point the same way"). Then (+ΔH, −ΔS) ("always non-spontaneous — both work against spontaneity"). Then the two temperature-dependent cases — T determines which term wins.
2. For T_cross: ΔG = ΔH − TΔS = 0 → T = ΔH/ΔS. Check: "Is this T above or below typical lab temperatures? Does that make physical sense for the reaction?"
3. For K and ΔG°: choose a specific ΔG° value (say −5.7 kJ mol⁻¹). "K = e^(−ΔG°/RT) = e^(5700/(8.314 × 298)) = e^2.30 ≈ 10." Walk through the exponent arithmetic step by step rather than relying on pattern matching.

## Memory Hooks

- **ΔG = ΔH − TΔS. ΔG < 0: spontaneous. ΔG > 0: non-spontaneous. ΔG = 0: equilibrium.**
- **T_cross = ΔH/ΔS. Must use consistent units (J for both, or kJ for both).**
- **ΔG° = −RT ln K. Negative ΔG° → K > 1 → products favoured.**
- **ΔG° uses standard state (1 mol/L). ΔG = ΔG° + RT ln Q for real conditions.**

## Transfer Connections

- **chem.equil.concept**: the equilibrium constant K is defined thermodynamically via ΔG° = −RT ln K; this node is the thermodynamic foundation for the whole equilibrium domain.
- **chem.thermo.cell-thermo**: for electrochemical cells, ΔG° = −nFE° (n = moles of electrons, F = Faraday constant, E° = standard cell potential) — Gibbs energy directly predicts cell voltage.

## Cross-Subject Connections

- **Biology (bio.metabol)**: ΔG is the currency of metabolism — ATP hydrolysis (ΔG° ≈ −30 kJ/mol) drives endergonic biosynthesis via coupling; the Gibbs energy of glucose oxidation (ΔG° ≈ −2870 kJ/mol) is ultimately what powers all cellular work.
- **Physics (phys.therm.entropy)**: ΔG = −TΔS_universe at constant T, P — Gibbs energy is just the universe's entropy increase scaled by −T; the two spontaneity criteria are mathematically equivalent.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.thermo.gibbs`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.thermo.gibbs` as of 2026-07-23.

## Curriculum Feedback

The 0.80 mastery threshold (higher than default) is justified — Gibbs energy is the central thermodynamic criterion for all of equilibrium chemistry and electrochemistry, and the two downstream unlocks (chem.equil.concept and chem.thermo.cell-thermo) both depend on fluent ΔG° → K reasoning. Students who are shaky here will struggle throughout the equilibrium domain.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
