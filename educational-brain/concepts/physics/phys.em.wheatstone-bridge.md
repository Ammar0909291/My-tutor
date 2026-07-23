# Wheatstone Bridge — `phys.em.wheatstone-bridge`

## Identity

- **Concept ID**: `phys.em.wheatstone-bridge` (canonical physics KG)
- **Curriculum location**: physics / electromagnetism — dependency level 9.
- **Prerequisites**: `phys.em.kirchhoffs-laws` — the Wheatstone bridge's
  balance condition is a direct application of the already-secure
  Kirchhoff's laws to a specific, cleverly-designed four-resistor
  topology.
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 4

## Learning Objective

The learner can: (1) correctly state that the Wheatstone bridge's balance
condition (P/Q=R/X, or equivalently P×X=Q×R) depends ENTIRELY on
resistance RATIOS, with the battery's EMF and the galvanometer's own
resistance NOT appearing anywhere in the balance equation — a null
measurement technique whose result is independent of exactly how much
voltage drives the circuit; (2) correctly explain that balance does NOT
require all four resistors to be equal (P=Q=R=X) — balance only requires
the RATIO P/Q to equal the ratio R/X, a condition satisfied by countless
different resistor combinations, not just the equal-resistor special
case.

## Core Understanding

The Wheatstone bridge achieves balance (zero galvanometer current) when
P/Q=R/X (equivalently, P×X=Q×R) — and this condition depends ENTIRELY on
the RATIOS between the four resistors, with the driving battery's EMF
appearing NOWHERE in the balance equation: doubling the battery voltage
does not shift the balance point at all, since balance is fundamentally
a NULL measurement (like balancing a mechanical scale) — you don't need
to know the exact driving force, only that the two sides have reached
equilibrium. A second, equally important subtlety: balance does NOT
require all four resistors to be numerically EQUAL — the condition
P/Q=R/X can be satisfied by countless different combinations (e.g.
P=100Ω, Q=10Ω, R=47Ω, X=4.7Ω, giving 100/10=47/4.7=10, a perfectly valid
balanced bridge with no two resistors equal) — what matters is that the
RATIO of one pair matches the ratio of the other pair, a proportional
relationship, not an equality requirement (the equal-resistor case is
merely one trivial special case among infinitely many valid balanced
configurations).

## Mental Models

**Beginner**: "The Wheatstone bridge measures the battery's voltage or
EMF; balance requires all four resistors to be equal (P=Q=R=X)." Upgrade
trigger: doubling the battery voltage in the balance equation and
verifying the balance point (the ratio) doesn't change at all directly
confronts the EMF-measurement assumption; verifying balance for a
specific set of four DIFFERENT resistor values (all satisfying P/Q=R/X)
directly confronts the equal-resistors assumption.

**Intermediate**: "Balance condition P/Q=R/X depends only on resistance
ratios, not EMF; balance requires matching RATIOS, not equal resistor
values." This model correctly captures both core results, but sometimes
still gravitates toward the equal-resistor case as the "default" or
"simplest" example without fully internalizing the general ratio
condition.

**Advanced**: "The Wheatstone bridge is fundamentally a NULL-measurement
technique — its power comes from needing only to detect zero current,
never an exact voltage/current reading, making it independent of both
EMF and galvanometer characteristics, and applicable to any ratio, not
just equality."

**Expert**: the Wheatstone bridge's role as a precision resistance-
measurement standard, exploiting the null-measurement principle to avoid
meter-accuracy-dependent errors that plague direct Ohm's-law-based
measurement (V=IR) — a natural practical consolidation, not required for
mastery.

## Why Students Fail

The dominant failure is assuming the bridge measures or depends on the
driving EMF, missing that the balance condition is a pure ratio,
independent of voltage; a second, distinct failure is assuming balance
requires all four resistors to be numerically equal, rather than
recognizing the general ratio-matching condition.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.em.wheatstone-bridge.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-WHEATSTONE-BRIDGE-MEASURES-EMF**: believing the bridge measures
  the battery voltage, or that the EMF value matters for the result.
  **Birth type**: overgeneralization (Type 1) — most circuit-analysis
  problems DO depend on the EMF value, and this general expectation is
  incorrectly extended to the Wheatstone bridge, whose specific
  null-measurement design makes it EMF-independent. Probe: "If you
  doubled the battery's voltage in a balanced Wheatstone bridge, would
  the balance point (the resistor ratio) change?"
