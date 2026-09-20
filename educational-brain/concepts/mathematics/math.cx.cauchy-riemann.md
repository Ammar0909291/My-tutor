# math.cx.cauchy-riemann

## Identity
- **KG id**: `math.cx.cauchy-riemann`
- **Domain**: math.cx
- **Requires**: `math.cx.complex-function`, `math.calc.partial-derivatives`
- **Unlocks**: `math.cx.analytic-functions`, `math.cx.harmonic-functions`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 5

## Learning Objective
Recognize $f(z)=\bar z$ as satisfying the CR equations NOWHERE, despite being smooth as a real
map — NEVER assume smoothness implies analyticity; recognize CR holding at an ISOLATED point does
NOT imply holomorphicity — NEVER conflate pointwise CR with holomorphicity, which requires CR
throughout a neighborhood; and recognize $u,v\in C^\infty$ as REAL functions is INSUFFICIENT for
complex differentiability — NEVER equate real smoothness with complex analyticity.

## Core Understanding
$f(z)=\bar z$ SATISFIES THE CR EQUATIONS NOWHERE, DESPITE BEING SMOOTH AS A REAL MAP — NEVER
ASSUME SMOOTHNESS IMPLIES ANALYTICITY: for $z=x+iy$, $\bar z=x-iy$: $u=x,v=-y$, so $\partial u/
\partial x=1$ but $\partial v/\partial y=-1$ — the first CR equation $\partial u/\partial x=
\partial v/\partial y$ requires $1=-1$, which FAILS everywhere. Believing $f(z)=\bar z$ is
analytic because it is "smooth" or bijective is WRONG — $\bar z$ is the canonical nowhere-analytic
function: perfectly smooth as a map $\mathbb{R}^2\to\mathbb{R}^2$, yet NOWHERE complex-
differentiable; real smoothness and complex analyticity are genuinely different properties.

CR HOLDING AT AN ISOLATED POINT DOES NOT IMPLY HOLOMORPHICITY — NEVER CONFLATE THE TWO: for
$f(z)=|z|^2=x^2+y^2$: $u=x^2+y^2,v=0$. CR requires $\partial u/\partial x=2x=\partial v/
\partial y=0$ (so $x=0$) AND $\partial u/\partial y=2y=-\partial v/\partial x=0$ (so $y=0$) — CR
hold ONLY at $z=0$, failing everywhere else. So $f$ is complex-differentiable AT $z=0$ but NOT
holomorphic in any disc around $0$ (CR fail off the origin). Believing CR at a single point
guarantees complex differentiability THROUGHOUT a neighborhood (holomorphicity) is WRONG — the
sufficient condition (CR + continuous partials $\Rightarrow$ holomorphic) requires CR to hold in
an OPEN neighborhood, never just at one isolated point.

$u,v\in C^\infty$ AS REAL FUNCTIONS DOES NOT IMPLY COMPLEX DIFFERENTIABILITY — NEVER EQUATE REAL
SMOOTHNESS WITH COMPLEX ANALYTICITY: for $f(z)=x^2-y^2+2xi$: $u=x^2-y^2$ (smooth), $v=2x$
(smooth). But $\partial u/\partial x=2x$ and $\partial v/\partial y=0$ — CR requires $2x=0$, so
$x=0$; and $\partial u/\partial y=-2y=-\partial v/\partial x=-2$, so $y=1$ — CR hold ONLY at
$z=i$. Both $u$ and $v$ are infinitely differentiable as REAL functions everywhere, yet $f$ is
complex-differentiable at only ONE point. Believing $u,v$ being smooth real functions is
sufficient for $f=u+iv$ to be complex-differentiable is WRONG — complex differentiability
requires the ADDITIONAL constraint of the CR equations, a rigid coupling between $u$ and $v$ that
real smoothness alone never guarantees.

## Mental Models
- **"z̄ is the canonical counterexample: perfectly smooth as a real map, nowhere complex-
  differentiable — real smoothness and complex analyticity are genuinely different properties."**
- **"CR at one isolated point gives differentiability there and nowhere else — holomorphic means
  CR holds throughout a whole open neighborhood, a strictly stronger claim."**
- **"u and v being individually smooth is never enough — CR is the extra coupling equation that
  complex differentiability actually demands."**

## Why Students Fail

### MC-1: CONJUGATE-IS-ANALYTIC
- **Surface form**: claims $f(z)=\bar z$ is analytic because it is "smooth" or "one-to-one"; does
  not check the CR equations; fails to see that $\partial u/\partial x=1\neq-1=\partial v/
  \partial y$.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — real
  smoothness intuition is imported wholesale into the complex setting).
- **Repair**: re-derive the CR check for $\bar z$ directly, showing the first equation fails
  everywhere, total failure with no exceptions.

### MC-2: POINTWISE-CR-IMPLIES-HOLOMORPHIC
- **Surface form**: concludes that CR at a point implies complex differentiability at that point
  extends to holomorphicity there; unaware that continuous partials satisfying CR in an OPEN
  neighborhood are the sufficient condition.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — the pointwise check
  feels complete without noticing the neighborhood requirement).
- **Repair**: re-walk the $|z|^2$ example, showing CR holds only at the origin and fails in every
  punctured neighborhood of it.

