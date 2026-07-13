# phys.therm.calorimetry — Calorimetry

## 1. Identity

| Field | Value |
|---|---|
| **Concept ID** | `phys.therm.calorimetry` |
| **Display name** | Calorimetry |
| **KG requires** | `phys.therm.specific-heat` |
| **KG unlocks** | `phys.therm.phase-transitions` |
| **Difficulty** | developing |
| **Bloom level** | apply |
| **Mastery threshold** | 0.80 |
| **Estimated hours** | 3 |
| **KG description** | Calorimetry measures heat exchange using the principle that heat lost by a hot body equals heat gained by a cold body. |

---

## 2. Mental Models

### Stage 1 — Intuitive (no formalism)

Drop a hot coin into a cold glass of water. Energy flows from the coin to the water. Eventually both reach the same temperature. The heat *lost* by the coin equals the heat *gained* by the water — energy is conserved, just redistributed. A calorimeter is simply an insulated container that forces all that energy to stay inside so you can account for it.

### Stage 2 — Quantitative entry

The central equation is the **heat-balance equation**:

**Σ Q_gained = Σ Q_lost**

or equivalently, total heat exchange = 0 (sign convention: heat absorbed is positive):

**Σ mcΔT = 0**  (for each component with no phase change)

where ΔT = T_final − T_initial for each body. Bodies that end up warmer have positive ΔT (heat gained); bodies that end up cooler have negative ΔT (heat lost).

Example: Hot metal block (mass m₁, specific heat c₁, initial temperature T₁) dropped into water (mass m₂, specific heat c₂, initial temperature T₂), calorimeter of water equivalent W (lumped into m₂c₂ or added separately). Final equilibrium temperature T_f:

m₁c₁(T_f − T₁) + m₂c₂(T_f − T₂) + WcW(T_f − T₂) = 0

Solve for T_f.

### Stage 3 — Calorimeter design and corrections

**Ideal calorimeter**: perfectly insulated; calorimeter container has negligible heat capacity. Reality deviates on both counts.

**Heat capacity of calorimeter (water equivalent W)**: The container also absorbs heat. Lump its heat capacity into an equivalent mass of water: W = C_cal/c_water. Standard lab correction is to measure W beforehand using a known specific heat and include it in every heat-balance equation.

**Heat losses to surroundings**: Any heat exchange with the environment introduces error. Minimised by: thick insulation, polished reflective inner walls (Dewar flask / thermos design), minimising time, extrapolating temperature-vs-time graphs to the mixing moment.

**Reaction calorimetry (bomb calorimeter)**: For combustion, the reaction happens inside a sealed bomb (constant volume). Q_reaction = C_cal × ΔT. No expansion work term (constant volume), so this measures U (internal energy change) directly. At constant pressure (solution calorimetry), measures H (enthalpy).

### Stage 4 — Phase changes and latent heat

When a substance changes phase at constant temperature, Q = mL (L = specific latent heat) — this must be included in the heat-balance equation alongside mcΔT terms. See `phys.therm.phase-transitions` for full treatment. At this stage, the key insight is that the heat-balance principle is unchanged — only the form of each Q term varies.

---

## 3. Why Beginners Fail

