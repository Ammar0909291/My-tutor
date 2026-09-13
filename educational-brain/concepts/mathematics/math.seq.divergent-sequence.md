# math.seq.divergent-sequence — Divergent Sequence

## Identity
- **KG id**: `math.seq.divergent-sequence`
- **Domain**: math.seq (Sequences & Series)
- **Requires**: `math.seq.convergent`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: advanced · **Bloom level**: analyze
- **Mastery threshold**: 0.75 · **Estimated hours**: 4

## Learning Objective
The learner defines divergence as the logical negation of convergence, classifies sequences into three divergence types (unbounded positive, unbounded negative, bounded oscillation), proves that a bounded sequence is not automatically convergent (the oscillating counterexample), states the Monotone Convergence Theorem and applies its contrapositive as a divergence criterion, and correctly distinguishes alternating sign from divergence — recognizing that $|a_n|\to0$ forces convergence regardless of sign pattern.

## Core Understanding
`math.seq.convergent` already established the formal $\varepsilon$-$N$ definition of convergence. This concept does not re-derive that definition — it takes its logical negation as the DEFINITION of divergence, and builds the taxonomy and diagnostic tools that follow from treating "not convergent" precisely rather than intuitively.

**Divergence is the exact logical negation of convergence, not an intuitive notion of "blowing up"**: $\{a_n\}$ converges to $L$ iff $\forall\varepsilon>0\,\exists N\in\mathbb{N}$ such that $n>N\Rightarrow|a_n-L|<\varepsilon$. Negating this precisely: $\{a_n\}$ DIVERGES iff for every candidate limit $L$, there exists some $\varepsilon_L>0$ such that infinitely many terms fail to stay within $\varepsilon_L$ of $L$. In plain terms: no matter which real number is proposed as a limit, the sequence eventually strays too far from it, over and over, no matter how far out you look.

**There are exactly three divergence types, and only one of them "blows up"**: diverging to $+\infty$ (e.g. $a_n=n$, unbounded above), diverging to $-\infty$ (e.g. $a_n=-n$, unbounded below), and OSCILLATING — bounded, yet with no single limit (e.g. $a_n=(-1)^n$, which stays in $\{-1,+1\}$ forever yet diverges). "Diverges" means "does not converge" — it does NOT mean "grows without bound."

**Boundedness alone does not guarantee convergence — this is the single most important correction this concept makes**: $\{(-1)^n\}$ is bounded (every term lies in $[-1,1]$) and STILL diverges, because it never settles near any single value. The Monotone Convergence Theorem supplies the missing ingredient: if $\{a_n\}$ is monotone AND bounded, then it converges. Its contrapositive gives a divergence criterion: if $\{a_n\}$ is monotone but unbounded, it diverges (to $\pm\infty$); if $\{a_n\}$ is not monotone, the theorem is simply silent — other analysis is needed.

**Alternating sign does not, by itself, determine convergence or divergence — the absolute value is decisive**: $\{(-1)^n/n\}$ alternates sign forever, yet CONVERGES to $0$, because $|a_n|=1/n\to0$ forces the sequence into any $\varepsilon$-neighborhood of $0$ for large $n$ (a direct squeeze-theorem argument: $-1/n\le a_n\le1/n$, both sides $\to0$). Alternating sign is irrelevant once $|a_n|\to0$; what matters is whether the terms' distance from a candidate limit shrinks, not whether their sign flips.

## Mental Models
- **Divergence is a precise negation, not a vague catch-all.** "Does not converge" has an exact logical form, and it captures oscillation just as validly as blowing up to infinity.
- **Bounded and monotone together guarantee convergence — either alone does not.** The Monotone Convergence Theorem's TWO conditions are both necessary; boundedness by itself only rules out unbounded divergence, leaving oscillating divergence fully possible.
- **Check the absolute value first when signs alternate.** If $|a_n|\to0$, the sequence converges to $0$ regardless of how the sign pattern looks — the sign modulates position, it does not prevent convergence.

## Why Students Fail
This Blueprint's three misconceptions carry no explicit birth-type column, so each is independently classified here:
- **MC-1** is a **Type 1 (overgeneralization)**: a learner's early experience is dominated by bounded sequences that DO converge (e.g. $1/n$), so "bounded" and "converges" become associated, overgeneralizing past the genuine counterexample class of bounded, non-monotone, oscillating sequences.
- **MC-2** is a **Type 3 (language contamination)**: the everyday word "diverge" outside mathematics typically connotes "spread apart" or "grow apart," which maps naturally onto "blows up to infinity" but not onto "oscillates while staying bounded" — the informal meaning of the word actively misleads about the formal definition's scope.
- **MC-3** is a **Type 2 (perceptual intuition)**: a sequence whose terms visibly flip sign every step LOOKS unsettled and erratic, a strong perceptual cue toward "this can't be converging," which overrides the correct check (does the absolute value shrink to zero) in favor of a surface impression of instability.

