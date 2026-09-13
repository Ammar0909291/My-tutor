# math.seq.arithmetic-series — Arithmetic Series

## Identity
- **KG id**: `math.seq.arithmetic-series`
- **Domain**: math.seq (Sequences & Series)
- **Requires**: `math.seq.arithmetic-sequence`, `math.seq.series`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient · **Bloom level**: apply
- **Mastery threshold**: 0.85 · **Estimated hours**: 4

## Learning Objective
The learner derives $S_n=\frac{n(a_1+a_n)}{2}$ via the Gauss pairing argument (writing $S_n$ forward and backward and adding), derives the substituted form $S_n=\frac{n(2a_1+(n-1)d)}{2}$ when $a_n$ is unknown but $d$ is known, distinguishes the sum formula from the term formula $a_n=a_1+(n-1)d$, and inverts the sum formula to solve for a missing parameter given the others.

## Core Understanding
`math.seq.arithmetic-sequence` already owns the term formula $a_n=a_1+(n-1)d$, and `math.seq.series` already owns the general partial-sum definition $S_n=a_1+a_2+\cdots+a_n$. This concept applies the specific Gauss pairing technique to the arithmetic case, producing a genuine closed-form formula — it does not re-derive either prerequisite, and it explicitly separates the SUM (a running total) from the TERM (a single value), a distinction the term formula alone cannot supply.

**The Gauss pairing argument derives the sum formula from writing $S_n$ twice**: write $S_n$ forward, $S_n=a_1+(a_1+d)+\cdots+(a_n-d)+a_n$, and again backward, $S_n=a_n+(a_n-d)+\cdots+(a_1+d)+a_1$. Adding the two expressions column by column, EVERY column sums to exactly $a_1+a_n$ (consecutive terms from the front and back always pair to the same total), giving $2S_n=n(a_1+a_n)$, so $S_n=\frac{n(a_1+a_n)}{2}$. This works for ANY $n$, odd or even — the argument adds two COMPLETE copies of $S_n$, so no column is ever left unpaired regardless of parity.

**Substituting the term formula gives a second, equivalent form**: replacing $a_n=a_1+(n-1)d$ into $S_n=\frac{n(a_1+a_n)}{2}$ gives $S_n=\frac{n(2a_1+(n-1)d)}{2}$ — useful when $a_n$ itself is unknown but $d$ is known. The two forms are algebraically identical; the choice between them is purely about which avoids an unnecessary extra computation given what is provided.

**The sum and the term are genuinely different objects, growing at different rates**: $a_n=a_1+(n-1)d$ answers "what is the value of the $n$th term alone?" while $S_n=\frac{n(a_1+a_n)}{2}$ answers "what is the total of all $n$ terms?" — $S_n$ grows approximately as $n^2$ while $a_n$ grows only linearly in $n$, a structural difference, not just a notational one.

## Mental Models
- **Write it twice, forward and backward, and add.** The Gauss pairing argument is the entire derivation — every column of the sum, paired front-to-back, gives the identical total $a_1+a_n$, regardless of whether $n$ is odd or even.
- **Term formula gives one value; sum formula gives a running total.** These answer genuinely different questions and grow at genuinely different rates — confusing them produces an answer of the wrong ORDER of magnitude, not just a wrong number.
- **Two equivalent forms, chosen by what's given.** $S_n=\frac{n(a_1+a_n)}{2}$ when both endpoints are known; $S_n=\frac{n(2a_1+(n-1)d)}{2}$ when $d$ is known instead — same formula, different starting information.

## Why Students Fail
This Blueprint's three misconceptions carry no explicit birth-type column, so each is independently classified here:
- **MC-1** is a **Type 1 (overgeneralization)**: having just learned the term formula $a_n=a_1+(n-1)d$ from `math.seq.arithmetic-sequence`, a learner faced with a "find the sum" question may reach for the only formula recently learned about the sequence, conflating "a formula about this AP" with "the sum formula specifically."
- **MC-2** is a **Type 2 (perceptual intuition)**: pairing terms visually (first with last, second with second-to-last) SUGGESTS a middle term is left over when $n$ is odd, a natural but incorrect intuition that does not account for the Gauss argument's own trick of adding TWO complete copies of $S_n$ rather than pairing within a single copy.
- **MC-3** is a **Type 1 (overgeneralization)**: computing $\frac{a_1+a_n}{2}$ (the average term) correctly is itself a genuine sub-step of the formula, so stopping there overgeneralizes "I computed something correct" into "I'm done," omitting the final multiplication by $n$.

## Misconceptions
**MC-1 — TERM-FORMULA-AS-SUM** *(Foundational)*
- Surface form: writing $S_n=a_1+(n-1)d$ (the TERM formula) in response to a "find the sum" question.
- Root cause: conflating two formulas for the same sequence — the one recently learned (the term formula) is reached for reflexively, without recognizing the sum requires a structurally different formula.
- Repair: compute both explicitly for a concrete example — for the AP $2,5,8,11,\ldots$: $a_4=2+3\cdot3=11$ (one term) versus $S_4=\frac{4(2+11)}{2}=26$ (the total $2+5+8+11=26$) — two clearly different numbers, making the distinction concrete.

