# Teaching Blueprint: Legendre's Equation (`math.de.legendre-equation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.legendre-equation` |
| name | Legendre's Equation |
| domain | Differential Equations |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.7 → MAMR = ⌈0.7×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.de.series-solution` |
| unlocks | none |
| cross_links | `math.fnal.special-functions` (authored earlier — see Component 7) |
| CPA_entry_stage | C (Concrete) — applying `math.de.series-solution`'s procedure to Legendre's equation for a small case before naming the general polynomial family |
| description (KG) | $(1-x^2)y''-2xy'+n(n+1)y=0$; polynomial solutions are Legendre polynomials $P_n(x)$. Arise in problems with spherical symmetry. Form an orthogonal basis on $[-1,1]$. |

## Component 1 — Learning Objectives

- LO1: Recognize $x=0$ as an ORDINARY point of Legendre's equation (unlike `math.de.bessel-equation`'s regular singular point at $x=0$), and apply `math.de.series-solution`'s own ordinary-point ansatz $y=\sum a_kx^k$ directly — no Frobenius modification needed here, confirming this concept's procedure is `math.de.series-solution`'s standard method, applied to a specific equation.
- LO2: Recognize that for the SPECIAL case where $n$ is a NON-NEGATIVE INTEGER, the resulting power series TERMINATES, yielding a genuine POLYNOMIAL solution $P_n(x)$ (the Legendre polynomial) — while for OTHER (non-integer) values of $n$, the series does NOT terminate, giving an infinite series solution instead; correctly distinguish these two qualitatively different outcomes based on $n$'s value.
- LO3 (orientation level — full orthogonality-proof and spherical-symmetry connection deferred): recognize, without full derivation, that the Legendre polynomials $P_n(x)$ form an ORTHOGONAL basis on $[-1,1]$ (directly connecting to `math.fnal.special-functions`'s own Sturm-Liouville-eigenfunction framework) and arise NATURALLY in problems with SPHERICAL symmetry (analogous to how `math.de.bessel-equation`'s functions arise from cylindrical symmetry), previewing their role in the angular part of 3D separation-of-variables problems.

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.series-solution` (the ansatz $y=\sum a_nx^n$, substituted into an ODE to derive a coefficient recurrence, valid at an ordinary point).

## Component 3 — Core Explanation

**Legendre's equation has $x=0$ as an ordinary point — the standard series ansatz applies directly**: checking Legendre's equation $(1-x^2)y''-2xy'+n(n+1)y=0$ at $x=0$: the leading coefficient $(1-x^2)$ equals $1$ (nonzero) at $x=0$, so $x=0$ is an ORDINARY point — `math.de.series-solution`'s STANDARD ansatz $y=\sum_{k=0}^\infty a_kx^k$ applies directly, with NO Frobenius modification needed (unlike Bessel's equation, whose $x=0$ is instead a regular SINGULAR point, requiring the different $x^r\sum a_kx^k$ ansatz).

**Integer $n$ produces a genuine terminating polynomial — a qualitatively different outcome from other $n$**: substituting the series ansatz into Legendre's equation produces a RECURRENCE RELATION for the coefficients $a_k$. For a NON-NEGATIVE INTEGER $n$, this recurrence FORCES the coefficients to become ZERO beyond a certain point — the series TERMINATES, giving a genuine POLYNOMIAL of degree $n$ (the Legendre polynomial $P_n(x)$, suitably normalized). For NON-integer $n$, NO such termination occurs, and the solution remains a genuinely INFINITE series — a qualitatively different kind of solution, not merely "a longer polynomial."

**Orthogonality and spherical symmetry connect directly to `math.fnal.special-functions`'s broader framework (orientation level)**: the Legendre polynomials $P_n(x)$ form an ORTHOGONAL basis on $[-1,1]$ — EXACTLY `math.fnal.special-functions`'s own claim that orthogonal-polynomial families arise as Sturm-Liouville eigenfunctions, with Legendre's equation being one specific instance (domain $[-1,1]$, weight $w(x)=1$). Just as `math.de.bessel-equation`'s functions arise naturally from CYLINDRICAL symmetry, Legendre's equation arises naturally from SPHERICAL symmetry — separating variables in 3D problems (Laplace's equation, the Schrödinger equation) in spherical coordinates produces exactly this equation for the polar-angle part of the solution. Full derivation of both the orthogonality proof and the spherical-coordinate separation is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — applying the ordinary-point ansatz directly, breaking MC-1)**: for Legendre's equation with $n=2$: $(1-x^2)y''-2xy'+6y=0$. Substituting $y=\sum a_kx^k$ (NO $x^r$ factor needed, since $x=0$ is ordinary): $y'=\sum ka_kx^{k-1}$, $y''=\sum k(k-1)a_kx^{k-2}$. Substituting into the equation and collecting like powers of $x$ produces a recurrence relating $a_{k+2}$ to $a_k$ — the SAME kind of procedure `math.de.series-solution` already teaches for ordinary points, with no new setup technique required, confirming $x=0$'s ordinary-point status directly translates to using the standard ansatz.

