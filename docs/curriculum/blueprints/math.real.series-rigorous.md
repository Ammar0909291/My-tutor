# Teaching Blueprint: Series (Rigorous) (`math.real.series-rigorous`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.real.series-rigorous` |
| name | Series (Rigorous) |
| domain | Real Analysis |
| difficulty | expert |
| bloom | analyze |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 6 |
| requires | `math.real.convergence-sequences`, `math.seq.series` |
| unlocks | `math.real.absolute-convergence` |
| cross_links | `math.seq.comparison-test` |
| CPA_entry_stage | A (Abstract) — expert learner already fluent in rigorous sequence convergence; series convergence is reduced directly to it |
| description (KG) | Rigorous treatment: ∑aₙ converges iff partial sums form a Cauchy sequence. Absolute convergence (∑\|aₙ\|<∞) implies convergence and rearrangement invariance. Conditional convergence is rearrangement-sensitive (Riemann rearrangement theorem). |

## Component 1 — Learning Objectives

- LO1: State the **Cauchy criterion for series**: $\sum a_n$ converges if and only if its partial sums $\{S_n\}$ form a Cauchy sequence — $\forall\varepsilon>0\ \exists N: m>n>N\Rightarrow|S_m-S_n|=\left|\sum_{k=n+1}^m a_k\right|<\varepsilon$ — recognizing this introduces NO new convergence notion, but reduces series convergence entirely to the already-mastered Cauchy-sequence machinery applied to the partial-sum sequence.
- LO2: Prove that **absolute convergence** ($\sum|a_n|<\infty$) implies (ordinary) convergence, via the Cauchy criterion ($|S_m-S_n|\le\sum_{k=n+1}^m|a_k|$, so a Cauchy absolute-partial-sum sequence forces the actual partial sums to be Cauchy too) — and recognize this is a SUFFICIENT, not necessary, condition: convergent series need not be absolutely convergent.
- LO3: Distinguish absolute convergence's **rearrangement-invariance** (the sum is unchanged by any reordering of terms) from conditional convergence's **rearrangement-sensitivity** (the Riemann Rearrangement Theorem: a conditionally convergent series can be reordered to converge to ANY target value, or to diverge) — recognizing this as a genuine failure of the finite-sum intuition that reordering never changes a sum.

## Component 2 — Prerequisite Check

Assumes mastery of `math.real.convergence-sequences` (the rigorous $\varepsilon$-$N$ convergence definition and the Cauchy $\Leftrightarrow$ convergent equivalence in $\mathbb{R}$, established via `math.real.cauchy-sequence`) and `math.seq.series` (partial sums $S_n=a_1+\cdots+a_n$; a series converges to $S$ if $\lim_{n\to\infty}S_n=S$).

## Component 3 — Core Explanation

**Series convergence IS sequence convergence of the partial sums — no new machinery**: `math.seq.series` already defined a series' convergence as the limit of its partial-sum sequence $\{S_n\}$. The Cauchy criterion simply restates this using the already-proven fact (Cauchy $\Leftrightarrow$ convergent in $\mathbb{R}$) applied to $\{S_n\}$ specifically: $\sum a_n$ converges exactly when $\{S_n\}$ is Cauchy, i.e., $\forall\varepsilon>0\ \exists N$ such that $m>n>N$ forces $|S_m-S_n|<\varepsilon$. Since $S_m-S_n=a_{n+1}+a_{n+2}+\cdots+a_m$, this says: the TAIL sums (sums of consecutive blocks of terms, arbitrarily far out) must eventually become arbitrarily small — a direct, checkable condition requiring no separate theory beyond ordinary Cauchy sequences.

**Absolute convergence is sufficient for convergence, via a direct triangle-inequality bound**: if $\sum|a_n|$ converges, its own partial sums are Cauchy, so for $m>n>N$: $\left|\sum_{k=n+1}^m a_k\right|\le\sum_{k=n+1}^m|a_k|<\varepsilon$ — the ACTUAL partial sums inherit the Cauchy property directly from the absolute-value partial sums, via the triangle inequality. So $\sum a_n$ converges. This argument shows absolute convergence is a sufficient condition for convergence — but NOT a necessary one, since a series can have Cauchy partial sums $\{S_n\}$ even while its absolute-value partial sums are not Cauchy (grow without bound).

**Rearrangement: invariant for absolute convergence, dangerously sensitive for conditional convergence**: for a FINITE sum, reordering the terms never changes the total — an intuition that carries over safely to ABSOLUTELY convergent series (their sum is provably unaffected by any rearrangement). But a series that converges WITHOUT converging absolutely (conditionally convergent) can be rearranged — by the Riemann Rearrangement Theorem — to converge to ANY chosen real number, or to diverge entirely, simply by reordering which terms appear when. The finite-sum intuition genuinely fails for conditionally convergent series.

## Component 4 — Worked Examples

