# math.trig.trig-equations

## Identity
- **KG id**: `math.trig.trig-equations`
- **Domain**: math.trig
- **Requires**: `math.trig.trig-identities`, `math.trig.inverse-trig`
- **Unlocks**: none
- **Cross-links**: none
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 10

## Learning Objective
Solve a trigonometric equation for ALL solutions in a given interval (or in general form), using a
four-step algorithm — isolate the trig function, find the reference angle via its inverse, identify
every quadrant that also satisfies the equation, then write every solution the interval allows —
rather than stopping at the single value a calculator's inverse function returns.

## Core Understanding
`math.trig.inverse-trig` gave the tool that recovers ONE angle from a trig value — the principal
value, chosen by convention to lie in a restricted range. A trig EQUATION asks a different
question: not "what angle does the inverse function return," but "what are ALL angles that satisfy
this relationship." Because sine, cosine, and tangent are periodic and (except at their extremes)
each takes a given value at more than one angle per period, an equation like $\sin\theta = 0.5$ has
infinitely many solutions in general, and typically two or more within any single period.

The reliable procedure has four steps. First, isolate the trig function algebraically exactly as
one isolates a variable — get the equation into the form $\sin\theta = k$, $\cos\theta = k$, or
$\tan\theta = k$. Second, apply the appropriate inverse function to find the reference angle — the
principal value, always in the inverse function's fixed range. Third, use the ASTC rule (All
positive in QI, Sine positive in QII, Tangent positive in QIII, Cosine positive in QIV — from
`math.trig.unit-circle`'s own sign pattern) to identify every quadrant where the ORIGINAL equation
is also satisfied, and construct the angle in each such quadrant from the reference angle. Fourth,
write every solution within the required interval, using the function's period to generate
additional solutions if the interval extends beyond one period (general solution notation:
$\theta = \alpha + 2k\pi$ or $\theta = \pi - \alpha + 2k\pi$ for sine, for integer $k$, or the
equivalent for cosine/tangent).

A composite argument — $\sin(2\theta) = k$ rather than $\sin\theta = k$ — requires one extra piece
of care: before dividing by the coefficient of $\theta$, the working interval must be WIDENED by
that same factor (if $\theta \in [0, 2\pi)$, then $2\theta \in [0, 4\pi)$), so that no solutions are
lost when the division is finally performed. And whenever an equation is solved by SQUARING both
sides (a technique sometimes needed to eliminate a square root or combine terms), every resulting
candidate must be checked against the ORIGINAL equation, since squaring can introduce extraneous
roots that satisfy the squared equation but not the one actually asked.

## Mental Models
- **"One value, or all values — a different question needs a different tool."** The inverse
  function answers "what is A angle"; the equation asks "what are ALL angles" — using only the
  inverse function's output answers the wrong question.
- **"ASTC turns one reference angle into every solution in a period."** The reference angle is the
  raw material; the quadrant rule is what turns it into the complete set.
- **"Squaring can manufacture solutions that were never real — always check against the original."**

## Why Students Fail
- **MC-1 (Type 1, overgeneralization)**: treating the calculator's inverse-function output as THE
  answer, since every earlier context (`math.trig.inverse-trig`) trained "apply the inverse
  function, get the answer" — overgeneralized into an equation-solving context where it is
  incomplete by construction.
- **MC-2 (Type 1, overgeneralization)**: for `tan`, using period $2\pi$ (borrowed from sine/cosine)
  instead of $\pi$; for a composite argument $\sin(n\theta)$, generating solutions with period
  $2\pi$ instead of the argument's own period $2\pi/n$ — overgeneralizing the single-argument
  period onto every trig equation.
- **MC-3 (Type 5, instruction-induced)**: solving by squaring without checking the result against
  the original equation, since the "isolate and solve" habit from ordinary algebra rarely surfaces
  the need for this check, and it is easy to omit when not explicitly cued.
- **MC-4 (Type 1, overgeneralization)**: for a composite argument, applying the interval bound to
  $\theta$ without first widening it for $n\theta$ — carrying over the "the interval bounds the
  variable" habit from single-argument equations, silently discarding legitimate solutions.

## Misconceptions

### MC-1: ONLY-PRINCIPAL-VALUE
- **Surface form**: "$\sin\theta = 0.5 \Rightarrow \theta = \sin^{-1}(0.5) = 30°$" stated as the
  complete answer, with no second solution given.
- **Frequency band**: Foundational — the Blueprint notes this single misconception accounts for
  roughly half of all missing-solution errors on this concept.
