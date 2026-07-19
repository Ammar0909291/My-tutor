# Teaching Blueprint: Dot Product (`math.geom.dot-product`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.geom.dot-product` |
| name | Dot Product |
| domain | Geometry |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.geom.vectors-3d`, `math.trig.trig-functions` |
| unlocks | `math.linalg.inner-product-space` |
| cross_links | `math.linalg.inner-product-space` |
| CPA_entry_stage | C (Concrete) — computing the dot product both algebraically and geometrically for vectors at a known constructed angle, before the general formula equivalence is stated abstractly |
| description (KG) | The dot product a·b = Σaᵢbᵢ = |a||b|cos θ; measures the component of one vector in the direction of another; zero iff orthogonal. |

## Component 1 — Learning Objectives

- LO1: Define the dot product TWO equivalent ways — algebraically, $\mathbf{a}\cdot\mathbf{b}=\sum a_ib_i$ (using `math.geom.vectors-3d`'s component notation), and geometrically, $\mathbf{a}\cdot\mathbf{b}=|\mathbf{a}||\mathbf{b}|\cos\theta$ (using `math.trig.trig-functions`'s cosine) — and verify both formulas agree for vectors constructed at a KNOWN geometric angle.
- LO2: Use the dot product to test **orthogonality**: $\mathbf{a}\cdot\mathbf{b}=0$ iff $\mathbf{a}\perp\mathbf{b}$ (since $\cos90°=0$ is the only way $|\mathbf{a}||\mathbf{b}|\cos\theta=0$ for nonzero vectors), recognizing the dot product's result is always a single SCALAR (a number), never a vector.
- LO3: Compute the **scalar projection** of one vector onto another (the dot product divided by the second vector's magnitude), correctly interpreting its SIGN: positive means the vectors point generally in the same direction (an acute angle between them), negative means generally opposite directions (an obtuse angle), zero means perpendicular.

## Component 2 — Prerequisite Check

Assumes mastery of `math.geom.vectors-3d` (component vectors $(a,b,c)$, magnitude $|(a,b,c)|=\sqrt{a^2+b^2+c^2}$) and `math.trig.trig-functions` (the cosine function, its values at standard angles, and $\cos90°=0$).

## Component 3 — Core Explanation

**Two formulas for the same quantity — a SCALAR, never a vector**: the dot product of $\mathbf{a}=(a_1,a_2,a_3)$ and $\mathbf{b}=(b_1,b_2,b_3)$ has an algebraic formula, $\mathbf{a}\cdot\mathbf{b}=a_1b_1+a_2b_2+a_3b_3$ (sum of matching-component products), and an equivalent GEOMETRIC formula, $\mathbf{a}\cdot\mathbf{b}=|\mathbf{a}||\mathbf{b}|\cos\theta$, where $\theta$ is the angle between the two vectors. Both formulas compute the exact same single NUMBER — the dot product is always a SCALAR, not a vector (unlike the cross product, which produces a new vector).

**Orthogonality: the dot product vanishes exactly at 90°**: since $\cos90°=0$, and $|\mathbf{a}|,|\mathbf{b}|$ are nonzero for genuine (nonzero) vectors, $\mathbf{a}\cdot\mathbf{b}=0$ happens EXACTLY when $\cos\theta=0$, i.e. $\theta=90°$ — the vectors are **orthogonal** (perpendicular). This gives a purely algebraic test for perpendicularity, with no need to measure any angle directly: compute the dot product via components, and check whether the result is zero.

**Scalar projection: measuring "how much of $\mathbf{a}$ points along $\mathbf{b}$," with a meaningful sign**: dividing the dot product by $|\mathbf{b}|$ gives the **scalar projection** of $\mathbf{a}$ onto $\mathbf{b}$, $\text{comp}_{\mathbf{b}}\mathbf{a} = \dfrac{\mathbf{a}\cdot\mathbf{b}}{|\mathbf{b}|} = |\mathbf{a}|\cos\theta$ — the length of $\mathbf{a}$'s "shadow" cast along $\mathbf{b}$'s direction. Its SIGN carries genuine geometric meaning: positive when $\theta$ is acute (the shadow falls in $\mathbf{b}$'s own forward direction), negative when $\theta$ is obtuse (the shadow falls backward, opposite to $\mathbf{b}$'s direction), and exactly zero when $\theta=90°$ (no shadow at all, matching the orthogonality test).

## Component 4 — Worked Examples

**Example 1 (LO1 — algebraic and geometric formulas agree, verified at a known angle)**: Let $\mathbf{a}=(1,0,0)$ and $\mathbf{b}=(\cos60°,\sin60°,0)=(0.5,\frac{\sqrt3}{2},0)$ — both unit vectors, with $\mathbf{b}$ constructed at EXACTLY $60°$ from $\mathbf{a}$ by design. Algebraic: $\mathbf{a}\cdot\mathbf{b} = 1(0.5)+0\left(\frac{\sqrt3}{2}\right)+0(0)=0.5$. Geometric: $|\mathbf{a}|=1$, $|\mathbf{b}|=1$, so $|\mathbf{a}||\mathbf{b}|\cos60° = 1\times1\times0.5=0.5$. Both formulas give exactly $0.5$ — genuinely independent verification, since $\mathbf{b}$'s $60°$ angle was fixed by construction rather than derived from the dot product itself.

**Example 2 (LO2 — orthogonality test, a scalar result, breaking MC-1)**: For $\mathbf{a}=(2,3,0)$ and $\mathbf{b}=(3,-2,0)$: $\mathbf{a}\cdot\mathbf{b} = 2(3)+3(-2)+0(0) = 6-6=0$ — a single SCALAR value, zero. Since both vectors are nonzero, $\cos\theta=0/(|\mathbf{a}||\mathbf{b}|)=0$, forcing $\theta=90°$ — $\mathbf{a}$ and $\mathbf{b}$ are orthogonal, confirmed purely algebraically, with no vector-valued result anywhere in the computation.

**Example 3 (LO3 — scalar projection's sign, breaking MC-3)**: Project $\mathbf{a}=(3,4,0)$ onto $\mathbf{b}=(1,0,0)$: $\text{comp}_{\mathbf{b}}\mathbf{a} = \dfrac{\mathbf{a}\cdot\mathbf{b}}{|\mathbf{b}|} = \dfrac{3(1)+4(0)+0(0)}{1}=3$ — POSITIVE, since $\mathbf{a}$ points partly in $\mathbf{b}$'s own $(+x)$ direction (an acute angle between them). Now project $\mathbf{c}=(-3,4,0)$ onto the SAME $\mathbf{b}=(1,0,0)$: $\text{comp}_{\mathbf{b}}\mathbf{c} = \dfrac{-3(1)+4(0)+0(0)}{1}=-3$ — NEGATIVE, since $\mathbf{c}$'s $x$-component points opposite to $\mathbf{b}$'s direction (an obtuse angle between them) — the sign directly signals which side of perpendicular the angle falls on.

## Component 5 — Teaching Actions

### Teaching Action A01 — Two Formulas, One Scalar Answer (Primitive P11: Representation Shift)

State: "the dot product has an algebraic recipe (multiply matching components, add them up) and a geometric recipe (lengths times the cosine of the angle between them) — both always give the exact same single NUMBER." Work Example 1's full verification at the constructed $60°$ angle.

### Teaching Action A02 — The Orthogonality Test Produces a Scalar, Not a Vector (Primitive P28: Conflict Evidence)

Present Example 2's direct computation: $\mathbf{a}\cdot\mathbf{b}=0$, a single scalar value, confirming perpendicularity purely algebraically. State: "the dot product is ALWAYS one number — never a new vector. When that number comes out to zero, the geometric formula forces $\cos\theta=0$, meaning the vectors are perpendicular."

- **MC-1 hook**: ask "does the dot product of two vectors give you a new vector, like the cross product does?" — a "yes" answer reveals MC-1 (confusing the dot product's scalar result with the cross product's vector result).
- **MC-2 hook (degenerate case aside)**: ask "if one of the two vectors is the zero vector, is $\mathbf{a}\cdot\mathbf{0}=0$ a genuine case of 'orthogonality'?" — note that while $\mathbf{a}\cdot\mathbf{0}=0$ holds trivially for any $\mathbf{a}$, the zero vector has no well-defined direction at all, so calling it "perpendicular" to anything is a degenerate, not a meaningful geometric, claim — the orthogonality test is intended for genuinely nonzero vectors.

### Teaching Action A03 — The Scalar Projection's Sign Carries Real Meaning (Primitive P06: Contrast Pair)

Contrast Example 3's two projections — $\mathbf{a}=(3,4,0)$ onto $\mathbf{b}$ giving $+3$ (acute angle) versus $\mathbf{c}=(-3,4,0)$ onto the SAME $\mathbf{b}$ giving $-3$ (obtuse angle). State: "the sign of the scalar projection isn't just bookkeeping — positive genuinely means 'generally the same direction,' negative genuinely means 'generally opposite,' and these two examples, differing only in their $x$-component's sign, land on opposite sides of that divide."

- **MC-3 hook**: ask "is the scalar projection of one vector onto another always positive, like an ordinary length?" — a "yes" answer reveals MC-3 (missing that an obtuse angle between the vectors produces a genuinely negative scalar projection).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute $\mathbf{a}\cdot\mathbf{b}$ algebraically for $\mathbf{a}=(1,2,3)$, $\mathbf{b}=(4,-1,2)$.
  2. Determine whether $\mathbf{a}=(4,1,0)$ and $\mathbf{b}=(-1,4,0)$ are orthogonal, using the dot product.
  3. Compute the scalar projection of $\mathbf{a}=(5,0,0)$ onto $\mathbf{b}=(-1,1,0)$, and state whether it is positive or negative and why.
  4. Explain why the dot product of two vectors is always a single number, never a new vector.
- **P76 (Transfer Probe, mode = cross-link probe against `math.linalg.inner-product-space`)**: "Recall from `math.linalg.inner-product-space` that an inner product space is a vector space equipped with an inner product $\langle\cdot,\cdot\rangle$, which automatically induces a norm $\|v\|=\sqrt{\langle v,v\rangle}$, and satisfies the Cauchy-Schwarz inequality $|\langle u,v\rangle|\leq\|u\|\|v\|$. (a) Explain how this lesson's dot product $\mathbf{a}\cdot\mathbf{b}$ is exactly the concrete, motivating special case of that abstract inner product $\langle\cdot,\cdot\rangle$ in $\mathbb{R}^3$. (b) Using $|\mathbf{a}||\mathbf{b}|\cos\theta$, explain why the Cauchy-Schwarz inequality is essentially just the statement $|\cos\theta|\leq1$ for this concrete geometric case. (c) Explain how the induced-norm formula $\|v\|=\sqrt{\langle v,v\rangle}$ specializes, for the dot product, to the already-familiar Euclidean magnitude formula from `math.geom.vectors-3d`."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | DOT-PRODUCT-ASSUMED-TO-BE-A-VECTOR | Believing the dot product of two vectors produces a new vector, confusing it with the cross product's vector result | Foundational |
| MC-2 | ZERO-VECTOR-ORTHOGONALITY-TREATED-AS-MEANINGFUL | Treating a·0=0 as a genuine, meaningful instance of orthogonality, missing that the zero vector has no well-defined direction, making the claim degenerate rather than geometrically meaningful | Moderate |
| MC-3 | SCALAR-PROJECTION-ASSUMED-ALWAYS-POSITIVE | Believing the scalar projection of one vector onto another is always positive like an ordinary length, missing that an obtuse angle between the vectors produces a negative projection | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Dot Product Assumed to Be a Vector") → P41 (detect: ask a student what TYPE of result the dot product produces, and check for "a vector") → P64 (conceptual shift: re-walk Example 2's computation, showing the result is the single scalar $0$, re-anchoring on "the dot product is always ONE number — that's what makes it usable directly as a yes/no orthogonality test").
- **B02 (targets MC-2)**: P27 (name it: "Zero Vector Orthogonality Treated as Meaningful") → P41 (detect: ask a student whether the zero vector is "orthogonal" to a given nonzero vector in a meaningful geometric sense) → P64 (conceptual shift: re-emphasize that the orthogonality test is built for nonzero vectors with well-defined directions, re-anchoring on "the zero vector has no direction to be perpendicular OR parallel to — the formula still returns zero, but the geometric claim is degenerate").
- **B03 (targets MC-3)**: P27 (name it: "Scalar Projection Assumed Always Positive") → P41 (detect: ask a student to predict the sign of a scalar projection for an obtuse angle, and check for a "positive, since it's a length" answer) → P64 (conceptual shift: re-walk Example 3's contrasting $+3$ and $-3$ projections, re-anchoring on "the scalar projection's sign directly tells you whether the angle is acute or obtuse — it is not simply a length").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.geom.vectors-3d` (component-vector notation and magnitude, used throughout the algebraic formula), `math.trig.trig-functions` (the cosine function and its standard values, used throughout the geometric formula).
- **Unlocks**: `math.linalg.inner-product-space` (already authored — see the production-order note below; that concept's abstract inner product $\langle\cdot,\cdot\rangle$ is the direct generalization of this concept's concrete dot product).
- **Cross-link (P76_mode = cross-link probe against `math.linalg.inner-product-space`, already authored)**: the transfer probe explicitly connects this concept's concrete formulas to that concept's abstract inner product, induced norm, and Cauchy-Schwarz inequality, framing this concept as the motivating special case.
- **Production-order note**: `math.linalg.inner-product-space` was authored earlier in this corpus (as a prerequisite for `math.fnal.hilbert-space`) than this concept, despite being this concept's own KG `unlocks` target — production order in this corpus follows the ROI-ranked topological schedule (gated only by `requires`, not `unlocks` order), matching the precedent already recorded for `math.alg.system-3var`/`math.linalg.row-reduction` and `math.calc.vector-fields`/`math.calc.line-integrals`.

## Component 8 — Teaching Notes

- estimated_hours = 5 with a proficient/apply tag places this at a "3 TAs + gate" tier — A01 (the two-formula equivalence), A02 (the orthogonality test, plus the zero-vector degenerate-case aside), and A03 (scalar projection's meaningful sign) each target a distinct LO, appropriate for a concept introducing one new operation with three genuinely distinct uses.
- Example 1 was deliberately constructed with $\mathbf{b}$ placed at an EXACTLY known $60°$ angle from $\mathbf{a}$ (rather than picking two arbitrary vectors and computing the angle FROM the dot product itself, which would make the "two formulas agree" claim circular) — this makes the verification genuinely independent evidence rather than a restatement of the definition.
- Examples 2 and 3 deliberately reuse vectors built from the SAME small set of components (in variations of $(\pm3,4,0)$ and $(1,0,0)$-style vectors) so the sign contrast in Example 3 reads as a direct, minimal variation on already-familiar numbers rather than requiring new arithmetic to be learned alongside the sign concept.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.linalg.inner-product-space authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe against math.linalg.inner-product-space) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: known-angle vector computation before the general formula equivalence) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
