# math.calc.integral-area

## Identity
- **KG ID**: `math.calc.integral-area`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.definite-integral` — load-bearing part: area under a curve IS the definite integral's own value, when $f\ge0$; this concept adds no new operation, only the geometric interpretation and the top-minus-bottom setup for regions between curves.
- **Unlocks**: `math.calc.volume-revolution` (whose disk/washer method extends this concept's vertical-strip reasoning into three dimensions).
- **Cross-links**: none in the KG.
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.80
- **Estimated hours**: 8
- **Blueprint**: `docs/curriculum/blueprints/math.calc.integral-area.md` (reused by reference throughout)

## Learning Objective
- The learner can compute the area under $y=f(x)\ge0$ on $[a,b]$ as $\int_a^bf(x)\,dx$, recognizing this as a direct application of the already-known definite integral, not a new operation.
- The learner can compute the area BETWEEN two curves $f(x)\ge g(x)$ on $[a,b]$ as $\int_a^b[f(x)-g(x)]\,dx$, correctly identifying which function is on top BEFORE setting up the integral.
- The learner can recognize, at orientation level, that a single unsplit integral of a sign-changing $f$ computes SIGNED area, not genuine unsigned area, requiring the interval to be split at $f$'s zeros for the true total.

## Core Understanding
Area under a curve requires no new definition — `math.calc.definite-integral` already established $\int_a^bf(x)\,dx$ as the limit of Riemann sums, and when $f(x)\ge0$ on $[a,b]$, each thin rectangle in that sum genuinely represents a piece of the region's area, so the limit itself IS the area. The only new content is the geometric OBSERVATION, not a new procedure. Extending this to the area BETWEEN two curves $f(x)\ge g(x)$: imagine a thin vertical strip at each $x$, with height $f(x)-g(x)$ (top minus bottom) and width $\Delta x$ — summing and taking the limit gives $\int_a^b[f(x)-g(x)]\,dx$, which generalizes the under-a-curve case as the special instance $g(x)=0$ (the x-axis as the "bottom curve"). Correctly identifying WHICH function is genuinely on top over the interval is essential, not a minor bookkeeping detail — reversing $f$ and $g$ flips the sign of every strip and produces the exact negative of the correct area. When $f$ dips below the x-axis somewhere on $[a,b]$, a single unsplit integral computes SIGNED area — the negative region's contribution genuinely SUBTRACTS rather than adds, so it can partially or fully cancel positive contributions — and computing the genuine (unsigned) TOTAL area requires locating $f$'s zeros, splitting the interval there, and using $\int|f(x)|\,dx$ region by region, never a single unmodified integral over the whole span.

## Mental Models
1. **Beginner — area under a curve needs a new area formula.** Treats "find the area" as a fresh skill separate from evaluating a definite integral. *Upgrade trigger*: realizing the exact same Fundamental-Theorem evaluation from `definite-integral` already gives the answer. *Shelf life*: about one lesson.
2. **Intermediate — area under a curve IS the definite integral's value, when $f\ge0$.** No new operation, just a geometric label attached to an already-known number. *Upgrade trigger*: a region between TWO curves, where the "under a curve" framing alone doesn't directly apply.
3. **Advanced — area between curves is top-minus-bottom, strip by strip; a single integral over a sign-changing $f$ gives SIGNED, not unsigned, area.** The vertical-strip reasoning generalizes cleanly, but genuine total area needs splitting at zeros when $f$ changes sign. *Upgrade trigger*: needing to set up an area computation where the identity of "top" and "bottom" swaps partway across the interval — this model handles a fixed top/bottom relationship, not one that changes.
4. **Expert — "area" is one geometric APPLICATION of the definite integral among many (volume, arc length, work, probability), each interpreting the same Riemann-sum limit through a different lens.** The definite integral itself is the general tool; area, volume, and the others are specific readings of what the accumulated sum represents. *Shelf life*: permanent.

## Why Students Fail
The dominant failure is treating "finding area" as a genuinely NEW skill rather than recognizing it as the already-known definite integral wearing a geometric label — new vocabulary ("area under the curve") introduced without an immediate, explicit connection back to the identical Riemann-sum-limit computation already mastered, producing the belief that area-finding requires its own separate procedure (MC-1, AREA-UNDER-CURVE-ASSUMED-NEW-OPERATION). A second failure is an overgeneralization of subtraction's superficial symmetry into a genuinely order-DEPENDENT setup: a learner assumes $f(x)-g(x)$ and $g(x)-f(x)$ are interchangeable ways to set up the same area, missing that the integrand's sign flips entirely depending on which function is actually on top — the exact same order-sensitivity mechanism already documented for `math.calc.quotient-rule`'s own MC-2, here applied to integral setup rather than differentiation (MC-2, TOP-BOTTOM-ORDER-ASSUMED-ARBITRARY). The third failure directly imports `math.calc.definite-integral`'s own signed-area lesson, but inverted: having correctly learned earlier that the integral is "just a number," a learner now assumes that number automatically equals genuine unsigned area, missing that a negative region's contribution SUBTRACTS rather than adds, requiring the interval to be split at zeros for the true total (MC-3, SIGNED-INTEGRAL-ASSUMED-TO-ALWAYS-GIVE-UNSIGNED-AREA).

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1..MC-3) and its repair actions B01–B03. **The Blueprint's Misconception Registry carries a Severity column (Foundational/High/Moderate) but no explicit birth-type column**; all three classifications below are independently assigned here.

- **MC-1 — AREA-UNDER-CURVE-ASSUMED-NEW-OPERATION** (the Blueprint's own "Foundational" misconception)
  - **Birth type**: Type 5, instruction-induced — the identical mechanism already documented for `math.calc.linearization`'s own MC-1: new vocabulary ("area") introduced alongside an already-mastered computation, without an explicit link back, reads as a new topic.
  - **Characteristic phrase**: treating "find the area under $f(x)=x^2$ on $[0,2]$" as requiring a different procedure from "evaluate $\int_0^2x^2\,dx$."
  - **Detection probe** (verbatim, Blueprint's A01 MC-1 hook): "is computing the area under a curve a genuinely new operation, distinct from evaluating a definite integral you already know how to compute?"
  - **Repair**: Blueprint Repair Action B01 — re-walk Example 1's direct FTC evaluation, re-anchoring on "the area IS the definite integral's value, when $f\ge0$."
  - **Verification of death**: given a fresh area-under-a-curve request, the learner sets up and evaluates the identical definite integral they already know, without treating it as a new procedure.

- **MC-2 — TOP-BOTTOM-ORDER-ASSUMED-ARBITRARY**
  - **Birth type**: Type 1, overgeneralization — the same order-sensitivity mechanism already documented for `math.calc.quotient-rule`'s own MC-2, here applied to subtraction inside an integral setup rather than a derivative formula.
  - **Characteristic phrase**: setting up $g(x)-f(x)$ instead of $f(x)-g(x)$ (or vice versa) without first verifying which function is genuinely on top.
  - **Detection probe** (verbatim, Blueprint's A02 MC-2 hook): "can you set up the area-between-curves integral as $g(x)-f(x)$ just as validly as $f(x)-g(x)$, regardless of which curve is on top?"
  - **Repair**: Blueprint Repair Action B02 — re-walk Example 2's sign-reversal demonstration (correct setup gives $9/2$, reversed gives $-9/2$), re-anchoring on "top minus bottom is required, not an arbitrary choice."
  - **Verification of death**: given a fresh pair of curves, the learner verifies which is on top (checking values at multiple points) BEFORE setting up the integral, without being prompted.

- **MC-3 — SIGNED-INTEGRAL-ASSUMED-TO-ALWAYS-GIVE-UNSIGNED-AREA**
  - **Birth type**: Type 3, language contamination — the inverse direction of the identical mechanism already documented for `math.calc.definite-integral`'s own MC-1 (INTEGRAL-IS-ALWAYS-POSITIVE-AREA): having learned the integral is "just a signed number," a learner now over-trusts that number as automatically equal to genuine (positive) area, missing the earlier lesson's own implication.
  - **Characteristic phrase**: computing $\int_{-1}^2x\,dx=1.5$ and reporting this as "the area," when the genuine unsigned total is $2.5$.
  - **Detection probe** (verbatim, Blueprint's A03 MC-3 hook): "does $\int_a^bf(x)\,dx$ always compute the genuine (unsigned) area under $y=f(x)$, even when $f$ is negative somewhere on $[a,b]$?"
  - **Repair**: Blueprint Repair Action B03 — re-walk Example 3's split-versus-unsplit contrast ($1.5$ signed versus $2.5$ genuine total), re-anchoring on "negative regions subtract rather than add, requiring splitting at the zeros."
  - **Verification of death**: given a fresh sign-changing function, the learner locates the zeros, splits the interval, and computes the genuine unsigned total, without being prompted to check for sign changes first.

## Analogies
- **Best — a bank statement versus a total-cash-handled report.** The signed integral is like a bank statement's net balance change (deposits and withdrawals cancel); genuine unsigned area is like a report of the TOTAL cash that physically moved, counting every withdrawal as a positive amount too — two genuinely different numbers from the same transaction history.
- **Alternative — measuring a two-lane race, one lane per curve.** For area between curves, each vertical strip's height is "how far ahead the top curve is" — reversing which lane you call "ahead" flips the sign, directly countering MC-2.
- **ANTI-ANALOGY — "computing the area is a new formula you need to memorize."** This is exactly the phrasing that licenses MC-1. Say "the area IS the integral's number — you already know how to find it" instead.

## Demonstrations
- **The direct-FTC area evaluation.** Compute $\int_0^2x^2\,dx=8/3$ using the exact FTC procedure from `definite-integral`, then simply LABEL the result "the area." *Predict whether a new procedure is needed before computing.* Realizing none is needed is the demonstration for MC-1.
- **The top-bottom sign-reversal.** Compute the area between $f(x)=x+2$ and $g(x)=x^2$ on $[-1,2]$ correctly ($9/2$) and with the order reversed ($-9/2$). *Predict whether reversing the order changes anything before computing.* The sign flip is the demonstration for MC-2.
- **The split-versus-unsplit contrast.** Compute the signed integral of $f(x)=x$ on $[-1,2]$ ($1.5$) and the genuine split unsigned total ($0.5+2=2.5$). *Predict whether these will be equal before computing both.* The larger unsigned total is the demonstration for MC-3.

## Discovery Questions
Direct instruction is the argued call for the area-under-a-curve identification (it directly reuses an already-known procedure, with nothing new to discover), but the top-bottom order-sensitivity and the signed-vs-unsigned distinction are both genuinely discoverable by direct computation and comparison.
1. **Need** — "Compute the area between $f(x)=x+2$ and $g(x)=x^2$ on $[-1,2]$ using $f-g$. Now try $g-f$. Are they the same?" They're exact negatives.
2. **Playground** — try the same reversed-order comparison on a fresh pair of curves.
3. **Invention** — "What determines which order is correct?" Let the learner articulate "whichever is actually on top."
4. **Collision** — confront a learner who assumed the order was arbitrary with the direct sign-flip evidence.
5. **Formalisation** — state the top-minus-bottom rule and the sign-verification requirement explicitly.
6. **Compression** — "Top minus bottom, always — verify which is which before you subtract."

## Teaching Sequence
The area-under-a-curve identification (MC-1) must come FIRST, as the simplest possible case (the special instance $g(x)=0$), before area-between-curves is introduced — a learner who has internalized "area is just the integral's value" is prepared to see the between-curves formula as a direct generalization rather than a fresh rule. The top-bottom order-sensitivity (MC-2) follows immediately, using the SAME kind of explicit verification-before-integrating discipline the Blueprint's own Teaching Notes single out — checking $f\ge g$ at multiple points is modeled as a REQUIRED step, not an assumption. The signed-vs-unsigned distinction (MC-3) is introduced LAST, at orientation level per the KG's own scoping, since it revisits and extends `definite-integral`'s own signed-area lesson rather than introducing a wholly new idea — the Blueprint deliberately keeps the full general n-sign-change formula out of scope, surveying the concept rather than deriving it exhaustively. Turn-level scripts for A01–A04 are owned by the Blueprint's Component 5 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the direct-FTC area evaluation, explicitly framed as "no new procedure, just a new label." First action; anchors MC-1's resolution concretely.
- **TEST-THINKING: Prediction** — "Will $f(x)-g(x)$ and $g(x)-f(x)$ give the same area?" asked BEFORE computing either. Surfaces MC-2 in one turn.
- **DO: Demonstration** — the split-versus-unsplit contrast on $f(x)=x$ over $[-1,2]$, run with the learner computing both the signed and unsigned versions themselves.
- **TEST-THINKING: Error Analysis** — "A student computed $\int_{-1}^2x\,dx=1.5$ and called it 'the area.' What's the actual unsigned area, and why do they differ?" targets MC-3 directly.
- **Does NOT fit: deriving the fully general formula for area with arbitrarily many sign changes.** LO3 is explicitly orientation-level per the KG description; the Blueprint deliberately surveys signed-vs-unsigned area without deriving a fully general multi-crossing formula.

## Voice Teaching Notes
The load-bearing sentence is "verify which curve is on top before you subtract — and check whether the function changes sign before trusting a single integral as the area." Say it every time an area-between-curves or sign-changing-function problem is set up. Listen for a learner who sets up an area-between-curves integral without first checking values at multiple points — that skipped verification is the tell for MC-2. Listen for a learner who reports a computed integral's raw value as "the area" without checking whether the function ever goes negative on the interval — that unchecked assumption is the tell for MC-3. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Treats area-finding as requiring a genuinely new procedure distinct from evaluating a definite integral** — MC-1. Route to the direct-FTC area evaluation, on the exact function in question.
- **Sets up an area-between-curves integral without verifying which function is on top** — MC-2. Route to the top-bottom sign-reversal, on the exact pair of curves.
- **Reports a signed integral's raw value as genuine unsigned area for a sign-changing function** — MC-3. Route to the split-versus-unsplit contrast, on the exact function in question.
- **Recognizes area-under-a-curve as a direct integral application, verifies top/bottom before setting up an area-between-curves integral, and splits at zeros for genuine unsigned area** — the intended target state.
- **Mastery trigger**: the Blueprint's A04 gate, MAMR 4/5 (⌈0.80×5⌉). The 4-item P77 set plus the P76 independence-mode transfer probe (a riverbed flow-rate area-between-curves computation, plus a signed-vs-unsigned-magnitude discussion) must include at least one item requiring the top/bottom verification step explicitly — a gate made only of already-verified setups certifies the arithmetic without certifying the verification discipline.

## Tutor Recovery Strategy
The likely utterance here is "isn't finding the area a different thing from evaluating an integral?" — a reasonable question given how the two are usually introduced with different-sounding names. The concept-specific smaller question returns directly to a concrete evaluation: **"Evaluate $\int_0^2x^2\,dx$ using the Fundamental Theorem, exactly like you already know how. Now — what does that number REPRESENT, geometrically?"** The learner recognizes it as the shaded region's size, on ground they already own from the identical computation. Then return: "that's it — 'area under the curve' is just the NAME for what that number already means, when $f\ge0$." If the frustration is instead about the top-bottom order, shrink to the bare check: **"At $x=0$, which curve's value is bigger? Now check at $x=1$. Does the answer stay the same?"** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure with two embedded verification steps** (identifying area-as-integral is conceptual; the top/bottom check and the sign-change check are procedural safeguards). Review by *requiring the learner to verify top/bottom AND check for sign changes explicitly*, never accepting a bare final numeric answer, since skipping either visible check lets MC-2 or MC-3 pass undetected even on a problem where the final answer happens to come out right by luck.
- Concept-specific deviation: keep at least one sign-changing function permanently in the review rotation — a review using only always-positive functions never re-exercises the split-at-zeros discipline MC-3 targets.
- Interleaving partners: `math.calc.definite-integral` (the source concept whose own signed-area lesson this concept both reuses for the under-a-curve case and revisits for the sign-change case) and `math.calc.quotient-rule` (the discriminating partner for MC-2's order-sensitivity mechanism, recurring here in a different context).

## Transfer Connections
- **Near**: `math.calc.volume-revolution` (whose disk/washer method extends this concept's own vertical-strip reasoning directly into three dimensions).
- **Far**: arc length and surface-area-of-revolution formulas (met later), which apply the identical "sum thin pieces, take the limit" strategy to a different geometric quantity.
- **Real-world**: the Blueprint's own transfer probe — a riverbed's flow-rate difference between two measurement methods — is a direct, literal application of area-between-curves to a physical accumulated-difference quantity.
- **Expert transfer**: recognizing "area" as one of MANY geometric/physical interpretations of the same underlying Riemann-sum-limit machinery — the same integral, read through different lenses, computes area, volume, arc length, work, or probability depending on what the integrand represents.

## Cross-Subject Connections
- **Physics**, real: work done by a variable force is literally an area-under-a-curve computation (force vs. displacement), and net work by two competing forces is an area-between-curves computation.
- **Environmental science/hydrology**, genuine and central: the Blueprint's own transfer probe (riverbed flow-rate comparison) is a direct, literal application of this concept to accumulated flow differences.
- **Economics**, real: consumer/producer surplus in microeconomics is literally the area between a demand curve and a supply/price line — a standard area-between-curves computation.
- The KG records `cross_links: []`, and no strong cross-subject KG omission is flagged here — the physics/economics connections, while genuine, are applications rather than structural KG dependencies.

## Blueprint References
`docs/curriculum/blueprints/math.calc.integral-area.md`. Reused by reference, not restated: the Component 1 Learning Objectives, the Component 4 Worked Examples (Example 1 the area-under-a-curve identification, Example 2 the area-between-curves top/bottom setup, Example 3 the signed-vs-unsigned orientation-level survey), the Component 5 teaching actions (A01 P11 representation shift, A02 P28 conflict evidence, A03 P06 contrast pair, A04 P91 mastery gate at MAMR 4/5), the Component 6 Misconception Registry (MC-1..MC-3) and repair actions (B01–B03), the P77 four-item problem set, and the P76 independence-mode transfer probe (the riverbed flow-rate analysis). This entry adds independent birth-type classification for all three misconceptions (the Blueprint marks severities but assigns no birth type), the mental-model ladder, the anti-analogy, the argued direct-instruction-for-area-identification / guided-discovery-for-order-and-sign split, and the explicit cross-reference naming MC-2's and MC-3's mechanisms as recurrences already documented for `math.calc.quotient-rule` and `math.calc.definite-integral` respectively.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
No Blueprint/KG metadata discrepancy was found for this concept — the Blueprint's stated unlocks (`math.calc.volume-revolution`) and empty cross_links match the live KG's own fields exactly, confirmed by direct query. Recorded as a positive finding, continuing the pattern begun in Batch 38 — this batch's fifth consecutive zero-discrepancy entry.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 41).
