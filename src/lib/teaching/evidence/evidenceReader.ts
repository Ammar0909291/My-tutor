/**
 * Evidence Reader — ADR 13 Phase 2 (the read side of the Evidence Engine).
 *
 * The writer half (`evidenceEngine.ts` — appendEvidenceEvent, single writer:
 * route.ts's turn-close persist stage) has existed since W1-3 with the module
 * note "No readers wired in Phase 1." This is the reader: it aggregates the
 * EXISTING evidence surfaces into one normalized per-lesson model. It creates
 * no telemetry, writes nothing, and adds no schema.
 *
 * Evidence sources reused (all pre-existing):
 *   EvidenceEvent           PROBE_OUTCOME / MISCONCEPTION_DETECTED /
 *                           LEARNER_FEEDBACK("recovery:*") / ASSET_SHOWN
 *                           rows written by route.ts per validation/08 §2
 *                           contracts
 *   TeachingStrategyEvent   per-turn strategy posture (the L5 join's left side)
 *   TopicProgress           mastery %, status, attempts, revision counts
 *   MistakeRecord           mistake taxonomy incl. 'signal_confident_wrong'
 *   Educational Packages    brain/packages/*.package.json (identity/hash link)
 *
 * Pure core: every function here operates on injected row arrays — no prisma,
 * no fs — so the whole reader is unit-testable and DB-free. Thin DB/artifact
 * loaders live in `evidenceLoad.ts`.
 */

// ── Input row shapes (structural subsets of the existing Prisma models) ──────

export interface EvidenceEventRow {
  eventId: string
  occurredAt: Date
  userId: string
  sessionId: string | null
  turnId: string | null
  conceptId: string
  language: string
  category: string           // EvidenceCategory value
  misconceptionId: string | null
  assetId: string | null
  outcome: string
  strength: number
  rawScore: number | null
}

export interface TeachingStrategyEventRow {
  userId: string
  topicSlug: string
  strategy: string
  sessionId: string | null
  createdAt: Date
}

export interface TopicProgressRow {
  userId: string
  subjectSlug: string
  topicSlug: string
  status: string
  masteryPct: number
  attempts: number
  revisionCount: number
  createdAt: Date
  completedAt: Date | null
  updatedAt: Date
}

export interface MistakeRecordRow {
  userId: string
  subjectSlug: string
  topicSlug: string
  category: string
  createdAt: Date
}

/** conceptId → package identity, or null when no compiled package exists.
 *  Injected so the pure core never touches the filesystem; the default
 *  implementation in evidenceLoad.ts reads brain/packages/. */
export type PackageIndex = (conceptId: string) => { packageId: string; contentHash: string } | null

// ── Normalized model ─────────────────────────────────────────────────────────

export interface ProbeOutcome {
  occurredAt: Date
  passed: boolean
  /** stated behavioral confidence parsed from the outcome string ('na' → null) */
  confidence: string | null
  confusion: boolean
  /** placement-verification probe key when this was a placement probe */
  placement: string | null
  /** server-measured latency seconds (EvidenceEvent.rawScore) */
  latencySec: number | null
}

export interface MisconceptionDetection {
  occurredAt: Date
  /** canonical misconception slug when the writer attributed one */
  misconceptionId: string | null
  /** the learner's verbatim phrase (outcome field of the event) */
  phrase: string
}

export interface RecoveryEvent {
  occurredAt: Date
  /** recovery state key, e.g. "i_cant_do_this" (from "recovery:<state>") */
  state: string
}

export interface ExplanationShown {
  occurredAt: Date
  /** Knowledge Asset id when Explanation Memory served this turn, else null
   *  (an LLM-generated explanation with no asset identity). */
  assetId: string | null
}

export interface HintShown {
  occurredAt: Date
}

export type LessonOutcome = 'mastered' | 'progressing' | 'struggling' | 'abandoned' | 'no_signal'

/** One lesson = one (userId, sessionId, conceptId) episode of evidence. */
export interface LessonEvidence {
  userId: string
  sessionId: string | null
  conceptId: string
  subject: string
  /** compiled Educational Package identity, when one exists for the concept */
  packageId: string | null
  packageHash: string | null
  /** teaching strategies dispatched during the lesson, session order */
  teachingActions: Array<{ strategy: string; occurredAt: Date }>
  probes: ProbeOutcome[]
  misconceptions: MisconceptionDetection[]
  recoveries: RecoveryEvent[]
  explanationsShown: ExplanationShown[]
  hintsShown: HintShown[]
  mistakes: Array<{ category: string; occurredAt: Date }>
  outcome: LessonOutcome
  /** TopicProgress mastery for this learner+concept at read time, if any */
  masteryPct: number | null
  masteryStatus: string | null
  firstEventAt: Date
  lastEventAt: Date
}

