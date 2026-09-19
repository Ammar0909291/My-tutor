# math.linalg.coordinates

## Identity
- **KG id**: `math.linalg.coordinates`
- **Domain**: math.linalg
- **Requires**: `math.linalg.basis`
- **Unlocks**: `math.linalg.change-of-basis` (Blueprint's own Component 0/7 stated "none in
  KG"/"none recorded" — the live KG's current value used as authoritative, see Curriculum
  Feedback)
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.85
- **Estimated hours**: 3

## Learning Objective
Find the coordinate vector $[v]_\beta=(c_1,\ldots,c_n)$ relative to an ORDERED basis $\beta$, where
$v=\sum c_ib_i$; recognize coordinates genuinely DEPEND on the chosen basis — the SAME vector has
DIFFERENT coordinate vectors in different bases (never treating standard coordinates as the only
"true" representation); and correctly reconstruct $v$ from $[v]_\beta$ by using the ACTUAL basis
vectors in the linear combination (never misreading the coordinate numbers as if they were
directly the vector's standard components).

## Core Understanding
COORDINATES GENUINELY DEPEND ON THE CHOSEN BASIS — NEVER A FIXED, "TRUE" PROPERTY OF THE VECTOR
ALONE: for $v=(5,3)$: relative to $\beta=\{(1,1),(1,-1)\}$: solving $5=c_1+c_2$, $3=c_1-c_2$ gives
$c_1=4$, $c_2=1$, so $[v]_\beta=(4,1)$ (verify: $4(1,1)+1(1,-1)=(5,3)$ ✓). Relative to the STANDARD
basis $\{(1,0),(0,1)\}$: coordinates are simply $(5,3)$. The SAME underlying vector has coordinate
vectors $(4,1)$ and $(5,3)$ — genuinely DIFFERENT numerical representations, with NEITHER more
"legitimate" than the other; the familiar "standard components" are just coordinates relative to
ONE particular (conventional) basis choice among many.

RECOVERING $v$ FROM $[v]_\beta$ REQUIRES THE ACTUAL BASIS VECTORS — NEVER READING THE COORDINATE
NUMBERS DIRECTLY AS STANDARD COMPONENTS: given $[v]_\beta=(2,3)$ relative to $\beta=\{(2,0),(0,3)\}$
(a non-standard basis): $v=2(2,0)+3(0,3)=(4,0)+(0,9)=(4,9)$ — NOT $(2,3)$. Misreading the
coordinate vector's numbers as if they WERE the vector's standard components directly (treating
$(2,3)$ itself as $v$) skips the essential step of substituting into $v=c_1b_1+c_2b_2$ using the
SPECIFIC basis vectors — the coordinate vector's meaning is ENTIRELY tied to which basis produced
it, and recovering the actual vector always requires that specific linear combination.

## Mental Models
- **"Coordinates are a translation relative to a specific basis — the same vector reads
  differently in different bases, and neither reading is more correct than the other."**
- **"To go from coordinates back to the actual vector, you must plug the coordinate numbers into
  the ACTUAL basis vectors — never read them as standard components directly."**

## Why Students Fail

### MC-1: STANDARD-COORDINATES-TREATED-AS-THE-ONLY-TRUE-REPRESENTATION
- **Surface form**: treats a vector's standard-basis coordinates as its only legitimate
  representation, viewing other bases' coordinate vectors as less valid.
- **Birth type**: Moderate severity (Blueprint's own declared severity — the standard basis's
  familiarity and ubiquity creates a bias toward treating it as somehow more "real" than other
  equally valid choices).
- **Repair**: re-verify BOTH coordinate vectors reconstruct the exact same vector via their
  respective linear combinations, confirming both are equally valid.

### MC-2: NON-STANDARD-COORDINATE-VECTOR-MISREAD-AS-STANDARD-COMPONENTS
- **Surface form**: reads a coordinate vector relative to a non-standard basis as if its numbers
  were directly the vector's standard components.
- **Birth type**: Foundational severity (Blueprint's own declared severity — ranked more severe
  than MC-1 because it produces an outright WRONG vector via a genuine computational error, not
  merely a conceptual bias).
- **Repair**: re-derive $v$ explicitly by substituting into $v=c_1b_1+c_2b_2$ using the actual
  basis vectors, showing the result differs from the coordinate numbers themselves.

## Misconceptions

### MC-1: STANDARD-COORDINATES-TREATED-AS-THE-ONLY-TRUE-REPRESENTATION
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

### MC-2: NON-STANDARD-COORDINATE-VECTOR-MISREAD-AS-STANDARD-COMPONENTS
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A coordinate vector is like an address in a specific city's grid — the same building has a
  different address under a different grid layout, and neither address is more real than the
  other."**
- **Anti-analogy**: coordinate numbers are NOT the vector itself — they're weights to apply to a
  SPECIFIC set of basis vectors, and reading them as raw components skips that essential
  translation step.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the direct side-by-side computation of $v=(5,3)$'s
  coordinates in the standard basis versus $\{(1,1),(1,-1)\}$, both verified to reconstruct $v$
  correctly.
- **Demonstration 2 (targets MC-2)**: the $[v]_\beta=(2,3)$ reconstruction for $\beta=\{(2,0),
  (0,3)\}$, showing the actual vector is $(4,9)$, not $(2,3)$.

## Discovery Questions
1. "Is a vector's standard-basis representation its only 'true' set of coordinates, or is it just
   one equally valid choice among many?"
2. "If you're given a coordinate vector relative to a non-standard basis, are those numbers
   directly the vector's standard components, or do you need to compute something first?"

## Teaching Sequence
1. **Conceptual shift**: solving for the combination coefficients that define a coordinate vector,
   verified by reconstruction.
2. **Contrast pair**: the same vector's differing coordinates in two different bases, working
   Demonstration 1, isolating MC-1.
3. **Contrast pair (second pairing)**: the coordinate-vector-to-actual-vector reconstruction,
   working Demonstration 2, isolating MC-2.
4. **Mastery gate**: require a correct coordinate-vector computation relative to a given basis, a
   correct reconstruction of a vector from its coordinates relative to a non-standard basis, and a
   correct explanation of why coordinates depend on the chosen basis, at the Blueprint's own
   stated MAMR of 5/5.

## Tutor Actions
- Never accept a vector's standard-basis coordinates treated as more "true" than its coordinates
  relative to another valid basis.
- Never accept a coordinate vector's numbers read directly as the vector's standard components
  without performing the actual linear combination.

## Voice Teaching Notes
- Say "is this the vector's only true representation, or just its coordinates in one particular
  basis?" whenever standard coordinates are discussed.
- Ask "have you actually computed the linear combination, or are you reading the coordinate
  numbers as if they were the vector itself?" whenever a vector is reconstructed from coordinates.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes a coordinate vector relative to a given
  basis by solving the appropriate linear system.
- **Rung 2 (application)**: learner correctly recognizes the same vector has different coordinate
  vectors in different bases, treating neither as more legitimate.
- **Rung 3 (transfer)**: learner correctly reconstructs a vector from its coordinates relative to a
  non-standard basis, and explains why a computed coordinate vector doesn't directly represent
  standard-space position without a conversion step.

## Tutor Recovery Strategy
- If MC-1 recurs, re-verify both coordinate vectors reconstruct the same underlying vector.
- If MC-2 recurs, re-derive the vector explicitly from its coordinates using the actual basis
  vectors.

## Memory Hooks
- "Coordinates are relative to a specific basis — the standard basis is just one convenient
  choice, never the only true one."
- "To recover the vector, plug coordinates into the actual basis vectors — never read them as
  standard components directly."

## Transfer Connections
- `math.linalg.basis` (already authored, this campaign, Batch 170): supplies the ordered set of
  vectors this concept's coordinate representation is defined relative to.
- `math.linalg.change-of-basis` (not yet authored, KG's declared unlock — corrected from the
  Blueprint's stale "none" claim, see Curriculum Feedback): the technique for converting between
  different bases' coordinate representations this concept's dual-basis computations directly
  motivate.

## Cross-Subject Connections
- Computer graphics/rendering: internal non-standard coordinate systems (e.g. scaled bases) used
  for efficiency, requiring an explicit conversion step to recover standard 3D positions.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.coordinates.md`, reused by reference
  for its $v=(5,3)$ dual-basis coordinate computation, its $[v]_\beta=(2,3)$ reconstruction
  example, and its two-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, applying coordinate computation and
  the standard-versus-non-standard distinction to a computer-graphics rendering-engine scenario.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Stale Blueprint metadata found and corrected**: the Blueprint's own Component 0 and Component 7
  both state `unlocks: none` — the live KG lists `math.linalg.change-of-basis` as this concept's
  unlock (and its own child in the KG's parent/children structure) — the live KG's current value
  used as authoritative here. `math.linalg.change-of-basis` independently re-verified still
  unauthored in the EDUCATIONAL-BRAIN corpus. All other fields (requires `math.linalg.basis`,
  cross_links none, proficient/apply, mastery_threshold 0.85, estimated_hours 3) matched the live
  KG exactly. This is the second consecutive `unlocks`-field stale-metadata discrepancy this batch
  (after `math.linalg.dimension` earlier this same batch) — both appear to stem from these two
  Blueprints' own authoring-time snapshots of the KG predating a later `math.linalg` unlocks
  addition.

## Version History
- 2026-09-19 (Batch 171): authored. Second entry this batch. Companion batch concept:
  `math.linalg.dimension`.
