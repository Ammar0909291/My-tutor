# Teaching Blueprint — phys.therm.heat-engines

## Component 0 — Concept Identity

```yaml
concept_id: phys.therm.heat-engines
name: Heat Engines
domain: thermodynamics
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.therm.thermodynamic-processes
mastery_threshold: 0.80
estimated_hours: 4
cross_links:
  - phys.therm.carnot-cycle
  - phys.therm.second-law
  - phys.therm.refrigerators
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY
```

---

## Component 1 — Narrative Spine

**Hook (S0 novice):** Every car engine, every steam turbine, every jet engine runs on the same principle: absorb heat at high temperature, convert part of it to mechanical work, and reject the rest at lower temperature. No heat engine can convert heat entirely into work without waste — this is not a design failure, it is a law of nature. The efficiency of any heat engine is bounded above by a number that depends only on two temperatures.

**Conceptual arc:**
1. Heat engine definition: a device that operates in a cycle, absorbs heat Q_H from a hot reservoir at T_H, converts part of it to work W_out, and rejects heat Q_C to a cold reservoir at T_C.
2. First law for a cycle: ΔU_cycle = 0 → W_out = Q_H − Q_C (net work = net heat absorbed).
3. Thermal efficiency: η = W_out/Q_H = 1 − Q_C/Q_H. Always η < 1 (Q_C > 0 required by second law).
4. Second law implication (preview): Q_C can never be zero for a real engine — heat cannot be fully converted to work in a cycle without some waste (Kelvin-Planck statement of second law).
5. Steam engine cycle (approximate): heat water to steam (isobaric), expand steam through piston (adiabatic), cool exhaust steam (isochoric), pump water back to boiler (isobaric). Typical efficiency: 30–40%.
6. Internal combustion engine (Otto cycle): intake, isentropic compression, isochoric combustion, isentropic expansion, isochoric exhaust. Efficiency: η_Otto = 1 − 1/r^(γ−1) where r = compression ratio.
7. Coefficient of performance (COP) for heat pump: COP_HP = Q_H/W_in = Q_H/(Q_H−Q_C).
8. Power output: P = W_out/t = Q_H/t × η. A power plant rated at 1 GW electrical might consume 2.5 GW of thermal input (40% efficiency) and reject 1.5 GW as waste heat.

**Closing synthesis:** Heat engines are the conversion devices between thermal and mechanical energy. Their efficiency is bounded by the second law (Carnot limit) — no engine operating between T_H and T_C can exceed η_Carnot = 1 − T_C/T_H. Real engines fall below this limit because of friction, heat losses, and irreversibility. The practical engineering goal is to approach, not exceed, the Carnot limit.

---

## Component 2 — Worked Examples

### WE-1 (Concrete — engine efficiency)

**Scenario:** A heat engine absorbs 1000 J from a hot reservoir and rejects 600 J to a cold reservoir per cycle. Find: (a) W_out, (b) η, (c) power if cycle takes 0.5 s.

**(a) Work output:**
W_out = Q_H − Q_C = 1000 − 600 = 400 J.

**(b) Efficiency:**
η = W_out/Q_H = 400/1000 = 0.40 = 40%.

**(c) Power:**
P = W_out/t = 400/0.5 = 800 W.

**Answer:** W_out = 400 J; η = 40%; P = 800 W.

---

### WE-2 (Bridging — Otto cycle efficiency)

**Scenario:** A petrol engine has compression ratio r = 8.0 and γ = 1.40 (diatomic air). Find the Otto cycle efficiency.

**Formula:** η_Otto = 1 − 1/r^(γ−1) = 1 − 1/(8.0)^0.40.

**(8.0)^0.40 = e^(0.40 × ln8) = e^(0.40 × 2.079) = e^0.832 = 2.298.**

η_Otto = 1 − 1/2.298 = 1 − 0.435 = 0.565 = 56.5%.

**Caveat:** Real petrol engines achieve 25–35% efficiency, far below the Otto ideal. Reasons: friction, incomplete combustion, heat losses through cylinder walls, valve timing, and non-ideal gas behaviour. The Otto formula gives the thermodynamic upper bound for this cycle geometry.

