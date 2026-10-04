# Nuclear Model of the Atom and Alpha Scattering — `phys.mod.atomic-models`

## Identity

- **Concept ID**: `phys.mod.atomic-models`
- **Curriculum location**: physics / modern physics (atomic structure)
- **Prerequisites** (from KG `requires`, with the load-bearing part):
  - `phys.em.coulombs-law` — the load-bearing part is that like charges repel with a
    force ∝ q₁q₂/r², so a concentrated charge pushes far harder at close range than
    the same charge spread out; and the electric potential energy kq₁q₂/r used for
    the distance of closest approach.
- **Unlocks** (from KG): `phys.mod.bohr-model`, `phys.mod.nucleus-size-and-force`.
- **Difficulty**: proficient · **Bloom**: understand · **Mastery threshold**: 0.75 ·
  **Est. hours**: 2 · **References**: NCERT Physics Class 12 Ch. 12 (Atoms)

## Learning Objective

After this concept, the learner can:

1. Describe the alpha-scattering experiment and its observations.
2. Explain why Thomson's model could not produce large-angle scattering.
3. State Rutherford's nuclear model and the relative sizes of atom and nucleus.
4. Compute the distance of closest approach as an upper limit on nuclear size.

## Core Understanding

Around 1900 the atom was pictured, following J. J. Thomson, as a sphere of positive charge with electrons embedded in it, like plums in a pudding. In 1909 Geiger and Marsden, working with Rutherford, fired fast alpha particles (helium nuclei, charge +2e) at gold foil only a few hundred atoms thick and counted where they went with a zinc-sulfide screen that flashed when hit. Almost all the alpha particles went straight through or were deflected by a degree or two. But about 1 in 8000 was turned through more than 90°, and a few came almost straight back. Rutherford called it "as if you fired a 15-inch shell at a piece of tissue paper and it came back and hit you."

Thomson's model cannot do this. Its positive charge is spread through the whole atom, so its electric field is weak everywhere, and the electrons are far too light to stop an alpha particle. A fast alpha could only be nudged by a tiny angle. Rutherford concluded that all the atom's positive charge and nearly all its mass are concentrated in a tiny central nucleus. Then most alpha particles pass through the mostly empty atom far from any nucleus and are barely deflected, while the rare one that heads almost straight at a nucleus meets an enormous repulsive force at close range and is turned back. Both observations matter: the many that pass through show the atom is mostly empty; the few that bounce back show the nucleus is small, massive and highly charged. The nucleus is about 10⁻¹⁵ to 10⁻¹⁴ m across in an atom about 10⁻¹⁰ m across — a marble at the centre of a football stadium.

Coulomb's law gives a size limit. An alpha particle heading straight for a nucleus slows down as it approaches, stops where all its kinetic energy has turned into electric potential energy, and turns back: K = k(2e)(Ze)/r₀. For a 7.7 MeV alpha particle and gold (Z = 79), r₀ ≈ 3.0 × 10⁻¹⁴ m. Since the alpha never touched the nucleus, the nucleus must be smaller than that. The nuclear model also left a puzzle: an electron orbiting a nucleus is accelerating and, by classical physics, should radiate energy and spiral inwards — the problem Bohr's model set out to solve.

## Mental Models

- **Beginner (arriving)**: atoms are tiny solid balls.
- **Intermediate**: Thomson's spread-out charge vs Rutherford's nucleus; most pass
  through, a few bounce back; nucleus ~10⁻¹⁴ m in an atom ~10⁻¹⁰ m; closest approach.
- **Advanced**: the Rutherford scattering formula, N(θ) ∝ 1/sin⁴(θ/2); impact
  parameter; hyperbolic orbits.
- **Expert**: deviations from Rutherford scattering at high energy reveal the nuclear
  force and nuclear size; deep inelastic scattering revealed quarks.
- **Versioning note**: install the intermediate model; mention the impact parameter
  as why scattering angle depends on how close the alpha passes.

## Why Students Fail

The story is often told as "alpha particles bounced off the nucleus", inverting the
statistics. Textbook diagrams draw the nucleus large so it can be seen. And the logic
— why each observation needs each feature — is skipped in favour of the conclusion.

## Misconceptions

