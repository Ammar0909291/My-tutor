import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { getSchoolChapters, isSchoolSubject, SCHOOL_SUBJECT_META } from '@/lib/school/schoolRouting'
import { getRevisionNotes } from '@/lib/school/revision/revisionNotes'

const schema = z.object({
  subjectSlug: z.string().max(64),
  chapterId: z.string().max(128),
  noteType: z.enum(['quick', 'exam', 'formula']),
})

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 })

  const { subjectSlug, chapterId, noteType } = parsed.data

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    select: { userType: true, educationBoard: true, grade: true },
  })
  if (profile?.userType !== 'SCHOOL_STUDENT' || !profile.educationBoard || !profile.grade) {
    return NextResponse.json({ error: 'Not a school student' }, { status: 403 })
  }

  const { educationBoard: board, grade } = profile
  if (!isSchoolSubject(board, subjectSlug)) {
    return NextResponse.json({ error: 'Invalid subject' }, { status: 400 })
  }

  const chapter = getSchoolChapters(board, subjectSlug, grade).find((c) => c.id === chapterId)
  if (!chapter) return NextResponse.json({ error: 'Chapter not found' }, { status: 404 })

  const subjectName = SCHOOL_SUBJECT_META[subjectSlug]?.label ?? subjectSlug
  const notes = await getRevisionNotes(noteType, board, subjectSlug, subjectName, grade, chapter)

  return NextResponse.json({ notes })
}
