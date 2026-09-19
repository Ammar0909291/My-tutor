# math.prob.marginal-distribution

## Identity
- **KG id**: `math.prob.marginal-distribution`
- **Domain**: math.prob
- **Requires**: `math.prob.joint-distribution`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 3

## Learning Objective
Compute the marginal PMF/PDF of $X$ by summing/integrating OUT the other variable —
$p_X(x)=\sum_yp_{X,Y}(x,y)$ or $f_X(x)=\int f_{X,Y}(x,y)\,dy$; recognize the joint is recoverable
from marginals ONLY when $X,Y$ are independent, NEVER in general; and distinguish marginalization
(averaging OUT the other variable) from conditioning (FIXING the other variable at a specific
value and normalizing) — NEVER the same procedure.

## Core Understanding
THE JOINT IS RECOVERABLE FROM MARGINALS ONLY UNDER INDEPENDENCE — NEVER IN GENERAL: two joint
distributions can share the SAME marginals while being entirely different. Let $X,Y\in\{0,1\}$:
Joint A: $p(0,0)=p(1,1)=1/2$, $p(0,1)=p(1,0)=0$ (X and Y ALWAYS equal — perfectly correlated).
Joint B: $p(0,0)=p(0,1)=p(1,0)=p(1,1)=1/4$ (X and Y INDEPENDENT). BOTH have $p_X(0)=p_X(1)=1/2$
and $p_Y(0)=p_Y(1)=1/2$ — IDENTICAL marginals, yet radically DIFFERENT joint behavior. Believing
knowing $p_X$ and $p_Y$ fully determines $p_{X,Y}$ is WRONG — marginals describe INDIVIDUAL
behavior; the joint describes how $X$ and $Y$ move TOGETHER; the recovery rule
$p_{X,Y}=p_X\cdot p_Y$ holds ONLY when $X\perp Y$ (independence), never automatically.

MARGINALIZATION FOR A CONTINUOUS JOINT REQUIRES INTEGRATING OVER ALL $y$ — NEVER EVALUATING AT A
SINGLE FIXED VALUE: for $f_{X,Y}(x,y)=6xy^2$ on $0<x<1,0<y<1$: $f_X(x)=\int_0^16xy^2\,dy=
6x[y^3/3]_0^1=6x(1/3)=2x$ for $0<x<1$ (verified: $\int_0^12x\,dx=1$ ✓). Computing the marginal by
evaluating the joint at a SPECIFIC $y_0$ (writing $f_X(x)=f_{X,Y}(x,y_0)$ for some fixed $y_0$)
is WRONG — that procedure describes something else entirely (a slice of the joint, related to but
distinct from conditioning); marginalization genuinely requires INTEGRATING over ALL values of
$y$, never evaluating at just one.

MARGINAL AND CONDITIONAL ARE DIFFERENT PROCEDURES — NEVER THE SAME COMPUTATION: the MARGINAL
$p_X(x)=\sum_yp_{X,Y}(x,y)$ sums OVER ALL values of $y$ — it AVERAGES $Y$ out entirely, giving
the UNCONDITIONAL distribution of $X$. The CONDITIONAL $p_{X\mid Y}(x\mid y_0)=
p_{X,Y}(x,y_0)/p_Y(y_0)$ FIXES $Y=y_0$ at one specific value and NORMALIZES by $p_Y(y_0)$ — it
describes $X$'s distribution GIVEN a specific observed $Y$. Writing $p_X(x)=p_{X,Y}(x,y)/p_Y(y)$
for the marginal (confusing it with the conditional formula) is WRONG — the marginal involves NO
fixing of $y$ and NO division by $p_Y$; it is a genuinely different quantity from the conditional.

## Mental Models
- **"Marginal is a row or column sum written literally in the margins of a joint table — hence
  the name."**
- **"Marginals tell you about X and Y separately; the joint tells you how they move together —
  you can never rebuild the joint from marginals unless they're independent."**
- **"Marginal averages Y away entirely; conditional freezes Y at one value and rescales — never
  the same operation."**

## Why Students Fail

### MC-1: MARGINALS-DETERMINE-THE-JOINT
- **Surface form**: believes knowing $p_X$ and $p_Y$ fully determines $p_{X,Y}$, not knowing the
  joint is only recoverable from marginals when $X,Y$ are independent.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — the factorization
  $p_{X,Y}=p_X\cdot p_Y$ holds FOR independent $X,Y$; students generalize this to all pairs).
- **Repair**: re-present the Joint-A-versus-Joint-B counter-example, confirming identical
  marginals with radically different joint dependence structures.

### MC-2: MARGINAL-IS-THE-CONDITIONAL
- **Surface form**: confuses $p_X(x)$ (the unconditional, marginal distribution of $X$) with
  $p_{X\mid Y}(x\mid y)$ (the distribution of $X$ given $Y=y$); writes
  $p_X(x)=p_{X,Y}(x,y)/p_Y(y)$ for the marginal.
- **Birth type**: language contamination (Blueprint's own declared birth type — both involve
  "the distribution of $X$ in a joint setting"; the difference is whether $Y$ is observed
  (conditional) or averaged out (marginal)).
