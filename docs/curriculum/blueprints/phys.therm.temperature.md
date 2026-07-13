# Teaching Blueprint — phys.therm.temperature

## Component 0 — Concept Identity

```yaml
concept_id: phys.therm.temperature
name: Temperature and Temperature Scales
domain: thermodynamics
difficulty:
  label: foundational
  number: 2
bloom: understand
prerequisites:
  - phys.meas.units
mastery_threshold: 0.80
estimated_hours: 2
cross_links:
  - phys.therm.zeroth-law
  - phys.therm.thermal-expansion
  - phys.therm.ideal-gas-law
  - phys.therm.kinetic-theory
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 2 → C with full CPA track)
status: READY
```

---

## Component 1 — Narrative Spine

**Hook (S0 novice):** Touch an ice cube and a metal spoon sitting on the same table — the spoon feels colder, even though both are at the same room temperature. Your sense of hot and cold is not measuring temperature; it is measuring heat flow rate. Temperature is the physical property that determines the direction of spontaneous heat flow — and defining it precisely enough to measure it reliably took two centuries of science.

**Conceptual arc:**
1. Temperature as the "thermal pressure" that drives heat flow: heat flows spontaneously from high-T to low-T regions.
2. Empirical temperature scales: Celsius (0°C = ice point, 100°C = steam point at 1 atm); Fahrenheit (32°F = ice, 212°F = steam).
3. Conversion: T(°F) = (9/5)T(°C) + 32; T(°C) = (5/9)(T(°F) − 32).
4. Thermometric property: any measurable physical property that varies monotonically with temperature (length of mercury column, electrical resistance, gas pressure at constant volume).
5. Absolute (Kelvin) scale: T(K) = T(°C) + 273.15. Based on constant-volume gas thermometer extrapolated to zero pressure → absolute zero = 0 K = −273.15°C.
6. Absolute zero: the temperature at which an ideal gas would exert zero pressure — the lowest possible temperature (third law; practically unreachable but approachable).
7. SI unit: the kelvin (K), not "degree kelvin." Defined since 2019 by fixing k_B = 1.380649 × 10⁻²³ J/K.
8. Why Kelvin matters: all thermodynamic equations (gas law, Carnot efficiency, kinetic energy) require absolute temperature — using Celsius gives wrong answers.

**Closing synthesis:** Temperature is not "amount of heat" — it is the intensive property that governs heat flow direction. The Kelvin scale's power is that it is absolute: T = 0 is meaningful (no random thermal motion), and all ratios T₁/T₂ have physical significance (Carnot efficiency depends on them). Celsius is a practical measurement tool; Kelvin is the language of thermodynamics.

---

## Component 2 — Worked Examples

### WE-1 (Concrete — scale conversion)

**Scenario:** Normal body temperature is 98.6°F. Convert to Celsius and Kelvin. Standard room temperature is 20°C — express in Fahrenheit and Kelvin.

**Body temperature:**
°C: T = (5/9)(98.6 − 32) = (5/9)(66.6) = 37.0°C.
K: T = 37.0 + 273.15 = 310.15 K ≈ 310 K.

**Room temperature (20°C):**
°F: T = (9/5)(20) + 32 = 36 + 32 = 68°F.
K: T = 20 + 273.15 = 293.15 K ≈ 293 K.

**Answer:** Body temp = 37°C = 310 K. Room temp = 68°F = 293 K.

---

### WE-2 (Bridging — thermometric property)

**Scenario:** A resistance thermometer has resistance R = 100 Ω at 0°C and R = 138.5 Ω at 100°C. Assuming R varies linearly with temperature, find:
(a) the temperature when R = 120 Ω.
(b) The resistance at −40°C.

**Linear model:** R(T) = R₀ + (ΔR/ΔT) × T = 100 + (38.5/100) × T = 100 + 0.385T [Ω, T in °C].

**(a) T when R = 120 Ω:**
120 = 100 + 0.385T → T = 20/0.385 = 51.9°C.

**(b) R at −40°C:**
R = 100 + 0.385 × (−40) = 100 − 15.4 = 84.6 Ω.

**Answer:** 120 Ω → 51.9°C; at −40°C: R = 84.6 Ω.

---

### WE-3 (Abstract — absolute zero from gas thermometer)

