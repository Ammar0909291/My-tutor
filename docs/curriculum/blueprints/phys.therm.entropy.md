# Teaching Blueprint — phys.therm.entropy

## Component 0 — Concept Identity

```yaml
concept_id: phys.therm.entropy
name: Entropy
domain: thermodynamics
difficulty:
  label: advanced
  number: 5
bloom: analyze
prerequisites:
  - phys.therm.second-law
mastery_threshold: 0.80
estimated_hours: 6
cross_links:
  - phys.therm.carnot-cycle
  - phys.therm.third-law
  - phys.stat.boltzmann-entropy
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 5 → C with accelerated P track)
status: READY
```

---

## Component 1 — Narrative Spine

**Hook (S0 novice):** "Entropy" is one of the most misused words in popular science — "the universe is becoming more disordered, entropy always increases." But entropy has a precise mathematical definition, and it connects the macroscopic (heat and temperature) to the microscopic (number of molecular configurations). Understanding it properly reveals why time has a direction, why heat engines can't be 100% efficient, and why ice cubes melt but never spontaneously form in a warm room.

**Conceptual arc:**
1. Clausius definition: for a reversible process, dS = δQ_rev/T. Entropy change: ΔS = ∫(δQ_rev/T). Units: J/K.
2. For a reversible isothermal process: ΔS = Q_rev/T (T = constant).
3. For a constant-pressure heating: ΔS = mc ln(T₂/T₁) (integral of mc dT/T from T₁ to T₂).
4. Entropy as state function: like U, entropy depends only on the state — not the path. ΔS is the same for any process (reversible or irreversible) between the same two states. Use a reversible path to calculate.
5. Second law in entropy language: for any process, ΔS_universe = ΔS_system + ΔS_surroundings ≥ 0. Equality for reversible; > for irreversible.
6. Entropy change in irreversible processes: for an irreversible process (e.g., heat across finite ΔT, free expansion), ΔS_universe > 0 — entropy is generated.
7. Boltzmann's statistical definition: S = k_B ln Ω, where Ω = number of accessible microstates. Entropy is a measure of disorder (or more precisely, of the number of ways the system can be arranged while appearing the same macroscopically).
8. Connection: ΔS = k_B ln(Ω₂/Ω₁). For ideal gas doubling in volume: Ω₂/Ω₁ = 2^N → ΔS = Nk_B ln2 = nR ln2.
9. Entropy in reversible processes: a Carnot engine is reversible → ΔS_universe = 0. Q_H/T_H = Q_C/T_C (entropy of hot reservoir decrease = entropy of cold reservoir increase).

**Closing synthesis:** Entropy is simultaneously a bookkeeping tool (how much "spread" a process has in energy and configuration space) and a fundamental physical quantity (the state function that defines irreversibility). The connection S = k_B ln Ω is one of the most profound equations in physics — it bridges Boltzmann's atoms and Clausius's macroscopic heat. The second law says the universe's entropy account never shrinks: every natural process either maintains it (reversible) or increases it (irreversible).

---

## Component 2 — Worked Examples

### WE-1 (Concrete — isothermal entropy change)

**Scenario:** 500 g of water is heated from 20°C to 80°C at constant pressure. Find ΔS. (c_water = 4186 J/(kg·K))

**Formula:** ΔS = mc ln(T₂/T₁). T₁ = 293 K; T₂ = 353 K.

ΔS = 0.5 × 4186 × ln(353/293) = 2093 × ln(1.2048) = 2093 × 0.1862 = 389.7 J/K.

**Interpretation:** The water's entropy increased by 390 J/K — it became "more disordered" (water molecules have more thermal energy spread across more microstates). The surroundings (heat source) had ΔS_surr = −Q/T_source. If the heat source was at 100°C = 373 K: ΔS_surr = −Q_absorbed/373.

Q absorbed = mc ΔT = 0.5 × 4186 × 60 = 125 580 J.
ΔS_surr = −125 580/373 = −336.7 J/K.

ΔS_universe = 389.7 + (−336.7) = +53 J/K > 0 — irreversible process (finite temperature difference between source and water). ✓

---

### WE-2 (Bridging — entropy and Carnot cycle)

**Show** that ΔS_universe = 0 for a Carnot cycle. T_H = 600 K, T_C = 300 K, Q_H = 1000 J.

**Entropy change of hot reservoir:**
ΔS_H = −Q_H/T_H = −1000/600 = −1.667 J/K.

**For Carnot engine:** η = 1 − T_C/T_H = 0.5. W_out = 500 J. Q_C = 500 J.

**Entropy change of cold reservoir:**
ΔS_C = +Q_C/T_C = +500/300 = +1.667 J/K.

**Entropy change of engine (returns to initial state per cycle):**
ΔS_engine = 0.

