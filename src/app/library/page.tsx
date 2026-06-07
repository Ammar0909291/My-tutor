import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { t as i18nT } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'
import { CATEGORY_LABELS, SUBJECT_LIBRARY, levelLabel, type SubjectCategory } from '@/lib/curriculum/library'
import { EnrollButton } from '@/components/library/EnrollButton'

const CATEGORY_ACCENT: Record<SubjectCategory, string> = {
  languages: '#E3B341',
  programming: '#56D364',
  mathematics: '#A78BFA',
  physics: '#79C0FF',
  chemistry: '#F78166',
  biology: '#2EA043',
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
          {(Object.entries(CATEGORY_LABELS) as [SubjectCategory, string][]).map(([category, label]) => {
            const subjects = SUBJECT_LIBRARY.filter((s) => s.category === category)
            const accent = CATEGORY_ACCENT[category]
            return (
              <section key={category}>
                <h2 className="text-sm font-black uppercase tracking-wide mb-3" style={{ color: accent, fontFamily: 'var(--font-heading)' }}>
                  {label}
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
                            <p className="font-bold text-sm truncate" style={{ color: 'var(--text-primary)' }}>{s.name}</p>
                            <p className="text-[11px] truncate" style={{ color: 'var(--text-dim)' }}>{s.modules.length} modules · L0–L5</p>
                          </div>
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{s.description}</p>
                        <div className="mt-auto flex items-center justify-between">
                          {ps ? (
                            <>
                              <span className="text-[11px] font-mono" style={{ color: accent }}>
                                {levelLabel(ps.currentLevelIndex)} · {ps.progressPercent}%
                              </span>
                              <Link href="/learn" className="text-xs font-bold px-3 py-1.5 rounded-lg"
                                style={{ background: `${accent}1a`, color: accent, border: `1px solid ${accent}33`, textDecoration: 'none' }}>
                                {T('dash_continue')}
                              </Link>
                            </>
                          ) : (
                            <>
                              <span className="text-[11px]" style={{ color: 'var(--text-dim)' }}>{T('library_not_enrolled')}</span>
                              <EnrollButton subjectSlug={s.slug} label={`+ ${T('library_add_subject')}`} accent={accent} />
                            </>
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
