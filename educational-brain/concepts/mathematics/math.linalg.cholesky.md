# math.linalg.cholesky

## Identity
- **KG id**: `math.linalg.cholesky`
- **Domain**: math.linalg
- **Requires**: `math.linalg.positive-definite`, `math.linalg.lu-factorization`
- **Unlocks**: none
- **Cross-links**: `math.num.cholesky` (not yet authored, independence mode)
- **Difficulty**: expert
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 4

## Learning Objective
Recognize that for symmetric positive definite $A$, general LU factorization $A=LU$ SPECIALIZES
to $A=LL^T$ (a single lower-triangular factor with positive diagonal, never a separate technique);
compute $L$ DIRECTLY via recursive column formulas (never requiring general LU elimination first);
and recognize Cholesky uses roughly HALF the work of general LU (never the same cost), since
computing only one triangular factor with the other free by transposition genuinely halves the
computation.

## Core Understanding
CHOLESKY IS LU SPECIALIZED BY SYMMETRY — NEVER A SEPARATE FACTORIZATION METHOD: for symmetric
positive definite $A=\begin{pmatrix}4&2\\2&5\end{pmatrix}$: ordinary LU gives $L_0=
\begin{pmatrix}1&0\\0.5&1\end{pmatrix}$, $U=\begin{pmatrix}4&2\\0&4\end{pmatrix}$. Observing
$U=DL_0^T$ with $D=\begin{pmatrix}4&0\\0&4\end{pmatrix}$ (a direct consequence of $A=A^T$ applied
to $A=LDL^T$): absorbing $\sqrt D$ into $L_0$ gives the Cholesky factor
$L=\begin{pmatrix}2&0\\1&2\end{pmatrix}$ — this IS the symmetrized specialization of the ALREADY-
COMPUTED general LU factorization, never an independent alternative technique.

$L$ CAN BE COMPUTED DIRECTLY VIA RECURSIVE FORMULAS — NEVER REQUIRING GENERAL LU FIRST: for the
SAME $A$: $L_{11}=\sqrt{A_{11}}=2$; $L_{21}=A_{21}/L_{11}=1$; $L_{22}=\sqrt{A_{22}-L_{21}^2}=
\sqrt{5-1}=2$ — giving $L=\begin{pmatrix}2&0\\1&2\end{pmatrix}$, MATCHING the symmetrization
route exactly, but obtained DIRECTLY without ever running general elimination first. In practice,
this is exactly how Cholesky is computed — one pass of recursive column formulas, never LU-then-
symmetrize.

CHOLESKY IS ROUGHLY HALF THE WORK OF GENERAL LU — NEVER THE SAME COST: for a $3\times3$ symmetric
positive definite matrix: general LU computes and stores BOTH a full $L$ (3 nontrivial entries)
AND a full $U$ (6 entries) — 9 stored numbers. Cholesky computes and stores ONLY $L$ (6 entries,
including its own diagonal) — roughly HALF as many numbers, because $L^T$ is never separately
computed; it's simply $L$'s transpose, free of additional work. This "half the storage, half the
arithmetic" pattern is exactly why Cholesky is preferred whenever $A$ is known to be symmetric
positive definite.

## Mental Models
- **"Cholesky isn't a new technique — it's LU factorization collapsing into one factor once you
  know A is symmetric and positive definite."**
- **"L's entries come from direct recursive formulas — you never actually run general elimination
  first and then symmetrize."**
- **"One triangular factor, with the transpose free — that's genuinely half the work of computing
  two separate factors."**

## Why Students Fail

### MC-1: CHOLESKY-ASSUMED-SEPARATE-METHOD
- **Surface form**: believes Cholesky decomposition is an entirely separate factorization
  technique, missing that it is LU factorization specialized by symmetry into a single triangular
  factor.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the notation $A=LL^T$
  looks structurally different enough from $A=LU$ to suggest an unrelated method).
- **Repair**: re-walk the symmetrization derivation, showing $U=DL_0^T$ from ordinary LU output.

### MC-2: CHOLESKY-ASSUMED-TO-REQUIRE-LU-FIRST
- **Surface form**: believes the Cholesky factor $L$ must be obtained by running general LU
  factorization first and then symmetrizing.
- **Birth type**: High severity (Blueprint's own declared severity — Example 1's symmetrization
  route, presented first for conceptual clarity, can be mistaken for the actual computational
  procedure).
- **Repair**: re-walk the direct recursive computation, confirming it matches the symmetrization
  result without ever running general elimination.

### MC-3: CHOLESKY-ASSUMED-SAME-COST-AS-LU
- **Surface form**: believes Cholesky decomposition costs roughly the same computational work as
  general LU factorization.
- **Birth type**: Moderate severity (Blueprint's own declared severity — without an explicit
  storage-count comparison, the two methods can seem comparably expensive).
