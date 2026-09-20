# Mitosis — `bio.cell.mitosis`

## Identity

- **Concept ID**: `bio.cell.mitosis` (canonical biology KG)
- **Curriculum location**: biology / cell biology (`bio.cell`)
- **Prerequisites**: `bio.cell.cell-cycle` — the load-bearing part is M
  phase's position within the larger cycle (following interphase's
  G1/S/G2 stages, gated by checkpoints); mitosis is this concept's own
  detailed zoom into M phase's nuclear-division sub-stages specifically.
- **Unlocks** (from KG): `bio.cell.meiosis`, `bio.repro.asexual-
  reproduction` — mitosis's mechanics (chromosome/chromatid behaviour
  across four named stages) are the direct comparison baseline meiosis
  builds on by contrast, and mitosis is the literal cellular mechanism
  underlying asexual reproduction in many organisms.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery
  threshold**: 0.75 · **Est. hours**: 4

## Learning Objective

The learner can: name and order mitosis's four stages (prophase,
metaphase, anaphase, telophase) and state what happens to chromosomes/
chromatids at each stage; correctly state that mitosis produces two
genetically IDENTICAL diploid (2n) daughter cells from one diploid
parent cell, preserving chromosome number rather than halving it; and
correctly distinguish mitosis's purpose and outcome (growth and repair,
identical cells) from meiosis's (gamete production, genetically varied
cells, halved chromosome number).

## Core Understanding

Mitosis is nuclear division producing two genetically identical
daughter cells from one parent cell, proceeding through four named
stages. Prophase: chromatin condenses into visible, discrete
chromosomes (each already replicated during the preceding S phase,
consisting of two sister chromatids); the mitotic spindle begins
forming; the nuclear envelope breaks down. Metaphase: chromosomes align
along the cell's equator (the metaphase plate), each chromosome attached
to spindle fibres extending from BOTH poles, via its centromere — this
bipolar attachment is what allows the subsequent even, symmetric
separation. Anaphase: centromeres split, and the sister chromatids
(now considered individual chromosomes) are pulled to opposite poles as
the spindle fibres shorten. Telophase: chromosomes arrive at the poles,
nuclear envelopes reform around each set, and chromosomes decondense
back into less-compact chromatin. Cytokinesis — technically a separate
process from mitosis itself, though it typically overlaps with
telophase — physically divides the cytoplasm into two cells, via a
pinching cleavage furrow in animal cells or a newly-formed cell plate in
plant cells (which have a rigid cell wall preventing simple pinching).
The result is two diploid (2n) cells, each genetically identical to the
original parent cell and to each other. This preservation of chromosome
number is mitosis's defining functional signature, directly enabling
its two biological roles: GROWTH (adding genetically identical cells to
increase an organism's size) and REPAIR (replacing damaged or lost cells
with exact genetic matches) — in sharp contrast to meiosis, which
specifically HALVES chromosome number and generates genetically VARIED
gametes for sexual reproduction.

## Mental Models

- **Beginner model — "cell division is cell division; mitosis and
  meiosis are just two names for splitting a cell in half"**: without
  an explicit contrast, the two processes' genuinely distinct outcomes
  (identical vs. varied cells, same vs. halved chromosome number) are
  not yet differentiated.
- **Intermediate model — "any cell division halves the chromosome
  number, since that's what division means"**: the direct substrate of
  this concept's central misconception — meiosis's halving is
  overgeneralized to ALL cell division, including mitosis, which
  actually preserves chromosome number. Upgrade trigger: being shown
  that a skin cell (produced by mitosis for repair) has the SAME 46
  chromosomes as the parent cell it came from, not 23.
- **Advanced model — "chromosome/chromatid behaviour tracked stage by
  stage"**: the learner can state, for ANY named stage of mitosis, the
  precise state of the chromosomes (condensed or not; aligned, moving,
  or arrived; single or double chromatid) without needing to recall the
  stage names as an isolated list.
- **Expert model — "mitosis's purpose (identical cells, growth/repair)
  as the direct explanation for its chromosome-preserving mechanism,
  not an arbitrary rule"**: the learner explains WHY mitosis must
  preserve chromosome number, given its biological purpose — a skin
  cell replacing a damaged skin cell must be able to do the SAME job,
  requiring the SAME complete genetic instruction set, unlike a gamete,
  whose job (combining with another gamete) specifically requires only
  half a set.
- **Do not upgrade early**: a learner who still believes mitosis halves
  chromosome number should not be advanced to stage-by-stage chromatid
  tracking — without first correcting the halving misconception, the
  learner will likely misapply meiosis's own chromosome-number rules
  (23, four cells) while attempting to reason through mitosis's actual
  stages (46, two cells), producing confidently wrong stage-by-stage
  predictions.

## Why Students Fail

