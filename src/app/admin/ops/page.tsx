import { prisma } from '@/lib/db/prisma'
import { redis } from '@/lib/redis/client'
import { getFailureCounters } from '@/lib/monitoring'

interface OpsData {
  health: { db: boolean; redis: string; uptime: number }
  failureCounters: Record<string, number>
  timestamp: string
}

function Badge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className="inline-block rounded px-2 py-0.5 text-xs font-bold"
      style={{
        background: ok ? 'rgba(63,185,80,0.15)' : 'rgba(248,81,73,0.15)',
        color: ok ? '#3FB950' : '#F85149',
      }}
    >
      {label}
    </span>
  )
}

function EnvRow({ name, set }: { name: string; set: boolean }) {
  return (
    <div
      className="flex items-center justify-between py-2 border-b last:border-0 text-sm"
      style={{ borderColor: 'var(--border-default)' }}
    >
      <span className="font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
        {name}
      </span>
      <Badge ok={set} label={set ? 'SET ✓' : 'MISSING ✗'} />
    </div>
  )
}

export default async function AdminOpsPage() {
  let data: OpsData | null = null

  try {
    let dbHealthy = false
    try {
      await Promise.race([
        prisma.$queryRaw`SELECT 1`,
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), 3000)),
      ])
      dbHealthy = true
    } catch { /* db unreachable */ }

    const redisUrl = process.env.REDIS_URL
    let redisStatus: string = redisUrl ? 'configured' : 'not-configured'
    if (redis) {
      try {
        await Promise.race([
          redis.ping(),
          new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), 2000)),
        ])
        redisStatus = 'configured'
      } catch { redisStatus = 'error' }
    }

    data = {
      health: { db: dbHealthy, redis: redisStatus, uptime: process.uptime() },
      failureCounters: getFailureCounters(),
      timestamp: new Date().toISOString(),
    }
  } catch { /* data remains null */ }

  // Env checks direct in server component
  const requiredEnv: { name: string; set: boolean }[] = [
    { name: 'DATABASE_URL', set: !!process.env.DATABASE_URL },
    { name: 'AUTH_SECRET', set: !!process.env.AUTH_SECRET },
    { name: 'NEXTAUTH_URL', set: !!process.env.NEXTAUTH_URL },
    { name: 'GROQ_API_KEY', set: !!process.env.GROQ_API_KEY },
  ]

  const recommendedEnv: { name: string; set: boolean }[] = [
    { name: 'SMTP_HOST', set: !!process.env.SMTP_HOST },
    { name: 'SMTP_USER', set: !!process.env.SMTP_USER },
    { name: 'SMTP_PASS', set: !!process.env.SMTP_PASS },
    { name: 'ADMIN_EMAILS', set: !!process.env.ADMIN_EMAILS },
    { name: 'MONITORING_WEBHOOK_URL', set: !!process.env.MONITORING_WEBHOOK_URL },
  ]

  const aiProviders: { name: string; set: boolean }[] = [
    { name: 'GROQ_API_KEY', set: !!process.env.GROQ_API_KEY },
    { name: 'YANDEX_API_KEY', set: !!process.env.YANDEX_API_KEY },
    { name: 'OPENROUTER_API_KEY', set: !!process.env.OPENROUTER_API_KEY },
    { name: 'GEMINI_API_KEY', set: !!process.env.GEMINI_API_KEY },
  ]

  const card = { background: '#0F0F18', borderColor: '#1A1A2E' }

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>
          Operations Center
        </h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-dim)' }}>
          Live system health and environment diagnostics
        </p>
        {data?.timestamp && (
          <p className="text-xs mt-1" style={{ color: 'var(--text-dim)' }}>
            Last checked: {new Date(data.timestamp).toLocaleString()}
          </p>
        )}
      </div>

      {!data && (
        <div
          className="rounded-xl border p-5 mb-5"
          style={{ background: 'rgba(248,81,73,0.07)', borderColor: 'rgba(248,81,73,0.25)' }}
        >
          <p className="text-sm font-bold" style={{ color: '#F85149' }}>
            Failed to load health data
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-dim)' }}>
            Could not reach the database or monitoring layer. Environment checks below still use
            server-side process.env.
          </p>
        </div>
      )}

      {/* Panel 1: Platform Health */}
      <div className="rounded-xl border p-5 mb-5" style={card}>
        <h2
          className="text-xs font-bold uppercase tracking-wide mb-4"
          style={{ color: 'var(--text-dim)' }}
        >
          Platform Health
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span style={{ color: 'var(--text-secondary)' }}>Database</span>
            {data ? (
              <Badge ok={data.health.db} label={data.health.db ? 'Connected' : 'Disconnected'} />
            ) : (
              <span className="text-xs" style={{ color: 'var(--text-dim)' }}>
                —
              </span>
            )}
          </div>
          <div
            className="flex items-center justify-between text-sm border-t pt-3"
            style={{ borderColor: '#1A1A2E' }}
          >
            <span style={{ color: 'var(--text-secondary)' }}>Redis</span>
            {data ? (
              <span
                className="inline-block rounded px-2 py-0.5 text-xs font-bold"
                style={{
                  background:
                    data.health.redis === 'configured'
                      ? 'rgba(56,139,253,0.15)'
                      : 'rgba(110,118,129,0.15)',
                  color: data.health.redis === 'configured' ? '#388BFD' : '#8B949E',
                }}
              >
                {data.health.redis === 'configured' ? 'Configured' : data.health.redis === 'error' ? 'Error' : 'Not Configured'}
              </span>
            ) : (
              <span className="text-xs" style={{ color: 'var(--text-dim)' }}>
                —
              </span>
            )}
          </div>
          <div
            className="flex items-center justify-between text-sm border-t pt-3"
            style={{ borderColor: '#1A1A2E' }}
          >
            <span style={{ color: 'var(--text-secondary)' }}>Node Uptime</span>
            <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
              {data ? `${Math.floor(data.health.uptime / 3600)}h` : '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Panel 2: Failure Counters */}
      <div className="rounded-xl border p-5 mb-5" style={card}>
        <h2
          className="text-xs font-bold uppercase tracking-wide mb-4"
          style={{ color: 'var(--text-dim)' }}
        >
          Failure Counters
        </h2>
        {!data ? (
          <p className="text-sm" style={{ color: 'var(--text-dim)' }}>
            Unavailable
          </p>
        ) : Object.keys(data.failureCounters).length === 0 ? (
          <p className="text-sm" style={{ color: 'var(--text-dim)' }}>
            No failures recorded since last restart
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr style={{ color: 'var(--text-dim)' }}>
                <th className="text-left text-xs uppercase pb-2 font-semibold">Context</th>
                <th className="text-right text-xs uppercase pb-2 font-semibold">Count</th>
                <th className="text-right text-xs uppercase pb-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.failureCounters).map(([ctx, count]) => {
                const isCritical = count > 10
                const isWarning = count > 0 && !isCritical
                return (
                  <tr
                    key={ctx}
                    className="border-t"
                    style={{ borderColor: '#1A1A2E' }}
                  >
                    <td className="py-2 font-mono text-xs" style={{ color: 'var(--text-secondary)' }}>
                      {ctx}
                    </td>
                    <td className="py-2 text-right font-bold" style={{ color: 'var(--text-primary)' }}>
                      {count}
                    </td>
                    <td className="py-2 text-right">
                      {isCritical ? (
                        <Badge ok={false} label="Critical" />
                      ) : isWarning ? (
                        <span
                          className="inline-block rounded px-2 py-0.5 text-xs font-bold"
                          style={{ background: 'rgba(210,153,34,0.15)', color: '#D2993C' }}
                        >
                          Warning
                        </span>
                      ) : (
                        <Badge ok={true} label="OK" />
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Panel 3: Environment Validation */}
      <div className="rounded-xl border p-5 mb-5" style={card}>
        <h2
          className="text-xs font-bold uppercase tracking-wide mb-4"
          style={{ color: 'var(--text-dim)' }}
        >
          Environment Validation
        </h2>
        <p className="text-xs font-semibold uppercase mb-2" style={{ color: 'var(--text-dim)' }}>
          Required
        </p>
        <div className="mb-4">
          {requiredEnv.map((e) => (
            <EnvRow key={e.name} name={e.name} set={e.set} />
          ))}
        </div>
        <p className="text-xs font-semibold uppercase mb-2" style={{ color: 'var(--text-dim)' }}>
          Recommended
        </p>
        <div>
          {recommendedEnv.map((e) => (
            <EnvRow key={e.name} name={e.name} set={e.set} />
          ))}
        </div>
      </div>

      {/* Panel 4: AI Provider Configuration */}
      <div className="rounded-xl border p-5 mb-5" style={card}>
        <h2
          className="text-xs font-bold uppercase tracking-wide mb-4"
          style={{ color: 'var(--text-dim)' }}
        >
          AI Provider Configuration
        </h2>
        <div>
          {aiProviders.map((p) => (
            <EnvRow key={p.name} name={p.name} set={p.set} />
          ))}
        </div>
      </div>
    </div>
  )
}
