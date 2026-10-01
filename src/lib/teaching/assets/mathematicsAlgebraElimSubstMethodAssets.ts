/**
 * Twentieth math.alg asset batch — elimination-method and substitution-method.
 *
 * Continues serving-asset coverage for math.alg (52/59 -> 54/59).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.alg.elimination-method.md
 * and math.alg.substitution-method.md.
 *
 *   ELIMMETHOD   elimination-method — elimination is NEVER blocked by
 *                mismatched coefficients (any pair has a common
 *                multiple); scaling an equation means EVERY term on
 *                both sides, never the target term alone; scaling and
 *                adding-a-multiple are the SAME row operations
 *                row-reduction later formalizes, never an unrelated
 *                technique.
 *   SUBSTMETHOD  substitution-method — a FALSE leftover statement means
 *                no solution, a TRUE leftover statement means infinitely
 *                many solutions — the two NEVER mean the same thing
 *                despite both making the variable vanish; the final
 *                answer is always a PAIR, never just the first
 *                variable's value with back-substitution skipped.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const ELIMMETHOD = 'math.alg.elimination-method'
const SUBSTMETHOD = 'math.alg.substitution-method'

export const MATHEMATICS_ALGEBRA_ELIM_SUBST_METHOD_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: ELIMMETHOD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Elimination is NEVER actually blocked by mismatched coefficients — any pair of nonzero '
      + 'numbers has a common multiple (at minimum, their LCM), so elimination always remains '
      + 'available. For 3x+4y=11 and 5x+6y=19, the coefficients 4 and 6 aren\'t simple multiples, but '
      + 'both can be scaled to reach 12 before eliminating y.\n\n'
      + 'Scaling an equation means multiplying EVERY term — each variable\'s coefficient AND the '
      + 'constant — never just the term being eliminated. Scaling only part of an equation produces '
      + 'a structurally different, invalid equation whose solution set has nothing to do with the '
      + 'original: multiplying only the y-term of 3x+4y=11 by 3 gives the invalid 3x+12y=11, never '
      + 'the correct 9x+12y=33.\n\n'
      + 'Multiplying an equation by a constant and adding a multiple of one equation to another are '
      + 'not two arbitrary algebraic tricks — they are EXACTLY the two row operations that '
      + 'matrix-based row-reduction later applies to an augmented matrix, using compact notation. '
      + 'This is the SAME arithmetic, never a separate or soon-to-be-replaced technique.',
    targetedMisconceptions: [`${ELIMMETHOD}:MC-1`, `${ELIMMETHOD}:MC-2`, `${ELIMMETHOD}:MC-3`],
    source: eb(ELIMMETHOD, 'Core Understanding — elimination always has a path via a common multiple, scaling must touch every term, and the two legal moves are exactly the row operations of matrix-based elimination'),
  },
  {
    conceptId: SUBSTMETHOD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Substitution is a complete four-step procedure: isolate one variable, substitute into the '
      + 'OTHER equation, solve, then BACK-SUBSTITUTE to recover the second variable. A solution to a '
      + 'two-variable system is always a PAIR — a procedure that stops after finding only the first '
      + 'value has NOT finished, never treat back-substitution as optional cleanup.\n\n'
      + 'When the variable vanishes entirely during substitution, what remains must be read '
      + 'carefully: a FALSE numerical statement (2=−4) means the system is INCONSISTENT — NO '
      + 'solution exists, the two equations describe parallel lines that never meet. A TRUE '
      + 'numerical statement (6=6) means the system is DEPENDENT — INFINITELY MANY solutions exist, '
      + 'since the two equations describe the identical line.\n\n'
      + 'These two outcomes look structurally similar (the variable vanishes in both) but mean '
      + 'OPPOSITE things — a false statement is NEVER confused with a true one, since one signals '
      + 'zero solutions and the other signals infinitely many. Neither outcome should be treated as '
      + 'an error to fix; both are the algebra correctly reporting a genuine, complete answer.',
    targetedMisconceptions: [`${SUBSTMETHOD}:MC-1`, `${SUBSTMETHOD}:MC-2`, `${SUBSTMETHOD}:MC-3`],
    source: eb(SUBSTMETHOD, 'Core Understanding — a false leftover statement means no solution while a true one means infinitely many, the two are never interchangeable, and the final answer is always a complete pair via back-substitution'),
  },
]

export const MATHEMATICS_ALGEBRA_ELIM_SUBST_METHOD_PROBES: SeedProbe[] = [
  // --- math.alg.elimination-method ------------------------------------------
  {
    conceptId: ELIMMETHOD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For 3x+4y=11 and 5x+6y=19, the y-coefficients (4 and 6) aren\'t simple multiples of each other. Does this mean elimination cannot be used?',
    choices: [
      { text: 'No — any pair of nonzero coefficients has a common multiple (here, 12); scale each equation to reach it, then eliminate as usual', isCorrect: true },
      { text: 'Yes — elimination only works when the target variable\'s coefficients already match or are simple multiples', isCorrect: false, misconceptionId: `${ELIMMETHOD}:MC-1` },
      { text: 'Yes, since a common multiple cannot generally be found for arbitrary coefficient pairs', isCorrect: false, misconceptionId: `${ELIMMETHOD}:MC-1` },
    ],
    targetedMisconceptions: [`${ELIMMETHOD}:MC-1`],
    source: eb(ELIMMETHOD, 'Detection probe (Blueprint P41) — elimination is never blocked by mismatched coefficients; any pair of nonzero numbers has a common multiple, requiring only a preparatory scaling step'),
  },
  {
    conceptId: ELIMMETHOD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'To scale 3x+4y=11 by 3 in preparation for elimination, what should the result be?',
    choices: [
      { text: '9x+12y=33 — every term, including the constant, is multiplied by 3', isCorrect: true },
      { text: '3x+12y=11 — only the y-term (the one being eliminated) is multiplied by 3', isCorrect: false, misconceptionId: `${ELIMMETHOD}:MC-2` },
      { text: '9x+12y=11 — the variable terms are scaled but the constant is left unchanged', isCorrect: false, misconceptionId: `${ELIMMETHOD}:MC-2` },
    ],
    targetedMisconceptions: [`${ELIMMETHOD}:MC-2`],
    source: eb(ELIMMETHOD, 'Detection probe (Blueprint P41) — scaling an equation means multiplying every term, both sides, since a partial scaling produces a structurally different, invalid equation'),
  },
  {
    conceptId: ELIMMETHOD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Are elimination-by-scaling and the row operations used in matrix-based row-reduction genuinely the same technique, or two unrelated methods?',
    choices: [
      { text: 'The same technique — multiplying an equation by a constant and adding a multiple of one equation to another are exactly row-reduction\'s two row operations, expressed with full equations instead of matrix notation', isCorrect: true },
      { text: 'Two unrelated methods that happen to solve the same kinds of problems', isCorrect: false, misconceptionId: `${ELIMMETHOD}:MC-3` },
      { text: 'Two unrelated methods, since one uses equations and the other uses matrices', isCorrect: false, misconceptionId: `${ELIMMETHOD}:MC-3` },
    ],
    targetedMisconceptions: [`${ELIMMETHOD}:MC-3`],
    source: eb(ELIMMETHOD, 'Detection probe (Blueprint P41) — elimination\'s scale-and-add operations are exactly the row operations row-reduction later formalizes with matrix notation, the identical arithmetic in different notation'),
  },

  // --- math.alg.substitution-method -------------------------------------------
  {
    conceptId: SUBSTMETHOD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Substituting one equation into another, the variable vanishes and you\'re left with the statement 2=−4. What does this mean?',
    choices: [
      { text: 'The system is inconsistent — NO solution exists; the two equations describe parallel lines that never meet, and this false statement is itself the complete, correct answer', isCorrect: true },
      { text: 'An error was made somewhere, and the algebra should be redone', isCorrect: false, misconceptionId: `${SUBSTMETHOD}:MC-1` },
      { text: 'The equation 2=−4 should be solved for the remaining variable', isCorrect: false, misconceptionId: `${SUBSTMETHOD}:MC-1` },
    ],
    targetedMisconceptions: [`${SUBSTMETHOD}:MC-1`],
    source: eb(SUBSTMETHOD, 'Detection probe (Blueprint P41) — a false leftover statement with no variable remaining means the system has no solution, a complete and definitive conclusion, never an error to fix'),
  },
  {
    conceptId: SUBSTMETHOD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Substituting one equation into another, the variable vanishes and you\'re left with the statement 6=6. Does this mean the same thing as reaching 2=−4?',
    choices: [
      { text: 'No — 6=6 is TRUE, meaning the system is dependent with INFINITELY MANY solutions (the equations describe the identical line), the opposite conclusion from a false statement\'s no-solution result', isCorrect: true },
      { text: 'Yes — the variable vanished in both cases, so both mean no solution', isCorrect: false, misconceptionId: `${SUBSTMETHOD}:MC-2` },
      { text: 'Yes, since any bare numerical statement with no variable indicates the system cannot be solved', isCorrect: false, misconceptionId: `${SUBSTMETHOD}:MC-2` },
    ],
    targetedMisconceptions: [`${SUBSTMETHOD}:MC-2`],
    source: eb(SUBSTMETHOD, 'Detection probe (Blueprint P41) — a true leftover statement means infinitely many solutions, the opposite of a false statement\'s no-solution conclusion; the two must never be confused despite both vanishing the variable'),
  },
  {
    conceptId: SUBSTMETHOD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Solving a system by substitution, you find x=2 partway through. Is this the complete solution to the system?',
    choices: [
      { text: 'No — back-substitute x=2 into one of the original equations to find y as well; a two-variable system\'s solution is always a pair, never a single coordinate', isCorrect: true },
      { text: 'Yes — once one variable is found, the system is considered solved', isCorrect: false, misconceptionId: `${SUBSTMETHOD}:MC-3` },
      { text: 'Yes, since back-substitution is an optional final check rather than a required step', isCorrect: false, misconceptionId: `${SUBSTMETHOD}:MC-3` },
    ],
    targetedMisconceptions: [`${SUBSTMETHOD}:MC-3`],
    source: eb(SUBSTMETHOD, 'Detection probe (Blueprint P41) — a system\'s solution is always an ordered pair; back-substitution to find the second coordinate is a mandatory final step, never optional cleanup'),
  },
]
