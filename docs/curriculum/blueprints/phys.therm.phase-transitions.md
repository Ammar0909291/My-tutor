# Teaching Blueprint — phys.therm.phase-transitions

## Component 0 — Concept Identity

```yaml
concept_id: phys.therm.phase-transitions
name: Phase Transitions and Latent Heat
domain: thermodynamics
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.therm.calorimetry
mastery_threshold: 0.80
estimated_hours: 4
cross_links:
  - phys.therm.specific-heat
  - phys.therm.entropy
  - phys.therm.thermodynamic-processes
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY
```

---

## Component 1 — Narrative Spine

**Hook (S0 novice):** Place a pot of ice-water on a stove. The temperature stays at 0°C while the ice melts — even though the stove is adding heat continuously. Heat goes in but temperature doesn't rise. Where does the energy go? It goes into breaking the intermolecular bonds that hold the solid structure together — this is latent heat, the "hidden" heat of phase transition.

**Conceptual arc:**
1. Phase transitions: solid ↔ liquid (melting/freezing), liquid ↔ gas (vaporisation/condensation), solid ↔ gas (sublimation/deposition).
2. Latent heat: during a phase transition at constant pressure, temperature is constant. Heat absorbed/released = mL. L_f = latent heat of fusion [J/kg]; L_v = latent heat of vaporisation [J/kg].
3. Key values (water): L_f = 334 000 J/kg = 334 kJ/kg; L_v = 2 260 000 J/kg = 2260 kJ/kg. Note: L_v >> L_f — breaking liquid-gas intermolecular bonds requires far more energy than loosening solid-liquid bonds.
4. Heating curve: temperature vs. heat added for water. Five segments: (1) ice warms (slope = 1/(m × c_ice)); (2) ice melts at 0°C (flat, width = m × L_f); (3) water warms (slope = 1/(m × c_water)); (4) water boils at 100°C (flat, width = m × L_v); (5) steam warms.
5. Phase diagram: P-T diagram with solid, liquid, gas regions. Triple point (water: 0.01°C, 611.7 Pa); critical point (374°C, 218 atm). Above critical point: supercritical fluid (no distinct liquid-gas transition). Along boundaries: solid-liquid (melting curve), liquid-gas (vapour pressure curve), solid-gas (sublimation curve).
6. Clausius-Clapeyron equation (qualitative): vapour pressure increases with temperature; slope of liquid-gas curve positive; slope of solid-liquid curve nearly vertical (or slightly negative for water — ice melts under pressure).
7. Evaporative cooling: evaporation removes the highest-energy molecules → lowers average kinetic energy → surface cools. Basis of sweating, refrigeration, alcohol on skin.
8. Boiling point dependence on pressure: BP rises at high P (pressure cooker — 120°C at 2 atm); BP falls at low P (water boils at 85°C at altitude 4000 m).

**Closing synthesis:** Phase transitions are the regime where energy input goes entirely into reorganising molecular structure (overcoming intermolecular bonds) rather than increasing kinetic energy (temperature). The latent heats are enormous — especially L_v — which is why water vapour in the atmosphere is the planet's primary energy transport mechanism. A cloud releasing its latent heat to the surrounding air is a more powerful heater than most industrial processes.

---

## Component 2 — Worked Examples

### WE-1 (Concrete — full heating curve calculation)

**Scenario:** How much heat is required to convert 0.50 kg of ice at −20°C to steam at 120°C? (c_ice = 2090 J/(kg·K); c_water = 4186; c_steam = 2010; L_f = 334 000; L_v = 2 260 000 J/kg)

**Segment 1 — Warm ice from −20°C to 0°C:**
Q₁ = m × c_ice × ΔT = 0.50 × 2090 × 20 = 20 900 J.

**Segment 2 — Melt ice at 0°C:**
Q₂ = m × L_f = 0.50 × 334 000 = 167 000 J.

**Segment 3 — Warm water from 0°C to 100°C:**
Q₃ = 0.50 × 4186 × 100 = 209 300 J.

**Segment 4 — Vaporise at 100°C:**
Q₄ = m × L_v = 0.50 × 2 260 000 = 1 130 000 J.

**Segment 5 — Warm steam from 100°C to 120°C:**
Q₅ = 0.50 × 2010 × 20 = 20 100 J.

**Total:**
Q = 20 900 + 167 000 + 209 300 + 1 130 000 + 20 100 = 1 547 300 J ≈ 1.55 MJ.

**Distribution:** Warming segments: 20 900 + 209 300 + 20 100 = 250 300 J (16%); Phase transitions: 1 297 000 J (84%). Vaporisation alone accounts for 73% of total energy.

**Answer:** Q ≈ 1.55 MJ. Phase transitions dominate.

