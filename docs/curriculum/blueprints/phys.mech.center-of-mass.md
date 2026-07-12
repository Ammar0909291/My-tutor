# Teaching Blueprint — phys.mech.center-of-mass

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.mech.center-of-mass
name: Center of Mass
domain: mechanics
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.mech.momentum
mastery_threshold: 0.80
estimated_hours: 4
cross_links:
  - phys.mech.equilibrium
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-COM-IS-GEOMETRIC-CENTRE
- **Trigger signal:** Student places the centre of mass at the geometric centre of an object regardless of mass distribution, or assumes CM always lies inside the object.
- **Conflict evidence [P28]:** "A dumbbell: 1 kg mass at x = 0, 9 kg mass at x = 1 m. Geometric centre = 0.5 m. CM = (1×0 + 9×1)/(1+9) = 0.9 m — much closer to the 9 kg end. A boomerang, a ring, or a hollow sphere: the CM lies outside the material entirely (inside the hole/empty region). A uniform object's CM = geometric centre, but any mass asymmetry shifts it."
- **Bridge text [P30]:** "The CM is a mass-weighted average position, not a geometric average. Heavy parts pull the CM toward them. If the mass distribution is uniform (same density everywhere), CM = geometric centre. Otherwise, use x_CM = Σmᵢxᵢ/Σmᵢ."
- **Replacement text [P31]:** "x_CM = Σmᵢxᵢ / M (1D); r_CM = Σmᵢrᵢ / M (3D). Heavy masses pull the CM closer to them. For uniform objects, CM = geometric centre. For asymmetric objects or composite systems, calculate explicitly."
- **Discrimination pairs [P33]:**
  - Uniform rod (1 m): CM at 0.5 m (geometric centre = mass centre) ✓
  - Rod with heavy end: CM shifted toward heavy end ✓
  - Ring: CM at centre — inside the empty space ✓ (CM outside material)
- **s6_path:** "Think of CM as a balance point — the point you would put a finger under to balance the object. For a lopsided object, that point is closer to the heavy side."

---

### MC-COM-VELOCITY-SUM
- **Trigger signal:** Student adds velocities of parts to find CM velocity, without weighting by mass, or confuses CM velocity with total speed.
- **Conflict evidence [P28]:** "System: m₁ = 1 kg at v₁ = 10 m/s; m₂ = 4 kg at v₂ = 2 m/s. Sum of speeds = 12 m/s. CM velocity = (1×10 + 4×2)/(1+4) = 18/5 = 3.6 m/s. Notice: CM velocity = total momentum / total mass = p_total/M. It's not the average or sum of speeds — it's the momentum-weighted average velocity."
- **Bridge text [P30]:** "CM velocity v_CM = Σmᵢvᵢ/M = p_total/M. This is why the CM theorem is powerful: the CM of an isolated system moves at constant velocity (Newton's 1st Law applied to the whole system), even while individual parts collide and change velocities."
- **Replacement text [P31]:** "v_CM = p_total/M. In an isolated system, v_CM is constant (no external forces → no change in p_total → no change in v_CM). Individual parts can do anything internally; the CM glides on undisturbed."
- **Discrimination pairs [P33]:**
  - Two equal masses moving at 4 m/s and 2 m/s: v_CM = 3 m/s (average, valid here because equal mass) ✓
  - Unequal masses: must use weighted average, not simple average ✓
- **s6_path:** "CM velocity is total momentum divided by total mass. Always. This is also why the CM is the natural reference frame for collision problems."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Momentum as mv**
Prompt: "A 3 kg object moves at 5 m/s east and a 1 kg object moves at 5 m/s west. What is the total momentum of the system?"
- Pass: p_total = 3×5 − 1×5 = 10 kg·m/s east (vector sum, signs matter).
- Fail → [P52]: "Centre of mass velocity = total momentum / total mass. Let's confirm the momentum formula first." → Route to phys.mech.momentum.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — the tug-of-war on ice**

> Two skaters on a frictionless ice rink (one heavy, one light) hold a rope and pull each other. They start from rest. Where do they meet?

They meet at their centre of mass — the CM doesn't move (no external horizontal force). The heavy skater moves less; the light skater moves more; they always meet at the CM. Try: 80 kg skater and 20 kg skater, initially 5 m apart. CM at 80×0 + 20×5 / 100 = 1 m from the heavy skater. They meet 1 m from the heavy skater's start.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Definition and Formula [C]**

For a system of n particles:
```
x_CM = (m₁x₁ + m₂x₂ + ... + mₙxₙ) / (m₁ + m₂ + ... + mₙ) = Σmᵢxᵢ / M
y_CM = Σmᵢyᵢ / M
```

