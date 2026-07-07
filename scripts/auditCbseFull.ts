/**
 * Sprint AX — Full CBSE validation & parity audit.
 * Run with: npx tsx scripts/auditCbseFull.ts
 *
 * Audit-only: combines all 4 CBSE catalogs (Mathematics, Science,
 * Social Science, English), cross-checks against the equivalent UP
 * Board catalogs, and exercises the cross-cutting educationGraph
 * helpers (getBoardsCoveringNode, getCumulativeNodes,
 * buildSchoolTutorContext, auditBoardCoverage) with CBSE data.
 */
import {
  CBSE_MATH_CATALOG,
  CBSE_SCIENCE_CATALOG,
  CBSE_SOCIAL_SCIENCE_CATALOG,
  CBSE_ENGLISH_CATALOG,
  UP_MATH_CATALOG,
  UP_SCIENCE_CATALOG,
  UP_SOCIAL_SCIENCE_CATALOG,
  UP_ENGLISH_CATALOG,
  ALL_KG_NODES,
  BOARD_CATALOGS,
  auditSubjectCoverage,
  auditBoardCoverage,
  findUnmappedChapters,
  findUnusedKnowledgeNodes,
  getBoardsCoveringNode,
  getCumulativeNodes,
  buildSchoolTutorContext,
} from '../src/lib/education'

const CBSE_CATALOGS = BOARD_CATALOGS.filter((c) => c.boardId === 'cbse')
const UP_CATALOGS = BOARD_CATALOGS.filter((c) => c.boardId === 'up_board')

// ════════════════════════════════════════════════════════════════
// PHASE 1 — FULL CBSE COVERAGE AUDIT
// ════════════════════════════════════════════════════════════════
console.log('═══ PHASE 1 — FULL CBSE COVERAGE AUDIT ═══\n')

console.log('--- auditBoardCoverage("cbse") — all 4 subjects ---')
const cbseBoardReport = auditBoardCoverage(CBSE_CATALOGS)
console.log(JSON.stringify(cbseBoardReport, null, 2))

const allCbseChapters = CBSE_CATALOGS.flatMap((c) => c.grades.flatMap((g) => g.chapters))
const totalChapters = allCbseChapters.length
const totalNodeRefs = allCbseChapters.reduce((sum, ch) => sum + ch.kgNodeIds.length, 0)
console.log(`\nTotal CBSE chapters (all subjects): ${totalChapters}`)
console.log(`Total CBSE node references: ${totalNodeRefs}`)
console.log(`Unique KG nodes covered: ${cbseBoardReport.totalUniqueNodesCovered} / ${ALL_KG_NODES.length} (${cbseBoardReport.overallCoveragePercent}%)`)

console.log('\n--- Duplicate chapter ids across all CBSE catalogs (must be empty) ---')
const allIds = allCbseChapters.map((c) => c.id)
const dupes = allIds.filter((id, i) => allIds.indexOf(id) !== i)
console.log(dupes.length === 0 ? 'NONE' : JSON.stringify([...new Set(dupes)]))

console.log('\n--- Unmapped chapters (empty kgNodeIds, must be empty) ---')
for (const r of cbseBoardReport.subjects) {
  console.log(`  ${r.subjectSlug}: ${r.unmappedChapters.length === 0 ? 'NONE' : JSON.stringify(r.unmappedChapters)}`)
}

console.log('\n--- Broken references: chapters pointing at nonexistent KG nodes (must be empty) ---')
const broken = findUnmappedChapters(CBSE_CATALOGS)
console.log(broken.length === 0 ? 'NONE — every CBSE chapter maps to existing nodes' : JSON.stringify(broken, null, 2))

console.log('\n--- Orphan nodes: KG nodes not referenced by any CBSE chapter ---')
const unused = findUnusedKnowledgeNodes(CBSE_CATALOGS)
console.log(unused.length === 0 ? 'NONE — every KG node is covered by CBSE' : JSON.stringify(unused, null, 2))

// ════════════════════════════════════════════════════════════════
// PHASE 2 — CBSE vs UP PARITY
// ════════════════════════════════════════════════════════════════
console.log('\n\n═══ PHASE 2 — CBSE vs UP PARITY ═══\n')

