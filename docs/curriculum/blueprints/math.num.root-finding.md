# Teaching Blueprint: Root-Finding Methods (`math.num.root-finding`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.num.root-finding` |
| name | Root-Finding Methods |
| domain | Numerical Methods |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 6 |
| requires | `math.calc.continuity`, `math.real.ivt` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — running bisection by hand on one specific function before naming the general methods and their comparative convergence rates |
| description (KG) | Bisection: $O(\log(1/\varepsilon))$ iterations, guaranteed. Newton's method: quadratic convergence near a root (but requires $f'$). Secant: superlinear, no derivatives. Brent's method combines bisection + secant for robustness. |

## Component 1 — Learning Objectives

- LO1: Apply BISECTION to locate a root: given a sign change confirmed by `math.real.ivt` (continuous $f$, $f(a)$ and $f(b)$ of opposite sign), repeatedly halve the interval, keeping whichever half retains the sign change — recognizing bisection as the DIRECT algorithmic realization of the existence guarantee IVT provides but does not itself compute.
- LO2: Apply NEWTON'S METHOD ($x_{n+1}=x_n-f(x_n)/f'(x_n)$) and recognize its QUADRATIC convergence (roughly doubling correct digits each step) near a root — contrasted against bisection's much slower, though UNCONDITIONALLY guaranteed, convergence — and recognize Newton's method's own requirement of $f'$ and a sufficiently good starting guess as real, not merely theoretical, limitations.
- LO3 (orientation level — full secant/Brent's-method derivation deferred): recognize, without full derivation, that the SECANT method achieves SUPERLINEAR convergence (faster than bisection, slower than Newton) WITHOUT requiring $f'$ at all (approximating the derivative via a difference quotient instead), and that Brent's method COMBINES bisection's guaranteed convergence with secant's speed for practical robustness.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.continuity` ($f$ continuous at $a$ iff $\lim_{x\to a}f(x)=f(a)$) and `math.real.ivt` (the rigorous Intermediate Value Theorem: continuous $f$ on $[a,b]$ with $f(a)<c<f(b)$ guarantees some $x\in(a,b)$ with $f(x)=c$).

## Component 3 — Core Explanation

**Bisection is IVT's existence guarantee, turned into an actual algorithm**: `math.real.ivt` guarantees a root exists somewhere in $(a,b)$ whenever $f$ is continuous and $f(a),f(b)$ have opposite signs, but provides NO method for locating it. BISECTION directly exploits this: evaluate $f$ at the MIDPOINT $m=(a+b)/2$; whichever half — $[a,m]$ or $[m,b]$ — STILL has opposite-signed endpoints (guaranteed to be one of the two, since $f(m)$ must be positive, negative, or exactly zero) contains a root by IVT applied AGAIN to that smaller interval. Repeating this HALVES the interval's width each iteration, guaranteeing convergence to a root, with the number of iterations needed to reach precision $\varepsilon$ growing only LOGARITHMICALLY ($O(\log(1/\varepsilon))$).

**Newton's method converges much faster, but with real, non-theoretical requirements**: Newton's method uses the tangent line's root as the next approximation: $x_{n+1}=x_n-f(x_n)/f'(x_n)$. Near a genuine root (with $f'\ne0$ there), this converges QUADRATICALLY — roughly DOUBLING the number of correct decimal digits each iteration, dramatically faster than bisection's fixed logarithmic rate. However, this speed comes at a cost: Newton's method REQUIRES computing $f'(x)$ (not always available or easy), and requires a SUFFICIENTLY GOOD starting guess — starting too far from the root, or where $f'(x)$ is near zero, can cause the method to diverge or oscillate wildly, a genuine practical failure mode, not merely a theoretical caveat.

**Secant and Brent's methods trade off speed, robustness, and derivative-freedom (orientation level)**: the SECANT method approximates $f'(x_n)$ using a DIFFERENCE QUOTIENT from the two most recent iterates (rather than computing the true derivative), achieving SUPERLINEAR convergence — faster than bisection's fixed logarithmic rate, slower than Newton's quadratic rate — WITHOUT ever needing an explicit formula for $f'$. Brent's method combines bisection's GUARANTEED convergence (as a reliable fallback) with the SPEED of secant-like steps when they're behaving well, giving a practical, robust algorithm used in most real numerical software. Full derivation of secant's convergence rate and Brent's combination logic is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — bisection as IVT turned into an algorithm, breaking MC-1)**: for $f(x)=x^2-2$ on $[1,2]$ (finding $\sqrt2$): $f(1)=-1<0$, $f(2)=2>0$ — IVT guarantees a root in $(1,2)$. BISECT: midpoint $m=1.5$, $f(1.5)=0.25>0$ — since $f(1)<0$ and $f(1.5)>0$, the root is in $(1,1.5)$; discard $(1.5,2)$. Next midpoint $m=1.25$, $f(1.25)=-0.4375<0$ — root now narrowed to $(1.25,1.5)$. Continuing this process (each step exactly halving the interval) converges toward $\sqrt2\approx1.41421$ — this is EXACTLY the algorithmic realization of IVT's existence guarantee, systematically narrowing down what IVT alone only promises exists.

**Example 2 (LO2 — Newton's method's much faster convergence, with its real limitations, breaking MC-2)**: for the SAME $f(x)=x^2-2$, $f'(x)=2x$. Starting at $x_0=1.5$: $x_1=1.5-\frac{0.25}{3}=1.5-0.0833=1.4167$ (already closer to $\sqrt2\approx1.41421$ than bisection reached after several steps); $x_2=1.4167-\frac{(1.4167)^2-2}{2(1.4167)}=1.4167-\frac{0.00028}{2.8334}\approx1.41421$ — essentially exact after just 2 iterations, dramatically faster than bisection's steady halving. But contrast: starting Newton's method at $x_0=0$ (where $f'(0)=0$) would cause DIVISION BY ZERO — a genuine failure, not a theoretical footnote, confirming Newton's method's real dependence on a reasonable starting point and nonzero derivative.

