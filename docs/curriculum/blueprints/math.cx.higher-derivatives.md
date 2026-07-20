# Teaching Blueprint: Derivatives of Holomorphic Functions (`math.cx.higher-derivatives`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.cx.higher-derivatives` |
| name | Derivatives of Holomorphic Functions |
| domain | Complex Analysis |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 4 |
| requires | `math.cx.cauchy-integral-formula` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert learner already has the Cauchy Integral Formula for $f(z_0)$ itself; the task is the astonishing extension to ALL orders of derivative, and a genuinely useful bound this generalization supplies |
| description (KG) | Every holomorphic function has derivatives of all orders: $f^{(n)}(z_0)=\frac{n!}{2\pi i}\oint_C\frac{f(z)}{(z-z_0)^{n+1}}\,dz$. Cauchy's inequality: $|f^{(n)}(z_0)|\le\frac{n!M}{R^n}$ for $|f|\le M$ on $|z-z_0|=R$. |

## Component 1 — Learning Objectives

- LO1 (cross-link objective): Recognize the formula for $f^{(n)}(z_0)$ as a DIRECT GENERALIZATION of `math.cx.cauchy-integral-formula`'s own formula for $f(z_0)$ itself (the $n=0$ case) — obtained by differentiating that formula's own integral expression $n$ TIMES with respect to $z_0$ (differentiating under the integral sign, a standard but nontrivial technique, not derived in full here) — and correctly verify the formula reduces to `math.cx.cauchy-integral-formula`'s own statement when $n=0$.
- LO2: State the genuinely remarkable structural consequence: a holomorphic function is AUTOMATICALLY infinitely differentiable (in $\mathbb{C}$, holomorphic once $\Rightarrow$ holomorphic FOREVER, i.e. $C^\infty$) — a conclusion with NO real-variable analogue (`math.calc.derivative-definition`-style real differentiability at a point says nothing about even the SECOND derivative existing, let alone all orders) — and correctly explain why THIS is a genuinely surprising, complex-analysis-SPECIFIC phenomenon.
- LO3: State and apply Cauchy's inequality $|f^{(n)}(z_0)|\le\frac{n!M}{R^n}$ (a bound on the $n$th derivative's SIZE, obtained by directly estimating the integral formula) — and correctly use it to bound a specific derivative for a function with a known bound $M$ on a specific circle, without ever computing the derivative explicitly.

## Component 2 — Prerequisite Check

Assumes mastery of `math.cx.cauchy-integral-formula` ($f(z_0)=\frac1{2\pi i}\oint_Cf(z)/(z-z_0)\,dz$ for $f$ holomorphic on and inside the simple closed curve $C$).

## Component 3 — Core Explanation

**The formula for $f^{(n)}(z_0)$ generalizes `math.cx.cauchy-integral-formula`'s own $n=0$ case**: `math.cx.cauchy-integral-formula` already gives $f(z_0)=\frac1{2\pi i}\oint_C\frac{f(z)}{z-z_0}\,dz$ — the $n=0$ instance of THIS concept's own general formula $f^{(n)}(z_0)=\frac{n!}{2\pi i}\oint_C\frac{f(z)}{(z-z_0)^{n+1}}\,dz$ (checking: at $n=0$, $\frac{n!}{2\pi i}=\frac1{2\pi i}$ and $(z-z_0)^{n+1}=(z-z_0)^1$, matching exactly). Differentiating `math.cx.cauchy-integral-formula`'s own expression with respect to $z_0$ (treating the integral's $z$-dependence as fixed, differentiating the $\frac1{z-z_0}$ factor, and justifying the interchange of differentiation and integration — a technical but standard step, not fully derived here) produces $f'(z_0)=\frac1{2\pi i}\oint_C\frac{f(z)}{(z-z_0)^2}\,dz$; repeating $n$ times gives the general formula, with each differentiation contributing one more factor and one more power in the denominator.

