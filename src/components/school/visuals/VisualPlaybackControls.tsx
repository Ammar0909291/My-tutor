'use client'
// VisualPlaybackControls — Sprint R.1
// Play / Pause / Replay + speed selector for the Animated Teaching Engine.
// Styled to match the Eagle / candy UI register (rounded, bold, coral accent).

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5]

interface Props {
  isPlaying: boolean
  isComplete: boolean
  speed: number
  onPlay: () => void
  onPause: () => void
  onReplay: () => void
  onSpeedChange: (speed: number) => void
}

const fmtSpeed = (s: number) => `Speed ${s}x`

export function VisualPlaybackControls({
  isPlaying,
  isComplete,
  speed,
  onPlay,
  onPause,
  onReplay,
  onSpeedChange,
}: Props) {
  const iconBtn: React.CSSProperties = {
    width: 30,
    height: 30,
    borderRadius: 999,
    border: 'none',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 800,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    background: 'var(--coral, #FF6B5E)',
    boxShadow: '0 2px 0 rgba(0,0,0,0.18)',
    lineHeight: 1,
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginTop: 8,
        flexWrap: 'wrap',
      }}
    >
      {isPlaying ? (
        <button type="button" style={iconBtn} onClick={onPause} aria-label="Pause" title="Pause">
          ❚❚
        </button>
      ) : (
        <button
          type="button"
          style={iconBtn}
          onClick={isComplete ? onReplay : onPlay}
          aria-label={isComplete ? 'Replay' : 'Play'}
          title={isComplete ? 'Replay' : 'Play'}
        >
          ▶
        </button>
      )}

      <button
        type="button"
        style={{ ...iconBtn, background: 'var(--bg-elevated, #2A2A3A)', color: 'var(--text-primary, #fff)' }}
        onClick={onReplay}
        aria-label="Replay"
        title="Replay"
      >
        ↺
      </button>

      {/* Speed selector */}
      <div
        style={{
          display: 'flex',
          gap: 3,
          marginLeft: 'auto',
          background: 'var(--bg-elevated, #2A2A3A)',
          borderRadius: 999,
          padding: 3,
        }}
        role="group"
        aria-label="Animation speed"
      >
        {SPEEDS.map((s) => {
          const active = s === speed
          return (
            <button
              key={s}
              type="button"
              onClick={() => onSpeedChange(s)}
              aria-pressed={active}
              title={fmtSpeed(s)}
              style={{
                border: 'none',
                cursor: 'pointer',
                borderRadius: 999,
                padding: '3px 8px',
                fontSize: 10,
                fontWeight: 800,
                color: active ? '#fff' : 'var(--text-secondary, #aaa)',
                background: active ? 'var(--coral, #FF6B5E)' : 'transparent',
              }}
            >
              {s}x
            </button>
          )
        })}
      </div>
    </div>
  )
}
