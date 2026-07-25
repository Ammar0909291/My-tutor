# chem.thermo.system — System, Surroundings, and State Functions

## 0. Concept Metadata

| Field | Value |
|---|---|
| Concept ID | `chem.thermo.system` |
| Domain | Thermodynamics |
| Requires | `chem.found.measurement` |
| Unlocks | `chem.thermo.first-law` |
| Difficulty | foundational |
| Bloom Level | understand |
| Mastery Threshold | 0.7 |
| Estimated Hours | 2 |

## 1. Concept Spine

Thermodynamics begins by defining a system (the part of the universe under study) and its surroundings (everything else), classified as open (matter and energy cross the boundary), closed (only energy crosses), or isolated (neither crosses); properties are further classified as state functions (depend only on the current state — T, P, V, U, H, S, G) versus path functions (depend on the route taken — q, w), and as extensive (scale with amount — mass, volume) versus intensive (don't scale with amount — temperature, density).

## 2. Four-Stage CPA+ Mental Model

**Concrete**: A polystyrene coffee-cup calorimeter with a lid and thermometer — nearly a closed system, since energy (heat, tracked via temperature) crosses the boundary but matter mostly doesn't.

**Representational**: A fence diagram — "system" is inside the fence, "surroundings" outside; arrows through the fence represent what's allowed to cross for each system type.

**Abstract**: The general classification: state function (depends only on current state, like GPS altitude) vs. path function (depends on route, like odometer distance); extensive (scales with amount) vs. intensive (doesn't).

**Transfer**: Given an unfamiliar physical scenario, correctly choosing a system boundary, classifying it as open/closed/isolated, and classifying any listed property as state/path and extensive/intensive — without having seen that exact scenario before.

## 3. Why Beginners Fail

Students think of heat as something stored inside a system ("the beaker contains more heat after the reaction") rather than as energy flowing across the boundary, distinct from internal energy which is what accumulates; they overgeneralize "more stuff = more of the property" onto intensive properties like temperature; and they assume the system boundary is fixed by the problem statement rather than a choice the investigator makes to suit the question being asked.

## 4. Misconception Library

### MC-1: Heat is stored in the system
- **Probe**: "Does the system 'contain' heat? What does it contain instead?"
- **Characteristic phrase**: "After the reaction, the beaker contains more heat."
- **Trigger (Type 2, perceptual intuition)**: "The beaker got hot" sounds like heat accumulated inside the beaker, but in thermodynamics heat is the energy flowing across the boundary, not a property of the system itself.
- **Conflict evidence [P28]**: After the reaction, the system's temperature (T, a state function) is higher, so its internal energy (U, also a state function) is higher — the energy that flowed in during the process was q (heat flow, a path function), and it is now stored as internal energy, not as "heat."
- **Bridge [P30]**: Once energy crosses the boundary and is absorbed, it stops being "heat" (a transfer process) and becomes part of the internal energy (a stored state).
- **Replacement [P31]**: Heat (q) is energy in transit across the boundary, a path function; internal energy (U) is what's stored, a state function; a system's temperature rising is evidence U increased, not that it now "contains heat."
- **Discrimination pairs [P33]**: q (transient, path-dependent, describes crossing) vs. U (stored, state-dependent, describes the system's current condition).
- **S6 repair path**: Draw the boundary explicitly, show q as an arrow crossing it, and show rising T as evidence of increased U — heat is the crossing, internal energy is what accumulated.

### MC-2: Intensive properties scale with amount
- **Probe**: "If you double the amount of water, does the temperature double? Does the volume double? Does the boiling point double?"
- **Characteristic phrase**: "If I have twice as much water, its temperature doubles."
- **Trigger (Type 1, overgeneralization)**: Students apply the "more stuff = more of the property" rule universally, without distinguishing which properties actually scale with amount.
- **Conflict evidence [P28]**: Doubling water's amount doubles its volume (extensive) but leaves temperature unchanged at thermal equilibrium (intensive) — pouring a second identical glass of 25°C water into a first doesn't produce 50°C water.
- **Bridge [P30]**: Some properties (extensive: mass, volume) genuinely scale with the amount of substance present; others (intensive: temperature, density, boiling point) are ratio-like and describe the substance's condition, independent of how much is present.
- **Replacement [P31]**: Test every property with "does doubling the amount double the property?" — yes means extensive, no means intensive.
- **Discrimination pairs [P33]**: Volume (doubles with amount) vs. temperature (unchanged with amount at equilibrium) for the same substance.
- **S6 repair path**: Run the water-doubling test explicitly on temperature, volume, and density side by side.

### MC-3: The system boundary is fixed by the problem
- **Probe**: "For a reaction happening in a flask sitting on a bench in a room: what is the system if the chemist cares about the reaction? What is the system if they care about energy lost to the room?"
- **Trigger (Type 5, instruction-induced)**: Textbook problems often implicitly define the system without stating it, leading students to believe the boundary is given rather than chosen.
- **Conflict evidence [P28]**: Choosing the reaction flask as the system versus choosing the room as the system for the same physical event flips the sign of q — heat leaving the flask (system loses energy) is heat entering the room (surroundings-as-system gains energy) — yet total energy of the universe is unchanged either way.
- **Bridge [P30]**: The boundary is a modeling choice made by the investigator to suit the question, not an intrinsic feature of the physical setup.
- **Replacement [P31]**: Changing the system boundary changes what counts as heat and work crossing it, but conservation of energy (ΔU of the universe = 0) holds regardless of where the boundary is drawn.
- **Discrimination pairs [P33]**: Flask-as-system (q negative, releasing heat) vs. room-as-system (q positive, receiving heat) for the identical physical event.
- **S6 repair path**: Show that two different boundary choices give different q signs for the same physical event, then confirm total universe energy is unchanged either way.

## 5. Explanation Library

**Primary explanation**: Thermodynamics starts by drawing a boundary around whatever is being studied (the system), with everything else called the surroundings. Whether matter and/or energy can cross that boundary defines the system as open, closed, or isolated. Properties describing the system fall into two independent classification pairs: state vs. path (does the property depend only on current condition, or on how you got there?) and extensive vs. intensive (does the property scale with the amount of substance, or not?).

**Secondary explanation (state-function framing)**: State functions (T, P, V, U, H, S, G) depend only on the system's current condition — like a GPS reading altitude, which doesn't care what route you drove. Path functions (q, w) depend on the specific route taken between two states — like an odometer, which does care about the route. Remarkably, the first law shows that even though q and w individually depend on path, their sum (ΔU = q + w) does not.

## 6. Analogy Library

- **Primary analogy**: The fence analogy — the system is whatever is inside the fence; you can let people (matter) cross freely (open), let only sounds/heat cross (closed), or seal the fence completely (isolated); what's "inside" depends entirely on where you draw the fence.
- **Breaking point**: The fence analogy explains boundary classification well but doesn't capture the state-vs-path distinction — for that, use the GPS-altitude-vs-odometer-distance analogy instead.
- **Anti-analogy**: Do NOT describe heat as something a system "has" or "contains" after a process — this directly reinforces MC-1.

## 7. Demonstration Library

- **Demonstration 1 (coffee-cup calorimeter)**: A polystyrene coffee cup with insulating walls, open top — nearly a closed system if a lid with a thermometer is added (matter mostly sealed, energy crosses via the boundary and is tracked through the temperature probe). Ask what would need to change to make it fully open (remove the lid) or fully isolated (perfect insulation, no probe reading escaping).

## 8. Discovery Lesson

**Opening**: "When you burn wood in a fireplace, is the wood the system? The room? The whole house? Does your answer change whether q is positive or negative?"

**Exploration**: Students pick different boundaries for the same fireplace scenario and determine the sign of q for each choice, discovering the sign flips with the boundary but the total energy balance doesn't change.

**Synthesis**: Guide toward: the boundary is a choice that determines what counts as "crossing," but conservation of energy holds regardless of where that choice is made.

**Closure**: "So is the system boundary something the problem tells you, or something you decide?" (Directly resolves MC-3.)

## 9. Teaching Actions (session_cap = 4)

- **TA-1 (SHOW)**: Present the fence diagram with three labeled examples (open/closed/isolated) for the student to classify.
- **TA-2 (TELL)**: State the state-function vs. path-function distinction explicitly using the GPS-vs-odometer framing.
- **TA-3 (DO)**: Student classifies 6–8 given properties as state/path and extensive/intensive.
- **TA-4 (TEST-THINKING)**: Present the fireplace boundary-choice scenario and ask the student to predict how the sign of q changes with the boundary.

## 10. Voice Teaching

Sign conventions for q and w belong to `chem.thermo.first-law`, not here — avoid introducing them during this foundational, purely definitional and conceptual concept, since doing so adds cognitive load without a calculation context yet. Use "state function" and "path function" repeatedly across multiple examples during the lesson so students own the terms by the end, not just their definitions.

## 11. Assessment

**Mastery gate**: Student can (a) classify 3 systems as open/closed/isolated with justification, (b) classify 6 of 8 given properties as state vs. path and extensive vs. intensive, (c) explain in one sentence why q is a path function.

- **FA-1**: "Does the system 'contain' heat? What does it contain instead?" — targets MC-1.
- **FA-2**: "If you double the amount of water, does the temperature double?" — targets MC-2.
- **FA-3**: "For a reaction in a flask on a bench: is the system fixed by the problem, or a choice you make?" — targets MC-3.

**Confidence calibration**: Predict high-confidence-wrong answers on FA-1 among students who've only encountered "heat" in everyday non-technical usage before this lesson.

**Delayed retrieval**: Re-probe MC-1's heat-vs-internal-energy distinction before `chem.thermo.first-law` introduces sign conventions and ΔU = q + w, since that concept assumes the q/U distinction is already solid.

## 12. Recovery Notes

- **S3 (stuck)**: For state vs. path, use the GPS analogy: altitude (state function) depends only on where you are; total distance driven (path function) depends on the route — same destination, different routes, same altitude, different distances.
- **S4 (frustrated)**: Normalize — "heat" in everyday language really does mean something different from the technical thermodynamic term, so this collision is expected, not a personal failure.
- **S6 (collision)**: Use the explicit boundary-drawing-with-T-rising demonstration for MC-1; use the water-doubling test for MC-2.
- **S9 (post-repair check)**: Ask the student to explain, unprompted, why choosing the room instead of the flask as the system flips the sign of q for the same event.

## 13. Memory & Review

Tag as a classification-scheme memory (open/closed/isolated; state/path; extensive/intensive) plus a conceptual-correction memory (heat as flow, not storage). Schedule a spaced check at ~1 week and again before `chem.thermo.first-law`.

## 14. Transfer Map

Feeds directly into `chem.thermo.first-law` (ΔU = q + w requires the state-function/path-function distinction and the heat-vs-internal-energy correction established here) and underlies all later thermodynamic quantity classification throughout the domain.

## 15. Curriculum Feedback

None — KG requires/unlocks edges and difficulty/bloom tags are consistent with this concept's scope and this blueprint's design.

---

*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
