# math.cx.power-series-cx

## Identity
- **KG id**: `math.cx.power-series-cx`
- **Domain**: math.cx
- **Requires**: `math.cx.analytic-functions`, `math.calc.power-series`
- **Unlocks**: `math.cx.identity-theorem`
- **Cross-links**: `math.calc.power-series`
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 5

## Learning Objective
Find $R$ via the IDENTICAL ratio test already used in $\mathbb{R}$ — NEVER assume a new
technique is needed; interpret $|z-z_0|<R$ as a DISK with a circular boundary of infinitely many
points — NEVER assume uniform behavior around the whole boundary circle from one point's
behavior; and recognize holomorphic $\Rightarrow$ equals its Taylor series as an AUTOMATIC
guarantee in $\mathbb{C}$ — NEVER assume this parallels $\mathbb{R}$'s smooth-but-not-analytic
gap.

## Core Understanding
THE RATIO TEST TRANSFERS IDENTICALLY — NEVER A NEW TECHNIQUE FOR $\mathbb{C}$: for
$\sum_{n=0}^\infty z^n/n!$: $\lim_{n\to\infty}|a_n/a_{n+1}|=\lim_{n\to\infty}(n+1)=\infty$, so
$R=\infty$ — converges for EVERY $z\in\mathbb{C}$, EXACTLY the same computation as the real
exponential series with $x$ replaced by $z$. Believing the ratio/root test procedure must be
adapted when moving from real to complex power series is WRONG — it transfers COMPLETELY
UNCHANGED; nothing about finding $R$ changes, only the geometric meaning of the resulting
inequality.

$|z-z_0|<R$ IS A DISK WITH A CIRCULAR BOUNDARY — NEVER UNIFORM BEHAVIOR ACROSS THAT BOUNDARY: for
$\sum_{n=1}^\infty z^n/n$: $R=1$. On the boundary $|z|=1$: at $z=1$, the series becomes
$\sum1/n$ — DIVERGES (harmonic series); at $z=-1$, it becomes $\sum(-1)^n/n$ — CONVERGES
(alternating series test). Two DIFFERENT points on the SAME boundary circle, one divergent, one
convergent. Believing that if a complex power series converges (or diverges) at ONE point on its
boundary circle, it must behave the SAME WAY at every point on that circle is WRONG — the
boundary is an entire circle with infinitely many points, each requiring its OWN independent
check, exactly as $\mathbb{R}$'s two endpoints sometimes disagreed with each other.

HOLOMORPHIC $\Rightarrow$ EQUALS ITS TAYLOR SERIES IS AN AUTOMATIC GUARANTEE — NEVER PARALLELS
$\mathbb{R}$'S GAP: $f(z)=e^z$ is entire, so it EQUALS its Taylor series $\sum z^n/n!$
everywhere. Contrast $g(x)=e^{-1/x^2}$ (real, $C^\infty$, but Taylor series at $0$ identically
zero, matching $g$ only at $x=0$). Assuming that because some real $C^\infty$ functions (like
$\sin x$) equal their Taylor series, this is the GENERAL rule, missing that in $\mathbb{R}$ it is
NOT guaranteed, is WRONG — in $\mathbb{C}$, holomorphic functions are AUTOMATICALLY, PROVABLY
equal to their Taylor series on a disk, an equivalence with NO real-analysis counterpart.

## Mental Models
- **"Finding R uses the exact same ratio test you already know — nothing changes except what the
  resulting inequality looks like geometrically: a disk, not an interval."**
- **"The boundary circle has infinitely many points, and each needs its own check — just like ℝ's
  two endpoints sometimes disagreed, but now there's a whole circle of them."**
- **"Holomorphic in ℂ is so much stronger than infinitely differentiable in ℝ that it forces
  genuine equality with the Taylor series on a whole disk — a guarantee ℝ never offers from
  smoothness alone."**

## Why Students Fail

### MC-1: BOUNDARY-CIRCLE-ASSUMED-UNIFORM-BEHAVIOR
- **Surface form**: assumes that if a complex power series converges (or diverges) at one point on
  its boundary circle $|z-z_0|=R$, it must behave the same way at every point on that circle.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — a single
  boundary check feels like it should generalize to the whole circle by symmetry).
- **Repair**: re-walk the $\sum z^n/n$ direct computation at both $z=1$ (diverges) and $z=-1$
  (converges).

### MC-2: RATIO-TEST-ASSUMED-TO-NEED-MODIFICATION-IN-C
- **Surface form**: believes the ratio/root test procedure for finding $R$ must be adapted or
  changed when moving from real to complex power series.
- **Birth type**: overgeneralization (Blueprint's own declared moderate severity — moving to a
  "new" number system feels like it should require new techniques).
- **Repair**: re-walk the identical computation side by side with its real analogue.

### MC-3: REAL-SMOOTH-EQUALS-TAYLOR-SERIES-ASSUMED-GENERAL
- **Surface form**: assumes that because some real $C^\infty$ functions (like $\sin x$) equal
  their Taylor series, this is the general rule for smooth functions, missing that in
  $\mathbb{R}$ it is not guaranteed.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — the
  well-behaved examples students encounter first don't reveal the real gap).
