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
import { MessageRole, type Prisma } from '@prisma/client'
// ── M1: the visualization runtime fails closed ───────────────────────────────
// Four legacy post-LLM visualization authorities used to run here and each
// seeded a figure from the TUTOR'S OWN PROSE rather than from the concept:
// planVisualTeaching(), the parametric scene router, buildSceneSpec() and the
// dynamic-code engine. Measured consequences on real explanations — a Total
// Internal Reflection lesson saying "ray diagram" routed to ray_optics (a
// mirror), Calorimetry saying "bodies collide" routed to `collision`, Wave
// Interference saying "real image" routed to ray_optics, Viscosity saying
// "initial velocity" routed to `projectile`.
//
// They are no longer consulted at request time. resolveVisualForTurn() is the
// ONE runtime visual authority and the single writer of the response's visual
// channels. A resolver that declines AND a resolver that throws now produce the
// same thing: NO VISUAL. There is deliberately no switch between them.
//
// The generator/engine modules stay on disk — they remain authoring backends
// for future asset production; only their runtime authority was removed.
import type { VisualSpec } from '@/lib/visuals/visualSpec'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { decide } from '@/lib/teaching-engine'
import { appendEvidenceEvent, GradeBand, EvidenceCategory } from '@/lib/teaching/evidence/evidenceEngine'
import { isEduBrainEnabled } from '@/lib/curriculum/subjectRollout'
import {
  assembleLesson, buildStudentState, ingestGeneratedLesson, isExplanationMemoryEnabled, resolveContentRegister,
  type StudentState, type AssembledLesson,
} from '@/lib/teaching/assets'
import { stripIpaNotation } from '@/lib/text/ipaSanitizer'
import {
  pickCurrentTopicSlug, selectCurrentLesson, foldProgressionMetrics,
  readProgressionMetrics, progressionTags, needsSignalRepair,
} from '@/lib/teaching/progressionIntegrity'

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
  // ROOT-CAUSE FIX (returning-learner prompt leak): the client had a concept
  // the server could not see. LessonScreen builds an internal INSTRUCTION for
  // the resume/opening turn and sent it with showInUI=false — but that flag is
  // client-render-only, so the server still persisted it as a USER message.
  // On the next page load the history was read back from the DB and the raw
  // instruction ("The student has returned... Greet them warmly...") rendered
  // as a chat bubble to the learner.
  //
  // `ephemeral` makes "this is a machine instruction, not a learner utterance"
  // explicit in the contract, so the two halves of the same intent cannot
  // disagree again. lesson-init/route.ts already got this right by never
  // persisting its instruction; this gives every other caller the same
  // guarantee instead of a second, silently-wrong path.
  ephemeral: z.boolean().optional(),
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
    const { sessionId, message, lastExplanationRead, voiceSignal, ephemeral } = schema.parse(body)

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

    // Only a real learner utterance is persisted. An ephemeral instruction is
    // still sent to the model (it is what triggers the opening) but is never
    // written to the transcript, so it can never be replayed to the learner.
    // The ASSISTANT reply is persisted either way — the teaching is real.
    if (!ephemeral) {
      await withRetry(() => prisma.message.create({
        data: { sessionId, role: MessageRole.USER, content: message },
      }))
    }

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
    // S1 (Runtime Redesign Mission Part 4): the turn-history ring buffer
    // feeding V-DUP-EXACT/V-DUP-NEAR/V-DUP-QUESTION/V-REC-REPEAT/V-OSCILLATE.
    // Rides the same contextSnapshot persist as every other counter here —
    // no new store, no migration.
    const { readTurnHistory: readTurnHistoryShared } = await import('@/lib/kernel/verifier/history')
    const snapshotTurnHistory = readTurnHistoryShared(snapshot?.turnHistory)
    // Session lifecycle boundary (07 §8 rule 1), computed ONCE here and reused
    // by the episode block below. The newest loaded message predates this
    // turn's user insert (see the fetch above), so the gap is genuine learner
    // inactivity. Hoisted to this point because the failure counter directly
    // below is scoped to the episode and therefore needs the same answer — two
    // separate boundary computations over one fact is the shape of bug this
    // very counter had.
    const { isNewEpisode: isNewEpisodeShared, episodeFailureCount } = await import('@/lib/teaching/sessionLifecycle')
    const lastMessageAtMs = learnSession.messages[0]?.createdAt
      ? new Date(learnSession.messages[0].createdAt).getTime()
      : null
    const episodeBoundary = isNewEpisodeShared(lastMessageAtMs, turnReceivedAt)
    // P1: failure counter driving the recovery escalation ladder
    // (buildRecoveryBlock's rungs: 1 = vary the wording, 2 = stop asking,
    // 4 = close the concept for today).
    //
    // Scoped to the EPISODE, not to the LearnSession row. A LearnSession is
    // resumed for up to 24 hours (/api/sessions), while an episode boundary is
    // a 30-minute inactivity gap — so one row spans many episodes, and this
    // counter previously accumulated across all of them with no reset anywhere
    // in the codebase. deriveEpisode() already resets the OTHER affect budget
    // (sessionEpisode.visibleFailures) at exactly this boundary, per 07 §8
    // rule 1 ("past = new session, budgets reset"); this one was left behind,
    // so the two disagreed about how many failures "this session" has had.
    //
    // The consequence was a returning learner's FIRST stumble of a fresh
    // episode being handled as their fifth: buildRecoveryBlock read 4+ and
    // emitted "AFFECT BUDGET EXHAUSTED — close this concept for today, do NOT
    // attempt another explanation", on the same turn the OPENING block was
    // telling the tutor to open with an engineered win. Recovery skipped its
    // entire ladder and exited into a close it had not earned.
    const snapshotSessionFailureCount = episodeFailureCount(snapshot?.sessionFailureCount, episodeBoundary)
    // Loop 2: narrative tracker state — hookDelivered/coreTaught/hookResolved
    const snapshotNarrativeState = (snapshot?.narrativeState && typeof snapshot.narrativeState === 'object')
      ? snapshot.narrativeState as import('@/lib/teaching/narrativeTracker').NarrativeState
      : null
    // W2-2 (ADR 09): lesson stage progress carried across turns
    const snapshotLessonStageProgress = (
      snapshot?.lessonStageProgress &&
      typeof snapshot.lessonStageProgress === 'object' &&
      typeof (snapshot.lessonStageProgress as Record<string, unknown>).conceptId === 'string'
    ) ? snapshot.lessonStageProgress as {
      conceptId: string; planSignature: string; stageIndex: number; totalStages: number
    } : null

    // ADR 15: Rendered Reality Model — read the visual-state log from
    // contextSnapshot at turn start.  Additive: empty log = today's behavior.
    const { readRRM } = await import('@/lib/teaching/renderedRealityModel')
    const snapshotRRMLog = readRRM(snapshot)

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
      // RC-A: `orderBy` is load-bearing, not cosmetic. Without it Postgres
      // may return these rows in any order, and an UPDATE relocates a row
      // under MVCC — so the row a `.find(status === 'IN_PROGRESS')` returned
      // could change between turns, flapping the resolved concept identity
      // and resetting the whole ConversationState. Deterministic ordering
      // here plus pickCurrentTopicSlug() at every selection site closes it.
      // See src/lib/teaching/progressionIntegrity.ts and
      // src/tests/progressionStall.test.ts.
      prisma.topicProgress.findMany({
        where: { userId, subjectSlug: subjectCode },
        orderBy: [{ updatedAt: 'desc' }, { topicSlug: 'asc' }],
      }),
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
    // Hoisted above the lesson synthesis below, which needs it to localize
    // unit/lesson titles. Depends only on `profile`, loaded far earlier.
    const teachingLang = (profile?.teachingLanguage ?? 'en') as 'ru' | 'en' | 'hi'

    try {
      const { getKnowledgeGraph, localizeKGModuleTitle, localizeKGNodeTitle } =
        await import('@/lib/curriculum/knowledgeGraph')
      const graph = getKnowledgeGraph(subjectCode)
      if (graph) {
        let order = 1
        // /api/curriculum already localizes module titles at its own identical
        // synthesis (see its `unitTitle: localizeKGModuleTitle(...)`), but this
        // copy did not — so the same unit rendered as "Основы химии" in the
        // curriculum panel and "Chemical Foundations" in the lesson footer,
        // from two code paths that are otherwise line-for-line equivalent.
        const syntheticLessons = graph.modules.flatMap((module, modIdx) =>
          module.nodes.map((node, nodeIdx) => ({
            subjectCode,
            unit: modIdx + 1,
            unitTitle: localizeKGModuleTitle(module.title, teachingLang),
            lesson: nodeIdx + 1,
            lessonTitle: localizeKGNodeTitle(node.slug, node.title, teachingLang),
            lessonGoal: (node as any).description ?? node.title,
            order: order++,
            topicSlug: node.slug,
          }))
        )
        if (syntheticLessons.length > 0) {
          const topicProgressRows = topicProgressRowsShared
          // OBJECTIVE 2: StudentProgress.currentLesson is the authoritative
          // owner of which lesson is open — it is what completion advances and
          // what the UI renders. The IN_PROGRESS row is a lagging cache and is
          // consulted only when the owner has no usable value. Reading the
          // cache first is why "Continue" after a completed lesson resumed an
          // older unfinished topic instead of starting the next lesson. See
          // selectCurrentLesson's header.
          // PLACEMENT ENTRY ORDER — the third reader finally joins the other two.
          //
          // THE PRODUCTION DEFECT THIS CLOSES. A brand-new advanced learner has
          // no StudentProgress row yet. /api/curriculum and getDashboardV2Data
          // both answer that state with `computeCurriculumEntryOrder(graph,
          // level)` — for physics/advanced that is order 32, "Conservative and
          // Non-Conservative Forces". THIS resolver had no such default, so
          // selectCurrentLesson fell through to its last tier, lessons[0], and
          // answered lesson 1, "SI Units and Measurement".
          //
          // Both answers were then used at once, in the same session (verified
          // in production, 2026-08-09): the client opened lesson 32 and the
          // tutor announced "Today you're starting Lesson 32 of 238 … Conservative
          // and Non-Conservative Forces", while every server-side identity —
          // lessonCtx, resolvedConceptId, convConceptId, and therefore the
          // excursion's returnToConceptId — said phys.meas.units. When the
          // learner finished a Viscosity excursion the tutor "returned" to SI
          // Units and taught it, because that is the lesson the server had been
          // holding all along. The excursion recorded its anchor faithfully; the
          // anchor it was given was the wrong lesson.
          //
          // Same helper, same condition (`only when no real row exists`) and
          // same precedence as /api/curriculum's own `progress ?? defaultProgress`
          // — this introduces no second placement rule and no second lesson
          // identity. A learner WITH a row is completely unaffected.
          let placementEntryOrder: number | null = null
          if (!studentProgress) {
            try {
              const { computeCurriculumEntryOrder } = await import('@/lib/curriculum/placement')
              const { normalizeToCanonicalLevel } = await import('@/lib/curriculum/levels')
              placementEntryOrder = computeCurriculumEntryOrder(
                graph, normalizeToCanonicalLevel(profile?.currentLevel),
              )
            } catch { placementEntryOrder = null }   // degrade to the old behaviour
          }
          const currentLesson =
            selectCurrentLesson(
              syntheticLessons,
              studentProgress?.currentLesson ?? placementEntryOrder,
              topicProgressRows,
              studentProgress?.activeLessonSlug,
            )
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
            // OBJECTIVE 2: same authoritative-owner precedence as the KG branch.
            const currentLesson =
              selectCurrentLesson(syntheticLessons, studentProgress?.currentLesson, topicProgressRows, studentProgress?.activeLessonSlug)
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

    const profileCountry = (profile as any)?.country ?? 'global'
    // VESTIGIAL — routeAI no longer routes on country, and there is no
    // YandexGPT provider. This comment used to read "Route to YandexGPT
    // whenever EITHER signal says Russian", which stopped being true when
    // 52152a18 ("feat(ai): production AI provider layer") replaced
    // Groq/YandexGPT with Gemini + OpenRouter. The provider chain is now
    // Gemini -> OpenRouter -> Groq for EVERY language, and src/lib/ai/router.ts
    // consumes `country` in exactly one place: a console.log. No provider file
    // reads it at all.
    //
    // Kept, not deleted: it is still the correct value to log, removing it
    // would touch three call-site signatures for no behavioural gain, and if a
    // Russia-specific provider is ever reinstated this is where that decision
    // belongs. Yandex IS still used for Russian TEXT-TO-SPEECH (/api/tts,
    // gated on lang === 'ru') — that is a separate, live integration and is
    // unaffected by any of the above.
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

    // P5: the Coach interview's learner profile. Injected immediately after
    // the base prompt so every later block (anchor, teaching contract,
    // recovery) can override it — the profile describes the learner's
    // standing preferences, which a live signal about THIS turn must always
    // outrank. Renders '' for learners who predate the interview, so existing
    // sessions are byte-for-byte unchanged.
    {
      const { buildCoachAdaptationBlock } = await import('@/lib/coach/learnerProfile')
      systemPrompt += buildCoachAdaptationBlock(profile ?? null)
    }

    // Loop 1: Topic Anchoring — inject CONCEPT ANCHOR block right after
    // the base prompt, before any other blocks. Uses the already-resolved
    // lessonCtx + resolvedConceptId from the curriculum resolution above.
    try {
      const { buildConceptAnchor, buildConceptAnchorBlock } = await import('@/lib/teaching/conceptAnchor')
      const anchor = buildConceptAnchor(
        resolvedConceptId,
        lessonCtx?.lessonTitle,
        lessonCtx?.lessonGoal,
        lessonCtx?.unitTitle,
      )
      if (anchor) systemPrompt += buildConceptAnchorBlock(anchor)
    } catch {
      // non-fatal — concept anchor is purely additive
    }

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
    // The visuals THIS CONCEPT legally has (VisualEntry.all), or null when the
    // concept has no registry entry. Read from the same registry lookup that
    // already computes availableVisualHoisted, so there is no second source of
    // truth — it is the concept's own list, used to bound what the LLM's
    // VISUAL:<type> tag is allowed to select. See resolveResponseVisual().
    let allowedVisualsHoisted: readonly string[] | null = null
    let forceVisualRenderHoisted = false
    // Visual Resolver V2 — the single visualization authority. Computed ONCE,
    // pre-LLM, from concept identity (never from the model's own prose). When
    // present it supersedes the four legacy post-LLM pipelines entirely; the
    // legacy path remains intact and is used whenever this is null (resolver
    // disabled, or no concept in scope). See src/lib/teaching/visual/.
    let visualDecisionHoisted: import('@/lib/teaching/visual/types').VisualDecision | null = null
    // Generations this session has already spent, read from the snapshot before
    // the resolver runs and written back after it. Hoisted because the read and
    // the write sit in different blocks of this handler.
    let visualGenerationCountHoisted = 0
    // OFF-LESSON CONCEPT EXCURSION (teaching/excursion.ts). The Teaching Engine
    // owns the lifecycle; this carries its decision to the snapshot persist at
    // the end of the turn. Null when the excursion block never ran.
    let excursionDecisionHoisted: import('@/lib/teaching/excursion').ExcursionDecision | null = null
    // THE LESSON IS PAUSED. Hoisted so the response-side attribution points —
    // the state fold, the completion gate and the TopicProgress checkpoint,
    // all far below this block — read the same single answer the prompt side
    // used, instead of each re-deriving it (or, as before, not knowing at all).
    let excursionActiveHoisted = false
    /** Title of the excursion's target concept, or null on an ordinary turn. */
    let excursionTeachingTitleHoisted: string | null = null
    let conceptPreviouslyMasteredHoisted = false
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
    // P2: this turn's parsed multiple-choice question, hoisted for the same
    // reason as hintHoisted — attached to the JSON response once cleanText is
    // finalized, so the client can render tappable options.
    let mcqHoisted: import('@/lib/teaching/mcq').TutorMCQ | null = null
    // The MCQ the PREVIOUS turn asked, read back from the session snapshot so
    // this turn's reply can be graded against its stored correctIndex. Written
    // at the end of the turn that asks; cleared once graded, so one question is
    // never graded twice.
    let pendingMcqHoisted: import('@/lib/teaching/mcq').TutorMCQ | null = null
    // P6.6: the lesson-completion payload for this turn, when the final
    // required concept closed. Hoisted like the others so it can be attached
    // to the JSON response once cleanText is finalized.
    let lessonCompletionHoisted:
      import('@/lib/teaching/lessonCompletion').LessonCompletionPayload | null = null
    // P3: the session's asked-question ledger, read from contextSnapshot before
    // the prompt is built and re-persisted with this turn's questions folded in.
    let questionLedgerHoisted: import('@/lib/teaching/repetitionGuard').QuestionLedger =
      { fingerprints: [], recent: [] }
    // How many OUTAGE turns have happened in a row. Persisted so the degraded
    // path can escalate its wording instead of repeating one content-free
    // template forever (the observed six-identical-replies failure).
    let consecutiveOutagesHoisted = 0
    // P13: this lesson's attempt is already COMPLETED (P6.6). Read once at
    // prompt-build time and fed to the CUE, which is what lets the EXISTING
    // decision ladder rule D-0a fire — the route never decides this itself.
    let lessonCompletedHoisted = false
    let teachingHistoryHoisted: import('@/lib/teaching/teachingHistory').TeachingHistory | null = null
    let selectedStrategyHoisted: number | null = null
    let retrievalCacheHoisted: import('@/lib/teaching/retrievalCache').RetrievalCache | null = null
    let conversationDecisionHoisted: import('@/lib/teaching/conversationDecision').ConversationDecision | null = null
    // Option B — Teaching Sequence Executor (physics only): the runtime-
    // selected current step, persisted at end of turn so the next turn
    // resumes from it instead of restarting or improvising.
    let teachingStepUpdateHoisted: { teachingStepIndex: number; teachingStepConceptId: string } | null = null

    // Visual detection — OBSERVATION SEED ONLY (no prompt injection).
    //
    // Runtime-architecture audit (2026-07-30): this used to be the legacy
    // Sprint-BW visual path, upgraded in place to buildVisualIntelligenceBlock
    // by commit e7ae0400. That same commit ALSO added a second, registry-first
    // visual block on the conversation-state-machine path (~line 1690). Both
    // ran unconditionally on every turn, so every prompt carried two VISUAL
    // INTELLIGENCE blocks — and, after ADR 15, two RENDERED REALITY blocks.
    //
    // They disagreed on WHICH visual: this site keyword-matches on the
    // unit/lesson title only, while the conversation-state site consults the
    // Visualization Registry first (getConceptVisualType(conceptId)) and falls
    // back to this exact detectVisual() call. The later site is therefore a
    // strict superset — it can never be worse, and is concept-accurate where
    // this one guesses from a title. Two contradictory directives in one
    // prompt is the documented cause of wrong visuals, narration/render
    // desync, and hallucinated labels.
    //
    // Resolution: the conversation-state-machine site is the SINGLE OWNER of
    // visual + RENDERED REALITY prompt injection. This site keeps only its
    // cueObservations seed — the later site overwrites both fields when it
    // runs, so the seed is observable only on the degraded path where the
    // wave-0 brain try/catch aborts before reaching it.
    try {
      const { detectVisual } = await import('@/lib/school/visuals/detectVisual')
      const availableVisual = detectVisual({
        subjectSlug: subjectCode,
        chapterTitle: lessonCtx?.unitTitle ?? '',
        lessonTitle: lessonCtx?.lessonTitle,
      })
      cueObservations.availableVisual = availableVisual
      cueObservations.visualDetectionRan = true
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
          const { detectMisconceptions, buildMisconceptionBlock, buildRemediationStrategy, isRemediationWarranted } = await import('@/lib/school/adaptive/misconceptionEngine')
          const misconceptions = await detectMisconceptions(userId, subjectCode, lessonSlugs, '')
          // Observation is unconditional — the CUE must still SEE the learner's
          // misconception history every turn, and the Decision Engine reads it
          // from here. Only the PROMPT INJECTION below is gated.
          cueObservations.misconceptions = misconceptions

          // REMEDIATION IS A RESPONSE TO EVIDENCE, NOT A LESSON STAGE.
          //
          // detectMisconceptions() looks back 30 DAYS across EVERY concept in
          // the subject and knows nothing about this turn. So once a learner had
          // made any mistake anywhere in the subject, this block — plus an
          // explicit "run this remediation" strategy for a HIGH-confidence
          // entry — was appended to the system prompt on EVERY turn for the
          // rest of the session, no matter how the learner was actually doing.
          //
          // Production: the learner answered "Oxygen" correctly and was
          // immediately given a large misconception lecture; answered "2 : 1"
          // correctly and was immediately given another scripted block. The
          // TURN DIRECTIVE had decided a single next move, and this block sat
          // above it ordering a second, contradictory action.
          //
          // The gate uses evidence the route has already computed at this
          // point, and the SAME repeated-failure threshold the runtime already
          // uses elsewhere for worked-example-first and FOUNDATION_REBUILD
          // (sessionFailureCount >= 2). Nothing new is introduced and no
          // threshold is invented.
          const lastSignalForRemediation = (snapshot?.lastSignal && typeof snapshot.lastSignal === 'object')
            ? snapshot.lastSignal as { correctness?: boolean; confusion?: boolean }
            : null
          const remediationWarranted = isRemediationWarranted({
            lastSignalCorrect: lastSignalForRemediation?.correctness ?? null,
            lastSignalConfusion: lastSignalForRemediation?.confusion ?? null,
            sessionFailureCount: snapshotSessionFailureCount,
          })

          const block = remediationWarranted ? buildMisconceptionBlock(misconceptions) : null
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
            // MILESTONE 6 SUPPRESSION — this block was missed.
            //
            // dispatcher.ts's contract: when the Brain runtime is ON, the
            // Brain's execution block is the prompt's SINGLE decision
            // authority, and "the legacy decision blocks ... are suppressed at
            // their injection sites. Their engines keep RUNNING ... they just
            // no longer speak with decision authority in the prompt."
            //
            // It was applied to three sites (TEACHING ENGINE DECISION, the
            // LAST-ANSWER READ overlay, buildActionProcedureBlock) and to
            // buildTeachingActionBlock. It was never applied here — and of
            // those, buildTeachingActionBlock and buildLessonPlanBlock are now
            // stubs returning '', so ACTIVE TEACHING STRATEGY is the last LIVE
            // block that speaks with decision authority alongside the TURN
            // DIRECTIVE.
            //
            // What it emits is a second, competing pedagogical objective:
            //   "Action directive: <STRATEGY_ACTION_DIRECTIVE[type]>"
            // whose values are literally teaching actions, independent of the
            // TURN DIRECTIVE's nextMove —
            //   FOUNDATION_REBUILD    'Lead with a worked example before theory.'
            //   ACCELERATED_GROWTH    'Challenge with a harder variant after explaining.'  (TWO actions)
            //   APPLICATION_FOCUS     'End this response with the inline practice question...'
            //   CONFIDENCE_CORRECTION 'Open with a real-world analogy first.'
            // plus a plural "Instructions for this session:" list and
            // "Apply this strategy throughout the session", which makes it
            // persist on EVERY turn regardless of what the turn directive
            // decided. That is how EXPLANATION + WORKED EXAMPLE + ASSESSMENT
            // survive into one response.
            //
            // The strategy ENGINE is untouched: teachingStrategy is still
            // computed and strategyHoisted / outputBias / hintBias below still
            // consume it, exactly as the Milestone 6 contract requires. Only
            // its prompt VOICE is suppressed, and only when the Brain owns
            // decisions (flag off ⇒ byte-identical to before).
            const { legacyDecisionBlocksSuppressed: _legacySuppressed } =
              await import('@/lib/understanding/dispatcher')
            if (!_legacySuppressed()) {
              systemPrompt += buildTeachingStrategyBlock(teachingStrategy)
            }

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
              // OBJECTIVE 2 — the second owner, and the one that made a
              // COMPLETED lesson keep teaching.
              //
              // This was snapshot-FIRST and re-seeded from itself, so once
              // written the pointer could never follow a lesson transition. On
              // completion, /api/curriculum/progress advances
              // StudentProgress.currentLesson but does NOT touch this pointer —
              // its reset lives inside the `!mastered && isNewCompletion` (skip)
              // branch only. That endpoint's own comment states the mechanism:
              // "that pointer always wins when a Library turn resolves its
              // active concept ... so the next chat message kept teaching the
              // same unmastered concept". The skip path was given a clear-site;
              // genuine completion never was.
              //
              // Making the pointer DERIVED from the resolved lesson fixes every
              // transition at once — complete, skip, forward nav, backward nav
              // all move StudentProgress.currentLesson — instead of adding a
              // clear-site per path. resolvedConceptId is null for subjects
              // with no canonical KG (Spanish, JavaScript, …), so those keep
              // exactly the previous snapshot-first order.
              libraryConceptNodeIdHoisted = resolvedConceptId
                ?? snapshotCurrentConceptId
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
      const currentTopicSlug = pickCurrentTopicSlug(topicProgressRowsShared)
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
        // A.7: check if the current concept was previously mastered
        const currentConceptForMastery = libraryConceptNodeIdHoisted ?? snapshotCurrentConceptId ?? resolvedConceptId ?? null
        if (currentConceptForMastery && completedSet.has(currentConceptForMastery)) {
          conceptPreviouslyMasteredHoisted = true
        }

        // ?? undefined: this consumer's signature is `string | undefined`,
        // matching the `?.topicSlug` it previously received.
        const inProgressSlug = pickCurrentTopicSlug(topicProgressRows) ?? undefined
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
      // OBJECTIVE 2: libraryConceptNodeIdHoisted FIRST. It is now seeded
      // resolvedConceptId-first (see its assignment above), so it already
      // carries the lesson the learner has open, falling back to the snapshot.
      // Reading the raw snapshot first was a precedence INVERSION against
      // Explanation Memory, which has always read resolvedConceptId first —
      // that let decide() and the conversation state machine keep running on
      // the COMPLETED concept while authored content was served for the new
      // one. School Mode leaves libraryConceptNodeIdHoisted null and so falls
      // through to exactly the previous value.
      const activeConceptIdForDecide = libraryConceptNodeIdHoisted ?? snapshotCurrentConceptId
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

                // Option B — Teaching Sequence Executor (physics only): the
                // runtime, not the LLM, decides which authored step is
                // current. See src/lib/teaching/teachingSequenceExecutor.ts.
                // firstLessonGuard's own block (injected later, and whose
                // text already declares it "OVERRIDES ANY CONFLICTING
                // GUIDANCE ABOVE") takes precedence by the existing
                // block-ordering convention when both apply — no extra
                // gating is needed here.
                let currentStepBlock: string | null = null
                const {
                  hasTeachingPlan, readTeachingStepIndex, teachingStepIndexForPhase,
                  buildTeachingStepContract, renderTeachingStepContractBlock,
                } = await import('@/lib/teaching/teachingSequenceExecutor')
                if (hasTeachingPlan(ebContext)) {
                  // Read directly from learnSession.contextSnapshot rather than
                  // the outer `snapshot` binding — this block later declares
                  // its own `const snapshot` (teaching memory snapshot), whose
                  // block-scoped TDZ shadows the outer variable for the whole
                  // enclosing block, not just after its declaration line.
                  const rawSnapshot = learnSession.contextSnapshot as Record<string, unknown> | null
                  // readTeachingStepIndex is still the owner of "is this the
                  // first turn of this concept" (it compares the persisted
                  // concept id). Its stepIndex is no longer used to ADVANCE.
                  const { isFirstTurnOfConcept } =
                    readTeachingStepIndex(rawSnapshot, activeConceptIdForDecide)
                  // STAGE HAS ONE OWNER: ConversationState.phase.
                  //
                  // This used to call advanceTeachingStepIndex(priorStepIndex,
                  // priorLastSignal) — a second stage machine advancing on
                  // different evidence than the canonical one, and provably
                  // disagreeing with it (see teachingStepIndexForPhase's note:
                  // a wrong answer moves the phase DOWN and moved this pointer
                  // UP, and the pointer was terminal at ASSESSMENT so it
                  // rendered the assessment contract forever).
                  //
                  // The phase is read from the SAME persisted state the stage
                  // machine itself reads, keyed on the same concept, so a
                  // concept change still resets to OBSERVE -> DISCOVERY and the
                  // explicit first-turn reset below stays consistent with it.
                  const { readConversationState } = await import('@/lib/teaching/conversationState')
                  const canonicalPhase = readConversationState(
                    rawSnapshot?.conversationState, activeConceptIdForDecide,
                  ).phase
                  const nextStepIndex = isFirstTurnOfConcept
                    ? 0
                    : teachingStepIndexForPhase(canonicalPhase)
                  const contract = buildTeachingStepContract(ebContext!, nextStepIndex, isFirstTurnOfConcept)
                  currentStepBlock = renderTeachingStepContractBlock(contract)
                  teachingStepUpdateHoisted = {
                    teachingStepIndex: nextStepIndex,
                    teachingStepConceptId: activeConceptIdForDecide,
                  }
                }

                const block = buildBlueprintContextBlock(contentResult.content, ebContext, currentStepBlock)
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
            // Bug 1 fix: only inject INTERACTIVE_QUESTIONING procedure when
            // the server-decided next move is 'ask'. On 'teach' and 'show'
            // turns the TURN DIRECTIVE (injected below) forbids questions —
            // the action procedure contradicted it and the LLM followed the
            // earlier specific instruction, ignoring the later prohibition.
            {
              const { buildActionProcedureBlock } = await import('@/lib/teaching/actionProcedures')
              const { readConversationState: _readCS, decideNextMove: _decideMove } = await import('@/lib/teaching/conversationState')
              // Use the raw contextSnapshot (outer scope) — the inner `snapshot`
              // here is TeachingMemorySnapshot, which has no conversationState.
              const _rawCtx = learnSession.contextSnapshot as Record<string, unknown> | null
              const _earlyState = _readCS(_rawCtx?.conversationState, activeConceptIdForDecide)
              const _earlyMove = _decideMove(_earlyState, {
                recoveryTurn: false, // recoveryKeyHoisted not yet computed; recovery block overrides at end anyway
                workedExampleFirst: snapshotSessionFailureCount >= 2 || strategyHoisted === 'FOUNDATION_REBUILD',
              })
              if (_earlyMove === 'ask') {
                systemPrompt += buildActionProcedureBlock(decision.action_type)
              }
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
    // P1-1 (Phase 1 Stage 1): this turn's DECLARED AttemptVector, parsed from
    // the TEACHING INTENT tag. Null when the composer declared nothing — which
    // is "not captured", never an empty intent.
    let attemptVectorHoisted: import('@/lib/evidence-spine/types').AttemptVectorV2 | null = null
    // WP-8 / AH-1: this turn's DECLARED Adaptation State Vector. Null when no
    // dial was declared — "not set", never a default (§21.2: never fabricate a
    // state read). Captured only; no stage reads it on the live path.
    let adaptationStateHoisted: import('@/lib/teaching/adaptation/asv').AdaptationStateVector | null = null
    // K3 — the mapped kernel move + its budget, one owner, three consumers.
    let kernelPolicyMoveHoisted: import('@/lib/kernel/policyMove').MappedMove | null = null
    let kernelMaxQuestionsHoisted: 0 | 1 = 0
    let routeMaxParagraphsHoisted: number | null = null
    // K3 — parity between the route's decision and the shadow pipeline's.
    let kernelParityMetricsHoisted:
      import('@/lib/kernel/parity').ParityMetrics | null = null
    let kernelParityTagsHoisted: string[] = []
    // K4 — parity between the route's decision and the POLICY ENGINE's.
    // Separate from kernelParity above on purpose: that one measures whether
    // a stage extraction is behaviour-identical, this one measures whether
    // the rule pack would teach the same turn. Same shape, opposite fixes.
    let enginePolicyParityHoisted:
      import('@/lib/kernel/parity').ParityMetrics | null = null
    let enginePolicyTagsHoisted: string[] = []
    // K7 — Frustration machine state after this turn (persisted on snapshot).
    let frustrationAfterTurnHoisted:
      import('@/lib/kernel/frustration').FrustrationMachine | null = null
    let frustrationBandHoisted: 'calm' | 'strained' | 'flooded' | null = null
    // ISS-13 — re-derivations for the optimistic-concurrency retry.
    //
    // Every ACCUMULATIVE snapshot field is a fold over the snapshot read at
    // the start of this turn. If a concurrent turn commits before we persist,
    // that base no longer exists and re-applying the folded RESULT discards
    // the other turn's increment. Each fold therefore registers how to redo
    // itself against whatever the snapshot actually is at write time.
    //
    // Registered AT THE FOLD SITE, never in a central list: only the code
    // that folded knows how to re-fold, and a list here would be a second
    // owner of every fold in the turn.
    const snapshotRederivers: Array<(fresh: Record<string, unknown>) => Record<string, unknown>> = []
    // EOS v2 Capability Model — session-tier state + this concept's demands.
    let capabilityStateHoisted:
      import('@/lib/teaching/capabilityModel').CapabilityState | null = null
    let requiredCapabilitiesHoisted:
      import('@/lib/teaching/capabilityModel').CapabilityId[] = []
    // This turn's attributed capability observations — computed once by the
    // Capability Model, folded into the session tier, and handed to the spine
    // emitter. Never re-derived at the emit site.
    let capabilityObservationsHoisted:
      import('@/lib/teaching/capabilityModel').CapabilityObservation[] = []
    // Band 2 (questionLegality.ts): which invariant, if any, removed ASK from
    // the legal set this turn. Folded into the session's legality metrics at
    // persist time — the automatically-measurable half of the layer.
    let legalityBlockedReasonHoisted:
      import('@/lib/teaching/questionLegality').LegalityReason | null = null
    let evidenceStageCeilingHoisted: number | null = null
    let evidenceWorkedExampleFirstHoisted = false
    let evidenceAutonomyHoisted = false
    let navigationRequestHoisted = false
    // The learner's turn was a bare acknowledgement — a receipt ("got it") or
    // a forward request ("go", "continue", "ready"). Computed ONCE from
    // isLowSignalAcknowledgement() and reused by the turn directive and by
    // both conversation-state fold sites, so prompt assembly and the state
    // machine can never disagree about whether this turn was an
    // acknowledgement.
    let lowSignalAckHoisted = false
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
    // S1 — this turn's appended entry into the history ring (V-DUP-*/
    // V-OSCILLATE rules' persisted state), merged into the final snapshot
    // delta alongside conversationStateUpdate below.
    let turnHistoryUpdateHoisted: Record<string, unknown> | null = null
    // STEP 2 — progression telemetry provenance atoms for this turn.
    let progressionTagsHoisted: string[] = []
    // RC-D — did the freeze-breaker fire this turn? Recorded as provenance.
    let signalRepairFiredHoisted = false
    // S2 — the objective ledger for the current concept (attempts,
    // assessments, completion, stall detection). Read pre-turn near
    // conversationStateHoisted above; folded with this turn's evidence and
    // persisted alongside conversationStateUpdate below.
    let objectiveStateHoisted: import('@/lib/teaching/objectiveModel').ObjectiveState | null = null
    // Loop 2: narrative arc tracking — gates lesson completion on core-taught milestone
    let narrativeStateHoisted: import('@/lib/teaching/narrativeTracker').NarrativeState | null = null
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
        const { isFirstLessonContext, buildFirstLessonBlock, buildFirstLessonCloseBlock } = await import('@/lib/teaching/firstLessonGuard')
        const { emptyPlacementState, nextProbe, buildPlacementProbeBlock, buildPlacementAwaitBlock } = await import('@/lib/teaching/placementVerification')

        // Step 2: the OBSERVE signal (decision-engine/08 step 1; Blueprint Phase 3)
        systemPrompt += buildSignalInstruction()

        // P2: assessment questions are multiple choice by default. Sits beside
        // the OBSERVE signal because it is the same mechanism — one
        // machine-readable tag per turn, parsed and stripped server-side.
        const { buildMcqInstruction } = await import('@/lib/teaching/mcq')
        systemPrompt += buildMcqInstruction()

        // P3: the do-not-repeat contract — the questions already asked this
        // session, quoted back, plus the banned stock formulations and the
        // "confusion → explain, new example, new MCQ" rule that replaces
        // re-asking. Built from the persisted ledger read above.
        // The ledger is read HERE, from the session snapshot, rather than from
        // questionLedgerHoisted: that variable is populated further down (with
        // conversationState) and is still empty at prompt-build time, which
        // would have made this whole block inert. Same for the acknowledgement
        // flag — lowSignalAckHoisted is assigned after this point, so the
        // predicate is evaluated directly off `message` here. Both are pure
        // reads, so computing them early changes nothing else.
        // P6.5: the lesson summary, rendered from PERSISTED evidence rather
        // than from model memory. Reads the lesson attempt (the single owner of
        // lesson-scoped outcomes), so the summary survives a refresh and the
        // tutor can only verbalise concepts that were actually demonstrated —
        // it cannot invent coverage. Silent on failure: a summary is never
        // worth costing the learner their turn.
        try {
          const { lessonKeyFor } = await import('@/lib/teaching/lessonAttempt')
          const summaryLessonKey = lessonKeyFor({ lessonOrder: lessonCtx?.currentLesson ?? null })
          if (summaryLessonKey) {
            const { latestLessonAttempt } = await import('@/lib/teaching/lessonAttemptStore')
            const attempt = await latestLessonAttempt(prisma, {
              userId, subjectSlug: learnSession.subject.slug, lessonKey: summaryLessonKey,
            })
            if (attempt) {
              const { summaryFromAttempt } = await import('@/lib/teaching/lessonAttempt')
              const { buildLessonSummaryBlock } = await import('@/lib/teaching/lessonSummary')
              systemPrompt += buildLessonSummaryBlock(summaryFromAttempt(attempt))
              // P6.6: an already-completed lesson must not be taught into.
              // The learner starts the next lesson deliberately; the tutor
              // delivers the close and stops.
              if (attempt.status === 'COMPLETED') {
                lessonCompletedHoisted = true
                const { buildLessonCompleteBlock } = await import('@/lib/teaching/lessonCompletion')
                systemPrompt += buildLessonCompleteBlock()
              }
            }
          }
        } catch { /* summary is advisory — never blocks the turn */ }

        // P6: the lesson-flow contract — the purpose of the next question, the
        // never-repeat-the-failed-explanation recovery rule, and the concept
        // budget's close-and-move-on instruction when it is spent. Derived
        // purely from the conversation state the engine already maintains, so
        // it adds no second progress tracker. Read from the snapshot here for
        // the same ordering reason as the ledger below.
        {
          const { buildLessonFlowBlock } = await import('@/lib/teaching/conceptBudget')
          const { readConversationState: readCSForFlow } = await import('@/lib/teaching/conversationState')
          const flowConceptId = snapshotCurrentConceptId ?? resolvedConceptId ?? null
          systemPrompt += buildLessonFlowBlock(
            readCSForFlow(snapshot?.conversationState, flowConceptId),
          )
        }

        // P7: teaching memory — what has ALREADY been used on this concept, so
        // the tutor builds on it instead of restarting. Read from the SAME
        // owner that already records it (TeachingHistory); no new store.
        try {
          const { readTeachingHistory: readTHForPrompt, buildTeachingMemoryBlock } =
            await import('@/lib/teaching/teachingHistory')
          const memConceptId = snapshotCurrentConceptId ?? resolvedConceptId ?? null
          // Hoisted rather than discarded: this is the only UNCONDITIONAL read
          // of the teaching history on the turn (the other assignment, in the
          // 'explain_differently' branch below, fires on a small minority of
          // turns). The Explanation Memory already-read guard needs it on
          // every turn, and re-reading the same snapshot key twice would make
          // two readers of one owner. That later branch still reassigns with
          // its own conceptId exactly as before — unchanged.
          teachingHistoryHoisted = readTHForPrompt(snapshot?.teachingHistory, memConceptId)
          systemPrompt += buildTeachingMemoryBlock(teachingHistoryHoisted)
        } catch { /* memory is advisory — never blocks the turn */ }

        const { buildAntiRepetitionBlock, readQuestionLedger: readLedgerForPrompt } =
          await import('@/lib/teaching/repetitionGuard')
        const { isLowSignalAcknowledgement: isAckForPrompt } =
          await import('@/lib/teaching/conversationState')
        questionLedgerHoisted = readLedgerForPrompt(snapshot?.questionLedger)
        // Same snapshot, same turn — the pending MCQ rides the mechanism the
        // ledger already uses rather than introducing a second store.
        const rawPending = (snapshot as { pendingMcq?: unknown } | null)?.pendingMcq
        if (rawPending && typeof rawPending === 'object') {
          const p = rawPending as { question?: unknown; options?: unknown; correctIndex?: unknown }
          if (typeof p.question === 'string' && Array.isArray(p.options)
            && p.options.every((o) => typeof o === 'string')
            && typeof p.correctIndex === 'number'
            && p.correctIndex >= 0 && p.correctIndex < p.options.length) {
            pendingMcqHoisted = { question: p.question, options: p.options as string[], correctIndex: p.correctIndex }
          }
        }
        systemPrompt += buildAntiRepetitionBlock(questionLedgerHoisted, {
          learnerAcknowledged: isAckForPrompt(message),
        })

        // P1-1 (Phase 1 Stage 1): the TEACHING INTENT declaration. Sits beside
        // the OBSERVE signal because it is the same mechanism pointed the other
        // way — SIGNAL declares what was observed of the learner, ATTEMPT
        // declares what the composer intended. Capture only: nothing reads the
        // vector, so no teaching decision differs (§14.2 "No behaviour changes
        // at all"). Both tags are stripped before storage and before the client.
        // Kill switch (ENABLE_ATTEMPT_CAPTURE=0): when disabled the instruction
        // is not appended, so the prompt is byte-identical to pre-P1-1.
        // Stripping below is NOT gated — see the parse site.
        const { buildAttemptVectorInstruction, isAttemptCaptureEnabled } = await import('@/lib/teaching/attemptVectorSignal')
        if (isAttemptCaptureEnabled()) systemPrompt += buildAttemptVectorInstruction()

        // P0-1 (lesson introduction defect): computed once, ahead of the
        // session-opening block below, so a non-first lesson's OPENING can
        // require an explicit objective/why-it-matters/connection instead of
        // only the first-lesson block covering that ground (lesson one only).
        // Reused verbatim at Step 3 below — no duplicate isFirstLessonContext call.
        //
        // The stage machine has not run yet at this point in the turn, so the
        // phase is read from the SAME persisted state it will read
        // (readConversationState, keyed on the same resolved concept). No
        // second source of truth, and a concept change still resets to OBSERVE
        // — which correctly keeps the first-lesson protocol active for a
        // genuinely fresh lesson-one concept.
        const firstLessonPhase = await (async () => {
          try {
            const { readConversationState } = await import('@/lib/teaching/conversationState')
            return readConversationState(
              snapshot?.conversationState,
              resolvedConceptId ?? snapshotCurrentConceptId ?? null,
            ).phase
          } catch { return null }
        })()
        const isFirstLessonContextHoisted = isFirstLessonContext({
          isSchoolMode: false,
          currentLevel: profile?.currentLevel,
          currentLessonOrder: lessonCtx?.currentLesson,
          completedLessonCount: studentProgress?.completedLessons?.length ?? 0,
          // The stage machine's phase — the missing "progress within lesson
          // one" dimension. Without it the protocol re-asserted itself on
          // every turn and D0c preempted the whole progression ladder. See
          // isFirstLessonContext()'s own note for the production evidence.
          phase: firstLessonPhase,
        })

        // ── OFF-LESSON CONCEPT EXCURSION — decided FIRST ─────────────────
        // Placed ahead of the session-lifecycle and prompt blocks below
        // because they must all know whether the lesson is paused. It used to
        // sit further down, next to the visual resolver, which is why the
        // SESSION CLOSE block (injected here, above it) could still order the
        // tutor to wrap the session up mid-excursion.
        // THE RETURN ANCHOR COMES FROM THE AUTHORITATIVE LESSON, NOT A POINTER.
        //
        // `resolvedConceptId` is this turn's answer from selectCurrentLesson —
        // activeLessonSlug -> StudentProgress.currentLesson -> placement entry
        // order -> first lesson, the same ladder /api/curriculum and the
        // dashboard walk. It is the only one of these three that is derived
        // from the learner's real position.
        //
        // `snapshotCurrentConceptId` is a per-session cache that can hold an
        // older concept (it is seeded from the module's ENTRY concept when a
        // session starts before any lesson identity resolves), and reading it
        // ahead of the authoritative value is how a stale pointer becomes the
        // lesson an excursion promises to return to. libraryConceptNodeIdHoisted
        // is itself `resolvedConceptId ?? snapshot ?? entry`, so this ordering
        // agrees with it in every case except that one — where this is right and
        // it is wrong.
        const excursionLessonConceptId =
          resolvedConceptId ?? libraryConceptNodeIdHoisted ?? snapshotCurrentConceptId ?? null
        const excursionPriorAskedQuestion = await (async () => {
          try {
            const { readConversationState } = await import('@/lib/teaching/conversationState')
            const prior = readConversationState(snapshot?.conversationState, excursionLessonConceptId)
            return (prior.questionsAskedSinceTeach ?? 0) > 0
          } catch { return false }
        })()
        // ── OFF-LESSON CONCEPT EXCURSION ──────────────────────────────────
        // TWO IDENTITIES, decided here, before anything reads either:
        //
        //   convConceptId          — the curriculum LESSON. Owns progress.
        //   teachingTargetConceptId — what this turn TEACHES.
        //
        // They are the same value on an ordinary turn. They diverge when the
        // learner explicitly asks about another concept ("explain viscosity")
        // while sitting in a lesson: the Teaching Engine opens an excursion,
        // the turn teaches the requested concept, and the lesson is PAUSED —
        // StudentProgress, activeLessonSlug, TopicProgress and mastery are
        // all keyed to convConceptId and are untouched by any of this.
        //
        // Before this, one variable meant both things, so a learner's own
        // question could never become the turn's subject: the request was
        // resolved (if at all) inside the visual layer and discarded.
        const { resolveRequestedConceptId } = await import('@/lib/teaching/concept/requestedConcept')
        const { parseExcursionState, decideExcursion, buildExcursionDirective } =
          await import('@/lib/teaching/excursion')
        const requestedConceptIdThisTurn = resolveRequestedConceptId(message, excursionLessonConceptId, subjectCode)
        // THE TOPIC THE CURRICULUM COULD NOT NAME.
        //
        // Only consulted when the resolver returned nothing. `namedTopicUnknownTo`
        // is deterministic and looks nothing up, so it names a topic the KG has
        // never heard of exactly as well as one it has — and it withholds a name
        // for anything about the topic ALREADY being taught, which is what keeps
        // "why?", "I am lost" and ordinary in-lesson follow-ups where they are.
        // See excursion.ts's UNRESOLVED TOPICS note.
        //
        // The comparison text is what this turn is actually teaching: the
        // lesson's own words, plus the open excursion's topic when there is one,
        // so a follow-up about the side topic continues it instead of restarting
        // it under a slightly different name.
        const priorExcursionState = parseExcursionState(
          (learnSession.contextSnapshot as Record<string, unknown> | null)?.excursion,
        )
        const requestedTopicTitleThisTurn = await (async () => {
          if (requestedConceptIdThisTurn) return null
          const { namedTopicUnknownTo } = await import('@/lib/teaching/visual/requestedTopic')
          const { getKGNode } = await import('@/lib/curriculum/knowledgeGraph')
          const lessonNode = excursionLessonConceptId ? getKGNode(excursionLessonConceptId) : null
          const activeTopic = priorExcursionState.active
            ? (priorExcursionState.targetTopicTitle
              ?? getKGNode(priorExcursionState.targetConceptId ?? '')?.title
              ?? '')
            : ''
          const taughtText = [
            lessonNode?.title ?? '',
            lessonNode?.description ?? '',
            activeTopic,
          ].join(' ')
          return namedTopicUnknownTo(message, taughtText)?.title ?? null
        })()
        const excursionDecision = decideExcursion({
          state: priorExcursionState,
          message,
          lessonConceptId: excursionLessonConceptId,
          requestedConceptId: requestedConceptIdThisTurn,
          requestedTopicTitle: requestedTopicTitleThisTurn,
          lastAssistantAskedQuestion: excursionPriorAskedQuestion,
        })
        excursionDecisionHoisted = excursionDecision
        const teachingTargetConceptId = excursionDecision.targetConceptId ?? excursionLessonConceptId
        // An excursion whose target is a topic the KG cannot name. It has no
        // concept id at all, so `teachingTargetConceptId` above has fallen back
        // to the LESSON's — correct for the blocks that need some concept to
        // exist, and wrong for anything that would then present the lesson's
        // material as the answer to the learner's question. The visual layer is
        // the one place that would, so it is given nothing to draw.
        const unresolvedTopicExcursion =
          excursionDecision.state.active && !excursionDecision.targetConceptId
        console.log('[excursion]', {
          lesson: excursionLessonConceptId,
          target: teachingTargetConceptId,
          requested: requestedConceptIdThisTurn,
          requestedTopic: requestedTopicTitleThisTurn,
          unresolvedTopic: excursionDecision.state.targetTopicTitle,
          transition: excursionDecision.transition,
          active: excursionDecision.state.active,
          returnTo: excursionDecision.returnToConceptId,
          turns: excursionDecision.state.turns,
        })
        // ONE attribution question, asked once. Everything that would credit
        // THIS turn to the lesson — the phase/mastery ladder, the
        // TopicProgress checkpoint, the completion gate — reads this rather
        // than re-deciding. See excursion.ts's turnCountsForLesson().
        const { turnCountsForLesson } = await import('@/lib/teaching/excursion')
        const lessonTurnForLesson = turnCountsForLesson(excursionDecision)
        excursionActiveHoisted = !lessonTurnForLesson
        // The title of what this turn actually teaches. Null unless an
        // excursion is open, so ordinary turns keep the lesson's own title.
        // On an unresolved-topic excursion the title is the learner's own
        // words — there is no KG node to read one from, and reading the
        // lesson's would name the wrong thing in every block that uses this.
        excursionTeachingTitleHoisted = excursionDecision.state.active
          ? (excursionDecision.targetTopicTitle
            ?? (await import('@/lib/curriculum/knowledgeGraph')).getKGNode(teachingTargetConceptId ?? '')?.title
            ?? null)
          : null

        // Session lifecycle (07 §8): boundary measured from real message
        // timestamps — the newest loaded message predates this turn's user
        // insert, so the gap is genuine learner inactivity, never LLM-claimed.
        {
          const { deriveEpisode, buildOpeningBlock, buildAffectCloseBlock, detectExplicitFinishRequest, forceClosing } = await import('@/lib/teaching/sessionLifecycle')
          const lastMsgAt = lastMessageAtMs
          const prevEpisode = (snapshot?.sessionEpisode && typeof snapshot.sessionEpisode === 'object')
            ? snapshot.sessionEpisode as import('@/lib/teaching/sessionLifecycle').SessionEpisode
            : null
          const prevLastSignal = (snapshot?.lastSignal && typeof snapshot.lastSignal === 'object')
            ? snapshot.lastSignal as { correctness?: boolean }
            : null
          // Computed once at the top of the turn, alongside the failure counter
          // it also scopes — see episodeBoundary's definition there.
          const boundary = episodeBoundary
          sessionEpisodeHoisted = deriveEpisode(prevEpisode, boundary, turnReceivedAt, prevLastSignal)
          sessionEpisodeFreshHoisted = boundary
          // 07 §6 extension: an explicit, unambiguous "finish it now" outranks
          // the affect-failure-budget trigger — close immediately this turn
          // rather than waiting for a failure count to accumulate.
          if (detectExplicitFinishRequest(message)) {
            sessionEpisodeHoisted = forceClosing(sessionEpisodeHoisted)
          }
          if (boundary && sessionEpisodeHoisted.phase !== 'CLOSING') {
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
          } else if (sessionEpisodeHoisted.phase === 'CLOSING' && !excursionActiveHoisted) {
            // Affect budget spent earlier this session (07 §6): the close
            // instruction holds until a boundary resets the episode.
            //
            // NOT while an excursion is open. This block orders the tutor to
            // stop and "forecast the next session", and mid-excursion that
            // rendered in production as "let's pause on that for today — next
            // time we will return to our lesson on scalar and vector
            // quantities", while the learner was still asking about the side
            // concept they had requested. The protection is DEFERRED, not
            // removed: the episode stays CLOSING, so the close fires on the
            // first lesson turn after the excursion ends.
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

        // C.18-22: Math Speech layer — injected once for STEM subjects.
        {
          const { isStemSubject, buildMathSpeechBlock } = await import('@/lib/teaching/mathSpeech')
          if (isStemSubject(subjectCode)) {
            systemPrompt += buildMathSpeechBlock()
          }
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
            isLowSignalAcknowledgement,
            detectNavigationRequest, buildNavigationAcknowledgementBlock,
            detectLearnerQuestion, classifyAcknowledgementContext,
          } = await import('@/lib/teaching/conversationState')
          const {
            masteryVerified, buildMasteryGateBlock,
            detectLearnerRequest, buildLearnerRequestBlock,
            buildUnreadExplanationBlock,
          } = await import('@/lib/teaching/masteryGate')
          const { decideTeachingGranularity } = await import('@/lib/teaching/teachingGranularity')
          const convConceptId = libraryConceptNodeIdHoisted ?? snapshotCurrentConceptId ?? resolvedConceptId ?? null
          conversationStateHoisted = readConversationState(snapshot?.conversationState, convConceptId)


          // S2 (Runtime Redesign Mission Part 5): objective state resets on
          // the same conceptId change conversationState does — one
          // objective per concept, see objectiveModel.ts's scope note.
          const { readObjectiveState } = await import('@/lib/teaching/objectiveModel')
          objectiveStateHoisted = readObjectiveState(snapshot?.objectiveState, convConceptId)

          // Loop 2: read narrative state for this concept's teaching arc
          {
            const { readNarrativeState } = await import('@/lib/teaching/narrativeTracker')
            narrativeStateHoisted = readNarrativeState(snapshotNarrativeState)
          }

          // P3 — Learner autonomy, now mastery-gated (Bug 4): "next topic"
          // with verified mastery is honored as before; before mastery it
          // becomes an explicit Continue Learning / Skip Anyway choice —
          // the model is FORBIDDEN from emitting [LESSON_COMPLETE] (and the
          // response-side gate strips it regardless). Never a silent skip.
          if (detectAutonomyRequest(message)) {
            evidenceAutonomyHoisted = true
            // An open excursion pauses the lesson, so "move on" cannot mean
            // "finish the lesson" this turn: both branches below invite
            // [LESSON_COMPLETE] (buildAutonomyBlock outright, the narrative
            // close as its precondition). The gate would strip the tag anyway
            // — this stops the tutor from writing the closing summary that
            // produced "That's SI Units and Measurement finished" on top of a
            // Viscosity figure. The excursion directive already tells it what
            // to do with the request.
            if (excursionActiveHoisted) {
              // nothing: the EXCURSION DIRECTIVE governs this turn.
            } else if (masteryVerified(conversationStateHoisted)) {
              // Loop 2: even with mastery verified, if the narrative arc is
              // incomplete, inject a close block instead of full autonomy —
              // the tutor must circle back before concluding.
              const { narrativeComplete, buildNarrativeCloseBlock } = await import('@/lib/teaching/narrativeTracker')
              if (!narrativeComplete(narrativeStateHoisted!)) {
                systemPrompt += buildNarrativeCloseBlock(lessonCtx?.lessonTitle ?? 'this concept')
              } else {
                systemPrompt += buildAutonomyBlock()
              }
            } else {
              systemPrompt += buildMasteryGateBlock()
              masteryGatePendingHoisted = true
            }
          } else if (detectNavigationRequest(message) && !excursionActiveHoisted) {
            // A.2: explicit navigation ("teach me about X", "go back to Y")
            // is acknowledged warmly; mastery-verified → auto-complete so
            // the system can navigate; otherwise note what's left.
            navigationRequestHoisted = true
            systemPrompt += buildNavigationAcknowledgementBlock()
          }

          const workedExampleFirst =
            snapshotSessionFailureCount >= 2 || strategyHoisted === 'FOUNDATION_REBUILD'
          const { decideNextMoveDetailed } = await import('@/lib/teaching/conversationState')
          // ── EOS v2 Capability Model (arch §4.2) ──────────────────────────
          // Session tier per CAPABILITY_MODEL_DESIGN §3.1: the state rides
          // contextSnapshot, read here and folded at persist. Stated inability
          // is server-detected from the learner's own words and trusted
          // instantly (design §2.1) — never LLM-detected.
          const capMod = await import('@/lib/teaching/capabilityModel')
          capabilityStateHoisted = capMod.readCapabilityState(snapshot?.capabilities)
          // Durable tier: contextSnapshot is per-LearnSession, so a new session
          // starts with an empty cache. Rehydrate it from the evidence spine —
          // the spine's projection is itself produced by foldCapability over
          // the durable log, so this cannot diverge from replay and cannot
          // double-count. Cold cache only: one extra read per NEW session, none
          // per turn.
          if (Object.keys(capabilityStateHoisted).length === 0) {
            try {
              const { replayStudentView } = await import('@/lib/evidence-spine/replay')
              const view = await replayStudentView(prisma, userId)
              capabilityStateHoisted = capMod.hydrateFromProjection(view.capability)
            } catch {
              // Fail-open: an unavailable spine means no inherited capabilities,
              // never a broken turn. An empty state blocks nothing.
            }
          }
          const statedNo = capMod.detectStatedInability(message)
          if (statedNo.length > 0) {
            const statedObs = statedNo.map((capabilityId) => ({
              capabilityId, direction: 'stated_no' as const, diagnostic: true,
            }))
            // Durable too: a learner saying "I can't divide" must survive the
            // session, so the observation goes to the spine as well as the cache.
            capabilityObservationsHoisted = statedObs
            capabilityStateHoisted = capMod.foldCapabilityState(capabilityStateHoisted, statedObs)
          }
          requiredCapabilitiesHoisted = capMod.requiredCapabilities(convConceptId)
          // Band 2 (questionLegality.ts): evidenced prior knowledge makes a
          // diagnostic question answerable even before anything is taught.
          // A resumed concept with real progress is exactly that case.
          const hasEvidencedPriorKnowledge =
            (studentProgress?.completedLessons?.length ?? 0) > 0
          const moveDecision = decideNextMoveDetailed(conversationStateHoisted, {
            recoveryTurn: recoveryKeyHoisted !== null,
            workedExampleFirst,
            legality: {
              hasEvidencedPriorKnowledge,
              capabilityState: capabilityStateHoisted ?? undefined,
              requiredCapabilities: requiredCapabilitiesHoisted,
            },
          })
          const nextMove = moveDecision.move
          legalityBlockedReasonHoisted = moveDecision.blockedReason
          // The length budget the route actually applies this turn. Hoisted so
          // the parity observer compares the REAL value rather than restating
          // the formula — a restated formula would agree with itself even if
          // the route changed.
          routeMaxParagraphsHoisted = firstLessonActiveHoisted
            ? 2
            : responseBudget(
                contentRegister,
                conversationStateHoisted.consecutiveFailures,
                // The success term. ConversationState is already the owner of
                // demonstrated mastery on this concept; the budget simply had
                // no input for it, so pacing could never respond to success.
                conversationStateHoisted.correctAtCheck + conversationStateHoisted.correctAtPractice,
              )
          // Single move owner (kernel/policyMove) — computed once here and
          // reused by the shadow pipeline and the verifier context, so the two
          // can never disagree about what move this turn is.
          {
            const { toPolicyMove, maxQuestionsFor } = await import('@/lib/kernel/policyMove')
            kernelPolicyMoveHoisted = toPolicyMove({
              recoveryKey: recoveryKeyHoisted,
              episodePhase: sessionEpisodeHoisted?.phase,
              ladderMove: nextMove,
            })
            kernelMaxQuestionsHoisted = maxQuestionsFor(kernelPolicyMoveHoisted)
          }
          // EOS M1: record the decision facts for the spine (observation only).
          evidenceMoveHoisted = nextMove
          evidenceWorkedExampleFirstHoisted = workedExampleFirst
          const { PHASE_MAX_QUESTION_STAGE } = await import('@/lib/teaching/conversationState')
          evidenceStageCeilingHoisted = PHASE_MAX_QUESTION_STAGE[conversationStateHoisted.phase]
          const { detectVisual } = await import('@/lib/school/visuals/detectVisual')
          const { getConceptVisualType, lookupConceptVisual } = await import('@/lib/teaching/visualRegistry')
          const registryVisual = getConceptVisualType(convConceptId)
          // Same lookup, same concept id — the legal set for this concept.
          allowedVisualsHoisted = lookupConceptVisual(convConceptId)?.all ?? null
          const availableVisual = registryVisual ?? detectVisual({
            subjectSlug: subjectCode,
            chapterTitle: lessonCtx?.unitTitle ?? '',
            lessonTitle: lessonCtx?.lessonTitle,
          })
          cueObservations.availableVisual = availableVisual
          cueObservations.visualDetectionRan = true
          availableVisualHoisted = availableVisual
          // VIE integration point (Visualization Migration, phase 1 — additive
          // only). Runs the Visualization Intelligence Engine against the VKR
          // for this turn's concept and records the result for observability.
          // Deliberately does NOT influence availableVisual/responseVisual —
          // ADR 12's live renderer selection above remains the sole rendering
          // authority until the VKR reaches coverage parity; see CueObservations
          // .visualizationIntent's own doc comment for why.
          {
            const { buildVisualIntentFromRegistry } = await import('@/lib/teaching/visualIntelligenceEngine')
            cueObservations.visualizationIntent = buildVisualIntentFromRegistry(convConceptId)
            cueObservations.vieExecuted = true
          }
          // D.23-30: Visual Intelligence block for the conversation state
          // machine path. ADR 15: alreadyShown now uses RRM ground truth
          // instead of the phase-counter heuristic.
          const { buildRenderedRealityBlock } = await import('@/lib/teaching/renderedRealityModel')
          // M1: buildVisualIntelligenceBlock() used to be injected here whenever
          // the resolver was disabled. It is built from detectVisual()'s keyword
          // match on the LESSON TITLE, so it could name a different figure than
          // the one actually being attached — two conflicting visual
          // instructions in one prompt, and the observed source of the tutor
          // describing a figure the learner is not looking at. The Visual
          // Contract is now the only visual instruction in the prompt, always.
          // ADR 15: inject RENDERED REALITY block — ground truth of what
          // the learner's screen currently shows.
          systemPrompt += buildRenderedRealityBlock(snapshotRRMLog)
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

          // ── THE visual authority ──────────────────────────────────────────
          // Decide the turn's visualization here, BEFORE the LLM, from the
          // concept the learner actually asked about — never from the model's
          // prose. Runs unconditionally: there is no longer a second pipeline
          // for it to be switched against, so a flag choosing between
          // authorities would have nothing to choose.
          //
          // FAILS CLOSED. A throw is not a licence to guess: it yields the same
          // NO-FIGURE decision as an honest decline, so the learner sees text
          // and the tutor is told the screen is empty.
          {
            try {
              const { resolveVisualForTurn } = await import('@/lib/teaching/visual/resolveVisual')
              // Every generation attempt this turn makes — accepted or
              // rejected — is written down. Purely additive: the sink is read
              // by nothing on this path, and a failure inside it is swallowed,
              // so it can never change what the learner sees.
              // …and a figure a human already approved is served ahead of
              // generating a new one, which is what makes the review queue
              // reach a learner at all.
              //
              // The budget reader is what bounds generation now that
              // eligibility is a rule rather than a typed list of ids: an
              // unreadable count is treated as exhausted, so the bound fails
              // in the safe direction.
              const { prismaGenerationOutcomeSink, findActiveVisualFigure, prismaBudgetReader } =
                await import('@/lib/teaching/visual/generationOutcomeStore')
              const { buildVisualContractBlock } = await import('@/lib/teaching/visual/visualContract')
              // The SPECIFIC form the learner named, if any. Reported to the
              // contract only — it never selects or reorders a figure.
              const { requestedVisualForm } = await import('@/lib/teaching/masteryGate')
              const { parseVisualSession } = await import('@/lib/teaching/visual/session')
              // Visual continuity: the figure already on the learner's screen,
              // read back from contextSnapshot. Without this the resolver would
              // re-derive a visual from each message in isolation — which is how
              // an ANSWER ("the starting point") could swap a vector figure for
              // a geometry one mid-correction.
              const activeVisualSession = parseVisualSession(
                (learnSession.contextSnapshot as Record<string, unknown> | null)?.visualSession,
              )
              // THE PER-SESSION GENERATION BUDGET's counter.
              //
              // The daily budget is read from the outcome table because every
              // instance writes there. A SESSION has no such table, and adding
              // one would be a migration for a counter — so the count rides the
              // snapshot this route already writes every turn, which is
              // per-session by construction and survives across lambdas because
              // it is a database row.
              //
              // Read defensively: a missing, corrupt or negative value must not
              // hand the session an unbounded budget, so anything unusable
              // counts as zero spent ONLY when it is genuinely absent, and a
              // malformed number is treated as the cap rather than as zero.
              const rawGenCount = (learnSession.contextSnapshot as Record<string, unknown> | null)
                ?.visualGenerationCount
              const visualGenerationCount =
                rawGenCount === undefined || rawGenCount === null
                  ? 0
                  : typeof rawGenCount === 'number' && Number.isFinite(rawGenCount) && rawGenCount >= 0
                    ? Math.floor(rawGenCount)
                    : Number.MAX_SAFE_INTEGER
              visualGenerationCountHoisted = visualGenerationCount
              // ONE authority, including runtime generation: curated figure ->
              // engine-generated figure -> no figure. Awaited because the
              // engine may call the model; a cached or flag-off path returns
              // without any network at all.
              const decision = await resolveVisualForTurn({
                message,
                // THE TEACHING TARGET, not the lesson: on an excursion the
                // figure must depict what is being taught. The excursion's
                // return anchor and open/closed state come from the Teaching
                // Engine — the visual layer never decides either.
                //
                // NULL on an unresolved-topic excursion. The teaching target
                // there is a title the curriculum cannot name, so there is no
                // concept to depict; passing the fallback would let the
                // resolver introduce a NEW figure of the paused lesson while
                // the tutor answers about something else. A figure already on
                // the learner's screen is still left to continuity, and keeps
                // its own identity — see excursion.ts's directive rule (6).
                lessonConceptId: unresolvedTopicExcursion ? null : teachingTargetConceptId,
                excursionReturnToConceptId: excursionDecision.returnToConceptId,
                excursionActive: excursionDecision.state.active,
                subject: subjectCode,
                learnerRequest: learnerRequestHoisted,
                remediationTier,
                activeSession: activeVisualSession,
                lastAssistantAskedQuestion:
                  (conversationStateHoisted?.questionsAskedSinceTeach ?? 0) > 0,
              }, {
                outcomeSink: prismaGenerationOutcomeSink,
                findApprovedFigure: findActiveVisualFigure,
                budgetReader: prismaBudgetReader,
                // Without this the resolver's session cap was accepted and
                // never supplied, so `checkBudgets` skipped it entirely and one
                // learner could generate without a per-session bound.
                sessionGenerationCount: visualGenerationCount,
                // GROUNDING FOR AN OFF-CURRICULUM TOPIC. The lesson's own title
                // and description are what the tutor is teaching from, so they
                // are what a figure of it must be drawn from and judged
                // against. Absent or too thin, the engine declines rather than
                // guessing from a bare title.
                // The lesson's own title and goal — which is exactly the case
                // this path exists for: route.ts's own comment names "Subject
                // Library subjects without a knowledge graph (Spanish,
                // JavaScript, etc.)", and those have never been able to receive
                // a figure. Thin or missing text is declined by the identity
                // rule rather than guessed at.
                runtimeTopic: {
                  title: lessonCtx?.lessonTitle ?? null,
                  description: lessonCtx?.lessonGoal ?? null,
                },
                // GROUNDING FOR A TOPIC THE LEARNER NAMED THAT THE CURRICULUM
                // DOES NOT CONTAIN. Their OWN earlier messages, oldest first —
                // never the tutor's, because judging generated output against
                // generated prose asks a model whether it agrees with itself.
                // Thin or absent, the engine declines; it never writes a
                // description in order to have one.
                priorLearnerMessages: [...learnSession.messages]
                  .reverse()
                  .filter((m) => m.role === MessageRole.USER)
                  .map((m) => m.content),
              })
              visualDecisionHoisted = decision
              // The contract tells the model what is ALREADY on screen, so it
              // teaches to that figure instead of deciding whether one exists.
              // The learner asked to be shown something. When no figure is
              // available the contract now says so out loud instead of letting
              // the turn read as though nothing was asked.
              systemPrompt += buildVisualContractBlock(decision, {
                learnerAskedForAVisual: learnerRequestHoisted === 'diagram',
                requestedForm: requestedVisualForm(message),
              })
              if (decision.payload?.renderer === 'card') {
                // Keep the legacy hoisted vars coherent for the RRM log and the
                // canonical-ownership clamp further down.
                availableVisualHoisted = decision.payload.visualType
                allowedVisualsHoisted = decision.allowed
              }
              console.log('[visual-v2]', {
                concept: decision.conceptId,
                excursion: decision.excursion,
                purpose: decision.purpose,
                representation: decision.representation,
                renderer: decision.payload?.renderer ?? 'none',
                graphical: decision.graphical,
                provenance: decision.provenance,
                continuity: decision.continuityReason,
                heldTurns: decision.session?.turns ?? 0,
              })
            } catch (err) {
              // FAIL CLOSED. Previously this set the decision to null, which
              // handed the turn to four prose-keyword pipelines — a resolver
              // crash was the most likely way to get a WRONG figure. Now the
              // failure is itself a decision: no figure, and a contract that
              // tells the tutor the screen is empty.
              console.warn('[visual] resolver failed — no figure this turn:', err)
              try {
                const { noFigureDecision } = await import('@/lib/teaching/visual/types')
                const { buildVisualContractBlock } = await import('@/lib/teaching/visual/visualContract')
                const decision = {
                  ...noFigureDecision('resolver-error', teachingTargetConceptId, null, 'explain' as const),
                  continuityReason: 'resolver-error',
                  session: null,
                }
                visualDecisionHoisted = decision
                // A resolver crash is still a turn where the learner asked to
                // be shown something. They get the same acknowledgement they
                // would get from an honest decline — the failure is ours, and
                // silence would read to them exactly like being ignored.
                systemPrompt += buildVisualContractBlock(decision, {
                  learnerAskedForAVisual: learnerRequestHoisted === 'diagram',
                })
              } catch {
                // Even the no-figure path failed. Leave the decision null; the
                // unconditional clamp below still clears every visual channel,
                // so the turn degrades to text rather than to a guessed figure.
                visualDecisionHoisted = null
              }
            }
          }
          // Brain SHADOW MODE (production migration Phase 1/4). Runs the
          // completed Brain alongside the legacy path and LOGS ONLY: no value
          // computed here is read by any production code path, no LLM call is
          // made, and captureShadow() never throws. Gated on
          // BRAIN_RUNTIME_MODE, which defaults to off — with the flag unset
          // this block does nothing at all.
          const { currentBrainMode, BrainMode } = await import('@/lib/teaching/runtime/brainRuntimeEntry')
          if (currentBrainMode().mode !== BrainMode.OFF) {
            try {
              const { captureShadow, compareToLegacy, summariseShadow } =
                await import('@/lib/teaching/runtime/brainShadow')
              const shadow = captureShadow({
                message,
                activeLessonConceptId: convConceptId,
                subjectSlug: subjectCode,
                language: teachingLang,
                previousConceptId: snapshotCurrentConceptId,
                learnerRequest: learnerRequestHoisted,
              })
              if (shadow) {
                const mismatches = compareToLegacy({
                  conceptId: convConceptId,
                  visualResolved: availableVisual !== null,
                  learnerRequest: learnerRequestHoisted,
                }, shadow)
                console.log(summariseShadow(shadow, mismatches))
                for (const m of mismatches) {
                  console.log(`[brain/shadow] mismatch ${m.kind}: legacy=${m.legacy} brain=${m.brain} — ${m.note}`)
                }
              }
            } catch {
              // Shadow mode must never affect a turn.
            }
          }
          // One detection, two consumers: the turn directive below and the
          // conversation-state fold after the LLM call.
          lowSignalAckHoisted = isLowSignalAcknowledgement(message)
          systemPrompt += buildTurnDirective({
            state: conversationStateHoisted,
            nextMove,
            // First-lesson protocol mandates 2-sentence bursts; the regular
            // responseBudget(beginner)=4 paragraphs conflicts with that and
            // must be overridden for every first-lesson turn.
            maxParagraphs: routeMaxParagraphsHoisted,
            // Teaching granularity (L1/L2/L3). Decided from the SAME evidence
            // the rest of this block already has — the state machine's failure
            // counters, the learner's own request, the remediation tier and the
            // recovery guard — so it introduces no new detector and no new
            // signal. REMEDIAL is unreachable without evidenced confusion.
            granularity: decideTeachingGranularity({
              state: conversationStateHoisted,
              learnerRequest: learnerRequestHoisted,
              remediationTier,
              recoveryKey: recoveryKeyHoisted,
            }),
            // The value the route already computed for the verifier context and
            // the parity facts — now also reaching the SERVED prompt, through
            // the same owner that carries the length budget.
            maxNewTerms: contentRegister === 'beginner' ? 1 : 2,
            workedExampleFirst,
            visualType: (learnerRequestHoisted === 'diagram' || explainDifferentlyNeedsVisual)
              ? availableVisual
              : decideVisualFirst(availableVisual, conversationStateHoisted, nextMove),
            firstLessonActive: firstLessonActiveHoisted,
            legalityRationale: moveDecision.rationale,
            directiveJustIssued: recoveryKeyHoisted === 'too_many_questions',
            // Bug 1: anchor OBSERVE hook to the concept being taught.
            //
            // On an excursion that is the EXCURSION TARGET, not the lesson.
            // Passing the lesson title here while the tutor was teaching a
            // side concept is what produced "The anchor MUST be drawn from
            // 'SI Units and Measurement' itself" in the middle of a viscosity
            // explanation — the directive and the learner's own question
            // pulling in opposite directions inside one prompt.
            lessonTitle: excursionTeachingTitleHoisted ?? lessonCtx?.lessonTitle ?? null,
            // Bug 2: flag bare acknowledgements so the directive forces a
            // concrete check question rather than a repeat of the same prose.
            lowSignalAcknowledgement: lowSignalAckHoisted,
            // Recovery routing: a learner blocked on an OPERATION is not
            // stuck on the idea, and re-explaining the concept cannot help.
            capabilityRepair: (() => {
              if (!capabilityStateHoisted || requiredCapabilitiesHoisted.length === 0) return null
              const cls = capMod.classifyFailure(capabilityStateHoisted, requiredCapabilitiesHoisted)
              return cls.kind === 'capability_missing' ? cls.blockingCapabilities : null
            })(),
            learnerAskedQuestion: detectLearnerQuestion(message),
            conceptPreviouslyMastered: conceptPreviouslyMasteredHoisted,
            phaseJustAdvanced: (conversationStateHoisted.turnsInCurrentPhase ?? 0) === 0
              && conversationStateHoisted.phase !== 'OBSERVE',
            acknowledgementContext: (() => {
              const prevSig = (snapshot?.lastSignal && typeof snapshot.lastSignal === 'object')
                ? (snapshot.lastSignal as { correctness?: boolean }).correctness ?? null
                : null
              return classifyAcknowledgementContext(
                conversationStateHoisted, prevSig, recoveryKeyHoisted !== null, navigationRequestHoisted,
              )
            })(),
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
                visualDecisionHoisted?.graphical ?? false,
              )
            } else {
              systemPrompt += buildLearnerRequestBlock(
                learnerRequestHoisted, availableVisual, remediationTier, hasEstablishedExample,
                undefined, undefined, visualDecisionHoisted?.graphical ?? false,
              )
            }
          }
          // Bug 8 — the client reports whether the previous long (collapsed)
          // explanation was ever expanded; unread text is never assumed read.
          if (lastExplanationRead === false) {
            systemPrompt += buildUnreadExplanationBlock()
          }

          // A.1: when mastery is already verified and the learner keeps
          // answering correctly in TRANSFER, prompt natural conclusion
          // rather than generating transfer questions indefinitely.
          if (!evidenceAutonomyHoisted && !navigationRequestHoisted && !recoveryKeyHoisted && !learnerRequestHoisted) {
            const { shouldConcludeNaturally, buildNaturalConclusionBlock } = await import('@/lib/teaching/masteryGate')
            // Surplus evidence on the LESSON cannot conclude it while the
            // learner is mid-excursion — the evidence is about a concept they
            // stepped away from, and the block's whole instruction is to
            // append [LESSON_COMPLETE].
            if (!excursionActiveHoisted && shouldConcludeNaturally(conversationStateHoisted)) {
              systemPrompt += buildNaturalConclusionBlock()
            }
          }
        }

        // First-lesson summit close — injected after TURN DIRECTIVE when the
        // learner reaches PRACTICE phase in lesson one (first-lesson/04 §1
        // "solo summit" rule: close now, never [LESSON_COMPLETE] this session).
        if (firstLessonActiveHoisted && conversationStateHoisted.phase === 'PRACTICE') {
          systemPrompt += buildFirstLessonCloseBlock()
        }

        // RECOVERY preemption (decision-engine/03 §0; foundations/01 §3
        // scripts; first-lesson/05 deltas) — injected LAST of all blocks:
        // the affect band outranks every teaching instruction above it.
        if (recoveryKeyHoisted) {
          const { buildRecoveryBlock } = await import('@/lib/teaching/recoveryGuard')
          // P2: pass session failure count so the script escalates on repeated struggle.
          // Rule 2 (pre-demonstration escalation): when nothing has been
          // demonstrated for this concept yet, dont_know/confused scripts
          // explain directly instead of shrinking to another question.
          systemPrompt += buildRecoveryBlock(
            recoveryKeyHoisted, firstLessonActiveHoisted, snapshotSessionFailureCount,
            conversationStateHoisted?.demonstrated !== true,
            // Recovery still owns HOW to answer distress and still preempts
            // every teaching instruction. It must not also decide to abandon
            // a concept the learner asked for — see RecoveryScopeOptions.
            { excursionTargetTitle: excursionTeachingTitleHoisted },
          )
        }

        // RC-D freeze-breaker — the runtime refuses to wait for a second
        // dropped observation. Injected after recovery so a genuine affect
        // state still outranks it (a flooded learner is not asked to confirm
        // a restatement), but ahead of everything advisory. See
        // progressionIntegrity.buildSignalRepairBlock for why this changes
        // the TURN rather than repeating the instruction that just failed.
        if (!recoveryKeyHoisted && needsSignalRepair(
          readProgressionMetrics(snapshot?.progressionMetrics),
        )) {
          const { buildSignalRepairBlock } = await import('@/lib/teaching/progressionIntegrity')
          systemPrompt += buildSignalRepairBlock()
          signalRepairFiredHoisted = true
        }

        // THE EXCURSION DIRECTIVE — injected LAST, after RECOVERY.
        //
        // Ordering is the fix, not a preference. RECOVERY declares itself
        // "PREEMPTS EVERYTHING ABOVE", and the excursion directive used to sit
        // above it — so on the two turns that matter most (a learner voicing
        // confusion about the concept they asked for) the last word the model
        // read was an instruction to shrink, defer and pivot away.
        //
        // The two blocks answer different questions and both keep their
        // authority: RECOVERY still owns HOW to respond to distress (validate,
        // shrink, no new content, no question), and this owns WHICH concept
        // that response is about. Nothing here softens the affect band.
        //
        // It is also independent of the VISUAL CONTRACT, so an excursion works
        // for the ~99% of concepts that have no authored figure.
        systemPrompt += buildExcursionDirective({
          decision: excursionDecision,
          targetTitle: excursionTeachingTitleHoisted
            ?? (await import('@/lib/curriculum/knowledgeGraph')).getKGNode(
              excursionDecision.state.targetConceptId ?? '',
            )?.title
            ?? null,
          lessonTitle: lessonCtx?.lessonTitle ?? null,
        })
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
        const shadowResult = await runShadowPipeline({
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
            currentConceptId: libraryConceptNodeIdHoisted ?? snapshotCurrentConceptId ?? resolvedConceptId ?? null,
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
          // Promotion 1: the stage now DERIVES phase/ceiling/demonstrated/
          // failures from the ladder state instead of being handed them.
          tsm: { conversationState: conversationStateHoisted },
          // Promotion 2: the stage DECIDES the move (Band-2 legality + the
          // authority-ordered mapping) instead of being handed it, and
          // derives maxQuestions/maxNewTerms from that decision. These are
          // the same inputs the route used to reach kernelPolicyMoveHoisted,
          // so parity is an equality check on two independent evaluations.
          policy: {
            conversationState: conversationStateHoisted,
            legality: {
              hasEvidencedPriorKnowledge: (studentProgress?.completedLessons?.length ?? 0) > 0,
              capabilityState: capabilityStateHoisted ?? undefined,
              requiredCapabilities: requiredCapabilitiesHoisted,
            },
            contentRegister,
            episodePhase: sessionEpisodeHoisted?.phase,
            recoveryKey: recoveryKeyHoisted,
            workedExampleFirst:
              snapshotSessionFailureCount >= 2 || strategyHoisted === 'FOUNDATION_REBUILD',
            actionClass: null,
            availableVisualType: availableVisualHoisted,
            learnerRequestedVisual: learnerRequestHoisted === 'diagram',
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
        })
        // The parity observer (masterplan K3 DoD: "byte-similar outputs on the
        // golden set"). Awaited rather than fire-and-forget because stages
        // 1–10 are pure and do no I/O — the cost is microseconds, and a
        // discarded result cannot prove anything. Read-only: it can change no
        // field of the response.
        if (shadowResult.invoked && shadowResult.state?.policy) {
          const { compareDecisions, foldParityMetrics, parityTags } = await import('@/lib/kernel/parity')
          const k = shadowResult.state.policy
          // The decision the route ACTUALLY made this turn. Named once and
          // reused by both comparisons below: restating it would let the two
          // parities disagree about what the baseline was, which is the exact
          // drift kernel/policyMove.ts exists to prevent.
          const routeFacts = {
            move: kernelPolicyMoveHoisted,
            stageCeiling: evidenceStageCeilingHoisted ?? null,
            maxQuestions: kernelMaxQuestionsHoisted,
            maxNewTerms: contentRegister === 'beginner' ? 1 : 2,
            maxParagraphs: routeMaxParagraphsHoisted,
            phase: conversationStateHoisted?.phase ?? null,
            recoveryActive: recoveryKeyHoisted !== null,
          }
          const parity = compareDecisions(
            routeFacts,
            {
              move: k.move,
              stageCeiling: k.stageCeiling,
              maxQuestions: k.budgets.maxQuestions,
              maxNewTerms: k.budgets.maxNewTerms,
              maxParagraphs: k.budgets.maxParagraphs,
              phase: shadowResult.state.teachingState?.phase ?? null,
              recoveryActive: shadowResult.state.interrupt?.active === true,
            },
          )
          kernelParityMetricsHoisted = foldParityMetrics(
            snapshot?.kernelParity as never, parity,
          )
          kernelParityTagsHoisted = parityTags(parity)
          snapshotRederivers.push((fresh) => ({
            kernelParity: foldParityMetrics(fresh.kernelParity as never, parity),
          }))

          // K4 — the Policy Engine's production consumer. Runs the 7-band
          // engine over the runtime pack (BASE_PACK + any activated C4
          // overlays) on THIS turn's kernel artifacts, compares its decision
          // to the one the route actually made, and discards it. Shadow by
          // construction: policyGate never returns a path to the response,
          // and the engine is pure, so the whole measurement costs
          // microseconds. This is what makes K4's "replay diff vs pre-pack
          // behaviour" a number instead of an intention — and the promotion
          // criterion is the same as K3's: divergences to zero first.
          const { readEosFlags, policyGate } = await import('@/lib/eos-runtime')
          if (readEosFlags().policyMode !== 'off') {
            // The D1-grid inputs. Same snapshot field the LAST-ANSWER READ
            // prompt overlay reads (~700 lines up) — the engine's Band-4 grid
            // rules and that overlay encode the SAME two quadrants, so they
            // must read the same source or the shadow decision would be
            // measured against a grid the route never applied.
            const enginePrevSignal = (snapshot?.lastSignal && typeof snapshot.lastSignal === 'object')
              ? snapshot.lastSignal as { correctness?: boolean; confidence?: string }
              : undefined
            const gate = policyGate({
              state: shadowResult.state,
              // The Band-2 verdict the route ITSELF applied this turn,
              // computed once by questionLegality inside the ladder and
              // hoisted. Passed in rather than recomputed so the engine is
              // measured against the same legality call the learner got.
              caller: {
                askLegal: legalityBlockedReasonHoisted === null,
                blockedReason: legalityBlockedReasonHoisted,
                // Same expression the route feeds decideNextMoveDetailed, so
                // Band 4's worked-example-first rule sees what the ladder saw.
                workedExampleFirst:
                  snapshotSessionFailureCount >= 2 || strategyHoisted === 'FOUNDATION_REBUILD',
              },
              lastSignal: {
                correct: enginePrevSignal?.correctness ?? null,
                confidence: (enginePrevSignal?.confidence === 'low' || enginePrevSignal?.confidence === 'medium' || enginePrevSignal?.confidence === 'high')
                  ? enginePrevSignal.confidence : null,
              },
            })
            if (gate.decision) {
              const engineParity = compareDecisions(routeFacts, {
                move: gate.decision.move,
                stageCeiling: gate.decision.stageCeiling,
                maxQuestions: gate.decision.budgets.maxQuestions,
                maxNewTerms: gate.decision.budgets.maxNewTerms,
                maxParagraphs: gate.decision.budgets.maxParagraphs,
                // Phase and recovery are INPUTS to the engine, not outputs —
                // it reads them off the same artifacts the route produced, so
                // comparing them measures the input path, not the rules.
                phase: routeFacts.phase,
                recoveryActive: routeFacts.recoveryActive,
              })
              enginePolicyParityHoisted = foldParityMetrics(
                snapshot?.enginePolicyParity as never, engineParity,
              )
              enginePolicyTagsHoisted = parityTags(engineParity, 'engine')
              snapshotRederivers.push((fresh) => ({
                enginePolicyParity: foldParityMetrics(fresh.enginePolicyParity as never, engineParity),
              }))
            }
          }
        }
      } catch { /* strangler: kernel failure never affects the turn */ }
    }

    try {
      // Explanation Memory / Teaching Action Repository (approved exception to
      // ADR 14's implementation gate — see WAVE_0_APPROVAL_CHECKLIST.md W1-4/
      // W4-1/W4-3). Tries to assemble the turn from previously reviewed,
      // ACTIVE Knowledge Assets before paying for an LLM call.
      //
      // NOT a no-op. src/instrumentation.ts seeds the authored corpus
      // (brainSeedAssets + authoredSeedAssets — mathematics, physics, english)
      // as ACTIVE/HUMAN_CURATOR on cold start, so this path serves authored
      // content for any seeded concept without per-asset review. The admin
      // promote/reject endpoint governs the separate AI_AUTHORED DRAFT lineage
      // produced by live capture, not the seeded corpus.
      //
      // An earlier version of this comment claimed nothing is ever ACTIVE and
      // assembleLesson() always returns null. That predated the bootstrap
      // actually running (its Next.js instrumentation hook was never enabled,
      // so the module was dead code in production) and it is what sent a
      // release audit to the wrong conclusion. Corrected alongside the merge
      // that enabled the hook.
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
          // ALREADY-READ GUARD. Explanation Memory was the only authored
          // channel without one: TeachingHistory already stops a visual being
          // replayed (visualsShown) and an MCQ being re-asked (mcqAsked), but
          // nothing recorded that the learner had already been shown a stored
          // explanation. Production 2026-08-02T13:53-13:54Z: the same
          // 787-character sig-figs asset was served verbatim on three
          // consecutive turns, each in reply to "Got it", because re-serving
          // looked correct to every layer involved.
          // Serving it a second time teaches nothing, so the turn falls
          // through to the LLM to move the lesson on. Same owner, same
          // concept scope, same reset-on-concept-change lifecycle as its two
          // sibling guards — no new store and no new state.
          if (assembled && teachingHistoryHoisted) {
            const { hasServedExplanation } = await import('@/lib/teaching/teachingHistory')
            const explanationId = assembled.explanationAssetId
            if (explanationId && hasServedExplanation(teachingHistoryHoisted, explanationId)) {
              assembled = null
              memoryFallbackReason = 'Already served this concept'
            }
          }
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
      // object. Perception has no behavior of its own — it writes nothing
      // and is logged for observability — but its output IS consumed: the
      // Decision Engine below reads it, and the dispatcher acts on the
      // result. It can never break a turn
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
          // P13: a runtime fact the CUE records and the ladder acts on.
          lessonCompleted: lessonCompletedHoisted,
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
        // Decision Engine v1 (Milestone 2): consumes the understanding,
        // produces a typed TeachingDecision, and logs it so decisions stay
        // comparable against what the runtime actually did. The decision is
        // ACTED ON by the dispatcher block below whenever the Brain runtime
        // is enabled (the default); with it disabled the log is all it is.
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
      // serve-from-state-vs-LLM fork (two externally visible forks at this
      // point in the route: the Explanation Memory serve and the P13
      // completed-lesson serve); every other decision
      // executes through the engine blocks already injected above, with the
      // LLM in the renderer role (see dispatcher.ts executor honesty note).
      // Fallback law: a missing/inconsistent plan always degrades to the
      // legacy behavior — the dispatcher can never strand a turn.
      let brainRuntimeActive = false
      let serveFromMemory = assembled !== null
      let serveLessonComplete = false
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
            // P13: the plan — not this route — decides that no provider is
            // needed. Acting on plan.executor is the SAME pattern as
            // serveFromMemory above, not a bypass of the engine.
            serveLessonComplete = dispatchPlanHoisted.executor === 'LESSON_COMPLETE'
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
      // goes through a model, not just Brain-renderer turns.
      if (conversationDecisionHoisted && conversationDecisionHoisted.type !== 'RECOVERY' && !serveFromMemory) {
        const brainBlockFired = brainRuntimeActive && dispatchPlanHoisted?.executor === 'LLM_RENDERER'
        if (!brainBlockFired) {
          const { buildConversationDirective } = await import('@/lib/teaching/conversationDecision')
          systemPrompt += '\n\n' + buildConversationDirective(conversationDecisionHoisted)
        }
      }

      // OUTPUT LANGUAGE — must be the LAST block appended, after every
      // teaching block including the two that assert they override
      // everything above them (FIRST LESSON PROTOCOL, RECOVERY). The
      // language contract is stated once at the very top of the base prompt
      // and is then outnumbered by ~60 English instruction blocks; restating
      // it here is what stops Russian learners receiving English or
      // half-English turns. Renders '' for English — see outputLanguage.ts.
      //
      // Hoisted because the verifier's constrained re-render appends its own
      // English violation appendix AFTER this whole prompt (see the rerender
      // callback below). Re-appending the SAME string there is what keeps the
      // contract last on repair turns too; sharing one variable is what makes
      // it impossible for the two positions to carry different text.
      let outputLanguageBlockHoisted = ''
      {
        const { buildOutputLanguageBlock } = await import('@/lib/teaching/outputLanguage')
        outputLanguageBlockHoisted = buildOutputLanguageBlock(teachingLang)
        systemPrompt += outputLanguageBlockHoisted
      }

      // Initialised so the compiler can see every branch is covered once the
      // P13 deterministic branch was added. These placeholders are always
      // overwritten: the lesson-complete branch, the memory branch and the
      // provider branch each assign both before use, and the lesson-complete
      // branch clears its own flag if it cannot produce text.
      let text: string = ''
      let provider: string = 'fallback'
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
      // P13 — LESSON ALREADY COMPLETE. Answered entirely from the persisted
      // LessonAttempt: no Gemini, no Groq, no OpenRouter, no prompt sent. The
      // learner still gets a real, specific response naming what they
      // mastered — it is read from evidence rather than regenerated.
      if (serveLessonComplete) {
        try {
          const { latestLessonAttempt } = await import('@/lib/teaching/lessonAttemptStore')
          const { lessonKeyFor, summaryFromAttempt } = await import('@/lib/teaching/lessonAttempt')
          const key = lessonKeyFor({ lessonOrder: lessonCtx?.currentLesson ?? null })
          const attempt = key
            ? await latestLessonAttempt(prisma, {
                userId, subjectSlug: learnSession.subject.slug, lessonKey: key,
              })
            : null
          if (attempt) {
            const summary = summaryFromAttempt(attempt)
            // Same builder the finalising turn uses, so the two closes cannot
            // drift into two different messages.
            const { buildLessonCloseText } = await import('@/lib/teaching/lessonCompletion')
            text = buildLessonCloseText(attempt.lessonTitle, summary, {
              alreadyFinished: true, lang: teachingLang, conceptId: resolvedConceptId,
            })
            provider = 'memory'
            memoryFallbackReasonCode = 'lesson_complete'
            try { (await import('@/lib/understanding/brainMetrics')).recordServe('memory') } catch { /* observability only */ }
            console.log(
              '[learn/chat] RESPONSE provider=deterministic source=LessonAttempt' +
              ` lessonKey=${key} groq_invoked=false reason=lesson_already_complete`
            )
          } else {
            // No persisted attempt to answer from — fall through to the normal
            // path rather than inventing a completion the runtime cannot back.
            serveLessonComplete = false
          }
        } catch (err) {
          console.warn('[learn/chat] lesson-complete serve failed, falling through:', err)
          serveLessonComplete = false
        }
      }

      if (!serveLessonComplete && assembled && serveFromMemory) {
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
      } else if (!serveLessonComplete) {
        // P13: a completed lesson was already answered from persisted
        // evidence above, so the provider path is skipped entirely — this is
        // the branch that would otherwise have paid for the model call.
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
        // K6 — Degraded deterministic mode (RS P-3). When EVERY provider in
        // the failover chain has thrown, the turn is served by a K5 template
        // instead of an HTTP 500: the learner gets a teaching-shaped,
        // verifier-clean-by-construction turn, banner-free ("learner not
        // told 'AI down'"). AIBudgetExceededError still propagates — budget
        // exhaustion is load management with a deliberate 429, not an outage.
        let routed: { text: string; provider: string; finishReason: string | null }
        try {
          routed = await routeAI(
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
        } catch (aiError) {
          if (aiError instanceof AIBudgetExceededError) throw aiError
          console.error('[learn/chat] all providers down — serving degraded template (RS P-3):',
            aiError instanceof Error ? aiError.message : String(aiError))
          captureError(aiError, { route: 'api/learn/chat', tags: { stage: 'ai-degraded' } })
          const { degradedTurn } = await import('@/lib/eos-runtime')
          const degraded = degradedTurn({ register: contentRegister, learnerText: message })
          // Escalate rather than repeat. Repeating the identical content-free
          // template is what made the tutor look broken while the learner was
          // actively asking it to start; by the third consecutive outage the
          // learner is told plainly that something is wrong on our side.
          const prevOutages = typeof snapshot?.consecutiveOutages === 'number' ? snapshot.consecutiveOutages : 0
          consecutiveOutagesHoisted = prevOutages + 1
          const { renderOutage, chooseFallback } = await import('@/lib/kernel/verifier/templateFallback')
          const outageText = renderOutage(
            consecutiveOutagesHoisted,
            chooseFallback(['SHOW_EASIEST_LEGAL']),
            { register: contentRegister, learnerText: message },
          )
          routed = { text: outageText, provider: degraded.provider, finishReason: degraded.finishReason }
        }
        text = routed.text
        provider = routed.provider
        finishReason = routed.finishReason
        // Milestone 4 metrics: an LLM-rendered turn (a provider was called).
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

      // Wave 0 Step 2/4 (Blueprint Phase 3): extract and strip the SIGNAL
      // tag FIRST — before asset capture and every other tag parser — so
      // the tag never leaks into stored messages, captured assets, or the
      // client. The parsed signal drives evidence + placement below.
      const { parseSignalTag } = await import('@/lib/teaching/signals')
      const signalParse = parseSignalTag(text)
      let teachingSignal = signalParse.signal
      text = signalParse.cleanText
      // P2: parse + strip the MCQ tag in the same place and for the same
      // reason — before asset capture and every other parser, so the markup
      // can never leak into a stored message, a captured asset, or the client.
      // A malformed tag yields null and is still stripped: the turn degrades
      // to an ordinary typed reply rather than rendering a broken question.
      const { parseMcqTag } = await import('@/lib/teaching/mcq')
      const mcqParse = parseMcqTag(text)
      mcqHoisted = mcqParse.mcq
      text = mcqParse.cleanText
      // P1-1: strip the TEACHING INTENT tag in the same place and for the same
      // reason — before asset capture and every other parser, so it can never
      // leak into a stored message, a captured asset, or the client. The vector
      // is carried to this turn's single emitTurn() call and read by nothing
      // else. PROXY honesty class: a declaration of intent, never an instrument.
      const { parseAttemptVectorTag, parseAdaptationStateTag, isAttemptCaptureEnabled } =
        await import('@/lib/teaching/attemptVectorSignal')
      // Capture is gated; STRIPPING IS NOT. A model can still emit the tag from
      // conversation context after the instruction is removed, so the text is
      // cleaned on every path regardless of the switch — a disabled feature
      // must never be able to expose a tag.
      const attemptCaptureOn = isAttemptCaptureEnabled()
      // WP-8 / AH-1: the ASV is read from the SAME tag, before the strip.
      // One declaration channel, one capture path, one writer.
      if (attemptCaptureOn) adaptationStateHoisted = parseAdaptationStateTag(text).vector
      const attemptVectorParse = parseAttemptVectorTag(text)
      if (attemptCaptureOn) attemptVectorHoisted = attemptVectorParse.vector
      text = attemptVectorParse.cleanText

      // C-A — THE SINGLE DEFINITION OF "usable assistant response", and the
      // only degraded-response path. It sits HERE, after both tag strips,
      // because those strips can remove content: a reply consisting only of
      // the mandatory tags is non-empty when the model returns it and empty
      // once they are removed. This guard previously ran BEFORE the strips,
      // tested the pre-strip body, never fired, and a blank assistant message
      // was persisted and rendered with nothing logged.
      //
      // `!text.trim()` rather than `!text`: whitespace surviving a strip is
      // not a usable response either. There is no second implementation —
      // this is the same block, moved, so a degraded turn is byte-for-byte
      // what it was, and an originally-empty body still reaches it unchanged
      // (an empty string is empty through both strips).
      //
      // RS P-3, the second half. A provider that THROWS is handled at the
      // routeAI call site above; a provider that returns an EMPTY body is
      // the same failure — no usable model output — and this path returned
      // a 502 the client renders as "Sorry, I got cut off". By the comment
      // on the maxTokens argument above, that is not a rare outage: it
      // recurs whenever a reasoning model exhausts its budget mid-thought.
      // So the most FREQUENT degraded case was still shipping the learner a
      // banner, which is exactly what P-3 forbids. Same remedy, same owner.
      if (!text.trim()) {
        console.error('[learn/chat] empty response from model, finish_reason:', finishReason ?? 'unknown')
        const { degradedTurn } = await import('@/lib/eos-runtime')
        const degraded = degradedTurn({ register: contentRegister, learnerText: message })
        text = degraded.text
        provider = degraded.provider
        finishReason = degraded.finishReason
      }
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

      // ── DETERMINISTIC MCQ GRADING ────────────────────────────────────────
      //
      // The ladder's only source of correctness was the LLM's own SIGNAL tag.
      // Measured in production on a correct answer the tutor itself called
      // "spot-on": `[ladder] { signalTag: false, correctness: null }` — the tag
      // was simply never emitted, and the instruction for it is appended to
      // every prompt unconditionally, so this is non-compliance rather than a
      // wiring gap. Hanging the whole mastery system off one optional-looking
      // tag means a model that skips it silently freezes every learner, with no
      // error anywhere.
      //
      // An MCQ is the one form where correctness is not a judgement: the tutor
      // declared the right answer when it wrote the question. So when the
      // PREVIOUS turn asked one, this reply is graded against the stored
      // `correctIndex` — real instrumentation, no model call, no cost.
      //
      // It WINS over the tag when it resolves, because ground truth beats
      // self-report; it returns null (never "wrong") when the reply cannot be
      // matched to an option, leaving the existing path untouched. Fabricating
      // an answer the learner did not give would write false evidence into a
      // permanent record, which is worse than the freeze this repairs.
      let mcqGradedThisTurn: { chosenIndex: number | null; correct: boolean | null } | null = null
      if (pendingMcqHoisted) {
        try {
          const { gradeMcqAnswer, mcqConfidence } = await import('@/lib/teaching/mcq')
          const { isBareAcknowledgement } = await import('@/lib/teaching/masteryGate')
          if (!isBareAcknowledgement(message)) {
            const graded = gradeMcqAnswer(message, pendingMcqHoisted)
            if (graded.correct !== null) {
              mcqGradedThisTurn = graded
              const lastAsst = learnSession.messages.find((m: { role: string }) => m.role === 'ASSISTANT')
              const latencyMs = lastAsst
                ? Math.max(0, turnReceivedAt - new Date((lastAsst as { createdAt: Date }).createdAt).getTime())
                : null
              teachingSignal = {
                ...(teachingSignal ?? {}),
                correctness: graded.correct,
                confidence: mcqConfidence(graded.correct, latencyMs),
              }
            }
          }
          console.log('[mcq-grade]', {
            asked: pendingMcqHoisted.question.slice(0, 60),
            chosen: mcqGradedThisTurn?.chosenIndex ?? null,
            correct: mcqGradedThisTurn?.correct ?? null,
          })
        } catch (err) { console.warn('[mcq-grade] failed:', err) }
      }

      // Architectural Root Cause Fix: cross-check the SIGNAL against
      // independently observable evidence before it drives mastery state.
      // A CONTRADICTED signal is overridden (text wins over tag); a
      // SUSPICIOUS signal still drives the teaching flow but is excluded
      // from strict mastery (completion authority).
      let signalVerificationStatusHoisted: 'CLEAN' | 'SUSPICIOUS' | 'CONTRADICTED' = 'CLEAN'
      if (teachingSignal && teachingSignal.correctness !== undefined) {
        try {
          const { verifySignal, resolveContradiction } = await import('@/lib/teaching/signalVerification')
          const lastAsstForLatency = learnSession.messages.find((m: { role: string }) => m.role === 'ASSISTANT')
          const learnerLatencyMs = lastAsstForLatency
            ? Math.max(0, turnReceivedAt - new Date((lastAsstForLatency as { createdAt: Date }).createdAt).getTime())
            : null
          const verification = verifySignal(teachingSignal, {
            assistantText: text,
            learnerMessage: message,
            phase: conversationStateHoisted?.phase ?? 'OBSERVE',
            turnLatencyMs: learnerLatencyMs,
          })
          signalVerificationStatusHoisted = verification.status
          if (verification.status === 'CONTRADICTED') {
            teachingSignal = resolveContradiction(teachingSignal, verification)
          }
        } catch { /* non-fatal — fall through with CLEAN */ }
      }

      // Phase 2/5 capture: decompose a successful LLM generation into
      // whichever labelled sections and assessment items it actually
      // contains and persist each as a DRAFT for future reuse. Fire-and-
      // forget — never awaited, never blocks the turn.
      // A degraded turn is NOT a successful LLM generation. degradedTurn()
      // renders a content-free outage template (templateFallback.ts: "no
      // fabricated pedagogy"), and this capture path existed with no consumer
      // of `provider` at all, so those templates were decomposed and written
      // as DRAFT ExplanationAssets exactly like model output. Production holds
      // five such rows across five concepts and three languages — including
      // the English template stored as the RUSSIAN core_explanation for
      // chem.atomic.orbitals. They sit in the admin review queue, and
      // approving one makes it the single ACTIVE asset for its canonicalSlug,
      // after which findBestExplanation() serves that boilerplate to every
      // matching learner forever — turning a transient outage into permanent
      // repetition that no state-machine fix can reach.
      if (memoryState && !assembled) {
        const { isDegradedProvider } = await import('@/lib/eos-runtime/degradedMode')
        if (!isDegradedProvider(provider)) {
          void ingestGeneratedLesson({
            conceptId: memoryState.conceptId,
            subjectSlug: memoryState.subjectSlug,
            language: memoryState.language,
            gradeBand: memoryState.gradeBand,
            rawContent: text,
            authorId: 'SYSTEM_AI',
          })
        }
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
          allowedVisualsHoisted as readonly import('@/lib/school/visuals/visualTypes').VisualType[] | null,
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

      // Bug 4 — filler turn detection: a turn with no explanation, no question,
      // and no concrete content is a wasted turn. Replace it with a minimum
      // viable teaching move (one concrete check question) so the learner gets
      // something actionable. Runs on Library turns only (assembled turns are
      // human-curated and never filler).
      if (!assembled) {
        try {
          const { detectFillerTurn } = await import('@/lib/teaching/conversationState')
          if (detectFillerTurn(cleanText)) {
            const conceptHint = lessonCtx?.lessonTitle ? ` about ${lessonCtx.lessonTitle}` : ''
            cleanText = `Let me ask you something concrete${conceptHint}: what's one thing you notice or find surprising about what we just covered?`
          }
        } catch { /* non-fatal */ }
      }

      // D.28: strip markdown image links and raw image URLs the LLM may have
      // emitted — they render as broken images or expose internal URLs. The
      // VISUAL tag pipeline renders visuals; no other image mechanism is used.
      try {
        const { stripRawImageUrls } = await import('@/lib/teaching/visualIntelligence')
        cleanText = stripRawImageUrls(cleanText)
      } catch { /* non-fatal */ }

      // MATHS THE LEARNER CAN READ. Models write inline maths as `$…$`; the
      // renderer typesets `$$…$$` and `\(…\)` and deliberately ignores single
      // dollars because they collide with currency. So the two conventions
      // disagreed and the learner read the markup — measured on screen:
      // "$T = 2\pi\sqrt{\frac{L}{g}}$". This translates one convention into
      // the other so the EXISTING KaTeX path typesets it; nothing new renders
      // anything, and `$5` is left alone.
      //
      // Applied here so it covers every source of learner-visible text on this
      // route, including content served straight from Explanation Memory.
      try {
        const { normalizeMathDelimiters } = await import('@/lib/text/mathDelimiters')
        cleanText = normalizeMathDelimiters(cleanText)
      } catch { /* non-fatal — raw text is still better than no answer */ }

      // K6 — EOS Runtime integration: run the K5 Output Verifier on the
      // cleaned text. Off by default; behind ENABLE_OUTPUT_VERIFIER (or the
      // master ENABLE_EOS_RUNTIME). Failures follow the RS §9.3 protocol:
      // one constrained rerender using routeAI with the SAME plan +
      // violations appendix, then a deterministic template if still failing.
      // Fires only for Library turns (K6 scope: School Mode untouched); a
      // memory-served (assembled) turn is skipped since it's already
      // human-curated.
      // K7 — Frustration machine (RS §4.14): step the persisted state with
      // THIS turn's evidence (the SIGNAL correctness parsed above, the
      // recovery-guard verdict). UNCONDITIONAL — the fast affect variable
      // must accumulate whether or not any consumer is enabled, or the state
      // would be stale on the day a consumer turns on. Consumer today: the
      // verifier's affect band (the pre-K7 floor in buildVerifierContext
      // remains only as the no-machine-state fallback).
      try {
        const { readFrustration, stepFrustration, affectBandOf } = await import('@/lib/kernel/frustration')
        const frustrationEvidence = {
          failed: teachingSignal ? teachingSignal.correctness === false : null,
          recoveryFired: recoveryKeyHoisted !== null,
          succeeded: teachingSignal?.correctness === true,
        }
        frustrationAfterTurnHoisted = stepFrustration(
          readFrustration(snapshot?.frustration), frustrationEvidence,
        )
        frustrationBandHoisted = affectBandOf(frustrationAfterTurnHoisted.state)
        snapshotRederivers.push((fresh) => ({
          frustration: stepFrustration(readFrustration(fresh.frustration), frustrationEvidence),
        }))
      } catch { /* affect estimation never takes a turn down */ }

      let eosVerifierEvents: import('@/lib/kernel/verifier').OutputEvent[] = []
      let eosVerifierMetricsHoisted:
        import('@/lib/kernel/verifier').VerifierMetrics | null = null
      let eosVerifierTagsHoisted: string[] = []
      let eosVerifierUsedTemplate = false
      let eosVerifierAttempts: 1 | 2 = 1
      // Un-swallowable probe. The guard produced NO log at all on an audit turn
      // while logging normally on another learner's turns in the same
      // deployment, which leaves two candidates that the existing logging
      // cannot separate: `assembled` was truthy so the whole block was skipped,
      // or something threw before the first log and the surrounding catch ate
      // it. This line sits OUTSIDE both the condition and the try, so it prints
      // either way.
      // ── WHY THIS IS `servedFromMemory` AND NOT `assembled` ────────────────
      //
      // This block gated on `!assembled`, on the reasonable-sounding premise
      // that an assembled turn is human-curated content and needs no output
      // verification. The premise is false: `assembled` only means a lesson was
      // ASSEMBLED, not that it was SERVED. The serve site (see `text =
      // assembled.text` above) additionally requires `serveFromMemory`, which
      // the Brain can and does refuse — it escalates to the LLM while
      // `assembled` stays non-null.
      //
      // Measured on a real audit turn:
      //   [affirm-guard-entry] { assembled: true }
      //   provider=gemini  explanationMemoryServes=0  memoryServingMode=null
      //   fallback_reason="Brain decision"
      // The LLM wrote the answer and the ENTIRE output verifier — the K5 gate
      // and the affirmation safety floor — was skipped, because a lesson had
      // merely been assembled. That is how "Claude, exactly right!" reached a
      // learner on a proposal turn with no distinguishing move.
      //
      // The trap is worse than one turn: assembly succeeds more often as the
      // moat grows, so **the better the asset library gets, the more turns lose
      // output verification.** A safety layer that decays as the product
      // improves is the wrong shape.
      //
      // Now it skips verification only when the served text genuinely IS the
      // curated asset — the same condition the serve site uses.
      const servedFromMemory = !serveLessonComplete && assembled !== null && serveFromMemory
      console.log('[affirm-guard-entry]', {
        assembled: assembled !== null,
        servedFromMemory,
        willVerify: !servedFromMemory,
      })
      if (!servedFromMemory) {
        try {
          const { readEosFlags, buildVerifierContext, verifierGate } = await import('@/lib/eos-runtime')
          const eosFlags = readEosFlags()
          // ── SAFETY FLOOR: V-AFFIRM RUNS WHETHER OR NOT EOS IS ENABLED ─────
          //
          // The full verifier is flag-gated (VERIFIER_MODE / ENABLE_EOS_RUNTIME)
          // and those flags are unset in production, which meant the ONE rule
          // that stops the tutor confirming a learner's misconception could
          // never fire for a real learner. Measured on `phys.meas.units`:
          //
          //   learner "is a unit just the name of the thing youre counting"
          //   tutor   "That is correct—…"                    <- served
          //
          // Confirming a false claim is a teaching-safety failure, not a style
          // preference, so it does not belong behind an optional flag.
          //
          // HOW, without forking the architecture: the SAME gate, the SAME
          // rerender closure and the SAME template fallback run — only the
          // CONTEXT differs. A deliberately permissive context is built so
          // that every other REJECT rule is structurally unable to fire
          // (budgets far above any real draft, all vocabulary and formula
          // locks open, no capability bans, calm affect, no assessment or
          // completion authorization in play). What remains is V-AFFIRM,
          // whose trigger is the learner's own words and the draft's opening,
          // neither of which this context can suppress.
          //
          // So a learner gets the safety floor always, and enabling the flag
          // still upgrades them to the full rule set with no duplicated work.
            // THE SAFETY FLOOR — UNCONDITIONAL, ahead of the flagged gate.
            //
            // This began life inside the `else`, so it ran only when the full
            // verifier was disabled. Measured in production: a turn that
            // vAffirm rejects deterministically ("Spot on" answering a
            // proposal, no distinguishing move) was served to the learner
            // unchanged. The full gate was running instead — in a mode that
            // logs without replacing — and the floor never executed.
            //
            // A safety rule whose execution depends on which mode another
            // subsystem happens to be in is not a floor. It runs first, always,
            // and the full gate then runs on whatever survives.
            //
            // Reusing `verifierGate` with a deliberately permissive context was
            // tried first and abandoned on inspection: `maxQuestions` is typed
            // `0 | 1`, and V-Q2 rejects any TEACH/SHOW/RECOVER/CLOSE draft that
            // ends in a question — which is most good teaching turns. A
            // "permissive" context is not actually reachable, so that route
            // would have regenerated ordinary turns for reasons unrelated to
            // safety and charged a model call for each.
            //
            // Running the single rule directly has no such side effects: a turn
            // is touched ONLY when the learner floated a definition and the
            // draft opened by agreeing with it.
            const { vAffirm } = await import('@/lib/kernel/verifier/rules')
            // The concept this turn taught — the excursion's target when one is
            // open, else the lesson's. Used only to retrieve the authored
            // correction below.
            // `resolvedConceptId` is included and ordered LAST-but-real:
            // measured in production, a fresh session's opening turns have no
            // snapshot concept and no library node yet, so the lookup returned
            // null and the learner got the GENERIC template instead of the
            // curriculum's definition — the exact outcome this fallback was
            // written to replace. The route logs `resolvedConceptId=
            // phys.meas.units` on those very turns, so it is the value that
            // was available all along.
            const teachingConceptIdForRepair =
              excursionDecisionHoisted?.targetConceptId
              ?? libraryConceptNodeIdHoisted
              ?? snapshotCurrentConceptId
              ?? resolvedConceptId
              ?? null
            // The concept's authored misconceptions, so the rule can tell a
            // learner who is WRONG from one who is RIGHT. Titles + symptom
            // phrases from BOTH registers; failure here degrades to the
            // conservative behaviour rather than taking the turn down.
            let knownMisconceptionText = ''
            try {
              const { loadBlueprintContent, loadEBConceptContext } =
                await import('@/lib/curriculum/blueprintLoader')
              const cid = teachingConceptIdForRepair
              if (cid) {
                const bp = loadBlueprintContent(cid)
                if (bp.found) {
                  for (const mc of bp.content.misconceptions) {
                    knownMisconceptionText += ` ${mc.title} ${mc.characteristicPhrase ?? ''}`
                  }
                }
                const eb = loadEBConceptContext(cid)
                if (eb.found) {
                  for (const mc of eb.context.ebMisconceptions) {
                    knownMisconceptionText += ` ${mc.title} ${mc.symptom ?? ''}`
                  }
                }
              }
            } catch { /* conservative default */ }

            const affirmCtx = { learnerText: message, knownMisconceptionText } as unknown as
              import('@/lib/kernel/verifier').VerifierContext
            const firstViolation = vAffirm(cleanText, affirmCtx)
            // The gate PASSES offline for this exact learner/concept pair, so a
            // production REJECT means the rule saw no misconception knowledge
            // and fell back to its conservative branch. Log the one value that
            // separates "knowledge missing" from "knowledge matched".
            console.log('[affirm-guard-known]', {
              conceptId: teachingConceptIdForRepair,
              knownChars: knownMisconceptionText.trim().length,
            })
            // Which branch ran, and did the rule even consider this turn?
            // Added after a production turn that SHOULD have tripped the guard
            // produced no log line at all, leaving three untestable
            // explanations. One line, no behaviour change — a safety rule whose
            // silence is ambiguous is not a safety rule you can trust.
            console.log('[affirm-guard-scope]', {
              branch: 'unconditional',
              considered: true,
              violated: firstViolation !== null,
            })
            if (firstViolation) {
              // One regeneration, carrying the violation as instruction — the
              // same appendix shape the full loop uses.
              // THE REPAIR CARRIES THE AUTHORED CORRECTION, NOT JUST A BAN.
              //
              // First measured attempt used a prohibition alone and the retry
              // ALSO affirmed, so the guard fell closed to a template — safe,
              // but the learner got no teaching. The reason is visible once
              // stated: "a unit is the name of the thing you're counting" is
              // not obviously false in everyday language, so telling the model
              // "don't agree" leaves it with nothing to say instead.
              //
              // So the repair hands it the curriculum's OWN correction — the
              // concept spine definition and any authored misconception repair
              // for this concept. Retrieval, not invention: the same Blueprint
              // and Educational Brain material the prompt already uses.
              let authored = ''
              try {
                const { loadBlueprintContent, loadEBConceptContext } =
                  await import('@/lib/curriculum/blueprintLoader')
                const cid = teachingConceptIdForRepair
                if (cid) {
                  const bp = loadBlueprintContent(cid)
                  if (bp.found && bp.content.conceptSpine?.definition) {
                    authored += `\nThe curriculum defines this concept as: ${bp.content.conceptSpine.definition}`
                  }
                  const eb = loadEBConceptContext(cid)
                  if (eb.found && eb.context.ebMisconceptions.length > 0) {
                    // THE MATCHING misconception, not simply the first. A
                    // concept carries several; handing over an unrelated one
                    // gives the model authored text about the wrong error.
                    // Scored on vocabulary shared with what the learner just
                    // said — their words against the authored symptom phrases,
                    // which is exactly what those phrases are recorded for.
                    const { contentWords } = await import('@/lib/teaching/visual/visualEngine')
                    const learnerWords = contentWords(message)
                    const score = (text: string) => {
                      let n = 0
                      for (const w of contentWords(text)) if (learnerWords.has(w)) n++
                      return n
                    }
                    const ranked = [...eb.context.ebMisconceptions]
                      .map((m) => ({ m, s: score(`${m.title} ${m.symptom ?? ''}`) }))
                      .sort((a, b) => b.s - a.s)
                    // Fall back to the first only when nothing overlaps at all,
                    // which is still better than no authored material.
                    const m = ranked[0].s > 0 ? ranked[0].m : eb.context.ebMisconceptions[0]
                    authored += `\nA known misconception here is "${m.title}".`
                    if (m.symptom) authored += ` Learners holding it say things like: ${m.symptom}`
                    if (m.recovery) authored += ` The authored repair: ${m.recovery}`
                  }
                }
              } catch { /* the repair still runs without authored material */ }

              const appendix =
                '\n\nOUTPUT REJECTED (server-side check). The learner PROPOSED a ' +
                'definition and your reply opened by agreeing with it ' +
                `("${firstViolation.matched ?? ''}"). Do NOT open with agreement. ` +
                'State the correct idea yourself in plain words, name explicitly ' +
                'how it differs from what they said, and only then build on it. ' +
                'If part of what they said was right, say which part and which ' +
                'part was not.' + authored +
                '\nAnswer in easy beginner language: short sentences, everyday ' +
                'words, one idea at a time, and explain any technical word you ' +
                'use. End with one short question that makes them USE the idea. ' +
                'Re-answer their question now.'
              let repaired = cleanText
              try {
                const routed = await routeAI(
                  [...historyMessages, { role: 'user', content: message }],
                  systemPrompt + appendix + outputLanguageBlockHoisted,
                  country, 2048, teachingLang,
                  { userId, subject: learnSession.subject.slug },
                )
                repaired = routed.text
                if (contentRegister === 'beginner') repaired = stripIpaNotation(repaired)
              } catch (regenErr) {
                console.warn('[affirm-guard] regeneration failed:', regenErr)
              }
              // FAIL CLOSED. If the retry still opens by agreeing, the draft is
              // not served: a deterministic template replaces it. Serving the
              // second draft "because it is probably better" is exactly the
              // trade this guard exists to refuse — a confirmed misconception
              // is worse than a plain, safe turn.
              const stillViolating = vAffirm(repaired, affirmCtx) !== null
              if (stillViolating) {
                // FAIL CLOSED, BUT STILL TEACH.
                //
                // The generic template ("Let's take one small step together…")
                // is safe and says nothing, and it was what a real learner got
                // when both attempts affirmed. Safety without teaching is half
                // a fix: the learner asked a real question and received filler.
                //
                // So the last resort is built from the curriculum's OWN words —
                // the concept-spine definition already retrieved above — wrapped
                // in an explicit refusal to agree. Deterministic, correct by
                // construction (it asserts only what the curriculum asserts),
                // and it carries the distinction the drafts kept missing.
                // WHAT IS SPOKEN HERE IS NOT WHAT IS PROMPTED.
                //
                // The blueprint spine is written for an AUTHOR. Its best case
                // is a real definition; its ordinary case is a mastery rubric
                // ("[Boundary statement] A student who achieves mastery
                // demonstrates: 1. Assigns the dimensional formula…"), and its
                // worst case — measured on a real learner — was an unfenced
                // `concept_id: … bloom: … mastery_threshold: …` profile block
                // read out verbatim. The loader now refuses the metadata case
                // outright; the rubric case is still wrong to SAY.
                //
                // The Knowledge Graph description is the one place the
                // curriculum states a concept in a single learner-facing
                // sentence, for all 1,775 concepts. It leads; the spine backs
                // it up; anything that does not read as prose is refused and
                // the generic template takes over.
                const readsAsProse = (t: string): boolean => {
                  const s = t.trim()
                  if (s.length < 25 || s.length > 400) return false
                  if (/^[[(]/.test(s)) return false          // "[Boundary statement] …"
                  if (/^\s*\d+[.)]\s/.test(s)) return false  // a numbered rubric item
                  return true
                }
                let spine: string | null = null
                const cid = teachingConceptIdForRepair
                try {
                  if (cid) {
                    const { getKGNode } = await import('@/lib/curriculum/knowledgeGraph')
                    const desc = getKGNode(cid)?.description?.trim()
                    if (desc && readsAsProse(desc)) spine = desc
                  }
                } catch { /* fall through to the blueprint */ }
                try {
                  const { loadBlueprintContent, looksLikeMetadata } =
                    await import('@/lib/curriculum/blueprintLoader')
                  if (!spine && cid) {
                    const bp = loadBlueprintContent(cid)
                    const d = bp.found ? bp.content.conceptSpine?.definition ?? null : null
                    if (d && !looksLikeMetadata(d) && readsAsProse(d)) spine = d
                  }
                } catch { /* fall through to the generic template */ }

                if (spine) {
                  // One sentence of the authored definition — enough to answer,
                  // short enough for a beginner.
                  const firstSentence = spine.split(/(?<=[.!?])\s/)[0] ?? spine
                  cleanText =
                    "Let's check that one carefully rather than me just agreeing — " +
                    'this is a place where it is easy to mix two things up.\n\n' +
                    firstSentence.trim() + '\n\n' +
                    'Tell me in your own words what part of that is different ' +
                    'from what you were picturing.'
                } else {
                  const { chooseFallback, renderFallback } = await import('@/lib/kernel/verifier')
                  cleanText = renderFallback(
                    chooseFallback(['SHOW_EASIEST_LEGAL', 'ECHO_MICROWIN', 'WARM_CLOSE']),
                    { learnerText: message } as never,
                  )
                }
                eosVerifierUsedTemplate = true
              } else {
                cleanText = repaired
              }
              eosVerifierAttempts = 2
              console.log('[affirm-guard]', {
                matched: firstViolation.matched,
                repaired: !stillViolating,
                usedTemplate: stillViolating,
              })
            }

          const runFullVerifier = eosFlags.outputVerifier
          console.log('[affirm-guard-scope]', {
            outputVerifierFlag: runFullVerifier,
            verifierMode: eosFlags.verifierMode,
          })
          if (runFullVerifier) {
            // Move mapping. RECOVER and CLOSE are checked FIRST and are not
            // derivable from evidenceMoveHoisted: decideNextMove() returns
            // 'teach' on a recovery turn, and the session layer owns CLOSING
            // entirely. Before this, every recovery turn reached the verifier
            // labelled TEACH and every closing turn as whatever the concept
            // ladder happened to say — so V-REC and V-Q2's RECOVER/CLOSE arms
            // were unreachable in production, and V-CLOSE could never fire.
            const { toPolicyMove, maxQuestionsFor } = await import('@/lib/kernel/policyMove')
            const verifierMove = toPolicyMove({
              recoveryKey: recoveryKeyHoisted,
              episodePhase: sessionEpisodeHoisted?.phase,
              ladderMove: evidenceMoveHoisted,
            })
            const ctx = buildVerifierContext({
              contentRegister,
              move: verifierMove,
              phase: conversationStateHoisted?.phase ?? null,
              stageCeiling: evidenceStageCeilingHoisted,
              vocabularyUnlocked: !firstLessonActiveHoisted,
              formulaUnlocked: !firstLessonActiveHoisted && contentRegister !== 'beginner',
              recoveryActive: recoveryKeyHoisted !== null,
              affectBand: frustrationBandHoisted ?? undefined,
              maxQuestions: maxQuestionsFor(verifierMove),
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
              noCapabilities: capabilityStateHoisted
                ? (await import('@/lib/teaching/capabilityModel')).noCapabilities(capabilityStateHoisted)
                : [],
              // S1 — history-aware LOG rules (additive; no behavior change
              // until these are promoted to REJECT per the design report).
              turnHistory: snapshotTurnHistory,
              recoveryKey: recoveryKeyHoisted,
              phaseAfter: conversationStateHoisted?.phase ?? null,
              // S2 — objective-model LOG rules (additive).
              objectiveCompleted: objectiveStateHoisted
                ? (await import('@/lib/teaching/objectiveModel')).isObjectiveLockedFromAssessment(objectiveStateHoisted)
                : undefined,
              objectiveStalled: objectiveStateHoisted
                ? (await import('@/lib/teaching/objectiveModel')).hasStalled(objectiveStateHoisted)
                : undefined,
            })
            const gate = await verifierGate({
              draftText: cleanText,
              ctx,
              mode: eosFlags.verifierMode,
              learnerText: message,
              fallbackChain: ['SHOW_EASIEST_LEGAL', 'ECHO_MICROWIN', 'WARM_CLOSE'],
              rerender: async (violationAppendix) => {
                const routed = await routeAI(
                  [...historyMessages, { role: 'user', content: message }],
                  // The violation appendix is English machine instruction and
                  // correctly stays English — but it lands AFTER the language
                  // contract, which is precisely the burial this whole fix
                  // exists to prevent. Re-appending the same block restores
                  // the contract to last position on repair turns, which are
                  // higher-risk than ordinary ones: the model has already
                  // produced output the runtime rejected. '' for English, so
                  // English re-renders are unchanged.
                  systemPrompt + violationAppendix + outputLanguageBlockHoisted,
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
            // Capability evidence (design §4): the answered turn's outcome
          // updates operational skills. Attribution honesty lives in
          // observationsFromTurn — a compound-item FAILURE updates nothing,
          // because failure proves the conjunction failed, not which conjunct.
          if (capabilityStateHoisted && requiredCapabilitiesHoisted.length > 0) {
            const capMod2 = await import('@/lib/teaching/capabilityModel')
            const obs = capMod2.observationsFromTurn({
              requiredCapabilities: requiredCapabilitiesHoisted,
              correct: teachingSignal?.correctness ?? null,
            })
            if (obs.length > 0) {
              // Append: a single turn can carry BOTH a stated inability and an
              // answered outcome. Replacing would silently drop the former.
              capabilityObservationsHoisted = [...capabilityObservationsHoisted, ...obs]
              capabilityStateHoisted = capMod2.foldCapabilityState(capabilityStateHoisted, obs)
            }
          }
          // K5 metrics: the rules and the loop already existed; nothing
            // aggregated them, so RS P-3's violation SLO was unmeasurable.
            const { foldVerifierMetrics, verifierTags } = await import('@/lib/kernel/verifier')
            const turnOutcome = {
              mode: gate.mode,
              decision: gate.loopResult.decision,
              attempts: gate.attempts,
              usedTemplate: gate.usedTemplate,
            }
            eosVerifierMetricsHoisted = foldVerifierMetrics(
              (snapshot?.verifierMetrics as Record<string, unknown> | undefined) as never,
              turnOutcome,
            )
            eosVerifierTagsHoisted = verifierTags(turnOutcome)
            snapshotRederivers.push((fresh) => ({
              verifierMetrics: foldVerifierMetrics(fresh.verifierMetrics as never, turnOutcome),
            }))
          }
        } catch (err) {
          // Was silent before. A guard that fails invisibly is indistinguishable
          // from a guard that passed, which is exactly the ambiguity this
          // investigation has been fighting.
          console.error('[affirm-guard-error] the verifier block threw:', err)
          // Fail-open: never break the turn on verifier failure.
          console.warn('[learn/chat] EOS verifier gate skipped:', err)
        }
      }

      // S1 — append this turn to the history ring, unconditionally (not
      // gated on eosFlags.outputVerifier): the ring must accumulate whether
      // or not any consumer is currently enabled, matching this route's own
      // K7 frustration convention above, or the ring would be stale on the
      // day the V-DUP-*/V-OSCILLATE rules are promoted to REJECT.
      try {
        const { buildTurnRecord, appendTurn, serializeTurnHistory } = await import('@/lib/kernel/verifier/history')
        const { repliesWithQuestion: repliesWithQuestionForHistory } = await import('@/lib/teaching/conversationState')
        const record = buildTurnRecord(cleanText, {
          askedQuestion: repliesWithQuestionForHistory(cleanText),
          recoveryKey: recoveryKeyHoisted,
          phaseAfter: conversationStateHoisted?.phase ?? null,
        })
        turnHistoryUpdateHoisted = { turnHistory: serializeTurnHistory(appendTurn(snapshotTurnHistory, record)) }
        snapshotRederivers.push((fresh) => {
          const readFresh = readTurnHistoryShared(fresh.turnHistory)
          return { turnHistory: serializeTurnHistory(appendTurn(readFresh, record)) }
        })
      } catch { /* additive; never break the turn */ }

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
          const { isDontKnowSignal } = await import('@/lib/teaching/recoveryGuard')
          const { enforceStance, claimsCompletionInProse } = await import('@/lib/teaching/stanceEnforcement')
          const { isDegradedProvider } = await import('@/lib/eos-runtime/degradedMode')
          const askedQuestionThisTurn = repliesWithQuestion(cleanText)
          // Turn Parity Observer: compare what the server decided against
          // what the LLM actually rendered. Measurement only — no blocking.
          const parityViolationThisTurn = !!(
            evidenceMoveHoisted === 'ask' && !askedQuestionThisTurn
          )
          // THE LESSON'S LADDER IS FROZEN WHILE THE LESSON IS PAUSED.
          //
          // This fold is where a turn's evidence becomes the lesson's mastery.
          // On an excursion turn the learner was answering questions about the
          // SIDE concept, so folding that SIGNAL here credited correctAtCheck /
          // correctAtPractice for a lesson they had stepped away from — and
          // those are exactly the counters the completion gate reads. A detour
          // could therefore manufacture the mastery that "finished" the lesson.
          //
          // Assigning the unchanged state (rather than skipping the fold) is
          // deliberate: the persist block further down folds a FALLBACK when
          // conversationStateAfterTurnHoisted is null, so skipping would have
          // been silently undone there. Paused means paused — no phase
          // advance, no mastery credit, no counters moved.
          conversationStateAfterTurnHoisted = excursionActiveHoisted
            ? conversationStateHoisted
            : advanceConversationState(conversationStateHoisted, {
              askedQuestion: askedQuestionThisTurn,
              signalCorrect: teachingSignal?.correctness ?? null,
              recoveryFired: recoveryKeyHoisted !== null,
              learnerRequest: learnerRequestHoisted,
              misconceptionDetected: teachingSignal?.phrase !== undefined,
              isPriorKnowledgeProbe: isPriorKnowledgeProbe(cleanText),
              strategyUsed: selectedStrategyHoisted ?? undefined,
              signalConfidence: teachingSignal?.confidence as 'high' | 'medium' | 'low' | undefined,
              dontKnowSignal: isDontKnowSignal(recoveryKeyHoisted),
              learnerIssuedDirective: recoveryKeyHoisted === 'too_many_questions',
              signalVerificationStatus: signalVerificationStatusHoisted,
              parityViolation: parityViolationThisTurn,
              // RS P-3: an outage template taught nothing, so it must not be
              // folded as a give. See TurnEvidence.degradedTurn.
              degradedTurn: isDegradedProvider(provider),
              // The server's own decided move, not a guess from prose. A turn
              // that taught AND ended on a question is still a give; treating
              // it as "taught nothing" is what froze the ladder at DEMONSTRATE.
              deliveredTeaching: evidenceMoveHoisted === 'teach' || evidenceMoveHoisted === 'show',
              // Advances the delivery phases only (OBSERVE→DEMONSTRATE→GUIDE→
              // CHECK); the mastery gates still require a real answer.
              acknowledgement: lowSignalAckHoisted,
            })

          // Loop 2: advance narrative state with this turn's evidence
          if (narrativeStateHoisted) {
            const { advanceNarrativeState, deriveNarrativeEvidence } = await import('@/lib/teaching/narrativeTracker')
            const evidence = deriveNarrativeEvidence(
              conversationStateAfterTurnHoisted.phase,
              conversationStateAfterTurnHoisted.demonstrated,
              evidenceMoveHoisted ?? 'teach',
            )
            narrativeStateHoisted = advanceNarrativeState(narrativeStateHoisted, evidence)
          }

          const stanceVerdict = enforceStance({
            text: cleanText,
            state: conversationStateAfterTurnHoisted,
            // The answer to "why did completion fire while an excursion was
            // open?": the gate was never told. It is now an explicit input,
            // checked ahead of the evidence test.
            excursionActive: excursionActiveHoisted,
            move: evidenceMoveHoisted === 'teach' ? 'teach' : evidenceMoveHoisted === 'show' ? 'show' : evidenceMoveHoisted === 'ask' ? 'ask' : null,
            misconceptionActive: conversationStateAfterTurnHoisted.misconceptionDetectedThisLesson,
          })
          // "A prose completion claim was made and enforceStance removed it."
          // Deliberately NOT gated on `completionAuthorized`: that is false for
          // every turn without the tag, including an earned one, and the same
          // mistake produced a false positive inside the pure module. The
          // before/after comparison asks only what actually happened.
          const claimedCompletionInProse =
            claimsCompletionInProse(cleanText) && !claimsCompletionInProse(stanceVerdict.cleanText)
          cleanText = stanceVerdict.cleanText
          masteryCompletionSuppressedHoisted = !stanceVerdict.completionAuthorized && stanceVerdict.violations.some((v) => v.code === 'FALSE_MASTERY_COMPLETION')
          if (masteryCompletionSuppressedHoisted) masteryGatePendingHoisted = true

          // STRIPPING THE LIE IS HALF THE JOB. The turn still READS like an
          // ending — the model wrote a wrap-up — while the lesson is genuinely
          // open. Say so, in the learner's own terms, from the counters the
          // server already holds. No invention: if the gate is waiting on
          // practice, that is exactly what this asks for.
          if (claimedCompletionInProse) {
            const { MASTERY_PRACTICE_REQUIRED } = await import('@/lib/teaching/masteryGate')
            const need = Math.max(
              0,
              MASTERY_PRACTICE_REQUIRED - (conversationStateAfterTurnHoisted.correctAtPractice ?? 0),
            )
            cleanText = `${cleanText}\n\n` + (need > 0
              ? `Before we call this lesson finished, let's do ${need === 1 ? 'one more practice question' : `${need} practice questions`} together — ready?`
              : `We are not quite finished yet — let's check one more thing before we move on.`)
            console.log('[completion-claim]', { stripped: true, practiceStillNeeded: need })
          }
          stanceViolationsHoisted = stanceVerdict.violations.map((v) => v.code)

          // THE LADDER DID NOT MOVE, AND NOTHING SAYS WHY.
          //
          // Measured in production: a learner gave three correct answers and an
          // explicit "yes, I am ready" across a clean session, and every turn
          // came back phase=OBSERVE, checkCorrect=0, practiceCorrect=0. If that
          // is real then no learner can ever reach a mastery gate, which would
          // make every lesson uncompletable.
          //
          // Three candidates the existing logs cannot separate: the model never
          // emits the SIGNAL tag; it emits it but with correctness absent; or
          // the fold runs and the transition is gated elsewhere. This prints
          // the tag's presence, its parsed values, and the phase either side of
          // the fold — one line, no behaviour change. Guessing has been wrong
          // five times in this investigation; instrumenting has been right.
          console.log('[ladder]', {
            signalTag: teachingSignal !== null,
            correctness: teachingSignal?.correctness ?? null,
            // THE RESIDUAL GAP, MEASURED RATHER THAN GUESSED AT.
            //
            // Deterministic grading covers MCQ turns. A gate turn (CHECK /
            // PRACTICE) that asks WITHOUT an MCQ can still produce no evidence
            // at all, because the SIGNAL tag is the only other source and the
            // model does not emit it. `buildMcqInstruction` makes MCQ the
            // default for anything gradeable, so how often that contract is
            // broken is an empirical question — and the answer decides whether
            // this needs its own fix or is already rare enough to leave.
            move: evidenceMoveHoisted,
            mcqAsked: mcqHoisted !== null,
            ack: lowSignalAckHoisted,
            excursion: excursionActiveHoisted,
            askedQuestion: askedQuestionThisTurn,
            phaseBefore: conversationStateHoisted?.phase ?? null,
            phaseAfter: conversationStateAfterTurnHoisted?.phase ?? null,
            check: conversationStateAfterTurnHoisted?.correctAtCheck ?? null,
            practice: conversationStateAfterTurnHoisted?.correctAtPractice ?? null,
          })
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

      // ── Visual channels ──────────────────────────────────────────────────
      // Declared empty and written in exactly ONE place: the authority clamp
      // below. Nothing between the model's reply and that clamp may put a
      // figure on the learner's screen.
      //
      // Four legacy pipelines used to run here, each deriving a figure from
      // `cleanText` — the tutor's own prose — with no concept input at all:
      //   planVisualTeaching()            2D spec from prose keywords
      //   routeSceneGenerator()/generateRoutedScene()  parametric scene from prose
      //   buildSceneSpec()                3D scene from prose regex
      //   generateVisualizationCode()     LLM-authored component from prose
      // They were gated on `v2OwnsVisual`, so they activated precisely when the
      // authority had failed — the moment guessing is least defensible. That
      // gate, and the pipelines behind it, are gone. The modules remain on disk
      // as authoring backends; they are simply not runtime authorities.
      let detectedVisualSpec: VisualSpec | null = null
      let detectedSceneSpec: SceneSpec | null = null
      let dynamicVisualizationCode: string | null = null

      // ── THE authority clamp — the single writer of every visual channel ──
      //
      // Runs UNCONDITIONALLY. It used to be `if (visualDecisionHoisted)`, which
      // meant a turn where the resolver never ran kept whatever the legacy
      // pipelines and the model's own tag had produced. Now every channel is
      // cleared first and refilled only from the decision, so the three states
      // that matter collapse to two outcomes:
      //
      //   resolver produced a figure  -> exactly that figure, and only it
      //   resolver declined          -> NO VISUAL
      //   resolver threw / never ran -> NO VISUAL   (identical to declining)
      //
      // There is no path from here to a figure the authority did not choose.
      //
      // The model's own VISUAL:<type> tag survives only as a REFINEMENT: it may
      // pick a different type WITHIN the concept's legal set (decision.allowed)
      // and is otherwise discarded, preserving the 2026-08-02 canonical-
      // ownership fix — the model can never introduce another concept's visual.
      //
      // The teaching-strategy SUPPRESS_OPTIONAL bias blocks that used to sit
      // here were removed with the pipelines they filtered. They inspected
      // detectedVisualSpec/detectedSceneSpec, which no longer hold anything at
      // this point, and post-hoc suppression of a single-authority decision
      // would be a second authority by another name. Suppression belongs on the
      // resolver's INPUT, not on its output; that is a later milestone.
      {
        const decision = visualDecisionHoisted
        const llmTag = responseVisual as import('@/lib/school/visuals/visualTypes').VisualType | null
        responseVisual = null
        detectedVisualSpec = null
        detectedSceneSpec = null
        dynamicVisualizationCode = null

        // A null payload is the NO-FIGURE decision: the concept has no faithful
        // visual, so every channel stays null and the learner sees text only.
        // This is a successful outcome, not a failure to render.
        switch (decision?.payload?.renderer) {
          case 'card': {
            const legal = decision.allowed ?? [decision.payload.visualType]
            responseVisual = llmTag && legal.includes(llmTag) ? llmTag : decision.payload.visualType
            break
          }
          case 'spec':
            detectedVisualSpec = decision.payload.visualSpec
            break
          case 'scene':
            detectedSceneSpec = decision.payload.sceneSpec
            break
          default:
            break   // no decision, no payload, or the retired ascii member
        }
      }

      const visualFired = Boolean(detectedVisualSpec || detectedSceneSpec || responseVisual)

      // ADR 15: create RRM entry after visual pipeline resolution.
      // Single-writer: this is the ONLY path that writes RRM entries.
      let rrmEntryThisTurn: import('@/lib/teaching/renderedRealityModel').RRMEntry | null = null
      if (visualFired) {
        try {
          const { createRRMEntry } = await import('@/lib/teaching/renderedRealityModel')
          rrmEntryThisTurn = createRRMEntry({
            visualType: responseVisual,
            visualSpec: detectedVisualSpec,
            sceneSpec: detectedSceneSpec,
            dynamicVisualizationCode,
            responseVisual,
            matchedConcept: resolvedConceptId ?? snapshotCurrentConceptId ?? libraryConceptNodeIdHoisted ?? null,
            turnNumber: snapshotRRMLog.length + 1,
          })
        } catch { /* non-fatal — RRM is additive, absence = today's behavior */ }
      }

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
      // THE FIGURE THIS MESSAGE SHOWED, recorded ON the message.
      //
      // Identity only — the same VisualSession the session slot already holds.
      // The payload is never copied: restoreVisualSession() re-derives it
      // through the resolver and the same admission gate this turn cleared, so
      // a history reload costs 0 LLM calls and 0 generation calls.
      //
      // Written ONLY when this turn actually put a figure on screen. A turn
      // that showed nothing stores null, which is what stops a later reload
      // from lending this message somebody else's picture.
      // D6 — A HELD LESSON FIGURE IS NOT THIS MESSAGE'S FIGURE.
      //
      // Found by reading the learner's own restored history after the
      // persistence fix shipped: two CATALYST answers had a FREE-BODY DIAGRAM
      // recorded beside them. Faithful to the screen — continuity keeps a
      // figure the learner is mid-read rather than yanking it away — but wrong
      // as a record. On screen it was a passing oddity; stored, it is a
      // permanent claim that this explanation had that picture.
      //
      // So: record the figure only when it depicts what this turn TAUGHT. An
      // excursion turn whose figure still belongs to the paused lesson records
      // nothing, and `restoreMessageVisuals` already treats absent as "this
      // message showed no figure" rather than "look elsewhere".
      //
      // Deliberately narrow — it changes what is WRITTEN, never what is shown.
      // Continuity on screen is untouched.
      const figureBelongsToThisTurn = (() => {
        const session = visualDecisionHoisted?.session
        if (!session) return false
        const excursionOpen = excursionDecisionHoisted?.state.active === true
        if (!excursionOpen) return true
        const taught = excursionDecisionHoisted?.targetConceptId ?? null
        // An unresolved-topic excursion has no concept at all, so no figure can
        // depict it — nothing is recorded, which is the honest answer.
        if (!taught) return false
        return session.conceptId === taught
      })()

      const displayedVisualSession =
        visualDecisionHoisted?.graphical && visualDecisionHoisted.session && figureBelongsToThisTurn
          ? (visualDecisionHoisted.session as unknown as Prisma.InputJsonValue)
          : undefined

      let assistantMessage
      try {
        assistantMessage = await withRetry(() => prisma.message.create({
          data: {
            sessionId, role: MessageRole.ASSISTANT, content: cleanText, provider,
            ...(displayedVisualSession ? { visualSession: displayedVisualSession } : {}),
          },
        }))
      } catch (err) {
        // Same degradation rule as `provider`: the turn must never fail because
        // of a column a deploy has not applied yet. The teaching is the point;
        // the figure's identity is a nice-to-have on this write.
        console.error('[learn/chat] message.create with provider/visual failed, retrying without them:', err)
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
      // ISS-18: the PERSISTED copy is hashed for minors. The repair contract
      // above reads the live signal in memory and is unaffected; what the
      // hash removes is a later reader's ability to reconstruct a child's
      // sentence, while identical phrases still group identically.
      if (teachingSignal?.phrase) {
        const { persistableVerbatim } = await import('@/lib/teaching/verbatimRedaction')
        appendEvidenceEvent({
          userId,
          sessionId,
          turnId:    assistantMessage.id,
          conceptId: resolvedConceptId ?? memoryState?.conceptId ?? learnSession.subject.slug,
          language:  teachingLang,
          gradeBand: memoryState?.gradeBand ?? GradeBand.ADULT,
          category:  EvidenceCategory.MISCONCEPTION_DETECTED,
          outcome:   persistableVerbatim(teachingSignal.phrase.slice(0, 200), { grade: profile?.grade }),
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
        // `!excursionActiveHoisted`: the same attribution boundary the ladder
        // and the completion gate use. A learner working through a concept
        // THEY asked for is not in a failure spiral on the lesson, and
        // spending the lesson session's affect budget on their side-question
        // doubts is what drove the episode to CLOSING and produced "let's
        // pause on that for today". The budget is not disabled — excursion
        // doubts simply do not pay into the paused lesson's arc.
        if (sessionEpisodeHoisted && !excursionActiveHoisted) {
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
      // `!excursionActiveHoisted`: this checkpoint writes TopicProgress for the
      // LESSON concept from this turn's SIGNAL. During an excursion the signal
      // is about the side concept, so writing it here recorded progress on a
      // lesson the learner was not working on — the same mis-attribution as the
      // ladder fold above, in the database rather than the snapshot.
      if (!excursionActiveHoisted && resolvedConceptId && teachingSignal && teachingSignal.correctness !== undefined) {
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
                  // activeLessonSlug is cleared with it: this adjustment is
                  // meaningless if a stale explicit selection still outranks
                  // the lowered position in selectCurrentLesson. Found while
                  // auditing writers for the Persisted Active Lesson — this is
                  // the third and last writer of currentLesson.
                  data: { currentLesson: lowered, activeLessonSlug: null },
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
          // Persist on a boundary turn even when nothing failed: snapshotSessionFailureCount
          // was reset to 0 for this episode at the read site, and a reset that is
          // only held in memory is undone by the next turn re-reading the stale
          // persisted value.
          const failureCountUpdate = (failureThisTurn || episodeBoundary)
            ? { sessionFailureCount: newSessionFailureCount }
            : {}
          // ISS-13: the counter is an increment over the base, so a concurrent
          // turn's increment must not be overwritten by ours. That re-derivation
          // is correct only WITHIN an episode — across a boundary the stored
          // value belongs to the previous episode, so re-deriving from it would
          // resurrect exactly the count this reset exists to drop. On a boundary
          // turn our own value is authoritative.
          if (failureThisTurn && !episodeBoundary) {
            snapshotRederivers.push((fresh) => ({
              sessionFailureCount: (typeof fresh.sessionFailureCount === 'number' ? fresh.sessionFailureCount : 0) + 1,
            }))
          }

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
              // Same boundary as the synthetic recovery failure above: a wrong
              // answer about the side concept is not a failure on the paused
              // lesson, so it does not spend that session's affect budget.
              const nextEpisode = excursionActiveHoisted
                ? sessionEpisodeHoisted
                : applySignalToEpisode(sessionEpisodeHoisted, teachingSignal, {
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
          // P3: fold this turn's questions into the asked-question ledger and
          // ride the same snapshot persist as every other counter. This is
          // what makes "never ask the same thing twice" enforceable — the
          // previous runtime counted questions but never remembered them.
          {
            const { recordQuestions } = await import('@/lib/teaching/repetitionGuard')
            conversationStateUpdate.questionLedger = recordQuestions(questionLedgerHoisted, cleanText)
          }
          // A healthy turn clears the outage streak; an outage turn carries it.
          conversationStateUpdate.consecutiveOutages = consecutiveOutagesHoisted
          // Persist THIS turn's question so the next turn can grade the reply
          // against its stored correctIndex; write null when the turn asked
          // nothing, so a stale MCQ can never grade an unrelated later message.
          // UNCONDITIONAL on purpose: the first draft of this sat inside
          // `if (teachingHistoryHoisted)`, which is exactly the mistake that
          // left the teaching ledger stale for months (see the note above it).
          conversationStateUpdate.pendingMcq = mcqHoisted
            ? { question: mcqHoisted.question, options: mcqHoisted.options, correctIndex: mcqHoisted.correctIndex }
            : null
          // P6.5: fold a CLOSED concept into the lesson attempt — the single
          // owner of lesson-scoped outcomes. A concept closes exactly two ways
          // (mastered, or budget spent), and isConceptClosed owns that test so
          // no third closing condition can be invented here. Concept-level
          // review status goes to TopicProgress, the pre-existing review owner.
          // Never blocks the turn: an outcome-persistence failure must not cost
          // the learner their reply.
          try {
            const stateForOutcome = conversationStateAfterTurnHoisted
            if (stateForOutcome?.conceptId) {
              const { isConceptClosed, lessonKeyFor, recordConceptOutcome } =
                await import('@/lib/teaching/lessonAttempt')
              if (isConceptClosed(stateForOutcome)) {
                // LessonContext addresses lessons by order within the
                // subject's curriculum; lessonKeyFor renders that into the
                // single key format so one lesson cannot be recorded twice
                // under two identities.
                const lessonKey = lessonKeyFor({ lessonOrder: lessonCtx?.currentLesson ?? null })
                if (lessonKey) {
                  const store = await import('@/lib/teaching/lessonAttemptStore')
                  const { id, outcome } = await store.openLessonAttempt(prisma, {
                    userId,
                    subjectSlug: learnSession.subject.slug,
                    lessonKey,
                    lessonTitle: lessonCtx?.lessonTitle ?? null,
                  })
                  const folded = recordConceptOutcome(
                    outcome, stateForOutcome, lessonCtx?.lessonTitle ?? null,
                  )
                  await store.saveLessonAttempt(prisma, id, folded)
                  if (folded.conceptsNeedingReview.includes(stateForOutcome.conceptId)) {
                    await store.markConceptForReview(prisma, {
                      userId,
                      subjectSlug: learnSession.subject.slug,
                      topicSlug: stateForOutcome.conceptId,
                    })
                  }
                  // P6.6: has every required concept in this lesson closed?
                  // The lesson -> concept mapping is the canonical KG one the
                  // route already resolved (resolvedConceptId IS this lesson's
                  // KG node slug); nothing is inferred or guessed. An empty
                  // requirement can never complete a lesson.
                  const { requiredConceptsForLesson, shouldFinalizeLesson, buildCompletionPayload } =
                    await import('@/lib/teaching/lessonCompletion')
                  const required = requiredConceptsForLesson(
                    resolvedConceptId ?? stateForOutcome.conceptId,
                  )
                  if (shouldFinalizeLesson(required, folded)) {
                    const { outcome: finalOutcome, summary } =
                      await store.finalizeLessonAttempt(prisma, id, folded)
                    lessonCompletionHoisted = buildCompletionPayload(
                      finalOutcome, summary, lessonCtx?.currentLesson ?? null,
                      { lang: teachingLang, conceptId: resolvedConceptId },
                    )
                    // ── THE COMPLETING TURN MUST NOT ALSO TEACH ────────────
                    // The completion GATE (lessonCompletedHoisted -> D-0a ->
                    // SERVE_LESSON_COMPLETE) is read at the START of a turn
                    // from the previously-persisted attempt. The completion
                    // EVENT is decided HERE, at the end of the turn, from this
                    // turn's folded evidence. On the finalising turn the gate
                    // was therefore still false: the turn ran as an ordinary
                    // teaching turn and the model had already produced a new
                    // question by the time completion was known. The route
                    // then emitted BOTH — which is exactly the production
                    // report, "✓ Lesson finished" shown next to another
                    // teaching question, and the same reflection question
                    // asked again on the following turn.
                    //
                    // buildLessonCompleteBlock() could never fix this: it is
                    // prompt text (advisory), and it is only injected on LATER
                    // turns, after the gate has flipped.
                    //
                    // The runtime already holds the correct answer, so the
                    // outgoing turn is replaced with the deterministic close
                    // rendered from the SAME finalised attempt + summary the
                    // completion payload carries. No new state, no new copy
                    // source — buildLessonCloseText is the one builder the
                    // already-complete serve path uses too.
                    const { buildLessonCloseText } = await import('@/lib/teaching/lessonCompletion')
                    cleanText = buildLessonCloseText(finalOutcome.lessonTitle, summary, {
                      lang: teachingLang, conceptId: resolvedConceptId,
                    })
                    // Nothing that solicits a further answer may ride along:
                    // a tappable question or a hint would re-open the lesson
                    // the learner has just been told is finished.
                    mcqHoisted = null
                    hintHoisted = null
                    // NO PENDING QUESTION SURVIVES. The reflection question
                    // this turn had drafted is no longer being delivered, but
                    // the ladder must still treat this CHECK entry as spent —
                    // otherwise the next turn re-enters CHECK believing no
                    // reflection question has been asked yet and asks the same
                    // one again, which is the reported "Brain asks EXACTLY THE
                    // SAME question" behaviour. reflectionAskedThisEntry=true
                    // is questionLegality's existing "max 1 reflection
                    // question per entry" latch; this sets it rather than
                    // adding a second pending-question representation.
                    if (conversationStateAfterTurnHoisted) {
                      conversationStateAfterTurnHoisted = {
                        ...conversationStateAfterTurnHoisted,
                        reflectionAskedThisEntry: true,
                      }
                    }
                  }
                }
              }
            }
          } catch (outcomeErr) {
            console.warn('[learn/chat] lesson outcome persist failed:',
              outcomeErr instanceof Error ? outcomeErr.message : String(outcomeErr))
          }
          // K5: session-scoped verifier metrics ride the same snapshot persist
          // as every other counter — no new store, no new writer.
          if (eosVerifierMetricsHoisted) {
            conversationStateUpdate.verifierMetrics = eosVerifierMetricsHoisted
          }
          if (kernelParityMetricsHoisted) {
            conversationStateUpdate.kernelParity = kernelParityMetricsHoisted
          }
          // K4: engine-vs-route parity rides the same snapshot persist.
          if (enginePolicyParityHoisted) {
            conversationStateUpdate.enginePolicyParity = enginePolicyParityHoisted
          }
          // K7: the Frustration machine's state rides the same persist.
          if (frustrationAfterTurnHoisted) {
            conversationStateUpdate.frustration = frustrationAfterTurnHoisted
          }
          // Capability session tier — same snapshot persist, no new store.
          if (capabilityStateHoisted && Object.keys(capabilityStateHoisted).length > 0) {
            conversationStateUpdate.capabilities = capabilityStateHoisted
            // ISS-13: capability state is a fold too — readCapabilityState off
            // the turn-start snapshot, then this turn's observations folded in
            // (a stated inability early, an answered outcome later, both
            // accumulated in capabilityObservationsHoisted). Re-fold ONLY this
            // turn's observations onto the fresh base, so a concurrent turn's
            // capability evidence is not overwritten. Also missed in the
            // original ISS-13 pass.
            if (capabilityObservationsHoisted.length > 0) {
              const capturedObs = capabilityObservationsHoisted
              // The re-deriver is a SYNC callback, so the module is resolved
              // HERE (where await is legal) and captured — not required from
              // inside it. This file is ESM; `require` would not resolve.
              const { foldCapabilityState, readCapabilityState } =
                await import('@/lib/teaching/capabilityModel')
              snapshotRederivers.push((fresh) => ({
                capabilities: foldCapabilityState(
                  readCapabilityState(fresh.capabilities), capturedObs,
                ),
              }))
            }
          }
          if (conversationStateAfterTurnHoisted) {
            conversationStateUpdate.conversationState = conversationStateAfterTurnHoisted
          } else if (conversationStateHoisted) {
            const { advanceConversationState, repliesWithQuestion, isPriorKnowledgeProbe } = await import('@/lib/teaching/conversationState')
            const { isDontKnowSignal } = await import('@/lib/teaching/recoveryGuard')
            const { isDegradedProvider } = await import('@/lib/eos-runtime/degradedMode')
            const fallbackAskedQ = repliesWithQuestion(cleanText)
            Object.assign(conversationStateUpdate, {
              conversationState: advanceConversationState(conversationStateHoisted, {
                askedQuestion: fallbackAskedQ,
                signalCorrect: teachingSignal?.correctness ?? null,
                recoveryFired: recoveryKeyHoisted !== null,
                learnerRequest: learnerRequestHoisted,
                isPriorKnowledgeProbe: isPriorKnowledgeProbe(cleanText),
                strategyUsed: selectedStrategyHoisted ?? undefined,
                signalConfidence: teachingSignal?.confidence as 'high' | 'medium' | 'low' | undefined,
                dontKnowSignal: isDontKnowSignal(recoveryKeyHoisted),
                learnerIssuedDirective: recoveryKeyHoisted === 'too_many_questions',
                signalVerificationStatus: signalVerificationStatusHoisted,
                parityViolation: !!(evidenceMoveHoisted === 'ask' && !fallbackAskedQ),
                // Same guard as the upstream fold — the two must not disagree
                // about whether an outage template taught anything.
                degradedTurn: isDegradedProvider(provider),
                deliveredTeaching: evidenceMoveHoisted === 'teach' || evidenceMoveHoisted === 'show',
                acknowledgement: lowSignalAckHoisted,
              }),
            })
          }

          // S2 — fold this turn's evidence into the objective ledger, using
          // whichever post-fold ConversationState the block above actually
          // produced (mastery-gate rework's own upstream fold takes
          // priority; the else-branch fold is the fallback, exactly the
          // same precedence conversationStateUpdate.conversationState uses).
          if (objectiveStateHoisted) {
            const { advanceObjectiveState } = await import('@/lib/teaching/objectiveModel')
            const stateAfterTurn = (conversationStateUpdate.conversationState as
              import('@/lib/teaching/conversationState').ConversationState | undefined)
              ?? conversationStateAfterTurnHoisted
              ?? conversationStateHoisted
            const wasAttempt = teachingSignal?.correctness !== undefined && teachingSignal?.correctness !== null
            const preFoldPhase = conversationStateHoisted?.phase ?? null
            const wasAssessmentAttempt = wasAttempt && (preFoldPhase === 'CHECK' || preFoldPhase === 'PRACTICE' || preFoldPhase === 'TRANSFER')
            const phaseAdvanced = preFoldPhase !== null && stateAfterTurn?.phase !== undefined && stateAfterTurn.phase !== preFoldPhase
            const objectiveNowIso = new Date(turnReceivedAt).toISOString()
            const updatedObjectiveState = advanceObjectiveState(objectiveStateHoisted, {
              wasAttempt,
              wasAssessmentAttempt,
              stateAfterTurn: stateAfterTurn ?? null,
              phaseAdvanced,
              nowIso: objectiveNowIso,
            })
            conversationStateUpdate.objectiveState = updatedObjectiveState
            const capturedObjectiveId = objectiveStateHoisted.objectiveId
            const capturedEv = { wasAttempt, wasAssessmentAttempt, stateAfterTurn: stateAfterTurn ?? null, phaseAdvanced, nowIso: objectiveNowIso }
            snapshotRederivers.push((fresh) => {
              const { readObjectiveState: readFreshObj } = require('@/lib/teaching/objectiveModel') as typeof import('@/lib/teaching/objectiveModel')
              return { objectiveState: advanceObjectiveState(readFreshObj(fresh.objectiveState, capturedObjectiveId), capturedEv) }
            })
          }

          // TEACHING MEMORY IS WRITTEN ON EVERY TAUGHT TURN.
          //
          // This persist used to require `selectedStrategyHoisted !== null`.
          // That variable is assigned in exactly ONE place — inside
          // `if (learnerRequestHoisted === 'explain_differently')` — so the
          // whole ledger (explanationCount, strategiesUsed, mcqAsked,
          // explanationsServed, confidence, frustration, mastery) was persisted
          // only on the rare turns where the learner explicitly asked for a
          // different explanation. Every ordinary teaching turn taught
          // something and recorded nothing.
          //
          // The read at ~1694 is unconditional, so the next turn re-read a
          // ledger that had never been updated: buildTeachingMemoryBlock told
          // the model nothing had been taught yet, and it explained the same
          // concept again. That is the "teaching memory appears partially
          // forgotten" symptom — partially, because the rare
          // explain_differently turns DID write, so the ledger was stale rather
          // than empty. It is also why an identical MCQ could be re-asked:
          // recordMcqAsked sits inside this same block.
          //
          // The strategy index is the only field that is genuinely
          // strategy-scoped, so it is the only one still conditional; every
          // other field is turn-general and now always folds. No new state, no
          // duplicated counter — the same single owner, written when it should
          // always have been.
          if (teachingHistoryHoisted) {
            const { updateTeachingHistory, computeFrustration, computeMastery, readTeachingHistory } = await import('@/lib/teaching/teachingHistory')
            const updatedHistory = updateTeachingHistory(teachingHistoryHoisted, {
              strategiesUsed: selectedStrategyHoisted !== null
                ? [...new Set([...teachingHistoryHoisted.strategiesUsed, selectedStrategyHoisted])]
                : teachingHistoryHoisted.strategiesUsed,
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
            // P7: fold this turn's memory evidence into the SAME owner --
            // which assessment question was asked (so an identical MCQ is
            // never repeated) and the confidence reading (so the adaptation
            // engine has a trend, not just a current value).
            const { recordMcqAsked, recordConfidence, recordExplanationServed } = await import('@/lib/teaching/teachingHistory')
            let memoryHistory = updatedHistory
            if (mcqHoisted?.question) memoryHistory = recordMcqAsked(memoryHistory, mcqHoisted.question)
            // The write half of the already-read guard above. Recorded only
            // when the asset was actually SERVED to the learner this turn —
            // an assembled-but-not-served asset (the Brain routed elsewhere)
            // was never read, so it must stay servable.
            if (provider === 'memory' && assembled?.explanationAssetId) {
              memoryHistory = recordExplanationServed(memoryHistory, assembled.explanationAssetId)
            }
            const confReading = teachingSignal?.confidence
            if (confReading === 'high' || confReading === 'medium' || confReading === 'low') {
              memoryHistory = recordConfidence(memoryHistory, confReading)
            }
            conversationStateUpdate = { ...conversationStateUpdate, teachingHistory: memoryHistory }
            // ISS-13: teachingHistory is a fold over the snapshot read at the
            // start of this turn (readTeachingHistory, ~1700 lines up), so a
            // concurrent turn's update would be discarded by re-applying our
            // value. Re-fold this turn's contribution onto whatever is
            // actually there. Missed in the original ISS-13 pass, which
            // registered five of the seven accumulative fields.
            const capturedStrategy = selectedStrategyHoisted
            // The history carries the concept it was read for, so the re-read
            // is scoped identically without reaching for an out-of-scope id.
            const historyConceptId = teachingHistoryHoisted.conceptId
            snapshotRederivers.push((fresh) => {
              const base = readTeachingHistory(fresh.teachingHistory, historyConceptId)
              return {
                teachingHistory: updateTeachingHistory(base, {
                  // Same strategy-scoping as the primary fold above: a turn
                  // with no selected strategy must not invent one when
                  // re-folding onto a concurrently-updated base.
                  strategiesUsed: capturedStrategy !== null
                    ? [...new Set([...base.strategiesUsed, capturedStrategy])]
                    : base.strategiesUsed,
                  explanationCount: base.explanationCount + 1,
                  frustration: computeFrustration(
                    conversationStateHoisted?.consecutiveFailures ?? 0,
                    conversationStateHoisted?.remediationCount ?? 0,
                  ),
                  mastery: computeMastery(
                    conversationStateHoisted?.correctAtCheck ?? 0,
                    conversationStateHoisted?.correctAtPractice ?? 0,
                  ),
                }),
              }
            })
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
              capabilityObservations: capabilityObservationsHoisted,
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
              // P1-1 — rides WP-3's existing v2 field on the existing call.
              // No second writer, no new event, no new capture path. Omitted
              // when nothing was declared, so the payload is byte-identical to
              // before on those turns.
              ...(attemptVectorHoisted !== null && { attemptVector: attemptVectorHoisted }),
              // WP-8 — rides WP-3's existing v2 field on the same existing
              // call. No second writer, no second capture path.
              ...(adaptationStateHoisted !== null && { adaptationState: adaptationStateHoisted }),
              provenance: [
                ...(recoveryKeyHoisted ? [`recovery:${recoveryKeyHoisted}`] : []),
                ...(evidenceAutonomyHoisted ? ['autonomy'] : []),
                ...(evidenceMoveHoisted ? ['turn-directive'] : []),
                ...(firstLessonActiveHoisted ? ['first-lesson'] : []),
                // K6 — record EOS verifier outcomes as provenance atoms
                ...eosVerifierTagsHoisted,
                ...kernelParityTagsHoisted,
                ...enginePolicyTagsHoisted,
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
                // STEP 2 — progression anomalies (missing signal, concept flap)
                ...progressionTagsHoisted,
                ...(signalRepairFiredHoisted ? ['progression:signal-repair'] : []),
              ],
              freshSessionBoundary: sessionEpisodeFreshHoisted,
              boundaryGapMs: null,
              lessonCompleted: cleanText.includes('[LESSON_COMPLETE]'),
            })
          } catch { /* spine is strictly parallel — never affects the turn */ }

          const narrativeUpdate = narrativeStateHoisted ? { narrativeState: narrativeStateHoisted } : {}

          // Visual Resolver V2 — persist the active visualization surface so the
          // next turn can HOLD it. Cleared explicitly when nothing graphical is
          // on screen, so a stale figure can never be resurrected.
          const visualSessionUpdate: Record<string, unknown> = visualDecisionHoisted
            ? {
                visualSession: visualDecisionHoisted.session,
                // The per-session generation budget's counter. Incremented only
                // on a turn that actually spent a provider call — a cached, an
                // approved and a declined figure all cost nothing and must not
                // consume a bound that exists to limit cost.
                ...(visualDecisionHoisted.generationSpent
                  ? { visualGenerationCount: visualGenerationCountHoisted + 1 }
                  : {}),
              }
            : {}

          // OFF-LESSON CONCEPT EXCURSION — persist the standing detour so the
          // next turn continues it (a doubt keeps teaching the side concept)
          // or finds it closed. Written unconditionally once decided, so a
          // closed excursion is actively cleared rather than left to expire.
          // Lesson state is NOT written here and never is: this key is the
          // whole of the excursion's footprint.
          const excursionUpdate: Record<string, unknown> = excursionDecisionHoisted
            ? { excursion: excursionDecisionHoisted.state }
            : {}

          // STEP 2 (instrumentation) — progression telemetry. Measurement
          // only: nothing here gates a turn or changes learner-visible
          // output. Rides the same contextSnapshot persist as every other
          // counter (no new store, no migration). Every input is a value the
          // route already computed.
          let progressionUpdate: Record<string, unknown> = {}
          try {
            const stateAfterForMetrics = (conversationStateUpdate.conversationState as
              import('@/lib/teaching/conversationState').ConversationState | undefined)
              ?? conversationStateAfterTurnHoisted ?? conversationStateHoisted
            const { isBareAcknowledgement: isBareAckForMetrics } = await import('@/lib/teaching/masteryGate')
            const { masteryVerified: masteryVerifiedForMetrics } = await import('@/lib/teaching/masteryGate')
            const facts = {
              // The server asked a question last turn iff its decided move
              // was 'ask'; absent that we fall back to the ladder's own
              // record that a question was outstanding.
              // NextMove is lowercase ('teach' | 'show' | 'ask'), so the
              // comparison against 'ASK' was unsatisfiable — the first
              // disjunct never contributed and the whole predicate rested on
              // the fallback alone. It feeds RC-D's dropped-observation
              // counter (needsSignalRepair), so the freeze-breaker was reading
              // a partly-blind input.
              answerWasExpected: evidenceMoveHoisted === 'ask'
                || (conversationStateHoisted?.questionsAskedSinceTeach ?? 0) > 0,
              learnerReplySubstantive: message.trim().length > 0
                && !isBareAckForMetrics(message)
                && recoveryKeyHoisted === null,
              signalPresent: teachingSignal !== null && teachingSignal !== undefined,
              phaseBefore: conversationStateHoisted?.phase ?? null,
              phaseAfter: stateAfterForMetrics?.phase ?? null,
              conceptBefore: conversationStateHoisted?.conceptId ?? null,
              conceptAfter: stateAfterForMetrics?.conceptId ?? null,
              evidenceBefore: {
                correctAtCheck: conversationStateHoisted?.correctAtCheck ?? 0,
                correctAtPractice: conversationStateHoisted?.correctAtPractice ?? 0,
              },
              recoveryFired: recoveryKeyHoisted !== null,
              duplicateDetected: eosVerifierTagsHoisted.some((t) => t.includes('V-DUP')),
              masteryVerifiedNow: masteryVerifiedForMetrics(stateAfterForMetrics ?? null),
            }
            progressionUpdate = {
              progressionMetrics: foldProgressionMetrics(
                readProgressionMetrics(snapshot?.progressionMetrics), facts,
              ),
            }
            progressionTagsHoisted = progressionTags(facts)
            snapshotRederivers.push((fresh) => ({
              progressionMetrics: foldProgressionMetrics(
                readProgressionMetrics(fresh.progressionMetrics), facts,
              ),
            }))
          } catch { /* telemetry never takes a turn down */ }

          // ADR 15: build the RRM snapshot delta (append new entry to log).
          const rrmUpdate: Record<string, unknown> = {}
          if (rrmEntryThisTurn) {
            const { buildRRMSnapshotDelta } = await import('@/lib/teaching/renderedRealityModel')
            rrmUpdate.renderedRealityLog = buildRRMSnapshotDelta(
              [...snapshotRRMLog, rrmEntryThisTurn],
            ).renderedRealityLog
          }

          if (conceptChanged || teachingSignal || Object.keys(placementUpdate).length > 0 || Object.keys(episodeUpdate).length > 0 || Object.keys(failureCountUpdate).length > 0 || Object.keys(conversationStateUpdate).length > 0 || Object.keys(narrativeUpdate).length > 0 || teachingStepUpdateHoisted || turnHistoryUpdateHoisted || Object.keys(progressionUpdate).length > 0 || Object.keys(visualSessionUpdate).length > 0 || Object.keys(excursionUpdate).length > 0 || rrmEntryThisTurn) {
            // Atomic JSONB merge (same pattern as the school snapshot above).
            const libSnapshotDelta = {
              ...(conceptChanged ? { currentConceptNodeId: newLibConceptId } : {}),
              ...signalUpdate,
              ...placementUpdate,
              ...episodeUpdate,
              ...failureCountUpdate,
              ...conversationStateUpdate,
              ...narrativeUpdate,
              ...(turnHistoryUpdateHoisted ?? {}),
              ...progressionUpdate,
              ...visualSessionUpdate,
              ...excursionUpdate,
              // Option B — Teaching Sequence Executor: persist the runtime-
              // selected step so the next turn (or a resumed session) reads
              // it back via readTeachingStepIndex() instead of restarting.
              ...(teachingStepUpdateHoisted ?? {}),
              // ADR 15: RRM visual-state log
              ...rrmUpdate,
            }
            // ISS-13: conditional on the version read at the start of this
            // turn. If a concurrent turn committed in between, the write
            // conflicts and is retried ONCE against the snapshot as it
            // actually is, with every accumulative field re-folded by the
            // rederivers its own fold site registered. Fail-soft throughout:
            // a second conflict loses this turn's accumulative state, exactly
            // as the unconditional write always did, and never the reply.
            const { writeSnapshotDelta, readSnapshotVersion } = await import('@/lib/db/snapshotWrite')
            const rederivers = snapshotRederivers
            // RC-B: AWAITED, deliberately. This was fire-and-forget
            // (`.then()`), and this route sets no `runtime`/`maxDuration` and
            // uses no `waitUntil`/`after()` — so on a serverless platform the
            // instance can be frozen the moment the response is returned,
            // with this write still in flight. A dropped write means the next
            // turn reads a stale snapshot: no phase, no counters, no concept
            // identity — a silent stall indistinguishable from the learner
            // never having answered. writeSnapshotDelta is already total
            // (never throws; every path resolves), so awaiting it cannot fail
            // the turn — it only costs one round-trip before the reply
            // returns, which is the correct trade against losing the turn's
            // entire learning state.
            const writeResult = await writeSnapshotDelta(prisma, {
              sessionId,
              expectedVersion: readSnapshotVersion(snapshot),
              delta: libSnapshotDelta,
              rederive: rederivers.length === 0
                ? undefined
                : (fresh) => Object.assign({}, ...rederivers.map((f) => f(fresh))),
            })
            if (!writeResult.applied) {
              console.warn('[learn/chat] snapshot write not applied', {
                sessionId, conflicted: writeResult.conflicted, error: writeResult.error,
              })
            }
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
        // P2: when present the client renders tappable options instead of
        // requiring the learner to type an answer.
        mcq: mcqHoisted ?? undefined,
        // P6.6: present only on the turn the lesson completes. The client
        // renders the completion screen and must not continue teaching.
        lessonComplete: lessonCompletionHoisted ?? undefined,
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
