# Teaching Blueprint — phys.mech.kinematics-2d

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.mech.kinematics-2d
name: Kinematics in Two Dimensions
domain: mechanics
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.mech.kinematics-1d
  - phys.meas.vector-addition
mastery_threshold: 0.80
estimated_hours: 5
cross_links:
  - phys.mech.projectile-motion
  - phys.mech.circular-motion
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-AXES-COUPLED
- **Trigger signal:** Student mixes x- and y-components in a single SUVAT equation (e.g., uses vₓ in the y-equation or uses total v instead of vₓ for horizontal time).
- **Conflict evidence [P28]:** "Suppose a ball is thrown horizontally at 10 m/s from a cliff. After 2 s, it has moved 20 m horizontally (x = vₓt) and 20 m downward (y = ½gt²). If you had used a single combined equation, you'd need to know the direction — but the horizontal and vertical motions never exchange information: the horizontal velocity never changes the vertical drop, and the vertical acceleration never affects the horizontal travel. They are completely independent."
- **Bridge text [P30]:** "Think of the motion as two separate 1D problems running simultaneously on two separate tracks. The x-track has constant velocity; the y-track has constant acceleration. They share only one thing: the time elapsed."
- **Replacement text [P31]:** "Decompose every 2D problem into x- and y-components. Write two independent SUVAT sets. They share t only. Never use a velocity component from one axis in the SUVAT equation of the other."
- **Discrimination pairs [P33]:**
  - x: vₓ = u_x + aₓt (correct) vs. vₓ = u_x + a_y t (wrong — uses y-acceleration for x-velocity)
  - y: y = u_y t + ½a_y t² (correct) vs. y = u_y t + ½g × total_v (wrong — mixes speed with acceleration)
- **s6_path:** "This is the most common confusion in 2D kinematics — every student trips here. The good news: once you separate the axes, you just do 1D kinematics twice. You already know 1D kinematics."

---

### MC-TOTAL-VELOCITY-COMPONENT
- **Trigger signal:** Student uses the magnitude of the velocity vector |v| in a component equation, or tries to find |v| from one axis alone.
- **Conflict evidence [P28]:** "A ball has vₓ = 3 m/s and v_y = 4 m/s. The speed (magnitude) is |v| = √(3² + 4²) = 5 m/s. If you tried to use 5 m/s in the x-equation: x = 5 × t — this predicts the ball moves 5 m in 1 s, but it actually moves 3 m horizontally and 4 m vertically in 1 s. The components and the magnitude are different quantities."
- **Bridge text [P30]:** "The magnitude |v| tells you how fast the particle is moving; the components vₓ and v_y tell you how fast it is moving in each direction. Use components in SUVAT; use magnitude only as a final reporting quantity."
- **Replacement text [P31]:** "In SUVAT equations, always use the component (vₓ, v_y) that matches the axis. The magnitude |v| = √(vₓ² + v_y²) is computed last, after all component work is done."
- **Discrimination pairs [P33]:**
  - vₓ = u_x + aₓt (component equation — correct)
  - |v| = |u| + at (wrong — this would only work if motion is purely 1D)
- **s6_path:** "This trips everyone at first. The fix: always write vₓ and v_y as two separate unknowns from the start. Never introduce |v| until the very end."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — 1D SUVAT**
Prompt: "A car starts from rest and accelerates at 3 m/s² for 5 s. What is its final speed and displacement?"
- Pass: v = u + at = 0 + 3 × 5 = 15 m/s; s = ut + ½at² = 0 + ½ × 3 × 25 = 37.5 m.
- Fail → [P52]: "We'll need 1D kinematics solid before going to 2D. Let's review: the five SUVAT quantities are s, u, v, a, t. Which two equations do you remember?" → Route to phys.mech.kinematics-1d.

