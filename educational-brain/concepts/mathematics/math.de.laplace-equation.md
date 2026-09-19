# math.de.laplace-equation

## Identity
- **KG id**: `math.de.laplace-equation`
- **Domain**: math.de
- **Requires**: `math.de.separation-of-variables-pde`
- **Unlocks**: none
- **Cross-links**: `math.cx.harmonic-functions` (not yet authored, independence mode)
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 7

## Learning Objective
Recognize $\nabla^2u=u_{xx}+u_{yy}=0$ as `math.de.pde`'s canonical ELLIPTIC example — a purely
spatial equilibrium condition with NO time variable (never a process still evolving); solve it on a
rectangle by REAPPLYING `math.de.separation-of-variables-pde`'s technique directly, with hyperbolic
sine/cosine replacing the heat equation's decaying exponential (never confused with that decay
form); and state the mean value property and maximum principle (a harmonic function's extremes
occur ONLY on the boundary, never in the interior) at orientation level.

## Core Understanding
LAPLACE'S EQUATION HAS NO TIME VARIABLE — IT DESCRIBES A SETTLED EQUILIBRIUM, NEVER AN EVOLVING
PROCESS: $u_{xx}+u_{yy}=0$ describes the FINAL, unchanging steady-state temperature distribution on
a plate (once heat has stopped flowing) or an electrostatic potential in a charge-free region — a
purely spatial balance with no $t$ anywhere. Contrast the heat equation ($u_t=ku_{xx}$), which
describes the PROCESS of getting there; Laplace's Equation describes the destination itself, once
reached. A function satisfying $\nabla^2u=0$ is called HARMONIC.

SOLVING ON A RECTANGLE REUSES THE SAME SEPARATION TECHNIQUE — WITH HYPERBOLIC, NOT EXPONENTIAL,
SOLUTIONS: for $u_{xx}+u_{yy}=0$ on $0\le x\le\pi$, $0\le y\le1$ with $u(0,y)=u(\pi,y)=0$,
$u(x,0)=0$, $u(x,1)=f(x)$: separating $u=X(x)Y(y)$ gives $\frac{X''}{X}=-\frac{Y''}{Y}=-\lambda$.
The TWO homogeneous BCs apply to $X$: $X''+\lambda X=0$, $X(0)=X(\pi)=0$ — EXACTLY the same
eigenvalue problem as `math.de.separation-of-variables-pde`'s own worked example, giving
$\lambda_n=n^2$, $X_n=\sin(nx)$. The $Y$-equation becomes $Y''-n^2Y=0$ (note the SIGN — since it's
$-\lambda$ on that side), giving $Y_n(y)=A_n\sinh(ny)+B_n\cosh(ny)$ — HYPERBOLIC sine/cosine, NEVER
the heat equation's decaying exponential $e^{-k\lambda t}$, because there is no first-order time
derivative here to produce decay. The full solution $u(x,y)=\sum c_n\sin(nx)\sinh(ny)$ matches
$f(x)$ via the same Fourier sine series technique as before.

THE MAXIMUM PRINCIPLE GUARANTEES INTERIOR VALUES ARE BOUNDED BY THE BOUNDARY — NEVER UNBOUNDED
INSIDE: the MEAN VALUE PROPERTY states a harmonic function's value at any point equals the AVERAGE
of its values on any surrounding circle. A direct consequence: a harmonic function on a bounded
region CANNOT attain its maximum or minimum at an INTERIOR point — extremes occur ONLY on the
BOUNDARY. For a plate with edges at $100°$ and $0°$: the interior temperature can NEVER exceed
$100°$ nor drop below $0°$ anywhere inside — an interior "hot spot" exceeding every surrounding
value would contradict the mean value property. Also NEVER assume $\nabla^2u=0$ alone determines a
unique solution — boundary conditions are still required to pin down ONE specific harmonic function
from the whole family, exactly as with the heat and wave equations.

## Mental Models
- **"Laplace's Equation has no time variable because it describes the finished state, not the
  journey there."**
- **"The same separation-of-variables machine runs here — only the second equation's solution
  changes from decaying exponentials to hyperbolic sine/cosine, since there's no time decay to
  produce."**
- **"A harmonic function's interior values are trapped inside its boundary's range — the mean
  value property forbids an interior extreme."**

## Why Students Fail

### MC-1: INTERIOR-HARMONIC-VALUE-ASSUMED-UNBOUNDED-BY-BOUNDARY
- **Surface form**: believes a harmonic function's interior values could exceed the range of its
  boundary values.
- **Birth type**: Foundational severity (Blueprint's own declared severity — without the mean
  value property made explicit, there's no obvious reason interior values couldn't exceed boundary
  extremes).
- **Repair**: re-walk the plate scenario's direct physical/mathematical bound via the mean value
  property.

### MC-2: LAPLACE-SEPARATION-CONFUSED-WITH-HEAT-EQUATION-SEPARATION
- **Surface form**: applies the heat equation's decaying-exponential time-solution form to
  Laplace's Equation, missing that it has no time variable and produces hyperbolic sine/cosine
  instead.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the separation
  procedure looks identical at first, inviting a reflexive reuse of the heat equation's specific
  solution form for the second ODE).
- **Repair**: re-walk the explicit $Y''-n^2Y=0$ derivation, contrasting the sign against the heat
  equation's first-order decay ODE.

### MC-3: HARMONIC-FUNCTION-ASSUMED-TO-REQUIRE-NO-BOUNDARY-DATA
- **Surface form**: believes a harmonic function is fully determined by $\nabla^2u=0$ alone,
  without needing boundary conditions.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the equation's elegant,
  parameter-free appearance suggests it might be self-determining, unlike equations with an
  explicit forcing term).
