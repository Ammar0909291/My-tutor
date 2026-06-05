'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function UpgradeButton({
  plan = 'pro',
  label = 'Оформить Pro →',
  className = '',
}: {
  plan?: 'basic' | 'pro' | 'annual'
  label?: string
  className?: string
}) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleClick() {
    setLoading(true)
    try {
      const res = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const data = await res.json() as { success?: boolean; confirmationUrl?: string; error?: string }
      if (data.success && data.confirmationUrl) {
        window.location.href = data.confirmationUrl
      } else if (data.error === 'Unauthorized') {
        router.push('/auth/login')
      }
    } catch { /* ignore */ } finally { setLoading(false) }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      style={{ background: 'var(--accent-primary)', color: '#fff' }}>
      {loading ? '...' : label}
    </button>
  )
}
