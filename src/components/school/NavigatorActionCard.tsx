'use client'

import Link from 'next/link'
import { ArrowRight, AlertTriangle, Target, Clock } from 'lucide-react'
import { NAVIGATOR_URGENCY_COLORS, type LearningNavigatorAction, type NavigatorUrgency } from '@/lib/school/navigation/navigatorTypes'
import { Card, CandyButton, Pill } from '@/components/ui/candy'
import tokenStyles from '@/components/ui/candy/tokens.module.css'

// Sprint CO.1: per-urgency card framing. HIGH gets the strongest visual
// weight (accent border + tinted background + warning icon); MEDIUM is
// yellow-accented; LOW is a plain neutral card — it should not compete with
// HIGH/MEDIUM items elsewhere on the page.
const URGENCY_BORDER: Record<NavigatorUrgency, string> = {
  high: 'var(--candy-red)',
  medium: 'var(--candy-yellow)',
  low: 'var(--candy-shadow)',
}

/**
 * Compact "Recommended Next Action" card (Sprint CO Learning Navigator).
 * Shared across the dashboard, subject page, and chapter page banner —
 * presentation only, all data comes from `getLearningNavigatorAction`.
 *
 * School Sprint A: restyled onto the candy primitives (Card/CandyButton/Pill)
 * to match Dashboard V2 / Lesson Experience. No prop/data changes.
 */
export function NavigatorActionCard({
  action,
  heading = 'Recommended Next Action',
  title,
  href,
  compact = false,
}: {
  action: LearningNavigatorAction
  heading?: string
  /** Sprint CO.1: override the displayed title/CTA label (context-aware copy). */
  title?: string
  /**
   * Sprint DM.1: override the CTA target. Needed when the action's own href
   * resolves to the page the student is already on (a dead self-link) and the
   * host page knows a meaningful continuation target instead.
   */
  href?: string
  compact?: boolean
}) {
  const color = NAVIGATOR_URGENCY_COLORS[action.urgency]
  const accent = URGENCY_BORDER[action.urgency]
  const label = title ?? action.title
  const targetHref = href ?? action.href
  return (
    <Card className={tokenStyles.candyTheme}
      style={{
        padding: compact ? 14 : 18,
        border: `1.5px solid ${accent}`,
        boxShadow: `0 4px 0 var(--candy-shadow)`,
      }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
        <span style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.4,
          color: 'var(--candy-ink)',
        }}>
          {action.urgency === 'high' && <AlertTriangle size={13} color={color} />}
          {heading}
        </span>
        <Pill color={color}>{action.urgency}</Pill>
      </div>

      <p style={{ fontFamily: 'var(--font-baloo2)', fontSize: 16, fontWeight: 800, color: 'var(--candy-ink)', margin: 0 }}>
        {label}
      </p>
      <p style={{ fontSize: 13, color: 'var(--candy-ink-soft)', marginTop: 4, marginBottom: 0 }}>
        {action.reason}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 10, fontSize: 12, color: 'var(--candy-ink-soft)', fontWeight: 600 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Clock size={13} /> ~{action.estimatedMinutes} min
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Target size={13} /> {action.expectedOutcome}
        </span>
      </div>

      <Link href={targetHref} style={{ textDecoration: 'none', display: 'block', marginTop: 14 }}>
        <CandyButton depth={3} shadowColor="var(--candy-red)" activeDepth={1}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '11px 16px', borderRadius: 14, fontSize: 13, fontWeight: 800,
            background: 'var(--candy-red)', color: '#fff',
          }}>
          {label} <ArrowRight size={15} />
        </CandyButton>
      </Link>
    </Card>
  )
}
