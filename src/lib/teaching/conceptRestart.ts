/**
 * RESTART A CONCEPT — one learner, one concept, one transaction.
 *
 * A learner who has studied a concept before is offered Resume or Restart
 * (LessonScreen's Start-Lesson gate). Resume changes nothing. Restart must
 * leave the concept exactly as a first-time learner would find it, and must
 * touch nothing else: not the subject's other concepts, not the subject
 * introduction (StudentProgress.preludeViewedAt), not other subjects.
 *
 * WHAT IS RESET (every row is scoped by userId AND this concept):
 *   - messages            — the concept's Tutor Max chat, in this learner's
 *                           sessions of this subject (lessonKey = topic slug or
 *                           `lesson:<order>`, the two forms lessonKeyFor emits)
 *   - topic_progress      — status NOT_STARTED, masteryPct 0, attempts 0
 *   - concept_mastery_records / eb_learner_concept_mastery — the concept's row
 *   - evidence_records    — the concept's graded evidence
 *   - student_progress    — the lesson's order removed from completedLessons
 *   - lesson_attempts     — an IN_PROGRESS attempt is opened (or the open one
 *                           kept), so the completion gate (D-0a) never reads
 *                           the old COMPLETED attempt as "lesson already done"
 *
 * WHAT IS KEPT, on purpose:
 *   - finished lesson_attempts rows (history/analytics; the new attempt is
 *     newer, so nothing reads them as current)
 *   - eb_evidence_events (append-only audit telemetry)
 *   - active_misconceptions (a learner-model fact about the person, not about
 *     the attempt)
 *   - preludeViewedAt, every other concept, every other subject.
 *
 * The per-attempt session state (pending card, asked-question ledger, ladder)
 * lives in the session snapshot and is cleared by lesson-init's existing
 * `restart` mode, which the client calls right after this succeeds.
 *
 * Idempotent: a repeated or concurrent restart finds nothing left to delete
 * and reuses the open attempt, so it converges on the same state.
 */
import { lessonKeyFor } from '@/lib/teaching/lessonAttempt'

export interface ConceptRestartArgs {
  userId: string
  subjectSlug: string
  topicSlug?: string | null
  lessonOrder?: number | null
  lessonTitle?: string | null
}

export interface ConceptRestartResult {
  messagesDeleted: number
  lessonKeys: string[]
}

/** The message/attempt keys a concept can be stored under. */
export function conceptLessonKeys(args: { topicSlug?: string | null; lessonOrder?: number | null }): string[] {
  const keys = new Set<string>()
  const bySlug = lessonKeyFor({ topicSlug: args.topicSlug ?? null })
  const byOrder = lessonKeyFor({ lessonOrder: args.lessonOrder ?? null })
  if (bySlug) keys.add(bySlug)
  if (byOrder) keys.add(byOrder)
  return [...keys]
}

// Structural, so tests can pass an in-memory double and the route passes prisma.
type Tx = any
export interface ConceptRestartDb {
  $transaction<T>(fn: (tx: Tx) => Promise<T>): Promise<T>
}

export async function restartConcept(db: ConceptRestartDb, args: ConceptRestartArgs): Promise<ConceptRestartResult> {
  const topicSlug = args.topicSlug?.trim() || null
  const lessonOrder = typeof args.lessonOrder === 'number' && args.lessonOrder > 0 ? Math.floor(args.lessonOrder) : null
  const lessonKeys = conceptLessonKeys({ topicSlug, lessonOrder })
  if (lessonKeys.length === 0) throw new Error('concept-restart: no concept identity')
  const { userId, subjectSlug } = args

  return db.$transaction(async (tx: Tx) => {
    const deleted = await tx.message.deleteMany({
      where: {
        lessonKey: { in: lessonKeys },
        session: { userId, subject: { slug: subjectSlug } },
      },
    })

    if (topicSlug) {
      await tx.topicProgress.updateMany({
        where: { userId, subjectSlug, topicSlug },
        data: {
          status: 'NOT_STARTED', masteryPct: 0, attempts: 0, lastScore: null,
          completedAt: null, lastEvidenceMessageId: null,
        },
      })
      await tx.conceptMasteryRecord.deleteMany({ where: { userId, conceptId: topicSlug } })
      await tx.ebLearnerConceptMastery.deleteMany({ where: { userId, conceptId: topicSlug } })
      await tx.evidenceRecord.deleteMany({ where: { userId, subjectSlug, topicSlug } })
    }

    if (lessonOrder) {
      const progress = await tx.studentProgress.findUnique({
        where: { userId_subjectCode: { userId, subjectCode: subjectSlug } },
        select: { completedLessons: true },
      })
      if (progress && progress.completedLessons.includes(lessonOrder)) {
        await tx.studentProgress.update({
          where: { userId_subjectCode: { userId, subjectCode: subjectSlug } },
          data: {
            completedLessons: progress.completedLessons.filter((o: number) => o !== lessonOrder),
            isCompleted: false,
            completedAt: null,
          },
        })
      }
    }

    // The attempt key lesson-init and the chat route's D-0a gate read.
    const attemptKey = lessonKeyFor({ lessonOrder }) ?? lessonKeys[0]
    const open = await tx.lessonAttempt.findFirst({
      where: { userId, subjectSlug, lessonKey: attemptKey, status: 'IN_PROGRESS' },
      select: { id: true },
    })
    if (open) {
      await tx.lessonAttempt.update({ where: { id: open.id }, data: { startedAt: new Date() } })
    } else {
      await tx.lessonAttempt.create({
        data: { userId, subjectSlug, lessonKey: attemptKey, lessonTitle: args.lessonTitle ?? null, status: 'IN_PROGRESS' },
      })
    }

    return { messagesDeleted: deleted.count as number, lessonKeys }
  })
}