---

### WE-2 (Bridging — phase diagram and pressure cooker)

**Scenario:** A pressure cooker operates at internal pressure 2.00 atm absolute. At this pressure, the boiling point of water is approximately 120°C (read from steam tables). Compare cooking speed to 100°C boiling.

**Why higher BP matters:** Cooking rate approximately doubles per 10°C rise (Arrhenius rule of thumb for reaction rates). From 100°C to 120°C: rate ≈ 2² = 4× faster.

**Steam tables (qualitative):** Along the vapour pressure curve (liquid-gas boundary on phase diagram), higher pressure → higher boiling point. At 2 atm: T_boil ≈ 120°C. At 0.5 atm (altitude ≈ 5000 m): T_boil ≈ 82°C.

**Altitude consequence:** At 82°C, eggs take much longer to cook — many hikers find this out the hard way. At altitude, the reduced boiling point means cooking times must be extended.

**Answer:** Pressure cooker at 2 atm boils at ~120°C — ~4× faster cooking than sea-level boiling.

---

### WE-3 (Abstract — evaporative cooling)

**Calculate:** 1.0 L of water evaporates from human skin per hour on a hot day. How much heat does this remove from the body? What rate of cooling does this represent? (L_v_skin ≈ 2430 kJ/kg at body temperature; density of water = 1 kg/L)

**Step 1 — Mass evaporated per hour.**
m = 1.0 L × 1.0 kg/L = 1.0 kg/h.

**Step 2 — Heat removed per hour.**
Q = m × L_v = 1.0 × 2 430 000 = 2 430 000 J/h.

**Step 3 — Power.**
P = Q/t = 2 430 000 / 3600 = 675 W.

**Step 4 — Compare to metabolic heat production.**
A person exercising vigorously produces ~1000 W of heat. Sweating at 1 L/h removes 675 W — most of the metabolic heat. This is why sweating is the body's primary thermal regulation mechanism and why it fails in humid conditions (sweat can't evaporate when air is already saturated).

**Answer:** 675 W of cooling power — comparable to a powerful electric heater running in reverse.

---

## Component 3 — Misconception Engine

### MC-TEMPERATURE-RISES-DURING-PHASE-CHANGE

**Trigger signal:** Student says "when you heat ice, the temperature rises until it melts, then it continues rising" — treating the melting as instantaneous or non-isothermal.

**Conflict evidence [P28]:** "Put a thermometer in a mixture of ice and water at 1 atm. Stir gently and add heat from a water bath. Read the thermometer every 30 seconds for 5 minutes. Does the temperature change while any ice remains?"

*No — temperature stays at exactly 0°C until all ice melts. This is the experimental signature of a first-order phase transition.*

**Bridge text [P30]:** "As long as two phases coexist (solid + liquid, or liquid + gas), the temperature is fixed at the transition temperature. The heat energy goes entirely into phase change (breaking intermolecular bonds), not into raising kinetic energy. Temperature only rises again after all of one phase has converted."

**Replacement text [P31]:** "On the heating curve, the flat segments at 0°C and 100°C are not instantaneous — they have real width proportional to m × L. For 0.5 kg of ice, melting requires 167 000 J (WE-1 Q₂) — at 100 W input, that is 28 minutes of flat temperature. This is the isothermal phase transition — a fundamental thermodynamic signature."

**Discrimination pairs [P33]:**
- "A glass contains only ice at 0°C. Heat is added. When does the temperature start to rise above 0°C?" → Only after all ice has melted.
- "500 g ice at 0°C in 200 g water at 25°C. Does temperature immediately drop to 0°C?" → Yes — any remaining ice + liquid water coexist at exactly 0°C until all ice melts or all water freezes.

**s6_path:** "Two phases present = fixed temperature. The flat part of the heating curve is where energy is 'invisible' to a thermometer — going into bonds, not motion."

---

### MC-LATENT-HEAT-SAME-FOR-ALL-TRANSITIONS

**Trigger signal:** Student uses L_f in a situation requiring L_v, or assumes the latent heats are similar in magnitude.

**Conflict evidence [P28]:** "Compare: heat to melt 1 kg ice (L_f = 334 kJ) vs. heat to vaporise 1 kg water (L_v = 2260 kJ). Ratio L_v/L_f = 2260/334 = 6.8. What does this tell you about which bonds are harder to break?"

*Liquid-gas bonds are ~7× harder to break than solid-liquid bonds. Liquid water still has significant intermolecular hydrogen bonding; escaping to the gas phase requires overcoming all of them.*

**Bridge text [P30]:** "Melting: only partially disrupts intermolecular forces — molecules gain freedom to flow but are still close and interacting. Vaporisation: completely eliminates intermolecular forces — molecules separate to distances where forces are negligible. Far more energy is required to achieve full separation."

