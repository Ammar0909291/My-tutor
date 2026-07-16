/**
 * Learning Analytics — ADR 13 Phase 2, over the Evidence Reader's normalized
 * LessonEvidence model. Pure and deterministic: same lessons in, same metrics
 * out, all lists stably sorted (rate desc, then id asc). Subject-agnostic —
 * every metric groups by conceptId and works for any subject the reader
 * emits; nothing here knows about physics.
 */
import type { LessonEvidence } from './evidenceReader'

// ── Shared helpers ───────────────────────────────────────────────────────────

export interface RateStat {
  successes: number
  failures: number
  total: number
  rate: number // successes / total; 0 when total is 0
}

function rateStat(successes: number, failures: number): RateStat {
  const total = successes + failures
  return { successes, failures, total, rate: total === 0 ? 0 : successes / total }
}

function sortByWorstRate<T extends { id: string; stat: RateStat }>(rows: T[]): T[] {
  return rows.sort((a, b) => a.stat.rate - b.stat.rate || b.stat.total - a.stat.total || a.id.localeCompare(b.id))
}

// ── Metrics ──────────────────────────────────────────────────────────────────

export interface ConceptFailureStat { id: string; subject: string; stat: RateStat }

/** Concepts ranked by probe failure (lowest pass rate first).
 *  minSample: concepts with fewer probe outcomes are excluded — a single
 *  failure must never brand a concept "most failed". */
export function mostFailedConcepts(lessons: LessonEvidence[], minSample = 5): ConceptFailureStat[] {
  const byConcept = new Map<string, { subject: string; pass: number; fail: number }>()
  for (const l of lessons) {
    const c = byConcept.get(l.conceptId) ?? { subject: l.subject, pass: 0, fail: 0 }
    for (const p of l.probes) (p.passed ? c.pass++ : c.fail++)
    byConcept.set(l.conceptId, c)
  }
  const rows: ConceptFailureStat[] = []
  for (const [id, c] of byConcept) {
    const stat = rateStat(c.pass, c.fail)
    if (stat.total >= minSample) rows.push({ id, subject: c.subject, stat })
  }
  return sortByWorstRate(rows)
}

export interface MisconceptionStat {
  /** canonical slug when attributed, else the normalized phrase bucket */
  id: string
  conceptId: string
  detections: number
  /** learners in whom it was detected */
  learners: number
  /** verbatim sample phrases (first N distinct, authoring input) */
  samplePhrases: string[]
}

/** Most common misconceptions, grouped by attributed slug when present and
 *  by concept+phrase otherwise. Sorted by detections desc. */
export function mostCommonMisconceptions(lessons: LessonEvidence[], sampleLimit = 3): MisconceptionStat[] {
  const byKey = new Map<string, { conceptId: string; detections: number; learners: Set<string>; phrases: Set<string> }>()
  for (const l of lessons) {
    for (const m of l.misconceptions) {
      const key = m.misconceptionId ? `${l.conceptId}::${m.misconceptionId}` : `${l.conceptId}::phrase:${m.phrase.toLowerCase().slice(0, 60)}`
      const cur = byKey.get(key) ?? { conceptId: l.conceptId, detections: 0, learners: new Set<string>(), phrases: new Set<string>() }
      cur.detections++
      cur.learners.add(l.userId)
      if (cur.phrases.size < sampleLimit) cur.phrases.add(m.phrase)
      byKey.set(key, cur)
    }
  }
  return [...byKey.entries()]
    .map(([key, v]) => ({
      id: key.split('::')[1],
      conceptId: v.conceptId,
      detections: v.detections,
      learners: v.learners.size,
      samplePhrases: [...v.phrases].sort(),
    }))
    .sort((a, b) => b.detections - a.detections || a.conceptId.localeCompare(b.conceptId) || a.id.localeCompare(b.id))
}

export interface TeachingActionStat { id: string; stat: RateStat }

/** Teaching-action (strategy posture) success rates via the L5 join:
 *  a strategy "succeeds" when the FIRST probe outcome after it (same lesson,
 *  later timestamp) is a pass. Strategies with no following probe don't count. */
