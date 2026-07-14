# Teaching Blueprint — phys.mech.surface-tension

---

## Component 0 — Concept Identity & Routing

```yaml
concept_id: phys.mech.surface-tension
name: Surface Tension
domain: mechanics
difficulty:
  label: proficient
  number: 4
bloom: understand
prerequisites:
  - phys.mech.pressure-fluids
mastery_threshold: 0.80
estimated_hours: 4
cross_links:
  - phys.mech.buoyancy
  - phys.mech.bernoulli
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY / PACKAGE_READY
```

---

## Component 1 — Misconception Register

### MC-SURFACE-TENSION-IS-PRESSURE
- **Trigger signal:** Student says "surface tension is the pressure on the surface" or confuses surface tension (force per unit length, N/m) with pressure (force per unit area, N/m²).
- **Conflict evidence [P28]:** "Surface tension γ is defined as the force per unit length acting along a liquid surface (or equivalently, energy per unit area — J/m² = N/m). Pressure is force per unit area (N/m²). They are dimensionally different quantities. A soap bubble has both: surface tension γ creates an excess pressure inside the bubble, given by ΔP = 4γ/r (factor of 4 because the bubble has two surfaces — inner and outer). A spherical water drop has only one surface: ΔP = 2γ/r. The pressure difference is caused by surface tension; the two are related but not the same."
- **Bridge text [P30]:** "Surface tension γ (N/m) is the inward pull per unit length at the surface — an energy cost to creating new surface. It creates a pressure difference ΔP across a curved interface. The smaller the radius r, the greater the pressure inside: ΔP = 2γ/r (drop) or 4γ/r (bubble). Pressure and surface tension are linked through curvature — the Young-Laplace equation."
- **Replacement text [P31]:** "Surface tension γ = F/L (N/m) or γ = W/A (J/m²) — not pressure. It generates excess pressure ΔP = 2γ/r (drop) or 4γ/r (bubble). Units: γ in N/m; ΔP in Pa = N/m². They are related through radius of curvature."
- **Discrimination pairs [P33]:**
  - Water drop radius 1 mm, γ = 0.072 N/m: ΔP = 2×0.072/0.001 = 144 Pa ✓ (not 0.072 N/m²)
  - Soap bubble same radius: ΔP = 4×0.072/0.001 = 288 Pa (two surfaces) ✓
- **s6_path:** "Two different units, two different concepts. γ tells you how hard the surface pulls inward per unit length — that pull then creates a pressure difference through curvature."

---

### MC-SURFACE-TENSION-ACTS-OUTWARD
- **Trigger signal:** Student says "surface tension stretches the liquid outward" or draws surface tension arrows pointing away from the surface.
- **Conflict evidence [P28]:** "Surface tension acts tangentially along the surface — not outward or inward through the bulk. At any line on the surface, each side pulls the other along the surface with force γ per unit length. The net effect for a curved surface is an inward normal force (pressure difference), but the surface tension force itself is along (tangent to) the surface. This is why a needle rests on water: the surface bends downward under the needle's weight, and the upward component of the tangential surface tension force supports the needle. The surface is not stretching outward — it is pulling along itself, and the curvature converts this tangential pull into a net upward force."
- **Bridge text [P30]:** "Surface tension acts along the surface, like the tension in a stretched membrane or a soap film. At a curved surface, the tangential tension has a component perpendicular to the surface — this is what creates pressure difference ΔP = 2γ/r. For a flat surface: no curvature → no pressure difference. The direction of action is tangential; the effective normal force is a geometric consequence of curvature."
- **Replacement text [P31]:** "Surface tension acts tangentially along the liquid surface (parallel to it). At curved interfaces, the geometry of the tangential tension produces a net normal (pressure) effect: ΔP = 2γ/r. Surface tension does NOT pull the liquid outward — it pulls along the surface and compresses curved interfaces inward."
- **Discrimination pairs [P33]:**
  - Flat water surface: γ acts horizontally (tangentially); no net vertical force on bulk liquid ✓
  - Spherical drop: γ acts along surface (tangentially); inward normal component → excess internal pressure ✓
- **s6_path:** "Think of a soap film stretched across a wire frame. The tension is in the film, parallel to its surface. If you curve the frame, the tension develops a component perpendicular to the film — that's the curvature pressure."

---

