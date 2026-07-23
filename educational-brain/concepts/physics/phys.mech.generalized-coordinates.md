# Generalized Coordinates and Configuration Space — `phys.mech.generalized-coordinates`

## Identity

- **Concept ID**: `phys.mech.generalized-coordinates` (canonical physics
  KG)
- **Curriculum location**: physics / mechanics — dependency level 10.
- **Prerequisites**: `phys.mech.conservative-forces`,
  `phys.mech.kinematics-2d` — generalized coordinates extend the
  already-secure Cartesian-coordinate kinematic description to a more
  flexible, constraint-aware framework, motivated by conservative
  forces' energy-based (rather than vector-force-based) formulation.
- **Unlocks** (from KG): `phys.mech.euler-lagrange-equation` — a genuine
  hub concept, entry into Lagrangian mechanics.
- **Difficulty**: expert · **Bloom**: understand · **Mastery threshold**: 0.85
  · **Est. hours**: 6

## Learning Objective

The learner can: (1) correctly explain that generalized coordinates need
NOT be Cartesian (x,y,z) positions — an angle θ, an arc length, or any
other parameter that uniquely specifies a system's configuration is a
perfectly valid coordinate, chosen for CONVENIENCE relative to the
system's actual constraints, not forced into a fixed dimensional/unit
mold; (2) correctly explain that a physical CONSTRAINT reduces the
number of degrees of freedom (independent coordinates needed to specify
configuration) — a constraint is a geometric/kinematic restriction on
possible motion, genuinely DIFFERENT from a constraint FORCE (like
tension or normal force, which enforces that restriction) — conflating
the two leads to overcounting the system's true degrees of freedom.

## Core Understanding

Generalized coordinates are ANY set of parameters that uniquely specify a
mechanical system's configuration — they need NOT be Cartesian (x,y,z)
positions at all; an angle θ (for a pendulum), an arc length s (for a
bead on a wire), or any other convenient parameter is EQUALLY VALID as a
coordinate, chosen specifically because it matches the system's actual
geometry and constraints more naturally than forcing a Cartesian
description — the requirement that "coordinates must be in meters" or
must literally be x,y,z positions is a genuine misunderstanding of what
a coordinate IS: any parameter that, together with its rate of change,
fully specifies the system's state. A second, equally fundamental point
concerns constraints specifically: a physical CONSTRAINT (a geometric or
kinematic restriction on possible motion — e.g. "this bead must stay on
this wire," or "this pendulum bob stays at a fixed distance from its
pivot") genuinely REDUCES the number of DEGREES OF FREEDOM (independent
coordinates actually needed) — a free particle in 3D space has 3 degrees
of freedom, but a particle constrained to a wire has only 1 (its position
along the wire), since the constraint has eliminated 2 independent
directions of possible motion. This constraint (a kinematic/geometric
restriction) must be carefully distinguished from a CONSTRAINT FORCE
(like the wire's normal force, or a pendulum string's tension) — the
constraint itself is a restriction on POSSIBLE MOTIONS (reducing degrees
of freedom), while the constraint force is the physical force that
ENFORCES that restriction; conflating the two (e.g. assuming the
particle "can still move in 3D" because the constraint force doesn't
eliminate all forces in all directions) misses that the constraint
itself has already reduced the true number of independent coordinates
needed to describe the system.

## Mental Models

**Beginner**: "Coordinates must be x, y, z positions measured in meters;
a constraint force reduces the ways the system can move, but the
particle can still technically move in 3D." Upgrade trigger: describing
a pendulum's motion using θ alone (a single angle, not three Cartesian
coordinates) and recognizing this fully specifies the system directly
confronts the coordinates-must-be-Cartesian assumption; carefully
counting a wire-constrained particle's actual independent directions of
motion (finding only 1, not 3) directly confronts the constraint-
doesn't-reduce-freedom assumption.

**Intermediate**: "Any parameter (angle, arc length, etc.) that uniquely
specifies configuration is a valid generalized coordinate; a geometric
constraint genuinely reduces degrees of freedom, distinct from the
constraint FORCE that enforces it." This model correctly captures both
core distinctions, but sometimes still defaults to Cartesian coordinates
out of habit for systems where a natural alternative (like an angle)
would be far simpler.

**Advanced**: "Before setting up equations of motion, first identify the
system's actual degrees of freedom (accounting for all constraints), then
choose generalized coordinates that match those degrees of freedom
naturally — never force a Cartesian description onto a constrained
system."

**Expert**: the systematic method for counting degrees of freedom
(3N minus the number of independent constraint equations for N
particles) and the Euler-Lagrange formalism built directly on
generalized coordinates — a natural consolidation directly connecting to
the KG unlock `phys.mech.euler-lagrange-equation`, not required for
mastery.

## Why Students Fail

