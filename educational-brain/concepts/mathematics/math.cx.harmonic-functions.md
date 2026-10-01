# math.cx.harmonic-functions

## Identity
- **KG id**: `math.cx.harmonic-functions`
- **Domain**: math.cx
- **Requires**: `math.cx.cauchy-riemann`, `math.de.laplace-equation`
- **Unlocks**: none
- **Cross-links**: `math.de.harmonic-functions`
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 4

## Learning Objective
Reuse the ALREADY-PROVEN forward direction (holomorphic $\Rightarrow$ harmonic components) from
`math.de.harmonic-functions` — NEVER re-derive it; prove the CR-integration recipe for a
harmonic conjugate ALWAYS succeeds, guaranteed by $u$'s own harmonicity — NEVER assume the
recipe's success is coincidental; and recognize the "locally" qualifier reflects a GENUINE
obstruction on domains with holes — NEVER treat it as routine mathematical caution.

## Core Understanding
THE FORWARD DIRECTION IS ALREADY PROVEN — NEVER RE-DERIVE IT HERE: `math.de.harmonic-functions`
already establishes, via CR plus equality of mixed partials, that if $f=u+iv$ is holomorphic,
BOTH $u$ and $v$ are harmonic. For $f(z)=e^z=e^x\cos y+ie^x\sin y$: this ALREADY-established
result guarantees $u=e^x\cos y$ and $v=e^x\sin y$ are both harmonic, with NO new verification
needed. Believing this concept must re-derive that holomorphic functions have harmonic components
is WRONG — that direction is fully established elsewhere and should be directly REUSED; this
concept's genuinely new content is the CONVERSE: given only a harmonic $u$, does a matching
holomorphic $f$ always exist?

THE CR-INTEGRATION RECIPE'S SUCCESS IS GUARANTEED BY $u$'S HARMONICITY — NEVER COINCIDENTAL: for a
general harmonic $u$: Step 1 integrates $v_y=u_x$ partially in $y$, giving $v=\int u_x\,dy+h(x)$.
Step 2 requires $v_x=-u_y$, giving $h'(x)=-u_y-\int u_{xx}\,dy$ — and for $h(x)$ to EXIST, the
right side must depend only on $x$, which (differentiating with respect to $y$ and requiring it
to vanish) reduces EXACTLY to $u_{xx}+u_{yy}=0$ — $u$'s own harmonicity. Believing the recipe
happens to work for particular examples by luck, rather than being GUARANTEED by harmonicity, is
WRONG — the recipe's internal consistency requirement IS $u$'s harmonicity, precisely, not an
incidental fact that merely correlates with success.

THE "LOCALLY" QUALIFIER REFLECTS A GENUINE OBSTRUCTION — NEVER ROUTINE MATHEMATICAL CAUTION: for
$u=\log\sqrt{x^2+y^2}$ on the annulus $\{1<\sqrt{x^2+y^2}<2\}$: $u$ IS harmonic
($u_{xx}+u_{yy}=0$), and the recipe LOCALLY produces $v=\theta=\arg(z)$ — but tracking $v$
continuously around a FULL loop encircling the origin shows $v$ INCREASES by $2\pi$ upon return,
so NO single-valued continuous $v$ exists on the WHOLE annulus. On a small disc entirely within
the annulus (avoiding a full loop), the SAME local recipe DOES produce a genuine single-valued
conjugate. Believing "locally" is routine mathematical fine print is WRONG — a GLOBAL harmonic
conjugate can genuinely fail to exist on a domain with a hole; only on a domain WITHOUT holes
(simply connected, like a disc) is a global conjugate guaranteed.

## Mental Models
- **"Don't re-prove what's already proven — this concept cites the forward direction and builds
  the converse on top of it."**
- **"The CR-recipe's success isn't luck — u's own harmonicity is EXACTLY the consistency condition
  the recipe's second step needs."**
- **"'Locally' is load-bearing — on a domain with a hole, going once around can force the
  conjugate to disagree with itself."**

## Why Students Fail

### MC-1: FORWARD-DIRECTION-ASSUMED-TO-NEED-RE-DERIVATION
- **Surface form**: believes this concept must re-derive that holomorphic functions have harmonic
  components, missing that `math.de.harmonic-functions` already establishes this and it should be
  directly reused.
- **Birth type**: instruction-induced (Blueprint's own declared foundational severity — new
  concepts are often expected to prove everything from scratch rather than cite prior results).
- **Repair**: re-walk the direct reuse of the already-established result for $f(z)=e^z$.

### MC-2: CR-RECIPE-SUCCESS-ASSUMED-COINCIDENTAL
- **Surface form**: believes the CR-integration recipe for finding a harmonic conjugate happens to
  succeed for particular examples by luck, rather than being GUARANTEED by the given function's
  harmonicity.
- **Birth type**: instruction-induced (Blueprint's own declared high severity —
  `math.cx.cauchy-riemann`'s own example only APPLIED the recipe once, without proving general
  success).
- **Repair**: re-walk the algebraic derivation reducing the recipe's consistency requirement to
  $u$'s harmonicity exactly.

### MC-3: LOCALLY-QUALIFIER-ASSUMED-ROUTINE
- **Surface form**: believes the theorem's "locally" qualifier is routine mathematical fine print,
  missing that a global harmonic conjugate can genuinely fail to exist on domains with holes.
