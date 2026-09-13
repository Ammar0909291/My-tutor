# math.seq.telescoping-series — Telescoping Series

## Identity
- **KG id**: `math.seq.telescoping-series`
- **Domain**: math.seq (Sequences & Series)
- **Requires**: `math.seq.partial-sums`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient · **Bloom level**: apply
- **Mastery threshold**: 0.75 · **Estimated hours**: 4

## Learning Objective
The learner recognizes the telescoping form $\sum(b_n-b_{n+1})$, applies partial-fraction decomposition to rewrite a rational term $a_n$ as a difference $b_n-b_{n+1}$ when it does not already appear in that form, writes out $S_n$ explicitly to see the cancellation pattern collapse to $S_n=b_1-b_{n+1}$, and evaluates the infinite sum via $S_\infty=b_1-\lim_{n\to\infty}b_{n+1}$ — while correctly recognizing which series do NOT have this structure.

## Core Understanding
`math.seq.partial-sums` already established $S_n=\sum_{k=1}^na_k$ as a computable running total. This concept identifies a SPECIAL structural case — where the terms themselves are a difference $b_n-b_{n+1}$ — that makes the partial sum collapse to just two surviving terms, turning an infinite accumulation into a closed-form limit.

**A telescoping series is one whose terms are already, or can be made, a difference of consecutive values of some sequence $\{b_n\}$**: $\sum_{n=1}^\infty a_n$ is telescoping if there exists $\{b_n\}$ such that $a_n=b_n-b_{n+1}$ for all $n$. Writing out $S_n$: $S_n=(b_1-b_2)+(b_2-b_3)+\cdots+(b_n-b_{n+1})$ — every intermediate term cancels pairwise (the $-b_2$ from the first parenthesis cancels the $+b_2$ from the second, and so on), leaving only the very FIRST term $b_1$ and the very LAST remaining term $-b_{n+1}$: $S_n=b_1-b_{n+1}$.

**Most rational-term series do not visibly telescope until partial fractions reveal the difference structure**: for $a_n=\frac{1}{n(n+1)}$, the term as written is a single fraction with no visible cancellation. Partial-fraction decomposition gives $\frac{1}{n(n+1)}=\frac1n-\frac1{n+1}$ — and THIS is the telescoping form, with $b_n=\frac1n$. Only after this algebraic step does the cancellation mechanism apply; attempting to telescope before decomposing has nothing to cancel against.

**The infinite sum is the limit of the surviving terms**: $S_\infty=\lim_{n\to\infty}S_n=\lim_{n\to\infty}(b_1-b_{n+1})=b_1-\lim_{n\to\infty}b_{n+1}$, provided that limit exists. For $\frac1{n(n+1)}=\frac1n-\frac1{n+1}$: $S_n=1-\frac1{n+1}$, so $S_\infty=1-0=1$.

**Not every rational series has this structure — the "gap" must be a difference of the SAME function evaluated at $n$ and at a fixed offset**: telescoping requires partial fractions to yield $b_n-b_{n+k}$ for some fixed integer $k$ (usually $k=1$, sometimes larger, as in $\frac1{n(n+3)}=\frac13\left(\frac1n-\frac1{n+3}\right)$). Series like $\sum\frac1{n^2}$ have no such difference structure — there is no explicit sequence $b_n$ with $b_n-b_{n+1}=\frac1{n^2}$ (the natural candidate, $b_n=\sum_{k=n}^\infty\frac1{k^2}$, is itself the unknown sum) — and require a genuinely different convergence test entirely.

## Mental Models
- **Write out several terms before trusting any cancellation.** The telescoping collapse is only visible once $S_n$ is actually expanded term by term — trusting it abstractly risks getting the surviving terms wrong.
- **Decompose first, then telescope — never the reverse.** A series written as a single rational fraction has nothing to cancel; the difference structure must be extracted via partial fractions before the telescoping mechanism can apply at all.
- **Only the very first and very last surviving terms remain.** In $S_n=\sum(b_n-b_{n+1})$, everything in the middle cancels — the answer is always $b_1-b_{n+1}$, never a sum or an average of the endpoints.

