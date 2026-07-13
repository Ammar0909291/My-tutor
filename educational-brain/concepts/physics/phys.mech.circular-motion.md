# phys.mech.circular-motion — Uniform Circular Motion

## 1. Identity
- **Canonical KG ID**: `phys.mech.circular-motion`
- **Canonical name**: Uniform Circular Motion
- **Curriculum domain**: Mechanics
- **Difficulty tier**: proficient
- **Bloom level**: apply
- **Prerequisites**: `phys.mech.kinematics-2d`, `phys.mech.newtons-second-law`
- **Unlocks**: `phys.mech.angular-kinematics`, `phys.mech.orbital-mechanics`
- **Estimated study hours**: 5
- **KG description**: Uniform circular motion involves constant speed along a circular path with centripetal acceleration directed toward the centre.

---

## 2. Mental Models (4-stage progression)

**Stage 1 — Concrete (ball on a string)**
Swing a ball on a string in a horizontal circle. Speed stays constant (uniform); direction changes continuously. Something must be pulling the ball inward — the string tension. Let go: the ball flies off tangentially, not radially outward. The inward pull (centripetal force) is real; the apparent outward pull (centrifugal force) is a fictitious perception from inside the rotating frame.

**Stage 2 — Centripetal acceleration**
A particle moving in a circle of radius r at constant speed v experiences centripetal (centre-seeking) acceleration:
a_c = v²/r (directed toward the centre)

In terms of period T and angular velocity ω:
v = 2πr/T = rω → a_c = rω² = 4π²r/T²

By Newton's second law, a net force must provide this acceleration:
F_c = ma_c = mv²/r = mrω² (directed toward the centre)

This centripetal force is NOT a new force — it is the net inward force from whatever physical force is acting (tension, gravity, normal force, friction, etc.).

**Stage 3 — Applications**
*Vertical circle (ball on string)*: At the top, tension + weight both point inward: T + mg = mv²/r → T = mv²/r − mg. Minimum speed at top (T = 0): v_min = √(gr). Below this speed, the ball falls inward.

*Banked curve (car or train)*: Normal force component provides centripetal force. Without friction: N sinθ = mv²/r; N cosθ = mg → tanθ = v²/(rg). Ideal banking angle for speed v.

*Orbital motion*: Gravity provides centripetal force: mg' = mv²/r → v = √(gr) for circular orbit at radius r (g' is local gravitational field). This is the gateway to `phys.mech.orbital-mechanics`.

**Stage 4 — Direction of acceleration (vector derivation)**
Position: r⃗(t) = r(cosωt, sinωt)
Velocity: v⃗(t) = rω(−sinωt, cosωt) (tangential)
Acceleration: a⃗(t) = rω²(−cosωt, −sinωt) = −ω²r⃗

The acceleration vector points toward the centre (opposite to position vector r⃗) with magnitude rω². This is purely from kinematics — the direction change of velocity gives centripetal acceleration even at constant speed.

**Mental-model versioning**: Stage 1 for conceptual grounding; Stage 2 for all basic centripetal-force problems; Stage 3 for the standard application set; Stage 4 for the vector derivation (rigour).

---

## 3. Why Beginners Fail

1. **Centrifugal force is real (incorrect)**: Students insist there is a real outward centrifugal force. This is the most persistent error in circular motion. The feeling of being "thrown outward" is inertia — the body continues in a straight line while the car turns. In the ground (inertial) frame, the only real force is inward.
2. **Centripetal force as a separate extra force**: Students draw a free-body diagram and add a centripetal force arrow as a separate force alongside tension/gravity. Centripetal force is the NET inward force, not an additional force. If tension provides the centripetal force, there is no additional "F_c" — tension IS F_c.
3. **Speed increases if going in circles** (incorrect): "Uniform" means constant speed. Only direction changes, not speed. The centripetal force does no work (it is always perpendicular to displacement) → kinetic energy is constant → speed is constant.
4. **a = v²/r is radially outward**: Students compute the magnitude correctly but assign it the wrong direction (outward instead of inward). The centripetal acceleration always points INWARD, regardless of which part of the circle the particle is at.

---

## 4. Misconception Library

**M1 — "There is a real centrifugal force pushing outward"**
- Probe: "You're in a car taking a sharp left turn. What force pushes you to the right against the door?"
- Characteristic phrase: "The centrifugal force pushes me outward."
- Recovery: In the ground (inertial) frame, no force pushes you right. Your body's inertia tends to keep you moving straight; the car turns left around you; the door pushes you LEFT (inward, centripetal). You feel pressed against the door because the door is pushing you — not because something pushes you into it. In a rotating (non-inertial) frame, a fictitious centrifugal force can be introduced mathematically, but it is not a real interaction force.

