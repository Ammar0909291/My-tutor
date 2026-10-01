# Types of Biomolecules — `bio.mol.biomolecule-types`

## Identity

- **Concept ID**: `bio.mol.biomolecule-types` (canonical biology KG)
- **Curriculum location**: biology / molecular biology (`bio.mol`)
- **Prerequisites**: `bio.cell.eukaryotic-cell` — the load-bearing part is
  that a eukaryotic cell's compartments (membranes, ribosomes, nucleus)
  are themselves built from and operate on these four macromolecule
  classes; understanding cell structure first gives the learner a
  concrete place each class actually lives and acts, rather than four
  abstract chemical categories with no home.
- **Unlocks** (from KG): `bio.mol.carbohydrates-lipids`,
  `bio.mol.proteins-structure`, `bio.mol.nucleic-acid-structure`,
  `bio.mol.bioenergetics`, `bio.evo.origin-of-life` — this concept is the
  entry point to the entire `bio.mol` domain's structural detail, plus a
  direct line into evolutionary biology's origin-of-life question.
- **Difficulty**: foundational · **Bloom**: remember · **Mastery
  threshold**: 0.70 · **Est. hours**: 2

## Learning Objective

The learner can: name the four major classes of biomolecule
(carbohydrates, proteins, lipids, nucleic acids), state each class's
monomer (or, for lipids, why "monomer" does not apply) and its primary
biological function(s); distinguish the four classes by elemental
composition (all contain C, H, O; proteins add N and S; nucleic acids
add N and P); and correctly identify that lipids carry an essential
structural role (membrane formation), not merely an energy-storage role.

## Core Understanding

Living matter is built predominantly from four classes of
macromolecule, each — except lipids — assembled by polymerising a
repeating type of monomer: carbohydrates (monosaccharide monomers, e.g.
glucose; function: short-term energy and structural support),
proteins (amino acid monomers, 20 types; function: enzymatic catalysis,
structural scaffolding, transport, immune defence), lipids (glycerol
plus fatty acids, not a true polymer — no single repeating monomer unit
links lipid molecules together the way monosaccharides or amino acids
do; function: membrane structure, long-term energy storage, hormone
signalling), and nucleic acids (nucleotide monomers; function: storing
and transmitting genetic information, directing protein synthesis).
Elemental composition distinguishes the classes precisely: every class
contains carbon, hydrogen, and oxygen; proteins additionally contain
nitrogen (in every amino acid's amine group) and often sulfur (in
cysteine and methionine's side chains); nucleic acids additionally
contain nitrogen (in their nitrogenous bases) and phosphorus (in their
phosphate backbone). This elemental signature is diagnostic — an
unknown biomolecule's likely class can be inferred from which of these
extra elements it contains. Micromolecules (water, inorganic ions,
vitamins) are chemically much simpler than any of the four
macromolecule classes but are equally essential to a functioning cell,
not a lesser afterthought category.

## Mental Models

- **Beginner model — "biomolecules are the four food groups"**: the
  learner maps carbohydrates/proteins/lipids onto everyday nutrition
  labels, with nucleic acids often missing entirely from this informal
  mental list because food labels never mention DNA or RNA content.
- **Intermediate model — "lipids (fats) are bad, the others are good/
  neutral"**: a durable carryover from dietary and health messaging,
  where "fat" and "cholesterol" (a lipid) carry negative connotations
  that do not apply to lipids' biological role at all. Upgrade trigger:
  being shown that every cell membrane on Earth, including the
  learner's own, is a phospholipid structure — without lipids, no cell
  boundary, no cell, no life.
- **Advanced model — "four classes, each with monomer + function +
  elemental signature, used to classify an unknown molecule"**: the
  learner can take an unfamiliar molecule's stated composition and
  correctly infer its likely class, rather than only recalling the four
  classes' names from memory.
- **Expert model — "macromolecules as an integrated system, not four
  independent categories"**: the learner recognises that nucleic acids
  encode proteins, proteins catalyse the reactions that build
  carbohydrates and lipids, and lipids house the very membranes within
  which nucleic acids and proteins operate — the four classes are
  functionally interdependent, not a flat taxonomy to be memorised in
  isolation.
- **Do not upgrade early**: a learner who still associates lipids
  primarily with "unhealthy" should not be advanced to reasoning about
  macromolecule interdependence — the negative-connotation carryover
  will quietly distort how they weight lipids' importance in any later
  system-level reasoning (e.g. underestimating membrane biology).

## Why Students Fail

Nutrition labelling and everyday health language use "fat," "protein,"
and "carbs" as evaluative categories (good/bad, to limit/to prioritise)
rather than as structurally neutral classification terms — so when
biology repurposes the same words to name a value-neutral macromolecule
class, the dietary connotations bleed in uninvited, most damagingly for
lipids, which end up mentally filed as "the one to avoid" rather than
"the class that makes every cell membrane on Earth possible."

## Misconceptions

No Blueprint exists yet for this concept; both misconceptions
classified directly against the concept's own seed content using the
birth-taxonomy diagnostic procedure
(`../../misconceptions/01-birth-taxonomy.md`).

- **M1 — "Lipids are just energy storage / a dietary thing to avoid"
  (Type 3, language contamination)**: born from everyday dietary and
  health language, where "fat"/"lipid" is used almost exclusively as an
  evaluative, food-related term (something to limit) rather than a
  structurally neutral biomolecule class name — the everyday word's
  connotation contaminates the biological concept it happens to share a
  name with. Matches Type 3's signature exactly: the misconception
  tracks a specific word's real-world usage, not a reasoning error about
  biology itself. Characteristic phrase: describing lipids solely in
  terms of fuel/calories/dietary fat, with no mention of membranes or
  signalling. Verbatim detection probe (seed corpus,
  `misconception_probe`): "A student says lipids are just
  energy-storage molecules. What important structural role of lipids
  does this miss?" Recovery path: state the shelf-life explicitly —
  "lipid" in biology names a chemical class by structure (hydrophobic,
  built from glycerol and fatty acids), not a dietary judgement — and
  anchor to the concrete, load-bearing fact that phospholipids form the
  bilayer of every cell membrane in the learner's own body.
  Verification-of-death: given a scenario removing all lipids from a
  hypothetical cell, the learner concludes the cell has no boundary at
  all, not merely "less stored energy."
- **M2 — "Proteins are the molecule that carries genetic information"
  (Type 1, overgeneralization)**: born from proteins' genuinely
  dominant, highly visible biological workload (enzymes, structural
  scaffolding, transport, immune defence) leading a learner to
  overgeneralize proteins' importance into every major biological role,
  including one (genetic information storage) that specifically belongs
  to nucleic acids. Matches Type 1's signature: a real, correct fact
  about proteins' versatility stretched past its actual scope.
  Characteristic phrase: attributing heredity or genetic storage to
  proteins rather than DNA/RNA. Verbatim detection probe (seed corpus,
  `mcq`): "Which class of biomolecule carries the genetic information
  of a cell?" (proteins is the flagged wrong choice). Recovery path:
  contrast proteins' functional, executing role (they DO the cell's
  chemical work) against nucleic acids' informational, encoding role
  (they SPECIFY what proteins to build) — proteins are the workers,
  nucleic acids are the instructions the workers are built from.
  Verification-of-death: the learner correctly states that a mutation
  in DNA, not a change to a protein directly, is what gets passed to
  offspring.

