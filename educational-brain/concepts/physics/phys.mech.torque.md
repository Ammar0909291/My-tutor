# Torque — `phys.mech.torque`

## Identity

- **Concept ID**: `phys.mech.torque` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 8.
- **Prerequisites**: `phys.mech.angular-kinematics`, `phys.meas.vector-products`
  — torque, τ = r × F, is directly a cross-product application (already
  secure) producing the rotational-motion quantity that drives the
  angular-kinematics variables already learned.
- **Unlocks** (from KG): `phys.mech.equilibrium`, `phys.mech.moment-of-inertia`
  — a genuine hub concept.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 4

## Learning Objective

The learner can: (1) correctly state τ = rF sinθ and correctly explain that
torque depends on BOTH the force's magnitude AND the moment arm r
(distance from the pivot) — a larger force applied close to the pivot can
produce LESS torque than a smaller force applied far from the pivot;
(2) correctly explain that torque requires the sinθ factor for the angle
between the force and the lever arm, not just at "extreme" angles — a
force applied exactly ALONG the lever arm (θ=0°) produces ZERO torque
regardless of magnitude, a genuine, non-negligible case.

## Core Understanding

Torque, τ = rF sinθ, measures a force's rotational effectiveness about a
pivot point, and depends on THREE factors together: the force's
magnitude F, the moment arm r (distance from the pivot to where the
force is applied), and the angle θ between the force direction and the
lever arm. A common, serious error treats torque as simply proportional
to force alone, ignoring r — but a large force applied very close to a
hinge (small r) can produce LESS torque than a modest force applied at
the door's far edge (larger r), since torque scales with the PRODUCT rF,
not F alone. Equally serious: the sinθ factor is not a minor correction
only relevant at unusual angles — it is essential and can reduce torque
to EXACTLY ZERO when a force is applied directly along the lever arm
(θ=0°, sinθ=0), regardless of how large that force is (e.g. pushing or
pulling a door directly toward or away from its hinge produces no
rotation at all) — treating τ=rF (implicitly assuming θ=90° always) gives
systematically wrong answers whenever the force isn't applied
perpendicular to the lever arm.

## Mental Models

**Beginner**: "Torque is basically just force — a bigger force always
means more torque, regardless of where or how it's applied." Upgrade
trigger: comparing torque from a large force applied near the hinge vs. a
smaller force applied at the door's far edge (same door), finding the
FAR, smaller force can produce MORE torque, directly confronts the
force-only assumption.

**Intermediate**: "τ = rF sinθ: depends on force, moment arm, AND angle;
a force along the lever arm produces zero torque." This model correctly
captures all three factors, but sometimes still writes τ = rF, silently
assuming θ=90° without checking the actual force direction in a given
problem.

**Advanced**: "Before computing torque, explicitly identify the angle
between the applied force and the lever arm — never assume
perpendicular by default; a force applied directly along the lever arm
(pushing straight toward/away from the pivot) contributes nothing to
rotation, however large it is."

**Expert**: torque as the cross product r × F, with sinθ emerging
naturally from the cross product's definition rather than as a
memorized "correction factor" — a natural consolidation directly
connecting back to the already-secure vector-products prerequisite, not
required for mastery.

## Why Students Fail

The dominant failure is force-only reasoning, ignoring the moment arm r
entirely when comparing torques; a second, distinct failure is omitting
or misapplying the sinθ factor, treating perpendicular force application
as the only case that matters rather than the specific condition under
which τ = rF (without sinθ) actually holds.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.torque.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-TORQUE-IS-FORCE**: believing a bigger force always means more
  torque, ignoring the moment arm r. **Birth type**: overgeneralization
  (Type 1) — force is the more familiar, foundational quantity from
  linear mechanics, and its role is over-extended to torque without
  registering that ROTATIONAL effectiveness also depends on WHERE the
  force is applied. Probe: "You push very hard right next to a door's
  hinge, and someone else pushes gently at the door's far edge. Who
  produces more torque?"
