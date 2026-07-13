# Magnetic Force on Moving Charges — Lorentz Force — `phys.em.magnetic-force`

## Identity

- **Concept ID**: `phys.em.magnetic-force`
- **Display name**: Magnetic Force on Moving Charges — Lorentz Force
- **Domain**: electromagnetism
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.80
- **Estimated hours**: 5
- **Requires**: `phys.em.magnetic-field`, `phys.em.electric-field`
- **Unlocks**: `phys.em.biot-savart`
- **Load-bearing prerequisite content**:
  - From `phys.em.magnetic-field`: **B** is a vector field; the right-hand rule gives the direction of **B** around a current; magnetic force acts only on moving charges; field lines form closed loops.
  - From `phys.em.electric-field`: the electric force on a charge is **F** = q**E**, always in the direction of **E** for a positive charge; superposition applies.
  - The Lorentz force combines both: **F** = q(**E** + **v**×**B**). When E = 0, **F** = q**v**×**B** — the purely magnetic force is perpendicular to both velocity and field, doing no work on the charge.

---

## Mental models (4-stage progression)

**Stage 1 — Beginner**: A magnetic field exerts a force on a moving charged particle. The force is always perpendicular to the particle's velocity — this is why a charged particle in a magnetic field travels in a circle: the force always points "sideways," never speeding up or slowing down the particle, just changing its direction. The direction of the force depends on the sign of the charge and the directions of the velocity and the field.

**Stage 2 — Intermediate**: The Lorentz force: **F** = q(**E** + **v**×**B**). The magnetic component: **F**_mag = q**v**×**B**. Magnitude: F = qvB sinφ, where φ is the angle between **v** and **B**. Direction: right-hand rule — point fingers in the direction of **v**, curl toward **B**, the thumb points in the direction of **v**×**B** (for positive q); for negative q, reverse the direction. Maximum force when **v** ⊥ **B** (φ = 90°): F = qvB. Zero force when **v** ∥ **B** (φ = 0°). The magnetic force does no work (always perpendicular to **v**, so **F**·**v** = 0 → P = F·v cosα = 0) — it changes direction but not speed. Circular motion: for a charge moving perpendicular to B, the magnetic force provides the centripetal force: qvB = mv²/r → r = mv/(qB) (cyclotron radius). The force on a current-carrying wire: **F** = I**L**×**B**, magnitude F = BIL sinφ.

**Stage 3 — Advanced**: The cyclotron frequency (gyrofrequency): ω_c = qB/m (independent of speed — a fundamental result). Period of circular motion: T = 2πm/(qB). For charged particles with a velocity component along **B**: the motion is helical — circular in the plane perpendicular to **B**, uniform along **B**. The Hall effect: a current in a conductor placed in a transverse B field produces a transverse voltage (V_H = IB/(nqd)), allowing measurement of charge carrier sign, density, and mobility. The crossed fields velocity selector: when E = vB, the electric and magnetic forces cancel → only particles with v = E/B pass undeflected (mass spectrometer inlet). Torque on a current loop: τ = NIAB sinθ = **m**×**B** (where **m** = NIA is the magnetic dipole moment of the loop) — the basis for electric motors.

**Stage 4 — Expert / University**: In special relativity, the Lorentz force **F** = q(**E** + **v**×**B**) is frame-dependent: in a frame where a charge is stationary (v = 0), there is no magnetic force — the force is purely electric. In a frame where the charge moves, there is a magnetic force. A "purely electric" force in one frame appears as a mix of electric and magnetic in another — confirming that E and B are components of the electromagnetic tensor. The Lagrangian for a charged particle in a field: L = ½mv² − q(φ − **A**·**v**), where φ is the scalar potential and **A** is the vector potential. The Abraham-Lorentz force: the radiation reaction force on an accelerating charge (due to the energy radiated as EM waves) — important for synchrotron radiation.

**Model versioning**: Stage 2 is the operative model for secondary-level problems (F = qvB sinφ, circular motion r = mv/qB, wire force F = BIL sinφ). Stage 3 is needed for Hall effect, velocity selectors, and motor torque. Stage 4 is university classical electrodynamics.

---

## Why beginners fail

The dominant root cause is **applying the right-hand rule for the wrong situation (wire B-field vs. force on charge)**: the right-hand rule for the magnetic FIELD around a wire (thumb in current direction, fingers curl in B direction) is a completely different application of the rule than the right-hand rule for the FORCE on a moving charge (fingers in v direction, curl toward B, thumb gives F direction). Learners apply whichever version they happen to remember, getting the force direction wrong in approximately 50% of problems.

