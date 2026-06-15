'use client'
import { useState } from 'react'

export function UpgradeButton({ label = 'Оформить Pro →', className = '' }: { label?: string; className?: string }) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' })
      const data = await res.json() as { success?: boolean; data?: { url?: string } }
      if (data.success && data.data?.url) window.location.href = data.data.url
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