- **Repair**: re-walk the storage-count contrast (9 vs. 6 numbers for a $3\times3$ matrix).

## Misconceptions

### MC-1: CHOLESKY-ASSUMED-SEPARATE-METHOD
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: CHOLESKY-ASSUMED-TO-REQUIRE-LU-FIRST
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: CHOLESKY-ASSUMED-SAME-COST-AS-LU
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Cholesky is LU wearing a symmetric matrix's discount — the same underlying idea, but
  symmetry lets you pay for only one triangular factor instead of two."**
- **Anti-analogy**: computing L is not a two-step process of running LU then symmetrizing — the
  recursive formulas get you there directly, in one pass.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the symmetrization derivation $U=DL_0^T$ from ordinary LU
  output for $A=\begin{pmatrix}4&2\\2&5\end{pmatrix}$.
- **Demonstration 2 (targets MC-2)**: the direct recursive computation of $L$ for the same matrix,
  matching Example 1's result without running LU first.
- **Demonstration 3 (targets MC-3)**: the storage-count contrast (9 vs. 6 numbers) for a
  $3\times3$ matrix.

## Discovery Questions
1. "Is Cholesky decomposition an entirely separate factorization method from LU, or a
   specialization of it?"
2. "Must you run general LU factorization first and then symmetrize to obtain the Cholesky factor
   L, or can L be computed directly?"
3. "Does Cholesky decomposition require roughly the same amount of work as general LU
   factorization on the same matrix?"

## Teaching Sequence
1. **Representation shift**: the symmetrization derivation from ordinary LU output, isolating
   MC-1.
2. **Conflict evidence**: the direct recursive computation matching the symmetrization result,
   isolating MC-2.
3. **Contrast pair**: the storage-count comparison, isolating MC-3.
4. **Mastery gate**: require a correct positive-definiteness verification, a correct direct
   recursive computation of $L$, and a correct explanation of why Cholesky costs roughly half of
   general LU, at the Blueprint's own stated MAMR of 4/5.

## Tutor Actions
- Never accept Cholesky decomposition described as an unrelated technique from LU factorization.
- Never accept a claim that general LU must be run first to obtain the Cholesky factor.
- Never accept a claim that Cholesky costs the same as general LU.

## Voice Teaching Notes
- Say "is this really a separate method, or LU specialized by symmetry?" whenever Cholesky is
  introduced.
- Ask "can you compute L directly, or do you need to run LU first?" whenever the Cholesky factor
  is being found.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly recognizes Cholesky as LU specialized by symmetry.
- **Rung 2 (application)**: learner correctly computes the Cholesky factor $L$ directly via the
  recursive formulas and verifies $LL^T=A$.
- **Rung 3 (transfer)**: learner correctly explains, using both the symmetry-specialization and
  half-the-work arguments, why an engineer would deliberately choose Cholesky over general LU.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the symmetrization derivation.
- If MC-2 recurs, re-walk the direct recursive computation.
- If MC-3 recurs, re-walk the storage-count contrast.

## Memory Hooks
- "Cholesky is LU specialized by symmetry — never a separate method."
- "L comes from direct recursive formulas — never LU-then-symmetrize in practice."
- "One factor with a free transpose is genuinely half the work of two separate factors."

## Transfer Connections
- `math.linalg.positive-definite` (already authored, this campaign, Batch 176): supplies the
  definition and equivalent characterizations certifying $A$'s positive-definiteness, the
  precondition for Cholesky's real positive diagonal.
- `math.linalg.lu-factorization` (already authored, certified domain): supplies the general
  $A=LU$ factorization this concept specializes by symmetry.
- `math.num.cholesky` (not yet authored): the KG's declared cross-link, the full complexity
  analysis this concept previews at orientation level.

## Cross-Subject Connections
- Structural engineering/numerical computing: repeatedly factoring a symmetric positive definite
  stiffness matrix across design iterations, where Cholesky's half-the-work advantage compounds.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.cholesky.md`, reused by reference for
  its symmetrization-versus-direct-computation dual derivation for
  $A=\begin{pmatrix}4&2\\2&5\end{pmatrix}$, its storage-count contrast, and its three-misconception
  registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, applying Cholesky to a structural-
  engineering stiffness-matrix scenario.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.linalg.positive-definite`/`math.linalg.lu-factorization`, unlocks none, cross_links
  `math.num.cholesky`, expert/apply, mastery_threshold 0.75, estimated_hours 4) was directly
  verified against the live KG and matches exactly. `math.linalg.lu-factorization` independently
  re-confirmed authored; `math.num.cholesky` independently re-confirmed still unauthored — the
  Blueprint's independence-mode deferral remains correct.

## Version History
- 2026-09-19 (Batch 177): authored. First entry this batch. Companion batch concept:
  `math.linalg.svd`.
