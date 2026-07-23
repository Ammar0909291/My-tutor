# Bond Enthalpies — `chem.thermo.bond-enthalpy`

## Identity
- **KG ID**: chem.thermo.bond-enthalpy
- **Subject**: chemistry
- **Domain**: chem.thermo
- **Difficulty**: proficient
- **Bloom level**: apply
- **Estimated hours**: 3
- **Mastery threshold**: 0.80
- **Prerequisites**: chem.thermo.enthalpy, chem.bond.bond-parameters
- **Unlocks**: (none — terminal node)

## Learning Objective
Use mean bond enthalpies to estimate the enthalpy change of a gas-phase reaction; explain why bond enthalpy calculations give estimates rather than exact values; interpret the sign convention correctly (breaking bonds is endothermic, forming bonds is exothermic); and apply bond enthalpy data to compare relative bond strengths and predict relative reactivities.

## Core Understanding
**Bond enthalpy (bond energy)**: the enthalpy change for breaking ONE MOLE of a specified covalent bond in a molecule in the gas phase, with all species in the gaseous state.

**Heterolytic vs. homolytic cleavage**: bond enthalpy refers to HOMOLYTIC cleavage — each fragment takes one electron (forming radicals). The bond enthalpy is the enthalpy of the reaction X–Y(g) → X•(g) + Y•(g). Bond formation is the REVERSE: X•(g) + Y•(g) → X–Y(g), which is EXOTHERMIC (ΔH = −bond enthalpy).

**Mean (average) bond enthalpy**: the same type of bond (e.g. C–H) has slightly different energies in different molecules (C–H in CH₄ vs. C–H in CHCl₃ vs. C–H in C₂H₆). A MEAN bond enthalpy is the AVERAGE value across many molecules containing that bond. Values are tabulated.

Selected mean bond enthalpies (kJ mol⁻¹) (approximate):
- H–H: 436; H–Cl: 432; H–Br: 366; H–F: 568
- C–H: 413; C–C: 347; C=C: 614; C≡C: 839
- C–O: 358; C=O: 799; O–H: 463; O=O: 498
- N–N: 163; N=N: 418; N≡N: 945; N–H: 391
- Cl–Cl: 243; Br–Br: 193; F–F: 158

**Calculation method**:
ΔH_rxn ≈ Σ(bond enthalpies of bonds BROKEN) − Σ(bond enthalpies of bonds FORMED)

- Bonds BROKEN are endothermic (positive contribution to ΔH): products must absorb energy to break these bonds.
- Bonds FORMED are exothermic (negative contribution to ΔH): energy is released when new bonds form.
- Net ΔH is positive (endothermic) if more/stronger bonds are broken than formed; negative (exothermic) if more/stronger bonds are formed than broken.

**Worked example**: CH₄(g) + Cl₂(g) → CH₃Cl(g) + HCl(g)
- Bonds broken: 1 × C–H (413) + 1 × Cl–Cl (243) = +656 kJ mol⁻¹
- Bonds formed: 1 × C–Cl (346) + 1 × H–Cl (432) = −778 kJ mol⁻¹
- ΔH ≈ 656 − 778 = −122 kJ mol⁻¹ (exothermic)

**Why the calculation is an ESTIMATE (not exact)**:
1. MEAN bond enthalpies are averages across many molecules; the actual C–H bond in CH₄ differs slightly from the actual C–H bond in CH₃Cl.
2. The calculation ONLY applies to gas-phase reactions (all species must be gaseous). If any reactant or product is a liquid or solid, the calculation requires additional enthalpy terms (e.g. enthalpy of vaporisation) — using bond enthalpies alone for non-gas-phase reactions introduces significant error.
3. Steric and electronic effects in specific molecules are not captured by average values.

