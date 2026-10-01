# bio.cell.cytoskeleton-motility — Cytoskeletal Motility

## Identity
- **Concept ID**: `bio.cell.cytoskeleton-motility`
- **Subject**: Biology
- **Domain**: Cell Biology (`bio.cell`)
- **Prerequisites**: `bio.cell.cytoskeleton`
- **Unlocks**: (none in KG)
- **Cross-links (KG)**: (none)
- **Difficulty**: proficient
- **Bloom level**: analyze
- **Mastery threshold**: 0.75
- **Estimated hours**: 4

## Learning Objective
The student can correctly distinguish actin-myosin-based cell CRAWLING from
sarcomere-based muscle contraction (same core proteins, fundamentally different
organisation and purpose), correctly distinguish kinesin (generally toward the
microtubule plus-end) from dynein (generally toward the minus-end) as motors moving in
OPPOSITE default directions along the SAME microtubule tracks, and correctly explain
that the 9+2 axoneme's beating pattern arises from motor proteins sliding adjacent
microtubule doublets PAST each other (not from the microtubules themselves contracting).

## Core Understanding
The cytoskeleton is not merely a static scaffold — it actively DRIVES cellular motility
through several distinct mechanisms built from the same core cytoskeletal
components already introduced. **Actin-myosin-based cell crawling** uses the SAME two
protein families (actin filaments, myosin motor proteins) that drive MUSCLE
contraction, but organises them in a fundamentally DIFFERENT way for a fundamentally
different purpose: rather than the highly ordered, repeating sarcomere structure that
produces coordinated, whole-cell SHORTENING in muscle, a crawling cell (e.g., a white
blood cell, or a fibroblast) extends actin-rich protrusions (lamellipodia, filopodia) at
its LEADING edge through localised actin polymerisation, forms new adhesion contacts
with the substrate, and then uses myosin-generated CONTRACTILE force at its trailing
edge to pull the cell body forward — a spatially organised, directional PROCESS rather
than the synchronised, whole-structure shortening seen in a muscle sarcomere.

**Microtubule motor proteins** drive a SEPARATE motility function: intracellular CARGO
TRANSPORT along microtubule "tracks." Microtubules are structurally POLAR (their two
ends, the plus-end and the minus-end, are chemically distinct), and this polarity
determines which of two major motor protein families moves cargo in which DEFAULT
direction: **kinesin** motors generally move cargo TOWARD the microtubule's PLUS-end
(typically outward, toward the cell periphery), while **dynein** motors generally move
cargo TOWARD the microtubule's MINUS-end (typically inward, toward the cell centre) —
these two motor families move in OPPOSITE default directions along the SAME set of
microtubule tracks, which is precisely what allows a cell to transport cargo in EITHER
direction as needed, simply by attaching the appropriate motor.

The **9+2 axoneme** — the core structural arrangement found in cilia and flagella —
consists of nine outer microtubule DOUBLET pairs arranged in a ring around two central
single microtubules. Ciliary and flagellar BEATING arises specifically from dynein motor
proteins, anchored between ADJACENT outer doublets, actively generating force that
SLIDES neighbouring doublets PAST one another along their length; because the doublets
are physically constrained by cross-linking structural proteins that prevent them from
sliding freely apart, this sliding force is converted into a BENDING motion of the
whole axoneme rather than the doublets simply separating — it is this sliding-converted-
to-bending mechanism, not any contraction of the microtubules themselves, that produces
the characteristic beating pattern. Finally, cytoskeletal REMODELLING — the ongoing
assembly and disassembly of actin filaments and microtubules — is essential and
continuously active during cell DIVISION (forming the mitotic spindle and the
cytokinetic contractile ring), cell MIGRATION (extending and retracting protrusions),
and general cell SHAPE change, meaning the cytoskeleton is a dynamic, constantly
reorganising system rather than a fixed, permanent internal skeleton.

## Mental Models
- **Same parts, different blueprint**: actin and myosin in a crawling cell versus in a
  muscle sarcomere are like the SAME set of building materials (bricks, beams) used to
  construct two very different structures for two very different purposes — recognising
  the shared materials should not lead to assuming the resulting structures or
  functions are the same.
- **One-way tracks with two different trains**: microtubules function like a
  ONE-DIRECTION-LABELLED railway track (a defined plus-end and minus-end); kinesin and
  dynein are like two DIFFERENT trains that each, by default, only run toward one
  specific end of that track — attaching the right "train" (motor) determines which
  direction a piece of cargo travels.
- **Sliding doublets, not squeezing microtubules**: axoneme bending works like two
  adjacent, flexible rulers being pushed to slide lengthwise past each other while tied
  together at intervals — the sliding-plus-tethering combination produces a BEND, even
  though neither ruler itself is shrinking or squeezing.

