# math.calc.riemann-sums

## Identity
- **KG ID**: `math.calc.riemann-sums`
- **Domain**: math.calc (Calculus)
- **Requires**:
  - `math.calc.limits` — load-bearing part: the entire concept is a limit computation ($\lim_{n\to\infty}\sum f(x_i^*)\Delta x$), and without a reliable grip on what a limit is (an approached value, not any single term of the approximating sequence), the definite integral reads as an arbitrary sum rather than a limiting process.
- **Unlocks**: `math.calc.definite-integral` (the formal definite integral, of which Riemann sums are the defining limit)
- **Cross-links**: none in the KG (`P76_mode=independence`, per the Blueprint).
- **Difficulty**: advanced
- **Bloom level**: understand
- **Mastery threshold**: 0.80
- **Estimated hours**: 6
- **Blueprint**: `docs/curriculum/blueprints/math.calc.riemann-sums.md` (reused by reference throughout)

## Learning Objective
- The learner can compute a left, right, or midpoint Riemann sum for a given function, interval, and number of subdivisions $n$, by evaluating the function at the correct sample point in each subinterval and summing rectangle areas.
- The learner can state that the exact area under a curve is a FIXED quantity, and that increasing $n$ improves the APPROXIMATION without changing that fixed quantity.
- The learner can state that a Riemann sum for any finite $n$ is, in general, not equal to the definite integral — the integral is defined as the LIMIT of Riemann sums as $n\to\infty$, not any one sum along the way.
- The learner can algebraically evaluate that limit for a simple power function using a closed-form sum identity (e.g. $\sum_{i=1}^n i^2 = n(n+1)(2n+1)/6$), recovering the exact value of a definite integral from first principles.

## Core Understanding
The area under a curve $y=f(x)$ on $[a,b]$ cannot be found with the ordinary rectangle-area formula directly, because the "height" $f(x)$ changes across the interval. The Riemann sum strategy approximates the region with $n$ rectangles: divide $[a,b]$ into $n$ equal subintervals of width $\Delta x=(b-a)/n$, pick ONE sample point $x_i^*$ in each subinterval (the left endpoint, the right endpoint, or the midpoint are the three standard choices), erect a rectangle of height $f(x_i^*)$ there, and sum the $n$ rectangle areas: $\sum_{i=1}^n f(x_i^*)\Delta x$. Crucially, the rectangle's height is determined ENTIRELY by which sample point was chosen — nothing requires the rectangle to "fit" the curve, touch it at a particular edge, or match it anywhere except at the one chosen sample point; the rectangle may overshoot or undershoot the curve everywhere else in its subinterval, and that is expected, not a flaw. As $n$ grows, $\Delta x$ shrinks, and the gap between each rectangle and the curve it approximates shrinks with it — the exact area is the LIMIT this sequence of ever-finer approximations approaches as $n\to\infty$, and that limit is, by definition, the definite integral: $\int_a^b f(x)\,dx=\lim_{n\to\infty}\sum_{i=1}^n f(x_i^*)\Delta x$. The exact area itself never changes as $n$ increases — it was always a single fixed number; what changes is how closely the (still-approximate) Riemann sum estimates it. For an increasing function, the left sum systematically underestimates (every rectangle sits under the curve) and the right sum systematically overestimates (every rectangle sits over the curve), with the true area trapped between them and both errors shrinking to zero as $n\to\infty$.

## Mental Models
1. **Beginner — rectangles under the curve, add up their areas.** Draw rectangles, read off heights from a graph, multiply by width, add. *Upgrade trigger*: being asked WHY the left-sum and right-sum rectangles give different answers for the same interval — this model has no account of the sample-point choice yet. *Shelf life*: about one lesson.
2. **Intermediate — the sample point choice determines the height, not "fit."** Left, right, or midpoint just names WHERE within each subinterval the height is measured; none of the three choices is more "correct" than another, they simply converge to the same limit at different rates and with different error signs. *Upgrade trigger*: needing to explain why the exact area doesn't change as $n$ grows, which this model doesn't directly address.
3. **Advanced — a fixed quantity being measured by an improving sequence of estimates.** The area is a single fixed number that exists independently of how it's being approximated; the Riemann sum sequence, as $n$ increases, is a sequence of increasingly accurate MEASUREMENTS of that fixed number, never the number itself for any finite $n$. *Upgrade trigger*: needing to compute the exact limiting value algebraically rather than just asserting convergence.
4. **Expert — the definite integral is defined AS this limit, not merely approximated by it.** $\int_a^b f(x)\,dx$ is NOTATION for $\lim_{n\to\infty}\sum f(x_i^*)\Delta x$; the sum formulas (like $\sum i^2=n(n+1)(2n+1)/6$) that let this limit be computed exactly, for special functions, are the bridge from a numerically-convergent idea to an algebraically-exact one — the same bridge later replaced, for practical purposes, by the Fundamental Theorem of Calculus in `math.calc.definite-integral`. *Shelf life*: permanent.

