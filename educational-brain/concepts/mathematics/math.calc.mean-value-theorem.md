# math.calc.mean-value-theorem

## Identity
- **KG ID**: `math.calc.mean-value-theorem`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.derivative-definition` — load-bearing part: the theorem's conclusion, $f'(c)=\frac{f(b)-f(a)}{b-a}$, is a statement about the instantaneous rate of change (the derivative) matching an average rate.
  - `math.calc.continuity` — load-bearing part: the theorem's hypothesis requires continuity on the closed interval $[a,b]$, and the vocabulary of continuity-on-an-interval (including at endpoints) is assumed fluent.
- **Unlocks**: `math.calc.increasing-decreasing`, `math.real.mvt`.
- **Cross-links**: `math.real.mvt` (confirmed not yet authored — see Curriculum Feedback).
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Mastery threshold**: 0.8 (MAMR = ⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 6
- **Blueprint**: `docs/curriculum/blueprints/math.calc.mean-value-theorem.md` (reused by reference throughout)

## Learning Objective
- The learner can state the Mean Value Theorem (MVT) precisely, including BOTH hypotheses (continuity on the closed interval $[a,b]$, differentiability on the open interval $(a,b)$) and the conclusion (existence of some $c\in(a,b)$ with $f'(c)=\frac{f(b)-f(a)}{b-a}$).
- The learner can interpret the theorem geometrically (the tangent at $c$ is parallel to the secant through the endpoints) and physically (some instant's instantaneous rate equals the interval's average rate), and can apply it to find the guaranteed value(s) of $c$.
- The learner can recognize that the MVT is an EXISTENCE theorem, not a uniqueness or construction theorem, and can correctly identify when the theorem's hypotheses fail so its conclusion cannot be assumed.

## Core Understanding
The Mean Value Theorem connects two different notions of "rate of change" over an interval: the AVERAGE rate, $\frac{f(b)-f(a)}{b-a}$ (the slope of the SECANT line through the endpoints), and the INSTANTANEOUS rate at a single point, $f'(c)$ (the slope of the TANGENT line there). The theorem's claim is that, provided $f$ is continuous on the closed interval $[a,b]$ and differentiable on the open interval $(a,b)$, these two rates must agree SOMEWHERE — there exists at least one $c\in(a,b)$ where the tangent is exactly parallel to the secant. Both hypotheses matter on their STATED domains, and the asymmetry is deliberate: continuity is required on the CLOSED interval (including both endpoints), while differentiability is required only on the OPEN interval (endpoints excluded, since a one-sided derivative at an endpoint is a stricter, different notion the theorem does not need). If either hypothesis fails anywhere in the interval, the theorem's guarantee simply does not apply — there might still happen to be a qualifying $c$, or there might not; the theorem gives no information either way in that case. Finally, the theorem is an EXISTENCE claim only: it promises AT LEAST ONE such $c$, never says how many there are (there can be exactly one, or several), and never says how to find $c$ without directly solving $f'(c)=\frac{f(b)-f(a)}{b-a}$.

## Mental Models
1. **Beginner — "the Mean Value Theorem tells you exactly where the function's rate of change equals its average rate."** The theorem is treated as pinpointing a specific, unique location, with no attention to hypotheses or to the possibility of multiple valid points. *Upgrade trigger*: applying the theorem's conclusion formula to a function that isn't even continuous or differentiable everywhere in the interval, and getting a nonsensical or unjustified result.
2. **Intermediate — "before using the theorem, check that f is continuous on the closed interval and differentiable on the open interval; then solve for c."** The hypothesis-checking discipline is now present as a required first step. *Upgrade trigger*: solving the equation $f'(c)=\frac{f(b)-f(a)}{b-a}$ and finding TWO valid solutions in $(a,b)$, and needing to decide whether this indicates an error.
3. **Advanced — "the theorem guarantees AT LEAST ONE qualifying point, not exactly one — multiple valid solutions are not an error, they're simply more than the minimum the theorem promised."** The existence-not-uniqueness distinction is now explicit. *Upgrade trigger*: encountering a subtle case where the function fails to be differentiable exactly at an endpoint, and needing to recognize that the theorem's differentiability requirement never applied there in the first place.
4. **Expert — the MVT is itself a special case of a more general family of mean-value-type theorems (including Cauchy's Mean Value Theorem and, as its own special case, Rolle's Theorem where $f(a)=f(b)$), and its rigorous proof belongs to real analysis.** The learner recognizes the MVT as one instance within a broader theoretical structure rather than an isolated, standalone fact. *Shelf life*: permanent.

## Why Students Fail
The dominant failure skips the hypothesis-verification step entirely: because the theorem's conclusion formula, $f'(c)=\frac{f(b)-f(a)}{b-a}$, can be written down and algebraically solved for ANY differentiable-looking function without first checking where it might fail to be continuous or differentiable, a learner applies the formula directly to functions like $f(x)=|x|$ on an interval containing the corner, or $f(x)=1/x$ on an interval containing the discontinuity, without noticing the hypothesis violation (MC-1, HYPOTHESES-NOT-CHECKED) — a Type 1 overgeneralization of "if you can write down $f'$, the theorem applies," extended past the point where continuity or differentiability genuinely fails somewhere in the interval. A second, distinct failure reads the theorem's existential wording ("there exists $c$") as promising exactly one answer, so when solving the conclusion equation yields two or more valid values of $c$ in the open interval, the learner assumes an error was made rather than recognizing multiple valid instances of the same guarantee (MC-2, UNIQUENESS-ASSUMED) — a Type 3 language-contamination gap, since ordinary conversational use of "there is a" or "there exists" often implicitly suggests singularity, when the mathematical existential quantifier makes no such claim. A third, minor failure over-extends the differentiability requirement to the closed interval's endpoints themselves, disqualifying valid applications where a function is perfectly differentiable throughout the open interval but only one-sided-differentiable (or non-smooth) exactly at an endpoint (MC-3, ENDPOINT-DIFFERENTIABILITY-REQUIRED) — a Type 4 notation-induced gap, since the asymmetric closed/open wording of the two hypotheses is easy to blur into a single, stricter requirement.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1, MC-2, MC-3) and its own repair actions B01–B03. **The Blueprint's Misconception Registry carries a Severity column (Foundational, Moderate, Minor) but no explicit birth-type column**; all three classifications below are independently assigned here.

- **MC-1 — HYPOTHESES-NOT-CHECKED** (the Blueprint's own "Foundational" misconception)
  - **Birth type**: Type 1, overgeneralization. The habit of writing down a derivative and solving an equation is extended past the point where the theorem's own hypotheses (continuity on $[a,b]$, differentiability on $(a,b)$) genuinely fail somewhere in the interval, without pausing to verify them first.
  - **Characteristic phrase**: proceeding directly to solve $f'(c)=\frac{f(b)-f(a)}{b-a}$ for $f(x)=|x|$ on $[-1,1]$ without first noticing the corner (non-differentiability) at $x=0\in(-1,1)$.
  - **Detection probe** (Blueprint's A01 hook): ask students to apply the MVT to $f(x)=|x|$ on $[-1,1]$ without prompting them to check hypotheses first — an attempt to blindly solve for $c$ reveals MC-1.
  - **Repair**: Blueprint Repair Action B01 — re-anchor on "the theorem is an if-then statement — the 'then' is only guaranteed once the 'if' is fully verified."
  - **Verification of death**: given a fresh function and interval, the learner explicitly checks continuity on the closed interval and differentiability on the open interval BEFORE attempting to solve for $c$, and correctly declines to apply the theorem when either hypothesis fails.

- **MC-2 — UNIQUENESS-ASSUMED** (the Blueprint's own "Moderate" severity misconception)
  - **Birth type**: Type 3, language contamination. Everyday usage of "there exists" or "there is a" often implicitly suggests a single, specific instance, so the mathematical existential quantifier's genuine "at least one" meaning is misread as "exactly one."
  - **Characteristic phrase**: treating two valid solutions to $f'(c)=\frac{f(b)-f(a)}{b-a}$ as evidence of a computational mistake, rather than as two legitimate instances of the theorem's guarantee.
  - **Detection probe** (Blueprint's A02 hook): "did the theorem promise exactly one $c$, or 'at least one'?"
  - **Repair**: Blueprint Repair Action B02 — re-derive from the theorem's own wording: "there exists $c$" is an existence claim, silent on count.
  - **Verification of death**: given a fresh function where the conclusion equation has multiple solutions in the open interval, the learner accepts all valid solutions without flagging the multiplicity as an error.

- **MC-3 — ENDPOINT-DIFFERENTIABILITY-REQUIRED** (the Blueprint's own "Minor" severity misconception)
  - **Birth type**: Type 4, notation-induced. The asymmetric wording — continuity on the CLOSED interval, differentiability on the OPEN interval — is a subtle distinction easy to collapse into a single, uniform (and stricter) requirement applied to both conditions.
  - **Characteristic phrase**: declining to apply the MVT to a function that is differentiable everywhere on $(a,b)$ but only one-sided-differentiable exactly at an endpoint, on the grounds that "it's not differentiable everywhere on $[a,b]$."
  - **Detection probe** (Blueprint's A03 hook): present a function differentiable everywhere on the open interval but only one-sided-differentiable exactly at an endpoint, and ask if the MVT applies — an incorrect "no" reveals MC-3.
  - **Repair**: Blueprint Repair Action B03 — re-anchor on the precise hypothesis wording, continuity on the closed interval but differentiability only on the open interval, deliberately excluding the endpoints.
  - **Verification of death**: given such a function, the learner correctly applies the MVT despite the endpoint irregularity, citing the open-interval differentiability requirement explicitly.

## Analogies
- **Best — a road trip's average speed versus the speedometer at one instant.** If a car travels a fixed distance in a fixed time (giving a definite average speed), then at SOME instant during the trip, the speedometer must have read exactly that average speed — this is the theorem's physical content, made concrete.
- **Alternative — a hill between two points at the same height on a graph's secant.** Picture a smooth curve connecting two points; somewhere along the curve, the tangent line must be parallel to the straight line (secant) connecting those two points, exactly like the highest or lowest point of a "bump" between them.
- **ANTI-ANALOGY — "the Mean Value Theorem finds the point where the derivative equals the average rate."** This phrasing licenses MC-2 directly, implying a single, findable point, when the theorem only guarantees existence, silent on uniqueness or method of discovery. Say "the theorem guarantees AT LEAST ONE such point exists — it doesn't promise there's only one, or tell you how to find it without solving directly" instead.

## Demonstrations
- **The hypothesis-failure contrast.** Place $f(x)=x^2$ on $[1,4]$ (both hypotheses hold, conclusion applies cleanly, Example 1) beside $f(x)=\frac1x$ on $[-1,1]$ (continuity fails at $x=0$, Example 2). *Predict, before solving, whether the second function's "average rate equation" will have a valid solution in the interval.* Finding NO solution at all (since $f'(x)=-1/x^2$ is always negative, never equal to the computed average rate of 1) is the demonstration for MC-1 — the hypothesis failure genuinely matters.
- **The multiple-solutions case.** For $f(x)=x^3-3x$ on $[-2,2]$ (Example 3), solve the conclusion equation and find TWO valid values of $c$. *Predict, before solving, whether the theorem's own wording allows for more than one answer.* Confirming both solutions are legitimate is the demonstration for MC-2.
- **The endpoint-irregularity check.** Present a function differentiable everywhere on an open interval but only one-sided-differentiable at one endpoint, and ask whether the MVT applies. *Predict the answer before checking the precise hypothesis wording.* Confirming the theorem STILL applies (since differentiability is only required on the open interval) is the demonstration for MC-3.

## Discovery Questions
Direct instruction is the argued call for the theorem's own precise statement (a specific existence claim best presented explicitly, per the Blueprint's own pictorial-first approach), but the hypothesis-checking discipline (MC-1) and the existence-vs-uniqueness distinction (MC-2) are both genuinely discoverable by direct comparison.
1. **Need** — "Try to find $c$ for $f(x)=1/x$ on $[-1,1]$ using the theorem's formula. Does a solution exist in the interval?" It does not.
2. **Playground** — try the same formula-solving approach on a couple more functions, some continuous/differentiable throughout, some not.
3. **Invention** — "Why did the $1/x$ case fail to produce a valid $c$, while $x^2$ succeeded?" Let the learner connect it to the discontinuity at $x=0$.
4. **Collision** — confront a learner who found two solutions to the conclusion equation for $x^3-3x$ with the direct question "does the theorem's wording rule this out?"
5. **Formalisation** — state the theorem's precise wording: "there EXISTS at least one $c$" — an existence claim, silent on count.
6. **Compression** — "Check both hypotheses first. Then: at least one c, not exactly one."

## Teaching Sequence
The hypothesis-checking discipline (MC-1) must be established FIRST, per the Blueprint's own pictorial-then-formal approach (A01), since a learner who applies the conclusion formula without verifying the hypotheses has no reliable basis for interpreting ANY result the formula produces — including whether multiple solutions (MC-2) are legitimate, since an unverified hypothesis could itself be the reason for an unexpected result. The existence-vs-uniqueness distinction follows directly, per the Blueprint's own A02 second contrast, once hypothesis-checking is fluent and the learner can trust that a found solution is genuinely valid. The endpoint-differentiability subtlety (MC-3) is folded in as a smaller, precision-level refinement of the hypothesis-checking discipline already established, since it is a narrower misreading of the SAME two hypotheses rather than a separate conceptual stage. Turn-level scripts for A01–A03 are owned by the Blueprint's Component 5 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the pictorial secant/tangent-parallelism demonstration (Blueprint A01), tracing a finger along a curve to visually find a point where the tangent looks parallel to the secant, BEFORE the formal statement is introduced. First action; anchors the geometric meaning concretely.
- **TEST-THINKING: Error Analysis** — "A student applied the MVT's conclusion formula to $f(x)=|x|$ on $[-1,1]$ without checking anything first. What might go wrong?" targets MC-1 directly.
- **DO: Demonstration** — the hypothesis-failure contrast (Example 1 beside Example 2), showing that a continuity violation genuinely produces no valid solution, not merely an inconvenient one.
- **TEST-THINKING: Prediction** — "Does the Mean Value Theorem promise exactly one point, or at least one?" asked BEFORE working Example 3's two-solution case. Surfaces MC-2 in one turn.
- **Does NOT fit: Rolle's Theorem as an independent topic, Cauchy's Mean Value Theorem, or a rigorous real-analysis proof of the MVT itself, here.** Those extensions belong to `math.real.mvt`, which this concept unlocks but does not itself develop.

## Voice Teaching Notes
The load-bearing sentence is "check both hypotheses first — continuity on the closed interval, differentiability on the open interval — then the theorem guarantees at least one c, never exactly one." Say it every time a new MVT problem is set up, not just the first. Listen for a learner who jumps straight to solving $f'(c)=\frac{f(b)-f(a)}{b-a}$ without first stating anything about continuity or differentiability — that specific jump is the tell for MC-1. Listen for a learner who, upon finding two valid solutions, asks "which one is the right answer?" — that framing is the tell for MC-2. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Solves the conclusion equation without first checking continuity on the closed interval and differentiability on the open interval** — MC-1. Route to the hypothesis-failure contrast, on the exact function and interval in question.
- **Treats multiple valid solutions to the conclusion equation as an error, or asks which one is "correct"** — MC-2. Route to the multiple-solutions case, on the exact function in question.
- **Declines to apply the theorem solely because of an irregularity exactly at an endpoint, despite differentiability holding throughout the open interval** — MC-3. Route to the endpoint-irregularity check.
- **Correctly checks both hypotheses on their stated domains, accepts all valid solutions as legitimate, and never over-extends the differentiability requirement to the endpoints** — the intended target state.
- **Mastery trigger**: the Blueprint's A03 gate, MAMR 4/5 (⌈0.8×5⌉=4). The 4-item P77 set plus the P76 transfer probe (the 90km/h speedometer argument) must include at least one item requiring the learner to explain WHY the argument would break down without continuity (rather than merely computing a value of $c$) — a gate made only of correct-computation items risks certifying mechanics without certifying the conceptual discrimination against MC-1.

## Tutor Recovery Strategy
The likely utterance here is "I found two different values of c — did I do something wrong?" — a reasonable question given how often "solve for X" problems expect a single answer. The concept-specific smaller question returns to the theorem's own wording: **"Does the theorem say 'there is EXACTLY ONE c,' or does it say 'there EXISTS a c'?"** The learner recalls (or re-reads) the precise statement and recognizes it as an existence claim only. Then return: "so finding two valid solutions isn't an error — it's just more than the minimum the theorem promised. Both are correct." If the frustration is instead about a hypothesis being skipped, shrink to the bare check: **"Before you solve anything — is this function continuous everywhere on the closed interval? Is it differentiable everywhere on the open interval?"** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **theorem statement with an embedded existence-vs-uniqueness discrimination requirement** (the "at least one, not exactly one" distinction is a conceptual precision point, not a computational step, and must be actively stated, not merely implied by a correct numeric answer). Review by *requiring the learner to state, in their own words, that the theorem guarantees existence but not uniqueness or a construction method, before solving any specific problem*, never accepting a single correctly-computed value of $c$ alone as evidence of understanding, since a problem with a unique solution gives no opportunity to reveal MC-2.
- Concept-specific deviation: keep at least one review item where the conclusion equation has MORE than one valid solution in the open interval, so the existence-vs-uniqueness discrimination stays exercised rather than atrophying on a steady diet of single-solution problems.
- Interleaving partners: `math.calc.continuity` (the discriminating partner — reviewing precisely what continuity on a closed interval requires, including at endpoints, keeps the hypothesis-checking discipline against MC-1 and MC-3 sharp) and `math.calc.increasing-decreasing`, which this concept directly unlocks by using the sign of $f'(c)$ from the MVT to justify monotonicity tests.

## Transfer Connections
- **Near**: `math.calc.increasing-decreasing` (the direct application this concept unlocks — the sign of $f'(c)$ from the MVT justifies the increasing/decreasing test on an interval).
- **Far**: `math.real.mvt`, which this concept also unlocks — the rigorous real-analysis proof and generalizations of the theorem, including Rolle's Theorem as a special case ($f(a)=f(b)$) and Cauchy's Mean Value Theorem as a two-function generalization.
- **Real-world**: the Blueprint's own transfer probe — the 90km/h speedometer argument for a 180km trip in 2 hours — is a direct, intuitive physical application of the theorem's content.
- **Expert transfer**: recognizing that an "if-then" theorem's conclusion is only licensed once its hypotheses are fully verified, and that an existential claim never implies uniqueness unless separately proven — both general mathematical-reasoning disciplines that recur across many theorems, not specific to the MVT.

## Cross-Subject Connections
- **Physics**, real: the Blueprint's own transfer probe (average speed versus instantaneous speedometer reading during a car trip) is a direct, standard physical interpretation of the theorem, used routinely in kinematics.
- **Economics**, real: average cost or average rate of change over a production interval matching the instantaneous marginal rate at some point is a direct MVT-style argument used in marginal analysis.
- **Engineering**, real: verifying that a system's average response rate over an interval is achieved at some instant (e.g. in signal or control system analysis) is a direct application of this exact theorem.
- The KG records a genuine cross_link (`math.real.mvt`), currently in independence mode since that concept is not yet authored — see Curriculum Feedback.

## Blueprint References
`docs/curriculum/blueprints/math.calc.mean-value-theorem.md`. Reused by reference, not restated: the Component 1 Learning Objectives, the Component 4 Worked Examples (Example 1 the clean-application case, Example 2 the continuity-hypothesis-failure case breaking MC-1, Example 3 the multiple-solutions case breaking MC-2), the Component 5 Teaching Actions (A01 P11 representation shift, A02 P06 contrast pair with two sub-contrasts, A03 P91 mastery gate at MAMR 4/5), the Component 6 Misconception Registry (MC-1, MC-2, MC-3) and repair actions (B01, B02, B03), the four-item P77 problem set, and the P76 independence-mode transfer probe (the 90km/h speedometer argument). This entry adds independent birth-type classification for all three misconceptions (the Blueprint marks severities but assigns no birth type), the mental-model ladder, the anti-analogy, and the argued direct-instruction-for-the-theorem-statement / guided-discovery-for-the-hypothesis-checking-and-uniqueness split.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
No Blueprint/KG metadata discrepancy was found for this concept — the Blueprint's stated requires (`math.calc.derivative-definition`, `math.calc.continuity`), unlocks (`math.calc.increasing-decreasing`, `math.real.mvt`), cross_links (`math.real.mvt`), difficulty (advanced), bloom (analyze), mastery_threshold (0.8), and estimated_hours (6) all match the live KG's own fields exactly, confirmed by direct query. The Blueprint's own Component 7 already verified, via directory listing, that `math.real.mvt` has no authored Blueprint yet, and this entry independently confirms it has no authored Educational Brain entry either — so the cross-link is correctly treated in independence mode, matching the Blueprint's own P76_mode declaration. This is the third of four zero-discrepancy concepts in this batch, continuing the streak restarted in Batch 43 after Batch 42's `arc-length` broke the prior five-consecutive-zero run.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 45).
