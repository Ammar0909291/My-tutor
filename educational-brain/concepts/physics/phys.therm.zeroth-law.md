# Zeroth Law of Thermodynamics — `phys.therm.zeroth-law`

## Identity

- **Concept ID**: `phys.therm.zeroth-law`
- **Display name**: Zeroth Law of Thermodynamics
- **Domain**: thermodynamics
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.70
- **Estimated hours**: 2
- **Requires**: `phys.therm.temperature`
- **Unlocks**: `phys.therm.ideal-gas-law`
- **Load-bearing prerequisite content**:
  - From `phys.therm.temperature`: the definition of temperature as a measurable state property; the fact that two objects can have the same or different temperatures; the understanding that heat flows from higher to lower temperature — the zeroth law explains WHEN that flow stops

---

## Mental models (4-stage progression)

**Stage 1 — Beginner**: If you put two objects next to each other and wait long enough, they reach the same temperature — they stop exchanging heat. This final shared temperature is called thermal equilibrium. The zeroth law says: if object A is in equilibrium with object C, and object B is also in equilibrium with object C, then A and B are in equilibrium with each other (they have the same temperature).

**Stage 2 — Intermediate**: The zeroth law defines temperature as a transitive, equivalence-class property: all objects in thermal equilibrium belong to the same temperature class. This makes temperature a well-defined measurable quantity — a thermometer (object C) can compare two objects (A and B) without bringing them into direct contact. Thermal equilibrium is a state, not a process; objects reach it when net heat flow between them becomes zero.

**Stage 3 — Advanced**: The zeroth law formalises that the relation "is in thermal equilibrium with" is an equivalence relation on the set of all thermodynamic states — it is reflexive (every system is in equilibrium with itself), symmetric (if A↔C then C↔A), and transitive (if A↔C and B↔C then A↔B). This equivalence relation partitions all states into equivalence classes; each class is characterised by a single value — temperature — making the concept of temperature rigorously defined rather than assumed.

**Stage 4 — Expert / University**: The zeroth law is technically a postulate — it cannot be derived from the first or second laws. It establishes that temperature is a state function (depends only on the current state, not on the path taken to reach it). In statistical mechanics, thermal equilibrium corresponds to the maximum-entropy state for the joint system, and the transitive property follows from the additivity of entropy.

**Model versioning**: Stage 2 is the operative model for secondary-level thermodynamics. Stage 3 is the logically complete statement needed before the formal structure of thermodynamics is studied.

---

## Why beginners fail

The dominant root cause is **confusing equilibrium with equality**: learners think thermal equilibrium means the objects are "the same" in some global sense (same material, same size, same total energy), not just that they share a temperature. They are surprised that a large iron block and a small glass marble can be in thermal equilibrium — same temperature does not mean same thermal energy.

The secondary root cause is **the zeroth law reading as "obvious"**: learners dismiss it as a trivial truism ("of course equal temperatures mean equilibrium") without understanding its function — it is what makes thermometers work. Without the zeroth law, you could not use a common reference object (the thermometer) to compare the temperatures of two objects that never touch.

---

## Misconception library

**M1 — "Objects in thermal equilibrium are the same material or same size"**
- Characteristic phrase: "They can't be in equilibrium — one is iron and the other is wood."
- Probe: "An iron block and a wooden block are left in the same room for 24 hours. Are they in thermal equilibrium? Do they feel the same temperature when you touch them?"
- Expected wrong answer: "They can't be at the same temperature because they're different materials" or "The iron feels colder, so it can't be in equilibrium."
- Recovery: after 24 hours in the same room, both objects are at room temperature — in thermal equilibrium with the air. They have the same temperature. The iron feels colder because it conducts heat away from your hand faster (higher thermal conductivity) — not because it is at a lower temperature. Equilibrium is about temperature equality, not material identity or sensation.

