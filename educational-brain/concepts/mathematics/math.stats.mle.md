# math.stats.mle

## Identity
- **KG id**: `math.stats.mle`
- **Domain**: math.stats
- **Requires**: `math.stats.estimator`, `math.calc.derivative-rules`, `math.prob.pdf`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 6

## Learning Objective
Construct the likelihood $L(\theta)=\prod_if(x_i\mid\theta)$ and choose
$\hat\theta=\text{argmax}_\theta L(\theta)$; apply the log-likelihood trick — maximizing $\log
L(\theta)=\sum_i\log f(x_i\mid\theta)$ instead, valid because $\log$ is monotonically increasing —
NEVER differentiating the raw product directly; and find the MLE by setting the score
$\partial\log L/\partial\theta=0$ and SOLVING it, NEVER stopping at the derivative expression
itself, while recognizing MLEs are consistent, asymptotically normal, and asymptotically
efficient.

## Core Understanding
TAKE THE LOG FIRST — NEVER DIFFERENTIATE THE RAW PRODUCT-FORM LIKELIHOOD DIRECTLY: for data
$x_1,\dots,x_n$ from an exponential distribution with rate $\lambda$ (density $f(x\mid\lambda)=
\lambda e^{-\lambda x}$): $L(\lambda)=\prod_i\lambda e^{-\lambda x_i}=\lambda^ne^{-\lambda\sum
x_i}$, and $\log L(\lambda)=n\log\lambda-\lambda\sum x_i$ — converting the PRODUCT and the
exponential into a manageable SUM. Differentiating the ORIGINAL product-form $L(\lambda)$ directly
is a genuinely tedious product-rule-heavy calculation; taking the log FIRST is the standard,
dramatically more tractable route to the SAME answer (valid because $\log$ is monotonically
increasing, so the maximizing $\theta$ is identical for $L$ and $\log L$) — NEVER optional
convenience.

FINDING THE MLE REQUIRES SETTING THE SCORE TO ZERO AND SOLVING — NEVER STOPPING AT THE DERIVATIVE
EXPRESSION: continuing the exponential example, $\frac{\partial\log L}{\partial\lambda}=
\frac{n}{\lambda}-\sum x_i=0\Rightarrow\frac{n}{\lambda}=\sum x_i\Rightarrow\hat\lambda=
\frac{n}{\sum x_i}=\frac{1}{\bar x}$ (the reciprocal of the sample mean). Stopping after finding
the DERIVATIVE expression $\frac{n}{\lambda}-\sum x_i$ without actually SETTING it to zero and
solving for $\lambda$ leaves the MLE genuinely UNFOUND — the full solve step is required, never
just the score expression itself.

MLES CARRY THREE LARGE-SAMPLE GUARANTEES — CONSISTENCY IS WHAT JUSTIFIES TRUSTING THEM WITH MORE
DATA: MLEs are CONSISTENT (converge to the true parameter as $n\to\infty$), ASYMPTOTICALLY NORMAL
(their sampling distribution approaches normal for large $n$), and ASYMPTOTICALLY EFFICIENT
(achieving the lowest possible variance among consistent estimators, in the large-sample limit).
Consistency in particular is exactly the property that justifies using MLE with confidence for
large real-world datasets — more data genuinely means a more accurate estimate, never merely a
theoretical footnote.

## Mental Models
- **"Take the log before you differentiate — the product becomes a sum, and the maximizing θ
  never changes."**
- **"Finding the MLE isn't done until you've set the score to zero and solved — the derivative
  expression alone isn't an answer."**
- **"MLE's large-sample guarantees are why more data means a genuinely more trustworthy
  estimate."**

## Why Students Fail

### MC-1: RAW-PRODUCT-LIKELIHOOD-DIFFERENTIATED-DIRECTLY-INSTEAD-OF-TAKING-THE-LOG-FIRST
- **Surface form**: attempts to differentiate the raw product-form likelihood directly, rather
  than first converting to the log-likelihood sum for tractability.
- **Birth type**: Moderate severity (Blueprint's own declared severity — typically still leads to
  a correct, if far more laborious, result).
- **Repair**: re-derive the log-likelihood explicitly, showing the product-to-sum simplification.

### MC-2: SCORE-EXPRESSION-LEFT-UNSOLVED-INSTEAD-OF-SET-TO-ZERO-AND-SOLVED-FOR-THETA
- **Surface form**: stops at the derivative (score) expression without setting it to zero and
  solving for the parameter, leaving the MLE unfound.
