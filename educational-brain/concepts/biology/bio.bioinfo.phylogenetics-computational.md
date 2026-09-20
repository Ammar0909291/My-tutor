# bio.bioinfo.phylogenetics-computational — Computational Phylogenetics

## Identity
- **Concept ID**: `bio.bioinfo.phylogenetics-computational`
- **Subject**: Biology
- **Domain**: Bioinformatics (`bio.bioinfo`)
- **Prerequisites**: `bio.bioinfo.sequence-alignment`, `bio.evo.modern-synthesis-speciation`, `bio.div.cladistics-phylogenetic-thinking`
- **Unlocks**: `bio.evo.phylogeography-biogeography`
- **Cross-links (KG)**: (none)
- **Difficulty**: research
- **Bloom level**: analyze
- **Mastery threshold**: 0.80
- **Estimated hours**: 7

## Learning Objective
The student can correctly interpret a bootstrap value as the percentage of resampled
datasets recovering a specific clade (a support MEASURE, not a sequence-identity
percentage), correctly reject "basal branching position means more primitive" as a
misreading of tree topology, and correctly explain why a single gene's tree can
genuinely diverge from the true species tree (gene duplication/loss, lateral transfer,
incomplete lineage sorting) without any computational error being involved.

## Core Understanding
Computational phylogenetics infers the evolutionary relationships among taxa from
molecular sequence data, extending the sequence-alignment methods already covered into
full tree-building. The general workflow proceeds: align sequences → choose an
evolutionary MODEL → infer a tree → assess confidence. **Evolutionary models** (GTR for
DNA; LG/WAG for protein) specify the RATES at which different nucleotide or amino acid
substitutions occur; **model selection** (using AIC/BIC statistics) chooses the
SIMPLEST model that adequately fits the observed data, rather than the most complex
model available.

Several distinct **tree-inference methods** exist, each with different tradeoffs:
**distance-based methods** (Neighbour-Joining) are fast but do not explicitly model
uncertainty; **parsimony** methods (fewest evolutionary changes) can FAIL specifically
under high substitution rates, due to a phenomenon called long-branch attraction;
**maximum likelihood** finds the tree topology and branch lengths that MAXIMISE the
probability of the observed data under the chosen model — more statistically principled
but computationally intensive; and **Bayesian inference** samples the POSTERIOR
distribution of possible trees using MCMC, providing a probability distribution over
trees rather than just a single best estimate.

**Branch support** — how confident we should be in a specific inferred grouping (clade)
— is assessed differently depending on the method used: maximum-likelihood analyses
report **bootstrap values** (the specific percentage of trees, inferred from
RESAMPLED versions of the original dataset, that recover that same clade — a
statistical support measure, NOT a measure of sequence identity between the taxa in that
clade), while Bayesian analyses report **posterior probabilities** directly.
Phylogenies built this way have wide practical application: taxonomy, tracing pathogen
transmission (e.g., SARS-CoV-2 lineage tracking), inferring protein function via
synteny (conserved gene order), and DATING evolutionary events using calibrated
molecular clocks.

Two specific corrective points are essential for correctly INTERPRETING a phylogenetic
tree once built. First, phylogenetic trees are HYPOTHESES about evolutionary history,
not proven facts — a tree is only as reliable as the alignment, model, and data
underlying it. A persistent misreading treats the ROOT (or any BASAL branching position)
of a tree as representing "the most primitive" or "least evolved" organism — this is
incorrect: EVERY tip of a fully resolved tree has been evolving for EXACTLY the same
total amount of time since the root, and NONE is ancestral to any other tip. Describing
an extant species as "primitive" specifically confuses a BASAL phylogenetic POSITION
with an absence of evolutionary CHANGE — bacteria, for example, have been evolving for
roughly 3.5 billion years and are not "simple" in any genuinely biochemical sense.
Second, a **gene tree is NOT the same as a species tree**: gene duplication, gene loss,
lateral gene transfer, and incomplete lineage sorting can all cause a single gene's
inferred history to genuinely DIVERGE from the actual speciation history of the
organisms carrying it — this divergence reflects real, distinct biological processes,
not a computational error or a sequencing failure.

