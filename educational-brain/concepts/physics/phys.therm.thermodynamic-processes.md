# Thermodynamic Processes — `phys.therm.thermodynamic-processes`

## Identity

- **Concept ID**: `phys.therm.thermodynamic-processes` (canonical physics KG)
- **Curriculum location**: physics / thermodynamics — dependency level 8.
- **Prerequisites**: `phys.therm.first-law` — classifying processes
  (isothermal, adiabatic, isobaric, isochoric, free expansion) is a direct
  application of the already-secure ΔU = Q + W relationship under
  different constraints on Q, W, or state variables.
- **Unlocks** (from KG): `phys.therm.heat-engines`, `phys.therm.second-law`
  — a genuine hub concept.
- **Difficulty**: proficient · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 5

## Learning Objective

The learner can: (1) correctly compare an adiabatic and isothermal
expansion from the same starting point on a P-V diagram, correctly
stating the ADIABATIC curve is STEEPER (pressure drops MORE for the same
volume increase) — not flatter or equal, since no heat enters to
partially replace the internal energy (and hence pressure) being spent
on expansion work; (2) correctly apply the first law to free expansion
into a vacuum (Q=0, W=0, so ΔU=0) and correctly conclude an ideal gas's
temperature is UNCHANGED, not cooled, despite the gas expanding.

## Core Understanding

Comparing an adiabatic and an isothermal expansion of the same gas from
the same initial state: the ADIABATIC curve on a P-V diagram is STEEPER
than the isothermal curve — pressure falls MORE rapidly with increasing
volume — the opposite of a common intuitive guess that adiabatic
(no heat exchange) should somehow be a "gentler" or flatter process. The
reason: in an isothermal process, heat flows IN as the gas expands,
continuously replenishing internal energy (and hence maintaining
pressure via PV=nRT at constant T); in an adiabatic process, NO heat
enters, so the SAME expansion work must come entirely from the gas's own
internal energy, causing both temperature AND pressure to drop faster
than in the isothermal case. Free expansion (a gas expanding into a
vacuum with no external pressure resisting it, in an insulated container)
is a specific case demanding careful first-law application rather than
pattern-matching "expansion cools": since the gas expands against ZERO
external pressure, it does NO work (W=0), and since the container is
insulated, no heat enters (Q=0) — by the first law, ΔU = Q + W = 0
exactly, and for an ideal gas (whose internal energy depends only on
temperature), ΔU=0 means the temperature is UNCHANGED, not lowered,
despite the intuitive expectation that "expansion always cools a gas"
(which correctly describes expansion doing WORK against an external
pressure, not free expansion against nothing).

## Mental Models

**Beginner**: "Adiabatic processes are gentler/flatter than isothermal on
a P-V diagram, since no heat is exchanged; any gas expansion cools the
gas." Upgrade trigger: computing actual pressure values for both
processes from the same starting point at the same final volume,
finding the adiabatic curve drops FURTHER, directly confronts the
flatter assumption; applying the first law to free expansion (Q=0, W=0)
directly confronts the universal-cooling assumption.

**Intermediate**: "Adiabatic is STEEPER than isothermal (no heat
replenishment); free expansion causes NO temperature change for an ideal
gas (Q=0 and W=0 both, so ΔU=0)." This model correctly captures both
results, but sometimes still expects some intermediate cooling in free
expansion out of habit from ordinary (work-doing) expansion scenarios.

**Advanced**: "Every process must be analyzed via the specific first-law
inputs (what Q and W actually are under the given constraint), never by
analogy to a 'typical' expansion — free expansion is a genuinely special
case where the usual expansion-cools intuition simply doesn't apply,
because no work is actually done."

**Expert**: the adiabatic process's steeper P-V slope as a direct
consequence of the adiabatic condition PV^γ = constant (γ>1) compared to
the isothermal PV = constant — a natural mathematical consolidation, not
required for mastery.

## Why Students Fail

The dominant failure is expecting adiabatic expansion to be gentler
(flatter) than isothermal, since "no heat exchanged" is intuitively
associated with "less dramatic" rather than correctly reasoned through
the first law; a second, distinct failure is over-applying "expansion
cools a gas" to free expansion, where the absence of external pressure
means no work is actually done, breaking the usual work-based cooling
mechanism.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.therm.thermodynamic-processes.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-ADIABATIC-STEEPER-OR-SHALLOWER**: drawing the adiabatic curve
  flatter than or equal to the isothermal curve on a P-V diagram.
  **Birth type**: perceptual intuition (Type 2) — "no heat exchanged"
  intuitively suggests a "calmer," less dramatic process, incorrectly
  mapped onto a flatter/gentler pressure-volume curve, when the opposite
  is mathematically true. Probe: "Starting from the same point, a gas
  expands once isothermally and once adiabatically to the same final
  volume. Which process ends at a LOWER final pressure?"
