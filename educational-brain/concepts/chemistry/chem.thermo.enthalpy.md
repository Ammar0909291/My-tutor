# Enthalpy and Hess's Law — `chem.thermo.enthalpy`

## Identity

- **KG ID**: chem.thermo.enthalpy
- **Subject**: Chemistry
- **Domain**: Thermodynamics (chem.thermo)
- **Difficulty**: developing
- **Bloom level**: apply
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.thermo.first-law
- **Unlocks**: chem.thermo.bond-enthalpy, chem.thermo.gibbs
- **Cross-links**: none

## Learning Objective

Students can define enthalpy as a state function (H = U + PV) and identify ΔH = qp (heat at constant pressure); apply standard enthalpies of formation, combustion, and neutralisation in calculations; apply Hess's law (ΔH is path-independent) to calculate ΔH for reactions from a combination of known reactions; and use the standard formation convention (ΔH°f of elements in their standard states = 0).

## Core Understanding

**Enthalpy**: H = U + PV. At constant pressure: ΔH = ΔU + PΔV = q_p (enthalpy change equals heat transferred at constant pressure). H is a state function — ΔH depends only on initial and final states, not on the path.

**Standard enthalpy of formation (ΔH°f)**: the enthalpy change when 1 mol of a compound is formed from its elements in their standard states (1 bar, usually 25 °C). By convention: ΔH°f = 0 for all elements in their standard states (e.g., O₂(g), C(graphite), H₂(g), Na(s)).

