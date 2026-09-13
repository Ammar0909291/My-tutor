# math.calc.multivariable-intro

## Identity
- **KG ID**: `math.calc.multivariable-intro`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.derivative-definition` — load-bearing part: the 1D limit machinery (left/right agreement) and the secant-to-tangent intuition are transferred by analogy to the 2D setting, where "all paths" replaces "left and right."
  - `math.geom.vectors-3d` — load-bearing part: 3D coordinates are needed to understand a two-variable function's graph as a surface in $\mathbb{R}^3$.
- **Unlocks**: `math.calc.partial-derivatives`.
- **Cross-links**: none in the KG.
- **Difficulty**: advanced
- **Bloom level**: understand
- **Mastery threshold**: 0.8 (MAMR = ⌈0.8×5⌉ = 4/5)
- **Estimated hours**: 5
- **Blueprint**: `docs/curriculum/blueprints/math.calc.multivariable-intro.md` (reused by reference throughout)

## Learning Objective
- The learner can describe a two-variable function $f:D\subseteq\mathbb{R}^2\to\mathbb{R}$ correctly: its DOMAIN is a REGION in $\mathbb{R}^2$ (not an interval), its GRAPH is a SURFACE in $\mathbb{R}^3$, and its LEVEL CURVES $f(x,y)=c$ are the surface's planar "slices."
- The learner can determine whether a given equation in $x,y,z$ defines $z$ as a function of $(x,y)$, using the vertical-line test's 2D analogue, and distinguish it from a surface that is not everywhere a function (like a full sphere).
- The learner can recognize that a 2-variable limit requires the SAME value along EVERY path approaching a point (infinitely many, not just two directions), and can distinguish limits that exist (proved by an analytic bound/squeeze) from limits that fail (disproved by exhibiting two paths giving different values).

## Core Understanding
Every new difficulty in this concept traces to a single root cause: the domain has gone from a 1D interval (approached from only two directions, left and right) to a 2D region (approachable from infinitely many directions and curves). A function $f(x,y)$ takes a PAIR of inputs and returns one number; its domain $D$ is therefore a REGION in the plane (a disk, a half-plane, and so on — described by inequalities in BOTH $x$ and $y$, never a bare interval in $x$ alone), its graph $\{(x,y,z):z=f(x,y)\}$ is a SURFACE in $\mathbb{R}^3$, and slicing that surface at a fixed height $c$ gives a LEVEL CURVE $f(x,y)=c$ in the plane — closer-together level curves on a contour map mean the surface rises more steeply there. Not every equation relating $x,y,z$ defines $z$ as a function of $(x,y)$: the test is whether a vertical line through each point of the domain meets the surface exactly once — a full sphere $x^2+y^2+z^2=1$ fails this at every interior point (two $z$-values for one $(x,y)$), while its upper hemisphere alone passes. This same dimensionality jump is what makes 2-variable limits genuinely harder than 1-variable ones: a 1D limit exists once left and right agree (only 2 directions to check), but a 2D limit requires agreement along ALL paths approaching the point — infinitely many lines, parabolas, spirals, and more. This asymmetry gives path-testing two very different powers: exhibiting just ONE pair of disagreeing paths is decisive PROOF that a limit does NOT exist, but no finite number of agreeing paths can ever PROVE that a limit DOES exist (there is always another untried path); existence must instead be established analytically, typically by bounding the expression and applying the squeeze theorem.

## Mental Models
1. **Beginner — "a function of two variables is just like a function of one variable, but with an extra input."** The domain is still pictured as an interval-like object, and limits are checked the same way as in 1D (perhaps trying one or two convenient substitutions). *Upgrade trigger*: being asked to write the domain of $f(x,y)=\sqrt{4-x^2-y^2}$ and defaulting to an inequality in $x$ alone, missing that $y$ must be constrained too.
2. **Intermediate — "the domain is a 2D region, the graph is a 3D surface, and level curves are the useful cross-sections — but checking a limit along one or two paths should be enough, like in 1D."** The structural vocabulary (domain/graph/level curve) is now correct, but the limit-checking procedure has not yet been updated for the dimensionality jump. *Upgrade trigger*: testing a limit along two DIFFERENT paths and getting two DIFFERENT values, with no framework yet for what that means.
3. **Advanced — "a 2D limit needs agreement along EVERY path, not just one or two; disagreeing paths PROVE non-existence, but agreeing paths never PROVE existence — that takes an analytic bound."** The path-testing asymmetry is now explicit and correctly applied in both directions (disproof versus proof). *Upgrade trigger*: needing to find the ACTUAL rate of change of a two-variable function, discovering there is no single "the derivative" — only direction-dependent rates.
4. **Expert — multivariable calculus generalizes the entire single-variable toolkit (limits, continuity, and eventually derivatives and integrals) to functions of several variables, with each generalization following the SAME pattern: replace "the two directions on a line" with "all directions and curves in the higher-dimensional domain."** The learner anticipates this generalization pattern before being taught each specific extension. *Shelf life*: permanent.

## Why Students Fail
The dominant failure carries the 1D limit-checking habit forward unmodified: since checking left and right (exactly two directions) is SUFFICIENT to establish a 1D limit, a learner tests one or two convenient paths in 2D (often the coordinate axes), finds they agree, and concludes the limit exists — never realizing that infinitely many OTHER paths remain untested, and that a limit like $\frac{xy}{x^2+y^2}$ can agree along the axes (both giving 0) while disagreeing along a different line entirely (MC-1, SINGLE-PATH-LIMIT) — a Type 1 overgeneralization of the correct, sufficient 1D procedure extended into a setting where it is no longer sufficient. A second, distinct failure assumes any equation relating $x$, $y$, and $z$ automatically defines $z$ as a function of $(x,y)$, simply because it is an equation involving all three variables — missing that some such equations, like a full sphere, assign TWO different $z$-values to a single $(x,y)$ pair, failing the vertical-line-test analogue entirely (MC-2, EVERY-SURFACE-IS-FUNCTION) — a Type 1 overgeneralization from the many familiar equations (like $z=x^2+y^2$) that genuinely ARE functions, extended to equations that are not. A third failure writes a two-variable function's domain the same way a one-variable function's domain would be written — as a constraint on $x$ alone, ignoring that $y$ must be constrained too, since the domain of $f(x,y)$ is fundamentally a 2D region rather than a 1D interval (MC-3, DOMAIN-IS-INTERVAL) — again a Type 1 overgeneralization, this time of the domain-finding PROCEDURE itself rather than the limit-checking procedure.

## Misconceptions
Reused by reference from the Blueprint's Component 2 registry (MC-1, MC-2, MC-3) and its own repair sequences B-MC1–B-MC3. **The Blueprint's Misconception Registry designates MC-1 as the single "Foundational" misconception but carries no explicit birth-type column**; all three classifications below are independently assigned here.

- **MC-1 — SINGLE-PATH-LIMIT** (the Blueprint's own designated "Foundational" misconception)
  - **Birth type**: Type 1, overgeneralization. The 1D procedure of checking left and right (exactly two directions) is genuinely sufficient in 1D; extending "check a couple of directions and conclude" into 2D, where infinitely many paths exist, is the overgeneralization.
  - **Characteristic phrase**: "I tried $x=0$ and $y=0$ and both gave 0, so the limit is 0."
  - **Detection probe** (Blueprint's A02 P49 checkpoint): given $f(x,y)=\frac{xy}{x^2+y^2}$, test along $y=0$ and $y=x$ — the two paths give different values.
  - **Repair**: Blueprint Repair Sequence B-MC1 — re-anchor on "path-testing is a disproof tool only; one disagreeing pair proves non-existence, but no finite collection of agreeing paths proves existence — that needs an algebraic continuity argument or an analytic bound."
  - **Verification of death**: given a fresh 2-variable limit, the learner either exhibits two disagreeing paths to disprove existence, or provides an analytic bound (squeeze argument) to prove it — never concludes existence from agreeing paths alone.

- **MC-2 — EVERY-SURFACE-IS-FUNCTION** (unranked by the Blueprint beyond its registry entry)
  - **Birth type**: Type 1, overgeneralization. Most equations encountered in a function-focused course (like $z=x^2+y^2$) genuinely ARE functions of $(x,y)$; the pattern "an equation in $x,y,z$ defines $z=f(x,y)$" is extended to equations, like a full sphere, where it fails.
  - **Characteristic phrase**: treating $x^2+y^2+z^2=1$ as directly defining a function $z=f(x,y)$ without checking whether each $(x,y)$ gives a unique $z$.
  - **Detection probe** (Blueprint's B-MC2 detector): at $(x,y)=(0,0)$, the sphere equation gives $z=+1$ or $z=-1$ — two different $z$-values for one input.
  - **Repair**: Blueprint Repair Sequence B-MC2 — re-anchor on the vertical-line-test analogue: for each $(x,y)$ in the domain, a vertical line through it must meet the surface in exactly one point for $z=f(x,y)$ to define a function there.
  - **Verification of death**: given a fresh implicit equation in $x,y,z$, the learner explicitly checks whether each $(x,y)$ yields a unique $z$ before treating the equation as a function.

- **MC-3 — DOMAIN-IS-INTERVAL** (unranked by the Blueprint beyond its registry entry)
  - **Birth type**: Type 1, overgeneralization. The 1D procedure "find the domain by writing an inequality in $x$" is extended directly into 2D without adjustment, producing a domain description that ignores $y$ entirely.
  - **Characteristic phrase**: writing the domain of $f(x,y)=\sqrt{4-x^2-y^2}$ as "$x\geq0$" or a bare interval in $x$, rather than as a region in $\mathbb{R}^2$.
  - **Detection probe** (Blueprint's B-MC3 detector): the constraint $4-x^2-y^2\geq0$ describes a DISK, $x^2+y^2\leq4$ — an interval-only description misses points like $(1,\sqrt3)$ that satisfy it.
  - **Repair**: Blueprint Repair Sequence B-MC3 — re-anchor on describing the domain as a set of PAIRS, $\{(x,y):\text{condition}\}$, and drawing the region before writing it algebraically.
  - **Verification of death**: given a fresh two-variable function, the learner writes its domain as an explicit region in $\mathbb{R}^2$ (naming the shape — disk, half-plane, and so on) rather than as a constraint on a single variable.

## Analogies
- **Best — a mountain's contour map versus a single hiking trail's elevation profile.** A 1D elevation profile along one trail only shows rise and fall in ONE direction; a full contour map (the level curves of a 2D function) reveals the terrain's shape from EVERY direction at once — and a hiker approaching a summit from only two trails cannot be sure the terrain looks the same from a third, untried direction.
- **Alternative — checking a rumor from two sources versus checking it from everyone who might know.** Confirming a claim from just two people (like checking a limit along two axes) can never prove it's universally true; finding just ONE person who disagrees, however, is enough to disprove it — exactly the asymmetry between disproving and proving a 2D limit.
- **ANTI-ANALOGY — "checking a few paths and getting the same answer proves the limit."** This phrasing licenses MC-1 directly, implying that repeated agreement is sufficient evidence, when in fact only an analytic bound (or an algebraic continuity argument) can prove existence — agreement along even 100 paths leaves the 101st path unexamined. Say "agreeing paths are only SUGGESTIVE — proving a 2D limit needs an actual bound, not just more path-testing" instead.

## Demonstrations
- **The path-dependence failure.** For $f(x,y)=\frac{x^2-y^2}{x^2+y^2}$, test the limit as $(x,y)\to(0,0)$ along $y=0$ (giving 1) and along $x=0$ (giving $-1$). *Predict, before testing the second path, whether it will agree with the first.* Getting two DIFFERENT values is the demonstration for MC-1 — decisive proof the limit does not exist.
- **The vertical-line-test check.** At $(x,y)=(0,0)$ on the sphere $x^2+y^2+z^2=1$, solve for $z$ and find BOTH $z=+1$ and $z=-1$ satisfy the equation. *Predict, before solving, whether the sphere equation will give a unique $z$ at this point.* Finding two valid $z$-values is the demonstration for MC-2.
- **The region-versus-interval contrast.** For $f(x,y)=\sqrt{4-x^2-y^2}$, write the domain first as "$x\geq0$" (the interval-habit answer) and then correctly as $\{(x,y):x^2+y^2\leq4\}$, checking whether the point $(1,\sqrt3)$ belongs to each description. *Predict, before checking, whether the interval-only description will correctly classify this point.* Finding the interval-only description WRONGLY excludes valid domain points is the demonstration for MC-3.

## Discovery Questions
Direct instruction is the argued call for the formal vocabulary itself (domain/graph/level curve, best introduced explicitly per the Blueprint's own Concrete-Pictorial-Abstract sequence), but the path-dependence limitation (MC-1) and the vertical-line-test check (MC-2) are both genuinely discoverable by direct trial.
1. **Need** — "Test $\lim_{(x,y)\to(0,0)}\frac{x^2-y^2}{x^2+y^2}$ along $y=0$. Now test it along $x=0$. Do they agree?" They do not.
2. **Playground** — try testing a couple more 2-variable limits along several different paths (axes, then $y=x$).
3. **Invention** — "Why does checking left and right always work in 1D, but checking two paths isn't enough in 2D?" Let the learner connect it to the number of directions available in each dimension.
4. **Collision** — confront a learner who concluded a limit exists from agreeing axis-paths with a THIRD path (like $y=x$) that disagrees.
5. **Formalisation** — state the definition precisely: a 2D limit exists only if the SAME value is approached along EVERY possible path.
6. **Compression** — "One disagreeing path disproves it. No number of agreeing paths proves it."

## Teaching Sequence
The structural vocabulary (domain as a 2D region, graph as a surface, level curve as a slice — Blueprint's own A01) must be established FIRST, since the path-dependence limit concept (A02) depends on already picturing the domain as a genuinely 2D object with infinitely many approach directions, not a 1D interval with only two. The vertical-line-test discrimination (MC-2, folded into A01) is addressed alongside the vocabulary since it is a direct consequence of the function-versus-surface distinction. The single-variable-versus-multivariable contrast (Blueprint's own A03) is placed LAST, once both the vocabulary and the limit concept are fluent, so the comparison table can meaningfully summarize genuinely-understood differences rather than introduce them for the first time. Turn-level scripts for A01–A04 are owned by the Blueprint's Component 4 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — evaluate $f(x,y)=x^2+y^2$ at four specific points (Blueprint's Stage C), establishing the pair-input/single-output structure concretely. First action; anchors the domain-as-2D-region concept before any limit discussion.
- **TEST-THINKING: Prediction** — "Will testing this limit along $y=0$ and $y=x$ give the same value?" asked BEFORE working the path-dependence failure example. Surfaces MC-1 in one turn.
- **DO: Demonstration** — the vertical-line-test check on the sphere equation, with the learner solving for $z$ at a specific $(x,y)$ and finding two valid values.
- **TEST-THINKING: Error Analysis** — "A student wrote the domain of $f(x,y)=\sqrt{4-x^2-y^2}$ as $x\geq0$. What's missing?" targets MC-3 directly.
- **Does NOT fit: partial derivatives, directional derivatives, or the gradient vector, here.** This concept establishes the domain/graph/limit/continuity vocabulary only; the rate-of-change machinery for multivariable functions belongs to `math.calc.partial-derivatives`, which this concept unlocks.

## Voice Teaching Notes
The load-bearing sentence is "in 2D, a limit must agree along EVERY path, not just the ones you happen to try — one disagreeing path is proof it fails, but agreeing paths never prove it holds." Say it every time a new 2-variable limit is set up, not just the first. Listen for a learner who tests only the two coordinate axes and immediately declares the limit exists — that specific shortcut is the tell for MC-1. Listen for a learner who writes a domain constraint mentioning only $x$ (or only $y$) for a genuinely two-variable function — that specific omission is the tell for MC-3. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Concludes a 2-variable limit exists after testing only one or two paths, without an analytic bound** — MC-1. Route to the path-dependence failure demonstration, on the exact function in question.
- **Treats an implicit equation in $x,y,z$ as automatically defining $z=f(x,y)$ without checking uniqueness** — MC-2. Route to the vertical-line-test check, on the exact equation in question.
- **Writes a two-variable function's domain as a constraint on one variable alone** — MC-3. Route to the region-versus-interval contrast, on the exact function in question.
- **Correctly identifies the domain as a 2D region, tests limits along multiple paths while recognizing agreement never proves existence, and applies the vertical-line-test analogue before calling an equation a function** — the intended target state.
- **Mastery trigger**: the Blueprint's A04 gate, MAMR 4/5 (⌈0.8×5⌉=4). The P77 4-item problem set plus the P76 transfer probe (the $f$-versus-$g$ path-testing-and-bounding comparison) must include at least one item requiring the learner to explain WHY path-testing alone cannot prove existence, not merely compute a limit along a given path — a gate made only of correct-path-evaluation items risks certifying mechanics without certifying the conceptual discrimination against MC-1.

## Tutor Recovery Strategy
The likely utterance here is "I tried a couple of paths and they all gave the same answer — isn't that enough to say the limit exists?" — a reasonable question given that agreement along several paths does feel like strong evidence. The concept-specific smaller question returns to a direct third-path check: **"You tried $y=0$ and $y=x$. Now try $y=x^2$ (or another curve). Does it still agree?"** The learner tests the new path themselves and, in many canonical examples, finds it either agrees (leaving the question open) or disagrees (settling it). Then return: "even if it agrees again, there are still infinitely many paths you haven't tried — that's exactly why path-agreement alone can never PROVE a limit exists. Only a bound can do that." If the frustration is instead about the domain-as-region idea, shrink to the bare check: **"Is the input to this function ONE number, or a PAIR of numbers?"** Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **conceptual framework with an embedded proof-asymmetry requirement** (the "disproof by one path, proof only by a bound" asymmetry is the single most load-bearing idea in this concept, not a computational step, and must be actively applied, not merely recited). Review by *requiring the learner to state, for any given 2-variable limit problem, whether they are attempting to DISPROVE it (one disagreeing path suffices) or PROVE it (a bound is needed) before starting any computation*, never accepting a correct final verdict alone as evidence of understanding, since a learner can occasionally guess correctly which of the two the problem calls for without grasping the underlying asymmetry.
- Concept-specific deviation: keep at least one review item requiring an analytic bound to PROVE a limit exists (not just a path-disproof), so the harder, less-intuitive half of the asymmetry stays exercised.
- Interleaving partners: `math.calc.derivative-definition` (the discriminating partner — reviewing the 1D limit's "left and right agree" criterion alongside this concept's 2D "all paths agree" criterion keeps the dimensionality-jump connection explicit) and `math.calc.partial-derivatives`, which this concept directly unlocks by setting up the domain/surface/level-curve vocabulary that direction-dependent rates of change require.

## Transfer Connections
- **Near**: `math.calc.partial-derivatives` (the direct extension this concept unlocks — direction-dependent rates of change, replacing the single derivative $f'(x)$ with $\partial f/\partial x$ and $\partial f/\partial y$).
- **Far**: proof by exhibiting a counterexample versus proof by a general bounding argument — the same "one disproving instance suffices; proving requires a general argument" asymmetry recurs throughout mathematics, not specific to multivariable limits.
- **Real-world**: contour maps of real terrain (elevation as a two-variable function of geographic position) are a direct, literal application of the level-curve concept developed here.
- **Expert transfer**: recognizing that generalizing a familiar 1D concept to higher dimensions typically requires re-examining EVERY step of the original definition for hidden assumptions about "only two directions" — a habit of mind that recurs when generalizing limits, derivatives, and integrals to three or more variables.

## Cross-Subject Connections
- **Geography/cartography**, real: topographic contour maps are literal level curves of the elevation function, and reading them (closer lines mean steeper terrain) is exactly the level-curve interpretation skill this concept develops.
- **Economics**, real: production functions of two inputs (e.g. labor and capital) and their isoquants (constant-output curves) are a direct application of the level-curve concept to a different two-variable function.
- **Physics**, real: temperature or pressure fields over a 2D region, and their isotherms/isobars, are level curves of a genuine two-variable function, with path-dependence questions arising naturally when studying heat flow near a singular point.
- No genuine KG cross_link exists for this concept.

## Blueprint References
`docs/curriculum/blueprints/math.calc.multivariable-intro.md`. Reused by reference, not restated: the Component 1 Cognitive Map (prior-knowledge anchors, target knowledge state, conceptual obstacles), the Component 4 Teaching Actions (A01 P11 representation shift covering functions of two variables and the vertical-line test, A02 P03 analogy bridge covering path-dependence and the squeeze technique, A03 P06 contrast pair covering single- vs. multivariable structure, A04 P91 mastery gate at MAMR 4/5), the Component 2 Misconception Registry (MC-1, MC-2, MC-3), the Component 5 Repair Sequences (B-MC1, B-MC2, B-MC3), the Component 6 Spaced Repetition Schedule, the P77 4-item problem set, and the P76 independence-mode transfer probe (the $f$-versus-$g$ comparison distinguishing provable from disprovable limits). This entry adds independent birth-type classification for all three misconceptions (the Blueprint designates only MC-1 as Foundational, with no birth-type column at all), the mental-model ladder, the anti-analogy, and the argued direct-instruction-for-the-vocabulary / guided-discovery-for-the-path-dependence-and-vertical-line-test split.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
No Blueprint/KG metadata discrepancy was found for this concept — the Blueprint's stated requires (`math.calc.derivative-definition`, `math.geom.vectors-3d`), unlocks (`math.calc.partial-derivatives`), cross_links (none), difficulty (advanced), bloom (understand), mastery_threshold (0.8), and estimated_hours (5) all match the live KG's own fields exactly, confirmed by direct query. This is the fourth of four zero-discrepancy concepts in this batch, continuing the streak restarted in Batch 43 after Batch 42's `arc-length` broke the prior five-consecutive-zero run — making Batch 45 the third consecutive all-4-zero-discrepancy batch.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 45).
