# phys.mech.work — Work Done by a Force

## 1. Identity
- **Canonical KG ID**: `phys.mech.work`
- **Canonical name**: Work Done by a Force
- **Curriculum domain**: Mechanics
- **Difficulty tier**: proficient
- **Bloom level**: apply
- **Prerequisites**: `phys.mech.newtons-second-law`, `phys.meas.vector-products`
- **Unlocks**: `phys.mech.kinetic-energy`, `phys.mech.potential-energy`, `phys.mech.power`, `phys.therm.first-law`
- **Estimated study hours**: 4
- **KG description**: Work is the scalar product of force and displacement, measuring energy transfer by a force.

---

## 2. Mental Models (4-stage progression)

**Stage 1 — Concrete (pushing a box)**
You push a box across a floor. You exert a force, and the box moves. You have done work. If you push and the box doesn't move, you have done no work (by the physics definition). If you carry the box horizontally with force vertical (holding it up) while walking sideways — the force is vertical, displacement is horizontal, they are perpendicular — you do zero work on the box by the holding force. Work requires force AND motion in the same direction (or a component of each in the other's direction).

**Stage 2 — Scalar product definition**
W = F⃗ · d⃗ = Fd cosθ

where F = magnitude of force (N), d = magnitude of displacement (m), θ = angle between the force vector and the displacement vector.
SI unit: joule (J = N·m)

Key cases:
- θ = 0° (force and displacement in same direction): W = Fd (maximum positive work)
- θ = 90° (force ⊥ displacement): W = 0 (no work done)
- θ = 180° (force opposite to displacement): W = −Fd (negative work, force opposes motion)

Work is a scalar — it can be positive (force adds energy to object), negative (force removes energy), or zero.

**Stage 3 — Work by variable forces (integral)**
For a variable force F(x) along displacement dx: W = ∫F(x)dx
Graphically: W = area under the F vs. x graph.

