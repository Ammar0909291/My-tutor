# Teaching Blueprint — phys.mech.circular-motion

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.mech.circular-motion
name: Uniform Circular Motion
domain: mechanics
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.mech.kinematics-2d
  - phys.mech.newtons-second-law
mastery_threshold: 0.80
estimated_hours: 5
cross_links:
  - phys.mech.angular-kinematics
  - phys.mech.orbital-mechanics
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-CENTRIFUGAL-REAL
- **Trigger signal:** Student says "the centrifugal force pushes the car/ball outward" or draws a centrifugal arrow pointing away from the centre on a free-body diagram.
- **Conflict evidence [P28]:** "Stand in an inertial reference frame and watch a ball on a string swing in a circle. Cut the string. The ball flies off tangentially — not radially outward. If a centrifugal force existed in the inertial frame, the ball would fly straight out. It doesn't. What you feel 'pushing you outward' in a turning car is your body's inertia resisting the centripetal turn — it's not a force acting on you, it's the absence of the wall pushing you inward. In the inertial frame, there is only one real horizontal force: the centripetal (inward) force."
- **Bridge text [P30]:** "'Centrifugal force' is a fictitious force that appears in a rotating (non-inertial) reference frame. In an inertial frame, it does not exist. When solving circular-motion problems, always work in the inertial frame and draw only the real inward force (tension, normal force, gravity component, friction) as the centripetal force."
- **Replacement text [P31]:** "On any free-body diagram for circular motion (inertial frame): draw only the real forces — tension, weight, normal, friction, etc. The net inward component of these real forces equals mv²/r (the centripetal requirement). Never draw a centrifugal arrow."
- **Discrimination pairs [P33]:**
  - Ball on string in circle: tension T acts inward (centripetal) — no outward force drawn ✓
  - Same ball: student draws T inward AND F_cf outward — wrong ✗ (net force would be zero; ball would travel in a straight line)
- **s6_path:** "The 'centrifugal force' confusion is nearly universal — it comes from our everyday experience in rotating frames. The key: in physics problems, we always use the inertial frame where centrifugal force doesn't exist. Real forces only."

---

### MC-CONSTANT-SPEED-NO-ACCELERATION
- **Trigger signal:** Student says "the speed is constant in uniform circular motion, so there's no acceleration" or sets F_net = 0.
- **Conflict evidence [P28]:** "Acceleration is the rate of change of velocity, not speed. Velocity is a vector — it has direction as well as magnitude. In circular motion, the speed |v| is constant, but the direction of v changes every instant. A change in direction is a change in velocity, which requires acceleration. The acceleration is centripetal — pointing toward the centre — and has magnitude v²/r (or rω²). Newton's 2nd law: F_net = ma = mv²/r ≠ 0."
- **Bridge text [P30]:** "Think of driving around a roundabout at constant speed. Your speedometer reads steady. But you feel the seat pushing you sideways — that's the centripetal force. Your car is accelerating (changing direction) even though it isn't speeding up or slowing down."
- **Replacement text [P31]:** "Uniform circular motion: constant speed, but non-zero acceleration. Centripetal acceleration a_c = v²/r = rω², directed toward the centre. The centripetal force F_c = mv²/r is the net force required to maintain the circular path."
- **Discrimination pairs [P33]:**
  - Constant speed → dv/dt = 0 (tangential acceleration = 0) ✓
  - Constant speed → no acceleration — WRONG (centripetal acceleration ≠ 0) ✗
- **s6_path:** "This is one of the most important conceptual shifts in mechanics. Speed constant does NOT mean velocity constant. Once you see it, you'll never confuse it again."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — 2D velocity as a vector**
Prompt: "A car moves at 20 m/s east, then turns and moves at 20 m/s north. Has the speed changed? Has the velocity changed? Is there an acceleration?"
- Pass: speed unchanged (20 m/s); velocity changed (direction changed); there was acceleration during the turn.
- Fail → [P52]: "Velocity is a vector — it carries direction. A change in direction is a change in velocity, which requires acceleration. Let's confirm this before we look at circular motion." → Route to phys.mech.kinematics-2d.

