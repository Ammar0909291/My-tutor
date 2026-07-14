# Teaching Blueprint: Lorentz Transformations

## 0. Concept Metadata
| Field | Value |
|---|---|
| **Concept ID** | phys.rel.lorentz-transform |
| **Name** | Lorentz Transformations |
| **Domain** | Relativity |
| **Difficulty** | Expert |
| **Bloom Level** | Apply |
| **Estimated Hours** | 8 |
| **Mastery Threshold** | 0.80 |
| **Prerequisites** | phys.rel.length-contraction |
| **Unlocks** | phys.rel.relativistic-momentum |

---

## 1. Concept Spine

**One-sentence definition:** The Lorentz transformations relate the spacetime coordinates (t, x, y, z) of any event as measured in two inertial frames S and S' in relative motion at velocity v: t' = γ(t − vx/c²), x' = γ(x − vt), y' = y, z' = z.

**The core insight:** The Lorentz transformations are the unique linear transformation of spacetime coordinates that (1) keeps the speed of light invariant in all frames, (2) reduces to the Galilean transformation at v << c, and (3) preserves the spacetime interval Δs² = c²Δt² − Δx² − Δy² − Δz². They unify time dilation, length contraction, and relativity of simultaneity into one mathematical structure.

**Conceptual chain:**
1. Galilean transformation (classical): t' = t, x' = x − vt. Fails because it does not preserve c.
2. Requirement: the transformation that leaves c²t² − x² invariant must be a hyperbolic rotation in spacetime.
3. Lorentz transformation: t' = γ(t − vx/c²), x' = γ(x − vt), γ = 1/√(1 − v²/c²).
4. Inverse: t = γ(t' + vx'/c²), x = γ(x' + vt').
5. Time dilation emerges: proper clock at rest in S' (x' = const): Δt = γ Δt' (moving clock runs slow).
6. Length contraction emerges: rod at rest in S' (measured simultaneously in S): L = L₀/γ.
7. Relativity of simultaneity emerges: events at the same t' in S' are NOT at the same t in S.
8. Velocity addition: u = (u' + v)/(1 + u'v/c²) — never exceeds c.
9. Spacetime interval invariance: Δs² = c²Δt² − Δx² = c²Δt'² − Δx'² (invariant under Lorentz boosts).

**Central equations:**
- Forward boost (S→S', S' moves at +v along x relative to S):
  - t' = γ(t − vx/c²)
  - x' = γ(x − vt)
  - y' = y, z' = z
