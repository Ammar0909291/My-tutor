# math.de.ode

## Identity
- **KG id**: `math.de.ode`
- **Domain**: math.de
- **Requires**: `math.calc.derivative-intro`, `math.calc.antiderivatives`, `math.func.function-concept`
- **Unlocks**: `math.de.first-order-ode`, `math.de.second-order-ode`
- **Cross-links**: `math.phys.classical-mechanics` (cross-subject, not yet authored — verified
  via `ls`; independence mode used, see Blueprint References)
- **Difficulty**: advanced
- **Bloom level**: understand
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Recognize that an ORDINARY DIFFERENTIAL EQUATION relates an unknown FUNCTION $y(x)$ and its
derivatives — its solution is a function, never a number, directly extending
`math.calc.antiderivatives`'s own $F'=f\Rightarrow F(x)+C$ machinery; correctly distinguish the
ORDER (the highest derivative's index) from the DEGREE (that derivative's power); and distinguish
a GENERAL solution (containing $n$ arbitrary constants for an $n$-th order ODE) from a
PARTICULAR solution (constants fixed by initial/boundary conditions), verifying a proposed
function by direct substitution and differentiation.

## Core Understanding
AN ODE'S SOLUTION IS A FUNCTION, NEVER A NUMBER: reusing `math.calc.antiderivatives`'s own
already-familiar machinery directly, $s'(t)=2t$ integrates to the GENERAL solution
$s(t)=t^2+C$ — a function of $t$ with one free constant, never a single value. An algebraic
equation like $x^2-4=0$ has finitely many NUMBER solutions ($x=\pm2$); an ODE like $y'-2y=0$ has
infinitely many FUNCTION solutions ($y=Ce^{2x}$, one per value of $C$) — an initial condition
like $s(0)=3$ pins down $C$ uniquely (here $C=3$), giving the PARTICULAR solution $s(t)=t^2+3$.

ORDER IS THE HIGHEST DERIVATIVE'S INDEX; DEGREE IS ITS POWER — THE TWO ARE INDEPENDENT: for
$F(x,y,y',\dots,y^{(n)})=0$, the ORDER is the index of the highest-order derivative present
(count the prime marks); the DEGREE is the POWER to which that specific highest-order derivative
is raised, after clearing fractions/radicals. For $(y'')^3+y'=0$: the highest derivative is
$y''$ (order 2), raised to the power 3 (degree 3) — the exponent 3 belongs to $y''$
specifically, never mistaken for the order itself. Order and degree vary independently: high
order can pair with low degree, and vice versa.

THE GENERAL SOLUTION HAS EXACTLY $n$ ARBITRARY CONSTANTS FOR AN $n$-TH ORDER ODE: each
integration needed to solve an $n$-th order ODE introduces one constant, so the general solution
contains exactly $n$ free constants — one initial/boundary condition is needed per constant to
reach a unique particular solution. Verification always proceeds the same way regardless of
solving technique: differentiate the proposed $y=f(x)$ the required number of times, substitute
into the ODE, and confirm the result holds identically for all $x$ — e.g. $y=3e^{-2x}$ satisfies
$y'+2y=0$ since $y'=-6e^{-2x}$ and $y'+2y=-6e^{-2x}+6e^{-2x}=0$.

## Mental Models
- **"An ODE asks for an entire curve whose slope pattern matches a rule at every point — not a
  single point satisfying an equation."**
- **"Order counts the prime marks on the highest derivative; degree is that derivative's own
  exponent — two independent numbers, never read off the same symbol."**

## Why Students Fail

### MC-1: SOLUTION-IS-A-NUMBER
- **Surface form**: expects an ODE to "solve for $y$" as a specific number, e.g. writing $y=5$ or
  "$y$ is some constant" as the solution.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared Foundational severity —
  years of solving algebraic equations for numbers make a function-valued "solution" feel like a
  category error until directly confronted).
- **Repair**: re-verify by direct substitution, showing a constant function fails an ODE like
  $y'=2x$ while a genuine function like $y=x^2$ satisfies it identically.

### MC-2: ORDER-VERSUS-DEGREE
- **Surface form**: reports the degree (a derivative's power) as the order, or vice versa, e.g.
  claiming $(y'')^3+y=0$ has order 3.
- **Birth type**: Type 4, notation-induced (Blueprint's own declared severity — both order and
  degree are read off the same symbol, $y''$, making the two numbers easy to conflate).
- **Repair**: re-count the prime marks on the highest derivative for order, then separately
  identify that derivative's own exponent for degree.

### MC-3: GENERAL-PARTICULAR-CONFLATED
- **Surface form**: doesn't recognize that a general solution needs one constant per order, or
  adds/omits constants incorrectly.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared severity — without
  explicit tracking, the number of required constants is easy to miscount).
- **Repair**: re-derive by counting the integrations actually performed, one constant per
  integration.

## Misconceptions

### MC-1: SOLUTION-IS-A-NUMBER
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: ORDER-VERSUS-DEGREE
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

### MC-3: GENERAL-PARTICULAR-CONFLATED
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A number-solution is a single landing spot; a function-solution is an entire flight path
  satisfying a rule at every moment along the way."**
