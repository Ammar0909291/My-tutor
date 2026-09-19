# math.de.slope-field

## Identity
- **KG id**: `math.de.slope-field`
- **Domain**: math.de
- **Requires**: `math.de.first-order-ode`
- **Unlocks**: `math.de.phase-plane`
- **Cross-links**: none
- **Difficulty**: advanced
- **Bloom level**: understand
- **Mastery threshold**: 0.85
- **Estimated hours**: 2

## Learning Objective
Construct a slope field for $y'=f(x,y)$ by evaluating $f(x,y)$ (the PRESCRIBED SLOPE, computable
DIRECTLY from the ODE, never requiring solving first) at a grid of points and drawing a segment of
that slope at each; sketch an approximate solution curve by following the LOCAL tangent direction
CONTINUOUSLY along the curve (never just matching the initial slope alone); and use the slope
field's pattern to predict QUALITATIVE long-run behavior WITHOUT solving the ODE algebraically,
recognizing slope fields as valuable specifically when explicit solving techniques fail or aren't
needed.

## Core Understanding
THE ODE'S OWN RIGHT-HAND SIDE $f(x,y)$ ALREADY IS THE SLOPE FORMULA — CONSTRUCTION NEEDS NO
SOLVING: for $y'=x-y$: computing the slope directly at $(0,0)$: $0-0=0$ (horizontal); at $(1,0)$:
$1-0=1$; at $(0,1)$: $0-1=-1$; at $(2,2)$: $2-2=0$ (horizontal again) — each value obtained by
PLUGGING INTO the ODE's own right-hand side, with zero algebraic solving performed. Slope-field
construction is a purely computational procedure.

A SKETCHED SOLUTION MUST STAY TANGENT TO THE FIELD AT EVERY POINT — NEVER JUST AT THE START:
sketching through $(0,2)$ for $y'=x-y$: the initial slope is $f(0,2)=0-2=-2$ (steeply
decreasing) — but the curve must CONTINUOUSLY re-check and follow the UPDATED local slope at
every new position along its path, exactly matching the definition of a solution ($y'(x)=f(x,y(x))$
at EVERY point it passes through), not merely start in the right direction and wander freely
afterward.

QUALITATIVE LONG-RUN BEHAVIOR IS READABLE DIRECTLY FROM THE PICTURE — NEVER REQUIRING EXPLICIT
SOLVING FIRST: examining the SAME slope field for $y'=x-y$ near the line $y=x$ (where $f=0$,
giving horizontal segments): solutions starting ABOVE this line ($f<0$, segments point downward)
get pulled DOWN toward it; solutions starting BELOW it ($f>0$, segments point upward) get pulled
UP toward it — revealing directly from the PICTURE, with zero algebra, that ALL solutions
qualitatively approach $y=x$ as $x$ grows. This is genuinely valuable precisely when an equation
resists the standard solving techniques (separable, integrating factor, exact, Bernoulli).

## Mental Models
- **"The ODE's right-hand side already tells you the slope everywhere — drawing the field is pure
  evaluation, never solving."**
- **"A solution curve must stay tangent to the field continuously along its whole path — matching
  the direction only at the start is not enough."**

## Why Students Fail

