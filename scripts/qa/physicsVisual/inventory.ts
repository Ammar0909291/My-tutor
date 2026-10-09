/**
 * PHYSICS VISUAL INVENTORY (Phase 0 of the Physics Visual Generation +
 * Validation + Readability Gate).
 *
 * READ-ONLY. Resolves every physics KG concept through the REAL production
 * visual authority (`resolveVisual`, the same call a lesson turn makes) and
 * records what a learner would be served: tier, provenance, renderer, payload
 * kind, and the properties the audit needs (interactive / graph / 3D / process).
 *
 * It decides nothing and changes nothing. The render + validation passes
 * (`render.ts`, `validate.ts`) consume `inventory.json` produced here.
 *
 *   npx tsx scripts/qa/physicsVisual/inventory.ts [outDir]
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { resolveVisual } from '../../../src/lib/teaching/visual/resolveVisual'
import { getConceptSceneGenerator } from '../../../src/lib/teaching/visualRegistry'
import { VISUAL_META } from '../../../src/lib/school/visuals/visualTypes'
import type { SceneSpec } from '../../../src/lib/teaching/sceneSpec'

export type FigureClass = 'scene' | 'card' | 'spec' | 'none'

export interface InventoryRow {
  conceptId: string
  title: string
  domain: string
  /** The learner-facing figure class the resolver serves. */
  figureClass: FigureClass
  graphical: boolean
  tier: string
  provenance: string
  assetId: string | null
  scope: string | null
  identity: string | null
  representation: string | null
  /** 'authored' = a human authored this concept's figure; 'shared-default' / 'domain-fallback' = broader. */
  authorship: 'authored-concept' | 'shared-generator-default' | 'curated-card' | 'domain-fallback-card' | 'none'
  generatorKind: string | null
  /** scene */
  sceneId: string | null
  sceneType: string | null
  parametricKind: string | null
  interactive: boolean
  steps: number
  objectCount: number
  /** Objects that carry text (labels, captioned arrows…): what the label layer must place. */
  textObjects: number
  isGraph: boolean
  is3dCard: boolean
  isProcessFlow: boolean
  /** card */
  cardType: string | null
  cardTitle: string | null
  /** spec */
  specType: string | null
  retired: boolean
}

const PLOT_HINT = /\b(graph|plot|curve|trace|isotherm|heating curve|f[–-]t|v[–-]t|x[–-]t|p[–-]v|vs\.?)\b/i

function physicsConceptIds(): Array<{ id: string; title: string }> {
  const g = JSON.parse(readFileSync('docs/physics/kg/graph.json', 'utf8'))
  const list: Array<{ id: string; name?: string; title?: string }> = Array.isArray(g) ? g : (g.concepts ?? g.nodes)
  return list.map((n) => ({ id: n.id, title: n.name ?? n.title ?? n.id }))
}

export function buildInventory(): InventoryRow[] {
  const rows: InventoryRow[] = []
  for (const { id, title } of physicsConceptIds()) {
    const d = resolveVisual({
      message: 'show me a diagram',
      lessonConceptId: id,
      learnerRequest: 'diagram',
      subject: 'physics',
    } as Parameters<typeof resolveVisual>[0])
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
      authorship =
        asset.provenance === 'generator' ? 'authored-concept'
        : asset.provenance === 'generator-default' ? 'shared-generator-default'
        : asset.provenance === 'curated' ? 'curated-card'
        : asset.provenance === 'domain-default' ? 'domain-fallback-card'
        : 'none'
    }
    rows.push({
      conceptId: id,
      title,
      domain: id.split('.').slice(0, 2).join('.'),
      figureClass: !payload ? 'none' : payload.renderer === 'ascii' ? 'none' : (payload.renderer as FigureClass),
      graphical: d.graphical,
      tier: d.source,
      provenance: d.provenance,
      assetId: asset?.assetId ?? null,
      scope: asset?.scope ?? null,
      identity: asset?.identity ?? null,
      representation: d.representation,
      authorship,
      generatorKind: getConceptSceneGenerator(id) ?? null,
      sceneId: scene?.id ?? null,
      sceneType: scene?.sceneType ?? null,
      parametricKind: scene?.parametric?.kind ?? null,
      interactive: Boolean(scene?.parametric),
      steps: scene?.steps.length ?? 0,
      objectCount: objects,
      textObjects,
      isGraph: Boolean(spec?.type === 'graph') || cardType === 'coordinate_plane' || scene?.sceneType === 'plot' || PLOT_HINT.test(sceneText),
      is3dCard: Boolean(cardType && cardType.startsWith('three_')),
      isProcessFlow: spec?.type === 'process_flow',
      cardType,
      cardTitle: cardType ? (VISUAL_META as Record<string, { title: string }>)[cardType]?.title ?? null : null,
      specType: spec?.type ?? null,
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
  const outDir = resolve(process.argv[2] ?? 'tmp/physics-visual-audit')
  mkdirSync(outDir, { recursive: true })
  const rows = buildInventory()
  writeFileSync(resolve(outDir, 'inventory.json'), JSON.stringify(rows, null, 1))
  const served = rows.filter((r) => r.graphical)
  const summary = {
    concepts: rows.length,
    withVisual: served.length,
    withoutVisual: rows.length - served.length,
    byFigureClass: tally(rows, (r) => r.figureClass),
    byAuthorship: tally(rows, (r) => r.authorship),
    byScope: tally(served, (r) => r.scope ?? 'none'),
    byDomain: tally(rows, (r) => r.domain),
    interactiveScenes: served.filter((r) => r.interactive).length,
    parametricKinds: tally(served.filter((r) => r.parametricKind), (r) => r.parametricKind!),
    graphs: served.filter((r) => r.isGraph).length,
    cards: tally(served.filter((r) => r.cardType), (r) => r.cardType!),
    threeDCards: served.filter((r) => r.is3dCard).length,
    processFlows: served.filter((r) => r.isProcessFlow).length,
    retired: rows.filter((r) => r.retired).length,
    distinctSceneIds: new Set(served.map((r) => r.sceneId).filter(Boolean)).size,
    distinctAssetIds: new Set(served.map((r) => r.assetId).filter(Boolean)).size,
  }
  writeFileSync(resolve(outDir, 'inventory-summary.json'), JSON.stringify(summary, null, 2))
  console.log(JSON.stringify(summary, null, 2))
}

if (process.argv[1] && process.argv[1].endsWith('inventory.ts')) main()
