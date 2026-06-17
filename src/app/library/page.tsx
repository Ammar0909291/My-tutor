import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { t as i18nT } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'
import { CATEGORY_LABELS, VISIBLE_SUBJECT_LIBRARY, levelLabel, categoryLabel, localizedSubjectName, localizedSubjectDescription, type SubjectCategory } from '@/lib/curriculum/subjectCatalog'
import { EnrollButton } from '@/components/library/EnrollButton'
import { RemoveSubjectButton } from '@/components/library/RemoveSubjectButton'
import { CandyPage, Card, SectionTitle, ProgressBar } from '@/components/ui/candy'

// Candy-palette accents per category (hex so the `${accent}xx` alpha trick keeps working).
const CATEGORY_ACCENT: Record<SubjectCategory, string> = {
  languages: '#FFC800',
  programming: '#58CC02',
  mathematics: '#8B5CF6',
  physics: '#3B9EFF',
  chemistry: '#FF9600',
  biology: '#FF5FA2',
  ai: '#7C3AED',
}

export default async function LibraryPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login?callbackUrl=/library')

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    include: { subjects: { include: { subject: true } } },
  })
  if (!profile) redirect('/onboarding')

  const lang = (profile.teachingLanguage ?? 'en') as Lang
  const T = (key: Parameters<typeof i18nT>[1]) => i18nT(lang, key)

  // Only active enrollments count as "enrolled" — a removed subject should
  // show as available to add again, not stuck as enrolled.
  const activeSubjects = profile.subjects.filter((ps) => ps.isActive)
  const enrolled = new Map(activeSubjects.map((ps) => [ps.subject.slug, ps]))

  const enrolledSlugs = activeSubjects.map((ps) => ps.subject.slug)
  const studentProgressList = enrolledSlugs.length > 0
    ? await prisma.studentProgress.findMany({
        where: { userId: session.user.id, subjectCode: { in: enrolledSlugs } },
        select: { subjectCode: true, lastLessonTitle: true, lastUnitTitle: true, lastStudiedAt: true, completedLessons: true },
      })
    : []
  const spMap = new Map(studentProgressList.map((sp) => [sp.subjectCode, sp]))

  function timeAgo(date: Date): string {
    const diff = Date.now() - new Date(date).getTime()
    const mins = Math.floor(diff / 60000)
    const hrs = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    if (lang === 'ru') {
      if (mins < 2) return 'только что'
      if (mins < 60) return `${mins} мин. назад`
      if (hrs < 24) return `${hrs} ч. назад`
      return `${days} дн. назад`
    }
    if (lang === 'hi') {
      if (mins < 2) return 'अभी'
      if (mins < 60) return `${mins} मिनट पहले`
      if (hrs < 24) return `${hrs} घंटे पहले`
      return `${days} दिन पहले`
    }
    if (mins < 2) return 'just now'
    if (mins < 60) return `${mins}m ago`
    if (hrs < 24) return `${hrs}h ago`
    return `${days}d ago`
  }

  return (
    <CandyPage>
      <div className="max-w-5xl mx-auto px-5 py-8">
        <div className="flex items-center justify-between mb-2">
          <Link href="/dashboard" className="text-xs font-extrabold" style={{ color: 'var(--candy-ink-soft)', textDecoration: 'none' }}>← {T('coach_back')}</Link>
        </div>
        <h1 className="text-2xl mb-1" style={{ fontFamily: 'var(--font-baloo2)', fontWeight: 800, color: 'var(--candy-ink)' }}>
          {T('library_title')}
        </h1>
        <p className="text-sm mb-8" style={{ color: 'var(--candy-ink-soft)', fontWeight: 600 }}>{T('library_subtitle')}</p>

        <div className="space-y-8">
          {(Object.keys(CATEGORY_LABELS) as SubjectCategory[]).map((category) => {
            const subjects = VISIBLE_SUBJECT_LIBRARY.filter((s) => s.category === category)
            const accent = CATEGORY_ACCENT[category]
            return (
              <section key={category}>
                <SectionTitle style={{ color: accent, textTransform: 'uppercase', fontSize: 15, marginBottom: 12 }}>
                  {categoryLabel(category, lang)}
                </SectionTitle>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {subjects.map((s) => {
                    const ps = enrolled.get(s.slug)
                    return (
                      <Card key={s.slug} className="p-4 flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                            style={{ background: `${accent}1f`, color: accent }}>
                            {s.icon}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm truncate" style={{ color: 'var(--candy-ink)', fontWeight: 800 }}>{localizedSubjectName(s, lang)}</p>
                            <p className="text-[11px] truncate" style={{ color: 'var(--candy-ink-soft)', fontWeight: 600 }}>{s.modules.length} modules · L0–L5</p>
                          </div>
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--candy-ink-soft)', fontWeight: 600 }}>{localizedSubjectDescription(s, lang)}</p>
                        <div className="mt-auto flex flex-col gap-2">
                          {ps ? (
                            <>
                              {/* Progress row */}
                              <div className="flex items-center gap-2">
                                <span className="text-[11px]" style={{ color: accent, fontWeight: 800 }}>
                                  {levelLabel(ps.currentLevelIndex, lang)} · {ps.progressPercent}%
                                </span>
                                {spMap.get(s.slug)?.lastStudiedAt && (
                                  <span className="text-[10px]" style={{ color: 'var(--candy-ink-soft)' }}>
                                    · {timeAgo(spMap.get(s.slug)!.lastStudiedAt!)}
                                  </span>
                                )}
                              </div>
                              {/* Current lesson info */}
                              {(spMap.get(s.slug)?.lastUnitTitle || spMap.get(s.slug)?.lastLessonTitle) && (
                                <p className="text-[11px] truncate" style={{ color: 'var(--candy-ink-soft)' }}>
                                  {spMap.get(s.slug)?.lastUnitTitle && <span>{spMap.get(s.slug)!.lastUnitTitle} · </span>}
                                  {spMap.get(s.slug)?.lastLessonTitle}
                                </p>
                              )}
                              {/* Progress bar */}
                              <ProgressBar
                                percent={Math.min(100, Math.max(0, ps.progressPercent ?? 0))}
                                height={8}
                                borderRadius={6}
                                fillColor={accent}
                                animated={false}
                              />
                              {/* Actions */}
                              <div className="flex items-center gap-2">
                                <Link href={`/learn?subject=${s.slug}`} className="flex-1 text-center text-xs px-3 py-2 rounded-xl"
                                  style={{ background: accent, color: '#fff', fontWeight: 800, textDecoration: 'none', boxShadow: '0 3px 0 var(--candy-shadow)' }}>
                                  {T('library_continue_learning')}
                                </Link>
                                <Link href={`/library/${s.slug}`} className="text-xs px-3 py-2 rounded-xl"
                                  style={{ background: 'var(--candy-bg)', color: 'var(--candy-ink-soft)', fontWeight: 700, textDecoration: 'none' }}>
                                  Details
                                </Link>
                                <RemoveSubjectButton subjectSlug={s.slug} subjectName={localizedSubjectName(s, lang)} />
                              </div>
                            </>
                          ) : (
                            <div className="flex items-center justify-between">
                              <span className="text-[11px]" style={{ color: 'var(--candy-ink-soft)', fontWeight: 600 }}>{T('library_not_enrolled')}</span>
                              <EnrollButton subjectSlug={s.slug} label={`+ ${T('library_add_subject')}`} accent={accent} />
                            </div>
                          )}
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </CandyPage>
  )
}
