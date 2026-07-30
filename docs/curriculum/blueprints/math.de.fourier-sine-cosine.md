# Blueprint: math.de.fourier-sine-cosine

## Component 0 — Concept Identity
| Field | Value |
|---|---|
| KG ID | math.de.fourier-sine-cosine |
| name | Fourier Sine and Cosine Series |
| Domain | math.de |
| Difficulty | expert |
| Bloom level | apply |
| Estimated hours | 4 |
| Mastery threshold | 0.80 |
| MAMR | 4/5 |
| Prerequisites | math.de.fourier-series |
| Cross-links | — |
| Unlocks | — |

## Component 1 — Learning Objective
The student applies Fourier sine and cosine series to functions defined on [0,L] by choosing the correct half-range expansion: the Fourier sine series (FSS) represents f as a sum of sines bₙsin(nπx/L) — matching zero-value boundary conditions at x=0 and x=L; the Fourier cosine series (FCS) represents f as a sum of cosines a₀/2 + aₙcos(nπx/L) — matching zero-derivative (Neumann) BCs; computes the coefficients bₙ = (2/L)∫₀ᴸ f(x)sin(nπx/L)dx and aₙ = (2/L)∫₀ᴸ f(x)cos(nπx/L)dx; explains that FSS corresponds to the odd extension of f and FCS to the even extension; and applies these expansions as a tool for solving PDEs with Dirichlet or Neumann boundary conditions.

## Component 2 — CPA Entry Stage
**P — Pictorial** (draw three panels side by side for f(x)=x on [0,1]: left = the original function on [0,1]; middle = odd extension on [−1,1] → FSS; right = even extension on [−1,1] → FCS; annotate: "FSS: odd extension → sines only, zero at endpoints. FCS: even extension → cosines only, zero derivative at endpoints"; below each panel show 3 partial sums to see convergence)

## Component 3 — Misconception Register

| ID | Label | Pattern | Birth type |
|---|---|---|---|
| MC-1 | FULL-FOURIER-FORMULA-USED-ON-HALF-INTERVAL | Student uses the full Fourier series formulas (aₙ over [−L,L]) for a function on [0,L]; gets wrong coefficients and non-matching boundary behaviour | Type 5 — instruction-induced (the full Fourier series on [−L,L] is taught first; students copy the formula to the half-interval [0,L] without registering that the limits of integration and the factor 2/L vs. 1/L both change; the half-range factor 2/L vs. 1/L is a persistent arithmetic trap) |
| MC-2 | SINE-SERIES-FOR-ZERO-DERIVATIVE-BC | Student uses a Fourier sine series for a PDE with Neumann (zero-derivative) BCs and vice versa, without connecting the series choice to the boundary condition satisfied | Type 3 — language contamination ("sine" and "cosine" sound like arbitrary labels; students don't realise that the sine function inherently has zeros at endpoints (Dirichlet BC f(0)=f(L)=0) while the cosine has zero derivatives at endpoints (Neumann BC f'(0)=f'(L)=0) — the BC-to-series pairing is dictated by function behaviour, not convention) |
| MC-3 | COSINE-SERIES-ALWAYS-HAS-NONZERO-AVERAGE | Student thinks the constant term a₀/2 of the Fourier cosine series is always nonzero; forgets that for an odd function's odd extension f(x)=x (which has zero average over [−L,L]) all cosine coefficients, including a₀, are zero | Type 1 — overgeneralisation (standard examples of cosine series have a₀≠0; students don't connect a₀=(2/L)∫₀ᴸ f(x)dx, which is twice the average of f on [0,L] and can be zero) |

## Component 4 — Session TA Cap
**Cap = 6** (hrs = 4 → cap 6)

## Component 5 — Teaching Action Sequence

### A01 — P11 REPRESENTATION SHIFT (open)
**Half-range Fourier series:**

**Fourier sine series (FSS) on [0,L]:**
f(x) = Σₙ₌₁^∞ bₙ sin(nπx/L),  bₙ = (2/L)∫₀ᴸ f(x)sin(nπx/L)dx.
Converges to the odd extension of f (reflected across x=0).
Boundary behaviour: each sin(nπx/L)=0 at x=0 and x=L → FSS represents functions vanishing at both endpoints.