- Inverse (S'→S): t = γ(t' + vx'/c²), x = γ(x' + vt')
- γ = 1/√(1 − v²/c²)
- Velocity addition: u_x = (u'_x + v)/(1 + u'_x v/c²)
- Spacetime interval: Δs² = c²Δt² − Δx² − Δy² − Δz² (Lorentz-invariant)

---

## 2. Four-Stage CPA+ Mental Model

### Concrete (Enactive)
- Spacetime diagram: draw two events A and B. Show their coordinates (t, x) in S and (t', x') in S'. The Lorentz transformation rotates the coordinate axes (hyperbolically) — not a rotation by angle θ, but by rapidity φ = tanh⁻¹(v/c).
- Two lightning strikes at the ends of a moving train: simultaneously in the ground frame (S). In the train frame (S'), the front strike happens first. Same events, same spacetime, different coordinate descriptions.
- Minkowski diagram setup: ct on vertical axis, x on horizontal. Light cone at 45°. The primed axes (ct', x') are tilted symmetrically toward the light cone as v/c increases.

### Representational (Iconic)
- Side-by-side table of an event's coordinates in S and S': (t, x, y, z) and (t', x', y', z').
- Minkowski diagram: draw ct and x axes; tilt ct' and x' axes toward the light cone for v = 0.6c.
- Velocity addition graph: u vs. u' for fixed v = 0.6c. Show that even u' = 0.9c + v = 0.6c gives u = 0.974c < c.
- Spacetime interval: show that Δs² is the same in S and S' for a specific pair of events — the invariant is visually the "true distance" in Minkowski geometry.

### Abstract (Symbolic)
- Matrix form: [ct', x'] = γ [1 −β; −β 1] [ct, x] where β = v/c. This is a boost matrix in Minkowski space.
- Derive time dilation: proper clock at x' = 0 in S'. Set x' = 0 in the inverse: x = γvt. Substituting: t = γt'. (Δt = γΔτ — moving clock runs slow.)
- Derive length contraction: rod from x' = 0 to x' = L₀. Measure endpoints simultaneously in S (same t): x_front − x_rear = L₀/γ. (L = L₀/γ.)
- Derive relativity of simultaneity: two events at t' = 0 but x' = L and x' = 0: in S, Δt = γ(0 + v×L/c²) = γvL/c² ≠ 0.

### Transfer (+)
- E = mc² derivation: relativistic energy-momentum relation E² = (pc)² + (mc²)² derives from the Lorentz-covariant momentum 4-vector.
- Relativistic Doppler effect: f_obs = f_source √((1 − v/c)/(1 + v/c)) — derived from Lorentz transformation of 4-wavevector.
- GPS corrections: satellite clocks require both special relativistic (time dilation) and general relativistic corrections for meter-level accuracy — the Lorentz transformation is the SR part.

---

## 3. Why Beginners Fail

**Mode 1 — Using the Galilean transformation for relativistic problems:** Students write x' = x − vt and t' = t for any motion problem. At v << c this is fine; at relativistic speeds it gives the wrong answer because it doesn't preserve c.

**Mode 2 — Confusing the direction of the boost:** Students confuse whether S' moves at +v or −v relative to S, and consequently get the sign of vt wrong in the transformation. The convention: S' moves at +v in the +x direction relative to S; the transformation is x' = γ(x − vt), t' = γ(t − vx/c²).

**Mode 3 — Forgetting the vx/c² term in t':** The most common error. Students remember t' = γt (time dilation) and write the Lorentz transformation without the spatial term −vx/c². But t' = γ(t − vx/c²) — the time transformation depends on both t AND x. Omitting the vx/c² term gives wrong results for simultaneity.

**Mode 4 — Classical velocity addition for relativistic speeds:** Students add velocities linearly: u = u' + v. This gives superluminal speeds and is wrong at relativistic velocities. The correct formula u = (u' + v)/(1 + u'v/c²) always gives u < c for |u'|, |v| < c.

---

## 4. Misconception Library

### MC-1: "The Galilean transformation works for all speeds"
- **Probe:** "A spaceship moves at 0.9c relative to Earth. A light beam is emitted forward from the ship. Use the Galilean velocity addition to find the beam's speed in the Earth frame."
- **Characteristic phrase:** "u = u' + v = c + 0.9c = 1.9c."
- **Trigger:** Galilean transformation is correct for everyday speeds and students overgeneralize it.
- **Conflict evidence [P28]:** The speed of light is c in all inertial frames (Einstein's second postulate, confirmed by Michelson-Morley and countless subsequent experiments). 1.9c violates this. The Lorentz velocity addition gives: u = (c + 0.9c)/(1 + c × 0.9c/c²) = 1.9c/1.9 = c. Exactly c in all frames.
- **Bridge [P30]:** "The Galilean transformation was not 'wrong' in Newton's era — it was untest-ably accurate for speeds << c. The Lorentz transformation reduces to the Galilean one when v/c → 0 (expand γ ≈ 1, vt >> vx/c² → drop the t' correction). But at relativistic speeds, only the Lorentz transformation preserves the speed of light."
- **Replacement [P31]:** Lorentz transformations apply at all speeds. They reduce to Galilean at v << c. At relativistic speeds, the t' = γ(t − vx/c²) term is essential and cannot be dropped.
- **Discrimination pairs [P33]:** Newtonian gravity works for most purposes but fails at strong fields (black holes) — general relativity gives the correct answer. Similarly, Galilean transformation works at low speed but fails at high speed — Lorentz gives the correct answer.
- **S6 repair path:** Check the Galilean transformation's failure: does it preserve c? Under Galilean: if x = ct (light in S), then x' = ct − vt = (c−v)t, t' = t → x'/t' = c−v ≠ c. Fails. Under Lorentz: x' = γ(ct − vt) = γt(c−v), t' = γ(t − vt × c/c²) = γt(1 − v/c). x'/t' = (c−v)/(1−v/c) = c(c−v)/(c−v) = c. Lorentz preserves c.

### MC-2: "The time transformation is just t' = γt"
- **Probe:** "Two events occur at (t=0, x=0) and (t=0, x=L) in S. Are they simultaneous in S'?"
- **Characteristic phrase:** "Simultaneous means same t, so same t' — simultaneity is absolute."
- **Trigger:** Students learned t' = γΔτ (time dilation) and conflate it with the full Lorentz transformation for t'.
- **Conflict evidence [P28]:** t' = γ(t − vx/c²). For the two events: event 1 at (0,0) → t'₁ = γ(0 − v×0/c²) = 0. Event 2 at (0,L) → t'₂ = γ(0 − vL/c²) = −γvL/c² ≠ 0. The events are NOT simultaneous in S'.
- **Bridge [P30]:** "Time dilation (t' = γΔτ) is the special case of the Lorentz transformation for a clock at rest in S' (x' = const). The full Lorentz transformation t' = γ(t − vx/c²) applies to any event. The spatial term vx/c² is what produces relativity of simultaneity — events at the same t but different x have different t'."
- **Replacement [P31]:** The full time transformation is t' = γ(t − vx/c²). Time dilation is only the special case for a clock at rest in S'. The spatial correction term vx/c² is always present and is responsible for the relativity of simultaneity.
- **Discrimination pairs [P33]:** t' = γΔτ applies between proper time and coordinate time for one clock. t' = γ(t − vx/c²) applies to a single event's coordinates.
- **S6 repair path:** Show the train lightning thought experiment: two lightning strikes, simultaneously in S (Δt = 0), at x = 0 and x = L. In S': Δt' = γ(0 − vL/c²) = −γvL/c² ≠ 0. The front strike (x = L) appears earlier in S' (negative Δt').

### MC-3: "Relativistic velocity addition gives u = u' + v"
- **Probe:** "Two ships approach each other, each at v = 0.8c relative to Earth. What speed does each ship measure the other approaching at?"
- **Characteristic phrase:** "0.8c + 0.8c = 1.6c."
- **Trigger:** Classical intuition: velocities add linearly. This gives superluminal answers for relativistic speeds.
- **Conflict evidence [P28]:** u = (u' + v)/(1 + u'v/c²). Ship A at v = 0.8c in Earth frame. Ship B approaches at u' = −0.8c in Earth frame. In Ship A's frame: speed of B = (−0.8c + 0.8c)/(1 + (−0.8)(0.8)) = (0)/(1 − 0.64) → wait: set up correctly. Ship A moves at +0.8c (S' = ship A, moving at +0.8c relative to Earth S). Ship B moves at −0.8c in S. u' = (u − v)/(1 − uv/c²) = (−0.8c − 0.8c)/(1 − (−0.8)(0.8)) = −1.6c/1.64 ≈ −0.976c. Never exceeds c.
- **Bridge [P30]:** "The velocity addition formula has a denominator (1 + u'v/c²) that is always > 1 when u' and v have the same sign. This denominator prevents the sum from exceeding c. At low speeds, u'v << c² and the denominator ≈ 1, recovering classical addition."
- **Replacement [P31]:** Relativistic velocity addition: u = (u' + v)/(1 + u'v/c²). Always |u| < c when |u'|, |v| < c.
- **Discrimination pairs [P33]:** Classical: u = u' + v (no denominator). Relativistic: u = (u' + v)/(1 + u'v/c²) (denominator < 1 when u' and v same sign → result larger than classically expected but < c).
- **S6 repair path:** Verify that light's speed is preserved: u' = c, v = 0.6c: u = (c + 0.6c)/(1 + c×0.6c/c²) = 1.6c/1.6 = c. ✓ The formula correctly gives c for light.

### MC-4: "The Lorentz transformation changes only x and t but leaves energy unchanged"
- **Probe:** "A photon has energy E in frame S. Frame S' moves at v relative to S in the direction of photon travel. Does the photon have the same energy E in S'?"
- **Characteristic phrase:** "Energy is a scalar — Lorentz transformation doesn't change it."
- **Trigger:** Students know Lorentz transformation acts on (t, x) but don't realize energy and momentum form a 4-vector (E/c, p_x, p_y, p_z) that transforms the same way.
- **Conflict evidence [P28]:** The energy of a photon is E = hf. If the source moves at v relative to the observer, the frequency is Doppler shifted: f_obs = f_source √((1−v/c)/(1+v/c)). Therefore E_obs ≠ E_source. Energy is NOT a Lorentz scalar.
- **Bridge [P30]:** "Energy is the time-component of the energy-momentum 4-vector (E/c, p). This 4-vector transforms exactly like (ct, x) under Lorentz boosts: E' = γ(E − vp_x). For a photon with p_x = E/c: E' = γ(E − v × E/c) = γE(1 − v/c) = E√((1−v/c)/(1+v/c)). This is the relativistic Doppler formula."
- **Replacement [P31]:** Energy transforms as E' = γ(E − vp_x) — it is the time component of a Lorentz 4-vector, not a scalar. The Lorentz-invariant is E² − (pc)² = (mc²)² = invariant mass squared × c⁴.
- **Discrimination pairs [P33]:** Lorentz scalars (same in all frames): c, proper time τ, rest mass m, spacetime interval Δs². Lorentz non-scalars (frame-dependent): E, p, t, x, F (force).
- **S6 repair path:** Compute E' for a photon using the 4-vector Lorentz transformation. Compare to the relativistic Doppler formula. Verify they agree. This prepares students for phys.rel.relativistic-momentum.

---

## 5. Explanation Library

**Explanation A — The derivation from first principles (procedural):**
"We require a linear transformation from (t, x) to (t', x') that: (1) is linear (so that inertial frames map to inertial frames), (2) reduces to Galilean at v → 0, (3) preserves c (if x = ct in S, then x' = ct' in S'). Assume t' = α(t − vx/c²) and x' = α(x − vt). Check: if x = ct → x' = α(ct − vt) = αt(c − v) and t' = α(t − vt) = αt(1 − v/c). x'/t' = (c−v)/(1−v/c) = c. ✓ Now find α from the inverse: the inverse must be the same transform with v → −v (symmetry of inertial frames). Applying twice: identity requires α² (1 − v²/c²) = 1 → α = γ = 1/√(1−v²/c²). Done: t' = γ(t − vx/c²), x' = γ(x − vt)."

**Explanation B — Unification of time dilation and length contraction (synthesis):**
"Time dilation: a clock at rest in S' sits at x' = 0. Inverse transform: x = γ(x' + vt'). With x' = 0: x = γvt'. Also: t = γ(t' + vx'/c²) = γt'. So Δt = γΔt'. Moving clock runs slow — time dilation falls out. Length contraction: a rod at rest in S' extends from x' = 0 to x' = L₀. Measure simultaneously in S (same t). Forward transform: x' = γ(x − vt). At same t: L₀ = γ(x_front − x_rear) → x_front − x_rear = L₀/γ. Length contraction falls out. Both effects are embedded in the single pair of equations t' = γ(t − vx/c²) and x' = γ(x − vt)."

**Explanation C — Spacetime interval as the invariant (geometric):**
"In Euclidean geometry, the distance Δr² = Δx² + Δy² is invariant under rotations. In Minkowski geometry, the spacetime interval Δs² = c²Δt² − Δx² − Δy² − Δz² is invariant under Lorentz boosts. A Lorentz boost is a 'hyperbolic rotation' in the (ct, x) plane — the ct axis and x axis tilt toward the light cone (which stays at 45°). Lorentz-invariant quantities (Δs², rest mass m) are the 'lengths' in Minkowski geometry — they don't change when you change reference frames. This invariant is the foundation of relativistic mechanics."

---

## 6. Analogy Library

**Primary analogy — The coordinate rotation:**
Rotating axes in 2D: a point with coordinates (x, y) gets new coordinates (x', y') = (x cosθ + y sinθ, −x sinθ + y cosθ). The length x² + y² is preserved. A Lorentz boost is the same idea in (ct, x) space — but with hyperbolic functions (cosh φ, sinh φ where tanh φ = v/c) instead of circular ones. The invariant is c²t² − x² instead of x² + y².

**Breaking point:** Circular rotations: x² + y² is invariant (Pythagoras). Lorentz boosts: c²t² − x² is invariant — a minus sign instead of a plus. This minus sign is the key to the strange properties of spacetime: time can be traded for space (and vice versa) but the combination c²t² − x² is fixed. Also: you can rotate a spatial vector by any angle; you cannot boost to v ≥ c (the hyperbolic angle φ = tanh⁻¹(v/c) → ∞ as v → c).

**Anti-analogy:** Do NOT say "the Lorentz transformation just stretches and compresses space and time separately." Time dilation and length contraction are separate effects in isolation, but the Lorentz transformation couples them: time in S' depends on both time AND position in S (the vx/c² term). Treating them separately gives wrong results for simultaneity.

---

## 7. Demonstration Library

**Demo 1 — Numerical Lorentz transform for two events:**
Given S' moves at v = 0.6c (γ = 1.25) relative to S. Two events: A = (t=0, x=0), B = (t=0, x=5 ly).
Transform B to S': t'_B = γ(0 − 0.6c × 5 ly/c²) = 1.25 × (−3 ly/c) = −3.75 yr. x'_B = γ(5 ly − 0) = 6.25 ly.
Event B is in the PAST in S' (t'_B < 0) even though it's simultaneous with A in S (t_B = 0). Relativity of simultaneity is explicit in the numbers.

**Demo 2 — Velocity addition check:**
Frame S': rocket at v = 0.8c relative to Earth. Fires a probe forward at u' = 0.8c relative to rocket.
Classical: u = 0.8c + 0.8c = 1.6c > c. Wrong.
Relativistic: u = (0.8c + 0.8c)/(1 + 0.64) = 1.6c/1.64 ≈ 0.976c < c. ✓

**Demo 3 — Spacetime interval verification:**
Using Demo 1 events A and B: in S: Δs² = c²×0² − (5 ly)² = −25 ly². In S': Δs² = c²×(−3.75 yr)² − (6.25 ly)² = c² × 14.06 yr² − 39.06 ly². Since 1 ly = c × 1 yr: = 14.06 c² yr² − 39.06 c² yr² = −25 c² yr² = −25 ly². ✓ Invariant.

---

## 8. Discovery Lesson

**Opening (5 min):** "You know time dilation and length contraction as separate formulas. Today I want to show you they're not separate at all — they're two faces of one mathematical structure. And that structure will also reveal why you cannot simply add relativistic velocities."

**Guided inquiry (20 min):**
- Step 1: Write the Galilean transformation: t' = t, x' = x − vt. Check: does it preserve c? (Students verify: it doesn't.)
- Step 2: Require t' = α(t − vx/c²), x' = α(x − vt). Students verify that x = ct → x'/t' = c (light speed preserved). Find α = γ from the consistency requirement (inverse transformation = same with v → −v). Arrive at the Lorentz transformation.
- Step 3: Students derive time dilation from the Lorentz transformation by setting x' = 0 in the inverse. Verify: Δt = γΔt'.
- Step 4: Students solve Demo 1 numerically — compute t'_B and x'_B for the simultaneous events.

**Synthesis (10 min):**
- Present the spacetime interval Δs² as the invariant.
- State velocity addition formula; verify Demo 2.
- Show matrix form of the Lorentz boost for compact notation.

**Closure:** "Every relativistic formula — time dilation, length contraction, velocity addition, E = mc², the Doppler effect — follows from the Lorentz transformation. This single set of equations is the mathematical core of special relativity. Master this and everything else is algebra."

---

## 9. Teaching Actions

*(session_cap = 4 actions)*

**TA-1 [DERIVE]:** Explanation A (derivation from first principles) — students see that the Lorentz transformation is the unique linear transformation preserving c. This grounds the transformation as necessary, not arbitrary.

**TA-2 [SYNTHESIZE]:** Explanation B — derive time dilation and length contraction from the Lorentz transformation. Show that these two results are not independent formulas but special cases of one transformation.

**TA-3 [NUMERICAL PRACTICE]:** Demo 1 (transform two events numerically, extract relativity of simultaneity). Demo 2 (velocity addition — compare classical vs. relativistic). Demo 3 (verify spacetime interval invariance).

**TA-4 [PROBE]:** MC-2 probe ("Are two simultaneous events in S also simultaneous in S'?") and MC-3 probe ("Two rockets approach at 0.8c each — what does each measure the other's speed as?"). Resolve with the full Lorentz transformation and velocity addition formula.

---

## 10. Voice Teaching

**Opening:**
"We have two separate formulas — time dilation and length contraction — that both came from Einstein's postulates. Are these just two disconnected results? No. They're components of one unified structure: the Lorentz transformation. Today I want to derive it from scratch, starting with only two requirements: the transformation must be linear, and it must preserve the speed of light. From those two demands, the entire structure of special relativity follows. Let's build it."

**At the derivation:**
"I need a transformation from (t, x) to (t', x') that maps the light beam x = ct in S to x' = ct' in S'. I'll try t' = α(t − vx/c²) and x' = α(x − vt). Check: substitute x = ct. I get x'/t' = (ct − vt)/(t − vt) = c. Good — light speed preserved. Now I need to find α. The inverse transformation must look the same with v → −v: t = α(t' + vx'/c²), x = α(x' + vt'). Substitute the forward into the inverse. After algebra: identity requires α² (1 − v²/c²) = 1 → α = γ. That's it — the Lorentz transformation falls out of two requirements."

**At relativity of simultaneity:**
"Here's the surprising thing. Two events are simultaneous in S — same t, different x. Let's transform to S'. Event 1 at (t=0, x=0): t'₁ = γ(0 − 0) = 0. Event 2 at (t=0, x=L): t'₂ = γ(0 − vL/c²) = −γvL/c² < 0. Event 2 is in the past in S'. Simultaneity is not preserved. Two things happening at the same time in one frame do NOT happen at the same time in another frame. This isn't an illusion or a measurement artifact. It's fundamental. The Lorentz transformation tells us that 'at the same time' is frame-dependent."

---

## 11. Assessment

**Mastery gate:** Student correctly applies the Lorentz transformation to individual events, derives time dilation and length contraction from the transform, applies relativistic velocity addition, and verifies spacetime interval invariance. Score ≥ 80%.

**FA-1 — Coordinate transformation:**
*Q: S' moves at v = 0.8c relative to S (γ = 5/3). An event occurs at t = 10 s, x = 6 × 10⁹ m in S. Find t' and x'. (c = 3 × 10⁸ m/s)*
Expected: β = 0.8, γ = 5/3. ct = 3 × 10⁹ m. t' = γ(t − vx/c²) = (5/3)(10 − 0.8 × 6×10⁹/(3×10⁸ × c)) → vx/c² = 0.8c × 6×10⁹ m / c² = 0.8 × 6×10⁹/(3×10⁸) s = 16 s. t' = (5/3)(10 − 16) = (5/3)(−6) = −10 s. x' = γ(x − vt) = (5/3)(6×10⁹ − 0.8 × 3×10⁸ × 10) = (5/3)(6×10⁹ − 2.4×10⁹) = (5/3)(3.6×10⁹) = 6×10⁹ m.
Threshold: Correct t' = −10 s (past in S') and x' = 6×10⁹ m.

**FA-2 — Simultaneity:**
*Q: Two events occur at (t=0, x=0) and (t=0, x=12 ly) in S. S' moves at v=0.6c (γ=1.25) relative to S. Are these events simultaneous in S'? If not, which occurs first?*
Expected: t'₁ = γ(0 − 0) = 0. t'₂ = γ(0 − 0.6c × 12 ly/c²) = 1.25 × (−7.2 yr) = −9 yr. Event 2 occurs BEFORE event 1 in S' (t'₂ = −9 yr < 0 = t'₁). Not simultaneous.
Threshold: Correct computation of t'₂ and correct conclusion about which event occurs first.

**FA-3 — Velocity addition:**
*Q: A spaceship moves at 0.6c relative to Earth. It launches a probe at 0.8c relative to the spaceship (in the same direction). What is the probe's speed relative to Earth?*
Expected: u = (0.8c + 0.6c)/(1 + 0.8 × 0.6) = 1.4c/1.48 ≈ 0.946c.
Threshold: Correct formula application and answer within 0.01c.

**FA-4 — Derive time dilation:**
*Q: Starting from the Lorentz transformation, derive the time dilation formula Δt = γΔτ for a clock at rest in S'.*
Expected: Clock at rest in S' has x' = const (say x' = 0). The inverse Lorentz transformation: x = γ(x' + vt'). With x' = 0: x = γvt'. Also: t = γ(t' + 0) = γt'. So Δt = γΔt'. Since Δt' = Δτ (proper time on the clock), Δt = γΔτ.
Threshold: Correct use of x' = 0 condition and correct derivation.

**Confidence calibration:** After FA-1, students who get t' negative are often uncertain (it seems counterintuitive that an event in the future in S is in the past in S'). Targeted reassurance: "Negative t' means the event happened before S' clocks were synchronized at origin. Check: is the spacetime interval the same in both frames?" — grounds the student in the invariant.

