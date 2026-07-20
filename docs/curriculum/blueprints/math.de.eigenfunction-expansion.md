# Teaching Blueprint: Eigenfunction Expansion (`math.de.eigenfunction-expansion`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.eigenfunction-expansion` |
| name | Eigenfunction Expansion |
| domain | Differential Equations |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.7 → MAMR = ⌈0.7×5⌉ = 4/5 |
| estimated_hours | 7 |
| requires | `math.de.sturm-liouville` |
| unlocks | none |
| cross_links | `math.fnal.hilbert-space` (authored earlier — see Component 7) |
| CPA_entry_stage | C (Concrete) — computing one specific eigenfunction expansion's coefficients before naming the general formula |
| description (KG) | Expanding a function $f$ in terms of eigenfunctions $\varphi_n$ of a Sturm-Liouville problem: $f(x)=\sum c_n\varphi_n(x)$ with $c_n=\langle f,\varphi_n\rangle/\langle\varphi_n,\varphi_n\rangle$. Generalizes Fourier series to arbitrary weighted inner products. |

## Component 1 — Learning Objectives

- LO1: Compute the expansion coefficients $c_n=\dfrac{\langle f,\varphi_n\rangle}{\langle\varphi_n,\varphi_n\rangle}$ for a function $f$ expanded in `math.de.sturm-liouville`'s own orthogonal eigenfunctions $\varphi_n$, and recognize this formula as DIRECTLY exploiting the ORTHOGONALITY `math.de.sturm-liouville` already established — the SAME projection idea as expanding a vector in an orthogonal basis, applied to functions.
- LO2: Recognize that this expansion GENERALIZES ordinary Fourier series: the classical Fourier sine/cosine series is the SPECIAL CASE where the Sturm-Liouville problem is the simplest one (constant weight $w(x)=1$, eigenfunctions $\sin(nx),\cos(nx)$) — not a separate, unrelated technique.
- LO3 (orientation level — full completeness-proof deferred): recognize, without full derivation, that the expansion's VALIDITY (that the series genuinely converges to $f$, not just formally makes sense) relies on `math.fnal.hilbert-space`'s own completeness and orthonormal-basis machinery — the eigenfunctions $\{\varphi_n\}$ forming a COMPLETE orthogonal set in the weighted $L^2([a,b],w)$ space is precisely what a Hilbert-space orthonormal basis guarantees, previewing why this is more than a formal analogy.

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.sturm-liouville` (the boundary value problem $(p(x)y')'+q(x)y+\lambda w(x)y=0$, its countably many eigenvalues $\lambda_n$, and orthogonal eigenfunctions $\varphi_n$ forming a complete set in $L^2([a,b],w)$).

## Component 3 — Core Explanation

**The coefficient formula is orthogonal projection, exactly like decomposing a vector along orthogonal axes**: `math.de.sturm-liouville` already established that the eigenfunctions $\varphi_n$ are ORTHOGONAL with respect to the weighted inner product $\langle f,g\rangle=\int_a^bf(x)g(x)w(x)\,dx$: $\langle\varphi_m,\varphi_n\rangle=0$ for $m\ne n$. Given this orthogonality, expanding $f(x)=\sum_nc_n\varphi_n(x)$ and taking the inner product of BOTH sides with $\varphi_n$: $\langle f,\varphi_n\rangle=\sum_mc_m\langle\varphi_m,\varphi_n\rangle=c_n\langle\varphi_n,\varphi_n\rangle$ (every term but $m=n$ vanishes by orthogonality), directly giving $c_n=\langle f,\varphi_n\rangle/\langle\varphi_n,\varphi_n\rangle$ — this is EXACTLY the same "project onto each orthogonal axis, divide by its squared length" formula used to decompose an ordinary vector in $\mathbb{R}^n$ along an orthogonal basis, here applied to FUNCTIONS instead of finite vectors.

**Fourier series is the simplest Sturm-Liouville problem's special case, not an unrelated technique**: the classical Fourier sine series (for $f$ on $[0,L]$) arises from the SIMPLEST Sturm-Liouville problem, $y''+\lambda y=0$ with $y(0)=y(L)=0$ (constant weight $w(x)=1$, no $q(x)$ term), whose eigenfunctions are $\varphi_n(x)=\sin(n\pi x/L)$. The FAMILIAR Fourier coefficient formula $c_n=\frac{2}{L}\int_0^Lf(x)\sin(n\pi x/L)\,dx$ is EXACTLY this concept's general eigenfunction-expansion formula, specialized to $w(x)=1$ and these particular eigenfunctions — Fourier series is not a separate topic requiring its own independent theory, it is ONE instance of the general Sturm-Liouville eigenfunction expansion.

**Convergence relies on Hilbert-space completeness — this is more than a formal analogy (orientation level)**: writing $f=\sum c_n\varphi_n$ formally makes sense as soon as the coefficients are computed, but whether this series GENUINELY CONVERGES (in the appropriate sense) to $f$ itself requires the eigenfunctions $\{\varphi_n\}$ to form a COMPLETE orthogonal set — precisely `math.fnal.hilbert-space`'s own notion of an orthonormal (or orthogonal) BASIS for the weighted $L^2([a,b],w)$ Hilbert space. This is not merely a suggestive parallel: the weighted $L^2$ space genuinely IS a Hilbert space, and `math.de.sturm-liouville`'s completeness guarantee is precisely the Hilbert-space fact that this particular orthogonal system spans the entire space, with no "missing directions." Full derivation of this completeness proof is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — the coefficient formula as orthogonal projection, breaking MC-1)**: for the simplest Sturm-Liouville system on $[0,\pi]$ ($w(x)=1$, eigenfunctions $\varphi_n(x)=\sin(nx)$), expand $f(x)=x$ (for $0<x<\pi$): $\langle\varphi_n,\varphi_n\rangle=\int_0^\pi\sin^2(nx)\,dx=\pi/2$. Computing $\langle f,\varphi_n\rangle=\int_0^\pi x\sin(nx)\,dx$ — integrating by parts, this equals $\frac{(-1)^{n+1}\pi}{n}$ (a standard computation). So $c_n=\frac{(-1)^{n+1}\pi/n}{\pi/2}=\frac{2(-1)^{n+1}}{n}$. This formula came DIRECTLY from projecting $f$ onto each $\varphi_n$ and dividing by $\varphi_n$'s own squared norm — precisely the orthogonal-decomposition procedure, applied here to a function rather than a finite-dimensional vector.

**Example 2 (LO2 — recognizing this as ordinary Fourier series, breaking MC-2)**: Example 1's expansion, $x=\sum_{n=1}^\infty\frac{2(-1)^{n+1}}{n}\sin(nx)$, IS the standard Fourier sine series for $f(x)=x$ on $(0,\pi)$ — a formula many learners already recognize from an introductory Fourier analysis course. Recognizing the Sturm-Liouville problem behind it ($y''+\lambda y=0$, $y(0)=y(\pi)=0$, $w=1$) confirms this is NOT a coincidental resemblance: ordinary Fourier series is LITERALLY this concept's general eigenfunction-expansion formula, applied to the simplest possible Sturm-Liouville system.

**Example 3 (LO3, orientation level — completeness as the Hilbert-space guarantee behind convergence, breaking MC-3)**: for a DIFFERENT weighted Sturm-Liouville system — say, Legendre's equation on $[-1,1]$ with weight $w(x)=1$ and eigenfunctions the Legendre polynomials $P_n(x)$ — expanding a function $f$ in Legendre polynomials, $f=\sum c_nP_n$, relies on the SAME structural guarantee as Example 1's Fourier case: `math.de.sturm-liouville`'s completeness claim that $\{P_n\}$ spans the ENTIRE weighted $L^2([-1,1],1)$ space, with NOTHING missing. This is precisely `math.fnal.hilbert-space`'s own orthonormal-basis completeness property, applied here — confirming the expansion's genuine convergence to $f$ (not merely a formal series) rests on the SAME deep Hilbert-space machinery, regardless of which specific Sturm-Liouville system (Fourier, Legendre, Bessel, or others) is being used.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Coefficient Formula Is Orthogonal Projection, For Functions (Primitive P11: Representation Shift)

State: "you're not learning a new formula — this is exactly the same 'project onto each orthogonal axis, divide by its squared length' procedure you'd use to decompose an ordinary vector, applied here to a function expanded in orthogonal eigenfunctions." Walk Example 1's direct derivation of $c_n$ from orthogonality.

- **MC-1 hook**: ask "is the eigenfunction-expansion coefficient formula $c_n=\langle f,\varphi_n\rangle/\langle\varphi_n,\varphi_n\rangle$ an independently memorized formula, unrelated to the orthogonality `math.de.sturm-liouville` already established?" — a "yes" answer reveals MC-1 (missing that the formula follows DIRECTLY from orthogonal projection, exploiting that orthogonality).

### Teaching Action A02 — Fourier Series IS This Expansion, Not a Separate Technique (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: Example 1's general Sturm-Liouville eigenfunction expansion, applied to the simplest system, produced EXACTLY the familiar Fourier sine series formula. State: "Fourier series isn't a separate subject you learned before this one — it's precisely this general expansion, specialized to the simplest possible Sturm-Liouville problem."

- **MC-2 hook**: ask "is ordinary Fourier series an unrelated, separate technique from Sturm-Liouville eigenfunction expansion, requiring its own independent theory?" — a "yes" answer reveals MC-2 (missing that Fourier series is exactly this expansion, specialized to the simplest Sturm-Liouville system).

### Teaching Action A03 — Convergence Genuinely Requires Hilbert-Space Completeness, Regardless of the Specific System (Primitive P06: Contrast Pair)

Contrast Example 1's Fourier case against Example 3's Legendre-polynomial case — DIFFERENT specific eigenfunctions, but the SAME underlying completeness guarantee from `math.fnal.hilbert-space` needed in both. State: "it doesn't matter which Sturm-Liouville system you're using — Fourier, Legendre, Bessel, or any other — the genuine convergence of the expansion to $f$ always rests on the same Hilbert-space completeness fact, not a system-specific coincidence."

- **MC-3 hook**: ask "does the eigenfunction expansion's genuine convergence to $f$ depend on special properties unique to whichever specific Sturm-Liouville system (Fourier, Legendre, etc.) happens to be used, rather than one shared underlying guarantee?" — a "yes" answer reveals MC-3 (missing that the SAME Hilbert-space completeness property underlies convergence for every Sturm-Liouville system).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Explain, citing orthogonality directly, why the coefficient formula $c_n=\langle f,\varphi_n\rangle/\langle\varphi_n,\varphi_n\rangle$ correctly isolates $c_n$ when you take the inner product of $f=\sum c_m\varphi_m$ with $\varphi_n$.
  2. Compute $\langle\varphi_1,\varphi_1\rangle$ for $\varphi_n(x)=\sin(nx)$ on $[0,\pi]$.
  3. Explain why the ordinary Fourier cosine series is also a special case of Sturm-Liouville eigenfunction expansion, identifying which boundary conditions would produce cosine eigenfunctions instead of sine.
  4. Explain, without full proof, what role Hilbert-space completeness plays in guaranteeing an eigenfunction expansion genuinely converges to $f$, rather than being merely a formal symbolic series.
- **P76 (Transfer Probe, mode = cross-link probe engaging `math.fnal.hilbert-space`)**: "An engineer models heat distribution in a non-uniform rod using a Sturm-Liouville problem with a non-constant weight $w(x)$, obtaining eigenfunctions $\varphi_n(x)$ different from ordinary sines and cosines. (a) Explain how to compute the expansion coefficients $c_n$ for the initial temperature distribution $f(x)$ using this concept's general formula, citing orthogonality as the reason it works. (b) A colleague, familiar only with ordinary Fourier series, questions whether this 'generalized Fourier series' idea is legitimate mathematics or just a heuristic borrowed from the simpler case — using `math.fnal.hilbert-space`'s own completeness/orthonormal-basis machinery, explain why this expansion rests on the same rigorous foundation as ordinary Fourier series, not merely an analogy. (c) Explain what specifically would need to be verified about $\{\varphi_n\}$ (beyond mere orthogonality) to guarantee the expansion genuinely converges to $f$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | COEFFICIENT-FORMULA-ASSUMED-INDEPENDENT-FACT | Believing the coefficient formula $c_n=\langle f,\varphi_n\rangle/\langle\varphi_n,\varphi_n\rangle$ is an independently memorized formula, missing that it follows directly from orthogonal projection | Foundational |
| MC-2 | FOURIER-SERIES-ASSUMED-SEPARATE-TECHNIQUE | Believing Fourier series is an unrelated, separate technique from Sturm-Liouville eigenfunction expansion, missing that it is exactly this expansion specialized to the simplest system | High |
| MC-3 | CONVERGENCE-ASSUMED-SYSTEM-SPECIFIC | Believing convergence depends on properties unique to each specific Sturm-Liouville system, missing that the same Hilbert-space completeness guarantee underlies convergence for every system | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Coefficient Formula Assumed Independent Fact") → P41 (detect: ask whether the coefficient formula is independently memorized, unrelated to orthogonality) → P64 (conceptual shift: re-walk Example 1's direct orthogonality-based derivation, re-anchoring on "the formula follows directly from orthogonal projection").
- **B02 (targets MC-2)**: P27 (name it: "Fourier Series Assumed Separate Technique") → P41 (detect: ask whether Fourier series is an unrelated technique from Sturm-Liouville expansion) → P64 (conceptual shift: re-walk Example 2's exact-match identification, re-anchoring on "Fourier series IS this expansion, specialized to the simplest system").
- **B03 (targets MC-3)**: P27 (name it: "Convergence Assumed System-Specific") → P41 (detect: ask whether convergence depends on properties unique to each specific system) → P64 (conceptual shift: re-walk Example 3's Fourier-versus-Legendre completeness parallel, re-anchoring on "the same Hilbert-space completeness guarantee underlies every system").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.sturm-liouville` (the boundary value problem, its orthogonal eigenfunctions, and its completeness claim — all directly reused by this concept's expansion formula and convergence argument).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.fnal.hilbert-space`, checked via `ls docs/curriculum/blueprints/` and confirmed ALREADY authored. $P76_{mode}=$ **cross-link probe**, engaging `math.fnal.hilbert-space`'s own completeness/orthonormal-basis machinery directly in Component 3's convergence argument and the P76 transfer probe.

## Component 8 — Teaching Notes

- estimated_hours = 7 with an expert/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (the direct orthogonal-projection derivation and the exact Fourier-series identification) and LO3 kept orientation-level, appropriately previewing the Hilbert-space completeness connection without proving completeness for any specific system.
- **Division of labor**: `math.de.sturm-liouville` owns the boundary value problem, its eigenvalues, and the orthogonality/completeness of its eigenfunctions; `math.fnal.hilbert-space` owns the general Hilbert-space completeness/basis theory. This concept owns COMBINING these into the practical expansion-coefficient formula and its convergence justification — deliberately using the SAME simplest Sturm-Liouville system (yielding ordinary Fourier sine series) in Examples 1–2 so the general formula and its Fourier-series special case are directly, numerically comparable, before Example 3 deliberately switches to a DIFFERENT system (Legendre) to demonstrate the completeness argument's generality.
- Example 1's deliberate choice of $f(x)=x$ (a simple, standard Fourier-series example with a well-known closed-form coefficient result) was chosen so the orthogonal-projection derivation's output could be checked against an independently verifiable, widely-documented formula.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.fnal.hilbert-space` confirmed authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.7×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: computing one specific expansion's coefficients precedes the general formula and its Hilbert-space justification) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
