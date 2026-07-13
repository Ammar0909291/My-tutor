# Teaching Blueprint — phys.mech.buoyancy

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.mech.buoyancy
name: Buoyancy and Archimedes' Principle
domain: mechanics
difficulty:
  label: developing
  number: 3
bloom: apply
prerequisites:
  - phys.mech.pressure-fluids
mastery_threshold: 0.80
estimated_hours: 3
cross_links:
  - phys.mech.pressure-fluids
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 3 → C with full CPA track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-BUOYANCY-WEIGHT
- **Trigger signal:** Student says "heavier objects sink, lighter objects float" without reference to density, or believes a 1 kg steel ball sinks because it weighs more than a 1 kg foam ball.
- **Conflict evidence [P28]:** "A 1 kg steel ball sinks; a 1000 kg steel ship floats. The ship is 1000× heavier yet it floats. What's different? The ship is hollow — its average density (total mass / total volume including air) is less than water's density. Buoyancy depends on displaced volume (and fluid density), not the object's weight. A 1 kg ball of polystyrene floats because its density is less than water; a 1 kg steel ball sinks because its density exceeds water."
- **Bridge text [P30]:** "An object floats when its average density < fluid density; sinks when its average density > fluid density. Average density = total mass / total volume (including hollow spaces). Archimedes' principle: buoyant force = weight of fluid displaced = ρ_fluid × V_displaced × g."
- **Replacement text [P31]:** "Floating/sinking is determined by density comparison, not weight comparison. A ship floats because its average density (total mass including air in hull / total volume) < ρ_water. F_buoy = ρ_fluid × V_submerged × g — depends on fluid density and submerged volume, not the object's weight."
- **Discrimination pairs [P33]:**
  - Steel ball (7800 kg/m³): ρ > ρ_water → sinks ✓
  - Steel ship: average density < 1000 kg/m³ (mostly air) → floats ✓
  - 10 kg wood plank vs. 1 kg steel marble: wood floats (ρ_wood ≈ 600), marble sinks (ρ_steel ≈ 7800) — heavier object floats ✓
- **s6_path:** "Ships carrying thousands of tonnes of cargo can float — because density is about shape and hollow space, not just mass. Once you see it as density comparison, everything clicks."

---

### MC-BUOYANCY-PROPORTIONAL-TO-DEPTH
- **Trigger signal:** Student says "an object that sinks deeper experiences more buoyancy" or expects F_buoy to increase as the object sinks further.
- **Conflict evidence [P28]:** "F_buoy = ρ_fluid × V_submerged × g. For a fully submerged rigid object, V_submerged = V_object (constant, regardless of depth). The pressure on the top face increases with depth; the pressure on the bottom face increases by the same amount; the difference (which gives buoyancy) stays constant. Only if the object compresses (like a gas-filled balloon) does the buoyancy change with depth."
- **Bridge text [P30]:** "Buoyancy = pressure_bottom × A − pressure_top × A = ρg(h_bottom − h_top)A = ρg × V_object. Once the object is fully submerged, h_bottom − h_top = object height = constant → buoyancy is constant."
- **Replacement text [P31]:** "F_buoy = ρ_fluid × V_submerged × g. For a rigid, fully submerged object, F_buoy is constant regardless of depth. Depth only matters for compressible objects (balloons, fish swim bladders)."
- **Discrimination pairs [P33]:**
  - Rigid steel cube at 1 m depth: F_buoy = ρ_water × V_cube × g ✓
  - Same cube at 10 m depth: F_buoy = same ρ_water × V_cube × g (unchanged) ✓
- **s6_path:** "Buoyancy is about how much fluid the object displaces — which equals its own volume for rigid objects. Going deeper doesn't make it displace more fluid."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Pressure at depth**
Prompt: "What is the gauge pressure at depth h = 3 m in water? What is the force on the top and bottom of a 0.1 m × 0.1 m block submerged with its top at 3 m and bottom at 3.1 m?"

- Pass: P_top = ρg×3 = 29 400 Pa; F_top = 294 N (down). P_bottom = ρg×3.1 = 30 380 Pa; F_bottom = 303.8 N (up). Net upward = 9.8 N.
- Fail → [P52]: "Buoyancy is the net upward pressure force. Let's confirm pressure-at-depth first." → Route to phys.mech.pressure-fluids.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — Archimedes in the bath**

> Archimedes stepped into a full bath and noticed water overflowed. He realised the volume of water that spilled out equalled the volume of his body submerged — and that the weight of that water equals the buoyant force pushing him up. He ran through the streets shouting "Eureka!" — "I found it!"

Reproduce: submerge a block in a measuring cylinder filled to the brim. Collect the overflow. Weigh the overflow. That weight equals the buoyant force. This is Archimedes' principle as an experiment.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Archimedes' Principle [C]**

The buoyant force on an object equals the weight of fluid displaced:
```
F_buoy = ρ_fluid × V_displaced × g
```

