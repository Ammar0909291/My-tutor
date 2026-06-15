import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Award } from 'lucide-react'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { t as i18nT, type Lang } from '@/lib/i18n'
import { CandyPage, Card } from '@/components/ui/candy'

/**
 * /certificates — the learner's own certificate list (linked from MobileNav).
 * Each entry links to the public verification page at /certificates/[code].
 */
export default async function CertificatesPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/auth/login?callbackUrl=/certificates')

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    select: { teachingLanguage: true },
  })
  if (!profile) redirect('/onboarding')

  const lang = (profile.teachingLanguage ?? 'en') as Lang
  const T = (key: Parameters<typeof i18nT>[1]) => i18nT(lang, key)

  const [certificates, subjectCertificates] = await withRetry(() => Promise.all([
    prisma.certificate.findMany({
      where: { userId: session.user.id },
      orderBy: { issuedAt: 'desc' },
    }),
    prisma.subjectCertificate.findMany({
      where: { userId: session.user.id },
      orderBy: { issuedAt: 'desc' },
    }),
  ]))

  const dateLocale = lang === 'ru' ? 'ru-RU' : lang === 'hi' ? 'hi-IN' : 'en-US'
  const hasAnyCertificates = certificates.length > 0 || subjectCertificates.length > 0

  return (
    <CandyPage>
      <div className="max-w-3xl mx-auto px-5 py-8">
        <Link href="/dashboard" className="text-xs font-extrabold" style={{ color: 'var(--candy-ink-soft)', textDecoration: 'none' }}>
          {T('certificates_back')}
        </Link>

        <div className="mt-4 mb-8">
          <h1 className="text-2xl md:text-3xl" style={{ fontFamily: 'var(--font-baloo2)', fontWeight: 800, color: 'var(--candy-ink)' }}>
            {T('certificates_title')}
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--candy-ink-soft)', fontWeight: 600 }}>{T('certificates_subtitle')}</p>
        </div>

        {!hasAnyCertificates ? (
          <Card className="text-center" style={{ padding: '56px 24px' }}>
            <div className="flex items-center justify-center mx-auto mb-4 rounded-full" style={{ width: 56, height: 56, background: 'rgba(139,92,246,0.14)' }}>
              <Award size={26} color="var(--candy-purple)" />
            </div>
            <h2 className="text-base" style={{ color: 'var(--candy-ink)', fontFamily: 'var(--font-baloo2)', fontWeight: 800 }}>{T('certificates_empty_title')}</h2>
            <p className="text-sm mt-2 max-w-sm mx-auto" style={{ color: 'var(--candy-ink-soft)', fontWeight: 600 }}>{T('certificates_empty_body')}</p>
            <Link href="/library" className="inline-block mt-5 px-5 py-2.5 text-sm" style={{ background: 'var(--candy-purple)', color: '#fff', fontWeight: 800, borderRadius: 14, textDecoration: 'none', boxShadow: '0 4px 0 var(--candy-purple-d)' }}>
              {T('certificates_browse_roadmaps')}
            </Link>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {certificates.map((cert) => (
              <Link
                key={cert.id}
                href={`/certificates/${cert.certificateCode}`}
                className="transition-all duration-150 hover:-translate-y-0.5"
                style={{ textDecoration: 'none' }}
              >
                <Card className="flex items-center gap-4" style={{ padding: '20px' }}>
                  <div className="flex items-center justify-center rounded-2xl shrink-0" style={{ width: 44, height: 44, background: 'rgba(139,92,246,0.14)' }}>
                    <Award size={20} color="var(--candy-purple)" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate" style={{ color: 'var(--candy-ink)', fontFamily: 'var(--font-baloo2)', fontWeight: 800 }}>
                      {cert.roadmapTitle}
                    </div>
                    <div className="text-xs mt-1" style={{ color: 'var(--candy-ink-soft)', fontWeight: 600 }}>
                      {T('certificates_issued_on')} {cert.issuedAt.toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' })}
                      {' · '}
                      {T('certificates_verification_code')}: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--candy-ink)' }}>{cert.certificateCode}</span>
                    </div>
                  </div>
                  <div className="text-xs shrink-0" style={{ color: 'var(--candy-blue)', fontWeight: 800 }}>{T('certificates_view')} →</div>
                </Card>
              </Link>
            ))}
            {subjectCertificates.map((cert) => (
              <Link
                key={cert.id}
                href={`/certificates/${cert.certificateCode}`}
                className="transition-all duration-150 hover:-translate-y-0.5"
                style={{ textDecoration: 'none' }}
              >
                <Card className="flex items-center gap-4" style={{ padding: '20px' }}>
                  <div className="flex items-center justify-center rounded-2xl shrink-0" style={{ width: 44, height: 44, background: 'rgba(88,204,2,0.14)' }}>
                    <Award size={20} color="var(--candy-green)" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate" style={{ color: 'var(--candy-ink)', fontFamily: 'var(--font-baloo2)', fontWeight: 800 }}>
                      {cert.subjectName} — {T('certificates_subject_completion')}
                    </div>
                    <div className="text-xs mt-1" style={{ color: 'var(--candy-ink-soft)', fontWeight: 600 }}>
                      {T('certificates_issued_on')} {cert.issuedAt.toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' })}
                      {' · '}
                      {T('certificates_verification_code')}: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--candy-ink)' }}>{cert.certificateCode}</span>
                    </div>
                  </div>
                  <div className="text-xs shrink-0" style={{ color: 'var(--candy-blue)', fontWeight: 800 }}>{T('certificates_view')} →</div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </CandyPage>
  )
}
