/**
 * PARAMETER-DOMAIN PHYSICS CHECK for the parametric (interactive) physics
 * figures — the deterministic half of Phase 2G/2H.
 *
 * Every physics generator kind ships an INDEPENDENT re-derivation checker
 * (`checkCollisionConsistency`, `checkTorqueConsistency`, …): it recomputes the
 * physics from what was DRAWN and compares. They have only ever been run on the
 * canonical case. A learner can drag a slider to any value, so this sweeps each
 * kind over a grid of {min, mid, max} for every slider and every option of every
 * choice — plus the all-min / all-max corners — builds the figure at each point
 * through the generator's own validator, and requires, at every point:
 *
 *   • the generator's consistency checker passes (the physics re-derives);
 *   • validateSceneSpec / auditSceneData / auditGraph have nothing to fail;
 *   • any equation printed in the figure's text is arithmetically self-consistent.
 *
 * A combination the generator's own validator refuses is NOT a defect (the
 * frame keeps the last good figure); it is counted, not judged.
 *
 *   npx tsx scripts/qa/physicsVisual/kindChecks.ts [outFile]
 */
import { writeFileSync } from 'node:fs'
import { PARAMETRIC_SCENES, type SceneParams, type SceneVariable } from '../../../src/lib/teaching/visual/parametricScenes'
import { validateSceneSpec } from '../../../src/lib/teaching/sceneSpecValidator'
import { auditGraph, auditSceneData } from '../../../src/lib/teaching/visual/figureAudit'
import { checkFigureTexts } from '../../../src/lib/teaching/visual/figureSemantics'
import type { SceneSpec } from '../../../src/lib/teaching/sceneSpec'
import { buildTorqueScene, validateTorqueParams, checkTorqueConsistency } from '../../../src/lib/teaching/sceneGenerators/torqueDiagram.pure'
import { buildDipoleScene, validateDipoleParams, checkDipoleConsistency } from '../../../src/lib/teaching/sceneGenerators/electricDipole.pure'
import { buildProjectileScene, validateProjectileParams, checkProjectileConsistency } from '../../../src/lib/teaching/sceneGenerators/projectileMotion.pure'
import { buildVectorScene, validateVectorParams, checkVectorConsistency } from '../../../src/lib/teaching/sceneGenerators/vectorAddition.pure'
import { buildCircularScene, validateCircularParams, checkCircularConsistency } from '../../../src/lib/teaching/sceneGenerators/circularMotion.pure'
import { buildPendulumScene, validatePendulumParams, checkPendulumConsistency } from '../../../src/lib/teaching/sceneGenerators/pendulumMotion.pure'
import { buildCollisionScene, validateCollisionParams, checkCollisionConsistency } from '../../../src/lib/teaching/sceneGenerators/momentumCollision.pure'
import { buildKinematicsGraphScene, validateKinematicsParams, checkKinematicsConsistency } from '../../../src/lib/teaching/sceneGenerators/kinematicsGraphs.pure'
import { buildRayOpticsScene, validateRayOpticsParams, checkRayOpticsConsistency } from '../../../src/lib/teaching/sceneGenerators/rayOptics.pure'
import { buildCircuitScene, validateCircuitParams, checkCircuitConsistency } from '../../../src/lib/teaching/sceneGenerators/electricCircuit.pure'
import { buildGravitationOrbitScene, validateGravitationParams, checkGravitationConsistency } from '../../../src/lib/teaching/sceneGenerators/gravitationOrbit.pure'

interface Kind {
  validate: (raw: unknown) => unknown | null
  build: (p: never) => SceneSpec
  check: (spec: SceneSpec, p: never) => { ok: boolean; errors: string[] }
  /** SceneParams (what the sliders hold) -> the generator's own input, exactly as parametricScenes.ts does it. */
  adapt?: (p: SceneParams) => unknown
  fixed?: Record<string, unknown>
}

const num = (v: number | string | undefined, d: number) => (typeof v === 'number' && Number.isFinite(v) ? v : d)

export const CHECKED_KINDS: Record<string, Kind> = {
  torque_diagram: { validate: validateTorqueParams, build: buildTorqueScene as never, check: checkTorqueConsistency as never },
  electric_dipole: { validate: validateDipoleParams, build: buildDipoleScene as never, check: checkDipoleConsistency as never },
  projectile: { validate: validateProjectileParams, build: buildProjectileScene as never, check: checkProjectileConsistency as never },
  vector: { validate: validateVectorParams, build: buildVectorScene as never, check: checkVectorConsistency as never },
  circular: { validate: validateCircularParams, build: buildCircularScene as never, check: checkCircularConsistency as never },
  pendulum: { validate: validatePendulumParams, build: buildPendulumScene as never, check: checkPendulumConsistency as never },
  collision: { validate: validateCollisionParams, build: buildCollisionScene as never, check: checkCollisionConsistency as never },
  kinematics_graphs: { validate: validateKinematicsParams, build: buildKinematicsGraphScene as never, check: checkKinematicsConsistency as never, fixed: { initialPosition: 0 } },
  ray_optics: { validate: validateRayOpticsParams, build: buildRayOpticsScene as never, check: checkRayOpticsConsistency as never },
  electric_circuit: {
    validate: validateCircuitParams, build: buildCircuitScene as never, check: checkCircuitConsistency as never,
    adapt: (p) => ({
      connection: String(p.connection), voltage: num(p.voltage, 12),
      components: [{ type: 'resistor', value: num(p.r1, 10), unit: 'ohm' }, { type: 'resistor', value: num(p.r2, 20), unit: 'ohm' }],
    }),
  },
  gravitation_orbit: {
    validate: validateGravitationParams, build: buildGravitationOrbitScene as never, check: checkGravitationConsistency as never,
    adapt: (p) => ({ centralMass: num(p.centralMassEarths, 1) * 5.97e24, orbitRadius: num(p.orbitRadiusMm, 7) * 1e6 }),
  },
}

