# Teaching Blueprint — phys.mech.relative-motion

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.mech.relative-motion
name: Relative Motion
domain: mechanics
difficulty:
  label: proficient
  number: 4
bloom: analyze
prerequisites:
  - phys.mech.kinematics-2d
mastery_threshold: 0.80
estimated_hours: 4
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-VELOCITY-ABSOLUTE
- **Trigger signal:** Student states a velocity without specifying the reference frame ("the car is going 60 km/h") and treats it as absolute.
- **Conflict evidence [P28]:** "A passenger on a train moving at 80 km/h east reads a newspaper. Relative to the ground, the newspaper moves at 80 km/h east. Relative to the passenger, the newspaper is stationary. Both statements are correct — velocity has no meaning without specifying relative to what. There is no universal rest frame."
- **Bridge text [P30]:** "All velocities are measured relative to a chosen reference frame. When we say 'a car moves at 60 km/h' we implicitly mean relative to the Earth's surface. For problems involving two moving objects, we must choose a frame and be explicit about it."
- **Replacement text [P31]:** "Velocity is always v_A/B (velocity of A relative to B). The Galilean transformation: v_A/C = v_A/B + v_B/C. Choose a reference frame, define all velocities relative to it, and add/subtract as vectors."
- **Discrimination pairs [P33]:**
  - Bullet fired at 800 m/s from a plane moving at 200 m/s: v_bullet/ground = 1000 m/s (same direction) or 600 m/s (opposite direction) ✓
  - "The bullet moves at 800 m/s" — incomplete (relative to what?) ✗
- **s6_path:** "Every time you give a velocity in this topic, ask yourself: relative to what? Once that becomes a habit, relative motion problems become straightforward."

---

### MC-FRAMES-ADD-SPEEDS
- **Trigger signal:** Student always adds magnitudes of velocities regardless of direction (e.g., v_A/C = v_A/B + v_B/C with all magnitudes, ignoring vectors).
- **Conflict evidence [P28]:** "A boat moves at 5 m/s north relative to water. The river flows at 3 m/s east. The boat's velocity relative to the ground is NOT 5 + 3 = 8 m/s — it is the vector sum: magnitude = √(5² + 3²) = √34 ≈ 5.83 m/s at arctan(3/5) ≈ 31° east of north. Adding speeds (magnitudes) only works when both velocities point in the same direction."
- **Bridge text [P30]:** "Relative velocities add as vectors, not scalars. Write each velocity as (x-component, y-component), then add components separately. The direction matters as much as the magnitude."
- **Replacement text [P31]:** "v_A/C = v_A/B + v_B/C (vector addition). Write component equations: v_x(A/C) = v_x(A/B) + v_x(B/C); v_y(A/C) = v_y(A/B) + v_y(B/C). Then combine: |v| = √(vₓ² + v_y²), θ = arctan(v_y/vₓ)."
- **Discrimination pairs [P33]:**
  - Same direction: v_A/C = 5 + 3 = 8 m/s (scalar addition valid only here) ✓
  - Perpendicular: v_A/C = √(5² + 3²) = 5.83 m/s ✓ (vector, not scalar sum)
- **s6_path:** "Speed addition is only valid along a straight line. The moment two velocities have different directions, draw a vector diagram — magnitude of the sum is always ≤ sum of magnitudes."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — 2D vector addition**
Prompt: "Vector A = 4 m/s east. Vector B = 3 m/s north. What is |A + B| and its direction?"
- Pass: |A + B| = 5 m/s at arctan(3/4) ≈ 37° north of east.
- Fail → [P52]: "Relative motion requires 2D vector addition. Let's confirm: magnitudes add in quadrature when perpendicular, not by simple addition." → Route to phys.mech.kinematics-2d (vector decomposition section).

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — the train and the fly**

> You sit on a train moving at 100 km/h. A fly buzzes past at 2 km/h relative to you (in the direction of train travel). How fast is the fly moving relative to a person standing on the platform?

The answer (102 km/h) seems obvious — but notice that you made an implicit choice: you added the velocities. Now reverse it: from the platform, how fast are you moving? (100 km/h.) How fast is the fly? (102 km/h.) Relative to the fly, how fast is the platform person moving? (−102 km/h — moving backward.) The same event, different reference frames, consistent velocity relations.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — The Galilean Velocity Addition Rule [C]**

