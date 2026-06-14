'use client'
// Water Cycle visual — Sprint BW

export function WaterCycle() {
  return (
    <svg viewBox="0 0 300 160" width="100%" style={{ maxWidth: 320 }} aria-hidden="true">
      {/* sky */}
      <rect x={0} y={0} width={300} height={160} fill="none" />
      {/* ground */}
      <rect x={0} y={120} width={300} height={40} rx={0} fill="var(--bg-elevated)" opacity={0.5} />
      {/* mountain */}
      <polygon points="60,120 120,40 180,120" fill="var(--bg-surface)" stroke="var(--border-default)" strokeWidth={1} />
      {/* sun */}
      <circle cx={260} cy={28} r={18} fill="none" stroke="#E3B341" strokeWidth={2} />
      <text x={260} y={33} textAnchor="middle" fontSize={14}>☀️</text>
      {/* cloud */}
      <ellipse cx={100} cy={22} rx={30} ry={14} fill="var(--bg-surface)" stroke="var(--border-default)" strokeWidth={1} />
      <text x={100} y={27} textAnchor="middle" fontSize={10} fill="var(--text-dim)">☁️</text>
      {/* evaporation arrow — up from water body */}
      <path d="M 240 100 C 240 60 200 40 130 30" stroke="var(--coral)" strokeWidth={1.5} fill="none" strokeDasharray="4,3" markerEnd="url(#arr)" />
      {/* precipitation arrow — down from cloud */}
      <path d="M 80 36 C 70 60 60 90 50 120" stroke="#3B82F6" strokeWidth={1.5} fill="none" markerEnd="url(#arrB)" />
      {/* runoff arrow */}
      <path d="M 180 120 C 200 125 220 122 240 120" stroke="#3B82F6" strokeWidth={1.5} fill="none" markerEnd="url(#arrB)" />
      {/* water body */}
      <ellipse cx={240} cy={118} rx={40} ry={8} fill="#3B82F6" opacity={0.25} />
      <text x={240} y={120} textAnchor="middle" fontSize={10} fill="#3B82F6">💧</text>
      {/* labels */}
      <text x={185} y={52} fontSize={9} fill="var(--coral)" fontWeight={600}>Evaporation</text>
      <text x={22} y={80} fontSize={9} fill="#3B82F6" fontWeight={600}>Precipitation</text>
      <text x={188} y={140} fontSize={9} fill="#3B82F6" fontWeight={600}>Runoff</text>
      {/* arrowhead markers */}
      <defs>
        <marker id="arr" markerWidth={7} markerHeight={7} refX={3} refY={3.5} orient="auto">
          <polygon points="0,0 7,3.5 0,7" fill="var(--coral)" />
        </marker>
        <marker id="arrB" markerWidth={7} markerHeight={7} refX={3} refY={3.5} orient="auto">
          <polygon points="0,0 7,3.5 0,7" fill="#3B82F6" />
        </marker>
      </defs>
    </svg>
  )
}