- **MC-TORQUE-PERPENDICULAR-ONLY**: using τ = rF even when the force
  isn't perpendicular to the lever arm, treating sinθ as only relevant at
  "extreme" angles. **Birth type**: instruction-induced (Type 5) —
  introductory torque problems often default to perpendicular force
  application (θ=90°, sinθ=1) for simplicity, and students internalize
  τ=rF as the general formula rather than the special case it actually
  is. Probe: "You push a door directly TOWARD its hinge (along the
  door, not perpendicular to it) with a large force. How much torque does
  this produce?"

## Analogies

**Best**: a see-saw with a fulcrum — a small child sitting far from the
fulcrum can balance a large adult sitting close to it, since torque
depends on distance × weight, not weight alone — directly targets
MC-TORQUE-IS-FORCE by giving a familiar, embodied precedent for
moment-arm dependence.

**Anti-analogy**: do NOT say "just multiply force times distance" as a
bare shorthand for torque without specifying the ANGLE — this omission
directly invites MC-TORQUE-PERPENDICULAR-ONLY by implicitly assuming
perpendicular application always.

## Demonstrations

Physical/conceptual: compute torque for a large force at small r versus a
smaller force at large r on the same door, showing the far, smaller force
can win — directly targets MC-TORQUE-IS-FORCE. Conceptual: compute
τ = rF sinθ for a force applied directly along the lever arm (θ=0°),
showing τ=0 regardless of F's magnitude — directly targets
MC-TORQUE-PERPENDICULAR-ONLY with the zero-torque limiting case.

## Discovery Questions

Discovery-style: "if you push a door exactly toward its hinge (straight
along the door), no matter how hard, does the door rotate at all?" —
learner reasons through sinθ=0, directly confronting
MC-TORQUE-PERPENDICULAR-ONLY.

## Teaching Sequence

Blueprint's assessment component cited by reference. MC-TORQUE-IS-FORCE
is addressed first (establishing r's role alongside F), before
MC-TORQUE-PERPENDICULAR-ONLY, since correctly incorporating r into the
torque formula (moving from "just force" to "force times distance")
naturally sets up asking "but does the ANGLE between them matter too?" as
the next, immediate refinement.

## Tutor Actions

WORKED-EXAMPLE (torque compared for large-force-near-hinge vs.
small-force-far-edge; τ=rF sinθ computed at θ=0°, 45°, 90°);
THOUGHT-EXPERIMENT (pushing a door directly toward its hinge).

## Voice Teaching Notes

Listen for torque comparisons based on force alone, or τ=rF applied
without checking the angle — the two direct misconception tells.
Load-bearing sentence: "torque depends on how far from the pivot AND at
what angle the force is applied — not just how hard you push."
Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner comparing torques using force magnitude alone (ignoring r)
signals MC-TORQUE-IS-FORCE (MISCONCEIVING, full repair via the
see-saw-style comparison). A learner using τ=rF without checking the
angle signals MC-TORQUE-PERPENDICULAR-ONLY (full repair via the
zero-torque limiting case). Mastery trigger: correctly computing
τ = rF sinθ incorporating all three factors, AND correctly identifying
when a force produces zero torque. Blueprint's assessment component
cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the angle for a second — if you push twice
as far from the pivot with the SAME force, does the torque change?"
(isolating r's role before reintroducing the angle factor). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (moment-arm and angle dependence) bound to procedure (τ=rF sinθ
calculation). Interleave with `phys.mech.angular-kinematics` and
`phys.meas.vector-products` (the cross-product foundation), plus, once
authored, `phys.mech.equilibrium` and `phys.mech.moment-of-inertia` (the
direct KG unlocks).

## Transfer Connections

Near: any lever, wrench, or door-rotation problem. Far: mechanical
engineering (gear and lever design optimizing moment arms) and
biomechanics (joint torque analysis in human movement). Real-world:
understanding why a longer wrench handle makes loosening a tight bolt
easier (larger moment arm, same force, more torque). Expert: torque as
the cross product r × F, with sinθ emerging naturally from the
cross-product definition.

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

- 2026-07-23 (physics EB Wave 8): initial authoring.