- **Birth type**: instruction-induced (Blueprint's own declared moderate severity — qualifiers like
  "locally" are often skimmed as boilerplate in theorem statements).
- **Repair**: re-walk the annulus obstruction with $v=\theta$, showing the concrete $2\pi$
  monodromy failure.

## Misconceptions

### MC-1: FORWARD-DIRECTION-ASSUMED-TO-NEED-RE-DERIVATION
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-2: CR-RECIPE-SUCCESS-ASSUMED-COINCIDENTAL
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

### MC-3: LOCALLY-QUALIFIER-ASSUMED-ROUTINE
- **Surface form**: as described above.
- **Root cause (instruction-induced)**: as described above.
- **Repair**: as described above.

## Analogies
- **"The CR-recipe's consistency check is like a jigsaw puzzle's last piece — it only fits because
  the earlier pieces (u's harmonicity) were placed correctly; it's never luck."**
- **Anti-analogy**: "locally" here isn't a lawyer's hedge covering an unlikely edge case — on an
  annulus, the failure is guaranteed and concrete: walk the loop once, and the candidate conjugate
  genuinely disagrees with its starting value.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $f(z)=e^z$ direct citation of the already-proven forward
  direction.
- **Demonstration 2 (targets MC-2)**: the general algebraic derivation showing the recipe's
  consistency condition equals $u$'s harmonicity.
- **Demonstration 3 (targets MC-3)**: the $\log|z|$-on-an-annulus $2\pi$-monodromy obstruction.

## Discovery Questions
1. "Does this concept need to re-derive that holomorphic functions have harmonic components, or
   can that be directly reused?"
2. "Does the CR-integration recipe happen to work for some harmonic functions and fail for others,
   or is its success guaranteed by harmonicity itself?"
3. "Is the theorem's 'locally' qualifier just routine mathematical caution, or does it reflect a
   genuine failure that can occur on domains with holes?"

## Teaching Sequence
1. **Representation shift**: cite the already-proven forward direction for $f(z)=e^z$, isolating
   MC-1.
2. **Conflict evidence**: work the general algebraic derivation of the recipe's success condition,
   isolating MC-2.
3. **Contrast pair**: work the annulus obstruction with $\log|z|$, isolating MC-3.
4. **Mastery gate**: require a correct statement of both directions with correct attribution, a
   correct harmonic-conjugate construction for a given $u$, a correct explanation of which recipe
   step would fail for a non-harmonic $u$, and a correct explanation of the annulus obstruction, at
   the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept the forward direction (holomorphic implies harmonic) re-derived instead of cited.
- Never accept the CR-integration recipe's success treated as coincidental rather than guaranteed
  by harmonicity.
- Never accept "locally" dismissed as routine caution without acknowledging the annulus
  counterexample.

## Voice Teaching Notes
- Say "is that already proven elsewhere, or genuinely new here?" whenever the forward direction is
  invoked.
- Ask "what would go wrong in the recipe if u weren't harmonic?" whenever the CR-integration
  recipe is applied.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states both directions of the theorem with correct
  attribution.
- **Rung 2 (application)**: learner correctly constructs a harmonic conjugate for a given harmonic
  $u$ using the CR-integration recipe.
- **Rung 3 (transfer)**: learner correctly explains why a fluid-flow domain with a hole (an
  annulus around a cylindrical obstacle) may lack a single global stream function, while a
  simply-connected domain guarantees one.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the direct citation of the already-established forward direction.
- If MC-2 recurs, re-derive the recipe's consistency condition algebraically.
- If MC-3 recurs, re-walk the annulus $2\pi$-monodromy obstruction.

## Memory Hooks
- "Cite the forward direction — don't re-prove what's already proven."
- "The recipe's consistency condition IS u's harmonicity — never coincidence."
- "'Locally' is load-bearing — a hole in the domain can break a global conjugate."

## Transfer Connections
- `math.cx.cauchy-riemann` (prerequisite, already authored, this campaign): supplies the CR
  equations and the two-step conjugate-finding recipe this concept proves always succeeds.
- `math.de.laplace-equation` (prerequisite, already authored): supplies the Laplacian equation
  $\nabla^2u=0$ this concept's harmonic functions satisfy.
- `math.de.harmonic-functions` (already authored, cross-link): supplies the already-proven forward
  direction (holomorphic $\Rightarrow$ harmonic components) this concept directly cites and builds
  the converse on top of.

## Cross-Subject Connections
- Fluid dynamics and electrostatics: the velocity potential and stream function of a 2D flow (or
  electric potential and field lines) form a harmonic-conjugate pair, with the annulus obstruction
  directly modeling flow around an obstacle.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.cx.harmonic-functions.md`, reused by
  reference for its three worked examples and its three-misconception registry (birth types
  adopted directly as declared).
- Transfer probe: the Blueprint's own cross-link probe engaging `math.de.harmonic-functions`, on a
  fluid-dynamics engineer's annular flow domain around a cylindrical obstacle and the local-versus-
  global stream-function existence question.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.cx.cauchy-riemann`/`math.de.laplace-equation`, unlocks none, cross_links
  `math.de.harmonic-functions`, expert/apply, mastery_threshold 0.85, estimated_hours 4) was
  directly verified against the live KG and matches exactly. The cross-link target is confirmed
  authored, matching the Blueprint's own cross-link-mode determination.

## Version History
- 2026-09-20 (Batch 238): authored. Second entry this batch. Companion batch concept:
  `math.cx.analytic-functions`.
