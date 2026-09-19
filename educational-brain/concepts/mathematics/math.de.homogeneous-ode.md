# math.de.homogeneous-ode

## Identity
- **KG id**: `math.de.homogeneous-ode`
- **Domain**: math.de
- **Requires**: `math.de.first-order-ode`, `math.de.separable`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 3

## Learning Objective
Identify a homogeneous first-order ODE $dy/dx=f(y/x)$ (equivalently, $M,N$ homogeneous of the
SAME degree, never necessarily degree zero), correctly distinguishing it from a "homogeneous
LINEAR ODE" ($dy/dx+P(x)y=0$, zero right side) — the same word describing two genuinely different
structures; apply the substitution $v=y/x$, differentiating via the PRODUCT RULE
$dy/dx=v+x\,dv/dx$ (never just $dv/dx$); reduce to a separable ODE in $v,x$; and back-substitute
$y=vx$ into the solution.

## Core Understanding
"HOMOGENEOUS FIRST-ORDER ODE" AND "HOMOGENEOUS LINEAR ODE" ARE GENUINELY DIFFERENT CONCEPTS, NEVER
THE SAME TECHNIQUE: $dy/dx=y/x$ is BOTH a homogeneous first-order ODE ($f(v)=v$) AND a linear ODE
with zero right side — solvable by either method here. But $dy/dx=(x+y)/x=1+y/x$ is ONLY
homogeneous first-order ($f(v)=1+v$), NOT a zero-right-side linear equation — applying the wrong
technique (e.g. treating it as $dy/dx+Py=0$) would fail. The word "homogeneous" genuinely means
different things in each context — always check which structure is actually present.

THE SUBSTITUTION $y=vx$ REQUIRES THE PRODUCT RULE — NEVER JUST $dv/dx$: differentiating
$y=v(x)\cdot x$ gives $dy/dx=v\cdot1+x\cdot dv/dx=v+x\,dv/dx$ — the $v$ term is ESSENTIAL, arising
because $y$ is a PRODUCT of two functions of $x$ ($v$ and $x$ itself), not from a simple chain-rule
substitution. Substituting $dy/dx=v+x\,dv/dx$ into $dy/dx=f(v)$ gives $v+x\,dv/dx=f(v)$, which
rearranges to the genuinely SEPARABLE equation $dv/(f(v)-v)=dx/x$.

THE HOMOGENEITY TEST REQUIRES $M$ AND $N$ TO SHARE THE SAME DEGREE — NEVER BOTH DEGREE ZERO: for
$M(tx,ty)=t^nM(x,y)$ and $N(tx,ty)=t^nN(x,y)$ with the SAME $n$ (any integer, commonly $1$ or
$2$, never required to be $0$): for $dy/dx=(x^2+y^2)/(2xy)$: $M=-(x^2+y^2)$, $N=2xy$, BOTH degree
$2$ — homogeneous. Substituting $v=y/x$: $v+x\,dv/dx=(1+v^2)/(2v)$, separating to
$2v/(1-v^2)\,dv=dx/x$, integrating and back-substituting gives $x^2-y^2=Kx$.

## Mental Models
- **"Homogeneous first-order means the ODE depends only on the ratio y/x — a scale-invariance
  property, genuinely different from a linear ODE's zero right side, even though both share the
  word 'homogeneous.'"**
- **"Substituting y = vx always costs an extra v term in the derivative — the product rule never
  disappears just because one factor is 'the new variable.'"**

## Why Students Fail

### MC-1: HOMOGENEOUS-MEANS-ZERO-RIGHT-SIDE
- **Surface form**: confuses "homogeneous first-order ODE" ($dy/dx=f(y/x)$) with "homogeneous
  linear ODE" ($dy/dx+P(x)y=0$), applying the wrong technique to the wrong type.
- **Birth type**: Type 3, language contamination (Blueprint's own declared birth type — "same
  throughout" describes both uses, but the mathematical definitions differ radically, and both
  uses genuinely appear in standard textbooks).
- **Repair**: re-walk the $dy/dx=(x+y)/x$ contrast, showing it's homogeneous first-order but not a
  zero-right-side linear equation.

### MC-2: FORGETTING-PRODUCT-RULE-IN-DY-DX
- **Surface form**: substitutes $y=vx$ but differentiates as $dy/dx=dv/dx$, forgetting the product
  rule's $v$ contribution.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — students who
  just learned chain-rule-only u-substitution apply the same pattern here, missing that $y=vx$ is
  a PRODUCT requiring the product rule).
- **Repair**: re-derive $dy/dx=v+x\,dv/dx$ explicitly from the product rule applied to $y=v\cdot
  x$.

### MC-3: M-AND-N-MUST-HAVE-DEGREE-ZERO
- **Surface form**: thinks the homogeneity test requires $M$ and $N$ to each have degree zero,
  rather than the same degree as each other.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type — the ratio
  $N/M$ depending only on $y/x$ is equivalent to $M,N$ sharing the SAME degree, which students
  mistakenly narrow to "degree zero specifically").
