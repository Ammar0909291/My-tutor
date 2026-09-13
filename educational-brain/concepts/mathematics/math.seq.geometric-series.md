# math.seq.geometric-series — Geometric Series

## Identity
- **KG id**: `math.seq.geometric-series`
- **Domain**: math.seq (Sequences & Series)
- **Requires**: `math.seq.geometric-sequence`, `math.seq.series`
- **Unlocks**: `math.seq.infinite-geometric-series`
- **Cross-links**: none
- **Difficulty**: proficient · **Bloom level**: apply
- **Mastery threshold**: 0.85 · **Estimated hours**: 6

## Learning Objective
The learner derives the finite geometric sum formula $S_n=\frac{a(1-r^n)}{1-r}$ from `math.seq.geometric-sequence`'s own explicit formula via the multiply-by-$r$-and-subtract technique, recognizes and handles the $r=1$ exception (where the formula divides by zero and the correct sum is simply $S_n=na$), applies the finite formula reliably across arbitrary first terms and ratios (including negative ratios), and determines the infinite geometric sum $\frac{a}{1-r}$ as the limit of the partial sums precisely when $|r|<1$, refusing the formula whenever $|r|\ge1$.

## Core Understanding
`math.seq.series` already introduced the geometric series as its own standing INSTANCE of a convergent series — quoting both the finite formula $S_n=\frac{a(1-r^n)}{1-r}$ and the infinite formula $\frac{a}{1-r}$ for $|r|<1$, but explicitly DEFERRING their derivation. This concept supplies that deferred derivation, owns the $r=1$ exception, secures reliable computation across sign cases, and handles the infinite extension's validity condition — deliberately not re-teaching `math.seq.geometric-sequence`'s own explicit-formula groundwork or `math.seq.series`'s own general convergence framework.

**The finite sum formula falls out of one clean algebraic move**: write $S_n=a+ar+ar^2+\cdots+ar^{n-1}$ (the sum of the first $n$ terms of the geometric sequence), then write $rS_n=ar+ar^2+\cdots+ar^{n-1}+ar^n$ — every term shifted one slot to the right by the extra factor of $r$. Subtracting the second line from the first, every MIDDLE term cancels (each appears once in each line), leaving only the two ends: $S_n-rS_n=a-ar^n$. Factoring both sides: $S_n(1-r)=a(1-r^n)$, and dividing by $(1-r)$ gives $S_n=\frac{a(1-r^n)}{1-r}$. The formula is not a fact to memorize — it is the visible residue of this telescoping cancellation.

**The $r=1$ case is a genuine exception, visible directly in the derivation itself**: dividing by $(1-r)$ is only legal when $r\ne1$; at $r=1$ the very last step of the derivation divides by zero, so the formula is simply INVALID there — not merely inconvenient. But the $r=1$ case needs no formula at all: every term equals $a$ (multiplying by ratio $1$ changes nothing), so the sum of $n$ identical terms is trivially $S_n=na$. A geometric series therefore has TWO sum rules — the general formula for $r\ne1$, and $na$ for $r=1$ — and plugging $r=1$ directly into the general formula is a division-by-zero error, not a valid computation shortcut.

**Negative ratios require careful sign arithmetic but change nothing about validity**: for $a=8,r=-\frac12,n=4$: $S_4=\frac{8\left(1-(-\frac12)^4\right)}{1-(-\frac12)}=\frac{8(1-\frac1{16})}{\frac32}=\frac{8\cdot\frac{15}{16}}{\frac32}=\frac{15/2}{3/2}=5$ — matching the direct check $8-4+2-1=5$. The formula works identically for negative $r$; only the exponentiation and the denominator's sign need care.

