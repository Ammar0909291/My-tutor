# Teaching Blueprint: Polynomial Interpolation (`math.num.interpolation`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.num.interpolation` |
| name | Polynomial Interpolation |
| domain | Numerical Methods |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.alg.polynomial`, `math.linalg.linear-system` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — constructing the interpolating polynomial for a specific small data set (3 points) before naming the general Lagrange/Newton forms |
| description (KG) | Given $n+1$ data points, the unique interpolating polynomial of degree $\le n$. Lagrange form: $L(x)=\sum y_i\prod_{j\ne i}(x-x_j)/(x_i-x_j)$. Newton form: nested multiplication. Runge's phenomenon: high-degree polynomials oscillate at edges. |

## Component 1 — Learning Objectives

- LO1: Given $n+1$ data points with distinct $x$-values, recognize that there is a UNIQUE polynomial of degree $\le n$ passing through all of them, and construct it via the **Lagrange form** $L(x)=\sum_i y_i\prod_{j\ne i}\frac{x-x_j}{x_i-x_j}$ — a sum of basis polynomials each engineered to be $1$ at its own node and $0$ at every other node.
- LO2: Verify uniqueness DIRECTLY — recognize that setting up the $n+1$ conditions $p(x_i)=y_i$ for a degree-$\le n$ polynomial gives an $(n+1)\times(n+1)$ linear system (via `math.linalg.linear-system`) with a unique solution (the Vandermonde system), so interpolation is genuinely a special case of solving a linear system, not a separate unrelated technique.
- LO3 (orientation level — full numerical-stability theory deferred): recognize, without full derivation, **Runge's phenomenon** — high-degree polynomial interpolation on EQUALLY SPACED points can oscillate wildly near the interval's edges, so more data points do not automatically mean a better fit.

## Component 2 — Prerequisite Check

Assumes mastery of `math.alg.polynomial` (polynomials as $a_nx^n+\cdots+a_0$, degree, and the ring structure) and `math.linalg.linear-system` (systems $Ax=b$ and their consistent/inconsistent/unique-solution classification via rank).

## Component 3 — Core Explanation

**The Lagrange form builds the answer directly from "indicator" polynomials**: for nodes $x_0,\dots,x_n$, define $\ell_i(x)=\prod_{j\ne i}\frac{x-x_j}{x_i-x_j}$ — a degree-$n$ polynomial engineered so $\ell_i(x_i)=1$ (every factor becomes $\frac{x_i-x_i}{\cdots}$... actually equals $1$ by construction of the denominator matching) and $\ell_i(x_k)=0$ for $k\ne i$ (the numerator contains the factor $(x-x_k)$, which vanishes at $x=x_k$). Summing $L(x)=\sum_i y_i\ell_i(x)$ then automatically satisfies $L(x_k)=y_k$ for every $k$, since only the $i=k$ term survives at $x=x_k$ and it contributes exactly $y_k\cdot1$.

**Interpolation IS solving a linear system — uniqueness follows directly**: writing $p(x)=c_0+c_1x+\cdots+c_nx^n$ and demanding $p(x_i)=y_i$ for each of the $n+1$ nodes gives $n+1$ linear equations in the $n+1$ unknown coefficients $c_0,\dots,c_n$ — an $(n+1)\times(n+1)$ system (the Vandermonde system). Because the $x_i$ are distinct, this system's coefficient matrix is invertible (a fact `math.linalg.linear-system`'s rank criterion certifies), so it has a UNIQUE solution — meaning the interpolating polynomial of degree $\le n$ is unique, not merely "a" solution among several equally valid ones.

**Runge's phenomenon (orientation level)**: interpolating a smooth function at MORE equally-spaced points does not always improve accuracy — for certain functions (the classic example: $f(x)=\frac{1}{1+25x^2}$ on $[-1,1]$), the interpolating polynomial's oscillations near the endpoints of the interval GROW as the degree increases, diverging from the true function despite passing through all the sample points exactly. More data, more perfectly matched, can produce a strictly WORSE fit between the nodes.

## Component 4 — Worked Examples

**Example 1 (LO1 — constructing the Lagrange form for 3 points, breaking MC-1)**: given $(1,2)$, $(2,3)$, $(4,7)$: $\ell_0(x)=\frac{(x-2)(x-4)}{(1-2)(1-4)}=\frac{(x-2)(x-4)}{3}$, $\ell_1(x)=\frac{(x-1)(x-4)}{(2-1)(2-4)}=\frac{(x-1)(x-4)}{-2}$, $\ell_2(x)=\frac{(x-1)(x-2)}{(4-1)(4-2)}=\frac{(x-1)(x-2)}{6}$. Then $L(x)=2\ell_0(x)+3\ell_1(x)+7\ell_2(x)$. Checking $L(1)$: only $\ell_0(1)=1$ contributes (the other two vanish, each containing a factor $(x-1)$), giving $L(1)=2\cdot1=2$ ✓ — confirming each $\ell_i$ acts purely as an "indicator" isolating its own node's $y$-value.

**Example 2 (LO2 — interpolation as solving a Vandermonde system, breaking MC-2)**: for the SAME 3 points $(1,2),(2,3),(4,7)$, set up $p(x)=c_0+c_1x+c_2x^2$ directly: $c_0+c_1+c_2=2$, $c_0+2c_1+4c_2=3$, $c_0+4c_1+16c_2=7$ — a $3\times3$ linear system in $c_0,c_1,c_2$. Solving (via `math.linalg.linear-system`'s methods) gives the SAME unique polynomial as Example 1's Lagrange construction, just expressed in standard-form coefficients rather than the Lagrange basis — confirming interpolation is genuinely a linear-system-solving problem, with the Lagrange form being one particularly convenient way to solve it without explicit matrix inversion.

**Example 3 (LO3, orientation level — Runge's phenomenon, breaking MC-3)**: interpolating $f(x)=\frac{1}{1+25x^2}$ at 5 equally-spaced points on $[-1,1]$ gives a reasonable-looking fit; interpolating at 15 equally-spaced points, rather than tracking $f$ more closely everywhere, produces WILD oscillations near $x=\pm1$ that overshoot far beyond $f$'s actual range — even though the polynomial still passes through all 15 sample points exactly. More matched data points made the fit BETWEEN the points strictly worse near the edges, contradicting the intuition that "more data always means a better polynomial fit."

## Component 5 — Teaching Actions

### Teaching Action A01 — Each Lagrange Basis Term Is an Engineered Indicator (Primitive P11: Representation Shift)

State: "$\ell_i(x)$ isn't an arbitrary formula — it's built so it equals exactly $1$ at its own node and $0$ at every other node, which is precisely what makes summing $y_i\ell_i(x)$ work." Walk Example 1's verification that $\ell_1(1)=\ell_2(1)=0$ and $\ell_0(1)=1$.

- **MC-1 hook**: ask "is the Lagrange formula an arbitrary-looking expression with no clear reason it should pass through the data points?" — a "yes" answer reveals MC-1 (missing that each $\ell_i$ is deliberately engineered as an indicator function for its own node).

### Teaching Action A02 — Interpolation Is a Linear System In Disguise (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: setting up the standard-form coefficients as unknowns and solving the resulting system gives the identical polynomial found via Lagrange's formula. State: "interpolation isn't a separate technique from `math.linalg.linear-system` — it's literally the same $(n+1)\times(n+1)$ linear-system-solving problem, viewed through a convenient basis."

- **MC-2 hook**: ask "is polynomial interpolation an unrelated technique from solving linear systems?" — a "yes" answer reveals MC-2 (missing that the $n+1$ interpolation conditions ARE an $(n+1)\times(n+1)$ linear system, whose unique solvability is what guarantees the interpolating polynomial's uniqueness).

### Teaching Action A03 — More Matched Points Can Make the Fit Worse (Primitive P06: Contrast Pair)

Contrast the well-behaved 3-point fit (Examples 1–2) against Example 3's 15-point oscillation near the edges. State: "passing through every sample point exactly is not the same as tracking the true function well BETWEEN the points — high-degree interpolation on equally spaced nodes can actively work against you."

- **MC-3 hook**: ask "does adding more equally-spaced interpolation points always produce a more accurate fit to the underlying function?" — a "yes" answer reveals MC-3 (missing Runge's phenomenon — high-degree interpolation can oscillate wildly near the interval's edges despite matching every sample point exactly).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Construct the Lagrange basis polynomials $\ell_0,\ell_1$ for the two points $(0,1)$ and $(3,10)$.
  2. Set up (but don't necessarily fully solve) the linear system corresponding to interpolating the 3 points $(0,1),(1,4),(2,9)$ with a degree-$\le2$ polynomial in standard form.
  3. Explain why the interpolating polynomial for $n+1$ distinct-$x$ data points is guaranteed UNIQUE, citing the Vandermonde system's invertibility.
  4. Without computing it, explain the risk of interpolating 20 equally-spaced samples of a sharply peaked function with a single degree-19 polynomial.
- **P76 (Transfer Probe, mode = independence)**: "An engineer has 4 sensor readings $(0,2),(1,5),(2,4),(3,11)$ and wants a single polynomial passing through all 4 to interpolate between readings. (a) Explain, citing the Vandermonde-system argument, why a UNIQUE degree-$\le3$ polynomial through these 4 points exists. (b) Construct the Lagrange basis polynomial $\ell_0(x)$ for the first node. (c) The engineer proposes taking 50 more equally-spaced readings and fitting a single degree-49 polynomial for maximum accuracy — evaluate this proposal, citing Runge's phenomenon."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LAGRANGE-FORM-ASSUMED-ARBITRARY | Believing the Lagrange formula is an arbitrary-looking expression, missing that each basis term $\ell_i(x)$ is deliberately engineered as an indicator function equal to $1$ at its own node and $0$ elsewhere | Foundational |
| MC-2 | INTERPOLATION-ASSUMED-UNRELATED-TO-LINEAR-SYSTEMS | Believing polynomial interpolation is a separate technique from solving linear systems, missing that the $n+1$ interpolation conditions ARE a linear system whose unique solvability guarantees the interpolant's uniqueness | High |
| MC-3 | MORE-POINTS-ASSUMED-TO-ALWAYS-IMPROVE-FIT | Believing more equally-spaced interpolation points always produce a more accurate fit, missing Runge's phenomenon — high-degree interpolation can oscillate wildly near the interval's edges | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Lagrange Form Assumed Arbitrary") → P41 (detect: ask whether the Lagrange formula is arbitrary with no clear reason it passes through the data) → P64 (conceptual shift: re-walk Example 1's indicator-function verification, re-anchoring on "each $\ell_i$ is engineered to be $1$ at its own node and $0$ elsewhere").
- **B02 (targets MC-2)**: P27 (name it: "Interpolation Assumed Unrelated to Linear Systems") → P41 (detect: ask whether interpolation is a separate technique from solving linear systems) → P64 (conceptual shift: re-walk Example 2's Vandermonde-system setup, re-anchoring on "interpolation IS solving a linear system, just expressed in a convenient basis").
- **B03 (targets MC-3)**: P27 (name it: "More Points Assumed to Always Improve Fit") → P41 (detect: ask whether more equally-spaced points always give a better fit) → P64 (conceptual shift: re-walk Example 3's oscillation demonstration, re-anchoring on "matching every sample point exactly is not the same as tracking the function well between the points").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.alg.polynomial` (polynomials, degree, and the standard-form coefficient representation used in Example 2) and `math.linalg.linear-system` (the rank-based unique/inconsistent/dependent classification directly certifying the Vandermonde system's unique solvability).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: none listed in the KG for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 5 with a proficient/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (the explicit Lagrange construction and its Vandermonde-system equivalence) and LO3 kept orientation-level, appropriately surveying Runge's phenomenon without deriving its precise oscillation-growth rate.
- **Division of labor**: `math.linalg.linear-system` owns the general rank/consistency classification machinery for $Ax=b$; this concept owns the SPECIFIC application of that machinery to the Vandermonde system arising from interpolation conditions, deliberately reusing the SAME 3-point data set $(1,2),(2,3),(4,7)$ across Examples 1 and 2 so the Lagrange and standard-form derivations read as two routes to one identical answer.
- Example 3's deliberate choice of a well-known Runge's-phenomenon example function ($f(x)=1/(1+25x^2)$) rather than an arbitrary function was chosen because its oscillatory failure at high degree is a documented, illustrative benchmark case rather than an idiosyncratic one.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: 3-point construction precedes naming the general Lagrange/Newton forms) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
