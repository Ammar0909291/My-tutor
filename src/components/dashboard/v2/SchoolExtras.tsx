import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { NavigatorActionCard } from '@/components/school/NavigatorActionCard'
import { SectionTitle } from '@/components/ui/candy'
import type { SchoolExtrasData } from './types'

/**
 * School Mode content cards (Sprint B Issue 2) — rendered inside the same
 * DashboardV2 shell used by Library Mode. Reuses NavigatorActionCard
 * (already shared across school pages) instead of forking a new component.
 */
export function SchoolExtras({ data }: { data: SchoolExtrasData }) {
  const { navigatorAction, dailyPlan, academicJourney, examReadiness } = data
  const hasAny = navigatorAction || dailyPlan.length > 0 || (academicJourney && academicJourney.length > 0) || (examReadiness && examReadiness.length > 0)
  if (!hasAny) return null

  return (
    <>
      {navigatorAction && (
        <>
          <SectionTitle>🎯 Recommended next action</SectionTitle>
          <NavigatorActionCard action={navigatorAction} />
        </>
      )}

      {dailyPlan.length > 0 && (
        <>
          <SectionTitle>📅 Today&apos;s plan</SectionTitle>
          <section className="rounded-2xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
            <ul className="space-y-2.5 mb-3">
              {dailyPlan.map((task, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] shrink-0"
                    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-default)', color: 'var(--text-dim)' }}>
                    {i + 1}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="font-semibold truncate block" style={{ color: 'var(--text-primary)' }}>{task.title}</span>
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{task.subjectLabel} · ~{task.estimatedMinutes} min</span>
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/school/focus"
              className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl text-white"
              style={{ background: 'var(--coral)', textDecoration: 'none' }}>
              Start Today&apos;s Plan <ArrowRight size={13} />
            </Link>
          </section>
        </>
      )}

      {academicJourney && academicJourney.length > 0 && (
        <>
          <SectionTitle>🗺️ Academic journey</SectionTitle>
          <section className="rounded-2xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
            <div className="space-y-2.5">
              {academicJourney.map((r) => (
                <div key={r.subjectSlug} className="flex items-center gap-3">
                  <span className="text-xs font-semibold w-28 shrink-0 truncate" style={{ color: 'var(--text-primary)' }}>{r.subjectLabel}</span>
                  <div className="h-2 flex-1 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                    <div className="h-full rounded-full" style={{ width: `${Math.min(100, Math.max(0, r.completionPercent))}%`, background: 'var(--coral)', transition: 'width .5s' }} />
                  </div>
                  <span className="text-[11px] font-mono font-bold w-20 text-right shrink-0" style={{ color: 'var(--coral)' }}>
                    {r.completedCount}/{r.totalCount} · {r.completionPercent}%
                  </span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {examReadiness && examReadiness.length > 0 && (
        <>
          <SectionTitle>🎓 Exam readiness</SectionTitle>
          <section className="rounded-2xl p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)' }}>
            <div className="space-y-2.5">
              {examReadiness.map((r) => {
                const levelColor =
                  r.level === 'strongly_prepared' ? 'var(--green)' :
                  r.level === 'exam_ready' ? 'var(--blue)' :
                  r.level === 'developing' ? 'var(--yellow)' :
                  'var(--coral)'
                return (
                  <div key={r.subjectSlug} className="flex items-center gap-3">
                    <span className="text-xs font-semibold w-28 shrink-0 truncate" style={{ color: 'var(--text-primary)' }}>{r.subjectLabel}</span>
                    <div className="h-2 flex-1 rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                      <div className="h-full rounded-full" style={{ width: `${Math.min(100, Math.max(0, r.readinessPercent))}%`, background: levelColor, transition: 'width .5s' }} />
                    </div>
                    <span className="text-[11px] font-mono font-bold w-9 text-right shrink-0" style={{ color: levelColor }}>{r.readinessPercent}%</span>
                  </div>
                )
              })}
            </div>
          </section>
        </>
      )}
    </>
  )
}