**Fourier cosine series (FCS) on [0,L]:**
f(x) = a₀/2 + Σₙ₌₁^∞ aₙ cos(nπx/L),  aₙ = (2/L)∫₀ᴸ f(x)cos(nπx/L)dx.
Converges to the even extension of f (reflected across x=0).
Boundary behaviour: d/dx[cos(nπx/L)] = 0 at x=0 and x=L → FCS represents functions with zero derivatives at both endpoints.

**Worked example — FSS for f(x)=1 on [0,π]:**
bₙ = (2/π)∫₀^π sin(nx)dx = (2/π)[−cos(nx)/n]₀^π = (2/nπ)(1−(−1)ⁿ).
b₂ₖ=0 (even n); b₂ₖ₋₁=4/(π(2k−1)).
FSS: 1 = (4/π)[sin x + sin3x/3 + sin5x/5 + ⋯] on (0,π).

**P49 checkpoint:**
- CORRECT → "FSS: bₙ=(2/L)∫₀ᴸ f sin(nπx/L)dx. FCS: aₙ=(2/L)∫₀ᴸ f cos(nπx/L)dx, plus a₀/2. FSS↔odd extension; FCS↔even extension." → A02
- PARTIAL (MC-1: used 1/L factor) → "The half-range coefficient formula uses 2/L, NOT 1/L. The full Fourier series on [−L,L] uses 1/L because you integrate over a length 2L. The half-range integrates over [0,L] only — half the interval — so the normalisation constant doubles to 2/L to compensate. Copy the formulas: bₙ=(2/L)∫₀ᴸ f(x)sin(nπx/L)dx." → TB-R01 → A02
- INCORRECT → TB-R01 → A02
- NO_RESPONSE → "FCS of f(x)=x on [0,2]: aₙ=(2/2)∫₀² x cos(nπx/2)dx. Integration by parts: [x·2sin(nπx/2)/(nπ)]₀² − ∫₀² 2sin(nπx/2)/(nπ)dx = 0 + [2·2cos(nπx/2)/(nπ)²]₀² = 4(cos(nπ)−1)/(nπ)² = 4((−1)ⁿ−1)/(nπ)². a₀=(2/2)∫₀² x dx = 2. FCS: x = 1 + Σ[4((−1)ⁿ−1)/(nπ)²]cos(nπx/2)." → TB-R01 → A02

### A02 — P04 PATTERN INDUCTION
**PDE application — choosing FSS vs. FCS:**

**Boundary condition matching rule:**
- Dirichlet BC (u=0 at boundary) → Fourier SINE series (sines vanish at endpoints).
- Neumann BC (∂u/∂x=0 at boundary) → Fourier COSINE series (cosine derivatives vanish).

**Heat equation example with Dirichlet BCs:**
uₜ = k uₓₓ, u(0,t)=u(L,t)=0 (Dirichlet).
Expand u(x,t) = Σ bₙ(t) sin(nπx/L).
ODEs for bₙ: bₙ'(t) = −k(nπ/L)²bₙ(t) → bₙ(t) = bₙ(0)e^{−k(nπ/L)²t}.
IC: bₙ(0) = (2/L)∫₀ᴸ f(x)sin(nπx/L)dx.
Complete solution: u(x,t) = Σ bₙ(0)e^{−k(nπ/L)²t}sin(nπx/L).

**Heat equation example with Neumann BCs:**
uₜ = k uₓₓ, uₓ(0,t)=uₓ(L,t)=0 (Neumann, insulated ends).
Expand u(x,t) = a₀/2 + Σ aₙ(t) cos(nπx/L).
aₙ'(t) = −k(nπ/L)²aₙ(t); a₀'(t) = 0 (constant — heat conserved).
Complete solution: u(x,t) = a₀(0)/2 + Σ aₙ(0)e^{−k(nπ/L)²t}cos(nπx/L).

