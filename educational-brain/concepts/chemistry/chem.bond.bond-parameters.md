# Bond Parameters — `chem.bond.bond-parameters`

## Identity
- **KG ID**: chem.bond.bond-parameters
- **Subject**: chemistry
- **Domain**: chem.bond
- **Difficulty**: developing
- **Bloom level**: understand
- **Estimated hours**: 2
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.bond.covalent-bonding
- **Unlocks**: chem.thermo.bond-enthalpy

## Learning Objective
Relate bond order, bond length, and bond enthalpy to each other and to atomic radii, and use these relationships to predict relative bond strengths and lengths across a series of compounds.

## Core Understanding
Three measurable parameters characterise every covalent bond:

**Bond order**: the number of shared electron pairs between two bonded atoms. Single bond = 1, double bond = 2, triple bond = 3. Fractional bond orders arise in resonance structures (benzene: 1.5 between each adjacent C–C pair).

**Bond length**: the equilibrium internuclear distance (in pm) at the potential energy minimum. Bond length decreases as bond order increases: C–C (154 pm) > C=C (134 pm) > C≡C (120 pm). Bond length also depends on the atomic radii of the bonded atoms: larger atoms form longer bonds (e.g., C–I bonds are longer than C–F bonds at the same bond order).

**Bond enthalpy (bond dissociation enthalpy)**: the energy required to break one mole of a specified bond in the gaseous phase, producing gaseous fragments. Always positive (endothermic — bond breaking requires energy). Bond enthalpy increases with bond order: C–C (348 kJ/mol) < C=C (614 kJ/mol) < C≡C (839 kJ/mol). The inverse relationship between bond length and bond enthalpy holds across a homologous series: shorter bonds are stronger.

**The three-way inverse relationship**:
- Higher bond order → shorter bond length → higher bond enthalpy.
- Lower bond order → longer bond length → lower bond enthalpy.
This can be visualised as three vertices of a triangle: any two determine the third for bonds of the same atom pair.

**Bond polarity parameter — bond dipole moment**: μ = δ × d, where δ is the partial charge and d is the bond length. A longer, more polarisable bond can have a larger dipole moment even with a moderate Δχ. Dipole moment is a vector along the bond axis.

**Multiple bonds and molecular geometry**: the presence of π bonds (from double or triple bonds) locks the geometry — free rotation around C=C is prevented by the π bond. The energy barrier to rotation is approximately equal to the π bond contribution to the double-bond enthalpy (C=C total 614 − C–C single 348 = 266 kJ/mol π contribution), explaining cis-trans isomerism stability.

## Mental Models
**The spring stiffness model**: a covalent bond is like a spring; a higher-order bond is a stiffer spring (harder to stretch/compress), which corresponds to shorter equilibrium length, higher force constant, and higher energy required to break.

**The ladder model**: bond order runs up a ladder (1 → 2 → 3); bond length decreases and bond enthalpy increases as you climb each rung; these two properties always move in opposite directions.

## Why Students Fail
Students confuse bond enthalpy (always positive, breaking a bond is endothermic) with the sign conventions for ΔH° in bond enthalpy calculations (where breaking bonds is positive and forming bonds is negative).

Students apply the bond-length/bond-order trend within a series (C–C vs C=C) and incorrectly extend it across different element pairs (O=O vs N≡N — different atoms, different comparison basis).

## Misconceptions
- **MC-1 (Type 5 — instruction-induced)**: "A double bond is twice as strong as a single bond." Probe: "C=C has enthalpy 614 kJ/mol and C–C has 348 kJ/mol — is C=C exactly twice C–C?" Characteristic phrase: "double bond means double strength." Intervention: 614 ≠ 2 × 348 (= 696); the π bond is weaker than the σ bond because it involves less effective orbital overlap; the double bond total IS stronger than the single bond but NOT double the energy.
- **MC-2 (Type 1 — overgeneralization)**: "Bond enthalpy is always a fixed value for a given bond type." Probe: "Why does the bond enthalpy of C–H differ in CH₄, CHCl₃, and CH₃F?" Characteristic phrase: "C–H bond is always 413 kJ/mol." Intervention: bond enthalpy tables give average values; the actual enthalpy of a specific bond varies with the molecular environment (neighbouring atoms affect electron density and thus bond strength); tables use averages, which introduce a ±5–10% uncertainty in ΔH calculations.
- **MC-3 (Type 2 — perceptual intuition)**: "A longer bond is stronger because there's more distance for the electrons to hold the atoms together." Probe: "Compare C–C (154 pm, 348 kJ/mol) with C≡C (120 pm, 839 kJ/mol). Which is longer? Which is stronger?" Intervention: direct counterexample. The correct model is the spring: a stiffer spring (higher bond order, more electron pairs sharing) is harder to stretch and has a shorter equilibrium length AND a higher energy minimum.

## Analogies
**Valid**: Bond order as number of cables in a bridge suspension — two cables (double bond) are shorter in effective span and harder to cut than one cable (single bond); three cables (triple bond) are the stiffest and hardest to sever. The cables don't "look longer" just because there are more of them — the opposite.

