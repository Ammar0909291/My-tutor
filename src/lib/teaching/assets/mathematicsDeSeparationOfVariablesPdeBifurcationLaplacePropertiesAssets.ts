/**
 * Batch: separation-of-variables-pde, bifurcation, laplace-properties
 * (math.de).
 *
 * Fresh Phase 0 frontier recompute after the pde/nonlinear-ode/laplace-
 * transform batch found 12 ready concepts (bifurcation, convolution-
 * theorem, eigenfunction-expansion, fourier-convergence, fourier-sine-
 * cosine, fourier-transform, frobenius-method, laplace-properties,
 * legendre-equation, pde-classification, separation-of-variables-pde,
 * systems-matrix-method). Selects separation-of-variables-pde (synthesizes
 * pde/fourier-series/bvp, opens the heat-equation/wave-equation/laplace-
 * equation chain), bifurcation (closes nonlinear-ode's and stability-
 * analysis's shared frontier, opens chaos), and laplace-properties (opens
 * inverse-laplace -> laplace-ode) as the three highest-leverage picks.
 * Transcribed from the frozen Educational Brain entries at educational-
 * brain/concepts/mathematics/math.de.{separation-of-variables-pde,
 * bifurcation,laplace-properties}.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, continuing math.de's established
 * domain baseline.
 *
 *   SEPARATION-OF-VARIABLES-PDE  Both sides of the separated equation must
 *           equal the SAME constant — this is NEVER an arbitrary step but a
 *           direct logical consequence of x and t being independent
 *           variables; the resulting X-equation plus boundary conditions is
 *           an eigenvalue problem where most lambda give ONLY the trivial
 *           solution — the case analysis (positive, zero, negative lambda)
 *           is NEVER skipped; and a single separated solution is NEVER
 *           automatically the complete answer — the general solution
 *           generally needs a full Fourier-series superposition to match an
 *           arbitrary initial condition.
 *   BIFURCATION  A bifurcation is NEVER merely a stability sign-flip — it is
 *           a genuine TOPOLOGICAL change (creation/destruction of
 *           equilibria, birth of limit cycles); the normal form is NEVER a
 *           Taylor approximation — after the right smooth coordinate change
 *           it IS the system's exact local topology; and a subcritical Hopf
 *           bifurcation is NEVER assumed to have no limit cycle — it
 *           genuinely has one, an UNSTABLE one, whose collapse causes a
 *           dangerous jump to a distant attractor.
 *   LAPLACE-PROPERTIES  Linearity of the transform is NEVER a separate
 *           Laplace-specific rule requiring re-derivation — it is ordinary
 *           integral linearity, letting known pieces combine directly; the
 *           first shifting theorem is NEVER a new integral to evaluate — it
 *           is a direct s-to-(s-a) substitution into an already-known F(s);
 *           and the first and second shifting theorems are NEVER
 *           interchangeable — one shifts the argument, the other multiplies
 *           by an exponential factor, genuinely opposite mechanisms.
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const SEPARATION_OF_VARIABLES_PDE = 'math.de.separation-of-variables-pde'
const BIFURCATION = 'math.de.bifurcation'
const LAPLACE_PROPERTIES = 'math.de.laplace-properties'

export const MATHEMATICS_DE_SEPARATION_OF_VARIABLES_PDE_BIFURCATION_LAPLACE_PROPERTIES_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: SEPARATION_OF_VARIABLES_PDE, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'BOTH SIDES MUST EQUAL THE SAME CONSTANT — THE LOGICAL CORE OF SEPARATION, NEVER AN '
      + 'ARBITRARY STEP: for $(u_t=ku_{xx})$ with $(u=X(x)T(t))$: substituting and dividing by '
      + '$(kXT)$ gives $(\\frac{T\'(t)}{kT(t)}=\\frac{X\'\'(x)}{X(x)})$. The LEFT side depends '
      + 'only on t; the RIGHT side depends only on x. Since x, t are INDEPENDENT variables, a '
      + 'function of t alone can equal a function of x alone for EVERY x, t only if BOTH sides '
      + 'equal the SAME constant, $(-\\lambda)$ — this is not an assumption but a direct logical '
      + "consequence of independence, splitting one PDE into two ODEs: $(X''=-\\lambda X)$ and "
      + "$(T'=-\\lambda kT)$.\n\n"
      + 'THE X-EQUATION PLUS BOUNDARY CONDITIONS IS A BVP EIGENVALUE PROBLEM — MOST LAMBDA GIVE '
      + 'ONLY THE TRIVIAL SOLUTION: with $(u(0,t)=u(L,t)=0)$ translating to $(X(0)=X(L)=0)$: for '
      + "MOST values of lambda, the only solution to $(X''=-\\lambda X)$ satisfying both boundary "
      + 'conditions is $(X\\equiv0)$ (giving $(u\\equiv0)$ everywhere — uninteresting). Only for '
      + 'the SPECIFIC discrete set $(\\lambda_n=(n\\pi/L)^2)$ does a NONTRIVIAL solution '
      + '$(X_n(x)=\\sin(n\\pi x/L))$ exist — exactly analogous to a matrix eigenvalue problem, '
      + 'now in a boundary-value-problem setting. Trying $(\\lambda\\le0)$ must genuinely be '
      + 'checked and ruled out (giving only the trivial solution), never skipped.\n\n'
      + 'A SINGLE SEPARATED SOLUTION IS RARELY THE WHOLE ANSWER — THE GENERAL SOLUTION NEEDS A '
      + 'FOURIER-SERIES SUM: for initial condition $(u(x,0)=3\\sin(2x)-\\sin(5x))$: the single '
      + 'term $(u_1(x,t)=\\sin(2x)e^{-4t})$ satisfies the PDE and boundary conditions perfectly, '
      + 'but at $(t=0)$ gives only $(\\sin(2x))$ — NOT matching $(3\\sin(2x)-\\sin(5x))$ (missing '
      + 'the coefficient 3 and the entire $(-\\sin(5x))$ term entirely). By linearity, ANY sum of '
      + 'separated solutions is also a solution, so the correct answer sums every term the '
      + 'initial condition actually contains: '
      + '$(u(x,t)=3\\sin(2x)e^{-4t}-\\sin(5x)e^{-25t})$ — each mode decaying at its OWN rate '
      + '$(e^{-\\lambda_nt})$, with higher n (larger $(\\lambda_n)$) decaying strictly faster.',
    targetedMisconceptions: [`${SEPARATION_OF_VARIABLES_PDE}:MC-1`, `${SEPARATION_OF_VARIABLES_PDE}:MC-2`, `${SEPARATION_OF_VARIABLES_PDE}:MC-3`],
    source: eb(SEPARATION_OF_VARIABLES_PDE, 'Core Understanding — both sides needing to equal the same constant as the logical core of separation never an arbitrary step, the X-equation plus boundary conditions being a BVP eigenvalue problem where most lambda give only the trivial solution, and a single separated solution rarely being the whole answer since the general solution needs a Fourier-series sum'),
  },
  {
    conceptId: BIFURCATION, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'A BIFURCATION IS A TOPOLOGICAL CHANGE — NEVER MERELY A STABILITY SIGN-FLIP: for the '
      + 'saddle-node normal form $(\\dot x=\\mu-x^2)$: at $(\\mu<0)$, NO equilibrium exists at '
      + 'all; at $(\\mu>0)$, TWO equilibria appear ($(+\\sqrt\\mu)$ stable, $(-\\sqrt\\mu)$ '
      + 'unstable) — equilibria are CREATED out of nothing, never existing before. This is '
      + 'qualitatively different from a mere stability change (e.g. a stable spiral becoming an '
      + 'unstable spiral WITHOUT any new attractor appearing) — that alone is loss of stability, '
      + 'not itself a bifurcation in the strict topological sense. The Hopf bifurcation similarly '
      + 'CREATES a limit cycle, a genuinely new topological feature, never a mere sign flip.\n\n'
      + 'THE NORMAL FORM IS THE EXACT LOCAL TOPOLOGY — NEVER A TAYLOR APPROXIMATION: the '
      + 'pitchfork\'s normal form $(\\dot x=\\mu x-x^3)$ looks like it comes from truncating a '
      + "Taylor series, inviting the misconception that it's merely an approximation valid near "
      + 'the bifurcation point. In fact, the Guckenheimer-Holmes/Sternberg theorem guarantees a '
      + 'smooth, near-identity coordinate change making the ORIGINAL system EQUAL to the normal '
      + 'form to any desired order — the higher-order error terms are TOPOLOGICALLY IRRELEVANT '
      + 'near the bifurcation (they create no new equilibria or cycles there). "Normal form = '
      + "approximation\" is therefore WRONG: it IS the system's local topology, not an "
      + 'approximation to it.\n\n'
      + 'A SUBCRITICAL HOPF BIFURCATION GENUINELY HAS A LIMIT CYCLE — IT IS UNSTABLE, NEVER '
      + 'ABSENT: the amplitude equation $(\\dot r=\\alpha r+a_1r^3)$ has equilibria at $(r=0)$ '
      + 'and $(r^2=-\\alpha/a_1)$. For $(a_1>0)$ (subcritical) and $(\\alpha<0)$ (i.e. '
      + '$(\\mu<\\mu_c)$): $(r^2=-\\alpha/a_1>0)$ genuinely has a solution — an UNSTABLE limit '
      + 'cycle surrounding the stable equilibrium. As $(\\mu\\to0^-)$, this unstable cycle '
      + 'shrinks to zero and merges with the equilibrium, which then becomes unstable at '
      + '$(\\mu=0)$ with NO nearby stable cycle to land on — the system JUMPS to a distant '
      + '(often large-amplitude, globally-created) attractor. This produces HYSTERESIS: sweeping '
      + '$(\\mu)$ up triggers the jump at $(\\mu_c)$, but sweeping back down doesn\'t reverse it '
      + 'until a different, smaller $(\\mu_{fold}<\\mu_c)$ — a dangerous asymmetry absent from '
      + 'the supercritical case.',
    targetedMisconceptions: [`${BIFURCATION}:MC-1`, `${BIFURCATION}:MC-2`, `${BIFURCATION}:MC-3`],
    source: eb(BIFURCATION, "Core Understanding — a bifurcation being a topological change never merely a stability sign-flip, the normal form being the exact local topology never a Taylor approximation, and a subcritical Hopf bifurcation genuinely having a limit cycle that is unstable never absent"),
  },
  {
    conceptId: LAPLACE_PROPERTIES, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'LINEARITY IS ORDINARY INTEGRAL LINEARITY — NEVER A SEPARATE LAPLACE-SPECIFIC RULE: for '
      + '$(\\mathcal{L}\\{3e^{2t}-5\\sin t\\}(s))$: using already-known '
      + '$(\\mathcal{L}\\{e^{2t}\\}=1/(s-2))$ and $(\\mathcal{L}\\{\\sin t\\}=1/(s^2+1))$: '
      + 'linearity gives $(3/(s-2)-5/(s^2+1))$ DIRECTLY — no new integral computed, just '
      + 'combining known pieces. This follows because integration itself splits sums and pulls '
      + 'out constants, always.\n\n'
      + 'THE FIRST SHIFTING THEOREM IS A DIRECT SUBSTITUTION S TO S-A — NEVER A NEW INTEGRAL: '
      + 'for $(\\mathcal{L}\\{e^{3t}\\cos(2t)\\}(s))$: starting from the known '
      + '$(F(s)=\\mathcal{L}\\{\\cos(2t)\\}=s/(s^2+4))$, the theorem gives '
      + '$(F(s-3)=(s-3)/[(s-3)^2+4])$ — obtained by DIRECTLY replacing s with $(s-3)$, with zero '
      + 'new integral evaluation.\n\n'
      + 'THE SECOND SHIFTING THEOREM PRODUCES A MULTIPLICATIVE FACTOR — GENUINELY DIFFERENT FROM '
      + "THE FIRST THEOREM'S ARGUMENT SHIFT: for $(\\mathcal{L}\\{(t-2)^2u(t-2)\\}(s))$: using "
      + 'known $(F(s)=\\mathcal{L}\\{t^2\\}=2/s^3)$, the theorem gives '
      + '$(e^{-2s}F(s)=2e^{-2s}/s^3)$ — a MULTIPLICATIVE factor $(e^{-2s})$ applied to $(F(s))$, '
      + "contrasted directly with the first theorem's $(F(s-3))$ ARGUMENT shift. Delaying in "
      + 'TIME multiplies by $(e^{-cs})$; multiplying by $(e^{at})$ in TIME shifts the ARGUMENT — '
      + 'these are opposite mechanisms, never interchangeable.',
    targetedMisconceptions: [`${LAPLACE_PROPERTIES}:MC-1`, `${LAPLACE_PROPERTIES}:MC-2`, `${LAPLACE_PROPERTIES}:MC-3`],
    source: eb(LAPLACE_PROPERTIES, 'Core Understanding — linearity being ordinary integral linearity never a separate Laplace-specific rule, the first shifting theorem being a direct substitution never a new integral, and the second shifting theorem producing a multiplicative factor genuinely different from the first theorem\'s argument shift'),
  },
]

export const MATHEMATICS_DE_SEPARATION_OF_VARIABLES_PDE_BIFURCATION_LAPLACE_PROPERTIES_PROBES: SeedProbe[] = [
  {
    conceptId: SEPARATION_OF_VARIABLES_PDE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'If one side of an equation depends only on x and the other only on t, and this must hold for every x and t, what does that force both sides to equal?',
    choices: [
      { text: "The same constant — for ut=kuxx with u=X(x)T(t), dividing gives T'/(kT)=X''/X; since x,t are INDEPENDENT, a function of t alone equaling a function of x alone for EVERY x,t forces BOTH sides to equal the SAME constant, a direct logical consequence, not an assumption", isCorrect: true },
      { text: 'Both sides can independently vary, with no requirement that they equal a shared constant', isCorrect: false, misconceptionId: `${SEPARATION_OF_VARIABLES_PDE}:MC-2` },
      { text: 'The equality is simply an assumption made for convenience, not a forced logical consequence of x and t being independent', isCorrect: false, misconceptionId: `${SEPARATION_OF_VARIABLES_PDE}:MC-2` },
    ],
    targetedMisconceptions: [`${SEPARATION_OF_VARIABLES_PDE}:MC-2`],
    source: eb(SEPARATION_OF_VARIABLES_PDE, 'Discovery Question 1 as a detection probe (verbatim) — what both sides are forced to equal when one depends only on x and the other only on t, an answer avoiding "the same constant" confirming SEPARATION-CONSTANT-SIGN-OR-VALUE-MISHANDLED'),
  },
  {
    conceptId: SEPARATION_OF_VARIABLES_PDE, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does the eigenvalue problem for X have a nontrivial solution for every value of λ, or only for specific values?',
    choices: [
      { text: "Only for specific values — with X(0)=X(L)=0, MOST λ give only the trivial solution X≡0; only the discrete set λn=(nπ/L)² gives a NONTRIVIAL solution Xn(x)=sin(nπx/L); λ≤0 must genuinely be checked and ruled out, never skipped", isCorrect: true },
      { text: 'The eigenvalue problem for X has a nontrivial solution for every value of λ', isCorrect: false, misconceptionId: `${SEPARATION_OF_VARIABLES_PDE}:MC-2` },
      { text: "Only the positive-λ case needs to be worked out in detail; the other cases can be assumed to also give nontrivial solutions without checking", isCorrect: false, misconceptionId: `${SEPARATION_OF_VARIABLES_PDE}:MC-2` },
    ],
    targetedMisconceptions: [`${SEPARATION_OF_VARIABLES_PDE}:MC-2`],
    source: eb(SEPARATION_OF_VARIABLES_PDE, 'Discovery Question 2 as a detection probe (verbatim) — whether the eigenvalue problem for X has a nontrivial solution for every λ or only specific values, an answer of "every value" confirming SEPARATION-CONSTANT-SIGN-OR-VALUE-MISHANDLED'),
  },
  {
    conceptId: SEPARATION_OF_VARIABLES_PDE, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: "Once you've found one separated solution that satisfies the PDE and boundary conditions, have you solved the problem?",
    choices: [
      { text: "Not necessarily — for u(x,0)=3sin(2x)-sin(5x), the single term sin(2x)e^-4t satisfies the PDE and boundary conditions but at t=0 gives only sin(2x), NOT matching the full initial condition; the correct answer sums every mode: 3sin(2x)e^-4t-sin(5x)e^-25t, each decaying at its OWN rate", isCorrect: true },
      { text: 'Yes, a single separated solution satisfying the PDE and boundary conditions is generally the complete answer', isCorrect: false, misconceptionId: `${SEPARATION_OF_VARIABLES_PDE}:MC-1` },
      { text: 'Finding one working separated solution always means the initial-value problem has been fully solved, regardless of the initial condition', isCorrect: false, misconceptionId: `${SEPARATION_OF_VARIABLES_PDE}:MC-1` },
    ],
    targetedMisconceptions: [`${SEPARATION_OF_VARIABLES_PDE}:MC-1`],
    source: eb(SEPARATION_OF_VARIABLES_PDE, 'Discovery Question 3 as a detection probe (verbatim) — whether finding one separated solution means the problem is solved, an answer of "yes" confirming SINGLE-SEPARATED-SOLUTION-ASSUMED-SUFFICIENT'),
  },
  {
    conceptId: BIFURCATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is a bifurcation just a change in an equilibrium\'s stability, or can it also create or destroy equilibria and cycles entirely?',
    choices: [
      { text: 'It can create or destroy equilibria and cycles — for the saddle-node ẋ=μ-x², at μ<0 NO equilibrium exists at all, at μ>0 TWO equilibria appear, CREATED out of nothing; this is a genuinely different, topological change, not merely a stability sign-flip', isCorrect: true },
      { text: "A bifurcation is only when an equilibrium changes from stable to unstable", isCorrect: false, misconceptionId: `${BIFURCATION}:MC-1` },
      { text: "Any time an eigenvalue crosses zero, that alone fully defines what a bifurcation is, regardless of whether equilibria or cycles are created or destroyed", isCorrect: false, misconceptionId: `${BIFURCATION}:MC-1` },
    ],
    targetedMisconceptions: [`${BIFURCATION}:MC-1`],
    source: eb(BIFURCATION, 'Discovery Question 1 as a detection probe (verbatim) — whether a bifurcation is just a stability change or can also create/destroy equilibria and cycles, an answer of "just a stability change" confirming BIFURCATION-IS-JUST-STABILITY-CHANGE'),
  },
  {
    conceptId: BIFURCATION, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Is the bifurcation normal form only an approximation near the bifurcation point, or does it capture the exact local topology?',
    choices: [
      { text: "It captures the exact local topology — the Guckenheimer-Holmes/Sternberg theorem guarantees a smooth coordinate change making the ORIGINAL system EQUAL to the normal form to any desired order; higher-order error terms are TOPOLOGICALLY IRRELEVANT near the bifurcation", isCorrect: true },
      { text: 'The bifurcation normal form is only an approximation valid near the bifurcation point', isCorrect: false, misconceptionId: `${BIFURCATION}:MC-2` },
      { text: "Since the normal form is derived via Taylor expansion, it inherits the same approximate status as any truncated Taylor series", isCorrect: false, misconceptionId: `${BIFURCATION}:MC-2` },
    ],
    targetedMisconceptions: [`${BIFURCATION}:MC-2`],
    source: eb(BIFURCATION, 'Discovery Question 2 as a detection probe (verbatim) — whether the normal form is only an approximation or captures the exact local topology, an answer of "only an approximation" confirming NORMAL-FORM-IS-AN-APPROXIMATION'),
  },
  {
    conceptId: BIFURCATION, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Does a subcritical Hopf bifurcation have no limit cycle at all, or does it have one that is unstable?',
    choices: [
      { text: 'It has one that is unstable — the amplitude equation ṙ=αr+a₁r³ with a₁>0 and α<0 genuinely gives r²=-α/a₁>0, an UNSTABLE limit cycle; its collapse at the bifurcation point causes a dangerous jump to a distant attractor, producing hysteresis', isCorrect: true },
      { text: 'A subcritical Hopf bifurcation has no limit cycle at all', isCorrect: false, misconceptionId: `${BIFURCATION}:MC-3` },
      { text: "Since the small-amplitude cycle is unstable, that means no genuine limit cycle exists in the subcritical case", isCorrect: false, misconceptionId: `${BIFURCATION}:MC-3` },
    ],
    targetedMisconceptions: [`${BIFURCATION}:MC-3`],
    source: eb(BIFURCATION, 'Discovery Question 3 as a detection probe (verbatim) — whether a subcritical Hopf bifurcation has no limit cycle or has an unstable one, an answer of "no limit cycle" confirming SUBCRITICAL-HOPF-HAS-NO-LIMIT-CYCLE'),
  },
  {
    conceptId: LAPLACE_PROPERTIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Does applying linearity require re-deriving the transform from the defining integral each time, or can you simply combine already-known standard transforms?',
    choices: [
      { text: "You can simply combine already-known transforms — for L{3e^2t-5sin t}(s), using known L{e^2t}=1/(s-2) and L{sin t}=1/(s²+1), linearity gives 3/(s-2)-5/(s²+1) DIRECTLY, no new integral computed", isCorrect: true },
      { text: 'Applying linearity requires re-deriving each piece\'s transform from the defining integral', isCorrect: false, misconceptionId: `${LAPLACE_PROPERTIES}:MC-1` },
      { text: "Since the transform's own integral definition is the fundamental fact, every application of linearity must return to that integral from scratch", isCorrect: false, misconceptionId: `${LAPLACE_PROPERTIES}:MC-1` },
    ],
    targetedMisconceptions: [`${LAPLACE_PROPERTIES}:MC-1`],
    source: eb(LAPLACE_PROPERTIES, 'Discovery Question 1 as a detection probe (verbatim) — whether linearity requires re-deriving each transform or can combine known ones, an answer of "requires re-deriving" confirming LINEARITY-ASSUMED-TO-REQUIRE-RE-DERIVATION'),
  },
  {
    conceptId: LAPLACE_PROPERTIES, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'Does computing L{e^(at)f(t)}(s) require evaluating a brand-new integral, or can it be obtained directly by substitution?',
    choices: [
      { text: "It can be obtained directly by substitution — for L{e^3t cos(2t)}(s), starting from known F(s)=L{cos(2t)}=s/(s²+4), the theorem gives F(s-3)=(s-3)/[(s-3)²+4] by DIRECTLY replacing s with s-3, with zero new integral evaluation", isCorrect: true },
      { text: 'Computing L{e^(at)f(t)}(s) requires evaluating a brand-new integral each time', isCorrect: false, misconceptionId: `${LAPLACE_PROPERTIES}:MC-2` },
      { text: "The presence of the new function e^(at)f(t) means a fresh computation from the defining integral is always needed", isCorrect: false, misconceptionId: `${LAPLACE_PROPERTIES}:MC-2` },
    ],
    targetedMisconceptions: [`${LAPLACE_PROPERTIES}:MC-2`],
    source: eb(LAPLACE_PROPERTIES, 'Discovery Question 2 as a detection probe (verbatim) — whether computing L{e^(at)f(t)}(s) requires a new integral or direct substitution, an answer of "requires a new integral" confirming FIRST-SHIFTING-THEOREM-ASSUMED-TO-NEED-NEW-INTEGRAL'),
  },
  {
    conceptId: LAPLACE_PROPERTIES, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'Do the first and second shifting theorems produce the same kind of result, or genuinely different kinds?',
    choices: [
      { text: "Genuinely different kinds — for L{(t-2)²u(t-2)}(s), the second theorem gives the MULTIPLICATIVE factor e^-2s F(s)=2e^-2s/s³, contrasted with the first theorem's ARGUMENT shift F(s-3); delaying in time multiplies by e^-cs, multiplying by e^at shifts the argument — opposite mechanisms", isCorrect: true },
      { text: 'The first and second shifting theorems produce the same kind of result, either both argument-shifts or both multiplicative factors', isCorrect: false, misconceptionId: `${LAPLACE_PROPERTIES}:MC-3` },
      { text: "Since both are called 'shifting theorems', they must apply the identical underlying mechanism to a transform", isCorrect: false, misconceptionId: `${LAPLACE_PROPERTIES}:MC-3` },
    ],
    targetedMisconceptions: [`${LAPLACE_PROPERTIES}:MC-3`],
    source: eb(LAPLACE_PROPERTIES, 'Discovery Question 3 as a detection probe (verbatim) — whether the first and second shifting theorems produce the same or genuinely different kinds of results, an answer of "the same" confirming SHIFTING-THEOREMS-CONFLATED'),
  },
]
