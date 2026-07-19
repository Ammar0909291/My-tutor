# Teaching Blueprint: Uniform Convergence (`math.real.uniform-convergence`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.real.uniform-convergence` |
| name | Uniform Convergence |
| domain | Real Analysis |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 6 |
| requires | `math.real.continuity-rigorous`, `math.seq.series-convergence` |
| unlocks | `math.real.weierstrass-approximation` |
| cross_links | `math.de.fourier-convergence` |
| CPA_entry_stage | A (Abstract) — expert learner already fluent in rigorous continuity and series convergence; uniform convergence is introduced directly via the sup-norm definition |
| description (KG) | fₙ→f uniformly on E iff ∀ε>0, ∃N: n>N ⟹ sup_{x∈E}\|fₙ(x)−f(x)\|<ε. Uniform limit of continuous functions is continuous; integrates termwise; differentiates termwise if derivatives converge uniformly. |

## Component 1 — Learning Objectives

- LO1: Define **uniform convergence** $f_n\to f$ on $E$ — $\forall\varepsilon>0\ \exists N: n>N\Rightarrow\sup_{x\in E}|f_n(x)-f(x)|<\varepsilon$ — and distinguish it from **pointwise** convergence (where the required $N$ may depend on $x$ itself): uniform convergence demands ONE $N$ that works simultaneously for EVERY $x\in E$.
- LO2: Apply the theorem "a uniform limit of continuous functions is continuous," and identify a case where POINTWISE convergence of continuous functions fails to preserve continuity — recognizing uniform convergence as the genuinely stronger hypothesis actually required.
- LO3: Apply the termwise integration and differentiation theorems, distinguishing their hypotheses: termwise integration requires only that $f_n\to f$ **uniformly**, while termwise differentiation requires the stronger condition that the **derivatives** $f_n'$ **themselves** converge uniformly — a genuinely additional requirement, not automatically implied by uniform convergence of the $f_n$ alone.

## Component 2 — Prerequisite Check

Assumes mastery of `math.real.continuity-rigorous` (the $\varepsilon$-$\delta$ definition of continuity) and `math.seq.series-convergence` (sequence and series convergence, partial sums).

## Component 3 — Core Explanation

**Uniform convergence requires ONE $N$ for every point simultaneously**: pointwise convergence only requires that, for each individual $x$, $f_n(x)\to f(x)$ — the required $N$ is allowed to depend on $x$ (points where convergence is "slower" may need a much larger $N$). Uniform convergence is strictly stronger: it demands a SINGLE $N$, working for every $x\in E$ at once, measured via the supremum distance $\sup_{x\in E}|f_n(x)-f(x)|$ — if this supremum itself shrinks below any $\varepsilon$ for large enough $n$, convergence is uniform; if the supremum never shrinks (even though each individual point converges), convergence is only pointwise.

**Uniform convergence is what actually preserves continuity — pointwise convergence is not enough**: if $f_n\to f$ UNIFORMLY and every $f_n$ is continuous, then $f$ is continuous too. This genuinely requires the uniform hypothesis: a sequence of continuous functions converging only POINTWISE can converge to a discontinuous limit, because the "worst" point (where convergence is slowest) can shift arbitrarily as $n$ grows, without ever being uniformly controlled.

**Termwise integration needs uniform convergence of $f_n$; termwise differentiation needs uniform convergence of $f_n'$ — a strictly stronger, separate hypothesis**: if $f_n\to f$ uniformly on $[a,b]$, then $\int_a^bf_n\to\int_a^bf$ (the limit and integral can be swapped) — uniform convergence of the FUNCTIONS themselves suffices. But swapping limit and DERIVATIVE is a genuinely different, stronger claim: $f_n\to f$ (even uniformly) does NOT by itself guarantee $f_n'\to f'$. Termwise differentiation requires the DERIVATIVES $f_n'$ to converge uniformly in their own right — an entirely separate condition that must be checked independently, never assumed to follow automatically from uniform convergence of the $f_n$.

## Component 4 — Worked Examples

**Example 1 (LO1 — pointwise convergence with no single working $N$, breaking MC-1)**: $f_n(x)=x^n$ on $[0,1)$. At $x=0.5$: $x^n<\varepsilon$ once $n$ exceeds roughly $\log\varepsilon/\log0.5$ — a specific, moderate $N$. At $x=0.9$: the SAME target $\varepsilon$ requires a MUCH larger $N$, since $0.9^n$ shrinks far more slowly. As $x\to1^-$, the needed $N$ grows without bound for any fixed $\varepsilon$. Indeed, $\sup_{x\in[0,1)}|x^n-0|=1$ for EVERY $n$ (points arbitrarily close to $1$ always have $x^n$ arbitrarily close to $1$) — the supremum distance never shrinks below $1$, no matter how large $n$ is. So $f_n\to0$ POINTWISE on $[0,1)$ (each individual $x$ converges) but NOT uniformly (no single $N$ ever controls every point at once).