// ── Outcome-string parsers (exact inverse of route.ts's writer formats) ─────

/** "pass|conf=high|confusion=false|placement=at" → structured ProbeOutcome. */
export function parseProbeOutcome(e: EvidenceEventRow): ProbeOutcome {
  const parts = e.outcome.split('|')
  const kv = new Map<string, string>()
  for (const p of parts.slice(1)) {
    const i = p.indexOf('=')
    if (i > 0) kv.set(p.slice(0, i), p.slice(i + 1))
  }
  const conf = kv.get('conf')
  return {
    occurredAt: e.occurredAt,
    passed: parts[0] === 'pass',
    confidence: conf && conf !== 'na' ? conf : null,
    confusion: kv.get('confusion') === 'true',
    placement: kv.get('placement') ?? null,
    latencySec: e.rawScore,
  }
}

/** "recovery:<state>" → state key, or null for non-recovery LEARNER_FEEDBACK. */
export function parseRecoveryState(outcome: string): string | null {
  return outcome.startsWith('recovery:') ? outcome.slice('recovery:'.length) : null
}

/** conceptId → subject. Mirrors knowledgeGraph.ts's ID_PREFIX_TO_SUBJECT
 *  registry contract (prefix before the first dot); unknown prefixes pass
 *  through verbatim so non-KG subjects still aggregate. */
const ID_PREFIX_TO_SUBJECT: Record<string, string> = {
  math: 'mathematics',
  phys: 'physics',
  chem: 'chemistry',
  cs: 'computer_science',
  bio: 'biology',
  eng: 'english',
}

export function subjectOfConcept(conceptId: string): string {
  const prefix = conceptId.split('.')[0]
  return ID_PREFIX_TO_SUBJECT[prefix] ?? prefix
}

// ── Lesson outcome classification ────────────────────────────────────────────

/** Deterministic session-level outcome from the lesson's own evidence:
 *   mastered     TopicProgress reads MASTERED/COMPLETED for the concept
 *   progressing  last probe of the lesson passed
 *   struggling   probes exist and the last one failed, or a recovery fired
 *                after the last pass
 *   abandoned    the lesson's FINAL event is a failure or recovery with
 *                nothing after it (failure-then-vanish, 07 §8 rule 3 signature)
 *   no_signal    no probes, recoveries, or misconceptions at all
 */
export function classifyLessonOutcome(
  probes: ProbeOutcome[],
  recoveries: RecoveryEvent[],
  misconceptions: MisconceptionDetection[],
  masteryStatus: string | null,
): LessonOutcome {
  if (masteryStatus === 'MASTERED' || masteryStatus === 'COMPLETED') return 'mastered'
  if (probes.length === 0 && recoveries.length === 0 && misconceptions.length === 0) return 'no_signal'

  const lastProbe = probes[probes.length - 1] ?? null
  const lastRecovery = recoveries[recoveries.length - 1] ?? null

  // Failure-then-vanish: the terminal event of the lesson is a fail/recovery.
  const lastProbeTime = lastProbe?.occurredAt.getTime() ?? -Infinity
  const lastRecoveryTime = lastRecovery?.occurredAt.getTime() ?? -Infinity
  const terminalIsRecovery = lastRecoveryTime > lastProbeTime
  if (terminalIsRecovery) return 'abandoned'
  if (lastProbe && !lastProbe.passed) return 'abandoned'

  if (lastProbe?.passed) {
    // A pass after every recovery → progressing (recovery worked).
    return 'progressing'
  }
  return 'struggling'
}

// ── Aggregation: rows → LessonEvidence[] ─────────────────────────────────────

export interface EvidenceCorpus {
  events: EvidenceEventRow[]
  strategyEvents?: TeachingStrategyEventRow[]
  topicProgress?: TopicProgressRow[]
  mistakes?: MistakeRecordRow[]
  packageIndex?: PackageIndex
}

function lessonKey(userId: string, sessionId: string | null, conceptId: string): string {
  return `${userId} ${sessionId ?? ''} ${conceptId}`
}

/**
 * Normalizes the raw evidence surfaces into one LessonEvidence per
 * (userId, sessionId, conceptId). Deterministic: outputs are sorted by
 * (userId, firstEventAt, conceptId); all inner arrays are in event-time order.
 */