Mitosis and meiosis are almost always taught in close succession,
frequently in the same unit or even the same lesson, and both
processes share substantial surface-level vocabulary (chromosomes,
spindle, anaphase-like separation events) — so the one genuinely
load-bearing DIFFERENCE between them (mitosis preserves chromosome
number for identical cells; meiosis halves it for varied gametes) is
easy to lose amid the much larger area of genuine procedural overlap,
especially since "cell division reduces things" is itself a plausible-
sounding, everyday-language-compatible default assumption.

## Misconceptions

No Blueprint exists yet for this concept; the misconception classified
directly against the concept's own seed content using the birth-
taxonomy diagnostic procedure
(`../../misconceptions/01-birth-taxonomy.md`).

- **M1 — "Mitosis halves the chromosome number, like all cell
  division" (Type 1, overgeneralization)**: born from meiosis's
  genuinely correct chromosome-halving property being overgeneralized
  to cell division generally, especially since meiosis and mitosis are
  taught so closely together that a single "cell division" mental
  category can form before the two processes' distinct chromosome-
  number outcomes are separately anchored. Matches Type 1's signature:
  a real, correct fact about ONE specific process (meiosis) applied
  past its actual scope to a different process (mitosis) that does not
  share that property. Characteristic phrase: stating that daughter
  cells from mitosis have half the parent's chromosome number.
  Verbatim detection probe (seed corpus, `misconception_probe`): "A
  human cell (46 chromosomes) undergoes mitosis. How many chromosomes
  does each daughter cell have?" (with "23 — division must halve the
  chromosome number" as the flagged wrong choice). Recovery path: state
  the purpose-driven contrast explicitly — mitosis produces IDENTICAL
  cells for growth/repair, which REQUIRES the full, identical chromosome
  set to be preserved; only meiosis, which produces gametes for sexual
  reproduction, needs to halve the number (since fertilisation will
  later restore the full number by combining two gametes).
  Verification-of-death: the learner correctly states, without
  hesitation, that a skin cell produced by mitosis has exactly the same
  chromosome number as its parent cell.

## Analogies

- **Best analogy — photocopying a complete document, vs. splitting one
  copy of the document into two separate half-documents**: mitosis is
  like photocopying — the ORIGINAL is fully duplicated first (during S
  phase), so each of the two resulting copies (daughter cells) is
  complete and identical; meiosis is more like carefully splitting a
  set of paired volumes so each recipient gets exactly one of each pair
  (half the total, but a coherent, functional half).
- **Alternative — a factory producing two identical replacement parts
  vs. a factory producing customised half-kits meant to be combined
  later**: mitosis's output (identical daughter cells) is directly
  ready to do the SAME job as the original; meiosis's output (gametes)
  is only functional once combined with a matching half-kit from
  another source.
- **Story analogy — the skin-wound-repair worked example**: new skin
  cells appearing after a cut are genetically IDENTICAL to the
  surrounding tissue specifically because they must do the exact same
  job — a concrete, felt-experience anchor for why mitosis cannot
  afford to halve the chromosome number.
- **ANTI-ANALOGY — do NOT say "mitosis and meiosis are basically the
  same process, just used in different situations"**: this
  under-states the one genuinely critical distinction (chromosome
  number outcome) the concept most needs the learner to hold onto.

## Demonstrations

- **Discrimination demonstration — stage-by-stage chromatid tracking**:
  present a labelled cell at each of the four mitotic stages in turn and
  have the learner state the chromosome/chromatid count and
  condensation state at each point, reinforcing the mechanistic detail
  beneath the stage names.
- **Teacher-demo — the skin-wound repair contrast**: walk through why
  new skin cells replacing damaged ones must carry the SAME full genetic
  instruction set as the cells they replace, directly motivating the
  chromosome-number-preservation principle from function rather than
  from memorised rule.

## Discovery Questions

A genuine discovery design fits: **Need** — "after a cut heals, are the
new skin cells genetically the same as your original skin, or
different?" **Playground** — the learner considers what job the new
skin cells need to do (exactly the same job as the cells they replace).
**Invention** — the learner proposes that the new cells must therefore
carry the SAME complete genetic instructions, not half of them.
**Collision** — confronted with meiosis's chromosome-halving rule,
recently learned in the same unit, creating tension with the
just-reasoned conclusion for mitosis specifically. **Formalization** —
the purpose-driven contrast (mitosis: identical cells for growth/repair,
full chromosome number preserved; meiosis: varied gametes for sexual
reproduction, chromosome number halved) is stated explicitly.
**Compression** — given any new cell-division scenario (e.g. a plant
growing a new leaf, or an animal producing sperm), the learner correctly
predicts whether mitosis or meiosis is occurring and what the resulting
chromosome number should be.

## Teaching Sequence

Mitosis's four stages and chromosome-preservation outcome should be
fully secure BEFORE meiosis is introduced, even though the two are
often taught in close succession — introducing meiosis's halving
mechanism too soon after mitosis, without mitosis's own
chromosome-preservation principle first being anchored to its
biological PURPOSE (identical cells for growth/repair), risks the
halving property bleeding backward onto mitosis before the contrast is
ever explicitly drawn.

## Tutor Actions

