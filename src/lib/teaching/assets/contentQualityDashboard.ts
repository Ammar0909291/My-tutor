/**
 * Content Quality Intelligence layer — read-only analytics over
 * MemoryServingEvent (the persisted counterpart of the memory* serving
 * metadata route.ts already returns on every turn — see that model's
 * schema comment in prisma/schema.prisma).
 *
 * ARCHITECTURE BOUNDARY (binding): this file has ZERO callers in the
 * serving path and must stay that way. matcher.ts / explanationMemory.ts /
 * teachingActionRepository.ts / route.ts's routing decision never import
 * anything from here, and nothing here ever writes to AssetIdentity,
 * ExplanationAsset, or any table the matcher reads. This module only reads
 * MemoryServingEvent (write-only from route.ts, fire-and-forget) and the
 * static content inventory (AssetIdentity counts, canonical KG concept
 * lists via getKnowledgeGraph/getAllNodes — the same read-only functions
 * repositoryStats.ts already uses for the same purpose). Changing what
 * this module reports can never change what a student is served.
 *
 * All rates are computed only over `provider` values that already exist
 * (memory/groq/yandex/fallback) and `servingMode`/`fallbackReason` values
 * that already exist (exact_match/grade_fallback/confidence_fallback,
 * grade_band/confidence/none/...) — no new taxonomy invented here.
 */
import { prisma } from '@/lib/db/prisma'
import { AssetFamily, AssetStatus } from '@prisma/client'
import { getKnowledgeGraph, getAllNodes } from '@/lib/curriculum/knowledgeGraph'

// ─── Per-concept stats ──────────────────────────────────────────────────────

export interface ConceptQualityStats {
  conceptId: string
  subject: string
  totalServed: number
  exactMatchCount: number
  gradeFallbackCount: number
  confidenceFallbackCount: number
  groqFallbackCount: number // provider !== 'memory' (groq/yandex/fallback combined — these are exactly the non-memory provider values)
  averageConfidence: number | null // over memory-served events only (confidence is null for non-memory turns)
  lastServed: Date | null
  assetCount: number // ACTIVE EXPLANATION assets for this concept, independent of whether ever served
  authoredCoverage: boolean // assetCount > 0
  exactMatchRate: number // 0-1, of totalServed
  gradeFallbackRate: number
  confidenceFallbackRate: number
  groqFallbackRate: number
}

/** Concept ids the canonical KG defines for a subject — the true universe,
 *  including concepts that have never been served or authored at all. */
export function subjectConceptIds(subjectSlug: string): string[] {
  const graph = getKnowledgeGraph(subjectSlug)
  if (!graph) return []
  return getAllNodes(graph).map((n) => n.slug)
}

/** Per-concept ACTIVE EXPLANATION asset counts for a subject, keyed by
 *  conceptId — one grouped query, not one query per concept. */
async function assetCountsBySubject(subjectSlug: string, conceptIds: string[]): Promise<Map<string, number>> {
  if (conceptIds.length === 0) return new Map()
  const rows = await prisma.assetIdentity.groupBy({
    by: ['conceptId'],
    where: { family: AssetFamily.EXPLANATION, status: AssetStatus.ACTIVE, conceptId: { in: conceptIds } },
    _count: { conceptId: true },
  })
  return new Map(rows.map((r) => [r.conceptId, r._count.conceptId]))
}

/** Per-concept serving-event aggregates for a subject — one grouped query. */
async function servingAggregatesBySubject(subjectSlug: string) {
  const rows = await prisma.memoryServingEvent.findMany({
    where: { subjectSlug },
    select: { conceptId: true, provider: true, servingMode: true, confidence: true, createdAt: true },
  })
  const byConcept = new Map<string, typeof rows>()
  for (const r of rows) {
    const list = byConcept.get(r.conceptId)
    if (list) list.push(r)
    else byConcept.set(r.conceptId, [r])
  }
  return byConcept
}

