# math.stats.multiple-regression

## Identity
- **KG id**: `math.stats.multiple-regression`
- **Domain**: math.stats
- **Requires**: `math.stats.linear-regression`, `math.linalg.matrix-multiplication`,
  `math.linalg.matrix-inverse`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 8

## Learning Objective
State $y=X\beta+\varepsilon$ and the OLS solution $\hat\beta=(X^TX)^{-1}X^Ty$, applying the matrix
operations in the CORRECT sequence with COMPATIBLE dimensions — NEVER attempting $Xy$ or
$X^{-1}y$ directly; distinguish the OVERALL $F$-test from INDIVIDUAL $t$-tests — NEVER assuming
they must always agree; and recognize multicollinearity corrupts INDIVIDUAL coefficient
interpretation, NEVER necessarily the model's overall predictive validity.

## Core Understanding
THE MATRIX OLS SOLUTION REQUIRES THE CORRECT OPERATION SEQUENCE WITH COMPATIBLE DIMENSIONS —
NEVER $Xy$ OR $X^{-1}y$ DIRECTLY: for a model with 2 predictors (plus intercept), $n=50$: $X$ is
$50\times3$, $X^T$ is $3\times50$, $X^TX$ is $3\times3$ (a SQUARE matrix, genuinely invertible if
predictors aren't perfectly collinear), $\hat\beta$ is $3\times1$. Confusing the matrix
DIMENSIONS (e.g. attempting $Xy$ directly, which isn't even dimension-compatible, or $X^{-1}y$,
which requires $X$ to be square, which it generally isn't) is WRONG — the specific operations
(transpose, multiply, invert, multiply again) must be applied in the CORRECT order with
CORRECT dimension-compatible steps: $(X^TX)^{-1}X^Ty$, never a shortcut.

THE OVERALL $F$-TEST AND INDIVIDUAL $t$-TESTS ANSWER GENUINELY DIFFERENT QUESTIONS — NEVER
ASSUMED TO ALWAYS AGREE: a regression with 5 predictors has a SIGNIFICANT overall $F$-test
($p<0.001$), but only 2 of the 5 individual predictors' $t$-tests are significant. This is NOT a
contradiction: the overall $F$-test confirms the predictors, taken TOGETHER, explain significant
variance — but this doesn't require EVERY individual predictor to contribute significantly ON ITS
OWN once the others are accounted for (some predictors may be REDUNDANT with each other).
Assuming a significant overall $F$-test implies ALL individual coefficients must ALSO be
significant treats two genuinely different questions as if they must agree — they never must.

MULTICOLLINEARITY CORRUPTS INDIVIDUAL COEFFICIENTS — NEVER NECESSARILY THE MODEL'S OVERALL
PREDICTIVE VALIDITY: a model with two highly correlated predictors ("height in inches" and
"height in centimeters," essentially the SAME thing) produces wildly unstable individual
coefficient estimates (large standard errors, an unexpectedly flipped sign) despite the model's
overall $R^2$ and $F$-test looking perfectly reasonable. Since the two predictors are nearly
PERFECTLY correlated, the model cannot reliably distinguish which one is "really" driving the
outcome — the COMBINED contribution is stable (explaining the good overall fit), but the SPLIT
between individual coefficients becomes unstable. Concluding the ENTIRE model is unreliable
because of unstable individual coefficients is WRONG — multicollinearity specifically corrupts
INDIVIDUAL coefficient interpretation while often leaving overall PREDICTIVE validity
comparatively unaffected.

## Mental Models
- **"(XᵀX)⁻¹Xᵀy is a fixed sequence — never a shortcut like Xy or X⁻¹y, which aren't even valid
  operations here."**
- **"A significant overall F-test and individually-significant coefficients are two different
  questions — never guaranteed to travel together."**
- **"Multicollinearity breaks the individual coefficients' interpretability — never necessarily
  the model's overall predictive usefulness."**

## Why Students Fail

### MC-1: MATRIX-OLS-OPERATIONS-APPLIED-IN-WRONG-ORDER-OR-WITH-INCOMPATIBLE-DIMENSIONS
- **Surface form**: applies the matrix operations of the OLS solution in the wrong order or with
  dimension-incompatible operations, rather than the correct $(X^TX)^{-1}X^Ty$ sequence.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-derive the formula step by step, tracking each matrix's dimensions explicitly.

### MC-2: OVERALL-F-TEST-AND-INDIVIDUAL-T-TESTS-ASSUMED-TO-ALWAYS-AGREE
- **Surface form**: assumes a significant overall F-test guarantees every individual coefficient
  is significant, or vice versa, rather than recognizing these test different questions.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-examine what each test specifically measures, confirming they answer genuinely
  different questions.

## Misconceptions

### MC-1: MATRIX-OLS-OPERATIONS-APPLIED-IN-WRONG-ORDER-OR-WITH-INCOMPATIBLE-DIMENSIONS
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: OVERALL-F-TEST-AND-INDIVIDUAL-T-TESTS-ASSUMED-TO-ALWAYS-AGREE
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"(XᵀX)⁻¹Xᵀy is a specific assembly sequence, like a lock combination — the operations in the
  wrong order (or skipped) never open the same door."**
- **Anti-analogy**: a significant overall F-test with some insignificant individual predictors
  isn't a broken model — it's like a winning team with some players who individually didn't score,
  their combined contribution still won the game.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $50\times3$, $3\times50$, $3\times3$, $3\times1$
  dimension-tracking walkthrough.
- **Demonstration 2 (targets MC-2)**: the significant-overall-F-with-3-insignificant-predictors
  example.
- **Demonstration 3**: the height-in-inches/height-in-centimeters multicollinearity example.

## Discovery Questions
1. "Can you compute β̂ as Xy or X⁻¹y directly, or does it require the full (XᵀX)⁻¹Xᵀy sequence?"
2. "If the overall F-test is significant but only some individual t-tests are, is that a
   contradiction?"
3. "Does multicollinearity ruin a model's overall predictions, or just its individual coefficient
   interpretability?"

## Teaching Sequence
1. **Conceptual shift**: the dimension-tracking OLS derivation, working Demonstration 1, isolating
   MC-1.
2. **Contrast pair**: the overall-F-versus-individual-t-tests distinction, working Demonstration
   2, isolating MC-2.
3. **Reused procedure**: the multicollinearity-corrupts-coefficients-not-fit example, working
   Demonstration 3.
4. **Mastery gate**: require correct matrix dimension tracking through the OLS formula, a correct
   explanation of why overall and individual significance can disagree, and a correct explanation
   of multicollinearity's effect, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept the OLS solution computed via an incorrect matrix operation sequence.
- Never accept a claim that overall and individual significance tests must always agree.
- Never accept the entire model declared unreliable solely due to unstable individual
  coefficients under multicollinearity.

## Voice Teaching Notes
- Say "what are the dimensions at each step — does this operation even make sense?" whenever the
  matrix OLS formula is being applied.
- Ask "is that a claim about the whole model, or about one specific coefficient?" whenever
  overall versus individual significance is being discussed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states the dimensions of $X$, $X^TX$, and $\hat
  \beta$ for a given model.
- **Rung 2 (application)**: learner correctly explains why a significant overall F-test doesn't
  guarantee every individual coefficient is significant.
- **Rung 3 (transfer)**: learner correctly diagnoses a counterintuitive coefficient sign as a
  multicollinearity artifact in a real-estate pricing scenario, without discarding the whole
  model.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the formula step by step, tracking dimensions explicitly.
- If MC-2 recurs, re-examine what each test specifically measures.

## Memory Hooks
- "(XᵀX)⁻¹Xᵀy — a fixed sequence, never a shortcut."
- "Overall F and individual t answer different questions — never guaranteed to agree."
- "Multicollinearity breaks individual coefficients, never necessarily the model's overall fit."

## Transfer Connections
- `math.stats.linear-regression` (already authored, this campaign, Batch 213): supplies the
  single-predictor foundation this concept generalizes into matrix form.
- `math.linalg.matrix-multiplication` (already authored, certified domain): supplies the matrix
  products $X^TX$ and $X^Ty$.
- `math.linalg.matrix-inverse` (already authored, certified domain): supplies the inversion of
  $X^TX$ needed for the OLS solution.

## Cross-Subject Connections
- Real estate and economics: predicting house prices from correlated predictors like bedrooms
  and bathrooms is a genuinely common real-world scenario where multicollinearity produces
  counterintuitive individual coefficients.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.multiple-regression.md`, reused by
  reference for its dimension-tracking OLS derivation, its overall-F-versus-individual-t-tests
  example, its height-multicollinearity example, and its two-misconception registry (severity
  levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a real estate analyst's
  bedrooms/bathrooms multicollinearity producing a counterintuitive negative coefficient.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.linear-regression`/`math.linalg.matrix-multiplication`/
  `math.linalg.matrix-inverse`, unlocks none, cross_links none, expert/apply,
  mastery_threshold 0.8, estimated_hours 8) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-19 (Batch 214): authored. First entry this batch. Companion batch concept:
  `math.stats.nonparametric`.
