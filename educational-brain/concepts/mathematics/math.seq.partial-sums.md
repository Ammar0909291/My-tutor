# math.seq.partial-sums — Partial Sums

## Identity
- **KG id**: `math.seq.partial-sums`
- **Domain**: math.seq (Sequences & Series)
- **Requires**: `math.seq.series`
- **Unlocks**: `math.seq.series-convergence`
- **Cross-links**: none
- **Difficulty**: proficient · **Bloom level**: understand
- **Mastery threshold**: 0.85 · **Estimated hours**: 3

## Learning Objective
The learner defines the $n$th partial sum $S_n=a_1+a_2+\cdots+a_n$ as a running cumulative total distinct from the original sequence $\{a_n\}$, recovers individual terms from partial sums via $a_n=S_n-S_{n-1}$ ($n\ge2$), recognizes that the sequence $\{S_n\}$ need not be monotone when terms change sign, and holds separately in mind the three distinct objects: the term sequence, the partial-sum sequence, and the series sum (the limit of the partial sums).

## Core Understanding
`math.seq.series` already DEFINED a series' sum as the limit of its partial sums, but treated $S_n$ as a background mechanism inside that definition rather than as its own object of study. This concept promotes $\{S_n\}$ to a first-class sequence in its own right — with its own formula, its own behavior (possibly non-monotone), and its own recoverable relationship back to the original terms.

**The definition is a running cumulative total, a NEW sequence built from the original one**: $S_n=\sum_{k=1}^na_k=a_1+a_2+\cdots+a_n$. Crucially, $\{S_n\}$ is a DIFFERENT sequence from $\{a_n\}$ — same index $n$, but $S_n$ is the TOTAL of everything up through the $n$th term, while $a_n$ is just the $n$th term alone. For example, with $a_n=(1/2)^n$: $S_1=1/2$, $S_2=1/2+1/4=3/4$, $S_3=3/4+1/8=7/8$ — each $S_n$ accumulates one more term than the last.

**Recovering the original terms runs the accumulation backward**: since $S_n=S_{n-1}+a_n$ by definition (the $n$th partial sum is the $(n-1)$th partial sum plus the newest term), rearranging gives $a_n=S_n-S_{n-1}$ for $n\ge2$, with $a_1=S_1$ as the base case. Given only a formula for $S_n$, this lets the original series be reconstructed term by term — a genuinely useful inverse operation, not just a definitional curiosity: it is exactly the technique that proves "if $\sum a_n$ converges, then $\lim_{n\to\infty}a_n=0$" (since $\lim a_n=\lim(S_n-S_{n-1})=S-S=0$ when both sequences converge to the same limit $S$).

**Partial sums need not increase — that assumption only holds when every term is positive**: for the alternating harmonic series $a_n=(-1)^{n+1}/n$, the partial sums are $S_1=1$, $S_2=1/2$, $S_3=5/6$, $S_4=7/12$ — visibly NOT monotone, since $S_2<S_1$ and $S_4<S_3$ (each negative term decreases the running total). The odd-indexed partial sums form a decreasing sequence approaching $\ln2\approx0.693$ from above, while the even-indexed partial sums form an increasing sequence approaching $\ln2$ from below — both converging to the SAME limit, despite neither subsequence being monotone across all of $\{S_n\}$.

**Three distinct objects must be held apart at all times**: the term sequence $\{a_n\}$ (individual values), the partial-sum sequence $\{S_n\}$ (cumulative totals, itself a sequence with its own convergence behavior), and the series sum $S=\lim_{n\to\infty}S_n$ (a single number, the LIMIT of the partial sums — not any one finite $S_n$, however large $n$ is). $S_{100}=1-(1/2)^{100}$ is astonishingly close to $1$ but is NOT equal to the series sum $1$; only the limit is exact.

