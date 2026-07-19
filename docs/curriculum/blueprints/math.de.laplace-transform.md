# Teaching Blueprint: Laplace Transform (`math.de.laplace-transform`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.de.laplace-transform` |
| name | Laplace Transform |
| domain | Differential Equations |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 8 |
| requires | `math.de.second-order-ode`, `math.calc.improper-integrals`, `math.calc.integration-by-parts` |
| unlocks | `math.de.laplace-ode`, `math.de.convolution-theorem` |
| cross_links | `math.fnal.fourier-transform` (unauthored — see Component 7) |
| CPA_entry_stage | C (Concrete) — computing the transform of a simple exponential by hand, before the general theory |
| description (KG) | The integral transform ℒ{f}(s) = ∫₀^∞ e^{−st}f(t)dt converting differential equations into algebraic equations in s. Transforms derivatives into polynomial multiplication in s. |

## Component 1 — Learning Objectives

- LO1: Define the **Laplace transform** $\mathcal{L}\{f\}(s) = \int_0^\infty e^{-st}f(t)\,dt$ as a **Type I improper integral** (directly reusing `math.calc.improper-integrals`'s machinery), and compute it directly for a simple function using **integration by parts** where needed.
- LO2: Derive the **derivative rule** $\mathcal{L}\{f'\}(s) = sF(s)-f(0)$ (where $F(s)=\mathcal{L}\{f\}(s)$) via integration by parts, and recognize this as the transform's entire reason for existing: it converts DIFFERENTIATION into algebraic MULTIPLICATION by $s$, turning a differential equation into an algebraic one.
- LO3: Recognize that the Laplace transform integral only **converges** for $s$ sufficiently large (depending on $f$'s growth rate) — directly refuting the misconception that $\mathcal{L}\{f\}(s)$ is defined for every value of $s$ unconditionally, when in fact it inherits the exact convergence-must-be-checked discipline already established for improper integrals.

## Component 2 — Prerequisite Check

Assumes mastery of `math.de.second-order-ode` (the ODE $y''+P(x)y'+Q(x)y=G(x)$ this transform will eventually convert into an algebraic equation), `math.calc.improper-integrals` (Type I improper integrals $\int_a^\infty f(x)\,dx$ as a limit of proper integrals, and that convergence must genuinely be checked), and `math.calc.integration-by-parts` ($\int u\,dv=uv-\int v\,du$, and choosing $u,dv$ wisely).

## Component 3 — Core Explanation

**The transform as a Type I improper integral**: $\mathcal{L}\{f\}(s) = \int_0^\infty e^{-st}f(t)\,dt$ is, by construction, precisely a Type I improper integral (infinite upper limit) — exactly the object `math.calc.improper-integrals` already taught how to handle: compute the proper integral up to a cutoff $T$, then take the limit as $T\to\infty$. Nothing about the DEFINITION here is new; the Laplace transform is simply a specific, extremely useful family of such integrals, parametrized by $s$.

**The derivative rule — the entire point of the transform**: applying integration by parts to $\mathcal{L}\{f'\}(s) = \int_0^\infty e^{-st}f'(t)\,dt$, with $u=e^{-st}$ ($du=-se^{-st}dt$) and $dv=f'(t)\,dt$ ($v=f(t)$): $\mathcal{L}\{f'\}(s) = \left[e^{-st}f(t)\right]_0^\infty - \int_0^\infty(-se^{-st})f(t)\,dt = \big(0-f(0)\big)+s\int_0^\infty e^{-st}f(t)\,dt = sF(s)-f(0)$ (the boundary term at $\infty$ vanishes for $s$ large enough that $e^{-st}f(t)\to0$; the boundary term at $0$ gives $-f(0)$). This is the transform's entire reason for existing: **differentiating $f$ in the $t$-domain corresponds to MULTIPLYING $F(s)$ by $s$** (and subtracting the initial condition) in the $s$-domain — turning a differential equation (involving derivatives) into an algebraic equation (involving only polynomial multiplication in $s$), which is dramatically easier to solve.

**Convergence is not automatic**: exactly as with any improper integral, $\mathcal{L}\{f\}(s)$ converges only for $s$ SUFFICIENTLY LARGE — specifically, large enough that $e^{-st}$ decays faster than $f(t)$ grows, so the integrand shrinks to $0$ as $t\to\infty$. Different functions $f$ require different minimum values of $s$ for convergence (this minimum is called $f$'s "abscissa of convergence"); there is no universal value of $s$ that works for every $f$, and the transform is simply UNDEFINED for $s$ too small.

## Component 4 — Worked Examples

**Example 1 (LO1 — computing a transform directly as an improper integral)**: Find $\mathcal{L}\{e^{at}\}(s)$ for a constant $a$. $\mathcal{L}\{e^{at}\}(s) = \int_0^\infty e^{-st}e^{at}\,dt = \int_0^\infty e^{-(s-a)t}\,dt$. Using `math.calc.improper-integrals`'s Type I procedure: $\int_0^T e^{-(s-a)t}\,dt = \left[\frac{-1}{s-a}e^{-(s-a)t}\right]_0^T = \frac{1}{s-a}\left(1-e^{-(s-a)T}\right)$. Taking $T\to\infty$: if $s>a$, $e^{-(s-a)T}\to0$, giving $\mathcal{L}\{e^{at}\}(s) = \frac{1}{s-a}$ (for $s>a$ specifically).

**Example 2 (LO2 — the derivative rule, verified on a known case)**: Let $f(t)=e^{at}$, so $f'(t)=ae^{at}$ and $f(0)=1$. Compute $\mathcal{L}\{f'\}(s)$ directly: $\mathcal{L}\{ae^{at}\}(s) = a\mathcal{L}\{e^{at}\}(s) = \frac{a}{s-a}$ (using Example 1's result and linearity). Now verify via the derivative rule: $sF(s)-f(0) = s\cdot\frac{1}{s-a}-1 = \frac{s-(s-a)}{s-a}=\frac{a}{s-a}$ — matching EXACTLY, confirming the rule $\mathcal{L}\{f'\}(s)=sF(s)-f(0)$ directly, without needing to re-derive it via integration by parts every single time.

**Example 3 (LO3 — convergence is condition-dependent, breaking MC-1)**: Return to Example 1's result, $\mathcal{L}\{e^{at}\}(s)=\frac{1}{s-a}$, valid ONLY for $s>a$. For $s\le a$: the integral $\int_0^\infty e^{-(s-a)t}\,dt$ has exponent $-(s-a)\ge0$, meaning $e^{-(s-a)t}$ does NOT decay (it grows or stays constant as $t\to\infty$) — the integral DIVERGES, and $\mathcal{L}\{e^{at}\}(s)$ is simply undefined there. Concretely, for $f(t)=e^{5t}$: $\mathcal{L}\{f\}(s)=\frac{1}{s-5}$ is only valid for $s>5$; attempting to evaluate "$\mathcal{L}\{f\}(3)$" is meaningless, since the defining integral diverges at $s=3<5$ — proving the transform's domain of validity genuinely depends on the specific function $f$'s growth rate, not a universal constant.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Transform Is Just Another Improper Integral (Primitive P11: Representation Shift)

State: "nothing new about the DEFINITION here — this is exactly the Type I improper integral machinery you already know, just with a specific, extremely useful integrand $e^{-st}f(t)$." Work Example 1's full computation, explicitly narrating the proper-integral-then-limit procedure.

### Teaching Action A02 — The Derivative Rule: Why the Transform Exists At All (Primitive P28: Conflict Evidence)

Derive the rule $\mathcal{L}\{f'\}(s)=sF(s)-f(0)$ live via integration by parts, then present Example 2's direct verification (computing both sides independently and confirming they match). State: "this ONE fact is the entire point — differentiation in $t$ becomes multiplication by $s$. That's what makes converting a differential equation into an algebraic equation possible."

### Teaching Action A03 — Convergence Depends on f, Never Universal (Primitive P28: Conflict Evidence)

Present Example 3's direct evidence: $\mathcal{L}\{e^{5t}\}(s)$ is valid only for $s>5$, and genuinely undefined (divergent integral) for $s\le5$. State: "just like any improper integral, this one has a genuine convergence condition — don't assume the transform is defined everywhere just because the formula looks clean once you've computed it."

- **MC-1 hook**: ask "once you've computed $\mathcal{L}\{f\}(s)=\frac{1}{s-a}$ for some function $f$, is this formula valid for every value of $s$?" — a "yes" answer reveals MC-1 (assuming the transform is universally defined, missing that the underlying improper integral only converges for $s$ above a function-specific threshold).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute $\mathcal{L}\{1\}(s)$ (the transform of the constant function $f(t)=1$) directly as an improper integral, stating the value(s) of $s$ for which it converges.
  2. Compute $\mathcal{L}\{t\}(s)$ using integration by parts (with $u=t$, $dv=e^{-st}dt$).
  3. Given $\mathcal{L}\{\cos(t)\}(s) = \frac{s}{s^2+1}$ and $f(t)=\cos(t)$ with $f(0)=1$, verify the derivative rule by computing $\mathcal{L}\{f'\}(s) = \mathcal{L}\{-\sin(t)\}(s)$ directly and confirming it equals $sF(s)-f(0)$.
  4. Explain why $\mathcal{L}\{e^{10t}\}(2)$ is meaningless (cannot be computed as a valid number), referencing the convergence condition from Example 3.
- **P76 (Transfer Probe, mode = independence — KG cross_link `math.fnal.fourier-transform` is not yet authored; a future revision may add a genuine cross-link probe into the Fourier transform's own convergence and derivative-rule parallels once that entry exists)**: "An electrical engineer wants to solve the differential equation $y'+3y=0$, $y(0)=5$ describing a discharging circuit, using the Laplace transform method. (a) Apply the derivative rule to transform $y'+3y=0$ into an algebraic equation in $s$ and $Y(s)=\mathcal{L}\{y\}(s)$, using the given initial condition $y(0)=5$. (b) Solve the resulting algebraic equation for $Y(s)$. (c) Explain, in general terms (without necessarily performing an inverse transform), why converting the ORIGINAL differential equation into this algebraic equation in $s$ represents genuine progress toward solving the problem, referencing the derivative rule's role as 'the entire point' of the transform from Component 3."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LAPLACE-TRANSFORM-ASSUMED-UNIVERSALLY-DEFINED | Believing $\mathcal{L}\{f\}(s)$ is valid for every value of $s$ once a formula is found, missing that the underlying improper integral only converges for $s$ above a function-specific threshold | Foundational |
| MC-2 | DERIVATIVE-RULE-SIGN-OR-INITIAL-CONDITION-TERM-OMITTED | Stating the derivative rule as $\mathcal{L}\{f'\}(s)=sF(s)$, omitting the essential $-f(0)$ term | Foundational |
| MC-3 | LAPLACE-TRANSFORM-COMPUTATION-ATTEMPTED-WITHOUT-VERIFYING-INTEGRATION-BY-PARTS-CHOICE | Applying integration by parts to compute a transform without a deliberate choice of $u,dv$ (per `math.calc.integration-by-parts`'s own LIATE-style reasoning), leading to a more complicated resulting integral | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Laplace-Transform-Universally-Defined Assumption") → P41 (detect: ask a student to evaluate a computed transform formula at a value of $s$ below its convergence threshold, and check whether they proceed without flagging an issue) → P64 (conceptual shift: re-walk Example 3's direct divergence check for $s\le a$, re-anchoring on "the transform is only defined where the underlying improper integral actually converges — always state the valid range of $s$").
- **B02 (targets MC-2)**: P27 (name it: "Missing Initial-Condition Term in Derivative Rule") → P41 (detect: ask a student to state the derivative rule and check whether they omit $-f(0)$) → P64 (conceptual shift: re-walk the integration-by-parts derivation in Component 3, re-anchoring on "the boundary term at $t=0$ is exactly where $-f(0)$ comes from — it's not optional").
- **B03 (targets MC-3)**: P27 (name it: "Integration-by-Parts Choice Not Deliberate") → P41 (detect: ask a student to compute $\mathcal{L}\{t\}(s)$ and check whether they choose $u,dv$ deliberately, per the already-known LIATE-style reasoning, or proceed haphazardly) → P64 (conceptual shift: re-anchor on `math.calc.integration-by-parts`'s own established practice — choose $u=t$ (algebraic, differentiates to something simpler) and $dv=e^{-st}dt$ (exponential-type, easy to integrate) — applying the SAME already-mastered decision process here).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.de.second-order-ode` (the differential equations this transform is ultimately designed to convert into algebraic form), `math.calc.improper-integrals` (the Type I improper-integral machinery this transform's definition directly is), `math.calc.integration-by-parts` (the technique used to derive the derivative rule and compute many specific transforms).
- **Unlocks**: `math.de.laplace-ode` (solving ODEs by transforming, solving algebraically, then inverse-transforming — the direct practical payoff of this concept), `math.de.convolution-theorem` (a further structural property of the transform).
- **Cross-link**: KG lists `math.fnal.fourier-transform` as a cross-link, but that concept is **not yet authored** in the corpus (checked via `ls docs/curriculum/blueprints/math.fnal.fourier-transform.md`, not found) — P76_mode = independence for this blueprint's transfer probe. A future revision may add a genuine cross-link probe into the Fourier transform's own convergence and derivative-rule parallels once that entry exists.

## Component 8 — Teaching Notes

- estimated_hours = 8 with an expert/apply tag places this at a "3 TAs + gate" tier — A01 (the transform as an improper integral), A02 (the derivative rule, the transform's entire purpose), and A03 (convergence is condition-dependent) each target a distinct LO, appropriate for a technique directly synthesizing two prerequisite calculus techniques into a new tool with a specific structural payoff.
- Example 2's derivative-rule verification was deliberately designed to compute BOTH sides of the rule independently (direct transform of $f'$, and $sF(s)-f(0)$ from the already-known $F(s)$) and confirm they match — this is stronger evidence than simply asserting the rule, and mirrors this corpus's general preference for verified claims over asserted ones.
- MC-1 (universal-definition assumption) was given the most teaching weight because Laplace transform TABLES (commonly used as a lookup reference in practice) typically omit the convergence condition unless specifically asked for, making it easy for a student to internalize the FORMULA while losing track of the fact that it's conditionally valid — Example 3 directly counters this by working the divergent case explicitly.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (all 3) |
| V-4 | unlocks concepts named accurately from KG | PASS (both) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.fnal.fourier-transform not authored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Concrete: computing a simple exponential's transform by hand before the general theory) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
