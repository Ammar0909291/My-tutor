/**
 * Physics visual gap campaign, batch 15 (2026-09-30): the fourteen card-backed
 * concepts promoted from domain scope to their own concept figure. Each test
 * checks the PHYSICS drawn, and that the concept left INSUFFICIENT_FOR_CONCEPT.
 */
import { describe, it, expect } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import {
  buildDisplacementScene, buildVelocityScene, buildAccelerationScene, buildRelativeMotionScene, buildTensionScene,
  buildConservativeForcesScene, buildAngularMomentumScene, buildAngularMomentumConservationScene,
  buildThermoProcessesScene, buildCarnotScene, buildResistivityScene, buildEmfScene, buildSchrodingerScene,
  buildSelectionRulesScene,
  WALK, walkDistance, walkDisplacement, CARTS, cartPosition, ACC, accPosition, accVelocity, REL, relativeVelocity,
  TOW, towAcceleration, towTension, CONS, curvedPath, pathLength, gravityWork, angularMomentum, SPIN, SKATER, skaterSpin,
  TP, isothermalP, adiabaticP, CARNOT, carnotStates, carnotEfficiency, WIRE, resistance, CELL, cellCurrent,
  terminalVoltage, mixDensity, boxPhi, LEVELS, hydrogenE, allowedTransition, TRANSITIONS,
} from '@/lib/teaching/sceneGenerators/physicsCoreScenesB15'

type Obj = { type?: string; text?: string; from?: number[]; to?: number[]; position?: number[]; points?: number[][] }
const objs = (s: SceneSpec): Obj[] => s.steps.flatMap((st) => st.objects as Obj[])
const texts = (s: SceneSpec) => objs(s).map((o) => o.text ?? '').join(' | ')

const BATCH: Array<[string, () => SceneSpec, string]> = [
  ['phys.mech.displacement', buildDisplacementScene, 'phys-displacement'],
  ['phys.mech.velocity', buildVelocityScene, 'phys-velocity'],
  ['phys.mech.acceleration', buildAccelerationScene, 'phys-acceleration'],
  ['phys.mech.relative-motion', buildRelativeMotionScene, 'phys-relative-motion'],
  ['phys.mech.tension', buildTensionScene, 'phys-tension'],
  ['phys.mech.conservative-forces', buildConservativeForcesScene, 'phys-conservative-forces'],
  ['phys.mech.angular-momentum', buildAngularMomentumScene, 'phys-angular-momentum'],
  ['phys.mech.conservation-of-angular-momentum', buildAngularMomentumConservationScene, 'phys-angular-momentum-conservation'],
  ['phys.therm.thermodynamic-processes', buildThermoProcessesScene, 'phys-thermo-processes'],
  ['phys.therm.carnot-cycle', buildCarnotScene, 'phys-carnot'],
  ['phys.em.resistivity', buildResistivityScene, 'phys-resistivity'],
  ['phys.em.emf', buildEmfScene, 'phys-emf'],
  ['phys.qm.schrodinger-equation', buildSchrodingerScene, 'phys-schrodinger'],
  ['phys.qm.selection-rules', buildSelectionRulesScene, 'phys-selection-rules'],
]

