# Teaching Blueprint: Special Functions (`math.fnal.special-functions`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.fnal.special-functions` |
| name | Special Functions |
| domain | Functional Analysis |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.6 → MAMR = ⌈0.6×5⌉ = 3/5 |
| estimated_hours | 8 |
| requires | `math.fnal.hilbert-space`, `math.de.bessel-equation` |
| unlocks | none |
| cross_links | `math.de.bessel-equation` (authored earlier — see Component 7), `math.de.legendre-equation` (not yet authored) |
| CPA_entry_stage | A (Abstract) — expert learner already has Bessel functions and Hilbert spaces; the Gamma function and orthogonal-polynomial family are introduced directly |
| description (KG) | $\Gamma(z)=\int_0^\infty t^{z-1}e^{-t}\,dt$ (meromorphic extension of factorial). $B(x,y)=\Gamma(x)\Gamma(y)/\Gamma(x+y)$. Orthogonal polynomials (Hermite, Laguerre, Legendre, Chebyshev) arise as eigenfunctions of Sturm-Liouville problems and form ONBs in weighted $L^2$ spaces. |

## Component 1 — Learning Objectives

- LO1: Define the Gamma function $\Gamma(z)=\int_0^\infty t^{z-1}e^{-t}\,dt$ and verify it EXTENDS the factorial: $\Gamma(n+1)=n!$ for non-negative integers $n$ — recognizing $\Gamma$ as a genuine, well-motivated GENERALIZATION of factorial to non-integer (and complex) arguments, not an arbitrary formula that happens to agree at integers.
- LO2: Recognize $J_\nu(x)$ (`math.de.bessel-equation`'s own Bessel functions) alongside the orthogonal-polynomial families (Hermite, Laguerre, Legendre, Chebyshev) as members of ONE UNIFIED CLASS — all arising as EIGENFUNCTIONS of specific Sturm-Liouville problems, forming orthonormal bases (ONBs) in appropriately weighted $L^2$ spaces, directly connecting to `math.fnal.hilbert-space`'s own orthonormal-basis machinery.
- LO3 (orientation level — full construction of each specific family deferred): recognize, without full derivation, that DIFFERENT weight functions and domains in the Sturm-Liouville setup produce DIFFERENT specific families (Legendre on $[-1,1]$ with weight $1$; Hermite on $(-\infty,\infty)$ with weight $e^{-x^2}$; Laguerre on $[0,\infty)$ with weight $e^{-x}$) — the SAME underlying construction principle, varied by domain and weight, previewing that "special functions" is not a disconnected catalogue but one construction pattern instantiated many ways.

## Component 2 — Prerequisite Check

Assumes mastery of `math.fnal.hilbert-space` (complete inner product spaces, orthonormal bases) and `math.de.bessel-equation` ($x^2y''+xy'+(x^2-\nu^2)y=0$, with solutions $J_\nu$ regular at the origin and $Y_\nu$ singular there).

## Component 3 — Core Explanation

**The Gamma function is a well-motivated extension of factorial, not an arbitrary formula**: for a positive integer $n$, integration by parts on $\Gamma(n+1)=\int_0^\infty t^ne^{-t}\,dt$ shows $\Gamma(n+1)=n\Gamma(n)$ — the SAME recursive relationship as factorial ($n!=n\cdot(n-1)!$) — and $\Gamma(1)=\int_0^\infty e^{-t}\,dt=1=0!$, so BY INDUCTION $\Gamma(n+1)=n!$ for every non-negative integer $n$. Crucially, the INTEGRAL DEFINITION makes sense for ANY $z$ with positive real part, not just integers — giving a genuine, analytically well-defined extension of factorial to non-integer (and, via further extension, complex) values, not merely a formula that coincidentally matches at integer points.

**Bessel functions and orthogonal polynomials are all Sturm-Liouville eigenfunctions — one unified class, not a disconnected catalogue**: `math.de.bessel-equation`'s $J_\nu(x)$ arises as the (regular) solution to a specific Sturm-Liouville-type eigenvalue problem. The Legendre, Hermite, Laguerre, and Chebyshev polynomial families ALSO each arise as eigenfunctions of THEIR OWN specific Sturm-Liouville problems — and, exactly as `math.fnal.hilbert-space`'s own orthonormal-basis theory guarantees, each family forms a COMPLETE orthogonal system (an ONB, once normalized) in the appropriately WEIGHTED $L^2$ space for its own domain and weight function. These are not separately-invented curiosities; they are all INSTANCES of the same general Sturm-Liouville-eigenfunction-ONB construction.

**Different domains and weights produce different specific families — one construction pattern, many instances (orientation level)**: the SAME general Sturm-Liouville setup, varied by CHOICE of domain and weight function $w(x)$, produces each specific named family: Legendre polynomials arise on $[-1,1]$ with $w(x)=1$; Hermite polynomials arise on $(-\infty,\infty)$ with $w(x)=e^{-x^2}$; Laguerre polynomials arise on $[0,\infty)$ with $w(x)=e^{-x}$; Chebyshev polynomials arise on $[-1,1]$ with a specific weight $w(x)=1/\sqrt{1-x^2}$. This variation-by-domain-and-weight is the organizing principle behind the entire "special functions" catalogue — previewed here, with full construction of each specific family deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — verifying $\Gamma$ extends factorial, breaking MC-1)**: computing $\Gamma(1)=\int_0^\infty e^{-t}\,dt=[-e^{-t}]_0^\infty=0-(-1)=1=0!$ ✓. Using integration by parts on $\Gamma(2)=\int_0^\infty te^{-t}\,dt$: with $u=t,dv=e^{-t}dt$, $\Gamma(2)=[-te^{-t}]_0^\infty+\int_0^\infty e^{-t}\,dt=0+1=1=1!$ ✓. By the SAME recursive pattern, $\Gamma(3)=2\Gamma(2)=2=2!$, $\Gamma(4)=3\Gamma(3)=6=3!$ — each step directly verifiable, confirming $\Gamma(n+1)=n!$ holds not by coincidence but by the SAME recursive relation ($\Gamma(n+1)=n\Gamma(n)$) that defines factorial itself.

**Example 2 (LO2 — Bessel functions and orthogonal polynomials as one unified class, breaking MC-2)**: `math.de.bessel-equation`'s $J_\nu(x)$ arises from the Sturm-Liouville-type equation $x^2y''+xy'+(x^2-\nu^2)y=0$, and (analogously to `math.de.sturm-liouville`'s own completeness guarantee) forms an ONB in an appropriately weighted $L^2$ space on a bounded interval. The Legendre polynomials $P_n(x)$ arise from the DIFFERENT equation $(1-x^2)y''-2xy'+n(n+1)y=0$ on $[-1,1]$ (weight $w=1$), and ALSO form an ONB in their own weighted $L^2([-1,1],1)$ space. Despite looking superficially unrelated (a Bessel function and a polynomial), BOTH are Sturm-Liouville eigenfunctions, and both are used identically — via `math.de.eigenfunction-expansion`'s own coefficient formula $c_n=\langle f,\varphi_n\rangle/\langle\varphi_n,\varphi_n\rangle$ — to expand functions in their respective spaces.

**Example 3 (LO3, orientation level — different weight/domain choices producing different families, breaking MC-3)**: the Hermite equation $y''-2xy'+2ny=0$ on $(-\infty,\infty)$ with weight $w(x)=e^{-x^2}$ produces the Hermite polynomials $H_n(x)$ — used, e.g., in quantum harmonic oscillator wavefunctions. The Laguerre equation $xy''+(1-x)y'+ny=0$ on $[0,\infty)$ with weight $w(x)=e^{-x}$ produces the Laguerre polynomials $L_n(x)$ — used, e.g., in hydrogen-atom radial wavefunctions. Comparing these to Example 2's Legendre case: THREE DIFFERENT domains ($(-\infty,\infty)$, $[0,\infty)$, $[-1,1]$) and THREE DIFFERENT weight functions ($e^{-x^2}$, $e^{-x}$, $1$) each produce a DIFFERENT named polynomial family — confirming these are not independently-invented objects, but the SAME Sturm-Liouville-eigenfunction construction, instantiated with different domain/weight choices.

## Component 5 — Teaching Actions

### Teaching Action A01 — Gamma Extends Factorial By the Same Recursive Relation, Not Coincidentally (Primitive P11: Representation Shift)

State: "$\Gamma(n+1)=n!$ isn't a lucky formula that happens to match at integers — the SAME recursive relation ($\Gamma(n+1)=n\Gamma(n)$, exactly like $n!=n\cdot(n-1)!$) forces this agreement, step by step." Walk Example 1's direct verification through $\Gamma(4)=3!$.

- **MC-1 hook**: ask "is $\Gamma(n+1)=n!$ a coincidental numeric match, with $\Gamma$'s integral definition being fundamentally unrelated to how factorial is actually defined?" — a "yes" answer reveals MC-1 (missing that the SAME recursive relation underlies both, forcing the agreement).

### Teaching Action A02 — Bessel Functions and Orthogonal Polynomials Are Genuinely the Same Kind of Object (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: despite looking superficially unrelated, $J_\nu(x)$ and $P_n(x)$ are BOTH Sturm-Liouville eigenfunctions, both forming ONBs, both usable via the SAME `math.de.eigenfunction-expansion` coefficient formula. State: "a Bessel function and a Legendre polynomial look nothing alike on the surface — but structurally, they're the same KIND of object: Sturm-Liouville eigenfunctions, forming orthonormal bases, expanded the same way."

- **MC-2 hook**: ask "are Bessel functions and the orthogonal-polynomial families (Hermite, Laguerre, Legendre, Chebyshev) fundamentally different, unrelated kinds of special functions, despite both appearing in this course?" — a "yes" answer reveals MC-2 (missing that both arise as Sturm-Liouville eigenfunctions, one unified class).

### Teaching Action A03 — Different Weights and Domains Generate Different Named Families From One Pattern (Primitive P06: Contrast Pair)

Contrast Example 3's THREE different domain/weight choices (Hermite, Laguerre, Legendre) — each producing a genuinely different family — against a hypothetical view that these are independently invented. State: "the entire catalogue of named orthogonal-polynomial families isn't a list of separately-discovered objects — it's ONE construction, run with different domain and weight choices each time."

- **MC-3 hook**: ask "were the Hermite, Laguerre, Legendre, and Chebyshev polynomial families each independently invented, using fundamentally different mathematical constructions?" — a "yes" answer reveals MC-3 (missing that all four arise from the SAME Sturm-Liouville-eigenfunction construction, varied only by domain and weight).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute $\Gamma(5)$ using the recursive relation $\Gamma(n+1)=n\Gamma(n)$, starting from $\Gamma(1)=1$, and verify it matches $4!$.
  2. Explain, citing Sturm-Liouville theory, what Bessel functions and Legendre polynomials genuinely have in common, beyond both being called "special functions."
  3. State the domain and weight function for the Hermite polynomials, and for the Laguerre polynomials, and explain how these choices distinguish the two families.
  4. Explain, in one or two sentences, why $\Gamma(z)$ is considered a genuine extension of factorial rather than an unrelated function that happens to agree at integers.
- **P76 (Transfer Probe, mode = cross-link probe engaging `math.de.bessel-equation`)**: "A physicist solving the 3D Schrödinger equation for the hydrogen atom in spherical coordinates encounters both a radial equation (producing Laguerre-polynomial-related solutions) and an angular equation (producing Legendre-polynomial-related solutions), analogous to how `math.de.bessel-equation`'s own radial equation arose from separating the 2D wave equation in cylindrical coordinates. (a) Explain why it is NOT a coincidence that both the hydrogen-atom problem and the earlier cylindrical-drumhead problem each produce a Sturm-Liouville-type equation for their radial part. (b) Identify what would need to differ between the hydrogen-atom radial equation's domain/weight and Bessel's equation's own domain/weight, given that they produce different named function families. (c) Explain how `math.fnal.hilbert-space`'s own completeness guarantee would let the physicist expand an arbitrary wavefunction in terms of whichever eigenfunction family arises, using `math.de.eigenfunction-expansion`'s coefficient formula."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 3/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | GAMMA-ASSUMED-COINCIDENTAL-MATCH | Believing $\Gamma(n+1)=n!$ is a coincidental numeric match, missing that the same recursive relation underlies both, forcing the agreement | Foundational |
| MC-2 | BESSEL-AND-POLYNOMIALS-ASSUMED-UNRELATED | Believing Bessel functions and orthogonal polynomials are fundamentally different, unrelated kinds of special functions, missing that both are Sturm-Liouville eigenfunctions | High |
| MC-3 | POLYNOMIAL-FAMILIES-ASSUMED-INDEPENDENTLY-INVENTED | Believing the named polynomial families were each independently invented via different constructions, missing that all arise from the same Sturm-Liouville construction, varied by domain and weight | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Gamma Assumed Coincidental Match") → P41 (detect: ask whether $\Gamma(n+1)=n!$ is a coincidental match) → P64 (conceptual shift: re-walk Example 1's step-by-step recursive verification, re-anchoring on "the same recursive relation forces the agreement").
- **B02 (targets MC-2)**: P27 (name it: "Bessel and Polynomials Assumed Unrelated") → P41 (detect: ask whether Bessel functions and orthogonal polynomials are fundamentally different) → P64 (conceptual shift: re-walk Example 2's shared Sturm-Liouville-eigenfunction structure, re-anchoring on "one unified class").
- **B03 (targets MC-3)**: P27 (name it: "Polynomial Families Assumed Independently Invented") → P41 (detect: ask whether the named polynomial families were independently invented) → P64 (conceptual shift: re-walk Example 3's three-domain/weight comparison, re-anchoring on "one construction, varied by domain and weight").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.fnal.hilbert-space` (completeness, orthonormal bases — the framework guaranteeing each special-function family spans its weighted $L^2$ space) and `math.de.bessel-equation` ($J_\nu$ and $Y_\nu$, the concrete Bessel-function instance this concept generalizes from).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.de.bessel-equation` (checked, already authored, also a direct prerequisite) and `math.de.legendre-equation` (checked via `ls docs/curriculum/blueprints/`, confirmed NOT YET authored). $P76_{mode}=$ **cross-link probe**, engaging `math.de.bessel-equation`'s own radial-equation-from-cylindrical-symmetry motivation directly in the P76 transfer probe.

## Component 8 — Teaching Notes

- estimated_hours = 8 with an expert/analyze tag and a notably reduced mastery_threshold (0.6, MAMR 3/5) supports the "3 TAs + gate" tier at genuinely demanding scope, with LO1 and LO2 given full concrete verification (the recursive $\Gamma$-to-factorial derivation and the shared-structure identification) and LO3 kept orientation-level, appropriately surveying the domain/weight variation across four named families without constructing any single family's polynomials explicitly.
- **Division of labor**: `math.fnal.hilbert-space` owns the general completeness/ONB theory; `math.de.bessel-equation` owns the concrete Bessel-function construction. This concept owns UNIFYING these into the broader special-functions catalogue and introducing the Gamma function — deliberately citing `math.de.bessel-equation`'s own cylindrical-symmetry motivation directly in the P76 probe, drawing a genuine geometric parallel to the hydrogen-atom's spherical-coordinate separation rather than treating the two as unrelated examples.
- Example 3's deliberate choice to present THREE distinct domain/weight pairs side by side (rather than developing any single family in depth) was chosen to make the "one construction, varied by domain and weight" unifying claim as visually and structurally clear as possible at this concept's appropriately survey-level scope.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.de.bessel-equation` confirmed authored → cross-link probe; `math.de.legendre-equation` confirmed unauthored, noted) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.6×5⌉=3) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already has Bessel functions and Hilbert spaces; Gamma/polynomial families introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
