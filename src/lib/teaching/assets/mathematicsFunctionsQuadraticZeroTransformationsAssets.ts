/**
 * Batch: quadratic functions (vertex vs. roots), zeros of a function
 * (x-intercepts vs. y-intercept, holes vs. zeros), and transformations of
 * functions (all math.func).
 *
 * math.func.quadratic-function becomes ready off already-authored
 * math.func.linear-function (prior batch) and math.alg.quadratic-equation,
 * and directly unblocks math.func.vertex-form and math.func.polynomial-
 * function next. math.func.zero-of-function and math.func.transformations-
 * functions both become ready off already-authored math.func.graph-of-
 * function (prior batch); zero-of-function directly unblocks
 * math.num.root-finding next, opening a new domain.
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.func.quadratic-function.md,
 * math.func.zero-of-function.md, and math.func.transformations-functions.md.
 *
 *   QUADFUNC  quadratic-function — the vertex (extreme value) and the
 *             roots (zero-crossings) are DIFFERENT questions with
 *             different numeric answers, never one automatically giving
 *             the other; the vertex is a POINT with two coordinates —
 *             finding x=-b/2a is only HALF the answer, never the
 *             complete vertex without evaluating f there; evaluating
 *             f(5) (input known) and solving f(x)=5 (output known) run
 *             in OPPOSITE directions, never the same procedure.
 *   ZEROFUNC  zero-of-function — a zero is an x-VALUE found by SOLVING
 *             f(x)=0, never a y-value or the y-intercept found by
 *             evaluating f(0); NOT every function has a real zero — a
 *             function whose graph never reaches the x-axis (like
 *             x²+1) genuinely has none, never assumed to exist by
 *             default; a candidate zero of a rational function must
 *             survive BOTH conditions (numerator zero AND denominator
 *             nonzero), never just the numerator vanishing alone.
 *   TRANSFORMFUNC transformations-functions — INSIDE the function's
 *             argument affects the HORIZONTAL direction and OUTSIDE
 *             affects the VERTICAL direction, never swapped; the
 *             horizontal shift direction is OPPOSITE to the visible sign
 *             inside the argument — f(x-h) shifts RIGHT, never left;
 *             horizontal shift and horizontal compression do NOT
 *             commute — order genuinely changes the result, never
 *             interchangeable the way vertical operations are.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const QUADFUNC = 'math.func.quadratic-function'
const ZEROFUNC = 'math.func.zero-of-function'
const TRANSFORMFUNC = 'math.func.transformations-functions'

export const MATHEMATICS_FUNCTIONS_QUADRATIC_ZERO_TRANSFORMATIONS_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: QUADFUNC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'f(x)=ax²+bx+c is FIRST a function to evaluate, distinct from math.alg.quadratic-equation\'s '
      + 'exclusive focus on solving f(x)=0. The VERTEX FORMULA is completing the square, packaged: the '
      + 'vertex is at x=-b/2a, with the y-coordinate found by EVALUATING f there. This is not new content '
      + '— it is completing-the-square\'s own already-derived result, restated as a plug-in-and-evaluate '
      + 'procedure. The vertex is a POINT with two coordinates — computing only -b/2a and stopping there '
      + 'reports only HALF the answer; for f(x)=2x²-8x+3, the x-coordinate is 2, but evaluating f(2)=-5 '
      + 'gives the FULL vertex (2,-5).\n\n'
      + 'The VERTEX (extreme value) and the ROOTS (zero-crossings) are DIFFERENT QUESTIONS, never '
      + 'substitutable: for f(t)=-5t²+20t+2 (a projectile\'s height), the vertex is at t=2 giving a '
      + 'maximum of 22 m — this answers "what\'s the peak, and when?" A genuinely different question, '
      + '"when does it hit the ground?", requires solving -5t²+20t+2=0 via the quadratic formula, giving '
      + 't≈4.1 s — a completely different number answering a completely different real-world question '
      + 'about the same function.\n\n'
      + 'Evaluating f(5) (input known, find output) and solving f(x)=5 (output known, find input) run '
      + 'in OPPOSITE directions through the identical rule — never the same procedure despite the '
      + 'similar notation.',
    targetedMisconceptions: [`${QUADFUNC}:MC-1`, `${QUADFUNC}:MC-2`, `${QUADFUNC}:MC-3`],
    source: eb(QUADFUNC, 'Core Understanding — the vertex and the roots are genuinely different questions that never substitute for each other, the vertex formula only gives the x-coordinate and must be evaluated for the complete point, and evaluating versus solving run in opposite directions'),
  },
  {
    conceptId: ZEROFUNC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'A zero of f is a value x* where f(x*)=0 — an x-INTERCEPT, found by SOLVING f(x)=0. This is the '
      + 'OPPOSITE role from the y-intercept, the single point (0,f(0)) found by EVALUATING at x=0. For '
      + 'f(x)=x²-4: the y-intercept is (0,-4) (evaluate); the zeros are x=±2 (solve) — two entirely '
      + 'different questions with two entirely different kinds of answer, never interchangeable.\n\n'
      + 'NOT every function has a zero: f(x)=x²+1≥1>0 for every real x — the graph never reaches the '
      + 'x-axis, so there is NO real zero; f(x)=eˣ>0 always, likewise no zero. A function can have zero, '
      + 'one, or many zeros depending on whether and how many times its graph actually crosses the '
      + 'x-axis — never assumed by default to have at least one.\n\n'
      + 'A zero requires f(x*)=0, NOT merely f(x*) undefined: for f(x)=(x²-1)/(x-1), setting the '
      + 'numerator to zero gives candidates x=±1 — but x=1 ALSO makes the denominator zero, so f(1) is '
      + 'undefined (a hole/removable discontinuity), never a zero. Only x=-1, where the numerator '
      + 'vanishes AND the denominator does not, is a genuine zero — a candidate must survive BOTH '
      + 'conditions.',
    targetedMisconceptions: [`${ZEROFUNC}:MC-1`, `${ZEROFUNC}:MC-2`, `${ZEROFUNC}:MC-3`],
    source: eb(ZEROFUNC, 'Core Understanding — a zero is an x-value found by solving rather than a y-value found by evaluating, not every function has a real zero, and a genuine zero of a rational function requires the numerator to vanish while the denominator stays nonzero'),
  },
  {
    conceptId: TRANSFORMFUNC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'In the canonical form g(x)=af(b(x-h))+k, parameters b and h sit INSIDE the function\'s argument '
      + 'and affect the HORIZONTAL direction; parameters a and k sit OUTSIDE and affect the VERTICAL '
      + 'direction — this mapping has no exceptions, never swapped.\n\n'
      + 'The horizontal shift direction is OPPOSITE to the sign visible inside the argument: for f(x-h), '
      + 'the graph shifts RIGHT by h when h>0, because x-h=0 occurs at x=h, meaning the feature that was '
      + 'at x=0 on f\'s graph now appears at x=h on g\'s. f(x-3) shifts RIGHT (never left), and f(x+3) '
      + 'shifts LEFT (never right) — genuinely the opposite of what the visible sign naively suggests. A '
      + 'written form like f(bx-c) must be FACTORED as f(b(x-c/b)) before the shift can be read off — the '
      + 'true shift is h=c/b, never the bare value c.\n\n'
      + 'Horizontal shift and horizontal compression do NOT commute — order genuinely changes the '
      + 'result: applying "shift right 1, then compress by 2" to f(x)=√x gives √(2x-1) (zero at x=1/2); '
      + 'applying the OPPOSITE order gives √(2x-2) (zero at x=1) — genuinely different functions. Vertical '
      + 'transformations (stretch and shift), by contrast, DO commute freely with each other; the '
      + 'canonical form\'s own structure specifies the standard compress-then-shift reading.',
    targetedMisconceptions: [`${TRANSFORMFUNC}:MC-1`, `${TRANSFORMFUNC}:MC-2`, `${TRANSFORMFUNC}:MC-3`],
    source: eb(TRANSFORMFUNC, 'Core Understanding — inside the argument affects horizontal while outside affects vertical with no exceptions, the horizontal shift direction is opposite to the visible sign, and horizontal shift and compression genuinely do not commute'),
  },
]

export const MATHEMATICS_FUNCTIONS_QUADRATIC_ZERO_TRANSFORMATIONS_PROBES: SeedProbe[] = [
  // --- math.func.quadratic-function ------------------------------------------
  {
    conceptId: QUADFUNC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If you\'ve found a quadratic function\'s vertex, have you also found where it crosses zero (its roots)?',
    choices: [
      { text: 'No — for f(t)=-5t²+20t+2, the vertex is at t=2 (maximum height 22m), but the roots (when height=0) require solving the quadratic equation separately, giving t≈4.1s; these are TWO GENUINELY DIFFERENT numbers answering two different real-world questions', isCorrect: true },
      { text: 'Yes — since both the vertex and the roots come from the same quadratic expression, computing one automatically yields the other', isCorrect: false, misconceptionId: `${QUADFUNC}:MC-1` },
      { text: 'Yes, and specifically the vertex\'s x-coordinate always equals the average of the two roots exactly, so no further calculation is needed', isCorrect: false, misconceptionId: `${QUADFUNC}:MC-1` },
    ],
    targetedMisconceptions: [`${QUADFUNC}:MC-1`],
    source: eb(QUADFUNC, 'Discovery Question 1 — if you\'ve found a quadratic function\'s vertex, have you also found its roots; test with f(t)=-5t^2+20t+2; is the vertex\'s t-value the same as the landing time'),
  },
  {
    conceptId: QUADFUNC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'What is the vertex of f(x)=2x²-8x+3? Is a single number (x=2) the complete answer, or is something missing?',
    choices: [
      { text: 'Something is missing — x=2 is only the x-coordinate; evaluating f(2)=2(4)-8(2)+3=-5 gives the FULL vertex point (2,-5); the vertex is always a point with two coordinates, and the formula finds only one of them', isCorrect: true },
      { text: 'x=2 is the complete answer — the vertex of a quadratic function is fully specified by its x-coordinate alone', isCorrect: false, misconceptionId: `${QUADFUNC}:MC-2` },
      { text: 'The vertex cannot be determined without first finding the roots of the function', isCorrect: false, misconceptionId: `${QUADFUNC}:MC-2` },
    ],
    targetedMisconceptions: [`${QUADFUNC}:MC-2`],
    source: eb(QUADFUNC, 'Discovery Question 2 — what is the vertex of f(x)=2x^2-8x+3; is a single number (x=2) the complete answer, or is something missing'),
  },
  {
    conceptId: QUADFUNC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For f(x)=2x²-8x+3, to find f(5), do you substitute 5 for x, or do you set the whole expression equal to 5 and solve?',
    choices: [
      { text: 'Substitute 5 for x directly: f(5)=2(25)-8(5)+3=50-40+3=13; evaluating f(5) means the input is 5 and you find the output, a genuinely different direction than solving f(x)=5 for the input', isCorrect: true },
      { text: 'Set 2x²-8x+3=5 and solve for x, since finding f(5) means the output is already 5 and the input must be recovered', isCorrect: false, misconceptionId: `${QUADFUNC}:MC-3` },
      { text: 'Either approach is equally valid and will produce the identical numeric result', isCorrect: false, misconceptionId: `${QUADFUNC}:MC-3` },
    ],
    targetedMisconceptions: [`${QUADFUNC}:MC-3`],
    source: eb(QUADFUNC, 'Discovery Question 3 — for f(x)=2x^2-8x+3, to find f(5), do you substitute 5 for x, or do you set the whole expression equal to 5 and solve'),
  },

  // --- math.func.zero-of-function ------------------------------------------
  {
    conceptId: ZEROFUNC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For f(x)=x²-4: is the y-intercept the same kind of quantity as a zero of the function? What is each one measuring?',
    choices: [
      { text: 'No — the y-intercept is f(0)=-4, found by EVALUATING (an output value); the zeros are x=±2, found by SOLVING f(x)=0 (input values); these are different quantities on different axes, never interchangeable', isCorrect: true },
      { text: 'Yes — the y-intercept and the zeros of a function are simply two different names for the identical quantity', isCorrect: false, misconceptionId: `${ZEROFUNC}:MC-1` },
      { text: 'Yes, since both are found by the same procedure of evaluating the function at a specific input', isCorrect: false, misconceptionId: `${ZEROFUNC}:MC-1` },
    ],
    targetedMisconceptions: [`${ZEROFUNC}:MC-1`],
    source: eb(ZEROFUNC, 'Discovery Question 1 — for f(x)=x^2-4, is the y-intercept the same kind of quantity as a zero of the function; what is each one measuring'),
  },
  {
    conceptId: ZEROFUNC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does every function have a real zero? Test f(x)=x²+1 by trying to solve x²+1=0 over the real numbers.',
    choices: [
      { text: 'No — since x²≥0 for every real x, f(x)=x²+1≥1>0 always, and the graph never touches the x-axis; solving x²=-1 has no real solution, so f(x)=x²+1 genuinely has NO real zero', isCorrect: true },
      { text: 'Yes — every function crosses the x-axis somewhere, so x²+1=0 must have a real solution even if it is not immediately obvious', isCorrect: false, misconceptionId: `${ZEROFUNC}:MC-2` },
      { text: 'Yes, and specifically x²+1=0 gives x=1 as the real zero, since squaring 1 and adding 1 gives 2, close enough to zero for this purpose', isCorrect: false, misconceptionId: `${ZEROFUNC}:MC-2` },
    ],
    targetedMisconceptions: [`${ZEROFUNC}:MC-2`],
    source: eb(ZEROFUNC, 'Discovery Question 2 — does every function have a real zero; test f(x)=x^2+1 by trying to solve x^2+1=0 over the real numbers'),
  },
  {
    conceptId: ZEROFUNC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For f(x)=(x²-1)/(x-1), setting the numerator to zero gives x=±1. Is x=1 actually a zero of f? What do you need to check first?',
    choices: [
      { text: 'No — at x=1, the DENOMINATOR is also zero, so f(1) is undefined (a hole, not a zero); a genuine zero requires the numerator to vanish AND the denominator to stay nonzero, and x=1 fails that second condition', isCorrect: true },
      { text: 'Yes — x=1 is a zero of f, since setting the numerator to zero is the only condition that needs to be checked', isCorrect: false, misconceptionId: `${ZEROFUNC}:MC-3` },
      { text: 'Yes, and the function actually equals 0/0=1 at x=1, since any expression divided by itself equals 1', isCorrect: false, misconceptionId: `${ZEROFUNC}:MC-3` },
    ],
    targetedMisconceptions: [`${ZEROFUNC}:MC-3`],
    source: eb(ZEROFUNC, 'Discovery Question 3 — for f(x)=(x^2-1)/(x-1), setting the numerator to zero gives x=+-1; is x=1 actually a zero of f; what do you need to check first'),
  },

  // --- math.func.transformations-functions ------------------------------------------
  {
    conceptId: TRANSFORMFUNC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does g(x)=f(x-3) shift the graph of f to the left or to the right? Check by finding where the argument x-3 equals zero.',
    choices: [
      { text: 'RIGHT by 3 — the argument x-3 equals zero at x=3, so the feature that was at x=0 on f\'s graph now appears at x=3 on g\'s graph; the shift direction is OPPOSITE to the visible minus sign, never matching everyday "subtraction means leftward" intuition', isCorrect: true },
      { text: 'LEFT by 3 — the minus sign inside the argument directly indicates a leftward shift, matching everyday subtraction intuition', isCorrect: false, misconceptionId: `${TRANSFORMFUNC}:MC-1` },
      { text: 'The graph does not shift horizontally at all; a change inside the argument only affects the vertical scale of the graph', isCorrect: false, misconceptionId: `${TRANSFORMFUNC}:MC-1` },
    ],
    targetedMisconceptions: [`${TRANSFORMFUNC}:MC-1`],
    source: eb(TRANSFORMFUNC, 'Discovery Question 1 — does g(x)=f(x-3) shift the graph of f to the left or to the right; check by finding where the argument x-3 equals zero'),
  },
  {
    conceptId: TRANSFORMFUNC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'In g(x)=f(x-h)+k, which parameter — h or k — controls a horizontal change, and which controls a vertical change?',
    choices: [
      { text: 'h (inside the argument) controls the HORIZONTAL change, since it changes what input is fed to f; k (outside) controls the VERTICAL change, since it modifies the output after f has already computed it — this mapping has no exceptions', isCorrect: true },
      { text: 'h controls the vertical change and k controls the horizontal change — the reverse of the inside/outside rule', isCorrect: false, misconceptionId: `${TRANSFORMFUNC}:MC-2` },
      { text: 'Both h and k control the same axis; they cannot be distinguished by their position inside or outside the function', isCorrect: false, misconceptionId: `${TRANSFORMFUNC}:MC-2` },
    ],
    targetedMisconceptions: [`${TRANSFORMFUNC}:MC-2`],
    source: eb(TRANSFORMFUNC, 'Discovery Question 2 — in g(x)=f(x-h)+k, which parameter, h or k, controls a horizontal change, and which controls a vertical change; why'),
  },
  {
    conceptId: TRANSFORMFUNC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For f(x)=√x: does "shift right 1, then compress by 2" give the same function as "compress by 2, then shift right 1"? Work both out and compare.',
    choices: [
      { text: 'No — shift-then-compress gives √(2x-1) (zero at x=1/2), while compress-then-shift gives √(2x-2) (zero at x=1); these are genuinely DIFFERENT functions, since horizontal shift and horizontal compression do NOT commute, unlike vertical operations which do', isCorrect: true },
      { text: 'Yes — both orders produce the identical function, since all function transformations commute freely regardless of type', isCorrect: false, misconceptionId: `${TRANSFORMFUNC}:MC-3` },
      { text: 'Yes, since shift and compression are both horizontal operations and any two horizontal operations always commute with each other', isCorrect: false, misconceptionId: `${TRANSFORMFUNC}:MC-3` },
    ],
    targetedMisconceptions: [`${TRANSFORMFUNC}:MC-3`],
    source: eb(TRANSFORMFUNC, 'Discovery Question 3 — for f(x)=sqrt(x), does shift right 1 then compress by 2 give the same function as compress by 2 then shift right 1; work both out and compare'),
  },
]
