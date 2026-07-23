# Acid–Base Theories — `chem.equil.acids-bases`

## Identity

- **KG ID**: chem.equil.acids-bases
- **Subject**: Chemistry
- **Domain**: Chemical Equilibrium (chem.equil)
- **Difficulty**: developing
- **Bloom level**: understand
- **Estimated hours**: 3
- **Mastery threshold**: 0.75
- **Prerequisites**: chem.equil.kw-ph
- **Unlocks**: chem.carb.carboxylic, chem.equil.weak-acid
- **Cross-links**: none

## Learning Objective

Students can state the Arrhenius, Brønsted–Lowry, and Lewis definitions of acids and bases; identify conjugate acid–base pairs; recognise amphoteric species; define Ka, Kb, and pKa; and apply the relationship Ka × Kb = Kw for conjugate pairs.

## Core Understanding

**Three theories — increasing generality**:

1. **Arrhenius** (narrowest): acid produces H⁺(aq) in water; base produces OH⁻(aq) in water. Limitation: applies only to aqueous solutions; cannot explain NH₃ as a base (produces no OH⁻ directly), or acid–base reactions in non-aqueous solvents.

2. **Brønsted–Lowry** (broader): acid is a proton (H⁺) donor; base is a proton acceptor. Every Brønsted–Lowry acid reaction creates a conjugate base; every Brønsted–Lowry base reaction creates a conjugate acid. The acid-base pair differing by one H⁺ is the conjugate pair. Example: HCl + H₂O → Cl⁻ + H₃O⁺; HCl and Cl⁻ are a conjugate acid–base pair; H₂O and H₃O⁺ are a conjugate acid–base pair. NH₃ + H₂O ⇌ NH₄⁺ + OH⁻; NH₃ is the base, NH₄⁺ is its conjugate acid.

3. **Lewis** (broadest): acid is an electron-pair acceptor; base is an electron-pair donor. Includes reactions with no proton transfer. Examples: BF₃ + :NH₃ → F₃B←NH₃ (BF₃ is Lewis acid, NH₃ Lewis base). Metal ions in coordination chemistry are Lewis acids (accept lone pairs from ligands). Every Brønsted–Lowry acid is also a Lewis acid; the reverse is not true.

**Conjugate pairs** (Brønsted–Lowry):
Acid ⇌ H⁺ + Conjugate base (conjugate base has one fewer H⁺)
Base + H⁺ ⇌ Conjugate acid (conjugate acid has one more H⁺)
Examples: HCO₃⁻/CO₃²⁻; H₂PO₄⁻/HPO₄²⁻; NH₄⁺/NH₃; H₂O/OH⁻

**Amphoteric species**: a species that can act as EITHER an acid or a base depending on the reaction partner.
- Water is amphoteric: H₂O donates H⁺ to NH₃ (acts as acid) and accepts H⁺ from HCl (acts as base).
- HCO₃⁻ is amphoteric: acts as acid → CO₃²⁻; acts as base → H₂CO₃.
- Amino acids (zwitterionic form) are amphoteric.

**Ka (acid dissociation constant)**:
For a weak acid HA ⇌ H⁺ + A⁻:
Ka = [H⁺][A⁻]/[HA]
pKa = −log Ka. Larger Ka (smaller pKa) → stronger acid (more dissociated at equilibrium).

**Kb (base dissociation constant)**:
For a weak base B + H₂O ⇌ BH⁺ + OH⁻:
Kb = [BH⁺][OH⁻]/[B]

**Conjugate pair relationship**:
Ka × Kb = Kw = 1.0 × 10⁻¹⁴ at 298 K
This means: strong acid → weak conjugate base; weak acid → strong(er) conjugate base.

**Strength ranking**:
- Strong acids (Ka → ∞, pKa << 0): complete dissociation. Conjugate bases are very weak (spectator ions in acid–base reactions).
- Weak acids (Ka in range 10⁻² to 10⁻¹²): partial dissociation. Conjugate bases are real bases.

## Mental Models

**The H⁺-transfer model for Brønsted–Lowry**: a Brønsted–Lowry acid–base reaction is always a proton-transfer: one species gives up H⁺, another catches it. Draw an arrow from the H⁺ donor to the H⁺ acceptor in every reaction. This makes the conjugate pair visible: donor and its product (minus H⁺) are the conjugate pair; acceptor and its product (plus H⁺) are the conjugate pair.

