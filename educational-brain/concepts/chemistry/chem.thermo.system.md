# System, Surroundings and State Functions — `chem.thermo.system`

## Identity

- **KG ID**: chem.thermo.system
- **Subject**: Chemistry
- **Domain**: Thermodynamics (chem.thermo)
- **Difficulty**: foundational
- **Bloom level**: understand
- **Estimated hours**: 2
- **Mastery threshold**: 0.70
- **Prerequisites**: chem.found.measurement
- **Unlocks**: chem.thermo.first-law
- **Cross-links**: phys.therm.first-law

## Learning Objective

Students can define system and surroundings and classify a reaction vessel as an open, closed, or isolated system; distinguish state functions from path functions with examples; distinguish extensive from intensive properties with examples; and explain why thermodynamic quantities are defined for the system (with surroundings as the reference frame) rather than for the reaction alone.

## Core Understanding

Thermodynamics always requires a defined boundary separating the **system** (the material or process under study) from the **surroundings** (everything else). The system boundary determines what counts as heat or work exchanged. An **open system** can exchange both matter and energy; a **closed system** can exchange energy but not matter; an **isolated system** exchanges neither.

**State functions** depend only on the current state of the system (defined by variables like T, P, V, composition) — not on how the system arrived at that state. Examples: internal energy (U), enthalpy (H), entropy (S), Gibbs energy (G), temperature (T), pressure (P), volume (V). **Path functions** depend on the route taken: heat (q) and work (w) are path functions — the same initial and final states can be connected by infinitely many paths, each with different q and w values, even though ΔU is the same for all.

**Extensive properties** scale with the amount of material (mass, volume, internal energy, enthalpy). **Intensive properties** are independent of amount (temperature, pressure, density, molar mass, molar enthalpy).

## Mental Models

**The bank account model for state functions**: Your bank balance is a state function — it depends only on your current financial state, not on every deposit and withdrawal that brought you there. The path (sequence of transactions) is irrelevant to the current balance. Path functions are like the total cash you have deposited or withdrawn — those depend on the history, not just the current state.

**The boundary as a fence**: System = inside the fence; surroundings = everything outside. Open fence = matter and energy cross. Closed fence = energy crosses, matter cannot. Impenetrable, insulating wall = isolated (neither crosses).

## Why Students Fail

1. **State function vs. path function by name only**: Students memorise that "enthalpy is a state function" without understanding what that means (the path independence) and cannot apply it to a new case.
2. **Extensive/intensive confusion for derived quantities**: Students correctly classify volume (extensive) and temperature (intensive) but struggle with molar enthalpy (intensive) vs. total enthalpy (extensive), or with concentration (intensive) vs. amount of substance (extensive).
3. **System boundary ambiguity**: Students don't realise they choose the system — the choice affects sign conventions for q and w.
4. **q and w as properties of the system**: Students believe heat and work are stored in the system like energy. In fact, q and w describe energy in transit across the system boundary.

## Misconceptions

**MC-1 — Heat is stored in the system** (Type 2, perceptual intuition)
- *Mechanism*: "The beaker got hot" sounds like heat accumulated inside the beaker. In thermodynamics, heat is the energy flowing across the boundary, not a property of the system.
- *Diagnostic probe*: "Does the system 'contain' heat? What does it contain instead?"
- *Characteristic phrase*: "After the reaction, the beaker contains more heat."
- *Repair*: After the reaction, the system's temperature (T, a state function) is higher → its internal energy (U, also a state function) is higher. The energy that flowed in was q (heat flow, a path function). Now it is stored as internal energy, not as heat.

**MC-2 — Intensive properties scale with amount** (Type 1, overgeneralization)
- *Mechanism*: Students apply the "more stuff = more of the property" rule to all properties.
- *Diagnostic probe*: "If you double the amount of water, does the temperature double? Does the volume double? Does the boiling point double?"
- *Characteristic phrase*: "If I have twice as much water, its temperature doubles."
- *Repair*: Temperature doesn't change with amount at thermal equilibrium — it is a ratio-like property. Volume doubles (extensive) but temperature is unchanged (intensive). Density (mass/volume) also doesn't change.

**MC-3 — The system boundary is fixed by the problem** (Type 5, instruction-induced)
- *Mechanism*: Textbook problems often implicitly define the system without stating it. Students believe the boundary is given, not chosen.
- *Diagnostic probe*: "For a reaction happening in a flask sitting on a bench in a room: what is the system if the chemist cares about the reaction? What is the system if they care about energy lost to the room?"
- *Repair*: The boundary is chosen by the investigator to suit the question. Changing the boundary changes what counts as heat and work — but ΔU of the universe is always zero (conservation of energy).

## Analogies

**The fence analogy**: System = property inside the fence. You can let people (matter) in and out (open) or only sounds (energy) cross (closed) or seal the fence completely (isolated). The property values inside depend on what you've defined as "inside."

## Demonstrations

**Demonstration 1 — Coffee cup calorimeter as a "closed system"**
- A polystyrene coffee cup (insulating walls, open top) is nearly a closed system — matter can escape (vapor) if you don't cover it; adding a lid with a thermometer makes it closer to closed. Ask: what crosses the boundary? (Energy via the temperature probe; matter escapes if open.) Connect to measurement of q in calorimetry.

