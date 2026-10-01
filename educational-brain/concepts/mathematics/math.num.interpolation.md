# math.num.interpolation

## Identity
- **KG id**: `math.num.interpolation`
- **Domain**: math.num
- **Requires**: `math.alg.polynomial`, `math.linalg.linear-system`
- **Unlocks**: `math.num.splines`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 5

## Learning Objective
Given $n+1$ data points with distinct $x$-values, construct the UNIQUE degree-$\le n$ interpolating
polynomial via the Lagrange form $L(x)=\sum_iy_i\prod_{j\ne i}\frac{x-x_j}{x_i-x_j}$, recognizing
each basis term as a deliberately engineered indicator — NEVER an arbitrary-looking formula; verify
uniqueness by recognizing interpolation IS solving an $(n+1)\times(n+1)$ Vandermonde linear system —
NEVER a separate, unrelated technique from `math.linalg.linear-system`; and recognize (orientation
level) Runge's phenomenon — more equally-spaced points can make the fit BETWEEN points WORSE, NEVER
assumed to automatically improve accuracy.

## Core Understanding
EACH LAGRANGE BASIS TERM IS AN ENGINEERED INDICATOR — NEVER AN ARBITRARY FORMULA: for nodes
$x_0,\dots,x_n$, $\ell_i(x)=\prod_{j\ne i}\frac{x-x_j}{x_i-x_j}$ is built so $\ell_i(x_i)=1$ and
$\ell_i(x_k)=0$ for $k\ne i$ (the numerator contains the factor $(x-x_k)$, vanishing at $x_k$).
For $(1,2),(2,3),(4,7)$: $\ell_0(x)=\frac{(x-2)(x-4)}{3}$, $\ell_1(x)=\frac{(x-1)(x-4)}{-2}$,
$\ell_2(x)=\frac{(x-1)(x-2)}{6}$; checking $L(1)=2\ell_0(1)+3\ell_1(1)+7\ell_2(1)=2\cdot1+3\cdot0+
7\cdot0=2$ — ONLY the $i=0$ term survives at $x=1$, confirming each $\ell_i$ purely isolates its
own node's $y$-value.

