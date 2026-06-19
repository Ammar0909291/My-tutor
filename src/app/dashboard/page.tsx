import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { DashboardV2 } from '@/components/dashboard/v2/DashboardV2'
import { getDashboardV2Data } from '@/lib/dashboard/getDashboardV2Data'

export default async function DashboardPage({ searchParams }: { searchParams?: { mode?: string } }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')
  const userId = session.user.id

  const profile = await prisma.profile.findUnique({
    where: { userId },
    select: { userType: true, educationBoard: true, grade: true },
  })
  if (!profile) redirect('/onboarding')

  // Cross-system navigation (Stabilization Sprint): a SCHOOL_STUDENT can opt
  // into viewing the Library/General experience via ?mode=library without
  // changing their stored profile, curriculum, or progress data. Default
  // landing behavior (no query param) is unchanged. Dual Learning Modes: a
  // GENERAL_LEARNER who has opted into School Mode (board/grade set without
  // changing userType) keeps Library as their default landing experience
  // and enters School Mode explicitly with ?mode=school.
  const wantsLibrary = searchParams?.mode === 'library'
  const wantsSchool = searchParams?.mode === 'school'
  const hasSchoolAccess = !!profile.educationBoard && !!profile.grade
  const isSchoolStudent = profile.userType === 'SCHOOL_STUDENT'
  const modeOverride = wantsLibrary ? 'library' : wantsSchool ? 'school' : undefined

  // Both Library Mode and School Mode render through the same DashboardV2
  // shell — getDashboardV2Data branches internally on userType/modeOverride
  // and attaches school-only content (navigator action, daily plan,
  // academic journey, exam readiness) via the optional `school` field. The
  // dashboard shell, navigation, and visual identity never change between
  // modes — only the content cards inside it do.
  const data = await getDashboardV2Data(userId, modeOverride)
  const isSchoolAccountInLibraryMode = wantsLibrary && isSchoolStudent && hasSchoolAccess
  const isGeneralLearnerWithSchoolAccess = !isSchoolStudent && hasSchoolAccess

  return (
    <>
      {isSchoolAccountInLibraryMode && (
        <div style={{ textAlign: 'center', padding: '8px 0', fontSize: 12 }}>
          <a href="/dashboard" style={{ color: 'var(--candy-purple, #8B5CF6)', fontWeight: 700, textDecoration: 'none' }}>
            ← Back to School Mode
          </a>
        </div>
      )}
      {isGeneralLearnerWithSchoolAccess && (
        <div style={{ textAlign: 'center', padding: '8px 0', fontSize: 12 }}>
          <a href="/dashboard?mode=school" style={{ color: 'var(--candy-purple, #8B5CF6)', fontWeight: 700, textDecoration: 'none' }}>
            🎒 Switch to School Mode
          </a>
        </div>
      )}
      <DashboardV2 data={data} />
    </>
  )
}
