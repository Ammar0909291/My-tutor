# Teaching Blueprint: Morera's Theorem (`math.cx.morera-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cx.morera-theorem` |
| name | Morera's Theorem |
| domain | Complex Analysis |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 3 |
| requires | `math.cx.cauchy-integral-formula` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert learner already fluent in the Cauchy integral formula; Morera is its converse and is applied immediately as a holomorphicity test |
| description (KG) | Converse of Cauchy's theorem: if f is continuous on a domain D and ∮_T f dz=0 for every triangle T⊂D, then f is holomorphic on D. Used to prove holomorphicity without computing derivatives directly. |

## Component 1 — Learning Objectives

- LO1: State **Morera's Theorem** — if $f$ is continuous on a domain $D$ and $\oint_T f\,dz=0$ for every triangle $T\subset D$, then $f$ is holomorphic on $D$ — and correctly identify it as the **converse of Cauchy's theorem** (Cauchy says holomorphic implies zero triangle integrals; Morera says zero triangle integrals implies holomorphic).
- LO2: Apply Morera's Theorem as a **holomorphicity test**: given a function defined by a limiting process, integral, or series, verify continuity and zero triangle integrals (often by swapping integral/limit signs or using dominated convergence), then conclude holomorphicity without computing a complex derivative directly.
- LO3: Explain the **proof mechanism** — the zero-triangle-integral condition makes $F(z)=\int_{z_0}^z f(w)\,dw$ well-defined (path-independent), so $F$ is an antiderivative of $f$, hence $F$ is holomorphic; since antiderivatives of holomorphic functions are holomorphic and $F'=f$, $f$ is itself holomorphic — recognizing this as the Cauchy integral formula machinery running in reverse.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cx.cauchy-integral-formula` (the Cauchy integral formula, the fact that holomorphic functions have antiderivatives on simply connected domains, and that a function with a holomorphic antiderivative is itself holomorphic).

## Component 3 — Core Explanation

**Cauchy's theorem** says: holomorphic $\Rightarrow$ zero contour integrals. **Morera's theorem** is the converse: zero triangle integrals + continuity $\Rightarrow$ holomorphic. Together they give a characterization of holomorphicity purely in terms of integration.

**Proof of Morera's Theorem**: Fix a base point $z_0\in D$. Since $D$ is connected, define $F(z)=\int_{z_0}^z f(w)\,dw$ along any path from $z_0$ to $z$ in $D$. The zero-triangle-integral hypothesis makes this path-independent (the integral over any two paths differs by an integral over a closed contour, decompensible into triangles, each zero). So $F$ is well-defined. Now check $F'(z)=f(z)$: for small $h$, $\frac{F(z+h)-F(z)}{h}=\frac{1}{h}\int_z^{z+h}f(w)\,dw\to f(z)$ as $h\to0$ (since $f$ is continuous). So $F$ is complex-differentiable with $F'=f$, meaning $F$ is holomorphic. Since $F$ is holomorphic, $F'=f$ is also holomorphic — this final step uses that every holomorphic function is infinitely differentiable (a consequence of the Cauchy integral formula).

**Why this is powerful in practice**: Morera's theorem lets you prove holomorphicity without computing $\lim_{h\to0}(f(z+h)-f(z))/h$ directly. Instead: (1) show $f$ is continuous (usually easy), (2) show triangle integrals vanish (often by swapping an integral or limit). This is the standard technique for proving that:
- integrals $F(z)=\int_a^b g(t,z)\,dt$ are holomorphic in $z$ (swap the order, apply Cauchy to the inner integral),
- uniform limits of holomorphic functions are holomorphic (the triangle integrals pass to the limit by uniform convergence),
- power series are holomorphic inside their radius of convergence.

## Component 4 — Worked Examples

**Example 1 (LO1 — Morera as converse of Cauchy, breaking MC-1)**: Let $f(z)=|z|^2$. Is $f$ holomorphic? Compute $\oint_T|z|^2\,dz$ for the triangle $T$ with vertices $0,1,i$. By Green's theorem, $\oint_T|z|^2\,dz=\iint_{\text{int}(T)}\frac{\partial|z|^2}{\partial\bar{z}}\cdot(-2i)\,dA=\iint(-2i)\bar{z}\,dA\neq0$ (since $\bar{z}\neq0$ on the interior). So the triangle-integral condition FAILS for $f(z)=|z|^2$ — and indeed $|z|^2$ is not holomorphic (Cauchy-Riemann fails). Contrast with $f(z)=z^2$ (holomorphic): Cauchy gives $\oint_T z^2\,dz=0$, and Morera says the zero-integral condition is both necessary and sufficient for holomorphicity.

