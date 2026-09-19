# math.linalg.orthogonal-basis

## Identity
- **KG id**: `math.linalg.orthogonal-basis`
- **Domain**: math.linalg
- **Requires**: `math.linalg.orthogonality`, `math.linalg.basis`
- **Unlocks**: `math.linalg.gram-schmidt`, `math.linalg.projection`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 3

## Learning Objective
Verify whether a basis is orthogonal (mutually zero dot products) and, further, orthonormal
(orthogonal AND unit length — the STRICTLY stronger condition, never conflated with orthogonal
alone); compute coordinates in an ORTHONORMAL basis directly via $c_i=\langle v,e_i\rangle$ (never
needing to solve a linear system); and recognize this shortcut fails for a NON-orthonormal basis
(never applying the formula universally, since it depends specifically on orthonormality, not a
general basis property).

## Core Understanding
ORTHOGONAL AND ORTHONORMAL ARE DISTINCT — ORTHONORMAL IS STRICTLY STRONGER: for $v_1=(3,4)$,
$v_2=(4,-3)$ in $\mathbb R^2$: $v_1\cdot v_2=12-12=0$ ✓ — an ORTHOGONAL basis. But $\|v_1\|=5\ne1$
— NOT orthonormal. Normalizing ($e_1=(3/5,4/5)$, $e_2=(4/5,-3/5)$, both unit length) converts it
to a genuine orthonormal basis WITHOUT changing any directions or the mutual-orthogonality
relationships. Treating "orthogonal" and "orthonormal" as synonymous misses that orthonormal
ADDITIONALLY requires unit length — a genuinely separate check.

THE ONB SHORTCUT $c_i=\langle v,e_i\rangle$ WORKS BECAUSE ORTHOGONALITY KILLS CROSS TERMS AND UNIT
LENGTH SIMPLIFIES THE REST: taking the inner product of $v=\sum c_iv_i$ with $e_j$: $\langle
v,e_j\rangle=\sum_ic_i\langle e_i,e_j\rangle$. Since $\langle e_i,e_j\rangle=0$ for $i\ne j$
(orthogonality) AND $\langle e_j,e_j\rangle=1$ (unit length), EVERY term vanishes except $i=j$,
leaving $\langle v,e_j\rangle=c_j$ DIRECTLY — no system-solving required. For $e_1=(3/5,4/5)$,
$e_2=(4/5,-3/5)$ and $v=(1,7)$: $c_1=\langle v,e_1\rangle=31/5$, $c_2=\langle v,e_2\rangle=-17/5$
— verified: $c_1e_1+c_2e_2=(1,7)$ exactly.

THE SHORTCUT FAILS SILENTLY FOR A NON-ORTHONORMAL BASIS — IT DEPENDS SPECIFICALLY ON ORTHONORMALITY,
NEVER A GENERAL BASIS PROPERTY: for the NON-orthogonal basis $u_1=(1,0)$, $u_2=(1,1)$ (verify:
$u_1\cdot u_2=1\ne0$): applying the shortcut anyway to $v=(1,7)$ gives $\langle v,u_1\rangle=1$,
$\langle v,u_2\rangle=8$ — but $1\cdot u_1+8\cdot u_2=(9,8)\ne(1,7)$ — the WRONG answer, silently
produced without any error. The actual system $v=c_1u_1+c_2u_2$ requires genuine solving
($c_1=-6,c_2=7$). The shortcut's validity depends ENTIRELY on the cross terms vanishing, which only
happens for a truly orthonormal basis — never a universal basis trick, and dangerously it doesn't
announce its own failure.

## Mental Models
- **"Orthogonal means the directions are perpendicular; orthonormal additionally requires each
  direction to be exactly length 1 — a genuinely separate, second check."**
- **"In an orthonormal basis, coordinates come for free — one inner product per coordinate, no
  system needed. That's the entire payoff of orthonormality."**
- **"The shortcut isn't a universal basis trick — it silently gives a wrong answer if the basis
  isn't actually orthonormal."**

## Why Students Fail

### MC-1: ONB-COORDINATE-SHORTCUT-OVERGENERALIZED
- **Surface form**: applies the direct inner-product coordinate formula $c_i=\langle v,e_i\rangle$
  to a basis that is not orthonormal, believing it works for any basis.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the formula's
  simplicity invites treating it as a universal basis shortcut rather than a specific consequence
  of orthonormality).
- **Repair**: re-walk Example 3's direct disproof, showing the shortcut's result fails to
  reconstruct $v$, then re-derive symbolically why orthogonality is required to kill the cross
  terms.

### MC-2: ORTHOGONAL-CONFLATED-WITH-ORTHONORMAL
- **Surface form**: treats "orthogonal basis" and "orthonormal basis" as synonymous, missing that
  orthonormal additionally requires unit length.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the terms sound close
  enough to conflate without explicit separate verification of each condition).
- **Repair**: re-check both conditions separately for a candidate set, confirming orthogonality
  alone doesn't guarantee unit length.

### MC-3: ORTHOGONAL-VECTORS-ASSUMED-AUTOMATICALLY-SPANNING
- **Surface form**: assumes any set of mutually orthogonal nonzero vectors automatically forms a
  basis of the full space, without checking the count matches the space's dimension.
- **Birth type**: Moderate severity (Blueprint's own declared severity — orthogonality's automatic-
  independence guarantee is over-extended to also guarantee spanning).
- **Repair**: re-anchor on "orthogonality guarantees independence for free, but you still need
  exactly $n$ vectors to span an $n$-dimensional space."

## Misconceptions

