# math.real.lipschitz-continuity

## Identity
- **KG id**: `math.real.lipschitz-continuity`
- **Domain**: math.real
- **Requires**: `math.real.uniform-continuity`
- **Unlocks**: none
- **Cross-links**: `math.de.existence-uniqueness` (NOT yet authored — confirmed via `ls`;
  independence mode used, matching the Blueprint's own correct self-report)
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 3

## Learning Objective
State the Lipschitz condition precisely ($\exists L\ge0$ such that $|f(x)-f(y)|\le L|x-y|$ for
ALL $x,y$), computing the smallest valid $L$ from a derivative bound; PROVE Lipschitz $\Rightarrow$
uniformly continuous CONSTRUCTIVELY, exhibiting an explicit $\delta=\varepsilon/L$ rather than an
abstract existence claim; and exhibit a function that is uniformly continuous but NOT Lipschitz
(via $\sqrt x$ on $[0,1]$), confirming the strict separation between the two properties.

## Core Understanding
THE LIPSCHITZ CONSTANT IS DIRECTLY COMPUTABLE FROM A DERIVATIVE BOUND, NEVER JUST AN ABSTRACT
EXISTENCE CLAIM: for $f(x)=\sin x$: $f'(x)=\cos x$, $|\cos x|\le1$ for ALL $x$ — by the Mean Value
Theorem, $|\sin x-\sin y|=|\cos c||x-y|\le1\cdot|x-y|$ for some $c$ between $x,y$ — so $L=1$ is a
valid Lipschitz constant, DIRECTLY handed by the derivative bound, never an existence claim to be
argued abstractly.

LIPSCHITZ $\Rightarrow$ UNIFORMLY CONTINUOUS, PROVEN CONSTRUCTIVELY WITH AN EXPLICIT
$\delta=\varepsilon/L$: given the Lipschitz bound $|f(x)-f(y)|\le L|x-y|$, choosing
$\delta=\varepsilon/L$ gives: $|x-y|<\delta\Rightarrow|f(x)-f(y)|\le L|x-y|<L\cdot\frac\varepsilon
L=\varepsilon$ — exactly the uniform-continuity requirement, satisfied with an EXPLICIT formula
for $\delta$, never merely an abstract "some $\delta$ exists" argument. For $\sin x$ with $L=1$
and $\varepsilon=0.01$: $\delta=0.01$ exactly, verified directly.

LIPSCHITZ IS STRICTLY STRONGER THAN UNIFORM CONTINUITY — $\sqrt x$ ON $[0,1]$ SEPARATES THE TWO:
Heine-Cantor already guarantees $f(x)=\sqrt x$ is uniformly continuous on the compact $[0,1]$. But
$\sqrt x$ is NOT Lipschitz there: testing $x_n=1/n^2$, $y_n=0$: the ratio
$\frac{|f(x_n)-f(y_n)|}{|x_n-y_n|}=\frac{1/n}{1/n^2}=n$ — GROWING WITHOUT BOUND as $n\to\infty$, so
no finite $L$ can work, even though the function remains perfectly uniformly continuous. The
implication chain runs in only ONE direction: Lipschitz $\Rightarrow$ uniformly continuous
$\Rightarrow$ continuous, each arrow strict.

## Mental Models
- **"A Lipschitz constant is a universal speed limit on how fast the function's output can change
  relative to its input — a bounded derivative hands you that speed limit directly."**
- **"Lipschitz's implication to uniform continuity isn't a promise that some δ exists somewhere —
  it's a formula, δ=ε/L, you can write down immediately."**

## Why Students Fail

### MC-1: LIPSCHITZ-CONSTANT-ASSUMED-ABSTRACT
- **Surface form**: believes finding a Lipschitz constant is typically an abstract existence
  argument.
- **Birth type**: Foundational severity (Blueprint's own declared severity — "there exists a
  constant $L$" sounds like an abstract existence claim before the derivative-bound connection is
  seen).
- **Repair**: re-walk the direct derivative-bound computation for $\sin x$.

### MC-2: LIPSCHITZ-TO-UNIFORM-CONTINUITY-ASSUMED-NON-CONSTRUCTIVE
- **Surface form**: believes the Lipschitz-implies-uniformly-continuous proof requires a
  non-constructive argument.
- **Birth type**: High severity (Blueprint's own declared severity — most uniform-continuity
  proofs encountered so far involve indirect or existence-style arguments, making a fully explicit
  formula feel unexpected).
- **Repair**: re-walk the explicit $\delta=\varepsilon/L$ computation.

### MC-3: UNIFORM-CONTINUITY-ASSUMED-EQUIVALENT-TO-LIPSCHITZ
- **Surface form**: believes uniform continuity and Lipschitz continuity are essentially
  equivalent strengths.
- **Birth type**: High severity (Blueprint's own declared severity — both properties feel like
  "well-behaved everywhere" conditions, obscuring the strict separation between them).
- **Repair**: re-walk the $\sqrt x$ unbounded-difference-quotient demonstration.

## Misconceptions

### MC-1: LIPSCHITZ-CONSTANT-ASSUMED-ABSTRACT
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-2: LIPSCHITZ-TO-UNIFORM-CONTINUITY-ASSUMED-NON-CONSTRUCTIVE
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

### MC-3: UNIFORM-CONTINUITY-ASSUMED-EQUIVALENT-TO-LIPSCHITZ
- **Surface form**: as described above.
- **Root cause**: as described above.
- **Repair**: as described above.

## Analogies
- **"Lipschitz continuity is like a car with a hard-capped maximum acceleration — uniform
  continuity only promises the car eventually slows near a cliff edge, without capping how sharply
  it can still be accelerating right up until then."**
- **Anti-analogy**: uniform continuity does NOT imply Lipschitz continuity — $\sqrt x$ on $[0,1]$
  is uniformly continuous (by compactness) yet has no finite Lipschitz constant at all.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: $\sin x$'s Lipschitz constant $L=1$ derived directly from
  $|\cos x|\le1$ via the Mean Value Theorem.
- **Demonstration 2 (targets MC-2)**: the explicit $\delta=\varepsilon/L$ construction, verified
  numerically for $\varepsilon=0.01$, $L=1$.
- **Demonstration 3 (targets MC-3)**: $\sqrt x$'s unbounded difference-quotient ratio near 0,
  ruling out any finite Lipschitz constant despite guaranteed uniform continuity.

## Discovery Questions
1. "Is finding a Lipschitz constant typically an abstract existence argument, or can it usually
   be computed directly from a derivative bound?"
2. "Does proving Lipschitz implies uniform continuity require a non-constructive argument, or can
   an explicit δ be given directly?"
3. "Does every uniformly continuous function on a compact domain automatically satisfy a
   Lipschitz condition?"

## Teaching Sequence
1. **Representation shift**: the derivative-bound-to-Lipschitz-constant computation, working
   Demonstration 1, isolating MC-1.
2. **Conflict evidence**: Demonstration 2's explicit $\delta=\varepsilon/L$ construction, isolating
   MC-2.
3. **Contrast pair**: Demonstration 3's $\sqrt x$ strict-separation counterexample, isolating MC-3.
4. **Mastery gate**: require a correct Lipschitz constant computed from a derivative bound, a
   correct explicit $\delta$ computation from a given $\varepsilon$ and $L$, and a correct
   difference-quotient argument ruling out Lipschitz continuity for a new function, at the
   Blueprint's own stated MAMR of 5/5 (⌈0.85×5⌉).

## Tutor Actions
- Never accept a Lipschitz constant search treated as a purely abstract existence question when a
  derivative bound is available.
- Never accept the Lipschitz-implies-uniformly-continuous proof left non-constructive when an
  explicit $\delta=\varepsilon/L$ is available.
- Never accept uniform continuity and Lipschitz continuity treated as equivalent strengths.

## Voice Teaching Notes
- Say "can you get L directly from a derivative bound here?" whenever a Lipschitz constant is
  sought for a differentiable function.
- When uniform continuity and Lipschitz continuity are compared, ask "is this a case where they
  actually separate, like √x?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a Lipschitz constant from a derivative
  bound for a new function.
- **Rung 2 (application)**: learner correctly derives the explicit $\delta=\varepsilon/L$ formula
  and verifies it numerically.
- **Rung 3 (transfer)**: learner correctly explains why a numerical algorithm needs a Lipschitz
  bound (not merely uniform continuity) for a usable per-iteration error guarantee, and identifies
  the practical failure mode near a $\sqrt x$-like boundary behavior.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the derivative-bound-to-Lipschitz-constant computation.
- If MC-2 recurs, re-walk the explicit $\delta=\varepsilon/L$ computation.
- If MC-3 recurs, re-walk the $\sqrt x$ strict-separation counterexample.

## Memory Hooks
- "A bounded derivative hands you a Lipschitz constant directly — no abstract search needed."
- "Lipschitz implies uniform continuity via an explicit formula, δ=ε/L — not just an existence
  claim."
- "Uniformly continuous doesn't mean Lipschitz — √x on [0,1] is the standing counterexample."

## Transfer Connections
- `math.real.uniform-continuity` (already authored, this campaign, Batch 132): supplies the
  $\varepsilon$-$\delta$ definition and Heine-Cantor theorem this concept's implication and
  separating counterexample both directly build on.
- `math.de.existence-uniqueness` (not yet authored): the KG's declared cross-link, where the
  Lipschitz condition serves as the core hypothesis of the Picard-Lindelöf existence-and-
  uniqueness theorem for ODEs.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.real.lipschitz-continuity.md`, reused by
  reference for its derivative-bound Lipschitz-constant computation, its explicit
  $\delta=\varepsilon/L$ construction, its $\sqrt x$ strict-separation counterexample, and its
  three-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, reasoning about a numerical
  algorithm's need for a Lipschitz bound (not merely uniform continuity) for a usable
  per-iteration error guarantee.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.real.uniform-continuity`, unlocks none, cross_links `math.de.existence-uniqueness`,
  expert/apply, mastery_threshold 0.85, estimated_hours 3) was directly verified against the live
  KG and matches exactly. The Blueprint's own correctly-declared independence-mode P76
  (cross-link target confirmed NOT authored via `ls`) required no correction.

## Version History
- 2026-09-19 (Batch 133): authored. Second entry this batch, closing out the uniform-continuity
  chain's declared unlock. Companion batch concept: `math.real.mvt`.
