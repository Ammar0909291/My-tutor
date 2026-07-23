# Surface Tension and Capillarity — `phys.mech.surface-tension`

## Identity

- **Concept ID**: `phys.mech.surface-tension` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 7.
- **Prerequisites**: `phys.mech.pressure-fluids` — surface tension effects
  (like capillary rise) are analyzed via pressure-balance reasoning already
  secure from the prerequisite concept.
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: proficient · **Bloom**: understand · **Mastery
  threshold**: 0.75 · **Est. hours**: 4

## Learning Objective

The learner can: (1) correctly explain surface tension as arising from
unbalanced intermolecular attractive forces at a liquid's surface
(surface molecules are pulled inward and sideways by neighbors, but have no
neighbors pulling outward, creating a net inward "skin-like" tension);
(2) correctly explain that surface tension is a FORCE PER UNIT LENGTH
along a surface/boundary, not a pressure (force per unit area), and
correctly distinguish the two; (3) correctly explain capillary rise/fall as
arising from the balance between adhesive (liquid-to-tube) and cohesive
(liquid-to-liquid) forces, correctly predicting rise for wetting liquids
(like water in glass) and depression for non-wetting ones (like mercury in
glass).

## Core Understanding

Surface tension arises because molecules at a liquid's surface experience
an imbalance of intermolecular attractive forces — molecules in the bulk
liquid are pulled equally in all directions by neighbors, but surface
molecules have neighbors only below and to the sides, not above, producing
a net inward pull that makes the surface behave like a stretched, elastic
skin resisting deformation and minimizing surface area. Surface tension,
γ, is defined as force per unit LENGTH along the surface boundary (N/m),
fundamentally different in dimension from pressure (force per unit area,
N/m²) — this distinction matters because surface tension acts along edges/
boundaries (like the rim of a soap film), while pressure acts
perpendicular to and distributed across an area. Capillary rise/fall in a
narrow tube results from competition between adhesive forces (liquid
molecules attracted to the tube's walls) and cohesive forces (liquid
molecules attracted to each other): when adhesion dominates (a "wetting"
liquid like water in glass), the liquid climbs the tube walls, and surface
tension pulls the rest of the liquid column up with it; when cohesion
dominates (a "non-wetting" liquid like mercury in glass), the liquid is
depressed below the surrounding level instead.

## Mental Models

**Beginner**: "Surface tension is basically the same thing as pressure at
the liquid's surface." Upgrade trigger: asking about the UNITS of surface
tension (N/m) vs. pressure (N/m²) directly confronts the conflation.

**Intermediate**: "Surface tension is force per unit length along a
boundary, arising from unbalanced intermolecular forces at the surface;
distinct from pressure." This model correctly separates the two
quantities, but sometimes assumes surface tension always pulls a liquid
surface UPWARD/outward rather than correctly understanding it as an
inward/tangential contracting tension.

**Advanced**: "Capillary behavior (rise or fall) is predictable from the
relative strength of adhesive vs. cohesive forces for a specific
liquid-tube material pairing — wetting liquids rise, non-wetting liquids
are depressed, and the specific contact angle formed at the liquid-tube
interface quantifies this balance."

**Expert**: surface tension's role in minimizing surface area (a
variational/energy-minimization principle) explaining why bubbles are
spherical — not required for mastery.

## Why Students Fail

The dominant failure is surface-tension/pressure conflation, treating
both as "force related to the liquid's surface" without registering their
different dimensional structure (per-length vs. per-area) and different
physical roles (tangential contracting tension vs. perpendicular
distributed push).

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.surface-tension.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-SURFACE-TENSION-IS-PRESSURE**: surface tension conflated with
  pressure, ignoring the force-per-length vs. force-per-area distinction.
  **Birth type**: language contamination (Type 3) — both concepts involve
  "force at a liquid surface" in casual description, without the
  dimensional distinction being made explicit. Probe: "Surface tension is
  measured in newtons per METER. Pressure is measured in newtons per
  SQUARE meter. Are these the same kind of quantity?"
- **MC-SURFACE-TENSION-ACTS-OUTWARD**: belief surface tension pushes/pulls
  a liquid surface outward, rather than correctly understanding it as an
  inward, area-minimizing contracting tension. **Birth type**: analogy
  overextension (Type 6) — over-extending "tension" from contexts like a
  stretched balloon (which does push outward via internal pressure) to
  surface tension specifically, which behaves oppositely, contracting the
  surface inward like a drawn-tight membrane. Probe: "Does surface tension
  make a water droplet's surface want to expand outward, or contract and
  minimize its area?"