## Why Students Fail
1. They assume actin-myosin-based cell crawling works through the SAME sarcomere-based
   contraction mechanism as muscle, missing that crawling uses a spatially organised,
   directional process (leading-edge protrusion, trailing-edge contraction) rather than
   synchronised whole-structure shortening.
2. They treat kinesin and dynein as interchangeable or as moving in the SAME default
   direction, missing that they are specifically OPPOSITE-direction motors (kinesin
   toward the plus-end, dynein toward the minus-end) exploiting microtubule polarity.
3. They assume ciliary/flagellar beating results from the microtubules themselves
   CONTRACTING or shortening, missing that the mechanism is motor-driven SLIDING between
   adjacent doublets, converted into bending by structural constraints that prevent free
   separation.

## Misconceptions

No Blueprint exists yet for this concept, and no seed content exists in
`biologySeedAssets.ts`: this concept is one of the 91 added by the 2026-09-14 KG
extension and currently has zero authored explanations or probes of any kind (confirmed
via direct grep against `biologySeedAssets.ts` and `biologyDepthSeedAssets.ts` before
authoring). Both misconceptions below are therefore authored directly from first
principles using the birth-taxonomy diagnostic procedure
(`educational-brain/misconceptions/01-birth-taxonomy.md`), and are NOT tied to any
existing seed-corpus probe — there is none to cite.

### M1 — "Actin-myosin cell crawling works the same way as muscle contraction" (Type 1: Overgeneralization)
**Statement**: Because cell crawling and muscle contraction both use actin and myosin,
crawling is assumed to work through the SAME sarcomere-based sliding-filament mechanism
that produces coordinated whole-structure shortening in muscle.
**Origin**: Overgeneralizing from the SHARED protein components (actin, myosin) to an
incorrect inference about the SHARED organisational mechanism, without separately
tracking that muscle's highly ordered sarcomere repeat structure is a SPECIFIC
specialisation not present in a crawling cell's more loosely organised, spatially
polarised actin network.
**Why it persists**: Both processes are introduced under the broad heading "actin-myosin
motility," and without an explicit statement that muscle's sarcomere organisation is a
SPECIALISED case rather than the general default, the shared-components fact can be
mistaken for a shared-mechanism fact.
**Repair**: State the contrast explicitly: muscle contraction relies on a highly
ordered, repeating SARCOMERE structure that produces coordinated, synchronised
shortening across the whole structure; cell crawling instead relies on LOCALISED,
spatially polarised actin dynamics — polymerisation extending a leading-edge
protrusion, new adhesions forming, and myosin-generated contraction at the trailing
edge pulling the cell body forward — a directional, asymmetric PROCESS rather than a
synchronised, symmetric shortening.
**Verification-of-death**: given a description of a migrating cell's leading and
trailing edges, the learner correctly identifies which specific process (actin
polymerisation vs. myosin-driven contraction) is occurring at each location, rather
than describing the whole cell as "contracting" uniformly like a sarcomere.

### M2 — "Ciliary/flagellar beating results from the microtubules contracting" (Type 4: Notation/mechanism-induced)
**Statement**: The bending motion of a beating cilium or flagellum is assumed to result
from the microtubules THEMSELVES actively shortening or contracting, similar to how a
muscle fibre contracts.
**Origin**: Overextending the muscle-contraction mental model (a structure actively
shortening to produce movement) onto a mechanistically DIFFERENT system, where the
microtubules themselves do not change length at all — motor proteins instead generate
SLIDING force between adjacent structures, which structural constraints then convert
into bending.
**Why it persists**: "Beating" and "contraction" are both associated with muscle-like
active shortening in everyday usage, and without an explicit statement that the
axoneme's microtubules do NOT shorten, the contraction-based mental model can transfer
uncorrected.
**Repair**: State the actual mechanism explicitly: dynein motors anchored BETWEEN
adjacent outer doublets generate force that SLIDES those doublets PAST one another
along their length; because cross-linking structural proteins prevent the doublets from
sliding freely apart, this sliding force is converted into BENDING of the whole
axoneme — the individual microtubules themselves never change length or contract.
**Verification-of-death**: given the axoneme bending scenario, the learner correctly
identifies dynein-driven SLIDING between doublets (converted to bending by structural
constraints) as the mechanism, rather than describing the microtubules as actively
shortening.