**Replacement text [P31]:** "Three different latent heats, each matching its transition: L_f (solid↔liquid, ~100–400 kJ/kg), L_v (liquid↔gas, ~1000–2500 kJ/kg, roughly 6–10× larger), L_s (solid↔gas, sublimation, ≈ L_f + L_v). Always identify which transition and use the correct L. For water: L_f = 334; L_v = 2260; L_s ≈ 2594 kJ/kg."

**Discrimination pairs [P33]:**
- "1 kg of water at 100°C condenses to liquid at 100°C. Heat released = ?" → m × L_v = 1 × 2260 = 2260 kJ. Not L_f.
- "Why does steam at 100°C cause more severe burns than boiling water at 100°C?" → Steam releases L_v = 2260 kJ/kg on condensing to skin, in addition to cooling. Boiling water only releases heat cooling from 100°C.

**s6_path:** "L_f ≈ 334 kJ/kg (melt/freeze); L_v ≈ 2260 kJ/kg (boil/condense). Vaporisation is 7× more energetic."

---

## Component 4 — Diagnostic Probe Set

**P4-a (prereq: calorimetry):** A phase change occurs at constant temperature. What is happening to the added heat energy?
*Breaking/forming intermolecular bonds — not raising kinetic energy (temperature).*

**P4-b (latent heat calculation):** How much heat is released when 200 g of water at 0°C freezes completely? (L_f = 334 kJ/kg)
*Q = mL_f = 0.200 × 334 000 = 66 800 J = 66.8 kJ.*

**P4-c (full segment):** How much heat is needed to convert 100 g of water at 20°C to steam at 100°C?
*Q_warm = 0.1 × 4186 × 80 = 33 488 J. Q_vap = 0.1 × 2 260 000 = 226 000 J. Total = 259 488 J ≈ 259 kJ.*

**P4-d (steam vs water burns):** Steam at 100°C contacts 1 cm² of skin, depositing 5 g of condensate. Estimate heat deposited from condensation alone (ignore cooling after condensation).
*Q = 0.005 × 2 260 000 = 11 300 J = 11.3 kJ — from just 5 g of steam condensing.*

**P4-e (phase diagram):** At high altitude where P = 0.70 atm, is the boiling point of water above or below 100°C? Why?
*Below — lower pressure → lower boiling point (liquid-gas equilibrium requires less thermal energy to overcome reduced external pressure).*

---

## Component 5 — Socratic Thread

**Turn 1 [P41 diagnostic]:** "You put a pot of ice-water on a stove at medium heat. How long does the temperature stay at 0°C?"

*Until all ice melts. The time depends on how much ice and how powerful the stove.*

**Turn 2 [P06 concrete anchor]:** "Two phases coexisting: what is the temperature? Add heat — temperature changes?"

*Fixed at transition temperature. Adding heat → phase changes, temperature stays constant.*

**Turn 3 [P28 conflict — MC-TEMPERATURE-RISES-DURING-PHASE-CHANGE]:** "If temperature doesn't rise while ice melts, where does the heat energy go?"

*Into breaking the solid hydrogen-bond lattice — potential energy, not kinetic. No thermometer change.*

**Turn 4 [P30 bridge]:** "The flat segment on the heating curve: the width is mL_f. For 0.5 kg: width = 167 000 J. At 100 W input, that's 28 minutes. Can this be experimentally measured?"

*Yes — ice-water thermometer stays at 0°C for measurable time while ice melts.*

**Turn 5 [P51 check-in]:** "On the heating curve for water, identify all 5 segments. Which two are flat?"

*Slopes: ice warms, FLAT (melt), water warms, FLAT (vaporise), steam warms.*

**Turn 6 [P28 conflict — MC-LATENT-HEATS-SAME]:** "Compare L_f = 334 kJ/kg vs L_v = 2260 kJ/kg. Why is vaporisation 7× more energetic than melting?"

*Melting: molecules stay close, still interacting. Vaporisation: complete separation — all intermolecular forces overcome.*

**Turn 7 [P52 narrow]:** "Burns from steam vs. boiling water at 100°C — which is worse and why?"

*Steam condensing releases L_v = 2260 kJ/kg on the skin BEFORE cooling further. Boiling water only delivers the sensible heat from 100°C down. Steam burn is far more severe.*

**Turn 8 [P62 retrieval seed]:** "P4-c from memory: 100 g water at 20°C → steam at 100°C. What two heat quantities must be added?"

*Q_warm = mcΔT = 0.1 × 4186 × 80 = 33 488 J; Q_vap = mL_v = 0.1 × 2 260 000 = 226 000 J.*

