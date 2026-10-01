# Mitochondria and Energy Organelles — `bio.cell.mitochondria-energy`

## Identity

- **Concept ID**: `bio.cell.mitochondria-energy` (canonical biology KG)
- **Curriculum location**: biology / cell biology (`bio.cell`)
- **Prerequisites**: `bio.cell.eukaryotic-cell` — the load-bearing part
  is that mitochondria are one of the compartmentalised organelles
  eukaryotic cells possess; this concept is a detailed zoom into that
  one organelle's structure and its semi-autonomous, evolutionarily
  distinctive nature.
- **Unlocks** (from KG): `bio.plant.plant-respiration`,
  `bio.div.endosymbiotic-theory` — mitochondrial structure and function
  are the direct prerequisite for reasoning about respiration in plant
  cells specifically, and this concept's endosymbiotic evidence is the
  worked example the dedicated endosymbiotic-theory concept builds on.
- **Difficulty**: proficient · **Bloom**: understand · **Mastery
  threshold**: 0.75 · **Est. hours**: 3

## Learning Objective

The learner can: describe mitochondrial structure (double membrane,
cristae-folded inner membrane, matrix) and locate the Krebs cycle
(matrix) and the electron transport chain plus ATP synthase (inner
membrane/cristae) correctly within it; explain that mitochondria
TRANSFORM chemical energy already present in glucose into ATP rather
than creating energy from nothing; and state the three lines of
evidence for the endosymbiotic theory (own circular DNA, 70S ribosomes,
binary fission) and what those lines of evidence together imply about
mitochondria's evolutionary origin.

## Core Understanding

Mitochondria have a double membrane: a smooth outer membrane and an
inner membrane extensively folded into cristae, which greatly increases
the surface area available for ATP synthesis. The matrix — the fluid
interior enclosed by the inner membrane — contains the enzymes that
carry out the Krebs cycle and also holds the mitochondrion's own
circular DNA. The inner membrane itself (including its cristae folds)
houses the electron transport chain and ATP synthase, making it the
actual site of the bulk of ATP production, distinct from the matrix
where the Krebs cycle's own reactions occur. Mitochondria are
semi-autonomous organelles: unlike most organelles, they carry their own
circular DNA (structurally resembling bacterial DNA, not the
cell's linear nuclear chromosomes), their own 70S ribosomes (matching
bacterial ribosome size, not the cytoplasm's eukaryotic 80S ribosomes),
and they divide independently of the cell cycle by binary fission — the
same division mechanism bacteria use. Together, these three lines of
evidence support the endosymbiotic theory: mitochondria descended from
free-living alpha-proteobacteria engulfed by an ancestral host cell
roughly 1.5 billion years ago, which over evolutionary time became a
permanent, mutually dependent internal partner rather than free
bacteria. Functionally, mitochondria never create energy — energy
cannot be created, only transformed (first law of thermodynamics);
mitochondria transform the chemical potential energy already stored in
glucose and other fuel molecules into ATP, a form of chemical energy the
rest of the cell can directly and immediately use.

## Mental Models

- **Beginner model — "the mitochondrion is the cell's battery, it makes
  energy"**: a common, simplified shorthand ("powerhouse of the cell")
  that quietly implies energy creation rather than transformation.
- **Intermediate model — "mitochondria generate energy from ADP and
  phosphate"**: the direct substrate of this concept's central
  misconception — treating ATP synthesis as energy manufacture rather
  than as capturing energy that was already present in glucose's
  chemical bonds. Upgrade trigger: tracing the energy's origin backward
  — glucose's chemical energy originally came from sunlight, captured by
  photosynthesis — showing every step in the chain is a transformation,
  never a creation.
- **Advanced model — "structure maps to function inside the
  mitochondrion"**: the learner can correctly locate a named process
  (Krebs cycle vs. electron transport chain vs. ATP synthase) to its
  specific mitochondrial compartment (matrix vs. inner membrane/cristae)
  rather than treating "the mitochondrion" as one undifferentiated
  energy-producing blob.
- **Expert model — "mitochondria as an evolutionarily distinct, formerly
  independent organism now integrated into the cell"**: the learner
  reasons from mitochondria's bacterial-resembling features (DNA shape,
  ribosome size, division mechanism) to a full endosymbiotic origin
  story, and recognises this as a genuine evolutionary claim supported
  by converging structural evidence, not a metaphor.
