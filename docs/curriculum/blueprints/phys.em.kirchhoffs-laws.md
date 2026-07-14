# Teaching Blueprint — phys.em.kirchhoffs-laws

## Component 0 — Concept Identity & Metadata

```yaml
concept_id: phys.em.kirchhoffs-laws
name: Kirchhoff's Laws
domain: electromagnetism
difficulty:
  label: proficient
  number: 4
bloom: apply
prerequisites:
  - phys.em.dc-circuits
mastery_threshold: 0.80
estimated_hours: 5
cross_links:
  - phys.em.wheatstone-bridge
  - phys.em.potentiometer
  - phys.em.rc-circuits
  - phys.em.emf
session_cap: "7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)"
cpa_entry_stage: "C (anchor; difficulty 4 → C with accelerated P track)"
status: READY
```

---

## Component 1 — Concept Explanation (Multi-Tier)

### Tier 1 — Concrete / Intuitive (S0)

When a circuit has multiple loops and branches that can't be reduced by simple series/parallel rules, you need **Kirchhoff's Laws**. There are two: 
1. **KCL (Current Law):** At any junction, the total current flowing in equals the total current flowing out — charge is conserved.
2. **KVL (Voltage Law):** Around any closed loop, the voltages must add to zero — energy is conserved.
These two laws, applied systematically, can solve any DC circuit, no matter how complex.

### Tier 2 — Conceptual / Mechanistic (S1)

**KCL — Kirchhoff's Current Law:**
$$\sum_\text{in} I_k = \sum_\text{out} I_k \quad \Leftrightarrow \quad \sum_k I_k = 0$$

At any node (junction), charge is conserved — current doesn't pile up. All currents entering a node equal all currents leaving it.

**KVL — Kirchhoff's Voltage Law:**
$$\sum_\text{loop} \Delta V_k = 0$$

Around any closed loop, the sum of all voltage rises and drops is zero. Energy conservation: a charge returning to its starting point has the same potential as when it left.

**Sign convention for KVL:**
- Traversing a battery from − to +: voltage rise, +ε.
- Traversing a battery from + to −: voltage drop, −ε.
- Traversing a resistor in the direction of assumed current: voltage drop, −IR.
- Traversing a resistor against the assumed current: voltage rise, +IR.

**Strategy for solving multi-loop circuits:**
1. Label all branch currents with assumed directions (can be arbitrary — wrong guess gives negative result, which just means reverse direction).
2. Apply KCL at each independent node.
3. Apply KVL around each independent loop.
4. Solve the simultaneous equations.

**Number of equations needed:**
- Nodes: n − 1 independent KCL equations (for n nodes)
- Loops: b − (n − 1) independent KVL equations (for b branches)
- Total equations = b (one per branch current)

**Special cases:**
- Voltage divider: KVL gives V_out = V_in × R₂/(R₁ + R₂) (same as before, now derived from KVL).
- Current divider: KCL gives I₁ = I × R₂/(R₁ + R₂) for two parallel branches.

### Tier 3 — Formal (Network Theory)

**Mesh analysis (independent loop currents):**
Define one loop current per independent mesh. Write KVL for each mesh. Mutual resistance: when two loops share a branch, the voltage drop uses both currents (I₁ − I₂) or (I₁ + I₂) depending on relative directions. Systematically: [R][I] = [V] in matrix form → solve by Gaussian elimination.

**Node voltage analysis:**
Choose a reference node (ground). Assign voltage V_k to each other node. Write KCL at each non-reference node in terms of node voltages. [G][V] = [I] in matrix form → solve. More efficient than mesh analysis for many nodes with few voltage sources.

**Superposition (linear circuits):**
Response (I or V at any point) = sum of responses with each independent source acting alone (other voltage sources = short circuit; current sources = open circuit).

---

## Component 2 — Worked Examples

### WE-1 (Two-loop circuit — standard KCL/KVL)

**Problem:** Circuit: ε₁ = 12 V (internal r₁ = 1 Ω), ε₂ = 6 V (r₂ = 1 Ω), R = 4 Ω. ε₁ and ε₂ share the R branch. Left loop: ε₁ − r₁ − R. Right loop: ε₂ − r₂ − R. Find the current in each branch.

**Worked solution:**

*Step 1 — Label currents:*
I₁ through ε₁-r₁ branch (assumed clockwise).
I₂ through ε₂-r₂ branch (assumed clockwise).
By KCL: current through R = I₁ + I₂ (both flow down through R if both clockwise in their loops).

