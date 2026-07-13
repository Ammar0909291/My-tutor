# Teaching Blueprint — phys.therm.heat-transfer

## Component 0 — Concept Identity

```yaml
concept_id: phys.therm.heat-transfer
name: Heat Transfer
domain: thermodynamics
difficulty:
  label: developing
  number: 3
bloom: understand
prerequisites:
  - phys.therm.temperature
mastery_threshold: 0.80
estimated_hours: 4
cross_links:
  - phys.therm.specific-heat
  - phys.therm.thermal-expansion
  - phys.therm.internal-energy
session_cap: 7 TAs (estimated_hours ≥ 1h → PA-3 hard limit)
cpa_entry_stage: C (anchor; difficulty 3 → C with full CPA track)
status: READY
```

---

## Component 1 — Narrative Spine

**Hook (S0 novice):** Hold your hand near a fire — you feel heat without touching it (radiation). Touch a metal poker left in the fire — heat travels through the metal to your hand (conduction). Watch steam rise from a pot — the hot water carries energy upward as fluid motion (convection). Three mechanisms, one physical quantity: heat Q, the energy transferred because of a temperature difference.

**Conceptual arc:**
1. Heat as energy in transit: Q is not a property of a body — it is energy transferred between bodies due to ΔT. Unit: joule (J). Sign convention: Q > 0 = heat absorbed by system; Q < 0 = heat released.
2. **Conduction:** heat flows through a material without bulk motion of matter. Fourier's law: rate of heat flow H = −kA(dT/dx) [W]. For a uniform slab: H = kA(T_H − T_C)/L. k = thermal conductivity [W/(m·K)]; good conductors: copper (400), steel (50); insulators: wood (0.15), air (0.024).
3. **Convection:** heat transfer by bulk fluid motion. Natural (density-driven buoyancy) or forced (fan, pump). Newton's law of cooling: H = hA(T_s − T_∞), where h is the convective heat transfer coefficient [W/(m²·K)]. No single formula for h — depends on geometry and flow.
4. **Radiation:** all objects emit and absorb electromagnetic radiation. Stefan-Boltzmann law: P = εσAT⁴ [W], where σ = 5.67 × 10⁻⁸ W/(m²·K⁴) and ε = emissivity (0 to 1; ε = 1 for ideal blackbody). Net power: P_net = εσA(T⁴ − T_env⁴).
5. **Thermal resistance** (R-value): R = L/(kA) [K/W] for conduction. Series combination: R_total = R₁ + R₂ + … (analogous to electrical resistance). Parallel: 1/R_total = 1/R₁ + 1/R₂.
6. **Newton's law of cooling** (empirical): dT/dt = −k(T − T_env); solution T(t) = T_env + (T₀ − T_env)e^(−kt). Valid for small ΔT (dominated by convection/conduction, not radiation).
7. **Insulation design:** minimise conduction (low k, thick layers), convection (dead air spaces — fibreglass insulation), and radiation (reflective surfaces — space blankets, thermos flask).

**Closing synthesis:** Heat transfer is the mechanism by which temperature differences are eliminated. Conduction and convection require a material medium; radiation does not — it traverses vacuum. In practical insulation (thermos flasks, building walls, spacecraft), all three mechanisms operate and must each be addressed. The thermal resistance model unifies conduction analysis into an electrical-circuit analogy that makes multi-layer problems tractable.

---

## Component 2 — Worked Examples

### WE-1 (Concrete — conduction through a wall)

**Scenario:** A brick wall (k = 0.72 W/(m·K)) is 25 cm thick and has area 20 m². Indoor temperature = 22°C; outdoor = −5°C. Find the rate of heat loss through the wall.

**Formula:** H = kA(T_H − T_C)/L.

**Values:** k = 0.72; A = 20; T_H − T_C = 22 − (−5) = 27°C = 27 K; L = 0.25 m.

