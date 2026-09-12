# math.calc.increasing-decreasing

## Identity
- **KG ID**: `math.calc.increasing-decreasing`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.mean-value-theorem` — load-bearing part: the increasing/decreasing test is not an independent fact but is DERIVED directly from the MVT, applied to any two points in an interval where $f'$ has a fixed sign.
- **Unlocks**: `math.calc.critical-points` (already authored — see Curriculum Feedback).
- **Cross-links**: none in the KG.
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.8 (MAMR = ⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 4
- **Blueprint**: `docs/curriculum/blueprints/math.calc.increasing-decreasing.md` (reused by reference throughout)

## Learning Objective
- The learner can state and apply the increasing/decreasing test: $f'(x)>0$ throughout an interval implies $f$ is increasing there; $f'(x)<0$ throughout implies decreasing.
- The learner can PROVE the test using the Mean Value Theorem — for any $x_1<x_2$ in the interval, the MVT guarantees some $c$ between them with $f'(c)=\frac{f(x_2)-f(x_1)}{x_2-x_1}$, and $f'(c)$'s known sign directly forces $f(x_2)-f(x_1)$ to share that sign.
- The learner can use sign analysis of $f'$ across critical points to partition a domain into intervals of increase/decrease, testing only ONE sample point per interval, and correctly recognize when a critical point does NOT actually interrupt monotonicity.

## Core Understanding
The increasing/decreasing test is not a standalone fact to memorize — it is a direct CONSEQUENCE of the Mean Value Theorem. Given any two points $x_1<x_2$ in an interval where $f'$ is known to be positive throughout, the MVT guarantees the existence of some $c\in(x_1,x_2)$ satisfying $f'(c)=\frac{f(x_2)-f(x_1)}{x_2-x_1}$; since $f'(c)$ must be positive (it is one of the values $f'$ takes on the interval) and $x_2-x_1>0$, the equation forces $f(x_2)-f(x_1)>0$ — exactly the definition of increasing. The mirror argument, with the inequality reversed, handles the decreasing case. This proof is what licenses a genuinely efficient application procedure: rather than checking $f'$'s sign at every point of an interval, locate the CRITICAL POINTS (where $f'=0$ or is undefined) — since $f'$ is continuous between consecutive critical points, a sign change strictly between two of them would, by the Intermediate Value Theorem, force $f'$ to pass through zero somewhere in between, which would itself BE another critical point, contradicting that the two chosen were consecutive. So the sign of $f'$ is guaranteed constant on each critical-point-bounded sub-interval, and testing just ONE sample point per sub-interval determines the increasing/decreasing status for that ENTIRE sub-interval. Crucially, not every critical point actually interrupts monotonicity: a critical point where $f'$ merely touches zero WITHOUT changing sign (like $f(x)=x^3$ at $x=0$, where $f'(x)=3x^2\geq0$ everywhere) leaves the function's monotonicity status genuinely unbroken across it.

## Mental Models
1. **Beginner — "if f' is positive, the function goes up; if negative, it goes down."** The test is applied as a memorized rule, with no sense of why it's true or how to apply it efficiently across multiple intervals. *Upgrade trigger*: being asked to justify the test, or encountering a function with several critical points requiring a systematic breakdown.
2. **Intermediate — "find the critical points, test one point in each resulting interval, and that sign tells you the whole interval's behavior."** The efficient sign-analysis procedure is now present, though perhaps not yet justified beyond "that's how it's done." *Upgrade trigger*: encountering a critical point where the sign of $f'$ does NOT actually change (like $x^3$'s critical point at 0), and needing to recognize the interval on both sides is still one continuous increasing stretch.
3. **Advanced — "the test follows directly from the MVT; and between consecutive critical points, one sample point suffices because a sign change there would itself create a new critical point — a genuine logical guarantee, not a shortcut taken on faith."** Both the WHY (the MVT proof) and the efficient application procedure's own justification (the IVT-based argument) are now explicit. *Upgrade trigger*: needing to determine not just where a function increases or decreases, but where it has local extrema — the natural next question this test's own machinery sets up.
4. **Expert — the increasing/decreasing test is one instance of a general pattern: local information (the sign of a derivative) that, once shown to be constant on a connected piece via a continuity/IVT argument, yields global conclusions (monotonicity) on that whole piece.** The learner recognizes this local-to-global reasoning pattern as reusable across many calculus results, not specific to this one test. *Shelf life*: permanent.

## Why Students Fail
The dominant failure over-extends a genuinely correct observation — that a critical point OFTEN marks a transition between increasing and decreasing behavior — into a universal rule that ANY critical point inside an interval necessarily breaks monotonicity there, missing that some critical points (where $f'$ touches zero without actually changing sign, like $x^3$ at $x=0$) leave the function's increasing or decreasing status genuinely unbroken across them (MC-1, CRITICAL-POINT-ASSUMED-TO-BREAK-MONOTONICITY) — a Type 1 overgeneralization of the typical introductory examples (where critical points DO mark sign changes) extended past the subtler cases where they do not. A second, distinct failure distrusts the efficient one-sample-point-per-interval procedure, defaulting instead to testing many points throughout each critical-point-bounded interval "to be safe" — missing the structural (IVT-based) guarantee that a sign change strictly between two consecutive critical points would itself create a new critical point there, contradicting consecutiveness (MC-2, SIGN-ANALYSIS-REQUIRES-EXHAUSTIVE-TESTING) — a Type 5 instruction-induced gap, since the one-point shortcut is frequently taught as a bare procedural rule without its own logical justification ever being demonstrated. A third failure treats "$f'>0$ implies increasing" as an isolated fact to recall rather than a theorem with a specific proof, unable to explain WHY the test works when asked directly (MC-3, TEST-CITED-WITHOUT-MVT-JUSTIFICATION) — again a Type 5 instruction-induced gap, since many treatments present the test as a standalone rule immediately usable for computation, with the MVT-based derivation optional or omitted.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1, MC-2, MC-3) and its own repair actions B01–B03. **The Blueprint's Misconception Registry carries a Severity column (Foundational, Moderate, Moderate) but no explicit birth-type column**; all three classifications below are independently assigned here.

- **MC-1 — CRITICAL-POINT-ASSUMED-TO-BREAK-MONOTONICITY** (the Blueprint's own "Foundational" misconception)
  - **Birth type**: Type 1, overgeneralization. Introductory examples of sign analysis typically feature critical points that genuinely DO mark a sign change; the pattern "critical point → monotonicity breaks" is extended past the subtler cases (like $x^3$ at $x=0$) where the derivative touches zero without changing sign.
  - **Characteristic phrase**: answering "yes, since there's a critical point in the interval" when asked whether $f(x)=x^3$'s critical point at $x=0$ breaks its increasing behavior on $\mathbb{R}$.
  - **Detection probe** (Blueprint's A01 hook): present Example 3's $f(x)=x^3$ and its critical point at $x=0$, then ask whether this breaks the function's increasing behavior on $\mathbb{R}$.
  - **Repair**: Blueprint Repair Action B01 — re-anchor on checking whether the SIGN of $f'$ actually changes across the critical point, not merely whether a critical point is present.
  - **Verification of death**: given a fresh critical point, the learner explicitly checks the sign of $f'$ immediately on both sides before concluding whether monotonicity is interrupted.

- **MC-2 — SIGN-ANALYSIS-REQUIRES-EXHAUSTIVE-TESTING** (the Blueprint's own "Moderate" severity misconception)
  - **Birth type**: Type 5, instruction-induced. The efficient one-sample-point-per-interval shortcut is often presented as a bare procedural rule, without demonstrating the IVT-based guarantee that justifies why a single test point suffices, leaving a learner without the shortcut's own logical backing to trust it.
  - **Characteristic phrase**: testing multiple points within a single critical-point-bounded interval, uncertain whether one point is genuinely sufficient.
  - **Detection probe**: ask a student performing sign analysis whether they need to test more than one point per critical-point-bounded interval.
  - **Repair**: Blueprint Repair Action B02 — re-derive the IVT-based guarantee explicitly: a sign change strictly between two consecutive critical points would itself create a new critical point, contradicting consecutiveness.
  - **Verification of death**: given a fresh function with multiple critical points, the learner tests exactly one sample point per resulting interval, without redundant re-testing.

- **MC-3 — TEST-CITED-WITHOUT-MVT-JUSTIFICATION** (the Blueprint's own "Moderate" severity misconception)
  - **Birth type**: Type 5, instruction-induced. Many treatments present the increasing/decreasing test as an immediately usable computational rule, leaving its MVT-based derivation optional or absent, so the test is learned as an isolated fact rather than a proven consequence.
  - **Characteristic phrase**: restating "if $f'>0$, then $f$ is increasing" when asked to justify the test, without referencing the Mean Value Theorem.
  - **Detection probe**: ask a student to justify the increasing/decreasing test and check whether they reference the MVT or just restate the rule.
  - **Repair**: Blueprint Repair Action B03 — walk through the MVT-based derivation explicitly, connecting the secant-slope/tangent-slope relationship to the conclusion.
  - **Verification of death**: given a fresh request to justify the test, the learner reproduces the MVT-based argument (secant slope equals some tangent slope in between) rather than merely restating the rule.

## Analogies
- **Best — a hiking trail where the slope is measured continuously, never suddenly jumping.** If every measured slope along a stretch of trail is uphill, the trail as a whole must rise from start to end — this is the physical content of the test, and the MVT is what guarantees the "average slope between any two points matches some measured slope in between."
- **Alternative — a temperature reading that can't secretly skip values.** Just as a continuously-varying temperature can't jump from cold to hot without passing through every value in between (the Intermediate Value Theorem), a continuous derivative can't switch sign without passing through zero — which is exactly why a sign change between consecutive critical points is logically impossible.
- **ANTI-ANALOGY — "a critical point is always a turning point."** This phrasing licenses MC-1 directly, implying every critical point necessarily marks a switch from increasing to decreasing (or vice versa), when some critical points (like $x^3$'s at $x=0$) genuinely do not. Say "a critical point is a place the sign of $f'$ MIGHT change — check it, don't assume it" instead.

## Demonstrations
- **The non-turning critical point.** For $f(x)=x^3$, compute $f'(x)=3x^2$ and note it is $\geq0$ everywhere, touching zero only at $x=0$. *Predict whether the function's increasing behavior on $\mathbb{R}$ is interrupted at $x=0$ before checking the sign on both sides.* Confirming $f'>0$ on both sides of 0 (never negative) is the demonstration for MC-1.
- **The one-point-suffices check.** For $f(x)=x^3-3x$, test $f'$ at one sample point in each of the three critical-point-bounded intervals, then verify the sign is genuinely constant throughout each interval by testing an additional point. *Predict whether the additional test will agree with the first, before checking.* Confirming agreement (as guaranteed by the IVT argument) is the demonstration for MC-2.
- **The MVT-based re-derivation.** For $f(x)=x^3-3x$ on $(-1,1)$ (where $f'<0$ throughout), directly verify $f(0.5)<f(-0.5)$ and find the specific $c\in(-0.5,0.5)$ the MVT guarantees, confirming $f'(c)$ matches the negative secant slope. *Predict, before computing, whether this direct verification will match the sign-analysis conclusion.* Confirming agreement is the demonstration for MC-3 — the test's conclusion and the MVT's own guarantee are the same fact viewed two ways.

## Discovery Questions
Direct instruction is the argued call for the MVT-based proof itself (a specific logical derivation best walked through explicitly), but the critical-point-doesn't-always-turn distinction (MC-1) and the one-point-sufficiency guarantee (MC-2) are both genuinely discoverable by direct trial.
1. **Need** — "For $f(x)=x^3$, is $x=0$ a critical point? Now check the sign of $f'$ just before and just after $x=0$. Does it change?" It does not.
2. **Playground** — try the same check on a couple more functions where a critical point genuinely IS a turning point, to contrast.
3. **Invention** — "Why does one critical point interrupt monotonicity while another doesn't?" Let the learner connect it to whether the derivative's SIGN actually changes, not merely whether it touches zero.
4. **Collision** — confront a learner who claimed $x^3$'s critical point breaks monotonicity with the direct sign check on both sides.
5. **Formalisation** — state the precise criterion: monotonicity breaks at a critical point ONLY if the sign of $f'$ genuinely differs on the two sides.
6. **Compression** — "A critical point is a place to CHECK — not a guaranteed turning point."

## Teaching Sequence
The MVT-based proof (per the Blueprint's own A01) must be established FIRST, since the sign-analysis procedure's efficiency claim (MC-2) and the critical-point-doesn't-always-turn distinction (MC-1) both rest on trusting that the test's conclusion is a genuine logical guarantee, not an empirical pattern — a learner who sees the test as unjustified has no framework for why exceptions like $x^3$ are logically consistent rather than mysterious counterexamples. The sign-analysis procedure and its own IVT-based justification (per the Blueprint's own A02) follow directly, addressing MC-2 by making the one-point-sufficiency guarantee explicit rather than merely asserted. The critical-point-doesn't-always-turn distinction (MC-1) is folded into the sign-analysis work itself (Example 3), since it is precisely the case where the general procedure must be applied carefully rather than assumed to always produce alternating behavior. Turn-level scripts for A01–A03 are owned by the Blueprint's Component 5 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the MVT-based proof derivation (per Blueprint A01), explicitly connecting the secant-slope/tangent-slope relationship established in `math.calc.mean-value-theorem` to this test's conclusion. First action; anchors the WHY before the HOW.
- **DO: Demonstration** — the full sign-analysis procedure on $f(x)=x^3-3x$ (Example 1), partitioning by critical points and testing one sample point per interval.
- **TEST-THINKING: Prediction** — "Does $x=0$ being a critical point of $f(x)=x^3$ mean the function stops increasing there?" asked BEFORE checking the sign on both sides. Surfaces MC-1 in one turn.
- **TEST-THINKING: Error Analysis** — "A student tested three points within the SAME critical-point-bounded interval, worried the sign might change partway through. Was this necessary?" targets MC-2 directly.
- **Does NOT fit: the first/second derivative tests for classifying local extrema, or concavity analysis, here.** This concept covers monotonicity (increasing/decreasing) only; classifying critical points as local maxima/minima belongs to `math.calc.critical-points`, which this concept unlocks.

## Voice Teaching Notes
The load-bearing sentence is "a critical point is a place to CHECK the sign of $f'$ on both sides — not a guaranteed turning point." Say it every time a new sign-analysis problem is set up, not just the first. Listen for a learner who, upon finding a critical point, immediately assumes the function switches from increasing to decreasing (or vice versa) there without checking — that specific assumption is the tell for MC-1. Listen for a learner who tests several points within one critical-point-bounded interval "just to be sure" — that redundant checking is the tell for MC-2. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Assumes a critical point necessarily interrupts monotonicity without checking whether the sign of $f'$ actually changes** — MC-1. Route to the non-turning critical point demonstration, on the exact function in question.
- **Tests multiple points within a single critical-point-bounded interval, uncertain whether one suffices** — MC-2. Route to the one-point-suffices check, on the exact function in question.
- **Cannot explain why the increasing/decreasing test holds, beyond restating the rule** — MC-3. Route to the MVT-based re-derivation, on the exact function in question.
- **Correctly partitions by critical points, tests one sample point per interval with justified confidence, and checks whether the sign genuinely changes at each critical point before concluding a turning point** — the intended target state.
- **Mastery trigger**: the Blueprint's A03 gate, MAMR 4/5 (⌈0.8×5⌉=4). The 4-item P77 set plus the P76 transfer probe (the inventory-level colleague-claim problem) must include at least one item requiring the learner to explain WHY a critical point does not automatically interrupt monotonicity, not merely execute sign analysis mechanically — a gate made only of correct-computation items risks certifying mechanics without certifying the conceptual discrimination against MC-1.

## Tutor Recovery Strategy
The likely utterance here is "there's a critical point right in the middle of my interval — doesn't that mean the function has to switch from increasing to decreasing there?" — a reasonable question given how often that pattern holds in typical examples. The concept-specific smaller question returns to a direct sign check: **"What is the sign of $f'$ just to the LEFT of that critical point? What about just to the RIGHT?"** The learner computes both and may find they are the SAME sign. Then return: "since the sign didn't actually change, the function's monotonicity wasn't interrupted there — a critical point is a place to CHECK, not a guarantee." If the frustration is instead about trusting the one-point-per-interval shortcut, shrink to the bare check: **"If the sign changed somewhere strictly between your two critical points, what would that changing point itself have to be?"** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure with an embedded proof-based justification requirement** (the increasing/decreasing test's derivation from the MVT, and the IVT-based guarantee behind the one-point-per-interval shortcut, are both conceptual understanding points, not merely computational steps, and must be re-derivable, not just applied). Review by *requiring the learner to state, for a fresh critical point, whether checking one side's sign is sufficient to conclude anything about the other side, and why*, never accepting a correctly executed sign-analysis alone as evidence of understanding, since a learner can mechanically apply the procedure without grasping why it is valid.
- Concept-specific deviation: keep at least one review item featuring a critical point that does NOT interrupt monotonicity (like $x^3$ at 0), so the discrimination against MC-1 stays exercised rather than atrophying on a steady diet of genuinely turning critical points.
- Interleaving partners: `math.calc.mean-value-theorem` (the discriminating partner — reviewing the MVT's own statement alongside this concept keeps the "this test IS the MVT applied" connection alive) and `math.calc.critical-points`, which this concept directly unlocks by supplying the sign-analysis machinery that concept's own classification procedure builds on.

## Transfer Connections
- **Near**: `math.calc.critical-points` (the direct extension this concept unlocks — already authored, and independently classifies critical points as local maxima, minima, or neither, building on this concept's own sign-analysis procedure).
- **Far**: the Intermediate Value Theorem's own logical structure — the "a continuous function can't skip values" reasoning used here to justify the one-point-per-interval shortcut recurs throughout calculus wherever a continuous quantity's sign or value is tracked across an interval.
- **Real-world**: the Blueprint's own transfer probe — an inventory-level model $I(t)=t^3-12t^2+36t$ — is a direct application where sign analysis determines genuine business-relevant increasing/decreasing periods.
- **Expert transfer**: recognizing that a local property (a derivative's sign at one tested point) can license a GLOBAL conclusion (monotonicity across an entire interval) once a continuity-based argument rules out any undetected sign change — a reasoning pattern that recurs across many calculus and analysis results.

## Cross-Subject Connections
- **Economics/business**, real: the Blueprint's own transfer probe (an inventory-level model over time) is a direct, literal application where identifying increasing versus decreasing periods has genuine business significance.
- **Physics**, real: determining when a position, velocity, or other physical quantity is increasing or decreasing over time is a routine application of this exact sign-analysis technique.
- **Computer science**, real: analyzing whether an algorithm's performance metric (as a function of some parameter) is monotonic over a range uses this identical reasoning.
- No genuine KG cross_link exists for this concept.

## Blueprint References
`docs/curriculum/blueprints/math.calc.increasing-decreasing.md`. Reused by reference, not restated: the Component 1 Learning Objectives, the Component 4 Worked Examples (Example 1 the full sign-analysis procedure, Example 2 the MVT-based proof verified concretely, Example 3 the non-turning critical point breaking MC-1), the Component 5 Teaching Actions (A01 P11 representation shift, A02 P06 contrast pair with two sub-contrasts, A03 P91 mastery gate at MAMR 4/5), the Component 6 Misconception Registry (MC-1, MC-2, MC-3) and repair actions (B01, B02, B03), the four-item P77 problem set, and the P76 independence-mode transfer probe (the inventory-level colleague-claim problem). This entry adds independent birth-type classification for all three misconceptions (the Blueprint marks severities but assigns no birth type), the mental-model ladder, the anti-analogy, and the argued direct-instruction-for-the-MVT-proof / guided-discovery-for-the-non-turning-critical-point-and-one-point-sufficiency split.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
No Blueprint/KG metadata discrepancy was found for this concept — the Blueprint's stated requires (`math.calc.mean-value-theorem`), unlocks (`math.calc.critical-points`), cross_links (none), difficulty (advanced), bloom (apply), mastery_threshold (0.8), and estimated_hours (4) all match the live KG's own fields exactly, confirmed by direct query. A genuine forward relationship worth recording: `math.calc.critical-points` (this concept's own unlock) was ALREADY authored in Batch 40 of this campaign, before `increasing-decreasing` itself — confirmed via directory listing that it exists but does not currently reference this concept back. This is the first of four zero-discrepancy concepts in this batch, continuing the streak restarted in Batch 43 after Batch 42's `arc-length` broke the prior five-consecutive-zero run.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 46).
