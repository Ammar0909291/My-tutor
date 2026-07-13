# Teaching Blueprint — phys.em.dc-circuits

## Component 0 — Concept Identity & Metadata

```yaml
concept_id: phys.em.dc-circuits
name: DC Circuits
domain: electromagnetism
difficulty:
  label: developing
  number: 3
bloom: apply
prerequisites:
  - phys.em.ohms-law
mastery_threshold: 0.80
estimated_hours: 4
cross_links:
  - phys.em.kirchhoffs-laws
  - phys.em.electrical-power
  - phys.em.emf
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 3 → C with full CPA track)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Tier)

### Tier 1 — Concrete / Intuitive (S0)

A DC circuit is any arrangement of batteries, resistors, and wires carrying a steady current in one direction. The battery is the pump; the resistors are the restrictions in the flow path; the wires carry current from component to component. Resistors in **series** share the same current but split the voltage. Resistors in **parallel** share the same voltage but split the current. The voltage divider (series) and current divider (parallel) are the two most useful circuit patterns.

### Tier 2 — Conceptual / Mechanistic (S1)

**Series circuit:**
- Same current I through all elements.
- Voltages add: V_total = V₁ + V₂ + ... = I(R₁ + R₂ + ...) = IR_eq
- R_eq = R₁ + R₂ + ... (add resistors)
- Voltage divider: V_k = V_total × R_k/R_eq

**Parallel circuit:**
- Same voltage V across all elements.
- Currents add: I_total = I₁ + I₂ + ... = V(1/R₁ + 1/R₂ + ...) = V/R_eq
- 1/R_eq = 1/R₁ + 1/R₂ + ... (add reciprocals)
- Current divider (two resistors): I₁ = I × R₂/(R₁ + R₂) (current splits inversely as resistance)

**EMF and internal resistance:**
A battery with emf ε and internal resistance r delivers terminal voltage:
$$V_\text{terminal} = \varepsilon - Ir$$

The terminal voltage is less than the emf when current flows (drops across internal resistance).

**Circuit analysis strategy:**
1. Identify series and parallel groups; reduce to single equivalent R.
2. Find total current from battery.
3. Work backwards: find voltage across each equivalent and then current in each branch.

**Ideal vs. real wires:**
- Ideal wire: R = 0, V = 0 (short circuit if two points connected directly → infinite current through ideal battery).
- Real wire: small R, small V drop.

**Open circuit:** R = ∞, I = 0, voltage appears across the gap.

### Tier 3 — Formal (Network Theory Preview)

**Node and mesh analysis:**
For networks not reducible by series/parallel alone, use Kirchhoff's laws (next concept). Node analysis: set up equations at each node using KCL. Mesh analysis: trace loop currents using KVL. Both are extensions of DC circuit analysis.

**Thevenin's theorem:** Any linear circuit seen from two terminals can be replaced by a single voltage source V_th in series with a single resistance R_th. Useful for load analysis.

**Norton's theorem:** Equivalent circuit with current source I_N in parallel with R_N = R_th.

**Superposition principle (linear circuits):** Response to multiple sources = algebraic sum of responses to each source alone (others zeroed out: voltage sources → short circuit; current sources → open circuit).

---

## Component 2 — Worked Examples

### WE-1 (Series-parallel reduction)

**Problem:** A 12 V battery connects to the following circuit: R₁ = 4 Ω in series with a parallel combination of R₂ = 6 Ω and R₃ = 3 Ω. Find: (a) R_eq, (b) total current, (c) current through R₂.

**Worked solution:**

*Step 1 — Parallel R₂ || R₃:*
1/R₂₃ = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 → R₂₃ = 2 Ω

*Step 2 — Series total:*
R_eq = R₁ + R₂₃ = 4 + 2 = **6 Ω**

*Step 3 — Total current (from battery):*
I = V/R_eq = 12/6 = **2.0 A**

*Step 4 — Voltage across parallel combination:*
V₂₃ = I × R₂₃ = 2.0 × 2 = 4 V

*Step 5 — Current through R₂:*
I₂ = V₂₃/R₂ = 4/6 = **0.667 A**

Check: I₃ = 4/3 = 1.333 A; I₂ + I₃ = 0.667 + 1.333 = 2.0 A ✓

**Answer:** R_eq = 6 Ω; I_total = 2.0 A; I₂ = 0.667 A

---

### WE-2 (Voltage divider)

**Problem:** Two resistors R₁ = 8 kΩ and R₂ = 12 kΩ are connected in series across a 20 V supply. Find the voltage across each resistor (voltage divider formula).

**Worked solution:**

Voltage divider: V_k = V_supply × R_k/R_eq where R_eq = 8 + 12 = 20 kΩ.

$$V_1 = 20 \times \frac{8}{20} = \frac{20 \times 8}{20} = 8\text{ V}$$
$$V_2 = 20 \times \frac{12}{20} = 12\text{ V}$$

Check: 8 + 12 = 20 V ✓

**Answer:** V₁ = 8 V; V₂ = 12 V

---

### WE-3 (Internal resistance)

**Problem:** A battery (ε = 9 V, r = 0.5 Ω) is connected to a 8.5 Ω external resistor. Find: (a) current, (b) terminal voltage, (c) power lost in internal resistance.

**Worked solution:**

*(a)* Total resistance = r + R = 0.5 + 8.5 = 9 Ω
I = ε/(r + R) = 9/9 = 1.0 A

*(b)* V_terminal = ε − Ir = 9 − (1.0)(0.5) = **8.5 V** (= IR = 1.0 × 8.5 ✓)

*(c)* P_internal = I²r = (1.0)²(0.5) = **0.5 W**

**Answer:** I = 1.0 A; V_terminal = 8.5 V; P_internal = 0.5 W

---

## Component 3 — Misconception Profiles

### MC-SAME-CURRENT-IN-PARALLEL-BRANCHES

**Trigger signal:** Student says "the current splits equally in parallel" regardless of resistance values, or uses I_total/n for n parallel branches.

**Conflict evidence [P28]:** "Two resistors in parallel: R₁ = 2 Ω and R₂ = 8 Ω across 10 V. I₁ = 10/2 = 5 A; I₂ = 10/8 = 1.25 A. Not equal — 5 A vs. 1.25 A. Current divides inversely as resistance. The lower-resistance branch gets MORE current (easier path). I₁/I₂ = R₂/R₁ = 8/2 = 4 — the branch with four times less resistance carries four times more current."

**Bridge text [P30]:** "Parallel branches all have the same voltage — that's the defining feature. Current through each branch = V/R, so branches with smaller R carry more current. Think of parallel roads: more lanes (lower R) → more traffic (more I). Equal current only if all branches have equal resistance."

**Replacement text [P31]:** "In parallel branches, the voltage across each branch is the same; the current in each branch is V/Rᵢ and is inversely proportional to the branch resistance. More resistance → less current (not equal current). The total current is the sum: I_total = V/R₁ + V/R₂ + ... The current divider formula for two branches: I₁/I₂ = R₂/R₁."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "Parallel: same V; I ∝ 1/R (more R → less I)" | "Parallel: current splits equally among branches" |
| "I₁ = V/R₁ (each branch independently)" | "I₁ = I₂ = I_total/2 (for two branches)" |
| "Current divider: I₁/I₂ = R₂/R₁" | "Equal resistance needed for any current split" |

**s6_path:** Use water analogy: two parallel pipes — a wide one (low R) carries much more flow than a narrow one (high R) when the pressure difference (V) is the same.

---

### MC-VOLTAGE-SAME-EVERYWHERE-IN-SERIES

**Trigger signal:** Student assigns the supply voltage to each series resistor separately ("each resistor gets the full 12 V"), not dividing it.

**Conflict evidence [P28]:** "Series circuit: 12 V battery, R₁ = 4 Ω, R₂ = 8 Ω. V₁ = IR₁ = (12/12)(4) = 4 V; V₂ = 8 V. Total: 4 + 8 = 12 V. Each resistor does NOT get 12 V. The voltage is shared (Kirchhoff's voltage law: the sum around any loop = 0). More resistance → more voltage drop. The full 12 V is the total pushed by the battery; it distributes across resistors."

**Bridge text [P30]:** "The battery voltage is the total pressure available for the whole loop. Each resistor 'uses up' some of that pressure proportional to its resistance. Just as a river drops in height (potential) as it flows over rocks — the total height drop equals the sum of individual drops. No more, no less."

**Replacement text [P31]:** "In a series circuit, the supply voltage is divided among the resistors: V_k = I × R_k. Each resistor gets a fraction V_k/V_total = R_k/R_eq of the supply voltage. The sum of all voltage drops equals the supply voltage (Kirchhoff's voltage law). No single resistor gets the full supply voltage (unless all others have zero resistance)."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "Series: voltages add to supply (ΣV_k = V_supply)" | "Each series resistor gets the full supply voltage" |
| "Voltage divides in proportion to resistance" | "All resistors in series are at the same voltage" |
| "More resistance → larger voltage drop" | "Voltage is the same across all series elements" |

**s6_path:** Measure with a voltmeter: connect to two terminals of R₁ → reads 4 V, not 12 V. Connect to R₂ → reads 8 V. Connect to battery terminals → reads 12 V. Physical measurement disproves the misconception.

---

## Component 4 — Practice Set

### P4-a (Retrieval)
State: (a) rule for resistors in series, (b) rule for resistors in parallel, (c) what is the same in series, (d) what is the same in parallel.

**Answer key:**
(a) R_eq = R₁ + R₂ + ... (add directly)
(b) 1/R_eq = 1/R₁ + 1/R₂ + ... (add reciprocals)
(c) In series: same current I
(d) In parallel: same voltage V

---

### P4-b (Mixed network)
4 Ω and 12 Ω are in parallel; this parallel group is in series with 6 Ω, across a 24 V supply. Find R_eq and total current.

**Answer key:**
R₄₁₂ = (4×12)/(4+12) = 48/16 = **3 Ω** (parallel)
R_eq = 3 + 6 = **9 Ω** (series)
I = 24/9 = **2.67 A**

---

### P4-c (Voltage divider)
A 5 kΩ and a 15 kΩ resistor are in series across 60 V. Find V across the 15 kΩ resistor.

**Answer key:** V = 60 × 15/(5+15) = 60 × 15/20 = **45 V**

---

### P4-d (Internal resistance)
A battery (ε = 6 V, r = 1 Ω) powers a 5 Ω load. Find: terminal voltage, current, power to load, and power lost in battery.

**Answer key:**
I = ε/(r+R) = 6/6 = **1.0 A**
V_t = 6 − 1×1 = **5 V**
P_load = I²R = 1²×5 = **5 W**
P_battery = I²r = 1²×1 = **1 W** (wasted inside battery)

---

### P4-e (Analysis — shorts and opens)
In the series-parallel circuit of P4-b: (a) what is the total current if the 4 Ω resistor is replaced by a wire (short circuit)? (b) what if it is removed (open circuit)?

**Answer key:**
(a) Short: R₄ → 0. Parallel group: R₀₁₂ = (0×12)/(0+12) = 0 Ω. R_eq = 0 + 6 = 6 Ω. I = 24/6 = **4.0 A**.
(b) Open: R₄ → ∞. Only 12 Ω remains in parallel group (no current through open). R_eq = 12 + 6 = 18 Ω. I = 24/18 = **1.33 A**.

---

## Component 5 — Lesson Composition Grammar

```
[P01: session-open]
  → [P62: retrieval-seed] — "V = IR. What happens to current if you double R? What if you add a second path for current to flow?"
  → [P06: concrete-anchor] — "Series: two resistors in a line — same current, voltage splits. Parallel: two resistors side by side — same voltage, current splits."
  → [P41: diagnostic] — check if student knows series = same I, parallel = same V
  → [P51: check-in]

