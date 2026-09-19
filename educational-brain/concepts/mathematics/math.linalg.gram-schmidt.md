# math.linalg.gram-schmidt

## Identity
- **KG id**: `math.linalg.gram-schmidt`
- **Domain**: math.linalg
- **Requires**: `math.linalg.orthogonal-basis`, `math.linalg.projection`
- **Unlocks**: `math.linalg.qr-factorization` (Blueprint's own Component 0/7 stated "none in
  KG"/"none recorded" — the live KG's current value used as authoritative, see Curriculum
  Feedback)
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
Convert a linearly independent set into an orthogonal set by iteratively subtracting each new
vector's projections onto ALL PREVIOUSLY constructed orthogonal vectors (never just the
immediately preceding one); normalize the resulting orthogonal set into an orthonormal basis ONLY
AFTER orthogonalization is complete (never conflating the two phases); and correctly accumulate
projection subtractions as the process proceeds — a structural requirement that GROWS with each
new vector.

## Core Understanding
EACH NEW VECTOR MUST SUBTRACT PROJECTIONS ONTO EVERY PREVIOUSLY CONSTRUCTED VECTOR — NEVER JUST THE
MOST RECENT ONE: for $v_1=(1,1,0)$, $v_2=(1,0,1)$, $v_3=(0,1,1)$: $u_1=v_1$; $u_2=v_2-
\text{proj}_{u_1}(v_2)=(0.5,-0.5,1)$ — one subtraction so far. For $u_3$: the CORRECT computation
subtracts BOTH $\text{proj}_{u_1}(v_3)$ AND $\text{proj}_{u_2}(v_3)$, giving
$u_3=(-0.667,0.667,0.667)$. Subtracting only the projection onto $u_2$ (the immediately preceding
vector), forgetting $u_1$, leaves $u_3$ still NOT orthogonal to $u_1$ — only ONE of the two
required orthogonality conditions was enforced. This structural requirement GROWS with the vector
count: the $k$-th vector requires $k-1$ subtractions, never a fixed small number.

NORMALIZATION HAPPENS ONLY AFTER ALL ORTHOGONALIZATION IS COMPLETE — NEVER MID-SEQUENCE: the
process has TWO distinct phases: first construct the FULL orthogonal set $\{u_1,\ldots,u_k\}$ via
iterative projection subtraction, THEN normalize each ($\hat u_i=u_i/\|u_i\|$) as a separate final
pass. For $u_1=(1,1,0)$ (norm $\sqrt2$): $\hat u_1=\frac1{\sqrt2}(1,1,0)$. Normalizing prematurely
(mid-sequence, before all $u_i$'s are constructed) risks corrupting later projection computations,
since subsequent projection formulas expect the CURRENT (possibly unnormalized) $u_i$'s in their
denominators.

THE CONSTRUCTED VECTORS' ORTHOGONALITY SHOULD BE VERIFIED DIRECTLY — NEVER TRUSTED BLINDLY: after
constructing $u_1,u_2,u_3$, checking pairwise dot products (e.g. $u_1\cdot u_2=0$, and ultimately
$u_1\cdot u_3=0$, $u_2\cdot u_3=0$) directly confirms correctness or reveals a computational error
in the projection-subtraction steps — this check is always available and cheap, never something to
skip in favor of trusting the formula ran without complaint.

## Mental Models
- **"Each new vector subtracts away everything it shares with EVERY vector built so far — not just
  the last one."**
- **"Orthogonalize first, normalize last — two separate passes, never interleaved."**
- **"Checking pairwise dot products is a free correctness check — always available, never skip
  it."**

## Why Students Fail

### MC-1: GRAM-SCHMIDT-PROJECTION-SUBTRACTED-ONLY-FROM-IMMEDIATE-PREDECESSOR
- **Surface form**: subtracts the projection onto only the most recently constructed orthogonal
  vector, rather than onto ALL previously constructed vectors.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the single most
  common procedural error, growing MORE likely as the vector count increases, exactly where the
  process becomes most valuable and most error-prone simultaneously).
- **Repair**: re-verify $u_3$'s dot product with BOTH $u_1$ and $u_2$, showing the flawed version
  fails against $u_1$ specifically.

### MC-2: ORTHOGONALIZATION-AND-NORMALIZATION-STEPS-CONFLATED
- **Surface form**: normalizes vectors partway through the orthogonalization process rather than
  completing all orthogonalization first, potentially corrupting later projection computations.
