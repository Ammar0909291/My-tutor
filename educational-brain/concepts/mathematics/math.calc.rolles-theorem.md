# math.calc.rolles-theorem

## Identity
- **KG ID**: `math.calc.rolles-theorem`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.mean-value-theorem` — load-bearing part: Rolle's Theorem IS the direct special case of the MVT where the endpoint values are equal, so the MVT's own hypotheses, conclusion, and existence-not-uniqueness discipline are directly reused here.
- **Unlocks**: none in the KG.
- **Cross-links**: none in the KG.
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.80 (MAMR = ⌈0.80×5⌉ = 4/5)
- **Estimated hours**: 3
- **Blueprint**: `docs/curriculum/blueprints/math.calc.rolles-theorem.md` (reused by reference throughout)

## Learning Objective
- The learner can state Rolle's Theorem's THREE hypotheses precisely — $f$ continuous on $[a,b]$, differentiable on $(a,b)$, and $f(a)=f(b)$ — and recognize ALL THREE must hold before the conclusion (existence of $c\in(a,b)$ with $f'(c)=0$) is guaranteed.
- The learner can recognize Rolle's Theorem as the SPECIAL CASE of the Mean Value Theorem where the endpoint values are equal — the MVT's conclusion $f'(c)=\frac{f(b)-f(a)}{b-a}$ collapses to $f'(c)=0$ exactly when $f(a)=f(b)$ makes the average rate of change zero.
- The learner can recognize that when a hypothesis FAILS, the conclusion may still happen to hold by coincidence, but is NOT guaranteed — the theorem's power is in the guarantee, not in every individual case.

## Core Understanding
Rolle's Theorem states: if $f$ is continuous on $[a,b]$, differentiable on $(a,b)$, and $f(a)=f(b)$, then there exists at least one $c\in(a,b)$ with $f'(c)=0$ — geometrically, if a smooth curve starts and ends at the SAME height, it must have a horizontal tangent somewhere in between. This theorem is not an independent result requiring its own separate proof machinery — it is EXACTLY the special case of the Mean Value Theorem where $f(a)=f(b)$: the MVT guarantees $f'(c)=\frac{f(b)-f(a)}{b-a}$ for some $c$, and when the endpoint values are equal, the numerator $f(b)-f(a)$ becomes 0, collapsing the guaranteed value specifically to $f'(c)=0$. All THREE hypotheses are essential, and this is not a matter of degree: if even ONE fails — the function isn't differentiable at some interior point, or the endpoint values genuinely differ — the theorem's CONCLUSION is no longer guaranteed. The conclusion might still happen to hold in a particular example, purely by coincidence, but the theorem provides no such assurance once any hypothesis is violated; there is no partial credit for "mostly satisfying" the conditions.

## Mental Models
1. **Beginner — "Rolle's Theorem says if the endpoints match, there's a flat spot somewhere in between."** The theorem is applied by pattern-matching on equal endpoints alone, without systematically verifying continuity and differentiability first. *Upgrade trigger*: applying the theorem to a function with a corner or discontinuity somewhere in the interval, and finding no horizontal tangent actually exists.
2. **Intermediate — "check all three hypotheses — continuity, differentiability, and equal endpoints — before concluding a horizontal tangent must exist."** The full hypothesis-verification discipline is now present as a required first step. *Upgrade trigger*: being asked to connect this theorem's formula to the more general Mean Value Theorem's own conclusion formula.
3. **Advanced — "Rolle's Theorem is exactly the MVT with $f(a)=f(b)$, which makes the average rate of change zero — collapsing the general conclusion to a horizontal tangent specifically; and any single failed hypothesis, not just a majority failure, fully voids the guarantee."** The theorem is now understood as a special case within a larger framework, with the all-or-nothing nature of hypothesis-checking fully internalized. *Upgrade trigger*: encountering a proof (of, say, the Fundamental Theorem of Calculus or a root-counting argument) that USES Rolle's Theorem as an intermediate step, rather than merely applying the theorem to a single function directly.
4. **Expert — Rolle's Theorem, though a special case, is itself a foundational LEMMA used to prove the more general Mean Value Theorem in a rigorous real-analysis treatment (and, further, results like the uniqueness of polynomial roots via repeated differentiation).** The learner recognizes the theorem's role as a building block within larger mathematical arguments, not merely a standalone computational tool. *Shelf life*: permanent.

## Why Students Fail
The dominant failure skips explicitly verifying the equal-endpoints hypothesis before proceeding directly to solving $f'(c)=0$: since many textbook examples are deliberately constructed so that $f(a)=f(b)$ genuinely holds, a learner accustoms to jumping straight to the algebra without confirming the equality first, treating it as an assumed given rather than a condition requiring verification (MC-1, EQUAL-ENDPOINT-HYPOTHESIS-NOT-EXPLICITLY-VERIFIED) — a Type 5 instruction-induced gap, closely paralleling the identical hypothesis-skipping mechanism already documented for `math.calc.mean-value-theorem`'s own MC-1, HYPOTHESES-NOT-CHECKED, here recurring in Rolle's narrower special case. A second, distinct failure treats the theorem's three hypotheses as cumulative evidence rather than an all-or-nothing gate: since satisfying TWO of the three conditions (say, continuity and equal endpoints) FEELS like substantial progress toward the guarantee, a learner assumes the conclusion should "mostly" or "approximately" still hold even when the third hypothesis (differentiability) genuinely fails somewhere in the interval — missing that mathematical hypotheses function as strict gates, not partial credit systems, and that a single failure can make the conclusion genuinely false, not merely less certain (MC-2, PARTIAL-HYPOTHESIS-SATISFACTION-ASSUMED-TO-STILL-GUARANTEE-THE-CONCLUSION) — a Type 1 overgeneralization of the everyday, non-mathematical reasoning pattern "mostly meeting the conditions mostly gets you the result," extended into formal logic where a theorem's hypotheses admit no such partial satisfaction.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1, MC-2) and its own repair actions B01–B02. **The Blueprint's Misconception Registry carries a Severity column (Moderate, Foundational) but no explicit birth-type column**; both classifications below are independently assigned here.

- **MC-1 — EQUAL-ENDPOINT-HYPOTHESIS-NOT-EXPLICITLY-VERIFIED** (the Blueprint's own "Moderate" severity misconception)
  - **Birth type**: Type 5, instruction-induced — the identical hypothesis-skipping mechanism already documented for `math.calc.mean-value-theorem`'s own MC-1 (HYPOTHESES-NOT-CHECKED), here recurring in Rolle's narrower special case, since deliberately-constructed worked examples rarely demonstrate a genuine endpoint-inequality failure to contrast against.
  - **Characteristic phrase**: proceeding directly to solve $f'(c)=0$ without first computing and comparing $f(a)$ and $f(b)$.
  - **Detection probe** (Blueprint's A01 hook): check whether $f(a)=f(b)$ is explicitly verified, not just assumed.
  - **Repair**: Blueprint Repair Action B01 — re-work the problem, computing and comparing $f(a)$ and $f(b)$ explicitly first.
  - **Verification of death**: given a fresh function and interval, the learner computes $f(a)$ and $f(b)$ and confirms their equality BEFORE attempting to solve $f'(c)=0$.

- **MC-2 — PARTIAL-HYPOTHESIS-SATISFACTION-ASSUMED-TO-STILL-GUARANTEE-THE-CONCLUSION** (the Blueprint's own "Foundational" misconception)
  - **Birth type**: Type 1, overgeneralization. Everyday, non-mathematical reasoning treats "mostly meeting the conditions" as roughly as good as fully meeting them; this pattern is extended into formal mathematical logic, where a theorem's hypotheses function as an all-or-nothing gate rather than a scale admitting partial credit.
  - **Characteristic phrase**: assuming the theorem's conclusion should "probably still" hold since two of the three hypotheses (continuity, equal endpoints) are satisfied, even when differentiability genuinely fails.
  - **Detection probe** (Blueprint's A02 hook): this directly targets MC-2 (assuming partial hypothesis satisfaction still provides some guarantee).
  - **Repair**: Blueprint Repair Action B02 — re-verify each hypothesis individually, confirming one failure fully voids the guarantee, then directly checking that $f'(c)=0$ genuinely has no solution in the failing example.
  - **Verification of death**: given a fresh example where exactly one hypothesis fails, the learner correctly states the theorem's guarantee no longer applies, without assuming the conclusion "probably" still holds.

## Analogies
- **Best — a ball thrown straight up, landing back at the same height.** If a ball leaves the ground and returns to exactly the same height, there must be some instant — the peak of its flight — where its velocity is exactly zero. This is Rolle's Theorem made physically vivid: equal "endpoints" (launch and landing height) forcing a zero-rate instant somewhere in between.
- **Alternative — a recipe with three required ingredients, none optional.** Just as a recipe genuinely fails if even one required ingredient is missing (not merely tastes "a bit off"), Rolle's Theorem's guarantee is void the moment any ONE of its three hypotheses fails — there is no partial dish from a partial recipe.
- **ANTI-ANALOGY — "as long as most of the conditions are met, the theorem basically still applies."** This phrasing licenses MC-2 directly, implying hypotheses admit partial or approximate satisfaction, when mathematical theorems are strict if-then statements with an all-or-nothing "if." Say "every single hypothesis must hold — missing even one voids the guarantee completely, regardless of how many others are satisfied" instead.

## Demonstrations
- **The endpoint-verification habit.** For $f(x)=x^2-4x+3$ on $[1,3]$, compute $f(1)=0$ and $f(3)=0$ EXPLICITLY as a first step, before attempting to solve $f'(c)=0$. *Predict, before computing, whether the endpoints will actually be equal.* Confirming the equality as an explicit, verified step (not an assumed given) is the demonstration for MC-1.
- **The hypothesis-failure case.** For $f(x)=|x|$ on $[-1,1]$ (Example 2), confirm continuity and equal endpoints hold, but differentiability FAILS at $x=0$. *Predict whether a horizontal tangent will still exist somewhere in $(-1,1)$ despite two of three hypotheses holding.* Finding NO solution to $f'(c)=0$ anywhere in the interval (since $f'=\pm1$ everywhere it's defined) is the demonstration for MC-2 — the conclusion genuinely fails when even one hypothesis breaks.
- **The MVT-collapse re-derivation.** For $f(x)=x^2$ on $[0,2]$ (Example 3, where the endpoints are NOT equal), apply the more general MVT instead and find $f'(c)=2$, contrasting with Rolle's own $f'(c)=0$ conclusion. *Predict, before computing, whether Rolle's Theorem could be used here at all.* Confirming Rolle's Theorem does not apply (unequal endpoints) while the MVT still does is the demonstration that Rolle's is the narrower, special case.

## Discovery Questions
Direct instruction is the argued call for the theorem's own precise three-hypothesis statement (best presented explicitly), but the endpoint-verification habit (MC-1) and the all-or-nothing hypothesis discipline (MC-2) are both genuinely discoverable by direct trial.
1. **Need** — "Try to find $c$ with $f'(c)=0$ for $f(x)=|x|$ on $[-1,1]$. Does one exist?" It does not, despite two of three hypotheses holding.
2. **Playground** — try the same search on a couple more functions, some meeting all three hypotheses, some failing exactly one.
3. **Invention** — "Why did the $|x|$ case fail to produce a horizontal tangent, when the endpoints DID match?" Let the learner connect it to the missing differentiability at $x=0$.
4. **Collision** — confront a learner who assumed the conclusion should "still roughly hold" with the direct fact that $f'(x)=\pm1$ never equals 0 anywhere in the interval.
5. **Formalisation** — state the theorem's precise wording: ALL THREE hypotheses (continuity, differentiability, equal endpoints) must hold before the conclusion is guaranteed.
6. **Compression** — "All three, or none of the guarantee."

## Teaching Sequence
The endpoint-verification habit (MC-1) must be established FIRST via explicit hypothesis-checking (per the Blueprint's own A01), since a learner who has not internalized "verify $f(a)=f(b)$ before solving" has no reliable foundation for recognizing WHEN the theorem genuinely applies — a prerequisite for correctly interpreting the hypothesis-failure case that follows. The all-or-nothing hypothesis discipline (MC-2) follows directly, per the Blueprint's own A02, using Example 2's direct evidence that a failed hypothesis genuinely voids the conclusion (not merely weakens it). The MVT-connection (Example 3, per the Blueprint's own A03) is placed LAST, once the hypothesis-checking discipline is fluent, so the special-case relationship reinforces rather than substitutes for understanding Rolle's own precise statement. Turn-level scripts for A01–A04 are owned by the Blueprint's Component 5 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the endpoint-verification habit (Example 1), explicitly computing and comparing $f(a)$ and $f(b)$ BEFORE attempting to solve for $c$. First action; anchors the hypothesis-checking discipline concretely.
- **TEST-THINKING: Error Analysis** — "A student solved $f'(c)=0$ for a function without first checking whether $f(a)=f(b)$. What might be wrong with this approach?" targets MC-1 directly.
- **DO: Demonstration** — the hypothesis-failure case (Example 2, $f(x)=|x|$), showing the conclusion genuinely fails despite two of three hypotheses holding.
- **TEST-THINKING: Prediction** — "If two of the three hypotheses hold but one fails, does the theorem's conclusion still roughly apply?" asked BEFORE working Example 2. Surfaces MC-2 in one turn.
- **Does NOT fit: the Extended/Generalized Mean Value Theorem (Cauchy's Mean Value Theorem), or using Rolle's Theorem as a lemma within a larger proof (like root-counting arguments), here.** This concept covers Rolle's Theorem's own statement and its relationship to the MVT only; its use as a proof technique within larger arguments belongs to more advanced treatments not yet present in this KG.

## Voice Teaching Notes
The load-bearing sentence is "all three hypotheses, or none of the guarantee — check every one, every time." Say it every time a new Rolle's Theorem problem is set up, not just the first. Listen for a learner who jumps straight to solving $f'(c)=0$ without first stating whether $f(a)=f(b)$ — that specific jump is the tell for MC-1. Listen for a learner who, upon discovering a hypothesis fails, still expects a horizontal tangent to exist "close enough" — that expectation is the tell for MC-2. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Solves $f'(c)=0$ without first explicitly verifying $f(a)=f(b)$** — MC-1. Route to the endpoint-verification habit, on the exact function in question.
- **Assumes the conclusion still roughly holds when a hypothesis (typically differentiability) genuinely fails** — MC-2. Route to the hypothesis-failure case, on the exact function in question.
- **Correctly verifies all three hypotheses explicitly before solving, and declines to apply the theorem when any one fails** — the intended target state.
- **Mastery trigger**: the Blueprint's A04 gate, MAMR 4/5 (⌈0.80×5⌉=4). The 4-item P77 set plus the P76 transfer probe (the ball-in-flight zero-velocity argument) must include at least one item requiring the learner to identify WHICH specific hypothesis fails in a non-applicable case, not merely compute $c$ for an applicable one — a gate made only of correct-computation items risks certifying mechanics without certifying the conceptual discrimination against MC-2.

## Tutor Recovery Strategy
The likely utterance here is "the function is continuous and the endpoints match — isn't that enough for Rolle's Theorem to apply?" — a reasonable question given how much of the hypothesis checklist has been satisfied. The concept-specific smaller question returns to the third, unchecked hypothesis: **"Is the function differentiable EVERYWHERE on the open interval — no corners, no breaks?"** The learner checks and may find a corner (like $|x|$'s at $x=0$). Then return: "that corner means the differentiability hypothesis fails — and even though the other two hold, ALL three are required. The guarantee is void, and indeed, if you check, there's genuinely no horizontal tangent here." If the frustration is instead about skipping the endpoint check, shrink to the bare check: **"Compute $f(a)$. Now compute $f(b)$. Are they the same number?"** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **theorem statement with an embedded all-or-nothing hypothesis-verification requirement** (checking all three hypotheses individually, with no partial credit for satisfying only some, is the single most load-bearing discipline in this concept, not a computational step). Review by *requiring the learner to state each of the three hypotheses individually and confirm each holds, one at a time, before attempting any computation*, never accepting a correctly-found value of $c$ alone as evidence of understanding, since a learner can occasionally find a valid $c$ by direct computation on an example where all hypotheses happen to hold, without having actually verified them.
- Concept-specific deviation: keep at least one review item where exactly ONE hypothesis fails (varying which one — sometimes differentiability, sometimes the equal-endpoints condition), so the all-or-nothing discipline against MC-2 stays exercised across different failure types.
- Interleaving partners: `math.calc.mean-value-theorem` (the discriminating partner — reviewing the general MVT alongside this concept keeps the "Rolle's is the special case where $f(a)=f(b)$" relationship explicit, and prevents the two theorems' hypotheses and conclusions from blurring together) and `math.calc.differentiability`, whose own corner/cusp examples are the most common source of the differentiability-hypothesis-failure case.

## Transfer Connections
- **Near**: `math.calc.mean-value-theorem` (the general theorem this concept is a direct special case of).
- **Far**: root-counting and uniqueness arguments in more advanced analysis, where Rolle's Theorem is used as a LEMMA — e.g. if a function has $n$ roots, its derivative must have at least $n-1$ roots, by repeated application of Rolle's Theorem between consecutive roots.
- **Real-world**: the Blueprint's own transfer probe — a ball thrown up and returning to the same height — is a direct, intuitive physical instance of the equal-endpoints hypothesis producing a guaranteed zero-velocity instant.
- **Expert transfer**: recognizing that a theorem's hypotheses form a strict, all-or-nothing logical gate — a discipline that recurs across every "if-then" theorem in mathematics, not specific to Rolle's Theorem.

## Cross-Subject Connections
- **Physics**, real: the Blueprint's own transfer probe (a projectile's identical launch and landing height guaranteeing a zero-velocity instant at the peak) is a standard, intuitive application in kinematics.
- **Engineering**, real: verifying that a system returning to an initial state must have passed through a zero-rate-of-change instant (e.g. in oscillatory or cyclic systems) is a direct application of this exact theorem.
- **Mathematics itself**, real: Rolle's Theorem is a standard proof technique (a lemma) used within more advanced real-analysis and numerical-methods arguments, such as bounding the number of roots of a polynomial.
- No genuine KG cross_link exists for this concept.

## Blueprint References
`docs/curriculum/blueprints/math.calc.rolles-theorem.md`. Reused by reference, not restated: the Component 1 Learning Objectives, the Component 4 Worked Examples (Example 1 the basic application breaking MC-1, Example 2 the hypothesis-failure case breaking MC-2, Example 3 the MVT-connection), the Component 5 Teaching Actions (A01 P64 conceptual shift, A02 P06 contrast pair, A03 P11 representation shift, A04 P91 mastery gate at MAMR 4/5), the Component 6 Misconception Registry (MC-1, MC-2) and repair actions (B01, B02), the four-item P77 problem set, and the P76 independence-mode transfer probe (the ball-in-flight zero-velocity argument). This entry adds independent birth-type classification for both misconceptions (the Blueprint marks severities but assigns no birth type), the mental-model ladder, the anti-analogy, the explicit cross-reference of MC-1 to `math.calc.mean-value-theorem`'s own MC-1 as the identical hypothesis-skipping mechanism recurring in a special case, and the argued direct-instruction-for-the-theorem-statement / guided-discovery-for-the-hypothesis-verification-and-failure-case split.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
No Blueprint/KG metadata discrepancy was found for this concept — the Blueprint's stated requires (`math.calc.mean-value-theorem`), unlocks (none), cross_links (none), difficulty (advanced), bloom (apply), mastery_threshold (0.80), and estimated_hours (3) all match the live KG's own fields exactly, confirmed by direct query. This is the second of four zero-discrepancy concepts in this batch, continuing the streak restarted in Batch 43 after Batch 42's `arc-length` broke the prior five-consecutive-zero run.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 46).
