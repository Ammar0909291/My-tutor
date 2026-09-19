# math.linalg.dimension

## Identity
- **KG id**: `math.linalg.dimension`
- **Domain**: math.linalg
- **Requires**: `math.linalg.basis`
- **Unlocks**: `math.linalg.rank-nullity` (Blueprint's own Component 0/7 stated "none in KG"/"none
  recorded" — the live KG's current value used as authoritative, see Curriculum Feedback)
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.9
- **Estimated hours**: 3

## Learning Objective
State the dimension of $V$ as the number of vectors in ANY basis, computing $\dim(\mathbb R^n)=n$;
state the NON-OBVIOUS theorem that ALL bases of a given space have the SAME cardinality (never
assuming different bases could have different sizes); and apply the orthogonal-complement formula
$\dim(U)+\dim(U^\perp)=\dim(V)$ — the two dimensions SUM to the total (never assumed to be EQUAL to
each other).

## Core Understanding
EVERY BASIS OF THE SAME SPACE HAS THE IDENTICAL SIZE — NEVER VARYING BY WHICH BASIS IS CHOSEN: for
$\mathbb R^2$: the standard basis $\{(1,0),(0,1)\}$ has 2 vectors. The structurally DIFFERENT basis
$\{(1,1),(1,-1)\}$ (verified independent and spanning) ALSO has exactly 2 vectors — never more or
fewer. This is a NON-OBVIOUS but foundational theorem: different-looking bases could, in
principle, have different sizes, EXCEPT that they provably never do — dimension is therefore a
well-defined property of the SPACE ITSELF, never dependent on which particular basis happens to be
examined.

ORTHOGONAL-COMPLEMENT DIMENSIONS SUM TO THE TOTAL — NEVER REQUIRED TO BE EQUAL: in $\mathbb R^3$
($\dim=3$): a 2-dimensional plane $U$ through the origin has orthogonal complement $U^\perp$ (a
line perpendicular to it, dimension 1). Check: $\dim(U)+\dim(U^\perp)=2+1=3=\dim(\mathbb R^3)$ ✓ —
the dimensions SUM to the ambient dimension. Assuming $U$ and $U^\perp$ must be EQUAL (e.g.
expecting both to be "half" the ambient dimension) is wrong: a 2D plane's complement in 3D space is
a 1D line, genuinely UNEQUAL to $U$'s own dimension, yet the two still sum correctly to 3.

## Mental Models
- **"Dimension belongs to the space, not to any particular basis — count any valid basis's
  vectors, and you'll always get the same number."**
- **"A subspace and its orthogonal complement's dimensions add up to the whole — they don't have
  to match each other."**

## Why Students Fail

### MC-1: DIFFERENT-BASES-ASSUMED-TO-HAVE-DIFFERENT-SIZES
- **Surface form**: believes different valid bases of the same vector space could have different
  numbers of vectors, rather than recognizing dimension as basis-independent.
- **Birth type**: Foundational severity (Blueprint's own declared severity — this undermines the
  very definition of dimension as a meaningful, well-defined quantity; without this theorem,
  "the dimension of V" would be an ill-posed question).
- **Repair**: re-verify both bases of $\mathbb R^2$ explicitly, confirming both genuinely contain
  exactly 2 vectors.

### MC-2: ORTHOGONAL-COMPLEMENT-DIMENSIONS-ASSUMED-EQUAL
- **Surface form**: believes a subspace and its orthogonal complement must have equal dimensions,
  rather than their dimensions simply summing to the ambient space's dimension.
- **Birth type**: Foundational severity (Blueprint's own declared severity — "complement" suggests
  a symmetric, equal-split relationship by analogy with everyday usage, obscuring the actual
  additive formula).
- **Repair**: re-derive using the geometric plane/line picture in $\mathbb R^3$, confirming the
  dimensions sum to 3, not split evenly.

## Misconceptions

### MC-1: DIFFERENT-BASES-ASSUMED-TO-HAVE-DIFFERENT-SIZES
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: ORTHOGONAL-COMPLEMENT-DIMENSIONS-ASSUMED-EQUAL
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Dimension is like a room's capacity — no matter how you arrange the furniture (which basis
  you pick), the room holds the same number of people."**
