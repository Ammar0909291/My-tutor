import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { buildTutorSystemPrompt, type LessonContext } from '@/lib/ai/client'
import { routeAI } from '@/lib/ai/router'
import { AIBudgetExceededError } from '@/lib/ai/budget'
import { checkRateLimit, rateLimitResponse } from '@/lib/rateLimit'
import { captureError } from '@/lib/monitoring'
import { MessageRole } from '@prisma/client'
import { buildVisualSpec } from '@/lib/visuals/visualSpecBuilder'
import { planVisualTeaching } from '@/lib/visuals/teachingStrategy'
import { buildSceneSpec } from '@/lib/teaching/buildSceneSpec'

const schema = z.object({
  sessionId: z.string(),
  message: z.string().min(1).max(8000),
})

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
  }

  const userId = session.user.id

  const { allowed } = await checkRateLimit(`rl:learn-chat:${userId}`, 30, 60)
  if (!allowed) return rateLimitResponse()

  try {
    const body = await req.json()
    const { sessionId, message } = schema.parse(body)

    // Sprint AP: cap history at the most recent messages instead of loading the
    // whole session. 30 messages ≈ 15 exchanges is more context than the model
    // meaningfully uses, and long-running sessions (100+ messages) were paying
    // for the full table scan + a ~200KB AI payload on every send. Fetched
    // newest-first so `take` keeps the RECENT end, then reversed to chronological.
    const HISTORY_LIMIT = 30
    const learnSession = await withRetry(() => prisma.learnSession.findUnique({
      where: { id: sessionId, userId },
      include: {
        subject: true,
        messages: { orderBy: { createdAt: 'desc' }, take: HISTORY_LIMIT },
      },
    }))
    if (!learnSession) {
      return NextResponse.json({ success: false, error: 'Session not found' }, { status: 404 })
    }

    const profile = await withRetry(() => prisma.profile.findUnique({ where: { userId } }))

    await withRetry(() => prisma.message.create({
      data: { sessionId, role: MessageRole.USER, content: message },
    }))

    const snapshot = learnSession.contextSnapshot as Record<string, unknown> | null
    const memoryContext = typeof snapshot?.memoryContext === 'string' ? snapshot.memoryContext : null
    const lastSuccessfulTeachingStyle = typeof snapshot?.lastSuccessfulTeachingStyle === 'string' ? snapshot.lastSuccessfulTeachingStyle : null
    const snapshotCurrentConceptId = typeof snapshot?.currentConceptNodeId === 'string' ? snapshot.currentConceptNodeId : null
    const snapshotLastPrereqGap = typeof snapshot?.lastPrerequisiteGap === 'string' ? snapshot.lastPrerequisiteGap : null
    // Sprint CH: active worked example carried across turns
    const snapshotWorkedExample = (snapshot?.currentWorkedExample && typeof snapshot.currentWorkedExample === 'object')
      ? snapshot.currentWorkedExample as { concept: string; currentStep: number; stepCount: number }
      : null

    const subjectCode = learnSession.subject.slug

    // ─── School Mode (Sprint BI) ───
    // When the session carries a school chapter id and the learner is a school
    // student, resolve the chapter from the board catalog. School progress uses
    // the namespaced subjectCode so it never collides with global-mode rows.
    let schoolCtx: {
      board: string; grade: number; code: string
      chapter: { id: string; order: number; title: string }
      totalChapters: number; displayTitle: string
    } | null = null
    const snapshotChapterId = typeof snapshot?.schoolChapterId === 'string' ? snapshot.schoolChapterId : null
    if (snapshotChapterId && profile?.userType === 'SCHOOL_STUDENT' && profile.educationBoard && profile.grade) {
      try {
        const { getSchoolChapters, schoolSubjectCode, chapterDisplayTitle } = await import('@/lib/school/schoolRouting')
        const chapters = getSchoolChapters(profile.educationBoard, subjectCode, profile.grade)
        const chapter = chapters.find((c) => c.id === snapshotChapterId)
        if (chapter) {
          schoolCtx = {
            board: profile.educationBoard,
            grade: profile.grade,
            code: schoolSubjectCode(profile.educationBoard, subjectCode, profile.grade),
            chapter,
            totalChapters: chapters.length,
            displayTitle: chapterDisplayTitle(chapter.title),
          }
        }
      } catch (err) {
        console.warn('[learn/chat] school context resolution skipped:', err)
      }
    }
    const progressCode = schoolCtx?.code ?? subjectCode

    // Batch all per-request reads that are needed by multiple context blocks.
    // Sprint U: topicProgress was fetched 3× (KG synthesis, Library synthesis,
    // KG context builder) — now fetched once and shared. learningProfile +
    // subjectAnalytics fetched once instead of twice (adaptive context +
    // buildLearnerIntelligenceProfile reuses Prisma's connection pool but still
    // issues separate SQL calls without batching).
    const [curriculumLessons, studentProgress, topicProgressRowsShared, learningProfileShared, subjectAnalyticsShared] = await Promise.all([
      (prisma as any).curriculum?.findMany({ where: { subjectCode }, orderBy: { order: 'asc' } }).catch(() => []) ?? Promise.resolve([]),
      (prisma as any).studentProgress?.findUnique({ where: { userId_subjectCode: { userId, subjectCode: progressCode } } }).catch(() => null) ?? Promise.resolve(null),
      prisma.topicProgress.findMany({ where: { userId, subjectSlug: subjectCode } }),
      prisma.learningProfile.findUnique({ where: { userId } }).catch(() => null),
      prisma.subjectAnalytics.findUnique({ where: { userId_subjectId: { userId, subjectId: learnSession.subjectId } } }).catch(() => null),
    ])

    let lessonCtx: LessonContext | null = null
    if (curriculumLessons.length > 0) {
      const currentOrder = studentProgress?.currentLesson ?? 1
      const currentLesson = (curriculumLessons as any[]).find((l) => l.order === currentOrder) ?? curriculumLessons[0]
      lessonCtx = {
        currentLesson: currentLesson.order,
        totalLessons: curriculumLessons.length,
        lessonTitle: currentLesson.lessonTitle,
        lessonGoal: currentLesson.lessonGoal,
        unitTitle: currentLesson.unitTitle,
        completedLessons: studentProgress?.completedLessons ?? [],
      }
    }

    // For KG-backed subjects (math/physics/chemistry/biology) there are no DB
    // curriculum rows, so synthesise lessonCtx from the knowledge graph instead.
    if (lessonCtx === null) {
      try {
        const { getKnowledgeGraph } = await import('@/lib/curriculum/knowledgeGraph')
        const graph = getKnowledgeGraph(subjectCode)
        if (graph) {
          let order = 1
          const syntheticLessons = graph.modules.flatMap((module, modIdx) =>
            module.nodes.map((node, nodeIdx) => ({
              subjectCode,
              unit: modIdx + 1,
              unitTitle: module.title,
              lesson: nodeIdx + 1,
              lessonTitle: node.title,
              lessonGoal: (node as any).description ?? node.title,
              order: order++,
              topicSlug: node.slug,
            }))
          )
          if (syntheticLessons.length > 0) {
            const topicProgressRows = topicProgressRowsShared
            const inProgressSlug = topicProgressRows.find((r) => r.status === 'IN_PROGRESS')?.topicSlug
            const currentLesson = (inProgressSlug
              ? syntheticLessons.find((l) => l.topicSlug === inProgressSlug)
              : null)
              ?? (studentProgress?.currentLesson != null
                ? syntheticLessons.find((l) => l.order === studentProgress.currentLesson)
                : null)
              ?? syntheticLessons[0]
            const completedSlugs = new Set(
              topicProgressRows
                .filter((r) => r.status === 'COMPLETED' || r.status === 'MASTERED')
                .map((r) => r.topicSlug)
            )
            lessonCtx = {
              currentLesson: currentLesson.order,
              totalLessons: syntheticLessons.length,
              lessonTitle: currentLesson.lessonTitle,
              lessonGoal: currentLesson.lessonGoal,
              unitTitle: currentLesson.unitTitle,
              completedLessons: syntheticLessons
                .filter((l) => completedSlugs.has(l.topicSlug))
                .map((l) => l.order),
            }
          }
        }
      } catch {
        // KG synthesis is optional — never blocks the lesson
      }
    }

    // For Subject Library subjects without a knowledge graph (Spanish, JavaScript, etc.)
    // synthesise lessonCtx from the subject catalog.
    if (lessonCtx === null) {
      try {
        const { findLibrarySubject } = await import('@/lib/curriculum/subjectCatalog')
        const libSubject = findLibrarySubject(subjectCode)
        if (libSubject) {
          let order = 1
          const syntheticLessons = libSubject.modules.flatMap((module, modIdx) =>
            module.nodes.map((_node, _nodeIdx) => ({
              subjectCode,
              unit: modIdx + 1,
              unitTitle: module.title,
              lessonTitle: _node.title,
              lessonGoal: _node.title,
              order: order++,
              topicSlug: _node.slug,
            }))
          )
          if (syntheticLessons.length > 0) {
            const topicProgressRows = topicProgressRowsShared
            const inProgressSlug = topicProgressRows.find((r) => r.status === 'IN_PROGRESS')?.topicSlug
            const currentLesson = (inProgressSlug
              ? syntheticLessons.find((l) => l.topicSlug === inProgressSlug)
              : null)
              ?? (studentProgress?.currentLesson != null
                ? syntheticLessons.find((l) => l.order === studentProgress.currentLesson)
                : null)
              ?? syntheticLessons[0]
            const completedSlugs = new Set(
              topicProgressRows
                .filter((r) => r.status === 'COMPLETED' || r.status === 'MASTERED')
                .map((r) => r.topicSlug)
            )
            lessonCtx = {
              currentLesson: currentLesson.order,
              totalLessons: syntheticLessons.length,
              lessonTitle: currentLesson.lessonTitle,
              lessonGoal: currentLesson.lessonGoal,
              unitTitle: currentLesson.unitTitle,
              completedLessons: syntheticLessons
                .filter((l) => completedSlugs.has(l.topicSlug))
                .map((l) => l.order),
            }
          }
        }
      } catch {
        // Subject Library synthesis is optional — never blocks the lesson
      }
    }

    // School sessions: the chapter IS the lesson — override any synthesized ctx.
    if (schoolCtx) {
      lessonCtx = {
        currentLesson: schoolCtx.chapter.order,
        totalLessons: schoolCtx.totalChapters,
        lessonTitle: schoolCtx.displayTitle,
        lessonGoal: `Master "${schoolCtx.displayTitle}" as prescribed by the ${schoolCtx.board === 'cbse' ? 'CBSE' : 'UP Board'} Class ${schoolCtx.grade} syllabus`,
        unitTitle: learnSession.subject.name,
        completedLessons: studentProgress?.completedLessons ?? [],
      }
    }

    const teachingLang = (profile?.teachingLanguage ?? 'en') as 'ru' | 'en' | 'hi'
    const profileCountry = (profile as any)?.country ?? 'global'
    // Route to YandexGPT whenever EITHER signal says Russian — country alone
    // can silently disagree with teachingLanguage (e.g. legacy profiles from
    // before the country field existed), which used to skip Yandex entirely.
    const country = teachingLang === 'ru' ? 'ru' : profileCountry
    let systemPrompt = buildTutorSystemPrompt(
      learnSession.subject.name,
      profile?.displayName ?? session.user.name ?? 'Student',
      profile?.selfDescription ?? 'level unknown',
      profile?.learningGoals ?? profile?.selfDescription ?? 'general learning',
      memoryContext,
      teachingLang,
      lessonCtx,
      learnSession.subject.type,
    )

    // School Mode curriculum context (Sprint BI) — board/grade/chapter plus
    // chapter KG topics and previously-covered node count, straight from the
    // education graph. Additive and school-only; general learners never get it.
    // Hoisted outside schoolCtx block so Sprint BX/BY/CB snapshot updates can reference them
    let learnerProfHoisted: import('@/lib/school/adaptive/learningProfile').StudentLearningProfile | null = null
    let lessonPlanHoisted: import('@/lib/school/adaptive/lessonPlanner').LessonPlan | null = null
    let prereqGapHoisted: import('@/lib/school/adaptive/prerequisiteRecovery').PrerequisiteGap | null = null
    // Sprint CH: did THIS turn activate/continue a worked example?
    let workedExampleActive = false

    if (schoolCtx) {
      // Hoisted so Phase 4 (weak-topic reinforcement) and Phase 6 (objectives)
      // can be passed to buildGuidedTeachingPrompt below.
      let guidedWeakTopicTitles: string[] = []
      let guidedChapterObjectives: string[] = []
      // Sprint BS: chapter KG nodes (for checkpoint node matching), checkpoint
      // frequency for this learner's coaching mode, and retry/recovery flags
      // derived from evaluating the previous turn's understanding check.
      let chapterKgNodes: { id: string; title: string }[] = []
      let checkpointFrequency: 'frequent' | 'normal' | 'reduced' = 'normal'
      let pendingCheckpointRetry = false
      let checkpointFailedAgain = false
      let learnerProf: import('@/lib/school/adaptive/learningProfile').StudentLearningProfile | null = null

      try {
        const { buildSchoolTutorContext, getNodesForChapter } = await import('@/lib/education')
        const { getSchoolChapters: _getChapters } = await import('@/lib/school/schoolRouting')
        const ctx = buildSchoolTutorContext(schoolCtx.board, subjectCode, schoolCtx.grade, schoolCtx.chapter.id)
        if (ctx) {
          systemPrompt += `\n\nSCHOOL MODE — AUTHORITATIVE CURRICULUM CONTEXT:\n${ctx}\nThe student is a ${schoolCtx.board === 'cbse' ? 'CBSE' : 'UP Board'} Class ${schoolCtx.grade} student working on chapter ${schoolCtx.chapter.order} of ${schoolCtx.totalChapters}, "${schoolCtx.displayTitle}". Teach strictly at this grade level and within this chapter's scope (referencing previously covered chapters is fine). NEVER ask the student for their board, class, or chapter — you already know. Use NCERT/board-aligned terminology, methods, and examples appropriate for this class.`
        }
        // Phase 6: extract chapter node titles as objectives for guided teaching
        const fullChapterForObj = _getChapters(schoolCtx.board, subjectCode, schoolCtx.grade)
          .find((c) => c.id === schoolCtx!.chapter.id)
        if (fullChapterForObj) {
          const nodes = getNodesForChapter(fullChapterForObj)
          guidedChapterObjectives = nodes.map((n) => n.title)
          chapterKgNodes = nodes.map((n) => ({ id: n.id, title: n.title }))
        }
      } catch (err) {
        console.warn('[learn/chat] school curriculum context skipped:', err)
      }

      // Sprint BS: in-session understanding-check evaluation. A lightweight AI
      // classifier looks at the previous tutor turn + this student reply to
      // detect a conversational checkpoint question and evaluate the answer,
      // records the result, and derives this turn's checkpoint frequency
      // (from the learner's coaching mode) and retry/recovery flags for the
      // guided teaching prompt below. Writes only to LearningCheckpoint —
      // never touches Practice/Assessment/TopicProgress/MistakeRecord.
      try {
        const { buildLearningProfile, checkpointFrequencyForMode } = await import('@/lib/school/adaptive/learningProfile')
        learnerProf = await buildLearningProfile(userId, schoolCtx.grade, subjectCode, lastSuccessfulTeachingStyle, schoolCtx.board, schoolCtx.chapter.id, chapterKgNodes.map((n) => n.id))
        learnerProfHoisted = learnerProf
        checkpointFrequency = checkpointFrequencyForMode(learnerProf.preferredDifficulty)

        const prevMsg = learnSession.messages[0]
        if (prevMsg?.role === MessageRole.ASSISTANT) {
          const { evaluateCheckpointTurn } = await import('@/lib/school/checkpoints/evaluateCheckpoint')
          const { recordCheckpoint, getPendingRetry } = await import('@/lib/school/checkpoints/checkpointStats')
          const checkpointEval = await evaluateCheckpointTurn(prevMsg.content, message, chapterKgNodes)
          if (checkpointEval?.checkpointAsked && checkpointEval.question && checkpointEval.expectedAnswer) {
            const pending = await getPendingRetry(userId, subjectCode, schoolCtx.chapter.id)
            const hintUsed = pending !== null
            await recordCheckpoint({
              userId, board: schoolCtx.board, grade: schoolCtx.grade, subjectSlug: subjectCode,
              chapterId: schoolCtx.chapter.id, kgNodeId: checkpointEval.nodeId,
              question: checkpointEval.question, answer: checkpointEval.expectedAnswer,
              userResponse: message, passed: checkpointEval.passed, hintUsed,
            })
            if (!checkpointEval.passed) {
              if (hintUsed) checkpointFailedAgain = true
              else pendingCheckpointRetry = true
            }
            // Sprint CA: advance spaced revision stage when checkpoint is on a
            // previously-mastered node (tracks whether memory is being retained)
            if (checkpointEval.nodeId) {
              import('@/lib/school/adaptive/spacedRevision').then(({ advanceRevision }) =>
                advanceRevision(userId, subjectCode, checkpointEval.nodeId!, checkpointEval.passed)
              ).catch(() => {})

              // Bridge: a conversational checkpoint is a single AI-judged, lenient
              // signal — not a deterministic multi-question score like
              // practice/submit. So it contributes a soft TopicProgress nudge
              // (never MASTERED, never downgrades an already-mastered node) and,
              // on a substantive failure, a MistakeRecord so misconception/weak-topic
              // engines see it. Mirrors the never-downgrade pattern in
              // school/practice/submit/route.ts but at lower confidence weight.
              // Deflect/vague replies ("ok", "I'm tired", "what's next") demonstrate
              // nothing about understanding either way, so they skip BOTH writes —
              // a TopicProgress nudge or MistakeRecord there would be a false signal.
              const nodeId = checkpointEval.nodeId
              if (checkpointEval.engagement === 'substantive') {
                ;(async () => {
                  const existing = await prisma.topicProgress.findUnique({
                    where: { userId_subjectSlug_topicSlug: { userId, subjectSlug: subjectCode, topicSlug: nodeId } },
                    select: { status: true },
                  }).catch(() => null)
                  if (existing?.status === 'MASTERED' || existing?.status === 'COMPLETED') return
                  const score = checkpointEval.passed ? 65 : 25
                  await prisma.topicProgress.upsert({
                    where: { userId_subjectSlug_topicSlug: { userId, subjectSlug: subjectCode, topicSlug: nodeId } },
                    create: { userId, subjectSlug: subjectCode, topicSlug: nodeId, status: 'IN_PROGRESS', masteryPct: score, attempts: 1, lastScore: score },
                    update: { status: 'IN_PROGRESS', masteryPct: score, lastScore: score, attempts: { increment: 1 } },
                  }).catch(() => {})
                  if (!checkpointEval.passed) {
                    await prisma.mistakeRecord.create({
                      data: {
                        userId, subjectSlug: subjectCode, topicSlug: nodeId,
                        sessionId: learnSession.id, category: 'conversational_checkpoint', questionId: nodeId,
                      },
                    }).catch(() => {})
                  }
                })().catch(() => {})
              }
            }
          }
        }
      } catch (err) {
        console.warn('[learn/chat] checkpoint evaluation skipped:', err)
      }

      // Sprint BO/BP: compact student status — weak topics + recommended next
      // action, max 5 lines. Additive only.
      try {
        const { getWeakTopicsForSubject } = await import('@/lib/school/adaptive/weakTopics')
        const { getChapterNextStep } = await import('@/lib/school/adaptive/nextBestAction')
        const { getChapterProgressDetails } = await import('@/lib/school/schoolProgress')
        const { getSchoolChapters } = await import('@/lib/school/schoolRouting')
        const fullChapter = getSchoolChapters(schoolCtx.board, subjectCode, schoolCtx.grade)
          .find((c) => c.id === schoolCtx!.chapter.id)
        if (!fullChapter) throw new Error('chapter not found for status context')
        const [weak, details] = await Promise.all([
          getWeakTopicsForSubject(userId, subjectCode),
          getChapterProgressDetails(userId, subjectCode, fullChapter, false),
        ])
        const weakTop = weak.slice(0, 5)
        guidedWeakTopicTitles = weak.slice(0, 2).map((t) => t.title)
        const nextStep = getChapterNextStep(details, schoolCtx.chapter.order < schoolCtx.totalChapters)
        const actionLabel = nextStep === 'practice' ? 'Practice this chapter'
          : nextStep === 'assessment' ? 'Take the chapter assessment'
          : nextStep === 'next_chapter' ? 'Move to the next chapter' : 'Continue learning'
        const lines = [
          `- Current chapter: ${schoolCtx.displayTitle} (mastery: ${details.practiceStatus.replace('_', ' ')})`,
          `- Recommended action: ${actionLabel}`,
        ]
        if (weakTop.length > 0) lines.push(`- Weak topics: ${weakTop.map((t) => t.title).join(', ')}`)
        systemPrompt += `\n\nSTUDENT STATUS:\n${lines.join('\n')}\nWhen weak topics come up, slow down, check understanding with simple questions first, and reinforce fundamentals before moving on. Do not mention this status block explicitly.`
      } catch (err) {
        console.warn('[learn/chat] student status context skipped:', err)
      }

      // Sprint CR: mastery intelligence — detect false mastery and guide tutor tone.
      try {
        const { getMasteryProfile, buildMasteryIntelligenceBlock } = await import('@/lib/school/adaptive/masteryIntelligence')
        const { getSchoolChapters: _getChaptersForMastery } = await import('@/lib/school/schoolRouting')
        const fullChapterForMastery = _getChaptersForMastery(schoolCtx.board, subjectCode, schoolCtx.grade)
          .find((c: { id: string }) => c.id === schoolCtx!.chapter.id)
        const kgNodeIds = fullChapterForMastery?.kgNodeIds ?? []
        const masteryProfile = await getMasteryProfile(
          userId, schoolCtx.board, schoolCtx.grade, subjectCode, schoolCtx.chapter.id, kgNodeIds
        )
        systemPrompt += buildMasteryIntelligenceBlock(masteryProfile)
      } catch {
        // non-fatal — mastery context is purely additive
      }

      // Sprint CS: misconception alert — detect specific misunderstanding patterns.
      try {
        const { detectMisconceptions, buildMisconceptionBlock, buildRemediationStrategy } = await import('@/lib/school/adaptive/misconceptionEngine')
        const misconceptions = await detectMisconceptions(
          userId, subjectCode, chapterKgNodes.map((n) => n.id), schoolCtx.chapter.id
        )
        const block = buildMisconceptionBlock(misconceptions)
        if (block) {
          systemPrompt += block
          const topHighConfidence = misconceptions.find((m) => m.confidence === 'HIGH')
          if (topHighConfidence) systemPrompt += buildRemediationStrategy(topHighConfidence)
        }
      } catch {
        // non-fatal — misconception context is purely additive
      }

      // Sprint CT: concept transfer status — distinguish memorized procedure from real understanding.
      try {
        const { evaluateConceptTransfer, buildTransferReasoningBlock, generateTransferPrompt } = await import('@/lib/school/adaptive/conceptTransfer')
        const transferProfile = await evaluateConceptTransfer(userId, subjectCode, schoolCtx.chapter.id)
        const block = buildTransferReasoningBlock(transferProfile)
        if (block) {
          systemPrompt += block
          if (transferProfile?.level === 'TRANSFER_WEAK') {
            systemPrompt += generateTransferPrompt(subjectCode, chapterKgNodes.map((n) => n.id))
          }
        }
      } catch {
        // non-fatal — transfer context is purely additive
      }

      // Sprint CU: confidence calibration — detect overconfident/underconfident learners.
      try {
        const { getConfidenceProfile, buildConfidenceCalibrationBlock } = await import('@/lib/school/adaptive/confidenceCalibration')
        // Include recent student messages from this session as live language signals
        const recentStudentMessages = learnSession.messages
          .filter((m) => m.role === MessageRole.USER)
          .slice(0, 10)
          .map((m) => m.content)
        const confidenceProfile = await getConfidenceProfile(
          userId, subjectCode, schoolCtx.chapter.id, recentStudentMessages
        )
        const block = buildConfidenceCalibrationBlock(confidenceProfile)
        if (block) systemPrompt += block
      } catch {
        // non-fatal — confidence context is purely additive
      }

      // Sprint CV: learning momentum — detect engagement risk before drop-off.
      try {
        const { getLearningMomentum, buildMomentumBlock } = await import('@/lib/school/adaptive/learningMomentum')
        const momentumProfile = await getLearningMomentum(userId)
        systemPrompt += buildMomentumBlock(momentumProfile)
      } catch {
        // non-fatal — momentum context is purely additive
      }

      // Sprint CW: unified teaching strategy — single orchestrated directive from all signals.
      try {
        const { getTeachingStrategy, buildTeachingStrategyBlock } = await import('@/lib/school/adaptive/teachingStrategy')
        const { getSchoolChapters: _getChaptersForStrategy } = await import('@/lib/school/schoolRouting')
        const fullChapterForStrategy = _getChaptersForStrategy(schoolCtx.board, subjectCode, schoolCtx.grade)
          .find((c: { id: string }) => c.id === schoolCtx!.chapter.id)
        const strategyKgNodeIds = fullChapterForStrategy?.kgNodeIds ?? []
        const teachingStrategy = await getTeachingStrategy(
          userId, schoolCtx.board, schoolCtx.grade, subjectCode, schoolCtx.chapter.id, strategyKgNodeIds
        )
        systemPrompt += buildTeachingStrategyBlock(teachingStrategy)
      } catch {
        // non-fatal — strategy context is purely additive
      }

      // Sprint CX: longitudinal learning narrative — let the tutor acknowledge growth over time.
      try {
        const { getLearningNarrative, buildLearningNarrativeBlock } = await import('@/lib/school/adaptive/learningNarrative')
        const { getSchoolChapters: _getChaptersForNarrative } = await import('@/lib/school/schoolRouting')
        const fullChapterForNarrative = _getChaptersForNarrative(schoolCtx.board, subjectCode, schoolCtx.grade)
          .find((c: { id: string }) => c.id === schoolCtx!.chapter.id)
        const narrativeKgNodeIds = fullChapterForNarrative?.kgNodeIds ?? []
        const narrative = await getLearningNarrative(
          userId, schoolCtx.board, schoolCtx.grade, subjectCode, schoolCtx.chapter.id, narrativeKgNodeIds
        )
        systemPrompt += buildLearningNarrativeBlock(narrative)
      } catch {
        // non-fatal — narrative context is purely additive
      }

      // Sprint BQ: daily plan context — "Task X of Y" so tutor knows where
      // this lesson sits in today's schedule. Additive only, max 1 line.
      try {
        const { getDailyStudyPlan } = await import('@/lib/school/adaptive/dailyPlan')
        const dailyTasks = await getDailyStudyPlan(userId, schoolCtx.board, schoolCtx.grade)
        const taskIdx = dailyTasks.findIndex((t) => t.chapterId === schoolCtx!.chapter.id)
        if (taskIdx !== -1) {
          systemPrompt += `\n\nDAILY STUDY PLAN: Task ${taskIdx + 1} of ${dailyTasks.length} for today. Keep the session focused and within the chapter scope.`
        }
      } catch {
        // non-fatal — plan context is purely additive
      }

      // Sprint BP (Tutoring Quality): guided teaching strategy — understanding
      // checks, grade-aware depth, confusion recovery, weak-topic reinforcement,
      // example-first teaching, objective awareness, session completion signal.
      try {
        const { buildGuidedTeachingPrompt } = await import('@/lib/school/tutoring/guidedTeachingPrompt')
        systemPrompt += buildGuidedTeachingPrompt({
          board: schoolCtx.board,
          grade: schoolCtx.grade,
          subjectSlug: subjectCode,
          weakTopicTitles: guidedWeakTopicTitles,
          chapterObjectives: guidedChapterObjectives,
          checkpointFrequency,
          pendingCheckpointRetry,
          checkpointFailedAgain,
        })
      } catch (err) {
        console.warn('[learn/chat] guided teaching prompt skipped:', err)
      }

      // Sprint BR: student learning profile — coaching mode, strengths/weaknesses,
      // smart questioning, phase 4 weak-node recovery, phase 3 explanation depth.
      try {
        const { buildLearningProfile, formatLearningProfileContext } = await import('@/lib/school/adaptive/learningProfile')
        learnerProf = learnerProf ?? await buildLearningProfile(userId, schoolCtx.grade, subjectCode, lastSuccessfulTeachingStyle, schoolCtx.board)
        learnerProfHoisted = learnerProf
        systemPrompt += formatLearningProfileContext(learnerProf)

        // Sprint BX: inject teaching style instructions into system prompt
        if (learnerProf.preferredTeachingStyle.confidence !== 'low') {
          const { buildTeachingStyleBlock } = await import('@/lib/school/adaptive/teachingStyle')
          systemPrompt += buildTeachingStyleBlock(learnerProf.preferredTeachingStyle)
        }

        // Phase 4: if this chapter has weak nodes, add recovery instruction
        if (guidedWeakTopicTitles.length > 0) {
          systemPrompt += `\n\nWEAK TOPIC RECOVERY (this chapter): When introducing a concept related to ${guidedWeakTopicTitles[0]}, briefly revisit the underlying prerequisite idea first, mention one common mistake students make, then provide one extra worked example. Limit this recovery to a single example — do not pad the response.`
        }
      } catch (err) {
        console.warn('[learn/chat] learning profile context skipped:', err)
      }

      // Sprint CH: interactive worked examples — solve WITH the student step by step.
      // Activates when the student asks to be walked through a problem, or when a
      // worked example is already in progress from a previous turn.
      try {
        const { detectWorkedExampleIntent, buildWorkedExampleBlock } = await import('@/lib/school/tutoring/workedExamples')
        const difficultyMode = learnerProfHoisted?.preferredDifficulty ?? 'standard'
        if (snapshotWorkedExample) {
          // Resume an in-progress example
          workedExampleActive = true
          systemPrompt += buildWorkedExampleBlock({
            concept: snapshotWorkedExample.concept,
            difficultyMode,
            resuming: true,
            currentStep: snapshotWorkedExample.currentStep,
            totalSteps: snapshotWorkedExample.stepCount,
          })
        } else {
          const concept = detectWorkedExampleIntent(message, subjectCode)
          if (concept) {
            workedExampleActive = true
            systemPrompt += buildWorkedExampleBlock({ concept, difficultyMode })
          }
        }
      } catch (err) {
        console.warn('[learn/chat] worked example context skipped:', err)
      }

      // Sprint CO: primary student goal from the unified Learning Navigator
      // Sprint CK: enrich with roadmap progress for the current subject
      try {
        const { getLearningNavigatorAction, buildNavigatorSystemPromptBlock } = await import('@/lib/school/navigation/learningNavigator')
        const action = await getLearningNavigatorAction(userId, schoolCtx.board, schoolCtx.grade)
        if (action) systemPrompt += buildNavigatorSystemPromptBlock(action)

        const { getSubjectRoadmap, roadmapProgressPhrase } = await import('@/lib/school/roadmap/learningRoadmap')
        const roadmap = await getSubjectRoadmap(userId, schoolCtx.board, schoolCtx.grade, subjectCode).catch(() => null)
        if (roadmap && roadmap.totalCount > 0) {
          systemPrompt += `\n\nROADMAP PROGRESS: The student is ${roadmapProgressPhrase(roadmap)}. You may occasionally acknowledge this long-term progress to motivate them (e.g. "You're ${roadmap.completionPercent}% through ${roadmap.subjectLabel}!"). Do not over-use it — keep the focus on the current concept.`
        }
      } catch (err) {
        console.warn('[learn/chat] navigator context skipped:', err)
      }

      // Sprint BY: lesson plan — derive chapter roadmap from existing progress data
      // and inject as CURRENT LESSON PLAN block. Additive, try/catch, never blocks.
      try {
        const { buildLessonPlan, buildLessonPlanBlock } = await import('@/lib/school/adaptive/lessonPlanner')
        const { getNodesForChapter: _getNodes } = await import('@/lib/education')
        const { getSchoolChapters: _getChapsByForPlan } = await import('@/lib/school/schoolRouting')
        const fullChapterForPlan = _getChapsByForPlan(schoolCtx.board, subjectCode, schoolCtx.grade)
          .find((c) => c.id === schoolCtx!.chapter.id)
        if (fullChapterForPlan) {
          const planNodes = _getNodes(fullChapterForPlan)
          const plan = await buildLessonPlan(
            userId,
            subjectCode,
            schoolCtx.chapter.id,
            schoolCtx.displayTitle,
            planNodes,
          )
          lessonPlanHoisted = plan
          const planBlock = buildLessonPlanBlock(plan)
          if (planBlock) systemPrompt += planBlock
        }
      } catch (err) {
        console.warn('[learn/chat] lesson plan context skipped:', err)
      }

      // Sprint CA: spaced revision — inject DUE FOR REVIEW block when mastered
      // concepts in this chapter are due for a memory refresh.
      try {
        const { getDueRevisions, buildRevisionBlock } = await import('@/lib/school/adaptive/spacedRevision')
        const dueRevisions = await getDueRevisions(userId, subjectCode, chapterKgNodes.map((n) => n.id))
        const revBlock = buildRevisionBlock(dueRevisions)
        if (revBlock) systemPrompt += revBlock
      } catch (err) {
        console.warn('[learn/chat] spaced revision context skipped:', err)
      }

      // Sprint CB: prerequisite gap detection — only inject when confidence is high.
      // Avoids overwhelming the student with recovery prompts on low-signal turns.
      try {
        const { detectPrerequisiteGap, buildPrerequisiteAlertBlock } = await import('@/lib/school/adaptive/prerequisiteRecovery')
        const { getNodesForChapter: _getNodesForPrereq } = await import('@/lib/education')
        const { getSchoolChapters: _getChapsForPrereq } = await import('@/lib/school/schoolRouting')
        const fullChapterForPrereq = _getChapsForPrereq(schoolCtx.board, subjectCode, schoolCtx.grade)
          .find((c) => c.id === schoolCtx!.chapter.id)
        if (fullChapterForPrereq) {
          const prereqNodes = _getNodesForPrereq(fullChapterForPrereq)
          const gap = await detectPrerequisiteGap(userId, subjectCode, schoolCtx.chapter.id, prereqNodes)
          if (gap && gap.confidence === 'high') {
            prereqGapHoisted = gap
            systemPrompt += buildPrerequisiteAlertBlock(gap)
          }
        }
      } catch (err) {
        console.warn('[learn/chat] prerequisite recovery context skipped:', err)
      }

      // Sprint CE: exam readiness block — inject when profile has readiness data
      try {
        if (learnerProfHoisted?.examReadinessSummary) {
          const { getExamReadinessForSubject, buildExamReadinessBlock } = await import('@/lib/school/adaptive/examReadiness')
          const { ALL_KG_NODES } = await import('@/lib/education')
          const nodeMap = new Map(ALL_KG_NODES.map((n: import('@/lib/education').KnowledgeNode) => [n.id, n.title]))
          const readiness = await getExamReadinessForSubject(userId, schoolCtx.board, schoolCtx.grade, subjectCode)
          const block = buildExamReadinessBlock(readiness, (id) => nodeMap.get(id) ?? id)
          if (block) systemPrompt += block
        }
      } catch (err) {
        console.warn('[learn/chat] exam readiness context skipped:', err)
      }

      // Sprint CF: mock test insights block — inject most recent mock result for this subject
      try {
        const recentMock = await prisma.practiceSession.findFirst({
          where: { userId, subjectSlug: subjectCode, kind: 'mock', completedAt: { not: null } },
          orderBy: { completedAt: 'desc' },
          select: { score: true, questions: true, completedAt: true },
        }).catch(() => null)
        if (recentMock && typeof recentMock.score === 'number') {
          const { ALL_KG_NODES } = await import('@/lib/education')
          const nodeMap = new Map(ALL_KG_NODES.map((n: import('@/lib/education').KnowledgeNode) => [n.id, n.title]))
          const { buildMockTestInsightsBlock } = await import('@/lib/school/exams/mockTestEngine')
          // Derive strong/weak from question-level scores stored in review (not persisted here — use mistake records as proxy)
          const since7 = new Date(Date.now() - 7 * 86400000)
          const recentMistakeNodes = await prisma.mistakeRecord.findMany({
            where: { userId, subjectSlug: subjectCode, category: 'mock_test', createdAt: { gte: since7 } },
            select: { topicSlug: true },
          }).catch(() => [] as { topicSlug: string }[])
          const weakTitles = [...new Set(recentMistakeNodes.map((r) => nodeMap.get(r.topicSlug) ?? r.topicSlug))].filter(Boolean).slice(0, 4)
          const subjectMeta = (await import('@/lib/school/schoolRouting')).SCHOOL_SUBJECT_META
          const block = buildMockTestInsightsBlock(subjectMeta[subjectCode]?.label ?? subjectCode, recentMock.score, [], weakTitles)
          if (block) systemPrompt += block
        }
      } catch (err) {
        console.warn('[learn/chat] mock test insights skipped:', err)
      }

      // Sprint CI: note when revision notes have been generated for this chapter,
      // so the tutor can point the student to them when relevant.
      try {
        const notesCount = await prisma.revisionNotesCache.count({
          where: { board: schoolCtx.board, subjectSlug: subjectCode, grade: schoolCtx.grade, chapterId: schoolCtx.chapter.id },
        }).catch(() => 0)
        if (notesCount > 0) {
          systemPrompt += `\n\nREVISION NOTES AVAILABLE: Concise revision notes (Quick Revision, Exam Revision${schoolCtx && (subjectCode === 'mathematics' || subjectCode === 'science') ? ', Formula Sheet' : ''}) have been generated for this chapter and can be opened from the chapter page via "Generate Revision Notes". If the student asks for a summary, key points, or quick revision, you may mention these are available — but still answer their question directly.`
        }
      } catch (err) {
        console.warn('[learn/chat] revision notes hint skipped:', err)
      }

      // Sprint BW: visual learning aids — detect the best visual for this chapter
      // and instruct the tutor to emit a VISUAL:<type> tag when helpful.
      // Additive only — never blocks, never modifies existing context.
      try {
        const { detectVisual, buildVisualsSystemBlock } = await import('@/lib/school/visuals/detectVisual')
        const availableVisual = detectVisual({
          subjectSlug: subjectCode,
          chapterTitle: schoolCtx.chapter.title,
          lessonTitle: lessonCtx?.lessonTitle,
        })
        const visualBlock = buildVisualsSystemBlock(availableVisual)
        if (visualBlock) systemPrompt += visualBlock
      } catch (err) {
        console.warn('[learn/chat] visual aids context skipped:', err)
      }
    }

    // Visual learning aids for SUBJECT_LIBRARY subjects — same Sprint BW
    // detectVisual()/buildVisualsSystemBlock() the school flow uses above,
    // here scoped to the Library lesson's own unit/lesson titles instead of
    // schoolCtx.chapter.title. Purely additive; never blocks a lesson.
    if (!schoolCtx) {
      try {
        const { detectVisual, buildVisualsSystemBlock } = await import('@/lib/school/visuals/detectVisual')
        const availableVisual = detectVisual({
          subjectSlug: subjectCode,
          chapterTitle: lessonCtx?.unitTitle ?? '',
          lessonTitle: lessonCtx?.lessonTitle,
        })
        const visualBlock = buildVisualsSystemBlock(availableVisual)
        if (visualBlock) systemPrompt += visualBlock
      } catch (err) {
        console.warn('[learn/chat] library visual aids context skipped:', err)
      }
    }

    // Append the personalized roadmap context (if one exists) so the tutor
    // never skips ahead of the learner's current level/module.
    if (profile?.currentLevel) {
      try {
        const { generateRoadmap } = await import('@/lib/curriculum/engine')
        const roadmap = generateRoadmap(subjectCode, profile.currentLevel as any, (profile as any).targetLevel ?? null)
        if (roadmap) {
          const { buildTutorRoadmapContext } = await import('@/lib/curriculum/engine')
          systemPrompt += `\n\n${buildTutorRoadmapContext(roadmap)}`
        }
      } catch (err) {
        console.warn('[learn/chat] roadmap context skipped:', err)
      }
    }

    // Append Coach placement context (recommended level + strengths/weaknesses)
    // when available, so the Tutor adapts explanations without re-deriving level.
    try {
      const goal = await prisma.learningGoal.findFirst({
        where: { coachProfile: { userId: session.user.id }, subjectId: learnSession.subjectId },
        include: { assessment: { include: { attempts: { orderBy: { createdAt: 'desc' }, take: 1 } } } },
      })
      const attempt = goal?.assessment?.attempts?.[0]
      if (goal?.recommendedLevel || attempt) {
        const lines = [`\n\nCOACH CONTEXT — use this to calibrate your explanations:`]
        if (goal?.recommendedLevel) lines.push(`- Coach-recommended starting level: ${goal.recommendedLevel.replace('_', ' ')}`)
        if (goal?.targetLevel) lines.push(`- Target level: ${goal.targetLevel.replace('_', ' ')}`)
        if (attempt?.strengths?.length) lines.push(`- Strengths from placement assessment: ${attempt.strengths.join(', ')}`)
        if (attempt?.weaknesses?.length) lines.push(`- Weak areas to reinforce gently: ${attempt.weaknesses.join(', ')}`)
        lines.push(`Adapt pacing and depth accordingly — spend more time on weak areas, move faster through strengths, and never assume knowledge beyond the recommended starting level.`)
        systemPrompt += lines.join('\n')
      }
    } catch (err) {
      console.warn('[learn/chat] coach context skipped:', err)
    }

    // Append curriculum-tree progression context (current/completed modules,
    // weak areas from module checks) for SUBJECT_LIBRARY subjects, so the
    // Tutor never teaches ahead of what's unlocked. Additive — independent
    // of the legacy lesson-based roadmap context above.
    try {
      const { findLibrarySubject } = await import('@/lib/curriculum/subjectCatalog')
      const librarySubject = findLibrarySubject(learnSession.subject.slug)
      if (librarySubject) {
        const progressRows = await prisma.moduleProgress.findMany({
          where: { userId: session.user.id, subjectId: learnSession.subjectId },
        })
        if (progressRows.length > 0) {
          const bySlug = new Map(progressRows.map((p) => [p.moduleSlug, p]))
          const completed = librarySubject.modules.filter((m) => bySlug.get(m.slug)?.status === 'COMPLETED').map((m) => m.title)
          const current = librarySubject.modules.find((m) => {
            const st = bySlug.get(m.slug)?.status
            return st === 'AVAILABLE' || st === 'IN_PROGRESS'
          })
          const locked = librarySubject.modules.filter((m) => (bySlug.get(m.slug)?.status ?? 'LOCKED') === 'LOCKED').map((m) => m.title)
          const weakModules = progressRows.filter((p) => p.status === 'IN_PROGRESS' && p.bestScore != null && p.bestScore < 70)
            .map((p) => librarySubject.modules.find((m) => m.slug === p.moduleSlug)?.title)
            .filter(Boolean)

          const lines = [`\n\nCURRICULUM PROGRESSION — strict teaching boundary:`]
          if (current) lines.push(`- Current module (teach this now): "${current.title}" — topics: ${current.nodes.map((n) => n.title).join(', ')}`)
          if (completed.length) lines.push(`- Already completed (can reference, don't re-teach from scratch): ${completed.join(', ')}`)
          if (weakModules.length) lines.push(`- Struggled with on module checks (revisit gently, give extra examples): ${weakModules.join(', ')}`)
          if (locked.length) lines.push(`- NOT YET UNLOCKED (do not teach these topics yet, even if asked — gently redirect to the current module): ${locked.join(', ')}`)
          lines.push(`Stay strictly within the current module's scope unless the student is reviewing a completed module.`)
          systemPrompt += lines.join('\n')
        }
      }
    } catch (err) {
      console.warn('[learn/chat] curriculum progression context skipped:', err)
    }

    // Misconception alert for SUBJECT_LIBRARY subjects — the same Sprint-CS
    // engine the school flow uses (line ~388), here scoped to the library
    // subject's own lesson slugs (its MistakeRecord topicSlugs) instead of KG
    // node ids. Purely additive context; reuses the existing taxonomy + engine
    // with no schema or engine change, and never blocks a lesson.
    if (!schoolCtx) {
      try {
        const { findLibrarySubject } = await import('@/lib/curriculum/subjectCatalog')
        const libSubject = findLibrarySubject(subjectCode)
        if (libSubject) {
          const lessonSlugs = libSubject.modules.flatMap((m) => m.nodes.map((n) => n.slug))
          const { detectMisconceptions, buildMisconceptionBlock, buildRemediationStrategy } = await import('@/lib/school/adaptive/misconceptionEngine')
          const misconceptions = await detectMisconceptions(userId, subjectCode, lessonSlugs, '')
          const block = buildMisconceptionBlock(misconceptions)
          if (block) {
            systemPrompt += block
            const topHighConfidence = misconceptions.find((m) => m.confidence === 'HIGH')
            if (topHighConfidence) systemPrompt += buildRemediationStrategy(topHighConfidence)
          }
        }
      } catch {
        // non-fatal — misconception context is purely additive
      }
    }

    // Append Adaptive Tutor context — preferences + recent performance trend,
    // so the Tutor adjusts pacing/depth/examples per learner instead of
    // teaching everyone the same way. Additive — independent of other context blocks.
    try {
      const learningProfile = learningProfileShared
      const subjectAnalytics = subjectAnalyticsShared
      if (learningProfile || subjectAnalytics) {
        const lines = [`\n\nADAPTIVE TUTOR CONTEXT — calibrate your teaching style:`]
        if (learningProfile) {
          lines.push(`- Preferred learning style: ${learningProfile.preferredLearningStyle.toLowerCase()} (lean into ${learningProfile.preferredLearningStyle === 'VISUAL' ? 'diagrams/visual analogies' : learningProfile.preferredLearningStyle === 'PRACTICAL' ? 'hands-on examples and exercises' : learningProfile.preferredLearningStyle === 'THEORETICAL' ? 'concepts and underlying principles' : 'a mix of theory and practice'})`)
          lines.push(`- Preferred lesson length: ${learningProfile.preferredLessonLength.toLowerCase()}; pace: ${learningProfile.learningPace.toLowerCase()}; difficulty preference: ${learningProfile.preferredDifficulty.toLowerCase()}`)
          lines.push(`- Self-reported confidence: ${learningProfile.confidenceLevel}/100`)
        }
        if (subjectAnalytics) {
          if (subjectAnalytics.trend === 'DECLINING') lines.push(`- Recent trend: struggling lately — slow down, simplify, add more worked examples and check understanding often.`)
          else if (subjectAnalytics.trend === 'IMPROVING') lines.push(`- Recent trend: excelling lately — move faster, increase depth/challenge, introduce more advanced angles.`)
          if (subjectAnalytics.weakTopics.length) lines.push(`- Give extra reinforcement on: ${subjectAnalytics.weakTopics.join(', ')}`)
          if (subjectAnalytics.strongTopics.length) lines.push(`- Can move quickly through (already solid): ${subjectAnalytics.strongTopics.join(', ')}`)
        }
        lines.push(`Adapt explanations, pacing, and example density to this learner — never use a one-size-fits-all approach.`)
        systemPrompt += lines.join('\n')
      }
    } catch (err) {
      console.warn('[learn/chat] adaptive tutor context skipped:', err)
    }

    // Sprint EI-6: Adaptive Teaching Plan — let Tutor Max SEE the Sprint 5
    // TeachingPlan for the current topic and adapt its teaching STYLE only.
    // Additive, own try/catch, never blocks. Teaching style only — content
    // stays curriculum-controlled (the block carries an explicit guard line).
    try {
      const currentTopicSlug = topicProgressRowsShared.find((r) => r.status === 'IN_PROGRESS')?.topicSlug ?? null
      if (currentTopicSlug) {
        const { getTutorTeachingContext, buildTutorTeachingContextBlock } = await import('@/lib/intelligence/tutorTeachingContext')
        const teachingContext = await getTutorTeachingContext(userId, subjectCode, currentTopicSlug)
        systemPrompt += buildTutorTeachingContextBlock(teachingContext)
      }
    } catch (err) {
      console.warn('[learn/chat] adaptive teaching plan context skipped:', err)
    }

    // Mastery + Spaced Repetition context (Sprint C, Part 8): the Tutor should
    // know weak concepts, upcoming reviews, project history, and mastery
    // scores, and adjust explanations accordingly. Additive, own try/catch —
    // never blocks the lesson if any of this is unavailable.
    try {
      const sevenDaysOut = new Date()
      sevenDaysOut.setDate(sevenDaysOut.getDate() + 7)

      const [weakMetrics, dueReviews, recentSubmissions] = await Promise.all([
        prisma.retentionMetric.findMany({
          where: { userId, subjectId: learnSession.subjectId, masteryScore: { lt: 70 } },
          orderBy: { masteryScore: 'asc' },
          take: 5,
        }),
        prisma.reviewSchedule.findMany({
          where: { userId, subjectId: learnSession.subjectId, nextReviewAt: { lte: sevenDaysOut } },
          orderBy: { nextReviewAt: 'asc' },
          take: 5,
        }),
        prisma.projectSubmission.findMany({
          where: { userId, project: { subjectId: learnSession.subjectId } },
          include: { project: true },
          orderBy: { updatedAt: 'desc' },
          take: 3,
        }),
      ])

      if (weakMetrics.length || dueReviews.length || recentSubmissions.length) {
        const lines = [`\n\nMASTERY & SPACED REPETITION CONTEXT — use this to target your teaching:`]
        if (weakMetrics.length) {
          lines.push(`- Weak concepts (mastery score in parentheses, out of 100): ${weakMetrics.map((m) => `${m.topic} (${m.masteryScore})`).join(', ')}. Weave in extra reinforcement and check understanding before moving on.`)
        }
        if (dueReviews.length) {
          const now = new Date()
          const overdueTopics = dueReviews.filter((r) => r.nextReviewAt < now).map((r) => r.topic)
          const upcomingTopics = dueReviews.filter((r) => r.nextReviewAt >= now).map((r) => r.topic)
          if (overdueTopics.length) lines.push(`- OVERDUE for review: ${overdueTopics.join(', ')}. If a natural opening arises, briefly revisit one of these before introducing new material.`)
          if (upcomingTopics.length) lines.push(`- Coming up for review soon: ${upcomingTopics.join(', ')}.`)
        }
        if (recentSubmissions.length) {
          lines.push(`- Recent project history: ${recentSubmissions.map((s) => `"${s.project.title}" — ${s.status.toLowerCase()}${s.score != null ? ` (score ${s.score}/100)` : ''}`).join('; ')}. Reference these when relevant to ground new concepts in work the student has already done.`)
        }
        lines.push(`Adjust explanation depth and examples toward the learner's weak spots and overdue reviews — don't just repeat what they already know well.`)
        systemPrompt += lines.join('\n')
      }
    } catch (err) {
      console.warn('[learn/chat] mastery/spaced-repetition context skipped:', err)
    }

    // Knowledge Graph context — prerequisites, available topics, mastery gaps,
    // and WHY the tutor is recommending the current topic (Part 7 of Sprint K.5).
    // Additive — independent try/catch, never blocks the lesson.
    try {
      const { getKnowledgeGraph, buildKnowledgeGraphContext, getAvailableNodes, getDirectUnlocks, getAllNodes } = await import('@/lib/curriculum/knowledgeGraph')
      const graph = getKnowledgeGraph(subjectCode)
      if (graph) {
        const topicProgressRows = topicProgressRowsShared
        const completedSlugs = topicProgressRows
          .filter((r) => r.status === 'COMPLETED' || r.status === 'MASTERED' || r.status === 'REVISION')
          .map((r) => r.topicSlug)
        const completedSet = new Set(completedSlugs)

        const inProgressSlug = topicProgressRows.find((r) => r.status === 'IN_PROGRESS')?.topicSlug
        const kgContext = buildKnowledgeGraphContext(subjectCode, completedSlugs, inProgressSlug)
        if (kgContext) systemPrompt += `\n\n${kgContext}`

        // WHY THIS TOPIC: tell the tutor what the current/next topic unlocks so it
        // can explain to the learner why mastering this topic matters.
        const allNodes = getAllNodes(graph)
        const currentTopicNode = inProgressSlug ? allNodes.find((n) => n.slug === inProgressSlug) : null
        if (currentTopicNode) {
          // Explicit warning when the learner is on a topic whose prerequisites
          // they haven't completed — the tutor must backfill, not assume.
          const unmetPrereqs = currentTopicNode.prerequisites.filter((p) => !completedSet.has(p))
          if (unmetPrereqs.length > 0) {
            const unmetTitles = unmetPrereqs.map((p) => allNodes.find((n) => n.slug === p)?.title ?? p)
            systemPrompt += `\n\nPREREQUISITES NOT MET: The learner has NOT completed the prerequisites for "${currentTopicNode.title}": ${unmetTitles.join(', ')}. Do NOT assume this knowledge. Briefly probe what they already know, fill the most critical gaps inline as you teach, and keep explanations self-contained.`
          }
          const unlocks = getDirectUnlocks(graph, currentTopicNode.slug)
          if (unlocks.length > 0) {
            systemPrompt += `\n\nWHY THIS TOPIC MATTERS: Mastering "${currentTopicNode.title}" unlocks: ${unlocks.map((n) => n.title).join(', ')}. When it's natural, briefly explain to the learner why this topic is a prerequisite for their next goals — make the learning journey feel purposeful, not arbitrary.`
          }
        } else {
          // No in-progress: recommend next available
          const available = getAvailableNodes(graph, completedSet)
          const nextNode = available[0]
          if (nextNode) {
            const unlocks = getDirectUnlocks(graph, nextNode.slug)
            if (unlocks.length > 0) {
              systemPrompt += `\n\nNEXT RECOMMENDED TOPIC: "${nextNode.title}" (${nextNode.estimatedHours}h). Mastering it unlocks: ${unlocks.map((n) => n.title).join(', ')}. Guide the learner toward this topic once the current discussion concludes.`
            }
          }
        }

        // Knowledge gaps: completed but mastery below 70%
        const weakTopics = topicProgressRows.filter(
          (r) => (r.status === 'COMPLETED' || r.status === 'MASTERED') && r.masteryPct > 0 && r.masteryPct < 70
        )
        if (weakTopics.length > 0) {
          systemPrompt += `\n\nKNOWLEDGE GAPS — completed with mastery < 70%: ${weakTopics.map((r) => `${r.topicSlug} (${r.masteryPct}%)`).join(', ')}. Weave in targeted reinforcement for these topics where natural.`
        }

        // Assessment protocol — subject-aware, with deterministic validation instructions
        // for STEM and programming subjects.
        try {
          const { getAssessmentRequirement } = await import('@/lib/assessment/subjectValidator')
          const req = getAssessmentRequirement(subjectCode)
          const deterministicExtra = [
            req.mathAnswerInstruction,
            req.codeOutputInstruction,
          ].filter(Boolean).join('\n')

          systemPrompt += `\n\nASSESSMENT PROTOCOL — follow this EXACTLY when the learner asks to be assessed (phrases like "assess me", "test me", "оцени моё понимание", "परीक्षण करो"):
Question focus for this subject: ${req.questionFocus.join('; ')}.
Validation approach: ${req.deterministicNote}
${deterministicExtra ? deterministicExtra + '\n' : ''}Steps:
1. Acknowledge, then ask ONE question at a time.
2. Wait for the learner's answer before the next question.
3. Ask exactly 3 questions: (1) factual/numeric recall, (2) application/reasoning, (3) explanation in own words.
4. After question 3 is answered, give brief feedback per answer, then END your response (last line) with:
[ASSESSMENT_RESULT correctness=XX reasoning=XX confidence=XX]
Where: correctness (0-100) = factual/numeric accuracy; reasoning (0-100) = quality of explanation; confidence (0-100) = clarity and certainty (inferred, not self-reported).
CRITICAL: The [ASSESSMENT_RESULT ...] tag appears ONCE, at the very end, never mid-conversation.`
        } catch {
          // fallback to generic protocol
          systemPrompt += `\n\nASSESSMENT PROTOCOL: When asked to assess, ask 3 questions one at a time, then end with [ASSESSMENT_RESULT correctness=XX reasoning=XX confidence=XX].`
        }
      }
    } catch (err) {
      console.warn('[learn/chat] knowledge graph context skipped:', err)
    }

    // Learner Intelligence Profile (Sprint P) — aggregates TopicProgress,
    // MistakeRecord, EvidenceRecord, LearningProfile, and SubjectAnalytics
    // into estimated level, confidence, pace, weak/strong concepts, mistake
    // trends, learner mode (slow/advanced), and explanation style. Subject-
    // agnostic — works for every subject. Additive, own try/catch.
    try {
      const { buildLearnerIntelligenceProfile, formatLearnerIntelligenceContext } = await import('@/lib/ai/learnerProfile')
      const learnerProfile = await buildLearnerIntelligenceProfile(
        userId,
        subjectCode,
        learnSession.subjectId,
        profile?.selfDescription ?? null,
        profile?.learningGoals ?? null,
      )
      if (learnerProfile.hasSignal) {
        systemPrompt += formatLearnerIntelligenceContext(learnerProfile)
      }
    } catch (err) {
      console.warn('[learn/chat] learner intelligence profile skipped:', err)
    }

    // Messages arrive newest-first (capped query above) — restore chronological
    // order for the AI payload.
    const historyMessages = [...learnSession.messages]
      .reverse()
      .filter((m) => m.role !== MessageRole.SYSTEM)
      .map((m) => ({
        role: m.role === MessageRole.USER ? ('user' as const) : ('assistant' as const),
        content: m.content,
      }))

    try {
      const { text, provider } = await routeAI(
        [...historyMessages, { role: 'user', content: message }],
        systemPrompt,
        country,
        1024,
        teachingLang,
        { userId, subject: learnSession.subject.slug },
      )

      if (!text) {
        return NextResponse.json({ success: false, error: 'Empty response from model' }, { status: 502 })
      }

      // Sprint BW: extract and strip VISUAL:<type> tag before persisting/returning.
      // The tag is additive — stripping it keeps stored messages clean.
      let responseVisual: string | null = null
      let cleanText = text
      // Sprint CH: worked-example progress — null = no change, 'clear' = done, object = update
      let workedExampleUpdate: 'clear' | { concept: string; currentStep: number; stepCount: number } | null = null
      if (schoolCtx) {
        try {
          const { parseVisualTag } = await import('@/lib/school/visuals/detectVisual')
          const parsed = parseVisualTag(text)
          responseVisual = parsed.visual
          cleanText = parsed.cleanText
        } catch { /* non-fatal */ }

        // Sprint CH: extract and strip the [WE:...] worked-example progress tag
        if (workedExampleActive || snapshotWorkedExample) {
          try {
            const { parseWorkedExampleTag } = await import('@/lib/school/tutoring/workedExamples')
            const we = parseWorkedExampleTag(cleanText)
            cleanText = we.cleanText
            if (we.done) workedExampleUpdate = 'clear'
            else if (we.state) workedExampleUpdate = { concept: we.state.concept, currentStep: we.state.currentStep, stepCount: we.state.stepCount }
          } catch { /* non-fatal */ }
        }
      } else {
        // VISUAL:<type> extraction for SUBJECT_LIBRARY subjects — same
        // Sprint BW parseVisualTag() the school flow uses above. Additive;
        // strips the tag from the persisted/returned text either way.
        try {
          const { parseVisualTag } = await import('@/lib/school/visuals/detectVisual')
          const parsed = parseVisualTag(text)
          responseVisual = parsed.visual
          cleanText = parsed.cleanText
        } catch { /* non-fatal */ }
      }

      // Sprint C/H: deterministic, rule-based visual detection on the final
      // tutor text, now routed through the Teaching Strategy Engine (Sprint H)
      // so a visual only appears when the strategy actually requests one, and
      // carries `interactive`/`challenge` only when the strategy calls for
      // them — no AI reasoning, no LLM parsing, no prompt changes. Non-fatal —
      // falls back to undefined on any error so a lesson never breaks because
      // of this. Never persisted; attached to the JSON response only.
      let detectedVisualSpec: ReturnType<typeof buildVisualSpec> = null
      try {
        detectedVisualSpec = planVisualTeaching(cleanText).spec
      } catch { /* non-fatal */ }

      // Deterministic, rule-based 3D scene detection (vectors/molecules/coordinate
      // space) — same non-fatal, no-AI-call pattern as detectedVisualSpec above.
      // Only fires when the 2D pipeline found nothing, so a message never carries
      // both a 2D diagram and a 3D scene.
      let detectedSceneSpec: ReturnType<typeof buildSceneSpec> = null
      if (!detectedVisualSpec) {
        try {
          detectedSceneSpec = buildSceneSpec(cleanText)
        } catch { /* non-fatal */ }
      }

      // Extend the "never show two visuals for one explanation" guard above to
      // the one pairing it missed: responseVisual (the LLM's own VISUAL:<type>
      // tag, parsed earlier) is computed independently of both deterministic
      // pipelines, so it could previously coexist with detectedVisualSpec or
      // detectedSceneSpec and render a duplicate/conflicting visual alongside
      // one of them. The deterministic pipelines are the trusted signal here —
      // suppress the free-text LLM tag whenever either of them already fired.
      if (detectedVisualSpec || detectedSceneSpec) {
        responseVisual = null
      }

      await withRetry(() => prisma.message.create({
        data: { sessionId, role: MessageRole.ASSISTANT, content: cleanText },
      }))

      // Sprint BY/CH: persist concept/teaching-style + worked-example memory to
      // snapshot. Write once when either the lesson concept changed (BY) or the
      // worked-example state changed (CH).
      if (schoolCtx) {
        const newCurrentId = lessonPlanHoisted?.currentConcept?.nodeId ?? null
        const newNextId = lessonPlanHoisted?.nextConcept?.nodeId ?? null
        const conceptChanged = !!newCurrentId && newCurrentId !== snapshotCurrentConceptId
        const workedExampleChanged = workedExampleUpdate !== null

        if (conceptChanged || workedExampleChanged) {
          // Sprint CH: compute the next worked-example memory value
          let workedExampleField: Record<string, unknown> = {}
          if (workedExampleUpdate === 'clear') {
            workedExampleField = { currentWorkedExample: null }
          } else if (workedExampleUpdate) {
            workedExampleField = { currentWorkedExample: workedExampleUpdate }
          }

          prisma.learnSession.update({
            where: { id: sessionId },
            data: {
              contextSnapshot: {
                ...(snapshot ?? {}),
                ...(learnerProfHoisted?.preferredTeachingStyle.confidence !== 'low'
                  ? { lastSuccessfulTeachingStyle: learnerProfHoisted!.preferredTeachingStyle.style }
                  : {}),
                ...(conceptChanged ? { currentConceptNodeId: newCurrentId, nextConceptNodeId: newNextId } : {}),
                // Sprint CB: persist prereq gap only when high-confidence (avoid noisy writes)
                ...(prereqGapHoisted ? { lastPrerequisiteGap: prereqGapHoisted.missingPrereqId } : {}),
                ...workedExampleField,
              },
            },
          }).catch(() => {})
        }
      }

      // Auto-save lesson position on every interaction so Dashboard/Library
      // can show exactly where the learner is without them completing a lesson.
      prisma.studentProgress.upsert({
        where: { userId_subjectCode: { userId, subjectCode: progressCode } },
        update: {
          lastStudiedAt: new Date(),
          ...(lessonCtx ? {
            lastLessonTitle: lessonCtx.lessonTitle,
            lastUnitTitle: lessonCtx.unitTitle,
          } : {}),
          ...(schoolCtx ? { currentLesson: schoolCtx.chapter.order } : {}),
        },
        create: {
          userId,
          subjectCode: progressCode,
          currentLesson: lessonCtx?.currentLesson ?? 1,
          completedLessons: lessonCtx?.completedLessons ?? [],
          lastStudiedAt: new Date(),
          lastLessonTitle: lessonCtx?.lessonTitle ?? null,
          lastUnitTitle: lessonCtx?.unitTitle ?? null,
        },
      }).catch(() => {})

      // Sprint CD: fire-and-forget streak update + achievement check (school students only)
      if (schoolCtx) {
        Promise.all([
          import('@/lib/school/achievements/streakEngine').then(({ updateStudyStreak }) =>
            updateStudyStreak(userId)
          ),
        ]).then(async ([streakResult]) => {
          if (streakResult.isNewDay) {
            const { checkAndUnlockAchievements } = await import('@/lib/school/achievements/achievementEngine')
            await checkAndUnlockAchievements(userId, schoolCtx!.board, schoolCtx!.grade)
          }
        }).catch(() => {})
      }

      // Lesson-sync bug fix: surface the exact lesson context this response
      // was generated from, so the client can reconcile Roadmap/Learn Panel
      // state to it on every turn. studentProgress.currentLesson (read above
      // into lessonCtx) is the single source of truth for "active lesson" —
      // previously only the client's own completion-triggered PATCH updated
      // curriculumProgress, so any failed/dropped PATCH left the Roadmap
      // showing a stale lesson while Tutor Max (which always re-reads this
      // DB value fresh, every turn) had already moved on.
      return NextResponse.json({
        success: true, text: cleanText, provider,
        visual: responseVisual ?? undefined, visualSpec: detectedVisualSpec ?? undefined,
        sceneSpec: detectedSceneSpec ?? undefined,
        lessonOrder: lessonCtx?.currentLesson ?? undefined,
        completedLessons: lessonCtx?.completedLessons ?? undefined,
      })
    } catch (error: any) {
      // Global AI budget spent — expected under load, not an error to report.
      if (error instanceof AIBudgetExceededError) {
        return NextResponse.json({ success: false, error: 'High demand right now — please try again in a minute.' }, { status: 429 })
      }
      // Log the real provider error server-side only — raw messages can leak
      // API key names and provider configuration to the client.
      console.error('[learn/chat] AI error:', error.message)
      captureError(error, { route: 'api/learn/chat', tags: { stage: 'ai' } })
      return NextResponse.json({ success: false, error: 'AI service temporarily unavailable. Please try again.' }, { status: 500 })
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[learn/chat]', err)
    captureError(err, { route: 'api/learn/chat' })
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
