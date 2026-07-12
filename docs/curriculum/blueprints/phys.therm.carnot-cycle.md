# Teaching Blueprint — phys.therm.carnot-cycle

## Component 0 — Concept Identity & Metadata

```yaml
concept_id: phys.therm.carnot-cycle
name: Carnot Cycle
domain: thermodynamics
difficulty:
  label: advanced
  number: 5
bloom: analyze
prerequisites:
  - phys.therm.entropy
  - phys.therm.heat-engines
mastery_threshold: 0.80
estimated_hours: 6
cross_links:
  - phys.therm.refrigerators
  - phys.therm.second-law
  - phys.therm.thermodynamic-processes
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 5 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Tier)

### Tier 1 — Concrete / Intuitive (S0)

Imagine you are designing the **most efficient possible engine** — one that wastes as little heat as possible. The Carnot cycle is that theoretical ideal. It runs between two temperature reservoirs (a hot source and a cold sink) and performs exactly four carefully chosen steps: two that happen without any heat flow, and two that happen so slowly the temperature stays perfectly constant. No real engine can beat it. Its efficiency depends only on the temperatures of the two reservoirs — nothing else. Higher hot temperature or lower cold temperature both improve it.

### Tier 2 — Conceptual / Mechanistic (S1)

The Carnot cycle consists of four reversible processes performed on an ideal gas:

1. **Isothermal expansion** (A→B at T_H): The gas absorbs heat Q_H from the hot reservoir while expanding at constant T_H. Work is done by the gas.
2. **Adiabatic expansion** (B→C): The gas expands with no heat exchange, cooling from T_H to T_C.
3. **Isothermal compression** (C→D at T_C): The gas releases heat Q_C to the cold reservoir while being compressed at constant T_C.
4. **Adiabatic compression** (D→A): The gas is compressed with no heat exchange, warming from T_C back to T_H.

The cycle is reversible throughout, so ΔS_universe = 0. This is why Carnot efficiency is the maximum possible for any heat engine operating between T_H and T_C.

**Carnot efficiency:**
$$\eta_\text{Carnot} = 1 - \frac{T_C}{T_H}$$

where temperatures are in Kelvin.

**Key results from the entropy analysis:**
- Isothermal expansion: ΔS_system = +Q_H/T_H (entropy gained from reservoir)
- Isothermal compression: ΔS_system = −Q_C/T_C (entropy given to cold reservoir)
- Adiabatic steps: ΔS = 0 each
- Full cycle: ΔS_system = 0 (state function, returns to start)
- Reversibility requires: Q_H/T_H = Q_C/T_C → Q_C/Q_H = T_C/T_H

This gives: η = 1 − Q_C/Q_H = 1 − T_C/T_H

**Carnot's theorem** (proved by contradiction via the second law): No heat engine operating between two temperatures T_C and T_H can be more efficient than a Carnot engine. All reversible engines have the same efficiency η_Carnot.

### Tier 3 — Formal / Mathematical (S1 advanced / post-mastery)

**P-V diagram for an ideal gas Carnot cycle:**

- A→B (isothermal at T_H): PV = nRT_H = const; W_AB = nRT_H ln(V_B/V_A); Q_AB = W_AB = Q_H
- B→C (adiabatic): TV^(γ−1) = const; T_H V_B^(γ−1) = T_C V_C^(γ−1)
- C→D (isothermal at T_C): W_CD = nRT_C ln(V_D/V_C) < 0; Q_CD = W_CD = −Q_C (heat released)
- D→A (adiabatic): T_C V_D^(γ−1) = T_H V_A^(γ−1)

**Proof that Q_H/T_H = Q_C/T_C using adiabatic relations:**

From adiabatic steps: V_B/V_A = V_C/V_D (the compression ratios are equal).

Therefore:
$$Q_H = nRT_H \ln(V_B/V_A), \quad Q_C = nRT_C \ln(V_C/V_D) = nRT_C \ln(V_B/V_A)$$
$$\frac{Q_C}{Q_H} = \frac{T_C}{T_H}$$

**Coefficient of Performance (COP) — Carnot refrigerator:**
$$\text{COP}_\text{Carnot} = \frac{T_C}{T_H - T_C}$$

**Carnot's theorem proof by contradiction:**
Suppose a super-engine E exists with η_E > η_Carnot. Use E to drive a Carnot refrigerator in reverse. Net result: heat flows spontaneously from cold to hot with no other effect — violates Clausius statement of the second law. Contradiction. ∴ η_E ≤ η_Carnot for all engines. For reversible engines: η = η_Carnot exactly (running either direction).

---

## Component 2 — Worked Examples

### WE-1 (Foundational — Carnot efficiency from temperatures)

**Problem:** A Carnot engine operates between a hot reservoir at 600 K and a cold reservoir at 300 K. What is its maximum efficiency?

**Worked solution:**

*Step 1 — Apply Carnot efficiency formula:*
$$\eta_\text{Carnot} = 1 - \frac{T_C}{T_H} = 1 - \frac{300\text{ K}}{600\text{ K}} = 1 - 0.5 = 0.50$$

*Step 2 — Interpret:*
Maximum efficiency = 50%. Even this ideal engine must reject half the heat input to the cold reservoir. No real engine can exceed 50% between these temperatures.

**Answer:** η_max = 50%

---

### WE-2 (Core — Full cycle heat and work analysis)

**Problem:** A Carnot engine absorbs 800 J from a reservoir at 500 K and rejects heat to a reservoir at 300 K. Find: (a) efficiency, (b) heat rejected Q_C, (c) net work output.

**Worked solution:**

*Step 1 — Carnot efficiency:*
$$\eta = 1 - \frac{T_C}{T_H} = 1 - \frac{300}{500} = 1 - 0.6 = 0.40 = 40\%$$

*Step 2 — Net work:*
$$W_\text{net} = \eta \cdot Q_H = 0.40 \times 800\text{ J} = 320\text{ J}$$

*Step 3 — Heat rejected (First Law for cycle: ΔU = 0):*
$$Q_C = Q_H - W_\text{net} = 800 - 320 = 480\text{ J}$$

*Verification via entropy:* Q_H/T_H = 800/500 = 1.6 J/K; Q_C/T_C = 480/300 = 1.6 J/K ✓ (equal, so reversible)

**Answer:** η = 40%, Q_C = 480 J, W_net = 320 J

---

### WE-3 (Advanced — Proving a claim about efficiency)

**Problem:** An inventor claims a heat engine operating between 600 K and 400 K produces 500 J of work from 800 J of heat input. Is this claim thermodynamically valid?

**Worked solution:**

*Step 1 — Calculate claimed efficiency:*
$$\eta_\text{claimed} = \frac{W}{Q_H} = \frac{500}{800} = 0.625 = 62.5\%$$

*Step 2 — Calculate Carnot (maximum) efficiency:*
$$\eta_\text{Carnot} = 1 - \frac{400}{600} = 1 - 0.667 = 0.333 = 33.3\%$$

*Step 3 — Compare:*
62.5% > 33.3%. The claimed efficiency exceeds the Carnot limit.

*Step 4 — Conclusion:*
This violates the second law (Carnot's theorem). The claim is impossible — the engine would need to be a perpetual motion machine of the second kind. Either the claimed work output or heat input figures are wrong, or the inventor is measuring temperatures incorrectly.

**Answer:** Claim is **invalid** — 62.5% > 33.3% (Carnot limit), violates second law.

---

## Component 3 — Misconception Profiles

### MC-CARNOT-IS-REAL-ENGINE

**Trigger signal:** Student says "the Carnot engine is the best real engine" or asks "where can I buy a Carnot engine?"

**Conflict evidence [P28]:** "No heat engine operating between the same temperatures can exceed Carnot efficiency — but Carnot processes require quasi-static steps, which take infinitely long. A real engine that delivers zero power per cycle (infinite time) is useless. Practical engines trade efficiency for finite power output."

**Bridge text [P30]:** "The Carnot cycle sets the theoretical ceiling — like knowing the speed of light limits travel. It's a benchmark, not a blueprint. Engineers optimize real engines (Rankine, Otto, Diesel) to approach Carnot while delivering practical power in finite time."

**Replacement text [P31]:** "The Carnot cycle is an idealized reversible cycle — it defines the maximum possible efficiency for any heat engine between T_H and T_C. Real engines are irreversible and therefore less efficient. The Carnot limit is a thermodynamic law, not an engineering target to be reached."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "No real engine exceeds Carnot efficiency between the same reservoirs" | "The Carnot engine is the most powerful real engine" |
| "Carnot efficiency depends only on T_H and T_C (in Kelvin)" | "Carnot efficiency depends on the working substance" |
| "A reversible engine achieves Carnot efficiency" | "Any sufficiently well-built engine beats Carnot" |

**s6_path:** Validate the engineering intuition ("great that you're thinking about real applications!"), then clarify the distinction between theoretical maximum and practical optimum.

---

### MC-CARNOT-EFFICIENCY-USES-CELSIUS

**Trigger signal:** Student substitutes Celsius temperatures into η = 1 − T_C/T_H; e.g., "η = 1 − 27/127 = 0.787" instead of "η = 1 − 300/400 = 0.25."

**Conflict evidence [P28]:** "Try: T_H = 127°C = 400 K, T_C = 27°C = 300 K. Celsius formula gives η = 1 − 27/127 = 78.7%. Kelvin formula gives η = 1 − 300/400 = 25%. The Carnot derivation requires absolute temperature because we used Q_H/T_H = Q_C/T_C from entropy (dS = δQ_rev/T), where T is always absolute thermodynamic temperature in Kelvin."

**Bridge text [P30]:** "Temperature differences in Celsius equal differences in Kelvin, which is why ΔT problems work in either scale. But ratios T_C/T_H are NOT equal — 300/400 ≠ 27/127. The Carnot formula involves a ratio, so Kelvin is mandatory."

**Replacement text [P31]:** "In η = 1 − T_C/T_H, both temperatures are absolute (Kelvin). Always convert: T(K) = T(°C) + 273.15. The formula fails — giving nonsensical or impossible efficiencies — if Celsius values are substituted directly."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "η = 1 − 300K/400K = 25%" | "η = 1 − 27°C/127°C = 78.7%" |
| "ΔT = 100°C = 100 K (differences are equal)" | "T_C/T_H = 27/127 (ratio valid in Celsius)" |
| "Convert first, then compute the ratio" | "Ratios work in Celsius if both temperatures are on the same scale" |

**s6_path:** Remind student this is a common calculation trap; the rule is simple and worth internalizing once.

---

## Component 4 — Practice Set

### P4-a (Retrieval — recall Carnot efficiency formula)
*State* the Carnot efficiency formula and *identify* what each symbol represents and in what units temperatures must be expressed.

**Answer key:** η_Carnot = 1 − T_C/T_H; T_C = cold reservoir temperature (K); T_H = hot reservoir temperature (K); temperatures must be in Kelvin; η is dimensionless (0 to 1, or 0% to 100%).

---

### P4-b (Basic application — single calculation)
A steam engine operates between 400°C (steam) and 50°C (exhaust). What is the Carnot efficiency limit?

**Answer key:** T_H = 673 K, T_C = 323 K; η = 1 − 323/673 = 1 − 0.480 = 0.520 = **52.0%**

---

### P4-c (Conceptual — working substance)
Two Carnot engines operate between 800 K and 300 K: one using nitrogen gas, the other using steam. Which has higher efficiency?

**Answer key:** Both have **identical** efficiency = 1 − 300/800 = 62.5%. Carnot efficiency depends only on the reservoir temperatures, not on the working substance. This is Carnot's theorem's strongest implication.

---

### P4-d (Multi-step — heat and work)
A Carnot engine absorbs 1200 J from a 750 K reservoir. If T_C = 250 K, find (a) η, (b) W_net, (c) Q_C, (d) verify entropy balance.

**Answer key:**
(a) η = 1 − 250/750 = 0.667 = 66.7%
(b) W_net = 0.667 × 1200 = 800 J
(c) Q_C = 1200 − 800 = 400 J
(d) ΔS_H = −1200/750 = −1.60 J/K; ΔS_C = +400/250 = +1.60 J/K; ΔS_universe = 0 ✓

---

### P4-e (Analysis — validity check)
An engine claims 45% efficiency between 500 K and 320 K. Is this claim valid? Calculate the Carnot limit and state whether the claim violates the second law.

**Answer key:** η_Carnot = 1 − 320/500 = 36%. Claimed η = 45% > 36% → **invalid**, violates second law (Carnot's theorem).

---

### P4-f (Challenge — reverse reasoning)
A Carnot engine has 40% efficiency. If T_H = 600 K, what is T_C? If the engine absorbs 500 J/s from the hot reservoir, what is its power output?

**Answer key:**
T_C/T_H = 1 − 0.40 = 0.60 → T_C = 0.60 × 600 = **360 K**
P = η × Q̇_H = 0.40 × 500 = **200 W**

---

## Component 5 — Lesson Composition Grammar

```
[P01: session-open]
  → [P62: retrieval-seed] — "What four processes make up the Carnot cycle, and what happens to heat and entropy in each?"
  → [P06: concrete-anchor] — "Imagine designing the most efficient possible engine between a hot furnace (T_H) and cool atmosphere (T_C). What does 'most efficient' demand about the process?"
  → [P41: diagnostic] — check if student can identify reversibility as the key requirement
  → [P51: check-in]

