'use client'
// Solar System visual — Sprint BW

const PLANETS = [
  { name: 'Mercury', r: 22,  emoji: '⚫', color: '#888' },
  { name: 'Venus',   r: 36,  emoji: '🟡', color: '#D4A' },
  { name: 'Earth',   r: 52,  emoji: '🌍', color: '#4A9' },
  { name: 'Mars',    r: 68,  emoji: '🔴', color: '#C64' },
  { name: 'Jupiter', r: 90,  emoji: '🟠', color: '#C96' },
  { name: 'Saturn',  r: 112, emoji: '🪐', color: '#AA8' },
]

export function SolarSystem() {
  const cx = 118, cy = 118, size = 236

  return (
    <svg viewBox={`0 0 ${size} ${size + 24}`} width="100%" style={{ maxWidth: 260 }} aria-hidden="true">
      {/* orbits */}
      {PLANETS.map(({ name, r, color }) => (
        <circle key={`orbit-${name}`} cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={0.5} opacity={0.4} />
      ))}
      {/* sun */}
      <circle cx={cx} cy={cy} r={10} fill="#E3B341" />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize={10}>☀️</text>
      {/* planets — fixed position on orbit (right side for clarity) */}
      {PLANETS.map(({ name, r, emoji }) => (
        <g key={name}>
          <text x={cx + r} y={cy + 4} textAnchor="middle" fontSize={11}>{emoji}</text>
          <text x={cx + r} y={cy + r * 0.18 + 16} textAnchor="middle" fontSize={7} fill="var(--text-dim)">{name}</text>
        </g>
      ))}
      {/* legend note */}
      <text x={cx} y={size + 18} textAnchor="middle" fontSize={9} fill="var(--text-dim)">Not to scale — inner planets shown</text>
    </svg>
  )
}