If B moves relative to C at velocity v_B/C, and A moves relative to B at velocity v_A/B, then A's velocity relative to C is:
```
v_A/C = v_A/B + v_B/C      (vector addition)
```

The subscript cancellation rule: A/B + B/C → A/C (middle labels cancel).

To find v_B/A (reverse): v_B/A = −v_A/B.

**TA-2 — 1D Relative Motion Examples [C→P]**

Example 1 — same direction:
A car moves at 80 km/h east. A truck moves at 50 km/h east. Relative velocity of car with respect to truck:
```
v_car/truck = v_car/ground − v_truck/ground = 80 − 50 = 30 km/h east
```
(The car overtakes the truck at 30 km/h.)

Example 2 — opposite directions:
The same car (80 km/h east) meets a bus moving at 60 km/h west. Relative velocity of car with respect to bus:
```
v_car/bus = 80 − (−60) = 140 km/h east
```
(They approach each other at 140 km/h.)

**TA-3 — 2D Relative Motion: River Crossing [C→P]**

A boat aims perpendicular to a river bank at v_b = 4 m/s (north). River flows at v_r = 3 m/s (east). Velocity of boat relative to ground:
```
v_boat/ground = v_boat/water + v_water/ground
x: v_x = 3 m/s (east)
y: v_y = 4 m/s (north)

|v| = √(16 + 9) = 5 m/s at θ = arctan(3/4) ≈ 36.9° east of north
```

To cross a 100 m wide river:
```
t = width / v_y = 100/4 = 25 s
drift = v_r × t = 3 × 25 = 75 m east
```

To land directly opposite (zero drift): aim upstream at angle φ = arcsin(v_r/v_b) = arcsin(3/4) = 48.6° west of north. Then actual crossing speed = v_b cosφ = 4 × √(1−9/16) = 4 × √7/4 ≈ 2.65 m/s, and t = 100/2.65 = 37.7 s.

**TA-4 — Relative Velocity in 2D: Aircraft and Wind [P]**

An aircraft wants to fly due north at 500 km/h relative to the ground. A wind blows at 100 km/h due east. What heading (angle west of north) must the aircraft fly, and what airspeed is needed?

```
v_aircraft/ground = v_aircraft/air + v_air/ground

We want v_aircraft/ground pointing north.
v_air/ground = 100 km/h east.

sin θ = 100/v_air → v_air = 500/cosθ

Actually: the ground-speed northward component = v_air cosθ = 500 km/h
The eastward component: v_air sinθ = 100 km/h

tanθ = 100/500 = 0.2 → θ = 11.3° west of north
v_air = √(500² + 100²) = √(260000) ≈ 510 km/h
```

**TA-5 — Relative Acceleration and Non-Inertial Frames (Preview) [P]**

In an inertial frame (constant velocity), v_A/C = v_A/B + v_B/C applies exactly. If frame B accelerates (non-inertial), a fictitious force appears in B — this is the basis for centrifugal and Coriolis effects (advanced topic). At this level: only use the Galilean addition rule in inertial (non-accelerating) frames.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — 1D, head-on)**
> Train A moves east at 70 km/h; Train B moves west at 50 km/h. What is B's velocity relative to A?

```
v_B/A = v_B/ground − v_A/ground = −50 − 70 = −120 km/h (i.e., 120 km/h westward relative to A)
```

**WE-2 (Intermediate — river crossing, find drift)**
> A swimmer can swim at 2 m/s in still water. She swims straight across a 60 m river flowing at 1.5 m/s. How long does she take? How far downstream does she land?

```
t = 60/2 = 30 s;  drift = 1.5 × 30 = 45 m downstream
```

**WE-3 (Advanced — find heading to compensate drift)**
> Same swimmer wants to land directly opposite. At what angle upstream must she aim, and how long does the crossing take?

```
sinθ = 1.5/2 = 0.75  →  θ = 48.6° upstream
crossing speed = 2 cosθ = 2 × √(1 − 0.5625) = 2 × 0.661 = 1.32 m/s
t = 60/1.32 = 45.5 s
```

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Frame identification**
"A passenger on a train moving at 90 km/h north sees a car on a road alongside moving at 30 km/h south (relative to the ground). What is the car's velocity relative to the passenger? What is the passenger's velocity relative to the car?"

*Target:* v_car/passenger = v_car/ground − v_passenger/ground = −30 − 90 = −120 km/h (i.e., 120 km/h southward). v_passenger/car = +120 km/h northward.

