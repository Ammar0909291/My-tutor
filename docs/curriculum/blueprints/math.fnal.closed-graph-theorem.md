# Teaching Blueprint: Closed Graph Theorem (`math.fnal.closed-graph-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.fnal.closed-graph-theorem` |
| name | Closed Graph Theorem |
| domain | Functional Analysis |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 3 |
| requires | `math.fnal.open-mapping-theorem` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert learner already fluent in the Open Mapping Theorem and Banach spaces; the closed-graph criterion is a direct rephrasing of the same completeness machinery |
| description (KG) | A linear map T:X→Y between Banach spaces with closed graph (xₙ→x, Txₙ→y ⟹ y=Tx) is bounded. Makes it easier to verify boundedness by checking the graph condition rather than the norm estimate. |

## Component 1 — Learning Objectives

- LO1: State the **Closed Graph Theorem** — a linear map $T:X\to Y$ between Banach spaces is **bounded** (equivalently continuous) if and only if its **graph** $\Gamma(T)=\{(x,Tx):x\in X\}\subseteq X\times Y$ is **closed** (i.e., if $x_n\to x$ and $Tx_n\to y$ then $y=Tx$) — and correctly interpret "closed graph" as a sequential condition on pairs.
- LO2: Apply the closed-graph criterion **in place of a direct norm estimate** to verify a linear operator is bounded, recognizing cases where the graph condition is easier to verify than computing $\|T\|$ directly.
- LO3: Correctly identify that **completeness of BOTH spaces** is essential, and distinguish the closed-graph condition (a joint sequential condition on $(x_n,Tx_n)$) from continuity's definition (which only requires $x_n\to x\Rightarrow Tx_n\to Tx$, already the closed-graph condition given uniqueness of limits).

## Component 2 — Prerequisite Check

Assumes mastery of `math.fnal.open-mapping-theorem` (the Open Mapping Theorem and its bounded-inverse corollary, since the Closed Graph Theorem is proved using the Open Mapping Theorem applied to the graph-space inclusion map).

## Component 3 — Core Explanation

The **Closed Graph Theorem**: if $T:X\to Y$ is a linear map between Banach spaces and its graph $\Gamma(T)=\{(x,Tx):x\in X\}$ is a CLOSED subspace of $X\times Y$ (with the product norm), then $T$ is bounded.

**Why "closed graph" is natural**: a bounded linear operator $T$ always has a closed graph — if $x_n\to x$ and $Tx_n\to y$, then since $T$ is continuous, $Tx_n\to Tx$, and by uniqueness of limits $y=Tx$. So closed-graph is a NECESSARY condition for boundedness. The theorem says it is also SUFFICIENT (when both spaces are Banach) — a striking reversal.

**Proof idea via Open Mapping Theorem**: equip $\Gamma(T)$ with the product norm from $X\times Y$; since $\Gamma(T)$ is closed in the Banach space $X\times Y$, it is itself a Banach space. The projection $\pi_1:\Gamma(T)\to X$, $(x,Tx)\mapsto x$, is a bijective bounded linear operator between Banach spaces — so by the Open Mapping Theorem's bounded-inverse corollary, $\pi_1^{-1}:X\to\Gamma(T)$ is bounded, i.e. $x\mapsto(x,Tx)$ is bounded, i.e. $Tx$ depends continuously on $x$ — meaning $T$ is bounded.

**Practical value**: to check $T$ is bounded, one can either (a) directly compute $\|Tx\|\le C\|x\|$ (sometimes hard), or (b) assume $x_n\to x$ and $Tx_n\to y$ and show $y=Tx$ (the closed-graph condition). In many concrete cases — particularly when $T$ is defined implicitly, or via a limiting procedure — the sequential closed-graph check is more tractable than a direct norm estimate.

## Component 4 — Worked Examples

**Example 1 (LO1 — closed graph stated and verified directly, breaking MC-1)**: Let $T:\ell^2\to\ell^2$, $T(x_1,x_2,x_3,\dots)=(x_1,2x_2,3x_3,\dots)$ (scale the $n$-th entry by $n$). Is $T$ bounded? A direct norm estimate: $\|Te_n\|=n\cdot\|e_n\|=n\to\infty$, so $\|T\|=\infty$ — $T$ is NOT bounded. Check the graph condition: take $x^{(k)}\to x$ in $\ell^2$ and $Tx^{(k)}\to y$ in $\ell^2$. Entry-by-entry, $x^{(k)}_n\to x_n$ and $nx^{(k)}_n\to y_n$ — so $y_n=nx_n=(Tx)_n$, meaning $y=Tx$. The GRAPH of $T$ IS closed, yet $T$ is unbounded. This seems to contradict the Closed Graph Theorem — but it does NOT: $T$ is only defined on the subspace $\{x\in\ell^2:T x\in\ell^2\}$ (not all of $\ell^2$), so the domain is NOT the full Banach space $\ell^2$ — the theorem's hypothesis (both spaces Banach, $T$ defined on all of $X$) is not met. This directly shows the "domain = all of X" condition is genuinely necessary.

