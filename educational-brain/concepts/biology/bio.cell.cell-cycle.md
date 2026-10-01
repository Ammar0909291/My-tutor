# The Cell Cycle — `bio.cell.cell-cycle`

## Identity

- **Concept ID**: `bio.cell.cell-cycle` (canonical biology KG)
- **Curriculum location**: biology / cell biology (`bio.cell`)
- **Prerequisites**: `bio.cell.nucleus-chromosomes` — the load-bearing
  part is the chromatid-count-tracks-cell-cycle-stage principle already
  established there; the cell cycle is the actual timeline that
  principle was describing, now named and given its own checkpoints and
  regulatory machinery.
- **Unlocks** (from KG): `bio.cell.mitosis`, `bio.cell.apoptosis`,
  `bio.cell.cancer-biology-hallmarks` — the cell cycle's phases and
  checkpoints are the direct prerequisite for mitosis's mechanics, for
  understanding programmed cell death as a cycle-integrated decision,
  and for cancer biology's central claim that checkpoint failure is a
  necessary step toward malignancy.
- **Difficulty**: proficient · **Bloom**: analyze · **Mastery
  threshold**: 0.75 · **Est. hours**: 4

## Learning Objective

The learner can: name and order the cell cycle's phases (G1, S, G2 —
together interphase — then M phase, comprising mitosis and cytokinesis)
and state what happens in each; correctly identify interphase as the
most metabolically active part of the cycle, not a resting period;
name the three checkpoints (G1/S, G2/M, spindle assembly) and what each
one verifies before allowing progression; and explain, at least at an
outline level, how cyclin-CDK regulation drives checkpoint transitions
and why checkpoint failure (e.g. loss of functional p53) is a
pathological step toward cancer.

## Core Understanding

The cell cycle has two major phases: interphase, comprising roughly 90%
of the cycle's duration, and M phase, the remaining brief but visually
dramatic period. Interphase itself has three sub-stages: G1 (the cell
grows and synthesises proteins and organelles), S (DNA synthesis — the
entire genome is duplicated, producing sister chromatids), and G2
(further growth and preparation for division, including verifying
replication completed correctly). M phase comprises mitosis (nuclear
division, partitioning duplicated chromosomes into two daughter nuclei)
and cytokinesis (division of the cytoplasm into two separate cells).
Progression through the cycle is not automatic — three checkpoints
patrol key transitions: the G1/S checkpoint (verifying DNA is
undamaged and nutrients/growth signals are adequate before committing
to replication), the G2/M checkpoint (verifying DNA replication
completed fully and without damage before committing to division), and
the spindle assembly checkpoint (verifying every chromosome is properly
attached to spindle fibres before allowing anaphase to proceed).
Cyclin proteins accumulate and fall in a cyclical pattern across the
cycle, partnering with constitutively-present CDKs (cyclin-dependent
kinases) to form active complexes that drive each checkpoint
transition — the cyclin, not the CDK, is the regulated, cycle-timed
component. Checkpoint integrity depends on functional tumour-suppressor
proteins (most centrally p53 at the G1/S checkpoint); when a mutation
disables such a checkpoint protein, damaged or incompletely replicated
DNA is no longer reliably caught, and a cell can proceed to divide
while carrying mutations — one necessary (though not by itself
sufficient) step on the path to cancer.

## Mental Models

- **Beginner model — "interphase is the resting phase, mitosis is the
  active phase"**: the learner's mental model tracks visible drama
  (chromosome condensation, nuclear envelope breakdown) as "activity"
  and treats the visually quiet interphase as inactivity.
- **Intermediate model — "the cell divides whenever it's ready, on a
  fixed timer"**: the direct substrate of a natural follow-on
  misconception — treating cycle progression as automatic/scheduled
  rather than checkpoint-gated. Upgrade trigger: being shown that a cell
  with damaged DNA can be HELD at a checkpoint indefinitely, not merely
  slowed.