## Component 2 — Prerequisite Diagnostic Block

**PD-1 [P41] — Pressure and curved surfaces**
Prompt: "A spherical bubble of radius 2 cm is formed in water. If the surface tension of water is 0.072 N/m, what is the excess pressure inside compared to the water outside? (Just set up the formula — calculation optional.)"
- Pass: ΔP = 2γ/r (recognises excess pressure formula or correctly derives it from force balance on hemisphere). Calculation: 2×0.072/0.02 = 7.2 Pa.
- Fail → [P52]: "Pressure is force per area. For a curved surface under tension, we can find the pressure by balancing forces on a cross-section — the same method used to derive P = ρgh. Let's build from P = F/A first." Review pressure concepts, then proceed.

---

## Component 3 — Concrete Anchor [P06]

**Anchor scene — the floating needle and the soap film**

> Place a dry steel sewing needle carefully on the surface of still water. Despite being much denser than water (ρ_steel ≈ 7800 kg/m³), the needle rests on the surface. Look closely: the surface bows downward under the needle, forming a small depression. The water surface acts like a taut elastic membrane, its tension supporting the needle. This is surface tension.

Second anchor: dip a wire loop into soapy water. A soap film forms across the loop — a two-dimensional membrane under tension. If you puncture the film on one side of a thread stretched across it, the thread snaps taut toward the unpunctured side. The tension is real and measurable.

Third anchor: watch water droplets form on a waxy leaf (lotus effect) or on a waterproofed jacket. The droplets are nearly spherical — the surface tension minimises surface area for a given volume, and a sphere has the minimum surface area for a given volume. Surface tension is literally a tendency to minimise surface area.

---

## Component 4 — Conceptual Development Sequence

**TA-1 — Surface Tension Definition [C]**

Surface tension γ: the force per unit length acting along a liquid surface tangentially.

```
γ = F/L     (N/m)
```

Equivalently: γ = energy per unit area (J/m²) — the energy required to create 1 m² of new liquid surface.

Origin: molecules in the bulk liquid are attracted from all sides. A molecule at the surface has no neighbours above — net inward force. Surface molecules are in a higher energy state. Minimising surface area minimises energy. Hence: liquid surfaces tend to contract (minimise area) → behave like a stretched membrane.

Values: water γ ≈ 0.072 N/m at 20°C; mercury γ ≈ 0.485 N/m; soap solution γ ≈ 0.025–0.040 N/m (surfactants reduce γ).

**TA-2 — Excess Pressure in Curved Surfaces [C→P]**

Consider a spherical liquid drop of radius r. Divide it at the equator: each hemisphere's rim has length 2πr, so the surface tension force pulling inward along the equatorial line is:

```
F_tension = γ × 2πr
```

This must balance the pressure force on the equatorial cross-section (area πr²):

```
ΔP × πr² = γ × 2πr

∴ ΔP = 2γ/r     (liquid drop — one surface)
```

For a soap bubble (two surfaces — inner wall and outer wall):

```
ΔP = 4γ/r       (soap bubble)
```

Key insight: smaller radius → larger excess pressure. This is why small bubbles have higher internal pressure than large bubbles (and why small bubbles merge into large ones when connected — the small one blows into the large one).

**TA-3 — Capillary Rise [C→P]**

Liquid rises in a narrow (capillary) tube when it wets the tube (contact angle θ < 90°). At equilibrium, the surface tension force pulling the liquid up equals the weight of the liquid column:

```
γ × 2πr × cos θ = ρ × g × h × πr²

h = 2γ cos θ / (ρgr)
```

Where:
- r = tube radius (m)
- θ = contact angle (liquid-solid-air angle)
- h = height of capillary rise (m)

For water in clean glass: θ ≈ 0° (cos θ = 1) → h = 2γ/(ρgr).

Key results:
- Smaller tube → greater rise (h ∝ 1/r)
- Larger γ → greater rise
- Liquid that does not wet (θ > 90°, e.g., mercury in glass): capillary depression (mercury falls below the outside level)

Applications: water rise in soil, sap in plant xylem, ink in paper, tears in the eye draining through lacrimal ducts.

**TA-4 — Contact Angle and Wetting [P]**

Contact angle θ: the angle between the liquid surface and the solid surface at the contact line.