**The infinite sum is the LIMIT of the finite sums, and exists precisely when $|r|<1$**: `math.seq.series`'s convergence definition says an infinite series' sum is $\lim_{n\to\infty}S_n$ — and in $S_n=\frac{a(1-r^n)}{1-r}$, the ONLY $n$-dependent piece is $r^n$. When $|r|<1$, $r^n\to0$ regardless of $r$'s sign (e.g. $(-1/2)^n$ shrinks in absolute value exactly as $(1/2)^n$ does, merely alternating sign on the way down), so $S_n\to\frac{a}{1-r}$. When $|r|\ge1$, $r^n$ does NOT tend to zero — it blows up for $|r|>1$, oscillates at $r=-1$, or grows linearly through $S_n=na\to\infty$ at $r=1$ — so the partial sums have no limit and the series DIVERGES. Plugging $|r|\ge1$ into $\frac{a}{1-r}$ still produces a number, but that number is meaningless: for $a=6,r=\frac32$, the formula gives $\frac{6}{1-3/2}=-12$, an absurd "sum" for a series of strictly positive, growing terms — the validity condition $|r|<1$ is part of the formula, not an optional footnote.

## Mental Models
- **Shift and subtract, and the middle disappears.** Multiplying the whole sum by $r$ shifts every term one slot; subtracting cancels everything except the two ends — the formula is what survives.
- **$r=1$ breaks the division, not the sum.** The sum of $n$ identical terms is trivially $na$ — the general FORMULA is what fails at $r=1$, because it requires dividing by $1-r$.
- **The validity condition is part of the formula, not a footnote.** $\frac{a}{1-r}$ answers a real question only when $|r|<1$; outside that range it is arithmetic with no meaning.
- **Sign of $r$ decides the PATH, not whether the sum exists.** $|r|<1$ alone decides convergence, regardless of whether $r$ is positive or negative.

## Why Students Fail
None of this Blueprint's three misconceptions carries an explicit birth-type column, so each is independently classified here:
- **MC-1** is a **Type 1 (overgeneralization)**: the general formula is presented as THE formula for a geometric sum, and mechanically substituting any given $r$ — including $r=1$ — into it, without checking the substitution is legal, overgeneralizes "always use the formula" past the one value where the derivation's own division step fails.
- **MC-2** is a **Type 5 (instruction-induced)** gap: if the infinite-sum formula $\frac{a}{1-r}$ is taught primarily as a plug-in computation without repeated emphasis that it is a LIMIT valid only under a condition, a learner has no signal that the condition needs checking before applying the formula.
- **MC-3** is a **Type 1 (overgeneralization)**: having correctly learned that MOST familiar sequences with alternating signs (like an alternating harmonic-style series) still require careful handling, a learner may overgeneralize "alternating means suspect" into "alternating means divergent," missing that convergence is governed purely by $|r|$, independent of $r$'s sign.

## Misconceptions
**MC-1 — SUM-FORMULA-ASSUMED-VALID-AT-R-EQUALS-ONE** *(Foundational)*
- Surface form: plugging $r=1$ into $S_n=\frac{a(1-r^n)}{1-r}$, producing $\frac00$, and either reporting the sum as undefined or not recognizing the error.
- Root cause: the derivation's division by $1-r$ is silently assumed always legal, without noticing it fails exactly when $r=1$.
- Repair: re-walk the derivation, pointing directly at the division-by-$(1-r)$ step as the exact place $r=1$ breaks it, then state the correct rule for that case: $r=1$ means every term equals $a$, so $S_n=na$ directly — no formula needed, no division involved.

**MC-2 — INFINITE-SUM-FORMULA-APPLIED-WITHOUT-VALIDITY-CHECK** *(High)*
- Surface form: applying $\frac{a}{1-r}$ for ANY ratio without checking $|r|<1$ — e.g. accepting $-12$ as "the sum" of the positive, growing series with $a=6,r=3/2$.
- Root cause: the formula is memorized as a computational rule without the accompanying understanding that it is the LIMIT of the partial sums, valid only when that limit actually exists.
- Repair: re-walk the partial sums for $a=6,r=3/2$ growing without bound ($6,15,28.5,\ldots$), contrasted directly against the formula's meaningless output of $-12$ — a series of positive, growing terms cannot possibly sum to a negative number, so the formula's output outside its validity condition must be discarded, not trusted.