**M2 — "Thermal equilibrium means no heat energy is present"**
- Characteristic phrase: "If they're in equilibrium, they don't have any heat."
- Probe: "Two objects are in thermal equilibrium at 300 K. Is there any thermal energy in the system?"
- Expected wrong answer: "No, equilibrium means no energy."
- Recovery: thermal equilibrium means no NET heat flow — not no thermal energy. At 300 K, particles are still moving vigorously. Energy flows in both directions between objects, but the rates are equal so there is no net transfer. The objects are energetically rich; they are just balanced.

**M3 — "The zeroth law only applies to solids"**
- Characteristic phrase: "Gases don't have thermal equilibrium the same way."
- Probe: "A gas and a liquid are in the same closed container for a long time. Can they reach thermal equilibrium?"
- Expected wrong answer: "Not really — gases behave differently."
- Recovery: the zeroth law applies to any thermodynamic system — solid, liquid, gas, or plasma. Any two systems left in thermal contact long enough will reach the same temperature, regardless of their phase. The ideal gas law (upstream of this concept) requires thermal equilibrium between the gas and the thermometer.

**M4 — "A thermometer measures its own temperature, not the object's"**
- Characteristic phrase: "The thermometer just shows what the thermometer is at."
- Probe: "Why does a thermometer give you the temperature of the object you're measuring?"
- Expected wrong answer: "It doesn't — it only shows the glass/mercury temperature."
- Recovery: when you insert a thermometer into an object, heat flows between the thermometer and the object until they reach thermal equilibrium. At equilibrium, both are at the same temperature. The thermometer then reads its own temperature — which, by the zeroth law, is the object's temperature. This is why you wait for the reading to stabilise: you are waiting for equilibrium.

---

## Explanation library

**E1 — The thermometer justification (motivation for the law)**
"Why do thermometers work? When you put a thermometer in a cup of water, heat flows until the thermometer and the water reach the same temperature. At that point, the thermometer reads its own temperature — and the zeroth law says this equals the water's temperature. Without the zeroth law, you couldn't claim a thermometer tells you anything about the object; you could only say it tells you about itself."

**E2 — The equivalence-class picture**
"Imagine all objects in the universe sorted into boxes, where every object in the same box is in thermal equilibrium with every other object in the same box. What label would you put on each box? Temperature. The zeroth law is the mathematical reason why this sorting is possible and consistent — it says that equilibrium is a transitive property, so the boxes don't overlap and every object belongs in exactly one box at any given moment."

**E3 — Operational definition of temperature**
"The zeroth law gives us the operational method for measuring temperature: take a standard object (the thermometer), bring it into contact with the object you want to measure, wait for equilibrium, then read the thermometer scale. This works because at equilibrium, the thermometer and the object share the same temperature value. Without the zeroth law, 'temperature' would be a concept we believe in but cannot operationally verify."

---

## Analogy library

**Primary analogy — The referee analogy**
Two athletes (A and B) want to compare their heights. They cannot stand back-to-back because they are in different cities. Instead, a referee (C) measures both of them using a standard ruler. If A = 182 cm and B = 182 cm, then A and B are the same height — even without direct comparison. The zeroth law plays the same role: the thermometer (C) compares two objects (A and B) without them touching. If A = 300 K and B = 300 K on the thermometer, they are in thermal equilibrium.

**Breaking point**: Height is a continuous variable; so is temperature. But the analogy does not capture the direction of heat flow (heat flows spontaneously from higher to lower temperature) — the referee analogy is purely about comparison, not about the dynamics of equilibration.

**Anti-analogy — "Equilibrium means equal total energy"**
Do NOT use the phrase "equal energy" as a synonym for thermal equilibrium. A large hot water tank and a small thimble of water can be in thermal equilibrium (same temperature), but the tank has vastly more total thermal energy. Equilibrium is about the intensive property (temperature), not the extensive property (total thermal energy).

---

## Demonstration library

