# math.seq.series — Series

## Identity
- **KG id**: `math.seq.series`
- **Domain**: math.seq (Sequences and Series)
- **Requires**: `math.seq.sequence`
- **Unlocks**: `math.seq.arithmetic-series`, `math.seq.geometric-series`
- **Cross-links**: none
- **Difficulty**: proficient · **Bloom level**: understand
- **Mastery threshold**: 0.8 · **Estimated hours**: 5

## Learning Objective
The learner defines a series as the limit of its sequence of partial sums, distinguishes a series (a running sum) from its underlying sequence (a list of terms), and correctly applies the nth-term test's one-directional logic — recognizing that terms approaching zero is necessary but never sufficient for convergence.

## Core Understanding
A **series** $\sum_{n=1}^{\infty}a_n$ is the sum of a sequence's terms: $a_1+a_2+a_3+\cdots$. This infinite sum is *defined* — not merely approximated — as the limit of the sequence of **partial sums** $S_n=a_1+a_2+\cdots+a_n$:
$$\sum_{n=1}^\infty a_n \;=\; \lim_{n\to\infty} S_n$$
The series **converges** to $S$ if this limit exists and is finite; it **diverges** if the limit doesn't exist or is infinite. Crucially, $\{S_n\}$ is itself a genuine sequence — its own limit *is* the series' sum, so every tool for sequence limits (already familiar territory) applies directly once the partial sums are correctly formed.

The **nth-term test** gives one rigorous, one-directional implication: if $\sum a_n$ converges, then $\lim_{n\to\infty}a_n=0$ (the terms must vanish, or the running sum could never settle). Its **contrapositive** is the practically useful direction: if $\lim a_n\ne0$, the series definitely diverges. But the **converse is false** — $\lim a_n=0$ does **not** guarantee convergence. The harmonic series $\sum 1/n$ is the canonical counterexample: its terms vanish, yet its partial sums grow without bound (provably, by grouping). Terms vanishing is *necessary* but never *sufficient*.

Two special series recur throughout later work: the **geometric series** $\sum r^{n-1}$ converges to $\frac{a}{1-r}$ for $|r|<1$ and diverges for $|r|\ge1$; and **telescoping series**, where a partial-fraction decomposition causes interior terms to cancel, leaving a simple closed form for $S_n$ whose limit is immediate.

## Mental Models
- **Zeno's paradox, resolved.** Walking $1$ metre requires first walking $1/2$, then half of what remains ($1/4$), then $1/8$, and so on forever — yet the wall is reached in finite time. The series $1/2+1/4+1/8+\cdots$ has partial sums $S_n=1-1/2^n\to1$: infinitely many steps, finite total, because the steps shrink fast enough.
- **A series is a running total, not a list.** The sequence $\{a_n\}$ is a fixed list of ingredients; the series is the accumulating tally as those ingredients are added one at a time — two genuinely different objects built from the same numbers.
- **Necessary, not sufficient.** "Terms $\to0$" rules out only the *obvious* kind of divergence (terms staying away from zero); it says nothing about whether the accumulating sum still manages to grow without bound, which is exactly what the harmonic series does.

## Why Students Fail
This Blueprint's three misconceptions are independently classified here, consistent with virtually every math.seq Blueprint this campaign lacking an explicit birth-type column:
- **MC-1** is a **Type 1 (overgeneralization)**: since both the sequence and the series are built from the identical terms $a_n$, the surface similarity (same numbers involved) overrides the structural difference (list vs. running sum), which is genuinely subtle and requires holding two related-but-distinct objects in mind at once.
- **MC-2** is a **Type 2 (perceptual intuition)** conflict: everyday experience says "adding more always increases the total," so the idea that infinitely many positive additions can sum to something finite directly contradicts intuition built from finite, everyday arithmetic.
- **MC-3** is a **Type 1 (overgeneralization)**, specifically a logical-converse error: the nth-term test's true statement ("diverges if terms don't vanish") gets silently inverted into the false statement ("converges if terms do vanish") — a natural but incorrect symmetry assumption, and one that persists until the harmonic series is presented as an explicit, concrete counterexample.

