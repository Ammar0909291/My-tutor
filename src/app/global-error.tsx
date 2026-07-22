'use client'

/**
 * Root-layout error boundary — Next.js only mounts this when RootLayout
 * itself throws (separate from src/app/error.tsx, which covers everything
 * rendered inside the layout). Must render its own <html>/<body> since the
 * real root layout is what failed; can't rely on Providers/useLanguage.
 */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', background: '#FFF8F0' }}>
        <div style={{ maxWidth: 380, textAlign: 'center', padding: 32 }}>
          <p style={{ fontSize: 48, margin: '0 0 12px' }}>🦅</p>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: '#2D2A3D', margin: '0 0 8px' }}>Something broke</h1>
          <p style={{ fontSize: 14, color: '#6B6680', margin: '0 0 20px' }}>
            My Tutor hit an unexpected error. Try again, or come back in a bit.
          </p>
          <button
            // Full reload, not reset(): at this level the root layout itself
            // failed, and reset() alone re-renders against the same cached
            // server payload (same dead-Retry mechanism fixed in error.tsx).
            // A hard reload is the only recovery that re-fetches everything.
            onClick={() => window.location.reload()}
            style={{
              background: '#8B5CF6', color: '#fff', fontWeight: 800, fontSize: 14,
              border: 'none', borderRadius: 16, padding: '12px 24px', cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
