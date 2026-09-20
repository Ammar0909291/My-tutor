# bio.immuno.mhc-antigen-presentation — MHC and Antigen Presentation

## Identity
- **Concept ID**: `bio.immuno.mhc-antigen-presentation`
- **Subject**: Biology
- **Domain**: Immunology (`bio.immuno`)
- **Prerequisites**: `bio.immuno.innate-adaptive-immunity`, `bio.mol.proteins-structure`
- **Unlocks**: `bio.immuno.t-cell-development-tolerance`
- **Cross-links (KG)**: `bio.mol.translation-genetic-code`
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Mastery threshold**: 0.75
- **Estimated hours**: 4

## Learning Objective
The student can correctly assign MHC class I vs. class II to a given infection scenario
based on cell type and peptide origin, correctly state that T cells only recognize
MHC-presented peptides (never free antigens directly), and correctly explain transplant
rejection as a direct consequence of MHC restriction rather than a generic immune
overreaction.

## Core Understanding
MHC (Major Histocompatibility Complex) molecules display peptide fragments on a cell's
surface specifically so T cells can inspect them — this display step is the entire
mechanism by which T cells learn what is happening inside or around a given cell. Two
MHC classes serve distinct roles with a clean, memorable division of labor. **MHC class
I** is present on essentially ALL nucleated cells and presents peptides originating from
INSIDE the cell — self proteins, or proteins from an intracellular pathogen like a virus
— and is detected specifically by cytotoxic T cells (CD8⁺). **MHC class II** is present
only on professional antigen-presenting cells (dendritic cells, macrophages, B cells) and
presents peptides from EXTRACELLULAR antigens that were engulfed by phagocytosis — and is
detected specifically by helper T cells (CD4⁺). This class distinction directly
determines the functional outcome: MHC class I recognition leads to destruction of the
infected cell itself; MHC class II recognition leads to coordination of the broader
adaptive response.

The concept's central, load-bearing claim: **T cells cannot directly detect free-floating
pathogens or antigens** — they can ONLY recognize peptide fragments that have already
been processed and displayed on an MHC molecule. This is called **MHC restriction**, and
it has a precise, testable consequence: a CD8⁺ T cell trained (during development) on one
individual's specific MHC molecules will NOT recognize the same pathogen if it is
presented by a genetically different individual's MHC — the T cell receptor (TCR) is
actually binding the MHC-peptide complex as a combined unit, not the peptide alone.

This single fact — MHC restriction — is also the direct, complete explanation for
**transplant rejection**: a recipient's T cells perceive the donor organ's MHC molecules
(genetically distinct from the recipient's own, i.e. "allogeneic") as foreign, and mount
an immune attack against the transplanted tissue specifically because of that MHC
mismatch — not because of a generic immune "overreaction," and not because the donor
organ is unhealthy or malfunctioning in any way.

## Mental Models
- **Two classes, two locations, two T cell types, one clean rule**: class I ↔ inside the
  cell ↔ all nucleated cells ↔ CD8⁺ cytotoxic; class II ↔ outside/engulfed ↔ professional
  APCs only ↔ CD4⁺ helper — every element of this four-part correspondence should be
  retrievable from any one piece.
- **The TCR binds the complex, not either piece alone**: exactly like a key that only
  fits a specific lock-and-tumbler combination, the T cell receptor recognizes the
  MHC-peptide complex as a single combined shape, not the peptide floating free or the
  MHC molecule with nothing loaded.
- **Rejection is a targeting error with a precise cause, not a vague malfunction**:
  transplant rejection is the predictable, mechanistically specific consequence of
  MHC mismatch — genuinely healthy donor tissue is still attacked, because health is not
  what the recipient's T cells are actually evaluating.

## Why Students Fail
1. They assume T cells (like antibodies, which CAN bind free antigens directly) also
   recognize pathogens directly and freely, missing that T cell recognition specifically
   and exclusively requires MHC presentation — a genuinely different recognition
   mechanism from the B cell/antibody system.
2. They treat MHC class I and class II as interchangeable or arbitrarily assigned,
   rather than tracking the specific correspondence between peptide origin
   (intracellular vs. extracellular), cell type, and T cell type as one linked system.
3. They interpret transplant rejection as a generic "immune system attacking foreign
   tissue" event, without engaging with the specific mechanistic reason (MHC mismatch,
   not tissue health or general foreignness) that actually drives it.

## Misconceptions

