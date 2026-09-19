# math.de.existence-uniqueness

## Identity
- **KG id**: `math.de.existence-uniqueness`
- **Domain**: math.de
- **Requires**: `math.de.ivp`, `math.real.lipschitz-continuity`
- **Unlocks**: none
- **Cross-links**: `math.real.fixed-point-theorem`
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.8
- **Estimated hours**: 5

## Learning Objective
Recognize Picard iteration as a DIRECT INSTANCE (never a mere analogy) of the fixed-point theorem's
contraction-mapping machinery, applied to the Picard operator
$(T\phi)(x)=y_0+\int_{x_0}^xf(t,\phi(t))\,dt$; state the theorem's precise hypothesis — $f$ AND
$\partial f/\partial y$ both continuous near $(x_0,y_0)$ — and explain why $\partial f/\partial y$'s
continuity supplies the Lipschitz bound making $T$ a contraction, directly reusing the derivative-
bound-to-Lipschitz-constant mechanism; and correctly identify the theorem's conclusion as only
LOCAL, using a genuine finite-time blow-up example, never treating "local" as a proof-technique
limitation.

## Core Understanding
SOLVING THE IVP IS LITERALLY FINDING A FIXED POINT OF THE PICARD OPERATOR — NEVER MERELY ANALOGOUS:
integrating $y'=f(x,y),y(x_0)=y_0$ from $x_0$ to $x$ gives the EQUIVALENT integral equation
$y(x)=y_0+\int_{x_0}^xf(t,y(t))\,dt$. Defining $(T\phi)(x)=y_0+\int_{x_0}^xf(t,\phi(t))\,dt$: $y$
solves the IVP EXACTLY when $y=Ty$. For $y'=y,y(0)=1$ (known solution $y=e^x$):
$(Ty)(x)=1+\int_0^xe^t\,dt=1+(e^x-1)=e^x=y(x)$ ✓ — a DIRECT, verified instance of the fixed-point
theorem's own machinery, with "points" being entire functions.

$\partial f/\partial y$'S CONTINUITY DIRECTLY SUPPLIES THE LIPSCHITZ BOUND, NEVER AN UNRELATED
TECHNICAL CONDITION: for $f(x,y)=x^2+y^2$ near $(0,0)$ restricted to $|y|\le1$: $\partial
f/\partial y=2y$, bounded by $K=2$ on this rectangle. The SAME Mean Value Theorem argument already
established for Lipschitz continuity gives $|f(x,y_1)-f(x,y_2)|=|y_1+y_2||y_1-y_2|\le2|y_1-y_2|$ —
$f$ IS Lipschitz in $y$ with constant $K=2$, EXACTLY the ingredient that makes the Picard operator
contract on a sufficiently short interval.

THE THEOREM'S CONCLUSION IS ONLY LOCAL — A GENUINE PROPERTY OF SOME EQUATIONS, NEVER A PROOF-
TECHNIQUE LIMITATION: for $y'=y^2,y(0)=1$: separating variables gives the explicit solution
$y(x)=1/(1-x)$, verified directly ($y'=1/(1-x)^2=y^2$ ✓, $y(0)=1$ ✓). This is perfectly unique
near $x=0$, but as $x\to1^-$, $y(x)\to\infty$ — a genuine finite-time BLOW-UP. The solution simply
does NOT exist for $x\ge1$, no matter how the equation is analyzed — confirming "local" reflects a
real property of certain equations, not a limitation a cleverer proof could remove.

## Mental Models
- **"Picard iteration IS fixed-point iteration, applied to functions instead of numbers — not a
  separate technique that merely resembles it."**
- **"∂f/∂y's continuity isn't a side requirement — it's precisely what supplies the Lipschitz bound
  the contraction argument needs."**

## Why Students Fail

### MC-1: PICARD-ITERATION-ASSUMED-MERELY-INSPIRED-BY-FIXED-POINTS
- **Surface form**: believes Picard iteration is a separate ODE-specific technique merely inspired
  by fixed-point ideas.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the two techniques are
  usually taught in separate courses, obscuring their exact structural identity).
- **Repair**: re-walk the $y=e^x$ direct verification that $y=Ty$, confirming solving the IVP and
  finding the operator's fixed point are the SAME problem.

### MC-2: PARTIAL-DERIVATIVE-HYPOTHESIS-ASSUMED-UNRELATED
- **Surface form**: believes the hypothesis on $\partial f/\partial y$'s continuity is an unrelated
  extra technical condition.
- **Birth type**: High severity (Blueprint's own declared severity — the theorem's hypothesis list
  is often memorized without connecting each piece to its role in the proof).
- **Repair**: re-derive the Lipschitz bound $K=2$ from $\partial f/\partial y$'s boundedness for
  $f(x,y)=x^2+y^2$.

### MC-3: LOCAL-CONCLUSION-ASSUMED-PROOF-TECHNIQUE-LIMITATION
- **Surface form**: believes the theorem's local-existence conclusion reflects only a limitation
  of the Picard-iteration proof technique.
- **Birth type**: Moderate severity (Blueprint's own declared severity — "local" sounds like a
  weaker result a better proof might strengthen, rather than a genuine equation property).
- **Repair**: re-walk the $y'=y^2$ finite-time blow-up, confirming the solution genuinely ceases to
  exist at $x=1$.