**Delayed retrieval (session + 3):** "Write the Lorentz transformation equations. Derive length contraction from them. (Hint: measure the endpoints of a rod simultaneously in S.)"

---

## 12. Recovery Notes

**S0:** Student needs phys.rel.length-contraction (and implicitly phys.rel.time-dilation, phys.rel.simultaneity). Without the prior kinematic results, the Lorentz transformation's derivation has no motivation.

**S3:** Student can apply the forward transform but not the inverse, and cannot derive time dilation or length contraction. Drill: explicitly set x' = 0 in the inverse to get time dilation; set Δt = 0 in the forward to get length contraction. These are the two key special cases.

**S6:** Student omits the vx/c² term in t'. Show FA-1 explicitly: the vx/c² term = 16 s dominates here — omitting it gives a wildly wrong answer. Emphasize: t' = γ(t − vx/c²) always; time dilation t' = γt is only the special case where x = 0.

**S9:** Introduce the 4-vector notation. Define the 4-position X^μ = (ct, x, y, z). Define the Lorentz boost matrix Λ. Show Λ^μ_ν transforms X^μ → X'^μ = Λ^μ_ν X^ν. Introduce the metric tensor η = diag(1, −1, −1, −1). Spacetime interval: Δs² = η_μν ΔX^μ ΔX^ν — invariant because Λ^T η Λ = η. This is the foundation for relativistic electrodynamics and general relativity.

