# Simple Machines and Mechanical Advantage — `phys.mech.simple-machines`

## Identity

- **Concept ID**: `phys.mech.simple-machines`
- **Curriculum location**: physics / mechanics
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.mech.work` — the load-bearing part is W = F × d (force times distance
    moved in its direction). The whole concept is one consequence of it: a machine
    can change the force only by changing the distance, because the work in can
    never be less than the useful work out.
- **Unlocks** (from KG): none listed. Efficiency (useful output ÷ input) reappears
  in `phys.mech.power`, heat engines (`phys.therm.carnot-cycle`) and electrical
  devices; the lever principle is the everyday face of `phys.mech.torque` and
  `phys.mech.equilibrium`.
- **Difficulty**: developing · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: ICSE Physics Class 10 (Machines); NCERT Science Class 9 Ch. 11

## Learning Objective

After this concept, the learner can:

1. Compute mechanical advantage (load ÷ effort), velocity ratio (effort distance ÷
     load distance) and efficiency (MA ÷ VR) for levers, pulleys and ramps.
2. Explain from work that a machine trades force for distance and never reduces
     the work needed.
3. Classify levers (class 1, 2, 3) and say what each gains.
4. Explain why a real machine has MA < VR and efficiency below 100 %.

## Core Understanding

A simple machine lets a small force do a job that needs a large one — but never for free. A crowbar with an effort arm of 1.2 m and a load arm of 0.2 m lets you lift a 600 N rock by pushing with 100 N. To raise the rock 0.1 m, though, your hand must move 0.6 m. Work in: 100 N × 0.6 m = 60 J. Work out: 600 N × 0.1 m = 60 J. The force went down six times and the distance went up six times; the work did not change. That is the whole idea: a machine trades force for distance, and the work you put in can never be less than the work you get out.

Three numbers describe a machine. Mechanical advantage MA = load ÷ effort says how much it multiplies force. Velocity ratio VR = distance moved by the effort ÷ distance moved by the load depends only on the machine's geometry: for a lever it is effort arm ÷ load arm, for a pulley system it is the number of rope strands supporting the load, for a ramp it is length ÷ height. Efficiency = useful work out ÷ work in = MA ÷ VR. An ideal, frictionless machine has MA = VR. A real one loses some work to friction and to lifting its own moving parts, so MA < VR: a 4-strand block and tackle (VR 4) lifting 800 N with 250 N has MA 3.2 and efficiency 80 %.

Levers come in three classes, named by what is in the middle. Class 1: the fulcrum is between effort and load (seesaw, scissors). Class 2: the load is between (wheelbarrow, nutcracker) — MA always above 1. Class 3: the effort is between (tongs, your forearm) — MA always below 1. A class-3 lever is not a bad lever: it trades the other way, giving up force to gain distance and speed. Your biceps moves a few centimetres and your hand sweeps through many times that. Likewise a single fixed pulley has MA 1 and is still useful — it changes the direction of the pull.

## Mental Models

- **Beginner (arriving)**: machines make jobs easier, maybe by "adding energy".
- **Intermediate**: machines trade force for distance; MA, VR and efficiency
  quantify the trade; work out ≤ work in.
- **Advanced**: VR is fixed by geometry, MA by geometry and friction. A pulley
  system's efficiency rises with load, because the fixed weight of the lower
  block becomes a smaller share of the work done. Class-3 levers trade force for
  speed.
- **Expert**: every machine is energy conservation plus losses; the same analysis
  covers gears, hydraulic presses (pressure × area, `phys.mech.pressure-fluids`)
  and the principle of virtual work.
- **Versioning note**: install the intermediate model; derive the lever's VR from
  similar arcs rather than from torque, and signal that the moment of a force
  (`phys.mech.torque`) gives the same result.

## Why Students Fail

The everyday phrase "a machine makes work easier" becomes "a machine makes less
work", which contradicts energy conservation and makes efficiency meaningless.
Second, learners judge a machine only by MA and dismiss class-3 levers and fixed
pulleys. Third, MA and VR are confused, so efficiency is computed upside down.

## Misconceptions

**M1 — A machine reduces the work you have to do**
- *Why*: "easier" is heard as "less work" (type 2, everyday language).
- *Symptom / phrases*: "the lever saves work"; "a machine can be 120 % efficient".
- *Detection probe (verbatim)*: "With a crowbar you lift a 600 N rock by pushing
  with only 100 N. Did you do less work than lifting the rock directly?"
- *Recovery*: compute both works — 100 N × 0.6 m and 600 N × 0.1 m are both 60 J.
- *Verification*: work in and work out for three machines.

**M2 — A useful machine must have MA greater than 1**
- *Why*: MA is taught as "how good the machine is" (type 5, instructional framing).
- *Symptom*: calls tongs or the forearm useless; can't say why a fixed pulley exists.
- *Detection probe*: "Your forearm is a lever with MA about 1/8. Why would the body
  use it?"
- *Recovery*: MA < 1 gains distance and speed; MA = 1 can change direction.
- *Verification*: say what each of four machines gains.

**M3 — MA and VR are the same thing (or efficiency = VR ÷ MA)**
- *Why*: both are ratios with similar names (type 4, conflation).
- *Symptom*: efficiency above 100 %; computes VR from forces.
- *Detection probe*: "A pulley lifts 800 N with 250 N; the effort moves 4 m for 1 m
  of lift. Which number is MA and which is VR?"
- *Recovery*: MA comes from forces, VR from distances; efficiency is MA ÷ VR and
  can never exceed 1.
- *Verification*: two full MA/VR/efficiency calculations.

## Analogies

- **Best analogy**: a gear on a bicycle. Low gear: easy pedalling (less force) but
  many turns of the pedals for a short distance up the hill. The hill takes the
  same energy either way.
  *Breaking point*: gears are rotating machines; keep the analogy to the trade-off.
- **Alternative**: climbing a ramp versus a ladder to the same platform — less
  steep, longer path, same height gained.
  *Breaking point*: walking has its own losses; it illustrates the trade, not the
  numbers.
- **Anti-analogy to avoid**: "a machine multiplies your strength." It suggests
  something is created; nothing is.

## Demonstrations

- **Home**: open a paint tin with a long and a short screwdriver; measure how far
  the handle moves.
- **Teacher demo**: a metre-rule lever on a pivot with masses; measure effort and
  the distances moved.
- **Pulleys**: fixed, movable and a block and tackle with a spring balance; record
  effort and rope pulled.
- **Ramp**: pull a trolley up a ramp with a force meter; compare with lifting it
  straight up.
- **Prediction before demo**: "more strands — what happens to the rope you pull?"

## Discovery Questions

Guided discovery from measurement.

**Structure**:
1. *Need*: "Why can a child lift a car with a jack?"
2. *Discovery*: measure effort, load and both distances on a real lever; compute
   both works.
3. *Generalise*: "force × distance is the same on both sides — so what does the
   machine change?"
4. *Apply*: pulleys and ramps.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): the crowbar with measured distances.
2. **Worked examples** (high fit): one lever, one pulley system, one ramp.
3. **Error exposure** (high fit for M1/M2): the equal works; the forearm.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) Crowbar: MA = VR = 1.2/0.2 = 6; 100 N lifts 600 N; 60 J in and out.
   (b) Block and tackle: VR 4, MA 800/250 = 3.2, efficiency 80 %.
   (c) Ramp 5 m by 1 m: VR 5; 200 N pushes 800 N; MA 4, efficiency 80 %.

2. **ERROR-ANALYSIS** — a student writes "the pulley has efficiency 4/3.2 = 125 %".
   Ask which ratio is which.

3. **PREDICTION-BEFORE-DEMO** — before pulling the rope, ask how far it must move.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "Ideal MA of a 1.5 m / 0.3 m lever" → "3-strand pulley efficiency" →
   "why doesn't a ramp save work?"

## Voice Teaching Notes

*How it sounds when taught well*: the tutor always pairs "less force" with "more
distance"; says "trade", never "save"; asks "what does it gain?" for every machine.

*Load-bearing sentence to slow down on*: "A machine trades force for distance —
the work you put in is never less than the work you get out."

*What to listen for*: "saves work/energy" → M1; "that lever is useless" → M2;
efficiency above 100 % → M3.

## Assessment Signals

**Diagnostic — golden probe**: "With a crowbar you lift a 600 N rock by pushing with
only 100 N. Did you do less work than lifting the rock directly?" Correct: no —
less force through more distance; equal work (more, with friction).

**Distractor-mapped items**:
- "4-strand pulley, 800 N load, 250 N effort — efficiency?" Options: 80 %, 125 %,
  3.2 %, 100 %. Answer: 80 %. Distractor 125 % targets M3.
- "Forearm, MA ≈ 1/8 — what does it gain?" Options: nothing, speed and reach,
  force, energy. Answer: speed and reach. "Nothing" targets M2; "energy" targets M1.

**Guided practice → independent practice fading ladder**:
1. Lever MA and VR from arm lengths (3 problems).
2. Pulley VR from strands and MA from forces (3 problems).
3. Ramps (2 problems).
4. Efficiency (3 problems).
5. (Unscaffolded) a car jack or a bicycle gear.

**Mastery gate set** (per assessment/05):
- *Production*: three machines, all three numbers each.
- *New surface*: a car jack or a screw.
- *Mixed*: classification interleaved with calculation.
- *Delayed*: one-week check — the forearm.

**Calibration note**: learners find MA easy and feel done; the check that reveals
miscalibration is "did you do less work?" — many confident learners say yes.

## Tutor Recovery Strategy

*Likeliest utterance*: "but it's easier, so it must be less work" (M1).

*Concept-specific smaller question*: "How far did your hand move? How far did the
rock move? Multiply each by its force." The learner finds the equal works.

*M2 recovery*: "Throw a ball with your arm. Is the hand moving faster or slower
than the muscle?"

## Memory Hooks

- **Concept type**: principle (work in ≥ work out) + procedure (MA, VR, efficiency).
- **Review form** (per Delivery 2 §8): one machine per review, all three numbers;
  contrast pairs (MA vs VR; class 2 vs class 3).
- **Automaticity target**: efficiency = MA/VR, always ≤ 1, before `phys.mech.power`
  and heat engines.
- **Interleaving partners**: `phys.mech.work`, `phys.mech.power`,
  `phys.mech.torque`.

## Transfer Connections

- *Near*: `phys.mech.torque` and `phys.mech.equilibrium` — the moment of a force
  gives the same lever rule.
- *Near*: `phys.mech.power` — efficiency of motors and engines.
- *Far*: `phys.mech.pressure-fluids` — a hydraulic jack trades force for distance
  through pressure.
- *Real-world*: jacks, cranes, gears, screws, scissors, the human skeleton.
- *Expert transfer*: the principle of virtual work; mechanical design.

## Cross-Subject Connections

- **Biology**: the skeleton and muscles are levers, mostly class 3 — built for
  speed and range, not force.
- **Mathematics**: ratios and proportion; similar triangles give the lever's VR.
- **Engineering / Technology**: gear trains, cranes and pulleys in construction.
- **History**: Archimedes' "give me a place to stand and I will move the Earth" —
  the lever principle, not a history node.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.mech.simple-machines.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-03 under the coverage-driven KG extension
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §A item 5). The audit proposed
`phys.mech.torque` as a prerequisite; it was dropped (KGCS P1, strict necessity):
the lever rule follows from work alone, and torque requires the vector cross
product, which would put a school-level topic behind a proficient one.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-03): Initial full-standard entry, written with the KG node under the coverage-driven extension.
