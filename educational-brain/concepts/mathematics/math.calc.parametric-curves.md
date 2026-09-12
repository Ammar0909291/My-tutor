# math.calc.parametric-curves

## Identity
- **KG ID**: `math.calc.parametric-curves`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.func.function-concept` — load-bearing part: the vertical line test and the definition of a function ("exactly one output per input"), which parametric curves are shown to genuinely GENERALIZE beyond — a circle traced parametrically is not the graph of any such function.
  - `math.geom.coordinate-plane` — load-bearing part: the (x,y) plane on which parametric curves are plotted; without it there is nowhere to put the points a parametrization generates.
- **Unlocks**: `math.calc.parametric-calculus` (differentiating/integrating parametric curves via $dy/dx=(dy/dt)/(dx/dt)$ and arc length, building directly on the tracing-direction and elimination concepts developed here)
- **Cross-links**: none in the KG (`P76_mode=independence`, per the Blueprint).
- **Difficulty**: advanced
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 6
- **Blueprint**: `docs/curriculum/blueprints/math.calc.parametric-curves.md` (reused by reference throughout)

## Learning Objective
- The learner can plot a parametric curve $x=f(t), y=g(t)$ by computing $(x,y)$ pairs at several $t$-values and connecting them IN ORDER of increasing $t$, tracking the direction of travel as part of the answer, not just the resulting shape.
- The learner can correctly recognize that a parametric curve can trace a shape (a full circle, for instance) that fails the vertical line test and is therefore NOT the graph of any function $y=f(x)$, even though it is a perfectly well-defined curve.
- The learner can eliminate the parameter to obtain a Cartesian equation, and can state explicitly what information (direction of travel, and any restricted $t$-range) that elimination discards.
- The learner can distinguish "the same curve, differently parametrized" from "genuinely different curves," using direction and speed of tracing as the discriminating evidence.

## Core Understanding
A parametric curve is a PATH, not merely a shape: $x=f(t)$ and $y=g(t)$ together describe where a point is located at "time" $t$, and plotting the resulting $(x,y)$ points IN THE ORDER $t$ visits them traces out a trajectory with a direction of travel built in, exactly like a moving particle's path. This is the concept's entire reason for existing: some curves — the canonical example is the full circle $x=\cos t, y=\sin t$ — cannot be written as $y=f(x)$ for any function $f$, because they fail the vertical line test (a vertical line at $x=0.5$ crosses the unit circle twice), yet they are perfectly well-defined and plottable once a third variable is introduced. Parametric curves are therefore strictly MORE general than function graphs: every function graph $y=f(x)$ can be trivially parametrized ($x=t, y=f(t)$), but not every parametric curve is a function graph. "Eliminating the parameter" — solving one equation for $t$ and substituting into the other to recover a Cartesian $(x,y)$-only equation — recovers the SHAPE traced, but always risks losing two things a bare shape does not carry: the DIRECTION of travel (two different parametrizations can trace the identical shape in opposite directions) and any RESTRICTION on the $t$-range (a parametrization confined to $t\in[0,\pi]$ might trace only half a circle, while its eliminated equation $x^2+y^2=1$ describes the full circle with no memory of that restriction).

## Mental Models
1. **Beginner — plot the points, connect the dots.** Compute a table of $(t,x,y)$ values and connect the resulting points to see the shape. *Upgrade trigger*: two parametrizations producing the identical set of points but visited in a different order — "connect the dots" alone cannot distinguish them. *Shelf life*: about one lesson.
2. **Intermediate — a path with a direction, not just a shape.** The curve is traced IN ORDER as $t$ increases, and that order (direction, starting point, ending point) is part of what the parametrization specifies, not an afterthought. *Upgrade trigger*: needing to explain why a circle isn't a function graph — direction-tracking alone doesn't resolve this.
3. **Advanced — parametric curves generalize function graphs, they don't disguise them.** Every $y=f(x)$ is trivially a parametric curve ($x=t,y=f(t)$), but the reverse fails: a parametric curve need only pass the vertical line test IF it happens to correspond to a function; most interesting ones (circles, spirals, figure-eights) do not. *Upgrade trigger*: needing to reason about what a Cartesian equation obtained by elimination does and does not preserve.
4. **Expert — a parametrization is a map from an interval into the plane; a curve is an equivalence class under reparametrization.** Different $(f(t),g(t))$ pairs can trace an identical point-set at different speeds or in different directions; "the same curve" is a genuinely subtle notion once direction and speed are taken seriously, and it is exactly the object studied later in `math.calc.parametric-calculus` (velocity, arc length) and in differential geometry. *Shelf life*: permanent.

## Why Students Fail
The dominant failure is treating a parametric curve as nothing more than an alternate, slightly awkward NOTATION for an ordinary function or shape — a habit inherited from years of graphing where the resulting picture, not the order in which it was traced, was always the whole answer. This licenses skipping direction-tracking (a genuinely new fact this concept introduces) and licenses assuming, without checking, that the resulting shape must correspond to some function $y=f(x)$ — a perceptually reasonable but false assumption, since the formulas used to BUILD the parametrization ($\cos t$, $\sin t$) are themselves ordinary functions of $t$, and it is easy to conflate "built from functions" with "is itself a function of $x$." The third failure is procedural: the elimination step is taught and practiced as a clean, mechanical piece of algebra (solve for $t$, substitute, simplify), and that mechanical cleanliness makes it feel complete — nothing in the procedure itself flags that a $t$-range restriction or a direction has just been silently dropped, so the loss goes unnoticed until a discrepancy (like a semicircle turning into a full circle) forces the issue.

## Misconceptions
Reused by reference from the Blueprint's Component 2 registry (MC-1..MC-3) and its Component 5 repair actions B01–B03. **The Blueprint's Misconception Registry carries no explicit birth-type column**; all three classifications below are independently assigned here.

- **MC-1 — DIRECTION-OF-TRACING-IGNORED**
  - **Birth type**: Type 2, perceptual intuition. Plotted points, looked at as a picture, simply present a static shape — direction is not something the eye perceives from a finished plot the way it perceives from watching the plotting happen in real time, so a learner working from a completed sketch has no perceptual cue that direction was ever part of the information.
  - **Characteristic phrase**: asked whether $x=\cos t,y=\sin t$ and $x=\cos t,y=-\sin t$ are "the same curve," answering "yes, since they produce the exact same set of $(x,y)$ points."
  - **Detection probe** (verbatim, Blueprint's B01 P41): "$x=\cos t, y=\sin t$ and $x=\cos t, y=-\sin t$ both trace the unit circle. Are they the same parametric curve?"
  - **Repair**: Blueprint Repair Action B01 — check a SPECIFIC $t$-value, not the overall shape: at $t=\pi/2$, the first gives $(0,1)$, the second gives $(0,-1)$, a different point at the same $t$, meaning the two trace opposite rotational directions.
  - **Verification of death**: given a new pair of parametrizations of an identical shape (e.g. the Blueprint's P77 Problem 3, the segment from $(0,0)$ to $(1,1)$ via $x=t,y=t$ vs. $x=1-t,y=1-t$), the learner identifies them as tracing the same set of points in opposite directions, unprompted.

- **MC-2 — EVERY-PARAMETRIC-CURVE-IS-A-FUNCTION** (the Blueprint's own "Foundational Misconception")
  - **Birth type**: Type 1, overgeneralization of the function concept — a learner who has only ever met curves that turn out to be function graphs extends "curve" and "function" as interchangeable terms, missing that parametric notation was introduced specifically to escape that restriction.
  - **Characteristic phrase**: "the circle is expressed with cos and sin, and those are functions, so the circle must be a function too."
  - **Detection probe** (verbatim, Blueprint's B02 P41): "$x=\cos t, y=\sin t$ traces the unit circle. Is this circle the graph of a function $y=f(x)$?"
  - **Repair**: Blueprint Repair Action B02 — apply the vertical line test directly to the resulting SHAPE, not to the formulas that built it: at $x=0.5$, $x^2+y^2=1$ gives $y=\pm\sqrt{0.75}$, two $y$-values for one $x$, so the circle fails the test even though $\cos t$ and $\sin t$ are individually perfectly good functions of $t$.
  - **Verification of death**: given a new closed or self-intersecting parametric curve, the learner checks the vertical line test on the resulting shape (not the defining formulas) before concluding whether it is a function graph.

- **MC-3 — ELIMINATING-PARAMETER-LOSES-NOTHING**
  - **Birth type**: Type 5, instruction-induced. The elimination procedure (solve for $t$, substitute, simplify) is taught and drilled as a self-contained, mechanically complete algebraic task with a clean single "answer" at the end — nothing in how the procedure is normally practiced ever flags that direction or a $t$-range restriction has been silently discarded along the way.
  - **Characteristic phrase**: "$x^2+y^2=1$ is the complete, equivalent description" of a parametrization restricted to $t\in[0,\pi]$.
  - **Detection probe** (verbatim, Blueprint's B03 P41): "$x=\cos t, y=\sin t$ for $t\in[0,\pi]$ eliminates to $x^2+y^2=1$. Does this equation fully describe the original curve?"
  - **Repair**: Blueprint Repair Action B03 — check which part of the circle $t\in[0,\pi]$ actually traces (only the top half, since $\sin t\ge0$ throughout), against what $x^2+y^2=1$ alone describes (the full circle) — the restriction is lost unless kept alongside the equation (e.g. as $x^2+y^2=1, y\ge0$).
  - **Verification of death**: given a fresh restricted-$t$-range parametrization, the learner states which portion of the eliminated curve is actually traced and confirms the bare equation alone does not convey that restriction.

## Analogies
- **Best — a moving particle's path, recorded on video.** The video shows not just where the particle has been (the shape) but the ORDER it visited each spot and which way it was moving — exactly what a parametrization specifies and a bare Cartesian equation cannot recover.
- **Alternative — a treasure map with numbered footsteps.** Dots on a map show WHERE to walk; numbered footsteps additionally show in WHAT ORDER — the numbers are the parameter $t$, and erasing them (eliminating $t$) leaves only the shape of the path, exactly as elimination discards direction.
- **ANTI-ANALOGY — "a parametrization is just $y=f(x)$ written in a roundabout way."** This licenses MC-2 directly: it treats the parametric form as decorative notation for an ordinary function rather than a genuinely more general kind of object. Say "a parametrization can build things that are NOT functions at all, and the circle is the standing proof" instead.

## Demonstrations
- **The opposite-direction circle pair.** Compute $(x,y)$ at $t=\pi/2$ for both $x=\cos t,y=\sin t$ and $x=\cos t,y=-\sin t$ side by side. *Predict whether they'll match first.* The mismatch at one shared $t$-value, despite an identical eliminated equation, is the demonstration for MC-1.
- **The vertical-line-test collision.** Take $x=0.5$ on the traced circle and solve $x^2+y^2=1$ for $y$ directly, getting two values. *Predict how many $y$-values there'll be first.* Getting two, from the SHAPE itself rather than from the defining formulas, is the demonstration for MC-2.
- **The half-circle vs. full-circle mismatch.** Plot $x=\cos t,y=\sin t$ for $t\in[0,\pi]$ only (visibly just the top half), then eliminate the parameter and note the resulting equation $x^2+y^2=1$ describes the FULL circle. The visible gap between "what was actually drawn" and "what the equation describes" is the demonstration for MC-3.

## Discovery Questions
Guided discovery is used for the vertical-line-test consequence (a learner can genuinely check this themselves against a picture they've already plotted), but the formal definition and the elimination PROCEDURE are given directly, since they are conventions to be stated rather than derived.
1. **Need** — "Plot $x=\cos t, y=\sin t$ for $t=0,\pi/2,\pi,3\pi/2,2\pi$ and connect the points in order. What shape do you get?" A circle — inviting the question of whether it is "the graph of some function."
2. **Playground** — pick a specific $x$-value on that circle (e.g. $x=0.5$) and try to find a single corresponding $y$-value the way you would for an ordinary function.
3. **Invention** — "What went wrong when you tried that?" Let the learner articulate, in their own words, that there were two $y$-values, not one.
4. **Collision** — confront a learner who assumed "it's just a function in cos-and-sin clothing" with the two-$y$-values finding from step 2.
5. **Formalisation** — name the vertical line test explicitly as the check, and state that parametric curves need not pass it, unlike function graphs.
6. **Compression** — "A parametric curve is a path. Some paths happen to be function graphs. Most interesting ones (like circles) are not."

## Teaching Sequence
The direction-tracking habit (targeting MC-1) should be built into the FIRST plotting exercise — a learner who is only ever asked "what shape does this trace?" without also being asked "which way, and where does it start/end?" never has a reason to notice direction is even a fact worth tracking, and MC-1 is then being retrofitted rather than prevented. The vertical-line-test contrast (MC-2) should follow immediately after, using the SAME circle example already plotted, so the discovery ("this shape I just drew fails the test I already know") lands on a concrete case rather than an abstract claim. The elimination-loses-information contrast (MC-3) should come LAST among the three, because it depends on the learner already accepting that the parametrization carries genuinely extra information (direction, established via MC-1's repair) beyond the bare shape — without that acceptance, "the equation loses the $t$-range" reads as a technicality rather than a natural consequence. Turn-level scripts for A01–A03 are owned by the Blueprint's Component 4 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the $(t,x,y)$ table for the unit circle, plotted and connected in order with direction arrows. First action; anchors the "path, not shape" picture concretely.
- **TEST-THINKING: Prediction** — "Is the circle traced by $x=\cos t,y=\sin t$ the graph of a function $y=f(x)$?" asked BEFORE applying the vertical line test explicitly. Surfaces MC-2 in one turn.
- **DO: Demonstration** — the opposite-direction circle pair, run with the learner computing both points at the same $t$-value themselves.
- **TEST-THINKING: Error Analysis** — "A student says $x^2+y^2=1$ fully describes the parametrization $x=\cos t,y=\sin t, t\in[0,\pi]$. What's missing?" targets MC-3 directly.
- **Does NOT fit: introducing $dy/dx$ for parametric curves before the tracing-direction and elimination-loss ideas are solid.** `math.calc.parametric-calculus` owns that; introducing it early lets a learner treat the parameter as a nuisance to eliminate immediately rather than genuine information to track.

## Voice Teaching Notes
The load-bearing sentence is "connect the points IN THE ORDER $t$ visits them — the order is part of the answer." Say "in order" every time a plotting task is given, not just the first. Listen for a learner describing a finished plot purely by its resulting shape ("it's a circle") without ever mentioning where it starts, ends, or which way it goes — that omission, even when the shape is correctly identified, is the tell that direction hasn't registered as a fact worth stating (MC-1). Listen for fast, confident agreement when asked whether a parametrized circle is "a function" — fast agreement here, more than a hesitant guess, signals MC-2 is held as an assumed rule rather than an open question. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **States only the resulting shape when asked to describe a parametric curve, omitting direction/start/end** — MC-1. Route to the opposite-direction pair, never to a restatement of "direction matters."
- **Confidently affirms a parametrized circle is a function because it's "built from cos and sin"** — MC-2. Route to applying the vertical line test to the shape itself, on the exact circle just plotted.
- **Treats an eliminated Cartesian equation as fully equivalent to a $t$-range-restricted parametrization** — MC-3. Route to plotting the restricted range explicitly and comparing it against the full-shape equation.
- **Correctly tracks direction, applies the vertical line test to the shape, and flags what elimination might lose** — the intended target state; the Blueprint's own P76 transfer probe (the outward spiral) is the right level of challenge to confirm this transfers beyond the canonical circle example.
- **Mastery trigger**: the Blueprint's A03 gate, MAMR 4/5 (⌈0.75×5⌉). The 4-item P77 set plus the P76 spiral transfer probe must include at least one item where reversing direction produces a visually identical shape — a gate made only of shape-identification items certifies MC-1's shortcut rather than the full concept.

## Tutor Recovery Strategy
The likely utterance here is "but it's the same picture, why does it matter which way you draw it?" — a reasonable objection given how graphing was always taught before. The concept-specific smaller question drops the algebra and uses motion directly: **"If I walk from your house to school, and you walk from school to your house, along the exact same road — did we take the same walk?"** The learner says no, correctly, on ground they already own (direction of travel is obviously part of "a walk," even though the road — the shape — is identical). Then return: "a parametric curve is exactly that walk — the road is the shape, but which way you walked it is part of the curve too." If the frustration is instead about the vertical-line-test result feeling like a trick, shrink to the bare check: **"Pick $x=0$ on the circle. How many points on the circle have that exact $x$-value?"** The learner finds two, unprompted, which is the whole argument. Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **conceptual distinction with an embedded procedure** (direction-tracking and the vertical-line-test check are conceptual judgments; elimination is a procedure). Review by *applying the vertical line test to a fresh shape*, not by re-deriving the circle example, since re-using the same anchor repeatedly lets the judgment become rote recall rather than a genuinely re-applied check.
- Concept-specific deviation: keep at least one opposite-direction parametrization pair permanently in the review rotation — a review that only ever asks "what shape is this?" never re-exercises the direction judgment, and MC-1 regrows silently once fluency in plotting sets in.
- Interleaving partners: `math.func.function-concept` (the discriminating partner for MC-2 — the vertical line test should recur in review on curves from BOTH concepts, so the test stays a general tool rather than one exercised only here) and `math.geom.coordinate-plane`, which supplies the plotting surface this concept operates on.

## Transfer Connections
- **Near**: `math.calc.parametric-calculus` (differentiating and integrating parametric curves builds directly on tracking direction — $dy/dx=(dy/dt)/(dx/dt)$ literally requires both derivatives with respect to the SAME parameter — and on knowing what elimination discards).
- **Far**: polar coordinates, another representation (met later, if authored) where a single curve can likewise be traced in genuinely different ways depending on how the angle variable ranges, echoing this concept's direction/range-loss lessons in a different coordinate system.
- **Real-world**: any motion-tracking or animation description — a robot's programmed path, a graphics engine's animation curve, a GPS trace — is literally a parametric curve, with "which way and how fast" as essential, not optional, information.
- **Expert transfer**: recognizing when a mathematical object needs an ORDERED or TIMED description rather than a static one — the same need that motivates parametrizing curves, surfaces, and later dynamical systems, where "what happens, in what order" is the actual content.

## Cross-Subject Connections
- **Physics**, genuine and central: projectile motion and any moving-particle problem is naturally described parametrically — position as a function of time, $x(t)$ and $y(t)$ — and the direction-of-travel lesson here is literally "which way the particle is moving," not a mathematical abstraction.
- **Computer graphics/animation**, real: animation paths (Bézier curves, motion paths) are parametric curves, and the direction/speed distinction this concept teaches is exactly what determines how an animated object appears to move.
- **Robotics**, real: a programmed robot path is a parametrization; two paths tracing the identical set of points in opposite directions produce genuinely different robot behavior.
- The KG records `cross_links: []`. The physics motion connection is strong and standard; recorded in Curriculum Feedback below as a probable omission.

## Blueprint References
`docs/curriculum/blueprints/math.calc.parametric-curves.md`. Reused by reference, not restated: the Component 2 Misconception Registry (MC-1..MC-3), the Component 5 Protocol B repair actions B01–B03, the Component 4 teaching-action sequence (A01 the $(t,x,y)$ table and formal definition, A02 the three-part contrast pair), the P77 four-item problem set, the P76 independence-mode transfer probe (the outward spiral), and the Component 6 spaced-repetition schedule. This entry adds independent birth-type classification for all three misconceptions (the Blueprint carries no explicit birth-type column), the mental-model ladder, the anti-analogy, the argued guided-discovery-for-the-vertical-line-test / direct-instruction-for-the-definition split, and the ordering constraint placing direction-tracking before the vertical-line-test contrast before the elimination-loss contrast.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
`cross_links: []` understates this node. The physics motion connection (parametric curves as position-vs-time descriptions of moving particles) is standard, pedagogically load-bearing, and is the analogy most likely to carry the concept for a learner meeting it for the first time; a `cross_links` edge toward physics kinematics material would be well-founded. Recorded for the Curriculum Production Pipeline; not fixed here, since no KG file may be modified by this program.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 38).