**Total:** ΔS_universe = ΔS_H + ΔS_C + ΔS_engine = −1.667 + 1.667 + 0 = 0.

**Answer:** ΔS_universe = 0 for Carnot cycle — confirmed reversible. This is the defining characteristic of the Carnot cycle: it operates at maximum efficiency while leaving total entropy unchanged.

---

### WE-3 (Abstract — entropy increase in free expansion)

**Calculate ΔS for 1.0 mol ideal gas expanding freely from V₁ = 1.0 L to V₂ = 3.0 L at T = 300 K.**

**Issue:** Free expansion is irreversible — we can't directly use dS = δQ_rev/T (Q = 0, W = 0). But entropy is a state function — use any reversible path between the same states.

**Reversible path:** Isothermal expansion at 300 K from 1.0 L to 3.0 L.

ΔS_system = Q_rev/T = W_by/T (isothermal: Q_rev = W_by) = nRT ln(V₂/V₁)/T = nR ln(V₂/V₁).
ΔS_system = 1.0 × 8.314 × ln(3) = 8.314 × 1.099 = 9.13 J/K.

**Surroundings in actual free expansion:** Q_actual = 0 → ΔS_surr = 0.

**ΔS_universe = 9.13 + 0 = 9.13 J/K > 0 — irreversible, as expected.**

**Comparison to reversible isothermal:** ΔS_system = 9.13 J/K (same — state function). But ΔS_surr = −9.13 J/K (surroundings cool, entropy decreases). ΔS_universe = 0 — reversible. The free expansion "destroys" 9.13 J/K of work capacity, permanently.

---

## Component 3 — Misconception Engine

### MC-ENTROPY-IS-DISORDER-IN-EVERYDAY-SENSE

**Trigger signal:** Student says "entropy is just messiness" or "entropy of a room increases when you don't tidy it."

**Conflict evidence [P28]:** "A perfectly tidy crystal of NaCl (all atoms in rigid lattice) has less entropy than liquid NaCl at the same temperature. A gas of NaCl at even higher T has even more entropy. Is the 'messiness' the key variable, or is there something more precise?"

*The crystal's atoms have only a few possible arrangements (low Ω, low S). Liquid NaCl's atoms can be in far more arrangements (higher Ω, higher S). Entropy tracks the number of microstates accessible to the system, not visual disorder.*

**Bridge text [P30]:** "Entropy is a precisely defined physical quantity: S = k_B ln Ω, where Ω is the number of equivalent microstates. A tidy room can have high entropy (if the air molecules are at high temperature, providing many energy microstates). An 'untidy' room can have low entropy (if everything is cold and nearly motionless). The everyday meaning of 'disorder' is a loose analogy, not the definition."

**Replacement text [P31]:** "Entropy measures spread: spread of energy over degrees of freedom, spread of particles over accessible positions. S = k_B ln Ω. Higher T → more kinetic energy configurations → higher Ω → higher S. Larger V → molecules can be in more positions → higher Ω → higher S. The 'disorder' analogy is useful but imprecise — the precise meaning is statistical."

**Discrimination pairs [P33]:**
- "1 mol of N₂ at 300 K, V₁ = 1 L vs. V₂ = 10 L. Which has higher entropy?" → V₂ = 10 L — more positions accessible → higher Ω → higher S. ΔS = nR ln(10/1) = 19.1 J/K.
- "1 mol of N₂ at 300 K vs. 1 mol at 600 K, same V. Which has higher entropy?" → 600 K — more kinetic energy microstates accessible → higher Ω → higher S.

**s6_path:** "Entropy = microscopic spread (in position and energy), not visual tidiness."

---

### MC-ENTROPY-ALWAYS-INCREASES-FOR-EVERY-SYSTEM

**Trigger signal:** Student says "entropy always increases — so my cup of coffee can't cool down (that would decrease its entropy)."

**Conflict evidence [P28]:** "A coffee cup cools from 90°C to 20°C. Calculate ΔS_coffee and ΔS_surroundings. Which decreases? Which increases? What is ΔS_universe?"

*ΔS_coffee = mc ln(T₂/T₁) = mc ln(293/363) < 0 (coffee cools → S decreases). ΔS_surr = +Q/T_room > 0 (room absorbs heat → S increases). ΔS_universe = ΔS_coffee + ΔS_surr > 0 always.*

**Bridge text [P30]:** "The second law applies to ΔS_universe (system + surroundings) — not to any single system in isolation. A system's entropy can decrease (ice forming, crystal growing, coffee cooling) if the surroundings' entropy increases by at least as much. 'Entropy always increases' is shorthand for 'total entropy of the universe never decreases.'"

