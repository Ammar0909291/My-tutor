# Probability for Computing — `cs.math.probability`

## Identity
- Prerequisite: `cs.math.combinatorics-counting`
- Unlocks: statistics for data and machine learning
- Difficulty / Bloom: proficient / apply

## Learning objective
Calculate event probabilities and distinguish conditional probability, independence, and mutual exclusivity.

## Core understanding
Probability is defined under a model and sample space. For equally likely outcomes, favourable outcomes are divided by total outcomes. Independence means one event does not change another's probability; mutual exclusivity means they cannot occur together.

## Misconceptions
- **M1 — Independent events cannot happen together.** Correction: that is mutual exclusivity; independence means the probability is unchanged by the other event.
- **M2 — All outcomes may be treated as equally likely by default.** Correction: equal likelihood is an assumption to justify.

## Teaching and assessment notes
Ask learners to define the sample space and event before calculating. Contrast independence with mutual exclusivity using two-way tables and small experiments.

## Seed assets
`src/lib/teaching/assets/csCoverageExtensionSeedAssets.ts` — two explanations and three gradeable probes.
