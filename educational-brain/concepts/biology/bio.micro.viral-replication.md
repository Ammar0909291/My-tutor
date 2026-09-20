# bio.micro.viral-replication — Viral Replication and Lifecycle

## Identity
- **Concept ID**: `bio.micro.viral-replication`
- **Subject**: Biology
- **Domain**: Microbiology (`bio.micro`)
- **Prerequisites**: `bio.found.viruses-viroids-lichens`, `bio.mol.dna-replication`
- **Unlocks**: none currently listed
- **Cross-links (KG)**: none currently listed
- **Difficulty**: proficient
- **Bloom level**: understand
- **Mastery threshold**: 0.75
- **Estimated hours**: 4

## Learning Objective
The student can distinguish the lytic and lysogenic cycles by the immediate fate of the
viral genome, correctly explain why antibiotics have no effect on viral infections
(absence of a viral metabolism to target), and correctly identify reverse transcriptase
as the enzyme that reverses the typical DNA→RNA information flow in retroviruses.

## Core Understanding
Viruses replicate by hijacking host cell machinery entirely — they have none of their
own. In the **lytic cycle**: the virus attaches to a host cell, injects its genetic
material, the host's own machinery is redirected to make viral proteins and copy the
viral genome, new virions assemble, and the cell ultimately lyses (bursts), releasing
hundreds of progeny virions. In the **lysogenic cycle** (the classic example being
bacteriophage λ): the viral genome instead **integrates into the host chromosome as a
prophage**, replicating silently alongside the host's own DNA for many generations,
before eventually excising and entering the lytic cycle when triggered by cellular
stress. Animal viruses follow analogous temperate (lysogenic-like) and productive
(lytic-like) cycle patterns.

RNA viruses present a special case: **retroviruses** (HIV being the canonical example)
require the enzyme **reverse transcriptase** to convert their RNA genome into DNA before
that DNA can integrate into the host chromosome — this name directly signals the
unusual, reversed direction of information flow relative to the standard DNA→RNA→protein
pattern established in `bio.mol.transcription` and `bio.mol.translation-genetic-code`.

The concept's central corrective claim, stated as precisely as the misconception it
targets deserves: **viruses do not reproduce — they replicate by commandeering the
host's ribosomes, energy, and raw materials.** This is not a semantic distinction:
outside a host cell, a virus is genuinely inert — it metabolizes nothing, grows nothing,
and responds to nothing. This inertness has a direct, practical clinical consequence:
**antibiotics have no effect on viral infections specifically because there is no viral
metabolism for them to disrupt** — antibiotics work by targeting bacterial metabolic
processes (cell wall synthesis, bacterial ribosomes, etc.) that simply have no analog in
a virus. Antivirals, by contrast, work by blocking specific steps of the replication
cycle itself (attachment, reverse transcription, protease processing) — they target the
hijacking process, not a viral metabolism that doesn't exist.

## Mental Models
- **A virus is a set of instructions, not a living factory**: it carries genetic
  information and structural components, but none of the actual manufacturing capacity
  (ribosomes, ATP synthesis) — it must borrow all of that from the host.
- **Integration is a sleeper strategy, not an immediate strike**: the lysogenic cycle's
  defining feature is that the viral genome becomes part of the host's own genome for an
  extended, potentially indefinite period, only "waking up" under specific triggering
  conditions.
- **"Reverse" transcriptase is named for exactly what it does**: it runs the normal
  transcription direction (DNA→RNA) backward (RNA→DNA) — the name itself is a precise,
  literal description of the reversed information flow, not an arbitrary label.

## Why Students Fail
1. They assume "replicate" and "reproduce" are interchangeable terms, since both refer
   to an increase in number, missing the specific biological distinction (independent
   metabolic activity vs. complete dependence on host machinery) that makes only one term
   accurate for viruses.
2. They assume the lysogenic cycle's viral genome immediately begins producing new
   virions (following the lytic-cycle pattern by default), missing that integration into
   the host chromosome and silent co-replication is the defining, distinguishing feature
   of the lysogenic pathway specifically.
3. They generalize "antibiotics fight infections" broadly across all pathogen types,
   without engaging with the specific mechanistic reason (target availability, i.e. the
   presence or absence of a disruptable metabolism) that determines whether a given drug
   class can work against a given pathogen type.

## Misconceptions

