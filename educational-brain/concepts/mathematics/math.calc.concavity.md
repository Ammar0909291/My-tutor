# math.calc.concavity

## Identity
- **KG ID**: `math.calc.concavity`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.higher-order-derivatives` — load-bearing part: concavity is the direct geometric interpretation of the SIGN of $f''$, computed via the exact iterated-differentiation discipline established there.
- **Unlocks**: `math.calc.curve-sketching` (a complete sketch combines monotonicity, extrema, and concavity/inflection information).
- **Cross-links**: none in the KG.
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.80
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.calc.concavity.md` (reused by reference throughout)

## Learning Objective
- The learner can determine concavity from the sign of $f''$: $f''(x)>0$ means concave up (cup, tangent lines below the curve); $f''(x)<0$ means concave down (cap, tangent lines above the curve).
- The learner can find inflection points by locating where $f''(x)=0$ or is undefined, then VERIFYING an actual sign change of $f''$ on either side — never accepting $f''(c)=0$ alone as sufficient.
- The learner can distinguish concavity from monotonicity, recognizing all four combinations of direction (increasing/decreasing) and curvature (concave up/down) genuinely occur.

## Core Understanding
Concavity is what the SECOND derivative's sign says about how a curve bends: where $f''(x)>0$, the slope $f'$ is itself increasing, so the curve bends upward like a cup, and every tangent line drawn there lies BELOW the curve; where $f''(x)<0$, the slope is decreasing, the curve bends like a cap, and tangent lines lie ABOVE it. An inflection point is a location where concavity genuinely CHANGES — from up to down or down to up — and the candidates for inflection points are found exactly parallel to how critical points are found for extrema: where $f''(x)=0$ OR where $f''$ is undefined. But finding $f''(c)=0$ is never enough by itself — $f(x)=x^4$ has $f''(0)=0$, yet $f''(x)=12x^2\ge0$ for ALL $x$, so there is no sign change at $0$ and hence no inflection point there at all, despite the identical "$f''=0$" signal that DID produce a genuine inflection point for $f(x)=x^3-3x^2$ at $x=1$. Concavity is governed entirely independently of monotonicity: whether $f$ is increasing or decreasing depends on the sign of $f'$, while curvature depends on the sign of $f''$ — these are two SEPARATE questions, and all four combinations (increasing/concave-up, increasing/concave-down, decreasing/concave-up, decreasing/concave-down) genuinely occur, so "concave up" never implies "increasing," despite the visual temptation of a rising-looking cup shape.

## Mental Models
1. **Beginner — check the sign of $f''$: positive is a cup, negative is a cap.** A direct sign-analysis procedure, mechanically parallel to the already-known first-derivative sign analysis. *Upgrade trigger*: a function where $f''(c)=0$ at a point that turns out NOT to be a genuine inflection point. *Shelf life*: about one lesson.
2. **Intermediate — an inflection point requires a genuine SIGN CHANGE in $f''$, not just a zero.** $f''(c)=0$ is only a candidate. *Upgrade trigger*: assuming a concave-up interval must also be an increasing one, since a cup visually "looks like it's going up."
3. **Advanced — concavity and monotonicity are two independent axes.** $f'$ governs direction; $f''$ governs curvature; all four combinations occur. *Upgrade trigger*: needing to search for inflection points on a function where $f''$ is undefined at some point rather than zero (e.g. $x^{1/3}$ at $0$) — this model doesn't yet flag that second search.
4. **Expert — concavity, monotonicity, and extrema together fully characterize a function's shape.** Curve-sketching combines all three: sign of $f'$ (direction), sign of $f''$ (curvature), and critical/inflection points (where either can change) — the complete qualitative picture of a graph, derivable entirely from calculus without plotting points. *Shelf life*: permanent.

## Why Students Fail
The dominant failure directly parallels the campaign's own repeatedly-documented "candidate assumed sufficient" pattern: $f''(c)=0$ is only a NECESSARY signal for a possible inflection point, and a learner overgeneralizes it into a SUFFICIENT one, missing that $f''$ must actually CHANGE SIGN across $c$ — the Blueprint's own Teaching Notes explicitly name this as the same structural echo as `math.calc.critical-points`' own "candidate, not guarantee" logic (MC-1, SECOND-DERIVATIVE-ZERO-ASSUMED-INFLECTION). A second failure is perceptual: the visual shape of a "cup" (concave up) intuitively suggests something rising, and a learner conflates that visual impression with the function actually INCREASING, missing that concavity and direction are governed by entirely separate derivatives ($f''$ versus $f'$) and can combine in all four ways (MC-2, CONCAVITY-CONFLATED-WITH-MONOTONICITY). A third failure mirrors `critical-points`' own MC-2 exactly: the overwhelming majority of practice drills only "set $f''(x)=0$ and solve," so the second, less-drilled search (checking where $f''$ is UNDEFINED but still changes sign) is simply never run, silently missing genuine inflection points like $x=0$ for $f(x)=x^{1/3}$ (MC-3, INFLECTION-POINT-SEARCH-IGNORES-UNDEFINED-F-DOUBLE-PRIME).

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1..MC-3) and its Protocol B repair actions B01–B03. **The Blueprint's Misconception Registry carries a Severity column (Foundational/Foundational/Moderate) but no explicit birth-type column**; all three classifications below are independently assigned here.

