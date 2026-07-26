# chem.equil.weak-acid — Weak Acid/Base Equilibria

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.equil.weak-acid` |
| Domain | Equilibrium |
| Requires | `chem.equil.acids-bases` |
| Unlocks | `chem.equil.buffer`, `chem.equil.hydrolysis`, `chem.equil.titration` |
| Difficulty | proficient |
| Bloom Level | apply |
| Mastery Threshold | 0.8 |
| Estimated Hours | 4 |

## 1. Concept Spine

For a weak acid, degree of dissociation α = √(Ka/C₀) INCREASES as concentration C₀ decreases (dilution promotes dissociation as a fraction, even though absolute [H⁺]=C₀α still decreases overall) — approaching α→1 (complete dissociation) at infinite dilution for any weak acid, however weak; Ka and Kb of a conjugate acid-base pair are related MULTIPLICATIVELY (Ka×Kb=Kw), not additively, despite the superficially similar-looking logarithmic relationship (pKa+pKb=14) tempting an incorrect additive analogy for the non-log version; and the common "5% approximation" simplification (x=√(Ka·C₀)) is only valid when verified (x/C₀<0.05) — blindly applying it without checking can produce a physically impossible result (calculated [H⁺] exceeding the initial concentration), which is itself the clearest signal the approximation has failed and the full quadratic must be solved instead.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Diluting a 0.10 M acetic acid solution (α=1.3%) to 0.01 M and discovering α actually increases, even though [H⁺] itself decreases.

**Representational**: A graph of α vs. C₀ for a weak acid, showing α rising smoothly toward 1 as concentration approaches zero.

**Abstract**: The relationship α=√(Ka/C₀) (inverse dependence on concentration); the multiplicative Ka×Kb=Kw relationship (versus its additive log-transformed cousin pKa+pKb=14); the explicit x/C₀<0.05 validity check for the simplifying approximation.

**Transfer**: Given an unfamiliar weak acid/base scenario, correctly predicting how dilution affects α (not just [H⁺]), correctly computing a conjugate partner's K value via multiplication (not addition), and correctly recognizing when the 5% approximation fails and switching to the full quadratic solution.

## 3. Why Beginners Fail

Students reason that dilution reduces [H⁺], and directly (but incorrectly) conclude the acid must therefore be "less dissociated," conflating absolute concentration of H⁺ with the FRACTION of acid molecules that have dissociated (α), which actually increases upon dilution; they pattern-match the correct additive log relationship (pKa+pKb=14) onto the underlying non-log quantities, incorrectly writing Ka+Kb=Kw instead of the correct multiplicative relationship Ka×Kb=Kw; and they apply the 5% approximation shortcut universally, without checking the x/C₀<0.05 validity condition, sometimes producing a nonsensical result (calculated dissociated concentration exceeding the acid's total initial concentration) without recognizing this as a clear failure signal.

## 4. Misconception Library

### MC-1: Diluting a weak acid decreases α (degree of dissociation)
- **Probe**: "A 0.10 M solution of acetic acid has degree of dissociation α = 1.3%. What happens to α if the solution is diluted to 0.01 M?"
- **Characteristic phrase**: "Dilution reduces [H⁺] so α decreases."
- **Trigger (Type 1, overgeneralization from "dilution decreases concentration of everything")**: Students correctly know dilution reduces [H⁺] (the absolute concentration) and incorrectly generalize this to mean the FRACTION of acid molecules dissociated must also decrease, missing the distinction between an absolute quantity and a fractional/relative quantity.
- **Conflict evidence [P28]**: α=√(Ka/C₀) shows α mathematically INCREASES as C₀ (concentration) decreases — diluting acetic acid from 0.10 M to 0.01 M genuinely increases the fraction of molecules that dissociate, even though the resulting absolute [H⁺]=C₀α still decreases overall (since C₀ shrinks faster than α grows); at infinite dilution, α approaches 1 (essentially complete dissociation) for ANY weak acid, however weak it may be at higher concentrations.
- **Bridge [P30]**: Absolute concentration ([H⁺], which does decrease with dilution) and fractional dissociation (α, which actually increases with dilution) are two genuinely different quantities that can move in opposite directions simultaneously — this is a direct consequence of Le Chatelier's principle applied to the dissociation equilibrium, where diluting effectively adds more "water" to the reactant side, shifting equilibrium toward further dissociation.
- **Replacement [P31]**: Dilution increases α (fractional dissociation) even as it decreases [H⁺] (absolute concentration) — the two quantities are related but move in opposite directions with concentration change.
- **Discrimination pairs [P33]**: [H⁺] (absolute concentration, decreases with dilution) vs. α (fractional dissociation, increases with dilution) — genuinely different quantities, opposite trends.
- **S6 repair path**: Compute α explicitly at both 0.10 M and 0.01 M using the formula, showing the numeric increase directly, then separately note [H⁺]'s decrease.

### MC-2: Ka and Kb of a conjugate pair add to give Kw
- **Probe**: "Acetic acid has Ka = 1.8 × 10⁻⁵. Calculate Kb for acetate ion."
- **Characteristic phrase**: "Kb(CH₃COO⁻) = Kw − Ka = 10⁻¹⁴ − 1.8×10⁻⁵ (approximately −1.8×10⁻⁵)."
- **Trigger (Type 4, notation-induced)**: The correct logarithmic relationship pKa+pKb=14 has an additive form that superficially resembles pH+pOH=14, tempting students to write the analogous-looking but incorrect additive relationship Ka+Kb=Kw for the underlying non-log quantities.
- **Conflict evidence [P28]**: The correct relationship is Ka×Kb=Kw (multiplication, not addition/subtraction) — Kb=Kw/Ka=(1.0×10⁻¹⁴)/(1.8×10⁻⁵)=5.6×10⁻¹⁰, a small positive number, entirely different from the nonsensical negative result the additive (incorrect) approach produces.
- **Bridge [P30]**: The additive log relationship pKa+pKb=14 arises precisely BECAUSE log(Ka×Kb)=log Ka+log Kb=log Kw — the additivity is a property of the LOGARITHM of the underlying multiplicative relationship, not a property of Ka and Kb themselves; taking logs converts multiplication into addition, which is exactly why the log-transformed (p-value) version looks additive while the original quantities are genuinely multiplicative.
- **Replacement [P31]**: Ka×Kb=Kw (multiplicative) is the fundamental relationship; pKa+pKb=14 (additive) is simply its logarithmic transformation, not a separate, independently-additive rule for Ka and Kb.
- **Discrimination pairs [P33]**: The correct multiplicative computation (Ka×Kb=Kw, giving Kb=5.6×10⁻¹⁰) vs. the incorrect additive computation (Ka+Kb=Kw or Kw−Ka, giving a nonsensical negative result).
- **S6 repair path**: Derive the log relationship explicitly from the multiplicative one (log(Ka×Kb)=log Kw → log Ka+log Kb=log Kw → pKa+pKb=14), showing the additive form is a downstream CONSEQUENCE of the multiplicative original, not an independent rule.

### MC-3: The 5% approximation is always valid
- **Probe**: "Calculate [H⁺] in 0.010 M chlorous acid (HClO₂), Ka = 1.1×10⁻²."
- **Trigger (Type 5, instruction-induced)**: Most textbook practice examples happen to use conditions where the simplifying approximation x=√(Ka·C₀) genuinely holds, so students never develop the habit of checking the validity condition before applying it.
- **Conflict evidence [P28]**: Applying the shortcut here gives x=√(1.1×10⁻²×0.010)=√(1.1×10⁻⁴)=0.0105 M — but checking x/C₀=0.0105/0.010=105%, vastly exceeding the 5% validity threshold; even more strikingly, this means the calculated dissociated amount (0.0105 M) exceeds the TOTAL initial acid concentration (0.010 M), a physically impossible result that itself flags the approximation's total failure; solving the full quadratic instead gives x≈0.0069 M, pH≈2.16, the genuinely correct answer.
- **Bridge [P30]**: The 5% approximation relies on the simplifying assumption that the amount dissociated (x) is small enough relative to the initial concentration (C₀) that C₀−x≈C₀ — when Ka is relatively large compared to C₀ (as with this fairly strong weak acid at low concentration), this assumption breaks down badly, and the shortcut formula's own output (exceeding C₀ itself) is direct, checkable proof that the underlying assumption failed.
- **Replacement [P31]**: Always verify x/C₀<0.05 after computing the shortcut approximation — if this check fails, discard the approximate answer and solve the full quadratic equation instead.
- **Discrimination pairs [P33]**: A case where x/C₀<0.05 (approximation valid, shortcut usable) vs. HClO₂'s case where x/C₀=105% (approximation badly invalid, full quadratic required).
- **S6 repair path**: Have the student explicitly compute x/C₀ after any shortcut calculation, before accepting the result, making the validity check a mandatory habitual step.

## 5. Explanation Library

**Primary explanation**: A weak acid's degree of dissociation (α) is given by α=√(Ka/C₀) — since C₀ appears in the denominator, DILUTING a weak acid solution (decreasing C₀) genuinely INCREASES α, the fraction of molecules that dissociate, even though the resulting absolute [H⁺]=C₀α still decreases overall (because C₀ shrinks proportionally faster than α grows). This reflects Le Chatelier's principle: adding water effectively shifts the dissociation equilibrium further toward products.

**Secondary explanation (multiplicative-Kb and approximation-validity framing)**: A conjugate acid-base pair's Ka and Kb values are related by MULTIPLICATION (Ka×Kb=Kw), not addition — the familiar additive pKa+pKb=14 relationship is simply the logarithm of this multiplicative rule, not an independently additive property of Ka and Kb themselves. Separately, the common simplifying approximation for weak-acid pH calculations (x=√(Ka·C₀)) is only valid when the resulting x is genuinely small relative to C₀ (specifically x/C₀<0.05) — this must always be checked after computing, since violating it (sometimes dramatically, as when x exceeds C₀ itself) signals the approximation has failed and the full quadratic must be solved.

## 6. Analogy Library

- **Primary analogy**: A large auditorium (concentrated solution) where only a small fraction of seated people (molecules) choose to stand up and speak (dissociate) — but in a nearly empty auditorium (dilute solution), a much larger PROPORTION of the few remaining people end up speaking, even though the raw number of people speaking is smaller overall (since there are fewer people total) — proportion (α) and raw count ([H⁺]) can move in opposite directions.
- **Breaking point**: The auditorium analogy conveys the proportion-vs-absolute-count distinction well but doesn't naturally capture the multiplicative Ka-Kb relationship or the approximation-validity check — those need the explicit algebraic and numeric arguments.
- **Anti-analogy**: Do NOT say "Ka + Kb = Kw, just like pH + pOH = 14" — this directly reinforces MC-2.

## 7. Demonstration Library

- **Demonstration 1 (α-vs-C₀ numeric comparison)**: Compute α explicitly for acetic acid at 0.10 M and 0.01 M, showing the numeric increase directly, alongside the separate computation of [H⁺] at each concentration showing its decrease.
- **Demonstration 2 (approximation-validity check drill)**: Present several weak-acid scenarios with varying Ka/C₀ ratios, having students compute the shortcut approximation AND check x/C₀ each time, discovering which cases require the full quadratic instead.

## 8. Discovery Lesson

**Opening**: "If diluting an acid solution definitely reduces [H⁺], does that also mean a smaller FRACTION of the acid molecules are dissociating?"

**Exploration**: Students compute α explicitly at two different concentrations using the α=√(Ka/C₀) formula, discovering α increases even as [H⁺] decreases.

**Synthesis**: Guide toward: fractional dissociation (α) and absolute concentration ([H⁺]) are distinct quantities that can move in opposite directions with dilution.

**Closure**: "If pKa + pKb = 14 is a correct additive relationship, does that mean Ka + Kb = Kw is also correct?" (Directly resolves MC-2.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the explicit α computation at two concentrations, showing the increase directly.
- **TA-2 (TELL)**: State the multiplicative Ka×Kb=Kw relationship explicitly, immediately followed by the log-derivation showing why pKa+pKb=14 is additive instead.
- **TA-3 (DO)**: Student computes the shortcut approximation for a given weak acid and checks x/C₀ validity before accepting the result.
- **TA-4 (TEST-THINKING)**: Present MC-3's HClO₂ probe and ask the student to recognize the physically impossible result (x exceeding C₀) as a validity-check failure.

## 10. Voice Teaching

Whenever dilution's effect on a weak acid is discussed, explicitly separate "what happens to α" from "what happens to [H⁺]" as two distinct questions, never conflating them. Whenever the shortcut approximation is used, narrate the x/C₀ validity check aloud every time, treating it as a mandatory final step, not an optional extra.

## 11. Assessment

**Mastery gate**: Student can (a) correctly predict that dilution increases α even as [H⁺] decreases, (b) correctly compute a conjugate partner's K value using multiplication, not addition, (c) correctly check the 5% approximation's validity and switch to the full quadratic when it fails.

- **FA-1**: "A 0.10 M acetic acid solution has α=1.3%. What happens to α if diluted to 0.01 M?" — targets MC-1.
- **FA-2**: "Acetic acid has Ka=1.8×10⁻⁵. Calculate Kb for acetate ion." — targets MC-2.
- **FA-3**: "Calculate [H⁺] in 0.010 M HClO₂, Ka=1.1×10⁻². Check whether the 5% approximation is valid." — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-1 among students who've only reasoned about [H⁺] trends, not α trends, so far.

**Delayed retrieval**: Re-probe MC-1's α-vs-C₀ relationship before `chem.equil.buffer` and `chem.equil.titration` require fluent dilution reasoning for buffer capacity and titration curve analysis.

## 12. Recovery Notes

- **S3 (stuck)**: For the α-dilution confusion, compute α numerically at two concentrations side by side before attempting any qualitative reasoning.
- **S4 (frustrated)**: Normalize — the "dilution reduces everything" intuition is a reasonable, common overgeneralization from correctly knowing [H⁺] decreases.
- **S6 (collision)**: Use the explicit log-derivation for MC-2; use the physically-impossible-result recognition exercise for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why α and [H⁺] can move in opposite directions upon dilution.

## 13. Memory & Review

Tag as a conceptual-correction memory (α vs. [H⁺] trends with dilution; multiplicative Ka-Kb relationship) plus a procedural-verification memory (5% approximation validity check). Schedule a spaced check at ~1 week and again before `chem.equil.buffer`.

## 14. Transfer Map

Feeds directly into `chem.equil.buffer` (buffer capacity calculations require fluent weak-acid equilibrium reasoning), `chem.equil.hydrolysis` (salt hydrolysis directly applies the conjugate Ka/Kb relationship established here), and `chem.equil.titration` (titration curve analysis requires correct weak-acid dissociation behavior throughout).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
