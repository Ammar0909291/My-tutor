# Temperature — `phys.therm.temperature`

## Identity

- **Concept ID**: `phys.therm.temperature`
- **Display name**: Temperature
- **Domain**: thermodynamics
- **Difficulty**: foundational
- **Bloom level**: understand
- **Mastery threshold**: 0.70
- **Estimated hours**: 2
- **Requires**: `phys.meas.units`
- **Unlocks**: `phys.therm.heat-transfer`, `phys.therm.ideal-gas-law`, `phys.therm.thermal-expansion`, `phys.therm.zeroth-law`
- **Load-bearing prerequisite content**:
  - From `phys.meas.units`: the SI system, unit symbols, and the fact that there is a canonical unit for each quantity; the distinction between a quantity and its unit is essential here because temperature is often conflated with the Celsius scale alone

---

## Mental models (4-stage progression)

**Stage 1 — Beginner**: Temperature is a number that tells you how hot or cold something is, measured with a thermometer. The Celsius scale is the most familiar: 0 °C is the freezing point of water, 100 °C is the boiling point. Higher number = hotter.

**Stage 2 — Intermediate**: Temperature is a measure of the average kinetic energy of the particles (atoms and molecules) in a substance. A higher temperature means the particles are, on average, moving faster. Temperature is a state property of the substance — it does not tell you how much energy is stored, only the intensity of the molecular motion. Three scales exist: Celsius (°C), Fahrenheit (°F), and Kelvin (K). The SI unit is the Kelvin; absolute zero (0 K = −273.15 °C) is the point at which particles have the minimum possible kinetic energy. Conversion: K = °C + 273.15.

**Stage 3 — Advanced**: Temperature is formally defined via the zeroth law of thermodynamics: it is the property shared by all objects in thermal equilibrium with each other. In statistical mechanics, the Boltzmann definition links temperature to the partition function (β = 1/kT). The Kelvin scale is defined by the triple point of water (273.16 K exactly) and the Boltzmann constant. Negative absolute temperatures are possible in population-inversion systems (e.g., laser media) and represent higher-energy states than positive temperatures, not temperatures "below absolute zero."

**Stage 4 — Expert / University**: The thermodynamic definition of temperature is T = (∂U/∂S)_V,N — the rate of change of internal energy with entropy at constant volume and particle number. This definition is scale-independent and applies to any thermodynamic system including black holes (Hawking temperature) and gravitational systems.

**Model versioning**: Stage 1 is adequate for everyday use. Stage 2 is the operative model for all thermodynamics problems at secondary level. Stage 3 is needed before the ideal gas law and zeroth law are taught at depth. Stage 4 is undergraduate statistical mechanics.

---

## Why beginners fail

The dominant root cause is **heat–temperature conflation**: learners treat temperature and heat as synonyms. They say "the object has a lot of heat" when they mean "the object has a high temperature," and they conflate "heat flows" with "temperature is high." This error propagates into heat transfer (a bigger object at the same temperature as a smaller object has more internal energy but the same temperature) and specific heat (adding the same heat to different materials produces different temperature changes).

A secondary root cause is **scale conflation**: learners learn Celsius and then treat it as the only scale, producing errors when K appears in formulas. The classic error is substituting 25 (°C) into a formula that requires 298 (K).

---

## Misconception library

**M1 — "Temperature and heat are the same thing"**
- Characteristic phrase: "This object has more heat because it's bigger" or "The coffee lost all its heat."
- Probe: "Two identical blocks — one iron, one aluminium — are at the same temperature. Which has more heat?"
- Expected wrong answer: "They have the same heat because they're at the same temperature."
- Recovery: "Heat" is energy in transit; temperature is the average kinetic energy per particle (the intensity, not the amount). Same temperature means same average particle speed — but a larger block has more particles, so more total energy. Two objects at the same temperature can have different amounts of stored thermal energy. Later (when specific heat is taught) the distinction becomes quantitative.