**Example 2 (LO2 — a discontinuous pointwise limit of continuous functions, breaking MC-2)**: Extend Example 1's $f_n(x)=x^n$ to the closed interval $[0,1]$: each $f_n$ is continuous (indeed a polynomial) on all of $[0,1]$. The POINTWISE limit is $f(x)=0$ for $x\in[0,1)$ but $f(1)=1$ (since $1^n=1$ for every $n$) — this limit function is DISCONTINUOUS at $x=1$, even though every single $f_n$ was continuous everywhere. This is possible precisely because (as Example 1 showed) the convergence is only pointwise, not uniform — the continuity-preservation theorem's hypothesis genuinely fails here, and its conclusion correspondingly fails too.

**Example 3 (LO3 — uniform convergence of $f_n$ does not give uniform convergence of $f_n'$, breaking MC-3)**: $g_n(x)=\dfrac{\sin(nx)}{\sqrt n}$ on $\mathbb{R}$. Since $\sup_x|g_n(x)-0|=\dfrac1{\sqrt n}\to0$ (a bound independent of $x$), $g_n\to0$ UNIFORMLY — termwise integration is valid: $\int g_n\to\int0=0$, correctly. But differentiating: $g_n'(x)=\sqrt n\cos(nx)$, whose supremum is $\sup_x|g_n'(x)|=\sqrt n\to\infty$ — the DERIVATIVES do not converge uniformly (indeed they don't converge to anything at all, growing without bound). So even though $g_n\to0$ uniformly, one CANNOT conclude $g_n'\to0'=0$ — the termwise-differentiation theorem's separate, stronger hypothesis (uniform convergence of the derivatives themselves) genuinely fails here, correctly blocking a false conclusion.

## Component 5 — Teaching Actions

### Teaching Action A01 — One N for Every Point, Not a Different N Per Point (Primitive P11: Representation Shift)

State: "pointwise convergence lets the 'speed' of convergence vary wildly from point to point; uniform convergence demands a single, universal speed bound — the supremum distance — that itself must shrink to zero." Work Example 1's contrast between the moderate $N$ needed at $x=0.5$ and the ever-growing $N$ needed as $x\to1^-$.

- **MC-1 hook**: ask "if $f_n(x)\to f(x)$ for every individual $x$ in $E$, does that automatically mean $f_n\to f$ uniformly on $E$?" — a "yes" answer reveals MC-1 (conflating pointwise and uniform convergence).

### Teaching Action A02 — Pointwise Convergence Can Destroy Continuity (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: every $f_n(x)=x^n$ is continuous, yet the pointwise limit is discontinuous at $x=1$. State: "continuity of the limit is NOT automatic just because every term in the sequence is continuous — it requires the STRONGER hypothesis of uniform convergence."

- **MC-2 hook**: ask "if every function in a sequence is continuous, must its pointwise limit also be continuous?" — a "yes" answer reveals MC-2 (missing the $x^n$-style counterexample, where pointwise — but not uniform — convergence allows a discontinuous limit).

### Teaching Action A03 — Uniform Convergence of $f_n$ Does Not Give You Uniform Convergence of $f_n'$ (Primitive P06: Contrast Pair)

Contrast Example 3's two computations: $g_n\to0$ uniformly (sup distance $1/\sqrt n\to0$, integration valid) against $g_n'$ NOT converging uniformly (sup distance $\sqrt n\to\infty$, differentiation invalid). State: "termwise integration only needs the functions themselves to converge uniformly; termwise differentiation needs the DERIVATIVES to converge uniformly — a separate, stronger condition that must be checked on its own."

- **MC-3 hook**: ask "if $f_n\to f$ uniformly, is it automatically valid to conclude $f_n'\to f'$ as well?" — a "yes" answer reveals MC-3 (assuming uniform convergence of the functions is sufficient for termwise differentiation, missing the need to separately verify uniform convergence of the derivatives).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Show that $f_n(x)=x/n$ converges uniformly to $0$ on $[0,1]$ by computing $\sup_{x\in[0,1]}|f_n(x)-0|$ directly.
  2. Determine whether $h_n(x)=nx(1-x)^n$ converges uniformly on $[0,1]$ (compute the supremum distance as a function of $n$ and check whether it shrinks to $0$).
  3. Explain, using the $x^n$ example, why the continuity-preservation theorem's hypothesis (uniform convergence) is genuinely necessary, not just a convenient technical condition.
  4. Give a function sequence $f_n\to f$ uniformly where you can still directly verify the derivatives do NOT converge uniformly (other than $\sin(nx)/\sqrt n$), and explain why termwise differentiation would be invalid there.
