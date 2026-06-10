import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { t as i18nT } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'
import { CATEGORY_LABELS, VISIBLE_SUBJECT_LIBRARY, levelLabel, categoryLabel, localizedSubjectName, localizedSubjectDescription, type SubjectCategory } from '@/lib/curriculum/subjectCatalog'
import { EnrollButton } from '@/components/library/EnrollButton'

const CATEGORY_ACCENT: Record<SubjectCategory, string> = {
  languages: '#E3B341',
  programming: '#56D364',
  mathematics: '#A78BFA',
  physics: '#79C0FF',
  chemistry: '#F78166',
  biology: '#2EA043',
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

  const enrolled = new Map(profile.subjects.map((ps) => [ps.subject.slug, ps]))

  const enrolledSlugs = profile.subjects.map((ps) => ps.subject.slug)
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
    if (mins < 2) return 'just now'
    if (mins < 60) return `${mins}m ago`
    if (hrs < 24) return `${hrs}h ago`
    return `${days}d ago`
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-5xl mx-auto px-5 py-8">
        <div className="flex items-center justify-between mb-2">
          <Link href="/dashboard" className="text-xs font-semibold" style={{ color: 'var(--text-dim)' }}>← {T('coach_back')}</Link>
        </div>
        <h1 className="text-2xl font-black mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
          {T('library_title')}
        </h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>{T('library_subtitle')}</p>

        <div className="space-y-8">
          {(Object.keys(CATEGORY_LABELS) as SubjectCategory[]).map((category) => {
            const subjects = VISIBLE_SUBJECT_LIBRARY.filter((s) => s.category === category)
            const accent = CATEGORY_ACCENT[category]
            return (
              <section key={category}>
                <h2 className="text-sm font-black uppercase tracking-wide mb-3" style={{ color: accent, fontFamily: 'var(--font-heading)' }}>
                  {categoryLabel(category, lang)}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {subjects.map((s) => {
                    const ps = enrolled.get(s.slug)
                    return (
                      <div key={s.slug} className="rounded-2xl p-4 flex flex-col gap-3"
                        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                            style={{ background: `${accent}15`, color: accent }}>
                            {s.icon}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-sm truncate" style={{ color: 'var(--text-primary)' }}>{localizedSubjectName(s, lang)}</p>
                            <p className="text-[11px] truncate" style={{ color: 'var(--text-dim)' }}>{s.modules.length} modules · L0–L5</p>
                          </div>
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{localizedSubjectDescription(s, lang)}</p>
                        <div className="mt-auto flex flex-col gap-2">
                          {ps ? (
                            <>
                              {/* Progress row */}
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-mono" style={{ color: accent }}>
                                  {levelLabel(ps.currentLevelIndex, lang)} · {ps.progressPercent}%
                                </span>
                                {spMap.get(s.slug)?.lastStudiedAt && (
                                  <span className="text-[10px]" style={{ color: 'var(--text-dim)' }}>
                                    · {timeAgo(spMap.get(s.slug)!.lastStudiedAt!)}
                                  </span>
                                )}
                              </div>
                              {/* Current lesson info */}
                              {(spMap.get(s.slug)?.lastUnitTitle || spMap.get(s.slug)?.lastLessonTitle) && (
                                <p className="text-[11px] truncate" style={{ color: 'var(--text-dim)' }}>
                                  {spMap.get(s.slug)?.lastUnitTitle && <span>{spMap.get(s.slug)!.lastUnitTitle} · </span>}
                                  {spMap.get(s.slug)?.lastLessonTitle}
                                </p>
                              )}
                              {/* Progress bar */}
                              <div className="h-1 w-full rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                                <div className="h-full rounded-full" style={{ width: `${Math.min(100, Math.max(0, ps.progressPercent ?? 0))}%`, background: accent }} />
                              </div>
                              {/* Actions */}
                              <div className="flex items-center gap-2">
                                <Link href={`/learn?subject=${s.slug}`} className="flex-1 text-center text-xs font-bold px-3 py-1.5 rounded-lg"
                                  style={{ background: `${accent}1a`, color: accent, border: `1px solid ${accent}33`, textDecoration: 'none' }}>
                                  {T('library_continue_learning')}
                                </Link>
                                <Link href={`/library/${s.slug}`} className="text-xs px-3 py-1.5 rounded-lg"
                                  style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border-default)', textDecoration: 'none' }}>
                                  Details
                                </Link>
                              </div>
                            </>
                          ) : (
                            <div className="flex items-center justify-between">
                              <span className="text-[11px]" style={{ color: 'var(--text-dim)' }}>{T('library_not_enrolled')}</span>
                              <EnrollButton subjectSlug={s.slug} label={`+ ${T('library_add_subject')}`} accent={accent} />
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
