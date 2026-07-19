# Teaching Blueprint: Hilbert Space (`math.fnal.hilbert-space`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.fnal.hilbert-space` |
| name | Hilbert Space |
| domain | Functional Analysis |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 6 |
| requires | `math.linalg.inner-product-space`, `math.fnal.banach-space` |
| unlocks | `math.fnal.spectral-theory`, `math.fnal.riesz-representation` |
| cross_links | `math.linalg.inner-product` (**authored**), `math.meas.l2-space` (unauthored) — mixed status, see Component 7 |
| CPA_entry_stage | A (Abstract) — a direct combination of two already-known concepts, exactly parallel to `math.fnal.banach-space`'s own entry-stage justification |
| description (KG) | A complete inner product space. Projection theorem: every closed convex subset has a unique nearest point. Riesz representation: every continuous linear functional is ⟨·,y⟩ for some y. Orthonormal bases exist (Gram-Schmidt / Zorn). |

## Component 1 — Learning Objectives

- LO1: Define a **Hilbert space** as exactly a **complete inner product space** — an inner product space $(V,\langle\cdot,\cdot\rangle)$ that is complete with respect to the norm $\|v\|=\sqrt{\langle v,v\rangle}$ the inner product induces — recognizing this as a direct combination of `math.linalg.inner-product-space` and completeness, exactly parallel to how `math.fnal.banach-space` combined normed-space-ness with completeness.
- LO2: State the **Projection Theorem** (every closed convex subset of a Hilbert space has a unique nearest point to any given vector) at an orientation level, and recognize its role as the geometric heart of Hilbert space theory — the reason "angle" and "distance" reasoning from ordinary Euclidean geometry extends validly to infinite dimensions.
- LO3: Recognize that **every Hilbert space is a Banach space** (since an inner product always induces a norm, and completeness carries over directly), but that the converse is **false** — not every Banach space's norm comes from an inner product — directly refuting the misconception that "Hilbert space" and "Banach space" are interchangeable labels for the same class of spaces.

## Component 2 — Prerequisite Check

Assumes mastery of `math.linalg.inner-product-space` (a vector space equipped with an inner product $\langle\cdot,\cdot\rangle$, the Cauchy-Schwarz inequality, and the induced norm $\|v\|=\sqrt{\langle v,v\rangle}$) and `math.fnal.banach-space` (a complete normed vector space, and why completeness is load-bearing for functional analysis).

## Component 3 — Core Explanation

**Definition, by direct combination**: a **Hilbert space** is an inner product space $(V,\langle\cdot,\cdot\rangle)$ that is **complete** with respect to the norm the inner product induces. Exactly as `math.fnal.banach-space` combined "normed space" with "complete" to define Banach space, this concept combines "inner product space" (already known) with "complete" (already known) — no new machinery beyond verifying the completeness property for the induced norm.

**The Projection Theorem (orientation level)**: in ordinary $\mathbb{R}^2$ or $\mathbb{R}^3$, the nearest point on a line or plane to a given point is found by dropping a perpendicular — and that nearest point is always unique. The Projection Theorem generalizes this exact geometric fact to any Hilbert space: for any **closed convex** subset $C$ of a Hilbert space $H$ and any point $v\in H$, there is a **unique** point in $C$ closest to $v$. This theorem is the single fact that lets "nearest point," "perpendicular," and "angle" reasoning — geometric intuitions built in 2 or 3 dimensions — extend rigorously to infinite-dimensional settings (e.g. spaces of functions), which is precisely why Hilbert spaces, among all Banach spaces, are singled out as the ones where the richest geometric intuition survives.

