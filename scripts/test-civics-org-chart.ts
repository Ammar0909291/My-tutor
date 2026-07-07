/**
 * Test harness for the deterministic civics organizational-chart scene
 * generator (src/lib/teaching/sceneGenerators/civicsOrgChart.ts). Pure tree
 * layout — no Groq.
 *
 * Verifies by independent recomputation: every non-root node has exactly one
 * parent that genuinely exists in the scene, no cycles (every parent
 * reference points strictly upward), and node counts match the input.
 *
 * extractOrgChartParams() calls the LLM and is NOT tested here.
 *
 * Run with:  npx tsx scripts/test-civics-org-chart.ts
 */

import {
  buildOrgChartScene,
  checkOrgChartConsistency,
  validateOrgChartParams,
  type OrgChartParams,
} from '../src/lib/teaching/sceneGenerators/civicsOrgChart'
import { validateSceneSpec } from '../src/lib/teaching/sceneSpecValidator'
import type { SceneObject } from '../src/lib/teaching/sceneSpec'

let pass = 0
let fail = 0
function check(name: string, cond: boolean, extra?: string) {
  if (cond) pass++
  else fail++
  console.log(`[${cond ? '✓ pass' : '✗ FAIL'}] ${name}${extra && !cond ? `  — ${extra}` : ''}`)
}

const obj = (spec: ReturnType<typeof buildOrgChartScene>, id: string): SceneObject | undefined =>
  spec.steps.flatMap((s) => s.objects).find((o) => o.id === id)

console.log('\n=== civics org-chart deterministic scene harness ===\n')

// ── Two levels: root + 2 level-1 nodes + 4 level-2 nodes (round-robin parents) ─
const twoLevel: OrgChartParams = {
  institutionName: 'The Parliament of India',
  nodes: [
    { level: 1, name: 'Lok Sabha', role: 'Lower House' },
    { level: 1, name: 'Rajya Sabha', role: 'Upper House' },
    { level: 2, name: 'Speaker', role: 'Presiding Officer' },
    { level: 2, name: 'Deputy Speaker', role: 'Deputy Presiding Officer' },
    { level: 2, name: 'Chairman', role: 'Presiding Officer' },
    { level: 2, name: 'Deputy Chairman', role: 'Deputy Presiding Officer' },
  ],
}
const specTwoLevel = buildOrgChartScene(twoLevel)

check('two-level — structurally valid SceneSpec', validateSceneSpec(specTwoLevel).valid, JSON.stringify(validateSceneSpec(specTwoLevel).errors))
check('two-level — passes independent consistency check', checkOrgChartConsistency(specTwoLevel, twoLevel).ok,
  checkOrgChartConsistency(specTwoLevel, twoLevel).errors.join('; '))
check('two-level — has 2 steps (level-1 then level-2)', specTwoLevel.steps.length === 2)
check('two-level — root name matches institutionName', (obj(specTwoLevel, 'node-root')!.properties as Record<string, unknown>).name === 'The Parliament of India')
check('two-level — every level-1 node has parentId "node-root"', ['node-1-0', 'node-1-1'].every((id) =>
  (obj(specTwoLevel, id)!.properties as Record<string, unknown>).parentId === 'node-root'))
check('two-level — level-2 nodes round-robin onto the 2 level-1 parents', (() => {
  const parents = ['node-2-0', 'node-2-1', 'node-2-2', 'node-2-3'].map((id) => (obj(specTwoLevel, id)!.properties as Record<string, unknown>).parentId)
  return parents[0] === 'node-1-0' && parents[1] === 'node-1-1' && parents[2] === 'node-1-0' && parents[3] === 'node-1-1'
})())
check('two-level — every level-2 parent reference genuinely exists in the scene', ['node-2-0', 'node-2-1', 'node-2-2', 'node-2-3'].every((id) => {
  const parentId = (obj(specTwoLevel, id)!.properties as Record<string, unknown>).parentId as string
  return obj(specTwoLevel, parentId) !== undefined
}))
check('two-level — node count matches root + nodes.length', specTwoLevel.steps.flatMap((s) => s.objects).filter((o) => o.type === 'node').length === 1 + twoLevel.nodes.length)
check('two-level — edges connect every node to its parent', ['edge-root-1-0', 'edge-root-1-1', 'edge-1-2-0', 'edge-1-2-1', 'edge-1-2-2', 'edge-1-2-3'].every((id) => obj(specTwoLevel, id) !== undefined))

