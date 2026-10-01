# bio.eco.predator-prey-dynamics — Predator-Prey Population Dynamics

## Identity
- **Concept ID**: `bio.eco.predator-prey-dynamics`
- **Subject**: Biology
- **Domain**: Ecology (`bio.eco`)
- **Prerequisites**: `bio.eco.population-growth-models-quantitative`
- **Unlocks**: (none)
- **Cross-links (KG)**: `math.de.ode`, `math.de.nonlinear-ode`
- **Difficulty**: expert
- **Bloom level**: analyze
- **Mastery threshold**: 0.8
- **Estimated hours**: 6

## Learning Objective
The student can correctly explain the Lotka-Volterra equations as a COUPLED system (
where each species' growth rate depends on the OTHER species' population size, not
just its own), correctly distinguish FUNCTIONAL response (a single predator's
per-capita predation rate as prey density changes) from NUMERICAL response (the
predator POPULATION's size responding to prey availability), and correctly explain
boom-bust cycles as an EMERGENT property arising from the coupling itself, rather than
requiring any external disturbance to explain the oscillation.

## Core Understanding
The single-species logistic model previously introduced describes one population's
growth as a function of its OWN size relative to carrying capacity. The
**Lotka-Volterra predator-prey equations** extend this into a **coupled system** of
TWO differential equations — one for the prey population, one for the predator
population — where CRITICALLY, each equation's growth rate depends on BOTH
populations' sizes simultaneously, not on either population's size alone. The prey
population's growth rate increases with its own reproduction but DECREASES with
predation pressure (which depends on how many predators are present); the predator
population's growth rate INCREASES with prey availability (its food source) but
decreases with its own natural mortality. This COUPLING — each population's dynamics
genuinely depending on the other's current size — is the essential structural feature
that produces the model's characteristic behaviour, and connects directly to the
mathematics of coupled, nonlinear ordinary differential equations (a system where the
equations cannot be solved independently, one at a time, precisely because each
depends on the other's changing value).

Predation rate itself can be decomposed into two DISTINCT components. The
**functional response** describes how a SINGLE predator's per-capita predation
rate (prey killed per predator per unit time) changes as PREY DENSITY changes — this
is a property of individual predator behaviour/physiology (e.g., handling time
limiting how many prey one predator can process, even when prey are abundant). The
**numerical response** describes how the PREDATOR POPULATION's size (through
reproduction and/or migration) changes in response to prey availability — this is a
property of the predator POPULATION responding demographically to its food supply
over a LONGER timescale than the functional response. These are genuinely DIFFERENT
mechanisms operating at different levels (individual behaviour vs. population
demography) and different timescales, and BOTH jointly determine the overall predation
pressure prey experience.

The most important, often counter-intuitive conceptual point about the coupled system
is that **boom-bust population cycles** (oscillating rises and falls in both predator
and prey populations, with the predator cycle typically LAGGING slightly behind the
prey cycle) are an EMERGENT property of the coupling ITSELF — they arise
MATHEMATICALLY from the structure of the coupled equations, and do NOT require any
external disturbance or environmental fluctuation to occur. The causal sequence
within one cycle: abundant prey allows the predator population to grow (numerical
response); the growing predator population then depletes the prey population through
increased predation; the depleted prey population can then no longer support the
larger predator population, so predators decline; the resulting reduced predation
pressure then allows the prey population to recover and grow again, restarting the
cycle. This self-sustaining oscillation is a genuinely mathematical consequence of the
coupled nonlinear system, not evidence of some external perturbing force.

## Mental Models
- **The linked-seesaw model for coupling**: prey and predator population sizes are two
  ends of a seesaw connected by a mechanical linkage (predation) — pushing one end
  eventually pushes the other, with a built-in delay, producing a self-sustaining
  back-and-forth rather than either side settling independently.
- **The appetite-vs-family-size model for functional vs. numerical response**: the
  functional response is like one individual's personal appetite limit (how much any
  ONE predator can eat, regardless of food abundance beyond that limit); the
  numerical response is like how large the predator "family" (population) grows given
  a food supply, over a longer timescale.

## Why Students Fail
- They treat the prey and predator equations as two INDEPENDENT logistic models that
  happen to interact loosely, missing that the equations are genuinely COUPLED — each
  population's growth rate is a direct mathematical function of the OTHER population's
  current size.
- They conflate functional response (individual predation rate vs. prey density) with
  numerical response (predator population size vs. prey availability), treating both
  as the same phenomenon rather than distinct mechanisms operating at different
  levels and timescales.
- They assume boom-bust cycles must be caused by some EXTERNAL disturbance (weather,
  disease), missing that the oscillation is an EMERGENT, self-sustaining mathematical
  property of the coupled system itself.

