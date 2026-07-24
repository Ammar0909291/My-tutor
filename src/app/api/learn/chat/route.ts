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
import { generateSceneSpec, isAiSceneGenerationEnabled } from '@/lib/teaching/generateSceneSpec'
import { generateRoutedScene, isParametricSceneGenerationEnabled, routeSceneGenerator } from '@/lib/teaching/sceneGenerators/sceneRouter'
import { generateVisualizationCode, isDynamicVisualizationEnabled } from '@/lib/teaching/visuals/generateVisualizationCode'
import { getCachedVisualization, saveVisualization, normalizeConceptKey } from '@/lib/teaching/visuals/visualizationCache'
import { decideVisualization } from '@/lib/teaching/visualizationDecision'
import { decide } from '@/lib/teaching-engine'
import { appendEvidenceEvent, GradeBand, EvidenceCategory } from '@/lib/teaching/evidence/evidenceEngine'
import { isEduBrainEnabled } from '@/lib/curriculum/subjectRollout'
import {
  assembleLesson, buildStudentState, ingestGeneratedLesson, isExplanationMemoryEnabled, resolveContentRegister,
  type StudentState, type AssembledLesson,
} from '@/lib/teaching/assets'
import { stripIpaNotation } from '@/lib/text/ipaSanitizer'

// Voice Signal Recovery (Claude Recommendation #7): mirrors
// VoiceTimingSignal (src/lib/voice/voiceSignal.ts) exactly — never trust a
// network payload blind, so every numeric field is bounds-checked even
// though the client only ever forwards what the STT route just computed.
const voiceSignalSchema = z.object({
  durationMs: z.number().finite().nonnegative().nullable(),
  speechDurationMs: z.number().finite().nonnegative().nullable(),
  silenceDurationMs: z.number().finite().nonnegative().nullable(),
  segmentCount: z.number().int().nonnegative(),
  pauseCount: z.number().int().nonnegative(),
  totalPauseMs: z.number().finite().nonnegative(),
  longestPauseMs: z.number().finite().nonnegative(),
  avgConfidence: z.number().min(0).max(1).nullable(),
}).optional()