## Why Students Fail
The dominant failure is a naive geometric expectation carried over from earlier, simpler area problems: a "correct" rectangle, the intuition says, should visibly fit the curve — its top edge should lie along it, or at least touch it somewhere sensible — and a rectangle whose height is read from the LEFT endpoint of a subinterval, sitting entirely below an increasing curve, looks wrong on sight even though it is exactly what "left Riemann sum" means (MC-1, RECTANGLES-TOUCH-CURVE-AT-TOP). A second failure conflates the fixed geometric quantity being measured with the changing sequence of numbers used to measure it: watching a computed Riemann sum change as $n$ increases from $4$ to $100$ to $1000$, a learner reasonably but wrongly concludes that the AREA itself is changing, rather than that the approximation is merely converging to a value that was fixed the whole time (MC-2, MORE-RECTANGLES-CHANGES-EXACT-AREA). The third failure imports a pattern this campaign has already documented for `math.calc.limits`' own MC-1: treating a finite, pre-limit expression as though it already equals the value the limit produces — here, a Riemann sum at some specific (even very large) $n$ is written down and called "the integral," skipping the $n\to\infty$ step that is the entire content of the definition (MC-3, RIEMANN-SUM-IS-THE-INTEGRAL).

## Misconceptions
Reused by reference from the Blueprint's Component 2 registry. **The Blueprint's Misconception Registry carries no explicit birth-type column**; all three classifications below are independently assigned here, though the Blueprint's own "Root cause" prose for each was used directly as evidence.

