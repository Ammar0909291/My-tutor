# Static Equilibrium — `phys.mech.equilibrium`

## Identity

- **Concept ID**: `phys.mech.equilibrium` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 9.
- **Prerequisites**: `phys.mech.torque`, `phys.mech.newtons-first-law` —
  static equilibrium combines the already-secure torque balance with the
  linear force-balance condition already established in Newton's first
  law, requiring BOTH simultaneously.
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 4

## Learning Objective

The learner can: (1) correctly state that static equilibrium requires
BOTH ΣF=0 (net force zero) AND Στ=0 (net torque zero) simultaneously —
force balance alone is NOT sufficient, and setting up only force
equations without a torque equation leaves the problem
under-determined, producing wrong support-force values;
(2) correctly explain that the pivot point for computing torques can be
chosen FREELY at ANY point (not necessarily a physical support/hinge) —
and strategically choosing the pivot at an UNKNOWN force's location
eliminates that unknown from the torque equation entirely, often
dramatically simplifying the algebra.

## Core Understanding

Static equilibrium requires TWO independent conditions to hold
simultaneously: ΣF=0 (the net force is zero, ensuring no linear
acceleration) AND Στ=0 (the net torque about any point is zero, ensuring
no angular acceleration) — force balance ALONE is not sufficient
evidence of equilibrium, since an object could have balanced forces yet
still experience a net torque causing it to rotate (e.g. two equal,
opposite forces applied at different points along an object, which
balance in force but produce a net torque). A specific and highly
useful, often underappreciated freedom: the pivot point used to compute
torques can be chosen at ANY point — not necessarily a physical hinge or
support — because if an object is truly in equilibrium (Στ=0 about one
point), it is automatically in torque equilibrium about EVERY point.
This freedom is strategically valuable: choosing the pivot exactly at
the location of an UNKNOWN force eliminates that force from the torque
equation entirely (since its moment arm about that pivot is zero),
often turning an otherwise complex simultaneous-equations problem into a
single, directly solvable equation.

## Mental Models

**Beginner**: "If the forces are balanced, the object must be in
equilibrium; the pivot for torque calculations must be at a physical
support point, like a hinge." Upgrade trigger: constructing a scenario
with balanced forces but unbalanced torque (two equal opposite forces at
different points) directly confronts the force-only assumption;
successfully solving a problem by choosing the pivot at an unknown
force's location (eliminating it) directly confronts the fixed-pivot
assumption.

**Intermediate**: "Equilibrium requires BOTH ΣF=0 AND Στ=0; the pivot can
be chosen anywhere, and choosing it at an unknown force's location
eliminates that unknown." This model correctly captures both core
results, but sometimes still defaults to placing the pivot at the
leftmost/most obvious support out of habit, missing the strategic
simplification.

**Advanced**: "Before setting up equilibrium equations, always write BOTH
the force equation AND at least one torque equation; when choosing the
pivot, actively look for an unknown force whose elimination would
simplify the resulting algebra."

**Expert**: the freedom to choose any pivot point as a specific
consequence of the mathematical structure of torque (Στ=0 about one
point implies Στ=0 about all points, for a system already in force
equilibrium) — a natural derivation-level consolidation, not required for
mastery.

## Why Students Fail

The dominant failure is setting up only force equations, assuming
balanced forces alone guarantee equilibrium, without checking torque
balance separately; a second, distinct failure is assuming the pivot
must be placed at a physical support, missing the strategic freedom to
place it anywhere — especially at an unknown force's location to
eliminate it.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.equilibrium.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-ONE-CONDITION**: believing equilibrium requires only ΣF=0, with
  torque balance being "automatic." **Birth type**: overgeneralization
  (Type 1) — Newton's first law's force-balance condition (already
  secure from linear mechanics) is incorrectly assumed sufficient on its
  own, without recognizing rotational equilibrium as a genuinely
  SEPARATE, additional condition. Probe: "Two equal and opposite forces
  are applied to a rod at different points along its length. Are the
  forces balanced? Is the rod necessarily in equilibrium?"
