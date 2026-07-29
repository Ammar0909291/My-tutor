# Teaching Blueprint: Inverse Function Theorem (`math.real.inverse-function-theorem`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.real.inverse-function-theorem` |
| name | Inverse Function Theorem |
| domain | Real Analysis |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.real.differentiability-rigorous`, `math.linalg.matrix-inverse` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — direct statement, grounded immediately in the already-familiar single-variable inverse-derivative rule |
| description (KG) | If f:ℝⁿ→ℝⁿ is C¹ and Df(a) is invertible, then f is locally invertible near a with C¹ inverse satisfying D(f⁻¹)(f(a)) = [Df(a)]⁻¹. Proved using the Banach fixed-point theorem. |

## Component 1 — Learning Objectives

- LO1: State the **Inverse Function Theorem**: if $f:\mathbb{R}^n\to\mathbb{R}^n$ is $C^1$ (continuously differentiable) and the Jacobian matrix $Df(a)$ is **invertible** at a point $a$, then $f$ is **locally invertible** near $a$ — there exist open neighborhoods $U\ni a$ and $V\ni f(a)$ such that $f:U\to V$ is a bijection with a $C^1$ inverse.
- LO2: Apply the derivative formula for the local inverse, $D(f^{-1})(f(a))=[Df(a)]^{-1}$ (the derivative of the inverse is literally the matrix inverse of the original derivative, evaluated at the corresponding point), and correctly compute it for a specific $f$ at a specific point.
- LO3: Correctly recognize that the theorem gives ONLY a **local** guarantee — invertibility near $a$ — and does NOT imply $f$ is globally invertible on all of $\mathbb{R}^n$, distinguishing cases where local invertibility at every point still fails to produce a global inverse.

## Component 2 — Prerequisite Check

Assumes mastery of `math.real.differentiability-rigorous` (the rigorous multivariable derivative $Df(a)$ as a linear map/Jacobian matrix, and $C^1$ continuity of that derivative) and `math.linalg.matrix-inverse` (invertibility of a matrix, and computing $A^{-1}$).

## Component 3 — Core Explanation

The **Inverse Function Theorem**: let $f:\mathbb{R}^n\to\mathbb{R}^n$ be $C^1$ on an open set containing $a$, and suppose the Jacobian matrix $Df(a)$ is **invertible** (as a linear map / matrix — nonzero determinant). Then there exist open sets $U\ni a$ and $V\ni f(a)$ such that $f$ restricted to $U$ is a bijection onto $V$, with inverse $f^{-1}:V\to U$ that is ALSO $C^1$, and
$$D(f^{-1})(f(a)) = [Df(a)]^{-1}.$$

**The single-variable analogue you already know**: for $f:\mathbb{R}\to\mathbb{R}$ with $f'(a)\neq0$, $f$ is locally invertible near $a$ with $(f^{-1})'(f(a))=1/f'(a)$. The multivariable theorem is EXACTLY this same idea, generalized: "invertible derivative" becomes "invertible Jacobian MATRIX" (rather than "nonzero scalar derivative"), and the reciprocal $1/f'(a)$ becomes the matrix inverse $[Df(a)]^{-1}$.

**Proof strategy (sketch, at orientation level)**: the theorem is proved using the **Banach fixed-point theorem** — one constructs an auxiliary contraction mapping (built from $f$ and an approximate inverse using $[Df(a)]^{-1}$) whose unique fixed point produces the local inverse; $C^1$-ness of the inverse follows from a further estimate using the same setup. The proof is genuinely technical; at this level, the goal is to correctly USE the theorem's hypotheses and conclusion, not reproduce the fixed-point argument in full.

**Strictly LOCAL, not global**: the theorem's conclusion is about a neighborhood of $a$ ONLY. Even if $Df(x)$ is invertible at EVERY point $x$ in the domain, $f$ can still fail to be globally injective (a classic example: complex exponential-like maps, or in $\mathbb{R}^2$, polar-coordinate-style maps that wrap around and repeat) — local invertibility everywhere does not sum up to global invertibility.

## Component 4 — Worked Examples

**Example 1 (LO1/LO2 — applying the theorem and computing the derivative of the inverse)**: Let $f:\mathbb{R}^2\to\mathbb{R}^2$, $f(x,y)=(x+y^2,\,y+x^2)$, evaluated near $a=(0,0)$. Compute $Df(a)=\begin{pmatrix}1&2y\\2x&1\end{pmatrix}\Big|_{(0,0)}=\begin{pmatrix}1&0\\0&1\end{pmatrix}=I$ — invertible (determinant 1). By the theorem, $f$ is locally invertible near $(0,0)$, and $D(f^{-1})(f(0,0))=D(f^{-1})(0,0)=[Df(0,0)]^{-1}=I^{-1}=I$.

**Example 2 (LO2 — a genuinely non-identity Jacobian inverse)**: For the same $f$, evaluate near $a=(1,1)$: $Df(1,1)=\begin{pmatrix}1&2\\2&1\end{pmatrix}$, determinant $=1\cdot1-2\cdot2=-3\neq0$ — invertible. So $f$ is locally invertible near $(1,1)$, with $D(f^{-1})(f(1,1))=[Df(1,1)]^{-1}=\frac{1}{-3}\begin{pmatrix}1&-2\\-2&1\end{pmatrix}=\begin{pmatrix}-1/3&2/3\\2/3&-1/3\end{pmatrix}$ — obtained purely from inverting the Jacobian matrix, with NO need to find an explicit formula for $f^{-1}$ itself.

**Example 3 (LO3 — local invertibility everywhere without global invertibility, breaking MC-1)**: Let $f:\mathbb{R}^2\to\mathbb{R}^2$, $f(x,y)=(e^x\cos y,\,e^x\sin y)$ (the real form of the complex exponential $z\mapsto e^z$). Compute $\det Df(x,y) = e^{2x}>0$ EVERYWHERE — so $Df$ is invertible at every single point, and the Inverse Function Theorem applies locally at every point. Yet $f$ is NOT globally injective: $f(x,y)=f(x,y+2\pi)$ for all $x,y$ (since $\cos,\sin$ are $2\pi$-periodic) — so $f$ genuinely fails to be a global bijection, despite satisfying the theorem's LOCAL hypothesis at every point. This shows the theorem's guarantee is honestly and strictly local, never extending automatically to a global statement.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Theorem as a Direct Generalization of the 1D Case (Primitive P11: Representation Shift)

State the single-variable fact the student already knows ($f'(a)\neq0\implies$ local invertibility, $(f^{-1})'=1/f'$), then state the multivariable theorem as its direct generalization: "matrix invertibility replaces 'nonzero,' matrix inverse replaces 'reciprocal' — same idea, richer setting." Work Example 1 and Example 2 fully, computing $Df(a)$, checking invertibility via determinant, and inverting the matrix.

- **MC-2 hook**: ask "to apply the theorem, is it enough that SOME entries of $Df(a)$ are nonzero, or must the WHOLE matrix be invertible?" — an answer of "some nonzero entries" reveals MC-2 (confusing scalar-nonzero with matrix invertibility — the correct condition is a nonzero determinant of the full Jacobian, not merely nonzero individual partial derivatives).

### Teaching Action A02 — Local, Not Global (Primitive P16: Counterexample)

Present Example 3's $f(x,y)=(e^x\cos y,e^x\sin y)$ directly: everywhere-invertible Jacobian, yet globally non-injective due to $2\pi$-periodicity. Work through the determinant computation and the explicit periodicity check.

- **MC-1 hook**: ask "if $Df(x)$ is invertible at EVERY point of the domain, does that guarantee $f$ is globally (not just locally) invertible?" — an answer of "yes" reveals MC-1 (the central misconception this concept exists to correct — conflating everywhere-local invertibility with global invertibility).

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. For $f(x,y)=(x^2-y^2,\,2xy)$ (the real form of $z\mapsto z^2$), compute $Df(1,1)$ and determine whether the Inverse Function Theorem applies there.
  2. For the same $f$, compute $D(f^{-1})(f(1,1))$ using the theorem's formula, given that $Df(1,1)$ is invertible.
  3. Explain, using this lesson's polar-style counterexample, why "invertible derivative at every point" does not imply global injectivity, and identify what additional property WOULD be needed to upgrade a local guarantee to a global one (informally: injectivity must be separately verified/assumed).
  4. State precisely what hypothesis of the theorem fails if $\det Df(a)=0$ at a point $a$, and explain what conclusion can (or cannot) then be drawn about local invertibility there.
- **P76 (Transfer Probe, mode = independence)**: "In multivariable calculus, the change-of-variables formula for integrals (e.g. converting to polar coordinates) requires the transformation $T$ to have an invertible Jacobian on the region of integration, and uses $|\det DT|$ in the formula. (a) Using this lesson's theorem, explain why requiring $\det DT\neq0$ is exactly what guarantees $T$ is LOCALLY invertible near each point of the region — the geometric fact that makes 'change of variables' meaningful there. (b) Using this lesson's local-vs-global distinction, explain why the change-of-variables formula is typically stated for a region where $T$ is not just locally but GLOBALLY injective (a bijection onto its image), and why that is a genuinely stronger requirement than the Inverse Function Theorem's hypothesis alone guarantees."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LOCAL-INVERTIBILITY-EVERYWHERE-CONFLATED-WITH-GLOBAL | Believing that if $Df$ is invertible at every point of the domain, $f$ must be globally invertible (a bijection on the whole domain), missing that local guarantees do not automatically sum to a global one | Foundational |
| MC-2 | JACOBIAN-INVERTIBILITY-CONFUSED-WITH-NONZERO-ENTRIES | Believing the theorem's hypothesis is satisfied as long as SOME entries of $Df(a)$ are nonzero, rather than requiring the full Jacobian matrix to be invertible (nonzero determinant) | Foundational |
| MC-3 | INVERSE-DERIVATIVE-FORMULA-MISAPPLIED-AS-ENTRYWISE-RECIPROCAL | Believing $D(f^{-1})(f(a))$ is computed by taking the entrywise reciprocal of $Df(a)$'s entries, rather than the genuine matrix inverse $[Df(a)]^{-1}$ | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Local Invertibility Everywhere Conflated with Global") → P41 (detect: ask whether everywhere-invertible $Df$ implies $f$ is a global bijection) → P64 (conceptual shift: re-walk Example 3's periodicity counterexample directly).
- **B02 (targets MC-2)**: P27 (name it: "Jacobian Invertibility Confused with Nonzero Entries") → P41 (detect: present a Jacobian matrix with all nonzero entries but zero determinant, e.g. $\begin{pmatrix}1&1\\1&1\end{pmatrix}$, and ask if the theorem applies) → P64 (conceptual shift: re-anchor on "invertibility means nonzero DETERMINANT of the whole matrix, not merely nonzero individual entries").
- **B03 (targets MC-3)**: P27 (name it: "Inverse Derivative Formula Misapplied as Entrywise Reciprocal") → P41 (detect: ask a student to compute $D(f^{-1})$ from Example 2's Jacobian by taking $1/1,1/2,1/2,1/1$ entrywise) → P64 (conceptual shift: re-walk Example 2's genuine matrix-inverse computation, contrasting with the (wrong) entrywise-reciprocal result).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.real.differentiability-rigorous` (the multivariable derivative $Df(a)$ as a Jacobian matrix, and $C^1$ continuity — both hypotheses of this theorem), `math.linalg.matrix-inverse` (invertibility and computing $A^{-1}$, directly used in the theorem's conclusion formula).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists no cross-links for this concept. (KG `related` field lists `math.real.implicit-function-theorem`, confirmed authored via `ls`, but `related` is not a `cross_links` entry and per this corpus's convention only `cross_links` entries require the P76_mode disk-check protocol — noted here for completeness, not treated as a formal cross-link.)

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/apply tag and mastery_threshold = 0.75 (MAMR 4/5) places this at the "2 main TAs + gate" tier — A01 (the theorem as a direct generalization of the familiar 1D case, with full computational practice) and A02 (the local-vs-global counterexample, this concept's central conceptual hazard) jointly cover all three LOs, deliberately omitting a full reproduction of the Banach-fixed-point proof (per the KG description's own "Proved using..." framing, treated as background context rather than a required derivation at this level) in favor of correct, confident application.
- The complex-exponential-style counterexample ($f(x,y)=(e^x\cos y,e^x\sin y)$) was chosen because it is the single cleanest, most standard example in real analysis of "everywhere-locally-invertible, not globally invertible" — reusing a genuinely canonical example rather than inventing a more obscure one.
- The change-of-variables transfer probe was chosen because it is the single most common DOWNSTREAM application of this exact theorem in a typical analysis/calculus sequence — making explicit, for the first time in this corpus for this concept, the precise sense in which "$\det DT\neq0$" in the change-of-variables formula is a direct citation of the Inverse Function Theorem's hypothesis, and why that formula additionally requires the stronger global-injectivity condition this concept's LO3 is built to make students aware of.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.real.differentiability-rigorous`, `math.linalg.matrix-inverse`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract, grounded directly in the familiar 1D inverse-derivative rule) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1/LO2, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