**The electron-pair donor/acceptor model for Lewis**: Lewis acids have an empty orbital or a positive centre; Lewis bases have a lone pair. The reaction is an arrow from the lone pair to the empty orbital. This unifies coordination chemistry (metal + ligand) with classical acid–base chemistry under one framework.

## Why Students Fail

1. **Arrhenius as the only definition**: students apply Arrhenius exclusively and cannot classify NH₃ as a base or BF₃ as an acid (no proton transfer, no OH⁻ produced).
2. **Conjugate pairs must differ by exactly one H⁺**: students pair H₂CO₃ with CO₃²⁻ (differ by 2 H⁺) as a conjugate pair, missing that HCO₃⁻ is the direct conjugate base of H₂CO₃.
3. **Stronger acid has larger pKa**: students confuse pKa with Ka — since pKa = −log Ka, a larger Ka gives a SMALLER (more negative) pKa. Stronger acid = smaller pKa.
4. **Amphoteric species can only be one thing**: students classify H₂O as "a base" because it accepts protons from acids, not recognising it can also donate.

## Misconceptions

**MC-1 — Conjugate pairs differ by two protons or by OH** (Type 1, overgeneralization/carelessness)
- *Mechanism*: students pick species in the same reaction without checking the exact H⁺ difference.
- *Diagnostic probe*: "In H₂SO₄ + H₂O → HSO₄⁻ + H₃O⁺, identify BOTH conjugate pairs."
- *Characteristic phrase*: "H₂SO₄ and SO₄²⁻ are a conjugate pair" (differ by 2 H⁺, not 1).
- *Repair*: H₂SO₄ → HSO₄⁻ (loses 1 H⁺): conjugate pair 1 = H₂SO₄/HSO₄⁻. H₂O → H₃O⁺ (gains 1 H⁺): conjugate pair 2 = H₂O/H₃O⁺. The rule: conjugate pairs differ by EXACTLY one H⁺. Never two H⁺, never OH.

**MC-2 — Stronger acid has higher pKa** (Type 4, notation-induced: "p" prefix implies larger = stronger)
- *Mechanism*: students see pKa as a "strength scale" and assume larger pKa = stronger acid, by analogy with "higher score = better."
- *Diagnostic probe*: "Acetic acid has pKa = 4.76. Hydrofluoric acid has pKa = 3.17. Which is the stronger acid?"
- *Characteristic phrase*: "Acetic acid is stronger because pKa 4.76 > 3.17."
- *Repair*: pKa = −log Ka. Larger Ka → smaller pKa. HF (pKa = 3.17) has Ka = 10⁻³·¹⁷ = 6.8 × 10⁻⁴; acetic acid (pKa = 4.76) has Ka = 10⁻⁴·⁷⁶ = 1.7 × 10⁻⁵. HF is 40× stronger. Lower pKa = stronger acid. Use the phrase: "pKa down, strength up."

**MC-3 — Arrhenius base must contain OH** (Type 5, instruction-induced: first theory taught defines base as OH⁻ source)
- *Mechanism*: students learn Arrhenius first and permanently associate "base" with hydroxide.
- *Diagnostic probe*: "Is NH₃ a base? Explain using Brønsted–Lowry theory."
- *Characteristic phrase*: "NH₃ is not a base because it contains no OH."
- *Repair*: Arrhenius is the narrowest theory. Brønsted–Lowry: NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ — NH₃ accepts a proton from H₂O → it is a Brønsted–Lowry base. The OH⁻ comes from water's donated proton, not from NH₃ itself. Lewis theory additionally includes BF₃, AlCl₃, and metal ions as Lewis acids — none contain protons at all.

## Analogies

**The H⁺ currency analogy**: protons (H⁺) are the currency in Brønsted–Lowry acid–base transactions. The acid is the payer (gives away H⁺), the base is the receiver. Every transaction generates two new entities: the depleted payer (conjugate base) and the enriched receiver (conjugate acid). The currency doesn't disappear; it just changes hands.

