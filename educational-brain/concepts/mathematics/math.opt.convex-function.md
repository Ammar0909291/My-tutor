# math.opt.convex-function

## Identity
- **KG id**: `math.opt.convex-function`
- **Domain**: math.opt
- **Requires**: `math.calc.concavity`
- **Unlocks**: `math.opt.convex-optimization`
- **Cross-links**: `math.linalg.positive-definite`
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
Define convexity via the CHORD INEQUALITY $f(\lambda x+(1-\lambda)y)\le\lambda f(x)+(1-\lambda)f(y)$ for
$\lambda\in[0,1]$, correctly including the boundary case where EQUALITY holds throughout (linear
functions); apply the key consequence that every LOCAL minimum of a convex function is automatically
GLOBAL, via a direct proof-by-contradiction argument, and apply Jensen's Inequality
$f(E[X])\le E[f(X)]$ concretely; and verify the equivalence between the chord-inequality definition
and the HESSIAN POSITIVE-SEMIDEFINITE criterion ($\nabla^2f\succeq0$), reusing `math.linalg.positive-
definite`'s own eigenvalue test directly.

## Core Understanding
A function $f$ is CONVEX if, for every pair of points $x,y$ and every $\lambda\in[0,1]$, the value of
$f$ at the weighted average $\lambda x+(1-\lambda)y$ is AT MOST the weighted average of the values
$f(x),f(y)$ — geometrically, the chord connecting $(x,f(x))$ and $(y,f(y))$ lies ON OR ABOVE the graph
of $f$ between them. This is a NON-STRICT ($\le$) inequality: linear functions satisfy it with
EQUALITY throughout (the chord coincides exactly with the graph), and are therefore convex — even
though they never "curve upward" at all.

A genuinely powerful, non-obvious consequence: every LOCAL minimum of a convex function is
automatically GLOBAL. The proof is by contradiction — if a local minimum $x^*$ were NOT global, some
$y$ would have $f(y)<f(x^*)$; then points on the segment toward $y$, arbitrarily close to $x^*$, would
have $f$-values STRICTLY LESS than $f(x^*)$ by the chord inequality itself — contradicting $x^*$ being
a local minimum. No such $y$ can exist, so $x^*$ must already be global. This is precisely what makes
convex optimization tractable: finding ANY local minimum suffices to find THE minimum.

Two further, related characterizations: JENSEN'S INEQUALITY, $f(E[X])\le E[f(X)]$ for a random
variable $X$, is a direct consequence of the chord inequality generalized from two points to a full
probability distribution. Separately, for twice-differentiable $f$, convexity is EQUIVALENT to the
Hessian $\nabla^2f$ being POSITIVE SEMIDEFINITE everywhere — checkable via `math.linalg.positive-
definite`'s own eigenvalue or leading-principal-minor tests, giving a computational alternative to
checking the chord inequality point by point. These are two ROUTES to the identical conclusion, not
two independently-checked properties that could disagree.

## Mental Models
- **"The chord lies on or above the graph — and 'on' (equality) still counts. Linear functions are
  convex too."**
- **"A convex function can't hide a trap: any local minimum you find IS the global minimum."**
- **"Chord inequality and Hessian positive-semidefiniteness are two doors into the same room."**

## Why Students Fail

### MC-1: CONVEXITY-REQUIRES-VISIBLE-CURVATURE
- **Surface form**: believes a convex function must visibly curve upward everywhere, ruling out linear
  functions, missing that the non-strict chord inequality includes equality (linear functions) as a
  valid case.
- **Birth type**: Type 2, perceptual intuition (independently classified — the Blueprint gives
  Description and Severity but not birth type). A visibly curving graph is what "convex-looking"
  intuitively suggests, and that visual association is mistaken for the actual algebraic condition,
  which the chord inequality states as $\le$, never requiring strict curvature.
