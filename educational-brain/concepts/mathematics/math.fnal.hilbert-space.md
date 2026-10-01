# math.fnal.hilbert-space

## Identity
- **KG id**: `math.fnal.hilbert-space`
- **Domain**: math.fnal
- **Requires**: `math.linalg.inner-product-space`, `math.fnal.banach-space`
- **Unlocks**: `math.fnal.spectral-theory`, `math.fnal.riesz-representation`
- **Cross-links**: `math.meas.l2-space`, `math.linalg.inner-product`
- **Difficulty**: expert
- **Bloom level**: understand
- **Mastery threshold**: 0.85
- **Estimated hours**: 6

## Learning Objective
Define a Hilbert space as exactly a complete inner product space — NEVER a new independent idea
beyond combining two already-known concepts; state the Projection Theorem's EXISTENCE AND
UNIQUENESS of a nearest point — NEVER recall existence alone; and recognize every Hilbert space is
Banach but NOT conversely — NEVER treat "Hilbert" and "Banach" as interchangeable labels.

## Core Understanding
"HILBERT SPACE" ADDS NOTHING BEYOND COMBINING INNER-PRODUCT-SPACE AND COMPLETENESS — NEVER A NEW
INDEPENDENT IDEA: $\mathbb{R}^n$ with the dot product $\langle u,v\rangle=\sum u_iv_i$ is an inner
product space, inducing the Euclidean norm; since $(\mathbb{R}^n,\|\cdot\|_2)$ is already known to
be complete, $\mathbb{R}^n$ with the dot product IS a Hilbert space — no additional argument beyond
citing the two already-established facts, exactly paralleling how `math.fnal.banach-space`
combined normed-space-ness with completeness.

THE PROJECTION THEOREM GUARANTEES EXISTENCE **AND** UNIQUENESS OF THE NEAREST POINT — NEVER
EXISTENCE ALONE: for the $xy$-plane $C$ (closed convex) inside $\mathbb{R}^3$ and $v=(1,2,5)$: the
nearest point of $C$ to $v$ is $(1,2,0)$ (dropping a perpendicular), and it is the UNIQUE closest
point — no other point of the plane is as close. Recalling only that a nearest point EXISTS,
without recognizing uniqueness is equally essential, is WRONG — without uniqueness, "the
projection" would be ambiguous, a set of equally-close candidates rather than a single well-defined
point, making the theorem far less useful.

EVERY HILBERT SPACE IS BANACH, BUT NOT CONVERSELY — NEVER TREAT THE TWO LABELS AS INTERCHANGEABLE:
$\mathbb{R}^n$ with the dot product is Hilbert, hence automatically Banach (its induced norm makes
it complete). But $(C([0,1]),\|\cdot\|_\infty)$ (sup-norm) is a genuine Banach space (complete)
with NO inner product whose induced norm equals $\|\cdot\|_\infty$ — provable via the
parallelogram law $\|f+g\|^2+\|f-g\|^2=2\|f\|^2+2\|g\|^2$, which specific continuous functions can
be chosen to violate under the sup-norm. Assuming "Hilbert space" and "Banach space" are just two
names for the same class is WRONG — Hilbert is the strictly SMALLER subclass whose norm
specifically arises from an inner product.

## Mental Models
- **"You already know inner product space, and you already know completeness. Hilbert space is
  just: both at once — exactly like Banach space combined normed-ness with completeness."**
- **"The Projection Theorem's guarantee is existence AND uniqueness — drop the perpendicular, and
  there's exactly one landing point, never a set of tied candidates."**
- **"Hilbert implies Banach automatically — but Banach never implies Hilbert; the sup-norm on
  C([0,1]) proves a norm can be complete without ever coming from an inner product."**

## Why Students Fail

### MC-1: HILBERT-AND-BANACH-TREATED-AS-SYNONYMOUS
- **Surface form**: assumes "Hilbert space" and "Banach space" refer to the same class of spaces,
  rather than recognizing Hilbert as the strictly smaller subclass whose norm specifically arises
  from an inner product.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — both are
  "complete X" definitions and the extra inner-product-origin requirement is easy to miss).
- **Repair**: re-present the $C([0,1])$-with-sup-norm contrast, re-anchoring on "Hilbert requires
  the EXTRA inner-product-origin check, verified separately from mere completeness."

### MC-2: PROJECTION-THEOREM-UNIQUENESS-OVERLOOKED
- **Surface form**: recalls only that a nearest point EXISTS in the Projection Theorem, without
  recognizing uniqueness is an equally essential part of the guarantee.
- **Birth type**: overgeneralization (Blueprint's own declared moderate severity — "existence"
  results are more commonly emphasized than "uniqueness" results in introductory treatments).
- **Repair**: re-walk the plane-in-$\mathbb{R}^3$ example, emphasizing that ambiguous "closest
  point" candidates would make the theorem far less useful.

### MC-3: ALL-NORMS-ASSUMED-TO-ARISE-FROM-AN-INNER-PRODUCT
- **Surface form**: assumes any norm on a vector space can be written as $\sqrt{\langle
  v,v\rangle}$ for some inner product, rather than recognizing this as a special property some
  norms (like the sup-norm) provably lack.