**The spectrum-of-theories analogy**: Arrhenius, Brønsted–Lowry, and Lewis are like zoom levels on a map. Arrhenius is street-level: highly detailed for water, can't see beyond city limits. Brønsted–Lowry is city-level: covers all proton transfers. Lewis is country-level: covers electron-pair chemistry, including reactions with no H⁺ at all. A city-level map still shows all the streets, and a country-level map still shows all cities. Each theory contains the previous as a special case.

## Demonstrations

**Demonstration 1 — Universal indicator with NH₃ and BF₃**
- Show NH₃(aq) turning universal indicator blue (basic). Ask: how does NH₃ produce OH⁻ with no OH in its formula? Derive NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ using Brønsted–Lowry. Then show the Arrhenius explanation fails (NH₃ has no OH) but Brønsted–Lowry succeeds. This distinguishes the two theories concretely.

## Discovery Questions

1. "For the reaction: HPO₄²⁻ + H₂O ⇌ H₂PO₄⁻ + OH⁻, identify the acid, base, conjugate acid, and conjugate base. Is HPO₄²⁻ amphoteric?" (Targets: HPO₄²⁻ is the base (accepts H⁺ from H₂O → H₂PO₄⁻ is its conjugate acid); H₂O is the acid (donates H⁺ → OH⁻ is its conjugate base). Yes — HPO₄²⁻ is amphoteric: it acts as a base here (HPO₄²⁻/H₂PO₄⁻ pair) and as an acid in HPO₄²⁻ ⇌ H⁺ + PO₄³⁻ (HPO₄²⁻/PO₄³⁻ pair).)
2. "The Ka of acetic acid (CH₃COOH) is 1.8 × 10⁻⁵. Calculate Kb for the acetate ion (CH₃COO⁻). Is acetate a stronger or weaker base than NH₃ (Kb of NH₃ = 1.8 × 10⁻⁵)?" (Targets: Kb = Kw/Ka = 1.0 × 10⁻¹⁴ / 1.8 × 10⁻⁵ = 5.6 × 10⁻¹⁰. Acetate Kb = 5.6 × 10⁻¹⁰ << NH₃ Kb = 1.8 × 10⁻⁵. NH₃ is a much stronger base than acetate — because acetic acid is a much weaker acid than NH₄⁺ (the conjugate acid of NH₃). Strong acid → weak conjugate base.)
3. "Identify the Lewis acid and Lewis base in: AlCl₃ + Cl⁻ → AlCl₄⁻. Does this reaction involve proton transfer?" (Targets: AlCl₃ is the Lewis acid (Al has an empty 3p orbital, accepts the electron pair). Cl⁻ is the Lewis base (lone pair donor). No proton transfer occurs. This reaction cannot be described by Arrhenius or Brønsted–Lowry theories — it requires the Lewis framework.)

## Teaching Sequence

1. Review from chem.equil.kw-ph: Kw; pH; strong vs. weak acid distinction; [H⁺][OH⁻] = 10⁻¹⁴.
2. Arrhenius definition: quick statement + examples (HCl, NaOH). Name the limitation: NH₃, non-aqueous.
3. Brønsted–Lowry: proton donor/acceptor. Identify conjugate pairs in 2–3 reactions. Address MC-1 (exactly one H⁺ difference).
4. Amphoteric species: water as prime example. HPO₄²⁻, HCO₃⁻.
5. Ka, Kb, pKa: definitions. Ka × Kb = Kw. Address MC-2 (lower pKa = stronger acid). Work Discovery Question 2.
6. Lewis theory: electron-pair donor/acceptor. Examples: BF₃, Al³⁺, metal ions. Address MC-3 (NH₃ as base via proton acceptance, not OH donation). Work Discovery Question 3.
7. Work Discovery Question 1 (amphoteric HPO₄²⁻).

## Tutor Actions

- If student misidentifies conjugate pairs (differ by ≠ 1 H⁺) → MC-1 repair: count protons; pairs differ by exactly one H⁺.
- If student says larger pKa = stronger acid → MC-2 repair: pKa = −log Ka; compute Ka for both pKa values; compare.
- If student denies NH₃ is a base (no OH) → MC-3 repair: Brønsted–Lowry proton-acceptance doesn't require OH; show NH₃ + H₂O mechanism.
- Advance when student can identify conjugate pairs, classify species as Arrhenius/Brønsted/Lewis acid or base, and apply Ka × Kb = Kw.

