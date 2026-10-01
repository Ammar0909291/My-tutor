/**
 * Batch: completeness (math.fnal) — 2/18 -> 3/18.
 *
 * Fresh Phase 0 frontier recompute after normed-space and convolution
 * were authored: only completeness (requires normed-space +
 * math.real.cauchy-sequence, both already authored) is ready — the
 * domain narrows to a single-concept-at-a-time chain from here
 * (completeness -> banach-space -> most of the rest of math.fnal).
 * Transcribed from its frozen Educational Brain entry at educational-
 * brain/concepts/mathematics/math.fnal.completeness.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching this domain's established
 * baseline (set on the normed-space/convolution batch).
 *
 * This concept's KG cross-link (math.real.completeness-metric) is
 * authored per its own EB entry's Curriculum Feedback (a reverse-
 * direction discrepancy noted there, not itself the chosen probe mode —
 * the EB entry retains its own independence-mode transfer probe, so this
 * concept's detection probes stay self-contained accordingly).
 *
 * This EB entry registers exactly 3 formal misconceptions (full contract,
 * no retargeting needed).
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const COMPLETENESS = 'math.fnal.completeness'

export const MATHEMATICS_FNAL_COMPLETENESS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: COMPLETENESS, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      '"CAUCHY" AND "CONVERGENT/COMPLETE" ARE NEVER SYNONYMS — COMPLETENESS IS A SEPARATE, '
      + 'SPACE-DEPENDENT PROPERTY: the decimal-truncation sequence 1.4, 1.41, 1.414, ... is Cauchy '
      + 'in BOTH the rationals and the reals (identical terms, identical epsilon-N behavior) — yet '
      + 'it converges to √2 in the reals but has NO limit within the rationals, since √2 is '
      + 'irrational. Believing a Cauchy sequence is automatically convergent, in ANY space it '
      + 'happens to be viewed in, is WRONG — "Cauchy" is a fact purely about the terms; "convergent" '
      + 'additionally requires the space to actually contain the limit point.\n\n'
      + 'COMPLETENESS CAN DEPEND ON THE SPECIFIC NORM CHOSEN — NEVER ASSUMED INHERITED UNDER EVERY '
      + 'NORM ON THE SAME SPACE: the space of continuous functions on [0,1] with the L¹ norm (the '
      + 'integral of the absolute value) is NOT complete — a sequence of continuous "ramp" '
      + 'functions is Cauchy in that norm but converges (in L¹) toward a discontinuous step '
      + 'function, which lies OUTSIDE the space of continuous functions. Assuming that because this '
      + 'space is complete under one norm (e.g. the sup-norm) it must be complete under EVERY norm '
      + 'placed on it — including L¹ — is WRONG: completeness is a property of the PAIR (space, '
      + 'specific norm), exactly echoing the lesson that a normed space is never the vector space '
      + 'alone.\n\n'
      + 'AN INCOMPLETE SPACE STILL HAS SOME CONVERGENT CAUCHY SEQUENCES — NEVER ASSUME NONE '
      + 'CONVERGE: in the rationals (incomplete), the constant sequence 1, 1, 1, 1, ... IS Cauchy '
      + 'and DOES converge — to 1, since its limit doesn\'t fall in one of the rationals\' "holes." '
      + 'Believing that in an incomplete space NO Cauchy sequence converges is WRONG — only those '
      + 'specific Cauchy sequences whose natural limits fall exactly in the space\'s missing points '
      + '(like √2 for the rationals) fail to converge; the rest converge perfectly normally.',
    targetedMisconceptions: [`${COMPLETENESS}:MC-1`, `${COMPLETENESS}:MC-2`, `${COMPLETENESS}:MC-3`],
    source: eb(COMPLETENESS, 'Core Understanding — Cauchy and convergent/complete never being synonyms since completeness is a separate space-dependent property, completeness depending on the specific norm chosen never assumed inherited under every norm, and an incomplete space still having some convergent Cauchy sequences never assuming none converge'),
  },
]

export const MATHEMATICS_FNAL_COMPLETENESS_PROBES: SeedProbe[] = [
  {
    conceptId: COMPLETENESS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If a sequence is Cauchy, has it thereby already been shown to converge, in any space you might view it in?',
    choices: [
      { text: "No — the decimal-truncation sequence 1.4, 1.41, 1.414, ... is Cauchy in BOTH the rationals and the reals (identical terms), yet it converges to √2 only in the reals; \"Cauchy\" is a fact about the terms, while \"convergent\" additionally requires the space to actually contain the limit", isCorrect: true },
      { text: "Yes, being Cauchy already guarantees convergence, regardless of which space the sequence is viewed in", isCorrect: false, misconceptionId: `${COMPLETENESS}:MC-1` },
      { text: "Since the Cauchy criterion for the real numbers is often stated as \"Cauchy if and only if convergent,\" that equivalence should hold as a universal definition for any space", isCorrect: false, misconceptionId: `${COMPLETENESS}:MC-1` },
    ],
    targetedMisconceptions: [`${COMPLETENESS}:MC-1`],
    source: eb(COMPLETENESS, 'Discovery Question 1 as a detection probe (verbatim) — whether being Cauchy already shows convergence in any space, an answer of "yes" confirming CAUCHY-AND-COMPLETE-CONFLATED'),
  },
  {
    conceptId: COMPLETENESS, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If a vector space is complete under one norm, must it be complete under every other norm placed on it?',
    choices: [
      { text: "No — the space of continuous functions on [0,1] is complete under the sup-norm but NOT complete under the L¹ norm (a Cauchy sequence of ramp functions converges in L¹ to a discontinuous function outside the space); completeness is a property of the PAIR (space, specific norm)", isCorrect: true },
      { text: "Yes, if a vector space is complete under one norm, it must be complete under every other possible norm placed on it", isCorrect: false, misconceptionId: `${COMPLETENESS}:MC-2` },
      { text: "Since completeness is often introduced as a property of the space itself, it should transfer automatically to any other norm placed on that same space", isCorrect: false, misconceptionId: `${COMPLETENESS}:MC-2` },
    ],
    targetedMisconceptions: [`${COMPLETENESS}:MC-2`],
    source: eb(COMPLETENESS, 'Discovery Question 2 as a detection probe (verbatim) — whether completeness under one norm implies completeness under every norm, an answer of "yes" confirming COMPLETENESS-ASSUMED-INHERITED-BY-ANY-NORM'),
  },
  {
    conceptId: COMPLETENESS, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'In an incomplete space, does NO Cauchy sequence converge, or only some?',
    choices: [
      { text: "Only some fail to converge — in the rationals (incomplete), the constant sequence 1,1,1,... IS Cauchy and DOES converge to 1, since its limit doesn't fall in one of the rationals' \"holes\"; only sequences whose natural limits fall exactly in the missing points (like √2) fail", isCorrect: true },
      { text: "In an incomplete space, NO Cauchy sequence ever converges, since the space is missing its limit points entirely", isCorrect: false, misconceptionId: `${COMPLETENESS}:MC-3` },
      { text: "Since a dramatic counterexample like √2 shows a Cauchy sequence failing to converge in the rationals, that should generalize to nothing converging in any incomplete space", isCorrect: false, misconceptionId: `${COMPLETENESS}:MC-3` },
    ],
    targetedMisconceptions: [`${COMPLETENESS}:MC-3`],
    source: eb(COMPLETENESS, 'Discovery Question 3 as a detection probe (verbatim) — whether no Cauchy sequence converges in an incomplete space or only some, an answer of "none converge" confirming INCOMPLETE-SPACE-ASSUMED-TO-HAVE-NO-CONVERGENT-SEQUENCES'),
  },
]