**PD-2 [P41] — Newton's second law**
Prompt: "A 2 kg object moves in a curve. At one instant, the net force on it is 8 N directed toward the centre of curvature. What is its acceleration? In which direction?"
- Pass: a = F/m = 4 m/s² directed toward the centre.
- Fail → [P52]: "We need Newton's 2nd law before circular motion. F_net = ma tells us the direction of acceleration matches the net force direction." → Route to phys.mech.newtons-second-law.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — ball on a string**

> Swing a ball on a string in a horizontal circle above your head. Ask the student: Which direction does the string pull the ball? (Inward — toward your hand.) If you cut the string, which direction does the ball go? (Tangential — not outward.) What keeps the ball on its circular path? (The string tension, acting inward.)

Follow-up provocation: "Now swing it faster. What do you notice about the tension?" (It increases.) "Swing a heavier ball at the same speed and radius — what changes?" (Tension increases again.) These lead directly to F_c = mv²/r.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Centripetal Acceleration Derivation [C]**

For a particle moving at constant speed v in a circle of radius r, the velocity vector rotates. In a small time Δt, the velocity changes direction by angle Δθ. The change in velocity Δv has magnitude v × Δθ (for small angles). The acceleration:

```
a_c = lim(Δt→0) |Δv|/Δt = v × (Δθ/Δt) = v × ω = v²/r = rω²
```

Direction: always toward the centre of the circle (centripetal = "centre-seeking").

Key results:
```
a_c = v²/r = rω²          (centripetal acceleration)
F_c = mv²/r = mrω²        (centripetal force required)
```

- Period: T = 2πr/v = 2π/ω
- Frequency: f = 1/T

**TA-2 — Centripetal Force is Not a New Force [C→P]**

Critical conceptual point: "centripetal force" is not a new type of force — it is the name for the net inward force provided by one or more real forces in the specific context of circular motion. In each situation, identify which real force(s) provide the centripetal requirement:

| Scenario | Real force providing F_c |
|---|---|
| Ball on string | Tension T |
| Car on flat curve | Friction f |
| Car on banked curve | Normal force component N sinθ |
| Satellite in orbit | Gravity GMm/r² |
| Roller coaster at top of loop | Weight mg − Normal N |
| Roller coaster at bottom of loop | Normal N − Weight mg |

The equation to write for any circular motion problem:
```
F_net inward = mv²/r
```

**TA-3 — Solving Circular Motion Problems: The Three-Step Method [C→P]**

1. **Draw FBD**: identify all real forces. Mark the centre of the circle.
2. **Choose axis toward centre**: resolve all forces into centripetal (+toward centre) and tangential (+along motion).
3. **Apply**: ΣF_toward_centre = mv²/r. Solve for the unknown.

Example 1 — car on flat curve (friction provides centripetal force):
```
f = mv²/r
μmg = mv²/r
v_max = √(μgr)
```

Example 2 — car on banked curve at angle θ (no friction):
```
N cosθ = mg         (vertical balance)
N sinθ = mv²/r      (centripetal)
tan θ = v²/(rg)     (optimal banking angle)
```

**TA-4 — Vertical Circles [P]**

In a vertical circle, the speed varies (unless an energy source maintains it). The critical case is the minimum speed at the top:

Top of loop (N and mg both point downward — toward centre):
```
N + mg = mv_top²/r
N = m(v_top²/r − g)
N ≥ 0  →  v_top ≥ √(gr)   (minimum speed to maintain contact)
```

Bottom of loop (N upward, mg downward — N is centripetal):
```
N − mg = mv_bottom²/r
N = m(v_bottom²/r + g) > mg   (why you feel heavier at the bottom)
```

Using energy conservation between top and bottom (height difference = 2r):
```
½mv_top² + mg(2r) = ½mv_bottom²
v_bottom² = v_top² + 4gr
```

**TA-5 — Conical Pendulum and Banked Curves [P]**

Conical pendulum (ball on string at angle θ to vertical, swinging in horizontal circle):
```
T cosθ = mg         (vertical)
T sinθ = mv²/r      (horizontal — centripetal)
tanθ = v²/(rg)
r = L sinθ
T = 2π/ω = 2π√(L cosθ/g)   (period)
```