- **Advanced model — "checkpoints as quality-control gates, each
  checking a specific condition"**: the learner can state which
  specific condition each of the three checkpoints verifies, and
  predicts what happens to a cell that fails a given checkpoint (arrest,
  repair, or apoptosis — not simply "the cycle continues anyway").
- **Expert model — "checkpoint failure as a necessary step toward
  malignancy, not merely faster growth"**: the learner understands that
  cancer is not simply "cells growing too fast" but specifically cells
  that have lost the checkpoint machinery that would otherwise catch
  and correct/eliminate damaged genetic material — connecting cell-cycle
  regulation directly to a major disease mechanism.
- **Do not upgrade early**: a learner still treating interphase as
  "resting" should not be advanced to checkpoint-failure/cancer
  reasoning — without first correcting the activity-level
  misconception, "checkpoint failure lets a resting cell divide
  early" would be a plausible-sounding but structurally wrong
  restatement of the correct mechanism.

## Why Students Fail

Textbook and classroom time allocation mirrors visual drama rather than
biological duration or importance: mitosis's visibly dramatic events
(chromosome condensation, spindle formation, nuclear envelope
breakdown) receive extended, illustrated, named-phase treatment, while
interphase — which occupies roughly 90% of the actual cycle and
performs the bulk of the cell's genuinely difficult biochemical work
(duplicating a 3-billion-base-pair genome with high fidelity) — is
often introduced as a single, undifferentiated "resting" label before
the visually interesting part begins.

## Misconceptions

No Blueprint exists yet for this concept; both misconceptions
classified directly against the concept's own seed content using the
birth-taxonomy diagnostic procedure
(`../../misconceptions/01-birth-taxonomy.md`).

- **M1 — "The cell is resting during interphase" (Type 5,
  instruction-induced)**: born from the conventional pedagogical
  practice of naming and dramatizing mitosis's visible sub-phases in
  detail while introducing "interphase" as a single, comparatively
  under-elaborated label — the resulting IMBALANCE OF ATTENTION is
  misread by the learner as reflecting an imbalance of actual cellular
  activity. Matches Type 5's signature: a specific, nameable teaching
  convention (differential elaboration of cycle phases), not an
  individual reasoning slip. Characteristic phrase: describing
  interphase as "resting," "recovering," or "waiting" before division.
  Verbatim detection probe (seed corpus, `misconception_probe`): "Is a
  cell 'resting' during interphase?" Recovery path: name the specific,
  massive biochemical task interphase performs (duplicating the entire
  genome in S phase) and contrast its metabolic activity level directly
  against mitosis's comparatively brief, purely mechanical
  partitioning process. Verification-of-death: given a description of a
  cell's biochemical activity level at a named cycle stage, the learner
  correctly identifies whether that stage is interphase or M phase,
  without defaulting to "interphase = low activity."
- **M2 — "DNA replication happens during G1, not S phase" (Type 4,
  notation-induced)**: born from G1, S, and G2's similarly-abbreviated,
  closely-presented labels, where the ordinal-sounding "G1" (which
  visually suggests "first," i.e. "where the main event happens") is
  sometimes mismatched against "S" (whose letter alone does not
  obviously signal "synthesis" to a learner encountering the
  abbreviation for the first time). Matches Type 4's signature:
  confusion driven by co-presented, similarly-styled technical labels,
  not a conceptual misunderstanding of the cycle's actual biology.
  Characteristic phrase: naming G1 (or G2) as the DNA-replication phase.
  Verbatim detection probe (seed corpus, `mcq`): "During which phase of
  interphase is the cell's DNA replicated?" (G1 is the flagged wrong
  choice). Recovery path: anchor the letter "S" explicitly to
  "Synthesis" (of DNA) as the mnemonic, and contrast it against G1/G2's
  shared "Gap" meaning (gaps of growth surrounding the one specific
  synthesis event). Verification-of-death: the learner correctly orders
  G1 → S → G2 by function without hesitation when asked cold.

## Analogies

