# Teaching Blueprint: Improper Integrals (`math.calc.improper-integrals`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.calc.improper-integrals` |
| name | Improper Integrals |
| domain | Calculus |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.75 → MAMR = ⌈0.75×5⌉ = 4/5 |
| estimated_hours | 8 |
| requires | `math.calc.definite-integral`, `math.calc.limits-at-infinity` |
| unlocks | `math.seq.integral-test` |
| cross_links | none |
| CPA_entry_stage | P (Pictorial) — an infinite region under a curve, shaded out to infinity, before the limit-based definition |
| description (KG) | Definite integrals with infinite limits or integrands with singularities; defined as limits of proper integrals; convergent or divergent. |

## Component 1 — Learning Objectives

- LO1: Define an **improper integral with an infinite limit** (Type I), $\int_a^\infty f(x)\,dx$, as $\lim_{t\to\infty}\int_a^t f(x)\,dx$ — an ordinary (proper) definite integral (`math.calc.definite-integral`) up to a finite cutoff $t$, followed by a limit at infinity (`math.calc.limits-at-infinity`) as $t\to\infty$.
- LO2: Define an **improper integral with a singularity** (Type II), where the integrand is unbounded at some point in $[a,b]$ (e.g. at an endpoint), as a limit approaching that point from the proper-integral side — and correctly identify a singularity requiring this treatment, directly refuting the misconception that an integral is only "improper" when infinity appears explicitly in the limits.
- LO3: Determine whether an improper integral **converges** (the defining limit exists and is finite) or **diverges** (the limit fails to exist or is infinite), and correctly conclude that a divergent improper integral has **no numeric value** — refuting the misconception that every improper integral, having a well-defined-looking symbolic setup, must evaluate to some specific finite number.

## Component 2 — Prerequisite Check

Assumes mastery of `math.calc.definite-integral` (the definite integral as a limit of Riemann sums, representing signed area, always producing a single well-defined real number for a proper integral over a finite interval with a bounded integrand) and `math.calc.limits-at-infinity` (computing $\lim_{t\to\infty}g(t)$, and the distinction between limits at infinity and infinite limits at a finite point).

## Component 3 — Core Explanation

**Type I — infinite limits of integration**: $\int_a^\infty f(x)\,dx$ is **defined** as $\lim_{t\to\infty}\int_a^t f(x)\,dx$ — first compute the ordinary, proper definite integral up to some finite cutoff $t$ (an area you already know how to find), and THEN take the limit as that cutoff $t$ grows without bound. This is precisely the direct combination of the two prerequisites: a proper integral, followed by a limit at infinity.

