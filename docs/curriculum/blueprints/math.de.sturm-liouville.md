# Teaching Blueprint: Sturm-Liouville Theory (`math.de.sturm-liouville`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.sturm-liouville` |
| name | Sturm-Liouville Theory |
| domain | Differential Equations |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.7 → MAMR = ⌈0.7×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.de.second-order-linear`, `math.de.bvp`, `math.linalg.inner-product` |
| unlocks | `math.de.eigenfunction-expansion` |
| cross_links | `math.fnal.spectral-theory` |
| CPA_entry_stage | C (Concrete) — testing a specific non-eigenvalue against the classic y''+λy=0 boundary value problem before the general eigenvalue theory | 
| description (KG) | The boundary value problem (p(x)y′)′+q(x)y+λw(x)y=0 with boundary conditions. Has countably many eigenvalues λₙ and orthogonal eigenfunctions φₙ forming a complete set in L²([a,b],w). |

## Component 1 — Learning Objectives

- LO1: Define the Sturm-Liouville problem $(p(x)y')'+q(x)y+\lambda w(x)y=0$ on $[a,b]$ with boundary conditions — a specific second-order linear ODE (per `math.de.second-order-linear`'s standard form, in self-adjoint form) combined with a genuine BVP (per `math.de.bvp`'s two-point boundary conditions), where $\lambda$ is treated as an unknown PARAMETER rather than a fixed given constant.
- LO2: Recognize that MOST values of $\lambda$ give ONLY the trivial solution $y=0$ (directly `math.de.bvp`'s own "existence not guaranteed" caution, applied per-$\lambda$) — while special discrete **eigenvalues** $\lambda_n$ admit a genuine nonzero **eigenfunction** $\varphi_n$ — and compute both directly for the classic problem $y''+\lambda y=0$ on $[0,\pi]$, $y(0)=y(\pi)=0$.
- LO3: State that the eigenfunctions $\varphi_n$ are ORTHOGONAL under the WEIGHTED inner product $\langle f,g\rangle=\int_a^b f(x)g(x)w(x)\,dx$ (directly generalizing `math.linalg.inner-product`'s own framework with an explicit weight function $w(x)$) and form a COMPLETE set in $L^2([a,b],w)$ — recognizing this as a concrete instance of `math.fnal.spectral-theory`'s own general Spectral Theorem for self-adjoint operators.

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.second-order-linear` (standard form $y''+P(x)y'+Q(x)y=G(x)$; homogeneous vs. nonhomogeneous; superposition), `math.de.bvp` (a BVP's solution may be nonexistent, unique, or infinite, unlike an IVP), and `math.linalg.inner-product` (the inner product axioms; positive-definiteness must be checked explicitly, not assumed).

## Component 3 — Core Explanation

