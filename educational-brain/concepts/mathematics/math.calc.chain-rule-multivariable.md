# math.calc.chain-rule-multivariable

## Identity
- **KG ID**: `math.calc.chain-rule-multivariable`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.partial-derivatives` — load-bearing part: the multivariable chain rule's building blocks are exactly the individual partial derivatives $\partial z/\partial x$, $\partial z/\partial y$ already computable.
  - `math.calc.chain-rule` — load-bearing part: this concept IS the direct generalization of the single-variable chain rule, and the underlying "rate propagates through each dependency link" idea is reused unchanged.
- **Unlocks**: none in the KG.
- **Cross-links**: none in the KG.
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.75 (MAMR = ⌈0.75×5⌉ = 4/5)
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.calc.chain-rule-multivariable.md` (reused by reference throughout)

## Learning Objective
- The learner can apply the multivariable chain rule $\frac{dz}{dt}=\frac{\partial z}{\partial x}\frac{dx}{dt}+\frac{\partial z}{\partial y}\frac{dy}{dt}$ when $z=f(x,y)$ and $x,y$ are BOTH functions of a single variable $t$, summing the contribution through EACH intermediate variable's path.
- The learner can draw the DEPENDENCY TREE (showing $z$ depending on $x,y$, each depending on $t$) BEFORE writing the formula, correctly identifying EVERY path from $z$ down to $t$ — a missing branch produces an incomplete, incorrect formula.
- The learner can apply the analogous rule when $x,y$ depend on TWO variables $s,t$ instead of one, recognizing that each PARTIAL derivative with respect to $s$ still sums over every intermediate path, but uses $\partial$ consistently throughout rather than mixing in total-derivative notation.

## Core Understanding
The multivariable chain rule generalizes the single-variable chain rule to a setting where an intermediate function depends on MULTIPLE variables at once. If $z=f(x,y)$ where $x=x(t)$ and $y=y(t)$ (both functions of a single variable $t$), then $\frac{dz}{dt}=\frac{\partial z}{\partial x}\cdot\frac{dx}{dt}+\frac{\partial z}{\partial y}\cdot\frac{dy}{dt}$ — the total rate of change of $z$ with respect to $t$ SUMS the contribution flowing through EACH intermediate variable separately, since $z$ can change either because $x$ changes, OR because $y$ changes, or both simultaneously. A DEPENDENCY TREE — a diagram placing $z$ at the top, branching down to $x$ and $y$, each branching further down to $t$ — makes this path structure explicit and is the essential tool for avoiding a missed path: EVERY path from $z$ down to the final variable contributes exactly ONE term (a product of derivatives along that path), and the total derivative is the SUM of every such path's contribution. When $x,y$ instead depend on TWO variables $s,t$ (e.g. $x=x(s,t)$, $y=y(s,t)$), the analogous rule applies separately for each of $s$ and $t$: $\frac{\partial z}{\partial s}=\frac{\partial z}{\partial x}\frac{\partial x}{\partial s}+\frac{\partial z}{\partial y}\frac{\partial y}{\partial s}$ — using PARTIAL derivatives THROUGHOUT this time, since $x$ and $y$ each now genuinely depend on more than one variable, and a total derivative $d/ds$ would be meaningless when $x$ is also affected by a completely separate variable $t$.