**D1 — The three-cup temperature comparison**
Fill three cups: one with hot water (~60 °C), one with cold water (~5 °C), one with room-temperature water (~22 °C). Immerse a thermometer in each and record the stable reading. Then immerse the thermometer in the hot cup and record, remove, immerse in the cold cup and record. The thermometer is functioning as the zeroth law's "third object" — comparing the temperatures of the three cups indirectly.

**D2 — Iron vs. wood at room temperature**
Leave an iron block and a wooden block in the same room for at least an hour. Measure both with a thermometer: they should read the same temperature. Then ask learners to touch both. The iron feels colder — but the thermometer says they're equal. This directly demonstrates M1 recovery (equilibrium does not depend on material) and M4 recovery (the thermometer measures the correct value; the sensation is misleading).

**D3 — Waiting for equilibrium**
Insert a room-temperature thermometer into a cup of hot water (60 °C). Watch the reading climb and stabilise. When it stabilises, it reads the water's temperature — not some intermediate value. The stabilisation is the observable signature of equilibrium. Contrast: if you read the thermometer immediately after inserting it, you get the thermometer's initial temperature, not the water's.

---

## Discovery lesson

**Argue for guided discovery** (the zeroth law can be abstracted from observable temperature-comparison experiments):

Present the three-cup demonstration. Ask: "The thermometer tells us the hot cup is 60 °C. It also tells us the wooden block is 22 °C. Have the hot cup and the wooden block ever touched? Have they 'met' in any direct way?" No. "Yet we can compare their temperatures using the thermometer. Why does this work?" Guide the learner to articulate: if both are at equilibrium with the thermometer at different times, the thermometer's reading represents something about each object — and we trust that reading is transitive. This is the zeroth law as a discovery about thermometers.

---

## Teaching actions

**TA1 — Equilibrium ≠ equality drill**: Whenever "equilibrium" appears in a problem, require the learner to state: "What are the temperatures of the two objects? Are they equal? What is their total thermal energy?" This forces the separation of temperature equality (equilibrium condition) from total energy equality (not implied).

**TA2 — The thermometer story**: For every thermometry problem, walk through the zeroth law justification once: "Why does the thermometer reading equal the object's temperature? Because they reached thermal equilibrium. This is the zeroth law in action."

**TA3 — Material-independence check**: Whenever a learner expresses surprise that two different materials are in equilibrium, point out: "The zeroth law does not care what the material is. It only cares about temperature."

---

## Voice teaching

> "The zeroth law tells you why thermometers work. When you put a thermometer in hot water, heat flows until the thermometer and the water are at the same temperature — equilibrium. At that point, the thermometer's reading equals the water's temperature. Without the zeroth law, you couldn't trust that; you'd only know the thermometer's own temperature. The law says: if two things are both in equilibrium with a third thing, they're in equilibrium with each other. The thermometer is that third thing."

> "Thermal equilibrium does not mean 'no energy.' It means no net heat flow. The particles are still moving furiously; energy is still jumping back and forth between the objects. But the rate going left equals the rate going right, so there's no net transfer. The temperature reading is stable, not because nothing is happening, but because everything is balanced."

> "Iron and wood at room temperature are in equilibrium. The iron feels colder — I know. That's because iron conducts heat away from your skin faster, not because it's at a lower temperature. The thermometer disagrees with your hand. Trust the thermometer."

---

## Assessment

**Mastery gate**: The learner can state the zeroth law, explain why it makes thermometry possible, distinguish thermal equilibrium from equal thermal energy, and correctly identify when two objects are in equilibrium from temperature data alone.

**Formative golden probe**
> "Three objects A, B, and C are in the same room. A thermometer placed in A reads 25 °C; the same thermometer placed in B reads 25 °C; the thermometer placed in C reads 30 °C. (a) Are A and B in thermal equilibrium? (b) Are A and C in thermal equilibrium? (c) If A is a large iron block and B is a small marble, which has more thermal energy? (d) Why does the iron block feel cold to the touch even though it is at the same temperature as B?"

