# Radiation from Accelerating Charges and Radiation Pressure — `phys.em.radiation-and-antennas`

## Identity

- **Concept ID**: `phys.em.radiation-and-antennas`
- **Curriculum location**: physics / electricity and magnetism (electromagnetic radiation)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.em.electromagnetic-waves` — the load-bearing part is that an EM wave is a
    travelling disturbance of linked E and B fields moving at c.
  - `phys.mech.momentum` — the load-bearing part is that force equals the rate of change
    of momentum, and that reversing a momentum doubles the change.
- **Unlocks** (from KG): none listed. Leads to antenna design, synchrotron radiation and
  solar sailing.
- **Difficulty**: expert · **Bloom**: apply · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: Halliday Resnick Ch. 33; Griffiths, Introduction to Electrodynamics Ch. 11

## Learning Objective

After this concept, the learner can:

1. State that only accelerating charges radiate, and apply it to DC, AC, circular motion
   and braking.
2. Describe a dipole antenna's radiation pattern and polarisation, and size a half-wave
   dipole.
3. Use p = E/c to compute radiation pressure on absorbing and reflecting surfaces.
4. Estimate the force on a solar sail.

## Core Understanding

Every electric charge has a field. If the charge sits still, the field is static. If it moves at constant velocity, the field simply travels along with it — nothing ripples outward. But if the charge accelerates, the field lines far away cannot know about the change at once: a kink forms in them and travels outward at the speed of light. That travelling kink is electromagnetic radiation. So only accelerating charges radiate. A wire carrying a steady direct current does not broadcast radio waves; an antenna driven by an alternating current, whose charges surge back and forth, does. So do electrons moving in circles (synchrotron radiation) and electrons braking sharply in an X-ray tube's target (bremsstrahlung).

In a dipole antenna — a straight rod fed at its centre — charges oscillate along the rod. Seen from the side, that up-and-down acceleration is fully visible, and the antenna radiates strongly broadside. Seen from the end, along the rod, there is no sideways acceleration at all, and nothing is radiated in that direction: the pattern is doughnut-shaped. The wave's electric field is parallel to the rod, so a vertical antenna sends out vertically polarised waves and receives them best when it is also vertical. A half-wave dipole is λ/2 long: 1.5 m for 100 MHz.

Electromagnetic waves carry momentum as well as energy, p = E/c, even though photons have no mass (p = mv is only the special case for slow, massive objects). When light is absorbed, its momentum passes to the surface, giving a radiation pressure equal to I/c, where I is the intensity. When light is reflected, its momentum reverses, so the surface receives twice as much: 2I/c. Sunlight at Earth has I ≈ 1361 W/m², so it presses on a black surface with about 4.5 μPa and on a mirror with about 9.1 μPa. A reflecting solar sail 100 m × 100 m feels about 0.09 N — tiny, but it never stops and needs no fuel. Radiation pressure also pushes comet dust into tails that always point away from the Sun.

## Mental Models

- **Beginner (arriving)**: moving charges radiate; light has no mass so it cannot push.
- **Intermediate**: only acceleration radiates; dipole pattern (broadside max, axial
  zero), polarisation along the rod; p = E/c; I/c absorbed, 2I/c reflected.
- **Advanced**: Larmor formula P = q²a²/(6πε₀c³); sin²θ dipole pattern; Poynting
  vector.
- **Expert**: retarded potentials; antenna arrays and beam steering; radiation reaction.
- **Versioning note**: install the intermediate model; name the Larmor formula as the
  quantitative version.

## Why Students Fail

Currents and radiation are both "electricity moving", so the distinction between steady
and accelerated motion is missed. Momentum is learned only as mv. And antenna patterns
are three-dimensional.

## Misconceptions

**M1 — Any moving charge, including a steady current, radiates**
- *Why*: motion equated with radiation (type 5).
- *Symptom / phrases*: "the battery wire sends out radio waves".
- *Detection probe (verbatim)*: "What has to happen to electric charges for them to
  send out radio waves?"
- *Recovery*: torch wires and a radio; the rope that only sends a wave when jerked.
- *Verification*: classify four charge motions.

**M2 — Light can't push anything because it has no mass**
- *Why*: momentum known only as mv (type 5).
- *Symptom*: "photons are massless, so no force".
- *Detection probe*: "Can sunlight push a spacecraft's sail even though photons have no
  mass?"
- *Recovery*: comet tails; IKAROS; p = E/c.
- *Verification*: two radiation-pressure calculations.

**M3 — A dipole radiates equally in all directions**
- *Why*: "antennas broadcast everywhere" (type 4).
- *Symptom*: expects signal straight above a vertical mast.
- *Detection probe*: "A vertical dipole antenna: in which direction does it radiate
  least?"
- *Recovery*: viewed end-on, no sideways acceleration is seen.
- *Verification*: sketch the doughnut pattern.

## Analogies

- **Best analogy**: a rope — pull it steadily and nothing travels along it; jerk the end
  and a kink races away.
  *Breaking point*: a rope wave is mechanical and needs the rope; EM kinks need no
  medium.
- **Alternative**: tennis balls bouncing off a wall push it twice as hard as balls that
  stick (mirror vs black sail).
  *Breaking point*: photons have no mass, but carry momentum E/c.
- **Anti-analogy to avoid**: "light is massless, like nothing." It installs M2.

## Demonstrations

- **Home**: rotate a portable radio's telescopic antenna and listen for changes.
- **Teacher demo**: a microwave transmitter and a receiving dipole rotated through 90°
  (polarisation); a Crookes radiometer (noting it turns mainly by thermal effects, not
  radiation pressure).
- **Prediction before demo**: "turn the receiver 90° — what happens to the signal?"

## Discovery Questions

**Structure**:
1. *Need*: "What actually makes an antenna send out waves?"
2. *Discovery*: DC wire vs AC antenna; polarisation.
3. *Direct instruction*: acceleration rule, dipole pattern, p = E/c.
4. *Apply*: solar sails, comet tails, X-ray tubes.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): the whip antenna and the solar sail.
2. **Worked examples** (high fit): 1.5 m dipole; 4.5 and 9.1 μPa; 0.09 N.
3. **Error exposure** (high fit for M1/M2): the torch wires; comet tails.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) 100 MHz: λ = 3 m; half-wave dipole 1.5 m.
   (b) I/c = 1361 / 3 × 10⁸ ≈ 4.5 μPa; mirror 2I/c ≈ 9.1 μPa.
   (c) Sail 10⁴ m² × 9.1 μPa ≈ 0.091 N.

2. **ERROR-ANALYSIS** — a student says DC wires radiate. Ask about the torch and the
   radio.

3. **PREDICTION-BEFORE-DEMO** — before rotating the receiver, ask what happens.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "what makes charges radiate?" → "half-wave dipole for 300 MHz" → "radiation pressure
   of 1000 W/m² on a mirror".

## Voice Teaching Notes

*How it sounds when taught well*: the tutor says "accelerating" rather than "moving";
draws the dipole end-on and side-on; says "momentum E over c" before pressure.

*Load-bearing sentence to slow down on*: "Steady motion carries the field along; only a
change in motion sends a wave outward."

*What to listen for*: "moving charges radiate" → M1; "massless can't push" → M2;
"equal in all directions" → M3.

## Assessment Signals

**Diagnostic — golden probe**: "Steady 2 A DC wire — does it radiate?" Correct: no.

**Distractor-mapped items**:
- "Radiation pressure of sunlight on a mirror?" Options: ≈ 9.1 μPa; ≈ 4.5 μPa; zero;
  ≈ 1361 Pa. Answer: ≈ 9.1 μPa. "Zero" targets M2.
- "Least radiation from a vertical dipole?" Options: straight up/down; horizontally;
  equal everywhere. Answer: straight up/down.

**Guided practice → independent practice fading ladder**:
1. Which motions radiate (3 items).
2. Dipole length and pattern (3 items).
3. Radiation pressure (3 items).
4. Sail forces (2 items).
5. (Unscaffolded) design a receiving antenna.

**Mastery gate set** (per assessment/05):
- *Production*: one dipole length and one radiation-pressure calculation.
- *New surface*: X-ray tubes.
- *Mixed*: radiation-rule items interleaved with momentum items.
- *Delayed*: one-week check — DC vs AC radiation.

**Calibration note**: learners recite "accelerating charges radiate"; the check that
reveals miscalibration is the steady-current question.

## Tutor Recovery Strategy

*Likeliest utterance*: "the current moves, so it sends out waves" (M1).

*Concept-specific smaller question*: "Does your radio pick up the torch?"

*M2 recovery*: "Why do comet tails point away from the Sun?"

## Memory Hooks

- **Concept type**: principle (acceleration radiates) + law (p = E/c).
- **Review form** (per Delivery 2 §8): the rule and the factor 2 as spaced retrieval;
  calculations as distributed practice.
- **Automaticity target**: "only acceleration radiates; dipole: broadside max, axial
  zero; I/c absorbed, 2I/c reflected".
- **Interleaving partners**: `phys.em.electromagnetic-waves`, `phys.mech.momentum`,
  `phys.em.communication-systems`.

## Transfer Connections

- *Near*: `phys.em.communication-systems` — antennas in broadcasting.
- *Near*: `phys.mod.x-rays` — bremsstrahlung.
- *Far*: synchrotron light sources; pulsars.
- *Real-world*: TV aerials, Wi-Fi routers, solar sails, optical tweezers.
- *Expert transfer*: radiation reaction and the classical electron.

## Cross-Subject Connections

- **Astronomy**: comet tails, stellar radiation pressure.
- **Engineering**: antenna design, phased arrays.
- **Biology**: optical tweezers manipulating cells.
- **Mathematics**: vectors and solid angles.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.em.radiation-and-antennas.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-04 under the coverage-driven KG extension, advanced tier
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §B item 40). The audit listed
`phys.em.electromagnetic-waves`; `phys.mech.momentum` is added because radiation pressure
needs it and it is not in the EM-wave chain (KGCS P1).

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-04): Initial full-standard entry, written with the KG node under the coverage-driven extension (advanced tier).
