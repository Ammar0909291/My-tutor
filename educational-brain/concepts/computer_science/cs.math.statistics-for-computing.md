# Statistics for Data and Machine Learning — `cs.math.statistics-for-computing`

## Identity
- Prerequisite: `cs.math.probability`
- Unlocks: `cs.ds.intro-machine-learning`
- Difficulty / Bloom: proficient / analyze

## Learning objective
Summarise data, reason about sampling uncertainty, and identify common errors in statistical and predictive conclusions.

## Core understanding
Descriptive statistics summarise observed data; inference uses samples to reason about populations with uncertainty. Mean and median respond differently to outliers. Biased samples can misrepresent populations; correlation alone does not establish causation; training performance does not by itself establish generalisation.

## Misconceptions
- **M1 — A high training score proves a model generalises.** Correction: overfitting and data leakage can inflate training performance; evaluate held-out data.
- **M2 — Correlation proves causation.** Correction: confounding, reverse causation, or coincidence can produce association without causation.

## Teaching and assessment notes
Use examples with outliers and biased samples. Require learners to state the population, sampling process, assumptions, and uncertainty.

## Seed assets
`src/lib/teaching/assets/csCoverageExtensionSeedAssets.ts` — two explanations and three gradeable probes.