## Why Students Fail
This Blueprint's three misconceptions carry no explicit birth-type column, so each is independently classified here:
- **MC-1** is a **Type 5 (instruction-induced)** gap: if the telescoping COLLAPSE is demonstrated primarily on terms already given in difference form, a learner has no signal that most real problems require an extra algebraic step (partial fractions) BEFORE the collapse becomes visible.
- **MC-2** is a **Type 1 (overgeneralization)**: the general pattern "some terms cancel, some survive" is correctly absorbed, but without care, the SPECIFIC identity of which terms survive (first, minus last) is reconstructed incorrectly from a vague memory of "the ends matter," producing $b_1+b_{n+1}$ or $b_n-b_1$ instead of the correct $b_1-b_{n+1}$.
- **MC-3** is a **Type 1 (overgeneralization)**: after successfully telescoping several rational series in a row, it is natural to assume the technique is universal for ALL rational-term series, missing that telescoping requires a specific difference structure that not every rational function's partial-fraction decomposition produces.

## Misconceptions
**MC-1 — TELESCOPE-BEFORE-DECOMPOSE** *(Foundational)*
- Surface form: attempting to apply the telescoping cancellation directly to $a_n=\frac{1}{n(n+1)}$ as written, without first decomposing it into $\frac1n-\frac1{n+1}$.
- Root cause: exposure primarily to terms already given in difference form obscures that most rational-term series need an algebraic decomposition step first.
- Repair: state explicitly that $\frac1{n(n+1)}$, as a single fraction, has nothing visible to cancel against its neighbors — only AFTER splitting via partial fractions into $\frac1n-\frac1{n+1}$ does writing out $S_n$ reveal any cancellation at all.

**MC-2 — WRONG-SURVIVING-TERMS**
- Surface form: writing $S_n=b_1+b_{n+1}$ or $S_n=b_n-b_1$, reversing the sign or the order of the surviving terms.
- Root cause: a correct but vague sense that "the ends matter" is reconstructed inaccurately without actually writing out the cancellation term by term.
- Repair: write out $S_4=(b_1-b_2)+(b_2-b_3)+(b_3-b_4)+(b_4-b_5)$ explicitly and circle exactly which terms cancel — the $-b_2/+b_2$, $-b_3/+b_3$, $-b_4/+b_4$ pairs all vanish, leaving precisely $+b_1$ and $-b_5$, i.e. $S_4=b_1-b_5$.

**MC-3 — ALL-RATIONAL-SERIES-TELESCOPE**
- Surface form: attempting to telescope $\sum\frac1{n^2}$ by guessing at a difference structure, when no such structure exists.
- Root cause: repeated success telescoping a run of similar-looking rational series overgeneralizes the technique's applicability past its actual structural requirement.
- Repair: attempt to find $b_n$ such that $b_n-b_{n+1}=\frac1{n^2}$ directly and show the attempt fails — the only candidate, $b_n=\sum_{k=n}^\infty\frac1{k^2}$, is itself the unknown quantity being sought, proving no elementary telescoping form exists; a genuinely different test (the integral test, or the known $p$-series result) is required instead.

## Analogies
- **The domino-collapse analogy**: a telescoping sum is like a row of dominoes falling — each middle domino both knocks over its neighbor and is itself knocked over, so only the very FIRST push (the $b_1$ term) and the very LAST standing domino (the $b_{n+1}$ term) remain visible at the end.
- **Anti-analogy — a fraction that LOOKS decomposable is NOT automatically telescoping.** This is MC-3's exact error: partial fractions can be applied to many rational functions, but only those yielding the SPECIFIC $b_n-b_{n+k}$ difference structure actually telescope — a partial-fraction decomposition that does not produce that shape leaves nothing to cancel.

