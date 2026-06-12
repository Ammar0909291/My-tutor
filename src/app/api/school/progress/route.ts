import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { getSchoolChapters, getChapterPosition, isSchoolSubject, schoolSubjectCode, chapterDisplayTitle } from '@/lib/school/schoolRouting'

const schema = z.object({
  subject: z.string(),
  chapterId: z.string().max(64),
  action: z.enum(['complete', 'uncomplete']),
})

/**
 * Sprint BJ: explicit chapter completion for School Mode. Writes ONLY to the
 * namespaced StudentProgress row ("<board>:<slug>:<grade>") — global-mode
 * progress and TopicProgress are never touched here.
 */
export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  const userId = session.user.id

  try {
    const { subject, chapterId, action } = schema.parse(await req.json())

    const profile = await withRetry(() => prisma.profile.findUnique({
      where: { userId },
      select: { userType: true, educationBoard: true, grade: true },
    }))
    if (profile?.userType !== 'SCHOOL_STUDENT' || !profile.educationBoard || !profile.grade) {
      return NextResponse.json({ success: false, error: 'Not a school student' }, { status: 403 })
    }
    if (!isSchoolSubject(profile.educationBoard, subject)) {
      return NextResponse.json({ success: false, error: 'Unknown school subject' }, { status: 400 })
    }

    const chapters = getSchoolChapters(profile.educationBoard, subject, profile.grade)
    const chapter = chapters.find((c) => c.id === chapterId)
    if (!chapter) {
      return NextResponse.json({ success: false, error: 'Unknown chapter' }, { status: 400 })
    }

    const code = schoolSubjectCode(profile.educationBoard, subject, profile.grade)
    const existing = await withRetry(() => prisma.studentProgress.findUnique({
      where: { userId_subjectCode: { userId, subjectCode: code } },
      select: { completedLessons: true },
    }))

    const orders = new Set(existing?.completedLessons ?? [])
    if (action === 'complete') orders.add(chapter.order)
    else orders.delete(chapter.order)
    const completedLessons = [...orders].sort((a, b) => a - b)

    const pos = getChapterPosition(chapters, completedLessons)!
    const data = {
      completedLessons,
      currentLesson: pos.current.order,
      completionPercent: pos.percent,
      isCompleted: pos.completedCount === pos.totalCount,
      completedAt: pos.completedCount === pos.totalCount ? new Date() : null,
      lastLessonTitle: chapterDisplayTitle(pos.current.title),
      lastStudiedAt: new Date(),
    }
    await withRetry(() => prisma.studentProgress.upsert({
      where: { userId_subjectCode: { userId, subjectCode: code } },
      update: data,
      create: { userId, subjectCode: code, ...data, completedAt: data.completedAt ?? undefined },
    }))

    return NextResponse.json({
      success: true,
      data: {
        completedCount: pos.completedCount,
        totalCount: pos.totalCount,
        percent: pos.percent,
        nextChapterId: pos.current.id,
        nextChapterTitle: chapterDisplayTitle(pos.current.title),
      },
    })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: err.errors[0].message }, { status: 400 })
    }
    console.error('[school/progress]', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