## Mental Models
- **A running total is a new sequence, not the old one relabeled.** $\{S_n\}$ and $\{a_n\}$ share an index but describe different quantities — cumulative total versus individual term.
- **Subtract consecutive partial sums to recover a term.** $a_n=S_n-S_{n-1}$ runs the accumulation process backward — useful whenever only the partial-sum formula is known.
- **A running total can go down.** Monotone increase is a property of POSITIVE-term series, not of partial sums in general — negative terms make $S_n$ dip.
- **The series sum is where the partial sums are headed, not any stop along the way.** $S$ is the destination (a limit); every individual $S_n$ is a snapshot en route.

## Why Students Fail
None of this Blueprint's three misconceptions carries an explicit birth-type column, so each is independently classified here:
- **MC-1** is a **Type 1 (overgeneralization)**: direct computation of a specific $S_n$ is a natural, concrete, completed action, while "the sum of the series" requires the additional abstract step of taking a limit — it is natural to conflate the concrete thing just computed with the abstract thing the question actually asked for.
- **MC-2** is a **Type 1 (overgeneralization)**: a learner's experience is dominated by series with all-positive terms, where "adding more terms always makes the running total bigger" is simply true — that experience overgeneralizes to series with negative or alternating terms, where it fails.
- **MC-3** is a **Type 3 (language contamination)**: both $\{a_n\}$ and $\{S_n\}$ are "sequences indexed by $n$," and without an explicit contrast, the shared vocabulary ("the sequence," "the $n$th term") invites treating them as the same object, since ordinary language does not automatically distinguish "the $n$th term of the series" from "the $n$th partial sum."

## Misconceptions
**MC-1 — PARTIAL-SUM-IS-THE-SERIES-SUM** *(Foundational)*
- Surface form: "the sum of the series is $S_5=31/32$ because I computed five terms" — treating a specific finite partial sum as the exact, complete answer to "what does the series sum to."
- Root cause: direct computation is concrete and natural; recognizing that the true sum is a LIMIT (an additional abstract step beyond any finite computation) is easy to skip.
- Repair: state explicitly that $S_{100}=1-(1/2)^{100}$ is within $(1/2)^{100}\approx10^{-30}$ of $1$, but it IS NOT $1$ — the series sum is $\lim_{n\to\infty}S_n=1$, the number the partial sums approach, never any one of them exactly (except in the trivial case where the series terminates).

**MC-2 — PARTIAL-SUMS-ALWAYS-INCREASE**
- Surface form: "after $S_3=5/6$, $S_4$ must be larger than $5/6$" — assuming partial sums are always monotone increasing.
- Root cause: experience with positive-term series, where adding a term always increases the running total, generalized without noticing the assumption of positivity.
- Repair: compute $S_4$ for the alternating harmonic series directly: $a_4=-1/4$, so $S_4=S_3+a_4=5/6-1/4=7/12<5/6=S_3$ — a negative term decreases the partial sum, and a series can converge (via oscillating, non-monotone partial sums) without ever being monotone.

**MC-3 — SEQUENCE-OF-PARTIAL-SUMS-IS-ORIGINAL-SEQUENCE**
- Surface form: "$S_3=a_3$," or describing "the partial sum sequence" as though it were simply the sequence of original terms.
- Root cause: both $\{S_n\}$ and $\{a_n\}$ are sequences sharing the same index $n$, and the shared vocabulary does not automatically flag them as different objects.
- Repair: compute both directly for a concrete example — for $a_n=1/n$, $a_3=1/3\approx0.333$ but $S_3=a_1+a_2+a_3=1+1/2+1/3=11/6\approx1.833$ — two very different numbers at the same index $n=3$, making the distinction concrete rather than verbal.

## Analogies
- **The bank-balance analogy**: $a_n$ is like the $n$th individual deposit, while $S_n$ is the account BALANCE after that deposit — the balance accumulates every prior deposit, while any single deposit amount does not.
- **Anti-analogy — a partial sum is NOT a rounded or approximate "final answer."** This is MC-1's exact error: $S_{100}$ is not "close enough" to serve as the series sum in any exact sense — it is a specific, different number from the true limit, however small the gap.

