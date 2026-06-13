import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { Award, ChevronDown, Flame, GraduationCap, Layers, Sparkles, ArrowRight, Settings, Map as MapIcon } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { SignOutButton } from '@/components/dashboard/SignOutButton'
import { InstallBanner } from '@/components/dashboard/InstallBanner'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { RoadmapPanel } from '@/components/dashboard/RoadmapPanel'
import MasterySummaryPanel from '@/components/mastery/MasterySummaryPanel'
import CareerSummaryPanel from '@/components/career/CareerSummaryPanel'
import { t as i18nT } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'
import { findLibrarySubject } from '@/lib/curriculum/subjectCatalog'
import { SchoolDashboard, type SchoolSubjectProgress } from '@/components/dashboard/SchoolDashboard'
import { getBoard } from '@/lib/education'
import { getSchoolProgressForSubjects } from '@/lib/school/schoolProgress'
import { getRecommendedRevisionChapter } from '@/lib/school/adaptive/weakTopics'
import { getNextBestAction } from '@/lib/school/adaptive/nextBestAction'
import { getDailyStudyPlan } from '@/lib/school/adaptive/dailyPlan'
import { getStudyStreak } from '@/lib/school/achievements/streakEngine'
import { getRecentAchievement } from '@/lib/school/achievements/achievementEngine'

function getLevel(xp: number, lang: Lang) {
  if (xp >= 1001) return { name: i18nT(lang, 'level_master'),       color: 'var(--yellow)', next: null }
  if (xp >= 601)  return { name: i18nT(lang, 'level_expert'),       color: 'var(--blue)',   next: 1001 }
  if (xp >= 301)  return { name: i18nT(lang, 'level_practitioner'), color: 'var(--green)',  next: 601 }
  if (xp >= 101)  return { name: i18nT(lang, 'level_student'),      color: 'var(--purple)', next: 301 }
  return           { name: i18nT(lang, 'level_novice'),              color: 'var(--text-secondary)', next: 101 }
}

function subjectMeta(slug: string, lang: Lang): { icon: string; label: string; color: string; bg: string; border: string } {
  const labels: Record<string, string> = {
    c:       i18nT(lang, 'subj_c_label'),
    cpp:     'C++',
    python:  'Python',
    english: i18nT(lang, 'subj_english_label'),
  }
  const meta: Record<string, { icon: string; color: string; bg: string; border: string }> = {
    c:       { icon: '⚙️',  color: 'var(--blue)',   bg: 'var(--blue-muted)',   border: 'var(--border-default)' },
    cpp:     { icon: '🔷',  color: 'var(--blue)',   bg: 'var(--blue-muted)',   border: 'var(--border-default)' },
    python:  { icon: '🐍',  color: 'var(--green)',  bg: 'var(--green-muted)',  border: 'var(--border-default)' },
    english: { icon: '🇬🇧', color: 'var(--yellow)', bg: 'var(--yellow-muted)', border: 'var(--border-default)' },
  }
  const libraryIcon = findLibrarySubject(slug)?.icon
  const fallback = { icon: libraryIcon ?? '📘', color: 'var(--coral)', bg: 'var(--coral-muted)', border: 'var(--border-default)' }
  const m = meta[slug] ?? fallback
  return { ...m, label: labels[slug] ?? findLibrarySubject(slug)?.name ?? slug }
}

