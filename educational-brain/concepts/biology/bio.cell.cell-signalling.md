# bio.cell.cell-signalling — Cell Signalling

## Identity
- **Concept ID**: `bio.cell.cell-signalling`
- **Subject**: Biology
- **Domain**: Cell Biology (`bio.cell`)
- **Prerequisites**: `bio.cell.cell-membrane-transport`
- **Unlocks**: `bio.physio.endocrine-system`, `bio.physio.nervous-system`, `bio.mol.signal-transduction-pathways`
- **Cross-links (KG)**: `bio.physio.endocrine-system`
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Mastery threshold**: 0.75
- **Estimated hours**: 5

## Learning Objective
The student can trace the four-step signalling sequence (ligand release, receptor
binding, transduction, response), correctly explain why most protein/peptide hormones
act via surface receptors rather than entering the cell, and correctly classify a
signalling scenario as endocrine, paracrine, autocrine, or synaptic based on signal range
and travel path.

## Core Understanding
Cell signalling allows cells to communicate and coordinate their activity, and follows a
consistent four-step sequence regardless of the specific signal involved. (1) A **signal
molecule (ligand)** — a hormone, neurotransmitter, or growth factor — is released. (2) A
**receptor** on the target cell binds the ligand: **surface receptors** handle
hydrophilic signals, which cannot cross the membrane on their own; **intracellular
receptors** handle hydrophobic signals (steroid hormones specifically can cross the
membrane directly). (3) **Signal transduction**: the binding event triggers a cascade of
intracellular changes, frequently amplified through **second messengers** (cAMP, Ca²⁺,
IP3). (4) A **cellular response** results — a change in gene expression, enzyme
activity, or ion channel state.

Four signalling types are distinguished by range and travel path: **endocrine** (hormones
travel through the bloodstream to reach distant targets), **paracrine** (local signalling
to nearby cells, without bloodstream travel), **autocrine** (a cell signals to itself),
and **synaptic** (nerve cell to target, across a synapse).

The concept's central corrective claim concerns exactly what happens at the moment a
hormone reaches its target: **a common, incorrect assumption is that a hormone or signal
molecule enters the cell directly and activates the response from inside.** For MOST
hormones — specifically peptide and protein hormones like insulin and adrenaline — this
is wrong: these molecules are too large and too hydrophilic to cross the plasma membrane
at all. Instead, they bind to a receptor sitting ON THE SURFACE, and that receptor
triggers an intracellular cascade (often via second messengers like cAMP) from the
inside — **the hormone itself never enters the cell; it "knocks on the door," and the
receptor opens the cellular machinery from within.** Only steroid hormones (which are
lipid-soluble) and thyroid hormones are the exception: these specifically diffuse
directly through the membrane to act on intracellular receptors — this is a genuine,
class-specific exception, not the general rule.

## Mental Models
- **Knock, don't enter**: for the large majority of hormones (peptide/protein-based),
  the signal molecule stays outside the cell entirely — it triggers a response by binding
  a surface receptor, never crossing the membrane itself.
- **The exception is defined by solubility, not by "importance"**: steroid and thyroid
  hormones' ability to cross the membrane directly is a specific consequence of their
  lipid solubility — this is not a special privilege for particularly significant
  hormones, it is a direct chemical property (hydrophobicity) determining membrane
  permeability.
- **Range and path define the signalling type, not the molecule itself**: the same
  general category of molecule (e.g., a growth factor) could in principle be classified
  differently depending on how far and by what path it travels — endocrine, paracrine,
  autocrine, and synaptic are distinguished by that travel pattern, not by molecule
  identity.

## Why Students Fail
1. They default to a "hormone enters the cell and does the work" mental model, since this
   is the more visually/intuitively simple picture (a substance going in and doing
   something), missing that most hormones are excluded from the cell entirely by their
   size and hydrophilicity.
2. They do not yet have hydrophilic/hydrophobic solubility as their default explanatory
   variable for predicting receptor location, so they cannot reliably predict whether a
   given hormone will need a surface or intracellular receptor without being told
   directly.
3. They classify signalling type by the molecule involved rather than by its actual
   travel path and range, leading to errors when a signal that could plausibly be
   "hormonal" is actually acting locally (paracrine) rather than through the bloodstream.

## Misconceptions