## Analogies
- The shared-toolkit-different-buildings model for M1: actin and myosin used in muscle
  versus in cell crawling are like the SAME construction toolkit (hammers, nails) used
  to build a factory assembly line (muscle's synchronised sarcomere shortening) versus a
  scaffolding crew repositioning itself piece by piece across a building site (a
  crawling cell's localised, directional protrusion-and-contraction cycle) — same tools,
  very different structures and processes.
- The two-rulers-sliding-and-tied-together model for axoneme bending: picture two
  flexible rulers lying side by side, tied together loosely at several points along
  their length — if you push one ruler to slide lengthwise relative to the other, the
  ties prevent them from simply separating, and the whole assembly BENDS as a result,
  even though neither ruler itself got shorter.

## Demonstrations
- Present a migrating cell's leading edge (actin polymerisation, protrusion) and
  trailing edge (myosin-driven contraction) side by side, asking the student to
  identify which specific process is occurring at each location, contrasting this with
  a muscle sarcomere's synchronised, whole-structure shortening.
- Walk the axoneme-bending mechanism step by step: dynein motors generate sliding force
  between adjacent doublets → structural cross-links prevent free separation → sliding
  force converts to bending — asking the student to state what specifically changes
  (relative doublet position) versus what does NOT change (individual microtubule
  length).

## Discovery Questions
- "Cell crawling and muscle contraction both use actin and myosin. Does that mean they
  work through the exact same mechanism? What's actually different about how each is
  organised?"
- "Kinesin and dynein both move along microtubules. Do they move in the same default
  direction, or opposite directions? What makes this useful for a cell?"
- "If a beating flagellum's microtubules don't actually get shorter, what mechanism
  produces the bending motion instead?"

## Teaching Sequence
1. Introduce actin-myosin-based cell crawling as a spatially organised, directional
   process, directly contrasting it against muscle's sarcomere-based synchronised
   shortening.
2. Introduce kinesin and dynein as opposite-direction motors exploiting microtubule
   polarity, using the cargo-transport example.
3. Introduce the 9+2 axoneme structure and directly correct the microtubule-contraction
   misconception using the sliding-converted-to-bending mechanism.
4. Close by connecting cytoskeletal remodelling's role across division, migration, and
   shape change, reinforcing the cytoskeleton's dynamic (not fixed) nature.

## Tutor Actions
- If a student describes cell crawling as sarcomere-like contraction: ask them to
  identify what SPECIFIC process is occurring at the leading edge versus the trailing
  edge of a migrating cell.
- If a student treats kinesin and dynein as moving the same direction: ask them to state
  each motor's DEFAULT direction relative to the microtubule's plus- and minus-ends.
- If a student attributes axoneme bending to microtubule contraction: ask them what
  SPECIFIC mechanism (sliding between doublets) actually produces the bend.

## Voice Teaching Notes
Say "same proteins, different blueprint" whenever cell crawling is contrasted with
muscle contraction, to keep the shared-components-not-shared-mechanism distinction
active. Say "sliding, not shrinking" whenever axoneme bending is discussed, to keep the
sliding-doublets mechanism distinct from a contraction-based reading.

## Assessment Signals
No seed corpus exists for this concept, so no item-bank diagnostic interpretation can be
given yet (see Runtime Asset References). The general diagnostic principle for M2, once
probes exist: a learner who correctly attributes axoneme bending to dynein-driven
sliding between doublets (constrained by cross-links) shows the repaired model; a
learner who describes the microtubules as actively shortening is showing M2 in its
cleanest, most-detectable form.

## Tutor Recovery Strategy
For M1, present the migrating-cell scenario and ask the student to describe,
SEPARATELY, what is happening at the leading edge and at the trailing edge, checking
whether they can identify two DIFFERENT localised processes rather than one uniform
"contraction." For M2, walk the axoneme-bending mechanism step by step WITH the student,
asking them to predict what happens to the doublets' RELATIVE position (sliding) versus
their INDIVIDUAL length (unchanged) at each step.

## Memory Hooks
- "Same actin and myosin, but crawling is protrusion-then-pull, not sarcomere squeeze."
- "Kinesin heads toward the plus-end; dynein heads toward the minus-end — opposite
  default trains on the same track."
- "Doublets slide past each other, tied at intervals — that's what bends the axoneme,
  not shrinking microtubules."

## Transfer Connections
- `bio.cell.cytoskeleton` (prerequisite): supplies the actin filament and microtubule
  structural foundations this concept applies specifically to motility mechanisms.

## Cross-Subject Connections
No cross-subject connection is authored; the KG's own `cross_links` field for this
concept is empty.

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
The KG description's named sub-topics (actin-myosin cell crawling distinct from muscle
contraction; kinesin/dynein cargo transport; 9+2 axoneme structure and ciliary/
flagellar beating; cytoskeletal remodelling during division, migration, and shape
change) are all covered in this EB entry directly from first principles, since no seed
content exists to check against. No additional Curriculum Feedback gap is recorded for
this entry.

## Version History
- 2026-09-20: Initial authoring (thirty-fourth recomputed topological frontier, batch of
  3 with `bio.sys.synthetic-biology` — seed-content-backed — and
  `bio.neuro.sensory-transduction`, a further first-principles entry), EB concept
  119/199.
