# Buoyancy and Archimedes' Principle — `phys.mech.buoyancy`

## Identity

- **Concept ID**: `phys.mech.buoyancy` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 7.
- **Prerequisites**: `phys.mech.pressure-fluids` — buoyant force is a
  direct consequence of pressure increasing with depth, applied to the two
  opposite faces of a submerged object.
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: developing · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 3

## Learning Objective

The learner can: (1) state Archimedes' principle — buoyant force equals
the weight of fluid DISPLACED by the submerged (or partially submerged)
object — and correctly explain this follows directly from pressure
increasing with depth (greater pressure pushing up on the object's bottom
face than pushes down on its top face); (2) correctly explain that
buoyant force depends on the volume of fluid displaced and the fluid's
density, NOT on the submerged object's own weight or density directly;
(3) correctly explain that buoyant force does NOT increase indefinitely
with depth once an object is fully submerged — beyond full submersion,
displaced volume (and therefore buoyant force) stays constant regardless
of further depth.

## Core Understanding

Buoyant force arises because fluid pressure increases with depth
(established in the prerequisite concept): a submerged object's bottom
face, being deeper, experiences greater upward pressure than its top face
experiences downward pressure, and this pressure difference, summed over
the object's surface, produces a net upward force exactly equal to the
weight of the fluid volume the object displaces — Archimedes' principle,
F_buoyant = ρ_fluid × V_displaced × g. Critically, buoyant force depends on
the DISPLACED FLUID's weight, not on the submerged object's own weight or
density — a large, light object and a small, heavy object experience very
different buoyant forces determined entirely by how much fluid volume each
displaces. Once an object is FULLY submerged, further depth does not
increase the displaced volume (the object's total volume is already fully
displacing fluid), so buoyant force remains constant with additional
depth — only the surrounding fluid pressure (acting equally in all
directions on the object) continues to increase with depth, without
further increasing the NET buoyant force.

## Mental Models

**Beginner**: "Buoyant force depends on how heavy the object is." Upgrade
trigger: comparing two same-VOLUME objects of very different weight/density
(a solid steel block and a hollow plastic block of identical size) fully
submerged — identical buoyant force despite very different weights.

**Intermediate**: "Buoyant force equals the weight of displaced fluid,
F = ρ_fluid V_displaced g — depends on displaced volume and fluid density,
not the object's own weight." This model correctly identifies the
governing variables, but sometimes still expects buoyant force to keep
increasing as a fully-submerged object is pushed deeper.

**Advanced**: "Once fully submerged, an object's displaced volume is fixed
at its own total volume — additional depth increases the surrounding
pressure but does NOT increase the net buoyant force, since the pressure
difference between top and bottom faces (which is what determines the net
upward force) depends only on the object's own height, not its absolute
depth."

**Expert**: buoyancy as a special case of the general pressure-gradient
force in any fluid (including atmospheric buoyancy for lighter-than-air
gases) — not required for mastery.

## Why Students Fail

The dominant failure is weight/density substitution — assuming buoyant
force is primarily about the submerged object's own properties (its
weight or density) rather than about the displaced fluid's properties; a
second, distinct failure assumes buoyant force keeps growing with depth
even after full submersion.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.buoyancy.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-BUOYANCY-WEIGHT**: buoyant force assumed to depend primarily on the
  submerged object's own weight, rather than the displaced fluid's weight.
  **Birth type**: overgeneralization (Type 1) — everyday intuition about
  "heavy things sink, light things float" correctly captures the NET
  outcome (buoyancy vs. weight comparison) but incorrectly locates buoyant
  force's SOURCE in the object's own weight rather than the displaced
  fluid. Probe: "A solid steel block and a same-SIZE hollow plastic block
  are both fully submerged in water. Do they experience the same buoyant
  force, or different, given their very different weights?"
- **MC-BUOYANCY-PROPORTIONAL-TO-DEPTH**: belief buoyant force keeps
  increasing the deeper a fully-submerged object goes. **Birth type**:
  overgeneralization (Type 1) — correctly knowing pressure increases with
  depth (prerequisite concept) is incorrectly extended to "so buoyant force
  must too," without recognizing displaced volume (not raw pressure) is
  what determines NET buoyant force once fully submerged. Probe: "A fully
  submerged ball is pushed twice as deep underwater. Does the buoyant force
  on it increase, decrease, or stay the same?"

