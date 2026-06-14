/**
 * Sprint AU — CBSE Science coverage audit.
 * Run with: npx tsx scripts/auditCbseScience.ts
 *
 * Compares CBSE Science against UP Science using the existing coverageAudit
 * engine: subject coverage %, unmapped chapters (bad node refs), unused
 * (orphan) science KG nodes, duplicate ids, and mapping hot spots.
 */
import {
  auditSubjectCoverage,
  auditBoardCoverage,
  findUnmappedChapters,
  findUnusedKnowledgeNodes,
} from '../src/lib/education/coverageAudit'
import { CBSE_SCIENCE_CATALOG } from '../src/lib/education/cbseScienceCatalog'
import { UP_SCIENCE_CATALOG } from '../src/lib/education/upScienceCatalog'

const SCIENCE_PREFIXES = ['physics', 'chemistry', 'biology', 'earth_science', 'environmental_science']
const isScience = (subject: string) => SCIENCE_PREFIXES.includes(subject)

const cbse = auditSubjectCoverage(CBSE_SCIENCE_CATALOG)
const up = auditSubjectCoverage(UP_SCIENCE_CATALOG)

console.log('=== auditBoardCoverage("cbse") — science only ===')
console.log(JSON.stringify(auditBoardCoverage([CBSE_SCIENCE_CATALOG]), null, 2))

console.log('\n=== CBSE Science vs UP Science ===')
for (const [label, r] of [['CBSE', cbse], ['UP  ', up]] as const) {
  console.log(
    `${label}: chapters=${r.totalChapters} | nodeRefs=${r.totalKgNodesMapped} | ` +
    `uniqueNodes=${r.uniqueKgNodesCovered} | coverage=${r.coveragePercent}% | ` +
    `unmapped=${r.unmappedChapters.length}`
  )
}

console.log('\n=== Chapters referencing nonexistent KG nodes (must be empty) ===')
const unmapped = findUnmappedChapters([CBSE_SCIENCE_CATALOG])
console.log(unmapped.length === 0 ? 'NONE — every CBSE chapter maps to existing nodes' : JSON.stringify(unmapped, null, 2))

console.log('\n=== Science KG nodes unused by CBSE (coverage gaps) ===')
const unusedCbse = findUnusedKnowledgeNodes([CBSE_SCIENCE_CATALOG]).filter((r) => isScience(r.subject))
console.log(unusedCbse.length === 0 ? 'NONE — all science nodes covered' : JSON.stringify(unusedCbse, null, 2))

console.log('\n=== Science KG nodes unused by UP (for comparison) ===')
const unusedUp = findUnusedKnowledgeNodes([UP_SCIENCE_CATALOG]).filter((r) => isScience(r.subject))
console.log(unusedUp.length === 0 ? 'NONE' : JSON.stringify(unusedUp, null, 2))

console.log('\n=== Duplicate chapter ids (must be empty) ===')
const ids = CBSE_SCIENCE_CATALOG.grades.flatMap((g) => g.chapters.map((c) => c.id))
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
console.log(dupes.length === 0 ? 'NONE' : dupes)

console.log('\n=== Overlap: CBSE nodes also covered by UP ===')
const upNodes = new Set(UP_SCIENCE_CATALOG.grades.flatMap((g) => g.chapters.flatMap((c) => c.kgNodeIds)))
const cbseNodes = [...new Set(CBSE_SCIENCE_CATALOG.grades.flatMap((g) => g.chapters.flatMap((c) => c.kgNodeIds)))]
const shared = cbseNodes.filter((n) => upNodes.has(n)).length
console.log(`${shared}/${cbseNodes.length} CBSE nodes shared with UP = ${Math.round((shared / cbseNodes.length) * 100)}% node-level overlap`)