**A BVP where $\lambda$ is an unknown parameter, not a given constant**: the Sturm-Liouville equation $(p(x)y')'+q(x)y+\lambda w(x)y=0$, together with boundary conditions on $[a,b]$, is a specific second-order linear ODE (`math.de.second-order-linear`'s standard form, rearranged into self-adjoint form) combined with `math.de.bvp`'s own two-point boundary conditions — but with $\lambda$ left as an UNKNOWN parameter to be determined, rather than a fixed given number.

**Most $\lambda$ give only the trivial solution — eigenvalues are special**: for a GIVEN $\lambda$, this is an ordinary BVP, and `math.de.bvp` already warns that existence is not guaranteed. In fact, for MOST values of $\lambda$, the ONLY solution satisfying both the ODE and the boundary conditions is the trivial one, $y\equiv0$. Only at special, discrete values $\lambda_n$ (the **eigenvalues**) does a genuine NONZERO solution $\varphi_n$ (an **eigenfunction**) exist.

**Orthogonality uses the WEIGHT function $w(x)$, and connects to the general Spectral Theorem**: the eigenfunctions $\varphi_n$ are mutually ORTHOGONAL, but specifically under the WEIGHTED inner product $\langle f,g\rangle=\int_a^b f(x)g(x)w(x)\,dx$ — directly generalizing `math.linalg.inner-product`'s own inner-product framework by explicitly including the weight $w(x)$ that appears in the original differential equation. The Sturm-Liouville differential operator is **self-adjoint** with respect to this weighted inner product — a direct, concrete instance of `math.fnal.spectral-theory`'s own general finding that self-adjoint operators have real eigenvalues and (here) a complete orthogonal set of eigenfunctions.

## Component 4 — Worked Examples

**Example 1 (LO1/LO2 — most λ give only the trivial solution; special λ_n give eigenfunctions, breaking MC-1)**: For $y''+\lambda y=0$ on $[0,\pi]$, $y(0)=y(\pi)=0$: with $\lambda=2$ (a non-eigenvalue candidate), the general solution is $y=A\cos(\sqrt2x)+B\sin(\sqrt2x)$. $y(0)=A=0$. $y(\pi)=B\sin(\sqrt2\pi)=0$ — since $\sqrt2$ is irrational, $\sqrt2\pi$ is not an integer multiple of $\pi$, so $\sin(\sqrt2\pi)\ne0$, forcing $B=0$ too. Only the TRIVIAL solution $y=0$ exists for $\lambda=2$. Now $\lambda=1$: $y=A\cos(x)+B\sin(x)$. $y(0)=A=0$. $y(\pi)=B\sin(\pi)=0$ — automatically satisfied for ANY $B$, since $\sin(\pi)=0$ exactly! So $\lambda_1=1$ IS a genuine eigenvalue, with nonzero eigenfunction $\varphi_1(x)=\sin(x)$ (for any nonzero $B$). In general, $\lambda_n=n^2$ for $n=1,2,3,\ldots$, with $\varphi_n(x)=\sin(nx)$.

**Example 2 (LO3 — weighted orthogonality, breaking MC-2)**: For this problem, $w(x)=1$, so the weighted inner product coincides with the ordinary one here: $\langle\varphi_1,\varphi_2\rangle=\int_0^\pi\sin(x)\sin(2x)\,dx=0$ (a standard trigonometric-orthogonality computation) — confirming orthogonality. But for a GENERAL Sturm-Liouville problem with $w(x)\ne1$, orthogonality is $\int_a^b\varphi_m\varphi_n w(x)\,dx=0$ — the SAME weight function $w(x)$ that appears in the original differential equation MUST be included; using the plain unweighted integral would be checking the wrong inner product entirely, a distinction this simplest example's $w=1$ happens to hide.

**Example 3 (LO3 — connection to the general Spectral Theorem and to Fourier series, orientation level, breaking MC-3)**: The Sturm-Liouville operator here, $L[y]=-y''$ (rearranging $y''+\lambda y=0$ as $Ly=\lambda y$), is self-adjoint with respect to the weighted (here, ordinary) inner product — a direct instance of `math.fnal.spectral-theory`'s own self-adjoint-operator framework, matching that theory's guarantee of REAL eigenvalues (indeed $\lambda_n=n^2$ are real and positive here). Moreover, the eigenfunctions $\{\sin(nx)\}$ forming a "complete set in $L^2([0,\pi])$" is EXACTLY the same completeness idea underlying `math.calc.fourier-series-intro`'s own Fourier sine series — Sturm-Liouville theory is the general machinery explaining WHY Fourier series work, generalized to other weight functions and differential operators beyond this simplest case.

## Component 5 — Teaching Actions

### Teaching Action A01 — Most λ Give Only the Trivial Solution (Primitive P28: Conflict Evidence)

Present Example 1's direct evidence: $\lambda=2$ forces $y\equiv0$ (the trivial solution only), while $\lambda=1$ genuinely admits the nonzero eigenfunction $\sin(x)$. State: "for almost every value of $\lambda$, this BVP has ONLY the trivial solution — genuine nonzero eigenfunctions exist only at the special, discrete eigenvalues."

- **MC-1 hook**: ask "does the Sturm-Liouville BVP have a genuine nonzero solution for every value of λ?" — a "yes" answer reveals MC-1 (missing that only special discrete eigenvalues admit a nonzero eigenfunction).

### Teaching Action A02 — Orthogonality Uses the Weight Function w(x) (Primitive P11: Representation Shift)

State: "orthogonality here is with respect to the WEIGHTED inner product, $\int fg\,w\,dx$ — this example's $w=1$ happens to make that invisible, but the weight is genuinely part of the definition, taken directly from the original differential equation." Work Example 2's orthogonality verification, explicitly flagging the weight's role.

- **MC-2 hook**: ask "is Sturm-Liouville eigenfunction orthogonality always checked using the plain, unweighted integral ∫fg dx?" — a "yes" answer reveals MC-2 (missing that the weight function w(x) from the original equation must be included in general).

### Teaching Action A03 — This Is a Concrete Instance of the General Spectral Theorem (Primitive P06: Contrast Pair)

Contrast this concept's concrete, fully computable eigenvalue problem ($\lambda_n=n^2$, $\varphi_n=\sin(nx)$) against `math.fnal.spectral-theory`'s own general, abstract self-adjoint-operator framework. State: "this isn't an isolated trick specific to one differential equation — it's a concrete, fully computable instance of the general Spectral Theorem, and it's exactly the machinery underlying Fourier series."

- **MC-3 hook**: ask "is the Sturm-Liouville eigenfunction-completeness result a special, isolated fact unrelated to the general theory of self-adjoint operators?" — a "yes" answer reveals MC-3 (missing the direct structural connection to `math.fnal.spectral-theory`'s general framework).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $y''+\lambda y=0$ on $[0,\pi]$, $y(0)=y(\pi)=0$, verify $\lambda=4$ is an eigenvalue and find its eigenfunction.
  2. Verify $\lambda=3$ (not a perfect square) gives only the trivial solution for the same BVP.
  3. Compute $\int_0^\pi\sin(2x)\sin(3x)\,dx$ and confirm it equals $0$, illustrating eigenfunction orthogonality.
  4. Explain why the weight function $w(x)$ must be included in the orthogonality integral for a general Sturm-Liouville problem, even though it happens to equal $1$ in this lesson's main example.
- **P76 (Transfer Probe, mode = cross-link probe against `math.fnal.spectral-theory`)**: "Recall from `math.fnal.spectral-theory` that a self-adjoint bounded operator has real spectrum, and the general Spectral Theorem describes how such operators 'diagonalize' via a spectral measure or discrete eigenbasis. (a) Explain how the Sturm-Liouville differential operator $L[y]=-y''$ from this lesson, being self-adjoint with respect to the weighted inner product, is a direct concrete instance of that general self-adjoint framework. (b) Explain why the eigenvalues $\lambda_n=n^2$ found in this lesson are all real and positive, connecting this to that concept's own self-adjoint-implies-real-spectrum guarantee. (c) Explain how this lesson's 'complete set of orthogonal eigenfunctions in $L^2([a,b],w)$' directly parallels that concept's own discussion of spectral decomposition, and why the Sturm-Liouville case is a genuinely SIMPLER instance (a discrete eigenvalue set, unlike the possibly-continuous spectrum that general theory allows for)."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | STURM-LIOUVILLE-BVP-ASSUMED-SOLVABLE-FOR-EVERY-LAMBDA | Believing the Sturm-Liouville BVP has a genuine nonzero solution for every value of lambda, missing that only special discrete eigenvalues admit a nonzero eigenfunction | Foundational |
| MC-2 | ORTHOGONALITY-ASSUMED-UNWEIGHTED | Believing eigenfunction orthogonality always uses the plain unweighted integral, missing that the general case requires including the weight function w(x) from the original equation | Foundational |
| MC-3 | STURM-LIOUVILLE-TREATED-AS-ISOLATED-FROM-SPECTRAL-THEORY | Believing the eigenfunction-completeness result is a special, isolated fact unique to this differential equation, missing its direct connection to the general Spectral Theorem for self-adjoint operators | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Sturm-Liouville BVP Assumed Solvable for Every Lambda") → P41 (detect: ask a student whether the BVP has a nonzero solution for an arbitrary chosen $\lambda$, and check for a "yes") → P64 (conceptual shift: re-walk Example 1's contrast between $\lambda=2$ (trivial only) and $\lambda=1$ (genuine eigenfunction), re-anchoring on "only special discrete eigenvalues admit a nonzero solution — most values of $\lambda$ don't").
- **B02 (targets MC-2)**: P27 (name it: "Orthogonality Assumed Unweighted") → P41 (detect: ask a student to state the orthogonality integral for a general Sturm-Liouville problem, and check whether they omit the weight $w(x)$) → P64 (conceptual shift: re-walk Example 2's explicit flag that $w=1$ here but the general formula needs $w(x)$, re-anchoring on "the weight comes directly from the original equation — never omit it in general").
- **B03 (targets MC-3)**: P27 (name it: "Sturm-Liouville Treated as Isolated from Spectral Theory") → P41 (detect: ask a student whether this eigenfunction-completeness result is connected to any more general theory, and check for a "no") → P64 (conceptual shift: re-walk Example 3's direct connection to `math.fnal.spectral-theory`'s self-adjoint framework, re-anchoring on "this is a concrete, computable instance of that general theory, not an isolated trick").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.second-order-linear` (the standard ODE form this concept's self-adjoint form is built from), `math.de.bvp` (the two-point boundary conditions and "existence not guaranteed" caution this concept applies per-$\lambda$), `math.linalg.inner-product` (the inner product framework this concept's weighted version directly generalizes).
- **Unlocks**: `math.de.eigenfunction-expansion` (expands general functions in terms of Sturm-Liouville eigenfunctions, directly using this concept's completeness result).
- **Cross-link (P76_mode = cross-link probe against `math.fnal.spectral-theory`, already authored)**: the transfer probe explicitly connects this concept's concrete, fully computable eigenvalue problem to that concept's general self-adjoint-operator framework, framing Sturm-Liouville theory as a genuinely simpler special case.

## Component 8 — Teaching Notes

- estimated_hours = 8 with an expert/analyze tag places this at a "3 TAs + gate" tier — A01 (most λ give only the trivial solution), A02 (weighted orthogonality), and A03 (the connection to the general Spectral Theorem) each target a distinct LO, appropriate for a concept synthesizing three already-mastered prerequisites into one rich new eigenvalue-problem framework.
- The classic $y''+\lambda y=0$ problem on $[0,\pi]$ was deliberately chosen as the simplest possible Sturm-Liouville example (with $p=1,q=0,w=1$) specifically because it directly connects to `math.calc.fourier-series-intro`'s own already-authored Fourier sine series content, letting Example 3 make that connection concrete rather than asserted.
- Example 2 deliberately uses a case where $w=1$ (making the weight invisible) specifically to teach the IMPORTANT general point (the weight matters, and comes from the equation) precisely where a learner might otherwise never notice its role, rather than avoiding the subtlety by choosing a different example.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (all three) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.fnal.spectral-theory authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe against math.fnal.spectral-theory) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.7×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: specific non-eigenvalue tested before the general eigenvalue theory) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO3, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
