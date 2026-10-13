/**
 * MATHEMATICS VISUAL INVENTORY — the Mathematics twin of scripts/qa/physicsVisual/inventory.ts.
 *
 * READ-ONLY. Resolves every Mathematics KG concept through the REAL production visual authority (`resolveVisual`, subject
 * 'mathematics', the same call a lesson turn makes) and records what a learner would be served. The render and validation passes
 * (`render.ts`, `validate.ts`) consume it. It reuses the Physics row type so the shared audit helpers keep working.
 *
 *   npx tsx scripts/qa/mathVisual/inventory.ts [outDir]
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { resolveVisual } from '../../../src/lib/teaching/visual/resolveVisual'
import { getConceptSceneGenerator } from '../../../src/lib/teaching/visualRegistry'
import { VISUAL_META } from '../../../src/lib/school/visuals/visualTypes'
import type { SceneSpec } from '../../../src/lib/teaching/sceneSpec'
import type { FigureClass, InventoryRow } from '../physicsVisual/inventory'

export const MATH_SUBJECT = 'mathematics'
const PLOT_HINT = /\b(graph|plot|curve|trace|slope|function|axis|axes|vs\.?)\b/i

export function mathConceptIds(): Array<{ id: string; title: string }> {
  const g = JSON.parse(readFileSync('docs/mathematics/kg/graph.json', 'utf8'))
  const list: Array<{ id: string; name?: string; title?: string }> = Array.isArray(g) ? g : (g.concepts ?? g.nodes)
  return list.map((n) => ({ id: n.id, title: n.name ?? n.title ?? n.id }))
}

export function buildInventory(): InventoryRow[] {
  const rows: InventoryRow[] = []
  for (const { id, title } of mathConceptIds()) {
    const d = resolveVisual({ message: 'show me a diagram', lessonConceptId: id, learnerRequest: 'diagram', subject: MATH_SUBJECT } as Parameters<typeof resolveVisual>[0])
    const payload = d.payload
    const asset = d.asset
    const scene: SceneSpec | null = payload?.renderer === 'scene' ? payload.sceneSpec : null
    const cardType = payload?.renderer === 'card' ? payload.visualType : null
    const spec = payload?.renderer === 'spec' ? payload.visualSpec : null
    const objects = scene ? scene.steps.reduce((n, s) => n + s.objects.length, 0) : 0
    const textObjects = scene ? scene.steps.reduce((n, s) => n + s.objects.filter((o) => typeof o.text === 'string' && o.text.trim() !== '').length, 0) : 0
    const sceneText = scene ? `${scene.title} ${scene.teachingGoal ?? ''}` : ''
    let authorship: InventoryRow['authorship'] = 'none'
    if (asset) {
      authorship = asset.provenance === 'generator' ? 'authored-concept' : asset.provenance === 'generator-default' ? 'shared-generator-default' : asset.provenance === 'curated' ? 'curated-card' : asset.provenance === 'domain-default' ? 'domain-fallback-card' : 'none'
    }
    rows.push({
      conceptId: id, title, domain: id.split('.').slice(0, 2).join('.'),
      figureClass: !payload ? 'none' : payload.renderer === 'ascii' ? 'none' : (payload.renderer as FigureClass),
      graphical: d.graphical, tier: d.source, provenance: d.provenance,
      assetId: asset?.assetId ?? null, scope: asset?.scope ?? null, identity: asset?.identity ?? null, representation: d.representation, authorship,
      generatorKind: getConceptSceneGenerator(id) ?? null,
      sceneId: scene?.id ?? null, sceneType: scene?.sceneType ?? null, parametricKind: scene?.parametric?.kind ?? null, interactive: Boolean(scene?.parametric),
      steps: scene?.steps.length ?? 0, objectCount: objects, textObjects,
      isGraph: Boolean(spec?.type === 'graph') || cardType === 'coordinate_plane' || scene?.sceneType === 'plot' || PLOT_HINT.test(sceneText),
      is3dCard: Boolean(cardType && cardType.startsWith('three_')), isProcessFlow: spec?.type === 'process_flow',
      cardType, cardTitle: cardType ? (VISUAL_META as Record<string, { title: string }>)[cardType]?.title ?? null : null, specType: spec?.type ?? null,
      retired: d.provenance.includes('retired'),
    })
  }
  return rows
}

function tally<T>(rows: T[], key: (r: T) => string): Record<string, number> {
  const out: Record<string, number> = {}
  for (const r of rows) out[key(r)] = (out[key(r)] ?? 0) + 1
  return Object.fromEntries(Object.entries(out).sort((a, b) => b[1] - a[1]))
}

function main(): void {
  const outDir = resolve(process.argv[2] ?? 'tmp/math-visual-audit')
  mkdirSync(outDir, { recursive: true })
  const rows = buildInventory()
  writeFileSync(resolve(outDir, 'inventory.json'), JSON.stringify(rows, null, 1))
  const served = rows.filter((r) => r.graphical)
  const summary = {
    concepts: rows.length, withVisual: served.length, withoutVisual: rows.length - served.length,
    byFigureClass: tally(rows, (r) => r.figureClass), byAuthorship: tally(rows, (r) => r.authorship), byScope: tally(served, (r) => r.scope ?? 'none'),
    byDomain: tally(served, (r) => r.domain), interactiveScenes: served.filter((r) => r.interactive).length, graphs: served.filter((r) => r.isGraph).length,
    cards: tally(served.filter((r) => r.cardType), (r) => r.cardType!), distinctSceneIds: new Set(served.map((r) => r.sceneId).filter(Boolean)).size, retired: rows.filter((r) => r.retired).length,
  }
  writeFileSync(resolve(outDir, 'inventory-summary.json'), JSON.stringify(summary, null, 2))
  console.log(JSON.stringify(summary, null, 2))
}

if (process.argv[1] && process.argv[1].endsWith('inventory.ts')) main()
