# Teaching Blueprint: Geometric Series (`math.seq.geometric-series`)

## Component 0 — Concept Metadata

| Field | Value |
|---|---|
| concept_id | `math.seq.geometric-series` |
| name | Geometric Series |
| domain | Sequences & Series |
| difficulty | proficient |
| bloom | apply |
| mastery_threshold | 0.85 → MAMR = ⌈0.85×5⌉ = 5/5 |
| estimated_hours | 6 |
| requires | `math.seq.geometric-sequence`, `math.seq.series` |
| unlocks | `math.seq.infinite-geometric-series` |
| cross_links | none |
| CPA_entry_stage | A (Abstract) — proficient learner arrives with symbolic command of `math.seq.geometric-sequence`'s own explicit formula $a_n=ar^{n-1}$ and `math.seq.series`'s own partial-sum concept; the new work (the shift-multiply-subtract derivation) is inherently algebraic, with `math.seq.series`'s own successive-halving picture available as prior pictorial grounding |
| description (KG) | The sum of the first n terms of a GP: Sₙ = a(1−rⁿ)/(1−r); extends to an infinite series converging to a/(1−r) when \|r\| < 1. |

## Component 1 — Learning Objectives

- LO1: Derive the finite geometric sum formula $S_n = \dfrac{a(1-r^n)}{1-r}$ from `math.seq.geometric-sequence`'s own explicit formula, using the multiply-by-$r$-and-subtract technique (writing $S_n$ and $rS_n$, subtracting so the middle terms cancel) — and recognize precisely why the formula FAILS at $r=1$ (division by zero), with the correct replacement $S_n = na$ in that case.
- LO2: Apply the finite sum formula to compute $S_n$ for geometric series with ARBITRARY first term and ratio — including negative ratios — executing the arithmetic reliably (correct exponent $n$, not $n-1$, in $r^n$; correct sign handling when $r<0$).
- LO3: Determine the INFINITE geometric series sum $\dfrac{a}{1-r}$ when $|r|<1$ as the LIMIT of the partial sums $S_n$ (because $r^n \to 0$), using `math.seq.series`'s own convergence definition — and correctly recognize divergence whenever $|r| \ge 1$, refusing to apply the infinite-sum formula outside its validity condition.

## Component 2 — Prerequisite Check

Assumes mastery of `math.seq.geometric-sequence` (the explicit formula $a_n = ar^{n-1}$; recognizing first term $a$ and common ratio $r$) and `math.seq.series` (partial sums $S_n$; convergence of a series as the limit of its partial-sum sequence; the geometric series already met there as the standing INSTANCE of a convergent series, with its formulas quoted but their derivation explicitly deferred).

## Component 3 — Core Explanation