- **Best analogy — a factory's pre-production, production, and
  quality-control-gated shipping stages**: G1/S/G2 (design, tooling,
  and final checks) require far more total time and labour than the
  actual shipping event (M phase), even though shipping is the visibly
  dramatic, externally observable moment — directly parallels
  interphase's dominant share of total cycle time and work.
- **Alternative — proofreading a manuscript before publication, not
  publishing on a fixed schedule**: publication (division) happens only
  once the manuscript (DNA) has passed every proofreading checkpoint,
  not automatically after a fixed elapsed time — useful for the
  checkpoint-gated, non-automatic nature of progression.
- **Story analogy — the G1/S/G2 "Gap-Synthesis-Gap" naming logic
  itself**: G1 and G2 are literally named for being "gaps" surrounding
  the one specific "Synthesis" event, turning the letter-confusion risk
  (M2) into a self-explaining mnemonic once stated explicitly.
- **ANTI-ANALOGY — do NOT say "interphase is like a coffee break
  between the real work of mitosis"**: this directly installs M1 by
  framing interphase as a pause rather than the majority of the cycle's
  actual biochemical labour.

## Demonstrations

- **Discrimination demonstration — activity-level ranking**: present a
  list of specific cellular activities (genome duplication, chromosome
  condensation, protein synthesis, spindle attachment) and have the
  learner assign each to interphase or M phase before being told,
  surfacing the mismatch between visible drama and actual biochemical
  workload.
- **Teacher-demo — checkpoint arrest simulation**: walk through a
  scenario where a cell's G1/S checkpoint detects DNA damage, and trace
  what happens next (arrest, repair attempt, or apoptosis if damage is
  irreparable) rather than assuming the cycle simply continues on
  schedule regardless.

## Discovery Questions

A genuine discovery design fits: **Need** — "if mitosis is the exciting,
dramatic part of cell division, why does it only take up about 10% of
the total cycle time?" **Playground** — the learner examines what a cell
is actually doing, biochemically, during the other 90% (protein
synthesis, genome duplication). **Invention** — the learner proposes
that "resting" cannot be right if the genome is being fully duplicated
during that time. **Collision** — confronted with the conventional
"interphase = resting phase" label many textbooks use without
elaboration, creating tension with the just-reasoned conclusion.
**Formalization** — G1/S/G2's specific biochemical activities and their
combined dominance of total cycle time are stated explicitly.
**Compression** — given any described cellular activity, the learner
places it correctly on the cycle timeline without hesitation.

## Teaching Sequence

The G1-S-G2-M phase sequence and each phase's specific activity should
be taught with EXPLICIT relative-duration information (interphase ~90%,
M phase ~10%) from the first introduction — introducing the four-letter
phase sequence without duration context leaves the "which part is the
real activity" question unresolved and open to the mitosis-is-the-real-
event assumption settling by default. Checkpoints should be introduced
only after all four phases and their activities are secure, since
checkpoint reasoning requires knowing what each transition is actually
verifying readiness FOR.

## Tutor Actions

From `../../teaching-actions/`: **Definition/Orientation** (the four
phases, their durations, their activities) → **Error Analysis** (the
interphase-is-resting misconception probe) → **Discrimination**
(activity-to-phase assignment) → **Causal Reasoning** (checkpoint
failure → cancer risk). **What doesn't fit**: introducing checkpoints
before the phase sequence and relative durations are secure.

## Voice Teaching Notes