## Misconceptions
**MC-1 — BOUNDED-SEQUENCE-CONVERGES** *(Foundational)*
- Surface form: concluding $\{(-1)^n\}$ converges because all its terms lie in $[-1,1]$ — confusing boundedness with convergence.
- Root cause: dominant early exposure to bounded, convergent sequences (like $1/n$) creates an unexamined association between the two properties.
- Repair: verify directly that $\{(-1)^n\}$ is bounded (true, all terms in $\{-1,+1\}$) but is NOT monotone, so the Monotone Convergence Theorem is inapplicable — and the sequence genuinely has two cluster points ($+1$ from even indices, $-1$ from odd indices), which is exactly what prevents convergence.

**MC-2 — DIVERGES-ONLY-TO-INFINITY**
- Surface form: classifying only sequences with $a_n\to\pm\infty$ as divergent, treating oscillating sequences as "neither convergent nor divergent."
- Root cause: the everyday meaning of "diverge" (spreading apart, growing) does not include the formal mathematical meaning's third case (bounded oscillation).
- Repair: state the definition precisely — "diverges" means "does NOT converge," full stop — then verify $\{\sin(n\pi/2)\}$ (cycling through $0,1,0,-1,\ldots$) has multiple cluster points and therefore satisfies the formal divergence definition, despite never growing large.

**MC-3 — ALTERNATING-SIGN-IMPLIES-DIVERGENCE**
- Surface form: claiming $\{(-1)^n/n\}$ diverges because of the alternating sign, missing that $|a_n|=1/n\to0$ forces the limit to be $0$.
- Root cause: the visibly erratic, flip-flopping appearance of an alternating sequence creates a strong perceptual impression of instability that overrides the correct absolute-value check.
- Repair: apply the squeeze theorem directly — $-\frac1n\le\frac{(-1)^n}{n}\le\frac1n$, and both bounding sequences converge to $0$, so $\{(-1)^n/n\}$ is squeezed into converging to $0$ as well, regardless of its alternating appearance.

## Analogies
- **The clock-hands analogy**: an oscillating divergent sequence is like a clock's second hand — bounded (it never leaves the clock face) yet never "arrives" at any single position permanently, exactly the way $\{(-1)^n\}$ never settles at $+1$ or $-1$ for good.
- **Anti-analogy — "divergent" does NOT mean "unbounded."** This is MC-2's exact error: a perfectly bounded sequence like $\{(-1)^n\}$ is just as divergent as an unbounded one like $\{n\}$ — boundedness and convergence are independent properties.

## Demonstrations
1. **The bounded-oscillation counterexample, verified via two subsequences**: showing $\{(-1)^n\}$'s even-indexed terms converge to $+1$ while its odd-indexed terms converge to $-1$ — two distinct cluster points, proving divergence despite boundedness — directly breaking MC-1.
2. **The three-type taxonomy applied to concrete sequences**: classifying $a_n=n$ (diverges to $+\infty$), $a_n=(-1)^n\cdot n$ (diverges, both unbounded and oscillating), and $a_n=\sin(n\pi/2)$ (diverges, bounded oscillation only) side by side — directly breaking MC-2 by showing all three are equally "divergent."
3. **The squeeze-theorem resolution of the alternating case**: applying $-\frac1n\le\frac{(-1)^n}{n}\le\frac1n\to0$ to prove convergence to $0$ despite the alternating sign — directly breaking MC-3.

## Discovery Questions
1. "Is $\{(-1)^n\}$ bounded? Does it converge? Can a sequence be bounded without converging?"
2. "Does 'diverges' always mean the terms grow without bound — or can a sequence diverge by oscillating while staying bounded?"
3. "If $\{(-1)^n/n\}$ alternates sign forever, does it converge or diverge? What does $|a_n|$ do as $n$ grows?"

## Teaching Sequence
1. **Anchor in `math.seq.convergent`**: state directly, "you have the formal definition of convergence — today divergence is simply its logical negation, made precise."
2. **Formal definition (breaks MC-2)**: the exact negation of the $\varepsilon$-$N$ definition, followed by the three-type taxonomy (unbounded positive, unbounded negative, bounded oscillation), establishing that all three genuinely count as divergent.
3. **Contrast pair (breaks MC-1)**: bounded-convergent ($1/n$) versus bounded-divergent ($(-1)^n$) versus bounded-convergent-alternating ($(-1)^n/n$), side by side, isolating exactly what distinguishes them.
4. **Worked example (breaks MC-3)**: the Monotone Convergence Theorem stated and applied in both directions (convergence and its divergence contrapositive), then the squeeze-theorem resolution of the alternating-sign case.
5. **Mastery gate**: 4-item classification problem set (oscillating sequence; a sequence converging via the $n^2/(n^2+1)$ pattern; an alternating sequence converging to 0; a geometric-decay sequence) plus 1 independence-mode transfer probe (classifying $a_n=n\cdot\sin(\pi n)$, which requires recognizing $\sin(\pi n)=0$ for all integers $n$ rather than applying surface oscillation intuition).

