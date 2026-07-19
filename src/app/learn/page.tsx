import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { LessonScreen } from '@/components/learn/LessonScreen'
import { MessageRole } from '@prisma/client'
import { t, type TranslationKey } from '@/lib/i18n'
import { getUserNavSubjects } from '@/lib/subjects/getUserNavSubjects'

const ASK_PROMPT_KEYS: Record<string, TranslationKey> = {
  explain: 'chapter_ask_explain',
  examples: 'chapter_ask_examples',
  summary: 'chapter_ask_summary',
  basics: 'chapter_ask_basics',
}

export default async function LearnPage({ searchParams }: { searchParams?: { subject?: string; practice?: string; ask?: string } }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const user = await withRetry(() => prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      onboardingCompleted: true,
      profile: {
        include: { subjects: { include: { subject: true }, orderBy: { createdAt: 'asc' } } },
      },
    },
  })).catch(() => null)

  if (!user?.onboardingCompleted) {
    if (user?.profile) {
      // BUG-2 FIX: non-critical flag update — swallow transient DB errors so
      // a Neon cold start doesn't throw to the error boundary; the update is
      // best-effort and the page renders correctly either way.
      await prisma.user.update({ where: { id: session.user.id }, data: { onboardingCompleted: true } }).catch(() => {})
    } else {
      redirect('/onboarding')
    }
  }

  if (!user?.profile) redirect('/onboarding')

  let profile = user.profile

  const requestedSlug = searchParams?.subject
  const requestedSubject = requestedSlug
    ? profile?.subjects.find((ps) => ps.subject.slug === requestedSlug)?.subject
    : undefined
  let primarySubject = requestedSubject ?? profile?.subjects[0]?.subject

  // Auto-heal: profile has no subject linked — ensure subject exists then link it
  if (profile && !primarySubject) {
    let anySubject = await prisma.subject.findFirst()
    if (!anySubject) {
      anySubject = await prisma.subject.upsert({
        where: { slug: 'python' },
        update: {},
        create: { slug: 'python', name: 'Python', type: 'PYTHON' },
      })
    }

    await prisma.profileSubject.upsert({
      where: { profileId_subjectId: { profileId: profile.id, subjectId: anySubject.id } },
      update: {},
      create: { profileId: profile.id, subjectId: anySubject.id },
    })

    const existingPath = await prisma.learningPath.findFirst({ where: { userId: session.user.id, subjectId: anySubject.id } })
    if (!existingPath) {
      await prisma.learningPath.create({
        data: {
          userId: session.user.id, subjectId: anySubject.id,
          title: `${anySubject.name} Course`,
          curriculum: { generated: false, steps: [] },
          totalSteps: 0, isActive: true,
        },
      }).catch(() => null)
    }

    const refreshed = await prisma.profile.findUnique({
      where: { userId: session.user.id },
      include: { subjects: { include: { subject: true }, orderBy: { createdAt: 'asc' } } },
    })
    if (refreshed) {
      profile = refreshed
      primarySubject = refreshed.subjects[0]?.subject ?? anySubject
    }
  }

  if (!profile) redirect('/onboarding')
  const resolvedSubject = primarySubject ?? { id: '', slug: 'python', name: 'Python' }

  const subjects = getUserNavSubjects(profile, false)

  // BUG-2 FIX: wrap in try-catch so a Neon cold-start timeout or transient
  // DB error doesn't throw to the Next.js error boundary ("Something went wrong").
  // Returning null is the correct fallback — the lesson page renders without
  // a resume hint, which is better than a crash.
  const studentProgress = resolvedSubject.id
    ? await prisma.studentProgress.findUnique({
        where: { userId_subjectCode: { userId: session.user.id, subjectCode: resolvedSubject.slug } },
        select: { lastLessonTitle: true, lastUnitTitle: true, currentLesson: true },
      }).catch(() => null)
    : null

  const pastSessions = resolvedSubject.id ? await withRetry(() => prisma.learnSession.findMany({
    where: {
      userId: session.user.id,
      subjectId: resolvedSubject.id,
      endedAt: { not: null },
    },
    orderBy: { startedAt: 'desc' },
    take: 3,
    include: {
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: { role: true, content: true, createdAt: true },
      },
    },
  })).catch(() => [] as any[]) : []

  let memoryContext: string | null = null
  let pastSessionsSummary: string | null = null

  const teachingLang = (profile.teachingLanguage ?? 'en') as 'ru' | 'en' | 'hi'

  if (pastSessions.length > 0) {
    const studentLabel = t(teachingLang, 'learn_label_student')
    const tutorLabel   = t(teachingLang, 'learn_label_tutor')
    const lessonLabel  = t(teachingLang, 'learn_label_lesson')
    const prevLabel    = t(teachingLang, 'learn_label_prev')
    const recentLabel  = t(teachingLang, 'learn_label_recent')
    const locale       = teachingLang === 'ru' ? 'ru-RU' : teachingLang === 'hi' ? 'hi-IN' : 'en-US'

    const summaryLines = pastSessions
      .filter((s) => s.summary)
      .map((s, i) => {
        const date = new Date(s.startedAt).toLocaleDateString(locale, { day: 'numeric', month: 'long' })
        return `${lessonLabel} ${i + 1} (${date}): ${s.summary}`
      })

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

    pastSessionsSummary = pastSessions[0]?.summary ?? null
  }

  const autoOpenPractice = searchParams?.practice === '1'
  const askKey = searchParams?.ask ? ASK_PROMPT_KEYS[searchParams.ask] : undefined
  const initialPrompt = askKey ? t(teachingLang, askKey) : undefined

  return (
    <LessonScreen
      key={resolvedSubject.slug}
      subjectSlug={resolvedSubject.slug}
      subjectName={resolvedSubject.name}
      levelDescription={profile.selfDescription}
      voiceChoice={profile.voiceId ?? 'alexei'}
      teachingLanguage={teachingLang}
      voiceSpeed={profile.voiceSpeed ?? 1.0}
      memoryContext={memoryContext}
      pastSessionsSummary={pastSessionsSummary}
      subjects={subjects}
      displayName={profile.displayName}
      userId={session.user.id}
      resumeLessonTitle={studentProgress?.lastLessonTitle ?? undefined}
      resumeUnitTitle={studentProgress?.lastUnitTitle ?? undefined}
      autoOpenPractice={autoOpenPractice}
      initialPrompt={initialPrompt}
    />
  )
}
