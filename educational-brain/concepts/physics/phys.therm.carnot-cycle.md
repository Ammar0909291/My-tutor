# Carnot Cycle — `phys.therm.carnot-cycle`

## Identity

- **Concept ID**: `phys.therm.carnot-cycle` (canonical physics KG)
- **Curriculum location**: physics / thermodynamics — dependency level 11.
- **Prerequisites**: `phys.therm.entropy`, `phys.therm.heat-engines` —
  the Carnot cycle is the theoretical, entropy-based efficiency LIMIT
  for the already-secure general heat-engine efficiency concept.
- **Unlocks** (from KG): `phys.therm.refrigerators` — a genuine hub
  concept.
- **Difficulty**: advanced · **Bloom**: analyze · **Mastery threshold**: 0.80
  · **Est. hours**: 6

## Learning Objective

The learner can: (1) correctly explain that the Carnot engine is NOT the
best REAL, practically-usable engine — it requires quasi-static
(infinitely slow) processes to achieve its theoretical maximum
efficiency, delivering essentially zero power per cycle; it is a
theoretical CEILING/benchmark that real engines (Rankine, Otto, Diesel)
approach while trading some efficiency for practical, finite power
output; (2) correctly compute Carnot efficiency, η=1-T_C/T_H, using
ABSOLUTE (Kelvin) temperatures — NOT Celsius — since the derivation
specifically requires the ratio T_C/T_H from entropy considerations
(Q_H/T_H=Q_C/T_C), and substituting Celsius values produces a
dramatically and specifically wrong numerical answer (e.g. 78.7% instead
of the correct 25% for T_H=127°C, T_C=27°C).

## Core Understanding

The Carnot cycle represents the theoretical maximum possible efficiency
for any heat engine operating between two given temperatures — but it is
explicitly NOT a blueprint for the best PRACTICAL, real-world engine:
achieving Carnot efficiency requires every step of the cycle to proceed
quasi-statically (infinitely slowly, staying arbitrarily close to
thermodynamic equilibrium throughout), which means a genuine Carnot
engine would take infinitely long per cycle, delivering essentially ZERO
power output — a real engine that produces no usable power, however
efficient in principle, is practically useless. The Carnot cycle is best
understood as a theoretical CEILING or benchmark (analogous to the speed
of light limiting travel) — real engines (Rankine steam cycles, Otto
gasoline-engine cycles, Diesel cycles) are engineered to approach the
Carnot efficiency limit as closely as practical while delivering actual,
finite power in finite time, deliberately trading some theoretical
efficiency for real-world usability. A second, critically important and
easily-reversed computational detail: the Carnot efficiency formula,
η=1-T_C/T_H, REQUIRES absolute (Kelvin) temperatures, NOT Celsius —
substituting Celsius values directly produces a specifically, measurably
WRONG answer, not just a units inconsistency: for T_H=127°C (=400K) and
T_C=27°C (=300K), the CORRECT Kelvin-based efficiency is η=1-300/400=25%,
while the INCORRECT Celsius substitution gives η=1-27/127≈78.7% — a
dramatically different, wrong value; this happens because the Carnot
derivation specifically uses the RATIO T_C/T_H, arising from entropy
conservation (Q_H/T_H=Q_C/T_C in a reversible cycle), and while
TEMPERATURE DIFFERENCES are identical in Celsius and Kelvin, TEMPERATURE
RATIOS are NOT (300/400≠27/127), making Kelvin mandatory specifically for
this formula.

## Mental Models

**Beginner**: "The Carnot engine is simply the best possible real
engine, so engineers should try to build one; you can plug temperatures
into the Carnot efficiency formula in whatever units are given,
including Celsius." Upgrade trigger: examining the quasi-static
requirement's consequence (infinite cycle time, zero power) directly
confronts the best-real-engine assumption; computing η with both Celsius
and Kelvin substitutions for the same temperatures, finding dramatically
different (and only one correct) results, directly confronts the
units-don't-matter assumption.

**Intermediate**: "Carnot efficiency is a theoretical ceiling, not a
practical engine design — it trades power for efficiency to an
impractical extreme; the Carnot formula requires Kelvin temperatures
specifically, since it's a ratio, not a difference." This model
correctly captures both core results, but sometimes still reaches for
Celsius values out of habit when temperatures are given that way in a
problem.

**Advanced**: "Always convert to Kelvin before computing any efficiency
ratio; treat the Carnot limit as a benchmark for evaluating how close a
REAL engine's efficiency comes to the theoretical maximum, never as a
literal engineering target to build."

**Expert**: the full Carnot cycle's four reversible steps (isothermal
expansion, adiabatic expansion, isothermal compression, adiabatic
compression) and their role in defining the absolute (Kelvin)
temperature scale itself, independent of any particular working
substance — a natural consolidation directly connecting to the KG unlock
`phys.therm.refrigerators`, not required for mastery.

## Why Students Fail