- **Repair**: re-anchor on the heat/wave equations' own need for boundary/initial data as a direct
  parallel.

## Misconceptions

### MC-1: INTERIOR-HARMONIC-VALUE-ASSUMED-UNBOUNDED-BY-BOUNDARY
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: LAPLACE-SEPARATION-CONFUSED-WITH-HEAT-EQUATION-SEPARATION
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-3: HARMONIC-FUNCTION-ASSUMED-TO-REQUIRE-NO-BOUNDARY-DATA
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Laplace's Equation is a snapshot of the finish line, not a video of the race — the heat
  equation shows the race itself."**
- **Anti-analogy**: the second separated equation's solution is NOT another decaying exponential
  just because the first one (from the heat equation) was — with no time derivative involved, it
  genuinely takes the hyperbolic sine/cosine form instead.

## Demonstrations
- **Demonstration 1 (targets MC-2)**: the full rectangle-boundary-value worked example, deriving
  $X_n=\sin(nx)$ (identical to the prior separation-technique concept) and the NEW
  $Y_n=A_n\sinh(ny)$.
- **Demonstration 2 (targets MC-1)**: the plate-temperature maximum-principle argument, bounding
  interior values by the boundary's $[0°,100°]$ range.
- **Demonstration 3 (targets MC-3)**: the direct parallel to the heat/wave equations' own
  boundary/initial-data requirement.

## Discovery Questions
1. "Does Laplace's Equation have a time variable — and what does that tell you about what kind of
   physical situation it describes?"
2. "When you separate variables for Laplace's Equation, does the second equation give a decaying
   exponential, like the heat equation, or something different?"
3. "Could a harmonic function's interior value exceed every value on its boundary?"

## Teaching Sequence
1. **Representation shift**: the equilibrium/no-time-variable framing, contrasted with the heat
   equation.
2. **Representation shift (continued)**: the full separation-of-variables derivation, working
   Demonstration 1, isolating MC-2.
3. **Contrast pair**: the mean value property and maximum principle, working Demonstration 2,
   isolating MC-1, plus Demonstration 3 isolating MC-3.
4. **Mastery gate**: require a correct explanation of the equilibrium/no-time framing, a correct
   full separation-of-variables solution on a rectangle, and a correct application of the maximum
   principle to bound interior values, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept Laplace's Equation described as modeling an evolving process rather than a settled
  equilibrium.
- Never accept the second separated equation solved with a decaying exponential rather than
  hyperbolic sine/cosine.
- Never accept a harmonic function's interior value claimed to exceed its boundary's range.

## Voice Teaching Notes
- Say "is there a time variable in this equation — what does that tell you about what it's
  describing?" whenever Laplace's Equation is introduced.
- After separating variables, ask "does this second equation have a first-order time derivative,
  or does something different apply here?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies Laplace's Equation as the elliptic,
  time-free equilibrium case.
- **Rung 2 (application)**: learner correctly solves a rectangle boundary value problem via
  separation of variables, using hyperbolic sine/cosine correctly.
- **Rung 3 (transfer)**: learner correctly applies the maximum principle to bound interior values
  from boundary data alone, and names conformal mapping as the technique for non-rectangular
  domains.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the plate-temperature maximum-principle bound.
- If MC-2 recurs, re-derive $Y''-n^2Y=0$ explicitly, contrasting against the heat equation's decay
  ODE.
- If MC-3 recurs, re-anchor on the heat/wave equations' own boundary/initial-data requirement.

## Memory Hooks
- "No time variable means it's describing the finished equilibrium, not the process."
- "The second separated equation here gives hyperbolic sine/cosine, never a decaying
  exponential."
- "A harmonic function's interior values can never exceed its boundary's range — the mean value
  property forbids it."

## Transfer Connections
- `math.de.separation-of-variables-pde` (already authored, this campaign, Batch 165): supplies the
  separation ansatz, eigenvalue-problem derivation, and Fourier-series-matching procedure this
  concept directly reapplies to a new PDE.
- `math.de.pde` (already authored, this campaign, Batch 161): supplies the elliptic/parabolic/
  hyperbolic classification this concept's equation exemplifies.
- `math.cx.harmonic-functions` (not yet authored): the KG's declared cross-link, the complex-
  analysis characterization of harmonic functions as real/imaginary parts of holomorphic functions.

## Cross-Subject Connections
- Physics/engineering: electrostatic potential in charge-free regions, steady-state fluid flow,
  gravitational potential.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.laplace-equation.md`, reused by reference
  for its steady-state-plate motivating example, its full rectangle separation-of-variables
  derivation, its maximum-principle physical consequence, and its three-misconception registry
  (severity levels adopted directly as declared). Orientation-level treatment maintained for the
  mean value property/maximum principle/conformal mapping per the Blueprint's own cited corpus
  precedent.
- Transfer probe: the Blueprint's own independence-mode probe (pending `math.cx.harmonic-
  functions`'s authoring), applying the maximum principle to an electrical-engineering steady-state
  potential scenario.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.separation-of-variables-pde`, unlocks none, cross_links `math.cx.harmonic-functions`,
  expert/apply, mastery_threshold 0.8, estimated_hours 7) was directly verified against the live KG
  and matches exactly. `math.cx.harmonic-functions`'s authorship was independently re-verified
  directly against the EDUCATIONAL-BRAIN corpus (not the blueprints directory) and confirmed still
  unauthored — the Blueprint's independence-mode deferral remains correct. This entry, together
  with `math.de.bifurcation` authored earlier this same batch, closes `math.de`'s entire
  currently-reachable frontier for this campaign.

## Version History
- 2026-09-19 (Batch 167): authored. Second entry this batch, closing `math.de`'s currently-
  reachable frontier. Companion batch concept: `math.de.bifurcation`.