**Turn 9 [P36 mastery probe]:** "WE-1 from memory (simpler version): 200 g ice at 0°C into steam at 100°C. Find total heat. Identify which segment dominates."

*Q₁ (melt) = 0.2 × 334 000 = 66 800 J. Q₂ (warm water) = 0.2 × 4186 × 100 = 83 720 J. Q₃ (vaporise) = 0.2 × 2 260 000 = 452 000 J. Total ≈ 602 520 J. Vaporisation = 75% of total.*

---

## Component 6 — Session Flow

```
[P01 open] → [P41 diagnostic: how long at 0°C while ice melts] → [P06 anchor: two coexisting phases = constant T]
→ [MC-TEMPERATURE-RISES-DURING-PHASE-CHANGE: P28 conflict → P30 bridge (heating curve flat segment) → P31 → P33]
→ [WE-1: full heating curve −20°C ice → 120°C steam]
→ [P51 check-in: five heating curve segments]
→ [MC-LATENT-HEATS-SAME: P28 conflict (7× ratio) → P30 bridge → P31 → P33]
→ [WE-2: pressure cooker — phase diagram and boiling point]
→ [P52 narrow: steam vs water burn severity]
→ [P62 retrieval seed: P4-c water at 20°C to steam]
→ [WE-3: evaporative cooling — sweating power]
→ [P36 mastery probe: 200 g ice at 0°C to steam at 100°C]
→ [P89 retrieval schedule: Day 1, Day 4, Day 14]
→ [P91 mastery gate: 80% on P4-a through P4-e]
→ [P85 regulation tail]
→ [P68 close]
```

---

## Component 7 — Differentiation Variants

**S0 (novice):** Start with ice thermometer demo description. Draw the heating curve with labelled flat segments. Introduce only L_f (ice-water) first. WE-1 first two segments only. Add L_v second if time permits.

**S1 (knows L formula, no curve intuition):** Ask them to draw the heating curve from memory before showing it. Most draw a monotonically increasing curve with no flats — the error reveals the misconception and drives learning.

**S4 (prereq gap — calorimetry weak):** Return to phys.therm.calorimetry. Phase transitions add mL terms to the calorimetric balance; if Q = mcΔT is not secure, the multi-segment calculation in WE-1 is inaccessible.

**S6 (math anxiety):** Focus on one segment at a time in WE-1. Provide L_f and L_v values as given. P4-b (single melt calculation) is the core competency. Skip WE-3 (evaporative cooling power).

**S7 (overconfident):** Lead with WE-3 (evaporative cooling power — non-standard application). Then demand WE-1 from scratch with no given formula — must recall all five segments and correct c/L values.

---

## Component 8 — Retrieval Schedule

```yaml
retrieval_events:
  - offset_days: 1
    format: P4-a (where does heat go during transition) + P4-b (freezing heat)
  - offset_days: 4
    format: P4-c (water at 20°C to steam) + P4-d (steam burns)
  - offset_days: 14
    format: P4-e (altitude boiling point) + "find heat to cool 500 g steam at 150°C to ice at −10°C — full cooling curve"
```

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly: phys.therm.phase-transitions ✓
V-2  prerequisites listed in KG: phys.therm.calorimetry ✓
V-3  bloom verb matches level (apply): "apply … calculate … identify … compare" ✓
V-4  mastery_threshold = 0.80 ✓
V-5  session_cap present: 7 TAs ✓
V-6  cpa_entry_stage correct for difficulty 4: "C (anchor; difficulty 4 → C with accelerated P track)" ✓
V-7  Narrative Spine covers hook → arc → synthesis ✓
V-8  3 worked examples (Concrete / Bridging / Abstract) ✓
V-9  Misconception Engine: 2 MCs, each with all 6 fields ✓
V-10 Diagnostic Probe Set: 5 probes (P4-a to P4-e) ✓
V-11 Socratic Thread: 9 turns, correct Primitive codes ✓
V-12 Session Flow: linear sequence with all required Primitives ✓
V-13 Differentiation Variants: S0/S1/S4/S6/S7 covered ✓
V-14 Retrieval Schedule: 3 events at Day 1/4/14 ✓
V-15 All Primitive codes valid (P01 P06 P28 P30 P31 P33 P36 P41 P51 P52 P62 P68 P85 P89 P91) ✓
V-16 cross_links pedagogically justified: specific-heat, entropy, thermodynamic-processes ✓
V-17 difficulty number 4 consistent with bloom=apply and estimated_hours=4 ✓
V-18 domain "thermodynamics" matches concept_id prefix phys.therm ✓
V-19 No framework/runtime/route/schema modifications ✓
V-20 Status READY ✓
```