**Concept:** A constant-volume gas thermometer gives P = 1.000 × 10⁵ Pa at 0°C and P = 1.366 × 10⁵ Pa at 100°C. Using the linear P–T relationship, extrapolate to find absolute zero (the temperature where P = 0).

**Linear model:** P(T) = P₀ + (ΔP/ΔT) × T.
ΔP/ΔT = (1.366 − 1.000) × 10⁵ / 100 = 366 Pa/°C.
P = 1.000 × 10⁵ + 366T.

**Extrapolate to P = 0:**
0 = 1.000 × 10⁵ + 366T → T = −1.000 × 10⁵ / 366 = −273.2°C.

**Answer:** Absolute zero ≈ −273.2°C — in excellent agreement with the accepted −273.15°C. This shows why the Kelvin scale's zero is physically meaningful: it's where gas pressure would vanish.

---

## Component 3 — Misconception Engine

### MC-TEMPERATURE-IS-HEAT

**Trigger signal:** Student says "the metal spoon is colder than the wooden spoon because it has less heat" or "hotter things have more temperature-heat."

**Conflict evidence [P28]:** "Two blocks: 1 kg of iron at 80°C and 10 kg of water at 20°C. Which has more total thermal energy? Which is at higher temperature? Does heat flow from iron to water or water to iron?"

*Iron: hotter (80°C > 20°C) → heat flows from iron to water. But 10 kg of water contains far more total thermal energy than 1 kg of iron. Temperature ≠ total thermal energy.*

**Bridge text [P30]:** "Temperature is an intensive property — it doesn't depend on how much material you have. Heat (thermal energy) is an extensive property — it scales with mass. A single match flame has a higher temperature than a warm bath, but contains far less heat. Temperature tells you the direction of heat flow; it doesn't tell you how much energy is stored."

**Replacement text [P31]:** "Temperature = thermal 'pressure' that drives heat flow. Heat = thermal energy transferred. They are related (hotter things generally have more thermal energy per particle) but not identical. Two objects at the same temperature have zero net heat flow between them — that is the operational definition of 'same temperature.'"

**Discrimination pairs [P33]:**
- "A 5 kg block of copper at 50°C and a 5 g copper penny at 50°C: which has more heat?" → 5 kg block (more mass → more thermal energy). Same temperature though.
- "Which direction does heat flow: from 200°C steel nail into 20°C swimming pool?" → From nail to pool (higher T to lower T), even though pool has vastly more total thermal energy.

**s6_path:** "Temperature is the 'pressure'; heat is the 'fluid'. Pressure drives flow, but the reservoir can be larger on the low-pressure side."

---

### MC-CELSIUS-RATIO-VALID

**Trigger signal:** Student treats Celsius ratios as physically meaningful — e.g., "20°C is twice as hot as 10°C" or uses Celsius in a gas-law calculation.

**Conflict evidence [P28]:** "Using the ideal gas law: P₁/T₁ = P₂/T₂. If T₁ = 10°C and T₂ = 20°C, is the pressure ratio P₂/P₁ = 2? Calculate using Kelvin and check."

*In Kelvin: T₁ = 283 K, T₂ = 293 K. P₂/P₁ = 293/283 = 1.035 — a 3.5% change, not doubling.*

**Bridge text [P30]:** "The Celsius scale is anchored at 0°C by convention (water's ice point) — not by any physical zero. Absolute zero is at −273.15°C. Ratios of Celsius values have no physical meaning because the zero is arbitrary. Kelvin sets zero at absolute zero, so all ratios T₁/T₂ and differences T₂ − T₁ have thermodynamic meaning."

**Replacement text [P31]:** "For any equation where temperature appears multiplicatively or as a ratio (gas laws, Carnot efficiency η = 1 − T_C/T_H, kinetic energy ∝ T), always convert to Kelvin first. For differences only (thermal expansion ΔT = T₂ − T₁), Celsius is fine because the offset cancels."

**Discrimination pairs [P33]:**
- "Carnot efficiency: hot reservoir 200°C, cold reservoir 100°C. Is efficiency 50%?" → No — in Kelvin: T_H = 473 K, T_C = 373 K. η = 1 − 373/473 = 21.1%, not 50%.
- "Steel rail expands ΔL = LαΔT as temperature rises from 10°C to 40°C. Can you use ΔT = 30 in Celsius?" → Yes — ΔT is a difference; Celsius offset cancels.