## Misconceptions
**MC-1 — SERIES-IS-A-SEQUENCE** *(Foundational, Type 1)*
- Surface form: "The series $1+1/2+1/4+\cdots$ is just the sequence $(1,1/2,1/4,\ldots)$. They're the same thing."
- Root cause: both objects are built from the identical terms $a_n$; the list-vs-running-sum distinction is easy to lose without deliberate emphasis.
- Repair: name the two objects side by side — the sequence $\{a_n\}=(1/2,1/4,1/8,\ldots)$ is a *list*; the series $\sum a_n$ is that list's *running total* ($1/2$, then $1/2+1/4=3/4$, then $3/4+1/8=7/8$, $\ldots$). Same numbers, two different mathematical objects, and mixing them up breaks every convergence argument.

**MC-2 — INFINITE-SUM-CANT-CONVERGE** *(Type 2)*
- Surface form: "$1/2+1/4+1/8+\cdots$ is infinite because you never stop adding."
- Root cause: everyday finite-arithmetic intuition ("adding more always increases the total") contradicts the possibility that infinitely small additions can sum to a bounded finite total.
- Repair: Zeno's paradox — the walk to the wall takes infinitely many steps yet finishes in finite time, because the steps shrink fast enough; algebraically, $S_n=1-1/2^n\to1$ exactly, never exceeding $1$.

**MC-3 — CONVERGENT-TERMS-IMPLY-CONVERGENT-SERIES**
- Surface form: "Since $1/n\to0$, the series $1+1/2+1/3+1/4+\cdots$ must converge."
- Root cause: inverting the nth-term test's true one-directional implication into a false converse.
- Repair: the harmonic series' grouping proof — $1+(1/2)+(1/3+1/4)+(1/5+\cdots+1/8)+\cdots$, where each parenthesized group exceeds $1/2$, and there are infinitely many groups, so the partial sums grow without bound despite every individual term vanishing. Terms going to $0$ rules out only *fast* divergence; it never guarantees convergence.

## Analogies
- **The Zeno's-paradox bridge** (already stated in full under Mental Models): the canonical resolution of "how can infinitely many steps finish in finite time," directly mapped onto "how can infinitely many additions sum to a finite total."
- **Anti-analogy — a series is NOT "the sequence, just written with plus signs instead of commas."** That framing treats the notational change as cosmetic; the actual change is structural — a fixed list becomes an accumulating, ever-growing partial-sum sequence, which is precisely MC-1's blind spot.

## Demonstrations
1. **Partial-sum table for $\sum(1/2)^n$**: build $S_1=1/2$, $S_2=3/4$, $S_3=7/8$, $S_4=15/16$ row by row, watching the running total approach (but never reach) $1$.
2. **Zeno's-paradox narration**: walk through the halving steps toward the wall, mapping each step to a term $a_n$ and the accumulated distance to $S_n$.
3. **Harmonic-series grouping proof**: group the harmonic series' terms into blocks that each exceed $1/2$ ($1$; $1/2$; $1/3+1/4$; $1/5+\cdots+1/8$; $\ldots$), showing the partial sums are forced past every bound despite each individual term shrinking to $0$.
4. **Telescoping worked example**: decompose $1/(n(n+2))=\frac12\left(\frac1n-\frac1{n+2}\right)$, watch interior terms cancel in the partial sum, and take the limit to find the exact series sum.

## Discovery Questions
1. "Is the sequence $(1/2,1/4,1/8,\ldots)$ the same object as the series $1/2+1/4+1/8+\cdots$? What's different about them, even though they use the same numbers?"
2. "Does $1/2+1/4+1/8+1/16+\cdots$ ever exceed $1$? Compute the first five partial sums and see what they approach."
3. "The harmonic series $1+1/2+1/3+\cdots$ has terms that shrink to $0$. Does that guarantee it converges? Try grouping the terms into blocks that each add up to at least $1/2$ — how many such blocks can you find?"