H = (0.72 × 20 × 27) / 0.25 = 388.8 / 0.25 = 1555 W ≈ 1.56 kW.

**Cost implication:** 1.56 kW × 24 h = 37.4 kWh/day. At £0.30/kWh: £11.22/day of heating just for this wall.

**Adding insulation:** A 5 cm fibreglass layer (k = 0.04) is added. Total R = L_brick/(kA) + L_insul/(kA) = (0.25/0.72 + 0.05/0.04)/20 = (0.347 + 1.25)/20 = 0.0799 K/W. New H = ΔT/R = 27/0.0799 ≈ 338 W — an 78% reduction.

**Answer:** H = 1.56 kW without insulation; 338 W with 5 cm fibreglass.

---

### WE-2 (Bridging — Stefan-Boltzmann radiation)

**Scenario:** A human body (skin area A = 1.8 m², ε = 0.97, T_skin = 33°C = 306 K) is in a room at T_room = 20°C = 293 K. Find the net power radiated.

**Formula:** P_net = εσA(T_skin⁴ − T_room⁴).

**Compute T⁴ values:**
T_skin⁴ = (306)⁴. Let's compute: 306² = 93636; 306⁴ = (93636)² ≈ 8.767 × 10⁹ K⁴.
T_room⁴ = (293)⁴. 293² = 85849; 293⁴ ≈ (85849)² ≈ 7.370 × 10⁹ K⁴.

**Net:**
P_net = 0.97 × 5.67×10⁻⁸ × 1.8 × (8.767 − 7.370) × 10⁹
= 0.97 × 5.67×10⁻⁸ × 1.8 × 1.397 × 10⁹
= 0.97 × 5.67 × 1.8 × 1.397 × 10 W
= 0.97 × 5.67 × 2.515 × 10 W
= 0.97 × 142.6 = 138.3 W ≈ 138 W.

**Answer:** The body radiates a net ~138 W to the room — comparable to a 100W light bulb. This is why humans need to eat ~2000 kcal/day and why a crowded room heats up.

---

### WE-3 (Abstract — Newton's law of cooling)

**Scenario:** A cup of coffee at 90°C is placed in a room at 20°C. After 10 minutes, its temperature is 70°C. Find the temperature after 20 minutes.

**Newton's law of cooling:**
dT/dt = −k(T − T_env).
T(t) = T_env + (T₀ − T_env)e^(−kt).

**Step 1 — Find k:**
At t = 10 min: 70 = 20 + (90 − 20)e^(−10k) → 50 = 70e^(−10k) → e^(−10k) = 50/70 = 5/7.
−10k = ln(5/7) = −0.3365 → k = 0.03365 min⁻¹.

**Step 2 — Temperature at t = 20 min:**
T(20) = 20 + 70 × e^(−20 × 0.03365) = 20 + 70 × e^(−0.6730) = 20 + 70 × 0.5102 = 20 + 35.7 = 55.7°C ≈ 56°C.

**Verification:** Notice (T − 20) ratio: at t=0: 70; at t=10: 50; at t=20: 35.7. Ratio 50/70 = 71.4%; 35.7/50 = 71.4% — confirmed exponential decay. ✓

**Answer:** Temperature at 20 min ≈ 56°C.

---

## Component 3 — Misconception Engine

### MC-HEAT-IS-A-SUBSTANCE

**Trigger signal:** Student says "the metal has more heat in it" or "heat flows into the water and stays there."

**Conflict evidence [P28]:** "If heat were a substance stored inside objects, you'd be able to weigh the heat: a hot metal block should weigh more than a cold one. Is that true? What does a precision balance show if you heat and weigh the same block?"

*No measurable mass change. Heat is not a substance — it is energy in transit. The caloric theory (17th–18th century) proposed heat as a fluid; it was disproved by Rumford's cannon-boring experiment (1798).*