**Example 2 (LO2 — integer $n$ terminating into a polynomial, breaking MC-2)**: continuing Example 1 ($n=2$): working out the recurrence explicitly (details of the recurrence derivation aside), the resulting series TERMINATES after the $x^2$ term, giving $P_2(x)=\frac12(3x^2-1)$ (the standard normalization) — a genuine DEGREE-2 POLYNOMIAL, with all higher coefficients forced to zero by the recurrence. Contrast: for $n=2.5$ (NOT a non-negative integer), the SAME recurrence procedure produces a series that NEVER terminates — an infinite series solution, qualitatively different in kind from $P_2(x)$'s finite polynomial, even though both solve "the same equation" with a different specific value of $n$ plugged in.

**Example 3 (LO3, orientation level — orthogonality and spherical-symmetry motivation, breaking MC-3)**: the Legendre polynomials satisfy $\int_{-1}^1P_m(x)P_n(x)\,dx=0$ for $m\ne n$ (orthogonality on $[-1,1]$ with weight $w=1$) — EXACTLY `math.fnal.special-functions`'s own claim about Sturm-Liouville eigenfunctions forming orthogonal systems, here verified (in spirit) as one specific named instance of that general framework. Separately, solving Laplace's equation $\nabla^2u=0$ in SPHERICAL coordinates and separating variables produces, for the polar-angle ($\theta$) part of the solution, an equation that becomes EXACTLY Legendre's equation (with $x=\cos\theta$) — analogous to how `math.de.bessel-equation`'s own equation arose from the RADIAL part of a CYLINDRICAL-coordinate separation, confirming Legendre's equation is similarly motivated by genuine physical geometry (sphericity), not an arbitrary example ODE.

## Component 5 — Teaching Actions

### Teaching Action A01 — Legendre's Equation Uses the Standard Ordinary-Point Ansatz Directly (Primitive P11: Representation Shift)

State: "you don't need any special modification here — checking that $x=0$ is an ORDINARY point of Legendre's equation confirms `math.de.series-solution`'s own standard ansatz applies directly, with no Frobenius-style extra factor needed." Walk Example 1's direct application of the standard ansatz.

