# Teaching Blueprint: Uniform Boundedness Principle (`math.fnal.uniform-boundedness`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.fnal.uniform-boundedness` |
| name | Uniform Boundedness Principle |
| domain | Functional Analysis |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.fnal.bounded-operator`, `math.real.baire-category` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert learner already fluent in bounded operators and the Baire Category theorem; the UBP is their direct combination |
| description (KG) | If {Tα} is a family of bounded linear operators from Banach X to normed Y with sup_α|Tαx|<∞ for each x, then sup_α|Tα|<∞ (uniformly bounded in operator norm). Proved via Baire category. Prevents pointwise-convergent sequences of operators from 'blowing up'. |

## Component 1 — Learning Objectives

- LO1: State the **Uniform Boundedness Principle** (Banach-Steinhaus theorem) — if $\{T_\alpha\}_{\alpha\in I}$ is a family of bounded linear operators from a **Banach** space $X$ to a normed space $Y$ such that $\sup_\alpha\|T_\alpha x\|<\infty$ for EACH fixed $x\in X$ (pointwise boundedness), then $\sup_\alpha\|T_\alpha\|<\infty$ (uniform boundedness in operator norm) — and correctly distinguish pointwise boundedness (the hypothesis) from uniform boundedness (the conclusion).
- LO2: Explain why the proof genuinely requires the **Baire Category theorem** applied to $X$ (a Banach space, hence a complete metric space), identifying the specific role completeness plays in ruling out a pointwise-bounded but uniformly-unbounded family.
- LO3: Apply the principle to conclude that a **pointwise-convergent sequence of bounded operators** (with $\lim_n T_n x$ existing for each $x$) has **uniformly bounded norms** $\sup_n\|T_n\|<\infty$ — and correctly identify what additional data is needed to conclude the limit operator is itself bounded.

## Component 2 — Prerequisite Check

Assumes mastery of `math.fnal.bounded-operator` (bounded linear operators, the operator norm) and `math.real.baire-category` (the Baire Category theorem: a complete metric space cannot be written as a countable union of nowhere-dense closed sets).

## Component 3 — Core Explanation

**Uniform Boundedness Principle (Banach-Steinhaus)**: let $\{T_\alpha\}$ be a family (possibly uncountable) of bounded linear operators $T_\alpha:X\to Y$, where $X$ is a **Banach** space and $Y$ is a normed space. If $\sup_\alpha\|T_\alpha x\|<\infty$ for every fixed $x\in X$ (POINTWISE boundedness), then $\sup_\alpha\|T_\alpha\|<\infty$ (UNIFORM boundedness in operator norm).

**Why pointwise boundedness does not obviously imply uniform boundedness**: for a single operator, $\|T_\alpha x\|\le\|T_\alpha\|\cdot\|x\|$, so pointwise boundedness (at each $x$) might be achieved by having $\|T_\alpha\|$ unbounded but the "large" directions varying with $\alpha$. The UBP rules this out: if $X$ is complete, pointwise boundedness forces a SINGLE finite bound on ALL operator norms simultaneously — a genuinely surprising global conclusion from local data.

**Proof via Baire Category**: define closed sets $F_n=\{x\in X:\sup_\alpha\|T_\alpha x\|\le n\}$. By pointwise boundedness, $X=\bigcup_{n=1}^\infty F_n$. By the Baire Category theorem (since $X$ is a complete metric space), some $F_N$ has nonempty interior — there is a ball $B(x_0,r)\subseteq F_N$, meaning $\|T_\alpha(x_0+ry)\|\le N$ for all $\|y\|\le1$ and all $\alpha$. By linearity, $r\|T_\alpha y\|\le\|T_\alpha(x_0+ry)\|+\|T_\alpha x_0\|\le N+N=2N$, so $\|T_\alpha\|\le 2N/r$ uniformly. Completeness of $X$ is exactly what allows Baire to apply.

**Key consequence for sequences**: if $(T_n)$ is a sequence of bounded linear operators and $T_n x$ converges for every $x\in X$ (pointwise convergence), then $\sup_n\|T_n\|<\infty$ by UBP. Defining $Tx=\lim_n T_n x$ gives a well-defined limit operator; it is also bounded (since $\|Tx\|=\lim_n\|T_n x\|\le(\sup_n\|T_n\|)\|x\|<\infty$), so $\|T\|\le\liminf_n\|T_n\|$.

## Component 4 — Worked Examples

**Example 1 (LO1 — pointwise vs. uniform boundedness, breaking MC-1)**: Let $T_n:\ell^1\to\mathbb{R}$, $T_n(x_1,x_2,\dots)=\sum_{k=1}^n kx_k$ (truncated weighted sum). For each fixed $x\in\ell^1$, $|T_n x|\le\sum_{k=1}^n k|x_k|\le\sum_{k=1}^\infty k|x_k|$ — but the right side need not be finite for all $x\in\ell^1$ (e.g., $x_k=1/k^2$ gives $\sum k/k^2=\sum 1/k=\infty$). So $\sup_n|T_n x|$ is infinite for some $x$, meaning pointwise boundedness fails — the UBP hypothesis is not met, and indeed $\|T_n\|=\sum_{k=1}^n k\to\infty$, confirming uniform boundedness also fails. This shows: when the hypothesis (pointwise boundedness for ALL $x$) fails, so does the conclusion — consistent with the theorem, not a counterexample to it.

**Example 2 (LO1/LO3 — UBP applied to a pointwise-convergent sequence)**: Let $T_n:C([0,1])\to\mathbb{R}$, $T_n(f)=nf(1/n)$ (a bounded functional, $\|T_n\|=n$). For the specific function $f=\mathbf{1}$ (constant 1), $T_n(\mathbf{1})=n\cdot1=n\to\infty$. So $\sup_n|T_n(\mathbf{1})|=\infty$ — pointwise boundedness fails at $f=\mathbf{1}$, and indeed $\sup_n\|T_n\|=\infty$. Contrast this with the case where $T_n(f)=\int_0^1 f(t)\sin(nt)\,dt$ — for each fixed $f\in C([0,1])$ the Riemann-Lebesgue lemma gives $T_n(f)\to0$, so $\sup_n|T_n(f)|<\infty$ for each $f$; UBP then guarantees $\sup_n\|T_n\|<\infty$ (which can be verified directly: $\|\int_0^1 f\sin(nt)\|\le\|f\|_\infty<\infty$, uniformly in $n$).

**Example 3 (LO2 — completeness is essential, breaking MC-2)**: On the non-Banach space $c_{00}$ of finitely-supported sequences (with the sup norm), define $T_n(x)=nx_n$ (scale the $n$-th entry by $n$). For each fixed $x\in c_{00}$, $x$ has only finitely many nonzero entries, so $T_n x=nx_n=0$ for all large enough $n$ — pointwise bounded. But $\|T_n\|=\sup_{\|x\|\le1,x\in c_{00}}|nx_n|\ge n|e_n^n|=n$ (achieved at $x=e_n$) → $\sup_n\|T_n\|=\infty$. Pointwise bounded but uniformly unbounded — exactly what the UBP rules out on COMPLETE spaces, and exactly what fails here because $c_{00}$ is NOT complete. The Baire Category theorem does not apply (an incomplete metric space can be a countable union of nowhere-dense sets).

## Component 5 — Teaching Actions

### Teaching Action A01 — Pointwise vs. Uniform Boundedness, and the Theorem's Statement (Primitive P06: Contrast Pair)

Contrast pointwise boundedness (each $x$ gives a finite bound, bound may depend on $x$) with uniform boundedness (a single bound works for ALL $\alpha$ simultaneously). State the theorem. Work Example 1's explicit failure of pointwise boundedness and corresponding failure of uniform boundedness.

- **MC-1 hook**: ask "if $\|T_\alpha x\|<\infty$ for each fixed $x$, does this automatically mean the SAME bound works for all $\alpha$, or do we need extra structure?" — an "automatically yes" answer reveals MC-1 (conflating pointwise and uniform bounds, missing that UBP is a genuinely deep theorem, not a tautology).

### Teaching Action A02 — Completeness Is the Key Hypothesis (Primitive P16: Counterexample)

Work Example 3's $c_{00}$ counterexample: pointwise bounded but uniformly unbounded, on the non-complete space $c_{00}$. State: "if we drop completeness of $X$, the theorem fails — this shows completeness is not a technical footnote but the engine of the proof."

- **MC-2 hook**: ask "does the UBP hold for any normed space $X$, or does completeness genuinely matter?" — a "works for any normed space" answer reveals MC-2 (missing that the Baire Category theorem — and hence completeness — is exactly the mechanism making the proof work).

### Teaching Action A03 — Application to Pointwise-Convergent Operator Sequences (Primitive P25: Deductive)

State: if $(T_n)$ converges pointwise (each $T_n x\to Tx$), then UBP immediately gives $\sup_n\|T_n\|<\infty$, and the limit $T$ is bounded with $\|T\|\le\liminf_n\|T_n\|$. Work Example 2's Riemann-Lebesgue application: pointwise convergence to $0$ → UBP guarantees uniform operator-norm bound — even though no individual norm bound is needed to state pointwise convergence.

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State the Uniform Boundedness Principle with all hypotheses (space types, pointwise condition, conclusion), distinguishing pointwise from uniform boundedness in your own words.
  2. Show directly that if $T_n:\ell^2\to\mathbb{R}$, $T_n(x)=x_n$ (projection onto $n$-th coordinate), then pointwise boundedness holds (compute $\sup_n|T_n(x)|$ for each fixed $x\in\ell^2$) and uniform boundedness holds (compute $\sup_n\|T_n\|$).
  3. Explain, using the Baire Category theorem, what specific structural property of Banach spaces the UBP proof exploits, and identify the step where completeness enters.
  4. Suppose $T_n:X\to Y$ is a pointwise-convergent sequence of bounded operators on a Banach space $X$. Without computing $\|T_n\|$ individually, explain why the limit operator $T(x)=\lim_n T_n x$ is automatically bounded.
- **P76 (Transfer Probe, mode = independence)**: "In numerical analysis, a quadrature formula for computing $\int_0^1 f(t)\,dt$ is a rule $Q_n(f)=\sum_{k=1}^n w_{nk}f(t_{nk})$ — a bounded linear functional on $C([0,1])$ with $\|Q_n\|=\sum_k|w_{nk}|$. (a) Using the UBP, explain what it means for a quadrature sequence to be 'consistent' (converges to the true integral for every $f\in C([0,1])$): what does UBP immediately tell you about the operator norms $\|Q_n\|$? (b) A student argues 'if the quadrature works for every specific $f$ I test, the norms $\|Q_n\|$ must eventually stabilize.' Using this lesson's Example 3-style argument, explain why pointwise convergence alone does not guarantee the norms stabilize — and why UBP fills this gap only because $C([0,1])$ is a Banach space."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | POINTWISE-BOUND-ASSUMED-UNIFORM | Believing that if each $\|T_\alpha x\|$ is finite, a single bound automatically works for all $\alpha$, treating the UBP as a trivial tautology rather than a genuinely non-trivial theorem | Foundational |
| MC-2 | UBP-ASSUMED-INDEPENDENT-OF-COMPLETENESS | Believing the Uniform Boundedness Principle holds for any normed space, missing that the Baire Category theorem (and hence completeness of $X$) is the essential mechanism | Foundational |
| MC-3 | POINTWISE-CONVERGENT-LIMIT-NOT-AUTOMATICALLY-BOUNDED | Believing that when $T_n x\to Tx$ pointwise but $T_n$ is not eventually norm-bounded, the limit $T$ could still be bounded — missing that UBP already guarantees $\sup_n\|T_n\|<\infty$ from the pointwise convergence alone | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Pointwise Bound Assumed Uniform") → P41 (detect: ask whether pointwise boundedness is obviously the same as uniform boundedness) → P64 (conceptual shift: exhibit a concrete example where individual norms $\|T_n\|$ vary widely even as pointwise bounds are finite, and re-state UBP as the non-trivial theorem that collapses this gap for Banach $X$).
- **B02 (targets MC-2)**: P27 (name it: "UBP Assumed Independent of Completeness") → P41 (detect: ask whether the UBP holds for any normed space, including non-Banach) → P64 (conceptual shift: re-walk Example 3's $c_{00}$ counterexample, identifying the exact Baire-category step that fails for an incomplete space).
- **B03 (targets MC-3)**: P27 (name it: "Pointwise-Convergent Limit Not Automatically Bounded") → P41 (detect: ask whether the limit of a pointwise-convergent sequence of bounded operators must itself be bounded) → P64 (conceptual shift: invoke UBP to get $\sup_n\|T_n\|<\infty$ from pointwise convergence, then use this bound to bound $\|Tx\|=\lim_n\|T_n x\|\le(\sup_n\|T_n\|)\|x\|$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.fnal.bounded-operator` (bounded linear operators and the operator norm — the objects the principle concerns), `math.real.baire-category` (the Baire Category theorem — the proof mechanism that makes completeness productive).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an expert/understand tag and mastery_threshold = 0.75 (MAMR 4/5) places this at the "3 TAs + gate" tier — A01 (pointwise vs. uniform), A02 (completeness via counterexample), A03 (pointwise-convergent sequences) jointly cover all three LOs and produce the gate in A04.
- The proof sketch (via Baire Category applied to the closed sets $F_n$) is included in the Core Explanation because LO2 explicitly requires students to explain the Baire Category role — not to reproduce the full argument in any epsilon-delta detail, but to correctly identify what structural property of $X$ the argument exploits.
- The quadrature transfer probe was chosen because it connects UBP to a concrete numerical-analysis context where the pointwise-vs-uniform distinction matters for the convergence theory of numerical integration schemes — one of the most direct downstream applications in applied mathematics.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.fnal.bounded-operator`, `math.real.baire-category`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already fluent in bounded operators and the Baire Category theorem) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO1/LO3, Ex3→LO2) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