**PD-2 [P41] — Vector decomposition**
Prompt: "A force of 50 N acts at 30° above the horizontal. What are its horizontal and vertical components?"
- Pass: Fₓ = 50 cos 30° ≈ 43.3 N; F_y = 50 sin 30° = 25 N.
- Fail → [P52]: "To do 2D motion, we need to split velocity into x and y components using sin and cos. Let's review vector resolution: Aₓ = A cos θ, A_y = A sin θ." → Route to phys.meas.vector-addition.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — the thrown ball**

> Stand at a table. Slide a coin horizontally off the edge at the same moment you drop a second coin vertically from the same height. Which hits the floor first?

Most students predict the horizontal coin arrives later (it has "further to go"). In practice, both hit simultaneously — the horizontal velocity adds no time to the vertical fall.

This is the experimental heart of 2D kinematics: the axes are independent. The horizontal coin travels forward *while* falling; it does not fall *after* it finishes travelling forward. Time is shared; motion is not.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Separating the Axes [C]**

In 2D kinematics, a particle's position is described by (x, y) and its velocity by (vₓ, v_y). The key principle:

> **Independence of motion:** The x-motion and y-motion are independent. Each obeys its own set of 1D SUVAT equations. They are linked only through time t.

Full SUVAT set for 2D:

x-direction:
```
vₓ = u_x + aₓ t
x = u_x t + ½ aₓ t²
vₓ² = u_x² + 2aₓ x
```

y-direction:
```
v_y = u_y + a_y t
y = u_y t + ½ a_y t²
v_y² = u_y² + 2a_y y
```

Common case — horizontal launch, gravity downward (a_y = −g, aₓ = 0):
```
vₓ = u_x  (constant)
x = u_x t

v_y = −gt  (if u_y = 0)
y = −½gt²
```

**TA-2 — Initial Velocity Decomposition [C→P]**

When an initial velocity u is given as magnitude and angle θ above horizontal:

```
u_x = u cos θ
u_y = u sin θ
```

Sign convention (standard):
- Rightward: x positive
- Upward: y positive
- Gravity: a_y = −9.8 m/s² (or −g)

Recovering final quantities:
```
|v| = √(vₓ² + v_y²)           (speed)
φ = arctan(v_y / vₓ)           (direction of velocity)
|r| = √(x² + y²)              (distance from origin)
```

**TA-3 — Solving 2D Problems: The Five-Step Method [C→P]**

1. **Draw** the trajectory and mark the initial/final points.
2. **Decompose** initial velocity into u_x and u_y.
3. **Write** two SUVAT tables (x-column and y-column) with known values filled.
4. **Solve** for the shared quantity (usually t) from one axis, then use it in the other.
5. **Reconstruct** the vector (magnitude and direction) if required.

**TA-4 — Relative Motion [P]**

The velocity of object A as seen from object B:

```
v_A/B = v_A − v_B   (velocity of A relative to B)
```

Example: a boat crosses a river. If the boat aims straight across (v_boat perpendicular to bank) and the river flows at v_river parallel to the bank, the actual velocity of the boat is:

```
v_actual = v_boat + v_river   (vector addition)
|v_actual| = √(v_boat² + v_river²)
drift = v_river × t_crossing
```

To cross with zero drift, the boat must angle upstream: sin θ = v_river / v_boat. Only possible if v_boat > v_river.

**TA-5 — Position Vector and Trajectory Equation [P]**

The position vector at time t:
```
r(t) = (u_x t) x̂ + (u_y t + ½a_y t²) ŷ
```

Eliminating t between x and y gives the trajectory equation. For horizontal launch (u_y = 0, a_y = −g):
```
x = u_x t  →  t = x / u_x
y = −½g(x / u_x)²  =  −(g / 2u_x²) x²
```

This is a parabola — confirming the shape of all projectile trajectories (in vacuum, uniform gravity). Preview for phys.mech.projectile-motion.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — horizontal launch from cliff)**