Wait — let me set up more carefully:
- Branch 1 (left): ε₁ = 12 V, r₁ = 1 Ω, current I₁ (assumed left to right)
- Branch 2 (right): ε₂ = 6 V, r₂ = 1 Ω, current I₂ (assumed left to right)
- Branch 3 (center): R = 4 Ω, current I₃ (assumed downward)
- Node A (top): I₁ + I₂ = I₃ (KCL)
- Node B (bottom): I₃ = I₁ + I₂ ✓

*Step 2 — KVL for left loop (clockwise from bottom):*
+ε₁ − I₁r₁ − I₃R = 0
12 − I₁(1) − (I₁ + I₂)(4) = 0
12 − I₁ − 4I₁ − 4I₂ = 0
12 = 5I₁ + 4I₂ ... (i)

*Step 3 — KVL for right loop (clockwise from bottom):*
+ε₂ − I₂r₂ − I₃R = 0
6 − I₂(1) − (I₁ + I₂)(4) = 0
6 = 4I₁ + 5I₂ ... (ii)

*Step 4 — Solve (i) and (ii):*
From (i): 12 = 5I₁ + 4I₂; from (ii): 6 = 4I₁ + 5I₂
5×(i): 60 = 25I₁ + 20I₂
4×(ii): 24 = 16I₁ + 20I₂
Subtract: 36 = 9I₁ → **I₁ = 4 A**
From (i): 12 = 20 + 4I₂ → I₂ = −2 A

Negative I₂: current in that branch is opposite to assumed direction (flows right to left).

*Step 5 — I₃:* I₃ = I₁ + I₂ = 4 + (−2) = **2 A** through R.

**Answer:** I₁ = 4 A; I₂ = −2 A (reversed); I₃ = 2 A through R.

---

### WE-2 (KCL at a junction)

**Problem:** At a junction, four wires meet. Currents: I₁ = 5 A into the junction, I₂ = 2 A into the junction, I₃ = 3 A out of the junction. Find I₄.

**Worked solution:**

KCL: ΣI_in = ΣI_out
5 + 2 = 3 + I₄
I₄ = 4 A (leaving the junction)

**Answer:** I₄ = 4 A out of junction.

---

### WE-3 (KVL — single loop with multiple components)

**Problem:** A loop has: ε = 20 V (rise), R₁ = 3 Ω (carrying I clockwise), R₂ = 7 Ω (carrying I clockwise). Apply KVL to find I.

**Worked solution:**

Traverse clockwise: +ε − IR₁ − IR₂ = 0
20 − 3I − 7I = 0
20 = 10I → I = **2.0 A**

Verify: V_R₁ = 6 V; V_R₂ = 14 V; total drop = 20 V = ε ✓

**Answer:** I = 2.0 A

---

## Component 3 — Misconception Profiles

### MC-KVL-ONLY-APPLIES-TO-SIMPLE-LOOPS

**Trigger signal:** Student says KVL only works for loops with one battery and one resistor, or is hesitant to apply it to loops containing other branches' currents.

**Conflict evidence [P28]:** "KVL is a statement of energy conservation — it holds for any closed path through any circuit, regardless of complexity. A loop containing 3 batteries and 5 resistors (with shared branches carrying multiple currents) must satisfy KVL. The only requirement: traverse a closed path, track all voltage rises and drops with correct signs, and set the sum to zero. The algebra may be complex, but the law is universally valid."

**Bridge text [P30]:** "KVL is like energy accounting for a charge making a round trip: every joule gained from a battery must be spent on resistors. No matter how complicated the circuit, a charge returning to its starting point has the same energy — net energy change = 0. KVL formalises this into equations."

**Replacement text [P31]:** "KVL applies to every closed loop in any circuit, however complex. It follows from the conservation of energy: the work done around a closed loop is zero for any conservative field. All that changes with complexity is the number of currents and equations. The law itself — ΣΔV = 0 around any loop — never fails."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "KVL: ΣΔV = 0 for any closed path in any circuit" | "KVL only works for single-loop circuits" |
| "Complex loops: same law, more simultaneous equations" | "Multi-loop circuits need special methods, not KVL" |
| "KVL is energy conservation; always holds for resistive networks" | "KVL breaks down when loops share branches" |

**s6_path:** Apply KVL to a complex loop that shares branches. Show the same sign convention gives a consistent system of equations even when branch currents appear in multiple loop equations.

---

### MC-WRONG-SIGN-FOR-RESISTOR-TRAVERSAL

**Trigger signal:** Student adds IR (instead of subtracting) when traversing a resistor in the direction of current, leading to sign errors in KVL equations.

**Conflict evidence [P28]:** "Sign rule: energy is lost (voltage drops) as a charge flows through a resistor in the direction of current. If you traverse the resistor in the direction of assumed current I, you are moving from higher to lower potential → voltage drop → write −IR in KVL. If you traverse against the current direction, you go uphill in potential → write +IR. This follows from the definition of current: it flows from high to low potential."

