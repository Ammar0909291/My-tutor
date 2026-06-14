import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Award } from 'lucide-react'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { t as i18nT, type Lang } from '@/lib/i18n'

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
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-3xl mx-auto px-5 py-8">
        <Link href="/dashboard" className="text-xs font-semibold" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>
          {T('certificates_back')}
        </Link>

        <div className="mt-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-black" style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)' }}>
            {T('certificates_title')}
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{T('certificates_subtitle')}</p>
        </div>

        {!hasAnyCertificates ? (
          <div className="rounded-2xl text-center" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', padding: '56px 24px' }}>
            <div className="flex items-center justify-center mx-auto mb-4 rounded-full" style={{ width: 56, height: 56, background: 'rgba(167,139,250,0.12)' }}>
              <Award size={26} color="#A78BFA" />
            </div>
            <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{T('certificates_empty_title')}</h2>
            <p className="text-sm mt-2 max-w-sm mx-auto" style={{ color: 'var(--text-dim)' }}>{T('certificates_empty_body')}</p>
            <Link href="/library" className="btn-primary inline-block mt-5 px-5 py-2.5 text-sm font-bold" style={{ textDecoration: 'none' }}>
              {T('certificates_browse_roadmaps')}
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {certificates.map((cert) => (
              <Link
                key={cert.id}
                href={`/certificates/${cert.certificateCode}`}
                className="rounded-2xl flex items-center gap-4 transition-all duration-150 hover:-translate-y-0.5"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', padding: '20px', textDecoration: 'none' }}
              >
                <div className="flex items-center justify-center rounded-xl shrink-0" style={{ width: 44, height: 44, background: 'rgba(167,139,250,0.12)' }}>
                  <Award size={20} color="#A78BFA" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm truncate" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                    {cert.roadmapTitle}
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'var(--text-dim)' }}>
                    {T('certificates_issued_on')} {cert.issuedAt.toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' })}
                    {' · '}
                    {T('certificates_verification_code')}: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{cert.certificateCode}</span>
                  </div>
                </div>
                <div className="text-xs font-semibold shrink-0" style={{ color: '#79C0FF' }}>{T('certificates_view')} →</div>
              </Link>
            ))}
            {subjectCertificates.map((cert) => (
              <Link
                key={cert.id}
                href={`/certificates/${cert.certificateCode}`}
                className="rounded-2xl flex items-center gap-4 transition-all duration-150 hover:-translate-y-0.5"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', padding: '20px', textDecoration: 'none' }}
              >
                <div className="flex items-center justify-center rounded-xl shrink-0" style={{ width: 44, height: 44, background: 'rgba(86,211,100,0.12)' }}>
                  <Award size={20} color="#56D364" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm truncate" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                    {cert.subjectName} — {T('certificates_subject_completion')}
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'var(--text-dim)' }}>
                    {T('certificates_issued_on')} {cert.issuedAt.toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' })}
                    {' · '}
                    {T('certificates_verification_code')}: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>{cert.certificateCode}</span>
                  </div>
                </div>
                <div className="text-xs font-semibold shrink-0" style={{ color: '#79C0FF' }}>{T('certificates_view')} →</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
