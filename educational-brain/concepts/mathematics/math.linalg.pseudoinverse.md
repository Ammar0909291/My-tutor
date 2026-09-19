# math.linalg.pseudoinverse

## Identity
- **KG id**: `math.linalg.pseudoinverse`
- **Domain**: math.linalg
- **Requires**: `math.linalg.svd`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 5

## Learning Objective
Construct $A^+=V\Sigma^+U^T$ from $A$'s SVD, where $\Sigma^+$ INVERTS each NONZERO singular value
and leaves ZERO singular values as ZERO (never attempting to invert zero, which is undefined); use
$\hat x=A^+b$ to find the MINIMUM-NORM least-squares solution to $Ax=b$ for ANY matrix $A$ (never
limited to square, invertible matrices like the ordinary inverse); and recognize $A^+=A^{-1}$
EXACTLY when $A$ is square and invertible (never assuming the pseudoinverse always differs from
the ordinary inverse).

## Core Understanding
$\Sigma^+$ INVERTS NONZERO SINGULAR VALUES AND LEAVES ZERO ONES AS ZERO — NEVER ATTEMPTING TO
INVERT ZERO: for $\Sigma=\begin{pmatrix}2&0&0\\0&5&0\\0&0&0\end{pmatrix}$: construct $\Sigma^+$ by
inverting the NONZERO entries ($1/2$, $1/5$) and leaving the ZERO entry as EXACTLY 0:
$\Sigma^+=\begin{pmatrix}1/2&0&0\\0&1/5&0\\0&0&0\end{pmatrix}$. Attempting to invert EVERY entry
INCLUDING the zero (producing an undefined $1/0$, or some placeholder like "$\infty$") is wrong —
the zero-singular-value case is meant to stay EXACTLY 0, by definition, precisely because that
transformation mode has no strength at all to invert.

$\hat x=A^+b$ GIVES THE MINIMUM-NORM SOLUTION AMONG ALL VALID SOLUTIONS — NEVER JUST "A" SOLUTION:
for an UNDERDETERMINED system $Ax=b$ (more unknowns than equations, infinitely many exact
solutions): $\hat x=A^+b$ specifically picks out the solution with the SMALLEST norm among ALL the
infinitely many valid solutions — not merely one of them arbitrarily, but the uniquely shortest
one. This works for ANY matrix $A$ — overdetermined, underdetermined, or exactly determined —
unlike the ordinary inverse, which requires a square, invertible matrix and simply doesn't apply
otherwise.

$A^+=A^{-1}$ EXACTLY WHEN $A$ IS INVERTIBLE — THE PSEUDOINVERSE GENERALIZES, NEVER REPLACES, THE
ORDINARY INVERSE: for an invertible $2\times2$ matrix $A$ with all singular values nonzero:
$A^+=V\Sigma^{-1}U^T$, and verifying $A^+A=I$ directly confirms $A^+=A^{-1}$ EXACTLY. Assuming the
pseudoinverse must ALWAYS differ from the ordinary inverse (treating them as fundamentally
separate objects even for square invertible matrices) is wrong — they COINCIDE exactly whenever
$A^{-1}$ exists; the pseudoinverse only introduces genuinely NEW behavior when the ordinary
inverse does NOT exist.

## Mental Models
- **"Σ⁺ inverts what has strength (nonzero singular values) and leaves what has no strength (zero
  singular values) alone — never forcing an inversion where there's nothing to invert."**
- **"The pseudoinverse picks the SHORTEST valid solution among infinitely many, not just any
  solution — that's what 'minimum-norm' means."**
- **"The pseudoinverse is a strict generalization — it agrees exactly with the ordinary inverse
  whenever that exists, and only does something genuinely new when it doesn't."**

## Why Students Fail

### MC-1: ZERO-SINGULAR-VALUES-INCORRECTLY-INVERTED-OR-TREATED-AS-UNDEFINED-IN-SIGMA-PLUS
- **Surface form**: attempts to invert zero singular values in $\Sigma^+$ (producing an undefined
  result) instead of correctly leaving them as exactly 0.
- **Birth type**: Foundational severity (Blueprint's own declared severity — mishandling this
  produces an entirely undefined or nonsensical result).
- **Repair**: re-state the definition explicitly — invert nonzero entries only, leave zero entries
  unchanged — connecting to the "no strength to invert" interpretation from
  `math.linalg.singular-values`.

### MC-2: PSEUDOINVERSE-ASSUMED-ALWAYS-DIFFERENT-FROM-ORDINARY-INVERSE
- **Surface form**: believes the pseudoinverse always differs from the ordinary inverse, rather
  than recognizing they coincide exactly when $A$ is square and invertible.