**Bridge text [P30]:** "Objects don't 'contain heat' in the way they contain water. They contain internal energy (U) — the total thermal energy of their atoms. Heat (Q) is the transfer of some of that energy to another object because of a temperature difference. Once the transfer is complete, there is no 'heat' left — only changed internal energies."

**Replacement text [P31]:** "Correct language: 'The metal transferred Q joules of heat to the water' or 'The water absorbed Q joules.' Incorrect: 'The water has Q joules of heat in it.' The water has changed internal energy by Q joules — but that energy is now indistinguishably part of the water's thermal energy store."

**Discrimination pairs [P33]:**
- "A 100 J heat transfer occurs from hot metal to cool water. How much 'heat' does the water now contain?" → The question is malformed — water doesn't 'contain' heat. Its internal energy increased by 100 J; heat was the mechanism of transfer.
- "Can work also increase internal energy?" → Yes — rubbing your hands together heats them via work (friction), not heat transfer.

**s6_path:** "Heat is a verb (transferring), not a noun (storing). Once transferred, it becomes internal energy."

---

### MC-CONDUCTION-CONVECTION-RADIATION-SAME-RATE

**Trigger signal:** Student treats all three mechanisms as interchangeable with the same formula or assumes they operate at the same rate for any given temperature difference.

**Conflict evidence [P28]:** "A thermos flask: it has a vacuum between two walls, a silvered inner surface, and no material connecting the inner and outer shells. Which of the three mechanisms does each feature specifically block? Could this design work if all three mechanisms were equivalent?"

*Vacuum: eliminates conduction and convection (no medium). Silvered walls: reduces radiation (low emissivity). The design exploits the distinct physics of each mechanism — if all three were the same, you couldn't selectively block radiation without blocking conduction.*

**Bridge text [P30]:** "The three mechanisms transfer heat by completely different physical processes: conduction requires atomic vibration coupling (needs material); convection requires bulk fluid motion (needs fluid, responds to gravity); radiation requires only electromagnetic waves (needs nothing). Each has its own governing equation and rate dependence: conduction ∝ ΔT (Fourier), radiation ∝ T⁴ (Stefan-Boltzmann) — a factor of T³ difference in temperature sensitivity."

**Replacement text [P31]:** "At low temperatures, radiation is negligible (T⁴ is small) and conduction/convection dominate. At high temperatures (e.g., a furnace), radiation dominates because T⁴ grows so fast. At intermediate temperatures (a house wall), all three may be present but with very different magnitudes. Engineering insulation targets whichever mechanism dominates for the specific temperature regime."

**Discrimination pairs [P33]:**
- "A pot of boiling water: which mechanism heats the top layer of water from hot burner below?" → Primarily convection (hot water rises) and some conduction through the water.
- "Sun heating Earth from 150 million km away: which mechanism?" → Only radiation — vacuum of space prevents conduction and convection.

**s6_path:** "Three mechanisms: think of them as three different pipes that heat can travel through. Each pipe has different physics and different conditions under which it dominates."

---

## Component 4 — Diagnostic Probe Set

**P4-a (prereq: temperature direction):** In which direction does heat spontaneously flow between a 400 K object and a 300 K object?
*From 400 K to 300 K.*

**P4-b (conduction):** A copper rod (k = 400 W/(m·K)), L = 0.5 m, A = 4 cm² = 4×10⁻⁴ m², with T_H = 100°C, T_C = 20°C. Find H.
*H = 400 × 4×10⁻⁴ × 80 / 0.5 = 25.6 W.*

**P4-c (radiation):** A blackbody (ε = 1) at 1000 K has surface area 0.01 m². Find its total radiated power.
*P = εσAT⁴ = 1 × 5.67×10⁻⁸ × 0.01 × (1000)⁴ = 5.67×10⁻⁸ × 10¹⁰ × 0.01 = 5670 W.*

