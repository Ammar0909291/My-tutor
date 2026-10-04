# Teaching Blueprint: phys.therm.energy-resources

## 0. Concept Profile
concept_id: phys.therm.energy-resources
name: Sources of Energy and Efficiency
domain: Thermal Physics (Physics)
difficulty: foundational (1)
bloom: understand
prerequisites: [phys.mech.power]
mastery_threshold: 0.7
estimated_hours: 2
cross_links: []
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (an electricity bill and a power-station diagram before efficiency numbers; difficulty ≤ 2)
status: READY

## 1. Learning Objective

[Boundary statement]
A student who achieves mastery demonstrates:
1. Classifies energy sources as renewable (solar, wind, hydro, tidal, geothermal, biomass) or non-renewable (coal, oil, natural gas, nuclear fuel), and traces most of them back to the Sun.
2. Explains that energy is never used up but transformed, and that "using" energy means degrading it to less useful forms, mostly heat in the surroundings; computes efficiency = useful energy out ÷ energy in — e.g. a coal power station receiving 1000 MJ of fuel energy and delivering 350 MJ of electrical energy is 35 % efficient, with 650 MJ leaving as heat.
3. Uses the kilowatt-hour as an energy unit (1 kWh = 3.6 MJ): a 2 kW heater running for 3 hours uses 6 kWh.
4. Compares sources on more than one axis — availability, cost, reliability and environmental impact — rather than ranking them as simply "good" or "bad".

A student who says "energy gets used up", or that "renewable means it has no environmental effect", has **NOT** achieved mastery — the first contradicts conservation of energy and the second makes every real energy decision look trivial.

## 2. Student State Matrix

| State | Why here | Tell-tale behaviour | Protocol |
|---|---|---|---|
| S0 | Can name sources but not classify them | Lists "electricity" as a source | Protocol A (Concrete) |
| S1 | Classification without the physics | Sorts sources correctly but cannot compute an efficiency | Protocol B (Counterexample-first) |
| S2-ENERGY-USED-UP | Energy consumed and gone | "The car used up the energy in the petrol" | Misconception Engine → then Protocol C |
| S2-RENEWABLE-MEANS-CLEAN | Renewable = no impact | "Dams and wind farms don't affect anything" | Misconception Engine → then Protocol C |
| S3 | Partial — efficiency fine, kWh or comparison not | Computes 35 % but cannot read a bill | Protocol C (Guided Questioning) |
| S6 | Anxiety on unit conversion | Freezes at kWh ↔ MJ | Protocol F (Low Pressure) |

## 3. Diagnostic Battery

DB-1 (prior-exposure check):
"Name three sources of the electricity that reaches your home."
  Names "the wire / the meter" or nothing → S0. Enter Protocol A (Concrete).
  Names coal, solar, hydro… → DB-2.

DB-2 (representation / misconception test):
"After a car journey the petrol is gone. Where did its energy go?"
  "Into motion, then heat in the air, road and engine — it still exists, spread out" → S3. Enter Protocol C.
  "Into making the car move" (stops there) → S1. Enter Protocol B.
  "It was used up — it no longer exists" → SIGNAL:MISCONCEPTION:MC-ENERGY-USED-UP. Enter Misconception Engine.
  Pause → add S6 flag; Protocol F if anxious, otherwise Protocol A.

DB-3 (comparison check — overlays):
"Does a hydroelectric dam have any environmental cost?"
  Names flooding of land, effects on rivers and fish → no flag.
  "No — it is renewable" → add SIGNAL:MISCONCEPTION:MC-RENEWABLE-MEANS-CLEAN (repair at TA-5).
  Confident and wrong on DB-2 → add S7 flag. Override to Protocol G.

## 4. Prerequisite Check

