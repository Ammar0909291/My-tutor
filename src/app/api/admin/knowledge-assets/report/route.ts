import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { isAdmin } from '@/lib/auth/admin'
import { getSubjectRepositoryReport } from '@/lib/teaching/assets/repositoryStats'

// Admin-only completeness report for the three live curriculums. Read-only —
// touches no serving path, generates no content. See task 7 of the
// Educational Brain Knowledge Base Bootstrap.

export const dynamic = 'force-dynamic'

const LIVE_SUBJECTS = ['physics', 'mathematics', 'english']

export async function GET() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  if (!(await isAdmin(session.user.id))) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const reports = await Promise.all(LIVE_SUBJECTS.map((s) => getSubjectRepositoryReport(s)))
  return NextResponse.json({ success: true, subjects: reports })
}
