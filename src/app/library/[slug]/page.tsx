import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { t as i18nT } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'
import { findLibrarySubject, levelLabel, localizedSubjectName, localizedSubjectDescription, type SubjectCategory } from '@/lib/curriculum/subjectCatalog'
import { CandyPage, Card, Pill } from '@/components/ui/candy'
import SubjectModuleTree from './SubjectModuleTree'

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
    <CandyPage>
      <div className="max-w-3xl mx-auto px-5 py-8">
        <Link href="/library" className="text-xs font-extrabold" style={{ color: 'var(--candy-ink-soft)', textDecoration: 'none' }}>{T('library_back')}</Link>

        <div className="flex items-center gap-3 mt-3 mb-2">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0" style={{ background: `${accent}1f`, color: accent }}>
            {librarySubject.icon}
          </div>
          <div>
            <h1 className="text-2xl" style={{ fontFamily: 'var(--font-baloo2)', fontWeight: 800, color: 'var(--candy-ink)' }}>{subjectName}</h1>
            <p className="text-xs" style={{ color: 'var(--candy-ink-soft)', fontWeight: 600 }}>{localizedSubjectDescription(librarySubject, lang)}</p>
          </div>
        </div>

        {!enrollment ? (
          <Card className="mt-8 p-6 text-center">
            <p className="text-sm mb-1" style={{ color: 'var(--candy-ink)', fontWeight: 800 }}>{T('library_not_enrolled_title').replace('{name}', subjectName)}</p>
            <p className="text-xs mb-4" style={{ color: 'var(--candy-ink-soft)', fontWeight: 600 }}>{T('library_enroll_unlock')}</p>
            <Link href="/library" className="text-xs px-4 py-2 rounded-xl inline-block" style={{ background: accent, color: '#fff', fontWeight: 800, textDecoration: 'none', boxShadow: '0 3px 0 var(--candy-shadow)' }}>
              {T('library_go_to_library')}
            </Link>
          </Card>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-6 mt-2">
              <Pill color={`${accent}26`} style={{ color: accent, fontSize: 11, padding: '4px 12px' }}>
                {levelLabel(enrollment.currentLevelIndex, lang)}
              </Pill>
              <Link href={`/learn?subject=${params.slug}`} className="text-xs px-3 py-2 rounded-xl" style={{ background: accent, color: '#fff', fontWeight: 800, textDecoration: 'none', boxShadow: '0 3px 0 var(--candy-shadow)' }}>
                {T('library_continue_learning')}
              </Link>
            </div>
            <SubjectModuleTree subjectSlug={params.slug} accent={accent} lang={lang} />
          </>
        )}
      </div>
    </CandyPage>
  )
}