**M2 — "Centripetal force is an extra force drawn separately on the FBD"**
- Probe: "Draw the FBD for a ball on a string moving in a horizontal circle."
- Characteristic phrase: "Weight, tension, and centripetal force — three arrows."
- Recovery: The FBD has weight (down) and tension (toward centre). Sum of forces = net inward force = centripetal force: T = mv²/r (for horizontal, ignoring g). No third arrow. "Centripetal force" is a label for the net inward force, not a new force. If you draw it separately, you are double-counting. Check: how many real interactions does the ball have? Two (gravity and string) — so only two FBD arrows.

**M3 — "Speed increases during circular motion"**
- Probe: "A ball moves in a perfect circle at 10 m/s. What is its speed 5 seconds later?"
- Characteristic phrase: "If there's a net force, the speed must increase."
- Recovery: A net force changes velocity (magnitude or direction). Centripetal force changes direction only — it is always perpendicular to v⃗, so it does no work, so kinetic energy and speed remain constant. Demonstrate: a ball on a string moving in a circle on a frictionless surface maintains constant speed indefinitely (until friction or air resistance acts).

**M4 — "The centripetal acceleration points outward (away from centre)"**
- Probe: "A ball moves counterclockwise in a circle. At the rightmost point, which direction does the centripetal acceleration point?"
- Characteristic phrase: "Centripetal acceleration points outward because it's the result of the force."
- Recovery: "Centripetal" means "centre-seeking." At the rightmost point, the centre is to the left — centripetal acceleration points left (toward the centre). The word itself encodes the direction. At any point in the circle, a_c points directly toward the centre. Verify with Stage 4 derivation: a⃗ = −ω²r⃗, and r⃗ points outward, so a⃗ points inward.

---

## 5. Explanation Library

**E1 — Why acceleration with constant speed?**
Acceleration = rate of change of velocity (a vector). Velocity can change in magnitude OR direction. In circular motion, speed is constant but direction changes continuously — the velocity vector rotates. The rate of change of the velocity vector (dv⃗/dt) is nonzero and points inward. This is centripetal acceleration: a_c = v²/r. No contradiction with constant speed — speed is |v⃗|, not v⃗.

**E2 — Derivation of a_c = v²/r (geometric)**
In time dt, the particle moves through angle dθ = ω dt. The velocity vector also rotates by dθ. Change in velocity: |dv⃗| = v dθ (arc length on the velocity circle of radius v).
a = |dv⃗|/dt = v dθ/dt = v × ω = v × (v/r) = v²/r. ✓
Direction: dv⃗ points perpendicular to v⃗ and toward the centre.

**E3 — Vertical circle energy + force analysis**
Ball on string in vertical circle, radius r. At top: T + mg = mv²_top/r. At bottom: T − mg = mv²_bot/r. Energy: (1/2)mv²_top + mg(2r) = (1/2)mv²_bot (taking bottom as reference).
If string goes slack at top (T = 0): v²_top_min = gr → v²_bot = gr + 4gr = 5gr.
Minimum speed at bottom to maintain contact at top: v_bot = √(5gr). Classic exam problem.

**E4 — Banked curve (no friction)**
Forces: N (normal, perpendicular to road surface), mg (weight, down).
N cosθ = mg (vertical equilibrium)
N sinθ = mv²/r (centripetal)
Divide: tanθ = v²/(rg) → θ = arctan(v²/rg).
For a specific design speed v, this is the ideal banking angle — cars can go around the curve at this speed with zero friction required.

---

## 6. Analogy Library

**Primary analogy — Twirling on an office chair**
Sit in a spinning chair and hold a heavy book with both hands stretched outward. Arms (muscles) must exert an inward force to keep the book on the circular path. The book "feels" heavy — that pull outward is the book's inertia. Let go: the book flies tangentially (not radially outward). The inward arm force is centripetal; the outward tendency is inertia, not a centrifugal force.

**Breaking point**: This analogy works well for the force direction but doesn't quantify a_c = v²/r. Introduce the formula separately after the qualitative picture is clear.