## Analogies

**Best**: two identical-size boxes, one packed with foam, one with lead
shot, both fully underwater — the water "pushes back" with identical force
on both (same displaced volume), even though one is far heavier overall.
Directly targets MC-BUOYANCY-WEIGHT by isolating displaced volume as the
shared, determining factor.

**Anti-analogy**: do NOT say "buoyancy depends on how heavy something is
relative to water" as the PRIMARY framing — this correctly predicts
floating/sinking outcomes but installs MC-BUOYANCY-WEIGHT regarding the
force's actual source (displaced fluid, not the object's own weight);
always lead with displaced volume/fluid weight as the buoyant force's
cause, with the object's own weight entering only in the separate
floating/sinking comparison.

## Demonstrations

Physical: fully submerge two identical-volume objects of very different
weight (a sealed empty container and a water-filled one of the same size)
using a spring scale to measure apparent weight loss (equal for both) —
directly targets MC-BUOYANCY-WEIGHT. Push a fully submerged object to
different depths while measuring buoyant force (via spring scale),
showing no further increase — directly targets
MC-BUOYANCY-PROPORTIONAL-TO-DEPTH.

## Discovery Questions

Discovery-style: "does a heavy fully-submerged object feel a bigger
buoyant push than a light one of the same size?" — learner predicts, then
the equal-volume-different-weight demonstration resolves it, directly
confronting MC-BUOYANCY-WEIGHT.

## Teaching Sequence

Blueprint's teaching-sequence component cited by reference.
MC-BUOYANCY-WEIGHT repaired first (establishing displaced volume as the
determining factor), before MC-BUOYANCY-PROPORTIONAL-TO-DEPTH, since
understanding buoyant force as governed by DISPLACED VOLUME (not raw
pressure) makes "no further increase once fully submerged, since displaced
volume is now fixed" a natural consequence.

## Tutor Actions

DEMONSTRATION (equal-volume different-weight submersion; depth-independence
test); WORKED-EXAMPLE (Archimedes' principle calculation); ERROR-ANALYSIS
(a solution assuming heavier objects feel more buoyant force).

## Voice Teaching Notes

Listen for "because it's heavier/lighter" given as the explanation for
buoyant force magnitude (rather than displaced volume) — the
MC-BUOYANCY-WEIGHT tell. Load-bearing sentence: "buoyant force equals the
weight of the fluid PUSHED ASIDE — not the object's own weight." Channel-
reality caveats owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner predicting different buoyant forces for two equal-volume,
different-weight fully-submerged objects signals MC-BUOYANCY-WEIGHT
(MISCONCEIVING, full repair via the equal-volume demonstration). Mastery
trigger: correctly computing buoyant force from displaced volume alone
(independent of the object's own weight), AND correctly denying further
increase with depth once fully submerged. Blueprint's assessment component
cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the object's weight for a second — how much
WATER did it push out of the way?" (isolating displaced volume). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (displaced-fluid-weight, not object-weight) bound to procedure
(Archimedes' principle calculation). Interleave with
`phys.mech.pressure-fluids` (the depth-dependent pressure origin) and,
once authored, `phys.mech.surface-tension` (sibling fluid-mechanics
concept at this same level).

## Transfer Connections

Near: any floating/sinking or submerged-object force problem. Far: ship
and submarine buoyancy engineering (ballast tanks deliberately adjust
displaced volume/weight balance) and hot-air balloon design (atmospheric
buoyancy, same principle with air as the fluid). Real-world: why a heavy
steel ship floats (its overall shape displaces enough water to equal its
weight) while a solid steel block of the same mass sinks. Expert: buoyancy
as a special case of the general fluid pressure-gradient force.

## Cross-Subject Connections

KG `cross_links` empty. A genuine connection exists to biology (fish
swim-bladder buoyancy control, using the identical displaced-volume
principle) not currently captured as a cross_link — recorded as
Curriculum Feedback.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
teaching-sequence/assessment components by reference. Not restated:
Concept Identity, Concrete Anchor, Conceptual Development Sequence, Worked
Examples, Adaptive Flags, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

KG `cross_links` empty despite a genuine connection to biology's
swim-bladder buoyancy content. Flagged for the Curriculum Production
Pipeline's backlog, not fixed here.

## Version History

- 2026-07-22 (physics EB Wave 7): initial authoring.
