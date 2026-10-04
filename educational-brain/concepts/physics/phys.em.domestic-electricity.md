# Household Circuits, Fuses, Earthing and Safety — `phys.em.domestic-electricity`

## Identity

- **Concept ID**: `phys.em.domestic-electricity`
- **Curriculum location**: physics / electricity and magnetism (applications)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.em.electrical-power` — the load-bearing part is P = VI (and P = I²R for
    heating), which gives the current an appliance draws and so the fuse rating, and
    explains why a large current overheats wiring.
- **Unlocks** (from KG): none listed. Household safety connects to
  `phys.em.ac-basics` (the 50 Hz supply) and to the energy bill in
  `phys.therm.energy-resources`.
- **Difficulty**: developing · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: NCERT Science Class 10 (Electricity; Magnetic Effects of Electric Current)

## Learning Objective

After this concept, the learner can:

1. Describe live, neutral and earth wires and parallel household wiring.
2. Explain why fuses, MCBs and switches go in the live wire.
3. Choose a fuse rating from I = P/V.
4. Explain overloading, short circuits and earthing.

## Core Understanding

Household electricity in India is supplied at about 220 V AC, 50 Hz, through three wires. The live wire (red or brown) carries the alternating high voltage; the neutral wire (black or blue) is kept close to 0 V and completes the circuit back to the supply; the earth wire (green, or green and yellow) is connected to the ground and normally carries no current. Appliances are connected in parallel between live and neutral, so each receives the full 220 V and can be switched on and off independently — in series, every appliance would share the voltage and one switch would control them all.

Switches, fuses and miniature circuit breakers (MCBs) are always placed in the live wire. A fuse is a thin wire that melts when the current exceeds its rating; an MCB trips. Either way the circuit is broken on the live side, so the appliance is cut off from the 220 V. A fuse in the neutral would stop the current but leave the appliance's wiring connected to the live — still dangerous to touch. The rating must sit just above the appliance's normal current, I = P/V: a 2 kW kettle on 220 V draws about 9.1 A, so it needs 10 A protection. A 5 A fuse would blow every time the kettle is used; a 30 A fuse would not blow even when a fault drew enough current to overheat the cable and start a fire — a fuse is meant to blow.

Two faults cause dangerously large currents. Overloading means running too many appliances on one circuit: a 1 kW iron, a 2 kW heater and a 1.5 kW kettle together draw 4.5 kW / 220 V ≈ 20.5 A, more than a 15 A circuit can safely carry. A short circuit means the live touches the neutral directly, so the resistance is almost zero and the current huge. Earthing protects against a third danger: if a loose live wire touches the metal case of an appliance, the case becomes live. Because the case is connected to earth through a low-resistance wire, a large current flows to earth at once and blows the fuse or trips the MCB, so nobody touching the case receives the current. Appliances with plastic, double-insulated bodies have no exposed metal to become live and may use two wires only.

## Mental Models

- **Beginner (arriving)**: electricity comes out of the socket; a fuse is a part that
  sometimes breaks; earth wires are for "extra safety" somehow.
- **Intermediate**: live is at high voltage, neutral near zero, earth a safety path;
  fuses and switches in the live; rating just above P/V; earthing makes a live case
  blow the fuse.
- **Advanced**: residual-current devices (RCD/RCCB) compare live and neutral currents
  and trip on a few milliamps of leakage — protection from shocks that a fuse is too
  slow and too coarse to give.
- **Expert**: earthing systems, fault-loop impedance, and why a body's resistance
  (from about 1 kΩ when wet) makes 220 V lethal.
- **Versioning note**: install the intermediate model; mention RCCBs as the modern
  addition.

## Why Students Fail

The neutral and live are thought interchangeable because the same current flows in
both, so position of the fuse seems irrelevant. A bigger fuse is assumed safer
because "it won't break". And the earth wire's role during a fault is never traced,
so earthing is memorised without understanding.

## Misconceptions

**M1 — The fuse can go in the live or the neutral**
- *Why*: equal current in both wires (type 4, partial reasoning).
- *Symptom / phrases*: "it doesn't matter where the fuse is".
- *Detection probe (verbatim)*: "Why must the fuse or MCB be in the live wire rather
  than the neutral?"
- *Recovery*: with a blown neutral fuse the appliance is still joined to 220 V.
- *Verification*: two diagrams — say which positions leave the appliance live.

**M2 — A higher-rated fuse is safer because it doesn't blow**
- *Why*: the blown fuse is seen as the problem (type 3, inverted causal reasoning).
- *Symptom*: chooses 30 A for every appliance.
- *Detection probe*: "A 2 kW kettle on 220 V. Which fuse: 5 A, 10 A or 30 A?"
- *Recovery*: a 30 A fuse lets a thin cable overheat at 12 A without blowing.
- *Verification*: fuse choices for three appliances.

**M3 — The earth wire carries current all the time**
- *Why*: three wires pictured as three working conductors (type 4).
- *Symptom*: "current goes out on live and back on earth".
- *Detection probe*: "In a working, fault-free kettle, how much current flows in the
  earth wire?"
- *Recovery*: none — it only carries current in a fault, when it diverts it from a
  person and blows the fuse.
- *Verification*: trace the current in normal use and in a live-to-case fault.

## Analogies

- **Best analogy**: a pressure-relief valve on a pressure cooker — set just above
  normal working pressure; it is supposed to blow when something goes wrong. A valve
  set far too high is no protection.
  *Breaking point*: valves reset; fuses must be replaced (MCBs reset).
- **Alternative (earthing)**: a lightning conductor — gives the dangerous current an
  easy path to the ground away from people.
  *Breaking point*: lightning is a single huge discharge; earthing works with the fuse.
- **Anti-analogy to avoid**: "the earth wire is a spare return wire." It installs M3.

## Demonstrations

- **Home (observe only, never open)**: read appliance rating plates and the MCB
  ratings on the distribution board; note the plug's three pins.
- **Teacher demo**: a low-voltage model with fuse wire of known rating melting when
  too many lamps are added; a model "metal case" with and without an earth wire.
- **Prediction before demo**: "add one more lamp — will the fuse wire melt?"

## Discovery Questions

**Structure**:
1. *Need*: "Why does the MCB trip when someone plugs in a heater and a kettle
   together?"
2. *Discovery*: add up currents with I = P/V for each appliance.
3. *Direct instruction*: wire roles, fuse position, earthing.
4. *Apply*: choose ratings and diagnose faults.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): the plug and the wiring diagram.
2. **Worked examples** (high fit): kettle 9.1 A → 10 A; overload 20.5 A.
3. **Error exposure** (high fit for M1/M2): the blown neutral fuse; the 30 A fuse on
   a thin cable.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) Kettle: 2000/220 ≈ 9.1 A → 10 A fuse.
   (b) Overload: 4500/220 ≈ 20.5 A > 15 A.
   (c) Earth fault: live touches case → large current to earth → fuse blows.

2. **ERROR-ANALYSIS** — a student fits a 30 A fuse "to stop it blowing". Ask what
   happens to the cable at 12 A.

3. **PREDICTION-BEFORE-DEMO** — before adding the extra lamp, ask whether the fuse
   wire melts.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "the three wires" → "fuse for a 1.5 kW microwave" → "how earthing protects you".

## Voice Teaching Notes

*How it sounds when taught well*: the tutor always says "in the live wire" with every
switch and fuse; says "a fuse is meant to blow"; traces the current path in a fault
aloud.

*Load-bearing sentence to slow down on*: "The fuse goes in the live wire, so that when
it blows, the appliance is cut off from the high voltage."

*What to listen for*: "neutral is fine too" → M1; "bigger fuse is safer" → M2;
"current returns on the earth" → M3.

## Assessment Signals

**Diagnostic — golden probe**: "Why must the fuse or MCB be in the live wire rather
than the neutral?" Correct: a blown fuse in the neutral would leave the appliance
connected to the live at 220 V.

**Distractor-mapped items**:
- "Fuse for a 2 kW kettle on 220 V?" Options: 5 A, 10 A, 30 A, 1 A. Answer: 10 A.
  "30 A" targets M2.
- "Fuse position?" Options: live, neutral, earth, any. Answer: live. "Any" targets M1.

**Guided practice → independent practice fading ladder**:
1. Wire identification and roles (3 items).
2. Currents and fuse ratings (4 items).
3. Overload calculations (2 items).
4. Fault tracing with earthing (2 items).
5. (Unscaffolded) plan the appliances on one circuit.

**Mastery gate set** (per assessment/05):
- *Production*: two fuse choices and one overload check.
- *New surface*: a double-insulated appliance.
- *Mixed*: classification of faults interleaved with ratings.
- *Delayed*: one-week check — "why the live wire?"

**Calibration note**: wire colours are memorised quickly; the check that reveals
miscalibration is the fuse position reason.

## Tutor Recovery Strategy

*Likeliest utterance*: "the same current flows in both wires, so either works" (M1).

*Concept-specific smaller question*: "After the fuse blows, which wires is the
appliance still connected to? What voltage is the live wire at?"

*M2 recovery*: "What is the fuse for — to stay intact, or to break first?"

## Memory Hooks

- **Concept type**: safety system (wiring, protection) + procedure (rating).
- **Review form** (per Delivery 2 §8): fault-tracing as spaced retrieval; ratings
  as distributed practice.
- **Automaticity target**: "switches and fuses in the live; rating just above P/V"
  as permanent life knowledge.
- **Interleaving partners**: `phys.em.electrical-power`, `phys.em.ac-basics`,
  `phys.therm.energy-resources`.

## Transfer Connections

- *Near*: `phys.em.electrical-power` — currents from ratings; heating I²R.
- *Near*: `phys.therm.energy-resources` — kWh and the bill.
- *Far*: industrial three-phase supply and its protection.
- *Real-world*: distribution boards, MCBs, RCCBs, plug design, electrical safety.
- *Expert transfer*: earthing system design and fault-loop impedance.

## Cross-Subject Connections

- **Biology**: how current through the body causes shock and burns; why wet skin is
  dangerous.
- **Civics / Safety education**: electrical safety rules at home and school.
- **Mathematics**: P = VI rearranged; summing currents.
- **Engineering**: building wiring codes and standards.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.em.domestic-electricity.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-03 under the coverage-driven KG extension
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §A item 29). "Fuse" and "earthing" had
zero hits in the physics corpus before this node.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-03): Initial full-standard entry, written with the KG node under the coverage-driven extension.
