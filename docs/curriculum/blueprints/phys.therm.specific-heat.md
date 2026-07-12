# Teaching Blueprint — phys.therm.specific-heat

## Component 0 — Concept Identity

```yaml
concept_id: phys.therm.specific-heat
name: Specific Heat Capacity
domain: thermodynamics
difficulty:
  label: developing
  number: 3
bloom: apply
prerequisites:
  - phys.therm.heat-transfer
mastery_threshold: 0.80
estimated_hours: 3
cross_links:
  - phys.therm.calorimetry
  - phys.therm.phase-transitions
  - phys.therm.internal-energy
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 3 → C with full CPA track)
status: READY
```

---

## Component 1 — Narrative Spine

**Hook (S0 novice):** Sand on a beach heats up quickly in the sun and cools rapidly at night — yet the sea next to it barely changes temperature all day. Both receive the same solar energy per unit mass. Sand has a low specific heat capacity; water has an extraordinarily high one. Specific heat capacity is the property that determines how much energy is needed to raise a given mass of material by one degree — and it varies enormously across materials.

**Conceptual arc:**
1. Definition: specific heat capacity c [J/(kg·K)] = heat required per unit mass per unit temperature rise.
   Q = mcΔT; therefore c = Q/(mΔT).
2. Key values: water c = 4186 J/(kg·K) (highest of common liquids — water's "thermal mass" buffers climate); iron 450; copper 385; aluminium 900; sand/rock ~800; air 1005 (at constant pressure).
3. Why water's c is so high: strong intermolecular hydrogen bonds — much energy goes into stretching/breaking these bonds rather than raising kinetic energy (temperature). Microscopic explanation only; no derivation expected at this level.
4. Molar heat capacity C_mol = c × M (M = molar mass). Dulong-Petit law: for monatomic solids, C_mol ≈ 3R ≈ 25 J/(mol·K) — a prediction of classical statistical mechanics.
5. Specific heat at constant pressure (c_p) vs. constant volume (c_v): for solids/liquids, c_p ≈ c_v (small volume change). For gases, c_p > c_v; γ = c_p/c_v = ratio of heat capacities.
6. Temperature change calculation: ΔT = Q/(mc). If the same heat Q is added to different masses or different materials, ΔT differs inversely.
7. Applications: thermal mass in building design (concrete stores heat, buffers daily temperature swings); water coolant in nuclear reactors; heat sinks for electronics (copper, aluminium).

**Closing synthesis:** Specific heat capacity connects heat (energy transfer) to temperature change (the observable). It is the link between the calorimetric measurement (Q) and the thermodynamic state change (ΔT). Water's anomalously high specific heat — a consequence of hydrogen bonding — has shaped Earth's climate, marine biology, and industrial cooling for millennia.

---

## Component 2 — Worked Examples

### WE-1 (Concrete — direct application)

**Scenario:** A 2.0 kg block of copper (c = 385 J/(kg·K)) is heated from 20°C to 120°C by a 500 W electric heater. How long does the heater need to run?

**Step 1 — Heat required.**
Q = mcΔT = 2.0 × 385 × 100 = 77 000 J = 77 kJ.

**Step 2 — Time at 500 W.**
P = Q/t → t = Q/P = 77 000 / 500 = 154 s ≈ 2 min 34 s.

**Answer:** 154 seconds.

---

### WE-2 (Bridging — comparing materials)

**Scenario:** 1.0 kg of water and 1.0 kg of iron, both initially at 20°C, each absorb 50 kJ of heat. Find the final temperature of each.

**Water (c = 4186 J/(kg·K)):**
ΔT_water = Q/(mc) = 50 000 / (1.0 × 4186) = 11.9°C → T_f = 31.9°C.

**Iron (c = 450 J/(kg·K)):**
ΔT_iron = 50 000 / (1.0 × 450) = 111.1°C → T_f = 131.1°C.

**Comparison:** The same heat raises iron's temperature ~9× more than water's. This is why iron cookware gets dangerously hot while water in a pot barely warms up; why water is used as a coolant; and why coastal climates are more moderate than inland (sea buffers temperature).

**Answer:** Water → 31.9°C; Iron → 131.1°C.

---

### WE-3 (Abstract — Dulong-Petit check)

**Apply Dulong-Petit:** Copper has molar mass M = 63.5 g/mol and measured c = 385 J/(kg·K). Verify against the Dulong-Petit prediction.

**C_mol (measured):** c × M = 385 × 0.0635 = 24.4 J/(mol·K).

**Dulong-Petit prediction:** C_mol = 3R = 3 × 8.314 = 24.9 J/(mol·K).

**Agreement:** 24.4 vs. 24.9 — within 2%. The classical equipartition theorem gives each atom 3 vibrational degrees of freedom (each with kT/2 PE + kT/2 KE) → U = 3k_BT per atom = 3RT per mole → C_mol = 3R. ✓

**Limitation:** Dulong-Petit fails for very light elements (diamond, C: measured C_mol ≈ 6 J/(mol·K) at room temperature) and at low T — quantum effects (Einstein/Debye models needed). These limitations are beyond this topic.

---

## Component 3 — Misconception Engine

### MC-MORE-HEAT-MEANS-MORE-TEMPERATURE

**Trigger signal:** Student says "I added more heat so the temperature must have risen more — heat and temperature are proportional regardless of material or mass."

**Conflict evidence [P28]:** "50 kJ to 1 kg water vs. 50 kJ to 1 kg iron (WE-2): same heat, same mass. If heat and temperature change were simply proportional, both should rise the same amount. Do they?"

*Water: +11.9°C. Iron: +111°C. Same heat, ~9× different temperature rise.*

**Bridge text [P30]:** "Temperature change depends on THREE things: heat added (Q), mass (m), and specific heat capacity (c). ΔT = Q/(mc). For the same Q and m, a material with high c (water) shows small ΔT; a material with low c (iron) shows large ΔT. The material's ability to 'absorb' heat without changing temperature is encoded in c."

**Replacement text [P31]:** "Heat is the input; temperature change is the output; specific heat capacity is the transfer function connecting them. Doubling Q doubles ΔT for the same material. Doubling c halves ΔT for the same Q and m. Doubling m halves ΔT. All three variables matter — not just Q."

**Discrimination pairs [P33]:**
- "100 J into 0.1 kg water vs. 100 J into 0.1 kg copper: which heats up more?" → Copper (c = 385 vs. 4186) — ΔT_copper ≈ 2.6°C; ΔT_water ≈ 0.24°C.
- "Same material, same ΔT, double the mass: how much heat needed?" → Double Q. ΔT = Q/(mc) → Q = mcΔT. Doubling m doubles Q.

**s6_path:** "Q = mcΔT — three factors control ΔT, not one."

---

### MC-HIGH-TEMPERATURE-MEANS-HIGH-HEAT-CONTENT

**Trigger signal:** Student says "the iron at 131°C has more heat in it than the water at 32°C because it's hotter."

**Conflict evidence [P28]:** "Both objects started at 20°C and absorbed exactly 50 kJ. Which has 'more heat' in it — the iron or the water?"

*Both absorbed 50 kJ — the same amount. The iron is hotter, but not because it has more energy; it has the same energy but a lower capacity to absorb it without rising in temperature.*

**Bridge text [P30]:** "Temperature measures thermal intensity (heat flow direction); heat content (internal energy) measures total thermal energy stored. High temperature doesn't mean high energy — it means the material has relatively little capacity for more energy (low c) or relatively little mass. A spark has very high temperature but negligible heat content."

**Replacement text [P31]:** "Internal energy U = mcT (rough model — more precisely: U = ∫mc dT). At the same temperature, a larger mass or higher-c material has more internal energy. At the same added energy, a lower-c material rises to a higher temperature. High temperature and high heat content are different things — both relate to U but through different factors."

**Discrimination pairs [P33]:**
- "A match flame (≈2000°C) vs. a bathtub of warm water (≈40°C): which can melt more ice?" → Bathtub — vastly more total thermal energy despite lower temperature.
- "Two copper blocks: 1 kg at 200°C and 2 kg at 100°C. Which has more internal energy above 20°C?" → 1 kg: U = 1 × 385 × 180 = 69300 J. 2 kg: U = 2 × 385 × 80 = 61600 J. Hotter block has slightly more — both factors (mass and ΔT above reference) contribute.

**s6_path:** "Temperature is the 'level'; internal energy is the 'volume'. Same level (T) with different tanks (m, c) means different volumes of stored energy."

---

## Component 4 — Diagnostic Probe Set

**P4-a (prereq: heat concept):** What is the SI unit of heat? Is heat a property of an object?
*Joule (J). No — heat is energy in transit, not a property stored in an object.*

**P4-b (direct application):** How much heat is needed to raise 0.5 kg of water from 10°C to 90°C? (c_water = 4186 J/(kg·K))
*Q = 0.5 × 4186 × 80 = 167 440 J ≈ 167 kJ.*

**P4-c (compare materials):** 1 kg copper (c = 385) and 1 kg water (c = 4186), both given 10 kJ. Which reaches higher temperature?
*ΔT_Cu = 10000/385 ≈ 26°C. ΔT_water = 10000/4186 ≈ 2.4°C. Copper rises ~11× more.*

**P4-d (mass and temperature):** 200 g of iron (c = 450) at 80°C is dropped into 500 g of water (c = 4186) at 20°C. Find the equilibrium temperature (assume no heat loss). 
*Q_lost = Q_gained: 0.2 × 450 × (80 − T) = 0.5 × 4186 × (T − 20). 90(80−T) = 2093(T−20). 7200−90T = 2093T−41860. 49060 = 2183T. T = 22.5°C.*

**P4-e (Dulong-Petit):** Iron (M = 56 g/mol, c = 450 J/(kg·K)). Calculate C_mol and compare to 3R.
*C_mol = 450 × 0.056 = 25.2 J/(mol·K). 3R = 24.9 J/(mol·K). Agreement within 1.2%.*

---

## Component 5 — Socratic Thread

**Turn 1 [P41 diagnostic]:** "Why does the sea stay at roughly the same temperature all summer while sandy beaches heat and cool dramatically each day? Both receive similar solar energy per unit area."

*Sand: low c, heats quickly. Water: high c, resists temperature change.*

**Turn 2 [P06 concrete anchor]:** "If you add 1000 J to 1 kg of sand (c ≈ 800) and 1 kg of water (c = 4186), which gets hotter? Calculate."

*Sand: ΔT = 1000/800 = 1.25°C. Water: ΔT = 1000/4186 = 0.24°C. Sand gets ~5× hotter.*

**Turn 3 [P28 conflict — MC-MORE-HEAT-MEANS-MORE-TEMPERATURE]:** "Same heat, same mass, yet very different temperature rises. What is the missing factor?"

*Specific heat capacity c — the material's resistance to temperature change per unit mass.*

**Turn 4 [P30 bridge]:** "Write Q = mcΔT. Identify: which variable is the input? Which is the output? Which is the material property?"

*Input: Q. Output: ΔT. Material property: c.*

**Turn 5 [P51 check-in]:** "Using Q = mcΔT: if you double c, what happens to ΔT for the same Q and m?"

*ΔT halves — higher c means lower temperature rise per joule added.*

**Turn 6 [P28 conflict — MC-HIGH-TEMPERATURE-MEANS-HIGH-HEAT-CONTENT]:** "WE-2 result: iron at 131°C and water at 32°C, both started at 20°C, both absorbed 50 kJ. Which has more internal energy above 20°C?"

*Both absorbed 50 kJ — same internal energy gain. Iron is hotter not because it has more energy, but because it needed less energy to reach each degree.*

**Turn 7 [P52 narrow]:** "P4-d type: iron at 80°C drops into water at 20°C. Which variable determines the final equilibrium temperature?"

*Conservation of energy: heat lost by iron = heat gained by water → Q = mcΔT for each, set equal.*

**Turn 8 [P62 retrieval seed]:** "Calculate P4-d from memory: 200 g iron (c=450, 80°C) into 500 g water (c=4186, 20°C)."

*As above: T_eq = 22.5°C. Iron barely moves the water — water's large c and mass dominate.*

**Turn 9 [P36 mastery probe]:** "A 1 kW electric kettle heats 1.5 kg of water from 15°C to 100°C. How long does it take? (c = 4186)"

*Q = 1.5 × 4186 × 85 = 533 745 J. t = Q/P = 533 745/1000 = 534 s ≈ 8 min 54 s.*

---

## Component 6 — Session Flow

```
[P01 open] → [P41 diagnostic: beach vs sea daily temperature] → [P06 anchor: sand vs water with 1000 J]
→ [MC-MORE-HEAT-MEANS-MORE-TEMPERATURE: P28 conflict → P30 bridge (Q=mcΔT) → P31 replacement → P33 pairs]
→ [WE-1: copper block heating time]
→ [P51 check-in: effect of doubling c]
→ [WE-2: water vs iron — 50 kJ comparison]
→ [MC-HIGH-TEMPERATURE-MEANS-HIGH-HEAT-CONTENT: P28 → P30 → P31 → P33]
→ [P52 narrow: equilibrium mixing — energy balance setup]
→ [P62 retrieval seed: P4-d mixing problem]
→ [WE-3: Dulong-Petit verification for copper]
→ [P36 mastery probe: kettle heating time]
→ [P89 retrieval schedule: Day 1, Day 4, Day 14]
→ [P91 mastery gate: 80% on P4-a through P4-e]
→ [P85 regulation tail]
→ [P68 close]
```

---

## Component 7 — Differentiation Variants

**S0 (novice):** Start with the beach/sea story. Give the Q = mcΔT formula immediately as the tool; focus on WE-1 (one-step) and WE-2 (comparison). Skip WE-3 (Dulong-Petit — requires molar mass knowledge).

**S1 (knows formula, no physical intuition):** Ask: "Without calculating, which is easier to heat — lead (c = 128) or water (c = 4186)? Why would you want a high-c material in a solar thermal storage tank?" Forces physical reasoning before calculation.

**S4 (prereq gap — heat concept weak):** Return to phys.therm.heat-transfer. If student conflates heat with temperature (P4-a fails), the formula Q = mcΔT will be misread as "heat = temperature."

**S6 (math anxiety):** Provide c table as reference. Focus on WE-1 (straightforward Q calculation) and P4-b. Calculator throughout. P4-d (mixing problem) requires two-step algebra — walk through setup before asking for calculation.

**S7 (overconfident):** Lead with P4-d (mixing — requires setting up two Q=mcΔT equations and solving for T_eq) and WE-3 (Dulong-Petit — requires converting between specific and molar heat capacity). Both require more than formula substitution.

---

## Component 8 — Retrieval Schedule

```yaml
retrieval_events:
  - offset_days: 1
    format: P4-a (heat unit and property distinction) + P4-b (water heating)
  - offset_days: 4
    format: P4-c (copper vs water comparison) + P4-d (mixing problem)
  - offset_days: 14
    format: P4-e (Dulong-Petit for iron) + "explain why water is used as reactor coolant using c values"
```

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly: phys.therm.specific-heat ✓
V-2  prerequisites listed in KG: phys.therm.heat-transfer ✓
V-3  bloom verb matches level (apply): "calculate … apply … compare … verify" ✓
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
V-16 cross_links pedagogically justified: calorimetry, phase-transitions, internal-energy ✓
V-17 difficulty number 3 consistent with bloom=apply and estimated_hours=3 ✓
V-18 domain "thermodynamics" matches concept_id prefix phys.therm ✓
V-19 No framework/runtime/route/schema modifications ✓
V-20 Status READY ✓
```