- **MC-1 — RECTANGLES-TOUCH-CURVE-AT-TOP** (the Blueprint's own "Foundational" misconception)
  - **Birth type**: Type 2, perceptual intuition. The Blueprint's own root-cause note names this directly: "a 'correct' rectangle should fit perfectly under the curve" — a naive geometric picture where visual fit, not the defined sample-point rule, is what makes a rectangle feel legitimate.
  - **Characteristic phrase**: "the left Riemann sum isn't valid — the rectangles don't match the curve at the right edge."
  - **Detection probe** (verbatim, Blueprint's B01 P41): for $f(x)=x^2$ on $[0,1]$, $n=2$, is the left-sum rectangle with height $f(0)=0$ (a flat line, visibly not touching the curve anywhere except at one endpoint) "a valid Riemann sum"?
  - **Repair**: Blueprint Repair Action B01 — the rectangle's height is determined by the CHOSEN sample point (left, right, or midpoint), not by requiring the rectangle to visually fit the curve; the error this creates shrinks to zero as $n\to\infty$ regardless of which point is chosen, because each rectangle's width shrinks to zero.
  - **Verification of death**: given a fresh increasing function, the learner correctly computes a left-sum rectangle whose height visibly undershoots the curve everywhere except at its left edge, without objecting that it "doesn't fit."

- **MC-2 — MORE-RECTANGLES-CHANGES-EXACT-AREA**
  - **Birth type**: Type 1, overgeneralization — specifically, conflating a converging sequence of estimates with the fixed quantity it converges to, the same category of error (though a distinct instance) as MC-3 below and as `math.calc.limits`' own MC-1 (LIMIT-IS-THE-FUNCTION-VALUE).
  - **Characteristic phrase**: "with 100 rectangles the area is 1.0050, with 1000 it's 1.0005 — so the area is getting smaller as we add more rectangles."
  - **Detection probe** (verbatim, Blueprint's B02 P41): "as we increase $n$ from 4 to 100, the Riemann sum changes from 0.46875 to 0.3384. Does the actual area under $y=x^2$ change?"
  - **Repair**: Blueprint Repair Action B02 — the room-measurement framing: "the room got larger because I used a more accurate tape measure" is absurd for the identical reason that "the area changed because I used more rectangles" is; the room (area) is fixed, the measurement (Riemann sum) improves.
  - **Verification of death**: given a table of Riemann sums at increasing $n$ converging to some value, the learner states that the AREA was that value all along, and that only the accuracy of the estimate improved.

- **MC-3 — RIEMANN-SUM-IS-THE-INTEGRAL**
  - **Birth type**: Type 1, overgeneralization — the identical "pre-limit expression IS the answer" mechanism already classified this way for `math.calc.limits`' own MC-1, imported here into the area context; the Blueprint's own root-cause note makes this cross-reference explicit ("learner imports the AROC→IROC confusion... into the area context").
  - **Characteristic phrase**: writing $\int_0^1 x\,dx = \sum_{i=1}^n (i/n)(1/n)$ without specifying $n$ or taking $n\to\infty$.
  - **Detection probe** (verbatim, Blueprint's B02 P41): "the right Riemann sum for $f(x)=x^2$ on $[0,1]$ is $R_{100}\approx0.3384$. Is this the value of $\int_0^1 x^2\,dx$?"
  - **Repair**: Blueprint Repair Action B02 — state the definition precisely: $\int_a^b f(x)\,dx=\lim_{n\to\infty}\sum f(x_i^*)\Delta x$; for ANY finite $n$, $\sum f(x_i^*)\Delta x\ne$ the integral (unless $f$ is constant, where every sum is already exact), and the "$=$" sign in the integral's definition genuinely requires the limit.
  - **Verification of death**: given a computed Riemann sum at a specific large $n$, the learner explicitly states this is an approximation, not the integral itself, and names what additional step (the limit) would be required to reach the exact value.

## Analogies
- **Best — a tape measure getting more precise, not a room changing size.** The exact area is the room; the Riemann sum at increasing $n$ is an increasingly fine tape measure. A more precise measurement never changes what's being measured — it only reduces the reported error (Blueprint's own primary repair framing, carrying MC-2 directly).
- **Alternative — paving a curved driveway with rectangular bricks.** More, thinner bricks cover the curved edge more closely, but the driveway's actual shape and area were fixed before a single brick was laid; adding bricks reveals the shape more accurately, it does not change it.
- **ANTI-ANALOGY — "a good rectangle should hug the curve."** This licenses MC-1 directly: it imports an aesthetic standard (visual fit) into a definition that only cares about the value at one designated sample point. Say "the rectangle's height comes from ONE rule — left, right, or midpoint — applied consistently, regardless of how the rest of it looks against the curve" instead.

## Demonstrations
- **The left/right sandwich.** Compute $L_4$ and $R_4$ for $f(x)=x^2$ on $[0,2]$ side by side (getting $1.75$ and $3.75$), then note the true area lies between them. *Predict which will be larger before computing.* Seeing both bracket the true value in one picture is the demonstration that neither alone is "the answer," priming MC-2's repair.
- **The converging-table collision.** Compute $R_n$ for $f(x)=x^2$ on $[0,1]$ at $n=4,10,100,1000$ (getting $0.46875, 0.385, 0.3384, 0.3338$), alongside the exact value $1/3\approx0.3333$. *Predict whether the exact area is changing first.* Watching the numbers close in on a FIXED target, never reaching it exactly at any finite $n$, is the demonstration for both MC-2 and MC-3 at once.
- **The constant-function sanity check.** For $f(x)=c$ on $[a,b]$, show that EVERY Riemann sum (left, right, midpoint, any $n$) equals exactly $c(b-a)$ — no convergence needed, no approximation error at all. This reassures that the machinery gives the expected, already-known answer (a rectangle's area) when the area genuinely already is a rectangle, and it directly counters MC-1 (every sample-point choice is equally valid here) and MC-2 (more rectangles changes nothing, because there was nothing to converge toward).

## Discovery Questions
Direct instruction is the argued call here: the definition of the definite integral as a limit of Riemann sums is a mathematical CONVENTION being introduced, not something a learner can be expected to reinvent from scratch, though the over/under-approximation BEHAVIOR is genuinely discoverable from a picture.
1. **Need** — "Find the exact area under $y=x^2$ on $[0,1]$ using the rectangle-area formula." There is no single rectangle to use — the height changes.
2. **Playground** — try approximating with 2 rectangles, then 4, then 10, using left endpoints each time, and record the running totals.
3. **Invention** — "What do you notice about these numbers as you use more rectangles?" Let the learner articulate that they seem to be settling toward some value.
4. **Collision** — confront a learner who says "the area is changing" with the constant-function sanity check, where the "sum" never changes at all despite $n$ varying.
5. **Formalisation** — name the limit process explicitly: the definite integral IS $\lim_{n\to\infty}\sum f(x_i^*)\Delta x$, a fixed number the sums approach.
6. **Compression** — "The sum is a measurement. The integral is what's being measured. They agree only in the limit."

## Teaching Sequence
The over/under-approximation demonstration (left sum under, right sum over, for an increasing function) should come FIRST, before any discussion of what the exact area "really is" — a learner who has just computed both sums by hand and seen the true area visibly trapped between them has direct, felt evidence that neither sum alone is exact, which is the foundation MC-2's and MC-3's repairs both build on. The constant-function sanity check should be introduced EARLY as a reference point, not held back as an afterthought — it is the cleanest available evidence that the whole machinery, applied to an already-known case, reproduces the expected answer with zero surprises, which builds trust in the limit process before it's asked to do harder work. The algebraic limit computation (deriving $\lim R_n=1/3$ for $f(x)=x^2$ using the sum-of-squares identity) should come LAST, once the conceptual distinction between a Riemann sum and the integral is solid — attempting the algebra before the concept invites a learner to treat the sum-formula manipulation as the whole lesson and miss that its POINT is computing an exact limit, not performing algebra for its own sake. Turn-level scripts for A01–A04 are owned by the Blueprint's Component 4 and are not restated here.

## Tutor Actions
- **DO: Worked Example** — the left/right sandwich for $f(x)=x^2$ on $[0,2]$, computed by hand with the learner. First action; anchors both the rectangle-computation procedure and the over/under bracket.
- **TEST-THINKING: Prediction** — "Does the exact area change as $n$ increases from 4 to 1000?" asked BEFORE showing the converging table. Surfaces MC-2 in one turn if the learner predicts "yes."
- **DO: Demonstration** — the constant-function sanity check, run with the learner computing at least two different $n$ values themselves to see the sum stay exactly fixed.
- **TEST-THINKING: Error Analysis** — "A student wrote $\int_0^1 x^2\,dx = R_{100} \approx 0.3384$. What's wrong?" targets MC-3 directly, using a number close to but visibly different from the true $1/3$.
- **Does NOT fit: introducing the Fundamental Theorem of Calculus shortcut before the limit-of-sums definition is solid.** `math.calc.definite-integral` owns that; introducing it early lets a learner compute integrals mechanically while never confronting what the integral actually MEANS as a limit.

## Voice Teaching Notes
The load-bearing sentence is "the area is fixed — only the MEASUREMENT gets better." Say it every time a converging table of Riemann sums is shown, not just the first. Listen for a learner describing increasing $n$ as making the area "more accurate" versus "smaller" or "different" — "more accurate" signals the fixed-quantity model has landed, while "smaller"/"different" signals MC-2 is still active, treating the estimate's own change as the area's change. Listen for hesitation (or its absence) when asked to write down "the integral" from a computed Riemann sum at some large $n$ — fast, unhesitating substitution of the sum for the integral symbol is the tell that MC-3's shortcut is operating, more so than a hesitant guess. Channel reality is owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals
- **Objects that a left-sum or right-sum rectangle "doesn't fit" the curve, or judges validity by visual fit** — MC-1. Route to the constant-function sanity check and the explicit sample-point rule, never to a restatement of "it's still valid."
- **States or implies the exact area changes as $n$ increases** — MC-2. Route to the tape-measure/room analogy and the converging-table demonstration on the SAME function just computed.
- **Writes a finite Riemann sum with an "=" to the integral symbol, or reports a computed sum at large $n$ as "the answer"** — MC-3. Check whether the learner can name what additional step (the limit) is missing; if they can name it but still write "=", the gap is notational discipline, not conceptual, and the repair is shorter.
- **Correctly computes left/right sums, states the area is fixed and bracketed between them, and explicitly invokes the limit before naming the exact value** — the intended target state.
- **Mastery trigger**: the Blueprint's A04 gate, MAMR 4/5 (⌈0.80×5⌉). The 4-item P77 set plus the P76 independence-mode transfer probe (the algebraic derivation of $\lim R_n=1/3$ using $\sum i^2=n(n+1)(2n+1)/6$) must include at least one item requiring the learner to state explicitly that a specific finite sum is NOT the integral — a gate made only of computation items certifies the arithmetic without certifying the conceptual distinction.

## Tutor Recovery Strategy
The likely utterance here is "so which one is the real area, the left sum or the right sum?" — a reasonable question given that both were just computed and neither matches. The concept-specific smaller question drops the algebra and returns to measurement: **"If I measure a table with a ruler marked in inches, and then with one marked in millimeters, do I get the exact same number both times?"** The learner says no, correctly, and recognizes both are still measuring the SAME table. Then return: "the left sum and right sum are two different ways of measuring the same fixed area — neither is 'the real answer' by itself; the real answer is what BOTH keep getting closer to as the rectangles get thinner." If the frustration is instead about the algebraic limit computation in A03 feeling like a wall of unmotivated symbol manipulation, shrink to the constant-function case first: **"For a rectangle you already know the area of, does the sum formula give you the number you expect?"** confirming the machinery is trustworthy before asking it to do new work. Generic machinery is owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks
- Concept type: **conceptual distinction with an embedded procedure** (the fixed-area-vs-improving-estimate distinction is conceptual; computing a specific Riemann sum, and taking its algebraic limit, are procedures). Review by *computing a fresh Riemann sum AND explicitly stating whether it equals the integral* — a review item that only asks for the numeric sum tests nothing about the conceptual distinction, since MC-3 computes the identical number.
- Concept-specific deviation: keep the constant-function sanity check permanently in the review rotation as a zero-approximation-error reference point — a review that only ever uses genuinely curved functions never re-confirms that the learner trusts the machinery on a case where the answer is already obvious.
- Interleaving partners: `math.calc.limits` (the discriminating partner for MC-3 — reviewing an ordinary limit alongside a Riemann-sum limit keeps "the pre-limit expression is not the answer" recognizable as one general principle, not two unrelated rules) and `math.calc.definite-integral`, the concept this one directly feeds.

## Transfer Connections
- **Near**: `math.calc.definite-integral` (the formal integral, defined AS the Riemann-sum limit developed here, with the Fundamental Theorem of Calculus supplying a shortcut that bypasses recomputing the limit each time).
- **Far**: numerical integration methods (trapezoidal rule, Simpson's rule) met later, which are refinements of the same rectangle-approximation idea using better-shaped pieces than flat-topped rectangles.
- **Real-world**: any quantity computed by summing many small contributions and taking a fine-grained limit — total distance from a velocity-vs-time graph, total work from a force-vs-distance graph, total accumulated quantity from any rate-vs-time record — all instances of this exact Riemann-sum-to-integral process.
- **Expert transfer**: the general pattern of defining an exact, continuous quantity as the limit of a sequence of discrete, computable approximations — the same move that defines arc length (as a limit of polygonal-path lengths) and, in the reverse direction, mirrors `math.calc.derivative-definition`'s own limit-of-difference-quotients construction.

## Cross-Subject Connections
- **Physics**, genuine and central: total distance traveled is the area under a velocity-vs-time graph, and total work is the area under a force-vs-distance graph — both computed, in principle, by exactly this rectangle-summing-then-limit process before any integration shortcut is available.
- **Economics**, real: total accumulated cost or revenue over time, given a rate function, is computed the identical way — summing small time-slices of the rate and taking the limit.
- **Engineering**, real: numerical integration in simulations (before any closed-form antiderivative is known) is literally a Riemann sum computed at a large but finite $n$, making explicit, practical use of the very approximation this concept teaches to distinguish from the exact limit.
- The KG records `cross_links: []`. The physics distance/work connection is strong and standard; recorded in Curriculum Feedback below as a probable omission.

## Blueprint References
`docs/curriculum/blueprints/math.calc.riemann-sums.md`. Reused by reference, not restated: the Component 2 Misconception Registry (MC-1..MC-3), the Component 5 Protocol B repair actions B01–B02, the Component 4 teaching-action sequence (A01 P11 the left/right rectangle representation shift, A02 P06 the Riemann-sum-vs-integral contrast pair, A03 P04 the algebraic pattern induction deriving $\lim R_n=1/3$ via $\sum i^2=n(n+1)(2n+1)/6$, A04 P91 mastery gate), the P77 four-item problem set, and the P76 independence-mode transfer probe. This entry adds independent birth-type classification for all three misconceptions (the Blueprint carries no explicit birth-type column, though its own "Root cause" prose for MC-3 explicitly names the cross-reference to the AROC/IROC-style confusion this entry formalizes against `math.calc.limits`' own MC-1), the mental-model ladder, the anti-analogy, the argued direct-instruction call, and the ordering constraint placing the over/under-approximation demonstration and constant-function sanity check before the algebraic limit derivation.

## Runtime Asset References
No seeded `AssetIdentity` records exist for this concept. None were created here.

## Curriculum Feedback
`cross_links: []` understates this node. The physics distance-from-velocity and work-from-force connections are standard, pedagogically load-bearing, and are the analogies most likely to carry the concept for a learner meeting Riemann sums for the first time; a `cross_links` edge toward physics kinematics/work material would be well-founded. Recorded for the Curriculum Production Pipeline; not fixed here, since no KG file may be modified by this program.

## Version History
- v1.0 (2026-09-12): Initial authoring. Mathematics Educational Brain completion campaign, math.calc Wave (Batch 38).
