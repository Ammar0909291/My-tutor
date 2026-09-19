# math.linalg.projection

## Identity
- **KG id**: `math.linalg.projection`
- **Domain**: math.linalg
- **Requires**: `math.linalg.orthogonality`, `math.linalg.inner-product`
- **Unlocks**: `math.linalg.least-squares`
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.9
- **Estimated hours**: 4

## Learning Objective
Define $\text{proj}_W(v)$ as the CLOSEST point in $W$ to $v$, characterized by the residual
$v-\text{proj}_W(v)$ being ORTHOGONAL to every vector in $W$; compute the single-vector projection
$\text{proj}_u(v)=\frac{v\cdot u}{u\cdot u}u$, recognizing the result is a scaled copy of $u$
(NEVER $v$); and compute the subspace projection via an orthonormal basis
$\text{proj}_W(v)=\sum_i\langle v,e_i\rangle e_i$, recognizing this sum requires the basis to be
ORTHOGONAL (never valid for a general, non-orthogonal spanning set).

## Core Understanding
THE PROJECTION IS DEFINED BY ITS RESIDUAL BEING ORTHOGONAL TO $W$ — THE ENTIRE CHARACTERIZATION:
for $W=\text{span}((1,0,0))$ and $v=(3,4,5)$: $\text{proj}_W(v)=(3,0,0)$. The residual
$v-\text{proj}_W(v)=(0,4,5)$ — checking $(0,4,5)\cdot(1,0,0)=0$ ✓, confirming the residual is
orthogonal to every vector in $W$. This orthogonality is not an incidental property to verify
afterward — it IS the defining characterization of "closest point," and any correctly computed
projection must satisfy it.

THE SINGLE-VECTOR PROJECTION LANDS ALONG $u$'S DIRECTION — NEVER $v$'S: $\text{proj}_u(v)=
\frac{v\cdot u}{u\cdot u}u$ for $u=(1,1)$, $v=(4,0)$: $\frac{4}{2}(1,1)=(2,2)$ — a scalar multiple
of $u$ (specifically $2u$), lying ON the line through $u$. Mistakenly multiplying the scalar by $v$
instead gives $\frac{4}{2}(4,0)=(8,0)$ — a point along $v$'s OWN direction, which CANNOT be correct
since the projection must land IN $W=\text{span}(u)$, and $(8,0)$ is not even a multiple of
$(1,1)$. The scalar $\frac{v\cdot u}{u\cdot u}$ tells you HOW FAR along $u$ to go — the final
multiplication must always use $u$, never $v$.

THE SUM-OF-PROJECTIONS FORMULA REQUIRES ORTHOGONALITY — NEVER VALID FOR A GENERAL SPANNING SET:
for $W=\text{span}(e_1,e_2)$ with $e_1=(1,0,0)$, $e_2=(0,1,0)$ (orthonormal) and $v=(3,4,5)$:
$\text{proj}_W(v)=\langle v,e_1\rangle e_1+\langle v,e_2\rangle e_2=(3,4,0)$ — matching the
geometrically obvious result. This sum works BECAUSE $e_1,e_2$ are mutually orthogonal; using a
NON-orthogonal spanning set for the SAME plane (e.g. $(1,0,0)$ and $(1,1,0)$) and naively summing
individual projections would NOT give the correct joint projection — the individual projections
would "interfere," since non-orthogonal directions aren't independent in the sense the sum formula
requires.

## Mental Models
- **"The projection is the closest point — and the leftover after subtracting it points straight
  away from the subspace. That's the whole definition."**
- **"The projection lands where u is, not where v is — the scalar tells you how far, u tells you
  which direction."**
- **"Summing individual projections only works when the directions don't interfere with each
  other — that means orthogonal, never just any spanning set."**

## Why Students Fail

### MC-1: PROJECTION-FORMULA-FINAL-MULTIPLICATION-MISAPPLIED
- **Surface form**: multiplies the scalar $\frac{v\cdot u}{u\cdot u}$ by $v$ instead of $u$,
  producing a result that doesn't lie in the target subspace at all.
