# Teaching Blueprint — phys.therm.thermal-expansion

## Component 0 — Concept Identity

```yaml
concept_id: phys.therm.thermal-expansion
name: Thermal Expansion
domain: thermodynamics
difficulty:
  label: developing
  number: 3
bloom: apply
prerequisites:
  - phys.therm.temperature
mastery_threshold: 0.80
estimated_hours: 3
cross_links:
  - phys.therm.heat-transfer
  - phys.therm.phase-transitions
  - phys.mech.stress-strain
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 3 → C with full CPA track)
status: READY
```

---

## Component 1 — Narrative Spine

**Hook (S0 novice):** Steel railway tracks have deliberate gaps between sections. Concrete bridges have expansion joints. The Eiffel Tower is 15 cm taller in summer than in winter. These are not engineering accidents — they are accommodations for the universal truth that materials expand when heated. The atoms in a solid vibrate more vigorously at higher temperatures, pushing each other further apart; the result is a measurable, predictable increase in all dimensions.

**Conceptual arc:**
1. Microscopic origin: thermal energy → increased atomic vibration amplitude → atoms occupy larger average separation → macroscopic expansion.
2. Linear expansion: ΔL = αL₀ΔT. α = coefficient of linear expansion [K⁻¹ or °C⁻¹].
   - Typical values: steel α ≈ 12×10⁻⁶ K⁻¹; aluminium 24×10⁻⁶; glass 9×10⁻⁶; Invar 1.2×10⁻⁶.
