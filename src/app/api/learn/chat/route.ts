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
    const country = (profile as any)?.country ?? 'global'
    let systemPrompt = buildTutorSystemPrompt(
      learnSession.subject.name,
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
        learnerProf = await buildLearningProfile(userId, schoolCtx.grade)
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
        learnerProf = learnerProf ?? await buildLearningProfile(userId, schoolCtx.grade)
        systemPrompt += formatLearningProfileContext(learnerProf)

        // Phase 4: if this chapter has weak nodes, add recovery instruction
        if (guidedWeakTopicTitles.length > 0) {
          systemPrompt += `\n\nWEAK TOPIC RECOVERY (this chapter): When introducing a concept related to ${guidedWeakTopicTitles[0]}, briefly revisit the underlying prerequisite idea first, mention one common mistake students make, then provide one extra worked example. Limit this recovery to a single example — do not pad the response.`
        }
      } catch (err) {
        console.warn('[learn/chat] learning profile context skipped:', err)
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

      await withRetry(() => prisma.message.create({
        data: { sessionId, role: MessageRole.ASSISTANT, content: text },
      }))

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

      return NextResponse.json({ success: true, text, provider })
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