### M1 — "T cells directly detect free pathogens or antigens" (Type 1: Overgeneralization)
**Statement**: Since T cells are part of the immune system's pathogen-detection
machinery, they should be able to recognize a pathogen or its antigens directly, the way
antibodies do.
**Origin**: Overgeneralizing from the general category "immune cells detect pathogens"
without registering that different immune cell types use fundamentally different
recognition mechanisms — B cells/antibodies bind free antigen directly; T cells require
MHC-mediated presentation as an intermediate step.
**Why it persists**: Antibodies (a more commonly discussed immune component) genuinely
do bind free antigen directly, and without an explicit side-by-side contrast, this
mechanism can be assumed to generalize to T cells as well.
**Repair**: State the contrast directly and explicitly: antibodies bind free antigen;
T cells bind ONLY MHC-peptide complexes, never free antigen — this is a fundamental
mechanistic difference between the two arms of adaptive immunity, not a minor detail.
**Diagnostic probe**: the existing misconception_probe asking whether a cytotoxic T cell
can detect a free bacterium in the blood directly, with the yes-TCRs-bind-free-bacterial-
proteins distractor flagged to this misconception.

### M2 — "MHC class assignment is arbitrary, or determined by pathogen type rather than peptide origin/location" (Type 4: Notation/mechanism-induced)
**Statement**: Whether a peptide is displayed via MHC class I or class II depends on
what kind of pathogen it came from (e.g., "viruses use class I, bacteria use class II"),
rather than on where the peptide's source protein was actually located relative to the
cell.
**Origin**: Because viral infections are commonly used as the illustrative example for
MHC class I (since viruses replicate intracellularly) and phagocytosed bacteria for class
II, students can generalize "pathogen type" as the deciding variable rather than the
actual deciding variable, which is peptide origin location (intracellular vs.
extracellular/engulfed), regardless of pathogen type.
**Why it persists**: The most commonly taught examples happen to correlate pathogen type
with location (viruses are typically intracellular; phagocytosed material is typically
extracellular), so the correlation can be mistaken for the actual causal rule without a
counter-example that decouples them.
**Repair**: State the actual rule using location, not pathogen identity: ANY protein
present inside a nucleated cell (whether self, viral, or from an intracellular
bacterium) is a class I candidate; ANY protein engulfed via phagocytosis by a
professional APC (regardless of source) is a class II candidate — pathogen type is
incidental to the actual mechanism.
**Diagnostic probe**: the existing MCQ asking which MHC class displays viral peptides
from an infected liver cell, distinguishing the correct class-I/CD8⁺ answer from
distractors that incorrectly pair class with T cell type.

## Analogies
- The sealed-envelope-and-address model: T cells only "read" a message (peptide) when
  it's placed inside a specific, recognized envelope (MHC molecule) with the right
  return address (self MHC type) — a message handed over loose, with no envelope, is
  simply never opened or read.
- The building-security-badge model: transplant rejection is like a security system
  flagging anyone whose badge (MHC) doesn't match the building's registered badge format
  — the system isn't evaluating whether the person is dangerous, only whether the badge
  matches, which is exactly why even a "safe," healthy donor organ still gets flagged.

## Demonstrations
- Diagram a virus-infected cell (class I pathway) and a macrophage that has phagocytosed
  a bacterium (class II pathway) side by side, tracing peptide origin explicitly from
  source location through to the specific T cell type activated in each case.
- Walk the transplant-rejection scenario as a direct application: donor kidney cells
  display donor MHC → recipient T cells were never developmentally exposed to that MHC
  as "self" → recipient T cells recognize donor MHC as foreign → attack — tracing the
  causal chain explicitly rather than asserting the outcome.

## Discovery Questions
- "Antibodies can bind a free-floating antigen directly. Can a T cell do the same thing,
  or does it need something else first?"
- "A protein from a bacterium living inside a human cell (not phagocytosed, but growing
  intracellularly) — would you expect it to be displayed via class I or class II, based
  on where it actually is, not what kind of pathogen it came from?"
- "If a donor kidney is perfectly healthy, why would a recipient's immune system still
  attack it? What specifically is being 'recognized' as foreign?"

## Teaching Sequence
1. Introduce MHC's basic function (displaying peptides for T cell inspection) before
   distinguishing class I from class II.
2. Present the class I/class II distinction using LOCATION (intracellular vs.
   extracellular/engulfed) as the explicit organizing variable, not pathogen type.
3. Directly contrast T cell recognition against antibody recognition, establishing MHC
   restriction as T cells' defining, distinguishing limitation.
4. Present a counter-example that decouples pathogen type from MHC class (e.g., an
   intracellular bacterium triggering class I, not class II) to block the pathogen-type
   misconception directly.
5. Walk the transplant-rejection mechanism explicitly as a direct application of MHC
   restriction, tracing the full causal chain from MHC mismatch to T cell attack.
6. Close by previewing `bio.immuno.t-cell-development-tolerance`'s fuller treatment of
   how T cells are trained to recognize self MHC in the first place.

## Tutor Actions
- If a student describes T cells recognizing free antigen: ask them to contrast this
  directly against antibody recognition, forcing the MHC-restriction distinction to
  surface explicitly.
- If a student assigns MHC class based on pathogen type: present the intracellular-
  bacterium counter-example and ask them to reconsider which variable (pathogen type or
  location) actually determines the class.