**M2 — "Cold is a substance; cold can flow"**
- Characteristic phrase: "Cold came in through the window" or "Put ice in to cool it down — the cold flows out of the ice."
- Probe: "When you put ice in a warm drink, what moves — cold from the ice or heat from the drink?"
- Expected wrong answer: "Cold flows from the ice into the drink."
- Recovery: only heat (energy) flows; there is no "cold substance." Heat flows from the warmer drink to the cooler ice. The drink gets cooler not because cold arrived, but because energy left. Cold is not a thing — it is the absence of heat energy relative to something warmer.

**M3 — "Celsius is the 'real' scale; Kelvin is just a conversion"**
- Characteristic phrase: "Why do we need Kelvin? I'll just use Celsius."
- Probe: "A gas at 100 °C is heated until its temperature doubles. What is the new temperature?"
- Expected wrong answer: "200 °C" (doubling on the Celsius scale).
- Recovery: doubling temperature in the physics sense means doubling the absolute temperature. 100 °C = 373 K; doubled = 746 K = 473 °C, not 200 °C. Kelvin is the scale where zero corresponds to zero particle kinetic energy. Proportional statements about temperature only make physical sense in Kelvin.

**M4 — "Absolute zero is as cold as things can get in practice"**
- Characteristic phrase: "Absolute zero is the coldest anything can actually be; we can almost reach it."
- Probe: "Can temperature go below 0 K?"
- Expected wrong answer: "No, 0 K is the minimum possible temperature."
- Recovery (stage-appropriate): For secondary level, confirm that 0 K is the minimum in classical thermodynamics — particles cannot have negative kinetic energy. Scientists have reached within billionths of a kelvin of 0 K but never achieved it. For advanced learners: population-inversion systems can formally be assigned negative absolute temperatures, which are hotter than any positive temperature — but this is a subtlety of statistical mechanics, not a contradiction of the third law.

---

## Explanation library

**E1 — The particle-speed picture (conceptual anchor)**
Imagine the molecules in a cup of hot water as tiny billiard balls, bouncing around at high speed. In a cup of cold water, the same billiard balls move more slowly. Temperature is the average speed of this bouncing. When you heat the water, you speed up the balls; when you cool it, you slow them down. Absolute zero is the speed limit in the other direction: you cannot make the balls completely still (in classical terms), and 0 K is the state where you have removed as much kinetic energy as possible.

**E2 — The Kelvin conversion explained (procedural)**
Celsius zero was chosen for human convenience (water freezes at 0 °C). Kelvin zero is chosen for physics: it is where average particle kinetic energy goes to zero. The gap between them is 273.15 (approximately 273 for most school-level work). To convert: K = °C + 273. To check: −273 °C → 0 K ✓; 0 °C → 273 K ✓; 100 °C → 373 K ✓.

**E3 — Temperature vs. thermal energy (distinction drill)**
"A swimming pool at 25 °C and a teacup at 25 °C are at the same temperature. But the pool contains vastly more thermal energy. If you dipped your hand in the pool vs. the teacup at the same temperature, they feel equally warm (same temperature). But the pool could melt far more ice (it has more total energy). Temperature = intensity. Thermal energy = amount × intensity."

---

## Analogy library

**Primary analogy — Particle speed as temperature**
Temperature is like the average speed of cars on a motorway. "Rush hour with slow, jammed traffic" = low temperature (slow particles). "Late night motorway at 130 km/h" = high temperature (fast particles). Average speed goes up when cars drive faster; temperature goes up when particles move faster.

**Breaking point**: The analogy breaks for quantum systems at very low temperatures, where particles obey Bose-Einstein or Fermi-Dirac statistics and the classical "average speed" picture is inadequate. For all secondary-level teaching, the analogy is valid.

**Anti-analogy — "Cold is a type of energy"**
Do NOT frame "coldness" as a property or substance. There is no "cold energy." Cold is a relative description: something is cold relative to a warmer reference. Energy (heat) flows from warmer to cooler; it never flows from "cold" to "warm."

---

## Demonstration library

