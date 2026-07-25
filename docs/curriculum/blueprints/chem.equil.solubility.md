# chem.equil.solubility — Solubility Product and Precipitation

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.equil.solubility` |
| Domain | Equilibrium |
| Requires | `chem.equil.kc-kp` |
| Unlocks | `chem.anal.gravimetric` |
| Difficulty | proficient |
| Bloom Level | apply |
| Mastery Threshold | 0.8 |
| Estimated Hours | 4 |

## 1. Concept Spine

A larger Ksp does NOT always mean greater molar solubility — this comparison is only valid within the SAME formula stoichiometry type, since the mathematical relationship between Ksp and molar solubility s differs by formula type (s=√Ksp for 1:1 salts like AgCl, but s=(Ksp/4)^(1/3) for 2:1 salts like Ag₂CrO₄, so a salt with a smaller Ksp can genuinely have GREATER molar solubility if it has a different stoichiometric formula type); the Ksp expression must correctly reflect stoichiometric coefficients as exponents on ion concentrations DERIVED FROM s using the balanced dissolution equation (Ag₂CrO₄→2Ag⁺+CrO₄²⁻ gives [Ag⁺]=2s, not s, so Ksp=(2s)²(s)=4s³, not s²); and the reaction quotient Q_sp for predicting precipitation must be computed using concentrations IMMEDIATELY AFTER MIXING (before any reaction/equilibration occurs), never using post-equilibrium concentrations, since Q_sp's entire purpose is comparing the just-mixed state against the saturation threshold (Ksp) to predict whether precipitation will occur at all.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Comparing AgCl's Ksp (1.8×10⁻¹⁰) against Ag₂CrO₄'s Ksp (1.1×10⁻¹²) and computing each compound's actual molar solubility, discovering Ag₂CrO₄ (smaller Ksp) is genuinely MORE soluble.

**Representational**: A side-by-side ICE-table-style setup for AgCl (1:1 dissolution) versus Ag₂CrO₄ (2:1 dissolution), explicitly showing [Ag⁺]=s for the former but [Ag⁺]=2s for the latter.

**Abstract**: The general principle that Ksp-to-solubility conversion formulas differ by stoichiometric type, making direct Ksp comparison invalid across different formula types; the timing rule that Q_sp uses just-mixed (pre-equilibrium) concentrations specifically.

**Transfer**: Given an unfamiliar salt's Ksp and formula stoichiometry, correctly deriving its molar solubility using the correct stoichiometry-specific formula, correctly comparing solubility across compounds of different formula types (never by raw Ksp alone), and correctly computing Q_sp using just-mixed concentrations to predict precipitation.

## 3. Why Beginners Fail

Students assume Ksp is a direct, universal measure of solubility (larger Ksp always meaning more soluble), missing that this comparison is only mathematically valid within the same stoichiometric formula type, since the Ksp-to-s conversion formula genuinely differs (s=√Ksp for 1:1 salts versus s=(Ksp/4)^(1/3) for 2:1 salts, among other stoichiometries); they apply the 1:1-salt template ([cation]=s, [anion]=s) to salts with different stoichiometry, incorrectly writing Ksp=s² for a 2:1 salt like Ag₂CrO₄ instead of correctly deriving [Ag⁺]=2s from the balanced dissolution equation, giving Ksp=4s³; and they compute Q_sp using post-equilibrium (already-reacted) concentrations rather than the concentrations immediately after mixing (before any reaction), missing that Q_sp's specific purpose is testing the just-mixed state against the saturation threshold to predict whether precipitation will occur at all.

## 4. Misconception Library

### MC-1: Larger Ksp always means greater molar solubility
- **Probe**: "AgCl has Ksp = 1.8 × 10⁻¹⁰. Ag₂CrO₄ has Ksp = 1.1 × 10⁻¹². Which has the greater molar solubility?"
- **Characteristic phrase**: "AgCl is more soluble because its Ksp is larger."
- **Trigger (Type 1, overgeneralization to different formula types)**: Students see Ksp as a direct, single-number measure of "how soluble" a compound is, and generalize the intuitive "bigger number means more" reading across all compounds without checking whether their stoichiometric formula types actually match.
- **Conflict evidence [P28]**: Converting both to molar solubility s explicitly: for AgCl (1:1 dissolution), s=√Ksp=√(1.8×10⁻¹⁰)=1.34×10⁻⁵ M; for Ag₂CrO₄ (2:1 dissolution, Ksp=4s³), s=(Ksp/4)^(1/3)=(2.75×10⁻¹³)^(1/3)=6.5×10⁻⁵ M — Ag₂CrO₄ is genuinely MORE soluble (6.5×10⁻⁵ M > 1.34×10⁻⁵ M) despite having the SMALLER Ksp value, directly contradicting the naive larger-Ksp-means-more-soluble assumption.
- **Bridge [P30]**: The Ksp-to-molar-solubility relationship depends mathematically on the specific stoichiometric formula type — a 1:1 salt's Ksp scales as s² while a 2:1 salt's Ksp scales as 4s³, meaning the SAME numeric Ksp value corresponds to very different actual solubilities depending on which formula type is involved, so direct Ksp comparison is only valid WITHIN the same formula type.
- **Replacement [P31]**: Always convert Ksp to actual molar solubility using the correct stoichiometry-specific formula before comparing solubility across compounds of different formula types — never compare raw Ksp values directly unless the formula types genuinely match.
- **Discrimination pairs [P33]**: AgCl (1:1 type, larger Ksp=1.8×10⁻¹⁰, but smaller molar solubility=1.34×10⁻⁵ M) vs. Ag₂CrO₄ (2:1 type, smaller Ksp=1.1×10⁻¹², but larger molar solubility=6.5×10⁻⁵ M) — the direct proof that Ksp alone doesn't predict solubility across different formula types.
- **S6 repair path**: Compute both compounds' actual molar solubilities explicitly using their correct stoichiometry-specific formulas, showing the genuine, counterintuitive ranking.

### MC-2: [Ag⁺] = s in the Ksp for Ag₂CrO₄
- **Probe**: "Write the Ksp expression for Ag₂CrO₄ and express Ksp in terms of s."
- **Characteristic phrase**: "Ksp = s × s = s² (for Ag₂CrO₄)."
- **Trigger (Type 5, instruction-induced from 1:1 salt template)**: Students first learn Ksp problems using 1:1 salts like AgCl (where [Ag⁺]=s and [Cl⁻]=s genuinely both hold), and directly apply this same template to salts with different stoichiometry without adjusting for the actual balanced equation.
- **Conflict evidence [P28]**: Ag₂CrO₄'s dissolution equation is Ag₂CrO₄→2Ag⁺+CrO₄²⁻ — for each formula unit that dissolves (s mol/L), TWO moles of Ag⁺ are released for every ONE mole of CrO₄²⁻, so [Ag⁺]=2s (not s) while [CrO₄²⁻]=s; the correct Ksp expression is therefore Ksp=[Ag⁺]²[CrO₄²⁻]=(2s)²(s)=4s³, genuinely different from the naive s² that direct copying from the 1:1 template would produce.
- **Bridge [P30]**: The relationship between s (moles of compound dissolved) and each individual ion's resulting concentration MUST be derived from the specific balanced dissolution equation's stoichiometric coefficients — this relationship is NOT universal across all salts, and blindly reusing the 1:1-salt pattern for a differently-stoichiometric salt produces a genuinely incorrect Ksp expression.
- **Replacement [P31]**: Always derive each ion's concentration from s using the SPECIFIC balanced dissolution equation's stoichiometric coefficients — for Ag₂CrO₄, [Ag⁺]=2s and [CrO₄²⁻]=s, giving Ksp=4s³, never simply s².
- **Discrimination pairs [P33]**: AgCl's Ksp=s² (1:1 stoichiometry, [Ag⁺]=s, [Cl⁻]=s) vs. Ag₂CrO₄'s Ksp=4s³ (2:1 stoichiometry, [Ag⁺]=2s, [CrO₄²⁻]=s) — genuinely different formulas from genuinely different stoichiometries.
- **S6 repair path**: Write out the balanced dissolution equation explicitly first, deriving each ion's concentration in terms of s from the coefficients, before writing the Ksp expression.

### MC-3: Q_sp is computed using post-equilibrium concentrations
- **Probe**: "50 mL of 2.0 × 10⁻⁴ M AgNO₃ is mixed with 50 mL of 2.0 × 10⁻⁴ M NaCl. Will a precipitate form? (Ksp(AgCl) = 1.8 × 10⁻¹⁰)"
- **Characteristic phrase**: "I calculated the equilibrium concentrations first, then checked if Q > Ksp."
- **Trigger (Type 5, instruction-induced confusion between Q and K)**: Students have learned that Q=K at equilibrium and, applying this timing loosely, mistakenly compute Q using concentrations AFTER the system has already re-equilibrated, rather than the concentrations that existed the instant the solutions were mixed.
- **Conflict evidence [P28]**: Q_sp must be computed using concentrations IMMEDIATELY AFTER MIXING, before any reaction/precipitation has occurred — after mixing (accounting for the 2× dilution from combining equal volumes), [Ag⁺]=[Cl⁻]=1.0×10⁻⁴ M; Q_sp=(1.0×10⁻⁴)²=1.0×10⁻⁸, and since Q_sp(1.0×10⁻⁸) > Ksp(1.8×10⁻¹⁰), a precipitate genuinely DOES form; computing Q using post-equilibrium concentrations instead would be circular and meaningless, since the whole point of Q_sp is testing whether the JUST-MIXED state exceeds the saturation threshold in the first place.
- **Bridge [P30]**: Q_sp answers the specific question "does the solution, at the moment of mixing, already contain more dissolved ions than a saturated solution could hold?" — this question is only meaningful when evaluated at the just-mixed instant, before any precipitation has had a chance to reduce the ion concentrations back toward equilibrium.
- **Replacement [P31]**: Always compute Q_sp using the concentrations that exist immediately after mixing (accounting for dilution from combining volumes), never using concentrations after the system has re-equilibrated.
- **Discrimination pairs [P33]**: Just-mixed concentrations (correct input for Q_sp, 1.0×10⁻⁴ M each after dilution) vs. hypothetical post-equilibrium concentrations (incorrect, circular input that defeats the purpose of the Q_sp test).
- **S6 repair path**: Explicitly compute the diluted, just-mixed concentrations first (accounting for volume combination) before writing the Q_sp expression, making the timing requirement concrete.

## 5. Explanation Library

**Primary explanation**: Ksp and molar solubility (s) are related by a formula that depends on the specific stoichiometric type of the dissolving salt — for a 1:1 salt (Ksp=s²), for a 2:1 salt like Ag₂CrO₄ (Ksp=4s³, since [Ag⁺]=2s), and so on for other stoichiometries. This means direct comparison of raw Ksp values across compounds of DIFFERENT formula types can be genuinely misleading — the compound with the smaller Ksp can actually be more soluble, depending on how the stoichiometry translates Ksp into s.

**Secondary explanation (Q_sp timing framing)**: To predict whether mixing two solutions will cause precipitation, compute Q_sp using the concentrations that exist IMMEDIATELY after mixing (accounting for dilution from combining volumes, before any reaction occurs) and compare against Ksp — if Q_sp exceeds Ksp, the solution is momentarily "over-saturated" relative to equilibrium, and precipitation will occur to bring the system back down to Q_sp=Ksp; using post-equilibrium concentrations for this comparison is circular and defeats the entire purpose of the test.

## 6. Analogy Library

- **Primary analogy**: Two different-sized containers with different fill-level formulas — a cylindrical container's "how full" measurement (Ksp) translates to actual volume (solubility) differently than a cone-shaped container's does, even if both containers show the SAME raw fill-level number — you can't directly compare "fill level" numbers across differently-shaped containers without accounting for each container's specific geometry (stoichiometry).
- **Breaking point**: The differently-shaped-container analogy conveys the formula-type-dependence issue well but doesn't naturally capture the Q_sp timing requirement — that needs the explicit just-mixed-versus-equilibrium argument.
- **Anti-analogy**: Do NOT say "larger Ksp always means more soluble" — this directly reinforces MC-1.

## 7. Demonstration Library

- **Demonstration 1 (AgCl-vs-Ag₂CrO₄ solubility computation)**: Compute actual molar solubility explicitly for both compounds using their correct stoichiometry-specific formulas, showing the counterintuitive ranking (smaller Ksp, greater solubility).
- **Demonstration 2 (Q_sp just-mixed computation drill)**: Work through the explicit dilution-then-Q_sp calculation for the AgNO₃/NaCl mixing scenario, emphasizing the "immediately after mixing" timing requirement.

## 8. Discovery Lesson

**Opening**: "AgCl has a Ksp about 160 times larger than Ag₂CrO₄'s. Does that mean AgCl is definitely more soluble?"

**Exploration**: Students compute actual molar solubility for both compounds using their correct stoichiometry-specific formulas, discovering Ag₂CrO₄ is actually more soluble despite its smaller Ksp.

**Synthesis**: Guide toward: Ksp-to-solubility conversion depends on stoichiometric formula type, making direct Ksp comparison across different types unreliable.

**Closure**: "When you mix two solutions to test for precipitation, should you use the concentrations right after mixing, or after the system settles?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit AgCl-vs-Ag₂CrO₄ molar solubility computation, showing the counterintuitive ranking.
- **TA-2 (TELL)**: State the stoichiometry-derived-ion-concentration rule explicitly, worked through for Ag₂CrO₄'s [Ag⁺]=2s.
- **TA-3 (DO)**: Student computes Q_sp for a new mixing scenario using correctly-diluted, just-mixed concentrations.
- **TA-4 (TEST-THINKING)**: Present MC-1's AgCl-vs-Ag₂CrO₄ probe and ask the student to justify which is more soluble using computed s values, not raw Ksp.

## 10. Voice Teaching

Whenever comparing solubility across two compounds, ask "are these the same stoichiometric formula type?" before comparing Ksp values directly. Whenever Q_sp is computed, narrate "immediately after mixing, before any reaction" explicitly every time, to preempt the timing confusion.

## 11. Assessment

**Mastery gate**: Student can (a) correctly convert Ksp to molar solubility using the stoichiometry-specific formula, avoiding direct Ksp comparison across formula types, (b) correctly derive ion concentrations from s using the balanced dissolution equation's coefficients, (c) correctly compute Q_sp using just-mixed (pre-equilibrium) concentrations.

- **FA-1**: "AgCl has Ksp=1.8×10⁻¹⁰; Ag₂CrO₄ has Ksp=1.1×10⁻¹². Which has greater molar solubility?" — targets MC-1.
- **FA-2**: "Write the Ksp expression for Ag₂CrO₄ in terms of s." — targets MC-2.
- **FA-3**: "50 mL of 2.0×10⁻⁴ M AgNO₃ is mixed with 50 mL of 2.0×10⁻⁴ M NaCl. Will a precipitate form?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-1 among students who've only worked with same-stoichiometry-type Ksp comparisons so far.

**Delayed retrieval**: Re-probe MC-1's formula-type-dependence and MC-3's Q_sp timing rule before `chem.anal.gravimetric` requires fluent, correct solubility-product reasoning for quantitative precipitation analysis.

## 12. Recovery Notes

- **S3 (stuck)**: For the Ksp-comparison confusion, compute actual molar solubility explicitly for both compounds before attempting any qualitative Ksp-based comparison.
- **S4 (frustrated)**: Normalize — the 1:1-salt template genuinely does work perfectly for the most commonly-taught examples, making its incorrect extension to other stoichiometries a very reasonable, common error.
- **S6 (collision)**: Use the explicit stoichiometry-derivation walkthrough for MC-2; use the explicit dilution-then-Q_sp calculation for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why a compound with a smaller Ksp can be more soluble than one with a larger Ksp.

## 13. Memory & Review

Tag as a conceptual-correction memory (formula-type-dependent Ksp-solubility relationship) plus a procedural-derivation memory (stoichiometry-derived ion concentrations) plus a timing-procedural memory (Q_sp uses just-mixed concentrations). Schedule a spaced check at ~1 week and again before `chem.anal.gravimetric`.

## 14. Transfer Map

Feeds directly into `chem.anal.gravimetric` (quantitative precipitation analysis directly applies solubility-product and Q_sp reasoning established here).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
