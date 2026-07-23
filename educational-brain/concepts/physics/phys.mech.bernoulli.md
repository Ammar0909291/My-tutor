# Bernoulli's Equation and Fluid Flow — `phys.mech.bernoulli`

## Identity

- **Concept ID**: `phys.mech.bernoulli` (canonical physics KG)
- **Curriculum location**: physics / mechanics — dependency level 9.
- **Prerequisites**: `phys.mech.pressure-fluids`,
  `phys.mech.conservation-of-energy` — Bernoulli's equation directly
  applies the already-secure mechanical energy conservation principle to
  a flowing fluid, with pressure playing the role of an energy-density
  term.
- **Unlocks** (from KG): `phys.mech.viscosity` — a genuine hub concept.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 5

## Learning Objective

The learner can: (1) correctly explain that "fast flow = low pressure"
is a CONSEQUENCE of energy conservation (P+½ρv²+ρgh=constant along a
streamline), NOT a mysterious suction rule — where flow speed increases,
pressure MUST decrease to keep the total constant, since the three terms
represent an energy-per-unit-volume budget; (2) correctly reject the
"equal transit time" explanation for aerofoil lift (the claim that air
over the top must travel faster to "meet" air from below at the trailing
edge simultaneously) as experimentally false — top-surface air actually
arrives FIRST, and lift instead arises from aerofoil shape/angle of
attack deflecting air downward (Newton's third law) combined with a
genuine speed/pressure difference Bernoulli's equation correctly relates.

## Core Understanding

Bernoulli's equation, P+½ρv²+ρgh=constant along a streamline, is an
ENERGY CONSERVATION statement, not a mysterious "suction" rule — each
term represents an energy density (P is flow/pressure work per unit
volume, ½ρv² is kinetic energy density, ρgh is gravitational PE density),
and their sum is conserved exactly like total mechanical energy for a
single particle. The famous "fast flow means low pressure" result is a
DIRECT CONSEQUENCE, not a cause: where flow speed v increases, the
kinetic-energy-density term ½ρv² increases, and since the total must stay
constant, pressure P must correspondingly DECREASE — high-speed air
doesn't actively "suck" anything, it simply has less pressure because
more of the fixed energy budget is invested in kinetic form. A
particularly persistent and specifically WRONG popular explanation for
aerofoil lift is the "equal transit time" theory — the claim that air
flowing over a curved wing's top surface must travel faster because it
has "farther to go" and needs to "meet" the air that went underneath at
the trailing edge simultaneously. This is experimentally FALSE: wind
tunnel visualization directly shows top-surface air arriving at the
trailing edge BEFORE the corresponding bottom-surface air — there is no
rendezvous requirement at all. The genuine explanation for lift combines
Newton's third law (the aerofoil's shape and angle of attack deflect
airflow downward, so the air pushes back up on the wing) with a real
speed difference between the surfaces (arising from aerofoil camber,
angle of attack, and circulation effects, beyond equal-transit-time
reasoning) — Bernoulli's equation correctly RELATES that genuine speed
difference to the resulting pressure difference and lift force, but does
not itself explain WHY the speed difference exists.

## Mental Models

**Beginner**: "Fast-moving air just naturally sucks nearby objects toward
it, as an unexplained fact; a wing generates lift because air over the
curved top has farther to travel and must speed up to arrive at the
trailing edge at the same time as air going underneath." Upgrade trigger:
deriving Bernoulli's equation from work-energy reasoning, seeing the
pressure-speed relationship emerge as a CONSEQUENCE rather than a given
fact, directly confronts the mysterious-suction framing; examining actual
wind-tunnel smoke visualization (showing top-surface air arrives FIRST,
not simultaneously) directly confronts the equal-transit-time
explanation.

**Intermediate**: "P+½ρv²+ρgh=constant is an energy-conservation
statement; fast flow means low pressure as a direct mathematical
consequence, not suction; equal transit time is experimentally false —
lift arises from aerofoil shape deflecting air downward plus a genuine
Bernoulli-related pressure difference." This model correctly captures
both core results, but sometimes still reaches for "suction" language
informally, even while accepting the underlying energy-conservation
mechanism.

**Advanced**: "Always trace lift or pressure-difference explanations back
to their actual causal mechanism (energy conservation for
Bernoulli's relationship; Newton's third law plus circulation for the
speed difference itself) — never accept 'fast flow sucks' or 'equal
transit time' as explanatory endpoints."

**Expert**: the full Kutta-Joukowski circulation theory explaining WHY
air moves faster over an aerofoil's top surface — the genuine mechanism
equal-transit-time incorrectly claims to explain — a natural extension,
explicitly noted as beyond typical curriculum scope, not required for
mastery.

## Why Students Fail

The dominant failure is accepting "fast flow, low pressure" as an
unexplained fact or mysterious suction effect, rather than deriving it
as a direct energy-conservation consequence; a second, distinct failure
is explaining aerofoil lift via the popular but experimentally false
equal-transit-time theory, rather than the genuine Newton's-third-law-
plus-circulation mechanism.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.mech.bernoulli.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-BERNOULLI-FAST-LOW-PRESSURE-MYSTERY**: accepting "fast flow = low
  pressure" as an unexplained fact, or claiming "Bernoulli's principle
  means fast air sucks things up." **Birth type**: language contamination
  (Type 3) — the everyday word "suction" is loosely applied to describe
  what is actually a pressure-difference-driven net force, obscuring the
  underlying energy-conservation mechanism. Probe: "Why does fast-moving
  air have lower pressure — is it because it 'sucks,' or is there a
  deeper energy-based reason?"