**s6_path:** "Rule: differences OK in Celsius; ratios and absolute values → must use Kelvin."

---

## Component 4 — Diagnostic Probe Set

**P4-a (conversion):** Convert 37°C to Fahrenheit and Kelvin.
*°F: (9/5)(37) + 32 = 66.6 + 32 = 98.6°F. K: 37 + 273.15 = 310.15 K.*

**P4-b (direction of heat flow):** A 300 K block touches a 280 K block. In which direction does heat spontaneously flow?
*From 300 K to 280 K (high T to low T).*

**P4-c (scale reasoning):** "40°C is twice as hot as 20°C." True or false? Justify.
*False — in Kelvin: 313 K vs. 293 K. The ratio is 1.068:1, not 2:1. Celsius ratios are meaningless thermodynamically.*

**P4-d (gas law — Celsius trap):** A gas at T = 27°C is heated to T = 54°C at constant volume. By what factor does pressure increase?
*Must use Kelvin: T₁ = 300 K, T₂ = 327 K. P₂/P₁ = 327/300 = 1.09 — 9% increase, not doubling.*

**P4-e (absolute zero extrapolation):** A gas has P = 2.0 × 10⁵ Pa at 127°C and P = 1.5 × 10⁵ Pa at 27°C. Extrapolate linearly to find the temperature at P = 0.
*ΔP/ΔT = (2.0 − 1.5) × 10⁵ / (127 − 27) = 5 × 10⁴/100 = 500 Pa/°C. At P=0: 0 = 1.5 × 10⁵ + 500(T − 27) → T − 27 = −300 → T = −273°C. ✓*

---

## Component 5 — Socratic Thread

**Turn 1 [P41 diagnostic]:** "Touch a metal spoon and a wooden spoon both sitting on the table. Which feels colder? Are they at different temperatures?"

*Both at room temperature — same T. Spoon feels colder because metal conducts heat away faster.*

**Turn 2 [P06 concrete anchor]:** "If temperature isn't 'amount of cold/heat' — what physical property determines which direction heat flows between two objects?"

*Temperature: heat flows from higher T to lower T.*

**Turn 3 [P28 conflict — MC-TEMPERATURE-IS-HEAT]:** "5 kg of water at 25°C vs. 1 g of water at 90°C. Which has more total thermal energy? Which is at higher temperature? If they touch, which way does heat flow?"

*5 kg water has vastly more total energy; 1 g at 90°C is at higher T. Heat flows from 90°C to 25°C regardless of total energy. T determines direction, not total energy.*

**Turn 4 [P30 bridge]:** "We need a scale that doesn't just measure direction of flow but allows quantitative thermodynamic calculation. Why is 0°C a bad place for 'zero'?"

*Ice point is a convention, not a physical zero. Negative temperatures would arise for cold objects — nonsensical in a ratio.*

**Turn 5 [P51 check-in]:** "So Kelvin zero is set at absolute zero — where would gas pressure extrapolate to zero. How do we convert?"

*T(K) = T(°C) + 273.15.*

**Turn 6 [P28 conflict — MC-CELSIUS-RATIO-VALID]:** "Calculate the Carnot efficiency between T_H = 100°C and T_C = 50°C using both Celsius and Kelvin. Which gives the physically correct answer?"

*Celsius: η = 1 − 50/100 = 50%. Kelvin: η = 1 − 323/373 = 13.4%. Kelvin is correct.*

**Turn 7 [P52 narrow]:** "When can you safely use Celsius in a calculation? Give a rule."

*Differences/intervals only (ΔT): Celsius is fine. Ratios or absolute T: must use Kelvin.*

**Turn 8 [P62 retrieval seed]:** "Convert: (a) −40°C to Kelvin and Fahrenheit. (b) 77°F to Celsius and Kelvin."

*(a) −40°C = 233 K = −40°F (special coincidence). (b) 77°F: C = (5/9)(77−32) = 25°C = 298 K.*

**Turn 9 [P36 mastery probe]:** "A gas at 0°C has volume 2.0 L. At what temperature (°C) will volume double at constant pressure?"

*Charles's law: V/T = const → T₂ = 2T₁. T₁ = 273 K → T₂ = 546 K = 273°C. (Not 0°C — Celsius would give nonsensical 0 × 2 = 0.)*