1. **Sign errors** — learners apply Q = mcΔT with ΔT = T_higher − T_lower for both bodies instead of always using T_f − T_i (signed). The hot body's ΔT should be negative.
2. **Forgetting the calorimeter** — the container is a thermal body too. Neglecting its heat capacity systematically biases the computed specific heat upward (the calorimeter's absorbed heat is wrongly attributed to the sample).
3. **Assuming T_f is the arithmetic mean** — this is only correct when m₁c₁ = m₂c₂. Learners over-generalise the midpoint intuition; when a small piece of hot metal enters a large tub of water, T_f is barely above T_water.
4. **Confusing heat and temperature** — learners write Q_hot = Q_cold but mean "the temperatures equalise." The actual conservation law is about energy (joules), not temperature (kelvin). A large cool body and a tiny hot body can exchange the same number of joules with very different temperature changes.

---

## 4. Misconception Library

### M1 — "Hotter substance loses more degrees of temperature than cooler one gains"

**Probe**: "A 100 g piece of copper (c = 390 J/kg·K) at 200 °C is dropped into 100 g of water (c = 4200 J/kg·K) at 20 °C. Will the copper drop in temperature more than the water rises?"  
**Characteristic phrase**: "The copper starts hotter, so it loses more temperature."  
**What's wrong**: Temperature changes depend on specific heat. Copper has a much lower specific heat — the same joule count produces a much larger ΔT in copper. The copper will drop ~150 °C; water will rise ~14 °C. Heat (joules) is conserved, not temperature change.  
**Recovery**: Compute: copper loses Q = 0.1 × 390 × ΔT_Cu; water gains Q = 0.1 × 4200 × ΔT_w. Heat balance forces ΔT_Cu ≈ 10.8 × ΔT_w. Same joules, vastly different temperature responses.

### M2 — "The final temperature is the average of the two initial temperatures"

**Probe**: "1 g of iron at 800 °C is dropped into 1 L of water at 20 °C. Estimate T_f."  
**Characteristic phrase**: "About 410 °C — halfway between."  
**What's wrong**: Arithmetic mean only holds when both masses and specific heats are equal. Here 1 g iron vs. 1000 g water: the water's thermal mass completely dominates. T_f ≈ 20.1 °C.  
**Recovery**: Introduce **thermal mass** = mc. T_f = (m₁c₁T₁ + m₂c₂T₂)/(m₁c₁ + m₂c₂) — the *thermal-mass-weighted* average. The average-temperatures intuition is the limiting case m₁c₁ = m₂c₂.

### M3 — "Final temperature can be calculated without knowing specific heats, just masses"

**Probe**: "200 g of aluminium (c = 900 J/kg·K) at 100 °C is mixed with 200 g of water at 20 °C. Without doing the calculation, is T_f closer to 20 °C or 60 °C?"  
**Characteristic phrase**: "Equal masses so halfway — 60 °C."  
**What's wrong**: Water's specific heat is ≈4.7× higher than aluminium's. Water dominates thermally. T_f ≈ 33 °C, closer to 20 °C than to 60 °C.  
**Recovery**: The thermal mass ratio mc_Al : mc_w = 200 × 900 : 200 × 4200 = 1 : 4.7. The water mass "feels" 4.7× heavier thermally. T_f = (180,000 × 100 + 840,000 × 20)/(180,000 + 840,000) = (18,000,000 + 16,800,000)/1,020,000 ≈ 34 °C.

### M4 — "Calorimetry only works for liquids"

**Probe**: "Can you measure the specific heat of a metal block using calorimetry?"  
**Characteristic phrase**: "You need liquid in the calorimeter to absorb heat."  
**What's wrong**: Calorimetry requires any two bodies exchanging heat in an insulated system. The classic experiment (metal + water) is standard, but coffee-cup calorimetry, bomb calorimetry (combustion of solids), and drop calorimetry (solids into a calorimeter) are all valid variants. The liquid is a convenient high-capacity medium, not a requirement.  
**Recovery**: Describe dry calorimetry: two metal blocks, one heated, dropped into contact inside insulation. Heat balance still applies. The water just makes thermal contact easier and gives larger, more measurable temperature changes.

---

## 5. Explanation Library

### Explanation A — Heat balance as energy accounting

Calorimetry is conservation of energy applied to thermal systems. The total energy "account" of the insulated system is fixed: Q_in to any body = Q_out from another. Write the ledger as: Σ mc(T_f − T_i) = 0. Sum every term, positive for bodies heating up, negative for bodies cooling down. Solve for the unknown (usually T_f or one specific heat c).

### Explanation B — Measuring specific heat by the method of mixtures

Procedure: (1) Measure mass of calorimeter m_c; determine its water equivalent W. (2) Fill with water of known mass m_w at temperature T_w. (3) Heat sample of known mass m_s to temperature T_s. (4) Drop sample into calorimeter; stir; record T_f.

Heat balance: m_s c_s (T_f − T_s) + (m_w + W) c_w (T_f − T_w) = 0

Solve for c_s: c_s = [(m_w + W) c_w (T_f − T_w)] / [m_s (T_s − T_f)]

Sources of error: heat loss to surroundings (T_f underestimated → c_s underestimated), heat gain from stirring (T_f overestimated), incomplete thermal equilibrium (if T measured too soon).

### Explanation C — Coffee-cup calorimetry (solution calorimetry)

Two aqueous solutions at room temperature are mixed in a polystyrene cup (negligible heat capacity, good insulation). Temperature change ΔT is measured. Q_reaction = −(m_total × c_soln × ΔT), where c_soln ≈ c_water for dilute solutions. The sign convention: if T rises (exothermic reaction), ΔT > 0 → Q_reaction < 0 (heat released by reaction into solution). If T falls (endothermic), ΔT < 0 → Q_reaction > 0 (heat absorbed from solution by reaction).

---

## 6. Analogy Library

### Primary analogy — Balancing a thermal scale

Two pans of a scale represent heat lost and heat gained. Put weights (joules) in each pan. The scale balances when Q_lost = Q_gained. Adding the calorimeter is like adding a hidden third pan — it also absorbs weights. If you forget the third pan, your calculation thinks the first pan is heavier than it really is (systematic error).

**Breaking point**: A scale balances simultaneously; heat transfer takes time (the system must reach equilibrium). The analogy hides the kinetic aspect — how fast equilibrium is reached, and what happens if you measure temperature before equilibrium is reached (common lab error).

### Anti-analogy — "The hot body and cold body reach the average of their temperatures"

As shown in M2, the arithmetic mean is a special case. The analogy of "meeting in the middle" is dangerous because it implies equal steps from each side — true only at equal thermal masses. The correct image: the final temperature is the thermal-mass-weighted centroid. A heavy cold body barely moves; a light hot body swings most of the way to the cold side.

---

## 7. Demonstration Library

### Demo A — The classic method of mixtures (copper + water)

**Setup**: Heat a copper block (≈100 g) in boiling water to T₁ = 100 °C. Quickly transfer to a calorimeter of water (≈200 g) at T₂ = 20 °C. Record T_f.  
**Calculation**: Students compute c_Cu from the heat balance, compare to the standard 390 J/kg·K.  
**Teaching target**: The algorithm from Section 5B executed in real time; makes the formula operational, not abstract. Demonstrate effect of forgetting the calorimeter water equivalent — shows systematic error.

### Demo B — Coffee-cup calorimetry with neutralisation

**Setup**: Mix 50 mL of 1 M HCl with 50 mL of 1 M NaOH in a polystyrene cup. Record temperature rise.  
**Observation**: ΔT ≈ +6.5 °C (exothermic neutralisation).  
**Calculation**: Q = m c ΔT ≈ 100 g × 4.18 J/g·K × 6.5 K ≈ 2720 J per 0.05 mol → ΔH_neutralisation ≈ −54 kJ/mol (standard value −57.3 kJ/mol; discrepancy from heat loss and approximate c_soln = c_water).  
**Teaching target**: Connects calorimetry to chemistry; real measurement with real error; introduces the meaning of sign in ΔH.

### Demo C — Temperature-time graph and extrapolation

**Setup**: Run Demo A with a temperature probe and data logger. Display the temperature-time curve for the calorimeter water in real time.  
**Observation**: Temperature rises sharply when the metal is added, then gradually falls due to heat loss to the room.  
**Teaching target**: The true T_f is at the peak (before losses take over), or is found by back-extrapolating the cooling curve to the mixing time. This directly shows why heat loss is a systematic error and how to correct for it graphically.

---

## 8. Discovery Lesson

### Stance: Argue the inductive case — *measure first, derive the conservation law second*

**Why inductive here**: The conservation-of-heat principle is physically grounded in experience. Learners already know intuitively that "hot and cold equalise" — the discovery is that this equalisation is *quantitative*, and that the equation Σ mcΔT = 0 is the precise form of the intuition. Starting with the experiment makes the law feel like a discovery about the world, not a formula to memorise.

**Opening challenge**: "Here is a thermometer, some hot water, some cold water, and a foam cup. Your task: predict the final temperature of the mixture before you mix them. Use whatever physics you know."

**Sequence**:
1. Students predict by intuition (usually arithmetic mean).
2. Mix water samples of different masses — show that the final temperature is *not* the arithmetic mean when masses differ.
3. Ask: "What property of the water determines how much its temperature changes per joule?" → Specific heat × mass = thermal mass.
4. Derive T_f = (m₁c₁T₁ + m₂c₂T₂)/(m₁c₁ + m₂c₂) by setting Q_lost = Q_gained.
5. Use a metal block to show the formula still holds when c₁ ≠ c₂ — and reveal that you can *measure* c by running the experiment backwards (known T_f, solve for unknown c).
6. Closure: "Calorimetry turns this equation into a measuring instrument. Every specific heat in the data book was measured by some variant of this experiment."

---

## 9. Teaching Actions

| Prior state | Action |
|---|---|
| Learner uses ΔT = T_high − T_low for both bodies | Enforce sign convention: ΔT = T_f − T_i for every body; hot body has negative ΔT. |
| Learner forgets calorimeter heat capacity | Re-run calculation including W; compare answers. Quantify the error. |
| Learner assumes T_f is arithmetic mean | Compute for very unequal thermal masses (1 g iron into 1 L water); show T_f ≈ T_water. |
| Learner cannot identify what's unknown | Structure the heat-balance equation with a box around the unknown; solve symbolically before substituting numbers. |
| Learner asks "why does heat flow from hot to cold and not reverse?" | This is the Second Law / `phys.therm.entropy` territory — defer with: "Kinetic theory tells us heat flows this way statistically (many fast molecules hit many slow ones); the Second Law formalises it. For now, we take the direction as observed." |

---

## 10. Voice Teaching

### Opening
"Drop a hot spoon into a cold bowl of soup. What happens? The spoon cools, the soup warms, and they meet somewhere in the middle. Calorimetry is just making that 'somewhere in the middle' precise — calculating exactly where they meet, and using that to measure properties of materials."

### Core
"Here is the key: the heat *lost* by the spoon equals the heat *gained* by the soup. In joules. Not degrees — joules. The spoon might drop 80 degrees while the soup rises only 2 degrees, because steel has a much lower specific heat than soup. Equal joules, unequal temperature changes."

### Formula teaching
"Write it as a sum: every body in the system contributes mcΔT. Bodies that warm up have positive ΔT; bodies that cool down have negative ΔT. Add them up; set equal to zero. That is conservation of energy for this experiment. Solve for whatever you don't know."

### Misconception interrupt
"The most common mistake: subtracting temperatures without signs. ΔT is always T_final minus T_initial — and for the hot body, T_final is less than T_initial, so ΔT is negative. That negative sign is essential — it is where 'heat lost' becomes negative in the equation."

---

## 11. Assessment

### Mastery gate

The learner can:
1. Write the heat-balance equation Σ mcΔT = 0 correctly, including sign conventions.
2. Solve a two-body or three-body mixing problem for T_f or for an unknown specific heat.
3. Identify and describe the systematic errors in a simple calorimetry experiment and state their direction of effect on the result.
4. Explain why T_f is not the arithmetic mean of T₁ and T₂ in general.

### Formative golden probe

> "200 g of water at 80 °C is mixed with 300 g of water at 20 °C in an ideal calorimeter. Predict T_f. Now: instead of 300 g of water, use 300 g of olive oil (c ≈ 1970 J/kg·K). Without calculating, predict whether T_f is higher or lower than in the water-water case. Then calculate."

*Water-water*: T_f = (200 × 80 + 300 × 20)/(200 + 300) = (16000 + 6000)/500 = 44 °C.  
*Water + oil*: T_f = (200 × 4200 × 80 + 300 × 1970 × 20)/(200 × 4200 + 300 × 1970) = (67,200,000 + 11,820,000)/(840,000 + 591,000) = 79,020,000/1,431,000 ≈ 55.2 °C. Higher — oil has lower specific heat, so it has less thermal mass to resist the hot water's warming effect. The hot water dominates more strongly.  
*Likely error*: Computing the oil case as T_f = 44 °C or applying arithmetic-mean reasoning.

### Confidence calibration

After the probe, ask: "Why is T_f higher when using oil instead of water?" Learners who can explain (lower thermal mass of oil → hot water dominates → T_f closer to 80 °C) are conceptually calibrated. Learners who got the right number but cannot explain are formula-applying without understanding — prompt: "What would happen if you used 300 g of iron (c = 450 J/kg·K) instead of oil?"

### Delayed retrieval check (next session opener)

"Write the heat-balance equation for: a 50 g metal at T₁ mixed with 100 g water at T₂, in a calorimeter with water equivalent 20 g."  
Expected: 50 × c × (T_f − T₁) + (100 + 20) × 4200 × (T_f − T₂) = 0. If the learner omits the calorimeter term: reteach water-equivalent concept. If sign errors: reteach ΔT = T_f − T_i convention.

---

## 12. Recovery Notes

**Recovery for sign errors**:
1. Write out T_f − T_i explicitly for each body before substituting numbers.
2. Check sign of each ΔT against physical expectation: hot body cools → ΔT < 0. If computed ΔT_hot is positive, the equation is wrong.
3. Cross-check: Q_lost by hot body = −m_hot c_hot ΔT_hot should be a positive number. If not, sign error.

**Recovery for calorimeter-neglect error**:
1. Compute the experiment first without the calorimeter, then with. Show how much c_s changes.
2. For typical school equipment (aluminium calorimeter, mass ~50 g): c_Al = 900 J/kg·K; W = 50 × 900/4200 ≈ 11 g. This is ~5% of typical water mass — small but not negligible at the precision of school labs.

**Recovery for T_f = arithmetic mean**:
1. Demonstrate with greatly unequal thermal masses (Demo A copper into 1 L water).
2. Have learner predict T_f by intuition, then by formula. The discrepancy is the lesson.
3. Generalise: "The average only works if mc is the same for both. Otherwise, the one with larger mc barely moves."

---

## 13. Memory & Review

**Memory type**: Procedural (algorithm) + quantitative (formula)

**Encoding hooks**:
- "Heat lost = heat gained" → the one-sentence rule
- Σ mcΔT = 0 → "the signed sum of all thermal contributions is zero"
- T_f = (Σ mcT) / (Σ mc) → weighted average, weights = thermal mass mc
- Sign check: hot body ΔT < 0 always

**Spaced retrieval schedule**:
- Session +1: "State the heat-balance principle in words. Write it as an equation."
- Week 1: "Solve a two-body mixing problem with one unknown specific heat."
- Week 3: "Explain why neglecting the calorimeter heat capacity leads to an overestimate or underestimate of the sample's specific heat."
- Month 2: "Design a calorimetry experiment to measure the heat of neutralisation of HCl + NaOH. What measurements do you need? What are the error sources?"

**Interleave with**: `phys.therm.specific-heat` (input concept — Q = mcΔT), `phys.therm.phase-transitions` (the unlocked downstream concept — latent heat modifies the heat-balance equation)

---

## 14. Transfer Map

| Target concept | Bridge |
|---|---|
| `phys.therm.phase-transitions` | When a substance is changing phase, Q = mL instead of mcΔT — the heat-balance equation gains a new type of term |
| Chemistry — thermochemistry | ΔH_reaction measured directly by Q = −(m_soln × c × ΔT) in coffee-cup calorimetry; Hess's law depends on calorimetry data |
| Chemistry — bomb calorimetry | Constant-volume calorimeter measures ΔU; add PΔV correction to get ΔH |
| Food science — dietary calories | Food Calorie (kcal) was originally determined by bomb calorimetry of food samples |
| Materials science — specific heat measurement | Data tables of c were compiled using calorimetric experiments; any new material's thermal properties require calorimetry |
| Engineering — heat exchanger design | Heat balance across exchanger: Q_hot = Q_cold (same principle; temperatures don't equalise but Q is conserved) |

---

## 15. Curriculum Feedback

**KG note**: The prerequisite `phys.therm.specific-heat` is the correct and sufficient gate — Q = mcΔT must be fluent before multi-body heat-balance problems are tractable. The difficulty tag "developing" is appropriate — the concept is algorithmically accessible (write the equation, solve for unknown) but conceptually demands careful sign discipline.

**Authoring note**: The systematic error analysis (calorimeter heat capacity, heat losses) should be taught explicitly at this level, not deferred to a "more advanced" treatment. Learners who do real lab calorimetry without understanding these errors will compute specific heats that disagree with data-book values and have no framework for why.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
