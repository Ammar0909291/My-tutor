# Teaching Blueprint — phys.therm.first-law

## Component 0 — Concept Identity

```yaml
concept_id: phys.therm.first-law
name: First Law of Thermodynamics
domain: thermodynamics
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.therm.internal-energy
  - phys.mech.work
mastery_threshold: 0.80
estimated_hours: 5
cross_links:
  - phys.therm.thermodynamic-processes
  - phys.therm.heat-engines
  - phys.therm.second-law
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY
```

---

## Component 1 — Narrative Spine

**Hook (S0 novice):** A steam engine takes in heat from burning coal and produces mechanical work. A diesel engine compresses air until it's hot enough to ignite fuel without a spark. A refrigerator takes in electrical work and moves heat from cold food to a warm room. In all of these — and in every thermodynamic process ever observed — energy is conserved. The First Law is thermodynamics' statement of conservation of energy: ΔU = Q + W.

**Conceptual arc:**
1. First Law statement: ΔU = Q + W, where Q = heat absorbed by system, W = work done ON the system. Equivalently: ΔU = Q − W_by, where W_by = work done BY the system.
2. Sign conventions (critical):
   - Q > 0: heat flows INTO system; Q < 0: heat flows out.
   - W > 0 (W_on convention): work done ON system (compression); W < 0: work done by system (expansion).
   - W_by = −W_on = PΔV for quasi-static process at constant pressure.
3. Work by gas at constant pressure: W_by = PΔV = P(V₂ − V₁). For expansion: V₂ > V₁ → W_by > 0.
4. General work: W_by = ∫P dV. On a P-V diagram, W_by = area under the curve. Cycle: W_net = enclosed area.
5. Special processes:
   - **Isothermal** (ΔT = 0 → ΔU = 0 for ideal gas): Q = W_by.
   - **Isochoric** (ΔV = 0 → W = 0): ΔU = Q = nC_vΔT.
   - **Isobaric** (ΔP = 0): W_by = PΔV = nRΔT; Q = nC_pΔT; ΔU = nC_vΔT.
   - **Adiabatic** (Q = 0): ΔU = W_on = −W_by. For ideal gas: TV^(γ−1) = constant; PV^γ = constant.
6. P-V diagram: the graphical language of thermodynamic cycles. State (P, V, T) is a point; process is a curve; cycle is a closed loop.
7. First Law for cycles: ΔU_cycle = 0 (returns to same state). Therefore Q_net = W_net.

**Closing synthesis:** The First Law says energy cannot be created or destroyed — only converted. Heat and work are two currencies that both deposit into or withdraw from the internal energy account. The power of the First Law is that it applies to every process: knowing any two of Q, W, ΔU determines the third. For cycles, it constrains engines: they cannot output more work than the net heat input.

---

## Component 2 — Worked Examples

### WE-1 (Concrete — isobaric process)

**Scenario:** 1.5 mol of diatomic ideal gas (C_p = (7/2)R) is heated at constant pressure P = 2.0 × 10⁵ Pa from V₁ = 10 L to V₂ = 14 L. Find Q, W_by, and ΔU.

**Step 1 — Work done by gas.**
W_by = PΔV = (2.0 × 10⁵)(4.0 × 10⁻³) = 800 J.

**Step 2 — Temperature change.**
Using PV = nRT: ΔT = PΔV/(nR) = 800 / (1.5 × 8.314) = 800 / 12.47 = 64.2 K.

**Step 3 — Heat absorbed.**
Q = nC_pΔT = 1.5 × (7/2)(8.314) × 64.2 = 1.5 × 29.10 × 64.2 = 2803 J.

**Step 4 — ΔU from first law.**
ΔU = Q − W_by = 2803 − 800 = 2003 J.

**Cross-check:** ΔU = nC_vΔT = 1.5 × (5/2)(8.314) × 64.2 = 1.5 × 20.785 × 64.2 = 2003 J. ✓

**Answer:** Q = 2803 J; W_by = 800 J; ΔU = 2003 J.

---

### WE-2 (Bridging — adiabatic compression)

**Scenario:** A diesel engine compresses 2.0 L of air (γ = 1.40) to 0.125 L adiabatically. Initial temperature = 300 K. Find the final temperature.

**Adiabatic relation:** TV^(γ−1) = constant → T₁V₁^(γ−1) = T₂V₂^(γ−1).

**Step 1:**
T₂ = T₁ × (V₁/V₂)^(γ−1) = 300 × (2.0/0.125)^0.40 = 300 × (16)^0.40.

