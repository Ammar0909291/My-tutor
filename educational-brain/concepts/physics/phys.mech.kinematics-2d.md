# Kinematics in Two Dimensions — `phys.mech.kinematics-2d`

## Identity

- **Concept ID**: `phys.mech.kinematics-2d`
- **Display name**: Kinematics in Two Dimensions
- **Domain**: mechanics
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.80
- **Estimated hours**: 5
- **Requires**: `phys.mech.kinematics-1d`, `phys.meas.vector-addition`
- **Unlocks**: `phys.mech.circular-motion`, `phys.mech.projectile-motion`, `phys.mech.relative-motion`, `phys.mech.generalized-coordinates`
- **Load-bearing prerequisite content**:
  - From `phys.mech.kinematics-1d`: the four kinematic equations and the discipline of choosing sign convention before any calculation
  - From `phys.meas.vector-addition`: component decomposition (x and y components are mathematically independent), the Pythagorean reconstruction, and the quadrant-aware arctan rule
  - The independence of x and y motion is the key conceptual transfer from vector addition; without it a learner treats 2D as 1D with a "diagonal variable"

---

## Mental models (4-stage progression)

**Stage 1 — Beginner**: Two-dimensional motion is one-dimensional motion that happens to be "diagonal." A ball thrown sideways moves forward and down at the same time, and those are just two separate motions that share the same stopwatch. The word "component" means the shadow the ball's path casts on each axis.

**Stage 2 — Intermediate**: The x-component and y-component of motion are completely independent physical processes that happen to share a clock. Any force that acts only along x changes only x-motion; only-y force changes only y-motion. Each axis obeys its own set of kinematic equations simultaneously, linked only through time t. Vectors in 2D are not one number but a pair (aₓ, aᵧ), and finding the magnitude or direction of the resultant is a final reconstruction step after the physics is done.

**Stage 3 — Advanced**: Kinematics in 2D is the projection of the vector kinematic equation **r**(t) = **r₀** + **v₀**t + ½**a**t² onto a coordinate basis. The choice of x–y axes is arbitrary but should be made to exploit the geometry (one axis parallel to acceleration simplifies one equation to zero acceleration). Rotation of frame, oblique coordinates, and the transition to polar coordinates (needed for circular motion) all follow from this projection principle. Position, velocity, and acceleration are all vector fields; the time derivative of each gives the next.

**Stage 4 — Expert / University**: Full treatment uses position vector **r**(t) with velocity **v** = d**r**/dt and acceleration **a** = d**v**/dt as vector differential equations. In a uniform gravitational field, **a** is constant, so the trajectory is a conic section (parabola for finite range, ellipse for orbital motion). Curvilinear coordinate systems (polar, cylindrical, spherical) emerge when the symmetry of the problem makes them the natural basis.

**Model versioning**: Stage 1 is sufficient for first encounters; Stage 2 is the operative model for all standard problems; Stage 3 is required before circular motion and relative motion; Stage 4 is the university mechanics target.

---

## Why beginners fail

The dominant root cause is **axis conflation**: treating the x and y motion as two parts of one equation rather than two separate equations linked only by t. A learner with this misconception writes a single "2D kinematic equation," tries to substitute a diagonal initial velocity as one number, and gets confused when the equation produces wrong answers. The sub-root cause is that 1D kinematics can be done by treating all motion as one number (with sign); 2D demands a qualitative shift to pairs of numbers.

The second root cause is **component sign errors at setup**: even learners who decompose correctly often flip the sign on one component (usually by defining positive-x as the direction of horizontal motion but forgetting to apply a consistent positive-y direction for vertical). Both axes need the sign convention written before any numbers are substituted.

A third root cause is **time confusion**: students sometimes use a different t for x and y, forgetting that both motions share the same physical clock.

---

## Misconception library

**M1 — "The total speed at any instant is √(vₓ² + vᵧ²) but I can use v₀ in the 1D kinematic equations"**
- Characteristic phrase: "The velocity is 20 m/s at 30°, so I'll use 20 in the equation."
- Probe: "A ball is launched at 20 m/s at 30° above horizontal. What acceleration does it experience horizontally?"
- Expected wrong answer: uses 20 m/s in the vertical equation or applies full acceleration to the combined speed.
- Recovery: decompose first — vₓ = 20 cos 30°, vᵧ = 20 sin 30° — then each axis gets its own initial velocity and its own kinematic equation.