This unifies gravity, tension, and circular motion in a single multi-force FBD problem — a prototype for more complex cases.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — horizontal circle, tension)**

> A 0.5 kg ball is swung in a horizontal circle of radius 1.2 m at 3 m/s. What is the tension in the string? (Ignore gravity — assume the circle is horizontal.)

Solution:
```
F_c = T = mv²/r = 0.5 × 9 / 1.2 = 3.75 N
```

Follow-up: if the speed doubles (v = 6 m/s), the tension = 0.5 × 36 / 1.2 = 15 N — 4× larger (F ∝ v²).

---

**WE-2 (Intermediate — car on flat curve)**

> A 1200 kg car takes a flat circular curve of radius 80 m. The coefficient of static friction is μ_s = 0.6. What is the maximum speed? If the car travels at 25 m/s, is this safe?

Solution:
```
f_max = μ_s × mg = 0.6 × 1200 × 9.8 = 7056 N
F_c = mv²/r  →  v_max = √(μ_s × g × r) = √(0.6 × 9.8 × 80) = √470.4 ≈ 21.7 m/s

At v = 25 m/s: F_c needed = 1200 × 625 / 80 = 9375 N > 7056 N → NOT safe (slides out).
```

---

**WE-3 (Advanced — vertical loop, minimum speed)**

> A roller coaster car of mass 500 kg goes around a vertical loop of radius 15 m. What is the minimum speed at the top of the loop? What is the normal force at the bottom if the car enters the loop at the minimum top speed?

Solution:
```
At top: v_min = √(gr) = √(9.8 × 15) = √147 ≈ 12.1 m/s  (N = 0 at minimum)

Energy conservation (top to bottom, height = 2r = 30 m):
v_bottom² = v_top² + 4gr = 147 + 4 × 9.8 × 15 = 147 + 588 = 735
v_bottom ≈ 27.1 m/s

At bottom: N − mg = mv_bottom²/r
N = m(v_bottom²/r + g) = 500 × (735/15 + 9.8) = 500 × (49 + 9.8) = 500 × 58.8 = 29 400 N

Normal force = 29 400 N vs. weight = 500 × 9.8 = 4900 N → N = 6mg (6g force at bottom)
```

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Centrifugal force diagnosis**
"Draw the free-body diagram of a car travelling around a flat circular curve. Label every force and identify which provides the centripetal acceleration. Should you include a 'centrifugal force'? Why or why not?"

*Target:* FBD shows weight (down), normal (up), friction (toward centre). No centrifugal arrow. Centripetal = friction. "Centrifugal force does not appear in the inertial frame FBD."

**MP-2 [P36] — Centripetal acceleration**
"A satellite orbits Earth at radius 7.0 × 10⁶ m with speed 7550 m/s. Calculate its centripetal acceleration. What provides this centripetal force?"

*Target:* a_c = v²/r = (7550)² / (7.0 × 10⁶) = 5.70 × 10⁷ / 7.0 × 10⁶ ≈ 8.14 m/s². Centripetal force = gravity (verified: g at 7 × 10⁶ m = GM/r² ≈ 8.14 m/s² ✓).

**MP-3 [P36] — Banked curve**
"A road is banked at 20° and has radius 150 m. What speed allows a car to navigate the curve with zero friction? (tan 20° ≈ 0.364)"

*Target:* v = √(rg tanθ) = √(150 × 9.8 × 0.364) = √534.7 ≈ 23.1 m/s.

**MP-4 [P36] — Vertical circle**
"A 0.3 kg ball on a 0.8 m string swings in a vertical circle. What is the minimum speed at the top? What is the tension at the bottom at this minimum top speed?"

*Target:* v_top = √(gr) = √(9.8 × 0.8) = 2.80 m/s; v_bottom² = v_top² + 4gr = 7.84 + 31.36 = 39.2 → v_bottom = 6.26 m/s; T_bottom = m(v_bottom²/r + g) = 0.3 × (49 + 9.8) = 17.6 N.