> A ball is thrown horizontally at 15 m/s from the edge of a cliff 80 m high. Find: (a) time to reach the ground, (b) horizontal range, (c) speed just before impact.

Solution:
```
x-axis: aₓ = 0, u_x = 15 m/s
y-axis: a_y = −9.8 m/s², u_y = 0, y = −80 m

Step 1 — find t from y-axis:
y = u_y t + ½a_y t²
−80 = 0 + ½(−9.8)t²
t² = 160/9.8 = 16.33
t = 4.04 s

Step 2 — find x:
x = u_x t = 15 × 4.04 = 60.6 m

Step 3 — find speed at impact:
vₓ = 15 m/s (unchanged)
v_y = 0 + (−9.8)(4.04) = −39.6 m/s
|v| = √(15² + 39.6²) = √(225 + 1568) = √1793 ≈ 42.3 m/s
```

---

**WE-2 (Intermediate — launch at angle)**

> A ball is launched at 20 m/s at 60° above the horizontal. Find: (a) maximum height, (b) time of flight (landing at same level), (c) range.

Solution:
```
u_x = 20 cos 60° = 10 m/s
u_y = 20 sin 60° = 17.3 m/s
a_y = −9.8 m/s²

(a) Maximum height (v_y = 0):
v_y² = u_y² + 2a_y H
0 = 17.3² − 2(9.8)H
H = 299.3/19.6 = 15.3 m

(b) Time of flight (y = 0 again):
0 = u_y t + ½a_y t²
0 = 17.3t − 4.9t²
t(17.3 − 4.9t) = 0
t = 0 (launch) or t = 17.3/4.9 = 3.53 s

(c) Range:
x = u_x t = 10 × 3.53 = 35.3 m
```

---

**WE-3 (Relative motion — river crossing)**

> A boat can travel at 5 m/s in still water. A river is 200 m wide and flows at 3 m/s. (a) If the boat heads straight across, how long does it take and how far downstream does it land? (b) At what angle must it head upstream to land directly opposite?

Solution:
```
(a) Straight across:
t = width / v_boat = 200 / 5 = 40 s
drift = v_river × t = 3 × 40 = 120 m downstream

(b) Zero drift:
sin θ = v_river / v_boat = 3/5  →  θ = 36.9° upstream from perpendicular
v_perpendicular = v_boat cos θ = 5 × 0.8 = 4 m/s
t = 200 / 4 = 50 s  (takes longer — angling upstream reduces crossing speed)
```

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Axis independence check**
"A stone is thrown horizontally from a height of 45 m. Simultaneously, a second stone is dropped vertically from the same height. Which hits the ground first? Justify without calculating."

*Target:* Both hit simultaneously. Horizontal velocity does not affect vertical free-fall. t = √(2h/g) for both.

**MP-2 [P36] — Component decomposition**
"A ball is kicked at 25 m/s at 37° above horizontal. Write down u_x, u_y. If it lands at the same height, find the range. (sin 37° = 0.6, cos 37° = 0.8)"

*Target:* u_x = 20 m/s, u_y = 15 m/s; t = 2u_y/g = 30/9.8 ≈ 3.06 s; R = 20 × 3.06 = 61.2 m.

**MP-3 [P36] — Combining axes**
"A projectile has vₓ = 8 m/s and v_y = −6 m/s at a particular instant. What is its speed? What angle below horizontal is the velocity?"

*Target:* |v| = √(64 + 36) = 10 m/s; φ = arctan(6/8) = 36.9° below horizontal.

**MP-4 [P36] — Relative motion**
"An aircraft flies at 300 m/s east. A crosswind blows at 40 m/s north. What is the actual velocity of the aircraft (magnitude and direction) relative to the ground?"

*Target:* |v| = √(300² + 40²) = √(90000 + 1600) = √91600 ≈ 302.7 m/s; θ = arctan(40/300) ≈ 7.6° north of east.

