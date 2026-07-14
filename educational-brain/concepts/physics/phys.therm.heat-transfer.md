# Heat Transfer — `phys.therm.heat-transfer`

## Identity

- **Concept ID**: `phys.therm.heat-transfer`
- **Display name**: Heat Transfer
- **Domain**: thermodynamics
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.75
- **Estimated hours**: 4
- **Requires**: `phys.therm.temperature`
- **Unlocks**: `phys.therm.specific-heat`
- **Load-bearing prerequisite content**:
  - From `phys.therm.temperature`: heat flows from higher temperature to lower temperature; thermal equilibrium is the endpoint; temperature and thermal energy are distinct (large cold objects can have more thermal energy than small hot objects — but heat still flows from hotter to cooler)

---

## Mental models (4-stage progression)

**Stage 1 — Beginner**: Heat can move from one place to another in three ways: conduction (through direct contact, like a hot pan heating the handle), convection (through moving fluid, like warm air rising from a heater), and radiation (through space, like the Sun warming your skin without touching you). Heat always moves from hotter regions to cooler regions.

**Stage 2 — Intermediate**: Three distinct mechanisms: (1) **Conduction** — heat transferred through a material by molecular collisions, without bulk flow; rate depends on thermal conductivity k, cross-sectional area A, temperature gradient ΔT/Δx (Fourier's law: Q/t = kA ΔT/Δx). (2) **Convection** — heat transferred by the bulk movement of a fluid (liquid or gas); forced convection uses pumps or fans; natural convection is driven by density differences caused by temperature (hot fluid rises, cool fluid sinks). (3) **Radiation** — heat transferred by electromagnetic waves; all objects above 0 K emit radiation; power emitted P = εσAT⁴ (Stefan-Boltzmann law, T in Kelvin).

**Stage 3 — Advanced**: All three mechanisms often operate simultaneously. In buildings, heat loss through walls is dominated by conduction; radiators rely on both conduction and convection; single-pane windows lose heat faster than double-pane because the air gap reduces conduction and convection. Thermal resistance (R-value) is the conduction analog of electrical resistance: R = Δx/(kA). Convection is complex — Newton's law of cooling (Q/t = h A ΔT) is an empirical simplification. Radiation can transfer heat across a vacuum; conduction and convection cannot.

**Stage 4 — Expert / University**: Fourier's heat equation ∂T/∂t = α ∇²T (thermal diffusion equation) governs conduction in continuous media; α = k/(ρCₚ) is the thermal diffusivity. Convective heat transfer involves the Navier-Stokes equations coupled to the energy equation — analytically tractable only in simple geometries (Nusselt number correlations). Radiative transfer in participating media requires the radiative transfer equation, solved numerically in atmospheric physics and astrophysics.

**Model versioning**: Stage 2 is the operative model for secondary-level problems. Stage 3 introduces building physics and the thermal resistance concept. Stage 4 is engineering heat transfer.

---

## Why beginners fail

The dominant root cause is **mechanism conflation**: learners know there are three mechanisms but cannot reliably classify a scenario. They apply conduction when convection is operating (a heater warming a room is convection, not conduction through air) or claim radiation requires a medium (it does not). The classification failure is compounded by the fact that all three can operate simultaneously — learners try to identify a single mechanism per situation.

The secondary root cause is **temperature vs. heat-flow-rate confusion**: learners think that a "hotter" source transfers heat faster in all circumstances. In reality, rate depends on temperature difference (ΔT), not absolute temperature. An oven at 200 °C heats a dish faster than an oven at 100 °C — but only because ΔT to the dish is larger, not simply because 200 > 100.

---

## Misconception library

**M1 — "Radiation requires a medium (like air or water)"**
- Characteristic phrase: "The Sun can't warm you in space — there's no air to carry the heat."
- Probe: "How does heat from the Sun reach Earth across 150 million km of vacuum?"
- Expected wrong answer: "It can't — there's no medium" or "It travels through some kind of particle."
- Recovery: electromagnetic radiation (infrared, visible, UV) propagates through vacuum. The Sun warms Earth entirely by radiation, not by conduction or convection, because space between them is a near-perfect vacuum. This is the defining feature of radiation as a heat-transfer mechanism: it requires no medium.

**M2 — "Conduction is the same in all materials"**
- Characteristic phrase: "Metal and wood are both solid, so they conduct heat the same way."
- Probe: "Why does a metal spoon in hot soup feel hotter than a wooden spoon in the same soup?"
- Expected wrong answer: "Because metal is heavier" or "There's no difference."
- Recovery: thermal conductivity k varies by orders of magnitude between materials. Metals: k ≈ 50–400 W/(m·K). Wood: k ≈ 0.1–0.3 W/(m·K). Metal conducts heat from the hot soup to your hand ~1000× faster than wood does — hence it feels hotter even at the same temperature. This is the same principle as the iron-vs-wood room temperature demonstration from the zeroth law.

**M3 — "Convection only happens upward"**
- Characteristic phrase: "Convection only works because warm air rises — it can't go sideways or downward."
- Probe: "A pot of water is heated from the bottom. Describe how convection moves the water."
- Expected wrong answer: "The warm water rises, and that's all."
- Recovery: in natural convection, warm fluid rises AND cool fluid sinks to replace it, creating a circulation loop (convection cell). It is not just upward — the cool fluid must move down and horizontally to complete the loop. Forced convection (fans, pumps) can push fluid in any direction regardless of temperature.

**M4 — "The good conductor of heat and good conductor of electricity are unrelated properties"**
- Characteristic phrase: "Electrical conductors are good conductors of electricity; that has nothing to do with heat."
- Probe: "Which conducts heat better — copper or rubber? Which conducts electricity better?"
- Expected wrong answer: "Rubber could be a better heat conductor — they're unrelated."
- Recovery: for metals, the Wiedemann-Franz law links electrical and thermal conductivity: both depend on the movement of free electrons. Metals have many free electrons — they conduct both heat and electricity well. Insulators (rubber, wood, glass) have few free electrons — they conduct neither well. This is not a coincidence; both properties arise from the same electron-mobility mechanism. (Note: this is Stage 3 content — introduce it only after the basic classification is mastered.)

---

## Explanation library

**E1 — The three mechanisms compared as a table**
| Mechanism | Physical carrier | Medium required? | Example |
|-----------|-----------------|-----------------|---------|
| Conduction | Molecular collisions / free electrons | Yes (solid or fluid) | Metal spoon in hot soup |
| Convection | Bulk fluid movement | Yes (fluid) | Warm air rising from radiator |
| Radiation | Electromagnetic waves | No | Sunlight warming Earth |

This table is the reference; classification questions reduce to identifying which column applies.

**E2 — Fourier's law of conduction (procedural)**
"Q/t = kA ΔT/Δx — the rate of heat transfer through a wall is proportional to the thermal conductivity k (material property), the area A (more area, more heat), and the temperature gradient ΔT/Δx (greater temperature difference across a thinner wall → more heat). Increasing any of these increases the heat flow rate."

**E3 — Stefan-Boltzmann radiation (conceptual)**
"Every object above absolute zero radiates electromagnetic energy. The hotter the object, the more it radiates — and the emission scales as T⁴ (T in Kelvin). An object twice as hot (in Kelvin) radiates 2⁴ = 16 times more energy per second. This is why the Sun, at ~5778 K, radiates enormously while a human at ~310 K radiates much less — but still radiates (in the infrared)."

---

## Analogy library

**Primary analogy — Three postal services**
Sending a package across a city: (1) Hand-to-hand relay — each person passes the package directly to the next (conduction). (2) Truck delivery — a vehicle collects the package and drives it (convection). (3) Wireless transmission — the message is sent as a radio signal (radiation). The relay requires a chain of people (medium); the truck requires roads and a vehicle (fluid medium); the radio works in empty space (no medium).

**Breaking point**: The analogy does not capture rate dependence on temperature gradient (conduction), on fluid velocity (convection), or on T⁴ (radiation). It is useful only for classification, not for quantitative reasoning.

**Anti-analogy — "Convection is just hot things moving"**
Convection is not simply "hot things moving" — it is a circulation driven by density differences. The hot part rises, the cool part descends, creating a closed loop. Saying "hot air rises" without the completion "and cool air descends to replace it" misses the mechanism and leads to M3.

---

## Demonstration library

**D1 — Thermal conductivity comparison**
Hold one end of a metal rod and one end of a wooden rod in hot water simultaneously. The metal rod feels hot at the held end much sooner. This demonstrates different k values for conduction through different materials.

**D2 — Convection current visualisation**
Add a few drops of food colouring to one side of a tank of water. Heat only that side (from below). Watch the coloured water rise, move across the top, cool, and descend on the other side — a convection cell is visible. This directly demonstrates the circulation loop that M3 misses.

**D3 — Infrared camera demonstration (or thermal image)**
Show an infrared image of a hand on a cold surface. The hand is clearly visible as a heat source; the surface shows the warm spot where the hand rested. This demonstrates that objects at body temperature radiate in the infrared — radiation is real and measurable even for everyday objects.

**D4 — Vacuum flask (thermos) mechanism analysis**
Open (or show) a vacuum flask: outer layer (insulates against conduction and convection via vacuum gap), mirror-silver inner surface (reflects radiation). The flask keeps drinks hot by eliminating all three mechanisms simultaneously. Ask the learner to match each design feature to the mechanism it blocks.

---

## Discovery lesson

**Argue for guided discovery (mechanism classification) + direct instruction (formulas)**:

For classification: present three scenarios — (1) a radiator warming a room, (2) sunlight warming your face, (3) a metal spoon heating in a pot — and ask learners to categorise each WITHOUT any prior definition. Collect their intuitive descriptions ("warm air moves," "light comes in," "the spoon touches the pot"). Then introduce the three mechanism labels as the names for these three intuitive categories. This grounds the names in observable phenomena.

For the quantitative laws (Fourier's, Stefan-Boltzmann), direct instruction is appropriate — these are not derivable from everyday observation without measurement equipment.

---

## Teaching actions

**TA1 — Mechanism classification test before any formula**: For every heat-transfer problem, require the learner to identify the dominant mechanism(s) before writing any equation. "Is this conduction, convection, or radiation? How do you know?"

**TA2 — Vacuum test**: For any unclear mechanism, ask: "Could this heat transfer happen in a vacuum?" Yes → can include radiation. No → must be conduction or convection. "Is there bulk fluid movement?" Yes → convection. No → conduction.

**TA3 — ΔT as rate driver**: Whenever a learner claims "hotter = more heat flow," ask "compared to what?" Heat flow rate requires ΔT — the temperature difference, not the absolute temperature. Write Q/t ∝ ΔT explicitly before any calculation.

**TA4 — Simultaneous mechanisms acknowledgement**: After classification, always ask: "Are any other mechanisms also operating in this problem?" In most real scenarios, at least two mechanisms are present. Recognising this prevents the "one mechanism only" error.

---

## Voice teaching

> "Three ways to move heat. Conduction: molecules passing energy along a chain, like dominoes. Convection: fluid picking up energy and carrying it somewhere — the fluid moves. Radiation: electromagnetic waves through empty space — no medium needed. Sunlight is radiation. Warm air from a heater is convection. A metal spoon in soup conducts heat to your hand. Most real situations use at least two of these at once."

> "Quick test: can this happen in a vacuum? If yes, radiation is involved. If no, it's conduction or convection. Is there fluid moving in bulk? Then it's convection. Is it energy transferring through a stationary solid or fluid? Then it's conduction. In a vacuum flask, you design against all three: you create a vacuum to kill conduction and convection, and you silver the inner surface to reflect radiation."

> "Rate of conduction depends on how steep the temperature gradient is — how big a temperature difference across how thin a layer. A double-pane window has a trapped air gap: air is a poor conductor (low k), so heat flows across it slowly even if the temperature difference between indoors and outdoors is large. That's Fourier's law in engineering."

---

## Assessment

**Mastery gate**: The learner can classify a heat-transfer scenario by mechanism (with reasoning), state Fourier's law qualitatively and apply it to predict how changing k, A, or ΔT affects conduction rate, and explain why radiation is unique in requiring no medium.

**Formative golden probe**
> "A house has a brick wall, single-pane windows, and a wood-burning fireplace. (a) What is the dominant mechanism of heat loss through the brick wall? (b) What is the dominant mechanism by which the fireplace warms the room? (c) Why does a silver-coated thermos bottle stay warm longer than an uncoated one? (d) Doubling the wall thickness while keeping everything else the same — how does this affect the conduction rate? (e) The Sun warms your hand through a glass window. Which mechanism is responsible?"

- (a): conduction through the brick
- (b): radiation from flames + convection of warm air
- (c): silver reflects radiation (reduces radiative heat loss)
- (d): Fourier's law: Δx doubles → rate halves
- (e): radiation (glass transmits visible and near-IR)

**Confidence calibration question**
After (e): "How confident are you that this is radiation and not conduction?" (1–5). Low confidence on a correct answer → radiation concept not yet internalised.

**Delayed retrieval check (48 h / 7 days)**
"Why does wearing multiple thin layers stay warmer than one thick layer of the same total thickness?" (Requires: air trapped between layers has low k; multiple conduction barriers; possibly convection suppression — this is a synthesis question.)

---

## Recovery notes

**Failure mode A — M1 persists (radiation needs a medium)**
Ask: "How do we know the Sun's energy reaches Earth? We measure it with satellites in space — where there is no air. Yet the satellites detect radiation. The energy must travel through vacuum." Then confirm: electromagnetic waves do not require a medium (this is a fundamental feature distinguishing EM waves from mechanical waves like sound).

**Failure mode B — M3 persists (convection only goes up)**
Run D2 (food colouring in heated water). The descending cool water and the horizontal transfer at the top must be visible. Ask the learner to trace the complete loop — up on the warm side, across the top, down on the cool side. Convection without the return loop is incomplete.

**Failure mode C — Mechanism classification errors**
Use TA2 (vacuum test + fluid movement test) as a decision tree. Apply it explicitly to every misclassified scenario until the classification becomes automatic.

---

## Memory & review

**Memory type**: Three-category schema (conduction/convection/radiation) + qualitative rates + one key exception (radiation works in vacuum).

**Spaced retrieval schedule**: Day 1, Day 3, Day 7, Day 21.

**Retrieval prompts**:
- "Name the three mechanisms of heat transfer and state what each requires."
- "Which heat-transfer mechanism does NOT require a medium?"
- "What two factors must you change to increase the rate of conduction through a wall?"
- "Describe one convection application in everyday life and explain the circulation loop."

**Interleaving**: After mastery, interleave heat-transfer problems with specific-heat problems (Q = mcΔT) — the rate of heat transfer determines how fast ΔT changes, linking the two concepts.

---

## Transfer map

**Immediate transfers**:
- `phys.therm.specific-heat`: heat transfer (Q = rate × time) determines how much thermal energy enters a substance; specific heat then gives the resulting temperature change

**Downstream transfers**:
- First law of thermodynamics: heat transfer Q is one of the two terms (Q and W) that change internal energy U: ΔU = Q − W
- `phys.therm.ideal-gas-law`: heat transfer at constant pressure or constant volume are the two standard thermodynamic processes
- Building physics: R-values, energy efficiency, passive solar design — all are engineering applications of Fourier's law and thermal resistance

**Cross-subject transfers**:
- `chem` — endothermic/exothermic reactions release or absorb heat; the direction of heat flow in a reaction is determined by the same temperature-difference principle
- Biology — thermoregulation: mammals maintain body temperature by controlling all three heat-transfer mechanisms (fur/insulation = conduction barrier; sweating/panting = convective cooling; infrared radiation from skin)
- Environmental science — the greenhouse effect: atmospheric gases absorb outgoing infrared radiation (thermal radiation from Earth's surface) and re-emit it, warming the surface

---

## Curriculum feedback

The KG correctly places heat-transfer after temperature and before specific-heat. The single unlock (specific-heat) is appropriate.

One gap: the KG does not include the laws of thermodynamics (first, second, third) as explicit nodes that follow from this concept. In teaching sequence, heat transfer is the physical phenomenon that the first law (ΔU = Q − W) formalises. If thermodynamics laws exist as KG nodes, they should be downstream of this concept.

A second gap: the Stefan-Boltzmann law involves T⁴, which requires that T be in Kelvin — this dependence is stronger than any other formula in secondary physics. The KG description mentions "electromagnetic waves" for radiation but does not flag the T⁴ dependence or the Kelvin requirement. Authoring guidance should note this to prevent formula-level errors.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
