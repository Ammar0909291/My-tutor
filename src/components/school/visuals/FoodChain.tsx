'use client'
// Food Chain visual — Sprint BW

const CHAIN = [
  { label: 'Sun', emoji: '☀️', role: 'Energy source' },
  { label: 'Grass', emoji: '🌿', role: 'Producer' },
  { label: 'Grasshopper', emoji: '🦗', role: 'Primary consumer' },
  { label: 'Frog', emoji: '🐸', role: 'Secondary consumer' },
  { label: 'Snake', emoji: '🐍', role: 'Tertiary consumer' },
]

export function FoodChain() {
  const nodeW = 52, nodeH = 52, gap = 18
  const totalW = CHAIN.length * nodeW + (CHAIN.length - 1) * gap
  const svgW = totalW + 20

  return (
    <svg viewBox={`0 0 ${svgW} 90`} width="100%" style={{ maxWidth: 360 }} aria-hidden="true">
      {CHAIN.map(({ label, emoji, role }, i) => {
        const cx = 10 + i * (nodeW + gap) + nodeW / 2
        return (
          <g key={label}>
            {/* arrow between nodes */}
            {i > 0 && (
              <g>
                <line
                  x1={10 + (i - 1) * (nodeW + gap) + nodeW}
                  y1={nodeH / 2 + 2}
                  x2={10 + i * (nodeW + gap)}
                  y2={nodeH / 2 + 2}
                  stroke="var(--coral)"
                  strokeWidth={1.5}
                />
                <polygon
                  points={`${10 + i * (nodeW + gap)},${nodeH / 2 + 2} ${10 + i * (nodeW + gap) - 7},${nodeH / 2 - 3} ${10 + i * (nodeW + gap) - 7},${nodeH / 2 + 7}`}
                  fill="var(--coral)"
                />
              </g>
            )}
            {/* node circle */}
            <circle cx={cx} cy={nodeH / 2 + 2} r={22} fill="var(--bg-elevated)" stroke="var(--border-default)" strokeWidth={1} />
            <text x={cx} y={nodeH / 2 + 8} textAnchor="middle" fontSize={18}>{emoji}</text>
            {/* label */}
            <text x={cx} y={nodeH + 16} textAnchor="middle" fontSize={9} fontWeight={600} fill="var(--text-primary)">{label}</text>
            <text x={cx} y={nodeH + 27} textAnchor="middle" fontSize={8} fill="var(--text-dim)">{role}</text>
          </g>
        )
      })}
    </svg>
  )
}
