# Eukaryotic Cell Structure — `bio.cell.eukaryotic-cell`

## Identity

- **Concept ID**: `bio.cell.eukaryotic-cell` (canonical biology KG)
- **Curriculum location**: biology / cell biology (`bio.cell`)
- **Prerequisites**: `bio.cell.cell-theory` — the load-bearing part is
  "the cell is life's basic unit"; a eukaryotic cell is this concept's
  own worked instance of that unit at its structurally most complex.
- **Unlocks** (from KG): a large fan-out reflecting this concept's
  foundational role — `bio.cell.cell-membrane-transport`,
  `bio.cell.chloroplast-structure`, `bio.cell.endomembrane-system`,
  `bio.cell.mitochondria-energy`, `bio.cell.nucleus-chromosomes`,
  `bio.mol.biomolecule-types` (already authored, Batch 3),
  `bio.div.protist-diversity`, `bio.plant.plant-tissue-systems` (all
  currently unauthored except the one noted).
- **Difficulty**: developing · **Bloom**: understand · **Mastery
  threshold**: 0.70 · **Est. hours**: 3

## Learning Objective

The learner can: list organelles shared by plant and animal cells
(nucleus, mitochondria, ER, Golgi, ribosomes, plasma membrane) and
organelles specific to each (animal: centrioles, lysosomes; plant:
cellulose wall, chloroplasts, large central vacuole); explain
compartmentalisation as eukaryotic cells' key structural advantage; and
correctly evaluate whether a described plant or animal cell should be
expected to have a specific organelle, rather than assuming every cell
of a given type has every organelle associated with that type.

## Core Understanding

