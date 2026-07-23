# Physical Quantities and SI Units — `chem.found.measurement`

## Identity

- **KG ID**: chem.found.measurement
- **Subject**: Chemistry
- **Domain**: Foundations (chem.found)
- **Difficulty**: foundational
- **Bloom level**: remember
- **Estimated hours**: 2
- **Mastery threshold**: 0.70
- **Prerequisites**: chem.found.matter
- **Unlocks**: chem.atomic.electromagnetic-radiation, chem.elect.conductance, chem.found.mole-concept, chem.found.significant-figures, chem.state.gas-laws, chem.thermo.system
- **Cross-links**: math.found.mathematical-thinking

## Learning Objective

Students can identify SI base units for length, mass, time, temperature, amount of substance, electric current, and luminous intensity; convert between units using metric prefixes (nano- to kilo-); distinguish accuracy from precision; express measurements in scientific notation with appropriate significant figures; and propagate uncertainty through single-step calculations.

## Core Understanding

All physical measurements communicate two things: a **numerical value** and a **unit**. Without the unit, the number is meaningless. The SI system provides a coherent set of seven base units and a prefix system that scales by powers of ten — so any measurement, regardless of magnitude, can be expressed in a consistent format.

Accuracy and precision are orthogonal properties of a measurement: **accuracy** is how close a result is to the true value; **precision** is how reproducible the result is across repeated measurements. A precise but inaccurate instrument has a systematic error (bias); an accurate but imprecise instrument has random error. Both are real problems, but they require different remedies.

Significant figures encode the precision of a measurement: the number of meaningful digits tells the reader how finely the instrument could resolve the quantity. The rules for significant figures in calculation (multiplication/division: retain the fewest sig figs; addition/subtraction: retain the fewest decimal places) prevent false precision propagating through chains of calculation.

## Mental Models

**The unit as a label**: A measurement is like a price tag — the number alone tells you nothing; you need the currency (unit) to know what it means. "5.0 of length" is meaningless; "5.0 metres" locates you on a real scale.

**Accuracy vs. precision as archery**: Accuracy = arrows clustered near the bullseye. Precision = arrows clustered near each other (possibly far from the bullseye). You want both, but they are independently achievable. Systematic bias gives precision without accuracy; high random error gives neither.

**Significant figures as "how many digits the instrument actually gave you"**: If a balance reads 3.45 g, the instrument resolved three significant figures. Reporting 3.450000 g claims more than the instrument delivered — false precision.

## Why Students Fail

1. **Unit conversion errors**: Students convert within SI but fail when crossing prefix boundaries (e.g., nm → m requires dividing by 10⁹, not 10³). They lose track of the power-of-ten direction.
2. **Accuracy/precision conflation**: Students treat these as synonyms or believe "precise = accurate."
3. **Leading-zero confusion**: Students don't count leading zeros (0.0045 has 2 sig figs, not 4) because they look like significant digits.
4. **Scientific notation place-value confusion**: Students move the decimal the wrong direction when converting to/from scientific notation.

## Misconceptions

**MC-1 — Precision and accuracy are the same** (Type 3, language contamination)
- *Mechanism*: In everyday English, "accurate" and "precise" are nearly synonymous. In science, they are independent and orthogonal.
- *Diagnostic probe*: "A student repeatedly measures a 10.00 g standard weight and gets 9.85, 9.84, 9.86, 9.85 g. Are the measurements precise? Are they accurate?"
- *Characteristic phrase*: "The measurements are very precise and accurate — they're all the same."
- *Repair*: Use the archery diagram. Precise = clustered; accurate = near bullseye. The student's data is precise (clustered around 9.85) but inaccurate (systematically below 10.00 — a balance calibration error).

**MC-2 — Zeros are never significant** (Type 4, notation-induced)
- *Mechanism*: Students memorise "leading zeros don't count" and over-apply it to trailing zeros, which may be significant (100. vs 100 vs 1.00×10²).
- *Diagnostic probe*: "How many significant figures are in 0.00450? In 4500? In 4500.?"
- *Repair*: Three-rule summary with examples for each: (1) leading zeros never count; (2) trailing zeros after a decimal point always count; (3) trailing zeros before a decimal point are ambiguous — use scientific notation to resolve.

**MC-3 — Unit conversion direction error** (Type 5, instruction-induced)
- Students multiply when they should divide (or vice versa) when converting between prefixes.
- *Diagnostic probe*: "Convert 450 nm to metres. Show each step."
- *Repair*: The unit-factor method (dimensional analysis): write the conversion as a fraction that cancels units. 450 nm × (1 m / 10⁹ nm) = 4.50 × 10⁻⁷ m. The unit must cancel in the denominator.

## Analogies

**Metric prefix ladder**: Build a ladder from nano (10⁻⁹) at the bottom to kilo (10³) at the top. Going up the ladder = dividing by 10 for each rung; going down = multiplying. The rung position determines the power.

## Demonstrations

**Demonstration 1 — Weighing the same object on three balances**
- Weigh a 5.000 g weight on (a) a top-loading balance (reads 5.0 g), (b) an analytical balance (reads 5.000 g), and (c) an incorrectly zeroed balance (reads 5.3 g every time). Classify each: (a) precise but low precision; (b) both; (c) precise but inaccurate. Connects directly to accuracy/precision and significant figures simultaneously.

**Demonstration 2 — Unit-factor method drill**
- Convert 1.27 × 10³ μm to km using unit factors, one step at a time on the board. Students track units through each cancellation. Errors are visible as uncancelled units.

