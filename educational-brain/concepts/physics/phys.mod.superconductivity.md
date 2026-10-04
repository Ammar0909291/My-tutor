# Superconductivity — `phys.mod.superconductivity`

## Identity

- **Concept ID**: `phys.mod.superconductivity`
- **Curriculum location**: physics / modern physics (solid-state)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.em.resistivity` — the load-bearing part is that resistance comes from
    electrons scattering off lattice vibrations and impurities, falling as a metal cools.
  - `phys.em.magnetic-materials` — the load-bearing part is diamagnetism (being
    repelled by fields), which a superconductor shows perfectly.
  - `phys.mod.energy-bands` — the load-bearing part is an energy gap separating allowed
    states, which the superconducting gap resembles.
- **Unlocks** (from KG): none listed. Leads to quantum devices (SQUIDs, qubits) and
  applied superconductivity.
- **Difficulty**: expert · **Bloom**: understand · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: Halliday Resnick Ch. 41; Kittel, Introduction to Solid State Physics Ch. 10

## Learning Objective

After this concept, the learner can:

1. Describe zero resistance and the Meissner effect.
2. Explain why the Meissner effect makes superconductivity more than perfect
   conductivity.
3. Use the critical temperature, field and current, including B_c(T).
4. Explain the Cooper-pair picture qualitatively and name applications.

## Core Understanding

When most metals are cooled, their resistance falls smoothly and then levels off at a small value set by impurities. In 1911 Heike Kamerlingh Onnes found that mercury behaves differently: at 4.2 K its resistance drops abruptly to zero — not just very small, but zero to the limit of any measurement. Below a material's critical temperature T_c, a current started in a superconducting ring keeps flowing for years with no battery. Most superconductors need liquid helium, but some ceramic copper oxides such as YBCO superconduct below about 92 K, above the 77 K boiling point of cheap liquid nitrogen.

Zero resistance is only half the story. A superconductor also expels magnetic fields from its interior — the Meissner effect — becoming a perfect diamagnet, which is why a magnet can float above a cooled superconducting disc. This shows superconductivity is a distinct state of matter, not just perfect conduction. A merely perfect conductor would resist changes in field, so if it were cooled while sitting in a field it would trap that field inside. A superconductor cooled in a field instead pushes the field out as it passes T_c, whatever its history. The state has limits: it is destroyed above a critical magnetic field, B_c(T) ≈ B_c(0)[1 − (T/T_c)²], and above a critical current density. For lead, B_c(0) = 0.080 T and T_c = 7.2 K, so at 4.2 K the critical field is about 0.053 T. When a superconducting magnet exceeds its limits it "quenches": resistance returns and its large stored energy turns suddenly into heat.

In ordinary conductors, electrons are scattered by vibrating ions, which causes resistance. In conventional superconductors, explained by the BCS theory, an electron passing through the lattice pulls the positive ions slightly towards it, and that slight distortion attracts a second electron: the two form a Cooper pair. All the pairs settle into a single shared quantum state, separated from excited states by an energy gap. A small scattering cannot knock a pair out of this state — it would need at least the gap energy — so the current flows with no resistance at all. Heating above T_c supplies enough thermal energy to break the pairs. Superconductors run the magnets of MRI scanners (niobium–titanium wire at 4.2 K, fields of 1.5–3 T), maglev trains, particle accelerators, and SQUIDs, the most sensitive magnetic-field detectors known.

## Mental Models

- **Beginner (arriving)**: a superconductor is a very cold, very good wire.
- **Intermediate**: zero resistance + Meissner effect below T_c; distinct from perfect
  conductivity; critical field and current; Cooper pairs and an energy gap.
- **Advanced**: type I vs type II superconductors (vortices); London penetration depth;
  flux quantisation h/2e.
- **Expert**: BCS theory quantitatively; unconventional (cuprate) superconductivity;
  Josephson effect.
- **Versioning note**: install the intermediate model; mention type II
  superconductors as why MRI magnets can reach several teslas.

## Why Students Fail

Resistance is pictured as a continuum, so "zero" sounds like "very small". Levitation
is attributed to induction or to the cold. And the quantum explanation is abstract, so
it is either skipped or memorised without meaning.

## Misconceptions

**M1 — A superconductor is just an extremely good conductor**
- *Why*: continuum picture of conduction (type 5).
- *Symptom / phrases*: "it's like copper, only better".
- *Detection probe (verbatim)*: "Why does a magnet float above a superconductor but not
  above an extremely good conductor like ultra-pure copper?"
- *Recovery*: cooling in a field — the field is expelled, not trapped.
- *Verification*: contrast the two in three situations.

**M2 — A superconductor stays superconducting in any field or current**
- *Why*: no limits pictured (type 5).
- *Symptom*: "an MRI coil can carry any current".
- *Detection probe*: "An MRI's superconducting coil is pushed to a much higher current
  and field. Does it stay superconducting?"
- *Recovery*: critical field and current; quenches.
- *Verification*: compute B_c at two temperatures.

**M3 — The magnet floats because the superconductor is cold**
- *Why*: cold is the salient condition (type 4).
- *Symptom*: "cold things repel magnets".
- *Detection probe*: "Would a magnet float above a cold block of copper at 77 K?"
- *Recovery*: only field expulsion (Meissner) lifts it.
- *Verification*: explain the levitation in terms of field lines.

## Analogies

- **Best analogy**: dancers in a perfectly synchronised line — a single bump cannot
  break the formation, so it glides on unhindered (Cooper pairs in one shared state).
  *Breaking point*: the "formation" is quantum, not literal choreography.
- **Alternative**: ice vs very cold water — a new phase, not just "more" of the old one.
  *Breaking point*: phase transitions differ in detail.
- **Anti-analogy to avoid**: "a superconductor is copper with the resistance turned
  down." It installs M1.

## Demonstrations

- **Home**: watch videos of quantum levitation (flux pinning) tracks.
- **Teacher demo**: a YBCO disc in liquid nitrogen with a small neodymium magnet;
  warm it and watch the magnet settle as it passes T_c.
- **Prediction before demo**: "as the disc warms up, what will the magnet do?"

## Discovery Questions

**Structure**:
1. *Need*: "Why does a magnet float above this cold disc?"
2. *Discovery*: the resistance graph; the levitation.
3. *Direct instruction*: Meissner effect, critical limits, Cooper pairs.
4. *Apply*: MRI, maglev, SQUIDs.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): the floating magnet.
2. **Worked examples** (high fit): T_c values; B_c(4.2 K) for lead ≈ 0.053 T.
3. **Error exposure** (high fit for M1/M2): cooled-in-field expulsion; quenches.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) Mercury T_c = 4.2 K; YBCO T_c ≈ 92 K > 77 K (liquid nitrogen).
   (b) B_c(4.2 K) = 0.080 × (1 − (4.2/7.2)²) ≈ 0.053 T for lead.
   (c) Perfect conductor cooled in a field traps it; superconductor expels it.

2. **ERROR-ANALYSIS** — a student calls it a very good conductor. Show the cooled-in-field
   contrast.

3. **PREDICTION-BEFORE-DEMO** — before the disc warms, ask what the magnet will do.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "two defining properties" → "the Meissner effect" → "B_c of lead at 6 K".

## Voice Teaching Notes

*How it sounds when taught well*: the tutor always pairs "zero resistance" with "field
expulsion"; says "a new phase of matter"; names the limits whenever applications come
up.

*Load-bearing sentence to slow down on*: "A perfect conductor would trap a field; a
superconductor throws it out."

*What to listen for*: "just a better conductor" → M1; "any field" → M2; "because it's
cold" → M3.

## Assessment Signals

**Diagnostic — golden probe**: "Why does a magnet float above a superconductor but not
ultra-pure copper?" Correct: the Meissner effect.

**Distractor-mapped items**:
- "B_c of lead at 4.2 K?" Options: ≈ 0.053 T; 0.080 T; ≈ 0.027 T; zero. Answer:
  ≈ 0.053 T.
- "Superconductor vs perfect conductor cooled in a field?" Options: superconductor
  expels it, perfect conductor traps it; both expel it; both trap it. Answer: the first.
  "Both" answers target M1.

**Guided practice → independent practice fading ladder**:
1. Properties (3 items).
2. Meissner vs perfect conduction (2 items).
3. Critical field calculations (3 items).
4. Microscopic picture and applications (2 items).
5. (Unscaffolded) design a test for superconductivity.

**Mastery gate set** (per assessment/05):
- *Production*: one B_c calculation.
- *New surface*: MRI quench.
- *Mixed*: property items interleaved with explanation items.
- *Delayed*: one-week check — the Meissner effect.

**Calibration note**: learners recite "zero resistance"; the check that reveals
miscalibration is the perfect-conductor comparison.

## Tutor Recovery Strategy

*Likeliest utterance*: "it's just a perfect conductor" (M1).

*Concept-specific smaller question*: "If you cool it while a magnet sits on it, does the
magnet stay put or rise?"

*M2 recovery*: "Is there a field strong enough that expelling it costs too much?"

## Memory Hooks

- **Concept type**: phenomenon (superconducting phase) + model (Cooper pairs).
- **Review form** (per Delivery 2 §8): the two properties and the limits as spaced
  retrieval; B_c calculations as distributed practice.
- **Automaticity target**: "R = 0 and B expelled below T_c; limits B_c and J_c; pairs
  with a gap".
- **Interleaving partners**: `phys.em.resistivity`, `phys.em.magnetic-materials`,
  `phys.mod.energy-bands`.

## Transfer Connections

- *Near*: `phys.em.magnetic-materials` — perfect diamagnetism.
- *Near*: `phys.mod.energy-bands` — gaps in the energy spectrum.
- *Far*: superfluid helium; Bose–Einstein condensates.
- *Real-world*: MRI, maglev, particle accelerators, SQUIDs, quantum computers.
- *Expert transfer*: Josephson junctions and voltage standards.

## Cross-Subject Connections

- **Chemistry**: cuprate ceramics and materials synthesis.
- **Medicine**: MRI magnets.
- **Engineering**: power cables, fault-current limiters.
- **History of science**: Onnes 1911; BCS 1957; high-T_c 1986.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.mod.superconductivity.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-04 under the coverage-driven KG extension, advanced tier
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §B item 38). The audit listed
`phys.em.magnetic-materials` and `phys.mod.energy-bands`; `phys.em.resistivity` is added
because zero resistance is the defining property and resistivity is in neither chain
(KGCS P1).

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-04): Initial full-standard entry, written with the KG node under the coverage-driven extension (advanced tier).