## Misconceptions

No Blueprint exists yet for this concept, and no seed content exists in
`biologySeedAssets.ts` or `biologyDepthSeedAssets.ts` (confirmed via direct grep before
authoring): this concept is one of the 91 added by the 2026-09-14 KG extension and
currently has zero authored explanations or probes of any kind. Both misconceptions
below are therefore authored directly from first principles using the birth-taxonomy
diagnostic procedure (`educational-brain/misconceptions/01-birth-taxonomy.md`), and are
NOT tied to any existing seed-corpus probe — there is none to cite.

### M1 — "Boom-bust cycles must be caused by an external disturbance" (Type 2: Perceptual Intuition)
**Statement**: Oscillating predator-prey population cycles are assumed to require some
EXTERNAL cause (a disease outbreak, a weather event, human intervention), rather than
being understood as an EMERGENT, self-sustaining property that arises mathematically
from the coupled system itself, with no external disturbance needed.
**Origin**: The perceptually intuitive assumption that a stable-seeming population
should stay stable unless something disturbs it from OUTSIDE the system collides with
the counter-intuitive mathematical fact that a coupled nonlinear system can oscillate
INDEFINITELY on its own.
**Why it persists**: Without tracing the specific causal LOOP (prey abundance →
predator growth → prey depletion → predator decline → prey recovery), an oscillation
can seem to demand an external trigger to explain why it isn't simply flat/stable.
**Repair**: State the internal causal loop explicitly and show that each step
MECHANICALLY causes the next purely from the coupled equations' own structure —
abundant prey enables predator population growth (numerical response); more predators
increase predation pressure, depleting prey; depleted prey can no longer support the
larger predator population, so predators decline; reduced predation then allows prey
to recover, restarting the cycle — no external disturbance appears anywhere in this
loop.
**Verification-of-death**: given a scenario asking whether a predator-prey system in a
constant, undisturbed environment could still show cycling, the learner correctly
answers yes, citing the self-sustaining internal causal loop rather than requiring an
external cause.

### M2 — "Functional response and numerical response are the same thing" (Type 1: Overgeneralization)
**Statement**: A single predator's per-capita predation rate changing with prey
density (functional response) and the predator population's size changing in
response to prey availability (numerical response) are treated as the same
phenomenon, without distinguishing that one operates at the level of individual
predator behaviour and the other at the level of population demography, on different
timescales.
**Origin**: Overgeneralizing from the shared broad category ("predators respond to
prey") to an incorrect inference that both responses work through the SAME mechanism
and timescale, without separately tracking that an individual's short-term feeding
behaviour and a population's longer-term demographic growth are functionally distinct.
**Why it persists**: Without an explicit contrast naming the specific LEVEL
(individual vs. population) and TIMESCALE each response operates at, "predators
respond to prey abundance" can substitute for the two distinct mechanisms.
**Repair**: State the distinction explicitly: functional response is an INDIVIDUAL
predator's per-capita predation rate changing with prey density (a behavioural/
physiological property, often limited by handling time, operating quickly); numerical
response is the PREDATOR POPULATION's size changing (via reproduction/migration) in
response to prey availability (a demographic property, operating over a longer
timescale) — both jointly determine total predation pressure but are mechanistically
and temporally distinct.
**Verification-of-death**: given a scenario describing prey abundance rising sharply
and then asking what happens to (a) an individual predator's kill rate within days
versus (b) the predator population's size over the following breeding season, the
learner correctly attributes (a) to functional response and (b) to numerical
response.

## Analogies
- The linked-seesaw model for the coupled system (see Mental Models): a mechanical
  linkage producing a self-sustaining, delayed back-and-forth.
- The appetite-vs-family-size model for functional vs. numerical response (see Mental
  Models): one individual's personal limit versus how large the population grows over
  time.

## Demonstrations
- Present the constant-undisturbed-environment scenario and ask the student to
  predict whether cycling could still occur, tracing the internal causal loop
  explicitly.
- Present the sharp-prey-abundance-rise scenario and ask the student to attribute the
  short-term individual kill-rate change versus the longer-term population-size change
  to functional versus numerical response respectively.

## Discovery Questions
- "If nothing from OUTSIDE the predator-prey system changes, could the populations
  still rise and fall in cycles indefinitely? Trace the causal loop step by step."
- "If prey suddenly become twice as abundant, would you expect an individual
  predator's kill rate to double IMMEDIATELY, or would the predator POPULATION need
  time to grow first? Are these the same question?"
- "Why does the predator population's peak typically LAG slightly behind the prey
  population's peak in these cycles?"