Listen for "resting," "recovering," or "waiting" used to describe
interphase — M1's clearest verbal signature. Also listen for G1 named
as the DNA-replication phase — M2's signature. The load-bearing
sentence: "interphase is when the cell copies its ENTIRE genome — that
is not resting, that is the hardest biochemical job the cell does all
cycle." Channel-reality limits owned by `../foundations/
03-voice-first-learning-model.md §7`.

## Assessment Signals

Seed corpus probes are this concept's item bank. A learner who answers
the S-phase-location `mcq` correctly but fails the interphase-is-resting
`misconception_probe` has M1 specifically intact — they know WHEN
replication happens but still under-weight its metabolic significance,
which should route to the activity-level-ranking recovery rather than
re-teaching phase order. A learner who fails the `mcq` itself (selecting
G1) has M2 and needs the Gap-Synthesis-Gap mnemonic first. The
probe-depth batch's own p53/checkpoint-failure `short_answer` probe
verifies the expert-model cancer-mechanism reasoning specifically.

## Tutor Recovery Strategy

Likeliest utterance: describing interphase dismissively as a pause or
break when asked what the cell is doing between divisions (not
distress-shaped — a common, low-stakes labelling gap, not a sign of
deeper confusion). Concept-specific smaller question: "if the cell has
46 chromosomes before division and still has 46 after, but each daughter
cell also needs a full copy of the genome — when does that copying
actually have to happen?" Generic recovery machinery owned by
`../foundations/01-recovery-engine.md`.

## Memory Hooks

**Type**: procedure (an ordered, checkpoint-gated sequence) with an
embedded causal-reasoning skill (checkpoint failure → cancer). Review
form: periodic re-presentation of a named cellular activity for
phase-placement, and periodic re-presentation of a checkpoint-failure
scenario for consequence prediction. Interleaving partners:
`bio.cell.mitosis` (the direct KG unlock, covering M phase's own
sub-stages in detail) and `bio.cell.nucleus-chromosomes` (this
concept's own prerequisite, sharing the chromatid-count-by-stage
reasoning skill).

## Transfer Connections

- **Near**: a new described cellular activity, correctly placed on the
  cycle timeline.
- **Far**: recognising the same "visible drama gets disproportionate
  attention relative to actual duration/importance" pattern elsewhere
  (e.g. news coverage of dramatic but brief events versus slower,
  larger-impact ongoing processes).
- **Real-world**: understanding why cancer treatments (chemotherapy,
  radiation) often specifically target rapidly-dividing cells or
  checkpoint-related pathways, since uncontrolled division is
  fundamentally a checkpoint-failure problem.
- **Expert transfer**: on meeting any claim that a biological process
  "isn't doing anything" during an apparently quiet period, the learner
  spontaneously asks what specific biochemical work might actually be
  occurring beneath the visible surface.

## Cross-Subject Connections

KG `cross_links` is empty (`[]`). No fabricated cross-subject connection
recorded.

## Blueprint References

No Blueprint exists for this concept at `docs/curriculum/blueprints/
bio.cell.cell-cycle.md` as of this entry's authoring (confirmed by
direct directory listing — biology has zero Blueprint files in total).

## Runtime Asset References

Seeded in the seed corpus (production DB ACTIVE status not
independently re-verified this session): `src/lib/teaching/assets/
biologySeedAssets.ts` carries `core_explanation` and
`misconception_repair` explanations plus `mcq` (DEVELOPING) and
`misconception_probe` (DEVELOPING) probes, both at gradeBand HIGH;
`src/lib/teaching/assets/biologyDepthSeedAssets.ts` (Batch 2, `bio.cell`)
adds one further `short_answer` probe at gradeBand HIGH, PROFICIENT
difficulty (the p53/checkpoint-failure causal-reasoning check), closing
this concept to the 3-probe asset contract floor. No new asset created
by authoring this entry.

## Curriculum Feedback

None found. This concept's three KG-listed unlocks (`bio.cell.mitosis`,
`bio.cell.apoptosis`, `bio.cell.cancer-biology-hallmarks`) are each a
plausible direct consequence of establishing cell-cycle structure and
checkpoint regulation.

## Version History

- 2026-09-20 — initial authoring (Biology End-User Readiness Program,
  Wave 2, twenty-first entry, strict KG-prerequisite order — first of
  the frontier recomputed from the 20-concept baseline). No Blueprint
  exists for this concept; both misconceptions classified directly
  against the concept's own seed content using the birth-taxonomy
  diagnostic procedure.
