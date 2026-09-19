# math.linalg.qr-factorization

## Identity
- **KG id**: `math.linalg.qr-factorization`
- **Domain**: math.linalg
- **Requires**: `math.linalg.gram-schmidt`
- **Unlocks**: none
- **Cross-links**: `math.num.qr-algorithm` (not yet authored, independence mode)
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.8
- **Estimated hours**: 5

## Learning Objective
Construct $A=QR$ by applying Gram-Schmidt to $A$'s columns for $Q$'s orthonormal columns and
computing $R$'s projection-coefficient entries; recognize $R$'s upper-triangular structure as a
DIRECT consequence of Gram-Schmidt's sequential construction — below-diagonal entries are EXACTLY
zero by construction, never merely small or approximate; and solve least-squares problems via
$Rx=Q^Tb$ by BACK-SUBSTITUTION (never general Gaussian elimination, which works but wastes the
triangular structure's efficiency).

## Core Understanding
$R$'S BELOW-DIAGONAL ENTRIES ARE EXACTLY ZERO BY CONSTRUCTION — NEVER MERELY SMALL: for
$A=\begin{pmatrix}1&1\\1&0\\0&1\end{pmatrix}$ (columns $a_1=(1,1,0)$, $a_2=(1,0,1)$): Gram-Schmidt
gives $q_1=a_1/\|a_1\|$, with $R_{11}=q_1\cdot a_1$, $R_{12}=q_1\cdot a_2$. The entry $R_{21}$
(below the diagonal) is EXACTLY 0 — never computed as a genuine projection coefficient — because
Gram-Schmidt's $i$-th orthonormal vector $q_i$ is built ONLY from $a_1,\ldots,a_i$, never depending
on later columns. Treating $R_{21}$ as something needing computation, or as merely "small" rather
than exactly zero, misunderstands the structural reason $R$ ends up upper triangular in the first
place.

BACK-SUBSTITUTION IS THE EFFICIENT SOLVE FOR AN UPPER-TRIANGULAR SYSTEM — NEVER GENERAL
ELIMINATION: for a least-squares problem $Ax\approx b$: substituting $A=QR$ gives
$Rx\approx Q^Tb$ (multiplying by $Q^T$, using $Q^TQ=I$). Since $R$ is upper triangular, solving
$Rx=Q^Tb$ via BACK-SUBSTITUTION (solve for the LAST unknown first, then substitute upward) is the
efficient shortcut $R$'s structure directly enables. Using GENERAL Gaussian elimination (forward
elimination with row operations) still produces a correct answer, but wastes the triangular
structure's built-in efficiency — an unnecessary detour around the shortcut the factorization was
designed to provide.

## Mental Models
- **"R's below-diagonal zeros aren't a coincidence — they're forced by the fact that each
  orthonormalized vector only ever depends on the columns that came before it."**
- **"Solving with an upper-triangular R means back-substitution — start from the last unknown and
  work backward, never forward elimination."**

## Why Students Fail

### MC-1: R-BELOW-DIAGONAL-ENTRIES-NOT-RECOGNIZED-AS-EXACTLY-ZERO-BY-CONSTRUCTION
- **Surface form**: treats $R$'s below-diagonal entries as needing computation or as merely
  "small," rather than recognizing they are exactly 0 by Gram-Schmidt's sequential construction.
- **Birth type**: Foundational severity (Blueprint's own declared severity — without seeing the
  structural reason, the zeros can look like a numerical coincidence rather than a guaranteed
  consequence).
- **Repair**: re-derive why $q_2$ is orthogonal to $q_1$ by Gram-Schmidt's own subtraction step,
  forcing the below-diagonal entries to vanish.

### MC-2: GENERAL-ELIMINATION-USED-INSTEAD-OF-BACK-SUBSTITUTION-FOR-UPPER-TRIANGULAR-R
- **Surface form**: solves $Rx=Q^Tb$ via general Gaussian elimination instead of the simpler, more
  efficient back-substitution $R$'s upper-triangular structure directly enables.