## Analogies

- **Best analogy — a construction site (lipids/membrane) vs. the
  blueprint (nucleic acids) vs. the workers (proteins) vs. the fuel
  delivery trucks (carbohydrates)**: each class maps to a distinct,
  non-interchangeable role in the same overall project, making the
  four-class taxonomy memorable as a functional system rather than an
  arbitrary list.
- **Alternative — four departments in a company (structural, informational,
  executive, logistical)**: lipids = facilities (the building itself);
  nucleic acids = the company's master records; proteins = staff who do
  the work; carbohydrates = the day-to-day operating budget.
- **Story analogy — the phospholipid membrane as "the walls of the
  learner's own body's every single cell"**: makes the everyday-life
  stakes of "lipids are not just diet food" concrete and personal.
- **ANTI-ANALOGY — do NOT say "lipids are the 'junk food' of
  biomolecules"**: this directly reinforces M1 by importing exactly the
  dietary judgement this concept needs the learner to set aside.

## Demonstrations

- **Discrimination demonstration — classify the mystery molecule**:
  give the learner a molecule's stated elemental composition (e.g.
  "contains C, H, O, N, and P") and have them infer its likely class
  (nucleic acid) before being told, using the elemental-signature rule
  rather than guessing from the name.
- **Teacher-demo — "what would happen without lipids"**: walk through
  what a cell would look like with carbohydrates, proteins, and nucleic
  acids present but no lipids at all — no membrane, so nothing is
  contained; the demonstration makes lipids' structural indispensability
  vivid rather than assumed.

## Discovery Questions

A genuine discovery design fits: **Need** — "your body is mostly made
of just a few kinds of molecule — what are they, and what does each
actually do?" **Playground** — the learner sorts a mixed list of
familiar substances (glucose, a muscle protein, olive oil, DNA) into
groups by guessing shared properties. **Invention** — the learner
proposes that molecules group by what they're built from (their
monomer) and what job they do. **Collision** — confronted with the fact
that lipids don't fit the "built from a repeating monomer" pattern the
other three classes share, forcing the category to be refined rather
than assumed uniform. **Formalization** — the four classes, their
monomers (or lack thereof for lipids), and elemental signatures are
stated explicitly. **Compression** — given an unfamiliar molecule's
elemental composition, the learner predicts its class without being
told its name first.

## Teaching Sequence

The four classes' functions should be introduced together, as a set,
before elemental composition is introduced as a SECOND, independent
classification lens — introducing elemental composition first risks the
learner treating it as the primary definition of each class (memorising
"N and P means nucleic acid") without first anchoring what each class
actually DOES. M1 (lipids-as-dietary-villain) should be surfaced
immediately after lipids are introduced, before any energy-storage
framing has a chance to settle as the sole association, since the
membrane-structure fact is more surprising and more likely to install
correctly when it lands first rather than as a correction.

