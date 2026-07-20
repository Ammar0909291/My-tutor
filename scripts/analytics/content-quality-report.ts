/**
 * Content Quality Dashboard CLI — renders the Content Quality Intelligence
 * layer (src/lib/teaching/assets/contentQualityDashboard.ts) as a text
 * report: per-subject KPIs, global KPIs, ranked authoring work queue,
 * heatmaps, and trend reports.
 *
 * Read-only: this script (and the module it calls) never writes to
 * AssetIdentity/ExplanationAsset or any serving-path table — it only reads
 * MemoryServingEvent (written fire-and-forget by route.ts) and the static
 * KG/asset inventory.
 *
 * Run: npx tsx scripts/analytics/content-quality-report.ts [subjects...]
 * Defaults to mathematics,physics,english,chemistry if no subjects given.
 */
import { PrismaClient } from '@prisma/client'
import {
  getSubjectConceptStats, summarizeSubject, buildWorkQueue, buildHeatmaps,
  generateTrendReport, recommendationFor, type ConceptQualityStats,
} from '../../src/lib/teaching/assets/contentQualityDashboard'

const prisma = new PrismaClient()

function fmtPct(n: number) { return `${n.toFixed(1)}%` }
function fmtConf(n: number | null) { return n == null ? 'n/a' : n.toFixed(1) }