## Teaching Sequence
1. **Anchor in `math.seq.sequence`**: restate a sequence as an indexed list, then introduce the series as that list's running sum — the entry point this concept's own analogy bridge (Zeno's paradox) is designed to make concrete immediately.
2. **Analogy bridge (breaks MC-1 and MC-2 together)**: Zeno's paradox mapped onto the geometric series $\sum(1/2)^n$, contrasted against a genuinely divergent series ($\sum 1$, whose partial sums grow unboundedly because the terms don't shrink) to show what *does* fail.
3. **Contrast pair (breaks MC-3)**: convergent geometric series vs. the divergent harmonic series, both with terms $\to0$, ending in the explicit statement "terms going to zero is necessary but not sufficient" and the grouping proof.
4. **Pattern induction**: geometric series formula $\frac{a}{1-r}$, telescoping via partial fractions, and alternating series (partial sums zigzag but still converge if terms decrease to $0$) — three recurring series *shapes* the learner will meet repeatedly.
5. **Mastery gate**: 4-item problem set (partial sums of a geometric series, harmonic-series convergence, a true/false converse item, a geometric-series-sum computation) plus 1 independence-mode transfer probe (a telescoping series requiring partial-fraction decomposition and limit-taking).

## Tutor Actions
- **Analogy bridge** (MC-1/MC-2): Zeno's paradox mapped onto a concrete convergent geometric series, contrasted with a genuinely divergent one.
- **Contrast pair** (MC-3): convergent vs. divergent series that both have vanishing terms, ending in the harmonic-series grouping proof.
- **Pattern induction**: geometric, telescoping, and alternating series as three recurring shapes.
- **Mastery gate**, 4-item problem set plus 1 transfer probe on a telescoping series.

## Voice Teaching Notes
- Say the sequence/series distinction aloud as two separate nouns every time: "the *list* of terms" vs. "the *running total*" — reinforcing the object distinction verbally, not just symbolically, to counter MC-1.
- For MC-2, narrate Zeno's paradox as a lived physical experience ("you keep walking, the steps get smaller and smaller, and you DO reach the wall") before showing the algebra — the intuitive resolution should land before the formal proof.
- For the nth-term test, state the one valid direction and the invalid converse explicitly and separately every time: "terms not vanishing means DEFINITELY diverges — but terms vanishing means only MAYBE converges" — never conflate the two directions in a single sentence.

## Assessment Signals
- **Early warning for MC-1**: treating "does the sequence converge" and "does the series converge" as the same question, or answering one when asked about the other.
- **Early warning for MC-2**: asserting an infinite sum "must" be infinite without checking whether the terms actually shrink fast enough.
- **Early warning for MC-3**: concluding a series converges solely because its terms visibly approach $0$, without checking against a known counterexample or applying a genuine convergence test.
- **Mastery evidence**: correctly stating the one-directional nth-term test (never its false converse), and successfully distinguishing "terms $\to0$, series converges" (e.g. $\sum1/n^2$) from "terms $\to0$, series diverges" (the harmonic series) using more than the terms' limiting behavior alone.

## Tutor Recovery Strategy
- On MC-1: return to the explicit side-by-side naming (list vs. running total) rather than restating the definitions abstractly — the misconception is a category confusion and needs the two objects placed next to each other, not redefined in isolation.
- On MC-2: re-walk Zeno's paradox concretely, including the partial-sum numbers themselves ($1/2,3/4,7/8,15/16,\ldots\to1$) — an abstract assurance that "it converges" doesn't resolve the finite-intuition conflict; seeing the numbers approach a bound does.
- On MC-3: use the harmonic series' grouping proof specifically, not merely asserting "it diverges" — the misconception is a logical inversion, and only a concrete counterexample with a visible mechanism (blocks exceeding $1/2$ forever) reliably corrects it.
- If a learner passes the nth-term-test reasoning but fails to execute a geometric-series-sum or telescoping computation, treat this as a separate procedural gap and return to the relevant pattern-induction worked example rather than re-drilling the convergence-criterion logic.

