# Teaching Blueprint: Moment Generating Function (`math.prob.mgf`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.prob.mgf` |
| name | Moment Generating Function |
| domain | Probability |
| difficulty | expert |
| bloom | apply |
| mastery_threshold | 0.8 → MAMR = ⌈0.8×5⌉ = 4/5 |
| estimated_hours | 5 |
| requires | `math.prob.moments`, `math.calc.power-series` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — expert learner already knows the MGF's DEFINITION and derivative-extraction idea from `math.prob.moments`'s own orientation-level preview; the task is full computational depth plus the two genuinely powerful further properties |
| description (KG) | $M_X(t)=E[e^{tX}]$ when finite in a neighborhood of 0. $k$-th derivative at 0 gives $E[X^k]$. Uniquely determines the distribution. Sum of independent RVs: $M_{X+Y}=M_X\cdot M_Y$. |

## Component 1 — Learning Objectives

- LO1 (cross-link objective): Recognize this concept as the FULL development of the MGF `math.prob.moments`'s own orientation-level preview already introduced ($M(t)=E[e^{tX}]$, $M^{(k)}(0)=E[X^k]$) — not a new definition — and correctly COMPUTE the MGF explicitly for a specific standard distribution by evaluating the defining expectation directly, then extract its first two moments via differentiation to verify the already-previewed derivative rule concretely.
- LO2: Use `math.calc.power-series`'s own machinery to show WHY differentiating the MGF at $t=0$ extracts moments — expanding $e^{tX}=\sum_{k=0}^\infty\frac{(tX)^k}{k!}$ as a power series in $t$ and taking expectations term-by-term gives $M_X(t)=\sum_{k=0}^\infty\frac{E[X^k]}{k!}t^k$, directly identifying $E[X^k]$ as (up to a factorial) the $k$th TAYLOR COEFFICIENT of $M_X$ at $t=0$ — connecting the derivative-extraction rule to `math.calc.power-series`'s own coefficient-extraction machinery rather than treating it as a separate, unmotivated trick.
- LO3: Apply the two genuinely powerful further properties: the MGF UNIQUELY determines a distribution (two random variables with the same MGF on a neighborhood of 0 have the same distribution — stated without proof), and for INDEPENDENT random variables, $M_{X+Y}(t)=M_X(t)\cdot M_Y(t)$ — correctly using the product property to identify the distribution of a sum of independent standard random variables by recognizing the resulting MGF as belonging to a known distribution.

## Component 2 — Prerequisite Check

Assumes mastery of `math.prob.moments` ($k$th moment $E[X^k]$; $k$th central moment $E[(X-\mu)^k]$; the MGF and kurtosis previewed at orientation level, deferred to this concept for full development) and `math.calc.power-series` (representing a function as $\sum c_n(x-a)^n$, and extracting coefficients via derivatives).

## Component 3 — Core Explanation

**This is the full development of `math.prob.moments`'s own preview, not a new definition**: `math.prob.moments` already introduces $M(t)=E[e^{tX}]$ and states $M^{(k)}(0)=E[X^k]$ at orientation level, explicitly deferring full development here. This concept does not redefine the MGF — it computes it explicitly for real distributions, derives WHY the derivative rule holds (rather than merely stating it), and develops the two properties (uniqueness, product rule for sums) that make the MGF genuinely useful as a computational tool, not just an elegant repackaging.