## Mental Models
1. **Beginner — "the chain rule for two variables means multiplying and adding some derivatives."** The formula is applied by pattern-matching on which symbols appear, without systematically tracing which paths genuinely exist between $z$ and the final variable. *Upgrade trigger*: computing $\frac{dz}{dt}$ for a function of $x$ and $y$ and getting a wrong answer by including only one of the two contributing terms.
2. **Intermediate — "draw the dependency tree first — every branch from z down to the final variable contributes one term, and you sum them all."** The systematic path-tracing discipline is now present and reliably applied for the single-intermediate-variable case. *Upgrade trigger*: encountering a case where $x$ and $y$ each depend on TWO variables ($s$ and $t$) rather than one, and needing to decide whether the SAME formula pattern still applies.
3. **Advanced — "the same dependency-tree-and-sum-every-path logic applies whether the final variables are one (t) or several (s,t) — the only change is switching entirely to partial-derivative notation once multiple final variables are genuinely in play."** The rule's generalization across different numbers of final variables is now a single unified understanding rather than two separately memorized formulas. *Upgrade trigger*: encountering an even more complex dependency structure (e.g. three layers deep, or a variable appearing in multiple intermediate paths simultaneously).
4. **Expert — the multivariable chain rule is itself a special case of a general "sum over all paths in a dependency graph" principle, which recurs in more advanced settings (implicit differentiation in several variables, related-rates problems with multiple interacting quantities, and even neural-network backpropagation's own chain-rule-based gradient computation).** The learner recognizes the dependency-tree-and-path-sum structure as a reusable computational pattern well beyond this one specific formula. *Shelf life*: permanent.

## Why Students Fail
The dominant failure omits a genuine branch of the dependency tree from the chain-rule sum: since a learner working quickly may fixate on the FIRST intermediate variable's contribution (say, the $x$-path) and treat the computation as complete once that single term is found, the SECOND intermediate variable's contribution (the $y$-path) is silently dropped, producing a formula that is mathematically incomplete — missing a genuine source of $z$'s change — rather than merely imprecise (MC-1, DEPENDENCY-TREE-PATH-OMITTED-FROM-CHAIN-RULE-SUM) — a Type 5 instruction-induced gap, since the formula's own additive structure is easy to under-apply if the dependency tree is not drawn out explicitly as a required first step before any computation begins. A second, distinct failure carries forward total-derivative ($d/dt$-style) notation into a genuinely multi-variable-input scenario, writing $\frac{dz}{ds}$ as if $s$ were the ONLY variable $x$ and $y$ depended on — when in fact $x$ and $y$ each depend on BOTH $s$ AND $t$, so every derivative in the formula must be a PARTIAL derivative (holding the other final variable fixed), never a total derivative (MC-2, TOTAL-DERIVATIVE-NOTATION-MIXED-IN-WHEN-MULTIPLE-INPUT-VARIABLES-EXIST) — a Type 4 notation-induced gap, since the visual similarity between $d/dt$ and $\partial/\partial t$ notation obscures a genuine structural difference in what each notation is entitled to assume about how many variables are actually varying.

## Misconceptions
Reused by reference from the Blueprint's Component 6 registry (MC-1, MC-2) and its own repair actions B01–B02. **The Blueprint's Misconception Registry carries a Severity column (both "Foundational") but no explicit birth-type column**; both classifications below are independently assigned here.

- **MC-1 — DEPENDENCY-TREE-PATH-OMITTED-FROM-CHAIN-RULE-SUM** (the Blueprint's own "Foundational" misconception)
  - **Birth type**: Type 5, instruction-induced. The chain rule's additive, multi-term structure is easy to under-apply when the dependency tree is not drawn out as an explicit, required first step — a learner working directly from the formula without the visual aid can plausibly stop after finding just one contributing term.
  - **Characteristic phrase**: computing only $\frac{\partial z}{\partial x}\frac{dx}{dt}$ as the "final answer" for $\frac{dz}{dt}$, omitting the $y$-path term entirely.
  - **Detection probe** (Blueprint's A01 hook): check whether every path in the dependency tree is included in the sum.
  - **Repair**: Blueprint Repair Action B01 — re-draw the dependency tree explicitly, confirming every branch is represented as a term.
  - **Verification of death**: given a fresh multivariable chain-rule problem, the learner draws the dependency tree BEFORE writing any formula, and includes a term for every branch shown.

- **MC-2 — TOTAL-DERIVATIVE-NOTATION-MIXED-IN-WHEN-MULTIPLE-INPUT-VARIABLES-EXIST** (the Blueprint's own "Foundational" misconception)
  - **Birth type**: Type 4, notation-induced. The visual similarity between $d/dt$ and $\partial/\partial t$ notation obscures the genuine structural requirement — that $\partial$ must be used exclusively once an intermediate variable depends on MORE than one final variable, since holding the other final variable fixed is now a meaningful, necessary operation.
  - **Characteristic phrase**: writing $\frac{dz}{ds}$ (total-derivative notation) for a scenario where $z$'s intermediate variables $x,y$ each depend on BOTH $s$ and $t$.
  - **Detection probe** (Blueprint's A03 hook): this directly targets MC-2 (mixing total-derivative notation into a genuinely multi-variable-input scenario).
  - **Repair**: Blueprint Repair Action B02 — re-identify how many variables each intermediate function genuinely depends on, switching to partial-derivative notation throughout.
  - **Verification of death**: given a fresh scenario where intermediate variables depend on two or more final variables, the learner uses partial-derivative notation exclusively, without lapsing into total-derivative notation anywhere.

## Analogies
- **Best — tracing every possible route on a subway map from a starting station to a destination.** If a subway line splits into two branches that later both reach the destination, the total number of ways to travel must account for BOTH branches, not just the first one noticed — exactly like summing every path in the dependency tree.
- **Alternative — a company's total revenue depending on sales through TWO separate stores.** If total revenue depends on sales at Store A and Store B, and both stores' sales in turn depend on the season, then revenue's total rate of change with the season must add BOTH stores' contributions — omitting one store's contribution would understate the true total.
- **ANTI-ANALOGY — "the chain rule for several variables just means picking whichever path looks most direct."** This phrasing licenses MC-1 directly, implying only one path needs tracing, when EVERY path from the dependent variable down to the final variable must contribute a term. Say "every branch of the dependency tree contributes — the total rate of change is the SUM of all of them, never just the most obvious one" instead.

## Demonstrations
- **The missing-branch catch.** For $z=x^2y$, $x=t^2$, $y=t^3$, compute ONLY the $x$-path contribution $\frac{\partial z}{\partial x}\frac{dx}{dt}$ and present it as a complete answer for $\frac{dz}{dt}$. *Predict, before checking against direct substitution, whether this single-term answer will match the true rate.* Getting a WRONG answer (compared against Example 2's direct-substitution check) is the demonstration for MC-1.
- **The direct-substitution verification.** For the same functions, substitute $x=t^2,y=t^3$ directly into $z=x^2y$ BEFORE differentiating, getting $z=t^7$ and $\frac{dz}{dt}=7t^6$. *Predict, before substituting, whether this direct approach will match the full two-term chain-rule sum.* Confirming agreement (both give $7t^6$) validates that BOTH terms were genuinely needed.
- **The notation-switch check.** For $z=x^2+y^2$, $x=s+t$, $y=s-t$, attempt to write $\frac{dz}{ds}$ using total-derivative notation, then contrast with the correct $\frac{\partial z}{\partial s}$. *Predict, before checking, whether $s$ is the ONLY variable $x$ and $y$ depend on.* Recognizing that $x$ and $y$ ALSO depend on $t$ is the demonstration for MC-2 — total-derivative notation would falsely imply $s$ is the sole input.

## Discovery Questions
Direct instruction is the argued call for the dependency-tree construction method itself (a specific diagrammatic tool best introduced explicitly), but the missing-branch consequence (MC-1) and the notation-switch requirement (MC-2) are both genuinely discoverable by direct trial.
1. **Need** — "Compute $\frac{dz}{dt}$ for $z=x^2y$, $x=t^2$, $y=t^3$ using ONLY the $x$-path term. Now compute it by direct substitution. Do they match?" They do not.
2. **Playground** — try the same single-term-versus-direct-substitution comparison on a couple more functions.
3. **Invention** — "Why does leaving out the $y$-path term produce a wrong answer?" Let the learner connect it to $y$ ALSO changing as $t$ changes, contributing its own share of $z$'s total change.
4. **Collision** — confront a learner who computed only one term with the direct mismatch against substitution.
5. **Formalisation** — state the rule precisely: sum a term for EVERY path in the dependency tree, from $z$ down to the final variable.
6. **Compression** — "Every branch contributes — sum them all, never just the first one you see."

## Teaching Sequence
The dependency-tree-and-sum-every-path discipline (MC-1) must be established FIRST via the single-intermediate-variable case (per the Blueprint's own A01), since it is the simpler setting in which the "missing branch" consequence is most vividly demonstrated. The direct-substitution verification (per the Blueprint's own A02) follows immediately as a sanity-check habit, reinforcing that the chain rule's full sum genuinely matches an independently-computed answer. The two-final-variable case and its notation requirement (MC-2, per the Blueprint's own A03) is introduced LAST, once the single-variable dependency-tree discipline is fluent, since the notation switch is a refinement of an already-understood path-summing structure rather than a new conceptual foundation. Turn-level scripts for A01–A04 are owned by the Blueprint's Component 5 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the dependency-tree construction (Example 1), explicitly drawing both branches BEFORE writing any formula, then computing each term. First action; anchors the sum-every-path discipline concretely.
- **TEST-THINKING: Error Analysis** — "A student computed $\frac{dz}{dt}$ using only the $x$-path term from the dependency tree. What's missing?" targets MC-1 directly.
- **DO: Demonstration** — the direct-substitution verification (Example 2), cross-checking the full chain-rule sum against an independently-computed answer.
- **TEST-THINKING: Prediction** — "If $x$ and $y$ both depend on $s$ AND $t$, should $\frac{\partial z}{\partial s}$ use total-derivative or partial-derivative notation?" asked BEFORE working Example 3. Surfaces MC-2 in one turn.
- **Does NOT fit: implicit differentiation in several variables as an independent topic, or the full Jacobian-matrix formulation of the multivariable chain rule, here.** Those extensions belong to more advanced treatments not yet present in this KG.

## Voice Teaching Notes
The load-bearing sentence is "draw every branch of the dependency tree first — the total rate of change sums ALL of them, never just the one you notice first." Say it every time a new multivariable chain-rule problem is set up, not just the first. Listen for a learner who writes down a formula with only ONE term when the dependency structure clearly has two or more branches — that specific omission is the tell for MC-1. Listen for a learner who writes $d/ds$ notation for a variable that genuinely depends on both $s$ and $t$ — that specific notation choice is the tell for MC-2. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Computes only one term of the chain-rule sum, omitting a genuine branch of the dependency tree** — MC-1. Route to the missing-branch catch, on the exact functions in question.
- **Uses total-derivative ($d/dt$-style) notation for a variable that genuinely depends on multiple final variables** — MC-2. Route to the notation-switch check, on the exact scenario in question.
- **Correctly draws the full dependency tree, sums every branch's contribution, and uses partial-derivative notation consistently whenever multiple final variables are in play** — the intended target state.
- **Mastery trigger**: the Blueprint's A04 gate, MAMR 4/5 (⌈0.75×5⌉=4). The 4-item P77 set plus the P76 transfer probe (the weather-balloon pressure-tracking problem) must include at least one item requiring the learner to explain WHY every branch of the dependency tree must contribute a term, not merely execute a given chain-rule computation mechanically — a gate made only of correct-computation items risks certifying mechanics without certifying the conceptual discrimination against MC-1.

## Tutor Recovery Strategy
The likely utterance here is "I found the derivative through x — isn't that the whole answer?" — a reasonable-sounding shortcut if the dependency structure is not visualized explicitly. The concept-specific smaller question returns to a direct dependency check: **"Does $z$ depend on ONLY $x$, or does it also depend on $y$? And does $y$ also change as $t$ changes?"** The learner traces the dependencies and confirms $y$ is ALSO a genuine path from $z$ to $t$. Then return: "since $y$ also changes as $t$ changes, and $z$ depends on $y$ too, that path contributes its OWN share of $z$'s total change — leaving it out understates the true rate." If the frustration is instead about the notation switch, shrink to the bare check: **"Does $x$ depend on ONLY $s$, or does it also depend on $t$?"** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **procedure with an embedded completeness-verification requirement** (drawing and fully accounting for every branch of the dependency tree is the single most load-bearing discipline in this concept, not an optional visual aid). Review by *requiring the learner to draw the dependency tree explicitly and count the number of branches BEFORE writing any formula, then confirm the formula has exactly that many terms*, never accepting a correctly-computed final answer alone as evidence of understanding, since a learner can occasionally reach a correct-looking result through a coincidental cancellation while having genuinely omitted a branch.
- Concept-specific deviation: keep at least one review item with THREE or more intermediate variables (not just the standard two), so the completeness-verification habit against MC-1 generalizes beyond the most commonly drilled two-branch case.
- Interleaving partners: `math.calc.chain-rule` (the discriminating partner — reviewing the single-variable chain rule alongside this concept keeps the "this IS the same idea, generalized to multiple paths" connection explicit) and `math.calc.partial-derivatives`, whose own freeze-the-other-variable computations this concept's individual terms directly reuse.

## Transfer Connections
- **Near**: `math.calc.chain-rule` (the single-variable rule this concept directly generalizes).
- **Far**: implicit differentiation in several variables and related-rates problems with multiple interacting quantities — both extend the same dependency-tree-and-sum-every-path logic to related but structurally different problem types.
- **Real-world**: the Blueprint's own transfer probe — a weather balloon's pressure experienced as it drifts through a pressure field $P(x,y)$ — is a direct, literal meteorological application of the chain rule avoiding the need to substitute the balloon's full trajectory directly into $P$.
- **Expert transfer**: recognizing that a "sum over every path in a dependency structure" principle recurs well beyond this specific formula — the same logic underlies backpropagation in neural networks, where a gradient's total value sums contributions flowing through every computational path from output back to a given parameter.

## Cross-Subject Connections
- **Meteorology**, real: the Blueprint's own transfer probe (a weather balloon's experienced pressure change while drifting through a pressure field) is a standard, literal application in atmospheric science.
- **Robotics**, real: tracking how a robot's measured quantity (e.g. sensor reading) changes as the robot moves through a field of values that itself varies with position is a direct application of this exact chain-rule structure.
- **Machine learning**, real: backpropagation, the algorithm training neural networks, is fundamentally a repeated, systematic application of the multivariable chain rule's "sum over every path" principle through a network's layered computational graph.
- No genuine KG cross_link exists for this concept.

## Blueprint References
`docs/curriculum/blueprints/math.calc.chain-rule-multivariable.md`. Reused by reference, not restated: the Component 1 Learning Objectives, the Component 4 Worked Examples (Example 1 the single-variable-case dependency tree breaking MC-1, Example 2 the direct-substitution verification, Example 3 the two-variable case breaking MC-2), the Component 5 Teaching Actions (A01 P64 conceptual shift, A02 reused procedure, A03 P06 contrast pair, A04 P91 mastery gate at MAMR 4/5), the Component 6 Misconception Registry (MC-1, MC-2) and repair actions (B01, B02), the four-item P77 problem set, and the P76 independence-mode transfer probe (the weather-balloon pressure-tracking problem). This entry adds independent birth-type classification for both misconceptions (the Blueprint marks severities but assigns no birth type), the mental-model ladder, the anti-analogy, and the argued direct-instruction-for-the-dependency-tree-method / guided-discovery-for-the-missing-branch-and-notation-switch split.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
No Blueprint/KG metadata discrepancy was found for this concept — the Blueprint's stated requires (`math.calc.partial-derivatives`, `math.calc.chain-rule`), unlocks (none), cross_links (none), difficulty (advanced), bloom (apply), mastery_threshold (0.75), and estimated_hours (5) all match the live KG's own fields exactly, confirmed by direct query. This is the second of four zero-discrepancy concepts in this batch, continuing the streak restarted in Batch 43 after Batch 42's `arc-length` broke the prior five-consecutive-zero run.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 47).
