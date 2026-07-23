# Gravitational Field and Field Lines — `phys.mech.gravitational-field`

## Identity

- **Concept ID**: `phys.mech.gravitational-field` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 7.
- **Prerequisites**: `phys.mech.universal-gravitation` — the load-bearing
  part is reframing the force law F = Gm₁m₂/r² as a FIELD property (force
  per unit mass) belonging to the source alone, the Advanced mental model
  already previewed in the prerequisite entry.
- **Unlocks** (from KG): `phys.mech.gravitational-potential`.
- **Difficulty**: proficient · **Bloom**: understand · **Mastery
  threshold**: 0.80 · **Est. hours**: 4

## Learning Objective

The learner can: (1) correctly define gravitational field strength as
g = F/m (force per unit mass), and correctly explain that g is a property
of SPACE around a source mass, existing whether or not a test mass is
actually there to feel it; (2) correctly distinguish the gravitational
FIELD (g, existing everywhere around a mass) from the gravitational FORCE
(F, which requires a second mass actually present to act upon);
(3) correctly explain that the gravitational field never truly reaches
zero at any finite distance from a mass — it merely becomes vanishingly
small — countering the belief that a field has a hard cutoff "surface" or
edge.

## Core Understanding

Gravitational field strength, g = F/m (force per unit test mass), is a
property of the SPACE surrounding any mass, existing at every point
whether or not a second mass is actually there to experience the resulting
force — much like a public radio broadcast fills the air whether or not a
receiver is tuned in to it. This reframing separates the field (a
property of the source mass alone, defined everywhere in space) from the
force (which requires a specific second mass, present at a specific point,
to actually be pulled). Because g = GM/r² (following directly from
F = GMm/r² divided by the test mass m), the field, like the force it
generates, never truly reaches exactly zero at any finite distance — it
merely becomes small enough to be practically negligible, exactly as
already established for the underlying force law.

## Mental Models

**Beginner**: "Gravitational field is basically the same thing as
gravitational force, just a different name." Upgrade trigger: asking
whether a gravitational field exists at a point in space where no object
happens to be present directly confronts the force/field conflation.

**Intermediate**: "Field (g = F/m) is a property of space around a source
mass; force requires an actual second mass present." This model correctly
separates field from force, but sometimes still imagines the field has a
definite boundary/edge where it "stops."

**Advanced**: "The gravitational field, like the force generating it,
follows an inverse-square falloff and never reaches exactly zero at any
finite distance — it is present, however weakly, throughout all of space
around any mass."

**Expert**: gravitational field as directly analogous in mathematical
structure to the electric field (force per unit charge) — a preview of the
same field concept recurring across forces — not required for mastery.

## Why Students Fail

The dominant failure is force-field conflation, treating "field" as simply
another word for "force" rather than a distinct, space-filling property
existing independent of whether a test mass is present; a secondary
failure carries forward the "gravity stops at some distance" misconception
from the prerequisite concept, now applied to the field specifically.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.gravitational-field.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-FIELD-IS-FORCE**: gravitational field treated as identical to
  gravitational force, with no distinct meaning of its own. **Birth
  type**: language contamination (Type 3) — both concepts are introduced
  together and closely related (g = F/m), inviting a blurred, undistinguished
  usage. Probe: "Does a gravitational field exist at a point in empty
  space where no object is currently present to feel a force?"
- **MC-FIELD-STOPS-AT-SURFACE**: belief the gravitational field has a
  definite boundary or "edge" beyond which it simply doesn't exist. **Birth
  type**: overgeneralization (Type 1) — carried forward from the same
  underlying misconception (MC-GRAVITY-STOPS) already addressed for the
  force in the prerequisite concept, now reapplied to the field framing.
  Probe: "Is there a specific distance from Earth beyond which the
  gravitational field becomes exactly zero, or does it just keep getting
  weaker forever?"

## Analogies

**Best**: a radio station's broadcast signal filling a room whether or not
a radio is switched on to receive it — the signal (field) is present
regardless of a receiver (test mass); only when a radio IS present and
tuned in does an actual audible output (force) result. Directly targets
MC-FIELD-IS-FORCE by separating "signal present" from "receiver
responding."

**Anti-analogy**: do NOT say "the gravitational field is the force a mass
would feel" as an unqualified definition — this framing, while not
technically false, blurs field and force together linguistically,
reinforcing MC-FIELD-IS-FORCE; always state field as force PER UNIT MASS,
a ratio/property, not the force itself.

## Demonstrations

Conceptual/diagrammatic: draw gravitational field lines around a mass,
extending the diagram far beyond any "reasonable" distance and asking
students to identify where the lines should stop — directly targets
MC-FIELD-STOPS-AT-SURFACE by making the "they never actually stop, just
thin out" point visually explicit, mirroring the inverse-square-law
diagram from the prerequisite concept.

## Discovery Questions

Discovery-style: "if no object is present at a point in space near a
planet, is there still 'something' there gravitationally, or is there
truly nothing until an object arrives?" — directly confronting
MC-FIELD-IS-FORCE by having the learner reason through the radio-broadcast
analogy before the formal g = F/m definition is given.

## Teaching Sequence

Blueprint's teaching-sequence component cited by reference.
MC-FIELD-IS-FORCE repaired first (establishing field as a space-filling
property distinct from force), before MC-FIELD-STOPS-AT-SURFACE, since the
field-stops misconception depends on already treating "field" as a
distinct, spatially-extended entity worth asking "where does IT stop" about.

## Tutor Actions

ANALOGY (radio broadcast vs. receiver); DEMONSTRATION (extended field-line
diagram); THOUGHT-EXPERIMENT (does field exist with no test mass present).

## Voice Teaching Notes

Listen for "field" and "force" used interchangeably in a learner's own
explanation — the MC-FIELD-IS-FORCE tell. Load-bearing sentence: "the
field is there whether or not anything is around to feel it — force
needs an actual second mass present." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner denying a field exists at an empty point in space signals
MC-FIELD-IS-FORCE (MISCONCEIVING, full repair via the radio-broadcast
analogy). Mastery trigger: correctly stating a gravitational field exists
independent of test-mass presence, AND correctly denying the field has a
hard cutoff distance. Blueprint's assessment component cited for the full
item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget force for a second — is there 'something'
gravitational happening at this empty point in space, or truly nothing?"
(isolating the field-as-space-property intuition). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (field vs. force distinction) bound to the already-secure
inverse-square relationship. Interleave with `phys.mech.universal-gravitation`
and, once authored, `phys.mech.gravitational-potential`.

## Transfer Connections

Near: any field-strength calculation problem. Far: satellite orbit design
(field strength at various altitudes) and geophysics (local gravitational
field variations used in resource surveying). Real-world: understanding
"gravity fields" as referenced in popular science distinctly from
"gravity force." Expert: the direct mathematical parallel to the electric
field (force per unit charge), previewing a recurring field-concept
pattern across forces.

## Cross-Subject Connections

KG `cross_links` empty. A genuine connection exists to the electric field
concept within physics itself (structurally identical field-per-unit-quantity
pattern) — not a cross-SUBJECT connection, so honestly recorded as "weak
but real" at the cross-subject level specifically.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
teaching-sequence/assessment components by reference. Not restated:
Concept Identity, Concrete Anchor, Conceptual Development Sequence, Worked
Examples, Adaptive Flags, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No genuine cross-SUBJECT connection found; the strongest connection is
intra-physics (electric field), honestly recorded rather than stretched
into a fabricated cross-subject link.

## Version History

- 2026-07-22 (physics EB Wave 7): initial authoring.