3. Area expansion: ΔA = 2αA₀ΔT (coefficient of area expansion β = 2α — derived by expanding (L + ΔL)²).
4. Volume expansion: ΔV = γV₀ΔT (γ = 3α for isotropic solids). Liquids and gases also described by γ.
5. Differential expansion: bimetallic strip — two metals bonded together with different α values; temperature change causes bending because one expands more than the other. Used in thermostats, circuit breakers.
6. Thermal stress: if expansion is prevented, internal stress develops σ = EαΔT (E = Young's modulus). Unconstrained steel rail at 30°C temperature rise: ΔL = 12×10⁻⁶ × 30 × L — if rails are welded, they buckle.
7. Anomalous expansion of water: water contracts from 0°C to 4°C (density increases), then expands above 4°C. Maximum density at 4°C — critical for aquatic life (lakes freeze top-down, not bottom-up).
8. Practical applications: thermostats (bimetallic strip), thermometers (mercury/alcohol expansion), gap engineering in railways, bridges, concrete pavements.

**Closing synthesis:** Thermal expansion is linear, predictable, and material-dependent. Engineering design must account for it through expansion joints, bimetallic thermal switches, or materials with matched expansion coefficients (e.g., Pyrex glass matches iron α closely, which is why Pyrex cookware doesn't shatter when hot iron rests in it). The anomalous behaviour of water near 4°C is the exception that reveals the rule — molecular geometry (hydrogen bonding lattice) can temporarily overcome the general tendency to expand.

---

## Component 2 — Worked Examples

### WE-1 (Concrete — linear expansion)

**Scenario:** A steel bridge girder is 50 m long at 10°C. The temperature on a summer day reaches 40°C. By how much does the girder expand? (α_steel = 12 × 10⁻⁶ K⁻¹)

**Step 1 — Temperature change.**
ΔT = 40 − 10 = 30°C = 30 K.

**Step 2 — Length expansion.**
ΔL = αL₀ΔT = (12 × 10⁻⁶)(50)(30) = 12 × 10⁻⁶ × 1500 = 0.018 m = 1.8 cm.

**Step 3 — Engineering implication.**
Each gap between sections must accommodate at least 1.8 cm of expansion for a 50 m section. Standard railway expansion gaps are 5–10 mm for shorter sections.

**Answer:** ΔL = 1.8 cm. A single 50 m section of steel bridge expands by 1.8 cm over a 30°C temperature rise.

---

### WE-2 (Bridging — bimetallic strip)

**Scenario:** A bimetallic strip consists of a 20 cm steel bar (α = 12 × 10⁻⁶ K⁻¹) bonded to a 20 cm brass bar (α = 19 × 10⁻⁶ K⁻¹). On heating from 20°C to 70°C, calculate the difference in length change between the two metals, and explain which way the strip curves.

**Step 1 — ΔL for steel.**
ΔL_steel = (12 × 10⁻⁶)(0.20)(50) = 1.2 × 10⁻⁴ m = 0.12 mm.

**Step 2 — ΔL for brass.**
ΔL_brass = (19 × 10⁻⁶)(0.20)(50) = 1.9 × 10⁻⁴ m = 0.19 mm.

**Step 3 — Differential.**
Δ(ΔL) = 0.19 − 0.12 = 0.07 mm. Brass side is longer → brass side is the outer arc → strip curves with brass on the outside (concave towards steel side).

**Thermostat application:** In a bimetallic thermostat, the strip curves toward the steel side on heating. This motion can break or make an electrical contact, switching heating off or on at a set temperature.

**Answer:** Strip curves 0.07 mm differential; brass side (higher α) becomes the outer arc → curves concave to steel.

---

### WE-3 (Abstract — thermal stress in constrained rail)

**Derive and apply:** A steel rail of cross-section A = 70 cm² and initial length L₀ at 20°C is welded rigidly at both ends (no expansion allowed). Temperature rises to 50°C. Find the compressive stress.

**Formula:** If expansion is prevented, the rail must be compressed by −ΔL:
Strain: ε = ΔL/L₀ = αΔT = (12 × 10⁻⁶)(30) = 3.6 × 10⁻⁴.
Stress: σ = Eε = (200 × 10⁹)(3.6 × 10⁻⁴) = 7.2 × 10⁷ Pa = 72 MPa.

**Compare to yield strength:** Steel yield strength ≈ 250 MPa. At 72 MPa the rail is well within elastic range — but a 100°C summer day (ΔT = 80°C) gives σ = 192 MPa, approaching yield. Rails can buckle if temperature changes are large enough and end-constraints are rigid.

**Answer:** σ = 72 MPa compressive — below yield strength for ΔT = 30°C, but becomes significant for larger temperature swings.

---

## Component 3 — Misconception Engine

### MC-ONLY-LENGTH-EXPANDS

**Trigger signal:** Student says "the rod gets longer when heated, but its thickness (diameter) stays the same."

**Conflict evidence [P28]:** "Consider a metal ring of radius r. Does it expand so that the hole gets smaller (the ring shrinks inward) or does the hole also get bigger? Measure the inner diameter of a ring before and after heating — what happens?"

*The hole gets bigger — every linear dimension expands, including the inner diameter. The ring expands uniformly; the hole scales as (r + Δr) where Δr = αrΔT.*

**Bridge text [P30]:** "Thermal expansion is isotropic for homogeneous materials — it scales every linear dimension by the same factor (1 + αΔT). Think of the object as printed on a sheet of rubber: stretching the rubber uniformly in all directions enlarges every feature, including holes."

**Replacement text [P31]:** "ΔL = αL₀ΔT applies to any linear dimension — length, width, diameter, hole radius — independently. The area expansion is ΔA = 2αA₀ΔT (factor of 2α because two dimensions scale), and volume expansion is ΔV = 3αV₀ΔT. A heated sphere gets uniformly larger in every direction."

**Discrimination pairs [P33]:**
- "A steel disc has a circular hole of radius 5 cm. On heating by 100°C (α = 12×10⁻⁶), does the hole radius increase or decrease, and by how much?" → Increases: Δr = αrΔT = 12×10⁻⁶ × 0.05 × 100 = 6×10⁻⁵ m = 0.06 mm.
- "A square metal plate of side 10 cm and a square hole of side 2 cm: on heating, does the hole area increase or decrease?" → Hole area increases by ΔA_hole = 2α × (2cm)² × ΔT.

**s6_path:** "Imagine the object is painted on rubber and you stretch it uniformly — every dimension, including holes, scales up."

---

### MC-WATER-ALWAYS-EXPANDS-WITH-HEAT

**Trigger signal:** Student applies the thermal expansion formula to water below 4°C and gets the wrong sign (or doesn't know water is anomalous).

**Conflict evidence [P28]:** "Measure the density of water at 0°C, 2°C, 4°C, 6°C, 10°C in a lab or from data tables. What happens between 0°C and 4°C? Does density increase or decrease? What does this tell you about volume in this range?"

*Density increases from 0°C to 4°C (water contracts) then decreases above 4°C (water expands). Maximum density at 4°C.*

**Bridge text [P30]:** "Water near 0°C contains significant hexagonal hydrogen-bond networks — the same structure as ice. This lattice is actually less dense than liquid water (ice floats). As temperature rises from 0°C to 4°C, these ice-like clusters break down, allowing water molecules to pack more tightly (density increases, volume decreases). Above 4°C, normal thermal expansion (increased vibration amplitude) dominates and water expands like most materials."

**Replacement text [P31]:** "Water's thermal expansion formula ΔV = γV₀ΔT works only above 4°C (γ_water ≈ 2.07 × 10⁻⁴ K⁻¹ at room temperature). Below 4°C, γ is negative (contraction on heating). At exactly 4°C, γ = 0 — maximum density. This anomaly has enormous biological and ecological consequences: lakes freeze top-down (cold water sinks, 4°C water rests at the bottom), protecting aquatic life."

**Discrimination pairs [P33]:**
- "Water at 2°C is heated to 6°C. Which part of the range (2→4°C or 4→6°C) shows volume increasing?" → 4→6°C shows volume increase; 2→4°C shows volume DECREASE.
- "Why does ice float?" → Ice (solid) is less dense than liquid water at 0°C — the hexagonal hydrogen bond crystal packs less efficiently than the liquid.

**s6_path:** "Water near freezing is the exception that saves winter ecosystems — anomalous contraction means 4°C water sinks and forms the lake bottom, allowing surface ice while liquid water persists below."

---

## Component 4 — Diagnostic Probe Set

**P4-a (linear expansion):** An aluminium rod is 1.0 m at 20°C. Find its length at 100°C. (α = 24 × 10⁻⁶ K⁻¹)
*ΔL = 24×10⁻⁶ × 1.0 × 80 = 1.92×10⁻³ m = 1.92 mm. L_final = 1.00192 m.*

**P4-b (hole expansion):** A steel ring has an inner diameter of 10.000 cm at 20°C. At 120°C, is the hole larger or smaller? Find the new diameter. (α = 12 × 10⁻⁶ K⁻¹)
*Larger. Δd = αd₀ΔT = 12×10⁻⁶ × 0.10 × 100 = 1.2×10⁻⁴ m = 0.012 cm. d_new = 10.012 cm.*

**P4-c (volume expansion):** A glass flask contains 500 mL of water at 20°C. The flask is heated to 80°C. How much water overflows? (γ_water ≈ 2.07×10⁻⁴ K⁻¹; γ_glass = 3α = 27×10⁻⁶ K⁻¹)
*ΔV_water = 2.07×10⁻⁴ × 500 × 60 = 6.21 mL. ΔV_glass = 27×10⁻⁶ × 500 × 60 = 0.81 mL. Overflow = 6.21 − 0.81 = 5.40 mL.*

**P4-d (anomalous water):** At what temperature is water densest, and why does this matter for a frozen lake?
*4°C. Densest water sinks to the bottom; ice (less dense) floats. Bottom remains liquid water at 4°C, protecting aquatic life.*

**P4-e (thermal stress):** A concrete slab (α = 12×10⁻⁶ K⁻¹, E = 30 GPa) is rigidly constrained and heated by 40°C. Find the compressive stress.
*σ = EαΔT = 30×10⁹ × 12×10⁻⁶ × 40 = 1.44×10⁷ Pa = 14.4 MPa.*

---

## Component 5 — Socratic Thread

**Turn 1 [P41 diagnostic]:** "Why do railway tracks have gaps between sections?"

*Expected: to allow expansion in summer. If not known, describe buckling consequence of no gaps.*

**Turn 2 [P06 concrete anchor]:** "A steel railway section is 25 m long. In summer it heats up by 40°C. Estimate the expansion. (α ≈ 12 × 10⁻⁶ K⁻¹)"

*ΔL = 12×10⁻⁶ × 25 × 40 = 0.012 m = 1.2 cm.*

**Turn 3 [P28 conflict — MC-ONLY-LENGTH-EXPANDS]:** "A steel ring: does the hole in the ring get bigger or smaller when the ring is heated? Draw your prediction first."

*Most students predict hole shrinks (ring material squeezes inward). Correct answer: hole expands — every linear dimension scales up.*

**Turn 4 [P30 bridge]:** "Think of drawing the ring on rubber and stretching it uniformly. Every feature — including the hole — scales up. The formula ΔL = αL₀ΔT applies to every linear dimension, including the inner radius."

**Turn 5 [P51 check-in]:** "If linear dimensions all scale by (1 + αΔT), what is the scaling factor for area? For volume?"

*Area: (1 + αΔT)² ≈ 1 + 2αΔT → β = 2α. Volume: (1 + αΔT)³ ≈ 1 + 3αΔT → γ = 3α.*

**Turn 6 [P28 conflict — MC-WATER-ALWAYS-EXPANDS]:** "Does water always expand when heated? What happens between 0°C and 4°C?"

*Water contracts between 0°C and 4°C — anomalous. Probe: why does ice float? What does that imply about ice density vs. liquid water density?*

**Turn 7 [P52 narrow]:** "Thermal expansion formula ΔV = γV₀ΔT: when is it safe to use for water, and when is it not?"

*Safe above 4°C. Below 4°C: γ is negative (water contracts). At exactly 4°C: γ = 0.*

**Turn 8 [P62 retrieval seed]:** "P4-c: flask of 500 mL of water heated 60°C. Which expands more — water or glass? How much overflows?"

*Water expands ~6.21 mL; glass expands ~0.81 mL; overflow = ~5.4 mL.*

**Turn 9 [P36 mastery probe]:** "A steel bar (L₀ = 2.0 m, α = 12×10⁻⁶, E = 200 GPa) is bolted rigidly between two walls at 15°C. At 55°C: (a) what is the thermal strain? (b) what compressive stress develops? (c) is this below steel's yield strength of 250 MPa?"

*(a) ε = αΔT = 12×10⁻⁶ × 40 = 4.8×10⁻⁴. (b) σ = Eε = 200×10⁹ × 4.8×10⁻⁴ = 96 MPa. (c) 96 MPa < 250 MPa — yes, below yield, rail is safe but significantly stressed.*

---

## Component 6 — Session Flow

```
[P01 open] → [P41 diagnostic: railway track gaps] → [P06 anchor: 25 m track expansion estimate]
→ [MC-ONLY-LENGTH-EXPANDS: P28 conflict (ring hole) → P30 bridge (rubber analogy) → P31 replacement → P33 pairs]
→ [WE-1: bridge girder linear expansion]
→ [P51 check-in: area and volume expansion coefficients]
→ [WE-2: bimetallic strip differential expansion + thermostat]
→ [MC-WATER-ALWAYS-EXPANDS: P28 conflict → P30 bridge → P31 replacement → P33 pairs]
→ [P52 narrow: water expansion formula validity range]
→ [P62 retrieval seed: overflow problem (P4-c)]
→ [WE-3: constrained rail thermal stress]
→ [P36 mastery probe: steel bar between walls]
→ [P89 retrieval schedule: Day 1, Day 4, Day 14]
→ [P91 mastery gate: 80% on P4-a through P4-e]
→ [P85 regulation tail]
→ [P68 close]
```

---

## Component 7 — Differentiation Variants

**S0 (novice):** Start with bridge gap visuals and the Eiffel Tower height change. Establish ΔL = αL₀ΔT with WE-1 before area/volume. Skip WE-3 (thermal stress — requires Young's modulus). Emphasise anomalous water with the lake-bottom story.

**S1 (knows formula, no physical picture):** Lead with the ring-hole question (P28 conflict). Student usually gets it wrong — the correction and rubber analogy builds the correct isotropic mental model. Then assign area/volume derivation from scratch.

**S4 (prereq gap — temperature weak):** Return to phys.therm.temperature. Thermal expansion requires correct ΔT and Kelvin vs. Celsius distinction (ΔT in both is OK — the offset cancels for differences).

**S6 (math anxiety):** Provide α table as reference. Focus on WE-1 (one-step calculation) and WE-2 (two metals, compare). Skip WE-3. Calculator throughout.

**S7 (overconfident):** Lead with P4-c (flask overflow — requires understanding that glass also expands, so net overflow is the difference). Then WE-3 (thermal stress — most S7 students haven't thought about constrained expansion).

---

## Component 8 — Retrieval Schedule

```yaml
retrieval_events:
  - offset_days: 1
    format: P4-a (aluminium rod) + P4-b (ring hole direction and size)
  - offset_days: 4
    format: P4-c (flask overflow — differential expansion) + P4-d (water anomaly)
  - offset_days: 14
    format: P4-e (constrained thermal stress) + "explain why Invar (α ≈ 10⁻⁶) is used in precision instruments"
```

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly: phys.therm.thermal-expansion ✓
V-2  prerequisites listed in KG: phys.therm.temperature ✓
V-3  bloom verb matches level (apply): "calculate … apply … derive … design" ✓
V-4  mastery_threshold = 0.80 ✓
V-5  session_cap present: 7 TAs ✓
V-6  cpa_entry_stage correct for difficulty 3: "C (anchor; difficulty 3 → C with full CPA track)" ✓
V-7  Narrative Spine covers hook → arc → synthesis ✓
V-8  3 worked examples (Concrete / Bridging / Abstract) ✓
V-9  Misconception Engine: 2 MCs, each with all 6 fields ✓
V-10 Diagnostic Probe Set: 5 probes (P4-a to P4-e) ✓
V-11 Socratic Thread: 9 turns, correct Primitive codes ✓
V-12 Session Flow: linear sequence with all required Primitives ✓
V-13 Differentiation Variants: S0/S1/S4/S6/S7 covered ✓
V-14 Retrieval Schedule: 3 events at Day 1/4/14 ✓
V-15 All Primitive codes valid (P01 P06 P28 P30 P31 P33 P36 P41 P51 P52 P62 P68 P85 P89 P91) ✓
V-16 cross_links pedagogically justified: heat-transfer, phase-transitions, stress-strain ✓
V-17 difficulty number 3 consistent with bloom=apply and estimated_hours=3 ✓
V-18 domain "thermodynamics" matches concept_id prefix phys.therm ✓
V-19 No framework/runtime/route/schema modifications ✓
V-20 Status READY ✓
```
