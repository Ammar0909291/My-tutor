# math.cx.conformal-mapping

## Identity
- **KG id**: `math.cx.conformal-mapping`
- **Domain**: math.cx
- **Requires**: `math.cx.analytic-functions`
- **Unlocks**: `math.cx.riemann-mapping`
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 6

## Learning Objective
Recognize conformality FAILS exactly where $f'(z_0)=0$ — NEVER assuming every holomorphic function
is conformal everywhere; recognize the Jacobian is FORCED into a rotation-dilation form — NEVER an
arbitrary $2\times2$ real matrix; and recognize conformal maps preserve ONLY angles — NEVER
distances or areas.

## Core Understanding
CONFORMALITY FAILS EXACTLY WHERE $f'(z_0)=0$ — NEVER GUARANTEED EVERYWHERE ON A HOLOMORPHIC
DOMAIN: for $f(z)=z^2$, $f'(z)=2z$: at $z_0=0$, $f'(0)=0$ — conformality FAILS; two rays at angles
$\theta_1,\theta_2$ map to rays at $2\theta_1,2\theta_2$, so the angle between them DOUBLES,
directly violating angle preservation. At $z_0=1$, $f'(1)=2\neq0$ — conformal there, preserving
exactly the angle between any two curves crossing at $z=1$. Believing every holomorphic function
is conformal at every point of its domain is WRONG — conformality genuinely fails at critical
points where $f'=0$.

THE JACOBIAN IS FORCED INTO A ROTATION-DILATION FORM — NEVER AN ARBITRARY $2\times2$ MATRIX: for
$f(z)=z^2=(x^2-y^2)+i(2xy)$ at $z_0=x_0+iy_0$: the real Jacobian is $\begin{pmatrix}2x_0&-2y_0\\
2y_0&2x_0\end{pmatrix}$ — EXACTLY of the form $\begin{pmatrix}a&-b\\b&a\end{pmatrix}$, a direct
consequence of the Cauchy-Riemann equations. Its scaling factor $\sqrt{a^2+b^2}=2|z_0|$ matches
$|f'(z_0)|=|2z_0|$ exactly. Believing a conformal map's local Jacobian could be any arbitrary real
$2\times2$ matrix, stretching $x$ and $y$ differently, is WRONG — holomorphy forces the Jacobian
into this exact rotation-dilation structure; an arbitrary real-differentiable map has no such
constraint.