- **Do not upgrade early**: a learner still describing mitochondria as
  energy-CREATING should not be advanced to the endosymbiotic-theory
  evidence discussion — the transformation-vs-creation distinction is a
  thermodynamic correctness issue that will otherwise resurface and
  distort how "mitochondria transform bacterial DNA into their own"
  claims (an actual misstatement risk) get evaluated later.

## Why Students Fail

The popular shorthand "powerhouse of the cell" — while a genuinely
useful reminder of WHERE most cellular ATP is made — uses "power" and
"house" language that easily slides into "the mitochondrion generates/
produces/makes energy," a phrasing that, taken literally, violates the
first law of thermodynamics; because the shorthand is memorable and
near-universal in introductory teaching, the imprecise "makes energy"
framing settles in before the more precise "transforms energy already
present in glucose" framing is ever explicitly contrasted against it.

## Misconceptions

No Blueprint exists yet for this concept; both misconceptions
classified directly against the concept's own seed content using the
birth-taxonomy diagnostic procedure
(`../../misconceptions/01-birth-taxonomy.md`).

- **M1 — "Mitochondria create energy" (Type 3, language contamination)**:
  born from the "powerhouse of the cell" shorthand's everyday
  connotations of production/generation/manufacture, imported wholesale
  into a biological process that is actually a chemical energy
  TRANSFORMATION, not creation. Matches Type 3's signature: the
  misconception tracks a specific popular phrase's everyday meaning, not
  a reasoning error about mitochondrial biology itself. Characteristic
  phrase: "mitochondria make/create/generate energy" stated as a literal
  claim rather than shorthand. Verbatim detection probe (seed corpus,
  `misconception_probe`): "Do mitochondria create energy?" Recovery
  path: trace the energy backward explicitly — glucose's chemical energy
  originated as sunlight, captured by photosynthesis, stored in glucose,
  and mitochondria merely release and recapture it as ATP — anchored to
  the first law of thermodynamics (energy cannot be created or
  destroyed, only transformed). Verification-of-death: the learner
  spontaneously corrects "makes energy" to "transforms/converts energy"
  when using the "powerhouse" shorthand themselves.
- **M2 — "The Krebs cycle occurs on the inner membrane / in the cristae"
  (Type 4, notation-induced)**: born from cristae (the inner membrane's
  folded structure) and the electron transport chain both being taught
  in close proximity to the Krebs cycle, on the same mitochondrion
  diagram, leading to compartment mislabelling — assigning a
  matrix-located process to the visually more prominent, textbook-
  emphasised cristae/inner-membrane structure instead. Matches Type 4's
  signature: confusion driven by co-located diagram labels, not a
  conceptual misunderstanding of respiration itself. Characteristic
  phrase: locating the Krebs cycle "on" or "in" the inner membrane/
  cristae rather than "in" the matrix. Verbatim detection probe (seed
  corpus, `mcq`): "In which compartment of the mitochondrion does the
  Krebs cycle occur?" (inner membrane is the flagged wrong choice).
  Recovery path: contrast the two compartments' distinct jobs explicitly
  — matrix: Krebs cycle enzymes float freely in solution; inner
  membrane/cristae: embedded electron transport chain proteins and ATP
  synthase, a fundamentally different (membrane-embedded, not
  free-floating) kind of biochemistry. Verification-of-death: the
  learner correctly labels both processes on an unlabelled mitochondrion
  cross-section diagram.

## Analogies

- **Best analogy — a hydroelectric dam converting a river's existing
  potential energy into electricity**: the dam does not create the
  water's energy (gravity and the water cycle already did that); it
  converts pre-existing potential energy into a usable form — directly
  parallel to mitochondria converting glucose's pre-existing chemical
  energy into ATP.
