/**
 * Physics visual gap campaign, batch 13 (2026-09-30): analytical mechanics and
 * the remaining advanced quantum concepts. Each test checks the PHYSICS drawn.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import {
  buildGeneralizedCoordinatesScene, buildEulerLagrangeScene, buildCyclicCoordinatesScene, buildHamiltonianScene,
  buildHamiltonsEquationsScene, buildPoissonBracketsScene, buildCanonicalTransformScene, buildHamiltonJacobiScene,
  buildOperatorsScene, buildPerturbationScene, buildVariationalScene, buildWkbScene, buildIdenticalParticlesScene,
  buildAngularMomentumAdditionScene, buildBornScene, buildSMatrixScene, buildDensityMatrixScene,
  PEND, PEND_DOF, bobPosition, action, EL, orbitR, transverseSpeed, legendre, lagrangianFree, LEG,
  hamOsc, hamFlow, oscEllipse, liouvillePatch, polygonArea, pendulumStep, LIOUVILLE, toQP, fromqp, bracketInQP,
  hjS, hjMomentum, eigen2, measurement, exactLevels, secondOrderLevels, trialEnergy, ALPHA_OPT, E_EXACT,
  wkbV, turningPoint, kappaIntegral, wkbTransmission, WKB, psiSym, psiAnti, allowedJ, mValues, CG_HALF,
  momentumTransfer, bornYukawa, BORN, sElement, tElement, rhoFromBloch, purity,
} from '@/lib/teaching/sceneGenerators/physicsCoreScenesB13'

type Obj = { type?: string; text?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const objs = (s: SceneSpec): Obj[] => s.steps.flatMap((st) => st.objects as Obj[])
const texts = (s: SceneSpec) => objs(s).map((o) => o.text ?? '').join(' | ')

const BATCH: Array<[string, () => SceneSpec, string]> = [
  ['phys.mech.generalized-coordinates', buildGeneralizedCoordinatesScene, 'phys-generalized-coordinates'],
  ['phys.mech.euler-lagrange-equation', buildEulerLagrangeScene, 'phys-euler-lagrange'],
  ['phys.mech.cyclic-coordinates-conservation-laws', buildCyclicCoordinatesScene, 'phys-cyclic-coordinates'],
  ['phys.mech.hamiltonian', buildHamiltonianScene, 'phys-hamiltonian'],
  ['phys.mech.hamiltons-equations', buildHamiltonsEquationsScene, 'phys-hamiltons-equations'],
  ['phys.mech.poisson-brackets', buildPoissonBracketsScene, 'phys-poisson-liouville'],
  ['phys.mech.canonical-transformations', buildCanonicalTransformScene, 'phys-canonical-transform'],
  ['phys.mech.hamilton-jacobi-equation', buildHamiltonJacobiScene, 'phys-hamilton-jacobi'],
  ['phys.qm.operators', buildOperatorsScene, 'phys-quantum-operators'],
  ['phys.qm.perturbation-theory', buildPerturbationScene, 'phys-perturbation'],
  ['phys.qm.variational-method', buildVariationalScene, 'phys-variational'],
  ['phys.qm.wkb-approximation', buildWkbScene, 'phys-wkb'],
  ['phys.qm.identical-particles', buildIdenticalParticlesScene, 'phys-identical-particles'],
  ['phys.qm.angular-momentum-addition', buildAngularMomentumAdditionScene, 'phys-angular-momentum-addition'],
  ['phys.qm.scattering-theory-born-approximation', buildBornScene, 'phys-born-scattering'],
  ['phys.qm.s-matrix-basics', buildSMatrixScene, 'phys-s-matrix'],
  ['phys.qm.density-matrix', buildDensityMatrixScene, 'phys-density-matrix'],
]

describe('each concept is served its own figure, as a figure OF the concept', () => {
  it.each(BATCH)('%s', (conceptId, build, id) => {
    for (const req of [null, 'diagram'] as const) {
      const d = resolveVisual({ message: req ? 'show me a diagram' : '', lessonConceptId: conceptId, learnerRequest: req, subject: 'physics' } as Parameters<typeof resolveVisual>[0])
      expect(d.graphical, conceptId).toBe(true)
      expect(d.asset?.scope, conceptId).toBe('concept')
      expect((d.payload as { sceneSpec?: { id?: string } }).sceneSpec?.id).toBe(id)
    }
    expect(isRetiredVisualBinding(conceptId)).toBe(false)
    expect(INSUFFICIENT_FOR_CONCEPT.has(conceptId)).toBe(false)
    for (const o of objs(build())) {
      for (const p of [o.from, o.to, o.position, ...(o.points ?? [])].filter(Boolean) as number[][]) {
        expect(Math.abs(p[0]), `${conceptId} x`).toBeLessThanOrEqual(5)
        expect(Math.abs(p[1]), `${conceptId} y`).toBeLessThanOrEqual(5)
      }
    }
  })
})

describe('every figure passes the scene validator the renderer uses', () => {
  it.each(BATCH)('%s', (_id, build) => {
    const v = validateSceneSpec(build()) as { valid?: boolean; ok?: boolean; errors?: unknown }
    expect(v.valid ?? v.ok, JSON.stringify(v.errors ?? v)).toBe(true)
  })
})

describe('the physics each figure draws', () => {
  it('generalized coordinates: the bob stays on the constraint circle; 2 − 1 = 1 degree of freedom', () => {
    const [x, y] = bobPosition()
    expect(Math.hypot(x - PEND.pivot[0], y - PEND.pivot[1])).toBeCloseTo(PEND.L, 10)
    expect(PEND_DOF.cartesian - PEND_DOF.constraints).toBe(1)
  })

  it("Hamilton's principle: the true path has the least action; the excess is ε²π²/4T", () => {
    expect(action(EL.eps)).toBeGreaterThan(action(0))
    expect(action(-EL.eps)).toBeGreaterThan(action(0))
    expect(action(EL.eps) - action(0)).toBeCloseTo((EL.eps ** 2 * Math.PI ** 2) / (4 * EL.T), 3)
  })

  it('cyclic coordinate: r·v⊥ (∝ p_φ) is the same at perihelion and aphelion', () => {
    const rp = orbitR(0), ra = orbitR(Math.PI)
    expect(rp * transverseSpeed(rp)).toBeCloseTo(ra * transverseSpeed(ra), 10)
    expect(transverseSpeed(rp)).toBeCloseTo(3 * transverseSpeed(ra), 10)
    expect(texts(buildCyclicCoordinatesScene())).toContain('r·v = 1.4 × 1.5 = 4.2 × 0.5 = 2.1')
  })

  it('Hamiltonian: the tangent slope is p = mq̇ and its intercept is −H; H = ½mq̇² for a free particle', () => {
    const { p, H } = legendre()
    expect(p).toBe(LEG.m * LEG.v0)
    expect(H).toBeCloseTo(lagrangianFree(LEG.v0), 10)
    expect(lagrangianFree(LEG.v0) - p * LEG.v0).toBeCloseTo(-H, 10)   // tangent evaluated at q̇ = 0
  })

  it("Hamilton's equations: the flow is tangent to constant-H curves and runs clockwise", () => {
    const { qmax, pmax } = oscEllipse(1)
    for (const t of [0.3, 1.2, 2.5, 4]) {
      const q = qmax * Math.cos(t), p = pmax * Math.sin(t), [dq, dp] = hamFlow(q, p)
      expect(hamOsc(q, p)).toBeCloseTo(1, 10)
      const gq = q, gp = p / 2   // ∇H = (kq, p/m)
      expect(dq * gq + dp * gp).toBeCloseTo(0, 10)
    }
    expect(hamFlow(1, 0)[1]).toBeLessThan(0)
  })

  it("Liouville: the evolved patch keeps its area while each state keeps its energy", () => {
    const a0 = polygonArea(liouvillePatch(0)), a1 = polygonArea(liouvillePatch(LIOUVILLE.t))
    expect(Math.abs(a1 - a0) / a0).toBeLessThan(0.01)
    let [q, p] = [1.1, 1.0]
    const E0 = p * p / 2 - Math.cos(q)
    for (let i = 0; i < 220; i++) [q, p] = pendulumStep(q, p, 0.01)
    expect(p * p / 2 - Math.cos(q)).toBeCloseTo(E0, 8)
  })

  it('canonical transformation: {q, p} = 1 in the new variables, and circles map to P = const', () => {
    expect(bracketInQP(1, 1)).toBeCloseTo(1, 6)
    expect(bracketInQP(2.3, 0.4)).toBeCloseTo(1, 6)
    const [q, p] = toQP(0.7, 1.5)
    const [Q, Pm] = fromqp(q, p)
    expect(Q).toBeCloseTo(0.7, 10)
    expect(Pm).toBeCloseTo(1.5, 10)
  })

  it('Hamilton–Jacobi: S = mq²/2t satisfies −∂S/∂t = (∂S/∂q)²/2m, and ∂S/∂q is the momentum', () => {
    const h = 1e-5
    for (const [q, t] of [[2, 2], [1, 0.5], [3, 1.5]]) {
      const dSdt = (hjS(q, t + h) - hjS(q, t - h)) / (2 * h), dSdq = (hjS(q + h, t) - hjS(q - h, t)) / (2 * h)
      expect(-dSdt).toBeCloseTo(dSdq ** 2 / 2, 5)
      expect(dSdq).toBeCloseTo(hjMomentum(q, t), 5)
    }
    expect(hjMomentum(2, 2)).toBe(1)
  })

  it('operators: real eigenvalues 1 and 3, orthogonal eigenvectors, probabilities sum to 1, ⟨A⟩ = Σ aP', () => {
    const e = eigen2(), m = measurement()
    expect(e.map((x) => x.value)).toEqual([1, 3])
    expect(e[0].vector[0] * e[1].vector[0] + e[0].vector[1] * e[1].vector[1]).toBeCloseTo(0, 10)
    expect(m.probs[0] + m.probs[1]).toBeCloseTo(1, 10)
    expect(m.mean).toBeCloseTo(m.outcomes[0] * m.probs[0] + m.outcomes[1] * m.probs[1], 10)
    expect(m.mean).toBeCloseTo(2 + Math.sin((40 * Math.PI) / 180), 10)
  })

  it('perturbation theory: second order matches the exact levels for small λ, and the levels repel', () => {
    expect(Math.abs(exactLevels(0.2)[0] - secondOrderLevels(0.2)[0])).toBeLessThan(1e-3)
    expect(Math.abs(exactLevels(1.4)[0] - secondOrderLevels(1.4)[0])).toBeGreaterThan(0.2)
    expect(exactLevels(1)[1] - exactLevels(1)[0]).toBeGreaterThan(2)
  })

  it('variational method: the best Gaussian gives −4/(3π) = −0.424, above the exact −0.5', () => {
    expect(trialEnergy(ALPHA_OPT)).toBeCloseTo(-4 / (3 * Math.PI), 10)
    expect(trialEnergy(ALPHA_OPT)).toBeGreaterThan(E_EXACT)
    for (const a of [0.05, 0.2, 0.5, 1]) expect(trialEnergy(a)).toBeGreaterThanOrEqual(trialEnergy(ALPHA_OPT))
  })

  it('WKB: V = E at the turning points; ∫κ dx matches the closed form; T = e^(−2∫κ dx)', () => {
    const xt = turningPoint()
    expect(wkbV(xt)).toBeCloseTo(WKB.E, 10)
    const exact = (Math.sqrt(WKB.c) * Math.PI * (WKB.V0 - WKB.E) * WKB.a) / (2 * Math.sqrt(WKB.V0))
    expect(kappaIntegral()).toBeCloseTo(exact, 4)
    expect(wkbTransmission()).toBeCloseTo(Math.exp(-2 * exact), 4)
  })

  it('identical particles: ψ_A vanishes when x₁ = x₂ and flips sign on exchange; ψ_S is symmetric', () => {
    for (const x of [0.1, 0.3, 0.77]) expect(psiAnti(x, x)).toBeCloseTo(0, 12)
    expect(psiAnti(0.2, 0.6)).toBeCloseTo(-psiAnti(0.6, 0.2), 12)
    expect(psiSym(0.2, 0.6)).toBeCloseTo(psiSym(0.6, 0.2), 12)
  })

  it('angular momentum: 1 ⊗ ½ = 3/2 ⊕ 1/2, 3 × 2 = 4 + 2, and the CG block is orthogonal', () => {
    expect(allowedJ(1, 0.5)).toEqual([0.5, 1.5])
    expect(allowedJ(1, 0.5).reduce((s, J) => s + mValues(J).length, 0)).toBe(mValues(1).length * mValues(0.5).length)
    const [[a, b], [c, d]] = CG_HALF
    expect(a * a + b * b).toBeCloseTo(1, 12)
    expect(a * c + b * d).toBeCloseTo(0, 12)
    expect(b).toBeCloseTo(Math.sqrt(2 / 3), 12)
  })

  it('Born: |q| = 2k sin(θ/2) (= k at 60°), and the Yukawa cross-section falls with angle', () => {
    expect(momentumTransfer(1, 60)).toBeCloseTo(1, 10)
    expect(bornYukawa(0)).toBe(1)
    expect(bornYukawa(30)).toBeGreaterThan(bornYukawa(90))
    expect(bornYukawa(90, BORN.muShort)).toBeGreaterThan(bornYukawa(90))
  })

  it('S-matrix: |S| = 1, and T = (S − 1)/2i lies on the unitarity circle, Im T = |T|²', () => {
    const [sr, si] = sElement(), [tr, ti] = tElement()
    expect(Math.hypot(sr, si)).toBeCloseTo(1, 12)
    expect(tr).toBeCloseTo(si / 2, 12)             // (S − 1)/2i
    expect(ti).toBeCloseTo((1 - sr) / 2, 12)
    expect(ti).toBeCloseTo(tr * tr + ti * ti, 12)
  })

  it('density matrix: pure states have Tr ρ² = 1 and ρ² = ρ; the centre has ½', () => {
    const rho = rhoFromBloch(Math.sin(0.9), Math.cos(0.9))
    expect(purity(rho)).toBeCloseTo(1, 12)
    const sq00 = rho[0][0] ** 2 + rho[0][1] * rho[1][0]
    expect(sq00).toBeCloseTo(rho[0][0], 12)
    expect(purity(rhoFromBloch(0, 0))).toBe(0.5)
    expect(purity(rhoFromBloch(0.5 * Math.sin(2), 0.5 * Math.cos(2)))).toBeCloseTo(0.625, 12)
  })
})
