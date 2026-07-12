# Teaching Blueprint — phys.mech.pressure-fluids

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.mech.pressure-fluids
name: Pressure in Fluids
domain: mechanics
difficulty:
  label: developing
  number: 3
bloom: understand
prerequisites:
  - phys.mech.newtons-second-law
mastery_threshold: 0.80
estimated_hours: 3
cross_links:
  - phys.mech.buoyancy
  - phys.mech.bernoulli
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 3 → C with full CPA track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-PRESSURE-DIRECTION
- **Trigger signal:** Student says "fluid pressure acts downward" or draws pressure arrows pointing only downward on a submerged object.
- **Conflict evidence [P28]:** "Submerge a hollow ball in water and drill a hole in its side. Water enters from all directions — top, bottom, and all sides — not just from above. Fluid pressure acts in all directions simultaneously. At any point in a fluid, the pressure is the same in all directions (Pascal's principle for static fluids). On the bottom of a container, pressure acts upward on the container wall; on the sides it acts horizontally. 'Pressure acts downward' is only true for the force on a horizontal surface facing up."
- **Bridge text [P30]:** "Pressure P at a depth d is P = P₀ + ρgd. This gives the magnitude of pressure at that depth — but the pressure acts equally in all directions at that point. The force on any surface = P × A, directed perpendicular to the surface (inward into the fluid)."
- **Replacement text [P31]:** "Pressure P = F/A is a scalar. The force on a surface = P × A, directed perpendicular to and into that surface. Fluid pressure acts in all directions at any given point — horizontal surfaces feel it vertically, vertical surfaces feel it horizontally."
- **Discrimination pairs [P33]:**
  - Horizontal surface at depth d, facing up: force = ρgdA upward (from water below) ✓
  - Vertical wall at depth d: force = ρgdA horizontal (toward the wall) ✓
  - All directions at a point: same scalar pressure P = ρgd ✓
- **s6_path:** "Think of a diver at 10 m depth. Their wetsuit is squeezed from all sides equally — top, bottom, sides. That's fluid pressure acting in all directions."

---

### MC-PRESSURE-DEPENDS-ON-VOLUME
- **Trigger signal:** Student says "a bigger container has more pressure at the bottom" or thinks pressure at depth h depends on how much fluid is above.
- **Conflict evidence [P28]:** "Consider two containers: a wide barrel and a thin tube, both filled to the same height h = 1 m with water. Pressure at the bottom of both is P = ρgh = 1000 × 9.8 × 1 = 9800 Pa. The barrel contains 100× more water — but the pressure at the same depth is identical. Pressure depends only on depth h, density ρ, and g — not on the total volume or the shape of the container."
- **Bridge text [P30]:** "Each horizontal layer of fluid supports only the weight of fluid directly above it per unit area. The pressure P = ρgh reflects the weight per unit area of a fluid column of height h — shape and volume of the container are irrelevant."
- **Replacement text [P31]:** "P = P₀ + ρgh: pressure at depth h depends on: (1) atmospheric pressure P₀ at the surface, (2) density ρ of the fluid, (3) gravitational field g, (4) depth h. Container shape and volume do not appear."
- **Discrimination pairs [P33]:**
  - 1 m depth in a swimming pool: P_gauge = 9800 Pa ✓
  - 1 m depth in a narrow test tube of water: P_gauge = 9800 Pa (same) ✓
- **s6_path:** "The hydraulic paradox — same depth, same pressure, regardless of container shape. Plumbers use this: water pressure at your basement tap depends on the height of the water tower, not how large the tower's tank is."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Force and area**
Prompt: "A force of 60 N acts on an area of 0.3 m². What is the pressure? If the area is halved, what happens to the pressure?"
- Pass: P = 60/0.3 = 200 Pa; halving area → doubles pressure (P = F/A, inverse proportional to A).
- Fail → [P52]: "Pressure = force per unit area. F and A must be compatible units. Let's confirm P = F/A before going to fluid pressure." Brief review, proceed.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — the deep-sea diver vs. the paddling pool**

> A diver at 100 m depth (ocean) feels enormous pressure crushing from all sides. A child in a 0.3 m deep paddling pool feels almost nothing. What's different? Just the depth. Not the ocean's size — a test tube filled to 100 m height would create the same pressure at its base as the ocean at 100 m depth. Depth is everything; volume is irrelevant.

Second anchor: press one finger into a table. The force is small. Now press a pin (same force, tiny area) — it digs in. Same force, less area → more pressure. This is P = F/A in action.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Pressure Definition [C]**

```
P = F/A      (pressure = normal force per unit area)
Units: Pa (Pascal) = N/m²
```

