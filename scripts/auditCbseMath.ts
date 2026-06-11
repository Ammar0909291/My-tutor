/**
 * Sprint AT — CBSE Mathematics coverage audit.
 * Run with: npx tsx scripts/auditCbseMath.ts
 *
 * Compares CBSE Math against UP Math using the existing coverageAudit
 * engine: subject coverage %, unmapped chapters (bad node refs), unused
 * (orphan) math KG nodes, and duplicate-mapping hot spots.
 */
import {
  auditSubjectCoverage,
  auditBoardCoverage,
  findUnmappedChapters,
  findUnusedKnowledgeNodes,
} from '../src/lib/education/coverageAudit'
import { CBSE_MATH_CATALOG } from '../src/lib/education/cbseMathCatalog'
import { UP_MATH_CATALOG } from '../src/lib/education/upMathCatalog'

const cbse = auditSubjectCoverage(CBSE_MATH_CATALOG)
const up = auditSubjectCoverage(UP_MATH_CATALOG)

console.log('=== auditBoardCoverage("cbse") — math only ===')
console.log(JSON.stringify(auditBoardCoverage([CBSE_MATH_CATALOG]), null, 2))

console.log('\n=== CBSE Math vs UP Math ===')
for (const [label, r] of [['CBSE', cbse], ['UP  ', up]] as const) {
  console.log(
    `${label}: chapters=${r.totalChapters} | nodeRefs=${r.totalKgNodesMapped} | ` +
    `uniqueNodes=${r.uniqueKgNodesCovered} | coverage=${r.coveragePercent}% | ` +
    `unmapped=${r.unmappedChapters.length}`
  )
}

console.log('\n=== Chapters referencing nonexistent KG nodes (must be empty) ===')
const unmapped = findUnmappedChapters([CBSE_MATH_CATALOG])
console.log(unmapped.length === 0 ? 'NONE — every CBSE chapter maps to existing nodes' : JSON.stringify(unmapped, null, 2))

console.log('\n=== Math KG nodes unused by CBSE (coverage gaps) ===')
const unusedCbse = findUnusedKnowledgeNodes([CBSE_MATH_CATALOG])
  .filter((r) => !['physics', 'chemistry', 'biology', 'earth_science', 'environmental_science', 'grammar', 'vocabulary', 'reading', 'writing', 'communication', 'literature', 'history', 'geography', 'civics', 'economics', 'society'].includes(r.subject))
console.log(JSON.stringify(unusedCbse, null, 2))

console.log('\n=== Math KG nodes unused by UP (for comparison) ===')
const unusedUp = findUnusedKnowledgeNodes([UP_MATH_CATALOG])
  .filter((r) => !['physics', 'chemistry', 'biology', 'earth_science', 'environmental_science', 'grammar', 'vocabulary', 'reading', 'writing', 'communication', 'literature', 'history', 'geography', 'civics', 'economics', 'society'].includes(r.subject))
console.log(JSON.stringify(unusedUp, null, 2))

console.log('\n=== Duplicate chapter ids (must be empty) ===')
const ids = CBSE_MATH_CATALOG.grades.flatMap((g) => g.chapters.map((c) => c.id))
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i)
console.log(dupes.length === 0 ? 'NONE' : dupes)

console.log('\n=== Most-reused KG nodes in CBSE (mapping hot spots, top 5) ===')
const counts = new Map<string, number>()
CBSE_MATH_CATALOG.grades.forEach((g) => g.chapters.forEach((c) => c.kgNodeIds.forEach((id) => counts.set(id, (counts.get(id) ?? 0) + 1))))
const top = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5)
top.forEach(([id, n]) => console.log(`  ${id}: ${n} chapters`))