## Voice Teaching Notes

"Conjugate pairs: differ by one H⁺. One H⁺. Count every time." Before any conjugate-pair question, say this aloud.

"pKa down, strength up. pKa down, strength up." Repeat until the student echoes it back correctly before looking at any pKa table.

## Assessment Signals

**Mastery gate**:
1. Student correctly identifies conjugate pairs (exactly one H⁺ difference) in any Brønsted–Lowry reaction.
2. Student correctly classifies species under all three theories with examples of each theory's unique contribution.
3. Student correctly applies Ka × Kb = Kw for a conjugate pair.
4. Student correctly identifies amphoteric species and gives one reaction for each role.

**FRAGILE signal**: student correctly applies conjugate pairs but cannot explain WHY Ka × Kb = Kw (no derivation, only memorised formula).

**MISCONCEIVING signal**: student cannot classify NH₃ as a base. Address MC-3 before any Ka/Kb work.

## Tutor Recovery Strategy

If stuck:
1. For conjugate pairs: "Write the acid dissociation: HA → H⁺ + A⁻. The pair is HA/A⁻. That's one H⁺ difference. Now write H₂A → H⁺ + HA⁻. The pair is H₂A/HA⁻. What is the pair for HA⁻? HA⁻ → H⁺ + A²⁻. The pair is HA⁻/A²⁻. Never jump two steps."
2. For Ka × Kb = Kw: "Ka = [H⁺][A⁻]/[HA]. Kb = [HA][OH⁻]/[A⁻]. Multiply: Ka × Kb = [H⁺][OH⁻] = Kw. The [A⁻] and [HA] cancel. It's an algebraic identity — not a coincidence."
3. For Lewis acids: "Lewis acid needs to ACCEPT an electron pair. What does that require? An empty orbital. BF₃: boron has 3 bonds, 6 electrons, empty 2p orbital → Lewis acid. Metal ions: d-block or Al³⁺ with empty orbitals → Lewis acids."

## Memory Hooks

- **Arrhenius: H⁺ in water (acid) / OH⁻ in water (base). Narrow — aqueous only.**
- **Brønsted–Lowry: H⁺ donor (acid) / H⁺ acceptor (base). Conjugate pair: differ by 1 H⁺.**
- **Lewis: e⁻ pair acceptor (acid) / e⁻ pair donor (base). Broadest — includes BF₃, AlCl₃, metal ions.**
- **Ka × Kb = Kw. Strong acid ↔ weak conjugate base. pKa down = strength up.**
- **Amphoteric: can donate OR accept H⁺. Water and HCO₃⁻ are the key examples.**

## Transfer Connections

- **chem.equil.weak-acid**: the Ka and conjugate-pair framework from this node is the direct input to weak acid/base equilibrium calculations (ICE tables with Ka or Kb).
- **chem.carb.carboxylic**: carboxylic acids (−COOH) are Brønsted–Lowry weak acids whose acidity is rationalised from inductive and resonance effects on the conjugate base (carboxylate anion) — the Ka language from this node is the quantitative tool.

## Cross-Subject Connections

- **Biology (biochemistry)**: the Henderson-Hasselbalch equation pH = pKa + log([A⁻]/[HA]) — the master equation for buffer systems — is a direct rearrangement of the Ka expression. Blood buffering (carbonate, phosphate, protein buffers) and enzyme active-site chemistry are acid–base phenomena.
- **Organic chemistry**: nucleophiles are Lewis bases (electron-pair donors); electrophiles are Lewis acids (electron-pair acceptors). The entire framework of organic reactions (SN2, addition, acyl substitution) is Lewis acid–base chemistry with curly-arrow notation.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.equil.acids-bases`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23.

## Runtime Asset References

No AssetIdentity records seeded for `chem.equil.acids-bases` as of 2026-07-23.

## Curriculum Feedback

The three-theory progression (Arrhenius → Brønsted–Lowry → Lewis) correctly orders the concepts from narrow to broad. The 3-hour estimate is tight for this node given the three theories plus Ka/Kb/pKa — instructors should plan for 4 hours if students are encountering pKa for the first time. The Ka × Kb = Kw derivation (algebraic cancellation of Ka and Kb expressions) is the single most underexplained formula in acid–base chemistry and should be derived, not just stated, in every presentation.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
