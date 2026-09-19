# math.de.bernoulli

## Identity
- **KG id**: `math.de.bernoulli`
- **Domain**: math.de
- **Requires**: `math.de.linear-first-order`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 3

## Learning Objective
Identify a Bernoulli ODE $dy/dx+P(x)y=Q(x)y^n$ ($n\ne0,1$); apply the substitution $v=y^{1-n}$
(never $v=y^n$) to transform it into a LINEAR first-order ODE $dv/dx+(1-n)P(x)v=(1-n)Q(x)$ in
$v$, correctly including the $(1-n)$ FACTOR when differentiating (never omitted); solve that
linear ODE via the integrating factor method; convert back to $y$; and correctly EXCLUDE $n=0,1$
(already linear/separable respectively), never applying the Bernoulli substitution there.

## Core Understanding
THE SUBSTITUTION IS $v=y^{1-n}$ — NEVER $v=y^n$: for $dy/dx-y=-y^2$ ($n=2$): the substitution is
$v=y^{1-2}=y^{-1}$, NOT $v=y^2$. Dividing the ODE by $y^2$ gives $y^{-2}dy/dx-y^{-1}=-1$;
substituting $v=y^{-1}$ (so $dv/dx=-y^{-2}dy/dx$) gives $-dv/dx-v=-1\Rightarrow dv/dx+v=1$ — a
genuinely LINEAR equation in $v$, solved via the integrating factor $e^x$ to give
$v=1+Ce^{-x}$, converting back to $y=1/(1+Ce^{-x})$ (the logistic curve).

DIFFERENTIATING $v=y^{1-n}$ REQUIRES THE $(1-n)$ FACTOR — NEVER JUST $y^{-n}dy/dx$: by the chain
rule, $dv/dx=(1-n)y^{(1-n)-1}\,dy/dx=(1-n)y^{-n}\,dy/dx$ — the coefficient $(1-n)$ is ESSENTIAL,
never dropped. After dividing the original ODE by $y^n$: $y^{-n}dy/dx=\frac{1}{1-n}dv/dx$,
substituting gives $\frac{1}{1-n}dv/dx+Pv=Q$, then multiplying by $(1-n)$ clears to the standard
linear form $dv/dx+(1-n)Pv=(1-n)Q$.

$n=0$ AND $n=1$ ARE EXCLUDED — THE BERNOULLI SUBSTITUTION IS NEVER NEEDED THERE: for $n=0$:
$dy/dx+Py=Q\cdot y^0=Q$ — this is ALREADY the standard linear form, solvable directly by
integrating factor with no substitution. For $n=1$: $dy/dx+Py=Qy\Rightarrow
dy/dx=(Q-P)y$ — genuinely SEPARABLE, solvable directly. Applying the $v=y^{1-n}$ substitution to
either case is unnecessary (and for $n=1$, $v=y^0=1$ is a nonsensical constant substitution) —
checking $n\ne0,1$ is a required first step, never skipped.

## Mental Models
- **"One substitution — v = y^(1-n) — turns a nonlinear power-of-y ODE into a genuinely linear
  one, but the exponent must be 1-n, never n itself."**
- **"Differentiating v = y^(1-n) always carries the (1-n) coefficient from the chain rule — never
  drop it."**

## Why Students Fail

### MC-1: WRONG-EXPONENT-IN-SUBSTITUTION
- **Surface form**: substitutes $v=y^n$ instead of $v=y^{1-n}$, getting a different, incorrect
  equation.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type — the
  divide-by-$y^n$ step makes students think the substitution involves the exponent $n$ directly,
  rather than $1-n$).
- **Repair**: re-derive the substitution from the divide-by-$y^n$ step, confirming $v=y^{1-n}$ is
  what makes the equation linear.

### MC-2: FORGETTING-THE-1-MINUS-N-FACTOR-IN-DV-DX
- **Surface form**: computes $dv/dx=y^{-n}dy/dx$ without the $(1-n)$ factor when differentiating
  $v=y^{1-n}$.
- **Birth type**: Type 5, instruction-induced (Blueprint's own declared birth type — students apply
  the chain rule but forget the power-rule coefficient).
- **Repair**: re-derive $dv/dx=(1-n)y^{-n}dy/dx$ explicitly from the chain rule, verifying against
  a worked example.

### MC-3: BERNOULLI-APPLIES-FOR-ALL-N
- **Surface form**: attempts the Bernoulli substitution for $n=0$ or $n=1$ (already linear/
  separable), or applies it when the right side isn't a pure power $Q(x)y^n$.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared birth type — the pattern
  $y^n$ on the right triggers the Bernoulli label without checking $n\ne0,1$).
