'use client'

interface DashboardErrorProps {
  message?: string
}

export function DashboardError({ message }: DashboardErrorProps) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minHeight: '60vh', padding: '2rem', textAlign: 'center',
    }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>⚡</div>
      <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: 'var(--text-primary, #1a1a1a)' }}>
        Dashboard is loading slowly
      </h2>
      <p style={{ fontSize: 14, color: 'var(--text-dim, #666)', maxWidth: 360, marginBottom: 24 }}>
        The database connection is taking longer than usual. This usually resolves in a few seconds.
      </p>
      {message && (
        <p style={{ fontSize: 11, color: 'var(--text-dim, #999)', marginBottom: 16, fontFamily: 'monospace' }}>
          {message}
        </p>
      )}
      <button
        onClick={() => window.location.reload()}
        style={{
          padding: '10px 24px', borderRadius: 8, border: 'none',
          background: '#6C5CE7', color: '#fff', fontWeight: 600,
          fontSize: 14, cursor: 'pointer',
        }}
      >
        Try Again
      </button>
    </div>
  )
}
