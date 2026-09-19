# math.de.separable

## Identity
- **KG id**: `math.de.separable`
- **Domain**: math.de
- **Requires**: `math.de.first-order-ode`, `math.calc.definite-integral`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
Identify a separable ODE $dy/dx=g(x)h(y)$; rewrite it as $(1/h(y))\,dy=g(x)\,dx$ and integrate
BOTH sides to obtain the implicit general solution with EXACTLY ONE arbitrary constant, never two;
solve for $y$ explicitly WHEN POSSIBLE, recognizing many separable ODEs yield implicit solutions
that cannot be simplified further; apply initial conditions for the particular solution; and
identify EQUILIBRIUM (constant) solutions where $h(y)=0$ BEFORE dividing, checking whether they
are captured by the general formula or must be recorded separately.

## Core Understanding
TWO INDEFINITE INTEGRALS PRODUCE ONE ARBITRARY CONSTANT, NEVER TWO: writing
$\int(1/h(y))\,dy+C_1=\int g(x)\,dx+C_2$ and moving $C_1$ across gives
$H(y)=G(x)+(C_2-C_1)$ — since $C_2-C_1$ is itself arbitrary, it is written as a SINGLE constant
$C$. A first-order ODE's general solution has EXACTLY one arbitrary constant; the standard
shortcut integrates the left side without a constant and adds $+C$ only on the right, giving
$H(y)=G(x)+C$ directly.

EQUILIBRIUM SOLUTIONS MUST BE CHECKED BEFORE DIVIDING BY $h(y)$, NEVER SKIPPED: for
$dy/dx=y^2$: dividing by $h(y)=y^2$ requires $y\ne0$ first. Separating and integrating gives
$y=-1/(x+C)$ — but $h(0)=0$ means $y=0$ is ALSO a valid constant solution, genuinely NOT captured
by the general formula (as $C\to\pm\infty$, $y\to0$ but never equals it for finite $C$) — it must
be recorded SEPARATELY. Contrast $dy/dx=ky$: here $y=0$ (from $h(0)=0$) IS captured, since the
general solution $y=Ae^{kx}$ includes $A=0$.

A SEPARABLE ODE'S SOLUTION IS NOT ALWAYS EXPLICITLY SOLVABLE FOR $y$: for $dy/dx=-x/y$: separating
and integrating gives $y^2/2=-x^2/2+C$, i.e. $x^2+y^2=R^2$ (circles) — this CANNOT be solved for a
single $y=f(x)$ without a $\pm$ branch choice: $y=\pm\sqrt{R^2-x^2}$, each sign a separate valid
solution branch. The implicit form $H(y)=G(x)+C$ is itself a legitimate, complete answer whenever
further simplification isn't available — "solved" does not always mean "solved explicitly for
$y$."

## Mental Models
- **"Separating splits the equation into two integrals, but they merge into ONE constant — never
  carry two."**
- **"Always check h(y)=0 BEFORE dividing — those are constant solutions that might vanish from the
  general formula entirely if you don't record them."**

## Why Students Fail

### MC-1: TWO-CONSTANTS-FROM-TWO-INTEGRALS
- **Surface form**: writes $\int(1/h)dy+C_1=\int g\,dx+C_2$ and carries two separate constants
  throughout, rather than combining them.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — "every
  indefinite integral gets a +C" is learned literally, and seeing two integrals prompts adding two
  constants without recognizing their difference is itself one arbitrary constant).
- **Repair**: re-derive $H(y)=G(x)+(C_2-C_1)=G(x)+C$ explicitly, confirming a first-order ODE has
  exactly one arbitrary constant.

### MC-2: FORGETTING-CONSTANT-SOLUTIONS
- **Surface form**: divides by $h(y)$ without checking whether $h(y)=0$ gives a valid equilibrium
  solution, missing $y=y_0$.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — the division
  step feels routine, and returning to check $y=y_0$ as a separate case is easy to skip).
- **Repair**: re-walk the $dy/dx=y^2$ example, confirming $y=0$ is a genuinely separate solution
  not captured by $y=-1/(x+C)$ for any finite $C$.

### MC-3: SEPARABLE-MEANS-ALWAYS-EXPLICITLY-SOLVABLE
- **Surface form**: assumes the implicit solution $H(y)=G(x)+C$ can always be solved explicitly
  for $y$.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type — simple examples
  like $y'=ky$ and $y'=y/x$ all have clean explicit solutions, leading students to expect this
  always holds).
