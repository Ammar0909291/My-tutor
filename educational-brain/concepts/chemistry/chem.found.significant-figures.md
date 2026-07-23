# Significant Figures and Error Analysis — `chem.found.significant-figures`

## Identity

- **KG ID**: chem.found.significant-figures
- **Subject**: Chemistry
- **Domain**: Foundations (chem.found)
- **Difficulty**: foundational
- **Bloom level**: apply
- **Estimated hours**: 2
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.found.measurement
- **Unlocks**: none (terminal supporting skill)
- **Cross-links**: none

## Learning Objective

Students can count significant figures in any given measurement including edge cases (leading zeros, trailing zeros, exact numbers), apply sig fig rules correctly in multiplication/division and addition/subtraction calculations, compute absolute and relative (percentage) error, and propagate uncertainty through a single-step calculation.

## Core Understanding

Significant figures are not a rounding convention imposed for tidiness — they are a communication protocol encoding the precision of the instrument used. A measurement's sig figs tell every reader how many digits the instrument actually resolved. Reporting extra digits claims precision that was never measured; dropping digits loses real precision.

Two distinct rules govern calculation because they capture two different sources of uncertainty: **multiplication/division** — the result can be no more precise than the least precise factor (measured by number of sig figs); **addition/subtraction** — the result can be no more precise than the least precise addend measured from the decimal point (measured by decimal places). Conflating these two rules is the primary source of calculation errors.

Absolute error = |measured − true value|. Relative (percentage) error = (|measured − true value| / true value) × 100%. The distinction matters because a 0.1 g error on a 1 g sample (10% error) is far more serious than a 0.1 g error on a 100 g sample (0.1% error).

## Mental Models

**The weakest link**: In a chain of measurements, the final answer is only as precise as the weakest measurement. Sig figs track which measurement is the weakest and ensure the answer doesn't claim more than that weakest link provided.

**Decimal-place model for addition**: Write the numbers in a column. The last reliable digit in each number determines where reliability ends. The answer can only be reported to the column where all addends are still reliable.

## Why Students Fail

1. **Applying the multiplication rule to addition**: Students use "fewest sig figs wins" for all operations, giving wrong decimal places in addition/subtraction.
2. **Ambiguous trailing zeros**: Students report 100 when they mean 1.00 × 10², claiming one sig fig when they meant three.
3. **Ignoring exact numbers**: Students apply sig fig rules to counting numbers (exact) or defined constants (e.g., 1 km = 1000 m exactly), which have infinite sig figs and should not limit the answer.
4. **Confusing relative and absolute error**: Students use absolute error when relative error is the meaningful comparison, or vice versa.

## Misconceptions

**MC-1 — Multiplication sig fig rule applies to addition** (Type 5, instruction-induced)
- *Diagnostic probe*: "Calculate 15.3 + 1.46 + 2.1. How many decimal places should the answer have? (NOT: how many sig figs?)"
- *Characteristic phrase*: "The answer has 2 sig figs because 2.1 has 2 sig figs."
- *Repair*: Write the column addition showing that 2.1 is reliable only to the first decimal place; 15.3 is also only to the first decimal; the answer is 18.9 (1 decimal place, 3 sig figs).

**MC-2 — Trailing zeros before a decimal are significant** (Type 4, notation-induced)
- *Diagnostic probe*: "How many significant figures does the number 1200 have? What if it were written as 1200.? What about 1.200 × 10³?"
- *Repair*: 1200 without a decimal is ambiguous — it could be 2, 3, or 4 sig figs. 1200. (with decimal) = 4 sig figs. 1.200 × 10³ = 4 sig figs. Scientific notation removes ambiguity.

**MC-3 — Applying sig fig rules to exact numbers** (Type 5, instruction-induced)
- *Diagnostic probe*: "If you count 12 apples on a scale that reads 1.5 kg, what is the mass per apple to the correct sig figs?"
- *Repair*: 12 is an exact count (infinite sig figs). The answer is limited only by the balance: 1.5 kg ÷ 12 = 0.13 kg per apple (2 sig figs from the balance reading).

## Analogies

**The weakest link in a chain**: A chain's strength is its weakest link. A calculation's precision is its least precise measurement. Sig figs track the weakest link.

## Demonstrations

**Demonstration 1 — Ruler precision cascade**
- Measure a table's length with a metre stick (±1 mm), a 30 cm ruler (±1 mm), and a tape measure (±5 mm). Calculate the perimeter. Ask students: how many decimal places are appropriate in the sum? The tape measure's ±5 mm is the weakest link — it determines the final answer's precision.

## Discovery Questions

