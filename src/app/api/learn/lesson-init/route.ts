/**
 * POST /api/learn/lesson-init
 *
 * Decoupled lesson initialization: builds and delivers a structured lesson
 * opening to Tutor Max WITHOUT saving a fake USER message to the database.
 *
 * Previously, lesson navigation (restart / review / advance to next) was
 * coupled to the chat transport: confirmLessonSwitch() called sendMessage()
 * with showInUI=false, which still persisted a synthetic USER row in the DB,
 * flowed through the full chat pipeline (mastery gate, evidence engine, etc.),
 * and appeared as a ghost "user" message in restored history. This endpoint
 * owns lesson initialization so the chat pipeline handles only real student
 * messages.
 *
 * What this endpoint does:
 *   1. Authenticates and loads the session.
 *   2. Builds a concise system prompt from the lesson context (passed by the
 *      client, which already has it from the curriculum state).
 *   3. Builds the mode-appropriate instruction string server-side.
 *   4. Calls routeAI() with existing history + instruction as user turn —
 *      the instruction is NEVER saved to the DB.
 *   5. Saves ONLY the ASSISTANT response.
 *   6. Returns { success, text, provider, activeLessonPersisted }.
 *
 * Intentionally minimal — does NOT replicate the full route.ts system prompt
 * pipeline (mastery gate, evidence blocks, inline practice, visualization, etc.)
 * because a lesson opening should never trigger any of those.
 */

import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { routeAI } from '@/lib/ai/router'
import { AIBudgetExceededError } from '@/lib/ai/budget'
import { buildTutorSystemPrompt, type LessonContext } from '@/lib/ai/client'
import { MessageRole } from '@prisma/client'

const schema = z.object({
  sessionId: z.string().min(1),
  mode: z.enum(['restart', 'review', 'resume', 'next']),
  lessonTitle: z.string().min(1),
  lessonGoal: z.string().optional(),
  lessonOrder: z.number().int().positive().optional(),
  topicSlug: z.string().min(1).optional(),
  unitTitle: z.string().optional(),
  totalLessons: z.number().int().positive().optional(),
  completedLessons: z.array(z.number()).optional(),
  teachingLanguage: z.enum(['en', 'ru', 'hi']).default('en'),
})

const HISTORY_LIMIT = 20

/**
 * Bounded retry for the activeLessonSlug pointer write. See the call site for
 * the production failure this exists for. Three attempts total; the two sleeps
 * are paid only when a write actually fails.
 */
const ACTIVE_LESSON_WRITE_ATTEMPTS = 3
const ACTIVE_LESSON_WRITE_BACKOFF_MS = [100, 250] as const
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