**Compute (16)^0.40:**
16^0.40 = e^(0.40 × ln16) = e^(0.40 × 2.773) = e^1.109 = 3.031.

**Step 2:**
T₂ = 300 × 3.031 = 909 K ≈ 909 K = 636°C.

**Why it works:** At 636°C, diesel fuel auto-ignites — no spark plug needed. The First Law tells us the work done on the air goes entirely into increasing U (Q = 0 adiabatic), which raises T dramatically.

**Answer:** T₂ ≈ 909 K = 636°C.

---

### WE-3 (Abstract — P-V cycle work and heat)

**Scenario:** A gas undergoes a rectangular cycle on a P-V diagram: A→B (isobaric, P = 3 × 10⁵ Pa, V: 1→3 L); B→C (isochoric, P: 3→1 × 10⁵ Pa, V = 3 L); C→D (isobaric, P = 1 × 10⁵ Pa, V: 3→1 L); D→A (isochoric, P: 1→3 × 10⁵ Pa, V = 1 L). Find W_net.

**W_by for each segment:**
A→B: W = PΔV = 3 × 10⁵ × 2 × 10⁻³ = 600 J. (expansion at high P)
B→C: W = PΔV = 0. (isochoric)
C→D: W = 1 × 10⁵ × (−2 × 10⁻³) = −200 J. (compression at low P)
D→A: W = 0. (isochoric)

**W_net = 600 + 0 − 200 + 0 = 400 J.**

**Graphical check:** W_net = area enclosed by rectangle = ΔP × ΔV = (3 − 1) × 10⁵ × (3 − 1) × 10⁻³ = 2 × 10⁵ × 2 × 10⁻³ = 400 J. ✓

**First Law for cycle:** ΔU_cycle = 0 → Q_net = W_net = 400 J. The engine absorbs 400 J more heat than it rejects per cycle — and outputs 400 J of net work.

---

## Component 3 — Misconception Engine

### MC-ADIABATIC-MEANS-CONSTANT-TEMPERATURE

**Trigger signal:** Student says "adiabatic means no heat, so temperature doesn't change — it's the same as isothermal."

**Conflict evidence [P28]:** "WE-2: diesel compression is adiabatic — no heat enters. Temperature goes from 300 K to 909 K. How? Is Q = 0 the same as ΔT = 0?"

*Q = 0 means no heat transfer. Temperature can still change if work is done. ΔU = W_on — work adds to internal energy, which raises T.*

**Bridge text [P30]:** "Isothermal = constant T (requires heat exchange to maintain T as work is done). Adiabatic = no heat exchange (Q = 0), but T can change — and does, dramatically. In adiabatic compression, all the work goes into ΔU → T rises. In adiabatic expansion, gas does work using its own internal energy → T falls."

**Replacement text [P31]:** "Adiabatic ≠ isothermal. Two separate conditions:
- Isothermal: ΔT = 0 → ΔU = 0 (for ideal gas) → Q = W_by. Requires heat exchange.
- Adiabatic: Q = 0 → ΔU = W_on. Temperature changes freely; no heat exchange.
Their PV diagrams differ: isothermal: PV = constant (curve); adiabatic: PV^γ = constant (steeper curve)."

**Discrimination pairs [P33]:**
- "An ideal gas in a perfectly insulated container (no heat loss) is compressed. Does its temperature rise?" → Yes — adiabatic compression raises T (ΔU = W_on > 0).
- "A gas is compressed in a cylinder that conducts heat to the surroundings slowly. Does its temperature stay constant?" → Approximately isothermal if compression is very slow (heat leaks out to maintain T).

**s6_path:** "Adiabatic = insulated (no Q). Isothermal = thermostat (no ΔT). They're opposite strategies — one blocks heat, the other pumps it."

---

### MC-WORK-IS-ONLY-MECHANICAL

**Trigger signal:** Student applies W = Fd directly to gas processes, or doesn't recognise W = PΔV as the thermodynamic work.

**Conflict evidence [P28]:** "A piston of area A = 0.01 m² is pushed outward by gas pressure P = 2 × 10⁵ Pa through distance d = 0.05 m. Calculate W using F = PA, then d × F. Compare to W = PΔV."

*F = PA = 2 × 10⁵ × 0.01 = 2000 N. W = Fd = 2000 × 0.05 = 100 J. ΔV = A × d = 0.01 × 0.05 = 5 × 10⁻⁴ m³. W = PΔV = 2 × 10⁵ × 5 × 10⁻⁴ = 100 J. ✓ Same.*

