'use client'
/**
 * TutorVisualSyncViewer — Visual Learning Sprint S, Task 5.
 *
 * Development-only demonstration of the Tutor↔Visual synchronization
 * infrastructure. For each existing demo visual it drives the real
 * useTeachingPlayback (with the new optional onStepChange) and shows, live,
 * which narration segment is active at the current animation step plus the
 * synchronization status. Uses existing demo visuals only — no production
 * wiring, no AI, no renderer changes. Renders nothing outside development.
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
import { timelineFromNarrationLines, buildSyncPlan, narrationForStep } from '@/lib/visuals/tutorVisualSync'

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

function SyncedVisual({ type }: { type: VisualType }) {
  const stepCount = VISUAL_STEP_COUNTS[type]
  const lines = NARRATION[type] ?? []
  const plan = buildSyncPlan(timelineFromNarrationLines(type, lines), stepCount)
  const [currentStep, setCurrentStep] = useState(0)
  const playback = useTeachingPlayback(stepCount, { autoPlay: true, onStepChange: setCurrentStep })

  return (
    <section style={{ border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 12, background: 'var(--bg-surface)' }}>
      <h3 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 6px' }}>{type} <span style={{ opacity: 0.6 }}>· status: {plan.status}</span></h3>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
        <VisualByType type={type} revealStep={playback.revealStep} />
      </div>
      <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>
        Now ({currentStep > 0 ? `step ${currentStep}` : 'starting'}): {narrationForStep(plan, currentStep) ?? '…'}
      </div>
      <ol style={{ margin: 0, paddingLeft: 18, fontSize: 12 }}>
        {plan.steps.map((s) => (
          <li key={s.step} style={{ fontWeight: s.step === currentStep ? 800 : 400, opacity: s.step <= currentStep ? 1 : 0.45 }}>
            {s.narration ?? '(no narration)'}{s.matched ? '' : ' ⚠'}
          </li>
        ))}
      </ol>
      <div style={{ marginTop: 6 }}>
        <button type="button" onClick={playback.replay} style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, border: 'none', background: 'var(--coral, #FF6B5E)', color: '#fff', cursor: 'pointer' }}>
          ↺ Replay
        </button>
      </div>
    </section>
  )
}

export function TutorVisualSyncViewer() {
  if (process.env.NODE_ENV !== 'development') return null
  const types: VisualType[] = ['number_line', 'fraction_bar', 'coordinate_plane', 'water_cycle', 'food_chain']
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
      {types.map((t) => <SyncedVisual key={t} type={t} />)}
    </div>
  )
}