**Replacement text [P31]:** "ΔS_universe ≥ 0 (always). ΔS_system can be positive, negative, or zero. Entropy of a subsystem decreasing is fine — as long as surroundings gain at least as much. The second law requires the sum to be non-negative. A refrigerator makes food colder (ΔS_food < 0) while generating heat in the kitchen (ΔS_room > |ΔS_food|) → ΔS_universe > 0."

**Discrimination pairs [P33]:**
- "Can the entropy of 1 kg of ice decrease as it freezes?" → Yes — ΔS_ice = −mL_f/T < 0. But freezer's motor generates heat in the room: ΔS_room > |ΔS_ice|.
- "A star contracts under gravity, becoming denser and more 'ordered.' Does this violate the second law?" → No — the star also radiates enormous entropy (photons) into space, more than compensating for its own increased order.

**s6_path:** "The second law's 'entropy increases' always refers to the universe (system + all surroundings), never to an isolated component."

---

## Component 4 — Diagnostic Probe Set

**P4-a (prereq: second law):** State the second law in entropy language (one sentence).
*ΔS_universe ≥ 0 for any process; = 0 for reversible, > 0 for irreversible.*

**P4-b (isothermal ΔS):** Find ΔS when 200 g of water absorbs 10 000 J at constant T = 50°C = 323 K.
*ΔS = Q/T = 10 000/323 = 30.96 J/K.*

**P4-c (heating ΔS):** 1.0 mol of monatomic ideal gas is heated at constant volume from 300 K to 900 K. Find ΔS. (C_v = (3/2)R)
*ΔS = nC_v ln(T₂/T₁) = 1 × (3/2)(8.314) × ln(900/300) = 12.47 × ln(3) = 12.47 × 1.099 = 13.7 J/K.*

**P4-d (state function):** An irreversible process takes a gas from state A to state B. To calculate ΔS, which path should you integrate dQ/T along?
*Any reversible path between A and B — ΔS is a state function, independent of path.*

**P4-e (universe entropy):** 100 J of heat flows from a 400 K body to a 300 K body directly (irreversible). Find ΔS_universe.
*ΔS_hot = −100/400 = −0.25 J/K. ΔS_cold = +100/300 = +0.333 J/K. ΔS_universe = +0.083 J/K > 0. ✓*

---

## Component 5 — Socratic Thread

**Turn 1 [P41 diagnostic]:** "If entropy always increases, can a cup of coffee ever cool down? Explain what 'always increases' actually means."

*Coffee's entropy decreases — surroundings gain more. "Always increases" = ΔS_universe, not any single system.*

**Turn 2 [P06 concrete anchor]:** "For a reversible isothermal process: dS = δQ_rev/T. Heat absorbed = 500 J at T = 350 K. What is ΔS?"

*ΔS = 500/350 = 1.43 J/K.*

**Turn 3 [P28 conflict — MC-ENTROPY-IS-DISORDER-IN-EVERYDAY-SENSE]:** "Is a tidy crystal or a messy gas at the same temperature higher entropy? What is the precise definition?"

*Crystal: fewer microstates (lower Ω, lower S). Gas: many microstates (higher Ω, higher S). S = k_B ln Ω.*

**Turn 4 [P30 bridge]:** "S = k_B ln Ω: Ω = number of accessible microstates. More energy (higher T) → more microstates. More volume → more position states. Both increase S."

**Turn 5 [P51 check-in]:** "Entropy is a state function. For free expansion (irreversible): how do you calculate ΔS_system?"

*Use a reversible path between same two states — e.g., isothermal expansion. ΔS_system = nR ln(V₂/V₁).*

**Turn 6 [P28 conflict — MC-ALWAYS-INCREASES-FOR-EVERY-SYSTEM]:** "P4-e: 100 J flows hot→cold. Calculate ΔS for each body and ΔS_universe."

*ΔS_hot = −0.25; ΔS_cold = +0.333; ΔS_universe = +0.083 J/K > 0.*

**Turn 7 [P52 narrow]:** "ΔS_universe = 0 for Carnot, > 0 for real engines. What does ΔS_universe > 0 destroy?"

*Work capacity — entropy generation = permanently lost ability to do work. Called "exergy destruction" in engineering.*

**Turn 8 [P62 retrieval seed]:** "P4-c: 1 mol monatomic gas, constant V, 300→900 K. Find ΔS."

*ΔS = nC_v ln(T₂/T₁) = (3/2)R × ln3 = 13.7 J/K.*

**Turn 9 [P36 mastery probe]:** "WE-1 type: 300 g of water heated from 10°C to 90°C at constant pressure. A heat source at 100°C provides the heat. Find ΔS_water, ΔS_source, ΔS_universe."

*ΔS_water = 0.3 × 4186 × ln(363/283) = 1255.8 × 0.2485 = 312.3 J/K. Q = 0.3 × 4186 × 80 = 100 464 J. ΔS_source = −100 464/373 = −269.3 J/K. ΔS_universe = 312.3 − 269.3 = 43.0 J/K > 0.*

