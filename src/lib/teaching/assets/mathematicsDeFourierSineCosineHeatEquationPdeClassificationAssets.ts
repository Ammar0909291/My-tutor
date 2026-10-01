/**
 * Batch: fourier-sine-cosine, heat-equation, pde-classification (math.de).
 *
 * Fresh Phase 0 frontier recompute after the convolution-theorem/
 * eigenfunction-expansion/wave-equation batch found the remaining 7
 * math.de concepts all leaves (fourier-convergence, fourier-sine-cosine,
 * fourier-transform, heat-equation, legendre-equation, pde-classification,
 * systems-matrix-method). Selects fourier-sine-cosine, heat-equation (the
 * canonical parabolic PDE this campaign has referenced repeatedly as a
 * contrast to wave-equation), and pde-classification (formalizes pde's own
 * informal discriminant preview) for this batch. Transcribed from the
 * frozen Educational Brain entries at educational-brain/concepts/
 * mathematics/math.de.{fourier-sine-cosine,heat-equation,pde-
 * classification}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, continuing math.de's established
 * domain baseline.
 *
 *   FOURIER-SINE-COSINE  The half-range coefficient factor is NEVER the
 *           full-range 1/L — it is 2/L, doubled to compensate for
 *           integrating over only half the interval; the choice between
 *           sine and cosine series is NEVER guessed from the label — it
 *           must be read from the PDE's actual boundary conditions (sine
 *           for zero-value/Dirichlet, cosine for zero-derivative/Neumann);
 *           and the cosine series' constant term a0/2 is NEVER assumed
 *           automatically nonzero — it equals twice f's average value and
 *           can genuinely be zero.
 *   HEAT-EQUATION  The full solution is NEVER a single separated solution —
 *           it is a superposition over all eigenvalues, since the general
 *           initial condition is almost never a single sine; the heat
 *           equation NEVER propagates like a wave — it smooths
 *           instantaneously with infinite effective propagation speed; and
 *           the decay rate is NEVER proportional to n — it is proportional
 *           to n squared, since the eigenvalue itself is quadratic in n.
 *   PDE-CLASSIFICATION  The discriminant's A, B, C are NEVER taken from any
 *           polynomial that happens to appear in the problem — they are
 *           specifically the coefficients of the PDE's own second-order
 *           terms; a variable-coefficient PDE's classification is NEVER
 *           assumed globally fixed — it is local and can genuinely change
 *           across the domain; and "parabolic" NEVER means a parabola-
 *           shaped solution — it is a technical discriminant classification
 *           unrelated to solution geometry.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const FOURIER_SINE_COSINE = 'math.de.fourier-sine-cosine'
const HEAT_EQUATION = 'math.de.heat-equation'
const PDE_CLASSIFICATION = 'math.de.pde-classification'

export const MATHEMATICS_DE_FOURIER_SINE_COSINE_HEAT_EQUATION_PDE_CLASSIFICATION_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: FOURIER_SINE_COSINE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'THE HALF-RANGE FACTOR IS 2/L, NEVER THE FULL-RANGE 1/L — BECAUSE INTEGRATION HAPPENS OVER '
      + 'HALF THE INTERVAL: the full Fourier series on $([-L,L])$ uses '
      + '$(a_n=\\frac1L\\int_{-L}^Lf\\cos\\frac{n\\pi x}{L}\\,dx)$ (normalizing over a length-2L '
      + 'interval). The half-range cosine series on $([0,L])$ uses '
      + '$(a_n=\\frac2L\\int_0^Lf\\cos\\frac{n\\pi x}{L}\\,dx)$ — SAME form, but the factor '
      + 'DOUBLES to 2/L to compensate for integrating over only half the interval. Copying the '
      + 'full-range 1/L factor to a half-range problem is a persistent, purely mechanical error, '
      + 'never a conceptual one — the fix is recognizing which interval length the specific '
      + 'formula was normalized against.\n\n'
      + 'THE BOUNDARY CONDITION DICTATES THE SERIES CHOICE — READ THE PDE\'S BCS FIRST, NEVER '
      + 'GUESS FROM THE LABEL: $(\\sin(n\\pi x/L)=0)$ at BOTH $(x=0)$ and $(x=L)$ for every n — '
      + 'so the FSS represents functions vanishing at both endpoints (DIRICHLET BCs, $(u=0)$). '
      + 'Meanwhile $(\\frac{d}{dx}\\cos(n\\pi x/L)=0)$ at both endpoints for every n — so the '
      + 'FCS represents functions with zero DERIVATIVE at both endpoints (NEUMANN BCs, '
      + '$(u_x=0)$). For the heat equation with Dirichlet BCs $(u(0,t)=u(L,t)=0)$: the correct '
      + 'expansion is $(u(x,t)=\\sum b_n(t)\\sin(n\\pi x/L))$. For Neumann BCs (insulated ends): '
      + 'the correct expansion is $(u(x,t)=\\frac{a_0}{2}+\\sum a_n(t)\\cos(n\\pi x/L))$, with '
      + '$(a_0\'(t)=0)$ — the constant term (total heat) is CONSERVED, a direct physical '
      + 'consequence of insulation, never a coincidence.\n\n'
      + 'A0 CAN GENUINELY BE ZERO — NEVER ASSUMED AUTOMATICALLY NONZERO: '
      + '$(a_0=\\frac2L\\int_0^Lf(x)\\,dx)$ is TWICE f\'s average value on $([0,L])$. For '
      + '$(f(x)=\\cos(\\pi x))$ on $([0,1])$: $(\\int_0^1\\cos(\\pi x)\\,dx=0)$, giving '
      + '$(a_0=0)$ — the cosine series here has NO constant term at all, despite $(a_0)$ '
      + '"usually" being nonzero in textbook examples. Whether $(a_0)$ vanishes depends '
      + 'entirely on f\'s actual average value, never on some default assumption about cosine '
      + 'series.',
    targetedMisconceptions: [`${FOURIER_SINE_COSINE}:MC-1`, `${FOURIER_SINE_COSINE}:MC-2`, `${FOURIER_SINE_COSINE}:MC-3`],
    source: eb(FOURIER_SINE_COSINE, 'Core Understanding — the half-range factor being 2/L never the full-range 1/L, the boundary condition dictating the series choice never guessed from the label, and a0 genuinely being able to be zero never assumed automatically nonzero'),
  },
  {
    conceptId: HEAT_EQUATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      "THE FULL SOLUTION IS A SUPERPOSITION OVER ALL EIGENVALUES — NEVER A SINGLE SEPARATED "
      + "SOLUTION: separation gives $(X''+\\lambda X=0)$ with $(X(0)=X(L)=0)$, an eigenvalue "
      + 'problem with INFINITELY MANY eigenvalues $(\\lambda_n=(n\\pi/L)^2)$ and eigenfunctions '
      + '$(X_n(x)=\\sin(n\\pi x/L))$, each pairing with $(T_n(t)=e^{-k(n\\pi/L)^2t})$. Since the '
      + 'PDE is linear, EVERY linear combination of these separated solutions is also a '
      + 'solution — the general IC f(x) is almost never a single sine, so the correct solution '
      + 'requires the full sum '
      + '$(u(x,t)=\\sum_nb_n\\sin(n\\pi x/L)e^{-k(n\\pi/L)^2t})$, with $(b_n)$ extracted via '
      + 'the Fourier sine series exactly as in fourier-series.\n\n'
      + 'THE HEAT EQUATION SMOOTHS INSTANTANEOUSLY — NEVER PROPAGATES LIKE A WAVE: "heat flows" '
      + 'language from physics is often misread as heat TRAVELING like a wave with a finite '
      + 'speed. In truth, at ANY $(t>0)$ (however small), EVERY point of the bar is influenced '
      + 'by any local temperature change — an infinite effective propagation speed, though the '
      + 'influence decreases exponentially with distance. The solution becomes infinitely '
      + 'SMOOTH for $(t>0)$ regardless of how rough f(x) was — this instantaneous smoothing, '
      + "never wave-like propagation, is the heat equation's defining qualitative behavior.\n\n"
      + 'DECAY RATE IS PROPORTIONAL TO N SQUARED — NEVER N: the eigenvalue of $(-d^2/dx^2)$ for '
      + '$(\\sin(n\\pi x/L))$ is $((n\\pi/L)^2)$, so mode n decays as $(e^{-k(n\\pi/L)^2t})$. '
      + 'Mode $(n=2)$ decays 4x faster than $(n=1)$ (not 2x); mode $(n=10)$ decays 100x faster. '
      + 'This quadratic scaling — never linear — means higher harmonics vanish almost '
      + 'immediately, leaving only the fundamental mode $(\\sin(\\pi x/L)e^{-k(\\pi/L)^2t})$ to '
      + 'dominate for moderate t. For Neumann (insulated) BCs, the eigenfunctions become '
      + '$(\\cos(n\\pi x/L))$ with $(\\lambda_0=0)$, giving a nonzero steady state '
      + '$(u\\to a_0/2)$ (the average temperature) — CONSERVED, since no heat escapes through '
      + 'insulated ends.',
    targetedMisconceptions: [`${HEAT_EQUATION}:MC-1`, `${HEAT_EQUATION}:MC-2`, `${HEAT_EQUATION}:MC-3`],
    source: eb(HEAT_EQUATION, 'Core Understanding — the full solution being a superposition over all eigenvalues never a single separated solution, the heat equation smoothing instantaneously never propagating like a wave, and decay rate being proportional to n squared never n'),
  },
  {
    conceptId: PDE_CLASSIFICATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A, B, C ARE SPECIFICALLY THE SECOND-ORDER-TERM COEFFICIENTS — NEVER ANY OTHER POLYNOMIAL '
      + 'IN THE PROBLEM: for $(3u_{xx}-4u_{xy}+5u_{yy}=0)$: $(A=3,B=-4,C=5)$ (from '
      + '$(u_{xx},u_{xy},u_{yy})$ SPECIFICALLY, dropping any lower-order terms entirely), '
      + 'giving $(\\Delta=16-60=-44<0)$ — ELLIPTIC. "Discriminant" is first learned for '
      + 'quadratic equations $(ax^2+bx+c=0)$, but here A, B, C must be identified from the '
      + "PDE's LEADING second-order terms, never reflexively applied to whatever polynomial "
      + 'happens to appear elsewhere in the problem.\n\n'
      + 'VARIABLE-COEFFICIENT CLASSIFICATION IS LOCAL — NEVER ASSUMED GLOBALLY FIXED: for the '
      + 'Tricomi equation $(yu_{xx}+u_{yy}=0)$: $(A=y,B=0,C=1)$, giving $(\\Delta=-4y)$. For '
      + '$(y>0)$: $(\\Delta<0)$ — ELLIPTIC. For $(y=0)$: $(\\Delta=0)$ — PARABOLIC (the '
      + 'transition). For $(y<0)$: $(\\Delta>0)$ — HYPERBOLIC. This SAME equation genuinely '
      + 'changes TYPE across the domain — there is NO single global label when A, B, C are '
      + 'variable; classification must be evaluated pointwise.\n\n'
      + '"PARABOLIC" MEANS DELTA=0 — NEVER A PARABOLA-SHAPED SOLUTION: the heat equation IS '
      + 'parabolic ($(\\Delta=0)$), but a solution starting from $(u(x,0)=e^{-x^2})$ (a bell '
      + 'curve) STAYS a bell curve as t evolves — NEVER becoming literally parabola-shaped. '
      + '"Parabolic" is a technical classification term by discriminant, connected '
      + 'historically to conic sections ($(Ax^2+Bxy+Cy^2=1)$ IS a parabola when '
      + '$(B^2-4AC=0)$) but never describing the actual geometric shape of any PDE solution.',
    targetedMisconceptions: [`${PDE_CLASSIFICATION}:MC-1`, `${PDE_CLASSIFICATION}:MC-2`, `${PDE_CLASSIFICATION}:MC-3`],
    source: eb(PDE_CLASSIFICATION, 'Core Understanding — A B C being specifically the second-order-term coefficients never any other polynomial, variable-coefficient classification being local never assumed globally fixed, and "parabolic" meaning delta=0 never a parabola-shaped solution'),
  },
]

export const MATHEMATICS_DE_FOURIER_SINE_COSINE_HEAT_EQUATION_PDE_CLASSIFICATION_PROBES: SeedProbe[] = [
  {
    conceptId: FOURIER_SINE_COSINE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'For a function defined only on [0,L], does the coefficient formula use the same 1/L factor as the full Fourier series on [-L,L], or does something change?',
    choices: [
      { text: "The factor changes to 2/L — the full series uses an=(1/L)∫[-L,L] f cos(nπx/L)dx over length-2L, while the half-range cosine series on [0,L] uses an=(2/L)∫[0,L] f cos(nπx/L)dx, DOUBLING to compensate for integrating over only half the interval", isCorrect: true },
      { text: "The half-range coefficient formula on [0,L] uses the same 1/L factor as the full-range formula on [-L,L]", isCorrect: false, misconceptionId: `${FOURIER_SINE_COSINE}:MC-1` },
      { text: "Since both formulas have the same general form, the normalization factor should stay 1/L regardless of the integration interval", isCorrect: false, misconceptionId: `${FOURIER_SINE_COSINE}:MC-1` },
    ],
    targetedMisconceptions: [`${FOURIER_SINE_COSINE}:MC-1`],
    source: eb(FOURIER_SINE_COSINE, 'Discovery Question 1 as a detection probe (verbatim) — whether the half-range coefficient formula uses the same 1/L factor or something changes, an answer of "same 1/L factor" confirming FULL-FOURIER-FORMULA-USED-ON-HALF-INTERVAL'),
  },
  {
    conceptId: FOURIER_SINE_COSINE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does sin(nπx/L) vanish at the endpoints, or does its derivative vanish there — and which boundary condition does that match?',
    choices: [
      { text: "sin(nπx/L) itself vanishes at both endpoints for every n, matching Dirichlet (zero-value) BCs; meanwhile cos(nπx/L)'s DERIVATIVE vanishes at both endpoints, matching Neumann (zero-derivative) BCs — the boundary condition, read first, tells you which series to use", isCorrect: true },
      { text: "A Fourier sine series is used for a PDE with Neumann (zero-derivative) boundary conditions", isCorrect: false, misconceptionId: `${FOURIER_SINE_COSINE}:MC-2` },
      { text: "Since 'sine' and 'cosine' are just labels, either series can be matched to either type of boundary condition without checking endpoint behavior", isCorrect: false, misconceptionId: `${FOURIER_SINE_COSINE}:MC-2` },
    ],
    targetedMisconceptions: [`${FOURIER_SINE_COSINE}:MC-2`],
    source: eb(FOURIER_SINE_COSINE, 'Discovery Question 2 as a detection probe (verbatim) — whether sine vanishes at the endpoints or its derivative does, and which BC that matches, an answer reversing the BC-to-series correspondence confirming SINE-SERIES-FOR-ZERO-DERIVATIVE-BC'),
  },
  {
    conceptId: FOURIER_SINE_COSINE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Is the constant term a₀/2 of a Fourier cosine series always nonzero, or can it be zero?',
    choices: [
      { text: "It can genuinely be zero — a0=(2/L)∫[0,L] f(x)dx is TWICE f's average value on [0,L]; for f(x)=cos(πx) on [0,1], ∫cos(πx)dx=0, giving a0=0, despite a0 'usually' being nonzero in textbook examples", isCorrect: true },
      { text: "The constant term a0/2 of a Fourier cosine series is always nonzero", isCorrect: false, misconceptionId: `${FOURIER_SINE_COSINE}:MC-3` },
      { text: "Since standard textbook cosine-series examples have a0≠0, the constant term should generally be expected to be nonzero", isCorrect: false, misconceptionId: `${FOURIER_SINE_COSINE}:MC-3` },
    ],
    targetedMisconceptions: [`${FOURIER_SINE_COSINE}:MC-3`],
    source: eb(FOURIER_SINE_COSINE, 'Discovery Question 3 as a detection probe (verbatim) — whether the FCS constant term a0/2 is always nonzero or can be zero, an answer of "always nonzero" confirming COSINE-SERIES-ALWAYS-HAS-NONZERO-AVERAGE'),
  },
  {
    conceptId: HEAT_EQUATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does writing one separated solution X(x)T(t) that satisfies the PDE and boundary conditions solve the full initial-boundary value problem?',
    choices: [
      { text: "Not by itself — separation gives an eigenvalue problem with INFINITELY MANY eigenvalues λn=(nπ/L)² and eigenfunctions Xn=sin(nπx/L); since the PDE is linear, the general IC f(x) is almost never a single sine, so the correct solution requires the full superposition sum", isCorrect: true },
      { text: "Yes, writing one separated solution X(x)T(t) directly gives the full solution to the initial-boundary value problem", isCorrect: false, misconceptionId: `${HEAT_EQUATION}:MC-1` },
      { text: "Since the separation step is what 'solves the PDE', one separated solution satisfying the boundary conditions is sufficient", isCorrect: false, misconceptionId: `${HEAT_EQUATION}:MC-1` },
    ],
    targetedMisconceptions: [`${HEAT_EQUATION}:MC-1`],
    source: eb(HEAT_EQUATION, 'Discovery Question 1 as a detection probe (verbatim) — whether one separated solution solves the full IBVP, an answer of "yes" confirming SEPARATION-GIVES-ONLY-ONE-SOLUTION'),
  },
  {
    conceptId: HEAT_EQUATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the heat equation\'s solution show heat traveling like a wave, or does it smooth everywhere instantly?',
    choices: [
      { text: "It smooths everywhere instantly — at ANY t>0 (however small), EVERY point of the bar is influenced by any local temperature change, an infinite effective propagation speed, though the influence decreases exponentially with distance; this is instantaneous smoothing, never wave-like propagation", isCorrect: true },
      { text: "The heat equation's solution shows heat traveling like a wave, with a finite propagation speed", isCorrect: false, misconceptionId: `${HEAT_EQUATION}:MC-2` },
      { text: "'Heat flows' language means heat genuinely travels from hot regions to cold regions the way a wave travels", isCorrect: false, misconceptionId: `${HEAT_EQUATION}:MC-2` },
    ],
    targetedMisconceptions: [`${HEAT_EQUATION}:MC-2`],
    source: eb(HEAT_EQUATION, 'Discovery Question 2 as a detection probe (verbatim) — whether the heat equation propagates like a wave or smooths instantly, an answer of "travels like a wave" confirming HEAT-EQUATION-SOLUTION-PROPAGATES'),
  },
  {
    conceptId: HEAT_EQUATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does the n-th mode\'s decay rate scale proportionally to n, or to n squared?',
    choices: [
      { text: "n squared — the eigenvalue of -d²/dx² for sin(nπx/L) is (nπ/L)², so mode n decays as e^-k(nπ/L)²t; mode n=2 decays 4× faster than n=1 (not 2×), mode n=10 decays 100× faster, since the exponent involves n squared, not n linearly", isCorrect: true },
      { text: "The n-th mode's decay rate scales proportionally to n, not n squared", isCorrect: false, misconceptionId: `${HEAT_EQUATION}:MC-3` },
      { text: "Since the eigenfunction is sin(nπx/L), the decay rate should scale the same way, linearly in n", isCorrect: false, misconceptionId: `${HEAT_EQUATION}:MC-3` },
    ],
    targetedMisconceptions: [`${HEAT_EQUATION}:MC-3`],
    source: eb(HEAT_EQUATION, 'Discovery Question 3 as a detection probe (verbatim) — whether the decay rate scales proportionally to n or n squared, an answer of "proportional to n" confirming DECAY-RATE-PROPORTIONAL-TO-N'),
  },
  {
    conceptId: PDE_CLASSIFICATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'In the discriminant B²−4AC for a PDE, do A, B, C come from the PDE\'s leading second-order terms, or from some other polynomial in the problem?',
    choices: [
      { text: "From the PDE's leading second-order terms specifically — for 3uxx-4uxy+5uyy=0, A=3,B=-4,C=5 come from uxx,uxy,uyy SPECIFICALLY, dropping any lower-order terms entirely, giving Δ=16-60=-44<0, ELLIPTIC", isCorrect: true },
      { text: "A, B, C in the PDE discriminant can be identified from any quadratic polynomial appearing in the problem, such as in the solution or boundary data", isCorrect: false, misconceptionId: `${PDE_CLASSIFICATION}:MC-1` },
      { text: "Since the discriminant is first learned for quadratic equations, it should be applied reflexively to whatever polynomial happens to appear", isCorrect: false, misconceptionId: `${PDE_CLASSIFICATION}:MC-1` },
    ],
    targetedMisconceptions: [`${PDE_CLASSIFICATION}:MC-1`],
    source: eb(PDE_CLASSIFICATION, 'Discovery Question 1 as a detection probe (verbatim) — whether A, B, C come from the PDE\'s second-order terms or some other polynomial, an answer choosing another polynomial confirming DISCRIMINANT-APPLIED-TO-COEFFICIENTS-NOT-PDE'),
  },
  {
    conceptId: PDE_CLASSIFICATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If a PDE has variable coefficients, is its classification a single fixed label, or can it change across the domain?',
    choices: [
      { text: "It can change — for the Tricomi equation yuxx+uyy=0: A=y,B=0,C=1, giving Δ=-4y; for y>0, ELLIPTIC; for y=0, PARABOLIC; for y<0, HYPERBOLIC — this SAME equation genuinely changes TYPE across the domain, with no single global label when A, B, C are variable", isCorrect: true },
      { text: "A variable-coefficient PDE's classification is a single fixed label that applies everywhere in the domain", isCorrect: false, misconceptionId: `${PDE_CLASSIFICATION}:MC-2` },
      { text: "Since textbook examples almost always have constant coefficients, classification should always be treated as a single fixed label", isCorrect: false, misconceptionId: `${PDE_CLASSIFICATION}:MC-2` },
    ],
    targetedMisconceptions: [`${PDE_CLASSIFICATION}:MC-2`],
    source: eb(PDE_CLASSIFICATION, 'Discovery Question 2 as a detection probe (verbatim) — whether a variable-coefficient PDE\'s classification is a single fixed label or can change, an answer of "single fixed label" confirming CLASSIFICATION-IS-GLOBAL-NOT-LOCAL'),
  },
  {
    conceptId: PDE_CLASSIFICATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does "parabolic PDE" mean the solution has a parabola shape, or is it a technical classification by discriminant?',
    choices: [
      { text: "A technical classification by discriminant — the heat equation IS parabolic (Δ=0), but a solution starting from a bell curve u(x,0)=e^-x² STAYS a bell curve as t evolves, NEVER becoming literally parabola-shaped; 'parabolic' is a technical term never describing solution geometry", isCorrect: true },
      { text: "'Parabolic PDE' means the solution has a parabola shape", isCorrect: false, misconceptionId: `${PDE_CLASSIFICATION}:MC-3` },
      { text: "Since 'parabolic' describes a parabola in everyday mathematics, a parabolic PDE's solutions should trace out parabola shapes", isCorrect: false, misconceptionId: `${PDE_CLASSIFICATION}:MC-3` },
    ],
    targetedMisconceptions: [`${PDE_CLASSIFICATION}:MC-3`],
    source: eb(PDE_CLASSIFICATION, 'Discovery Question 3 as a detection probe (verbatim) — whether "parabolic" means a parabola-shaped solution or a technical classification, an answer of "parabola shape" confirming PARABOLIC-MEANS-PARABOLA-SHAPE'),
  },
]
