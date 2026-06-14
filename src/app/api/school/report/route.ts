import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { generateProgressReport } from '@/lib/school/reports/progressReport'

const schema = z.object({
  window: z.enum(['7d', '30d']),
})

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 })

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    select: { userType: true, educationBoard: true, grade: true },
  })
  if (profile?.userType !== 'SCHOOL_STUDENT' || !profile.educationBoard || !profile.grade) {
    return NextResponse.json({ error: 'Not a school student' }, { status: 403 })
  }

  const report = await generateProgressReport(
    session.user.id,
    profile.educationBoard,
    profile.grade,
    parsed.data.window,
  )

  return NextResponse.json({ report })
}
