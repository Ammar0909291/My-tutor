# Combinatorics and Counting Principles — `cs.math.combinatorics-counting`

## Identity
- Prerequisites: `cs.math.proofs-and-induction`, `cs.math.sets-relations-functions`
- Unlocks: probability
- Difficulty / Bloom: proficient / apply

## Learning objective
Choose and justify a counting method while distinguishing alternatives, successive choices, and ordered arrangements.

## Core understanding
The sum rule counts disjoint alternatives; the product rule counts stages of successive choices. Permutations count ordered arrangements; combinations count selections where order does not matter. Model outcomes first and check overlap, order, and repetition.

## Misconceptions
- **M1 — Add the options at every successive choice stage.** Correction: successive stages usually use the product rule; addition counts disjoint alternatives.
- **M2 — Permutations and combinations both treat order as irrelevant.** Correction: permutations distinguish order; combinations do not.

## Teaching and assessment notes
List small cases before using formulas. Require the learner to explain the outcome model and whether order matters.

## Seed assets
`src/lib/teaching/assets/csCoverageExtensionSeedAssets.ts` — two explanations and three gradeable probes.
