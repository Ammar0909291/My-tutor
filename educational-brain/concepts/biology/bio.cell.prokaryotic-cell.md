# Prokaryotic Cell Structure — `bio.cell.prokaryotic-cell`

## Identity

- **Concept ID**: `bio.cell.prokaryotic-cell` (canonical biology KG)
- **Curriculum location**: biology / cell biology (`bio.cell`)
- **Prerequisites**: `bio.cell.cell-theory` — the load-bearing part is
  "the cell is life's basic unit"; a prokaryotic cell is this concept's
  own worked instance of that unit in its structurally simplest form.
- **Unlocks** (from KG): `bio.micro.microbial-diversity` (currently
  unauthored in this Educational Brain) — prokaryotic structure is the
  direct foundation for surveying bacterial/archaeal diversity.
- **Difficulty**: developing · **Bloom**: understand · **Mastery
  threshold**: 0.70 · **Est. hours**: 3

## Learning Objective

The learner can: list the structures common to prokaryotic cells
(plasma membrane, cytoplasm, nucleoid, 70S ribosomes, cell wall) and
those often present (plasmids, flagella, pili); explain why "no
nucleus" does not mean "no DNA"; and explain how horizontal gene
transfer (e.g. via plasmids) can spread a trait like antibiotic
resistance between bacteria without mutation or reproduction.

## Core Understanding

Prokaryotic cells (bacteria and archaea) lack a membrane-bound nucleus
and lack membrane-bound organelles altogether — their DNA sits as a
single circular chromosome directly in the cytoplasm, in an irregular,
unbounded region called the nucleoid. Despite this structural
simplicity relative to eukaryotic cells, prokaryotes possess everything
needed for independent life: a plasma membrane, cytoplasm, and 70S
ribosomes (smaller than eukaryotic 80S ribosomes) for protein synthesis,
plus a protective cell wall (peptidoglycan in bacteria). Many also carry
plasmids — small, circular, extra-chromosomal DNA molecules that
replicate independently of the main chromosome and frequently carry
genes for antibiotic resistance or other traits — and can move between
bacterial cells via horizontal gene transfer (conjugation,
transformation, transduction), spreading a genetic trait through a
population far faster than mutation and reproduction alone could.

## Mental Models

- **Beginner model — "no nucleus, so simpler and less capable"**: the
  learner registers "prokaryote = no nucleus" as the headline fact
  without yet appreciating that the cell is still fully equipped for
  independent life.
- **Intermediate model — "no nucleus means no DNA"**: the direct
  substrate of the misconception below — an overextension of "no
  nucleus" into "no genetic material at all." Upgrade trigger: the
  nucleoid region, correctly identified as unbounded DNA rather than
  absent DNA.
- **Advanced model — "structurally simple, but complete and genetically
  dynamic"**: the learner correctly locates prokaryotic DNA in the
  nucleoid and understands plasmids and horizontal gene transfer as
  genuine, additional genetic mechanisms beyond the main chromosome.
- **Expert model — "prokaryotic simplicity as evolutionary efficiency,
  not deficiency"**: the learner recognises that prokaryotes are the
  oldest and most abundant life on Earth, and that their structural
  economy (rapid replication, flexible horizontal gene transfer) is a
  genuinely successful evolutionary strategy, not an earlier or lesser
  stage life needed to "get past."
- **Do not upgrade early**: a learner who still believes "no nucleus
  means no DNA" (intermediate model, unrepaired) should not be pushed
  toward horizontal gene transfer — that mechanism only makes sense once
  the learner accepts prokaryotes genuinely carry transferable genetic
  material.

## Why Students Fail

The word "nucleus" is taught early as essentially synonymous with "where
a cell's genetic information lives," so a learner reasonably, but
incorrectly, generalises "no nucleus" into "no genetic information" —
the DNA's continued presence in an unbounded cytoplasmic region (the
nucleoid) is a genuinely counter-intuitive structural fact that nothing
in the "nucleus = DNA location" simplification prepares a learner to
expect.

## Misconceptions

No Blueprint exists yet for this concept; the misconception classified
directly against the concept's own seed content using the birth-
taxonomy diagnostic procedure (`../../misconceptions/01-birth-taxonomy.md`).

- **M1 — "Prokaryotes have no genetic material because they have no
  nucleus" (Type 1, overgeneralization)**: the learner correctly learns
  that eukaryotic DNA lives in the nucleus and overgeneralizes "DNA
  lives in the nucleus" into "no nucleus means no DNA," extending a rule
  that holds for eukaryotic cells past its actual scope. Matches Type
  1's signature: the underlying association (nucleus ↔ DNA) is
  genuinely true for eukaryotes; the error is extending it as a
  universal requirement rather than a eukaryote-specific fact.
  Characteristic phrase: "bacteria have no genetic material because
  they have no nucleus." Verbatim detection probe (seed corpus,
  `misconception_probe`): "A student says 'bacteria have no genetic
  material because they have no nucleus.' What is wrong with this?"
  Recovery path: introduce the nucleoid explicitly as "DNA without an
  envelope, not absent DNA," and connect to horizontal gene transfer
  (bacteria can literally pass DNA to each other) as concrete, undeniable
  evidence they possess and exchange genetic material. Verification-of-
  death: given a new prokaryote example, the learner correctly states
  where its DNA is located (the nucleoid) without needing to be
  reminded that DNA is present at all.