PD-1 (for `phys.mech.power`):
"A 2000 W heater runs for 10 s. How much energy does it transfer?"
  Cannot compute E = P t = 20,000 J → flag PREREQ-GAP-POWER.
  In-session minimum repair: one P06 (a kettle's rating plate, 2000 W) + one P34 ("joules per second") then resume. If power as energy per time is absent, schedule a `phys.mech.power` session (S4 route).

## 5. Protocol Library

### Protocol A — Concrete-First (primary)
Serves: S0
CPA entry: C
Entry condition: cannot classify sources.
Success exit: classifies sources, computes efficiency and kWh, and compares two sources on several criteria (P91 all 5 probes CORRECT).
Failure exit: on ENERGY-USED-UP → Misconception Engine, resume at TA-3. On unit anxiety → Protocol F.
Duration: ~50–60 min (may span 2 sessions; session_cap 7 TAs).

[TA-1: Where the Electricity Comes From]
P01
→ P04[content: "Electricity is a carrier, not a source. Let's follow it back to where its energy started."]
→ P06[content: a coal power station chain — coal (chemical) → burning (heat) → steam → turbine (kinetic) → generator (electrical)]
→ P14[predict: "Where did the energy stored in coal come from in the first place?"] → P55
→ success_path[ancient plants, which got it from sunlight] → P49 → P05[curiosity: "Which sources do NOT come from the Sun?"]

[TA-2: Renewable and Non-Renewable]
P02
→ P07[modality: a two-column chart — renewable: solar, wind, hydro, tidal, geothermal, biomass; non-renewable: coal, oil, natural gas, nuclear fuel; each tagged with its origin (Sun, Moon's gravity, Earth's interior, ancient sunlight, ancient stars)]
→ P16[compare: "Why is wood renewable but coal not, though both store solar energy in plants?"] → P55
→ success_path[timescale — trees regrow in decades, coal took millions of years] → P49

[TA-3: Energy Is Not Used Up]
P02
→ P41[diagnostic: "After the journey the petrol is gone. Is its energy gone?"] → P55
→ [if transformed and spread out as heat] → P49
→ [if "used up"] → SIGNAL:MISCONCEPTION:MC-ENERGY-USED-UP → misconception_repair_chain[MC-ENERGY-USED-UP]
→ P13[think-aloud: "Energy is conserved. What we lose is USEFULNESS: concentrated chemical energy ends up as warm air, which we cannot easily use again."]

[TA-4: Efficiency and the kWh]
P02
→ P06[content: power-station energy flow (Sankey) — 1000 MJ in, 350 MJ electrical out, 650 MJ heat to cooling towers and air]
→ P08[notation: "efficiency = useful energy out / energy in × 100 % ; 1 kWh = 1 kW × 1 h = 3.6 MJ"]
// GR-3 satisfied: P06/P07 and P13 preceded P08 (V-8 PASS)
→ P34[question: "Efficiency of the station? And a 2 kW heater for 3 h — how many kWh, how many MJ?"] → P55
→ success_path[35 %; 6 kWh = 21.6 MJ] → P49
→ failure_path → P50 → P51[diagnose: watts vs kilowatts, or hours vs seconds] → P52[narrow: "kW times hours gives kWh — what are the kW and the hours?"] → re-elicit P34 → P55

[TA-5: Comparing Sources]
P02
→ P17[contrast: "Solar has no fuel cost and no emissions while running. Why don't we run the whole grid on solar tonight?"] → P55
→ success_path[intermittent — no sunlight at night; storage needed] → P49
→ P34[question: "Give one environmental cost of a renewable source."] → P55
→ success_path[dams flood land and block fish; wind farms use land; batteries need mined materials] → P49

[TA-6: Formative Assessment]
P02
→ P90_expansion:
    P79[predict: "A 60 W filament bulb and a 10 W LED give the same light. Which is more efficient?"] → P55
    → P49 → P51[check: same useful output, less input?]
    → P35[open: "Explain why no power station can be 100 % efficient."] → P55

[TA-7: Mastery Gate]
P02
→ P91_expansion:
    P77[generate: "Design a mix of sources for a sunny, windy coastal town and say what happens at night with no wind."] → P55 → CORRECT
    → P76[transfer: "Electricity costs ₹8 per kWh. Cost of running a 1.5 kW air conditioner for 8 hours?"] → P55 → CORRECT
    → P75[boundary: "A machine claims 110 % efficiency. Possible?"] → P55 → CORRECT
    → P74[classify: "Nuclear fuel — renewable or non-renewable? Geothermal?"] → P55 → CORRECT
    → P78[explain: "If energy is conserved, why do we talk about an energy crisis?"] → P55 → CORRECT
→ P68 → P62[schedule: first retrieval in 1 day]

### Protocol B — Counterexample-First
Serves: S1
CPA entry: P
Entry condition: classifies, cannot compute.
Success exit: efficiency and kWh computed.
Failure exit: Misconception Engine, then Protocol C.
Key deltas from A: open with P02 → P41["1000 MJ of coal gives 350 MJ of electricity. Where are the other 650 MJ?"] → P54 (novel) → P55; then TA-4.

### Protocol C — Guided Questioning
Serves: S3, S2 (post-repair)
CPA entry: P
Entry condition: one part correct.
Success exit: all parts correct.
Failure exit: escalate to Protocol A TA-2.
Key deltas: enter at TA-4 or TA-5; run the gate.

### Protocol F — Low Pressure (S6)
Serves: S6
CPA entry: C
Entry condition: S6 flag confirmed.
Success exit: one classification and one kWh calculation done calmly.
Failure exit: shorten, bank one success, reschedule.
Key deltas: NO P28 (V-10 / GR-5); use the electricity bill (kWh only) before any MJ; P85 regulation_tail on every TA.

### Protocol G — Challenge-First (S7 override)
Serves: S7
CPA entry: P
Entry condition: confident "used up".
Success exit: revises after the 650 MJ question.
Failure exit: Misconception Engine.
Key deltas: open with Protocol B's missing-650-MJ question; let it sit (P55).

## 6. Misconception Engine

### MC-ENERGY-USED-UP: "Energy is used up and disappears"
trigger_signal: student says energy is consumed, destroyed or "gone" after a device or journey.
conflict_evidence [P28]: "The power station took in 1000 MJ and sent out 350 MJ of electricity. If energy can be used up, where are the other 650 MJ? Feel the warm water from the cooling towers."
bridge_text [P30]: "The 650 MJ are still there — as heat in the cooling water and air. Energy is never destroyed; it is transformed. What runs out is energy in a USEFUL, concentrated form, like the chemical energy in coal."
replacement_text [P31]: "Energy in = useful energy out + wasted energy (usually heat). Efficiency = useful out ÷ in, always below 100 %."
discrimination_pairs [P33]: ["energy conserved (1000 MJ in = 350 + 650 MJ out) vs useful energy decreased (350 MJ electricity)", "'the battery is flat' (no stored chemical energy left) vs 'the energy vanished' (false)"]
s6_path: skip P28; rub hands together and feel them warm — the "used" energy is right there.

### MC-RENEWABLE-MEANS-CLEAN: "Renewable sources have no environmental or practical drawbacks"
trigger_signal: student treats renewable as automatically impact-free, or reliable at all times.
conflict_evidence [P28]: "A big hydroelectric dam floods a whole valley behind it. Is that no effect at all?"
bridge_text [P30]: "Renewable means the source is replaced naturally on a human timescale — not that it has no cost. Dams flood land and block fish; wind farms take land and can harm birds; solar and wind stop when the Sun sets or the wind drops."
replacement_text [P31]: "Compare sources on availability, cost, reliability and impact. Every source has trade-offs; renewables avoid fuel use and running emissions, which is their big advantage."
discrimination_pairs [P33]: ["renewable (replenished: solar, wind, hydro) vs zero-impact (no source is)", "intermittent solar and wind vs steady hydro and geothermal"]
s6_path: skip P28; list one advantage and one drawback for each of three sources together.

## 7. Assessment Battery

| Probe | Item | Expected signal |
|---|---|---|
| P74 (classify) | "Nuclear fuel; geothermal?" | CORRECT = non-renewable; renewable |
| P74 (classify) | "LED vs filament bulb, same light — more efficient?" | CORRECT = LED |
| P75 (boundary) | "110 % efficiency?" | CORRECT = impossible; output cannot exceed input |
| P76 (transfer) | "1.5 kW for 8 h at ₹8/kWh" | CORRECT = 12 kWh, ₹96 |
| P77 (generate) | "Mix for a coastal town; night with no wind" | CORRECT = names storage or a steady backup |
| P78 (explain) | "Energy conserved — why a crisis?" | CORRECT = useful, concentrated sources run out |
| P79 (predict) | "Where does the station's missing energy go?" | CORRECT = heat in cooling water and air |

## 8. Mastery Gate (P91 expansion — canonical order P77→P76→P75→P74→P78)
P77: "Design a mix of sources for a sunny, windy coastal town and say what happens at night with no wind." → expected: CORRECT
P76: "Electricity costs ₹8 per kWh. Cost of running a 1.5 kW air conditioner for 8 hours?" → expected: CORRECT
P75: "A machine claims 110 % efficiency. Possible?" → expected: CORRECT
P74: "Nuclear fuel — renewable or non-renewable? Geothermal?" → expected: CORRECT
P78: "If energy is conserved, why do we talk about an energy crisis?" → expected: CORRECT

## 9. Retrieval Schedule (P89 expansion)
Interval 1 (1 day): "Name three renewable and three non-renewable sources."
Interval 2 (3 days): "A 2 kW heater for 3 hours — kWh and MJ?"
Interval 3 (7 days): "Where does the 'lost' energy of a power station go?"
Interval 4 (21 days): "Give one drawback of solar power and one of hydro."
Interval 5 (60 days): "Trace the energy in the food you ate back to its source."

---
V-check status:
- V-1 all 10 KG fields present ✓ · V-2 objective has NOT-clause ✓ · V-3 DB 2–3 Qs, every branch → a state ✓ · V-4 every plausible state (S0,S1,S2,S3,S6) has a Protocol ✓ · V-5 every Protocol has success AND failure exit ✓ · V-6 every TA opens P01/P02 ✓ · V-7 every elicitation (P34/P35/P41) followed by P55 ✓ · V-8 no P08 without prior P06/P07 (TA-4) ✓ · V-9 Schema Repair entered only via P41 gate (TA-3) ✓ · V-10 no P28 in S6 Protocol F ✓ · V-11 P91 terminal; P68 then P62 follow ✓ · V-12 no >3 consecutive C-category without E break ✓ · V-13 P54 before high-difficulty first-attempt (Protocol B TA-open) ✓ · V-14 assessment TA not first (TA-6/7) ✓ · V-15 Named Compounds (P90/P91) expanded ✓ · V-16 IC-1..20 pass ✓ · V-17 AIR invariants pass per TA ✓ · V-18 P90 (TA-6) before P91 (TA-7) ✓ · V-19 P91 has all 5 probes ✓ · V-20 P89 schedule authored with specific intervals ✓
status: READY
PACKAGE_READY
