# Teaching Blueprint — phys.therm.internal-energy

## Component 0 — Concept Identity

```yaml
concept_id: phys.therm.internal-energy
name: Internal Energy
domain: thermodynamics
difficulty:
  label: proficient
  number: 4
bloom: understand
prerequisites:
  - phys.therm.kinetic-theory
mastery_threshold: 0.80
estimated_hours: 4
cross_links:
  - phys.therm.first-law
  - phys.therm.heat-transfer
  - phys.therm.thermodynamic-processes
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 4 → C with accelerated P track)
status: READY
```

---

## Component 1 — Narrative Spine

**Hook (S0 novice):** Rub your hands together — they warm up. You did work on your hands (friction), yet no heat was transferred from a hotter body. The hand's thermal energy increased not because of heat flow but because of mechanical work. This observation was Joule's great insight: heat and work are two different routes to the same destination — a change in internal energy.

**Conceptual arc:**
1. Internal energy U: the total microscopic energy of a system — sum of translational KE, rotational KE, vibrational PE, and intermolecular PE of all molecules.
2. For an ideal gas: U depends only on T (not V or P). From kinetic theory: U = (f/2)nRT, where f = degrees of freedom (3 for monatomic, 5 for diatomic at room T).
3. Joule's paddle-wheel experiment: work W input to water in insulated container raises temperature → increases U. Heat input Q also raises U. Therefore ΔU is a state function, not path-dependent.
4. State function vs. path function: U is a state function (depends only on state, not how you got there). Q and W individually are path functions (depend on the process taken). Only ΔU = Q + W is process-independent.
5. ΔU for ideal gas: depends only on ΔT. ΔU = nC_vΔT (always, regardless of process — even non-constant-volume processes for ideal gas, because U = f(T) only).
6. ΔU = 0 for ideal gas at constant T (isothermal process). U can change via heating (ΔU = Q if W = 0) or work (ΔU = W if Q = 0) or both.
7. Enthalpy: H = U + PV. ΔH = Q_P (heat at constant pressure). For ideal gas: ΔH = nC_pΔT.
8. Internal energy of real gases: U also depends on V (intermolecular potential energy). This is why real gases cool when they expand without doing work (Joule-Thomson effect).

**Closing synthesis:** Internal energy is the master account for a system's thermal energy — the balance sheet that records all changes regardless of how they arrived. The recognition that Q and W are two currencies that can each be deposited into U was the thermodynamic revolution of the 19th century. For ideal gases, the account balance (U) depends only on T — but the deposits can come via heat, work, or any combination along any path.

---

## Component 2 — Worked Examples

### WE-1 (Concrete — ΔU for an ideal gas)

**Scenario:** 2.0 mol of monatomic ideal gas is heated from 300 K to 500 K. Find ΔU regardless of the process (constant pressure, constant volume, or any other).

**For monatomic ideal gas:** f = 3, C_v = (3/2)R = 12.47 J/(mol·K).

**ΔU = nC_vΔT = 2.0 × 12.47 × (500 − 300) = 2.0 × 12.47 × 200 = 4988 J ≈ 5.0 kJ.**

**Key point:** This is the SAME ΔU regardless of process — whether heated at constant V, constant P, or any other path — because U depends only on T for an ideal gas.

**Comparison:** If this were a constant-pressure process, Q_P = nC_pΔT = 2.0 × (5/2)(8.314) × 200 = 2.0 × 20.785 × 200 = 8314 J. The extra Q_P − ΔU = 8314 − 4988 = 3326 J went into work (PΔV = nRΔT = 2.0 × 8.314 × 200 = 3326 J). ✓

---

### WE-2 (Bridging — Joule's experiment)

**Scenario:** In Joule's paddle-wheel experiment, a 1.5 kg mass falls 2.4 m repeatedly, driving paddles in 0.5 kg of water. The process is repeated until the total mechanical work equals 4000 J. Find the temperature rise of the water, and explain why this demonstrates U is a state function.

**Heat capacity of water:** Q = mcΔT → ΔT = Q/(mc). If ΔU = W = 4000 J and all goes into water:
ΔT = 4000 / (0.5 × 4186) = 4000 / 2093 = 1.91°C.