- θ < 90°: liquid wets the solid (hydrophilic surface for water). Liquid spreads; meniscus curves upward (concave).
- θ > 90°: liquid does not wet (hydrophobic surface, e.g., mercury on glass). Liquid beads; meniscus curves downward (convex).
- θ = 0°: perfect wetting — liquid spreads completely (surfactants can achieve this).

Young's equation (for reference): γ_sv = γ_sl + γ_lv cos θ. (Not required for most A-level treatments; gives the physical basis of θ.)

Practical: waterproofing creates hydrophobic surfaces (θ ≈ 150° for lotus leaf — "superhydrophobic"). Detergents reduce γ and θ, allowing water to penetrate fabrics.

**TA-5 — Applications and Energy View [P]**

**Energy perspective:**
γ = dW/dA — work done per unit area to increase surface area.
- To blow a soap bubble of radius r: W = 4πr² × 2γ (factor of 4π for sphere area; factor of 2 for two surfaces).
- Surface energy drives soap bubble contraction, droplet sphericity, and capillary rise.

**Applications:**
- **Insects on water**: water strider legs spread the load across a large perimeter L; upward tension γL balances insect weight.
- **Alveoli in lungs**: surfactant (produced by cells) reduces γ from ~0.05 to ~0.005 N/m, preventing lung collapse at the end of each breath (otherwise ΔP = 2γ/r would collapse the tiny alveoli, radius ~0.1 mm).
- **Detergent action**: surfactants lower γ; allow water to wet and penetrate greasy surfaces.
- **Mercury thermometer**: mercury's high γ and non-wetting behaviour keep it beaded and readable; it does not creep up glass walls.

---

## Component 5 — Worked Examples

**WE-1 (Foundational — excess pressure)**

> A soap bubble has radius 3 cm. Surface tension of soap solution = 0.030 N/m. Calculate: (a) the excess pressure inside the bubble, (b) the total surface energy of the bubble.

```
(a) ΔP = 4γ/r = 4 × 0.030 / 0.03 = 4.0 Pa

(b) Surface area of bubble = 4πr² = 4π × (0.03)² = 1.131 × 10⁻² m²
    Two surfaces → total area = 2 × 1.131 × 10⁻² = 2.262 × 10⁻² m²
    Surface energy = γ × total area = 0.030 × 2.262 × 10⁻² = 6.79 × 10⁻⁴ J ≈ 0.68 mJ
```

**WE-2 (Intermediate — capillary rise)**

> Water (γ = 0.072 N/m, ρ = 1000 kg/m³, contact angle = 0°) rises in a glass capillary of diameter 0.4 mm. Calculate the height of capillary rise.

```
r = 0.2 mm = 2 × 10⁻⁴ m; cos 0° = 1

h = 2γ cos θ / (ρgr) = 2 × 0.072 × 1 / (1000 × 9.8 × 2×10⁻⁴)
  = 0.144 / 1.96 = 0.0735 m ≈ 7.4 cm
```

Such a narrow tube would show ~7.4 cm rise — easily observable.

**WE-3 (Advanced — needle floating; force balance)**

> A steel needle of length 4 cm and radius 0.5 mm rests horizontally on a water surface. γ_water = 0.072 N/m; ρ_steel = 7800 kg/m³. Show whether surface tension can support the needle. (Contact angle ≈ 0°; needle bows the surface so the tension acts at ~40° from horizontal.)

```
Mass of needle: m = ρ × π r² × L = 7800 × π × (5×10⁻⁴)² × 0.04
               = 7800 × 7.854×10⁻⁷ × 0.04 = 2.45 × 10⁻⁴ kg
Weight: W = mg = 2.45×10⁻⁴ × 9.8 = 2.40 × 10⁻³ N

Surface tension acts along both sides of the needle (two contact lines of length L):
F_tension = 2 × γ × L × sin(angle)  [upward component]
At angle 40°: F_up = 2 × 0.072 × 0.04 × sin40° = 2 × 0.072 × 0.04 × 0.643
            = 3.70 × 10⁻³ N

F_up = 3.70 × 10⁻³ N > W = 2.40 × 10⁻³ N → needle is supported ✓
```

---

## Component 6 — Mastery Probe Set

**MP-1 [P36] — Excess pressure comparison**
"A soap bubble of radius 1 cm and a water drop of radius 1 cm. (a) Which has greater excess pressure inside? (b) Calculate both. (γ_soap = 0.030 N/m; γ_water = 0.072 N/m)"