**Type II — integrands with a singularity**: if $f$ is unbounded (blows up) at some point $c$ within or at the boundary of $[a,b]$ — a **singularity** — the integral $\int_a^b f(x)\,dx$ cannot be computed as an ordinary Riemann-sum limit directly (the integrand isn't even bounded there). Instead, define it as a limit approaching the singularity from the proper-integral side: e.g. if $f$ blows up at $x=a$, define $\int_a^b f(x)\,dx = \lim_{t\to a^+}\int_t^b f(x)\,dx$ — integrating properly from a safe distance $t$ away from the trouble point, then letting $t$ approach the singularity. This is "improper" for a genuinely different reason than Type I (an unbounded FUNCTION VALUE, rather than an unbounded interval), but both are handled by the same overall strategy: replace the problematic piece with a finite substitute, then take a limit.

**Convergence vs. divergence — and why divergence means "no value at all"**: an improper integral **converges** if its defining limit exists and is finite — this finite number IS the value of the improper integral. It **diverges** if the limit fails to exist or is infinite — in this case, the improper integral simply **has no numeric value**; there is no "answer" to report, not even a symbolic placeholder like "$\infty$" functioning as an actual area (though the limit itself may literally equal $+\infty$ or $-\infty$, or fail to exist at all through oscillation). Writing down the improper integral's symbolic form is always possible; whether the underlying limit actually settles down to a finite number is a separate question requiring genuine verification.

## Component 4 — Worked Examples

**Example 1 (LO1 — Type I, computed directly)**: Evaluate $\int_1^\infty \frac{1}{x^2}\,dx$. First, the proper integral up to a cutoff $t$: $\int_1^t \frac{1}{x^2}\,dx = \left[-\frac{1}{x}\right]_1^t = -\frac1t+1 = 1-\frac1t$. Now take the limit: $\lim_{t\to\infty}\left(1-\frac1t\right) = 1-0=1$ (using $1/t\to0$ from `math.calc.limits-at-infinity`). So $\int_1^\infty\frac{1}{x^2}\,dx = 1$ — the improper integral **converges** to the finite value $1$.

**Example 2 (LO2 — Type II, a singularity not involving infinite limits, breaking MC-1)**: Evaluate $\int_0^1 \frac{1}{\sqrt x}\,dx$. The integrand $1/\sqrt x$ is unbounded as $x\to0^+$ (blows up at the LEFT endpoint, a finite point — no infinity appears anywhere in the limits of integration). This is still improper, requiring the limit treatment: $\int_0^1\frac{1}{\sqrt x}\,dx = \lim_{t\to0^+}\int_t^1 x^{-1/2}\,dx = \lim_{t\to0^+}\left[2\sqrt x\right]_t^1 = \lim_{t\to0^+}\left(2-2\sqrt t\right) = 2-0=2$ — converges to $2$, despite having perfectly finite-looking limits of integration ($0$ to $1$), because the INTEGRAND itself is the source of the impropriety.

**Example 3 (LO3 — divergence means no value, breaking MC-2)**: Evaluate $\int_1^\infty \frac{1}{x}\,dx$. The proper integral up to $t$: $\int_1^t\frac1x\,dx = \ln t - \ln1 = \ln t$. Taking the limit: $\lim_{t\to\infty}\ln t = \infty$ — the limit does NOT settle down to any finite number; it grows without bound. So $\int_1^\infty\frac1x\,dx$ **diverges** — it has no finite numeric value at all. Contrast directly with Example 1's $\int_1^\infty\frac{1}{x^2}\,dx=1$: both integrands look superficially similar (a power of $x$ in the denominator, integrated to infinity), yet one converges to a specific number and the other diverges entirely — proving that whether an improper integral has ANY value must be checked case by case, never assumed from the symbolic setup looking reasonable.

## Component 5 — Teaching Actions

### Teaching Action A01 — Type I: Proper Integral, Then a Limit (Primitive P11: Representation Shift)

Shade the region under $y=1/x^2$ from $x=1$ out toward infinity, asking "what's the total area, even though the region never ends?" State: "compute the area up to SOME finite cutoff $t$ — that's just an ordinary integral you already know — then ask what happens as that cutoff pushes out to infinity." Work Example 1's full two-step computation.

### Teaching Action A02 — Type II: A Singularity Doesn't Require Infinite Limits (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $\int_0^1\frac{1}{\sqrt x}\,dx$ is improper (integrand unbounded at $x=0$) despite BOTH limits of integration being perfectly finite numbers ($0$ and $1$). State: "impropriety isn't only about infinity appearing in the limits — it's about whether the FUNCTION stays bounded and well-behaved throughout the interval. A blow-up hiding inside otherwise ordinary-looking limits still needs the same limit-based treatment."

- **MC-1 hook**: ask "is an integral only 'improper' if infinity literally appears as one of its limits of integration?" — a "yes" answer reveals MC-1 (missing that a singularity in the integrand, even with finite limits, is an equally valid and equally common source of impropriety).

### Teaching Action A03 — Convergence Must Be Checked, Never Assumed (Primitive P06: Contrast Pair)

**Contrast** Example 1 ($\int_1^\infty x^{-2}\,dx=1$, converges) against Example 3 ($\int_1^\infty x^{-1}\,dx$, diverges to $\infty$) — two visually similar setups with opposite outcomes. State: "you cannot tell by looking whether an improper integral converges — you must actually compute the limit. And when it diverges, the improper integral simply has NO value — there's nothing to report, not a strange or approximate number, just no answer."

- **MC-2 hook**: ask "does every improper integral, since it's set up using perfectly valid integration and limit rules, necessarily evaluate to SOME specific number?" — a "yes" answer reveals MC-2 (assuming a valid-looking symbolic setup guarantees a finite result, missing that divergence is a genuine, common possible outcome).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Evaluate $\int_1^\infty \frac{1}{x^3}\,dx$, showing the proper-integral-then-limit process explicitly.
  2. Evaluate $\int_0^4 \frac{1}{\sqrt{4-x}}\,dx$ (identify where the singularity is located first, before setting up the limit).
  3. Evaluate $\int_1^\infty \frac{1}{\sqrt x}\,dx$ and determine whether it converges or diverges, contrasting your result with Example 1's convergent case.
  4. A student claims that $\int_{-1}^{1}\frac{1}{x}\,dx$ can be computed directly as an ordinary definite integral, since both limits of integration are finite. Explain what's wrong with this claim, identifying the specific issue with the integrand.
- **P76 (Transfer Probe, mode = independence)**: "A physicist models the total energy radiated by a decaying process over ALL future time as $E = \int_0^\infty P_0 e^{-kt}\,dt$, where $P_0,k>0$ are constants representing initial power and decay rate. (a) Set up and evaluate this improper integral using the proper-integral-then-limit process, expressing the total energy in terms of $P_0$ and $k$. (b) Explain, using the convergence-must-be-checked principle from Example 3's contrast, why the physicist cannot simply assume this integral converges just because it represents a physically sensible quantity (total radiated energy) — the convergence must still be verified mathematically. (c) If instead the power decayed as $P(t) = P_0/(1+t)$ rather than exponentially, explain (without necessarily completing the full computation) why you would suspect this integral might diverge, based on the pattern observed between Example 1 and Example 3's contrasting outcomes for $1/x^2$ versus $1/x$."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | IMPROPRIETY-ASSUMED-TO-REQUIRE-INFINITE-LIMITS | Believing an integral is only improper when infinity literally appears in its limits of integration, missing that a singularity in the integrand (even with finite limits) is an equally valid source of impropriety | Foundational |
| MC-2 | IMPROPER-INTEGRAL-ASSUMED-TO-ALWAYS-CONVERGE | Assuming every improper integral, since it is set up using valid rules, must evaluate to some specific finite number, missing that divergence (no value at all) is a genuine and common outcome requiring verification | Foundational |
| MC-3 | SINGULARITY-LOCATION-OVERLOOKED-WITHIN-INTERVAL | Failing to notice a singularity occurring at an INTERIOR point of the interval of integration (not just at an endpoint), leading to an incorrect direct computation that ignores the blow-up | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Impropriety-Requires-Infinite-Limits Assumption") → P41 (detect: present $\int_0^1\frac{1}{\sqrt x}\,dx$ and ask whether this integral is improper, given both limits are finite) → P64 (conceptual shift: re-walk Example 2's direct identification of the singularity at $x=0$, re-anchoring on "check whether the INTEGRAND stays bounded throughout the interval — not just whether infinity appears in the limits").
- **B02 (targets MC-2)**: P27 (name it: "Improper-Integral-Always-Converges Assumption") → P41 (detect: ask a student to evaluate $\int_1^\infty\frac1x\,dx$ and check whether they report a specific finite number without actually computing the limit) → P64 (conceptual shift: re-walk Example 3's direct computation showing $\lim_{t\to\infty}\ln t=\infty$, re-anchoring on "the limit must be COMPUTED — a reasonable-looking setup does not guarantee a finite answer").
- **B03 (targets MC-3)**: P27 (name it: "Interior Singularity Overlooked") → P41 (detect: give an integral like $\int_{-1}^1\frac{1}{x^2}\,dx$, where the singularity is at the interior point $x=0$, and check whether the student attempts a direct antiderivative evaluation without splitting at the singularity) → P64 (conceptual shift: re-anchor on "scan the ENTIRE interval, including interior points, for anywhere the integrand blows up — an interior singularity requires SPLITTING the integral into two pieces, each treated as its own improper integral approaching the singularity from its own side").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.calc.definite-integral` (the proper integral this concept's limit is built from), `math.calc.limits-at-infinity` (the limit-at-infinity machinery directly reused for Type I improper integrals).
- **Unlocks**: `math.seq.integral-test` (a series convergence test that directly compares a series to an improper integral, relying on the convergence/divergence distinction established here).
- **Cross-link**: KG lists no cross-links for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 8 with an advanced/apply tag places this at a "3 TAs + gate" tier — A01 (Type I), A02 (Type II), and A03 (convergence must be checked) each target a distinct LO, appropriate for a concept covering two structurally different sources of impropriety (infinite interval vs. unbounded integrand) unified by the same limit-based resolution strategy.
- Examples 1 and 3 were deliberately paired ($1/x^2$ vs. $1/x$, both integrated from $1$ to $\infty$) because they are the canonical textbook illustration that superficially similar power functions can have opposite convergence behavior — this exact pairing directly previews the p-integral test that `math.seq.integral-test` will formalize.
- MC-3 (interior singularity overlooked) was flagged as its own misconception, distinct from MC-1, because even a student who correctly recognizes ENDPOINT singularities as improper can still make the further, common error of missing a singularity buried in the MIDDLE of an interval — Teaching Notes call this out explicitly since the two failure modes require different detection habits (checking endpoints vs. scanning the whole interval).

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (both) |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (empty in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.75×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Pictorial: infinite shaded region before the limit-based definition) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
