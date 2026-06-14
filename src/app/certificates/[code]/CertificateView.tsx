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
      <div className="flex flex-col items-center gap-4 rounded-2xl border p-8 text-center">
        <p className="text-muted-foreground">Certificate not found.</p>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border p-8 text-center">
      <h1 className="text-2xl font-bold">Certificate of Completion</h1>
      <p className="text-lg">{certificate.roadmapTitle ?? certificate.subjectName}</p>
      <p className="text-muted-foreground">Awarded to {certificate.recipientName ?? certificate.profileName}</p>
      {certificate.outcome && <p className="text-sm">{certificate.outcome}</p>}
      <p className="font-mono text-sm text-muted-foreground">{certificate.code}</p>
    </div>
  )
}
