# Projectile Motion — `phys.mech.projectile-motion`

## Identity

- **Concept ID**: `phys.mech.projectile-motion`
- **Display name**: Projectile Motion
- **Domain**: mechanics
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.80
- **Estimated hours**: 5
- **Requires**: `phys.mech.kinematics-2d`
- **Unlocks**: *(none listed in KG — this is a consolidation and application node)*
- **Load-bearing prerequisite content**:
  - From `phys.mech.kinematics-2d`: the two-axis equation framework, the shared-clock principle, component decomposition, and reconstruction
  - The special structure of projectile motion (aₓ = 0, aᵧ = −g) must be derived from the general 2D framework, not memorised as a separate set of rules
  - Learners who skipped kinematics-2d and try to use "projectile formulas" by rote are the dominant failure population for this concept

---

## Mental models (4-stage progression)

**Stage 1 — Beginner**: A projectile is anything thrown, kicked, or launched that then travels through the air on its own, with no engine or continued push. While in the air, two things happen simultaneously: it moves forward at constant speed (nothing pushes it horizontally), and gravity pulls it downward, making it speed up in the downward direction. The path curves because the forward motion is constant while the downward motion grows.

**Stage 2 — Intermediate**: Projectile motion is a 2D kinematics problem with one specific set of accelerations: aₓ = 0 (no horizontal force), aᵧ = −g = −9.8 m/s² (gravity only, taking upward as positive). The initial velocity components (v₀ₓ = v₀ cos θ, v₀ᵧ = v₀ sin θ) are the inputs; the trajectory shape, range, time of flight, and maximum height are derived from the two-axis equations by solving the y-axis equation for t and substituting into x. At the peak, vᵧ = 0 but aᵧ = −g ≠ 0.

**Stage 3 — Advanced**: The trajectory equation y(x) is derived by eliminating t between x(t) = v₀ₓ t and y(t) = v₀ᵧ t − ½g t²: the result is a parabola. Range maximisation (45° for flat ground) and the complementary-angle symmetry (angles θ and 90°−θ give the same range) follow algebraically. Air resistance destroys the parabolic shape, reduces range, and shifts the optimal angle below 45°. The impulse-momentum theorem links the change in velocity to the impulse of gravity over the flight time.