**MP-5 [P36] — Synthesis: period and centripetal force**
"A 2 kg mass moves in a horizontal circle of radius 0.5 m with period T = 1.2 s. Find: (a) angular velocity ω, (b) linear speed v, (c) centripetal force."

*Target:* ω = 2π/T = 5.24 rad/s; v = rω = 2.62 m/s; F_c = mrω² = 2 × 0.5 × 27.4 = 27.4 N (or mv²/r = 2 × 6.86/0.5 = 27.4 N).

---

## Component 7 — Session Architecture

```
[P01] Session open — ball-on-string provocation (cut the string)
  ↓
[P41] PD-1 (velocity as vector) + PD-2 (Newton's 2nd law)
  ↓ PASS both
[P06] Anchor: swing ball → feel tension → cut → tangential flight
  ↓
TA-1: Derive a_c = v²/r; period and frequency [C]
  ↓
TA-2: Centripetal force is not a new force — source identification table [C→P]
  ↓
[P14] Predict: "On a flat road, what keeps a car from skidding on a curve?"
  ↓
TA-3: Three-step method; flat curve and banked curve examples [C→P]
  ↓
[P51] Check-in MP-1 (FBD of car — centrifugal detection)
  ↓ monitor
WE-1 → WE-2 → WE-3 (escalating; WE-3 = vertical loop)
  ↓
TA-4: Vertical circles; minimum speed; N at top and bottom [P]
  ↓
TA-5: Conical pendulum — multi-force synthesis [P]
  ↓
[P36] MP-2 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval schedule seed: "What is centripetal acceleration at speed v, radius r?"
[P68] Session close
[P85] Regulation tail
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 80% MP-set; re-route if below threshold
```

**Protocol routing:**
- S0 (novice): full CPA path; begin with physical ball-on-string demo; walk through FBD for each scenario before algebra.
- S1 (schema without grounding): knows F = mv²/r formula but draws centrifugal force on FBD; go deep on MC-CENTRIFUGAL-REAL before proceeding.
- S4 (prereq gap): PD-1 fail → kinematics-2d; PD-2 fail → newtons-second-law.
- S6 (anxiety): [F] protocol — "Circular motion has only one new idea: centripetal acceleration = v²/r. Everything else is Newton's 2nd law, which you know."
- S7 (overconfident): open with WE-3 (vertical loop, g-force at bottom calculation) — the g-force result of 6g surprises over-confident students who expect "normal force = weight."

---

## Component 8 — Adaptive Flags

- **Centripetal force identification**: the most common problem-setup error is failing to identify which real force plays the centripetal role. Require students to state explicitly: "The centripetal force is provided by ___" before writing any equation.
- **Vertical circle energy conservation**: this blueprint stops at energy-conservation results (v_bottom from v_top). Full derivation using phys.mech.conservation-of-energy is assumed as a tool here. If a student hasn't mastered energy conservation, flag and scaffold.
- **Banked curve friction cases**: TA-3 covers the ideal (no-friction) banked curve only. The full case with friction (v_min and v_max for banked + friction) is left for extension — it is algebraically intensive and not required for mastery at this level.
- **Satellite preview**: MP-2 uses orbital context. Students may note that g at 7.0 × 10⁶ m = 8.14 m/s² and the centripetal acceleration matches exactly — this is the core of orbital mechanics (phys.mech.orbital-mechanics). Acknowledge but don't derail into orbital period derivations.
- **ω vs v distinction**: students who have seen phys.mech.angular-kinematics will have seen ω before. For those who haven't, introduce ω = 2π/T = 2πf explicitly, and verify with v = rω for a concrete example.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.mech.circular-motion |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.mech.kinematics-2d ✓, phys.mech.newtons-second-law ✓ |
| V-3 | difficulty label matches KG | PASS — proficient (4) |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 5h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-CENTRIFUGAL-REAL, MC-CONSTANT-SPEED-NO-ACCELERATION |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (kinematics-2d), PD-2 (newtons-second-law) |
| V-10 | Concrete anchor present [P06] | PASS — ball-on-string swing and cut |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P14, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with accelerated P (difficulty 4) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — centripetal identification, vertical circle energy, banked+friction limits, satellite preview, ω intro |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