- **MC-FREE-EXPANSION-COOLS-GAS**: believing a gas expanding freely into
  a vacuum always cools, because "expansion always cools." **Birth
  type**: overgeneralization (Type 1) — ordinary adiabatic expansion
  against an external pressure (which genuinely does cool the gas, since
  work is done using internal energy) is over-extended to free expansion,
  where no external pressure means no work is actually done. Probe: "An
  insulated gas expands into an evacuated (empty) chamber, doing no work
  against anything. Does its temperature change?"

## Analogies

**Best**: spending money from a bank account with an ongoing paycheck
(isothermal, replenished) vs. spending from a fixed balance with no
income (adiabatic) — the fixed-balance case depletes FASTER for the same
spending rate, directly targeting MC-ADIABATIC-STEEPER-OR-SHALLOWER by
mapping "no replenishment" onto "faster depletion," not "gentler."

**Anti-analogy**: do NOT say "expansion always cools a gas" as an
unqualified rule — this omits the crucial distinction between doing work
against an external pressure (cools) and free expansion against nothing
(doesn't), directly inviting MC-FREE-EXPANSION-COOLS-GAS.

## Demonstrations

Physical/conceptual: compute actual pressure values for isothermal and
adiabatic expansion from the same starting point to the same final
volume (e.g. P₂=P₁/3 isothermal vs. P₂≈0.16P₁ adiabatic), directly
targeting MC-ADIABATIC-STEEPER-OR-SHALLOWER with concrete numbers.
Worked-example: apply ΔU=Q+W with Q=0, W=0 to free expansion, showing
ΔT=0 for an ideal gas — directly targets
MC-FREE-EXPANSION-COOLS-GAS.

## Discovery Questions

Discovery-style: "does a gas expanding into a truly empty (vacuum)
insulated chamber do any work at all, and if not, what does the first
law say about its temperature change?" — learner reasons through W=0,
Q=0, ΔU=0, directly confronting MC-FREE-EXPANSION-COOLS-GAS.

## Teaching Sequence

Blueprint's assessment component cited by reference.
MC-ADIABATIC-STEEPER-OR-SHALLOWER is addressed first (establishing
comparative P-V behavior for standard processes), before
MC-FREE-EXPANSION-COOLS-GAS, since correctly reasoning through the
first law for standard adiabatic expansion (which DOES cool, doing work
against external pressure) is the necessary contrast case that makes
free expansion's zero-work, zero-cooling result a genuinely
distinguishable, well-motivated special case rather than an arbitrary
exception.

## Tutor Actions

WORKED-EXAMPLE (numeric P-V comparison for isothermal vs. adiabatic
expansion; first-law application to free expansion); COMPARE-CONTRAST
(ordinary adiabatic expansion against external pressure vs. free
expansion against vacuum).

## Voice Teaching Notes

Listen for adiabatic drawn flatter than isothermal, or "expansion always
cools" applied to free expansion — the two direct misconception tells.
Load-bearing sentence: "no heat coming in means the gas has to pay for
its own expansion from its OWN energy — that makes adiabatic drop
FASTER, not slower; and free expansion does no work at all, so nothing
gets paid." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner drawing the adiabatic curve flatter than isothermal signals
MC-ADIABATIC-STEEPER-OR-SHALLOWER (MISCONCEIVING, full repair via the
numeric P-V comparison). A learner predicting cooling during free
expansion signals MC-FREE-EXPANSION-COOLS-GAS (full repair via the
first-law application). Mastery trigger: correctly identifying the
adiabatic curve as steeper than isothermal, AND correctly predicting
zero temperature change for ideal-gas free expansion. Blueprint's
assessment component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the curve shape for a second — during
adiabatic expansion, is ANY heat coming in to help replace the energy
being spent on expansion work?" (isolating the no-replenishment
consequence before comparing steepness). See
`../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (adiabatic vs. isothermal steepness; free-expansion special
case) bound to procedure (first-law application per process type).
Interleave with `phys.therm.first-law` and, once authored,
`phys.therm.second-law`/`phys.therm.heat-engines` (the direct KG
unlocks).

## Transfer Connections

Near: any P-V diagram process-comparison problem, including engine cycle
analysis. Far: atmospheric science (adiabatic cooling of rising air
parcels, a real-world adiabatic-not-isothermal process) and refrigeration
engineering (compression/expansion cycles relying on precise
process-type distinctions). Real-world: understanding why a rapidly
expanding gas (like from an aerosol can) feels cold — genuine adiabatic
cooling against atmospheric pressure, distinct from the free-expansion
special case. Expert: the adiabatic condition PV^γ=constant explaining
the steeper P-V slope mathematically.

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