**M2 — "The x-axis and y-axis share the same acceleration"**
- Characteristic phrase: "g acts on the whole ball, so both x and y equations have g in them."
- Probe: "Write the kinematic equations for the x and y motion of a projectile in free fall." Watch for g appearing in the x equation.
- Recovery: draw a free-body diagram. The only force is gravity — it points straight down (−y). There is no horizontal force, so aₓ = 0. Each axis only contains the acceleration component along that axis.

**M3 — "x and y motions use separate time values"**
- Characteristic phrase: "I found t = 2 s from the y equation, but I need to find a different t for x."
- Probe: "A ball is in the air for 2 s. How far does it travel horizontally?" Watch for attempts to calculate a new time for the horizontal equation.
- Recovery: time is a shared clock. The same t = 2 s applies to the x equation. The ball doesn't have two clocks; it has one.

**M4 — "Final reconstruction is optional — the answer is just vₓ or vᵧ"**
- Characteristic phrase: "The horizontal velocity at impact is 15 m/s, so the speed at impact is 15 m/s."
- Probe: "A projectile hits the ground with vₓ = 15 m/s and vᵧ = −20 m/s. What is its speed and direction?"
- Expected wrong answer: reports 15 m/s or 20 m/s.
- Recovery: the final physical quantity (speed, direction, displacement magnitude) requires vector reconstruction — |**v**| = √(vₓ² + vᵧ²), θ = arctan(vᵧ/vₓ) with quadrant check.

---

## Explanation library

**E1 — The two-clock thought experiment (conceptual entry)**
Imagine you have a toy car on a track running east at constant speed, and someone picks up the track and carries it north at constant speed while you watch. The car moves northeast. The eastward motion obeys its own equations; the northward motion obeys its own equations. They share the same stopwatch. This is 2D kinematics: two independent 1D problems sharing t.

**E2 — Axis setup protocol (procedural)**
Before writing any equation: (1) draw the coordinate axes, (2) label positive direction for each axis, (3) decompose every vector into components along those axes, (4) write two separate sets of equations — one for x, one for y — each with its own initial position, velocity, and acceleration. Only at the end, reconstruct magnitude and direction from the components.

**E3 — Why time links them (deep conceptual)**
Position x(t) and position y(t) are both functions of the same variable t. If you eliminate t between x(t) and y(t) you get the shape of the trajectory (e.g., a parabola for constant vertical acceleration and constant horizontal velocity). Time is the parameter that traces the trajectory; the two axes are projections.

---

## Analogy library