- **Repair**: re-verify $n=0$ reduces to an already-linear equation and $n=1$ to an already-
  separable one, confirming neither needs the substitution.

## Misconceptions

### MC-1: WRONG-EXPONENT-IN-SUBSTITUTION
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: FORGETTING-THE-1-MINUS-N-FACTOR-IN-DV-DX
- **Surface form**: as described above.
- **Root cause (Type 5)**: as described above.
- **Repair**: as described above.

### MC-3: BERNOULLI-APPLIES-FOR-ALL-N
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The Bernoulli substitution is a lens that reshapes a curved (nonlinear) equation into a
  straight (linear) one — but the lens's exact power is 1-n, not n, and using the wrong power
  distorts the image."**
- **Anti-analogy**: the Bernoulli method is NOT a universal fix for any y^n on the right side —
  for n=0 or n=1, the equation is already linear or separable, and forcing the substitution adds
  unnecessary steps or breaks down entirely.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $dy/dx-y=-y^2$ example, confirming $v=y^{-1}$ (never
  $v=y^2$) is the correct substitution.
- **Demonstration 2 (targets MC-2)**: the explicit chain-rule derivation of
  $dv/dx=(1-n)y^{-n}dy/dx$.
- **Demonstration 3 (targets MC-3)**: the $n=0$ and $n=1$ exclusion cases, verified to already be
  linear and separable respectively.

## Discovery Questions
1. "For a Bernoulli ODE with exponent n, is the substitution v = yⁿ or v = y^(1-n)?"
2. "When differentiating v = y^(1-n), does the derivative include a (1-n) coefficient, or is it
   just y^(-n) dy/dx?"
3. "Does the Bernoulli substitution apply when n=0 or n=1, or are those cases already solvable by
   simpler methods?"

## Teaching Sequence
1. **Representation shift**: the substitution derivation via dividing by $y^n$, working
   Demonstration 1, isolating MC-1.
2. **Pattern induction**: the chain-rule differentiation with the $(1-n)$ factor, working
   Demonstration 2, isolating MC-2; physical applications (logistic, Torricelli variant).
3. **Contrast pair**: the $n=0,1$ exclusion cases, working Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct substitution with the right exponent, a correct chain-rule
   differentiation including the $(1-n)$ factor, and a correct recognition that $n=0,1$ don't need
   the substitution, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept $v=y^n$ used as the Bernoulli substitution instead of $v=y^{1-n}$.
- Never accept $dv/dx=y^{-n}dy/dx$ computed without the $(1-n)$ coefficient.
- Never accept the Bernoulli substitution applied when $n=0$ or $n=1$.

## Voice Teaching Notes
- Say "is the substitution exponent n, or 1 minus n?" whenever the Bernoulli substitution is
  introduced.
- When differentiating v, ask "where did the (1-n) coefficient go?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies a Bernoulli ODE and states the correct
  substitution $v=y^{1-n}$.
- **Rung 2 (application)**: learner correctly derives the linear ODE in $v$, including the
  $(1-n)$ factor, and solves it via the integrating factor.
- **Rung 3 (transfer)**: learner correctly recognizes the logistic equation as Bernoulli with
  $n=2$ and derives its solution via the substitution.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the substitution from the divide-by-$y^n$ step.
- If MC-2 recurs, re-derive $dv/dx=(1-n)y^{-n}dy/dx$ from the chain rule.
- If MC-3 recurs, re-verify the $n=0,1$ exclusion cases directly.

## Memory Hooks
- "The substitution exponent is 1-n, not n."
- "Differentiating y^(1-n) always carries the (1-n) coefficient — never drop it."
- "n=0 is already linear, n=1 is already separable — Bernoulli substitution is never needed
  there."

## Transfer Connections
- `math.de.linear-first-order` (already authored, this campaign, Batch 147): supplies the
  integrating factor method this concept's transformed linear ODE in $v$ is solved with.
- `math.de.homogeneous-ode` (already authored, this campaign, Batch 148): the KG's declared
  related concept, another substitution-based technique for first-order ODEs not directly
  separable or linear.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.bernoulli.md`, reused by reference for its
  logistic-equation-variant worked example, its chain-rule derivation, its $n=0,1$ exclusion
  cases, and its three-misconception library (birth types adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, connecting Bernoulli ODEs to the
  Riccati equation, nonlinear fluid dynamics, and distinguishing the Bernoulli ODE from Bernoulli's
  principle in fluid mechanics.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.linear-first-order`, unlocks none, cross_links none, advanced/apply, mastery_threshold
  0.85, estimated_hours 3) was directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 149): authored. First entry this batch. Companion batch concept:
  `math.de.slope-field`.
