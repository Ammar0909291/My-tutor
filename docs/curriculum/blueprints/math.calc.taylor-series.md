# Teaching Blueprint: Taylor Series (`math.calc.taylor-series`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.taylor-series` |
| name | Taylor Series |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 8 |
| requires | `math.calc.power-series`, `math.calc.higher-order-derivatives`, `math.calc.linearization` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — computing successive linearization-like approximations for one specific function before naming the general Taylor series formula |
| description (KG) | Representing a smooth function as a power series about a point $a$: $f(x)=\sum f^{(n)}(a)(x-a)^n/n!$; valid on the radius of convergence. |

## Component 1 — Learning Objectives

- LO1: Recognize the Taylor series $f(x)=\sum_{n=0}^\infty\frac{f^{(n)}(a)}{n!}(x-a)^n$ as `math.calc.linearization`'s own $L(x)=f(a)+f'(a)(x-a)$ EXTENDED — the linearization is EXACTLY the Taylor series's first two terms ($n=0,1$), with each additional term (using `math.calc.higher-order-derivatives`'s higher derivatives) adding a further correction that captures more of $f$'s curving-away behavior.
- LO2: Compute a Taylor series for a specific function by systematically finding $f^{(n)}(a)$ for successive $n$, and recognize the result as a specific instance of `math.calc.power-series`'s own general $\sum c_n(x-a)^n$ form, with coefficients $c_n=f^{(n)}(a)/n!$ determined by the function itself rather than chosen freely.
- LO3 (orientation level — full remainder-term/convergence-proof deferred): recognize, without full derivation, that a Taylor series is only VALID (equal to $f(x)$) WITHIN its radius of convergence $R$ (from `math.calc.power-series`'s own convergence theory) — and that even a function with well-defined derivatives EVERYWHERE can have a Taylor series that fails to equal $f$ at some points, previewing that convergence of the series and equality to $f$ are related but genuinely distinct questions.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.power-series` ($\sum c_n(x-a)^n$, radius of convergence $R$), `math.calc.higher-order-derivatives` ($f''=(f')'$ and beyond), and `math.calc.linearization` ($L(x)=f(a)+f'(a)(x-a)$, the tangent-line approximation).

## Component 3 — Core Explanation

**The Taylor series is linearization, extended with more correction terms**: `math.calc.linearization` already built the BEST LINEAR (degree-1) approximation to $f$ near $a$: $L(x)=f(a)+f'(a)(x-a)$ — matching $f$'s value and slope at $a$. The Taylor series CONTINUES this idea: adding a QUADRATIC term $\frac{f''(a)}{2!}(x-a)^2$ matches $f$'s CURVATURE at $a$ too; adding a cubic term matches the next derivative; and so on. Each additional term, using `math.calc.higher-order-derivatives`'s successively higher derivatives, refines the approximation further — the Taylor series is not a new, unrelated idea, but linearization's own natural continuation to arbitrarily many terms.

**The coefficients are DETERMINED by the function, not freely chosen**: `math.calc.power-series` studies GENERAL power series $\sum c_n(x-a)^n$ where the coefficients $c_n$ can be ANY numbers. The Taylor series is the SPECIFIC instance where $c_n=f^{(n)}(a)/n!$ — computed directly from the function's own derivatives at $a$, not chosen freely or fit to data. This specific coefficient choice is exactly what's needed to make the partial sums match $f$'s value, slope, curvature, and successively higher-order behavior at $a$.

**Convergence and equality to $f$ are related but genuinely distinct questions (orientation level)**: `math.calc.power-series`'s radius of convergence $R$ tells you WHERE the series $\sum c_n(x-a)^n$ converges to SOME value — but whether that value actually EQUALS $f(x)$ is a SEPARATE question. Remarkably, some functions (the classic example being $f(x)=e^{-1/x^2}$ near $x=0$, suitably defined) have EVERY derivative well-defined at a point, yet their Taylor series converges to the WRONG value (identically $0$) everywhere except at that single point — a genuinely surprising failure mode. Full derivation of the remainder term controlling this gap is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — the Taylor series as linearization extended, breaking MC-1)**: for $f(x)=\cos x$ at $a=0$: `math.calc.linearization`'s own $L(x)=f(0)+f'(0)(x-0)=1+0(x)=1$ (since $\cos'(0)=-\sin(0)=0$) — a constant, matching $\cos x$'s value and slope at $0$ but NOT its curvature. Adding the quadratic Taylor term: $\frac{f''(0)}{2!}x^2=\frac{-\cos(0)}{2}x^2=-\frac{x^2}{2}$, giving $1-\frac{x^2}{2}$ — now ALSO matching $\cos x$'s curvature at $0$ (both have second derivative $-1$ there), a genuinely BETTER approximation near $0$ than the bare linearization, obtained by directly extending `math.calc.linearization`'s own procedure with one more term.

