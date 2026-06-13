'use client'
// Coordinate Plane — Sprint BW

export function CoordinatePlane() {
  const size = 200, mid = size / 2, step = 20

  const ticks = [-4, -3, -2, -1, 1, 2, 3, 4]

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" style={{ maxWidth: 220 }} aria-hidden="true">
      {/* grid lines */}
      {ticks.map((t) => (
        <g key={t}>
          <line x1={mid + t * step} y1={8} x2={mid + t * step} y2={size - 8} stroke="var(--border-subtle)" strokeWidth={0.5} />
          <line x1={8} y1={mid + t * step} x2={size - 8} y2={mid + t * step} stroke="var(--border-subtle)" strokeWidth={0.5} />
        </g>
      ))}
      {/* axes */}
      <line x1={8} y1={mid} x2={size - 8} y2={mid} stroke="var(--text-secondary)" strokeWidth={1.5} />
      <line x1={mid} y1={8} x2={mid} y2={size - 8} stroke="var(--text-secondary)" strokeWidth={1.5} />
      {/* arrowheads */}
      <polygon points={`${size - 8},${mid} ${size - 14},${mid - 4} ${size - 14},${mid + 4}`} fill="var(--text-secondary)" />
      <polygon points={`${mid},8 ${mid - 4},14 ${mid + 4},14`} fill="var(--text-secondary)" />
      {/* tick labels */}
      {ticks.map((t) => (
        <g key={`lbl${t}`}>
          <text x={mid + t * step} y={mid + 14} textAnchor="middle" fontSize={8} fill="var(--text-dim)">{t}</text>
          <text x={mid - 10} y={mid - t * step + 3} textAnchor="middle" fontSize={8} fill="var(--text-dim)">{t}</text>
        </g>
      ))}
      {/* axis labels */}
      <text x={size - 6} y={mid - 6} fontSize={11} fontWeight={700} fill="var(--coral)">x</text>
      <text x={mid + 6} y={12} fontSize={11} fontWeight={700} fill="var(--coral)">y</text>
      {/* origin */}
      <text x={mid - 10} y={mid + 14} fontSize={8} fill="var(--text-dim)">0</text>
      {/* example point */}
      <circle cx={mid + 2 * step} cy={mid - 3 * step} r={4} fill="var(--coral)" />
      <text x={mid + 2 * step + 6} y={mid - 3 * step - 4} fontSize={9} fill="var(--coral)" fontWeight={700}>(2,3)</text>
    </svg>
  )
}