*Target:* Bubble: ΔP = 4×0.030/0.01 = 12 Pa. Drop: ΔP = 2×0.072/0.01 = 14.4 Pa. Water drop has greater excess pressure despite smaller γ, because it has only one surface (factor 2 vs. 4) while its γ is much higher.

**MP-2 [P36] — Capillary rise scaling**
"A capillary tube of radius 0.5 mm causes water to rise 3 cm. (a) What rise is expected in a tube of radius 0.1 mm? (b) Will mercury (θ ≈ 140°, γ = 0.485 N/m, ρ = 13 600 kg/m³) rise or fall in a glass tube of radius 0.5 mm? By how much?"

*Target:* (a) h ∝ 1/r: h₂ = 3×(0.5/0.1) = 15 cm. (b) cos140° = −0.766 → mercury falls: h = 2×0.485×(−0.766)/(13600×9.8×5×10⁻⁴) = −0.743/66.6 = −0.0112 m ≈ −1.1 cm (mercury is depressed ~1.1 cm).

**MP-3 [P36] — Energy to blow a bubble**
"Calculate the minimum work required to blow a soap bubble of radius 2 cm from a flat soap film. γ = 0.025 N/m."

*Target:* ΔArea = 4πr² × 2 (two surfaces) = 8π×(0.02)² = 1.005×10⁻² m². W = γ × ΔArea = 0.025 × 1.005×10⁻² = 2.51×10⁻⁴ J ≈ 0.25 mJ.

**MP-4 [P36] — Alveoli application**
"An alveolus (lung air sac) has radius 0.1 mm. Without surfactant, γ ≈ 0.05 N/m. With surfactant, γ ≈ 0.005 N/m. (a) Calculate the excess pressure in each case. (b) Explain why infants born before surfactant production begins (< 28 weeks) suffer respiratory distress."

*Target:* Without: ΔP = 2×0.05/10⁻⁴ = 1000 Pa. With: ΔP = 2×0.005/10⁻⁴ = 100 Pa. Without surfactant, the very high internal pressure (1000 Pa) means you must exert enormous effort to re-inflate collapsed alveoli at the end of each breath. The 10× reduction from surfactant makes breathing mechanically feasible. Preterm infants lack this, causing Respiratory Distress Syndrome (RDS) — treated with artificial surfactant instilled into the airways.

**MP-5 [P36] — Synthesis: connected bubbles**
"Two soap bubbles are connected by a short tube. Bubble A has radius 2 cm; Bubble B has radius 4 cm. What happens when the tube is opened? Explain using the excess pressure formula."

*Target:* ΔP_A = 4γ/r_A = 4γ/0.02 = 200γ; ΔP_B = 4γ/0.04 = 100γ. Bubble A has higher internal pressure → air flows from A into B → A shrinks, B grows, until one collapses into the other. Counter-intuitive result: the smaller bubble blows into the larger one. This is the opposite of most students' intuition (which expects the larger to blow into the smaller). Real-world relevance: explains why lung alveoli of different sizes don't simply deflate the small ones into the large — surfactant dynamically reduces γ as alveoli shrink, equalising pressure.

---

## Component 7 — Session Architecture

```
[P01] Session open — floating needle demonstration; soap film wire loop
  ↓
[P41] PD-1 (pressure prerequisite; curved surface force balance)
  ↓ PASS
[P06] Anchor: needle on water; soap film + thread snap; water bead on leaf
  ↓
TA-1: γ = F/L definition; surface energy J/m²; molecular origin [C]
  ↓
TA-2: Excess pressure ΔP = 2γ/r (drop) and 4γ/r (bubble) — hemisphere derivation [C→P]
  ↓
[P28] Conflict: "surface tension is pressure" → MC-SURFACE-TENSION-IS-PRESSURE
  ↓
WE-1: Soap bubble — excess pressure + surface energy
  ↓
[P51] Check-in MP-1 (bubble vs. drop excess pressure comparison)
  ↓ monitor
[P28] Conflict: "surface tension acts outward" → MC-SURFACE-TENSION-IS-PRESSURE
  ↓
TA-3: Capillary rise h = 2γ cosθ/(ρgr) — force balance derivation [C→P]
  ↓
TA-4: Contact angle; wetting vs. non-wetting; hydrophobic/hydrophilic [P]
  ↓
WE-2 → WE-3 (capillary rise calculation; needle float force balance)
  ↓
TA-5: Applications — alveoli, insects, detergents; energy view [P]
  ↓
[P36] MP-1 through MP-5 (mastery probe set)
  ↓
[P62] Retrieval seed: "A soap bubble has radius r and surface tension γ. What is the excess pressure inside?"
[P68]; [P85]; [P89] 1/3/7 days; [P91] 80% gate
```