**D1 — Thermometer calibration points**
Place a thermometer in a mixture of ice and water: observe 0 °C. Place it in boiling water: observe 100 °C (at standard atmospheric pressure). This grounds the scale in reproducible physical phenomena — not arbitrary numbers.

**D2 — Thermal equilibrium demonstration**
Hold a metal rod and a wooden rod at room temperature. Both read the same temperature on a thermometer, but the metal feels colder. This demonstrates that temperature and the perception of "cold" are different things: the metal conducts heat away from your hand faster, so it feels colder, even though both are at the same temperature. Connects to M1 recovery.

**D3 — Kelvin scale motivation**
Ask: "If I heat a gas from 10 °C to 20 °C, does the volume double?" Measure (or simulate): no. "If I heat from 10 K to 20 K?" Volume approximately doubles (ideal gas). This shows why Kelvin is the physically meaningful scale for proportional relationships.

---

## Discovery lesson

**Argue for direct instruction** (appropriate for this foundational concept):

The particle model of temperature is not intuitive and cannot be re-derived from everyday experience alone — learners have no direct sensory access to molecular speeds. The correct procedure is: (1) introduce the particle model explicitly, (2) demonstrate thermal equilibrium and explain it using the model, (3) derive the need for an absolute scale from the requirement that "temperature zero" means "zero particle kinetic energy." Discovery is appropriate for connecting temperature to heat transfer (learners can predict which direction heat will flow before being told), but the core model requires direct instruction.

---

## Teaching actions

**TA1 — Heat–temperature audit at first use**: The first time a learner uses "heat" when they mean "temperature," pause and ask: "Is this a temperature or an amount of energy?" This distinction must be enforced early before it becomes embedded.

**TA2 — Unit check before any formula**: Whenever T appears in a formula (ideal gas law, Stefan-Boltzmann, etc.), require the learner to state "T must be in Kelvin" and perform the conversion before substituting. This prevents the Celsius-substitution error (M3) from persisting silently.

**TA3 — Scale comparison drill**: Present 25 °C, 298 K, 77 °F — ask the learner to rank them, then convert to a single scale to verify. This builds fluency with the three scales and their relationships.

**TA4 — "What has more thermal energy?" game**: Repeatedly present pairs of objects at the same temperature but different sizes, or same size but different materials, and ask which has more thermal energy. This separates temperature (intensive) from thermal energy (extensive).

---

## Voice teaching

> "Temperature and heat — these are the two words people use interchangeably and they shouldn't. Temperature is like the speed of particles — how fast the molecules are moving, on average. Heat is energy in transit — it's what moves when something warm and something cool are put next to each other. A swimming pool at 25 °C and a teacup at 25 °C are at the same temperature. But the pool has far more thermal energy. Same particle speed, more particles."

> "Why Kelvin? Because Celsius zero was chosen for water, not for physics. When a formula involves temperature — the ideal gas law, for instance — it needs a scale where zero really means zero particle motion. That's Kelvin. The gap between Celsius zero and Kelvin zero is 273 degrees. So every time you see T in a physics formula, write K = °C + 273 before you substitute anything."

> "Cold is not a thing. There is no cold energy, no cold substance. When the cold 'comes in' through the window, what's actually happening is heat — energy — is leaving your warm room and going outside to the colder air. Energy moves from hot to cold. Cold is just the direction energy flows away from."

---

## Assessment

**Mastery gate**: The learner can (1) state the particle-speed interpretation of temperature, (2) distinguish temperature from thermal energy with a concrete example, (3) convert between Celsius and Kelvin correctly, (4) explain why Kelvin must be used in physics formulas.

**Formative golden probe**
> "Two identical cups of water — one at 80 °C, one at 40 °C. (a) Which has higher temperature? (b) Which has faster-moving particles? (c) If we mix them, what is the approximate final temperature? (d) Now convert 80 °C and 40 °C to Kelvin. (e) If the temperature of a gas doubles from 150 K, what is the new temperature in Kelvin and in Celsius?"