export function teachingActionSuccessRates(lessons: LessonEvidence[]): TeachingActionStat[] {
  const byStrategy = new Map<string, { pass: number; fail: number }>()
  for (const l of lessons) {
    for (const ta of l.teachingActions) {
      const next = l.probes.find((p) => p.occurredAt.getTime() >= ta.occurredAt.getTime())
      if (!next) continue
      const s = byStrategy.get(ta.strategy) ?? { pass: 0, fail: 0 }
      ;(next.passed ? s.pass++ : s.fail++)
      byStrategy.set(ta.strategy, s)
    }
  }
  return sortByWorstRate(
    [...byStrategy.entries()].map(([id, s]) => ({ id, stat: rateStat(s.pass, s.fail) })),
  )
}

export interface RecoveryStat { state: string; stat: RateStat }

/** Recovery success: a recovery event "succeeds" when the learner produces a
 *  passing probe LATER IN THE SAME LESSON (the L1 what-followed join). */
export function recoverySuccessRates(lessons: LessonEvidence[]): RecoveryStat[] {
  const byState = new Map<string, { pass: number; fail: number }>()
  for (const l of lessons) {
    for (const r of l.recoveries) {
      const followedByPass = l.probes.some((p) => p.occurredAt.getTime() > r.occurredAt.getTime() && p.passed)
      const s = byState.get(r.state) ?? { pass: 0, fail: 0 }
      ;(followedByPass ? s.pass++ : s.fail++)
      byState.set(r.state, s)
    }
  }
  return [...byState.entries()]
    .map(([state, s]) => ({ state, stat: rateStat(s.pass, s.fail) }))
    .sort((a, b) => a.stat.rate - b.stat.rate || a.state.localeCompare(b.state))
}

export interface ProbeEffectivenessStat {
  /** placement bracket / probe key ('' = ordinary non-placement probes) */
  probe: string
  conceptId: string
  stat: RateStat
  /** flags a probe that separates nothing: everyone passes or everyone fails */
  discriminates: boolean
}

/** Probe effectiveness per (concept, placement-key). A probe is effective
 *  when it DISCRIMINATES — pass rate strictly between the floor and ceiling
 *  (default 0.1–0.9) once it has enough samples. */
export function probeEffectiveness(
  lessons: LessonEvidence[],
  minSample = 5,
  floor = 0.1,
  ceiling = 0.9,
): ProbeEffectivenessStat[] {
  const byKey = new Map<string, { conceptId: string; probe: string; pass: number; fail: number }>()
  for (const l of lessons) {
    for (const p of l.probes) {
      const probe = p.placement ?? ''
      const key = `${l.conceptId}::${probe}`
      const cur = byKey.get(key) ?? { conceptId: l.conceptId, probe, pass: 0, fail: 0 }
      ;(p.passed ? cur.pass++ : cur.fail++)
      byKey.set(key, cur)
    }
  }
  return [...byKey.values()]
    .map((v) => {
      const stat = rateStat(v.pass, v.fail)
      const discriminates = stat.total < minSample || (stat.rate > floor && stat.rate < ceiling)
      return { probe: v.probe, conceptId: v.conceptId, stat, discriminates }
    })
    .sort((a, b) => a.conceptId.localeCompare(b.conceptId) || a.probe.localeCompare(b.probe))
}

export interface MasteryTimeStat {
  conceptId: string
  learners: number
  /** mean milliseconds from a learner's first evidence on the concept to the
   *  last event of their first 'mastered'/'progressing' lesson */
  avgMs: number
}

/** Average time-to-mastery per concept, over learners who got there. */
export function averageMasteryTime(lessons: LessonEvidence[]): MasteryTimeStat[] {
  const perLearnerConcept = new Map<string, { first: number; masteredAt: number | null }>()
  for (const l of lessons) {
    const key = `${l.userId} ${l.conceptId}`
    const cur = perLearnerConcept.get(key) ?? { first: l.firstEventAt.getTime(), masteredAt: null }
    cur.first = Math.min(cur.first, l.firstEventAt.getTime())
    if ((l.outcome === 'mastered' || l.outcome === 'progressing') && cur.masteredAt === null) {
      cur.masteredAt = l.lastEventAt.getTime()
    }
    perLearnerConcept.set(key, cur)
  }
  const byConcept = new Map<string, number[]>()
  for (const [key, v] of perLearnerConcept) {
    if (v.masteredAt === null) continue
    const conceptId = key.split(' ')[1]
    const arr = byConcept.get(conceptId) ?? []
    arr.push(Math.max(0, v.masteredAt - v.first))
    byConcept.set(conceptId, arr)
  }
  return [...byConcept.entries()]
    .map(([conceptId, times]) => ({
      conceptId,
      learners: times.length,
      avgMs: times.reduce((a, b) => a + b, 0) / times.length,
    }))
    .sort((a, b) => b.avgMs - a.avgMs || a.conceptId.localeCompare(b.conceptId))
}

