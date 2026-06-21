'use client'
/**
 * LiveNarrationPlaybackViewer — Visual Learning Sprint U, Task 6.
 *
 * Development-only verification that real lesson narration drives the real
 * production VisualCard via narration mode. Steps the narration (Next /
 * Previous / Reset) and renders the actual VisualCard with narrationStep —
 * the same path production uses once a live narration step is supplied. Shows
 * current segment, current visual step, synchronization status, and playback
 * mode. Uses existing visuals; no production-only UI. Renders nothing outside
 * development.
 */
import { useState } from 'react'
import { VisualCard, VISUAL_STEP_COUNTS } from './VisualCard'
import type { VisualType } from '@/lib/school/visuals/visualTypes'
import { getAuthoredNarration, toLessonTimeline } from '@/lib/visuals/lessonNarration'
import { buildSyncPlan } from '@/lib/visuals/tutorVisualSync'
import { createNarrationProgress, advance, retreat, reset, visualStepForSegment } from '@/lib/visuals/synchronizedPlayback'
import type { NarrationProgress } from '@/lib/visuals/narrationProgress'

const btn: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 999, border: 'none',
  background: 'var(--coral, #FF6B5E)', color: '#fff', cursor: 'pointer',
}

function LiveNarrationVisual({ type }: { type: VisualType }) {
  const stepCount = VISUAL_STEP_COUNTS[type]
  const narration = getAuthoredNarration(type)
  const plan = narration ? buildSyncPlan(toLessonTimeline(narration), stepCount) : null
  const total = narration?.segments.length ?? 0
  const [progress, setProgress] = useState<NarrationProgress>(() => createNarrationProgress(total))

  const narrationStep = visualStepForSegment(progress, stepCount)
  const activeText = progress.currentSegment > 0 ? narration?.segments[progress.currentSegment - 1]?.text : '(narration not started)'

  return (
    <section style={{ border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 12, background: 'var(--bg-surface)' }}>
      <h3 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 4px' }}>{type}</h3>
      <div style={{ fontSize: 11, opacity: 0.75, marginBottom: 6 }}>
        mode: narration · segment {progress.currentSegment}/{total} → visual step {narrationStep} · status: {plan?.status ?? 'n/a'}
      </div>
      {/* Real production VisualCard, driven by narration mode. */}
      <VisualCard type={type} hasNarration narrationStep={narrationStep} />
      <div style={{ fontSize: 12, fontWeight: 700, minHeight: 32, margin: '6px 0' }}>{activeText}</div>
      <div style={{ display: 'flex', gap: 6 }}>
        <button type="button" style={btn} onClick={() => setProgress(retreat)}>‹ Previous</button>
        <button type="button" style={btn} onClick={() => setProgress(advance)}>Next ›</button>
        <button type="button" style={{ ...btn, background: 'var(--bg-elevated, #2A2A3A)', color: 'var(--text-primary, #fff)' }} onClick={() => setProgress(reset)}>↺ Reset</button>
      </div>
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