export function readLessonEvidence(corpus: EvidenceCorpus): LessonEvidence[] {
  const packageIndex: PackageIndex = corpus.packageIndex ?? (() => null)
  const byLesson = new Map<string, LessonEvidence>()

  const sortedEvents = [...corpus.events].sort(
    (a, b) => a.occurredAt.getTime() - b.occurredAt.getTime() || a.eventId.localeCompare(b.eventId),
  )

  for (const e of sortedEvents) {
    const key = lessonKey(e.userId, e.sessionId, e.conceptId)
    let lesson = byLesson.get(key)
    if (!lesson) {
      const pkg = packageIndex(e.conceptId)
      lesson = {
        userId: e.userId,
        sessionId: e.sessionId,
        conceptId: e.conceptId,
        subject: subjectOfConcept(e.conceptId),
        packageId: pkg?.packageId ?? null,
        packageHash: pkg?.contentHash ?? null,
        teachingActions: [],
        probes: [],
        misconceptions: [],
        recoveries: [],
        explanationsShown: [],
        hintsShown: [],
        mistakes: [],
        outcome: 'no_signal',
        masteryPct: null,
        masteryStatus: null,
        firstEventAt: e.occurredAt,
        lastEventAt: e.occurredAt,
      }
      byLesson.set(key, lesson)
    }
    lesson.firstEventAt = new Date(Math.min(lesson.firstEventAt.getTime(), e.occurredAt.getTime()))
    lesson.lastEventAt = new Date(Math.max(lesson.lastEventAt.getTime(), e.occurredAt.getTime()))

    switch (e.category) {
      case 'PROBE_OUTCOME':
        lesson.probes.push(parseProbeOutcome(e))
        break
      case 'MISCONCEPTION_DETECTED':
        lesson.misconceptions.push({
          occurredAt: e.occurredAt,
          misconceptionId: e.misconceptionId,
          phrase: e.outcome,
        })
        break
      case 'LEARNER_FEEDBACK': {
        const state = parseRecoveryState(e.outcome)
        if (state) lesson.recoveries.push({ occurredAt: e.occurredAt, state })
        else if (e.outcome === 'hint:shown') lesson.hintsShown.push({ occurredAt: e.occurredAt })
        break
      }
      case 'ASSET_SHOWN': {
        lesson.explanationsShown.push({ occurredAt: e.occurredAt, assetId: e.assetId })
        break
      }
      default:
        break // RE_ASK / SUMMATIVE_OUTCOME: carried by counts only today
    }
  }

  // Teaching strategies join by (userId, sessionId) — the strategy event's
  // topicSlug is a topic-level slug, the lesson's conceptId is KG-level; the
  // session is the reliable join key (ADR 13 L5).
  for (const s of corpus.strategyEvents ?? []) {
    if (!s.sessionId) continue
    for (const lesson of byLesson.values()) {
      if (lesson.userId === s.userId && lesson.sessionId === s.sessionId) {
        lesson.teachingActions.push({ strategy: s.strategy, occurredAt: s.createdAt })
      }
    }
  }
  for (const lesson of byLesson.values()) {
    lesson.teachingActions.sort((a, b) => a.occurredAt.getTime() - b.occurredAt.getTime())
  }

  // Mastery joins by (userId, topicSlug === conceptId) — Library concept
  // tracking writes TopicProgress keyed on the KG concept id.
  const progressByUserTopic = new Map<string, TopicProgressRow>()
  for (const tp of corpus.topicProgress ?? []) {
    progressByUserTopic.set(`${tp.userId} ${tp.topicSlug}`, tp)
  }
  for (const lesson of byLesson.values()) {
    const tp = progressByUserTopic.get(`${lesson.userId} ${lesson.conceptId}`)
    if (tp) {
      lesson.masteryPct = tp.masteryPct
      lesson.masteryStatus = tp.status
    }
  }

  // Mistake taxonomy joins by (userId, topicSlug === conceptId) within the
  // lesson's time window (mistakes carry no sessionId).
  for (const m of corpus.mistakes ?? []) {
    for (const lesson of byLesson.values()) {
      if (
        lesson.userId === m.userId &&
        lesson.conceptId === m.topicSlug &&
        m.createdAt.getTime() >= lesson.firstEventAt.getTime() &&
        m.createdAt.getTime() <= lesson.lastEventAt.getTime()
      ) {
        lesson.mistakes.push({ category: m.category, occurredAt: m.createdAt })
      }
    }
  }

  for (const lesson of byLesson.values()) {
    lesson.outcome = classifyLessonOutcome(
      lesson.probes, lesson.recoveries, lesson.misconceptions, lesson.masteryStatus,
    )
  }

  return [...byLesson.values()].sort(
    (a, b) =>
      a.userId.localeCompare(b.userId) ||
      a.firstEventAt.getTime() - b.firstEventAt.getTime() ||
      a.conceptId.localeCompare(b.conceptId),
  )
}