INTERPOLATION IS SOLVING A LINEAR SYSTEM IN DISGUISE — NEVER A SEPARATE, UNRELATED TECHNIQUE: for
the SAME points $(1,2),(2,3),(4,7)$, writing $p(x)=c_0+c_1x+c_2x^2$ and demanding $p(x_i)=y_i$
gives the $3\times3$ Vandermonde system $c_0+c_1+c_2=2$, $c_0+2c_1+4c_2=3$, $c_0+4c_1+16c_2=7$ —
solving it (via `math.linalg.linear-system`'s methods) yields the IDENTICAL polynomial found via
Lagrange, just in standard-form coefficients. Because the $x_i$ are distinct, this system's matrix
is invertible (certified by `math.linalg.linear-system`'s rank criterion), so the interpolating
polynomial of degree $\le n$ is genuinely UNIQUE — never merely "a" solution among several.

MORE EQUALLY-SPACED POINTS CAN MAKE THE FIT WORSE — NEVER ASSUMED TO ALWAYS IMPROVE ACCURACY
(RUNGE'S PHENOMENON, ORIENTATION LEVEL): interpolating $f(x)=\frac{1}{1+25x^2}$ at 5 equally-spaced
points on $[-1,1]$ gives a reasonable fit; interpolating at 15 equally-spaced points produces WILD
oscillations near $x=\pm1$ that overshoot far beyond $f$'s actual range — even though the
polynomial passes through all 15 points EXACTLY. Matching every sample point exactly is NEVER the
same as tracking the true function well BETWEEN the points; more matched data can make the fit
BETWEEN points strictly worse near the edges.

## Mental Models
- **"Each Lagrange basis term is a switch — on (=1) at exactly its own node, off (=0) everywhere
  else — never an arbitrary-looking piece of algebra."**
- **"Interpolation is a linear system wearing a convenient disguise — the Lagrange form solves the
  same Vandermonde system without ever writing the matrix down."**
- **"Passing through every sample point exactly says nothing about the fit between them — more
  equally-spaced points can make that gap worse, never automatically better."**

## Why Students Fail

### MC-1: LAGRANGE-FORM-ASSUMED-ARBITRARY
- **Surface form**: believes the Lagrange formula is an arbitrary-looking expression with no clear
  reason it passes through the data points.
- **Birth type**: Foundational severity (Blueprint's own declared severity).
- **Repair**: re-walk the indicator-function verification that $\ell_1(1)=\ell_2(1)=0$ and
  $\ell_0(1)=1$, re-anchoring on "each $\ell_i$ is engineered to be 1 at its own node and 0
  elsewhere."

### MC-2: INTERPOLATION-ASSUMED-UNRELATED-TO-LINEAR-SYSTEMS
- **Surface form**: believes polynomial interpolation is a separate technique from solving linear
  systems.
- **Birth type**: High severity (Blueprint's own declared severity).
- **Repair**: re-walk the Vandermonde-system setup for the same 3-point data, re-anchoring on
  "interpolation IS solving a linear system, just expressed in a convenient basis."

### MC-3: MORE-POINTS-ASSUMED-TO-ALWAYS-IMPROVE-FIT
- **Surface form**: believes more equally-spaced interpolation points always produce a more
  accurate fit.
- **Birth type**: Moderate severity (Blueprint's own declared severity).
- **Repair**: re-walk the 5-point-versus-15-point oscillation demonstration, re-anchoring on
  "matching every sample point exactly is not the same as tracking the function well between the
  points."

## Misconceptions

### MC-1: LAGRANGE-FORM-ASSUMED-ARBITRARY
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: INTERPOLATION-ASSUMED-UNRELATED-TO-LINEAR-SYSTEMS
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: MORE-POINTS-ASSUMED-TO-ALWAYS-IMPROVE-FIT
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A Lagrange basis term is a spotlight aimed at exactly one node — never a generic, unfocused
  beam covering everything equally."**
- **Anti-analogy**: hitting every checkpoint exactly is not the same as running a smooth route
  between them — a high-degree interpolant can nail every sample point while swinging wildly in
  between, especially near the edges.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the explicit 3-point Lagrange basis construction and the
  indicator-property check at $x=1$.
- **Demonstration 2 (targets MC-2)**: the Vandermonde-system setup for the identical 3-point data,
  yielding the same polynomial.
- **Demonstration 3 (targets MC-3)**: the 5-point-versus-15-point Runge's-phenomenon oscillation
  contrast for $f(x)=1/(1+25x^2)$.

## Discovery Questions
1. "Is the Lagrange formula an arbitrary-looking expression, or is there a clear reason it passes
   through every data point?"
2. "Is polynomial interpolation a completely separate technique from solving linear systems?"
3. "Does adding more equally-spaced interpolation points always produce a more accurate fit to the
   underlying function?"

## Teaching Sequence
1. **Representation shift**: the engineered-indicator Lagrange construction, working Demonstration
   1, isolating MC-1.
2. **Conflict evidence**: the Vandermonde-system equivalence, working Demonstration 2, isolating
   MC-2.
3. **Contrast pair**: the 5-versus-15-point Runge's-phenomenon oscillation, working Demonstration
   3, isolating MC-3.
4. **Mastery gate**: require a correct Lagrange basis construction, a correct linear-system
   framing of uniqueness, and a correct qualitative Runge's-phenomenon risk assessment, at the
   Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept the Lagrange formula described as arbitrary or unmotivated.
- Never accept interpolation treated as unrelated to solving linear systems.
- Never accept "more equally-spaced points always improve the fit" without qualification.

## Voice Teaching Notes
- Say "what is this basis term equal to at its own node, and at every other node?" whenever the
  Lagrange form is introduced.
- Ask "have you set up the linear system these conditions actually are?" whenever uniqueness of
  the interpolant is claimed without justification.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly constructs Lagrange basis polynomials for a small
  data set.
- **Rung 2 (application)**: learner correctly sets up the Vandermonde system for a given data set
  and explains why its invertibility guarantees uniqueness.
- **Rung 3 (transfer)**: learner correctly evaluates the risk of high-degree equally-spaced
  interpolation, citing Runge's phenomenon.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the indicator-function verification.
- If MC-2 recurs, re-walk the Vandermonde-system setup.
- If MC-3 recurs, re-walk the 5-versus-15-point oscillation demonstration.

## Memory Hooks
- "Each Lagrange term is a switch — on at its own node, off everywhere else."
- "Interpolation is a linear system in disguise — the Vandermonde system guarantees uniqueness."
- "Matching every point exactly says nothing about the fit between them — more points can make it
  worse, never automatically better."

## Transfer Connections
- `math.alg.polynomial` (already authored, certified domain): supplies the standard-form
  coefficient representation used in the Vandermonde-system derivation.
- `math.linalg.linear-system` (already authored, certified domain): supplies the rank-based
  unique/inconsistent/dependent classification directly certifying the Vandermonde system's unique
  solvability.
- `math.num.splines` (unlocked by this concept, not yet authored): will build on the Runge's-
  phenomenon caution by using piecewise low-degree polynomials instead of one high-degree
  interpolant.

## Cross-Subject Connections
- Sensor-data interpolation (engineering): fitting a single high-degree polynomial to many equally
  spaced sensor readings is a documented practical pitfall directly explained by Runge's
  phenomenon.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.num.interpolation.md`, reused by reference
  for its 3-point Lagrange construction, its Vandermonde-system equivalence demonstration, its
  Runge's-phenomenon oscillation example, and its three-misconception registry (severity levels
  adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on a 4-point sensor-reading
  interpolation, constructing a Lagrange basis term and evaluating a 50-point degree-49 polynomial
  proposal against Runge's phenomenon.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Stale Blueprint metadata (unlocks field) — corrected using live KG**: the Blueprint's
  Component 0 table and Component 7 both state "Unlocks: none" / "none listed in the KG for this
  concept." Direct verification against the live KG shows `unlocks: ["math.num.splines"]` — this
  concept DOES unlock `math.num.splines` in the current KG. This EB file's Identity section and
  Transfer Connections use the live KG's correct value, not the Blueprint's stale claim. All other
  fields (requires `math.alg.polynomial`/`math.linalg.linear-system`, cross_links none,
  proficient/apply, mastery_threshold 0.85, estimated_hours 5) were directly verified against the
  live KG and match exactly.

## Version History
- 2026-09-19 (Batch 202): authored. Second entry this batch. Companion batch concept:
  `math.num.newtons-method`. Blueprint's stale `unlocks` field corrected against live KG (see
  Curriculum Feedback).
