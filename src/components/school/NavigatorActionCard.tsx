import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { NAVIGATOR_URGENCY_COLORS, type LearningNavigatorAction } from '@/lib/school/navigation/learningNavigator'

/**
 * Compact "Recommended Next Action" card (Sprint CO Learning Navigator).
 * Shared across the dashboard, subject page, and chapter page banner —
 * presentation only, all data comes from `getLearningNavigatorAction`.
 */
export function NavigatorActionCard({
  action,
  heading = '🎯 Recommended Next Action',
  compact = false,
}: {
  action: LearningNavigatorAction
  heading?: string
  compact?: boolean
}) {
  const color = NAVIGATOR_URGENCY_COLORS[action.urgency]
  return (
    <section className={compact ? 'rounded-2xl p-4' : 'rounded-2xl p-5'}
      style={{ background: 'var(--bg-surface)', border: `1px solid ${color}22` }}>
      <div className="flex items-center justify-between mb-1.5">
        <h2 className="font-bold text-[10px] uppercase tracking-wide" style={{ color }}>{heading}</h2>
        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide"
          style={{ background: color + '22', color }}>
          {action.urgency}
        </span>
      </div>
      <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{action.title}</p>
      <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{action.reason}</p>
      <div className="flex items-center gap-3 mt-1.5 text-[11px]" style={{ color: 'var(--text-dim)' }}>
        <span>⏱ ~{action.estimatedMinutes} min</span>
        <span>🎯 {action.expectedOutcome}</span>
      </div>
      <Link href={action.href}
        className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl text-white mt-2.5"
        style={{ background: color, textDecoration: 'none' }}>
        {action.title} <ArrowRight size={13} />
      </Link>
    </section>
  )
}