The dominant failure is treating the Carnot engine as an achievable,
desirable real-engine design rather than a theoretical (zero-power)
efficiency ceiling; a second, distinct failure is substituting Celsius
temperatures into the Carnot efficiency formula, producing a
specifically and measurably wrong numerical result rather than merely an
inconsistent-units issue.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.therm.carnot-cycle.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-CARNOT-IS-REAL-ENGINE**: believing "the Carnot engine is the best
  real engine" or asking "where can I buy a Carnot engine?" **Birth
  type**: overgeneralization (Type 1) — "highest theoretical efficiency"
  is loosely and incorrectly equated with "best practical choice,"
  missing that the Carnot cycle's quasi-static requirement makes it
  deliver zero power, a fundamentally impractical trade-off. Probe:
  "Does a genuine Carnot engine, operating exactly as the theory
  describes, deliver any usable power output per cycle?"
- **MC-CARNOT-EFFICIENCY-USES-CELSIUS**: substituting Celsius
  temperatures into η=1-T_C/T_H, producing a specifically wrong
  numerical answer. **Birth type**: notation-induced (Type 4) — the
  formula's symbolic form doesn't visually signal that Kelvin is
  mandatory (unlike, say, an explicit unit conversion step), and the
  habit of using whatever temperature units a problem states carries
  over incorrectly to this ratio-based formula. Probe: "For T_H=127°C
  and T_C=27°C, does substituting these Celsius values directly into
  η=1-T_C/T_H give the same answer as first converting to Kelvin (400K
  and 300K)?"

## Analogies

**Best**: the speed of light as an unreachable travel-speed ceiling —
useful as a theoretical benchmark for evaluating how "fast" a real
spacecraft is relative to the ultimate limit, but not itself a design
target any real vehicle can achieve — directly targets
MC-CARNOT-IS-REAL-ENGINE by giving a familiar precedent for a theoretical
ceiling that guides, but isn't literally built toward.

**Anti-analogy**: do NOT say "just plug in the given temperatures" as an
unqualified instruction for the Carnot formula — this directly invites
MC-CARNOT-EFFICIENCY-USES-CELSIUS by omitting the Kelvin-conversion
requirement.

## Demonstrations

Conceptual: trace the quasi-static requirement's consequence (each step
must proceed infinitely slowly to remain reversible, meaning infinite
total cycle time and hence zero power) — directly targets
MC-CARNOT-IS-REAL-ENGINE. Worked-example: compute η using both the
Celsius values directly (78.7%, wrong) and the correctly-converted
Kelvin values (25%, correct) for the same physical scenario — directly
targets MC-CARNOT-EFFICIENCY-USES-CELSIUS with a stark numerical
contrast.

## Discovery Questions

Discovery-style: "if temperature differences are the same in Celsius and
Kelvin, why does it matter which units you use in the Carnot
efficiency formula, which uses a temperature RATIO instead of a
difference?" — learner reasons through why ratios (unlike differences)
depend on the zero point, directly confronting
MC-CARNOT-EFFICIENCY-USES-CELSIUS.

## Teaching Sequence

Blueprint's assessment component cited by reference.
MC-CARNOT-IS-REAL-ENGINE is addressed first (establishing the Carnot
cycle as a theoretical, zero-power benchmark), before
MC-CARNOT-EFFICIENCY-USES-CELSIUS, since correctly framing the Carnot
LIMIT conceptually is the prerequisite for then correctly computing that
limit's numerical VALUE with the mandatory Kelvin convention.

## Tutor Actions

WORKED-EXAMPLE (Celsius-vs-Kelvin efficiency computation showing the
dramatic difference); THOUGHT-EXPERIMENT (quasi-static requirement's
zero-power consequence); ANALOGY (speed-of-light theoretical ceiling).

## Voice Teaching Notes

Listen for "build a Carnot engine" language, or Celsius values plugged
directly into the efficiency formula — the two direct misconception
tells. Load-bearing sentence: "Carnot is the theoretical ceiling, not a
buildable engine — it takes forever and makes zero power; and always
convert to Kelvin first, since this formula is a ratio, not a
difference." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner treating the Carnot engine as a practical design goal signals
MC-CARNOT-IS-REAL-ENGINE (MISCONCEIVING, full repair via the
zero-power thought experiment). A learner substituting Celsius values
into the efficiency formula signals
MC-CARNOT-EFFICIENCY-USES-CELSIUS (full repair via the Celsius-vs-Kelvin
worked example). Mastery trigger: correctly explaining the Carnot cycle
as a zero-power theoretical ceiling, AND correctly computing efficiency
using Kelvin temperatures. Blueprint's assessment component cited for
the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the formula for a second — for a quasi-
static (infinitely slow) process, how much time does one full cycle
actually take?" (isolating the zero-power consequence before discussing
practicality). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (theoretical zero-power ceiling; mandatory Kelvin ratio) bound
to procedure (η=1-T_C/T_H calculation with Kelvin conversion).
Interleave with `phys.therm.entropy`, `phys.therm.heat-engines`, and,
once authored, `phys.therm.refrigerators` (the direct KG unlock).

## Transfer Connections

Near: any Carnot-efficiency calculation or engine-benchmark problem.
Far: power plant engineering (real steam/gas turbine cycles engineered
to approach, never reach, the Carnot limit) and refrigeration
engineering (the Carnot limit's reverse-cycle application, directly
connecting to the KG unlock). Real-world: understanding why power plant
efficiency reports are meaningfully compared against the Carnot limit
for their operating temperatures, not against 100%. Expert: the full
four-step reversible Carnot cycle and its role in defining the absolute
temperature scale.

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

- 2026-07-23 (physics EB Wave 11): initial authoring.