**State function argument:** Start state: water at T₀. End state: water at T₀ + 1.91°C. This change in U (= 4000 J) was achieved entirely by work (W = 4000 J, Q = 0). If instead we had supplied 4000 J of heat (say via a hot plate) with W = 0, the water would reach exactly the same final state. Same ΔU = 4000 J regardless of path — Q alone, W alone, or any combination summing to 4000 J. This is what "state function" means.

**Answer:** ΔT ≈ 1.91°C. U is a state function: ΔU depends only on initial and final states, not on the path.

---

### WE-3 (Abstract — Joule-Thomson and real gas deviation)

**Qualitative analysis:** In the Joule-Thomson expansion, gas passes through a porous plug from high pressure to low pressure in an insulated tube. No work is done on the surroundings (ΔW = 0) and no heat is transferred (Q = 0), so ΔU = 0 by the first law.

**For an ideal gas:** U = f(T) only → ΔU = 0 → ΔT = 0. Ideal gas temperature unchanged on Joule-Thomson expansion.

**For a real gas (below inversion temperature):** U includes intermolecular potential energy (which is negative — molecules attract each other). On expansion, molecules move further apart → intermolecular PE increases (becomes less negative) → kinetic energy must decrease (since total U is fixed) → temperature FALLS. This is the basis of gas liquefaction.

**Inversion temperature:** Above this T, the gas heats on Joule-Thomson expansion (repulsive forces dominate). For N₂: T_inv ≈ 621 K; for H₂: T_inv ≈ 202 K — H₂ must be pre-cooled before Joule-Thomson liquefaction works.

**Conclusion:** The Joule-Thomson effect reveals that internal energy of a real gas depends on intermolecular distance (volume), unlike the ideal gas. The deviation from U = f(T) only is the experimental fingerprint of molecular interactions.

---

## Component 3 — Misconception Engine

### MC-U-DEPENDS-ON-PATH

**Trigger signal:** Student says "the internal energy change is different for different processes — heating at constant pressure gives different ΔU than constant volume."

**Conflict evidence [P28]:** "Compare: (A) 1 mol ideal monatomic gas heated from 300 K to 500 K at constant volume. (B) Same gas, same T change, at constant pressure. Calculate ΔU for each using ΔU = nC_vΔT."

*ΔU_A = 1 × (3/2)(8.314) × 200 = 2494 J. ΔU_B = 1 × (3/2)(8.314) × 200 = 2494 J. Same ΔU — same ΔT means same ΔU regardless of process.*

**Bridge text [P30]:** "For an ideal gas, U = (f/2)nRT — it depends only on T. Any two processes that start at the same T and end at the same T have identical ΔU. What differs is how Q and W split between them. At constant volume: Q = ΔU (no work). At constant pressure: Q = ΔU + PΔV (more heat needed because some goes to work)."

**Replacement text [P31]:** "ΔU is a state function for any system (not just ideal gas). For the same initial and final states, ΔU is always the same — whether you heat, do work, or both. For ideal gases: ΔU = nC_vΔT always — even during non-constant-volume processes. C_v appears because U depends on T only, and C_v is defined via U."

**Discrimination pairs [P33]:**
- "Ideal gas compressed isothermally (T₁ = T₂): what is ΔU?" → ΔU = nC_v × 0 = 0. No temperature change → no change in U, regardless of pressure change.
- "Same gas heated at constant P vs constant V by the same Q = 500 J: in which process does temperature rise more?" → Constant V (all Q goes to ΔU → larger ΔT). At constant P, some Q does work (raises volume against atmosphere), leaving less for ΔU.

**s6_path:** "ΔU depends on where you start and end (state), not the route. For ideal gases: same ΔT → same ΔU, always."

---

### MC-INTERNAL-ENERGY-EQUALS-HEAT

**Trigger signal:** Student uses Q and U interchangeably — "the internal energy I added was 500 J" when they mean "I added 500 J of heat."

**Conflict evidence [P28]:** "Joule's paddle-wheel: work input W = 4000 J, heat input Q = 0. Does the water's internal energy change? By how much?"

*ΔU = W = 4000 J. No heat transferred — yet internal energy increased. If U = Q, this would be impossible.*