- (a)–(b): tests Stage 1 and particle model
- (c): tests equilibrium intuition (not a calculation — expect ~60 °C, equal masses)
- (d): tests Kelvin conversion
- (e): tests M3 (doubling in K, not °C)

**Confidence calibration question**
After (e): "How confident are you that you must double in Kelvin, not Celsius?" (1–5). Low confidence with correct answer → conversion is procedural, not yet understood. High confidence with 200 °C answer → M3 embedded.

**Delayed retrieval check (48 h / 7 days)**
"A gas is cooled from 300 K to 150 K. The physicist says 'the temperature halved.' Is that correct? What happened to the average speed of the molecules?" (Tests Kelvin proportionality and particle model.)

---

## Recovery notes

**Failure mode A — Heat–temperature conflation persists**
Use D2 (metal vs. wood at room temperature) to create a concrete perceptual experience that separates the two. The metal "feels colder" even though both are at the same temperature — this is viscerally jarring and creates a memorable collision with M1. After the demonstration, ask: "Same temperature, different feel. What explains the difference?" Guide to heat-flow rate (thermal conductivity), not temperature.

**Failure mode B — Celsius-in-Kelvin formulas**
Run the D3 demonstration (or a numerical simulation): does volume double when temperature doubles in Celsius? No. In Kelvin? Yes. The empirical confirmation is more effective than algebraic explanation alone. Then require the learner to always write "T = ___ + 273 = ___ K" as the first step before any formula.

**Failure mode C — "Cold flows" (M2) persists**
Ask: "What substance is cold? What is it made of? Can you put cold in a bottle?" The learner should recognize that "cold" cannot be bottled — only energy can be contained or transferred. Frame: "We can describe cold as a direction energy flows away from, not a substance."

---

## Memory & review

**Memory type**: Concept + conversion procedure (the particle model is the core concept; the Kelvin conversion is the essential procedure).

**Spaced retrieval schedule**: Day 1, Day 3, Day 7, Day 21.

**Retrieval prompts**:
- "What does temperature measure at the particle level?"
- "Convert 37 °C to Kelvin."
- "A gas at 200 K is heated to 400 K. What happens to the average speed of its molecules?"
- "Two objects are at the same temperature. Can they have different amounts of thermal energy? Give an example."

**Interleaving**: After mastery, interleave temperature problems with heat-transfer problems (which introduce Q = mcΔT) so the learner must always decide: "Is this asking about temperature or heat?"

---

## Transfer map

**Immediate transfers**:
- `phys.therm.zeroth-law`: thermal equilibrium defined directly in terms of temperature equality
- `phys.therm.thermal-expansion`: length changes are proportional to ΔT (uses Celsius OK since only differences matter, but motivates why ΔT in K = ΔT in °C)
- `phys.therm.heat-transfer`: direction of heat flow determined by temperature difference
- `phys.therm.ideal-gas-law`: PV = nRT requires T in Kelvin absolutely

**Downstream transfers**:
- Kinetic theory of gases: T = (2/3)(KE_avg / k_B), the formal link between temperature and particle kinetic energy
- Entropy and the second law: temperature appears in dS = dQ/T (must be absolute)
- Stefan-Boltzmann law: radiated power ∝ T⁴ (T in Kelvin)

**Cross-subject transfers**:
- `chem` — reaction rates (Arrhenius equation uses T in Kelvin), gas laws, equilibrium constants
- Biology — enzyme activity is temperature-sensitive; body temperature regulation is a homeostasis case study in thermal equilibrium

---

## Curriculum feedback

The KG description correctly identifies temperature as "average kinetic energy of particles" — the particle model is the right entry point. The four unlocks (heat-transfer, ideal-gas-law, thermal-expansion, zeroth-law) are all correctly placed downstream.

One gap: the KG does not list `phys.therm.specific-heat` as unlocked by temperature, even though Q = mcΔT requires the temperature concept directly. `specific-heat` is unlocked by `heat-transfer` in the KG, which is a reasonable proxy, but a direct edge from temperature would improve the dependency graph.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