- **Root cause (Type 1)**: the inverse function is a genuinely single-valued function by
  construction (`math.trig.inverse-trig`'s own restricted-range convention), and every practiced
  example up to this point asked "find AN angle," never "find ALL angles" — the habit transfers
  wholesale into a context where it silently loses information.
- **Repair**: return to the unit circle and mark BOTH points where $y = 0.5$ — $30°$ and $150°$ —
  showing visually that the inverse function's convention picked only one of two genuinely valid
  intersections.

### MC-2: WRONG-PERIOD-MULTIPLE
- **Surface form**: writing $\theta = 30° + 360°k$ for a tangent equation (should be $180°k$), or
  generating solutions to $\sin(2\theta) = 0.5$ with period $360°$ instead of $180°$.
- **Frequency band**: High.
- **Root cause (Type 1)**: sine and cosine's shared period $2\pi$ becomes the assumed default
  period for every trig function and every composite argument, overriding the case-specific period
  each actually carries.
- **Repair**: graph the specific function in question over two full periods and read the period
  directly off the graph before writing the general solution — never assume it without checking.

### MC-3: EXTRANEOUS-UNCHECKED
- **Surface form**: squaring $\sin\theta = 1 - \cos\theta$ to combine with $\sin^2+\cos^2=1$,
  solving the resulting equation, and reporting every algebraic root without checking each against
  the un-squared original.
- **Frequency band**: Moderate.
- **Root cause (Type 5)**: the "isolate, apply the inverse operation, get the answer" template from
  ordinary equation-solving carries no built-in verification step, and squaring's extraneous-root
  risk is a subtlety rarely dramatized with a concrete counterexample before it causes an error.
- **Repair**: substitute each algebraic root back into the ORIGINAL (unsquared) equation and reject
  any that fail — framed as identical in spirit to checking a squared-radical equation for
  extraneous roots.

### MC-4: INTERVAL-OVERSHOOT
- **Surface form**: solving $\sin(2\theta) = 0.5$ for $\theta \in [0°, 360°)$ by dividing the
  reference-angle-plus-period solutions for $2\theta$ by 2 immediately, without first finding all
  solutions for $2\theta$ across the WIDENED interval $[0°, 720°)$.
- **Frequency band**: Moderate to High, concentrated on composite-argument equations.
- **Root cause (Type 1)**: overgeneralizing "the given interval bounds the variable in the
  equation" from single-argument equations, where the variable being solved for and the argument
  of the trig function are the same symbol, into composite-argument equations where they are not.
- **Repair**: substitute $u = 2\theta$ explicitly, solve for $u$ over the correctly widened
  interval, THEN divide by 2 and check the resulting $\theta$ values against the original interval
  — making the widening a required, visible algebraic step rather than a mental adjustment.

## Analogies
- **The "one door, many rooms" analogy**: the inverse function opens exactly one door into the
  answer; ASTC and the period reveal that there are several rooms behind different doors, all
  reachable from that one opened door.
- **Anti-analogy**: a trig equation is NOT "the same as" a linear equation with one root — the
  periodicity that makes trig functions useful for modeling cyclic phenomena is exactly what
  guarantees multiple solutions, and treating the equation as if it had the uniqueness of a linear
  equation is the single largest source of error on this concept.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: solve $\sin\theta = 0.5$ on the unit circle, marking both
  intersection points before ever invoking the inverse function symbol — establish "two solutions
  exist" as a visual fact before introducing the algorithm that finds them.
- **Demonstration 2 (targets MC-2)**: graph $y = \tan\theta$ and $y = \sin(2\theta)$ side by side
  with $y = \sin\theta$, reading each function's period directly from its graph, before solving any
  equation involving them.
- **Demonstration 3 (targets MC-3)**: solve a deliberately constructed squaring example where one
  algebraic root is genuinely extraneous, showing the failed check explicitly.
- **Demonstration 4 (targets MC-4)**: solve $\sin(2\theta) = 0.5$ two ways side by side — correctly
  (widen, solve, divide, filter) and incorrectly (divide the interval first) — and show the
  incorrect method silently loses a valid solution.

## Discovery Questions
1. "If a calculator says $\sin^{-1}(0.5) = 30°$, is $30°$ the ONLY angle whose sine is $0.5$? How
   would you check?"
2. "Does $\tan\theta$ repeat every $360°$, the same as $\sin\theta$? Graph both and compare."
3. "If squaring both sides of an equation can never make a false statement true, why would a root
   found this way ever need to be checked?"
4. "If $\theta$ must lie in $[0°, 360°)$, what values CAN $2\theta$ take? Is that range the same as
   $[0°, 360°)$?"

## Teaching Sequence
1. **Anchor**: connect to `math.trig.inverse-trig`'s single-value convention — name explicitly that
   an equation asks a broader question than the inverse function alone answers.
2. **Representation shift**: move from the inverse-function symbol to the unit-circle picture,
   where "how many points satisfy this" is visually answerable.
3. **Algorithm walkthrough**: isolate, find the reference angle, apply ASTC, write the general or
   interval-bounded solution set — narrated as four distinct, always-performed steps.
4. **Conflict evidence**: the four demonstrations above, each isolating one misconception.
5. **Mastery gate**: pose a composite-argument equation over a stated interval and require every
   solution, with the extraneous-root check demonstrated on a squaring-type equation.

## Tutor Actions
- Never accept a single value as "the answer" to a trig equation without asking "are there other
  angles that also work?"
- When a composite argument appears, explicitly prompt for the widened interval before any
  division step is taken.
- When squaring is used to solve, explicitly prompt for the back-substitution check before
  accepting any root.

## Voice Teaching Notes
- Speak the reference-angle-then-quadrants sequence as one continuous four-beat rhythm: "isolate —
  find the reference angle — check every quadrant — write every solution" — so the four steps are
  heard as an inseparable procedure, not four optional add-ons.
- When a learner stops after the inverse function's output, ask "is that the only angle on the
  circle where this is true?" rather than immediately supplying the missing solution.

## Assessment Signals
- **Rung 1 (recognition)**: learner states that a trig equation generally has more than one
  solution before being asked to find them.
- **Rung 2 (application)**: learner correctly finds all solutions to a single-argument equation in
  a given interval.
- **Rung 3 (transfer)**: learner correctly handles a composite-argument equation, widening the
  interval before dividing, and correctly checks a squaring-derived root against the original
  equation.

## Tutor Recovery Strategy
- If MC-1 recurs, return to the unit-circle demonstration and have the learner physically locate
  every intersection point before touching the inverse-function algorithm.
- If MC-2 recurs, require the learner to graph the specific function and read its period before
  attempting the equation.
- If MC-4 recurs, require the explicit substitution $u = n\theta$ as a mandatory written step,
  never performed mentally.

## Memory Hooks
- "Inverse gives ONE; ASTC gives ALL."
- "Widen before you divide."
- "Squared it? Check it."

## Transfer Connections
- `math.trig.trig-identities` (already authored): the algebraic manipulation used to isolate a
  single trig function often relies on an identity to combine or simplify terms first.
- `math.trig.inverse-trig` (already authored): supplies the reference-angle-finding step directly;
  this concept is the context in which that tool's single-valued limitation becomes visible and
  must be compensated for.

## Cross-Subject Connections
- None formal. The Blueprint's own transfer probe (a periodic city-temperature model,
  $T(t) = 12 + 8\sin(2\pi t/365 - \pi/2)$, solved for a target temperature) illustrates an
  application to periodic real-world modeling but introduces no cross-subject KG dependency.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.trig.trig-equations.md`, reused by reference
  for its four-step algorithm, general-solution notation, composite-argument interval-widening
  rule, and its four-misconception registry (independently birth-type-classified above, since the
  Blueprint carries no birth-type column).
- Worked examples cited by reference, not restated: the temperature-model transfer probe.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer — that is
  either live-capture (ADR 14 Phase 2/3) or a future deliberate seeding batch, per this program's
  established layer-ownership boundary.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy** on the substantive fields: `requires`, `difficulty`,
  `bloom`, `mastery_threshold`, and `estimated_hours` all match exactly between the Blueprint and
  the live KG.
- The Blueprint's own prose describes a forward-looking "Unlocks: Advanced sinusoidal modeling
  applications" note that names no concrete KG concept id. Per this program's established
  precedent (Batch 61's `math.trig.half-angle-formulas`), this vague prose is correctly NOT treated
  as a discrepancy against the KG's actual `unlocks: []` field — a discrepancy requires a concrete,
  named KG concept id to compare against, which this prose does not supply.
- This Blueprint carries FOUR misconceptions rather than the more typical three — all four are
  retained and independently classified above, since trimming to three would discard genuine,
  distinctly-caused content the Blueprint itself documents.

## Version History
- 2026-09-13 (Batch 62): authored. Unblocked by `math.trig.trig-identities` (Batch 20/21 era) and
  `math.trig.inverse-trig` (Batch 55). Companion batch concepts: `math.calc.partial-fractions`,
  `math.seq.recursive-sequences`, `math.seq.infinite-geometric-series`. `math.trig` moves from
  21/25 toward 22/25 this batch.
