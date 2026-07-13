# Teaching Blueprint — phys.mech.bernoulli

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.mech.bernoulli
name: Bernoulli's Principle
domain: mechanics
difficulty:
  label: advanced
  number: 5
bloom: apply
prerequisites:
  - phys.mech.pressure-fluids
  - phys.mech.conservation-of-energy
mastery_threshold: 0.80
estimated_hours: 5
cross_links:
  - phys.mech.viscosity
  - phys.mech.buoyancy
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 5 → C with accelerated P track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-BERNOULLI-FAST-LOW-PRESSURE-MYSTERY
- **Trigger signal:** Student accepts "fast flow = low pressure" as a fact without understanding why, or says "Bernoulli's principle means fast air sucks things up."
- **Conflict evidence [P28]:** "Bernoulli's equation is an energy conservation statement, not a mysterious suction rule. Derive it: work done on fluid element = change in KE + change in PE. For a steady, incompressible, non-viscous fluid: P + ½ρv² + ρgh = constant. The 'low pressure' at high speed is not a cause — it is a consequence of energy conservation. Where KE (½ρv²) increases, pressure P must decrease to keep the total constant. High-speed air doesn't 'suck' — it simply has less pressure because more of the energy budget is in kinetic form."
- **Bridge text [P30]:** "Think of the three terms as the energy per unit volume: P is flow work (pressure energy), ½ρv² is kinetic energy density, ρgh is gravitational PE density. Their sum is constant along a streamline — like total mechanical energy for a particle. If v goes up, something else must go down. P is the only other term that can change instantly."
- **Replacement text [P31]:** "P + ½ρv² + ρgh = const (along a streamline). Fast flow → high KE density → low pressure, by energy conservation — not suction. The pressure gradient, not the high-speed region, is what drives fluid and creates net forces."
- **Discrimination pairs [P33]:**
  - Constriction in a pipe (venturi): speed increases, pressure decreases ✓ (Bernoulli)
  - Flat plate in airflow: boundary layer separation, complex pressure distribution ✗ (Bernoulli alone insufficient — viscosity/separation matter)
- **s6_path:** "Bernoulli is just energy conservation written for a fluid. You already know energy conservation — this is the same idea in a new costume."

---

### MC-BERNOULLI-LIFT-EQUAL-TRANSIT
- **Trigger signal:** Student explains aerofoil lift by saying "air over the top takes longer, so it must go faster to meet air from below on the other side."
- **Conflict evidence [P28]:** "The equal-transit-time theory is experimentally false. Air over the top of an aerofoil travels faster AND arrives at the trailing edge before air that went below — there is no rendezvous requirement. Wind-tunnel smoke visualisations show the top-surface air arrives first. The real explanation: aerofoil shape and angle of attack deflect airflow downward (Newton's 3rd law: air pushed down → lift force up), and the curved upper surface accelerates flow (real Kutta–Joukowski circulation, beyond A-level). Bernoulli correctly relates the speed difference to a pressure difference — but the speed difference is not explained by equal transit time."
- **Bridge text [P30]:** "Bernoulli's equation correctly computes lift once you know the speed difference between upper and lower surfaces: L = (P_bottom − P_top) × A = ½ρ(v_top² − v_bottom²) × A. The error is in explaining why v_top > v_bottom — the answer is aerofoil camber + angle of attack + circulation, not equal transit time."
- **Replacement text [P31]:** "Lift arises because the aerofoil pushes air downward (Newton III) and because upper-surface curvature + angle of attack create a higher-speed, lower-pressure region on top. Bernoulli relates the speed difference to pressure difference. Equal transit time is false — upper air arrives first."
- **Discrimination pairs [P33]:**
  - Symmetric aerofoil at zero angle of attack: no lift (v_top = v_bottom, P equal) ✓
  - Symmetric aerofoil at positive angle of attack: lift (deflects air down; v_top > v_bottom) ✓