**When to prefer Hess's law (exact) over bond enthalpies (approximate)**:
- If ΔH_f° data for all species are available → use Hess's law: ΔH_rxn = ΣΔH_f°(products) − ΣΔH_f°(reactants) — this gives an EXACT value.
- If no ΔH_f° data are available (e.g. for a novel compound or an unknown species) → use bond enthalpies as an estimate.
- Bond enthalpies are BEST for: comparing two similar reactions (relative differences in ΔH; systematic errors cancel); identifying trends in reactivity; teaching the energy basis of bond strength.

**Bond enthalpy and reactivity**: stronger bonds (higher bond enthalpy) require more energy to break → less reactive bonds. Applications:
- C–F bond (485 kJ mol⁻¹ for C–F in fluoroalkanes) is much STRONGER than C–H (413) → fluorinated compounds are extremely resistant to chemical attack and thermally stable (Teflon/PTFE).
- Cl–Cl (243 kJ mol⁻¹) is much weaker than F–F (158 kJ mol⁻¹)... WAIT — F–F is actually the WEAKEST of the halogen-halogen bonds despite F being the most electronegative. The very short F–F bond creates severe lone-pair/lone-pair repulsion that weakens it. Cl–Cl is stronger than F–F. This counterintuitive fact is important.
- N≡N (945 kJ mol⁻¹) is the strongest bond tabulated for diatomics → explains why N₂ is very unreactive (kinetically inert) despite being thermodynamically unstable relative to many N compounds.

## Mental Models
**The enthalpy balance as a see-saw**: place the bond enthalpies of all bonds broken on the left side of a see-saw, and all bond enthalpies of bonds formed on the right side. If the right side (formed) is heavier (larger total) → the reaction is exothermic (releases energy net). If the left side (broken) is heavier → endothermic. The NET position of the see-saw is ΔH_rxn.

**The average height analogy for mean values**: mean bond enthalpy is like the average height of adults in a city — it summarises many individual values into one representative number. If you need the exact height of one specific person (exact bond energy in one specific molecule), the average is an approximation. For estimating the average height of a NEW group of similar people, it's a reasonable estimate.

## Why Students Fail
Students confuse the SIGN RULE: they believe breaking bonds is exothermic (because they associate "bonds break" with "explosion" = energy release) and forming bonds is endothermic. The reverse is true: BREAKING is endothermic (energy IN to separate atoms); FORMING is exothermic (energy OUT when atoms bond). The formula ΔH ≈ Σ(broken) − Σ(formed) — with bonds broken contributing a POSITIVE term — follows directly from this sign rule.

Students also forget that bond enthalpy calculations only apply to gas-phase reactions and use them for reactions involving liquids or solids, getting wrong answers.

## Misconceptions
- **MC-1 (Type 2 — perceptual intuition)**: "Breaking bonds releases energy, like a breaking rubber band snapping back." Probe: "Is the process of breaking a covalent bond endothermic or exothermic?" Characteristic phrase: "bonds breaking → energy released." Intervention: breaking a covalent bond requires energy INPUT — the two bonded atoms are at a lower energy when bonded than when separated; you must do work to pull them apart (endothermic, ΔH positive). The "snapping rubber band" intuition is wrong: a rubber band stores elastic energy and releases it when cut, but atoms bonded by electronic forces release energy when they COME TOGETHER (bond formation = exothermic), not when they separate. Remember: BREAKING = endothermic (like climbing a hill); FORMING = exothermic (like rolling down a hill).
- **MC-2 (Type 5 — instruction-induced)**: "Bond enthalpy calculations give exact ΔH values that agree with experimental measurement." Probe: "A student calculates ΔH = −124 kJ mol⁻¹ for a reaction using mean bond enthalpies. The experimental value is −132 kJ mol⁻¹. Is the calculation wrong?" Characteristic phrase: "if the calculation doesn't match experiment, there's an error." Intervention: bond enthalpy calculations give ESTIMATES using MEAN values averaged across many molecules. A ~6% discrepancy between the bond enthalpy estimate and the experimental value is EXPECTED — it is not a sign of arithmetic error; it is an inherent consequence of using averages. For exact values, Hess's law with ΔH_f° data is needed.
- **MC-3 (Type 1 — overgeneralization)**: "The most electronegative element always forms the strongest bond to hydrogen." Probe: "H–F bond enthalpy is 568 kJ mol⁻¹ and H–Cl is 432 kJ mol⁻¹. Does the trend hold for F₂ vs. Cl₂ bonds to each other?" Characteristic phrase: "more electronegative = stronger bond." Intervention: for X–H bonds, the more electronegative halogens DO form stronger bonds (H–F > H–Cl > H–Br > H–I). But for HALOGEN–HALOGEN bonds: F–F (158) < Cl–Cl (243) — fluorine's F–F bond is WEAKER. The very short F–F bond distance puts the lone pairs of the two F atoms in close proximity → lone-pair–lone-pair repulsion weakens the F–F bond. Electronegativity does not automatically predict bond strength; bond enthalpy depends on BOTH the bonding electrons and the repulsion of non-bonding electrons.