- **Repair**: re-verify the degree-2 test on $(x^2+y^2)/(2xy)$, confirming any shared degree $n$
  (not just $0$) qualifies.

## Misconceptions

### MC-1: HOMOGENEOUS-MEANS-ZERO-RIGHT-SIDE
- **Surface form**: as described above.
- **Root cause (Type 3)**: as described above.
- **Repair**: as described above.

### MC-2: FORGETTING-PRODUCT-RULE-IN-DY-DX
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: M-AND-N-MUST-HAVE-DEGREE-ZERO
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A homogeneous ODE looks the same at every scale — zooming in or out along the line y=vx
  doesn't change its shape, which is exactly why the ratio v=y/x is the natural new variable."**
- **Anti-analogy**: substituting v=y/x is NOT like an ordinary u-substitution in integration — y
  is a PRODUCT vx, not a direct renaming, so its derivative always carries the extra v term.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $dy/dx=(x+y)/x$ versus $dy/dx=y/x$ contrast,
  distinguishing homogeneous-first-order from zero-right-side linear.
- **Demonstration 2 (targets MC-2)**: the explicit product-rule derivation
  $dy/dx=v+x\,dv/dx$ from $y=vx$.
- **Demonstration 3 (targets MC-3)**: the degree-2 homogeneity test on
  $dy/dx=(x^2+y^2)/(2xy)$, solved via $v=y/x$ to $x^2-y^2=Kx$.

## Discovery Questions
1. "Is 'homogeneous first-order ODE' the same idea as 'homogeneous linear ODE' with zero right
   side, or are they genuinely different structures?"
2. "When you substitute y=vx, is dy/dx just dv/dx, or does the product rule add an extra term?"
3. "Does the homogeneity test require M and N to each have degree zero, or just the same degree
   as each other?"

## Teaching Sequence
1. **Representation shift**: the definition $dy/dx=f(y/x)$ and the substitution setup, working
   Demonstration 2, isolating MC-2.
2. **Pattern induction**: the disambiguation from homogeneous linear ODEs, working
   Demonstration 1, isolating MC-1.
3. **Contrast pair**: the degree test, working Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct homogeneity verification, a correct product-rule
   substitution and separable reduction, and a correct disambiguation from homogeneous linear
   ODEs, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept "homogeneous" first-order ODEs conflated with zero-right-side homogeneous linear
  ODEs.
- Never accept $dy/dx=dv/dx$ used for the substitution $y=vx$, omitting the product-rule $v$ term.
- Never accept the homogeneity test stated as requiring $M$ and $N$ to each have degree zero.

## Voice Teaching Notes
- Say "is this 'homogeneous' in the f(y/x) sense, or the zero-right-side linear sense?" whenever
  the word appears.
- When substituting y=vx, ask "did you apply the product rule, or just differentiate v alone?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly tests an ODE for homogeneity via the shared-degree
  criterion.
- **Rung 2 (application)**: learner correctly substitutes $v=y/x$ with the product rule and
  reduces to a separable equation.
- **Rung 3 (transfer)**: learner correctly solves a homogeneous ODE arising from a physical
  scale-invariant problem and connects the substitution's structure to the Euler-Cauchy or
  self-similar-solution setting.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the $dy/dx=(x+y)/x$ disambiguation.
- If MC-2 recurs, re-derive $dy/dx=v+x\,dv/dx$ from the product rule.
- If MC-3 recurs, re-verify the shared-degree test on the degree-2 example.

## Memory Hooks
- "Homogeneous first-order (f(y/x)) and homogeneous linear (zero right side) are different ideas
  sharing one word — check context."
- "y = vx is a product — always dy/dx = v + x dv/dx, never just dv/dx."
- "Same degree for M and N, not necessarily degree zero."

## Transfer Connections
- `math.de.first-order-ode` (already authored, certified domain): supplies the first-order ODE
  framework this concept's substitution technique specializes.
- `math.de.separable` (already authored, this campaign, Batch 146): supplies the separable-ODE
  solving machinery this concept's substitution reduces to.
- `math.de.bernoulli` (not yet authored): the KG's declared related concept, another
  substitution-based first-order technique.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.homogeneous-ode.md`, reused by reference
  for its degree-2 worked example, its homogeneous-versus-linear disambiguation, and its
  three-misconception library (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, generalizing the scale-invariance
  substitution idea to the Euler-Cauchy ODE, the Clairaut equation, and self-similar solutions in
  physics.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.first-order-ode`/`math.de.separable`, unlocks none, cross_links none, advanced/apply,
  mastery_threshold 0.85, estimated_hours 3) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-19 (Batch 148): authored. Second entry this batch. Companion batch concept:
  `math.de.exact-ode`.