**M1 — Most alpha particles bounced back off the nuclei**
- *Why*: the dramatic result remembered as the typical one (type 5).
- *Symptom / phrases*: "the alpha particles were reflected by the nucleus".
- *Detection probe (verbatim)*: "In Rutherford's experiment, what happened to MOST of
  the alpha particles fired at the gold foil?"
- *Recovery*: the actual counts — about 1 in 8000 beyond 90°.
- *Verification*: link each observation to a feature of the model.

**M2 — The nucleus takes up a large part of the atom**
- *Why*: diagrams drawn far from scale (type 4).
- *Symptom*: "the nucleus is about half the atom".
- *Detection probe*: "If an atom were the size of a football stadium, how big would
  its nucleus be?"
- *Recovery*: a large nucleus would deflect many alphas; the ratio 10⁻¹⁴ : 10⁻¹⁰.
- *Verification*: two scale comparisons.

**M3 — The electrons deflected the alpha particles**
- *Why*: electrons are the familiar part of the atom (type 2).
- *Symptom*: "the alphas hit electrons and bounced".
- *Detection probe*: "Could the electrons turn an alpha particle back?"
- *Recovery*: an alpha particle is about 7300 times heavier than an electron — like a
  bowling ball hitting a ping-pong ball.
- *Verification*: explain why only the nucleus can reverse an alpha.

## Analogies

- **Best analogy**: firing marbles under a board that hides a few small heavy pegs —
  most roll straight through; the rare one that hits a peg bounces back; from the
  bounce rate you can tell how small the pegs are.
  *Breaking point*: alpha particles are repelled from a distance, not by contact.
- **Alternative**: a marble in the middle of a football stadium for the nucleus in
  the atom.
  *Breaking point*: the atom's "edge" is the electron cloud, not a wall.
- **Anti-analogy to avoid**: "the nucleus is like the sun with planets close
  around" drawn to scale. It installs M2.

## Demonstrations

- **Home**: roll marbles at a hidden object under a board and map it from the
  deflections.
- **Teacher demo**: a simulation of alpha scattering with adjustable nuclear charge
  and alpha energy; or a hill-shaped surface (a 1/r potential) with rolling balls.
- **Prediction before demo**: "what fraction will come back?"

## Discovery Questions

**Structure**:
1. *Need*: "What is inside an atom, if we can't see it?"
2. *Discovery*: the predicted (Thomson) vs observed scattering counts.
3. *Direct instruction*: the nuclear model and the closest approach.
4. *Apply*: sizes, and the puzzle Bohr solved.

## Teaching Sequence

From the dispatch library (Delivery 2 §6):
1. **Concrete anchor** (primary): the hidden-object marble game.
2. **Worked examples** (high fit): closest approach 3.0 × 10⁻¹⁴ m for 7.7 MeV on
   gold.
3. **Error exposure** (high fit for M1/M2): the counts; the stadium scale.

## Tutor Actions

Priority dispatch (in order):

1. **WORKED-EXAMPLE** — three traces:
   (a) Thomson's prediction: small deflections only.
   (b) Observation: nearly all through; ~1 in 8000 beyond 90°.
   (c) r₀ = k(2e)(79e)/(7.7 MeV) ≈ 3.0 × 10⁻¹⁴ m.

2. **ERROR-ANALYSIS** — a student says most bounced back. Show the counts.

3. **PREDICTION-BEFORE-DEMO** — before the simulation, ask what fraction returns.

4. **RETRIEVAL-SCHEDULE-PROMPT** — next three sessions:
   "what did most alphas do?" → "why did Thomson's model fail?" → "closest approach
   for 5 MeV on gold".

## Voice Teaching Notes

*How it sounds when taught well*: the tutor pairs each observation with its
conclusion; says "most went straight through" first; gives the scale with the
stadium.

*Load-bearing sentence to slow down on*: "Most passing through says the atom is
mostly empty; the rare bounce-back says the nucleus is tiny, massive and charged."

*What to listen for*: "most bounced back" → M1; "the nucleus is big" → M2; "the
electrons deflected them" → M3.

## Assessment Signals

**Diagnostic — golden probe**: "What happened to MOST of the alpha particles?"
Correct: they went straight through or were barely deflected.

