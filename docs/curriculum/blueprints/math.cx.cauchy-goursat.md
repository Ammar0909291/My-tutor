# Teaching Blueprint: Cauchy-Goursat Theorem (`math.cx.cauchy-goursat`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cx.cauchy-goursat` |
| name | Cauchy-Goursat Theorem |
| domain | Complex Analysis |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 4 |
| requires | `math.cx.cauchy-theorem` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert learner already fluent in Cauchy's theorem; Goursat's contribution is a hypothesis-weakening whose proof is an intricate estimation |
| description (KG) | Goursat's key insight: Cauchy's theorem holds without assuming f′ is continuous (only that f′ exists). The proof triangulates the region and uses a delicate estimation argument. This makes the theorem apply to all holomorphic functions. |

## Component 1 — Learning Objectives

- LO1: State the **Cauchy-Goursat theorem** — if $f$ is holomorphic on a simply connected domain $D$ (meaning $f'$ exists throughout $D$, with NO additional assumption that $f'$ is continuous), then $\oint_C f\,dz=0$ for every closed contour $C$ in $D$ — and correctly identify the WEAKENED hypothesis compared to the version of Cauchy's theorem requiring continuous $f'$.
- LO2: Explain Goursat's proof strategy — **triangulate** the region, apply an estimation argument showing that any supposition of nonzero integral leads to an infinite sequence of triangles with a contradiction at the limit point — recognizing this as a compactness argument rather than an algebraic calculation.
- LO3: Explain why the Cauchy-Goursat theorem completes the equivalence: **holomorphic** (complex-differentiable, no continuity assumption on $f'$) $\Leftrightarrow$ **analytic** (equals its own Taylor series) $\Leftrightarrow$ **satisfies $\oint_C f\,dz=0$** — recognizing this as the foundational collapse that makes complex analysis so powerful.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cx.cauchy-theorem` (Cauchy's theorem for continuously differentiable functions, contour integrals, holomorphic functions).

## Component 3 — Core Explanation

**The classical Cauchy's theorem** (already established) assumes $f'$ is CONTINUOUS on the domain — this allows a proof via Green's theorem in the plane, converting the contour integral to a double integral of the Cauchy-Riemann equations. **Goursat's observation**: the continuity of $f'$ is not needed — holomorphicity alone ($f'$ merely exists) suffices. This seems subtle: if $f'$ is just assumed to exist at every point, without continuity, can we still conclude $\oint f\,dz=0$?

**Goursat's proof strategy (triangulation)**: suppose for contradiction that $\oint_T f\,dz=I\neq0$ for some triangle $T$. Subdivide $T$ into four equal subtriangles by connecting midpoints. By the triangle inequality, one of the four subtriangles, call it $T_1$, satisfies $|\oint_{T_1}f\,dz|\ge|I|/4$. Repeat, getting $T_1\supset T_2\supset\cdots$ with $|\oint_{T_n}f\,dz|\ge|I|/4^n$. These nested triangles converge to a single point $z_0$ (compactness). At $z_0$, since $f'(z_0)$ exists: $f(z)=f(z_0)+f'(z_0)(z-z_0)+o(|z-z_0|)$. The integrals of the first two terms over a closed triangle are zero (they are analytic — polynomials). The error term $o(|z-z_0|)$ over $T_n$ (diameter $\to0$) gives $|\oint_{T_n}f\,dz|\le o(\mathrm{diam}(T_n))\cdot\mathrm{perimeter}(T_n)=o(\mathrm{diam}(T_n)^2)$, which shrinks faster than $|I|/4^n\sim C\cdot(\mathrm{diam}(T_n))^2$ — contradiction. So $I=0$, as claimed.

**Why this matters**: the Cauchy-Goursat theorem makes all three characterizations of "niceness" in complex analysis EQUIVALENT: holomorphic (complex derivative exists) $\Leftrightarrow$ analytic (equal to its Taylor series) $\Leftrightarrow$ contour-integral-zero (Cauchy property). In real analysis, differentiable does NOT imply $C^\infty$ — these are strictly different classes. In complex analysis, they collapse to ONE thing. Goursat's theorem is the crucial step that makes this collapse possible without assuming $f'$ is continuous.

## Component 4 — Worked Examples