The secondary root cause is **believing that the magnetic force does work (accelerates the charge)**: learners see the force on the particle and conclude it must be doing work — the particle is being "pushed," so it must be speeding up. The key insight is that the force is always perpendicular to the velocity, so the angle between **F** and **v** is always 90°, making the work done W = F·v·cosα = 0. The speed is constant; only the direction changes.

---

## Misconception library

**M1 — "The right-hand rule for the force on a charge is the same as for the B-field around a wire"**
- Characteristic phrase: "I point my thumb in the velocity direction and my fingers curl in the B direction — that gives the force."
- Probe: "A positive charge moves to the right (+x) in a field pointing upward (+y). What is the direction of the magnetic force?"
- Expected wrong answer: Student attempts to apply the "curl" version and gets a direction that is wrong (e.g., curling from +x toward +y gives a direction in the xy-plane, not out of the page).
- Recovery: use the cross-product right-hand rule: (1) point the four fingers of the right hand in the direction of **v** (+x, to the right). (2) Curl the fingers toward **B** (+y, upward). (3) The extended thumb points out of the page (+z). **F** = q**v**×**B** — for positive q, **F** is out of the page. Check: **x̂** × **ŷ** = **ẑ** (standard cross-product rule). The "curl for B around a wire" rule uses the thumb for current and fingers for B — the opposite of the force rule. Keep them strictly separate.

**M2 — "The magnetic force does work on the charged particle (speeds it up)"**
- Characteristic phrase: "The magnet is pulling the particle — it must be accelerating it and doing work."
- Probe: "An electron moves in a circle in a uniform magnetic field. As it goes around, does its speed increase, decrease, or stay constant?"
- Expected wrong answer: "Increases — the field is doing work to keep it moving in a circle."
- Recovery: the magnetic force is always perpendicular to the velocity. Work = F·v·cosα. Since α = 90° always: W = 0 always. The magnetic force changes the direction of motion, not the speed. The kinetic energy (½mv²) is constant throughout circular motion in a magnetic field — the particle goes around at the same speed forever (ignoring radiation). This is why magnets can deflect beams of charged particles without acting as particle accelerators (which require an electric field to do work).

**M3 — "A charge moving parallel to B feels a magnetic force"**
- Characteristic phrase: "The particle is inside the magnetic field, so it feels a force regardless of direction."
- Probe: "A proton moves parallel to a uniform magnetic field. What is the magnetic force on it?"
- Expected wrong answer: "F = qvB — the proton is charged and moving, so there must be a force."
- Recovery: F = qvB sinφ. If **v** is parallel to **B**, φ = 0°, sin0° = 0, F = 0. The cross product **v**×**B** = 0 when the vectors are parallel (no component of v perpendicular to B). A particle moving along a field line experiences zero magnetic force and travels in a straight line. Recall: the magnetic force requires a velocity component perpendicular to **B**. This is why Earth's magnetic poles are vulnerable to cosmic ray bombardment — particles moving along field lines toward the poles are not deflected.

**M4 — "The force on a current-carrying wire is in the direction of the current"**
- Characteristic phrase: "Current goes to the right and B points upward — the force on the wire is to the right (along the current)."
- Probe: "A horizontal wire carries current to the right (+x). A magnetic field points upward (+y). What direction is the force on the wire?"
- Expected wrong answer: "In the +x direction — the current pulls the wire forward."
- Recovery: the force on a current-carrying wire is **F** = I**L**×**B** — not in the direction of current or B, but in the direction of their cross product. **x̂** × **ŷ** = **ẑ** (out of the page, +z), so **F** is out of the page. The force is perpendicular to both the current and the field. This is the mechanism of electric motors: a current loop in a magnetic field feels a net torque (not a net force on the loop as a whole if the loop is symmetric), rotating the loop — the force on each side of the loop is perpendicular to the current in that side.

---

## Explanation library

**E1 — Why magnetic force does no work (geometric argument)**
"The magnetic force **F** = q**v**×**B** is by construction perpendicular to **v** (the cross product of any vector with another is perpendicular to both). Work done by a force in time dt: dW = **F**·(**v** dt) = (**F**·**v**) dt. Since **F** ⊥ **v**: **F**·**v** = |**F**||**v**|cos90° = 0. Therefore dW = 0 at every instant. The total work done by the magnetic force over any path is zero. This means: kinetic energy is constant → speed is constant. Only the direction of **v** changes. Electric fields do work (E is not necessarily perpendicular to v); magnetic fields do not."

