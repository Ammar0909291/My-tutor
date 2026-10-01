# bio.plant.plant-tissue-systems — Plant Tissue Systems

## Identity
- **Concept ID**: `bio.plant.plant-tissue-systems`
- **Subject**: Biology
- **Domain**: Plant Biology (`bio.plant`)
- **Prerequisites**: `bio.cell.eukaryotic-cell`
- **Unlocks**: `bio.plant.secondary-growth-anatomy`, `bio.plant.plant-defense-mechanisms`, `bio.plant.plant-stress-physiology`, `bio.plant.mycorrhizae-plant-symbioses`
- **Cross-links (KG)**: (none)
- **Difficulty**: developing
- **Bloom level**: understand
- **Mastery threshold**: 0.7
- **Estimated hours**: 4

## Learning Objective
The student can correctly distinguish MERISTEMATIC tissue (actively dividing) from
PERMANENT tissue (differentiated, generally non-dividing), correctly classify a given
plant structure into ONE of the THREE permanent tissue systems (dermal, ground,
vascular) by its functional role, and correctly distinguish xylem from phloem by their
DISTINCT transport roles and directions.

## Core Understanding
Plant tissues divide fundamentally into two categories based on whether their cells
are actively DIVIDING or have already DIFFERENTIATED. **Meristematic tissue** consists
of actively-dividing, undifferentiated cells responsible for plant GROWTH — **apical
meristems** (located at root and shoot TIPS) drive growth in LENGTH (primary growth,
extending the plant longer), while **lateral meristems** (located along the SIDES of
roots and stems) drive growth in WIDTH (secondary growth, thickening the plant). The
essential distinguishing feature: meristematic cells remain capable of continued
division throughout the plant's life, unlike **permanent tissue**, whose cells have
already DIFFERENTIATED into a specialised, generally non-dividing final form suited
to a specific function.

Permanent tissue organises into THREE distinct tissue SYSTEMS, and classifying a given
plant structure requires checking its SPECIFIC functional role within the plant body.
The **dermal tissue system** forms the plant's OUTER covering (epidermis, and in
woody plants, periderm) — its functional role is PROTECTION (limiting water loss,
providing a barrier against pathogens/physical damage) and, in some cases, gas
exchange regulation. The **ground tissue system** makes up the BULK of the plant body,
filling the space between dermal and vascular tissue — its functional roles include
photosynthesis (in tissue containing chloroplasts), storage (of starch, water, or
other reserves), and structural SUPPORT. The **vascular tissue system** is
responsible specifically for LONG-DISTANCE TRANSPORT throughout the plant. The
classification task requires identifying which of these three functional roles
(protective covering, bulk filler/photosynthesis/storage, or long-distance transport)
a given structure serves.

Within the vascular tissue system, **xylem** and **phloem** are two DISTINCT tissue
types with genuinely DIFFERENT transport roles and directions, and students must not
conflate them. **Xylem** transports WATER and dissolved MINERALS, and this transport
moves in ONE PRIMARY DIRECTION: UPWARD, from roots to the rest of the plant (driven
largely by transpiration pull from water evaporating at the leaves). **Phloem**
transports PHOTOSYNTHATE (sugars produced by photosynthesis, primarily sucrose) and
can move in EITHER direction — from a "source" (a tissue currently producing or
releasing sugar, typically a photosynthesising leaf, or a storage organ releasing
reserves) to a "sink" (a tissue currently consuming or storing sugar, such as growing
tissue, roots, or fruit) — meaning the specific direction of phloem transport at any
given time depends on WHICH structures are currently acting as sources versus sinks,
unlike xylem's consistently upward direction. This xylem/phloem distinction provides
the structural foundation underlying both the plant's water-transport system and its
photosynthate-distribution system.

## Mental Models
- **The growing-tip-vs-finished-product model for meristematic vs. permanent tissue**:
  meristematic tissue is the actively-under-construction growing tip; permanent
  tissue is the finished, specialised product that construction produced.
- **The three-jobs model for tissue systems**: dermal (the protective skin), ground
  (the bulk filler doing photosynthesis/storage/support), vascular (the plumbing/
  transport network) — classify a structure by which of these three jobs it performs.
- **The one-way-highway-vs-flexible-delivery-route model for xylem vs. phloem**: xylem
  is a one-way highway running only upward (roots to shoot); phloem is a flexible
  delivery route that can run either direction depending on which end currently has
  supply (source) and which currently has demand (sink).

## Why Students Fail
- They treat meristematic and permanent tissue as differing only in "young versus
  old" without grasping the functional distinction: continued division capacity
  versus completed differentiation.
