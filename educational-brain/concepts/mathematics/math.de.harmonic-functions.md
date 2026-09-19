# math.de.harmonic-functions

## Identity
- **KG id**: `math.de.harmonic-functions`
- **Domain**: math.de
- **Requires**: `math.de.laplace-equation`
- **Unlocks**: none
- **Cross-links**: `math.cx.analytic-functions`, `math.cx.cauchy-riemann` (Blueprint's own Component
  7 claimed BOTH "authored" — this checked the wrong corpus; the EDUCATIONAL-BRAIN corpus does NOT
  yet have either concept authored — corrected to independence mode, see Curriculum Feedback)
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.75
- **Estimated hours**: 5

## Learning Objective
State and verify the mean value property as an EXACT identity (never an approximation) — a
harmonic function's value at any point equals the average of its values on any surrounding
circle; derive the uniqueness of the Dirichlet problem from the maximum/minimum principle applied
to the DIFFERENCE of two candidate solutions (recognizing boundary agreement ALONE is sufficient,
never requiring interior checks); and recognize that ANY holomorphic function's real and imaginary
parts are AUTOMATICALLY harmonic via the Cauchy-Riemann equations (never treating harmonic and
holomorphic functions as unrelated topics).

## Core Understanding
THE MEAN VALUE PROPERTY IS AN EXACT IDENTITY — NEVER AN APPROXIMATION: for $u$ harmonic on a domain
containing the closed disk of radius $r$ around $z_0$:
$u(z_0)=\frac1{2\pi}\int_0^{2\pi}u(z_0+re^{i\theta})\,d\theta$ — exact for EVERY harmonic function
and EVERY valid circle, never merely asymptotic or special-case. For $u(x,y)=x^2-y^2$ (harmonic:
$u_{xx}+u_{yy}=2-2=0$): around the origin, $u(r\cos\theta,r\sin\theta)=r^2\cos2\theta$, whose
average over a full period is EXACTLY $0$ — matching $u(0,0)=0$ precisely, not approximately.

BOUNDARY AGREEMENT ALONE FORCES INTERIOR AGREEMENT — NEVER REQUIRING SEPARATE INTERIOR CHECKS: if
$u_1,u_2$ are both harmonic on a bounded region and agree on the ENTIRE boundary, let
$w=u_1-u_2$ — harmonic (linearity of $\nabla^2$) and identically zero on the boundary. By the
maximum/minimum principle, $w$'s extremes occur ONLY on the boundary, where $w\equiv0$ — forcing
$\max w=\min w=0$ throughout, hence $w\equiv0$ everywhere and $u_1\equiv u_2$. This is the
UNIQUENESS of the Dirichlet problem: a solution, if one exists, is the ONLY one with that boundary
data — no interior information was ever supplied or needed.

HOLOMORPHIC FUNCTIONS ARE A FREE SOURCE OF HARMONIC FUNCTIONS — NEVER AN UNRELATED TOPIC: if
$f=u+iv$ is holomorphic, the Cauchy-Riemann equations give $u_x=v_y$, $u_y=-v_x$. Differentiating
the first in $x$: $u_{xx}=v_{yx}$. Differentiating the second in $y$: $u_{yy}=-v_{xy}$. Since a
holomorphic function's components have continuous mixed partials, $v_{yx}=v_{xy}$, giving
$u_{xx}+u_{yy}=v_{yx}-v_{xy}=0$ — $u$ is harmonic (and, by the identical argument the other way, so
is $v$). For $f(z)=z^2$: $u=x^2-y^2$, $v=2xy$ — BOTH automatically harmonic once $z^2$'s
holomorphicity is confirmed via Cauchy-Riemann, with ZERO separate Laplacian verification needed.

## Mental Models
- **"The mean value property is exact, always — the center value equals the surrounding average
  precisely, not approximately, for every harmonic function and every circle."**
- **"Boundary agreement alone pins down the entire interior — the maximum principle applied to the
  difference leaves nowhere for a discrepancy to hide."**
- **"Any holomorphic function comes with two harmonic functions built in, for free — no separate
  Laplacian check ever needed."**

## Why Students Fail

### MC-1: MEAN-VALUE-PROPERTY-AS-APPROXIMATION
- **Surface form**: believes the mean value property only holds approximately, or only for
  "nice"/special harmonic functions, rather than exactly for every harmonic function and circle.
- **Birth type**: Foundational severity (Blueprint's own declared severity — without seeing the
  exact integral computation, the property can seem like a plausible-sounding heuristic rather than
  a genuine identity).
- **Repair**: re-walk Example 1's exact integral computation, confirming the average is precisely
  the center value.

### MC-2: INTERIOR-CHECK-ASSUMED-NECESSARY
- **Surface form**: believes confirming two harmonic functions are identical requires checking
  interior points too, missing that boundary agreement alone (via the maximum principle applied to
  the difference) is already sufficient.
- **Birth type**: High severity (Blueprint's own declared severity — the intuition that "more
  checking is safer" resists the surprising fact that boundary data alone is provably enough).
- **Repair**: re-walk the difference-function argument, showing $w\equiv0$ is forced by boundary
  agreement alone.

### MC-3: HARMONIC-AND-HOLOMORPHIC-UNRELATED
- **Surface form**: believes harmonic functions and holomorphic functions are separate, unrelated
  topics.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the two topics are often
  taught in different courses (real PDE theory vs. complex analysis), obscuring their direct
  structural connection).