**P4-d (Newton's cooling):** An object at 80°C cools to 60°C in 5 minutes in a 20°C room. Find k in Newton's law.
*T(t) = 20 + 60e^(−5k) = 60 → 40 = 60e^(−5k) → k = ln(3/2)/5 = 0.0811 min⁻¹.*

**P4-e (mechanism identification):** Identify the dominant heat transfer mechanism in each case: (a) Sun heating Earth; (b) heating the bottom of a swimming pool from the surface (sun shining down); (c) hot coffee cooling in a cup.
*(a) Radiation (vacuum). (b) Radiation from sun + convection within water. (c) All three: conduction through cup walls, convection of air above, radiation from liquid surface.*

---

## Component 5 — Socratic Thread

**Turn 1 [P41 diagnostic]:** "Touch a metal table and a wooden table in the same room. Which feels colder? Are they at different temperatures?"

*Both at room temperature. Metal feels colder because it conducts heat away from your hand faster — higher k.*

**Turn 2 [P06 concrete anchor]:** "Name the three mechanisms by which heat can travel. Give one everyday example of each."

*Conduction: metal spoon in hot soup. Convection: hot air rising from radiator. Radiation: sun warming your face.*

**Turn 3 [P28 conflict — MC-HEAT-IS-A-SUBSTANCE]:** "If I heat a block of iron, does it gain mass? What does this tell you about whether heat is a substance?"

*No mass gain — heat is energy transfer, not a substance. The block gains internal energy, not a material substance.*

**Turn 4 [P30 bridge]:** "Objects store internal energy; heat is the transfer process. A kettle's water gains internal energy — but after transfer, is there any 'heat' left in the water?"

*No — only internal energy. Heat is the verb, not the noun.*

**Turn 5 [P51 check-in]:** "Fourier's law for conduction: H = kA(ΔT)/L. What does each symbol mean physically? What makes k large?"

*k = thermal conductivity [W/(m·K)]; larger for metals (more free electrons for energy transport).*

**Turn 6 [P28 conflict — MC-ALL-MECHANISMS-SAME]:** "A thermos flask keeps coffee hot. It has vacuum between walls and silvered surfaces. Why specifically does vacuum help? Why silvering? What would be missing if you only had one of these features?"

*Vacuum: no conduction or convection. Silvering: reduces radiation (low emissivity). Without vacuum: conduction/convection would dominate. Without silvering: radiation would leak.*

**Turn 7 [P52 narrow]:** "Stefan-Boltzmann: P ∝ T⁴. If T doubles, power increases by how much?"

*2⁴ = 16× — radiation is very sensitive to absolute temperature.*

**Turn 8 [P62 retrieval seed]:** "WE-3 type: object at 80°C in 20°C room, k = 0.05 min⁻¹ in Newton's law. What temperature after 10 min?"

*T(10) = 20 + 60e^(−0.5) = 20 + 60 × 0.607 = 20 + 36.4 = 56.4°C.*

**Turn 9 [P36 mastery probe]:** "A double-glazed window: 4 mm glass (k = 1 W/(m·K)) | 12 mm air gap (k = 0.024) | 4 mm glass. Area = 2 m². ΔT = 25°C across window. Find total R and rate of heat loss."

*R_glass1 = L/(kA) = 0.004/(1×2) = 0.002 K/W each. R_air = 0.012/(0.024×2) = 0.25 K/W. R_total = 0.002 + 0.25 + 0.002 = 0.254 K/W. H = ΔT/R = 25/0.254 = 98 W.*

---

## Component 6 — Session Flow

```
[P01 open] → [P41 diagnostic: metal vs wooden table sensation] → [P06 anchor: three mechanisms with everyday examples]
→ [MC-HEAT-IS-A-SUBSTANCE: P28 conflict (mass of hot iron) → P30 bridge → P31 replacement → P33 pairs]
→ [WE-1: brick wall conduction + insulation comparison]
→ [P51 check-in: Fourier's law terms]
→ [MC-ALL-MECHANISMS-SAME: P28 conflict (thermos flask) → P30 bridge → P31 replacement → P33 pairs]
→ [WE-2: radiation from human body]
→ [P52 narrow: T⁴ sensitivity of radiation]
→ [WE-3: Newton's law of cooling — coffee problem]
→ [P62 retrieval seed: Newton's law application]
→ [P36 mastery probe: double-glazed window thermal resistance]
→ [P89 retrieval schedule: Day 1, Day 4, Day 14]
→ [P91 mastery gate: 80% on P4-a through P4-e]
→ [P85 regulation tail]
→ [P68 close]
```

---

## Component 7 — Differentiation Variants

**S0 (novice):** Start with spoon sensation and the three-mechanism naming. Introduce conduction only (WE-1) with the formula, skip derivations. Radiation is introduced conceptually only (sun example). Skip WE-3 (Newton's cooling — needs exponential function).

**S1 (knows names, no quantitative fluency):** Ask them to compare: which mechanism matters most for a house in winter? Force ranking before introducing formulas. Then WE-1 and WE-3 to build quantitative facility.

**S4 (prereq gap — temperature weak):** Return to phys.therm.temperature. Conduction requires ΔT in Kelvin or Celsius (same for differences), but radiation requires absolute T (T⁴). Kelvin/Celsius distinction must be secure.

**S6 (math anxiety):** Focus on WE-1 (one substitution) and the thermal resistance analogy (like electrical resistance — already familiar). Skip T⁴ computation of WE-2; use given result. Newton's cooling: present result only, not derivation.

**S7 (overconfident):** Lead with WE-2 (body radiation — student must compute T⁴ × 10⁹ terms) and the mastery probe (double-glazed window in series — must apply series resistance correctly).

---

## Component 8 — Retrieval Schedule

```yaml
retrieval_events:
  - offset_days: 1
    format: P4-a (heat flow direction) + P4-b (copper rod conduction)
  - offset_days: 4
    format: P4-c (blackbody radiation) + P4-e (mechanism identification)
  - offset_days: 14
    format: P4-d (Newton's cooling — find k) + "multi-layer wall: brick + insulation in series, find H"
```

---

## Component 9 — Validation Checklist

```
V-1  concept_id matches KG exactly: phys.therm.heat-transfer ✓
V-2  prerequisites listed in KG: phys.therm.temperature ✓
V-3  bloom verb matches level (understand): "identify … explain … apply … justify" ✓
V-4  mastery_threshold = 0.80 ✓
V-5  session_cap present: 7 TAs ✓
V-6  cpa_entry_stage correct for difficulty 3: "C (anchor; difficulty 3 → C with full CPA track)" ✓
V-7  Narrative Spine covers hook → arc → synthesis ✓
V-8  3 worked examples (Concrete / Bridging / Abstract) ✓
V-9  Misconception Engine: 2 MCs, each with all 6 fields ✓
V-10 Diagnostic Probe Set: 5 probes (P4-a to P4-e) ✓
V-11 Socratic Thread: 9 turns, correct Primitive codes ✓
V-12 Session Flow: linear sequence with all required Primitives ✓
V-13 Differentiation Variants: S0/S1/S4/S6/S7 covered ✓
V-14 Retrieval Schedule: 3 events at Day 1/4/14 ✓
V-15 All Primitive codes valid (P01 P06 P28 P30 P31 P33 P36 P41 P51 P52 P62 P68 P85 P89 P91) ✓
V-16 cross_links pedagogically justified: specific-heat, thermal-expansion, internal-energy ✓
V-17 difficulty number 3 consistent with bloom=understand and estimated_hours=4 ✓
V-18 domain "thermodynamics" matches concept_id prefix phys.therm ✓
V-19 No framework/runtime/route/schema modifications ✓
V-20 Status READY ✓
```
