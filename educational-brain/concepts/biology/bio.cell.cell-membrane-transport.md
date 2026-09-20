# bio.cell.cell-membrane-transport — Cell Membrane and Transport

## Identity
- **Concept ID**: `bio.cell.cell-membrane-transport`
- **Subject**: Biology
- **Domain**: Cell Biology (`bio.cell`)
- **Prerequisites**: `bio.cell.eukaryotic-cell`
- **Unlocks**: `bio.cell.cell-signalling`, `bio.cell.cytoskeleton`, `bio.physio.respiratory-system`, `bio.plant.plant-water-relations`, `bio.cell.cell-junctions-extracellular-matrix`, `bio.cell.membrane-transport-energetics`
- **Cross-links (KG)**: none currently listed
- **Difficulty**: proficient
- **Bloom level**: analyze
- **Mastery threshold**: 0.75
- **Estimated hours**: 4

## Learning Objective
The student can classify any given transport scenario (diffusion, osmosis, facilitated
diffusion, active transport, or vesicular transport) by correctly identifying what is
moving, whether energy is required, and why — rather than treating "crosses the
membrane" as a single undifferentiated category.

## Core Understanding
The plasma membrane is a phospholipid bilayer (fluid mosaic model) with embedded
proteins able to move laterally — hydrophilic heads face the watery environments on
both sides, hydrophobic tails face each other in the middle. This structure creates a
selectively permeable barrier, and transport across it falls into clearly distinguishable
categories defined by two questions: **what is moving**, and **does it need energy**.

Passive transport (no ATP, moves with the gradient): simple diffusion (small nonpolar
molecules move directly through the bilayer, high→low concentration), facilitated
diffusion (ions and polar molecules move high→low through channel or carrier proteins —
still passive, just assisted), and osmosis (specifically water, moving through
aquaporins or the bilayer itself, driven by its own concentration/water-potential
gradient). Active transport (requires ATP, moves against the gradient): pumps like the
Na+/K+ ATPase move substances from low to high concentration by spending energy — this
pump specifically moves 3 Na+ out and 2 K+ in per ATP consumed. Bulk transport
(endocytosis/exocytosis) moves large cargo — too big for any channel or carrier — in
membrane-bound vesicles.

The single most useful discriminating question for any transport scenario is: **is this
substance moving with or against its gradient, and is it water specifically?** Answering
that correctly identifies the mechanism almost every time.

## Mental Models
- **The gradient-and-cost model**: passive transport is water flowing downhill (free);
  active transport is pumping water uphill (costs energy) — the direction relative to
  the gradient is the entire distinguishing fact, not the presence of a protein.
- **Osmosis is water-only, categorically**: even though osmosis and facilitated diffusion
  both can use membrane channels (aquaporins vs. other channel proteins), osmosis is
  reserved specifically for water's own movement — this is a definitional boundary, not
  a matter of degree.
- **Size, not charge alone, forces vesicular transport**: a molecule too large for any
  channel or carrier (a protein hormone, for instance) cannot use diffusion-family
  transport at all, regardless of energy availability — it needs a fundamentally
  different mechanism (vesicles).

## Why Students Fail
1. They treat "osmosis" as a general word for "stuff moving across a membrane," because
   it is introduced alongside diffusion using similar-sounding language, without the
   water-only restriction being stated as a hard boundary.
2. They conflate "uses a protein" with "requires energy," since both facilitated
   diffusion and active transport involve membrane proteins — the presence of a protein
   feels like the deciding factor rather than the direction relative to the gradient.
3. They do not have a category for "too big for any protein channel," so they default to
   guessing between diffusion-family answers even when the correct mechanism (vesicular
   transport) is structurally the only one that fits.

## Misconceptions