Atmospheric pressure at sea level: P₀ ≈ 101 325 Pa ≈ 1 atm ≈ 101 kPa.

Pressure is a scalar — no direction. The force it produces on a surface depends on the surface's orientation (F = PA, perpendicular to and into the surface).

**TA-2 — Pressure at Depth: Derivation [C→P]**

Consider a fluid column of height h, density ρ, cross-sectional area A:
```
Weight = ρ × V × g = ρ × Ah × g

Pressure from this column = Weight/A = ρgh
```

Total pressure at depth h (including atmospheric pressure at surface):
```
P = P₀ + ρgh
```

Gauge pressure (above atmospheric): P_gauge = ρgh.

**TA-3 — Pascal's Principle [C→P]**

Pascal's principle: A pressure change applied to an enclosed fluid is transmitted undiminished to every part of the fluid.

Application — hydraulic press:
```
P_in = P_out
F_in/A_in = F_out/A_out
F_out = F_in × (A_out/A_in)
```

A car lift: small piston (area 0.01 m²), large piston (area 0.5 m²). Input force 100 N → output force = 100 × 50 = 5000 N. Energy is conserved: the small piston moves 50× further than the large piston.

**TA-4 — Manometers and Pressure Measurement [P]**

U-tube manometer: two arms connected by fluid. If one arm is open to atmosphere (P₀) and the other connects to a gas at pressure P:
```
P = P₀ + ρgh
```
where h is the height difference between fluid levels.

Mercury barometer: P₀ = ρ_mercury × g × h_mercury → h = P₀/(ρg) = 101 325/(13 600 × 9.8) ≈ 0.760 m = 760 mm Hg.

**TA-5 — Applications: Dams, Blood Pressure, Atmospheric Pressure [P]**

Dam design: pressure increases with depth → dam walls must be thicker at the base than at the top. The pressure on the dam face at depth h: P = ρgh (gauge). Total force on a rectangular dam face (height H, width W):
```
F_total = ∫₀ᴴ ρgh × W × dh = ½ρgH²W
```
(Integral result — for classes without calculus: state as ½ρgH²W.)

Blood pressure: systolic 120 mmHg ≈ 16 kPa; diastolic 80 mmHg ≈ 10.7 kPa. Gauge pressure relative to atmospheric. Affected by height of measuring point relative to heart (P = P_heart ± ρgh_blood column).

---

## Component 5 — Worked Examples

**WE-1 (Foundational — pressure at depth)**

> Calculate the absolute and gauge pressure at the bottom of a 5 m deep swimming pool. (ρ_water = 1000 kg/m³, P₀ = 101 325 Pa)

```
Gauge: P_gauge = ρgh = 1000 × 9.8 × 5 = 49 000 Pa
Absolute: P = P₀ + P_gauge = 101 325 + 49 000 = 150 325 Pa ≈ 1.49 atm
```

**WE-2 (Intermediate — hydraulic press)**

> A hydraulic car lift: small piston diameter 4 cm, large piston diameter 40 cm. A 50 N force on the small piston supports how heavy a car?

```
A_small = π(0.02)² = 1.257 × 10⁻³ m²
A_large = π(0.20)² = 0.1257 m²

F_large/F_small = A_large/A_small = 0.1257/1.257 × 10⁻³ = 100

F_large = 50 × 100 = 5000 N  (mass ≈ 510 kg — reasonable for a small car)
```

**WE-3 (Intermediate — manometer)**

> A U-tube manometer contains water. The left arm is open to atmosphere; the right arm connects to a gas container. The water level in the right arm is 12 cm higher than in the left. Is the gas pressure above or below atmospheric? Calculate the gauge pressure.

```
Higher water on the right means the gas pushes the water down on the right side —
wait: left arm open, right arm connected. If right is higher, the gas pressure must be LESS than atmospheric.

P_gas + ρg(0.12) = P₀
P_gas = P₀ − ρgh = 101 325 − 1000×9.8×0.12 = 101 325 − 1176 = 100 149 Pa

Gauge pressure = P_gas − P₀ = −1176 Pa (12 cm below atmospheric)
```

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Pressure direction**
"Draw a submerged cube at depth 2 m in water. On which faces does water pressure act? In which directions? Calculate the force on the top face (0.1 m × 0.1 m)."

*Target:* All 6 faces. Top face: P = ρg×2 = 19 600 Pa; F = P×A = 19 600 × 0.01 = 196 N downward. Bottom face: P = ρg×2.1 = 20 580 Pa; F = 205.8 N upward. Difference = 9.8 N = buoyant force.