**Standard enthalpy of reaction**:
ΔH°rxn = Σ ΔH°f(products) − Σ ΔH°f(reactants)
(Hess's law in its formation-based form)

**Standard enthalpy of combustion (ΔH°c)**: enthalpy change when 1 mol of substance burns completely in O₂ to CO₂(g) and H₂O(l). Always exothermic (negative ΔH°c) for organic substances.

**Standard enthalpy of neutralisation (ΔH°n)**: enthalpy change when acid and base neutralise to form 1 mol of water. For strong acid + strong base: ΔH°n ≈ −57 kJ/mol (the ionisation enthalpy of water). For weak acids/bases: less exothermic (some energy used to ionise the weak acid/base).

**Hess's law**: ΔH for any reaction equals the algebraic sum of ΔH values for any sequence of reactions that sum to the target reaction. Since H is a state function, if individual reactions sum to the target (same net chemical change), their ΔH values sum to give the target ΔH.

**Key algebraic manipulation rules**:
- Reverse a reaction → change sign of ΔH.
- Multiply a reaction by n → multiply ΔH by n.
- Two reactions that add to give the target → their ΔH values add.

## Mental Models

**The state-function mountain model**: two hikers travel from the same base camp (reactants) to the same summit (products) via different paths. Their total elevation gain (ΔH) is the same regardless of the path taken. Hess's law says: take whatever combination of "known paths" (reactions with known ΔH) that gets you from the same base camp to the same summit, sum their elevation changes, and you get the total ΔH for the direct route.

**The formation-enthalpy web**: imagine every compound connected to its elements by arrows labelled ΔH°f. A reaction ΔH = (arrows going UP from elements to products) − (arrows going UP from elements to reactants) = difference in formation enthalpy levels. The elements' level is defined as zero.

## Why Students Fail

1. **Sign on reversal**: students add ΔH values without negating reversed reactions.
2. **Stoichiometric scaling**: students forget to multiply ΔH°f by the stoichiometric coefficient in the balanced equation.
3. **ΔH°f = 0 for elements**: students look up "the enthalpy of O₂" and expect a non-zero number — it is zero by definition.
4. **Mixing combustion and formation enthalpies**: students substitute ΔH°c for ΔH°f (or vice versa) in Hess's law calculations.
5. **Applying Hess's law without verifying species cancel**: students add reactions without confirming that the intermediate species (which should cancel) actually cancel completely.

## Misconceptions

**MC-1 — Hess's law works only if the path is a sequence of real laboratory steps** (Type 5, instruction-induced)
- *Mechanism*: Hess's law is taught through specific examples (combustion/formation cycle), leading students to think the path must be chemically realised.
- *Diagnostic probe*: "Can you apply Hess's law if one of the intermediate reactions has never been performed in the laboratory?"
- *Characteristic phrase*: "Hess's law requires reactions that you can actually do in sequence."
- *Repair*: Hess's law is a thermodynamic consequence of H being a state function — the path need not be physically realised. You can combine any reactions on paper that algebraically sum to the target reaction; the ΔH values can even be measured differently (e.g., from spectroscopic data, from Born-Haber cycles). The only requirement is that the net chemical equation equals the target.

**MC-2 — Elements have a non-zero standard enthalpy of formation** (Type 5, instruction-induced)
- *Diagnostic probe*: "What is ΔH°f of O₂(g)? Of C(graphite)? Of H₂O(l)?"
- *Characteristic phrase*: "Oxygen in its gaseous state has some enthalpy that I need to look up."
- *Repair*: ΔH°f of every element in its standard state is zero BY DEFINITION. This is the reference point from which all formation enthalpies are measured. Only H₂O(l) has a non-zero ΔH°f (−285.8 kJ/mol) because water is a compound, not an element.

**MC-3 — Reversing a reaction gives the same ΔH (positive instead of negative)** (Type 4, notation-induced)
- *Mechanism*: students know "the sign changes" but write +ΔH when they should write −ΔH because they forget that the absolute sign must flip.
- *Diagnostic probe*: "Reaction A: C(s) + O₂(g) → CO₂(g), ΔH = −393 kJ. Write the reverse reaction and its ΔH."
- *Characteristic phrase*: "Reversing gives ΔH = +393 kJ. I change the direction but keep the number positive."
- *Repair*: the reverse reaction CO₂(g) → C(s) + O₂(g) has ΔH = +393 kJ (decomposition of CO₂ requires 393 kJ). The sign reversal is correct here — +393 kJ. What students sometimes do wrong: they write ΔH = −393 kJ for the reverse (failing to change sign at all) or they change the sign of an already-positive ΔH incorrectly. The rule is: ΔH_reverse = −ΔH_forward, always.

## Analogies

**The enthalpy Lego kit**: building a complex molecule from atoms is like assembling a Lego structure. Hess's law says you can find the total energy cost by building via any sequence of sub-assemblies, as long as you end with the same final structure. You might build each sub-unit separately and measure its energy, then combine; the total is the same as if you had built in one step.

**The accounting analogy**: imagine the elements as a zero-balance account. Every compound is a credit or debit relative to zero. ΔH°rxn = total credit of products − total credit of reactants = net balance change going from reactants to products. The elements' account is always zero.

## Demonstrations

**Demonstration 1 — Hess's law verification with combustion**
- Measure ΔH for the combustion of carbon to CO₂ directly (C + O₂ → CO₂). Separately measure ΔH for C + ½O₂ → CO (step 1) and CO + ½O₂ → CO₂ (step 2). Verify that ΔH_direct = ΔH_step1 + ΔH_step2 to within experimental error. This is the original Hess experiment.

## Discovery Questions

1. "Given: N₂(g) + O₂(g) → 2NO(g), ΔH₁ = +180 kJ; 2NO(g) + O₂(g) → 2NO₂(g), ΔH₂ = −113 kJ. Calculate ΔH for the reaction N₂(g) + 2O₂(g) → 2NO₂(g)." (Targets: add the two reactions: N₂ + O₂ + 2NO + O₂ → 2NO + 2NO₂; 2NO cancels → N₂ + 2O₂ → 2NO₂. ΔH = ΔH₁ + ΔH₂ = 180 − 113 = +67 kJ.)
2. "Calculate ΔH°rxn for C₂H₄(g) + H₂(g) → C₂H₆(g). ΔH°f: C₂H₄(g) = +52.5, H₂(g) = 0, C₂H₆(g) = −84.7 kJ/mol." (Targets: ΔH° = ΔH°f(C₂H₆) − [ΔH°f(C₂H₄) + ΔH°f(H₂)] = −84.7 − [52.5 + 0] = −137.2 kJ.)
3. "A strong acid neutralises a strong base with ΔH°n = −57.1 kJ/mol. A weak acid (ΔH°ionisation = +2.1 kJ/mol) neutralises the same strong base. What is the ΔH°n for the weak acid? Explain why the two values differ." (Targets: ΔH°n(weak acid) = −57.1 + 2.1 = −55.0 kJ/mol. For a weak acid, some energy must be spent ionising the acid (endothermic, +2.1 kJ/mol) before the H⁺ can react with OH⁻. By Hess's law, the total ΔH is the sum of ionisation and neutralisation.)

## Teaching Sequence

1. Review from chem.thermo.first-law: ΔH = q_p; H = U + PV; H is a state function.
2. Define standard enthalpy of formation; establish ΔH°f = 0 for elements in standard states (MC-2 built in). Look up examples: H₂O(l) = −285.8, CO₂(g) = −393.5, NaCl(s) = −411 kJ/mol.
3. Derive ΔH°rxn = Σ ΔH°f(products) − Σ ΔH°f(reactants). Work Discovery Question 2.
4. State Hess's law as a general principle (not just formation enthalpies). Show the cycle for Discovery Question 1. Emphasise the two rules: reverse → change sign; multiply → multiply ΔH.
5. Define standard enthalpy of combustion. Note: always exothermic for organic compounds.
6. Define standard enthalpy of neutralisation. Work Discovery Question 3 and explain the weak vs. strong acid difference.
7. Demonstration 1 (if available) or the narrative of Hess's original verification.

## Tutor Actions

- If student says Hess's law requires realised reactions → MC-1 repair: the state function argument; enthalpy doesn't know what path was taken.
- If student assigns non-zero ΔH°f to elements → MC-2 repair: ΔH°f is defined as zero for elements in their standard states — it is a convention, not a measurement.
- If student fails to negate reversed reactions → MC-3 repair: drill reverse-and-negate with three simple examples before proceeding to Hess's law problems.
- Advance when student correctly applies Hess's law algebraically (cancelling intermediate species) and correctly uses the formation-enthalpy equation.

## Voice Teaching Notes

Hess's law problems are taught most effectively by writing each given reaction and its ΔH, then performing explicit algebraic operations (multiply, reverse, add) on the reactions as written, watching the intermediate species cancel. The visual of "reactions being added like equations" is more reliable than trying to remember rules.

The three-step oral checklist for every Hess's law problem: (1) write the target reaction; (2) identify which given reactions to add/reverse/scale; (3) verify that intermediate species cancel completely before summing ΔH. If intermediates don't cancel, the combination is wrong.

## Assessment Signals

**Mastery gate**:
1. Student correctly calculates ΔH°rxn from standard enthalpies of formation for a 3-component reaction.
2. Student correctly applies Hess's law by adding/reversing two given reactions (including changing signs on reversal).
3. Student correctly states ΔH°f = 0 for elements in standard state and uses this in calculations.
4. Student correctly explains why weak-acid neutralisation is less exothermic than strong-acid neutralisation.

**FRAGILE signal**: student sets up Hess's law correctly but makes a sign error when reversing reactions — systematic, not random.

**MISCONCEIVING signal**: student assigns a non-zero value to ΔH°f of a standard-state element (e.g., O₂). Stop and address MC-2 before any further calculations.

## Tutor Recovery Strategy

If stuck:
1. For Hess's law algebraic manipulation: use only 2-step problems first. Write Reaction 1, Reaction 2, target reaction. Ask: "What operation on R1 and/or R2 makes their sum equal the target?" Reverse and/or scale, then check that intermediates cancel.
2. For formation enthalpy: return to the mountain model — sea level = elements. Every compound is above sea level (endothermic formation) or below (exothermic formation). ΔH°rxn = altitude of products − altitude of reactants. Elements are AT sea level — altitude = 0.
3. For sign conventions: drill the reverse-and-negate rule with enthalpy of melting: ΔH°fusion of ice = +6 kJ/mol → ΔH for freezing = −6 kJ/mol. Intuitive physical example before chemical examples.

## Memory Hooks

- **Hess's law: ΔH is path-independent. Sum ΔH values for reactions that sum to the target.**
- **ΔH°f = 0 for elements in standard state. ALWAYS. By definition.**
- **ΔH°rxn = Σ ΔH°f(products) − Σ ΔH°f(reactants).** Products first, reactants subtracted.
- **Reverse reaction → change sign. Scale reaction → scale ΔH.**

## Transfer Connections

- **chem.thermo.bond-enthalpy**: bond enthalpies are an alternative way to apply Hess's law — the sum of bond-breaking enthalpies (endothermic) minus bond-forming enthalpies (exothermic) gives an approximate ΔH°rxn without needing formation data.
- **chem.thermo.gibbs**: Gibbs energy G = H − TS uses ΔH from this node as one of the two inputs for predicting spontaneity; the magnitude of ΔH relative to TΔS determines whether a reaction is thermodynamically favoured.

## Cross-Subject Connections

- **Biology (bio.metabol)**: metabolic pathways use Hess's law — the energy released in a multi-step metabolic process (glycolysis, Krebs cycle) is the same as if glucose were directly combusted; the intermediate steps capture energy in ATP.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.thermo.enthalpy`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.thermo.enthalpy` as of 2026-07-23.

## Curriculum Feedback

None. Correct placement and unlock structure. Enthalpy appropriately gates both bond-enthalpy (a calculation technique building on Hess's law) and Gibbs energy (which combines ΔH with ΔS).

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