**Answer:** η_Otto = 56.5% (theoretical; actual ≈ 25–35%).

---

### WE-3 (Abstract — energy sankey for a power plant)

**Scenario:** A coal power plant operates at T_H = 700°C = 973 K, T_C = 30°C = 303 K. Actual efficiency η_actual = 38%. Coal energy input = 1000 MW thermal.

(a) Find Carnot efficiency.
(b) Find actual electrical output.
(c) Find waste heat rejected.
(d) Find "second-law efficiency" (actual/Carnot).

**(a) Carnot:**
η_Carnot = 1 − T_C/T_H = 1 − 303/973 = 1 − 0.311 = 0.689 = 68.9%.

**(b) Electrical output:**
W_out = η_actual × Q_H = 0.38 × 1000 = 380 MW.

**(c) Waste heat:**
Q_C = Q_H − W_out = 1000 − 380 = 620 MW.

**(d) Second-law efficiency:**
η₂ = η_actual/η_Carnot = 0.38/0.689 = 0.551 = 55.1%.

**Interpretation:** The plant operates at 55% of its thermodynamic maximum. The remaining 45% loss from Carnot is due to irreversibilities — heat transfer across finite temperature differences, friction, leakage.

**Answer:** η_Carnot = 68.9%; W_out = 380 MW; Q_C = 620 MW; second-law efficiency = 55%.

---

## Component 3 — Misconception Engine

### MC-EFFICIENCY-EQUALS-ONE-MINUS-WASTE

**Trigger signal:** Student writes η = 1 − Q_C (forgetting to divide by Q_H), or computes Q_C/Q_H incorrectly.

**Conflict evidence [P28]:** "Engine absorbs Q_H = 2000 J, rejects Q_C = 1200 J. What is η? Calculate two ways: (a) W_out/Q_H, (b) 1 − Q_C/Q_H. Check they agree."

*(a) W_out = 800 J; η = 800/2000 = 0.40. (b) η = 1 − 1200/2000 = 1 − 0.60 = 0.40. ✓ Same. Key: must divide Q_C by Q_H, not just subtract Q_C.*

**Bridge text [P30]:** "η = W_out/Q_H: efficiency is work obtained per unit of heat input. The formula η = 1 − Q_C/Q_H follows immediately from W_out = Q_H − Q_C. Both Q_H and Q_C must be divided by Q_H — it's a ratio, not a simple subtraction."

**Replacement text [P31]:** "Two equivalent definitions: η = W_out/Q_H = (Q_H − Q_C)/Q_H = 1 − Q_C/Q_H. Common error: η = 1 − Q_C (wrong units — η is dimensionless, Q_C is in joules). Always verify: η between 0 and 1."

**Discrimination pairs [P33]:**
- "Engine: Q_H = 500 J, Q_C = 300 J. η = ?" → η = 1 − 300/500 = 0.40 = 40%. NOT 1 − 300 = −299 (nonsense).
- "Engine: η = 35%, Q_H = 800 J. Find Q_C." → W_out = 0.35 × 800 = 280 J. Q_C = 800 − 280 = 520 J.

**s6_path:** "η is a ratio — it's always between 0 and 1 (or 0% and 100%). If your answer is outside this range, you've made a unit error."

---

### MC-100-PERCENT-EFFICIENCY-IS-POSSIBLE

**Trigger signal:** Student says "a perfectly frictionless engine could convert all heat to work — efficiency could reach 100%."

**Conflict evidence [P28]:** "If Q_C = 0 (100% efficiency): where does the heat rejected go? The engine must discharge heat to the cold reservoir to complete its cycle — without discharge, what happens to the working fluid at the end of the cycle?"

*If Q_C = 0, the working fluid can't return to its initial state (temperature would keep rising) — the cycle breaks. The second law says this is impossible: a cyclic engine MUST reject some heat.*