**Bridge text [P30]:** "Conventional current flows from + to − outside the battery (from high potential to low). So going in the direction of current through a resistor means going downhill in potential — subtract IR. Going against the current → uphill → add IR. Battery: + terminal is high potential; going from − to + (against conventional current through the battery) → going uphill → add ε."

**Replacement text [P31]:** "KVL sign rules for traversal: Resistor in current direction → drop → −IR. Resistor against current direction → rise → +IR. Battery − to + (counter to conventional current inside battery) → rise → +ε. Battery + to − → drop → −ε. Apply these consistently in one traverse direction (clockwise or counter-clockwise, your choice) and the resulting equation is correct."

**Discrimination pairs [P33]:**
| Valid | Invalid |
|---|---|
| "Traverse resistor in current direction → −IR (voltage drop)" | "Traverse resistor in current direction → +IR" |
| "Battery − to + (internal) → +ε (voltage rise)" | "Battery − to + → −ε" |
| "Sum of signed terms = 0 (KVL)" | "All terms positive in KVL (no drops)" |

**s6_path:** Draw a single-loop circuit; physically trace the path of a positive test charge, tracking energy gain (battery) and loss (resistor). Connect each step to the KVL sign.

---

## Component 4 — Practice Set

### P4-a (Retrieval)
State KCL and KVL. What physical law does each one embody?

**Answer key:**
KCL: ΣI_in = ΣI_out at any junction (conservation of electric charge — no charge accumulates at a node in steady state).
KVL: ΣΔV = 0 around any closed loop (conservation of energy — no net energy change for charge completing a loop).

---

### P4-b (KCL)
At a node: currents in: 8 A, 3 A; currents out: 5 A, I_x. Find I_x.

**Answer key:** 8 + 3 = 5 + I_x → I_x = **6 A** leaving the node.

---

### P4-c (KVL — single loop)
A loop: 24 V battery (internal r = 2 Ω), external R₁ = 4 Ω, R₂ = 6 Ω in series. Find I and V across each component.

**Answer key:** KVL: 24 − 2I − 4I − 6I = 0 → 24 = 12I → I = **2.0 A**
V_r = 2×2 = 4 V; V_R₁ = 4×2 = 8 V; V_R₂ = 6×2 = 12 V; total drops = 4+8+12 = 24 V ✓

---

### P4-d (Two-loop KCL/KVL)
Two batteries: ε₁ = 9 V (r₁ = 1 Ω), ε₂ = 6 V (r₂ = 1 Ω). Connected: left branch = ε₁+r₁; right branch = ε₂+r₂; center branch = R = 3 Ω. Both batteries drive current toward the top node. Find I₁, I₂, I_R.

**Answer key:**
KCL: I₁ + I₂ = I_R
Left loop KVL: 9 − I₁(1) − I_R(3) = 0 → 9 = I₁ + 3(I₁+I₂) = 4I₁ + 3I₂ ... (i)
Right loop KVL: 6 − I₂(1) − I_R(3) = 0 → 6 = 3I₁ + 4I₂ ... (ii)
From (i)×4: 36 = 16I₁ + 12I₂; from (ii)×3: 18 = 9I₁ + 12I₂; subtract: 18 = 7I₁ → I₁ = **18/7 ≈ 2.57 A**
From (ii): 6 = 3(18/7) + 4I₂ → 4I₂ = 6 − 54/7 = 42/7 − 54/7 = −12/7 → I₂ = **−3/7 ≈ −0.43 A** (reversed)
I_R = 18/7 − 3/7 = **15/7 ≈ 2.14 A**

---

### P4-e (Analysis — power check)
For the circuit in P4-d, find power delivered by each battery and power dissipated in each resistor. Verify energy conservation.

**Answer key:**
P_ε₁ = ε₁ I₁ = 9 × 18/7 = 162/7 ≈ 23.1 W (delivered)
P_ε₂ = ε₂ I₂ = 6 × (−3/7) = −18/7 ≈ −2.57 W (charging, absorbs power)
P_r₁ = I₁²r₁ = (18/7)² × 1 ≈ 6.61 W
P_r₂ = I₂²r₂ = (3/7)² × 1 ≈ 0.184 W
P_R = I_R² × 3 = (15/7)² × 3 ≈ 13.8 W

Energy delivered: 23.1 − 2.57 = 20.5 W
Energy dissipated: 6.61 + 0.184 + 13.8 ≈ 20.6 W ✓ (rounding errors)

---

## Component 5 — Lesson Composition Grammar

