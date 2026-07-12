# Teaching Blueprint — phys.mech.viscosity

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.mech.viscosity
name: Viscosity
domain: mechanics
difficulty:
  label: advanced
  number: 5
bloom: apply
prerequisites:
  - phys.mech.bernoulli
mastery_threshold: 0.80
estimated_hours: 5
cross_links:
  - phys.mech.surface-tension
  - phys.mech.pressure-fluids
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 5 → C with accelerated P track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-VISCOSITY-IS-DENSITY
- **Trigger signal:** Student says "honey is more viscous because it's denser" or confuses viscosity (resistance to flow) with density (mass per volume).
- **Conflict evidence [P28]:** "Viscosity and density are independent fluid properties. Mercury has density ≈ 13 600 kg/m³ — 13× denser than water — but its dynamic viscosity η ≈ 1.5 × 10⁻³ Pa·s is only slightly higher than water's (η_water ≈ 1.0 × 10⁻³ Pa·s). Honey has density ≈ 1400 kg/m³ — only 1.4× water — but viscosity ≈ 2–10 Pa·s, which is 2000–10 000× water's viscosity. Blood (η ≈ 3–4 × 10⁻³ Pa·s) is denser than water yet only ~3× more viscous. Density = mass per unit volume. Viscosity = resistance to shear deformation (internal friction between fluid layers). They are independently measurable, dimensionally different quantities."
- **Bridge text [P30]:** "Viscosity η (Pa·s = kg/(m·s)) measures how hard you must push one fluid layer past another. Density ρ (kg/m³) measures how much mass per unit volume. A dense fluid can flow freely (mercury); a light fluid can be highly viscous (some polymer solutions). The two properties have different molecular origins: density depends on molecular mass and packing; viscosity depends on intermolecular forces and chain entanglement."
- **Replacement text [P31]:** "Dynamic viscosity η = shear stress / shear rate = τ / (dv/dy) in Pa·s. Density ρ = m/V in kg/m³. Completely different dimensions and properties. Kinematic viscosity ν = η/ρ (m²/s) combines both — but that's a derived ratio, not an equivalence."
- **Discrimination pairs [P33]:**
  - Mercury: ρ = 13 600 kg/m³ (very dense), η ≈ 1.5 × 10⁻³ Pa·s (low viscosity — flows easily) ✓
  - Honey: ρ ≈ 1400 kg/m³ (moderately dense), η ≈ 5 Pa·s (very high viscosity — flows slowly) ✓
- **s6_path:** "Density is about how much. Viscosity is about how reluctantly. They're asking completely different questions about the fluid."

---

### MC-VISCOSITY-CONSTANT-TEMPERATURE
- **Trigger signal:** Student treats viscosity as a fixed material constant without accounting for temperature, or says "the viscosity of water is always 10⁻³ Pa·s."
- **Conflict evidence [P28]:** "Viscosity is strongly temperature-dependent — one of the most temperature-sensitive properties of common fluids. Water: η = 1.79 × 10⁻³ Pa·s at 0°C, 1.00 × 10⁻³ at 20°C, 0.28 × 10⁻³ at 100°C — a 6× decrease over 100°C. Engine oil: η changes by a factor of ~1000 between winter cold-start and operating temperature, which is why the SAE 10W-40 rating system exists. In liquids, viscosity decreases with temperature (thermal agitation breaks intermolecular bonds, allowing layers to slide). In gases, viscosity increases with temperature (more molecular collisions carry momentum between layers — opposite to liquids). This distinction matters for engine design, polymer processing, and blood flow."
- **Bridge text [P30]:** "Viscosity stated without a temperature is incomplete. For liquids: η ≈ A × e^(E_a/kT) (Arrhenius form) — strong decrease with T. For gases: η ∝ T^(1/2) (Chapman-Enskog) — weak increase with T. Always check what temperature a tabulated viscosity value refers to."
- **Replacement text [P31]:** "Dynamic viscosity η depends on temperature. For liquids: η decreases strongly with T. For gases: η increases weakly with T. When using η in calculations, verify the temperature. In problems: use the given value at the stated temperature."
- **Discrimination pairs [P33]:**
  - Warm honey (40°C): η ≈ 0.1 Pa·s (pours easily) vs. cold honey (10°C): η ≈ 100 Pa·s (barely moves) ✓
  - Air at 20°C: η = 1.81×10⁻⁵ Pa·s; Air at 400°C: η ≈ 3.3×10⁻⁵ Pa·s (increases ~80%) ✓
