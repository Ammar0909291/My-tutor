# Teaching Blueprint: Convolution (`math.fnal.convolution`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.fnal.convolution` |
| name | Convolution |
| domain | Functional Analysis |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.meas.lebesgue-integral` |
| unlocks | none |
| cross_links | `math.de.convolution-theorem` (not yet authored), `math.de.fourier-transform` (**authored**) — verified via `ls`; P76_mode = cross-link probe engaging `math.de.fourier-transform`, see Component 7 |
| CPA_entry_stage | C (Concrete) — two indicator functions on unit intervals, before the general Lᵖ theory |
| description (KG) | (f*g)(x) = ∫f(x−y)g(y)dy. Young's inequality: \|f*g\|_r ≤ \|f\|_p\|g\|_q (1/r=1/p+1/q−1). Fourier transform converts convolution to multiplication: ℱ(f*g)=ℱ(f)·ℱ(g). Used in smoothing, differential equations, and signal processing. |

## Component 1 — Learning Objectives

- LO1: Define the **convolution** $(f*g)(x)=\int f(x-y)g(y)\,dy$, compute it directly for a simple pair of functions (the "flip-and-slide" geometric interpretation), and verify $f*g=g*f$ (commutativity, via a change of variables) — despite the asymmetric-looking flip-and-slide picture.
- LO2: State **Young's inequality** $\|f*g\|_r\le\|f\|_p\|g\|_q$ (with $\frac1r=\frac1p+\frac1q-1$) at the level of recognizing what it controls — the convolution's own integrability is governed by the inputs' integrability, in a specific exponent-balancing trade-off — and correctly identify which exponent combination applies in a given scenario.
- LO3 (cross-link probe, engaging `math.de.fourier-transform`): recognize the **convolution theorem** $\mathcal F(f*g)=\mathcal F(f)\cdot\mathcal F(g)$ — convolution in the original domain becomes ORDINARY MULTIPLICATION in the Fourier (frequency) domain — directly reusing that concept's own transform machinery, and recognize why this is an enormously valuable simplification.

## Component 2 — Prerequisite Check

Assumes mastery of `math.meas.lebesgue-integral` (integrating a function against a measure, and the machinery needed to make sense of the convolution integral rigorously).

## Component 3 — Core Explanation

**The convolution, and its commutativity**: $(f*g)(x)=\int f(x-y)g(y)\,dy$ — geometrically, $g$ is held fixed while $f$ is REFLECTED (via $x-y$) and SLID across, multiplied pointwise against $g$, and integrated. Despite this visually asymmetric "flip-and-slide" picture (one function stays put, the other is flipped and shifted), a simple change of variables $u=x-y$ shows $\int f(x-y)g(y)\,dy=\int f(u)g(x-u)\,du=(g*f)(x)$ — convolution is genuinely COMMUTATIVE, $f*g=g*f$, regardless of the asymmetric roles the two functions appear to play in the construction.

**Young's inequality as an integrability trade-off**: $\|f*g\|_r\le\|f\|_p\|g\|_q$, where $\frac1r=\frac1p+\frac1q-1$, expresses that the convolution's own integrability (measured by which $L^r$ space it lands in) is CONTROLLED by the inputs' integrability — weaker assumptions on $f,g$ (larger $p,q$, corresponding to weaker integrability) yield correspondingly weaker (but still meaningful) conclusions about $f*g$. The specific exponent relationship $\frac1r=\frac1p+\frac1q-1$ is not an arbitrary formula — it precisely balances how much integrability each input contributes.

**The convolution theorem — a major simplification (cross-link)**: computing $(f*g)(x)$ directly, per Component 3's own definition, requires evaluating an integral for EVERY value of $x$ — often a genuinely difficult computation. `math.de.fourier-transform`'s machinery gives a dramatically simpler alternative: $\mathcal F(f*g)(\omega)=\mathcal F(f)(\omega)\cdot\mathcal F(g)(\omega)$ — convolution in the original ("time" or "space") domain becomes ORDINARY POINTWISE MULTIPLICATION in the frequency domain. This is precisely why convolution is central to signal processing and differential equations: transform, multiply, and transform back is often far easier than computing the convolution integral directly.

## Component 4 — Worked Examples

**Example 1 (LO1 — direct computation and commutativity, breaking MC-1)**: let $f(x)=g(x)=\mathbf 1_{[0,1]}(x)$ (the indicator of $[0,1]$). Computing $(f*g)(x)=\int f(x-y)g(y)\,dy$: the integrand is nonzero only when BOTH $x-y\in[0,1]$ AND $y\in[0,1]$. For $x\in[0,1]$, the overlap has length $x$, giving $(f*g)(x)=x$; for $x\in[1,2]$, the overlap has length $2-x$, giving $(f*g)(x)=2-x$; else $0$ — the classic "triangle function," peaking at $x=1$. Verifying commutativity directly: substituting $u=x-y$ in the defining integral gives $\int f(x-y)g(y)\,dy=\int f(u)g(x-u)\,du=(g*f)(x)$ — confirming order genuinely doesn't matter, DESPITE $f$ and $g$ playing visually asymmetric roles (one "slides," the other stays fixed) in the flip-and-slide picture.

**Example 2 (LO2 — Young's inequality, exponent relationships, breaking MC-2)**: for the same $f,g$ from Example 1 (both indicator functions, hence bounded and integrable — in both $L^1$ and $L^\infty$), Young's inequality with $p=q=1$ gives $\frac1r=1+1-1=1$, so $r=1$ — predicting $f*g\in L^1$, consistent with the actual triangle function (bounded, compactly supported, genuinely integrable). Using DIFFERENT exponents instead, $p=1,q=\infty$ (f integrable, g merely bounded), gives $\frac1r=1+0-1=0$, so $r=\infty$ — predicting $f*g$ is bounded, a weaker but still meaningful conclusion, even without assuming $g$ itself is integrable at all.

**Example 3 (LO3, cross-link probe — the convolution theorem via Fourier transform, breaking MC-3)**: computing $(f*g)(x)$ directly (Example 1) required a careful piecewise overlap-integral computation. Using `math.de.fourier-transform`'s own machinery instead: $\mathcal F(f*g)(\omega)=\mathcal F(f)(\omega)\cdot\mathcal F(g)(\omega)$ — a SIMPLE pointwise PRODUCT of the two individual transforms, with no convolution-structured integral required at all. For $f=g=\mathbf 1_{[0,1]}$, computing each individual transform (a single, simpler integral each) and then just multiplying them together recovers the same information as the harder direct convolution computation — illustrating exactly why the convolution theorem is so valuable: it replaces a genuinely hard integral (convolution) with easy pointwise multiplication, after paying the one-time cost of transforming.

## Component 5 — Teaching Actions

### Teaching Action A01 — Convolution Is Commutative, Despite the Asymmetric Picture (Primitive P11: Representation Shift)

State: "the flip-and-slide picture LOOKS asymmetric — one function is held fixed, the other flipped and slid — but a simple change of variables proves the order never actually matters." Work Example 1's direct commutativity verification.

- **MC-1 hook**: ask "could $f*g$ and $g*f$ be genuinely different functions, given how asymmetric the flip-and-slide construction looks?" — a "yes" answer reveals MC-1 (missing that a change of variables proves $f*g=g*f$ always, regardless of the asymmetric-looking picture).

### Teaching Action A02 — Young's Inequality's Exponent Relationship Is a Genuine Trade-Off (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: two different exponent choices ($p=q=1$ vs. $p=1,q=\infty$) produce two different, correctly-computed conclusions ($r=1$ vs. $r=\infty$) about the SAME convolution. State: "the relationship $\frac1r=\frac1p+\frac1q-1$ isn't an arbitrary formula — it precisely balances how much integrability each input contributes to the output."

- **MC-2 hook**: ask "is Young's inequality's exponent relationship an arbitrary formula, or does it express a genuine, checkable trade-off between the inputs' integrability?" — an "arbitrary formula" answer reveals MC-2 (missing that the specific exponent relationship reflects a real, derivable trade-off).

### Teaching Action A03 — The Convolution Theorem Is a Genuine Simplification, Not a Curiosity (Primitive P06: Contrast Pair)

Contrast Example 1's harder, piecewise-overlap direct computation against Example 3's simpler transform-then-multiply route to the same information. State: "this isn't a computational curiosity — it's precisely why convolution is central to signal processing: transforming once, multiplying, and transforming back is often far easier than the direct integral."

- **MC-3 hook**: ask "is the convolution theorem mostly a computational curiosity with limited practical value, or does it provide a genuine, often dramatic simplification?" — a "curiosity" answer reveals MC-3 (missing the theorem's real practical value as a simplification strategy).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute $(f*g)(x)$ directly for $f(x)=g(x)=\mathbf 1_{[0,2]}(x)$ (0 elsewhere), identifying the resulting piecewise "triangle-like" function.
  2. Verify $f*g=g*f$ for the functions in problem 1 by checking that your answer doesn't depend on which function you call $f$ versus $g$.
  3. For $f\in L^2$ and $g\in L^2$ (so $p=q=2$), use Young's inequality to determine what integrability class $r$ the convolution $f*g$ belongs to.
  4. Explain, in your own words, why computing $\mathcal F(f*g)=\mathcal F(f)\cdot\mathcal F(g)$ is often much easier than directly computing the convolution integral, referencing this lesson's contrast.
- **P76 (Transfer Probe, mode = cross-link probe, engaging `math.de.fourier-transform`)**: "An audio engineer wants to apply a smoothing filter to a noisy signal $f(t)$, modeled as computing $(f*g)(t)$ where $g$ is a chosen smoothing kernel. (a) Using `math.de.fourier-transform`'s own transform machinery, explain the two-step strategy (transform, then what operation, then transform back) that avoids directly computing the convolution integral. (b) If the engineer already knows $\mathcal F(f)(\omega)$ and $\mathcal F(g)(\omega)$ individually, explain exactly what single operation combines them to get $\mathcal F(f*g)(\omega)$. (c) Explain why this two-step strategy is especially valuable in signal processing, where signals are processed by many successive filters (many successive convolutions) — referencing what would happen to the total computational effort if each filter required a fresh direct convolution integral versus a single multiplication in the frequency domain."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CONVOLUTION-ASSUMED-NON-COMMUTATIVE | Believing $f*g$ and $g*f$ could be different, given the visually asymmetric flip-and-slide construction, missing that a change of variables proves commutativity always | Foundational |
| MC-2 | YOUNGS-INEQUALITY-EXPONENTS-ASSUMED-ARBITRARY | Believing Young's inequality's exponent relationship is an arbitrary formula to memorize, missing that it expresses a genuine, checkable integrability trade-off | High |
| MC-3 | CONVOLUTION-THEOREM-ASSUMED-MERE-CURIOSITY | Believing the convolution theorem is a computational curiosity with limited practical value, missing that it provides a genuine, often dramatic simplification strategy | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Convolution Assumed Non-Commutative") → P41 (detect: ask whether $f*g$ and $g*f$ could differ given the asymmetric flip-and-slide picture) → P64 (conceptual shift: re-walk Example 1's change-of-variables proof, re-anchoring on "the order never actually matters, despite how the construction looks").
- **B02 (targets MC-2)**: P27 (name it: "Young's Inequality Exponents Assumed Arbitrary") → P41 (detect: ask whether the exponent relationship $1/r=1/p+1/q-1$ is arbitrary) → P64 (conceptual shift: re-walk Example 2's two exponent-choice scenarios, re-anchoring on "this precisely balances each input's integrability contribution").
- **B03 (targets MC-3)**: P27 (name it: "Convolution Theorem Assumed Mere Curiosity") → P41 (detect: ask whether the convolution theorem is mostly a computational curiosity) → P64 (conceptual shift: re-walk Example 3's harder-direct-computation-vs-easier-transform contrast, re-anchoring on "this is a genuine, often dramatic practical simplification").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.meas.lebesgue-integral` (the integration machinery underlying the convolution integral's rigorous definition).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.de.convolution-theorem` (checked via `ls`, confirmed NOT YET authored) and `math.de.fourier-transform` (checked via `ls`, confirmed AUTHORED). $P76_{mode}=$ **cross-link probe**, engaging `math.de.fourier-transform` directly (that concept's own transform machinery is cited and applied throughout Example 3 and the P76 transfer probe).

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/apply tag supports the full "3 TAs + gate" tier, with LO1 and LO2 at full computational depth (a genuine piecewise convolution computation with commutativity verification, and two correctly-worked Young's-inequality exponent scenarios) and LO3 built as a cross-link probe against the single authored cross-subject target, consistent with this corpus's established single-cross-link-probe pattern.
- **Division of labor**: `math.meas.lebesgue-integral` owns the general integration machinery; `math.de.fourier-transform` owns the transform itself and its differentiation-to-multiplication property. This concept owns the SPECIFIC convolution operation, its structural properties (commutativity, Young's inequality), and — via the cross-link — its relationship to the Fourier transform, deliberately reusing the SAME indicator-function pair across all three examples so the direct computation (Example 1), the integrability analysis (Example 2), and the transform shortcut (Example 3) all describe facts about one concrete, fully-worked object.
- Example 3's deliberate reuse of Example 1's harder direct computation (rather than a fresh, unrelated example) was chosen specifically to make the convolution theorem's practical value concrete and comparative, rather than asserting the simplification abstractly.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.de.convolution-theorem` unauthored, `math.de.fourier-transform` authored → cross-link probe engaging the authored target) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: two indicator functions on unit intervals, before the general Lᵖ theory) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
