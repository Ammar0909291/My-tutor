/**
 * math.func batch — inverse functions, function notation, composition.
 *
 * Continues serving-asset coverage for math.func (5/29 -> 8/29).
 * math.func.inverse-functions became ready the instant math.func.bijection
 * (prior batch) was served, and is the direct path toward unblocking
 * math.func.logarithmic-function and math.trig.inverse-trig, which in turn
 * unblock math.calc.derivative-ln and math.calc.derivative-inverse-trig.
 * math.func.function-notation and math.func.composition are both
 * foundational math.func concepts, ready off math.func.function-concept
 * alone; math.func.composition also unlocks math.calc.chain-rule (already
 * served in math.calc, per that concept's own forward cross-link note).
 * Transcribed from the frozen Educational Brain entries at
 * educational-brain/concepts/mathematics/math.func.inverse-functions.md,
 * math.func.function-notation.md, and math.func.composition.md.
 *
 *   INVERSEFUNC inverse-functions — an inverse candidate must be verified
 *               GENERALLY for arbitrary x, never confirmed by a single
 *               plugged-in number; bijectivity must be checked FIRST,
 *               before attempting to invert, restricting the domain if
 *               needed; the inverse's graph reflects over y=x, never
 *               either coordinate axis.
 *   FUNCNOTATION function-notation — f(x) means substitution, never
 *               multiplication; f(a+b)=f(a)+f(b) holds only for special
 *               (proportional) functions, never universally; f(a), f·a,
 *               and f-a are three genuinely different operations, never
 *               conflated.
 *   COMPOSITION composition — in f∘g, the RIGHT-hand function g runs
 *               first ("f AFTER g"), never the reverse; a composition's
 *               domain needs BOTH gates open (x in g's domain AND g(x) in
 *               f's domain), never just the first; composition is NOT
 *               commutative in general, never assumed to match ordinary
 *               multiplication's commutativity.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const INVERSEFUNC = 'math.func.inverse-functions'
const FUNCNOTATION = 'math.func.function-notation'
const COMPOSITION = 'math.func.composition'

export const MATHEMATICS_FUNCTIONS_INVERSE_NOTATION_COMPOSITION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: INVERSEFUNC, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'For a bijective f, f⁻¹ satisfies TWO identities: f⁻¹(f(x))=x for every x in f\'s domain, '
      + 'and f(f⁻¹(y))=y for every y in f\'s codomain. To find f⁻¹, write y=f(x), solve '
      + 'algebraically for x in terms of y, then swap the variable names. Verifying correctness '
      + 'means substituting back and confirming the identity holds for an ARBITRARY x — a general '
      + 'algebraic simplification, never a single plugged-in number, since a candidate could work '
      + 'for one convenient value while genuinely failing elsewhere.\n\n'
      + 'BIJECTIVITY IS A GENUINE PREREQUISITE — CHECK IT FIRST: a function must be bijective '
      + 'BEFORE attempting to construct f⁻¹ at all. If it isn\'t, restricting the domain may be '
      + 'necessary; a formula being algebraically "solvable" for x is never sufficient on its own '
      + '(e.g. x²=y solves to x=±√y, a two-valued, not genuine, inverse on the full real line).\n\n'
      + 'THE GRAPH REFLECTS OVER y=x, NOT EITHER AXIS: since f⁻¹ swaps every (x,y) pair on f\'s '
      + 'graph into (y,x), the graph of f⁻¹ is exactly the reflection of f\'s graph over the line '
      + 'y=x — never over the x-axis (which negates y) or the y-axis (which negates x).',
    targetedMisconceptions: [`${INVERSEFUNC}:MC-1`, `${INVERSEFUNC}:MC-2`, `${INVERSEFUNC}:MC-3`],
    source: eb(INVERSEFUNC, 'Core Understanding — an inverse must be verified generally never by sampling, bijectivity must be checked first, and the graph reflects over y=x never either axis'),
  },
  {
    conceptId: FUNCNOTATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'f(x) MEANS SUBSTITUTION, NEVER MULTIPLICATION: f is the NAME of the function; (x) denotes '
      + 'the INPUT written in parentheses. There is no multiplication occurring — f(x) is read "f '
      + 'evaluated at x," exactly parallel to how cos(x) means cosine evaluated at x, never '
      + '"cosine times x." Every evaluation requires FULL substitution: for f(x+h), replace every '
      + 'occurrence of x with the ENTIRE expression (x+h), not just the standalone variable.\n\n'
      + 'f(a+b)≠f(a)+f(b) IN GENERAL — LINEARITY IS SPECIAL, NOT UNIVERSAL: this additive identity '
      + 'holds specifically for functions of the form f(x)=kx (lines through the origin) — not for '
      + 'quadratic, exponential, absolute-value, or most other function families. For f(x)=x², '
      + 'f(3+4)=f(7)=49 while f(3)+f(4)=9+16=25 — these differ sharply.\n\n'
      + 'THE DIFFERENCE QUOTIENT REQUIRES TWO FULL, SEPARATE SUBSTITUTIONS: [f(x+h)-f(x)]/h '
      + 'demands substituting (x+h) fully into f\'s rule and separately substituting x, before '
      + 'subtracting and dividing — never splitting f(a+b) prematurely across the operation.',
    targetedMisconceptions: [`${FUNCNOTATION}:MC-1`, `${FUNCNOTATION}:MC-2`, `${FUNCNOTATION}:MC-3`],
    source: eb(FUNCNOTATION, 'Core Understanding — f(x) is substitution never multiplication, linearity is special not universal, and f(a), f·a, f-a are genuinely different operations'),
  },
  {
    conceptId: COMPOSITION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.HIGH,
    content:
      'COMPOSITION FEEDS ONE FUNCTION\'S OUTPUT INTO ANOTHER\'S INPUT, RIGHT-TO-LEFT: '
      + '(f∘g)(x)=f(g(x)) means g acts FIRST (on the original input x), and f acts SECOND (on '
      + 'g\'s output). Reading f∘g as "f AFTER g" correctly identifies g as the inner (first) '
      + 'function and f as the outer (second) function.\n\n'
      + 'THE DOMAIN OF A COMPOSITION REQUIRES TWO GATES, BOTH OPEN: for x to be in the domain of '
      + 'f∘g, TWO conditions must BOTH hold: x must be in the domain of g, AND g(x) — the OUTPUT '
      + 'of g — must be in the domain of f. Checking only the first gate and forgetting the second '
      + 'is a genuine, common gap.\n\n'
      + 'COMPOSITION IS NOT COMMUTATIVE: unlike ordinary multiplication, f∘g and g∘f are, in '
      + 'general, DIFFERENT functions. Some specific pairs happen to commute (e.g. f(x)=2x and '
      + 'g(x)=3x, both giving 6x either order) — but this is a coincidence of that specific pair, '
      + 'never a general rule to assume.',
    targetedMisconceptions: [`${COMPOSITION}:MC-1`, `${COMPOSITION}:MC-2`, `${COMPOSITION}:MC-3`],
    source: eb(COMPOSITION, 'Core Understanding — the right-hand function runs first, a composition\'s domain needs both gates open, and composition is not commutative in general'),
  },
]

export const MATHEMATICS_FUNCTIONS_INVERSE_NOTATION_COMPOSITION_PROBES: SeedProbe[] = [
  // --- math.func.inverse-functions ------------------------------------------
  {
    conceptId: INVERSEFUNC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If I plug in one number and confirm f⁻¹(f(x))=x holds for it, have I verified the inverse is correct for every input?',
    choices: [
      { text: 'No — a general algebraic simplification valid for arbitrary x is required; a candidate could pass one numerical check while genuinely failing at other, untested inputs', isCorrect: true },
      { text: 'Yes — checking one number and confirming the identity holds proves the candidate inverse is correct', isCorrect: false, misconceptionId: `${INVERSEFUNC}:MC-1` },
      { text: 'Yes, since a single successful numerical check is logically equivalent to a general symbolic proof', isCorrect: false, misconceptionId: `${INVERSEFUNC}:MC-1` },
    ],
    targetedMisconceptions: [`${INVERSEFUNC}:MC-1`],
    source: eb(INVERSEFUNC, 'Discovery Question 1 — if I plug in one number and confirm the identity holds for it, have I verified the inverse is correct for every input'),
  },
  {
    conceptId: INVERSEFUNC, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Can an inverse function be found for f(x)=x² on all of ℝ, since y=x² can be solved for x as x=±√y?',
    choices: [
      { text: 'No — f(x)=x² is not injective on all of ℝ (f(2)=f(-2)=4), so it has no genuine single-valued inverse there; algebraic solvability alone does not guarantee bijectivity, which must be checked first', isCorrect: true },
      { text: 'Yes — an inverse function can be found for any function as long as y=f(x) can somehow be solved for x', isCorrect: false, misconceptionId: `${INVERSEFUNC}:MC-2` },
      { text: 'Yes, since x=±√y is itself already a valid, single-valued inverse function', isCorrect: false, misconceptionId: `${INVERSEFUNC}:MC-2` },
    ],
    targetedMisconceptions: [`${INVERSEFUNC}:MC-2`],
    source: eb(INVERSEFUNC, 'Discovery Question 2 — can I find an inverse function for any function, as long as I can somehow solve y=f(x) for x'),
  },
  {
    conceptId: INVERSEFUNC, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For f(x)=3x+2, is the graph of f⁻¹ obtained by flipping f\'s graph over the x-axis?',
    choices: [
      { text: 'No — (0,2) is on f\'s graph; reflecting over y=x gives (2,0), and f⁻¹(2)=0 confirms this, while reflecting over the x-axis would give (0,-2), and f⁻¹(0)=-2/3≠-2, a decisive mismatch', isCorrect: true },
      { text: 'Yes — the graph of f⁻¹ is obtained by reflecting f\'s graph over the x-axis', isCorrect: false, misconceptionId: `${INVERSEFUNC}:MC-3` },
      { text: 'Yes, since inverting a function always corresponds to negating its output values', isCorrect: false, misconceptionId: `${INVERSEFUNC}:MC-3` },
    ],
    targetedMisconceptions: [`${INVERSEFUNC}:MC-3`],
    source: eb(INVERSEFUNC, 'Discovery Question 3 — is the graph of f⁻¹ obtained by flipping f\'s graph over the x-axis; check a specific point to find out'),
  },

  // --- math.func.function-notation ------------------------------------------
  {
    conceptId: FUNCNOTATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If f(x)=x², what is 2f(3)?',
    choices: [
      { text: '18 — evaluate f(3)=9 first (f evaluated at 3, never f times 3), then multiply by 2', isCorrect: true },
      { text: '6f, treating f as a numerical factor being multiplied by 2 and by 3', isCorrect: false, misconceptionId: `${FUNCNOTATION}:MC-1` },
      { text: '6, computing 2×f×3 as if f(3) meant f multiplied by 3', isCorrect: false, misconceptionId: `${FUNCNOTATION}:MC-1` },
    ],
    targetedMisconceptions: [`${FUNCNOTATION}:MC-1`],
    source: eb(FUNCNOTATION, 'Detection probe — if f(x)=x², what is 2f(3); a student with MC-1 may compute this as if f were a numerical factor'),
  },
  {
    conceptId: FUNCNOTATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is f(2x)=2f(x) for f(x)=x²?',
    choices: [
      { text: 'No — f(2x)=(2x)²=4x² while 2f(x)=2x²; these are NOT equal for any x≠0, since the additive/scaling property f(ca)=cf(a) holds only for functions of the form f(x)=kx', isCorrect: true },
      { text: 'Yes — f(2x)=2f(x) holds for every function by default', isCorrect: false, misconceptionId: `${FUNCNOTATION}:MC-2` },
      { text: 'Yes, since doubling the input of any function always doubles its output', isCorrect: false, misconceptionId: `${FUNCNOTATION}:MC-2` },
    ],
    targetedMisconceptions: [`${FUNCNOTATION}:MC-2`],
    source: eb(FUNCNOTATION, 'Detection probe — is f(2x)=2f(x) for f(x)=x²; a student with MC-2 answers yes by default'),
  },
  {
    conceptId: FUNCNOTATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Are f(a), f·a, and f-a three genuinely different operations, or can they be treated interchangeably based on visual similarity?',
    choices: [
      { text: 'They are three genuinely different operations — f(a) is function evaluation (substitution), f·a is multiplication, and f-a is subtraction — each must be computed by its own correct procedure, never conflated', isCorrect: true },
      { text: 'They can be treated interchangeably, since the parentheses and symbols involved are visually similar enough to represent the same underlying operation', isCorrect: false, misconceptionId: `${FUNCNOTATION}:MC-3` },
      { text: 'f(a) and f·a always represent the identical operation, differing only in notation style', isCorrect: false, misconceptionId: `${FUNCNOTATION}:MC-3` },
    ],
    targetedMisconceptions: [`${FUNCNOTATION}:MC-3`],
    source: eb(FUNCNOTATION, 'Detection probe — given expressions like f(a), f·a, and f-a side by side, correctly identify which operation each notation represents'),
  },

  // --- math.func.composition ------------------------------------------
  {
    conceptId: COMPOSITION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Let f(x)=x² and g(x)=x+3. Compute (f∘g)(2). Does f or g run first?',
    choices: [
      { text: 'g runs first: (f∘g)(2)=f(g(2))=f(5)=25 — f∘g means "f AFTER g," so the right-hand function g acts on the original input first', isCorrect: true },
      { text: 'f runs first: (f∘g)(2)=g(f(2))=g(4)=7', isCorrect: false, misconceptionId: `${COMPOSITION}:MC-1` },
      { text: 'It cannot be determined which function runs first without additional context', isCorrect: false, misconceptionId: `${COMPOSITION}:MC-1` },
    ],
    targetedMisconceptions: [`${COMPOSITION}:MC-1`],
    source: eb(COMPOSITION, 'Discovery Question 1 — in f∘g, does f or g run first; compute (f∘g)(2) for f(x)=x² and g(x)=x+3 to check'),
  },
  {
    conceptId: COMPOSITION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'g(x)=x-4 has domain ℝ. Does that mean f(g(x))=√(x-4) also has domain ℝ?',
    choices: [
      { text: 'No — two gates must BOTH be open: x∈dom(g)=ℝ (always open), AND g(x)=x-4≥0⟹x≥4 (open only when x≥4); combined domain is [4,∞), genuinely narrower than g\'s own domain', isCorrect: true },
      { text: 'Yes — the domain of a composition is simply the domain of the inner function g', isCorrect: false, misconceptionId: `${COMPOSITION}:MC-2` },
      { text: 'Yes, since checking g\'s own domain is always sufficient to determine the composition\'s domain', isCorrect: false, misconceptionId: `${COMPOSITION}:MC-2` },
    ],
    targetedMisconceptions: [`${COMPOSITION}:MC-2`],
    source: eb(COMPOSITION, 'Discovery Question 2 — g(x)=x-4 has domain ℝ; does that mean f(g(x))=√(x-4) also has domain ℝ'),
  },
  {
    conceptId: COMPOSITION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.HIGH,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For f(x)=x+1 and g(x)=2x, is f∘g the same function as g∘f?',
    choices: [
      { text: 'No — (f∘g)(x)=f(2x)=2x+1 while (g∘f)(x)=g(x+1)=2x+2; these differ by exactly 1 for every x, confirming composition is not commutative in general', isCorrect: true },
      { text: 'Yes — function composition is always commutative, just like ordinary multiplication of numbers', isCorrect: false, misconceptionId: `${COMPOSITION}:MC-3` },
      { text: 'Yes, since f∘g and g∘f always produce identical functions regardless of which functions are chosen', isCorrect: false, misconceptionId: `${COMPOSITION}:MC-3` },
    ],
    targetedMisconceptions: [`${COMPOSITION}:MC-3`],
    source: eb(COMPOSITION, 'Discovery Question 3 — multiplication of numbers is commutative; is function composition also commutative; test it with f(x)=x+1 and g(x)=2x'),
  },
]