- **s6_path:** "This is why mechanics drain cold engine oil before adding fresh oil — cold oil is extremely viscous, and changing it warm means it flows freely out. Temperature is always part of the viscosity specification."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Fluid flow concepts from Bernoulli**
Prompt: "Water flows through a pipe at 2 m/s and the pressure is 100 kPa. A valve partially closes, slowing flow to 0.5 m/s. What happens to pressure? (Assume horizontal, inviscid flow.)"
- Pass: Bernoulli: v decreases → KE decreases → P increases. P₂ = 100 000 + ½×1000×(4−0.25) = 100 000 + 1875 = 101 875 Pa.
- Fail → [P52]: "Bernoulli is the key prerequisite — P + ½ρv² = const for ideal flow. We need that foundation before adding viscosity (the 'non-ideal' correction)." Route to phys.mech.bernoulli.

**PD-2 [P41] — Shear stress concept**
Prompt: "A fluid layer moves at 0.5 m/s while a layer 1 mm away moves at 0.3 m/s. What is the velocity gradient (dv/dy) between these layers?"
- Pass: dv/dy = (0.5 − 0.3)/0.001 = 200 s⁻¹ (velocity gradient = shear rate).
- Fail → [P52]: "Velocity gradient = change in speed per unit distance between layers. Like a slope on a speed-vs-distance graph. This is the 'shear rate' that multiplied by η gives shear stress." Brief review, proceed.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — honey vs. water; Stokes's law with a falling ball**

> Pour honey into a jar and tip it — it flows slowly, resisting the pour. Tilt water at the same angle — it sloshes freely. The honey resists flow because its molecules (large chains of sugars) drag on each other as they move past. That internal friction between fluid layers is viscosity.

Second anchor: drop a small steel ball bearing into a tall cylinder of glycerol. It falls slowly at constant speed — not accelerating. The viscous drag force exactly equals gravity plus buoyancy. Time the ball, measure the radius and glycerol density, and calculate η from Stokes's law. This is the classic Millikan-style viscometry by sedimentation.

Third anchor — the Poiseuille channel: take two glass plates, sandwich a thin oil film between them, and push one plate at constant speed. The force required to slide the plate is proportional to plate area, sliding speed, and inversely proportional to gap width. This is Newton's law of viscosity measured directly.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Newton's Law of Viscosity [C]**

For a Newtonian fluid, shear stress τ is proportional to shear rate (velocity gradient):

```
τ = η × (dv/dy)
```

Where:
- τ = shear stress (Pa = N/m²) — tangential force per unit area between layers
- η = dynamic viscosity (Pa·s = N·s/m² = kg/(m·s)) — the proportionality constant
- dv/dy = velocity gradient perpendicular to flow (s⁻¹) — how fast velocity changes across layers

Physical picture: fast-moving layer drags slower layer (and is slowed by it). The drag is proportional to the speed difference per unit gap and to the area in contact.

**Newtonian fluids**: τ ∝ dv/dy (straight line through origin on τ vs. dv/dy graph). Examples: water, air, most oils, glycerol.
**Non-Newtonian fluids**: τ vs. dv/dy is non-linear. Examples:
- Shear-thinning (pseudoplastic): blood, ketchup, paint — become less viscous when stirred
- Shear-thickening (dilatant): cornstarch suspension — become more viscous when stirred
- Plastic (Bingham): toothpaste, mayonnaise — require threshold stress before flowing