**Holomorphic once means holomorphic ($C^\infty$) forever — a phenomenon with NO real-variable counterpart**: THIS concept's formula computes $f^{(n)}(z_0)$ EXPLICITLY, for EVERY $n$, from the SAME single hypothesis (that $f$ is holomorphic on and inside $C$) `math.cx.cauchy-integral-formula`'s own theorem already assumes. This means: a function need only be differentiable ONCE (complex-differentiable, i.e. holomorphic) to AUTOMATICALLY be differentiable INFINITELY MANY TIMES. This has genuinely NO analogue for real-valued functions of a real variable — a real function can be differentiable exactly once, or exactly twice, or any specific finite number of times, with no guarantee of further differentiability (standard real-analysis examples exist for every such gap) — making complex differentiability (holomorphicity) a STRICTLY stronger, more rigid condition than real differentiability might suggest by superficial analogy.

**Cauchy's inequality bounds the derivative's SIZE directly from a bound on $f$ itself, without computing the derivative**: taking absolute values in THIS concept's own integral formula and estimating directly (using $|f(z)|\le M$ on the circle $|z-z_0|=R$, and the circle's circumference $2\pi R$): $|f^{(n)}(z_0)|=\left|\frac{n!}{2\pi i}\oint_C\frac{f(z)}{(z-z_0)^{n+1}}\,dz\right|\le\frac{n!}{2\pi}\cdot\frac{M}{R^{n+1}}\cdot2\pi R=\frac{n!M}{R^n}$ — a bound on $|f^{(n)}(z_0)|$ obtained ENTIRELY from a bound on $|f|$ itself (never needing to know $f^{(n)}$'s actual value), directly reusing THIS concept's own integral-representation formula as the mechanism.

## Component 4 — Worked Examples

**Example 1 (LO1 — the formula's direct reduction to `math.cx.cauchy-integral-formula`'s own $n=0$ case, breaking MC-1)**: for $f(z)=e^z$ and $C$ the unit circle around $z_0=0$: `math.cx.cauchy-integral-formula`'s own formula gives $f(0)=\frac1{2\pi i}\oint_C\frac{e^z}{z}\,dz=1$ (matching $e^0=1$ directly, a standard already-known evaluation). THIS concept's general formula at $n=0$ gives EXACTLY the same expression: $f^{(0)}(0)=\frac{0!}{2\pi i}\oint_C\frac{e^z}{z^{0+1}}\,dz=\frac1{2\pi i}\oint_C\frac{e^z}{z}\,dz=1$ — confirming LO1's claimed reduction concretely, not merely by symbolic substitution but by matching the ACTUAL already-known numeric evaluation.

**Example 2 (LO2 — the automatic-infinite-differentiability phenomenon, contrasted with the real case, breaking MC-2)**: $f(z)=1/z$ (excluding $z=0$) is holomorphic on any domain avoiding the origin — so THIS concept's theorem guarantees derivatives of EVERY order exist there, and indeed $f^{(n)}(z)=(-1)^n n!/z^{n+1}$ is directly computable and well-defined for every $n$, on the same domain. Contrast with a REAL-variable example: $g(x)=x^{5/3}$ is differentiable once at $x=0$ ($g'(0)=0$), but $g''(x)=\frac{10}{9}x^{-1/3}$ is UNDEFINED at $x=0$ — a real function differentiable once but NOT twice at a point, a genuine gap with NO possible complex-analysis analogue, since holomorphicity (complex differentiability) at even a single point's neighborhood FORCES infinite differentiability there, confirming LO2's claimed contrast concretely.