## Demonstrations
1. **The canonical decompose-then-collapse derivation**: partial-fractioning $\frac1{n(n+1)}=\frac1n-\frac1{n+1}$, writing out $S_n$ term by term to see the cancellation, and arriving at $S_n=1-\frac1{n+1}\to S_\infty=1$ — directly breaking MC-1 by making the decomposition step an explicit, non-skippable prerequisite.
2. **The explicit four-term cancellation, surviving terms circled**: writing $S_4=(b_1-b_2)+(b_2-b_3)+(b_3-b_4)+(b_4-b_5)$ and identifying exactly $+b_1$ and $-b_5$ as survivors — directly breaking MC-2.
3. **The failed-telescope demonstration for $\sum1/n^2$**: attempting to find a $b_n$ with $b_n-b_{n+1}=\frac1{n^2}$ and showing no elementary such sequence exists — directly breaking MC-3.

## Discovery Questions
1. "Can $\frac{1}{n(n+1)}$, written as a single fraction, be telescoped as it stands — or does something need to happen to it first?"
2. "If you write out $S_4=(b_1-b_2)+(b_2-b_3)+(b_3-b_4)+(b_4-b_5)$ term by term, which specific terms survive after cancellation?"
3. "You've successfully telescoped several series in a row involving $\frac1{n(n+1)}$-type terms. Does $\sum\frac1{n^2}$ telescope the same way? Try to find a $b_n$ that works."

## Teaching Sequence
1. **Anchor in `math.seq.partial-sums`**: state directly, "you already know how to compute $S_n$ as a running total — today you find a special structural case where most of that total cancels away."
2. **Formal definition (breaks MC-1)**: the telescoping definition, the derivation $S_n=b_1-b_{n+1}$, and the canonical $\frac1{n(n+1)}$ example worked through partial fractions in full.
3. **Pattern induction (breaks MC-3)**: a gallery distinguishing which forms telescope (products of consecutive-integer factors) from which do not ($\sum1/n^2$, $\sum1/n$), plus a decision tree for recognizing telescoping structure.
4. **Worked example**: extended gap-$k$ telescoping and a double-telescope case, deepening the pattern beyond the simple gap-1 case.
5. **Mastery gate**: 4-item problem set (evaluating $\sum1/((n+1)(n+3))$; verifying a geometric-difference series telescopes; using a gap-3 result; evaluating $\sum1/(n^2-1)$ with a shifted starting index) plus 1 independence-mode transfer probe (factoring, decomposing, and evaluating $\sum1/(4n^2-1)$, connecting to the Leibniz $\pi/4$ series).

## Tutor Actions
- **Formal definition**: the telescoping definition and canonical $\frac1{n(n+1)}$ derivation via partial fractions.
- **Pattern induction**: the telescopes-versus-doesn't-telescope gallery and decision tree.
- **Worked example**: extended gap-$k$ and double-telescope cases.
- **Mastery gate**, 4-item problem set plus 1 transfer probe requiring factoring, decomposition, and the connection to a known series.

## Voice Teaching Notes
- Open with the explicit framing: "most telescoping problems need one algebraic step BEFORE the cancellation — decompose first, always."
- For MC-1, before accepting any telescoping attempt, ask "is this term already a difference $b_n-b_{n+1}$, or does it need partial fractions first?"
- For MC-2, whenever $S_n$ is claimed, require the learner to write out at least 3-4 terms explicitly and circle what cancels.
- For MC-3, whenever a new rational series appears, ask "does the partial-fraction decomposition actually give you a $b_n-b_{n+k}$ shape, or does it not?"

## Assessment Signals
- **Early warning for MC-1**: attempting cancellation on a rational term before performing partial-fraction decomposition.
- **Early warning for MC-2**: writing $S_n=b_1+b_{n+1}$ or $b_n-b_1$ instead of the correct $b_1-b_{n+1}$.
- **Early warning for MC-3**: attempting to telescope a series (like $\sum1/n^2$) with no genuine difference structure.
- **Mastery evidence**: correctly decomposing a fresh rational term into telescoping form via partial fractions, correctly identifying the exact surviving terms after writing out several terms of $S_n$, and correctly recognizing when a series does NOT telescope.