- **Repair**: re-walk the linear-function case explicitly — the chord coincides exactly with the
  graph, equality holds throughout, and the definition's $\le$ is satisfied.

### MC-2: CONVEX-LOCAL-MIN-ASSUMED-NOT-NECESSARILY-GLOBAL
- **Surface form**: believes a convex function could have a local minimum that is not the global
  minimum, missing the every-local-min-is-global theorem.
- **Birth type**: Type 1, overgeneralization (independently classified). For a GENERAL function,
  local minima that aren't global are common and expected, and that general-case intuition is
  overgeneralized into the convex case, where the chord inequality specifically rules it out.
- **Repair**: re-walk the proof-by-contradiction directly — assume a non-global local min exists,
  derive the contradiction via the chord inequality, and conclude no such point can exist.

### MC-3: CHORD-INEQUALITY-AND-HESSIAN-TEST-TREATED-AS-SEPARATE
- **Surface form**: believes the chord-inequality definition and the Hessian positive-semidefinite
  criterion are two separate, independently-checked properties of a function, rather than equivalent
  characterizations of the identical property.
- **Birth type**: Type 4, notation-induced (independently classified). The two tests look
  structurally unrelated on the page — one an inequality over pairs of points, the other an
  eigenvalue condition on a matrix — and that surface dissimilarity obscures that they answer the
  exact same question.
- **Repair**: re-verify both tests side by side on the identical function, confirming they agree.

## Misconceptions

### MC-1: CONVEXITY-REQUIRES-VISIBLE-CURVATURE
- **Surface form**: as described above.
- **Root cause (Type 2)**: as described above.
- **Repair**: as described above.

### MC-2: CONVEX-LOCAL-MIN-ASSUMED-NOT-NECESSARILY-GLOBAL
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-3: CHORD-INEQUALITY-AND-HESSIAN-TEST-TREATED-AS-SEPARATE
- **Surface form**: as described above.
- **Root cause (Type 4)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A taut string stretched between any two points on the graph never dips below the graph itself —
  it can lie flat against a straight stretch (equality) or bow above a curved one, but it never sags
  under."**
- **Anti-analogy**: convexity is NOT "curves upward everywhere, full stop" — a straight ruler laid
  against a linear function's graph is a valid, if degenerate, convex chord.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: verify the chord inequality directly for $f(x)=x$ at any
  $x,y,\lambda$ — equality holds exactly, confirming a straight line satisfies the definition with no
  curvature at all.
- **Demonstration 2 (targets MC-2)**: for $f(x)=x^2$, confirm $x^*=0$ (where $f'(0)=0$) genuinely is
  both a local AND the global minimum — no other point has a smaller value, consistent with the
  theorem.
- **Demonstration 3 (targets MC-3)**: for $f(x,y)=x^2+y^2$, compute the Hessian's eigenvalues (both
  $2$, positive definite via `math.linalg.positive-definite`'s own test) AND verify the chord
  inequality directly at a specific pair of points — both tests agree.

## Discovery Questions
1. "Must a convex function visibly 'curve upward' everywhere, ruling out linear functions?"
2. "Can a convex function have a local minimum that is not the global minimum?"
3. "Are the chord-inequality definition and the Hessian positive-semidefinite criterion two separate,
   independently-checked properties of a function?"

## Teaching Sequence
1. **Anchor**: connect to `math.calc.concavity`'s own single-variable curvature intuition, framing
   the chord inequality as its direct multivariable, non-strict generalization.
2. **Conflict evidence**: the proof-by-contradiction for every-local-min-is-global, breaking MC-2
   directly.
3. **Contrast pair**: the linear-function equality case against a genuinely curving convex function,
   isolating MC-1.
4. **Mastery gate**: require a correct chord-inequality verification, a correct every-local-min-is-
   global argument, and a correct Hessian-vs-chord equivalence check, at the Blueprint's own stated
   MAMR of 5/5.

## Tutor Actions
- Never accept "not convex" solely because a function is linear (no visible curvature) — require the
  chord inequality to be checked directly, including the equality case.
- When a local minimum of a convex function is found, require the learner to state explicitly why it
  is also guaranteed global, not merely assert it.

## Voice Teaching Notes
- Say "does the chord inequality require strict curvature, or does equality count too?" whenever
  linearity is used to disqualify convexity.
- When the Hessian test and the chord inequality are both available, ask "do these two tests actually
  answer different questions, or the same one?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly verifies the chord inequality for a given function,
  including recognizing a linear function's equality case.
- **Rung 2 (application)**: learner correctly applies the every-local-min-is-global argument and
  Jensen's Inequality on a specific case.
- **Rung 3 (transfer)**: learner correctly verifies convexity via the Hessian test, using
  `math.linalg.positive-definite`'s own eigenvalue test, in a novel context (e.g. a machine learning
  loss function), and explains what the convexity property does and does not guarantee about an
  optimization algorithm's speed.

