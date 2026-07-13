# Kinematics in One Dimension — `phys.mech.kinematics-1d`

## Identity

- **Concept ID**: `phys.mech.kinematics-1d`
- **Curriculum location**: physics / classical mechanics
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.mech.acceleration` — the load-bearing part is the signed concept of
    acceleration (Δv/Δt) and the sign convention that gives direction of motion
    and direction of acceleration as independent, signed quantities. Without this,
    the kinematic equations (which use signed displacement, signed velocity, and
    signed acceleration throughout) cannot be applied correctly. The learner must
    also be ready for the idea of CONSTANT acceleration as a special case — this
    is the condition under which all four kinematic equations are valid.
- **Unlocks** (from KG): `phys.mech.kinematics-2d`, `phys.mech.newtons-second-law`,
  `phys.mech.angular-kinematics` — and via Newton's second law, all of classical
  mechanics. This is the first concept where a learner can predict the future state
  of a moving object from its initial conditions — the essence of deterministic
  classical mechanics. Every projectile, every falling object, every car chase
  problem requires these equations.
- **Difficulty**: developing · **Bloom**: apply · **Mastery threshold**: 0.80 ·
  **Est. hours**: 4 · **References**: NCERT Physics Class 11 Ch. 3
- **Learning objectives** — the learner can:
  1. State the four kinematic equations for constant acceleration and identify
     which variables appear in each (to enable choosing the right equation).
  2. Solve for any one unknown given the other three kinematic quantities (u, v,
     a, s, t) using the appropriate equation.
  3. Set up a sign convention for a given problem and apply it consistently —
     choosing positive and negative directions and treating all signed quantities
     accordingly.
  4. Apply the equations to free-fall problems (a = ±g = ±9.8 m/s²), including
     objects thrown upward.

## Mental models

- **Beginner (arriving)**: the kinematic equations are four formulas to memorise
  and "plug numbers into." The signs are an inconvenience — the learner substitutes
  magnitudes and adds or subtracts based on intuition. Each equation is a separate
  tool; no unified understanding of what all four express together.
- **Intermediate**: all four equations are consequences of two definitions (v = Δx/Δt
  and a = Δv/Δt) applied to constant acceleration. The four equations form a
  complete set: given any three of {u, v, a, s, t}, you can find the fourth and
  fifth. The equations use SIGNED quantities throughout — choosing a positive direction
  is the first step, and maintaining that sign convention throughout the problem
  is the key skill. Free fall is just kinematics with a = −g (downward, if up is
  positive).
- **Advanced**: the kinematic equations are the integral of constant acceleration.
  Integrate a = const → v = u + at (velocity). Integrate again → s = ut + ½at²
  (position). The third equation (v² = u² + 2as) follows from eliminating t.
  The fourth (s = (u+v)/2 × t) follows from the definition of average velocity
  for uniform acceleration. A position-time graph for constant acceleration is
  a parabola; a velocity-time graph is a straight line.
- **Expert**: in variable acceleration, the kinematic equations no longer apply —
  integration of a(t) is required (s = ∫∫a dt dt). The kinematic equations are
  exact only for constant acceleration (uniform) and are first-order approximations
  for slowly varying acceleration. In non-Newtonian contexts (relativistic speeds),
  the form of the kinematic equations changes entirely (Lorentz transformation).
- **Versioning note**: install the intermediate model here — four equations as a
  unified set derived from two definitions; signed quantities throughout. Signal
  the advanced model: "these four equations come directly from integrating a = const
  — you'll see this derivation when you study calculus."

## Why beginners fail here

There are three distinct failure modes. First, sign errors: the learner treats
displacement, velocity, and acceleration as magnitudes, substitutes positive
numbers for everything, and adds or subtracts "by feel." This produces wrong
answers for any problem involving deceleration, upward throws, or negative
displacements. Second, equation selection errors: the learner uses the same
equation (usually v = u + at) for every problem, then realises they can't solve
for what's asked because that equation doesn't contain it. Third, the "ball at
the peak" error (from acceleration): the learner treats v = 0 at the peak as
meaning a = 0 also, causing the equations to collapse to wrong solutions.

## Misconception library

**M1 — Plug magnitudes; decide signs at the end by intuition**
- *Why*: sign-convention maintenance is unfamiliar; students have used calculators
  with all-positive inputs for years (type 2 + type 5, instructional omission of
  sign-convention emphasis).
- *Symptom / phrases*: "I know the ball is going up, so I'll put s = positive";
  uses all positive values then says "the answer should be negative because it
  went down"; systematic sign errors throughout problems.
- *Detection probe (verbatim)*: "A ball is thrown upward at 20 m/s. Take upward
  as positive. What is the acceleration?" Wrong: 9.8 m/s² (positive). Correct:
  −9.8 m/s² (gravity acts downward, which is the negative direction). If the
  learner uses +9.8 m/s², M1 is active.
- *Recovery*: enforce the sign convention as the FIRST step. "Step 0: write '+
  direction = ___.' Now assign signs to EVERY quantity before any algebra.
  Never change the sign of an assigned quantity mid-problem." Walk through the
  thrown-ball problem with all steps explicitly signed.
- *Verification*: a problem requiring negative displacement (ball lands below
  starting height) — correct answer requires signed quantities throughout.

**M2 — All four kinematic equations always apply (even when acceleration is not
constant)**
- *Why*: the equations are presented without the constant-acceleration condition,
  or it is stated but not emphasised as the limiting condition (type 5, instructional
  omission).
- *Symptom*: applies v² = u² + 2as to a problem where a rocket engine varies
  its thrust (non-constant acceleration).
- *Detection probe*: "A car accelerates from 0 at an increasing rate. Can you use
  the kinematic equations?" Wrong: "yes, just use v = u + at with the given numbers."
  Correct: "no — the equations require constant acceleration."
- *Recovery*: state the condition at the start of every problem: "constant
  acceleration?" before selecting equations. Present two problems side by side:
  one with constant a (equations apply), one with varying a (integration required).
- *Verification*: four problems — three with constant a (correct to use equations),
  one with varying a (explicitly flag as out-of-scope for these equations).

**M3 — There is one kinematic equation; use it for everything**
- *Why*: v = u + at is the first equation taught and the simplest; learners
  default to it even when the problem doesn't include t (type 5, first-formula fixation).
- *Symptom*: learner circles "find the distance" in the problem, then writes
  v = u + at and says "I need t but it's not given." Does not try v² = u² + 2as.
- *Detection probe*: "A car brakes from 30 m/s to 0 with acceleration −5 m/s².
  How far does it travel? (Time not given.)" Correct: v² = u² + 2as →
  0 = 900 + 2(−5)s → s = 90 m. Wrong approach: start with v = u + at to find t
  first (extra step, but not incorrect — the diagnosis is whether they can identify
  the more direct route).
- *Recovery*: the equation-selection strategy — before writing any equation, list
  the given variables and the unknown. The correct equation is the one that
  contains all the given variables AND the unknown. Teach this as a structured
  algorithm, not a memory task.
  Given → Unknown → choose:
  - u, a, t → v: use v = u + at
  - u, v, a → s or t: use s = ut + ½at² or v² = u² + 2as
  - u, v, t → s or a: use s = (u+v)/2 × t or rearrangements
- *Verification*: 6 problems requiring each of the four equations at least once;
  learner must name the equation before solving.

**M4 — At the peak of an upward throw, acceleration is zero (v = 0 implies a = 0)**
- *Why*: the learner confuses "momentarily at rest" with "not accelerating" —
  the acceleration = velocity fallacy (type 2, perceptual confusion).
- *Symptom*: says "at the top of the throw, v = 0 and a = 0"; then applies
  equations with a = 0 for the downward phase, getting wrong answers.
- *Detection probe*: "A ball is thrown upward. At the highest point, what is
  its velocity? What is its acceleration?" Wrong: both zero. Correct: v = 0,
  a = −9.8 m/s² (gravity acts regardless of instantaneous velocity).
- *Recovery*: "What forces act on the ball at the top of its throw?" (Gravity,
  downward — the same as everywhere else in the flight.) "Does a force cause
  acceleration?" (Yes.) "So is there acceleration at the top?" (Yes — −9.8 m/s².)
  The acceleration never stops; only the velocity is instantaneously zero.
- *Verification*: multi-phase problem (ball thrown up) — compute time to peak,
  height at peak, velocity when returning to start. All require a = −g throughout.

## Explanation library

- **Age 13–15 (build-up)**: "You already know: velocity = displacement / time.
  For constant acceleration: v = u + at (velocity grows linearly with time — this
  is the definition of constant acceleration). Integrate once: the area under the
  v-t graph gives displacement. For a straight line on the v-t graph, the area is
  a trapezoid: s = (u + v)/2 × t. Substituting v = u + at: s = ut + ½at². That's
  three of the four equations — derived, not memorised. The fourth (v² = u² + 2as)
  is obtained by eliminating t between the first and third."
- **Age 15+**: "The four kinematic equations are a complete set for constant
  acceleration. Any three of {u, v, a, s, t} determines the other two. The
  key discipline: signs. Choose a positive direction; assign signs to u, v, a, s.
  Treat every signed quantity as an algebraic symbol throughout. Never change a
  sign based on physical intuition mid-calculation — let the algebra carry the
  sign. If you get a negative displacement at the end, it means the object moved
  in the negative direction."
- **Adult returning**: "These four equations relate the five kinematic quantities
  for an object moving in one dimension with constant acceleration. For every
  problem: (1) write down what's given, (2) write what's unknown, (3) choose the
  equation containing all the given quantities and the unknown. Everything else is
  algebra — but sign discipline is essential."

## Analogy library

- **Best analogy**: a GPS journey planner. You know: starting speed, final speed,
  acceleration rate (engine, brakes). The kinematic equations are the "calculation
  engine" that the GPS uses to determine distance and time. Given any three facts
  about the journey, the other two can be predicted.
  *Breaking point*: real cars don't maintain constant acceleration; kinematic
  equations assume they do. Identify this as an approximation before using it.
- **Alternative**: a financial interest analogy. Starting amount (u), rate of
  change (a = constant interest rate), time (t). Kinematic equations are the
  compound-interest formula equivalents for motion. The connection is real:
  both arise from integrating a constant rate.
  *Breaking point*: financial interest is always positive; kinematic quantities
  are signed. The algebra is analogous; the physical meaning is different.
- **Anti-analogy to avoid**: "just use common sense for the signs." This
  actively installs M1. Signs in kinematics must be algebraic, not intuitive —
  intuition fails for upward throws and deceleration below zero.

## Demonstration library

- **Home, no equipment**: drop a ball from 1 m height. Estimate the time of fall
  (≈ 0.45 s). Predict from s = ut + ½at² (u=0, a=9.8, s=1): t = √(2s/a) = √(2/9.8)
  ≈ 0.45 s. Check with phone timer or slow-motion video. The equation predicts the
  real world — this is the kinematic model working.
- **Teacher demo**: a tape timer (or video with frame analysis). A ball falls,
  leaving marks every 0.1 s. Measure intervals between successive marks — they
  grow linearly (constant acceleration). Compute a from the data. Compare to 9.8 m/s².
- **Interactive**: a simulation with adjustable u, v, a — learner adjusts parameters
  and predicts the trajectory; the simulation verifies. Key prediction: "if a
  doubles and everything else stays fixed, what happens to s?"
- **Prediction before**: "A car brakes from 20 m/s at −4 m/s². How far does it
  travel before stopping?" Write predictions before any calculation (typical
  guesses: "5 m", "50 m", "100 m"). Compute: v² = 0 = 400 + 2(−4)s → s = 50 m.
  The spread of predictions shows the value of the equations.

## Discovery lesson

**Guided discovery** for the derivation (two equations from definitions → other
two by algebra); **direct instruction** for the application strategy.

**Discovery sequence**:
1. *Need*: "We know a = Δv/Δt. Can we predict where an object will be after time t,
   if we know its starting velocity and constant acceleration?"
2. *Playground*: compute position step-by-step in a numerical table (every 1 s).
   Observe: position grows as a parabola; velocity grows linearly. Notice the
   pattern.
3. *Invention*: generalise — v = u + at (from the table's velocity column);
   s = ut + ½at² (from the table's position column, or area under v-t graph).
4. *Algebra*: eliminate t between v = u + at and s = ut + ½at² → v² = u² + 2as.
   Use average velocity = (u+v)/2 for uniform acceleration → s = (u+v)/2 × t.
5. *Formalization*: state all four equations; state the condition (constant a).
6. *Practice*: equation-selection algorithm — given, unknown, choose equation.

## Teaching actions

From the dispatch library (Delivery 2 §6):
1. **Guided discovery** for derivation (high fit — learner can derive from
   definitions).
2. **Direct instruction** for equation-selection algorithm.
3. **Worked examples** (high fit — procedural; multiple traces needed): three
   to five worked problems, increasing in complexity, different equation selection
   at each step.
4. **Error exposure**: M1 (sign error), M4 (peak error), and M3 (wrong equation)
   should each be demonstrated as counterexamples before independent practice.

## Voice teaching

*How it sounds when taught well*: the tutor writes "Let up = + direction" or
"Let right = + direction" as Step 0 of EVERY problem, out loud; every substituted
value is said with its sign ("acceleration equals negative 9.8"); equation choice
is narrated ("I need s, I know u, v, a — equation without t is v² = u² + 2as").

*Load-bearing sentence to slow down on*: "Set your positive direction first.
Assign a sign to every quantity. Let the algebra carry the signs. If you change
a sign because the answer 'feels wrong,' you've broken the method." Slow. Deliberate.

*What to listen for*: learner substitutes positive values for g in an upward-throw
problem → M1; learner says "a = 0 at the peak" → M4; learner starts every problem
with v = u + at regardless of what's given → M3; learner says "these equations
don't apply because the car isn't constant" without checking → (correct caution —
praise the metacognitive awareness, then confirm/deny).

## Assessment

**Diagnostic — golden probe**: "A ball is thrown upward at 15 m/s. Using upward as
positive and a = −9.8 m/s²: (a) how long to reach the peak? (b) what is the height
at the peak?" Correct: (a) v = u + at → 0 = 15 − 9.8t → t = 1.53 s; (b) v² = u² +
2as → 0 = 225 − 19.6s → s = 11.5 m. Errors: a = +9.8 (M1); a = 0 at peak (M4);
uses wrong equation and can't solve (M3).

**Distractor-mapped items**:
- "A car decelerates from 30 m/s at 6 m/s². Time to stop:" Options: 2 s, 5 s, 180 s,
  0.2 s. Answer: 5 s. Distractor 180 s: likely computed 30 × 6 instead of 30/6.
- "At the peak of an upward throw, the ball's acceleration is:" Options: 9.8 m/s²
  upward, 0, 9.8 m/s² downward, −9.8 m/s² upward. Answer: 9.8 m/s² downward
  (= −9.8 m/s² if up is positive). Distractor 0 targets M4.

**Guided practice → independent practice fading ladder**:
1. Three single-equation problems (each requires only one equation — stated at top
   which equation to use).
2. Three single-equation problems, unscaffolded (learner chooses equation).
3. Three two-step problems (e.g. find t, then use t to find s).
4. One upward-throw problem (two phases: up and down).
5. One "stopping distance" problem with non-standard setup.
6. (Delayed, 1 week): a ball dropped from a bridge — height, time, and speed on
   impact; find all three.

**Mastery gate set** (per assessment/05):
- *Production*: solve three one-unknown problems (each requiring a different
  kinematic equation) with all working shown and sign convention stated.
- *New surface*: given a velocity-time graph for an accelerating object, read off u,
  v, a, and use the equations to find s. (Graphical interpretation.)
- *Mixed*: 6 problems — 2 upward throw, 2 deceleration, 2 free fall from rest.
- *Delayed*: one-week — the upward-throw problem (peak height and total flight time).

**Calibration note**: learners feel confident after one or two successful solved
examples ("I just plug into the formula"). True mastery check: give a multi-phase
problem (ball thrown up, caught at a lower level) where two separate kinematic
phases must be tracked. Confidence collapses here for learners whose mastery is
superficial. Include this in the gate.

## Recovery notes

*Likeliest utterance*: "which equation do I use?" (M3); "I used the right formula
but got the wrong sign" (M1); "at the top, v = 0 so a = 0" (M4).

*Concept-specific smaller question for M3*: "List what you know. What are you
asked to find? Now look at each equation — which contains ONLY those quantities?"
Walk through the algorithm explicitly; the learner can do it step by step even
without the rule memorised.

*M1 recovery*: "Go back to Step 0. Write '+ direction = ___.' Now: is the
acceleration in the + or − direction? Write that down before any algebra. Never
change that sign during the problem." Force the sign-convention step as an
explicit written act.

## Memory & review

- **Concept type**: procedure (equation selection + signed algebra) + limited fact-set
  (four equations — ideally derived rather than memorised).
- **Review form** (per Delivery 2 §8): spaced procedural practice — one kinematics
  problem of each type (free fall, upward throw, braking, uniform acceleration)
  distributed across the curriculum. Never go more than two weeks without a
  kinematics problem; the skill degrades quickly without distributed practice.
- **Automaticity target**: equation selection (given variables → correct equation)
  should be automatic before 2D kinematics is taught. Multi-step sign management
  should be fluent before Newton's laws are taught (where F = ma introduces a third
  signed quantity alongside u, v, s, t).
- **Interleaving partners**: `phys.mech.kinematics-2d` (component-by-component
  application of 1D equations); `phys.mech.projectile-motion` (kinematics in
  two perpendicular 1D problems simultaneously); `phys.mech.newtons-second-law`
  (a = F/m links kinematics to dynamics).

## Transfer map

- *Near*: `phys.mech.kinematics-2d` — applies the same equations independently
  to x and y components.
- *Near*: `phys.mech.projectile-motion` — a = 0 horizontally, a = −g vertically.
- *Near*: `phys.mech.newtons-second-law` — F = ma determines a; then kinematics
  predicts motion.
- *Far*: `phys.mech.angular-kinematics` — the SAME four equations, replacing
  s → θ, v → ω, a → α.
- *Cross-subject*: maths (quadratic equations — s = ut + ½at² is a quadratic in t
  or s; solving requires the quadratic formula for general cases).
- *Real-world*: car braking distances; projectile ranges; spacecraft trajectory
  calculations (at constant-acceleration phases); sports physics (ball thrown at
  an angle).
- *Expert transfer*: Taylor expansion of position around t₀ — s(t₀ + Δt) ≈
  s(t₀) + v(t₀)Δt + ½a(t₀)(Δt)² — this IS the kinematic equation, as the first
  three terms of the Taylor series, exact when a is constant.

## Curriculum feedback

The KG correctly identifies the three direct unlocks. The `mastery_threshold: 0.80`
is the highest in the kinematic chain — appropriate, as this is a multi-equation
procedural skill with sign-management complexity. The `estimated_hours: 4` is for
initial mastery; automaticity (equation selection without deliberation) requires
significantly more distributed practice. One suggestion to the Pipeline: add a
note in the description that the four equations assume constant acceleration —
the current description "kinematic equations relate displacement, velocity,
acceleration and time" is correct but omits the critical constant-acceleration
condition.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*