## Tutor Recovery Strategy
- On MC-1: require the learner to attempt cancellation on the UNDECOMPOSED term first, observe that nothing cancels, then perform partial fractions before retrying.
- On MC-2: require the learner to write out at least 4 explicit terms of $S_n$ for a fresh series and circle the survivors by hand before stating the closed form.
- On MC-3: present a fresh rational series and require the learner to attempt (and fail) to find a matching $b_n$ before concluding the series does not telescope.
- If a learner masters gap-1 telescoping but struggles with gap-$k$ cases (multiple surviving terms at each end), treat this as a distinct extension gap and route to dedicated gap-$k$ practice.

## Memory Hooks
- "Decompose first, cancel second — never the reverse" — for MC-1.
- "First term stays, last term stays, everything between dies" — for MC-2.
- "Not every fraction has a matching difference — check before you commit" — for MC-3.

## Transfer Connections
- **`math.seq.partial-sums`** (prerequisite, already authored): supplies the general $S_n=\sum a_k$ definition this concept's special structural case (the difference form $a_n=b_n-b_{n+1}$) collapses into a two-term closed form.
- **`math.seq.arithmetic-series`** (sibling, authored this same batch): a parallel case of deriving a closed-form sum via a distinct structural technique (Gauss pairing rather than telescoping cancellation) — both concepts convert a general partial sum into a computable formula by exploiting a specific structural property of the terms.
- **`math.seq.geometric-series`** (sibling, authored Batch 59): another closed-form-sum derivation (shift-multiply-subtract) — the three sibling techniques (Gauss pairing, shift-multiply-subtract, telescoping cancellation) together form the standard toolkit for converting a general partial sum into a computable formula.

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: []`); the Blueprint's own Teaching Notes flag a connection between the transfer probe's $\sum1/(4n^2-1)=1/2$ result and the Leibniz $\pi/4$ series via a different partial-fraction decomposition applied to $\arctan$ — a mathematically rich connection, though not a formal cross-subject curriculum link.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.seq.telescoping-series.md` (primitive-numbered format — P02/P04/P05/P91/P27/P41/P64/P89 scaffolding). All worked examples (the canonical $\frac1{n(n+1)}$ derivation via partial fractions; the telescopes-versus-doesn't gallery including $\sum1/n^2$ as a non-example; the extended gap-3 and double-telescope cases), the complete misconception registry (MC-1 Foundational, MC-2, MC-3, none carrying an explicit birth-type column), and the mastery-gate transfer probe are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `unlocks: none`, `cross_links: []`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`) verified against the live KG — see Curriculum Feedback below: **zero discrepancy**.
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence`): "Evaluate $\sum_{n=1}^\infty\frac1{4n^2-1}$. (a) Factor the denominator. (b) Decompose into partial fractions. (c) Identify the telescoping structure and find $S_\infty$." *(Expected: (a) $4n^2-1=(2n-1)(2n+1)$. (b) $\frac1{(2n-1)(2n+1)}=\frac12\left(\frac1{2n-1}-\frac1{2n+1}\right)$. (c) With $b_n=\frac1{2n-1}$: $S_n=\frac12\left(1-\frac1{2n+1}\right)\to S_\infty=\frac12$.)*, reused by reference.

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`).

## Version History
- **2026-09-13 (Batch 61)**: authored as part of the Mathematics Educational Brain completion campaign. Unblocked by the already-authored `math.seq.partial-sums` (Batch 59). One of four concepts authored this batch (companions: `math.calc.trig-substitution`, `math.trig.half-angle-formulas`, `math.seq.arithmetic-series`). `math.seq` moves from 8/21 toward 10/21 this batch (2 math.seq concepts authored).