- **Birth type**: Moderate severity (Blueprint's own declared severity — a conceptual
  misunderstanding that doesn't corrupt any actual computation, only the broader mental model).
- **Repair**: re-verify $A^+A=I$ directly for the invertible case, confirming the generalization
  relationship.

## Misconceptions

### MC-1: ZERO-SINGULAR-VALUES-INCORRECTLY-INVERTED-OR-TREATED-AS-UNDEFINED-IN-SIGMA-PLUS
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: PSEUDOINVERSE-ASSUMED-ALWAYS-DIFFERENT-FROM-ORDINARY-INVERSE
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Constructing Σ⁺ is like turning off switches that were never on — you flip (invert) the ones
  with real strength, and leave the already-zero ones exactly as they are."**
- **Anti-analogy**: the pseudoinverse is not a completely different tool from the ordinary inverse
  — it's the SAME object whenever the ordinary inverse exists, only extending sensibly where it
  doesn't.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the direct $\Sigma^+$ construction for
  $\Sigma=\text{diag}(2,5,0)$, correctly leaving the zero entry unchanged.
- **Demonstration 2 (positive case)**: the underdetermined-system minimum-norm solution
  illustration, picking the shortest among infinitely many valid solutions.
- **Demonstration 3 (targets MC-2)**: the direct $A^+A=I$ verification for an invertible matrix,
  confirming $A^+=A^{-1}$.

## Discovery Questions
1. "In Σ⁺, should a zero singular value be inverted, or left as zero?"
2. "If a system Ax=b has infinitely many exact solutions, does the pseudoinverse give you any one
   of them, or a specific one?"
3. "Does the pseudoinverse always differ from the ordinary inverse, or do they ever coincide?"

## Teaching Sequence
1. **Conceptual shift**: the $\Sigma^+$ construction handling the zero-singular-value case
   separately, working Demonstration 1, isolating MC-1.
2. **Representation shift**: the minimum-norm solution among infinitely many, working
   Demonstration 2.
3. **Contrast pair**: the pseudoinverse-equals-ordinary-inverse case, working Demonstration 3,
   isolating MC-2.
4. **Mastery gate**: require a correct $\Sigma^+$ construction with a zero-singular-value case, a
   correct explanation of the minimum-norm solution concept, and a correct verification that
   $A^+=A^{-1}$ for an invertible matrix, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept a zero singular value inverted or treated as undefined in $\Sigma^+$.
- Never accept a claim that the pseudoinverse always differs from the ordinary inverse.

## Voice Teaching Notes
- Say "does this singular value need inverting, or is it already zero?" whenever $\Sigma^+$ is
  constructed.
- Ask "does the pseudoinverse coincide with the ordinary inverse here, or genuinely differ?"
  whenever the pseudoinverse is applied to a square matrix.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly constructs $\Sigma^+$, leaving zero entries
  unchanged.
- **Rung 2 (application)**: learner correctly explains the minimum-norm property for an
  underdetermined system.
- **Rung 3 (transfer)**: learner correctly verifies $A^+=A^{-1}$ for an invertible matrix, and
  applies the minimum-norm solution concept to a robotics redundant-actuator scenario.

## Tutor Recovery Strategy
- If MC-1 recurs, re-state the invert-nonzero-leave-zero-unchanged rule explicitly.
- If MC-2 recurs, re-verify $A^+A=I$ directly for the invertible case.

## Memory Hooks
- "Invert what has strength, leave zero strength alone — never invert a zero singular value."
- "Minimum-norm means the shortest valid solution, not just any solution."
- "The pseudoinverse equals the ordinary inverse whenever that exists — it's a generalization,
  not a replacement."

## Transfer Connections
- `math.linalg.svd` (already authored, this campaign, Batch 177): supplies the factorization
  $A=U\Sigma V^T$ this concept's pseudoinverse is directly built from.
- `math.linalg.singular-values` (authored earlier this same batch): supplies the "mode strength"
  interpretation this concept's zero-versus-nonzero singular-value handling directly reuses.
- `math.linalg.least-squares` (not yet authored, KG's declared related concept): the pseudoinverse's
  minimum-norm solution IS the least-squares solution for underdetermined/overdetermined systems.

## Cross-Subject Connections
- Robotics: redundant actuators (more joints than degrees of freedom needed), where the
  minimum-norm solution corresponds to the smallest overall joint movement/effort.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.pseudoinverse.md`, reused by
  reference for its $\Sigma^+$ construction example, its minimum-norm underdetermined-system
  illustration, its invertible-matrix $A^+=A^{-1}$ verification, and its two-misconception
  registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, applying the minimum-norm
  pseudoinverse solution to a robotic-arm redundant-actuator scenario.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `math.linalg.svd`,
  unlocks none, cross_links none, expert/apply, mastery_threshold 0.75, estimated_hours 5) was
  directly verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 178): authored. Second entry this batch. Companion batch concept:
  `math.linalg.singular-values`.
