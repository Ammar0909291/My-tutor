# Teaching Blueprint — phys.mech.projectile-motion

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.mech.projectile-motion
name: Projectile Motion
domain: mechanics
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.mech.kinematics-2d
mastery_threshold: 0.80
estimated_hours: 5
cross_links:
  - phys.mech.circular-motion
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-HEAVIER-FALLS-FASTER
- **Trigger signal:** Student says "a heavier ball reaches the ground first when thrown horizontally" or expects mass to affect the parabolic trajectory.
- **Conflict evidence [P28]:** "In the vertical direction, both the gravitational force and the mass appear: F = mg → a = F/m = g. The mass cancels. All projectiles (ignoring air resistance) experience the same downward acceleration g = 9.8 m/s² regardless of mass. A 1 kg ball and a 10 kg ball thrown horizontally at the same speed from the same height land at exactly the same time and same horizontal distance. This was Galileo's original insight from the Leaning Tower of Pisa."
- **Bridge text [P30]:** "Acceleration due to gravity is g = F_gravity/m = mg/m = g — mass cancels. This is why kinematics (SUVAT) equations for projectile motion contain no mass term at all. The trajectory depends only on initial speed, angle, and g."
- **Replacement text [P31]:** "Projectile trajectory is mass-independent (no air resistance). A canon ball and a golf ball launched at the same v₀ and θ follow identical parabolas. Mass affects the force (F = mg) but not the acceleration (a = g)."
- **Discrimination pairs [P33]:**
  - 1 kg ball thrown at 20 m/s, 45°: lands at R = v₀² sin2θ/g = 400/9.8 = 40.8 m ✓
  - 5 kg ball thrown at 20 m/s, 45°: lands at R = 40.8 m (same) ✓
- **s6_path:** "Galileo faced the same pushback when he said heavy and light objects fall at the same rate. Try dropping a coin and a piece of paper at the same time — then fold the paper to reduce air resistance and try again. Air resistance is the confounding factor in real life."

---

### MC-MAX-RANGE-90DEG
- **Trigger signal:** Student says "shooting straight up (90°) gives the maximum range" or confuses maximum height with maximum range.
- **Conflict evidence [P28]:** "Range R = v₀² sin 2θ/g. At θ = 90°: sin(180°) = 0 → R = 0 (ball goes straight up and lands on the launch point). At θ = 45°: sin(90°) = 1 → R = v₀²/g (maximum). At θ = 0°: sin(0°) = 0 → R = 0 again (ball skims the ground). The range formula has a maximum at θ = 45°, not 90°."
- **Bridge text [P30]:** "Maximising range requires optimising the trade-off between horizontal speed and time of flight. A shallow angle gives high horizontal speed but short flight time. A steep angle gives long flight time but low horizontal speed. θ = 45° is the optimal balance."
- **Replacement text [P31]:** "Maximum range on level ground: θ = 45°, giving R_max = v₀²/g. Complementary angles give equal range: θ and (90° − θ) produce the same R. High-angle path → more height, same range. Low-angle path → less height, same range."
- **Discrimination pairs [P33]:**
  - θ = 30°: R = v₀² sin60°/g ≈ 0.866 v₀²/g; H = v₀² sin²30°/(2g) = 0.125 v₀²/g
  - θ = 60°: R = v₀² sin120°/g ≈ 0.866 v₀²/g (same R!); H = v₀² sin²60°/(2g) = 0.375 v₀²/g (3× height)
- **s6_path:** "The 45° maximum is one of those results that seems obvious once you see it but isn't. Draw the range formula R = v₀² sin2θ/g and ask: which value of θ makes sin2θ = 1?"

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — 2D SUVAT and axis independence**
Prompt: "A ball is thrown horizontally at 12 m/s from a height of 45 m. Write the x and y equations of motion. Which is constant? Which has acceleration?"
- Pass: x = 12t (constant vₓ = 12 m/s); y = −½ × 9.8 × t² (a_y = −9.8 m/s², no initial vertical speed).
- Fail → [P52]: "Projectile motion is 2D kinematics with specific accelerations: aₓ = 0, a_y = −g. Let's confirm the 2D SUVAT framework before adding the projectile-specific results." → Route to phys.mech.kinematics-2d.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — Galileo's combined motion**

> Roll a ball horizontally off a table. At the same moment, drop a second ball straight down from the same height. Which lands first?