**P49 checkpoint:**
- CORRECT → "Dirichlet BC (u=0 at ends) → FSS. Neumann BC (uₓ=0 at ends) → FCS. FCS has constant term a₀/2=average — conserved for insulated heat equation." → Gate (P91)
- PARTIAL (MC-2: wrong BC-series matching) → "RULE: the sine function has sin(0)=0 and sin(nπ)=0 — it satisfies zero-VALUE BCs at both endpoints (Dirichlet). The cosine has zero DERIVATIVE: d/dx cos(nπx/L)|_{x=0,L} = 0 — it satisfies zero-DERIVATIVE BCs (Neumann). Match the series to the boundary condition your PDE actually has." → TB-R02 → Gate
- INCORRECT → TB-R02 → Gate
- NO_RESPONSE → "uₜ=uₓₓ, uₓ(0,t)=uₓ(1,t)=0, u(x,0)=cos(2πx). Neumann → FCS. Expand: aₙ=(2/1)∫₀¹ cos(2πx)cos(nπx)dx. For n=2: ∫₀¹ cos²(2πx)dx=1/2 → a₂=1. All other n: orthogonality gives 0. a₀=2∫₀¹ cos(2πx)dx=0. u(x,t)=cos(2πx)e^{−4π²t}." → TB-R02 → Gate

## Component 6 — Protocol B Repair Chains

**TB-R01 (MC-1 + MC-3 combined):**
Step 1 — "Coefficient comparison table: Full Fourier on [−L,L]: aₙ=(1/L)∫₋ₗᴸ f cos(nπx/L)dx. Half-range cosine on [0,L]: aₙ=(2/L)∫₀ᴸ f cos(nπx/L)dx. Same form, double factor, half interval. The factor 2/L appears because you integrate over only [0,L] but still need the correct orthonormality."
Step 2 — "a₀ in the cosine series equals (2/L)∫₀ᴸ f(x)dx, which is TWICE the average value of f on [0,L]. This can be zero (e.g., f(x)=cos(πx) on [0,1]: ∫₀¹cos(πx)dx=0, so a₀=0). Never assume a₀≠0."
Step 3 — "Odd/even extension: if f(x) on [0,L] is extended to an ODD function on [−L,L], only sines survive (FSS). If extended to an EVEN function, only cosines survive (FCS). Sketch the extended function to confirm the series matches the BC."

**TB-R02 (MC-2 BC-SERIES PAIRING):**
Step 1 — "Sin(0)=0, sin(nπ)=0 for all integers n. So if your PDE has u(0,t)=u(L,t)=0 — the solution must be zero at BOTH ends — the FSS (sines only) is the natural match."
Step 2 — "d/dx[cos(nπx/L)]|_{x=0} = 0 and |_{x=L} = 0 for all n≥0. So if your PDE has uₓ(0,t)=uₓ(L,t)=0 — zero flux/derivative at both ends — the FCS (cosines only) is the natural match."
Step 3 — "Application rule: BEFORE choosing FSS or FCS, read the PDE's boundary conditions first. Dirichlet (value BCs) → FSS. Neumann (derivative BCs) → FCS. If the BCs are mixed (e.g., u(0)=0 and uₓ(L)=0), neither pure sine nor cosine series works — a modified eigenfunction expansion is needed."

## Component 7 — P91 Mastery Gate Sequence

**P77 — Problem Set (5 items):**
1. Compute the Fourier sine series of f(x)=x(π−x) on [0,π]. Sketch three partial sums.
2. Compute the Fourier cosine series of f(x)=1 on [0,L]. Show that a₀=2 and aₙ=0 for n≥1. Verify: the series trivially equals f.
3. A heat equation uₜ=uₓₓ, u(0,t)=u(π,t)=0, u(x,0)=3sin(x)−sin(3x). Without computing integrals, write the solution using the eigenfunction expansion (identify the Fourier coefficients by inspection).
4. A heat equation uₜ=uₓₓ with Neumann BCs uₓ(0,t)=uₓ(L,t)=0 and u(x,0)=f(x). Show that the average temperature ∫₀ᴸ u(x,t)dx is conserved for all t>0. Interpret physically: why must heat be conserved when the ends are insulated?
5. Let f(x)=x on [0,1]. (a) Compute its FSS. (b) Compute its FCS. (c) Use the Parseval identity ‖f‖²=(L/2)Σbₙ² for the FSS of f(x)=1 on [0,π] to sum the series 1+1/9+1/25+⋯=π²/8.