**Example 2 (LO2 — closed-graph check replaces a direct norm estimate)**: Define $T:C^1([0,1])\to C([0,1])$ by $T(f)=f'$ (differentiation), where $C^1([0,1])$ carries the $C^1$-norm $\|f\|_{C^1}=\|f\|_\infty+\|f'\|_\infty$ and $C([0,1])$ carries the sup norm. Verify $T$ is bounded using the closed-graph check: suppose $f_n\to f$ in $C^1$ and $f_n'\to g$ in $C([0,1])$. Since $C^1$-convergence implies $C^1$-norm convergence of $f_n$, both $f_n\to f$ uniformly and $f_n'\to f'$ uniformly (from the $C^1$ norm). By uniqueness, $g=f'=T(f)$ — the graph is closed. By the Closed Graph Theorem (both $C^1([0,1])$ with the $C^1$ norm and $C([0,1])$ with the sup norm are Banach), $T$ is bounded. One can verify directly: $\|Tf\|_\infty=\|f'\|_\infty\le\|f\|_{C^1}$, so $\|T\|\le1$ — the closed-graph route gets there without finding the sharp bound first.

**Example 3 (LO3 — completeness is essential, breaking MC-2)**: Let $T:C^1([0,1])\to C([0,1])$, $T(f)=f'$, but now equip $C^1([0,1])$ with only the $C^0$-norm $\|f\|_\infty$ (NOT the $C^1$-norm). Then $C^1([0,1])$ with the $C^0$-norm is NOT complete (it is a proper dense subspace of $C([0,1])$). The graph is still closed in the same sequential sense, yet $T$ is NOT bounded in this norm topology (take $f_n(x)=x^n/n$: $\|f_n\|_\infty=1/n\to0$ but $\|f_n'\|_\infty=\|x^{n-1}\|_\infty=1$, so $\|Tf_n\|/\|f_n\|\to\infty$). The closed graph condition can hold for an unbounded operator if the domain space is not complete — exactly what the theorem's hypotheses rule out.

## Component 5 — Teaching Actions

### Teaching Action A01 — Closed Graph as a Sequential Condition, and the Theorem's Statement (Primitive P11: Representation Shift)

State the closed-graph definition as a sequential condition on pairs $(x_n,Tx_n)$. Note that every bounded operator has a closed graph (proving necessity). State the theorem as the surprising converse (sufficiency under completeness). Work Example 1's explicit closed-graph verification, then identify why the theorem does NOT apply there (domain not all of $\ell^2$).

- **MC-1 hook**: ask "if $T$ is defined on a proper subspace of a Banach space (not all of it), does a closed graph still imply boundedness?" — a "yes" answer reveals MC-1 (missing the "defined on all of $X$" hypothesis).

### Teaching Action A02 — Using the Closed Graph Check Instead of a Direct Norm Estimate (Primitive P25: Deductive)

Work Example 2 explicitly: show the closed-graph check (assume $f_n\to f$ in $C^1$, $f_n'\to g$ in $C^0$, conclude $g=f'$) as a complete proof of boundedness, then verify directly that $\|T\|\le1$ for comparison. Emphasize: "when the operator is defined implicitly or via a limiting process, checking $y=Tx$ from convergence of inputs and outputs is often more natural than bounding $\|Tx\|/\|x\|$ from scratch."

### Teaching Action A03 — Completeness Is Essential (Primitive P16: Counterexample)

Work Example 3's counterexample: same operator, same closed graph, but non-complete domain — and the operator fails to be bounded. State: "the Closed Graph Theorem does not say 'closed graph always implies bounded' — it says this only when BOTH spaces are Banach."