From `../../teaching-actions/`: **Sequencing** (the four stages in
order, with chromatid state tracked at each) → **Definition/Orientation**
(chromosome-number preservation, tied to growth/repair purpose) →
**Error Analysis** (the chromosome-halving misconception probe,
explicitly contrasted against meiosis). **What doesn't fit**:
introducing meiosis's chromosome-halving property before mitosis's own
chromosome-preservation principle and its underlying purpose are fully
secure.

## Voice Teaching Notes

Listen for a daughter cell's chromosome count stated as half the
parent's after mitosis specifically — M1's clearest verbal signature,
most likely to surface right after or during a unit that also covers
meiosis. The load-bearing sentence: "mitosis makes cells that need to do
the SAME job as the original, so they need the SAME complete set of
chromosomes — only meiosis, for making gametes, cuts the number in
half." Channel-reality limits owned by `../foundations/
03-voice-first-learning-model.md §7`.

## Assessment Signals

Seed corpus probes are this concept's item bank, supplemented by this
entry's own probe-depth batch addition. A learner who answers the
anaphase-identification `mcq` correctly but fails the chromosome-
halving `misconception_probe` has M1 specifically intact — they know
the STAGE sequence but still misattribute meiosis's chromosome-number
outcome to mitosis, which should route to the purpose-driven recovery
rather than re-teaching stage names. The probe-depth batch's own
skin-wound-healing `short_answer` probe verifies the expert-model
purpose-to-mechanism reasoning specifically, distinct from the
stage-sequencing and chromosome-number checks above.

## Tutor Recovery Strategy

Likeliest utterance: stating that mitosis produces cells with half the
original chromosome number (not distress-shaped — a reasonable,
meiosis-proximity-driven overgeneralization, not a sign of confusion
about mitosis's stages themselves). Concept-specific smaller question:
"does a new skin cell replacing a damaged one need to do the exact same
job as the cell it replaced?" Generic recovery machinery owned by
`../foundations/01-recovery-engine.md`.

## Memory Hooks

**Type**: procedure (an ordered, four-stage sequence) with an embedded
discrimination skill (mitosis vs. meiosis chromosome-number outcome).
Review form: periodic re-presentation of a labelled cell at a named
stage for chromatid-state recall, and periodic re-presentation of a
new cell-division scenario (growth/repair vs. gamete production) for
mitosis-vs-meiosis prediction. Interleaving partners: `bio.cell.meiosis`
(the direct KG unlock, and this concept's own essential contrast
partner) and `bio.cell.cell-cycle` (this concept's own prerequisite,
sharing the chromatid-count-by-stage reasoning skill).

## Transfer Connections

- **Near**: a new cell-cycle-stage scenario, correctly resolved for
  mitosis's stage-specific chromatid state.
- **Far**: recognising the same "two closely-taught processes sharing
  substantial vocabulary but differing in one critical outcome" pattern
  elsewhere (e.g. distinguishing two similar legal procedures that
  share most steps but differ in one consequential outcome).
- **Real-world**: understanding why a bone marrow or skin transplant
  must come from a genetically compatible donor — the transplanted
  cells will divide by mitosis, producing more cells IDENTICAL to
  themselves (and thus identical to the original donor's genetic
  identity), not the recipient's.
- **Expert transfer**: on meeting any claim about "cell division" in
  general, the learner spontaneously asks whether mitosis or meiosis is
  meant, since the two differ critically in outcome despite sharing
  much surface vocabulary.

## Cross-Subject Connections

KG `cross_links` is empty (`[]`). No fabricated cross-subject connection
recorded.

## Blueprint References

No Blueprint exists for this concept at `docs/curriculum/blueprints/
bio.cell.mitosis.md` as of this entry's authoring (confirmed by direct
directory listing — biology has zero Blueprint files in total).

## Runtime Asset References

Seeded in the seed corpus (production DB ACTIVE status not
independently re-verified this session): `src/lib/teaching/assets/
biologySeedAssets.ts` carries `core_explanation` and
`misconception_repair` explanations plus `mcq` (DEVELOPING) and
`misconception_probe` (DEVELOPING) probes, both at gradeBand HIGH;
`src/lib/teaching/assets/biologyDepthSeedAssets.ts` (Batch 2, `bio.cell`)
adds one further `short_answer` probe at gradeBand HIGH, PROFICIENT
difficulty (the skin-wound-healing purpose-to-mechanism check), closing
this concept to the 3-probe asset contract floor. No new asset created
by authoring this entry.

## Curriculum Feedback

None found. This concept's two KG-listed unlocks (`bio.cell.meiosis`,
`bio.repro.asexual-reproduction`) are each a plausible direct
consequence of establishing mitosis's mechanics and purpose.

## Version History

- 2026-09-20 — initial authoring (Biology End-User Readiness Program,
  Wave 2, twenty-ninth entry, strict KG-prerequisite order — third of
  the fourth recomputed frontier, from the 26-concept baseline). No
  Blueprint exists for this concept; the misconception classified
  directly against the concept's own seed content using the
  birth-taxonomy diagnostic procedure.
