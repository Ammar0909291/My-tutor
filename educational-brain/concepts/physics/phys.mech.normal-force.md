# Normal Force and Constraint Forces — `phys.mech.normal-force`

## Identity

- **Concept ID**: `phys.mech.normal-force` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 7.
- **Prerequisites**: `phys.mech.free-body-diagram` — normal force is one
  more force added to the already-secure free-body/F=ma framework.
- **Unlocks** (from KG): `phys.mech.inclined-plane` (the standard
  application where normal force ≠ weight).
- **Difficulty**: developing · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 3

## Learning Objective

The learner can: (1) correctly compute the normal force as WHATEVER value
makes net perpendicular force zero (for a non-accelerating-perpendicular-
to-surface object), not a fixed fraction of weight; (2) correctly identify
that normal force equals weight ONLY on a flat surface with no other
vertical forces, correctly computing it differently on an incline (N =
mg cos θ) or under an additional applied force; (3) correctly explain that
the normal force is a genuinely separate force from gravity's Third-Law
reaction pair partner (which acts on Earth, not on the surface).

## Core Understanding

The normal force is the contact force a surface exerts perpendicular to
itself, arising from the surface's electromagnetic resistance to
compression — it is not a fixed, predetermined value but rather whatever
magnitude is needed to prevent the object from accelerating into the
surface (a constraint force). On a flat, horizontal surface with no other
vertical forces, this happens to equal the object's weight — but tilt the
surface (an incline: N = mg cos θ, less than weight) or add another
vertical force (someone pushing down, or an accelerating elevator), and N
changes correspondingly to whatever value re-establishes zero net
perpendicular acceleration. The normal force is NOT gravity's Newton's-
Third-Law reaction pair partner — gravity's reaction pair is the object
pulling Earth upward; the normal force is a separate, distinct
electromagnetic contact force whose own Third-Law partner is the object
pushing down on the surface.

## Mental Models

**Beginner**: "Normal force always equals weight." Upgrade trigger: an
incline directly contradicts this (N = mg cos θ < mg).

**Intermediate**: "Normal force equals weight only when nothing else
affects the perpendicular direction; otherwise solve for whatever value
zeroes perpendicular acceleration." Shelf-life warning: without explicit
Third-Law-pairing correction, this model still misidentifies which force
pairs with which.

**Advanced**: "Normal force is a constraint force determined entirely by
requiring zero net perpendicular acceleration — write the perpendicular
F=ma equation and solve for N as the unknown, every single time, rather
than assuming a value."

**Expert**: normal force as a manifestation of the Pauli exclusion
principle and electromagnetic repulsion at the atomic level preventing
matter interpenetration — not required for mastery.

## Why Students Fail

The dominant failure is the flat-surface default: "N = weight" is
correct often enough (any horizontal-surface, no-extra-force problem)
that it becomes a reflex applied even on inclines or under added forces.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.normal-force.md`,
Misconception Register) documents two; reused by reference with
birth-type added.

- **MC-NORMAL-EQUALS-WEIGHT**: normal force assumed always equal to
  weight. **Birth type**: overgeneralization (Type 1) — true on flat,
  no-extra-force surfaces, which dominate early practice. Probe: "A box
  sits on a ramp tilted 30° from horizontal. Is the normal force on it
  equal to its full weight, or something else?"
- **MC-NORMAL-IS-REACTION**: belief the normal force is gravity's
  Newton's-Third-Law reaction pair. **Birth type**: overgeneralization
  (Type 1) — both forces happen to be equal and opposite in the simple
  flat-surface equilibrium case, inviting a spurious pairing. Probe: "What
  is the Newton's-Third-Law reaction force to gravity pulling a box down?
  Is it the normal force from the table?" (correct: no — it's the box
  pulling Earth upward; the normal force pairs with the box pushing down
  on the table).

## Analogies

**Best**: a mattress compressing exactly as much as needed to support
whoever lies on it — softer mattresses compress more, but the supporting
force (analogous to N) always exactly balances what's needed, never a
fixed predetermined amount. Targets MC-NORMAL-EQUALS-WEIGHT by framing N
as responsive, not fixed.

**Anti-analogy**: do NOT say "the normal force is gravity bouncing back"
— directly installs MC-NORMAL-IS-REACTION by suggesting a direct
force-reflection relationship between the two.

## Demonstrations

Physical: a bathroom scale on an incline (or tilted board) shows a reading
less than the person's actual weight — directly, numerically targets
MC-NORMAL-EQUALS-WEIGHT. Force-pair diagram exercise: explicitly draw
gravity's reaction pair (object pulling Earth) separately from the
normal-force reaction pair (object pushing surface) — targets
MC-NORMAL-IS-REACTION.

## Discovery Questions

Discovery-style: "does a scale read your full weight if you tilt the
platform?" — learner predicts, then the tilted-scale demonstration
resolves it, directly confronting the flat-surface default.

## Teaching Sequence

Blueprint's Session Architecture cited by reference.
MC-NORMAL-EQUALS-WEIGHT repaired first via the tilted-scale demonstration,
before introducing Third-Law pairing (MC-NORMAL-IS-REACTION), since the
pairing confusion depends on already trusting N as a constraint-solved
value, not a fixed one.

## Tutor Actions

DEMONSTRATION (tilted scale); WORKED-EXAMPLE (incline N = mg cos θ
derivation); CONCEPT-MAP (explicitly diagramming both Third-Law pairs
separately — gravity's and the normal force's).

## Voice Teaching Notes

Listen for "normal force is just weight" stated for an incline or
extra-force scenario — the direct tell. Load-bearing sentence: "normal
force is whatever value makes the perpendicular direction balance — solve
for it, don't assume it." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Fast "equal to weight" for an incline scenario signals
MC-NORMAL-EQUALS-WEIGHT (MISCONCEIVING, full repair). Mastery trigger:
correct N computation on an incline AND correct identification of both
Third-Law force pairs separately. Blueprint's Mastery Probe Set cited for
the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget weight for a second — what forces are acting
perpendicular to this surface, right now?" (isolating the perpendicular
balance before computing N). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (N as constraint-solved, not fixed) bound to procedure (incline N
calculation). Interleave with `phys.mech.free-body-diagram` and, once
authored, `phys.mech.inclined-plane` and `phys.mech.friction` (since
friction depends directly on N).

## Transfer Connections

Near: any incline or multi-force vertical-balance problem. Far: structural
engineering (foundation/load-bearing calculations use the same
constraint-force reasoning). Real-world: why a bathroom scale reads
differently in an accelerating elevator. Expert: normal force's quantum-
mechanical (Pauli exclusion) microscopic origin.

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