- **s6_path:** "The equal-transit myth is taught in many textbooks — knowing it is wrong makes you the expert in the room."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Pressure at depth**
Prompt: "Water flows through a horizontal pipe. At a wide section the speed is 2 m/s and the pressure is 50 kPa. What happens to the pressure at a narrow section where the speed is 8 m/s? (Qualitative answer first, then quantitative.)"
- Pass: Pressure decreases (Bernoulli qualitatively); quantitative: ΔP = ½ρ(v₂² − v₁²) = ½×1000×(64−4) = 30 000 Pa decrease → P₂ = 20 kPa.
- Fail → [P52]: Probe which prerequisite is weak. If P = F/A or P = ρgh unconfident → revisit phys.mech.pressure-fluids. If energy conservation unfamiliar → revisit phys.mech.conservation-of-energy. Brief targeted repair before proceeding.

**PD-2 [P41] — Continuity (pre-Bernoulli)**
Prompt: "Water flows at 3 m/s through a pipe of cross-section 0.04 m². The pipe narrows to 0.01 m². What is the speed in the narrow section?"
- Pass: A₁v₁ = A₂v₂ → v₂ = 3×0.04/0.01 = 12 m/s. (Continuity equation — mass conservation for incompressible fluid.)
- Fail → [P52]: "The flow rate Q = Av is constant — what goes in per second must come out per second. This is mass conservation for incompressible fluids." Brief review, proceed.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — the shower curtain and the venturi**

> Step into a shower. Turn on the hot water. The shower curtain billows inward toward the spray — not outward as you might expect from "water pushing air out." The fast-moving air dragged by the water stream has lower pressure than the still air outside; the higher outside pressure pushes the curtain inward. This is Bernoulli's principle in your bathroom.

Second anchor: hold two sheets of A4 paper parallel, about 3 cm apart, and blow between them. They move together, not apart. The fast-moving air between the sheets has lower pressure than the still air outside — the higher outside pressure pushes the sheets inward.

Third anchor — venturi tube: a tube that narrows in the middle (constriction). Connect pressure gauges at the wide and narrow sections. Turn on the water. Pressure in the narrow section is visibly lower. Speed up the flow — the pressure difference grows. This is the venturi effect, the most direct demonstration of Bernoulli's equation.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Continuity Equation [C]**

For an incompressible fluid (constant density ρ) in steady flow:
```
A₁v₁ = A₂v₂      (continuity equation; Q = Av = constant)
```

Q = volume flow rate (m³/s). Mass flow rate ṁ = ρQ = constant.

Physical meaning: a narrowing pipe squeezes fluid to flow faster — like squeezing a garden hose.

Units check: A (m²) × v (m/s) = m³/s ✓

**TA-2 — Bernoulli's Equation: Derivation [C→P]**

Consider a fluid parcel of volume ΔV moving along a streamline. Work-energy theorem:

Work done by pressure forces + work done by gravity = change in kinetic energy.

```
P₁ΔV − P₂ΔV + ρΔVg(h₁ − h₂) = ½ρΔV(v₂² − v₁²)
```

Divide by ΔV:

```
P₁ + ρgh₁ + ½ρv₁² = P₂ + ρgh₂ + ½ρv₂²

∴  P + ρgh + ½ρv² = constant     (along a streamline)
```

**Bernoulli's equation** — valid for:
1. Steady (non-turbulent) flow
2. Incompressible fluid (ρ = constant)
3. Non-viscous fluid
4. Along a single streamline

Three energy terms (per unit volume):
- P: pressure energy / flow work (Pa = J/m³)
- ½ρv²: kinetic energy density
- ρgh: gravitational PE density

**TA-3 — Horizontal Flow (ρgh term cancels) [C→P]**

For horizontal flow (h₁ = h₂):
```
P₁ + ½ρv₁² = P₂ + ½ρv₂²

P₁ − P₂ = ½ρ(v₂² − v₁²)
```