**MC-3 — NEGATIVE-RATIO-ASSUMED-TO-BLOCK-CONVERGENCE** *(Moderate)*
- Surface form: believing an alternating geometric series (negative $r$) cannot converge, or cannot use the standard sum formulas, simply because the terms alternate sign.
- Root cause: alternating behavior is superficially associated with "trickier" or "divergent" series from prior exposure, without isolating that convergence for a GEOMETRIC series depends purely on $|r|<1$.
- Repair: re-walk the two-sided squeeze of the partial sums for $a=6,r=-\frac12$ — $6,3,4.5,3.75,\ldots$ — visibly closing in on $4=\frac{6}{1-(-1/2)}$ from both sides, converging exactly because $|-\frac12|=\frac12<1$, with the sign of $r$ affecting only the PATH (one-sided climb vs. two-sided squeeze), never whether convergence occurs.

## Analogies
- **The telescoping-cancellation analogy**: exactly as `math.seq.partial-sums`' own term-recovery relationship $a_n=S_n-S_{n-1}$ isolates one term by subtracting adjacent partial sums, this concept's derivation isolates the WHOLE sum by subtracting $S_n$ and its shifted copy $rS_n$ — the same cancellation principle at a different scale.
- **Anti-analogy — a valid-looking formula output is NOT automatically a valid answer.** This is MC-2's exact error: $\frac{a}{1-r}$ always produces SOME number when $r\ne1$, but that number is only meaningful when $|r|<1$ — a formula that computes is not the same as a formula that applies.

## Demonstrations
1. **The shift-multiply-subtract derivation, with the $r=1$ exception**: deriving $S_5=242$ for $a=2,r=3$ by writing $S_5$ and $3S_5$, subtracting to cancel the middle terms, matching both the formula and direct addition — then showing $a=2,r=1$ gives $\frac00$ in the formula but trivially $S_5=5\cdot2=10$ directly — directly breaking MC-1.
2. **The negative-ratio computation**: computing $S_4=5$ for $a=8,r=-\frac12$ via the formula, verified against direct addition $8-4+2-1=5$ — confirming the formula's validity is unaffected by sign, isolating the actual issue (careless sign arithmetic) from a false belief about convergence.
3. **The $|r|\ge1$ conflict demonstration**: plugging $a=6,r=\frac32$ into $\frac{a}{1-r}$ to get $-12$, directly contrasted against the series' actual positive, growing partial sums — directly breaking MC-2 — paired with the $a=6,r=-\frac12$ two-sided convergence — directly breaking MC-3.

## Discovery Questions
1. "If you write out $S_n$ and then $rS_n$ beneath it, what happens to the middle terms when you subtract?"
2. "The formula $S_n=\frac{a(1-r^n)}{1-r}$ requires dividing by $1-r$. What happens at $r=1$ — and what IS the actual sum of $n$ copies of the same number $a$?"
3. "If $a=6,r=\frac32$, the formula $\frac{a}{1-r}$ gives $-12$. Every term in this series is positive and growing. Can the sum really be $-12$?"

## Teaching Sequence
1. **Anchor in `math.seq.series` and `math.seq.geometric-sequence`**: state directly, "you've SEEN both these formulas quoted already — today you derive the first one and prove exactly when the second one is allowed."
2. **Representation shift (breaks MC-1)**: the full shift-multiply-subtract derivation for $a=2,r=3$, then the $r=1$ exception sprung immediately after.
3. **Sign-arithmetic practice**: the negative-ratio computation for $a=8,r=-\frac12$, isolating computational care from any false belief about convergence.
4. **Conflict evidence (breaks MC-2)**: the $a=6,r=\frac32$ direct conflict between the formula's output and the series' actual growing behavior.
5. **Contrast pair (breaks MC-3)**: $r=\frac13$'s one-sided climb to $9$ against $r=-\frac12$'s two-sided squeeze to $4$, both converging because $|r|<1$ in both cases.
6. **Mastery gate**: 4-item problem set (derive $S_4$ for $a=3,r=2$ showing the cancellation explicitly; compute $S_5$ for $a=4,r=-3$ with careful sign handling; compute $7+7+\cdots+7$ ($n$ terms, $r=1$) and explain why the general formula cannot be used; determine convergence and compute the infinite sum for three ratios spanning $|r|<1$, $|r|<1$ negative, and $|r|>1$) plus 1 independence-mode transfer probe (a bouncing-ball total-distance problem).