- **Anti-analogy**: a higher-order derivative's power does NOT make the ODE higher-order — order
  tracks WHICH derivative is present, degree tracks its EXPONENT, and neither substitutes for
  the other.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: is $y=5$ a solution of $y'=2x$? $y'=0\ne2x$ except at
  $x=0$ — fails. Is $y=x^2$ a solution? $y'=2x=2x$ — holds identically for ALL $x$, confirming
  $y=x^2$ (a function) is the genuine solution, never a single number.
- **Demonstration 2 (targets MC-2)**: for $y'''-(y')^2+3y=\cos(x)$: highest derivative is $y'''$
  (order 3), appearing to the first power (degree 1) — the $(y')^2$ term's exponent 2 belongs to
  $y'$, not the highest-order derivative, and does not affect the degree.
- **Demonstration 3 (targets MC-3)**: $y'=3x^2$ integrates once (first order) to the general
  solution $y=x^3+C$ (exactly one constant); applying $y(0)=5$ gives $C=5$, the particular
  solution $y=x^3+5$.

## Discovery Questions
1. "Is $y=5$ a valid candidate solution for $y'=2x$? What happens when you differentiate it and
   substitute?"
2. "In $(y'')^3+y'=0$, is the '3' the order or the degree?"
3. "How many arbitrary constants should the general solution of a third-order ODE contain?"

## Teaching Sequence
1. **Anchor**: connect to `math.calc.antiderivatives`'s own $F'=f\Rightarrow F(x)+C$ machinery,
   reframing a familiar antiderivative problem as an ODE.
2. **Representation shift**: Demonstration 1's number-versus-function verification, isolating
   MC-1 by requiring an explicit substitution check.
3. **Conceptual shift**: Demonstration 2's order/degree separation, isolating MC-2 by requiring
   both numbers be identified independently.
4. **Contrast pair**: Demonstration 3's constant-counting, isolating MC-3 by connecting the
   number of constants directly to the number of integrations performed.
5. **Mastery gate**: require a correct order/degree classification, a correct solution
   verification by substitution, and a correct particular-solution derivation from an initial
   condition, at the Blueprint's own stated MAMR of 5/5 (⌈0.85×5⌉).

## Tutor Actions
- Never accept a single number as a claimed ODE solution without a substitution check.
- Never accept an order or degree claim without the highest-order derivative and its exponent
  identified separately.

## Voice Teaching Notes
- Say "does that satisfy the equation at every $x$, or just at one point?" whenever a candidate
  solution is proposed.
- When order or degree is stated, ask "which derivative is the highest, and what power is IT
  raised to?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies the order and degree of a new ODE.
- **Rung 2 (application)**: learner correctly verifies whether a given function solves a new ODE
  by substitution.
- **Rung 3 (transfer)**: learner correctly derives a particular solution from a general solution
  and a NEW initial condition, and correctly counts the required number of constants for an
  unfamiliar ODE's order.

## Tutor Recovery Strategy
- If MC-1 recurs, re-verify by direct substitution on a fresh candidate.
- If MC-2 recurs, re-count the prime marks for order, then the exponent for degree, separately.
- If MC-3 recurs, re-derive by counting the actual integrations performed.

## Memory Hooks
- "An ODE's solution is a whole function, checked everywhere — never a single number."
- "Order counts primes; degree counts powers — two different questions about the same symbol."
- "One constant per integration, one condition per constant."

## Transfer Connections
- `math.calc.derivative-intro` (already authored): supplies the derivative notation and
  instantaneous-rate-of-change interpretation this concept's equations are built from.
- `math.calc.antiderivatives` (already authored): supplies the $F'=f\Rightarrow F(x)+C$
  machinery this concept's general-solution notion directly extends.
- `math.func.function-concept` (already authored): supplies the function-as-a-rule framing this
  concept's central "solution is a function" shift depends on.
- `math.de.first-order-ode`, `math.de.second-order-ode` (not yet authored): the KG's declared
  unlocks, building solving techniques on top of this concept's classification and verification
  framework.

## Cross-Subject Connections
- `math.phys.classical-mechanics` (cross-subject, not yet authored — confirmed via `ls`): a
  future cross-link once authored could connect Newton's second law's own second-order-ODE
  structure directly to this concept's order/degree machinery; independence mode used for now.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.ode.md`, reused by reference for its
  antiderivative-to-ODE reframing, its order-versus-degree classification table, its
  verification-by-substitution procedure, and its three-misconception registry (severity levels
  and trigger conditions adopted directly as declared).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe, examining a
  radioactive-decay ODE $dM/dt=-0.03M$, its order/degree, a solution verification, a
  particular-solution derivation from $M(0)=100$, and a half-life computation.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.calc.derivative-intro`+`math.calc.antiderivatives`+`math.func.function-concept`, unlocks
  `math.de.first-order-ode`+`math.de.second-order-ode`, cross_links
  `math.phys.classical-mechanics`, advanced/understand, mastery_threshold 0.85,
  estimated_hours 4) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-18 (Batch 99): authored. Second entry this batch, opening the `math.de` domain (0/56
  → 1/56). Companion batch concept: `math.prob.probability-axioms`.