### M1 — "Viruses reproduce, and the lysogenic viral genome immediately produces new virions" (Type 1: Overgeneralization)
**Statement**: Viruses are living organisms that reproduce like other microbes, and once
a virus enters a host cell (in either cycle), it should immediately begin directing the
production of new viral particles.
**Origin**: Overgeneralizing "increase in number" from other microorganisms (which
genuinely do reproduce via their own independent metabolism) onto viruses, and separately
overgeneralizing the lytic cycle's immediate-production pattern onto the lysogenic cycle
by default, without registering integration as lysogeny's defining, distinct feature.
**Why it persists**: Viruses are commonly discussed in the same breath as bacteria and
other pathogens using shared language ("the virus reproduces," "bacteria and viruses
both cause infection"), without the specific metabolic distinction being made explicit;
similarly, without contrasting the two cycles side by side, the lysogenic cycle's
integration step can be assumed away as a minor variant of the lytic pattern.
**Repair**: State explicitly that "replicate" (borrowing host machinery) and "reproduce"
(independent metabolic activity) are not interchangeable, and that outside a host a virus
does nothing metabolically at all; separately, trace the lysogenic cycle's specific
sequence (integration → silent co-replication with host DNA → later excision and lytic
entry under stress) as a genuinely different pathway from the lytic cycle's immediate
production.
**Diagnostic probe**: the existing MCQ asking what happens to the viral genome in the
lysogenic cycle, with the immediately-directs-virion-production distractor flagged to
this misconception; reinforced by the existing misconception_probe asking why
antibiotics don't work on viral infections, with the viruses-too-large distractor
flagged to the same underlying reproduce-vs-replicate confusion.

### M2 — "Reverse transcriptase functions like ordinary DNA polymerase, or RNA polymerase reading host DNA to make viral RNA" (Type 4: Notation/mechanism-induced)
**Statement**: The enzyme HIV uses to convert its RNA genome into DNA is essentially the
same as, or functionally interchangeable with, the standard DNA-copying (DNA polymerase)
or DNA-reading (RNA polymerase) enzymes already familiar from normal cellular
transcription and replication.
**Origin**: Conflating reverse transcriptase with the more familiar standard-direction
enzymes because all three are broadly "nucleic-acid-synthesizing enzymes" discussed in
adjacent contexts, without tracking the specific direction of information flow each one
actually performs.
**Why it persists**: Without explicitly naming which direction of information flow each
enzyme performs (DNA polymerase: DNA→DNA; RNA polymerase: DNA→RNA; reverse
transcriptase: RNA→DNA), the enzymes' shared general category ("copies nucleic acid")
can obscure this specific, defining functional difference.
**Repair**: State the three enzymes' specific directions explicitly and side by side,
emphasizing that reverse transcriptase's name is literally descriptive: it performs the
reverse of the standard DNA-to-RNA transcription direction, a genuinely unusual capability
that ordinary DNA or RNA polymerase does not have.
**Diagnostic probe**: the existing probe-depth short_answer directly asking which enzyme
converts HIV's RNA genome to DNA and why this is unusual, with the DNA-polymerase and
RNA-polymerase distractors both explicitly addressed.

## Analogies
- The borrowed-factory model: a virus is like a set of blueprints and raw materials
  delivered to someone else's fully-equipped factory, with no factory of its own — all
  the actual manufacturing (protein synthesis, energy production) happens using the
  host's equipment.
- The sleeper-agent model for lysogeny: the prophage integrates and lies dormant within
  the host's own "records" (chromosome), replicating passively along with it for
  generations, until a specific triggering signal activates it into open, lytic activity.

## Demonstrations
- Diagram both cycles side by side (lytic: attach → inject → hijack → assemble → lyse;
  lysogenic: attach → inject → integrate → silent co-replication → later excision →
  lytic entry), explicitly marking where the two pathways diverge.
- Present the three enzymes (DNA polymerase, RNA polymerase, reverse transcriptase) with
  their specific input/output directions labeled explicitly, and have students match
  each to its correct direction of information flow before revealing the answer key.

## Discovery Questions
- "If a virus outside a host cell metabolizes nothing and grows nothing, does it make
  sense to call this 'reproduction,' or is a different word more accurate?"
- "In the lysogenic cycle, does the viral genome immediately start making new virus
  particles, or does something else happen first? What's the defining feature that makes
  this cycle different from the lytic cycle?"
- "Reverse transcriptase converts RNA into DNA. What is the 'normal,' non-reversed
  direction this enzyme's name implies it's working against?"

## Teaching Sequence
1. Establish viruses' complete dependence on host machinery (no independent metabolism)
   before introducing either replication cycle in detail.
2. Walk the lytic cycle first as the more intuitive, immediate-production pathway.
3. Introduce the lysogenic cycle by explicit contrast, emphasizing integration into the
   host chromosome and silent co-replication as the defining, distinguishing feature.
4. Present the reproduce-vs-replicate distinction directly, connecting it to the
   practical clinical fact that antibiotics cannot target a metabolism that doesn't
   exist.
5. Introduce reverse transcriptase specifically, contrasting its RNA→DNA direction
   against DNA polymerase's and RNA polymerase's standard directions.
6. Close by connecting antiviral drug mechanisms (targeting specific replication-cycle
   steps) back to the absence of a viral metabolism, reinforcing why antivirals and
   antibiotics work via fundamentally different strategies.

## Tutor Actions
- If a student describes viruses as reproducing: ask them what a virus does
  metabolically outside a host cell, forcing the inertness fact to be confronted
  directly.
- If a student assumes the lysogenic genome immediately produces virions: ask them to
  name the specific step (integration) that must happen first, and what "silent
  co-replication" actually means for the viral genome's activity level during that
  phase.
- If a student conflates reverse transcriptase with DNA or RNA polymerase: ask them to
  state each enzyme's specific input and output molecule before accepting any claim
  about their similarity.

## Voice Teaching Notes
Say "replicate, not reproduce" whenever viral proliferation comes up, treating this as a
precise technical distinction rather than a stylistic preference. Say "which direction?"
as a standing diagnostic question whenever any nucleic-acid-synthesizing enzyme is
discussed, to keep DNA polymerase, RNA polymerase, and reverse transcriptase's distinct
directions explicit.

## Assessment Signals
- **Early recovery**: after the two-cycle side-by-side diagram, correctly identifies
  which cycle a novel viral scenario follows based on whether integration occurs, without
  needing the distinction restated.
- **Fragile**: can state "viruses don't reproduce, they replicate" as a memorized
  correction but still describes the lysogenic genome as immediately active when asked to
  narrate the cycle in their own words.
- **Deep gap**: continues to conflate reverse transcriptase with DNA or RNA polymerase
  after their distinct directions have been explicitly taught — indicates the specific
  input/output distinction was never actually adopted, only the enzyme's name was
  memorized.

## Tutor Recovery Strategy
For M1, do not just restate "replicate, not reproduce" — ask the student to describe
what a virus is doing, specifically, at the moment just before it contacts a host cell
(nothing, metabolically), forcing the inertness claim to be reasoned through rather than
recited. For M2, have the student state each of the three enzymes' specific input and
output molecules from memory, rather than being shown the labeled diagram a second time.

## Memory Hooks
- "Replicate, not reproduce — a virus borrows everything, owns nothing."
- "Lysogenic: integrate first, silent for generations, lytic later."
- "Reverse transcriptase: RNA to DNA, the reverse of the usual direction — that's the
  whole name."

## Transfer Connections
- `bio.mol.dna-replication`: the host-cell replication machinery a lytic-cycle virus
  hijacks is exactly the machinery established there.
- `bio.mol.transcription` and `bio.mol.translation-genetic-code`: the standard DNA→RNA→
  protein information flow established in those concepts is precisely what reverse
  transcriptase's RNA→DNA direction reverses.
- `bio.found.viruses-viroids-lichens`: supplies the basic viral structural classification
  this concept builds its replication-cycle detail on top of.

## Cross-Subject Connections
No `cross_links` entry exists in the KG for this concept. No cross-subject connection is
authored here since this concept's content is entirely intra-biology molecular
microbiology detail.

## Blueprint References
No Blueprint exists for biology as a subject (per the standing note for this authoring
campaign); classification of both misconceptions above was performed directly against
`biologySeedAssets.ts`'s existing seed content and the probe-depth campaign's own
reverse-transcriptase short_answer probe, using the birth-taxonomy diagnostic procedure
(`educational-brain/misconceptions/01-birth-taxonomy.md`).

## Runtime Asset References
- `core_explanation` (UNDERGRADUATE band): lytic and lysogenic cycles, retroviruses and
  reverse transcriptase — `biologySeedAssets.ts`, `VIRALREP_EXPLANATIONS[0]`.
- `misconception_repair` (UNDERGRADUATE band): viruses-replicate-not-reproduce
  correction; antibiotics-vs-antivirals mechanism distinction — `VIRALREP_EXPLANATIONS[1]`.
- `mcq` (PROFICIENT): lysogenic-cycle viral genome fate, immediately-produces-virions
  distractor flagged to M1 — `VIRALREP_PROBES[0]`.
- `misconception_probe` (DEVELOPING): why antibiotics don't work on viruses,
  viruses-too-large distractor flagged to M1 — `VIRALREP_PROBES[1]`.
- `short_answer` (PROFICIENT, probe-depth Batch — microbiology wave): reverse-
  transcriptase identification and direction-of-information-flow task, directly
  evidencing M2's diagnostic and closing this concept's 3-probe floor —
  `biologyDepthSeedAssets.ts`, conceptId `bio.micro.viral-replication`.

## Curriculum Feedback
The KG description additionally names the Baltimore classification system (seven virus
classes by genome type), attachment/entry/replication/assembly/release as discrete
labeled steps, and RNA-dependent RNA polymerase in RNA viruses by name, but the existing
seed corpus covers the lytic/lysogenic cycle distinction and reverse transcriptase at a
general level without naming the Baltimore classification, the discrete step labels, or
RNA-dependent RNA polymerase individually. This EB entry is scoped to what is actually
taught; the more granular subtopics are a genuine content gap flagged here as Curriculum
Feedback, not fabricated.

## Version History
- 2026-09-20: Initial authoring (nineteenth recomputed topological frontier, batch of 3
  with `bio.cell.cell-signalling` and `bio.cell.apoptosis`), EB concept 72/199.