/** Full per-concept dashboard for one subject — every KG concept appears,
 *  including never-served/never-authored ones (totalServed=0). */
export async function getSubjectConceptStats(subjectSlug: string): Promise<ConceptQualityStats[]> {
  const conceptIds = subjectConceptIds(subjectSlug)
  const [assetCounts, eventsByConcept] = await Promise.all([
    assetCountsBySubject(subjectSlug, conceptIds),
    servingAggregatesBySubject(subjectSlug),
  ])

  return conceptIds.map((conceptId) => {
    const events = eventsByConcept.get(conceptId) ?? []
    const totalServed = events.length
    const exactMatchCount = events.filter((e) => e.servingMode === 'exact_match').length
    const gradeFallbackCount = events.filter((e) => e.servingMode === 'grade_fallback').length
    const confidenceFallbackCount = events.filter((e) => e.servingMode === 'confidence_fallback').length
    const groqFallbackCount = events.filter((e) => e.provider !== 'memory').length
    const confidences = events.map((e) => e.confidence).filter((c): c is number => c != null)
    const averageConfidence = confidences.length > 0 ? confidences.reduce((a, b) => a + b, 0) / confidences.length : null
    const lastServed = events.length > 0 ? events.reduce((a, b) => (a.createdAt > b.createdAt ? a : b)).createdAt : null
    const assetCount = assetCounts.get(conceptId) ?? 0

    return {
      conceptId, subject: subjectSlug, totalServed,
      exactMatchCount, gradeFallbackCount, confidenceFallbackCount, groqFallbackCount,
      averageConfidence, lastServed, assetCount, authoredCoverage: assetCount > 0,
      exactMatchRate: totalServed > 0 ? exactMatchCount / totalServed : 0,
      gradeFallbackRate: totalServed > 0 ? gradeFallbackCount / totalServed : 0,
      confidenceFallbackRate: totalServed > 0 ? confidenceFallbackCount / totalServed : 0,
      groqFallbackRate: totalServed > 0 ? groqFallbackCount / totalServed : 0,
    }
  })
}

// ─── Subject-level and global KPIs ─────────────────────────────────────────

export interface SubjectDashboard {
  subject: string
  kgConcepts: number
  authoredConcepts: number
  coveragePercent: number
  exactMatchPercent: number
  gradeFallbackPercent: number
  confidenceFallbackPercent: number
  groqFallbackPercent: number
  averageConfidence: number | null
  totalServed: number
}

/** Subject-level KPIs computed by summing the per-concept stats above —
 *  never a second, independent aggregation query, so the subject totals
 *  and per-concept rows can never disagree. */
export function summarizeSubject(subject: string, concepts: ConceptQualityStats[]): SubjectDashboard {
  const kgConcepts = concepts.length
  const authoredConcepts = concepts.filter((c) => c.authoredCoverage).length
  const totalServed = concepts.reduce((a, c) => a + c.totalServed, 0)
  const exact = concepts.reduce((a, c) => a + c.exactMatchCount, 0)
  const grade = concepts.reduce((a, c) => a + c.gradeFallbackCount, 0)
  const conf = concepts.reduce((a, c) => a + c.confidenceFallbackCount, 0)
  const groq = concepts.reduce((a, c) => a + c.groqFallbackCount, 0)
  const allConfidences = concepts.flatMap((c) => (c.averageConfidence != null ? Array(1).fill(c.averageConfidence) : []))
  // Weighted average confidence across concepts, weighted by each concept's
  // own served-with-confidence count — a simple mean-of-means would let a
  // concept served once outweigh one served a thousand times.
  const weightedSum = concepts.reduce((a, c) => a + (c.averageConfidence != null ? c.averageConfidence * (c.exactMatchCount + c.gradeFallbackCount + c.confidenceFallbackCount) : 0), 0)
  const weightedCount = concepts.reduce((a, c) => a + (c.averageConfidence != null ? (c.exactMatchCount + c.gradeFallbackCount + c.confidenceFallbackCount) : 0), 0)
  const averageConfidence = weightedCount > 0 ? weightedSum / weightedCount : (allConfidences.length ? allConfidences.reduce((a, b) => a + b, 0) / allConfidences.length : null)

  return {
    subject, kgConcepts, authoredConcepts,
    coveragePercent: kgConcepts > 0 ? round1(100 * authoredConcepts / kgConcepts) : 0,
    exactMatchPercent: totalServed > 0 ? round1(100 * exact / totalServed) : 0,
    gradeFallbackPercent: totalServed > 0 ? round1(100 * grade / totalServed) : 0,
    confidenceFallbackPercent: totalServed > 0 ? round1(100 * conf / totalServed) : 0,
    groqFallbackPercent: totalServed > 0 ? round1(100 * groq / totalServed) : 0,
    averageConfidence: averageConfidence != null ? round1(averageConfidence) : null,
    totalServed,
  }
}

