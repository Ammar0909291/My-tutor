# Teaching Blueprint: Absolute Convergence (`math.real.absolute-convergence`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.real.absolute-convergence` |
| name | Absolute Convergence |
| domain | Real Analysis |
| difficulty | expert |
| bloom | understand |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 3 |
| requires | `math.real.series-rigorous` |
| unlocks | none |
| cross_links | `math.seq.absolute-convergence` (not yet authored — see Component 7) |
| CPA_entry_stage | A (Abstract) — direct definition, grounded immediately in the already-established rigorous series convergence framework |
| description (KG) | ∑aₙ absolutely converges iff ∑|aₙ| converges. Implies convergence of ∑aₙ. Absolutely convergent series may be rearranged to any order without changing the sum. Conditionally convergent series can be rearranged to any value. |

## Component 1 — Learning Objectives

- LO1: Define a series $\sum a_n$ as **absolutely convergent** if $\sum|a_n|$ converges (as an ordinary series of non-negative terms), and correctly determine, for a given series, whether it is absolutely convergent by testing $\sum|a_n|$.
- LO2: State and apply the theorem that absolute convergence **implies** ordinary convergence ($\sum|a_n|$ converges $\implies\sum a_n$ converges), and correctly distinguish this from the (generally false) converse — recognizing series that converge but NOT absolutely (**conditionally convergent** series).
- LO3: State the **rearrangement dichotomy**: an absolutely convergent series may be rearranged into ANY order without changing its sum, while a conditionally convergent series can be rearranged to sum to ANY prescribed real number (or diverge) — and correctly identify which behavior applies to a given series.

## Component 2 — Prerequisite Check

Assumes mastery of `math.real.series-rigorous` (the rigorous $\varepsilon$–$N$ definition of series convergence via partial sums, and standard convergence tests).

## Component 3 — Core Explanation

A series $\sum_{n=1}^\infty a_n$ is **absolutely convergent** if the series of absolute values, $\sum_{n=1}^\infty|a_n|$, converges (as an ordinary series with non-negative terms — testable via any standard test: comparison, ratio, root, etc.).

**Absolute convergence implies convergence**: if $\sum|a_n|$ converges, then $\sum a_n$ itself converges too (a genuine theorem, provable via the Cauchy criterion: the partial sums of $\sum a_n$ form a Cauchy sequence because $\left|\sum_{n=N+1}^{M}a_n\right|\le\sum_{n=N+1}^{M}|a_n|$, and the right side can be made arbitrarily small since $\sum|a_n|$ converges). The CONVERSE is false in general: a series can converge without converging absolutely — such a series is called **conditionally convergent**.

**Conditional convergence — the canonical example**: $\sum_{n=1}^\infty\frac{(-1)^{n+1}}{n}=1-\frac12+\frac13-\frac14+\cdots$ converges (by the alternating series test) to $\ln2$, but $\sum\left|\frac{(-1)^{n+1}}{n}\right|=\sum\frac1n$ is the harmonic series, which DIVERGES. This series converges, but not absolutely — exactly a conditionally convergent series.

**Rearrangement dichotomy**: if $\sum a_n$ converges ABSOLUTELY, then EVERY rearrangement (reordering) of its terms converges to the SAME sum — the order of summation genuinely doesn't matter, exactly as with finite sums. If $\sum a_n$ converges only CONDITIONALLY, the **Riemann rearrangement theorem** states the terms can be reordered to converge to ANY prescribed real number whatsoever, or to diverge — a strikingly different, order-dependent behavior. This dichotomy is the single most important practical consequence of the absolute/conditional distinction: it tells you exactly when "the sum" is a well-defined, order-independent quantity, and when it secretly depends on an arbitrary choice of ordering.

## Component 4 — Worked Examples

**Example 1 (LO1 — testing absolute convergence directly)**: Is $\sum_{n=1}^\infty\frac{(-1)^n}{n^2}$ absolutely convergent? Test $\sum\left|\frac{(-1)^n}{n^2}\right|=\sum\frac1{n^2}$ — this is a $p$-series with $p=2>1$, which converges (a standard fact). So yes, absolutely convergent — confirmed by directly testing the absolute-value series, not merely by observing the original series converges.