**MP-5 [P36] — Synthesis (time shared between axes)**
"A ball is thrown horizontally from a window 19.6 m high and lands 40 m from the base of the building. What was the initial horizontal speed? (g = 9.8 m/s²)"

*Target:* y-axis: t = √(2×19.6/9.8) = √4 = 2 s; x-axis: u_x = 40/2 = 20 m/s.

---

## Component 7 — Session Architecture

```
[P01] Session open — twin-coin provocation (simultaneous drop)
  ↓
[P41] PD-1 (1D SUVAT) + PD-2 (vector decomposition)
  ↓ PASS both
[P06] Anchor: live demo / thought experiment → axes are independent
  ↓
TA-1: Independence principle; full 2D SUVAT set [C]
  ↓
TA-2: Initial velocity decomposition; sign convention [C→P]
  ↓
TA-3: Five-step problem-solving method [C→P]
  ↓
[P51] Check-in MP-1 (axis independence — conceptual only)
  ↓ monitor
WE-1: Horizontal launch — build the five-step method live
  ↓
TA-4: Relative motion; river-crossing geometry [P]
  ↓
WE-2 → WE-3 (escalating complexity)
  ↓
TA-5: Trajectory equation → parabola (preview projectile-motion) [P]
  ↓
[P36] MP-2 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval schedule seed: "Ball thrown at 30° — which SUVAT axis do you use to find time of flight?"
[P68] Session close
[P85] Regulation tail
[P89] Retrieval schedule: 1 day, 3 days, 7 days
[P91] Mastery gate: 80% MP-set; re-route if below threshold
```

**Protocol routing:**
- S0 (novice): full CPA path; run physical demo (or video) before anchor; slow through TA-3 method step-by-step.
- S1 (schema without grounding): has heard of "x and y separately" but mixes components; go deep on MC-AXES-COUPLED with discrimination pairs before WE-1.
- S4 (prereq gap): PD-1 fail → kinematics-1d; PD-2 fail → vector-addition.
- S6 (anxiety): [F] protocol — "We're doing 1D kinematics twice. You've done it before. The only new part is decomposing the initial velocity."
- S7 (overconfident): open with MP-5 (reverse problem — find u_x from landing distance); the reverse direction catches overconfident students who only remember forward substitution.

---

## Component 8 — Adaptive Flags

- **Sign convention discipline**: insist on explicit sign convention declaration at the start of every problem (up = positive, rightward = positive, gravity = −9.8 m/s²). Inconsistent signs are the #1 arithmetic error in 2D kinematics.
- **"t is shared" rule**: write in a box at top of every two-column SUVAT table: "t is the same in both columns." This eliminates the most common procedural error.
- **River-crossing geometry** (TA-4): draw the vector triangle for the boat problem explicitly — students who visualise it once rarely confuse the "across" component with the "actual" speed.
- **Trajectory equation** (TA-5): preview only at this stage. Full projectile-motion analysis (range formula, optimal angle, etc.) is in phys.mech.projectile-motion. Do not rush into those derivations here.
- **aₓ ≠ 0 cases**: this blueprint anchors on gravity-only problems (aₓ = 0). If a student brings a problem with non-zero horizontal acceleration (e.g., a motorboat with thrust and drag), acknowledge it and note both axes can have acceleration — SUVAT still applies independently.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.mech.kinematics-2d |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.mech.kinematics-1d ✓, phys.meas.vector-addition ✓ |
| V-3 | difficulty label matches KG | PASS — proficient (4) |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 5h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-AXES-COUPLED, MC-TOTAL-VELOCITY-COMPONENT |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (kinematics-1d), PD-2 (vector-addition) |
| V-10 | Concrete anchor present [P06] | PASS — twin-coin simultaneous-fall experiment |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with accelerated P (difficulty 4) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — sign convention, shared-t rule, river geometry, trajectory preview, non-zero aₓ |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