**MP-2 [P36] — Pressure vs. depth**
"A barrel (1 m² base area) and a test tube (1 cm² base area) both contain water to height 2 m. Compare P at the base of each."

*Target:* Both: P_gauge = ρgh = 1000×9.8×2 = 19 600 Pa. Same pressure regardless of container volume.

**MP-3 [P36] — Hydraulic system**
"A hydraulic brake system: pedal piston area = 3 cm². Brake caliper piston area = 24 cm². Pedal force = 150 N. Find brake clamping force."

*Target:* F_brake = 150 × (24/3) = 150 × 8 = 1200 N.

**MP-4 [P36] — Barometer calculation**
"Why is the height of mercury in a barometer 760 mm, but the equivalent water barometer would be 10.3 m? Show using P₀ = ρgh."

*Target:* h = P₀/(ρg). Mercury: h = 101 325/(13 600×9.8) = 0.760 m. Water: h = 101 325/(1000×9.8) = 10.34 m. Mercury is 13.6× denser, so height is 13.6× shorter.

**MP-5 [P36] — Synthesis: blood pressure at ankle**
"Blood pressure at heart level = 120 mmHg systolic. A person stands; their ankle is 1.2 m below heart level. What is blood pressure at the ankle? (ρ_blood = 1060 kg/m³; 1 mmHg = 133 Pa)"

*Target:* P_heart = 120 × 133 = 15 960 Pa; P_ankle = P_heart + ρgh = 15 960 + 1060×9.8×1.2 = 15 960 + 12 465 = 28 425 Pa ≈ 214 mmHg. This is why swollen ankles occur (high venous pressure at foot level).

---

## Component 7 — Session Architecture

```
[P01] Session open — diver vs. paddling pool provocation
  ↓
[P41] PD-1 (P = F/A; inverse relationship with area)
  ↓ PASS
[P06] Anchor: depth is everything; pin vs. finger
  ↓
TA-1: P = F/A definition; units; Pascal [C]
  ↓
TA-2: P = P₀ + ρgh derivation; gauge vs. absolute [C→P]
  ↓
[P28] Conflict: "bigger container = more pressure" → MC-PRESSURE-DEPENDS-ON-VOLUME
  ↓
WE-1: Pressure at pool bottom (gauge and absolute)
  ↓
[P51] Check-in MP-2 (barrel vs. test tube — same depth, same pressure)
  ↓ monitor
TA-3: Pascal's principle; hydraulic press calculation [C→P]
  ↓
WE-2 → WE-3 (hydraulic car lift; manometer)
  ↓
TA-4: Manometers; mercury barometer [P]
  ↓
TA-5: Applications — dams, blood pressure [P]
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "At depth h in water (ρ=1000), what is the gauge pressure?"
[P68]; [P85]; [P89] 1/3/7 days; [P91] 80% gate
```

**Protocol routing:** S0: full CPA; demonstrate pin vs. finger; use diver image/video for anchor; S1: knows P=ρgh but places pressure only downward → MC-PRESSURE-DIRECTION; S4: PD-1 fail → newtons-second-law; S6: [F] — "Three quantities in one formula: ρ, g, h. Everything else follows from P=F/A"; S7: open with MP-5 (blood pressure gradient — medical application that surprises most overconfident students).

---

## Component 8 — Adaptive Flags

- **Gauge vs. absolute**: always clarify which the problem asks for. Gauge = P − P₀. Most everyday applications use gauge pressure; engineering calculations often need absolute.
- **Pascal's principle energy conservation**: in the hydraulic press, force is amplified but displacement is reduced proportionally. Total work is conserved (W = F_in × d_in = F_out × d_out). Emphasise: hydraulics amplify force, not energy.
- **Manometer sign convention**: if the gas arm is lower than the open arm, gas pressure > atmospheric; if higher, gas pressure < atmospheric. Draw a diagram and label before solving.
- **Blood pressure application** (TA-5, MP-5): this is medically relevant and motivating. The 1.2 m height difference creates ~12 kPa extra pressure at ankle level — enough to cause venous pooling in sedentary people or those with poor venous valves.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.mech.pressure-fluids |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.mech.newtons-second-law ✓ |
| V-3 | difficulty label matches KG | PASS — developing (3) |
| V-4 | bloom level matches KG | PASS — understand |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 3h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-PRESSURE-DIRECTION, MC-PRESSURE-DEPENDS-ON-VOLUME |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (F/A; inverse area relationship) |
| V-10 | Concrete anchor present [P06] | PASS — diver vs. paddling pool; pin vs. finger |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with full CPA (difficulty 3) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — gauge vs. absolute, Pascal energy conservation, manometer sign, blood pressure application |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
