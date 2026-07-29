# Teaching Blueprint: Hahn-Banach Theorem (`math.fnal.hahn-banach`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.fnal.hahn-banach` |
| name | Hahn-Banach Theorem |
| domain | Functional Analysis |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.fnal.dual-space-functional` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert learner already fluent in bounded linear functionals and the dual space; extension theorems are natural next-level structure |
| description (KG) | A bounded linear functional on a subspace can be extended to the whole space with the same norm. Geometric form: disjoint convex sets can be separated by a hyperplane. Implies: X* separates points; dual determines the space. |

## Component 1 — Learning Objectives

- LO1: State the **Hahn-Banach extension theorem** — a bounded linear functional $f$ on a subspace $M$ of a normed space $X$ can be extended to a bounded linear functional $\tilde{f}$ on all of $X$ with $\|\tilde{f}\|=\|f\|$ (the norm is PRESERVED, not merely bounded) — and correctly distinguish this from the weaker claim that some extension merely exists.
- LO2: State and apply the **geometric form** (separation version): two disjoint convex sets in a normed space, at least one of which is open, can be **separated by a closed hyperplane** ($\{x : \tilde{f}(x)=c\}$ for some $\tilde{f}\in X^*$ and scalar $c$), and recognize this as a consequence of the same extension argument.
- LO3: Apply the key corollary that the **dual space $X^*$ separates points** — for any $x\neq0$ in $X$ there exists $f\in X^*$ with $f(x)\neq0$, equivalently $\|x\|=\sup_{\|f\|\le1}|f(x)|$ — and recognize this as what makes "the dual determines the primal space" precise.

## Component 2 — Prerequisite Check

Assumes mastery of `math.fnal.dual-space-functional` (bounded linear functionals $f:X\to\mathbb{F}$, the dual space $X^*$, the operator norm $\|f\|=\sup_{\|x\|\le1}|f(x)|$).

## Component 3 — Core Explanation

The **Hahn-Banach Theorem (extension form)**: let $M\subseteq X$ be a subspace of a real normed space and $f:M\to\mathbb{R}$ a bounded linear functional. Then there exists $\tilde{f}:X\to\mathbb{R}$ that is a bounded linear functional on ALL of $X$, extending $f$ (i.e., $\tilde{f}|_M=f$) and satisfying $\|\tilde{f}\|_X=\|f\|_M$ — the norm is not just bounded by $\|f\|$ but EQUAL to it.

**What makes this non-trivial**: extending a linear functional to a larger space while keeping it bounded is straightforward in finite dimensions (there are finitely many directions to fill in). In infinite-dimensional spaces, there are uncountably many "directions" — extending while preserving the exact norm requires an argument (Zorn's lemma in the real case) that constructs the extension one dimension at a time, checking the norm bound is maintained at each step.

**Geometric form (hyperplane separation)**: equivalently, if $A$ and $B$ are two disjoint convex subsets of $X$ with $A$ open, there exists a bounded linear functional $f\in X^*$ and scalar $c$ such that $f(a)<c\le f(b)$ for all $a\in A$, $b\in B$ — the hyperplane $\{f=c\}$ separates the two sets. This is the foundation of all convex-set separation arguments in infinite-dimensional spaces (used in optimization, economics, convex analysis).

**The dual separates points**: the Hahn-Banach theorem implies that for any $x\neq y$ in $X$, there is some $f\in X^*$ with $f(x)\neq f(y)$ (apply the extension theorem to the functional $\alpha(x-y)\mapsto\alpha\|x-y\|$ on the one-dimensional subspace $\mathrm{span}(x-y)$). Equivalently, $\|x\|=\sup_{\|f\|\le1}|f(x)|$ — the operator norm of $x$ is completely captured by how the bounded functionals "see" it. This is what makes the dual a FAITHFUL representation of the primal space.

## Component 4 — Worked Examples

**Example 1 (LO1 — extension with norm preserved, breaking MC-1)**: Let $X=C([0,1])$ with the sup norm, $M=\mathrm{span}\{1\}$ (the subspace of constant functions), and $f(\alpha\cdot\mathbf{1})=\alpha$ — the linear functional extracting the constant value. Its norm on $M$ is $\|f\|_M=1$ (achieved at $\alpha\cdot\mathbf{1}$ with $|\alpha|=1$). The Hahn-Banach theorem guarantees an extension $\tilde{f}:C([0,1])\to\mathbb{R}$ with $\|\tilde{f}\|=1$. One concrete extension: $\tilde{f}(g)=g(0)$ — evaluation at $0$, which satisfies $|\tilde{f}(g)|=|g(0)|\le\|g\|_\infty$, so $\|\tilde{f}\|\le1$; and $\tilde{f}(\mathbf{1})=1=\|{}\mathbf{1}\|_\infty$ achieves the bound, so $\|\tilde{f}\|=1=\|f\|_M$. PASS: norm is exactly preserved, not just bounded.

**Example 2 (LO2 — geometric separation of convex sets, breaking MC-2)**: In $\mathbb{R}^2$ (finite-dimensional, but illustrating the infinite-dimensional idea): let $A=\{(x,y):x<0\}$ (open half-plane) and $B=\{(x,y):x\ge0\}$ (closed half-plane). These are disjoint convex sets, $A$ is open. The functional $f(x,y)=x$ separates them: $f(a)<0\le f(b)$ for all $a\in A,b\in B$. In infinite dimensions, the Hahn-Banach geometric form guarantees such a separator always exists, even when the sets live in an infinite-dimensional Banach space where geometric intuition is less direct.

**Example 3 (LO3 — the dual separates points, breaking MC-3)**: Let $X=\ell^\infty$ and $x=(1,0,0,\dots)\neq0$. Does there exist $f\in(\ell^\infty)^*$ with $f(x)\neq0$? Yes: the projection $f((x_n))=x_1$ is in $(\ell^\infty)^*$ with $\|f\|=1$ and $f(x)=1\neq0$. The Hahn-Banach theorem guarantees this is always possible: for ANY $x\neq0$ in ANY normed space, some bounded functional sees $x$ as nonzero — the dual is rich enough to distinguish every element from 0, making $\|x\|=\sup_{\|f\|\le1}|f(x)|$ a genuine identity, not just an inequality.

## Component 5 — Teaching Actions

### Teaching Action A01 — Extension with Exact Norm (Primitive P11: Representation Shift)

State the extension theorem directly, emphasizing "same norm" not "bounded by the norm." Work Example 1's $C([0,1])$ case explicitly: the functional on constants extends to evaluation at $0$, and both norms equal $1$ exactly.

- **MC-1 hook**: ask "does the Hahn-Banach theorem only guarantee SOME extension exists, or does it guarantee an extension that preserves the exact norm?" — a "some extension" answer reveals MC-1 (missing the norm-preservation strength of the theorem's conclusion).

### Teaching Action A02 — The Geometric (Hyperplane Separation) Form (Primitive P06: Contrast Pair)

Contrast the extension form (functional on a subspace) with the geometric form (separating hyperplane between convex sets), showing they are two faces of the same result. Work Example 2's finite-dimensional case as intuition, then state the infinite-dimensional version.

- **MC-2 hook**: ask "in infinite-dimensional spaces, can two disjoint convex sets always be separated by a hyperplane, even without the Hahn-Banach theorem?" — a "yes, obviously" answer reveals MC-2 (treating geometric separation as automatically true, missing that Hahn-Banach is the deep tool making it rigorous in infinite dimensions).

### Teaching Action A03 — The Dual Separates Points (Primitive P37: Classify)

Derive the corollary: for $x\neq0$, the functional on $\mathrm{span}(x)$ defined by $\alpha x\mapsto\alpha\|x\|$ has norm 1 and extends to a norm-1 functional on all of $X$ with $f(x)=\|x\|\neq0$. Work Example 3. State: "this tells us the dual is RICH ENOUGH — it sees every nonzero element, so dual information completely determines primal information."

- **MC-3 hook**: ask "could there be a nonzero element of a Banach space that every bounded linear functional sends to 0?" — a "yes" answer reveals MC-3 (missing that Hahn-Banach rules this out, guaranteeing the dual separates points).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State the Hahn-Banach extension theorem, identifying all three conditions on $M$, $f$, and the extension $\tilde{f}$.
  2. For $X=\mathbb{R}^2$ and the subspace $M=\{(x,0):x\in\mathbb{R}\}$, extend $f(x,0)=3x$ to all of $\mathbb{R}^2$ with $\|\tilde{f}\|=\|f\|_M$, and verify norm preservation explicitly.
  3. Using the dual-separates-points corollary, prove that if $f(x)=f(y)$ for EVERY $f\in X^*$, then $x=y$.
  4. Explain why the Hahn-Banach theorem is genuinely needed in infinite-dimensional spaces (i.e., why extending a functional while preserving its exact norm is non-trivial beyond the finite-dimensional case).
- **P76 (Transfer Probe, mode = independence)**: "In convex optimization, a fundamental result states that a point $x_0$ is optimal for a convex minimization problem if and only if no 'improving direction' exists — formally, that the subdifferential (a set of dual objects) at $x_0$ contains $0$. (a) Using this lesson's dual-separates-points corollary, explain why the subdifferential being a subset of the dual space makes it a meaningful object: why does the dual being 'rich enough to separate points' matter for encoding optimality conditions? (b) Using this lesson's geometric separation form, explain informally why a hyperplane separating the feasible set from the objective function's sublevel sets gives a certificate that $x_0$ is optimal — connecting the geometric intuition to the Hahn-Banach separation theorem."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | HAHN-BANACH-EXTENSION-WEAKENED-TO-MERE-EXISTENCE | Believing the theorem only guarantees some extension exists, missing that the extension's norm EQUALS the original functional's norm (not merely bounded by it) | Foundational |
| MC-2 | HYPERPLANE-SEPARATION-ASSUMED-FREE-IN-INFINITE-DIMENSIONS | Believing disjoint convex sets can always be separated by a hyperplane without needing the Hahn-Banach theorem as the underlying tool in infinite-dimensional spaces | Moderate |
| MC-3 | DUAL-MIGHT-NOT-SEPARATE-POINTS | Believing there could be a nonzero element of a Banach space that every bounded linear functional maps to 0, missing that Hahn-Banach guarantees the dual is rich enough to separate points | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Hahn-Banach Extension Weakened to Mere Existence") → P41 (detect: ask whether the theorem only guarantees some extension or specifically norm-preserving extension) → P64 (conceptual shift: re-walk Example 1's explicit norm computation, $\|\tilde{f}\|=1=\|f\|_M$, not merely $\|\tilde{f}\|\le\text{something}$).
- **B02 (targets MC-2)**: P27 (name it: "Hyperplane Separation Assumed Free in Infinite Dimensions") → P41 (detect: ask whether geometric separation in infinite-dimensional spaces is obvious without additional tools) → P64 (conceptual shift: re-state that the geometric form IS the Hahn-Banach theorem — not an independent fact — and that in infinite dimensions it requires the extension argument's machinery).
- **B03 (targets MC-3)**: P27 (name it: "Dual Might Not Separate Points") → P41 (detect: ask whether some nonzero $x$ could be invisible to all bounded functionals) → P64 (conceptual shift: re-derive the corollary — apply Hahn-Banach to the norm-1 functional on $\mathrm{span}(x)$, getting a norm-1 extension with $f(x)=\|x\|\neq0$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.fnal.dual-space-functional` (bounded linear functionals and the dual space $X^*$ — this concept extends these from subspaces to the whole space while preserving norm).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/analyze tag and mastery_threshold = 0.8 (MAMR 4/5) places this at the "3 TAs + gate" tier — A01 (extension with exact norm preservation), A02 (geometric/separation form), A03 (dual separates points) jointly cover all three LOs, and the gate targets genuine understanding of the theorem's THREE distinct manifestations (extension, separation, point-separation) rather than just the statement.
- The proof (Zorn's lemma / transfinite induction, real and complex forms) is deliberately NOT worked through at this level — the KG's own expert/analyze tag and the description's focus on CONSEQUENCES ("implies: X* separates points; dual determines the space") signals that correct application and analysis of the theorem's corollaries is the learning target, not proof reproduction.
- The convex-optimization transfer probe was chosen because subdifferentials and optimality conditions (Karush-Kuhn-Tucker) are the single most common downstream application of Hahn-Banach separation in applied mathematics — making the connection explicit here prevents students from later encountering that material without recognizing the Hahn-Banach theorem as its foundation.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.fnal.dual-space-functional`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already fluent in dual space and bounded functionals) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
