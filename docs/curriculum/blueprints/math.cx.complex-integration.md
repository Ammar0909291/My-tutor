# Teaching Blueprint: Complex Line Integral (`math.cx.complex-integration`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cx.complex-integration` |
| name | Complex Line Integral |
| domain | Complex Analysis |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.cx.analytic-functions`, `math.calc.line-integrals` |
| unlocks | `math.cx.cauchy-theorem` |
| cross_links | `math.calc.line-integrals` (**authored** — verified via `ls`; P76_mode = cross-link probe, see Component 7) |
| CPA_entry_stage | A (Abstract) — direct definition, grounded immediately in the already-known real vector line integral |
| description (KG) | ∫_C f(z)dz = ∫_a^b f(γ(t))γ′(t)dt for a piecewise C¹ curve γ:[a,b]→ℂ. Satisfies linearity and reversal of path. Estimation lemma: |∫_C f dz| ≤ max|f|·length(C). |

## Component 1 — Learning Objectives

- LO1: Compute a **complex line integral** $\int_C f(z)\,dz$ for a piecewise $C^1$ curve $\gamma:[a,b]\to\mathbb{C}$, by substituting the parametrization: $\int_C f(z)\,dz = \int_a^b f(\gamma(t))\gamma'(t)\,dt$, reducing to an ordinary (complex-valued) single-variable integral.
- LO2: State and apply the complex line integral's **linearity** ($\int_C(af+bg)\,dz = a\int_Cf\,dz+b\int_Cg\,dz$) and **reversal-of-path** property ($\int_{-C}f\,dz = -\int_Cf\,dz$), correctly recognizing these mirror the analogous properties of the real vector line integral already studied.
- LO3: State and apply the **Estimation Lemma** ($|\int_C f\,dz| \leq \max_{z\in C}|f(z)|\cdot\text{length}(C)$) as a practical BOUND on a complex integral's magnitude, without needing to compute the integral exactly — and correctly recognize this gives an upper bound only, not the integral's actual value.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cx.analytic-functions` (holomorphic functions, complex differentiability) and `math.calc.line-integrals` (the real vector line integral $\int_C\mathbf{F}\cdot d\mathbf{r}$, its parametrization-based computation, linearity, and path-reversal sign-flip behavior — this concept directly generalizes those ideas to complex-valued integrands).

## Component 3 — Core Explanation

The **complex line integral** of $f$ along a piecewise $C^1$ curve $\gamma:[a,b]\to\mathbb{C}$ is:
$$\int_C f(z)\,dz = \int_a^b f(\gamma(t))\,\gamma'(t)\,dt$$
— substitute the parametrization $z=\gamma(t)$, replace $dz$ with $\gamma'(t)\,dt$, and evaluate the resulting ordinary (complex-valued) integral over the real parameter $t$.

**Linearity**: $\int_C (af(z)+bg(z))\,dz = a\int_C f\,dz + b\int_C g\,dz$ for complex constants $a,b$ — directly analogous to (and provable the same way as) the real line integral's own linearity.

**Reversal of path**: $\int_{-C} f\,dz = -\int_C f\,dz$ — reversing the curve's direction flips the sign, exactly mirroring the VECTOR (not scalar) real line integral's behavior, since $\gamma'(t)$ (like $\mathbf{r}'(t)$ in the real case) flips sign under reversed parametrization.

**The Estimation Lemma**: 
$$\left|\int_C f(z)\,dz\right| \leq \max_{z\in C}|f(z)| \cdot \text{length}(C)$$
This gives an UPPER BOUND on the integral's magnitude — extremely useful for proving an integral is SMALL (or vanishes in a limit) without computing it exactly, but it is genuinely only a bound, never the integral's actual value (which could be much smaller than the bound, or even zero, despite a nonzero bound).

## Component 4 — Worked Examples

**Example 1 (LO1 — computing directly via parametrization)**: Compute $\int_C z^2\,dz$ where $C$ is the straight segment from $0$ to $1+i$. Parametrize: $\gamma(t)=t(1+i)$ for $t\in[0,1]$, so $\gamma'(t)=1+i$. $\int_0^1 [t(1+i)]^2 (1+i)\,dt = (1+i)^3\int_0^1 t^2\,dt = (1+i)^3\cdot\frac13$. Compute $(1+i)^2=2i$, so $(1+i)^3=(1+i)(2i)=2i+2i^2=2i-2=-2+2i$. Result: $\frac{-2+2i}{3}$.

