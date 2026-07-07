import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { getBoard } from '@/lib/education'

// Lets a GENERAL_LEARNER opt into browsing School Mode by setting
// educationBoard/grade WITHOUT changing userType. School progress is stored
// under a namespaced subjectCode (`<board>:<subjectSlug>:<grade>`), so this
// never merges with Library/general progress for the same subject.
const schema = z.object({
  board: z.string(),
  grade: z.number().int().min(5).max(12),
})

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const userId = session.user.id
  const parsed = schema.safeParse(await req.json())
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: parsed.error.errors[0].message }, { status: 400 })
  }

  const { board, grade } = parsed.data
  const boardDef = getBoard(board)
  if (!boardDef) {
    return NextResponse.json({ success: false, error: `Unknown board: ${board}` }, { status: 400 })
  }
  if (!boardDef.grades.includes(grade)) {
    return NextResponse.json({ success: false, error: `Grade ${grade} is not offered by ${boardDef.shortName}` }, { status: 400 })
  }

  const profile = await prisma.profile.findUnique({ where: { userId } })
  if (!profile) {
    return NextResponse.json({ success: false, error: 'Profile not found' }, { status: 404 })
  }

  // Multi-grade/multi-board access: always set the requested board/grade,
  // even if one was already set (SCHOOL_STUDENT or otherwise). Progress is
  // namespaced by "<board>:<subjectSlug>:<grade>" (see StudentProgress /
  // schoolRouting.ts), so switching here never merges or overwrites another
  // combination's data.
  await prisma.profile.update({
    where: { userId },
    data: { educationBoard: boardDef.id, grade },
  })

  return NextResponse.json({ success: true })
}