- **Repair**: re-walk the $dy/dx=-x/y$ example, showing the implicit circle equation requires a
  $\pm$ branch choice and cannot be written as one single explicit $y=f(x)$.

## Misconceptions

### MC-1: TWO-CONSTANTS-FROM-TWO-INTEGRALS
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-2: FORGETTING-CONSTANT-SOLUTIONS
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: SEPARABLE-MEANS-ALWAYS-EXPLICITLY-SOLVABLE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Separating variables is like sorting laundry into two piles before washing — the two piles
  (integrals) still end up combined into one load (one constant) at the end."**
- **Anti-analogy**: an implicit solution is NOT an unfinished answer waiting to be solved for
  y — for equations like $x^2+y^2=R^2$, the implicit form (or its explicit branches) IS the
  complete, correct solution.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $dy/dx=y/x$ derivation, showing two integration
  constants collapsing into the single $C$ in $y=Cx$.
- **Demonstration 2 (targets MC-2)**: the $dy/dx=y^2$ example, showing $y=0$ as a genuinely
  separate equilibrium solution not captured by $y=-1/(x+C)$.
- **Demonstration 3 (targets MC-3)**: the $dy/dx=-x/y$ circle-family example, requiring a $\pm$
  branch choice rather than a single explicit solution.

## Discovery Questions
1. "When you integrate both sides of a separated equation, do you end up with one arbitrary
   constant or two?"
2. "Before dividing by h(y), have you checked whether h(y)=0 gives an equilibrium solution that
   might not appear in the general formula?"
3. "Does every separable ODE's implicit solution H(y)=G(x)+C simplify to an explicit y=f(x)?"

## Teaching Sequence
1. **Representation shift**: the separation-and-integration method and the one-constant
   clarification (Demonstration 1), isolating MC-1.
2. **Pattern induction**: implicit and equilibrium solutions (Demonstrations 2 and 3), isolating
   MC-2 and MC-3.
3. **Mastery gate**: require a correct separable-ODE solution with the constant correctly combined,
   a correct identification of all equilibrium solutions before separating, and a correctly
   handled implicit solution requiring branch selection, at the Blueprint's own stated MAMR of
   5/5.

## Tutor Actions
- Never accept two separate arbitrary constants carried through a separable-ODE solution.
- Never accept a separable-ODE solution that skips checking $h(y)=0$ for equilibrium solutions.
- Never accept a claim that every separable ODE's implicit solution can be solved explicitly for
  $y$.

## Voice Teaching Notes
- Say "how many arbitrary constants should a first-order ODE's general solution have?" whenever
  two integrals are combined.
- Before any division by $h(y)$, ask "what values of y make h(y) zero, and are those solutions
  captured by your general formula?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly separates and integrates a basic separable ODE with
  a single combined constant.
- **Rung 2 (application)**: learner correctly identifies and records an equilibrium solution not
  captured by the general formula.
- **Rung 3 (transfer)**: learner correctly solves the logistic equation via partial fractions,
  identifies its equilibrium solutions, and describes the long-run behavior.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the single combined constant from the two integration constants.
- If MC-2 recurs, re-walk the $dy/dx=y^2$ equilibrium-solution example.
- If MC-3 recurs, re-walk the $dy/dx=-x/y$ implicit-circle example.

## Memory Hooks
- "Two integrals, one constant — always combine them."
- "Check h(y)=0 before dividing — equilibrium solutions can vanish from the general formula."
- "Implicit is a valid final answer — not every separable ODE solves explicitly for y."

## Transfer Connections
- `math.de.first-order-ode` (already authored, certified domain): supplies the first-order ODE
  framework this concept's separation technique specializes.
- `math.calc.definite-integral` (already authored, certified domain): supplies the integration
  machinery used on both sides of the separated equation.
- `math.de.linear-first-order` (not yet authored): the KG's declared related concept, an
  alternative first-order solution technique for equations that aren't separable.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.separable.md`, reused by reference for its
  exponential-growth, $y^2$, and $-x/y$ worked examples, and its three-misconception library
  (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, applying separation of variables to
  the logistic equation, PDE separation of variables, and Torricelli's law.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.first-order-ode`/`math.calc.definite-integral`, unlocks none, cross_links none,
  advanced/apply, mastery_threshold 0.9, estimated_hours 4) was directly verified against the live
  KG and matches exactly.

## Version History
- 2026-09-19 (Batch 146): authored. Second entry this batch. Companion batch concept:
  `math.de.ivp`.