- **Repair**: re-contrast the summing-over-all-$y$ marginal formula against the fix-$y$-and-
  normalize conditional formula, explicitly.

### MC-3: INTEGRATING-TO-GET-MARGINAL-IS-OPTIONAL
- **Surface form**: computes the marginal of a continuous distribution by evaluating the joint at
  a specific $y$ value rather than integrating; writes $f_X(x)=f_{X,Y}(x,y_0)$ for some fixed
  $y_0$.
- **Birth type**: instruction-induced (Blueprint's own declared birth type — for conditional
  distributions, you do fix $y$ and normalize; students confuse this procedure with
  marginalization, which requires integration).
- **Repair**: re-derive the marginal via full integration over $y$, verifying the result
  integrates to 1 over $x$.

## Misconceptions

### MC-1: MARGINALS-DETERMINE-THE-JOINT
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-2: MARGINAL-IS-THE-CONDITIONAL
- **Surface form**: as described above.
- **Root cause (language contamination)**: as described above.
- **Repair**: as described above.

### MC-3: INTEGRATING-TO-GET-MARGINAL-IS-OPTIONAL
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Marginals are a photo's silhouette from two separate angles — you can't reconstruct the full
  3D shape (the joint) from two silhouettes alone, unless the shape happens to be a simple box
  (independence)."**
- **Anti-analogy**: computing a marginal by evaluating the joint at one $y$ value is like judging
  a whole month's rainfall from a single day's reading — you need to add up (integrate) every
  day, never just sample one.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the Joint-A (perfectly correlated) versus Joint-B
  (independent) identical-marginals counter-example.
- **Demonstration 2 (targets MC-3)**: the $f_{X,Y}(x,y)=6xy^2$ full-integration marginal
  derivation.
- **Demonstration 3 (targets MC-2)**: the sum-over-all-$y$ marginal versus fix-$y$-and-normalize
  conditional formula contrast.

## Discovery Questions
1. "If you know p_X and p_Y separately, do you automatically know the full joint p_{X,Y}?"
2. "To find the marginal of a continuous joint distribution, do you evaluate at one y value or
   integrate over all y?"
3. "Is the marginal distribution of X the same thing as the conditional distribution of X given
   Y=y?"

## Teaching Sequence
1. **Pattern induction**: the row/column-sum table example, motivating the "marginal" name.
2. **Conflict evidence**: the Joint-A-versus-Joint-B identical-marginals counter-example, isolating
   MC-1.
3. **Contrast pair**: the sum-versus-fix-and-normalize marginal/conditional distinction, isolating
   MC-2.
4. **Reused procedure**: the full-integration continuous-marginal derivation, isolating MC-3.
5. **Mastery gate**: require a correct table-based marginal computation, a correct continuous
   marginal via integration, and a correct marginal-versus-conditional distinction, at the
   Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a claim that marginals alone determine the joint distribution, without checking
  independence.
- Never accept a continuous marginal computed by evaluating at a single $y$ value.
- Never accept the marginal formula confused with the conditional formula.

## Voice Teaching Notes
- Say "does p_{X,Y} equal p_X times p_Y for every pair, or only when independent?" whenever
  marginals are used to infer the joint.
- Ask "are you summing/integrating over all y, or fixing y at one value?" whenever a marginal is
  being computed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes marginals from a joint PMF table via
  row/column sums.
- **Rung 2 (application)**: learner correctly computes a continuous marginal via integration and
  verifies it integrates to 1.
- **Rung 3 (transfer)**: learner correctly distinguishes marginalization from conditioning in a
  novel joint-distribution scenario, and identifies when independence permits joint recovery.

## Tutor Recovery Strategy
- If MC-1 recurs, re-present the Joint-A-versus-Joint-B counter-example.
- If MC-2 recurs, re-contrast the marginal and conditional formulas explicitly.
- If MC-3 recurs, re-derive the marginal via full integration.

## Memory Hooks
- "Marginals are row/column sums — literally in the table's margins."
- "Same marginals, different joints — unless independent, never recoverable."
- "Marginal integrates over all y; conditional fixes y and normalizes — never the same."

## Transfer Connections
- `math.prob.joint-distribution` (already authored, certified domain): supplies the joint
  PMF/PDF this concept sums or integrates out a variable from.

## Cross-Subject Connections
- Machine learning (naïve Bayes): the conditional-independence assumption $P(\text{features}\mid
  \text{label})=\prod P(\text{feature}_i\mid\text{label})$ directly exploits the
  joint-versus-marginal distinction to simplify computation.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.prob.marginal-distribution.md`, reused by
  reference for its joint-PMF-table row/column-sum example, its continuous-density integration
  example, its Joint-A/Joint-B counter-example, and its three-misconception registry (birth types
  adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on copulas, naïve Bayes conditional
  independence, and the Bayesian marginal likelihood integral.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.prob.joint-distribution`, unlocks none, cross_links none, proficient/apply,
  mastery_threshold 0.85, estimated_hours 3) was directly verified against the live KG and
  matches exactly.

## Version History
- 2026-09-19 (Batch 215): authored. Second entry this batch. Companion batch concept:
  `math.stats.bayesian-inference`.
