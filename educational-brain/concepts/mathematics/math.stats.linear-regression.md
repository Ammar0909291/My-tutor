# math.stats.linear-regression

## Identity
- **KG id**: `math.stats.linear-regression`
- **Domain**: math.stats
- **Requires**: `math.stats.correlation`, `math.linalg.least-squares`
- **Unlocks**: `math.stats.multiple-regression`
- **Cross-links**: `math.linalg.least-squares`
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 7

## Learning Objective
State $Y=\beta_0+\beta_1X+\varepsilon$ and compute OLS estimates $\hat\beta_1=S_{xy}/S_{xx}$ then
$\hat\beta_0=\bar y-\hat\beta_1\bar x$ — NEVER computing the intercept before the slope; perform
inference on $\beta_1$, recognizing a NON-SIGNIFICANT slope test NEVER means $X$ and $Y$ are
unrelated, only that no significant LINEAR relationship was detected; and interpret $R^2$ as
variance explained, recognizing a HIGH $R^2$ NEVER validates the model's assumptions — residual
diagnostics must be checked SEPARATELY.

## Core Understanding
THE SLOPE MUST BE COMPUTED BEFORE THE INTERCEPT — NEVER THE REVERSE OR INDEPENDENTLY: for
$S_{xy}=40$, $S_{xx}=20$, $\bar x=5$, $\bar y=12$: $\hat\beta_1=40/20=2$, THEN $\hat\beta_0=
12-2(5)=12-10=2$. Computing $\hat\beta_0$ WITHOUT first finding $\hat\beta_1$ (e.g. using $\bar y$
alone as the intercept, or applying the formulas out of order) is WRONG — the intercept formula
genuinely DEPENDS on the already-computed slope; the two must be found in the correct SEQUENTIAL
order, slope first, then intercept.

A NON-SIGNIFICANT SLOPE TEST NEVER MEANS "NO RELATIONSHIP AT ALL" — ONLY "NO SIGNIFICANT LINEAR
RELATIONSHIP DETECTED": for data following a perfect $Y=X^2$ relationship (symmetric range):
$\hat\beta_1\approx0$ and the slope test FAILS to reject $H_0:\beta_1=0$. This does NOT mean $X$
and $Y$ are unrelated — since $Y=X^2$ is a perfectly deterministic but NON-LINEAR relationship, the
LINEAR model genuinely can't detect it (the same cancellation effect as `math.stats.correlation`'s
symmetric-range example). Concluding "$X$ and $Y$ are unrelated" from a non-significant SLOPE test
misses the possibility of an undetected non-linear pattern — checking a scatterplot remains
essential before concluding "no relationship."

A HIGH $R^2$ NEVER VALIDATES THE MODEL'S ASSUMPTIONS — RESIDUAL DIAGNOSTICS MUST BE CHECKED
SEPARATELY: a regression achieves $R^2=0.95$ (seemingly excellent), but a residual plot shows a
clear FUNNEL SHAPE (residuals fanning out as $X$ increases — evidence of non-constant variance,
violating homoscedasticity). $R^2$ measures how much variance is "explained" OVERALL, but says
NOTHING about whether the model's underlying ASSUMPTIONS (constant variance, normality, linearity)
actually hold — treating a high $R^2$ as sufficient evidence the model is "good," skipping the
residual diagnostic check entirely, is WRONG — $R^2$ and assumption validity are SEPARATE things
that must BOTH be checked.

## Mental Models
- **"Slope first, then intercept — the intercept formula literally needs the slope's value."**
- **"A non-significant slope rules out a straight-line relationship, never every relationship —
  always check the scatterplot for a curve."**
- **"A high R² tells you how much variance is explained, never whether the model's assumptions
  actually hold — those need their own separate check."**

## Why Students Fail

### MC-1: INTERCEPT-COMPUTED-WITHOUT-FIRST-FINDING-THE-SLOPE-IN-CORRECT-ORDER
- **Surface form**: attempts to compute the intercept $\hat\beta_0$ without first computing the
  slope $\hat\beta_1$, or applies the formulas in the wrong sequential order.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-derive both formulas in the correct dependent sequence, slope first.

### MC-2: NON-SIGNIFICANT-SLOPE-TEST-CONCLUDED-AS-NO-RELATIONSHIP-AT-ALL
- **Surface form**: concludes $X$ and $Y$ have no relationship whatsoever from a non-significant
  linear slope test, missing the possibility of an undetected non-linear relationship.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-examine a scatterplot for potential non-linear patterns before drawing a final
  conclusion.