## Misconceptions

### MC-1: PICARD-ITERATION-ASSUMED-MERELY-INSPIRED-BY-FIXED-POINTS
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: PARTIAL-DERIVATIVE-HYPOTHESIS-ASSUMED-UNRELATED
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: LOCAL-CONCLUSION-ASSUMED-PROOF-TECHNIQUE-LIMITATION
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The Picard operator is a machine that takes a candidate solution function and refines it —
  finding where the machine stops changing its input IS solving the IVP, exactly as a fixed point
  is where an ordinary contraction stops moving a number."**
- **Anti-analogy**: "local existence" is NOT a hedge the theorem adds for proof convenience — some
  equations' solutions genuinely run off to infinity in finite time, a real feature of the
  mathematics, not a gap in the argument.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $y'=y,y(0)=1$ direct verification that $y=e^x$ satisfies
  $y=Ty$.
- **Demonstration 2 (targets MC-2)**: the $f(x,y)=x^2+y^2$ Lipschitz-constant derivation from
  $\partial f/\partial y$'s boundedness.
- **Demonstration 3 (targets MC-3)**: the $y'=y^2$ finite-time blow-up at $x=1$.

## Discovery Questions
1. "Is Picard iteration a separate technique merely inspired by fixed-point ideas, or is solving
   the IVP literally equivalent to finding a fixed point of a specific operator?"
2. "Is the hypothesis on ∂f/∂y's continuity an unrelated extra technical condition, or does it
   directly supply the Lipschitz bound needed for the proof?"
3. "Does the theorem's local-existence conclusion reflect a genuine limitation on how far
   solutions can extend, or merely a limitation of the Picard-iteration proof technique?"

## Teaching Sequence
1. **Representation shift**: the IVP-to-fixed-point equivalence, working Demonstration 1, isolating
   MC-1.
2. **Conflict evidence**: the ∂f/∂y-to-Lipschitz-bound derivation, working Demonstration 2,
   isolating MC-2.
3. **Contrast pair**: the genuine-limitation-versus-proof-artifact distinction, working
   Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct Picard operator construction with fixed-point verification,
   a correct Lipschitz-constant derivation from a bounded partial derivative, and a correct
   explanation of why the conclusion is only local, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept Picard iteration described as merely inspired by fixed-point ideas rather than a
  direct instance of them.
- Never accept the ∂f/∂y continuity hypothesis dismissed as an unrelated technical condition.
- Never accept the theorem's local-only conclusion attributed to proof-technique weakness rather
  than a genuine property of certain equations.

## Voice Teaching Notes
- Say "is that a separate technique, or literally the same fixed-point machinery applied to
  functions?" whenever Picard iteration is introduced.
- When the theorem's hypotheses are stated, ask "what role does each one play in making the Picard
  operator a contraction?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly constructs the Picard operator for a given IVP and
  verifies the known solution is a fixed point.
- **Rung 2 (application)**: learner correctly derives a Lipschitz constant for $f$ from a bound on
  $\partial f/\partial y$.
- **Rung 3 (transfer)**: learner correctly applies the theorem to a nonlinear IVP, explaining via
  the fixed-point machinery why existence is only guaranteed locally and what kind of behavior
  might cause finite-time blow-up.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the $y=e^x$ direct fixed-point verification.
- If MC-2 recurs, re-derive the Lipschitz constant from $\partial f/\partial y$'s bound.
- If MC-3 recurs, re-walk the $y'=y^2$ finite-time blow-up.

## Memory Hooks
- "Picard iteration IS fixed-point iteration — for functions, not numbers."
- "∂f/∂y's continuity supplies the Lipschitz bound — the exact ingredient the contraction needs."
- "Local existence isn't a proof weakness — some equations genuinely blow up in finite time."

## Transfer Connections
- `math.de.ivp` (already authored, this campaign, Batch 146): supplies the initial value problem
  this theorem's Picard iteration directly addresses, closing its declared unlock.
- `math.real.lipschitz-continuity` (already authored, certified domain): supplies the Lipschitz
  condition and derivative-bound-to-constant connection this concept's proof directly reuses.
- `math.real.fixed-point-theorem` (already authored, this campaign, Batch 134, formal KG
  cross-link): supplies the general contraction-mapping machinery this concept's Picard operator
  directly instantiates.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.existence-uniqueness.md`, reused by
  reference for its Picard-operator derivation, its ∂f/∂y-to-Lipschitz-bound example, its $y'=y^2$
  blow-up example, and its three-misconception registry (severity levels adopted directly as
  declared).
- Transfer probe: the Blueprint's own declared cross-link probe engaging
  `math.real.fixed-point-theorem`, applying the theorem to a nonlinear IVP and reasoning about
  potential blow-up without solving explicitly.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.de.ivp`/
  `math.real.lipschitz-continuity`, unlocks none, cross_links `math.real.fixed-point-theorem`,
  expert/understand, mastery_threshold 0.8, estimated_hours 5) was directly verified against the
  live KG and matches exactly. The declared cross-link `math.real.fixed-point-theorem` was
  confirmed already authored (Batch 134), enabling a genuine cross-link probe.

## Version History
- 2026-09-19 (Batch 147): authored. First entry this batch, closing
  `math.de.ivp`'s declared unlock. Companion batch concept: `math.de.linear-first-order`.