- (a)–(b): direct application of zeroth law
- (c): distinguishes temperature (equal) from total thermal energy (different)
- (d): addresses M1 (thermal conductivity, not temperature, explains the sensation)

**Confidence calibration question**
After (d): "How confident are you that iron and marble at the same temperature are in thermal equilibrium?" (1–5). Low confidence after correct answer → concept is procedural, not yet internalised.

**Delayed retrieval check (48 h / 7 days)**
"Explain in two sentences why a doctor's thermometer gives an accurate reading of a patient's body temperature, using the zeroth law." (Tests functional understanding, not just definition recall.)

---

## Recovery notes

**Failure mode A — Equilibrium confused with energy equality (M2)**
Ask: "Can two objects have the same temperature but different amounts of thermal energy?" Offer an example: lake at 20 °C vs. teacup at 20 °C — in equilibrium but vastly different total energy. Confirm that equilibrium is purely a temperature condition.

**Failure mode B — Material confusion (M1)**
Use D2 (iron and wood at room temperature). Measure both with a thermometer; show they read the same. Then ask the learner to touch both. "The thermometer says they're the same. Your hand says otherwise. The thermometer is right — why does your hand feel a difference?" Guide to thermal conductivity explanation. The physical experience of the paradox is necessary before the resolution is accepted.

**Failure mode C — Zeroth law dismissed as obvious**
Ask the harder question: "Before the zeroth law was formalised, how would you prove that a thermometer accurately measures an object's temperature — without already assuming that equilibrium means equal temperature?" This reveals that the law is non-trivial: it is the logical foundation for the concept of temperature itself, not a consequence of it.

---

## Memory & review

**Memory type**: Principle (the transitive property of thermal equilibrium) + application (why thermometers work).

**Spaced retrieval schedule**: Day 1, Day 3, Day 7, Day 21.

**Retrieval prompts**:
- "State the zeroth law of thermodynamics in your own words."
- "Two objects are left in the same oven for an hour. Are they in thermal equilibrium? What temperature do they share?"
- "Object A is at 50 °C. Object B is at 50 °C. Have they ever been in the same room? Does it matter?"
- "Why does a thermometer reading stabilise when placed in a liquid?"

**Interleaving**: After mastery, interleave zeroth-law reasoning with heat-transfer problems (where the direction and magnitude of heat flow are calculated) — the zeroth law sets the final state; the heat-transfer equations describe the path.

---

## Transfer map

**Immediate transfers**:
- `phys.therm.ideal-gas-law`: PV = nRT requires T to be the equilibrium temperature; the zeroth law justifies that all parts of a gas in a container share one temperature value

**Downstream transfers**:
- First law of thermodynamics: the concept of a heat reservoir (an object large enough that its temperature doesn't change during heat exchange) requires thermal equilibrium reasoning
- Second law: entropy always increases until equilibrium; the zeroth law defines what that equilibrium state is

**Cross-subject transfers**:
- `chem` — Le Chatelier's principle at thermal equilibrium; the concept of temperature dependence of equilibrium constants relies on thermal equilibrium being well-defined
- Biology — homeostasis: the body maintains thermal equilibrium with its own regulated temperature, resisting changes; fever = departure from the equilibrium set-point

---

## Curriculum feedback

The KG correctly places the zeroth law after temperature and before the ideal gas law. The single unlock (ideal-gas-law) is appropriate — the ideal gas law's temperature variable is defined as the equilibrium temperature established by the zeroth law.

One gap: the zeroth law also underpins `phys.therm.heat-transfer` conceptually (heat transfer stops at thermal equilibrium — the zeroth law defines that stopping point), but `phys.therm.heat-transfer` is listed as unlocked by `phys.therm.temperature` alone. Adding a soft dependency on the zeroth law for the heat-transfer concept entry would make the teaching sequence more coherent.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