[P28: conflict-evidence] × 2 misconceptions (MC-SAME-CURRENT-IN-PARALLEL-BRANCHES, MC-VOLTAGE-SAME-EVERYWHERE-IN-SERIES)
  → [P30: bridge-text] for each
  → [P31: replacement-text] for each
  → [P33: discrimination-pairs] for each

[P06: concrete-anchor] — WE-1 (mixed series-parallel reduction step by step)
  → [P06: concrete-anchor] — WE-2 (voltage divider formula)
  → [P52: narrow] — "In WE-2: if R₁ = R₂, what fraction of V appears across each?"
  → [P06: concrete-anchor] — WE-3 (internal resistance: terminal V < ε)

[P36: mastery-probe] — P4-b (mixed network) + P4-d (internal resistance)
  → if < 80%: re-address series/parallel rules
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
State the series and parallel resistance rules. Which gives larger R_eq?

**Answer:** Series: R_eq = ΣRᵢ (always larger than any individual R). Parallel: 1/R_eq = Σ1/Rᵢ (always smaller than the smallest R). Series gives larger R_eq.

---

### AP-2 (Bloom: Understand)
A 100 W bulb and a 40 W bulb are connected in series across 240 V. Which bulb glows brighter, and why?

**Answer:** Power rating on a bulb gives its resistance: P = V²/R → R = V²/P. At 240 V: R₁₀₀ = 240²/100 = 576 Ω; R₄₀ = 240²/40 = 1440 Ω. In series: same current I through both. P = I²R: the 40 W bulb (higher R) dissipates more power in series. **The 40 W bulb glows brighter** in series (opposite to parallel, where 100 W would be brighter — the rating is for parallel/normal operation).

