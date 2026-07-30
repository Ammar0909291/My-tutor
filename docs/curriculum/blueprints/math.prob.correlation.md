# Blueprint: math.prob.correlation

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.prob.correlation |
| name | Correlation |
| Domain | math.prob |
| Difficulty | proficient |
| Bloom level | apply |
| Estimated hours | 3 |
| Mastery threshold | 0.85 |
| MAMR | 5/5 |
| Prerequisites | math.prob.covariance |
| Cross-links | math.stats.correlation |
| Unlocks | — |

## Component 1 — Learning Objective
The student defines correlation ρ(X,Y)=Cov(X,Y)/(SD(X)·SD(Y)); interprets ρ as a dimensionless measure of LINEAR association in [−1,1]; explains why |ρ|=1 iff Y=aX+b a.s. for some a≠0; distinguishes correlation from causation; identifies that ρ=0 means uncorrelated (not independent) — and that independence implies ρ=0 but not vice versa; and applies the formula for variance of a sum: Var(X+Y)=Var(X)+2Cov(X,Y)+Var(Y).

## Component 2 — CPA Entry Stage
**P — Pictorial** (scatter plots of (X,Y) for four cases: ρ≈+0.9 (tight upward ellipse), ρ≈−0.9 (tight downward ellipse), ρ≈0 (circular cloud), ρ=+1 (perfect line); label each with the ρ value; annotate that ρ measures how tightly (X,Y) clusters around a line — not how curved the relationship is)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | CORRELATION-ZERO-MEANS-INDEPENDENT | Student concludes X and Y are independent whenever ρ(X,Y)=0; doesn't know there exist dependent, uncorrelated random variables | Type 5 — instruction-induced (independence IMPLIES ρ=0 is taught; students invert this: ρ=0 implies independence) |
| MC-2 | CORRELATION-MEASURES-ALL-DEPENDENCE | Student treats ρ as a complete measure of dependence; doesn't know ρ only captures LINEAR association and can miss nonlinear dependencies | Type 3 — language contamination ("correlation" in everyday language means "any relationship"; in probability it means specifically linear association) |
| MC-3 | CORRELATION-AND-COVARIANCE-ARE-PROPORTIONAL | Student treats Cov and ρ as interchangeable up to a constant; doesn't know the normalisation by SD(X)·SD(Y) removes the units and scale, making ρ dimensionless | Type 1 — overgeneralisation (ρ = Cov(X,Y)/(SD(X)SD(Y)); students think "ρ is just Cov scaled by a constant" without understanding that the constant depends on X and Y themselves, making ρ scale-invariant while Cov is not) |

## Component 4 — Session TA Cap
**Cap = 5** (hrs = 3 → cap 5)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**From covariance to correlation — making it scale-invariant:**

**Problem with Cov:** Cov(X,Y) has units (units of X × units of Y) and its magnitude depends on the scales of X and Y. Cov(height in cm, weight in kg) ≠ Cov(height in m, weight in g) even for the same data.

**Solution — normalise:**
ρ(X,Y) = Cov(X,Y) / (SD(X)·SD(Y))

**Properties:**
- −1 ≤ ρ ≤ 1 (Cauchy-Schwarz inequality)
- ρ=1 ↔ Y = aX+b a.s. for some a>0 (perfect positive linear relationship)
- ρ=−1 ↔ Y = aX+b a.s. for some a<0 (perfect negative linear relationship)
- ρ=0 ↔ X,Y are uncorrelated (linear association is zero — but they may still be dependent)
- Scale invariance: ρ(aX+b, cY+d) = sign(ac)·ρ(X,Y) for a,c≠0

**Variance of sum:** Var(X+Y) = Var(X)+2Cov(X,Y)+Var(Y) = Var(X)+2ρ·SD(X)·SD(Y)+Var(Y).
- If ρ=0: Var(X+Y)=Var(X)+Var(Y) (Pythagorean-like addition)
- If ρ=1: Var(X+Y)=(SD(X)+SD(Y))² (maximum variance)
- If ρ=−1: Var(X+Y)=(SD(X)−SD(Y))² (can be zero if SD(X)=SD(Y))

**Counter-example (ρ=0 but dependent):** X~Uniform(−1,1), Y=X². Then Cov(X,Y)=E[XY]−E[X]E[Y]=E[X³]−0=0 (since X³ is an odd function of X on a symmetric interval). But Y is a deterministic function of X — completely dependent. Yet ρ=0.

