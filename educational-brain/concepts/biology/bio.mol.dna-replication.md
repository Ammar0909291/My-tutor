# bio.mol.dna-replication — DNA Replication

## Identity
- **Concept ID**: `bio.mol.dna-replication`
- **Subject**: Biology
- **Domain**: Molecular Biology (`bio.mol`)
- **Prerequisites**: `bio.mol.nucleic-acid-structure`, `bio.mol.enzymes`
- **Unlocks**: `bio.mol.transcription`, `bio.micro.viral-replication`, `bio.micro.horizontal-gene-transfer`, `bio.mol.dna-damage-repair`
- **Cross-links (KG)**: none currently listed
- **Difficulty**: advanced
- **Bloom level**: analyze
- **Mastery threshold**: 0.75
- **Estimated hours**: 5

## Learning Objective
The student can explain DNA replication as a semi-conservative, enzyme-driven process
that copies the entire genome before cell division, correctly predicting what each
daughter molecule contains and why RNA primers are structurally required rather than
optional.

## Core Understanding
Before a cell divides, it must copy its entire genome so each daughter cell receives a
complete set of genetic information. Replication is **semi-conservative**: every new
double helix is built from one original (template) strand and one newly synthesised
strand — never all-new and never a random mix. This was not simply asserted; it was
proven experimentally (Meselson-Stahl, 1958) by density-labelling DNA and showing that
after one replication round, every molecule showed intermediate density, exactly as the
semi-conservative model predicts and neither of the two rival models could produce.

Mechanically: helicase unwinds the double helix at a replication fork; primase lays down
a short RNA primer because **DNA polymerase can only extend an existing 3′ end — it
cannot start a new strand from nothing**; DNA polymerase III then reads the template
3′→5′ and builds the new strand 5′→3′, pairing A–T and G–C. Because the two template
strands run antiparallel (established in `bio.mol.nucleic-acid-structure`) but
polymerase only works in one direction, one new strand (leading) is built continuously
while the other (lagging) is built in short fragments (Okazaki fragments) later joined by
ligase. DNA polymerase I then removes the RNA primers and fills the gaps. Fidelity is
extremely high (roughly one error per billion bases) because polymerase proofreads as it
goes.

## Mental Models
- **The unzip-and-rebuild model**: the helix is a zipper; helicase runs the zipper open,
  and two independent rebuilding crews work on the two now-separated strands.
