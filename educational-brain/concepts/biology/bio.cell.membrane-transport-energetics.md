# bio.cell.membrane-transport-energetics — Energetics of Membrane Transport

## Identity
- **Concept ID**: `bio.cell.membrane-transport-energetics`
- **Subject**: Biology
- **Domain**: Cell Biology (`bio.cell`)
- **Prerequisites**: `bio.cell.cell-membrane-transport`, `bio.mol.bioenergetics`
- **Unlocks**: (none in KG)
- **Cross-links (KG)**: `chem.thermo.gibbs`
- **Difficulty**: proficient
- **Bloom level**: apply
- **Mastery threshold**: 0.75
- **Estimated hours**: 4

## Learning Objective
The student can correctly classify a described transport process as passive or active
by evaluating its free-energy cost relative to the electrochemical gradient (not by
memorising a fixed list of named transporters), and can correctly distinguish primary
active transport (directly ATP-driven) from secondary active transport (powered by an
already-established gradient, via symport or antiport), predicting transport direction
from concentration and charge.

## Core Understanding
Membrane transport processes are classified fundamentally by their relationship to
**free energy** and the **electrochemical gradient** — not simply by whether a protein
is "involved" or by memorising which named transporters belong to which category.
**Passive transport** (simple diffusion, facilitated diffusion) moves a substance DOWN
its electrochemical gradient (from high to low concentration, or with the charge
gradient for an ion) — this process is thermodynamically favourable (releases free
energy) and therefore requires NO direct energy input from the cell, even when it
requires a specific channel or carrier protein to occur at a biologically useful rate.
**Active transport**, by contrast, moves a substance AGAINST its electrochemical
gradient (from low to high concentration, or against the charge gradient) — this is
thermodynamically UNFAVOURABLE (requires free energy input) and therefore necessarily
requires an energy source.

Active transport itself divides into two mechanistically distinct categories based on
WHERE that required energy comes from. **Primary active transport** uses ATP hydrolysis
DIRECTLY to power the transport — the pump protein itself binds and hydrolyses ATP as
part of its own transport cycle (the sodium-potassium pump, which uses ATP to pump
sodium out and potassium in against both gradients, is the canonical example).
**Secondary active transport** does NOT use ATP directly; instead, it uses the free
energy already stored in an EXISTING electrochemical gradient — one that was itself
established by a separate primary active transport process — to power movement of a
different substance against ITS gradient. Secondary active transport takes one of two
directional forms: **symport** (both substances move across the membrane in the SAME
direction, with the gradient-favoured substance's downhill movement powering the other
substance's uphill movement) and **antiport** (the two substances move in OPPOSITE
directions across the membrane).

Because these classifications are defined by free-energy relationships rather than by a
fixed list, transport DIRECTION for any specific substance can be predicted
quantitatively from its concentration gradient and, for a charged substance, the
electrical potential across the membrane — both must be considered together (the
combined "electrochemical" gradient), since a concentration gradient favouring one
direction can be outweighed by a sufficiently strong electrical gradient favouring the
opposite direction, or vice versa.

## Mental Models
- **Downhill is free, uphill costs energy — the "which way, and who pays?" test**: for
  any transport process, first identify which direction is "downhill" (with the
  electrochemical gradient, thermodynamically favourable) versus "uphill" (against it,
  requiring energy) — passive transport only ever goes downhill; active transport goes
  uphill and therefore must have an energy source, and asking "who pays for this uphill
  movement — ATP directly, or a pre-existing gradient?" distinguishes primary from
  secondary active transport.
- **Secondary active transport as borrowing against an existing loan**: a primary active
  transport pump (like the sodium-potassium pump) is like taking out an ATP-funded loan
  to establish a steep gradient; secondary active transport then "borrows against" that
  already-established gradient (letting sodium flow back downhill) to power a DIFFERENT
  substance's uphill movement, without needing to take out a fresh ATP loan of its own.

## Why Students Fail
1. They classify transport processes by memorising which specific named transporters
   are "active" or "passive," rather than applying the underlying free-energy/gradient
   test to a novel, unfamiliar transporter.
2. They treat "requires a protein" as equivalent to "requires energy," missing that
   facilitated diffusion requires a specific channel or carrier protein but is still
   passive (no direct energy cost) because it still moves the substance DOWN its
   gradient.
3. They fail to combine concentration gradient and electrical charge into a single
   COMBINED electrochemical gradient when predicting transport direction for an ion,
   evaluating only the concentration gradient (or only the charge) in isolation.

## Misconceptions

No Blueprint exists yet for this concept, and no seed content exists in
`biologySeedAssets.ts`: this concept is one of the 91 added by the 2026-09-14 KG
extension and currently has zero authored explanations or probes of any kind (confirmed
via direct grep against `biologySeedAssets.ts` and `biologyDepthSeedAssets.ts` before
authoring). Both misconceptions below are therefore authored directly from first
principles using the birth-taxonomy diagnostic procedure
(`educational-brain/misconceptions/01-birth-taxonomy.md`), and are NOT tied to any
existing seed-corpus probe — there is none to cite.

