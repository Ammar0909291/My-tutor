'use client'
// Fraction Bar visual — Sprint BW

const EXAMPLES = [
  { label: '1/2', num: 1, den: 2 },
  { label: '3/4', num: 3, den: 4 },
  { label: '2/3', num: 2, den: 3 },
]

export function FractionBar() {
  const w = 280, barH = 22, gap = 12, startY = 8

  return (
    <svg viewBox={`0 0 ${w} ${EXAMPLES.length * (barH + gap) + startY + 4}`} width="100%" style={{ maxWidth: 300 }} aria-hidden="true">
      {EXAMPLES.map(({ label, num, den }, i) => {
        const y = startY + i * (barH + gap)
        const segW = (w - 48) / den
        return (
          <g key={label}>
            {/* label */}
            <text x={0} y={y + barH / 2 + 4} fontSize={11} fontWeight={700} fill="var(--text-primary)">{label}</text>
            {/* segments */}
            {Array.from({ length: den }, (_, s) => (
              <rect key={s} x={36 + s * segW} y={y} width={segW - 2} height={barH}
                fill={s < num ? 'var(--coral)' : 'var(--bg-elevated)'}
                stroke="var(--border-default)" strokeWidth={1} rx={3} />
            ))}
            {/* fraction text inside filled part */}
            <text x={36 + (num * segW) / 2} y={y + barH / 2 + 4} textAnchor="middle" fontSize={9} fill="white" fontWeight={700}>{num}/{den}</text>
          </g>
        )
      })}
    </svg>
  )
}