## Demonstrations
1. **The three-column table**: for $a_n=(-1)^{n+1}/n$, a table of $n, a_n, S_n$ through $n=5$, with the explicit annotation "$S_n$ is NOT always larger than $S_{n-1}$ — when $a_n$ is negative, the partial sum DECREASES" — directly breaking MC-2 by making non-monotonicity visible before it is stated abstractly.
2. **The oscillating-convergence graph**: plotting $S_n$ against $n$ for the alternating harmonic series, showing odd-indexed partial sums decreasing toward $\ln2$ from above and even-indexed partial sums increasing toward $\ln2$ from below, both converging to the SAME limit — directly breaking MC-1 by visually distinguishing $S_5\approx0.783$ from the true sum $\ln2\approx0.693$.
3. **The term-recovery demonstration**: given $S_n=1-(1/2)^n$, computing $a_1=S_1=1/2$, $a_2=S_2-S_1=3/4-1/2=1/4$, and the general formula $a_n=S_n-S_{n-1}=(1/2)^n$ — confirming the original geometric series is recovered exactly — directly breaking MC-3 by requiring the two sequences to be computed separately and compared.

## Discovery Questions
1. "You computed $S_5=31/32$ for a convergent series. Is $31/32$ the exact sum of the series, or an approximation?"
2. "For a series with a negative fourth term, is $S_4$ guaranteed to be bigger than $S_3$?"
3. "If $S_3=11/6$ for the series $\sum1/n$, is $a_3$ also $11/6$? What is $a_3$ actually?"

## Teaching Sequence
1. **Anchor in `math.seq.series`**: state directly, "you already used partial sums to DEFINE a series' convergence — today, $\{S_n\}$ becomes its own object, with its own formula and its own behavior."
2. **Representation shift (breaks MC-1 and MC-2)**: the three-column table for the alternating harmonic series, paired with the oscillating-convergence graph, distinguishing $\{a_n\}$, $\{S_n\}$, and the limit $S=\ln2$ explicitly.
3. **Pattern induction (breaks MC-3)**: given several $S_n$ formulas (e.g. $S_n=1-(1/2)^n$; $S_n=n/(n+1)$; $S_n=n$), taking the limit to find the series sum (or divergence) and computing $S_n-S_{n-1}$ to recover $a_n$ — reinforcing that these are two separate, computable operations on two separate objects.
4. **Mastery gate**: 4-item problem set (compute four partial sums for the alternating series $a_n=(-1)^{n+1}$ and determine whether they increase; recognize that $S_{100}\ne5$ even though the series converges to $5$; confirm "series converges iff $\{S_n\}$ converges" as the definition; recover $a_3$ from a given $S_n$ formula) plus 1 independence-mode transfer probe (given $S_n=2n/(n+1)$, determine convergence, recover the general term formula, and find $a_1$).

## Tutor Actions
- **Representation shift**: the three-column table and oscillating-convergence graph for the alternating harmonic series.
- **Pattern induction**: recovering series sums and general terms from several distinct $S_n$ formulas.
- **Mastery gate**, 4-item problem set plus 1 transfer probe requiring both convergence determination and term recovery from a novel $S_n$ formula.

## Voice Teaching Notes
- Open with the explicit three-object framing: "today you'll keep three things straight — the terms, the running totals, and the limit of the running totals — mixing any two up is the single most common mistake here."
- For MC-1, whenever a specific $S_n$ is computed, ask "is that the exact series sum, or is it an approximation to it?" as a standing check.
- For MC-2, before accepting any claim that partial sums increase, ask "are all the terms in this series positive?"
- For MC-3, whenever $a_n$ and $S_n$ are both in play, require both to be computed explicitly and compared numerically before any further reasoning.

## Assessment Signals
- **Early warning for MC-1**: reporting a specific finite $S_n$ as "the sum" of a convergent series without qualifying it as an approximation.
- **Early warning for MC-2**: asserting $S_n>S_{n-1}$ for a series without first checking the sign of $a_n$.
- **Early warning for MC-3**: reporting $a_n=S_n$ directly, or describing the two sequences interchangeably.
- **Mastery evidence**: correctly stating that the series sum is a limit rather than any specific partial sum, correctly identifying non-monotone partial-sum behavior when terms change sign, and correctly recovering $a_n$ from a given $S_n$ formula via subtraction on a novel example.