Special case: Spring force F = −kx (Hooke's law, restoring force toward equilibrium).
Work done BY the spring stretching from x = 0 to x = x₀:
W_spring = ∫₀^{x₀} (−kx)dx = −½kx₀²

Work done BY an external agent stretching the spring (against the spring force):
W_ext = +½kx₀²

**Stage 4 — Work-energy theorem**
The net work done on an object equals the change in its kinetic energy:
W_net = ΔKE = ½mv_f² − ½mv_i²

Derivation: F_net = ma = m(dv/dt); W_net = ∫F_net dx = ∫m(dv/dt)(dx/dt)dt = ∫mv dv = ½mv² |_i^f = ΔKE.

This theorem connects Newtonian mechanics (forces) to energy mechanics (kinetic energy), forming the bridge between the two frameworks.

**Mental-model versioning**: Stage 1 for intuitive grounding; Stage 2 for all standard work calculations; Stage 3 for spring problems; Stage 4 for the work-energy theorem (the unlock to `phys.mech.kinetic-energy`).

---

## 3. Why Beginners Fail

1. **Work = effort or exertion**: Students conflate the everyday meaning of "work" (physical effort) with the physics definition (F·d). Holding a heavy weight motionless is exhausting but does zero physics work on the weight. Carrying a horizontal load horizontally does zero work on the load.
2. **Forgetting the angle**: Computing W = Fd instead of W = Fd cosθ when the force and displacement are not parallel. Particularly common for forces applied at angles to the horizontal.
3. **Sign errors**: Work by friction is always negative for kinetic friction opposing motion (θ = 180°). Work by gravity is negative when moving up (θ = 180° between mg downward and displacement upward) and positive when moving down. Students often assign the wrong sign.
4. **Confusing work by individual forces vs. net work**: The work-energy theorem uses W_net (sum of work done by ALL forces). Students compute the work by one force and equate it to ΔKE — this is only correct if that one force is the only force.

---

## 4. Misconception Library

**M1 — "Holding a heavy object requires no work, so no energy is needed"**
- Probe: "You hold a 20 kg barbell motionless for 10 minutes. How much work do you do?"
- Characteristic phrase: "My muscles are exhausted — I must have done a lot of work."
- Recovery: Physics work W = Fd cosθ. Displacement d = 0 (barbell didn't move). Therefore W = 0, regardless of the force applied. Biological work is done (muscles expend chemical energy maintaining tension via repeated ATP cycling), but mechanical work in the physics sense is zero. Separate "effort" from "work." The barbell's mechanical energy (KE + PE) did not change → no mechanical work was done on it.

**M2 — "Work is always force times distance (no cosθ)"**
- Probe: "A force of 50 N at 60° above horizontal pushes a box 10 m horizontally. How much work does the force do?"
- Characteristic phrase: "W = 50 × 10 = 500 J."
- Recovery: W = Fd cosθ = 50 × 10 × cos60° = 50 × 10 × 0.5 = 250 J. Only the component of force along the displacement does work. Draw the force vector; project it onto the displacement direction: F_parallel = F cosθ = 25 N. Work = 25 N × 10 m = 250 J. ✓

**M3 — "Normal force and centripetal force do positive work"**
- Probe: "A satellite orbits Earth at constant speed. Does gravity do work on it?"
- Characteristic phrase: "Gravity pulls the satellite, so it must do work — the satellite would fall without it."
- Recovery: For a circular orbit, gravity is centripetal: always perpendicular to velocity (θ = 90° between F_grav and v⃗). W = Fd cos90° = 0. Gravity does zero work on the satellite in a circular orbit — consistent with constant speed (ΔKE = 0). This applies to any centripetal force: always ⊥ to motion → always zero work → speed stays constant. Normal force on a flat surface is ⊥ to horizontal motion → zero work too.

**M4 — "Negative work means the force is backward — nothing else"**
- Probe: "Friction does negative work on a sliding block. What does this mean for the block's energy?"
- Characteristic phrase: "Negative work just means the direction is opposite."
- Recovery: Negative work done on an object means the force is removing mechanical energy from it. Friction doing negative work on the block reduces the block's kinetic energy (it slows down). Where does this energy go? Into heat (thermal energy) at the friction interface. Negative work is energy removal from the mechanical system — not just a sign convention.

---

## 5. Explanation Library

**E1 — Dot product origin**
W = F⃗ · d⃗ = F_x d_x + F_y d_y + F_z d_z = Fd cosθ. Only the component of force along the displacement contributes to work. The perpendicular component is "wasted" in terms of energy transfer to the object's kinetic energy.

**E2 — Work by gravity (path-independent result)**
A mass m moves from height h₁ to h₂ along any path. Work by gravity:
W_grav = mg⃗ · Δr⃗ = mg(h₁ − h₂) (taking upward as positive y)
This is path-independent — W_grav depends only on the vertical displacement, not the path taken. Gravity is a conservative force.

**E3 — Spring work**
Stretch a spring from natural length (x = 0) by extension x: F_applied = +kx (external, against spring), F_spring = −kx (spring restoring).
W_ext = ½kx² (positive — agent puts energy into spring).
W_spring = −½kx² (negative — spring resists extension, removes energy from external agent).
When spring releases: W_spring = +½kx² (positive — spring does positive work on released mass).

**E4 — Work-energy theorem proof**
Net force on mass m: F_net = ma.
W_net = ∫F_net dx = ∫ma dx = ∫m(dv/dt) dx = ∫mv dv = ½mv_f² − ½mv_i² = ΔKE.
This is exact (no approximations); valid for any force law.

---

## 6. Analogy Library

**Primary analogy — Money transfer**
Work is like a financial transaction. Positive work = money deposited into the object's "energy account" (kinetic or potential). Negative work = money withdrawn. Zero work = transaction with zero transfer amount (no deposit, no withdrawal). The "balance" (total mechanical energy) changes only when there is a net nonzero transaction.

**Breaking point**: Money can be in different forms (cash, credit, investment) but doesn't have a direction. Work has a sign but not a direction (it's scalar). The analogy captures the sign significance but not the F·d cosθ geometry. Use it for intuition about positive/negative/zero work; use the angle picture for computation.

**Anti-analogy — Power**: Students often confuse work and power. Work is total energy transferred (J); power is the rate of energy transfer (W = J/s). A slow force over a long displacement can do the same work as a large force over a short time — only the rate differs. Do not use work and power interchangeably.

---

## 7. Demonstration Library

**D1 — Force sensor + motion sensor on an air track**
Attach a spring to a cart on an air track. Measure force with a force sensor and position with a motion sensor. Record F vs. x data. Calculate area under the F-x curve (W_spring). Simultaneously measure v before and after release. Compute ΔKE = ½mv². Verify W_net ≈ ΔKE (work-energy theorem). Quantitative, live, and compelling.

**D2 — Inclined ramp: different paths, same height**
Roll a ball up a straight ramp and a curved ramp (same height h). Measure speed at the bottom in both cases. Observe: both arrive with the same speed (same W_grav = mgh regardless of path). Demonstrates path-independence of gravitational work and introduces the conservative-force concept.

**D3 — Zero-work demonstrations**
(a) Push a box sideways while holding it at constant height (W_grav = 0). (b) Push a box against an immovable wall (d = 0, W = 0). (c) Swing a bucket in a circle (N and gravity do zero work; speed is constant). Ask students to predict speed change for each — zero each time — then verify. Builds the zero-work intuition.

---

## 8. Discovery Lesson

*Guided discovery of W = Fd cosθ*:

1. Students measure the work done to lift a block straight up (F = mg vertical, d vertical, θ = 0° → W = mgd). Record energy used.
2. Ask: "Now pull the block up a ramp of the same height. You exert less force. Do you do less work?"
3. Students measure F (via spring scale) and d (length of ramp). Compute F × d along the ramp.
4. Result: F × d_ramp ≈ mg × h (the same work, just spread over longer d with smaller F).
5. Introduce θ: the ramp angle changes the component of force along displacement.
6. Generalise: W = Fd cosθ is the component of force along displacement times the displacement.

The ramp discovery reveals that machines change the force-distance trade-off but not the work done.

---

## 9. Teaching Actions (dispatch table)

| Situation | Action |
|---|---|
| Student uses W = Fd without θ | Ask: "Are the force and displacement in exactly the same direction?" Draw them both as arrows; measure the angle between them. |
| Student says "holding a weight takes work" | Draw FBD: force upward, displacement = 0. W = F × 0 = 0. Biological effort ≠ mechanical work. |
| Student gives wrong sign for friction work | Ask: "Is friction helping or hindering the motion?" Hindering (opposing) → θ = 180° → cosθ = −1 → W < 0. Helping → W > 0. |
| Student sets W_friction = ΔKE | Ask: "Are there other forces doing work?" If yes, W_net ≠ W_friction; W_net = ΔKE. |
| Student ready for energy conservation | Show that for conservative forces only (no friction): W_net = W_grav + W_spring = ΔKE → −ΔPE = ΔKE → Δ(KE + PE) = 0. This is the introduction to energy conservation. |

---

## 10. Voice Teaching

"Physics work has a precise definition: W equals F dot d, or equivalently F times d times cosine-theta, where theta is the angle between the force and the displacement. Three key consequences of that cosine:

If the force and displacement are in the same direction, cosine is 1 — maximum positive work. Force adds energy to the object. If they're perpendicular — like a normal force on a horizontal surface, or gravity on a satellite in circular orbit — cosine is zero, work is zero. If they're opposite — like friction opposing motion — cosine is minus 1, work is negative. The force is removing energy.

The work-energy theorem ties everything together: the net work done on an object — sum of work from every force — equals the change in kinetic energy. If you know all the work done, you know how much the speed changed. This theorem is why energy is such a powerful framework for mechanics.

One more: work is always done on a specific object. Friction does negative work on the sliding block (removes energy). The heat generated is energy that went into the thermal system, not into the block's kinetic energy. Energy is conserved globally; the work done on one object accounts for the energy transferred to that object specifically."

---

## 11. Assessment

**Mastery gate**: Student correctly computes W = Fd cosθ for forces at angles, identifies zero-work cases (⊥ forces), assigns correct signs, applies the work-energy theorem (W_net = ΔKE), and correctly identifies which forces do work in standard problems. Four independent multi-step problems required.

**Formative golden probe**: "A 10 kg block slides 5 m along a horizontal floor. A horizontal applied force of 40 N pushes it; friction (μ_k = 0.3) opposes motion. (a) Find the work done by the applied force. (b) Find the work done by friction. (c) Find the work done by gravity. (d) Find the net work. (e) Find the final speed if initial speed is 2 m/s."

Answers:
- (a) W_applied = 40 × 5 × cos0° = 200 J
- (b) f_k = μ_k mg = 0.3 × 10 × 9.8 = 29.4 N; W_friction = 29.4 × 5 × cos180° = −147 J
- (c) W_gravity = 0 (gravity ⊥ horizontal displacement)
- (d) W_net = 200 − 147 = 53 J
- (e) ΔKE = 53 J; ½(10)v_f² − ½(10)(2²) = 53 → 5v_f² = 53 + 20 = 73 → v_f = √14.6 ≈ 3.82 m/s

**Confidence calibration**: After (c), ask: "What about the normal force — does it do work?" If student says yes, probe: "Normal force direction?" (upward, perpendicular to horizontal displacement) → W = 0. Correct this misconception before continuing.

**Delayed retrieval (1–2 weeks)**: "State the work-energy theorem. A 5 kg mass starts at rest and slides 10 m down a frictionless ramp at 30°. Find its speed at the bottom using the work-energy theorem."

---

## 12. Recovery Notes

**If the cosθ factor is persistently forgotten**:
Post a visual: F-vector and d-vector as arrows with angle θ between them; W = shaded projection × d (geometric picture). Always draw the vectors before computing. The geometric picture is more memorable than the algebraic formula.

**If sign of work by gravity is confused**:
Anchor with two extreme cases: (1) Drop an object — gravity and displacement both downward → W_grav > 0 → object speeds up (gains KE). ✓ (2) Throw an object upward — gravity downward, displacement upward → W_grav < 0 → object slows down (loses KE). ✓ These intuitive checks confirm the formula.

**If work-energy theorem is applied to one force only**:
Always write "W_net = ΔKE" explicitly and then expand W_net as a sum of all individual works. Never write "W_applied = ΔKE" unless the applied force is the only force doing work.

---

## 13. Memory & Review

**Memory type**: Declarative (W = Fd cosθ; W_net = ΔKE; zero-work conditions) + procedural (multi-force work calculations, sign assignment)
**Forgetting risk**: Medium — the cosθ factor is reliably dropped under time pressure; the sign of friction work and the zero-work cases need reinforcement.
**Spaced retrieval schedule**: Days 1, 3, 7, 21
**Retrieval prompt**: "A 50 N force at 37° above horizontal pushes a 10 kg block 8 m across a horizontal floor. Friction coefficient = 0.2. Find: work by applied force, work by friction, net work, and final speed from rest."

---

## 14. Transfer Map

**Near transfer**: Kinetic energy (direct unlock — W_net = ΔKE defines the connection); potential energy (conservative forces have associated PE: W_grav = −ΔPE_grav); power (P = W/t = F⃗·v⃗).
**Medium transfer**: Energy conservation in mechanics (W_nc = ΔKE + ΔPE, where W_nc = work by non-conservative forces).
**Far transfer**: Thermodynamics first law (W = Q − ΔU — the same work concept extended to thermal systems, the direct unlock `phys.therm.first-law`). Electrical work (W = qΔV, the electrical work analogue).
**Cross-domain**: Economics (utility = preferences × consumption has structural parallels to work = force × displacement; comparative advantage in trade mirrors the component-of-force insight).

---

## 15. Curriculum Feedback

- KG prerequisites `phys.mech.newtons-second-law` and `phys.meas.vector-products` are both necessary — Newton's 2nd law motivates why force matters; the dot product is the mathematical tool for W = F⃗·d⃗.
- The four unlocks are all natural consequences: kinetic energy is defined via the work-energy theorem; potential energy arises from conservative force work; power is work per unit time; thermodynamic first law extends work to thermal systems.
- Difficulty `proficient`/`apply` is correct — the θ-angle handling and sign discipline require genuine application skill.
- Suggested cross-link: `phys.therm.first-law` (unlocked) — the thermodynamic work concept (W = P dV or work done by expansion) is a direct extension of the mechanical work concept.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