## Analogies

**Best**: a trampoline's stretched fabric — the fabric's own tension pulls
inward along its surface, resisting stretching and minimizing its area
when undisturbed, exactly as surface tension makes a liquid surface
"skin-like" and area-minimizing. Directly targets
MC-SURFACE-TENSION-ACTS-OUTWARD by anchoring "tension = inward, contracting"
in a familiar tactile image.

**Anti-analogy**: do NOT describe surface tension as "surface pressure" or
"a type of pressure at the surface" — directly installs
MC-SURFACE-TENSION-IS-PRESSURE by using the wrong dimensional vocabulary.

## Demonstrations

Physical: float a small metal paperclip or needle on water's surface
(surface tension supporting weight it otherwise couldn't) and observe a
water droplet's near-spherical shape — directly illustrates the inward,
area-minimizing tension (targets MC-SURFACE-TENSION-ACTS-OUTWARD). Dip a
thin glass tube into water (rise, wetting) and into mercury (depression,
non-wetting) side by side — directly illustrates capillary behavior from
adhesive/cohesive balance.

## Discovery Questions

Discovery-style: "why does a water droplet form a round ball shape rather
than spreading flat?" — learner reasons toward "the surface is trying to
minimize its area, like a stretched skin pulling inward," directly
confronting MC-SURFACE-TENSION-ACTS-OUTWARD through observation before the
formal definition.

## Teaching Sequence

Blueprint's teaching-sequence component cited by reference.
MC-SURFACE-TENSION-IS-PRESSURE repaired first (establishing the correct
force-per-length dimensional identity), before
MC-SURFACE-TENSION-ACTS-OUTWARD, since correctly understanding surface
tension as a distinct quantity from pressure makes its inward-contracting
directional behavior easier to accept as a genuinely different phenomenon
rather than "pressure that happens to point the wrong way."

## Tutor Actions

DEMONSTRATION (floating paperclip, droplet shape, capillary tube
comparison); ANALOGY (stretched trampoline fabric); WORKED-EXAMPLE
(capillary rise height calculation from surface tension and contact
angle).

## Voice Teaching Notes

Listen for "surface pressure" used as a synonym for surface tension — the
MC-SURFACE-TENSION-IS-PRESSURE tell. Load-bearing sentence: "surface
tension pulls INWARD along the surface, minimizing its area — like a
stretched skin, not like a pressurized push." Channel-reality caveats
owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner describing surface tension using pressure-like (per-area)
reasoning signals MC-SURFACE-TENSION-IS-PRESSURE (MISCONCEIVING, full
repair via unit-based reasoning). Mastery trigger: correctly explaining
surface tension's molecular origin and its force-per-length nature, AND
correctly predicting capillary rise vs. depression for wetting vs.
non-wetting liquids. Blueprint's assessment component cited for the full
item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget pressure for a second — why does this water
droplet round itself into a ball instead of spreading flat?" (isolating
the area-minimization intuition). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (force-per-length, inward-contracting) bound to procedure
(capillary rise/depression prediction). Interleave with
`phys.mech.pressure-fluids` and `phys.mech.buoyancy` (sibling fluid-mechanics
concepts at this same dependency level).

## Transfer Connections

Near: any liquid-surface-shape or capillary-action problem. Far: inkjet
printing and lab-on-a-chip microfluidics (both engineered around
controlled capillary/surface-tension effects) and plant biology (capillary
action drawing water up through narrow xylem vessels). Real-world:
understanding why water striders can walk on water, and why soap
(a surfactant) reduces surface tension to help water penetrate fabric
during washing. Expert: surface tension as a surface-energy
minimization principle explaining bubble/droplet sphericity.

## Cross-Subject Connections

KG `cross_links` empty. A genuine connection exists to biology (capillary
action in plant xylem transport) and chemistry (intermolecular forces,
surfactant chemistry) not currently captured as cross_links — recorded as
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

KG `cross_links` empty despite genuine connections to biology (capillary
xylem transport) and chemistry (intermolecular forces). Flagged for the
Curriculum Production Pipeline's backlog, not fixed here.

## Version History

- 2026-07-22 (physics EB Wave 7): initial authoring.
