# math.calc.derivative-intro

## Identity
- **KG ID**: `math.calc.derivative-intro`
- **Domain**: math.calc (Calculus)
- **Requires**: `math.geom.slope`, `math.calc.limits`
- **Unlocks**: none listed in the KG (the Blueprint additionally names `math.calc.derivative-definition` as forward-pointing guidance, not yet authored)
- **Cross-links**: none listed in the KG
- **Difficulty**: advanced
- **Bloom level**: understand
- **Mastery threshold**: 0.80 (MAMR 4/5)
- **Estimated hours**: 5
- **CPA stage**: Pictorial (a table of average-rate-of-change values for decreasing $h$ approaching $0$; a graph of secant lines rotating toward the tangent, before the abstract limit notation)

## Learning Objective
By the end of this concept, the learner can:
1. Compute the average rate of change (AROC) of a function over an interval, recognizing it as the slope of the secant line through two points, directly reusing `math.geom.slope`'s two-point slope formula.
2. Construct the difference quotient $[f(a+h)-f(a)]/h$ and take its limit as $h\to0$ to obtain the derivative $f'(a)$ — the instantaneous rate of change (IROC) — recognizing this limit as a genuinely different, more precise quantity than the AROC at any specific finite $h$.
3. Interpret $f'(a)$ geometrically as the slope of the tangent line at $(a,f(a))$, obtained as the limiting position of secant lines as the second point approaches the first.
4. Distinguish AROC (measured over an interval, requiring two distinct points) from IROC (measured at a single point, requiring a limit) — recognizing that for a linear function these coincide everywhere, a useful sanity check on the limit machinery.

## Core Understanding
The derivative is this domain's central payoff — the concept everything since `math.calc.limits` has been building toward. It answers a question that initially sounds contradictory: how can something have a "rate of change" at a single, frozen instant, when rate of change ordinarily requires comparing two different moments?

**THE DERIVATIVE IS DEFINED AS THE LIMIT OF THE AVERAGE RATE OF CHANGE AS THE INTERVAL SHRINKS TO ZERO.** The average rate of change over an interval from $a$ to $a+h$ is $[f(a+h)-f(a)]/h$ — exactly `math.geom.slope`'s two-point slope formula, applied to the two points $(a,f(a))$ and $(a+h,f(a+h))$. As $h$ shrinks toward $0$ (never reaching it), this expression's LIMIT — not its value at any particular small $h$ — defines the instantaneous rate of change: $f'(a)=\lim_{h\to0}[f(a+h)-f(a)]/h$. The limit is precisely what converts an average (over an interval) into an instantaneous quantity (at a point), by systematically shrinking the interval rather than ever eliminating it entirely.

**A SECOND POINT IS GENUINELY USED — IT IS JUST CONSTRUCTED AND THEN LET APPROACH THE FIRST, RATHER THAN BEING GIVEN DIRECTLY.** A tangent line's slope cannot be found from a single point alone using the ordinary two-point slope formula — this instinct is entirely correct. The resolution is not to abandon the two-point requirement, but to CONSTRUCT a second point $Q=(a+h,f(a+h))$ artificially, compute the secant slope through the fixed point $P=(a,f(a))$ and this movable $Q$, and then take the limit as $Q$ slides toward $P$ (as $h\to0$). Two points become one only in the limit — but two points were genuinely used to get there.

**INSTANTANEOUS RATE OF CHANGE IS REAL AND PRECISELY DEFINED — NOT A CONTRADICTION IN TERMS.** The intuition "change requires two distinct states, so change AT one instant is meaningless" is a natural pre-limit instinct, but it conflates "requires two states TO COMPUTE" with "requires two states TO BE MEANINGFUL." The limit process resolves this exactly: it never divides by zero (the limit is taken as $h$ approaches, but never equals, zero), and the resulting value is an exact, well-defined number — a speedometer reading at a single instant is genuinely meaningful, and it IS the derivative of position.

**A SPECIFIC SMALL VALUE OF $h$ GIVES AN APPROXIMATION, NEVER THE EXACT DERIVATIVE.** Computing $[f(a+h)-f(a)]/h$ at, say, $h=0.001$ produces a number very CLOSE to $f'(a)$ — but it is not $f'(a)$ itself, no matter how small $h$ gets, as long as $h$ remains a specific nonzero value. Only the LIMIT — the value the expression approaches as $h$ shrinks without bound, never merely a computation AT some small $h$ — gives the exact derivative.

## Mental Models
1. **Rung 1 — A movable second point, not a missing one.** The tangent's slope is found by BUILDING a second point and watching where the resulting secant slope goes as that point slides toward the first — never by attempting to find a slope from truly one point alone.
2. **Rung 2 — The limit is a process of approach, never a computation at a specific value.** $2+h$ approaching $2$ as $h\to0$ means the VALUE $2$ is what's approached — no specific substitution of $h$, however small, IS that value.
3. **Rung 3 — AROC and IROC are the same formula, two different destinations.** The difference quotient at a FIXED $h$ is AROC (over an interval); its LIMIT as $h\to0$ is IROC (at a point) — the formula is identical, only what's done with it differs.