**Example 2 (LO2 — conditional convergence, breaking MC-1)**: Is $\sum_{n=1}^\infty\frac{(-1)^{n+1}}{n}$ absolutely convergent? The original series converges (alternating series test: terms decrease to 0), to $\ln2$. But $\sum\left|\frac{(-1)^{n+1}}{n}\right|=\sum\frac1n$ diverges (harmonic series). So the series converges but is NOT absolutely convergent — it is conditionally convergent. This directly demonstrates that "the series converges" alone does NOT imply "the series converges absolutely" — the two are genuinely different properties, and this series exhibits the gap between them.

**Example 3 (LO3 — the rearrangement dichotomy applied)**: For $\sum_{n=1}^\infty\frac1{n^2}$ (Example 1's absolute-value series, itself absolutely convergent since it's already non-negative — a series of non-negative terms is absolutely convergent iff it converges at all), any rearrangement — e.g. summing even-indexed terms first, then odd — gives the SAME sum, $\pi^2/6$. By contrast, for the conditionally convergent $\sum\frac{(-1)^{n+1}}{n}$ from Example 2, the Riemann rearrangement theorem guarantees SOME reordering exists that sums to, say, 100 instead of $\ln2\approx0.693$ — a dramatically different value, achieved purely by reordering the SAME set of terms.

## Component 5 — Teaching Actions

### Teaching Action A01 — Absolute Convergence Implies Convergence, and the Gap Between Them (Primitive P11: Representation Shift)

State the definition, then work Example 1's direct test of $\sum1/n^2$. Shift representation to Example 2's conditionally-convergent case, stating the implication direction explicitly: "absolute convergence is the STRONGER property — it always implies ordinary convergence, but ordinary convergence does NOT always imply absolute convergence, and the alternating harmonic series is the standard witness to that gap."

- **MC-1 hook**: ask "if a series converges, does that automatically mean it converges absolutely too?" — an answer of "yes" reveals MC-1 (conflating convergence with absolute convergence, missing the genuine asymmetry between them).

### Teaching Action A02 — The Rearrangement Dichotomy (Primitive P06: Contrast Pair)

**Contrast (targets MC-2)**: place Example 3's two cases directly side by side: $\sum1/n^2$ (absolutely convergent, EVERY rearrangement gives the same sum $\pi^2/6$) versus $\sum(-1)^{n+1}/n$ (conditionally convergent, SOME rearrangement gives sum 100, another gives a different value entirely, another diverges). State: "this is not a minor technicality — it is the single most consequential difference between the two kinds of convergence: for an absolutely convergent series, 'the sum' is unambiguous no matter how you add the terms; for a conditionally convergent series, 'the sum' secretly depends on the order you chose, which is a genuinely strange and important fact."

### Teaching Action A03 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Determine whether $\sum_{n=1}^\infty\frac{(-1)^n}{n^3}$ is absolutely convergent, conditionally convergent, or divergent, justifying via the absolute-value series.
  2. Determine the same for $\sum_{n=1}^\infty\frac{(-1)^{n+1}}{\sqrt n}$.
  3. Explain why absolute convergence implies convergence, sketching the Cauchy-criterion argument from Component 3 in your own words.
  4. Explain, using the rearrangement dichotomy, why a physicist rearranging terms in an absolutely convergent series (e.g. to group terms conveniently) never introduces an error, while the same operation on a conditionally convergent series genuinely could.