```
[P01: session-open]
  → [P62: retrieval-seed] — "In a simple series circuit, how do you find current? What if the circuit has branches that can't be combined by series/parallel?"
  → [P06: concrete-anchor] — "Traffic junction: cars in = cars out (KCL). Round trip: total toll paid = zero net change (KVL). Two laws, any circuit."
  → [P41: diagnostic] — check if student knows sign convention for resistors and batteries in KVL
  → [P51: check-in]

[P28: conflict-evidence] × 2 misconceptions (MC-KVL-ONLY-APPLIES-TO-SIMPLE-LOOPS, MC-WRONG-SIGN-FOR-RESISTOR-TRAVERSAL)
  → [P30: bridge-text] for each
  → [P31: replacement-text] for each
  → [P33: discrimination-pairs] for each

[P06: concrete-anchor] — WE-2 (KCL at a junction: simple application)
  → [P06: concrete-anchor] — WE-3 (KVL single loop: systematic setup)
  → [P52: narrow] — "In WE-3: what would happen if you traversed the loop counter-clockwise? Would you get the same I?"
  → [P06: concrete-anchor] — WE-1 (two-loop: simultaneous equations)

[P36: mastery-probe] — P4-c (KVL single loop) + P4-d (two-loop KCL+KVL)
  → if < 80%: re-address sign convention and equation setup
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
State Kirchhoff's Voltage Law. What does it mean physically?

**Answer:** The algebraic sum of all potential differences (voltage rises and drops) around any closed loop in a circuit is zero: ΣΔV = 0. Physically: a charge completing a closed loop returns to its starting potential — net energy change is zero (energy conservation).

---

### AP-2 (Bloom: Understand)
Why does applying KVL to a loop that is a combination of two smaller loops give a dependent (not independent) equation?

**Answer:** The outer loop equation is the algebraic sum of the two inner loop equations. It carries no new information — any circuit variable that satisfies both inner loops automatically satisfies the outer loop. Independent equations require traversing loops that are not linear combinations of previous ones — in practice, use the smallest meshes (window panes) of the circuit as the independent loops.

---

### AP-3 (Bloom: Apply)
Loop: ε₁ = 8 V (r₁ = 0.5 Ω) and ε₂ = 5 V (r₂ = 0.5 Ω) oppose each other (in series), external R = 10 Ω. Find I and the terminal voltage of each battery.

**Answer:**
Net EMF = 8 − 5 = 3 V (ε₁ wins if its polarity dominates)
Total R = 0.5 + 0.5 + 10 = 11 Ω
I = 3/11 ≈ **0.273 A**
V_t(ε₁) = 8 − 0.273 × 0.5 = **7.86 V** (discharging)
V_t(ε₂) = 5 + 0.273 × 0.5 = **5.14 V** (being charged by ε₁)

---

### AP-4 (Bloom: Analyze)
A Wheatstone bridge has: P = 100 Ω, Q = 200 Ω, R = 150 Ω, S = ? The galvanometer reads zero (bridge balanced). Find S using the balance condition derived from KVL/KCL.

**Answer:** Balance condition (from KVL/KCL when galvanometer reads zero): P/Q = R/S → 100/200 = 150/S → S = 150 × 200/100 = **300 Ω**

---

## Component 7 — Retrieval Spacing Schedule

| Interval | Recommended activity |
|---|---|
| +1 day | KCL at a junction; KVL for single loop with correct signs |
| +3 days | Two-loop circuit: set up and solve simultaneous equations |
| +7 days | Sign convention practice: mixed polarity batteries, traversal direction |
| +21 days | Power check: verify energy conservation after solving a circuit |

---

## Component 8 — Prerequisite & Unlock Map

**Prerequisite concepts:**
- `phys.em.dc-circuits` — series/parallel rules; voltage divider; current divider

**Unlocked by this concept:**
- `phys.em.wheatstone-bridge` — balance condition from KVL/KCL
- `phys.em.potentiometer` — null-balance measurement from KVL/KCL
- `phys.em.rc-circuits` — KVL for RC loop gives differential equation

**Cross-domain links:**
- `phys.em.emf` — internal resistance + KVL = terminal voltage analysis
- `phys.em.maxwell-equations` — KVL generalises to ∮E·dl = −dΦ_B/dt (Faraday's Law)

---

## Component 9 — Validation Checklist

| Code | Check | Status |
|---|---|---|
| V-1 | concept_id matches KG | PASS |
| V-2 | domain = electromagnetism | PASS |
| V-3 | difficulty 4, bloom = apply | PASS |
| V-4 | prerequisites in KG | PASS |
| V-5 | mastery_threshold = 0.80 | PASS |
| V-6 | estimated_hours = 5 | PASS |
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
