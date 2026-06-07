'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function EnrollButton({ subjectSlug, label, accent }: { subjectSlug: string; label: string; accent: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function enroll() {
    setLoading(true)
    try {
      const res = await fetch('/api/subjects/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subjectSlug }),
      })
      const data = await res.json()
      if (data.success) router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={enroll} disabled={loading}
      className="text-xs font-bold px-3 py-1.5 rounded-lg transition-opacity disabled:opacity-50"
      style={{ background: `${accent}1a`, color: accent, border: `1px solid ${accent}33` }}>
      {loading ? '…' : label}
    </button>
  )
}