**MC-2 — PAIRING-ONLY-WORKS-FOR-EVEN-n**
- Surface form: believing the pairing argument requires an even number of terms, since pairing front-to-back visually seems to leave a middle term stranded when $n$ is odd.
- Root cause: visualizing the pairing as happening WITHIN a single copy of $S_n$, rather than recognizing the Gauss argument adds TWO complete copies (forward and backward), which pairs cleanly regardless of parity.
- Repair: re-walk the Gauss argument explicitly for an odd $n$ (e.g. $n=5$), showing all 5 columns of the SUM of the two full copies still each total $a_1+a_n$ — the argument never pairs within one copy, so oddness of $n$ is irrelevant.

**MC-3 — FORGETTING-n-IN-SUM**
- Surface form: computing $\frac{a_1+a_n}{2}$ (the average term) and reporting that as the sum, omitting the final multiplication by $n$.
- Root cause: the average-term computation is itself correct and feels like a completed answer, obscuring that it is only one factor of the full formula.
- Repair: compute $\frac{a_1+a_n}{2}$ for a concrete AP and then explicitly multiply by $n$, showing the average-term value alone is far smaller than the actual sum — e.g. for $1,3,5,7,9$: average $=\frac{1+9}{2}=5$, but the sum is $5\times5=25$, not $5$.

## Analogies
- **The forward-backward-add analogy**: exactly as `math.seq.geometric-series`'s own shift-multiply-subtract derivation isolates a formula by combining two related expressions of the same sum, the Gauss pairing argument isolates $S_n$ by combining $S_n$ written forward and $S_n$ written backward — a different combination technique reaching an analogous payoff.
- **Anti-analogy — the sum is NOT just the average term.** This is MC-3's exact error: $\frac{a_1+a_n}{2}$ is a genuine intermediate quantity (the average of the first and last terms), but it is not itself the total — the total requires multiplying that average by how many terms are being averaged over.

## Demonstrations
1. **The full Gauss pairing derivation**: writing $S_n$ forward and backward, adding column by column to get $2S_n=n(a_1+a_n)$, then substituting $a_n=a_1+(n-1)d$ to obtain the second form — directly breaking MC-1 by keeping the SUM formula's derivation entirely separate from the term formula.
2. **The odd-$n$ verification**: explicitly working the Gauss argument for $n=5$, confirming all 5 columns still each sum to $a_1+a_n$ with no leftover term — directly breaking MC-2.
3. **The average-versus-total contrast**: computing $\frac{a_1+a_n}{2}=5$ for $1,3,5,7,9$ and then multiplying by $n=5$ to get the correct total $25$, verified by direct addition — directly breaking MC-3.

## Discovery Questions
1. "If someone asks for the 4th term of an AP and someone else asks for the sum of the first 4 terms, are those the same question? Compute both for $2,5,8,11,\ldots$"
2. "Does the Gauss pairing argument (writing $S_n$ forward and backward and adding) leave a term unpaired when $n$ is odd? Try it with $n=5$."
3. "If $\frac{a_1+a_n}{2}=5$ for a 5-term AP, is $5$ the sum of all 5 terms, or just part of the answer?"

## Teaching Sequence
1. **Anchor in `math.seq.arithmetic-sequence` and `math.seq.series`**: state directly, "you know the term formula and you know what a partial sum is — today you get the actual formula for the AP's sum, derived from a classic trick."
2. **Formal definition (breaks MC-1 and MC-2)**: the full Gauss pairing derivation, explicitly verified for both even and odd $n$, followed by the substituted second form.
3. **Pattern induction (breaks MC-3)**: canonical sums (first $n$ positive integers, first $n$ odd integers) and an inverse problem, with the average-versus-total distinction made explicit.
4. **Contrast pair**: the term-versus-sum side-by-side comparison, plus choosing between the two equivalent sum-formula forms based on what's given.
5. **Mastery gate**: 5-item problem set (compute $S_{12}$ for a given AP; sum all integers from 1 to 200; find $d$ given $a_1$ and $S_{10}$; find $a_1$ given $S_5$ and $a_5$; sum all multiples of 7 between 1 and 100) plus 1 independence-mode transfer probe (a theatre-seating scenario requiring the term formula, the sum formula, and an extended revenue calculation).

## Tutor Actions
- **Formal definition**: the full Gauss pairing derivation, verified for both parities of $n$.
- **Pattern induction**: canonical sums and an inverse problem, with the average-versus-total distinction explicit.
- **Contrast pair**: term-versus-sum comparison and choosing between the two equivalent sum-formula forms.
- **Mastery gate**, 5-item problem set plus 1 transfer probe requiring the term formula, the sum formula, and an extension calculation.

