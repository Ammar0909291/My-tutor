import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { awardXP } from '@/lib/xp'
import { generateJSON } from '@/lib/ai/client'
import { computeLessonCompletionPercent, isLessonSetCompleted } from '@/lib/lessonProgress'

const schema = z.object({
  subjectCode: z.string(),
  completedLesson: z.number().int().positive(),
  // MED-7: totalLessons still accepted but ignored — computed server-side from catalog.
  totalLessons: z.number().int().positive().optional(),
  lessonTitle: z.string().optional(),
  lessonGoal: z.string().optional(),
  // P0-4 fix: "Skip Anyway" and a genuine mastery-verified completion used
  // to hit this endpoint identically — no knowledge gap was recorded, and
  // (more importantly) the chat session kept teaching the skipped concept
  // forever, because contextSnapshot.currentConceptNodeId always outranks
  // StudentProgress.currentLesson when a Library turn resolves its active
  // concept (route.ts:1149). mastered=false marks the gap explicitly and
  // clears that stale pointer so the next chat turn re-resolves fresh.
  mastered: z.boolean().optional().default(true),
  topicSlug: z.string().optional(),
})

const resetSchema = z.object({
  subjectCode: z.string(),
  lessonOrder: z.number().int().positive(),
  topicSlug: z.string().optional(),
})

