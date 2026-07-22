import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { withTimeout } from '@/lib/net/timeout'
import { LessonScreen } from '@/components/learn/LessonScreen'
import { MessageRole } from '@prisma/client'
import { t, type TranslationKey } from '@/lib/i18n'
import { getUserNavSubjects } from '@/lib/subjects/getUserNavSubjects'
import { ConnectionRecovery } from '@/components/system/ConnectionRecovery'

// P0 (subject switching, Lesson Flow sprint item 1): auth() already forces
// this route dynamic (any cookies()/auth() call opts a route out of static
// rendering) — this export makes that explicit and removes any ambiguity
// about the Next.js client Router Cache serving a stale RSC payload for a
// previously-visited ?subject= URL, which is the textbook mechanism behind
// "switching subjects shows stale state until a hard refresh." The actual
// subject/curriculum/roadmap reset itself is driven by
// <LessonScreen key={resolvedSubject.slug}> below — a genuine React key
// change unmounts and remounts the component, clearing every local
// useState/useRef it owns. That mechanism was already correct; this export
// closes the one remaining doubt about whether a stale cached render could
// ever be served instead of a fresh one.
export const dynamic = 'force-dynamic'

// Bounded, retried user+profile load — extracted so the page body can type
// its recoverable-failure handling off this function's return type.
function loadLearnUser(userId: string) {
  return withTimeout(withRetry(() => prisma.user.findUnique({
    where: { id: userId },
    select: {
      onboardingCompleted: true,
      profile: {
        include: { subjects: { include: { subject: true }, orderBy: { createdAt: 'asc' } } },
      },
    },
  })), 12000, 'learn-user')
}

const ASK_PROMPT_KEYS: Record<string, TranslationKey> = {
  explain: 'chapter_ask_explain',
  examples: 'chapter_ask_examples',
  summary: 'chapter_ask_summary',
  basics: 'chapter_ask_basics',
}

export default async function LearnPage({ searchParams }: { searchParams?: { subject?: string; practice?: string; ask?: string } }) {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  // P0 (global "Something went wrong" for transient failures): this await
  // used to be unguarded — a Neon cold start / pool exhaustion / network
  // blip here THREW out of the Server Component into the app-wide error
  // boundary (error.tsx, "Error ID: <digest>"). A transient DB failure is
  // recoverable by definition; it must degrade to the inline auto-retrying
  // recovery screen, never to the global error page. redirect() calls stay
  // OUTSIDE the try so NEXT_REDIRECT control-flow is never swallowed.
  let user: Awaited<ReturnType<typeof loadLearnUser>> | undefined
  let userLoadFailed = false
  try {
    user = await loadLearnUser(session.user.id)
  } catch (err) {
    console.error('[learn] transient user-load failure, showing recovery screen:', err)
    userLoadFailed = true
  }
  if (userLoadFailed) return <ConnectionRecovery retryKey="learn" />

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

  // Auto-heal: profile has no subject linked — ensure subject exists then link it.
  // Wrapped in try/catch: these calls have no individual timeout; a Neon cold-start
  // hang here would throw directly to error.tsx. On any failure we redirect to
  // onboarding (same outcome as if the profile were missing), never crash.
  if (profile && !primarySubject) {
    try {
      let anySubject = await withTimeout(prisma.subject.findFirst(), 8000, 'learn-heal-findSubject')
      if (!anySubject) {
        anySubject = await withTimeout(prisma.subject.upsert({
          where: { slug: 'python' },
          update: {},
          create: { slug: 'python', name: 'Python', type: 'PYTHON' },
        }), 8000, 'learn-heal-upsertSubject')
      }

      await withTimeout(prisma.profileSubject.upsert({
        where: { profileId_subjectId: { profileId: profile.id, subjectId: anySubject.id } },
        update: {},
        create: { profileId: profile.id, subjectId: anySubject.id },
      }), 8000, 'learn-heal-upsertProfileSubject')

      const existingPath = await withTimeout(prisma.learningPath.findFirst({ where: { userId: session.user.id, subjectId: anySubject.id } }), 8000, 'learn-heal-findPath')
      if (!existingPath) {
        await withTimeout(prisma.learningPath.create({
          data: {
            userId: session.user.id, subjectId: anySubject.id,
            title: `${anySubject.name} Course`,
            curriculum: { generated: false, steps: [] },
            totalSteps: 0, isActive: true,
          },
        }), 8000, 'learn-heal-createPath').catch(() => null)
      }

      const refreshed = await withTimeout(prisma.profile.findUnique({
        where: { userId: session.user.id },
        include: { subjects: { include: { subject: true }, orderBy: { createdAt: 'asc' } } },
      }), 8000, 'learn-heal-refreshProfile')
      if (refreshed) {
        profile = refreshed
        primarySubject = refreshed.subjects[0]?.subject ?? anySubject
      }
    } catch {
      redirect('/onboarding')
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

  const pastSessions = resolvedSubject.id ? await withTimeout(withRetry(() => prisma.learnSession.findMany({
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
  // Past-session memory context is a nice-to-have, never worth the page: a
  // transient failure here degrades to "no memory context" instead of
  // throwing to the global error boundary (same class as the studentProgress
  // .catch above).
  })), 12000, 'learn-pastSessions').catch((err) => {
    console.error('[learn] transient pastSessions failure, rendering without memory context:', err)
    return []
  }) : []

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