- **MC-1 hook**: ask "does solving Legendre's equation require the Frobenius method's modified ansatz (with an extra $x^r$ factor), the same way Bessel's equation does?" — a "yes" answer reveals MC-1 (missing that Legendre's equation has $x=0$ as an ORDINARY point, requiring only the standard series-solution ansatz).

### Teaching Action A02 — Integer n Terminates Into a Genuine Polynomial; Other n Does Not (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $n=2$ produces a genuinely terminating degree-2 polynomial $P_2(x)$, while $n=2.5$ (same equation, different $n$) produces a NEVER-terminating infinite series. State: "whether the resulting solution is a genuine finite polynomial or an infinite series depends critically on whether $n$ happens to be a non-negative integer — this isn't a minor detail, it's a qualitative difference in the kind of solution you get."

- **MC-2 hook**: ask "does the series-solution procedure applied to Legendre's equation always produce a polynomial solution, regardless of the specific value of $n$?" — a "yes" answer reveals MC-2 (missing that only non-negative integer $n$ produces a genuinely terminating polynomial; other values give an infinite series).

### Teaching Action A03 — Legendre's Equation Is Motivated By Spherical Symmetry, Not Arbitrary (Primitive P06: Contrast Pair)

Contrast a hypothetical "Legendre's equation is just another example ODE for practicing series solutions" view against Example 3's direct derivation connecting it to spherical-coordinate separation of variables — genuinely analogous to how `math.de.bessel-equation`'s own equation arose from cylindrical symmetry. State: "just as Bessel's equation is the natural radial equation for cylindrical problems, Legendre's equation is the natural angular equation for spherical problems — it's not an arbitrary textbook example."

- **MC-3 hook**: ask "is Legendre's equation an arbitrary example ODE, chosen mainly for series-solution practice, unconnected to any specific physical geometry?" — a "yes" answer reveals MC-3 (missing that it arises naturally from spherical-coordinate separation of variables, analogous to Bessel's equation and cylindrical symmetry).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify $x=0$ is an ordinary point of Legendre's equation, and state which ansatz (`math.de.series-solution`'s standard form, or Frobenius's modified form) should be used.
  2. Explain, in one or two sentences, what happens qualitatively differently to the series solution when $n$ is a non-negative integer versus when it is not.
  3. State the domain and weight function for the Legendre polynomials' orthogonality, citing `math.fnal.special-functions`'s own framework.
  4. Explain how Legendre's equation is analogous to Bessel's equation in terms of its geometric motivation (spherical versus cylindrical symmetry).
- **P76 (Transfer Probe, mode = cross-link probe engaging `math.fnal.special-functions`)**: "A physicist solving the hydrogen atom's Schrödinger equation in spherical coordinates encounters Legendre's equation (in a generalized 'associated' form) for the angular part of the wavefunction, needing to expand a given angular function $f(\theta)$ in terms of Legendre polynomials. (a) Explain why $x=0$ (corresponding to $\theta=\pi/2$) being an ordinary point of the underlying equation means the standard series ansatz — not Frobenius's modification — is the appropriate starting point for deriving these solutions. (b) Explain, citing `math.fnal.special-functions`'s own Sturm-Liouville framework directly, why the Legendre polynomials' orthogonality on $[-1,1]$ is exactly the kind of property that framework predicts for such equation-generated function families. (c) Explain why the physicist specifically needs $n$ to be a non-negative integer for the angular wavefunction to be physically well-behaved (a genuine polynomial, not an infinite series), connecting this to Example 2's termination condition."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LEGENDRE-ASSUMED-TO-NEED-FROBENIUS | Believing Legendre's equation requires the Frobenius method's modified ansatz, missing that $x=0$ is an ordinary point, requiring only the standard series-solution ansatz | Foundational |
| MC-2 | LEGENDRE-SERIES-ASSUMED-ALWAYS-POLYNOMIAL | Believing the series-solution procedure applied to Legendre's equation always produces a polynomial regardless of $n$, missing that only non-negative integer $n$ terminates | High |
| MC-3 | LEGENDRE-EQUATION-ASSUMED-ARBITRARY-EXAMPLE | Believing Legendre's equation is an arbitrary example ODE unconnected to physical geometry, missing that it arises from spherical-coordinate separation of variables | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Legendre Assumed to Need Frobenius") → P41 (detect: ask whether Legendre's equation requires the Frobenius method) → P64 (conceptual shift: re-walk Example 1's direct standard-ansatz application, re-anchoring on "$x=0$ is an ordinary point, requiring only the standard ansatz").
- **B02 (targets MC-2)**: P27 (name it: "Legendre Series Assumed Always Polynomial") → P41 (detect: ask whether the series solution always produces a polynomial regardless of $n$) → P64 (conceptual shift: re-walk Example 2's integer-versus-non-integer $n$ contrast, re-anchoring on "only non-negative integer $n$ terminates into a genuine polynomial").
- **B03 (targets MC-3)**: P27 (name it: "Legendre Equation Assumed Arbitrary Example") → P41 (detect: ask whether Legendre's equation is an arbitrary example unconnected to physical geometry) → P64 (conceptual shift: re-walk Example 3's spherical-coordinate separation derivation, re-anchoring on "it arises naturally from spherical symmetry, analogous to Bessel's equation and cylindrical symmetry").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.series-solution` (the ordinary-point ansatz and coefficient-recurrence procedure this concept applies directly, with no Frobenius modification needed).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.fnal.special-functions`, checked via `ls docs/curriculum/blueprints/` and confirmed ALREADY authored. $P76_{mode}=$ **cross-link probe**, engaging `math.fnal.special-functions`'s own Sturm-Liouville-eigenfunction/orthogonal-polynomial framework directly in Component 3's orthogonality argument and the P76 transfer probe.

## Component 8 — Teaching Notes

- estimated_hours = 6 with an expert/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (the ordinary-point ansatz application and the integer-versus-non-integer termination contrast) and LO3 kept orientation-level, appropriately previewing orthogonality and the spherical-symmetry motivation without deriving the orthogonality proof or the full spherical-coordinate separation.
- **Division of labor**: `math.de.series-solution` owns the general ordinary-point ansatz and recurrence-derivation procedure; `math.fnal.special-functions` owns the general Sturm-Liouville-eigenfunction/orthogonal-polynomial framework, of which the Legendre polynomials are cited there as one instance among several (Hermite, Laguerre, Chebyshev). This concept owns the SPECIFIC application of the series-solution procedure to Legendre's equation and the integer-termination phenomenon — deliberately contrasting $n=2$ (terminating) against $n=2.5$ (non-terminating) on the SAME equation in Example 2 to isolate integer-ness as the single relevant variable.
- Example 3's deliberate choice to draw the DIRECT parallel to `math.de.bessel-equation`'s own cylindrical-symmetry motivation (rather than developing the spherical-coordinate separation from scratch) was chosen to leverage an already-established pattern from a sibling concept, reinforcing the "one construction, varied by geometry" theme `math.fnal.special-functions` itself establishes.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.fnal.special-functions` confirmed authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.7×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: applying the series-solution procedure to Legendre's equation for a small case precedes the general polynomial family) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