## Mental Models
- **Every tip is equally "old" since the root — the tree has no living fossils among its
  tips**: think of every currently-living tip of a fully resolved tree as having run for
  EXACTLY the same amount of elapsed time since the shared root, regardless of how many
  branch points ("splits") lie between the root and that tip — branching EARLY does not
  mean stopping the clock early.
- **Bootstrap as "how often does this grouping survive resampling?"**: think of bootstrap
  values as repeatedly re-running the tree-building analysis on slightly resampled
  versions of the same data and asking, specifically, how often the SAME grouping
  reappears — a high percentage means the grouping is a robust, repeatable finding, not
  a measure of how similar the sequences themselves are.

## Why Students Fail
1. They interpret a bootstrap value as if it directly measured DNA sequence identity
   between the taxa in a clade, or conflate it with a Bayesian posterior probability,
   missing that it specifically measures how OFTEN that grouping recurs across
   resampled datasets.
2. They interpret a basal (early-branching) position in a tree as indicating an
   organism is "primitive" or "less evolved," missing that every tip has evolved for the
   SAME total elapsed time since the shared root.
3. They treat a discrepancy between a gene tree and the accepted species tree as
   necessarily a computational error or sequencing mistake, missing that specific
   biological processes (duplication, loss, lateral transfer, incomplete lineage
   sorting) can genuinely produce such discrepancies.

## Misconceptions

### M1 — "A species that branches earlier in a tree is more primitive or less evolved" (Type 1: Overgeneralization)
**Statement**: An organism occupying a BASAL (early-branching) position in a
phylogenetic tree is assumed to be more "primitive," "simple," or "less evolved" than
organisms occupying more recently-branching positions, on the reasoning that branching
earlier implies fewer subsequent evolutionary changes.
**Origin**: Overgeneralizing from the tree's VISUAL layout (basal branches appearing
closer to the root, which is intuitively associated with "earlier" or "simpler") to an
incorrect inference about the ACTUAL amount of evolutionary change each lineage has
accumulated since that branch point.
**Why it persists**: A tree diagram's left-to-right or bottom-to-top visual flow
naturally suggests a progression from "less evolved" to "more evolved," even though
every tip in a fully resolved tree has, in fact, accumulated its OWN lineage's changes
over the identical elapsed time since the common ancestor.
**Repair**: State explicitly that every tip of a fully resolved tree has evolved for
EXACTLY the same total time since the root — a basal branching position reflects WHEN a
lineage's ancestors split off from other lineages, not how MUCH that lineage has
subsequently changed. Use bacteria as the concrete counter-example: despite occupying
basal, ancient-looking positions in trees of life, bacteria have been evolving for
roughly 3.5 billion years and are biochemically sophisticated, not "simple."
**Diagnostic probe**: the existing misconception_probe presenting a student's "sharks
are more primitive than humans because they branch off earlier" claim, with the
fewer-total-changes distractor flagged to this misconception.

### M2 — "A bootstrap value measures DNA sequence identity within a clade" (Type 4: Notation/mechanism-induced)
**Statement**: A reported bootstrap value (e.g., 95%) is interpreted as measuring the
percentage of DNA sequence identity SHARED among the taxa grouped in that clade, or is
conflated with a Bayesian posterior probability for that clade.
**Origin**: Both bootstrap values and sequence-identity percentages are reported as
percentages in bioinformatics output, and without an explicit statement of what a
bootstrap value SPECIFICALLY measures (recovery frequency across resampled datasets),
the two distinct percentage-based statistics can blend into a single undifferentiated
"how similar/confident is this" number.
**Why it persists**: The resampling procedure underlying bootstrap values (repeatedly
resampling the alignment and re-running tree inference) is a more abstract statistical
concept than simple sequence identity, so without walking through the actual resampling
procedure, "percentage = similarity" can substitute as an intuitive but incorrect
shortcut.
**Repair**: State explicitly what a bootstrap value specifically measures: the
PERCENTAGE of trees, inferred from RESAMPLED versions of the original alignment, that
recover that SAME specific clade — a statistical support measure for that grouping's
ROBUSTNESS to resampling, entirely distinct from sequence identity (a property of the
raw sequences) and distinct from a Bayesian posterior probability (which comes from a
different inference procedure, MCMC sampling of the posterior distribution).
**Diagnostic probe**: the existing mcq asking what a high bootstrap value indicates,
with both the sequence-identity distractor and the Bayesian-posterior-probability
distractor flagged to this misconception.

