# phys.mech.momentum — Linear Momentum

## 1. Identity
- **Canonical KG ID**: `phys.mech.momentum`
- **Canonical name**: Linear Momentum
- **Curriculum domain**: Mechanics
- **Difficulty tier**: proficient
- **Bloom level**: understand
- **Prerequisites**: `phys.mech.newtons-second-law`
- **Unlocks**: `phys.mech.center-of-mass`, `phys.mech.impulse`
- **Estimated study hours**: 4
- **KG description**: Linear momentum is the product of mass and velocity, a conserved vector quantity in isolated systems.

---

## 2. Mental Models (4-stage progression)

**Stage 1 — Concrete (why a bullet stops a truck but a football doesn't)**
A bullet has small mass but very high speed. A football has moderate mass and moderate speed. A loaded truck has enormous mass and moderate speed. Which is harder to stop? The truck — it has more "quantity of motion." But a bullet penetrates things the football cannot, despite less mass, because of its high speed. The relevant quantity is mass × velocity: linear momentum p⃗ = mv⃗. The truck has more momentum; the bullet has more momentum per unit mass.

**Stage 2 — Definition and Newton's 2nd law in momentum form**
Linear momentum: p⃗ = mv⃗ (kg·m/s)

Newton's 2nd law in its general form: F⃗_net = dp⃗/dt = d(mv⃗)/dt

For constant mass: F⃗_net = m(dv⃗/dt) = ma⃗ (the familiar form, a special case)

For variable-mass systems (rockets, conveyor belts with material addition): F⃗_net = dp⃗/dt ≠ ma⃗ alone.

The momentum form is more fundamental: it works even when mass changes; the F = ma form is a special case.

**Stage 3 — Conservation of momentum**
For an ISOLATED system (no external net force): F⃗_net,ext = dp⃗_total/dt = 0 → p⃗_total = constant.

Two-body collision: p⃗_1i + p⃗_2i = p⃗_1f + p⃗_2f

Types of collisions:
- **Elastic**: KE conserved AND momentum conserved. (billiard balls, atomic collisions)
- **Inelastic**: momentum conserved, KE NOT conserved. (most real collisions)
- **Perfectly inelastic**: objects stick together; momentum conserved; maximum KE lost.

For perfectly inelastic: m₁v₁ + m₂v₂ = (m₁ + m₂)v_f → v_f = (m₁v₁ + m₂v₂)/(m₁ + m₂)

**Stage 4 — Vector nature of momentum (2D collisions)**
In 2D, momentum is conserved in EACH direction independently:
Σp_x: m₁v₁x + m₂v₂x = m₁v₁x' + m₂v₂x'
Σp_y: m₁v₁y + m₂v₂y = m₁v₁y' + m₂v₂y'

Two equations → can solve for two unknowns (if one is elastic, add the KE equation for a third).

Explosion (reverse collision, starting from rest): p⃗_initial = 0 → p⃗_1f + p⃗_2f = 0 → p⃗_1f = −p⃗_2f (equal magnitudes, opposite directions). A gun recoils.

**Mental-model versioning**: Stage 1 for conceptual grounding; Stage 2 for momentum calculations and Newton's 2nd law connection; Stage 3 for conservation in 1D collision problems; Stage 4 for 2D problems.

---

## 3. Why Beginners Fail

1. **Momentum = kinetic energy**: Students conflate p = mv with KE = ½mv². Both involve mass and velocity but are different quantities with different units (kg·m/s vs. J). They conserve differently (KE not conserved in inelastic collisions; momentum is).
2. **Momentum scalar (ignores direction)**: Students add momentum magnitudes in 2D instead of adding vector components. Two equal-mass cars colliding head-on have ZERO total momentum (equal and opposite), not twice the momentum of one car.
3. **Forgetting that conservation requires isolation**: Students apply momentum conservation to problems where there IS a significant external force (friction, gravity with a vertical component). Momentum conservation holds only when F_ext = 0 (or over such short time intervals that F_ext × Δt is negligible, as in collisions).
4. **KE is conserved in all collisions**: Students assume elastic by default. Only perfectly elastic collisions conserve both p and KE. Inelastic collisions are the norm; kinetic energy is lost to heat, sound, deformation.

---

## 4. Misconception Library

**M1 — "Momentum and kinetic energy are the same (or proportional)"**
- Probe: "Object A has mass 2 kg and speed 3 m/s. Object B has mass 3 kg and speed 2 m/s. Which has more momentum? Which has more kinetic energy?"
- Characteristic phrase: "They both involve mass times velocity — they go together."
- Recovery:
  - p_A = 2 × 3 = 6 kg·m/s; p_B = 3 × 2 = 6 kg·m/s → equal momentum
  - KE_A = ½(2)(3²) = 9 J; KE_B = ½(3)(2²) = 6 J → A has more KE
  - Same momentum, different KE. They are not the same and they scale differently with v (p ∝ v; KE ∝ v²). Plot them: KE grows faster than p as speed increases.

**M2 — "Momentum is always conserved"**
- Probe: "A ball rolls on a rough floor and slows down. Is the ball's momentum conserved?"
- Characteristic phrase: "Momentum is always conserved."
- Recovery: Momentum conservation requires ZERO external net force. Friction is an external force on the ball; it exerts a net backward impulse → momentum decreases. Momentum conservation applies to the BALL-FLOOR SYSTEM? In that system, the floor exerts friction on the ball (decreases p_ball) and the ball exerts friction on the floor (increases p_floor, though imperceptibly). Total system p is conserved. For the ball alone: not conserved. Specify the system clearly before applying conservation.

**M3 — "After a perfectly inelastic collision, both objects stop"**
- Probe: "A 2 kg ball moving at 4 m/s hits and sticks to a 6 kg stationary ball. What is the final velocity?"
- Characteristic phrase: "They collide and stick together — they both stop because they're equal and opposite."
- Recovery: p_initial = 2 × 4 + 6 × 0 = 8 kg·m/s. By conservation: (2 + 6)v_f = 8 → v_f = 1 m/s forward. The combined object moves forward at 1 m/s. Objects stop only if the initial total momentum is zero (equal and opposite momenta). Here, total initial momentum is nonzero → final momentum is nonzero → they move.

**M4 — "In a head-on elastic collision between equal masses, they bounce back"**
- Probe: "A 1 kg ball moving at 5 m/s hits an identical 1 kg ball at rest elastically. What happens?"
- Characteristic phrase: "They're equal mass so they bounce back to equal speeds."
- Recovery: For elastic collision between equal masses (m₁ = m₂): one stops completely; the other moves at the first one's initial velocity. p: mv₁ = mv₁' + mv₂' → v₁ = v₁' + v₂'. KE: ½mv₁² = ½mv₁'² + ½mv₂'² → v₁² = v₁'² + v₂'². Solving: v₁' = 0, v₂' = v₁. The moving ball stops; the stationary one takes its velocity. Observe on a billiard table or Newton's cradle — classic demonstration.

---

## 5. Explanation Library

**E1 — Momentum as "quantity of motion"**
Newton used the term "quantity of motion" for what we call momentum. It captures the combination of how much is moving (mass) and how fast (velocity). A heavy slow truck and a light fast car can have the same momentum — both require the same total impulse to stop. Momentum measures how hard it is to change the state of motion.

**E2 — Connection to Newton's 2nd law**
F⃗ = dp⃗/dt: force is the rate of change of momentum. Integrating: ∫F⃗ dt = Δp⃗ = impulse. This is more general than F = ma: for a rocket ejecting mass, m changes → the F = ma form fails → F = dp/dt is correct.

**E3 — Collision classification**
Given a collision where m₁v₁ = 4 kg·m/s hits m₂ at rest:
- Elastic: p conserved AND KE conserved → uniquely determines both final velocities.
- Inelastic: p conserved, KE decreases → need additional info (e.g., that they stick) to find final state.
- Perfectly inelastic: p conserved, objects merge → v_f = Σ(mv)/(Σm), maximum KE loss.

**E4 — Explosion as reverse collision**
A bomb explodes from rest: p_initial = 0. All fragments must have momenta that vector-sum to zero. Two fragments: p⃗_1 + p⃗_2 = 0 → p⃗_1 = −p⃗_2. Same magnitude, opposite direction. KE increased (chemical → kinetic) — explosive force is internal and converts chemical energy to kinetic, but total momentum remains zero. This distinguishes explosions from collisions: in explosions, energy is created internally; in collisions, it may be lost to deformation/heat.

---

## 6. Analogy Library

**Primary analogy — Water flowing in a pipe**
The flow rate (volume per second) captures something like momentum. A wide pipe with slow flow and a narrow pipe with fast flow can have the same flow rate. Adding flows: you add the rates algebraically, accounting for direction (in or out). Total flow is conserved in a sealed system with no sources or drains. Momentum works similarly — the "flow of mass-motion" is conserved when nothing from outside enters or leaves.

**Breaking point**: Water flow is scalar (or 1D along the pipe); momentum is a 3D vector. The analogy fails in 2D collision problems where direction matters crucially.

**Anti-analogy — Weight or force**: Students conflate "a heavy punch" (force or impulse) with momentum. Force is rate of change of momentum; a brief large force gives the same impulse as a long small force if F × t is equal. Momentum is not force. In collisions, both objects experience the same force magnitude (Newton's 3rd law) but their accelerations and momentum changes are equal and opposite.

---

## 7. Demonstration Library

**D1 — Newton's cradle**
The classic Newton's cradle demonstrates elastic collisions between equal masses. Raise one ball: one ball on the other side flies out. Raise two: two fly out. The number and velocity of released balls exactly matches the conditions for both p and KE conservation with equal masses. Students can derive the outcome algebraically and verify experimentally.

**D2 — Cart collision on air track**
Two carts on an air track (frictionless). Measure masses and velocities before and after collision using motion sensors. Test three scenarios: (a) elastic (bumper attachment), (b) inelastic (Velcro attachment — they stick), (c) explosion (spring-loaded plunger). Verify p_before = p_after in each case. Compute KE before and after to classify elastic vs. inelastic.

**D3 — Recoil from a skateboard**
Stand on a skateboard (low friction floor). Throw a heavy ball forward. You roll backward. Total momentum: 0 before, 0 after. Measure: ball mass × ball speed ≈ person mass × recoil speed. Simple, dramatic, and directly demonstrates that momentum is a vector (the ball goes forward, you go backward) and that it is conserved even without a formal "collision."

---

## 8. Discovery Lesson

*Guided inquiry via cart collisions*:

1. Students set up two carts on an air track with a motion sensor at each end.
2. Give one cart a push; record velocities of both before and after a collision.
3. Ask: "What quantity is the same before and after?" Students try mass (no), velocity (no), KE (no for inelastic)...
4. Guide: compute m₁v₁ + m₂v₂ before and after. It matches.
5. Name this "momentum" and formulate p⃗_total = constant as the observed conservation law.
6. Test with a different mass ratio. Still conserved.
7. Ask: "What would make it NOT conserved?" → A net external force (add friction, observe the violation).

The pattern recognition approach builds genuine ownership of the conservation principle.

---

## 9. Teaching Actions (dispatch table)

| Situation | Action |
|---|---|
| Student adds momentum magnitudes in 2D | Draw the vector diagram. "These momenta are not in the same direction — you must add vector components." Separate into x and y equations. |
| Student applies momentum conservation with friction present | Ask: "Is there an external net force?" Identify friction as external → momentum not conserved for just the sliding object. Specify the system more carefully or note the friction impulse. |
| Student says KE is conserved in every collision | Ask: "Where does the crumple zone of a car go during a crash?" (deformation energy). "Is that kinetic energy?" (no). Inelastic collisions are the default; elastic is the special case. |
| Student confuses p with KE | Compute both for a specific example where they differ (M1 recovery). Show the formulas side by side: p = mv vs KE = ½mv². Different powers of v; different units. |
| Student ready for impulse | Show that F = dp/dt → ∫F dt = Δp = impulse J. This connects Newton's 2nd law (force) to momentum change (impulse), and motivates the impulse-momentum theorem. |

---

## 10. Voice Teaching

"Momentum is mass times velocity: p equals m-v. It's a vector — direction matters. A 2 kg ball moving east at 3 m/s has momentum of 6 kg·m/s east. The same ball moving west at 3 m/s has momentum of 6 kg·m/s west. Equal magnitudes, opposite directions — add them and you get zero.

The big idea: in an isolated system — no external forces — total momentum is conserved. Before equals after. This is what connects Newton's 3rd law to a conservation law: the action-reaction pairs are internal, they cancel in pairs, and the total momentum of the system never changes.

In collisions: always conserve momentum. Kinetic energy is a bonus conservation only for elastic collisions. Most real collisions are inelastic — momentum is conserved, KE is not.

The most common 2D mistake: adding speeds when the velocities are at angles. You can't. Break into x-components and y-components separately and apply conservation to each direction independently.

And momentum vs. kinetic energy: they're NOT the same thing. p equals m-v; KE equals half-m-v-squared. KE grows as v-squared; p grows as v. At high speeds, KE dominates; at low speeds, they scale differently. Know when to use which."

---

## 11. Assessment

**Mastery gate**: Student correctly defines momentum as a vector, conserves momentum in 1D collisions (elastic and inelastic), identifies when momentum is NOT conserved (external force present), and distinguishes momentum from kinetic energy. Four independent problems required including at least one 2D collision or explosion.

**Formative golden probe**: "A 3 kg cart moving east at 4 m/s collides and sticks with a 5 kg stationary cart. (a) Find the final velocity. (b) How much kinetic energy is lost?"

Answers:
- (a) p_initial = 3 × 4 + 5 × 0 = 12 kg·m/s. (3 + 5)v_f = 12 → v_f = 1.5 m/s east.
- (b) KE_i = ½(3)(16) = 24 J; KE_f = ½(8)(2.25) = 9 J. ΔKE = −15 J (15 J lost to deformation and heat).
- Common error: (a) using average velocity instead of conservation; (b) not computing KE_f.

**Confidence calibration**: After (a), ask: "Is kinetic energy also conserved?" If student says yes, have them compute KE_before and KE_after. The discrepancy reveals inelastic collision clearly and corrects the M4 misconception.

**Delayed retrieval (1–2 weeks)**: "State the law of conservation of momentum. A 1200 kg car moving north at 20 m/s collides with a 1500 kg car moving east at 15 m/s. They stick together. Find the magnitude and direction of the combined velocity immediately after the collision."

---

## 12. Recovery Notes

**If momentum vs. KE is persistently confused**:
Side-by-side comparison: write p = mv and KE = ½mv² on one card. For v = 2: p = 2m, KE = 2m. For v = 4: p = 4m, KE = 8m. KE grew faster. Now: a fast light object and a slow heavy object with the same p — compute their KEs. Different. This numerical contrast cements the distinction.

**If 2D momentum is treated as scalar**:
Return to vector addition (prerequisite `phys.meas.vector-addition`). Momentum is a vector with the same addition rules. In 2D, always decompose into components before any conservation equation.

**If student applies momentum conservation with external forces**:
Always ask: "What is the system? Are there any external forces on this system?" A single sliding block with friction: friction is external → momentum NOT conserved. The block + Earth as system: friction is internal, gravity-normal cancel → external force is zero → momentum conserved. Choosing the right system is the key step.

---

## 13. Memory & Review

**Memory type**: Declarative (p = mv, conservation law statement, collision types) + procedural (conservation equation setup, 2D component separation)
**Forgetting risk**: Medium — the conservation law is well-remembered, but the vector nature and the conditions (isolated system) are frequently forgotten; momentum-KE confusion resurfaces.
**Spaced retrieval schedule**: Days 1, 3, 7, 21
**Retrieval prompt**: "A 0.5 kg ball moving at 8 m/s north hits a 1.5 kg stationary ball. After the elastic collision, the 0.5 kg ball moves at 4 m/s north. Find the velocity of the 1.5 kg ball. Verify KE is conserved."

---

## 14. Transfer Map

**Near transfer**: Centre of mass (direct unlock — position of CM = Σmᵢrᵢ/Σmᵢ; velocity of CM = total p / total mass); impulse (direct unlock — impulse = Δp = F_avg × Δt).
**Medium transfer**: Collisions in 2D (billiard ball problems, particle physics scattering cross-sections, car accident reconstruction).
**Far transfer**: Rocket propulsion (Tsiolkovsky rocket equation derived from dp/dt = thrust; variable mass → F = dp/dt not F = ma); neutrino mass measurement (momentum conservation in beta decay with missing momentum → neutrino hypothesis, Nobel 1956).
**Cross-domain**: Fluid mechanics — momentum flux (the pressure on a surface from a fluid jet is a momentum-transfer rate, F = dm/dt × v). Financial portfolio theory has a mathematical analogue in portfolio momentum (trending stock strategies).

---

## 15. Curriculum Feedback

- KG prerequisite `phys.mech.newtons-second-law` is necessary and sufficient — momentum is defined from F = dp/dt; conservation follows from Newton's 3rd law combined with 2nd law.
- Unlocks `phys.mech.center-of-mass` and `phys.mech.impulse` are well-motivated: CM is the point whose motion is governed by total momentum; impulse is the momentum change driven by a force.
- Difficulty `proficient`/`understand` is appropriate — the concept is not computationally difficult, but the vector nature and the conditions for conservation are conceptually demanding.
- Suggested cross-link: `phys.mech.newtons-third-law` (already authored) — the formal derivation of momentum conservation flows directly from Newton's 3rd law; the connection should be made explicit in teaching.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