**Power series expansion explains the derivative-extraction rule — connecting to `math.calc.power-series`'s own machinery**: expanding $e^{tX}$ as a power series in $t$ (treating $X$ as fixed): $e^{tX}=\sum_{k=0}^\infty\frac{(tX)^k}{k!}=\sum_{k=0}^\infty\frac{X^k}{k!}t^k$. Taking expectations term-by-term (valid when the MGF is finite in a neighborhood of $0$, the concept's own standing hypothesis): $M_X(t)=E[e^{tX}]=\sum_{k=0}^\infty\frac{E[X^k]}{k!}t^k$ — a power series in $t$ whose $k$th COEFFICIENT is $\frac{E[X^k]}{k!}$. By `math.calc.power-series`'s own coefficient-extraction fact (the $k$th Taylor coefficient of a function equals $\frac{f^{(k)}(0)}{k!}$), matching coefficients gives $\frac{M_X^{(k)}(0)}{k!}=\frac{E[X^k]}{k!}$, i.e., $M_X^{(k)}(0)=E[X^k]$ — EXACTLY the derivative rule `math.prob.moments` previewed, now derived from `math.calc.power-series`'s own machinery rather than stated as an unmotivated fact.

**Uniqueness and the product rule for sums — the MGF's genuine computational power**: two distinct properties make the MGF far more than a notational convenience. FIRST, the MGF uniquely determines the distribution: if $M_X(t)=M_Y(t)$ for all $t$ in a neighborhood of $0$, then $X$ and $Y$ have the SAME distribution (a deep fact, stated without proof here) — meaning "recognize the MGF" is equivalent to "identify the distribution." SECOND, for INDEPENDENT $X,Y$: $M_{X+Y}(t)=E[e^{t(X+Y)}]=E[e^{tX}e^{tY}]=E[e^{tX}]E[e^{tY}]=M_X(t)M_Y(t)$ (the middle step using independence to split the expectation of a product into a product of expectations) — the MGF of a SUM of independent random variables is simply the PRODUCT of their individual MGFs, turning a potentially difficult convolution-based distribution computation into simple algebraic multiplication.

## Component 4 — Worked Examples

**Example 1 (LO1 — computing the MGF explicitly and verifying the derivative rule, breaking MC-1)**: for $X\sim\text{Exponential}(\lambda)$ (density $\lambda e^{-\lambda x}$ for $x\ge0$): $M_X(t)=E[e^{tX}]=\int_0^\infty e^{tx}\lambda e^{-\lambda x}\,dx=\lambda\int_0^\infty e^{-(\lambda-t)x}\,dx=\frac{\lambda}{\lambda-t}$ (finite for $t<\lambda$, confirming finiteness in a neighborhood of $t=0$). Differentiating: $M_X'(t)=\frac{\lambda}{(\lambda-t)^2}$, so $M_X'(0)=\frac{\lambda}{\lambda^2}=\frac1\lambda$ — matching the ALREADY-KNOWN $E[X]=\frac1\lambda$ for the exponential distribution EXACTLY, concretely verifying `math.prob.moments`'s previewed derivative rule on a genuine computation rather than an abstract statement.

**Example 2 (LO2 — the power-series derivation applied concretely, breaking MC-2)**: continuing Example 1's $M_X(t)=\frac{\lambda}{\lambda-t}=\frac1{1-t/\lambda}$: recognizing this as a geometric series (a specific instance of `math.calc.power-series`'s own machinery), $\frac1{1-t/\lambda}=\sum_{k=0}^\infty(t/\lambda)^k=\sum_{k=0}^\infty\frac{t^k}{\lambda^k}$ for $|t|<\lambda$. Matching this against the general form $M_X(t)=\sum_{k=0}^\infty\frac{E[X^k]}{k!}t^k$ derived in Component 3: the coefficient of $t^k$ is $\frac1{\lambda^k}=\frac{E[X^k]}{k!}$, giving $E[X^k]=\frac{k!}{\lambda^k}$ — a general moment formula for the exponential distribution, obtained directly from `math.calc.power-series`'s own coefficient-matching technique, concretely confirming LO2's derivation mechanism rather than merely asserting it.