## Misconceptions

### MC-1: INTERCEPT-COMPUTED-WITHOUT-FIRST-FINDING-THE-SLOPE-IN-CORRECT-ORDER
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: NON-SIGNIFICANT-SLOPE-TEST-CONCLUDED-AS-NO-RELATIONSHIP-AT-ALL
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The intercept formula is the second step of a recipe that needs the first step's result — you
  can't bake the second layer before the first is out of the oven."**
- **Anti-analogy**: a high R² with bad residuals is like a beautifully wrapped gift box that
  rattles suspiciously when shaken — the wrapping (R²) looks great, but you still have to open it
  (check the residuals) to know if what's inside actually works.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the sequential $\hat\beta_1=2$, then $\hat\beta_0=2$
  computation.
- **Demonstration 2 (targets MC-2)**: the $Y=X^2$ non-significant-slope-despite-perfect-nonlinear-
  dependence example.
- **Demonstration 3**: the $R^2=0.95$-with-a-funnel-shaped-residual-plot example.

## Discovery Questions
1. "Can you compute the intercept before you've computed the slope?"
2. "If the slope test isn't significant, does that mean X and Y have no relationship at all?"
3. "Does a high R² by itself tell you the model's assumptions are satisfied?"

## Teaching Sequence
1. **Conceptual shift**: the sequential slope-then-intercept computation, working Demonstration
   1, isolating MC-1.
2. **Contrast pair**: the non-significant-slope-but-nonlinear-dependence example, working
   Demonstration 2, isolating MC-2.
3. **Reused procedure**: the high-$R^2$-with-bad-residuals example.
4. **Mastery gate**: require a correct sequential OLS computation, a correct explanation of why a
   non-significant slope doesn't rule out all relationships, and a correct explanation of why
   residual diagnostics are needed even with high $R^2$, at the Blueprint's own stated MAMR of
   5/5.

## Tutor Actions
- Never accept the intercept computed before or independently of the slope.
- Never accept "no relationship at all" concluded from a non-significant slope test alone.
- Never accept a high $R^2$ treated as sufficient evidence the model's assumptions hold.

## Voice Teaching Notes
- Say "have you computed the slope yet — because the intercept formula needs it?" whenever OLS
  coefficients are being computed.
- Ask "have you checked the residual plot, or are you trusting R² alone?" whenever model validity
  is being assessed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes $\hat\beta_1$ then $\hat\beta_0$ in the
  correct order.
- **Rung 2 (application)**: learner correctly explains why a non-significant slope doesn't rule
  out a non-linear relationship.
- **Rung 3 (transfer)**: learner correctly diagnoses a high-$R^2$ model with a curved residual
  pattern as inappropriate, in a novel business-analytics scenario.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive both formulas in the correct dependent sequence.
- If MC-2 recurs, re-examine a scatterplot for potential non-linear patterns.

## Memory Hooks
- "Slope first, intercept second — never the reverse."
- "Non-significant slope rules out a line, never every relationship."
- "High R² is not a free pass — always check the residuals separately."

## Transfer Connections
- `math.stats.correlation` (already authored, this campaign, Batch 212): supplies the
  linear-association concept this model formalizes, and the analogous non-linear-relationship
  caution this concept's MC-2 directly mirrors.
- `math.linalg.least-squares` (already authored, certified domain; cross-link): supplies the
  general minimization framework OLS is a specific instance of.
- `math.stats.multiple-regression` (unlocked by this concept, not yet authored): will extend this
  concept's single-predictor model to multiple predictors.

## Cross-Subject Connections
- Business analytics: predicting sales revenue from advertising spend, with residual diagnostics
  revealing model misspecification despite a deceptively high $R^2$, is a genuinely common and
  consequential pitfall.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.linear-regression.md`, reused by
  reference for its sequential OLS computation example, its non-significant-slope-nonlinear-
  relationship example, its high-$R^2$-bad-residuals example, and its two-misconception registry
  (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on an economist's advertising-
  spend-versus-sales-revenue regression with $R^2=0.88$ and a U-shaped residual pattern.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.correlation`/`math.linalg.least-squares`, unlocks
  `math.stats.multiple-regression`, cross_links `math.linalg.least-squares`, proficient/apply,
  mastery_threshold 0.85, estimated_hours 7) was directly verified against the live KG and
  matches exactly.

## Version History
- 2026-09-19 (Batch 213): authored. First entry this batch. Companion batch concept:
  `math.stats.experimental-design`.