### M1 — "Osmosis describes any substance crossing a membrane" (Type 3: Language contamination)
**Statement**: Glucose, ions, or other solutes can move "by osmosis" whenever they cross
a membrane along a concentration gradient.
**Origin**: "Osmosis" and "diffusion" are taught in close proximity using near-identical
sentence structures ("X moves from high to low concentration"), and the everyday word
"osmosis" is sometimes used loosely in non-scientific contexts to mean any gradual
absorption or spreading.
**Why it persists**: Both processes share the same directional logic (high→low), so
without a hard definitional anchor ("osmosis = water, specifically"), the terms blend.
**Repair**: State the boundary as absolute, not approximate: osmosis is reserved for
water; every other substance moving by a concentration gradient is diffusion or
facilitated diffusion, never osmosis, regardless of how similar the underlying physics is.
**Diagnostic probe**: the existing misconception_probe presenting "glucose moves into
cells by osmosis" and asking what is wrong, with the "nothing is wrong" distractor
flagged to this misconception.

### M2 — "Any protein-mediated transport is active transport" (Type 4: Notation/mechanism-induced)
**Statement**: Because facilitated diffusion uses a membrane protein just like active
transport does, it must also require ATP.
**Origin**: Channel/carrier proteins are introduced as the shared structural feature of
both facilitated diffusion and active transport, without the energy requirement being
tied to the correct variable (direction relative to gradient, not presence of a protein).
**Why it persists**: The protein is the visually salient, memorable feature in both
processes; the gradient direction is a more abstract fact that is easier to forget.
**Repair**: Anchor the energy question strictly to gradient direction: "if the substance
is moving from low to high concentration, energy is needed no matter what; if it's
moving high to low, no energy is needed no matter what — even through a protein."
**Diagnostic probe**: the existing MCQ asking which process moves substances against
their gradient using ATP, with the "facilitated diffusion" distractor flagged to this
misconception.

## Analogies
- Passive transport = water flowing downhill; active transport = pumping water uphill.
- A too-large parcel that cannot fit through any door or window (channel/carrier) needs
  to be moved in a truck instead (vesicle) — vesicular transport as a size-forced,
  categorically different mechanism.

## Demonstrations
- Sort a list of transport scenarios (glucose into a cell via carrier, water into a cell,
  Na+ pumped out against its gradient, a hormone secreted from a cell) into the four
  categories using only two questions — "what is moving?" and "with or against the
  gradient?" — to make the classification procedure explicit and repeatable.
- Trace the Na+/K+ pump's specific stoichiometry (3 Na+ out, 2 K+ in, 1 ATP) to show that
  "active transport" is a precise, quantifiable mechanism, not a vague "the cell works
  hard" description.

## Discovery Questions
- "If glucose and water are both moving from a high-concentration side to a low-
  concentration side, why is only one of these called osmosis?"
- "The Na+/K+ pump uses a protein channel, and facilitated diffusion also uses a protein
  channel. What's the actual difference between them?"
- "A hormone molecule is far too large to pass through any channel protein. Does it
  matter whether the cell has plenty of ATP available? Why or why not?"

## Teaching Sequence
1. Introduce the fluid mosaic model structurally (bilayer, embedded proteins, lateral
   mobility) before naming any transport type.
2. Establish the two discriminating questions up front: what is moving, and is it moving
   with or against its gradient.
3. Walk passive transport types in order of increasing structural assistance: simple
   diffusion (no help) → facilitated diffusion (protein-assisted, still passive) →
   osmosis (water-specific, defined as its own category regardless of mechanism).
4. Introduce active transport by contrasting it directly against facilitated diffusion
   using the same "protein present" feature, isolating gradient direction as the actual
   deciding variable.
5. Introduce vesicular transport as a structurally forced fourth category for cargo too
   large for any channel or carrier, independent of the gradient question entirely.
6. Close with the classification-by-two-questions exercise across mixed scenarios to
   consolidate the discrimination skill rather than memorized examples.

## Tutor Actions
- If a student calls any solute's movement "osmosis": redirect immediately to the
  water-only definitional boundary before continuing — do not let "osmosis" pass as a
  loose synonym for "diffusion."
- If a student says facilitated diffusion requires energy because it uses a protein: ask
  them to state the gradient direction for the specific example first, then re-derive the
  energy requirement from that, not from the presence of a protein.
- If a student defaults to a diffusion-family answer for an oversized-cargo scenario:
  ask directly whether the molecule could physically fit through a channel protein before
  re-explaining vesicular transport.