This is the form used in most applications: venturi meters, aerofoils, Pitot tubes.

**Venturi meter** application:
- Connect U-tube manometer across wide (1) and narrow (2) sections
- Measure pressure difference ΔP = ρ_fluid × g × Δh (manometer reading)
- Solve for v₂: v₂ = v₁(A₁/A₂); substitute into ΔP = ½ρ(v₂²−v₁²)

**TA-4 — Torricelli's Theorem [P]**

A large tank (area A_tank ≫ A_hole) with a hole at depth h below the surface. Surface velocity ≈ 0 (large tank). Surface and hole both open to atmosphere (P same):

```
P₀ + ρgh + 0 = P₀ + 0 + ½ρv_hole²

v_hole = √(2gh)
```

This is Torricelli's theorem — the efflux speed equals the free-fall speed from the surface height. Same as dropping an object from height h: v = √(2gh).

Interesting: the efflux speed is independent of the fluid density (if you ignore viscosity).

**TA-5 — Aerofoil Lift (Qualitative) and Pitot Tube [P]**

**Aerofoil lift** (A-level treatment):
Upper surface: curved (longer path, higher speed v_top) → lower pressure P_top
Lower surface: shorter path, lower speed v_bottom → higher pressure P_bottom

```
Net upward pressure force = (P_bottom − P_top) × A_wing
                           = ½ρ(v_top² − v_bottom²) × A_wing
```

Note: "equal transit time" explanation is false (see MC-BERNOULLI-LIFT-EQUAL-TRANSIT). The speed difference arises from aerofoil geometry and angle of attack.

**Pitot tube** (aircraft speed measurement):
- Two openings: static port (pressure P_s, side-facing) and stagnation port (pressure P_stag, forward-facing; v→0 at tip)
- Bernoulli: P_s + ½ρv² = P_stag + 0 → v = √(2(P_stag − P_s)/ρ)
- Instruments read P_stag − P_s → display airspeed

---

## Component 5 — Worked Examples

**WE-1 (Foundational — venturi meter)**

> Water (ρ = 1000 kg/m³) flows through a horizontal pipe. The wide section has diameter 6 cm and pressure 80 kPa. It narrows to diameter 3 cm. Find the pressure in the narrow section if the flow speed in the wide section is 2 m/s.

```
Step 1 — Continuity: A₁v₁ = A₂v₂
A₁ = π(0.03)² = 2.827 × 10⁻³ m²
A₂ = π(0.015)² = 7.069 × 10⁻⁴ m²
v₂ = v₁ × (A₁/A₂) = 2 × (2.827/0.7069) = 2 × 4 = 8 m/s

Step 2 — Bernoulli (horizontal):
P₁ + ½ρv₁² = P₂ + ½ρv₂²
80 000 + ½×1000×4 = P₂ + ½×1000×64
80 000 + 2 000 = P₂ + 32 000
P₂ = 50 000 Pa = 50 kPa
```

Pressure drops from 80 kPa to 50 kPa (30 kPa decrease). Speed increases 4×, area decreases 4×.

**WE-2 (Intermediate — Torricelli / efflux)**

> A large water tank has a small hole at its side, 1.8 m below the water surface. (a) What is the efflux speed? (b) If the hole is 0.5 m above the ground, how far horizontally does the water jet travel before hitting the ground?

```
(a) Torricelli: v = √(2gh) = √(2 × 9.8 × 1.8) = √35.28 = 5.94 m/s

(b) The jet exits horizontally at height 0.5 m above ground:
    Time to fall: h = ½gt² → t = √(2×0.5/9.8) = √0.102 = 0.32 s
    Horizontal range: x = v × t = 5.94 × 0.32 = 1.90 m
```

**WE-3 (Advanced — Pitot tube + aerofoil)**