**Anti-analogy**: Do NOT extend the bond-order vs. bond-enthalpy trend across different atom pairs without caveat (e.g., C≡N vs. C≡C have different bond enthalpies even at the same bond order because N is different from C).

## Demonstrations
**Spectroscopic confirmation**: infrared spectroscopy shows C≡C stretch at ~2200 cm⁻¹ and C=C stretch at ~1650 cm⁻¹ — higher wavenumber (higher force constant) for the triple bond confirms it is a stiffer spring. This connects bond parameters to observable spectroscopic data.

**Molecular model kit**: build C₂H₆ (C–C single, free rotation), C₂H₄ (C=C, restricted rotation, planar), C₂H₂ (C≡C, linear) and compare physical dimensions and rotational freedom — visual reinforcement of bond-length decrease and π-bond geometry constraint.

## Discovery Questions
1. "N₂ has a triple bond (enthalpy 945 kJ/mol) and O₂ has a double bond (enthalpy 498 kJ/mol). N₂ is notoriously unreactive at room temperature. Using bond parameters, explain why."
2. "Benzene's C–C bond length is 140 pm, between C–C (154 pm) and C=C (134 pm). Predict the bond order and the expected bond enthalpy relative to C–C and C=C."
3. "A student claims that CO₂ is non-polar because the two C=O bond dipoles cancel. Using bond dipole moments, confirm or deny this and explain the role of geometry."

## Teaching Sequence
1. **Establish the three parameters**: bond order, bond length, bond enthalpy; give the C–C/C=C/C≡C series as the canonical data set.
2. **Derive the inverse relationship**: show that shorter bond = stronger bond for the same atom pair; graph energy vs. internuclear distance for each order.
3. **Introduce average bond enthalpies**: emphasise they are averages; use them to estimate ΔH°rxn = Σ(bonds broken) − Σ(bonds formed).
4. **Bond polarity parameter**: bond dipole moment; distinguish bond dipole from molecular dipole (vector sum); apply to CO₂ (polar bonds, cancel) vs H₂O (polar bonds, don't cancel).
5. **π bond contribution**: quantify the π bond energy as the difference between single and double bond enthalpies; explain why free rotation is prevented.

## Tutor Actions
- **If student claims double bond is twice as strong as single**: provide C=C (614) vs 2×C–C (696); numerically disprove; then explain σ vs π overlap difference as the reason.
- **If student treats average bond enthalpies as exact**: show a calculation using them vs. measured ΔH°rxn; discuss the error margin (acceptable for estimation, not for precision thermochemistry where calorimetry is preferred).
- **FRAGILE sign**: student recites the trend (shorter = stronger) but cannot predict which of two bonds in an unfamiliar molecule is shorter from the molecular formula.

## Voice Teaching Notes
The "double bond is twice as strong" error is extremely common and persistent — address it early and explicitly, with the numerical counterexample ready. Students need to hear the correct number (614 vs 696) to dislodge the misconception.

Wait time needed on "what does bond order tell you about length AND strength simultaneously?" — the three-way relationship requires students to hold all three concepts together.

## Assessment Signals
- **Green**: ranks a set of bonds by strength and by length correctly; explains the difference between bond enthalpy and ΔH°rxn; calculates approximate ΔH°rxn from average bond enthalpies.
- **Amber**: knows the trend direction but cannot quantify; or confuses bond enthalpy sign convention.
- **Red**: claims double bond is exactly twice as strong as single bond; claims longer bonds are stronger.
- **Probe**: "Rank N–N, N=N, N≡N by bond length (longest first) and by bond enthalpy (largest first)."

## Tutor Recovery Strategy
If student cannot order bonds by length and enthalpy simultaneously: remove enthalpy from the problem temporarily. Focus first on "which bond holds the atoms CLOSEST together?" (highest order → shortest). Once that direction is secure, add the enthalpy trend as a parallel result: "the same features that pull atoms closest together also require the most energy to separate them."

## Memory Hooks
- **The triple mnemonic**: "More bonds → Shorter distance → Stronger attraction." (All three increase together with bond order.)
- **Double-bond energy check**: "614, not 696 — the π bond is weaker than the σ bond."

## Transfer Connections
- **chem.thermo.bond-enthalpy**: this node is the direct prerequisite; bond-enthalpy calculations for ΔH°rxn require all three parameters, especially average bond enthalpies and their application.

## Cross-Subject Connections
- **Physics (spectroscopy)**: bond force constants derived from IR vibrational frequencies; higher force constant → higher wavenumber; bond order → force constant ordering.
- **Biology (enzyme active sites)**: catalytic activity sometimes involves breaking specific bond orders (e.g., phosphodiester bonds, peptide bonds); the energy cost relates directly to the bond enthalpy concept.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.bond.bond-parameters`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.bond.bond-parameters` as of 2026-07-23.

## Curriculum Feedback
None. Prerequisite (chem.bond.covalent-bonding) is correct. Unlocking chem.thermo.bond-enthalpy is appropriate — bond enthalpy thermochemistry requires a solid understanding of what bond parameters are.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