function round1(n: number): number { return Math.round(n * 10) / 10 }

// ─── Authoring work queue (deterministic ranking) ──────────────────────────

export type AuthoringProblem = 'no_authored_asset' | 'groq_fallback' | 'grade_fallback' | 'low_confidence' | 'none'
export type AuthoringPriority = 'Critical' | 'High' | 'Medium' | 'Low'
export type AuthoringRecommendation =
  | 'AUTHOR_FIRST_ASSET' | 'ADD_ADULT_VARIANT' | 'REWRITE_EXPLANATION' | 'ADD_MISCONCEPTIONS' | 'ADD_PRACTICE_SET' | 'NO_ACTION'

export interface WorkQueueItem {
  rank: number
  conceptId: string
  subject: string
  requests: number
  problem: AuthoringProblem
  priority: AuthoringPriority
  recommendation: AuthoringRecommendation
  priorityScore: number
}

// Deterministic, side-effect-free classification — same stats always
// produce the same problem/recommendation. Priority order below (checked
// top to bottom) encodes the authoring priority the task specified:
// (1) no coverage at all, (2) Groq is still winning despite some coverage,
// (3) low-confidence/adult-register mismatch, (4) fine as-is.
function classifyProblem(c: ConceptQualityStats): AuthoringProblem {
  if (c.totalServed === 0) return 'none' // never requested — nothing to prioritize yet, regardless of coverage
  if (!c.authoredCoverage) return 'no_authored_asset'
  if (c.groqFallbackRate >= 0.5) return 'groq_fallback' // majority of real requests still miss memory entirely
  if (c.gradeFallbackRate >= 0.5) return 'grade_fallback' // memory serves, but mostly at the wrong register
  if (c.averageConfidence != null && c.averageConfidence < DEFAULT_LOW_CONFIDENCE_BAR) return 'low_confidence'
  return 'none'
}

const DEFAULT_LOW_CONFIDENCE_BAR = 65 // matches matcher.ts's DEFAULT_CONFIDENCE_THRESHOLD — informational only, never fed back into scoring

function recommend(problem: AuthoringProblem): AuthoringRecommendation {
  switch (problem) {
    case 'no_authored_asset': return 'AUTHOR_FIRST_ASSET'
    case 'grade_fallback': return 'ADD_ADULT_VARIANT'
    case 'groq_fallback': return 'AUTHOR_FIRST_ASSET' // groq_fallback with SOME coverage means existing assets aren't clearing the bar for real requesters — same root fix as no coverage: author for the register that's actually being requested
    case 'low_confidence': return 'REWRITE_EXPLANATION'
    case 'none': return 'NO_ACTION'
  }
}

function priorityOf(problem: AuthoringProblem, requests: number): AuthoringPriority {
  if (problem === 'none') return 'Low'
  // Thresholds are volume-based, not hardcoded per-concept exceptions —
  // the same rule applies to every subject and every concept.
  if (requests >= 1000) return 'Critical'
  if (requests >= 100) return 'High'
  if (requests >= 10) return 'Medium'
  return 'Low'
}

