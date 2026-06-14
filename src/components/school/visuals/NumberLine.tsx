'use client'
// Number Line visual — Sprint BW

export function NumberLine() {
  const min = -5, max = 5, width = 300, height = 60
  const cx = (n: number) => ((n - min) / (max - min)) * (width - 40) + 20
  const midY = height / 2

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{ maxWidth: 320 }} aria-hidden="true">
      {/* axis */}
      <line x1={18} y1={midY} x2={width - 18} y2={midY} stroke="var(--text-secondary)" strokeWidth={1.5} />
      {/* arrowheads */}
      <polygon points={`${width - 18},${midY} ${width - 26},${midY - 4} ${width - 26},${midY + 4}`} fill="var(--text-secondary)" />
      <polygon points={`18,${midY} 26,${midY - 4} 26,${midY + 4}`} fill="var(--text-secondary)" />
      {/* ticks + labels */}
      {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((n) => (
        <g key={n}>
          <line x1={cx(n)} y1={midY - 5} x2={cx(n)} y2={midY + 5} stroke="var(--text-secondary)" strokeWidth={n === 0 ? 2 : 1} />
          <text x={cx(n)} y={midY + 18} textAnchor="middle" fontSize={10} fill={n === 0 ? 'var(--coral)' : 'var(--text-primary)'} fontWeight={n === 0 ? 700 : 400}>{n}</text>
        </g>
      ))}
      {/* zero highlight */}
      <circle cx={cx(0)} cy={midY} r={4} fill="var(--coral)" />
    </svg>
  )
}