> An aircraft's Pitot tube reads P_stag − P_static = 2400 Pa. Air density = 1.2 kg/m³. (a) Find the aircraft's airspeed. (b) The wing has area 20 m². If v_top = 180 m/s and v_bottom = 140 m/s over the wing, estimate the lift force.

```
(a) v = √(2ΔP/ρ) = √(2 × 2400/1.2) = √4000 = 63.2 m/s ≈ 63 m/s

(b) L = ½ρ(v_top² − v_bottom²) × A
       = ½ × 1.2 × (180² − 140²) × 20
       = 0.6 × (32 400 − 19 600) × 20
       = 0.6 × 12 800 × 20
       = 153 600 N ≈ 154 kN
    (≈ 15 700 kg weight — reasonable for a small passenger jet)
```

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Continuity**
"Water enters a pipe system at 4 m/s through a pipe of cross-section 50 cm². The pipe splits into two equal branches, each with cross-section 10 cm². Find the speed in each branch."

*Target:* Q_in = 4 × 50×10⁻⁴ = 0.02 m³/s. Each branch carries Q/2 = 0.01 m³/s. Speed = 0.01/(10×10⁻⁴) = 10 m/s.

**MP-2 [P36] — Bernoulli horizontal**
"Oil (ρ = 800 kg/m³) flows horizontally. At point A: P = 120 kPa, v = 3 m/s. At point B: v = 9 m/s. Find P at B."

*Target:* P_B = P_A + ½ρ(v_A² − v_B²) = 120 000 + ½×800×(9−81) = 120 000 + 400×(−72) = 120 000 − 28 800 = 91 200 Pa = 91.2 kPa.

**MP-3 [P36] — Height change included**
"Water (ρ = 1000 kg/m³) flows through a pipe. At the ground floor (h=0): P = 200 kPa, v = 1 m/s. The pipe rises to a height of 8 m. Speed at the top is 2 m/s. Find pressure at the top."

*Target:* P_top = P_bot + ½ρ(v_bot² − v_top²) + ρg(h_bot − h_top) = 200 000 + ½×1000×(1−4) + 1000×9.8×(−8) = 200 000 − 1500 − 78 400 = 120 100 Pa ≈ 120 kPa.

**MP-4 [P36] — Torricelli / synthesis**
"A tank is open to atmosphere. A hole is at depth d₁ = 0.45 m below the surface, and another at depth d₂ = 1.8 m. Compare their efflux speeds and find which jet travels further horizontally if both holes are at the same height h = 1.25 m above the floor."

*Target:* v₁ = √(2×9.8×0.45) = √8.82 = 2.97 m/s; v₂ = √(2×9.8×1.8) = √35.28 = 5.94 m/s. Fall time same for both (same height h): t = √(2×1.25/9.8) = 0.505 s. x₁ = 2.97×0.505 = 1.50 m; x₂ = 5.94×0.505 = 3.00 m. Deeper hole → faster jet → further horizontal range.

**MP-5 [P36] — Critical reasoning: Bernoulli limits**
"A student says: 'Bernoulli's principle explains why a curved ball curves in football — the spinning ball drags air on one side, creating higher speed and lower pressure.' Is this a correct application of Bernoulli's principle? What additional physics is needed?"

*Target:* Partially correct — the Magnus effect does create a speed asymmetry around the spinning ball, which Bernoulli correctly relates to a pressure difference → net force (curve). BUT Bernoulli alone is insufficient: the mechanism by which spin creates the speed asymmetry requires viscosity (boundary layer attachment on one side, separation on the other — the Magnus effect). Bernoulli is the last step of the explanation, not the full explanation. Bernoulli's equation is also strictly for non-viscous flow — using it for viscous phenomena (like the Magnus effect) requires care.

---

## Component 7 — Session Architecture