- If a student attributes transplant rejection to general immune "overreaction" or organ
  health: ask them to name specifically what the recipient's T cells are recognizing as
  foreign.

## Voice Teaching Notes
Say "only the complex, never the peptide alone, never the pathogen alone" whenever TCR
recognition comes up, to keep MHC restriction as an absolute rule rather than a
tendency. Say "location, not pathogen type" as the standing correction whenever MHC class
assignment is being reasoned through.

## Assessment Signals
- **Early recovery**: after the intracellular-bacterium counter-example, correctly
  assigns MHC class based on location for a further novel scenario, without needing this
  restated.
- **Fragile**: can state "T cells need MHC presentation" as a memorized fact but still
  defaults to pathogen-type-based class assignment when working a new scenario.
- **Deep gap**: continues to attribute transplant rejection to organ health or generic
  immune overreaction after the MHC-mismatch mechanism has been explicitly taught —
  indicates MHC restriction was never actually connected to this specific clinical
  application.

## Tutor Recovery Strategy
For M1, ask the student to state specifically what an antibody binds directly (free
antigen) and then ask whether a T cell has been shown to do the same — the contrast,
worked through rather than restated, should make the distinction concrete. For M2,
present a fresh scenario decoupling pathogen type from location (e.g., a self-protein
overexpressed intracellularly, unrelated to any pathogen) and ask the student to assign
MHC class using only the location rule, testing whether the discrimination transfers.

## Memory Hooks
- "T cells need the envelope (MHC). No envelope, no reading."
- "Location decides the class: inside the cell is class I; engulfed from outside is
  class II. Not the pathogen type."
- "Rejection isn't about health — it's about a badge (MHC) that doesn't match."

## Transfer Connections
- `bio.immuno.innate-adaptive-immunity`: supplies the basic CD4⁺/CD8⁺ T cell function
  distinction this concept extends into the specific MHC-class correspondence.
- `bio.mol.proteins-structure`: peptide fragment generation and MHC-peptide binding both
  depend on the protein structure principles established there.
- `bio.mol.translation-genetic-code` (cross-linked in the KG): connects MHC-presented
  peptides back to their origin as protein products of translation, whether from self
  genes or an intracellular pathogen's genome.

## Cross-Subject Connections
The KG's own `cross_links` field already connects this concept within biology to
`bio.mol.translation-genetic-code`; no additional cross-subject connection is authored
here.

## Blueprint References
No Blueprint exists for biology as a subject (per the standing note for this authoring
campaign); classification of both misconceptions above was performed directly against
`biologySeedAssets.ts`'s existing seed content and the probe-depth campaign's own
transplant-rejection short_answer probe, using the birth-taxonomy diagnostic procedure
(`educational-brain/misconceptions/01-birth-taxonomy.md`).

## Runtime Asset References
- `core_explanation` (UNDERGRADUATE band): MHC class I/II distinction by cell type,
  peptide origin, and T cell type; functional outcome of each class —
  `biologySeedAssets.ts`, `MHCANTIGEN_EXPLANATIONS[0]`.
- `misconception_repair` (UNDERGRADUATE band): MHC restriction (T cells require
  MHC-presented peptides); transplant rejection via allogeneic MHC recognition —
  `MHCANTIGEN_EXPLANATIONS[1]`.
- `mcq` (ADVANCED): virus-infected liver cell MHC class/T cell type identification,
  class/T-cell-type-mismatch distractors flagged to M2 — `MHCANTIGEN_PROBES[0]`.
- `misconception_probe` (PROFICIENT): whether a cytotoxic T cell can detect a free
  bacterium directly, yes-TCRs-bind-free-proteins distractor flagged to M1 —
  `MHCANTIGEN_PROBES[1]`.
- `short_answer` (PROFICIENT, probe-depth Batch 12): kidney-transplant-rejection
  mechanism task, directly evidencing the MHC-restriction-drives-rejection point and
  closing this concept's 3-probe floor — `biologyDepthSeedAssets.ts`, conceptId
  `bio.immuno.mhc-antigen-presentation`.

## Curriculum Feedback
The KG description additionally names antigen processing pathways (proteasome, TAP,
lysosomal), peptide-MHC complex/TCR recognition geometry, and thymic positive/negative
selection for self-tolerance by name, but the existing seed corpus covers MHC class
distinction and MHC restriction at a general level without detailing the specific
processing pathways or thymic selection mechanisms. This EB entry is scoped to what is
actually taught; the more granular subtopics are a genuine content gap flagged here as
Curriculum Feedback, not fabricated — thymic selection specifically is previewed as the
subject of `bio.immuno.t-cell-development-tolerance`, this concept's own unlock.

## Version History
- 2026-09-20: Initial authoring (sixteenth recomputed topological frontier, batch of 3
  with `bio.mol.epigenetics` and `bio.gen.transposable-elements`), EB concept 64/199.