## Tutor Actions
- **Representation shift**: the shift-multiply-subtract derivation, immediately followed by the $r=1$ exception.
- **Sign-arithmetic practice**: a negative-ratio finite-sum computation, verified by direct addition.
- **Conflict evidence**: the $|r|>1$ formula-versus-reality contradiction for a positive, growing series.
- **Contrast pair**: a positive-ratio versus negative-ratio convergence comparison, both satisfying $|r|<1$.
- **Mastery gate**, 4-item problem set plus 1 transfer probe requiring a physical (bouncing-ball) application of the infinite sum.

## Voice Teaching Notes
- Open with the explicit division-of-labor statement: "you've already SEEN both formulas — today you'll see WHERE the first one comes from, and exactly WHEN the second one is allowed."
- For MC-1, whenever $r=1$ appears, insist the learner state the sum directly as $na$ rather than attempting the general formula.
- For MC-2, before accepting any infinite-sum answer, ask "is $|r|<1$?" as a standing, non-negotiable check.
- For MC-3, when a negative ratio appears, ask "does the SIGN of $r$ change whether it converges, or only the PATH the partial sums take?"

## Assessment Signals
- **Early warning for MC-1**: producing $\frac00$ for an $r=1$ case without recognizing the formula is invalid there, or claiming the sum is "undefined" instead of computing $na$ directly.
- **Early warning for MC-2**: reporting a numeric infinite-sum answer for $|r|\ge1$ without first checking or stating the validity condition.
- **Early warning for MC-3**: claiming a negative-ratio geometric series diverges, or cannot use the standard formulas, without checking $|r|$.
- **Mastery evidence**: correctly re-deriving the finite sum formula via the shift-and-subtract technique on a fresh $a,r$ pair, correctly handling the $r=1$ exception, and correctly determining convergence for a novel ratio (positive or negative) based on $|r|<1$ alone.

## Tutor Recovery Strategy
- On MC-1: re-derive the formula from scratch with the learner performing the subtraction step explicitly, then require them to state in their own words why $r=1$ makes the division illegal.
- On MC-2: present a FRESH divergent case (different $a,r$ than already seen) and require the learner to check $|r|<1$ BEFORE computing anything, rather than computing first and checking after.
- On MC-3: present a fresh negative-ratio case and require the learner to state $|r|$ explicitly before concluding convergence or divergence, separating the magnitude check from any assumption based on sign.
- If a learner masters the finite formula and the $r=1$ exception but cannot correctly apply the infinite-sum validity condition, treat this as a distinct limit-behavior gap (not a formula-derivation gap) and route to dedicated practice on $\lim_{n\to\infty}r^n$ across different ranges of $r$.

## Memory Hooks
- "Multiply by $r$, subtract, the middle vanishes" — the derivation technique.
- "$r=1$ breaks the division, not the sum — it's just $na$" — for MC-1.
- "Check $|r|<1$ before you trust the answer" — for MC-2.
- "Sign decides the path, not whether it converges" — for MC-3.

