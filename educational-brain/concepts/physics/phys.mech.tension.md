# Tension in Strings and Ropes — `phys.mech.tension`

## Identity

- **Concept ID**: `phys.mech.tension` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 7.
- **Prerequisites**: `phys.mech.free-body-diagram` — tension is one more
  force added to an already-secure free-body/Newton's-second-law
  framework.
- **Unlocks** (from KG): none directly listed — a terminal but
  widely-reused force concept.
- **Difficulty**: developing · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 3

## Learning Objective

The learner can: (1) correctly compute tension in a string/rope system
using Newton's second law on each connected body separately, and correctly
explain that tension is NOT simply the weight of whatever is hanging
unless the system is in equilibrium (static or constant velocity);
(2) correctly state that an ideal string can only PULL (transmit tension),
never push; (3) correctly reason about tension in accelerating systems
(e.g., an elevator, a pulley with unequal masses), where tension differs
from the static-case weight value.

## Core Understanding

Tension is the pulling force transmitted through a string, rope, or cable,
arising from the material resisting stretching; an ideal (massless,
inextensible) string transmits the same tension throughout its length and
can only pull along its own direction, never push or transmit a
compressive force. Tension equals the weight of a hanging mass ONLY when
that mass is in equilibrium (at rest or constant velocity) — the moment
the system accelerates (an elevator speeding up, a mass on a pulley being
overtaken by a heavier partner), tension must be solved from F = ma on the
specific body, and will be greater than weight during upward acceleration,
less than weight during downward acceleration, and could differ
substantially in a connected multi-body pulley system.

## Mental Models

**Beginner**: "Tension equals the weight of whatever is hanging." Upgrade
trigger: an accelerating elevator or unequal-mass pulley system directly
contradicts this.

**Intermediate**: "Tension = weight only in equilibrium; otherwise solve
F = ma on the specific body." Shelf-life warning: without practicing
genuinely accelerating scenarios, this stays abstract and reverts to the
weight-shortcut under pressure.

**Advanced**: "In a connected system, write F = ma for EACH body
separately (sharing the same magnitude of acceleration and tension via the
string constraint), then solve the resulting system of equations —
tension is whatever value makes both equations simultaneously true."

**Expert**: tension as an internal constraint force enforcing a rigid
kinematic relationship (inextensibility) between connected bodies — not
required for mastery.

## Why Students Fail

The dominant failure is the equilibrium-default: "tension = weight" is
correct often enough (any static hanging-mass problem) that it becomes an
automatic reflex, applied even when the problem explicitly describes
acceleration.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.tension.md`, Misconception
Register) documents two; reused by reference with birth-type added.

- **MC-TENSION-EQUALS-WEIGHT**: tension assumed equal to the hanging
  mass's weight regardless of acceleration. **Birth type**:
  overgeneralization (Type 1) — true in the equilibrium case, which
  dominates early practice. Probe: "An elevator accelerates upward with a
  mass hanging from a rope inside it. Is the rope's tension equal to,
  greater than, or less than the mass's weight?"
- **MC-ROPE-PUSHES**: belief a rope/string can exert a pushing
  (compressive) force. **Birth type**: analogy overextension (Type 6) —
  overextending rigid-rod force transmission (which can push) to flexible
  ropes. Probe: "Can you push a box across the floor using only a rope
  tied to it, by pushing on the rope's other end?"

## Analogies

**Best**: a rope is like a chain of people holding hands, each pulling on
their neighbor — hands can only pull, never push, someone away. Targets
MC-ROPE-PUSHES directly.

**Anti-analogy**: do NOT describe a rope as "just like a rigid stick, but
flexible" — implies push capability, reinforcing MC-ROPE-PUSHES.

## Demonstrations

Physical: an object hanging from a spring scale (reading = weight, static)
then abruptly accelerated upward/downward (scale reading visibly changes)
— directly targets MC-TENSION-EQUALS-WEIGHT. Attempt to push a box with a
slack rope (fails/rope buckles) vs. pull (works) — targets MC-ROPE-PUSHES.

## Discovery Questions

Discovery-style: "does the tension reading change if I accelerate this
hanging mass?" — learner predicts, then the spring-scale demonstration
resolves it, directly confronting the equilibrium-default assumption.

## Teaching Sequence

Blueprint's Session Architecture cited by reference. MC-TENSION-EQUALS-WEIGHT
repaired first (using the accelerating spring-scale demo) before
multi-body pulley problems are attempted, since pulley problems require
already distrusting the weight-shortcut.

## Tutor Actions

DEMONSTRATION (spring scale under acceleration); WORKED-EXAMPLE (unequal-mass
pulley system solved via simultaneous F = ma equations); ERROR-ANALYSIS
(a solution using weight directly in an accelerating scenario).

## Voice Teaching Notes

Listen for "tension is just the weight" stated for a described-as-accelerating
system — the direct tell. Load-bearing sentence: "tension equals weight
only when nothing is accelerating — otherwise, solve F = ma." Channel-
reality caveats owned by `../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Fast "equal to weight" answer for an explicitly-accelerating scenario
signals MC-TENSION-EQUALS-WEIGHT (MISCONCEIWING, full repair). Mastery
trigger: correct tension computation for both an equilibrium and an
accelerating scenario, plus correctly denying that a rope can push.
Blueprint's Mastery Probe Set cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the rope for a second — is this object
speeding up, slowing down, or staying the same speed?" (isolating
acceleration before reintroducing tension). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (tension ≠ weight generally) bound to procedure (multi-body F = ma
system-solving). Interleave with `phys.mech.free-body-diagram` and
`phys.mech.newtons-second-law`.

## Transfer Connections

Near: pulley and elevator problems generally. Far: elevator cable and
crane cable engineering design (must handle worst-case accelerating
tension, not just static weight). Real-world: bungee jumping and
zip-lines, where dynamic tension far exceeds static weight at certain
points. Expert: tension as a constraint force in Lagrangian mechanics.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified;
honest "weak but real" assessment.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Register,
Session Architecture, Mastery Probe Set, by reference. Not restated:
Concept Identity, Concrete Anchor, Conceptual Development Sequence,
Worked Examples, Adaptive Flags, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No cross-subject connection found beyond physics itself.

## Version History

- 2026-07-22 (physics EB Wave 7): initial authoring.