**Example 3 (LO3 — the product rule identifying a sum's distribution, breaking MC-3)**: for independent $X_1,X_2,\ldots,X_n$, each $\sim\text{Exponential}(\lambda)$ (using Example 1's MGF $M_{X_i}(t)=\frac{\lambda}{\lambda-t}$ for each): by the product rule, $M_{X_1+\cdots+X_n}(t)=\prod_{i=1}^nM_{X_i}(t)=\left(\frac{\lambda}{\lambda-t}\right)^n$. Recognizing this EXACT expression as the already-known MGF of a $\text{Gamma}(n,\lambda)$ distribution (cited as a standard fact), and invoking the UNIQUENESS property, concludes $X_1+\cdots+X_n\sim\text{Gamma}(n,\lambda)$ — identifying the SUM's distribution ENTIRELY through MGF algebra (multiplying $n$ copies of a known MGF and recognizing the result), without any direct convolution computation of the sum's density.

## Component 5 — Teaching Actions

### Teaching Action A01 — This Concept Develops `math.prob.moments`'s Own Preview in Full — Compute, Don't Just Restate (Primitive P11: Representation Shift)

State: "you already know the MGF's definition and the derivative rule as a PREVIEW from `math.prob.moments` — this concept's job is computing it explicitly for real distributions and verifying that rule concretely, not re-learning the definition from scratch." Walk Example 1's full explicit computation and verification.

- **MC-1 hook**: ask "is this concept introducing a new definition of the moment generating function, or fully developing (with explicit computation) the definition already previewed in `math.prob.moments`?" — a "new definition" answer reveals MC-1 (missing that the definition itself is already known; the new content is computational depth).

### Teaching Action A02 — The Derivative Rule Comes From `math.calc.power-series`'s Own Coefficient-Matching, Not an Isolated Fact (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: expanding $M_X(t)$ as a power series and matching its coefficients against $\sum\frac{E[X^k]}{k!}t^k$ DERIVES the moment formula for the exponential distribution, using EXACTLY `math.calc.power-series`'s own Taylor-coefficient-extraction machinery. State: "the rule 'differentiate the MGF at 0 to get moments' isn't a separate probability fact to memorize — it's `math.calc.power-series`'s own coefficient-extraction idea, applied to this specific power series."

- **MC-2 hook**: ask "is the MGF's derivative-extraction rule an independent probability fact, or does it follow directly from `math.calc.power-series`'s own coefficient-extraction machinery applied to the MGF's power-series expansion?" — an "independent fact" answer reveals MC-2 (missing the direct derivation connecting the two).

### Teaching Action A03 — MGF Algebra Can Identify a Sum's Distribution Without Convolution (Primitive P06: Contrast Pair)

Contrast the LABORIOUS direct route (computing the density of $X_1+\cdots+X_n$ via repeated convolution integrals) against Example 3's MGF-algebra route (multiplying $n$ known MGFs and recognizing the resulting expression). State: "identifying a sum of independent random variables' distribution doesn't require grinding through convolution integrals — multiply the individual MGFs, recognize the resulting expression as belonging to a known distribution, and uniqueness guarantees that recognition is correct."

- **MC-3 hook**: ask "to find the distribution of a sum of independent random variables, is convolving their densities directly the only reliable method, or can MGF algebra (multiplying then recognizing) accomplish the same thing?" — a "convolution is the only reliable method" answer reveals MC-3 (missing the MGF product-and-recognize shortcut).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Compute $M_X(t)$ explicitly for $X\sim\text{Bernoulli}(p)$ (taking value 1 with probability $p$, 0 with probability $1-p$).
  2. Differentiate your answer to problem 1 to verify $M_X'(0)=E[X]=p$.
  3. Using `math.calc.power-series`'s own coefficient-extraction idea, explain in your own words why differentiating the MGF at $t=0$ extracts moments.
  4. For independent $X_1\sim\text{Bernoulli}(p)$, $X_2\sim\text{Bernoulli}(p)$, use the product rule and problem 1's MGF to identify the distribution of $X_1+X_2$.
