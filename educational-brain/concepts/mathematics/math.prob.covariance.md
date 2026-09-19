# math.prob.covariance

## Identity
- **KG id**: `math.prob.covariance`
- **Domain**: math.prob
- **Requires**: `math.prob.variance`, `math.prob.joint-distribution`
- **Unlocks**: `math.prob.correlation`
- **Cross-links**: `math.stats.covariance-matrix`
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Define $\mathrm{Cov}(X,Y)=E[(X-\mu_X)(Y-\mu_Y)]$ and apply the shortcut
$\mathrm{Cov}(X,Y)=E[XY]-E[X]E[Y]$; interpret the SIGN correctly (positive: move together;
negative: move oppositely — never reversed); and prove independence implies zero covariance
while the CONVERSE FAILS (zero covariance never implies independence — covariance detects only
linear co-movement).

## Core Understanding
THE COVARIANCE SIGN MUST NEVER BE REVERSED: for a joint PMF with $X=3$ (above its mean 2.4)
occurring disproportionately WITH $Y=4$ (above its mean 3.4): $\mathrm{Cov}(X,Y)=8.6-(2.4)(3.4)
=0.44$, POSITIVE — the two variables tend to be simultaneously HIGH together. REVERSING the
pairing (same marginals, but $X=1$ now paired disproportionately with $Y=4$) flips the sign to
EXACTLY $-0.44$ — confirming positive means "same side of their means together," negative means
"opposite sides," and reversing the pairing structure reverses the sign predictably, never
arbitrarily.

ZERO COVARIANCE NEVER IMPLIES INDEPENDENCE — COVARIANCE ONLY DETECTS LINEAR CO-MOVEMENT: let $X$
take values $-1,0,1$ each with probability $1/3$, and $Y=X^2$ (Y is COMPLETELY, deterministically
determined by $X$ — about as dependent as two variables can be). $E[X]=0$, $E[XY]=E[X^3]=0$,
giving $\mathrm{Cov}(X,Y)=0-0\cdot\frac23=0$ — EXACTLY zero, despite $Y$ being a deterministic
function of $X$. Independence DOES imply zero covariance (since independence gives $E[XY]=E[X]
E[Y]$) — but the CONVERSE genuinely fails: covariance is sensitive ONLY to linear co-movement
tendencies, and this symmetric, quadratic dependence produces none, making it completely
INVISIBLE to covariance despite being real and strong.

THE SHORTCUT REQUIRES CORRECTLY COMPUTED MARGINALS — NEVER JOINT PROBABILITIES USED DIRECTLY: to
compute $E[X]$ from a joint PMF, you must FIRST find the marginal $P(X=x)=\sum_yp(x,y)$ (summing
over ALL values of $y$ for that fixed $x$) — NEVER use a single joint probability value directly
as if it were the marginal. This is the SAME marginal-computation discipline established in
`math.prob.joint-distribution` — covariance's shortcut formula $E[XY]-E[X]E[Y]$ is only correct
when $E[X]$ and $E[Y]$ are genuinely the marginal expectations, computed properly.

## Mental Models
- **"Positive covariance: same side of the mean together. Negative: opposite sides. The sign
  flips exactly when the pairing structure flips."**
- **"Covariance is a linear-co-movement detector — a real, strong, but symmetric or nonlinear
  dependence can sail right past it undetected."**
- **"The shortcut formula only works with genuine marginal expectations — never a joint
  probability substituted in by mistake."**

## Why Students Fail

### MC-1: ZERO-COVARIANCE-ASSUMED-TO-IMPLY-INDEPENDENCE
- **Surface form**: believes $\mathrm{Cov}(X,Y)=0$ implies $X$ and $Y$ are independent, missing
  that covariance only detects linear co-movement.
- **Birth type**: Foundational severity (Blueprint's own declared severity — arguably the single
  most consequential misconception in applied statistics).
- **Repair**: re-walk the $Y=X^2$ construction, zero covariance yet completely dependent.

### MC-2: COVARIANCE-SIGN-INTERPRETATION-REVERSED
- **Surface form**: reverses the interpretation of covariance's sign, believing negative
  covariance means the variables move together.
- **Birth type**: Foundational severity (Blueprint's own declared severity — a genuinely wrong
  numeric conclusion, not a minor slip).
- **Repair**: re-walk the paired positive-versus-negative joint-distribution contrast.

### MC-3: COVARIANCE-SHORTCUT-FORMULA-COMPUTED-WITH-WRONG-MARGINALS
- **Surface form**: computes $E[X]$ or $E[Y]$ incorrectly from the joint distribution, using
  joint probabilities directly instead of first finding the correct marginal.
- **Birth type**: Moderate severity (Blueprint's own declared severity — a computational slip
  rather than a conceptual confusion).