### M1 — "A transport process requiring a protein must be active transport" (Type 1: Overgeneralization)
**Statement**: Any membrane transport process that requires a specific channel or
carrier protein (rather than occurring by simple diffusion through the lipid bilayer
directly) is assumed to be active transport, on the reasoning that "needing help" from a
protein implies "needing energy."
**Origin**: Overgeneralizing from the correct observation that active transport DOES
require a protein pump, to the incorrect converse — that requiring a protein is
SUFFICIENT to classify a process as active — without separately checking the actual
defining criterion (direction relative to the electrochemical gradient, and therefore
free-energy cost).
**Why it persists**: Both facilitated diffusion and active transport are introduced
together as "protein-mediated transport" in contrast to simple diffusion, which can
obscure that only ONE of the two (active transport) actually requires energy, while both
require a protein.
**Repair**: State the defining test explicitly and apply it directly to facilitated
diffusion: does the substance move WITH or AGAINST its electrochemical gradient? Glucose
moving into a cell via a GLUT transporter, when intracellular glucose concentration is
lower than extracellular, is moving DOWN its gradient — this is facilitated diffusion
(passive, no direct energy cost) DESPITE requiring a specific transporter protein,
because the direction-relative-to-gradient test, not the presence of a protein, is what
actually determines the classification.
**Diagnostic probe**: none exists in the seed corpus; a future probe should present a
protein-mediated but gradient-favoured transport scenario (e.g., GLUT-transporter
glucose uptake) with an "active transport, because a protein is required" distractor
explicitly flagged to this misconception.

### M2 — "Secondary active transport doesn't really require energy, since no ATP is used directly" (Type 4: Notation/mechanism-induced)
**Statement**: Because secondary active transport does not use ATP directly, it is
assumed not to genuinely require energy at all, or to be functionally equivalent to
passive transport.
**Origin**: Focusing narrowly on the SPECIFIC energy currency (ATP) rather than on the
underlying free-energy requirement itself, missing that the energy for secondary active
transport still ultimately traces back to ATP — spent originally by the primary active
transport pump that established the gradient being "borrowed" from.
**Why it persists**: The absence of a direct ATP-hydrolysis step in the secondary
transporter's own mechanism can make the process look energy-free if the origin of the
gradient it exploits is not explicitly traced back to an earlier ATP-consuming step.
**Repair**: State explicitly that secondary active transport still moves its target
substance AGAINST that substance's own electrochemical gradient — which is
thermodynamically unfavourable and therefore DOES require energy — but that energy is
supplied by the free energy released as a DIFFERENT substance moves down ITS OWN
gradient, a gradient that was itself established earlier by ATP-consuming primary active
transport. The energy is real; it is simply borrowed indirectly rather than spent
directly at this specific transport step.
**Diagnostic probe**: none exists in the seed corpus; a future probe should present a
symport or antiport scenario and ask whether the transported substance moves with or
against its own gradient, with a no-energy-required distractor explicitly flagged to
this misconception.

## Analogies
- The "which direction, and who's paying?" checklist model: for any transport process,
  first determine the substance's OWN concentration/charge gradient direction, then ask
  whether the process moves it WITH (free, passive) or AGAINST (costs energy, active)
  that gradient — a protein being present or absent is not part of this test at all.
- The relay-race model for secondary active transport: the primary active transport pump
  runs the FIRST leg of the race using its own fuel (ATP) to build up a "lead"
  (gradient); the secondary transporter then runs the SECOND leg, using the energy of
  that already-built lead (the first substance flowing back downhill) to carry the
  second substance uphill — the second runner never touches the original fuel supply
  directly, but the whole race is still powered by it.

## Demonstrations
- Present the sodium-glucose symporter (SGLT) as a worked secondary active transport
  example: sodium flows DOWN its gradient (established earlier by the ATP-driven
  sodium-potassium pump) while glucose is simultaneously carried UP its own gradient —
  asking the student to trace the energy back to its ultimate ATP source.
- Present a GLUT-transporter glucose-uptake scenario (facilitated diffusion) alongside
  the SGLT symporter scenario (secondary active transport) side by side, asking the
  student to apply the gradient-direction test to correctly classify each despite both
  requiring a specific transport protein.

## Discovery Questions
- "A glucose transporter protein moves glucose into a cell where intracellular glucose
  concentration is already lower than outside. Does this transporter require energy?
  What test would you use to decide, rather than just checking whether a protein is
  involved?"
- "If secondary active transport doesn't use ATP directly, where does its energy
  actually come from? Trace it back as far as you can."
- "Sodium is pumped out of a cell by the sodium-potassium pump (using ATP), and then a
  DIFFERENT symporter lets sodium flow back IN while carrying glucose in with it. Is any
  energy 'wasted' by letting sodium flow back in, or is that flow being productively
  used?"

## Teaching Sequence
1. Introduce the electrochemical gradient and the direction-relative-to-gradient test as
   the defining criterion for passive versus active transport, before naming any
   specific transporters.
2. Apply the test directly to facilitated diffusion, correcting the
   protein-requires-energy misconception using the GLUT-transporter example.