[P28: conflict-evidence] × 2 misconceptions (MC-CARNOT-IS-REAL-ENGINE, MC-CARNOT-EFFICIENCY-USES-CELSIUS)
  → [P30: bridge-text] for each
  → [P31: replacement-text] for each
  → [P33: discrimination-pairs] for each

[P06: concrete-anchor] — WE-1 (efficiency from temperatures, visual P-V diagram)
  → [P06: concrete-anchor] — WE-2 (full cycle heat/work/entropy balance)
  → [P52: narrow] — "Which step requires: Q/T_H = Q/T_C? Where does this come from?" (entropy balance)
  → [P06: concrete-anchor] — WE-3 (impossible engine validity check)

[P36: mastery-probe] — P4-d (multi-step: efficiency, work, heat, entropy verification)
  → if < 80%: [P28: conflict-evidence] re-address temperature unit error
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
State Carnot's theorem.

**Answer:** No heat engine operating between two heat reservoirs at temperatures T_H and T_C can be more efficient than a Carnot (reversible) engine operating between the same two reservoirs. All reversible engines have the same efficiency η_Carnot = 1 − T_C/T_H.

---

### AP-2 (Bloom: Understand)
Why does the Carnot efficiency depend only on the reservoir temperatures and not on the working substance?

**Answer:** The derivation of Q_H/T_H = Q_C/T_C relies only on the entropy being a state function and the cycle being reversible — both facts independent of the working substance. The ratio Q_C/Q_H = T_C/T_H holds regardless of whether the gas is ideal, real, or replaced by another working material, provided the cycle is reversible.