## Analogies

- **Best analogy — a filing cabinet vs. loose papers on a desk**: a
  nucleus is like a filing cabinet (DNA enclosed, organised); a
  nucleoid is like the same papers laid out loose on a desk (DNA
  present, just not enclosed) — the papers (DNA) exist either way.
  Breaking point: "loose on a desk" might wrongly suggest disorganised
  or vulnerable; note the nucleoid is a distinct, functional region, not
  scattered randomly.
- **Alternative — a USB drive passed hand to hand**: a plasmid is a
  small, separate, easily-transferable data packet that can be handed
  directly from one bacterium to another — a concrete image for
  horizontal gene transfer distinct from inheritance through reproduction.
- **ANTI-ANALOGY — do NOT say "prokaryotes are primitive/incomplete
  cells, missing pieces eukaryotes later added"**: this framing
  reinforces "simpler = deficient" rather than "structurally different,
  equally viable" — prokaryotes are not an unfinished eukaryote.

## Demonstrations

- **Discrimination demonstration — locate the DNA**: present a labelled
  prokaryotic cell diagram and ask the learner to point to where the DNA
  is (the nucleoid), contrasted with a eukaryotic cell's labelled
  nucleus, before any lecture on the distinction.
- **Teacher-demo — antibiotic resistance spread**: walk through how a
  resistance gene on a plasmid can move from one bacterium to a
  neighbouring one via conjugation, with neither bacterium needing to
  reproduce or mutate for the trait to spread.

## Discovery Questions

A genuine discovery design fits: **Need** — "if bacteria have no
nucleus, where is their DNA — or do they have none at all?" **Playground**
— the learner examines a prokaryotic cell diagram for anything that
could hold DNA. **Invention** — the learner proposes the nucleoid region
as a candidate. **Collision** — presented with the antibiotic-resistance
scenario (a bacterium becomes resistant without personally mutating),
forcing the question of how a trait could spread without reproduction.
**Formalization** — plasmids and horizontal gene transfer are named as
the mechanism. **Compression** — the learner explains, for a new
scenario, how a bacterial trait could spread through a population
quickly.

## Teaching Sequence

The nucleoid (M1's repair) must be established before horizontal gene
transfer is introduced — a learner who still doubts prokaryotes have
DNA at all cannot meaningfully reason about plasmids moving BETWEEN
cells, since that presupposes DNA is already accepted as present within
each cell.

## Tutor Actions

From `../../teaching-actions/`: **Definition/Orientation** (prokaryotic
structures, nucleoid emphasised) → **Error Analysis** (the no-nucleus-
no-DNA misconception probe) → **Worked Example** (antibiotic resistance
spread via plasmid). **What doesn't fit**: presenting prokaryotic
structure purely as "what eukaryotic cells are missing" — this framing
directly reinforces the "simpler = deficient" beginner model rather
than presenting prokaryotes on their own terms.

## Voice Teaching Notes

Listen for "no genetic material" or "no DNA" applied to bacteria — M1's
clearest verbal signature. The load-bearing sentence: "no envelope
around the DNA doesn't mean no DNA" — short and returnable whenever the
confusion recurs. Channel-reality limits owned by `../foundations/
03-voice-first-learning-model.md §7`.

## Assessment Signals

Seed corpus probes are this concept's item bank. A fast, confident
"no genetic material" answer (rather than a hedge) on the misconception
probe suggests the overgeneralization is firmly held rather than a
simple recall gap — route to the nucleoid-location recovery directly.

## Tutor Recovery Strategy

Likeliest utterance: "so bacteria don't have DNA?" (not distress-shaped
— foundational, low-stakes concept). Concept-specific smaller question:
"if bacteria have no DNA, how could one bacterium ever pass an
antibiotic-resistance trait to another?" Generic recovery machinery
owned by `../foundations/01-recovery-engine.md`.

## Memory Hooks

**Type**: concept (structural comparison) with an embedded factual
component (the list of prokaryotic structures). Review form: periodic
re-presentation of a labelled diagram, checking correct nucleoid
identification. Interleaving partners: `bio.cell.eukaryotic-cell` (this
concept's own natural contrast pair, authored in this same batch).

## Transfer Connections

- **Near**: a new prokaryote example, correctly located DNA and
  structures.
- **Far**: recognising the same "compact/decentralised structure can
  still be fully functional" pattern outside biology (e.g. a
  decentralised organisation without a single central office still
  functioning effectively).
- **Real-world**: understanding why antibiotic resistance can spread
  rapidly through a bacterial population, relevant to public health
  discussions of antibiotic overuse.
- **Expert transfer**: on meeting any claim about a structurally simple
  organism, the learner spontaneously checks whether "simple structure"
  is being conflated with "lacks capability."

## Cross-Subject Connections

KG `cross_links` is empty (`[]`). No fabricated cross-subject connection
recorded.

## Blueprint References

No Blueprint exists for this concept at `docs/curriculum/blueprints/
bio.cell.prokaryotic-cell.md` as of this entry's authoring (confirmed by
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

None found. This concept's sole KG-listed unlock is a direct, sensible
consequence.

## Version History

- 2026-09-20 — initial authoring (Biology End-User Readiness Program,
  Wave 2, eleventh entry, strict KG-prerequisite order). No Blueprint
  exists for this concept; the misconception classified directly
  against the concept's own seed content using the birth-taxonomy
  diagnostic procedure.