**TA-2 — Stokes's Law and Terminal Velocity [C→P]**

A sphere of radius r moving at speed v through a fluid of viscosity η experiences a viscous drag force:

```
F_drag = 6πηrv     (Stokes's law)
```

Valid for low Reynolds number (Re ≪ 1) — slow speeds, small particles, high viscosity.

**Terminal velocity**: sphere falling under gravity in fluid. At terminal velocity, net force = 0:

```
Weight − Buoyancy − Drag = 0

(4/3)πr³ρ_s g − (4/3)πr³ρ_f g − 6πηrv_t = 0

∴  v_t = 2r²(ρ_s − ρ_f)g / (9η)
```

Applications: sedimentation rate of particles, blood cell settling (ESR test), raindrop size, oil droplet fall in Millikan experiment.

**TA-3 — Poiseuille's Law: Flow in a Pipe [C→P]**

For viscous flow through a cylindrical pipe (long, straight, laminar):

```
Q = πr⁴ΔP / (8ηL)      (Poiseuille's law)
```

Where:
- Q = volume flow rate (m³/s)
- r = pipe radius (m)
- ΔP = pressure difference across pipe length L (Pa)
- η = dynamic viscosity (Pa·s)
- L = pipe length (m)

Critical feature: Q ∝ r⁴ — halving the radius reduces flow rate by 16×. This is the dominant factor in blood flow restriction: a 50% reduction in arterial radius reduces blood flow by 1/2⁴ = 1/16.

Velocity profile: parabolic — maximum at centreline (v_max = r²ΔP/(4ηL)), zero at walls (no-slip condition).

**TA-4 — Reynolds Number and Transition to Turbulence [P]**

The Reynolds number Re predicts whether flow is laminar (smooth, parallel layers) or turbulent (chaotic):

```
Re = ρvL / η = vL / ν
```

Where:
- ρ = fluid density (kg/m³)
- v = characteristic flow speed (m/s)
- L = characteristic length (pipe diameter D, or sphere diameter 2r) (m)
- η = dynamic viscosity (Pa·s)
- ν = η/ρ = kinematic viscosity (m²/s)

Regime boundaries (for pipe flow):
- Re < 2300: laminar — Poiseuille's law applies
- 2300 < Re < 4000: transition
- Re > 4000: turbulent — drag increases; Poiseuille's law fails

Physical meaning of Re: Re = (inertial forces)/(viscous forces). At low Re, viscosity dominates and smooths disturbances; at high Re, inertia dominates and small disturbances grow into turbulence.

**TA-5 — Viscometry and Practical Measurements [P]**

**Falling-sphere viscometer** (Stokes method): measure r (ball radius), ρ_s (ball density), ρ_f (fluid density), v_t (terminal velocity) → η = 2r²(ρ_s − ρ_f)g / (9v_t). Used in labs for transparent viscous fluids.

**Ostwald viscometer**: measure time t for fluid to drain between two marks in a capillary. η/η_ref = (ρt)/(ρ_ref × t_ref) — compare unknown fluid to reference (often water) at same temperature. Used in industrial quality control.

**Medical application — ESR** (Erythrocyte Sedimentation Rate): red blood cell settling rate in an anticoagulated blood sample over 1 hour. Inflammation increases fibrinogen → increases viscosity → raises settling rate. Normal: < 20 mm/hr (men), < 30 mm/hr (women). Elevated ESR: infection, inflammation, cancer, autoimmune disease. A global marker of illness, not a diagnostic.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — shear stress and viscosity)**

> Two parallel plates are separated by 2 mm of oil (η = 0.15 Pa·s). The lower plate is stationary; the upper plate moves at 0.4 m/s. Calculate: (a) the velocity gradient, (b) the shear stress in the oil, (c) the force on the upper plate if it has area 0.1 m².

```
(a) dv/dy = 0.4 / 0.002 = 200 s⁻¹

(b) τ = η × (dv/dy) = 0.15 × 200 = 30 Pa

(c) F = τ × A = 30 × 0.1 = 3 N
```

