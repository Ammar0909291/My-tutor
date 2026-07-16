/**
 * Student Intelligence — the persistent learner model (Delivery 8, Student
 * State Model, made computable). Sits between the student and the Learning
 * Orchestrator as the SINGLE learner input.
 *
 * Design laws (educational-brain/student-state/, applied):
 *   - DESCRIBES the learner, never decides what to teach. No field of this
 *     object is an instruction; consumers (Learning Orchestrator) decide.
 *   - Evidence-backed and dated: every dimension derives from the Evidence
 *     Reader's LessonEvidence and carries its sample size — a hypothesis
 *     with N=1 must be readable AS a hypothesis (evidenceCount fields).
 *   - Decaying: recency matters; forgetting risk grows with silence.
 *   - Descriptions-never-verdicts: modality affinities are statistics with
 *     minimum evidence, never learning-style identities.
 *   - Deterministic: same lessons + same `now` → byte-identical profile.
 *     The clock is injected; nothing reads Date.now().
 *
 * Storage: NONE. The profile is derived on read from the existing evidence
 *   surfaces (EvidenceEvent, TeachingStrategyEvent, TopicProgress,
 *   MistakeRecord — all via the Evidence Reader). No new tables, no
 *   duplicate learner store; ADR 10's stores remain the runtime containers.
 */
import type { LessonEvidence } from '../evidence/evidenceReader'

// ── Profile shape ────────────────────────────────────────────────────────────

export interface ConceptState {
  conceptId: string
  subject: string
  /** lessons observed on this concept */
  lessons: number
  probeOutcomes: number
  probePassRate: number | null
  /** TopicProgress mastery at read time, when tracked */
  masteryPct: number | null
  masteryStatus: string | null
  mastered: boolean
  firstEvidenceAt: Date
  lastEvidenceAt: Date
  /** 0–1: probability-shaped risk that this knowledge has decayed, from
   *  time-since-last-evidence against a mastery-scaled half-life */
  forgettingRisk: number
  /** lessons beyond the first on the same concept (retry pressure) */
  retries: number
}

export type MisconceptionActivity = 'active' | 'dormant'

export interface MisconceptionState {
  /** canonical slug when attributed, else phrase bucket */
  id: string
  conceptId: string
  detections: number
  firstDetectedAt: Date
  lastDetectedAt: Date
  /** verbatim learner phrases (bounded, authoring/repair input) */
  phrases: string[]
  /** active: no passing probe on the concept after the last detection.
   *  dormant: a later pass exists — repair plausibly landed (never "erased":
   *  student-state/03 keeps re-checks forever). */
  activity: MisconceptionActivity
  /** times the misconception re-appeared after a dormancy pass (regrowth) */
  regrowths: number
}

export interface ConfidenceTrend {
  /** probe-stated confidence observations in time order (high=1, mid=0.5, low=0) */
  observations: number
  /** mean of the first and second half of observations — direction reads
   *  from firstHalfMean → secondHalfMean (null when <4 observations) */
  firstHalfMean: number | null
  secondHalfMean: number | null
  direction: 'rising' | 'falling' | 'stable' | 'insufficient_evidence'
  /** confident-but-wrong events (stated high confidence on a failed probe) —
   *  the calibration danger quadrant */
  confidentWrongCount: number
  /** hesitant-but-right events (stated low confidence on a passed probe) */
  hesitantRightCount: number
}

export interface LearningVelocity {
  /** concepts that reached mastered/progressing, per week of active span */
  conceptsProgressedPerWeek: number | null
  /** probe passes per lesson with probes */
  passesPerLesson: number | null
  activeSpanDays: number
  lessonsObserved: number
}

export interface ModalityAffinity {
  /** teaching strategy observed (the runtime's posture vocabulary) */
  strategy: string
  /** first-following-probe success rate after this strategy (L5 join) */
  successRate: number
  evidenceCount: number
}

export interface RecoveryEffectiveness {
  state: string
  attempts: number
  /** recoveries followed by a later passing probe in the same lesson */
  recovered: number
  rate: number
}

export interface EngagementPattern {
  sessionsObserved: number
  lessonsObserved: number
  abandonedLessons: number
  abandonedRate: number | null
  /** mean minutes from first to last event within a lesson */
  meanLessonSpanMinutes: number | null
  /** longest silence between consecutive lessons, in days */
  longestGapDays: number | null
  lastActiveAt: Date | null
}