Derivation from pressure:
```
F_buoy = F_bottom − F_top
        = (P₀ + ρg h_bottom) A − (P₀ + ρg h_top) A
        = ρg (h_bottom − h_top) A
        = ρg × V_object    (for fully submerged rigid body)
```

**TA-2 — Floating, Sinking, and Neutral Buoyancy [C→P]**

Three cases:
```
F_buoy > W (i.e., ρ_fluid V > m): object accelerates upward → floats
F_buoy = W                       : neutral buoyancy (hovers at any depth)
F_buoy < W (i.e., ρ_fluid V < m): object accelerates downward → sinks
```

For a floating object (partial submersion):
```
F_buoy = W
ρ_fluid × V_submerged × g = m × g
V_submerged/V_total = ρ_object/ρ_fluid
```

Fraction submerged = density ratio. An iceberg (ρ_ice ≈ 917 kg/m³) in water (ρ ≈ 1025 kg/m³): fraction submerged = 917/1025 ≈ 89.5% (89.5% below surface).

**TA-3 — Apparent Weight [C→P]**

The apparent weight of an object submerged in fluid:
```
W_apparent = W_actual − F_buoy = mg − ρ_fluid V g
```

If object fully submerged:
```
W_apparent = (ρ_object − ρ_fluid) × V × g
```

If ρ_object > ρ_fluid: W_apparent > 0 (feels lighter but still sinks)
If ρ_object = ρ_fluid: W_apparent = 0 (neutral buoyancy)
If ρ_object < ρ_fluid: W_apparent < 0 (rises — floats)

Applications: weighing gold in water (measure V from Archimedes' method; ρ = m/V to detect fake gold).

**TA-4 — Buoyancy in Gases [P]**

F_buoy applies to any fluid — including air. A helium balloon:
```
F_buoy = ρ_air × V × g
W_balloon = (ρ_He × V + m_envelope) × g

Float when F_buoy > W → ρ_air × V > ρ_He × V + m_envelope
```

At sea level, ρ_air = 1.225 kg/m³, ρ_He = 0.164 kg/m³ — difference = 1.06 kg/m³. One cubic metre of helium lifts ~1.06 kg of payload (minus envelope mass).

Hot air balloon: heating air reduces its density → ρ_hot < ρ_cold → buoyancy increases.

**TA-5 — Hydrometer and Density Measurement [P]**

A hydrometer floats at different depths in different liquids:
```
F_buoy = W → ρ_liquid × V_submerged = m_hydrometer
V_submerged = m/ρ_liquid → deeper in denser liquid? No: deeper in less dense liquid
```

Less dense liquid → need more V_submerged → sinks lower. More dense → floats higher.

Uses: measuring alcohol content (density of ethanol < density of water), battery acid concentration, salinity.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — buoyant force)**

> A 0.5 kg solid aluminium block (ρ_Al = 2700 kg/m³) is fully submerged in water. Find: (a) volume, (b) buoyant force, (c) apparent weight.

```
(a) V = m/ρ = 0.5/2700 = 1.85 × 10⁻⁴ m³

(b) F_buoy = ρ_water × V × g = 1000 × 1.85 × 10⁻⁴ × 9.8 = 1.81 N

(c) W_actual = 0.5 × 9.8 = 4.9 N
    W_apparent = 4.9 − 1.81 = 3.09 N
```

**WE-2 (Intermediate — floating fraction)**

> A wooden log (ρ = 700 kg/m³) floats in seawater (ρ = 1025 kg/m³). What fraction is submerged?

```
fraction = ρ_wood/ρ_seawater = 700/1025 = 0.683 = 68.3% submerged
```

**WE-3 (Advanced — helium balloon payload)**

> A spherical helium balloon has radius 0.5 m. The rubber envelope has mass 0.1 kg. What maximum payload can it lift? (ρ_air = 1.225 kg/m³, ρ_He = 0.164 kg/m³)

```
V = (4/3)π(0.5)³ = 0.5236 m³

F_buoy = ρ_air × V × g = 1.225 × 0.5236 × 9.8 = 6.285 N

W_He = ρ_He × V × g = 0.164 × 0.5236 × 9.8 = 0.841 N
W_envelope = 0.1 × 9.8 = 0.98 N

Net upward force = F_buoy − W_He − W_envelope = 6.285 − 0.841 − 0.98 = 4.464 N

Maximum payload mass = 4.464/9.8 = 0.456 kg ≈ 456 g
```

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Float or sink?**
"An object has mass 2 kg and volume 2.5 × 10⁻³ m³. Does it float or sink in water? In oil (ρ_oil = 800 kg/m³)?"

*Target:* ρ_object = 2/2.5×10⁻³ = 800 kg/m³. In water (1000 kg/m³): floats (ρ_obj < ρ_fluid). In oil (800 kg/m³): ρ_obj = ρ_oil → neutral buoyancy. On the water/oil interface, it sits at the boundary.

