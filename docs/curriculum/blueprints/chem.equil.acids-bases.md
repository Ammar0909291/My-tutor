# chem.equil.acids-bases — Acid-Base Theories

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.equil.acids-bases` |
| Domain | Equilibrium |
| Requires | `chem.equil.kw-ph` |
| Unlocks | `chem.carb.carboxylic`, `chem.equil.weak-acid` |
| Difficulty | developing |
| Bloom Level | understand |
| Mastery Threshold | 0.75 |
| Estimated Hours | 3 |

## 1. Concept Spine

Three progressively broader acid-base theories coexist: Arrhenius (acids produce H⁺, bases produce OH⁻ in water — narrowest scope), Brønsted-Lowry (acids donate protons, bases accept protons — explains species like NH₃ as bases despite containing no OH), and Lewis (acids accept electron pairs, bases donate electron pairs — broadest, includes species like BF₃ and metal ions that contain no protons at all); conjugate acid-base pairs differ by EXACTLY one proton (never two, never an OH group); and pKa (=−log Ka) is an inverted strength scale — a LOWER pKa means a stronger acid (larger Ka), the opposite of an intuitive "bigger number = stronger" reading.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Testing whether NH₃ is a base by asking whether it accepts a proton from water (NH₃+H₂O⇌NH₄⁺+OH⁻) rather than checking whether NH₃ itself contains an OH group.

**Representational**: A conjugate-pair diagram for H₂SO₄+H₂O→HSO₄⁻+H₃O⁺, with two separate arrows explicitly marking the two distinct one-proton-difference conjugate pairs.

**Abstract**: The nested-scope relationship among the three theories (Arrhenius ⊂ Brønsted-Lowry ⊂ Lewis, each broader than the last); the inverse pKa-strength relationship (pKa=−log Ka).

**Transfer**: Given an unfamiliar species, correctly classifying it as an acid or base under the broadest applicable theory (even when it fits none of the narrower definitions), correctly identifying its conjugate partner (exactly one proton different), and correctly ranking acid strength using pKa (lower = stronger).

## 3. Why Beginners Fail

Students select conjugate-pair partners carelessly from within the same reaction without verifying the exact proton difference, sometimes pairing species that differ by two protons or by a hydroxide group rather than exactly one proton; they assume, by analogy with "higher score = better," that a larger pKa value indicates a stronger acid, missing that pKa is logarithmically inverted relative to Ka (larger Ka = smaller pKa = stronger acid); and they remain anchored to the first (Arrhenius) theory learned, requiring a base to literally contain an OH group, missing that Brønsted-Lowry and Lewis theories correctly and more broadly classify species like NH₃ (no OH, but accepts a proton) as bases too.

## 4. Misconception Library

### MC-1: Conjugate pairs differ by two protons or by OH
- **Probe**: "In H₂SO₄ + H₂O → HSO₄⁻ + H₃O⁺, identify BOTH conjugate pairs."
- **Characteristic phrase**: "H₂SO₄ and SO₄²⁻ are a conjugate pair" (differ by 2 H⁺, not 1).
- **Trigger (Type 1, overgeneralization/carelessness)**: Students pick species present in the same overall reaction without carefully verifying the exact proton-count difference between them, sometimes pairing species that happen to appear together but differ by more than one proton.
- **Conflict evidence [P28]**: The correct conjugate pairs in H₂SO₄+H₂O→HSO₄⁻+H₃O⁺ are H₂SO₄/HSO₄⁻ (H₂SO₄ loses exactly 1 H⁺ to become HSO₄⁻) and H₂O/H₃O⁺ (H₂O gains exactly 1 H⁺ to become H₃O⁺) — H₂SO₄ and SO₄²⁻ differ by TWO protons, not one, and are therefore never a valid conjugate pair regardless of both appearing in related acid-dissociation contexts.
- **Bridge [P30]**: A conjugate acid-base pair is defined by a strict, exact one-proton difference — species that differ by any other amount (two protons, or by an OH group rather than an H⁺) are simply not conjugate pairs, no matter how closely related they appear in a broader reaction sequence.
- **Replacement [P31]**: Conjugate pairs differ by EXACTLY one proton (H⁺) — never two, never a hydroxide group — always verify this exact difference before naming a conjugate pair.
- **Discrimination pairs [P33]**: H₂SO₄/HSO₄⁻ (differ by exactly 1 H⁺, valid conjugate pair) vs. H₂SO₄/SO₄²⁻ (differ by 2 H⁺, NOT a valid conjugate pair, despite both being related sulfuric-acid species).
- **S6 repair path**: Have the student count the exact number of protons differing between two candidate species before confirming any conjugate-pair assignment.

### MC-2: Stronger acid has higher pKa
- **Probe**: "Acetic acid has pKa = 4.76. Hydrofluoric acid has pKa = 3.17. Which is the stronger acid?"
- **Characteristic phrase**: "Acetic acid is stronger because pKa 4.76 > 3.17."
- **Trigger (Type 4, notation-induced)**: The "p" prefix and the general habit of reading "higher number = stronger/better" from everyday scoring contexts leads students to assume a larger pKa directly indicates a stronger acid.
- **Conflict evidence [P28]**: pKa=−log Ka means a LARGER Ka (genuinely stronger acid) produces a SMALLER pKa — computing directly: HF (pKa=3.17) has Ka=10^(−3.17)≈6.8×10⁻⁴, while acetic acid (pKa=4.76) has Ka=10^(−4.76)≈1.7×10⁻⁵, making HF roughly 40 times STRONGER than acetic acid, despite HF's pKa number being smaller (not larger).
- **Bridge [P30]**: The "p" prefix (as in pH, pKa, pOH) always denotes "−log of," which inherently inverts the underlying quantity's ordering — a genuinely larger underlying value (Ka, or [H⁺]) always corresponds to a genuinely SMALLER "p" value, exactly the opposite of an intuitive "bigger p-number = more of the property" reading.
- **Replacement [P31]**: Lower pKa means stronger acid (larger Ka); use the mnemonic "pKa down, strength up" to counter the intuitive-but-wrong "bigger number = stronger" reading.
- **Discrimination pairs [P33]**: HF (pKa=3.17, smaller pKa, actually STRONGER acid) vs. acetic acid (pKa=4.76, larger pKa, actually WEAKER acid) — the numerically smaller pKa corresponds to the stronger acid.
- **S6 repair path**: Compute Ka explicitly from both pKa values and compare the actual Ka magnitudes directly, bypassing the pKa-number intuition entirely.

### MC-3: Arrhenius base must contain OH
- **Probe**: "Is NH₃ a base? Explain using Brønsted-Lowry theory."
- **Characteristic phrase**: "NH₃ is not a base because it contains no OH."
- **Trigger (Type 5, instruction-induced)**: Arrhenius theory, typically taught first, defines a base strictly as a hydroxide-producing species, and students permanently anchor "base" to "contains OH" without updating this definition when broader theories are introduced.
- **Conflict evidence [P28]**: Under Brønsted-Lowry theory, NH₃+H₂O⇌NH₄⁺+OH⁻ shows NH₃ accepting a proton FROM water — this proton-accepting behavior is exactly what defines a Brønsted-Lowry base, and NH₃ genuinely qualifies as one, even though the OH⁻ that appears in the equation comes from water losing its proton, not from any OH group originally present in NH₃ itself; Lewis theory extends the definition even further, classifying species like BF₃, AlCl₃, and various metal ions as Lewis acids despite containing no protons at all.
- **Bridge [P30]**: Arrhenius theory is the NARROWEST of the three acid-base theories, correctly describing a specific subset of bases (those that directly release OH⁻ in water) but incorrectly excluding genuinely base-like species (like NH₃) whose base behavior operates through a different, broader mechanism (proton acceptance) that Arrhenius theory simply doesn't capture.
- **Replacement [P31]**: Whether a species counts as a "base" depends on which theory is being applied — NH₃ fails the narrow Arrhenius test (no OH group) but genuinely passes the broader Brønsted-Lowry test (accepts a proton) and the even broader Lewis test (donates an electron pair).
- **Discrimination pairs [P33]**: NaOH (a base under all three theories — Arrhenius, Brønsted-Lowry, and Lewis) vs. NH₃ (fails Arrhenius, but genuinely a base under Brønsted-Lowry and Lewis).
- **S6 repair path**: Walk through the NH₃+H₂O reaction explicitly, showing the proton transfer FROM water TO NH₃, establishing NH₃'s Brønsted-Lowry base status directly from that mechanism.

## 5. Explanation Library

**Primary explanation**: Three acid-base theories exist at progressively broader scope: Arrhenius (narrowest — acids/bases defined by producing H⁺/OH⁻ specifically in water), Brønsted-Lowry (broader — acids donate protons, bases accept protons, regardless of solvent or whether OH is directly involved), and Lewis (broadest — acids accept electron pairs, bases donate electron pairs, encompassing species with no protons at all, like BF₃). A species can fail a narrower theory's test while genuinely satisfying a broader one — NH₃ is the classic example, failing Arrhenius but passing both Brønsted-Lowry and Lewis.

**Secondary explanation (conjugate pairs and pKa framing)**: Conjugate acid-base pairs are defined by an exact, single-proton difference — never two protons, never an OH-based difference. Acid strength is measured by pKa=−log Ka, an inherently inverted scale where a numerically SMALLER pKa indicates a genuinely STRONGER acid (larger Ka), directly opposite to an intuitive "bigger number is stronger" reading.

## 6. Analogy Library

- **Primary analogy**: A set of increasingly generous membership criteria for a club (Arrhenius → Brønsted-Lowry → Lewis) — the narrowest club (Arrhenius) only admits members with one very specific credential (produces OH⁻ in water), while broader clubs (Brønsted-Lowry, then Lewis) admit anyone satisfying a more general underlying behavior (accepting a proton, or donating an electron pair), even if they lack the narrow club's specific credential.
- **Breaking point**: The nested-club analogy conveys the theory-scope hierarchy well but doesn't naturally capture the pKa inversion or the exact-one-proton conjugate-pair rule — those need the explicit logarithmic and stoichiometric arguments.
- **Anti-analogy**: Do NOT say "bigger pKa means stronger acid, just like a bigger score" — this directly reinforces MC-2.

## 7. Demonstration Library

- **Demonstration 1 (conjugate-pair proton-counting drill)**: Present several multi-proton acid reactions (like H₂SO₄'s) and have students explicitly count proton differences before confirming any conjugate-pair assignment.
- **Demonstration 2 (pKa-to-Ka computation comparison)**: Compute Ka explicitly from the given HF and acetic acid pKa values, comparing the actual numeric Ka magnitudes to resolve which acid is genuinely stronger.

## 8. Discovery Lesson

**Opening**: "NH₃ has no OH group anywhere in its formula. Does that automatically mean it can't be a base?"

**Exploration**: Students work through the NH₃+H₂O reaction, tracking exactly where the proton transfer occurs and where the resulting OH⁻ actually comes from.

**Synthesis**: Guide toward: NH₃'s base behavior comes from accepting a proton (Brønsted-Lowry), not from containing OH itself (the narrower Arrhenius requirement) — different theories capture different underlying mechanisms.

**Closure**: "If acetic acid's pKa is bigger than HF's, does that mean acetic acid is the stronger acid?" (Directly resolves MC-2.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the NH₃+H₂O proton-transfer mechanism explicitly, tracing the OH⁻'s actual origin.
- **TA-2 (TELL)**: State the pKa inversion rule explicitly ("pKa down, strength up"), immediately followed by the explicit Ka computation for HF and acetic acid.
- **TA-3 (DO)**: Student identifies both conjugate pairs in a multi-proton acid reaction, verifying the exact one-proton difference for each.
- **TA-4 (TEST-THINKING)**: Present MC-3's NH₃ probe and ask the student to classify it under all three theories, identifying where each theory succeeds or fails.

## 10. Voice Teaching

Whenever pKa is compared between two acids, verbally state "pKa down, strength up" before naming which acid is stronger, to preempt MC-2's intuitive-but-wrong reading. Whenever a species' base/acid status is questioned, ask "which theory are we using?" as the first diagnostic question, since the answer can genuinely differ across Arrhenius, Brønsted-Lowry, and Lewis.

## 11. Assessment

**Mastery gate**: Student can (a) correctly identify conjugate pairs verified by an exact one-proton difference, (b) correctly rank acid strength using pKa's inverted scale, (c) correctly classify a species like NH₃ as a base under the appropriate broader theory even when it fails the narrower Arrhenius definition.

- **FA-1**: "In H₂SO₄ + H₂O → HSO₄⁻ + H₃O⁺, identify BOTH conjugate pairs." — targets MC-1.
- **FA-2**: "Acetic acid has pKa=4.76, HF has pKa=3.17. Which is stronger?" — targets MC-2.
- **FA-3**: "Is NH₃ a base? Explain using Brønsted-Lowry theory." — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-2 among students encountering the pKa scale for the first time, since the inversion runs against strong prior "bigger = more/stronger" intuition.

**Delayed retrieval**: Re-probe MC-2's pKa inversion before `chem.equil.weak-acid` requires fluent, correctly-directioned pKa comparisons for weak-acid equilibrium calculations.

## 12. Recovery Notes

- **S3 (stuck)**: For conjugate-pair confusion, have the student explicitly write out and count the protons on each candidate species before pairing them.
- **S4 (frustrated)**: Normalize — the "bigger number = stronger" intuition is a deeply ingrained pattern from countless other numeric-scale contexts, making pKa's inversion a very common, expected trap.
- **S6 (collision)**: Use the explicit Ka computation for MC-2; use the NH₃+H₂O mechanism walkthrough for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why NH₃ genuinely counts as a base despite containing no OH group.

## 13. Memory & Review

Tag as a procedural-verification memory (exact one-proton conjugate-pair check) plus a scale-inversion memory (pKa vs. strength) plus a conceptual-correction memory (theory-scope hierarchy). Schedule a spaced check at ~1 week and again before `chem.equil.weak-acid`.

## 14. Transfer Map

Feeds directly into `chem.carb.carboxylic` (carboxylic acid chemistry directly applies acid-base theory and pKa reasoning) and `chem.equil.weak-acid` (weak-acid equilibrium calculations require fluent, correctly-directioned Ka/pKa reasoning established here).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
