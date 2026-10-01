/**
 * Batch: sequence (math.seq) — opening a new domain.
 *
 * math.calc is fully blocked (0 ready) on its remaining 7 concepts, all
 * of which trace back through the unstarted math.seq domain (sequence →
 * series → partial-sums → series-convergence → ratio-test →
 * power-series → taylor-series → maclaurin-series/taylor-remainder, plus
 * fourier-series-intro needing math.seq.series directly). Following this
 * campaign's own established cross-domain-excursion precedent (opening
 * math.trig, then math.func, specifically to unblock math.calc), this
 * batch opens math.seq at its KG root. math.seq.sequence becomes ready
 * off already-authored math.func.function-concept and math.found.
 * natural-numbers, and is the ONLY currently-ready math.seq concept —
 * authoring it unblocks math.seq.arithmetic-sequence, math.seq.
 * geometric-sequence, and math.seq.recursive-sequences (the last also
 * needing math.found.proof-by-induction, already authored) simultaneously
 * next, plus math.seq.series and (via its other prerequisite math.calc.
 * limits, already authored) math.calc.sequence-limits.
 * Transcribed from the frozen Educational Brain entry at
 * educational-brain/concepts/mathematics/math.seq.sequence.md.
 *
 *   SEQUENCE  sequence — a sequence is a FUNCTION from N, where ORDER is
 *             essential and REPETITION is permitted, never a set where
 *             order is irrelevant and repetition collapses away; a
 *             sequence needs only that EVERY TERM be well-defined, never
 *             a formula or pattern — a pattern-free sequence (like the
 *             digits of π) is still perfectly valid; mathematical
 *             sequences conventionally start at index n=1, never n=0
 *             like programming arrays, unless explicitly stated
 *             otherwise.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const SEQUENCE = 'math.seq.sequence'

export const MATHEMATICS_SEQ_SEQUENCE_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SEQUENCE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A sequence is a FUNCTION from N (or a finite initial segment) to a set, with values listed in '
      + 'order: a₁,a₂,a₃,.... Unlike a SET, a sequence treats ORDER as essential and REPETITION as '
      + 'permitted: (2,4,6) and (4,2,6) are DIFFERENT sequences despite containing the same values, and '
      + '(2,2,2,...) is a perfectly valid sequence, while the corresponding set {2} collapses the '
      + 'repetition entirely. A sequence is not merely "a set with numbers in a row" — it is a '
      + 'genuinely different mathematical object governed by a function\'s equality rule: two sequences '
      + 'are equal only if they agree at EVERY index.\n\n'
      + 'A sequence may be defined EXPLICITLY (aₙ=f(n), each term computed directly from its index) or '
      + 'RECURSIVELY (a base case plus a rule relating each term to previous ones). Both are equally '
      + 'valid; a sequence needs NO formula or pattern at all to be valid — the sequence of decimal '
      + 'digits of π (3,1,4,1,5,9,2,...) is a perfectly well-defined function from N to {0,1,...,9} '
      + 'despite having no known simple closed-form formula or recurrence. "Being a valid mathematical '
      + 'object" and "having a computable formula" are entirely independent properties.\n\n'
      + 'Mathematical sequences conventionally start at index n=1 (the first term is a₁), never n=0 the '
      + 'way programming arrays are indexed, unless the sequence\'s domain is explicitly stated '
      + 'otherwise.',
    targetedMisconceptions: [`${SEQUENCE}:MC-1`, `${SEQUENCE}:MC-2`, `${SEQUENCE}:MC-3`],
    source: eb(SEQUENCE, 'Core Understanding — a sequence is a function where order is essential and repetition is permitted unlike a set, a sequence needs only that every term be well-defined never a formula, and mathematical sequences conventionally start at index n=1 never n=0'),
  },
]

export const MATHEMATICS_SEQ_SEQUENCE_PROBES: SeedProbe[] = [
  {
    conceptId: SEQUENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Are the sequences (1,2,3) and (3,2,1) the same or different? What about the SETS {1,2,3} and {3,2,1}?',
    choices: [
      { text: 'The sequences are DIFFERENT (as functions, the first term differs: f(1)=1 versus g(1)=3), while the SETS are the SAME (order is irrelevant to set membership) — a sequence\'s equality requires agreement at EVERY index, genuinely different from a set\'s equality', isCorrect: true },
      { text: 'Both the sequences and the sets are the same, since they all contain the identical three numbers', isCorrect: false, misconceptionId: `${SEQUENCE}:MC-1` },
      { text: 'Both the sequences and the sets are different, since reordering always changes any mathematical collection', isCorrect: false, misconceptionId: `${SEQUENCE}:MC-1` },
    ],
    targetedMisconceptions: [`${SEQUENCE}:MC-1`],
    source: eb(SEQUENCE, 'Discovery Question 1 — are the sequences (1,2,3) and (3,2,1) the same or different; what about the sets {1,2,3} and {3,2,1}'),
  },
  {
    conceptId: SEQUENCE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is the sequence of decimal digits of π (3,1,4,1,5,9,2,...) a valid mathematical sequence, even though there\'s no known formula for its nth digit?',
    choices: [
      { text: 'Yes — it is a perfectly well-defined function from N to {0,1,...,9} (the nth decimal digit of π); a sequence needs only that EVERY TERM be well-defined, never a formula or pattern, so formula-existence and validity are genuinely independent properties', isCorrect: true },
      { text: 'No — a sequence is only valid if there is a formula or rule generating it, so this is not really a sequence, just a list of numbers', isCorrect: false, misconceptionId: `${SEQUENCE}:MC-2` },
      { text: 'No, since a valid sequence must be either arithmetic or geometric, and the digits of π fit neither pattern', isCorrect: false, misconceptionId: `${SEQUENCE}:MC-2` },
    ],
    targetedMisconceptions: [`${SEQUENCE}:MC-2`],
    source: eb(SEQUENCE, 'Discovery Question 2 — is the sequence of decimal digits of pi a valid mathematical sequence, even though there\'s no known formula for its nth digit'),
  },
  {
    conceptId: SEQUENCE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For the sequence aₙ=2n, is a₃=6 the third term, or the fourth term?',
    choices: [
      { text: 'The third term — mathematical sequences conventionally start at index n=1 (so a₁ is the FIRST term), never n=0 the way programming arrays are indexed, unless the domain is explicitly stated otherwise', isCorrect: true },
      { text: 'The fourth term — since indexing conventionally starts at n=0, a₃ is actually the fourth position in the sequence', isCorrect: false, misconceptionId: `${SEQUENCE}:MC-3` },
      { text: 'It depends entirely on the specific formula used and cannot be determined without additional context about the function', isCorrect: false, misconceptionId: `${SEQUENCE}:MC-3` },
    ],
    targetedMisconceptions: [`${SEQUENCE}:MC-3`],
    source: eb(SEQUENCE, 'Discovery Question 3 — if a sequence\'s first term is a_1, what would a_0 mean; is it automatically the term before a_1, or does it depend on how the sequence\'s domain was actually defined'),
  },
]
