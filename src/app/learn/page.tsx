import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { t } from '@/lib/i18n'
import { LessonScreen } from '@/components/learn/LessonScreen'
import { MessageRole } from '@prisma/client'

export default async function LearnPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      onboardingCompleted: true,
      profile: {
        include: { subjects: { include: { subject: true }, orderBy: { createdAt: 'asc' } } },
      },
    },
  })

  if (!user?.onboardingCompleted) redirect('/onboarding')

  const profile = user?.profile
  const primarySubject = profile?.subjects[0]?.subject

  if (!profile || !primarySubject) redirect('/dashboard')

  // All enrolled subjects for the lesson sidebar
  const subjects = profile.subjects.map((ps) => ({
    slug: ps.subject.slug,
    name: ps.subject.name,
  }))

  // Fetch last 3 completed sessions for memory context
  const pastSessions = await prisma.learnSession.findMany({
    where: {
      userId: session.user.id,
      subjectId: primarySubject.id,
      endedAt: { not: null },
    },
    orderBy: { startedAt: 'desc' },
    take: 3,
    include: {
      messages: {
        orderBy: { createdAt: 'asc' },
      },
    },
  })

  let memoryContext: string | null = null
  let pastSessionsSummary: string | null = null

  const teachingLang = (profile.teachingLanguage ?? 'ru') as 'ru' | 'en' | 'hi'

  if (pastSessions.length > 0) {
    const locale = teachingLang === 'ru' ? 'ru-RU' : teachingLang === 'hi' ? 'hi-IN' : 'en-US'
    const studentLabel = t(teachingLang, 'learn_label_student')
    const tutorLabel   = t(teachingLang, 'learn_label_tutor')
    const lessonLabel  = t(teachingLang, 'learn_label_lesson')
    const prevLabel    = t(teachingLang, 'learn_label_prev')
    const recentLabel  = t(teachingLang, 'learn_label_recent')

    const summaryLines = pastSessions
      .filter((s) => s.summary)
      .map((s, i) => {
        const date = new Date(s.startedAt).toLocaleDateString(locale, {
          day: 'numeric',
          month: 'long',
        })
        return `${lessonLabel} ${i + 1} (${date}): ${s.summary}`
      })

    // Collect last 10 messages across past sessions
    const allMessages = pastSessions
      .flatMap((s) => s.messages)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .slice(-10)
      .map((m) => `${m.role === MessageRole.USER ? studentLabel : tutorLabel}: ${m.content.slice(0, 200)}`)

    const parts: string[] = []
    if (summaryLines.length > 0) {
      parts.push(`${prevLabel}:\n${summaryLines.join('\n')}`)
    }
    if (allMessages.length > 0) {
      parts.push(`${recentLabel}:\n${allMessages.join('\n')}`)
    }
    if (parts.length > 0) {
      memoryContext = parts.join('\n\n')
    }

    // For the opening greeting — use the most recent session's summary
    pastSessionsSummary = pastSessions[0]?.summary ?? null
  }

  return (
    <LessonScreen
      subjectSlug={primarySubject.slug}
      subjectName={primarySubject.name}
      levelDescription={profile.selfDescription}
      voiceChoice={profile.voiceId ?? 'alexei'}
      teachingLanguage={teachingLang}
      memoryContext={memoryContext}
      pastSessionsSummary={pastSessionsSummary}
      subjects={subjects}
      displayName={profile.displayName}
    />
  )
}