**Example 1 (LO1 — the Cauchy criterion applied directly, reusing already-mastered machinery, breaking MC-1)**: For $\sum_{n=1}^\infty\frac1{2^n}$ (geometric, ratio $\frac12$), the partial sums are $S_n=1-\frac1{2^n}$. For $m>n$: $|S_m-S_n|=\left|\frac1{2^n}-\frac1{2^m}\right|<\frac1{2^n}$. Given $\varepsilon>0$, choose $N$ with $\frac1{2^N}<\varepsilon$ (i.e. $N=\lceil\log_2(1/\varepsilon)\rceil$); then for $m>n>N$: $|S_m-S_n|<\frac1{2^n}<\frac1{2^N}<\varepsilon$ — confirming $\{S_n\}$ is Cauchy directly from the definition, using EXACTLY the same $\varepsilon$-$N$ reasoning already mastered for ordinary sequences, with no new convergence notion invoked at any step.

**Example 2 (LO2 — convergent but NOT absolutely convergent, breaking MC-2)**: The alternating harmonic series $\sum_{n=1}^\infty\frac{(-1)^{n+1}}n=1-\frac12+\frac13-\frac14+\cdots$ CONVERGES (to $\ln2$, by the alternating series test) — but $\sum_{n=1}^\infty\left|\frac{(-1)^{n+1}}n\right|=\sum_{n=1}^\infty\frac1n$, the harmonic series, DIVERGES. This series is convergent but NOT absolutely convergent — a direct counterexample to "convergence implies absolute convergence." (The other direction, proven above — absolute convergence implies convergence — genuinely does hold; only this converse direction fails.)

**Example 3 (LO3 — rearrangement sensitivity, breaking MC-3)**: Take the SAME alternating harmonic series from Example 2 (conditionally convergent, sum $\ln2\approx0.693$). Because its positive terms ($1+\frac13+\frac15+\cdots$) and negative terms ($\frac12+\frac14+\frac16+\cdots$) EACH diverge to $+\infty$ individually (a fact specific to conditional, non-absolute convergence), the Riemann Rearrangement Theorem guarantees the series can be reordered — taking just enough positive terms to exceed a target value like $1$, then just enough negative terms to drop below it, repeating forever — to converge to $1$ instead of $\ln2$, or to any other target, or even to diverge. Contrast: an ABSOLUTELY convergent series, such as $\sum\frac1{2^n}$ from Example 1, has its sum $1$ UNCHANGED by any reordering whatsoever — the finite-sum intuition ("reordering never changes a sum") survives for absolute convergence but genuinely fails for conditional convergence.

## Component 5 — Teaching Actions

### Teaching Action A01 — Series Convergence Is Just Cauchy-Sequence Convergence of Partial Sums (Primitive P11: Representation Shift)

State: "there is no separate 'series convergence' theory — a series converges exactly when its partial-sum SEQUENCE is Cauchy, the identical $\varepsilon$-$N$ machinery you already mastered, applied to one specific sequence." Work Example 1's direct $\varepsilon$-$N$ verification for $\sum1/2^n$.

- **MC-1 hook**: ask "is the Cauchy criterion for series a genuinely new type of convergence, distinct from ordinary sequence convergence?" — a "yes" answer reveals MC-1 (missing that series convergence is literally sequence convergence applied to the partial sums, using the already-established Cauchy $\Leftrightarrow$ convergent equivalence).

### Teaching Action A02 — Absolute Convergence Is Sufficient, Not Necessary (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: the alternating harmonic series converges, yet its absolute-value series (the harmonic series) diverges. State: "absolute convergence always guarantees convergence — but convergence does NOT require absolute convergence; a series can converge purely through cancellation between positive and negative terms."

- **MC-2 hook**: ask "does a convergent series always converge absolutely as well?" — a "yes" answer reveals MC-2 (missing that conditionally convergent series exist, converging without converging absolutely).

### Teaching Action A03 — Reordering Can Change a Conditionally Convergent Sum (Primitive P06: Contrast Pair)

Contrast Example 3's two cases: the alternating harmonic series (conditionally convergent), rearrangeable to sum to ANY target, against $\sum1/2^n$ (absolutely convergent), whose sum stays fixed at $1$ under every rearrangement. State: "the intuition that 'reordering a sum never changes it' is true for finite sums and for absolutely convergent series — but it fails completely for conditionally convergent series."

- **MC-3 hook**: ask "if a series converges, can its terms always be reordered without changing the sum, just as with a finite sum?" — a "yes" answer reveals MC-3 (assuming rearrangement-invariance holds universally, missing the conditional-convergence exception governed by the Riemann Rearrangement Theorem).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Using the Cauchy criterion directly, find $N$ (in terms of $\varepsilon$) confirming $\{S_n\}$ is Cauchy for $\sum_{n=1}^\infty\frac1{3^n}$.
  2. Determine whether $\sum_{n=1}^\infty\frac{(-1)^{n+1}}{n^2}$ is absolutely convergent, conditionally convergent, or divergent, justifying with both the series and its absolute-value series.
  3. Explain why the argument "$\sum|a_n|<\infty$ implies $\sum a_n$ converges" cannot be reversed to "$\sum a_n$ converges implies $\sum|a_n|<\infty$," using a specific counterexample.
  4. Explain, in your own words, why a finite sum's reordering-invariance does not automatically transfer to every convergent infinite series.