**The finite sum formula comes from one clean algebraic move — multiply by $r$ and subtract**: writing out $S_n = a + ar + ar^2 + \dots + ar^{n-1}$ (the sum of `math.seq.geometric-sequence`'s own first $n$ terms) and beneath it $rS_n = ar + ar^2 + \dots + ar^{n-1} + ar^n$ (every term shifted one slot right by the extra factor of $r$), subtracting kills EVERY overlapping middle term at once, leaving only the two ends: $S_n - rS_n = a - ar^n$. Factoring both sides gives $S_n(1-r) = a(1-r^n)$, and dividing by $(1-r)$ yields the formula $S_n = \dfrac{a(1-r^n)}{1-r}$. This derivation is the concept's core — the formula is not a fact to memorize but the visible residue of the telescoping cancellation.

**The $r=1$ case is a genuine exception, visible directly in the derivation**: dividing by $(1-r)$ is only legal when $r \neq 1$ — at $r=1$ the derivation's final step divides by zero, and the formula is simply INVALID there. But the $r=1$ case needs no formula at all: every term equals $a$ (the ratio multiplies by 1), so the sum of $n$ identical terms is $S_n = na$ directly. A geometric series thus has TWO sum rules — the formula for $r \neq 1$, and $na$ for $r=1$ — and plugging $r=1$ into the general formula is a division-by-zero error, not a computation.

**The infinite sum is the LIMIT of the finite sums, and exists ONLY when $|r|<1$**: `math.seq.series`'s own convergence definition says an infinite series' sum is the limit of its partial sums $S_n$ — and in $S_n = \dfrac{a(1-r^n)}{1-r}$, the ONLY $n$-dependent piece is $r^n$. When $|r|<1$, $r^n \to 0$ (regardless of $r$'s sign — $(-1/2)^n$ shrinks in absolute value just as $(1/2)^n$ does, merely alternating sign on the way down), so $S_n \to \dfrac{a}{1-r}$. When $|r| \ge 1$, $r^n$ does NOT tend to zero ($|r|>1$ blows up; $r=-1$ oscillates; $r=1$ gives $S_n = na \to \infty$), so the partial sums have no limit and the series DIVERGES — the formula $\dfrac{a}{1-r}$ still produces a NUMBER when $|r|>1$, but that number is meaningless: the validity condition $|r|<1$ is part of the formula, not an optional footnote.

## Component 4 — Worked Examples

**Example 1 (LO1 — the shift-multiply-subtract derivation, and the $r=1$ exception, breaking MC-1)**: deriving $S_5$ for $a=2, r=3$ from scratch: $S_5 = 2 + 6 + 18 + 54 + 162$ and $3S_5 = 6 + 18 + 54 + 162 + 486$; subtracting, all four middle terms cancel: $S_5 - 3S_5 = 2 - 486$, so $-2S_5 = -484$ and $S_5 = 242$ — matching the formula $\dfrac{2(1-3^5)}{1-3} = \dfrac{2(-242)}{-2} = 242$ and direct addition ($2+6+18+54+162=242$). Then the exception: for $a=2, r=1$, the "series" is $2+2+2+2+2$, and the formula gives $\dfrac{2(1-1^5)}{1-1} = \dfrac{0}{0}$ — undefined, division by zero — while the correct sum is trivially $S_5 = 5 \cdot 2 = 10 = na$.

**Example 2 (LO2 — arbitrary first term and NEGATIVE ratio, breaking MC-3's sign anxiety at the finite stage)**: (a) $a=5, r=2, n=6$: $S_6 = \dfrac{5(1-2^6)}{1-2} = \dfrac{5(1-64)}{-1} = \dfrac{5(-63)}{-1} = 315$. (b) $a=8, r=-\tfrac12, n=4$: $S_4 = \dfrac{8\left(1-(-\tfrac12)^4\right)}{1-(-\tfrac12)} = \dfrac{8(1-\tfrac1{16})}{\tfrac32} = \dfrac{8 \cdot \tfrac{15}{16}}{\tfrac32} = \dfrac{\tfrac{15}{2}}{\tfrac32} = 5$ — checking directly: $8 - 4 + 2 - 1 = 5$. The negative ratio changes nothing about the FORMULA's validity; it only requires careful sign arithmetic ($(-\tfrac12)^4 = +\tfrac1{16}$, and the denominator becomes $1+\tfrac12$).

**Example 3 (LO3 — the infinite sum as a limit, and refusing the formula when $|r| \ge 1$, breaking MC-2)**: (a) $a=6, r=\tfrac13$: $S_n = \dfrac{6(1-(\tfrac13)^n)}{\tfrac23} = 9\left(1-(\tfrac13)^n\right)$, and since $(\tfrac13)^n \to 0$, $S_n \to 9 = \dfrac{6}{1-\tfrac13}$ — the infinite sum is $9$. (b) $a=6, r=-\tfrac12$: $|r| = \tfrac12 < 1$, so the series converges despite the alternating signs: sum $= \dfrac{6}{1-(-\tfrac12)} = \dfrac{6}{\tfrac32} = 4$ (partial sums $6, 3, 4.5, 3.75, \dots$ visibly closing in on 4 from both sides). (c) $a=6, r=\tfrac32$: NAIVELY plugging into the formula gives $\dfrac{6}{1-\tfrac32} = -12$ — an absurd "sum" for a series of strictly POSITIVE, GROWING terms ($6 + 9 + 13.5 + \dots$). The partial sums grow without bound, the series DIVERGES, and the $-12$ is exactly what the validity condition $|r|<1$ exists to forbid.

## Component 5 — Teaching Actions

### Teaching Action A01 — The Formula Is a Cancellation, Not a Fact (Primitive P11: Representation Shift)

State: "`math.seq.series` already SHOWED you the geometric sum formula as its standing example of convergence — today you OWN it: write the sum, multiply the whole line by $r$, and subtract. Every middle term dies, and the formula is what's left." Walk Example 1's full derivation for $a=2, r=3$, then spring the $r=1$ case.

- **MC-1 hook**: ask "what does the formula give for $2+2+2+2+2$ — that is, $a=2, r=1, n=5$?" — a learner who plugs in and reports "$0/0$" without recognizing the formula is INVALID there (or who claims the sum is undefined) reveals MC-1 (missing that $r=1$ needs the separate rule $S_n = na$, because the derivation's division by $1-r$ was illegal).

### Teaching Action A02 — The Infinite-Sum Formula Has a Validity Condition, and Violating It Produces Nonsense (Primitive P28: Conflict Evidence)

Present Example 3(c)'s direct conflict: $a=6, r=\tfrac32$ plugged into $\dfrac{a}{1-r}$ yields $-12$, yet every term is positive and growing — the "sum" of $6+9+13.5+\cdots$ cannot possibly be negative. State: "the formula $\dfrac{a}{1-r}$ is only the LIMIT of the partial sums when $r^n \to 0$, which happens exactly when $|r|<1$ — outside that condition the algebra still produces a number, but it's the answer to no question."

- **MC-2 hook**: ask "the formula $\dfrac{a}{1-r}$ gives $-12$ for $a=6, r=\tfrac32$ — is $-12$ the sum of that series?" — a "yes, the formula says so" answer reveals MC-2 (applying the infinite-sum formula with no validity check).

### Teaching Action A03 — Convergence Depends on $|r|$, Not on $r$'s Sign (Primitive P06: Contrast Pair)

Contrast Example 3(a)'s $r=\tfrac13$ (all-positive terms, partial sums climbing steadily to 9) against Example 3(b)'s $r=-\tfrac12$ (alternating terms, partial sums closing in on 4 from BOTH sides) — both converge, because in both cases $|r|<1$ forces $r^n \to 0$. State: "the sign of $r$ changes the PATH the partial sums take (one-sided climb vs. two-sided squeeze), but convergence is decided by $|r|$ alone."

- **MC-3 hook**: ask "the series $6 - 3 + \tfrac32 - \tfrac34 + \cdots$ has ratio $r=-\tfrac12$ — do the alternating signs prevent it from converging?" — a "yes, alternating series like this diverge/can't be summed by the formula" answer reveals MC-3 (testing $r \ge -1$ or the sign of $r$ instead of $|r|<1$).

### Teaching Action A04 — Mastery Gate (Primitive P91)

P91 = P77 → P55 → P76 → P55 → P75 → P55 → P74 → P55 → P78.

- **P77 (4-problem set)**:
  1. Derive the sum formula for $S_4$ with $a=3, r=2$ using the multiply-by-$r$-and-subtract technique, showing the cancellation explicitly, and verify by direct addition.
  2. Compute $S_5$ for $a=4, r=-3$, handling the signs carefully, and check by direct addition.
  3. Compute the sum $7 + 7 + 7 + \dots$ ($n$ terms, $r=1$), and explain precisely why the general formula cannot be used here.
  4. For each series, decide convergence and (where valid) compute the infinite sum: (a) $a=10, r=\tfrac25$; (b) $a=10, r=-\tfrac45$; (c) $a=10, r=\tfrac54$.
- **P76 (Transfer Probe, mode = independence — no cross-link target listed in the KG for this concept)**: "A ball is dropped from 8 meters. Each bounce returns it to $\tfrac34$ of its previous height. (a) Write the total DOWNWARD distance the ball travels (the initial drop plus every subsequent fall) as a geometric series, identifying $a$ and $r$. (b) Compute the total downward distance traveled over infinitely many bounces, justifying why an infinite sum is legitimate here ($|r|<1$). (c) A skeptic objects: 'infinitely many bounces should mean infinite total distance.' Explain, using the behavior of the partial sums, why the total is finite even though the number of bounces is not."
- **P55 (Score)** after each stage.
- **P75 (Mastery Assessment against MAMR = 5/5)**.
- **P74 (Routing Decision)**: MAMR met → P78 (Completion). MAMR not met → route to the specific missed primitive's repair action before re-attempting P77.

## Component 6 — Misconception Registry

| ID | Label | Description | Severity |
|---|---|---|---|
| MC-1 | SUM-FORMULA-ASSUMED-VALID-AT-R-EQUALS-ONE | Plugging $r=1$ into $S_n = a(1-r^n)/(1-r)$ (producing $0/0$) instead of recognizing the derivation's division by $1-r$ is illegal there and the correct sum is $S_n = na$ | Foundational |
| MC-2 | INFINITE-SUM-FORMULA-APPLIED-WITHOUT-VALIDITY-CHECK | Applying $a/(1-r)$ for ANY ratio, missing that the formula is the limit of partial sums only when $\|r\|<1$ — e.g., accepting $-12$ as the "sum" of the positive growing series with $a=6, r=3/2$ | High |
| MC-3 | NEGATIVE-RATIO-ASSUMED-TO-BLOCK-CONVERGENCE | Believing an alternating geometric series (negative $r$) cannot converge or cannot use the sum formulas, missing that convergence is governed by $\|r\|<1$ regardless of sign | Moderate |

- **B01 (targets MC-1)**: P27 (name it: "Sum Formula Assumed Valid at r Equals One") → P41 (detect: ask for the sum of $n$ copies of $a$ via the formula) → P64 (conceptual shift: re-walk Example 1's derivation, pointing at the division-by-$(1-r)$ step as the exact place $r=1$ breaks it).
- **B02 (targets MC-2)**: P27 (name it: "Infinite Sum Formula Applied Without Validity Check") → P41 (detect: ask whether $-12$ is the sum of $6+9+13.5+\cdots$) → P64 (conceptual shift: re-walk Example 3(c)'s partial sums growing without bound, against the formula's meaningless output).
- **B03 (targets MC-3)**: P27 (name it: "Negative Ratio Assumed to Block Convergence") → P41 (detect: ask whether $r=-\tfrac12$'s alternating series converges) → P64 (conceptual shift: re-walk Example 3(b)'s two-sided squeeze of the partial sums onto 4).

## Component 7 — Cross-Blueprint Dependencies

- **Requires**: `math.seq.geometric-sequence` (explicit formula $a_n = ar^{n-1}$, whose terms this concept sums), `math.seq.series` (partial sums and the convergence-as-limit definition this concept's infinite case instantiates).
- **Unlocks**: `math.seq.infinite-geometric-series` (deeper treatment of the infinite case this concept establishes at the limit level; not yet authored — noted, not assumed).
- **Cross-link**: KG lists none for this concept. $P76_{mode}=$ **independence** (no cross-link target to check).

## Component 8 — Teaching Notes

- estimated_hours = 6 with a proficient/apply tag supports the "3 TAs + gate" tier, with LO1 owning the derivation this concept exists to deliver, LO2 securing reliable finite-sum computation across sign cases, and LO3 handling the infinite extension with its validity condition.
- **Division of labor**: `math.seq.series` already introduced the geometric series as its standing INSTANCE of convergence — it quotes both formulas ($S_n=(1-r^n)/(1-r)$ for the normalized case, and $a/(1-r)$ for $|r|<1$) and its own Teaching Notes explicitly instruct that the infinite formula be "derived from the partial sum formula... not just memorised," deferring that derivation work here (verified by grep: `math.seq.series.md` presents the formulas within its general convergence framework but contains no multiply-by-$r$-and-subtract derivation and no $r=1$ exception treatment). This concept owns: the shift-multiply-subtract derivation itself, the $r=1$ exception, arbitrary-first-term and negative-ratio computation, and the explicit refusal of the infinite formula when $|r| \ge 1$. `math.seq.geometric-sequence` owns the explicit-formula groundwork (verified there: sums deferred to this concept via its own unlocks note).
- The KG lists `math.seq.infinite-geometric-series` as this concept's unlock and only child — per the KG description, THIS concept carries the infinite sum to the $a/(1-r)$, $|r|<1$ result (LO3), while deeper infinite-series treatment (e.g., repeating decimals, more delicate convergence discussion) belongs to the child concept when authored. LO3 was therefore scoped to the limit-of-partial-sums result and the validity condition, no further.

## Component 9 — (intentionally omitted, per established corpus convention)

## Component 10 — Validation Checklist

| ID | Check | Status |
|---|---|---|
| V-1 | concept_id matches filename | PASS |
| V-2 | All 3 LOs map to at least one TA | PASS |
| V-3 | requires resolves in KG | PASS |
| V-4 | unlocks concepts named accurately from KG | PASS (`math.seq.infinite-geometric-series`) |
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
| V-15 | CPA_entry_stage justified | PASS (Abstract: symbolic command of the explicit GP formula and partial sums already in place; the derivation is algebraic) |
| V-16 | Worked examples cover all LOs | PASS (Ex1→LO1, Ex2→LO2, Ex3→LO3) |
| V-17 | Teaching Notes justify structural choices | PASS |
| V-18 | No architecture/runtime/schema changes | PASS (blueprint authoring only) |
| V-19 | KG description terms reflected accurately | PASS |
| V-20 | Component numbering matches established convention (0-8, 10; 9 skipped) | PASS |
| AIR | Anti-Illusion-of-Retention: gate requires genuine transfer probe, not just repetition | PASS |