**E2 — Circular motion derivation (cyclotron radius)**
"For a positive charge +q moving with speed v perpendicular to a field B: the magnetic force provides the centripetal acceleration. Centripetal force needed: mv²/r (inward). Magnetic force available: qvB (always inward, always perpendicular to v). Set equal: qvB = mv²/r → r = mv/(qB). This is the cyclotron radius: larger mass or faster speed → larger circle; stronger field or larger charge → smaller circle. Period T = 2πr/v = 2πm/(qB) — remarkably independent of v: faster particles make larger circles but take the same time to complete one orbit."

**E3 — Velocity selector (E and B crossed)**
"Apply an electric field E in the +y direction and a magnetic field B in the +z direction. A positive charge moving in the +x direction at speed v_0: electric force qE (upward, +y); magnetic force qv₀B (downward, −y, since **x̂** × **ẑ** = −**ŷ**). For equilibrium: qE = qv₀B → v₀ = E/B. Only particles with exactly this speed pass through undeflected. Particles with other speeds are deflected. This velocity selector is the entry stage of a mass spectrometer."

---

## Analogy library

**Primary analogy — Bicycle wheel gyroscope**
A spinning gyroscope precesses when you push on its axle perpendicular to the spin axis — the push causes a rotation about the third axis (perpendicular to both push and spin), not in the direction of the push. The cross-product geometry (**τ** = **r**×**F** for angular momentum) is the same as the cross-product in the Lorentz force (**F** = q**v**×**B**). Both involve a response perpendicular to the input, not in the direction of the input. The magnetic force is "gyroscopic" in this sense — it redirects, doesn't drive.

**Breaking point**: (1) The gyroscope analogy is mechanical and rotational; the magnetic force is electrical and translational. (2) The gyroscope shows conservation of angular momentum; the magnetic force shows zero work — different conservation laws. (3) Learners who are not familiar with gyroscopes find this analogy more confusing than helpful. Use it only for learners who already have gyroscope intuition.

**Anti-analogy — "Magnetic force is like friction (it slows things down)"**
Friction is also perpendicular to the normal force and does negative work — so learners sometimes compare the magnetic force to friction (which acts to oppose motion). But friction acts opposite to the velocity and does negative work (takes energy away). The magnetic force is perpendicular to the velocity and does zero work — not negative work. The particle does NOT slow down in a magnetic field (unlike with friction). A charged particle in a perfect vacuum and a pure magnetic field orbits forever at constant speed. Friction and the magnetic force are geometrically different (antiparallel to v vs. perpendicular to v) and energetically different (negative work vs. zero work).

---

## Demonstration library

