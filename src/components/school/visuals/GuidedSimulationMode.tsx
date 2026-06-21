'use client'
/**
 * GuidedSimulationMode — Interactive Simulation Layer Phase 2, Task 3.
 * Generic, subject-agnostic step-through wrapper for any interactive
 * simulation: shows an instruction banner, advances a 1-indexed `revealStep`
 * (the same convention VisualCard/useTeachingPlayback already use for
 * narration-synced visuals), and exposes which control/scene-object id should
 * be highlighted at the current step via a render-prop. No new narration
 * system — this is local Next/Previous/Reset state, the same step-index
 * paradigm as the existing revealStep contract, not a narrationTimeline
 * consumer. A future sprint can drive `revealStep` here from narration the
 * same way VisualCard does, without changing this component's contract.
 */
import { useState, type ReactNode } from 'react'

export interface GuidedStep {
  /** Plain-language instruction shown to the student for this step. */
  instruction: string
  /** Matches a SimulationControl's `id` — passed through to highlightedControlId. */
  highlightedControlId?: string
  /** Free-form id a Scene component can check to highlight a mesh/group. */
  highlightedSceneObjectId?: string
}

interface GuidedSimulationModeProps {
  steps: GuidedStep[]
  children: (args: {
    step: GuidedStep
    stepIndex: number
    highlightedControlId: string | null
    highlightedSceneObjectId: string | null
  }) => ReactNode
}

export function GuidedSimulationMode({ steps, children }: GuidedSimulationModeProps) {
  const [revealStep, setRevealStep] = useState(1)
  const stepIndex = Math.min(Math.max(revealStep, 1), steps.length) - 1
  const step = steps[stepIndex]

  return (
    <div>
      <div
        role="status"
        aria-live="polite"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 8,
          padding: '8px 10px',
          marginBottom: 8,
          background: 'var(--coral-muted)',
          border: '1px solid var(--coral)',
        }}
      >
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', color: 'var(--coral)' }}>
          Guided step {stepIndex + 1} of {steps.length}
        </span>
        <span style={{ fontSize: 12, fontWeight: 600 }}>{step.instruction}</span>
      </div>

      {children({
        step,
        stepIndex,
        highlightedControlId: step.highlightedControlId ?? null,
        highlightedSceneObjectId: step.highlightedSceneObjectId ?? null,
      })}

      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button
          type="button"
          onClick={() => setRevealStep((s) => Math.max(1, s - 1))}
          disabled={revealStep <= 1}
          style={{ fontSize: 11, padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', cursor: revealStep <= 1 ? 'default' : 'pointer', opacity: revealStep <= 1 ? 0.5 : 1 }}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => setRevealStep((s) => Math.min(steps.length, s + 1))}
          disabled={revealStep >= steps.length}
          style={{ fontSize: 11, padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', cursor: revealStep >= steps.length ? 'default' : 'pointer', opacity: revealStep >= steps.length ? 0.5 : 1 }}
        >
          Next
        </button>
        <button
          type="button"
          onClick={() => setRevealStep(1)}
          style={{ fontSize: 11, padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', cursor: 'pointer' }}
        >
          Reset
        </button>
      </div>
    </div>
  )
}
