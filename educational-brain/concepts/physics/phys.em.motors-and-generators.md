# Electric Motor and Generator — `phys.em.motors-and-generators`

## Identity

- **Concept ID**: `phys.em.motors-and-generators`
- **Curriculum location**: physics / electricity and magnetism (electromagnetic induction)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.em.magnetic-force` — the load-bearing part is the force on a current in a
    magnetic field (F = BIL), which turns a motor's coil.
  - `phys.em.faradays-law` — the load-bearing part is that a changing magnetic flux
    through a coil induces an emf, which is how a generator produces electricity.
- **Unlocks** (from KG): none listed. AC from generators feeds `phys.em.ac-basics`
  and transformers; motors and generators are the main application of
  electromagnetism in power and transport.
- **Difficulty**: developing · **Bloom**: understand · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: NCERT Science Class 10 (Magnetic Effects of Electric Current); NCERT Physics Class 12 Ch. 6

## Learning Objective

After this concept, the learner can:

1. Explain how a DC motor turns and why it needs a split-ring commutator.
2. Explain how a generator induces an emf, and the difference slip rings and a
     commutator make.
3. Compute a generator's peak emf, NABω.
4. Explain motors and generators as energy converters, not energy sources.

## Core Understanding

Put a rectangular coil on an axle between the poles of a magnet and send a current through it. The two sides that lie across the field carry current in opposite directions, so the magnetic forces on them (F = BIL) point opposite ways and form a turning couple: the coil rotates, and electrical energy becomes kinetic energy. That is an electric motor. There is a catch: after half a turn the sides have swapped places, and if the current kept its direction the forces would now turn the coil backwards — it would rock and stop. A split-ring commutator, pressed by two carbon brushes, reverses the current in the coil every half turn, so the torque always turns the coil the same way. A motor turns faster with more current, a stronger field or more turns.

Now turn the same coil by hand. As it rotates, the magnetic flux through it keeps changing — from maximum, through zero, to maximum the other way — and a changing flux induces an emf (Faraday's law). Kinetic energy becomes electrical energy: that is a generator. If each end of the coil connects to its own slip ring, the output reverses every half turn — alternating current. If a commutator is used instead, the output is pulsating but always in one direction — a DC dynamo. For a coil of N turns and area A rotating at angular speed ω in a field B, the peak emf is NABω: 100 turns of 0.01 m² at ω = 100 rad/s in 0.5 T give 50 V. Turning twice as fast doubles both the peak emf and the frequency.

A motor and a generator are the same machine run in opposite directions, and neither creates energy. When a generator lights a lamp, the induced current in the coil feels a magnetic force that opposes the rotation (Lenz's law), so it becomes harder to turn; the electrical energy delivered comes from the work done turning it, minus losses as heat. With nothing connected, no current flows and the generator turns easily.

## Mental Models

- **Beginner (arriving)**: a motor "uses electricity" and a generator "makes
  electricity", by unknown means.
- **Intermediate**: motor = force on a current turns a coil (commutator keeps it
  turning); generator = turning coil changes flux, inducing an emf (slip rings → AC).
  Both convert energy.
- **Advanced**: back-emf in a running motor reduces its current as it speeds up;
  emf = NABω sin ωt; real machines use many coils and electromagnets.
- **Expert**: three-phase generators and induction motors; efficiency above 95 % in
  large machines; regenerative braking.
- **Versioning note**: install the intermediate model; name back-emf as the reason a
  stalled motor draws a large current.

## Why Students Fail

"Generating" electricity is heard as creating it, so the opposing force on the coil
is never considered. The commutator is memorised as a part name without its job.
And the motor and generator are learned as unrelated devices, missing that one law
(force on a current) runs the motor and another (induction) runs the generator.

## Misconceptions

**M1 — A generator creates electrical energy**
- *Why*: "generate" heard as "create" (type 2, everyday language).
- *Symptom / phrases*: "it's just as easy to turn when the lamp is on".
- *Detection probe (verbatim)*: "A generator lights a lamp. When the lamp is switched
  on, does turning the generator get harder, easier, or stay the same? Why?"
- *Recovery*: a motor driving its own generator never runs forever. The induced
  current opposes the turning; the energy comes from the push.
- *Verification*: energy accounts for a dynamo, a turbine and regenerative braking.

**M2 — Once current flows, the motor coil just keeps turning**
- *Why*: the half-turn reversal of torque is not drawn (type 5, instructional
  omission).
- *Symptom*: cannot say what the split ring does.
- *Detection probe*: "In a DC motor, what would happen after half a turn if the
  current in the coil never reversed?"
- *Recovery*: redraw the forces after half a turn — they turn the coil back.
- *Verification*: explain the split ring and contrast it with slip rings.

**M3 — A motor and a generator work by the same law in the same direction**
- *Why*: the devices look identical (type 4).
- *Symptom*: explains a generator with "the force on the current turns it".
- *Detection probe*: "Which law explains a motor, and which a generator?"
- *Recovery*: motor — force on a current (electrical → motion); generator —
  induction from changing flux (motion → electrical).
- *Verification*: classify fans, turbines, dynamos and starter motors.

## Analogies

- **Best analogy**: a water wheel and a water pump — the same wheel can be turned by
  flowing water (generator) or turned by a motor to push water (motor); either way
  energy changes form, never appears.
  *Breaking point*: water is a substance that flows; electric charge is not used up.
- **Alternative (commutator)**: swapping hands on a rope at the right moment so you
  keep pulling a wheel round the same way.
  *Breaking point*: hands choose; the commutator is fixed geometry.
- **Anti-analogy to avoid**: "a generator is a source of electricity like a well." It
  installs M1.

## Demonstrations

- **Home**: a bicycle dynamo — pedal with the light off and on and feel the
  difference.
- **Teacher demo**: a simple motor built from a coil, a magnet and paper-clip brushes;
  then a hand-cranked generator lighting a lamp, with and without the lamp
  connected.
- **Prediction before demo**: "will it get harder to crank when the lamp is on?"

## Discovery Questions

**Structure**:
1. *Need*: "How does the electricity from a battery make a fan spin?"
2. *Discovery*: draw the forces on the coil's sides; turn it half a turn and redraw.
3. *Direct instruction*: commutator, slip rings, NABω.
4. *Apply*: the energy account; regenerative braking.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): the coil between the poles, run both ways.
2. **Worked examples** (high fit): peak emf NABω = 50 V.
3. **Error exposure** (high fit for M1/M2): the self-running loop; the half-turn
   force reversal.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) Motor forces BIL on each side → couple → rotation.
   (b) Commutator reverses the current every half turn.
   (c) Generator: 100 × 0.01 × 0.5 × 100 = 50 V peak.

2. **ERROR-ANALYSIS** — a student designs a generator–motor loop that runs forever.
   Ask where the energy for the lamp comes from.

3. **PREDICTION-BEFORE-DEMO** — before cranking with the lamp on, ask harder or
   easier.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "split ring" → "peak emf" → "why pedalling is harder with the light on".

## Voice Teaching Notes

*How it sounds when taught well*: the tutor names the energy change for each machine
("electrical to kinetic", "kinetic to electrical"); says "converts", never
"makes energy"; names which law applies before explaining.

*Load-bearing sentence to slow down on*: "A generator turns kinetic energy into
electrical energy — the more current you take, the harder it is to turn."

*What to listen for*: "the generator makes energy" → M1; no role for the split ring →
M2; the motor's law used for the generator → M3.

## Assessment Signals

**Diagnostic — golden probe**: "A generator lights a lamp. When the lamp is switched
on, does turning the generator get harder, easier, or stay the same? Why?" Correct:
harder — the electrical energy comes from the work of turning it (Lenz).

**Distractor-mapped items**:
- "With the lamp on, turning the generator is…" Options: harder, easier, the same,
  impossible. Answer: harder. "The same" targets M1.
- "Without a split ring, a DC motor coil would…" Options: spin faster, rock and stop,
  spin the same, reverse continuously. Answer: rock and stop. "Spin the same"
  targets M2.

**Guided practice → independent practice fading ladder**:
1. Force directions on the coil (2 drawings).
2. Commutator and slip-ring roles (3 items).
3. Peak emf calculations (3 items).
4. Energy accounts (2 items).
5. (Unscaffolded) explain regenerative braking.

**Mastery gate set** (per assessment/05):
- *Production*: explain both machines and compute one peak emf.
- *New surface*: an electric car's braking.
- *Mixed*: motor/generator classification interleaved with calculation.
- *Delayed*: one-week check — the self-running loop.

**Calibration note**: part names are easy; the check that reveals miscalibration is
"harder to turn with the lamp on?".

## Tutor Recovery Strategy

*Likeliest utterance*: "the generator produces the electricity by itself" (M1).

*Concept-specific smaller question*: "Where does the energy in the lamp's light come
from? Follow it back to your arm."

*M2 recovery*: "Redraw the forces after half a turn. Which way do they push now?"

## Memory Hooks

- **Concept type**: device models (motor, generator) + principle (energy conversion).
- **Review form** (per Delivery 2 §8): the energy-change pair as spaced retrieval;
  commutator vs slip rings as a contrast pair.
- **Automaticity target**: "motor: force on a current; generator: induction" before
  AC circuits and transformers.
- **Interleaving partners**: `phys.em.magnetic-force`, `phys.em.faradays-law`,
  `phys.em.lenzs-law`.

## Transfer Connections

- *Near*: `phys.em.lenzs-law` — the opposing force on a generator's current.
- *Near*: `phys.em.ac-basics` — the sinusoidal output of an AC generator.
- *Far*: power stations — every turbine drives a generator.
- *Real-world*: fans, pumps, electric vehicles, bicycle dynamos, wind turbines.
- *Expert transfer*: induction motors and three-phase power.

## Cross-Subject Connections

- **Geography**: power stations of every kind (coal, hydro, wind, nuclear) end in a
  generator.
- **Engineering / Technology**: motors in appliances and vehicles; efficiency ratings.
- **Mathematics**: sinusoidal functions (emf = NABω sin ωt) and angular speed.
- **Environment**: electric vehicles and regenerative braking.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.em.motors-and-generators.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-03 under the coverage-driven KG extension
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §A item 28), a school chapter that had
only a passing mention before this node.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-03): Initial full-standard entry, written with the KG node under the coverage-driven extension.