- **Birth type**: Foundational severity (Blueprint's own declared severity — genuinely fails to
  produce an estimator at all).
- **Repair**: re-set the score expression to zero explicitly and re-solve algebraically for the
  parameter.

## Misconceptions

### MC-1: RAW-PRODUCT-LIKELIHOOD-DIFFERENTIATED-DIRECTLY-INSTEAD-OF-TAKING-THE-LOG-FIRST
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

### MC-2: SCORE-EXPRESSION-LEFT-UNSOLVED-INSTEAD-OF-SET-TO-ZERO-AND-SOLVED-FOR-THETA
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Taking the log of the likelihood is like taking the log of a huge multiplication problem —
  turning a nightmare of products into an easy sum, without changing where the peak is."**
- **Anti-analogy**: writing down the derivative and stopping there is like starting to solve an
  equation and never finishing — the score expression is a step, never the destination.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the exponential-distribution log-likelihood derivation,
  product-to-sum.
- **Demonstration 2 (targets MC-2)**: the full set-to-zero-and-solve procedure yielding
  $\hat\lambda=1/\bar x$.
- **Demonstration 3**: the three large-sample properties, connected to practical justification.

## Discovery Questions
1. "Would it be easier to differentiate the likelihood as a product, or take its log first?"
2. "Have you actually set the score to zero and solved for the parameter, or just written down
   the derivative?"
3. "Why would an MLE become more trustworthy as you collect more data?"

## Teaching Sequence
1. **Conceptual shift**: the log-transformation-before-differentiating procedure, working
   Demonstration 1, isolating MC-1.
2. **Representation shift**: the full set-to-zero-and-solve derivation, working Demonstration 2,
   isolating MC-2.
3. **Reused procedure**: the three large-sample guarantees and their practical justification,
   working Demonstration 3.
4. **Mastery gate**: require a correct log-likelihood construction, a correct full score-solving
   derivation, and a correct statement of MLE's large-sample properties, at the Blueprint's own
   stated MAMR of 5/5.

## Tutor Actions
- Never accept the raw product-form likelihood differentiated directly without first taking the
  log.
- Never accept a score expression left unsolved as if it were the MLE itself.
- Never accept MLE's large-sample properties omitted or stated incorrectly.

## Voice Teaching Notes
- Say "would taking the log make this easier to differentiate?" whenever a likelihood is being
  maximized.
- Ask "have you set that equal to zero and solved for the parameter yet?" whenever a score
  expression is presented as a final answer.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly constructs a log-likelihood from a given density.
- **Rung 2 (application)**: learner correctly sets the score to zero and solves for the MLE.
- **Rung 3 (transfer)**: learner correctly explains why taking the log is standard practice and
  why the MLE improves with more data, in a novel estimation scenario.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the log-likelihood explicitly.
- If MC-2 recurs, re-set the score expression to zero and re-solve algebraically.

## Memory Hooks
- "Log first, then differentiate — never the raw product."
- "Setting to zero and solving is the finish line — the derivative alone isn't the MLE."
- "Consistent, asymptotically normal, asymptotically efficient — MLE's three large-sample
  guarantees."

## Transfer Connections
- `math.stats.estimator` (already authored, this campaign, Batch 200): supplies the general
  estimator/estimate framework MLE is a specific, well-justified instance of.
- `math.calc.derivative-rules` (already authored, certified domain): supplies the differentiation
  needed to set the score to zero and solve.
- `math.prob.pdf` (already authored, certified domain): supplies the density function $f(x\mid
  \theta)$ the likelihood is built from.

## Cross-Subject Connections
- Genetics and epidemiology: estimating a Poisson mutation or infection rate from count data via
  MLE is a standard, widely used research technique.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.stats.mle.md`, reused by reference for its
  exponential-distribution log-likelihood derivation, its full score-solving example, its
  large-sample-properties summary, and its two-misconception registry (severity levels adopted
  directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a biologist estimating a Poisson
  mutation rate via MLE, explaining the log transformation and the consistency property.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.stats.estimator`/`math.calc.derivative-rules`/`math.prob.pdf`, unlocks none, cross_links
  none, proficient/apply, mastery_threshold 0.85, estimated_hours 6) was directly verified against
  the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 206): authored. First entry this batch. Companion batch concept:
  `math.stats.sufficient-statistic`.
