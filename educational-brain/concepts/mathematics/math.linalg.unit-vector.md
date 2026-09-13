# math.linalg.unit-vector

## Identity
- **KG id**: `math.linalg.unit-vector`
- **Domain**: math.linalg
- **Requires**: `math.linalg.norm`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: developing
- **Bloom level**: apply
- **Mastery threshold**: 0.95
- **Estimated hours**: 1

## Learning Objective
Determine whether a vector is a unit vector by computing its norm and checking whether it equals
exactly 1, reusing `math.linalg.norm`'s own computation directly; NORMALIZE a nonzero vector $v$
into a unit vector $\hat v=v/\|v\|$ by dividing EVERY component by the same norm value; and
recognize the standard basis vectors $e_1,\ldots,e_n$ as the canonical unit vectors, each having a
single component equal to exactly 1 and all others 0.

## Core Understanding
A UNIT VECTOR has norm (length) exactly 1 — reusing `math.linalg.norm`'s own computation directly,
a vector qualifies only if $\|v\|=1$, checked by direct computation, never assumed. Any nonzero
vector $v$ can be converted into a unit vector pointing in the SAME direction by NORMALIZING:
$\hat v=v/\|v\|$ — dividing EVERY component of $v$ by its own norm $\|v\|$, applied uniformly
across the whole vector. This rescales length to exactly 1 while preserving direction entirely.

The STANDARD BASIS VECTORS $e_1=(1,0,\ldots,0)$, $e_2=(0,1,0,\ldots,0)$, etc., are the canonical
unit vectors in $\mathbb{R}^n$: each has a single component equal to exactly 1 (in a different
position) and all others 0, and each has norm exactly 1 by direct computation
($\sqrt{1^2+0^2+\cdots}=1$). A vector with a single nonzero entry that is NOT exactly 1 (e.g.
$(5,0,0)$) is not a standard basis vector — it is not even a unit vector at all, since its norm is
5, not 1.

## Mental Models
- **"Unit vector: check the norm equals exactly 1 — nothing less, nothing else."**
- **"Normalize by dividing EVERY component by the SAME norm — never just one piece of the
  vector."**
- **"Standard basis vectors need the nonzero entry to be exactly 1 — the zero pattern alone isn't
  enough."**

## Why Students Fail

### MC-1: NORMALIZATION-APPLIED-TO-ONLY-PART-OF-THE-VECTOR
- **Surface form**: divides only some components (or applies a different operation entirely, like
  subtracting the norm) rather than dividing EVERY component by the same norm value.