export async function POST(req: Request) {
  try {
    const authSession = await auth()
    const userId = authSession?.user?.id
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json().catch(() => ({}))
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
    }
    const {
      sessionId, mode, lessonTitle, lessonGoal, lessonOrder, topicSlug,
      unitTitle, totalLessons, completedLessons, teachingLanguage,
    } = parsed.data

    // Load the session (verify ownership + get history)
    const learnSession = await prisma.learnSession.findUnique({
      where: { id: sessionId, userId },
      include: {
        subject: true,
        messages: { orderBy: { createdAt: 'desc' }, take: HISTORY_LIMIT },
      },
    })
    if (!learnSession) {
      return NextResponse.json({ success: false, error: 'Session not found' }, { status: 404 })
    }

    // Load profile (name, level, goals, country). Hoisted above the
    // Persisted Active Lesson write because that write needs `currentLevel`
    // to compute the placement entry order for a brand-new row (see below).
    const profile = await prisma.profile.findUnique({ where: { userId } }).catch(() => null)

    // ── Persisted Active Lesson: the ONE writer of activeLessonSlug ────────
    //
    // This endpoint is reached only by an EXPLICIT learner action — opening a
    // lesson, restarting it, revising it, or moving to the next one. That is
    // precisely the fact `activeLessonSlug` records, and it is the fact that
    // was previously lost: the browser passed the chosen lesson in this very
    // payload and the server used it for the prompt, then discarded it, so the
    // next chat turn re-derived the furthest lesson instead of this one.
    //
    // Deliberately NOT wrapped in Math.max or any monotonic guard — moving
    // BACKWARD is the whole point.
    //
    // AWAITED, inside try/catch. It was previously fire-and-forget so a slow
    // write could never delay the lesson, but on a serverless runtime an
    // un-awaited promise can be reclaimed when the invocation ends — a
    // silently dropped write here reproduces the exact divergence this field
    // exists to remove, with nothing surfaced. One indexed upsert costs
    // single-digit milliseconds against an LLM call that costs seconds, so
    // awaiting is the cheaper side of the trade. The catch preserves the
    // original guarantee: the learner still receives their lesson if the
    // write fails, and lesson-init never crashes because of it. That guarantee
    // is kept — but it is no longer allowed to be SILENT; see the retry and
    // the reported flag below.
    //
    // Whether the pointer this endpoint owns actually moved. Reported to the
    // client so a failed lesson switch is attributable rather than silent.
    // `true` when there was nothing to write (no topicSlug) — that is not a
    // failed switch, it is a caller that did not ask for one.
    let activeLessonPersisted = true
    if (topicSlug) {
      activeLessonPersisted = false
      const subjectCode = learnSession.subject.slug
      try {
        // A brand-new row must NOT be stamped with the opened lesson's order.
        // currentLesson means "furthest progress", and opening a lesson is not
        // progress — an advanced learner whose placement entry order is 32 who
        // opens lesson 5 would otherwise have their placement position lowered
        // to 5 permanently, because a real row suppresses the placement
        // default that /api/curriculum and the dashboard fall back to. The
        // opened lesson is carried by activeLessonSlug; currentLesson gets the
        // same placement entry order those two readers would have defaulted
        // to, via the existing helper. Existing rows are untouched.
        const { getKnowledgeGraph } = await import('@/lib/curriculum/knowledgeGraph')
        const { computeCurriculumEntryOrder } = await import('@/lib/curriculum/placement')
        const { normalizeToCanonicalLevel } = await import('@/lib/curriculum/levels')
        const graph = getKnowledgeGraph(subjectCode)
        const entryOrder = graph
          ? computeCurriculumEntryOrder(graph, normalizeToCanonicalLevel(profile?.currentLevel))
          : undefined

        // RETRIED. Awaiting alone was not enough — measured in production
        // 2026-08-14 on a real learner account, mid-audit:
        //
        //   Can't reach database server at ...pooler.supabase.com:6543
        //   Invalid `prisma.studentProgress.upsert()` invocation: Socket timeout
        //   [visual-v2] concept: 'phys.mech.momentum'   <- the OPENED lesson
        //                                                  never became active
        //
        // The catch below preserved the lesson (correctly — a learner must
        // never lose their lesson to a pointer write), and that is exactly why
        // the failure was invisible. The learner's experience was:
        //
        //   1. open lesson B  -> lesson B's opening text arrives, looking fine
        //   2. the pointer write fails and is swallowed
        //   3. the NEXT chat turn resolves the OLD lesson and teaches A again
        //
        // Nothing in the UI could distinguish that from working. The pooler
        // recovered within seconds both times it was seen, so a bounded retry
        // is the whole fix: the upsert is idempotent (it sets a pointer to a
        // constant), so re-running it is always safe.
        //
        // Cost is bounded and paid ONLY on failure — at most two extra
        // attempts and ~350ms of sleep, against an LLM call that costs
        // seconds. A healthy write still takes exactly one attempt and adds
        // nothing. There is deliberately no second store for this fact: the
        // chat route resolves the lesson from `activeLessonSlug` and must keep
        // exactly one source of truth.
        const writePointer = () => prisma.studentProgress.upsert({
          where: { userId_subjectCode: { userId, subjectCode } },
          create: {
            userId,
            subjectCode,
            activeLessonSlug: topicSlug,
            ...(entryOrder ? { currentLesson: entryOrder } : {}),
            lastStudiedAt: new Date(),
          },
          // Only the pointer moves. currentLesson is a different fact with a
          // different owner (/api/curriculum/progress) and is deliberately not
          // touched here — opening lesson 7 for revision must never rewind
          // furthest-progress.
          update: { activeLessonSlug: topicSlug, lastStudiedAt: new Date() },
        })

        for (let attempt = 1; attempt <= ACTIVE_LESSON_WRITE_ATTEMPTS; attempt++) {
          try {
            await writePointer()
            activeLessonPersisted = true
            if (attempt > 1) {
              console.log(`[lesson-init] activeLessonSlug persisted on attempt ${attempt}`)
            }
            break
          } catch (err) {
            if (attempt === ACTIVE_LESSON_WRITE_ATTEMPTS) throw err
            console.warn(
              `[lesson-init] activeLessonSlug persist attempt ${attempt} failed, retrying:`,
              (err as { message?: string })?.message ?? err,
            )
            await sleep(ACTIVE_LESSON_WRITE_BACKOFF_MS[attempt - 1])
          }
        }
      } catch (err) {
        // Still non-fatal — the learner receives their lesson either way. But
        // it is no longer silent: the response says the pointer did not move,
        // so a divergence between what was opened and what is taught next is
        // attributable instead of mysterious.
        console.error('[lesson-init] activeLessonSlug persist FAILED after retries:', err)
      }
    }

    // ── RE-ENTERING A LESSON MUST RE-OPEN IT ──────────────────────────────
    //
    // MEASURED IN PRODUCTION (2026-08-12, real learner account, brand-new
    // session, mode: 'restart' on phys.meas.vector-addition). Three different
    // learner turns — a wrong answer, "i dont know i dont get it", and a
    // correct intuition — each returned the SAME 146-character canned line,
    // with no model call at all:
    //
    //   CUE decision = SERVE_LESSON_COMPLETE
    //   ruleId       = D0a-LESSON-ALREADY-COMPLETE
    //   RESPONSE provider=deterministic lessonKey=lesson:6 groq_invoked=false
    //
    // WHY. `lessonCompletedHoisted` in the chat route reads
    // `latestLessonAttempt(userId, subjectSlug, lessonKey)` — keyed on the
    // LESSON, not the session — and D-0a then refuses to teach a finished
    // lesson before every other rule. Opening the lesson again created no new
    // attempt: `mode` only ever selected the opening PROMPT text. So the
    // newest attempt stayed the COMPLETED one forever, and the concept became
    // permanently unteachable for that learner across every future session.
    //
    // A learner who finishes a lesson and comes back to revise it — the most
    // ordinary thing a student does — got a dead tutor.
    //
    // D-0a's own comment states the invariant it assumes: "Starting a NEW
    // lesson clears this: lessonCompleted is read per turn from the CURRENT
    // lesson's attempt." That holds for a DIFFERENT lesson and silently fails
    // for the SAME one. This restores it at the only place that knows a
    // re-entry happened.
    //
    // Scope is deliberately narrow: 'restart' and 'review' are the two modes
    // that mean "teach this to me again". 'resume' must NOT re-open — resuming
    // a finished lesson should still deliver the close — and 'next' moves to a
    // different lessonKey, which was never affected.
    //
    // openLessonAttempt is idempotent: it returns the existing IN_PROGRESS
    // attempt when there is one, so repeated inits do not spawn duplicates.
    // Advisory, like the write above — a failure here must never cost the
    // learner their lesson.
    if ((mode === 'restart' || mode === 'review') && lessonOrder) {
      try {
        const { lessonKeyFor } = await import('@/lib/teaching/lessonAttempt')
        const key = lessonKeyFor({ lessonOrder })
        if (key) {
          const { latestLessonAttempt, openLessonAttempt } = await import('@/lib/teaching/lessonAttemptStore')
          const latest = await latestLessonAttempt(prisma, {
            userId, subjectSlug: learnSession.subject.slug, lessonKey: key,
          })
          // Only act when the newest attempt is actually closed. An
          // IN_PROGRESS attempt is already correct and must be left alone, so
          // a restart never discards work in flight.
          if (latest && latest.status === 'COMPLETED') {
            await openLessonAttempt(prisma, {
              userId, subjectSlug: learnSession.subject.slug,
              lessonKey: key, lessonTitle: lessonTitle ?? null,
            })
            console.info(`[lesson-init] re-opened completed lesson ${key} for mode=${mode}`)
          }
        }
      } catch (err) {
        console.warn('[lesson-init] lesson attempt re-open failed:', err)
      }
    }

    // Derive country for LLM routing — same logic as route.ts
    const profileCountry = profile?.country ?? 'global'
    const country = teachingLanguage === 'ru' ? 'ru' : profileCountry

    // Build lesson context from client-supplied data (already loaded by the
    // client from curriculum state, no extra DB query needed)
    const lessonCtx: LessonContext | null = (lessonOrder && totalLessons && lessonTitle)
      ? {
          currentLesson: lessonOrder,
          totalLessons,
          lessonTitle,
          lessonGoal: lessonGoal ?? '',
          unitTitle: unitTitle ?? '',
          completedLessons: completedLessons ?? [],
        }
      : null

    const snapshot = learnSession.contextSnapshot as Record<string, unknown> | null
    const memoryContext = typeof snapshot?.memoryContext === 'string' ? snapshot.memoryContext : null

    // Build system prompt — reuse the same function as route.ts so Tutor Max
    // gets consistent context (current lesson, completion rules, etc.)
    const systemPrompt = buildTutorSystemPrompt(
      learnSession.subject.name,
      profile?.displayName ?? authSession?.user?.name ?? 'Student',
      profile?.selfDescription ?? 'level unknown',
      profile?.learningGoals ?? profile?.selfDescription ?? 'general learning',
      memoryContext,
      teachingLanguage,
      lessonCtx,
    )

    // Build the instruction string (the user-role trigger sent to the LLM).
    // This is NEVER written to the DB — it is ephemeral context only.
    const instruction = buildInstruction(mode, lessonTitle, teachingLanguage)

    // Assemble history chronologically (newest-first from DB → reverse)
    const historyMessages = [...learnSession.messages]
      .reverse()
      .map((m) => ({
        role: (m.role === MessageRole.USER ? 'user' : 'assistant') as 'user' | 'assistant',
        content: m.content,
      }))

    // Call LLM with instruction as the user turn — NOT persisted
    //
    // SEV-1 part 2 (2026-08-02): this route had NO degraded path. A provider
    // failure threw straight to the catch below and returned HTTP 500, and a
    // chain that outlived the function budget returned nothing at all — the
    // learner pressed "Start Lesson" and got silence. Production evidence:
    // "Vercel Runtime Timeout Error: Task timed out after 60 seconds"
    // (42 occurrences, 6 users, routes include /api/learn/lesson-init,
    // last 2026-08-02T15:33:56Z) and the 30-second variant on this route's own
    // former budget.
    //
    // The chain's worst case is 20_000 (gemini) + 8_000 (openrouter) +
    // 8_000 (groq) = 36_000 ms, which does not fit the 30_000 ms maxDuration
    // this route used to carry — so on this route the provider chain could
    // never even finish failing before the lambda was killed. vercel.json now
    // gives it the same 60_000 ms its sibling /api/learn/chat already uses for
    // the identical chain.
    //
    // Reuses the SAME degraded template the chat route serves (RS P-3 /
    // K6 degradedTurn) — no new copy, no new fallback system. The lesson
    // opening is teaching-shaped rather than an error, and it is persisted
    // like any other assistant turn so the transcript stays coherent.
    let routed: { text: string; provider: string; finishReason: string | null }
    try {
      routed = await routeAI(
        [...historyMessages, { role: 'user', content: instruction }],
        systemPrompt,
        country,
        1200,
        teachingLanguage,
        { userId, subject: learnSession.subject.slug },
      )
    } catch (aiError) {
      if (aiError instanceof AIBudgetExceededError) throw aiError
      console.error('[lesson-init] all providers down — serving degraded template (RS P-3):',
        aiError instanceof Error ? aiError.message : String(aiError))
      const { degradedTurn } = await import('@/lib/eos-runtime')
      const degraded = degradedTurn({ register: 'beginner', learnerText: instruction })
      routed = { text: degraded.text, provider: degraded.provider, finishReason: degraded.finishReason }
    }

    // LESSON ISOLATION — this IS the "explicit navigation" moment
    // /api/sessions/history's own resolution treats as authoritative
    // (activeLessonSlug, prioritized over the coarser currentLesson
    // counter). Uses the validated request body directly rather than
    // re-querying StudentProgress: `topicSlug`/`lessonOrder` here are
    // exactly what the write above just upserted into
    // activeLessonSlug/currentLesson, so re-reading them back would only
    // add a query for a value already in hand. Same lessonKeyFor() shape
    // as every other write site — no second lesson-identity scheme.
    const { lessonKeyFor } = await import('@/lib/teaching/lessonAttempt')
    const openingLessonKey = lessonKeyFor({ topicSlug, lessonOrder })

    // Persist ONLY the assistant response
    await prisma.message.create({
      data: {
        sessionId, role: MessageRole.ASSISTANT, content: routed.text,
        ...(openingLessonKey ? { lessonKey: openingLessonKey } : {}),
      },
    })

    return NextResponse.json({ success: true, text: routed.text, provider: routed.provider, activeLessonPersisted })
  } catch (err: any) {
    console.error('[lesson-init]', err)
    return NextResponse.json({ success: false, error: err.message ?? 'Internal error' }, { status: 500 })
  }
}