CONFORMAL MAPS PRESERVE ONLY ANGLES — NEVER DISTANCES OR AREAS: at $z_0=1$ where $f(z)=z^2$ is
conformal ($f'(1)=2$): the ANGLE between any two curves crossing at $z=1$ is preserved EXACTLY,
but LENGTHS near $z=1$ are stretched by the factor $|f'(1)|=2$, and AREAS by $|f'(1)|^2=4$.
Believing a conformal map preserves distances or areas in addition to angles is WRONG — it
generally distorts both lengths and areas by locally varying scale factors; only angles are
preserved.

## Mental Models
- **"Conformality isn't a free bonus of holomorphicity — it specifically needs f′≠0, and fails
  exactly where the derivative vanishes."**
- **"Holomorphy forces the real Jacobian into a rotation-dilation straitjacket — a and −b, b and a
  — never a free-form stretch that an arbitrary smooth map could have."**
- **"Conformal means angle-preserving, full stop — lengths and areas are free to stretch by
  whatever |f′| and |f′|² dictate."**

## Why Students Fail

### MC-1: HOLOMORPHIC-ASSUMED-CONFORMAL-EVERYWHERE
- **Surface form**: believes every holomorphic function is conformal at every point of its domain,
  missing that conformality specifically fails where $f'=0$.
- **Birth type**: foundational (Blueprint's own declared severity — "holomorphic" and "conformal"
  are easy to treat as synonyms without the $f'\neq0$ qualifier in mind).
- **Repair**: re-walk the angle-doubling-at-$z=0$-versus-preservation-at-$z=1$ contrast.

### MC-2: CONFORMAL-JACOBIAN-ASSUMED-ARBITRARY
- **Surface form**: believes a conformal map's local Jacobian could be any arbitrary real
  $2\times2$ matrix, missing that holomorphy forces it into the rotation-dilation form.
- **Birth type**: foundational (Blueprint's own declared severity — a general real-analysis
  background gives no reason to expect a special Jacobian structure).
- **Repair**: re-walk the explicit Cauchy-Riemann-derived Jacobian computation for $z^2$.

### MC-3: CONFORMAL-ASSUMED-TO-PRESERVE-LENGTHS-AND-AREAS
- **Surface form**: believes a conformal map preserves distances or areas in addition to angles,
  missing that it generally distorts both.
- **Birth type**: foundational (Blueprint's own declared severity — "preserving" in everyday usage
  suggests a broad, all-encompassing preservation rather than one specific property).
- **Repair**: re-walk the exact-angle-preservation-alongside-length/area-distortion computation at
  $z=1$.

## Misconceptions

### MC-1: HOLOMORPHIC-ASSUMED-CONFORMAL-EVERYWHERE
- **Surface form**: as described above.
- **Root cause (foundational)**: as described above.
- **Repair**: as described above.

### MC-2: CONFORMAL-JACOBIAN-ASSUMED-ARBITRARY
- **Surface form**: as described above.
- **Root cause (foundational)**: as described above.
- **Repair**: as described above.

### MC-3: CONFORMAL-ASSUMED-TO-PRESERVE-LENGTHS-AND-AREAS
- **Surface form**: as described above.
- **Root cause (foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A conformal map is like a photograph taken with a lens that never distorts angles between
  lines, even though it can zoom in or out differently at different points in the frame."**
- **Anti-analogy**: the rotation-dilation Jacobian isn't an approximation that happens to be close
  to true for holomorphic maps — it's an exact algebraic consequence of the Cauchy-Riemann
  equations, forced with no wiggle room.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $z^2$ angle-doubling-at-0-versus-preservation-at-1
  contrast.
- **Demonstration 2 (targets MC-2)**: the explicit Cauchy-Riemann-derived Jacobian computation for
  $z^2$.
- **Demonstration 3 (targets MC-3)**: the exact-angle-versus-distorted-length/area computation at
  $z=1$.

## Discovery Questions
1. "Is every holomorphic function conformal everywhere on its domain?"
2. "Could a conformal map's local Jacobian be any arbitrary 2x2 real matrix, stretching x and y
   differently?"
3. "Does a conformal map preserve lengths and areas, in addition to angles?"

## Teaching Sequence
1. **Conflict evidence**: work the $z^2$ angle-doubling-versus-preservation contrast, isolating
   MC-1.
2. **Representation shift**: work the Cauchy-Riemann-derived Jacobian computation, isolating MC-2.
3. **Contrast pair**: work the angle-preserved-versus-length/area-distorted computation, isolating
   MC-3.
4. **Mastery gate**: require correct identification of conformality-failure points for a given
   function, a correct explanation of an everywhere-conformal function, a correct Jacobian
   computation verifying the rotation-dilation form, and a correct explanation of why area can
   still be distorted despite exact angle preservation, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept a holomorphic function described as conformal everywhere without checking $f'\neq0$.
- Never accept a conformal map's Jacobian described as an arbitrary real matrix.
- Never accept a conformal map described as preserving distances or areas.

## Voice Teaching Notes
- Say "is f′ actually nonzero there?" whenever conformality is claimed at a specific point.
- Ask "does preserving angles mean preserving everything else too?" whenever conformal mapping's
  scope is discussed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies where a given holomorphic function's
  conformality fails.
- **Rung 2 (application)**: learner correctly computes a Jacobian and verifies its
  rotation-dilation form matches $|f'|$.
- **Rung 3 (transfer)**: learner correctly explains why using a conformal (not merely smooth) map
  matters for transferring angle-dependent boundary conditions in a PDE application, and why
  distance mismatches away from critical points are expected, not errors.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the angle-doubling-versus-preservation contrast.
- If MC-2 recurs, re-walk the Jacobian computation.
- If MC-3 recurs, re-walk the angle-versus-length/area distortion computation.

## Memory Hooks
- "Conformal fails exactly where f′=0 — never guaranteed everywhere holomorphic."
- "The Jacobian is forced into rotation-dilation form — never arbitrary."
- "Conformal preserves angles only — never distances or areas."

## Transfer Connections
- `math.cx.analytic-functions` (prerequisite, already authored, this campaign): supplies the
  holomorphic/analytic definitions this concept's conformality condition is built directly on top
  of.

## Cross-Subject Connections
- PDE applications: conformally mapping an irregularly shaped domain to a disc for solving a
  heat-flow or electrostatic problem relies directly on this concept's angle-preservation (not
  distance-preservation) machinery to correctly transfer boundary conditions.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cx.conformal-mapping.md`, reused by
  reference for its three worked examples and its three-misconception registry (birth types
  adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe on an engineer's PDE heat-flow
  application, a critical-point-in-the-middle-of-the-plate problem, and a distance-mismatch
  explanation.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.cx.analytic-functions`, unlocks `math.cx.riemann-mapping`, cross_links none, expert/apply,
  mastery_threshold 0.8, estimated_hours 6) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-20 (Batch 249): authored. First entry this batch. Companion batch concept:
  `math.cx.analytic-continuation`.
