# math.prob.correlation

## Identity
- **KG id**: `math.prob.correlation`
- **Domain**: math.prob
- **Requires**: `math.prob.covariance`
- **Unlocks**: none
- **Cross-links**: `math.stats.correlation` (not yet authored in the EB corpus — see Curriculum
  Feedback)
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 3

## Learning Objective
Define $\rho(X,Y)=\text{Cov}(X,Y)/(SD(X)\cdot SD(Y))$ as a dimensionless measure of LINEAR
association in $[-1,1]$, NEVER just covariance rescaled by an arbitrary constant; recognize
$\rho=0$ means UNCORRELATED, NEVER independent — independence implies $\rho=0$ but never the
reverse; and apply $\text{Var}(X+Y)=\text{Var}(X)+2\text{Cov}(X,Y)+\text{Var}(Y)$.

## Core Understanding
NORMALIZING BY $SD(X)\cdot SD(Y)$ MAKES $\rho$ SCALE-INVARIANT — NEVER JUST A RESCALED COVARIANCE:
$\text{Cov}(X,Y)$ has UNITS (units of $X$ times units of $Y$) and its magnitude depends on the
scales chosen — $\text{Cov}(\text{height in cm},\text{weight in kg})\ne\text{Cov}(\text{height in
m},\text{weight in g})$ for the SAME data. Dividing by $SD(X)\cdot SD(Y)$ removes this
scale-dependence entirely: $\rho(aX+b,cY+d)=\text{sign}(ac)\cdot\rho(X,Y)$ for $a,c\ne0$ — changing
units does NOT change $\rho$. Treating $\rho$ as "just $\text{Cov}$ scaled by a constant" misses
that the normalizing constant ITSELF depends on $X$ and $Y$'s own scales, making $\rho$
scale-invariant while $\text{Cov}$ is not — never interchangeable up to a fixed constant.

$\rho=0$ MEANS UNCORRELATED — NEVER INDEPENDENT: independence DOES imply $\rho=0$ ($\text{Cov}
(X,Y)=E[XY]-E[X]E[Y]=E[X]E[Y]-E[X]E[Y]=0$ when $X\perp Y$), but the REVERSE is FALSE. Counter-
example: $X\sim\text{Uniform}(-1,1)$, $Y=X^2$: $\text{Cov}(X,Y)=E[X^3]-0=0$ (since $X^3$ is an odd
function of $X$ on a symmetric interval), so $\rho=0$. But $Y$ is a DETERMINISTIC function of
$X$ — knowing $X$ tells you $Y$ EXACTLY, completely dependent. $\rho$ only measures LINEAR
association; a strong NONLINEAR relationship (like this quadratic one) can produce $\rho=0$ while
genuine dependence remains — never assume $\rho=0$ rules out dependence.

VARIANCE OF A SUM REQUIRES THE COVARIANCE CROSS-TERM — NEVER JUST ADDING THE VARIANCES: $\text{Var}
(X+Y)=\text{Var}(X)+2\text{Cov}(X,Y)+\text{Var}(Y)=\text{Var}(X)+2\rho\cdot SD(X)\cdot SD(Y)+
\text{Var}(Y)$. If $\rho=0$: $\text{Var}(X+Y)=\text{Var}(X)+\text{Var}(Y)$ (a Pythagorean-like
addition). If $\rho=1$: $\text{Var}(X+Y)=(SD(X)+SD(Y))^2$ — the MAXIMUM possible variance. If
$\rho=-1$: $\text{Var}(X+Y)=(SD(X)-SD(Y))^2$, which can be ZERO if $SD(X)=SD(Y)$ — omitting the
$2\text{Cov}(X,Y)$ cross-term (assuming variances simply add regardless of correlation) is WRONG
whenever $X$ and $Y$ are correlated.

## Mental Models
- **"ρ divides out the units and scale that make covariance hard to compare across problems —
  never just a rescaled covariance by a fixed factor."**
- **"ρ=0 says the relationship isn't linear — it never says there's no relationship at all."**
- **"Var(X+Y) needs the covariance cross-term — never just adding the two variances, unless ρ
  happens to be zero."**

## Why Students Fail

### MC-1: CORRELATION-ZERO-MEANS-INDEPENDENT
- **Surface form**: concludes $X$ and $Y$ are independent whenever $\rho(X,Y)=0$, not knowing
  there exist dependent, uncorrelated random variables.
- **Birth type**: instruction-induced (Blueprint's own declared birth type — "independence implies
  $\rho=0$" is taught, and students invert this into "$\rho=0$ implies independence").
- **Repair**: re-present the $X\sim\text{Uniform}(-1,1)$, $Y=X^2$ counter-example, confirming
  $\rho=0$ despite complete dependence.

### MC-2: CORRELATION-MEASURES-ALL-DEPENDENCE
- **Surface form**: treats $\rho$ as a complete measure of dependence, not knowing $\rho$ only
  captures LINEAR association and can miss nonlinear dependencies.
- **Birth type**: language contamination (Blueprint's own declared birth type — "correlation" in
  everyday language means "any relationship," but in probability it means specifically linear
  association).
- **Repair**: re-anchor on "$\rho$ only measures linear association" using the same $Y=X^2$
  counter-example.

### MC-3: CORRELATION-AND-COVARIANCE-ARE-PROPORTIONAL
- **Surface form**: treats $\text{Cov}$ and $\rho$ as interchangeable up to a constant, not
  knowing the normalization by $SD(X)\cdot SD(Y)$ removes units and scale, making $\rho$
  dimensionless.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — students think "$\rho$
  is just Cov scaled by a constant" without recognizing the constant depends on $X$ and $Y$
  themselves).