### M1 — "Hormones enter the cell directly and activate the response from inside" (Type 1: Overgeneralization)
**Statement**: A hormone reaching its target cell crosses the plasma membrane and
directly interacts with intracellular machinery (enzymes, DNA) to produce its effect.
**Origin**: Overgeneralizing from the genuinely correct case (steroid and thyroid
hormones, which DO cross the membrane directly) to hormones in general, without
separately tracking the size/solubility variable that determines which pathway a given
hormone actually uses.
**Why it persists**: "The hormone enters and acts" is the simpler, more visually
intuitive picture, and without an explicit statement of insulin/adrenaline's specific
exclusion from the cell, the simpler picture is never directly confronted with a
counter-example.
**Repair**: Present insulin (or another familiar peptide hormone) explicitly as a
counter-example: state its size and hydrophilicity directly, and trace its actual
mechanism (surface receptor binding → intracellular cascade via second messengers, e.g.
cAMP) step by step, making clear the hormone molecule itself never crosses the membrane.
**Diagnostic probe**: the existing MCQ asking how insulin affects target cells, with the
enters-the-cell-and-directly-activates-enzymes distractor flagged to this misconception;
reinforced by the existing misconception_probe asking which signal type can cross the
membrane, with protein hormones like insulin as the incorrect (flagged) choice.

### M2 — "Signalling type is determined by the molecule's identity, not its travel path" (Type 4: Notation/mechanism-induced)
**Statement**: Whether a signal counts as endocrine, paracrine, autocrine, or synaptic is
a fixed property of the type of molecule involved (e.g., "growth factors are paracrine,"
"hormones are always endocrine"), rather than depending on the specific travel path in a
given scenario.
**Origin**: The four signalling types are often introduced alongside a single canonical
example molecule for each (a specific hormone for endocrine, a specific growth factor for
paracrine), inviting the inference that the molecule TYPE, not the actual travel pattern,
determines the classification.
**Why it persists**: Without a scenario where the same general molecule category behaves
differently depending on range (e.g., a growth factor acting locally vs. one entering
systemic circulation), the molecule-determines-classification shortcut is never directly
tested and found wanting.
**Repair**: Present a specific scenario explicitly (a damaged cell's growth factor
affecting only nearby cells, never entering the bloodstream) and classify it by asking
only "how far did it travel, and by what route?" — deliberately ignoring the specific
molecule's identity as irrelevant to the classification.
**Diagnostic probe**: the existing probe-depth short_answer presenting exactly this
local-growth-factor scenario and asking for its correct classification (paracrine), with
distractors that incorrectly generalize other signalling types' defining properties.

## Analogies
- The knock-versus-walk-in model: most hormones knock on the cell's surface door
  (receptor binding) and never walk inside; only steroid/thyroid hormones let themselves
  in directly, because they're chemically "keyed" (lipid-soluble) to pass through the
  door itself.
- The delivery-range model for signalling types: endocrine is a package shipped
  city-wide through a delivery network (the bloodstream); paracrine is a note passed to
  the house next door; autocrine is a note left for yourself; synaptic is a message
  delivered directly, hand to hand, at a single specific doorway (the synapse).

## Demonstrations
- Trace insulin's actual mechanism step by step (release → binds surface receptor →
  triggers intracellular cascade via second messengers → cellular response), explicitly
  marking the point at which the hormone molecule itself stops (at the membrane surface).
- Present several signalling scenarios varying only in range/path (same type of molecule,
  different travel distances) and have students classify each by path alone, deliberately
  holding molecule identity constant to isolate the correct classifying variable.

## Discovery Questions
- "Insulin is a protein. Proteins are generally too large and too hydrophilic to cross
  a lipid membrane easily. Given that, how does insulin actually get its message into a
  cell?"
- "If a growth factor released by a damaged cell only affects neighboring cells and never
  enters the bloodstream, is it accurate to call this the same 'type' of signalling as a
  hormone traveling to a distant organ? What's actually different?"
- "Steroid hormones can cross the membrane directly, but most protein hormones can't.
  What specific chemical property explains this difference?"

## Teaching Sequence
1. Introduce the four-step signalling sequence (ligand release, receptor binding,
   transduction, response) as a general framework before specifying receptor location.
2. Present the surface-vs-intracellular receptor distinction, anchored explicitly to
   hydrophilic/hydrophobic solubility as the deciding variable.
3. Walk insulin's mechanism as the primary counter-example to the
   hormone-enters-directly misconception, tracing its full surface-receptor-to-cascade
   pathway.
4. Introduce the four signalling types (endocrine, paracrine, autocrine, synaptic),
   deliberately emphasizing travel path/range as the classifying variable, independent of
   molecule identity.
5. Present the local-growth-factor scenario directly, requiring path-based (not
   molecule-based) classification to correctly identify it as paracrine.
6. Close by previewing `bio.mol.signal-transduction-pathways`'s fuller treatment of the
   intracellular cascade mechanics only introduced generally here.

