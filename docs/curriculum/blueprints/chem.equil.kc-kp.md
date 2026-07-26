# chem.equil.kc-kp — Equilibrium Constants Kc and Kp

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.equil.kc-kp` |
| Domain | Equilibrium |
| Requires | `chem.equil.concept` |
| Unlocks | `chem.elect.nernst`, `chem.equil.complex-equil`, `chem.equil.le-chatelier`, `chem.equil.solubility` |
| Difficulty | proficient |
| Bloom Level | apply |
| Mastery Threshold | 0.8 |
| Estimated Hours | 4 |

## 1. Concept Spine

Kc (concentration-based) and Kp (pressure-based) equilibrium constants are written from a balanced equation with stoichiometric coefficients appearing as EXPONENTS (never multipliers) on each species' concentration or partial pressure; pure solids and liquids are excluded entirely from equilibrium expressions (their activity is defined as 1, since it doesn't change with amount present), leaving only gases and dissolved species; and Kp relates to Kc via Kp = Kc(RT)^Δn, where Δn = moles of gaseous products − moles of gaseous reactants — meaning Kp equals Kc only in the special case Δn=0, not as a general rule.

## 2. Four-Stage CPA+ Mental Model

**Concrete**: Writing Kc for 2SO₂(g) + O₂(g) ⇌ 2SO₃(g), correctly placing each coefficient as an exponent rather than a multiplier.

**Representational**: A side-by-side comparison of the balanced equation's coefficients and the corresponding K expression's exponents, visually mapping coefficient-to-exponent.

**Abstract**: The general rule that stoichiometric coefficients become exponents; the pure-solid/liquid exclusion rule; the Kp = Kc(RT)^Δn relationship with Δn computed from gas-phase species only.

**Transfer**: Given an unfamiliar heterogeneous equilibrium reaction, correctly writing its Kp or Kc expression (excluding solids/liquids, using exponents correctly) and correctly computing Kp from Kc (or vice versa) for a reaction with Δn≠0.

## 3. Why Beginners Fail

Students carry over their stoichiometric-calculation habit of treating balanced-equation coefficients as multipliers, incorrectly writing them as multipliers in front of concentration terms in K expressions rather than as exponents; they include every species mentioned in the balanced equation (including pure solids and liquids) in their K expression, missing that a pure solid or liquid's activity is defined as constant (=1) regardless of amount present; and they overgeneralize from an early example where Δn happened to be 0 (making Kp=Kc coincidentally), applying "Kp=Kc" as a universal rule rather than recognizing it depends on Δn.

## 4. Misconception Library

### MC-1: Stoichiometric coefficients appear as multipliers, not exponents
- **Probe**: "Write Kc for 2SO₂(g) + O₂(g) ⇌ 2SO₃(g)."
- **Characteristic phrase**: "Kc = 2[SO₃] / (2[SO₂] × [O₂])" or "Kc = [SO₃]² / (2[SO₂]² × [O₂])."
- **Trigger (Type 5, instruction-induced from balanced equation writing)**: Students are extensively trained to read balanced-equation coefficients as multipliers in stoichiometric mole calculations, and carry this exact habit into K expressions, where the rule is fundamentally different.
- **Conflict evidence [P28]**: The correct expression, derived from the definition of the equilibrium constant, is Kc = [SO₃]²/([SO₂]²[O₂]) — the coefficient 2 in front of SO₂ and SO₃ becomes the EXPONENT 2 on each corresponding concentration term, never a multiplying factor placed in front of the bracket.
- **Bridge [P30]**: Stoichiometric coefficients serve genuinely different mathematical roles in different contexts — as multipliers when scaling mole ratios in stoichiometric calculations, but as exponents when writing the equilibrium constant expression from the law of mass action.
- **Replacement [P31]**: In any K expression, each species' concentration (or pressure) is raised to a power equal to its stoichiometric coefficient — coefficients are always exponents in K expressions, never multipliers.
- **Discrimination pairs [P33]**: Stoichiometric mole calculation (coefficient acts as a multiplier on moles) vs. K expression (coefficient acts as an exponent on concentration) — same numeric coefficient, different mathematical role depending on context.
- **S6 repair path**: Rewrite the K expression explicitly showing the coefficient migrating from the balanced equation directly into exponent position, contrasted against the (wrong) multiplier placement.

### MC-2: Pure solids and liquids must appear in Kc/Kp
- **Probe**: "Write Kp for CaCO₃(s) ⇌ CaO(s) + CO₂(g)."
- **Characteristic phrase**: "Kp = [CaO][CO₂] / [CaCO₃]" or "Kp = P_CaO × P_CO₂ / P_CaCO₃."
- **Trigger (Type 5, instruction-induced from always using balanced equation species)**: Students learn the general procedure "write the equilibrium expression from every species in the balanced equation" and apply it uniformly, without the pure-solid/liquid exclusion exception being sufficiently emphasized.
- **Conflict evidence [P28]**: The activity (effective "concentration") of a pure solid or pure liquid is defined as exactly 1, regardless of how much of it is present, because adding or removing solid/liquid doesn't change the concentration of the pure substance itself (its density stays constant) — including it in the K expression would incorrectly make K appear to vary with the amount of solid present, which experimentally it does not; the correct expression is simply Kp = P_CO₂, with CaCO₃(s) and CaO(s) entirely excluded.
- **Bridge [P30]**: The K expression is meant to capture how the equilibrium POSITION depends on the amounts of species that can actually VARY in concentration — pure solids and liquids maintain a fixed, unchanging "concentration" (their own density) regardless of how much is present, so they contribute no meaningful variable term to the expression.
- **Replacement [P31]**: Exclude all pure solids (s) and pure liquids (l) entirely from K expressions — only gases and dissolved (aqueous) species with genuinely variable concentrations appear.
- **Discrimination pairs [P33]**: CaCO₃(s) (excluded, pure solid, fixed activity=1) vs. CO₂(g) (included, gas, genuinely variable concentration/pressure).
- **S6 repair path**: Ask directly, "does adding more solid CaCO₃ change its own internal concentration/density?" — the answer (no) motivates the exclusion rule directly.

### MC-3: Kp always equals Kc
- **Probe**: "For N₂(g) + 3H₂(g) ⇌ 2NH₃(g), calculate Kp if Kc = 977 at 298 K."
- **Characteristic phrase**: "Kp = Kc = 977."
- **Trigger (Type 1, overgeneralization from the special case Δn=0)**: Students often first encounter an example where the moles of gas don't change (Δn=0), memorize "Kp=Kc" from that specific case, and apply it universally to all reactions.
- **Conflict evidence [P28]**: For N₂+3H₂⇌2NH₃, Δn = 2 − (1+3) = −2, so Kp = Kc(RT)^Δn = 977 × (0.08206×298)^(−2) = 977/(24.45)² ≈ 977/597.8 ≈ 1.63 — Kp is notably smaller than Kc (977), directly contradicting the naive Kp=Kc assumption; the discrepancy arises because more moles of gas are on the reactant side (Δn<0), so high pressure genuinely favors the product side per Le Chatelier's principle, and this pressure-dependence is exactly what the (RT)^Δn factor captures.
- **Bridge [P30]**: "Kp=Kc" is true ONLY in the special case where the balanced equation has equal moles of gas on both sides (Δn=0) — for any reaction where gas moles change, the (RT)^Δn factor is genuinely nonzero-powered and Kp and Kc will differ.
- **Replacement [P31]**: Kp = Kc(RT)^Δn always, where Δn is computed from gas-phase species only — this reduces to Kp=Kc specifically and only when Δn=0.
- **Discrimination pairs [P33]**: A reaction with Δn=0 (Kp=Kc exactly) vs. N₂+3H₂⇌2NH₃ with Δn=−2 (Kp≈1.63, notably different from Kc=977).
- **S6 repair path**: Compute Δn explicitly for the given reaction first, before attempting the Kp calculation, to make the nonzero-Δn case concrete.

## 5. Explanation Library

**Primary explanation**: The equilibrium constant expression is written directly from the balanced equation's law of mass action: each species' concentration (Kc) or partial pressure (Kp) is raised to a power equal to its stoichiometric coefficient — always as an exponent, never as a multiplying factor. Pure solids and liquids are excluded entirely, since their activity (effectively their own internal concentration) stays fixed at 1 regardless of the amount present, contributing no variable term to the expression.

**Secondary explanation (Kp-Kc relationship framing)**: Kp and Kc are related by Kp = Kc(RT)^Δn, where Δn is the change in moles of GAS ONLY between products and reactants — this factor equals 1 (making Kp=Kc) only when Δn=0; for any reaction where the number of gas moles changes across the reaction, Kp and Kc will genuinely differ by this (RT)^Δn factor.

## 6. Analogy Library

- **Primary analogy**: A recipe scaled to make a double batch of cookies (2 units of an ingredient) doesn't mean "the ingredient counts twice as a simple addition" in the equilibrium sense — instead, think of the K expression as a "voting power" system, where each unit of stoichiometric coefficient gives that species' concentration an extra multiplicative vote (an exponent), not an additive one.
- **Breaking point**: The "voting power" analogy conveys the exponent-not-multiplier idea but doesn't naturally explain the pure-solid/liquid exclusion or the Kp/Kc relationship — those require the explicit activity and Δn arguments.
- **Anti-analogy**: Do NOT say "just copy the coefficients down as written" when moving from balanced equation to K expression — this invites the multiplier-vs-exponent confusion directly.

## 7. Demonstration Library

- **Demonstration 1 (coefficient-to-exponent mapping)**: Write several balanced equations side by side with their correct K expressions, having students explicitly trace each coefficient's transformation into an exponent.
- **Demonstration 2 (Δn computation drill)**: Present several reactions with varying Δn (positive, negative, zero) and have students compute Kp from Kc for each, discovering when Kp=Kc holds and when it doesn't.

## 8. Discovery Lesson

**Opening**: "If you double a recipe's ingredient amount, does that ingredient's 'importance' in an equilibrium expression double too, or something different happen?"

**Exploration**: Students write the K expression for 2SO₂+O₂⇌2SO₃ step by step, discovering the coefficient must become an exponent for the math to correctly reflect the law of mass action.

**Synthesis**: Guide toward: stoichiometric coefficients play different mathematical roles depending on context — multipliers for mole calculations, exponents for equilibrium expressions.

**Closure**: "For N₂+3H₂⇌2NH₃, is Kp going to equal Kc, or does something about this specific reaction change that?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the coefficient-to-exponent mapping explicitly for a worked example.
- **TA-2 (TELL)**: State the pure-solid/liquid exclusion rule explicitly, immediately followed by the "does more solid change its own concentration?" question.
- **TA-3 (DO)**: Student writes a K expression for a new heterogeneous equilibrium, correctly excluding solids/liquids and using exponents.
- **TA-4 (TEST-THINKING)**: Present MC-3's Δn=−2 probe and ask the student to compute Δn before attempting the Kp calculation.

## 10. Voice Teaching

Whenever writing a K expression from a balanced equation, narrate the coefficient-to-exponent transformation explicitly and slowly, never silently. When a heterogeneous equilibrium (containing solids or liquids) is presented, always ask "which species get excluded, and why?" before writing any expression.

## 11. Assessment

**Mastery gate**: Student can (a) correctly write a K expression with coefficients as exponents, (b) correctly exclude pure solids/liquids from a heterogeneous K expression, (c) correctly compute Kp from Kc (or vice versa) using Δn, recognizing when Kp≠Kc.

- **FA-1**: "Write Kc for 2SO₂(g) + O₂(g) ⇌ 2SO₃(g)." — targets MC-1.
- **FA-2**: "Write Kp for CaCO₃(s) ⇌ CaO(s) + CO₂(g)." — targets MC-2.
- **FA-3**: "For N₂(g)+3H₂(g)⇌2NH₃(g), calculate Kp if Kc=977 at 298K." — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-1 among students who've just come from stoichiometric mole-calculation practice, where coefficients genuinely do act as multipliers.

**Delayed retrieval**: Re-probe MC-1's exponent rule and MC-3's Δn dependence before `chem.equil.le-chatelier` and `chem.equil.solubility` build directly on fluent K-expression manipulation.

## 12. Recovery Notes

- **S3 (stuck)**: For the exponent confusion, return to the law of mass action's actual mathematical definition rather than pattern-matching from the balanced equation alone.
- **S4 (frustrated)**: Normalize — the coefficient-as-multiplier habit is deeply ingrained from stoichiometry practice, making this a very common, expected transfer error.
- **S6 (collision)**: Use the "does more solid change its own concentration?" question for MC-2; use the explicit Δn computation for MC-3.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why Kp=Kc is a special case rather than a general rule.

## 13. Memory & Review

Tag as a procedural-notational memory (exponent rule; exclusion rule) plus a conceptual-correction memory (Kp≠Kc in general). Schedule a spaced check at ~1 week and again before `chem.equil.le-chatelier`.

## 14. Transfer Map

Feeds directly into `chem.elect.nernst` (equilibrium-constant reasoning underlies the Nernst equation's connection to cell potential), `chem.equil.complex-equil`, `chem.equil.le-chatelier` (predicting equilibrium shifts assumes fluent K-expression writing), and `chem.equil.solubility` (solubility product expressions are a direct application of this concept's rules).

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
