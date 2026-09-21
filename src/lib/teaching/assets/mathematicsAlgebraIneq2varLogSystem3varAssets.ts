/**
 * Twenty-second (FINAL) math.alg asset batch — two-variable inequalities,
 * the natural logarithm, and three-variable systems.
 *
 * Closes out math.alg coverage: 56/59 -> 59/59 — DOMAIN CERTIFIED.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.alg.inequality-2var.md,
 * math.alg.natural-logarithm.md, and math.alg.system-3var.md.
 *
 *   INEQ2VAR     inequality-2var — the boundary line style (solid vs.
 *                dashed) must match the inequality symbol (≤/≥ solid,
 *                </> dashed), never chosen independently of it; a test
 *                point NOT on the boundary line must be checked (the
 *                origin whenever it isn't on the line) to decide which
 *                half-plane to shade, never assumed; shading the WRONG
 *                half-plane after a correct boundary is a distinct,
 *                separately-checkable error, never conflated with a
 *                correct boundary meaning a correct answer.
 *   NATLOG       natural-logarithm — ln is not a different kind of log
 *                requiring separate rules; it is simply log base e, and
 *                every log law (product, quotient, power) applies to ln
 *                unchanged; e is a specific number (~2.71828), not a
 *                variable or an algebraically special symbol that cancels
 *                or simplifies beyond what any other base would.
 *   SYSTEM3VAR   system-3var — a single elimination round removes one
 *                variable from ONE pair of equations, never solves the
 *                full system; the process must be repeated to reduce
 *                three equations to two, then two to one; an infinite
 *                solution set for three variables is generally a LINE
 *                (the intersection of two planes), never assumed to be a
 *                plane; a contradiction reached partway through is a
 *                valid, complete answer (no solution), never treated as
 *                a sign of an arithmetic mistake to redo.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const INEQ2VAR = 'math.alg.inequality-2var'
const NATLOG = 'math.alg.natural-logarithm'
const SYSTEM3VAR = 'math.alg.system-3var'

export const MATHEMATICS_ALGEBRA_INEQ2VAR_LOG_SYSTEM3VAR_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: INEQ2VAR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Graphing a two-variable inequality like y > 2x−1 starts by treating the boundary as an '
      + 'equation, y=2x−1, and drawing that line — but the LINE STYLE must match the inequality '
      + 'symbol exactly: ≤ or ≥ (the boundary IS included) draws a SOLID line, while < or > (the '
      + 'boundary is NOT included) draws a DASHED line. This is never a stylistic choice independent '
      + 'of the symbol — the symbol dictates the style.\n\n'
      + 'After the boundary is drawn, one of the two half-planes must be shaded. The correct half is '
      + 'found by testing a point that is NOT on the boundary line — the origin (0,0) is the '
      + 'standard choice whenever it doesn\'t lie on the line itself. Substituting the test point '
      + 'into the ORIGINAL inequality: if it makes the inequality true, shade the half containing '
      + 'that point; if false, shade the OTHER half. Skipping this test and guessing which side to '
      + 'shade is never reliable — the correct side depends on the specific inequality and cannot be '
      + 'read off from the boundary line alone.\n\n'
      + 'A correct boundary line does not guarantee a correct final graph — shading the wrong '
      + 'half-plane is a distinct error that a correct boundary does nothing to prevent. Both stages '
      + '(boundary style AND shaded side) must be verified separately; getting one right says '
      + 'nothing about the other.',
    targetedMisconceptions: [`${INEQ2VAR}:MC-1`, `${INEQ2VAR}:MC-2`, `${INEQ2VAR}:MC-3`],
    source: eb(INEQ2VAR, 'Core Understanding — the boundary line style must match the inequality symbol, a non-boundary test point decides which half-plane to shade, and a correct boundary never guarantees the shaded side is also correct'),
  },
  {
    conceptId: NATLOG, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'The natural logarithm, written ln(x), is not a separate or exotic kind of logarithm — it is '
      + 'simply log base e, i.e. ln(x) = log_e(x). Every logarithm law already learned — the product '
      + 'rule (log(ab)=log(a)+log(b)), the quotient rule (log(a/b)=log(a)−log(b)), and the power rule '
      + '(log(aⁿ)=n·log(a)) — applies to ln EXACTLY as written, with no separate "natural-log '
      + 'version" of any rule to memorize. ln(xy) = ln(x)+ln(y) is the SAME product rule, not a '
      + 'coincidence requiring independent derivation.\n\n'
      + 'The number e (≈2.71828…) is a specific, fixed real number — like π, it is irrational and '
      + 'has a precise numerical value, arising naturally from continuous growth and calculus. It is '
      + 'NOT a variable, and it is not algebraically special in a way that lets it cancel or simplify '
      + 'beyond what any other logarithm base would: ln(e)=1 for the same reason log_b(b)=1 for any '
      + 'valid base b, not because e possesses some unique canceling property. Treating e as a '
      + 'variable to solve for, or as a symbol that automatically vanishes from an expression, is '
      + 'never correct — it is evaluated and manipulated exactly like the specific number it is.',
    targetedMisconceptions: [`${NATLOG}:MC-1`, `${NATLOG}:MC-2`, `${NATLOG}:MC-3`],
    source: eb(NATLOG, 'Core Understanding — ln is log base e and every log law applies to it unchanged, and e is a specific fixed number, never a variable or an algebraically special symbol'),
  },
  {
    conceptId: SYSTEM3VAR, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'Solving a three-variable system by elimination requires MULTIPLE rounds, never just one. A '
      + 'single elimination step removes one variable from a SINGLE PAIR of the three equations, '
      + 'producing one new two-variable equation — it does not solve the system by itself. The full '
      + 'process: eliminate one variable from two different pairs of equations (producing two new '
      + 'two-variable equations), then eliminate a second variable between those two new equations '
      + '(producing one single-variable equation), solve it, and back-substitute twice to recover all '
      + 'three values.\n\n'
      + 'When solving reveals infinitely many solutions, the solution set for a THREE-variable system '
      + 'is generally a LINE — the intersection of two planes — not a plane. (A single equation in '
      + 'three variables describes a plane; when two of the three original equations turn out to '
      + 'describe the SAME relationship after elimination, what remains free is a one-dimensional '
      + 'line of intersection, not the two-dimensional plane a rushed generalization from the '
      + 'two-variable case might suggest.)\n\n'
      + 'Reaching a false numerical statement (a contradiction) partway through elimination — such as '
      + '0=5 — is not a sign that an arithmetic mistake was made. It is a complete, valid, and final '
      + 'answer: the system is inconsistent and has NO solution. This conclusion should never trigger '
      + 'redoing the algebra from scratch looking for an error; the contradiction itself IS the '
      + 'answer.',
    targetedMisconceptions: [`${SYSTEM3VAR}:MC-1`, `${SYSTEM3VAR}:MC-2`, `${SYSTEM3VAR}:MC-3`],
    source: eb(SYSTEM3VAR, 'Core Understanding — a single elimination round only reduces one pair of equations and must be repeated, an infinite solution set for three variables is generally a line rather than a plane, and a contradiction is a complete no-solution answer, never a sign of an arithmetic error'),
  },
]

export const MATHEMATICS_ALGEBRA_INEQ2VAR_LOG_SYSTEM3VAR_PROBES: SeedProbe[] = [
  // --- math.alg.inequality-2var ----------------------------------------------
  {
    conceptId: INEQ2VAR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Graphing y ≤ 3x+2, should the boundary line be solid or dashed?',
    choices: [
      { text: 'Solid — the ≤ symbol includes the boundary itself, so the line style must match by being solid', isCorrect: true },
      { text: 'Dashed — inequality boundaries are always drawn dashed regardless of the symbol', isCorrect: false, misconceptionId: `${INEQ2VAR}:MC-1` },
      { text: 'Either style is acceptable since it does not affect which points solve the inequality', isCorrect: false, misconceptionId: `${INEQ2VAR}:MC-1` },
    ],
    targetedMisconceptions: [`${INEQ2VAR}:MC-1`],
    source: eb(INEQ2VAR, 'Detection probe (Blueprint P41) — the boundary line style must match the inequality symbol: solid for ≤/≥, dashed for </>, never chosen independently'),
  },
  {
    conceptId: INEQ2VAR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'After drawing the boundary line for y > 2x−1, how do you decide which half-plane to shade?',
    choices: [
      { text: 'Substitute a test point not on the line, such as (0,0), into the original inequality — shade the side containing that point if it makes the inequality true, otherwise shade the other side', isCorrect: true },
      { text: 'Always shade the half-plane above the line, since > means "greater than"', isCorrect: false, misconceptionId: `${INEQ2VAR}:MC-2` },
      { text: 'The direction of shading can be read directly from the line\'s slope without testing any point', isCorrect: false, misconceptionId: `${INEQ2VAR}:MC-2` },
    ],
    targetedMisconceptions: [`${INEQ2VAR}:MC-2`],
    source: eb(INEQ2VAR, 'Detection probe (Blueprint P41) — a test point not on the boundary must be substituted into the original inequality to determine which half-plane to shade, never assumed from the symbol or slope'),
  },
  {
    conceptId: INEQ2VAR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'A graph has the correct dashed boundary line for y < x+4, but the wrong half-plane is shaded. Is this graph correct?',
    choices: [
      { text: 'No — the boundary style and the shaded half are two separate, independently-checkable steps; a correct boundary does not guarantee correct shading', isCorrect: true },
      { text: 'Yes — since the boundary line correctly reflects the inequality symbol, the overall graph is considered correct', isCorrect: false, misconceptionId: `${INEQ2VAR}:MC-3` },
      { text: 'Yes, because the shaded side is a minor detail that does not affect whether the inequality is graphed correctly', isCorrect: false, misconceptionId: `${INEQ2VAR}:MC-3` },
    ],
    targetedMisconceptions: [`${INEQ2VAR}:MC-3`],
    source: eb(INEQ2VAR, 'Detection probe (Blueprint P41) — shading the wrong half-plane is a distinct error a correct boundary line does not prevent; both stages must be verified separately'),
  },

  // --- math.alg.natural-logarithm ---------------------------------------------
  {
    conceptId: NATLOG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is ln(x) a fundamentally different kind of logarithm from log₁₀(x) or log₂(x), requiring its own separate rules?',
    choices: [
      { text: 'No — ln(x) is simply log base e (ln(x) = log_e(x)), the same kind of logarithm with a specific base, not a different category', isCorrect: true },
      { text: 'Yes — ln is a distinct mathematical operation unrelated to ordinary logarithms', isCorrect: false, misconceptionId: `${NATLOG}:MC-1` },
      { text: 'Yes, since ln uses the special number e instead of an ordinary integer base', isCorrect: false, misconceptionId: `${NATLOG}:MC-1` },
    ],
    targetedMisconceptions: [`${NATLOG}:MC-1`],
    source: eb(NATLOG, 'Detection probe (Blueprint P41) — ln is not a different kind of logarithm; it is log base e, the same category of operation as any other base'),
  },
  {
    conceptId: NATLOG, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the product rule log(ab)=log(a)+log(b) need to be re-derived separately for ln, or does it already apply?',
    choices: [
      { text: 'It already applies unchanged — ln(ab) = ln(a) + ln(b) is the identical product rule, since ln is just a logarithm with base e', isCorrect: true },
      { text: 'It must be re-derived, since ln follows its own distinct set of algebraic rules', isCorrect: false, misconceptionId: `${NATLOG}:MC-2` },
      { text: 'The product rule does not apply to ln at all — only quotient and power rules do', isCorrect: false, misconceptionId: `${NATLOG}:MC-2` },
    ],
    targetedMisconceptions: [`${NATLOG}:MC-2`],
    source: eb(NATLOG, 'Detection probe (Blueprint P41) — every ordinary logarithm law (product, quotient, power) applies to ln unchanged, with no separate natural-log version to derive'),
  },
  {
    conceptId: NATLOG, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'In the expression 3e^x − e^x, can the e simply be canceled or treated as a variable to combine the terms?',
    choices: [
      { text: 'e is a specific fixed number (≈2.71828), so the expression is combined via ordinary like-term algebra: 3e^x − e^x = 2e^x, exactly as with any other base', isCorrect: true },
      { text: 'Yes — e is a variable that can be solved for or canceled out of the expression', isCorrect: false, misconceptionId: `${NATLOG}:MC-3` },
      { text: 'e has a special algebraic property that lets it cancel out of exponential expressions entirely', isCorrect: false, misconceptionId: `${NATLOG}:MC-3` },
    ],
    targetedMisconceptions: [`${NATLOG}:MC-3`],
    source: eb(NATLOG, 'Detection probe (Blueprint P41) — e is a specific fixed number, not a variable or an algebraically special symbol that cancels or simplifies beyond what any other base would'),
  },

  // --- math.alg.system-3var -----------------------------------------------------
  {
    conceptId: SYSTEM3VAR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'You eliminate z between two of the three equations in a 3-variable system, producing one new equation in x and y. Is the system now solved?',
    choices: [
      { text: 'No — one elimination round only removes one variable from one pair of equations; z must also be eliminated between a different pair, then the two resulting equations combined to finish solving', isCorrect: true },
      { text: 'Yes — eliminating one variable is sufficient to solve any system regardless of how many variables it started with', isCorrect: false, misconceptionId: `${SYSTEM3VAR}:MC-1` },
      { text: 'Yes, since the remaining x and y can simply be read off from the new equation directly', isCorrect: false, misconceptionId: `${SYSTEM3VAR}:MC-1` },
    ],
    targetedMisconceptions: [`${SYSTEM3VAR}:MC-1`],
    source: eb(SYSTEM3VAR, 'Detection probe (Blueprint P41) — a single elimination round only reduces one pair of equations by one variable; solving a 3-variable system requires repeating the process to reduce three equations to two, then to one'),
  },
  {
    conceptId: SYSTEM3VAR, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Solving a 3-variable system reveals infinitely many solutions. What shape does that solution set generally form?',
    choices: [
      { text: 'A line — the intersection of two planes, a one-dimensional set, not a two-dimensional plane', isCorrect: true },
      { text: 'A plane, by direct analogy with the 2-variable case where infinitely many solutions form a line', isCorrect: false, misconceptionId: `${SYSTEM3VAR}:MC-2` },
      { text: 'A single point, since infinitely many solutions always collapse to one specific value in higher dimensions', isCorrect: false, misconceptionId: `${SYSTEM3VAR}:MC-2` },
    ],
    targetedMisconceptions: [`${SYSTEM3VAR}:MC-2`],
    source: eb(SYSTEM3VAR, 'Detection probe (Blueprint P41) — an infinite solution set for a 3-variable system is generally a line (the intersection of two planes), never assumed to be a plane by loose analogy with the 2-variable case'),
  },
  {
    conceptId: SYSTEM3VAR, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Partway through solving a 3-variable system by elimination, you reach the statement 0=7. What should you do?',
    choices: [
      { text: 'Stop — this contradiction is itself the complete, valid final answer: the system is inconsistent and has no solution', isCorrect: true },
      { text: 'Recheck the arithmetic from the beginning, since reaching a false statement means a computational error was made', isCorrect: false, misconceptionId: `${SYSTEM3VAR}:MC-3` },
      { text: 'Continue solving for x, y, and z anyway, treating 0=7 as an intermediate simplification', isCorrect: false, misconceptionId: `${SYSTEM3VAR}:MC-3` },
    ],
    targetedMisconceptions: [`${SYSTEM3VAR}:MC-3`],
    source: eb(SYSTEM3VAR, 'Detection probe (Blueprint P41) — a contradiction reached during elimination is a complete, valid no-solution answer, never a sign of an arithmetic mistake requiring the work to be redone'),
  },
]