## Analogies
- The "how much has this lineage's clock run?" model for M1: every tip's internal clock
  has been running for the SAME total duration since the shared root, regardless of
  where its branch point sits in the diagram — a basal branch point tells you WHEN a
  split happened, not how much subsequent "aging" (evolutionary change) occurred along
  either resulting branch.
- The repeated-poll model for bootstrap values: imagine re-running the same election
  poll many times with slightly different random samples of voters each time, and
  checking how often the SAME candidate wins — a bootstrap value works the same way for
  a tree grouping, checking how often the SAME clade appears across resampled datasets,
  which is a measure of ROBUSTNESS, not of how "similar" the voters (sequences) are to
  each other.

## Demonstrations
- Present the shark/human "primitive" claim directly, asking the student to state how
  much elapsed time has passed for BOTH lineages since their shared common ancestor,
  correcting the primitive misreading using that shared duration.
- Present a gene-tree-versus-species-tree mismatch scenario explicitly, asking the
  student to name the SPECIFIC biological process (not a computational error) that
  could explain the discrepancy.

## Discovery Questions
- "If a shark lineage branched off earlier in a tree than the human lineage, has the
  shark lineage had LESS time to evolve since the common ancestor, or the SAME amount of
  time? What follows from your answer?"
- "A bootstrap value of 95% is reported for a clade. Does this tell you the taxa in that
  clade are 95% genetically identical? What does it actually tell you?"
- "A gene tree built from one specific gene shows a different branching pattern than the
  accepted species tree for the same organisms. Does this necessarily mean someone made
  a computational mistake? What else could explain it?"

## Teaching Sequence
1. Introduce the general phylogenetics workflow (align → model → infer → assess
   confidence) before discussing specific inference methods.
2. Present the different tree-inference methods (distance-based, parsimony, ML,
   Bayesian) and their tradeoffs.
3. Introduce bootstrap values and posterior probabilities, directly correcting the
   bootstrap-as-sequence-identity misconception.
4. Directly correct the basal-branching-means-primitive misconception using the
   shark/human and bacteria examples.
5. Close by introducing the gene-tree-versus-species-tree distinction, using the
   discrepancy-explanation scenario to reinforce that real biological processes (not
   computational error) can produce this mismatch.

## Tutor Actions
- If a student describes a basal-branching organism as "primitive": ask them to state
  how much elapsed evolutionary time has passed for that lineage versus a
  more-recently-branching lineage since their shared common ancestor.
- If a student equates a bootstrap value with sequence identity: ask them what
  SPECIFIC procedure (resampling and re-inference) produces a bootstrap value, to
  surface the actual statistical meaning.
- If a student attributes a gene-tree/species-tree mismatch to computational error: ask
  them to name a SPECIFIC biological process that could produce this pattern instead.

## Voice Teaching Notes
Say "same total time, different branch point" whenever basal branching position comes
up, to keep the equal-elapsed-time framing explicit. Say "how often does it come back?"
whenever bootstrap values are discussed, to keep the resampling-based support framing
distinct from a sequence-identity reading.

## Assessment Signals
- **Early recovery**: correctly rejects a novel "primitive because basal" claim, and
  correctly interprets a novel bootstrap value as a resampling-based support measure,
  without needing either restated.