- **Birth type**: Moderate severity (Blueprint's own declared severity — general elimination still
  produces a correct answer, just inefficiently, unlike misunderstanding $R$'s zero structure).
- **Repair**: re-solve using back-substitution directly, solving for the last variable first.

## Misconceptions

### MC-1: R-BELOW-DIAGONAL-ENTRIES-NOT-RECOGNIZED-AS-EXACTLY-ZERO-BY-CONSTRUCTION
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: GENERAL-ELIMINATION-USED-INSTEAD-OF-BACK-SUBSTITUTION-FOR-UPPER-TRIANGULAR-R
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"R's upper-triangular shape is a family tree — each new orthonormalized vector only knows
  about its ancestors (earlier columns), never its descendants, which is exactly why the entries
  below the diagonal are guaranteed zero."**
- **Anti-analogy**: solving Rx=Qᵀb is not a generic linear-system problem requiring full
  elimination — its triangular shape is a gift that makes back-substitution directly applicable.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the full $Q,R$ construction for
  $A=\begin{pmatrix}1&1\\1&0\\0&1\end{pmatrix}$, explicitly connecting each $R$ entry to a
  Gram-Schmidt step and confirming the below-diagonal zero.
- **Demonstration 2 (positive case)**: the direct $Q^TQ=I$ verification for the constructed $Q$.
- **Demonstration 3 (targets MC-2)**: the back-substitution solve of $Rx=Q^Tb$, contrasted with
  unnecessary general Gaussian elimination.

## Discovery Questions
1. "Are R's below-diagonal entries approximately zero due to rounding, or are they exactly zero by
   the structure of how Gram-Schmidt builds each vector?"
2. "Once you have Rx=Qᵀb with R upper triangular, is general Gaussian elimination the most
   efficient way to solve it, or is there a shortcut?"

## Teaching Sequence
1. **Conceptual shift**: the full $Q,R$ construction connecting each entry to its Gram-Schmidt
   origin, working Demonstration 1, isolating MC-1.
2. **Verification**: the direct $Q^TQ=I$ check, working Demonstration 2.
3. **Representation shift**: back-substitution as the efficient solve, working Demonstration 3,
   isolating MC-2.
4. **Mastery gate**: require a correct $Q,R$ construction with the below-diagonal-zero structure
   explained, and a correct back-substitution solve of a least-squares problem, at the Blueprint's
   own stated MAMR of 4/5.

## Tutor Actions
- Never accept $R$'s below-diagonal entries treated as needing computation rather than exactly
  zero by construction.
- Never accept general Gaussian elimination used to solve an upper-triangular system when
  back-substitution is directly available.

## Voice Teaching Notes
- Say "is that entry exactly zero by construction, or does it need computing?" whenever an entry
  of $R$ is discussed.
- Ask "since R is upper triangular, what's the more efficient way to solve this?" whenever
  $Rx=Q^Tb$ is being solved.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly constructs $Q$ and $R$ from a matrix's columns via
  Gram-Schmidt.
- **Rung 2 (application)**: learner correctly verifies $Q^TQ=I$ and explains why $R$'s below-
  diagonal entries are exactly zero.
- **Rung 3 (transfer)**: learner correctly solves a least-squares problem via QR factorization
  using back-substitution, and explains the numerical-stability advantage over normal equations in
  an engineering context.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the orthogonality-forcing subtraction step from Gram-Schmidt.
- If MC-2 recurs, re-solve via back-substitution directly.

## Memory Hooks
- "R's below-diagonal zeros are guaranteed by construction — never a coincidence."
- "Upper triangular means back-substitution — start from the last unknown."

## Transfer Connections
- `math.linalg.gram-schmidt` (already authored, this campaign, Batch 175): supplies the
  orthonormalization process that directly produces $Q$'s columns and $R$'s entries.
- `math.linalg.lu-factorization` (not yet authored, KG's declared related concept): another matrix
  factorization technique, contrasting a different origin for triangular structure.
- `math.num.qr-algorithm` (not yet authored): the KG's declared cross-link, the iterative
  eigenvalue-computation algorithm that repeatedly applies QR factorization as its core step.

## Cross-Subject Connections
- Engineering/data fitting: solving overdetermined least-squares systems from noisy sensor data,
  with QR factorization's numerical stability preferred over the normal equations.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.qr-factorization.md`, reused by
  reference for its full $Q,R$ construction example, its back-substitution least-squares solve,
  and its two-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, applying QR-based least-squares to
  a structural-engineering overdetermined sensor-data scenario.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.linalg.gram-schmidt`, unlocks none, cross_links `math.num.qr-algorithm`, expert/apply,
  mastery_threshold 0.8, estimated_hours 5) was directly verified against the live KG and matches
  exactly. `math.num.qr-algorithm` independently re-confirmed still unauthored — the Blueprint's
  independence-mode transfer probe remains correct.

## Version History
- 2026-09-19 (Batch 176): authored. Second entry this batch. Companion batch concept:
  `math.linalg.positive-definite`.