## Discovery Questions

1. "A manufacturer claims their scale is accurate to ±0.1 g. What does that mean for a measurement of 3.7 g? For a measurement of 1000.0 g?" (Targets: absolute vs. relative uncertainty.)
2. "Why do scientists report measurements in scientific notation rather than simply writing the full number?" (Targets: significant figures, clarity about zeros, magnitude independence.)
3. "If you multiply 3.2 cm × 4.15 cm, how many significant figures should the answer have, and why?" (Targets: sig fig rules for multiplication; answer = 13 cm², 2 sig figs because 3.2 has 2.)

## Teaching Sequence

1. Review from chem.found.matter: measurements describe properties of matter. Introduce the question: "What makes a measurement trustworthy?"
2. Present SI base units (7 units, 3 most important for chemistry: kg, m, mol, K, A). Pair each with its measured quantity and an everyday example of magnitude.
3. Introduce the prefix system as a power-of-ten scale. Build the prefix ladder together.
4. Drill unit conversion using the unit-factor method. Three practice problems, increasing complexity (same prefix family → different family → across multiple steps).
5. Introduce accuracy vs. precision with the archery diagram. Present Demonstration 1 data and classify each balance.
6. Introduce significant figures: the three rules for counting, the two rules for calculating.
7. Introduce scientific notation: conversion drill with direction feedback.
8. Apply: express a given measurement in scientific notation with correct sig figs; classify a given dataset as accurate, precise, both, or neither.

## Tutor Actions

- If student confuses accuracy and precision → use archery diagram, then present a concrete dataset to classify.
- If student miscounts sig figs on zeros → apply the three-rule framework one rule at a time, starting with leading zeros (unambiguous case).
- If student makes unit conversion direction errors → switch to the unit-factor method; do not allow the "multiply or divide?" heuristic until the unit-factor method is secure.
- Advance when student correctly counts sig figs in five varied examples and converts units correctly using dimensional analysis.

## Voice Teaching Notes

"Accuracy" and "precision" must be used with exact meaning from the first utterance in a lesson on this topic. If you accidentally use them as synonyms in passing speech, retract immediately ("I said 'accurate' — I mean 'precise'"). Students absorb the teacher's own word use and will mirror imprecision.

The significant-figures rules have high working-memory load (three counting rules, two calculation rules). Introduce counting rules in one session; defer calculation rules to the session that introduces concentration or stoichiometry, where they arise naturally.

## Assessment Signals

**Mastery gate**:
1. Student converts 3 measurements between SI units using dimensional analysis, all correct.
2. Student correctly classifies a dataset as precise/accurate/both/neither using the archery framework.
3. Student counts significant figures correctly in 4 of 5 examples including at least one with leading zeros and one with trailing zeros after a decimal.

**FRAGILE signal**: student converts correctly within a single prefix family but fails when crossing from nm to km (two-step conversion). They have the rule for single steps but not the generalisation.

**MISCONCEIVING signal**: student identifies a precise dataset as "accurate because they're all the same number." This is MC-1 — the archery repair with a number that is clustered but wrong is the required intervention.

## Tutor Recovery Strategy

If stuck:
1. For accuracy/precision: use a concrete object with a known true value (e.g., a 10.00 g weight the student can see labelled). Measure it repeatedly (even just once) and ask: "Did we hit the target? Did we hit it consistently?" The physical object removes the abstraction.
2. For sig figs: reduce to the single most useful rule — "trailing zeros after a decimal point are always significant" — and master that alone before adding the other rules.
3. For unit conversion: use the full unit-factor method written out step by step; never allow mental arithmetic for units, only written cancellation.

## Memory Hooks

- **SI base units mnemonic**: "King Henry Died By Drinking Cold Milk" → kilo, hecto, deca, base, deci, centi, milli (prefix ladder mnemonic for the common range).
- **Accuracy/precision one-liner**: "Accurate = near the truth; precise = near each other."
- **Sig fig shortcut**: "If it's between two non-zero digits, it counts. Leading? No. Trailing after decimal? Yes. Trailing before decimal? Ambiguous — use sci notation."

## Transfer Connections

- **chem.found.significant-figures**: the next concept, which extends sig fig rules to multi-step calculations and explicit uncertainty propagation.
- **chem.found.mole-concept**: mole calculations are the first major arithmetic in chemistry; sig fig rules apply immediately.
- **chem.thermo.system**: temperature (Kelvin scale) and energy units (J, kJ) are the thermodynamic application of SI units.
- **chem.state.gas-laws**: pressure (Pa, atm, mmHg), volume (L, dm³, m³), and temperature (K) conversions are SI-unit skills applied quantitatively.

## Cross-Subject Connections

- **Mathematics (math.found.mathematical-thinking)**: unit analysis is dimensional reasoning — a form of algebraic tracking where units behave like variables. Cross-link to mathematical-language and notation.
- **Physics (phys.meas.units)**: physics and chemistry share the SI system entirely; this concept is identical to the physics measurement foundation concept.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.found.measurement`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23. Blueprint components informed: concept_summary ✓, common_misconceptions ✓, visual_teaching_suggestions ✓.

## Runtime Asset References

No AssetIdentity records seeded for `chem.found.measurement` as of 2026-07-23.

## Curriculum Feedback

None. The node's cross-link to `math.found.mathematical-thinking` is well-placed — unit analysis is mathematical reasoning applied to physical quantities.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
