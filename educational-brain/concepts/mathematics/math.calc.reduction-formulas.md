# math.calc.reduction-formulas

## Identity
- **KG ID**: `math.calc.reduction-formulas`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.integration-by-parts` — load-bearing part: every reduction formula IS a packaged, reusable result of applying integration by parts with a strategic choice of $u$ and $dv$ that splits off one or two powers of the original function.
- **Unlocks**: none in the KG.
- **Cross-links**: none in the KG.
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.70 (MAMR = ⌈0.70×5⌉ = 4/5)
- **Estimated hours**: 4
- **Blueprint**: `docs/curriculum/blueprints/math.calc.reduction-formulas.md` (reused by reference throughout)

## Learning Objective
- The learner can state and apply a reduction formula (e.g. $\int\sin^nx\,dx=-\frac{\sin^{n-1}x\cos x}{n}+\frac{n-1}{n}\int\sin^{n-2}x\,dx$) to express $\int f^n$ in terms of a LOWER power's integral, and can REPEAT the reduction until reaching a genuinely elementary base case.
- The learner can recognize that a reduction formula is DERIVED from `math.calc.integration-by-parts` (a strategic choice of $u$ and $dv$ splitting off one power) rather than being a separate, unrelated technique to memorize independently.
- The learner can correctly identify the BASE CASE ($n=0$ or $n=1$, depending on parity) that terminates the reduction chain, and recognize that continuing to "reduce" past it is either impossible or meaningless.

## Core Understanding
A reduction formula is not a new integration technique — it is `math.calc.integration-by-parts` applied ONCE, in a specific strategic way, and then packaged so that the same trade does not need to be re-derived from scratch every time. Splitting $\sin^nx=\sin^{n-1}x\cdot\sin x$ and choosing $u=\sin^{n-1}x$, $dv=\sin x\,dx$ produces, after one application of integration by parts and a Pythagorean substitution, a formula relating $\int\sin^nx\,dx$ to $\int\sin^{n-2}x\,dx$ — the SAME integral form, but with the power reduced by 2. Because the new integral has the identical shape as the original (just a smaller exponent), the formula can be applied to ITSELF again, and again, in a chain — each application peeling off one "layer" of the power — until the exponent reaches a BASE CASE ($n=0$, giving $\int1\,dx$, or $n=1$, giving $\int\sin x\,dx=-\cos x$) that is directly, elementarily integrable without any further reduction. The chain must stop there: attempting to reduce past $n=0$ or $n=1$ either requires a negative exponent (a different kind of integral entirely, outside this formula's scope) or is simply redundant, since the integral is already solved.

## Mental Models
1. **Beginner — "there's a formula that turns $\int\sin^nx\,dx$ into a smaller version of itself, plus some extra stuff."** The formula is applied once, mechanically, with no sense that it must be repeated or that it comes from integration by parts. *Upgrade trigger*: being asked to evaluate $\int\sin^4x\,dx$ and finding the "answer" still contains an un-evaluated integral, $\int\sin^2x\,dx$.
2. **Intermediate — "apply the formula, then apply it AGAIN to whatever integral is left, until you reach something you can integrate directly."** The repeated-application discipline is now present, though the connection to integration by parts may still be a black box. *Upgrade trigger*: being asked to derive the formula themselves, or to explain why it has the specific shape it does.
3. **Advanced — "the formula is integration by parts, done once with a strategic split, then packaged so the split doesn't need re-deriving every time; the chain terminates at n=0 or n=1, where direct integration takes over."** The formula's origin AND its termination condition are both explicit and justified, not merely applied. *Upgrade trigger*: encountering an integral where the reduction chain's parity (whether $n$ is even or odd) determines which of the two base cases is reached, and needing to predict that in advance.
4. **Expert — reduction formulas are one instance of a general pattern: a computation that reduces to a smaller version of ITSELF is solved by iteration to a base case, exactly like a recursive definition or a proof by induction.** The learner recognizes this self-referential reduce-to-base-case structure as a reusable problem-solving pattern, not specific to trigonometric integrals. *Shelf life*: permanent.

## Why Students Fail
The dominant failure treats one application of the formula as a complete answer, because the formula's OUTPUT looks like a finished expression (a term plus a coefficient times an integral) and a learner who is not tracking that the trailing integral is still unsolved stops there, leaving the final answer genuinely incomplete rather than merely inefficient (MC-1, REDUCTION-FORMULA-APPLIED-ONLY-ONCE-LEAVING-THE-INTEGRAL-UNRESOLVED) — a Type 1 overgeneralization of the ordinary pattern "apply the rule, get the answer" that holds for most single-step integration techniques but fails here, where the rule's own output still contains an integral of the identical form. A second, distinct failure goes the opposite direction: having internalized "keep applying the formula," a learner continues attempting to reduce even after reaching the base case $n=0$ or $n=1$, not recognizing that the formula's own hypothesis (a power $n\geq2$, in most statements) no longer applies there, so "reducing" $\int\sin^1x\,dx$ would require referencing $\int\sin^{-1}x\,dx$ — a fundamentally different kind of integral the formula was never designed for (MC-2, REDUCTION-CONTINUED-PAST-THE-NATURAL-BASE-CASE) — a Type 5 instruction-induced gap, since most worked examples stop cleanly at the base case without ever showing what happens if the formula is (incorrectly) pushed one step further.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1, MC-2) and its own repair actions B01–B02. **The Blueprint's Misconception Registry carries a Severity column (Foundational, Moderate) but no explicit birth-type column**; both classifications below are independently assigned here.

- **MC-1 — REDUCTION-FORMULA-APPLIED-ONLY-ONCE-LEAVING-THE-INTEGRAL-UNRESOLVED** (the Blueprint's own "Foundational" misconception)
  - **Birth type**: Type 1, overgeneralization. Most single-step integration techniques produce a finished answer after one application; a reduction formula's output still contains an integral of the identical form, and the "apply once, done" habit is extended past the point where it holds.
  - **Characteristic phrase**: presenting $-\frac{\sin^{n-1}x\cos x}{n}+\frac{n-1}{n}\int\sin^{n-2}x\,dx$ as the final answer, with the trailing integral left symbolically unevaluated.
  - **Detection probe** (Blueprint's A01 hook): check whether the reduction is repeated until fully resolved, not stopped after one application.
  - **Repair**: Blueprint Repair Action B01 — re-apply the formula to the remaining integral, repeating until a genuinely elementary result is reached.
  - **Verification of death**: given a fresh $\int\sin^nx\,dx$ for even $n\geq4$, the learner applies the formula the correct number of times without prompting, checking after each application whether an integral sign still remains.

- **MC-2 — REDUCTION-CONTINUED-PAST-THE-NATURAL-BASE-CASE** (the Blueprint's own "Moderate" severity misconception)
  - **Birth type**: Type 5, instruction-induced. Worked examples routinely stop cleanly at the base case without demonstrating what an incorrect further reduction attempt would even look like, so nothing signals that $n=0$ or $n=1$ is a genuine stopping boundary rather than an arbitrary point to keep pushing past.
  - **Characteristic phrase**: attempting to apply the reduction formula to $\int\sin^1x\,dx$, treating $n=1$ as still "reducible."
  - **Detection probe** (Blueprint's A03 hook): this directly targets MC-2 (continuing to apply the reduction formula past the natural base case).
  - **Repair**: Blueprint Repair Action B02 — re-identify the base case explicitly and switch to direct integration there.
  - **Verification of death**: given $\int\sin^1x\,dx$ or $\int\sin^0x\,dx$, the learner integrates directly without attempting to invoke the reduction formula.

## Analogies
- **Best — Russian nesting dolls, opened one layer at a time until reaching the solid innermost doll.** Each application of the reduction formula opens one layer (reduces $n$ by 2), producing a smaller doll of the identical shape; the process stops the moment the innermost, solid doll (the base case) is reached — there is nothing left to open.
- **Alternative — climbing down a ladder one rung at a time, stopping at the ground.** Each application of the formula is one rung down; the ground (the base case) is where the descent naturally ends, and stepping "past" it makes no sense.
- **ANTI-ANALOGY — "the reduction formula solves the integral."** This phrasing licenses MC-1 directly, implying a single application produces a complete solution, when the formula only TRADES the integral for a smaller version of the same problem. Say "the reduction formula shrinks the problem by one step — it takes REPEATING to actually solve it" instead.

## Demonstrations
- **The unfinished-answer catch.** Apply the reduction formula once to $\int\sin^4x\,dx$, producing $-\frac{\sin^3x\cos x}{4}+\frac{3}{4}\int\sin^2x\,dx$, and stop. *Predict whether this expression is a complete, final answer before checking.* Noticing the integral sign still present is the demonstration for MC-1.
- **The base-case attempt.** Given $\int\sin^1x\,dx$, attempt to apply the reduction formula as if $n=1$ still needed reducing. *Predict what "applying the formula" to $n=1$ would even produce (an integral of $\sin^{-1}x$) before attempting it.* Recognizing that this produces a nonsensical or undefined next step is the demonstration for MC-2.
- **The origin re-derivation.** Using integration by parts with $u=\sin^{n-1}x$, $dv=\sin x\,dx$ on $\int\sin^nx\,dx$, re-derive the reduction formula from scratch (per Example 2). *Predict, before deriving, whether the result will match the "memorized" formula.* Confirming the match is the demonstration that the formula is packaged integration by parts, not an independent rule.

## Discovery Questions
Direct instruction is the argued call for the formula's own origin-derivation (a specific algebraic manipulation via integration by parts, best walked through explicitly), but the repeated-application requirement (MC-1) and the base-case boundary (MC-2) are both genuinely discoverable by direct trial.
1. **Need** — "Apply the reduction formula once to $\int\sin^4x\,dx$. Is what's left a number, or does it still contain an integral?" It still contains one.
2. **Playground** — try applying the formula repeatedly to $\int\sin^6x\,dx$, counting how many applications are needed.
3. **Invention** — "Why does the exponent decrease by exactly 2 each time, and what determines whether the chain ends at $n=0$ or $n=1$?" Let the learner connect it to the parity of the starting exponent.
4. **Collision** — confront a learner who stopped after one application with the direct question "is there still an integral sign in your answer?"
5. **Formalisation** — name the base case explicitly: $n=0$ gives $\int1\,dx$; $n=1$ gives $\int\sin x\,dx=-\cos x$.
6. **Compression** — "Reduce, reduce, reduce — until there's nothing left to reduce."

## Teaching Sequence
The repeated-application discipline (MC-1) must be established FIRST via the unfinished-answer catch, since a learner who has not internalized "the formula's output still needs solving" has no reason to think carefully about WHEN to stop — the base-case boundary (MC-2) only becomes a meaningful question once the learner is actively repeating the reduction and needs to know where the repetition ends. The origin-derivation (per the Blueprint's own A02) is placed between the two, once the mechanical repeat-until-done procedure is fluent, so the "why" reinforces rather than precedes the "how." Turn-level scripts for A01–A04 are owned by the Blueprint's Component 5 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the unfinished-answer catch (apply the formula once to $\int\sin^4x\,dx$ and stop), with the learner predicting whether the result is complete BEFORE it is shown. First action; anchors the repeated-application requirement concretely.
- **TEST-THINKING: Error Analysis** — "A student applied the reduction formula to $\int\sin^4x\,dx$ once and reported $-\frac{\sin^3x\cos x}{4}+\frac{3}{4}\int\sin^2x\,dx$ as their final answer. What's incomplete?" targets MC-1 directly.
- **DO: Demonstration** — the origin-derivation (Example 2), deriving the formula live from integration by parts rather than presenting it as given.
- **TEST-THINKING: Prediction** — "What would happen if you tried to apply the reduction formula to $\int\sin^1x\,dx$?" asked BEFORE attempting it, using the nesting-dolls analogy as the point of contrast. Surfaces MC-2 in one turn.
- **Does NOT fit: reduction formulas for products of different trigonometric powers (e.g. $\int\sin^mx\cos^nx\,dx$ with both exponents varying), or the tabular "DI method" shortcut for repeated integration by parts, here.** This concept covers the single-power reduction pattern only; the mixed-power and tabular-shortcut extensions are more advanced applications not covered in this KG.

## Voice Teaching Notes
The load-bearing sentence is "the formula shrinks the problem — it doesn't solve it in one step, so keep applying it until nothing's left to shrink." Say it every time a new reduction-formula problem is set up, not just the first. Listen for a learner who presents a partially-reduced expression (with an integral sign still visible) as a final answer — that specific presentation is the tell for MC-1. Listen for a learner who, upon reaching $\int\sin^1x\,dx$ or $\int\sin^0x\,dx$, asks "so what's the formula for THIS one?" — that framing is the tell for MC-2. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Presents a partially-reduced expression, with an integral sign still present, as a complete final answer** — MC-1. Route to the unfinished-answer catch, on the exact integral in question.
- **Attempts to apply the reduction formula to the base case ($n=0$ or $n=1$) instead of integrating directly** — MC-2. Route to the base-case attempt, on the exact integral in question.
- **Correctly repeats the reduction to a genuinely elementary base case and stops there** — the intended target state.
- **Mastery trigger**: the Blueprint's A04 gate, MAMR 4/5 (⌈0.70×5⌉=4). The 4-item P77 set plus the P76 transfer probe (the Fourier-analysis average-power problem) must include at least one item requiring the learner to explain WHY the formula is applied repeatedly rather than once, not merely execute a given reduction chain mechanically — a gate made only of correct-computation items risks certifying mechanics without certifying the conceptual discrimination against MC-1.

## Tutor Recovery Strategy
The likely utterance here is "I used the formula, why isn't this the answer yet?" — a reasonable question given that the formula's output does look like a completed algebraic expression at first glance. The concept-specific smaller question returns to a direct visual check: **"Look at what you just wrote. Is there still an integral sign — a $\int$ symbol — anywhere in it?"** The learner checks their own work and confirms one is present. Then return: "that means the formula traded your original problem for a SMALLER version of the same problem — not a finished answer. Apply it again to that smaller integral." If the frustration is instead about not knowing when to stop, shrink to the bare check: **"What power is left on the sine — is it 0, is it 1, or is it something bigger?"** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure with an embedded termination-condition requirement** (recognizing the base case is a structural understanding point, not merely a computational step, and must be actively checked for, not assumed). Review by *requiring the learner to state, after each application, whether an integral sign remains and what power it carries*, never accepting a final numeric-looking answer alone as evidence the chain is complete, since a plausible-looking expression can still conceal an unresolved integral.
- Concept-specific deviation: keep at least one review item where the starting exponent is ODD (reaching the $n=1$ base case) and at least one where it is EVEN (reaching the $n=0$ base case), so the learner does not fixate on only one base-case form.
- Interleaving partners: `math.calc.integration-by-parts` (the discriminating partner — reviewing the origin-derivation alongside this concept keeps the "this formula IS integration by parts, packaged" connection alive) and `math.calc.trigonometric-integrals` (not yet authored in this KG), the broader family of techniques this reduction pattern belongs to.

## Transfer Connections
- **Near**: `math.calc.integration-by-parts` (the parent technique this formula is derived from and packages).
- **Far**: proof by mathematical induction (`math.found.proof-by-induction`, already authored) — both share the identical logical structure of a base case plus a step that reduces a general case to a smaller instance of itself.
- **Real-world**: the Blueprint's own transfer probe — computing $\int_0^{2\pi}\cos^6x\,dx$ for a Fourier-analysis average-power calculation — is a direct, literal signal-processing application where repeated even-power trigonometric integrals arise routinely.
- **Expert transfer**: recognizing the reduce-to-a-smaller-instance-of-itself pattern as a general problem-solving strategy, applicable whenever a computation's own output has the same structural shape as its input, not specific to trigonometric integrals.

## Cross-Subject Connections
- **Signal processing/engineering**, real: the Blueprint's own transfer probe (Fourier-analysis average power via $\int\cos^nx\,dx$) is a standard, literal application in filter and signal-analysis computations.
- **Computer science**, real: the base-case-plus-reduction structure of a reduction formula is the exact same logical pattern as a recursive algorithm with a base case and a recursive step — a learner fluent in one recognizes the other immediately.
- **Physics**, real: repeated even-power trigonometric integrals of this exact form arise in computing average power or energy in oscillatory systems (e.g. AC circuits, wave intensity).
- No genuine KG cross_link exists for this concept.

## Blueprint References
`docs/curriculum/blueprints/math.calc.reduction-formulas.md`. Reused by reference, not restated: the Component 1 Learning Objectives, the Component 4 Worked Examples (Example 1 the repeated-application-to-base-case computation breaking MC-1, Example 2 the origin-derivation from integration by parts, Example 3 the base-case recognition breaking MC-2), the Component 5 Teaching Actions (A01 P64 conceptual shift, A02 P11 representation shift, A03 P06 contrast pair, A04 P91 mastery gate at MAMR 4/5), the Component 6 Misconception Registry (MC-1, MC-2) and repair actions (B01, B02), the four-item P77 problem set, and the P76 independence-mode transfer probe (the Fourier-analysis average-power problem). This entry adds independent birth-type classification for both misconceptions (the Blueprint marks severities but assigns no birth type), the mental-model ladder, the anti-analogy, and the argued direct-instruction-for-the-origin-derivation / guided-discovery-for-the-repeated-application-and-base-case split.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
No Blueprint/KG metadata discrepancy was found for this concept — the Blueprint's stated requires (`math.calc.integration-by-parts`), unlocks (none), cross_links (none), difficulty (advanced), bloom (apply), mastery_threshold (0.70), and estimated_hours (4) all match the live KG's own fields exactly, confirmed by direct query. This is the first of four zero-discrepancy concepts in this batch, continuing the streak restarted in Batch 43 after Batch 42's `arc-length` broke the prior five-consecutive-zero run — this would make Batch 45 the third consecutive all-4-zero-discrepancy batch if the pattern holds across the remaining three entries.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 45).
