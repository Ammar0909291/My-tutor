# Salt Hydrolysis — `chem.equil.hydrolysis`

## Identity
- **KG ID**: chem.equil.hydrolysis
- **Subject**: chemistry
- **Domain**: chem.equil
- **Difficulty**: proficient
- **Bloom level**: apply
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.equil.weak-acid
- **Unlocks**: (terminal node)

## Learning Objective
Predict whether a salt solution is acidic, basic, or neutral by identifying the parent acid and base, write the hydrolysis equation for the relevant ion, and calculate the pH of a salt solution using the Kh = Kw/Ka or Kh = Kw/Kb relationship.

## Core Understanding
Salt hydrolysis is the reaction of an ion from a dissolved salt with water to produce an acidic or basic solution. It is the reverse of neutralisation and is governed by the same equilibrium principles as weak-acid and weak-base ionisation.

**Classification of salts by parent acid and base**:

| Parent acid | Parent base | Example | Solution pH |
|---|---|---|---|
| Strong acid | Strong base | NaCl, KNO₃ | Neutral (7) |
| Weak acid | Strong base | CH₃COONa | Basic (>7) |
| Strong acid | Weak base | NH₄Cl | Acidic (<7) |
| Weak acid | Weak base | CH₃COONH₄ | Depends on Ka vs Kb |

**Mechanism for a basic salt (anion hydrolysis)**: the anion A⁻ (from weak acid HA) is a base and accepts a proton from water: A⁻ + H₂O ⇌ HA + OH⁻. The equilibrium constant for this reaction is Kh = [HA][OH⁻]/[A⁻]. Since Ka × Kb = Kw for any conjugate pair: Kh(anion) = Kw/Ka.

**Mechanism for an acidic salt (cation hydrolysis)**: the cation BH⁺ (from weak base B) is an acid and donates a proton to water: BH⁺ + H₂O ⇌ B + H₃O⁺. Kh(cation) = Kw/Kb.

**Strong acid/strong base salts (NaCl)**: Na⁺ is the conjugate acid of NaOH (strong base) — too weak to donate a proton; Cl⁻ is the conjugate base of HCl (strong acid) — too weak to accept a proton. Neither ion reacts with water; the solution is neutral.

