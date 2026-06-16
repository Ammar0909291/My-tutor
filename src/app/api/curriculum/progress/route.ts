import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { awardXP } from '@/lib/xp'
import { generateJSON } from '@/lib/ai/client'
import { getSchoolChapters } from '@/lib/school/schoolRouting'

const schema = z.object({
  subjectCode: z.string(),
  completedLesson: z.number().int().positive(),
  // MED-7: totalLessons still accepted but ignored — computed server-side from catalog.
  totalLessons: z.number().int().positive().optional(),
  lessonTitle: z.string().optional(),
  lessonGoal: z.string().optional(),
})

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
    const { subjectCode, completedLesson, lessonTitle, lessonGoal } = schema.parse(body)

    // MED-7: derive totalLessons from the server-authoritative catalog.
    // subjectCode format: "boardId:subjectSlug:grade"
    const [boardId, subjectSlug, gradeStr] = subjectCode.split(':')
    const grade = parseInt(gradeStr ?? '', 10)
    const catalogChapters = (boardId && subjectSlug && !isNaN(grade))
      ? getSchoolChapters(boardId, subjectSlug, grade)
      : []
    const totalLessons = catalogChapters.length > 0 ? catalogChapters.length : undefined

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
      ? Math.min(100, Math.round((completedLessons.length / totalLessons) * 100))
      : (existing?.completionPercent ?? 0)
    const isCompleted = totalLessons ? completedLessons.length >= totalLessons : (existing?.isCompleted ?? false)
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

    return NextResponse.json({ success: true, progress, flashcardsCreated })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[PATCH /api/curriculum/progress]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