- They cannot classify a given plant structure into its correct tissue system because
  they memorise the three system names without connecting each to its SPECIFIC
  functional role (protection, bulk/photosynthesis/storage, or transport).
- They assume xylem and phloem both transport in the same fixed direction, missing
  that xylem moves consistently UPWARD while phloem's direction depends on the
  CURRENT source-to-sink relationship, which can vary.

## Misconceptions

No Blueprint exists yet for this concept, and no seed content exists in
`biologySeedAssets.ts` or `biologyDepthSeedAssets.ts` (confirmed via direct grep before
authoring): this concept is one of the 91 added by the 2026-09-14 KG extension and
currently has zero authored explanations or probes of any kind. Both misconceptions
below are therefore authored directly from first principles using the birth-taxonomy
diagnostic procedure (`educational-brain/misconceptions/01-birth-taxonomy.md`), and are
NOT tied to any existing seed-corpus probe — there is none to cite.

### M1 — "Xylem and phloem both transport in a fixed, single direction" (Type 1: Overgeneralization)
**Statement**: Both xylem and phloem are assumed to transport materials in a single,
fixed direction (typically imagined as always "upward" like xylem), without
recognising that phloem's transport direction depends on the CURRENT source-to-sink
relationship and can vary (sometimes upward, sometimes downward, depending on which
structures are currently producing versus consuming sugar).
**Origin**: Overgeneralizing from xylem's genuinely fixed, consistently upward
transport direction to the incorrect assumption that phloem works the same way,
without separately tracking that phloem's transport is governed by a DIFFERENT
principle (source-to-sink) rather than a fixed anatomical direction.
**Why it persists**: Without an explicit statement of the source-sink principle
governing phloem, the simpler "transport goes up" model (correct for xylem) can be
overextended to phloem as well.
**Repair**: State the distinction explicitly: xylem transports water/minerals in ONE
FIXED direction, upward from roots to shoot, driven by transpiration pull; phloem
transports photosynthate FROM a source (currently producing/releasing sugar) TO a
sink (currently consuming/storing sugar) — since which structures act as source
versus sink can change (e.g., a storage root can be a sink while growing, then a
source when its reserves are mobilised later), phloem's transport direction is NOT
anatomically fixed the way xylem's is.
**Verification-of-death**: given a scenario describing a storage root releasing its
sugar reserves to support new shoot growth, the learner correctly identifies the root
as currently acting as a SOURCE and the growing shoot as a SINK, with phloem
transport flowing from root to shoot (opposite to xylem's fixed upward direction),
rather than assuming phloem must also flow upward.

### M2 — "The three tissue systems are just anatomical locations, not functional categories" (Type 4: Notation-Induced)
**Statement**: Dermal, ground, and vascular tissue systems are memorised as
anatomical location labels ("outer layer," "middle," "veins") without connecting each
to its SPECIFIC functional role, making classification of novel/unfamiliar plant
structures difficult.
**Origin**: Introducing the three systems primarily by their spatial position
(outside, middle, running through) rather than by their functional role can leave the
classification criterion feeling purely positional rather than functional.
**Why it persists**: Without an explicit functional definition for each system,
students default to a purely spatial/positional classification heuristic, which fails
for structures whose function is not obvious from position alone.
**Repair**: State each system's SPECIFIC functional role explicitly: dermal tissue
provides PROTECTION (limiting water loss, forming a barrier); ground tissue provides
photosynthesis/storage/structural SUPPORT (the bulk-filling functional role); vascular
tissue provides long-distance TRANSPORT — classification of an unfamiliar structure
should proceed by asking which of these three functional roles it serves, not merely
where it is located.
**Verification-of-death**: given a description of an unfamiliar plant structure's
FUNCTION (e.g., a tissue storing starch reserves) rather than its location, the
learner correctly classifies it as ground tissue, citing the storage functional role
rather than needing to know its spatial position first.

## Analogies
- The growing-tip-vs-finished-product model for meristematic vs. permanent tissue (see
  Mental Models): under-construction versus finished specialised product.
- The three-jobs model for tissue systems (see Mental Models): protective skin, bulk
  filler, plumbing network.
- The one-way-highway-vs-flexible-delivery-route model for xylem vs. phloem (see
  Mental Models): a fixed-direction highway versus a demand-responsive delivery
  route.

## Demonstrations
- Present the storage-root-releasing-reserves scenario and ask the student to
  identify the source and sink and predict phloem's transport direction, contrasting
  with xylem's fixed direction.
- Present a plant structure's functional description (without stating its location)
  and ask the student to classify it into one of the three tissue systems using the
  functional-role criterion.

## Discovery Questions
- "If phloem can carry sugar either up or down depending on where it's needed, does
  it have one fixed direction like xylem? What determines its direction at any given
  moment?"
- "Could two DIFFERENT-looking plant structures both count as 'ground tissue'? What
  would they need to have in common functionally?"
- "Why does an actively-dividing meristem need to stay undifferentiated, while
  permanent tissue does not?"

## Teaching Sequence
1. Introduce meristematic versus permanent tissue by their functional distinction
   (continued division capacity vs. completed differentiation).
2. Introduce the three tissue systems by their functional roles, directly correcting
   the location-only misconception using the functional-description classification
   exercise.
3. Introduce xylem and phloem's transport roles, directly correcting the fixed-
   direction misconception using the storage-root scenario.
4. Close by connecting the tissue-system framework back to the general principle that
   plant structures are classified by function, not appearance or position alone.

## Tutor Actions
- If a student classifies a tissue system purely by location: ask them to state the
  specific functional role instead.
- If a student assumes phloem always transports upward: ask them to identify the
  current source and sink in a described scenario.
- If a student conflates meristematic and permanent tissue: ask them whether the
  cells in question are still capable of division.

## Voice Teaching Notes
Say "what's the function, not just the location?" whenever tissue system
classification comes up, to keep the functional criterion explicit. Say "source or
sink right now?" whenever phloem transport direction is discussed, to keep the
source-sink principle active.

## Assessment Signals
No seed corpus exists for this concept, so no item-bank diagnostic interpretation can
be given yet (see Runtime Asset References). The general diagnostic principle for M1,
once probes exist: a learner who identifies the current source and sink before
predicting phloem's direction shows the repaired model; a learner who assumes a fixed
upward direction for phloem is showing M1 in its cleanest, most-detectable form.

## Tutor Recovery Strategy
For M1, present the storage-root scenario and ask the student to predict phloem's
direction BEFORE revealing the answer, deriving the source-sink principle from the
prediction task itself. For M2, present the functional-description classification
exercise and require the student to classify using function, rather than accepting an
unspecific "it's in the middle" answer.

## Memory Hooks
- "Xylem only goes up; phloem goes wherever the source-to-sink demand points."
- "Dermal protects, ground fills and feeds and supports, vascular transports."
- "Still dividing means meristem; done dividing means permanent."

## Transfer Connections
- `bio.cell.eukaryotic-cell` (prerequisite): supplies the general cell-structure
  framework this concept specialises into plant-specific tissue organisation.
- `bio.plant.secondary-growth-anatomy` (unlocks): extends the lateral-meristem
  framework introduced here into detailed secondary growth anatomy.
- `bio.plant.plant-defense-mechanisms` (unlocks): applies the dermal tissue system's
  protective role introduced here to specific defense mechanisms.
- `bio.plant.plant-stress-physiology` (unlocks): applies the xylem/phloem transport
  framework introduced here to stress-related transport disruption.
- `bio.plant.mycorrhizae-plant-symbioses` (unlocks): extends the vascular/root tissue
  framework introduced here into symbiotic nutrient exchange.

## Cross-Subject Connections
No cross-subject connection is authored; the KG's own `cross_links` field for this
concept is empty.

## Blueprint References
No Blueprint exists for biology as a subject (per the standing note for this authoring
campaign). This concept has zero seed content of any kind (confirmed via direct grep
against `biologySeedAssets.ts` and `biologyDepthSeedAssets.ts`); both misconceptions
above were authored directly from first principles using the birth-taxonomy diagnostic
procedure (`educational-brain/misconceptions/01-birth-taxonomy.md`), following the
established precedent set by `bio.plant.photosynthesis` and
`bio.plant.plant-water-relations`.

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
The KG description's named sub-topics (meristematic versus permanent tissue; the
three permanent tissue systems — dermal, ground and vascular; xylem and phloem
structure and their distinct transport roles) are all covered in this EB entry
directly from first principles, since no seed content exists to check against. No
additional Curriculum Feedback gap is recorded for this entry.

## Version History
- 2026-09-21: Initial authoring (fifty-first recomputed topological frontier, batch of
  3 with `bio.cell.cell-adhesion-tissue-organization` and
  `bio.div.animal-body-plans-symmetry`, all first-principles entries — a SEVENTEENTH
  consecutive fully zero-seed-content batch, 0 of 17 frontier candidates), EB concept
  170/199.