- **Fragile**: can recite "basal doesn't mean primitive" as a memorized correction but
  cannot explain WHY (equal elapsed time since the root) when asked to justify it.
- **Deep gap**: continues to describe an early-branching organism as more primitive, or
  continues to interpret a bootstrap value as sequence identity, after both have been
  explicitly worked through.

## Tutor Recovery Strategy
For M1, present the shark/human scenario and ask the student to state, specifically,
how much time has elapsed for EACH lineage since their shared common ancestor, deriving
the "equal elapsed time" conclusion themselves rather than accepting a restated
correction. For M2, ask the student to describe, step by step, what the bootstrap
RESAMPLING PROCEDURE actually does, checking whether they can connect that procedure to
what the resulting percentage measures.

## Memory Hooks
- "Every tip has run the same clock since the root — basal doesn't mean behind."
- "Bootstrap: how often does this grouping survive resampling? Not how similar the
  sequences are."
- "A gene tree can genuinely differ from the species tree — duplication, loss, lateral
  transfer, or incomplete lineage sorting, not a mistake."

## Transfer Connections
- `bio.bioinfo.sequence-alignment` (prerequisite): supplies the alignment step this
  concept builds tree inference on top of.
- `bio.evo.modern-synthesis-speciation` (prerequisite): supplies the speciation
  framework this concept applies computational tree-building methods to.
- `bio.div.cladistics-phylogenetic-thinking` (prerequisite): supplies the shared-
  derived-character and monophyletic-group concepts this concept operationalises
  computationally.
- `bio.evo.phylogeography-biogeography` (unlocks): extends the phylogenetic inference
  introduced here into geographic distribution analysis.

## Cross-Subject Connections
No cross-subject connection is authored; the KG's own `cross_links` field for this
concept is empty.

## Blueprint References
No Blueprint exists for biology as a subject (per the standing note for this authoring
campaign); both misconceptions above were classified directly against
`biologySeedAssets.ts`'s existing seed content and the probe-depth campaign's own
gene-tree-vs-species-tree discrepancy-explanation short_answer probe, using the
birth-taxonomy diagnostic procedure (`educational-brain/misconceptions/01-birth-taxonomy.md`).

## Runtime Asset References
- `core_explanation` (UNDERGRADUATE band): phylogenetics workflow, evolutionary models,
  tree-inference methods (distance/parsimony/ML/Bayesian), branch support, applications
  — `biologySeedAssets.ts`, `PHYLOCOMP_EXPLANATIONS[0]`.
- `misconception_repair` (UNDERGRADUATE band): trees-as-hypotheses, basal-position-not-
  primitive correction, gene-tree-vs-species-tree distinction — `PHYLOCOMP_EXPLANATIONS[1]`.
- `mcq` (PROFICIENT): what a high bootstrap value indicates, sequence-identity and
  Bayesian-posterior-probability distractors flagged to M2 — `PHYLOCOMP_PROBES[0]`.
- `misconception_probe` (DEVELOPING): "sharks are more primitive" claim evaluation,
  fewer-total-changes distractor flagged to M1 — `PHYLOCOMP_PROBES[1]`.
- `short_answer` (PROFICIENT, probe-depth Batch 15): gene-tree-vs-species-tree
  discrepancy-explanation task, closing this concept's 3-probe floor —
  `biologyDepthSeedAssets.ts`, conceptId `bio.bioinfo.phylogenetics-computational`.

## Curriculum Feedback
No additional Curriculum Feedback gap beyond the seed corpus is recorded for this entry
— the KG description's named sub-topics (distance-based and character-based tree-
building methods, molecular clock hypothesis, interpreting phylogenetic trees from
sequence data) are all directly covered by the existing seed content.

## Version History
- 2026-09-20: Initial authoring (thirty-second recomputed topological frontier, batch
  of 3 with `bio.evo.molecular-evolution` and `bio.sys.gene-regulatory-networks`, all
  seed-content-backed), EB concept 112/199.