Both land simultaneously — the horizontal motion does not delay the fall. The ball rolling off the table traces a parabola. Stop the video at various time steps and note: horizontal position increases uniformly (constant vₓ); vertical position increases as ½gt² (constant a_y). The parabola is the combined result.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Projectile Motion Equations [C]**

A projectile has initial speed v₀ at angle θ above horizontal. Decompose:
```
u_x = v₀ cosθ    (constant throughout)
u_y = v₀ sinθ    (initial vertical component)
aₓ = 0,  a_y = −g
```

Position:
```
x = v₀ cosθ × t
y = v₀ sinθ × t − ½gt²
```

Velocity:
```
vₓ = v₀ cosθ    (constant)
v_y = v₀ sinθ − gt
```

**TA-2 — Key Results: Time of Flight, Range, Maximum Height [C→P]**

On level ground (y_final = 0, launch from origin):
```
Time of flight: T_f = 2v₀ sinθ / g

Range: R = v₀² sin2θ / g       (using sin2θ = 2sinθcosθ)

Maximum height: H = v₀² sin²θ / (2g)   (when v_y = 0)
Time to peak: t_peak = v₀ sinθ / g = T_f/2
```

Symmetry: (a) peak is at t = T_f/2 exactly halfway through flight. (b) Complementary angles (θ and 90°−θ) give equal range. (c) v_y at landing = −u_y (same magnitude, opposite direction by symmetry).

**TA-3 — Trajectory Equation (Parabola) [C→P]**

Eliminate t between x and y:
```
t = x / (v₀ cosθ)

y = v₀ sinθ × (x/v₀cosθ) − ½g(x/v₀cosθ)²

y = x tanθ − (g / 2v₀² cos²θ) × x²
```

This is a parabola: y = ax − bx², where a = tanθ, b = g/(2v₀² cos²θ). The negative x² term confirms the downward curvature.

**TA-4 — Projectile from Height / Non-Level Ground [P]**

For a projectile launched from height h above landing level (or at angle below horizontal):
- Cannot use the T_f = 2u_y/g formula directly.
- Set up y(t) = 0 (or y(t) = −h) and solve the quadratic.
- Range: R = x(T_f) where T_f is the positive root of the quadratic.

Example: cliff launch at height h, horizontal only (θ = 0):
```
y = −½gt² = −h  →  t = √(2h/g)
R = v₀ × √(2h/g)
```

**TA-5 — Speed and Angle at Any Point [P]**

Speed at any instant:
```
|v| = √(vₓ² + v_y²) = √((v₀cosθ)² + (v₀sinθ − gt)²)
```

Angle below horizontal: φ = arctan(|v_y|/vₓ)

At maximum height (v_y = 0): |v| = v₀ cosθ (horizontal component only — minimum speed).
At landing: |v| = v₀ (same magnitude as launch — by energy conservation on level ground).

---

## Component 5 — Worked Examples

**WE-1 (Foundational — range and height)**

> A ball is kicked at 25 m/s at 37° above horizontal on level ground. Find: (a) T_f, (b) R, (c) H.

Solution (sin37° = 0.6, cos37° = 0.8):
```
u_x = 25 × 0.8 = 20 m/s;  u_y = 25 × 0.6 = 15 m/s

(a) T_f = 2u_y/g = 30/9.8 = 3.06 s
(b) R = u_x × T_f = 20 × 3.06 = 61.2 m
(c) H = u_y²/(2g) = 225/19.6 = 11.5 m
```

---

**WE-2 (Intermediate — cliff launch)**

> A ball is thrown horizontally at 15 m/s from a cliff 80 m high. Find: (a) time of flight, (b) range, (c) speed at impact.

Solution:
```
(a) y = −½gt²; −80 = −½(9.8)t²; t = 4.04 s
(b) R = 15 × 4.04 = 60.6 m
(c) v_y = gt = 9.8 × 4.04 = 39.6 m/s;
    |v| = √(15² + 39.6²) = √(225 + 1568) = 42.3 m/s
```

---

**WE-3 (Advanced — find v₀ from measured range)**

> A projectile lands 60 m away on level ground after being launched at 30°. Find v₀.

Solution:
```
R = v₀² sin2θ / g
60 = v₀² sin60° / 9.8
60 = v₀² × 0.866 / 9.8
v₀² = 60 × 9.8 / 0.866 = 678.9
v₀ = 26.1 m/s
```

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Mass independence**
"Two balls, A (mass 0.1 kg) and B (mass 2 kg), are thrown horizontally at 10 m/s from the same height. Which lands first? Which travels further? Justify without calculating."