export async function DELETE(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { subjectCode, lessonOrder, topicSlug } = resetSchema.parse(body)

    // Remove this lesson from completedLessons atomically
    await prisma.$executeRaw`
      UPDATE student_progress
      SET "completedLessons" = array_remove("completedLessons", ${lessonOrder}::int4),
          "isCompleted" = false,
          "completedAt" = NULL,
          "updatedAt" = NOW()
      WHERE "userId" = ${session.user.id}
        AND "subjectCode" = ${subjectCode}
    `

    // Reset TopicProgress so the lesson is treated as not started
    if (topicSlug) {
      const subjectSlug = subjectCode.split(':')[1] ?? subjectCode
      await prisma.topicProgress.updateMany({
        where: { userId: session.user.id, subjectSlug, topicSlug },
        data: { status: 'NOT_STARTED', masteryPct: 0 },
      })
    }

    const progress = await prisma.studentProgress.findUnique({
      where: { userId_subjectCode: { userId: session.user.id, subjectCode } },
    })

    return NextResponse.json({
      success: true,
      progress: progress ?? { currentLesson: 1, completedLessons: [] },
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[DELETE /api/curriculum/progress]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const subjectCode = searchParams.get('subject')
  if (!subjectCode) return NextResponse.json({ success: false, error: 'subject param required' }, { status: 400 })

  try {
    const progress = await prisma.studentProgress.findUnique({
      where: { userId_subjectCode: { userId: session.user.id, subjectCode } },
    })
    return NextResponse.json({ success: true, progress: progress ?? { currentLesson: 1, completedLessons: [] } })
  } catch (err) {
    console.error('[GET /api/curriculum/progress]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const { subjectCode, completedLesson, totalLessons: clientTotalLessons, lessonTitle, lessonGoal, mastered, topicSlug } = schema.parse(body)

    const totalLessons = clientTotalLessons ?? undefined

    const existing = await prisma.studentProgress.findUnique({
      where: { userId_subjectCode: { userId: session.user.id, subjectCode } },
    })

    // Determine first-completion atomically to prevent XP farming.
    //
    // For existing rows: issue a raw UPDATE that appends the lesson to the
    // completedLessons array ONLY IF it is not already present. PostgreSQL
    // executes this as a single atomic operation, so two concurrent requests
    // for the same lesson will produce exactly one row affected = exactly one
    // isNewCompletion=true, preventing double XP award.
    //
    // For new rows (existing=null): isNewCompletion is always true; the upsert
    // create branch handles the row insertion.
    let isNewCompletion: boolean
    if (!existing) {
      isNewCompletion = true
    } else {
      const changed = await prisma.$executeRaw`
        UPDATE student_progress
        SET "completedLessons" = array_append("completedLessons", ${completedLesson}::int4)
        WHERE "userId" = ${session.user.id}
          AND "subjectCode" = ${subjectCode}
          AND NOT (${completedLesson}::int4 = ANY("completedLessons"))
      `
      isNewCompletion = changed > 0
    }

    // Build the completed-lessons set for computing derived fields.
    // When isNewCompletion=false the lesson is already in existing.completedLessons.
    const completedLessons = existing
      ? (isNewCompletion ? [...new Set([...existing.completedLessons, completedLesson])] : existing.completedLessons)
      : [completedLesson]

    const completionPercent = totalLessons
      ? computeLessonCompletionPercent(completedLessons.length, totalLessons)
      : (existing?.completionPercent ?? 0)
    const isCompleted = totalLessons
      ? isLessonSetCompleted(completedLessons.length, totalLessons)
      : (existing?.isCompleted ?? false)
    const completedAt = isCompleted ? (existing?.completedAt ?? new Date()) : null

    const progress = await prisma.studentProgress.upsert({
      where: { userId_subjectCode: { userId: session.user.id, subjectCode } },
      create: {
        userId: session.user.id,
        subjectCode,
        currentLesson: completedLesson + 1,
        completedLessons,
        lastStudiedAt: new Date(),
        completionPercent,
        isCompleted,
        completedAt,
      },
      update: {
        currentLesson: Math.max((existing?.currentLesson ?? 1), completedLesson + 1),
        // completedLessons for existing rows is managed by the atomic raw UPDATE above
        lastStudiedAt: new Date(),
        updatedAt: new Date(),
        completionPercent,
        isCompleted,
        completedAt,
      },
    })

    // XP and flashcards are awarded only on genuine first completion.
    // The atomic raw UPDATE above ensures concurrent calls cannot both
    // receive isNewCompletion=true for the same lesson.
    let flashcardsCreated = 0
    if (isNewCompletion) {
      await awardXP(session.user.id, 10)

      if (lessonTitle) {
        try {
          const cards = await generateJSON(
            `Create 2 flashcard Q&A pairs to help a student remember the key concepts from this lesson.\n` +
            `Subject: ${subjectCode}\nLesson: ${lessonTitle}\n${lessonGoal ? `Goal: ${lessonGoal}\n` : ''}` +
            `Return ONLY a JSON array: [{"question":"...","answer":"..."}]. Keep answers under 2 sentences.`,
            500,
          )
          if (Array.isArray(cards) && cards.length > 0) {
            const result = await prisma.flashcard.createMany({
              data: cards
                .filter((c: { question?: string; answer?: string }) => c.question && c.answer)
                .map((c: { question: string; answer: string }) => ({
                  userId: session.user.id,
                  topic: lessonTitle,
                  question: c.question,
                  answer: c.answer,
                  nextReview: new Date(),
                })),
            })
            flashcardsCreated = result.count
          }
        } catch (err) {
          console.error('[curriculum/progress] flashcard generation failed', err)
        }
      }
    }

    // P0-4 fix: "Skip Anyway" — record the gap for real, and unstick the
    // chat session it left behind. Previously this endpoint treated a skip
    // exactly like a genuine mastery-verified completion: same PATCH, same
    // fields, no distinction anywhere. Two consequences: (1) no knowledge
    // gap was ever recorded, so nothing downstream (revision, review
    // reminders) knew this lesson wasn't actually learned; (2) the chat
    // session's own concept pointer (contextSnapshot.currentConceptNodeId)
    // was left pointing at the skipped concept — and that pointer always
    // wins when a Library turn resolves its active concept (route.ts's
    // `snapshotCurrentConceptId ?? resolveLibraryEntryConceptId(...)`), so
    // the next chat message kept teaching the same unmastered concept and
    // the mastery gate kept blocking it — "skip" never actually skipped.
    if (!mastered && isNewCompletion) {
      if (topicSlug) {
        // Reuses the existing topic-progress lifecycle (TopicStatus.SKIPPED
        // already exists for exactly this — see /api/topic-progress's
        // 'skip' action) rather than inventing a second gap representation.
        await prisma.topicProgress.upsert({
          where: { userId_subjectSlug_topicSlug: { userId: session.user.id, subjectSlug: subjectCode, topicSlug } },
          create: { userId: session.user.id, subjectSlug: subjectCode, topicSlug, status: 'SKIPPED' },
          update: { status: 'SKIPPED' },
        }).catch((err) => console.error('[curriculum/progress] skip topic-progress write failed', err))
      }

      {
        // Clear the stale concept pointer on the learner's most recent
        // active session for this subject so the next turn re-resolves the
        // entry concept for the NEW currentLesson instead of re-teaching
        // the one just skipped.
        try {
          const subjectRow = await prisma.subject.findUnique({ where: { slug: subjectCode } })
          if (subjectRow) {
            const activeSession = await prisma.learnSession.findFirst({
              where: { userId: session.user.id, subjectId: subjectRow.id },
              orderBy: { updatedAt: 'desc' },
            })
            if (activeSession) {
              const snap = (activeSession.contextSnapshot ?? {}) as Record<string, unknown>
              await prisma.learnSession.update({
                where: { id: activeSession.id },
                data: {
                  contextSnapshot: {
                    ...snap,
                    currentConceptNodeId: null,
                    nextConceptNodeId: null,
                    conversationState: null,
                  },
                },
              })
            }
          }
        } catch (err) {
          console.error('[curriculum/progress] skip session-pointer reset failed', err)
        }
      }
    }

    return NextResponse.json({ success: true, progress, flashcardsCreated })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[PATCH /api/curriculum/progress]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
