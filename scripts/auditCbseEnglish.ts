/**
 * Sprint AW — CBSE English coverage audit.
 * Run with: npx tsx scripts/auditCbseEnglish.ts
 */
import {
  auditSubjectCoverage,
  auditBoardCoverage,
  findUnmappedChapters,
  findUnusedKnowledgeNodes,
} from '../src/lib/education/coverageAudit'
import { CBSE_ENGLISH_CATALOG } from '../src/lib/education/cbseEnglishCatalog'
import { UP_ENGLISH_CATALOG } from '../src/lib/education/upEnglishCatalog'

const ENGLISH_PREFIXES = ['grammar', 'vocabulary', 'reading', 'writing', 'communication', 'literature']
const isEnglish = (subject: string) => ENGLISH_PREFIXES.includes(subject)

const cbse = auditSubjectCoverage(CBSE_ENGLISH_CATALOG)
const up = auditSubjectCoverage(UP_ENGLISH_CATALOG)

console.log('=== auditBoardCoverage("cbse") — english only ===')
console.log(JSON.stringify(auditBoardCoverage([CBSE_ENGLISH_CATALOG]), null, 2))

console.log('\n=== CBSE English vs UP English ===')
for (const [label, r] of [['CBSE', cbse], ['UP  ', up]] as const) {
  console.log(
    `${label}: chapters=${r.totalChapters} | nodeRefs=${r.totalKgNodesMapped} | ` +
    `uniqueNodes=${r.uniqueKgNodesCovered} | coverage=${r.coveragePercent}% | ` +
    `unmapped=${r.unmappedChapters.length}`
  )
}

console.log('\n=== Chapters referencing nonexistent KG nodes (must be empty) ===')
const unmapped = findUnmappedChapters([CBSE_ENGLISH_CATALOG])
console.log(unmapped.length === 0 ? 'NONE — every CBSE chapter maps to existing nodes' : JSON.stringify(unmapped, null, 2))

console.log('\n=== English KG nodes unused by CBSE (coverage gaps) ===')
const unusedCbse = findUnusedKnowledgeNodes([CBSE_ENGLISH_CATALOG]).filter((r) => isEnglish(r.subject))
console.log(unusedCbse.length === 0 ? 'NONE — all English nodes covered' : JSON.stringify(unusedCbse, null, 2))

console.log('\n=== English KG nodes unused by UP (for comparison) ===')
const unusedUp = findUnusedKnowledgeNodes([UP_ENGLISH_CATALOG]).filter((r) => isEnglish(r.subject))
console.log(unusedUp.length === 0 ? 'NONE' : JSON.stringify(unusedUp, null, 2))

console.log('\n=== Duplicate chapter ids (must be empty) ===')
const ids = CBSE_ENGLISH_CATALOG.grades.flatMap((g) => g.chapters.map((c) => c.id))
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
console.log(dupes.length === 0 ? 'NONE' : dupes)

console.log('\n=== Overlap: CBSE nodes also covered by UP ===')
const upNodes = new Set(UP_ENGLISH_CATALOG.grades.flatMap((g) => g.chapters.flatMap((c) => c.kgNodeIds)))
const cbseNodes = [...new Set(CBSE_ENGLISH_CATALOG.grades.flatMap((g) => g.chapters.flatMap((c) => c.kgNodeIds)))]
const shared = cbseNodes.filter((n) => upNodes.has(n)).length
console.log(`${shared}/${cbseNodes.length} CBSE nodes shared with UP = ${Math.round((shared / cbseNodes.length) * 100)}% node-level overlap`)