**Bridge text [P30]:** "W = PΔV is mechanical work at a surface — it IS F × d, just rewritten using P = F/A and ΔV = A × d. The thermodynamic work is the generalization: for any gas expansion against a pressure, W = ∫P dV, which for constant P reduces to PΔV."

**Replacement text [P31]:** "Thermodynamic work W_by = ∫P dV. On a P-V diagram: area under the process curve. At constant P: W_by = PΔV. For a cycle: net work = enclosed area. The integral form handles variable-pressure processes (isothermal: W = nRT ln(V₂/V₁); adiabatic: W = −ΔU)."

**Discrimination pairs [P33]:**
- "Isothermal expansion of 1 mol ideal gas from 10 L to 20 L at T = 300 K. Find W_by." → W_by = nRT ln(V₂/V₁) = 1 × 8.314 × 300 × ln(2) = 1729 J. Cannot use PΔV (P varies).
- "On a P-V diagram, which process does more work for the same ΔV: high-P expansion or low-P expansion?" → High-P — area under curve is larger.

**s6_path:** "W = PΔV for constant pressure. W = area under P-V curve in general. Always identify whether P is constant before using the simple formula."

---

## Component 4 — Diagnostic Probe Set

**P4-a (prereq: sign convention):** A gas absorbs 500 J of heat and is compressed, with 200 J of work done ON it. Find ΔU.
*ΔU = Q + W_on = 500 + 200 = 700 J.*

**P4-b (isobaric):** 1.0 mol monatomic ideal gas heated at constant P from 300 K to 400 K. Find Q, W_by, ΔU.
*W_by = nRΔT = 1 × 8.314 × 100 = 831 J. Q = nC_pΔT = 1 × (5/2)(8.314) × 100 = 2079 J (C_p = C_v + R = (3/2+1)R = (5/2)R). ΔU = Q − W_by = 2079 − 831 = 1248 J. Check: ΔU = nC_vΔT = 1 × (3/2)(8.314) × 100 = 1247 J ✓.*

**P4-c (adiabatic):** 2.0 mol ideal gas (γ = 5/3) compressed adiabatically: ΔU = 800 J. What is the temperature change?
*ΔU = nC_vΔT → ΔT = ΔU/(nC_v) = 800/(2.0 × (3/2)(8.314)) = 800/24.94 = 32.1 K.*

**P4-d (isothermal):** An ideal gas expands isothermally, doing 300 J of work. How much heat is absorbed?
*Isothermal → ΔU = 0 → Q = W_by = 300 J.*

**P4-e (cycle):** A gas cycle encloses an area of 500 J on a P-V diagram. What is Q_net for this cycle?
*ΔU_cycle = 0 → Q_net = W_net = 500 J.*

---

## Component 5 — Socratic Thread

**Turn 1 [P41 diagnostic]:** "Write the First Law from memory. Define each symbol."

*ΔU = Q + W (or ΔU = Q − W_by). Symbols: ΔU = change in internal energy; Q = heat absorbed by system; W = work done on system.*

**Turn 2 [P06 concrete anchor]:** "Steam engine: heat Q absorbed from boiler, work W_by done on piston. Can you output more work than heat absorbed? What does the First Law say?"

*ΔU = Q − W_by. For cycle ΔU = 0 → W_by = Q_net. Can't output more work than net heat input.*

**Turn 3 [P28 conflict — MC-ADIABATIC-IS-ISOTHERMAL]:** "Diesel compressor: Q = 0, gas compressed. Does temperature change? Calculate WE-2."

*Q = 0, W_on > 0 → ΔU = W_on > 0 → T rises to 909 K. Adiabatic ≠ isothermal.*

**Turn 4 [P30 bridge]:** "Two separate conditions: adiabatic (Q=0, T can change) vs. isothermal (ΔT=0, requires Q). Draw their P-V curves — which is steeper?"

*Adiabatic steeper (PV^γ vs PV = constant; γ > 1).*

**Turn 5 [P51 check-in]:** "List the four standard processes and their defining constraint."

*Isothermal (T = const); isochoric (V = const); isobaric (P = const); adiabatic (Q = 0).*

**Turn 6 [P28 conflict — MC-WORK-IS-ONLY-MECHANICAL]:** "Isothermal expansion of gas: P changes throughout. Why can't we use W = PΔV?"

