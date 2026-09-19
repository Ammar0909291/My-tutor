# math.fnal.bounded-operator

## Identity
- **KG id**: `math.fnal.bounded-operator`
- **Domain**: math.fnal
- **Requires**: `math.fnal.banach-space`, `math.linalg.linear-map`
- **Unlocks**: `math.fnal.spectral-theory`, `math.fnal.open-mapping-theorem`
- **Cross-links**: `math.linalg.linear-map`
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 5

## Learning Objective
Compute $\|T\|=\sup_{\|x\|\le1}\|Tx\|$ directly; recognize bounded and continuous are EXACTLY
EQUIVALENT for linear maps — NEVER two independent properties requiring separate checks; and
recognize $B(X,Y)$'s completeness depends ONLY on $Y$'s completeness — NEVER on $X$'s.

## Core Understanding
BOUNDED AND CONTINUOUS ARE THE SAME FACT FOR LINEAR MAPS — NEVER TWO INDEPENDENT PROPERTIES: for
$T(x,y)=(3x,y)$, $\|T\|=3$ (maximized at $(1,0)$). Then for ANY two points,
$\|T(x_1,y_1)-T(x_2,y_2)\|=\|T((x_1,y_1)-(x_2,y_2))\|\le3\|(x_1,y_1)-(x_2,y_2)\|$ — a direct
Lipschitz bound with the SAME constant $\|T\|=3$, immediately giving continuity everywhere.
Believing boundedness and continuity are two unrelated properties requiring separate verification
for a linear map is WRONG — linearity forces them together, since ONE global constant ($\|T\|$)
controls the behavior everywhere at once; this equivalence is special to linear maps and fails for
general nonlinear functions.

$B(X,Y)$'S COMPLETENESS DEPENDS ONLY ON $Y$'S COMPLETENESS — NEVER ON BOTH $X$ AND $Y$: for
$T_1(x,y)=(3x,y)$ ($\|T_1\|=3$) and $T_2(x,y)=(x,2y)$ ($\|T_2\|=2$) on $\mathbb{R}^2$:
$(T_1+T_2)(x,y)=(4x,3y)$, $\|T_1+T_2\|=4\le\|T_1\|+\|T_2\|=5$ (the operator-norm triangle
inequality). Since $Y=\mathbb{R}^2$ is Banach, $B(\mathbb{R}^2,\mathbb{R}^2)$ is GUARANTEED to be
Banach as well, REGARDLESS of $X$'s completeness. Assuming $B(X,Y)$'s Banach-space status depends
on both $X$ and $Y$ being complete is WRONG — a Cauchy sequence of operators is controlled
pointwise by where it sends vectors, landing in the (complete) TARGET space $Y$; $X$'s
completeness plays no role in this argument.

THE OPERATOR NORM IS A SUPREMUM OVER THE ENTIRE UNIT BALL — NEVER JUST THE BASIS VECTORS' IMAGES:
for $T(x,y)=(3x,y)$ restricted to $\|(x,y)\|\le1$: $\|T(x,y)\|=\sqrt{9x^2+y^2}$ is maximized at
$(1,0)$, giving $\|T\|=3$ — but $(1,0)$ IS a basis vector here only coincidentally; in general the
maximizing vector need not be a basis vector at all. Computing $\|T\|$ by checking only
$\|Te_1\|$ and $\|Te_2\|$ and taking their max is WRONG — the supremum must range over ALL unit
vectors, though basis knowledge (a linear map is fully determined by its basis images) does make
the computation tractable, never automatic.

## Mental Models
- **"The operator norm answers one question: what's the biggest factor T can stretch a length-1
  vector by?"**
- **"For a linear map, bounded and continuous are the same fact viewed two ways — one constant,
  ‖T‖, certifies both at once."**
- **"B(X,Y) being Banach transfers FROM Y alone — X's completeness never enters the argument."**

## Why Students Fail

### MC-1: BOUNDED-AND-CONTINUOUS-TREATED-AS-INDEPENDENT
- **Surface form**: believes boundedness and continuity are two unrelated properties requiring
  separate verification for a linear map, rather than recognizing they are exactly equivalent for
  linear maps specifically.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — for
  general, nonlinear functions, boundedness and continuity genuinely are unrelated, and this fact
  is overgeneralized to the linear case).
- **Repair**: re-walk Example 2's single Lipschitz inequality, showing the identical constant
  $\|T\|$ certifies both properties at once via linearity.

### MC-2: B-X-Y-COMPLETENESS-ASSUMED-TO-NEED-BOTH-SPACES-COMPLETE
- **Surface form**: assumes $B(X,Y)$'s status as a Banach space depends on both $X$ and $Y$ being
  complete, rather than recognizing it depends only on $Y$'s completeness.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — intuition
  suggests "everything involved" should need to be complete).
- **Repair**: re-state the structural fact precisely — completeness of $B(X,Y)$ transfers from $Y$
  alone.

### MC-3: OPERATOR-NORM-COMPUTED-ONLY-AT-BASIS-VECTORS
- **Surface form**: computes $\|T\|$ by checking only the images of basis vectors, rather than
  correctly taking the supremum over the entire unit ball.