**Example 2 (LO2 — computing the coefficients from the function's own derivatives, breaking MC-2)**: for $f(x)=e^x$ at $a=0$: since EVERY derivative of $e^x$ equals $e^x$ itself, $f^{(n)}(0)=e^0=1$ for ALL $n$. So the Taylor coefficients are $c_n=f^{(n)}(0)/n!=1/n!$, giving the series $e^x=\sum_{n=0}^\infty\frac{x^n}{n!}=1+x+\frac{x^2}{2}+\frac{x^3}{6}+\cdots$. These coefficients were NOT freely chosen — they are FORCED by $e^x$'s own derivative structure, unlike `math.calc.power-series`'s general study of series with arbitrary coefficient sequences.

**Example 3 (LO3, orientation level — convergence versus actual equality to $f$, breaking MC-3)**: for $f(x)=\dfrac{1}{1-x}$ at $a=0$: the Taylor series is $\sum_{n=0}^\infty x^n$ (the geometric series), with radius of convergence $R=1$ (from `math.calc.power-series`'s own ratio test). WITHIN $|x|<1$, the series genuinely CONVERGES to $f(x)$ exactly, verified directly (e.g. at $x=0.5$: series sum $=2$, and $f(0.5)=1/0.5=2$ ✓). But AT $x=2$ (well outside $R=1$), plugging into the series gives $1+2+4+8+\cdots$, which DIVERGES, while $f(2)=1/(1-2)=-1$ is perfectly well-defined — confirming the series and the function agree ONLY within the radius of convergence, and outside it, the series simply fails to represent $f$ at all (a milder, more intuitive failure than the $e^{-1/x^2}$ case, but illustrating the same core distinction between "the series converges" and "the series equals $f$").

## Component 5 — Teaching Actions

### Teaching Action A01 — Taylor Series Continues Linearization With More Correction Terms (Primitive P11: Representation Shift)

State: "you already know how to build the BEST linear approximation to $f$ — the Taylor series just keeps adding terms, using higher derivatives, to match curvature and beyond, refining the SAME approximation idea." Walk Example 1's direct extension from $L(x)=1$ to the quadratic approximation $1-x^2/2$ for $\cos x$.

- **MC-1 hook**: ask "is the Taylor series an unrelated new concept, disconnected from `math.calc.linearization`'s own tangent-line approximation?" — a "yes" answer reveals MC-1 (missing that the Taylor series is linearization's own natural continuation with additional correction terms).

### Teaching Action A02 — Taylor Coefficients Are Forced By the Function, Not Freely Chosen (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: EVERY coefficient in $e^x$'s Taylor series was FORCED to be $1/n!$ by the function's own derivative structure (every derivative of $e^x$ equals $e^x$). State: "unlike `math.calc.power-series`'s general study of series with arbitrary coefficients, a Taylor series's coefficients are entirely determined once you fix the function $f$ and the point $a$ — there's no freedom to choose them differently."

- **MC-2 hook**: ask "can the coefficients of a function's Taylor series be freely chosen or adjusted, the same way general power series coefficients can be in `math.calc.power-series`?" — a "yes" answer reveals MC-2 (missing that Taylor coefficients are entirely determined by the function's own derivatives, with no freedom of choice).

### Teaching Action A03 — Series Convergence and Equality to f Are Genuinely Different Questions (Primitive P06: Contrast Pair)

Contrast Example 3's INSIDE-the-radius agreement ($x=0.5$, series correctly equals $f$) against its OUTSIDE-the-radius divergence ($x=2$, series diverges while $f$ is perfectly well-defined). State: "the radius of convergence isn't just a technical detail — outside it, the series and the function can behave COMPLETELY differently, one diverging while the other remains perfectly well-defined."

- **MC-3 hook**: ask "does a function's Taylor series always equal the function everywhere the function itself is defined, not merely within the radius of convergence?" — a "yes" answer reveals MC-3 (missing that agreement between the series and $f$ is guaranteed only within the radius of convergence, and can fail entirely outside it).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute the first three terms (through the quadratic term) of the Taylor series of $f(x)=\sin x$ at $a=0$, and compare to `math.calc.linearization`'s own linear approximation.
  2. Compute the Taylor series coefficients $c_n$ for $f(x)=\frac{1}{1-x}$ at $a=0$ directly from the derivative formula $c_n=f^{(n)}(0)/n!$, and verify they match the geometric series $\sum x^n$.
  3. For $f(x)=\ln(1+x)$'s Taylor series (radius of convergence $R=1$), determine whether the series is guaranteed to converge to $f(x)$ at $x=0.5$ and at $x=3$, explaining the difference.
  4. Explain, in one or two sentences, why a Taylor series's coefficients are "forced" by the function rather than freely chosen, unlike a general power series.
- **P76 (Transfer Probe, mode = independence)**: "An engineer wants to approximate $f(x)=\ln(1+x)$ for small perturbations $x$ near $0$ in a control system, and knows its Taylor series is $x-\frac{x^2}{2}+\frac{x^3}{3}-\cdots$ with radius of convergence $R=1$. (a) Using only the first two terms (matching `math.calc.linearization`'s own linear approximation), estimate $f(0.05)$, and explain why this should be quite accurate given how close $0.05$ is to the center $a=0$. (b) Explain why using the SAME truncated series to estimate $f(5)$ would be far less justified, citing both the distance-from-center issue and the radius-of-convergence issue. (c) If the engineer needed accurate values for $x=5$, explain — citing the distinction between convergence and equality to $f$ — why simply adding more terms to the SAME series expansion (still centered at $a=0$) would not solve the problem, since $x=5$ lies outside $R=1$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | TAYLOR-SERIES-ASSUMED-UNRELATED-TO-LINEARIZATION | Believing the Taylor series is an unrelated new concept, missing that it is linearization's own natural continuation with additional correction terms | Foundational |
| MC-2 | TAYLOR-COEFFICIENTS-ASSUMED-FREELY-CHOSEN | Believing Taylor coefficients can be freely chosen like general power series coefficients, missing that they are entirely determined by the function's own derivatives | High |
| MC-3 | CONVERGENCE-ASSUMED-TO-GUARANTEE-EQUALITY-EVERYWHERE | Believing a Taylor series always equals the function everywhere the function is defined, missing that agreement is guaranteed only within the radius of convergence | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Taylor Series Assumed Unrelated to Linearization") → P41 (detect: ask whether the Taylor series is unrelated to linearization) → P64 (conceptual shift: re-walk Example 1's direct extension from $L(x)$ to the quadratic approximation, re-anchoring on "linearization's own natural continuation").
- **B02 (targets MC-2)**: P27 (name it: "Taylor Coefficients Assumed Freely Chosen") → P41 (detect: ask whether Taylor coefficients can be freely chosen) → P64 (conceptual shift: re-walk Example 2's forced-coefficient derivation for $e^x$, re-anchoring on "entirely determined by the function's own derivatives").
- **B03 (targets MC-3)**: P27 (name it: "Convergence Assumed to Guarantee Equality Everywhere") → P41 (detect: ask whether a Taylor series always equals $f$ everywhere $f$ is defined) → P64 (conceptual shift: re-walk Example 3's inside-versus-outside-radius contrast, re-anchoring on "agreement is guaranteed only within the radius of convergence").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.power-series` (the general $\sum c_n(x-a)^n$ form and radius of convergence, directly specialized here) and `math.calc.higher-order-derivatives` (the successively higher derivatives supplying each Taylor coefficient) and `math.calc.linearization` ($L(x)=f(a)+f'(a)(x-a)$, the Taylor series's own first two terms).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: none listed in the KG for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 8 with an advanced/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (the linearization-extension comparison and the forced-coefficient derivation) and LO3 kept orientation-level, appropriately illustrating the convergence-versus-equality distinction via the geometric series without proving the remainder-term theorem or constructing the full $e^{-1/x^2}$ counterexample.
- **Division of labor**: `math.calc.power-series` owns the general power-series form and convergence theory; `math.calc.higher-order-derivatives` owns computing successive derivatives; `math.calc.linearization` owns the degree-1 approximation. This concept owns COMBINING these three into the specific function-determined series — deliberately using $\cos x$ (whose derivatives cycle simply) in Example 1 to make the linearization-to-quadratic extension maximally transparent, and $e^x$ (whose derivatives are trivially constant) in Example 2 to make the "coefficients are forced" point as starkly verifiable as possible.
- Example 3's deliberate choice of the geometric series (rather than the more exotic $e^{-1/x^2}$ counterexample) was chosen to illustrate the convergence-versus-equality distinction with a concrete, easily-verified numeric divergence, while still explicitly flagging that MORE surprising failure modes exist and are deferred.

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
| V-15 | CPA_entry_stage justified | PASS (Concrete: successive linearization-like approximations on a specific function precede the general Taylor series formula) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
