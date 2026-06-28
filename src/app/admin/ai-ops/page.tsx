import { prisma } from '@/lib/db/prisma'
import { withRetry } from '@/lib/db/withRetry'
import { CandyPage } from '@/components/ui/candy'

export default async function AdminAIOpsPage() {
  const [limit, totalLogs, successLogs, providerStats] = await withRetry(() =>
    Promise.all([
      prisma.aiUsageLimit.findFirst(),
      prisma.yandexUsageLog.count(),
      prisma.yandexUsageLog.count({ where: { success: true } }),
      prisma.yandexUsageLog.groupBy({ by: ['provider'], _count: true, _sum: { requestTokens: true, responseTokens: true, estimatedCost: true } }),
    ])
  ).catch(() => [null, 0, 0, []] as const)

  const lastError = await prisma.yandexUsageLog.findFirst({ where: { success: false }, orderBy: { createdAt: 'desc' }, select: { createdAt: true, errorMessage: true, provider: true } }).catch(() => null)

  const stat = (label: string, value: string | number, color?: string) => (
    <div className="rounded-xl border p-4" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}>
      <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--text-dim)' }}>{label}</p>
      <p className="text-2xl font-black" style={{ color: color ?? 'var(--text-primary)' }}>{value}</p>
    </div>
  )

  const errorRate = (totalLogs as number) > 0 ? ((totalLogs as number) - (successLogs as number)) / (totalLogs as number) * 100 : 0

  return (
    <CandyPage legacy className="max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>AI Operations</h1>
        <p className="text-sm mt-0.5" style={{ color: 'var(--text-dim)' }}>Provider status, usage counters, budget limits</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {stat('Total Requests', totalLogs as number)}
        {stat('Success', successLogs as number, 'var(--green)')}
        {stat('Error Rate', `${errorRate.toFixed(1)}%`, errorRate > 5 ? '#F85149' : 'var(--text-primary)')}
      </div>

      {/* Providers */}
      <div className="rounded-xl border p-5 mb-4" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}>
        <h2 className="text-xs font-bold uppercase tracking-wide mb-4" style={{ color: 'var(--text-dim)' }}>Providers</h2>
        {[
          { name: 'Groq (Llama 3)', key: 'groq', note: 'Primary — global routing' },
          { name: 'YandexGPT', key: 'yandex', note: 'Russia region routing' },
        ].map(p => {
          const s = Array.isArray(providerStats) ? (providerStats as { provider: string; _count: number; _sum: { estimatedCost: number | null } }[]).find(r => r.provider?.toLowerCase().includes(p.key)) : null
          return (
            <div key={p.key} className="flex items-start justify-between py-3 border-b last:border-0" style={{ borderColor: 'var(--border-default)' }}>
              <div>
                <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{p.name}</p>
                <p className="text-xs" style={{ color: 'var(--text-dim)' }}>{p.note}</p>
              </div>
              <div className="text-right text-xs" style={{ color: 'var(--text-secondary)' }}>
                <p>{s ? `${s._count} requests` : 'No logs'}</p>
                {s?._sum?.estimatedCost && <p>${(s._sum.estimatedCost).toFixed(4)}</p>}
              </div>
            </div>
          )
        })}
      </div>

      {/* Budget */}
      {limit && (
        <div className="rounded-xl border p-5 mb-4" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-default)' }}>
          <h2 className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: 'var(--text-dim)' }}>Budget Limits</h2>
          {[
            ['Daily request limit', (limit as { dailyRequestLimit: number }).dailyRequestLimit],
            ['Monthly cost limit', `$${(limit as { monthlyCostLimitUsd: number }).monthlyCostLimitUsd}`],
            ['Max tokens / request', (limit as { maxTokensPerRequest: number }).maxTokensPerRequest],
          ].map(([k, v]) => (
            <div key={k as string} className="flex justify-between py-2 border-b last:border-0 text-sm" style={{ borderColor: 'var(--border-default)' }}>
              <span style={{ color: 'var(--text-secondary)' }}>{k as string}</span>
              <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{v as string}</span>
            </div>
          ))}
        </div>
      )}

      {/* Last error */}
      {lastError && (
        <div className="rounded-xl border p-4" style={{ background: 'rgba(248,81,73,0.05)', borderColor: 'rgba(248,81,73,0.2)' }}>
          <p className="text-xs font-bold mb-1" style={{ color: '#F85149' }}>Last Error · {lastError.provider}</p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{lastError.errorMessage ?? 'Unknown'}</p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-dim)' }}>{lastError.createdAt.toLocaleString()}</p>
        </div>
      )}
      {!lastError && <p className="text-sm" style={{ color: 'var(--green)' }}>No recent AI errors recorded.</p>}
    </CandyPage>
  )
}