### MC-1: SLOPE-FIELD-ASSUMED-TO-REQUIRE-SOLVING-FIRST
- **Surface form**: believes constructing a slope field requires first solving the ODE.
- **Birth type**: Foundational severity (Blueprint's own declared severity — "understanding a
  solution's behavior" feels like it should require actually finding the solution first).
- **Repair**: re-walk the direct point-by-point slope computation for $y'=x-y$, confirming no
  solving occurs.

### MC-2: SOLUTION-SKETCH-ASSUMED-ONLY-NEEDS-INITIAL-TANGENCY
- **Surface form**: believes a sketched solution curve only needs to match the slope field's
  direction at its starting point.
- **Birth type**: High severity (Blueprint's own declared severity — the initial condition is the
  most salient piece of information, and continuous tangency along the whole path is easy to
  overlook).
- **Repair**: re-walk the continuous tangent-following sketch through $(0,2)$, re-checking the
  local slope at each new position.

### MC-3: QUALITATIVE-BEHAVIOR-ASSUMED-TO-REQUIRE-EXPLICIT-SOLVING
- **Surface form**: believes reading qualitative long-run behavior from a slope field requires
  first solving the ODE explicitly.
- **Birth type**: Moderate severity (Blueprint's own declared severity — "predicting behavior"
  intuitively suggests needing an explicit formula to reason from).
- **Repair**: re-walk the picture-based reading of convergence toward $y=x$, obtained with zero
  algebraic solving.

## Misconceptions

### MC-1: SLOPE-FIELD-ASSUMED-TO-REQUIRE-SOLVING-FIRST
- **Surface form**: as described above.
- **Root cause (Foundational)**: as described above.
- **Repair**: as described above.

### MC-2: SOLUTION-SKETCH-ASSUMED-ONLY-NEEDS-INITIAL-TANGENCY
- **Surface form**: as described above.
- **Root cause (High)**: as described above.
- **Repair**: as described above.

### MC-3: QUALITATIVE-BEHAVIOR-ASSUMED-TO-REQUIRE-EXPLICIT-SOLVING
- **Surface form**: as described above.
- **Root cause (Moderate)**: as described above.
- **Repair**: as described above.

## Analogies
- **"A slope field is like a wind map — you can trace a leaf's likely path just by following the
  local wind direction everywhere it goes, without ever computing an exact trajectory formula."**
- **Anti-analogy**: following a slope field is NOT like setting an initial heading and coasting —
  the direction must be re-checked and followed continuously, since the "wind" changes at every
  point.

## Demonstrations
- **Demonstration 1 (targets MC-1)**: the direct point-by-point slope computation for $y'=x-y$ at
  $(0,0),(1,0),(0,1),(2,2)$.
- **Demonstration 2 (targets MC-2)**: the continuous tangent-following sketch through $(0,2)$,
  re-checking the local slope at each new position.
- **Demonstration 3 (targets MC-3)**: the picture-based reading of convergence toward $y=x$ from
  the same slope field's horizontal-segment pattern.

## Discovery Questions
1. "Does constructing a slope field require first solving the ODE, or can the slopes be computed
   directly from f(x,y)?"
2. "Does sketching an approximate solution only require matching the slope-field direction at the
   starting point, or must it stay tangent continuously along the entire path?"
3. "Can qualitative long-run behavior be read directly from a slope field's picture, or does it
   require solving the ODE explicitly first?"

## Teaching Sequence
1. **Representation shift**: the direct computational construction, working Demonstration 1,
   isolating MC-1.
2. **Conflict evidence**: the continuous tangent-following sketch, working Demonstration 2,
   isolating MC-2.
3. **Contrast pair**: the picture-based qualitative reading versus explicit solving, working
   Demonstration 3, isolating MC-3.
4. **Mastery gate**: require a correct point-by-point slope computation, a correctly described
   continuous tangent-following sketch, and a correct qualitative long-run prediction read
   directly from a slope field, at the Blueprint's own stated MAMR of 5/5.

## Tutor Actions
- Never accept a claim that slope-field construction requires solving the ODE first.
- Never accept a sketched solution curve that only matches the field's direction at its starting
  point.
- Never accept qualitative behavior described as requiring explicit solving before it can be read
  from the picture.

## Voice Teaching Notes
- Say "can you compute that slope directly from the equation, without solving anything?" whenever
  a slope field is constructed.
- When sketching a solution, ask "are you re-checking the slope at each new point, or just
  following the initial direction?"

## Assessment Signals
- **Rung 1 (recognition)**: learner correctly computes slope-field values at several points
  directly from the ODE.
- **Rung 2 (application)**: learner correctly sketches an approximate solution curve, explaining
  the continuous tangent-following process.
- **Rung 3 (transfer)**: learner correctly uses a slope field to predict qualitative long-run
  behavior for an ODE that resists standard explicit solving techniques.

## Tutor Recovery Strategy
- If MC-1 recurs, re-walk the direct point-by-point slope computation.
- If MC-2 recurs, re-walk the continuous tangent-following sketch.
- If MC-3 recurs, re-walk the picture-based convergence reading.

## Memory Hooks
- "The ODE's right side already is the slope — drawing the field is pure evaluation."
- "A solution must stay tangent everywhere along its path, not just at the start."
- "Qualitative behavior is readable from the picture — no explicit solving required."

## Transfer Connections
- `math.de.first-order-ode` (already authored, certified domain): supplies the standard form
  $y'=f(x,y)$ this concept's slope computation directly uses, and the solution definition this
  concept's tangent-following sketch directly instantiates.
- `math.de.phase-plane` (not yet authored): the KG's declared unlock, extending this concept's
  single-equation slope-field picture to systems of ODEs.
- `math.de.euler-method` (not yet authored): the KG's declared related concept, the numerical
  analog of this concept's visual tangent-following sketch.

## Cross-Subject Connections
- None formal.

## Blueprint References
- Primary Blueprint: `docs/curriculum/blueprints/math.de.slope-field.md`, reused by reference for
  its $y'=x-y$ worked example used consistently across all three learning objectives, and its
  three-misconception registry (severity levels adopted directly as declared).
- Transfer probe: the Blueprint's own independence-mode probe, applying slope fields to a
  population model too complex for explicit solving, identifying stabilization points from the
  field's pattern.

## Runtime Asset References
- No AssetIdentity (Layer 3/7) assets exist for this concept yet. Populating served
  explanation/probe content is out of scope for this Educational Brain authoring layer.

## Curriculum Feedback
- **Zero Blueprint/KG metadata discrepancy**: every stated field (requires
  `math.de.first-order-ode`, unlocks `math.de.phase-plane`, cross_links none, advanced/understand,
  mastery_threshold 0.85, estimated_hours 2) was directly verified against the live KG and matches
  exactly.

## Version History
- 2026-09-19 (Batch 149): authored. Second entry this batch. Companion batch concept:
  `math.de.bernoulli`.
