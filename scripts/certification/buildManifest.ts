/**
 * BUILD THE FROZEN TIER A TARGET MANIFEST (I-3).
 *
 * Reproducible from this repository alone — no database, no network. The order
 * is the SAME traversal `/api/curriculum` uses to number lessons for a
 * KG-backed subject (`libSubject.modules.flatMap(...)`, `order++`), so a
 * manifest row's `lessonOrder` is the order the runtime itself would assign.
 * Deriving it any other way would let the harness open a different lesson from
 * the one it claims to be certifying.
 *
 * ELIGIBILITY IS NOT DECIDED HERE. The manifest is the POPULATION; whether each
 * concept still meets the asset contract is a property of the live corpus and
 * is re-verified by the runner against `assetContract.ts` before a batch. This
 * file only guarantees the population is complete, unique, and ordered.
 *
 *   npx tsx scripts/certification/buildManifest.ts > scripts/certification/tierA-manifest.json
 */

import { createHash } from 'crypto'
import { getAllNodes, getKnowledgeGraph } from '../../src/lib/curriculum/knowledgeGraph'

export const TIER_A_SUBJECTS = ['physics', 'chemistry'] as const

export interface ManifestRow {
  subject: string
  conceptId: string
  lessonTitle: string
  lessonOrder: number
  unitTitle: string
  unit: number
}

export interface ManifestAudit {
  subject: string
  kgConcepts: number
  rows: number
  duplicates: number
  missingFromManifest: string[]
  foreignIds: string[]
  orderContiguous: boolean
}

export function buildManifest(): { rows: ManifestRow[]; audit: ManifestAudit[] } {
  const rows: ManifestRow[] = []
  const audit: ManifestAudit[] = []
  for (const subject of TIER_A_SUBJECTS) {
    const graph = getKnowledgeGraph(subject)
    if (!graph) throw new Error(`no knowledge graph for ${subject}`)
    let order = 1
    const subjectRows: ManifestRow[] = []
    graph.modules.forEach((module, modIdx) => {
      for (const node of module.nodes) {
        subjectRows.push({
          subject,
          conceptId: node.slug,
          lessonTitle: node.title,
          lessonOrder: order++,
          unitTitle: module.title,
          unit: modIdx + 1,
        })
      }
    })
    const kgIds = getAllNodes(graph).map((n) => n.id)
    const ids = subjectRows.map((r) => r.conceptId)
    const idSet = new Set(ids)
    audit.push({
      subject,
      kgConcepts: kgIds.length,
      rows: subjectRows.length,
      duplicates: ids.length - idSet.size,
      missingFromManifest: kgIds.filter((i) => !idSet.has(i)),
      foreignIds: ids.filter((i) => !kgIds.includes(i)),
      orderContiguous: subjectRows.every((r, i) => r.lessonOrder === i + 1),
    })
    rows.push(...subjectRows)
  }
  return { rows, audit }
}

/** sha256 of the manifest body exactly as it is written to disk. */
export function manifestHash(rows: readonly ManifestRow[]): string {
  return createHash('sha256').update(serialiseManifest(rows)).digest('hex')
}

export function serialiseManifest(rows: readonly ManifestRow[]): string {
  return `${JSON.stringify(rows, null, 1)}\n`
}

if (require.main === module) {
  const { rows, audit } = buildManifest()
  for (const a of audit) {
    if (a.duplicates > 0) throw new Error(`${a.subject}: ${a.duplicates} duplicate concept ids`)
    if (a.missingFromManifest.length > 0) {
      throw new Error(`${a.subject}: ${a.missingFromManifest.length} KG concepts missing`)
    }
    if (a.foreignIds.length > 0) throw new Error(`${a.subject}: ${a.foreignIds.length} ids not in the KG`)
    if (!a.orderContiguous) throw new Error(`${a.subject}: lessonOrder is not contiguous`)
  }
  process.stderr.write(`${JSON.stringify(audit, null, 1)}\nsha256 ${manifestHash(rows)}\n`)
  process.stdout.write(serialiseManifest(rows))
}