**Bridge text [P30]:** "Friction is not the only limit on efficiency — the second law sets a fundamental ceiling even for frictionless engines. The Carnot efficiency η = 1 − T_C/T_H is the maximum for any engine between T_H and T_C, regardless of friction. Approaching η = 100% would require T_C → 0 K (absolute zero) or T_H → ∞, both physically unachievable."

**Replacement text [P31]:** "100% efficiency requires Q_C = 0, which violates the Kelvin-Planck form of the second law: 'No engine operating in a cycle can convert heat entirely into work.' Even in the ideal (reversible) case, efficiency is bounded by η_Carnot = 1 − T_C/T_H < 1. Real engines are further below this due to irreversibility."

**Discrimination pairs [P33]:**
- "T_H = 1000 K, T_C = 300 K: what is the maximum possible η?" → η_Carnot = 1 − 300/1000 = 70%.
- "An engine claims 95% efficiency between T_H = 500 K and T_C = 300 K. Is this possible?" → η_Carnot = 1 − 300/500 = 40%. No — the claim violates the second law.

**s6_path:** "The Carnot efficiency is the absolute ceiling. Not a design target — a fundamental law."

---

## Component 4 — Diagnostic Probe Set

**P4-a (prereq: first law for cycle):** A heat engine completes one cycle. What is ΔU for the cycle?
*ΔU_cycle = 0 — returns to same state.*

**P4-b (efficiency calculation):** An engine absorbs 800 J and does 280 J of work. Find η and Q_C.
*η = 280/800 = 35%. Q_C = 800 − 280 = 520 J.*

**P4-c (power):** An engine with η = 25% absorbs 4000 J/s of heat. What is the power output?
*W_out/s = 0.25 × 4000 = 1000 W = 1 kW.*

**P4-d (Carnot bound):** T_H = 600 K, T_C = 300 K. Find η_Carnot. Can a real engine between these temperatures have η = 60%?
*η_Carnot = 1 − 300/600 = 50%. No — real engine must be below Carnot limit.*

**P4-e (Otto efficiency):** Find η_Otto for r = 10, γ = 1.40.
*η = 1 − 1/10^0.4 = 1 − 1/2.512 = 1 − 0.398 = 60.2%.*

---

## Component 5 — Socratic Thread

**Turn 1 [P41 diagnostic]:** "A car engine burns fuel (absorbs heat Q_H) and drives the wheels (does work W). Does all the heat become work? Where does the rest go?"

*No — exhaust/radiator reject Q_C. W_out = Q_H − Q_C.*

**Turn 2 [P06 concrete anchor]:** "WE-1: Q_H = 1000 J, Q_C = 600 J. Calculate W_out and η."

*W_out = 400 J; η = 40%.*

**Turn 3 [P28 conflict — MC-EFFICIENCY-EQUALS-ONE-MINUS-WASTE]:** "Engine: Q_H = 500 J, Q_C = 300 J. What is η? Show two calculation routes — do they agree?"

*η = 200/500 = 40% = 1 − 300/500 = 40%. Both agree.*

**Turn 4 [P30 bridge]:** "η is dimensionless — it's a ratio of energies. If you compute η = 1 − Q_C (without dividing by Q_H), what units would η have?"

*Joules — nonsensical. Efficiency is 0–1.*

**Turn 5 [P51 check-in]:** "First law for cycle: ΔU = 0. Write the implication for Q_net and W_net."

*Q_net = W_net. Net work = net heat absorbed.*

**Turn 6 [P28 conflict — MC-100-PERCENT-EFFICIENCY]:** "Can a frictionless engine achieve 100% efficiency? What happens to Q_C?"

*Q_C would have to be zero — but then working fluid can't return to initial state. Second law forbids it.*

**Turn 7 [P52 narrow]:** "Carnot efficiency formula: η = 1 − T_C/T_H. For T_H = 1000 K and T_C = 300 K: what is the max η?"

*η = 1 − 0.3 = 70%. No real engine can exceed this.*

**Turn 8 [P62 retrieval seed]:** "WE-2: Otto cycle, r = 8, γ = 1.4. Recall the formula and compute η."

*η = 1 − 1/8^0.4 = 1 − 1/2.298 = 56.5%.*

