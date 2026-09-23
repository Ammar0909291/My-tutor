/**
 * Batch: jordan-form, matrix-exponential (math.linalg) — FINAL BATCH,
 * completing math.linalg 61/61.
 *
 * Continuing math.linalg (59/61 -> 61/61). Fresh frontier recompute found
 * the final 2 remaining concepts simultaneously ready. Both require only
 * diagonalization (plus eigenvalues / math.seq.series respectively, both
 * already authored). Transcribed from the frozen Educational Brain entries
 * at educational-brain/concepts/mathematics/math.linalg.{jordan-form,
 * matrix-exponential}.md.
 *
 *   JORDAN-FORM  Jordan blocks place 1's on the SUPERDIAGONAL, never the
 *           subdiagonal; GEOMETRIC multiplicity gives the block COUNT,
 *           ALGEBRAIC multiplicity gives the total combined SIZE, never
 *           the reverse; Jordan form GENERALIZES diagonalization (the
 *           all-size-1-blocks case), never replaces it.
 *   MATRIX-EXPONENTIAL  e^D's diagonal entries are e^(λᵢ), never λᵢ raised
 *           to e and never left unchanged; e^(At) is a genuinely
 *           t-DEPENDENT matrix, never t times the fixed matrix e^A; the
 *           series definition is the matrix generalization of the scalar
 *           exponential, with diagonalization collapsing it to scalar
 *           exponentials.
 *
 * Both EB entries list only 2 misconceptions each — a 3rd PROFICIENT probe
 * below re-targets one of them per concept with a fresh worked example,
 * following this campaign's established 2-misconception fallback.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const JORDAN_FORM = 'math.linalg.jordan-form'
const MATRIX_EXPONENTIAL = 'math.linalg.matrix-exponential'

export const MATHEMATICS_LINALG_JORDAN_FORM_MATRIX_EXPONENTIAL_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: JORDAN_FORM, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'JORDAN BLOCKS PLACE 1’S ON THE SUPERDIAGONAL — NEVER THE SUBDIAGONAL: J₂(3)=[[3,1],[0,3]] '
      + '— λ=3 on the diagonal, a single 1 ABOVE-RIGHT of each diagonal entry (the superdiagonal). '
      + 'A common error places the 1 BELOW the diagonal, writing [[3,0],[1,3]] instead — the '
      + 'convention is SPECIFICALLY the superdiagonal, and this matters for how Jordan blocks '
      + 'interact with generalized eigenvectors in later applications.\n\n'
      + 'GEOMETRIC MULTIPLICITY GIVES THE BLOCK COUNT; ALGEBRAIC MULTIPLICITY GIVES THE TOTAL SIZE '
      + '— NEVER THE REVERSE: for λ=5 with algebraic multiplicity 3 but geometric multiplicity 1 '
      + '(only ONE independent eigenvector): since geometric multiplicity is 1, there is EXACTLY '
      + 'ONE Jordan block for λ=5; since block sizes must sum to the algebraic multiplicity (3), '
      + 'this single block must be J₃(5). A common error uses the algebraic multiplicity (3) '
      + 'directly as the NUMBER of blocks, incorrectly concluding "three 1×1 blocks" — which would '
      + 'actually mean A IS diagonalizable. It’s the GEOMETRIC multiplicity that gives the block '
      + 'COUNT; the algebraic multiplicity gives the blocks’ combined SIZE.\n\n'
      + 'JORDAN FORM GENERALIZES DIAGONALIZATION — NEVER REPLACES IT: for A=[[2,0],[0,7]] (already '
      + 'diagonal, each eigenvalue’s algebraic multiplicity 1 equal to geometric multiplicity 1): '
      + 'the Jordan form is SIMPLY A itself — two 1×1 blocks J₁(2), J₁(7), with NO superdiagonal '
      + '1’s anywhere. When a matrix IS diagonalizable (algebraic = geometric multiplicity for '
      + 'every eigenvalue), Jordan form introduces genuinely NEW structure ONLY when '
      + 'diagonalization fails — the diagonal matrix D from math.linalg.diagonalization IS the '
      + 'Jordan form’s special, simplest case, never a separate or competing framework.',
    targetedMisconceptions: [`${JORDAN_FORM}:MC-1`, `${JORDAN_FORM}:MC-2`],
    source: eb(JORDAN_FORM, 'Core Understanding — Jordan blocks placing 1’s on the superdiagonal never the subdiagonal, geometric multiplicity giving the block count while algebraic multiplicity gives the total size, and Jordan form generalizing rather than replacing diagonalization'),
  },
  {
    conceptId: MATRIX_EXPONENTIAL, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'e^D’S DIAGONAL ENTRIES ARE e^(λᵢ) — NEVER λᵢ^e OR λᵢ UNCHANGED: for A=[[2,0],[0,-1]] '
      + '(already diagonal): e^D=[[e²,0],[0,e⁻¹]]. A common error computes the diagonal entries as '
      + '2^e or (-1)^e, or simply LEAVES the eigenvalues unchanged (writing e^D=[[2,0],[0,-1]], '
      + 'forgetting to exponentiate at all) — because D^k=diag(λ₁^k,…,λₙ^k) makes the matrix series '
      + 'DECOUPLE into n independent SCALAR exponential series, each entry becomes e RAISED TO the '
      + 'eigenvalue’s power, never the eigenvalue raised to e and never left as-is.\n\n'
      + 'e^(At) IS A GENUINELY t-DEPENDENT MATRIX — NEVER t TIMES THE FIXED MATRIX e^A: for '
      + 'A=[[2,0],[0,-1]], x(0)=(3,5): the solution x(t)=e^(At)x(0)=[[e^(2t),0],[0,e^(-t)]]'
      + '(3,5)=(3e^(2t),5e^(-t)). A common error writes x(t)=e^A·t·x(0) — confusing e^(At) (the '
      + 'matrix exponential of At, substituting t INSIDE the exponent, giving a genuinely '
      + 'different matrix RECOMPUTED for each t) with t TIMES the fixed matrix e^A, an entirely '
      + 'different and incorrect object — substituting At into the series makes EVERY power of t '
      + 'appear (t,t²,t³,…), never just a single linear factor.\n\n'
      + 'THE SERIES DEFINITION IS THE MATRIX GENERALIZATION OF THE SCALAR EXPONENTIAL — '
      + 'DIAGONALIZATION COLLAPSES IT TO SCALAR EXPONENTIALS: e^A=I+A+A²/2!+A³/3!+⋯ is a genuine, '
      + 'well-defined CONVERGENT matrix, never merely symbolic notation. Computing this series '
      + 'directly is impractical — but for a diagonalizable A=PDP⁻¹, the SAME P,D,P⁻¹ machinery '
      + 'from math.linalg.diagonalization (previously used for A^k) now builds e^A instead, with '
      + 'the derivative property d/dt[e^(At)]=Ae^(At) being EXACTLY what makes x(t)=e^(At)x(0) '
      + 'solve x′=Ax — a direct matrix generalization of the scalar ODE x′=ax⇒x(t)=e^(at)x(0).',
    targetedMisconceptions: [`${MATRIX_EXPONENTIAL}:MC-1`, `${MATRIX_EXPONENTIAL}:MC-2`],
    source: eb(MATRIX_EXPONENTIAL, 'Core Understanding — e^D’s diagonal entries as e raised to each eigenvalue never the reverse, e^(At) as a genuinely t-dependent matrix never t times the fixed e^A, and the series definition as the matrix generalization of the scalar exponential that diagonalization collapses to scalar exponentials'),
  },
]

export const MATHEMATICS_LINALG_JORDAN_FORM_MATRIX_EXPONENTIAL_PROBES: SeedProbe[] = [
  {
    conceptId: JORDAN_FORM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For the Jordan block J₂(3), where should the single 1 be placed relative to the diagonal entries?',
    choices: [
      { text: 'On the SUPERDIAGONAL — J₂(3)=[[3,1],[0,3]], with the 1 ABOVE-RIGHT of the diagonal entry, never below it', isCorrect: true },
      { text: 'On the SUBDIAGONAL — J₂(3)=[[3,0],[1,3]], with the 1 BELOW the diagonal entry', isCorrect: false, misconceptionId: `${JORDAN_FORM}:MC-1` },
      { text: "It doesn't matter which side the 1 is placed on, since both conventions represent the same Jordan block", isCorrect: false, misconceptionId: `${JORDAN_FORM}:MC-1` },
    ],
    targetedMisconceptions: [`${JORDAN_FORM}:MC-1`],
    source: eb(JORDAN_FORM, 'Demonstration 1 — the explicit J₂(3) construction, contrasted against the incorrect subdiagonal placement, directly breaking JORDAN-BLOCK-ONES-PLACED-ON-SUBDIAGONAL-INSTEAD-OF-SUPERDIAGONAL'),
  },
  {
    conceptId: JORDAN_FORM, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For λ=5 with algebraic multiplicity 3 but geometric multiplicity 1 (only one independent eigenvector), how many Jordan blocks does λ=5 have, and what size is the resulting structure?',
    choices: [
      { text: 'Exactly ONE block, of size 3 (J₃(5)) — geometric multiplicity (1) gives the block COUNT, and since block sizes must sum to the algebraic multiplicity (3), the single block must be J₃(5)', isCorrect: true },
      { text: 'Three blocks, each of size 1 — using the algebraic multiplicity (3) directly as the number of blocks, which would mean the matrix is fully diagonalizable', isCorrect: false, misconceptionId: `${JORDAN_FORM}:MC-2` },
      { text: "One block of size 1, since geometric multiplicity 1 directly gives both the block count and the block size", isCorrect: false, misconceptionId: `${JORDAN_FORM}:MC-2` },
    ],
    targetedMisconceptions: [`${JORDAN_FORM}:MC-2`],
    source: eb(JORDAN_FORM, 'Demonstration 2 — the λ=5, algebraic-multiplicity-3, geometric-multiplicity-1 block-structure derivation, directly breaking ALGEBRAIC-MULTIPLICITY-CONFUSED-WITH-BLOCK-COUNT-RATHER-THAN-TOTAL-BLOCK-SIZE'),
  },
  {
    conceptId: JORDAN_FORM, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For a different eigenvalue λ=7 with algebraic multiplicity 5 but geometric multiplicity 1, how many Jordan blocks does λ=7 have, and what size is the resulting block?',
    choices: [
      { text: 'Exactly ONE block, of size 5 (J₅(7)) — geometric multiplicity 1 gives the block COUNT (one block), and the block sizes must sum to the algebraic multiplicity 5', isCorrect: true },
      { text: 'Five blocks, each of size 1 — using the algebraic multiplicity 5 directly as the number of blocks', isCorrect: false, misconceptionId: `${JORDAN_FORM}:MC-2` },
      { text: "One block of size 1, since a geometric multiplicity of 1 always produces a 1×1 block regardless of the algebraic multiplicity", isCorrect: false, misconceptionId: `${JORDAN_FORM}:MC-2` },
    ],
    targetedMisconceptions: [`${JORDAN_FORM}:MC-2`],
    source: eb(JORDAN_FORM, 'Assessment Signals Rung 2 and Tutor Recovery Strategy — a fresh multiplicity pair (algebraic 5, geometric 1) distinct from Demonstration 2’s λ=5 example, directly breaking ALGEBRAIC-MULTIPLICITY-CONFUSED-WITH-BLOCK-COUNT-RATHER-THAN-TOTAL-BLOCK-SIZE a second, independent way since jordan-form.md registers only two misconceptions'),
  },
  {
    conceptId: MATRIX_EXPONENTIAL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For A=[[2,0],[0,-1]] (already diagonal), what is e^A?',
    choices: [
      { text: '[[e²,0],[0,e⁻¹]] — each diagonal entry becomes e RAISED TO the eigenvalue’s power, since D^k=diag(λ₁^k,λ₂^k) makes the matrix series decouple into independent scalar exponential series', isCorrect: true },
      { text: '[[2^e,0],[0,(-1)^e]] — each eigenvalue raised to the power e', isCorrect: false, misconceptionId: `${MATRIX_EXPONENTIAL}:MC-1` },
      { text: "[[2,0],[0,-1]] — the matrix exponential of an already-diagonal matrix leaves the eigenvalues unchanged", isCorrect: false, misconceptionId: `${MATRIX_EXPONENTIAL}:MC-1` },
    ],
    targetedMisconceptions: [`${MATRIX_EXPONENTIAL}:MC-1`],
    source: eb(MATRIX_EXPONENTIAL, 'Demonstration 1 — the e^D computation for A=diag(2,-1), showing e² and e⁻¹ as the correct entries, directly breaking E-TO-D-DIAGONAL-ENTRIES-COMPUTED-INCORRECTLY'),
  },
  {
    conceptId: MATRIX_EXPONENTIAL, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'For A=[[2,0],[0,-1]] and x(0)=(3,5), is x(t)=e^(At)x(0) the same as computing x(t)=e^A·t·x(0) (t times the fixed matrix e^A)?',
    choices: [
      { text: 'No — e^(At)=[[e^(2t),0],[0,e^(-t)]] is a genuinely t-DEPENDENT matrix, substituting t INSIDE the exponent so every power of t appears; it is recomputed for each t, never simply t times the fixed matrix e^A', isCorrect: true },
      { text: 'Yes — e^(At) is exactly t times the fixed matrix e^A, since substituting At for A just scales the whole exponential by t', isCorrect: false, misconceptionId: `${MATRIX_EXPONENTIAL}:MC-2` },
      { text: "Yes, since both expressions involve multiplying the matrix exponential by the scalar t in some way", isCorrect: false, misconceptionId: `${MATRIX_EXPONENTIAL}:MC-2` },
    ],
    targetedMisconceptions: [`${MATRIX_EXPONENTIAL}:MC-2`],
    source: eb(MATRIX_EXPONENTIAL, 'Demonstration 3 — the x(t)=e^(At)x(0) solution contrasted against the incorrect t·e^A·x(0), directly breaking E-TO-AT-CONFUSED-WITH-T-TIMES-E-TO-A'),
  },
  {
    conceptId: MATRIX_EXPONENTIAL, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'For a different diagonal matrix B=[[0,0],[0,3]], what is e^B?',
    choices: [
      { text: '[[e⁰,0],[0,e³]]=[[1,0],[0,e³]] — each diagonal entry becomes e raised to that eigenvalue’s power, including e⁰=1 for the zero eigenvalue, never the eigenvalue raised to e and never left unchanged', isCorrect: true },
      { text: '[[0^e,0],[0,3^e]] — each eigenvalue raised to the power e', isCorrect: false, misconceptionId: `${MATRIX_EXPONENTIAL}:MC-1` },
      { text: "[[0,0],[0,3]] — the matrix exponential leaves an already-diagonal matrix's entries unchanged", isCorrect: false, misconceptionId: `${MATRIX_EXPONENTIAL}:MC-1` },
    ],
    targetedMisconceptions: [`${MATRIX_EXPONENTIAL}:MC-1`],
    source: eb(MATRIX_EXPONENTIAL, 'Assessment Signals Rung 1 and Memory Hooks — a fresh diagonal matrix (B=diag(0,3), including a zero eigenvalue) distinct from Demonstration 1’s diag(2,-1), directly breaking E-TO-D-DIAGONAL-ENTRIES-COMPUTED-INCORRECTLY a second, independent way since matrix-exponential.md registers only two misconceptions'),
  },
]