**MP-2 [P36] — Apparent weight**
"A 5 kg stone is weighed using a spring balance while submerged in water. The balance reads 31.4 N. What is the stone's density?"

*Target:* W_actual = 5×9.8 = 49 N; F_buoy = 49 − 31.4 = 17.6 N; V = F_buoy/(ρ_water×g) = 17.6/(1000×9.8) = 1.796×10⁻³ m³; ρ_stone = m/V = 5/1.796×10⁻³ = 2784 kg/m³ (close to granite).

**MP-3 [P36] — Iceberg**
"Ice density = 917 kg/m³, seawater density = 1025 kg/m³. What fraction of an iceberg is above the surface?"

*Target:* Fraction submerged = 917/1025 = 0.895 → fraction above = 1 − 0.895 = 10.5% above surface.

**MP-4 [P36] — Depth independence**
"A 1 kg steel cube (V = 128 cm³ = 1.28 × 10⁻⁴ m³) is at 5 m depth, then lowered to 20 m depth. Compare F_buoy at both depths."

*Target:* F_buoy = ρ_water × V × g = 1000 × 1.28×10⁻⁴ × 9.8 = 1.25 N at BOTH depths (rigid body, constant V → constant F_buoy). Depth doesn't matter.

**MP-5 [P36] — Synthesis: ship loading**
"A rectangular steel ship hull (L=50 m, W=10 m, originally 1 m deep draft) is loaded with cargo. If the loaded ship has total mass 1,200,000 kg, what is the new draft (depth of hull below waterline)?"

*Target:* F_buoy = weight → ρ_water × L × W × d × g = Mg; d = M/(ρ_water × L × W) = 1.2×10⁶/(1000×50×10) = 2.4 m.

---

## Component 7 — Session Architecture

```
[P01] Session open — Archimedes bath story
  ↓
[P41] PD-1 (pressure at depth; net force on top vs bottom face)
  ↓ PASS
[P06] Anchor: overflow experiment → F_buoy = weight of displaced fluid
  ↓
TA-1: F_buoy = ρ_fluid × V_displaced × g (derive from pressure) [C]
  ↓
TA-2: Float/sink/neutral; fraction submerged = ρ_obj/ρ_fluid [C→P]
  ↓
[P28] Conflict: "heavier object sinks" → MC-BUOYANCY-WEIGHT (ship example)
  ↓
WE-1: Aluminium block — buoyant force and apparent weight
  ↓
[P51] Check-in MP-1 (float or sink? density comparison)
  ↓ monitor
TA-3: Apparent weight; W_apparent = W_actual − F_buoy [C→P]
  ↓
WE-2 → WE-3 (floating fraction; helium balloon payload)
  ↓
TA-4: Buoyancy in gases; hot air balloon [P]
  ↓
TA-5: Hydrometer; density measurement [P]
  ↓
[P36] MP-2 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "A 0.5 kg object floats in water with 60% submerged. What is its density?"
[P68]; [P85]; [P89] 1/3/7 days; [P91] 80% gate
```

**Protocol routing:** S0: full CPA; run the overflow experiment physically or with a simulation; S1: knows F = ρVg but applies it only to sinking objects → MC-BUOYANCY-WEIGHT; S4: PD-1 fail → pressure-fluids; S6: [F] — "One equation: F_buoy = ρ_fluid × V_submerged × g. Compare this to mg to determine float/sink"; S7: open with MP-5 (ship draft calculation — connects buoyancy to real engineering).

---

## Component 8 — Adaptive Flags

- **Density of fluid, not object**: the buoyant force formula contains ρ_fluid, not ρ_object. Students repeatedly substitute the wrong density. Always label clearly.
- **Partial vs. full submersion**: for floating objects, V_displaced < V_object (only the submerged fraction counts). For fully submerged objects, V_displaced = V_object. The calculation is different — confirm which situation applies before substituting.
- **Apparent weight sign**: if ρ_object < ρ_fluid, apparent weight = negative → object accelerates upward. In practice, for objects that "float up" we say F_net = F_buoy − mg upward.
- **Hydrometer reversal** (TA-5): less dense liquid → sinks lower (more V needed to displace enough fluid weight). This is counter to naive expectation ("denser liquid → sink more"). Spend explicit time on this reversal.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.mech.buoyancy |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.mech.pressure-fluids ✓ |
| V-3 | difficulty label matches KG | PASS — developing (3) |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 3h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-BUOYANCY-WEIGHT, MC-BUOYANCY-PROPORTIONAL-TO-DEPTH |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (pressure-fluids; net upward force) |
| V-10 | Concrete anchor present [P06] | PASS — Archimedes overflow experiment |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with full CPA (difficulty 3) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — ρ_fluid vs ρ_object, partial vs. full submersion, apparent weight sign, hydrometer reversal |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