3. Introduce primary active transport (sodium-potassium pump) as the direct-ATP case.
4. Introduce secondary active transport (symport/antiport) using the sodium-glucose
   symporter, tracing its energy source back to the primary pump, correcting the
   secondary-transport-is-energy-free misconception.
5. Close with quantitative prediction practice: given a concentration gradient and
   membrane potential for a specific ion, predict its net direction of movement under
   passive transport.

## Tutor Actions
- If a student classifies a transporter as active solely because a protein is involved:
  redirect them to the gradient-direction test and ask which way the substance is
  actually moving relative to its own gradient.
- If a student describes secondary active transport as energy-free: ask them to trace
  the energy source of the gradient being exploited back to its original ATP-consuming
  step.
- If a student evaluates only concentration OR only charge for an ion's transport
  direction: ask them to state both separately, then combine them into a single
  electrochemical-gradient prediction.

## Voice Teaching Notes
Say "which way, and who's paying?" whenever a transport process is being classified, to
keep the gradient-direction/energy-source test active rather than a protein-presence
shortcut. Say "trace it back" whenever secondary active transport comes up, to keep the
indirect-but-real ATP origin explicit.

## Assessment Signals
No seed corpus exists for this concept, so no item-bank diagnostic interpretation can be
given yet (see Runtime Asset References). The general diagnostic principle for M1, once
probes exist: a learner who correctly classifies a protein-mediated, gradient-favoured
transport scenario as passive shows the repaired model; a learner who classifies it as
active solely because a protein is present is showing M1 in its cleanest,
most-detectable form.

## Tutor Recovery Strategy
For M1, present the GLUT-transporter glucose-uptake scenario and ask the student to
state, specifically, which direction (relative to the gradient) glucose is moving,
BEFORE asking them to classify the process — forcing the gradient-direction answer to
come first, rather than letting "a protein is involved" substitute for it. For M2,
present the sodium-glucose symporter and ask the student to trace sodium's own gradient
back to its origin (the sodium-potassium pump), then ask them to state where that
original pump got ITS energy, walking the chain back to ATP explicitly.

## Memory Hooks
- "Downhill is free, uphill costs — direction relative to the gradient is what matters,
  not whether a protein is involved."
- "Primary: pays ATP directly. Secondary: borrows against a gradient someone else paid
  for."
- "Combine concentration AND charge — the electrochemical gradient is both together, not
  either alone."

## Transfer Connections
- `bio.cell.cell-membrane-transport` (prerequisite): supplies the passive/active
  transport categories and named transporter examples this concept re-frames using a
  quantitative, free-energy-based classification test.
- `bio.mol.bioenergetics` (prerequisite): supplies the free-energy and ATP-hydrolysis
  concepts this concept applies specifically to membrane transport direction and cost.
- `chem.thermo.gibbs` (cross-linked in the KG): connects this concept's
  favourable/unfavourable transport-direction reasoning to the Gibbs free-energy
  framework from chemistry.

## Cross-Subject Connections
The KG's own `cross_links` field connects this concept to `chem.thermo.gibbs`
(Chemistry's Gibbs free-energy concept) — the passive/active transport distinction
introduced here is a direct biological application of that thermodynamic framework
(spontaneous vs. non-spontaneous processes), authored here from first principles since
no seed content exists to draw the connection from directly.

## Blueprint References
No Blueprint exists for biology as a subject (per the standing note for this authoring
campaign). This concept has zero seed content of any kind (confirmed via direct grep
against `biologySeedAssets.ts` and `biologyDepthSeedAssets.ts`); both misconceptions
above were authored directly from first principles using the birth-taxonomy diagnostic
procedure (`educational-brain/misconceptions/01-birth-taxonomy.md`), following the
established precedent set by `bio.found.scientific-method-in-biology` and
`bio.found.unifying-themes-in-biology`.

## Runtime Asset References
No seed content of any kind exists for this concept in `biologySeedAssets.ts` or
`biologyDepthSeedAssets.ts` — this is one of the 91 concepts added by the 2026-09-14 KG
extension. This EB entry is authored entirely from first principles and does not cite
any runtime asset. Seeding `core_explanation`/`misconception_repair`/`mcq`/
`misconception_probe` content for this concept, and a probe-depth `short_answer` to
reach the 3-probe contract floor, remain outstanding tasks for whichever future
initiative seeds content for the 91-concept KG-extension pool (a separate, larger,
not-yet-started task per the standing note in `CLAUDE.md`'s Biology program section).

## Curriculum Feedback
The KG description's named sub-topics (passive vs. active transport by free-energy
cost; primary vs. secondary active transport via symport/antiport; quantitative
reasoning about transport direction from concentration and charge) are all covered in
this EB entry directly from first principles, since no seed content exists to check
against. No additional Curriculum Feedback gap is recorded for this entry.

## Version History
- 2026-09-20: Initial authoring (twenty-ninth recomputed topological frontier, batch of
  3 with `bio.biotech.genomics-proteomics` and `bio.physio.homeostasis-thermoregulation`;
  this entry and `bio.physio.homeostasis-thermoregulation` are ZERO-seed-content entries
  authored from first principles, continuing the shift flagged in the prior batch), EB
  concept 103/199.