Eukaryotic cells (found in plants, animals, fungi, and protists) are
distinguished from prokaryotic cells by having a membrane-bound nucleus
and membrane-bound organelles — physically separate internal
compartments, each specialised for a distinct set of chemical
reactions. This compartmentalisation is the key structural advantage
eukaryotic cells hold over prokaryotic ones: reactions that would
otherwise interfere with each other (e.g. digestive enzymes vs. the
cell's own proteins) are isolated in separate organelles, permitting far
greater biochemical complexity than an undivided cytoplasm could
support. Plant and animal cells share several organelles (nucleus,
mitochondria, endoplasmic reticulum, Golgi apparatus, ribosomes, plasma
membrane) but differ in others — animal cells additionally have
centrioles and lysosomes; plant cells additionally have a cellulose cell
wall, chloroplasts, and a large central vacuole. Possessing a "plant
cell" or "animal cell" identity does not guarantee every associated
organelle is present in every instance of that cell type: a plant root
cell, never exposed to light, genuinely lacks chloroplasts despite being
unambiguously a plant cell.

## Mental Models

- **Beginner model — "plant cells have chloroplasts, animal cells
  don't"**: a correct but incomplete headline fact, treated as an
  unconditional rule rather than a general tendency.
- **Intermediate model — "every cell of a given organism type has every
  organelle typical of that type"**: the direct substrate of the
  misconception below. Upgrade trigger: the root-cell counterexample,
  showing a genuine plant cell without chloroplasts.
- **Advanced model — "organelle presence depends on the cell's specific
  function, not just its broad type"**: the learner correctly predicts
  which organelles a described cell (given its function and location)
  should or shouldn't have.
- **Expert model — "compartmentalisation as the generative principle
  behind eukaryotic complexity"**: the learner understands that the
  DIVERSITY of specialised cell types within one organism (root cells,
  leaf cells, animal muscle cells, nerve cells) is itself a consequence
  of compartmentalised, selectively-expressed cellular machinery, not
  merely a list of exceptions to memorise.
- **Do not upgrade early**: a learner who still assumes every plant
  cell has chloroplasts (intermediate model, unrepaired) should not be
  pushed toward reasoning about differentiated cell types generally —
  the same "type implies every associated feature" error will recur for
  any new cell-type comparison.

## Why Students Fail

Textbook diagrams of "a plant cell" near-universally show a single,
composite, idealised cell bearing every organelle typical of plant
cells at once (chloroplasts included), because that is the most
efficient way to teach the full organelle list in one image — but this
representational convenience is easily, and reasonably, misread as a
claim that every real plant cell looks like that composite, rather than
as a summary of organelles found ACROSS different plant cell types.

## Misconceptions

No Blueprint exists yet for this concept; the misconception classified
directly against the concept's own seed content using the birth-
taxonomy diagnostic procedure (`../../misconceptions/01-birth-taxonomy.md`).

- **M1 — "All plant cells have chloroplasts and therefore photosynthesise"
  (Type 5, instruction-induced)**: born from the conventional composite
  "textbook plant cell" diagram showing every typical plant organelle
  at once, without an explicit note that real plant cells specialise and
  do not all carry every organelle simultaneously. Matches Type 5's
  signature: a near-universal, curriculum-shaped pattern rather than an
  individual error, directly traceable to a specific, nameable teaching
  convention. Characteristic phrase: "plant cells have chloroplasts" —
  stated as an unconditional, exceptionless rule. Verbatim detection
  probe (seed corpus, `misconception_probe`): "Do ALL plant cells carry
  out photosynthesis?" Recovery path: name the shelf-life explicitly —
  "the textbook diagram shows every organelle a plant cell type CAN
  have, not every organelle every individual plant cell DOES have" —
  and anchor to the concrete root-cell counterexample (underground, no
  light, no chloroplasts, but unambiguously alive and plant). Verification-
  of-death: given a description of a new plant cell type and its
  location/function, the learner correctly predicts whether it likely
  has chloroplasts, rather than assuming yes by default.

## Analogies

- **Best analogy — a company org chart listing every possible role, not
  every employee's actual job**: an org chart lists all roles the
  company CAN have (sales, engineering, legal); no single employee
  holds every role simultaneously — directly parallels the composite
  textbook diagram vs. real, specialised cells.
- **Alternative — a toolbox with tools for every job, used one at a
  time by different specialists**: the toolbox (cell type) contains
  tools for many jobs, but a plumber only uses plumbing tools on a given
  job, not the electrician's tools too.
- **Story analogy — the root cell (the concept's own worked example)**:
  underground, no light, no chloroplasts — a single, memorable,
  genuinely surprising counterexample to "all plant cells photosynthesise."
- **ANTI-ANALOGY — do NOT say "a plant cell is like a Swiss Army knife
  with every tool always open"**: this reinforces exactly the
  "every organelle always present" misconception.

## Demonstrations

- **Discrimination demonstration — root cell vs. leaf cell**: present
  both cell types side by side (same organism, same "plant cell"
  category) and ask the learner to predict, before being told, which
  organelles each should have based on function and location.
- **Teacher-demo — compartmentalisation payoff**: contrast a
  hypothetical undivided cytoplasm (digestive enzymes freely mixed with
  the cell's own proteins) against the actual compartmentalised
  arrangement (lysosome-contained enzymes), demonstrating why separation
  matters concretely.

## Discovery Questions

A genuine discovery design fits: **Need** — "here's a root cell, buried
underground with no light. Does it have chloroplasts?" **Playground** —
the learner considers what a root cell actually needs to do (absorb
water/minerals, not photosynthesise). **Invention** — the learner
proposes that organelle presence should depend on the cell's actual
job, not just "plant cell" membership. **Collision** — confronted with
the standard textbook diagram showing chloroplasts as if universal,
creating tension with the just-reasoned root-cell case. **Formalization**
— the distinction between "organelles a cell TYPE can have" and
"organelles a given cell DOES have" is stated explicitly.
**Compression** — the learner predicts organelle presence for a new
cell type (e.g. a mature red blood cell, which lacks a nucleus and most
organelles entirely).

## Teaching Sequence

The shared organelle list (nucleus, mitochondria, ER, Golgi, ribosomes)
should be established before the plant/animal-specific organelles are
introduced, and the root-cell counterexample should be introduced
immediately after chloroplasts are first mentioned — waiting to
introduce the counterexample later risks the "all plant cells
photosynthesise" model becoming settled first.

## Tutor Actions

From `../../teaching-actions/`: **Definition/Orientation** (shared vs.
type-specific organelles) → **Error Analysis** (the all-plant-cells-
photosynthesise misconception probe) → **Discrimination** (root cell vs.
leaf cell organelle prediction). **What doesn't fit**: presenting the
composite textbook diagram without immediately flagging that it is a
composite, not a single real cell's inventory.

## Voice Teaching Notes

Listen for "plant cells have chloroplasts" stated as an unconditional
rule, especially in response to a non-photosynthetic plant cell example
— M1's clearest verbal signature. The load-bearing sentence: "that
diagram shows what a plant cell type CAN have — not what every single
plant cell always has" — return to it whenever the composite-diagram
confusion recurs. Channel-reality limits owned by `../foundations/
03-voice-first-learning-model.md §7`.

## Assessment Signals

Seed corpus probes are this concept's item bank. A learner who answers
correctly on the plant-vs-animal organelle-naming `mcq` but then fails
the root-cell `misconception_probe` reveals M1 specifically — they know
the organelle LIST correctly but have not yet separated "typical of the
type" from "present in every instance," which should route to the
composite-diagram/root-cell recovery rather than to re-teaching organelle
names.

## Tutor Recovery Strategy

Likeliest utterance: confidently asserting "plant cells have
chloroplasts" when shown a non-photosynthetic plant cell (not
distress-shaped — foundational, low-stakes concept). Concept-specific
smaller question: "does a root, buried underground with no sunlight,
need to make its own food using light?" Generic recovery machinery
owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks

**Type**: concept (organelle function and distribution) with an
embedded discrimination skill (predicting organelle presence from cell
function). Review form: periodic re-presentation of a new, specialised
cell type (e.g. a mature red blood cell, a muscle cell) for organelle
prediction. Interleaving partners: `bio.cell.prokaryotic-cell` (this
concept's own natural contrast pair, authored in the same batch);
`bio.cell.chloroplast-structure`/`bio.cell.mitochondria-energy` (both
direct KG unlocks).

## Transfer Connections

- **Near**: a new specialised cell type, correctly predicted for
  organelle presence.
- **Far**: recognising the same "type membership doesn't guarantee
  every associated feature is present" structure elsewhere (e.g. not
  every member of a profession uses every tool associated with that
  profession).
- **Real-world**: understanding why different human tissues (liver,
  muscle, nerve) look and function so differently despite sharing
  identical DNA — a preview of gene regulation (`bio.mol.gene-
  regulation`, already authored in Batch 3).
- **Expert transfer**: on meeting any claim about "what a cell type
  has," the learner spontaneously asks whether the claim is about the
  type generally or a specific instance.

## Cross-Subject Connections

KG `cross_links` is empty (`[]`). No fabricated cross-subject connection
recorded.

## Blueprint References

No Blueprint exists for this concept at `docs/curriculum/blueprints/
bio.cell.eukaryotic-cell.md` as of this entry's authoring (confirmed by
direct directory listing — biology has zero Blueprint files in total).

## Runtime Asset References

Seeded in the seed corpus (production DB ACTIVE status not
independently re-verified this session): `src/lib/teaching/assets/
biologySeedAssets.ts` carries `core_explanation` and
`misconception_repair` explanations plus `mcq` and `misconception_probe`
probes, all at gradeBand HIGH; `src/lib/teaching/assets/
biologyDepthSeedAssets.ts` (Batch 2, `bio.cell`) adds one further
`short_answer` probe at gradeBand HIGH, PROFICIENT difficulty, closing
this concept to the 3-probe asset contract floor. No new asset created
by authoring this entry.

## Curriculum Feedback

None found. This concept's eight KG-listed unlocks are each a
plausible direct consequence of establishing eukaryotic cell structure.

## Version History

- 2026-09-20 — initial authoring (Biology End-User Readiness Program,
  Wave 2, twelfth entry, strict KG-prerequisite order). No Blueprint
  exists for this concept; the misconception classified directly
  against the concept's own seed content using the birth-taxonomy
  diagnostic procedure.
