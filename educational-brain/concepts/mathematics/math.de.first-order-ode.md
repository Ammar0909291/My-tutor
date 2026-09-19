# math.de.first-order-ode

## Identity
- **KG id**: `math.de.first-order-ode`
- **Domain**: math.de
- **Requires**: `math.de.ode`, `math.calc.antiderivatives`, `math.calc.u-substitution`
- **Unlocks**: `math.de.second-order-ode`
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 6

## Learning Objective
Solve SEPARABLE first-order ODEs (verify the RHS factors as $h(x)\cdot g(y)$, separate, integrate
both sides, solve for $y$, apply initial conditions) without dropping the arbitrary constant when
exponentiating; recognize the LINEAR first-order form $y'+P(x)y=Q(x)$ and apply the integrating
factor $\mu=e^{\int P(x)dx}$; and correctly select between separation and the integrating factor
based on the equation's actual structure, never assumption.

## Core Understanding
SEPARABILITY REQUIRES THE RHS TO FACTOR AS A PRODUCT, NEVER A SUM: reusing
`math.calc.antiderivatives`'s own integration machinery directly, a first-order ODE $y'=f(x,y)$ is
separable iff $f(x,y)=h(x)\cdot g(y)$ — a genuine product. $y'=xy$ is separable ($h(x)=x,g(y)=y$);
$y'=x+y$ is NEVER separable, since no product of a pure-$x$ function and a pure-$y$ function
equals a sum. Attempting to force separation on a sum wastes work and produces incorrect results
— the standard form $y'+P(x)y=Q(x)$ and the integrating factor $\mu=e^{\int P(x)dx}$ are the
correct tool for such linear-but-non-separable cases.

THE ARBITRARY CONSTANT MUST SURVIVE EXPONENTIATION, NEVER DROPPED: solving $y'=y$ via
$dy/y=dx\Rightarrow\ln|y|=x+C$, exponentiating gives $|y|=e^{x+C}=e^C\cdot e^x$ — since $e^C>0$
is itself an arbitrary positive constant (and $y$ can be positive or negative), write $A=\pm e^C$
(a nonzero constant): $y=Ae^x$. Writing $y=e^x$ (dropping $C$ entirely) destroys the general
solution family and makes satisfying any initial condition other than $y(0)=1$ impossible — $A$,
not $C$, is what an initial condition like $y(0)=3$ actually determines ($A=3$, giving
$y=3e^x$).

BOTH SIDES OF A SEPARATED EQUATION GAIN A CONSTANT, COMBINED INTO ONE BY CONVENTION: integrating
$y\,dy=x\,dx$ gives $y^2/2+C_1=x^2/2+C_2$; since $C_2-C_1$ is itself arbitrary, it is written as a
single constant $C$ on one side: $y^2/2=x^2/2+C$. Omitting $C$ entirely yields only ONE specific
curve ($C=0$), not the general solution family — $C$ must always be carried through and only
resolved by an initial condition.

## Mental Models
- **"Separability is a factoring test on the RHS — a sum of an $x$-function and a $y$-function is
  never separable, no matter how it's rearranged."**
- **"Exponentiating $\ln|y|=f(x)+C$ turns the additive constant into a MULTIPLICATIVE one,
  $A=e^C$ — it never simply vanishes."**

## Why Students Fail

### MC-1: SEPARATION-ON-NON-SEPARABLE
- **Surface form**: attempts to "separate" $y'=y+x$ or $y'=x+y^2$ by moving $y$-terms and
  $x$-terms to opposite sides, producing incorrect or undefined expressions.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity —
  the separation procedure is applied by rote pattern-matching without first verifying the
  factoring condition).
- **Repair**: re-check whether the RHS genuinely factors as $h(x)\cdot g(y)$; if not, switch to
  the integrating factor for the linear standard form.

### MC-2: CONSTANT-ABSORBED-PREMATURELY
- **Surface form**: after $\ln|y|=f(x)+C$, writes $y=e^{f(x)}$, losing the general-solution family
  and any ability to apply an initial condition.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared trigger — the
  exponentiation step's algebra, $e^{f(x)+C}=e^C\cdot e^{f(x)}$, is easy to skip if not written
  out explicitly).
- **Repair**: re-derive the exponentiation explicitly, showing $e^C$ becomes the multiplicative
  constant $A$, never dropped.

### MC-3: SINGLE-SIDE-CONSTANT
- **Surface form**: integrates both sides of the separated equation but adds $+C$ to only one
  side or neither.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared trigger — each integral
  technically produces its own constant, but the convention of combining them into one is easy to
  forget mid-computation).
- **Repair**: re-anchor on both sides genuinely gaining a constant, combined by convention into a
  single $C$.

## Misconceptions

### MC-1: SEPARATION-ON-NON-SEPARABLE
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: CONSTANT-ABSORBED-PREMATURELY
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: SINGLE-SIDE-CONSTANT
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Separability is a locked door that only opens for products — a sum, however simple, never
  has the right key."**