**D1 — Cathode ray tube (CRT) deflection**
Place a CRT (or a discharge tube with a visible electron beam) near a bar magnet. The beam deflects — proving that a moving charge in a magnetic field experiences a force. Flip the magnet: deflection reverses. This is the historical demonstration that characterised the electron (Thomson's experiment). It directly shows: (a) moving charges feel a magnetic force; (b) the force direction depends on the field direction; (c) the force is perpendicular to both velocity and field (the beam curves, not accelerates straight).

**D2 — Force between parallel wires**
Two long parallel wires carrying currents in the same direction attract; in opposite directions, they repel. This is the force **F** = I**L**×**B** — each wire creates a field B at the location of the other wire, and the other wire's current experiences a force in that field. The two-wire force is the basis of the historical definition of the ampere (1 A is defined so that the force per unit length between two infinite parallel wires 1 m apart is 2×10⁻⁷ N/m).

**D3 — Circular orbit in a magnetic field (simulation)**
Use a charged particle simulation (PhET "Charges and Fields" or "Simulation of Charged Particle Motion in Magnetic Field"). Set a uniform B field; launch a particle perpendicular to B. Observe circular orbit. Vary v: larger v → larger radius. Vary B: larger B → smaller radius. Vary q or m: confirms r = mv/(qB). Vary angle between v and B: helix for non-perpendicular entry. This lets learners verify all four variables in the cyclotron radius formula without equipment.

---

## Discovery lesson

**Argue for experiment-first with prediction**:

The existence of a force perpendicular to velocity is a non-intuitive empirical fact that cannot be deduced from everyday mechanics. D1 (CRT deflection) is the best entry:

"Here is an electron beam going in a straight line. I bring a magnet near it." (Beam deflects.) "Which way did it deflect? Toward the magnet or sideways?" (Sideways.) "What does 'sideways' tell us about the direction of the force relative to the velocity?" (Perpendicular to the velocity.) "Now I rotate the magnet. Predict the new deflection direction." (Using the right-hand rule for the cross product — but introduce it as a prediction tool after the observation.)

The pedagogical order: observe perpendicular deflection → infer that force ⊥ velocity → introduce the cross product formula as the mathematical description of this perpendicularity → use the right-hand rule as a calculation tool.

---

## Teaching actions

**TA1 — Two separate right-hand rules**: Keep two distinct cards or diagrams:
- **RHR-1 (B around a wire)**: thumb = current direction, curled fingers = B direction around the wire.
- **RHR-2 (Force on a charge)**: fingers point in v direction, curl toward B, thumb = **v**×**B** direction = F direction for positive charge; reverse for negative charge.
Never apply RHR-1 to force problems or RHR-2 to field-around-wire problems.

**TA2 — Work check for every magnetic force problem**: After computing the magnetic force direction, require the learner to verify: "Is this force perpendicular to the velocity?" If yes: "Does it do work?" No. "Does it change the speed?" No. "Does it change the direction?" Yes. This ingrains the "no work" principle.

**TA3 — Parallel/antiparallel velocity check before computing F**: For every F = qvB sinφ problem, ask first: "Are v and B parallel?" If yes: F = 0. If no: continue. This directly addresses M3.

**TA4 — Wire force direction declaration**: For F = BIL sinφ problems, require: "What is the direction of the current element I**L**?" "What is the direction of **B**?" "What is the direction of I**L**×**B**?" Only then: "Is this the direction of the force?" The cross-product step is mandatory for every wire force problem.

---

## Voice teaching

> "F = qv×B. Two things to notice: (1) the cross product — the force is perpendicular to both velocity and field; (2) it's always perpendicular to v, so it does zero work. The particle moves in a circle — the magnetic force is always centripetal, never tangential. Speed constant, direction changing. Magnets deflect; electric fields accelerate. Remember: magnets can steer charged beams (in particle physics accelerators) but can't add energy — electric fields do that."

> "Right-hand rule for force on a positive charge: fingers in the direction of v, curl toward B, thumb points in the direction of F. For a negative charge: reverse. The key: the force is in the direction of v×B for positive q. This is NOT the same right-hand rule as for the magnetic field around a wire — keep them separate."

> "Cyclotron radius: r = mv/(qB). Fast, heavy particles make big circles; strong fields make small circles. The period T = 2πm/(qB) doesn't depend on speed — this is the magic that makes cyclotrons work. You can inject particles at any speed and they complete the orbit in the same time, allowing the electric accelerating field to be synchronised to their orbit frequency."

---

## Assessment

**Mastery gate**: The learner can (1) state the Lorentz force **F** = q(**E** + **v**×**B**) and its purely magnetic form **F** = q**v**×**B**; (2) determine the force direction using the right-hand rule (cross product version) and apply the sign for charge; (3) show that the magnetic force does zero work; (4) derive and apply r = mv/(qB) for circular motion in a magnetic field; (5) apply **F** = I**L**×**B** for a current-carrying wire.

**Formative golden probe**
> "A proton (m = 1.67×10⁻²⁷ kg, q = 1.6×10⁻¹⁹ C) moves at 10⁶ m/s in the +x direction. A magnetic field of 0.5 T points in the +y direction. (a) What is the force on the proton (magnitude and direction)? (b) The proton then travels in a circle. What is the radius? (c) A second proton moves in the −x direction at the same speed in the same field. How does its force compare to (a)? (d) A neutron (same mass, zero charge) moves at the same speed in the same field. What force does it feel?"

- (a): F = qvB sin90° = 1.6×10⁻¹⁹ × 10⁶ × 0.5 = 8×10⁻¹⁴ N; direction: +x × +y = +z → out of the page (confirmed by RHR-2)
- (b): r = mv/(qB) = (1.67×10⁻²⁷ × 10⁶)/(1.6×10⁻¹⁹ × 0.5) = 1.67×10⁻²¹/8×10⁻²⁰ = 0.0209 m ≈ 2.1 cm
- (c): −x × +y = −z → into the page; same magnitude 8×10⁻¹⁴ N, opposite direction
- (d): F = 0 — zero charge, regardless of velocity or field magnitude

**Confidence calibration question**
After (d): "Does the fact that the neutron feels zero force surprise you?" (1–5). High surprise → the fundamental dependence on charge (not mass) is not yet internalised.

**Delayed retrieval check (48 h / 7 days)**
"An electron moves at 2×10⁷ m/s at 30° to a field of 0.2 T. (a) What is the magnetic force magnitude? (b) What is the radius of the circular component of the motion?" (a) F = qvB sin30° = 1.6×10⁻¹⁹ × 2×10⁷ × 0.2 × 0.5 = 3.2×10⁻¹³ N; (b) the circular component uses v_perp = v sin30° = 10⁷ m/s; r = mv_perp/(qB) = (9.11×10⁻³¹ × 10⁷)/(1.6×10⁻¹⁹ × 0.2) = 9.11×10⁻²⁴/3.2×10⁻²⁰ ≈ 2.85×10⁻⁴ m = 0.285 mm.)

