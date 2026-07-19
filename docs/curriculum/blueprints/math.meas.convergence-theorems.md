# Teaching Blueprint: Convergence Theorems (`math.meas.convergence-theorems`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.meas.convergence-theorems` |
| name | Convergence Theorems |
| domain | Measure Theory |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.6 → MAMR = ⌈0.6×5⌉ = 3/5 |
| estimated_hours | 8 |
| requires | `math.meas.lebesgue-integral` |
| unlocks | none |
| cross_links | `math.real.uniform-convergence` (authored earlier — see Component 7) |
| CPA_entry_stage | A (Abstract) — expert learner already has the Lebesgue integral; the three limit-interchange theorems are introduced directly |
| description (KG) | MCT: if $0\le f_n\uparrow f$ a.e., then $\int f_n\,d\mu\to\int f\,d\mu$. Fatou's Lemma: $\int\liminf f_n\le\liminf\int f_n$. DCT: if $|f_n|\le g$ with $\int g<\infty$ and $f_n\to f$ a.e., then $\int f_n\to\int f$. These allow interchange of limits and integrals under appropriate conditions. |

## Component 1 — Learning Objectives

- LO1: State the **Monotone Convergence Theorem (MCT)**: if $0\le f_n\uparrow f$ almost everywhere, then $\int f_n\,d\mu\to\int f\,d\mu$ — and recognize that swapping $\lim$ and $\int$ is NOT automatic in general (as `math.real.uniform-convergence` already showed can fail for MERE pointwise convergence without uniformity), but MCT guarantees it holds under the specific hypothesis of monotone increase.
- LO2: State **Fatou's Lemma** $\int\liminf f_n\,d\mu\le\liminf\int f_n\,d\mu$ (an INEQUALITY, not an equality) and the **Dominated Convergence Theorem (DCT)** — if $|f_n|\le g$ for an integrable $g$, and $f_n\to f$ a.e., then $\int f_n\to\int f$ — and recognize DCT's domination hypothesis as the tool that RULES OUT the kind of "mass escaping to infinity" failure that can occur without it.
- LO3 (orientation level — full proof machinery deferred): recognize, without full derivation, that MCT, Fatou's Lemma, and DCT are NOT three independent facts but form a logical CHAIN — Fatou's Lemma is typically proved FROM MCT, and DCT is typically proved FROM Fatou's Lemma — previewing the standard order in which measure theory develops these three results.

## Component 2 — Prerequisite Check

Assumes mastery of `math.meas.lebesgue-integral` ($\int f\,d\mu$ as a supremum over simple functions, extending the Riemann integral).

## Component 3 — Core Explanation

**Interchanging $\lim$ and $\int$ is not automatic — MCT gives a specific sufficient condition**: in general, $\lim_n\int f_n\,d\mu$ need NOT equal $\int(\lim_nf_n)\,d\mu$ — `math.real.uniform-convergence` already demonstrated that even mere POINTWISE convergence of continuous functions doesn't guarantee integrals converge to the right limit without UNIFORM convergence. MCT identifies a DIFFERENT sufficient condition specific to the Lebesgue integral: if the functions increase MONOTONICALLY ($f_n\uparrow f$, i.e. $f_1\le f_2\le\cdots$, converging up to $f$) and stay non-negative, then the limit-integral interchange is GUARANTEED to hold, regardless of whether the convergence happens to be uniform.

**Fatou's Lemma gives only an inequality — and DCT's domination hypothesis fixes the potential failure**: Fatou's Lemma makes a WEAKER claim than MCT — only $\int\liminf f_n\le\liminf\int f_n$, an inequality, not an equality — because without monotonicity, "mass" in the functions $f_n$ can escape (e.g. a tall, thin bump sliding off to infinity, converging pointwise to $0$ but with constant integral) making the integral of the limit strictly SMALLER than the limit of the integrals. DCT's domination hypothesis ($|f_n|\le g$ for some fixed INTEGRABLE $g$) is precisely the extra condition that RULES OUT this escaping-mass failure — bounding every $f_n$ by a single integrable function prevents mass from concentrating or escaping without bound, restoring full equality $\int f_n\to\int f$.

**MCT, Fatou, and DCT form a logical chain, not three independent facts (orientation level)**: the standard development of measure theory proves these results in a specific ORDER, each building on the previous: MCT is typically proved FIRST (directly from the definition of the Lebesgue integral as a supremum over simple functions); Fatou's Lemma is then derived FROM MCT (by writing $\liminf f_n$ as an increasing limit of a related sequence and applying MCT); and DCT is then derived FROM Fatou's Lemma (applying it twice, to $g+f_n$ and $g-f_n$). Full derivation of this chain is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — MCT succeeding where mere pointwise convergence can fail, breaking MC-1)**: let $f_n(x)=\min(x,n)$ on $[0,\infty)$ with Lebesgue measure — clearly $0\le f_n\uparrow f$ where $f(x)=x$ (each $f_n$ is a non-negative, increasing-in-$n$ truncation converging up to the identity function). MCT guarantees $\int_0^\infty f_n\,d\mu\to\int_0^\infty f\,d\mu$ — and indeed both sides are $+\infty$ here, consistently. Contrast with `math.real.uniform-convergence`'s own cautionary examples of MERE pointwise (non-monotone, non-uniform) convergence failing to preserve limit-integral interchange — MCT's monotonicity hypothesis is precisely the extra structure that makes the interchange provably valid here, where uniformity alone would not have been guaranteed.