function priorityScore(problem: AuthoringProblem, requests: number): number {
  // Deterministic sort key: problem severity first (no coverage is worse
  // than a register mismatch), then request volume within the same
  // severity — mirrors priorityOf's bands without duplicating logic.
  const severity: Record<AuthoringProblem, number> = { no_authored_asset: 4, groq_fallback: 3, grade_fallback: 2, low_confidence: 1, none: 0 }
  return severity[problem] * 1_000_000 + requests
}

/** Ranked authoring work queue across one or more subjects' concept stats.
 *  Purely a sort + classify over data already computed above — no new
 *  queries, no randomness, no manual curation. */
export function buildWorkQueue(allConcepts: ConceptQualityStats[], limit = 50): WorkQueueItem[] {
  const items = allConcepts
    .map((c) => {
      const problem = classifyProblem(c)
      return {
        conceptId: c.conceptId, subject: c.subject, requests: c.totalServed,
        problem, priority: priorityOf(problem, c.totalServed), recommendation: recommend(problem),
        priorityScore: priorityScore(problem, c.totalServed),
      }
    })
    .filter((i) => i.problem !== 'none')
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, limit)
    .map((item, i) => ({ rank: i + 1, ...item }))
  return items
}

/** One deterministic recommendation per concept, including "no problem"
 *  concepts (NO_ACTION) — the per-concept counterpart to the work queue. */
export function recommendationFor(c: ConceptQualityStats): AuthoringRecommendation {
  return recommend(classifyProblem(c))
}

// ─── Heatmaps ───────────────────────────────────────────────────────────────

export interface Heatmaps {
  mostServed: ConceptQualityStats[]
  mostFallback: ConceptQualityStats[] // highest (gradeFallback+confidenceFallback+groqFallback)/totalServed, min 1 request
  mostRequestedGroq: ConceptQualityStats[] // highest groqFallbackCount (absolute)
  lowestConfidence: ConceptQualityStats[] // lowest averageConfidence, only concepts with at least one memory-served event
  highestConfidence: ConceptQualityStats[]
}

export function buildHeatmaps(allConcepts: ConceptQualityStats[], top = 10): Heatmaps {
  const served = allConcepts.filter((c) => c.totalServed > 0)
  const withConfidence = allConcepts.filter((c) => c.averageConfidence != null)

  return {
    mostServed: [...served].sort((a, b) => b.totalServed - a.totalServed).slice(0, top),
    mostFallback: [...served]
      .sort((a, b) => (b.gradeFallbackRate + b.confidenceFallbackRate + b.groqFallbackRate) - (a.gradeFallbackRate + a.confidenceFallbackRate + a.groqFallbackRate))
      .slice(0, top),
    mostRequestedGroq: [...served].sort((a, b) => b.groqFallbackCount - a.groqFallbackCount).filter((c) => c.groqFallbackCount > 0).slice(0, top),
    lowestConfidence: [...withConfidence].sort((a, b) => (a.averageConfidence ?? 0) - (b.averageConfidence ?? 0)).slice(0, top),
    highestConfidence: [...withConfidence].sort((a, b) => (b.averageConfidence ?? 0) - (a.averageConfidence ?? 0)).slice(0, top),
  }
}

// ─── Trend reports (daily/weekly/monthly) ──────────────────────────────────

export interface TrendReport {
  period: 'daily' | 'weekly' | 'monthly'
  windowStart: Date
  windowEnd: Date
  previousWindowStart: Date
  hasComparisonData: boolean // false until a full prior window of events exists — never fabricates a trend from zero data
  current: { coveragePercent: number; exactMatchPercent: number; gradeFallbackPercent: number; groqFallbackPercent: number; averageConfidence: number | null; totalServed: number }
  previous: { coveragePercent: number; exactMatchPercent: number; gradeFallbackPercent: number; groqFallbackPercent: number; averageConfidence: number | null; totalServed: number } | null
  deltas: { coveragePercent: number; exactMatchPercent: number; gradeFallbackPercent: number; groqFallbackPercent: number; averageConfidence: number | null } | null
}