- **Anti-analogy**: dropping the constant when exponentiating does NOT just simplify the answer
  — it silently throws away every solution except the one specific curve through $(0,1)$.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $y'=xy$ ($h(x)=x,g(y)=y$, separable) versus $y'=x+y$
  (a sum, never separable) — the latter requires standard form $y'-y=x$ and the integrating
  factor $\mu=e^{-x}$.
- **Demonstration 2 (targets MC-2)**: solving $y'=3y$ gives $\ln|y|=3x+C$; the WRONG $y=e^{3x}$
  (dropping $C$) versus the CORRECT $y=Ae^{3x}$ ($A=e^C$) — only the correct form can satisfy
  $y(0)=2$ (giving $A=2$).
- **Demonstration 3 (targets MC-3)**: integrating $y\,dy=x\,dx$ without $C$ gives only $y^2=x^2$
  (one specific curve); with $C$, $y^2=x^2+K$ is the true general family, matched against an
  initial condition to find $K$.

## Discovery Questions
1. "Can $y'=x+y^2$ be separated, or does its structure rule that out?"
2. "After $\ln|y|=3x+C$, is $y=e^{3x}$ the full general solution, or is something missing?"
3. "If you integrate both sides of a separated equation, does only one side gain a constant?"

## Teaching Sequence
1. **Anchor**: connect to a familiar antiderivative problem ($y'=2x\to y=x^2+C$), then extend to
   $y'=y$ via separation of variables, previewing the $A=e^C$ step.
2. **Worked example pair**: a separable ODE with an initial condition, and a linear (non-
   separable) ODE via the integrating factor, building fluency in both methods.
3. **Contrast pair**: Demonstration 1's separable-versus-non-separable table, isolating MC-1 by
   requiring the factoring test checked explicitly.
4. **Contrast pair**: Demonstration 2's constant-handling comparison, isolating MC-2 by requiring
   the full exponentiation algebra shown.
5. **Contrast pair**: Demonstration 3's single-versus-combined-constant comparison, isolating MC-3
   by requiring both sides' constants tracked.
6. **Mastery gate**: require a correctly solved separable ODE with initial condition, a correctly
   solved linear ODE via integrating factor, and a correct method-selection justification, at the
   Blueprint's own stated MAMR of 5/5 (⌈0.85×5⌉).

## Tutor Actions
- Never accept separation attempted on an ODE without first verifying the RHS factors as a
  product.
- Never accept $y=e^{f(x)}$ as a final answer without the multiplicative constant $A$ retained.

## Voice Teaching Notes
- Say "does the right side actually factor into an x-part times a y-part, or is that a sum?"
  whenever separation is attempted.
- When a solution is exponentiated, ask "where did the constant go — did it become a
  multiplicative $A$, or did it vanish?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly determines whether a given first-order ODE is
  separable.
- **Rung 2 (application)**: learner correctly solves a separable ODE with an initial condition,
  retaining the constant throughout, and correctly applies the integrating factor to a linear
  non-separable ODE.
- **Rung 3 (transfer)**: learner correctly sets up and solves a NEW applied first-order linear
  ODE (e.g. a mixing-tank problem), correctly interpreting the long-run equilibrium behavior.

## Tutor Recovery Strategy
- If MC-1 recurs, re-check the factoring condition and switch to the integrating factor if it
  fails.
- If MC-2 recurs, re-derive the exponentiation algebra explicitly.
- If MC-3 recurs, re-anchor on both sides gaining a constant, combined into one.

## Memory Hooks
- "A sum on the right side means separation is off the table — check for a product first."
- "Exponentiating turns +C into a multiplicative A — never let it disappear."
- "One combined constant, always carried through until an initial condition resolves it."

## Transfer Connections
- `math.de.ode` (already authored, this campaign, Batch 99): supplies the ODE definition,
  order/degree vocabulary, and general/particular solution framework this concept builds solving
  techniques on top of.
- `math.calc.antiderivatives` (already authored): supplies the integral machinery (reverse power
  rule, $\int e^{ax}dx$, $\int\frac1xdx=\ln|x|+C$) both solution methods directly reuse.
- `math.calc.u-substitution` (already authored): supplies the substitution technique used in
  computing $\int P(x)dx$ for the integrating factor.
- `math.de.second-order-ode` (not yet authored): the KG's declared unlock, extending first-order
  methods (particularly reduction of order) to higher-order equations.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.first-order-ode.md`, reused by reference
  for its antiderivative-to-separation extension, its separable-versus-linear worked example
  pair, its method-selection decision tree, and its three-misconception registry (severity levels
  and trigger conditions adopted directly as declared).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, examining a
  brine-mixing tank problem, its standard-form linear ODE, the integrating-factor solution, and
  the long-run equilibrium interpretation.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.de.ode`+
  `math.calc.antiderivatives`+`math.calc.u-substitution`, unlocks `math.de.second-order-ode`,
  cross_links none, advanced/apply, mastery_threshold 0.85, estimated_hours 6) was directly
  verified against the live KG and matches exactly.

## Version History
- 2026-09-18 (Batch 102): authored. First entry this batch. Companion batch concept:
  `math.prob.independence`. `math.de` moves 4/56 → **5/56** this batch.