**P49 checkpoint:**
- CORRECT → "ρ=Cov/(SD·SD). −1≤ρ≤1. ρ=0 ≠ independent. Y=X² example: ρ=0 but dependent. Var(X+Y)=Var(X)+2Cov+Var(Y)." → Gate (P91)
- PARTIAL (MC-1: ρ=0 means independent) → "ρ=0 means NO LINEAR association. But X and Y can still be related in nonlinear ways. Counter-example: X~Uniform(−1,1), Y=X². Cov(X,Y)=E[X³]=0 (odd function, symmetric distribution). So ρ=0. But Y=X² — knowing X you know Y exactly. Completely dependent, yet ρ=0." → TB-R01 → Gate
- INCORRECT → TB-R01 → Gate
- NO_RESPONSE → "Cov(X,Y)=3, Var(X)=9, Var(Y)=4. Compute ρ. [ρ=3/(3·2)=3/6=0.5.] If you change units so Y is in different units making SD(Y)=10 instead: does ρ change? [ρ=Cov·(scale_Y)/(SD(X)·10·SD(Y)/SD(Y))... actually ρ uses SD, which also scales: new ρ=(3·scale_Y)/(3·10)=... wait, let me think. If Y → Y/5, then Cov(X,Y/5)=Cov(X,Y)/5=3/5, SD(Y/5)=SD(Y)/5=2/5. ρ=(3/5)/(3·2/5)=(3/5)/(6/5)=3/6=0.5. Unchanged!]" → TB-R01 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 CORRELATION-ZERO-MEANS-INDEPENDENT):**
Step 1 — "Independence → uncorrelated (ρ=0): if X⊥Y, then Cov(X,Y)=E[XY]−E[X]E[Y]=E[X]E[Y]−E[X]E[Y]=0."
Step 2 — "Uncorrelated → independent? NO. Counter-example: X~Uniform(−1,1), Y=X²: ρ=0 but Y is completely determined by X."
Step 3 — "ρ only measures LINEAR association. If the true relationship is nonlinear (quadratic, circular, etc.), ρ can be zero even when the dependence is strong. Tools that capture all dependence: mutual information, Spearman rank correlation, distance correlation."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Cov(X,Y)=6, Var(X)=9, Var(Y)=16. Compute ρ(X,Y).
2. X and Y are i.i.d. with variance σ². Compute Var(X−Y). What is ρ(X+Y, X−Y)?
3. If ρ(X,Y)=0.8, SD(X)=3, SD(Y)=5, compute Var(2X+3Y).
4. X~Uniform(0,1). Let Y=1−X. Compute ρ(X,Y). (Expected: −1, since Y is a strictly decreasing linear function of X.)
5. True or false: if X+Y has the same distribution as X−Y, then ρ(X,Y)=0. Prove or give a counterexample.

**P55 — Reflect & Consolidate:** "ρ=Cov/(SD·SD) ∈[−1,1]. ρ=±1: perfect linear relationship. ρ=0: uncorrelated (not necessarily independent). Var(X+Y)=Var(X)+2ρ·SD(X)·SD(Y)+Var(Y). Scale-invariant: changing units doesn't change ρ."

**P76 — Transfer Probe (Cross-link mode: math.stats.correlation):**
(a) Sample correlation r = ∑(xᵢ−x̄)(yᵢ−ȳ) / (√∑(xᵢ−x̄)² · √∑(yᵢ−ȳ)²). This is the plug-in estimator of ρ using sample means and sample deviations. For n=2 data points: what is r always equal to? (±1, because two points always determine a line.) (b) Anscombe's quartet: four datasets with nearly identical r≈0.816, nearly identical means and variances, but radically different scatter plots (linear, quadratic, outlier-driven, vertical line + outlier). What does this say about r as a summary statistic? (c) Pearson vs Spearman: Pearson r measures linear association; Spearman rank correlation measures monotone association (replace values with ranks, then compute r). When would you prefer Spearman? When would Pearson fail but Spearman work?

**P75 — Mastery Assessment:**
"Portfolio variance: hold fraction w in asset X (mean μ_X, SD σ_X) and (1−w) in asset Y (mean μ_Y, SD σ_Y), correlation ρ. The portfolio return is R=wX+(1−w)Y. (a) Compute E[R] and Var(R). (b) For what w is Var(R) minimised? (Differentiate Var(R) with respect to w and set to zero.) (c) If ρ=−1: what does the minimum variance equal? What is the optimal w? Interpret: can you eliminate risk entirely when ρ=−1?"

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW Var(X+Y) formula and ρ=0 ≠ independence
- Score ≤ 3/5 → PREREQUISITE GAP in math.prob.covariance; reassign

**P78 — Completion:** Correlation certified. Student computes ρ; interprets ±1 as perfect linear; understands ρ=0 ≠ independent; applies Var(X+Y) formula; connects to Anscombe's quartet and portfolio theory.

## Component 8 — P76 Transfer Probe Detail
**Mode: Cross-link** (cross_links = [math.stats.correlation])
Target: Sample correlation r; Anscombe's quartet; Spearman vs Pearson; portfolio variance
Skill tested: Connect population correlation to sample estimation and practical limitations

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