---

## Component 6 — Session Flow

```
[P01 open] → [P41 diagnostic: "entropy always increases" — system or universe?] → [P06 anchor: dS = δQ_rev/T — isothermal example]
→ [MC-ENTROPY-IS-DISORDER-IN-EVERYDAY-SENSE: P28 conflict → P30 bridge (S = k_B ln Ω) → P31 → P33]
→ [WE-1: water heated — ΔS_water and ΔS_universe]
→ [P51 check-in: state function — use reversible path for irreversible process]
→ [WE-2: Carnot cycle ΔS_universe = 0]
→ [MC-ENTROPY-ALWAYS-INCREASES-FOR-EVERY-SYSTEM: P28 conflict → P30 bridge → P31 → P33]
→ [P52 narrow: ΔS_universe > 0 destroys work capacity]
→ [P62 retrieval seed: P4-c constant-volume heating]
→ [WE-3: free expansion ΔS — using reversible path]
→ [P36 mastery probe: water heated, source at 100°C — three ΔS calculations]
→ [P89 retrieval schedule: Day 1, Day 4, Day 14]
→ [P91 mastery gate: 80% on P4-a through P4-e]
→ [P85 regulation tail]
→ [P68 close]
```

---

## Component 7 — Differentiation Variants

**S0 (novice):** Start with the coffee cooling example and the universe vs. system distinction. Introduce ΔS = Q/T for isothermal only (P4-b). Skip the logarithmic forms and WE-3. Establish S = k_B ln Ω qualitatively.

**S1 (knows S = k_B ln Ω, no Clausius integral):** Ask them to derive ΔS = nR ln(V₂/V₁) for isothermal expansion from S = k_B ln Ω (count position microstates: Ω ∝ V^N). Then connect to the thermodynamic formula ΔS = Q_rev/T.

**S4 (prereq gap — second law weak):** Return to phys.therm.second-law. The entropy statement of the second law requires the Clausius/Kelvin-Planck statements as groundwork. P4-a reveals whether this is secure.

**S6 (math anxiety):** Focus on isothermal ΔS = Q/T (P4-b). Provide ΔS = mc ln(T₂/T₁) as a formula without deriving. Calculator for ln calculations. Skip WE-3 (free expansion — state function reasoning required).

**S7 (overconfident):** Lead with WE-3 (free expansion — requires recognising that the irreversible path can't be used, then constructing the reversible path). Then push: "What is the minimum work required to restore the gas from state B back to state A?" (= T_env × ΔS_universe_forward — exergy concept.)

---

## Component 8 — Retrieval Schedule

```yaml
retrieval_events:
  - offset_days: 1
    format: P4-a (second law in entropy language) + P4-b (isothermal ΔS)
  - offset_days: 4
    format: P4-c (constant volume heating — logarithmic ΔS) + P4-e (universe entropy for hot→cold flow)
  - offset_days: 14
    format: P4-d (state function — which path for irreversible?) + "calculate ΔS_universe when 2 kg of ice at 0°C melts in a room at 25°C — is this spontaneous?"
```

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly: phys.therm.entropy ✓
V-2  prerequisites listed in KG: phys.therm.second-law ✓
V-3  bloom verb matches level (analyze): "analyze … derive … calculate … interpret" ✓
V-4  mastery_threshold = 0.80 ✓
V-5  session_cap present: 7 TAs ✓
V-6  cpa_entry_stage correct for difficulty 5: "C (anchor; difficulty 5 → C with accelerated P track)" ✓
V-7  Narrative Spine covers hook → arc → synthesis ✓
V-8  3 worked examples (Concrete / Bridging / Abstract) ✓
V-9  Misconception Engine: 2 MCs, each with all 6 fields ✓
V-10 Diagnostic Probe Set: 5 probes (P4-a to P4-e) ✓
V-11 Socratic Thread: 9 turns, correct Primitive codes ✓
V-12 Session Flow: linear sequence with all required Primitives ✓
V-13 Differentiation Variants: S0/S1/S4/S6/S7 covered ✓
V-14 Retrieval Schedule: 3 events at Day 1/4/14 ✓
V-15 All Primitive codes valid (P01 P06 P28 P30 P31 P33 P36 P41 P51 P52 P62 P68 P85 P89 P91) ✓
V-16 cross_links pedagogically justified: carnot-cycle, third-law, Boltzmann entropy ✓
V-17 difficulty number 5 consistent with bloom=analyze and estimated_hours=6 ✓
V-18 domain "thermodynamics" matches concept_id prefix phys.therm ✓
V-19 No framework/runtime/route/schema modifications ✓
V-20 Status READY ✓
```