1. "You measure the mass of a flask as 52.458 g on an analytical balance, then add a sample and read 67.3 g on a top-loading balance. What is the mass of the sample, and to how many decimal places should you report it?" (Addition rule; answer limited by the 67.3 g reading's 1 decimal place.)
2. "The speed of light is exactly 2.998 × 10⁸ m/s and the frequency of a wave is 6.50 × 10¹⁴ Hz. What is the wavelength? How many sig figs?" (Multiplication rule: 3 sig figs from 6.50 × 10¹⁴.)
3. "A student measures a mass as 4.52 g when the true value is 4.50 g. What is the absolute error? The relative error? If another student measures 4.52 g for a 0.10 g sample that should weigh 0.10 g, is their error more or less serious?" (Relative error perspective.)

## Teaching Sequence

1. Review from chem.found.measurement: sig figs as precision-encoding.
2. Sig fig counting rules (all three: non-zero digits; captive zeros; leading and trailing zeros). Drill with 8 examples covering all edge cases.
3. Scientific notation as the ambiguity resolver for trailing zeros.
4. Calculation rules: present the column-addition model first, then the weakest-link model for multiplication. Explicitly contrast the two.
5. Exact numbers: define and give examples (counting, defined conversions).
6. Absolute error and relative error: formula, calculation, interpretation.
7. Apply: five mixed calculations (some addition, some multiplication, one involving an exact number).

## Tutor Actions

- If student applies multiplication rule to addition → use the column-addition model; write the numbers with decimal places aligned.
- If student misses ambiguous trailing zeros → switch to scientific notation for all ambiguous cases; require it until the student correctly identifies ambiguity.
- If student applies sig fig rules to an exact count → ask "Can you have a half apple? No — so 12 is exact. Does an exact number limit precision? No."
- Advance when student correctly applies both rules (3 addition problems, 3 multiplication/division problems, all correct).

## Voice Teaching Notes

The two-rule distinction (multiplication vs. addition) must be practised in the same session it is taught — a student who leaves the session without practising both independently will default to one rule for everything. Interleave the problem types during practice.

Sig figs are a supporting skill, not an endpoint. Keep the session tight (under 40 minutes) and move directly into an application (e.g., a concentration calculation from chem.found.concentration) so the skill is immediately contextualised.

## Assessment Signals

**Mastery gate**:
1. Student correctly counts sig figs in 5 of 5 examples including at least one with leading zeros and one with ambiguous trailing zeros.
2. Student correctly applies the addition rule to 2 problems and the multiplication rule to 2 problems.
3. Student correctly identifies that a counting number is exact and does not limit the answer's sig figs.

**FRAGILE signal**: student gets addition problems right in isolation but reverts to "least sig figs" when addition follows a multiplication step in a multi-step problem.

**MISCONCEIVING signal**: student insists trailing zeros in 1200 are significant without a decimal point.

## Tutor Recovery Strategy

If stuck:
1. For rule confusion: reduce to two canonical examples — one addition, one multiplication — and practice switching between them until both are stable before adding complexity.
2. For trailing zero ambiguity: require scientific notation for all answers; the notation forces explicit digit-counting.
3. For the "when does precision matter?" motivational gap: show a real example where an incorrect sig fig in a drug concentration calculation would lead to a 10× error in dosage. Sig figs are not bureaucratic; they are a precision contract.

## Memory Hooks

- **"Multiply: fewest sig figs. Add: fewest decimal places."** One sentence, two rules, the critical distinction.
- **Zero rules**: "Sandwiched zeros count. Leading zeros don't. Trailing zeros — check for a decimal."

## Transfer Connections

- **chem.found.concentration**: the first major quantitative application where sig figs must be correctly applied to a real chemistry calculation.
- **chem.found.stoichiometry**: multi-step calculations where each step's precision must be tracked.
- **chem.state.gas-laws**: pressure-volume-temperature calculations where measurement precision directly affects results.

## Cross-Subject Connections

- **Physics (phys.meas.units / measurement)**: identical sig fig rules apply in physics; this is shared foundational material.
- **Mathematics**: significant figures are distinct from decimal places, which is a mathematical rounding concept. The distinction is important for students who conflate them.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.found.significant-figures`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23. Blueprint components informed: concept_summary ✓, common_misconceptions ✓.

## Runtime Asset References

No AssetIdentity records seeded for `chem.found.significant-figures` as of 2026-07-23.

## Curriculum Feedback

This node has no `unlocks` edges in the KG. This is structurally accurate (sig figs are a supporting skill applied throughout, not a prerequisite for a specific next concept), but the concept is implicitly prerequisite for any quantitative chemistry calculation. The KG correctly represents this as cross-cutting rather than linearly chained.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
