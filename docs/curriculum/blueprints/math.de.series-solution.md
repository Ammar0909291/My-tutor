# Teaching Blueprint: Series Solution of ODEs (`math.de.series-solution`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.series-solution` |
| name | Series Solution of ODEs |
| domain | Differential Equations |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.de.second-order-linear`, `math.calc.power-series` |
| unlocks | none |
| cross_links | `math.calc.taylor-series` (unauthored — see Component 7) |
| CPA_entry_stage | A (Abstract) — direct application of the already-known power-series ansatz to a specific ODE, checked against a known closed-form answer |
| description (KG) | Assumes y=∑aₙxⁿ and substitutes into the ODE to determine the recurrence relation for coefficients aₙ. Valid when x=0 is an ordinary point of the ODE. |

## Component 1 — Learning Objectives

- LO1: Apply the **series ansatz** $y=\sum_{n=0}^\infty a_nx^n$ to a homogeneous second-order linear ODE (`math.de.second-order-linear`), substituting the series and its term-by-term derivatives ($y'=\sum na_nx^{n-1}$, $y''=\sum n(n-1)a_nx^{n-2}$) directly into the equation.
- LO2: Derive the **recurrence relation** for the coefficients $a_n$ by re-indexing all sums to a common power of $x$ and matching coefficients — directly refuting the misconception that a series solution can be found by simply guessing individual coefficients, rather than deriving a systematic relation connecting each $a_n$ to earlier ones.
- LO3: State the **ordinary point condition** ($x=0$ is an ordinary point of the ODE iff $P(x),Q(x)$ are analytic there — expressible as convergent power series, per `math.calc.power-series`) required for this method to apply directly, and recognize when this condition fails (a singular point, requiring a different method beyond this concept's scope).

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.second-order-linear` (the standard form $y''+P(x)y'+Q(x)y=0$ for the homogeneous case, and the superposition principle) and `math.calc.power-series` (a power series $\sum c_n(x-a)^n$, its radius of convergence via the ratio test, and that a series only converges to its represented function within that radius).

## Component 3 — Core Explanation

**The series ansatz, substituted term by term**: assume the solution has the form $y=\sum_{n=0}^\infty a_nx^n$ (a power series centered at $x=0$, with unknown coefficients $a_n$ to be determined). Differentiate term by term (a power series can be differentiated within its radius of convergence, per `math.calc.power-series`): $y'=\sum_{n=1}^\infty na_nx^{n-1}$, $y''=\sum_{n=2}^\infty n(n-1)a_nx^{n-2}$. Substitute these directly into the ODE.

**Deriving the recurrence relation by re-indexing and matching coefficients**: after substitution, each term of the ODE is a separate power series in $x$, but with DIFFERENT starting exponents and index offsets (e.g. $y''$'s sum starts effectively at $x^0$ once re-indexed, while $y$'s sum starts at $x^0$ directly). Re-index each sum (shifting the summation variable) so that every sum is expressed as a series in the SAME power of $x$ (typically $x^n$), then set the ODE equal to zero — since a power series is identically zero only if EVERY coefficient is zero, this forces the coefficient of $x^n$ in the combined equation to vanish for every $n$, producing a **recurrence relation**: a formula expressing $a_{n+k}$ (for some shift $k$, often $2$) in terms of earlier coefficients like $a_n$. Starting from the FREE initial coefficients ($a_0,a_1$, which the recurrence does not constrain — these correspond to the two arbitrary constants any second-order ODE's general solution should have), the recurrence generates every subsequent coefficient systematically.

**The ordinary point condition**: this method, as described, requires $x=0$ to be an **ordinary point** of the ODE — meaning $P(x)$ and $Q(x)$ (from the standard form) are both ANALYTIC at $x=0$ (representable by convergent power series there). For an ODE with genuinely polynomial (or otherwise everywhere-analytic) coefficients, this holds automatically. If instead $P(x)$ or $Q(x)$ has a genuine singularity at $x=0$ (e.g. a term like $1/x$), $x=0$ is a SINGULAR point, and this direct series-substitution method does not apply as stated — a different, more specialized technique (the Frobenius method) is required, which is beyond this concept's scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — the substitution, on a solvable-by-inspection ODE for verification)**: Apply the series ansatz to $y''-y=0$ (whose exact solution, $y=C_1e^x+C_2e^{-x}$, is already known from `math.de.second-order-ode`'s own characteristic-equation method — providing a built-in check). Substitute $y=\sum a_nx^n$, $y''=\sum_{n=2}^\infty n(n-1)a_nx^{n-2}$: the equation becomes $\sum_{n=2}^\infty n(n-1)a_nx^{n-2} - \sum_{n=0}^\infty a_nx^n = 0$.

**Example 2 (LO2 — deriving and using the recurrence relation)**: Continuing Example 1, re-index the first sum by letting $m=n-2$ (so $n=m+2$): $\sum_{m=0}^\infty (m+2)(m+1)a_{m+2}x^m - \sum_{n=0}^\infty a_nx^n = 0$. Both sums now run over the SAME power $x^m$ (relabeling $n\to m$ in the second sum), so combining: $\sum_{m=0}^\infty\left[(m+2)(m+1)a_{m+2} - a_m\right]x^m = 0$. Since this must hold for every $m$: $(m+2)(m+1)a_{m+2}=a_m$, giving the recurrence $a_{m+2} = \frac{a_m}{(m+2)(m+1)}$. Starting from free $a_0,a_1$: $a_2=\frac{a_0}{2}$, $a_3=\frac{a_1}{6}$, $a_4=\frac{a_2}{12}=\frac{a_0}{24}$, etc. — generating $y = a_0\left(1+\frac{x^2}{2}+\frac{x^4}{24}+\cdots\right) + a_1\left(x+\frac{x^3}{6}+\cdots\right)$, which are EXACTLY the Taylor series for $\cosh(x)$ and $\sinh(x)$ respectively — matching $y=C_1e^x+C_2e^{-x}$ exactly, since $\cosh x=\frac{e^x+e^{-x}}{2}$ and $\sinh x=\frac{e^x-e^{-x}}{2}$ span the identical solution space.

**Example 3 (LO3 — checking the ordinary point condition, and a case where it fails, breaking MC-1)**: For $y''-y=0$ (Examples 1-2), $P(x)=0$ and $Q(x)=-1$ — both constants, trivially analytic everywhere, so $x=0$ is an ordinary point and the method applies cleanly, as demonstrated. Contrast with $x^2y''+xy'-y=0$ (rewritten in standard form: $y''+\frac{1}{x}y'-\frac{1}{x^2}y=0$, so $P(x)=1/x$, $Q(x)=-1/x^2$): both $P$ and $Q$ have a genuine SINGULARITY at $x=0$ (division by zero, not representable as a convergent power series there) — $x=0$ is a SINGULAR point for this equation, and attempting the direct series-substitution method as taught here would not correctly capture the full solution space; the Frobenius method (beyond this concept's scope) would be needed instead.

## Component 5 — Teaching Actions

### Teaching Action A01 — Substituting the Series Ansatz Term by Term (Primitive P11: Representation Shift)

State: "assume the unknown solution is a power series with unknown coefficients — then substitute it, and its derivatives, directly into the ODE, exactly as you would substitute any trial solution." Work Example 1's direct substitution.

### Teaching Action A02 — Re-Indexing and the Recurrence Relation (Primitive P11: Representation Shift)

Work Example 2's full re-indexing and coefficient-matching derivation, emphasizing: "get every sum onto the SAME power of $x$ first — only then can you match coefficients term by term and force each one to vanish." Verify the resulting series matches the already-known closed-form solution ($\cosh x$, $\sinh x$).

### Teaching Action A03 — Ordinary vs. Singular Points: When the Method Applies (Primitive P06: Contrast Pair)

**Contrast** Example 3's two cases: $y''-y=0$ (both $P,Q$ analytic at $0$, method works cleanly) versus $x^2y''+xy'-y=0$ (both $P,Q$ singular at $0$, method as stated doesn't directly apply). State: "always check the ordinary-point condition FIRST — if $P$ or $Q$ has a genuine singularity at the point you're expanding around, this direct method isn't valid there."

- **MC-1 hook**: ask "can you apply the series-substitution method as taught here to ANY second-order linear ODE, regardless of its coefficients?" — a "yes" answer reveals MC-1 (missing the ordinary-point requirement, applying the method without checking whether $P(x),Q(x)$ are analytic at the expansion point).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Substitute $y=\sum a_nx^n$ into $y''+y=0$, writing out the substituted equation before re-indexing.
  2. Re-index and derive the recurrence relation for the ODE in problem 1, and generate the first 4 nonzero coefficients starting from $a_0,a_1$.
  3. Verify that your series solution from problem 2 matches the known closed-form solution $y=C_1\cos x+C_2\sin x$ (compare term by term with the Taylor series of sine and cosine).
  4. For the ODE $y''+\frac{2}{x}y'+y=0$, determine whether $x=0$ is an ordinary or singular point, and explain what this means for whether the direct series-substitution method applies there.
- **P76 (Transfer Probe, mode = independence — KG cross_link `math.calc.taylor-series` is not yet authored; a future revision may add a genuine cross-link probe connecting this concept's generated series directly to that concept's Taylor-series machinery once that entry exists)**: "An engineer models a physical system with the ODE $y''-xy=0$ (the Airy equation, which has no elementary closed-form solution in terms of familiar functions like sine, cosine, or exponentials). (a) Verify that $x=0$ is an ordinary point for this equation, confirming the series-substitution method applies directly. (b) Substitute $y=\sum a_nx^n$ and derive the recurrence relation connecting the coefficients (note: unlike Examples 1-2, this ODE's variable coefficient $x$ will shift the recurrence's index pattern — work through the re-indexing carefully). (c) Explain why, for an ODE like this one with no elementary closed-form solution, the series-solution method is not just a verification tool (as it was for $y''-y=0$) but the PRIMARY way to obtain any explicit solution at all."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | ORDINARY-POINT-CONDITION-NOT-CHECKED | Applying the series-substitution method to any ODE without first verifying $x=0$ (or the expansion point) is an ordinary point (P, Q analytic there) | Foundational |
| MC-2 | RE-INDEXING-STEP-SKIPPED-OR-MISALIGNED | Attempting to match coefficients across sums with different index offsets without properly re-indexing them to a common power of x first, leading to an incorrect recurrence relation | Foundational |
| MC-3 | SERIES-SOLUTION-COEFFICIENTS-GUESSED-RATHER-THAN-DERIVED | Attempting to guess individual coefficients $a_n$ directly, rather than systematically deriving the recurrence relation and generating coefficients from it | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Ordinary-Point Condition Not Checked") → P41 (detect: give an ODE with a singular point at $x=0$ and ask a student to apply the series method directly without checking $P,Q$'s analyticity) → P64 (conceptual shift: re-walk Example 3's direct contrast, re-anchoring on "always check $P(x)$ and $Q(x)$ for singularities at your expansion point BEFORE substituting the series").
- **B02 (targets MC-2)**: P27 (name it: "Re-Indexing Step Skipped") → P41 (detect: ask a student to derive a recurrence relation and check whether they attempt to match coefficients across sums still using different index variables/offsets) → P64 (conceptual shift: re-walk Example 2's explicit re-indexing step ($m=n-2$), re-anchoring on "every sum must be expressed in the SAME power of $x$ before you can validly match coefficients term by term").
- **B03 (targets MC-3)**: P27 (name it: "Coefficients Guessed Rather Than Derived") → P41 (detect: ask a student to find $a_4$ for a given ODE and check whether they attempt to guess it directly rather than applying the derived recurrence relation) → P64 (conceptual shift: re-anchor on "the recurrence relation is the SYSTEMATIC tool — once derived, every coefficient beyond $a_0,a_1$ follows mechanically, with no guessing required").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.second-order-linear` (the standard form $y''+P(x)y'+Q(x)y=0$ this method solves), `math.calc.power-series` (the series ansatz, term-by-term differentiation, and radius-of-convergence machinery this method directly reuses).
- **Unlocks**: none listed in the KG.
- **Cross-link**: KG lists `math.calc.taylor-series` as a cross-link, but that concept is **not yet authored** in the corpus (checked via `ls docs/curriculum/blueprints/math.calc.taylor-series.md`, not found) — P76_mode = independence for this blueprint's transfer probe. A future revision may add a genuine cross-link probe connecting this concept's generated series directly to Taylor-series machinery once that entry exists.

## Component 8 — Teaching Notes

- estimated_hours = 6 with an expert/apply tag places this at a "3 TAs + gate" tier — A01 (the substitution), A02 (re-indexing and the recurrence relation), and A03 (the ordinary-point condition) each target a distinct LO, appropriate for a technique combining two prerequisite concepts (linear ODEs, power series) into a new solution method.
- Examples 1-2 deliberately use $y''-y=0$ — an ODE ALREADY solvable by the characteristic-equation method from `math.de.second-order-ode` — specifically so the series-solution method's output can be directly VERIFIED against an independently-known answer ($\cosh x$, $\sinh x$ matching $C_1e^x+C_2e^{-x}$), building trust in the method before the transfer probe applies it to the Airy equation, which has no such elementary check available.
- The transfer probe's Airy equation was chosen specifically because it demonstrates the series-solution method's genuine necessity (not just pedagogical verification) — for equations with no elementary closed-form solution, this method is the PRIMARY way to obtain any explicit answer, a point the worked examples alone (both solvable by other means) cannot fully convey.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.calc.taylor-series not authored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: direct application of the known ansatz, checked against a known closed-form answer) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