```
[P01] Session open — shower curtain / paper sheets demonstration
  ↓
[P41] PD-1 (pressure + energy conservation readiness)
  ↓ PASS
[P41] PD-2 (continuity equation; Q = Av)
  ↓ PASS
[P06] Anchor: venturi tube pressure gauges; shower curtain; two-paper-sheet demo
  ↓
TA-1: Continuity A₁v₁ = A₂v₂ — mass conservation [C]
  ↓
TA-2: Bernoulli derivation (work-energy for fluid parcel) [C→P]
  ↓
[P28] Conflict: "fast air sucks" → MC-BERNOULLI-FAST-LOW-PRESSURE-MYSTERY
  ↓
WE-1: Venturi meter — find P₂ from speed ratio and Bernoulli
  ↓
[P51] Check-in MP-1 (continuity with branching pipes)
  ↓ monitor
TA-3: Horizontal Bernoulli; venturi meter application [C→P]
  ↓
[P28] Conflict: "equal transit time" → MC-BERNOULLI-LIFT-EQUAL-TRANSIT
  ↓
TA-4: Torricelli's theorem; efflux v = √(2gh) [P]
  ↓
WE-2 → WE-3 (Torricelli efflux + projectile; Pitot tube + aerofoil lift)
  ↓
TA-5: Aerofoil lift (qualitative); Pitot tube [P]
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "Water in a horizontal pipe doubles speed. How does pressure change?"
[P68]; [P85]; [P89] 1/3/7 days; [P91] 80% gate
```

**Protocol routing:** S0: full CPA — start with two-paper demo and shower curtain before any equation; S1: knows P+½ρv²=const but uses equal-transit-time myth for lift → MC-BERNOULLI-LIFT-EQUAL-TRANSIT; S4: PD-1 or PD-2 fail → pressure-fluids or conservation-of-energy remediation; S6: [F] — "Bernoulli is energy conservation in disguise — three terms, all energy per unit volume, adding to a constant"; S7: open with MP-5 (Magnus effect — requires reasoning beyond rote Bernoulli application).

---

## Component 8 — Adaptive Flags

- **Validity conditions**: Bernoulli applies strictly to steady, incompressible, non-viscous, irrotational flow along a streamline. Real fluids violate all four at extremes. Flag this whenever a student over-applies it (turbulent wake, viscous pipe flow, spinning-ball Magnus effect).
- **ρgh term**: for most horizontal engineering problems (pipes, aerofoils, venturi meters) h is constant → term drops out. For vertical problems (tank outflow, pressure in buildings) it is critical. Always check whether heights differ before dropping the ρgh term.
- **Continuity before Bernoulli**: in almost every multi-step Bernoulli problem, the student must first apply continuity to find v₂, then apply Bernoulli to find P₂. These two steps are invariably conflated. Train the two-step habit: (1) geometry → continuity → speeds; (2) speeds → Bernoulli → pressures.
- **Pitot tube sign**: stagnation pressure P_stag > static pressure P_s (kinetic energy has been converted to pressure at the stagnation point). v = √(2ΔP/ρ) where ΔP = P_stag − P_s > 0. Students often reverse the subtraction.
- **Aerofoil lift magnitude**: computed from ½ρ(v_top²−v_bottom²)×A is a rough estimate — real lift involves circulation, viscosity, and angle of attack. Use it for order-of-magnitude checks, not aircraft certification.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.mech.bernoulli |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.mech.pressure-fluids ✓, phys.mech.conservation-of-energy ✓ |
| V-3 | difficulty label matches KG | PASS — advanced (5) |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 5h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-BERNOULLI-FAST-LOW-PRESSURE-MYSTERY, MC-BERNOULLI-LIFT-EQUAL-TRANSIT |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (pressure-fluids; energy-conservation), PD-2 (continuity pre-check) |
| V-10 | Concrete anchor present [P06] | PASS — shower curtain; two-paper demo; venturi tube |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with accelerated P track (difficulty 5) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — validity conditions, ρgh term handling, two-step procedure, Pitot sign, aerofoil limitations |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
