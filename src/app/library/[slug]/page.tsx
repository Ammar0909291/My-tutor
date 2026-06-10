import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { t as i18nT } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'
import { findLibrarySubject, levelLabel, localizedSubjectName, localizedSubjectDescription, type SubjectCategory } from '@/lib/curriculum/subjectCatalog'
import SubjectModuleTree from './SubjectModuleTree'

const CATEGORY_ACCENT: Record<SubjectCategory, string> = {
  languages: '#E3B341',
  programming: '#56D364',
  mathematics: '#A78BFA',
  physics: '#79C0FF',
  chemistry: '#F78166',
  biology: '#2EA043',
  ai: '#7C3AED',
}

export default async function SubjectDashboardPage({ params }: { params: { slug: string } }) {
  const session = await auth()
  if (!session?.user?.id) redirect(`/auth/login?callbackUrl=/library/${params.slug}`)

  const librarySubject = findLibrarySubject(params.slug)
  if (!librarySubject) notFound()

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    include: { subjects: { include: { subject: true } } },
  })
  if (!profile) redirect('/onboarding')

  const lang = (profile.teachingLanguage ?? 'en') as Lang
  const T = (key: Parameters<typeof i18nT>[1]) => i18nT(lang, key)
  const subjectName = localizedSubjectName(librarySubject, lang)

  const enrollment = profile.subjects.find((ps) => ps.subject.slug === params.slug)
  const accent = CATEGORY_ACCENT[librarySubject.category]

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-3xl mx-auto px-5 py-8">
        <Link href="/library" className="text-xs font-semibold" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>{T('library_back')}</Link>

        <div className="flex items-center gap-3 mt-3 mb-2">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: `${accent}15`, color: accent }}>
            {librarySubject.icon}
          </div>
          <div>
            <h1 className="text-2xl font-black" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>{subjectName}</h1>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{localizedSubjectDescription(librarySubject, lang)}</p>
          </div>
        </div>

        {!enrollment ? (
          <div className="mt-8 p-6 rounded-2xl text-center" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
            <p className="text-sm mb-1" style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{T('library_not_enrolled_title').replace('{name}', subjectName)}</p>
            <p className="text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>{T('library_enroll_unlock')}</p>
            <Link href="/library" className="text-xs font-bold px-4 py-2 rounded-lg inline-block" style={{ background: `${accent}1a`, color: accent, border: `1px solid ${accent}33`, textDecoration: 'none' }}>
              {T('library_go_to_library')}
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6 mt-2">
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-full" style={{ background: `${accent}1a`, color: accent }}>
                {levelLabel(enrollment.currentLevelIndex, lang)}
              </span>
              <Link href={`/learn?subject=${params.slug}`} className="text-xs font-bold px-3 py-1.5 rounded-lg" style={{ background: accent, color: '#fff', textDecoration: 'none' }}>
                {T('library_continue_learning')}
              </Link>
            </div>
            <SubjectModuleTree subjectSlug={params.slug} accent={accent} lang={lang} />
          </>
        )}
      </div>
    </div>
  )
}