---

### AP-3 (Bloom: Apply)
A power plant burns fuel to produce steam at 560°C and discharges to a river at 20°C. What is the maximum thermodynamic efficiency?

**Answer:** T_H = 833 K, T_C = 293 K; η_max = 1 − 293/833 = 0.648 = **64.8%**

---

### AP-4 (Bloom: Analyze)
Two engineers debate: Engineer A says "we can improve efficiency by lowering T_C." Engineer B says "we can improve efficiency by raising T_H." Given T_H = 600 K and T_C = 300 K, which strategy gives a bigger efficiency gain for a 50 K improvement?

**Answer:**
Current η = 1 − 300/600 = 50%.
Lower T_C by 50 K: η = 1 − 250/600 = 58.3% (gain = 8.3%)
Raise T_H by 50 K: η = 1 − 300/650 = 53.8% (gain = 3.8%)
**Engineer A's strategy** (lower T_C) gives a larger gain for the same 50 K change. Note: in practice, T_C is often fixed by environment (river, atmosphere), making T_H the controllable lever.

---

## Component 7 — Retrieval Spacing Schedule

| Interval | Recommended activity |
|---|---|
| +1 day | Recall four Carnot steps; compute η for two temperature pairs |
| +3 days | Full cycle analysis: given Q_H and T values, find W, Q_C, verify entropy |
| +7 days | Validity check on a claimed engine efficiency; explain Carnot's theorem |
| +21 days | Mixed problem: Carnot engine → connect to refrigerator COP (prereq for next concept) |