**Degree of hydrolysis**: analogous to degree of dissociation for weak acids; h = [A⁻hydrolysed]/[A⁻initial]. For dilute solutions h = √(Kh/C₀); greater dilution → greater degree of hydrolysis (analogous to Ostwald's dilution law).

**Salt of weak acid and weak base (CH₃COONH₄)**: both ions hydrolyse. pH ≈ 7 + ½(pKa − pKb). If Ka = Kb, the solution is neutral. If Ka > Kb, the solution is slightly acidic; if Ka < Kb, slightly basic.

**pH calculation for a salt of weak acid and strong base**: use Kh = Kw/Ka, then treat the hydrolysis as a weak-base equilibrium: [OH⁻] = √(Kh × C₀), pOH = −log[OH⁻], pH = 14 − pOH (at 298 K). Example: 0.1 M CH₃COONa, Ka(CH₃COOH) = 1.8 × 10⁻⁵: Kh = 10⁻¹⁴/1.8×10⁻⁵ = 5.6×10⁻¹⁰; [OH⁻] = √(5.6×10⁻¹⁰ × 0.1) = 7.5×10⁻⁶; pOH = 5.12; pH = 8.88.

## Mental Models
**The parent test model**: every salt came from a neutralisation reaction. Ask: which acid made it? Which base made it? A weak parent leaves a reactive child: the anion of a weak acid is a reactive base (will hydrolyse to give OH⁻); the cation of a weak base is a reactive acid (will hydrolyse to give H₃O⁺). Strong parents leave inert children.

**The Kh inversion model**: Kh = Kw/Ka. A very weak acid (small Ka) leaves a strongly basic anion (large Kh); a stronger weak acid (larger Ka) leaves a less basic anion. The hydrolysis constant is the mirror image of the ionisation constant across the Kw pivot.

**The neutralisation reversal model**: salt hydrolysis is neutralisation run in reverse — the same equilibrium, same K (= Kw/Ka or Kw/Kb), just approached from the salt side instead of the acid/base side.

## Why Students Fail
Students apply the pH prediction by salt type correctly (rote classification) but fail when asked to calculate pH because they cannot connect Kh to the Ka and Kw values they know.

Students forget that strong acid/strong base salts give neutral solutions and instead guess that adding any ionic compound will change pH.

Students confuse which ion hydrolyses: they write NH₄⁺ hydrolysis as NH₃ + OH⁻ (a base reaction) instead of NH₄⁺ + H₂O → NH₃ + H₃O⁺ (an acid reaction), mixing up the direction.

## Misconceptions
- **MC-1 (Type 3 — language contamination)**: "Hydrolysis means the salt reacts with water and splits apart into its ions (dissolves)." Probe: "What is the difference between dissolving NaCl in water and CH₃COONa undergoing hydrolysis?" Characteristic phrase: "hydrolysis is just dissolving." Intervention: dissolving (dissociation into ions) and hydrolysis (reaction of an ion with water, changing [H⁺] or [OH⁻]) are two distinct processes; NaCl dissolves without hydrolysis (neutral solution); CH₃COONa dissolves AND the CH₃COO⁻ ion reacts with water.
- **MC-2 (Type 1 — overgeneralization)**: "All salts make the solution acidic." Probe: "What is the pH of 0.1 M KNO₃? Of 0.1 M Na₂CO₃?" Characteristic phrase: "salts are acidic." Intervention: salts can give acidic, neutral, or basic solutions depending on the parent acid and base; the phrase "acid salt" is misleading — it refers to a salt with an acidic cation, not all salts.
- **MC-3 (Type 4 — notation-induced)**: "Kh = Ka + Kb (or Ka/Kb)" rather than Kh = Kw/Ka. Probe: "What is the hydrolysis constant for the acetate ion if Ka = 1.8 × 10⁻⁵?" Characteristic phrase: "Ka and Kb add up." Intervention: for any conjugate acid-base pair, Ka × Kb = Kw (established in weak-acid entry); taking Kh = Kw/Ka is a direct consequence of the conjugate pair relationship.
- **MC-4 (Type 5 — instruction-induced)**: "NH₄Cl is basic because NH₃ is a base." Probe: "Which ion in NH₄Cl undergoes hydrolysis, and does it produce H₃O⁺ or OH⁻?" Intervention: NH₄Cl produces NH₄⁺ and Cl⁻; Cl⁻ does not hydrolyse (from strong acid HCl); NH₄⁺ is the conjugate ACID of NH₃ (weak base) and hydrolyses to give H₃O⁺ → acidic solution; the confusion arises from attributing the base character of NH₃ to the cation NH₄⁺ without recognising that NH₄⁺ is the acid in the conjugate pair.

## Analogies
**Valid**: Kh as a seesaw with Kw at the pivot: Ka × Kh = Kw, so as Ka increases (stronger weak acid), Kh decreases (weaker hydrolysing anion). The seesaw balances at Kw.

**Valid**: the parent–child analogy — a strong parent leaves an obedient (non-reactive) child; a weak parent leaves a reactive child that tries to undo the parent's neutralisation reaction.

**Anti-analogy**: Do NOT use the phrase "acid salt" to mean "a salt from an acid" — it has a technical meaning (a salt with a replaceable hydrogen, like NaHCO₃ or NaHSO₄) that students will confuse with "a salt that makes an acidic solution."

## Demonstrations
**pH paper comparison**: measure pH of 0.1 M solutions of NaCl, CH₃COONa, NH₄Cl, and CH₃COONH₄. The four results (≈7, ≈9, ≈5, ≈7) directly test the classification framework. Students predict before measuring, then reconcile discrepancies.

**Titration curve residue**: after a strong acid-weak base titration (HCl + NH₃ → NH₄Cl), point to the equivalence point pH on the curve (≈5 for NH₄Cl) — the equivalence point pH is acidic precisely because the product NH₄Cl hydrolyses. Connects hydrolysis to the titration content.

## Discovery Questions
1. "Why does a solution of Na₂CO₃ feel soapy and can clean grease from surfaces, even though it is a salt?"
2. "A student dissolves AlCl₃ in water and finds the solution unexpectedly acidic (pH ≈ 3). Al³⁺ is a small, highly charged cation. Explain this observation using hydrolysis. (Hint: Al³⁺ coordinates water molecules and acts as a Brønsted acid.)"
3. "For a salt of a weak acid and a weak base, how would you determine whether the solution is acidic, basic, or neutral without measuring pH?"

## Teaching Sequence
1. **Categorise salts from parent acid/base**: present four examples (NaCl, CH₃COONa, NH₄Cl, CH₃COONH₄); for each, identify parent acid and base, classify as strong/weak; predict pH qualitatively.
2. **Write the hydrolysis equation for CH₃COO⁻**: CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻; establish that this is the reverse of acetic acid ionisation; derive Kh = Kw/Ka from the conjugate pair relationship.
3. **Write the hydrolysis equation for NH₄⁺**: NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺; derive Kh = Kw/Kb.
4. **pH calculation — basic salt**: work through CH₃COONa numerically (see Core Understanding example).
5. **pH calculation — acidic salt**: work through NH₄Cl numerically using [H⁺] = √(Kh × C₀), pH = −log[H⁺].
6. **Strong/strong case**: confirm Na⁺ and Cl⁻ do not hydrolyse; pH = 7; explain why using conjugate pair strengths.
7. **Weak/weak salt (brief)**: introduce pH ≈ 7 + ½(pKa − pKb) formula; apply to CH₃COONH₄ where Ka ≈ Kb (both ≈ 10⁻⁵) → pH ≈ 7.

## Tutor Actions
- **If student misidentifies which ion hydrolyses**: return to the parent acid/base; ask "which ion came from the weak component?" — the ion from the weak acid is basic; the ion from the weak base is acidic; the ion from the strong partner does not hydrolyse.
- **If student cannot derive Kh**: return to Ka × Kb = Kw established in chem.equil.weak-acid; the hydrolysis equilibrium is the reverse of Ka, so Kh = Kw/Ka.
- **If student writes the hydrolysis equation in the wrong direction (makes OH⁻ from cation)**: use the Brønsted definition — identify which species is the proton donor; NH₄⁺ is the acid (proton donor) not the base.
- **FRAGILE sign**: correct pH calculations but incorrect pH predictions without calculations (e.g., claims NH₄Cl is basic). Run the verbal classification test separately from the numerical test.

## Voice Teaching Notes
Latency is longest on "which ion hydrolyses" — students must recall the parent acid/base classification before they can answer; allow 10+ seconds before hinting.

The word "hydrolysis" triggers word-association confusion with "dissolving" — establish the distinction explicitly in the first mention; do not allow both words to be used interchangeably in conversation.

For younger students, the parent–child metaphor works well orally: "a weak parent leaves a reactive child that tries to fight back against the neutral water." For adult learners, the equilibrium reversal model (hydrolysis = reverse of neutralisation) is more immediate.

## Assessment Signals
- **Green**: correctly classifies a given salt as acidic/basic/neutral and calculates pH using Kh = Kw/Ka or Kw/Kb; correctly writes the hydrolysis equilibrium expression.
- **Amber**: correct classification but incorrect calculation (often inverts Kh formula or confuses pH and pOH).
- **Red**: classifies all salts as acidic; confuses hydrolysis with dissolution; writes the wrong ion hydrolyzing.
- **Probe**: "Calculate the pH of 0.05 M NH₄Cl solution. Kb(NH₃) = 1.8 × 10⁻⁵." (Expected: Kh = 10⁻¹⁴/1.8×10⁻⁵ = 5.56×10⁻¹⁰; [H⁺] = √(5.56×10⁻¹⁰ × 0.05) = 5.27×10⁻⁶; pH = 5.28.)

## Tutor Recovery Strategy
If the student cannot connect Kh to Ka/Kw: reset to the Ka expression for acetic acid ionisation (CH₃COOH ⇌ CH₃COO⁻ + H⁺; Ka = [CH₃COO⁻][H⁺]/[CH₃COOH]); write the hydrolysis equation below it (CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻); ask "how are these two equilibria related?" — the second is the reverse of the first plus the autoionisation of water. The product Ka × Kh = Kw follows directly. Avoid re-teaching the formula without the derivation step; the derivation is where the understanding lives.

## Memory Hooks
- **Classification shortcut**: "Weak acid, strong base → basic. Strong acid, weak base → acidic. Strong+strong → neutral. Weak+weak → it depends (compare Ka and Kb)."
- **Kh formula**: "Kh equals Kw over Ka (for the anion) or Kw over Kb (for the cation)." The h and a/b in the subscripts match: Kh(anion) with Ka; Kh(cation) with Kb.
- **Sign of pH shift**: "The weak one wins — weak acid parent leaves basic solution; weak base parent leaves acidic solution."

## Transfer Connections
- **chem.equil.titration**: the equivalence point pH in weak acid–strong base (or strong acid–weak base) titrations is determined by the hydrolysis of the resulting salt ion.
- **chem.equil.buffer**: buffer solutions rely on the coexistence of a weak acid and its conjugate base — the same conjugate pair relationship that governs hydrolysis.

## Cross-Subject Connections
- **Biology (enzyme environment)**: cells maintain slightly basic cytoplasm (~pH 7.2) using phosphate and protein buffers; the buffering relies on the same weak-acid conjugate-base equilibria as salt hydrolysis.
- **Everyday chemistry**: soap cleaning action (Na₂CO₃, Na₃PO₄ as cleaning agents), baking soda (NaHCO₃ basic solution), and the bitter taste of coffee (CO₂ dissolved → carbonic acid) all involve salt hydrolysis concepts.

## Blueprint References
Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.equil.hydrolysis`. Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References
No AssetIdentity records seeded for `chem.equil.hydrolysis` as of 2026-07-23.

## Curriculum Feedback
None. Prerequisite (chem.equil.weak-acid) is appropriate; hydrolysis requires established Ka/Kb equilibrium facility.

## Version History
- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