- **Birth type**: procedural shortcut (Blueprint's own declared moderate severity — basis vectors
  are the natural first thing to check, and the shortcut sometimes coincidentally works).
- **Repair**: re-walk Example 1's optimization over the full unit circle, showing the maximizing
  vector need not be a basis vector.

## Misconceptions

### MC-1: BOUNDED-AND-CONTINUOUS-TREATED-AS-INDEPENDENT
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-2: B-X-Y-COMPLETENESS-ASSUMED-TO-NEED-BOTH-SPACES-COMPLETE
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-3: OPERATOR-NORM-COMPUTED-ONLY-AT-BASIS-VECTORS
- **Surface form**: as described above.
- **Root cause (procedural shortcut)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The operator norm is like a speed limit sign for T — one number that governs how fast T can
  stretch things, everywhere, all at once."**
- **Anti-analogy**: $B(X,Y)$'s completeness isn't a group project requiring both $X$ and $Y$ to
  contribute — it's inherited entirely from $Y$, the space operators land in.

## Demonstrations
- **Demonstration 1 (targets MC-3)**: the $T(x,y)=(3x,y)$ operator-norm optimization over the unit
  circle.
- **Demonstration 2 (targets MC-1)**: the shared-constant Lipschitz-bound derivation proving
  bounded and continuous coincide.
- **Demonstration 3 (targets MC-2)**: the $B(\mathbb{R}^2,\mathbb{R}^2)$ operator-sum triangle-
  inequality verification and its inherited Banach status.

## Discovery Questions
1. "Are 'bounded' and 'continuous' two independent properties you'd need to check separately for
   a linear map?"
2. "Does B(X,Y) being a Banach space depend on whether X itself is complete?"
3. "Can you compute ‖T‖ by checking only the images of the basis vectors?"

## Teaching Sequence
1. **Representation shift**: work Example 1's operator-norm computation, isolating MC-3.
2. **Conflict evidence**: work Example 2's shared-constant bounded/continuous derivation, isolating
   MC-1.
3. **Contrast pair**: work Example 3's operator-sum and inherited-Banach-status argument, isolating
   MC-2.
4. **Mastery gate**: require a correct operator-norm computation, a correct explanation of the
   bounded/continuous equivalence via the Lipschitz bound, and a correct explanation of why
   $B(X,Y)$'s Banach status depends only on $Y$, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept bounded and continuous verified as two separate, independent checks for a linear
  map.
- Never accept $B(X,Y)$'s completeness attributed to both $X$ and $Y$ needing to be complete.
- Never accept an operator norm computed by checking only basis-vector images.

## Voice Teaching Notes
- Say "if it's bounded, do you already know it's continuous — or do you need a separate check?"
  whenever boundedness of a linear map is established.
- Ask "does completeness of B(X,Y) need X to be complete too?" whenever B(X,Y)'s Banach status is
  discussed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes $\|T\|$ via the full unit-ball supremum.
- **Rung 2 (application)**: learner correctly derives the Lipschitz bound from $\|T\|$ and states
  the bounded/continuous equivalence.
- **Rung 3 (transfer)**: learner correctly explains why every finite-dimensional linear map is
  automatically bounded, and why knowing basis images alone isn't sufficient to directly read off
  $\|T\|$.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the shared-constant Lipschitz-bound derivation.
- If MC-2 recurs, re-state the $Y$-only completeness-transfer fact precisely.
- If MC-3 recurs, re-walk the full-unit-circle optimization.

## Memory Hooks
- "Bounded and continuous are one fact for linear maps — the same ‖T‖ certifies both."
- "B(X,Y) is Banach whenever Y is — X's completeness never enters."
- "‖T‖ is a supremum over the WHOLE unit ball — never just the basis vectors."

## Transfer Connections
- `math.fnal.banach-space` (prerequisite, already authored, this campaign): supplies the
  completeness property $B(X,Y)$ inherits from $Y$.
- `math.linalg.linear-map` (prerequisite, already authored, cross-link): supplies the additivity/
  homogeneity definition this concept adds the boundedness condition to.

## Cross-Subject Connections
- Quantum mechanics and signal processing: physical observables and filters are modeled as
  bounded linear operators, with the operator norm giving a precise, checkable stability bound.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.fnal.bounded-operator.md`, reused by
  reference for its three worked examples and its three-misconception registry (birth types
  adopted directly as declared).
- Transfer probe: the Blueprint's own cross-link probe engaging `math.linalg.linear-map`'s
  basis-determined example, explaining why finite-dimensional linear maps are automatically
  bounded and why basis knowledge alone doesn't directly give $\|T\|$.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.fnal.banach-space`/`math.linalg.linear-map`, unlocks
  `math.fnal.spectral-theory`/`math.fnal.open-mapping-theorem`, cross_links
  `math.linalg.linear-map`, expert/apply, mastery_threshold 0.85, estimated_hours 5) was directly
  verified against the live KG and matches exactly. The cross-link target is confirmed authored,
  matching the Blueprint's own cross-link-mode determination.

## Version History
- 2026-09-19 (Batch 229): authored. First entry this batch. Companion batch concept:
  `math.fnal.riesz-representation`.
