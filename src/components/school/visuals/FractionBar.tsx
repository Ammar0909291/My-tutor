'use client'
// Fraction Bar visual — Sprint BW · animated Sprint R.1

import anim from './visualAnim.module.css'

const EXAMPLES = [
  { label: '1/2', num: 1, den: 2, color: '#FF6B5E' },
  { label: '3/4', num: 3, den: 4, color: '#8B5CF6' },
  { label: '2/3', num: 2, den: 3, color: '#22A06B' },
]

export function FractionBar({ revealStep = Infinity }: { revealStep?: number }) {
  const w = 280, barH = 22, gap = 12, startY = 8
  const show = (s: number) => revealStep >= s

  return (
    <svg viewBox={`0 0 ${w} ${EXAMPLES.length * (barH + gap) + startY + 4}`} width="100%" style={{ maxWidth: 300 }} aria-hidden="true">
      {EXAMPLES.map(({ label, num, den, color }, i) => {
        const y = startY + i * (barH + gap)
        const segW = (w - 48) / den
        return (
          <g key={label}>
            {/* Step 3 — fraction label */}
            {show(3) && (
              <text className={anim.writeIn} x={0} y={y + barH / 2 + 4} fontSize={11} fontWeight={700} fill="var(--text-primary)">{label}</text>
            )}
            {/* Step 1 — draw the empty container partitions */}
            {show(1) &&
              Array.from({ length: den }, (_, s) => (
                <rect key={`c${s}`} className={anim.reveal} x={36 + s * segW} y={y} width={segW - 2} height={barH}
                  fill="var(--bg-elevated)" stroke="var(--border-default)" strokeWidth={1} rx={3} />
              ))}
            {/* Step 2 — fill the numerator parts with colour */}
            {show(2) &&
              Array.from({ length: num }, (_, s) => (
                <rect key={`f${s}`} className={anim.reveal} x={36 + s * segW} y={y} width={segW - 2} height={barH}
                  fill={color} stroke="var(--border-default)" strokeWidth={1} rx={3} />
              ))}
            {/* Step 4 — value caption inside the filled part */}
            {show(4) && (
              <text className={anim.writeIn} x={36 + (num * segW) / 2} y={y + barH / 2 + 4} textAnchor="middle" fontSize={9} fill="white" fontWeight={700}>{num}/{den}</text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