- **"Primer is a running start, not a starting block"**: a runner (polymerase) can only
  push off from an existing surface (the primer's 3′–OH); it cannot spontaneously appear
  mid-track.
- **Antiparallel strands force asymmetric building**: because both new strands must be
  built 5′→3′ but the two templates run in opposite directions, one strand is built in
  one continuous pass and the other in a series of stitched fragments — this is a direct,
  necessary consequence of the antiparallel structure, not an arbitrary biological quirk.

## Why Students Fail
1. They import "conservative" or "dispersive" replication models from intuitive guesses
   about what "copying" should look like, since semi-conservative is the least obvious
   of the three logically possible outcomes.
2. They assume any polymerase-family enzyme can start a chain from scratch, because
   "polymerase" is introduced as the enzyme "that makes DNA," without the extend-only
   limitation being made an explicit, separate fact.
3. They do not yet connect the leading/lagging strand asymmetry back to the antiparallel
   structure of the double helix — it can be memorized as an arbitrary distinction rather
   than derived as a mechanical necessity.

## Misconceptions

### M1 — "Replication is conservative or dispersive" (Type 1: Overgeneralization)
**Statement**: After replication, either one daughter molecule is entirely original DNA
and the other is entirely new (conservative), or both daughter molecules are a random
mix of old and new fragments (dispersive).
**Origin**: Both alternatives are intuitively at least as plausible as semi-conservative
before the evidence is seen — "copying" in everyday experience often means either an
exact duplicate object alongside an untouched original, or a blend, not this specific
one-old-one-new pairing.
**Why it persists**: Without seeing the Meselson-Stahl density-gradient result, there is
no obvious reason to prefer semi-conservative over the other two logically consistent
options — the correct answer is empirical, not derivable from first principles alone.
**Repair**: Walk through what each of the three models predicts for the ¹⁵N/¹⁴N density
experiment specifically, then show that only the semi-conservative prediction (all
intermediate-density DNA after one round) matches the actual result — let the evidence
rule out the other two rather than asserting the answer.
**Diagnostic probe**: the existing misconception_probe asking what each daughter DNA
molecule contains after one round, with the "original DNA is degraded" distractor
flagged to this misconception.

### M2 — "RNA primers supply the nucleotides for the new strand" (Type 4: Notation/mechanism-induced)
**Statement**: The RNA primer is the material the new DNA strand is built from, or marks
gene boundaries, rather than serving purely as a starting point for polymerase.
**Origin**: The primer is introduced alongside the "polymerase builds the new strand"
explanation without clearly separating "what starts the reaction" (the primer's 3′–OH)
from "what the new strand is made of" (deoxyribonucleotides added by polymerase).
**Why it persists**: Because the RNA primer is later removed and replaced with DNA, its
role can look like an ingredient (later swapped out) rather than a mechanistic
requirement (a starting handle polymerase needs and can only extend from).
**Repair**: State explicitly that DNA polymerase's only limitation being tested here is
its inability to initiate — ask "if you gave polymerase, all four nucleotides, and a
single-stranded template with no primer, would replication start?" (No — it needs an
existing 3′ end.)
**Diagnostic probe**: the existing MCQ asking why RNA primers are necessary, with the
"primers provide the nucleotides" distractor flagged to this misconception.

## Analogies
- The zipper-and-two-crews model for the replication fork.
- "A runner needs a running start" for the primer/polymerase extend-only relationship.

## Demonstrations
- Walk through the Meselson-Stahl density-gradient experiment step by step (¹⁵N growth →
  switch to ¹⁴N → one round → centrifuge density band), predicting each rival model's
  band pattern before revealing the actual (semi-conservative) result.
- Draw a replication fork with both template strands' 5′/3′ ends labelled, then have the
  student mark which new strand must be continuous and which must be fragmented, deriving
  it from the antiparallel structure rather than being told which is which.

## Discovery Questions
- "If you mixed old and new DNA randomly (dispersive model), what would the density
  pattern look like after one round versus two rounds — and does that match what was
  actually observed?"
- "DNA polymerase can extend a strand but not start one. What does the cell need to
  provide before polymerase can do anything at all?"
- "Both template strands run in opposite directions, but polymerase always builds 5′→3′.
  What does that force to happen to one of the two new strands?"

## Teaching Sequence
1. State the problem: before dividing, the cell must copy the entire genome — introduce
   the three logically possible outcomes (conservative, semi-conservative, dispersive)
   before revealing which is correct.
2. Walk through Meselson-Stahl and let the density data itself rule out two of the three
   models, landing on semi-conservative as evidence-derived, not asserted.
3. Introduce the mechanics: helicase, the replication fork, and the antiparallel
   structure inherited from `bio.mol.nucleic-acid-structure`.
4. Establish polymerase's extend-only limitation explicitly, then introduce primase/RNA
   primers as the direct consequence of that limitation.
5. Derive leading vs. lagging strand synthesis as a forced consequence of antiparallel
   strands + 5′→3′-only polymerase, rather than presenting it as two arbitrary named
   strand types to memorize.
6. Close with proofreading and fidelity, connecting the high accuracy back to why genetic
   information can be trusted to persist across generations of cell division.

## Tutor Actions
- If a student proposes a conservative or dispersive model unprompted: treat it as a
  reasonable hypothesis, then walk them through what it would predict in Meselson-Stahl
  before correcting — do not simply say "wrong, it's semi-conservative."
- If a student says primers "become part of" the final DNA strand as nucleotide
  material: clarify they are removed and replaced — their role was purely to exist as a
  3′ starting point, not to contribute final sequence.
- If a student cannot explain why one strand is made continuously and the other in
  fragments: return to the antiparallel-strands diagram rather than re-stating the
  leading/lagging vocabulary.

## Voice Teaching Notes
Say "polymerase can only add on to something that's already there — it can never start
a brand-new strand by itself" rather than "primers help polymerase." Say "the answer
came from an experiment, not a guess — let's see what the density bands actually showed"
when introducing semi-conservative replication, to model evidence-based reasoning rather
than fact delivery.

## Assessment Signals
- **Early recovery**: after seeing the Meselson-Stahl data, correctly and independently
  rules out both conservative and dispersive models without being told which is wrong.
- **Fragile**: can state "replication is semi-conservative" as a memorized label but
  cannot predict what a conservative or dispersive model would have shown in the same
  experiment.
- **Deep gap**: still describes RNA primers as supplying "raw material" for the new
  strand after the extend-only limitation has been explained and re-explained — indicates
  the primer's actual mechanistic role was never rebuilt, only re-asserted.

## Tutor Recovery Strategy
For M1, do not just restate "it's semi-conservative" — re-run the density-gradient
prediction exercise for whichever model the student proposed and let the mismatch with
the real data do the correcting. For M2, ask the student to trace, nucleotide by
nucleotide, where the primer's RNA bases end up in the final DNA molecule (they don't —
they're excised) before re-explaining the extend-only limitation; a student who has
memorized "primers are needed" without ever tracing this will re-generate the
"primers become part of the DNA" error under a slightly different question.

## Memory Hooks
- "Semi-conservative: one old, one new, every time."
- "Polymerase extends. It never starts."
- "Antiparallel strands force one continuous strand, one stitched-together strand."

## Transfer Connections
- `bio.mol.nucleic-acid-structure`: the antiparallel double-helix structure that directly
  forces the leading/lagging strand asymmetry — this concept cannot be taught in
  isolation from that structural fact.
- `bio.mol.enzymes`: the active-site/specificity model that explains why polymerase can
  extend but not initiate, and why primase (a distinct enzyme) has no such limitation.
- `bio.mol.transcription` (unlocks): reuses the same antiparallel-template-reading logic
  but for RNA polymerase copying a single gene rather than the whole genome — the
  contrast (whole-genome vs. single-gene copying) is worth surfacing explicitly when that
  concept is taught.

## Cross-Subject Connections
No `cross_links` entry exists in the KG for this concept. A natural link to a
chemistry/biochemistry concept on hydrogen bonding and base-pairing energetics (why A–T
and G–C pairing is both selective and reversible enough for helicase to unwind) would
strengthen the "why does this mechanism work at all" layer, but is not authored here
since chemistry content is out of scope for this campaign.

## Blueprint References
No Blueprint exists for biology as a subject (per the standing note for this authoring
campaign); classification of both misconceptions above was performed directly against
`biologySeedAssets.ts`'s existing seed content using the birth-taxonomy diagnostic
procedure (`educational-brain/misconceptions/01-birth-taxonomy.md`).

## Runtime Asset References
- `core_explanation` (HIGH band): semi-conservative model, replication fork mechanics,
  leading/lagging strand synthesis, proofreading fidelity — `biologySeedAssets.ts`,
  `DNAREP_EXPLANATIONS[0]`.
- `misconception_repair` (HIGH band): Meselson-Stahl evidence for semi-conservative
  replication; primer-vs-primase extend/initiate distinction — `DNAREP_EXPLANATIONS[1]`.
- `mcq` (PROFICIENT): why RNA primers are necessary, nucleotide-supply distractor flagged
  to M2 — `DNAREP_PROBES[0]`.
- `misconception_probe` (DEVELOPING): daughter-molecule composition after one round,
  original-DNA-degraded distractor flagged to M1 — `DNAREP_PROBES[1]`.
- `short_answer` (PROFICIENT, probe-depth Batch 3): applies the leading/lagging-strand
  mechanism as a causal-reasoning task, closing this concept's 3-probe floor —
  `biologyDepthSeedAssets.ts`, conceptId `bio.mol.dna-replication`.

## Curriculum Feedback
None — the KG description (semiconservative replication, the four named enzymes, leading/
lagging strands, Okazaki fragments, origin of replication) matches the seed corpus's
actual coverage closely; "origin of replication" is named in the KG description but not
elaborated in the seed content beyond the replication-fork concept, a minor scope note
rather than a gap worth flagging.

## Version History
- 2026-09-20: Initial authoring (tenth recomputed topological frontier, batch of 3 with
  `bio.cell.cell-membrane-transport` and `bio.eco.community-ecology`), EB concept 45/199.