const PERIOD_MS: Record<TrendReport['period'], number> = {
  daily: 24 * 60 * 60 * 1000,
  weekly: 7 * 24 * 60 * 60 * 1000,
  monthly: 30 * 24 * 60 * 60 * 1000,
}

/** Compares the current window's events against the immediately-preceding
 *  window of the same length, for one subject. Coverage (authoredConcepts)
 *  is evaluated at "now" for both windows (it's a property of the current
 *  catalogue, not something events retroactively change), so only the
 *  serving-rate fields are genuinely time-windowed. */
export async function generateTrendReport(subjectSlug: string, period: TrendReport['period'], now = new Date()): Promise<TrendReport> {
  const windowMs = PERIOD_MS[period]
  const windowEnd = now
  const windowStart = new Date(now.getTime() - windowMs)
  const previousWindowStart = new Date(windowStart.getTime() - windowMs)

  const conceptIds = subjectConceptIds(subjectSlug)
  const assetCounts = await assetCountsBySubject(subjectSlug, conceptIds)
  const authoredConcepts = conceptIds.filter((id) => (assetCounts.get(id) ?? 0) > 0).length
  const coveragePercent = conceptIds.length > 0 ? round1(100 * authoredConcepts / conceptIds.length) : 0

  const [currentEvents, previousEvents] = await Promise.all([
    prisma.memoryServingEvent.findMany({ where: { subjectSlug, createdAt: { gte: windowStart, lt: windowEnd } }, select: { provider: true, servingMode: true, confidence: true } }),
    prisma.memoryServingEvent.findMany({ where: { subjectSlug, createdAt: { gte: previousWindowStart, lt: windowStart } }, select: { provider: true, servingMode: true, confidence: true } }),
  ])

  const summarizeEvents = (events: typeof currentEvents) => {
    const total = events.length
    const exact = events.filter((e) => e.servingMode === 'exact_match').length
    const grade = events.filter((e) => e.servingMode === 'grade_fallback').length
    const groq = events.filter((e) => e.provider !== 'memory').length
    const confidences = events.map((e) => e.confidence).filter((c): c is number => c != null)
    const avgConf = confidences.length > 0 ? confidences.reduce((a, b) => a + b, 0) / confidences.length : null
    return {
      coveragePercent, // current catalogue state applies to both windows — this dashboard has no historical coverage snapshots yet (see hasComparisonData)
      exactMatchPercent: total > 0 ? round1(100 * exact / total) : 0,
      gradeFallbackPercent: total > 0 ? round1(100 * grade / total) : 0,
      groqFallbackPercent: total > 0 ? round1(100 * groq / total) : 0,
      averageConfidence: avgConf != null ? round1(avgConf) : null,
      totalServed: total,
    }
  }

  const current = summarizeEvents(currentEvents)
  const hasComparisonData = previousEvents.length > 0
  const previous = hasComparisonData ? summarizeEvents(previousEvents) : null

  return {
    period, windowStart, windowEnd, previousWindowStart, hasComparisonData,
    current, previous,
    deltas: previous ? {
      coveragePercent: round1(current.coveragePercent - previous.coveragePercent),
      exactMatchPercent: round1(current.exactMatchPercent - previous.exactMatchPercent),
      gradeFallbackPercent: round1(current.gradeFallbackPercent - previous.gradeFallbackPercent),
      groqFallbackPercent: round1(current.groqFallbackPercent - previous.groqFallbackPercent),
      averageConfidence: current.averageConfidence != null && previous.averageConfidence != null ? round1(current.averageConfidence - previous.averageConfidence) : null,
    } : null,
  }
}
