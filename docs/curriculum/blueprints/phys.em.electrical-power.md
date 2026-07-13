# Teaching Blueprint — phys.em.electrical-power

## Component 0 — Concept Identity & Metadata

```yaml
concept_id: phys.em.electrical-power
name: Electrical Power
domain: electromagnetism
difficulty:
  label: developing
  number: 3
bloom: apply
prerequisites:
  - phys.em.ohms-law
mastery_threshold: 0.80
estimated_hours: 3
cross_links:
  - phys.em.dc-circuits
  - phys.em.resistivity
  - phys.em.emf
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 3 → C with full CPA track)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Tier)

### Tier 1 — Concrete / Intuitive (S0)

A 100 W light bulb uses 100 joules of energy every second. A 2 kW electric kettle uses 2000 joules per second. **Electrical power** is the rate at which electrical energy is converted — to heat, light, or mechanical work. Three equivalent formulas: P = IV, P = I²R, P = V²/R. Your electricity bill is paid for energy (kilowatt-hours): 1 kWh = 3.6 MJ, costing a few cents per hour of 1000 W use.

### Tier 2 — Conceptual / Mechanistic (S1)

**Power formulas:**
$$P = IV = I^2R = \frac{V^2}{R}$$

Derived from: work done moving charge Q through voltage V is W = QV; power = W/t = (Q/t)V = IV.

Using Ohm's Law (V = IR):
P = IV = I(IR) = I²R
P = IV = (V/R)V = V²/R

**Units:** watt (W) = J/s. 1 W = 1 V × 1 A.

**Which formula to use:**
- P = IV: when both I and V are known.
- P = I²R: when I and R are known (avoids computing V first).
- P = V²/R: when V and R are known (avoids computing I first).

**Joule heating (thermal energy):** Electrical power dissipated in a resistor becomes heat. Rate: P = I²R. Over time: Q_heat = I²Rt (joules). This is why resistors can overheat — always check power rating.

**Power rating of appliances:** A rated wattage is at a specified voltage. A 60 W / 240 V lamp: R = V²/P = 240²/60 = 960 Ω. At 120 V: P = V²/R = 120²/960 = 15 W (only 15 W, not 60 W — designed for 240 V).

**Household energy calculation:**
Energy = P × t. Cost = Energy × price per kWh.
10 A at 230 V for 2 hours: E = (10)(230)(7200) = 16.56 MJ = 4.6 kWh.

**Power in series vs. parallel:**
- Series: same I → P_k = I²R_k ∝ R_k (higher R → more power).
- Parallel: same V → P_k = V²/R_k ∝ 1/R_k (lower R → more power).

### Tier 3 — Formal

**Maximum power transfer theorem:** For a source with internal resistance R_int connected to external load R_L, maximum power transferred to load occurs when R_L = R_int. At matching: P_max = V_oc²/(4R_int), where V_oc is open-circuit voltage. Efficiency at max power transfer = 50%.

**Power density (specific power):** For practical design, P/V (watt density), P/A (watt per square metre), or P/m (watt per metre for line heating) are important constraints.

**AC power:** For resistive loads, P_avg = I_rms × V_rms = I_rms²R = V_rms²/R (same as DC formulas but with rms values). For reactive loads (L, C): P_avg = V_rms I_rms cosφ, where φ is the phase angle (power factor covered in phys.em.ac-basics).

---

## Component 2 — Worked Examples

### WE-1 (Three formulas — all equivalent)

**Problem:** A resistor R = 100 Ω has 5.0 A flowing through it. Find P using all three formulas.

**Worked solution:**

V = IR = (5.0)(100) = 500 V

P = IV = (5.0)(500) = **2500 W**
P = I²R = (5.0)²(100) = 25 × 100 = **2500 W** ✓
P = V²/R = (500)²/100 = 250000/100 = **2500 W** ✓

**Answer:** P = 2500 W = 2.5 kW (all three formulas agree).

---

### WE-2 (Power in a circuit — series analysis)

**Problem:** A 9 V battery powers a series circuit: R₁ = 3 Ω and R₂ = 6 Ω. Find power dissipated in each resistor and verify it sums to total power from battery.

**Worked solution:**

*Step 1 — Total current:*
R_eq = 3 + 6 = 9 Ω; I = 9/9 = 1.0 A

*Step 2 — Power in each:*
P₁ = I²R₁ = (1.0)²(3) = 3.0 W
P₂ = I²R₂ = (1.0)²(6) = 6.0 W

*Step 3 — Total power:*
P_total = P₁ + P₂ = 3 + 6 = 9.0 W

Verify: P_battery = εI = (9)(1.0) = 9.0 W ✓ (energy conservation)

**Answer:** P₁ = 3 W; P₂ = 6 W; total = 9 W (= battery power)

---

### WE-3 (Energy and cost calculation)

**Problem:** A house has: 10 × 60 W lamps; 1 × 2.0 kW kettle (used 3 times/day × 5 min each); 1 × 1.5 kW toaster (used 4 times/day × 3 min each). Find total daily energy in kWh and cost at 0.15 $/kWh.

**Worked solution:**

*Lamps:* 10 × 0.060 kW × 6 h/day = 3.60 kWh/day (assume 6 h total on)

*Kettle:* 2.0 kW × (3 × 5/60) h = 2.0 × 0.25 = **0.50 kWh/day**

*Toaster:* 1.5 kW × (4 × 3/60) h = 1.5 × 0.20 = **0.30 kWh/day**

*Total:* 3.60 + 0.50 + 0.30 = **4.40 kWh/day**

*Cost:* 4.40 × $0.15 = **$0.66/day**

**Answer:** 4.40 kWh/day; cost $0.66/day

---

## Component 3 — Misconception Profiles

### MC-POWER-IS-ALWAYS-IV

**Trigger signal:** Student always uses P = IV even when V is not given and must be computed from I and R first, leading to unnecessary steps. Or: student forgets P = I²R when only I and R are known.

**Conflict evidence [P28]:** "P = IV, I²R, and V²/R are all exactly equivalent for resistors. If you know I = 3 A and R = 50 Ω: fastest path is P = I²R = 9×50 = 450 W. Using P = IV requires first computing V = IR = 150 V, then P = (3)(150) = 450 W — same answer, one extra step. All three formulas are the same thing rearranged."

**Bridge text [P30]:** "P = IV is one of three equivalent formulas. Choose based on what's given: I and R → use I²R (no need to find V). V and R → use V²/R (no need to find I). I and V → use IV directly. Memorise all three and recognise that Ohm's Law connects them."

**Replacement text [P31]:** "There are three equivalent power formulas: P = IV, P = I²R, P = V²/R. All are exact for resistors obeying Ohm's Law. Select based on given information: avoid computing a third variable just to use a formula you know — use the formula that works directly with the two known quantities. This is a significant time saver in multi-step circuit problems."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "Given I and R → use P = I²R directly" | "Always find V first, then use P = IV" |
| "All three formulas are equivalent (same numerical result)" | "P = IV is always more accurate than P = I²R" |
| "Given V and R → use P = V²/R (no I needed)" | "Must find I to use P = IV even when R is given" |

**s6_path:** Practice selecting the most efficient formula: given data → choose form → compute. Verify answers agree when the same quantity is calculated two ways.

---

### MC-HIGH-RESISTANCE-ELEMENTS-ALWAYS-DISSIPATE-MORE-POWER

**Trigger signal:** Student says "more resistance = more power dissipation" without specifying whether series or parallel.

**Conflict evidence [P28]:** "Series circuit: P = I²R — same I, so larger R dissipates more (P ∝ R). Parallel circuit: P = V²/R — same V, so larger R dissipates LESS (P ∝ 1/R). In parallel: the 100 Ω branch dissipates only 1/10 the power of the 10 Ω branch at the same voltage. The answer depends entirely on whether current or voltage is held constant."

**Bridge text [P30]:** "The key question is: what's the same? Series → same current → P ∝ R. Parallel → same voltage → P ∝ 1/R. A 'high-resistance' element in parallel actually draws less current and less power than a low-resistance element at the same voltage."

**Replacement text [P31]:** "Power dissipation and resistance have opposite relationships in series vs. parallel. Series (same I): P = I²R — higher R → more power. Parallel (same V): P = V²/R — higher R → less power. Always identify whether elements are in series (same I) or parallel (same V) before deciding which element dissipates more."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "Series (same I): larger R → more power (P = I²R)" | "More resistance always means more power dissipated" |
| "Parallel (same V): larger R → less power (P = V²/R)" | "High-R element in parallel draws more power" |
| "First identify: series (same I) or parallel (same V)?" | "P ∝ R regardless of circuit configuration" |

**s6_path:** Show a specific example: 10 Ω and 100 Ω in series (same I): power ratio 1:10. Then in parallel (same V): power ratio 10:1. The relationship inverts.

---

## Component 4 — Practice Set

### P4-a (Retrieval)
Write all three power formulas. Which do you use when: (a) only V and R are known, (b) only I and R are known?

**Answer key:** P = IV; P = I²R; P = V²/R.
(a) P = V²/R (b) P = I²R

---

### P4-b (Basic calculation)
A 40 Ω resistor has 120 V across it. Find P.

**Answer key:** P = V²/R = 120²/40 = 14400/40 = **360 W**

---

### P4-c (Circuit power)
Three 10 Ω resistors are connected in parallel across 30 V. Find power dissipated by each and total power from supply.

**Answer key:**
Each: P = V²/R = 900/10 = **90 W**
Total: 3 × 90 = **270 W** (or I_total = 3 × (30/10) = 9 A → P = VI = 30 × 9 = 270 W ✓)

---

### P4-d (Energy and cost)
A 1200 W hair dryer is used for 15 minutes. Find: (a) energy in joules, (b) energy in kWh, (c) cost at $0.12/kWh.

**Answer key:**
(a) E = Pt = 1200 × (15×60) = 1200 × 900 = **1.08 × 10⁶ J = 1.08 MJ**
(b) E = 1200 × (15/60) kWh = 1200 × 0.25 = **300 Wh = 0.30 kWh**
(c) Cost = 0.30 × $0.12 = **$0.036 ≈ 3.6 cents**

---

### P4-e (Analysis — series vs. parallel)
A 20 Ω and a 5 Ω resistor. (a) In series across 100 V, which dissipates more and by what ratio? (b) In parallel across 100 V, which dissipates more and by what ratio?

**Answer key:**
(a) Series: I = 100/25 = 4 A; P₂₀ = 4²×20 = 320 W; P₅ = 4²×5 = 80 W. **20 Ω dissipates more; ratio = 4:1** (proportional to R).
(b) Parallel: V = 100 V on each; P₂₀ = 100²/20 = 500 W; P₅ = 100²/5 = 2000 W. **5 Ω dissipates more; ratio = 4:1** (inversely proportional to R).

---

## Component 5 — Lesson Composition Grammar

```
[P01: session-open]
  → [P62: retrieval-seed] — "What is power? What are the units? How is P related to energy?"
  → [P06: concrete-anchor] — "100 W bulb: 100 J per second. Kettle: 2000 W → boils water in 3 minutes. P = IV = I²R = V²/R — three ways, same answer."
  → [P41: diagnostic] — check if student knows which power formula to apply given different knowns
  → [P51: check-in]