---

### AP-3 (Bloom: Apply)
Three 15 Ω resistors are connected to a 9 V battery: two in parallel, and that combination in series with the third. Find R_eq, I, and voltage across the parallel pair.

**Answer:**
R_parallel = 15/2 = 7.5 Ω; R_eq = 7.5 + 15 = **22.5 Ω**
I = 9/22.5 = **0.40 A**
V_parallel = I × 7.5 = 0.40 × 7.5 = **3.0 V** (so V_series = 9 − 3 = 6 V ✓)

---

### AP-4 (Bloom: Analyze)
A student measures a battery's emf at 12.0 V (open circuit). Under a 10 A load, the terminal voltage drops to 11.0 V. Find internal resistance and power dissipated inside the battery.

**Answer:**
V_t = ε − Ir → 11.0 = 12.0 − 10r → r = **0.10 Ω**
P_internal = I²r = 10² × 0.10 = **10 W** (10/120 ≈ 8.3% efficiency loss to internal resistance)

---

## Component 7 — Retrieval Spacing Schedule

| Interval | Recommended activity |
|---|---|
| +1 day | Series/parallel rules; find R_eq for simple combinations |
| +3 days | Mixed networks: 2-step reduction (parallel inside series) |
| +7 days | Voltage and current dividers: find V_k or I_k in branches |
| +21 days | Internal resistance: terminal voltage, power loss inside battery |

---

## Component 8 — Prerequisite & Unlock Map

**Prerequisite concepts:**
- `phys.em.ohms-law` — V = IR; series/parallel resistor rules

**Unlocked by this concept:**
- `phys.em.kirchhoffs-laws` — multi-loop circuit analysis (extends DC circuits)
- `phys.em.emf` — internal resistance, sources of EMF

**Cross-domain links:**
- `phys.em.electrical-power` — P = IV = I²R; power in circuit elements
- `phys.em.rc-circuits` — capacitors in DC circuits

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG | PASS |
| V-2 | domain = electromagnetism | PASS |
| V-3 | difficulty 3, bloom = apply | PASS |
| V-4 | prerequisites in KG | PASS |
| V-5 | mastery_threshold = 0.80 | PASS |
| V-6 | estimated_hours = 4 | PASS |
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