## Voice Teaching Notes
Say "is it water? then it might be osmosis — if it's anything else, it's diffusion or
active transport" to make the water-only test a first-pass filter. Say "the protein isn't
what tells you if energy is needed — the direction is" to explicitly detach the
protein-presence cue from the energy-requirement conclusion.

## Assessment Signals
- **Early recovery**: after being told osmosis is water-only, immediately re-classifies
  a previously-missed glucose scenario as facilitated diffusion without re-prompting.
- **Fragile**: can state "osmosis is water" as an isolated fact but still calls a
  glucose-movement scenario "osmosis" when the word "concentration gradient" appears in
  the same sentence.
- **Deep gap**: continues to answer "needs energy" for facilitated diffusion scenarios
  even after the gradient-direction rule has been stated and applied together in the same
  session — indicates the "protein = energy" association was never actually replaced.

## Tutor Recovery Strategy
For M1, do not simply repeat "osmosis is water" a second time — ask the student to name
what is moving in the specific scenario they mis-labeled, forcing them to notice it isn't
water themselves. For M2, walk the specific example's gradient direction explicitly
before asking for the energy verdict, rather than re-asserting the rule; a student who
answers correctly only when the rule is restated alongside the question has not yet
internalized gradient direction as the actual test.

## Memory Hooks
- "Osmosis: water, and only water."
- "Protein or no protein — the gradient decides if it costs energy."
- "Too big for a door, needs a truck — that's a vesicle."

## Transfer Connections
- `bio.cell.eukaryotic-cell`: the compartmentalisation this concept builds on — the
  membrane's selective permeability is what makes distinct organelle environments
  possible in the first place.
- `bio.cell.membrane-transport-energetics` (unlocks): extends the ATP-cost accounting
  introduced here (the Na+/K+ pump's specific stoichiometry) into a fuller quantitative
  treatment.
- `bio.physio.respiratory-system` (unlocks): gas exchange across the alveolar membrane is
  a direct, high-stakes application of simple diffusion as taught here.

## Cross-Subject Connections
No `cross_links` entry exists in the KG for this concept. A natural link to a physics or
chemistry concept on diffusion/concentration-gradient thermodynamics (entropy driving net
movement toward equilibrium) would connect this concept's "why does diffusion happen at
all" question to a first-principles physical explanation, but is not authored here since
physics/chemistry content is out of scope for this campaign.

## Blueprint References
No Blueprint exists for biology as a subject (per the standing note for this authoring
campaign); classification of both misconceptions above was performed directly against
`biologySeedAssets.ts`'s existing seed content using the birth-taxonomy diagnostic
procedure (`educational-brain/misconceptions/01-birth-taxonomy.md`).

## Runtime Asset References
- `core_explanation` (HIGH band): fluid mosaic model, passive/active/bulk transport
  categories, Na+/K+ pump stoichiometry — `biologySeedAssets.ts`, `MEMTRANS_EXPLANATIONS[0]`.
- `misconception_repair` (HIGH band): osmosis water-only boundary; active transport
  defined by gradient direction, not speed — `MEMTRANS_EXPLANATIONS[1]`.
- `mcq` (DEVELOPING): which process moves substances against the gradient using ATP,
  facilitated-diffusion distractor flagged to M2 — `MEMTRANS_PROBES[0]`.
- `misconception_probe` (DEVELOPING): "glucose moves by osmosis" critique task,
  nothing-is-wrong distractor flagged to M1 — `MEMTRANS_PROBES[1]`.
- `short_answer` (PROFICIENT, probe-depth Batch 2): oversized-cargo scenario forcing
  exocytosis as the only structurally possible answer, closing this concept's 3-probe
  floor — `biologyDepthSeedAssets.ts`, conceptId `bio.cell.cell-membrane-transport`.

## Curriculum Feedback
None — the KG description (fluid mosaic model, passive/active transport types,
endocytosis/exocytosis) matches the seed corpus's actual coverage exactly.

## Version History
- 2026-09-20: Initial authoring (tenth recomputed topological frontier, batch of 3 with
  `bio.mol.dna-replication` and `bio.eco.community-ecology`), EB concept 46/199.