- **MC-2 hook**: ask "does a closed graph imply boundedness for linear operators between any two normed spaces, complete or not?" — a "yes" answer reveals MC-2 (missing that completeness is genuinely required for the theorem to fire).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State the Closed Graph Theorem precisely, identifying all hypotheses (spaces, linearity, domain, graph condition) and the conclusion.
  2. For $T:\ell^2\to\ell^2$, $T(x_n)=(x_n/n)$, verify the graph is closed using the sequential definition and apply the theorem to conclude $T$ is bounded. (Here $T$ is defined on all of $\ell^2$, unlike Example 1.)
  3. Explain, using Example 1 or an analogous case, why the "domain is all of $X$" condition cannot be dropped from the theorem.
  4. Explain the proof strategy: why does the projection $\pi_1:\Gamma(T)\to X$ satisfy the hypotheses of the Open Mapping Theorem's bounded-inverse corollary, and how does this yield boundedness of $T$?
- **P76 (Transfer Probe, mode = independence)**: "A physicist defines a linear operator $T$ on a space of wavefunctions (a dense subspace of $L^2$) to another Banach space, claiming it is bounded because 'you can check that if the wavefunctions converge and the outputs converge, the limit of the outputs is the right thing.' (a) Identify which hypothesis of the Closed Graph Theorem is potentially violated by this operator's domain being only a dense subspace, not all of $L^2$. (b) Using this lesson's Example 1, explain why a closed-graph check on a proper subspace does NOT guarantee boundedness. (c) If the physicist can instead show that $T$ extends to a bounded operator on all of $L^2$ (perhaps via density and a uniform norm bound), explain why that argument avoids the gap in the original reasoning."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CLOSED-GRAPH-IMPLIES-BOUNDED-ON-SUBDOMAINS | Believing that a closed graph implies boundedness even when $T$ is only defined on a proper subspace of a Banach space (not on all of $X$), missing the "full-domain" hypothesis | Foundational |
| MC-2 | CLOSED-GRAPH-IMPLIES-BOUNDED-WITHOUT-COMPLETENESS | Believing a closed graph always implies boundedness for linear operators between any normed spaces, missing that completeness of BOTH spaces is required | Foundational |
| MC-3 | CLOSED-GRAPH-CONFUSED-WITH-CONTINUITY-DEFINITION | Believing "closed graph" and "continuous at every point" are the same condition, missing that closed graph is a joint condition on pairs while continuity can be stated one-sidedly | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Closed Graph Implies Bounded on Subdomains") → P41 (detect: present Example 1's operator on its proper domain and ask if the theorem applies) → P64 (conceptual shift: re-identify which hypothesis fails — $T$ is not defined on all of $X$, only on a subspace — and why this matters for the proof via the Open Mapping Theorem).
- **B02 (targets MC-2)**: P27 (name it: "Closed Graph Implies Bounded Without Completeness") → P41 (detect: ask whether the theorem holds for normed, non-Banach spaces) → P64 (conceptual shift: re-walk Example 3's counterexample with $C^1$ under the $C^0$ norm, showing closed graph but unbounded $T$).
- **B03 (targets MC-3)**: P27 (name it: "Closed Graph Confused with Continuity Definition") → P41 (detect: ask whether the closed-graph condition and the definition of continuity are identical) → P64 (conceptual shift: compare — continuity says $x_n\to x\Rightarrow Tx_n\to Tx$; closed graph says additionally $Tx_n\to y\Rightarrow y=Tx$, which is automatic once $Tx_n\to Tx$ and limits are unique — so for everywhere-defined operators the two ARE equivalent, and the theorem precisely encodes this equivalence).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.fnal.open-mapping-theorem` (the bounded-inverse corollary, which the Closed Graph Theorem is proved via — the projection from the graph to $X$ is a bijective bounded operator between Banach spaces, so the inverse is bounded).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 3 with an expert/understand tag and mastery_threshold = 0.75 (MAMR 4/5) places this at the "3 TAs + gate" tier — A01 (stating the theorem and the closed-graph condition), A02 (using the closed-graph check in practice), A03 (completeness counterexample) jointly cover all three LOs, with A04 the mastery gate.
- The proof via the Open Mapping Theorem is sketched at ORIENTATION level (LO1 does not list "reproduce the proof" as an objective) — it is stated in the Core Explanation and referenced in the gate's Problem 4, but not required as a full derivation: the expert/understand bloom tag confirms application and understanding (not proof-production) is the goal.
- Example 1 was deliberately designed as a "LOOKS like the theorem applies, but doesn't" case — the key teaching moment is identifying which hypothesis fails (domain, not completeness), since students frequently encounter unbounded operators with closed graphs (differentiation, multiplication-by-$x$) and must learn to check the full hypothesis list before applying the theorem.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.fnal.open-mapping-theorem`) |
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
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already fluent in Open Mapping Theorem and its bounded-inverse corollary) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