- **Alternative — a currency exchange booth, not a mint**: the booth
  converts one form of money (glucose) into another form (ATP) usable at
  the "local shop" (the rest of the cell); it does not print new money
  from nothing.
- **Story analogy — the sunlight-to-ATP energy trail**: sunlight →
  captured by chloroplasts in photosynthesis → stored in glucose's
  chemical bonds → released and recaptured by mitochondria as ATP,
  narrated as one continuous, traceable chain of transformations, never
  a creation event.
- **ANTI-ANALOGY — do NOT say "the mitochondrion is like a factory that
  makes energy"**: "makes" is exactly the word that installs M1; a
  factory that ASSEMBLES a usable product FROM raw materials it does not
  itself manufacture from nothing is closer, but the word "makes energy"
  specifically should never be used even loosely.

## Demonstrations

- **Discrimination demonstration — label the mitochondrion**: present an
  unlabelled cross-section diagram (outer membrane, inner membrane/
  cristae, matrix) and have the learner place "Krebs cycle" and
  "electron transport chain / ATP synthase" in their correct
  compartments before being told.
- **Teacher-demo — trace the energy trail on a diagram**: starting from
  a sunlight icon, draw the arrow chain through chloroplast → glucose →
  mitochondrion → ATP, explicitly labelling each arrow "transforms," not
  "creates," making the thermodynamic point visually unambiguous.

## Discovery Questions

A genuine discovery design fits: **Need** — "if mitochondria 'make'
energy, where did that energy come from in the first place — did it
exist before the mitochondrion touched it?" **Playground** — the learner
traces glucose's energy backward through digestion, then photosynthesis,
then sunlight. **Invention** — the learner proposes that mitochondria
must be converting energy that already existed, not creating it from
nothing. **Collision** — confronted with the common "powerhouse of the
cell" phrase, which sounds like it's describing energy generation,
creating tension with the just-reasoned conclusion. **Formalization** —
the first law of thermodynamics (energy is transformed, never created or
destroyed) is stated explicitly as the reason "creates energy" is always
wrong, however convenient the shorthand. **Compression** — the learner
re-explains the "powerhouse" phrase to someone else without letting it
imply creation.

## Teaching Sequence

The "powerhouse of the cell" phrase should be introduced ALONGSIDE, not
before, the transformation-not-creation framing — introducing the
catchy phrase alone first, with the precise correction only added later,
risks the imprecise version settling first and needing active
displacement rather than correct installation from the start. Structure
(matrix vs. inner membrane/cristae) should be taught before function
assignment (Krebs cycle vs. electron transport chain), so the learner
has a compartment map ready before being asked to place a process
within it, reducing the M2 mislabelling risk.

## Tutor Actions

From `../../teaching-actions/`: **Definition/Orientation** (mitochondrial
structure, compartments) → **Error Analysis** (the mitochondria-create-
energy misconception probe) → **Discrimination** (Krebs cycle vs.
electron transport chain compartment labelling) → **Inference** (the
endosymbiotic-theory evidence-to-conclusion reasoning task). **What
doesn't fit**: introducing the "powerhouse of the cell" phrase without
immediately pairing it with the transformation-not-creation correction.

## Voice Teaching Notes

Listen for "makes," "creates," or "generates" energy used literally when
describing mitochondrial function — M1's clearest verbal signature,
often triggered by the learner's own use of the "powerhouse" phrase.
Also listen for the Krebs cycle being placed "on the inner membrane" or
"in the cristae" — M2's signature. The load-bearing sentence: "the
energy was already in the glucose — mitochondria just release it and
capture it as ATP, they never make new energy." Channel-reality limits
owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Seed corpus probes are this concept's item bank. A learner who answers
the Krebs-cycle-location `mcq` correctly but fails the create-energy
`misconception_probe` has M1 specifically intact — they know
mitochondrial anatomy but still hold an imprecise, thermodynamically
incorrect functional framing, which should route to the energy-trail
recovery rather than re-teaching structure. A learner who fails the
`mcq` itself (selecting inner membrane) has M2 and needs the
compartment-discrimination exercise first. The probe-depth batch's own
endosymbiotic-theory inference `short_answer` probe (below) verifies the
expert-model evidence-to-conclusion reasoning specifically, distinct
from either misconception check.