- **MC-PIVOT-FIXED**: believing the pivot for torque calculations must be
  at a physical support, and cannot be chosen freely. **Birth type**:
  instruction-induced (Type 5) — introductory problems often feature an
  obvious physical hinge, and students internalize this as the ONLY
  valid pivot choice, missing the general freedom (and its strategic
  value) established by the underlying mathematics. Probe: "In a static
  equilibrium problem with an unknown support force at one end, can you
  choose your torque pivot to be exactly AT that unknown force's
  location, even though it isn't a hinge?"

## Analogies

**Best**: a tightrope walker's balance pole — even with the walker's
total weight (force) perfectly centered, an unevenly distributed pole
(torque imbalance) would still cause rotation/falling — directly targets
MC-ONE-CONDITION by giving a concrete, embodied image of force-balance
without torque-balance.

**Anti-analogy**: do NOT say "just balance the torques around the
support" as a universal instruction — this implies the support is the
ONLY valid pivot choice, directly inviting MC-PIVOT-FIXED.

## Demonstrations

Conceptual: construct a specific scenario with two equal, opposite forces
applied at different points on a rigid rod, showing ΣF=0 but Στ≠0 (net
rotation results) — directly targets MC-ONE-CONDITION. Worked-example:
solve the SAME equilibrium problem twice, once with the pivot at a
physical hinge (requiring simultaneous equations) and once with the
pivot chosen at an unknown force's location (eliminating it, solving
directly) — directly targets MC-PIVOT-FIXED by demonstrating the
strategic payoff concretely.

## Discovery Questions

Discovery-style: "in a problem with two unknown support forces, could
you choose your torque pivot at one of those unknown forces' locations
to eliminate it from the equation?" — learner experiments with pivot
choice, directly confronting MC-PIVOT-FIXED.

## Teaching Sequence

Blueprint's assessment component cited by reference. MC-ONE-CONDITION is
addressed first (establishing both ΣF=0 AND Στ=0 as jointly necessary),
before MC-PIVOT-FIXED, since correctly committing to writing a torque
equation at all is the prerequisite for then exploring the strategic
freedom in WHERE to place that pivot.

## Tutor Actions

WORKED-EXAMPLE (force-balanced-but-torque-unbalanced counterexample;
same problem solved with two different pivot choices, showing the
elimination strategy); ERROR-ANALYSIS (a solution using only force
equations for an equilibrium problem).

## Voice Teaching Notes

Listen for equilibrium claimed based on force balance alone, or a fixed
assumption that the pivot must be a physical hinge — the two direct
misconception tells. Load-bearing sentence: "equilibrium needs BOTH
forces AND torques balanced — and you can put your torque pivot anywhere
you like, especially right on an unknown force to make it vanish."
Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner setting up only force equations for an equilibrium problem
signals MC-ONE-CONDITION (MISCONCEIVING, full repair via the
force-balanced-torque-unbalanced counterexample). A learner always
placing the pivot at a physical support, missing the elimination
strategy, signals MC-PIVOT-FIXED (full repair via the dual-pivot worked
example). Mastery trigger: correctly setting up both ΣF=0 and Στ=0
equations, AND strategically choosing a pivot to eliminate an unknown.
Blueprint's assessment component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the torque equation for a second — are the
FORCES on this object definitely balanced? Now, separately, could it
still be spinning?" (isolating the two-condition distinction before
diving into calculations). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (dual-condition equilibrium; free pivot choice) bound to
procedure (strategic pivot selection to eliminate unknowns). Interleave
with `phys.mech.torque` and `phys.mech.newtons-first-law`.

## Transfer Connections

Near: any static-equilibrium problem, including beams, ladders, and
seesaws. Far: structural/civil engineering (bridge and building support
force calculations rely directly on this dual-condition equilibrium
analysis) and biomechanics (analyzing forces/torques at joints during
static poses). Real-world: understanding how engineers calculate support
reactions for a loaded beam using strategically chosen pivot points.
Expert: the mathematical proof that Στ=0 about one point implies Στ=0
about all points for a force-balanced system.

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