**Bridge text [P30]:** "Internal energy U is what the system HAS — its microscopic energy store. Heat Q and work W are what the system RECEIVES or GIVES (they are transfers). U can change via Q, via W, or via both. U is the account balance; Q and W are the deposits and withdrawals."

**Replacement text [P31]:** "ΔU = Q + W (first law). If Q = 500 J and W = 0: ΔU = 500 J. If Q = 0 and W = 500 J: still ΔU = 500 J. If Q = 800 J and W = −300 J (gas expands, doing 300 J of work on surroundings): ΔU = 500 J. U is the result; Q and W are the two input routes."

**Discrimination pairs [P33]:**
- "A gas is compressed adiabatically (Q = 0). Does its internal energy change?" → Yes — W > 0 (work done on gas) → ΔU = W > 0 → T rises.
- "An ideal gas expands isothermally: ΔU = 0. Yet Q ≠ 0. What does this tell you about W?" → ΔU = Q + W = 0 → W = −Q. The gas does work equal to the heat absorbed.

**s6_path:** "Q and W are the two routes into U. U is the destination. Don't confuse the journey with the destination."

---

## Component 4 — Diagnostic Probe Set

**P4-a (prereq: kinetic theory):** For a diatomic ideal gas, U = (f/2)nRT. What is f at room temperature?
*f = 5 (3 translational + 2 rotational).*

**P4-b (state function):** 1 mol ideal monatomic gas is heated from 200 K to 600 K. Find ΔU.
*ΔU = nC_vΔT = 1 × (3/2)(8.314) × 400 = 4988 J ≈ 5.0 kJ.*

**P4-c (heat vs. work):** A gas has ΔU = 300 J and does 200 J of work on the surroundings. Find Q.
*ΔU = Q + W → W = −200 J (gas does work → negative W in sign convention where W = work done ON system). Q = ΔU − W = 300 − (−200) = 500 J absorbed.*

**P4-d (isothermal):** An ideal gas expands isothermally. What is ΔU?
*ΔU = 0 — T unchanged, U = f(T) only for ideal gas.*

**P4-e (Joule-Thomson reasoning):** A real gas expands without doing external work and without heat exchange (Q = 0, W = 0). Below the inversion temperature, does temperature rise or fall?
*Falls — ΔU = 0 but U includes intermolecular PE which increases as molecules separate; therefore kinetic energy (∝ T) decreases.*

---

## Component 5 — Socratic Thread

**Turn 1 [P41 diagnostic]:** "Rub your hands together. Where does the thermal energy increase come from? Was heat transferred from a hotter body?"

*No heat transfer — work (friction) increased kinetic energy of hand molecules.*

**Turn 2 [P06 concrete anchor]:** "In Joule's experiment: work input W = 4000 J, Q = 0. Water temperature rises. Define internal energy using this experiment."

*Internal energy U: the total microscopic energy of the system. ΔU can come from Q, W, or both.*

**Turn 3 [P28 conflict — MC-U-DEPENDS-ON-PATH]:** "Heat ideal gas from 300 to 500 K: (A) constant V, (B) constant P. Same ΔT. What is ΔU for each? Calculate using ΔU = nC_vΔT."

*Same ΔU for both — depends only on ΔT. Processes differ in how Q and W split.*

**Turn 4 [P30 bridge]:** "For ideal gas, U = (f/2)nRT. If T is the same at start and end, ΔU = 0 always. What does this imply about an isothermal process?"

*Isothermal → ΔU = 0 → Q = −W. Heat absorbed exactly equals work done.*

**Turn 5 [P51 check-in]:** "State the first law in one equation. Identify each term."

*ΔU = Q + W. ΔU = change in internal energy; Q = heat absorbed by system; W = work done ON system.*

**Turn 6 [P28 conflict — MC-INTERNAL-ENERGY-EQUALS-HEAT]:** "Gas compressed adiabatically (Q = 0). Does U change? What happens to T?"

*W > 0 (work done on gas) → ΔU = W > 0 → T rises. U changed with no heat flow at all.*

**Turn 7 [P52 narrow]:** "Distinguish: Q is a _____; W is a _____; U is a _____. (path function / state function)"

*Q: path function; W: path function; U: state function.*