**Example 1 (LO1 — the hypothesis weakening matters, breaking MC-1)**: Consider the function $f(z)=\overline{z}$ (complex conjugate). This function is NOT holomorphic anywhere — the Cauchy-Riemann equations fail ($\partial_x u=1$ but $\partial_y v=-1$, so $\partial_x u\neq\partial_y v$). For the unit circle $C$: $\oint_C\overline{z}\,dz=\oint_C e^{-i\theta}ie^{i\theta}\,d\theta=i\cdot2\pi\neq0$. Now compare with $f(z)=z^2$ (holomorphic): $\oint_C z^2\,dz=0$ by Cauchy-Goursat. The distinction is holomorphicity — the Cauchy-Goursat theorem applies to $z^2$ (complex derivative exists everywhere, NO continuity assumption needed) and yields zero integral; it does NOT apply to $\overline{z}$ (not holomorphic) and the integral is indeed nonzero.

**Example 2 (LO2 — Goursat's triangulation argument at orientation level)**: Triangulate the unit disk into small triangles $\{T_k\}$; the sum of contour integrals over the boundaries equals $\oint_C f\,dz$ (interior edges cancel). If Goursat's argument gives $\oint_{\partial T_k}f\,dz=0$ for EVERY triangle (which it does for holomorphic $f$ by the triangulation proof), then summing gives $\oint_C f\,dz=0$ for the outer contour. The key step: at each limit point $z_0$, the existence of $f'(z_0)$ (even without continuity) provides a local linear approximation that integrates to zero over tiny triangles. Compactness (the nested intersection of triangles converges to a point) is what turns "local approximation" into a global conclusion.

**Example 3 (LO3 — the equivalence chain, breaking MC-2)**: Let $f(z)=e^z$. Is $f$ holomorphic? Yes — $f'(z)=e^z$ exists everywhere and is itself holomorphic (so $f'$ IS continuous, but Cauchy-Goursat doesn't REQUIRE this). Is $f$ analytic? Yes — the Taylor series $\sum z^n/n!$ converges everywhere to $e^z$. Does $\oint_C f\,dz=0$ for every closed curve in $\mathbb{C}$? Yes, by Cauchy-Goursat. These three properties are not just simultaneously true for $e^z$ — they are EQUIVALENT for any function on a simply connected domain, and Cauchy-Goursat is the theorem that closes the equivalence by removing the $C^1$ assumption from the Cauchy-theorem direction.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Weakened Hypothesis and Why It Matters (Primitive P11: Representation Shift)

State: "the classical Cauchy theorem (already established) assumed $f'$ continuous — Goursat proved this assumption is redundant, that holomorphicity alone suffices." Work Example 1: $\overline{z}$ (not holomorphic) fails Cauchy; $z^2$ (holomorphic, no continuity required) passes. Emphasize: "this is NOT obvious — in real analysis, differentiable does not imply continuously differentiable."

- **MC-1 hook**: ask "does the classical Cauchy theorem already apply to all holomorphic functions, or does it require the extra assumption that $f'$ is continuous?" — a "no extra assumption needed" answer reveals MC-1 (missing that the classical theorem had an additional $C^1$ hypothesis that Goursat's work removed).

### Teaching Action A02 — Goursat's Proof: Triangulation and Compactness (Primitive P25: Deductive)

Walk through Goursat's proof structure at orientation level: triangulate, select the bad subtriangle at each stage, use nested-intersection to get a limit point, apply local linear approximation from holomorphicity, derive contradiction with the assumed nonzero integral. Emphasize: "the proof uses compactness of a triangle (nested closed sets converge) and only the existence of $f'(z_0)$, not its continuity."

### Teaching Action A03 — The Equivalence Collapse in Complex Analysis (Primitive P37: Classify)

Present the triple equivalence (holomorphic $\Leftrightarrow$ analytic $\Leftrightarrow$ zero integrals) and contrast with real analysis (differentiable $\not\Rightarrow$ $C^\infty$ $\not\Rightarrow$ analytic). Work Example 3's $e^z$. State: "Cauchy-Goursat is the theorem that makes complex analysis fundamentally different from real analysis — it is the step that makes these three distinct-looking properties collapse into one."

- **MC-2 hook**: ask "in complex analysis, does holomorphic automatically imply analytic (equal to its Taylor series), or is this a separate, stronger property requiring an additional assumption?" — a "separate stronger property" answer reveals MC-2 (missing that the Cauchy-Goursat theorem and its consequences make holomorphic and analytic equivalent).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State the Cauchy-Goursat theorem, identifying precisely what hypothesis it WEAKENS compared to the classical Cauchy theorem.
  2. For $f(z)=1/(z-i)$ on the domain $D=\{z:\mathrm{Im}(z)>0\}$ (upper half-plane): is $f$ holomorphic on $D$? Does Cauchy-Goursat apply for closed contours entirely in $D$? Compute $\oint_C f\,dz$ for a triangular contour in $D$.
  3. Describe Goursat's proof strategy in your own words — what is the key compactness argument, and at what point does holomorphicity (existence of $f'$, not continuity) enter?
  4. Explain why holomorphic implies analytic in complex analysis, via the Cauchy-Goursat → Cauchy integral formula → Taylor series chain of deductions.
- **P76 (Transfer Probe, mode = independence)**: "A student working in several complex variables notices that for functions $f:\mathbb{C}^n\to\mathbb{C}$ with $n>1$, holomorphicity (existence of complex partial derivatives in each variable separately) also implies analyticity — a phenomenon called Hartogs's theorem. (a) Using this lesson's equivalence collapse, explain why the analogy 'holomorphic $\Leftrightarrow$ analytic' is not surprising in $\mathbb{C}^n$ given that it already holds in $\mathbb{C}^1$ via Cauchy-Goursat. (b) In real analysis, $f:\mathbb{R}^n\to\mathbb{R}$ with all partial derivatives existing does NOT imply $f$ is differentiable (let alone analytic). Using the contrast established in this lesson, explain what specifically makes complex differentiability stronger than real partial differentiability — and why the Cauchy-Riemann equations are central to that gap."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CLASSICAL-CAUCHY-ALREADY-REQUIRES-NO-CONTINUITY | Believing the classical Cauchy theorem already applies to all holomorphic functions (with no continuity-of-$f'$ assumption), missing that Goursat's theorem is a genuine strengthening that removed a nontrivial extra hypothesis | Foundational |
| MC-2 | HOLOMORPHIC-AND-ANALYTIC-ARE-DIFFERENT-CLASSES | Believing holomorphic (complex-differentiable) and analytic (equals its Taylor series) are different classes of complex functions, requiring separate assumptions, missing the equivalence collapse that Cauchy-Goursat enables | Foundational |
| MC-3 | GOURSAT-PROOF-IS-ALGEBRAIC | Believing Goursat's proof is an algebraic manipulation (like the Green's-theorem proof), missing that it is a compactness/estimation argument using nested triangles and the local linear approximation from holomorphicity | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Classical Cauchy Already Requires No Continuity") → P41 (detect: ask what hypothesis Goursat's theorem weakens from the classical Cauchy theorem, checking whether the student identifies the $C^1$ assumption) → P64 (conceptual shift: re-state the classical Cauchy theorem's hypothesis list explicitly, then show Goursat's is strictly shorter — $f'$ merely exists, no continuity required).
- **B02 (targets MC-2)**: P27 (name it: "Holomorphic and Analytic Are Different Classes") → P41 (detect: ask whether there is a holomorphic function that is NOT analytic in complex analysis) → P64 (conceptual shift: re-present the equivalence chain — Cauchy-Goursat → integral formula → Taylor series — as the precise sequence of deductions that makes them equivalent, with no additional hypothesis needed beyond holomorphicity).
- **B03 (targets MC-3)**: P27 (name it: "Goursat Proof Is Algebraic") → P41 (detect: ask how Goursat's proof works, checking for "Green's theorem" or "algebraic manipulation" instead of triangulation and compactness) → P64 (conceptual shift: re-walk the nested-triangle structure — subdivide, select bad subtriangle, iterate, take limit point, apply local approximation, derive contradiction).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cx.cauchy-theorem` (Cauchy's theorem in its classical form, contour integrals, holomorphic functions — the theorem this concept weakens the hypothesis of).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 4 with an expert/understand tag and mastery_threshold = 0.8 (MAMR 4/5) places this at the "3 TAs + gate" tier — A01 (hypothesis weakening), A02 (Goursat's triangulation argument), A03 (equivalence collapse) jointly cover all three LOs.
- Goursat's proof is presented at ORIENTATION level, not reproduced in full — the expert/understand bloom tag confirms the target is understanding the argument's logic (triangulation, compactness, local approximation) rather than writing it out with all $\varepsilon$-$\delta$ details. The gate's Problem 3 asks for the proof strategy in the student's own words, not a formal derivation.
- The real-vs-complex contrast (differentiable in $\mathbb{R}$ vs. holomorphic in $\mathbb{C}$) is the conceptual core of this lesson — explicitly making students articulate WHY the equivalence collapse is surprising and why it is specific to complex analysis.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.cx.cauchy-theorem`) |
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
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already fluent in Cauchy's theorem and contour integration) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