const schema = z.object({
  sessionId: z.string(),
  message: z.string().min(1).max(8000),
  // Bug 8 (mastery-gate rework): false = the previous long assistant
  // explanation stayed collapsed ("Read more" never pressed) — the
  // teaching engine must not assume unread text was read. Optional and
  // additive: older clients simply never send it.
  lastExplanationRead: z.boolean().optional(),
  // Voice Signal Recovery (Claude Recommendation #7): present only when
  // this turn's message originated from voice dictation. Optional and
  // additive — older clients simply never send it.
  voiceSignal: voiceSignalSchema,
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
    const { sessionId, message, lastExplanationRead, voiceSignal } = schema.parse(body)

    // Wave 0 Step 2 (Evidence Architecture §2, ASSESSMENT contract):
    // learner response latency is measured server-side from message
    // timestamps — the one instrument the text channel genuinely provides
    // (foundations/03 §7 availability table). Captured at ingress, before
    // prompt-assembly DB work can contaminate the reading.
    const turnReceivedAt = Date.now()

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
    // Wave 0 Step 4 (Blueprint Phase 3): placement verification state carried across turns
    const snapshotPlacement = (snapshot?.placementVerification && typeof snapshot.placementVerification === 'object')
      ? snapshot.placementVerification as import('@/lib/teaching/placementVerification').PlacementVerificationState
      : null
    const snapshotPendingProbe = (snapshot?.pendingPlacementProbe === 'below' || snapshot?.pendingPlacementProbe === 'at' || snapshot?.pendingPlacementProbe === 'above')
      ? snapshot.pendingPlacementProbe
      : null
    const snapshotLastPrereqGap = typeof snapshot?.lastPrerequisiteGap === 'string' ? snapshot.lastPrerequisiteGap : null
    // P1: cumulative failure counter — incremented on recovery turns and false SIGNALs
    const snapshotSessionFailureCount = typeof snapshot?.sessionFailureCount === 'number' ? snapshot.sessionFailureCount : 0
    // W2-2 (ADR 09): lesson stage progress carried across turns
    const snapshotLessonStageProgress = (
      snapshot?.lessonStageProgress &&
      typeof snapshot.lessonStageProgress === 'object' &&
      typeof (snapshot.lessonStageProgress as Record<string, unknown>).conceptId === 'string'
    ) ? snapshot.lessonStageProgress as {
      conceptId: string; planSignature: string; stageIndex: number; totalStages: number
    } : null

    // CUE (Conversation Understanding Engine, Milestone 1): per-turn
    // observation collector. Branch-scoped engine outputs (misconceptions,
    // visuals) are recorded here at their EXISTING call sites so the single
    // understanding call before the LLM call can read them without
    // re-running any engine or hoisting more locals. Perception only —
    // nothing downstream consumes this yet.
    const cueObservations: import('@/lib/understanding').CueObservations = {}

    const subjectCode = learnSession.subject.slug
    const ebEnabled = isEduBrainEnabled(subjectCode)
    const progressCode = subjectCode

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
    // Explanation Memory / Teaching Action Repository (approved exception to
    // ADR 14's implementation gate) needs the real canonical-KG concept id for
    // this turn, not just the lesson number lessonCtx carries. The KG-backed
    // branch below already computes each synthetic lesson's topicSlug (= KG
    // node slug) to resolve "current lesson" — captured here without changing
    // LessonContext's shape or any existing consumer of it.
    let resolvedConceptId: string | null = null

    // P0 (Explanation Memory routing fix): the canonical Knowledge Graph is
    // the source of truth for concept resolution — it must be consulted
    // FIRST, before the legacy `Curriculum` table, for any subject that has
    // one. Root cause this fixes: english (like c/cpp/python) has legacy
    // Curriculum rows from scripts/seed-curriculum.ts's original 4-subject
    // seed, so the old code order (legacy table checked first, KG only
    // consulted "if lessonCtx === null") NEVER reached KG synthesis for
    // english — resolvedConceptId stayed null on every single turn, and the
    // Explanation Memory gate below (`resolvedConceptId && ...`) was
    // permanently false regardless of how many assets were authored. c/cpp/
    // python have no canonical KG (getKnowledgeGraph returns null for them —
    // confirmed via SUBJECT_ADAPTERS/resolveNodes), so this reordering is a
    // no-op for them: they fall through to the legacy-table branch exactly
    // as before, unchanged.
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
          resolvedConceptId = currentLesson.topicSlug
        }
      }
    } catch {
      // KG synthesis is optional — never blocks the lesson
    }

    if (lessonCtx === null && curriculumLessons.length > 0) {
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

    const teachingLang = (profile?.teachingLanguage ?? 'en') as 'ru' | 'en' | 'hi'
    const profileCountry = (profile as any)?.country ?? 'global'
    // Route to YandexGPT whenever EITHER signal says Russian — country alone
    // can silently disagree with teachingLanguage (e.g. legacy profiles from
    // before the country field existed), which used to skip Yandex entirely.
    const country = teachingLang === 'ru' ? 'ru' : profileCountry
    // Drives NOTATION RULES in buildTutorSystemPrompt (IPA/phonetic notation
    // gating) — derived only from level/grade, never from subject, so it
    // applies uniformly whether the student is doing English phonics, math,
    // or anything else.
    const contentRegister = resolveContentRegister({
      grade: profile?.grade,
      currentLevel: profile?.currentLevel,
      targetLevel: (profile as any)?.targetLevel,
    })
    let systemPrompt = buildTutorSystemPrompt(
      learnSession.subject.name,
      profile?.displayName ?? session.user.name ?? 'Student',
      profile?.selfDescription ?? 'level unknown',
      profile?.learningGoals ?? profile?.selfDescription ?? 'general learning',
      memoryContext,
      teachingLang,
      lessonCtx,
      learnSession.subject.type,
      contentRegister,
    )

    // W2-1 (ADR 08 §4a): Library-mode concept tracking — hoisted for post-AI persist.
    let libraryConceptNodeIdHoisted: string | null = null
    // Visualization Registry Phase 2: server-authoritative visual attachment.
    // availableVisualHoisted is the registry/detectVisual match computed
    // pre-LLM; forceVisualRenderHoisted is set true only for an explicit
    // learner diagram/visualize request. When true, the post-AI block
    // attaches availableVisualHoisted to the response REGARDLESS of
    // whether the LLM emitted the VISUAL:<type> tag in its text — the
    // same server-authoritative pattern masteryGate.ts uses for lesson
    // completion. This closes the "AI describes a diagram that already
    // exists instead of rendering it" gap: the tag becomes advisory only
    // (still parsed/preferred when present), never the sole path to render.
    let availableVisualHoisted: string | null = null
    let forceVisualRenderHoisted = false
    // Library Mode duplication cleanup: this used to be set from
    // spacedRevision.ts's per-turn revision block (removed — see the
    // Library-mode teaching-strategy section below). The session OPENING's
    // review-first enforcement is fed directly by the Spaced Retrieval
    // Scheduler instead (its own local variable, computed at session
    // opening only). This stays declared, always 0 for Library Mode now,
    // only because the Kernel shadow pipeline still reads it below as an
    // observation-only field with no effect on the served response.
    let libraryDueRevisionCountHoisted = 0
    let libraryLessonPlanHoisted: import('@/lib/school/adaptive/lessonPlanner').LessonPlan | null = null
    // W2-2 (ADR 09): lesson stage progress — hoisted for post-AI tag-parse + persist.
    let lessonStageProgressHoisted: { conceptId: string; planSignature: string; stageIndex: number; totalStages: number } | null = null
    // Teaching Strategy Engine (docs/TEACHING_ENGINE_SPEC.md): surface the per-turn
    // strategy + its advisory output bias out of the school block so the post-AI
    // visual pipeline can consult them. Null on any non-school turn or failure →
    // pipeline degrades to today's behavior.
    let strategyHoisted: import('@/lib/school/adaptive/teachingStrategy').TeachingStrategyType | null = null
    let outputBiasHoisted: import('@/lib/school/adaptive/teachingOutputBias').OutputBias | null = null
    let hintBiasHoisted: import('@/lib/school/adaptive/teachingOutputBias').HintBiasKind | null = null
    // ADR 02 (docs/architecture/ADR_02_GENERAL_LEARNER_DIAGNOSTIC_LAYER.md): the
    // topicSlug the strategy-effectiveness log was actually written under this
    // turn — the current module's slug. Must match whatever was passed as
    // `chapterId` into getTeachingStrategy() below, or the staleMate feedback
    // loop silently reads back zero events forever.
    let strategyTopicSlugHoisted: string | null = null
    // Sprint W gap A: the structured [HINT] tag's extracted text, hoisted so
    // it can be attached to the JSON response once cleanText is finalized.
    let hintHoisted: string | null = null
    let teachingHistoryHoisted: import('@/lib/teaching/teachingHistory').TeachingHistory | null = null
    let selectedStrategyHoisted: number | null = null
    let retrievalCacheHoisted: import('@/lib/teaching/retrievalCache').RetrievalCache | null = null
    let conversationDecisionHoisted: import('@/lib/teaching/conversationDecision').ConversationDecision | null = null

    // Visual learning aids for SUBJECT_LIBRARY subjects — Sprint BW
    // detectVisual()/buildVisualsSystemBlock(), scoped to the Library lesson's
    // own unit/lesson titles. Purely additive; never blocks a lesson.
    try {
      const { detectVisual, buildVisualsSystemBlock } = await import('@/lib/school/visuals/detectVisual')
      const availableVisual = detectVisual({
        subjectSlug: subjectCode,
        chapterTitle: lessonCtx?.unitTitle ?? '',
        lessonTitle: lessonCtx?.lessonTitle,
      })
      cueObservations.availableVisual = availableVisual
      cueObservations.visualDetectionRan = true
      const visualBlock = buildVisualsSystemBlock(availableVisual)
      if (visualBlock) systemPrompt += visualBlock
    } catch (err) {
      console.warn('[learn/chat] library visual aids context skipped:', err)
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
      if (librarySubject && ebEnabled) {
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
    if (ebEnabled) {
      try {
        const { findLibrarySubject } = await import('@/lib/curriculum/subjectCatalog')
        const libSubject = findLibrarySubject(subjectCode)
        if (libSubject) {
          const lessonSlugs = libSubject.modules.flatMap((m) => m.nodes.map((n) => n.slug))
          const { detectMisconceptions, buildMisconceptionBlock, buildRemediationStrategy } = await import('@/lib/school/adaptive/misconceptionEngine')
          const misconceptions = await detectMisconceptions(userId, subjectCode, lessonSlugs, '')
          cueObservations.misconceptions = misconceptions
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

    // ADR 02 (docs/architecture/ADR_02_GENERAL_LEARNER_DIAGNOSTIC_LAYER.md):
    // unified teaching strategy for SUBJECT_LIBRARY subjects. getTeachingStrategy()
    // synthesizes mastery, misconception confidence, concept transfer, confidence
    // calibration, momentum, and strategy-effectiveness (staleMate) into one of 7
    // strategies. Its board/grade params are accepted but verified unused by every
    // signal it reads (see the ADR's evidence table), so '' / 0 placeholders are
    // safe. The current module's slug stands in for chapterId and its node slugs
    // for kgNodeIds — the same substitution the misconception block above uses.
    // Also sets strategyHoisted/outputBiasHoisted/hintBiasHoisted so the existing
    // post-AI visual-suppression and [HINT] tag pipeline activates for
    // general learners too, not just the prompt text.
    if (ebEnabled) {
      try {
        const { findLibrarySubject } = await import('@/lib/curriculum/subjectCatalog')
        const libSubject = findLibrarySubject(subjectCode)
        if (libSubject) {
          const progressRows = await prisma.moduleProgress.findMany({
            where: { userId: session.user.id, subjectId: learnSession.subjectId },
          })
          const bySlug = new Map(progressRows.map((p) => [p.moduleSlug, p]))
          const currentModule = libSubject.modules.find((m) => {
            const st = bySlug.get(m.slug)?.status
            return st === 'AVAILABLE' || st === 'IN_PROGRESS'
          }) ?? libSubject.modules[0]

          if (currentModule) {
            const moduleNodeSlugs = currentModule.nodes.map((n) => n.slug)
            const { getTeachingStrategy, buildTeachingStrategyBlock } = await import('@/lib/school/adaptive/teachingStrategy')
            // Phase B (2026-07-14): beginner evidence from data already in hand
            // (plus one cheap count) so an unknown/struggling learner defaults to
            // FOUNDATION_REBUILD instead of APPLICATION_FOCUS. Every field
            // degrades to a no-signal value on error — never blocks the turn.
            const recoveryMistakeCount = await prisma.mistakeRecord.count({
              where: {
                userId, subjectSlug: subjectCode, category: 'recovery_signal',
                createdAt: { gte: new Date(Date.now() - 7 * 86400000) },
              },
            }).catch(() => 0)
            const snapLastSignal = (snapshot?.lastSignal && typeof snapshot.lastSignal === 'object')
              ? snapshot.lastSignal as { correctness?: boolean }
              : null
            const teachingStrategy = await getTeachingStrategy(
              userId, '', 0, subjectCode, currentModule.slug, moduleNodeSlugs,
              {
                profileLevel: profile?.currentLevel ?? null,
                sessionFailureCount: snapshotSessionFailureCount,
                recoveryMistakeCount,
                lastSignalIncorrect: snapLastSignal?.correctness === false,
                hasPrerequisiteGap: snapshotLastPrereqGap !== null,
              },
            )
            systemPrompt += buildTeachingStrategyBlock(teachingStrategy)

            const { deriveOutputBias, deriveHintBias } = await import('@/lib/school/adaptive/teachingOutputBias')
            strategyHoisted = teachingStrategy.type
            strategyTopicSlugHoisted = currentModule.slug
            outputBiasHoisted = deriveOutputBias(teachingStrategy.type)
            hintBiasHoisted = deriveHintBias(teachingStrategy.type)
            if (hintBiasHoisted === 'PREFERRED') {
              systemPrompt += `\n\nHINT TAG: If the student seems stuck or has gotten this same question wrong 2 or more times in this conversation, do NOT give away the full answer. Instead, end your response with a single short, specific hint wrapped exactly like this on its own line: [HINT]your hint text here[/HINT]\nHINT POLICY: a hint must reveal the MISSING CONCEPT, never the next calculation step, and must always be EASIER than the problem itself. Good: "Before measuring the shortcut, picture walking along the two sides of the street corner." Bad: "Use Pythagoras" / "Find the square root". If the student is missing the underlying concept, or cannot do the calculation the hint would require, do not hint at all — teach that missing piece plainly in your response and omit the tag.`
            } else if (hintBiasHoisted === 'SUPPRESSED') {
              systemPrompt += `\n\nDo not use a [HINT] tag this turn — explain directly and clearly instead, per this strategy's directive.`
            }

            // Library Mode duplication cleanup: spacedRevision.ts's
            // getDueRevisions/buildRevisionBlock used to inject its own
            // "DUE FOR REVIEW" block here on every Library turn, which
            // could co-fire with sessionLifecycle.ts's session-opening
            // due-review instruction (fed by the Spaced Retrieval
            // Scheduler) and produce contradictory prompts on the same
            // turn (one instructs "Can you tell me what you remember
            // about [concept]?", the other explicitly forbids that exact
            // phrasing). Removed — the Spaced Retrieval Scheduler
            // (spacedRetrievalScheduler.ts, wired at session opening
            // below) is now the ONLY review system for Library Mode.
            // School Mode's own spacedRevision.ts call sites (chapter-level
            // getDueRevisions + advanceRevision) are untouched and remain
            // fully intact — this removal is scoped to Library Mode only.
            // libraryDueRevisionCountHoisted therefore stays at its default
            // (0) for Library Mode turns; it is still read by the Kernel
            // shadow pipeline below (observation-only, no effect on the
            // served response) and left in place rather than threading a
            // second variable through for a non-serving consumer.

            // W2-1 (ADR 08 §4a): seed conceptId for Library mode — canonical KG entry concept if
            // no snapshot yet. Resolves moduleSlug → KG domain → cross-domain entry concept ID
            // so the Teaching Engine gate (snapshotCurrentConceptId → getConceptNode) can fire.
            // Wave 0 Step 5 (Blueprint Phase 5): DEFAULTS ON — decide() now
            // fires for Library mode; set ENABLE_LIBRARY_CONCEPT_TRACKING=0 to revert.
            if (process.env.ENABLE_LIBRARY_CONCEPT_TRACKING !== '0') {
              const { resolveLibraryEntryConceptId } = await import('@/lib/curriculum/libraryConceptResolver')
              libraryConceptNodeIdHoisted = snapshotCurrentConceptId
                ?? resolveLibraryEntryConceptId(subjectCode, currentModule.slug)
                ?? null
            }
          }
        }
      } catch (err) {
        console.warn('[learn/chat] library teaching strategy context skipped:', err)
      }
    }

    // ADR 02 follow-up #1 (docs/architecture/ADR_02_GENERAL_LEARNER_DIAGNOSTIC_LAYER.md
    // §7): lesson plan for SUBJECT_LIBRARY subjects. buildLessonPlan() only reads
    // `.id`/`.title` off each KnowledgeNode (confirmed by reading its full body —
    // it never touches `.domain`/`.description`/`.estimated_hours`), so a
    // CurriculumNode (`slug`, `title`, optional `difficulty`/`prerequisites`) maps
    // onto it with a trivial field rename — no real KnowledgeNode[] shape work
    // needed for this function specifically. `detectPrerequisiteGap()` in the same
    // follow-up item was investigated and NOT wired here: it resolves prerequisite
    // ids through a module-scope-global `KG_BY_ID = new Map(ALL_KG_NODES...)`
    // (prerequisiteRecovery.ts:40), which only contains canonical school KG node
    // ids. Library prerequisite slugs live in a different namespace, so every
    // lookup would silently miss and the function would always return null — not
    // a crash, but a permanently-dead block. Fixing that needs a signature change
    // (accepting a caller-supplied node map) that risks the school path's existing
    // cross-chapter prerequisite lookups, so it's deferred rather than rushed.
    //
    // chapterId/kgNodeIds substitution mirrors the teaching-strategy block above
    // (current module slug, its node slugs). topicProgress reads already work
    // (topicSlug is written identically for school and Library elsewhere in this
    // route — see the conversational-checkpoint TopicProgress upsert above).
    // learningCheckpoint reads always return empty for Library turns (that table's
    // `board`/`grade` columns are required and, with School Mode removed,
    // nothing ever writes them anymore), and practiceSession reads return
    // empty too (the generic /api/practice/submit route never sets
    // `chapterId`) — both degrade to safe defaults (recommendedCheckpoint/
    // recommendedPractice fall back to true) rather than breaking, the same
    // kind of partial-signal tradeoff ADR 02 already accepted for spaced
    // revision. Snapshot persistence of currentConceptNodeId is intentionally
    // NOT extended here — kept to the single prompt-injection block,
    // consistent with ADR 02 §3's "smaller surface area for a first
    // increment" rationale.
    if (ebEnabled) {
      try {
        const { findLibrarySubject } = await import('@/lib/curriculum/subjectCatalog')
        const libSubject = findLibrarySubject(subjectCode)
        if (libSubject) {
          const progressRows = await prisma.moduleProgress.findMany({
            where: { userId: session.user.id, subjectId: learnSession.subjectId },
          })
          const bySlug = new Map(progressRows.map((p) => [p.moduleSlug, p]))
          const currentModule = libSubject.modules.find((m) => {
            const st = bySlug.get(m.slug)?.status
            return st === 'AVAILABLE' || st === 'IN_PROGRESS'
          }) ?? libSubject.modules[0]

          if (currentModule) {
            const { resolveLibraryDomainNodes } = await import('@/lib/curriculum/libraryConceptResolver')
            const kgDomainNodes = resolveLibraryDomainNodes(subjectCode, currentModule.slug)
            const planNodes = kgDomainNodes ?? currentModule.nodes.map((n) => ({
              id: n.slug,
              domain: subjectCode,
              title: n.title,
              description: '',
              difficulty: n.difficulty ?? 'developing',
              prerequisites: n.prerequisites ?? [],
            }))
            const { buildLessonPlan, buildLessonPlanBlock } = await import('@/lib/school/adaptive/lessonPlanner')
            const plan = await buildLessonPlan(userId, subjectCode, currentModule.slug, currentModule.title, planNodes)
            const planBlock = buildLessonPlanBlock(plan)
            if (planBlock) systemPrompt += planBlock
            // W2-1 (ADR 08 §4a): hoist for post-AI persist.
            // Wave 0 Step 5: defaults on (see the tracking gate above).
            if (process.env.ENABLE_LIBRARY_CONCEPT_TRACKING !== '0') {
              libraryLessonPlanHoisted = plan
            }
          }
        }
      } catch (err) {
        console.warn('[learn/chat] library lesson plan context skipped:', err)
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
        // Assessment gate (2026-07-14 teaching-quality Phase A.4): a formal
        // 3-question exam is examiner behaviour, not teaching — never offer it
        // to a beginner, or to anyone already struggling this session
        // (sessionFailureCount, P1). The protocol text is REPLACED (not merely
        // omitted) so an explicit "test me" from a struggling learner gets a
        // teaching-shaped answer instead of an improvised exam.
        const assessmentSuppressed =
          profile?.currentLevel === 'beginner' || snapshotSessionFailureCount >= 2
        if (assessmentSuppressed) {
          systemPrompt += `\n\nASSESSMENT GATE: Do NOT run a formal multi-question assessment in this session, even if the learner asks to be tested. This learner needs teaching first. If they ask to be assessed, weave ONE Stage 1–2 question (observation or recognition — see the QUESTION STAGE POLICY) into your teaching, react warmly to whatever they answer, and continue teaching. Never emit an [ASSESSMENT_RESULT ...] tag this session.`
        } else try {
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

    // Teaching Engine (A3 + Phase 2C): call decide() with real learner memory.
    // readLearnerMemoryFromPreload() reuses the already-fetched parallel query
    // data (topicProgress, learningProfile, subjectAnalytics) and only fetches
    // the supplemental data (recentMistakes, retentionMetrics, session count).
    try {
      // Red-team fix D4 (Blueprint Phase 5 / ADR 08 §4a): the FIRST Library
      // turn of a session has no snapshot concept yet, but the entry concept
      // was already resolved earlier this request (libraryConceptNodeIdHoisted)
      // — use it, so no Library turn bypasses decide().
      const activeConceptIdForDecide = snapshotCurrentConceptId ?? libraryConceptNodeIdHoisted
      if (activeConceptIdForDecide) {
        const { createSubjectAdapter } = await import('@/lib/curriculum/subjectKgAdapter')
        const conceptNode = createSubjectAdapter(subjectCode).getConceptNode(activeConceptIdForDecide)
        if (conceptNode) {
          // Canonical authored-content serving path note (see
          // EDUCATIONAL_BRAIN_BIBLE.md §6.3): Explanation Memory
          // (`assembleLesson()`, ~140 lines down) is the canonical serving
          // path — it decides whether to skip the LLM call entirely for
          // this turn. The Package Runtime PoC's route-level wiring
          // (`buildLessonContextForConcept`, flag-gated behind
          // ENABLE_PACKAGE_RUNTIME) has been removed here: it was
          // prompt-context augmentation only, never activated in any
          // environment, and its removal is a zero-behavior-change
          // cleanup — the legacy blueprint loader below already ran
          // unconditionally in every real deployment since that flag
          // defaulted off. Package Runtime's own module, tests, compiler,
          // and compiled artifacts are untouched; only this now-obsolete
          // call site was removed.

          // Phase 1C/1D: Blueprint Retrieval + Content Injection.
          // Resolves Teaching Blueprint metadata and injects Concept Spine,
          // Misconception Library, and Explanation Library into the system
          // prompt. Supports all four blueprint formats (Component A,
          // Protocol B, Section C, Spine D). Non-fatal — a missing or
          // unparseable blueprint never blocks the Teaching Engine.
          try {
            const { loadBlueprint, loadBlueprintContent, buildBlueprintContextBlock, loadEBConceptContext } = await import('@/lib/curriculum/blueprintLoader')
            const { createRetrievalCache, CACHE_KEY_BLUEPRINT_SUMMARY, CACHE_KEY_EB_CONTEXT } = await import('@/lib/teaching/retrievalCache')
            if (!retrievalCacheHoisted) retrievalCacheHoisted = createRetrievalCache()
            const blueprintResult = loadBlueprint(activeConceptIdForDecide)
            if (blueprintResult.found) {
              const contentResult = loadBlueprintContent(activeConceptIdForDecide)
              if (contentResult.found) {
                const bpParts: string[] = []
                if (contentResult.content.conceptSpine) {
                  bpParts.push(contentResult.content.conceptSpine.definition ?? '')
                }
                if (contentResult.content.misconceptions.length) {
                  bpParts.push('Misconceptions: ' + contentResult.content.misconceptions.map(m => m.title).join('; '))
                }
                const bpSummary = bpParts.filter(Boolean).join(' | ').slice(0, 300)
                if (bpSummary) retrievalCacheHoisted.set(CACHE_KEY_BLUEPRINT_SUMMARY, bpSummary)
                const ebResult = loadEBConceptContext(activeConceptIdForDecide)
                const ebContext = ebResult.found ? ebResult.context : null
                if (ebContext) {
                  retrievalCacheHoisted.set(CACHE_KEY_EB_CONTEXT, {
                    recoveryNotes: ebContext.recoveryShrinkTo,
                    misconceptions: ebContext.antiAnalogies,
                  })
                }
                const block = buildBlueprintContextBlock(contentResult.content, ebContext)
                if (block) systemPrompt += block
              }
            }
          } catch {
            // non-fatal — blueprint context is purely additive
          }

          const { readLearnerMemoryFromPreload, toTeachingSnapshot } = await import('@/lib/memory')
          const memory = await readLearnerMemoryFromPreload(
            userId,
            subjectCode,
            learnSession.subjectId,
            {
              topicProgress: topicProgressRowsShared as Array<{
                topicSlug: string; status: string; masteryPct: number
                attempts: number; lastScore: number | null; updatedAt: Date
              }>,
              learningProfile: learningProfileShared as {
                confidenceLevel?: number; learningPace?: string; preferredLearningStyle?: string
              } | null,
              subjectAnalytics: subjectAnalyticsShared as {
                trend?: string; weakTopics?: string[]; strongTopics?: string[]; progressPercent?: number
              } | null,
            },
            { sessionId: learnSession.id },
          )
          const snapshot = toTeachingSnapshot(memory)

          // W2-3 (ADR 10 Phase 2b): read ConceptMasteryRecord for the active concept.
          // DB read runs BEFORE decide() so the Teaching Engine stays pure — it only
          // sees its inputs, never touches the DB itself. Snapshot is immutable after
          // this block; no write path is introduced here.
          let conceptMasterySnapshot: {
            masteryScore: number; decayedScore: number
            masteryLevel: string; masteryConfidence: number
          } | null = null
          if (process.env.ENABLE_CONCEPT_MASTERY_READ === '1') {
            try {
              const cmr = await prisma.conceptMasteryRecord.findUnique({
                where: { userId_conceptId: { userId, conceptId: activeConceptIdForDecide } },
                select: { masteryScore: true, decayedScore: true, masteryLevel: true, masteryConfidence: true },
              })
              if (cmr) conceptMasterySnapshot = cmr
            } catch { /* non-fatal: ConceptMasteryRecord may not exist yet; degrade to existing behavior */ }
          }

          const decision = decide(
            {
              level: snapshot.trackLevel,
              current_concepts_mastered: snapshot.masteredConcepts,
              // W2-3: if CMR indicates current concept has decayed below mastery threshold,
              // ensure it appears in weak_concepts for this turn's Teaching Engine decision.
              weak_concepts: conceptMasterySnapshot !== null && conceptMasterySnapshot.decayedScore < 0.7
                ? [...new Set([...snapshot.weakConcepts, activeConceptIdForDecide])]
                : snapshot.weakConcepts,
              misconceptions: snapshot.misconceptions,
              // W2-3: use CMR decayedScore (0–1) as retention signal when available —
              // more accurate than the static confidenceLevel from LearningProfile.
              retention_score: conceptMasterySnapshot !== null
                ? Math.round(conceptMasterySnapshot.decayedScore * 100)
                : snapshot.retentionScore,
              learning_speed: snapshot.learningSpeed,
              fatigue_level: snapshot.fatigueLevel,
            },
            conceptNode,
            {
              recently_attempted: snapshot.recentlyAttempted,
              success_rate: snapshot.successRate,
              time_on_task: snapshot.timeOnTask,
              error_patterns: snapshot.errorPatterns,
            },
          )
          // Milestone 6 (Brain owns decisions): when the Brain runtime is ON,
          // the Brain's execution block (appended before the LLM call) is the
          // prompt's single decision authority — decide() still RUNS (its
          // snapshot and visual outputs are consumed elsewhere), but its
          // instruction block, the LAST-ANSWER READ overlay (both grid reads
          // now live in the Decision Engine: D2b confident-wrong / D5
          // hesitant-correct), and the per-action procedure block are not
          // injected. Flag OFF: everything injected exactly as before.
          const { legacyDecisionBlocksSuppressed } = await import('@/lib/understanding/dispatcher')
          const brainOwnsDecisionBlocks = legacyDecisionBlocksSuppressed()
          if (!brainOwnsDecisionBlocks) {
            const modeNote = decision.mode === 'remediate'
              ? ' — address prerequisite gaps before new material'
              : decision.mode === 'reinforce'
                ? ' — strengthen retention via spaced practice'
                : decision.mode === 'accelerate'
                  ? ' — reduce scaffolding, move faster'
                  : ' — direct instruction'
            systemPrompt += `\n\nTEACHING ENGINE DECISION — follow this strategy this turn:\n- Goal: ${decision.goal}\n- Mode: ${decision.mode}${modeNote}\n- Action: ${decision.action_type.replace(/_/g, ' ').toLowerCase()}\n- Difficulty: ${decision.difficulty}\n- Target session: ${decision.estimated_time} min`

            // CTO iteration — the D1 grid read (foundations/02 §1), previously
            // invisible to the decision layer: the previous turn's captured
            // signal classifies the learner's last answer into the grid's
            // quadrants, and the two quadrants that change the next move are
            // stated deterministically (decision-matrix/03 cells, retrieved
            // not improvised). decide()'s frozen signature has no
            // speed/confidence input (its documented gap, foundations/02 §5)
            // — this overlay supplies exactly that read without touching the
            // frozen engine.
            // NOTE: `snapshot` here is the TeachingMemorySnapshot (shadowed) —
            // the session contextSnapshot is read via learnSession directly.
            const sessionSnap = learnSession.contextSnapshot as Record<string, unknown> | null
            const prevSignal = (sessionSnap?.lastSignal && typeof sessionSnap.lastSignal === 'object')
              ? sessionSnap.lastSignal as { correctness?: boolean; confidence?: string }
              : undefined
            if (prevSignal?.correctness === false && prevSignal?.confidence === 'high') {
              systemPrompt += `\n- LAST-ANSWER READ (fast-wrong — misconception signature, the grid's dangerous quadrant): do NOT spot-correct and move on. Elicit their reasoning, get them to commit to it, then present one concrete case where their rule visibly breaks — repair before any new content.`
            } else if (prevSignal?.correctness === true && prevSignal?.confidence === 'low') {
              systemPrompt += `\n- LAST-ANSWER READ (hesitant-correct — FRAGILE): do not advance yet. One more problem of the SAME type and difficulty now; advance only after a fluent, confident success. If this one is quicker, say so ("that one was quicker — feel it?").`
            }

            // Wave 1 (Runtime Guardian): the authored HOW for the action
            // decide() just selected — retrieved from the Brain's action
            // catalog / repair sequence instead of improvised per turn.
            {
              const { buildActionProcedureBlock } = await import('@/lib/teaching/actionProcedures')
              systemPrompt += buildActionProcedureBlock(decision.action_type)
            }
          }

          // Phase 2F (Teaching Action Intelligence): advisory only — does NOT
          // override decide()'s action_type (the frozen Teaching Engine has no
          // input slot for review-due topics). Surfaces snapshot.dueForReview
          // (computed in Phase 2D, previously unused by any consumer) as a
          // secondary instruction the tutor can fold in opportunistically.
          // Computed unconditionally (both modes) because the Dynamic Lesson
          // Composer below also consumes it as reviewDueConceptIds — for
          // School Mode AND Library Mode alike (ADR 09). In practice it is
          // always empty for Library Mode: snapshot.dueForReview is sourced
          // from the ReviewSchedule table, written exclusively by
          // /api/school/practice/submit and /api/school/assessment/submit —
          // no Library-mode path ever populates it.
          // Legacy ReviewSchedule-based due-review advisory was School-Mode-only
          // (Task 3 fix) and has been removed with School Mode. Library Mode's
          // own due-review signal is the Spaced Retrieval Scheduler's
          // session-opening block (buildOpeningBlock, evidence-derived, wired
          // in sessionLifecycle.ts).
          const reviewDue = snapshot.dueForReview.filter((slug) => slug !== conceptNode.id).slice(0, 3)

          // Phase 3A: Teaching Action Generator + Phase 3B: Dynamic Lesson Composer.
          // Runs for School Mode (real chapter) and Library Mode (synthetic chapter
          // scoped to the single active KG concept — board/grade are unused by both
          // functions, confirmed ADR 02). Advisory only; never overrides decide().
          try {
            const { getTeachingAction, buildTeachingActionBlock } = await import('@/lib/school/adaptive/teachingActionGenerator')

            // Synthetic chapter — one concept, no board/grade coupling.
            const boardForTAG = ''
            const gradeForTAG = 0
            const chapterTitleForTAG = conceptNode.name ?? conceptNode.id
            const chapterForTAG: { id: string; order: number; title: string; kgNodeIds: string[] } = {
              id: conceptNode.id,
              order: 1,
              title: conceptNode.name ?? conceptNode.id,
              kgNodeIds: [conceptNode.id],
            }

            if (chapterForTAG) {
              const teachingAction = await getTeachingAction(decision, conceptNode, {
                userId,
                board: boardForTAG,
                grade: gradeForTAG,
                subjectId: learnSession.subjectId,
                subjectSlug: subjectCode,
                chapterTitle: chapterTitleForTAG,
                chapter: chapterForTAG,
                weakConcepts: snapshot.weakConcepts,
                misconceptions: snapshot.misconceptions,
              })
              // P0 (Brain single-authority fix): Teaching Action Generator is a
              // decision VOICE in the prompt (its block states WHAT/HOW to
              // teach, independent of the Brain). Once the Brain owns decision
              // blocks, it must not compete — same suppression pattern already
              // applied to decide()'s own blocks above.
              if (!brainOwnsDecisionBlocks) {
                systemPrompt += buildTeachingActionBlock(teachingAction)
              }

              // Phase 3B: Dynamic Lesson Composer.
              try {
                const { getLessonPlan, buildLessonPlanBlock } = await import('@/lib/school/adaptive/lessonComposer')
                const lessonPlan = await getLessonPlan(decision, teachingAction, conceptNode, {
                  userId,
                  board: boardForTAG,
                  grade: gradeForTAG,
                  subjectId: learnSession.subjectId,
                  subjectSlug: subjectCode,
                  chapter: chapterForTAG,
                  activeMisconceptions: snapshot.misconceptions,
                  reviewDueConceptIds: reviewDue,
                })
                // W2-2 (ADR 09): stage-continuity framing.
                if (process.env.ENABLE_LESSON_STAGE_CONTINUITY === '1') {
                  const planSignature = lessonPlan.stages.map(s => s.stage_type).join('|')
                  const signatureMatches =
                    snapshotLessonStageProgress !== null &&
                    snapshotLessonStageProgress.conceptId === lessonPlan.concept_id &&
                    snapshotLessonStageProgress.planSignature === planSignature &&
                    snapshotLessonStageProgress.stageIndex < lessonPlan.stages.length
                  const resumeStageIndex = signatureMatches ? snapshotLessonStageProgress!.stageIndex : 0
                  lessonStageProgressHoisted = {
                    conceptId: lessonPlan.concept_id,
                    planSignature,
                    stageIndex: resumeStageIndex,
                    totalStages: lessonPlan.stages.length,
                  }
                  // NOTE: unlike buildTeachingActionBlock above, this block is
                  // NOT suppressed when the Brain owns decisions — the Brain
                  // (CUE/Decision Engine) does not run until later in this
                  // route, so which decision it will reach this turn is not
                  // yet known here; CONTINUE_LESSON's own Brain execution
                  // directive ("where the lesson plan above left off",
                  // execution.ts RENDER_ROLES) depends on this block still
                  // being present whenever that decision fires. Left
                  // unconditional (unchanged) rather than risk a dangling
                  // Brain directive with nothing to point at.
                  systemPrompt += buildLessonPlanBlock(lessonPlan, {
                    stageIndex: resumeStageIndex,
                    totalStages: lessonPlan.stages.length,
                  })
                } else {
                  systemPrompt += buildLessonPlanBlock(lessonPlan)
                }
              } catch {
                // non-fatal — lesson plan context is purely additive
              }
            }
          } catch {
            // non-fatal — teaching action context is purely additive
          }
        }
      }
    } catch (err) {
      console.warn('[learn/chat] teaching engine skipped:', err)
    }

    // ─── Wave 0 Steps 2–4: Educational Brain deterministic blocks ───────────
    // Library mode only (School Mode walks a board-prescribed sequence and
    // has its own checkpoint evidence pipeline). Injected AFTER all advisory
    // blocks so mandatory rules read last. Every block cites its Brain source.
    let placementProbeActive = false
    let placementLevelHoisted: 'intermediate' | 'advanced' | null = null
    let placementAskedProbeHoisted: 'below' | 'at' | 'above' | null = null
    // Red-team fix D3: placement state inherited across sessions (see below)
    let placementPrevHoisted: import('@/lib/teaching/placementVerification').PlacementVerificationState | null = snapshotPlacement
    let placementInheritedHoisted = false
    // Red-team fix D1: first-lesson turns must never be served from the
    // asset memory path (a static explanation+probe assembly cannot honor
    // first-lesson/04 §1's flow or 02 §1's never-quiz-first rule).
    let firstLessonActiveHoisted = false
    // CTO iteration (session lifecycle — decision-engine/07 §1/§6/§8):
    // the episode state machine that makes per-session rules enforceable.
    let sessionEpisodeHoisted: import('@/lib/teaching/sessionLifecycle').SessionEpisode | null = null
    let sessionEpisodeFreshHoisted = false
    // CTO iteration (recovery guard — decision-engine/03 §0 preemption):
    // a failure-state utterance in the learner's message is detected
    // deterministically (Principle 20: stated state is ground truth) and
    // preempts calibration, assessment, and the asset memory path this turn.
    let recoveryKeyHoisted: import('@/lib/teaching/recoveryGuard').FailureStateKey | null = null
    // Phases C–G (2026-07-14): server-side conversation state machine —
    // read pre-LLM (drives the TURN DIRECTIVE), folded post-AI with this
    // turn's evidence, persisted on the existing snapshot ride.
    let conversationStateHoisted: import('@/lib/teaching/conversationState').ConversationState | null = null
    // EOS M1 (Evidence Spine): decision facts hoisted for the parallel spine
    // emitter — observation only, zero effect on the turn.
    let evidenceMoveHoisted: string | null = null
    let evidenceStageCeilingHoisted: number | null = null
    let evidenceWorkedExampleFirstHoisted = false
    let evidenceAutonomyHoisted = false
    // Mastery gate (server-authoritative lesson completion):
    // - masteryGatePendingHoisted: the learner asked to advance before
    //   mastery — the client renders Continue Learning / Skip Anyway.
    // - learnerRequestHoisted: deterministic diagram/example/explain-
    //   differently request detected this turn (forced TeachingAction +
    //   post-turn student-state fold).
    // - conversationStateAfterTurnHoisted: the state folded ONCE with this
    //   turn's evidence — used by the completion gate, the response's
    //   mastery summary, AND the snapshot persist (never folded twice).
    let masteryGatePendingHoisted = false
    let learnerRequestHoisted: import('@/lib/teaching/masteryGate').LearnerRequest | null = null
    let conversationStateAfterTurnHoisted: import('@/lib/teaching/conversationState').ConversationState | null = null
    let masteryCompletionSuppressedHoisted = false
    // Stance Enforcement (Claude Recommendation #6) — violations found on
    // this turn by enforceStance(), for provenance/telemetry only; never
    // used to rewrite prose (see stanceEnforcement.ts's module doc).
    let stanceViolationsHoisted: import('@/lib/teaching/stanceEnforcement').StanceViolationCode[] = []
    {
      try {
        const { detectFailureState } = await import('@/lib/teaching/recoveryGuard')
        // P0-3: the learner's immediately preceding message (already loaded,
        // newest-first, predates this turn's insert) — enables the repeated-
        // identical-answer frustration check. Optional param; every other
        // call site (School Mode, EOS kernel) is unaffected.
        const priorUserMessage = learnSession.messages.find((m) => m.role === MessageRole.USER)?.content ?? null
        recoveryKeyHoisted = detectFailureState(message, priorUserMessage)
        const { buildSignalInstruction } = await import('@/lib/teaching/signals')
        const { isFirstLessonContext, buildFirstLessonBlock } = await import('@/lib/teaching/firstLessonGuard')
        const { emptyPlacementState, nextProbe, buildPlacementProbeBlock, buildPlacementAwaitBlock } = await import('@/lib/teaching/placementVerification')

        // Step 2: the OBSERVE signal (decision-engine/08 step 1; Blueprint Phase 3)
        systemPrompt += buildSignalInstruction()

        // P0-1 (lesson introduction defect): computed once, ahead of the
        // session-opening block below, so a non-first lesson's OPENING can
        // require an explicit objective/why-it-matters/connection instead of
        // only the first-lesson block covering that ground (lesson one only).
        // Reused verbatim at Step 3 below — no duplicate isFirstLessonContext call.
        const isFirstLessonContextHoisted = isFirstLessonContext({
          isSchoolMode: false,
          currentLevel: profile?.currentLevel,
          currentLessonOrder: lessonCtx?.currentLesson,
          completedLessonCount: studentProgress?.completedLessons?.length ?? 0,
        })

        // Session lifecycle (07 §8): boundary measured from real message
        // timestamps — the newest loaded message predates this turn's user
        // insert, so the gap is genuine learner inactivity, never LLM-claimed.
        {
          const { isNewEpisode, deriveEpisode, buildOpeningBlock, buildAffectCloseBlock } = await import('@/lib/teaching/sessionLifecycle')
          const lastMsgAt = learnSession.messages[0]?.createdAt
            ? new Date(learnSession.messages[0].createdAt).getTime()
            : null
          const prevEpisode = (snapshot?.sessionEpisode && typeof snapshot.sessionEpisode === 'object')
            ? snapshot.sessionEpisode as import('@/lib/teaching/sessionLifecycle').SessionEpisode
            : null
          const prevLastSignal = (snapshot?.lastSignal && typeof snapshot.lastSignal === 'object')
            ? snapshot.lastSignal as { correctness?: boolean }
            : null
          const boundary = isNewEpisode(lastMsgAt, turnReceivedAt)
          sessionEpisodeHoisted = deriveEpisode(prevEpisode, boundary, turnReceivedAt, prevLastSignal)
          sessionEpisodeFreshHoisted = boundary
          if (boundary) {
            // Spaced Retrieval Scheduler (Claude Recommendation #8, wired in
            // here per the follow-up recommendation): the session OPENING's
            // due-review count comes from the real forgetting-curve
            // scheduler (scheduleReviews/loadReviewQueue over Student
            // Intelligence). spacedRevision.ts's Library Mode call site
            // (the per-turn interval-ladder nudge that used to run above,
            // in the ADR 02 teaching-strategy section) has since been
            // removed as duplicated/conflicting responsibility — this
            // scheduler is now the ONLY review system for Library Mode.
            // School Mode's spacedRevision.ts call sites are untouched.
            // Fail-safe: a scheduler error never blocks the turn — it just
            // means no due-review nudge this opening.
            let dueReviewCount = 0
            try {
              const { loadReviewQueue } = await import('@/lib/teaching/retrieval/spacedRetrievalScheduler')
              const reviewQueue = await loadReviewQueue(userId, { now: new Date(turnReceivedAt) })
              dueReviewCount = reviewQueue.overdue.length + reviewQueue.dueToday.length
            } catch (err) {
              console.warn('[learn/chat] spaced retrieval scheduler unavailable — no due-review nudge this opening:', err)
            }
            // OPENING (07 §1 + §8 rules 2–3): engineered win first when
            // owed → one-breath continuity → due reviews BEFORE new content.
            systemPrompt += buildOpeningBlock({
              dueReviewCount,
              retroWinOwed: sessionEpisodeHoisted.retroWinOwed,
              isFreshBoundary: true,
              hadPreviousEpisode: prevEpisode !== null || lastMsgAt !== null,
              // P0-1: lesson one's objective/why-it-matters/connection is
              // fully owned by buildFirstLessonBlock (Step 3 below) — never
              // duplicate it here. For lesson 2+, only fire when a lesson
              // identity actually resolved this turn.
              lessonIntro: (!isFirstLessonContextHoisted && lessonCtx) ? {
                lessonTitle: lessonCtx.lessonTitle,
                lessonGoal: lessonCtx.lessonGoal,
                previousLessonTitle: studentProgress?.lastLessonTitle ?? null,
              } : null,
            })
          } else if (sessionEpisodeHoisted.phase === 'CLOSING') {
            // Affect budget spent earlier this session (07 §6): the close
            // instruction holds until a boundary resets the episode.
            systemPrompt += buildAffectCloseBlock()
          }
        }

        // Step 4: placement verification — self-report is a hypothesis
        // (placement/01 §1). Scope: KG-backed subject, intermediate/advanced
        // claim, nothing completed yet, not yet verified (placementVerification.ts
        // header documents why beginners are excluded).
        const level = profile?.currentLevel === 'advanced' ? 'advanced'
          : profile?.currentLevel === 'intermediate' ? 'intermediate' : null
        const nothingCompleted = (studentProgress?.completedLessons?.length ?? 0) === 0

        // Red-team fix D3 (assessment/02 §1: "Placement… runs once, at
        // entry"): contextSnapshot is per-session, so without inheritance a
        // verified learner opening a NEW session before completing a lesson
        // would be re-probed. Inherit a CONCLUDED verification from the
        // learner's most recent other session in this subject. Narrow query:
        // only runs for the unverified-eligible population.
        if (level && nothingCompleted && !placementPrevHoisted) {
          try {
            const prevSession = await prisma.learnSession.findFirst({
              where: { userId, subjectId: learnSession.subjectId, id: { not: sessionId } },
              orderBy: { updatedAt: 'desc' },
              select: { contextSnapshot: true },
            })
            const prevSnap = prevSession?.contextSnapshot as Record<string, unknown> | null
            const prevPlacement = (prevSnap?.placementVerification && typeof prevSnap.placementVerification === 'object')
              ? prevSnap.placementVerification as import('@/lib/teaching/placementVerification').PlacementVerificationState
              : null
            if (prevPlacement?.verified) {
              placementPrevHoisted = prevPlacement
              placementInheritedHoisted = true
            }
          } catch { /* non-fatal — worst case is a redundant (bounded) re-verification */ }
        }

        if (level && resolvedConceptId && nothingCompleted && !(placementPrevHoisted?.verified) && !recoveryKeyHoisted) {
          const state = placementPrevHoisted ?? emptyPlacementState()
          if (snapshotPendingProbe) {
            // A probe question is already in flight — this turn's job is
            // tagging the answer, never stacking a second question
            // (conversation-engine/06 §1 question ceiling).
            systemPrompt += buildPlacementAwaitBlock(snapshotPendingProbe)
            placementProbeActive = true
            placementLevelHoisted = level
          } else {
            const probe = nextProbe(state)
            if (probe && lessonCtx) {
              systemPrompt += buildPlacementProbeBlock(probe, learnSession.subject.name, lessonCtx.lessonTitle)
              placementAskedProbeHoisted = probe
              placementLevelHoisted = level
            }
          }
        }

        // Step 3: deterministic first-lesson protocol (Blueprint Phase 1;
        // first-lesson/02 §2, 04 §1, 07). Last block = overriding rules.
        if (isFirstLessonContextHoisted) {
          systemPrompt += buildFirstLessonBlock(subjectCode)
          firstLessonActiveHoisted = true
        }

        // Phases C–G (2026-07-14): the conversation state machine. The
        // SERVER decides the teaching phase (OBSERVE→…→TRANSFER), whether
        // this turn teaches/shows/asks (Phase E counters), the question-
        // stage ceiling (no OBSERVE→calculation jumps), the response
        // length budget (Phase D — struggle shortens), worked-example-
        // first (Phase F), and whether a visual leads (Phase G). One
        // compact TURN DIRECTIVE carries the decisions; the LLM teaches
        // inside them instead of judging pacing itself.
        //
        // Mastery-gate rework: the state is read FIRST so the autonomy
        // path below can consult mastery evidence, and explicit learner
        // requests (diagram / real-life example / explain differently)
        // are detected deterministically and override the turn's move.
        {
          const {
            readConversationState, decideNextMove, responseBudget,
            buildTurnDirective, decideVisualFirst,
            detectAutonomyRequest, buildAutonomyBlock,
          } = await import('@/lib/teaching/conversationState')
          const {
            masteryVerified, buildMasteryGateBlock,
            detectLearnerRequest, buildLearnerRequestBlock,
            buildUnreadExplanationBlock,
          } = await import('@/lib/teaching/masteryGate')
          const convConceptId = snapshotCurrentConceptId ?? libraryConceptNodeIdHoisted ?? resolvedConceptId ?? null
          conversationStateHoisted = readConversationState(snapshot?.conversationState, convConceptId)

          // P3 — Learner autonomy, now mastery-gated (Bug 4): "next topic"
          // with verified mastery is honored as before; before mastery it
          // becomes an explicit Continue Learning / Skip Anyway choice —
          // the model is FORBIDDEN from emitting [LESSON_COMPLETE] (and the
          // response-side gate strips it regardless). Never a silent skip.
          if (detectAutonomyRequest(message)) {
            evidenceAutonomyHoisted = true
            if (masteryVerified(conversationStateHoisted)) {
              systemPrompt += buildAutonomyBlock()
            } else {
              systemPrompt += buildMasteryGateBlock()
              masteryGatePendingHoisted = true
            }
          }

          const workedExampleFirst =
            snapshotSessionFailureCount >= 2 || strategyHoisted === 'FOUNDATION_REBUILD'
          const nextMove = decideNextMove(conversationStateHoisted, {
            recoveryTurn: recoveryKeyHoisted !== null,
            workedExampleFirst,
          })
          // EOS M1: record the decision facts for the spine (observation only).
          evidenceMoveHoisted = nextMove
          evidenceWorkedExampleFirstHoisted = workedExampleFirst
          const { PHASE_MAX_QUESTION_STAGE } = await import('@/lib/teaching/conversationState')
          evidenceStageCeilingHoisted = PHASE_MAX_QUESTION_STAGE[conversationStateHoisted.phase]
          const { detectVisual } = await import('@/lib/school/visuals/detectVisual')
          const { getConceptVisualType } = await import('@/lib/teaching/visualRegistry')
          const registryVisual = getConceptVisualType(convConceptId)
          const availableVisual = registryVisual ?? detectVisual({
            subjectSlug: subjectCode,
            chapterTitle: lessonCtx?.unitTitle ?? '',
            lessonTitle: lessonCtx?.lessonTitle,
          })
          cueObservations.availableVisual = availableVisual
          cueObservations.visualDetectionRan = true
          availableVisualHoisted = availableVisual
          // Bugs 5/6/7 — explicit learner requests are detected in code and
          // dispatched as forced TeachingActions, injected AFTER the turn
          // directive so they override the phase's default move. A diagram
          // request also overrides Phase G's ask-turn visual suppression.
          learnerRequestHoisted = detectLearnerRequest(message)
          // Visualization Registry Phase 2: an explicit "show me a diagram"
          // request with a known visual is FORCED to render server-side —
          // never left to the LLM's discretion to emit (or skip) the tag.
          const { shouldForceVisualRender } = await import('@/lib/teaching/visualRegistry')
          // P1 (task 3): tier 3 of the explain_differently escalation ladder
          // ("Visualization, through the existing Visualization Registry") is
          // force-rendered exactly like an explicit diagram request once this
          // concept has needed remediation 3+ times this session — reuses the
          // same registry-first force-render mechanism, never a new pipeline.
          const remediationTier = conversationStateHoisted.remediationCount
          const explainDifferentlyNeedsVisual =
            learnerRequestHoisted === 'explain_differently' && remediationTier >= 3 && availableVisual !== null
          forceVisualRenderHoisted =
            shouldForceVisualRender(learnerRequestHoisted, availableVisual) || explainDifferentlyNeedsVisual
          systemPrompt += buildTurnDirective({
            state: conversationStateHoisted,
            nextMove,
            maxParagraphs: responseBudget(contentRegister, conversationStateHoisted.consecutiveFailures),
            workedExampleFirst,
            visualType: (learnerRequestHoisted === 'diagram' || explainDifferentlyNeedsVisual)
              ? availableVisual
              : decideVisualFirst(availableVisual, conversationStateHoisted, nextMove),
          })
          if (learnerRequestHoisted) {
            const hasEstablishedExample =
              conversationStateHoisted.exampleRequests > 0 || conversationStateHoisted.remediationCount > 2
            if (learnerRequestHoisted === 'explain_differently') {
              const { readTeachingHistory, selectNextStrategy, hasExceededExplanationLimit } = await import('@/lib/teaching/teachingHistory')
              const sessionSnap = learnSession.contextSnapshot as Record<string, unknown> | null
              teachingHistoryHoisted = readTeachingHistory(sessionSnap?.teachingHistory, convConceptId)
              selectedStrategyHoisted = selectNextStrategy(teachingHistoryHoisted)
              if (selectedStrategyHoisted === -1) selectedStrategyHoisted = 6
              if (hasExceededExplanationLimit(teachingHistoryHoisted) && selectedStrategyHoisted <= 1) {
                selectedStrategyHoisted = Math.max(2, selectNextStrategy(teachingHistoryHoisted))
                if (selectedStrategyHoisted < 2) selectedStrategyHoisted = 4
              }
              systemPrompt += buildLearnerRequestBlock(
                learnerRequestHoisted, availableVisual, remediationTier,
                hasEstablishedExample, selectedStrategyHoisted,
                teachingHistoryHoisted.prerequisiteAttempts.length > 0 ? null : (convConceptId ?? null),
              )
            } else {
              systemPrompt += buildLearnerRequestBlock(learnerRequestHoisted, availableVisual, remediationTier, hasEstablishedExample)
            }
          }
          // Bug 8 — the client reports whether the previous long (collapsed)
          // explanation was ever expanded; unread text is never assumed read.
          if (lastExplanationRead === false) {
            systemPrompt += buildUnreadExplanationBlock()
          }
        }

        // RECOVERY preemption (decision-engine/03 §0; foundations/01 §3
        // scripts; first-lesson/05 deltas) — injected LAST of all blocks:
        // the affect band outranks every teaching instruction above it.
        if (recoveryKeyHoisted) {
          const { buildRecoveryBlock } = await import('@/lib/teaching/recoveryGuard')
          // P2: pass session failure count so the script escalates on repeated struggle
          systemPrompt += buildRecoveryBlock(recoveryKeyHoisted, firstLessonActiveHoisted, snapshotSessionFailureCount)
        }
      } catch (err) {
        console.warn('[learn/chat] wave-0 brain blocks skipped:', err)
      }
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

    // K3 (EOS Kernel Pipeline) — shadow-mode invocation. Off by default;
    // ENABLE_KERNEL_PIPELINE=1 activates read-only shadow. The pipeline
    // observes this turn's facts (already computed above), threads them
    // through stages 1–10 + VERIFY(passthrough), and produces a trace for
    // parity measurement / golden-transcript capture. Fire-and-forget:
    // suppresses all errors and never affects the response or the DB.
    if (process.env.ENABLE_KERNEL_PIPELINE && process.env.ENABLE_KERNEL_PIPELINE !== '0') {
      try {
        const { runShadowPipeline } = await import('@/lib/kernel/shadow')
        void runShadowPipeline({
          learnerId: userId,
          sessionId,
          subjectSlug: subjectCode,
          message,
          isSchoolMode: false,
          fold: {
            contentRegister,
            profileLevel: (profile?.currentLevel === 'beginner' || profile?.currentLevel === 'intermediate' || profile?.currentLevel === 'advanced')
              ? profile.currentLevel : null,
            sessionFailureCount: snapshotSessionFailureCount,
            currentConceptId: snapshotCurrentConceptId ?? libraryConceptNodeIdHoisted ?? resolvedConceptId ?? null,
            hasVerifiedPlacement: placementPrevHoisted?.verified === true,
            pendingPlacementProbe: snapshotPendingProbe ?? null,
            isFirstLessonContext: firstLessonActiveHoisted,
          },
          schedule: {
            freshBoundary: sessionEpisodeFreshHoisted,
            boundaryGapMs: null,
            retroWinOwed: sessionEpisodeHoisted?.retroWinOwed === true,
            dueReviewCount: libraryDueRevisionCountHoisted,
          },
          tsm: {
            phase: conversationStateHoisted?.phase ?? 'OBSERVE',
            stageCeiling: evidenceStageCeilingHoisted ?? 2,
            demonstrated: conversationStateHoisted?.demonstrated === true,
            consecutiveFailures: conversationStateHoisted?.consecutiveFailures ?? 0,
          },
          policy: {
            move: evidenceMoveHoisted === 'teach' ? 'TEACH'
              : evidenceMoveHoisted === 'show' ? 'SHOW'
              : evidenceMoveHoisted === 'ask' ? 'ASK'
              : null,
            actionClass: null,
            maxQuestions: (evidenceMoveHoisted === 'ask' ? 1 : 0) as 0 | 1,
            maxParagraphs: null,
            maxNewTerms: contentRegister === 'beginner' ? 1 : 2,
            visualClass: null,
            vocabularyBans: [],
            provenance: [
              ...(recoveryKeyHoisted ? [`recovery:${recoveryKeyHoisted}`] : []),
              ...(firstLessonActiveHoisted ? ['first-lesson'] : []),
            ],
          },
          resolve: { objective: '' },
          plan: {
            systemPrompt,
            history: historyMessages,
          },
        }).catch(() => { /* shadow-mode is fire-and-forget */ })
      } catch { /* strangler: kernel failure never affects the turn */ }
    }

    try {
      // Explanation Memory / Teaching Action Repository (approved exception to
      // ADR 14's implementation gate — see WAVE_0_APPROVAL_CHECKLIST.md W1-4/
      // W4-1/W4-3). Tries to assemble the turn from previously reviewed,
      // ACTIVE Knowledge Assets before paying for an LLM call. Safe no-op
      // today: nothing is ACTIVE until a human reviewer promotes a DRAFT via
      // the admin review endpoint, so assembleLesson() always returns null
      // and the LLM path below runs exactly as before.
      //
      // Canonical serving path (see EDUCATIONAL_BRAIN_BIBLE.md §6.3): this IS
      // the canonical authored-content serving path — the only one that can
      // skip the LLM call entirely for a turn. It is now also the ONLY
      // authored-content serving path in this route: the Package Runtime
      // PoC's route-level wiring (`buildLessonContextForConcept`, ~140 lines
      // up) was removed as obsolete, never-activated prompt-context
      // augmentation — it never competed with this decision even before
      // removal, since it only ever ran before the LLM call, not instead of it.
      // K6 — EOS Runtime: lazy-init brain packs before the LLM call so
      // any compiled Band-3 dispatch rules can influence policy this
      // turn. Idempotent (loads once per process). Off by default via
      // ENABLE_BRAIN_PACKS / ENABLE_EOS_RUNTIME.
      try {
        const { readEosFlags, ensureBrainPacksLoaded } = await import('@/lib/eos-runtime')
        if (readEosFlags().brainPacks) ensureBrainPacksLoaded()
      } catch { /* pack loading is strictly parallel — never breaks a turn */ }

      let memoryState: StudentState | null = null
      let assembled: AssembledLesson | null = null
      // P0 (Explanation Memory routing fix): the one authoritative reason
      // this turn did NOT come from Explanation Memory — computed
      // deterministically, never left implicit. Logged on every turn below
      // (never silently swallowed) so "Groq was called" always comes with
      // a real, specific reason a reviewer can act on.
      let memoryFallbackReason: string | null = null
      // Red-team fix D1: never serve a first-lesson turn from the asset
      // memory path — a static explanation+probe assembly cannot honor the
      // first-lesson flow (demonstrate-first, echo-before-solo, never open
      // with a quiz; first-lesson/02 §1 + 04 §1). Lesson one is delivered by
      // the LLM under the mandatory protocol block injected above.
      // Recovery guard: same exclusion when a failure state fired this turn
      // — no content enters a flooded mind (foundations/04 P5); serving a
      // stored explanation+quiz to a learner who just said "I give up" is
      // the exact violation the preemption rule exists to prevent.
      if (!isExplanationMemoryEnabled()) {
        memoryFallbackReason = 'Explanation Memory disabled (DISABLE_EXPLANATION_MEMORY)'
      } else if (!resolvedConceptId) {
        memoryFallbackReason = 'No concept'
      } else if (firstLessonActiveHoisted) {
        memoryFallbackReason = 'First lesson'
      } else if (recoveryKeyHoisted) {
        memoryFallbackReason = 'Recovery mode'
      } else {
        try {
          memoryState = buildStudentState({
            conceptId: resolvedConceptId,
            subjectSlug: learnSession.subject.slug,
            teachingLanguage: teachingLang,
            grade: profile?.grade,
            currentLevel: profile?.currentLevel,
            targetLevel: profile?.targetLevel,
            userMessage: message,
          })
          assembled = await assembleLesson(memoryState)
          if (assembled && retrievalCacheHoisted) {
            const { CACHE_KEY_EXPLANATION } = await import('@/lib/teaching/retrievalCache')
            retrievalCacheHoisted.set(CACHE_KEY_EXPLANATION, assembled.text)
          }
          if (!assembled) {
            // Distinguish "nothing authored for this concept/language" from
            // "an asset exists but didn't clear the confidence threshold" —
            // a single cheap, indexed count query, not a re-run of matching.
            const activeCount = await prisma.assetIdentity.count({
              where: { conceptId: resolvedConceptId, language: teachingLang, family: 'EXPLANATION', status: 'ACTIVE' },
            }).catch(() => -1)
            memoryFallbackReason = activeCount === 0 ? 'No asset'
              : activeCount > 0 ? 'Confidence failed'
              : 'No asset (lookup error)'
          }
        } catch (err) {
          console.warn('[learn/chat] explanation memory lookup failed, falling back to LLM:', err)
          memoryFallbackReason = 'Explanation Memory lookup error'
        }
      }

      // CUE (Conversation Understanding Engine) — Milestone 1 of the
      // Educational Brain Runtime. Runs for EVERY student turn, school and
      // Library, BEFORE the response below is produced (memory-served or
      // LLM). Perception only: unifies what the existing detectors and
      // engines already read this turn into ONE StudentTurnUnderstanding
      // object. Zero behavior change — nothing consumes it yet (the
      // Decision Engine will, in a later milestone); it is logged for
      // observability, writes nothing, and can never break a turn
      // (understandStudentTurn never throws; this guard is belt-and-braces).
      // Milestone 3: the decision is hoisted so the Runtime Dispatcher below
      // can consume it after this block.
      let cueDecisionHoisted: import('@/lib/understanding/decisionEngine').TeachingDecision | null = null
      try {
        const { understandStudentTurn } = await import('@/lib/understanding')
        const cueLastSignal = (snapshot?.lastSignal && typeof snapshot.lastSignal === 'object')
          ? snapshot.lastSignal as { correctness?: boolean; confidence?: string }
          : null
        const understanding = understandStudentTurn({
          message,
          history: historyMessages,
          recoveryKey: recoveryKeyHoisted,
          firstLessonActive: firstLessonActiveHoisted,
          lastSignal: cueLastSignal,
          sessionFailureCount: snapshotSessionFailureCount,
          episode: sessionEpisodeHoisted,
          freshBoundary: sessionEpisodeFreshHoisted,
          // P0-4: conversationState.ts's own counter — read, never recomputed.
          consecutivePriorKnowledgeProbes: conversationStateHoisted?.consecutivePriorKnowledgeProbes ?? 0,
          lastSuccessfulTeachingStyle,
          conceptId: resolvedConceptId ?? snapshotCurrentConceptId ?? libraryConceptNodeIdHoisted ?? null,
          placement: placementPrevHoisted,
          pendingPlacementProbe: snapshotPendingProbe,
          dueReviewCount: libraryDueRevisionCountHoisted,
          strategyType: strategyHoisted,
          evidenceMove: evidenceMoveHoisted,
          assembled,
          memoryFallbackReason,
          observations: cueObservations,
        })
        console.log('[learn/chat] CUE understanding=' + JSON.stringify(understanding))
        // Decision Engine v1 (Milestone 2) — SHADOW MODE ONLY: consumes the
        // understanding, produces a typed TeachingDecision, and is logged so
        // shadow decisions can be compared against what the runtime actually
        // did. Never acted on: no prompt, DB, or control-flow effect.
        const { decideTeaching } = await import('@/lib/understanding/decisionEngine')
        const teachingDecision = decideTeaching(understanding)
        cueDecisionHoisted = teachingDecision
        console.log('[learn/chat] CUE decision=' + JSON.stringify(teachingDecision))

        // Conversation Decision — classify the student's message BEFORE
        // any teaching decision. Every student message must first produce
        // a conversation decision that the renderer acknowledges before
        // teaching. Pipeline: Student → Understand → ConvDecision → TeachDecision → Render
        try {
          const { classifyConversation } = await import('@/lib/teaching/conversationDecision')
          conversationDecisionHoisted = classifyConversation(message, {
            recoveryKey: recoveryKeyHoisted,
            studentIntent: understanding.studentIntent.value,
            lastAssistantAskedQuestion: understanding.conversationSummary.lastAssistantAskedQuestion,
            lastSignalCorrectness: understanding.confidence.source === 'signals:lastSignal'
              ? (cueLastSignal?.correctness ?? null)
              : null,
            hedged: understanding.conversationSummary.hedged,
            helpRequestKind: understanding.conversationSummary.helpRequestKind,
          })
          console.log('[learn/chat] conversation decision=' + conversationDecisionHoisted.type)
        } catch (err) {
          console.warn('[learn/chat] conversation decision skipped:', err)
        }
      } catch (err) {
        console.warn('[learn/chat] CUE understanding skipped (never affects the turn):', err)
      }

      // Runtime Dispatcher (Milestone 3) — the ONE place a TeachingDecision
      // is mapped onto an existing execution path. Flag-gated:
      // ENABLE_BRAIN_RUNTIME on (default) = the plan DRIVES the
      // serve-from-memory-vs-LLM fork (the only externally
      // visible fork at this point in the route); every other decision
      // executes through the engine blocks already injected above, with the
      // LLM in the renderer role (see dispatcher.ts executor honesty note).
      // Fallback law: a missing/inconsistent plan always degrades to the
      // legacy behavior — the dispatcher can never strand a turn.
      let brainRuntimeActive = false
      let serveFromMemory = assembled !== null
      let dispatchPlanHoisted: import('@/lib/understanding/dispatcher').DispatchPlan | null = null
      try {
        const { isBrainRuntimeEnabled, planDispatch } = await import('@/lib/understanding/dispatcher')
        brainRuntimeActive = isBrainRuntimeEnabled()
        if (cueDecisionHoisted) {
          dispatchPlanHoisted = planDispatch(cueDecisionHoisted, { assembledAvailable: assembled !== null })
          console.log(
            '[learn/chat] CUE dispatch=' + JSON.stringify(dispatchPlanHoisted) +
            ` mode=${brainRuntimeActive ? 'ACTIVE' : 'shadow'}`
          )
          if (brainRuntimeActive) {
            serveFromMemory = dispatchPlanHoisted.executor === 'EXPLANATION_MEMORY' && assembled !== null
            // P1 reasoning: a direct student question outranks canned
            // content (D4b) — when the Brain routes an assembled turn to
            // the LLM, record the real reason so the provider log never
            // claims a bug.
            if (!serveFromMemory && assembled !== null && memoryFallbackReason === null) {
              memoryFallbackReason = 'Brain decision'
            }
            // Milestone 4 (Brain Execution): the decision is authoritative.
            // For renderer-executed decisions, scope the LLM to the RENDERER
            // role for the engine the Brain selected — an additive block
            // (the same mechanism every engine already uses) that points at
            // the engine blocks already injected above; it introduces no new
            // content and forbids the LLM from choosing a different action.
            // Empty for memory serves (no LLM at all) and open escalation.
            const { buildBrainExecutionBlock } = await import('@/lib/understanding/execution')
            const { STRATEGY_LABELS } = await import('@/lib/teaching/strategyDirective')
            const { buildRetrievedContext } = await import('@/lib/teaching/retrievalCache')
            const execOpts: import('@/lib/understanding/execution').ExecutionBlockOptions = {}
            if (selectedStrategyHoisted !== null && selectedStrategyHoisted >= 0) {
              execOpts.strategyLabel = STRATEGY_LABELS[selectedStrategyHoisted] ?? `Strategy ${selectedStrategyHoisted}`
            }
            if (retrievalCacheHoisted) {
              const conceptForCtx = resolvedConceptId ?? snapshotCurrentConceptId ?? libraryConceptNodeIdHoisted ?? ''
              execOpts.retrievedSnippet = buildRetrievedContext(retrievalCacheHoisted, conceptForCtx)
            }
            if (conversationDecisionHoisted && conversationDecisionHoisted.type !== 'RECOVERY') {
              const { buildConversationDirective } = await import('@/lib/teaching/conversationDecision')
              execOpts.conversationDirective = buildConversationDirective(conversationDecisionHoisted)
            }
            systemPrompt += buildBrainExecutionBlock(dispatchPlanHoisted, cueDecisionHoisted, execOpts)
          }
        }
        // Brain runtime metrics — in-process observability only (no DB).
        const { recordDispatch } = await import('@/lib/understanding/brainMetrics')
        recordDispatch(dispatchPlanHoisted, brainRuntimeActive)
      } catch (err) {
        console.warn('[learn/chat] dispatcher skipped (legacy serving choice retained):', err)
        serveFromMemory = assembled !== null
      }

      // Conversation Decision — standalone block for turns where the Brain
      // execution block is empty (ESCALATE_TO_LLM, LLM_OPEN, brain off).
      // The conversation directive must reach the LLM on EVERY turn that
      // goes through Groq, not just Brain-renderer turns.
      if (conversationDecisionHoisted && conversationDecisionHoisted.type !== 'RECOVERY' && !serveFromMemory) {
        const brainBlockFired = brainRuntimeActive && dispatchPlanHoisted?.executor === 'LLM_RENDERER'
        if (!brainBlockFired) {
          const { buildConversationDirective } = await import('@/lib/teaching/conversationDecision')
          systemPrompt += '\n\n' + buildConversationDirective(conversationDecisionHoisted)
        }
      }

      let text: string
      let provider: string
      // The provider's own reason the completion ended ('stop', 'length',
      // etc.) — 'n/a' for memory-served responses, which never call a
      // model. Logged below so a future empty-response failure carries
      // real evidence instead of requiring another guess (see the
      // "Sorry, I got cut off" investigation this was added for).
      let finishReason: string | null = 'n/a (memory-served)'
      // P0 (Explanation Memory serving metadata — observability only, does
      // NOT introduce new provider values; `provider` stays exactly one of
      // memory/groq/yandex/fallback). Populated below for every turn —
      // memory* fields describe HOW a memory hit was reached; for a
      // non-memory turn they're null/false and memoryFallbackReasonCode
      // captures WHY memory didn't serve at all (a superset of the
      // memory-internal grade_band/confidence/none reasons: also
      // disabled/no_concept/first_lesson/recovery_mode/no_asset/
      // confidence_failed/lookup_error — mapped from the existing
      // human-readable memoryFallbackReason string this route already
      // computes above, never a second source of truth).
      let memoryServingMode: string | null = null
      let memoryConfidence: number | null = null
      let memoryAssetId: string | null = null
      let memoryConceptId: string | null = null
      let memoryExactGradeMatch: boolean | null = null
      let memoryFallbackUsed: boolean | null = null
      let memoryFallbackReasonCode: string = 'none'
      if (assembled && serveFromMemory) {
        text = assembled.text
        provider = 'memory'
        memoryServingMode = assembled.explanationServingMode
        memoryConfidence = assembled.explanationConfidence
        memoryAssetId = assembled.explanationAssetId
        memoryConceptId = resolvedConceptId
        memoryExactGradeMatch = assembled.explanationExactGradeMatch
        memoryFallbackUsed = assembled.explanationFallbackUsed
        memoryFallbackReasonCode = assembled.explanationFallbackReason
        // Milestone 4 metrics: an Explanation Memory serve — Groq NOT called.
        try { (await import('@/lib/understanding/brainMetrics')).recordServe('memory') } catch { /* observability only */ }
        // Structured provider log — visible in Vercel logs, never sent to
        // client. Proves Explanation Memory is being served without Groq.
        // Never silent: every field the P0 routing audit asked for, on
        // every turn.
        console.log(
          '[learn/chat] RESPONSE provider=memory' +
          ` resolvedConceptId=${resolvedConceptId ?? 'unknown'}` +
          ` subject=${learnSession.subject.slug}` +
          ` source=ExplanationMemory` +
          ` asset_ids=[${assembled.usedAssetIds.join(',')}]` +
          ` confidence=${assembled.explanationConfidence?.toFixed(3) ?? 'n/a'}` +
          ` fallback_reason=n/a` +
          ` groq_invoked=false` +
          ` chars=${text.length}` +
          ` memoryServingMode=${memoryServingMode}` +
          ` memoryExactGradeMatch=${memoryExactGradeMatch}` +
          ` memoryFallbackUsed=${memoryFallbackUsed}` +
          ` memoryFallbackReason=${memoryFallbackReasonCode}`
        )
      } else {
        // Maps the existing human-readable memoryFallbackReason string
        // (computed earlier in this route, unchanged) onto a stable snake_
        // case code for the new observability field — additive only, does
        // not change what that string says or when it's set.
        memoryFallbackReasonCode = memoryFallbackReason === 'Explanation Memory disabled (DISABLE_EXPLANATION_MEMORY)' ? 'disabled'
          : memoryFallbackReason === 'No concept' ? 'no_concept'
          : memoryFallbackReason === 'First lesson' ? 'first_lesson'
          : memoryFallbackReason === 'Recovery mode' ? 'recovery_mode'
          : memoryFallbackReason === 'No asset' ? 'no_asset'
          : memoryFallbackReason === 'Confidence failed' ? 'confidence_failed'
          : memoryFallbackReason === 'No asset (lookup error)' ? 'lookup_error'
          : memoryFallbackReason === 'Explanation Memory lookup error' ? 'lookup_error'
          : memoryFallbackReason === 'Brain decision' ? 'brain_decision'
          : 'no_asset'
        const routed = await routeAI(
          [...historyMessages, { role: 'user', content: message }],
          systemPrompt,
          country,
          // Was 1024. gpt-oss-20b is a reasoning model — it spends output
          // tokens on internal reasoning BEFORE the final answer, so a tight
          // completion budget can be exhausted mid-reasoning, yielding an
          // empty `content` (not an error). route.ts then returns a 502
          // ("Empty response from model"), which the client renders as the
          // "Sorry, I got cut off" recovery message — this is the root
          // cause of that message recurring every few turns rather than
          // reflecting a genuine provider outage each time. Raised to give
          // real headroom for reasoning + this app's long teaching replies.
          2048,
          teachingLang,
          { userId, subject: learnSession.subject.slug },
        )
        text = routed.text
        provider = routed.provider
        finishReason = routed.finishReason
        // Milestone 4 metrics: an LLM-rendered turn (Groq/Yandex called).
        try { (await import('@/lib/understanding/brainMetrics')).recordServe('llm') } catch { /* observability only */ }
        // Structured provider log — shows when Groq IS called and the exact,
        // never-silent reason Explanation Memory didn't serve this turn
        // instead (memoryFallbackReason is always set to a real value by
        // this point — see the gate above: it is never left null once the
        // memory path was skipped or came back empty).
        console.log(
          `[learn/chat] RESPONSE provider=${provider}` +
          ` resolvedConceptId=${resolvedConceptId ?? 'unknown'}` +
          ` subject=${learnSession.subject.slug}` +
          ` source=Groq` +
          ` fallback_reason=${memoryFallbackReason ?? 'unknown (bug: reason not set)'}` +
          ` groq_invoked=true` +
          ` finish_reason=${finishReason}` +
          ` chars=${text ? text.length : 0}` +
          ` memoryServingMode=null memoryFallbackReason=${memoryFallbackReasonCode}`
        )
      }

      // Content Quality Intelligence layer (analytics only — see
      // MemoryServingEvent's schema comment). Fire-and-forget: never
      // awaited, wrapped in .catch(), so a write failure or slow insert can
      // never delay or fail this turn's response. Persists exactly the
      // memory*/provider fields already decided above — reads nothing,
      // writes nothing that any serving-path function (matcher.ts,
      // explanationMemory.ts, teachingActionRepository.ts) will ever read
      // back. resolvedConceptId is only null when Explanation Memory was
      // never in play at all (no KG for this subject) — skip the write
      // rather than log a conceptId-less row that couldn't be aggregated.
      if (resolvedConceptId) {
        prisma.memoryServingEvent.create({
          data: {
            conceptId: resolvedConceptId,
            subjectSlug: learnSession.subject.slug,
            language: teachingLang,
            provider,
            servingMode: memoryServingMode,
            confidence: memoryConfidence,
            fallbackReason: memoryFallbackReasonCode,
            assetId: memoryAssetId,
          },
        }).catch((err) => console.warn('[learn/chat] MemoryServingEvent write failed (non-fatal):', err))
      }

      if (!text) {
        console.error('[learn/chat] empty response from model, finish_reason:', finishReason ?? 'unknown')
        return NextResponse.json({ success: false, error: 'Empty response from model' }, { status: 502 })
      }

      // Wave 0 Step 2/4 (Blueprint Phase 3): extract and strip the SIGNAL
      // tag FIRST — before asset capture and every other tag parser — so
      // the tag never leaks into stored messages, captured assets, or the
      // client. The parsed signal drives evidence + placement below.
      const { parseSignalTag } = await import('@/lib/teaching/signals')
      const signalParse = parseSignalTag(text)
      let teachingSignal = signalParse.signal
      text = signalParse.cleanText
      // Bug 2 (mastery gate): a bare acknowledgement ("got it", "ok",
      // "next", "thanks", "👍"…) is not an answer. The prompt forbids the
      // model from emitting a SIGNAL for non-answers, but that is
      // advisory — this is the deterministic guard. Discarding the signal
      // here keeps acknowledgements out of the phase ladder, mastery
      // evidence, TopicProgress, and misconception records in one place.
      if (teachingSignal) {
        const { isBareAcknowledgement } = await import('@/lib/teaching/masteryGate')
        if (isBareAcknowledgement(message)) teachingSignal = null
      }

      // Phase 2/5 capture: decompose a successful LLM generation into
      // whichever labelled sections and assessment items it actually
      // contains and persist each as a DRAFT for future reuse. Fire-and-
      // forget — never awaited, never blocks the turn.
      if (memoryState && !assembled) {
        void ingestGeneratedLesson({
          conceptId: memoryState.conceptId,
          subjectSlug: memoryState.subjectSlug,
          language: memoryState.language,
          gradeBand: memoryState.gradeBand,
          rawContent: text,
          authorId: 'SYSTEM_AI',
        })
      }

      // Sprint BW: extract and strip VISUAL:<type> tag before persisting/returning.
      // The tag is additive — stripping it keeps stored messages clean.
      let responseVisual: string | null = null
      let cleanText = text
      // VISUAL:<type> extraction for SUBJECT_LIBRARY subjects — Sprint BW
      // parseVisualTag(). Additive; strips the tag from the persisted/
      // returned text either way.
      try {
        const { parseVisualTag } = await import('@/lib/school/visuals/detectVisual')
        const parsed = parseVisualTag(text)
        responseVisual = parsed.visual
        cleanText = parsed.cleanText
      } catch { /* non-fatal */ }
      // Visualization Registry Phase 2 — server-authoritative attachment:
      // an explicit learner diagram request with a known available visual
      // renders it REGARDLESS of whether the LLM emitted (or correctly
      // spelled) the VISUAL:<type> tag. The LLM's own tag is honored when
      // present (it may legitimately pick a more specific match); this
      // only fills the gap when the model described the diagram in prose
      // instead of rendering it — the exact failure mode this closes.
      // UI/UX P0: also force-render when the model's OWN text promises a
      // visual ("here's a visual example...") that never got attached —
      // see textPromisesUnfulfilledVisual()'s comment for why the prior
      // force-render trigger (student asked) missed this case entirely.
      {
        const { resolveResponseVisual, textPromisesUnfulfilledVisual } = await import('@/lib/teaching/visualRegistry')
        const forceForPromise = !responseVisual && availableVisualHoisted !== null && textPromisesUnfulfilledVisual(cleanText)
        responseVisual = resolveResponseVisual(
          responseVisual as import('@/lib/school/visuals/visualTypes').VisualType | null,
          forceVisualRenderHoisted || forceForPromise,
          availableVisualHoisted as import('@/lib/school/visuals/visualTypes').VisualType | null,
        )
      }

      // Sprint W gap A: extract the [HINT] tag's text (if the model emitted
      // one) and strip it from the persisted/returned text. Enforced even
      // under a SUPPRESSED bias — if the model ignores the "do not use
      // [HINT]" instruction, the tag is still stripped from the visible text
      // but its content is discarded rather than surfaced, the same
      // defense-in-depth pattern as the SUPPRESS_OPTIONAL visual checks below.
      try {
        const { parseHintTag } = await import('@/lib/school/tutoring/hintTag')
        const parsedHint = parseHintTag(cleanText)
        cleanText = parsedHint.cleanText
        hintHoisted = hintBiasHoisted === 'SUPPRESSED' ? null : parsedHint.hint
      } catch { /* non-fatal */ }

      // Beginner IPA/phonetic-notation safety net: buildTutorSystemPrompt's
      // NOTATION RULES block (gated on contentRegister above) is the primary
      // fix — this catches the rare case where the model ignores it anyway,
      // for beginners only. Intermediate/expert responses are left untouched
      // since IPA is allowed (optionally/fully) at those registers.
      if (contentRegister === 'beginner') {
        cleanText = stripIpaNotation(cleanText)
      }

      // K6 — EOS Runtime integration: run the K5 Output Verifier on the
      // cleaned text. Off by default; behind ENABLE_OUTPUT_VERIFIER (or the
      // master ENABLE_EOS_RUNTIME). Failures follow the RS §9.3 protocol:
      // one constrained rerender using routeAI with the SAME plan +
      // violations appendix, then a deterministic template if still failing.
      // Fires only for Library turns (K6 scope: School Mode untouched); a
      // memory-served (assembled) turn is skipped since it's already
      // human-curated.
      let eosVerifierEvents: import('@/lib/kernel/verifier').OutputEvent[] = []
      let eosVerifierUsedTemplate = false
      let eosVerifierAttempts: 1 | 2 = 1
      if (!assembled) {
        try {
          const { readEosFlags, buildVerifierContext, verifierGate } = await import('@/lib/eos-runtime')
          const eosFlags = readEosFlags()
          if (eosFlags.outputVerifier) {
            const ctx = buildVerifierContext({
              contentRegister,
              move: evidenceMoveHoisted === 'teach' ? 'TEACH'
                : evidenceMoveHoisted === 'show' ? 'SHOW'
                : evidenceMoveHoisted === 'ask'  ? 'ASK' : null,
              phase: conversationStateHoisted?.phase ?? null,
              stageCeiling: evidenceStageCeilingHoisted,
              vocabularyUnlocked: !firstLessonActiveHoisted,
              formulaUnlocked: !firstLessonActiveHoisted && contentRegister !== 'beginner',
              recoveryActive: recoveryKeyHoisted !== null,
              maxQuestions: (evidenceMoveHoisted === 'ask' ? 1 : 0) as 0 | 1,
              maxParagraphs: null,
              maxNewTerms: contentRegister === 'beginner' ? 1 : 2,
              vocabularyBans: [],
              assessmentActive: false,
              lessonCompletionAuthorized: false,
              sessionFailureCount: snapshotSessionFailureCount,
              learnerText: message,
              reactMandated: true,
              legalTags: ['VISUAL', 'HINT', 'INLINE_PRACTICE', 'WE', 'LESSON'],
              bannedConceptTerms: [],
            })
            const gate = await verifierGate({
              draftText: cleanText,
              ctx,
              learnerText: message,
              fallbackChain: ['SHOW_EASIEST_LEGAL', 'ECHO_MICROWIN', 'WARM_CLOSE'],
              rerender: async (violationAppendix) => {
                const routed = await routeAI(
                  [...historyMessages, { role: 'user', content: message }],
                  systemPrompt + violationAppendix,
                  country,
                  2048, // see the primary routeAI() call above for why this was raised from 1024
                  teachingLang,
                  { userId, subject: learnSession.subject.slug },
                )
                let t = routed.text
                if (contentRegister === 'beginner') t = stripIpaNotation(t)
                return t
              },
            })
            cleanText = gate.finalText
            eosVerifierEvents = gate.events
            eosVerifierUsedTemplate = gate.usedTemplate
            eosVerifierAttempts = gate.attempts
          }
        } catch (err) {
          // Fail-open: never break the turn on verifier failure.
          console.warn('[learn/chat] EOS verifier gate skipped:', err)
        }
      }

      // ── STANCE ENFORCEMENT / MASTERY GATE (server-authoritative
      // completion, Bugs 1/2/3/12; Claude Recommendation #6) ──
      // The single chokepoint every completion path funnels through.
      // Whatever made the model emit [LESSON_COMPLETE] — "got it", an
      // autonomy request, sheer confidence — the tag reaches the client
      // (whose parseLessonCompletionTag drives the curriculum-progress
      // PATCH, XP, confetti, and roadmap advance) ONLY when the state
      // machine's own evidence counters verify mastery: ≥1 correct CHECK
      // answer and ≥2 correct PRACTICE answers for this concept.
      // enforceStance() also flags (never rewrites) two additional laws:
      // an 'ask' move that rendered no question (explanation substituted
      // for a due check), and a misconception-resolution claim without
      // verified mastery evidence. The state is folded exactly once here
      // with this turn's evidence; the persist block below reuses the
      // folded value (never folds twice). School Mode is untouched.
      // Fail-closed: a null state never authorizes.
      if (conversationStateHoisted) {
        try {
          const { advanceConversationState, repliesWithQuestion, isPriorKnowledgeProbe } = await import('@/lib/teaching/conversationState')
          const { enforceStance } = await import('@/lib/teaching/stanceEnforcement')
          conversationStateAfterTurnHoisted = advanceConversationState(conversationStateHoisted, {
            askedQuestion: repliesWithQuestion(cleanText),
            signalCorrect: teachingSignal?.correctness ?? null,
            recoveryFired: recoveryKeyHoisted !== null,
            learnerRequest: learnerRequestHoisted,
            misconceptionDetected: teachingSignal?.phrase !== undefined,
            isPriorKnowledgeProbe: isPriorKnowledgeProbe(cleanText),
            strategyUsed: selectedStrategyHoisted ?? undefined,
            signalConfidence: teachingSignal?.confidence as 'high' | 'medium' | 'low' | undefined,
          })
          const stanceVerdict = enforceStance({
            text: cleanText,
            state: conversationStateAfterTurnHoisted,
            move: evidenceMoveHoisted === 'teach' ? 'teach' : evidenceMoveHoisted === 'show' ? 'show' : evidenceMoveHoisted === 'ask' ? 'ask' : null,
            misconceptionActive: conversationStateAfterTurnHoisted.misconceptionDetectedThisLesson,
          })
          cleanText = stanceVerdict.cleanText
          masteryCompletionSuppressedHoisted = !stanceVerdict.completionAuthorized && stanceVerdict.violations.some((v) => v.code === 'FALSE_MASTERY_COMPLETION')
          if (masteryCompletionSuppressedHoisted) masteryGatePendingHoisted = true
          stanceViolationsHoisted = stanceVerdict.violations.map((v) => v.code)
        } catch (err) {
          // Fail-closed for completion: on any gate failure, strip the tag
          // rather than let an unverified completion through.
          console.warn('[learn/chat] stance enforcement error — suppressing completion:', err)
          cleanText = cleanText.replace(/\s*\[LESSON_COMPLETE\]\s*/gi, ' ').trim()
          masteryCompletionSuppressedHoisted = true
        }
      } else if (/\[LESSON_COMPLETE\]/i.test(cleanText)) {
        // Fail-closed: a Library turn with no state machine (upstream block
        // threw) has no completion authority — strip rather than trust.
        cleanText = cleanText.replace(/\s*\[LESSON_COMPLETE\]\s*/gi, ' ').trim()
        masteryCompletionSuppressedHoisted = true
        masteryGatePendingHoisted = true
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

      let detectedSceneSpec: ReturnType<typeof buildSceneSpec> = null
      let dynamicVisualizationCode: string | null = null

      // Part 2 (option C, FLAG-GATED): parameter-driven routed scene generation
      // (src/lib/teaching/sceneGenerators/sceneRouter.ts) — 9 textbook-standard
      // scene types where the LLM only extracts parameters and deterministic
      // code computes all geometry, with an independent consistency check as a
      // safety net. Dead by default — generateRoutedScene() only fires when
      // ENABLE_PARAMETRIC_SCENE_GENERATION === 'true'. Checked BEFORE the generic
      // buildSceneSpec fallback below (bug fix): buildSceneSpec's bare-word
      // VECTOR_RE (/velocity|acceleration|force|.../) matches almost any motion
      // explanation — including projectile/circular/pendulum/collision text —
      // and was firing first, producing a generic "auto-vector" scene and
      // permanently blocking the specific routed generator from ever running.
      // Non-fatal: any failure at any pipeline stage degrades to null (logged,
      // not thrown) and the turn proceeds unchanged.
      // Did the text match a SPECIFIC parametric-router rule (projectile, circular,
      // vector, etc.)? Tracked separately from whether generateRoutedScene actually
      // produced a scene: extraction/build/consistency can still fail downstream
      // (e.g. the LLM can't pull two clean vector magnitudes out of a Newton's-
      // second-law explanation that never states two forces numerically). In that
      // case the text is still recognizably circular-motion/vector-flavored, so the
      // generic buildSceneSpec fallback below must NOT run — its bare-word VECTOR_RE
      // would otherwise paper over the failure with a misleading generic single-
      // arrow "auto-vector" scene for text the router already identified as a
      // specific (but failed) case. Showing nothing is correct per buildSceneSpec's
      // own "wrong scene is worse than none" design.
      let parametricRouteMatched = false
      if (!detectedVisualSpec && isParametricSceneGenerationEnabled()) {
        parametricRouteMatched = routeSceneGenerator(cleanText) !== null
        console.log('[scene-debug] parametric scene router invoked for text:', cleanText.slice(0, 200))
        try {
          detectedSceneSpec = await generateRoutedScene(cleanText)
        } catch (err) {
          console.log('[scene-debug] generateRoutedScene threw:', err)
        }
        console.log('[scene-debug] parametric scene router result:', detectedSceneSpec ? detectedSceneSpec.id : null)
      }

      // Deterministic, rule-based 3D scene detection (vectors/molecules/coordinate
      // space) — same non-fatal, no-AI-call pattern as detectedVisualSpec above.
      // Generic fallback only: fires when nothing more specific (the 2D pipeline
      // or the parametric router above) matched OR failed, so a message never
      // carries both a 2D diagram and a 3D scene, a generic vector arrow never
      // preempts a real projectile/circular/pendulum/collision/etc. scene, and it
      // never papers over a recognized-but-failed parametric route either.
      if (!detectedVisualSpec && !detectedSceneSpec && !parametricRouteMatched) {
        try {
          detectedSceneSpec = buildSceneSpec(cleanText)
        } catch { /* non-fatal */ }
      }

      // Part 2 (DRAFT, FLAG-GATED): AI SceneSpec generation. Dead by default —
      // generateSceneSpec() returns null unless ENABLE_AI_SCENE_GENERATION === 'true'.
      // Runs only when neither deterministic pipeline produced anything, so it can
      // never override a trusted deterministic visual, and its output is already
      // structurally validated (validateSceneSpec) inside the generator. Non-fatal:
      // a failed/blocked LLM call degrades to null and the turn proceeds unchanged.
      // This is the production wiring, drafted and ready to enable once the
      // feasibility probe confirms usable output on a Groq-reachable network.
      if (!detectedVisualSpec && !detectedSceneSpec && isAiSceneGenerationEnabled()) {
        try {
          detectedSceneSpec = await generateSceneSpec(cleanText)
        } catch { /* non-fatal */ }
      }

      // Dynamic 2D Visualization Engine: unlimited-domain fallback for when no
      // deterministic, parametric, or AI SceneSpec pipeline above produced a
      // visual. Generates a small React component from the explanation text
      // and ships it to the client as a string — it is never executed on the
      // server or in this app's render tree; DynamicVisualRenderer.tsx runs it
      // inside a sandboxed, opaque-origin iframe. Gated on the deterministic
      // decideVisualization() heuristic (no extra LLM call to decide whether to
      // visualize) and its own flag, default OFF. Non-fatal: any failure at any
      // stage degrades to null and the turn proceeds unchanged.
      // TEMP DEBUG (dynamic-visual diagnosis sprint — remove once verified) —
      // surfaces exactly which gate is closing when the dynamic engine doesn't
      // fire, so a "no visual" turn in the UI is traceable in the dev-server
      // log instead of silently invisible. Cheap (one decideVisualization() per
      // turn, already deterministic & no-network) and harmless if left in.
      const dvFlag = isDynamicVisualizationEnabled()
      const dvDecision = decideVisualization(cleanText)
      console.log('[dynamic-debug] gates:', {
        visualSpecAlreadySet: !!detectedVisualSpec,
        sceneSpecAlreadySet: !!detectedSceneSpec,
        flagEnabled: dvFlag,
        shouldVisualize: dvDecision.shouldVisualize,
        category: dvDecision.category,
        reasoning: dvDecision.reasoning,
      })
      if (
        !detectedVisualSpec &&
        !detectedSceneSpec &&
        dvFlag &&
        dvDecision.shouldVisualize
      ) {
        try {
          const conceptKey = normalizeConceptKey(cleanText)
          const cached = await getCachedVisualization(conceptKey)
          if (cached) {
            dynamicVisualizationCode = cached.code
            console.log('[dynamic-debug] cache HIT for concept:', conceptKey.slice(0, 60))
          } else {
            console.log('[dynamic-debug] cache MISS; calling LLM for concept:', conceptKey.slice(0, 60))
            const generated = await generateVisualizationCode(cleanText)
            if (generated) {
              dynamicVisualizationCode = generated.code
              await saveVisualization(conceptKey, generated.code)
              console.log('[dynamic-debug] LLM returned code; bytes:', generated.code.length)
            } else {
              console.log('[dynamic-debug] LLM returned null (both 3D + 2D passes failed — most often: missing/invalid GROQ_API_KEY)')
            }
          }
        } catch (err) {
          console.log('[dynamic-debug] threw:', err)
        }
      }

      // Teaching Strategy Engine (docs/TEACHING_ENGINE_SPEC.md): let the per-turn
      // teaching strategy cast an ADVISORY bias over the deterministic 2D visual
      // candidate above. Additive and null-guarded — on any non-school turn,
      // missing strategy, or error, outputBiasHoisted is null and this is skipped,
      // leaving today's behavior unchanged. Never fabricates a spec; the
      // "never two visuals" guard below still runs last and stays authoritative.
      //   • SUPPRESS_OPTIONAL: drop the candidate only if it is OPTIONAL
      //     (non-interactive AND no challenge payload — isOptionalVisual).
      //   • PROMOTE: keep the candidate as-is (it is already a trusted spec); its
      //     spec-intended effect on the LLM's own VISUAL tag is the existing default
      //     when no deterministic spec fired, so nothing extra is done here.
      // (Explicit "student asked for a visual" override is deferred — see the spec's
      //  Risk #3; the keyword heuristic is unproven and intentionally out of scope here.)
      if (strategyHoisted && outputBiasHoisted && detectedVisualSpec) {
        try {
          const { isOptionalVisual } = await import('@/lib/school/adaptive/teachingOutputBias')
          if (outputBiasHoisted.kind === 'SUPPRESS_OPTIONAL' && isOptionalVisual(detectedVisualSpec)) {
            detectedVisualSpec = null
          }
        } catch { /* non-fatal — output bias is purely advisory */ }
      }

      // Sprint W gap fix: the bias above only ever inspected detectedVisualSpec —
      // the LLM's own free-text VISUAL:<type> tag (responseVisual) was never bias-
      // weighted at all, so a MOMENTUM_RECOVERY/CONFIDENCE_BUILDING/CONFIDENCE_CORRECTION
      // turn could still surface a model-suggested visual the strategy explicitly wants
      // to suppress. responseVisual carries no interactive/challenge payload (it is
      // just a string), so it is unconditionally OPTIONAL whenever present — see
      // isOptionalVisualTag. Independent of, and runs alongside, the block above.
      // forceVisualRenderHoisted (explicit "show me a diagram" request) is
      // exempt from SUPPRESS_OPTIONAL: a learner-requested visual is never
      // "optional" by definition — suppressing it here would reintroduce
      // the exact bug this closes (AI describes instead of rendering).
      if (strategyHoisted && outputBiasHoisted && responseVisual && !forceVisualRenderHoisted) {
        try {
          const { isOptionalVisualTag } = await import('@/lib/school/adaptive/teachingOutputBias')
          if (outputBiasHoisted.kind === 'SUPPRESS_OPTIONAL' && isOptionalVisualTag(responseVisual)) {
            responseVisual = null
          }
        } catch { /* non-fatal — output bias is purely advisory */ }
      }

      // Sprint W gap C remainder: sceneSpec (rule-based/parametric/free-form,
      // audit items #3/#4/#5) was never inspected by the bias module at all.
      // isRequiredSceneSpec is always true when a scene is present — see its
      // doc comment for why no suppression actually happens here — but this
      // makes that policy explicit and auditable instead of leaving sceneSpec
      // as a silent blind spot in the bias layer.
      if (strategyHoisted && outputBiasHoisted && detectedSceneSpec) {
        try {
          const { isRequiredSceneSpec } = await import('@/lib/school/adaptive/teachingOutputBias')
          if (outputBiasHoisted.kind === 'SUPPRESS_OPTIONAL' && !isRequiredSceneSpec(detectedSceneSpec)) {
            detectedSceneSpec = null
          }
        } catch { /* non-fatal — output bias is purely advisory */ }
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

      // Hoisted out of the strategy-log block below so the P0 Brain
      // compliance check (further down) can reuse it unconditionally —
      // same computation, not duplicated.
      const visualFired = Boolean(detectedVisualSpec || detectedSceneSpec || responseVisual)

      // Teaching Strategy Engine outcome log (docs/STUDENT_MEMORY_AUDIT.md):
      // additive, fire-and-forget, non-fatal — records which strategy fired
      // and whether a visual ultimately rendered this turn, for future
      // strategy-effectiveness analysis. Never awaited, never throws, so it
      // cannot add latency or fail the turn.
      if (strategyHoisted && outputBiasHoisted && userId) {
        prisma.teachingStrategyEvent.create({
          data: {
            userId,
            topicSlug: strategyTopicSlugHoisted ?? subjectCode,
            strategy: strategyHoisted,
            outputBias: outputBiasHoisted.kind,
            visualFired,
            sessionId: sessionId ?? null,
          },
        }).catch(() => { /* non-fatal — outcome logging is purely additive */ })
      }

      // P0 (Brain compliance validation) + P1 (production-validation
      // telemetry): after the response is finalized, verify it actually
      // followed the TeachingDecision the Brain computed this turn
      // (cueDecisionHoisted/dispatchPlanHoisted — always computed, shadow
      // or active, see the CUE/dispatcher block above), and emit one
      // BrainEvent covering every field the milestone asks to measure.
      // Runs whether or not the flag is on, so shadow-mode data
      // accumulates evidence for whether flipping the default is safe.
      // Never blocks or alters the response — log-only, and never
      // silently ignored (recordCompliance always logs; violations log
      // at 'warn'; recordBrainEvent always emits the structured line).
      try {
        const { checkBrainCompliance } = await import('@/lib/understanding/execution')
        const { recordCompliance, recordBrainEvent } = await import('@/lib/understanding/brainMetrics')
        const complianceResult = checkBrainCompliance(cleanText, dispatchPlanHoisted, cueDecisionHoisted, visualFired)
        recordCompliance(complianceResult)

        const explanationMemoryAvailable = assembled !== null
        const llmUsed = provider !== 'memory'
        recordBrainEvent({
          version: 1,
          timestamp: new Date().toISOString(),
          sessionId,
          userId,
          subjectSlug: learnSession.subject.slug,
          brainRuntimeActive,
          brainDecision: cueDecisionHoisted?.decision ?? null,
          brainRuleId: cueDecisionHoisted?.ruleId ?? null,
          compliant: dispatchPlanHoisted && cueDecisionHoisted ? complianceResult.compliant : null,
          complianceReason: dispatchPlanHoisted && cueDecisionHoisted ? complianceResult.reason : null,
          explanationMemoryAvailable,
          explanationMemoryHit: !llmUsed,
          fallbackReason: memoryFallbackReasonCode,
          llmUsed,
          provider,
          latencyMs: Date.now() - turnReceivedAt,
          recoveryTriggered: recoveryKeyHoisted !== null,
          recoveryKey: recoveryKeyHoisted,
          frustrationDetected: recoveryKeyHoisted === 'frustrated',
          questionLoopDetected: (conversationStateHoisted?.consecutivePriorKnowledgeProbes ?? 0) >= 2,
          directInstructionTriggered: cueDecisionHoisted?.decision === 'TEACH_DIRECTLY',
          brainLegacyDisagreement: explanationMemoryAvailable
            && dispatchPlanHoisted !== null && dispatchPlanHoisted.executor !== 'EXPLANATION_MEMORY',
          visualFired,
          responseLength: cleanText.length,
        })
      } catch (err) {
        console.warn('[learn/chat] Brain compliance/telemetry check skipped (never affects the turn):', err)
      }

      // The chat turn itself must never fail because of the AI-badge column
      // (P2022 "column does not exist" happens if a deploy's Prisma Client
      // ever runs ahead of an unapplied migration). Persisting `provider`
      // is a nice-to-have for the badge, not core to the turn — degrade to
      // writing the message without it rather than 500ing the whole chat.
      let assistantMessage
      try {
        assistantMessage = await withRetry(() => prisma.message.create({
          data: { sessionId, role: MessageRole.ASSISTANT, content: cleanText, provider },
        }))
      } catch (err) {
        console.error('[learn/chat] message.create with provider failed, retrying without it:', err)
        assistantMessage = await withRetry(() => prisma.message.create({
          data: { sessionId, role: MessageRole.ASSISTANT, content: cleanText },
        }))
      }

      // W1-3 (ADR 13 Phase 1): fire-and-forget evidence event — never blocks the response.
      // Wave 2 (this build): real KG concept id + gradeBand when Explanation
      // Memory resolved them for this turn; otherwise the original Phase 1
      // proxy (subject slug, ADULT) so non-memory turns (school mode, subjects
      // without a canonical KG) are completely unaffected.
      appendEvidenceEvent({
        userId,
        sessionId,
        turnId:    assistantMessage.id,
        conceptId: memoryState?.conceptId ?? learnSession.subject.slug,
        language:  teachingLang,
        gradeBand: memoryState?.gradeBand ?? GradeBand.ADULT,
        category:  EvidenceCategory.ASSET_SHOWN,
        assetId:   assembled?.usedAssetIds[0],
        outcome:   'shown',
        strength:  0.0,
      })

      // Wave 0 Step 2 — Evidence Architecture §2 contracts (validation/08):
      // ASSESSMENT contract: every answer attempt writes correctness ×
      // latency-vs-baseline (server-measured, foundations/03 §7) × stated
      // behavioral confidence. The per-turn signal row is also the
      // decision-consequence JOIN enabler (loop L5): turn N's
      // TeachingStrategyEvent joins turn N+1's outcome by session ordering.
      if (teachingSignal && teachingSignal.correctness !== undefined) {
        const lastAssistantMsg = learnSession.messages.find((m) => m.role === MessageRole.ASSISTANT)
        const latencySec = lastAssistantMsg
          ? Math.max(0, Math.round((turnReceivedAt - new Date(lastAssistantMsg.createdAt).getTime()) / 1000))
          : null
        appendEvidenceEvent({
          userId,
          sessionId,
          turnId:    assistantMessage.id,
          conceptId: resolvedConceptId ?? memoryState?.conceptId ?? learnSession.subject.slug,
          language:  teachingLang,
          gradeBand: memoryState?.gradeBand ?? GradeBand.ADULT,
          category:  EvidenceCategory.PROBE_OUTCOME,
          outcome:   `${teachingSignal.correctness ? 'pass' : 'fail'}` +
                     `|conf=${teachingSignal.confidence ?? 'na'}` +
                     `|confusion=${teachingSignal.confusion === true}` +
                     (teachingSignal.probe ? `|placement=${teachingSignal.probe}` : ''),
          strength:  teachingSignal.correctness ? 1.0 : 0.0,
          rawScore:  latencySec ?? undefined,
        })
      }
      // MISCONCEPTION contract (student-state/03 §1: verbatim phrase evidence —
      // "the learner's own phrasing is the elicit-step script for the repair").
      if (teachingSignal?.phrase) {
        appendEvidenceEvent({
          userId,
          sessionId,
          turnId:    assistantMessage.id,
          conceptId: resolvedConceptId ?? memoryState?.conceptId ?? learnSession.subject.slug,
          language:  teachingLang,
          gradeBand: memoryState?.gradeBand ?? GradeBand.ADULT,
          category:  EvidenceCategory.MISCONCEPTION_DETECTED,
          outcome:   teachingSignal.phrase.slice(0, 200),
          strength:  0.5,
        })
      }

      // VOICE SIGNAL RECOVERY (Claude Recommendation #7): if this turn's
      // message originated from voice dictation, the client forwards the
      // timing signal recovered from Whisper's verbose_json output at STT
      // time (src/lib/voice/voiceSignal.ts) — segment durations, pauses,
      // and a log-probability-derived confidence proxy. No new evidence
      // schema: reuses the existing LEARNER_FEEDBACK category (already the
      // generic bucket for system-observed, non-correctness signals — see
      // the RECOVERY write below for the same pattern) with the same
      // pipe-delimited outcome-string convention PROBE_OUTCOME uses above.
      // Telemetry only — never read by any teaching-decision path; strength
      // is always 0.0 (not a correctness signal), and rawScore carries the
      // one scalar most useful for analytics queries (avgConfidence).
      if (voiceSignal) {
        appendEvidenceEvent({
          userId,
          sessionId,
          turnId:    assistantMessage.id,
          conceptId: resolvedConceptId ?? memoryState?.conceptId ?? learnSession.subject.slug,
          language:  teachingLang,
          gradeBand: memoryState?.gradeBand ?? GradeBand.ADULT,
          category:  EvidenceCategory.LEARNER_FEEDBACK,
          outcome:   `voice:duration=${voiceSignal.durationMs ?? 'na'}` +
                     `|speech=${voiceSignal.speechDurationMs ?? 'na'}` +
                     `|pauses=${voiceSignal.pauseCount}` +
                     `|totalPause=${voiceSignal.totalPauseMs}` +
                     `|longestPause=${voiceSignal.longestPauseMs}` +
                     `|conf=${voiceSignal.avgConfidence !== null ? voiceSignal.avgConfidence.toFixed(2) : 'na'}`,
          strength:  0.0,
          rawScore:  voiceSignal.avgConfidence ?? undefined,
        })
      }

      // RECOVERY evidence (validation/08 §2 RECOVERY contract, the L1
      // writer side: entering state × what was tried; what-followed arrives
      // as the next turn's signal, joinable by session ordering).
      if (recoveryKeyHoisted) {
        appendEvidenceEvent({
          userId,
          sessionId,
          turnId:    assistantMessage.id,
          conceptId: resolvedConceptId ?? memoryState?.conceptId ?? learnSession.subject.slug,
          language:  teachingLang,
          gradeBand: memoryState?.gradeBand ?? GradeBand.ADULT,
          category:  EvidenceCategory.LEARNER_FEEDBACK,
          outcome:   `recovery:${recoveryKeyHoisted}`,
          strength:  0.0,
        })

        // P4 — Affect budget: recovery turns emit no SIGNAL tag so
        // applySignalToEpisode() never sees them, leaving the episode
        // frozen. Synthesize a false-signal failure event here so the
        // session lifecycle advances toward CLOSING at the same rate as
        // a learner-signaled failure would.
        if (sessionEpisodeHoisted) {
          try {
            const { applySignalToEpisode } = await import('@/lib/teaching/sessionLifecycle')
            const syntheticSignal = { correctness: false as const, confidence: undefined, confusion: true }
            sessionEpisodeHoisted = applySignalToEpisode(sessionEpisodeHoisted, syntheticSignal, {
              isFirstLesson: firstLessonActiveHoisted,
            })
          } catch { /* non-fatal */ }
        }

        // P5 — Recovery memory: write a MistakeRecord so decide() enters
        // remediate mode on the next turn for this concept. Fire-and-forget.
        if (resolvedConceptId) {
          prisma.mistakeRecord.create({
            data: {
              userId,
              subjectSlug: subjectCode,
              topicSlug: resolvedConceptId,
              sessionId: learnSession.id,
              category: 'recovery_signal',
              questionId: resolvedConceptId,
            },
          }).catch(() => {})
        }
      }

      // HINT evidence (Phase 2 Learning Analytics gap — hints were never
      // captured as evidence at all; "hint effectiveness" had no data
      // source to compute from). Reuses the exact same LEARNER_FEEDBACK
      // pattern the RECOVERY/voice-signal writers above use. hintHoisted is
      // null both when no [HINT] tag was emitted AND when one was emitted
      // but suppressed by hintBiasHoisted — this only fires when a hint was
      // genuinely surfaced to the learner this turn. The next turn's
      // PROBE_OUTCOME is the what-followed half of the L1 join (same
      // pattern as recoverySuccessRates in learningAnalytics.ts).
      if (hintHoisted) {
        appendEvidenceEvent({
          userId,
          sessionId,
          turnId:    assistantMessage.id,
          conceptId: resolvedConceptId ?? memoryState?.conceptId ?? learnSession.subject.slug,
          language:  teachingLang,
          gradeBand: memoryState?.gradeBand ?? GradeBand.ADULT,
          category:  EvidenceCategory.LEARNER_FEEDBACK,
          outcome:   'hint:shown',
          strength:  0.0,
        })
      }

      // CTO iteration — Library mastery evidence loop. Before this block,
      // Library signals were captured as evidence but nothing updated
      // mastery state from them: a learner could traverse the entire
      // curriculum without any verified progression (Universal Principle 3:
      // correctness evidence must drive advancement; student-state/02:
      // evidence moves rungs). The SIGNAL is Library mode's conversational
      // checkpoint — this mirrors the school checkpoint's exact
      // TopicProgress semantics (same table, same scores, same
      // MASTERED/COMPLETED guard) so both modes accumulate comparable
      // evidence. Deliberately NEVER writes COMPLETED/MASTERED and never
      // exceeds the school checkpoint's 65 — conversational evidence alone
      // must not certify mastery (assessment/05 §3: gates need delayed +
      // transfer components; those stay owned by the existing completion/
      // assessment flows).
      if (resolvedConceptId && teachingSignal && teachingSignal.correctness !== undefined) {
        const signalCorrect = teachingSignal.correctness
        const signalConfidence = teachingSignal.confidence
        ;(async () => {
          const existing = await prisma.topicProgress.findUnique({
            where: { userId_subjectSlug_topicSlug: { userId, subjectSlug: subjectCode, topicSlug: resolvedConceptId } },
            select: { status: true },
          }).catch(() => null)
          if (existing?.status === 'MASTERED' || existing?.status === 'COMPLETED') return
          const score = signalCorrect ? 65 : 25
          await prisma.topicProgress.upsert({
            where: { userId_subjectSlug_topicSlug: { userId, subjectSlug: subjectCode, topicSlug: resolvedConceptId } },
            create: { userId, subjectSlug: subjectCode, topicSlug: resolvedConceptId, status: 'IN_PROGRESS', masteryPct: score, attempts: 1, lastScore: score },
            update: { status: 'IN_PROGRESS', masteryPct: score, lastScore: score, attempts: { increment: 1 } },
          }).catch(() => {})
          // The D1 grid's dangerous quadrant (foundations/02 §1): a
          // confident WRONG answer is a misconception signature, not a
          // slip. Writing the MistakeRecord routes it through machinery
          // that already runs for Library mode — detectMisconceptions()
          // reads this table, so next turn's prompt carries the
          // misconception block and the strategy selector can pick
          // MISCONCEPTION_REPAIR. Hesitant wrong answers (CONFUSED/
          // GUESSING quadrant) deliberately do NOT write one — that
          // would be a false misconception signal (decision-engine/02:
          // latency/confidence decides, "fast = misconception, hedged =
          // guess").
          if (!signalCorrect && signalConfidence === 'high') {
            await prisma.mistakeRecord.create({
              data: {
                userId, subjectSlug: subjectCode, topicSlug: resolvedConceptId,
                sessionId: learnSession.id, category: 'signal_confident_wrong', questionId: resolvedConceptId,
              },
            }).catch(() => {})
          }
        })().catch(() => {})
      }

      // W2-1 (ADR 08 §4a) + Wave 0 Steps 4/5: Library-mode snapshot persist.
      // Step 5 (Blueprint Phase 5): concept tracking now DEFAULTS ON so the
      // Teaching Engine decide() gate fires for Library mode — set
      // ENABLE_LIBRARY_CONCEPT_TRACKING=0 to revert to the observe-only cycle.
      // Step 4 (Blueprint Phase 3): the parsed SIGNAL and placement
      // verification state persist here, so the NEXT turn's decisions read
      // deterministic snapshot state instead of re-inferring from history
      // (decision-engine/08 §3's update contract — "the ledger is the truth").
      // libraryLessonPlanHoisted.currentConcept.nodeId is a subjectCatalog slug (not a canonical
      // KG ID) — use only libraryConceptNodeIdHoisted which Writer B seeds with the correct ID.
      if (process.env.ENABLE_LIBRARY_CONCEPT_TRACKING !== '0') {
        try {
          const newLibConceptId = libraryConceptNodeIdHoisted
          const conceptChanged = !!newLibConceptId && newLibConceptId !== snapshotCurrentConceptId

          // Placement verification fold (pure state machine — placementVerification.ts)
          let placementUpdate: Record<string, unknown> = {}
          // Robustness: if a probe answer arrived with correctness but the
          // LLM omitted the probe attribute, attribute it to the in-flight
          // pending probe rather than losing the evidence.
          const answeredProbe = teachingSignal?.probe ?? (placementProbeActive ? snapshotPendingProbe : null)
          if (placementProbeActive && answeredProbe && teachingSignal?.correctness !== undefined) {
            const { emptyPlacementState, recordProbeResult, levelBelow } = await import('@/lib/teaching/placementVerification')
            // Red-team fix D3: fold onto the inherited/current state, not
            // only this session's snapshot.
            const prev = placementPrevHoisted ?? emptyPlacementState()
            const nextState = recordProbeResult(prev, {
              probe: answeredProbe,
              correctness: teachingSignal.correctness,
              confidence: teachingSignal.confidence,
            })
            placementUpdate = { placementVerification: nextState, pendingPlacementProbe: null }
            // placement/01 §2: downward adjustment is automatic and SILENT
            // (placement/02 §4 — the learner never hears about it). Upward
            // never happens here. No fake completions are written — only the
            // default starting position moves (placement.ts constraint).
            if (nextState.verified && nextState.outcome === 'adjusted_down' && placementLevelHoisted) {
              const { getKnowledgeGraph } = await import('@/lib/curriculum/knowledgeGraph')
              const { computeCurriculumEntryOrder } = await import('@/lib/curriculum/placement')
              const graph = getKnowledgeGraph(subjectCode)
              if (graph) {
                const lowered = computeCurriculumEntryOrder(graph, levelBelow(placementLevelHoisted))
                prisma.studentProgress.update({
                  where: { userId_subjectCode: { userId, subjectCode: progressCode } },
                  data: { currentLesson: lowered },
                }).catch(() => {})
              }
            }
          }

          // A probe question asked this turn goes in flight for the next turn.
          // Red-team fix D2: only when the LLM actually spoke this turn — a
          // memory-served (assembled) turn never delivered the probe question,
          // so persisting it would make the next turn's await-block assert a
          // question that was never asked.
          if (placementAskedProbeHoisted && !assembled && Object.keys(placementUpdate).length === 0) {
            placementUpdate = { pendingPlacementProbe: placementAskedProbeHoisted }
          }
          // Red-team fix D3: a verification concluded in an earlier session is
          // copied into THIS session's snapshot once, so subsequent turns skip
          // the cross-session lookup (assessment/02 §1: placement runs once).
          if (placementInheritedHoisted && placementPrevHoisted && Object.keys(placementUpdate).length === 0) {
            placementUpdate = { placementVerification: placementPrevHoisted }
          }

          const signalUpdate = teachingSignal ? { lastSignal: { ...teachingSignal, at: new Date().toISOString() } } : {}

          // P1: accumulate session failure count — increments on recovery
          // utterances AND false SIGNAL outcomes so escalation has a real
          // count (decision-engine/05: per-failure ladders).
          const failureThisTurn = recoveryKeyHoisted !== null || teachingSignal?.correctness === false
          const newSessionFailureCount = failureThisTurn ? snapshotSessionFailureCount + 1 : snapshotSessionFailureCount
          const failureCountUpdate = failureThisTurn ? { sessionFailureCount: newSessionFailureCount } : {}

          // Session lifecycle fold (07 §1/§6): this turn's signal advances
          // the episode machine — OPENING→CORE on the first answered item,
          // CORE→CLOSING when the affect budget is spent (1 in lesson one).
          // P4: sessionEpisodeHoisted may have been updated by the recovery
          // block above (synthetic signal), so we use the (possibly updated)
          // hoisted value directly and skip re-applying applySignalToEpisode
          // for recovery turns to avoid double-counting.
          let episodeUpdate: Record<string, unknown> = {}
          if (sessionEpisodeHoisted) {
            if (recoveryKeyHoisted) {
              // P4: episode already advanced via synthetic signal above
              episodeUpdate = { sessionEpisode: sessionEpisodeHoisted }
            } else {
              const { applySignalToEpisode } = await import('@/lib/teaching/sessionLifecycle')
              const nextEpisode = applySignalToEpisode(sessionEpisodeHoisted, teachingSignal, {
                isFirstLesson: firstLessonActiveHoisted,
              })
              if (sessionEpisodeFreshHoisted || nextEpisode !== sessionEpisodeHoisted) {
                episodeUpdate = { sessionEpisode: nextEpisode }
              }
            }
          }

          // Phases C–G (2026-07-14): persist the conversation state folded
          // with this turn's evidence. Mastery-gate rework: the fold now
          // happens ONCE, upstream at the completion gate (so the gate and
          // the persisted state can never disagree) — this block only
          // persists that value. The re-fold fallback covers the gate's
          // catch path, where conversationStateAfterTurnHoisted stays null.
          let conversationStateUpdate: Record<string, unknown> = {}
          if (conversationStateAfterTurnHoisted) {
            conversationStateUpdate = { conversationState: conversationStateAfterTurnHoisted }
          } else if (conversationStateHoisted) {
            const { advanceConversationState, repliesWithQuestion, isPriorKnowledgeProbe } = await import('@/lib/teaching/conversationState')
            conversationStateUpdate = {
              conversationState: advanceConversationState(conversationStateHoisted, {
                askedQuestion: repliesWithQuestion(cleanText),
                signalCorrect: teachingSignal?.correctness ?? null,
                recoveryFired: recoveryKeyHoisted !== null,
                learnerRequest: learnerRequestHoisted,
                isPriorKnowledgeProbe: isPriorKnowledgeProbe(cleanText),
                strategyUsed: selectedStrategyHoisted ?? undefined,
                signalConfidence: teachingSignal?.confidence as 'high' | 'medium' | 'low' | undefined,
              }),
            }
          }
          if (teachingHistoryHoisted && selectedStrategyHoisted !== null) {
            const { updateTeachingHistory, computeFrustration, computeMastery } = await import('@/lib/teaching/teachingHistory')
            const updatedHistory = updateTeachingHistory(teachingHistoryHoisted, {
              strategiesUsed: [...new Set([...teachingHistoryHoisted.strategiesUsed, selectedStrategyHoisted])],
              explanationCount: teachingHistoryHoisted.explanationCount + 1,
              frustration: computeFrustration(
                conversationStateHoisted?.consecutiveFailures ?? 0,
                conversationStateHoisted?.remediationCount ?? 0,
              ),
              mastery: computeMastery(
                conversationStateHoisted?.correctAtCheck ?? 0,
                conversationStateHoisted?.correctAtPractice ?? 0,
              ),
            })
            conversationStateUpdate = { ...conversationStateUpdate, teachingHistory: updatedHistory }
          }

          // EOS M1 — Evidence Spine: append this turn's typed events to the
          // parallel append-only log. Fire-and-forget, idempotent, additive:
          // nothing reads the spine yet and the turn's behavior is identical
          // with the spine on, off (ENABLE_EVIDENCE_SPINE=0), or failing.
          try {
            const { emitTurn } = await import('@/lib/evidence-spine/turnEmitter')
            const lastAssistantForLatency = learnSession.messages.find((m) => m.role === MessageRole.ASSISTANT)
            const phaseAfter = (conversationStateUpdate.conversationState as { phase?: string } | undefined)?.phase ?? null
            emitTurn(prisma, {
              learnerId: userId,
              sessionId,
              turnId: assistantMessage.id,
              messageLength: message.length,
              latencyFromPrevTurnMs: lastAssistantForLatency
                ? Math.max(0, turnReceivedAt - new Date(lastAssistantForLatency.createdAt).getTime())
                : null,
              assistantLength: cleanText.length,
              assistantAskedQuestion: (await import('@/lib/teaching/conversationState')).repliesWithQuestion(cleanText),
              provider: assembled ? 'memory' : 'llm',
              signal: teachingSignal ?? null,
              resolvedConceptId: resolvedConceptId ?? null,
              recoveryKey: recoveryKeyHoisted,
              recoveryEscalationRung: snapshotSessionFailureCount >= 4 ? 2 : snapshotSessionFailureCount >= 2 ? 1 : 0,
              sessionFailureCount: snapshotSessionFailureCount,
              autonomyRequested: evidenceAutonomyHoisted,
              decisionMove: evidenceMoveHoisted,
              decisionPhaseBefore: conversationStateHoisted?.phase ?? null,
              decisionPhaseAfter: phaseAfter,
              workedExampleFirst: evidenceWorkedExampleFirstHoisted,
              stageCeiling: evidenceStageCeilingHoisted,
              provenance: [
                ...(recoveryKeyHoisted ? [`recovery:${recoveryKeyHoisted}`] : []),
                ...(evidenceAutonomyHoisted ? ['autonomy'] : []),
                ...(evidenceMoveHoisted ? ['turn-directive'] : []),
                ...(firstLessonActiveHoisted ? ['first-lesson'] : []),
                // K6 — record EOS verifier outcomes as provenance atoms
                ...(eosVerifierEvents.some((e) => e.kind === 'OutputRejected') ? ['verifier:rejected'] : []),
                ...(eosVerifierUsedTemplate ? ['verifier:template-fallback'] : []),
                ...(eosVerifierAttempts === 2 && !eosVerifierUsedTemplate ? ['verifier:rerendered'] : []),
                // Mastery gate — an unauthorized [LESSON_COMPLETE] was stripped
                ...(masteryCompletionSuppressedHoisted ? ['mastery-gate:suppressed'] : []),
                ...(learnerRequestHoisted ? [`learner-request:${learnerRequestHoisted}`] : []),
                // Stance Enforcement (Claude Recommendation #6) — every
                // violation this turn, for observability only (never
                // rewrites prose beyond the completion-tag strip above).
                ...stanceViolationsHoisted.map((code) => `stance:${code}`),
              ],
              freshSessionBoundary: sessionEpisodeFreshHoisted,
              boundaryGapMs: null,
              lessonCompleted: cleanText.includes('[LESSON_COMPLETE]'),
            })
          } catch { /* spine is strictly parallel — never affects the turn */ }

          if (conceptChanged || teachingSignal || Object.keys(placementUpdate).length > 0 || Object.keys(episodeUpdate).length > 0 || Object.keys(failureCountUpdate).length > 0 || Object.keys(conversationStateUpdate).length > 0) {
            // Atomic JSONB merge (same pattern as the school snapshot above).
            const libSnapshotDelta = {
              ...(conceptChanged ? { currentConceptNodeId: newLibConceptId } : {}),
              ...signalUpdate,
              ...placementUpdate,
              ...episodeUpdate,
              ...failureCountUpdate,
              ...conversationStateUpdate,
            }
            prisma.$executeRaw`
              UPDATE "LearnSession"
              SET "contextSnapshot" = COALESCE("contextSnapshot", '{}'::jsonb) || ${JSON.stringify(libSnapshotDelta)}::jsonb
              WHERE id = ${sessionId}
            `.catch(() => {})
          }
        } catch (err) {
          console.warn('[learn/chat] wave-0 library persist skipped:', err)
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

      // Lesson-sync bug fix: surface the exact lesson context this response
      // was generated from, so the client can reconcile Roadmap/Learn Panel
      // state to it on every turn. studentProgress.currentLesson (read above
      // into lessonCtx) is the single source of truth for "active lesson" —
      // previously only the client's own completion-triggered PATCH updated
      // curriculumProgress, so any failed/dropped PATCH left the Roadmap
      // showing a stale lesson while Tutor Max (which always re-reads this
      // DB value fresh, every turn) had already moved on.

      // Educational Brain side-car: fire-and-forget, never awaited, never blocks response.
      // Activated only when ENABLE_EDUCATIONAL_BRAIN_PIPELINE=true; zero-overhead when off.
      void import('@/lib/educationalBrain/pipeline').then(({ runEducationalBrainPipeline }) =>
        runEducationalBrainPipeline({ userId, sessionId, subjectSlug: subjectCode, userMessage: message })
      ).catch(() => {})

      // Mastery gate — the client's single source of truth for whether the
      // Complete/Next actions are evidence-backed (Bug 9: roadmap, chat,
      // and mastery always read the same server-computed state).
      let masterySummary: import('@/lib/teaching/masteryGate').MasterySummary | undefined
      if (conversationStateAfterTurnHoisted) {
        try {
          const { buildMasterySummary } = await import('@/lib/teaching/masteryGate')
          masterySummary = buildMasterySummary(conversationStateAfterTurnHoisted, {
            completionSuppressed: masteryCompletionSuppressedHoisted,
            gatePending: masteryGatePendingHoisted,
          })
        } catch { /* summary is informational — never blocks the turn */ }
      }

      return NextResponse.json({
        success: true, text: cleanText, provider,
        // P0 (Explanation Memory serving metadata — observability only).
        // `provider` above is unchanged and remains the stable field
        // (memory/groq/yandex/fallback); these describe HOW/WHY, never a
        // new provider value.
        memoryServingMode, memoryConfidence, memoryAssetId, memoryConceptId,
        memoryExactGradeMatch, memoryFallbackUsed,
        memoryFallbackReason: memoryFallbackReasonCode,
        visual: responseVisual ?? undefined, visualSpec: detectedVisualSpec ?? undefined,
        sceneSpec: detectedSceneSpec ?? undefined,
        dynamicVisualizationCode: dynamicVisualizationCode ?? undefined,
        inlinePractice: undefined,
        hint: hintHoisted ?? undefined,
        lessonOrder: lessonCtx?.currentLesson ?? undefined,
        completedLessons: lessonCtx?.completedLessons ?? undefined,
        mastery: masterySummary,
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