**Example 2 (LO2 — linearity and path reversal, breaking MC-1)**: Given $\int_C z\,dz = \frac{(1+i)^2}{2}=i$ (a known result along the segment from Example 1), compute $\int_{-C}z\,dz$ (the SAME segment reversed, from $1+i$ to $0$). By the reversal property: $\int_{-C}z\,dz = -\int_C z\,dz = -i$. A student attempting to instead recompute this from scratch by naively re-parametrizing $\gamma(t)=(1+i)(1-t)$ and evaluating directly would (correctly, if done carefully) arrive at the SAME answer $-i$ — confirming the reversal rule as a genuine shortcut, not a separate fact requiring independent verification each time.

**Example 3 (LO3 — the Estimation Lemma as a bound only, breaking MC-2)**: Bound $\left|\int_C \frac{1}{z}\,dz\right|$ where $C$ is the upper half of the unit circle from $1$ to $-1$ (length $=\pi$, since it's half the circumference $2\pi$ of the unit circle). On $C$, $|z|=1$ (the unit circle), so $\left|\frac{1}{z}\right|=1$ everywhere on $C$ — thus $\max_{z\in C}|f(z)|=1$. Estimation Lemma: $\left|\int_C\frac1z\,dz\right| \leq 1\cdot\pi=\pi$. (The ACTUAL value of this integral, computable by other means beyond this concept's scope, is $i\pi$ — with magnitude exactly $\pi$, showing the bound happens to be tight here; but the Estimation Lemma ITSELF never guarantees tightness, only an upper limit — a DIFFERENT integrand could have an actual magnitude far below its own Estimation Lemma bound.)

## Component 5 — Teaching Actions

### Teaching Action A01 — Computing via Parametrization, Grounded in the Real Line Integral (Primitive P11: Representation Shift)

Recall the real vector line integral's parametrization-based computation from `math.calc.line-integrals`. State: "the complex line integral follows the IDENTICAL recipe — parametrize, substitute, reduce to an ordinary integral over $t$ — just with complex-valued functions and $\gamma'(t)$ in place of the real case's $\mathbf{r}'(t)$." Work Example 1's full computation explicitly.

Shift representation to linearity and reversal: state both properties, connecting them directly back to the real line integral's own analogous behaviors (recall: the VECTOR line integral flips sign under reversal, while the SCALAR one does not — the complex line integral behaves like the vector case, since $dz=\gamma'(t)\,dt$ retains directional information).