**Stage 4 — Expert / University**: Projectile motion in vacuum is the exact solution of **F** = m**g** with constant **g**. Including air drag introduces a velocity-dependent force; for linear drag the equations remain analytically solvable (exponential approach to terminal velocity); for quadratic drag (realistic at high speed) numerical integration is required. In a rotating reference frame (Earth's surface), Coriolis acceleration deflects long-range projectiles eastward or westward depending on hemisphere and direction.

**Model versioning**: Stage 2 is the operative model for all standard problems. Stage 3 is needed before range/angle optimisation. Stage 4 is university ballistics territory.

---

## Why beginners fail

The dominant root cause is **formula harvesting without framework**: learners memorise a "range formula" R = v₀² sin 2θ / g and a "maximum height formula" H = v₀² sin²θ / 2g without understanding that both are derived from the two-axis framework. When a non-standard problem appears (launch above the landing level, inclined surface, non-zero launch height), the formula fails and the learner has no recovery tool because they bypassed the framework.

The secondary root cause is **the peak misconception**: at the peak of the trajectory, vᵧ = 0 and learners wrongly conclude that acceleration is also zero. This is M4 from `phys.mech.acceleration` and M4 from `phys.mech.kinematics-1d` re-appearing in 2D clothing. The ball decelerates through the peak; the instant vᵧ = 0 is not an equilibrium — gravity is still pulling.

The third root cause is **range symmetry over-generalisation**: learners learn that 45° maximises range on level ground and then apply it to problems with different launch and landing heights.

---

## Misconception library

**M1 — "At the peak, acceleration is zero because the ball stops momentarily"**
- Characteristic phrase: "At the top, velocity is zero, so there's no acceleration." (Restatement of phys.mech.acceleration M1 in 2D context — requires explicit probe here because it reappears reliably.)
- Probe: "A ball is thrown upward at an angle. At the very peak of its path, what are vₓ, vᵧ, and aᵧ?"
- Expected wrong answer: aᵧ = 0 or a = 0 at the peak.
- Recovery: at the peak, vᵧ = 0 (vertical velocity momentarily zero) but gravity has not been switched off. Draw a FBD: weight still acts downward. aᵧ = −g at the peak, during the peak, and at every other instant of the flight. The only moment aᵧ would be zero is if gravity were turned off.

**M2 — "The horizontal velocity decreases during flight"**
- Characteristic phrase: "It slows down as it goes further because it's losing energy" or "it must slow horizontally because it curves."
- Probe: "Between launch and landing, does the horizontal component of velocity change? Why or why not?"
- Expected wrong answer: vₓ decreases during flight, or vₓ is maximum at launch and minimum at landing.
- Recovery: return to the FBD. What horizontal force acts on the projectile? None (in the idealised problem). Newton's first law: if no horizontal force, no horizontal acceleration, so no change in horizontal velocity. vₓ is the same at launch and landing. (Note: if the learner raises air resistance, honour it — but distinguish the idealised model from the realistic case.)

**M3 — "The range formula R = v₀² sin 2θ / g always applies"**
- Characteristic phrase: "I'll use the range formula" when launch height ≠ landing height.
- Probe: "A ball is kicked from the top of a 10 m cliff at 15 m/s at 30°. How far from the base does it land?"
- Watch for the learner substituting into the range formula directly.
- Recovery: the range formula is derived for y_final = y_initial (level ground, same height). Write the y equation from scratch: y(t) = y₀ + v₀ᵧ t − ½g t². Here y₀ = 10 m, y_final = 0. Solve for t (quadratic), substitute into x(t) = v₀ₓ t. The framework always works; the shortcut sometimes doesn't.

**M4 — "45° always maximises range"**
- Characteristic phrase: "Shoot at 45° for the longest shot" applied without checking whether launch and landing heights are equal.
- Probe: "A trebuchet sits on a 20 m hill. What launch angle maximises range?" Watch for the automatic answer of 45°.
- Recovery: 45° maximises range ONLY when launch height equals landing height on flat ground. For a raised launcher, the optimal angle is less than 45°. The general problem requires calculus or numerical methods; the key lesson is that the shortcut is a special case, not a universal law.

---

## Explanation library

**E1 — Derivation from first principles (the only safe explanation)**
Start from the 2D kinematics framework established in the prerequisite:
- aₓ = 0 (no horizontal force), aᵧ = −g (gravity only)
- v₀ₓ = v₀ cos θ, v₀ᵧ = v₀ sin θ
- x(t) = v₀ₓ t = (v₀ cos θ)t
- y(t) = v₀ᵧ t − ½g t² = (v₀ sin θ)t − ½g t²
Every result (time of flight, range, max height, landing velocity) must be derived from these four equations by algebra. This derivation-from-principles approach is the master explanation; learners who see it are immunised against M3 and M4.

**E2 — The independence demonstration (conceptual anchor)**
Use the simultaneous-drop demonstration from kinematics-2d (D1) as the anchor: "We already proved that throwing a ball horizontally and dropping it straight down produce the same fall time. That's the whole principle at work in projectile motion. The horizontal motion is oblivious to gravity; gravity only acts vertically. So we solve a 'horizontal constant-velocity problem' and a 'vertical free-fall problem' — both sharing the same stopwatch."

**E3 — Peak analysis (misconception surgery for M1)**
"At the very top of the path, the ball's vertical velocity has reached zero. But gravity doesn't know that. Gravity applies 9.8 m/s² downward every second, whether the ball is moving or not. The moment after the peak, the ball is moving downward again because gravity is still acting. If gravity paused at the peak, the ball would float there forever. It doesn't float; it falls. So aᵧ = −g at the peak."

---

## Analogy library

**Primary analogy — The two conveyor belts**
Imagine the ball riding two conveyor belts simultaneously: one horizontal (running at constant speed, never stopping), one vertical (starting from rest and accelerating downward at 9.8 m/s² per second, like a free-fall). The resulting path is the combination of these two independent rides. The horizontal belt never speeds up or slows down; only the vertical belt accelerates.

**Breaking point**: Air resistance eventually slows the horizontal belt — this analogy breaks when drag is introduced. For the idealised vacuum case, the analogy is exact.

**Anti-analogy — "Projectile motion is circular"**
The path of a projectile is a parabola, not a circle. The curvature is not constant — it is sharpest at the peak (where horizontal speed is constant but vertical speed is small) and shallowest near launch and landing (where vertical speed is large). Do not draw the trajectory as a symmetric arch that looks circular; draw it as asymmetric when launched from a height, and emphasise that a parabola's curvature varies.

---

## Demonstration library

**D1 — Simultaneous drop (inherited from kinematics-2d)**
One ball dropped straight down, one launched horizontally — both from the same height, released simultaneously. Both hit the floor at the same time. This directly demonstrates aₓ = 0 (horizontal) and aᵧ = −g (vertical, shared with the dropped ball). Show before any equations.

**D2 — Water hose angle sweep**
Direct a hose at different upward angles and observe the range. Maximum range visually occurs near 45° (on level ground). Emphasise: this works here because hose nozzle and ground are at the same height. Then point the hose from the top of a raised platform — the optimal angle shifts below 45°. This physical demo inoculates against M4 before it is encountered in problems.

**D3 — Video tracking of a thrown ball**
Use a slow-motion video of a ball thrown at an angle. Overlay a horizontal position marker (constant spacing between frames — confirms vₓ constant) and a vertical position marker (increasing spacing — confirms vertical acceleration). Students should identify aₓ = 0 and aᵧ ≠ 0 from the video before they see any equations.

**D4 — Peak freeze-frame discussion**
Pause a video at the exact peak. Ask: "At this frame, what is the vertical velocity? What is the horizontal velocity? What is the acceleration?" The visual confirmation that the ball is momentarily at the top, still curving, is more compelling than a diagram alone.

---

## Discovery lesson

**Argue for guided discovery** (appropriate because the learner already has the 2D kinematic framework):

Present the setup: "A ball is thrown at an angle with some initial speed. No engine keeps pushing it. What forces act on it while it's in the air?" The learner should identify only gravity (in the idealised model). "What direction does gravity act?" Straight down. "So what is aₓ? What is aᵧ?" This should follow immediately from the learner's 2D framework. From aₓ = 0 and aᵧ = −g, the equations follow deductively. The discovery is recognising that projectile motion is not a new subject — it is the 2D kinematic framework applied with the single additional fact that gravity is the only force.

After the derivation, the tutor asks: "At the peak, what is vᵧ?" Zero. "What is aᵧ?" Let the learner answer from the framework — it must be −g, because the framework says aᵧ = −g always, not only when moving. This creates a direct collision with M1 in a discoverable way.

If the learner cannot recall the 2D kinematic equations or the axis-setup protocol, do not proceed with discovery. Restore the prerequisites first.

---

## Teaching actions

**TA1 — Derivation-first discipline**: Never hand over projectile formulas without deriving them in the session. Even if the learner has seen the range formula before, begin every session by deriving it from the four base equations. This takes 5 minutes and prevents M3 and M4 from taking hold.

**TA2 — Peak probe (standard checkpoint)**: After every projectile problem, insert the peak question as a final check: "At the highest point, what is vᵧ? What is aᵧ?" If the learner says aᵧ = 0, stop and address M1 before proceeding to the next problem.

**TA3 — Level-ground check before formula use**: If the learner reaches for the range formula R = v₀² sin 2θ / g, ask first: "Is the landing point at the same height as the launch point?" If no — redirect to the four base equations. If yes — the formula is valid here, and the learner must state why before using it.

**TA4 — FBD as first step**: Require a free-body diagram of the projectile in flight before any kinematic equation is written. This forces the explicit identification of forces → accelerations → which kinematic equations apply. A learner who draws the FBD correctly (one arrow, weight downward) has already solved 80% of the conceptual problem.

**TA5 — Complementary-angle consolidation**: After initial mastery, present the same launch speed at 30° and at 60° and ask the learner to compare ranges without calculating. This inoculates against range-formula over-literal use and builds intuition for the sin 2θ symmetry.

---

## Voice teaching

> "Let's start from scratch every time — I don't want you using a formula you memorised from last week. Tell me: what forces act on the ball after it leaves the hand? … Just gravity, good. What direction? … Straight down. So what's the horizontal acceleration? What's the vertical acceleration? … Exactly. aₓ = 0, aᵧ = −9.8 m/s². Now write me the four equations — x position, y position, vₓ, vᵧ — and everything we need to solve this problem is in those four lines."

> "One question I always ask at the peak: what is the acceleration at the very top of the path? … I hear a lot of 'zero' answers to that question, and it's one of the most common mistakes in physics. Gravity hasn't been switched off. The ball is still falling — it just hasn't started going down yet. The vertical velocity is zero at the peak; the vertical acceleration is minus 9.8 every single instant of the flight, including the peak."

> "Now, about the range formula — yes, it exists, and yes it's faster. But it was derived for one specific situation: level ground, same height at launch and landing. The moment someone asks you to fire from a cliff, or onto a ramp, the formula breaks. The four base equations never break. If you know the four equations, you can always get the range formula from them in two minutes. If you only know the range formula, you're stuck when the problem changes."

---

## Assessment

**Mastery gate**: The learner can derive the time of flight, range, and maximum height from first principles (from the four base equations, not from memorised formulas) for a ball launched at an angle on level ground — and can identify aᵧ at the peak without prompting.

**Formative golden probe (multi-part, targets all four misconceptions)**
> "A ball is thrown from ground level at 20 m/s at 60° above horizontal. (a) Draw a free-body diagram of the ball at the peak of its path. (b) What is the acceleration of the ball at the peak? (c) What is the horizontal velocity at the peak? (d) What is the vertical velocity at the peak? (e) What is the time of flight? (f) What is the range? (g) If the same ball is thrown at 30°, compare the range to (f) without calculating."

- (a) + (b): targets M1
- (c): targets M2
- (e) + (f): requires derivation from the four equations (no shortcut valid since checking whether the learner uses the formula without derivation)
- (g): tests complementary-angle insight and discourages formula substitution

**Confidence calibration question**
After (b): "How confident are you that aᵧ = −9.8 m/s² at the peak? On a scale of 1–5?" Compare against their actual answer. High confidence in a wrong answer signals a deeply embedded M1 requiring explicit collision.

**Delayed retrieval check (72 h / 7 days)**
"A stone is thrown horizontally at 8 m/s from a cliff 20 m high. (a) How long does it take to reach the base? (b) How far from the base does it land?" (Horizontal launch special case — tests the framework in simplified form, and absence of initial vᵧ means M1 cannot be probed at the peak; follow up separately with an angled-launch problem.)

---

## Recovery notes

**Failure mode A — Uses memorised formulas, can't handle non-level-ground problems**
Close the formula book. Physically write the four base equations: x(t) = v₀ₓ t, y(t) = y₀ + v₀ᵧ t − ½g t², vₓ = v₀ₓ, vᵧ = v₀ᵧ − gt. State the specific values of aₓ and aᵧ for each problem aloud before substituting. Practise exclusively on non-level-ground problems (cliff launches, ramp landings) where the formula fails, until the framework is automatic. Only then reintroduce level-ground problems.

**Failure mode B — Persistent M1 (aᵧ = 0 at the peak)**
Run E3 (peak analysis) in voice. Then draw the FBD at the peak. Then ask: "What would have to be true about gravity for aᵧ to be zero at the peak?" The learner must articulate "gravity would have to be absent" — and they can hear that this is absurd. If M1 persists after this collision, retreat to `phys.mech.acceleration` M1 recovery protocol (the throwing-a-ball-up scenario).

**Failure mode C — M2 (horizontal speed decreases)**
Ask for the FBD explicitly: "Draw me every force on the ball while it's in the air." Confirm one arrow (weight, downward). "Is there a horizontal force anywhere?" No. Newton's first law: no horizontal force → no change in horizontal velocity. vₓ at landing equals vₓ at launch.

**Failure mode D — Sets up equations but makes algebra errors**
This is arithmetic / algebra, not physics. Use TA1 (always derive from first principles, always write all four equations in full form) and slow the calculation down. Check sign conventions at each step.

---

## Memory & review

**Memory type**: Schema + procedure + worked-example repertoire (the four-equation framework is the schema; the axis-setup/derivation sequence is the procedure; specific problem types — level ground, cliff launch, given range find angle — are the repertoire).

**Spaced retrieval schedule**: Day 1, Day 4, Day 10, Day 28.

**Retrieval prompts**:
- "What are aₓ and aᵧ for a projectile in the idealised model? Where does each come from?"
- "At the peak of a projectile's path, what is vᵧ? What is aᵧ?"
- "Write the four base equations for projectile motion from memory."
- "A ball is launched at 25 m/s at 37°. What is the maximum height?" (requires only the y-axis, no full flight needed)

**Interleaving**: Mix projectile motion problems with kinematics-2d problems where aₓ ≠ 0 (e.g., a ball on an inclined surface) so the learner must identify whether the special conditions of projectile motion apply before setting up equations.

---

## Transfer map

**Immediate applications**:
- Sports science: range and trajectory of kicked balls, thrown objects, jumped bodies
- Ballistics: cannon range, bullet drop over distance
- Fountain engineering: nozzle angle for distance/height trade-off

**Downstream physics**:
- `phys.mech.circular-motion`: understanding that velocity direction changes without speed change requires the same vector-component reasoning in radial/tangential form
- `phys.mech.relative-motion`: a projectile observed from a moving frame changes its component values; the framework handles this by superposition
- Orbital mechanics (university): a satellite in low orbit is a projectile that "misses" the Earth; the parabolic trajectory is the zero-eccentricity limit of an ellipse

**Cross-subject transfers**:
- `math` — parametric equations: x(t) = at, y(t) = bt − ½ct² is the parametric form of a parabola; eliminating t gives the explicit Cartesian equation y = (b/a)x − (c/2a²)x²
- Engineering: projectile motion is the canonical test case for numerical ODE integrators; the analytic solution provides the ground truth for validation

---

## Curriculum feedback

The KG lists no `unlocks` for `phys.mech.projectile-motion`. This is likely a KG authoring gap. Projectile motion directly supports several downstream topics that require the worked-out parabolic trajectory as prior knowledge:
- `phys.mech.relative-motion` — learners work with projectile trajectories as seen from moving frames
- `phys.mech.circular-motion` — the tangential component reasoning is a direct extension of projectile component reasoning

Consider adding `phys.mech.relative-motion` and `phys.mech.circular-motion` as unlocks for this concept, or at minimum annotating both as soft prerequisites for the teaching sequence.

The distinction between "idealised projectile motion (no air resistance)" and "realistic projectile motion (air resistance)" deserves a separate KG node for secondary-level students who encounter drag-correction problems. The current node conflates both; the idealised model should be the default, with the realistic case flagged as an extension.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