**Hilbert $\Rightarrow$ Banach, but not conversely**: every inner product induces a norm ($\|v\|=\sqrt{\langle v,v\rangle}$, verified in `math.linalg.inner-product-space`), so a complete inner product space is automatically a complete normed space — every Hilbert space **is** a Banach space. But the reverse direction fails: a norm on a general Banach space need not arise from any inner product at all. The sup-norm on $C([a,b])$ (from `math.fnal.completeness`'s and `math.fnal.banach-space`'s own examples) is a genuine Banach-space norm that does **not** come from an inner product — there is no $\langle\cdot,\cdot\rangle$ whose induced norm matches it. This makes Hilbert spaces a genuinely **smaller**, stricter class than Banach spaces.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying the definition by direct combination)**: $\mathbb{R}^n$ with the standard dot product $\langle u,v\rangle = \sum u_iv_i$ is an inner product space (`math.linalg.inner-product-space`), inducing the familiar Euclidean norm. Since $(\mathbb{R}^n,\|\cdot\|_2)$ is already known to be complete (`math.fnal.completeness`'s Example 1), $\mathbb{R}^n$ with the dot product **is** a Hilbert space — no additional argument needed beyond combining the two already-established facts, exactly paralleling `math.fnal.banach-space`'s Example 1.

**Example 2 (LO2 — the Projection Theorem, orientation level, concrete instance)**: Let $C$ be the $xy$-plane (a closed convex subset — in fact a subspace) inside $\mathbb{R}^3$, and let $v=(1,2,5)$. The nearest point of $C$ to $v$ is $(1,2,0)$ (dropping straight down, i.e. the orthogonal projection onto the plane), and it is the **unique** closest point — no other point of the plane is as close. This is the Projection Theorem's simplest possible instance; the theorem's real content is that this same guarantee (existence AND uniqueness of a nearest point) holds for closed convex sets in **any** Hilbert space, even infinite-dimensional ones where "dropping a perpendicular" is no longer visualizable directly.

**Example 3 (LO3 — Hilbert implies Banach, but not conversely, breaking MC-1)**: $\mathbb{R}^n$ with the dot product (Example 1) is Hilbert, and therefore automatically Banach (its induced norm makes it complete, per the direct implication). Now consider $C([0,1])$ with the **sup-norm** $\|f\|_\infty=\sup_{x\in[0,1]}|f(x)|$ — this is a genuine Banach space (complete under the sup-norm, unlike the $L^1$-norm case from `math.fnal.completeness`'s counterexample). But there is **no inner product** on $C([0,1])$ whose induced norm equals $\|\cdot\|_\infty$ (this can be shown via the parallelogram law: $\|f+g\|^2+\|f-g\|^2 = 2\|f\|^2+2\|g\|^2$ must hold for any inner-product-induced norm, and specific continuous functions can be chosen for which the sup-norm provably fails this identity). So $(C([0,1]),\|\cdot\|_\infty)$ is Banach but **not** Hilbert — proving the two classes are genuinely different, with Hilbert spaces forming a strictly smaller family.

## Component 5 — Teaching Actions

### Teaching Action A01 — Hilbert Space as a Direct Combination (Primitive P11: Representation Shift)

State plainly: "you already know what an inner product space is, and you already know what completeness means — a Hilbert space is just: both at once, exactly like Banach space combined normed-space-ness with completeness." Work Example 1, showing the "proof" is simply citing two already-established facts together.

### Teaching Action A02 — The Projection Theorem as Geometric Intuition, Rigorously Extended (Primitive P11: Representation Shift)

Draw the familiar "drop a perpendicular to the plane" picture from Example 2, then state: "this exact picture — a unique nearest point via a perpendicular drop — is what the Projection Theorem guarantees in ANY Hilbert space, even ones built from functions instead of arrows in space. This is the reason Hilbert spaces are considered the 'best-behaved,' most geometrically intuitive class of infinite-dimensional spaces."

### Teaching Action A03 — Hilbert Is Strictly Smaller Than Banach (Primitive P28: Conflict Evidence)

Present Example 3's direct conflict: $\mathbb{R}^n$ (Hilbert, hence Banach) versus $(C([0,1]),\|\cdot\|_\infty)$ (Banach, provably NOT Hilbert, via the parallelogram-law test). State: "every Hilbert space is automatically Banach — but the sup-norm example shows a norm can make a space complete (Banach) without that norm ever having come from an inner product. Hilbert is the stricter, smaller category."

- **MC-1 hook**: ask "are 'Hilbert space' and 'Banach space' just two different names for the same class of spaces?" — a "yes" answer reveals MC-1 (assuming the two terms are interchangeable, rather than recognizing Hilbert as the strictly smaller subclass whose norm specifically comes from an inner product).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State the definition of a Hilbert space using only terms already defined in `math.linalg.inner-product-space` and `math.fnal.completeness` — no new symbols.
  2. Explain why $\mathbb{R}^n$ with the dot product is automatically both a Hilbert space and a Banach space, citing the specific implication (induced norm) that makes this automatic.
  3. In your own words, describe what the Projection Theorem guarantees, using the plane-in-$\mathbb{R}^3$ example, and explain why "uniqueness" of the nearest point is part of the guarantee, not just "existence."
  4. Explain why $(C([0,1]),\|\cdot\|_\infty)$ being a Banach space does NOT automatically make it a Hilbert space, referencing the fact that not every norm arises from an inner product.
- **P76 (Transfer Probe, mode = cross-link probe against `math.linalg.inner-product` — KG also lists `math.meas.l2-space` as a cross-link, but that concept is not yet authored; a future revision may add a second cross-link probe into the general $L^2$ function-space framework once that entry exists)**: "Recall from your `math.linalg.inner-product` lesson that an inner product $\langle\cdot,\cdot\rangle:V\times V\to F$ is a positive-definite (real) symmetric or (complex) sesquilinear form, and that it induces a norm via $\|v\|=\sqrt{\langle v,v\rangle}$. (a) Using that lesson's induced-norm formula together with THIS lesson's completeness requirement, explain precisely what additional condition an inner product space must satisfy to qualify as a Hilbert space. (b) That lesson stated the Cauchy-Schwarz inequality $|\langle u,v\rangle|\le\|u\|\|v\|$ — explain why this inequality remains valid and useful in a Hilbert space specifically (not just in a general inner product space), given that Hilbert spaces are inner product spaces with one extra property layered on top. (c) Explain why every concrete example of an inner product space you worked with in that lesson (finite-dimensional, using the dot product or a weighted variant) was automatically a Hilbert space, connecting this to the general fact that all finite-dimensional inner product spaces are complete."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | HILBERT-AND-BANACH-TREATED-AS-SYNONYMOUS | Assuming "Hilbert space" and "Banach space" refer to the same class of spaces, rather than recognizing Hilbert as the strictly smaller subclass whose norm specifically arises from an inner product | Foundational |
| MC-2 | PROJECTION-THEOREM-UNIQUENESS-OVERLOOKED | Recalling only that a nearest point EXISTS in the Projection Theorem, without recognizing uniqueness is an equally essential part of the guarantee | Moderate |
| MC-3 | ALL-NORMS-ASSUMED-TO-ARISE-FROM-AN-INNER-PRODUCT | Assuming any norm on a vector space can be written as $\sqrt{\langle v,v\rangle}$ for some inner product, rather than recognizing this as a special property some norms (like the sup-norm) provably lack | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Hilbert-Banach Synonymy Assumption") → P41 (detect: ask whether $(C([0,1]),\|\cdot\|_\infty)$, already known to be Banach, must therefore also be Hilbert) → P64 (conceptual shift: re-present Example 3's direct contrast, re-anchoring on "Hilbert requires the EXTRA inner-product-origin check, verified separately from mere completeness").
- **B02 (targets MC-2)**: P27 (name it: "Projection-Theorem Uniqueness Overlooked") → P41 (detect: ask a student to state the Projection Theorem and check whether they mention uniqueness, not just existence, of the nearest point) → P64 (conceptual shift: re-walk Example 2, emphasizing that "closest point" being ambiguous (multiple equally-close candidates) would make the theorem far less useful — uniqueness is what makes "the projection" a well-defined single point, not a set of candidates).
- **B03 (targets MC-3)**: P27 (name it: "Universal Inner-Product-Origin Assumption") → P41 (detect: ask whether the sup-norm on $C([0,1])$ comes from some inner product) → P64 (conceptual shift: re-present the parallelogram-law test from Example 3 as the concrete tool for checking whether a given norm can possibly arise from an inner product, and confirm the sup-norm fails it).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.linalg.inner-product-space` (the inner product and induced norm this concept adds completeness to), `math.fnal.banach-space` (the completeness property and the Hilbert-implies-Banach relationship this concept establishes).
- **Unlocks**: `math.fnal.spectral-theory`, `math.fnal.riesz-representation` (the Riesz Representation Theorem, named directly in the KG description, is a major Hilbert-space-specific result).
- **Cross-link**: KG lists two cross-links, of **mixed authored status**: `math.linalg.inner-product` is **authored** (verified via `ls`) — P76_mode = cross-link probe against it, directly reusing that blueprint's own inner-product/induced-norm/Cauchy-Schwarz content as the transfer probe's anchor. `math.meas.l2-space` is **not yet authored** — per this corpus's established mixed-cross-link-status convention, the probe engages only the authored target, with this note flagging the unauthored one for a future revision.

## Component 8 — Teaching Notes

- estimated_hours = 6 with an expert/understand tag places this at a "3 TAs + cross-link-probe gate" tier — A01 (definition by combination), A02 (the Projection Theorem, orientation level), and A03 (Hilbert as strictly smaller than Banach) each target a distinct LO, appropriate for a compact definitional concept whose difficulty lies in appreciating scope (what Hilbert adds beyond Banach) rather than new computational technique.
- LO2/Example 2 deliberately treat the Projection Theorem at an **orientation level**, following this corpus's established precedent for large-scope theorem citations within research/expert-tier concepts (`math.fnal.banach-space`'s own treatment of fixed-point theorems and spectral theory) — this blueprint does not attempt to prove the Projection Theorem from the completeness axiom, instead correctly stating its content and geometric significance.
- Example 1 deliberately reuses `math.fnal.banach-space`'s own $\mathbb{R}^2$/$(\mathbb{R}^n,\|\cdot\|_2)$ example structure (direct-combination verification), and Example 3 deliberately reuses that blueprint's own sup-norm-vs-$L^1$-norm $C([0,1])$ discussion, reinforcing the parallel structure between how Banach space and Hilbert space are each defined by combining an already-known structure with completeness.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS (both) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (mixed: math.linalg.inner-product authored → cross-link probe; math.meas.l2-space unauthored, noted) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe against math.linalg.inner-product) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: direct combination of two already-known concepts) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