**Anti-analogy — Vertical free-fall**: In free-fall, the acceleration is perpendicular to the ground (not perpendicular to velocity). Students who use free-fall as a model for centripetal acceleration get the direction wrong (free-fall a is always downward, not toward-the-centre). Centripetal acceleration is always toward the centre of the circle, which changes direction as the particle moves around.

---

## 7. Demonstration Library

**D1 — Ball on string released**
Swing a rubber ball on a string in a horizontal circle. Release the string at a specific point. The ball flies off tangentially — not radially outward. Mark the expected radial direction on the floor; observe that the ball misses it completely, flying tangent to the circle. Demonstrates that inertia produces tangential motion, not outward radial motion — the centrifugal misconception is directly refuted.

**D2 — Water in a bucket (vertical circle)**
Fill a bucket half-full of water. Swing it in a vertical circle fast enough. At the top, the water stays in (apparent gravity exceeds real gravity). Ask: "Why doesn't the water fall when the bucket is upside down?" Centripetal acceleration at the top must exceed g: v²/r ≥ g → v ≥ √(gr). Students feel the centripetal acceleration concept physically.

**D3 — Banked turn model (ramp + marble)**
Cut a curved section of ramp banked at angle θ. Roll marbles at different speeds. At the design speed, the marble rolls smoothly without sliding up or down the bank. At higher speeds, it rides up; at lower speeds, it slides down. Measure the design speed, compute the theoretical tanθ = v²/(rg), and compare with the actual bank angle. Quantitative verification of the banked-curve formula.

---

## 8. Discovery Lesson

*Guided inquiry is effective* (the direction of centripetal acceleration can be discovered):

1. Mark a circle on the floor. A student walks the circle slowly, others watch.
2. Ask: "At each position, what direction is the student changing their velocity?" → Need to draw velocity vectors at different points.
3. Arrow at A points east (moving east); arrow at B (quarter turn later) points south (moving south). Change in velocity = south minus east = southwest → points toward centre.
4. Generalise: at every point, Δv⃗ points toward the centre. The centripetal acceleration always points inward.
5. Quantify: measure the change in direction, use a⃗ = Δv⃗/Δt. Compare to v²/r. Matches.

---

## 9. Teaching Actions (dispatch table)

| Situation | Action |
|---|---|
| Student draws centrifugal force on FBD | Ask: "What physical object exerts this force on the ball?" There is no object — so it's not a real force. Remove it. Centripetal force is the label for the net inward real forces. |
| Student adds centripetal force as an extra arrow | Ask: "Count the real interactions: gravity (Earth pulls) and tension (string pulls). That's two arrows. Centripetal force = the net of those arrows directed inward. Don't draw it as a third." |
| Student says speed changes | Ask: "Does the centripetal force do any work?" (F ⊥ v → W = F·d cosθ = 0.) "If no work is done, does kinetic energy change?" (No.) "Does speed change?" (No.) |
| Student says centripetal a points outward | Return to definition: centripetal = toward the centre. Draw the position vector (outward); a⃗ = −ω²r⃗ points opposite = inward. |
| Student ready for angular kinematics | Introduce angular velocity ω, angular acceleration α, and the kinematic equations for rotational motion — natural extension of v = rω and a_c = rω². |

---

## 10. Voice Teaching

"Uniform circular motion: constant speed, changing direction. The velocity vector rotates around the circle without changing length — but its direction changes constantly, so there IS acceleration. That acceleration is v-squared over r, always pointed toward the centre. We call it centripetal — centre-seeking.

Newton's second law: F-net equals m-a. For circular motion, the net inward force equals m-v-squared-over-r. This net inward force is called the centripetal force, but it's not a new force — it's the total of whatever real forces happen to be pointing inward. For a ball on a string: tension is the centripetal force. For a planet in orbit: gravity is the centripetal force. For a car on a banked curve: the horizontal component of the normal force is the centripetal force.

The outward centrifugal force? It's not real in the ground frame. When a car turns left, your body wants to go straight — it's inertia, not an outward push. The door pushes you left (centripetally) to force you to follow the car.

And speed: the centripetal force is always perpendicular to velocity. Perpendicular force does zero work. Zero work means zero change in kinetic energy. So speed stays constant throughout uniform circular motion."

---

## 11. Assessment

**Mastery gate**: Student correctly draws a FBD with no fictitious centrifugal force, applies F_net = mv²/r with the correct inward forces, computes centripetal acceleration and force for standard geometries (horizontal circle, banked curve, vertical circle), and explains why speed is constant despite nonzero net force. Four independent problems required.

