/**
 * Batch: probability-axioms (math.prob) — single-concept batch.
 *
 * Only one math.prob concept was topologically ready this frontier pass:
 * math.prob.probability-axioms (requires probability-measure, authored
 * Batch 101). It is a high-value pick regardless — its own KG unlocks
 * field lists conditional-probability and independence (both already
 * authored elsewhere in the corpus), and the broader frontier recompute
 * shows it also opens random-variable, math.stats.sampling, and
 * math.graph.random-graph once their own remaining prerequisites are met.
 * Following this campaign's established precedent (Batch 86 authored
 * math.seq.sequence alone when it was the sole ready concept), this batch
 * authors probability-axioms by itself.
 * Transcribed from the frozen Educational Brain entry at
 * educational-brain/concepts/mathematics/math.prob.probability-axioms.md.
 *
 *   PROBABILITY-AXIOMS  probability-axioms — only THREE statements are
 *             Kolmogorov axioms (A1: P(A)≥0; A2: P(Ω)=1; A3: disjoint
 *             events add); every other probability rule (P(∅)=0, the
 *             complement rule, general addition) is a derived THEOREM,
 *             never itself an axiom however "obvious" it feels; a
 *             theorem's proof must CITE the specific axiom at each step —
 *             a conclusion without a named A1/A2/A3 citation is an
 *             assertion, not a proof; MONOTONICITY (A⊆B⇒P(A)≤P(B)) follows
 *             from A1 and A3 TOGETHER, with A1's non-negativity
 *             specifically forcing the ≤ direction.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const PROBABILITY_AXIOMS = 'math.prob.probability-axioms'

export const MATHEMATICS_PROB_PROBABILITY_AXIOMS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: PROBABILITY_AXIOMS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'ONLY THREE STATEMENTS ARE AXIOMS; EVERYTHING ELSE IS DERIVED: math.prob.probability-'
      + "measure's own four working rules all follow from exactly three Kolmogorov axioms: A1 "
      + '(P(A)≥0), A2 (P(Ω)=1), A3 (disjoint events add: A∩B=∅⇒P(A∪B)=P(A)+P(B)). P(∅)=0, '
      + 'P(Aᶜ)=1−P(A), and the general addition rule are all THEOREMS — proven from the axioms, '
      + 'never themselves additional axioms, however "obvious" or "definitional" they may feel.\n\n'
      + "A THEOREM'S PROOF MUST CITE THE SPECIFIC AXIOM AT EACH STEP: deriving P(Aᶜ)=1−P(A): "
      + 'since A∩Aᶜ=∅ (disjoint) and A∪Aᶜ=Ω, by A3, P(A)+P(Aᶜ)=P(A∪Aᶜ)=P(Ω); by A2, P(Ω)=1; so '
      + 'P(Aᶜ)=1−P(A). Every equality that isn\'t a plain definition must be justified by naming '
      + 'A1, A2, or A3 explicitly — stating "complements add to 1" without these citations is an '
      + 'assertion, not a proof, even when the conclusion is correct.\n\n'
      + 'MONOTONICITY FOLLOWS FROM A1 AND A3 TOGETHER: if A⊆B, decompose B=A∪(B\\A) (a disjoint '
      + 'union). By A3, P(B)=P(A)+P(B\\A). By A1, P(B\\A)≥0. Therefore P(B)≥P(A), i.e. P(A)≤P(B). '
      + 'Non-negativity (A1) is SPECIFICALLY what produces the ≤ direction — without it, the '
      + "inequality's direction would not be forced.",
    targetedMisconceptions: [`${PROBABILITY_AXIOMS}:MC-1`, `${PROBABILITY_AXIOMS}:MC-2`, `${PROBABILITY_AXIOMS}:MC-3`],
    source: eb(PROBABILITY_AXIOMS, 'Core Understanding — only three Kolmogorov axioms exist with every other probability rule being a derived theorem, a theorem\'s proof requiring a cited axiom at each step, and monotonicity following from A1 and A3 together with A1 forcing the direction'),
  },
]

export const MATHEMATICS_PROB_PROBABILITY_AXIOMS_PROBES: SeedProbe[] = [
  {
    conceptId: PROBABILITY_AXIOMS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is P(∅)=0 one of the three Kolmogorov axioms, or is it derived from them?',
    choices: [
      { text: "It is derived — the three axioms are exactly A1 (P(A)≥0), A2 (P(Ω)=1), and A3 (disjoint additivity); P(∅)=0 is a THEOREM proven from these three, never itself a fourth axiom, however definitional it feels", isCorrect: true },
      { text: 'P(∅)=0 is itself one of the axioms, sometimes referred to as a fourth foundational assumption of probability theory', isCorrect: false, misconceptionId: `${PROBABILITY_AXIOMS}:MC-1` },
      { text: 'It does not matter whether P(∅)=0 is an axiom or a theorem, since both categories carry the identical epistemic status in probability theory', isCorrect: false, misconceptionId: `${PROBABILITY_AXIOMS}:MC-1` },
    ],
    targetedMisconceptions: [`${PROBABILITY_AXIOMS}:MC-1`],
    source: eb(PROBABILITY_AXIOMS, 'Demonstration 1 — sorting five statements into exactly three axioms and two theorems, directly breaking axiom-theorem-confusion'),
  },
  {
    conceptId: PROBABILITY_AXIOMS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Stating "P(Aᶜ)=1−P(A) because complements add to 1" — is this a complete proof, or does it skip a required step?',
    choices: [
      { text: 'It skips a required step — a proof must cite the SPECIFIC axiom at each step: A∩Aᶜ=∅ and A∪Aᶜ=Ω, so by A3, P(A)+P(Aᶜ)=P(Ω), and by A2, P(Ω)=1; a conclusion without these citations is an assertion, not a proof, even when correct', isCorrect: true },
      { text: "Yes — stating the conclusion in plain language is a complete proof, since the result is well-known and doesn't require explicit justification", isCorrect: false, misconceptionId: `${PROBABILITY_AXIOMS}:MC-2` },
      { text: 'Yes, because the truth of a probability statement does not depend on whether specific axioms are cited during its derivation', isCorrect: false, misconceptionId: `${PROBABILITY_AXIOMS}:MC-2` },
    ],
    targetedMisconceptions: [`${PROBABILITY_AXIOMS}:MC-2`],
    source: eb(PROBABILITY_AXIOMS, 'Demonstration 2 — deriving P(empty set)=0 with each line citing its specific axiom (A3 then A2), directly breaking derivation-gap'),
  },
  {
    conceptId: PROBABILITY_AXIOMS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If A⊆B, must P(A)≤P(B), or could the inequality go either way?',
    choices: [
      { text: "P(A)≤P(B) always — decomposing B=A∪(B\\A) (disjoint) and applying A3 gives P(B)=P(A)+P(B\\A); A1 (P(B\\A)≥0) is what specifically forces P(B)≥P(A), so the direction can never flip", isCorrect: true },
      { text: 'The inequality could go either way depending on the specific probability distribution involved, since subset relationships don\'t constrain probability values', isCorrect: false, misconceptionId: `${PROBABILITY_AXIOMS}:MC-3` },
      { text: "It must be P(A)≥P(B) instead, since A being a subset of B means A is somehow the \"larger\" or more specific event in probability terms", isCorrect: false, misconceptionId: `${PROBABILITY_AXIOMS}:MC-3` },
    ],
    targetedMisconceptions: [`${PROBABILITY_AXIOMS}:MC-3`],
    source: eb(PROBABILITY_AXIOMS, 'Demonstration 3 — the marble-bag monotonicity proof via B=A union (B minus A), A3, and A1, directly breaking monotonicity-unknown'),
  },
]
