'use client'
/**
 * NarrationDrivenPlaybackViewer — Visual Learning Sprint T, Task 5.
 *
 * Development-only demonstration of narration-driven playback. The visual
 * advances when narration advances (Next / Previous / Reset), NOT by a timer —
 * useTeachingPlayback runs in 'narration' mode driven by the synchronized
 * playback controller. Uses existing demo visuals; no production wiring, no AI,
 * no renderer changes. Renders nothing outside development.
 */
import { useState } from 'react'
import { useTeachingPlayback } from '@/hooks/useTeachingPlayback'
import { VISUAL_STEP_COUNTS } from './VisualCard'
import { NumberLine } from './NumberLine'
import { FractionBar } from './FractionBar'
import { CoordinatePlane } from './CoordinatePlane'
import { WaterCycle } from './WaterCycle'
import { FoodChain } from './FoodChain'
import type { VisualType } from '@/lib/school/visuals/visualTypes'
import { createNarrationProgress, advance, retreat, reset, visualStepForSegment } from '@/lib/visuals/synchronizedPlayback'
import type { NarrationProgress } from '@/lib/visuals/narrationProgress'

// Developer-authored sample narration (NOT AI-generated) — one line per animation step.
const NARRATION: Partial<Record<VisualType, string[]>> = {
  number_line: ["Let's draw the number line.", 'Now add the tick marks.', 'Label each number.', 'Highlight zero — our reference point.'],
  fraction_bar: ['Draw the empty bars.', 'Fill the shaded parts.', 'Label each fraction.', 'Read the value inside each bar.'],
  coordinate_plane: ['Draw the x and y axes.', 'Add the grid lines.', 'Label the tick marks.', 'Plot the point.', 'Read off its coordinates.'],
  water_cycle: ['Start with the ground and mountain.', 'Add the ocean.', 'The sun heats the water.', 'Clouds form above.', 'Water evaporates upward.', 'Rain falls and runs back.'],
  food_chain: ['Begin with the Sun.', 'Energy flows to the grass.', 'The grasshopper eats the grass.', 'The frog eats the grasshopper.', 'The snake tops the chain.'],
}

function VisualByType({ type, revealStep }: { type: VisualType; revealStep: number }) {
  switch (type) {
    case 'number_line': return <NumberLine revealStep={revealStep} />
    case 'fraction_bar': return <FractionBar revealStep={revealStep} />
    case 'coordinate_plane': return <CoordinatePlane revealStep={revealStep} />
    case 'water_cycle': return <WaterCycle revealStep={revealStep} />
    case 'food_chain': return <FoodChain revealStep={revealStep} />
    default: return null
  }
}

const btn: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 999, border: 'none',
  background: 'var(--coral, #FF6B5E)', color: '#fff', cursor: 'pointer',
}

function NarrationVisual({ type }: { type: VisualType }) {
  const stepCount = VISUAL_STEP_COUNTS[type]
  const lines = NARRATION[type] ?? []
  const [progress, setProgress] = useState<NarrationProgress>(() => createNarrationProgress(lines.length))

  // Drive the visual purely from the narration segment — no timer.
  const narrationStep = visualStepForSegment(progress, stepCount)
  const playback = useTeachingPlayback(stepCount, { mode: 'narration', narrationStep })

  const activeLine = progress.currentSegment > 0 ? lines[progress.currentSegment - 1] : '(narration not started)'

  return (
    <section style={{ border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 12, background: 'var(--bg-surface)' }}>
      <h3 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px' }}>
        {type} <span style={{ opacity: 0.6 }}>· segment {progress.currentSegment}/{progress.totalSegments} → step {playback.revealStep}</span>
      </h3>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
        <VisualByType type={type} revealStep={playback.revealStep} />
      </div>
      <div style={{ fontSize: 12, fontWeight: 700, minHeight: 32, marginBottom: 6 }}>{activeLine}</div>
      <div style={{ display: 'flex', gap: 6 }}>
        <button type="button" style={btn} onClick={() => setProgress(retreat)}>‹ Previous</button>
        <button type="button" style={btn} onClick={() => setProgress(advance)}>Next ›</button>
        <button type="button" style={{ ...btn, background: 'var(--bg-elevated, #2A2A3A)', color: 'var(--text-primary, #fff)' }} onClick={() => setProgress(reset)}>↺ Reset</button>
      </div>
    </section>
  )
}

export function NarrationDrivenPlaybackViewer() {
  if (process.env.NODE_ENV !== 'development') return null
  const types: VisualType[] = ['number_line', 'fraction_bar', 'coordinate_plane', 'water_cycle', 'food_chain']
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
      {types.map((t) => <NarrationVisual key={t} type={t} />)}
    </div>
  )
}