**Example 2 (LO2 — Fatou's strict inequality and DCT's domination fix, breaking MC-2)**: let $f_n(x)=n\cdot\mathbb{1}_{(0,1/n)}(x)$ on $[0,1]$ (a tall, thin spike of height $n$ on an interval of width $1/n$, so $\int_0^1f_n\,d\mu=n\cdot\frac{1}{n}=1$ for every $n$). Pointwise, $f_n(x)\to0$ for every FIXED $x\in(0,1]$ (eventually $x$ falls outside the shrinking spike), so $\liminf f_n=0$ and $\int\liminf f_n=\int0\,d\mu=0$. But $\liminf\int f_n=\liminf(1)=1$. Fatou's Lemma's inequality $0\le1$ HOLDS, but is STRICT — genuine information is lost, precisely because the spike's "mass" (constant integral $1$) escapes to a vanishing set rather than surviving in the limit. This sequence FAILS to satisfy DCT's domination hypothesis (no single integrable $g$ bounds every $f_n$, since $f_n$'s peak height $n\to\infty$) — confirming DCT's extra condition is exactly what would be needed (and is absent here) to upgrade Fatou's inequality to full equality.

**Example 3 (LO3, orientation level — the logical chain MCT→Fatou→DCT, breaking MC-3)**: given a sequence $f_n\ge0$ with $f_n\to f$ a.e., Fatou's Lemma is typically PROVED by defining $g_k=\inf_{n\ge k}f_n$ (an increasing sequence in $k$, converging to $\liminf f_n$) and applying MCT DIRECTLY to $g_k$ — Fatou's inequality falls out as a consequence of MCT applied to this auxiliary monotone sequence, not as an independently-proved fact. Similarly, DCT is typically proved by applying Fatou's Lemma to BOTH $g+f_n\ge0$ and $g-f_n\ge0$ (using the domination $|f_n|\le g$ to ensure non-negativity) and combining the two resulting inequalities. This demonstrates the three results are a DEPENDENCY CHAIN — MCT is foundational, and Fatou and DCT are its logical consequences under progressively different hypotheses.

## Component 5 — Teaching Actions

### Teaching Action A01 — MCT Identifies a Genuinely Different Sufficient Condition From Uniform Convergence (Primitive P11: Representation Shift)

State: "you already know from `math.real.uniform-convergence` that mere pointwise convergence can fail to preserve limits under an operation like integration — MCT identifies a COMPLETELY DIFFERENT sufficient condition, monotone increase, that guarantees the Lebesgue-integral interchange works, even without uniformity." Walk Example 1's monotone-truncation verification.

- **MC-1 hook**: ask "does swapping $\lim$ and $\int$ always work automatically for the Lebesgue integral, without any special hypothesis like monotonicity?" — a "yes" answer reveals MC-1 (missing that MCT's monotone-increase hypothesis is a specific, necessary sufficient condition, not an automatic guarantee).

### Teaching Action A02 — Fatou's Inequality Can Be Strict — Mass Genuinely Escapes (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the spike sequence gives $\int\liminf f_n=0$ but $\liminf\int f_n=1$ — a STRICT inequality, with the "mass" of $1$ genuinely lost in the limit. State: "Fatou's Lemma only promises an inequality, and this example shows it can be STRICT — real information about the integral can be lost when mass escapes, which is exactly the failure DCT's domination hypothesis is designed to prevent."

- **MC-2 hook**: ask "does Fatou's Lemma guarantee $\int\liminf f_n=\liminf\int f_n$ (equality), the same way MCT does?" — a "yes" answer reveals MC-2 (missing that Fatou's Lemma gives only an inequality, which can be genuinely strict without an extra condition like domination).

### Teaching Action A03 — These Are One Dependency Chain, Not Three Separate Facts (Primitive P06: Contrast Pair)

Contrast a hypothetical view of "MCT, Fatou, and DCT as three independent theorems to memorize separately" against Example 3's derivation showing Fatou following directly from MCT (via the auxiliary sequence $g_k$) and DCT following directly from Fatou. State: "these aren't three unrelated facts — they're one logical chain, each building on the one before it, with MCT as the genuine foundation."

- **MC-3 hook**: ask "are MCT, Fatou's Lemma, and the Dominated Convergence Theorem three independent results, each requiring its own separate, unrelated proof?" — a "yes" answer reveals MC-3 (missing that they form a logical chain — Fatou derived from MCT, DCT derived from Fatou).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. State MCT, identifying precisely which hypothesis (monotone increase, non-negativity) makes it applicable.
  2. Verify $f_n(x)=x^n\cdot\mathbb{1}_{[0,1)}(x)$ (decreasing? increasing? check first) does or does not satisfy MCT's hypotheses, and if it does, state what the theorem then guarantees.
  3. Using the spike-sequence idea from Example 2 (perhaps with different heights/widths), construct a sequence where Fatou's inequality is strict, and explain why DCT's domination hypothesis fails for it.
  4. Explain, in one or two sentences, the logical dependency relationship among MCT, Fatou's Lemma, and DCT.
- **P76 (Transfer Probe, mode = cross-link probe engaging `math.real.uniform-convergence`)**: "Consider $f_n(x)=\dfrac{\sin(nx)}{n}$ on $[0,\pi]$, which converges UNIFORMLY to $f(x)=0$ (by `math.real.uniform-convergence`'s own uniform-convergence criterion, since $\sup_x|f_n(x)-0|=1/n\to0$). (a) Explain why `math.real.uniform-convergence` already guarantees $\int_0^\pi f_n\,dx\to\int_0^\pi f\,dx=0$ for this Riemann-integrable case, without needing MCT, Fatou, or DCT at all. (b) Now suppose a DIFFERENT sequence $g_n$ converges only POINTWISE (not uniformly) to some limit $g$, but happens to be monotone increasing and non-negative — explain which of the three Lebesgue convergence theorems applies, and why uniform convergence is not required here. (c) Contrast these two scenarios: when does uniform convergence alone suffice, and when do you instead need one of MCT/Fatou/DCT's own distinct hypotheses?"
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 3/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LIM-INT-INTERCHANGE-ASSUMED-AUTOMATIC | Believing swapping $\lim$ and $\int$ always works automatically for the Lebesgue integral, missing that MCT's monotone-increase hypothesis is a specific necessary condition | Foundational |
| MC-2 | FATOU-ASSUMED-EQUALITY | Believing Fatou's Lemma guarantees equality $\int\liminf f_n=\liminf\int f_n$, missing that it gives only an inequality, which can be strict | High |
| MC-3 | THREE-THEOREMS-ASSUMED-INDEPENDENT | Believing MCT, Fatou's Lemma, and DCT are three independent results each needing separate unrelated proofs, missing that they form one logical dependency chain | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Lim-Int Interchange Assumed Automatic") → P41 (detect: ask whether swapping $\lim$ and $\int$ always works automatically) → P64 (conceptual shift: re-walk Example 1's monotone-truncation verification, re-anchoring on "MCT's monotone-increase hypothesis is a specific, necessary sufficient condition").
- **B02 (targets MC-2)**: P27 (name it: "Fatou Assumed Equality") → P41 (detect: ask whether Fatou's Lemma guarantees equality) → P64 (conceptual shift: re-walk Example 2's strict-inequality spike-sequence demonstration, re-anchoring on "Fatou's Lemma gives only an inequality, which can be strict").
- **B03 (targets MC-3)**: P27 (name it: "Three Theorems Assumed Independent") → P41 (detect: ask whether MCT, Fatou, and DCT are three independent results) → P64 (conceptual shift: re-walk Example 3's dependency-chain derivation, re-anchoring on "one logical chain, MCT foundational, Fatou and DCT derived from it").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.meas.lebesgue-integral` ($\int f\,d\mu$ as a supremum over simple functions, the integral this concept's three theorems govern the limiting behavior of).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.real.uniform-convergence`, checked via `ls docs/curriculum/blueprints/` and confirmed ALREADY authored. $P76_{mode}=$ **cross-link probe**, engaging `math.real.uniform-convergence`'s own uniform-convergence criterion directly in Component 3's contrast and the P76 transfer probe.

## Component 8 — Teaching Notes

- estimated_hours = 8 with an expert/analyze tag and a notably reduced mastery_threshold (0.6, MAMR 3/5) supports the "3 TAs + gate" tier at genuinely demanding scope, with LO1 and LO2 given full concrete verification (the monotone-truncation and strict-Fatou-inequality examples) and LO3 kept orientation-level, appropriately surveying the dependency chain without deriving each theorem's proof in full rigor.
- **Division of labor**: `math.meas.lebesgue-integral` owns the integral's own definition; `math.real.uniform-convergence` owns the Riemann-integral-era limit-interchange criterion via uniform convergence. This concept owns the THREE Lebesgue-specific convergence theorems and their logical relationship — deliberately contrasting `math.real.uniform-convergence`'s own criterion against these three in the P76 transfer probe, so learners see uniform convergence as ONE sufficient condition among several, not the only tool available.
- Example 2's deliberate choice of the classic "escaping spike" sequence ($n\cdot\mathbb{1}_{(0,1/n)}$) was chosen because it is the standard, most transparent counterexample demonstrating Fatou's inequality can be strict while simultaneously failing DCT's domination hypothesis, connecting both misconceptions (MC-2 and the domination-failure point) in one worked example.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (none listed) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.real.uniform-convergence` confirmed authored → cross-link probe) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (cross-link probe) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.6×5⌉=3) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already has the Lebesgue integral; the three theorems introduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