async function main() {
  const subjects = process.argv.slice(2).length > 0 ? process.argv.slice(2) : ['mathematics', 'physics', 'english', 'chemistry']

  console.log('═'.repeat(70))
  console.log('CONTENT QUALITY DASHBOARD — Explanation Memory Authoring Intelligence')
  console.log('═'.repeat(70))

  const allConceptStats: ConceptQualityStats[] = []
  const subjectDashboards = []

  for (const subject of subjects) {
    const concepts = await getSubjectConceptStats(subject)
    if (concepts.length === 0) { console.log(`\n${subject}: no canonical KG found — skipped`); continue }
    allConceptStats.push(...concepts)
    const d = summarizeSubject(subject, concepts)
    subjectDashboards.push(d)

    console.log(`\n${subject[0].toUpperCase()}${subject.slice(1)}`)
    console.log(`  KG concepts:            ${d.kgConcepts}`)
    console.log(`  Authored concepts:      ${d.authoredConcepts}`)
    console.log(`  Coverage:               ${fmtPct(d.coveragePercent)}`)
    console.log(`  Total served (turns):   ${d.totalServed}`)
    console.log(`  Exact Match:            ${fmtPct(d.exactMatchPercent)}`)
    console.log(`  Grade Fallback:         ${fmtPct(d.gradeFallbackPercent)}`)
    console.log(`  Confidence Fallback:    ${fmtPct(d.confidenceFallbackPercent)}`)
    console.log(`  Groq Fallback:          ${fmtPct(d.groqFallbackPercent)}`)
    console.log(`  Average Confidence:     ${fmtConf(d.averageConfidence)}`)
  }

  // Global rollup
  const totalServed = subjectDashboards.reduce((a, d) => a + d.totalServed, 0)
  const totalKg = subjectDashboards.reduce((a, d) => a + d.kgConcepts, 0)
  const totalAuthored = subjectDashboards.reduce((a, d) => a + d.authoredConcepts, 0)
  console.log(`\n${'─'.repeat(70)}`)
  console.log('GLOBAL')
  console.log(`  KG concepts (all subjects): ${totalKg}`)
  console.log(`  Authored concepts:          ${totalAuthored}`)
  console.log(`  Coverage:                   ${totalKg > 0 ? fmtPct(100 * totalAuthored / totalKg) : 'n/a'}`)
  console.log(`  Total served (turns):       ${totalServed}`)

  // Work queue
  console.log(`\n${'─'.repeat(70)}`)
  console.log('AUTHORING WORK QUEUE (top 15, deterministic ranking)')
  console.log('─'.repeat(70))
  const queue = buildWorkQueue(allConceptStats, 15)
  if (queue.length === 0) {
    console.log('  (no concepts with a served request currently show a problem — either')
    console.log('   nothing has been served yet, or every served concept is healthy)')
  } else {
    console.log('Rank | Concept | Requests | Problem | Priority | Recommendation')
    for (const item of queue) {
      console.log(`${item.rank} | ${item.conceptId} | ${item.requests} | ${item.problem} | ${item.priority} | ${item.recommendation}`)
    }
  }

  // Heatmaps
  console.log(`\n${'─'.repeat(70)}`)
  console.log('HEATMAPS (top 5 each)')
  console.log('─'.repeat(70))
  const heat = buildHeatmaps(allConceptStats, 5)
  const printList = (label: string, list: ConceptQualityStats[], field: (c: ConceptQualityStats) => string) => {
    console.log(`\n${label}:`)
    if (list.length === 0) { console.log('  (none)'); return }
    for (const c of list) console.log(`  ${c.conceptId} (${c.subject}) — ${field(c)}`)
  }
  printList('Most-served concepts', heat.mostServed, (c) => `${c.totalServed} requests`)
  printList('Most-fallback concepts', heat.mostFallback, (c) => `${fmtPct(100 * (c.gradeFallbackRate + c.confidenceFallbackRate + c.groqFallbackRate))} fallback rate`)
  printList('Most-requested-Groq concepts', heat.mostRequestedGroq, (c) => `${c.groqFallbackCount} groq serves`)
  printList('Lowest-confidence concepts', heat.lowestConfidence, (c) => `avg confidence ${fmtConf(c.averageConfidence)}`)
  printList('Highest-confidence concepts', heat.highestConfidence, (c) => `avg confidence ${fmtConf(c.averageConfidence)}`)

  // Per-concept recommendation sample (first 5 served concepts per subject)
  console.log(`\n${'─'.repeat(70)}`)
  console.log('PER-CONCEPT RECOMMENDATIONS (sample — served concepts only)')
  console.log('─'.repeat(70))
  const servedSample = allConceptStats.filter((c) => c.totalServed > 0).slice(0, 15)
  for (const c of servedSample) console.log(`  ${c.conceptId}: ${recommendationFor(c)}`)

  // Trend reports
  console.log(`\n${'─'.repeat(70)}`)
  console.log('TREND REPORTS')
  console.log('─'.repeat(70))
  for (const subject of subjects.slice(0, 1)) { // sample one subject to keep output readable
    for (const period of ['daily', 'weekly', 'monthly'] as const) {
      const t = await generateTrendReport(subject, period)
      console.log(`\n${subject} — ${period}:`)
      if (!t.hasComparisonData) {
        console.log(`  Insufficient historical data for a ${period} trend yet — no events exist in the`)
        console.log(`  prior ${period} window. Current window: ${t.current.totalServed} served,`)
        console.log(`  coverage ${fmtPct(t.current.coveragePercent)}, exact match ${fmtPct(t.current.exactMatchPercent)},`)
        console.log(`  groq fallback ${fmtPct(t.current.groqFallbackPercent)}, avg confidence ${fmtConf(t.current.averageConfidence)}.`)
      } else {
        console.log(`  Coverage:        ${fmtPct(t.current.coveragePercent)} (Δ ${t.deltas!.coveragePercent >= 0 ? '+' : ''}${t.deltas!.coveragePercent})`)
        console.log(`  Exact Match:     ${fmtPct(t.current.exactMatchPercent)} (Δ ${t.deltas!.exactMatchPercent >= 0 ? '+' : ''}${t.deltas!.exactMatchPercent})`)
        console.log(`  Grade Fallback:  ${fmtPct(t.current.gradeFallbackPercent)} (Δ ${t.deltas!.gradeFallbackPercent >= 0 ? '+' : ''}${t.deltas!.gradeFallbackPercent})`)
        console.log(`  Groq Fallback:   ${fmtPct(t.current.groqFallbackPercent)} (Δ ${t.deltas!.groqFallbackPercent >= 0 ? '+' : ''}${t.deltas!.groqFallbackPercent})`)
        console.log(`  Avg Confidence:  ${fmtConf(t.current.averageConfidence)} (Δ ${t.deltas!.averageConfidence ?? 'n/a'})`)
      }
    }
  }

  console.log(`\n${'═'.repeat(70)}`)
}

main().finally(() => prisma.$disconnect())
