import { Card, EagleMascot } from '@/components/ui/candy'

interface Props {
  certificate: {
    code: string
    recipientName?: string
    roadmapTitle?: string
    outcome?: string
    issuedAt?: string | Date
    subjectName?: string
    profileName?: string
  } | null
}

export default function CertificateView({ certificate }: Props) {
  if (!certificate) {
    return (
      <Card className="flex flex-col items-center gap-4 text-center" style={{ padding: 32 }}>
        <p style={{ color: 'var(--candy-ink-soft)', fontWeight: 600 }}>Certificate not found.</p>
      </Card>
    )
  }
  return (
    <Card className="flex flex-col items-center gap-4 text-center" style={{ padding: 40 }}>
      <EagleMascot variant="hero" />
      <h1 style={{ fontFamily: 'var(--font-baloo2)', fontWeight: 800, fontSize: 28, color: 'var(--candy-ink)' }}>Certificate of Completion</h1>
      <p style={{ fontSize: 18, fontWeight: 800, color: 'var(--candy-purple)' }}>{certificate.roadmapTitle ?? certificate.subjectName}</p>
      <p style={{ color: 'var(--candy-ink-soft)', fontWeight: 600 }}>Awarded to {certificate.recipientName ?? certificate.profileName}</p>
      {certificate.outcome && <p style={{ fontSize: 14, color: 'var(--candy-ink)', fontWeight: 600 }}>{certificate.outcome}</p>}
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--candy-ink-soft)' }}>{certificate.code}</p>
    </Card>
  )
}
