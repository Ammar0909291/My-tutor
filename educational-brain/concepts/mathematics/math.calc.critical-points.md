# math.calc.critical-points

## Identity
- **KG ID**: `math.calc.critical-points`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.derivative-rules` — load-bearing part: solving $f'(x)=0$ for polynomials requires exactly the power/sum/constant-multiple rules already mastered there.
- **Unlocks**: `math.calc.local-extrema` (the first/second derivative tests that resolve exactly the "is this critical point actually a max/min?" ambiguity this concept deliberately leaves open), `math.calc.optimization` (real-world max/min problems solved by first finding critical points).
- **Cross-links**: none in the KG.
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.80
- **Estimated hours**: 4
- **Blueprint**: `docs/curriculum/blueprints/math.calc.critical-points.md` (reused by reference throughout)

## Learning Objective
- The learner can define a critical point of $f$ as a value $c$ IN THE DOMAIN of $f$ where EITHER $f'(c)=0$ OR $f'(c)$ is undefined, and can find all critical points of a given function by running BOTH searches.
- The learner can state that critical points are only CANDIDATES for local extrema (or inflection points) — never a guarantee — and produce an example of a critical point that is neither a max nor a min.
- The learner can distinguish a "smooth" critical point (from $f'(c)=0$, a flat tangent) from a "non-smooth" one ($f'(c)$ undefined — a corner, cusp, or vertical tangent), recognizing they need different graphical handling but are equally valid critical points.

## Core Understanding
A critical point of $f$ is a value $c$, IN THE DOMAIN of $f$, where either the tangent line is horizontal ($f'(c)=0$) or no well-defined tangent line exists at all ($f'(c)$ undefined). These are the ONLY places a local maximum or minimum can occur — Fermat's theorem guarantees this — but the guarantee runs in one direction only: every local extremum is a critical point, but NOT every critical point is a local extremum. $f(x)=x^3$ at $x=0$ is a textbook counterexample: $f'(x)=3x^2=0$ there, yet $f$ is increasing on both sides, so $x=0$ is neither a max nor a min — an inflection point with a flat tangent. Finding ALL critical points genuinely requires TWO separate searches, not one: solving $f'(x)=0$ finds the "smooth flat" critical points, and SEPARATELY checking where $f'(x)$ fails to exist (visible on a graph as a corner, cusp, or vertical tangent) finds the "non-smooth" ones — a function like $f(x)=|x-2|+1$, whose derivative is never literally zero anywhere it exists, still has a critical point at $x=2$, found only by the second search. A crucial gatekeeping condition: the point $c$ must already be in the domain of $f$ itself — a value where $f$ isn't even defined (like $x=0$ for $f(x)=1/x$) is never a critical point, no matter how badly a derivative-like expression misbehaves there.

## Mental Models
1. **Beginner — find where the derivative is zero.** Solve $f'(x)=0$, call those the critical points, done. *Upgrade trigger*: a function like $|x-2|+1$, whose derivative is never literally zero, yet visibly has a sharp point on its graph. *Shelf life*: about one lesson.
2. **Intermediate — critical points come from TWO sources: $f'(c)=0$ OR $f'(c)$ undefined.** Run both searches, every time. *Upgrade trigger*: finding a critical point and immediately assuming it must be a max or min, without further checking.
3. **Advanced — critical points are necessary-condition candidates, not guarantees.** Fermat's theorem says extrema can ONLY occur at critical points, never that every critical point IS one; $x^3$ at $0$ is the standing counterexample. *Upgrade trigger*: needing to actually DETERMINE which category a given critical point falls into — this model says only that further work is needed, not how to do it.
4. **Expert — critical points partition a function's domain into monotonic intervals.** Between consecutive critical points (and domain boundaries), $f$ is either entirely increasing or entirely decreasing — this is the structural fact that the first-derivative test (met in the next concept) exploits to classify each critical point. *Shelf life*: permanent.

## Why Students Fail
The dominant failure is an implication reversal: Fermat's theorem genuinely guarantees "every local extremum is a critical point," and a learner reasonably but wrongly assumes the CONVERSE — "every critical point is a local extremum" — missing that a critical point can be a flat inflection point (like $x^3$ at $0$) with no local max or min character at all (MC-1, CRITICAL-POINT-ASSUMED-EXTREMUM). A second failure is procedural incompleteness driven by instructional emphasis: the overwhelming majority of introductory practice problems are solved by "set $f'(x)=0$ and solve," so that single search becomes the ENTIRE remembered procedure, and the second, less-drilled search (checking where $f'$ fails to exist) is simply never run, silently missing critical points like $x=2$ for $f(x)=|x-2|+1$ (MC-2, UNDEFINED-DERIVATIVE-CATEGORY-MISSED). The third failure is an overextension of the undefined-derivative rule past its own gatekeeping precondition: a learner correctly recalls "check where the derivative is undefined" but forgets this must first happen at a point WHERE $f$ ITSELF IS DEFINED, and so flags a point like $x=0$ for $f(x)=1/x$ (where $f$ isn't even defined, let alone $f'$) as a critical point (MC-3, OUTSIDE-DOMAIN-POINT-TREATED-AS-CRITICAL).

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1..MC-3) and its Protocol B repair actions B01–B03. **The Blueprint's Misconception Registry carries a Severity column (Foundational/Foundational/Moderate) but no explicit birth-type column**; all three classifications below are independently assigned here.

- **MC-1 — CRITICAL-POINT-ASSUMED-EXTREMUM** (the Blueprint's own "Foundational" misconception)
  - **Birth type**: Type 1, overgeneralization of a true implication into its false converse — the identical mechanism already documented across this campaign's math.calc entries for `continuity-types`, `derivative-definition`, and `differentiability`, each reversing a true one-directional "$A\Rightarrow B$" into the false "$B\Rightarrow A$."
  - **Characteristic phrase**: finding $f'(c)=0$ and immediately declaring $c$ a local max or min without further checking.
  - **Detection probe** (verbatim, Blueprint's A01 MC-1 hook): after finding a critical point via $f'(c)=0$, ask "so is this a local max or min?" before doing any further test.
  - **Repair**: Blueprint Repair Action B01 — re-anchor on Fermat's theorem's actual direction: extrema can ONLY occur at critical points, never that every critical point IS one, using $f(x)=x^3$ at $x=0$ (increasing on both sides, neither max nor min) as the standing counterexample.
  - **Verification of death**: given a fresh critical point, the learner states explicitly that further checking (first or second derivative test) is required before classifying it, without being prompted.

- **MC-2 — UNDEFINED-DERIVATIVE-CATEGORY-MISSED**
  - **Birth type**: Type 5, instruction-induced. The overwhelming majority of practice examples are solved by "set $f'(x)=0$," so that single search becomes the complete remembered procedure, and the second search (checking where $f'$ is undefined) never gets drilled into habit.
  - **Characteristic phrase**: given $f(x)=|x-2|+1$ (whose derivative is never literally zero), answering "no critical points."
  - **Detection probe** (verbatim, Blueprint's A02 Contrast 2): "find all critical points of $f(x)=|x-2|+1$ using only 'set $f'(x)=0$.'"
  - **Repair**: Blueprint Repair Action B02 — re-derive from the definition's explicit "or": two separate searches are ALWAYS required, never one; $x=2$ is a genuine critical point from the undefined-derivative category.
  - **Verification of death**: given a fresh function with a corner or cusp, the learner runs BOTH searches unprompted and finds the undefined-derivative critical point without being told to look for it.

- **MC-3 — OUTSIDE-DOMAIN-POINT-TREATED-AS-CRITICAL**
  - **Birth type**: Type 1, overgeneralization of the undefined-derivative rule past its own domain-membership precondition — extending "check where $f'$ is undefined" without first confirming $c$ is even a point where $f$ itself is defined.
  - **Characteristic phrase**: treating $x=0$ as a critical point of $f(x)=1/x$, since "the derivative blows up there."
  - **Detection probe** (verbatim, Blueprint's B03 P41): "is $x=0$ a critical point of $f(x)=1/x$?"
  - **Repair**: Blueprint Repair Action B03 — a critical point must be IN the domain of $f$ FIRST; $x=0$ isn't even a place $f$ is defined, so the derivative-undefined condition never gets a chance to apply there.
  - **Verification of death**: given a fresh function with a point excluded from its own domain, the learner checks domain membership BEFORE checking the derivative, and correctly excludes the point.

## Analogies
- **Best — a list of suspects, not a verdict.** Critical points are the suspects (the only places an extremum COULD be); further investigation (the derivative tests) is needed to determine which suspect, if any, is guilty. Directly counters MC-1's premature verdict.
- **Alternative — a two-part background check.** Checking a candidate for a job requires BOTH a reference check AND a background check — skipping either leaves the screening incomplete, just as skipping either critical-point search leaves the list incomplete (directly counters MC-2).
- **ANTI-ANALOGY — "a critical point is wherever the derivative goes wrong."** This phrasing licenses MC-3: "goes wrong" could describe a point outside the domain entirely, where there's no derivative to even evaluate, let alone one that's merely "wrong" there. Say "wherever the derivative is undefined, AT A POINT WHERE THE FUNCTION ITSELF IS DEFINED" instead.

## Demonstrations
- **The flat-but-not-extremum contrast.** Compute $f'(x)=3x^2=0$ at $x=0$ for $f(x)=x^3$, then check nearby values ($f(-1)=-1<f(0)=0<f(1)=1$) to see $f$ is increasing straight through. *Predict whether $x=0$ is a max, min, or neither, before checking nearby values.* The "neither" result is the demonstration for MC-1.
- **The missed-corner search.** Attempt "set $f'(x)=0$" on $f(x)=|x-2|+1$ and get no solutions, then check the graph directly at $x=2$. *Predict whether there are any critical points before checking the graph.* Finding the corner the algebra-only search missed is the demonstration for MC-2.
- **The domain-gate check.** For $f(x)=1/x$, ask whether $x=0$ counts as a critical point, then confirm $f$ isn't even defined there. *Predict yes or no before checking the domain.* The domain check overriding the "derivative blows up" intuition is the demonstration for MC-3.

## Discovery Questions
Guided discovery is used for both the "candidates, not guarantees" distinction and the two-source search — both are directly observable from concrete function behavior rather than conventions to be stated.
1. **Need** — "Find where $f'(x)=0$ for $f(x)=x^3$. Is that point a local max or min?" Checking nearby values shows neither.
2. **Playground** — try a few more functions with $f'(c)=0$ and classify each by checking nearby values directly.
3. **Invention** — "What's different about the $x^3$ case compared to the others?" Let the learner articulate "it's flat but still increasing through."
4. **Collision** — confront a learner who assumed every critical point is an extremum with the $x^3$ counterexample's own nearby-value check.
5. **Formalisation** — state Fermat's theorem's correct direction and the two-source search explicitly.
6. **Compression** — "Critical points are where to LOOK. They don't tell you what you'll FIND."

## Teaching Sequence
The two-source search (targeting MC-2) should be established as a SINGLE combined procedure from the very first example, per the Blueprint's own A01 — presenting the $f'(c)=0$ search alone first, with the undefined-derivative search "added later," is exactly how MC-2 becomes the default habit; both searches must be modeled together from the start. The critical-point-vs-extremum distinction (MC-1) should follow immediately, using the SAME $x^3$ example that will later serve as the standing counterexample throughout the campaign's derivative-test concepts, per the Blueprint's own Teaching Notes on scope: this concept deliberately stops at "critical point identified, extremum status undetermined," and `math.calc.local-extrema` owns resolving that ambiguity. The domain-gate check (MC-3) is best introduced LAST, as a boundary case, once the two-source search is fluent — introducing it too early risks conflating "check the domain" with "check where the derivative is undefined" as one confused step rather than two ordered ones. Turn-level scripts for A01–A03 are owned by the Blueprint's Component 5 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the flat-but-not-extremum contrast on $f(x)=x^3$, with the learner checking nearby values themselves. First action; anchors "candidate, not guarantee" concretely.
- **TEST-THINKING: Prediction** — "Does $f(x)=|x-2|+1$ have any critical points, using only $f'(x)=0$?" asked BEFORE checking the graph. Surfaces MC-2 in one turn.
- **DO: Demonstration** — the domain-gate check on $f(x)=1/x$ at $x=0$, run with the learner checking the domain FIRST.
- **TEST-THINKING: Error Analysis** — "A student solved $f'(x)=0$ for a piecewise function, found two solutions, and said 'these are all the critical points.' What check did they skip?" targets MC-2 directly.
- **Does NOT fit: teaching the first/second derivative test to resolve extremum status.** `math.calc.local-extrema` owns that explicitly; introducing it here would duplicate that concept's own teaching actions and undercut this concept's deliberately narrow scope.

## Voice Teaching Notes
The load-bearing sentence is "critical points are candidates — they tell you WHERE to look, never WHAT you'll find." Say it every time a critical point is found, not just the first. Listen for a learner immediately labeling a freshly-found critical point "a max" or "a min" without any hedge or further-checking language — that fast, unqualified labeling is the tell for MC-1. Listen for a learner who, given a corner-shaped function, only ever attempts "set $f'(x)=0$" without mentioning checking for undefined points — that omission is the tell for MC-2. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Classifies a freshly-found critical point as a max/min without further checking** — MC-1. Route to the flat-but-not-extremum contrast, on the exact critical point in question.
- **Finds only the $f'(c)=0$ critical points, missing undefined-derivative ones** — MC-2. Route to the missed-corner search, on a function with a genuine corner or cusp.
- **Flags a point outside $f$'s own domain as a critical point** — MC-3. Route to the domain-gate check, confirming domain membership first.
- **Runs both searches automatically, checks domain membership before evaluating the derivative, and explicitly defers extremum classification to further work** — the intended target state.
- **Mastery trigger**: the Blueprint's A03 gate, MAMR 4/5 (⌈0.80×5⌉). The 4-item P77 set plus the P76 independence-mode transfer probe (a profit-function critical-point analysis plus a kink-recognition item) must include at least one item requiring the undefined-derivative search on a function where $f'(x)=0$ has no solution at all — a gate made only of smooth-critical-point items certifies MC-2's shortcut rather than the full two-source procedure.

## Tutor Recovery Strategy
The likely utterance here is "I found where the derivative is zero — isn't that the answer?" — a reasonable question given how much of the procedure the learner has correctly executed. The concept-specific smaller question returns to the suspect-list analogy: **"If a detective has a list of suspects, does having a name ON the list mean that person committed the crime?"** The learner says no, correctly, on ground they already own. Then return: "critical points are exactly that — a list of suspects. Being on the list just means 'worth investigating,' not 'guilty.'" If the frustration is instead about the second search feeling redundant when the first already found solutions, shrink to the bare check: **"Does this function have any sharp corners or cusps ANYWHERE, even if $f'(x)=0$ has no solutions there?"** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure with an embedded conceptual caveat** (the two-source search is procedural; "candidate, not guarantee" is conceptual). Review by *running the search on a function with a corner or cusp*, not a smooth polynomial alone, since a smooth-only review lets MC-2's shortcut pass undetected.
- Concept-specific deviation: keep $f(x)=x^3$ at $x=0$ permanently in the review rotation as the standing counterexample to "critical point implies extremum" — a review that only ever asks for the search procedure, without re-deriving the counterexample, lets MC-1 regrow as a memorized slogan.
- Interleaving partners: `math.calc.differentiability` (the discriminating partner for the undefined-derivative search — the same corner/cusp/vertical-tangent taxonomy governs both concepts) and the upcoming `math.calc.local-extrema`, which directly consumes this concept's own deliberately unresolved "candidate" list.

## Transfer Connections
- **Near**: `math.calc.local-extrema` (the first/second derivative tests that resolve exactly the ambiguity this concept leaves open), `math.calc.optimization` (real-world max/min problems solved by finding critical points first, exactly as taught here).
- **Far**: root-finding algorithms (met later, in numerical methods), which similarly generate CANDIDATE solutions requiring verification, echoing the "candidates, not guarantees" structure.
- **Real-world**: the Blueprint's own transfer probe — a company's hourly profit function analyzed for candidate peak/trough times — is a direct, literal application, not a metaphor.
- **Expert transfer**: the general discipline of distinguishing a NECESSARY condition (critical points are necessary for extrema) from a SUFFICIENT one (not every critical point is an extremum) — the same discipline recurs whenever a theorem's converse is tempting but false.

## Cross-Subject Connections
- **Physics**, real: analyzing a position or energy function for equilibrium points (where velocity or force is zero) uses exactly this concept's search, with the "is it stable, unstable, or neither" classification deferred to the next concept.
- **Economics**, genuine and central: the Blueprint's own transfer probe (a profit function's candidate peak/trough times) is a standard, literal application of critical-point analysis in economic modeling.
- **Engineering**, real: structural or control-system stress/response functions are analyzed for critical points before classifying them as safe operating peaks, failure points, or neither.
- The KG records `cross_links: []`, and no strong cross-subject KG omission is flagged here — the economics/physics connections, while genuine, are applications rather than structural KG dependencies.

## Blueprint References
`docs/curriculum/blueprints/math.calc.critical-points.md`. Reused by reference, not restated: the Component 1 Learning Objectives, the Component 4 Worked Examples (Example 1 the algebraic $f'(x)=0$ search, Example 2 the flat-but-not-extremum counterexample, Example 3 the undefined-derivative critical point), the Component 5 teaching actions (A01 P11 representation shift, A02 P06 contrast pair, A03 P91 mastery gate at MAMR 4/5), the Component 6 Misconception Registry (MC-1..MC-3) and repair actions (B01–B03), the P77 four-item problem set, and the P76 independence-mode transfer probe (the profit-function analysis). This entry adds independent birth-type classification for all three misconceptions (the Blueprint marks severities but assigns no birth type), the mental-model ladder, the anti-analogy, the argued fully-guided-discovery approach, and the cross-reference naming MC-1's mechanism as the same implication-reversal pattern already documented for `continuity-types`, `derivative-definition`, and `differentiability`.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
No Blueprint/KG metadata discrepancy was found for this concept — the Blueprint's stated unlocks (`math.calc.local-extrema`, `math.calc.optimization`) and empty cross_links match the live KG's own fields exactly, confirmed by direct query. Recorded as a positive finding, continuing the pattern begun in Batch 38.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 40).