**P55 — Reflect & Consolidate:** "Half-range series: FSS bₙ=(2/L)∫₀ᴸ f sin(nπx/L)dx (odd extension, Dirichlet BCs). FCS aₙ=(2/L)∫₀ᴸ f cos(nπx/L)dx, a₀/2=average (even extension, Neumann BCs). PDE rule: Dirichlet BC→FSS; Neumann BC→FCS."

**P76 — Transfer Probe (Independence mode):**
(a) Discrete sine and cosine transforms (DST/DCT): for a discrete sequence fₖ, k=0,…,N−1, the DCT and DST are the digital analogues of the FCS and FSS. The DCT-II (the most common, used in JPEG compression) is defined by Fₙ=(2/N)Σfₖcos((π/N)(k+1/2)n). Explain how this corresponds to evaluating the FCS at the midpoints of N equal subintervals of [0,L] — the computational analogue of Gauss quadrature for the FCS integral. (b) Gibbs phenomenon near jump discontinuities: the FSS of f(x)=1 on (0,π) (with odd extension) converges to 0 at x=0 and x=π but overshoots by approximately 9% at x→0⁺, regardless of the number of terms. Show algebraically that the partial sum Sₙ(x)=(4/π)Σₖ₌₁ⁿ sin((2k−1)x)/(2k−1) has a maximum near x=π/(2n) and that this maximum → (4/π)∫₀^π sinc(u)du/2 ≈ 1.179 as n→∞. (c) Formal half-range derivation: on [0,L], the eigenfunctions of −d²φ/dx² = λφ with φ(0)=φ(L)=0 are φₙ(x)=sin(nπx/L) with λₙ=(nπ/L)². The FCS eigenfunctions satisfy φ'(0)=φ'(L)=0, giving cos(nπx/L). Show that both sets form complete orthogonal bases for L²([0,L]) and derive the coefficient formulas from the orthogonality relations.

**P75 — Mastery Assessment:**
"(a) Solve the BVP: uₜ = 4uₓₓ, 0<x<1, t>0; u(0,t)=u(1,t)=0; u(x,0)=x(1−x). Compute the first three nonzero Fourier sine coefficients and write the full series solution. (b) A heat equation with Neumann BCs: uₜ=uₓₓ, uₓ(0,t)=uₓ(1,t)=0, u(x,0)=2+cos(πx)+cos(2πx)/2. Write the solution by inspection (no integral computation needed). What is u(x,t) as t→∞? (c) Show that the FSS and FCS of f(x)=x on [0,1] converge to different limits at x=0 and x=1. What does each series converge to at the endpoints? Explain the difference using odd vs. even extension. (d) Parseval's identity: for the FSS bₙ=(2/L)∫₀ᴸ f sin(nπx/L)dx, the identity is ∫₀ᴸ f²dx = (L/2)Σbₙ². Apply it to f(x)=x on [0,π] (using your FSS from part (a) of Problem Set #5) to show Σ1/n² = π²/6."

**P74 — Routing Decision:**
- Score ≥ 5/5 → MASTERED
- Score 4/5 → REVIEW the BC-to-series matching rule and the coefficient normalisation factor
- Score ≤ 3/5 → PREREQUISITE GAP in math.de.fourier-series; reassign

**P78 — Completion:** Fourier Sine and Cosine Series certified. Student distinguishes FSS and FCS by their boundary condition semantics; computes half-range coefficients with the correct 2/L factor; identifies odd/even extensions; applies the appropriate series to solve heat equation BVPs with Dirichlet or Neumann BCs.

## Component 8 — P76 Transfer Probe Detail
**Mode: Independence** (cross_links = [])
Target: Discrete sine/cosine transforms (DST/DCT); Gibbs phenomenon quantification; eigenfunction completeness
Skill tested: Connect half-range series to discrete transforms, signal processing, and functional analysis

## Component 10 — Version History
| Version | Date | Note |
|---|---|---|
| 1.0 | 2026-07-30 | Initial authoring |