- **Repair**: re-present the $e^{-1/x^2}$ counterexample, re-anchoring on why holomorphic functions
  in $\mathbb{C}$ are exempt from this failure mode.

## Misconceptions

### MC-1: BOUNDARY-CIRCLE-ASSUMED-UNIFORM-BEHAVIOR
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-2: RATIO-TEST-ASSUMED-TO-NEED-MODIFICATION-IN-C
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-3: REAL-SMOOTH-EQUALS-TAYLOR-SERIES-ASSUMED-GENERAL
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Finding R is like reusing the exact same recipe card — only the shape of the serving dish
  changes, from a line segment to a full disk."**
- **Anti-analogy**: the boundary circle isn't like ℝ's two lonely endpoints that you check once
  and move on — it's an infinite committee of points, each free to vote differently.

## Demonstrations
- **Demonstration 1 (targets MC-2)**: the $\sum z^n/n!$ ratio-test computation, identical in form
  to the real case.
- **Demonstration 2 (targets MC-1)**: the $\sum z^n/n$ boundary-circle divergence-at-1,
  convergence-at-$-1$ contrast.
- **Demonstration 3 (targets MC-3)**: the $e^z$-versus-$e^{-1/x^2}$ holomorphic-guarantee contrast.

## Discovery Questions
1. "Does the ratio/root test procedure need to be adapted when moving from real to complex power
   series?"
2. "If a complex power series converges at one point on its boundary circle, does it converge at
   every point on that circle?"
3. "If a real function is infinitely differentiable everywhere, must it equal its Taylor series
   near every point, the same way a holomorphic complex function does?"

## Teaching Sequence
1. **Representation shift**: work the ratio-test computation for $\sum z^n/n!$, isolating MC-2.
2. **Conflict evidence**: work the $\sum z^n/n$ boundary-circle contrast, isolating MC-1.
3. **Contrast pair**: work the holomorphic-versus-real-smooth contrast, isolating MC-3.
4. **Mastery gate**: require a correct radius-of-convergence computation with geometric
   description, a correct boundary-circle behavior check at two points, a correct citation of the
   holomorphic-equals-Taylor-series theorem, and a correct rebuttal of the "all smooth functions
   behave like $\sin x$" claim, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept the ratio test described as needing modification for complex series.
- Never accept boundary-circle behavior generalized from a single checked point.
- Never accept the real smooth-implies-analytic assumption applied to holomorphic functions.

## Voice Teaching Notes
- Say "is that really a new technique, or the same ratio test as before?" whenever $R$ is computed
  for a complex series.
- Ask "have you checked more than one point on the boundary circle?" whenever boundary behavior is
  discussed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes $R$ via the ratio test and describes the
  convergence region as a disk.
- **Rung 2 (application)**: learner correctly checks boundary-circle behavior at two distinct
  points and finds they may disagree.
- **Rung 3 (transfer)**: learner correctly identifies the two boundary points on a complex disk
  corresponding to a known real series' endpoints, and explains why other boundary points (like
  $z=i$) require independent consideration.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the two-point boundary-circle contrast.
- If MC-2 recurs, re-walk the identical ratio-test computation side by side with the real case.
- If MC-3 recurs, re-present the $e^{-1/x^2}$ counterexample.

## Memory Hooks
- "The ratio test is unchanged in ℂ — only the geometry of the answer changes."
- "The boundary is a whole circle — check more than one point before trusting uniform behavior."
- "Holomorphic in ℂ automatically equals its Taylor series — no gap like ℝ's e^(−1/x²)."

## Transfer Connections
- `math.cx.analytic-functions` (prerequisite, already authored, this campaign): supplies the
  holomorphic⟺analytic equivalence this concept's central theorem directly restates using
  power-series language.
- `math.calc.power-series` (prerequisite, already authored, cross-link): supplies the ratio-test
  radius-of-convergence procedure and endpoint-testing habit this concept transfers into
  $\mathbb{C}$.

## Cross-Subject Connections
- Signal processing and control theory: transfer function stability analysis relies on power
  series (Z-transforms) with a radius of convergence directly analogous to this concept's disk of
  convergence.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cx.power-series-cx.md`, reused by reference
  for its three worked examples and its three-misconception registry (birth types adopted directly
  as declared).
- Transfer probe: the Blueprint's own cross-link probe reusing `math.calc.power-series`'s own
  $\sum x^n/n$ example, mapping its real endpoints to specific boundary-circle points and
  identifying additional complex boundary points (like $z=i$) the real-only analysis never
  considered.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.cx.analytic-functions`/`math.calc.power-series`, unlocks `math.cx.identity-theorem`,
  cross_links `math.calc.power-series`, expert/apply, mastery_threshold 0.85, estimated_hours 5)
  was directly verified against the live KG and matches exactly. The cross-link target is
  confirmed authored, matching the Blueprint's own cross-link-mode determination.

## Version History
- 2026-09-20 (Batch 239): authored. First entry this batch. Companion batch concept:
  `math.cx.complex-integration`.