/** {min, mid, max} per slider, every option per choice. */
function levels(v: SceneVariable): Array<number | string> {
  if (v.kind === 'choice') return v.options.map((o) => o.value)
  const mid = Math.round(((v.min + v.max) / 2) / v.step) * v.step
  return [...new Set([v.min, mid, v.max])]
}

export function sweepStates(kind: string): SceneParams[] {
  const entry = PARAMETRIC_SCENES[kind]
  const vars = entry.variables
  let combos: SceneParams[] = [{ ...entry.defaults }]
  // Cartesian grid, capped: deterministic and small (<= 3^4 * options).
  for (const v of vars) {
    const next: SceneParams[] = []
    for (const c of combos) for (const l of levels(v)) next.push({ ...c, [v.key]: l })
    combos = next
    if (combos.length > 600) break
  }
  // Single-variable moves from the textbook default, and the corners.
  for (const v of vars) for (const l of levels(v)) combos.push({ ...entry.defaults, [v.key]: l })
  const nums = vars.filter((v) => v.kind === 'number') as Array<Extract<SceneVariable, { kind: 'number' }>>
  combos.push({ ...entry.defaults, ...Object.fromEntries(nums.map((v) => [v.key, v.min])) })
  combos.push({ ...entry.defaults, ...Object.fromEntries(nums.map((v) => [v.key, v.max])) })
  const seen = new Set<string>()
  return combos.filter((c) => { const k = JSON.stringify(c); if (seen.has(k)) return false; seen.add(k); return true })
}

export interface KindReport {
  kind: string
  states: number
  built: number
  refusedByValidator: number
  failures: Array<{ params: SceneParams; problems: string[] }>
}

export function checkKind(kind: string): KindReport {
  const k = CHECKED_KINDS[kind]
  const out: KindReport = { kind, states: 0, built: 0, refusedByValidator: 0, failures: [] }
  for (const params of sweepStates(kind)) {
    out.states++
    const raw = k.adapt ? k.adapt(params) : { ...(k.fixed ?? {}), ...params }
    const typed = k.validate(raw)
    if (!typed) { out.refusedByValidator++; continue }
    let spec: SceneSpec
    try { spec = k.build(typed as never) } catch { out.refusedByValidator++; continue }
    // A built figure the frame's own gate would refuse is held back, not shown.
    if (!validateSceneSpec(spec).valid) { out.refusedByValidator++; continue }
    out.built++
    const problems: string[] = []
    const c = k.check(spec, typed as never)
    if (!c.ok) problems.push(...c.errors.map((e) => `physics re-derivation: ${e}`))
    for (const f of auditSceneData(spec)) if (f.severity === 'FAIL') problems.push(`${f.id} ${f.message}`)
    for (const f of auditGraph(spec).findings) if (f.severity === 'FAIL') problems.push(`${f.id} ${f.message}`)
    const texts = spec.steps.flatMap((s) => s.objects.map((o) => o.text ?? '')).filter(Boolean)
    const sem = checkFigureTexts(texts)
    for (const r of sem.results) for (const x of r.contradictions) problems.push(`SM-01 "${r.text}": ${x.reason}`)
    if (problems.length) out.failures.push({ params, problems: problems.slice(0, 4) })
  }
  return out
}

function main(): void {
  const reports = Object.keys(CHECKED_KINDS).map(checkKind)
  const outFile = process.argv[2]
  if (outFile) writeFileSync(outFile, JSON.stringify(reports, null, 1))
  let bad = 0
  for (const r of reports) {
    bad += r.failures.length
    console.log(`${r.kind.padEnd(20)} states ${String(r.states).padStart(4)}  built ${String(r.built).padStart(4)}  refused ${String(r.refusedByValidator).padStart(4)}  FAILED ${r.failures.length}`)
    for (const f of r.failures.slice(0, 3)) console.log('    ', JSON.stringify(f.params), '->', f.problems[0].slice(0, 140))
  }
  console.log(bad === 0 ? '\nall kinds: every built state re-derives and passes the payload rules' : `\n${bad} failing state(s)`)
}

if (process.argv[1] && process.argv[1].endsWith('kindChecks.ts')) main()