function dayBucket(date: Date, lang: Lang): 'today' | 'yesterday' | 'earlier' {
  const d = new Date(date)
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfYesterday = new Date(startOfToday.getTime() - 86400000)
  if (d >= startOfToday) return 'today'
  if (d >= startOfYesterday) return 'yesterday'
  return 'earlier'
}

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login')

  const [user, recentSessions] = await withRetry(() => Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        onboardingCompleted: true,
        name: true,
        xpPoints: true,
        profile: {
          select: {
            displayName: true,
            teachingLanguage: true,
            streakDays: true,
            userType: true,
            educationBoard: true,
            grade: true,
            subjects: { include: { subject: true }, orderBy: { createdAt: 'asc' } },
          },
        },
      },
    }),
    prisma.learnSession.findMany({
      where: { userId: session.user.id },
      orderBy: { startedAt: 'desc' },
      take: 10,
      include: { subject: { select: { name: true, slug: true } } },
    }),
  ]))

  const enrolledSlugs = user?.profile?.subjects?.map((ps) => ps.subject.slug) ?? []
  const [studentProgressList, subjectCertificates, roadmapCertCount] = await withRetry(() => Promise.all([
    prisma.studentProgress.findMany({
      where: { userId: session.user.id, subjectCode: { in: enrolledSlugs.length > 0 ? enrolledSlugs : [''] } },
      select: { subjectCode: true, currentLesson: true, completedLessons: true, lastStudiedAt: true, lastLessonTitle: true, lastUnitTitle: true, isCompleted: true, completedAt: true, completionPercent: true },
    }),
    prisma.subjectCertificate.findMany({ where: { userId: session.user.id }, select: { subjectCode: true } }),
    prisma.certificate.count({ where: { userId: session.user.id } }),
  ]))
  const spMap = new Map(studentProgressList.map((sp) => [sp.subjectCode, sp]))

  // If profile exists but flag not set, fix the flag and continue rather than looping
  if (!user?.onboardingCompleted) {
    if (user?.profile) {
      await prisma.user.update({ where: { id: session.user.id }, data: { onboardingCompleted: true } })
    } else {
      redirect('/onboarding')
    }
  }

  // ─── School Student home (Sprint BG) ───
  // Subjects derive from board + grade — never asked again. Chapter routing
  // attaches in Sprint BH; CTAs land on /learn?subject=<slug> until then.
  const sp0 = user.profile
  if (sp0?.userType === 'SCHOOL_STUDENT' && sp0.educationBoard && sp0.grade) {
    const boardDef = getBoard(sp0.educationBoard)
    const schoolSlugs = boardDef?.subjects ?? ['mathematics', 'science', 'english', 'social_science']
    // Live progress derived from namespaced StudentProgress + TopicProgress
    // mastery (Sprint BJ) — see src/lib/school/schoolProgress.ts.
    const [progressMap, revisionRaw, pendingAssessmentRow, nextAction, dailyPlan, streakData, recentAchievement] = await Promise.all([
      withRetry(() => getSchoolProgressForSubjects(session.user.id, sp0.educationBoard!, sp0.grade!, schoolSlugs)),
      // Sprint BO: single top revision recommendation from the weak-topic engine
      getRecommendedRevisionChapter(session.user.id, sp0.educationBoard!, sp0.grade!).catch(() => null),
      // Sprint BN: find the most recent incomplete assessment session to resume
      withRetry(() => prisma.practiceSession.findFirst({
        where: { userId: session.user.id, subjectSlug: { in: schoolSlugs }, kind: 'assessment', completedAt: null },
        orderBy: { createdAt: 'desc' },
        select: { subjectSlug: true, chapterId: true },
      })).catch(() => null),
      // Sprint BP: next best action for the "Your Next Step" card
      getNextBestAction(session.user.id, sp0.educationBoard!, sp0.grade!).catch(() => null),
      // Sprint BQ: daily study plan tasks
      getDailyStudyPlan(session.user.id, sp0.educationBoard!, sp0.grade!).catch(() => [] as Awaited<ReturnType<typeof getDailyStudyPlan>>),
      // Sprint CD: streak data
      getStudyStreak(session.user.id).catch(() => null),
      // Sprint CD: most recent achievement
      getRecentAchievement(session.user.id).catch(() => null),
    ])
    // Suppress the BO revision card when the Next Step card already points at
    // the same chapter — one recommendation, no duplicates.
    const revision = revisionRaw && nextAction?.chapterId === revisionRaw.chapterId ? null : revisionRaw
    const subjects: SchoolSubjectProgress[] = schoolSlugs.map((slug) => {
      const row = progressMap.get(slug)
      return {
        slug,
        completionPercent: row?.percent ?? 0,
        completedCount: row?.completedCount ?? 0,
        totalCount: row?.totalCount ?? 0,
        lastChapterTitle: row?.lastChapterTitle ?? null,
        lastStudiedAt: row?.lastStudiedAt ?? null,
      }
    })
    const startOfToday = new Date(); startOfToday.setHours(0, 0, 0, 0)
    const studiedToday = recentSessions.some((s) => s.startedAt >= startOfToday)
    // Pending assessment: resume link overrides current-chapter CTA
    const pendingAssessment = pendingAssessmentRow?.chapterId
      ? { subjectSlug: pendingAssessmentRow.subjectSlug, chapterId: pendingAssessmentRow.chapterId }
      : null
    return (
      <SchoolDashboard
        displayName={sp0.displayName ?? user.name ?? 'Student'}
        board={sp0.educationBoard}
        grade={sp0.grade}
        streakDays={sp0.streakDays ?? 0}
        xpPoints={user.xpPoints ?? 0}
        studiedToday={studiedToday}
        subjects={subjects}
        revision={revision}
        nextAction={nextAction}
        pendingAssessment={pendingAssessment}
        dailyPlan={dailyPlan}
        momentum={streakData ? { currentStreak: streakData.currentStreak, longestStreak: streakData.longestStreak, recentAchievement } : null}
      />
    )
  }

  const profile = user.profile
  const lang = ((profile?.teachingLanguage ?? 'en') as Lang)
  const T = (key: Parameters<typeof i18nT>[1]) => i18nT(lang, key)
  const enrolledSubjects = profile?.subjects ?? []
  const displayName = profile?.displayName ?? user.name ?? 'Student'
  const xpPoints = user?.xpPoints ?? 0
  const streakDays = profile?.streakDays ?? 0
  const level = getLevel(xpPoints, lang)
  const lessonsCompleted = studentProgressList.reduce((sum, sp) => sum + sp.completedLessons.length, 0)
  const certificatesEarnedCount = subjectCertificates.length + roadmapCertCount

  // Active subject = most recently studied, falling back to the first enrolled
  const activePs = [...enrolledSubjects].sort((a, b) => {
    const ta = spMap.get(a.subject.slug)?.lastStudiedAt?.getTime() ?? 0
    const tb = spMap.get(b.subject.slug)?.lastStudiedAt?.getTime() ?? 0
    return tb - ta
  })[0] ?? null
  const activeSubject = activePs?.subject ?? null
  const activeSp = activeSubject ? spMap.get(activeSubject.slug) : undefined
  const activeMeta = activeSubject ? subjectMeta(activeSubject.slug, lang) : null
  const activeProgress = activeSp?.completionPercent ?? activePs?.progressPercent ?? 0

  // Activity buckets for the compact timeline
  const buckets: Record<'today' | 'yesterday' | 'earlier', typeof recentSessions> = { today: [], yesterday: [], earlier: [] }
  for (const s of recentSessions) buckets[dayBucket(s.startedAt, lang)].push(s)
  const bucketLabels = { today: T('dashx_today'), yesterday: T('dashx_yesterday'), earlier: T('dashx_earlier') }

  const VISIBLE_SUBJECTS = 6

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>

      {/* Navbar */}
      <nav className="sticky top-0 z-50"
        style={{ background: 'var(--bg-overlay)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-default)' }}>
        <div className="max-w-5xl mx-auto px-5 h-[60px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <span className="font-bold text-base" style={{ color: 'var(--coral)', fontFamily: 'var(--font-heading)' }}>My Tutor</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/settings" className="btn-ghost text-xs px-3 py-1.5 flex items-center gap-1.5">
              <Settings size={13} /> {T('dash_settings')}
            </Link>
            <SignOutButton />
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-5 py-8 space-y-8">

        <InstallBanner />

        {/* ═══ SECTION 1 — LEARNING HERO ═══ */}
        <section className="relative rounded-2xl overflow-hidden"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-md)' }}>
          <div className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 0% 0%, var(--coral-muted) 0%, transparent 55%)' }} />
          <div className="relative p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              {/* Avatar */}
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white shrink-0"
                style={{ background: 'linear-gradient(135deg, var(--coral), #FF9E88)', boxShadow: 'var(--coral-glow)' }}>
                {displayName.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
                  {T('dash_greeting')}, <span className="text-gradient-coral">{displayName}</span>! 👋
                </h1>
                {activeSubject && activeMeta ? (
                  <p className="text-sm mt-1.5 truncate" style={{ color: 'var(--text-secondary)' }}>
                    {activeMeta.icon} <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{activeSubject.name}</span>
                    {' · '}
                    {T('dashx_current_lesson')} {activeSp?.currentLesson ?? 1}
                    {activeSp?.lastLessonTitle ? ` — ${activeSp.lastLessonTitle}` : ''}
                  </p>
                ) : (
                  <p className="text-sm mt-1.5" style={{ color: 'var(--text-secondary)' }}>{T('dash_personal_board')}</p>
                )}

                {/* XP / streak / progress chips */}
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <HeroChip icon="⚡" label={`${xpPoints} XP`} />
                  <HeroChip icon="🔥" label={`${streakDays} ${T('dash_streak')}`} />
                  {activeSubject && <HeroChip icon="📈" label={`${activeProgress}%`} />}
                </div>
              </div>

              {/* Resume CTA */}
              <div className="shrink-0">
                <Link href={activeSubject ? `/learn?subject=${activeSubject.slug}` : '/learn'}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-xl text-white transition-transform hover:scale-[1.02]"
                  style={{ background: 'var(--coral)', textDecoration: 'none', boxShadow: 'var(--coral-glow)' }}>
                  {activeSubject ? T('dashx_resume_lesson') : T('dash_start_lesson')}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Hero progress bar */}
            {activeSubject && (
              <div className="mt-5 h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                <div className="h-full rounded-full" style={{ width: `${Math.min(100, Math.max(0, activeProgress))}%`, background: 'var(--coral)', transition: 'width .5s' }} />
              </div>
            )}
          </div>
        </section>

        {/* ═══ SECTION 2 — LEARNING SNAPSHOT ═══ */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Layers}        label={T('dash_subjects_count')}      value={String(enrolledSubjects.length)} color="var(--blue)" />
          <StatCard icon={GraduationCap} label={T('dashx_lessons_completed')}  value={String(lessonsCompleted)}        color="var(--coral)" />
          <StatCard icon={Flame}         label={T('dash_streak')}              value={`${streakDays} 🔥`}              color="var(--yellow)" />
          <StatCard icon={Sparkles}      label={T('dash_xp_stat')}             value={String(xpPoints)}                color="var(--purple)" />
        </section>

        {/* ═══ SECTION 3 — MY SUBJECTS ═══ */}
        <section>
          <SectionHeading icon={Layers} title={T('dashx_my_subjects')}
            right={<Link href="/library" className="text-xs font-bold" style={{ color: 'var(--coral)' }}>+ {T('library_add_subject')}</Link>} />
          {enrolledSubjects.length === 0 ? (
            <EmptyState emoji="🧭" title={T('dash_no_programs')} sub={T('dash_no_programs_sub')}
              cta={{ href: '/library', label: `+ ${T('library_add_subject')}` }} />
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {enrolledSubjects.slice(0, VISIBLE_SUBJECTS).map((ps) => {
                  const m = subjectMeta(ps.subject.slug, lang)
                  const sp = spMap.get(ps.subject.slug)
                  const progress = sp?.completionPercent ?? ps.progressPercent ?? 0
                  return (
                    <div key={ps.id} className="rounded-2xl p-4 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-0.5"
                      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                          style={{ background: m.bg, border: `1px solid ${m.border}` }}>
                          {m.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-sm truncate" style={{ color: 'var(--text-primary)' }}>{ps.subject.name}</p>
                          <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>
                            {sp?.lastLessonTitle ?? `${T('dashx_current_lesson')} ${sp?.currentLesson ?? 1}`}
                          </p>
                        </div>
                        <span className="text-xs font-mono shrink-0 font-bold" style={{ color: m.color }}>{progress}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                        <div className="h-full rounded-full" style={{ width: `${Math.min(100, Math.max(0, progress))}%`, background: m.color }} />
                      </div>
                      <Link href={`/learn?subject=${ps.subject.slug}`}
                        className="text-center text-xs font-bold rounded-lg py-2 transition-colors"
                        style={{ background: 'var(--bg-elevated)', color: 'var(--text-primary)', border: '1px solid var(--border-default)', textDecoration: 'none' }}>
                        {T('dashx_continue')} →
                      </Link>
                    </div>
                  )
                })}
              </div>
              {enrolledSubjects.length > VISIBLE_SUBJECTS && (
                <Link href="/library" className="block text-center text-xs font-bold mt-3 py-2.5 rounded-xl"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', textDecoration: 'none' }}>
                  {T('dashx_view_all_subjects')} ({enrolledSubjects.length})
                </Link>
              )}
            </>
          )}
        </section>

        {/* ═══ SECTION 4 — CURRENT ROADMAP (collapsed by default) ═══ */}
        {activeSubject && activeMeta && (
          <section>
            <details className="group rounded-2xl overflow-hidden"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
              <summary className="flex items-center gap-3 px-5 py-4 cursor-pointer select-none list-none">
                <MapIcon size={15} style={{ color: 'var(--coral)' }} />
                <span className="font-bold text-sm flex-1" style={{ color: 'var(--text-primary)' }}>
                  {T('dashx_current_roadmap')} · {activeMeta.icon} {activeSubject.name}
                </span>
                <span className="text-xs font-mono" style={{ color: activeMeta.color }}>{activeProgress}%</span>
                <ChevronDown size={15} className="transition-transform group-open:rotate-180" style={{ color: 'var(--text-secondary)' }} />
              </summary>
              <div className="px-5 pb-5 space-y-4" style={{ borderTop: '1px solid var(--border-default)' }}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                  <RoadmapFact label={T('dashx_current_unit')}   value={activeSp?.lastUnitTitle ?? '—'} />
                  <RoadmapFact label={T('dashx_current_lesson')} value={activeSp?.lastLessonTitle ?? `#${activeSp?.currentLesson ?? 1}`} />
                  <RoadmapFact label={T('dash_next_milestone')}  value={`${T('dashx_current_lesson')} ${activeSp?.currentLesson ?? 1}`} />
                  <RoadmapFact label={T('dashx_completion')}     value={`${activeProgress}%`} />
                </div>
                <RoadmapPanel subjectSlug={activeSubject.slug} lang={lang} />
              </div>
            </details>
          </section>
        )}

        {/* ═══ SECTION 5 — ACHIEVEMENT CENTER (XP + level + certificates + streak merged) ═══ */}
        <section>
          <SectionHeading icon={Award} title={T('dashx_achievements')} />
          <div className="rounded-2xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
            <div className="flex items-center gap-5 flex-wrap">
              {/* Level + XP progress */}
              <div className="flex-1 min-w-[220px]">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{T('dashx_level')}</span>
                  <span className="text-sm font-black" style={{ color: level.color }}>{level.name}</span>
                  <span className="text-xs ml-auto" style={{ color: 'var(--text-secondary)' }}>
                    {xpPoints} XP{level.next ? ` · ${T('dash_until_xp')} ${level.next} XP` : ''}
                  </span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                  <div className="h-full rounded-full" style={{ width: `${level.next ? Math.min((xpPoints / level.next) * 100, 100) : 100}%`, background: level.color, transition: 'width .5s' }} />
                </div>
              </div>
              {/* Certificates + streak */}
              <div className="flex gap-3">
                <AchievementChip icon="🎓" value={String(certificatesEarnedCount)} label={T('dashx_certificates')} />
                <AchievementChip icon="🔥" value={String(streakDays)} label={T('dash_streak')} />
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SECTION 6 — RECENT ACTIVITY (compact timeline) ═══ */}
        <section>
          <SectionHeading icon={GraduationCap} title={T('dashx_recent_activity')} />
          <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
            {recentSessions.length === 0 ? (
              <EmptyState emoji="📚" title={T('dash_no_history_title')} sub={T('dashx_no_activity')} />
            ) : (
              <div className="px-5 py-4 space-y-4">
                {(['today', 'yesterday', 'earlier'] as const).map((bucket) =>
                  buckets[bucket].length === 0 ? null : (
                    <div key={bucket}>
                      <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>
                        {bucketLabels[bucket]}
                      </p>
                      <ul className="space-y-1.5">
                        {buckets[bucket].map((s) => {
                          const m = subjectMeta(s.subject.slug, lang)
                          return (
                            <li key={s.id} className="flex items-center gap-3 py-1.5">
                              <span className="text-sm shrink-0">{m.icon}</span>
                              <span className="text-sm font-medium truncate flex-1" style={{ color: 'var(--text-primary)' }}>
                                {s.title ?? s.subject.name}
                              </span>
                              <span className="text-xs shrink-0 font-mono" style={{ color: 'var(--text-secondary)' }}>
                                {new Date(s.startedAt).toLocaleTimeString(lang === 'ru' ? 'ru-RU' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </section>

        {/* ═══ SECTION 7 — ADVANCED ANALYTICS (collapsed by default) ═══ */}
        <section>
          <details className="group rounded-2xl overflow-hidden"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
            <summary className="flex items-center gap-3 px-5 py-4 cursor-pointer select-none list-none">
              <span className="text-base">📊</span>
              <span className="font-bold text-sm flex-1" style={{ color: 'var(--text-primary)' }}>
                {T('dashx_advanced_analytics')}
              </span>
              <ChevronDown size={15} className="transition-transform group-open:rotate-180" style={{ color: 'var(--text-secondary)' }} />
            </summary>
            <div className="px-5 pb-5 space-y-4" style={{ borderTop: '1px solid var(--border-default)' }}>
              <div className="pt-4 space-y-4">
                <CareerSummaryPanel variant="dashboard" />
                <MasterySummaryPanel variant="dashboard" />
              </div>
            </div>
          </details>
        </section>

        {/* ═══ Explore — compact link chips ═══ */}
        <section>
          <SectionHeading icon={Sparkles} title={T('dashx_explore')} />
          <div className="flex flex-wrap gap-2">
            {([
              { label: `👨‍🏫 ${T('dash_mode_tutor')}`,   href: '/learn' },
              { label: `🎯 ${T('dash_mode_coach')}`,      href: '/coach' },
              { label: `🎮 ${T('dash_mode_quiz')}`,       href: '/quiz' },
              { label: `🃏 ${T('dash_flashcards')}`,      href: '/flashcards' },
              { label: `📚 ${T('library_title')}`,        href: '/library' },
              { label: `🏆 ${T('dash_leaderboard')}`,     href: '/leaderboard' },
              { label: `📊 ${T('dash_progress_link')}`,   href: '/progress' },
            ] as { label: string; href: string }[]).map(({ label, href }) => (
              <Link key={href} href={href}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', color: 'var(--text-primary)', textDecoration: 'none' }}>
                {label}
              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}

/* ── Sub-components ─────────────────────────────────────────────────────── */

function HeroChip({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
      style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-primary)' }}>
      <span>{icon}</span> {label}
    </span>
  )
}

function StatCard({ icon: Icon, label, value, color }: { icon: LucideIcon; label: string; value: string; color: string }) {
  return (
    <div className="rounded-2xl p-4 flex flex-col justify-between min-h-[108px] transition-all duration-200 hover:-translate-y-0.5"
      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'var(--bg-elevated)' }}>
          <Icon size={14} style={{ color }} />
        </div>
        <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{label}</span>
      </div>
      <p className="text-2xl font-black mt-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>{value}</p>
    </div>
  )
}

function SectionHeading({ icon: Icon, title, right }: { icon: LucideIcon; title: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-3 px-0.5">
      <div className="flex items-center gap-2">
        <Icon size={14} style={{ color: 'var(--coral)' }} />
        <h2 className="font-bold text-sm uppercase tracking-wide" style={{ color: 'var(--text-primary)' }}>{title}</h2>
      </div>
      {right}
    </div>
  )
}

function RoadmapFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl p-3" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}>
      <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>{label}</p>
      <p className="text-sm font-bold truncate" style={{ color: 'var(--text-primary)' }} title={value}>{value}</p>
    </div>
  )
}

function AchievementChip({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl"
      style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)' }}>
      <span className="text-lg">{icon}</span>
      <div>
        <div className="text-base font-black leading-none" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{value}</div>
        <div className="text-[10px] mt-1" style={{ color: 'var(--text-secondary)' }}>{label}</div>
      </div>
    </div>
  )
}

function EmptyState({ emoji, title, sub, cta }: { emoji: string; title: string; sub: string; cta?: { href: string; label: string } }) {
  return (
    <div className="py-12 text-center px-6 rounded-2xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
      <div className="text-4xl mb-3">{emoji}</div>
      <p className="font-bold text-sm mb-1.5" style={{ color: 'var(--text-primary)' }}>{title}</p>
      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{sub}</p>
      {cta && (
        <Link href={cta.href} className="inline-block mt-4 px-5 py-2.5 rounded-xl text-xs font-bold text-white"
          style={{ background: 'var(--coral)', textDecoration: 'none' }}>
          {cta.label}
        </Link>
      )}
    </div>
  )
}
