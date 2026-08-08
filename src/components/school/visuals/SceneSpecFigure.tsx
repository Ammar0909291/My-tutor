'use client'
/**
 * SceneSpecFigure — the presentation shell around a 3D scene.
 *
 * SceneSpecRenderer has always supported `revealStep`, but the lesson surface
 * called it without one, so every authored scene appeared fully drawn at once:
 * a scene whose author had staged it into five teaching steps arrived as a
 * single crowded picture, and the tutor had no stage to teach against.
 *
 * This adds the missing surface — a title, the authored narration for the
 * current stage, and Back/Next — without touching the renderer or the scene
 * model. A single-step scene renders exactly as before, with no controls.
 */
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SceneSpecRenderer } from './SceneSpecRenderer'
import { sceneStepCount, type SceneSpec } from '@/lib/teaching/sceneSpec'

export function SceneSpecFigure({ spec }: { spec: SceneSpec }) {
  const total = Math.max(1, sceneStepCount(spec))
  const staged = total > 1
  // The figure opens COMPLETE. Opening on step 1 showed a nearly empty scene,
  // which reads as a broken render rather than as a first stage. Walking the
  // stages is an explicit choice the learner makes; `null` means "showing all".
  const [step, setStep] = useState<number | null>(null)
  const walking = step !== null
  const narration = walking ? spec.steps?.[step - 1]?.narration?.trim() || null : null

  return (
    <div
      role="figure"
      aria-label={spec.ariaLabel ?? spec.title}
      style={{
        marginTop: 10,
        borderRadius: 12,
        border: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface)',
        padding: '10px 12px',
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
        {spec.title}
      </div>

      <SceneSpecRenderer spec={spec} revealStep={walking ? step : Infinity} />

      {staged && !walking && (
        <button
          type="button"
          onClick={() => setStep(1)}
          style={{
            marginTop: 10, padding: '5px 12px', borderRadius: 8,
            border: '1px solid var(--border-subtle)', background: 'var(--bg-elevated)',
            color: 'var(--text-secondary)', fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}
        >
          Walk through {total} steps
        </button>
      )}

      {staged && walking && (
        <>
          {narration && (
            <p style={{ margin: '10px 0 0', fontSize: 13, lineHeight: 1.5, color: 'var(--text-primary)' }}>
              {narration}
            </p>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(1, (s ?? 1) - 1))}
              disabled={step === 1}
              aria-label="Previous step"
              style={stepButton(step === 1)}
            >
              <ChevronLeft size={14} />
            </button>
            <span style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 600 }}>
              Step {step} of {total}
            </span>
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(total, (s ?? 1) + 1))}
              disabled={step === total}
              aria-label="Next step"
              style={stepButton(step === total)}
            >
              <ChevronRight size={14} />
            </button>
            <button
              type="button"
              onClick={() => setStep(null)}
              style={{
                marginLeft: 'auto', padding: '4px 10px', borderRadius: 8,
                border: '1px solid var(--border-subtle)', background: 'transparent',
                color: 'var(--text-dim)', fontSize: 12, fontWeight: 600, cursor: 'pointer',
              }}
            >
              Show all
            </button>
          </div>
        </>
      )}

      {spec.teachingGoal && (
        <p style={{ margin: '8px 0 0', fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.45 }}>
          {spec.teachingGoal}
        </p>
      )}
    </div>
  )
}

function stepButton(disabled: boolean): React.CSSProperties {
  return {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: 30, height: 30, borderRadius: 8,
    border: '1px solid var(--border-subtle)',
    background: 'var(--bg-elevated)',
    color: disabled ? 'var(--text-dim)' : 'var(--text-secondary)',
    opacity: disabled ? 0.45 : 1,
    cursor: disabled ? 'default' : 'pointer',
  }
}