- **P76 (Transfer Probe, mode = independence)**: "A numerical analyst approximates a target function $f$ using a sequence of polynomial approximations $p_n$, and verifies $\sup_{x\in[0,1]}|p_n(x)-f(x)|\to0$ (i.e., uniform convergence). (a) Using this lesson's theorem, explain what this immediately guarantees about $f$'s continuity, given that every $p_n$ is continuous. (b) The analyst wants to also approximate $f'$ using $p_n'$, and initially assumes this works automatically because $p_n\to f$ uniformly. Using this lesson's distinction, explain what ADDITIONAL condition must be separately verified before concluding $p_n'\to f'$. (c) A colleague argues 'since polynomials are about as well-behaved as functions get, uniform convergence of a polynomial sequence should be enough to guarantee everything, including termwise differentiation, automatically.' Using the $\sin(nx)/\sqrt n$-style reasoning from this lesson (even though that example isn't a polynomial), explain why smoothness of the individual functions does not exempt the analyst from separately checking the derivatives' uniform convergence."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | POINTWISE-CONVERGENCE-CONFLATED-WITH-UNIFORM | Believing pointwise convergence at every point automatically implies uniform convergence, missing that uniform convergence requires a single N working for all points simultaneously | Foundational |
| MC-2 | POINTWISE-LIMIT-OF-CONTINUOUS-ASSUMED-CONTINUOUS | Believing the pointwise limit of a sequence of continuous functions must always be continuous, missing that only uniform convergence guarantees this | Foundational |
| MC-3 | UNIFORM-CONVERGENCE-OF-FUNCTIONS-ASSUMED-SUFFICIENT-FOR-TERMWISE-DIFFERENTIATION | Believing uniform convergence of fₙ to f is sufficient to conclude fₙ' converges to f', missing that termwise differentiation requires the derivatives themselves to converge uniformly, a separate condition | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Pointwise Convergence Conflated with Uniform") → P41 (detect: ask a student whether pointwise convergence at every $x$ implies uniform convergence, checking for "yes") → P64 (conceptual shift: re-walk Example 1's ever-growing required $N$ as $x\to1^-$, re-anchoring on "uniform convergence needs ONE $N$ for every point at once, measured via the supremum distance").
- **B02 (targets MC-2)**: P27 (name it: "Pointwise Limit of Continuous Assumed Continuous") → P41 (detect: ask a student whether a pointwise limit of continuous functions must be continuous, checking for "yes") → P64 (conceptual shift: re-walk Example 2's $x^n$ limit, discontinuous at $x=1$ despite every term being continuous, re-anchoring on "only UNIFORM convergence guarantees the limit's continuity").
- **B03 (targets MC-3)**: P27 (name it: "Uniform Convergence of Functions Assumed Sufficient for Termwise Differentiation") → P41 (detect: ask a student whether $f_n\to f$ uniformly is enough to conclude $f_n'\to f'$, checking for "yes") → P64 (conceptual shift: re-walk Example 3's $\sin(nx)/\sqrt n$ case, uniformly convergent yet with divergent derivatives, re-anchoring on "termwise differentiation needs the derivatives' OWN uniform convergence, checked separately").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.real.continuity-rigorous` (the $\varepsilon$-$\delta$ continuity definition this concept's continuity-preservation theorem builds on), `math.seq.series-convergence` (sequence/series convergence machinery this concept's sup-norm definition extends).
- **Unlocks**: `math.real.weierstrass-approximation` (uses uniform convergence directly — every continuous function on a closed interval is a UNIFORM limit of polynomials).
- **Cross-link**: KG lists `math.de.fourier-convergence` as a cross-link — **not yet authored** (checked via `ls docs/curriculum/blueprints/` before setting P76_mode). $P76_{mode}=$ **independence**; a future revision may add a genuine cross-link transfer probe once that entry exists, connecting this concept's uniform-vs-pointwise distinction to the subtleties of Fourier series convergence (which is famously often only pointwise, or even weaker, without extra conditions).

## Component 8 — Teaching Notes

- estimated_hours = 6 with an expert/apply tag places this at a "3 TAs + gate" tier; the three theorems (continuity-preservation, termwise integration, termwise differentiation) are genuinely distinct claims with distinct hypotheses, justifying one full worked example and misconception each.
- **Division of labor**: `math.real.continuity-rigorous` owns the $\varepsilon$-$\delta$ continuity definition in general; `math.seq.series-convergence` owns basic sequence/series convergence. This concept, `math.real.uniform-convergence`, deliberately does not re-derive either; it owns the NEW sup-norm convergence notion for FUNCTION sequences and its three consequence theorems, each carefully distinguished by exactly which hypothesis (uniform convergence of $f_n$ vs. of $f_n'$) each requires.
- Examples 1 and 2 deliberately reuse the SAME function sequence ($x^n$ on $[0,1)$/$[0,1]$) across two learning objectives — first to establish the pointwise-vs-uniform distinction concretely, then to show the concrete CONSEQUENCE of that distinction (a discontinuous limit) — making explicit that the two phenomena share one root cause, rather than presenting them as unrelated facts requiring separate examples.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.de.fourier-convergence unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already fluent in continuity/series convergence; uniform convergence introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