## Tutor Recovery Strategy
- On MC-1: re-walk the oscillating-convergence graph (or an analogous positive-term example), explicitly naming the gap between a specific $S_n$ and the limit, using a numeric comparison (e.g. $S_{100}$ vs. the exact sum).
- On MC-2: present a FRESH series with negative terms (not the one already seen) and require the learner to compute two consecutive partial sums before predicting whether the sum increases.
- On MC-3: require the learner to compute both $a_n$ and $S_n$ explicitly at the SAME index for a fresh example, then compare the two numbers directly.
- If a learner correctly computes partial sums but cannot take the limit to find the series sum, treat this as a distinct limit-evaluation gap (not a partial-sum gap) and route to review of `math.calc.limits`-style limit evaluation.

## Memory Hooks
- "Running total, not the term itself" — the core definitional distinction.
- "Subtract consecutive totals to get the term back" — for term recovery, $a_n=S_n-S_{n-1}$.
- "Negative terms make the total dip" — for MC-2.
- "The limit is the destination, not a stop along the way" — for MC-1.

## Transfer Connections
- **`math.seq.series`** (prerequisite, already authored): already used partial sums as the DEFINING mechanism behind series convergence — this concept promotes $\{S_n\}$ to its own object of study with its own recoverable relationship to $\{a_n\}$.
- **`math.seq.series-convergence`** (unlocked, not yet authored): the formal convergence tests (ratio test, integral test, comparison test) this concept unlocks all rest on the same underlying fact — "the series converges" means "$\{S_n\}$ converges" — established here as the definition, not an extra theorem.
- **`math.seq.arithmetic-series`** and **`math.seq.geometric-series`** (siblings, the latter authored this same batch): both are concrete instances where the partial-sum sequence $\{S_n\}$ has a closed-form formula, making the general recovery technique $a_n=S_n-S_{n-1}$ directly exercisable.

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: []`); the term-recovery relationship $a_n=S_n-S_{n-1}$ is also the exact mechanism used in the standard proof that a convergent series' terms must tend to zero, a fact used throughout later convergence-testing work, though this is an internal mathematics connection rather than a formal cross-subject link.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.seq.partial-sums.md` (primitive-numbered format — P11/P04/P27/P41/P64/P91 scaffolding). All worked examples (the alternating harmonic series table and graph; recovering $a_n$ from $S_n=1-(1/2)^n$, $S_n=n/(n+1)$, and $S_n=n$), the complete misconception registry (MC-1 Foundational, MC-2, MC-3, none carrying an explicit birth-type column), and the mastery-gate transfer probe are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `unlocks: math.seq.series-convergence`, `cross_links: []`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`) verified against the live KG — see Curriculum Feedback below: **zero discrepancy**.
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence`): "The sequence of partial sums of a series is given by $S_n=2n/(n+1)$. (a) Does the series converge? If so, find its sum. (b) Find a general formula for $a_n$ for $n\ge2$. (c) What is $a_1$?" *(Expected: (a) $\lim_{n\to\infty}2n/(n+1)=2$ — converges to $2$. (b) $a_n=S_n-S_{n-1}=2/[n(n+1)]$. (c) $a_1=S_1=1$, consistent with the general formula at $n=1$: $2/(1\cdot2)=1$.)*, reused by reference.

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`).
- The Blueprint's own P76 transfer probe cites `math.seq.convergent` in a cross-link-probe-mode consideration for a SIBLING concept (`math.calc.sequence-limits`, authored Batch 53), not for this concept itself (this concept's own `cross_links` field is genuinely empty in the KG) — no staleness finding applies here.

## Version History
- **2026-09-13 (Batch 59)**: authored as part of the Mathematics Educational Brain completion campaign. Unblocked by the already-authored `math.seq.series` (Batch 54). One of four concepts authored this batch (companions: `math.trig.product-to-sum`, `math.trig.hyperbolic-functions`, `math.seq.geometric-series`). `math.seq` moves from 5/21 toward 7/21 this batch.
