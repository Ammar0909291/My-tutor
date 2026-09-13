'use client'

/**
 * NarratedPlaybackControls — the ONE reusable Play/Pause + progress control
 * for narrated read-along lessons. Subject-agnostic: takes only playback
 * status/progress/callbacks, matches the existing candy design system
 * (CandyButton + ProgressBar, the same primitives the rest of Learn already
 * uses), and makes no assumption about what content it is narrating.
 */
import { Play, Pause, RotateCcw, Square } from 'lucide-react'
import { CandyButton, ProgressBar } from '@/components/ui/candy'
import type { NarrationPlaybackStatus } from '@/lib/narration/types'

export interface NarratedPlaybackControlsProps {
  status: NarrationPlaybackStatus
  progressPercent: number
  onToggle: () => void
  onReplay: () => void
  playLabel: string
  pauseLabel: string
  replayLabel: string
  loadingLabel: string
  errorLabel: string
  accentColor?: string
}

export function NarratedPlaybackControls({
  status, progressPercent, onToggle, onReplay,
  playLabel, pauseLabel, replayLabel, loadingLabel, errorLabel,
  accentColor = 'var(--coral)',
}: NarratedPlaybackControlsProps) {
  const isPlaying = status === 'PLAYING'
  const isLoading = status === 'LOADING'
  const isError = status === 'ERROR'
  const isCompleted = status === 'COMPLETED'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <CandyButton
        onClick={isCompleted ? onReplay : onToggle}
        disabled={isLoading}
        aria-label={isError ? errorLabel : isCompleted ? replayLabel : isPlaying ? pauseLabel : playLabel}
        depth={2} activeDepth={0}
        shadowColor={isPlaying ? 'var(--coral-hover)' : 'var(--border-subtle)'}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 34, height: 34, borderRadius: '50%', border: 'none',
          cursor: isLoading ? 'wait' : 'pointer',
          background: isPlaying ? accentColor : 'var(--bg-elevated)',
          color: isPlaying ? '#fff' : 'var(--text-dim)',
          flexShrink: 0,
        }}
      >
        {isCompleted
          ? <RotateCcw size={14} />
          : isPlaying
            ? <Pause size={14} fill="currentColor" />
            : <Play size={14} fill="currentColor" strokeWidth={0} />}
      </CandyButton>

      <div style={{ flex: 1, minWidth: 60 }}>
        <ProgressBar
          percent={isError ? 0 : progressPercent}
          height={6}
          animated={false}
          trackColor="var(--border-subtle)"
          fillColor={accentColor}
        />
      </div>

      {isLoading && <span style={{ fontSize: 11.4, color: 'var(--text-dim)' }}>{loadingLabel}</span>}
      {isError && (
        <CandyButton
          onClick={onReplay}
          aria-label={replayLabel}
          depth={2} activeDepth={0}
          style={{
            display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 8, border: 'none',
            fontSize: 11.4, fontWeight: 600, cursor: 'pointer', color: 'var(--red)', background: 'transparent',
          }}
        >
          <Square size={10} />{errorLabel}
        </CandyButton>
      )}
    </div>
  )
}
