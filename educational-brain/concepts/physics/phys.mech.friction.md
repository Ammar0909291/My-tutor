# Friction Forces — `phys.mech.friction`

## Identity

- **Concept ID**: `phys.mech.friction` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 7.
- **Prerequisites**: `phys.mech.free-body-diagram` — the load-bearing part
  is treating friction as one more force to draw and sum in an already-
  secure free-body-diagram/Newton's-second-law framework, not a new
  solution method.
- **Unlocks** (from KG): `phys.mech.inclined-plane` (the standard
  application requiring friction combined with a tilted normal force).
- **Difficulty**: developing · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 4

## Learning Objective

The learner can: (1) correctly compute maximum static friction (f_s ≤ μ_s N)
and kinetic friction (f_k = μ_k N) and correctly explain why static
friction is a range (up to a maximum), not a fixed value, while kinetic
friction is (approximately) fixed once sliding begins; (2) correctly
identify that friction depends on the NORMAL force, not weight directly,
correctly distinguishing the two on an incline or under an additional
applied force; (3) correctly explain why μ_s > μ_k physically (why more
force is needed to start sliding than to keep something sliding).

## Core Understanding

Friction is an electromagnetic-in-origin contact force resisting relative
sliding (or the tendency toward it) between two surfaces, proportional to
the normal force pressing them together — NOT to weight, which only
equals the normal force in the simple case of a horizontal surface with no
other vertical forces. Static friction is a variable, self-adjusting force
up to a maximum (f_s ≤ μ_s N) — it supplies exactly whatever force is
needed to prevent sliding, up to that ceiling; kinetic friction, once
sliding starts, is (approximately) constant at f_k = μ_k N, with μ_k
slightly less than μ_s because surfaces briefly "settle into" microscopic
interlocking contact points while static, which sliding continuously
disrupts.

## Mental Models

**Beginner**: "Friction equals μ times the weight." Upgrade trigger: an
incline or an added vertical push/pull where weight ≠ normal force
directly confronts this.

**Intermediate**: "Friction = μN, with static friction variable up to a
maximum and kinetic friction fixed once sliding." Shelf-life warning:
without explicitly contrasting static-as-range vs. kinetic-as-fixed, this
model still misapplies static friction as if always at its maximum.

**Advanced**: "Static friction is whatever value (up to μ_s N) makes net
force zero for a non-sliding object — solve force balance first, THEN
check the result doesn't exceed the maximum, never assume it equals the
maximum by default."

**Expert**: friction's μ_s > μ_k asymmetry and its microscopic origin
(real contact area at asperities, adhesion) — not required for mastery.

## Why Students Fail

Weight-substitution: computing normal force is skipped and weight is used
directly as "N," which only coincidentally works on a flat surface with no
other vertical forces.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.friction.md`, Misconception
Engine) documents two; reused by reference with birth-type added.

- **MC-FRICTION-USES-WEIGHT**: friction computed as μ×weight rather than
  μ×normal force. **Birth type**: overgeneralization (Type 1) — correct on
  flat, no-extra-force problems, silently wrong once an incline or applied
  force changes N away from weight. Probe: "A box on a flat floor has an
  additional force pushing DOWN on it at an angle. Does friction depend on
  the box's weight alone, or something else?"
- **MC-STATIC-ALWAYS-MAX**: assuming static friction always equals μ_s N,
  rather than being a range up to that value. **Birth type**:
  overgeneralization (Type 1) — practiced almost exclusively at the
  verge-of-slipping boundary case. Probe: "A box sits still on a rough
  floor with no horizontal push at all. Is static friction acting on it,
  and if so, how much?" (correct: zero — nothing to resist).

## Analogies

**Best**: a self-adjusting bungee holding a box in place — it stretches
(supplies force) only as much as needed to prevent motion, up to a snap
point (μ_s N), never providing more than required. Targets
MC-STATIC-ALWAYS-MAX. **Breaking point**: real bungees have elastic
memory/hysteresis friction doesn't.

**Anti-analogy**: do NOT say "friction = μ × weight" as a shorthand even
when demonstrating a flat-floor case — reinforces MC-FRICTION-USES-WEIGHT.

## Demonstrations

Push a block with increasing force on a rough surface, showing it doesn't
move until a threshold, then slides with a lower apparent resistance
(μ_s > μ_k, directly observable via a spring scale reading a dip at the
moment of slipping). Repeat on an incline to show N ≠ weight.

## Discovery Questions

Direct instruction for the μN relationship itself (empirical constant);
discovery-style elicitation for "does friction depend on weight or normal
force" via the incline/push demonstrations above, letting the learner
notice N, not weight, tracks the friction reading.

## Teaching Sequence

Blueprint's Teaching Action Sequence cited by reference. MC-FRICTION-USES-WEIGHT
repaired first via the incline demo (weight ≠ N made concrete) before
introducing μ_s vs. μ_k; MC-STATIC-ALWAYS-MAX repaired using the
no-applied-force case (zero friction) as the sharpest counterexample.

## Tutor Actions

WORKED-EXAMPLE (incline problems computing N first, then friction);
DEMONSTRATION (push-until-slip); ERROR-ANALYSIS (a solution using weight
directly on an incline).

## Voice Teaching Notes

Listen for "times the weight" spoken automatically when describing
friction — the MC-FRICTION-USES-WEIGHT tell. Load-bearing sentence:
"friction depends on the normal force — which equals weight only when
nothing else is going on vertically." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

Fast "times the weight" on an incline problem signals
MC-FRICTION-USES-WEIGHT (MISCONCEIVING, full repair). Mastery trigger:
correct N-then-friction sequencing on an incline AND correctly stating
zero friction acts when no force tends to cause sliding. Blueprint's
Mastery Probe Set cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget friction for a second — what's the normal
force here, right now?" (isolating N before reintroducing μN). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Procedure (N-then-friction) bound to a concept (static-as-range vs.
kinetic-as-fixed). Interleave with `phys.mech.free-body-diagram` and,
once authored, `phys.mech.inclined-plane`.

## Transfer Connections

Near: any incline/pulley problem with friction. Far: vehicle tire design
(static friction limits during acceleration/braking) and lubrication
engineering (reducing μ_k). Real-world: why it's easier to keep a heavy
box sliding than to start it moving. Expert: μ_s > μ_k's microscopic
(asperity/adhesion) origin.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified
beyond intra-physics — honest "weak but real" assessment.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine, Teaching
Action Sequence, Mastery Probe Set, by reference. Not restated: Concept
Identity, Worked Examples, Session Architecture, Adaptive Flags,
Validation Checklist components.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No cross-subject connection found beyond physics itself; consistent with
empty `cross_links`.

## Version History

- 2026-07-22 (physics EB Wave 7): initial authoring.