## Tutor Actions
- **Formal definition**: the precise negation of the convergence definition, plus the three-type divergence taxonomy.
- **Contrast pair**: bounded-convergent, bounded-divergent, and bounded-convergent-alternating sequences compared side by side.
- **Worked example**: the Monotone Convergence Theorem and its contrapositive, plus the squeeze-theorem resolution of the alternating case.
- **Mastery gate**, 4-item classification problem set plus 1 transfer probe requiring correct evaluation of $\sin(\pi n)$ at integers.

## Voice Teaching Notes
- Open with the explicit precision framing: "divergence isn't a vague idea — it's the exact opposite of the convergence definition you already have."
- For MC-1, whenever a bounded sequence is presented, ask "is it also monotone? Bounded alone isn't enough — check both."
- For MC-2, whenever "divergent" comes up, ask "does divergent mean it blows up, or does it just mean it doesn't converge?"
- For MC-3, whenever an alternating sequence appears, ask "what does $|a_n|$ do as $n$ grows — forget the sign for a moment."

## Assessment Signals
- **Early warning for MC-1**: classifying a bounded sequence as convergent without checking monotonicity or searching for multiple cluster points.
- **Early warning for MC-2**: describing an oscillating sequence as "neither convergent nor divergent" instead of correctly classifying it as divergent.
- **Early warning for MC-3**: classifying an alternating sequence as divergent based on the sign pattern alone, without checking $|a_n|$.
- **Mastery evidence**: correctly classifying a fresh bounded oscillating sequence as divergent by exhibiting two distinct cluster points, and correctly applying the squeeze theorem to resolve a fresh alternating-sign sequence's actual convergence status.

## Tutor Recovery Strategy
- On MC-1: require the learner to explicitly compute the even- and odd-indexed subsequence limits of a FRESH oscillating example, showing they differ.
- On MC-2: present a fresh bounded oscillating sequence and require the learner to state the formal negated definition before classifying it.
- On MC-3: present a fresh alternating sequence and require the learner to compute $|a_n|$'s limit BEFORE considering the sign pattern at all.
- If a learner correctly classifies simple cases but cannot apply the Monotone Convergence Theorem's contrapositive to an unbounded monotone sequence, treat this as a distinct theorem-application gap and route to dedicated MCT practice.

## Memory Hooks
- "Bounded is not enough — you also need monotone, or check the cluster points" — for MC-1.
- "Diverges just means 'not convergent' — oscillating counts too" — for MC-2.
- "Check $|a_n|$ first, ignore the sign until you've done that" — for MC-3.

## Transfer Connections
- **`math.seq.convergent`** (prerequisite, already authored): supplies the formal $\varepsilon$-$N$ convergence definition this concept negates precisely to define divergence, and the concept of a limit this concept's taxonomy is built entirely in contrast to.
- **Convergence tests** (future work, not yet authored per the Blueprint's own Teaching Notes): this concept is the prerequisite understanding for why the Divergence Test for series works — "if $a_n\not\to0$, the series $\sum a_n$ diverges" is a direct application of this concept's own three-type taxonomy.

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: []`); the Blueprint's own transfer probe uses a purely internal mathematics scenario ($a_n=n\sin(\pi n)$) rather than a cross-subject application.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.seq.divergent-sequence.md` (primitive-numbered format — P02/P06/P05/P91/P27/P41/P64/P89 scaffolding). All worked examples (the formal negation and three-type taxonomy; the bounded-convergent-vs-divergent contrast including $(-1)^n$ and $(-1)^n/n$; the Monotone Convergence Theorem applied in both directions), the complete misconception registry (MC-1 Foundational, MC-2, MC-3, none carrying an explicit birth-type column), and the mastery-gate transfer probe are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `unlocks: none`, `cross_links: []`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`) verified against the live KG — see Curriculum Feedback below: **zero discrepancy**.
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence`): "Let $a_n=n\cdot\sin(\pi n)$. Classify this sequence as convergent or divergent, justifying your answer." *(Expected: $\sin(\pi n)=0$ for every integer $n$, so $a_n=n\cdot0=0$ for all $n\ge1$ — the sequence is constantly $0$ and CONVERGES to $0$, testing whether the learner correctly evaluates $\sin$ at integer multiples of $\pi$ rather than applying general oscillation intuition from the sine function's graph.)*, reused by reference.

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`).
- The Blueprint's own Teaching Notes name this concept as the prerequisite understanding for the future (not-yet-authored) Divergence Test for series — recorded here as a forward reference, not developed further, since that concept is outside this batch's scope.

## Version History
- **2026-09-13 (Batch 60)**: authored as part of the Mathematics Educational Brain completion campaign. Unblocked by the already-authored `math.seq.convergent` (Batch 54). One of four concepts authored this batch (companions: `math.calc.trig-integrals`, `math.calc.hyperbolic-derivatives`, `math.trig.double-angle-formulas`). `math.seq` moves from 7/21 toward 8/21 this batch.