- **MC-BERNOULLI-LIFT-EQUAL-TRANSIT**: explaining aerofoil lift by
  claiming air over the top takes longer, so it must go faster to meet
  air from below at the trailing edge. **Birth type**: instruction-induced
  (Type 5) — this intuitive-sounding but experimentally false explanation
  has been widely taught informally, and its plausible surface logic
  (longer path, must go faster) makes it persistent despite direct
  wind-tunnel evidence against it. Probe: "Does air flowing over an
  aerofoil's curved top surface arrive at the trailing edge at the SAME
  time as air that flowed underneath, or does one arrive first?"

## Analogies

**Best**: a fixed total energy "budget" split between two accounts
(pressure and kinetic energy) — spending more on one account (speed)
necessarily leaves less for the other (pressure), with no mysterious
force involved, just bookkeeping — directly targets
MC-BERNOULLI-FAST-LOW-PRESSURE-MYSTERY by reframing the relationship as
budget conservation rather than causation.

**Anti-analogy**: do NOT say "air over the wing goes faster to catch up
with air below" as a simplifying explanation for lift — this directly
installs MC-BERNOULLI-LIFT-EQUAL-TRANSIT, a specifically debunked
explanation.

## Demonstrations

Conceptual: derive Bernoulli's equation from work-energy reasoning
applied to a fluid element, showing the pressure-speed relationship
emerges as a direct mathematical consequence — directly targets
MC-BERNOULLI-FAST-LOW-PRESSURE-MYSTERY. Data-based: examine actual
wind-tunnel smoke visualization data showing top-surface air arriving at
the trailing edge BEFORE bottom-surface air — directly targets
MC-BERNOULLI-LIFT-EQUAL-TRANSIT with direct experimental refutation.

## Discovery Questions

Discovery-style: "if the equal-transit-time theory were correct, air
flowing over an aerofoil's top and bottom should arrive at the trailing
edge simultaneously. Does real wind-tunnel data actually show this?" —
learner examines the evidence, directly confronting
MC-BERNOULLI-LIFT-EQUAL-TRANSIT.

## Teaching Sequence

Blueprint's discrimination-pairs component cited by reference.
MC-BERNOULLI-FAST-LOW-PRESSURE-MYSTERY is addressed first (establishing
Bernoulli's equation as a genuine energy-conservation derivation), before
MC-BERNOULLI-LIFT-EQUAL-TRANSIT, since correctly understanding Bernoulli
as relating (not causing) a speed difference to a pressure difference is
the prerequisite for then correctly separating "Bernoulli explains the
pressure-difference-to-lift connection" from "equal transit time
explains WHY the speed difference exists" (which it doesn't).

## Tutor Actions

WORKED-EXAMPLE (Bernoulli's equation derived from work-energy reasoning);
DEMONSTRATION (wind-tunnel smoke visualization data showing unequal
transit times); ERROR-ANALYSIS (a lift explanation relying on
equal-transit-time reasoning).

## Voice Teaching Notes

Listen for "fast air sucks" language or equal-transit-time lift
explanations — the two direct misconception tells. Load-bearing
sentence: "fast flow having low pressure isn't suction — it's energy
bookkeeping; and equal transit time is actually false, wind tunnels show
the top air arrives first." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner describing fast airflow as "sucking" without an energy-based
explanation signals MC-BERNOULLI-FAST-LOW-PRESSURE-MYSTERY
(MISCONCEIVING, full repair via the work-energy derivation). A learner
invoking equal transit time for lift signals
MC-BERNOULLI-LIFT-EQUAL-TRANSIT (full repair via the wind-tunnel
evidence). Mastery trigger: correctly deriving the pressure-speed
relationship from energy conservation, AND correctly rejecting
equal-transit-time in favor of the Newton's-third-law-plus-circulation
explanation. Blueprint's assessment component cited for the full item
bank.

## Tutor Recovery Strategy

Shrink-to question: "forget lift for a second — in P+½ρv²+ρgh=constant,
if v goes up, what MUST happen to P to keep the total the same?"
(isolating the pure energy-bookkeeping relationship before discussing
aerofoils). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (energy-conservation origin of the pressure-speed relationship;
debunked equal-transit-time theory) bound to procedure (Bernoulli's
equation application along a streamline). Interleave with
`phys.mech.pressure-fluids`, `phys.mech.conservation-of-energy`, and,
once authored, `phys.mech.viscosity` (the direct KG unlock).

## Transfer Connections

Near: any Bernoulli's-equation flow problem, including venturi meters and
pitot tubes. Far: aerospace engineering (aerofoil and wing design
relying on the genuine circulation-based lift mechanism, not
equal-transit-time) and cardiovascular physiology (blood flow through
narrowed arteries following the same pressure-speed relationship).
Real-world: understanding why a shower curtain gets "sucked" inward
during a shower (actually a Bernoulli pressure-difference effect from
fast-moving water-entrained air). Expert: the Kutta-Joukowski circulation
theory explaining the aerofoil speed difference's actual origin.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified;
honest "weak but real" assessment.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
discrimination-pairs component by reference. Not restated: Concept
Identity & Metadata, Concept Explanation Multi-Tier, Worked Examples,
Lesson Composition Grammar, Retrieval Spacing Schedule, Prerequisite &
Unlock Map, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No cross-subject connection found beyond physics itself.

## Version History

- 2026-07-23 (physics EB Wave 9): initial authoring.