**Example 2 (LO2 — applying Morera to a parameter integral)**: Define $F(z)=\int_0^\infty e^{-t}t^{z-1}\,dt$ (the Gamma function) for $\mathrm{Re}(z)>0$. Show $F$ is holomorphic. Continuity of $F$ in $z$ follows from dominated convergence ($|e^{-t}t^{z-1}|\le e^{-t}t^{\mathrm{Re}(z)-1}$, integrable). For Morera: $\oint_T F(z)\,dz=\oint_T\int_0^\infty e^{-t}t^{z-1}\,dt\,dz=\int_0^\infty e^{-t}\oint_T t^{z-1}\,dz\,dt$ (swap by Fubini, valid since the integrand is absolutely integrable over $T\times[0,\infty)$). For each fixed $t>0$, $t^{z-1}=e^{(z-1)\log t}$ is entire in $z$, so $\oint_T t^{z-1}\,dz=0$ by Cauchy. Therefore $\oint_T F(z)\,dz=0$ for every triangle. By Morera, $F$ is holomorphic on $\mathrm{Re}(z)>0$.

**Example 3 (LO3 — the antiderivative construction)**: Let $\{f_n\}$ be holomorphic on a domain $D$, converging uniformly to $f$. Morera gives holomorphicity of $f$ in three lines: (1) $f$ is continuous (uniform limit of continuous functions). (2) For any triangle $T\subset D$, $\oint_T f\,dz=\lim_{n\to\infty}\oint_T f_n\,dz=\lim_{n\to\infty}0=0$ (interchange of limit and integral is valid by uniform convergence on the compact triangle boundary). (3) By Morera, $f$ is holomorphic. The underlying proof mechanism — antiderivative construction — is not needed explicitly; instead, Morera's theorem converts a convergence argument into a holomorphicity conclusion without any direct $\varepsilon$-$\delta$ complex-derivative computation.

## Component 5 — Teaching Actions

### Teaching Action A01 — Morera as Exact Converse and Statement (Primitive P11: Representation Shift)

State Morera's theorem side-by-side with Cauchy's theorem (zero integrals ↔ holomorphic), emphasizing the bidirectional characterization. Work Example 1: $|z|^2$ fails the triangle condition and is not holomorphic; $z^2$ passes and is holomorphic.