- **Repair**: re-derive $\rho$'s scale invariance directly, showing a unit change leaves $\rho$
  unchanged while $\text{Cov}$ would change.

## Misconceptions

### MC-1: CORRELATION-ZERO-MEANS-INDEPENDENT
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-2: CORRELATION-MEASURES-ALL-DEPENDENCE
- **Surface form**: as described above.
- **Root cause (language contamination)**: as described above.
- **Repair**: as described above.

### MC-3: CORRELATION-AND-COVARIANCE-ARE-PROPORTIONAL
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"ρ is covariance converted to a universal currency — never covariance itself, which still
  carries the original units."**
- **Anti-analogy**: a correlation of zero is not a certificate of "no relationship" — it's a
  certificate of "no STRAIGHT-LINE relationship," and a perfect curve (like $Y=X^2$) can hide
  entirely inside that zero.

## Demonstrations
- **Demonstration 1 (targets MC-3)**: the unit-change scale-invariance computation for $\rho$
  versus $\text{Cov}$.
- **Demonstration 2 (targets MC-1/MC-2)**: the $X\sim\text{Uniform}(-1,1)$, $Y=X^2$
  zero-correlation-but-complete-dependence counter-example.
- **Demonstration 3**: the $\text{Var}(X+Y)$ decomposition across $\rho=0,1,-1$ cases.

## Discovery Questions
1. "If you change the units of X and Y, does ρ change the way covariance does?"
2. "If ρ(X,Y)=0, does that mean X and Y are independent?"
3. "Does Var(X+Y) always equal Var(X)+Var(Y), regardless of how X and Y are related?"

## Teaching Sequence
1. **Representation shift**: the covariance-to-correlation normalization, working Demonstration
   1, isolating MC-3.
2. **Reused procedure**: the zero-correlation-but-dependent counter-example, working
   Demonstration 2, isolating MC-1 and MC-2 jointly.
3. **Conceptual shift**: the variance-of-a-sum decomposition across correlation values, working
   Demonstration 3.
4. **Mastery gate**: require a correct $\rho$ computation, a correct explanation of why $\rho=0$
   doesn't imply independence, and a correct application of the variance-of-a-sum formula, at the
   Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept $\rho$ treated as covariance simply rescaled by a fixed constant.
- Never accept $\rho=0$ concluded to mean $X$ and $Y$ are independent.
- Never accept $\text{Var}(X+Y)$ computed by adding variances alone without the covariance
  cross-term.

## Voice Teaching Notes
- Say "would changing units change this number the way it would change covariance?" whenever
  correlation and covariance are being distinguished.
- Ask "does zero correlation rule out every kind of relationship, or just the linear kind?"
  whenever $\rho=0$ is interpreted.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes $\rho$ from given covariance and standard
  deviations.
- **Rung 2 (application)**: learner correctly explains why $\rho=0$ does not imply independence,
  using a counter-example.
- **Rung 3 (transfer)**: learner correctly applies the variance-of-a-sum formula in a portfolio or
  combined-variable scenario.

## Tutor Recovery Strategy
- If MC-1 or MC-2 recur, re-present the $Y=X^2$ counter-example.
- If MC-3 recurs, re-derive $\rho$'s scale invariance directly.

## Memory Hooks
- "ρ is scale-invariant — Cov is not; changing units never changes ρ."
- "ρ=0 means uncorrelated, never independent — Y=X² proves it."
- "Var(X+Y) needs the covariance cross-term — never just Var(X)+Var(Y) unless ρ=0."

## Transfer Connections
- `math.prob.covariance` (already authored, certified domain): supplies the covariance definition
  this concept normalizes into a dimensionless measure.

## Cross-Subject Connections
- Portfolio finance: the variance of a combined asset return directly uses this concept's
  $\text{Var}(X+Y)$ decomposition, with the correlation term determining diversification benefit.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.correlation.md`, reused by reference
  for its scale-invariance derivation, its $Y=X^2$ zero-correlation-but-dependent counter-example,
  its variance-of-a-sum decomposition, and its three-misconception registry (birth types adopted
  directly as declared).
- Transfer probe: the Blueprint's own cross-link-mode probe targets `math.stats.correlation`
  (sample correlation $r$, Anscombe's quartet, Pearson vs. Spearman) — see Curriculum Feedback for
  why this EB file instead uses an independence-mode probe on portfolio variance minimization,
  reusing the Blueprint's own P75 Mastery Assessment content.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Wrong-corpus-status cross-link claim — corrected using independence mode**: the Blueprint's
  Component 8 declares `P76_mode = Cross-link` targeting `math.stats.correlation`. Direct
  verification via `ls educational-brain/concepts/mathematics/math.stats.correlation.md` shows
  this target is NOT YET authored in the EB corpus (though it presumably existed on disk as a
  Blueprint at the time this Blueprint was written). Per this campaign's established discipline,
  a cross-link probe requires the target to be an authored EB concept; since it is not, this EB
  file's Transfer Connections and Blueprint References instead treat the probe in INDEPENDENCE
  mode, reusing the Blueprint's own P75 Mastery Assessment (portfolio variance minimization) as
  the transfer probe content, rather than the Blueprint's own P76 cross-link content (which
  depends on `math.stats.correlation` concepts like sample correlation $r$ and Anscombe's
  quartet, not yet available in this corpus). All other fields (requires `math.prob.covariance`,
  unlocks none, proficient/apply, mastery_threshold 0.85, estimated_hours 3) were directly
  verified against the live KG and match exactly.

## Version History
- 2026-09-19 (Batch 211): authored. Second entry this batch. Companion batch concept:
  `math.stats.anova`. Blueprint's cross-link mode (targeting unauthored `math.stats.correlation`)
  corrected to independence mode (see Curriculum Feedback).
