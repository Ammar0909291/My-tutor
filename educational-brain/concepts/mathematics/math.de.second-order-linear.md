# math.de.second-order-linear

## Identity
- **KG id**: `math.de.second-order-linear`
- **Domain**: math.de
- **Requires**: `math.de.second-order-ode`, `math.de.ode-linearity`
- **Unlocks**: `math.de.second-order-homogeneous`
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: understand
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Recognize the standard form $y''+P(x)y'+Q(x)y=G(x)$; classify HOMOGENEOUS ($G=0$) versus
NONHOMOGENEOUS ($G\ne0$) based ENTIRELY on the right-hand side (never on the complexity of $P(x)$
or $Q(x)$); state and apply the SUPERPOSITION PRINCIPLE for the homogeneous case ($c_1y_1+c_2y_2$
is a solution whenever $y_1,y_2$ are), explaining why this makes the homogeneous solution set a
vector space; and recognize superposition FAILS for the nonhomogeneous case, never assuming it
carries over.

## Core Understanding
HOMOGENEOUS-VERSUS-NONHOMOGENEOUS DEPENDS ENTIRELY ON WHETHER $G(x)=0$ — NEVER ON HOW COMPLEX
$P(x)$ OR $Q(x)$ LOOK: for $y''+3xy'-e^xy=\sin x$: despite the complicated-looking $P(x)=3x$ and
$Q(x)=-e^x$, classification depends SOLELY on $G(x)=\sin x\ne0$ — NONHOMOGENEOUS. An equation with
simple $P,Q$ but nonzero $G$ is still nonhomogeneous; only checking $G(x)=0$ determines the case,
regardless of coefficient complexity.

SUPERPOSITION HOLDS FOR THE HOMOGENEOUS CASE — A DIRECT CONSEQUENCE OF LINEARITY: for
$y''-y=0$: both $y_1=e^x$ and $y_2=e^{-x}$ satisfy the equation. The specific combination
$y=3e^x-2e^{-x}$ ALSO satisfies it: $y''=3e^x-2e^{-x}=y$, so $y''-y=0$ ✓. This follows because
$L[c_1y_1+c_2y_2]=c_1L[y_1]+c_2L[y_2]=c_1(0)+c_2(0)=0$ for ANY constants $c_1,c_2$ — the
homogeneous solution set is closed under addition and scalar multiplication, and contains the
zero function, exactly the closure properties of a VECTOR SPACE.

SUPERPOSITION FAILS FOR THE NONHOMOGENEOUS CASE — NEVER ASSUME IT CARRIES OVER: for
$y''-y=2$: $y_1=-2$ is a particular solution ($y_1''-y_1=0-(-2)=2$ ✓). But $2y_1=-4$: is NOT a
solution — $(2y_1)''-2y_1=0-(-4)=4\ne2$. Because $L[c_1y_1+c_2y_2]=(c_1+c_2)G(x)$, this equals
$G(x)$ again ONLY when $c_1+c_2=1$, never for arbitrary constants — superposition, in its simple
form, is strictly a homogeneous-case privilege. Additionally, the zero function itself fails to
solve a nonhomogeneous equation ($L[0]=0\ne G(x)$ when $G\ne0$), immediately disqualifying
vector-space status.

## Mental Models
- **"Homogeneous vs. nonhomogeneous is a single yes/no question about G(x) — never about how
  intimidating P(x) or Q(x) look."**
- **"Superposition is an algebraic fact about the operator L that only translates into 'solutions
  combine into solutions' when the right side is zero — c₁(0)+c₂(0)=0, but c₁G+c₂G≠G in
  general."**

## Why Students Fail

### MC-1: SUPERPOSITION-APPLIED-TO-NONHOMOGENEOUS-CASE
- **Surface form**: believes the superposition principle applies to nonhomogeneous linear ODEs the
  same way it applies to homogeneous ones.
- **Birth type**: Foundational severity (Blueprint's own declared severity — superposition is one
  of the most powerful, memorable tools in the subject, creating a strong temptation to
  over-apply it).
- **Repair**: re-walk the $y''-y=2$ example, showing $2y_1=-4$ genuinely fails to satisfy the
  equation ($4\ne2$).

### MC-2: HOMOGENEOUS-NONHOMOGENEOUS-DETERMINED-BY-COEFFICIENT-STRUCTURE
- **Surface form**: determines homogeneous/nonhomogeneous status by looking at the complexity of
  $P(x)$ or $Q(x)$, rather than checking only whether $G(x)=0$.
- **Birth type**: Moderate severity (Blueprint's own declared severity — a visually complicated
  equation feels like it should be a "different kind" regardless of the actual defining criterion).
- **Repair**: re-classify $y''+3xy'-e^xy=\sin x$, confirming the classification depends solely on
  $G(x)$, not on $P,Q$'s complexity.

### MC-3: SOLUTION-SET-VECTOR-SPACE-STATUS-ASSUMED-FOR-NONHOMOGENEOUS
- **Surface form**: believes the solution set of a nonhomogeneous linear ODE also forms a vector
  space.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the vector-space
  structure feels like a general property of "linear" equations rather than specific to the
  homogeneous case).