**Turn 8 [P62 retrieval seed]:** "P4-c from memory: ΔU = 300 J, W_by_system = 200 J. Find Q."

*W_by_system = −W_on_system = −200 J in ΔU = Q + W. Q = ΔU − W = 300 − (−200) = 500 J.*

**Turn 9 [P36 mastery probe]:** "2.0 mol diatomic ideal gas (f=5) is heated at constant pressure from 20°C to 120°C. Find: (a) ΔU, (b) Q = nC_pΔT, (c) W = Q − ΔU."

*(a) ΔU = 2.0 × (5/2)(8.314) × 100 = 4157 J. (b) C_p = C_v + R = (5/2 + 1)R = (7/2)R. Q = 2.0 × (7/2)(8.314) × 100 = 5820 J. (c) W = 5820 − 4157 = 1663 J = nRΔT = 2.0 × 8.314 × 100 = 1663 J ✓.*

---

## Component 6 — Session Flow

```
[P01 open] → [P41 diagnostic: friction warms hands — no heat transfer] → [P06 anchor: Joule paddle-wheel defines U]
→ [MC-U-DEPENDS-ON-PATH: P28 conflict (same ΔT → same ΔU) → P30 bridge → P31 replacement → P33 pairs]
→ [WE-1: ΔU for monatomic ideal gas, 300→500 K]
→ [P51 check-in: first law ΔU = Q + W]
→ [MC-INTERNAL-ENERGY-EQUALS-HEAT: P28 conflict (adiabatic compression) → P30 bridge → P31 → P33]
→ [WE-2: Joule experiment — state function demonstration]
→ [P52 narrow: state function vs path function classification]
→ [P62 retrieval seed: P4-c (find Q from ΔU and W)]
→ [WE-3: Joule-Thomson and real gas deviation]
→ [P36 mastery probe: diatomic gas heated at constant pressure]
→ [P89 retrieval schedule: Day 1, Day 4, Day 14]
→ [P91 mastery gate: 80% on P4-a through P4-e]
→ [P85 regulation tail]
→ [P68 close]
```

---

## Component 7 — Differentiation Variants

**S0 (novice):** Start with hand-rubbing and Joule experiment story. Introduce ΔU = Q + W as the key equation. Emphasise: Q and W are different routes to the same result (ΔU). Skip WE-3 (Joule-Thomson — requires real gas knowledge).

**S1 (knows Q = mcΔT but not first-law sign convention):** Clarify sign convention immediately: W = work done ON system (positive when gas is compressed). Confusion between W_by and W_on is the most common error in first-law problems.

**S4 (prereq gap — kinetic theory weak):** Return to phys.therm.kinetic-theory. The formula U = (f/2)nRT requires knowing what f is and why U depends on T only for an ideal gas.

**S6 (math anxiety):** Provide WE-1 formula (ΔU = nC_vΔT) with C_v table. Focus on P4-b (direct substitution) and P4-d (isothermal → ΔU = 0 conceptually). Skip WE-3.

**S7 (overconfident):** Lead with WE-3 (Joule-Thomson — demands reasoning about real gas intermolecular PE) and the mastery probe (constant-pressure heating — requires three separate calculations with a potential sign-error on W).

---

## Component 8 — Retrieval Schedule

```yaml
retrieval_events:
  - offset_days: 1
    format: P4-a (f for diatomic) + P4-b (ΔU for monatomic)
  - offset_days: 4
    format: P4-c (find Q from ΔU and W) + P4-d (isothermal ΔU)
  - offset_days: 14
    format: P4-e (Joule-Thomson reasoning) + "2 mol diatomic at constant V from 300 K to 800 K: find ΔU, Q, W"
```

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly: phys.therm.internal-energy ✓
V-2  prerequisites listed in KG: phys.therm.kinetic-theory ✓
V-3  bloom verb matches level (understand): "explain … identify … distinguish … justify" ✓
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
V-16 cross_links pedagogically justified: first-law, heat-transfer, thermodynamic-processes ✓
V-17 difficulty number 4 consistent with bloom=understand and estimated_hours=4 ✓
V-18 domain "thermodynamics" matches concept_id prefix phys.therm ✓
V-19 No framework/runtime/route/schema modifications ✓
V-20 Status READY ✓
```
