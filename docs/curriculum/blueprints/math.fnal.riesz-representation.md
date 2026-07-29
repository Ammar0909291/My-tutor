# Teaching Blueprint: Riesz Representation Theorem (`math.fnal.riesz-representation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.fnal.riesz-representation` |
| name | Riesz Representation Theorem |
| domain | Functional Analysis |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.fnal.hilbert-space` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert learner already fluent in Hilbert spaces and inner products; the Riesz theorem is the first major structural consequence |
| description (KG) | Every bounded linear functional on a Hilbert space H is of the form f(x)=⟨x,y⟩ for a unique y∈H with |f|=|y|. This establishes a (conjugate-linear) isometric isomorphism H≅H*. Hilbert spaces are self-dual. |

## Component 1 — Learning Objectives

- LO1: State the **Riesz Representation Theorem** — every bounded linear functional $f:H\to\mathbb{F}$ on a Hilbert space is of the form $f(x)=\langle x,y\rangle$ for a **unique** $y\in H$ with $\|f\|=\|y\|$ — and correctly identify that $y$ depends on $f$ and is uniquely determined by it.
- LO2: Compute the **representing vector** $y$ for specific bounded linear functionals on concrete Hilbert spaces (e.g., evaluation functionals on $L^2$, projection-type functionals on $\ell^2$), and verify the norm identity $\|f\|=\|y\|$.
- LO3: State and interpret the **self-duality** of Hilbert spaces — the map $\Phi:H\to H^*$, $y\mapsto f_y$ where $f_y(x)=\langle x,y\rangle$, is a conjugate-linear isometric isomorphism — and correctly distinguish Hilbert spaces (isometrically isomorphic to their own dual via inner product) from general Banach spaces (where $X^*$ need not equal $X$).

## Component 2 — Prerequisite Check

Assumes mastery of `math.fnal.hilbert-space` (Hilbert spaces: complete inner product spaces; the inner product $\langle\cdot,\cdot\rangle$, the Cauchy-Schwarz inequality, orthogonality, and the orthogonal projection theorem).

## Component 3 — Core Explanation

**The Riesz Representation Theorem**: let $H$ be a Hilbert space and $f:H\to\mathbb{F}$ a bounded linear functional. Then there exists a UNIQUE $y\in H$ such that $f(x)=\langle x,y\rangle$ for all $x\in H$, and moreover $\|f\|=\|y\|$.

**Proof idea**: if $f=0$, take $y=0$. Otherwise $\ker(f)$ is a closed proper subspace of $H$ (closed because $f$ is continuous). By the orthogonal projection theorem (from `math.fnal.hilbert-space`), there exists a nonzero $z\perp\ker(f)$. Define $y=\overline{f(z)/\|z\|^2}\cdot z$. Then $f(x)=\langle x,y\rangle$ for all $x$: since $x-\frac{f(x)}{f(z)}z\in\ker(f)$ (it maps to $f(x)-\frac{f(x)}{f(z)}f(z)=0$), this vector is orthogonal to $z$, giving $\langle x-\frac{f(x)}{f(z)}z,z\rangle=0$, which rearranges to $f(x)=\frac{f(z)}{\|z\|^2}\langle x,z\rangle=\langle x,y\rangle$. Norm identity: $\|f\|=\sup_{\|x\|\le1}|\langle x,y\rangle|\le\|y\|$ by Cauchy-Schwarz, and $f(y/\|y\|)=\langle y/\|y\|,y\rangle=\|y\|$, so $\|f\|\ge\|y\|$ — giving $\|f\|=\|y\|$.

**Self-duality**: the map $\Phi:H\to H^*$, $\Phi(y)=f_y$ where $f_y(x)=\langle x,y\rangle$, is an isometry (norm-preserving: $\|\Phi(y)\|=\|y\|$) and, in the complex case, conjugate-linear ($\Phi(\lambda y)=\bar\lambda\Phi(y)$). The Riesz theorem says $\Phi$ is SURJECTIVE — every bounded functional arises from some $y$. So $\Phi$ is an isometric isomorphism (conjugate-linear in complex case). Consequently $H\cong H^*$ as Banach spaces — Hilbert spaces are "self-dual," a property NOT shared by general Banach spaces (e.g., $(\ell^1)^*=\ell^\infty\neq\ell^1$).

## Component 4 — Worked Examples

**Example 1 (LO1/LO2 — finding the representing vector on $\ell^2$, breaking MC-1)**: Let $H=\ell^2$ and define $f((x_n))=\sum_{n=1}^\infty a_n x_n$ where $(a_n)\in\ell^2$. This is a bounded functional with $\|f\|\le\|(a_n)\|_{\ell^2}$ by Cauchy-Schwarz. The Riesz theorem says there is a UNIQUE $y\in\ell^2$ with $f(x)=\langle x,y\rangle_{\ell^2}=\sum x_n\overline{y_n}$. Matching: $\overline{y_n}=a_n$, so $y_n=\overline{a_n}$ (complex conjugate entry-wise). Verify $\|f\|=\|y\|_{\ell^2}=\|(a_n)\|_{\ell^2}$ ✓. The representing vector is simply the entry-wise conjugate of the coefficient sequence.

**Example 2 (LO2 — representing vector in $L^2$, breaking MC-2)**: Let $H=L^2([0,1])$ and define $f(g)=\int_0^1 h(t)g(t)\,dt$ for some fixed $h\in L^2([0,1])$. By Cauchy-Schwarz, $|f(g)|\le\|h\|_{L^2}\|g\|_{L^2}$, so $f$ is bounded. The Riesz theorem identifies the representing vector: $f(g)=\langle g,\overline{h}\rangle_{L^2}$ (in the real case, $f(g)=\langle g,h\rangle$), so $y=\overline{h}$. Norm: $\|f\|=\|h\|_{L^2}$ ✓. Concretely: every bounded linear functional on $L^2([0,1])$ is integration against an $L^2$ function — "multiplication by $h$ and integrate" is the ONLY form such a functional can take.

**Example 3 (LO3 — self-duality vs. non-self-duality, breaking MC-3)**: The Riesz theorem says $H\cong H^*$ via $\Phi$. Compare with $\ell^1$: $(\ell^1)^*=\ell^\infty\neq\ell^1$ as Banach spaces (different norms, different topologies, not isometric). This is NOT a contradiction — $\ell^1$ is a Banach space but NOT a Hilbert space (it has no inner product compatible with its norm). Self-duality is a SPECIAL property of Hilbert spaces, not of all Banach spaces, made possible precisely by the inner product's symmetric structure.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Theorem and the Representing Vector (Primitive P11: Representation Shift)

State: every bounded functional $f$ on $H$ IS inner product with a unique $y$ — no other form is possible. Work Example 1's $\ell^2$ case explicitly, reading off $y$ directly from the functional's formula.

- **MC-1 hook**: ask "if $f(x)=\langle x,y\rangle$, is $y$ the unique representing vector, or could two different $y$ values represent the same $f$?" — a "could be non-unique" answer reveals MC-1 (missing that the inner product's positive-definiteness forces uniqueness — any two representing vectors differ by a vector orthogonal to all of $H$, hence zero).

### Teaching Action A02 — Computing the Representing Vector in Concrete Spaces (Primitive P25: Deductive)

Work Example 2's $L^2$ case: show explicitly that $f(g)=\int hg$ gives representing vector $y=\overline{h}$, and verify $\|f\|=\|h\|_{L^2}$. Emphasize the norm identity as a separate check, not implied merely by matching formulas.

- **MC-2 hook**: ask "on $L^2([0,1])$, could there be a bounded linear functional that is NOT of the form 'integrate against some $L^2$ function'?" — a "yes" answer reveals MC-2 (missing that the Riesz theorem rules this out — ALL bounded functionals have this form).

### Teaching Action A03 — Self-Duality and Its Limits (Primitive P06: Contrast Pair)

Contrast $H\cong H^*$ (Hilbert space self-duality, via $\Phi$) with $(\ell^1)^*=\ell^\infty\neq\ell^1$ (Banach, not Hilbert, so NOT self-dual). State: "self-duality is a HILBERT-space phenomenon — it is made possible by the inner product, and fails for most Banach spaces."

- **MC-3 hook**: ask "are all Banach spaces self-dual (isometrically isomorphic to their own dual), or is self-duality special to Hilbert spaces?" — a "all Banach spaces" answer reveals MC-3 (treating self-duality as a general Banach fact rather than a specifically Hilbert-structure consequence).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State the Riesz Representation Theorem with all hypotheses and the uniqueness claim. What role does the completeness of $H$ play?
  2. For $H=\ell^2$ and $f((x_n))=x_1+x_2/2+x_3/3+\cdots$ (if this is bounded — first determine whether it is), find the representing vector $y$ and compute $\|f\|$.
  3. Verify the norm identity $\|f\|=\|y\|$ for your answer to Problem 2.
  4. Explain, using the proof's key step (orthogonal complement of $\ker(f)$ is one-dimensional), why the representing vector exists and is unique.
- **P76 (Transfer Probe, mode = independence)**: "In quantum mechanics, observables are self-adjoint operators on a Hilbert space $H$ (the state space of the system). The 'expectation value' of an observable $A$ in a state $\psi$ is $\langle\psi,A\psi\rangle$ — an inner product evaluation. (a) Using the Riesz theorem, explain why any linear functional of the form 'compute a measurement outcome given a state $\psi$' can be represented as an inner product $\langle\psi,y\rangle$ for a unique $y\in H$ — giving a concrete interpretation of why states and measurement operators both live in $H$ and its dual, which the Riesz theorem shows are the same. (b) In a general Banach space (no inner product), states and observables would NOT be elements of the same space (the state space and its dual would differ). Explain, using this lesson's Example 3, why Hilbert space is the natural setting for quantum mechanics: it is the unique setting where states and bounded observables are interchangeable via the same self-dual structure."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | REPRESENTING-VECTOR-NOT-UNIQUE | Believing the representing vector $y$ in $f(x)=\langle x,y\rangle$ might not be unique — multiple $y$'s could represent the same functional — missing that positive-definiteness of the inner product forces uniqueness | Foundational |
| MC-2 | SOME-BOUNDED-FUNCTIONALS-NOT-INNER-PRODUCT-FORM | Believing there exist bounded linear functionals on a Hilbert space that cannot be written as $\langle x,y\rangle$ for any $y\in H$, missing that the Riesz theorem is a complete characterization | Foundational |
| MC-3 | ALL-BANACH-SPACES-SELF-DUAL | Treating self-duality ($H\cong H^*$) as a general Banach-space property rather than a specifically Hilbert-structure consequence enabled by the inner product | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Representing Vector Not Unique") → P41 (detect: ask whether two different $y$ values could represent the same bounded functional) → P64 (conceptual shift: if $\langle x,y_1\rangle=\langle x,y_2\rangle$ for all $x$, then $\langle x,y_1-y_2\rangle=0$ for all $x$, so $\|y_1-y_2\|^2=\langle y_1-y_2,y_1-y_2\rangle=0$, giving $y_1=y_2$).
- **B02 (targets MC-2)**: P27 (name it: "Some Bounded Functionals Not Inner-Product Form") → P41 (detect: ask whether there could be bounded functionals on $L^2$ not of the form $\int hg$) → P64 (conceptual shift: re-walk the Riesz proof sketch — any bounded functional's kernel is a closed subspace with a nonzero orthogonal complement, and this yields the representing vector explicitly).
- **B03 (targets MC-3)**: P27 (name it: "All Banach Spaces Self-Dual") → P41 (detect: ask whether $\ell^1\cong(\ell^1)^*$) → P64 (conceptual shift: $(\ell^1)^*=\ell^\infty\neq\ell^1$ as Banach spaces — self-duality requires the inner product structure, not just completeness).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.fnal.hilbert-space` (inner product spaces, Cauchy-Schwarz inequality, orthogonal projection theorem — all used in the Riesz theorem's proof and statement).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an expert/understand tag and mastery_threshold = 0.8 (MAMR 4/5) places this at the "3 TAs + gate" tier — A01 (theorem statement and representing vector), A02 (computing $y$ in concrete spaces), A03 (self-duality and its limits) jointly cover all three LOs, with the gate in A04 targeting all three.
- The proof sketch is included in the Core Explanation because the argument (orthogonal complement of $\ker(f)$ is one-dimensional) is conceptually short and illuminating — it shows how the inner product's geometric structure directly yields the algebraic conclusion. Students at this level are expected to follow the argument at orientation level, not necessarily to reproduce it from scratch under the gate.
- The quantum mechanics transfer probe was chosen because Hilbert space is foundational to quantum mechanics specifically via the Riesz theorem's self-duality — the "bra-ket" notation $\langle\psi|A|\phi\rangle$ is precisely the Riesz identification of states with dual elements, and explaining this connection makes both the mathematics and its application more vivid.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.fnal.hilbert-space`) |
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
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already fluent in Hilbert spaces and inner products) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