For continuous objects (uniform density ρ):
```
x_CM = ∫x dm / M = ρ∫x dV / M
```

Results for standard shapes (state, don't derive):
- Uniform rod: CM at midpoint
- Uniform triangle: CM at centroid (1/3 from each side)
- Semicircle of radius R: CM at 4R/(3π) from flat edge
- Solid hemisphere: CM at 3R/8 from flat face

**TA-2 — CM Velocity and Newton's 2nd Law for Systems [C→P]**

Differentiating x_CM:
```
v_CM = Σmᵢvᵢ / M = p_total / M
a_CM = Σmᵢaᵢ / M = F_ext / M   (CM theorem)
```

The CM theorem: the CM of a system accelerates as if all the mass were concentrated at the CM and all external forces acted there. Internal forces (Newton's 3rd Law pairs) cancel.

Consequence: in an isolated system (F_ext = 0), a_CM = 0 → v_CM = constant. The CM moves at constant velocity regardless of internal collisions, explosions, or rearrangements.

**TA-3 — Using the CM Frame (Zero-Momentum Frame) [C→P]**

In the CM frame (reference frame moving at v_CM):
- Total momentum = 0 (by definition)
- Collisions are often simpler to analyse in this frame

For 1D elastic collision in CM frame: both particles simply reverse their velocities (and speed ratios preserved). Transform back to lab frame to get final velocities.

This connects to the elastic collision formula: the closed-form solutions come directly from working in the CM frame and transforming back.

**TA-4 — Composite Objects and Missing Pieces [P]**

Treating a shape as a union or difference of simpler shapes:

System CM = (CM of part 1 × m₁ + CM of part 2 × m₂) / (m₁ + m₂)

Removing a piece: treat as the composite minus the removed part.

Example — L-shaped plate: split into two rectangles, find each rectangle's CM, then find the CM of the combined system.

Example — plate with a hole: treat as full plate − hole.

**TA-5 — CM in Collisions: What Stays Fixed [P]**

In any collision, the CM velocity is conserved (external forces are zero during the brief collision):
```
v_CM before = v_CM after = p_total/M
```

This provides a quick consistency check for any collision calculation:
- Calculate v_CM = p_total/M before the collision.
- After computing the post-collision velocities, verify Σmᵢv_if/M = same v_CM.

For an explosion from rest: v_CM = 0 before → v_CM = 0 after → fragments have equal and opposite momenta. The CM stays at its original position forever.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — 3-mass system)**

> Three masses on a number line: 2 kg at x = 1 m, 5 kg at x = 3 m, 3 kg at x = 7 m. Find the CM.

```
x_CM = (2×1 + 5×3 + 3×7)/(2+5+3) = (2 + 15 + 21)/10 = 38/10 = 3.8 m
```

**WE-2 (Intermediate — CM velocity and trajectory)**

> A 4 kg object at (0, 0) moves at (3, 4) m/s. A 6 kg object at (5, 0) moves at (−1, 2) m/s. (a) Find CM position. (b) Find v_CM. (c) After 3 seconds (no external forces), where is the CM?

```
(a) x_CM = (4×0 + 6×5)/10 = 3 m; y_CM = 0

(b) v_CM = (4×(3,4) + 6×(−1,2))/10 = ((12,16) + (−6,12))/10 = (6,28)/10 = (0.6, 2.8) m/s

(c) r_CM(3s) = (3,0) + 3×(0.6,2.8) = (3+1.8, 0+8.4) = (4.8, 8.4) m
```

**WE-3 (Advanced — plate with hole)**

> A square plate (side 2 m, mass 4 kg) has a circular hole of radius 0.4 m cut at position (0.5, 0.5) from the plate's CM. Find the CM of the remaining plate.

```
Mass of removed circle: area ratio × total mass
Area of plate = 4 m²; area of circle = π(0.4)² = 0.503 m²
m_hole = 4 × 0.503/4 = 0.503 kg
m_remaining = 4 − 0.503 = 3.497 kg

x_CM of full plate = 0 (by symmetry, place plate CM at origin)
x_CM of hole = 0.5 m; x_CM of remaining plate = x_CM_full:

M × x_CM_full = m_remaining × x_CM_remaining + m_hole × x_CM_hole
4 × 0 = 3.497 × x_CM_remaining + 0.503 × 0.5
x_CM_remaining = −0.503 × 0.5 / 3.497 = −0.0719 m ≈ −0.072 m

CM shifts 7.2 cm in the −x direction (away from the hole). Similarly for y.
```

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — CM position**
"A 3 kg mass is at x = 2 m and a 9 kg mass is at x = 6 m. Find the CM. Verify: is it closer to the 3 kg or 9 kg mass?"

*Target:* x_CM = (3×2 + 9×6)/12 = (6+54)/12 = 5 m. Closer to 9 kg mass (at x=6) than 3 kg mass (at x=2) ✓.

**MP-2 [P36] — CM velocity**
"Two skaters: A (60 kg, 3 m/s north) and B (40 kg, 2 m/s south). Find v_CM."

*Target:* p_total = 60×3 − 40×2 = 180−80 = 100 kg·m/s north; v_CM = 100/100 = 1 m/s north.

**MP-3 [P36] — CM theorem (explosion)**
"A 5 kg object at rest explodes into two pieces: 2 kg and 3 kg. The 2 kg piece moves at 9 m/s east. Find the 3 kg piece's velocity. Where is the CM after 4 seconds?"

*Target:* 0 = 2×9 + 3×v₂ → v₂ = −6 m/s (6 m/s west). CM remains at rest (v_CM = 0, no external forces) — stays at the original position forever.

**MP-4 [P36] — Composite shape**
"An L-shape consists of: rectangle A (2 kg, CM at (1, 2)) and rectangle B (3 kg, CM at (3, 1)). Find the CM of the L-shape."

*Target:* x_CM = (2×1 + 3×3)/5 = 11/5 = 2.2 m; y_CM = (2×2 + 3×1)/5 = 7/5 = 1.4 m.

**MP-5 [P36] — CM in collision**
"Before a collision: m₁ = 2 kg at 6 m/s; m₂ = 3 kg at −2 m/s. After (partially inelastic): m₁ at 0.8 m/s. Find m₂'s final velocity. Verify that v_CM is unchanged."

*Target:* p_total = 2×6 + 3×(−2) = 6 kg·m/s; v_CM_before = 6/5 = 1.2 m/s. Momentum: 6 = 2×0.8 + 3×v₂f → v₂f = (6−1.6)/3 = 1.47 m/s. v_CM_after = (2×0.8 + 3×1.47)/5 = (1.6+4.41)/5 = 6.01/5 ≈ 1.2 m/s ✓.

---

## Component 7 — Session Architecture

```
[P01] Session open — ice-skaters tug-of-war provocation
  ↓
[P41] PD-1 (momentum, vector sign convention)
  ↓ PASS
[P06] Anchor: skaters meet at CM; heavy skater moves less
  ↓
TA-1: CM formula; discrete and continuous cases [C]
  ↓
TA-2: v_CM = p/M; CM theorem; isolated system → CM glides [C→P]
  ↓
[P28] Conflict: "CM is the geometric centre" → MC-COM-IS-GEOMETRIC-CENTRE
  ↓
WE-1: 3-mass system calculation
  ↓
[P51] Check-in MP-1 (CM position, closer-to-heavy check)
  ↓ monitor
TA-3: CM frame; zero-momentum frame [C→P]
  ↓
TA-4: Composite shapes; plate with hole [P]
  ↓
WE-2 → WE-3 (CM velocity trajectory; plate with hole)
  ↓
TA-5: CM in collisions — consistency check [P]
  ↓
[P36] MP-2 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "v_CM = ? for a two-body system with masses m₁, m₂ and velocities v₁, v₂"
[P68]; [P85]; [P89] 1/3/7 days; [P91] 80% gate
```

**Protocol routing:** S0: full CPA; physically model skater problem with two students of different sizes; S1: knows formula but places CM at geometric centre → MC-COM-IS-GEOMETRIC-CENTRE; S4: PD-1 fail → phys.mech.momentum; S6: [F] — "One formula: x_CM = Σmᵢxᵢ/M. It's a weighted average of positions"; S7: open with WE-3 (plate with hole) — this reverse-subtraction approach surprises overconfident students.

---

## Component 8 — Adaptive Flags

- **2D extension**: always set up x_CM and y_CM as separate independent calculations; never mix components. Students who have seen 2D kinematics should transfer this habit naturally.
- **CM outside the material**: this surprises many students. Use a ring or boomerang example explicitly — CM at a point in empty space is physically real (the ring balances on your finger at the centre, even with no material there).
- **CM frame (TA-3)**: brief introduction only. The full centre-of-mass frame technique with frame transformation is an advanced topic (typically university mechanics). Present it as a conceptual tool, not a required calculation method at this level.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.mech.center-of-mass |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.mech.momentum ✓ |
| V-3 | difficulty label matches KG | PASS — proficient (4) |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 4h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-COM-IS-GEOMETRIC-CENTRE, MC-COM-VELOCITY-SUM |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (momentum) |
| V-10 | Concrete anchor present [P06] | PASS — ice-skater tug-of-war |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with accelerated P (difficulty 4) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — 2D components, CM outside material, CM-frame scope limit |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