## Tutor Actions

From `../../teaching-actions/`: **Definition/Orientation** (the four
classes, monomers, functions) → **Classification Practice** (elemental-
composition inference on unfamiliar molecules) → **Error Analysis** (the
lipids-are-just-energy misconception probe). **What doesn't fit**:
introducing elemental composition via rote memorisation drilling before
the learner has any functional anchor for what each class does.

## Voice Teaching Notes

Listen for lipids being described only in caloric/dietary terms ("fats
are bad," "fats store energy") with no mention of membranes — M1's
clearest verbal signature. The load-bearing sentence: "every cell
membrane in your body, right now, is made of lipids — without them
there would be no 'inside' or 'outside' of any cell at all." Channel-
reality limits owned by `../foundations/03-voice-first-learning-model.md
§7`.

## Assessment Signals

Seed corpus probes are this concept's item bank. A learner who answers
the nucleic-acid/genetic-information `mcq` correctly but fails the
lipids-are-just-energy `misconception_probe` has M1 specifically intact
— they can correctly place genetic information with nucleic acids but
still under-weight lipids' structural role, which should route to the
membrane-structure recovery rather than re-teaching the four-class list
from scratch. A learner who fails the `mcq` itself (selecting proteins)
has M2 and needs the workers-vs-blueprint distinction before anything
else.

## Tutor Recovery Strategy

Likeliest utterance: describing lipids purely as "fat" or "energy" with
visible surprise when membranes are mentioned (a genuine "I didn't know
that" moment, not distress-shaped — foundational, low-stakes concept).
Concept-specific smaller question: "what is the outer boundary of one of
your cells actually made of?" Generic recovery machinery owned by
`../foundations/01-recovery-engine.md`.

## Memory Hooks

**Type**: fact (the four-class taxonomy, monomers, elemental signatures)
with an embedded classification skill (inferring class from
composition). Review form: periodic re-presentation of an unfamiliar
molecule's elemental composition for class inference, spaced to outlast
the dietary-connotation carryover for lipids specifically. Interleaving
partners: `bio.mol.carbohydrates-lipids`, `bio.mol.proteins-structure`,
`bio.mol.nucleic-acid-structure` (all direct KG unlocks, each deepening
one of the four classes this concept introduces at a survey level).

## Transfer Connections

- **Near**: a new unfamiliar molecule's elemental composition, correctly
  classified.
- **Far**: recognising the same "everyday word connotation
  contaminating a technical category" structure elsewhere (e.g.
  "organic" in chemistry vs. its marketing meaning).
- **Real-world**: reading a nutrition label with the biological
  (structurally neutral) meaning of "fat"/"protein"/"carbohydrate" in
  mind rather than only the dietary-judgement meaning.
- **Expert transfer**: on meeting any claim that one macromolecule class
  is "the important one," the learner spontaneously asks what job is
  actually being discussed, recognising the four classes as functionally
  interdependent rather than rankable.

## Cross-Subject Connections

KG `cross_links` is empty (`[]`). A genuine, currently KG-unencoded
connection exists to chemistry's organic-molecule classification
(functional groups, polymerisation) which underlies this concept's
monomer/elemental-composition framing — flagged below as Curriculum
Feedback rather than fabricated as an official cross-link.

## Blueprint References

No Blueprint exists for this concept at `docs/curriculum/blueprints/
bio.mol.biomolecule-types.md` as of this entry's authoring (confirmed by
direct directory listing — biology has zero Blueprint files in total).

## Runtime Asset References

Seeded in the seed corpus (production DB ACTIVE status not
independently re-verified this session): `src/lib/teaching/assets/
biologySeedAssets.ts` carries `core_explanation` and
`misconception_repair` explanations plus `mcq` (FOUNDATIONAL) and
`misconception_probe` (DEVELOPING) probes, both at gradeBand HIGH;
`src/lib/teaching/assets/biologyDepthSeedAssets.ts` (Batch 3, `bio.mol`)
adds one further `short_answer` probe at gradeBand HIGH, PROFICIENT
difficulty, closing this concept to the 3-probe asset contract floor. No
new asset created by authoring this entry.

## Curriculum Feedback

A genuine, currently-missing `cross_links` edge to chemistry's organic
molecule/functional-group concepts would make explicit the chemistry
prerequisite this concept currently assumes implicitly (elemental
composition, polymerisation) — recorded as feedback to the Curriculum
Production Pipeline, not added locally.

## Version History

- 2026-09-20 — initial authoring (Biology End-User Readiness Program,
  Wave 2, eighteenth entry, strict KG-prerequisite order — first of the
  freshly recomputed topological frontier following the 17-concept
  baseline). No Blueprint exists for this concept; both misconceptions
  classified directly against the concept's own seed content using the
  birth-taxonomy diagnostic procedure.
