# Proof Techniques and Mathematical Induction — `cs.math.proofs-and-induction`

## Identity
- Prerequisite: `cs.math.discrete-mathematics`
- Unlocks: combinatorics and counting
- Difficulty / Bloom: developing / apply

## Learning objective
Construct direct, contrapositive, contradiction, and counterexample arguments; apply induction to simple claims.

## Core understanding
A proof is a justified chain from assumptions to a conclusion. Induction establishes a base case, then proves that an arbitrary eligible n implies n+1. The induction hypothesis is a temporary premise inside that step.

## Misconceptions
- **M1 — Several examples prove a universal statement.** Correction: examples cannot cover all inputs; a general proof or counterexample is needed.
- **M2 — Induction is finished after checking the base case.** Correction: the inductive step must derive the next case from the arbitrary-case hypothesis.

## Teaching and assessment notes
Require learners to label the base case, hypothesis, and inductive step separately. Use counterexamples to test overgeneralisation.

## Seed assets
`src/lib/teaching/assets/csCoverageExtensionSeedAssets.ts` — two explanations and three gradeable probes.
