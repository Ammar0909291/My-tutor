/**
 * Standalone test harness for sceneSpecValidator. Pure — no DB, no network, no Groq.
 * Run with:  npx tsx scripts/test-scenespec-validator.ts
 *
 * Proves the validator ACCEPTS the one real hand-authored SceneSpec and REJECTS each
 * deliberately-broken variant with a clearly located error. Exits non-zero on any mismatch.
 */

import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'
import { vectorVisualizationSpec } from '../src/lib/teaching/sceneSpecExamples'

type Case = {
  name: string
  spec: unknown
  expectValid: boolean
  /** For invalid cases: a substring expected to appear in at least one error path. */
  expectErrorPath?: string
}

/** A minimal valid spec we mutate per case (so each break is isolated). */
function baseValid(): Record<string, unknown> {
  return {
    id: 'base',
    title: 'Base',
    sceneType: 'diagram',
    steps: [{ narration: 'one', objects: [{ type: 'point', position: [0, 0, 0] }] }],
  }
}

const CASES: Case[] = [
  // 1. known-good real example — MUST pass.
  { name: 'known-good real vectorVisualizationSpec', spec: vectorVisualizationSpec, expectValid: true },

  // 2. missing title.
  { name: 'missing title', spec: { ...baseValid(), title: undefined }, expectValid: false, expectErrorPath: 'title' },

  // 3. invalid sceneType literal.
  { name: 'invalid sceneType "hologram"', spec: { ...baseValid(), sceneType: 'hologram' }, expectValid: false, expectErrorPath: 'sceneType' },

  // 4. empty steps.
  { name: 'empty steps array', spec: { ...baseValid(), steps: [] }, expectValid: false, expectErrorPath: 'steps' },

  // 5. NaN coordinate.
  {
    name: 'NaN coordinate in position',
    spec: { ...baseValid(), steps: [{ objects: [{ type: 'point', position: [0, NaN, 1] }] }] },
    expectValid: false, expectErrorPath: 'position[1]',
  },

  // 6. wrong-length Vec3.
  {
    name: 'length-2 Vec3 in from',
    spec: { ...baseValid(), steps: [{ objects: [{ type: 'vector', from: [0, 0], to: [1, 1, 1] }] }] },
    expectValid: false, expectErrorPath: 'from',
  },

  // 7. out-of-bounds coordinate.
  {
    name: 'coordinate beyond plausible bound',
    spec: { ...baseValid(), steps: [{ objects: [{ type: 'point', position: [99999, 0, 0] }] }] },
    expectValid: false, expectErrorPath: 'position[0]',
  },

  // 8. type-geometry mismatch: vector with no endpoints.
  {
    name: 'vector missing from/to',
    spec: { ...baseValid(), steps: [{ objects: [{ type: 'vector', position: [0, 0, 0] }] }] },
    expectValid: false, expectErrorPath: 'from',
  },

  // 9. duplicate object id.
  {
    name: 'duplicate object id across steps',
    spec: {
      ...baseValid(),
      steps: [
        { objects: [{ type: 'point', id: 'v1', position: [0, 0, 0] }] },
        { objects: [{ type: 'point', id: 'v1', position: [1, 1, 1] }] },
      ],
    },
    expectValid: false, expectErrorPath: 'id',
  },

  // 10. invalid object type literal.
  {
    name: 'invalid object type "banana"',
    spec: { ...baseValid(), steps: [{ objects: [{ type: 'banana', position: [0, 0, 0] }] }] },
    expectValid: false, expectErrorPath: 'type',
  },

  // bonus 11. completely wrong root type (LLM returns a string).
  { name: 'root is not an object', spec: 'not a scene', expectValid: false, expectErrorPath: '(root)' },

  // bonus 12. textless label.
  {
    name: 'label with no text',
    spec: { ...baseValid(), steps: [{ objects: [{ type: 'label', position: [0, 0, 0] }] }] },
    expectValid: false, expectErrorPath: 'text',
  },
]

let pass = 0
let fail = 0

console.log('\n=== SceneSpec validator harness ===\n')

for (const c of CASES) {
  const r = validateSceneSpec(c.spec)
  const validOk = r.valid === c.expectValid
  const pathOk =
    c.expectValid || c.expectErrorPath == null
      ? true
      : r.errors.some((e) => e.path.includes(c.expectErrorPath!))
  const ok = validOk && pathOk

  if (ok) pass++
  else fail++

  console.log(`[${ok ? '✓ pass' : '✗ FAIL'}] ${c.name}`)
  console.log(`  expected: valid=${c.expectValid}${c.expectErrorPath ? ` errorPath~"${c.expectErrorPath}"` : ''}`)
  console.log(`  got:      valid=${r.valid}`)
  for (const e of r.errors) console.log(`            • ${e.path}: ${e.message}`)
  if (!validOk) console.log('  !! valid flag mismatch')
  if (!pathOk) console.log(`  !! no error path matched "${c.expectErrorPath}"`)
  console.log('')
}

console.log(`=== ${pass} passed, ${fail} failed (of ${CASES.length}) ===\n`)
process.exit(fail === 0 ? 0 : 1)