**Primary analogy — The two-rower model**
Two rowers, one dedicated to rowing north, one dedicated to rowing east, both sitting in the same boat. Each rower obeys their own separate set of rowing rules (each axis's kinematic equations). But they are in the same boat, so time is shared. What you see from the bank is the combined diagonal motion, but inside the boat there are always two separate, independent operations.

**Breaking point**: The analogy breaks when acceleration is applied at an angle — then both rowers receive a component of the push, and the decomposition must be done on the acceleration too, not just the initial velocity.

**Anti-analogy — "Diagonal speed"**
Do NOT frame the total speed of 20 m/s as "the speed for the equations." The 20 m/s is the magnitude of the initial velocity vector; once you start solving, you must use its x and y components separately. The number 20 disappears from the working equations until the very end, when you may need it only for a consistency check.

---

## Demonstration library

**D1 — Horizontal launch vs. drop (the independence demo)**
Hold one ball at table height with your hand extended horizontally, and drop a second ball straight down from the same height at the same instant you push the first ball horizontally off the table. Both hit the floor at the same time (within experimental uncertainty). This directly proves vertical motion is independent of horizontal motion: horizontal push added no vertical velocity and changed no vertical time.

*Materials*: two balls of similar mass, smooth table, audio recording to hear simultaneous hits. Can be done with a simultaneous-drop apparatus or by flicking one and dropping another.

**D2 — Strobe photograph analysis (component reading)**
Show a strobe photo or simulation of a ball thrown at an angle. Mark the position dots. Measure horizontal spacing between dots (should be constant — no horizontal acceleration) and vertical spacing (should be increasing — constant downward acceleration). This reveals both axes behaving according to their separate kinematic rules, visible in one image.

**D3 — Whiteboard axis setup drill**
Give a vector at 37° above horizontal with magnitude 25 m/s. Demand that the learner, before any calculation: (1) draw the axes, (2) write the sign convention, (3) compute vₓ = 25 cos 37° and vᵧ = 25 sin 37°, (4) state aₓ and aᵧ for free fall. This procedural drill builds the axis-setup habit before numerical problems begin.

---

## Discovery lesson

**Argue for guided discovery** (appropriate for proficient-level concept requiring procedural transfer from prior knowledge):

The learner already has both pieces: 1D kinematic equations and vector component decomposition. The discovery task is recognising that these two pieces combine. Present a 2D trajectory (strobe image of a ball thrown sideways) and ask: "Does the horizontal spacing between flashes change? Does the vertical spacing?" Let the learner identify that horizontal is constant and vertical is increasing. Then ask: "What 1D kinematic scenario has constant velocity? What has constant acceleration?" The learner should connect horizontal → zero-acceleration kinematics, vertical → constant-downward-acceleration kinematics. The tutor then makes explicit: each axis is a separate 1D problem; t is the link.

This discovery works here because both prerequisites are genuinely understood and the new insight is a *connection* between them, not a new concept. If the learner has not yet mastered vector decomposition or the kinematic equations independently, switch to direct instruction with heavy scaffolding.

---

## Teaching actions

**TA1 — Component isolation gate**: Before any 2D problem, insist on seeing the two-axis setup in writing. Do not accept a learner beginning with the magnitude of the initial velocity; send them back to write (v₀ₓ, v₀ᵧ) and (aₓ, aᵧ) explicitly.

**TA2 — Axis-labelling ritual**: Require the learner to draw coordinate axes and write "positive x = right, positive y = up" (or their chosen convention) on every problem. This prevents the silent sign-convention errors that produce wrong answers without any detectable algebra error.

**TA3 — Shared-clock emphasis**: Whenever a learner solves the y-equation for t and then writes "now I need to find t for x," interrupt immediately: "You already found t. Time is shared. Use t = [whatever] in the x equation now."

**TA4 — Reconstruction checkpoint**: After the learner finds vₓ and vᵧ (or xₓ and yᵧ), always ask: "Is the question asking for a component or the full vector?" If the full vector, demand the Pythagorean reconstruction and the arctan with quadrant check before accepting the answer.

**TA5 — Bridge from 1D (entry ramp)**: For first encounters with 2D, start with the horizontal-launch case (initial vᵧ = 0) so the decomposition step is trivial. This lets the learner focus on the shared-clock and separate-equation ideas before the decomposition adds cognitive load.

---

## Voice teaching

> "Before we write a single number, I want you to do one thing: draw me two axes and tell me which direction is positive on each one. Go ahead. … Great. Now, this initial velocity — 20 m/s at 30° — split it. What's the x-part? What's the y-part? … Those two numbers — those are the only ones that go into your equations. The 20 disappears. You now have two separate motion problems sitting in front of you, and they share a clock. Solve the y-problem for t, and then use that same t in the x-problem. At the very end, if the question asks for speed or direction, reconstruct from your x and y answers. Never from the middle."

> "Here's the thing about the x and y directions — they're completely deaf to each other. The ball doesn't know it's also moving sideways while it's falling. Gravity only talks to the y-motion. Horizontal only keeps going because nothing stops it. They share time, but they don't share forces or equations. If that feels strange, do the simultaneous-drop experiment: push one ball sideways off a table; drop another straight down. Same height, same release instant — they land together. Horizontal motion added exactly zero to the fall time."

---

## Assessment

**Mastery gate**: The learner can set up the two-axis equation system from scratch, solve for t from one axis, substitute into the other, and reconstruct magnitude and direction of the result — for problems with both initial velocity at an angle and uniform acceleration — without prompting.

**Formative golden probe (misconception targeting)**
> "A ball is kicked at 15 m/s at 40° above horizontal on level ground. (a) What are the horizontal and vertical components of the initial velocity? (b) What is the horizontal acceleration? (c) What is the vertical acceleration? (d) Write the x-position and y-position equations. (e) How long is the ball in the air? (f) How far does it travel horizontally?"

All six sub-questions must be answered correctly. Parts (a)–(d) catch M1, M2, and M3 before any solving. Part (e) uses the y equation alone. Part (f) uses the t from (e) in the x equation — catching shared-clock confusion.

**Confidence calibration question**
After completing the probe: "How confident are you that you set up the axes and components correctly before you started solving?" (1 = guessed, 5 = certain). Compare stated confidence to correctness of (a)–(d) to detect calibration gap.

**Delayed retrieval check (48 h / 7 days)**
"A ball is thrown horizontally at 12 m/s from a cliff 45 m high. How far from the base of the cliff does it land?" (No angle decomposition needed, so this targets the shared-clock and separate-equation ideas in isolation.)

---

## Recovery notes

**Failure mode A — Axis conflation persists after explanation**
Go back to D1 (simultaneous drop). Do the physical demonstration if possible; use a simulation if not. The perceptual experience of both balls hitting simultaneously is more convincing than algebra. Only after the learner says "they really do land at the same time" proceed to the equations.

**Failure mode B — Component calculation correct, algebra wrong**
Check sign conventions first — this is almost always a sign error from an unlabelled axis. Require the learner to write the sign convention explicitly, rewrite the equations with signs, and re-solve. Do not re-explain the concept; this is a procedure error.

**Failure mode C — Gets t from y, forgets to use it in x**
Interrupt the solving process just after t is found: "Stop there. t = 2 s. Now, without solving anything new, what does the x-position equation look like with t = 2 s substituted?" Force the substitution before the learner moves to reconstruction. This is a working-memory management issue, not a conceptual error; teach the habit of immediate cross-substitution.

**Failure mode D — Reconstruction absent (reports component as answer)**
Ask: "Is 15 m/s the answer to 'how fast is the ball moving' or 'how fast is it moving horizontally'?" Usually the learner recognises the difference once it is made explicit. Then show the Pythagorean step.

---

## Memory & review

**Memory type**: Schema + procedure (the axis-setup protocol must become automatic; the component-independence principle must be a lasting schema).

**Spaced retrieval schedule**: Day 1, Day 3, Day 7, Day 21.

**Retrieval prompts**:
- "What two prerequisites must you satisfy before writing any kinematic equation in 2D?" (axis labelling, component decomposition)
- "If you solve the y equation and find t = 3 s, what value of t do you use in the x equation?"
- "A ball is launched at 25 m/s at 53°. What are vₓ and vᵧ? What are aₓ and aᵧ during free flight?"
- "After solving for xₓ and yᵧ, when do you need the Pythagorean theorem?"

**Interleaving**: After mastery, mix 1D and 2D problems so the learner must first classify "is this 1D or 2D?" before setting up equations. Failure to classify is itself a retrieval prompt for the axis-setup gate.

---

## Transfer map

**Immediate transfers** (unlocked by this concept):
- `phys.mech.projectile-motion` — special case with aₓ = 0, aᵧ = −g, first worked application of the 2D framework
- `phys.mech.circular-motion` — requires polar components, the next coordinate-system extension
- `phys.mech.relative-motion` — adds velocity addition at the vector level, directly built on the 2D velocity framework

**Downstream transfers**:
- `phys.mech.generalized-coordinates` — the formal generalization of "choose your axes to fit the geometry"
- Inclined plane problems — the most common "choose axes along and perpendicular to the incline" application
- Orbital mechanics — 2D kinematics in polar form with gravity as centripetal force

**Cross-subject transfers**:
- `math` — parametric curves: x(t), y(t) is the mathematical identity of a 2D trajectory
- `cs` — game physics engines decompose velocity into components and integrate each axis separately; this concept IS the game physics loop

---

## Curriculum feedback

The KG requires `phys.meas.vector-addition` as a prerequisite, which is correct and essential. The KG does not list `phys.meas.scalars-vectors` as a prerequisite, but in practice a learner needs the scalar/vector distinction to understand why the x and y components are vectors that add by components and not scalars that add arithmetically. Consider adding `phys.meas.scalars-vectors` as a transitive prerequisite here or confirming it is already required by `phys.meas.vector-addition` (which it is — so the chain is satisfied).

The `phys.mech.generalized-coordinates` unlock is correctly placed here; the axis-choice principle taught in this concept is the conceptual seed for generalized coordinates.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