*P is not constant — must use W = ∫PdV = nRT ln(V₂/V₁). PΔV is only valid for constant P.*

**Turn 7 [P52 narrow]:** "WE-3: rectangular P-V cycle. Before calculating, draw the cycle. Which segments do positive work? Negative? Which two cancel into W_net?"

*A→B: expansion at high P → positive (large). C→D: compression at low P → negative (small). Net = difference.*

**Turn 8 [P62 retrieval seed]:** "WE-3 from memory: calculate W_net = enclosed area for ΔP = 2 × 10⁵, ΔV = 2 × 10⁻³."

*W_net = ΔP × ΔV = 2 × 10⁵ × 2 × 10⁻³ = 400 J.*

**Turn 9 [P36 mastery probe]:** "P4-b: 1 mol monatomic gas, constant P, 300→400 K. Three steps: find W_by, then Q, then verify ΔU from both C_v route and first-law route."

*W_by = nRΔT = 831 J. Q = nC_pΔT = (5/2R)(1)(100) = 2079 J. ΔU = Q − W = 1248 J. Check: nC_vΔT = (3/2R)(1)(100) = 1247 J ✓.*

---

## Component 6 — Session Flow

```
[P01 open] → [P41 diagnostic: First Law from memory] → [P06 anchor: steam engine energy balance]
→ [MC-ADIABATIC-IS-ISOTHERMAL: P28 conflict (diesel compression) → P30 bridge → P31 → P33]
→ [WE-1: isobaric process — Q, W, ΔU all three]
→ [P51 check-in: four processes and their constraints]
→ [WE-2: adiabatic compression — diesel temperature]
→ [MC-WORK-IS-ONLY-MECHANICAL: P28 conflict (isothermal ∫PdV) → P30 → P31 → P33]
→ [P52 narrow: P-V diagram — W = area under curve; cycle W_net = enclosed area]
→ [WE-3: rectangular P-V cycle — W_net calculation]
→ [P62 retrieval seed: enclosed area formula]
→ [P36 mastery probe: P4-b three-step calculation]
→ [P89 retrieval schedule: Day 1, Day 4, Day 14]
→ [P91 mastery gate: 80% on P4-a through P4-e]
→ [P85 regulation tail]
→ [P68 close]
```

---

## Component 7 — Differentiation Variants

**S0 (novice):** Start with the sign convention carefully — the most common early error. Provide a table: process, constraint, which terms simplify. Focus on WE-1 (isobaric — all three terms non-zero) and the isothermal/adiabatic conceptual distinction. Skip WE-3 cycle.

**S1 (knows ΔU = Q + W, no process fluency):** Force process identification before calculation: "Which process is this? What does that imply about Q, W, or ΔU?" Only after identification should they substitute.

**S4 (prereq gap — internal energy weak):** Return to phys.therm.internal-energy. The first law requires knowing ΔU = nC_vΔT for ideal gas and the state function property. P4-a sign convention test reveals if this is secure.

**S6 (math anxiety):** Provide the four-process table with simplified equations for each. Focus on P4-a (sign convention only) and P4-b (isobaric — structured calculation). Skip WE-3 cycle and adiabatic PVγ relation.

**S7 (overconfident):** Lead with WE-3 (P-V cycle — requires tracking signs for all four segments) and P4-c (adiabatic — requires working backward from ΔU to ΔT). Most S7 students make sign errors on cycles.

---

## Component 8 — Retrieval Schedule

```yaml
retrieval_events:
  - offset_days: 1
    format: P4-a (sign convention) + P4-b (isobaric three-term calculation)
  - offset_days: 4
    format: P4-c (adiabatic ΔT from ΔU) + P4-d (isothermal Q = W)
  - offset_days: 14
    format: P4-e (cycle Q_net = W_net) + "draw P-V diagram for: isobaric expansion then isothermal compression then isochoric return; identify which segment does positive work"
```

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly: phys.therm.first-law ✓
V-2  prerequisites listed in KG: phys.therm.internal-energy, phys.mech.work ✓
V-3  bloom verb matches level (apply): "apply … calculate … find … verify" ✓
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
V-16 cross_links pedagogically justified: thermodynamic-processes, heat-engines, second-law ✓
V-17 difficulty number 4 consistent with bloom=apply and estimated_hours=5 ✓
V-18 domain "thermodynamics" matches concept_id prefix phys.therm ✓
V-19 No framework/runtime/route/schema modifications ✓
V-20 Status READY ✓
```