**Formative golden probe**: "A 1200 kg car drives over a hill of radius 50 m at 20 m/s. What is the normal force from the road on the car at the top of the hill?"
- At the top: N and mg both available. N (upward) and mg (downward) → net downward = centripetal inward = mg − N = mv²/r.
- N = m(g − v²/r) = 1200(9.8 − 400/50) = 1200(9.8 − 8) = 1200 × 1.8 = 2160 N.
- (Compare to stationary: N = mg = 11760 N — the car is nearly weightless at the top.)
- Common error: N + mg = mv²/r (both upward) — wrong sign; the centripetal direction is downward at the top of a hill.

**Confidence calibration**: After solving, ask: "What happens if the car goes faster than √(gr) = √(490) ≈ 22 m/s?" If student says "N becomes negative" (the road would need to pull the car down, which it can't do → car leaves road), they understand the physics. If they just use the formula without this physical interpretation, confidence is premature.

**Delayed retrieval (1–2 weeks)**: "A 0.5 kg ball on a 0.8 m string makes 3 full revolutions per second in a horizontal circle. Find the centripetal acceleration and the tension in the string."

---

## 12. Recovery Notes

**If centrifugal force misconception persists**:
Return to D1 (ball released from string). The ball's trajectory is tangential, not radial — the physical evidence refutes the outward force story. Then analyse the rotating frame: to make Newton's law work in the car frame, you must ADD a fictitious centrifugal force, but this is a mathematical accounting trick for the accelerating frame, not a real force. Emphasise: in the inertial (ground) frame, no centrifugal force exists.

**If the FBD consistently has three forces**:
Practice isolated FBD exercises for circular motion contexts before writing any equations. The skill of identifying real interactions (not net forces, not pseudo-forces) must be solid before F_net = mv²/r can be applied correctly.

**If the direction of centripetal acceleration is wrong**:
Do the vector change calculation explicitly: draw velocity at position A (east) and position B (slightly further, slightly south-of-east). Find Δv⃗ = v⃗_B − v⃗_A. Point this vector. It always points inward. Repeat for several positions around the circle until the pattern is automatic.

---

## 13. Memory & Review

**Memory type**: Declarative (a_c = v²/r; centripetal direction = inward; centripetal force = net inward real force) + procedural (FBD for circular motion, applying F_net = mv²/r)
**Forgetting risk**: High — the centrifugal misconception returns easily; the centripetal-force-as-extra-force error recurs; sign errors at the top/bottom of a vertical circle are persistent.
**Spaced retrieval schedule**: Days 1, 3, 7, 21
**Retrieval prompt**: "A 2 kg ball on a 1.5 m string swings in a vertical circle. What is the minimum speed at the top for the string to stay taut? What tension is in the string at the bottom at that minimum speed?"

---

## 14. Transfer Map

**Near transfer**: Angular kinematics (direct unlock — ω, α, θ with the rotational analogues of linear kinematics); orbital mechanics (gravity as centripetal force → Kepler's laws, satellite speed).
**Medium transfer**: Centrifuges (very high ω → large centripetal acceleration used to separate particles of different densities). Roller coasters (vertical circle forces at hills and loops). Banked road and railway curve design.
**Far transfer**: Cyclotron particle accelerator (charged particle in magnetic field → centripetal force from F = qv×B; r = mv/qB; cyclotron frequency ω = qB/m — purely circular motion application). Atomic orbital models (early Bohr model: Coulomb force = centripetal force).
**Cross-domain**: Circular motion principles appear in fluid dynamics (circular streamlines in a vortex), financial modelling (circular flow models are structurally analogous in naming only), and engineering (cam mechanisms, turntables, centrifugal pumps).

---

## 15. Curriculum Feedback

- KG prerequisites `phys.mech.kinematics-2d` (vector velocity) and `phys.mech.newtons-second-law` (F_net = ma) are both necessary — circular motion requires 2D velocity reasoning and Newton's second law.
- Unlocks `phys.mech.angular-kinematics` and `phys.mech.orbital-mechanics` are well-motivated: angular kinematics extends v = rω to rotational quantities; orbital mechanics applies the centripetal-force framework to gravity.
- Difficulty `proficient`/`apply` is correct — the problems require identifying the inward forces correctly for each geometry, which demands genuine understanding.
- Suggested cross-link: `phys.em.magnetic-force` — the Lorentz force provides centripetal force for charged particles in magnetic fields (r = mv/qB), linking EM and mechanics.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
