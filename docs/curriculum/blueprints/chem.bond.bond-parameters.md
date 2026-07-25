# chem.bond.bond-parameters — Bond Length, Enthalpy, Angle, and Order

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.bond.bond-parameters` |
| Domain | Chemical Bonding |
| Requires | `chem.bond.covalent-bonding` |
| Unlocks | `chem.thermo.bond-enthalpy` |
| Difficulty | developing |
| Bloom Level | understand |
| Mastery Threshold | 0.75 |
| Estimated Hours | 2 |

## 1. Concept Spine

A double bond is NOT twice as strong as a single bond — C=C's enthalpy (614 kJ/mol) is genuinely LESS than twice C–C's (348 kJ/mol, would be 696 if truly doubled), since the π bond component involves less effective orbital overlap than the σ bond, making it inherently weaker — the double bond total is genuinely stronger than a single bond, just not by a clean doubling factor; bond enthalpy is NOT a universally fixed value for a given bond type — tabulated values are AVERAGES, and the actual enthalpy of a specific bond genuinely varies with molecular environment (neighboring atoms affect electron density and hence bond strength), introducing a real ±5-10% uncertainty whenever using average bond-enthalpy tables for ΔH calculations; and a LONGER bond is NOT stronger — the correct relationship is the opposite: higher bond order (more shared electron pairs) produces BOTH a shorter bond length AND a higher bond enthalpy simultaneously (like a stiffer spring, harder to stretch, with a shorter equilibrium length and a deeper energy well), directly contradicting a "more distance for electrons to hold atoms together" intuition.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Comparing C=C's actual enthalpy (614 kJ/mol) against a naive doubled-C–C prediction (696 kJ/mol), discovering the real value falls short of simple doubling.

**Representational**: A side-by-side comparison of C–C (154 pm, 348 kJ/mol) and C≡C (120 pm, 839 kJ/mol), visually anchoring the simultaneous shorter-length/higher-enthalpy relationship as bond order increases.

**Abstract**: The general principle that σ and π bond components contribute unequally to total bond strength (π being weaker due to less effective orbital overlap), preventing simple multiplicative scaling with bond order; the general spring-model relationship where higher bond order produces both shorter length AND higher enthalpy together, never longer-and-stronger.

**Transfer**: Given an unfamiliar bond comparison, correctly predicting that a double/triple bond is stronger than a single bond but not by a clean multiplicative factor, correctly accounting for the genuine environmental variability of tabulated bond enthalpies, and correctly predicting that higher bond order means both shorter AND stronger bonds simultaneously.

## 3. Why Beginners Fail

Students assume a double bond's strength is exactly twice a single bond's (a naive linear-scaling assumption from "double" in the name), missing that the π bond component is inherently weaker than the σ component (due to less effective orbital overlap), so the total double-bond enthalpy falls short of a clean doubling; they treat tabulated bond enthalpy values as fixed, universal constants for a given bond type, missing that these are AVERAGES across many different molecular contexts, with the actual enthalpy of any specific bond varying meaningfully depending on neighboring atoms' influence on electron density; and they assume a longer bond must be stronger (reasoning "more distance = more room for electrons to hold things together"), missing that the correct relationship is the opposite — higher bond order produces both a SHORTER length and a HIGHER enthalpy simultaneously, like a stiffer spring.

## 4. Misconception Library

### MC-1: A double bond is twice as strong as a single bond
- **Probe**: "C=C has enthalpy 614 kJ/mol and C–C has 348 kJ/mol — is C=C exactly twice C–C?"
- **Characteristic phrase**: "double bond means double strength."
- **Trigger (Type 5, instruction-induced)**: The word "double" in "double bond" suggests a straightforward doubling relationship, a plausible-sounding but numerically incorrect linguistic inference.
- **Conflict evidence [P28]**: 614 kJ/mol (C=C) is genuinely NOT equal to 2×348=696 kJ/mol (what a true doubling would predict) — the π bond component contributes LESS than the σ bond component does, because π bonding involves side-on orbital overlap, which is inherently less effective than the σ bond's direct, head-on overlap; the double bond IS genuinely stronger than the single bond overall, just not by the clean multiplicative factor the name "double" superficially suggests.
- **Bridge [P30]**: A double bond consists of one σ bond PLUS one π bond, and these two components are NOT equally strong — the π bond, with its less effective sideways orbital overlap, contributes a smaller energy increment than the σ bond alone provides, meaning the total (σ+π) genuinely falls short of exactly doubling the single (σ-only) bond's strength.
- **Replacement [P31]**: A double bond is stronger than a single bond (since it includes an additional, if weaker, π-bond contribution), but never assume this means exactly double the enthalpy — the π component is inherently weaker than the σ component.
- **Discrimination pairs [P33]**: The naive doubled prediction (696 kJ/mol) vs. the actual measured C=C enthalpy (614 kJ/mol) — genuinely stronger than single but falling short of true doubling.
- **S6 repair path**: Present the explicit numeric comparison (614 vs. 696), connecting the shortfall directly to the π bond's weaker orbital overlap.

### MC-2: Bond enthalpy is always a fixed value for a given bond type
- **Probe**: "Why does the bond enthalpy of C–H differ in CH₄, CHCl₃, and CH₃F?"
- **Characteristic phrase**: "C–H bond is always 413 kJ/mol."
- **Trigger (Type 1, overgeneralization)**: Students treat a single tabulated bond-enthalpy value as an absolute, universal constant for that bond type, without recognizing it's specifically an AVERAGE computed across many different molecular contexts.
- **Conflict evidence [P28]**: Bond enthalpy tables genuinely provide AVERAGE values — the actual enthalpy of a specific C–H bond genuinely VARIES depending on the molecular environment (neighboring atoms like Cl or F in CHCl₃ or CH₃F affect electron density around the carbon and hence the actual C–H bond strength differently than in CH₄), meaning tabulated "average" values introduce a real, quantifiable ±5-10% uncertainty whenever used for ΔH calculations involving specific molecules.
- **Bridge [P30]**: A "bond enthalpy table" value is a statistical average computed by examining that bond type across MANY different molecules — it necessarily smooths over genuine, real variation caused by each molecule's specific electronic environment, making it a useful approximation but never an exact, universal constant for every occurrence of that bond.
- **Replacement [P31]**: Bond enthalpy values in standard tables are averages with real, quantifiable uncertainty (±5-10%) — the actual strength of any specific bond genuinely depends on its molecular environment, never a fixed, universal constant.
- **Discrimination pairs [P33]**: The tabulated "average" C–H bond enthalpy (413 kJ/mol) vs. the actual, genuinely different C–H bond strength in CH₄ versus CHCl₃ versus CH₃F (each influenced by different neighboring atoms).
- **S6 repair path**: Present the explicit variation in C–H bond enthalpy across CH₄, CHCl₃, and CH₃F, connecting the differences directly to each molecule's distinct electronic environment.

### MC-3: A longer bond is stronger because there's more distance for the electrons to hold the atoms together
- **Probe**: "Compare C–C (154 pm, 348 kJ/mol) with C≡C (120 pm, 839 kJ/mol). Which is longer? Which is stronger?"
- **Trigger (Type 2, perceptual intuition)**: Students apply a plausible-sounding "more distance = more room for holding power" intuition, without checking the actual empirical relationship between bond length and bond strength.
- **Conflict evidence [P28]**: C–C (154 pm, weaker at 348 kJ/mol) is genuinely LONGER than C≡C (120 pm, stronger at 839 kJ/mol) — the SHORTER bond is the STRONGER one, directly contradicting the "longer means stronger" intuition; the correct model is a spring analogy — a stiffer spring (analogous to a higher bond order, with more electron pairs sharing) is genuinely HARDER TO STRETCH, has a SHORTER equilibrium length, AND a deeper (higher-magnitude) energy minimum, all simultaneously.
- **Bridge [P30]**: More shared electron pairs (higher bond order) pull the bonded atoms closer together (shorter length) while simultaneously requiring more energy to separate them (higher enthalpy) — length and strength move TOGETHER in the same direction as bond order increases, never trading off against each other the way the naive "more distance = more holding power" intuition would suggest.
- **Replacement [P31]**: Higher bond order produces BOTH a shorter bond length AND a higher bond enthalpy simultaneously — shorter bonds are stronger, not weaker, directly contradicting a distance-based holding-power intuition.
- **Discrimination pairs [P33]**: C–C (single bond, longer at 154 pm, weaker at 348 kJ/mol) vs. C≡C (triple bond, shorter at 120 pm, stronger at 839 kJ/mol) — shorter and stronger go together.
- **S6 repair path**: Present the explicit spring analogy (stiffer spring = shorter equilibrium length + harder to stretch), directly connecting to the C–C vs. C≡C numeric comparison.

## 5. Explanation Library

**Primary explanation**: Bond strength (enthalpy) increases with bond order, but not in a simple linear/multiplicative way, since the π bond component (present in double and triple bonds) is inherently weaker than the σ component due to less effective side-on orbital overlap — a double bond is genuinely stronger than a single bond, but not exactly twice as strong. Bond enthalpy values in standard tables represent averages across many molecular contexts, with the actual strength of any specific bond varying meaningfully based on its particular molecular environment (neighboring atoms' influence on electron density).

**Secondary explanation (length-strength-together framing)**: Bond length and bond strength move TOGETHER as bond order increases — higher bond order (more shared electron pairs) produces both a shorter equilibrium length and a higher bond enthalpy simultaneously, following a spring-like model (a stiffer spring is both shorter at rest and harder to stretch) — never a trade-off where longer bonds are somehow stronger.

## 6. Analogy Library

- **Primary analogy**: A rope made of one strand (single bond, weaker, longer at rest since less tension) versus a rope made of multiple twisted strands (double/triple bond, stronger, shorter/more tightly wound) — more strands (higher bond order) genuinely means both a shorter, more compact rope AND a stronger, harder-to-break one, simultaneously.
- **Breaking point**: The twisted-rope analogy conveys the length-strength-together relationship well but doesn't naturally capture the σ-vs-π unequal-contribution argument or the environmental variability of bond enthalpy — those need the explicit orbital-overlap and averaging arguments.
- **Anti-analogy**: Do NOT say "a longer bond is stronger" — this directly reinforces MC-3.

## 7. Demonstration Library

- **Demonstration 1 (C=C-vs-doubled-C–C numeric comparison)**: Present the explicit 614-vs-696 kJ/mol comparison, connecting the shortfall to the π bond's weaker orbital overlap.
- **Demonstration 2 (C–C-vs-C≡C length-and-strength comparison)**: Present both bonds' length and enthalpy values side by side, demonstrating the length-strength-together relationship directly.

## 8. Discovery Lesson

**Opening**: "If C–C has enthalpy 348 kJ/mol, and a double bond is 'double,' would you expect C=C to have enthalpy 696 kJ/mol?"

**Exploration**: Students compare the naive doubled prediction against the actual C=C enthalpy (614 kJ/mol), discovering the shortfall.

**Synthesis**: Guide toward: the π bond component is inherently weaker than the σ component, preventing simple doubling.

**Closure**: "C–C is longer than C≡C. Which one is actually stronger?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit C=C-vs-696-kJ/mol comparison.
- **TA-2 (TELL)**: State the bond-enthalpy-averages-vary-by-environment principle explicitly, worked through with the C–H examples.
- **TA-3 (DO)**: Student predicts relative length and strength for a new bond-order comparison, using the length-strength-together relationship.
- **TA-4 (TEST-THINKING)**: Present MC-3's C–C-vs-C≡C probe and ask the student to justify the shorter-is-stronger relationship using the spring analogy.

## 10. Voice Teaching

Whenever a double or triple bond's strength is discussed, state "stronger, but not exactly doubled/tripled" explicitly before giving any numeric value. Whenever bond length and strength are compared, narrate "shorter and stronger go together" as the standing rule.

## 11. Assessment

**Mastery gate**: Student can (a) correctly explain why a double bond isn't exactly twice as strong as a single bond, using the σ/π distinction, (b) correctly recognize bond enthalpy tables as averages with genuine environmental variability, (c) correctly predict that higher bond order means both shorter AND stronger bonds.

- **FA-1**: "C=C has enthalpy 614 kJ/mol and C–C has 348 kJ/mol — is C=C exactly twice C–C?" — targets MC-1.
- **FA-2**: "Why does the bond enthalpy of C–H differ in CH₄, CHCl₃, and CH₃F?" — targets MC-2.
- **FA-3**: "Compare C–C (154 pm, 348 kJ/mol) with C≡C (120 pm, 839 kJ/mol). Which is longer? Which is stronger?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-3 among students applying an intuitive "more distance = more holding power" heuristic.

**Delayed retrieval**: Re-probe MC-1's σ/π-unequal-contribution argument and MC-3's length-strength-together relationship before `chem.thermo.bond-enthalpy` requires fluent, correct bond-enthalpy-based ΔH calculations.

## 12. Recovery Notes

- **S3 (stuck)**: For the doubling confusion, present the numeric comparison directly (614 vs. 696), letting the shortfall itself motivate the σ/π explanation.
- **S4 (frustrated)**: Normalize — "double bond = double strength" is a very reasonable, common linguistic inference from the bond's name, making this error extremely understandable.
- **S6 (collision)**: Use the explicit CH₄/CHCl₃/CH₃F comparison for MC-2; use the spring analogy for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why shorter bonds are stronger, not weaker.

## 13. Memory & Review

Tag as three conceptual-correction memories (π bond weaker than σ, preventing simple doubling; bond enthalpy as environment-dependent average; length-strength-together relationship). Schedule a spaced check at ~1 week and again before `chem.thermo.bond-enthalpy`.

## 14. Transfer Map

Feeds directly into `chem.thermo.bond-enthalpy` (Hess's-law-style bond-enthalpy calculations directly require fluent, correct understanding of bond-enthalpy averaging and uncertainty established here).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
