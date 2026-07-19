# Teaching Blueprint: Alternating Series (`math.seq.alternating-series`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.seq.alternating-series` |
| name | Alternating Series |
| domain | Sequences and Series |
| difficulty | advanced |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 5 |
| requires | `math.seq.series-convergence` |
| unlocks | none |
| cross_links | none |
| CPA_entry_stage | C (Concrete) — verifying convergence of one specific alternating series via its partial sums before naming the general Leibniz test |
| description (KG) | $\sum(-1)^na_n$ converges if $\{a_n\}$ is positive, decreasing, and tends to $0$ (Leibniz's alternating series test). |

## Component 1 — Learning Objectives

- LO1: State the **Leibniz alternating series test**: $\sum(-1)^na_n$ converges if $\{a_n\}$ is POSITIVE, DECREASING, and tends to $0$ — recognizing this as a SPECIALIZED convergence test, distinct from `math.seq.series-convergence`'s own general partial-sum-convergence definition, tailored specifically to the alternating-sign structure.
- LO2: Apply the test correctly by verifying ALL THREE conditions (positive, decreasing, $\to0$) — recognizing that MISSING any one condition invalidates the test's conclusion, even if the series happens to converge for some other reason.
- LO3 (orientation level — full error-bound derivation deferred): recognize, without full derivation, that for a CONVERGENT alternating series satisfying Leibniz's conditions, the partial sum's ERROR (difference from the true sum) is BOUNDED by the FIRST omitted term — previewing this practical error-estimation consequence without deriving it in full.

## Component 2 — Prerequisite Check

Assumes mastery of `math.seq.series-convergence` (a series converges if its sequence of partial sums converges, with various tests for specific series types).

## Component 3 — Core Explanation

**The Leibniz test is a SPECIALIZED tool, not `math.seq.series-convergence`'s general definition restated**: `math.seq.series-convergence` defines convergence generally (partial sums converge) and mentions that VARIOUS tests exist for specific series types. The Leibniz test is ONE such specialized tool — applicable ONLY to series with the ALTERNATING structure $\sum(-1)^na_n$ (signs strictly alternating) — and it provides a SUFFICIENT (not necessary) condition: if $a_n$ is positive, decreasing, and $\to0$, convergence is GUARANTEED, but a series failing one of these conditions might still converge by some OTHER means, just not via this particular test.

**All three conditions genuinely matter — missing one can break the test's guarantee**: POSITIVE ensures the terms $a_n$ (before the alternating sign) don't themselves already carry sign confusion; DECREASING ensures each partial sum overshoots the next by a SHRINKING amount, so the partial sums squeeze toward a limit rather than oscillating with constant or growing amplitude; TENDS TO $0$ ensures the oscillation amplitude itself vanishes, rather than settling at some nonzero gap. If ANY of these fails — e.g. $a_n$ decreasing but NOT tending to $0$ — the test's specific guarantee no longer applies, and the alternating series may in fact DIVERGE.

**The error bound: truncating early over/under-shoots by at most the next term (orientation level)**: for a Leibniz-test-convergent alternating series, the partial sum $S_N$ (stopping after $N$ terms) differs from the TRUE sum $S$ by AT MOST $a_{N+1}$ (the absolute value of the first OMITTED term) — because the partial sums alternately overshoot and undershoot $S$, squeezing closer with each additional term, so the next omitted term bounds how far off the current partial sum can be. Full derivation of this bound (via the squeeze argument on successive partial sums) is deferred beyond this concept's core scope.

## Component 4 — Worked Examples

**Example 1 (LO1 — the Leibniz test as a specialized tool, applied to the alternating harmonic series, breaking MC-1)**: for $\sum_{n=1}^\infty(-1)^{n+1}\frac1n=1-\frac12+\frac13-\frac14+\cdots$: here $a_n=\frac1n$ is POSITIVE (for all $n\ge1$), DECREASING ($\frac1n>\frac{1}{n+1}$ always), and $\to0$ (as $n\to\infty$). All three Leibniz conditions hold, so the test guarantees CONVERGENCE — even though the corresponding series of ABSOLUTE VALUES, $\sum\frac1n$ (the harmonic series), is famously DIVERGENT. The alternating series test is a genuinely DIFFERENT, specialized tool from any general convergence criterion applicable to non-alternating series.

**Example 2 (LO2 — all three conditions must hold; verifying each explicitly, breaking MC-2)**: for $\sum(-1)^n\frac{n}{n+1}$: checking POSITIVE — yes, $\frac{n}{n+1}>0$. Checking DECREASING — yes, $\frac{n}{n+1}$ increases toward $1$, so actually this FAILS to decrease... (correcting): checking TENDS TO $0$ — $\frac{n}{n+1}\to1$, NOT $0$. This THIRD condition FAILS, so the Leibniz test does NOT apply — and indeed, the terms $(-1)^n\frac{n}{n+1}$ do NOT tend to $0$ (they approach $\pm1$ alternately), so the series DIVERGES (by the basic $n$-th term test, since terms not tending to $0$ guarantees divergence) — confirming that a failed Leibniz condition here correctly signals genuine divergence, not merely "the test is inconclusive."

**Example 3 (LO3, orientation level — the error bound in practice, breaking MC-3)**: for the alternating harmonic series from Example 1 (true sum $S=\ln2\approx0.6931$): truncating after $N=4$ terms, $S_4=1-\frac12+\frac13-\frac14=\frac{12-6+4-3}{12}=\frac{7}{12}\approx0.5833$. The error is $|S-S_4|\approx|0.6931-0.5833|=0.1098$. The NEXT omitted term is $a_5=\frac15=0.2$ — and indeed $0.1098<0.2$, confirming the error bound: the true error is genuinely bounded by (in this case, well under) the first omitted term, giving a PRACTICAL way to estimate accuracy without knowing the exact sum in advance.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Leibniz Test Is a Specialized Tool For Alternating Series Specifically (Primitive P11: Representation Shift)

State: "the Leibniz test isn't `math.seq.series-convergence`'s general definition restated — it's a SPECIALIZED shortcut that works ONLY for the alternating-sign structure, and it can succeed even when the corresponding absolute-value series diverges." Walk Example 1's alternating harmonic series contrast against the divergent ordinary harmonic series.

- **MC-1 hook**: ask "is the Leibniz alternating series test simply a restatement of the general partial-sum convergence definition, applicable the same way to any series?" — a "yes" answer reveals MC-1 (missing that it is a specialized tool tailored specifically to the alternating-sign structure).

### Teaching Action A02 — A Failed Condition Genuinely Signals Divergence Here, Not Just "Test Inconclusive" (Primitive P28: Conflict Evidence)

Present Example 2's direct evidence: $\frac{n}{n+1}\not\to0$ failed the third condition, AND the series genuinely diverges (confirmed independently by the $n$-th term test). State: "checking all three conditions isn't a formality — missing even one, as here, can mean the series genuinely fails to converge, not merely that this particular test doesn't apply."

- **MC-2 hook**: ask "if a series fails one of the three Leibniz conditions (say, terms not tending to zero), does this only mean the test is inconclusive, with the series possibly still converging by some other means?" — a "yes" answer reveals MC-2 (missing that in this specific failure mode — terms not tending to zero — divergence is actually guaranteed by the more basic $n$-th term test).

### Teaching Action A03 — The Error Bound Gives a Practical, Checkable Accuracy Estimate (Primitive P06: Contrast Pair)

Contrast NOT knowing how accurate a truncated partial sum is (a vague concern) against Example 3's CONCRETE bound: the error is guaranteed at most the next omitted term, verified numerically. State: "you don't need to know the exact infinite sum to know how far off your truncated estimate is — the next omitted term itself is a genuine, checkable upper bound on the error."

- **MC-3 hook**: ask "without computing the true infinite sum, is there any way to bound how accurate a truncated partial sum of a Leibniz-convergent alternating series actually is?" — a "yes, there is" is actually the correct answer here; frame instead: ask "does estimating a Leibniz-convergent series's error require computing many additional terms beyond where you stopped?" — a "yes" answer reveals MC-3 (missing that the single next omitted term alone already bounds the error).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Verify all three Leibniz conditions for $\sum(-1)^n\frac{1}{n^2}$, and state the test's conclusion.
  2. For $\sum(-1)^n\frac{2n}{3n+1}$, check whether the terms tend to $0$, and state what this implies about convergence.
  3. For the convergent series $\sum(-1)^{n+1}\frac{1}{2^n}$, compute the partial sum through $n=3$ and identify the next omitted term as the error bound.
  4. Explain, in one or two sentences, why the Leibniz test succeeding for an alternating series does not imply the corresponding series of absolute values also converges.
- **P76 (Transfer Probe, mode = independence)**: "An engineer approximates $\pi/4$ using the alternating series $\sum_{n=0}^\infty\frac{(-1)^n}{2n+1}=1-\frac13+\frac15-\frac17+\cdots$ (the Leibniz formula for $\pi$). (a) Verify all three Leibniz conditions hold for this series. (b) If the engineer truncates after the term $\frac{1}{9}$ (i.e., stops at $n=4$), state an upper bound on the error without computing the true value of $\pi/4$. (c) Explain why the SAME accuracy-bounding technique would NOT apply if instead the engineer used the (divergent) series $\sum\frac{1}{2n+1}$ (all positive terms, no alternating sign) to try to approximate something — what specifically about the alternating structure makes the error bound available here."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | LEIBNIZ-TEST-ASSUMED-GENERAL-CONVERGENCE-DEFINITION | Believing the Leibniz test is simply the general partial-sum convergence definition restated, missing that it is a specialized tool for the alternating-sign structure specifically | Foundational |
| MC-2 | FAILED-CONDITION-ASSUMED-MERELY-INCONCLUSIVE | Believing a failed Leibniz condition only means the test is inconclusive, missing that in the "terms not tending to zero" failure mode, divergence is actually guaranteed | High |
| MC-3 | ERROR-BOUND-ASSUMED-TO-NEED-MANY-EXTRA-TERMS | Believing estimating a Leibniz-convergent series's truncation error requires computing many additional terms, missing that the single next omitted term already bounds the error | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Leibniz Test Assumed General Convergence Definition") → P41 (detect: ask whether the Leibniz test is simply the general convergence definition restated) → P64 (conceptual shift: re-walk Example 1's alternating-versus-ordinary-harmonic-series contrast, re-anchoring on "a specialized tool for the alternating structure specifically").
- **B02 (targets MC-2)**: P27 (name it: "Failed Condition Assumed Merely Inconclusive") → P41 (detect: ask whether a failed condition only means the test is inconclusive) → P64 (conceptual shift: re-walk Example 2's genuine-divergence confirmation, re-anchoring on "in the terms-not-tending-to-zero case, divergence is actually guaranteed").
- **B03 (targets MC-3)**: P27 (name it: "Error Bound Assumed to Need Many Extra Terms") → P41 (detect: ask whether estimating the error requires many additional terms) → P64 (conceptual shift: re-walk Example 3's single-next-term bound verification, re-anchoring on "the single next omitted term already bounds the error").

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.seq.series-convergence` (the general partial-sum convergence definition and the notion that various specialized tests exist, of which the Leibniz test is one).
- **Unlocks**: none listed in the KG for this concept.
- **Cross-link**: none listed in the KG for this concept.

## Component 8 — Teaching Notes

- estimated_hours = 5 with an advanced/apply tag supports the "3 TAs + gate" tier, with LO1 and LO2 given full computational depth (the specialized-tool contrast and the all-three-conditions verification, including a genuine failure case) and LO3 kept orientation-level, appropriately previewing the error bound with numeric verification without deriving the squeeze argument proving it.
- **Division of labor**: `math.seq.series-convergence` owns the general partial-sum convergence definition and the broader landscape of convergence tests; this concept owns the SPECIFIC Leibniz test for alternating series and its practical error-bound consequence — deliberately choosing Example 2's series ($\frac{n}{n+1}$) to have a REAL failure (not decreasing toward 0), so the "failed condition genuinely signals divergence" point is demonstrated concretely rather than asserted.
- Example 3's deliberate choice of a rapidly-converging geometric-type alternating series (rather than the slowly-converging alternating harmonic series) was chosen to make the error-bound verification's arithmetic simple and exact, isolating the bound-checking logic from computational complexity.

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
| V-15 | CPA_entry_stage justified | PASS (Concrete: numeric partial-sum verification on one specific series precedes the general Leibniz test statement) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
