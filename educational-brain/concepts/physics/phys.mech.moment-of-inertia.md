# Moment of Inertia — `phys.mech.moment-of-inertia`

## Identity

- **Concept ID**: `phys.mech.moment-of-inertia` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 9.
- **Prerequisites**: `phys.mech.torque`, `phys.mech.center-of-mass` —
  moment of inertia is the rotational analog of mass, built directly on
  the already-secure torque relationship and the center-of-mass
  reference point axis calculations depend on.
- **Unlocks** (from KG): `phys.mech.rotational-dynamics` — a genuine hub
  concept.
- **Difficulty**: advanced · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 6

## Learning Objective

The learner can: (1) correctly state that moment of inertia depends on
BOTH total mass AND how that mass is DISTRIBUTED relative to the axis
(I = Σmr²) — two objects with the same mass can have very different
moments of inertia depending on whether mass is concentrated near or far
from the axis; (2) correctly apply the parallel axis theorem
(I = I_cm + Md²) when the rotation axis is NOT through the center of
mass — moment of inertia is NOT a single fixed property of an object, it
depends on the specific axis chosen, and using the center-of-mass
formula for an off-center pivot without adding Md² gives a systematically
wrong (too small) result.

## Core Understanding

Moment of inertia, I = Σmr² (sum over all mass elements, each weighted by
the SQUARE of its distance from the rotation axis), depends on BOTH the
total mass AND how that mass is distributed relative to the axis — NOT
on mass alone. Two objects with identical total mass can have very
different I values: a solid disk and a hoop of the same mass and radius
have different I (the hoop, with all its mass at the maximum radius, has
larger I than the disk, whose mass is distributed closer to the center)
— the r² weighting means mass far from the axis contributes
disproportionately more than mass near the axis. A second, equally
important subtlety: moment of inertia is NOT a single fixed property
inherent to an object — it depends on the SPECIFIC axis of rotation
chosen. The same rigid body (e.g. a rod) has a smaller I when rotated
about its CENTER (I_cm) than when rotated about one END (a larger,
off-center axis) — the parallel axis theorem, I = I_cm + Md² (d = distance
from the center-of-mass axis to the new, parallel axis), quantifies
exactly how much larger I becomes for an off-center pivot. Using the
center-of-mass formula (like I_cm = (1/12)ML² for a rod) for a
DIFFERENT, off-center pivot WITHOUT adding the Md² correction term
systematically underestimates the true moment of inertia about that
pivot.

## Mental Models

**Beginner**: "Moment of inertia depends only on total mass — a heavier
object always has larger I regardless of shape; a rod's moment of
inertia is a single fixed number, ¹⁄₁₂ML², no matter where it's pivoted."
Upgrade trigger: comparing I for a solid disk vs. a hoop of identical
mass and radius (finding genuinely different I values) directly
confronts the mass-only assumption; computing I for a rod pivoted at one
end (using the parallel axis theorem, finding a LARGER value than
I_cm=(1/12)ML²) directly confronts the axis-independence assumption.

**Intermediate**: "I = Σmr² depends on mass distribution relative to the
axis, not mass alone; I changes with axis choice via I = I_cm + Md²
for a parallel, off-center axis." This model correctly captures both
core results, but sometimes still applies the memorized I_cm formula
directly to an off-center pivot without remembering to add the Md²
correction.

**Advanced**: "Before computing I for any rotation problem, explicitly
identify BOTH the mass distribution AND the specific axis location —
never assume a memorized I formula applies without checking whether the
axis matches the one that formula was derived for."

**Expert**: the parallel axis theorem's derivation directly from the
definition I=Σmr², decomposing each mass element's distance into a
center-of-mass-relative component plus the axis offset — a natural
mathematical consolidation, not required for mastery.

## Why Students Fail

The dominant failure is treating moment of inertia as depending only on
total mass, ignoring how that mass is distributed relative to the axis;
a second, distinct failure is applying a memorized center-of-mass moment
of inertia formula to an off-center pivot without adding the parallel
axis theorem's Md² correction term.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.moment-of-inertia.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-I-IS-MASS**: believing moment of inertia depends only on total
  mass — two objects with the same mass have the same I. **Birth type**:
  overgeneralization (Type 1) — linear mechanics' mass (a single,
  distribution-independent scalar) is incorrectly extended to
  rotational inertia, which genuinely depends on the r²-weighted mass
  DISTRIBUTION, not just the total. Probe: "A solid disk and a hoop have
  the same total mass and the same radius. Do they have the same moment
  of inertia about their central axis?"