### MC-1: ONB-COORDINATE-SHORTCUT-OVERGENERALIZED
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: ORTHOGONAL-CONFLATED-WITH-ORTHONORMAL
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-3: ORTHOGONAL-VECTORS-ASSUMED-AUTOMATICALLY-SPANNING
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Orthonormal coordinates are like asking a perfectly calibrated, independent set of sensors
  'how much of you is in this signal?' — each sensor answers on its own, with zero interference
  from the others."**
- **Anti-analogy**: the shortcut formula is NOT a safe default to try first and check later — it
  silently returns a specific, wrong-looking-plausible number when the basis isn't orthonormal,
  never an error or warning.

## Demonstrations
- **Demonstration 1 (targets MC-2)**: the orthogonal-but-not-orthonormal verification and
  normalization for $v_1=(3,4)$, $v_2=(4,-3)$.
- **Demonstration 2 (targets MC-1's positive case)**: the direct inner-product coordinate
  computation for $v=(1,7)$ in the normalized ONB, verified by reconstruction.
- **Demonstration 3 (targets MC-1's failure case)**: the shortcut applied to the non-orthogonal
  basis $\{(1,0),(1,1)\}$, producing a demonstrably wrong reconstruction.

## Discovery Questions
1. "Does 'orthogonal basis' mean the same thing as 'orthonormal basis,' or is there an additional
   requirement?"
2. "Does the formula cᵢ=⟨v,eᵢ⟩ work for finding coordinates in any basis, or only special ones?"
3. "If you have n mutually orthogonal nonzero vectors in an n-dimensional space, do they
   automatically form a basis?"

## Teaching Sequence
1. **Contrast pair**: orthogonal versus orthonormal, verified and normalized, working
   Demonstration 1, isolating MC-2.
2. **Representation shift**: the ONB coordinate shortcut derived symbolically and verified
   numerically, working Demonstration 2.
3. **Conflict evidence**: the shortcut's failure on a non-orthonormal basis, working
   Demonstration 3, isolating MC-1.
4. **Mastery gate**: require a correct orthogonal/orthonormal verification and normalization, a
   correct ONB coordinate computation, and a correct explanation of why the shortcut requires
   orthonormality specifically, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept "orthogonal" and "orthonormal" used interchangeably without checking unit length
  separately.
- Never accept the coordinate shortcut $c_i=\langle v,e_i\rangle$ applied without first verifying
  the basis is genuinely orthonormal.
- Never accept a set of mutually orthogonal vectors declared a basis without checking the count
  matches the space's dimension.

## Voice Teaching Notes
- Say "is this just orthogonal, or is it also normalized to unit length?" whenever an orthonormal
  basis is claimed.
- Ask "have you verified this basis is actually orthonormal before using the shortcut?" whenever
  the direct inner-product coordinate formula is applied.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly distinguishes orthogonal from orthonormal for a
  given set of vectors.
- **Rung 2 (application)**: learner correctly computes coordinates in a genuine orthonormal basis
  via the direct inner-product shortcut.
- **Rung 3 (transfer)**: learner correctly identifies when the shortcut is NOT applicable (a
  non-orthonormal basis) and explains why it silently produces a wrong answer there.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the shortcut's failure on the non-orthogonal basis example.
- If MC-2 recurs, re-check orthogonality and unit length as two separate conditions.
- If MC-3 recurs, re-anchor on the vector-count-must-match-dimension requirement.

## Memory Hooks
- "Orthonormal is orthogonal PLUS unit length — always check both separately."
- "The shortcut gives coordinates for free — but only in a genuinely orthonormal basis."
- "Orthogonality gives independence for free, but you still need enough vectors to span."

## Transfer Connections
- `math.linalg.orthogonality` (already authored, certified domain): supplies the dot-product-zero
  definition and automatic-independence property this concept's basis structure directly relies
  on.
- `math.linalg.basis` (already authored, this campaign, Batch 170): supplies the independent-and-
  spanning definition and uniqueness-of-coordinates property this concept specializes to the
  orthonormal case.
- `math.linalg.gram-schmidt`, `math.linalg.projection` (KG's declared unlocks): the constructive
  algorithm for building an orthonormal basis and the subspace-projection technique this concept's
  coordinate structure directly enables.

## Cross-Subject Connections
- Signal processing: decomposing an audio or image signal into an orthonormal basis of "basis
  waveforms," where each coordinate is computed via a simple inner product rather than solving a
  large system — essential for real-time processing at scale.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.orthogonal-basis.md`, reused by
  reference for its orthogonal-versus-orthonormal verification/normalization example, its full
  ONB coordinate-shortcut derivation and numeric verification, its non-orthogonal-basis failure
  demonstration, and its three-misconception registry (severity levels adopted directly as
  declared).
- Transfer probe: the Blueprint's own independence-mode probe, applying the ONB coordinate
  shortcut to a signal-processing basis-waveform decomposition scenario.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.linalg.orthogonality`/`math.linalg.basis`, unlocks
  `math.linalg.gram-schmidt`/`math.linalg.projection`, cross_links none, proficient/apply,
  mastery_threshold 0.9, estimated_hours 3) was directly verified against the live KG and matches
  exactly. `math.linalg.orthogonality` independently re-confirmed authored. The Blueprint's own
  noted description-field anomaly (a stray matrix-transpose-identity fragment from an apparently
  unrelated KG entry) is no longer present in the live KG's current description text — resolved
  independently of this campaign.

## Version History
- 2026-09-19 (Batch 173): authored. Second entry this batch. Companion batch concept:
  `math.linalg.inner-product-space`.