**Distractor-mapped items**:
- "Most alpha particles…" Options: passed straight through; bounced back; were
  absorbed; were deflected by about 45°. Answer: passed straight through. "Bounced
  back" targets M1.
- "Atom the size of a stadium — nucleus?" Options: a marble; the pitch; half the
  stadium; a car. Answer: a marble. "The pitch" targets M2.

**Guided practice → independent practice fading ladder**:
1. Observation ↔ conclusion matching (3 items).
2. Thomson vs Rutherford predictions (2 items).
3. Scale comparisons (2 items).
4. Closest-approach calculations (3 items).
5. (Unscaffolded) explain the experiment to someone who has never seen it.

**Mastery gate set** (per assessment/05):
- *Production*: one closest-approach calculation.
- *New surface*: a different foil (silver, Z = 47).
- *Mixed*: observation items interleaved with scale items.
- *Delayed*: one-week check — what most alphas did.

**Calibration note**: learners can say "Rutherford discovered the nucleus"; the
check that reveals miscalibration is "what did MOST of the alphas do?"

## Tutor Recovery Strategy

*Likeliest utterance*: "they bounced off the nucleus" (M1).

*Concept-specific smaller question*: "Out of 8000 alpha particles, how many came
back?"

*M2 recovery*: "If the nucleus were big, how often would alphas hit one?"

## Memory Hooks

- **Concept type**: experiment + model (evidence-to-conclusion reasoning).
- **Review form** (per Delivery 2 §8): the two observations and their conclusions as
  spaced retrieval.
- **Automaticity target**: "most through → empty; few back → tiny dense nucleus".
- **Interleaving partners**: `phys.em.coulombs-law`, `phys.mod.bohr-model`,
  `phys.mod.nucleus-size-and-force`.

## Transfer Connections

- *Near*: `phys.mod.bohr-model` — fixing the radiating-electron puzzle.
- *Near*: `phys.mod.nucleus-size-and-force` — what the nucleus is made of.
- *Far*: particle-physics scattering experiments (the Large Hadron Collider).
- *Real-world*: Rutherford backscattering spectrometry for analysing materials.
- *Expert transfer*: form factors and nuclear charge radii from electron scattering.

## Cross-Subject Connections

- **Chemistry**: atomic structure, atomic number, the periodic table.
- **History of science**: models revised by evidence.
- **Mathematics**: inverse-square laws; energy conservation.
- **Technology**: ion-beam analysis.

## Blueprint References

- **Blueprint**: `docs/curriculum/blueprints/phys.mod.atomic-models.md` (authoritative Learning Objective, Diagnostic Battery, Protocol Library, Misconception Engine, Assessment Battery — cite these sections by reference, never re-state them here)
- **Blueprint status**: PACKAGE_READY

## Runtime Asset References

The AssetIdentity pipeline (`src/lib/teaching/assets/`) manages the runtime-served explanation and probe assets for this concept. Authored seed assets are in `src/lib/teaching/assets/authoredSeedAssets.ts`. Once seeded and promoted to ACTIVE status, `assembleLesson()` serves them directly; the LLM acts as voice-renderer only.

- **Explanation assets**: core_explanation and misconception_repair at HIGH
- **Probe assets**: mcq, misconception_probe and short_answer, distractor-mapped to this entry's misconception IDs
- **Status**: authored in `authoredSeedAssets.ts`; seeding to production database by the cold-start bootstrap

## Curriculum Feedback

Added 2026-10-03 under the coverage-driven KG extension
(`docs/architecture/PHYSICS_KG_GAP_AUDIT.md` §A item 30). Per the audit,
`phys.mod.bohr-model` now requires this node; its former direct requirement on
`phys.em.coulombs-law` is dropped because it is reached through this node (KGCS P2,
transitive reduction). The name follows KG_CONCEPT_GRANULARITY_STANDARD (no
history-only node): the masterable content is the nuclear model and the scattering
evidence for it, with Thomson's model kept only as the hypothesis it refuted.
Rutherford and Thomson had zero hits in the physics corpus before this node.

---
*PACKAGE_READY. V-1 through V-20 PASS. AI Removal Test PASS.*
*Authored against KG node data confirmed at docs/physics/kg/graph.json.*

## Version History

- **v1.0** (2026-10-03): Initial full-standard entry, written with the KG node under the coverage-driven extension.