## Analogies
**Valid**: bond enthalpies as a currency exchange. You "spend" currency (energy) to break bonds; you "earn" currency when bonds form. The exchange rate (bond enthalpy) varies by bond type: a C≡C bond costs/earns 839 kJ mol⁻¹; a C–C costs/earns only 347 kJ mol⁻¹. If the total you earn (bonds formed) exceeds the total you spend (bonds broken), the reaction gives you net energy — it's exothermic.

## Demonstrations
**Bond enthalpy trends from combustion data**: use calorimetric data for CH₄, C₂H₆, C₃H₈ combustion; show that the "extra" ΔH per CH₂ group in each homologue is consistent (~658 kJ mol⁻¹ per CH₂ — related to the bond enthalpies of 2 C–H + 1 C–C broken vs. 2 C=O + 2 O–H formed in combustion, net). This shows bond enthalpies are additive in series.

**Relative reactivity from bond enthalpy**: compare Cl₂ and F₂ reacting with H₂. Bond enthalpies predict: H₂ + Cl₂ → 2HCl, ΔH ≈ 436 + 243 − 2(432) = −185 kJ mol⁻¹; H₂ + F₂ → 2HF, ΔH ≈ 436 + 158 − 2(568) = −542 kJ mol⁻¹. F₂ reacts far more exothermically — and in practice F₂ reacts explosively with H₂ even at low temperatures while Cl₂ requires activation.

## Discovery Questions
1. "Use bond enthalpies to estimate ΔH for N₂(g) + 3H₂(g) → 2NH₃(g). Given: N≡N = 945 kJ mol⁻¹; H–H = 436 kJ mol⁻¹; N–H = 391 kJ mol⁻¹. Is the estimate consistent in sign with the known industrial challenge of this reaction (the Haber process requires high temperature and a catalyst)? Explain what 'kinetically unfavourable but thermodynamically driven' means."
2. "Explain why Teflon (PTFE, –CF₂–CF₂–) is chemically inert and thermally stable, using bond enthalpy data for C–F vs. C–H and C–Cl to support your argument."

## Teaching Sequence
1. Recap bond order/length/enthalpy trends from chem.bond.bond-parameters.
2. Define bond enthalpy: energy to break 1 mol of bond homolytically in gas phase.
3. Sign conventions: breaking = endothermic (+); forming = exothermic (−).
4. Mean bond enthalpies: why averages are used; what this implies for accuracy.
5. Calculation: ΔH ≈ Σ(broken) − Σ(formed); worked example (CH₄ chlorination).
6. Accuracy discussion: estimates vs. Hess's law; gas-phase restriction.
7. Applications: reactivity from bond strength; N≡N inertness; C–F stability; F–F weakness.

