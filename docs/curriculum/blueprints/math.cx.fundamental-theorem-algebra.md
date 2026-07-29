# Teaching Blueprint: Fundamental Theorem of Algebra (Complex Analysis) (`math.cx.fundamental-theorem-algebra`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cx.fundamental-theorem-algebra` |
| name | Fundamental Theorem of Algebra (Complex Analysis) |
| domain | Complex Analysis |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.cx.liouville-theorem` |
| unlocks | none |
| cross_links | `math.alg.fundamental-theorem-algebra` |
| CPA_entry_stage | A (Abstract) — expert learner already fluent in Liouville's theorem and entire functions; FTA via Liouville is a one-line argument once the machinery is in place |
| description (KG) | Every non-constant polynomial with complex coefficients has at least one complex root. Proof via Liouville: if p(z)≠0 everywhere, 1/p is bounded entire, hence constant. Iterating: p has exactly n roots (counted with multiplicity). |

## Component 1 — Learning Objectives

- LO1: State the **Fundamental Theorem of Algebra** — every non-constant polynomial $p(z)\in\mathbb{C}[z]$ of degree $n\ge1$ has at least one root in $\mathbb{C}$, and consequently exactly $n$ roots counted with multiplicity — and correctly identify the **complex-analysis proof pathway** (assume no root → $1/p$ is entire and bounded → Liouville → $p$ is constant → contradiction).
- LO2: Execute the **Liouville-based proof** in its two-step structure: (Step 1) if $p(z)\neq0$ for all $z\in\mathbb{C}$, then $1/p(z)$ is entire; then show $|1/p(z)|\to0$ as $|z|\to\infty$ (since $|p(z)|\to\infty$), so $1/p$ is bounded; (Step 2) by Liouville, a bounded entire function is constant, so $p$ is constant — contradicting the hypothesis that $\deg p\ge1$.
- LO3: Explain the **relationship to the algebraic proof** — the complex-analysis proof gives existence of at least one root using only Liouville; iterating (factor out $(z-z_1)$ and apply again) gives all $n$ roots; contrast this with the algebraic version which requires Galois theory or topological winding-number arguments, recognizing that the complex-analysis proof is arguably the most transparent route to the theorem.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cx.liouville-theorem` (Liouville's theorem: a bounded entire function is constant; the fact that $|p(z)|\to\infty$ as $|z|\to\infty$ for nonconstant polynomials; entire functions).

## Component 3 — Core Explanation

**The Fundamental Theorem of Algebra (FTA)**: every polynomial $p(z)=a_nz^n+\cdots+a_0$ with $a_n\neq0$, $n\ge1$, and $a_i\in\mathbb{C}$, has at least one root $z_1\in\mathbb{C}$. Consequently $p(z)=(z-z_1)q(z)$ for a polynomial $q$ of degree $n-1$; applying the theorem again to $q$ and iterating gives exactly $n$ roots (counting multiplicity).

**The Liouville proof (Step 1 — $1/p$ is bounded entire)**: Suppose $p$ has no root, i.e., $p(z)\neq0$ for all $z\in\mathbb{C}$. Then $1/p$ is holomorphic everywhere (since the denominator never vanishes). Since a polynomial has no singularities and $1/p$ has no singularities, $1/p$ is **entire**. Now: for large $|z|$, the leading term dominates, $|p(z)|\ge\frac{|a_n|}{2}|z|^n\to\infty$, so $|1/p(z)|\to0$ — in particular, $|1/p(z)|$ is bounded outside some disk $|z|\le R$. Inside the compact disk $|z|\le R$, $|1/p|$ is a continuous function on a closed bounded set, hence bounded. So $1/p$ is bounded on all of $\mathbb{C}$.

**Step 2 — Apply Liouville**: A bounded entire function is constant (Liouville). So $1/p$ is constant, meaning $p$ is constant. This contradicts $\deg p=n\ge1$.

**Why complex analysis "sees" this**: the real numbers are not algebraically closed — $x^2+1$ has no real root. Complex analysis reveals why $\mathbb{C}$ IS algebraically closed: holomorphic functions satisfy global rigidity (bounded entire = constant) that has no real-analysis analog. A bounded infinitely differentiable function on $\mathbb{R}$ need not be constant (e.g., $\sin x$). The proof fails over $\mathbb{R}$ precisely because Liouville's theorem requires complex analyticity, not merely real differentiability.

## Component 4 — Worked Examples

**Example 1 (LO1 — applying FTA and iterating to get all roots, breaking MC-1)**: $p(z)=z^4-1$. FTA guarantees at least one root in $\mathbb{C}$. In fact $p(z)=(z-1)(z+1)(z-i)(z+i)$, giving the four roots $\{1,-1,i,-i\}$ — exactly $n=4$ roots. The real-coefficient polynomial $z^2+1$ has no real roots, confirming that $\mathbb{R}$ is NOT algebraically closed, while $\mathbb{C}$ is. FTA says 4 roots counted with multiplicity: for $p(z)=(z-1)^3(z+2)$, the root $z=1$ has multiplicity 3 and $z=-2$ multiplicity 1 — still exactly $n=4$.

**Example 2 (LO2 — the Liouville proof executed)**: $p(z)=z^2+1$. Suppose $p$ has no root. Then $f(z)=1/(z^2+1)$ is entire. For large $|z|$: $|z^2+1|\ge|z|^2-1\ge\frac{|z|^2}{2}$ (for $|z|\ge\sqrt{2}$), so $|f(z)|\le2/|z|^2\to0$. On $|z|\le\sqrt{2}$: $|f(z)|=1/|z^2+1|$ is continuous on a compact set, hence bounded. So $f$ is bounded entire — by Liouville, $f$ is constant, so $1/(z^2+1)$ is constant, so $z^2+1$ is constant. But $z^2+1$ has degree 2 — contradiction. Therefore $z^2+1$ has at least one root in $\mathbb{C}$ (namely $\pm i$). This is the proof in full, applied to a concrete polynomial.

**Example 3 (LO3 — the algebraic form and cross-link to `math.alg.fundamental-theorem-algebra`)**: The algebraic version of FTA can be proved via topological winding-number arguments: as $z$ traverses a large circle, $p(z)/|p(z)|$ winds around the origin $n$ times (the winding number is $n$), forcing $p$ to have a zero inside. This is equivalent to the complex-analysis proof (both use the fact that $\mathbb{C}$ is complete/compact in the right sense) but the Liouville route uses analytic machinery (boundedness + Liouville) while the topological route uses algebraic-topology machinery (degree/winding number). The complex-analysis proof (this lesson) complements `math.alg.fundamental-theorem-algebra`'s treatment by revealing that FTA is a consequence of the rigidity of entire functions — a perspective unavailable in purely algebraic/topological treatments.

## Component 5 — Teaching Actions

### Teaching Action A01 — Stating FTA and Its Two-Step Proof Structure (Primitive P25: Deductive)

State FTA, then lay out the proof structure: assume no root → $1/p$ entire → $1/p$ bounded (polynomial growth argument) → Liouville → constant → contradiction. Emphasize that the proof is a proof-by-contradiction whose core step is Liouville.

- **MC-1 hook**: ask "does the FTA say a polynomial of degree $n$ has EXACTLY $n$ roots, or AT LEAST ONE root — and how do we get from one to the other?" — a "exactly $n$ directly" answer reveals MC-1 (missing that FTA proves only existence of at least one root, and the full count $n$ comes from iterating: factor, apply FTA again, repeat $n$ times).

### Teaching Action A02 — Executing the Liouville Proof Concretely (Primitive P11: Representation Shift)

Work Example 2 ($z^2+1$) in full: the assumption step, the growth bound for large $|z|$, compactness argument for small $|z|$, Liouville, contradiction. Show that the same proof works for any $p$ — only the growth rate of the leading term changes, not the structure.

### Teaching Action A03 — Why $\mathbb{C}$ but Not $\mathbb{R}$, and the Cross-Link to Algebraic FTA (Primitive P06: Contrast Pair)

Contrast Liouville over $\mathbb{C}$ (bounded entire = constant — a rigid constraint) with real analysis (bounded $C^\infty$ = not necessarily constant, e.g., $\sin x$). Work Example 3: the topological winding-number proof gives the same conclusion via different machinery. State: "The Liouville route and the winding-number route are two different mathematical perspectives on why $\mathbb{C}$ is algebraically closed — one analytic, one topological — and both are accessible from this domain's prerequisites."

- **MC-2 hook**: ask "why does the Liouville proof fail if we try to apply it over $\mathbb{R}$ to show every real polynomial has a real root?" — a "it should still work" answer reveals MC-2 (missing that Liouville's theorem requires complex analyticity — a bounded infinitely differentiable real function can be non-constant, so the real analog of the argument breaks at the Liouville step).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (5-problem set)**:
  1. State the Fundamental Theorem of Algebra, identifying both the "at least one root" form and the "exactly $n$ roots counted with multiplicity" form, and explain how the second follows from the first.
  2. Give the Liouville-based proof that every non-constant polynomial $p\in\mathbb{C}[z]$ has at least one complex root, identifying where each hypothesis (non-constant degree, complex coefficients) is used.
  3. For $p(z)=z^3-8$, find all three roots (they are $2,2\omega,2\omega^2$ where $\omega=e^{2\pi i/3}$) and verify that FTA gives exactly 3 roots counted with multiplicity.
  4. Explain why the Liouville-based proof fails to show that every real polynomial has a real root — where exactly does the argument break down over $\mathbb{R}$?
  5. Factor $p(z)=z^4+4$ over $\mathbb{C}$ into linear factors (hint: $z^4+4=(z^2+2i)(z^2-2i)$, then factor each quadratic) and verify the total count of roots with multiplicity.
- **P76 (Transfer Probe, mode = cross-link)**: "The cross-linked concept `math.alg.fundamental-theorem-algebra` establishes FTA via a topological winding-number argument: as $z$ traces a large circle of radius $R$, the image $p(z)$ winds around the origin exactly $n$ times, forcing $p$ to have a zero inside by the intermediate value theorem applied to the winding number. (a) Both the Liouville proof (this lesson) and the winding-number proof (the algebraic treatment) prove the same theorem. Identify the KEY TOOL each proof uses and explain, in one sentence each, why that tool is specific to $\mathbb{C}$ (or to complex analysis) rather than being available over $\mathbb{R}$. (b) A student claims: 'Since FTA is really an algebraic or topological fact, the complex-analysis proof must be circular — it must be secretly using the same topological facts.' Explain, using this lesson's proof, why the Liouville-based proof is not circular and does not require winding-number or topological arguments — identify exactly which theorem it depends on and what that theorem's own proof rests on."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | FTA-GIVES-EXACTLY-N-ROOTS-DIRECTLY | Believing FTA directly asserts $n$ roots without needing iteration, missing that the theorem proves existence of at least one root and the count of $n$ requires a separate factoring-and-reapplying argument | Moderate |
| MC-2 | LIOUVILLE-PROOF-WORKS-OVER-REALS | Believing the Liouville-based proof of FTA could work over $\mathbb{R}$ to show every real polynomial has a real root, missing that bounded $C^\infty$ real functions need not be constant (Liouville is a complex-specific rigidity result) | Foundational |
| MC-3 | FTA-COMPLEX-AND-ALGEBRAIC-PROOFS-SAME | Believing the complex-analysis (Liouville) proof and the algebraic/topological (winding-number) proof use the same core argument under different names, missing that they are genuinely different proofs resting on different foundational tools | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "FTA Gives Exactly $n$ Roots Directly") → P41 (detect: ask what FTA asserts and how we conclude there are exactly $n$ roots) → P64 (conceptual shift: re-state FTA as an existence theorem — at least one root — and demonstrate the iteration: $p(z)=(z-z_1)q(z)$, then apply FTA to $q$ of degree $n-1$, repeat until degree 0).
- **B02 (targets MC-2)**: P27 (name it: "Liouville Proof Works Over Reals") → P41 (detect: ask where the proof breaks if we try it over $\mathbb{R}$ for $p(x)=x^2+1$) → P64 (conceptual shift: identify the Liouville step — a bounded $C^\infty$ function on $\mathbb{R}$ (e.g., $\sin x$) is NOT necessarily constant, so the step "bounded entire → constant" has no real analog).
- **B03 (targets MC-3)**: P27 (name it: "FTA Complex and Algebraic Proofs Same") → P41 (detect: ask whether the Liouville proof and the winding-number proof use the same core tool) → P64 (conceptual shift: identify the core of each — Liouville uses analytic rigidity (bounded entire = constant); the topological proof uses degree theory/winding numbers — genuinely different mathematical foundations, arriving at the same conclusion by independent routes).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cx.liouville-theorem` (Liouville's theorem — bounded entire function is constant — and the growth behavior of polynomials — the two ingredients the proof assembles).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: `math.alg.fundamental-theorem-algebra` (exists on disk; P76 uses cross-link probe mode — the algebraic/topological proof is contrasted with the Liouville proof to reveal genuinely different proof strategies for the same theorem).

## Component 8 — Teaching Notes

- estimated_hours = 3 with an expert/understand bloom tag and mastery_threshold = 0.85 (MAMR 5/5) places this at the "3 TAs + gate with 5-problem set" tier — A01 (statement + proof structure), A02 (concrete execution), A03 (real/complex contrast + cross-link) jointly cover all three LOs. The 5-problem gate (matching MAMR 5/5) includes the polynomial root-finding problem (Problem 3) and the full factoring problem (Problem 5) to verify that the student can apply FTA operationally, not just recite the proof.
- The cross-link P76 is a genuine cross-link probe (not independence) — `math.alg.fundamental-theorem-algebra` exists on disk and the contrast between its winding-number approach and Liouville's approach is the most conceptually rich transfer question available for this concept.
- The MAMR = 5/5 reflects the theorem's status as a landmark result that students must master fully — partial credit at 4/5 is not accepted because the theorem underpins algebraic closedness of ℂ and every subsequent factoring and root-counting argument in complex analysis.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.cx.liouville-theorem`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.alg.fundamental-theorem-algebra` exists → cross-link) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 5 problems | PASS (MAMR = 5/5) |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already fluent in Liouville's theorem and entire functions) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