- **P76 (Transfer Probe, mode = independence)**: "A physicist computing a perturbation series finds it converges to a value $V$, but later discovers the series is only CONDITIONALLY convergent (its absolute-value series diverges). (a) Explain, using this lesson's Cauchy-criterion reasoning, why conditional convergence alone is still enough to guarantee the original ordering of terms produces a well-defined limit $V$. (b) A collaborator reorders the same infinite list of terms (perhaps for computational convenience) and obtains a DIFFERENT numerical value $V'\ne V$. Using the Riemann Rearrangement Theorem, explain how this is possible even though no term was changed, added, or removed — only reordered. (c) The collaborator argues 'since both orderings use the exact same terms, summing to different values must indicate a calculation error somewhere.' Explain specifically why this argument is incorrect for a conditionally (but not absolutely) convergent series."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SERIES-CONVERGENCE-AS-NEW-NOTION | Believing the Cauchy criterion for series introduces a genuinely new type of convergence, missing that it is ordinary Cauchy-sequence convergence applied directly to the partial sums | Foundational |
| MC-2 | CONVERGENCE-ASSUMED-TO-IMPLY-ABSOLUTE-CONVERGENCE | Believing every convergent series must also be absolutely convergent, missing that conditionally convergent series exist (converging through cancellation without absolute convergence) | Foundational |
| MC-3 | REARRANGEMENT-ASSUMED-UNIVERSALLY-INVARIANT | Believing every convergent series' sum is unaffected by reordering its terms (as with a finite sum), missing that this fails for conditionally convergent series per the Riemann Rearrangement Theorem | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Series Convergence as New Notion") → P41 (detect: ask a student whether the Cauchy criterion for series is a different kind of convergence from ordinary sequence convergence, checking for "yes") → P64 (conceptual shift: re-walk Example 1's direct $\varepsilon$-$N$ verification, re-anchoring on "a series converges exactly when its partial-sum sequence is Cauchy — the identical machinery, one specific sequence").
- **B02 (targets MC-2)**: P27 (name it: "Convergence Assumed to Imply Absolute Convergence") → P41 (detect: ask a student whether every convergent series is automatically absolutely convergent, checking for "yes") → P64 (conceptual shift: re-walk Example 2's alternating harmonic series, convergent yet not absolutely convergent, re-anchoring on "absolute convergence is sufficient, never necessary, for ordinary convergence").
- **B03 (targets MC-3)**: P27 (name it: "Rearrangement Assumed Universally Invariant") → P41 (detect: ask a student whether reordering a convergent series' terms can ever change its sum, checking for "no, never") → P64 (conceptual shift: re-walk Example 3's rearrangement of the alternating harmonic series to a different target sum, re-anchoring on "rearrangement-invariance holds for absolute convergence, but fails for conditional convergence").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.real.convergence-sequences` (the rigorous $\varepsilon$-$N$ definition and the Cauchy $\Leftrightarrow$ convergent equivalence this concept applies directly to partial sums), `math.seq.series` (partial sums and the basic convergence-as-limit-of-partial-sums definition).
- **Unlocks**: `math.real.absolute-convergence` (extends this concept's LO2/LO3 distinction into a full theory of absolute vs. conditional convergence and further convergence tests).
- **Cross-link**: KG lists `math.seq.comparison-test` as a cross-link — **not yet authored** (checked via `ls docs/curriculum/blueprints/` before setting P76_mode). $P76_{mode}=$ **independence**; a future revision may add a genuine cross-link transfer probe once that entry exists, connecting the comparison test's term-by-term bounding technique to this concept's absolute-convergence sufficiency argument.

## Component 8 — Teaching Notes

- estimated_hours = 6 with an expert/analyze tag places this at a "3 TAs + gate" tier; the analyze-level bloom (dissecting WHY absolute convergence suffices, and WHY rearrangement fails only conditionally) is reflected throughout, rather than merely stating the three headline facts.
- **Division of labor**: `math.real.cauchy-sequence` (referenced, not a formal prerequisite here) owns the general Cauchy-sequence definition and the Cauchy $\Leftrightarrow$ convergent equivalence in $\mathbb{R}$; `math.seq.series` owns the basic partial-sum convergence definition. This concept, `math.real.series-rigorous`, deliberately does not re-derive either; it owns the SPECIFIC application of the Cauchy criterion to series (LO1), the absolute-convergence sufficiency proof (LO2), and the rearrangement dichotomy (LO3) — genuinely new content building on, not duplicating, both prerequisites.
- Examples 2 and 3 deliberately reuse the SAME series (the alternating harmonic series) across two different learning objectives — first to demonstrate conditional-without-absolute convergence, then to demonstrate rearrangement sensitivity — since both phenomena share the identical underlying cause (the positive and negative terms each diverging individually), making the connection between LO2 and LO3 explicit rather than presenting them as unrelated facts.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (math.seq.comparison-test unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A04) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract: expert learner already fluent in rigorous sequence convergence; series convergence reduced directly) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