**MP-2 [P36] — 2D vector addition**
"A plane flies at 300 km/h north relative to the air. Wind blows at 50 km/h east. What is the plane's velocity relative to the ground (magnitude and direction)?"

*Target:* |v| = √(300² + 50²) = √(90000 + 2500) = √92500 ≈ 304 km/h; θ = arctan(50/300) ≈ 9.5° east of north.

**MP-3 [P36] — Zero drift condition**
"A river is 80 m wide and flows at 2 m/s. A motorboat's speed in still water is 5 m/s. To cross straight across (zero drift), what upstream angle must the boat aim?"

*Target:* sinθ = 2/5 = 0.4 → θ = 23.6° upstream from perpendicular.

**MP-4 [P36] — Relative velocity in pursuit**
"Car A moves north at 20 m/s. Car B is 500 m north of A and moves north at 15 m/s. At what rate is A closing the gap? How long until A catches B?"

*Target:* v_A/B = 20 − 15 = 5 m/s northward (closing at 5 m/s); t = 500/5 = 100 s.

**MP-5 [P36] — Analysis: minimum crossing time vs. minimum drift path**
"A river 200 m wide flows at 3 m/s. A swimmer can do 4 m/s in still water. (a) What heading minimises crossing time? (b) What heading minimises drift? (c) Which takes longer?"

*Target:* (a) Min time: swim perpendicular, t = 200/4 = 50 s; drift = 3 × 50 = 150 m. (b) Min drift (zero drift): sinθ = 3/4 → θ = 48.6°; crossing speed = 4 cos48.6° ≈ 2.65 m/s; t = 200/2.65 = 75.5 s; drift = 0. (c) Zero-drift path takes longer (75.5 s vs. 50 s). Trade-off: less drift costs more time.

---

## Component 7 — Session Architecture

```
[P01] Session open — train and fly provocation
  ↓
[P41] PD-1 (2D vector addition)
  ↓ PASS
[P06] Anchor: train + fly → frame-dependent velocity
  ↓
TA-1: Galilean addition rule; subscript cancellation [C]
  ↓
TA-2: 1D examples — same direction and head-on [C→P]
  ↓
[P14] Predict: "Boat aims north, river flows east — which direction does it actually travel?"
  ↓
TA-3: River crossing; drift calculation; zero-drift condition [C→P]
  ↓
WE-1 → WE-2 → WE-3 (escalating)
  ↓
[P51] Check-in MP-1 (frame identification)
  ↓ monitor
TA-4: Aircraft/wind — 2D heading compensation [P]
  ↓
TA-5: Non-inertial frames preview (conceptual only) [P]
  ↓
[P36] MP-2 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "How do you find velocity of A relative to C if you know A/B and B/C?"
[P68] Session close; [P85]; [P89] 1/3/7 days; [P91] 80% gate
```

**Protocol routing:** S0: full CPA, use physical demo (walk on moving walkway); S1: knows "add velocities" but not when to subtract; go deep on MC-VELOCITY-ABSOLUTE with discrimination pairs; S4: PD-1 fail → kinematics-2d; S6: [F] — "One rule: v_A/C = v_A/B + v_B/C. Draw a vector triangle, label everything"; S7: open with MP-5 (min time vs. min drift analysis — requires genuine reasoning about trade-offs).

---

## Component 8 — Adaptive Flags

- **Subscript convention**: enforce consistent notation v_A/B from the start. Students who write "v_car" without a slash consistently confuse themselves on multi-body problems.
- **Bloom level — analyze**: problems require students to *decompose* a situation (choose frame, identify which velocities are known, set up the vector equation) before calculating. Spend time on the setup step, not just the arithmetic.
- **Relative velocity in projectile context**: if a student has just completed projectile-motion, note that a projectile's velocity relative to a moving observer is found the same way — subtract the observer's velocity vector from the projectile's velocity vector.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.mech.relative-motion |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.mech.kinematics-2d ✓ |
| V-3 | difficulty label matches KG | PASS — proficient (4) |
| V-4 | bloom level matches KG | PASS — analyze |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 4h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-VELOCITY-ABSOLUTE, MC-FRAMES-ADD-SPEEDS |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (kinematics-2d / vector addition) |
| V-10 | Concrete anchor present [P06] | PASS — train and fly anchor |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P14, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with accelerated P (difficulty 4) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — subscript convention, bloom-analyze setup step, projectile crossover |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