- **MC-1 hook**: ask "does Morera's theorem require you to check ALL closed contours, or only triangles?" — a "all closed contours" answer reveals MC-1 (missing that triangles suffice — the theorem's hypothesis is only triangular contours, not all closed curves).

### Teaching Action A02 — Applying Morera to Integral-Defined Functions (Primitive P25: Deductive)

Work Example 2 (the Gamma function) explicitly: identify the steps — continuity via dominated convergence, Fubini to swap, inner integral is zero by Cauchy, conclude holomorphicity by Morera. Emphasize: "the entire argument avoids computing $\frac{d}{dz}\int_0^\infty e^{-t}t^{z-1}\,dt$ directly — Morera converts a holomorphicity problem into an integral-vanishing problem."

### Teaching Action A03 — Uniform Limits of Holomorphic Functions Are Holomorphic (Primitive P16: Counterexample)

Work Example 3 (uniform limits). Contrast with real analysis: $f_n(x)=|x|^{1+1/n}$ converges uniformly to $|x|$ on $[-1,1]$, which is NOT differentiable at $0$ — uniform limits of differentiable functions can fail to be differentiable in real analysis. In complex analysis, the exact same situation (uniform limit of holomorphic functions) gives holomorphicity — Morera is the mechanism.

- **MC-2 hook**: ask "in real analysis, does uniform convergence of differentiable functions give a differentiable limit?" — a "yes always" answer reveals MC-2 (missing that the real-analysis analog fails and Morera's theorem is the special complex-analysis fact that makes it true in $\mathbb{C}$).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State Morera's theorem precisely, identifying all hypotheses (continuity, triangle condition, domain type) and the conclusion, and state which theorem it is the converse of.
  2. Let $f_n(z)=z^n/n!$. Show that $f(z)=\sum_{n=0}^\infty z^n/n!=e^z$ is holomorphic on $\mathbb{C}$ using Morera's theorem (the partial sums converge uniformly on every compact set, so apply Morera to the uniform limit).
  3. Define $F(z)=\int_0^1 \frac{1}{t+z}\,dt$ for $z\notin[-1,0]$. Apply Morera's theorem to show $F$ is holomorphic on $\mathbb{C}\setminus[-1,0]$.
  4. Explain the proof of Morera's theorem: why does the zero-triangle-integral condition guarantee that $F(z)=\int_{z_0}^z f(w)\,dw$ is path-independent, and why does this make $f$ holomorphic?
- **P76 (Transfer Probe, mode = independence)**: "In several complex variables, a function $f:\mathbb{C}^n\to\mathbb{C}$ is holomorphic if it is holomorphic in each variable separately — a result known as Hartogs's theorem. (a) Morera's theorem for one complex variable converts an integration condition into a holomorphicity conclusion. Explain informally why an analog of Morera's theorem (integrals over triangles in each coordinate plane vanish) might give a path toward proving holomorphicity in several variables, even though the geometry is higher-dimensional. (b) In real analysis, a function with zero integral over every rectangle is not necessarily smooth. Using Morera's theorem's conclusion, explain what specifically about complex analysis makes the zero-integral hypothesis much stronger than in the real case — and what role the Cauchy integral formula plays as the link between integration and differentiation."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | MORERA-REQUIRES-ALL-CLOSED-CONTOURS | Believing Morera's theorem requires zero integral over every closed contour (not just triangles), missing that the triangle condition alone suffices and is the theorem's actual hypothesis | Moderate |
| MC-2 | UNIFORM-LIMITS-HOLOMORPHIC-OBVIOUS | Believing uniform convergence preserving holomorphicity is obvious or also true in real analysis, missing that Morera's theorem is the key result that makes this uniquely true in complex analysis | Moderate |
| MC-3 | MORERA-IS-DIRECT-COMPUTATION | Believing applying Morera requires computing the complex derivative directly, missing that the whole point is to avoid the derivative and instead verify the triangle-integral condition via swapping/dominated convergence | Foundational |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Morera Requires All Closed Contours") → P41 (detect: ask what the precise hypothesis of Morera's theorem is on the contour integrals) → P64 (conceptual shift: re-state the theorem — triangles only — and explain that the proof works by constructing a path-independent antiderivative, which requires only that triangle integrals vanish, not all closed contours).
- **B02 (targets MC-2)**: P27 (name it: "Uniform Limits Holomorphic Obvious") → P41 (detect: ask whether the analogous statement is true in real analysis) → P64 (conceptual shift: give the real-analysis counterexample $|x|^{1+1/n}\to|x|$ — non-differentiable limit — then explain why Morera's theorem makes complex analysis different: zero triangle integrals pass to the limit by uniform convergence, giving holomorphicity of the limit).
- **B03 (targets MC-3)**: P27 (name it: "Morera Is Direct Computation") → P41 (detect: ask how to apply Morera to an integral-defined function, checking whether the student tries to differentiate under the integral) → P64 (conceptual shift: re-walk Example 2 — the argument uses Fubini + Cauchy, never computing $\frac{d}{dz}\int$; the point of Morera is to REPLACE the derivative computation with an integral-vanishing argument).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cx.cauchy-integral-formula` (the Cauchy integral formula, path-independence of integrals for holomorphic functions, and the fact that a function with a holomorphic antiderivative is itself holomorphic — the machinery Morera's proof runs in reverse).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 3 with an expert/apply tag and mastery_threshold = 0.8 (MAMR 4/5) places this at the "3 TAs + gate" tier — A01 (converse statement), A02 (integral-defined functions), A03 (uniform limits) jointly cover all three LOs.
- The pedagogical heart of this lesson is the APPLICATION pattern: identify continuity → swap integral/limit → inner integral zero by Cauchy → Morera gives holomorphicity. The gate's Problems 2 and 3 both require executing this pattern on unfamiliar functions (not just recognizing the theorem's statement).
- The real-vs-complex contrast on uniform limits (Example 3, A03) is a recurring theme in this domain — Morera is the theorem that makes uniform limits of holomorphic functions holomorphic, while the real-analysis analog fails. Connecting this explicitly to the earlier Cauchy-Goursat equivalence-collapse theme reinforces the cumulative picture of why complex analysis is fundamentally different from real analysis.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.cx.cauchy-integral-formula`) |
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
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already fluent in Cauchy integral formula and contour integration) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
