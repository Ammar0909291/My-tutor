import Link from 'next/link'
import { ArrowRight, AlertTriangle } from 'lucide-react'
import { NAVIGATOR_URGENCY_COLORS, type LearningNavigatorAction, type NavigatorUrgency } from '@/lib/school/navigation/learningNavigator'

// Sprint CO.1: per-urgency card framing. HIGH gets the strongest visual
// weight (accent border + tinted background + warning icon); MEDIUM is
// yellow-accented; LOW is a plain neutral card — it should not compete with
// HIGH/MEDIUM items elsewhere on the page.
const URGENCY_CARD_STYLE: Record<NavigatorUrgency, { border: string; background: string }> = {
  high: { border: '1.5px solid var(--coral)', background: 'var(--coral-muted)' },
  medium: { border: '1px solid var(--yellow)', background: 'var(--bg-surface)' },
  low: { border: '1px solid var(--border-default)', background: 'var(--bg-surface)' },
}

/**
 * Compact "Recommended Next Action" card (Sprint CO Learning Navigator).
 * Shared across the dashboard, subject page, and chapter page banner —
 * presentation only, all data comes from `getLearningNavigatorAction`.
 */
export function NavigatorActionCard({
  action,
  heading = '🎯 Recommended Next Action',
  title,
  compact = false,
}: {
  action: LearningNavigatorAction
  heading?: string
  /** Sprint CO.1: override the displayed title/CTA label (context-aware copy). */
  title?: string
  compact?: boolean
}) {
  const color = NAVIGATOR_URGENCY_COLORS[action.urgency]
  const cardStyle = URGENCY_CARD_STYLE[action.urgency]
  const label = title ?? action.title
  return (
    <section className={compact ? 'rounded-2xl p-4' : 'rounded-2xl p-5'}
      style={{ background: cardStyle.background, border: cardStyle.border }}>
      <div className="flex items-center justify-between mb-1.5">
        <h2 className="font-bold text-[10px] uppercase tracking-wide flex items-center gap-1.5" style={{ color }}>
          {action.urgency === 'high' && <AlertTriangle size={11} />}
          {heading}
        </h2>
        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide"
          style={{ background: color + '22', color }}>
          {action.urgency}
        </span>
      </div>
      <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{label}</p>
      <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{action.reason}</p>
      <div className="flex items-center gap-3 mt-1.5 text-[11px]" style={{ color: 'var(--text-dim)' }}>
        <span>⏱ ~{action.estimatedMinutes} min</span>
        <span>🎯 {action.expectedOutcome}</span>
      </div>
      <Link href={action.href}
        className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl text-white mt-2.5"
        style={{ background: 'var(--coral)', textDecoration: 'none' }}>
        {label} <ArrowRight size={13} />
      </Link>
    </section>
  )
}
