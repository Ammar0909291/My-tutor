'use client'
// Geometry Shapes — Sprint BW

export function GeometryShapes() {
  return (
    <svg viewBox="0 0 300 100" width="100%" style={{ maxWidth: 320 }} aria-hidden="true">
      {/* Triangle */}
      <polygon points="50,10 10,85 90,85" fill="none" stroke="var(--coral)" strokeWidth={2} />
      <text x={50} y={95} textAnchor="middle" fontSize={10} fill="var(--text-secondary)">Triangle</text>
      <text x={50} y={50} textAnchor="middle" fontSize={8} fill="var(--text-dim)">3 sides</text>

      {/* Rectangle */}
      <rect x={110} y={20} width={80} height={55} fill="none" stroke="var(--coral)" strokeWidth={2} rx={2} />
      <text x={150} y={95} textAnchor="middle" fontSize={10} fill="var(--text-secondary)">Rectangle</text>
      {/* right angle marker */}
      <path d="M 110 65 L 122 65 L 122 75" fill="none" stroke="var(--coral)" strokeWidth={1.5} />

      {/* Circle */}
      <circle cx={250} cy={47} r={35} fill="none" stroke="var(--coral)" strokeWidth={2} />
      <line x1={250} y1={47} x2={285} y2={47} stroke="var(--text-dim)" strokeWidth={1} strokeDasharray="3,2" />
      <text x={267} y={44} fontSize={8} fill="var(--text-dim)">r</text>
      <text x={250} y={95} textAnchor="middle" fontSize={10} fill="var(--text-secondary)">Circle</text>

      {/* angle label on triangle */}
      <text x={50} y={80} textAnchor="middle" fontSize={8} fill="var(--text-dim)">∠A + ∠B + ∠C = 180°</text>
    </svg>
  )
}