---

## 13. Memory & Review

**Memory type:** Procedural (Lorentz transform equations, velocity addition formula) + conceptual (spacetime interval invariance, simultaneity is relative, time dilation/length contraction as special cases).

**Spaced retrieval schedule:**
- Session + 1: "Write the Lorentz transformation equations. What is the inverse?"
- Session + 3: "Starting from the Lorentz transform, derive length contraction in 3 steps."
- Session + 7: "A particle moves at u' = 0.7c in S'. S' moves at v = 0.5c relative to S. Find u. Compare to classical addition."

**Interleaving partners:** phys.rel.time-dilation and phys.rel.length-contraction (both are special cases of the Lorentz transform — revisit them now as derivations, not separate postulates); phys.rel.relativistic-momentum (successor — 4-momentum transforms under Lorentz boosts); phys.rel.simultaneity (conceptual prerequisite — now seen as a consequence of t' = γ(t − vx/c²)).

---

## 14. Transfer Map

**Near transfer:** Relativistic Doppler effect: using the Lorentz transformation of the 4-wavevector (ω/c, k), derive f_obs = f_source √((1−β)/(1+β)).

**Far transfer:** Electromagnetism: Maxwell's equations are Lorentz-covariant. The Faraday tensor F^μν = [[0, −E_x/c, ...; E_x/c, 0, B_z, ...]] transforms under Lorentz boosts — electric and magnetic fields mix when you change reference frames. This is the deepest unification in classical physics.

**Structural abstraction:** "Linear transformations that preserve a quadratic form." In Euclidean geometry: rotations preserve x² + y². In Minkowski geometry: Lorentz boosts preserve c²t² − x². In general relativity: diffeomorphisms preserve the metric ds² = g_μν dx^μ dx^ν. The structural pattern — transformation group + invariant — is one of the organizing principles of modern physics.

---

## 15. Curriculum Feedback

- **Prerequisite adequacy:** phys.rel.length-contraction is listed, but phys.rel.simultaneity should also be an explicit prerequisite — the Lorentz transformation's most important new prediction (beyond time dilation and length contraction) is the relativity of simultaneity, and students who haven't seen it as a concept will be unprepared.
- **Unlock readiness:** phys.rel.relativistic-momentum requires the 4-momentum framework, which builds directly on the Lorentz transformation of 4-vectors introduced in S9 extensions. Students are ready after this concept.
- **Difficulty calibration:** Expert/apply is appropriate. The algebra is manageable, but the conceptual demands (simultaneity, interval invariance, 4-vector structure) are high, and students must have firm foundations in time dilation, length contraction, and simultaneity before tackling the unified Lorentz transformation.
- **Suggested problem set:** (1) Transform 4 events numerically with v = 0.6c; verify interval invariance for each. (2) Derive both time dilation and length contraction from the Lorentz transform (not from first principles). (3) Three velocity addition problems at 0.5c, 0.8c, 0.99c. (4) Solve the barn-pole paradox using explicit Lorentz transformation of all four key events (pole enters/exits barn in both frames).

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