## Teaching Sequence
1. Introduce the Lotka-Volterra equations as a genuinely coupled system, contrasting
   with the single-species logistic model already covered.
2. Introduce functional and numerical response as two distinct components of overall
   predation pressure, directly correcting the same-thing misconception using the
   sharp-prey-abundance-rise scenario.
3. Trace the internal causal loop producing boom-bust cycles step by step, directly
   correcting the external-disturbance-required misconception using the constant-
   environment scenario.
4. Close by connecting the predator-lag phenomenon back to the causal loop's own
   sequential structure.

## Tutor Actions
- If a student claims cycling requires an external cause: ask them to trace the
  internal causal loop step by step in a constant environment.
- If a student conflates functional and numerical response: ask them to separate a
  short-term individual behaviour change from a longer-term population size change in
  a given scenario.
- If a student treats the two population equations as independent: ask them to
  identify what specific term in one equation depends on the OTHER population's size.

## Voice Teaching Notes
Say "trace the loop, no outside cause needed" whenever boom-bust cycles come up, to
keep the emergent, self-sustaining framing explicit. Say "individual or population,
which timescale?" whenever functional and numerical response are discussed together,
to keep the level-and-timescale distinction active.

## Assessment Signals
No seed corpus exists for this concept, so no item-bank diagnostic interpretation can
be given yet (see Runtime Asset References). The general diagnostic principle for M1,
once probes exist: a learner who traces the internal causal loop to explain cycling
without invoking an external cause shows the repaired model; a learner who insists an
external disturbance is required is showing M1 in its cleanest, most-detectable form.

## Tutor Recovery Strategy
For M1, present the constant-undisturbed-environment scenario and ask the student to
predict the outcome BEFORE revealing the answer, deriving the self-sustaining-cycle
conclusion from the causal-loop tracing task itself. For M2, present the sharp-prey-
abundance-rise scenario and require the student to separately address the individual
and population-level changes, rather than accepting an unspecific "predators respond
to more prey" answer.

## Memory Hooks
- "Prey up, predators up, prey down, predators down — the loop runs itself, no push
  from outside needed."
- "Functional response is one mouth's appetite; numerical response is how big the
  family grows."
- "The predator peak always lags a beat behind the prey peak — that's the loop's own
  timing."

## Transfer Connections
- `bio.eco.population-growth-models-quantitative` (prerequisite): supplies the
  single-species logistic differential-equation framework this concept extends into a
  coupled two-species system.

## Cross-Subject Connections
This concept cross-links to `math.de.ode` (the Lotka-Volterra equations are a system
of ordinary differential equations) and `math.de.nonlinear-ode` (the coupling terms
between the two population equations make the system nonlinear, which is precisely
what permits the sustained oscillatory boom-bust behaviour rather than simple
convergence to equilibrium) — both cross-links are named explicitly in the KG's
`cross_links` field for this concept.

## Blueprint References
No Blueprint exists for biology as a subject (per the standing note for this authoring
campaign). This concept has zero seed content of any kind (confirmed via direct grep
against `biologySeedAssets.ts` and `biologyDepthSeedAssets.ts`); both misconceptions
above were authored directly from first principles using the birth-taxonomy diagnostic
procedure (`educational-brain/misconceptions/01-birth-taxonomy.md`), following the
established precedent set by `bio.eco.population-growth-models-quantitative` and
`bio.eco.community-ecology`.

## Runtime Asset References
No seed content of any kind exists for this concept in `biologySeedAssets.ts` or
`biologyDepthSeedAssets.ts` — this is one of the 91 concepts added by the 2026-09-14 KG
extension. This EB entry is authored entirely from first principles and does not cite
any runtime asset. Seeding `core_explanation`/`misconception_repair`/`mcq`/
`misconception_probe` content for this concept, and a probe-depth `short_answer` to
reach the 3-probe contract floor, remain outstanding tasks for whichever future
initiative seeds content for the 91-concept KG-extension pool (a separate, larger,
not-yet-started task per the standing note in `CLAUDE.md`'s Biology program section).

## Curriculum Feedback
The KG description's named sub-topics (the Lotka-Volterra predator-prey equations as a
coupled system of differential equations; functional response versus numerical
response; boom-bust population cycles as an emergent property of the coupled system)
are all covered in this EB entry directly from first principles, since no seed content
exists to check against. No additional Curriculum Feedback gap is recorded for this
entry.

## Version History
- 2026-09-21: Initial authoring (forty-eighth recomputed topological frontier, batch
  of 3 with `bio.behav.kin-selection-altruism` and `bio.behav.learning-and-behavior`,
  all first-principles entries — a FOURTEENTH consecutive fully zero-seed-content
  batch, 0 of 24 frontier candidates), EB concept 161/199.