## Tutor Actions
- If a student describes a hormone entering the cell directly: ask them to name the
  hormone's approximate size and solubility class before accepting any claim about it
  crossing the membrane.
- If a student classifies a signalling scenario by molecule type alone: ask them to
  state the actual travel distance and route in the specific scenario before assigning a
  classification.
- If a student cannot explain why steroid hormones are an exception: ask them to name the
  specific chemical property (lipid solubility) that distinguishes steroids from
  peptide/protein hormones.

## Voice Teaching Notes
Say "does it cross the membrane, or knock on it?" whenever a hormone's mechanism is being
discussed, to keep the surface/intracellular receptor distinction as the first question
asked. Say "how far, and by what route?" as the standing diagnostic question for
signalling-type classification, deliberately excluding molecule identity from the
answer.

## Assessment Signals
- **Early recovery**: after tracing insulin's mechanism, correctly predicts that a novel
  peptide hormone would also require a surface receptor, without needing this restated.
- **Fragile**: can state "most hormones use surface receptors" as a memorized fact but
  still describes a hormone "entering" the cell when asked to narrate the mechanism in
  their own words.
- **Deep gap**: continues to classify signalling type by molecule identity after the
  path-based classification exercise has been explicitly done — indicates the
  travel-path criterion was never actually adopted as the deciding variable.

## Tutor Recovery Strategy
For M1, do not just restate "insulin doesn't enter the cell" — ask the student to state
insulin's specific chemical properties (size, hydrophilicity) themselves and derive the
membrane-exclusion conclusion from those properties, rather than being told the
conclusion directly. For M2, present a fresh signalling scenario (a different molecule
type than previously discussed) and ask the student to classify it using only the
travel-path question, testing whether the path-based criterion (not a memorized
molecule-to-type mapping) has actually been adopted.

## Memory Hooks
- "Most hormones knock. Steroids and thyroid hormones walk right in."
- "Solubility decides receptor location — hydrophilic outside, hydrophobic can cross."
- "Classify by distance and route, never by the molecule's name."

## Transfer Connections
- `bio.cell.cell-membrane-transport`: the hydrophilic/hydrophobic distinction and
  membrane permeability principles established there directly determine receptor
  location here.
- `bio.physio.endocrine-system` (unlocks, cross-linked in the KG): develops the
  endocrine signalling type introduced here into the full hormone/gland physiological
  system.
- `bio.mol.signal-transduction-pathways` (unlocks): develops the second-messenger
  cascade mechanics introduced generally here into full biochemical detail.

## Cross-Subject Connections
The KG's own `cross_links` field already connects this concept within biology to
`bio.physio.endocrine-system`; no additional cross-subject connection is authored here.

## Blueprint References
No Blueprint exists for biology as a subject (per the standing note for this authoring
campaign); classification of both misconceptions above was performed directly against
`biologySeedAssets.ts`'s existing seed content and the probe-depth campaign's own
paracrine-classification short_answer probe, using the birth-taxonomy diagnostic
procedure (`educational-brain/misconceptions/01-birth-taxonomy.md`).

## Runtime Asset References
- `core_explanation` (HIGH band): four-step signalling sequence, surface vs.
  intracellular receptors, four signalling types — `biologySeedAssets.ts`,
  `CELLSIG_EXPLANATIONS[0]`.
- `misconception_repair` (HIGH band): hormones-mostly-use-surface-receptors correction
  with insulin as the counter-example; steroid/thyroid hormones as the genuine exception
  — `CELLSIG_EXPLANATIONS[1]`.
- `mcq` (PROFICIENT): insulin's mechanism of action, enters-and-directly-activates
  distractor flagged to M1 — `CELLSIG_PROBES[0]`.
- `misconception_probe` (PROFICIENT): which signal type crosses the membrane directly,
  protein-hormones-like-insulin distractor flagged to M1 — `CELLSIG_PROBES[1]`.
- `short_answer` (PROFICIENT, probe-depth Batch 1): local-growth-factor
  paracrine-classification task, directly evidencing M2's diagnostic and closing this
  concept's 3-probe floor — `biologyDepthSeedAssets.ts`, conceptId
  `bio.cell.cell-signalling`.

## Curriculum Feedback
None — the KG description (signal molecules and receptors, signal transduction pathways,
second messengers, paracrine/endocrine/autocrine signalling) matches the seed corpus's
actual coverage closely; synaptic signalling is covered in the seed content though not
separately named in the KG description — a minor scope note rather than a gap worth
flagging.

## Version History
- 2026-09-20: Initial authoring (nineteenth recomputed topological frontier, batch of 3
  with `bio.micro.viral-replication` and `bio.cell.apoptosis`), EB concept 73/199.