- **MC-1 — SECOND-DERIVATIVE-ZERO-ASSUMED-INFLECTION** (the Blueprint's own "Foundational" misconception)
  - **Birth type**: Type 1, overgeneralization of a necessary condition into a sufficient one — the Blueprint's own Teaching Notes explicitly name this as the same "candidate vs. confirmed" structural pattern already established for `math.calc.critical-points`' own MC-1 (CRITICAL-POINT-ASSUMED-EXTREMUM).
  - **Characteristic phrase**: "$g''(0)=0$ for $g(x)=x^4$, so $x=0$ must be an inflection point."
  - **Detection probe** (verbatim, Blueprint's A02 MC-1 hook): "if $f''(c)=0$, is $c$ automatically an inflection point?"
  - **Repair**: Blueprint Repair Action B01 — re-walk the paired contrast: $f(x)=x^3-3x^2$'s genuine sign change at $x=1$ versus $g(x)=x^4$'s absent sign change at $0$ (both start from the identical "$f''=0$" signal, with genuinely different outcomes).
  - **Verification of death**: given a fresh point where $f''(c)=0$, the learner checks for an actual sign change on either side before declaring it an inflection point, without being prompted.

- **MC-2 — CONCAVITY-CONFLATED-WITH-MONOTONICITY**
  - **Birth type**: Type 2, perceptual intuition. A cup shape visually resembles something "going up," and that visual impression is mistaken for the function's actual DIRECTION, which a completely separate derivative ($f'$, not $f''$) governs.
  - **Characteristic phrase**: "concave up means increasing" (or its mirror, "concave down means decreasing").
  - **Detection probe** (verbatim, Blueprint's A03 MC-2 hook): "does concave up always mean the function is increasing?"
  - **Repair**: Blueprint Repair Action B02 — present $k(x)=x^2$ on $x<0$: decreasing ($k'(x)=2x<0$) yet concave up ($k''(x)=2>0$) — direct proof the two properties are independent.
  - **Verification of death**: given a fresh function, the learner independently determines its direction (from $f'$) and its curvature (from $f''$) as two separate checks, without assuming one from the other.

- **MC-3 — INFLECTION-POINT-SEARCH-IGNORES-UNDEFINED-F-DOUBLE-PRIME**
  - **Birth type**: Type 5, instruction-induced — the identical mechanism already documented for `math.calc.critical-points`' own MC-2 (UNDEFINED-DERIVATIVE-CATEGORY-MISSED): the overwhelming majority of practice drills only "set $f''(x)=0$," so the parallel undefined-$f''$ search never becomes habitual.
  - **Characteristic phrase**: given $f(x)=x^{1/3}$ (whose $f''$ is undefined at $0$ but changes sign there), answering "no inflection points" after only solving $f''(x)=0$.
  - **Detection probe** (verbatim, Blueprint's B03 P41): given $f(x)=x^{1/3}$, asking for all inflection points.
  - **Repair**: Blueprint Repair Action B03 — re-anchor on "candidates for inflection points come from BOTH $f''=0$ AND $f''$ undefined — parallel exactly to how critical points come from both $f'=0$ and $f'$ undefined."
  - **Verification of death**: given a fresh function with an undefined second derivative at some point, the learner checks that point for a sign change without being told to look there.

## Analogies
- **Best — a car's speedometer versus its steering wheel.** The speedometer (first derivative) tells you if you're speeding up or slowing down (direction); the steering wheel's turn (second derivative) tells you if you're curving left or right (concavity) — two completely independent controls, directly countering MC-2.
- **Alternative — a list of suspects, again.** Just as critical points are suspects for extrema, $f''=0$-or-undefined points are suspects for inflection — being on the list requires further investigation (a sign-change check) before a verdict, directly counters MC-1.
- **ANTI-ANALOGY — "a cup shape means the graph is going up."** This licenses MC-2 directly: a cup can sit anywhere on a decreasing OR increasing stretch of a graph. Say "the cup tells you about BENDING, not about rising or falling" instead.

## Demonstrations
- **The paired inflection contrast.** Compute $f''$ for $f(x)=x^3-3x^2$ (genuine sign change at $x=1$) and $g(x)=x^4$ (no sign change at $0$), side by side. *Predict whether both are inflection points before checking sign changes.* The differing outcomes despite the identical "$f''=0$" signal is the demonstration for MC-1.
- **The decreasing-yet-concave-up example.** Compute $k'(x)=2x<0$ and $k''(x)=2>0$ for $k(x)=x^2$ on $x<0$. *Predict whether a decreasing function can ever be concave up, before computing.* The confirmed "yes" is the demonstration for MC-2.
- **The undefined-second-derivative search.** Attempt "set $f''(x)=0$" on $f(x)=x^{1/3}$ and find no solutions, then check the point $x=0$ directly for a concavity sign change. *Predict whether there are any inflection points before checking $x=0$ directly.* Finding the missed inflection point is the demonstration for MC-3.

## Discovery Questions
Guided discovery is used throughout — the necessity of checking for a sign change, and the independence of concavity from monotonicity, are both directly observable from concrete function behavior.
1. **Need** — "For $f(x)=x^3-3x^2$ and $g(x)=x^4$, both have $f''=0$ at some point. Are both points inflection points?" Checking the sign of $f''$ on both sides shows they differ.
2. **Playground** — try a few more functions with $f''(c)=0$ and check for sign changes each time.
3. **Invention** — "What's the actual test — is it about the zero, or something else?" Let the learner articulate "the sign has to flip."
4. **Collision** — confront a learner who assumed $g(x)=x^4$ has an inflection point at $0$ with the direct sign-check showing $g''\ge0$ throughout.
5. **Formalisation** — state the sign-change requirement and the two-source search (zero or undefined) explicitly.
6. **Compression** — "The zero (or undefined point) is the suspect. The sign change is the confession."

## Teaching Sequence
The basic sign-of-$f''$ mechanics (A01) must be solid before the genuine-inflection-vs-false-positive contrast (MC-1, A02) is introduced, since the contrast requires computing $f''$ fluently on two different functions. The concavity-vs-monotonicity independence (MC-2, A03) is best introduced immediately after, using the SAME kind of simple functions ($\pm x^2$) the Blueprint's own Teaching Notes single out for isolating curvature from direction with minimal algebraic distraction. The undefined-$f''$ search (MC-3) is introduced LAST, as a boundary extension of the already-established two-source-search discipline from `critical-points` — a learner who already has that habit for critical points transfers it naturally here, rather than learning it as an unrelated new rule. Turn-level scripts for A01–A04 are owned by the Blueprint's Component 5 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the paired inflection contrast on $x^3-3x^2$ versus $x^4$, with the learner checking sign changes themselves. First action; anchors "candidate, not guarantee" concretely.
- **TEST-THINKING: Prediction** — "Is $k(x)=x^2$ on $x<0$ increasing or decreasing? Is it concave up or down?" asked as two SEPARATE questions before computing $k'$ and $k''$. Surfaces MC-2 in one turn.
- **DO: Demonstration** — the undefined-second-derivative search on $f(x)=x^{1/3}$, run with the learner attempting "set $f''=0$" first and finding it insufficient.
- **TEST-THINKING: Error Analysis** — "A student claims: since $h''(2)=0$, the graph of $h$ must have an inflection point at $x=2$. What additional check is needed?" targets MC-1 directly.
- **Does NOT fit: introducing curve-sketching's full combined procedure before concavity's own three misconceptions are solid.** `math.calc.curve-sketching` owns that synthesis explicitly; introducing it here would dilute this concept's own narrow, three-misconception scope.

## Voice Teaching Notes
The load-bearing sentence is "the zero is a candidate — check for an actual sign change before calling it an inflection point." Say it every time an inflection point is found, not just the first. Listen for a learner declaring an inflection point immediately upon finding $f''(c)=0$, with no mention of checking either side — that omission is the tell for MC-1. Listen for a learner who, given a concave-up interval, states the function is "increasing" without having checked $f'$ separately — that unchecked assumption is the tell for MC-2. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Declares an inflection point from $f''(c)=0$ alone, without checking for a sign change** — MC-1. Route to the paired inflection contrast, on the exact point in question.
- **Assumes a concave-up interval must be increasing (or concave-down must be decreasing)** — MC-2. Route to the decreasing-yet-concave-up example, checking $f'$ and $f''$ as two separate questions.
- **Finds only the $f''(x)=0$ inflection candidates, missing undefined-$f''$ ones** — MC-3. Route to the undefined-second-derivative search, on a function with a genuine cusp or vertical tangent in $f''$.
- **Runs both searches for inflection candidates, verifies sign changes before confirming, and checks direction and curvature as independent questions** — the intended target state.
- **Mastery trigger**: the Blueprint's A04 gate, MAMR 4/5 (⌈0.80×5⌉). The 4-item P77 set plus the P76 independence-mode transfer probe (a profit-growth-rate concavity analysis) must include at least one item where $f''(c)=0$ does NOT produce a genuine inflection point — a gate made only of true-positive inflection points certifies MC-1's shortcut rather than the full verification discipline.

## Tutor Recovery Strategy
The likely utterance here is "I found where $f''=0$ — isn't that the inflection point?" — a reasonable extension of the (correct) procedure's first half. The concept-specific smaller question returns to the suspect-list analogy from `critical-points`: **"Being a suspect doesn't mean guilty, right? What extra check turns a suspect into a confirmed inflection point?"** The learner recalls the sign-change requirement, on ground they already own from the parallel critical-points concept. Then return: "exactly — check whether $f''$ actually flips sign on either side of that point." If the frustration is instead about the concavity-direction conflation, shrink to the bare check: **"Is the car speeding up or slowing down right now? Separately — is the steering wheel turning left or right? Are those the same question?"** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure with an embedded conceptual caveat** (the two-source search and sign-change verification are procedural; the direction/curvature independence is conceptual). Review by *presenting a genuine false-positive $f''=0$ case*, not only true positives, since a true-positive-only review lets MC-1's shortcut pass undetected.
- Concept-specific deviation: keep $g(x)=x^4$ at $x=0$ permanently in the review rotation as the standing false-positive counterexample — a review that only ever confirms genuine inflection points never re-exercises the verification discipline MC-1 targets.
- Interleaving partners: `math.calc.critical-points` (the direct structural parallel — both concepts share the "candidate found from a zero-or-undefined search, confirmed only by further checking" pattern) and `math.calc.higher-order-derivatives` (the source of a correctly-computed $f''$ this entire concept depends on).

## Transfer Connections
- **Near**: `math.calc.curve-sketching` (which combines monotonicity, extrema, and concavity/inflection information into one complete qualitative graph description).
- **Far**: the second-derivative test for classifying extrema (met alongside or after `local-extrema`), which uses the SAME sign-of-$f''$ information this concept establishes, applied at a critical point rather than searched for independently.
- **Real-world**: the Blueprint's own transfer probe — a company's cumulative profit whose growth RATE slows then speeds back up — is a direct, literal application of concavity change in an economic context.
- **Expert transfer**: distinguishing a NECESSARY signal (a candidate location) from a SUFFICIENT confirmation (an actual verified change) — the same discipline recurs across critical points, inflection points, and root-finding candidates generally.

## Cross-Subject Connections
- **Physics**, real: the concavity of a position-vs-time graph reveals whether acceleration is positive or negative (concave up means accelerating in the positive direction), connecting directly to the higher-order-derivatives concept's own acceleration interpretation.
- **Economics**, genuine and central: the Blueprint's own transfer probe (profit growth rate slowing then speeding up) is a standard application of concavity analysis in economic modeling — recognizing a "point of diminishing returns" is literally an inflection point.
- **Engineering**, real: a system's response curve's concavity indicates whether a control adjustment's effect is accelerating or decelerating, informing tuning decisions.
- The KG records `cross_links: []`, and no strong cross-subject KG omission is flagged here — the economics/physics connections, while genuine, are applications rather than structural KG dependencies.

## Blueprint References
`docs/curriculum/blueprints/math.calc.concavity.md`. Reused by reference, not restated: the Component 1 Learning Objectives, the Component 4 Worked Examples (Example 1 the sign-of-$f''$ basics, Example 2 the genuine-vs-false-positive inflection contrast, Example 3 the direction/curvature independence), the Component 5 teaching actions (A01 P11 representation shift, A02 P06 contrast pair, A03 P06 contrast pair, A04 P91 mastery gate at MAMR 4/5), the Component 6 Misconception Registry (MC-1..MC-3) and repair actions (B01–B03), the P77 four-item problem set, and the P76 independence-mode transfer probe (the profit-growth-rate analysis). This entry adds independent birth-type classification for all three misconceptions (the Blueprint marks severities but assigns no birth type), the mental-model ladder, the anti-analogy, the argued fully-guided-discovery approach, and the explicit cross-reference naming MC-1's and MC-3's mechanisms as the same "candidate vs. confirmed" and "undefined-derivative search missed" patterns already documented for `math.calc.critical-points`.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
No Blueprint/KG metadata discrepancy was found for this concept — the Blueprint's stated unlocks (`math.calc.curve-sketching`) and empty cross_links match the live KG's own fields exactly, confirmed by direct query. Recorded as a positive finding, continuing the pattern begun in Batch 38 — this batch's own first entry in a fifth consecutive zero-discrepancy batch.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 41).
