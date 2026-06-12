import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { LessonScreen } from '@/components/learn/LessonScreen'
import { MessageRole } from '@prisma/client'
import { t } from '@/lib/i18n'
import { SubjectType } from '@prisma/client'
import { getSchoolChapters, getChapterPosition, isSchoolSubject, schoolSubjectCode, chapterDisplayTitle, SCHOOL_SUBJECT_META } from '@/lib/school/schoolRouting'

export default async function LearnPage({ searchParams }: { searchParams?: { subject?: string; chapter?: string } }) {
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
  }))

  // Auto-heal: if profile exists but flag not set, fix it
  if (!user?.onboardingCompleted) {
    if (user?.profile) {
      await prisma.user.update({ where: { id: session.user.id }, data: { onboardingCompleted: true } })
    } else {
      redirect('/onboarding')
    }
  }

  if (!user?.profile) redirect('/onboarding')

  let profile = user.profile

  // Allow picking a specific enrolled subject for this session via /learn?subject=<slug>
  // (e.g. the "Continue learning" link from /library/[slug]) — falls back to the
  // learner's primary (first-enrolled) subject when absent or not enrolled in.
  const requestedSlug = searchParams?.subject
  const requestedSubject = requestedSlug
    ? profile?.subjects.find((ps) => ps.subject.slug === requestedSlug)?.subject
    : undefined
  let primarySubject = requestedSubject ?? profile?.subjects[0]?.subject

  // ─── School Mode (Sprint BI) ───
  // School students arrive from /school/<subject> with an explicit chapter id.
  // Resolve the chapter against the board catalog (falling back to the current
  // chapter from namespaced progress), and ensure a Subject row exists so the
  // session pipeline works without ProfileSubject enrollment.
  let schoolChapterId: string | undefined
  let schoolChapterTitle: string | undefined
  if (
    profile.userType === 'SCHOOL_STUDENT' && profile.educationBoard && profile.grade &&
    requestedSlug && isSchoolSubject(profile.educationBoard, requestedSlug)
  ) {
    const chapters = getSchoolChapters(profile.educationBoard, requestedSlug, profile.grade)
    if (chapters.length > 0) {
      const sp = await prisma.studentProgress.findUnique({
        where: { userId_subjectCode: { userId: session.user.id, subjectCode: schoolSubjectCode(profile.educationBoard, requestedSlug, profile.grade) } },
        select: { completedLessons: true },
      }).catch(() => null)
      const pos = getChapterPosition(chapters, sp?.completedLessons ?? [])
      const chapter = chapters.find((c) => c.id === searchParams?.chapter) ?? pos?.current
      if (chapter) {
        schoolChapterId = chapter.id
        schoolChapterTitle = chapterDisplayTitle(chapter.title)
        // SubjectType is cosmetic for non-code subjects — closest buckets used.
        const SCHOOL_TYPE: Record<string, SubjectType> = {
          mathematics: SubjectType.MATHEMATICS,
          science: SubjectType.PHYSICS,
          english: SubjectType.ENGLISH,
          social_science: SubjectType.LANGUAGE,
        }
        const meta = SCHOOL_SUBJECT_META[requestedSlug]
        primarySubject = await prisma.subject.upsert({
          where: { slug: requestedSlug },
          update: {},
          create: { slug: requestedSlug, name: meta?.label ?? requestedSlug, type: SCHOOL_TYPE[requestedSlug] ?? SubjectType.LANGUAGE },
        })
      }
    }
  }

  // Auto-heal: profile has no subject linked — ensure subject exists then link it
  if (profile && !primarySubject) {
    // Guarantee at least one subject exists (upsert python as safe default)
    const SLUG_TO_TYPE: Record<string, 'C' | 'CPP' | 'PYTHON' | 'ENGLISH'> = {
      c: 'C', cpp: 'CPP', python: 'PYTHON', english: 'ENGLISH',
    }
    let anySubject = await prisma.subject.findFirst()
    if (!anySubject) {
      anySubject = await prisma.subject.upsert({
        where: { slug: 'python' },
        update: {},
        create: { slug: 'python', name: 'Python', type: SLUG_TO_TYPE['python'] },
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

    // Re-fetch profile with subjects
    const refreshed = await prisma.profile.findUnique({
      where: { userId: session.user.id },
      include: { subjects: { include: { subject: true }, orderBy: { createdAt: 'asc' } } },
    })
    if (refreshed) {
      profile = refreshed
      primarySubject = refreshed.subjects[0]?.subject ?? anySubject
    }
  }

  // Last resort: if still no subject, use a stub so the lesson renders
  if (!profile) redirect('/onboarding')
  const resolvedSubject = primarySubject ?? { id: '', slug: 'python', name: 'Python' }

  // All enrolled subjects for the lesson sidebar
  const subjects = profile.subjects.map((ps) => ({
    slug: ps.subject.slug,
    name: ps.subject.name,
  }))

  // Server-side lesson position for resume — used in the opening message
  const studentProgress = resolvedSubject.id
    ? await prisma.studentProgress.findUnique({
        where: { userId_subjectCode: { userId: session.user.id, subjectCode: resolvedSubject.slug } },
        select: { lastLessonTitle: true, lastUnitTitle: true, currentLesson: true },
      })
    : null

  // Fetch last 3 completed sessions for memory context
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
        orderBy: { createdAt: 'asc' },
      },
    },
  })) : []

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
      resumeLessonTitle={schoolChapterTitle ?? studentProgress?.lastLessonTitle ?? undefined}
      resumeUnitTitle={schoolChapterId ? undefined : studentProgress?.lastUnitTitle ?? undefined}
      schoolChapterId={schoolChapterId}
    />
  )
}
