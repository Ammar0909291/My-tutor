/**
 * Batch: systems-matrix-method (math.de) — the FINAL concept in this
 * campaign's math.de domain, closing it to 56/56.
 *
 * Fresh Phase 0 frontier recompute after the fourier-convergence/fourier-
 * transform/legendre-equation batch found systems-matrix-method as the
 * sole remaining math.de concept. Transcribed from the frozen Educational
 * Brain entry at educational-brain/concepts/mathematics/math.de.systems-
 * matrix-method.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, continuing math.de's established
 * domain baseline.
 *
 *   SYSTEMS-MATRIX-METHOD  The solution to x'=Ax is NEVER the scalar
 *           e^(lambda t) alone — it is the eigenvector times that scalar,
 *           since the eigenvector supplies the direction and the scalar
 *           supplies the rate; a complex conjugate eigenvalue pair's
 *           solution is NEVER left as a complex-valued answer for a real
 *           system — it must be converted to a real solution pair via the
 *           real and imaginary parts; and the matrix exponential is NEVER
 *           the matrix of entrywise exponentials of the raw entries — it
 *           is the power series I+A+A^2/2!+..., computed via diagonalization
 *           by exponentiating the eigenvalues.
 *
 * With this concept, math.de reaches 56/56 — the domain is COMPLETE for
 * this campaign.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const SYSTEMS_MATRIX_METHOD = 'math.de.systems-matrix-method'

export const MATHEMATICS_DE_SYSTEMS_MATRIX_METHOD_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SYSTEMS_MATRIX_METHOD, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "THE SOLUTION IS V TIMES E^(LAMBDA T) — NEVER THE SCALAR E^(LAMBDA T) ALONE: for "
      + '$(x\'=\\begin{pmatrix}3&1\\\\0&2\\end{pmatrix}x)$: eigenvalues $(\\lambda_1=3,\\lambda_2=2)$, '
      + 'eigenvectors $(v_1=[1;0])$, $(v_2=[1;-1])$. General solution '
      + '$(x(t)=c_1[1;0]e^{3t}+c_2[1;-1]e^{2t})$. Writing merely $(x(t)=e^{\\lambda t})$ (a '
      + 'scalar) plugs the eigenvalue in correctly but FORGETS the eigenvector — the scalar '
      + '$(e^{\\lambda t})$ gives the RATE of growth, but the eigenvector v gives the DIRECTION; '
      + 'without v, the answer is a scalar, never the actual vector-valued solution the system '
      + 'requires.\n\n'
      + 'COMPLEX CONJUGATE EIGENVALUES MUST BE CONVERTED TO A REAL SOLUTION PAIR VIA THE REAL '
      + 'AND IMAGINARY PARTS — NEVER LEFT AS A COMPLEX-VALUED ANSWER: for '
      + '$(\\lambda=2\\pm i)$ with complex eigenvector $(v=[1;0]+i[0;-1])$: the complex '
      + 'solution $(ve^{(2+i)t}=e^{2t}([1;0]+i[0;-1])(\\cos t+i\\sin t))$ splits into REAL '
      + 'solutions $(x_1=e^{2t}[\\cos t;\\sin t])$, $(x_2=e^{2t}[\\sin t;-\\cos t])$, giving the '
      + 'real general solution $(x=c_1x_1+c_2x_2)$. Writing $(x(t)=ve^{(\\alpha+\\beta i)t})$ '
      + 'and reporting a complex-valued solution directly is WRONG for a real physical system — '
      + 'a real matrix\'s complex eigenvalues come in conjugate pairs precisely so that '
      + '$(\\text{Re}[ve^{\\lambda t}])$ and $(\\text{Im}[ve^{\\lambda t}])$ give two REAL, '
      + 'independent solutions; the complex form must always be converted.\n\n'
      + 'THE MATRIX EXPONENTIAL IS THE POWER SERIES I+A+A²/2!+... — NEVER THE MATRIX OF '
      + 'ENTRYWISE EXPONENTIALS: for $(A=\\begin{pmatrix}3&1\\\\0&2\\end{pmatrix}=PDP^{-1})$: '
      + '$(e^A=Pe^DP^{-1})$ where $(e^D=\\text{diag}(e^3,e^2))$ — the EIGENVALUES are '
      + 'exponentiated, not the raw entries $(3,1,0,2)$. Checking $(A=0)$: the series gives '
      + '$(e^0=I)$ (all higher terms vanish), matching $(x(t)=e^{At}x_0)$ at $(t=0)$ correctly '
      + 'returning $(x_0)$. Believing $(e^A)$ is the matrix whose (i,j) entry is $(e^{a_{ij}})$ '
      + 'is WRONG — that entrywise reading would give $(e^0)$ as a matrix of 1\'s, not the '
      + 'identity I, contradicting the required initial-condition check.',
    targetedMisconceptions: [`${SYSTEMS_MATRIX_METHOD}:MC-1`, `${SYSTEMS_MATRIX_METHOD}:MC-2`, `${SYSTEMS_MATRIX_METHOD}:MC-3`],
    source: eb(SYSTEMS_MATRIX_METHOD, 'Core Understanding — the solution being v times e^(lambda t) never the scalar alone, complex conjugate eigenvalues needing conversion to a real solution pair via real and imaginary parts never left as a complex-valued answer, and the matrix exponential being the power series never the matrix of entrywise exponentials'),
  },
]

export const MATHEMATICS_DE_SYSTEMS_MATRIX_METHOD_PROBES: SeedProbe[] = [
  {
    conceptId: SYSTEMS_MATRIX_METHOD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: "Is the solution to x'=Ax just e^(λt), or does it need an eigenvector too?",
    choices: [
      { text: "It needs an eigenvector too — for x'=[[3,1],[0,2]]x, eigenvalues λ1=3,λ2=2 with eigenvectors v1=[1;0],v2=[1;-1] give x(t)=c1[1;0]e^3t+c2[1;-1]e^2t; the scalar e^(λt) gives the RATE, but the eigenvector v gives the DIRECTION — without v, the answer is a scalar, never the actual vector-valued solution", isCorrect: true },
      { text: "The solution to x'=Ax is just the scalar e^(λt), with no eigenvector needed", isCorrect: false, misconceptionId: `${SYSTEMS_MATRIX_METHOD}:MC-1` },
      { text: "Since the scalar ODE solution e^(λt) is already known, plugging the eigenvalue into that same form fully solves the system", isCorrect: false, misconceptionId: `${SYSTEMS_MATRIX_METHOD}:MC-1` },
    ],
    targetedMisconceptions: [`${SYSTEMS_MATRIX_METHOD}:MC-1`],
    source: eb(SYSTEMS_MATRIX_METHOD, 'Discovery Question 1 as a detection probe (verbatim) — whether the solution is just e^(λt) or needs an eigenvector too, an answer of "just e^(λt)" confirming EIGENVECTOR-SOLUTION-IS-SCALAR'),
  },
  {
    conceptId: SYSTEMS_MATRIX_METHOD, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If the eigenvalues are complex, should the reported solution to a real system be complex?',
    choices: [
      { text: "No — for λ=2±i with complex eigenvector v=[1;0]+i[0;-1], the complex solution ve^(2+i)t splits into REAL solutions x1=e^2t[cos t;sin t], x2=e^2t[sin t;-cos t]; a real matrix's complex eigenvalues come in conjugate pairs precisely so Re and Im give two real independent solutions", isCorrect: true },
      { text: "Yes, if the eigenvalues are complex, the reported solution to a real system should also be reported as complex", isCorrect: false, misconceptionId: `${SYSTEMS_MATRIX_METHOD}:MC-2` },
      { text: "Since Euler's formula naturally produces a complex expression, the final answer for the system's solution should stay in complex form", isCorrect: false, misconceptionId: `${SYSTEMS_MATRIX_METHOD}:MC-2` },
    ],
    targetedMisconceptions: [`${SYSTEMS_MATRIX_METHOD}:MC-2`],
    source: eb(SYSTEMS_MATRIX_METHOD, 'Discovery Question 2 as a detection probe (verbatim) — whether a complex-eigenvalue system\'s solution should be reported as complex, an answer of "yes" confirming COMPLEX-EIGENVALUE-GIVES-COMPLEX-SOLUTION'),
  },
  {
    conceptId: SYSTEMS_MATRIX_METHOD, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Is e^A the matrix with entries e raised to A's individual entries, or something else?",
    choices: [
      { text: "Something else — e^A=I+A+A²/2!+... is a power series; for A=PDP⁻¹, e^A=Pe^DP⁻¹ where e^D=diag(e³,e²), exponentiating the EIGENVALUES, not the raw entries; checking A=0 gives e^0=I (correct), while the entrywise reading would wrongly give a matrix of 1's", isCorrect: true },
      { text: "e^A is the matrix whose (i,j) entry is e raised to A's (i,j) entry", isCorrect: false, misconceptionId: `${SYSTEMS_MATRIX_METHOD}:MC-3` },
      { text: "Since the scalar identity e^a is well known, applying it entrywise to a matrix's raw entries is the natural way matrix functions work", isCorrect: false, misconceptionId: `${SYSTEMS_MATRIX_METHOD}:MC-3` },
    ],
    targetedMisconceptions: [`${SYSTEMS_MATRIX_METHOD}:MC-3`],
    source: eb(SYSTEMS_MATRIX_METHOD, 'Discovery Question 3 as a detection probe (verbatim) — whether e^A is the entrywise-exponentiated matrix or something else, an answer of "entrywise exponentials" confirming MATRIX-EXPONENTIAL-IS-COMPONENT-EXPONENTIAL'),
  },
]