- **Birth type**: Type 1, overgeneralization (Blueprint's own declared FOUNDATIONAL severity). The
  goal ("make the vector have length 1") is understood, but without the explicit rule "divide
  every component by the SAME scalar," a partial or inconsistent operation can seem to accomplish
  the same visual effect while actually corrupting the direction.
- **Repair**: compute the norm first, then explicitly divide EACH component one at a time by that
  same norm value, verifying the result's norm equals exactly 1.

### MC-2: STANDARD-BASIS-VECTOR-IDENTIFIED-BY-ZERO-PATTERN-ALONE
- **Surface form**: assumes any vector with a single nonzero entry qualifies as a standard basis
  vector, without checking that the nonzero entry equals exactly 1.
- **Birth type**: Type 2, perceptual intuition (Blueprint's own declared FOUNDATIONAL severity). A
  vector like $(5,0,0)$ visually resembles $e_1=(1,0,0)$ in its zero pattern, and that surface
  resemblance is mistaken for the defining property, skipping the actual norm check.
- **Repair**: compute both vectors' norms explicitly, showing only $(1,0,0)$ has norm exactly 1,
  while $(5,0,0)$ has norm 5 and is not even a unit vector at all.

## Misconceptions

### MC-1: NORMALIZATION-APPLIED-TO-ONLY-PART-OF-THE-VECTOR
- **Surface form**: as described above.
- **Root cause (Type 1)**: as described above.
- **Repair**: as described above.

### MC-2: STANDARD-BASIS-VECTOR-IDENTIFIED-BY-ZERO-PATTERN-ALONE
- **Surface form**: as described above.
- **Root cause (Type 2)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Resizing a photo to a fixed width: every pixel dimension scales by the SAME factor, or the
  image distorts — normalizing a vector divides every component by the same norm, or the direction
  distorts."**
- **Anti-analogy**: a unit vector is NOT "any vector that looks simple" (like having a single
  nonzero entry) — the ONLY defining test is whether the norm equals exactly 1, computed directly,
  never inferred from appearance.

## Demonstrations
- **Demonstration 1 (targets neither MC directly, establishes LO1)**: verify $(0.6,0.8)$ is a unit
  vector by computing $\|v\|=\sqrt{0.36+0.64}=\sqrt1=1$.
- **Demonstration 2 (targets MC-1)**: normalize $(3,4)$ by computing $\|v\|=5$ and dividing BOTH
  components by 5, getting $(0.6,0.8)$, verified to have norm exactly 1.
- **Demonstration 3 (targets MC-2)**: compare $e_1=(1,0,0)$ (norm 1, genuine standard basis
  vector) against $(5,0,0)$ (norm 5, not a unit vector at all, despite the identical zero
  pattern).

## Discovery Questions
1. "If you divide only one component of a vector by its norm, does the resulting vector still
   point in the same direction?"
2. "Does a vector with a single nonzero entry automatically have norm 1, or does that depend on
   the entry's actual value?"
3. "What single test determines whether a vector is a unit vector?"

## Teaching Sequence
1. **Anchor**: connect to `math.linalg.norm`'s own computation, framing a unit vector as exactly
   the case where the norm evaluates to 1.
2. **Conflict evidence**: the partial-vs-full-component normalization contrast, breaking MC-1
   directly.
3. **Contrast pair**: $e_1=(1,0,0)$ against $(5,0,0)$, isolating MC-2 via direct norm computation.
4. **Mastery gate**: require a unit-vector check, a full normalization, and a standard-basis-vector
   judgment under transfer, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a normalized vector without the learner confirming its norm equals exactly 1 after
  normalization.
- When a single-nonzero-entry vector is proposed as a standard basis vector, require the learner
  to verify the nonzero entry equals exactly 1.

## Voice Teaching Notes
- Say "did you divide every component, or just some?" whenever normalization looks incomplete.
- When a zero-pattern match is claimed as a standard basis vector, ask "what's the actual value of
  the nonzero entry?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly determines whether a given vector is a unit vector
  by computing its norm.
- **Rung 2 (application)**: learner correctly normalizes a nonzero vector by dividing every
  component by the same norm value.
- **Rung 3 (transfer)**: learner correctly normalizes a vector in a novel context (e.g. a
  robotics direction-sensor scenario) and explains why normalization preserves directional
  information despite rescaling magnitude.

## Tutor Recovery Strategy
- If MC-1 recurs, re-derive the normalization for the specific vector in question, dividing each
  component explicitly one at a time.
- If MC-2 recurs, re-compute both vectors' norms explicitly for the specific pair in question.

## Memory Hooks
- "Unit vector: norm exactly 1, checked, never assumed."
- "Normalize: divide every component by the same norm."
- "Standard basis vectors need the entry to be exactly 1, not just nonzero."

## Transfer Connections
- `math.linalg.norm` (already authored, this campaign): supplies the exact computation whose
  value-equals-1 case this concept names and studies.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.unit-vector.md`, reused by reference
  for its norm-verification demonstration, its full-vs-partial normalization contrast, and its
  standard-basis-vector contrast pair, plus its two-misconception registry (birth types
  independently classified, since this Blueprint states severity but not birth type).
- Transfer probe cited by reference: the Blueprint's own independence-mode probe (a robotics
  direction-sensor scenario, normalizing a direction vector for a control system requiring unit
  vectors).

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires `norm`, unlocks none,
  cross_links none, developing/apply, mastery_threshold 0.95, estimated_hours 1) was directly
  verified against the live KG and matches exactly.

## Version History
- 2026-09-13 (Batch 75): authored. Unblocked by `math.linalg.norm` (Batch 74). Companion batch
  concepts: `math.calc.change-of-variables`, `math.linalg.eigenvalues`,
  `math.linalg.cross-product`. `math.linalg` moves toward **16/61** this batch.