- **Birth type**: overgeneralization (Blueprint's own declared foundational severity — the
  Euclidean norm's familiar inner-product origin is easily overgeneralized to all norms).
- **Repair**: re-present the parallelogram-law test as the concrete tool for checking whether a
  given norm can possibly arise from an inner product.

## Misconceptions

### MC-1: HILBERT-AND-BANACH-TREATED-AS-SYNONYMOUS
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-2: PROJECTION-THEOREM-UNIQUENESS-OVERLOOKED
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

### MC-3: ALL-NORMS-ASSUMED-TO-ARISE-FROM-AN-INNER-PRODUCT
- **Surface form**: as described above.
- **Root cause (overgeneralization)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A Hilbert space is a Banach space that's also secretly Euclidean — every angle and
  perpendicular still makes sense, even in infinite dimensions."**
- **Anti-analogy**: not every "size measure" (norm) on a space secretly comes from an inner
  product — the sup-norm is a perfectly legitimate distance measure that fails the
  parallelogram-law test, proving it has no hidden "angle" structure underneath.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the $(\mathbb{R}^n,\text{dot product})$ direct-combination
  Hilbert-space verification.
- **Demonstration 2 (targets MC-2)**: the plane-in-$\mathbb{R}^3$ Projection Theorem
  existence-and-uniqueness instance.
- **Demonstration 3 (targets MC-3)**: the $C([0,1])$-with-sup-norm Banach-but-not-Hilbert
  parallelogram-law contrast.

## Discovery Questions
1. "Are 'Hilbert space' and 'Banach space' just two different names for the same class of
   spaces?"
2. "Does the Projection Theorem guarantee only that a nearest point exists, or also that it's
   unique?"
3. "Can every norm be written as the square root of some inner product?"

## Teaching Sequence
1. **Representation shift**: work Example 1's direct combination-based Hilbert-space verification.
2. **Representation shift (second instance)**: work Example 2's Projection Theorem instance,
   isolating MC-2.
3. **Conflict evidence**: work Example 3's Hilbert-versus-Banach contrast, isolating MC-1 and MC-3.
4. **Mastery gate**: require a correct Hilbert-space definition using only already-defined terms,
   a correct statement of the Projection Theorem including uniqueness, and a correct explanation
   of why $(C([0,1]),\|\cdot\|_\infty)$ is Banach but not Hilbert, at the Blueprint's own stated
   MAMR of 5/5.

## Tutor Actions
- Never accept "Hilbert space" and "Banach space" treated as interchangeable labels.
- Never accept the Projection Theorem stated with existence but not uniqueness.
- Never accept a norm assumed to arise from an inner product without a parallelogram-law check.

## Voice Teaching Notes
- Say "is that space just Banach, or does it also have an inner product?" whenever "Hilbert" is
  invoked.
- Ask "is that nearest point just guaranteed to exist, or also guaranteed unique?" whenever the
  Projection Theorem is discussed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly states the Hilbert-space definition using only
  already-defined terms.
- **Rung 2 (application)**: learner correctly explains why $\mathbb{R}^n$ with the dot product is
  both Hilbert and Banach, citing the induced-norm implication.
- **Rung 3 (transfer)**: learner correctly explains why every finite-dimensional inner product
  space is automatically a Hilbert space, connecting to `math.linalg.inner-product`'s Cauchy-
  Schwarz inequality.

## Tutor Recovery Strategy
- If MC-1 recurs, re-present the $C([0,1])$-with-sup-norm contrast.
- If MC-2 recurs, re-walk the plane-in-$\mathbb{R}^3$ example, emphasizing uniqueness.
- If MC-3 recurs, re-present the parallelogram-law test.

## Memory Hooks
- "Hilbert = inner product space + complete — no new machinery, just a name for clearing both
  bars."
- "The Projection Theorem promises ONE nearest point — existence and uniqueness, always together."
- "Hilbert implies Banach, never the reverse — the sup-norm proves it."

## Transfer Connections
- `math.linalg.inner-product-space` (prerequisite, already authored): supplies the inner product
  and induced norm this concept adds completeness to.
- `math.fnal.banach-space` (prerequisite, already authored, this campaign): supplies the
  completeness property and the Hilbert-implies-Banach relationship this concept establishes.
- `math.linalg.inner-product` (already authored, cross-link): supplies the Cauchy-Schwarz
  inequality and induced-norm formula this concept's mastery-gate transfer probe directly reuses.

## Cross-Subject Connections
- Quantum mechanics: the state space of a quantum system is modeled as a (complex) Hilbert space,
  with the Projection Theorem's geometry underlying measurement postulates.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.fnal.hilbert-space.md`, reused by reference
  for its three worked examples (directly paralleling `math.fnal.banach-space`'s own examples per
  the Blueprint's stated design) and its three-misconception registry (birth types adopted
  directly as declared).
- Transfer probe: the Blueprint's own cross-link probe engaging `math.linalg.inner-product`,
  connecting the induced-norm formula and Cauchy-Schwarz inequality to the completeness
  requirement, and confirming all finite-dimensional inner product spaces are automatically
  Hilbert.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Reverse-direction discrepancy (cross-link target since authored)**: the Blueprint's Component 0
  and Component 7 state the cross-link `math.meas.l2-space` was "not yet authored" at write time,
  engaging only `math.linalg.inner-product` for its P76 probe (mixed cross-link status). The live
  EB corpus directory listing now shows `math.meas.l2-space.md` IS authored (this campaign has
  since progressed past that point). This is the campaign's 18th discrepancy overall and a
  reverse-direction case, noted for the record; the Blueprint's own single-cross-link-probe
  engagement (against `math.linalg.inner-product`) is retained as authored, consistent with
  established discipline of not retroactively rewriting a Blueprint's chosen probe mode.

## Version History
- 2026-09-19 (Batch 228): authored. First entry this batch. Companion batch concept:
  `math.fnal.dense-subspace`.
