'use client'
import { useState } from 'react'

interface TestEmailResult {
  to: string
  success: boolean
  error?: string
  smtpConfigured: boolean
  host: string
  port: number
  secure: boolean
  from: string
  fromDomainMismatchWarning?: string
  smtpErrorCode?: string | null
  smtpResponseCode?: number | null
  smtpResponse?: string | null
}

// Password-reset/welcome emails deliberately never reveal SMTP failures to
// the caller (anti-enumeration). This is the on-demand way to see the exact
// failure reason instead of digging through platform logs after the fact.
export function TestEmailPanel({ defaultTo }: { defaultTo: string }) {
  const [to, setTo] = useState(defaultTo)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<TestEmailResult | null>(null)

  const send = async () => {
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch('/api/admin/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to }),
      })
      const data = await res.json()
      setResult(res.ok ? data : { to, success: false, error: data.error ?? 'Request failed', smtpConfigured: false, host: '', port: 0, secure: false, from: '' })
    } catch {
      setResult({ to, success: false, error: 'Network error', smtpConfigured: false, host: '', port: 0, secure: false, from: '' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <input
          type="email"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="test recipient email"
          style={{
            flex: 1, padding: '8px 10px', borderRadius: 8, fontSize: 12,
            border: '1px solid var(--candy-shadow)', background: 'var(--candy-card)', color: 'var(--candy-ink)',
          }}
        />
        <button
          onClick={send}
          disabled={loading || !to}
          style={{
            padding: '8px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700,
            background: 'var(--candy-purple)', color: '#fff', border: 'none',
            opacity: loading || !to ? 0.5 : 1, cursor: loading || !to ? 'default' : 'pointer',
          }}
        >
          {loading ? 'Sending…' : 'Send test email'}
        </button>
      </div>

      {result && (
        <div
          style={{
            padding: 12, borderRadius: 10, fontSize: 12, lineHeight: 1.6,
            background: result.success ? 'rgba(52, 199, 89, 0.08)' : 'rgba(255, 75, 75, 0.08)',
            border: `1px solid ${result.success ? 'rgba(52, 199, 89, 0.25)' : 'rgba(255, 75, 75, 0.25)'}`,
            color: 'var(--candy-ink)',
          }}
        >
          <p style={{ margin: 0, fontWeight: 700, color: result.success ? 'var(--candy-green)' : 'var(--candy-red)' }}>
            {result.success ? `✓ Accepted by ${result.host || 'the SMTP server'} for delivery to ${result.to}` : `✗ Failed to send to ${result.to}`}
          </p>
          {!result.success && result.error && <p style={{ margin: '4px 0 0' }}>Error: {result.error}</p>}
          {result.smtpErrorCode && <p style={{ margin: '4px 0 0', fontFamily: 'monospace' }}>code: {result.smtpErrorCode} {result.smtpResponseCode ? `· responseCode: ${result.smtpResponseCode}` : ''}</p>}
          {result.smtpResponse && <p style={{ margin: '4px 0 0', fontFamily: 'monospace', wordBreak: 'break-all' }}>{result.smtpResponse}</p>}
          {result.host && <p style={{ margin: '4px 0 0', color: 'var(--candy-ink-soft)' }}>host: {result.host}:{result.port} (secure: {String(result.secure)}) · from: {result.from}</p>}
          {result.fromDomainMismatchWarning && (
            <p style={{ margin: '8px 0 0', color: '#B8860B' }}>⚠ {result.fromDomainMismatchWarning}</p>
          )}
          {result.success && (
            <p style={{ margin: '8px 0 0', color: 'var(--candy-ink-soft)' }}>
              &ldquo;Accepted&rdquo; only means the SMTP server took the message —
              check the inbox (and spam folder) at {result.to} to confirm it
              actually arrived. If it never does despite a repeated ✓ here, the
              warning above (or your provider&apos;s sending domain
              reputation/SPF/DKIM setup) is the most likely cause, not this
              app&apos;s code.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