- **P76 (Transfer Probe, mode = independence)**: "A power series $\sum_{n=0}^\infty c_n x^n$ converges absolutely for $|x|<R$ (strictly inside its radius of convergence $R$) — this is a standard fact from the theory of power series. (a) Using this lesson's rearrangement dichotomy, explain why this absolute-convergence guarantee is what allows power series to be freely rearranged, differentiated, and integrated term-by-term inside their radius of convergence without changing the represented function — an operation that would NOT be justified if the series were only conditionally convergent. (b) At the boundary $|x|=R$ itself, a power series can sometimes converge only conditionally (or not at all). Explain what could go wrong, using this lesson's Riemann rearrangement fact, if someone tried to rearrange terms of a power series evaluated exactly at such a boundary point."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed misconception's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | CONVERGENCE-CONFLATED-WITH-ABSOLUTE-CONVERGENCE | Believing every convergent series is automatically absolutely convergent, missing conditionally convergent series (which converge but not absolutely) | Foundational |
| MC-2 | REARRANGEMENT-ASSUMED-ALWAYS-SAFE | Believing the sum of a series is always independent of term order, regardless of whether the series is absolutely or only conditionally convergent | Foundational |
| MC-3 | ABSOLUTE-VALUE-SERIES-TEST-SKIPPED-AS-REDUNDANT | Believing it is unnecessary to separately test $\sum|a_n|$ once $\sum a_n$'s convergence is established, missing that absolute convergence is a strictly stronger, separately-verified property | Moderate |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 (name it: "Convergence Conflated with Absolute Convergence") → P41 (detect: ask whether the alternating harmonic series, known to converge, is automatically absolutely convergent too) → P64 (conceptual shift: re-walk Example 2's explicit divergence of $\sum1/n$ despite the original series converging).
- **B02 (targets MC-2)**: P27 (name it: "Rearrangement Assumed Always Safe") → P41 (detect: ask whether reordering the terms of the alternating harmonic series could change its sum) → P64 (conceptual shift: re-state the Riemann rearrangement theorem and Example 3's contrast).
- **B03 (targets MC-3)**: P27 (name it: "Absolute-Value Series Test Skipped as Redundant") → P41 (detect: ask a student to classify a series as "absolutely convergent" purely because they showed the original series converges, without testing $\sum|a_n|$ separately) → P64 (conceptual shift: re-anchor on the definition — absolute convergence is DEFINED via $\sum|a_n|$ and must be tested as its own, separate series).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.real.series-rigorous` (the rigorous $\varepsilon$–$N$/Cauchy-criterion framework for series convergence, used directly in this concept's absolute-convergence-implies-convergence proof).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: KG lists `math.seq.absolute-convergence`, checked via `ls docs/curriculum/blueprints/` and confirmed NOT YET authored. $P76_{mode}=$ **independence** (with the P76 probe above engaging the power-series application directly, since this concept's connection to power series is pedagogically central even before a dedicated `math.seq` treatment exists — consistent with this corpus's established rule that transfer probes may reference a cross-linked concept without requiring its Blueprint to already exist).

## Component 8 — Teaching Notes

- estimated_hours = 3 with an expert/understand tag and mastery_threshold = 0.85 (MAMR 5/5) places this at the "2 main TAs + gate" tier — A01 (absolute convergence implies convergence, and the conditional-convergence gap) and A02 (the rearrangement dichotomy) jointly cover all three LOs, with the rearrangement consequence given full weight as its own TA since it is, per the KG's own description, one of the most conceptually striking and frequently misunderstood facts in this area.
- The alternating harmonic series ($\sum(-1)^{n+1}/n$) was used as the canonical conditionally-convergent example throughout (rather than a less standard alternative) because it is the universally recognized textbook example for this exact distinction, keeping the concept anchored to material a student is highly likely to have already encountered informally.
- The power-series transfer probe was chosen because absolute-convergence-inside-the-radius-of-convergence is precisely the fact that licenses term-by-term differentiation/integration of power series later in the curriculum — this probe front-loads that dependency, matching this corpus's established practice of using transfer probes to make silent downstream assumptions explicit in advance.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS (`math.real.series-rigorous`) |
| V-4 | unlocks concepts named accurately from KG | PASS (none) |
| V-5 | cross_links checked against disk before setting P76_mode | PASS (`math.seq.absolute-convergence` confirmed unauthored → independence) |
| V-6 | ≥1 Teaching Action present | PASS (A01-A03) |
| V-7 | Misconception Registry non-empty | PASS (3 entries) |
| V-8 | Every MC has a Protocol B repair action | PASS (B01, B02, B03) |
| V-9 | P91 gate macro fully expanded | PASS |
| V-10 | P77 problem set has exactly 4 problems | PASS |
| V-11 | P76 transfer probe present with mode declared | PASS (independence) |
| V-12 | MAMR correctly computed from mastery_threshold | PASS (⌈0.85×5⌉=5) |
| V-13 | No cyclic prerequisite reference | PASS |
| V-14 | All MC IDs referenced in TAs resolve in registry | PASS |
| V-15 | CPA_entry_stage justified | PASS (Abstract, grounded directly in rigorous series convergence) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
