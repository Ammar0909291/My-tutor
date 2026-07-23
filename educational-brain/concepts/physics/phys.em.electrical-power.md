# Electrical Power and Joule Heating — `phys.em.electrical-power`

## Identity

- **Concept ID**: `phys.em.electrical-power` (canonical physics KG)
- **Curriculum location**: physics / electromagnetism — dependency level 7.
- **Prerequisites**: `phys.em.ohms-law` — electrical power formulas
  (P = IV, P = I²R, P = V²/R) are all direct combinations of the
  already-secure V = IR relationship with the general power concept
  (energy per unit time).
- **Unlocks** (from KG): none directly listed — a terminal application
  concept.
- **Difficulty**: developing · **Bloom**: apply · **Mastery threshold**: 0.80
  · **Est. hours**: 3

## Learning Objective

The learner can: (1) state and correctly select among the three equivalent
power formulas (P = IV, P = I²R, P = V²/R), correctly explaining that all
three are algebraically equivalent via Ohm's law and should be chosen
based on which two quantities are actually known in a given problem;
(2) correctly explain that for a FIXED VOLTAGE source, a HIGHER-resistance
element dissipates LESS power (P = V²/R, inversely related to R), while
for a FIXED CURRENT, a higher-resistance element dissipates MORE power
(P = I²R, directly related to R) — the same resistance can correspond to
more or less power depending on which OTHER quantity is held fixed;
(3) correctly compute electrical energy consumption (energy = power × time)
for a given power rating and duration.

## Core Understanding

Electrical power dissipated by a resistive element can be computed via
three algebraically equivalent formulas — P = IV, P = I²R, P = V²/R — each
derived from combining P = IV (power = rate of energy transfer) with Ohm's
law (V = IR) to eliminate whichever variable isn't given; choosing the
right formula for a specific problem depends entirely on which two
quantities are actually known, not on any formula being more "correct"
than another. A genuinely subtle point requiring careful reasoning:
whether a higher-resistance element dissipates MORE or LESS power depends
on what is being held CONSTANT. If voltage is fixed (as in household wall
outlets, where every device sees the same ~120V or ~230V), P = V²/R means
higher resistance gives LESS power (a higher-resistance appliance draws
less power at fixed household voltage). If current is instead fixed (as
in a series circuit, where every element shares the same current), P =
I²R means higher resistance gives MORE power (the resistor with the larger
value dissipates more of the total power) — the identical resistance value
corresponds to opposite power outcomes depending on the circuit context.

## Mental Models

**Beginner**: "Higher resistance always means higher power, or always
means lower power" (a single, fixed directional rule assumed to hold
universally). Upgrade trigger: comparing a fixed-voltage scenario (P = V²/R,
higher R → lower P) against a fixed-current scenario (P = I²R, higher R →
higher P) using the SAME resistance value directly confronts the
single-direction assumption.

**Intermediate**: "The direction depends on what's held constant: fixed V
means higher R → lower P; fixed I means higher R → higher P." This model
correctly identifies the context-dependence, but sometimes still defaults
to whichever formula was most recently practiced rather than actively
checking which quantity is actually fixed in a new problem.

**Advanced**: "Before computing power, first identify which quantity
(V or I) is genuinely fixed/given in this specific circuit context, THEN
select the formula (P = V²/R or P = I²R) that correctly reflects that
constraint — never assume higher resistance has one universal power
consequence."

**Expert**: electrical power dissipation (Joule heating) as a direct
macroscopic manifestation of the same electron-lattice scattering
mechanism underlying resistivity itself — not required for mastery.

## Why Students Fail

The dominant failure is the single-direction default: students correctly
learn ONE formula's directional implication (often P = V²/R from
household-wiring contexts) and incorrectly assume it generalizes
universally, without checking whether the actual problem holds voltage or
current fixed.

## Misconceptions

Blueprint (`docs/curriculum/blueprints/phys.em.electrical-power.md`,
Misconception Engine) documents two; reused by reference with birth-type
added.

- **MC-POWER-IS-ALWAYS-IV**: defaulting to P = IV exclusively, even when
  I and V aren't both directly known/given, rather than selecting the
  algebraically-equivalent formula matching the actually-known quantities.
  **Birth type**: overgeneralization (Type 1) — P = IV is often introduced
  first and treated as "the" power formula, with P = I²R and P = V²/R
  under-recognized as equally valid, situationally more convenient
  alternatives. Probe: "You know a resistor's resistance and the current
  through it, but not the voltage across it directly. Can you still find
  its power without first computing voltage separately?"
- **MC-HIGH-RESISTANCE-ELEMENTS-ALWAYS-DISSIPATE-MORE-POWER**: belief
  higher resistance always means higher power dissipation, regardless of
  circuit context. **Birth type**: overgeneralization (Type 1) — P = I²R
  (where higher R does mean higher P, for fixed I) is over-applied to
  fixed-voltage contexts, where the opposite relationship (P = V²/R) holds
  instead. Probe: "Two different lightbulbs are plugged into the same wall
  outlet (fixed voltage). The higher-resistance bulb — does it dissipate
  more power or less?"

## Analogies

