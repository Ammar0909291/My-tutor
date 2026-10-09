/**
 * Biology visual inventory (read-only). For every Biology KG concept, ask the REAL pure resolver
 * (`resolveVisual`, the same call a lesson turn makes for a "Give me a diagram" request) what it
 * serves, and record the tier / renderer / scene kind. Writes JSON to the path in argv[2].
 *
 *   npx tsx scripts/qa/biologyVisualInventory.ts <out.json>
 */
import fs from 'fs'
import { getKnowledgeGraph, getAllNodes } from '../../src/lib/curriculum/knowledgeGraph'
import { resolveVisual } from '../../src/lib/teaching/visual/resolveVisual'
import { getConceptSceneGenerator, lookupConceptVisualBinding } from '../../src/lib/teaching/visualRegistry'
import { CONCEPT_SCENE_OVERRIDES } from '../../src/lib/teaching/visual/conceptSceneParams'

const kg = getKnowledgeGraph('biology')
if (!kg) throw new Error('biology KG not found')
const nodes = getAllNodes(kg).filter((n) => n.id.startsWith('bio.'))
const rows = nodes.map((n) => {
  const d = resolveVisual({ message: 'can you show me a diagram?', lessonConceptId: n.id, subject: 'biology', learnerRequest: 'diagram' })
  const p = d.payload as any
  const binding = lookupConceptVisualBinding(n.id)
  const spec = p?.renderer === 'scene' ? p.sceneSpec : null
  return {
    conceptId: n.id,
    title: n.title,
    graphical: d.graphical,
    source: d.source,
    provenance: d.provenance ?? null,
    renderer: p?.renderer ?? null,
    visualType: p?.renderer === 'card' ? p.visualType : null,
    bindingTier: binding?.tier ?? null,
    generatorKind: getConceptSceneGenerator(n.id) ?? null,
    conceptOwnedScene: CONCEPT_SCENE_OVERRIDES.includes(n.id),
    sceneKind: spec?.parametric?.kind ?? null,
    sceneType: spec?.sceneType ?? null,
    stepCount: spec?.steps?.length ?? null,
    objectCount: spec?.objects?.length ?? null,
    interactive: !!(spec?.parametric?.controls?.length || spec?.simulation || spec?.modes?.length),
    reason: d.graphical ? null : (d.provenance ?? 'none'),
  }
})
fs.writeFileSync(process.argv[2], JSON.stringify(rows, null, 2))
const by = (k: string) => rows.reduce((a: any, r: any) => ((a[r[k] ?? 'null'] = (a[r[k] ?? 'null'] ?? 0) + 1), a), {})
console.log('concepts', rows.length)
console.log('graphical', rows.filter((r) => r.graphical).length)
console.log('renderer', by('renderer'))
console.log('source', by('source'))
console.log('bindingTier', by('bindingTier'))
console.log('generatorKind', by('generatorKind'))
console.log('sceneKind', by('sceneKind'))
console.log('visualType', by('visualType'))