- **Birth type**: Foundational severity (Blueprint's own declared severity — with both $u$ and $v$
  appearing in the formula, it's easy to lose track of which one the final multiplication uses).
- **Repair**: re-walk the direct contrast between the correct multiple-of-$u$ result and the
  incorrect multiple-of-$v$ result, confirming only the former lies in $W$.

### MC-2: SUM-OF-PROJECTIONS-FORMULA-OVERGENERALIZED-TO-NON-ORTHOGONAL-BASES
- **Surface form**: applies the sum-of-individual-projections shortcut to a non-orthogonal
  spanning set, missing that orthogonality is required to prevent interference.
- **Birth type**: Foundational severity (Blueprint's own declared severity — the sum formula's
  simplicity invites over-generalizing it to any spanning set).
- **Repair**: re-anchor on the explicit orthogonality requirement, parallel to
  `math.linalg.orthogonal-basis`'s own coordinate-shortcut requirement.

### MC-3: RESIDUAL-ORTHOGONALITY-CHECK-SKIPPED
- **Surface form**: computes a projection without verifying that the residual is genuinely
  orthogonal to the subspace, treating the formula as a black box.
- **Birth type**: Moderate severity (Blueprint's own declared severity — once a formula "runs,"
  its output is trusted without the available orthogonality self-check).
- **Repair**: re-walk the explicit residual computation and dot-product check as an always-
  available verification.

## Misconceptions

### MC-1: PROJECTION-FORMULA-FINAL-MULTIPLICATION-MISAPPLIED
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: SUM-OF-PROJECTIONS-FORMULA-OVERGENERALIZED-TO-NON-ORTHOGONAL-BASES
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-3: RESIDUAL-ORTHOGONALITY-CHECK-SKIPPED
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"Projecting is dropping a perpendicular — the shadow always falls exactly where the
  perpendicular line hits, never anywhere else."**
- **Anti-analogy**: summing individual "shadows" onto separate directions is NOT always valid
  math — it only reconstructs the true joint shadow when those directions don't overlap or
  interfere, i.e. when they're orthogonal.

## Demonstrations
- **Demonstration 1 (targets MC-3)**: the direct residual-orthogonality verification for
  $W=\text{span}((1,0,0))$, $v=(3,4,5)$.
- **Demonstration 2 (targets MC-1)**: the correct-versus-incorrect final-multiplication contrast
  for $u=(1,1)$, $v=(4,0)$.
- **Demonstration 3 (targets MC-2)**: the orthonormal-basis sum-projection computation for the
  $xy$-plane, contrasted with the caveat about non-orthogonal spanning sets.

## Discovery Questions
1. "What property does the leftover (residual) after projecting have to satisfy, and why does
   that make the projection the closest point?"
2. "In the formula proj_u(v) = (v·u/u·u)u, could you multiply the scalar by v instead and still
   get a valid projection?"
3. "Would the sum-of-individual-projections formula still work if the subspace's basis vectors
   were not orthogonal to each other?"

## Teaching Sequence
1. **Representation shift**: the closest-point/orthogonal-residual definition, working
   Demonstration 1, isolating MC-3.
2. **Conflict evidence**: the correct-versus-incorrect final-multiplication contrast, working
   Demonstration 2, isolating MC-1.
3. **Contrast pair**: the sum formula's orthogonality requirement, working Demonstration 3,
   isolating MC-2.
4. **Mastery gate**: require a correct single-vector projection with residual verification, and a
   correct subspace projection via an orthonormal basis with the orthogonality caveat explained,
   at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a projection computed without the option to verify the residual is orthogonal to
  the subspace.
- Never accept the single-vector projection formula's final multiplication applied to $v$ instead
  of $u$.
- Never accept the sum-of-projections formula applied to a non-orthogonal spanning set.

## Voice Teaching Notes
- Say "is the leftover orthogonal to the subspace — can you check?" whenever a projection is
  computed.
- Ask "does the final answer lie in the target subspace, or somewhere else?" whenever a
  single-vector projection is computed.

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly identifies the closest-point/orthogonal-residual
  characterization of a projection.
- **Rung 2 (application)**: learner correctly computes a single-vector projection and verifies the
  residual's orthogonality.
- **Rung 3 (transfer)**: learner correctly computes a subspace projection via an orthonormal
  basis, and explains why a non-orthogonal basis would break the sum formula, in an applied
  data-compression context.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the correct-versus-incorrect final-multiplication contrast.
- If MC-2 recurs, re-anchor on the orthogonality requirement for the sum formula.
- If MC-3 recurs, re-walk the explicit residual-orthogonality check.

## Memory Hooks
- "The residual is always orthogonal to the subspace — that's the whole definition, and an
  always-available check."
- "The projection lands where u is, never where v is."
- "Summing projections only works for orthogonal directions — never just any spanning set."

## Transfer Connections
- `math.linalg.orthogonality` (already authored, certified domain): supplies the dot-product-zero
  test this concept's defining residual property directly uses.
- `math.linalg.inner-product` (already authored, certified domain): supplies the general inner
  product this concept's formulas are stated in terms of.
- `math.linalg.orthogonal-basis` (already authored, this campaign, Batch 173): supplies the
  coordinate-extraction shortcut ($\langle v,e_i\rangle$) this concept's sum-of-projections formula
  directly reuses, and the exact parallel orthogonality requirement.
- `math.linalg.least-squares` (not yet authored, KG's declared unlock): least-squares
  approximation, defined directly as finding the orthogonal projection onto a subspace of
  achievable outcomes.

## Cross-Subject Connections
- Data compression/signal processing: approximating a high-dimensional data vector by its
  projection onto a lower-dimensional subspace of "feature directions," with the residual
  representing information lost in compression.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.linalg.projection.md`, reused by reference
  for its residual-orthogonality verification, its single-vector-versus-subspace projection
  worked examples, and its three-misconception registry (severity levels adopted directly as
  declared).
- Transfer probe: the Blueprint's own independence-mode probe, applying subspace projection to a
  data-compression "feature direction" scenario.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.linalg.orthogonality`/`math.linalg.inner-product`, unlocks `math.linalg.least-squares`,
  cross_links none, proficient/apply, mastery_threshold 0.9, estimated_hours 4) was directly
  verified against the live KG and matches exactly.

## Version History
- 2026-09-19 (Batch 174): authored. Second entry this batch. Companion batch concept:
  `math.linalg.diagonalization`.