- **Birth type**: Moderate severity (Blueprint's own declared severity — normalizing feels like a
  natural "finishing touch" on each vector as soon as it's produced).
- **Repair**: re-derive by completing the FULL orthogonal set first, only normalizing as a
  distinct final pass.

### MC-3: ORTHOGONALITY-RESULT-NOT-VERIFIED
- **Surface form**: does not check the constructed vectors' pairwise dot products equal zero,
  missing a computational error in the projection subtraction steps.
- **Birth type**: Moderate severity (Blueprint's own declared severity — once a multi-step
  computation "runs," its output is trusted without the available verification check).
- **Repair**: re-compute all pairwise dot products among the constructed vectors, confirming each
  equals zero.

## Misconceptions

### MC-1: GRAM-SCHMIDT-PROJECTION-SUBTRACTED-ONLY-FROM-IMMEDIATE-PREDECESSOR
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: ORTHOGONALIZATION-AND-NORMALIZATION-STEPS-CONFLATED
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

### MC-3: ORTHOGONALITY-RESULT-NOT-VERIFIED
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Each new vector has to shake off its shadow from EVERY previous direction — missing even one
  earlier direction leaves a leftover overlap."**
- **Anti-analogy**: normalizing is not a per-vector finishing touch to apply as you go — it's a
  distinct, final pass over the whole completed orthogonal set.

## Demonstrations
- **Demonstration 1 (positive case)**: the first-two-vector orthogonalization for $v_1=(1,1,0)$,
  $v_2=(1,0,1)$, verified via dot product.
- **Demonstration 2 (targets MC-1)**: the full three-vector case, contrasting the correct
  (subtract onto both $u_1,u_2$) against the flawed (subtract onto $u_2$ only) computation for
  $u_3$.
- **Demonstration 3 (targets MC-2)**: the explicit separation of the orthogonalization phase from
  the normalization phase.

## Discovery Questions
1. "When constructing the third orthogonal vector, do you subtract its projection onto just the
   second vector, or onto both the first and second?"
2. "Should you normalize each vector as soon as it's constructed, or only after the entire
   orthogonal set is complete?"
3. "How can you verify that a completed Gram-Schmidt process actually produced an orthogonal set?"

## Teaching Sequence
1. **Conceptual shift**: the first-projection-subtraction step, connecting directly to the
   already-mastered projection formula.
2. **Contrast pair**: the correct-versus-flawed three-vector case, working Demonstration 2,
   isolating MC-1.
3. **Representation shift**: the orthogonalization-then-normalization phase separation, working
   Demonstration 3, isolating MC-2.
4. **Mastery gate**: require a correct multi-vector orthogonalization with all required
   subtractions, a correct final normalization pass, and a correct verification via pairwise dot
   products, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a Gram-Schmidt step that subtracts projections onto fewer than all previously
  constructed vectors.
- Never accept normalization performed before the full orthogonal set is constructed.
- Never accept a completed Gram-Schmidt result without the option to verify pairwise orthogonality.

## Voice Teaching Notes
- Say "have you subtracted the projection onto every previous vector, or just the last one?"
  whenever a new Gram-Schmidt step is performed.
- Ask "have you finished orthogonalizing everything, or are you normalizing early?" whenever
  normalization is attempted mid-process.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly orthogonalizes the first two vectors of a set.
- **Rung 2 (application)**: learner correctly orthogonalizes a third (or later) vector, subtracting
  projections onto all previous vectors.
- **Rung 3 (transfer)**: learner correctly separates orthogonalization from normalization and
  explains the process's value in a signal-processing context (independent, non-interfering
  components).

## Tutor Recovery Strategy
- If MC-1 recurs, re-verify the dot product against each previously constructed vector.
- If MC-2 recurs, re-derive by completing orthogonalization fully before normalizing.
- If MC-3 recurs, re-compute all pairwise dot products explicitly.

## Memory Hooks
- "Subtract from every vector built so far — not just the most recent one."
- "Orthogonalize everything first, normalize last — never interleave the two."
- "Check pairwise dot products — it's a free, always-available correctness check."

## Transfer Connections
- `math.linalg.orthogonal-basis` (already authored, this campaign, Batch 173): supplies the
  orthogonal/orthonormal basis definitions this process constructively produces.
- `math.linalg.projection` (already authored, this campaign, Batch 174): supplies the vector-
  projection operation this process repeatedly applies at each step.
- `math.linalg.qr-factorization` (not yet authored, KG's declared unlock — corrected from the
  Blueprint's stale "none" claim, see Curriculum Feedback): the direct application decomposing a
  matrix into an orthogonal matrix times an upper-triangular matrix, using exactly this process.

## Cross-Subject Connections
- Signal processing: constructing an orthonormal basis for a signal subspace so that components
  along different directions can be analyzed independently, without cross-interference.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.gram-schmidt.md`, reused by reference
  for its full three-vector orthogonalization worked example, its normalization-as-final-step
  demonstration, and its three-misconception registry (severity levels adopted directly as
  declared).
- Transfer probe: the Blueprint's own independence-mode probe, applying the process to a
  signal-processing three-signal-vector orthonormalization scenario.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Stale Blueprint metadata found and corrected**: the Blueprint's own Component 0 and Component 7
  both state `unlocks: none` — the live KG lists `math.linalg.qr-factorization` as this concept's
  unlock — the live KG's current value used as authoritative here. `math.linalg.qr-factorization`
  independently re-verified still unauthored in the EDUCATIONAL-BRAIN corpus. All other fields
  (requires `math.linalg.orthogonal-basis`/`math.linalg.projection`, cross_links none,
  proficient/apply, mastery_threshold 0.9, estimated_hours 4) matched the live KG exactly. This is
  the third such `unlocks`-field stale-metadata discrepancy this campaign (after
  `math.linalg.dimension` and `math.linalg.coordinates` at Batch 171).

## Version History
- 2026-09-19 (Batch 175): authored. First entry this batch. Companion batch concept:
  `math.linalg.spectral-theorem`.