## Transfer Connections
- **`math.seq.geometric-sequence`** (prerequisite, already authored): supplies the explicit formula $a_n=ar^{n-1}$ whose terms this concept sums; sums were explicitly deferred there to this concept.
- **`math.seq.series`** (prerequisite, already authored): already quoted both geometric sum formulas as its own standing convergence instance, explicitly deferring their derivation and its own Teaching Notes instructed that the infinite formula be "derived from the partial sum formula... not just memorised" — the derivation work this concept exists to deliver.
- **`math.seq.partial-sums`** (sibling, authored this same batch): supplies the general term-recovery relationship $a_n=S_n-S_{n-1}$ and the general principle that a partial-sum FORMULA is the object whose limit gives the series sum — this concept is the specific geometric instance of that general machinery.
- **`math.seq.infinite-geometric-series`** (unlocked, not yet authored): per the Blueprint's own scoping note, this concept carries the infinite sum only to the $\frac{a}{1-r}$, $|r|<1$ result — deeper infinite-series treatment (e.g. repeating decimals, more delicate convergence discussion) is explicitly left to that child concept.

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: []`); the Blueprint's own transfer probe uses a physics-flavored bouncing-ball context (total downward distance across infinitely many bounces) purely as an application vehicle, not a formal cross-subject curriculum link, consistent with the KG's own record.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.seq.geometric-series.md`. All three worked examples (the $a=2,r=3$ derivation with the $r=1$ exception; the $a=5,r=2$ and $a=8,r=-\frac12$ computations; the $a=6,r=\frac13$, $r=-\frac12$, and $r=\frac32$ infinite-sum contrasts), the complete misconception registry (MC-1 Foundational, MC-2 High, MC-3 Moderate, none carrying an explicit birth-type column), and the bouncing-ball transfer probe are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `unlocks: math.seq.infinite-geometric-series`, `cross_links: []`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`) verified against the live KG — see Curriculum Feedback below: **zero discrepancy**.
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence`): "A ball is dropped from 8 meters. Each bounce returns it to $\frac34$ of its previous height. (a) Write the total downward distance the ball travels as a geometric series, identifying $a$ and $r$. (b) Compute the total downward distance traveled over infinitely many bounces, justifying why an infinite sum is legitimate here ($|r|<1$). (c) A skeptic objects: 'infinitely many bounces should mean infinite total distance.' Explain, using the behavior of the partial sums, why the total is finite even though the number of bounces is not." *(Expected: (a) $a=8,r=\frac34$: the total downward distance series is $8+8(\frac34)+8(\frac34)^2+\cdots$. (b) $\frac{8}{1-3/4}=32$ meters, legitimate since $|\frac34|<1$. (c) The partial sums $S_n$ approach $32$ from below and never exceed it — each additional bounce adds a strictly smaller amount, so the running total converges to a finite limit even though the number of terms is unbounded.)*, reused by reference.

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`).
- This entry EXPLICITLY RESOLVES `math.seq.arithmetic-sequence`'s own Batch 55 forward-reference gap: that entry's Curriculum Feedback flagged citing this concept's not-yet-existing Examples 2 and 3 (a decay/growth/oscillation comparison, and a $1000$-at-$5\%$-interest compound-interest computation) as parallel content — this concept's own Blueprint indeed contains neither example verbatim (its own worked examples are the shift-multiply-subtract derivation, sign-arithmetic practice, and the $|r|\ge1$ conflict/contrast demonstrations), so `arithmetic-sequence`'s citation was to a DIFFERENT, not-yet-authored sibling entry (`math.seq.geometric-sequence`, authored this same batch, which does carry a growth/decay/oscillation comparison), not to this concept — recorded here for completeness since both `geometric-sequence` and `geometric-series` share the "geometric" name and could otherwise be conflated in a future cross-reference check.

## Version History
- **2026-09-13 (Batch 59)**: authored as part of the Mathematics Educational Brain completion campaign. Unblocked by the already-authored `math.seq.geometric-sequence` (Batch 55) and `math.seq.series` (Batch 54). One of four concepts authored this batch (companions: `math.trig.product-to-sum`, `math.trig.hyperbolic-functions`, `math.seq.partial-sums`). `math.seq` moves from 5/21 toward 7/21 this batch.