**Example 3 (LO3 — applying Cauchy's inequality to bound a derivative without computing it, breaking MC-3)**: for $f$ holomorphic with $|f(z)|\le10$ on the circle $|z|=2$ (i.e. $M=10,R=2$): Cauchy's inequality directly bounds $|f^{(3)}(0)|\le\frac{3!\times10}{2^3}=\frac{60}{8}=7.5$ — a genuine, useful upper bound on the THIRD derivative's magnitude at the origin, obtained ENTIRELY from the bound $M=10$ on $f$ itself, with NO need to know $f$'s explicit formula or compute $f^{(3)}$ directly at all, confirming LO3's claimed capability concretely.

## Component 5 — Teaching Actions

### Teaching Action A01 — The General Derivative Formula Is `math.cx.cauchy-integral-formula`'s Own Formula, Differentiated Repeatedly (Primitive P11: Representation Shift)

State: "this concept's formula for $f^{(n)}(z_0)$ isn't a brand-new independent result — it comes from differentiating `math.cx.cauchy-integral-formula`'s own expression for $f(z_0)$ itself, $n$ times, and checking the $n=0$ case matches EXACTLY confirms this." Walk Example 1's direct numeric verification.

- **MC-1 hook**: ask "is the formula for $f^{(n)}(z_0)$ an independent new result unrelated to `math.cx.cauchy-integral-formula`'s own formula, or does it reduce directly to that formula when $n=0$?" — an "independent, unrelated result" answer reveals MC-1 (missing the direct reduction and generalization relationship).

### Teaching Action A02 — Holomorphic Once Means Infinitely Differentiable — No Real-Variable Analogue (Primitive P28: Conflict Evidence)

Present Example 2's direct contrast: $f(z)=1/z$'s derivatives of every order all exist and are directly computable, while the real function $g(x)=x^{5/3}$'s SECOND derivative genuinely fails to exist at $x=0$ despite the first derivative existing there. State: "this genuinely doesn't happen in complex analysis — a function holomorphic on a domain is AUTOMATICALLY $C^\infty$ there; the real-variable gap Example 2 demonstrates has literally no possible counterpart once complex differentiability is established."

- **MC-2 hook**: ask "can a holomorphic function be complex-differentiable exactly once at a point, without its second derivative necessarily existing there — analogous to a real function's derivative gaps?" — a "yes, analogous gaps are possible" answer reveals MC-2 (missing that holomorphicity forces automatic infinite differentiability, with no possible gap).

### Teaching Action A03 — Cauchy's Inequality Bounds the Derivative WITHOUT Computing It (Primitive P06: Contrast Pair)

Contrast the (unavailable, since $f$'s explicit formula isn't given) route of computing $f^{(3)}(0)$ directly against Example 3's direct application of Cauchy's inequality, obtaining a genuine numeric bound using ONLY the given bound $M=10$ on $|f|$ itself. State: "you don't need $f$'s explicit formula, or to compute the derivative directly, to get a genuinely useful bound on its size — a bound on $f$ itself, fed into this concept's own integral formula, gives you that directly."

- **MC-3 hook**: ask "to bound $|f^{(n)}(z_0)|$ using Cauchy's inequality, is it necessary to know $f$'s explicit formula and compute the derivative directly, or does a bound on $|f|$ alone suffice?" — a "explicit formula and direct computation needed" answer reveals MC-3 (missing that Cauchy's inequality bounds the derivative from a bound on $f$ itself, without ever computing it).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify that THIS concept's general formula, at $n=0$, reduces exactly to `math.cx.cauchy-integral-formula`'s own statement.
  2. Explain, using a real-variable example distinct from $g(x)=x^{5/3}$, why real differentiability at a point does not guarantee higher-order differentiability, then explain why the complex case is genuinely different.
  3. For $f$ holomorphic with $|f(z)|\le5$ on $|z|=3$, bound $|f^{(2)}(0)|$ using Cauchy's inequality.
  4. Explain, in your own words, why Cauchy's inequality can be applied without knowing $f$'s explicit formula.
- **P76 (Transfer Probe, mode = independence — no cross-link target listed in the KG for this concept)**: "A physicist working with a holomorphic potential function $f(z)$ knows only that $|f(z)|\le100$ on the circle $|z-z_0|=5$ (from a physical energy-bound argument), and needs to estimate the SIXTH derivative's magnitude at $z_0$ for a perturbation-theory calculation, without knowing $f$'s explicit formula. (a) Using Cauchy's inequality, compute the bound this gives on $|f^{(6)}(z_0)|$. (b) Explain why the physicist can trust this bound is valid even without any explicit knowledge of $f$'s formula, citing this concept's own derivation of the inequality. (c) Explain why the physicist can also be confident that $f^{(6)}(z_0)$ exists AT ALL in the first place, given only that $f$ is holomorphic — citing this concept's automatic-infinite-differentiability result."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | HIGHER-DERIVATIVE-FORMULA-ASSUMED-INDEPENDENT | Believing the formula for $f^{(n)}(z_0)$ is an independent new result unrelated to `math.cx.cauchy-integral-formula`'s own formula, missing the direct reduction and generalization relationship | Foundational |
| MC-2 | COMPLEX-DIFFERENTIABILITY-ASSUMED-TO-HAVE-REAL-VARIABLE-GAPS | Believing a holomorphic function could be complex-differentiable at a point without its higher derivatives necessarily existing, missing that holomorphicity forces automatic infinite differentiability | High |
| MC-3 | CAUCHYS-INEQUALITY-ASSUMED-TO-REQUIRE-EXPLICIT-FORMULA | Believing bounding $|f^{(n)}(z_0)|$ via Cauchy's inequality requires knowing $f$'s explicit formula and computing the derivative directly, missing that a bound on $|f|$ alone suffices | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Higher-Derivative Formula Assumed Independent") → P41 (detect: ask whether the formula is independent of or reduces to `math.cx.cauchy-integral-formula`'s own formula) → P64 (conceptual shift: re-walk Example 1's direct numeric verification at $n=0$).
- **B02 (targets MC-2)**: P27 (name it: "Complex Differentiability Assumed to Have Real-Variable Gaps") → P41 (detect: ask whether a holomorphic function could lack a higher derivative despite being complex-differentiable) → P64 (conceptual shift: re-walk Example 2's contrast between $1/z$'s automatic infinite differentiability and $x^{5/3}$'s genuine real-variable gap).
- **B03 (targets MC-3)**: P27 (name it: "Cauchy's Inequality Assumed to Require Explicit Formula") → P41 (detect: ask whether applying Cauchy's inequality requires $f$'s explicit formula) → P64 (conceptual shift: re-walk Example 3's bound obtained purely from $M=10$).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.cx.cauchy-integral-formula` (the formula for $f(z_0)$ itself this concept's general derivative formula directly generalizes, via repeated differentiation).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists none for this concept. $P76_{mode}=$ **independence** (no cross-link target to check).

## Component 8 — Teaching Notes

- estimated_hours = 4 with an expert/understand tag supports the "3 TAs + gate" tier, with LO1 establishing the direct generalization relationship, LO2 given full depth via a genuinely contrasted real-variable counterexample, and LO3 demonstrating Cauchy's inequality's genuine practical utility.
- **Division of labor**: `math.cx.cauchy-integral-formula` already owns the formula for $f(z_0)$ itself (the $n=0$ case) and its own proof/application machinery (verified by grep — no higher-derivative or Cauchy's-inequality content found there). This concept owns the full generalization to all orders $n$, the genuinely surprising automatic-infinite-differentiability consequence (contrasted against a real-variable counterexample), and Cauchy's inequality as a direct application.
- Example 2's deliberate choice of $g(x)=x^{5/3}$ (a specific, standard real-analysis counterexample with a precisely computable failure point) rather than a vaguely-described "some function with a derivative gap" was made to give LO2's contrast a fully verified, concrete anchor — the second derivative's failure at $x=0$ is directly computable and checkable, not merely asserted.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (none listed in KG → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already has CIF for $f(z_0)$; task is the extension to all derivative orders and its consequences) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