- **P76 (Transfer Probe, mode = independence — no cross-link target listed in the KG for this concept)**: "A reliability engineer models the total lifetime of a system built from $n$ independent, identical components, each with lifetime $X_i\sim\text{Exponential}(\lambda)$ (the system fails when the LAST component fails, so total operating time is $X_1+\cdots+X_n$... actually, suppose instead the engineer wants the total COMBINED usage time across all $n$ components, i.e., literally $X_1+\cdots+X_n$). (a) Using this lesson's product rule, write the MGF of the total combined usage time in terms of the individual components' MGF. (b) Using Example 3's identification, state what distribution the total combined usage time follows, and explain how the uniqueness property justifies this conclusion rather than merely suggesting it. (c) Explain why this MGF-based approach is preferable to attempting a direct convolution of $n$ exponential densities."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 4/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | MGF-ASSUMED-NEW-DEFINITION | Believing this concept introduces a new definition of the MGF, missing that it fully develops (via explicit computation) the definition already previewed in `math.prob.moments` | Foundational |
| MC-2 | DERIVATIVE-RULE-ASSUMED-INDEPENDENT-FACT | Believing the MGF's derivative-extraction rule is an independent probability fact, missing that it follows directly from `math.calc.power-series`'s own coefficient-extraction machinery applied to the MGF's power-series expansion | High |
| MC-3 | CONVOLUTION-ASSUMED-ONLY-RELIABLE-METHOD | Believing direct convolution is the only reliable way to find a sum of independent random variables' distribution, missing the MGF product-and-recognize shortcut | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "MGF Assumed New Definition") → P41 (detect: ask whether this concept introduces a new MGF definition) → P64 (conceptual shift: re-walk Example 1's explicit computation, citing `math.prob.moments`'s own preview).
- **B02 (targets MC-2)**: P27 (name it: "Derivative Rule Assumed Independent Fact") → P41 (detect: ask whether the derivative rule is independent or derived from power-series coefficient matching) → P64 (conceptual shift: re-walk Example 2's direct coefficient-matching derivation).
- **B03 (targets MC-3)**: P27 (name it: "Convolution Assumed Only Reliable Method") → P41 (detect: ask whether convolution is the only reliable method for a sum's distribution) → P64 (conceptual shift: re-walk Example 3's MGF-product identification).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.prob.moments` (the $k$th moment definition and the MGF's own orientation-level preview, fully developed here) and `math.calc.power-series` (the coefficient-extraction machinery this concept's derivative-rule derivation directly reuses).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists none for this concept. $P76_{mode}=$ **independence** (no cross-link target to check).

## Component 8 — Teaching Notes

- estimated_hours = 5 with an expert/apply tag supports the "3 TAs + gate" tier, with LO1 explicitly building on (not repeating) `math.prob.moments`'s own preview, LO2 given full derivation depth connecting to `math.calc.power-series`'s own machinery, and LO3 demonstrating the MGF's genuine computational power via a full distribution-identification example.
- **Division of labor**: `math.prob.moments` already owns the $k$th moment/central moment definitions and previews the MGF's definition and derivative rule at orientation level, explicitly deferring full development here (verified by grep — its own Unlocks section states "math.prob.mgf (will fully develop the moment generating function previewed at orientation level..."); `math.calc.power-series` already owns the general power-series/Taylor-coefficient machinery this concept's derivation directly reuses. This concept owns the explicit MGF computation for real distributions, the derivation (not mere statement) of the derivative rule via power-series coefficient matching, and the two genuinely new properties (uniqueness, product rule for independent sums).
- Example 1 and Example 3's deliberate reuse of the SAME exponential distribution (rather than switching distributions between examples) was chosen so the individual MGF computed in Example 1 could be directly reused as a building block in Example 3's sum-of-$n$-independent-variables computation, making the connection between single-variable and sum computations concrete rather than requiring the student to track two unrelated distributions.

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
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.8×5⌉=4) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already has the MGF's definition and derivative-idea from the orientation-level preview; task is full depth) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