**Example 3 (LO3, orientation level — secant as derivative-free superlinear convergence, breaking MC-3)**: for the SAME $f(x)=x^2-2$, the secant method starts with TWO points, say $x_0=1$ and $x_1=2$, and approximates the derivative via the SLOPE between them: $x_2=x_1-f(x_1)\cdot\frac{x_1-x_0}{f(x_1)-f(x_0)}=2-2\cdot\frac{2-1}{2-(-1)}=2-\frac23\approx1.333$. Continuing this process (always using the two MOST RECENT points, no explicit $f'$ ever computed) converges toward $\sqrt2$ FASTER than bisection but somewhat SLOWER than Newton's method (which had access to the true derivative at each step) — confirming secant's position between bisection and Newton, trading Newton's derivative-requirement for a still-respectable superlinear convergence rate.

## Component 5 — Teaching Actions

### Teaching Action A01 — Bisection Is IVT's Existence Guarantee, Made Algorithmic (Primitive P11: Representation Shift)

State: "you already know from `math.real.ivt` that a root exists somewhere in the interval — bisection is simply the systematic PROCEDURE that actually narrows down where, by repeatedly reapplying that same existence guarantee to smaller and smaller sub-intervals." Walk Example 1's step-by-step halving toward $\sqrt2$.

- **MC-1 hook**: ask "is bisection an unrelated new algorithm, disconnected from the Intermediate Value Theorem's own existence guarantee?" — a "yes" answer reveals MC-1 (missing that bisection is directly IVT's guarantee, applied repeatedly to successively smaller intervals).

### Teaching Action A02 — Newton's Method's Speed Comes With Genuine Failure Modes (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: Newton's method converged to near-machine-precision in just 2 iterations from $x_0=1.5$, but would DIVIDE BY ZERO starting from $x_0=0$. State: "Newton's dramatic speed advantage over bisection is real, but so is its real vulnerability — a bad starting point or a vanishing derivative isn't a theoretical edge case, it's a genuine way the method can fail outright."

- **MC-2 hook**: ask "does Newton's method's much faster convergence rate mean it will always succeed, given any reasonable starting guess?" — a "yes" answer reveals MC-2 (missing that a poorly chosen starting point, or a point where $f'$ vanishes, causes genuine failure, not just slower convergence).

### Teaching Action A03 — Secant Trades Newton's Derivative-Requirement for Somewhat Slower (But Still Fast) Convergence (Primitive P06: Contrast Pair)

Contrast Newton's method's TRUE-derivative-based quadratic convergence (Example 2) against secant's DIFFERENCE-QUOTIENT-based superlinear convergence (Example 3, using the same function) — genuinely different rates, genuinely different information requirements. State: "secant isn't 'Newton's method without the annoying derivative, at no cost' — it trades away some of Newton's raw speed specifically because it only approximates the slope, rather than computing it exactly."

- **MC-3 hook**: ask "does the secant method achieve the exact same quadratic convergence rate as Newton's method, just without needing an explicit formula for $f'$?" — a "yes" answer reveals MC-3 (missing that secant's derivative-free approximation genuinely costs some convergence speed — superlinear, not quadratic).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Perform 2 iterations of bisection for $f(x)=x^3-5$ on $[1,2]$, tracking which half-interval is retained each step.
  2. Perform 2 iterations of Newton's method for $f(x)=x^3-5$ starting at $x_0=1.5$ (compute $f'(x)=3x^2$ first).
  3. Explain what would go wrong if Newton's method were started at a point where $f'(x_0)=0$.
  4. Explain, without full derivation, why the secant method's convergence rate is expected to be between bisection's and Newton's.
- **P76 (Transfer Probe, mode = independence)**: "An engineer needs to find where a nonlinear stress function $f(x)=x^4-3x-2$ crosses zero in the interval $[1,2]$, but the exact derivative formula is unavailable due to noisy experimental data (only function VALUES can be measured, not derivatives). (a) Explain why Newton's method is not a good fit here, citing its specific requirement. (b) Propose using either bisection or the secant method instead, and explain the trade-off between them (guaranteed-but-slower vs. no-guarantee-but-typically-faster). (c) If the engineer's first bisection step accidentally used a starting interval where $f(1)$ and $f(2)$ do NOT have opposite signs, explain precisely what would go wrong and why bisection's guarantee would no longer apply."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | BISECTION-ASSUMED-UNRELATED-TO-IVT | Believing bisection is an unrelated new algorithm disconnected from IVT, missing that it is directly IVT's existence guarantee applied repeatedly to shrinking intervals | Foundational |
| MC-2 | NEWTONS-METHOD-ASSUMED-ALWAYS-SUCCEEDS | Believing Newton's method's fast convergence means it will always succeed given any reasonable start, missing its genuine failure modes (bad start, vanishing derivative) | High |
| MC-3 | SECANT-ASSUMED-SAME-RATE-AS-NEWTON | Believing the secant method achieves Newton's exact quadratic convergence rate without needing the derivative, missing that its derivative-free approximation costs some speed (superlinear, not quadratic) | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Bisection Assumed Unrelated to IVT") → P41 (detect: ask whether bisection is unrelated to IVT's existence guarantee) → P64 (conceptual shift: re-walk Example 1's step-by-step halving, re-anchoring on "bisection is IVT's guarantee, applied repeatedly to shrinking intervals").
- **B02 (targets MC-2)**: P27 (name it: "Newton's Method Assumed to Always Succeed") → P41 (detect: ask whether Newton's fast convergence means it always succeeds given a reasonable start) → P64 (conceptual shift: re-walk Example 2's division-by-zero failure case, re-anchoring on "genuine failure modes exist, not just theoretical edge cases").
- **B03 (targets MC-3)**: P27 (name it: "Secant Assumed Same Rate as Newton") → P41 (detect: ask whether secant achieves Newton's exact quadratic rate without the derivative) → P64 (conceptual shift: re-walk Example 3's slower-than-Newton convergence on the same function, re-anchoring on "the derivative-free approximation costs some convergence speed").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.continuity` (continuity, the hypothesis these methods' guarantees depend on) and `math.real.ivt` (the rigorous existence guarantee bisection directly algorithmizes).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: none listed in the KG for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 6 with a proficient/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (hand-run bisection and Newton's method iterations, including a genuine Newton failure case) and LO3 kept orientation-level, appropriately surveying secant and Brent's method without deriving secant's precise superlinear convergence order.
- **Division of labor**: `math.real.ivt` owns the existence guarantee bisection directly implements; this concept owns the ALGORITHMIC realization and comparison of multiple root-finding methods — deliberately using the SAME function $f(x)=x^2-2$ across all three examples so bisection's, Newton's, and secant's convergence RATES are directly comparable on identical ground, isolating the method as the only variable.
- Example 2's deliberate choice to show a genuine Newton's-method FAILURE (division by zero at $x_0=0$) rather than only its success case was chosen to make MC-2's "always succeeds" misconception concretely falsifiable, not merely warned against abstractly.

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
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: hand-run bisection on a specific function precedes the general methods and their rate comparisons) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
