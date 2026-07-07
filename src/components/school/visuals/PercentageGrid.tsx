'use client'
// Percentage Grid (10×10 = 100 squares) — Sprint BW · animated Sprint R.1

import anim from './visualAnim.module.css'

export function PercentageGrid({ percent = 65, revealStep = Infinity }: { percent?: number; revealStep?: number }) {
  const cols = 10, rows = 10, cell = 18, gap = 2, padX = 4, padY = 4
  const filled = Math.min(100, Math.max(0, Math.round(percent)))
  const show = (s: number) => revealStep >= s

  return (
    <svg
      viewBox={`0 0 ${cols * (cell + gap) + padX * 2} ${rows * (cell + gap) + padY * 2 + 20}`}
      width="100%"
      style={{ maxWidth: 220 }}
      aria-hidden="true"
    >
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => {
          const idx = r * cols + c
          const isFilled = idx < filled
          // Step 1 draws every cell empty; Step 2 colours the filled cells in.
          const colourNow = isFilled && show(2)
          if (isFilled && !show(1)) return null
          return (
            <rect
              key={idx}
              className={anim.reveal}
              x={padX + c * (cell + gap)}
              y={padY + r * (cell + gap)}
              width={cell}
              height={cell}
              rx={3}
              fill={colourNow ? '#22A06B' : 'var(--bg-elevated)'}
              stroke="var(--border-default)"
              strokeWidth={0.5}
            />
          )
        })
      )}
      {/* Step 3 — reveal the percentage value */}
      {show(3) && (
        <text
          className={anim.writeIn}
          x={(cols * (cell + gap) + padX * 2) / 2}
          y={rows * (cell + gap) + padY + 16}
          textAnchor="middle"
          fontSize={12}
          fontWeight={700}
          fill="var(--text-primary)"
        >
          {filled}% = {filled} out of 100
        </text>
      )}
    </svg>
  )
}