---

## Recovery notes

**Failure mode A — M1 (wrong right-hand rule)**
Enforce TA1 with a physical demonstration: hold out the right hand. "Fingers point in +x (v direction). Curl fingers toward +y (B direction). The thumb now points in +z (out of the page). That is the direction of v×B, and for positive q, the direction of F." Have the learner physically perform this hand movement for three different problems. "This is RHR-2 for force — never for B-field around a wire (that's RHR-1, with thumb along the current)."

**Failure mode B — M2 (magnetic force does work)**
Compute the power directly: P = **F**·**v** = |**F**||**v**|cos90° = 0. "The force is perpendicular to velocity — always 90°. Cosine of 90° is zero. Power is zero. Work done in any time interval is zero. The speed doesn't change." Then ask: "If the magnetic force doesn't change the speed, what does it change?" (Direction.) "Is changing direction without changing speed something you've seen before?" (Circular motion with centripetal force.) "The magnetic force IS the centripetal force for circular motion in a magnetic field."

**Failure mode C — M3 (force on parallel motion)**
"F = qvB sinφ. What is φ when v is parallel to B?" (0°.) "sin0° = ?" (0.) "So F = ?" (0.) No exceptions. Then ask the learner to compute the cross product: v∥B → v×B = 0. Both routes (sinφ formula and cross product) give zero. "Does the particle know it's inside a field?" (In the sense of feeling a force: no, if it moves parallel to the field.)

---

## Memory & review

**Memory type**: Law (F = qv×B; F = qvB sinφ) + direction rule (RHR-2: fingers→v, curl→B, thumb→F for +q) + zero work principle + cyclotron radius (r = mv/qB) + wire force (F = BIL sinφ, perpendicular to both).

**Spaced retrieval schedule**: Day 1, Day 3, Day 7, Day 21.

**Retrieval prompts**:
- "State the Lorentz force. What are the directions of F, v, and B relative to each other?"
- "A positive charge moves parallel to B. What is the magnetic force?"
- "Why does the magnetic force do no work?"
- "An electron moves at 5×10⁶ m/s perpendicular to a 0.3 T field. What is the radius of the circular orbit?"

**Interleaving**: After mastery, mix Lorentz force problems with Newton's second law problems (F = ma — the Lorentz force IS the net force in many problems: qvB = mv²/r → r = mv/(qB)). Also interleave with Hall effect problems (transverse voltage from charge deflection). Learners must apply both the force law and Newton's mechanics in the same problem.

---

## Transfer map

**Immediate transfers**:
- `phys.em.biot-savart`: the Biot-Savart law (magnetic field from a current element) is the inverse problem — given the current, find B; the Lorentz force is the complementary problem — given B, find the force on a charge

**Downstream transfers**:
- Electric motors: the torque on a current loop (τ = NIAB sinθ = **m**×**B**) is the Lorentz force on each wire segment summed into a torque
- Mass spectrometry: circular orbit radius r = mv/(qB) → m/q ratio measurement; different isotopes have different m and produce different r values
- Particle accelerators: alternating electric fields accelerate; magnetic fields bend and focus the beam; together they guide GeV particles

**Cross-subject transfers**:
- Biology — magnetic navigation in animals: migratory birds, sea turtles, and bees contain magnetite crystals or other structures that may couple to Earth's magnetic field; the Lorentz force on moving charges (possibly magnetite crystals coupled to nerve cells) is the proposed physical mechanism
- `chem` — mass spectrometry: the primary technique for molecular identification and isotope analysis; the radius of curvature in a magnetic sector is r = mv/(qB), directly giving m/q → molecular weight from measured r

---

## Curriculum feedback

The KG description "the Lorentz force F = q(E + v×B) acts on a charge q moving with velocity v in electric and magnetic fields" is accurate and complete.

One gap: the KG description does not state that the magnetic force does no work. This "no work" property is the most important physical consequence of the cross-product structure and is consistently tested. It should appear as an explicit learning outcome.

A second gap: the KG description does not mention circular motion or the cyclotron radius r = mv/(qB). Circular motion in a magnetic field is the most common application of the Lorentz force at the secondary level and is directly derived from qvB = mv²/r. It should be an explicit learning outcome alongside the force formula itself.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
