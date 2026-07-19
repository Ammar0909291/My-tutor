# Teaching Blueprint: Fourier Series (Introduction) (`math.calc.fourier-series-intro`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.fourier-series-intro` |
| name | Fourier Series (Introduction) |
| domain | Calculus |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.7 → MAMR = ⌈0.7×5⌉ = 4/5 |
| estimated_hours | 12 |
| requires | `math.calc.definite-integral`, `math.trig.trig-functions`, `math.seq.series` |
| unlocks | `math.de.heat-equation` |
| cross_links | `math.de.heat-equation`, `math.fnal.hilbert-space` |
| CPA_entry_stage | A (Abstract) — expert-tier learner already fluent in all three prerequisites; the Fourier series is introduced directly as an infinite trigonometric series with coefficients determined by orthogonality |
| description (KG) | Representing a periodic function as a sum of sines and cosines: f(x) = a₀/2 + Σ(aₙcos(nx) + bₙsin(nx)); coefficients given by orthogonality integrals. |

## Component 1 — Learning Objectives

- LO1: State the Fourier series representation $f(x) = \dfrac{a_0}{2} + \sum_{n=1}^{\infty}\left(a_n\cos(nx)+b_n\sin(nx)\right)$ for a periodic function (period $2\pi$) — recognizing this as a genuine INFINITE sum (directly using `math.seq.series`'s own infinite-series machinery, not a finite truncation) built from `math.trig.trig-functions`'s periodic building blocks.
- LO2: Compute Fourier coefficients via the ORTHOGONALITY integrals $a_n=\frac1\pi\int_{-\pi}^{\pi}f(x)\cos(nx)\,dx$, $b_n=\frac1\pi\int_{-\pi}^{\pi}f(x)\sin(nx)\,dx$ (directly using `math.calc.definite-integral`'s integration machinery), and explain WHY these specific integrals isolate exactly one coefficient — because $\int_{-\pi}^{\pi}\sin(mx)\sin(nx)\,dx=0$ for $m\ne n$ (and similarly for cosine), "filtering out" every other term.
- LO3 (orientation level — full Hilbert-space theory beyond this concept's own scope): recognize that $\{1,\cos(x),\sin(x),\cos(2x),\sin(2x),\ldots\}$ form an ORTHOGONAL set under the $L^2$ inner product $\langle f,g\rangle=\int_{-\pi}^{\pi}fg\,dx$ (per `math.fnal.hilbert-space`'s own framework), and that computing a Fourier coefficient is literally computing an inner product against this orthogonal basis — exactly the same operation as finding one coordinate of a vector in an orthogonal basis.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.definite-integral` (evaluating $\int_a^b f(x)\,dx$, including integration by parts), `math.trig.trig-functions` ($\sin,\cos$ periodicity, standard values), and `math.seq.series` (infinite series, partial sums, convergence).

## Component 3 — Core Explanation

**An infinite sum, not a finite one**: a periodic function $f$ (period $2\pi$) can be represented as $f(x)=\dfrac{a_0}{2}+\sum_{n=1}^\infty\left(a_n\cos(nx)+b_n\sin(nx)\right)$ — a genuine INFINITE series (using `math.seq.series`'s own machinery), built from `math.trig.trig-functions`'s periodic sines and cosines at every integer frequency $n$. Except for very special functions, NO finite truncation of this sum exactly equals $f$; the infinite series (or its limit of partial sums) is genuinely required.

**Orthogonality integrals isolate one coefficient at a time**: the coefficients are found via $a_n=\frac1\pi\int_{-\pi}^{\pi}f(x)\cos(nx)\,dx$ and $b_n=\frac1\pi\int_{-\pi}^{\pi}f(x)\sin(nx)\,dx$, directly computed using `math.calc.definite-integral`'s machinery. These specific integrals work because of ORTHOGONALITY: $\int_{-\pi}^{\pi}\sin(mx)\sin(nx)\,dx=0$ whenever $m\ne n$ (and $=\pi$ when $m=n$), and similarly for cosine pairs and mixed sine-cosine pairs (always $0$). If you formally substitute the full series for $f(x)$ into one of these integrals and integrate term by term, EVERY term except the one matching frequency $n$ vanishes by orthogonality — leaving exactly the single coefficient being solved for, isolated cleanly.

**A preview of the deeper structure: Fourier coefficients are inner-product projections**: the functions $\{1,\cos(x),\sin(x),\cos(2x),\sin(2x),\ldots\}$ form an ORTHOGONAL set under the $L^2$ inner product $\langle f,g\rangle=\int_{-\pi}^{\pi}f(x)g(x)\,dx$ (per `math.fnal.hilbert-space`'s own inner-product framework). Computing a Fourier coefficient like $b_n$ is literally computing the inner product $\langle f,\sin(nx)\rangle$ (up to a normalizing constant) — exactly the SAME operation as finding one coordinate of a vector by taking its inner product against an orthogonal basis vector. This is not a coincidental parallel; Fourier series ARE an infinite-dimensional instance of orthogonal-basis coordinate expansion.

## Component 4 — Worked Examples

**Example 1 (LO1 — the series is genuinely infinite, breaking MC-1)**: The square wave $f(x)=1$ for $0<x<\pi$, $f(x)=-1$ for $-\pi<x<0$ (period $2\pi$) has Fourier series $f(x)=\dfrac{4}{\pi}\left(\sin x+\dfrac{\sin(3x)}{3}+\dfrac{\sin(5x)}{5}+\cdots\right)$ — an INFINITE series of odd-harmonic sine terms only. NO finite truncation of this series exactly equals the square wave's sharp jumps at $x=0,\pi$; even a partial sum with many terms only approximates $f$, famously overshooting near the jump (the Gibbs phenomenon) rather than reproducing it exactly.

**Example 2 (LO2 — computing one coefficient via orthogonality, breaking MC-2)**: For $f(x)=x$ on $(-\pi,\pi)$: $b_1=\dfrac1\pi\int_{-\pi}^{\pi}x\sin(x)\,dx$. Using integration by parts, $\int x\sin(x)\,dx = -x\cos(x)+\sin(x)+C$. Evaluating: $[-\pi\cos(\pi)+\sin(\pi)]-[-(-\pi)\cos(-\pi)+\sin(-\pi)] = [\pi]-[-\pi]=2\pi$. So $b_1=\dfrac1\pi(2\pi)=2$. This integral isolates $b_1$ SPECIFICALLY because, if $f(x)=\sum b_n\sin(nx)$ were substituted formally and multiplied by $\sin(x)$ term by term, $\int\sin(x)\sin(nx)\,dx=0$ for every $n\ne1$ — every OTHER term vanishes, leaving exactly $\pi b_1=\int_{-\pi}^{\pi}x\sin(x)\,dx$, confirming this integral's role as a "filter" isolating one specific coefficient.

**Example 3 (LO3 — Fourier coefficients as inner-product projections, orientation level)**: The computation $b_1=\dfrac1\pi\langle f,\sin(x)\rangle$ (using $\langle f,g\rangle=\int_{-\pi}^{\pi}fg\,dx$, per `math.fnal.hilbert-space`) is EXACTLY Example 2's computation, re-expressed in inner-product notation. Just as finding a vector's coordinate along one axis of an orthogonal basis means taking an inner product with that basis vector (and dividing by its own squared length), finding $b_1$ means taking the inner product of $f$ against $\sin(x)$ (dividing by $\|\sin(x)\|^2=\int_{-\pi}^{\pi}\sin^2(x)\,dx=\pi$) — the identical mechanism, applied to an infinite orthogonal set of functions instead of a finite set of vectors.

## Component 5 — Teaching Actions

### Teaching Action A01 — Genuinely Infinite, Not a Finite Approximation Shortcut (Primitive P28: Conflict Evidence)

Present Example 1's direct evidence: the square wave's Fourier series is an infinite sum of odd harmonics, and no finite truncation exactly reproduces its sharp jumps (the Gibbs phenomenon overshoot persists no matter how many terms are added). State: "`math.seq.series`'s infinite-sum machinery isn't a notational nicety here — the series genuinely needs infinitely many terms in general, and even then convergence can be subtle near discontinuities."

- **MC-1 hook**: ask "can a periodic function's Fourier series always be captured exactly using only finitely many sine/cosine terms?" — a "yes" answer reveals MC-1 (missing that the representation is genuinely infinite in general, not a finite sum).

### Teaching Action A02 — Orthogonality Filters Out Every Other Term (Primitive P11: Representation Shift)

State: "the orthogonality integrals aren't arbitrary formulas to memorize — multiplying by $\sin(nx)$ and integrating kills every OTHER term in the series, by the orthogonality property, leaving exactly the coefficient you're solving for." Work Example 2's full computation of $b_1$, explicitly connecting the integration-by-parts result to the filtering mechanism.

- **MC-2 hook**: ask "are the Fourier coefficient formulas essentially arbitrary rules to memorize, with no deeper reason they extract the right value?" — a "yes" answer reveals MC-2 (missing that orthogonality is precisely WHY these specific integrals isolate one coefficient at a time).

### Teaching Action A03 — Fourier Coefficients Are Inner-Product Projections (Primitive P06: Contrast Pair)

Contrast Example 2's direct integral computation against Example 3's re-expression using `math.fnal.hilbert-space`'s inner-product notation — the SAME computation, viewed two ways. State: "computing $b_n$ is not a special trigonometric trick unrelated to anything else — it's literally projecting $f$ onto an orthogonal basis, the exact same operation used to find coordinates in any orthogonal basis, just applied to an infinite set of functions."

- **MC-3 hook**: ask "is computing Fourier coefficients via these integrals a completely separate technique, unrelated to the general idea of projecting onto an orthogonal basis?" — a "yes" answer reveals MC-3 (missing the direct structural connection to Hilbert-space orthogonal-basis projection).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Explain why the square wave's Fourier series from Example 1 cannot be exactly reproduced by any finite number of terms, referencing the Gibbs phenomenon.
  2. Compute $a_1=\frac1\pi\int_{-\pi}^{\pi}x\cos(x)\,dx$ for $f(x)=x$, and explain (without full computation) why you should expect this to equal $0$, given that $f(x)=x$ is an odd function and $\cos(x)$ is even.
  3. Explain, using the orthogonality property $\int_{-\pi}^\pi\sin(mx)\sin(nx)\,dx=0$ for $m\ne n$, why multiplying by $\sin(2x)$ and integrating would isolate $b_2$ specifically, not any other coefficient.
  4. Explain the connection between computing a Fourier coefficient and finding a vector's coordinate in an orthogonal basis, referencing the inner product $\langle f,g\rangle=\int_{-\pi}^\pi fg\,dx$.
- **P76 (Transfer Probe, mode = cross-link probe against `math.fnal.hilbert-space`; note `math.de.heat-equation` is not yet authored)**: "Recall from `math.fnal.hilbert-space` that an orthonormal basis lets you decompose any vector into a sum of coordinate-times-basis-vector terms, each coordinate found via an inner product. (a) Explain precisely how the Fourier series $f(x)=\frac{a_0}{2}+\sum(a_n\cos(nx)+b_n\sin(nx))$ is exactly this kind of decomposition, with $\{1,\cos(x),\sin(x),\ldots\}$ playing the role of an orthogonal basis for a suitable space of periodic functions. (b) Explain why the coefficient formulas divide by $\pi$ (rather than some other constant), referencing the specific value of $\int_{-\pi}^{\pi}\sin^2(nx)\,dx$ or $\int_{-\pi}^\pi\cos^2(nx)\,dx$ (each basis function's own squared 'length'). (c) `math.de.heat-equation` is not yet authored in this corpus, but is listed as this concept's own unlock target — explain, in general terms, why representing a temperature distribution as a Fourier series (a sum of simple sine/cosine 'modes') might be a natural first step toward solving a heat-flow problem, without needing to know that concept's specific content yet."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | FOURIER-SERIES-ASSUMED-FINITE | Believing a periodic function's Fourier series can always be captured exactly using only finitely many sine/cosine terms, missing that the representation is genuinely infinite in general | Foundational |
| MC-2 | ORTHOGONALITY-INTEGRALS-TREATED-AS-ARBITRARY-FORMULAS | Treating the Fourier coefficient formulas as arbitrary rules to memorize, missing that orthogonality is precisely why these specific integrals isolate one coefficient at a time | Foundational |
| MC-3 | FOURIER-COEFFICIENTS-TREATED-AS-UNRELATED-TO-ORTHOGONAL-PROJECTION | Believing computing Fourier coefficients is a separate technique unrelated to the general idea of projecting onto an orthogonal basis, missing the direct structural connection | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Fourier Series Assumed Finite") → P41 (detect: ask a student whether a Fourier series can always be captured by finitely many terms, and check for a "yes") → P64 (conceptual shift: re-walk Example 1's square-wave series and the Gibbs phenomenon, re-anchoring on "the representation is genuinely infinite — a finite truncation only approximates, and can overshoot near a jump discontinuity").
- **B02 (targets MC-2)**: P27 (name it: "Orthogonality Integrals Treated as Arbitrary Formulas") → P41 (detect: ask a student why the coefficient formulas work, and check for a "just memorized formulas" answer) → P64 (conceptual shift: re-walk Example 2's filtering argument, re-anchoring on "orthogonality makes every other term vanish — that's precisely why this specific integral isolates exactly one coefficient").
- **B03 (targets MC-3)**: P27 (name it: "Fourier Coefficients Treated as Unrelated to Orthogonal Projection") → P41 (detect: ask a student whether computing Fourier coefficients is related to projecting onto an orthogonal basis, and check for a "no") → P64 (conceptual shift: re-walk Example 3's inner-product re-expression of Example 2's computation, re-anchoring on "it's the identical operation — an inner product against a basis function — just applied to an infinite set of functions instead of finitely many vectors").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.definite-integral` (the integration machinery the coefficient formulas are built from), `math.trig.trig-functions` (the periodic sine/cosine building blocks), `math.seq.series` (the infinite-sum framework this concept's representation genuinely requires).
- **Unlocks**: `math.de.heat-equation` (uses Fourier series to decompose temperature distributions into simple sine/cosine modes — not yet authored).
- **Cross-links**: `math.fnal.hilbert-space` (P76_mode = cross-link probe, already authored — supplies the inner-product/orthogonal-basis framework LO3 directly instantiates); `math.de.heat-equation` (not yet authored, checked via `ls docs/curriculum/blueprints/` — the transfer probe's part (c) engages this target at a conceptual, non-technical level appropriate given it is unauthored, per the corpus's established handling of mixed cross-link status).

## Component 8 — Teaching Notes

- estimated_hours = 12 with an expert/analyze tag places this among the corpus's largest concepts (comparable to `math.geom.differential-geometry-curves` and `math.geom.differential-geometry-surfaces`); scope was triaged by giving LO1 and LO2 genuine, fully-computed worked-example depth (a real integration-by-parts coefficient computation), while LO3's connection to the general Hilbert-space orthogonal-projection framework is deliberately ORIENTATION level — illustrated by re-expressing an already-computed result, not derived in full generality — consistent with this corpus's established research-tier scoping precedent.
- Examples 2 and 3 deliberately use the SAME function ($f(x)=x$) and the SAME computed coefficient ($b_1=2$), first via direct integration (Example 2) and then re-expressed via inner-product notation (Example 3) — letting one concrete, fully verified computation carry both the "why orthogonality works" argument and the "this is exactly orthogonal-basis projection" connection, rather than introducing a fresh computation for each.
- This concept's cross-link to `math.de.heat-equation` remains genuinely unauthored; per the corpus's established rule, the transfer probe still engages that target's conceptual role (motivating why Fourier decomposition matters for heat-flow problems) without assuming or requiring that concept's specific technical content, since none exists yet to reference.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (all three) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.fnal.hilbert-space authored → cross-link probe; math.de.heat-equation unauthored, noted) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe against math.fnal.hilbert-space, with math.de.heat-equation status noted) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.7×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert-tier learner, direct introduction of the infinite trigonometric series) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
