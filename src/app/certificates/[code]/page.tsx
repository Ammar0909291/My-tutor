import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { CandyPage } from '@/components/ui/candy'
import CertificateView from './CertificateView'

/**
 * Public certificate verification page (Sprint D, Part 4 — "Verification URL").
 * Deliberately unauthenticated: this is the page an employer or school visits
 * after scanning/clicking a certificate's verification link to confirm it's
 * genuine. Server-rendered so the verification result is always fresh.
 */
export default async function CertificatePage({ params }: { params: { code: string } }) {
  const certificate = await withRetry(() => prisma.certificate.findUnique({
    where: { certificateCode: params.code },
    include: { roadmap: { select: { title: true, outcome: true, description: true } } },
  }))

  let certificateData = certificate ? {
    code: certificate.certificateCode,
    recipientName: certificate.recipientName,
    roadmapTitle: certificate.roadmapTitle,
    outcome: certificate.roadmap.outcome,
    issuedAt: certificate.issuedAt.toISOString(),
  } : null

  // Sprint N — subject-completion certificates (separate from roadmap certs)
  if (!certificateData) {
    const subjectCertificate = await withRetry(() => prisma.subjectCertificate.findUnique({
      where: { certificateCode: params.code },
    }))
    if (subjectCertificate) {
      certificateData = {
        code: subjectCertificate.certificateCode,
        recipientName: subjectCertificate.recipientName,
        roadmapTitle: `${subjectCertificate.subjectName} — Subject Completion`,
        outcome: `Final assessment score: ${subjectCertificate.score}% · ${subjectCertificate.totalLessons} lessons completed`,
        issuedAt: subjectCertificate.issuedAt.toISOString(),
      }
    }
  }

  return (
    <CandyPage style={{ padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <CertificateView certificate={certificateData} />
      </div>
    </CandyPage>
  )
}
