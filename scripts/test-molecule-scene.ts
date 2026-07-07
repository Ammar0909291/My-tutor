/**
 * Test harness for the deterministic molecular-geometry scene generator
 * (src/lib/teaching/sceneGenerators/moleculeGeometry.ts). VSEPR-table driven,
 * Groq-free for everything tested here.
 *
 * KEY TEST: the probe case — water — must render BENT at ~104.5°, recomputed
 * from the atom coordinates, NOT the linear shape the old free-form generator
 * produced.
 *
 * extractMolecule()/generateMoleculeScene() call the LLM and are NOT tested here.
 *
 * Run with:  npx tsx scripts/test-molecule-scene.ts
 */

import {
  buildMoleculeScene,
  checkMoleculeConsistency,
  lookupMolecule,
} from '../src/lib/teaching/sceneGenerators/moleculeGeometry'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'
import type { Vec3 } from '../src/lib/teaching/sceneSpec'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

function angleAt(c: Vec3, a: Vec3, b: Vec3): number {
  const u = [a[0] - c[0], a[1] - c[1], a[2] - c[2]]
  const w = [b[0] - c[0], b[1] - c[1], b[2] - c[2]]
  const dot = u[0] * w[0] + u[1] * w[1] + u[2] * w[2]
  const mag = Math.hypot(...u) * Math.hypot(...w)
  return (Math.acos(Math.max(-1, Math.min(1, dot / mag))) * 180) / Math.PI
}

function atoms(spec: ReturnType<typeof buildMoleculeScene>) {
  const objs = spec.steps.flatMap((s) => s.objects)
  const central = objs.find((o) => o.id === 'central')!.position as Vec3
  const peripheral = objs.filter((o) => /^p\d+$/.test(o.id ?? '')).map((o) => o.position as Vec3)
  return { central, peripheral }
}

console.log('\n=== molecular-geometry deterministic scene harness ===\n')

// ── The probe case: water (must be BENT ~104.5°, not linear) ─────────────────
const water = lookupMolecule('the water molecule H2O')!
check('water looked up from text', water?.name === 'Water')
const wSpec = buildMoleculeScene(water)
check('water — structurally valid SceneSpec', validateSceneSpec(wSpec).valid,
  JSON.stringify(validateSceneSpec(wSpec).errors))
check('water — passes bond-angle consistency check', checkMoleculeConsistency(wSpec, water).ok,
  checkMoleculeConsistency(wSpec, water).errors.join('; '))

const w = atoms(wSpec)
const wAngle = angleAt(w.central, w.peripheral[0], w.peripheral[1])
check('water H–O–H angle recomputed ≈ 104.5° (BENT, the probe failure fixed)', Math.abs(wAngle - 104.5) < 0.5,
  `got ${wAngle.toFixed(2)}°`)
check('water is NOT linear (the exact wrong free-form output)', wAngle < 175)

// ── Other geometries generalize correctly ────────────────────────────────────
const co2 = lookupMolecule('CO2')!
const co2Spec = buildMoleculeScene(co2)
const c = atoms(co2Spec)
check('CO2 is linear (180°)', Math.abs(angleAt(c.central, c.peripheral[0], c.peripheral[1]) - 180) < 0.5)
check('CO2 — valid + consistent', validateSceneSpec(co2Spec).valid && checkMoleculeConsistency(co2Spec, co2).ok)

const nh3 = lookupMolecule('ammonia')!
const nh3Spec = buildMoleculeScene(nh3)
const n = atoms(nh3Spec)
check('NH3 trigonal pyramidal — all three H–N–H angles ≈ 107°', (() => {
  const a01 = angleAt(n.central, n.peripheral[0], n.peripheral[1])
  const a02 = angleAt(n.central, n.peripheral[0], n.peripheral[2])
  const a12 = angleAt(n.central, n.peripheral[1], n.peripheral[2])
  return [a01, a02, a12].every((a) => Math.abs(a - 107) < 0.5)
})())
check('NH3 — valid + consistent', validateSceneSpec(nh3Spec).valid && checkMoleculeConsistency(nh3Spec, nh3).ok)

const ch4 = lookupMolecule('methane CH4')!
const ch4Spec = buildMoleculeScene(ch4)
const m = atoms(ch4Spec)
check('CH4 tetrahedral — a representative H–C–H angle ≈ 109.5°',
  Math.abs(angleAt(m.central, m.peripheral[0], m.peripheral[1]) - 109.47) < 0.6)
check('CH4 — valid + consistent', validateSceneSpec(ch4Spec).valid && checkMoleculeConsistency(ch4Spec, ch4).ok)

const bf3 = lookupMolecule('boron trifluoride BF3')!
const bf3Spec = buildMoleculeScene(bf3)
const b = atoms(bf3Spec)
check('BF3 trigonal planar — F–B–F ≈ 120°', Math.abs(angleAt(b.central, b.peripheral[0], b.peripheral[1]) - 120) < 0.5)
check('BF3 — valid + consistent', validateSceneSpec(bf3Spec).valid && checkMoleculeConsistency(bf3Spec, bf3).ok)

// ── Unknown molecule → null (don't fabricate geometry) ───────────────────────
check('unknown molecule returns null', lookupMolecule('xenon hexafluoride') === null)

// ── Malformed LLM output → null, never throws (the type guard at line 49) ────
check('non-string input (null) → null', lookupMolecule(null) === null)
check('non-string input (number) → null', lookupMolecule(42) === null)
check('non-string input (object) → null', lookupMolecule({ name: 'Water' }) === null)
check('empty string → null', lookupMolecule('') === null)

// ── Ambiguous text (two molecule names present) → longest alias wins ─────────
// "methane" (7 chars) outscores "water" (5 chars), so a text mentioning both
// resolves toward the longer, more specific match — documents the real,
// deterministic tie-break rule rather than leaving it unverified.
check('text naming both "water" and "methane" → longest alias (methane) wins',
  lookupMolecule('unlike water, methane is nonpolar')?.name === 'Methane')

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