### MC-3: REAL-SMOOTH-IMPLIES-ANALYTIC
- **Surface form**: equates real differentiability of $u,v$ with complex differentiability of
  $f$; ignores that complex differentiability is an additional constraint (the CR equations) not
  implied by real smoothness.
- **Birth type**: overgeneralization (Blueprint's own declared birth type — "smooth components"
  intuitively feels like it should be enough).
- **Repair**: re-walk the $f(z)=x^2-y^2+2xi$ example, showing CR holds only at the single point
  $z=i$ despite both components being smooth everywhere.

## Misconceptions

### MC-1: CONJUGATE-IS-ANALYTIC
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-2: POINTWISE-CR-IMPLIES-HOLOMORPHIC
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-3: REAL-SMOOTH-IMPLIES-ANALYTIC
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"z̄ looks like z's twin — same magnitude, mirrored angle — but analytically they're worlds
  apart: one is entire, the other nowhere differentiable."**
- **Anti-analogy**: CR holding at a single point is like a single frame of a movie looking
  correct — it says nothing about whether the surrounding frames (the neighborhood) also hold up.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $f(z)=\bar z$ nowhere-analytic CR check.
- **Demonstration 2 (targets MC-2)**: the $f(z)=|z|^2$ CR-only-at-the-origin computation.
- **Demonstration 3 (targets MC-3)**: the $f(z)=x^2-y^2+2xi$ CR-only-at-$z=i$ computation.

## Discovery Questions
1. "Is f(z)=z̄ analytic because it's smooth or one-to-one?"
2. "If CR hold at a single point, is f automatically holomorphic there?"
3. "If u and v are both infinitely differentiable as real functions, is f=u+iv automatically
   complex-differentiable?"

## Teaching Sequence
1. **Representation shift**: derive the CR equations from the two-direction limit for $f(z)=z^2$,
   then apply to $f(z)=\bar z$, isolating MC-1.
2. **Worked example pair**: verify CR and compute $f'(z)$ for $f(z)=z^2$ and $f(z)=e^z$.
3. **Contrast pair**: work the $|z|^2$ isolated-CR-point example, isolating MC-2; then the
   $x^2-y^2+2xi$ smooth-but-not-analytic example, isolating MC-3.
4. **Mastery gate**: require correct CR verification and $f'(z)$ computation for a given function,
   a correct proof that $\bar z$ is nowhere analytic, a correct identification of where a function
   might be holomorphic, and a correct harmonic-conjugate reconstruction, at the Blueprint's own
   stated MAMR of 5/5.

## Tutor Actions
- Never accept $\bar z$ described as analytic without a direct CR check.
- Never accept CR verified at an isolated point treated as sufficient for holomorphicity.
- Never accept smoothness of $u,v$ as real functions used as a substitute for verifying CR.

## Voice Teaching Notes
- Say "have you checked both CR equations, not just one?" whenever analyticity is claimed.
- Ask "does CR hold in a whole neighborhood, or just at this one point?" whenever holomorphicity
  is concluded from a CR check.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies CR for a polynomial or exponential function
  and computes $f'(z)$.
- **Rung 2 (application)**: learner correctly proves $\bar z$ is nowhere analytic and identifies
  isolated points where CR holds for a non-analytic function.
- **Rung 3 (transfer)**: learner correctly reconstructs a harmonic conjugate $v$ from a given $u$
  using the two-step CR integration procedure and identifies the resulting $f(z)$.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the CR check for $\bar z$, showing total failure.
- If MC-2 recurs, re-walk the $|z|^2$ isolated-point example.
- If MC-3 recurs, re-walk the $x^2-y^2+2xi$ example.

## Memory Hooks
- "z̄ fails CR everywhere — smooth as a real map, nowhere complex-differentiable."
- "CR at one point ≠ holomorphic there — holomorphic needs a whole neighborhood."
- "Smooth u and v is never enough — CR is the extra coupling equation complex differentiability
  demands."

## Transfer Connections
- `math.cx.complex-function` (prerequisite, already authored, this campaign): supplies the
  $f=u+iv$ decomposition, path-dependent limits, and complex differentiability definition this
  concept builds the CR criterion on.
- `math.calc.partial-derivatives` (prerequisite, already authored): supplies the partial-
  derivative computation this concept's CR equations directly use.

## Cross-Subject Connections
- Fluid dynamics and electrostatics: harmonic conjugate pairs $(u,v)$ satisfying the CR equations
  model velocity potentials and stream functions, or electric potentials and field lines.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cx.cauchy-riemann.md`, reused by reference
  for its two-direction-limit derivation of CR, its worked example pair ($z^2$, $e^z$), its
  contrast examples ($\bar z$, $|z|^2$, $x^2-y^2+2xi$), and its three-misconception registry
  (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe reconstructing the harmonic
  conjugate of $u=e^x\cos(y)$ via the two-step CR integration procedure, identifying $f(z)=e^z$.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.cx.complex-function`/`math.calc.partial-derivatives`, unlocks
  `math.cx.analytic-functions`/`math.cx.harmonic-functions`, cross_links none, expert/apply,
  mastery_threshold 0.9, estimated_hours 5) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-20 (Batch 237): authored. First entry this batch. Companion batch concept:
  `math.top.cohomology`.