---

## Component 6 — Session Flow

```
[P01 open] → [P41 diagnostic: metal vs wooden spoon] → [P06 anchor: heat flow direction = temperature]
→ [MC-TEMPERATURE-IS-HEAT: P28 conflict → P30 bridge → P31 replacement → P33 pairs]
→ [WE-1: scale conversions — body and room temperature]
→ [P51 check-in]
→ [MC-CELSIUS-RATIO-VALID: P28 conflict (Carnot trap) → P30 bridge → P31 rule → P33 pairs]
→ [WE-2: resistance thermometer — linear thermometric property]
→ [P52 narrow: when Celsius OK vs. must use Kelvin]
→ [WE-3: absolute zero extrapolation from gas thermometer]
→ [P62 retrieval seed: conversions −40°C and 77°F]
→ [P36 mastery probe: Charles's law — doubles volume, find T in °C]
→ [P89 retrieval schedule: Day 1, Day 4, Day 14]
→ [P91 mastery gate: 80% on P4-a through P4-e]
→ [P85 regulation tail]
→ [P68 close]
```

---

## Component 7 — Differentiation Variants

**S0 (novice):** Start with hands-on spoon comparison. Introduce Celsius-Fahrenheit conversion first (familiar scales), then Kelvin as the "thermodynamics scale." Skip WE-3 derivation; emphasise conversions and the two practical rules from P4-c and P4-d.

**S1 (knows conversions, no conceptual depth):** Start directly with P4-c (Is 40°C twice 20°C?) and P4-d (gas law Celsius trap). The surprise result drives deeper learning. Then assign WE-3 to reveal why Kelvin is structured this way.

**S4 (prereq gap — units weak):** Return to phys.meas.units. Temperature units and conversion factors require fluency with dimensional analysis. P4-a (conversion) reveals this gap.

**S6 (math anxiety):** Provide conversion formulas in reference. Focus on direction of heat flow (P4-b) and the Celsius-Kelvin offset rule. Calculator for all numerical probes.

**S7 (overconfident):** Lead with P4-d (gas law Celsius trap) and P4-e (absolute zero extrapolation). Students who think they "know temperature" rarely think carefully about when absolute T is required.

---

## Component 8 — Retrieval Schedule

```yaml
retrieval_events:
  - offset_days: 1
    format: P4-a (conversion) + P4-b (heat flow direction)
  - offset_days: 4
    format: P4-c (Celsius ratio fallacy) + P4-d (gas law Celsius trap)
  - offset_days: 14
    format: P4-e (absolute zero extrapolation) + "explain in one sentence why Carnot efficiency must use Kelvin"
```

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly: phys.therm.temperature ✓
V-2  prerequisites listed in KG: phys.meas.units ✓
V-3  bloom verb matches level (understand): "explain … identify … convert … justify" ✓
V-4  mastery_threshold = 0.80 ✓
V-5  session_cap present: 7 TAs ✓
V-6  cpa_entry_stage correct for difficulty 2: "C (anchor; difficulty 2 → C with full CPA track)" ✓
V-7  Narrative Spine covers hook → arc → synthesis ✓
V-8  3 worked examples (Concrete / Bridging / Abstract) ✓
V-9  Misconception Engine: 2 MCs, each with all 6 fields ✓
V-10 Diagnostic Probe Set: 5 probes (P4-a to P4-e) ✓
V-11 Socratic Thread: 9 turns, correct Primitive codes ✓
V-12 Session Flow: linear sequence with all required Primitives ✓
V-13 Differentiation Variants: S0/S1/S4/S6/S7 covered ✓
V-14 Retrieval Schedule: 3 events at Day 1/4/14 ✓
V-15 All Primitive codes valid (P01 P06 P28 P30 P31 P33 P36 P41 P51 P52 P62 P68 P85 P89 P91) ✓
V-16 cross_links pedagogically justified: zeroth-law, thermal-expansion, ideal-gas-law, kinetic-theory ✓
V-17 difficulty number 2 consistent with bloom=understand and estimated_hours=2 ✓
V-18 domain "thermodynamics" matches concept_id prefix phys.therm ✓
V-19 No framework/runtime/route/schema modifications ✓
V-20 Status READY ✓
```
