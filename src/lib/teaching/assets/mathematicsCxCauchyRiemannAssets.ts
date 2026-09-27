/**
 * Batch: cauchy-riemann (math.cx) — 2/31 -> 3/31.
 *
 * Fresh Phase 0 frontier recompute after complex-function was authored:
 * exactly 1 concept became ready — cauchy-riemann (requires
 * complex-function and math.calc.partial-derivatives, both already
 * authored). It unlocks analytic-functions and harmonic-functions, so
 * only this one concept was ready until now.
 * Transcribed from its frozen Educational Brain entry at educational-
 * brain/concepts/mathematics/math.cx.cauchy-riemann.md.
 *
 * Grade band: GradeBand.UNDERGRADUATE, matching this concept's "expert"
 * difficulty tier and the established convention for expert/research-tier
 * pure-mathematics content (math.top precedent) — distinct from the
 * GradeBand.HIGH used for this domain's two "advanced"-tier precursor
 * concepts (complex-numbers-analysis, complex-function).
 *
 * This concept declares no KG cross-link.
 *
 * This EB entry registers exactly 3 formal misconceptions (full
 * contract, no retargeting needed).
 *
 * Seeded as DRAFT. Promotion stays human.
 */
import { GradeBand, ProbeDifficulty } from '@prisma/client'
import type { SeedExplanation, SeedProbe } from './brainSeedAssets'

const S = 'mathematics'
const eb = (id: string, what: string) =>
  `educational-brain/concepts/mathematics/${id}.md — ${what}`

const CAUCHY_RIEMANN = 'math.cx.cauchy-riemann'

export const MATHEMATICS_CX_CAUCHY_RIEMANN_EXPLANATIONS: SeedExplanation[] = [
  {
    conceptId: CAUCHY_RIEMANN, subjectSlug: S, familyKind: 'core_explanation', gradeBand: GradeBand.UNDERGRADUATE,
    content:
      'f(z)=z̄ SATISFIES THE CR EQUATIONS NOWHERE, DESPITE BEING SMOOTH AS A REAL MAP — NEVER '
      + 'ASSUME SMOOTHNESS IMPLIES ANALYTICITY: for z=x+iy, z̄=x−iy: u=x, v=−y, so ∂u/∂x=1 but '
      + '∂v/∂y=−1 — the first CR equation ∂u/∂x=∂v/∂y requires 1=−1, which FAILS everywhere. '
      + 'Believing f(z)=z̄ is analytic because it is "smooth" or bijective is WRONG — z̄ is the '
      + 'canonical nowhere-analytic function: perfectly smooth as a map R²→R², yet NOWHERE '
      + 'complex-differentiable; real smoothness and complex analyticity are genuinely different '
      + 'properties.\n\n'
      + 'CR HOLDING AT AN ISOLATED POINT DOES NOT IMPLY HOLOMORPHICITY — NEVER CONFLATE THE TWO: '
      + 'for f(z)=|z|²=x²+y²: u=x²+y², v=0. CR requires ∂u/∂x=2x=∂v/∂y=0 (so x=0) AND '
      + '∂u/∂y=2y=−∂v/∂x=0 (so y=0) — CR hold ONLY at z=0, failing everywhere else. So f is '
      + 'complex-differentiable AT z=0 but NOT holomorphic in any disc around 0 (CR fail off the '
      + 'origin). Believing CR at a single point guarantees complex differentiability THROUGHOUT '
      + 'a neighborhood (holomorphicity) is WRONG — the sufficient condition (CR + continuous '
      + 'partials ⟹ holomorphic) requires CR to hold in an OPEN neighborhood, never just at one '
      + 'isolated point.\n\n'
      + 'u,v∈C^∞ AS REAL FUNCTIONS DOES NOT IMPLY COMPLEX DIFFERENTIABILITY — NEVER EQUATE REAL '
      + 'SMOOTHNESS WITH COMPLEX ANALYTICITY: for f(z)=x²−y²+2xi: u=x²−y² (smooth), v=2x (smooth). '
      + 'But ∂u/∂x=2x and ∂v/∂y=0 — CR requires 2x=0, so x=0; and ∂u/∂y=−2y=−∂v/∂x=−2, so y=1 — '
      + 'CR hold ONLY at z=i. Both u and v are infinitely differentiable as REAL functions '
      + 'everywhere, yet f is complex-differentiable at only ONE point. Believing u,v being smooth '
      + 'real functions is sufficient for f=u+iv to be complex-differentiable is WRONG — complex '
      + 'differentiability requires the ADDITIONAL constraint of the CR equations, a rigid '
      + 'coupling between u and v that real smoothness alone never guarantees.',
    targetedMisconceptions: [`${CAUCHY_RIEMANN}:MC-1`, `${CAUCHY_RIEMANN}:MC-2`, `${CAUCHY_RIEMANN}:MC-3`],
    source: eb(CAUCHY_RIEMANN, 'Core Understanding — f(z)=z-bar satisfying the CR equations nowhere despite being smooth as a real map never assuming smoothness implies analyticity, CR holding at an isolated point never implying holomorphicity, and u,v being smooth real functions never implying complex differentiability'),
  },
]

