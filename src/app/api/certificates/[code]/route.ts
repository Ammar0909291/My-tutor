import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'

/**
 * GET /api/certificates/:code — public certificate verification (Sprint D,
 * Part 4: "Verification URL"). Deliberately unauthenticated — anyone with the
 * certificate code (e.g. an employer) can confirm it's genuine. Returns only
 * non-sensitive, certificate-display fields.
 */
export async function GET(_req: Request, { params }: { params: { code: string } }) {
  try {
    const certificate = await withRetry(() => prisma.certificate.findUnique({
      where: { certificateCode: params.code },
      include: { roadmap: { select: { title: true, outcome: true, description: true } } },
    }))

    if (certificate) {
      return NextResponse.json({
        valid: true,
        certificate: {
          code: certificate.certificateCode,
          recipientName: certificate.recipientName,
          roadmapTitle: certificate.roadmapTitle,
          outcome: certificate.roadmap.outcome,
          issuedAt: certificate.issuedAt,
        },
      })
    }

    // Sprint N — subject-completion certificates (separate from roadmap certs)
    const subjectCertificate = await withRetry(() => prisma.subjectCertificate.findUnique({
      where: { certificateCode: params.code },
    }))

    if (subjectCertificate) {
      return NextResponse.json({
        valid: true,
        certificate: {
          code: subjectCertificate.certificateCode,
          recipientName: subjectCertificate.recipientName,
          roadmapTitle: `${subjectCertificate.subjectName} — Subject Completion`,
          outcome: `Final assessment score: ${subjectCertificate.score}% · ${subjectCertificate.totalLessons} lessons completed`,
          issuedAt: subjectCertificate.issuedAt,
        },
      })
    }

    return NextResponse.json({ valid: false, error: 'No certificate found with this ID.' }, { status: 404 })
  } catch (err) {
    console.error('[GET /api/certificates/:code]', err)
    return NextResponse.json({ valid: false, error: 'Internal server error' }, { status: 500 })
  }
}