describe('each promoted concept is served its own concept-scoped figure', () => {
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
  it('displacement: 0 → 4 → 1 m is 7 m of distance but +1 m of displacement', () => {
    expect(WALK).toEqual([0, 4, 1])
    expect(walkDistance()).toBe(7)
    expect(walkDisplacement()).toBe(1)
    expect(texts(buildDisplacementScene())).toContain('displacement = 1 − 0 = +1 m')
  })

  it('velocity: A moves +2 m each second, B −1 m; v = Δx/Δt', () => {
    expect(cartPosition(CARTS.A, 1) - cartPosition(CARTS.A, 0)).toBe(2)
    expect(cartPosition(CARTS.B, 1) - cartPosition(CARTS.B, 0)).toBe(-1)
    expect((cartPosition(CARTS.A, CARTS.T) - cartPosition(CARTS.A, 0)) / CARTS.T).toBe(CARTS.A.v)
  })

  it('acceleration: gaps grow; v rises by a every second; x = ½at²', () => {
    const gaps = [1, 2, 3, 4].map((t) => accPosition(t) - accPosition(t - 1))
    for (let i = 1; i < gaps.length; i++) expect(gaps[i] - gaps[i - 1]).toBeCloseTo(ACC.a, 10)
    for (let t = 1; t <= ACC.T; t++) expect(accVelocity(t) - accVelocity(t - 1)).toBeCloseTo(ACC.a, 10)
  })

  it('relative motion: velocities add along a frame, v_AB = v_A − v_B', () => {
    expect(REL.train + REL.walker).toBe(25)
    expect(relativeVelocity(REL.car, REL.train)).toBe(-35)
    expect(texts(buildRelativeMotionScene())).toContain('−15 − 20 = −35 m/s')
  })

  it('tension: a = F/(m₁+m₂) = 4 m/s², T = m₂a = 8 N, and F − T = m₁a', () => {
    expect(towAcceleration()).toBe(4)
    expect(towTension()).toBe(8)
    expect(TOW.F - towTension()).toBeCloseTo(TOW.m1 * towAcceleration(), 10)
    const tensions = objs(buildTensionScene()).filter((o) => o.type === 'arrow' && Math.abs(o.to![0] - o.from![0]) < 1)
    expect(tensions).toHaveLength(2)
    expect(tensions[0].to![0] - tensions[0].from![0]).toBeCloseTo(-(tensions[1].to![0] - tensions[1].from![0]), 6)
  })

  it('conservative forces: gravity\'s work is −mgΔh on both routes; friction\'s grows with path length', () => {
    expect(gravityWork()).toBeCloseTo(-CONS.m * CONS.g * 3, 10)
    const straight = pathLength([[CONS.A[0], CONS.A[1]], [CONS.B[0], CONS.B[1]]]), curved = pathLength(curvedPath())
    expect(straight).toBeCloseTo(5, 10)
    expect(curved).toBeGreaterThan(straight)
  })

  it('angular momentum: L = mvr = Iω = 3 kg·m²/s', () => {
    const { I, w, L } = angularMomentum()
    expect(I).toBe(SPIN.m * SPIN.r ** 2)
    expect(L).toBeCloseTo(SPIN.m * SPIN.v * SPIN.r, 10)
    expect(L).toBeCloseTo(I * w, 10)
  })

  it('conservation of angular momentum: I₁ω₁ = I₂ω₂, while kinetic energy rises', () => {
    const { w2, L, K1, K2 } = skaterSpin()
    expect(SKATER.I2 * w2).toBeCloseTo(L, 10)
    expect(w2).toBeCloseTo(5, 10)
    expect(K2).toBeGreaterThan(K1)
  })

  it('processes: isothermal keeps PV; adiabatic falls below it on expansion', () => {
    expect(isothermalP(TP.V1) * TP.V1).toBeCloseTo(TP.P0 * TP.V0, 10)
    expect(adiabaticP(TP.V1)).toBeLessThan(isothermalP(TP.V1))
    expect(adiabaticP(TP.V1) * TP.V1 ** TP.gamma).toBeCloseTo(TP.P0 * TP.V0 ** TP.gamma, 10)
  })

  it('Carnot: the four corners lie on the two isotherms and adiabats; η = 1 − T_c/T_h = 0.4', () => {
    const [s1, s2, s3, s4] = carnotStates(), T = ([V, p]: [number, number]) => (p * V) / CARNOT.k
    expect(T(s1)).toBeCloseTo(CARNOT.Th, 8); expect(T(s2)).toBeCloseTo(CARNOT.Th, 8)
    expect(T(s3)).toBeCloseTo(CARNOT.Tc, 8); expect(T(s4)).toBeCloseTo(CARNOT.Tc, 8)
    const adi = ([V, p]: [number, number]) => p * V ** CARNOT.gamma
    expect(adi(s2)).toBeCloseTo(adi(s3), 8); expect(adi(s4)).toBeCloseTo(adi(s1), 8)
    expect(carnotEfficiency()).toBeCloseTo(0.4, 10)
  })

  it('resistivity: R = ρL/A — doubling L doubles R, doubling A halves it', () => {
    const R0 = resistance(WIRE.rho, WIRE.L, WIRE.A)
    expect(R0).toBeCloseTo(0.168, 6)
    expect(resistance(WIRE.rho, 2 * WIRE.L, WIRE.A)).toBeCloseTo(2 * R0, 12)
    expect(resistance(WIRE.rho, WIRE.L, 2 * WIRE.A)).toBeCloseTo(R0 / 2, 12)
  })

  it('EMF: I = E/(R + r) = 2 A and V = E − Ir = IR = 11 V', () => {
    expect(cellCurrent()).toBe(2)
    expect(terminalVoltage()).toBe(11)
    expect(terminalVoltage()).toBeCloseTo(cellCurrent() * CELL.R, 10)
  })

  it('Schrödinger: the mixed state sloshes (mirror image at T/2), stays normalised', () => {
    for (const x of [0.2, 0.35]) expect(mixDensity(x, 0.5)).toBeCloseTo(mixDensity(1 - x, 0), 10)
    let norm = 0; const n = 2000
    for (let i = 0; i < n; i++) norm += mixDensity((i + 0.5) / n, 0.3) / n
    expect(norm).toBeCloseTo(1, 4)
    expect(boxPhi(1, 0.5) ** 2).toBeCloseTo(2, 10)
  })

  it('selection rules: Δl = ±1 allowed; 2s→1s and 3d→1s forbidden; Lyman-α = 10.2 eV', () => {
    const l = (n: string) => LEVELS.find((v) => v.name === n)!.l
    expect(TRANSITIONS.filter(([a, b]) => !allowedTransition(l(a), l(b)))).toEqual([['2s', '1s'], ['3d', '1s']])
    expect(hydrogenE(2) - hydrogenE(1)).toBeCloseTo(10.2, 10)
  })
})
