# Conductors, Shielding and Van de Graaff — `phys.em.conductors-electrostatics`

## Identity

- **Concept ID**: `phys.em.conductors-electrostatics`
- **Curriculum location**: physics / electricity and magnetism (electrostatics)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.em.electric-potential` — the load-bearing part is that charges move along
    the field and that, where there is no field, the potential does not change. Gauss's
    law (`phys.em.gauss-law`, in its chain) supplies E = σ/ε₀ just outside a surface.
- **Unlocks** (from KG): none listed. Leads to electrostatic shielding, capacitors with
  conductor plates, lightning protection and electrostatic machines.
- **Difficulty**: advanced · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: NCERT Physics Class 12 Ch. 2 (Electrostatic Potential and Capacitance); Halliday Resnick Ch. 23–24

## Learning Objective

After this concept, the learner can:

1. Explain why E = 0 inside a conductor in electrostatic equilibrium and why it is an
   equipotential.
2. Explain why excess charge lies on the outer surface, with E = σ/ε₀ perpendicular
   just outside.
3. Predict where charge crowds on a shaped conductor and why points discharge.
4. Apply shielding (Faraday cage) and explain the Van de Graaff generator.

## Core Understanding

A metal contains free electrons that move whenever there is an electric field. Put a conductor in a field, or give it extra charge, and the electrons drift — but only until their new arrangement produces a field that exactly cancels the original one inside the metal. When they stop, the conductor is in electrostatic equilibrium and the electric field everywhere inside the metal is zero. With no field inside, no work is done moving a charge from one point of the conductor to another, so the whole conductor — surface and interior — is at a single potential.

Excess charge on a conductor repels itself and spreads as far out as it can: it all ends up on the outer surface, and none stays in the interior. Just outside, the field must be perpendicular to the surface (a sideways part would push surface charges along, which is not equilibrium) and, by Gauss's law, its size is E = σ/ε₀, where σ is the charge per unit area; σ = 2.0 × 10⁻⁶ C/m² gives about 2.3 × 10⁵ V/m. Charge does not spread evenly over an irregular conductor: to keep the whole surface at one potential, σ must be largest where the surface curves most sharply. At a sharp point the field can become strong enough to ionise the air, letting charge leak away in a faint glow (corona discharge). A pointed lightning conductor, connected to earth, uses this: it gives a safe path to the ground.

Because the field inside a closed conducting shell is zero, the space it encloses is shielded from outside fields — a Faraday cage. People inside a car struck by lightning are protected because the charge flows over the outer metal body to the ground; the tyres have nothing to do with it. A metal lift or a mesh cage blocks phone and radio signals for the same reason. The Van de Graaff generator relies on the same rule: a moving belt carries charge up inside a hollow metal dome, and charge delivered to the inside moves straight to the outer surface, leaving the inside able to receive more, so the dome can be charged to hundreds of thousands of volts.

## Mental Models

- **Beginner (arriving)**: a charged metal is "full of charge" with a field
  everywhere; rubber tyres protect cars.
- **Intermediate**: free electrons rearrange until E = 0 inside; charge on the outer
  surface; E = σ/ε₀ just outside, perpendicular; charge crowds at points; closed shells
  shield.
- **Advanced**: a cavity with no charge inside has E = 0 regardless of outside
  charges; charge placed in a cavity induces −q on the cavity wall and +q outside;
  method of images.
- **Expert**: shielding of time-varying fields depends on skin depth and mesh size;
  electrostatic precipitators; high-voltage engineering of corona losses.
- **Versioning note**: install the intermediate model; mention the induced charges
  on a cavity wall as the advanced step.

## Why Students Fail

Learners associate "charged" with "field everywhere" and never ask what the free
electrons would do. Symmetric sphere examples suggest uniform charge on every shape.
And folklore credits the tyres for car safety, blocking the Faraday-cage idea.

## Misconceptions

**M1 — A charged conductor has a strong field inside it**
- *Why*: charge pictured as filling the object (type 2, ontological).
- *Symptom / phrases*: "the field is strongest at the centre".
- *Detection probe (verbatim)*: "A hollow metal sphere is given a large positive
  charge. What is the electric field at a point inside the metal or inside the
  hollow?"
- *Recovery*: "if there were a field, what would the free electrons do?"
- *Verification*: three field-location items.

**M2 — Charge spreads evenly over any conductor**
- *Why*: sphere examples generalised (type 4).
- *Symptom*: equal charge density on a pear-shaped object.
- *Detection probe*: "A pear-shaped metal object is charged. Is the charge spread
  evenly, or concentrated somewhere?"
- *Recovery*: one potential everywhere needs more σ at sharp curvature; lightning
  conductors.
- *Verification*: rank σ at three points of a shaped conductor.

**M3 — Rubber tyres protect people in a car from lightning**
- *Why*: insulators associated with safety (type 4, folklore).
- *Symptom*: "the tyres insulate the car".
- *Detection probe*: "Why are people inside a car usually safe when lightning
  strikes it?"
- *Recovery*: lightning crosses kilometres of air — a few centimetres of rubber
  cannot stop it; the metal shell carries the charge round the outside.
- *Verification*: two shielding scenarios (lift, convertible car).

## Analogies

- **Best analogy**: people in a crowded room spreading out to the walls to get as far
  from each other as possible — the excess charge ends up on the surface.
  *Breaking point*: people choose; charges are pushed by forces, and the result is
  exactly E = 0 inside.
- **Alternative**: water finding its own level — the conductor's charges settle until
  there is no "slope" (field) inside.
  *Breaking point*: illustrative only.
- **Anti-analogy to avoid**: "the conductor is a container filled with charge." It
  installs M1.

## Demonstrations

- **Home**: wrap a phone in kitchen foil and call it — the call fails or weakens.
- **Teacher demo**: a Van de Graaff with paper strips inside and outside a metal
  cage; the inside strips stay limp. Corona from a pointed rod.
- **Prediction before demo**: "will the strips inside the cage rise?"

## Discovery Questions

**Structure**:
1. *Need*: "Why is a car a safe place in a thunderstorm?"
2. *Discovery*: the foil-wrapped phone; strips inside a cage.
3. *Direct instruction*: E = 0 inside, surface charge, σ/ε₀, sharp points.
4. *Apply*: lightning conductors, lifts, the Van de Graaff.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): the car in lightning.
2. **Worked examples** (high fit): σ = 2.0 × 10⁻⁶ C/m² → 2.3 × 10⁵ V/m; the charged
   sphere touched inside a hollow conductor.
3. **Error exposure** (high fit for M1/M2): the free-electron argument; the pointed
   conductor.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) E just outside: 2.0e-6 / 8.85e-12 ≈ 2.3 × 10⁵ V/m.
   (b) Charged sphere touched inside a hollow conductor: all its charge moves to the
       outer surface.
   (c) Centre-to-surface potential difference of a charged sphere: zero.

2. **ERROR-ANALYSIS** — a student says the field inside is strongest. Ask what the
   electrons would do.

3. **PREDICTION-BEFORE-DEMO** — before charging the cage, ask whether the inside
   strips will rise.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "field inside a conductor" → "E just outside for a given σ" → "why pointed
   lightning conductors?"

## Voice Teaching Notes

*How it sounds when taught well*: the tutor always asks "what would the free electrons
do?"; says "zero inside, perpendicular outside"; never credits the tyres.

*Load-bearing sentence to slow down on*: "The electrons keep moving until the field
inside is gone — that is what equilibrium means for a conductor."

*What to listen for*: "strong field inside" → M1; "spread evenly" → M2; "the tyres"
→ M3.

## Assessment Signals

**Diagnostic — golden probe**: "A hollow metal sphere is charged. Field inside?"
Correct: zero — the free electrons rearrange until it is cancelled.

**Distractor-mapped items**:
- "Field inside a charged hollow metal sphere?" Options: zero, strongest at the
  centre, same as just outside, half the outside value. Answer: zero. "Strongest at
  the centre" targets M1.
- "Where is charge densest on a pear-shaped conductor?" Options: the pointed end, the
  rounded end, evenly everywhere, inside the metal. Answer: the pointed end. "Evenly"
  targets M2.

**Guided practice → independent practice fading ladder**:
1. Field inside / outside (3 items).
2. E = σ/ε₀ calculations (3 items).
3. Charge distribution on shapes (3 items).
4. Shielding scenarios (2 items).
5. (Unscaffolded) design a shield for given equipment.

**Mastery gate set** (per assessment/05):
- *Production*: one E = σ/ε₀ calculation and one charge-transfer prediction.
- *New surface*: the Van de Graaff dome.
- *Mixed*: shielding items interleaved with charge-distribution items.
- *Delayed*: one-week check — the car in lightning.

**Calibration note**: learners recite "E = 0 inside"; the check that reveals
miscalibration is the pear-shaped conductor or the car question.

## Tutor Recovery Strategy

*Likeliest utterance*: "it's full of charge, so the field inside is big" (M1).

*Concept-specific smaller question*: "If there were a field inside the metal, would
its free electrons sit still?"

*M2 recovery*: "Why are lightning conductors pointed rather than round?"

## Memory Hooks

- **Concept type**: principle (equilibrium of free charge) + application (shielding).
- **Review form** (per Delivery 2 §8): the three rules (E = 0 inside, charge outside,
  σ/ε₀) as spaced retrieval; scenarios as distributed practice.
- **Automaticity target**: "zero inside, charge on the outside, crowds at points".
- **Interleaving partners**: `phys.em.gauss-law`, `phys.em.electric-potential`,
  `phys.em.capacitance`.

## Transfer Connections

- *Near*: `phys.em.gauss-law` — E = σ/ε₀ just outside.
- *Near*: `phys.em.capacitance` — conductor plates at uniform potentials.
- *Far*: electromagnetic shielding of electronics and cables.
- *Real-world*: lightning conductors, cars and aircraft in lightning, microwave-oven
  door mesh, Van de Graaff generators, MRI rooms.
- *Expert transfer*: electrostatic precipitators; corona losses on power lines.

## Cross-Subject Connections

- **Chemistry**: metallic bonding — the sea of free electrons.
- **Technology**: shielded cables, Faraday bags, screened rooms.
- **Earth science**: lightning and thunderstorm charge separation.
- **Mathematics**: surface integrals in Gauss's law; curvature.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.em.conductors-electrostatics.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-03 under the coverage-driven KG extension
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §A item 23). The audit listed
`phys.em.gauss-law` and `phys.em.electric-potential` as prerequisites; only
`phys.em.electric-potential` is kept, because it already requires `phys.em.gauss-law`
(KGCS P2, transitive reduction). Conductors in electrostatics were not taught by any
node before this one.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-03): Initial full-standard entry, written with the KG node under the coverage-driven extension.