export interface RemediationStat { conceptId: string; learners: number; repeatDetections: number }

/** Concepts requiring repeated remediation: the same learner triggers
 *  misconception detection on the concept in ≥2 distinct lessons (the repair
 *  didn't hold — student-state/03's regrowth signature). */
export function conceptsRequiringRepeatedRemediation(lessons: LessonEvidence[]): RemediationStat[] {
  const lessonsWithMc = new Map<string, number>() // "user concept" → lesson count with detections
  for (const l of lessons) {
    if (l.misconceptions.length === 0) continue
    const key = `${l.userId} ${l.conceptId}`
    lessonsWithMc.set(key, (lessonsWithMc.get(key) ?? 0) + 1)
  }
  const byConcept = new Map<string, { learners: number; repeats: number }>()
  for (const [key, count] of lessonsWithMc) {
    if (count < 2) continue
    const conceptId = key.split(' ')[1]
    const cur = byConcept.get(conceptId) ?? { learners: 0, repeats: 0 }
    cur.learners++
    cur.repeats += count
    byConcept.set(conceptId, cur)
  }
  return [...byConcept.entries()]
    .map(([conceptId, v]) => ({ conceptId, learners: v.learners, repeatDetections: v.repeats }))
    .sort((a, b) => b.repeatDetections - a.repeatDetections || a.conceptId.localeCompare(b.conceptId))
}

export interface DropOffStat { conceptId: string; abandonedLessons: number; totalLessons: number; rate: number }

/** Student drop-off points: concepts ranked by abandoned-lesson rate
 *  (failure-then-vanish per the reader's outcome classifier). */
export function dropOffPoints(lessons: LessonEvidence[], minLessons = 3): DropOffStat[] {
  const byConcept = new Map<string, { abandoned: number; total: number }>()
  for (const l of lessons) {
    if (l.outcome === 'no_signal') continue
    const cur = byConcept.get(l.conceptId) ?? { abandoned: 0, total: 0 }
    cur.total++
    if (l.outcome === 'abandoned') cur.abandoned++
    byConcept.set(l.conceptId, cur)
  }
  return [...byConcept.entries()]
    .filter(([, v]) => v.total >= minLessons)
    .map(([conceptId, v]) => ({
      conceptId,
      abandonedLessons: v.abandoned,
      totalLessons: v.total,
      rate: v.abandoned / v.total,
    }))
    .sort((a, b) => b.rate - a.rate || b.totalLessons - a.totalLessons || a.conceptId.localeCompare(b.conceptId))
}

// ── One-call bundle ──────────────────────────────────────────────────────────

export interface LearningAnalytics {
  lessonsAnalyzed: number
  conceptsSeen: number
  mostFailedConcepts: ConceptFailureStat[]
  mostCommonMisconceptions: MisconceptionStat[]
  teachingActionSuccessRates: TeachingActionStat[]
  recoverySuccessRates: RecoveryStat[]
  probeEffectiveness: ProbeEffectivenessStat[]
  averageMasteryTime: MasteryTimeStat[]
  conceptsRequiringRepeatedRemediation: RemediationStat[]
  dropOffPoints: DropOffStat[]
}

export function computeLearningAnalytics(lessons: LessonEvidence[]): LearningAnalytics {
  return {
    lessonsAnalyzed: lessons.length,
    conceptsSeen: new Set(lessons.map((l) => l.conceptId)).size,
    mostFailedConcepts: mostFailedConcepts(lessons),
    mostCommonMisconceptions: mostCommonMisconceptions(lessons),
    teachingActionSuccessRates: teachingActionSuccessRates(lessons),
    recoverySuccessRates: recoverySuccessRates(lessons),
    probeEffectiveness: probeEffectiveness(lessons),
    averageMasteryTime: averageMasteryTime(lessons),
    conceptsRequiringRepeatedRemediation: conceptsRequiringRepeatedRemediation(lessons),
    dropOffPoints: dropOffPoints(lessons),
  }
}
