/**
 * Tenth math.abst asset batch — field and pid.
 *
 * Continues serving-asset coverage for math.abst (18/36 -> 20/36).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.abst.field.md and
 * math.abst.pid.md.
 *
 *   FIELD   field — the "nonzero" qualifier is never optional; being an
 *           integral domain is necessary but not sufficient for being a
 *           field; characteristic is an additive-order statement, never
 *           a cardinality statement.
 *   PID     pid — every Euclidean Domain is a PID, proven directly via
 *           minimal-norm, never independently re-verified; PID-specific
 *           structure (prime implies maximal) is not automatic in every
 *           integral domain; PID is strictly broader than Euclidean
 *           Domain, the converse fails.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const FIELD = 'math.abst.field'
const PID = 'math.abst.pid'

export const MATHEMATICS_ABSTRACT_ALGEBRA_FIELD_PID_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FIELD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A FIELD is a commutative ring where EVERY NONZERO element has a multiplicative inverse. '
      + 'The "nonzero" qualifier is essential and NEVER optional: 0 can NEVER have an inverse in '
      + 'any ring, since 0·a=0≠1 for any a — this is a THEOREM from the ring axioms, not an '
      + 'exception carved into the definition.\n\n'
      + 'Being an INTEGRAL DOMAIN is NECESSARY but NOT SUFFICIENT for being a field: Z, Z[x], '
      + 'R[x] are integral domains (no zero divisors) but NOT fields — 2 has no multiplicative '
      + 'inverse in Z. The additional requirement is invertibility of every nonzero element, not '
      + 'merely the absence of zero divisors.\n\n'
      + 'The CHARACTERISTIC of a field (the smallest n>0 with 1+1+...+1=0, or 0 if none exists) '
      + 'is a purely ADDITIVE-ORDER statement, entirely INDEPENDENT of cardinality: GF(4) has '
      + 'characteristic 2 but 4 elements — characteristic p does NOT mean "the field has p '
      + 'elements."',
    targetedMisconceptions: [`${FIELD}:MC-1`, `${FIELD}:MC-2`, `${FIELD}:MC-3`],
    source: eb(FIELD, 'Core Understanding — the nonzero qualifier is never optional, integral domain is necessary but not sufficient, characteristic is additive order not cardinality'),
  },
  {
    conceptId: PID, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'EVERY EUCLIDEAN DOMAIN IS A PID — proven via the MINIMAL-NORM-ELEMENT argument, never an '
      + 'independently-verified new fact: given any nonzero ideal I, take d∈I with the SMALLEST '
      + 'norm; for any a∈I, division gives a=qd+r with r=a-qd∈I, but d\'s minimality forces r=0, '
      + 'so I=(d) is principal. PID status FOLLOWS AUTOMATICALLY from the already-mastered '
      + 'Euclidean property.\n\n'
      + 'PID structure is genuinely PID-SPECIFIC, not automatic in every integral domain: in a '
      + 'PID, every nonzero prime ideal is automatically MAXIMAL, and every irreducible element is '
      + 'automatically PRIME. A general integral domain can have irreducibles that FAIL to be '
      + 'prime.\n\n'
      + 'THE CONVERSE FAILS — PID does NOT imply Euclidean Domain: '
      + 'Z[(1+√-19)/2] IS a PID yet admits NO possible Euclidean norm function whatsoever, '
      + 'confirming PID is a strictly BROADER class than Euclidean Domain, never merely a '
      + 'differently-named equivalent class.',
    targetedMisconceptions: [`${PID}:MC-1`, `${PID}:MC-2`, `${PID}:MC-3`],
    source: eb(PID, 'Core Understanding — PID status follows automatically from the Euclidean property, PID structure is PID-specific, the converse fails'),
  },
]

export const MATHEMATICS_ABSTRACT_ALGEBRA_FIELD_PID_PROBES: SeedProbe[] = [
  // --- math.abst.field --------------------------------------------------------
  {
    conceptId: FIELD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does 0 have a multiplicative inverse in a field?',
    choices: [
      { text: 'No — 0 can never have an inverse in any ring, since 0·a=0≠1 for any a; the "nonzero" qualifier in the field definition is essential, never optional', isCorrect: true },
      { text: 'Yes — the field axiom states every element, including 0, has an inverse', isCorrect: false, misconceptionId: `${FIELD}:MC-1` },
      { text: 'Yes, in fields of prime characteristic specifically', isCorrect: false, misconceptionId: `${FIELD}:MC-1` },
    ],
    targetedMisconceptions: [`${FIELD}:MC-1`],
    source: eb(FIELD, 'Assessment gate — the nonzero qualifier is essential, 0 can never have an inverse in any ring'),
  },
  {
    conceptId: FIELD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is every integral domain automatically a field?',
    choices: [
      { text: 'No — Z is an integral domain (no zero divisors) but not a field, since 2 has no multiplicative inverse in Z; being an integral domain is necessary but not sufficient', isCorrect: true },
      { text: 'Yes — having no zero divisors is already the complete field requirement', isCorrect: false, misconceptionId: `${FIELD}:MC-2` },
      { text: 'Yes, since commutativity and the absence of zero divisors together guarantee invertibility', isCorrect: false, misconceptionId: `${FIELD}:MC-2` },
    ],
    targetedMisconceptions: [`${FIELD}:MC-2`],
    source: eb(FIELD, 'Misconception register — integral domain is necessary but not sufficient for being a field'),
  },
  {
    conceptId: FIELD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does "characteristic p" mean the field has exactly p elements?',
    choices: [
      { text: 'No — characteristic is a purely additive-order statement (smallest n with n·1=0), entirely independent of cardinality; GF(4) has characteristic 2 but 4 elements', isCorrect: true },
      { text: 'Yes — characteristic p always means the field has exactly p elements', isCorrect: false, misconceptionId: `${FIELD}:MC-3` },
      { text: 'Yes, since the same number p determines both properties simultaneously', isCorrect: false, misconceptionId: `${FIELD}:MC-3` },
    ],
    targetedMisconceptions: [`${FIELD}:MC-3`],
    source: eb(FIELD, 'Transfer probe — characteristic is an additive-order statement, never a cardinality statement'),
  },

  // --- math.abst.pid -------------------------------------------------------------
  {
    conceptId: PID, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Once you know R is a Euclidean Domain, must PID status be checked as a SEPARATE fact, or does it follow automatically?',
    choices: [
      { text: 'It follows automatically, proven via the minimal-norm-element argument: the minimal-norm element of any ideal generates the whole ideal, with no separate verification needed', isCorrect: true },
      { text: 'PID status must always be independently re-verified even after the Euclidean property is established', isCorrect: false, misconceptionId: `${PID}:MC-1` },
      { text: 'PID status is unrelated to the Euclidean property and requires a completely separate proof method', isCorrect: false, misconceptionId: `${PID}:MC-1` },
    ],
    targetedMisconceptions: [`${PID}:MC-1`],
    source: eb(PID, 'Assessment gate — PID status follows automatically from the Euclidean property via the minimal-norm argument'),
  },
  {
    conceptId: PID, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does "every prime ideal is maximal" hold in ANY integral domain, or only in a PID specifically?',
    choices: [
      { text: 'Only in a PID specifically — a general integral domain can have prime ideals that are not maximal; this structural guarantee is PID-specific, never automatic elsewhere', isCorrect: true },
      { text: 'It holds in every integral domain, regardless of whether it is a PID', isCorrect: false, misconceptionId: `${PID}:MC-2` },
      { text: 'It holds in every commutative ring universally', isCorrect: false, misconceptionId: `${PID}:MC-2` },
    ],
    targetedMisconceptions: [`${PID}:MC-2`],
    source: eb(PID, 'Misconception register — PID structural guarantees are PID-specific, not automatic in every integral domain'),
  },
  {
    conceptId: PID, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If R is a PID, must R also be a Euclidean Domain?',
    choices: [
      { text: 'No — Z[(1+√-19)/2] is a PID yet admits no possible Euclidean norm function; the implication runs only one way, from Euclidean Domain to PID', isCorrect: true },
      { text: 'Yes — PID and Euclidean Domain are equivalent classes of rings', isCorrect: false, misconceptionId: `${PID}:MC-3` },
      { text: 'Yes, since every principal ideal automatically admits some norm function', isCorrect: false, misconceptionId: `${PID}:MC-3` },
    ],
    targetedMisconceptions: [`${PID}:MC-3`],
    source: eb(PID, 'Transfer probe — PID is strictly broader than Euclidean Domain, the converse fails'),
  },
]