- **Repair**: re-walk the Cauchy-Riemann-based derivation showing any holomorphic function's parts
  are automatically harmonic.

## Misconceptions

### MC-1: MEAN-VALUE-PROPERTY-AS-APPROXIMATION
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: INTERIOR-CHECK-ASSUMED-NECESSARY
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: HARMONIC-AND-HOLOMORPHIC-UNRELATED
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A harmonic function's value at a point is a perfectly fair vote — it always equals the exact
  average of everyone surrounding it on any circle, no rounding, no exceptions."**
- **Anti-analogy**: confirming two harmonic functions match is NOT like confirming two ordinary
  functions match, where you'd need to check many interior points — here, the boundary alone is a
  complete, provable guarantee.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the exact mean-value-property integral verification for
  $u=x^2-y^2$.
- **Demonstration 2 (targets MC-2)**: the difference-function uniqueness argument for two harmonic
  functions agreeing on the boundary of the unit disk.
- **Demonstration 3 (targets MC-3)**: the $f(z)=z^2$ Cauchy-Riemann-based derivation certifying
  both $u=x^2-y^2$ and $v=2xy$ as harmonic.

## Discovery Questions
1. "Does the mean value property hold exactly for every harmonic function and every circle, or is
   it only an approximation that improves for small circles?"
2. "To confirm two harmonic functions are identical throughout a region, do you need to check
   interior points too, or is boundary agreement alone sufficient?"
3. "Are harmonic functions and holomorphic functions two separate, unrelated topics, or is there a
   direct structural connection between them?"

## Teaching Sequence
1. **Representation shift**: the exact mean value property, working Demonstration 1, isolating
   MC-1.
2. **Conflict evidence**: the boundary-agreement-forces-interior-agreement argument, working
   Demonstration 2, isolating MC-2.
3. **Contrast pair**: holomorphic functions as a free source of harmonic functions, working
   Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct exact verification of the mean value property, a correct
   uniqueness argument from boundary data alone, and a correct derivation that a holomorphic
   function's real and imaginary parts are automatically harmonic, at the Blueprint's own stated
   MAMR of 4/5.

## Tutor Actions
- Never accept the mean value property described as approximate rather than an exact identity.
- Never accept a claim that confirming two harmonic functions match requires checking interior
  points when boundary agreement is already established.
- Never accept harmonic and holomorphic functions described as unrelated topics.

## Voice Teaching Notes
- Say "is that average exactly equal to the center value, or just close?" whenever the mean value
  property is invoked.
- Ask "do you need to check the interior too, or does the maximum principle applied to the
  difference already settle this?" whenever uniqueness is discussed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies the mean value property exactly for a given
  harmonic function.
- **Rung 2 (application)**: learner correctly applies the maximum principle to the difference of
  two harmonic functions to prove Dirichlet uniqueness.
- **Rung 3 (transfer)**: learner correctly derives that a given holomorphic function's real and
  imaginary parts are harmonic via the Cauchy-Riemann equations, without direct Laplacian
  computation.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the exact mean-value-property integral.
- If MC-2 recurs, re-walk the difference-function uniqueness argument.
- If MC-3 recurs, re-walk the Cauchy-Riemann-based harmonic derivation.

## Memory Hooks
- "The mean value property is exact, not approximate — always."
- "Boundary agreement alone is enough — the maximum principle leaves nowhere for a difference to
  hide."
- "Every holomorphic function comes with two harmonic functions built in, for free."

## Transfer Connections
- `math.de.laplace-equation` (already authored, this campaign, Batch 167): supplies the equation
  itself, the equilibrium framing, and the orientation-level naming of the mean value property and
  maximum principle this concept develops to full depth.
- `math.cx.analytic-functions`, `math.cx.cauchy-riemann` (not yet authored in the
  EDUCATIONAL-BRAIN corpus — see Curriculum Feedback): the KG's declared cross-links, supplying the
  Cauchy-Riemann equations and continuous-mixed-partials guarantee this concept's cross-link
  derivation directly relies on.

## Cross-Subject Connections
- Complex analysis: the real/imaginary-part-harmonic correspondence for any holomorphic function.
- Physics/engineering: uniqueness of steady-state temperature/potential distributions from boundary
  data alone.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.harmonic-functions.md`, reused by
  reference for its exact mean-value-property integral computation, its Dirichlet-uniqueness
  difference-function argument, its $f(z)=z^2$ Cauchy-Riemann derivation, and its
  three-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own cross-link-probe intent (deferred to independence mode here,
  pending both cross-link targets' EB authoring), using $f(z)=e^z$ to derive $u=e^x\cos y$'s
  harmonicity from the Cauchy-Riemann equations.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Wrong-corpus cross-link discrepancy found and corrected**: the Blueprint's own Component 7
  claims BOTH `math.cx.analytic-functions` and `math.cx.cauchy-riemann` are "authored" — checked
  against the BLUEPRINTS directory, where both Blueprints DO exist, not the EDUCATIONAL-BRAIN
  corpus, where NEITHER yet exists — corrected to independence mode here, the seventh such
  wrong-corpus discrepancy this campaign (after Batches 128-129, 157, 160, 161, and 162 (two
  instances)).
- All other fields (requires `math.de.laplace-equation`, unlocks none, expert/analyze,
  mastery_threshold 0.75, estimated_hours 5) matched the live KG exactly.

## Version History
- 2026-09-19 (Batch 168): authored. First entry this batch. Companion batch concept:
  `math.de.poisson-equation`.