**WE-2 (Intermediate — terminal velocity)**

> A steel ball bearing (r = 1.5 mm, ρ_steel = 7800 kg/m³) falls through glycerol (η = 1.49 Pa·s, ρ_glycerol = 1260 kg/m³). Find its terminal velocity.

```
v_t = 2r²(ρ_s − ρ_f)g / (9η)
    = 2 × (1.5×10⁻³)² × (7800 − 1260) × 9.8 / (9 × 1.49)
    = 2 × 2.25×10⁻⁶ × 6540 × 9.8 / 13.41
    = 2 × 2.25×10⁻⁶ × 64 092 / 13.41
    = 2 × 0.1443 / 13.41
    = 0.2157 m / (... let me recalculate cleanly)

Numerator: 2 × (2.25×10⁻⁶) × 6540 × 9.8 = 2 × 2.25×10⁻⁶ × 64092
         = 2 × 0.14421 = 0.28842
Denominator: 9 × 1.49 = 13.41

v_t = 0.28842 / 13.41 = 0.02151 m/s ≈ 21.5 mm/s
```

Check Re: Re = ρ_f × v_t × 2r / η = 1260 × 0.02151 × 0.003 / 1.49 = 0.0546 ≪ 1 ✓ (Stokes's law valid)

**WE-3 (Advanced — Poiseuille's law and artery stenosis)**

> Blood (η = 3.5 × 10⁻³ Pa·s) flows through an artery of radius 3 mm under a pressure difference of 400 Pa over a 0.1 m segment. (a) Find the flow rate Q. (b) If arterial plaque reduces the radius to 2.4 mm (80% of original), by what factor does Q decrease?

```
(a) Q = πr⁴ΔP / (8ηL) = π × (3×10⁻³)⁴ × 400 / (8 × 3.5×10⁻³ × 0.1)
      = π × 8.1×10⁻¹¹ × 400 / (2.8×10⁻³)
      = π × 3.24×10⁻⁸ / 2.8×10⁻³
      = π × 1.157×10⁻⁵
      = 3.63×10⁻⁵ m³/s ≈ 36.3 mL/s

(b) Q ∝ r⁴: Q_new/Q_old = (2.4/3.0)⁴ = (0.8)⁴ = 0.4096

Flow drops to ~41% of original — a 20% radius reduction causes nearly 60% reduction in blood flow.
```

This is why moderate arterial stenosis can critically reduce organ perfusion.

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Newton's law of viscosity**
"A fluid layer at y = 0 moves at 0 m/s; at y = 5 mm it moves at 1.5 m/s; at y = 10 mm it moves at 3.0 m/s (linear profile). The dynamic viscosity is 0.04 Pa·s. Find: (a) the velocity gradient, (b) the shear stress, (c) the force on a plate of area 0.025 m² at y = 10 mm."

*Target:* (a) dv/dy = 3.0/0.01 = 300 s⁻¹. (b) τ = 0.04 × 300 = 12 Pa. (c) F = 12 × 0.025 = 0.30 N.

**MP-2 [P36] — Stokes's law reasoning**
"A pollen grain (r = 10 μm, ρ = 1100 kg/m³) settles in air (η_air = 1.8 × 10⁻⁵ Pa·s, ρ_air = 1.2 kg/m³). Find its terminal velocity. Comment on whether Stokes's law is likely to be valid."

*Target:* v_t = 2×(10⁻⁵)²×(1100−1.2)×9.8/(9×1.8×10⁻⁵) = 2×10⁻¹⁰×1098.8×9.8/(1.62×10⁻⁴) = 2.154×10⁻⁷/1.62×10⁻⁴ = 1.33×10⁻³ m/s ≈ 1.3 mm/s. Re = 1.2×1.33×10⁻³×20×10⁻⁶/(1.8×10⁻⁵) = 1.77×10⁻³ ≪ 1 — Stokes's law valid. This is why pollen can stay airborne for hours in still air.

**MP-3 [P36] — Poiseuille in a clinical context**
"An IV drip delivers saline (η = 1.0 × 10⁻³ Pa·s) through a needle of radius 0.4 mm and length 5 cm. The pressure head is 200 Pa. (a) Find the flow rate. (b) If a narrower needle (r = 0.3 mm) is used, how does the flow rate change? What pressure would be needed to restore the original flow rate?"

*Target:* (a) Q = π×(4×10⁻⁴)⁴×200/(8×10⁻³×0.05) = π×2.56×10⁻¹⁴×200/4×10⁻⁴ = π×1.28×10⁻⁸ = 4.02×10⁻⁸ m³/s. (b) Q ∝ r⁴: new Q = Q_old×(0.3/0.4)⁴ = Q_old×0.316. Flow drops to 31.6%. To restore original Q with r=0.3 mm: need P×(0.3)⁴ = P_old×(0.4)⁴ → P = 200×(0.4/0.3)⁴ = 200×3.16 = 633 Pa.

**MP-4 [P36] — Reynolds number and flow regime**
"Water (η = 1.0 × 10⁻³ Pa·s, ρ = 1000 kg/m³) flows at 0.5 m/s through a pipe of diameter 5 mm. (a) Calculate Re. (b) Is the flow laminar or turbulent? (c) At what speed would turbulence begin?"

*Target:* (a) Re = ρvD/η = 1000×0.5×0.005/0.001 = 2500. (b) Re = 2500 → transition zone (borderline laminar/turbulent; many texts would call this transitional). (c) Turbulence starts at Re ≈ 2300 (conservative): v_crit = 2300×η/(ρD) = 2300×10⁻³/(1000×0.005) = 0.46 m/s. So at 0.5 m/s the flow is likely already at or past the laminar→turbulent transition.

**MP-5 [P36] — Synthesis: ESR and blood viscosity**
"An ESR test: a red blood cell (r = 4 μm, ρ_RBC = 1096 kg/m³) settles in plasma (η = 1.2 × 10⁻³ Pa·s, ρ_plasma = 1025 kg/m³). (a) Use Stokes's law to estimate the terminal settling speed. (b) Over 1 hour, how far does it settle? (c) In inflammation, fibrinogen causes RBCs to stack (rouleaux); effective r becomes ~20 μm. How does the settling speed change?"

*Target:* (a) v_t = 2×(4×10⁻⁶)²×(1096−1025)×9.8/(9×1.2×10⁻³) = 2×1.6×10⁻¹¹×71×9.8/(1.08×10⁻²) = 2.23×10⁻⁸/1.08×10⁻² = 2.07×10⁻⁶ m/s ≈ 2.1 μm/s. (b) In 1 hour (3600 s): distance = 2.07×10⁻⁶×3600 = 7.4×10⁻³ m = 7.4 mm. (c) r × 5 → v_t × 25 (since v ∝ r²) → v_t_inflamed = 25 × 2.1 μm/s = 52.5 μm/s → distance = 52.5×10⁻⁶×3600 = 189 mm in 1 hour. Normal ESR < 20 mm/hr; inflammation → very elevated ESR (here ~189 mm/hr) — the r² dependence is the key physics of the ESR test.

---

## Component 7 — Session Architecture

```
[P01] Session open — honey vs. water pour; ball bearing in glycerol demonstration
  ↓
[P41] PD-1 (Bernoulli and fluid flow readiness)
  ↓ PASS
[P41] PD-2 (velocity gradient / shear rate concept)
  ↓ PASS
[P06] Anchor: honey pour; ball in glycerol; parallel plate drag
  ↓
TA-1: Newton's law of viscosity τ = η(dv/dy); Newtonian vs. non-Newtonian [C]
  ↓
[P28] Conflict: "viscosity = density" → MC-VISCOSITY-IS-DENSITY
  ↓
WE-1: Parallel plate — shear stress and force
  ↓
[P51] Check-in MP-1 (velocity gradient, shear stress, plate force)
  ↓ monitor
TA-2: Stokes's law F = 6πηrv; terminal velocity derivation [C→P]
  ↓
WE-2: Ball bearing terminal velocity in glycerol
  ↓
TA-3: Poiseuille's law Q = πr⁴ΔP/(8ηL); parabolic profile; r⁴ sensitivity [C→P]
  ↓
[P28] Conflict: "viscosity is constant with temperature" → MC-VISCOSITY-CONSTANT-TEMPERATURE
  ↓
WE-3: Poiseuille — artery stenosis and flow reduction
  ↓
TA-4: Reynolds number Re = ρvL/η; laminar vs. turbulent regimes [P]
  ↓
TA-5: Viscometry methods; ESR clinical application [P]
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "A ball of radius r and density ρ_s falls at terminal velocity in oil of viscosity η. Write the formula for v_t."
[P68]; [P85]; [P89] 1/3/7 days; [P91] 80% gate
```

**Protocol routing:** S0: full CPA — honey pour + ball-in-glycerol before any formula; S1: knows τ=η(dv/dy) but treats η as constant and independent of temperature → MC-VISCOSITY-CONSTANT-TEMPERATURE; S4: PD-1 fail → phys.mech.bernoulli; S6: [F] — "One defining equation: τ = η × (dv/dy). Viscosity is the ratio — how much stress per unit shear rate. Everything else (Stokes, Poiseuille, Re) is applying that definition to specific geometries"; S7: open with MP-5 (ESR calculation — requires combining Stokes, r² scaling, and clinical interpretation; catches students who think they know Stokes but can't apply it to unfamiliar geometry).

---

## Component 8 — Adaptive Flags

- **Dynamic vs. kinematic viscosity**: dynamic η (Pa·s) is what Newton's law uses — it is the fundamental quantity. Kinematic ν = η/ρ (m²/s) is convenient in fluid dynamics (cancels density in Reynolds number and Navier-Stokes). Students confuse them; always specify which is given.
- **Stokes's law validity**: ONLY for Re ≪ 1 (approximately < 0.1 for < 1% error). Always compute Re after finding v_t to check validity. Rapid flows, large objects, or low viscosity fluids fall outside Stokes's range — use drag coefficient C_D formulation instead.
- **Poiseuille vs. Bernoulli**: Bernoulli is for ideal (non-viscous) flow; Poiseuille is for viscous laminar flow in pipes. They are complementary, not competing. For a real pipe system: both the Bernoulli pressure drop (from elevation + speed changes) and the Poiseuille friction loss (from viscosity) act together (extended Bernoulli with head loss terms). In this blueprint, keep the distinction clean: Poiseuille applies only when viscous losses dominate (long narrow pipes, slow flow, high η).
- **Non-Newtonian fluids**: blood is non-Newtonian (shear-thinning at low shear rates due to rouleaux formation; approximately Newtonian at the high shear rates in large arteries). The Poiseuille-ESR worked examples use Newtonian approximations — flag this if biomedical students probe it.
- **r⁴ sensitivity pedagogy**: the r⁴ dependence in Poiseuille's law is the single most important quantitative result for medical students. Spending extra time on MP-3 and WE-3 pays dividends — the clinical implications of small radius changes are profound and motivating.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.mech.viscosity |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.mech.bernoulli ✓ |
| V-3 | difficulty label matches KG | PASS — advanced (5) |
| V-4 | bloom level matches KG | PASS — apply |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 5h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-VISCOSITY-IS-DENSITY, MC-VISCOSITY-CONSTANT-TEMPERATURE |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (bernoulli; fluid flow), PD-2 (velocity gradient / shear rate) |
| V-10 | Concrete anchor present [P06] | PASS — honey pour; ball in glycerol; parallel plate drag |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with accelerated P track (difficulty 5) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — dynamic vs. kinematic viscosity, Stokes validity check, Poiseuille vs. Bernoulli scope, non-Newtonian blood caveat, r⁴ pedagogy priority |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
