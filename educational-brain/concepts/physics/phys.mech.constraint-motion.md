# Connected Bodies, Pulleys and Constraint Relations — `phys.mech.constraint-motion`

## Identity

- **Concept ID**: `phys.mech.constraint-motion`
- **Curriculum location**: physics / mechanics (Newton's laws applications)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.mech.tension` — the load-bearing part is tension as the pull a string
    exerts, the same all along a light string over a frictionless pulley, and
    (through its chain) free-body diagrams and F = ma for a single body.
    Connected-body problems apply that to several bodies at once, with the string
    adding a constraint.
- **Unlocks** (from KG): none listed. Constraint reasoning is the entry to
  multi-body dynamics, and later to generalised coordinates
  (`phys.mech.generalized-coordinates`).
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 3 · **References**: NCERT Physics Class 11 Ch. 5 (Laws of Motion); HC Verma Ch. 5

## Learning Objective

After this concept, the learner can:

1. Solve connected-body problems with one free-body diagram and one F = ma equation
     per body, plus the string constraint.
2. Explain why the tension in an Atwood machine lies between the two weights.
3. Derive constraint relations for movable pulleys from constant string length.
4. Solve table-and-hanging-mass systems.

## Core Understanding

When bodies are tied together by a string, each still obeys F = ma on its own; the string adds two facts. First, a light string over a frictionless pulley pulls with the same tension T at both ends. Second, an inextensible string makes the connected bodies move with the same magnitude of acceleration. So: draw a free-body diagram for EACH body, write F = ma for each in its own direction of motion, and solve the equations together. In an Atwood machine with 3 kg and 2 kg over a pulley, the 3 kg mass accelerates down and the 2 kg up: 29.4 − T = 3a and T − 19.6 = 2a. Adding gives 9.8 = 5a, so a = 1.96 m/s², and T = 19.6 + 2 × 1.96 = 23.52 N. In general a = (m₁ − m₂)g/(m₁ + m₂) and T = 2m₁m₂g/(m₁ + m₂).

The tension is not either weight. It must be less than the heavier weight, 29.4 N, or the 3 kg mass could not accelerate downward, and more than the lighter weight, 19.6 N, or the 2 kg mass could not accelerate upward. Only if the system is not accelerating — the masses held still, or equal masses moving at constant speed — does T equal a weight. The same method handles a 4 kg block on a smooth table pulled over the edge by a hanging 1 kg mass: the only horizontal force on the block is T = 4a, and for the hanging mass 9.8 − T = 1a, so a = 1.96 m/s² and T = 7.84 N, again less than the hanging weight.

With a movable pulley the accelerations are no longer equal, and the relation comes from the fixed length of string. A block hangs from a pulley supported by two strands; one end is fixed to the ceiling and the other is pulled up. Pulling 2 m of string out shortens the two strands by 2 m in total — 1 m each — so the block rises only 1 m. Positions, velocities and accelerations all follow the same rule: the block's is half the free end's, a_block = a_end/2. Writing the string length in terms of positions and differentiating twice gives every such constraint.

## Mental Models

- **Beginner (arriving)**: tension is the weight hanging on the string; connected
  bodies can be treated as one lump without thinking.
- **Intermediate**: one F = ma per body, same T, linked accelerations; tension lies
  between the weights in an accelerating Atwood machine; movable pulleys halve the
  motion.
- **Advanced**: constraint equations from string length; massive pulleys
  (rotational inertia makes the tensions on either side differ); systems with
  friction and inclines.
- **Expert**: constraints reduce degrees of freedom — the basis of Lagrangian
  mechanics with generalised coordinates.
- **Versioning note**: install the intermediate model; flag massive pulleys as the
  case where T differs on the two sides.

## Why Students Fail

Learners carry over the static case (a hanging mass at rest has T = mg) into
accelerating systems. They write one equation for the "whole system" and then
cannot find the tension. And they assume every connected body has the same
acceleration, which fails as soon as a movable pulley appears.

## Misconceptions

**M1 — The string tension equals the weight of one of the masses**
- *Why*: static intuition (type 4, overgeneralisation).
- *Symptom / phrases*: "T = 29.4 N because the 3 kg mass hangs on it".
- *Detection probe (verbatim)*: "A 3 kg and a 2 kg mass hang over a frictionless
  pulley and are released. Is the tension in the string 29.4 N, 19.6 N, or something
  in between? Why?"
- *Recovery*: if T = 29.4 N the 3 kg mass would have zero net force and could not
  accelerate.
- *Verification*: tension for three Atwood and table systems.

**M2 — A block on a movable pulley moves as fast as the rope's end**
- *Why*: "everything on the string moves together" (type 4).
- *Symptom*: same displacement or acceleration for the block and the free end.
- *Detection probe*: "Pull the free end of a movable-pulley system up 2 m. How far
  does the block rise?"
- *Recovery*: the string's length is fixed; 2 m out shortens two strands by 1 m each.
- *Verification*: two constraint relations from string length.

**M3 — One equation for the whole system is enough**
- *Why*: system methods give a but not T (type 5, partial method).
- *Symptom*: finds a, then cannot find the tension.
- *Detection probe*: "You found a = 1.96 m/s² for the whole system. How do you get T?"
- *Recovery*: apply F = ma to one body alone, where T is an external force.
- *Verification*: find T in two systems after finding a.

## Analogies

- **Best analogy**: a tug-of-war between unequal teams — the rope tension is less
  than the stronger team's pull and more than the weaker's, and both teams move
  together.
  *Breaking point*: teams push on the ground; masses are pulled by gravity.
- **Alternative (movable pulley)**: a rope looped under a load and held by two
  people — each strand only needs to shorten by half as much as the rope you pull.
  *Breaking point*: illustrative only; work it from string length.
- **Anti-analogy to avoid**: "the string carries the weight of the heavier mass."
  It installs M1.

## Demonstrations

- **Home**: two bags of different masses over a smooth rail or a door-top pulley;
  watch the motion.
- **Teacher demo**: an Atwood machine with a light gate measuring a; a spring
  balance in the string shows T between the weights.
- **Movable pulley**: mark the string and the block; pull 20 cm of string and
  measure the block's 10 cm rise.
- **Prediction before demo**: "will the spring balance read the heavier weight?"

## Discovery Questions

**Structure**:
1. *Need*: "Why doesn't the heavier mass just fall at g?"
2. *Discovery*: draw both free-body diagrams; look at what T must do to each.
3. *Direct instruction*: simultaneous equations; the constraint.
4. *Apply*: table systems, movable pulleys, lifts with counterweights.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Worked examples** (primary): Atwood 3/2 kg; table 4/1 kg.
2. **Error exposure** (high fit for M1/M2): T = 29.4 N contradiction; the 2 m pull.
3. **Practice** (high fit): new configurations.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) Atwood: a = 1.96 m/s², T = 23.52 N.
   (b) Table: a = 1.96 m/s², T = 7.84 N.
   (c) Movable pulley: block rises 1 m for 2 m of string; a_block = a_end/2.