**Protocol routing:** S0: full CPA — start with needle on water and soap film before any formula; S1: knows ΔP=2γ/r but confuses surface tension with pressure → MC-SURFACE-TENSION-IS-PRESSURE; S4: PD-1 fail → phys.mech.pressure-fluids; S6: [F] — "Surface tension γ = F/L — tension in a membrane, tangential to the surface. Everything else follows from force balance on a curved surface"; S7: open with MP-5 (connected bubbles — counter-intuitive direction of air flow that almost all overconfident students get wrong).

---

## Component 8 — Adaptive Flags

- **Bubble vs. drop factor**: the most common error is applying ΔP = 2γ/r to a soap bubble (which has two surfaces) instead of 4γ/r. Always ask "how many surfaces does this interface have?" before writing the formula.
- **Capillary depression for mercury**: contact angle > 90° gives cos θ < 0 → h < 0 (depression). Mercury is the standard example. Students often try to apply the rise formula and get confused by the sign — remind them that the formula is still correct; the negative sign is the physics.
- **Surface energy and area change**: to compute work done in creating or expanding a surface, use W = γ × ΔA. For a soap film (two surfaces): ΔA = 2 × geometric area change. For a drop or bubble: ΔA = single geometric area change (drop) or 2× geometric area change (bubble). Do not mix these up.
- **Temperature dependence**: γ decreases with temperature (molecules have more thermal energy; surface penalty is reduced). Relevant to: hot water cleaning (lower γ → better wetting), cooking oils, and the thermodynamics of condensation. Mention if students ask why warm soapy water cleans better.
- **Young's equation**: γ_sv = γ_sl + γ_lv cos θ is beyond most A-level syllabuses; include only if the student is curious about the molecular origin of contact angle.

---

## Component 9 — Validation Checklist

| Check | Criterion | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS — phys.mech.surface-tension |
| V-2 | All prerequisites exist in KG and have blueprints | PASS — phys.mech.pressure-fluids ✓ |
| V-3 | difficulty label matches KG | PASS — proficient (4) |
| V-4 | bloom level matches KG | PASS — understand |
| V-5 | mastery_threshold matches KG | PASS — 0.80 |
| V-6 | estimated_hours matches KG | PASS — 4h |
| V-7 | ≥ 2 misconceptions in register | PASS — MC-SURFACE-TENSION-IS-PRESSURE, MC-SURFACE-TENSION-ACTS-OUTWARD |
| V-8 | Each MC has all 5 fields | PASS |
| V-9 | ≥ 1 PD block per prerequisite | PASS — PD-1 (pressure-fluids; curved surface force balance) |
| V-10 | Concrete anchor present [P06] | PASS — floating needle; soap film thread snap; water bead on leaf |
| V-11 | ≥ 4 TAs in development sequence | PASS — TA-1 through TA-5 |
| V-12 | ≥ 3 worked examples | PASS — WE-1, WE-2, WE-3 |
| V-13 | ≥ 5 mastery probes | PASS — MP-1 through MP-5 |
| V-14 | Session architecture references correct primitives | PASS — P01, P06, P28, P30, P31, P33, P36, P41, P51, P52, P62, P68, P85, P89, P91 |
| V-15 | session_cap correctly set | PASS — 7 TAs (≥ 1h rule) |
| V-16 | cpa_entry_stage correctly set | PASS — C with accelerated P track (difficulty 4) |
| V-17 | Student-state routing covers S0–S7 relevant states | PASS — S0, S1, S4, S6, S7 |
| V-18 | Adaptive flags address subject-specific hazards | PASS — bubble vs. drop factor, capillary depression sign, surface energy area counting, temperature dependence, Young's equation scope |
| V-19 | No implementation / framework changes introduced | PASS |
| V-20 | status field set | PASS — READY / PACKAGE_READY |