- **Repair**: re-walk the explicit marginal computation before applying the shortcut.

## Misconceptions

### MC-1: ZERO-COVARIANCE-ASSUMED-TO-IMPLY-INDEPENDENCE
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: COVARIANCE-SIGN-INTERPRETATION-REVERSED
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-3: COVARIANCE-SHORTCUT-FORMULA-COMPUTED-WITH-WRONG-MARGINALS
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Covariance is a compass pointing 'together' or 'apart' — but it's blind to a partner
  circling you in a perfect but symmetric pattern; that relationship registers as zero."**
- **Anti-analogy**: zero covariance is not a certificate of independence — it only certifies the
  absence of ONE specific kind of relationship (linear co-movement), never all relationships.

## Demonstrations
- **Demonstration 1 (targets MC-2)**: the paired positive-versus-negative joint-distribution
  computation.
- **Demonstration 2 (targets MC-1)**: the $Y=X^2$ zero-covariance-despite-total-dependence
  construction.
- **Demonstration 3 (targets MC-3)**: the explicit marginal computation preceding the shortcut
  formula application.

## Discovery Questions
1. "If $\mathrm{Cov}(X,Y)=0$, does that mean $X$ and $Y$ are independent?"
2. "Does a negative covariance mean the variables tend to move together?"
3. "Can you compute $E[X]$ from a joint distribution using a single joint probability value
   directly?"

## Teaching Sequence
1. **Representation shift**: the covariance shortcut formula applied to a joint PMF, working
   Demonstration 3, isolating MC-3.
2. **Contrast pair**: the paired positive-versus-negative sign interpretation, working
   Demonstration 1, isolating MC-2.
3. **Conflict evidence**: the $Y=X^2$ zero-covariance-with-dependence construction, working
   Demonstration 2, isolating MC-1.
4. **Mastery gate**: require a correct covariance computation via the shortcut, a correct sign
   interpretation, and a correct construction of a dependent-but-zero-covariance example, at the
   Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept zero covariance treated as proof of independence.
- Never accept covariance's sign interpretation reversed.
- Never accept a joint probability value used directly in place of a genuine marginal
  expectation.

## Voice Teaching Notes
- Say "does zero covariance rule out ALL dependence, or just one specific kind?" whenever zero
  covariance is interpreted.
- Ask "have you found the actual marginal first, or are you using a joint value directly?"
  whenever the shortcut formula is applied.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes covariance via the shortcut formula from a
  joint PMF.
- **Rung 2 (application)**: learner correctly interprets the sign of a computed covariance.
- **Rung 3 (transfer)**: learner correctly constructs or explains an example of dependent
  variables with zero covariance.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the $Y=X^2$ construction.
- If MC-2 recurs, re-walk the paired positive-versus-negative contrast.
- If MC-3 recurs, re-walk the explicit marginal computation.

## Memory Hooks
- "Zero covariance rules out linear co-movement only — never all dependence."
- "Positive: same side together. Negative: opposite sides. Flip the pairing, flip the sign."
- "Find the marginal first — never use a joint value as if it were one."

## Transfer Connections
- `math.prob.variance` (already authored, certified domain): supplies the
  $E[X^2]-(E[X])^2$ shortcut pattern this concept's own shortcut directly parallels.
- `math.prob.joint-distribution` (already authored, this campaign, Batch 197): supplies the
  joint PMF/PDF and marginal-computation machinery this concept's $E[XY]$ computation is built
  from.
- `math.prob.correlation` (not yet authored, KG's declared unlock): the normalized version of
  covariance, dividing by the standard deviations.
- `math.stats.covariance-matrix`: KG-declared cross-link, currently unauthored (see Curriculum
  Feedback).

## Cross-Subject Connections
- Finance: portfolio risk analysis relies on covariance between asset returns, with the
  zero-covariance-doesn't-mean-unrelated caution directly relevant to risk assessment.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.covariance.md`, reused by reference
  for its shortcut-formula computation, its paired sign-interpretation contrast, its $Y=X^2$
  zero-covariance construction, and its three-misconception registry (severity levels adopted
  directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a financial analyst interpreting
  near-zero covariance between two stocks' returns, correctly declining to conclude the stocks
  are unrelated.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.prob.variance`/`math.prob.joint-distribution`, unlocks `math.prob.correlation`,
  cross_links `math.stats.covariance-matrix`, proficient/apply, mastery_threshold 0.85,
  estimated_hours 4) was directly verified against the live KG and matches exactly.
  `math.stats.covariance-matrix` independently re-confirmed NOT YET authored, exactly matching
  the Blueprint's own correctly scoped independence-mode transfer probe.

## Version History
- 2026-09-19 (Batch 198): authored. First entry this batch. Companion batch concept:
  `math.prob.conditional-distribution`.