// ── One level only: root + 3 level-1 nodes, no level-2 ────────────────────────
const oneLevel: OrgChartParams = {
  institutionName: 'The Federal Government',
  nodes: [
    { level: 1, name: 'Executive', role: 'Branch' },
    { level: 1, name: 'Legislature', role: 'Branch' },
    { level: 1, name: 'Judiciary', role: 'Branch' },
  ],
}
const specOneLevel = buildOrgChartScene(oneLevel)

check('one-level — structurally valid SceneSpec', validateSceneSpec(specOneLevel).valid, JSON.stringify(validateSceneSpec(specOneLevel).errors))
check('one-level — passes independent consistency check', checkOrgChartConsistency(specOneLevel, oneLevel).ok,
  checkOrgChartConsistency(specOneLevel, oneLevel).errors.join('; '))
check('one-level — has only 1 step (no level-2 nodes)', specOneLevel.steps.length === 1)
check('one-level — node count is root + 3', specOneLevel.steps.flatMap((s) => s.objects).filter((o) => o.type === 'node').length === 4)

// ── Single level-1 parent: all level-2 nodes share the same parent ────────────
const singleParent: OrgChartParams = {
  institutionName: 'The Supreme Court',
  nodes: [
    { level: 1, name: 'Chief Justice Bench', role: 'Head' },
    { level: 2, name: 'Constitution Bench', role: 'Special Bench' },
    { level: 2, name: 'Division Bench', role: 'Regular Bench' },
  ],
}
const specSingleParent = buildOrgChartScene(singleParent)
check('single-parent — passes independent consistency check', checkOrgChartConsistency(specSingleParent, singleParent).ok,
  checkOrgChartConsistency(specSingleParent, singleParent).errors.join('; '))
check('single-parent — both level-2 nodes share the one level-1 parent', (() => {
  const p0 = (obj(specSingleParent, 'node-2-0')!.properties as Record<string, unknown>).parentId
  const p1 = (obj(specSingleParent, 'node-2-1')!.properties as Record<string, unknown>).parentId
  return p0 === 'node-1-0' && p1 === 'node-1-0'
})())

// ── Parameter validation ─────────────────────────────────────────────────────
check('reject empty institutionName', validateOrgChartParams({ institutionName: '', nodes: [{ level: 1, name: 'X', role: 'Y' }] }) === null)
check('reject empty nodes array', validateOrgChartParams({ institutionName: 'X', nodes: [] }) === null)
check('reject more than 7 nodes (root + nodes must be ≤ 8 total)', validateOrgChartParams({
  institutionName: 'X',
  nodes: Array.from({ length: 8 }, (_, i) => ({ level: 1, name: `N${i}`, role: 'R' })),
}) === null)
check('reject level-2 node with no level-1 parent available', validateOrgChartParams({
  institutionName: 'X',
  nodes: [{ level: 2, name: 'Orphan', role: 'Role' }],
}) === null)
check('reject node with invalid level (3)', validateOrgChartParams({
  institutionName: 'X',
  nodes: [{ level: 3, name: 'N', role: 'R' }],
}) === null)
check('accept a valid set', validateOrgChartParams({
  institutionName: 'X',
  nodes: [{ level: 1, name: 'N', role: 'R' }],
})?.institutionName === 'X')

// ── Type-coercion guard: malformed field types must not silently coerce ──────
check('boolean true for node.level does not coerce to 1 (Number(true)===1 coercion trap)',
  validateOrgChartParams({ institutionName: 'X', nodes: [{ level: true, name: 'N', role: 'R' }] }) === null)

console.log(`\n=== ${pass} passed, ${fail} failed ===\n`)
process.exit(fail === 0 ? 0 : 1)
