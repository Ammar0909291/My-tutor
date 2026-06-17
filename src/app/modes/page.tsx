import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { INDIA } from '@/lib/education'
import ModesPicker from './ModesPicker'

export default async function ModesPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    select: { userType: true, educationBoard: true, grade: true },
  })
  if (!profile) redirect('/onboarding')

  const hasSchoolAccess = !!profile.educationBoard && !!profile.grade
  const boards = INDIA.boards.map((b) => ({ id: b.id, shortName: b.shortName, grades: b.grades }))

  return (
    <ModesPicker
      hasSchoolAccess={hasSchoolAccess}
      boards={boards}
    />
  )
}