- **MC-I-INDEPENDENT-OF-AXIS**: believing moment of inertia is a fixed
  property of the object, unaffected by axis choice — using the I_cm
  formula for an off-center axis without adding Md². **Birth type**:
  overgeneralization (Type 1) — mass (a genuinely axis-independent
  property) is incorrectly assumed to imply I (which is explicitly
  axis-dependent) is also fixed, without registering the parallel axis
  theorem's correction requirement. Probe: "A uniform rod has moment of
  inertia I_cm=(1/12)ML² about its center. Is its moment of inertia the
  same, more, or less when pivoted about one end instead?"

## Analogies

**Best**: a figure skater pulling their arms in during a spin — the SAME
total mass (their body) has a DIFFERENT moment of inertia depending on
how that mass is distributed (arms out = larger I, arms in = smaller I)
— directly targets MC-I-IS-MASS by giving a familiar, visually dynamic
demonstration of distribution-dependence with fixed total mass.

**Anti-analogy**: do NOT say "the rod's moment of inertia is ¹⁄₁₂ML²" as
an unqualified, complete statement — omitting "about its center" directly
invites MC-I-INDEPENDENT-OF-AXIS by implying this is the rod's only or
universal I value.

## Demonstrations

Physical/conceptual: compute I for a solid disk (I=½MR²) versus a hoop
(I=MR²) of identical mass and radius, showing the hoop's I is twice the
disk's — directly targets MC-I-IS-MASS. Worked-example: compute a rod's
I about its center (I_cm=(1/12)ML²) and about one end (using the
parallel axis theorem, I=(1/12)ML²+M(L/2)²=(1/3)ML²), showing the
off-center value is significantly larger — directly targets
MC-I-INDEPENDENT-OF-AXIS.

## Discovery Questions

Discovery-style: "does a rod pivoted at its very END rotate more easily
(smaller I) or less easily (larger I) than the same rod pivoted at its
CENTER?" — learner computes both via the parallel axis theorem, directly
confronting MC-I-INDEPENDENT-OF-AXIS.

## Teaching Sequence

Blueprint's assessment component cited by reference. MC-I-IS-MASS is
addressed first (establishing I's dependence on mass DISTRIBUTION, not
just total mass), before MC-I-INDEPENDENT-OF-AXIS, since correctly
grasping that distribution matters at a fixed axis is the prerequisite
for then correctly reasoning about how CHANGING the axis itself changes
I via the parallel axis theorem.

## Tutor Actions

WORKED-EXAMPLE (I compared for disk vs. hoop of identical mass; parallel
axis theorem applied to a rod pivoted at center vs. end); DEMONSTRATION
(figure skater arms-in/arms-out I comparison).

## Voice Teaching Notes

Listen for I compared using mass alone (ignoring distribution), or a
memorized I_cm formula applied to an off-center pivot without correction
— the two direct misconception tells. Load-bearing sentence: "moment of
inertia cares about WHERE the mass is, not just how much — and it changes
depending on which axis you actually spin around." Channel-reality
caveats owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner claiming equal I for a disk and hoop of the same mass signals
MC-I-IS-MASS (MISCONCEIVING, full repair via the disk/hoop computation).
A learner applying I_cm directly to an off-center pivot without the Md²
correction signals MC-I-INDEPENDENT-OF-AXIS (full repair via the
parallel-axis-theorem worked example). Mastery trigger: correctly
computing I accounting for mass distribution, AND correctly applying the
parallel axis theorem for an off-center pivot. Blueprint's assessment
component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the total mass for a second — is the mass in
this object concentrated near the axis, or spread out far from it?"
(isolating the distribution factor before computing I). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (mass-distribution dependence; axis-dependence via parallel axis
theorem) bound to procedure (I=Σmr² and I=I_cm+Md² calculation).
Interleave with `phys.mech.torque`, `phys.mech.center-of-mass`, and,
once authored, `phys.mech.rotational-dynamics` (the direct KG unlock).

## Transfer Connections

Near: any rotational-dynamics problem requiring I for a specific shape
and axis. Far: mechanical engineering (flywheel design deliberately
maximizing I for energy storage) and figure skating/diving biomechanics
(athletes actively manipulating their own I via limb position). Real-world:
understanding why a long wrench (larger I about the grip point) resists
sudden rotation more than a short one. Expert: the parallel axis
theorem's derivation from the definition I=Σmr².

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified;
honest "weak but real" assessment.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
assessment component by reference. Not restated: Concept Identity &
Metadata, Concept Explanation Multi-Tier, Worked Examples, Lesson
Composition Grammar, Retrieval Spacing Schedule, Prerequisite & Unlock
Map, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No cross-subject connection found beyond physics itself.

## Version History

- 2026-07-23 (physics EB Wave 9): initial authoring.