- **Repair**: re-check the zero-function requirement directly — for $G\ne0$, $L[0]=0\ne G(x)$, so
  the zero function isn't even a solution, immediately disqualifying vector-space status.

## Misconceptions

### MC-1: SUPERPOSITION-APPLIED-TO-NONHOMOGENEOUS-CASE
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: HOMOGENEOUS-NONHOMOGENEOUS-DETERMINED-BY-COEFFICIENT-STRUCTURE
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

### MC-3: SOLUTION-SET-VECTOR-SPACE-STATUS-ASSUMED-FOR-NONHOMOGENEOUS
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Superposition is a privilege the homogeneous case earns because zero plus zero is always
  zero — the nonhomogeneous case loses this privilege because G plus G is not G."**
- **Anti-analogy**: a nonhomogeneous equation's solution set is NOT a vector space merely because
  the equation looks "linear" — the zero function's failure to solve it breaks the very first
  closure requirement.

## Demonstrations
- **Demonstration 1 (targets MC-2)**: the $y''+3xy'-e^xy=\sin x$ classification, depending solely
  on $G(x)=\sin x\ne0$.
- **Demonstration 2 (targets MC-1, MC-3)**: the $y''-y=0$ superposition verification for
  $3e^x-2e^{-x}$, contrasted with the $y''-y=2$ failure of $2y_1=-4$.

## Discovery Questions
1. "Does an equation's homogeneous/nonhomogeneous status depend on how complicated P(x) or Q(x)
   look, or only on whether G(x)=0?"
2. "If y₁ solves a nonhomogeneous equation L[y]=G(x), does 2y₁ also solve it?"
3. "Does the solution set of a nonhomogeneous linear ODE form a vector space, the same as the
   homogeneous case?"

## Teaching Sequence
1. **Representation shift**: standard form and homogeneous/nonhomogeneous classification, working
   Demonstration 1, isolating MC-2.
2. **Contrast pair**: the superposition principle verified for the homogeneous case and shown to
   fail for the nonhomogeneous case, working Demonstration 2, isolating MC-1 and MC-3.
3. **Mastery gate**: require a correct classification of a new equation based solely on $G(x)$, a
   correct verification of superposition for a homogeneous equation, and a correct explanation of
   why superposition and vector-space status fail for the nonhomogeneous case, at the Blueprint's
   own stated MAMR of 5/5.

## Tutor Actions
- Never accept homogeneous/nonhomogeneous classification based on the complexity of $P(x)$ or
  $Q(x)$ rather than solely on $G(x)$.
- Never accept a claim that scaling or combining nonhomogeneous solutions produces another
  solution.
- Never accept a nonhomogeneous linear ODE's solution set described as a vector space.

## Voice Teaching Notes
- Say "is G(x) zero or not? That's the only question for this classification." whenever
  homogeneous/nonhomogeneous status is determined.
- When superposition is invoked, ask "is this equation homogeneous, or does superposition not
  apply here?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly classifies a second-order ODE as homogeneous or
  nonhomogeneous based solely on $G(x)$.
- **Rung 2 (application)**: learner correctly verifies superposition for a homogeneous equation
  with a specific linear combination.
- **Rung 3 (transfer)**: learner correctly explains, for a vibrating beam's free versus forced
  vibration, why superposition applies in one case and fails in the other.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the $y''-y=2$ superposition-failure example.
- If MC-2 recurs, re-classify the complicated-coefficient $y''+3xy'-e^xy=\sin x$ example.
- If MC-3 recurs, re-check the zero-function-fails-to-solve argument.

## Memory Hooks
- "Homogeneous vs. nonhomogeneous: only G(x)=0 matters, never P or Q's complexity."
- "Superposition is a homogeneous-case privilege — it fails when G is nonzero."
- "The zero function solving the equation is the vector-space litmus test — nonhomogeneous fails
  it immediately."

## Transfer Connections
- `math.de.second-order-ode` (already authored, certified domain): supplies the general
  second-order ODE and standard form this concept classifies.
- `math.de.ode-linearity` (already authored, certified domain): supplies the linearity criterion
  this concept's standard form satisfies by construction.
- `math.de.second-order-homogeneous` (not yet authored): the KG's declared unlock, a dedicated
  deep treatment of the homogeneous case's solution methods building on this concept's
  superposition principle.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.second-order-linear.md`, reused by
  reference for its classification example, its superposition verification for $y''-y=0$, its
  superposition-failure demonstration for $y''-y=2$, and its three-misconception registry
  (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, applying the homogeneous/
  nonhomogeneous distinction and superposition to a vibrating beam's free versus forced vibration.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.second-order-ode`/`math.de.ode-linearity`, unlocks `math.de.second-order-homogeneous`,
  cross_links none, advanced/understand, mastery_threshold 0.85, estimated_hours 4) was directly
  verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 150): authored. Second entry this batch. Companion batch concept:
  `math.de.euler-method`.