## Tutor Actions
- **If student reverses the sign rule**: write a formation equation for H₂: H•(g) + H•(g) → H₂(g), ΔH = −436 kJ mol⁻¹ (exothermic — bonding releases energy). Reverse it: H₂(g) → H•(g) + H•(g), ΔH = +436 kJ mol⁻¹ (endothermic — breaking requires energy). Make the student state explicitly: "breaking = positive = endothermic" before any calculation.
- **If student applies bond enthalpies to a liquid-phase reaction**: ask "are all species in this reaction gaseous?" If not, state "bond enthalpy calculations strictly require all species to be gaseous; for aqueous reactions or combustion to liquid/solid products, additional terms are needed."
- **FRAGILE sign**: applies the sign convention correctly but cannot explain WHY bond enthalpies give estimates rather than exact values.

## Voice Teaching Notes
The sign rule is the #1 error. Establish it as a rule before any numbers: "Breaking bonds = energy IN = endothermic = POSITIVE contribution to ΔH. Forming bonds = energy OUT = exothermic = NEGATIVE contribution." Say it, have the student repeat it, then apply it to one example (H₂ bond formation/breaking) before introducing any multi-bond calculation.

## Assessment Signals
- **Green**: applies the correct sign rule; performs calculations for multi-bond reactions correctly; states that the result is an estimate (not exact) and explains why; identifies when Hess's law is preferred; explains F–F weakness despite high electronegativity of F.
- **Amber**: correct calculation procedure but reverses the sign in the formula (subtracts formed from broken instead of vice versa) or forgets to distinguish mean vs. exact values.
- **Red**: says breaking bonds is exothermic; applies bond enthalpy calculation to liquid-phase reactions without correction; believes most electronegative element always has strongest homodiatomic bond.
- **Probe**: "Use bond enthalpies to estimate ΔH for H₂(g) + Br₂(g) → 2HBr(g). Given: H–H = 436; Br–Br = 193; H–Br = 366 kJ mol⁻¹. State whether this is an estimate or an exact value, and give one reason it may differ from the experimental value."

## Tutor Recovery Strategy
If student cannot apply the formula: start with a single bond being broken, then formed. "Breaking H–H costs +436 kJ. Forming H–Br gives −366 kJ. Net for one H–Br formed: +436 + (−366) = +70 kJ (endothermic for the H-atom plus Br-atom → one H–Br, ignoring the Br₂ bond)." Then systematically add each bond, one at a time, counting up the total. This prevents the errors that arise from applying the formula as a black box.

## Memory Hooks
- **Sign rule**: "BREAK bonds = ENDOTHERMIC (+). FORM bonds = EXOTHERMIC (−)."
- **Formula**: "ΔH ≈ Σ(broken) − Σ(formed)."
- **Accuracy**: "Mean bond enthalpies → ESTIMATE. Use Hess's law for EXACT ΔH when data available."
- **F–F anomaly**: "F–F is WEAKEST halogen bond (158 kJ/mol) — lone-pair repulsion at short F–F distance. Cl–Cl (243) > F–F."
- **N≡N**: "945 kJ mol⁻¹ — strongest tabulated diatomic bond → N₂ very unreactive kinetically."

## Transfer Connections
No further chemistry concepts unlock from this terminal node. It is a synthesis endpoint integrating bond parameter knowledge with thermochemical calculation.

## Cross-Subject Connections
- **Pharmacology/drug design**: the C–F bond (485 kJ mol⁻¹, the strongest C-halogen bond) is deliberately incorporated into drug molecules (e.g. Prozac, Lipitor) to improve metabolic stability — cytochrome P450 enzymes that cleave C–H bonds cannot cleave the much stronger C–F bond, extending drug half-life in the body.
- **Atmospheric chemistry**: the high bond enthalpies of C–F and C–Cl bonds in CFCs and HFCs explain their long atmospheric lifetimes (decades to centuries) — tropospheric oxidation by OH• radicals is thermodynamically disfavoured for these bonds, so CFC molecules persist until UV photolysis in the stratosphere finally cleaves them.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.thermo.bond-enthalpy`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.thermo.bond-enthalpy` as of 2026-07-23.

## Curriculum Feedback
None.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