2. **ERROR-ANALYSIS** — a student writes T = 29.4 N. Ask for the net force on the
   3 kg mass.

3. **PREDICTION-BEFORE-DEMO** — before reading the spring balance, ask whether it
   shows a weight.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "4/1 kg Atwood" → "table system equations" → "movable pulley relation".

## Voice Teaching Notes

*How it sounds when taught well*: the tutor says "one diagram per body" every time;
names the direction of acceleration for each body before writing its equation;
derives constraints from "the string can't stretch".

*Load-bearing sentence to slow down on*: "Each body obeys F = ma on its own; the
string only tells you that the tensions match and how the accelerations are linked."

*What to listen for*: "T equals the weight" → M1; same acceleration on a movable
pulley → M2; stuck after the system acceleration → M3.

## Assessment Signals

**Diagnostic — golden probe**: "A 3 kg and a 2 kg mass hang over a frictionless pulley
and are released. Is the tension 29.4 N, 19.6 N, or in between? Why?" Correct: in
between (23.52 N).

**Distractor-mapped items**:
- "Atwood 3 kg/2 kg: T?" Options: 29.4 N, 19.6 N, 23.52 N, 49 N. Answer: 23.52 N.
  "29.4 N" targets M1.
- "Movable pulley: free end pulled 2 m — block rises?" Options: 2 m, 1 m, 4 m,
  0.5 m. Answer: 1 m. "2 m" targets M2.

**Guided practice → independent practice fading ladder**:
1. Two free-body diagrams per system (3 systems).
2. Atwood machines (3 problems).
3. Table-and-hanging-mass systems (2 problems).
4. Movable-pulley constraints (2 problems).
5. (Unscaffolded) a lift with a counterweight.

**Mastery gate set** (per assessment/05):
- *Production*: one Atwood and one table system with T.
- *New surface*: a lift and counterweight.
- *Mixed*: constraint items interleaved with tension items.
- *Delayed*: one-week check — "why between the weights?"

**Calibration note**: the Atwood formula is memorised easily; the check that reveals
miscalibration is the table system, where the formula doesn't apply.

## Tutor Recovery Strategy

*Likeliest utterance*: "the string holds the 3 kg mass, so T is its weight" (M1).

*Concept-specific smaller question*: "If T were 29.4 N, what would the net force on
the 3 kg mass be? Could it accelerate?"

*M2 recovery*: "If the block rose 2 m, how much would each strand shorten? How much
string would that need?"

## Memory Hooks

- **Concept type**: procedure (one equation per body + constraint) + principle
  (constant string length).
- **Review form** (per Delivery 2 §8): new configurations as distributed practice;
  "T between the weights" as a spaced prompt.
- **Automaticity target**: one diagram per body, without prompting, before inclines
  with friction and circular motion.
- **Interleaving partners**: `phys.mech.tension`, `phys.mech.free-body-diagram`,
  `phys.mech.friction`, `phys.mech.inclined-plane`.

## Transfer Connections

- *Near*: `phys.mech.friction` and `phys.mech.inclined-plane` — connected bodies on
  rough slopes.
- *Near*: `phys.mech.simple-machines` — the movable pulley's force advantage is the
  same constraint seen from the force side.
- *Far*: `phys.mech.generalized-coordinates` — constraints remove coordinates.
- *Real-world*: lifts and counterweights, cranes, cable cars, towing.
- *Expert transfer*: Lagrange multipliers for constraint forces.

## Cross-Subject Connections

- **Mathematics**: simultaneous linear equations; differentiating a length relation.
- **Engineering**: lift design with counterweights; block-and-tackle rigging.
- **Biology**: tendons running over joints act like strings over pulleys.
- **Technology**: belt drives and cable systems.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.mech.constraint-motion.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-03 under the coverage-driven KG extension
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §A item 6). `phys.mech.tension` covered
one pulley case only. The audit's second prerequisite,
`phys.mech.newtons-second-law`, is implied by tension's own chain and omitted
(KGCS P2).

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-03): Initial full-standard entry, written with the KG node under the coverage-driven extension.
