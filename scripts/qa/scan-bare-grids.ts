/**
 * The defect class behind the Angular Kinematics report.
 *
 * `coordinate_plane` with NO scene generator renders a bare demo axis grid. It
 * is only meaningful when a generator supplies the curve — which is why
 * kinematics-1d/2d carry `kinematics_graphs`. Every concept bound to a
 * generic-axes visual with `scene=null` shows the learner a placeholder grid
 * while the tutor talks about something else.
 *
 * Lists them so the fix is scoped by evidence rather than by the one concept
 * that happened to be reported.
 *
 * Run: npx tsx scripts/qa/scan-bare-grids.ts
 */
import { readFileSync } from 'node:fs'
import { getConceptVisualType, getConceptSceneGenerator } from '../../src/lib/teaching/visualRegistry'

/** Visual types that are a blank canvas until a generator draws on them. */
const GENERIC_CANVAS = new Set(['coordinate_plane', 'number_line'])

const src = readFileSync('src/lib/teaching/visualRegistry.ts', 'utf8')
const ids = [...src.matchAll(/^\s*'([a-z_]+\.[a-z0-9_.-]+)':\s*\{/gm)].map((m) => m[1])
const unique = [...new Set(ids)]

const bare: string[] = []
for (const id of unique) {
  const type = getConceptVisualType(id)
  if (!type || !GENERIC_CANVAS.has(type)) continue
  if (getConceptSceneGenerator(id)) continue
  bare.push(`${id.padEnd(44)} ${type}`)
}

console.log(`${unique.length} concept bindings scanned`)
console.log(`${bare.length} bound to a generic canvas with NO scene generator:\n`)
for (const b of bare) console.log('  ' + b)