## Tutor Recovery Strategy

Likeliest utterance: casually saying mitochondria "make" or "produce"
energy when asked to explain ATP production (not distress-shaped — a
common, near-universal shorthand slip, not a sign of confusion about the
underlying biology). Concept-specific smaller question: "before the
glucose molecule ever reached the mitochondrion, did it already contain
usable chemical energy, or none at all?" Generic recovery machinery
owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks

**Type**: concept (organelle structure-function mapping) with an
embedded correctness-of-language skill (energy transformation vs.
creation) and an inference skill (endosymbiotic evidence reasoning).
Review form: periodic re-presentation of the "powerhouse" phrase for the
learner to self-correct, plus periodic re-presentation of the
compartment-labelling task. Interleaving partners:
`bio.cell.chloroplast-structure` (the natural energy-trail counterpart —
capturing vs. releasing energy) and `bio.div.endosymbiotic-theory` (the
direct KG unlock building on this concept's own evidence).

## Transfer Connections

- **Near**: a new mitochondrion diagram, correctly labelled by
  compartment and process.
- **Far**: recognising the same "catchy shorthand implies an incorrect
  literal claim" structure elsewhere (e.g. "cells eat" for phagocytosis,
  which similarly risks over-literal interpretation).
- **Real-world**: understanding why mitochondrial diseases (which impair
  ATP production) affect high-energy-demand tissues (muscle, brain,
  heart) most severely — a direct consequence of mitochondria's
  transformation role being disrupted, not an energy-creation failure.
- **Expert transfer**: on meeting any biological process described with
  "creates" or "generates" language, the learner spontaneously checks
  whether the process is actually a transformation of pre-existing
  energy or matter, per the first law of thermodynamics.

## Cross-Subject Connections

KG `cross_links` is empty (`[]`). A genuine, currently KG-unencoded
connection exists to physics's first law of thermodynamics (energy
conservation), which is the precise principle M1's recovery path
depends on — flagged below as Curriculum Feedback rather than
fabricated as an official cross-link.

## Blueprint References

No Blueprint exists for this concept at `docs/curriculum/blueprints/
bio.cell.mitochondria-energy.md` as of this entry's authoring (confirmed
by direct directory listing — biology has zero Blueprint files in
total).

## Runtime Asset References

Seeded in the seed corpus (production DB ACTIVE status not
independently re-verified this session): `src/lib/teaching/assets/
biologySeedAssets.ts` carries `core_explanation` and
`misconception_repair` explanations plus `mcq` (PROFICIENT) and
`misconception_probe` (DEVELOPING) probes, both at gradeBand HIGH;
`src/lib/teaching/assets/biologyDepthSeedAssets.ts` (Batch 2, `bio.cell`)
adds one further `short_answer` probe at gradeBand HIGH, PROFICIENT
difficulty (the endosymbiotic-theory evidence-to-inference check),
closing this concept to the 3-probe asset contract floor. No new asset
created by authoring this entry.

## Curriculum Feedback

A genuine, currently-missing `cross_links` edge to physics's first law
of thermodynamics would make explicit the cross-subject principle this
concept's central misconception recovery depends on — recorded as
feedback to the Curriculum Production Pipeline, not added locally.

## Version History

- 2026-09-20 — initial authoring (Biology End-User Readiness Program,
  Wave 2, twentieth entry, strict KG-prerequisite order — third of the
  freshly recomputed topological frontier). No Blueprint exists for this
  concept; both misconceptions classified directly against the
  concept's own seed content using the birth-taxonomy diagnostic
  procedure.