- **Anti-analogy**: a subspace's complement is NOT its "other half" in the sense of equal size —
  it's whatever dimension is needed to make the two dimensions add up to the total.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the direct vector-count verification for two structurally
  different bases of $\mathbb R^2$, both confirmed to have exactly 2 vectors.
- **Demonstration 2 (targets MC-2)**: the plane/line orthogonal-complement dimension check in
  $\mathbb R^3$, confirming $2+1=3$ rather than an equal split.

## Discovery Questions
1. "Could two different, equally valid bases of the same vector space have different numbers of
   vectors, or must they always match?"
2. "Must a subspace and its orthogonal complement have equal dimensions, or do their dimensions
   just need to sum to the ambient space's dimension?"

## Teaching Sequence
1. **Conceptual shift**: dimension as the basis's vector count, contrasting a full space against a
   smaller subspace's own smaller basis.
2. **Contrast pair**: verifying two structurally different bases of the same space both have the
   identical vector count, working Demonstration 1, isolating MC-1.
3. **Contrast pair (second pairing)**: the orthogonal-complement dimension-sum formula, working
   Demonstration 2, isolating MC-2.
4. **Mastery gate**: require a correct basic dimension computation, verification that two given
   bases of the same space have matching sizes, and a correct orthogonal-complement dimension
   computation, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a claim that two different, equally valid bases of the same space could have
  different vector counts.
- Never accept a subspace and its orthogonal complement assumed to have equal dimensions without
  verifying the sum formula.

## Voice Teaching Notes
- Say "does this belong to the specific basis, or to the space itself?" whenever dimension is
  discussed.
- Ask "do these dimensions need to be equal, or just add up to the total?" whenever an orthogonal
  complement's dimension is computed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes $\dim(\mathbb R^n)$ and a subspace's
  dimension from a given basis.
- **Rung 2 (application)**: learner correctly verifies two structurally different bases of the
  same space have matching vector counts.
- **Rung 3 (transfer)**: learner correctly applies the orthogonal-complement dimension formula and
  explains why basis-independence matters for dimensionality-reduction applications.

## Tutor Recovery Strategy
- If MC-1 recurs, re-verify both bases of $\mathbb R^2$ explicitly.
- If MC-2 recurs, re-derive the plane/line orthogonal-complement dimension check.

## Memory Hooks
- "Dimension belongs to the space, never to any particular basis — every valid basis gives the
  same count."
- "Complement dimensions sum to the total — they don't have to match each other."

## Transfer Connections
- `math.linalg.basis` (already authored, this campaign, Batch 170): supplies the linearly
  independent, spanning-set framework whose vector count this concept defines as dimension.
- `math.linalg.rank-nullity` (not yet authored, KG's declared unlock — corrected from the
  Blueprint's stale "none" claim, see Curriculum Feedback): the related dimension-counting theorem
  for linear transformations this concept's basis-size framework directly extends.

## Cross-Subject Connections
- Data science/machine learning: dimensionality reduction, where a high-dimensional ambient space
  (e.g. pixel space) contains meaningful data confined to a much lower-dimensional subspace, with
  basis-independence guaranteeing any valid reduced basis captures the same amount of information.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.dimension.md`, reused by reference for
  its two-different-bases-same-size verification, its plane/line orthogonal-complement dimension
  check, and its two-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, applying the orthogonal-complement
  formula and basis-independence theorem to a high-dimensional image-compression scenario.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Stale Blueprint metadata found and corrected**: the Blueprint's own Component 0 and Component 7
  both state `unlocks: none` — the live KG lists `math.linalg.rank-nullity` as this concept's
  unlock — the live KG's current value used as authoritative here. `math.linalg.rank-nullity`
  independently re-verified still unauthored in the EDUCATIONAL-BRAIN corpus. All other fields
  (requires `math.linalg.basis`, cross_links none, proficient/understand, mastery_threshold 0.9,
  estimated_hours 3) matched the live KG exactly.

## Version History
- 2026-09-19 (Batch 171): authored. First entry this batch. Companion batch concept:
  `math.linalg.coordinates`.