**Best**: household water pressure (fixed, like fixed voltage) through
pipes of different narrowness (resistance) — a narrower pipe (higher
resistance) at FIXED PRESSURE lets through LESS flow, hence less power
delivered; but if instead the FLOW RATE (current) were forced to be
identical through pipes of different narrowness (an unusual, forced
scenario), the narrower pipe would need more "push" (power) to maintain
that flow. Directly targets MC-HIGH-RESISTANCE-ELEMENTS-ALWAYS-DISSIPATE-MORE-POWER
by grounding both directions in a shared plumbing intuition.

**Anti-analogy**: do NOT say "more resistance means more power dissipated"
as a general rule — true only for fixed current, directly installing
MC-HIGH-RESISTANCE-ELEMENTS-ALWAYS-DISSIPATE-MORE-POWER when applied to
fixed-voltage household contexts.

## Demonstrations

Physical/data-based: compare two different-wattage lightbulbs (different
resistance) both plugged into the same wall outlet (fixed voltage) —
showing the LOWER-resistance bulb (higher-wattage rating) actually draws
MORE power, directly targeting the misconception with a familiar
real-world contrast. Worked-example pair: the SAME two resistors, once
analyzed in a fixed-voltage (parallel, off the same source) context and
once in a fixed-current (series) context, showing the power ranking
flips.

## Discovery Questions

Discovery-style: "of two lightbulbs plugged into the same wall socket, does
the higher-resistance one glow brighter (more power) or dimmer (less
power)?" — learner predicts, then the two-bulb comparison resolves it,
directly confronting MC-HIGH-RESISTANCE-ELEMENTS-ALWAYS-DISSIPATE-MORE-POWER.

## Teaching Sequence

Blueprint's practice-set and assessment components cited by reference.
MC-POWER-IS-ALWAYS-IV is addressed first (establishing formula selection
based on known quantities, via worked examples using each of the three
forms), before MC-HIGH-RESISTANCE-ELEMENTS-ALWAYS-DISSIPATE-MORE-POWER,
since fluency choosing between P = I²R and P = V²/R (rather than defaulting
to P = IV) is the prerequisite skill for correctly reasoning about which
one applies in a given fixed-V or fixed-I context.

## Tutor Actions

WORKED-EXAMPLE (the same two resistors analyzed under fixed-V and
fixed-I conditions, showing the power ranking flips); DEMONSTRATION
(two-lightbulb same-outlet comparison); ERROR-ANALYSIS (a solution
assuming higher resistance always means higher power).

## Voice Teaching Notes

Listen for "higher resistance, more power" stated without first checking
whether voltage or current is fixed — the direct
MC-HIGH-RESISTANCE-ELEMENTS-ALWAYS-DISSIPATE-MORE-POWER tell. Load-bearing
sentence: "check what's FIXED first — voltage fixed means higher
resistance is LESS power; current fixed means higher resistance is MORE
power." Channel-reality caveats owned by
`../foundations/03-voice-first-learning-model.md §7`.

## Assessment Signals

A learner predicting more power for the higher-resistance bulb at fixed
household voltage signals
MC-HIGH-RESISTANCE-ELEMENTS-ALWAYS-DISSIPATE-MORE-POWER (MISCONCEIVING,
full repair via the two-bulb comparison). Mastery trigger: correctly
selecting among the three power formulas based on known quantities, AND
correctly reasoning through both fixed-voltage and fixed-current power
scenarios for the same resistance values without defaulting to one
direction. Blueprint's assessment component cited for the full item bank.

## Tutor Recovery Strategy

Shrink-to question: "forget the formula for a second — in THIS specific
circuit, is the voltage the same for both elements, or is the current the
same?" (isolating the fixed-quantity identification before selecting a
formula). See `../foundations/01-recovery-engine.md`.

## Memory Hooks

Concept (fixed-V vs. fixed-I power-resistance relationship) bound to
procedure (selecting among P = IV, I²R, V²/R). Interleave with
`phys.em.ohms-law` and `phys.em.dc-circuits` (series/parallel context
determines which quantity is fixed).

## Transfer Connections

Near: any electrical-power calculation problem, including household
appliance wattage ratings. Far: power grid engineering (transmission at
high voltage specifically to minimize I²R losses for a given power
delivered) and electronics thermal design (resistor power ratings and
heat dissipation limits). Real-world: understanding household electricity
bills (energy = power × time, billed in kWh) and why appliance wattage
labels matter for circuit breaker sizing. Expert: Joule heating's
microscopic origin in electron-lattice scattering, the same mechanism
underlying resistivity.

## Cross-Subject Connections

KG `cross_links` empty. No strong cross-subject connection identified;
honest "weak but real" assessment.

## Blueprint References

Blueprint exists (Component-format). Reuses: Misconception Engine and its
practice-set/assessment components by reference. Not restated: Concept
Identity & Metadata, Concept Explanation Multi-Tier, Worked Examples,
Lesson Composition Grammar, Retrieval Spacing Schedule, Prerequisite &
Unlock Map, Validation Checklist.

## Runtime Asset References

No seeded `AssetIdentity` records — checked against `brainSeedAssets.ts`.
None created.

## Curriculum Feedback

No cross-subject connection found beyond physics itself.

## Version History

- 2026-07-22 (physics EB Wave 7): initial authoring.