## Memory Hooks
- "Same numbers, different object — a list vs. a running total" — for MC-1.
- "The steps shrink fast enough — Zeno reaches the wall" — for MC-2.
- "Terms vanishing is necessary, never sufficient — ask the harmonic series" — for MC-3.

## Transfer Connections
- **`math.seq.arithmetic-series`** and **`math.seq.geometric-series`** (both unlocked): each is a special case of the general series framework established here, with an explicit closed-form partial-sum formula this concept's own geometric-series instance (Teaching Sequence step 4) already previews.
- **`math.seq.sequence`** (prerequisite, already authored): the partial-sum sequence $\{S_n\}$ this concept relies on is itself an ordinary sequence — every sequence-limit tool from that entry applies directly once $S_n$ is correctly formed, a connection this entry's Core Understanding states explicitly.

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: []`), and none are asserted here beyond the KG's own record.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.seq.series.md` (older 10-component format: Metadata, Cognitive Map, Misconception Registry, Scaffolding Protocol, Protocol A main sequence with 3 teaching actions plus the mastery gate, Protocol B repair sequences, P89 spaced repetition, Cross-Blueprint Dependencies, Teaching Notes, Validation Checklist). All worked examples (the $\sum(1/2)^n$ partial-sum table, the harmonic-series grouping proof, the geometric/telescoping/alternating series instances), the complete misconception registry (MC-1/MC-2/MC-3, none carrying an explicit birth-type column), and the spaced-repetition schedule are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- **Curriculum Feedback — one genuine discrepancy, resolved toward the KG (not fixed).** The Blueprint's Component 7 (Cross-Blueprint Dependencies) lists three "Unlocked blueprints" — `math.seq.arithmetic-series`, `math.seq.geometric-series`, and `math.seq.partial-sums` — but the live KG's `unlocks` field for this concept lists only the first two (`['math.seq.arithmetic-series', 'math.seq.geometric-series']`); `math.seq.partial-sums` does not appear. This entry's Identity and Transfer Connections sections above follow the KG.
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence` and `cross_links: []`): "Consider the series $\sum_{n=1}^\infty \frac{1}{n(n+1)}$. (a) Use partial fractions to write $\frac{1}{n(n+1)}=\frac{A}{n}+\frac{B}{n+1}$. (b) Write out the first three partial sums $S_1,S_2,S_3$. What telescoping pattern do you see? (c) Find a formula for $S_n$ and take the limit as $n\to\infty$. What is the sum of the series?" *(Expected: (a) $\frac1n-\frac1{n+1}$ ($A=1$, $B=-1$). (b) $S_1=1/2$, $S_2=2/3$, $S_3=3/4$; interior terms cancel, leaving $S_n=1-\frac1{n+1}$. (c) $\lim_{n\to\infty}\left(1-\frac1{n+1}\right)=1$ — the series sums to $1$.)*

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **One genuine Blueprint/KG discrepancy found, resolved toward the KG (not fixed in the Blueprint)**: the Blueprint's own "Unlocked blueprints" list names `math.seq.partial-sums` as a third downstream concept, but the live KG's `unlocks` field for `math.seq.series` names only `math.seq.arithmetic-series` and `math.seq.geometric-series` — recorded in Blueprint References above; the KG is followed here, per this program's standing rule of never fixing the KG.
- All other Blueprint metadata fields (`requires`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`, `P76_mode: independence`) match the live KG exactly.

## Version History
- **2026-09-12 (Batch 54)**: authored as part of the Mathematics Educational Brain completion campaign. One of two `math.seq` concepts authored this batch (companion: `math.seq.convergent`), both unblocked by the already-authored `math.seq.sequence` (Batch 52) and, for `convergent`, `math.calc.limits` (Batch 35). `math.seq` moves from 1/21 to 3/21 this batch. Records a genuine Blueprint/KG `unlocks`-field discrepancy (see Curriculum Feedback), resolved toward the KG. Unlocks `math.seq.arithmetic-series` and `math.seq.geometric-series` (neither yet authored).
