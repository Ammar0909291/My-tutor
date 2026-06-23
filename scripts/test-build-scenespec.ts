/**
 * Standalone test harness for buildSceneSpec.ts — the only currently-LIVE piece of the
 * visualization pipeline (wired into api/learn/chat/route.ts since commit 0e212a8). Pure —
 * no DB, no network, no Groq. Run with:  npx tsx scripts/test-build-scenespec.ts
 *
 * Covers: each regex trigger firing on its intended keyword(s), the narrowed MOLECULE_RE
 * regression (must NOT fire on bare electron/proton/neutron/orbital, per tonight's fix),
 * the no-match → null path, and structural validation of all 3 templates via the real
 * validateSceneSpec() (reused, not reinvented).
 */

import { buildSceneSpec } from '../src/lib/teaching/buildSceneSpec'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'

type Case = {
  name: string
  text: string
  expectNull: boolean
  /** For non-null cases: expected scene id, to confirm which template fired. */
  expectId?: string
}

const CASES: Case[] = [
  // ── VECTOR_RE ──
  { name: 'vector keyword fires vectorScene', text: 'A vector has magnitude and direction.', expectNull: false, expectId: 'auto-vector' },
  { name: 'force keyword fires vectorScene', text: 'The net force acting on the box is 10N.', expectNull: false, expectId: 'auto-vector' },
  { name: 'velocity keyword fires vectorScene', text: 'Velocity is the rate of change of position.', expectNull: false, expectId: 'auto-vector' },
  { name: 'displacement keyword fires vectorScene', text: 'Displacement is a vector quantity, unlike distance.', expectNull: false, expectId: 'auto-vector' },
  { name: 'acceleration keyword fires vectorScene', text: 'Acceleration is the second derivative of position.', expectNull: false, expectId: 'auto-vector' },

  // ── MOLECULE_RE ──
  { name: 'atom keyword fires moleculeScene', text: 'An atom is the smallest unit of an element.', expectNull: false, expectId: 'auto-molecule' },
  { name: 'molecule keyword fires moleculeScene', text: 'Water is a molecule made of two elements.', expectNull: false, expectId: 'auto-molecule' },
  { name: 'bond keyword fires moleculeScene', text: 'A covalent bond shares electron pairs.', expectNull: false, expectId: 'auto-molecule' },

  // ── MOLECULE_RE narrowing regression (tonight's fix) ──
  // These bare words must NOT trigger moleculeScene anymore — they're handled correctly
  // elsewhere by detectVisual.ts's phrase-based rules, which run before this and gate it off.
  { name: 'REGRESSION — bare "electron" alone does not fire moleculeScene', text: 'An electron carries negative charge.', expectNull: true },
  { name: 'REGRESSION — bare "proton" alone does not fire moleculeScene', text: 'A proton carries positive charge.', expectNull: true },
  { name: 'REGRESSION — bare "neutron" alone does not fire moleculeScene', text: 'A neutron has no electric charge.', expectNull: true },
  { name: 'REGRESSION — bare "orbital" alone does not fire moleculeScene', text: 'Each orbital can hold up to two electrons.', expectNull: true },

  // ── COORD_3D_RE ──
  { name: '"3d" keyword fires coordSpaceScene', text: 'Let\'s plot this point in 3D space.', expectNull: false, expectId: 'auto-coord-space' },
  { name: '"three-dimensional" keyword fires coordSpaceScene', text: 'This is a three-dimensional coordinate system.', expectNull: false, expectId: 'auto-coord-space' },
  { name: '"coordinate space" keyword fires coordSpaceScene', text: 'Points are located using coordinate space.', expectNull: false, expectId: 'auto-coord-space' },
  {
    name: '"x-axis...y-axis...z-axis" keyword fires coordSpaceScene',
    text: 'The x-axis, y-axis, and z-axis are mutually perpendicular.',
    expectNull: false,
    expectId: 'auto-coord-space',
  },

  // ── Precedence: MOLECULE_RE checked before VECTOR_RE before COORD_3D_RE ──
  {
    name: 'PRECEDENCE — text matching both molecule and vector keywords picks moleculeScene (checked first)',
    text: 'The force holding atoms together in a bond.',
    expectNull: false,
    expectId: 'auto-molecule',
  },

  // ── No match at all ──
  { name: 'no matching keyword returns null', text: 'The mitochondria is the powerhouse of the cell.', expectNull: true },
  { name: 'empty string returns null', text: '', expectNull: true },
]

let pass = 0
let fail = 0

console.log('\n=== buildSceneSpec harness ===\n')

for (const c of CASES) {
  const result = buildSceneSpec(c.text)
  const isNull = result == null
  const nullOk = isNull === c.expectNull
  const idOk = c.expectNull || c.expectId == null ? true : result?.id === c.expectId
  const ok = nullOk && idOk

  if (ok) pass++
  else fail++

  console.log(`[${ok ? '✓ pass' : '✗ FAIL'}] ${c.name}`)
  console.log(`  text: "${c.text}"`)
  console.log(`  expected: ${c.expectNull ? 'null' : `non-null, id="${c.expectId}"`}`)
  console.log(`  got:      ${isNull ? 'null' : `non-null, id="${result?.id}"`}`)
  if (!nullOk) console.log('  !! null/non-null mismatch')
  if (!idOk) console.log(`  !! expected id "${c.expectId}", got "${result?.id}"`)
  console.log('')
}

// ── Structural validation of all 3 templates via the real validator ──
console.log('=== template structural validation (validateSceneSpec) ===\n')

const templateCases: { name: string; text: string }[] = [
  { name: 'vectorScene()', text: 'vector' },
  { name: 'moleculeScene()', text: 'molecule' },
  { name: 'coordSpaceScene()', text: '3d' },
]

for (const t of templateCases) {
  const spec = buildSceneSpec(t.text)
  if (spec == null) {
    console.log(`[✗ FAIL] ${t.name} — buildSceneSpec returned null, cannot validate`)
    fail++
    continue
  }
  const result = validateSceneSpec(spec)
  const ok = result.valid
  if (ok) pass++
  else fail++

  console.log(`[${ok ? '✓ pass' : '✗ FAIL'}] ${t.name} passes validateSceneSpec`)
  console.log(`  valid: ${result.valid}`)
  for (const e of result.errors) console.log(`  • ${e.path}: ${e.message}`)
  console.log('')
}

console.log(`=== ${pass} passed, ${fail} failed (of ${pass + fail}) ===\n`)
process.exit(fail === 0 ? 0 : 1)