## Tutor Recovery Strategy
- If MC-1 recurs, re-verify the chord inequality for the specific linear function in question.
- If MC-2 recurs, re-derive the proof-by-contradiction for the specific function in question.
- If MC-3 recurs, re-verify both tests side by side for the specific function in question.

## Memory Hooks
- "Chord on or above the graph — equality counts."
- "Convex means no trap: local min IS global min."
- "Chord inequality and Hessian test — same answer, two routes."

## Transfer Connections
- `math.calc.concavity` (already authored, this campaign): supplies the single-variable curvature
  intuition this concept generalizes to the multivariable chord/Hessian framework.
- `math.linalg.positive-definite`: NOT authored as an Educational Brain entry (confirmed via `ls`) —
  see Curriculum Feedback below for the corrected independence-mode handling.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.opt.convex-function.md`, reused by reference
  for its contrast-pair demonstration (linear vs. genuinely curving), its conflict-evidence proof-by-
  contradiction, its representation-shift chord/Hessian equivalence demonstration, and its three-
  misconception registry (birth types independently classified, since this Blueprint states severity
  but not birth type).
- Transfer probe cited by reference: the Blueprint's own probe (a machine learning loss-function
  convexity verification via the Hessian test, plus the speed-vs-global-guarantee distinction).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Genuine Blueprint-staleness finding on the P76 cross-link mode, corrected**: the Blueprint's
  Component 7 declares its `math.linalg.positive-definite` cross-link "authored" and sets
  $P76_{mode}=$ "cross-link probe" — but this check was performed via `ls
  docs/curriculum/blueprints/` (Blueprint-FILE existence), not via `ls
  educational-brain/concepts/mathematics/` (Educational-Brain-ENTRY existence). Confirmed directly:
  `math.linalg.positive-definite.md` does NOT exist in `educational-brain/concepts/mathematics/` —
  this concept has a Blueprint but no Educational Brain entry. Per the established recurring-finding
  pattern (Batches 24, 25, 48, 53, 63, 64, 68), this entry uses INDEPENDENCE mode instead: the
  eigenvalue/leading-principal-minor test is stated self-containedly (per `math.linalg.positive-
  definite`'s own general theory, reused conceptually but not as a retrievable peer entry), rather
  than assuming a retrievable cross-link probe. Resolved toward the confirmed-absent reality, not
  toward the Blueprint's stale check.
- All other metadata fields (requires `math.calc.concavity`, unlocks `math.opt.convex-optimization`,
  proficient/understand, mastery_threshold 0.9, estimated_hours 4) verified against the live KG and
  match exactly.

## Version History
- 2026-09-14 (Batch 80): authored. Second entry in the newly-opened `math.opt` domain (unblocked by
  the already-authored `math.calc.concavity`). Companion batch concepts: `math.linalg.rank`,
  `math.opt.convex-set`, `math.opt.unconstrained-optimization`. `math.opt` moves toward **4/16**
  this batch.