## Voice Teaching Notes
- Open with the explicit framing: "the term formula tells you about ONE term; today's formula tells you the TOTAL — two different questions, two different tools."
- For MC-1, whenever a sum question appears, ask "is this asking for one term, or the total of several?"
- For MC-2, if a learner hesitates on odd $n$, ask "does the Gauss argument pair terms within one copy of $S_n$, or does it add TWO complete copies together?"
- For MC-3, after computing $\frac{a_1+a_n}{2}$, ask "is that the sum, or just one factor of the sum formula?"

## Assessment Signals
- **Early warning for MC-1**: using the term formula $a_1+(n-1)d$ in response to a sum question.
- **Early warning for MC-2**: claiming the pairing argument fails or needs adjustment for odd $n$.
- **Early warning for MC-3**: reporting $\frac{a_1+a_n}{2}$ as the final answer to a sum question without multiplying by $n$.
- **Mastery evidence**: correctly re-deriving the sum formula via the Gauss pairing argument on a fresh prompt, correctly selecting between the two equivalent forms based on what's given, and correctly inverting the formula to solve for a missing parameter.

## Tutor Recovery Strategy
- On MC-1: require the learner to compute BOTH the term and the sum explicitly for the same fresh AP, comparing the two numbers directly.
- On MC-2: rework the Gauss argument for a fresh odd-$n$ example with the learner performing the forward-and-backward addition themselves.
- On MC-3: present a fresh average-term computation and require the learner to state explicitly what factor is still missing before finalizing an answer.
- If a learner masters forward sum computation but struggles with inverse problems (finding $n$ or $d$ given $S_n$), treat this as a distinct algebraic-inversion gap and route to dedicated inverse-problem practice.

## Memory Hooks
- "Term formula: one value. Sum formula: the total" — for MC-1.
- "Two full copies, forward and backward — nothing is ever left over" — for MC-2.
- "Average times count, never average alone" — for MC-3.

## Transfer Connections
- **`math.seq.arithmetic-sequence`** (prerequisite, already authored): supplies the term formula $a_n=a_1+(n-1)d$ this concept substitutes into the Gauss-derived sum formula — this concept's own MC-1 exists specifically to keep the two formulas from being conflated.
- **`math.seq.series`** (prerequisite, already authored): supplies the general partial-sum definition $S_n=a_1+a_2+\cdots+a_n$ this concept specializes to the arithmetic case via the Gauss pairing technique.
- **`math.seq.geometric-series`** (sibling, authored Batch 59): a parallel case of deriving a closed-form sum formula via a distinct algebraic technique (shift-multiply-subtract rather than forward-backward-add) — both concepts convert a general partial-sum definition into a computable closed form.

## Cross-Subject Connections
- No cross-links are declared in the KG for this concept (`cross_links: []`); the Blueprint's own transfer probe uses a theatre-seating scenario purely as an application vehicle, not a formal cross-subject curriculum link.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.seq.arithmetic-series.md` (primitive-numbered format — P02/P04/P06/P91/P27/P41/P64/P89 scaffolding). All worked examples (the Gauss pairing derivation and substituted form; the canonical sums of the first $n$ positive and odd integers; the term-versus-sum contrast and the multiples-of-3 application), the complete misconception registry (MC-1 Foundational, MC-2, MC-3, none carrying an explicit birth-type column), and the mastery-gate transfer probe are reused by reference, never restated verbatim beyond the minimal illustrative excerpts above.
- Blueprint metadata (`requires`, `unlocks: none`, `cross_links: []`, `difficulty`, `bloom`, `mastery_threshold`, `estimated_hours`) verified against the live KG — see Curriculum Feedback below: **zero discrepancy**.
- Independent transfer probe (independence mode, per the Blueprint's own stated `P76_mode: independence`): the theatre-seating scenario (20 rows, first row 15 seats, each subsequent row 3 more), requiring the term formula for the 20th row, the sum formula for total seats, and an extension revenue calculation, reused by reference.

## Runtime Asset References
- No AssetIdentity (ADR 14) explanation or probe assets exist yet for this concept in `src/lib/teaching/assets/`. Per this program's established layer-ownership boundary, Layer 3/7 (DB-backed serving assets) is out of scope for this Educational Brain authoring campaign — this entry is Layer 2 (Educational Brain) content only.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy** for `requires`, `unlocks`, `cross_links`, `difficulty`, `bloom`, `mastery_threshold`, and `estimated_hours` — every field in the Blueprint's Component 0 metadata matches the live KG exactly (verified by direct Python query against `docs/mathematics/kg/graph.json`).
- The Blueprint's own P78 completion text names `math.seq.infinite-geometric-series` and `math.seq.telescoping-series` as the "next concepts" in the pipeline — the latter is also authored this same batch.

## Version History
- **2026-09-13 (Batch 61)**: authored as part of the Mathematics Educational Brain completion campaign. Unblocked by the already-authored `math.seq.arithmetic-sequence` (Batch 55) and `math.seq.series` (Batch 54). One of four concepts authored this batch (companions: `math.calc.trig-substitution`, `math.trig.half-angle-formulas`, `math.seq.telescoping-series`). `math.seq` moves from 8/21 toward 10/21 this batch (2 math.seq concepts authored).
