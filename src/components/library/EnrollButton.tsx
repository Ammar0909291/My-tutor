'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  subjectId?: string
  subjectSlug?: string
  label?: string
  accent?: string
  enrolled?: boolean
}

export function EnrollButton({ subjectSlug, label, accent, enrolled }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (enrolled) {
    return (
      <span
        className="rounded-lg px-4 py-2 text-sm font-medium"
        style={{ background: accent ? `${accent}22` : undefined, color: accent ?? 'var(--text-secondary)' }}
      >
        Enrolled
      </span>
    )
  }

  async function handleEnroll() {
    if (!subjectSlug || loading) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/subjects/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subjectSlug }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setError(data.error ?? 'Enrollment failed')
        return
      }
      router.refresh()
    } catch {
      setError('Network error — please try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={handleEnroll}
        disabled={loading}
        className="rounded-lg px-4 py-2 text-sm font-medium transition-opacity disabled:opacity-60"
        style={{
          background: accent ?? 'var(--accent-primary)',
          color: '#fff',
        }}
      >
        {loading ? 'Adding…' : (label ?? '+ Add Subject')}
      </button>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