- **MC-BRIDGE-BALANCE-REQUIRES-EQUAL-RESISTORS**: believing the bridge
  balances only when P=Q=R=X (all four resistors equal). **Birth type**:
  overgeneralization (Type 1) — the equal-resistor case, often used as
  the simplest introductory example, is mistaken for the general
  requirement, rather than recognized as one trivial special case of the
  broader ratio condition. Probe: "A bridge has P=100Ω, Q=10Ω, R=47Ω,
  X=4.7Ω — four different values. Could this bridge still be balanced?"

## Analogies

**Best**: a mechanical balance scale — you don't need to know Earth's
gravitational field strength to use it; you simply adjust until the two
sides read equal, and the RESULT (the ratio of masses) is independent of
gravity's exact value — directly targets
MC-WHEATSTONE-BRIDGE-MEASURES-EMF by giving a familiar null-measurement
precedent.

**Anti-analogy**: do NOT say "balance the bridge by making the resistors
equal" as a general instruction — this directly invites
MC-BRIDGE-BALANCE-REQUIRES-EQUAL-RESISTORS by suggesting equality rather
than proportion is the actual requirement.

## Demonstrations

Worked-example: verify the balance condition P/Q=R/X holds for
P=100Ω, Q=10Ω, R=47Ω, X=4.7Ω (all different values) — directly targets
MC-BRIDGE-BALANCE-REQUIRES-EQUAL-RESISTORS. Conceptual: substitute a
doubled EMF value into the balance equation, showing the balance
condition (a ratio) is entirely unaffected — directly targets
MC-WHEATSTONE-BRIDGE-MEASURES-EMF.

## Discovery Questions

Discovery-style: "does changing the battery's voltage in a Wheatstone
bridge circuit shift WHERE the balance point is, or does the balance
condition stay exactly the same?" — learner reasons through the ratio-only
balance equation, directly confronting
MC-WHEATSTONE-BRIDGE-MEASURES-EMF.

## Teaching Sequence

Blueprint's discrimination-pairs component cited by reference.
MC-BRIDGE-BALANCE-REQUIRES-EQUAL-RESISTORS is addressed first
(establishing balance as a ratio condition, not an equality), before
MC-WHEATSTONE-BRIDGE-MEASURES-EMF, since correctly understanding balance
as a pure RATIO relationship naturally motivates the follow-up question
of what other circuit quantities (like EMF) that ratio does or doesn't
depend on.

## Tutor Actions

WORKED-EXAMPLE (balance verified for four unequal resistors; balance
condition tested against a doubled EMF, showing no change);
DEMONSTRATION (mechanical balance-scale analogy mapped explicitly onto
the null-measurement principle).

## Voice Teaching Notes

Listen for "the bridge measures voltage" or an assumption that all four
resistors must be equal — the two direct misconception tells.
Load-bearing sentence: "balance is about the RATIO of resistors, not
their exact values, and it doesn't care at all how much voltage is
driving the circuit." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner claiming the bridge measures or depends on EMF signals
MC-WHEATSTONE-BRIDGE-MEASURES-EMF (MISCONCEIVING, full repair via the
doubled-EMF test). A learner claiming balance requires equal resistors
signals MC-BRIDGE-BALANCE-REQUIRES-EQUAL-RESISTORS (full repair via the
unequal-resistor worked example). Mastery trigger: correctly stating the
balance condition depends only on resistance ratios, AND correctly
verifying balance for a set of unequal resistor values. Blueprint's
assessment component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the exact resistor values for a second — does
P/Q have to equal 1, or just equal R/X?" (isolating the ratio-matching
condition before computing specific values). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (null-measurement EMF-independence; ratio-not-equality balance
condition) bound to procedure (P×X=Q×R balance verification). Interleave
with `phys.em.kirchhoffs-laws` and `phys.em.potentiometer` (sibling
concept at this same dependency level, another null-measurement
technique).

## Transfer Connections

Near: any resistance-measurement or bridge-balance problem, including
strain gauge circuits. Far: electrical engineering (precision resistance
measurement standards built on the same null-balance principle) and
sensor design (strain gauges and thermistors often measured via bridge
circuits for high precision). Real-world: understanding why bridge
circuits remain the gold standard for precise resistance measurement,
immune to power-supply fluctuations. Expert: the bridge's role in
avoiding meter-accuracy-dependent errors that plague direct Ohm's-law
measurement.

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