export interface CognitiveLoadIndicators {
  /** share of probe outcomes carrying confusion=true */
  confusionRate: number | null
  /** mean answer latency in seconds, where the writer measured it */
  meanProbeLatencySec: number | null
  /** latency direction across halves of the observation window */
  latencyDirection: 'rising' | 'falling' | 'stable' | 'insufficient_evidence'
  observations: number
}

/** The canonical Student Intelligence object — the single learner input to
 *  the Learning Orchestrator. Purely descriptive. */
export interface StudentIntelligence {
  userId: string
  /** the injected read-time clock this profile was computed against */
  asOf: Date
  evidenceBase: { lessons: number; probeOutcomes: number; concepts: number }
  masteredConcepts: string[]
  conceptStates: ConceptState[]
  activeMisconceptions: MisconceptionState[]
  misconceptionHistory: MisconceptionState[]
  confidence: ConfidenceTrend
  velocity: LearningVelocity
  /** concepts ranked by forgetting risk (highest first), risk > 0 only */
  forgettingRisks: Array<{ conceptId: string; risk: number }>
  modalityAffinities: ModalityAffinity[]
  probePerformance: { outcomes: number; passRate: number | null }
  recoveryEffectiveness: RecoveryEffectiveness[]
  engagement: EngagementPattern
  cognitiveLoad: CognitiveLoadIndicators
}

// ── Tunables (explicit, deterministic) ───────────────────────────────────────

export interface StudentIntelligenceOptions {
  /** read-time clock — REQUIRED for deterministic forgetting computation */
  now: Date
  /** base half-life in days for forgetting decay at 100% mastery */
  forgettingHalfLifeDays?: number
  /** minimum L5-join samples before a modality affinity is reported */
  minModalityEvidence?: number
  /** bounded verbatim phrases kept per misconception */
  phraseLimit?: number
}

const DEFAULTS = {
  forgettingHalfLifeDays: 30,
  minModalityEvidence: 3,
  phraseLimit: 3,
}

const CONFIDENCE_VALUE: Record<string, number> = { high: 1, medium: 0.5, mid: 0.5, low: 0 }

// ── Builders ─────────────────────────────────────────────────────────────────

function daysBetween(a: Date, b: Date): number {
  return Math.max(0, (b.getTime() - a.getTime()) / 86_400_000)
}

/** The half-life (days) forgettingRisk scales to, given how solid the
 *  knowledge was (pass rate; unknown → 0.5). Extracted (pure refactor, same
 *  values forgettingRisk always computed inline) so other consumers that
 *  need the inverse of the decay law — e.g. "at what date does risk cross
 *  a threshold" — reuse the exact same scaling rather than re-deriving it.
 *  Spaced Retrieval Scheduler (Claude Recommendation #8) is the first such
 *  consumer. */
export function effectiveHalfLifeDays(passRate: number | null, baseHalfLifeDays: number): number {
  const solidity = passRate ?? 0.5
  return baseHalfLifeDays * (0.5 + solidity) // 15d at 0%, 45d at 100% (base 30)
}

/** Forgetting risk: 1 − 2^(−Δt/halfLife), with the half-life scaled by how
 *  solid the knowledge was (pass rate; unknown → 0.5). Mirrors ADR 10's
 *  decayedScore law read as risk instead of score. */
export function forgettingRisk(
  lastEvidenceAt: Date,
  now: Date,
  passRate: number | null,
  baseHalfLifeDays: number,
): number {
  const halfLife = effectiveHalfLifeDays(passRate, baseHalfLifeDays)
  const dt = daysBetween(lastEvidenceAt, now)
  const retention = Math.pow(2, -dt / halfLife)
  return Math.min(1, Math.max(0, 1 - retention))
}

