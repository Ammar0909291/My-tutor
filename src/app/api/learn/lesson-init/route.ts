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
 *   6. Returns { success, text, provider }.
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
import { buildTutorSystemPrompt, type LessonContext } from '@/lib/ai/client'
import { MessageRole } from '@prisma/client'

const schema = z.object({
  sessionId: z.string().min(1),
  mode: z.enum(['restart', 'review', 'resume', 'next']),
  lessonTitle: z.string().min(1),
  lessonGoal: z.string().optional(),
  lessonOrder: z.number().int().positive().optional(),
  unitTitle: z.string().optional(),
  totalLessons: z.number().int().positive().optional(),
  completedLessons: z.array(z.number()).optional(),
  teachingLanguage: z.enum(['en', 'ru', 'hi']).default('en'),
})

const HISTORY_LIMIT = 20

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
      sessionId, mode, lessonTitle, lessonGoal, lessonOrder,
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

    // Load profile (name, level, goals, country)
    const profile = await prisma.profile.findUnique({ where: { userId } }).catch(() => null)

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
    const routed = await routeAI(
      [...historyMessages, { role: 'user', content: instruction }],
      systemPrompt,
      country,
      1200,
      teachingLanguage,
      { userId, subject: learnSession.subject.slug },
    )

    // Persist ONLY the assistant response
    await prisma.message.create({
      data: { sessionId, role: MessageRole.ASSISTANT, content: routed.text },
    })

    return NextResponse.json({ success: true, text: routed.text, provider: routed.provider })
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