## Why Students Fail
MC-1 happens because the learner's prior knowledge (from `math.geom.slope`) that a slope genuinely requires two points is entirely CORRECT — the misconception is not a false belief but an INCOMPLETE one: the learner has not yet seen how a second point can be artificially constructed and then let approach the first via a limiting process, so the correct "two points needed" rule gets applied rigidly as "impossible with only one point given," missing the constructive resolution. MC-2 happens because change, in every everyday and prior mathematical experience, has always been measured by comparing two distinct states over some elapsed interval — "change at a single frozen instant" genuinely sounds self-contradictory under that pre-limit intuition, and the learner has not yet reconciled this intuition with the limit's precise resolution (a process of approach that never divides by zero). MC-3 happens because computing the difference quotient at a small but specific $h$ (like $h=0.001$) produces a numerically excellent approximation, and this numerical closeness gets conflated with numerical EQUALITY — the learner has not yet distinguished "the limit as a value approached" from "evaluation at a specific, however small, input."

## Misconceptions

### MC-1: TANGENT-IS-JUST-ONE-POINT
- **Birth type**: Type 2 — Perceptual intuition (independently classified; this Blueprint, using an older Curriculum Production Pipeline document format, carries no explicit birth-type column — this classification is this program's own, not adopted from the Blueprint)
- **Description**: The learner believes the tangent line "only touches the curve at one point and has no slope," conflating the geometric picture (a single point of tangency) with the algebraic construction needed to actually compute the slope.
- **Why this birth type**: The naive geometric picture of a tangent line — touching the curve at exactly one visible point — directly and immediately suggests "only one point is available," a perceptually-grounded, pre-formal intuition that has not yet been reconciled with the constructive, limit-based resolution.
- **Detection probe**: "Given only the point $(1,1)$ on $y=x^2$, find the tangent line's slope there." — a learner holding this misconception responds "you can't find the slope with just one point — you need two points."
- **Repair**: State the resolving idea directly: "we do not use just one point. We use ONE fixed point $P=(1,1)$ and ONE movable point $Q=(1+h,f(1+h))$. The secant through $P$ and $Q$ has slope $[f(1+h)-f(1)]/h$. As $h\to0$, $Q$ slides toward $P$ — and the secant approaches the tangent. The tangent slope is DEFINED as this limit. Two points become one in the limit — but we used two points to get there."
- **Verification of death**: Given a single point on a curve, the learner constructs a second, movable point and sets up the secant-slope limit as the correct method for finding the tangent slope, rather than declaring the task impossible.

### MC-2: INSTANTANEOUS-IS-UNDEFINED
- **Birth type**: Type 2 — Perceptual intuition (independently classified, same reason as MC-1: no Blueprint birth-type column)
- **Description**: The learner believes "rate of change at a single instant" is a contradiction in terms — since no time has elapsed, change divided by zero seems undefined — and resists the limit construction as a workaround.
- **Why this birth type**: Every prior experience with "change" has involved comparing two distinct states over an elapsed interval, so "change at one frozen instant" genuinely conflicts with a deeply-held, pre-formal intuition about what change even means, until that intuition is explicitly reconciled with the limit's precise resolution.
- **Detection probe**: "Does 'speed at exactly one moment' make sense, or do you need an interval of time to measure speed?" — a learner holding this misconception insists an interval is required, treating "instantaneous speed" as meaningless.
- **Repair**: State plainly: "the limit is not 'plug in a small $h$.' It is 'what value does the expression approach as $h$ shrinks toward zero WITHOUT EVER EQUALLING ZERO?' For $2+h$, as $h\to0$, this approaches exactly $2$ — not approximately, exactly, and never by dividing by zero. Instantaneous rate of change is real and exactly defined by the limit. The speedometer in a car reads the derivative of position — it is not meaningless; it is precisely defined via limits."
- **Verification of death**: Given a request for an instantaneous rate at a specific point, the learner sets up the limit definition confidently, without objecting that the quantity is undefined or contradictory.

### MC-3: DIFFERENCE-QUOTIENT-IS-THE-DERIVATIVE
- **Birth type**: Type 1 — Overgeneralization (independently classified, same reason as MC-1: no Blueprint birth-type column)
- **Description**: The learner computes $[f(a+h)-f(a)]/h$ for a specific small $h$ (e.g. $h=0.001$) and treats this numerical result as the derivative itself, skipping the limit.
- **Why this birth type**: Since a small $h$ produces a numerically excellent approximation, the learner over-generalizes "very close numerically" into "numerically equal," conflating an approximation with the exact value the limit alone provides.
- **Detection probe**: "For $f(x)=x^2$, you compute $[f(1.001)-f(1)]/0.001=2.001$. Is $2.001$ the derivative $f'(1)$?" — a learner holding this misconception answers yes, or "close enough."
- **Repair**: State exactly: "$2.001$ is the AROC at $h=0.001$ — a specific finite computation. The derivative is the LIMIT as $h\to0$, which is EXACTLY $2$ — not approximately, exactly. No computation with any specific $h$, however small, ever gives the derivative directly; only the limiting process does."
- **Verification of death**: Given a difference quotient evaluated at a specific small $h$, the learner correctly identifies this as an approximation to the derivative, and separately computes the actual limit to obtain the exact value.

## Analogies
1. **Building a bridge to a point you'll eventually remove (Rung 1, for MC-1)**: constructing a second point and sliding it toward the first is like building a temporary bridge to reach a location, then dismantling the bridge once you've measured the exact angle of approach — the bridge (the second point) was genuinely necessary for the measurement, even though it's not part of the final answer.
2. **A photograph of motion, not a frozen absence of motion (for MC-2)**: a speedometer reading at one instant is like a high-speed photograph capturing motion blur — it genuinely encodes a rate of movement at that exact moment, not an absence of movement; the "instant" doesn't erase the rate, it precisely pins it down.
3. **A very good estimate is still not the exact answer (for MC-3)**: rounding $\pi$ to $3.14159$ gives an excellent approximation for most purposes, but it is never EXACTLY $\pi$ — no matter how many more decimal digits are added, the exact value remains a genuinely different, limiting concept.

## Demonstrations
1. **D1 — The AROC table and secant rotation.** Build the table of AROC values for $y=x^2$ at $a=1$ as $h$ shrinks ($h=1,0.5,0.1,0.01,0.001$), alongside the graph of secant lines visibly rotating toward the tangent — establishing the limiting trend both numerically and visually before any formal limit notation.
2. **D2 — The constructed second point, made explicit.** Walk MC-1's repair explicitly: fix $P$, construct movable $Q$, compute the secant slope, and take the limit as $Q\to P$ — directly confronting MC-1 with the constructive resolution.
3. **D3 — AROC versus IROC, same formula, different destination.** Compute a car's average speed over an interval (AROC) and its instantaneous speed at one moment (IROC) for the same position function, contrasting the two explicitly — directly confronting MC-2 and setting up the power-rule pattern induction.

## Discovery Questions
1. "You're told a tangent line's slope requires two points, but you're only given one point on the curve. Is the two-points rule wrong, or is there a way to get a second point anyway?"
2. "Does 'the car's speed at exactly this instant' make sense as a real, measurable quantity, or is it a contradiction since no time has passed?"
3. "You compute the difference quotient at $h=0.0001$ and get a number very close to a round value. Is that number itself the derivative, or is the derivative something slightly different?"

## Teaching Sequence
Entry stage: Pictorial (a table of AROC values for decreasing $h$, and a graph of secant lines rotating toward the tangent, before the abstract limit notation).
1. The AROC table and secant rotation (D1) — establishing the limiting trend numerically and visually.
2. The constructed second point, made explicit (D2) — directly confronting MC-1 with the resolution to the "one point" objection.
3. AROC versus IROC, same formula, different destination (D3) — directly confronting MC-2, then the power-rule pattern induction across $x$, $x^2$, $x^3$ derivatives, closing with MC-3's exact-versus-approximate distinction.
4. Transfer probe (P76, independence mode): a car's position function, computing both the difference quotient and its limit to find the instantaneous speed at a specific time, then interpreting the result geometrically as a tangent slope.

## Tutor Actions
1. Whenever a learner is asked to find a tangent's slope from a single given point, ask them what SECOND point they could construct, rather than accepting "impossible with one point" as a final answer — catching MC-1 at the setup step.
2. Whenever "instantaneous" language arises, ask the learner directly whether they believe the quantity is well-defined or contradictory before proceeding — surfacing MC-2 as an explicit checkpoint rather than an unstated background assumption.
3. Whenever a learner computes a difference quotient at a specific numerical $h$, ask them explicitly whether this IS the derivative or an APPROXIMATION to it — catching MC-3 before the numerical result gets mistaken for the exact answer.

## Voice Teaching Notes
- **Register**: understand/advanced — this is a genuinely motivational, foundational concept establishing WHY the derivative is defined the way it is; language should build intuition and conviction before precision, reusing the speedometer analogy heavily for MC-2.
- **Load-bearing sentence**: "The limit is what turns average into instantaneous — never a small value of $h$, always the value the expression approaches as $h$ shrinks toward, but never reaches, zero."
- **Wait time note**: after presenting the AROC table's final rows (very small $h$), allow enough silence for the learner to attempt stating the limiting value unprompted, rather than immediately confirming it — this is the single most diagnostic moment for distinguishing genuine limit understanding (MC-3 resolved) from pattern-matching the smallest visible number.

## Assessment Signals
1. Correctly computes the average rate of change of a function over an interval using the two-point slope formula.
2. Correctly constructs the difference quotient and takes its limit as $h\to0$ to find the exact derivative at a point.
3. Correctly interprets the derivative geometrically as the tangent line's slope, obtained as the limit of secant slopes.
4. Correctly distinguishes a difference-quotient value at a specific small $h$ (an approximation) from the derivative itself (the exact limit).
5. **P76 Transfer Probe** (independence mode): given a car's position function, sets up and evaluates the difference-quotient limit to find instantaneous speed at a specific time, and correctly interprets the result as a tangent-line slope on the position graph.

## Tutor Recovery Strategy
If a learner has just resolved MC-1 (constructing a second point) but then struggles to correctly set up the difference quotient's algebra, return to the concrete numerical table from D1 before re-attempting the symbolic version — grounding the abstract formula in the already-established numerical pattern. If a learner correctly distinguishes AROC from IROC (MC-2 resolved) but then claims a linear function's derivative is "not really instantaneous since it's the same everywhere," clarify that a CONSTANT instantaneous rate across all points is a special, reassuring case — not a sign that the instantaneous concept doesn't apply — and that this is exactly the linear-function sanity check confirming the limit machinery behaves as expected.

## Memory Hooks
1. "Build the second point, then let it slide toward the first — two points become one only in the limit."
2. "The limit approaches zero without dividing by zero — instantaneous change is real and exact."
3. "A small $h$ gives a good guess; only the limit gives the exact derivative."

## Transfer Connections
- `math.geom.slope` — this concept's own prerequisite; the two-point slope formula this concept directly reuses, first for the secant (AROC) and then, via the limit, for the tangent (IROC).
- `math.calc.limits` — this concept's own prerequisite; the "approach, not arrival" principle and the limit-versus-value distinction this concept directly applies to the difference quotient.
- `math.calc.one-sided-limits`/`math.calc.limit-laws` — the sibling concepts whose limit machinery (existence checks, algebraic simplification of the difference quotient) this concept's computations directly rely on without restating.

## Cross-Subject Connections
- Physics: instantaneous velocity and acceleration are the canonical physical instances of the derivative — a speedometer's reading at any instant IS the derivative of position with respect to time, making this concept's own central analogy a direct, literal physical application.
- Economics: marginal cost and marginal revenue (the instantaneous rate of change of cost or revenue with respect to production quantity) are direct economic applications of exactly this concept's derivative definition, distinguishing a marginal (instantaneous) rate from an average rate over a production range.

## Blueprint References
- `docs/curriculum/blueprints/math.calc.derivative-intro.md` — fully reused by reference. This Blueprint uses an older Curriculum Production Pipeline document format (Teaching Actions TA-A01/TA-B01, primitives P11/P49/P91), matching `math.calc.limits`'s and `math.calc.continuity`'s own format, and carries no explicit birth-type column (the TENTH such gap this campaign). All 3 misconceptions in this entry are therefore **independently classified** by this program (MC-1 Type 2, MC-2 Type 2, MC-3 Type 1), not adopted from the Blueprint — stated here explicitly and honestly, per this program's standing discipline for concepts lacking a pre-assigned birth type.
- No cross-link listed in the KG for this concept; none to verify.

## Runtime Asset References
No AssetIdentity rows exist for this concept yet — Layer 3/7 (DB-backed Explanation/Probe assets) is populated separately by production LLM-generation-plus-admin-review or deliberate seed-script batches, per this program's own layer-ownership mapping. This Educational Brain entry is the Layer 2 authored source those future runtime assets will draw from.

## Curriculum Feedback
The Blueprint's own Component 7 names `math.calc.derivative-definition` as an "unlocked" concept, but the live KG's own `unlocks` field for this concept is empty — a genuine Blueprint/KG metadata discrepancy, recorded not fixed, per this program's standing rule of following the KG on any divergence. This is the tenth Blueprint in this campaign to lack an explicit birth-type column.

## Version History
- **Batch 37** (2026-09-13): initial authoring, part 3 of 4 this batch (with `math.calc.continuity-types`, `math.calc.ivt`, `math.calc.squeeze-theorem`), continuing `math.calc` as a standalone domain campaign — this is the domain's central payoff concept, the derivative, everything since `math.calc.limits` has been building toward. Blueprint reused by reference; 3 misconceptions independently classified (MC-1 Type 2, MC-2 Type 2, MC-3 Type 1) since this Blueprint (an older document format) lacks an explicit birth-type column.
