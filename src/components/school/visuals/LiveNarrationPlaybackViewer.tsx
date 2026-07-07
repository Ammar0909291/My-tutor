'use client'
/**
 * LiveNarrationPlaybackViewer — Visual Learning Sprint U, Task 6.
 *
 * Development-only verification that real lesson narration drives the real
 * production VisualCard via narration mode. Adapted to the canonical Sprint U
 * VisualCard interface (Reconciliation): VisualCard now owns its own
 * NarrationProgress and auto-advances it internally from a supplied
 * `narrationTimeline`, exposing the usual play/pause/replay/speed controls —
 * there is no externally-steppable `narrationStep` prop to drive by hand.
 * This viewer therefore just supplies the timeline and shows the resulting
 * sync plan/status alongside the real, narration-driven VisualCard. Uses
 * existing visuals; no production-only UI. Renders nothing outside development.
 */
import { VisualCard, VISUAL_STEP_COUNTS } from './VisualCard'
import type { VisualType } from '@/lib/school/visuals/visualTypes'
import { getAuthoredNarration, toLessonTimeline } from '@/lib/visuals/lessonNarration'
import { buildSyncPlan } from '@/lib/visuals/tutorVisualSync'

function LiveNarrationVisual({ type }: { type: VisualType }) {
  const stepCount = VISUAL_STEP_COUNTS[type]
  const narration = getAuthoredNarration(type)
  const timeline = narration ? toLessonTimeline(narration) : undefined
  const plan = timeline ? buildSyncPlan(timeline, stepCount) : null

  return (
    <section style={{ border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 12, background: 'var(--bg-surface)' }}>
      <h3 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 4px' }}>{type}</h3>
      <div style={{ fontSize: 11, opacity: 0.75, marginBottom: 6 }}>
        mode: narration · segments: {timeline?.segments.length ?? 0} · status: {plan?.status ?? 'n/a'}
      </div>
      {/* Real production VisualCard — narration mode, driven by the
          canonical Sprint U narrationTimeline prop. VisualCard auto-advances
          and exposes its own play/pause/replay/speed controls. */}
      <VisualCard type={type} hasNarration={!!timeline} narrationTimeline={timeline} />
    </section>
  )
}

export function LiveNarrationPlaybackViewer() {
  if (process.env.NODE_ENV !== 'development') return null
  const types: VisualType[] = ['number_line', 'fraction_bar', 'coordinate_plane', 'water_cycle', 'food_chain']
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
      {types.map((t) => <LiveNarrationVisual key={t} type={t} />)}
    </div>
  )
}
