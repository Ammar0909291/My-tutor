# Teaching Blueprint: Simple Linear Regression (`math.stats.linear-regression`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.stats.linear-regression` |
| name | Simple Linear Regression |
| domain | Statistics |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 7 |
| requires | `math.stats.correlation`, `math.linalg.least-squares` |
| unlocks | `math.stats.multiple-regression` |
| cross_links | `math.linalg.least-squares` |
| CPA_entry_stage | P (Pictorial) — scatterplot with fitted line before the equations |
| description (KG) | Models Y = β₀ + β₁X + ε, ε~N(0,σ²). Homogeneous. OLS estimates: β̂₁ = Sxy/Sxx, β̂₀ = ȳ − β̂₁x̄. Inference on β₁: t-statistic, CI. R² = SS_Reg/SS_Total measures fit. Residual diagnostics check assumptions.

 |

## Component 1 — Learning Objectives

- LO1: State the simple linear regression MODEL $Y=\beta_0+\beta_1X+\varepsilon$, $\varepsilon\sim N(0,\sigma^2)$ — and compute the OLS (ordinary least squares) coefficient estimates $\hat\beta_1=\frac{S_{xy}}{S_{xx}}$ and $\hat\beta_0=\bar{y}-\hat\beta_1\bar{x}$, connecting to `math.linalg.least-squares`'s general minimization framework.
- LO2: Perform INFERENCE on the SLOPE $\beta_1$ — constructing a $t$-based confidence interval or hypothesis test (typically $H_0:\beta_1=0$, "no linear relationship") — and recognize a NON-SIGNIFICANT slope test does NOT mean $X$ and $Y$ are unrelated, only that no significant LINEAR relationship was detected (mirroring `math.stats.correlation`'s linear-specific limitation).
- LO3: Interpret $R^2=\frac{SS_{\text{Reg}}}{SS_{\text{Total}}}$ as the PROPORTION of variance in $Y$ "explained" by the linear relationship with $X$ — and recognize a HIGH $R^2$ does NOT validate the model's assumptions; RESIDUAL DIAGNOSTICS (checking residual patterns for non-linearity, non-constant variance, non-normality) must be examined SEPARATELY, even when $R^2$ looks impressively high.

## Component 2 — Prerequisite Check

Assumes mastery of `math.stats.correlation` (the linear-association concept this model formalizes) and `math.linalg.least-squares` (the general minimization framework OLS is a specific instance of).

## Component 3 — Core Explanation

**Simple linear regression** models a response $Y$ as $Y=\beta_0+\beta_1X+\varepsilon$, where $\varepsilon\sim N(0,\sigma^2)$ is random error. The **OLS (ordinary least squares)** estimates minimize the sum of squared residuals, giving $\hat\beta_1=\frac{S_{xy}}{S_{xx}}$ (the slope, essentially a scaled version of the sample covariance divided by the sample variance of $X$) and $\hat\beta_0=\bar{y}-\hat\beta_1\bar{x}$ (the intercept, ensuring the fitted line passes through the point $(\bar{x},\bar{y})$) — this is the SAME least-squares minimization principle from `math.linalg.least-squares`, specialized to the simple one-predictor case.

INFERENCE on the SLOPE $\beta_1$ (typically testing $H_0:\beta_1=0$, "no linear relationship between $X$ and $Y$") uses a $t$-statistic and $t$-distribution, analogous to other hypothesis tests. A crucial caution mirroring `math.stats.correlation`'s own limitation: FAILING to reject $H_0:\beta_1=0$ does NOT mean $X$ and $Y$ are unrelated — it only means no significant LINEAR relationship was detected; a strong NON-LINEAR relationship could still exist undetected by this specifically linear model.

$R^2=\frac{SS_{\text{Reg}}}{SS_{\text{Total}}}$ measures the PROPORTION of $Y$'s variance "explained" by the linear model. Crucially, a HIGH $R^2$ does NOT automatically validate the model — RESIDUAL DIAGNOSTICS (examining plots of residuals for patterns suggesting non-linearity, non-constant variance/heteroscedasticity, or non-normality) must be checked SEPARATELY; a model can achieve a deceptively high $R^2$ while still badly violating its underlying assumptions in ways that undermine the validity of its inferences.

## Component 4 — Worked Examples

**Example 1 (LO1 — computing OLS estimates, breaking MC-1)**: For data with $S_{xy}=40$, $S_{xx}=20$, $\bar{x}=5$, $\bar{y}=12$, compute $\hat\beta_1$ and $\hat\beta_0$. $\hat\beta_1=\frac{40}{20}=2$. $\hat\beta_0=12-2(5)=12-10=2$. A common error computes $\hat\beta_0$ WITHOUT first finding $\hat\beta_1$ (e.g. just using $\bar{y}$ alone as the intercept, or applying the formula with the coefficients in the wrong order) — the intercept formula genuinely DEPENDS on the already-computed slope; the two must be found in the correct sequential order (slope first, then intercept).

**Example 2 (LO2 — non-significant slope doesn't mean no relationship, breaking MC-2)**: A regression on data following a perfect $Y=X^2$ relationship (symmetric range, as in `math.stats.correlation`'s parabola example) finds $\hat\beta_1\approx0$ and the slope test FAILS to reject $H_0:\beta_1=0$. Explain why this does NOT mean $X$ and $Y$ are unrelated. Since $Y=X^2$ is a perfectly deterministic but NON-LINEAR relationship, the LINEAR model genuinely can't detect it (the same cancellation effect from `math.stats.correlation`'s symmetric-range example) — the correct conclusion is "no significant LINEAR relationship detected," NOT "no relationship exists at all." A common error concludes "$X$ and $Y$ are unrelated" from a non-significant SLOPE test, missing the possibility of an undetected non-linear pattern — checking a scatterplot (as with correlation) remains essential before concluding "no relationship."