/**
 * Builds the ephemeral instruction string that triggers Tutor Max's lesson
 * opening. Mirrors the text previously embedded in sendMessage(false) calls,
 * now centralised server-side.
 */
function buildInstruction(
  mode: 'restart' | 'review' | 'resume' | 'next',
  lessonTitle: string,
  lang: 'en' | 'ru' | 'hi',
): string {
  if (lang === 'ru') {
    if (mode === 'restart') return `Давай начнём урок «${lessonTitle}» заново. Пожалуйста, начни сначала с полным вступлением по структуре урока.`
    if (mode === 'review')  return `🔁 РЕЖИМ ПОВТОРЕНИЯ: Давай повторим тему "${lessonTitle}". Объясни ключевые концепции и дай практические задания.`
    return `Продолжим с урока: ${lessonTitle}`
  }
  if (lang === 'hi') {
    if (mode === 'restart') return `"${lessonTitle}" dobara shuru karte hain. Bilkul shuruaat se poora lesson opening karo.`
    if (mode === 'review')  return `🔁 REVISION MODE: "${lessonTitle}" dobara padho. Key concepts explain karo aur practice exercises do.`
    return `Lesson shuru karte hain: ${lessonTitle}`
  }
  // English (default)
  if (mode === 'restart') return `Let's restart lesson "${lessonTitle}" from the beginning. Please begin the full lesson opening.`
  if (mode === 'review')  return `🔁 REVISION MODE: Let's review "${lessonTitle}". Please explain the key concepts and give me practice exercises.`
  return `Let's start lesson "${lessonTitle}".`
}