function buildConceptStates(
  lessons: LessonEvidence[],
  now: Date,
  halfLifeDays: number,
): ConceptState[] {
  const byConcept = new Map<string, LessonEvidence[]>()
  for (const l of lessons) {
    const arr = byConcept.get(l.conceptId) ?? []
    arr.push(l)
    byConcept.set(l.conceptId, arr)
  }
  const out: ConceptState[] = []
  for (const [conceptId, ls] of [...byConcept.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    let pass = 0, fail = 0
    let masteryPct: number | null = null
    let masteryStatus: string | null = null
    let first = ls[0].firstEventAt, last = ls[0].lastEventAt
    for (const l of ls) {
      for (const p of l.probes) (p.passed ? pass++ : fail++)
      if (l.masteryPct !== null) masteryPct = l.masteryPct
      if (l.masteryStatus !== null) masteryStatus = l.masteryStatus
      if (l.firstEventAt < first) first = l.firstEventAt
      if (l.lastEventAt > last) last = l.lastEventAt
    }
    const total = pass + fail
    const passRate = total > 0 ? pass / total : null
    const mastered = masteryStatus === 'MASTERED' || masteryStatus === 'COMPLETED'
    out.push({
      conceptId,
      subject: ls[0].subject,
      lessons: ls.length,
      probeOutcomes: total,
      probePassRate: passRate,
      masteryPct,
      masteryStatus,
      mastered,
      firstEvidenceAt: first,
      lastEvidenceAt: last,
      forgettingRisk: forgettingRisk(last, now, passRate, halfLifeDays),
      retries: ls.length - 1,
    })
  }
  return out
}

function buildMisconceptions(lessons: LessonEvidence[], phraseLimit: number): MisconceptionState[] {
  interface Acc {
    conceptId: string
    detections: Array<Date>
    phrases: Set<string>
    first: Date
    last: Date
  }
  const byKey = new Map<string, Acc>()
  // Passing probes per concept, time-ordered — the dormancy/regrowth clock.
  const passesByConcept = new Map<string, number[]>()
  for (const l of lessons) {
    for (const p of l.probes) {
      if (!p.passed) continue
      const arr = passesByConcept.get(l.conceptId) ?? []
      arr.push(p.occurredAt.getTime())
      passesByConcept.set(l.conceptId, arr)
    }
  }
  for (const l of lessons) {
    for (const m of l.misconceptions) {
      const id = m.misconceptionId ?? `phrase:${m.phrase.toLowerCase().slice(0, 60)}`
      const key = `${l.conceptId}::${id}`
      const acc = byKey.get(key) ?? {
        conceptId: l.conceptId, detections: [], phrases: new Set<string>(),
        first: m.occurredAt, last: m.occurredAt,
      }
      acc.detections.push(m.occurredAt)
      if (acc.phrases.size < phraseLimit) acc.phrases.add(m.phrase)
      if (m.occurredAt < acc.first) acc.first = m.occurredAt
      if (m.occurredAt > acc.last) acc.last = m.occurredAt
      byKey.set(key, acc)
    }
  }
  const out: MisconceptionState[] = []
  for (const [key, acc] of [...byKey.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const passes = (passesByConcept.get(acc.conceptId) ?? []).sort((a, b) => a - b)
    const detections = [...acc.detections].sort((a, b) => a.getTime() - b.getTime())
    // Regrowth: a detection AFTER a pass that itself followed an earlier
    // detection (repair seemed to land, then the misconception came back).
    let regrowths = 0
    for (let i = 1; i < detections.length; i++) {
      const passBetween = passes.some(
        (t) => t > detections[i - 1].getTime() && t < detections[i].getTime(),
      )
      if (passBetween) regrowths++
    }
    const lastDetection = detections[detections.length - 1].getTime()
    const passAfterLast = passes.some((t) => t > lastDetection)
    out.push({
      id: key.split('::')[1],
      conceptId: acc.conceptId,
      detections: detections.length,
      firstDetectedAt: detections[0],
      lastDetectedAt: detections[detections.length - 1],
      phrases: [...acc.phrases].sort(),
      activity: passAfterLast ? 'dormant' : 'active',
      regrowths,
    })
  }
  return out
}

function buildConfidence(lessons: LessonEvidence[]): ConfidenceTrend {
  const series: Array<{ at: number; value: number; passed: boolean; token: string }> = []
  for (const l of lessons) {
    for (const p of l.probes) {
      if (p.confidence === null) continue
      const value = CONFIDENCE_VALUE[p.confidence.toLowerCase()]
      if (value === undefined) continue
      series.push({ at: p.occurredAt.getTime(), value, passed: p.passed, token: p.confidence })
    }
  }
  series.sort((a, b) => a.at - b.at)
  const confidentWrongCount = series.filter((s) => s.value === 1 && !s.passed).length
  const hesitantRightCount = series.filter((s) => s.value === 0 && s.passed).length
  if (series.length < 4) {
    return {
      observations: series.length,
      firstHalfMean: null, secondHalfMean: null,
      direction: 'insufficient_evidence',
      confidentWrongCount, hesitantRightCount,
    }
  }
  const mid = Math.floor(series.length / 2)
  const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length
  const firstHalfMean = mean(series.slice(0, mid).map((s) => s.value))
  const secondHalfMean = mean(series.slice(mid).map((s) => s.value))
  const delta = secondHalfMean - firstHalfMean
  return {
    observations: series.length,
    firstHalfMean,
    secondHalfMean,
    direction: delta > 0.1 ? 'rising' : delta < -0.1 ? 'falling' : 'stable',
    confidentWrongCount,
    hesitantRightCount,
  }
}

function buildVelocity(lessons: LessonEvidence[]): LearningVelocity {
  if (lessons.length === 0) {
    return { conceptsProgressedPerWeek: null, passesPerLesson: null, activeSpanDays: 0, lessonsObserved: 0 }
  }
  const first = Math.min(...lessons.map((l) => l.firstEventAt.getTime()))
  const last = Math.max(...lessons.map((l) => l.lastEventAt.getTime()))
  const spanDays = (last - first) / 86_400_000
  const progressed = new Set(
    lessons.filter((l) => l.outcome === 'mastered' || l.outcome === 'progressing').map((l) => l.conceptId),
  ).size
  const lessonsWithProbes = lessons.filter((l) => l.probes.length > 0)
  const totalPasses = lessonsWithProbes.reduce((n, l) => n + l.probes.filter((p) => p.passed).length, 0)
  return {
    conceptsProgressedPerWeek: spanDays > 0 ? progressed / (spanDays / 7) : null,
    passesPerLesson: lessonsWithProbes.length > 0 ? totalPasses / lessonsWithProbes.length : null,
    activeSpanDays: spanDays,
    lessonsObserved: lessons.length,
  }
}

function buildModalityAffinities(lessons: LessonEvidence[], minEvidence: number): ModalityAffinity[] {
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
  return [...byStrategy.entries()]
    .map(([strategy, s]) => ({
      strategy,
      successRate: (s.pass + s.fail) > 0 ? s.pass / (s.pass + s.fail) : 0,
      evidenceCount: s.pass + s.fail,
    }))
    .filter((a) => a.evidenceCount >= minEvidence) // affinity needs evidence, never identity
    .sort((a, b) => b.successRate - a.successRate || b.evidenceCount - a.evidenceCount || a.strategy.localeCompare(b.strategy))
}

function buildRecoveryEffectiveness(lessons: LessonEvidence[]): RecoveryEffectiveness[] {
  const byState = new Map<string, { attempts: number; recovered: number }>()
  for (const l of lessons) {
    for (const r of l.recoveries) {
      const followedByPass = l.probes.some((p) => p.occurredAt.getTime() > r.occurredAt.getTime() && p.passed)
      const s = byState.get(r.state) ?? { attempts: 0, recovered: 0 }
      s.attempts++
      if (followedByPass) s.recovered++
      byState.set(r.state, s)
    }
  }
  return [...byState.entries()]
    .map(([state, s]) => ({ state, attempts: s.attempts, recovered: s.recovered, rate: s.recovered / s.attempts }))
    .sort((a, b) => a.state.localeCompare(b.state))
}

function buildEngagement(lessons: LessonEvidence[]): EngagementPattern {
  if (lessons.length === 0) {
    return {
      sessionsObserved: 0, lessonsObserved: 0, abandonedLessons: 0,
      abandonedRate: null, meanLessonSpanMinutes: null, longestGapDays: null, lastActiveAt: null,
    }
  }
  const sessions = new Set(lessons.map((l) => l.sessionId ?? '').filter((s) => s !== ''))
  const signal = lessons.filter((l) => l.outcome !== 'no_signal')
  const abandoned = signal.filter((l) => l.outcome === 'abandoned').length
  const spans = lessons.map((l) => (l.lastEventAt.getTime() - l.firstEventAt.getTime()) / 60_000)
  const ordered = [...lessons].sort((a, b) => a.firstEventAt.getTime() - b.firstEventAt.getTime())
  let longestGapDays: number | null = null
  for (let i = 1; i < ordered.length; i++) {
    const gap = daysBetween(ordered[i - 1].lastEventAt, ordered[i].firstEventAt)
    if (longestGapDays === null || gap > longestGapDays) longestGapDays = gap
  }
  return {
    sessionsObserved: sessions.size,
    lessonsObserved: lessons.length,
    abandonedLessons: abandoned,
    abandonedRate: signal.length > 0 ? abandoned / signal.length : null,
    meanLessonSpanMinutes: spans.reduce((a, b) => a + b, 0) / spans.length,
    longestGapDays,
    lastActiveAt: new Date(Math.max(...lessons.map((l) => l.lastEventAt.getTime()))),
  }
}

function buildCognitiveLoad(lessons: LessonEvidence[]): CognitiveLoadIndicators {
  const probes = lessons.flatMap((l) => l.probes).sort((a, b) => a.occurredAt.getTime() - b.occurredAt.getTime())
  if (probes.length === 0) {
    return { confusionRate: null, meanProbeLatencySec: null, latencyDirection: 'insufficient_evidence', observations: 0 }
  }
  const confusionRate = probes.filter((p) => p.confusion).length / probes.length
  const withLatency = probes.filter((p) => p.latencySec !== null)
  const meanLatency = withLatency.length > 0
    ? withLatency.reduce((a, p) => a + (p.latencySec as number), 0) / withLatency.length
    : null
  let latencyDirection: CognitiveLoadIndicators['latencyDirection'] = 'insufficient_evidence'
  if (withLatency.length >= 4) {
    const mid = Math.floor(withLatency.length / 2)
    const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length
    const firstMean = mean(withLatency.slice(0, mid).map((p) => p.latencySec as number))
    const secondMean = mean(withLatency.slice(mid).map((p) => p.latencySec as number))
    const rel = firstMean > 0 ? (secondMean - firstMean) / firstMean : 0
    latencyDirection = rel > 0.25 ? 'rising' : rel < -0.25 ? 'falling' : 'stable'
  }
  return { confusionRate, meanProbeLatencySec: meanLatency, latencyDirection, observations: probes.length }
}

// ── Public entry point ───────────────────────────────────────────────────────

/**
 * The canonical Student Intelligence builder: one learner's LessonEvidence
 * (already normalized by the Evidence Reader) → deterministic profile.
 * Lessons belonging to other users are ignored defensively.
 */
export function buildStudentIntelligence(
  userId: string,
  allLessons: LessonEvidence[],
  options: StudentIntelligenceOptions,
): StudentIntelligence {
  const halfLife = options.forgettingHalfLifeDays ?? DEFAULTS.forgettingHalfLifeDays
  const minModality = options.minModalityEvidence ?? DEFAULTS.minModalityEvidence
  const phraseLimit = options.phraseLimit ?? DEFAULTS.phraseLimit

  const lessons = allLessons.filter((l) => l.userId === userId)
  const conceptStates = buildConceptStates(lessons, options.now, halfLife)
  const misconceptions = buildMisconceptions(lessons, phraseLimit)
  const probeOutcomes = conceptStates.reduce((n, c) => n + c.probeOutcomes, 0)
  const totalPasses = lessons.reduce((n, l) => n + l.probes.filter((p) => p.passed).length, 0)

  return {
    userId,
    asOf: options.now,
    evidenceBase: {
      lessons: lessons.length,
      probeOutcomes,
      concepts: conceptStates.length,
    },
    masteredConcepts: conceptStates.filter((c) => c.mastered).map((c) => c.conceptId),
    conceptStates,
    activeMisconceptions: misconceptions.filter((m) => m.activity === 'active'),
    misconceptionHistory: misconceptions,
    confidence: buildConfidence(lessons),
    velocity: buildVelocity(lessons),
    forgettingRisks: conceptStates
      .filter((c) => c.forgettingRisk > 0)
      .map((c) => ({ conceptId: c.conceptId, risk: c.forgettingRisk }))
      .sort((a, b) => b.risk - a.risk || a.conceptId.localeCompare(b.conceptId)),
    modalityAffinities: buildModalityAffinities(lessons, minModality),
    probePerformance: {
      outcomes: probeOutcomes,
      passRate: probeOutcomes > 0 ? totalPasses / probeOutcomes : null,
    },
    recoveryEffectiveness: buildRecoveryEffectiveness(lessons),
    engagement: buildEngagement(lessons),
    cognitiveLoad: buildCognitiveLoad(lessons),
  }
}
