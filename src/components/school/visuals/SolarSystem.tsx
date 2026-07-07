'use client'
// Solar System visual — Sprint BW · animated Sprint R.1

import anim from './visualAnim.module.css'

const PLANETS = [
  { name: 'Mercury', r: 22,  emoji: '⚫', color: '#888' },
  { name: 'Venus',   r: 36,  emoji: '🟡', color: '#D4A017' },
  { name: 'Earth',   r: 52,  emoji: '🌍', color: '#4A90D9' },
  { name: 'Mars',    r: 68,  emoji: '🔴', color: '#C1440E' },
  { name: 'Jupiter', r: 90,  emoji: '🟠', color: '#C99039' },
  { name: 'Saturn',  r: 112, emoji: '🪐', color: '#AA8855' },
]

export function SolarSystem({ revealStep = Infinity }: { revealStep?: number }) {
  const cx = 118, cy = 118, size = 236
  const show = (s: number) => revealStep >= s

  return (
    <svg viewBox={`0 0 ${size} ${size + 24}`} width="100%" style={{ maxWidth: 260 }} aria-hidden="true">
      {/* Step 1 — orbital paths */}
      {show(1) &&
        PLANETS.map(({ name, r, color }) => (
          <circle key={`orbit-${name}`} className={anim.reveal} cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={0.8} opacity={0.5} />
        ))}
      {/* Step 2 — the sun */}
      {show(2) && (
        <g className={anim.reveal}>
          <circle cx={cx} cy={cy} r={10} fill="#E3B341" />
          <text x={cx} y={cy + 4} textAnchor="middle" fontSize={10}>☀️</text>
        </g>
      )}
      {/* Step 3 — the planets along their orbits */}
      {show(3) &&
        PLANETS.map(({ name, r, emoji }, i) => (
          <g key={name} className={anim.reveal} style={{ animationDelay: `${i * 60}ms` }}>
            <text x={cx + r} y={cy + 4} textAnchor="middle" fontSize={11}>{emoji}</text>
            <text x={cx + r} y={cy + r * 0.18 + 16} textAnchor="middle" fontSize={7} fill="var(--text-dim)">{name}</text>
          </g>
        ))}
      {show(3) && (
        <text className={anim.writeIn} x={cx} y={size + 18} textAnchor="middle" fontSize={9} fill="var(--text-dim)">Not to scale — inner planets shown</text>
      )}
    </svg>
  )
}