- **MC-1 hook**: ask "since the reversal property is just a shortcut, wouldn't it be safer to always recompute a reversed-path integral from scratch, just to double-check?" — while not strictly a misconception in the sense of being WRONG, probe whether the student recognizes the reversal rule as a PROVEN, reliable shortcut (matching Example 2's confirmation) rather than something needing independent re-verification every time, revealing MC-1 if they express genuine uncertainty about trusting it.

### Teaching Action A02 — The Estimation Lemma as a Bound, Not an Exact Value (Primitive P06: Contrast Pair)

**Contrast 1**: Work Example 3's Estimation Lemma bound computation explicitly, then reveal (for context/orientation, not derivation) that the true value has magnitude exactly matching the bound here — but immediately emphasize that this EXACT MATCH is a special feature of this particular example, not a general guarantee.

**Contrast 2 (targets MC-2)**: Present a hypothetical (or previously computed) integral where the Estimation Lemma's bound is much LARGER than the integral's actual computed magnitude — ask "does this mean the Estimation Lemma was wrong?" — state clearly: "no — the lemma promises only an UPPER BOUND, never a guarantee of tightness. It's an extremely useful tool for proving an integral is small or vanishes (e.g., in limiting arguments central to later theorems), precisely because it doesn't require computing the integral exactly — but it should never be mistaken for the integral's actual value."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute $\int_C z\,dz$ where $C$ is the straight segment from $0$ to $2i$.
  2. Given $\int_C f(z)\,dz = 3-2i$ for some curve $C$, find $\int_{-C}f(z)\,dz$ using the reversal property.
  3. Given $g,h$ with $\int_C g\,dz=1+i$ and $\int_C h\,dz=2-i$, find $\int_C(3g-2h)\,dz$ using linearity.
  4. Use the Estimation Lemma to bound $\left|\int_C e^{iz}\,dz\right|$ where $C$ is the segment from $0$ to $2$ on the real axis (hint: find $\max|e^{iz}|$ on this segment, and the segment's length).
- **P76 (Transfer Probe, mode = cross-link probe against `math.calc.line-integrals`)**: "Recall from your `math.calc.line-integrals` lesson that the VECTOR line integral $\int_C\mathbf{F}\cdot d\mathbf{r}$ flips sign under path reversal ($\int_{-C}\mathbf{F}\cdot d\mathbf{r}=-\int_C\mathbf{F}\cdot d\mathbf{r}$), while the SCALAR line integral $\int_C f\,ds$ does not, because $ds=\|\mathbf{r}'(t)\|\,dt$ is built from a norm (direction-independent) while $d\mathbf{r}=\mathbf{r}'(t)\,dt$ retains the actual vector (direction-dependent). (a) Using this exact reasoning, explain why the complex line integral $\int_C f(z)\,dz$ — built from $dz=\gamma'(t)\,dt$ — behaves like the VECTOR case (flips sign under reversal) rather than the scalar case. (b) Is there an analogous 'complex SCALAR line integral' built from something like $|\gamma'(t)|\,dt$ (an arc-length-style element) that would NOT flip sign the way $\int_C f\,dz$ does? Explain briefly why such an object could in principle be defined (even though it's not the standard complex line integral this lesson focuses on), by direct analogy with the real scalar case."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | REVERSAL-PROPERTY-NOT-TRUSTED-AS-RELIABLE-SHORTCUT | Treating the reversal-of-path property as needing independent re-verification each time rather than a proven, reliable shortcut always safe to apply directly | Minor |
| MC-2 | ESTIMATION-LEMMA-BOUND-MISTAKEN-FOR-EXACT-VALUE | Believing the Estimation Lemma's upper bound IS the integral's actual value, rather than recognizing it only guarantees an upper limit that may or may not be tight | Foundational |
| MC-3 | MAX-OF-F-ON-C-COMPUTED-INCORRECTLY | When applying the Estimation Lemma, incorrectly computing $\max_{z\in C}|f(z)|$ — e.g. evaluating $|f|$ at only the curve's endpoints rather than checking its behavior across the ENTIRE curve | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Reversal Property Distrust") → P41 (detect: ask a student whether they'd trust the reversal shortcut or insist on recomputing from scratch) → P64 (conceptual shift: work through Example 2's confirmation that recomputing from scratch gives the identical answer, building confidence in the shortcut's reliability).
- **B02 (targets MC-2)**: P27 (name it: "Estimation Lemma Bound as Exact Value") → P41 (detect: ask whether the Estimation Lemma's computed bound IS the integral's value) → P64 (conceptual shift: re-anchor on "the lemma gives an upper LIMIT only — the actual value could be smaller, even zero, regardless of what the bound computes to").
- **B03 (targets MC-3)**: P27 (name it: "Max-of-f-on-C Miscomputed") → P41 (detect: check whether a student's Estimation Lemma application correctly searches $|f(z)|$ across the WHOLE curve, not just its endpoints) → P64 (conceptual shift: re-derive by explicitly checking $|f(z)|$ at several points along $C$, including any interior extremum, before concluding the maximum).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cx.analytic-functions` (holomorphic functions, the typical integrands this concept and its successor theorems concern), `math.calc.line-integrals` (the real vector line integral, whose parametrization-based computation, linearity, and reversal properties this concept directly generalizes).
- **Unlocks**: `math.cx.cauchy-theorem` (Cauchy's Theorem, the foundational result of complex analysis, is stated directly in terms of this concept's complex line integral).
- **Cross-link**: KG lists `math.calc.line-integrals` as a cross-link. Verified via directory listing that `docs/curriculum/blueprints/math.calc.line-integrals.md` **is already authored** (authored earlier in this same batch — confirmed: the scalar-vs-vector line integral distinction, with $ds$ built from a norm versus $d\mathbf{r}$ retaining direction, and the corresponding reversal-behavior difference). The P76 transfer probe above directly requires the learner to transfer that exact scalar/vector structural reasoning to explain why the complex line integral behaves like the VECTOR case — the seventh instance in this corpus of a genuine, content-verified cross-link probe, and the first case where the cross-link target was authored earlier in the SAME batch as the referencing concept.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/apply tag places this at the "2 main TAs + gate" tier — A01 (computing via parametrization, grounded directly in the real line integral) and A02 (the Estimation Lemma as a bound, not an exact value) jointly cover all three LOs.
- This blueprint was deliberately authored immediately after `math.calc.line-integrals` within the same batch specifically so its cross-link reference could be genuine and content-verified rather than deferred to independence mode — the topological ordering of this batch's three concepts (second-order-linear ODE, then real line integrals, then complex line integrals) was itself determined by the standing ROI-ranked ready-check procedure, which happened to place the prerequisite immediately before its dependent this time.
- MC-2 (Estimation Lemma bound mistaken for exact value) was given Foundational severity specifically because Example 3 was deliberately constructed as a case where the bound happens to be EXACTLY tight — a pedagogically risky choice that could reinforce the misconception if not explicitly flagged (as done in A02 Contrast 1's immediate caveat) — this tightness was chosen anyway because it is the single most standard textbook Estimation Lemma example, and addressing the tightness-is-not-guaranteed caveat directly, rather than avoiding the example, was judged more valuable than picking an artificially loose bound that might seem contrived.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.calc.line-integrals` confirmed present → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe, genuine structural transfer) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract, grounded directly in known real line integral) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