The dominant failure is insisting coordinates must be Cartesian
positions in meters, struggling to accept an angle or arc length as a
legitimate coordinate; a second, distinct failure is conflating a
constraint (a geometric restriction reducing degrees of freedom) with a
constraint force (the physical force enforcing that restriction),
leading to overcounting the system's true independent coordinates.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.generalized-coordinates.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-COORD-MUST-BE-CARTESIAN**: insisting coordinates must be x, y, z
  in meters, struggling with θ as a coordinate ("it's not a position").
  **Birth type**: overgeneralization (Type 1) — the Cartesian coordinate
  system, secure and sufficient for unconstrained motion, is incorrectly
  assumed to be the ONLY valid coordinate choice, rather than one
  particular (often inconvenient) option among many. Probe: "A pendulum
  swings on a fixed-length string. Could its angle θ alone serve as a
  valid coordinate to describe its motion, or must you use x and y
  positions?"
- **MC-CONSTRAINT-REDUCES-FREEDOM** (labeled in the Blueprint as "a
  constraint adds force; it doesn't remove degrees of freedom"):
  counting degrees of freedom as 3N regardless of constraints, or
  conflating constraint forces (normal, tension) with constraint
  equations. **Birth type**: language contamination (Type 3) — the word
  "constraint" evokes an added FORCE (tension, normal force) rather than
  a geometric RESTRICTION on possible configurations, obscuring that the
  restriction itself reduces the count of independent coordinates
  needed. Probe: "A bead is constrained to slide along a fixed wire.
  Does the wire's constraint force mean the bead can still move freely
  in 3D, or has its actual freedom of motion been reduced?"

## Analogies

**Best**: a train confined to a track — even though the track exerts a
real physical force (constraint force) keeping the train on it, the
train's actual POSITION is fully specified by a SINGLE number (distance
along the track), not three Cartesian coordinates — directly targets
both misconceptions by showing a natural, non-Cartesian coordinate (arc
length) emerging directly from a constraint that has genuinely reduced
the degrees of freedom to one.

**Anti-analogy**: do NOT say "constraints just add extra forces to your
equations" as a simplifying description — this directly installs
MC-CONSTRAINT-REDUCES-FREEDOM by obscuring the DOF-reducing role
constraints play, distinct from the forces that enforce them.

## Demonstrations

Conceptual: describe a pendulum's full motion using only the angle θ,
verifying no information is lost compared to a full (x,y) Cartesian
description — directly targets MC-COORD-MUST-BE-CARTESIAN. Conceptual:
count the actual independent directions of motion for a bead
constrained to a wire (finding exactly 1, not 3), contrasted with the
wire's constraint FORCE (which exists in a different direction) —
directly targets MC-CONSTRAINT-REDUCES-FREEDOM.

## Discovery Questions

Discovery-style: "does a bead sliding along a fixed wire actually have 3
independent directions it could move in, or has the wire's constraint
already reduced that number?" — learner counts the true degrees of
freedom directly, directly confronting
MC-CONSTRAINT-REDUCES-FREEDOM.

## Teaching Sequence

Blueprint's assessment component cited by reference.
MC-COORD-MUST-BE-CARTESIAN is addressed first (establishing that any
parameter uniquely specifying configuration is valid), before
MC-CONSTRAINT-REDUCES-FREEDOM, since accepting non-Cartesian coordinates
as legitimate is the prerequisite for then correctly counting how many
such coordinates a constrained system actually needs.

## Tutor Actions

WORKED-EXAMPLE (pendulum described fully via θ alone; degrees-of-freedom
count for a wire-constrained bead); ANALOGY (train-on-a-track
constraint-vs-constraint-force distinction).

## Voice Teaching Notes

Listen for insistence that coordinates must be x,y,z in meters, or
degrees of freedom counted without accounting for constraints — the two
direct misconception tells. Load-bearing sentence: "any parameter that
fully describes the configuration counts as a coordinate — and a real
constraint genuinely cuts down how many independent coordinates you
actually need." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner rejecting a non-Cartesian coordinate (like an angle) as
invalid signals MC-COORD-MUST-BE-CARTESIAN (MISCONCEIVING, full repair
via the pendulum-θ demonstration). A learner counting 3N degrees of
freedom without accounting for constraints signals
MC-CONSTRAINT-REDUCES-FREEDOM (full repair via the wire-bead
degrees-of-freedom count). Mastery trigger: correctly using a
non-Cartesian coordinate to fully describe a system, AND correctly
counting reduced degrees of freedom for a constrained system. Blueprint's
assessment component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget Cartesian coordinates for a second — does
knowing JUST the angle θ tell you everything about where this pendulum
bob is?" (isolating the sufficiency of a non-Cartesian coordinate before
discussing degrees of freedom generally). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (coordinate choice flexibility; constraint-reduces-DOF vs.
constraint-force distinction) bound to procedure (identifying a natural
generalized coordinate for a constrained system). Interleave with
`phys.mech.conservative-forces`, `phys.mech.kinematics-2d`, and, once
authored, `phys.mech.euler-lagrange-equation` (the direct KG unlock).

## Transfer Connections

Near: any constrained-system motion-description problem, including
pendulums and beads on wires. Far: robotics (joint-angle generalized
coordinates are the standard description for robotic arm configuration)
and molecular dynamics (internal/dihedral-angle coordinates describing
molecular conformations). Real-world: understanding why robotic arm
control systems describe configuration using joint angles, not Cartesian
end-effector coordinates directly. Expert: the systematic
degrees-of-freedom-counting method and the Euler-Lagrange formalism built
on generalized coordinates.

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

- 2026-07-23 (physics EB Wave 10): initial authoring.