**Turn 9 [P36 mastery probe]:** "A steam plant: T_H = 800 K, T_C = 310 K, η_actual = 42%. Q_H = 500 MW. Find: W_out, Q_C, η_Carnot, second-law efficiency."

*W_out = 0.42 × 500 = 210 MW. Q_C = 290 MW. η_Carnot = 1−310/800 = 61.25%. η₂ = 42/61.25 = 68.6%.*

---

## Component 6 — Session Flow

```
[P01 open] → [P41 diagnostic: car engine heat balance] → [P06 anchor: WE-1 efficiency calculation]
→ [MC-EFFICIENCY-EQUALS-ONE-MINUS-WASTE: P28 conflict → P30 bridge → P31 → P33]
→ [WE-1: engine Q_H, Q_C, W_out, η, P]
→ [P51 check-in: first law for cycle → Q_net = W_net]
→ [MC-100-PERCENT-EFFICIENCY: P28 conflict → P30 bridge → P31 → P33]
→ [WE-2: Otto cycle efficiency formula]
→ [P52 narrow: Carnot limit η = 1 − T_C/T_H]
→ [P62 retrieval seed: Otto cycle r=8]
→ [WE-3: power plant Sankey — Carnot vs actual efficiency]
→ [P36 mastery probe: steam plant full analysis]
→ [P89 retrieval schedule: Day 1, Day 4, Day 14]
→ [P91 mastery gate: 80% on P4-a through P4-e]
→ [P85 regulation tail]
→ [P68 close]
```

---

## Component 7 — Differentiation Variants

**S0 (novice):** Start with the car engine story. Build η = W_out/Q_H from scratch. Skip Otto cycle derivation (WE-2); use η_Otto as a given result. Focus on WE-1 (three-step calculation) and P4-b.

**S1 (knows η formula, no Carnot awareness):** Introduce Carnot immediately after P4-b: "Is 40% good? Compare to T_H = 900 K, T_C = 300 K Carnot bound of 67%." Forces them to contextualise efficiency against the thermodynamic limit.

**S4 (prereq gap — thermodynamic processes weak):** Return to phys.therm.thermodynamic-processes. Otto cycle analysis requires recognising adiabatic and isochoric segments; if these are not secure, WE-2 is inaccessible.

**S6 (math anxiety):** Focus on WE-1 (simple arithmetic) and P4-b/P4-c. Provide the Carnot formula as a given. Skip WE-2 (Otto — needs exponent calculation). P4-d conceptual question (real vs Carnot) is accessible without heavy computation.

**S7 (overconfident):** Lead with WE-3 (Sankey — requires Carnot calculation, second-law efficiency, and Sankey diagram construction). Then demand: "For what T_C would this plant reach 50% actual efficiency if the second-law efficiency is fixed at 68.6%?" (Reverse calculation: η_Carnot_new = 50/0.686 = 72.9% → T_C/T_H = 0.271 → T_C = 217 K.)

---

## Component 8 — Retrieval Schedule

```yaml
retrieval_events:
  - offset_days: 1
    format: P4-a (ΔU for cycle) + P4-b (η and Q_C calculation)
  - offset_days: 4
    format: P4-c (power from η and Q_H rate) + P4-d (Carnot bound check)
  - offset_days: 14
    format: P4-e (Otto cycle η) + "power plant: T_H = 600°C, T_C = 20°C, η_actual = 35%, Q_H = 200 MW — find W_out, Q_C, η_Carnot, second-law efficiency"
```

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly: phys.therm.heat-engines ✓
V-2  prerequisites listed in KG: phys.therm.thermodynamic-processes ✓
V-3  bloom verb matches level (apply): "apply … calculate … find … compare" ✓
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
V-16 cross_links pedagogically justified: carnot-cycle, second-law, refrigerators ✓
V-17 difficulty number 4 consistent with bloom=apply and estimated_hours=4 ✓
V-18 domain "thermodynamics" matches concept_id prefix phys.therm ✓
V-19 No framework/runtime/route/schema modifications ✓
V-20 Status READY ✓
```