const pairs: Array<[string, typeof CBSE_MATH_CATALOG, typeof UP_MATH_CATALOG]> = [
  ['mathematics', CBSE_MATH_CATALOG, UP_MATH_CATALOG],
  ['science', CBSE_SCIENCE_CATALOG, UP_SCIENCE_CATALOG],
  ['social_science', CBSE_SOCIAL_SCIENCE_CATALOG, UP_SOCIAL_SCIENCE_CATALOG],
  ['english', CBSE_ENGLISH_CATALOG, UP_ENGLISH_CATALOG],
]

for (const [subject, cbseCat, upCat] of pairs) {
  const cbseAudit = auditSubjectCoverage(cbseCat)
  const upAudit = auditSubjectCoverage(upCat)
  const cbseNodes = new Set(cbseCat.grades.flatMap((g) => g.chapters.flatMap((c) => c.kgNodeIds)))
  const upNodes = new Set(upCat.grades.flatMap((g) => g.chapters.flatMap((c) => c.kgNodeIds)))
  const shared = [...cbseNodes].filter((n) => upNodes.has(n)).length
  const overlapPct = Math.round((shared / cbseNodes.size) * 100)

  console.log(`--- ${subject} ---`)
  console.log(`  CBSE: chapters=${cbseAudit.totalChapters} | nodeRefs=${cbseAudit.totalKgNodesMapped} | uniqueNodes=${cbseAudit.uniqueKgNodesCovered} | coverage=${cbseAudit.coveragePercent}%`)
  console.log(`  UP  : chapters=${upAudit.totalChapters} | nodeRefs=${upAudit.totalKgNodesMapped} | uniqueNodes=${upAudit.uniqueKgNodesCovered} | coverage=${upAudit.coveragePercent}%`)
  console.log(`  Node-level overlap (CBSE nodes also in UP): ${shared}/${cbseNodes.size} = ${overlapPct}%`)
  console.log()
}

// ════════════════════════════════════════════════════════════════
// PHASE 3 — EDUCATION GRAPH REVIEW
// ════════════════════════════════════════════════════════════════
console.log('\n═══ PHASE 3 — EDUCATION GRAPH REVIEW ═══\n')

console.log('--- getBoardsCoveringNode() ---')
// A node covered by both boards in mathematics
const sampleSharedNode = CBSE_MATH_CATALOG.grades.flatMap((g) => g.chapters.flatMap((c) => c.kgNodeIds))[0]
console.log(`  Node "${sampleSharedNode}" covered by: ${JSON.stringify(getBoardsCoveringNode(sampleSharedNode))}`)

// The math node CBSE leaves uncovered (Sprint AT) — should be UP-only
const cbseMathUnused = findUnusedKnowledgeNodes([CBSE_MATH_CATALOG]).find((r) => r.subject === 'geometry')
if (cbseMathUnused) {
  for (const n of cbseMathUnused.unusedNodes) {
    console.log(`  Node "${n.id}" (CBSE-uncovered) covered by: ${JSON.stringify(getBoardsCoveringNode(n.id))}`)
  }
}

console.log('\n--- getCumulativeNodes(CBSE_MATH_CATALOG, 8) ---')
const cumulative8 = getCumulativeNodes(CBSE_MATH_CATALOG, 8)
console.log(`  ${cumulative8.length} unique nodes cumulative through grade 8`)
console.log(`  Sample: ${cumulative8.slice(0, 3).map((n) => n.id).join(', ')}...`)

console.log('\n--- buildSchoolTutorContext("cbse", "mathematics", 8, <first ch8 chapter>) ---')
const ch8 = CBSE_MATH_CATALOG.grades.find((g) => g.grade === 8)!.chapters[0]
const ctx = buildSchoolTutorContext('cbse', 'mathematics', 8, ch8.id)
console.log(ctx)

console.log('\n--- buildSchoolTutorContext for English (cbse, grade 10) ---')
const engCh10 = CBSE_ENGLISH_CATALOG.grades.find((g) => g.grade === 10)!.chapters[0]
const engCtx = buildSchoolTutorContext('cbse', 'english', 10, engCh10.id)
console.log(engCtx)

console.log('\n--- BOARD_CATALOGS sanity ---')
console.log(`  Total catalogs registered: ${BOARD_CATALOGS.length}`)
console.log(`  CBSE catalogs: ${CBSE_CATALOGS.map((c) => c.subjectSlug).join(', ')}`)
console.log(`  UP catalogs:   ${UP_CATALOGS.map((c) => c.subjectSlug).join(', ')}`)