export const MATHEMATICS_CX_CAUCHY_RIEMANN_PROBES: SeedProbe[] = [
  {
    conceptId: CAUCHY_RIEMANN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.FOUNDATIONAL,
    stem: 'Is f(z)=z̄ analytic because it\'s smooth or one-to-one?',
    choices: [
      { text: "No — for z=x+iy, z-bar=x-iy gives u=x, v=-y, so du/dx=1 but dv/dy=-1; the first CR equation du/dx=dv/dy requires 1=-1, which fails everywhere, making z-bar the canonical nowhere-analytic function despite being perfectly smooth as a real map", isCorrect: true },
      { text: "Yes, f(z)=z-bar is analytic because it is smooth and one-to-one", isCorrect: false, misconceptionId: `${CAUCHY_RIEMANN}:MC-1` },
      { text: "Since z-bar is a perfectly smooth map from R2 to R2, that real smoothness should be treated as sufficient evidence of complex analyticity", isCorrect: false, misconceptionId: `${CAUCHY_RIEMANN}:MC-1` },
    ],
    targetedMisconceptions: [`${CAUCHY_RIEMANN}:MC-1`],
    source: eb(CAUCHY_RIEMANN, 'Discovery Question 1 as a detection probe (verbatim) — whether f(z)=z-bar is analytic because it is smooth or one-to-one, an answer of "yes" confirming CONJUGATE-IS-ANALYTIC'),
  },
  {
    conceptId: CAUCHY_RIEMANN, subjectSlug: S, probeKind: 'misconception_probe', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.DEVELOPING,
    stem: 'If CR hold at a single point, is f automatically holomorphic there?',
    choices: [
      { text: "No — for f(z)=|z|^2, u=x^2+y^2, v=0: CR hold only at z=0, failing everywhere else, so f is complex-differentiable AT z=0 but not holomorphic in any disc around it; holomorphicity requires CR to hold throughout an OPEN neighborhood, never just at one isolated point", isCorrect: true },
      { text: "Yes, if CR hold at a single point, f is automatically holomorphic there", isCorrect: false, misconceptionId: `${CAUCHY_RIEMANN}:MC-2` },
      { text: "Since checking CR at one point already confirms the equations are satisfied there, that pointwise check should be treated as complete without checking a surrounding neighborhood", isCorrect: false, misconceptionId: `${CAUCHY_RIEMANN}:MC-2` },
    ],
    targetedMisconceptions: [`${CAUCHY_RIEMANN}:MC-2`],
    source: eb(CAUCHY_RIEMANN, 'Discovery Question 2 as a detection probe (verbatim) — whether CR at a single point implies holomorphicity there, an answer of "yes" confirming POINTWISE-CR-IMPLIES-HOLOMORPHIC'),
  },
  {
    conceptId: CAUCHY_RIEMANN, subjectSlug: S, probeKind: 'mcq', gradeBand: GradeBand.UNDERGRADUATE,
    difficulty: ProbeDifficulty.PROFICIENT,
    stem: 'If u and v are both infinitely differentiable as real functions, is f=u+iv automatically complex-differentiable?',
    choices: [
      { text: "No — for f(z)=x^2-y^2+2xi, u=x^2-y^2 and v=2x are both smooth everywhere as real functions, but CR requires 2x=0 (so x=0) and -2y=-2 (so y=1), holding only at z=i; complex differentiability requires the ADDITIONAL CR-equation coupling, which real smoothness alone never guarantees", isCorrect: true },
      { text: "Yes, if u and v are both infinitely differentiable as real functions, f=u+iv is automatically complex-differentiable", isCorrect: false, misconceptionId: `${CAUCHY_RIEMANN}:MC-3` },
      { text: "Since smooth real components feel like they should carry over directly to complex differentiability, u and v both being C-infinity should be treated as sufficient on its own", isCorrect: false, misconceptionId: `${CAUCHY_RIEMANN}:MC-3` },
    ],
    targetedMisconceptions: [`${CAUCHY_RIEMANN}:MC-3`],
    source: eb(CAUCHY_RIEMANN, 'Discovery Question 3 as a detection probe (verbatim) — whether smooth real u,v implies complex differentiability of f, an answer of "yes" confirming REAL-SMOOTH-IMPLIES-ANALYTIC'),
  },
]