**Example 3 (LO3 — high R² doesn't validate assumptions, breaking MC-3-merged)**: A regression achieves $R^2=0.95$ (seemingly excellent fit), but a residual plot shows a clear FUNNEL SHAPE (residuals fanning out as $X$ increases — evidence of non-constant variance, violating the model's homoscedasticity assumption). Explain why the high $R^2$ alone doesn't confirm the model is appropriate. $R^2$ measures how much variance is "explained" OVERALL, but says NOTHING about whether the model's underlying ASSUMPTIONS (constant variance, normality of errors, linearity) actually hold — the funnel-shaped residual pattern reveals a genuine assumption violation (heteroscedasticity) that a high $R^2$ alone completely conceals. A common error treats a high $R^2$ as sufficient evidence that the model is "good" or "valid," skipping the residual diagnostic check entirely — $R^2$ and assumption validity are SEPARATE things that must BOTH be checked.

## Component 5 — Teaching Actions

### Teaching Action A01 — Computing β̂₁ Before β̂₀, in the Correct Sequential Order (Primitive P64: Conceptual Shift)

Work Example 1, explicitly computing the slope first, then substituting it into the intercept formula.

- **MC-1 hook**: check whether the slope is computed before the intercept, in the correct dependent order.

### Teaching Action A02 — Non-Significant Slope Doesn't Rule Out a Non-Linear Relationship (Primitive P06: Contrast Pair)

Work Example 2, explicitly connecting to `math.stats.correlation`'s analogous symmetric-non-linear-relationship caution.

- **MC-2 hook**: this directly targets MC-2 (concluding "no relationship" from a non-significant linear slope test alone).

### Teaching Action A03 — High R² Doesn't Validate Model Assumptions; Check Residuals Separately (reused procedure)

Work Example 3, explicitly demonstrating a high-R² model that still fails a key assumption via its residual pattern.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78. MAMR = ⌈0.85×5⌉ = 5/5.

- **P77 (4-problem set)**:
  1. For $S_{xy}=60$, $S_{xx}=15$, $\bar{x}=8$, $\bar{y}=20$, compute $\hat\beta_1$ and $\hat\beta_0$.
  2. Explain why failing to reject $H_0:\beta_1=0$ does not necessarily mean $X$ and $Y$ have no relationship at all.
  3. Explain, in one sentence, what $R^2=0.7$ means about the model's fit.
  4. Explain why a high $R^2$ alone does not guarantee the regression model's assumptions are satisfied.
- **P76 (Transfer Probe, mode = independence)**: "An economist fits a simple linear regression predicting monthly sales revenue from advertising spend, obtaining $R^2=0.88$ (seemingly a strong fit), but a residual plot reveals a clear curved (U-shaped) pattern rather than random scatter. (a) Explain what this residual pattern suggests about whether a linear model is truly appropriate here, despite the high $R^2$. (b) Explain what the economist should investigate or consider changing about the model, given this diagnostic finding."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | INTERCEPT-COMPUTED-WITHOUT-FIRST-FINDING-THE-SLOPE-IN-CORRECT-ORDER | Attempting to compute the intercept β̂₀ without first computing the slope β̂₁, or applying the formulas in the wrong sequential order | Foundational |
| MC-2 | NON-SIGNIFICANT-SLOPE-TEST-CONCLUDED-AS-NO-RELATIONSHIP-AT-ALL | Concluding X and Y have no relationship whatsoever from a non-significant linear slope test, missing the possibility of an undetected non-linear relationship | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 ("Intercept Computed Without First Finding the Slope in Correct Order") → P41 (detect: present Example 1 and check whether the slope is computed before the intercept) → P64 (conceptual shift: re-derive both formulas in the correct dependent sequence, slope first).
- **B02 (targets MC-2)**: P27 ("Non-Significant Slope Test Concluded as No Relationship at All") → P41 (detect: present Example 2 and check whether "no relationship at all" is (incorrectly) concluded) → P64 (conceptual shift: re-examine a scatterplot for potential non-linear patterns before drawing a final conclusion).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.stats.correlation`, `math.linalg.least-squares`.
- **Unlocks**: `math.stats.multiple-regression`.
- **Cross-links**: `math.linalg.least-squares`.

## Component 8 — Teaching Notes

- estimated_hours = 7 (the highest in recent batches) reflects the genuine breadth of this concept — model specification, coefficient estimation, inference, model fit, AND diagnostic checking all combined.
- Both misconceptions were ranked Foundational because each leads to either a computational error or a genuinely incomplete/incorrect conclusion about the underlying relationship.
- The advertising-spend-vs-sales-revenue transfer probe was deliberately chosen because a residual-pattern-revealed model misspecification, despite a deceptively high R², is a genuinely common and consequential pitfall in real business analytics.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.stats.correlation`, `math.linalg.least-squares`) |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.stats.multiple-regression`) |
| V-5 | cross_links checked against disk | PASS (`math.linalg.least-squares`) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (2 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: scatterplot with fitted line before the equations) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