## Discovery Questions

1. "When you burn wood in a fireplace, is the wood the system? The room? The earth? Does your answer change the sign of q?" (Targets: choice of system boundary; sign of heat flow reverses when you choose surroundings as the system.)
2. "Internal energy (U) is a state function. Heat (q) is a path function. The equation ΔU = q + w (first law) sums two path functions to give a state function. How is that possible?" (Targets: q and w individually depend on path, but their sum ΔU does not — the path-dependencies cancel.)
3. "A gas expands against a constant external pressure vs. expanding into a vacuum. The initial and final states are the same. Is the work done the same? Is ΔU the same?" (Targets: w is different (path function); ΔU is the same (state function); q compensates for the difference in w.)

## Teaching Sequence

1. Present the system-surroundings boundary concept with the fence analogy. Give three examples (reaction flask, living cell, thermos flask) and classify each.
2. Introduce open/closed/isolated with matter-energy crossing classification table.
3. Introduce state functions with the bank-account analogy. List key state functions (T, P, V, U, H, S, G) and ask what they have in common (depend only on current state).
4. Contrast with path functions: q and w. Give the gas-expansion example (vacuum vs. constant pressure) to show same ΔU but different q and w.
5. Introduce extensive vs. intensive with the water-doubling demonstration.
6. Practice: classify 8 properties as state/path, extensive/intensive.

## Tutor Actions

- If student says "the beaker contains more heat" → MC-1 repair: distinguish heat flow (q, path, transient) from internal energy (U, state, stored).
- If student says temperature doubles with amount → MC-2 repair: the doubling exercise.
- If student says the boundary is predetermined → MC-3 repair: show that two different boundary choices give different q signs for the same physical event.
- Advance when student can classify properties correctly and explain why q and w are path functions while ΔU is not.

## Voice Teaching Notes

Sign conventions for q and w are introduced in chem.thermo.first-law, not here. Avoid introducing sign conventions during this foundational concept — it adds cognitive load without a calculation context. The focus here is purely definitional and conceptual.

"State function" and "path function" are technical terms that students need to own by the end of this session. Use them repeatedly in multiple contexts during the lesson, not just in definition.

## Assessment Signals

**Mastery gate**:
1. Student correctly classifies 3 systems as open, closed, or isolated with justification.
2. Student correctly classifies 6 of 8 properties as state vs. path, extensive vs. intensive.
3. Student explains in one sentence why q is a path function (different paths between same initial and final states can exchange different amounts of heat).

**FRAGILE signal**: student correctly classifies state functions by memorised list but cannot explain path independence when given a new example.

**MISCONCEIVING signal**: student says "heat is stored in the system after the reaction." Requires the q-vs-U distinction before proceeding to the first law.

## Tutor Recovery Strategy

If stuck:
1. For state vs. path: use the GPS analogy — your GPS shows altitude (state function: depends only on where you are). The total distance driven to get there (path function: depends on the route). Same destination, different routes → same altitude, different distances.
2. For heat-vs-internal-energy: draw the boundary explicitly; show energy (q) crossing the boundary as a flow; show T on the thermometer rising inside as evidence that internal energy increased. Heat is the crossing; internal energy is what accumulated.
3. For extensive/intensive: test every property with "does doubling the amount double the property?" If yes → extensive. If no → intensive.

## Memory Hooks

- **Open/closed/isolated**: "Cafe (open) = food and air in/out; thermos (closed) = heat transfers but lid seals matter; sealed dewar (isolated) = nothing."
- **State functions**: TPVUGHS — Temperature, Pressure, Volume, U, G, H, S. (The properties used in equations for equilibrium and spontaneity.)
- **"q and w: how you got there; U: where you are."**

## Transfer Connections

- **chem.thermo.first-law**: the first law (ΔU = q + w) directly applies the state/path distinction: ΔU is state-function; q and w are path-function components that sum to ΔU.
- **chem.thermo.enthalpy**: enthalpy (H = U + PV) is a state function designed to equal q at constant pressure — simplifying calorimetry.
- **chem.thermo.entropy**: entropy (S) is a state function; entropy change (ΔS) in the surroundings requires defining those surroundings explicitly.

## Cross-Subject Connections

- **Physics (phys.therm.first-law)**: the first law of thermodynamics is shared with physics; the system/surroundings/open/closed/isolated vocabulary is identical.

## Blueprint References

Blueprint file: `docs/chemistry/teaching-assets/assets.json`, entry `chem.thermo.system`.

Status: all Blueprint content fields are `[TEMPLATE]` placeholder strings as of 2026-07-23. (Note: the KG description for this node is particularly detailed; the Blueprint's concept_summary field, when authored, should build on that description.)

## Runtime Asset References

No AssetIdentity records seeded for `chem.thermo.system` as of 2026-07-23.

## Curriculum Feedback

None. Node is correctly positioned as the thermodynamics entry point gating first-law.

## Version History

- v1.0.0 — 2026-07-23 — initial entry, authored per EDUCATIONAL_BRAIN_STANDARD.md v1.0