---

## Component 8 — Prerequisite & Unlock Map

**Prerequisite concepts (must be ≥ 0.80 mastery before this lesson):**
- `phys.therm.entropy` — dS = δQ_rev/T; state function nature; ΔS_universe = 0 for reversible
- `phys.therm.heat-engines` — η = W/Q_H = 1 − Q_C/Q_H; first-law cycle analysis

**Unlocked by this concept (becomes accessible after ≥ 0.80 mastery here):**
- `phys.therm.refrigerators` — Carnot cycle reversed; COP_Carnot = T_C/(T_H − T_C)

**Cross-domain links:**
- `phys.therm.second-law` — Carnot's theorem is proof and consequence of second law
- `phys.therm.thermodynamic-processes` — all four Carnot steps are special processes
- `phys.stat.boltzmann-distribution` — statistical mechanical interpretation of Carnot efficiency

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG exactly | PASS |
| V-2 | domain field derived correctly from prefix (phys.therm→thermodynamics) | PASS |
| V-3 | difficulty number = 5 (advanced), bloom = analyze | PASS |
| V-4 | prerequisites listed in KG | PASS |
| V-5 | mastery_threshold = 0.80 | PASS |
| V-6 | estimated_hours = 6 | PASS |
| V-7 | cpa_entry_stage correct for difficulty 5 | PASS |
| V-8 | session_cap set (estimated_hours ≥ 1h) | PASS |
| V-9 | Three explanation tiers present (S0/S1/formal) | PASS |
| V-10 | At least 2 worked examples with full step-by-step solutions | PASS |
| V-11 | Exactly 2 misconception profiles present | PASS |
| V-12 | Each MC has all 6 required fields | PASS |
| V-13 | Practice set has ≥ 5 items spanning Bloom levels | PASS |
| V-14 | Lesson grammar uses valid Primitive Library codes | PASS |
| V-15 | At least 4 assessment items with answers | PASS |
| V-16 | Retrieval spacing schedule present (4+ intervals) | PASS |
| V-17 | Prerequisite map and unlock map consistent with KG | PASS |
| V-18 | No implementation code, routes, or schema changes | PASS |
| V-19 | No modifications to Educational Brain, Primitive Library, or Spec | PASS |
| V-20 | status = READY | PASS |

**Blueprint status: PACKAGE_READY — all V-1..V-20 PASS**
