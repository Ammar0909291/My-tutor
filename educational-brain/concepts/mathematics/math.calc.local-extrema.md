# math.calc.local-extrema

## Identity
- **KG ID**: `math.calc.local-extrema`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.critical-points` — load-bearing part: this concept resolves EXACTLY the "is this critical point actually a max/min?" ambiguity that concept deliberately leaves open, reusing the identical $x^3$-at-0 counterexample.
  - `math.calc.increasing-decreasing` — load-bearing part: the First Derivative Test directly reuses the sign-of-$f'$/sign-analysis machinery already established there.
- **Unlocks**: `math.calc.optimization`.
- **Cross-links**: none in the KG.
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.8 (MAMR = ⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 6
- **Blueprint**: `docs/curriculum/blueprints/math.calc.local-extrema.md` (reused by reference throughout)

## Learning Objective
- The learner can apply the FIRST DERIVATIVE TEST: at a critical point $c$, a sign change of $f'$ from positive to negative indicates a LOCAL MAXIMUM; negative to positive indicates a LOCAL MINIMUM; no sign change indicates NEITHER.
- The learner can apply the SECOND DERIVATIVE TEST: at a critical point $c$ with $f'(c)=0$, $f''(c)>0$ indicates a local minimum, $f''(c)<0$ indicates a local maximum, and correctly recognize the INCONCLUSIVE case ($f''(c)=0$), where the First Derivative Test must be used instead.
- The learner can choose strategically between the two tests, recognizing when the Second Derivative Test is more efficient and when the First Derivative Test is REQUIRED (when $f'(c)$ doesn't exist, or when $f''(c)=0$).

## Core Understanding
This concept resolves EXACTLY the ambiguity `math.calc.critical-points` deliberately leaves open — that a critical point is only a CANDIDATE for a local extremum, never a guarantee. Two complementary tests classify a critical point precisely. The FIRST DERIVATIVE TEST examines the sign of $f'$ immediately to the left and right of a critical point $c$, using the sign-analysis procedure already mastered: a change from $+$ to $-$ (increasing then decreasing) means $c$ is a local MAXIMUM; a change from $-$ to $+$ means a local MINIMUM; and — critically — NO sign change at all means $c$ is NEITHER a max nor a min, a completely legitimate, common outcome the test must be trusted to reveal, not a failure of the procedure. The SECOND DERIVATIVE TEST offers a often-faster alternative at a critical point where $f'(c)=0$ specifically: $f''(c)>0$ signals a local minimum (the graph curves like a valley, concave up), $f''(c)<0$ signals a local maximum (concave down, like a hilltop), and $f''(c)=0$ is genuinely INCONCLUSIVE — the test provides NO information whatsoever in that case, requiring an immediate fallback to the First Derivative Test. The Second Derivative Test carries two real limitations the First Derivative Test does not share: it is simply INAPPLICABLE at a critical point where $f'$ itself is undefined (not just zero), and it produces no answer at all when $f''(c)=0$. The First Derivative Test, by contrast, always works given the ability to determine $f'$'s sign on both sides — making it the more universally reliable tool, even when the Second Derivative Test is faster in the cases where it does apply cleanly.

## Mental Models
1. **Beginner — "if the derivative changes from positive to negative at a critical point, it's a max; negative to positive, it's a min."** The First Derivative Test is applied as a memorized rule, with no expectation that "neither" is even a possible outcome. *Upgrade trigger*: applying the test to $f(x)=x^3$ at $x=0$ and finding $f'$ does not change sign at all.
2. **Intermediate — "check the sign change for the First Derivative Test, or compute $f''(c)$ for the Second Derivative Test — whichever is faster."** Both tests are now available, though the Second Derivative Test's inconclusive case may still be under-recognized. *Upgrade trigger*: computing $f''(c)=0$ for a critical point and being uncertain what conclusion, if any, this permits.
3. **Advanced — "$f''(c)=0$ is genuinely inconclusive — it tells you NOTHING, not 'probably a saddle,' and the same zero-second-derivative signal can correspond to a genuine extremum OR to neither, depending entirely on the specific function; the First Derivative Test always works, given the ability to determine sign."** The inconclusive case's true meaninglessness, and the First Derivative Test's status as the more universally reliable fallback, are both now explicit. *Upgrade trigger*: needing to apply this classification machinery as the FINAL step of a real optimization problem, where finding candidates is only half the task.
4. **Expert — local extrema classification is one instance of a broader "candidate identification, then rigorous verification" pattern, recurring whenever a necessary condition (like $f'(c)=0$) narrows down possibilities that a SEPARATE, sufficient test must then adjudicate.** The learner recognizes this two-stage structure — narrow, then classify — as reusable well beyond calculus. *Shelf life*: permanent.

## Why Students Fail
The dominant failure assumes the First Derivative Test's procedure must always resolve to a definite classification, missing that "neither" (no sign change at all) is a completely valid, common outcome the test correctly reveals rather than fails to produce (MC-1, EVERY-CRITICAL-POINT-RESOLVES-TO-EXTREMUM) — a Type 1 overgeneralization of the pattern from typical introductory examples, where critical points usually DO turn out to be genuine extrema, extended past the subtler cases (like $x^3$ at $x=0$) where they do not. A second, distinct failure treats $f''(c)=0$ as carrying SOME default interpretive meaning — perhaps "a weak extremum" or "probably a saddle point" — rather than recognizing it as a genuinely inconclusive result requiring an unconditional fallback to the First Derivative Test, since the SAME zero-second-derivative signal can correspond to a genuine local minimum in one function and to neither in another, structurally similar function (MC-2, SECOND-DERIVATIVE-ZERO-MISINTERPRETED) — a Type 5 instruction-induced gap, since many treatments move quickly past the inconclusive case without demonstrating, via a genuine contrasting pair of examples, that it truly carries zero default information. A third failure attempts to apply the Second Derivative Test at a critical point where $f'$ itself is UNDEFINED (a corner or cusp, not merely a point where $f'=0$) — missing that the test's own hypothesis specifically requires $f'(c)=0$, and is simply inapplicable, not merely unhelpful, when that hypothesis fails to hold at all (MC-3, SECOND-DERIVATIVE-TEST-APPLIED-AT-UNDEFINED-DERIVATIVE-POINTS) — a Type 1 overgeneralization of the Second Derivative Test's applicability, extended past the narrower category of critical points where $f'$ is undefined rather than merely zero.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1, MC-2, MC-3) and its own repair actions B01–B03. **The Blueprint's Misconception Registry carries a Severity column (Foundational, Foundational, Moderate) but no explicit birth-type column**; all three classifications below are independently assigned here.

- **MC-1 — EVERY-CRITICAL-POINT-RESOLVES-TO-EXTREMUM** (the Blueprint's own "Foundational" misconception)
  - **Birth type**: Type 1, overgeneralization. Typical introductory examples feature critical points that genuinely DO turn out to be extrema, extending the pattern past subtler cases (like $x^3$ at $x=0$) where the derivative's sign never actually changes.
  - **Characteristic phrase**: answering "yes, one of them" when asked whether a critical point with no sign change on either side must still be a max or a min.
  - **Detection probe** (Blueprint's A01 hook): "if $f'(c)=0$ but $f'$ has the SAME sign on both sides of $c$, is $c$ still a local max or min?"
  - **Repair**: Blueprint Repair Action B01 — re-anchor on "the test's outcome depends entirely on whether the sign actually changes — no change means neither, and that's a completely legitimate answer, not a failure of the test."
  - **Verification of death**: given a fresh critical point where $f'$ does not change sign, the learner correctly classifies it as "neither," without treating this as an incomplete or failed analysis.

- **MC-2 — SECOND-DERIVATIVE-ZERO-MISINTERPRETED** (the Blueprint's own "Foundational" misconception)
  - **Birth type**: Type 5, instruction-induced. The inconclusive case is often moved past quickly without a genuine contrasting pair of examples demonstrating that the same signal ($f''(c)=0$) can correspond to entirely different classifications depending on the specific function, leaving the "inconclusive means truly nothing" fact under-emphasized.
  - **Characteristic phrase**: treating $f''(c)=0$ as implying something specific (like "weak extremum" or "saddle point") by default, without falling back to the First Derivative Test.
  - **Detection probe** (Blueprint's A02 hook): given a case with $f''(c)=0$, ask what this tells you about $c$ directly, without further work.
  - **Repair**: Blueprint Repair Action B02 — work through Example 3's paired counterexample ($x^4$ versus $x^3$, both inconclusive by the Second Derivative Test, but resolving to genuinely different classifications), proving no shortcut interpretation is valid.
  - **Verification of death**: given a fresh $f''(c)=0$ result, the learner immediately falls back to the First Derivative Test without assuming any default meaning for the inconclusive signal.

- **MC-3 — SECOND-DERIVATIVE-TEST-APPLIED-AT-UNDEFINED-DERIVATIVE-POINTS** (the Blueprint's own "Moderate" severity misconception)
  - **Birth type**: Type 1, overgeneralization. The Second Derivative Test's applicability is extended past its own hypothesis, from "any critical point" to specifically "any critical point where $f'$ is undefined," missing that the test genuinely requires $f'(c)=0$ and offers no version applicable when $f'(c)$ does not even exist.
  - **Characteristic phrase**: attempting to compute or apply $f''(c)$ at a critical point where $f'$ is undefined (like $|x|$ at $x=0$).
  - **Detection probe** (Blueprint's B03 detector): given $|x|$ at $x=0$, ask a student to apply the Second Derivative Test there.
  - **Repair**: Blueprint Repair Action B03 — re-anchor on "the Second Derivative Test requires $f'(c)=0$ specifically — if $f'(c)$ doesn't even exist, there's no $f''(c)$ to compute in the relevant sense, and the First Derivative Test is the only available tool."
  - **Verification of death**: given a fresh critical point where $f'$ is undefined, the learner correctly declines to apply the Second Derivative Test and uses the First Derivative Test instead.

## Analogies
- **Best — a hilltop and a flat resting spot on a staircase landing, both momentarily level.** A hilltop is level for an instant while genuinely turning from up to down; a landing on a staircase is also momentarily level (zero slope) but the staircase keeps going the SAME direction through it — exactly the difference between a genuine extremum and a "neither" critical point.
- **Alternative — two students both scoring a "0" on a diagnostic test for entirely different reasons.** A score of 0 could mean "knows nothing" or "the test was miscalibrated for this student" — the SAME number carries different meanings depending on context, exactly like $f''(c)=0$ requiring further investigation (the First Derivative Test) rather than a fixed interpretation.
- **ANTI-ANALOGY — "a critical point is always either a peak or a valley."** This phrasing licenses MC-1 directly, implying every critical point resolves definitively, when "neither" is a genuine, common third outcome. Say "a critical point might be a peak, a valley, or NEITHER — check the sign change, don't assume one of the first two" instead.

## Demonstrations
- **The "neither" outcome.** For $f(x)=x^3$ at $x=0$ (the standing counterexample from `math.calc.critical-points`), check the sign of $f'(x)=3x^2$ on both sides. *Predict, before checking, whether this critical point must resolve to a max or a min.* Confirming $f'\geq0$ on BOTH sides (no sign change) and the function is genuinely increasing straight through is the demonstration for MC-1.
- **The paired inconclusive-case contrast.** Compute $f''(0)=0$ for BOTH $f(x)=x^4$ and $g(x)=x^3$ (Example 3), then apply the First Derivative Test to each. *Predict, before applying the fallback test, whether both functions will classify the same way, given the identical inconclusive signal.* Finding $x^4$ resolves to a genuine local minimum while $x^3$ resolves to neither is the demonstration for MC-2 — the identical "inconclusive" signal carries zero default information.
- **The undefined-derivative attempt.** For $f(x)=|x|$ at $x=0$, attempt to compute $f''(0)$ directly. *Predict, before attempting, whether the Second Derivative Test can even be applied here.* Finding $f'(0)$ itself does not exist (so there is no $f''(0)$ to compute in the relevant sense) is the demonstration for MC-3.

## Discovery Questions
Direct instruction is the argued call for the two tests' own precise statements (best presented explicitly), but the "neither" outcome (MC-1) and the paired inconclusive-case contrast (MC-2) are both genuinely discoverable by direct trial.
1. **Need** — "Check the sign of $f'(x)=3x^2$ just before and just after $x=0$. Does it change?" It does not.
2. **Playground** — try the same sign check on a couple more critical points, some genuine extrema, some not.
3. **Invention** — "What does it mean for a critical point when the sign of $f'$ doesn't change at all?" Let the learner connect it to the function continuing to increase (or decrease) straight through.
4. **Collision** — confront a learner who assumed every critical point must be a max or min with the direct sign-check on $x^3$ at 0.
5. **Formalisation** — state the First Derivative Test's precise three-way outcome: max, min, or neither.
6. **Compression** — "No sign change means neither — and that's a real answer, not a failure."

## Teaching Sequence
The First Derivative Test and its "neither" outcome (MC-1, per the Blueprint's own A01) must be established FIRST, using the sign-analysis procedure already fluent from `math.calc.increasing-decreasing`, since it is the more universally reliable tool and the one that directly resolves `math.calc.critical-points`' own deliberately left-open ambiguity. The Second Derivative Test and its inconclusive case (MC-2, per the Blueprint's own A02) follow, contrasted directly against the First Derivative Test on the SAME function first (Example 2) to show agreement, then via the paired $x^4$/$x^3$ counterexample to show the inconclusive case's genuine emptiness. The undefined-derivative limitation (MC-3) is folded into ongoing practice as a boundary condition on the Second Derivative Test's own applicability, since it requires no new machinery beyond recognizing when $f'(c)$ fails to exist at all. Turn-level scripts for A01–A03 are owned by the Blueprint's Component 5 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the First Derivative Test applied to $f(x)=x^3-3x$'s two critical points (Example 1), reusing the sign-analysis result already established in `math.calc.increasing-decreasing`. First action; anchors the classification procedure on already-familiar ground.
- **TEST-THINKING: Prediction** — "If $f'(c)=0$ but the sign doesn't change on either side, is $c$ still a max or min?" asked BEFORE checking $x^3$ at 0. Surfaces MC-1 in one turn.
- **DO: Demonstration** — the paired inconclusive-case contrast ($x^4$ versus $x^3$, Example 3), applying the First Derivative Test to both after finding $f''(0)=0$ for each.
- **TEST-THINKING: Error Analysis** — "A student tried to compute $f''(0)$ for $f(x)=|x|$ to classify the critical point there. What's wrong with this approach?" targets MC-3 directly.
- **Does NOT fit: the multivariable analogue of these tests (the second-partials/Hessian test for classifying critical points of two-variable functions), or global (as opposed to local) extrema over an entire domain, here.** Those extensions belong to more advanced treatments and to `math.calc.optimization`, which this concept unlocks by supplying the classification step optimization problems require.

## Voice Teaching Notes
The load-bearing sentence is "check whether the sign ACTUALLY changes — no change means neither, a completely valid answer, and f''(c)=0 tells you nothing until you fall back to the sign check." Say it every time a new critical-point classification is set up, not just the first. Listen for a learner who, upon finding a critical point with no sign change, keeps searching for a "hidden" max or min — that persistent searching is the tell for MC-1. Listen for a learner who states a conclusion directly from $f''(c)=0$ without falling back to the First Derivative Test — that premature conclusion is the tell for MC-2. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Assumes a critical point must resolve to either a max or a min, treating "neither" as an incomplete result** — MC-1. Route to the "neither" outcome demonstration, on the exact function in question.
- **Draws a conclusion directly from $f''(c)=0$ without falling back to the First Derivative Test** — MC-2. Route to the paired inconclusive-case contrast, on the exact functions in question.
- **Attempts to apply the Second Derivative Test at a critical point where $f'$ itself is undefined** — MC-3. Route to the undefined-derivative attempt, on the exact function in question.
- **Correctly applies both tests, recognizes "neither" and "inconclusive" as legitimate outcomes requiring no forced interpretation, and falls back to the First Derivative Test whenever the Second Derivative Test cannot resolve or does not apply** — the intended target state.
- **Mastery trigger**: the Blueprint's A03 gate, MAMR 4/5 (⌈0.8×5⌉=4). The 4-item P77 set plus the P76 transfer probe (the profit-function cross-verification problem) must include at least one item requiring the learner to explain WHY both tests agree whenever both give a definite answer, not merely execute a given classification mechanically — a gate made only of correct-classification items risks certifying mechanics without certifying the conceptual discrimination against MC-2.

## Tutor Recovery Strategy
The likely utterance here is "the derivative is zero here, so this HAS to be a max or a min, right?" — a reasonable assumption given how often that pattern holds. The concept-specific smaller question returns to a direct sign check: **"What is the sign of $f'$ just to the LEFT of this point? What about just to the RIGHT?"** The learner computes both and may find they are the SAME sign. Then return: "since the sign never actually changed, the function kept increasing (or decreasing) straight through — this critical point is neither a max nor a min, and that's a completely legitimate, common outcome." If the frustration is instead about the inconclusive second-derivative case, shrink to the bare check: **"Does $f''(c)=0$ tell you the sign changed, or does it tell you literally nothing about the sign change?"** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure with an embedded outcome-completeness requirement** (recognizing "neither" and "inconclusive" as fully legitimate outcomes, not failures or gaps requiring further searching, is the single most load-bearing discipline in this concept). Review by *requiring the learner to state all THREE possible First Derivative Test outcomes (max, min, neither) before beginning any sign check*, never accepting a correctly-executed classification alone as evidence of understanding, since a learner drilled only on genuine-extremum examples may never encounter — and never be forced to correctly handle — the "neither" case.
- Concept-specific deviation: keep the $x^3$-at-0 and the paired $x^4$/$x^3$ examples permanently in the review rotation as the standing counterexamples for MC-1 and MC-2 respectively, since a review that only re-asks the procedure without re-deriving these specific counterexamples lets both misconceptions regrow as memorized slogans.
- Interleaving partners: `math.calc.critical-points` (the discriminating partner — this concept directly resolves that one's own deliberately left-open ambiguity, and the SAME $x^3$ counterexample anchors both entries) and `math.calc.optimization`, which this concept directly unlocks by supplying the exact classification step real-world optimization problems require as their final stage.

## Transfer Connections
- **Near**: `math.calc.optimization` (the direct extension this concept unlocks — real-world max/min problems solved by first finding critical points, then classifying them exactly as taught here).
- **Far**: the general "necessary condition narrows candidates, a separate sufficient test then classifies them" pattern — the SAME two-stage structure (critical points as candidates, then First/Second Derivative Test as the classifier) recurs in many optimization and decision-procedure contexts well beyond calculus.
- **Real-world**: the Blueprint's own transfer probe — a company's profit function classified via both tests as a cross-verification exercise — is a direct, literal application where correctly identifying a genuine maximum has real business significance.
- **Expert transfer**: recognizing that when two independent tests, applied to the same object, both give a definite (non-inconclusive) answer, they MUST agree — a general consistency expectation that recurs whenever multiple valid methods exist for answering the same mathematical question.

## Cross-Subject Connections
- **Economics/business**, real: the Blueprint's own transfer probe (a company's profit function) is a direct, literal application where correctly classifying a critical point as a genuine maximum (versus a false positive) has real financial consequences.
- **Physics**, real: classifying equilibrium points of a potential energy function as stable (local minima) or unstable (local maxima) uses this exact classification machinery.
- **Engineering**, real: identifying genuine peak stress points versus points of merely zero slope in a structural response function relies on this same First/Second Derivative Test discrimination.
- No genuine KG cross_link exists for this concept.

## Blueprint References
`docs/curriculum/blueprints/math.calc.local-extrema.md`. Reused by reference, not restated: the Component 1 Learning Objectives, the Component 4 Worked Examples (Example 1 the First Derivative Test application reusing already-established sign analysis, Example 2 the Second Derivative Test confirming agreement, Example 3 the paired $x^4$/$x^3$ inconclusive-case contrast breaking MC-2), the Component 5 Teaching Actions (A01 P11 representation shift, A02 P06 contrast pair with two sub-contrasts, A03 P91 mastery gate at MAMR 4/5), the Component 6 Misconception Registry (MC-1, MC-2, MC-3) and repair actions (B01, B02, B03), the four-item P77 problem set, and the P76 independence-mode transfer probe (the profit-function cross-verification problem). This entry adds independent birth-type classification for all three misconceptions (the Blueprint marks severities but assigns no birth type), the mental-model ladder, the anti-analogy, and the argued direct-instruction-for-the-two-test-statements / guided-discovery-for-the-neither-outcome-and-paired-inconclusive-contrast split.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
No Blueprint/KG metadata discrepancy was found for this concept — the Blueprint's stated requires (`math.calc.critical-points`, `math.calc.increasing-decreasing`), unlocks (`math.calc.optimization`), cross_links (none), difficulty (advanced), bloom (apply), mastery_threshold (0.8), and estimated_hours (6) all match the live KG's own fields exactly, confirmed by direct query. A genuine, substantively-incorporated cross-reference was confirmed directly against the already-authored `math.calc.critical-points` entry (Batch 40): that entry explicitly names `math.calc.local-extrema` as the concept resolving its own deliberately unresolved ambiguity, and cites the IDENTICAL $x^3$-at-0 standing counterexample this entry also uses — the two entries were verified to reference each other consistently. This is the third of four zero-discrepancy concepts in this batch, continuing the streak restarted in Batch 43 after Batch 42's `arc-length` broke the prior five-consecutive-zero run.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 47).
