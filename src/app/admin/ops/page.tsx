import { prisma } from '@/lib/db/prisma'
import { redis } from '@/lib/redis/client'
import { getFailureCounters } from '@/lib/monitoring'
import { Card, Pill, SectionTitle } from '@/components/ui/candy'

interface OpsData {
  health: { db: boolean; redis: string; uptime: number }
  failureCounters: Record<string, number>
  timestamp: string
}

function StatusPill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <Pill color={ok ? 'var(--candy-green)' : 'var(--candy-red)'} style={{ color: '#fff' }}>
      {label}
    </Pill>
  )
}

function EnvRow({ name, set }: { name: string; set: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 0',
        borderBottom: '1px solid var(--candy-shadow)',
        fontSize: 13,
      }}
    >
      <span style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--candy-ink-soft)' }}>{name}</span>
      <StatusPill ok={set} label={set ? 'SET ✓' : 'MISSING ✗'} />
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

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--candy-ink)', margin: 0 }}>Operations Center</h1>
        <p style={{ fontSize: 14, color: 'var(--candy-ink-soft)', marginTop: 2 }}>
          Live system health and environment diagnostics
        </p>
        {data?.timestamp && (
          <p style={{ fontSize: 12, color: 'var(--candy-ink-soft)', marginTop: 4 }}>
            Last checked: {new Date(data.timestamp).toLocaleString()}
          </p>
        )}
      </div>

      {!data && (
        <Card style={{ padding: 20, marginBottom: 20, background: 'rgba(255, 75, 75, 0.08)' }}>
          <p style={{ fontSize: 14, fontWeight: 800, color: 'var(--candy-red)', margin: 0 }}>
            Failed to load health data
          </p>
          <p style={{ fontSize: 12, color: 'var(--candy-ink-soft)', marginTop: 4 }}>
            Could not reach the database or monitoring layer. Environment checks below still use
            server-side process.env.
          </p>
        </Card>
      )}

      {/* Panel 1: Platform Health */}
      <Card style={{ padding: 20, marginBottom: 20 }}>
        <SectionTitle style={{ fontSize: 13, marginBottom: 16 }}>Platform Health</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13 }}>
            <span style={{ color: 'var(--candy-ink-soft)' }}>Database</span>
            {data ? (
              <StatusPill ok={data.health.db} label={data.health.db ? 'Connected' : 'Disconnected'} />
            ) : (
              <span style={{ fontSize: 12, color: 'var(--candy-ink-soft)' }}>—</span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, borderTop: '1px solid var(--candy-shadow)', paddingTop: 12 }}>
            <span style={{ color: 'var(--candy-ink-soft)' }}>Redis</span>
            {data ? (
              <Pill
                color={data.health.redis === 'configured' ? 'var(--candy-blue)' : 'var(--candy-ink-soft)'}
                style={{ color: '#fff' }}
              >
                {data.health.redis === 'configured' ? 'Configured' : data.health.redis === 'error' ? 'Error' : 'Not Configured'}
              </Pill>
            ) : (
              <span style={{ fontSize: 12, color: 'var(--candy-ink-soft)' }}>—</span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13, borderTop: '1px solid var(--candy-shadow)', paddingTop: 12 }}>
            <span style={{ color: 'var(--candy-ink-soft)' }}>Node Uptime</span>
            <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--candy-ink)' }}>
              {data ? `${Math.floor(data.health.uptime / 3600)}h` : '—'}
            </span>
          </div>
        </div>
      </Card>

      {/* Panel 2: Failure Counters */}
      <Card style={{ padding: 20, marginBottom: 20 }}>
        <SectionTitle style={{ fontSize: 13, marginBottom: 16 }}>Failure Counters</SectionTitle>
        {!data ? (
          <p style={{ fontSize: 14, color: 'var(--candy-ink-soft)' }}>Unavailable</p>
        ) : Object.keys(data.failureCounters).length === 0 ? (
          <p style={{ fontSize: 14, color: 'var(--candy-ink-soft)' }}>No failures recorded since last restart</p>
        ) : (
          <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ color: 'var(--candy-ink-soft)' }}>
                <th style={{ textAlign: 'left', fontSize: 11, textTransform: 'uppercase', paddingBottom: 8, fontWeight: 700 }}>Context</th>
                <th style={{ textAlign: 'right', fontSize: 11, textTransform: 'uppercase', paddingBottom: 8, fontWeight: 700 }}>Count</th>
                <th style={{ textAlign: 'right', fontSize: 11, textTransform: 'uppercase', paddingBottom: 8, fontWeight: 700 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.failureCounters).map(([ctx, count]) => {
                const isCritical = count > 10
                const isWarning = count > 0 && !isCritical
                return (
                  <tr key={ctx} style={{ borderTop: '1px solid var(--candy-shadow)' }}>
                    <td style={{ padding: '8px 0', fontFamily: 'monospace', fontSize: 12, color: 'var(--candy-ink-soft)' }}>
                      {ctx}
                    </td>
                    <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 800, color: 'var(--candy-ink)' }}>
                      {count}
                    </td>
                    <td style={{ padding: '8px 0', textAlign: 'right' }}>
                      {isCritical ? (
                        <StatusPill ok={false} label="Critical" />
                      ) : isWarning ? (
                        <Pill color="var(--candy-yellow)" style={{ color: 'var(--candy-ink)' }}>Warning</Pill>
                      ) : (
                        <StatusPill ok={true} label="OK" />
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </Card>

      {/* Panel 3: Environment Validation */}
      <Card style={{ padding: 20, marginBottom: 20 }}>
        <SectionTitle style={{ fontSize: 13, marginBottom: 16 }}>Environment Validation</SectionTitle>
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--candy-ink-soft)', marginBottom: 8 }}>
          Required
        </p>
        <div style={{ marginBottom: 16 }}>
          {requiredEnv.map((e) => (
            <EnvRow key={e.name} name={e.name} set={e.set} />
          ))}
        </div>
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--candy-ink-soft)', marginBottom: 8 }}>
          Recommended
        </p>
        <div>
          {recommendedEnv.map((e) => (
            <EnvRow key={e.name} name={e.name} set={e.set} />
          ))}
        </div>
      </Card>

      {/* Panel 4: AI Provider Configuration */}
      <Card style={{ padding: 20, marginBottom: 20 }}>
        <SectionTitle style={{ fontSize: 13, marginBottom: 16 }}>AI Provider Configuration</SectionTitle>
        <div>
          {aiProviders.map((p) => (
            <EnvRow key={p.name} name={p.name} set={p.set} />
          ))}
        </div>
      </Card>
    </div>
  )
}
