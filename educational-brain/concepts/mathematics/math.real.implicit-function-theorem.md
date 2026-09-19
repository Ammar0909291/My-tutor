# math.real.implicit-function-theorem

## Identity
- **KG id**: `math.real.implicit-function-theorem`
- **Domain**: math.real
- **Requires**: `math.real.differentiability-rigorous`, `math.linalg.matrix-inverse`
- **Unlocks**: none
- **Cross-links**: `math.calc.implicit-differentiation` (confirmed genuinely authored via `ls`;
  genuine cross-link probe used, consistent with the Blueprint's own correctly-checked claim)
- **Difficulty**: expert
- **Bloom level**: apply (Blueprint stated "analyze" — stale, corrected to the live KG's "apply")
- **Mastery threshold**: 0.75 (Blueprint stated 0.65 — stale, corrected to the live KG's 0.75;
  MAMR remains ⌈0.75×5⌉=4/5, numerically unchanged from the Blueprint's own ⌈0.65×5⌉=4/5)
- **Estimated hours**: 6 (Blueprint stated 8 — stale, corrected to the live KG's 6)

## Learning Objective
State the Implicit Function Theorem precisely: given $F(x,y)=0$ with a known solution $(a,b)$, if
$\partial F/\partial y$ is INVERTIBLE at $(a,b)$, then $y$ is GUARANTEED to be a genuine $C^1$
function of $x$ near $(a,b)$; recognize that `math.calc.implicit-differentiation`'s familiar
procedure SILENTLY ASSUMES this hypothesis already holds; and recognize (at orientation level)
that the SAME invertibility condition yields an explicit derivative formula
$Dy(x)=-[\partial F/\partial y]^{-1}[\partial F/\partial x]$.

## Core Understanding
INVERTIBILITY OF $\partial F/\partial y$ IS THE ESSENTIAL, NON-AUTOMATIC HYPOTHESIS: for
$F(x,y)=x^2+y^2-1$ (the unit circle) at $(0,1)$: $F(0,1)=0$ ✓, and $\partial F/\partial y=2y=2\ne0$
at $y=1$ — INVERTIBLE, so the theorem guarantees $y$ is locally a genuine function of $x$ near
$(0,1)$ (indeed $y=\sqrt{1-x^2}$). Contrast $(1,0)$: $\partial F/\partial y=2(0)=0$ — NOT
invertible, and indeed NO such function exists there (the circle has a VERTICAL tangent, where $x$
cannot be solved for a single-valued $y(x)$).

THE THEOREM SUPPLIES THE JUSTIFICATION IMPLICIT DIFFERENTIATION HAS ALWAYS SILENTLY ASSUMED: for
the same circle near $(0,1)$: `math.calc.implicit-differentiation`'s procedure differentiates
directly: $2x+2y\,dy/dx=0\Rightarrow dy/dx=-x/y$ — valid ONLY because $\partial F/\partial
y=2y\ne0$ at $(0,1)$. Had this been zero (as at $(1,0)$), the SAME steps would produce a formula
undefined at $y=0$, for a $y(x)$ that DOESN'T ACTUALLY EXIST there — confirming the theorem's
hypothesis is the genuine prerequisite the informal procedure never states but always relies on.

THE SAME INVERTIBILITY CONDITION YIELDS AN EXPLICIT DERIVATIVE FORMULA, NEVER MERE EXISTENCE
(ORIENTATION LEVEL): $Dy(x)=-[\partial F/\partial y]^{-1}[\partial F/\partial x]$. For the circle
at $(0,1)$: $\partial F/\partial x=2x$, $\partial F/\partial y=2y$, so $Dy=-2x/2y=-x/y$ — EXACTLY
matching the implicit-differentiation result, but obtained here directly from the GENERAL
invertibility-based formula, not an ad hoc chain-rule manipulation. The theorem does more than
certify existence — it hands you the derivative formula directly.

## Mental Models
- **"Implicit differentiation never asks whether y genuinely is a function of x — this theorem's
  invertibility check is exactly that missing certification."**
- **"The same matrix that proves y(x) exists also hands you its derivative — invertibility does
  double duty."**

## Why Students Fail

### MC-1: Y-ASSUMED-ALWAYS-A-FUNCTION-OF-X
- **Surface form**: believes $y$ is always guaranteed to be a genuine function of $x$ near any
  solution of $F(x,y)=0$.
- **Birth type**: Foundational severity (Blueprint's own declared severity — informal implicit-
  differentiation practice never explicitly flags this as a hypothesis to check).
- **Repair**: re-walk the valid-point-versus-failing-point contrast on the unit circle.

### MC-2: IMPLICIT-DIFFERENTIATION-ASSUMED-ALWAYS-VALID
- **Surface form**: believes implicit differentiation's procedure is valid regardless of the
  theorem's hypothesis.
- **Birth type**: High severity (Blueprint's own declared severity — the algebra of implicit
  differentiation looks identical whether or not the hypothesis holds, hiding the dependency).
- **Repair**: re-walk the nonsensical-formula-at-a-failing-point demonstration.

### MC-3: THEOREM-ASSUMED-EXISTENCE-ONLY
- **Surface form**: believes the theorem only guarantees existence with no further information.
- **Birth type**: Moderate severity (Blueprint's own declared severity — "existence theorem" is
  the most salient framing, obscuring the theorem's additional derivative-formula payoff).
- **Repair**: re-walk the explicit derivative-formula computation matching implicit
  differentiation's own result.

## Misconceptions

### MC-1: Y-ASSUMED-ALWAYS-A-FUNCTION-OF-X
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-2: IMPLICIT-DIFFERENTIATION-ASSUMED-ALWAYS-VALID
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-3: THEOREM-ASSUMED-EXISTENCE-ONLY
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

## Analogies
- **"A vertical tangent is exactly where a curve refuses to be the graph of a function of x — the
  invertibility check is a precise test for exactly this failure."**
- **Anti-analogy**: implicit differentiation's algebra looking clean is NOT proof that $y(x)$
  genuinely exists — the same steps can produce a meaningless formula at a point where the
  hypothesis fails.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the unit circle's valid point $(0,1)$ versus its failing
  point $(1,0)$ (vertical tangent).
- **Demonstration 2 (targets MC-2)**: implicit differentiation's formula $dy/dx=-x/y$, valid at
  $(0,1)$ but undefined at $(1,0)$ where it's meaningless.
- **Demonstration 3 (targets MC-3)**: the general invertibility-based derivative formula matching
  the ad hoc chain-rule result exactly.

## Discovery Questions
1. "Is y always guaranteed to be a genuine function of x near any solution (a,b) of F(x,y)=0?"
2. "Is implicit differentiation's procedure valid to perform regardless of whether this theorem's
   hypothesis holds?"
3. "Does the Implicit Function Theorem only guarantee y(x) exists, with no further information
   about its derivative?"

## Teaching Sequence
1. **Representation shift**: the valid-versus-failing-point contrast on the unit circle, isolating
   MC-1.
2. **Conflict evidence**: the nonsensical-formula-at-a-failing-point demonstration, isolating
   MC-2.
3. **Contrast pair**: the general derivative-formula computation matching the ad hoc result,
   isolating MC-3.
4. **Mastery gate**: require a correct invertibility check for a new $F$ and point, a correct
   explanation of why implicit differentiation's validity depends on that check, and a correct
   application of the general derivative formula, at the corrected MAMR of 4/5 (⌈0.75×5⌉).

## Tutor Actions
- Never accept $y$ assumed to be a function of $x$ without checking $\partial F/\partial y$'s
  invertibility.
- Never accept implicit differentiation performed without first verifying the theorem's
  hypothesis holds.
- Never accept the theorem described as guaranteeing existence only, without its derivative
  formula.

## Voice Teaching Notes
- Say "have you checked that ∂F/∂y is invertible here, or are you just assuming y is a function
  of x?" whenever implicit differentiation is applied.
- When the theorem is invoked, ask "does it only tell you y(x) exists, or does it also give you a
  formula for its derivative?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly checks the invertibility hypothesis for a new $F$
  and point.
- **Rung 2 (application)**: learner correctly explains why implicit differentiation's output is
  meaningless at a point where the hypothesis fails.
- **Rung 3 (transfer)**: learner correctly verifies the theorem's hypothesis for an economic
  equilibrium model, computes the derivative via both implicit differentiation and the general
  formula, and identifies what kind of point would cause the hypothesis to fail.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the valid-versus-failing-point contrast.
- If MC-2 recurs, re-walk the nonsensical-formula-at-a-failing-point demonstration.
- If MC-3 recurs, re-walk the general derivative-formula computation.

## Memory Hooks
- "Invertibility of ∂F/∂y is the hypothesis implicit differentiation always silently assumes."
- "The same algebra can produce a meaningless formula where the hypothesis fails."
- "The theorem hands you a derivative formula, not just an existence guarantee."

## Transfer Connections
- `math.real.differentiability-rigorous` (already authored, this campaign, Batch 132): supplies
  the rigorous derivative and total-derivative-as-a-linear-map definitions this theorem's $C^1$
  hypothesis and conclusion are stated in terms of.
- `math.linalg.matrix-inverse` (already authored, certified domain): supplies the invertibility
  criteria this theorem's essential hypothesis directly invokes.
- `math.calc.implicit-differentiation` (already authored, certified domain): the KG's declared
  cross-link, whose informal procedure this theorem justifies and generalizes.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.real.implicit-function-theorem.md`, reused
  by reference for its unit-circle valid-versus-failing-point contrast, its implicit-
  differentiation justification argument, its explicit derivative-formula computation, and its
  three-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own genuine cross-link probe against
  `math.calc.implicit-differentiation`, verifying the theorem's hypothesis for an economic
  equilibrium model and cross-checking the derivative via both methods.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Stale Blueprint/KG metadata discrepancy found and corrected**: the Blueprint's own Component 0
  states bloom=analyze, mastery_threshold=0.65 (MAMR 4/5), estimated_hours=8 — the live KG shows
  bloom=apply, mastery_threshold=0.75 (MAMR ⌈0.75×5⌉=4/5, numerically unchanged), estimated_hours
  =6. Live KG values used as authoritative throughout this entry, per established campaign
  discipline (this category previously occurred at Batches 111, 134, and 137). All other fields
  (requires `math.real.differentiability-rigorous`/`math.linalg.matrix-inverse`, unlocks none,
  cross_links `math.calc.implicit-differentiation`, expert difficulty) matched exactly. The
  Blueprint's own cross-link-probe P76 mode was independently re-verified via `ls
  educational-brain/concepts/mathematics/` (`math.calc.implicit-differentiation` genuinely
  authored) and required no correction.

## Version History
- 2026-09-19 (Batch 138): authored. Second entry this batch. Companion batch concept:
  `math.prob.law-of-unconscious`.