*Target:* Both land simultaneously (same t = √(2h/g)); both travel the same range (same u_x and same t). Mass does not appear in either equation.

**MP-2 [P36] — Symmetry**
"A ball is launched at 30° and lands 40 m away. At what other angle could it be launched at the same speed to travel 40 m?"

*Target:* Complementary angle: 90° − 30° = 60°. Verify: sin2×30° = sin60°; sin2×60° = sin120° = sin60° ✓.

**MP-3 [P36] — Speed at peak**
"A ball is launched at 20 m/s at 53° above horizontal. What is its speed at the highest point?"

*Target:* At peak, v_y = 0; v = vₓ = 20 cos53° = 20 × 0.6 = 12 m/s.

**MP-4 [P36] — Non-level ground**
"A ball is launched at 20 m/s at 60° from a cliff top 45 m high. Find the horizontal range when it reaches ground level."

*Target:* u_x = 10 m/s, u_y = 17.3 m/s. y = 17.3t − 4.9t² = −45 → 4.9t² − 17.3t − 45 = 0; t = (17.3 + √(299 + 882))/9.8 = (17.3 + 34.4)/9.8 = 5.27 s; R = 10 × 5.27 = 52.7 m.

**MP-5 [P36] — Trajectory equation**
"A ball is launched at 25 m/s at 37° (sin37°=0.6, cos37°=0.8). Write the trajectory equation y(x). What is y at x = 30 m?"

*Target:* y = x tan37° − gx²/(2v₀²cos²37°) = 0.75x − 9.8x²/(2×625×0.64) = 0.75x − 0.01225x². At x = 30: y = 22.5 − 11.0 = 11.5 m.

---

## Component 7 — Session Architecture

```
[P01] Session open — Galileo table-ball provocation
  ↓
[P41] PD-1 (2D SUVAT, axis independence)
  ↓ PASS
[P06] Anchor: two-ball simultaneous drop → axes independent
  ↓
TA-1: Projectile motion equations [C]
  ↓
TA-2: T_f, R, H formulas; symmetry; complementary angles [C→P]
  ↓
[P14] Predict: "At which angle does range peak?"
  ↓
[P28] Conflict: "90° gives max range" → MC-MAX-RANGE-90DEG
  ↓
TA-3: Trajectory equation; parabola shape [C→P]
  ↓
[P51] Check-in MP-1 (mass independence — conceptual)
  ↓ monitor
WE-1 → WE-2 → WE-3 (escalating complexity)
  ↓
TA-4: Non-level ground; quadratic for T_f [P]
  ↓
TA-5: Speed and angle at any point [P]
  ↓
[P36] MP-2 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "At the peak of a projectile path, what is v_y? What is the speed?"
[P68] Session close
[P85] Regulation tail
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 80%; re-route if below
```

**Protocol routing:** S0: full CPA, dwell on anchor demo; S1: jump to TA-2 formulas, test MC-MAX-RANGE-90DEG immediately; S4: PD-1 fail → kinematics-2d; S6: [F] protocol — "projectile motion is kinematics-2d with aₓ=0, a_y=−g — two special cases that simplify the problem"; S7: open with MP-5 trajectory equation; the reverse-problem WE-3 catches overconfident students who only know the forward direction.

---

## Component 8 — Adaptive Flags

- **Air resistance caveat**: all results assume vacuum. Real projectiles (sports, bullets) have ranges reduced by air drag. Mention explicitly — especially for sports contexts (soccer, baseball) where students have intuitions based on real experience.
- **Quadratic in TA-4**: the two-root quadratic always yields one positive and one negative time root; only the positive root is physical. Require students to state this explicitly when solving.
- **v₀ sin2θ formula range**: the R = v₀² sin2θ/g formula only applies to level ground (same launch and landing height). Always check this condition before applying it.
- **Landing speed = launch speed**: on level ground, |v_landing| = |v_launch| by energy conservation. This is a useful sanity check after WE-1/WE-2 calculations.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.mech.projectile-motion |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.mech.kinematics-2d ✓ |
| V-3 | difficulty label matches KG | PASS — proficient (4) |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 5h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-HEAVIER-FALLS-FASTER, MC-MAX-RANGE-90DEG |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (kinematics-2d) |
| V-10 | Concrete anchor present [P06] | PASS — Galileo two-ball drop |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P14, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with accelerated P (difficulty 4) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — air resistance, quadratic roots, level-ground condition, landing speed check |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