[P28: conflict-evidence] × 2 misconceptions (MC-POWER-IS-ALWAYS-IV, MC-HIGH-RESISTANCE-ELEMENTS-ALWAYS-DISSIPATE-MORE-POWER)
  → [P30: bridge-text] for each
  → [P31: replacement-text] for each
  → [P33: discrimination-pairs] for each

[P06: concrete-anchor] — WE-1 (all three formulas: same answer)
  → [P06: concrete-anchor] — WE-2 (series circuit: power in each R; energy conservation)
  → [P52: narrow] — "In WE-2: why does R₂ (twice R₁) dissipate twice as much power?"
  → [P06: concrete-anchor] — WE-3 (energy and cost calculation — practical context)

[P36: mastery-probe] — P4-c (parallel power) + P4-e (series vs. parallel comparison)
  → if < 80%: re-address series vs. parallel power rules
  → if ≥ 80%: advance

[P51: check-in]
[P91: mastery-gate] — threshold 0.80
[P85: regulation-tail]
[P89: retrieval-schedule] — spacing: +1 day, +3 days, +7 days, +21 days
[P68: close]
```

---

## Component 6 — Assessment Items (Mastery Probes)

### AP-1 (Bloom: Remember)
State the three equivalent formulas for electrical power in a resistor.

**Answer:** P = IV; P = I²R; P = V²/R. All are equivalent via Ohm's Law V = IR.

---

### AP-2 (Bloom: Understand)
A 60 W / 120 V light bulb is connected to 240 V by mistake. What happens to the power, and why?

**Answer:** R = V²/P = 120²/60 = 240 Ω (assumed constant). At 240 V: P = V²/R = 240²/240 = 240 W — four times the rated power. The filament would receive 4× its rated power, overheat almost instantly, and likely burn out (open circuit). Power scales as V² — double the voltage quadruples the power.

---

### AP-3 (Bloom: Apply)
Find the power rating of a resistor that carries 0.50 A when connected to a 6.0 V source.

**Answer:** P = IV = (0.50)(6.0) = **3.0 W**. The resistor must have a power rating ≥ 3.0 W to avoid burning out (typically choose the next standard rating: 3.5 W or 5 W).

---

### AP-4 (Bloom: Analyze)
Three appliances (1.5 kW heater, 0.8 kW TV, 0.3 kW lamp) are connected in parallel to a 230 V household supply. Find: (a) total power, (b) total current drawn, (c) resistance of each appliance.

**Answer:**
(a) P_total = 1500 + 800 + 300 = **2600 W = 2.6 kW**
(b) I_total = P_total/V = 2600/230 = **11.3 A**
(c) R_heater = V²/P = 230²/1500 = **35.3 Ω**; R_TV = 230²/800 = **66.1 Ω**; R_lamp = 230²/300 = **176 Ω**

---

## Component 7 — Retrieval Spacing Schedule

| Interval | Recommended activity |
|---|---|
| +1 day | P = IV, I²R, V²/R: compute P from given pairs; choose correct formula |
| +3 days | Series circuit: which element dissipates more power? |
| +7 days | Energy E = Pt in joules and kWh; cost calculation |
| +21 days | Parallel circuit: power comparison; total power from supply |

---

## Component 8 — Prerequisite & Unlock Map

**Prerequisite concepts:**
- `phys.em.ohms-law` — V = IR; resistance concept

**Unlocked by this concept:**
- No direct KG unlock (leaf node in this chain)

**Cross-domain links:**
- `phys.em.dc-circuits` — power analysis in complex circuits
- `phys.em.resistivity` — P = I²R → Joule heating connects to wire material properties
- `phys.em.emf` — battery delivers power P = εI; internal power loss P = I²r

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG | PASS |
| V-2 | domain = electromagnetism | PASS |
| V-3 | difficulty 3, bloom = apply | PASS |
| V-4 | prerequisites in KG | PASS |
| V-5 | mastery_threshold = 0.80 | PASS |
| V-6 | estimated_hours = 3 | PASS |
| V-7 | cpa_entry_stage correct | PASS |
| V-8 | session_cap set | PASS |
| V-9 | Three tiers present | PASS |
| V-10 | ≥ 2 worked examples | PASS |
| V-11 | Exactly 2 MCs | PASS |
| V-12 | All 6 MC fields | PASS |
| V-13 | ≥ 5 practice items | PASS |
| V-14 | Valid Primitive codes | PASS |
| V-15 | ≥ 4 assessment items | PASS |
| V-16 | Retrieval schedule present | PASS |
| V-17 | Prereq/unlock map consistent | PASS |
| V-18 | No implementation changes | PASS |
| V-19 | No framework modifications | PASS |
| V-20 | status = READY | PASS |

**Blueprint status: PACKAGE_READY — all V-1..V-20 PASS**
