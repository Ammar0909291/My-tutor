'use client'
// Food Chain visual — Sprint BW · animated Sprint R.1
// Reveals one node (and the arrow leading into it) per step, so students follow the flow.

import anim from './visualAnim.module.css'

const CHAIN = [
  { label: 'Sun', emoji: '☀️', role: 'Energy source', color: '#E3B341' },
  { label: 'Grass', emoji: '🌿', role: 'Producer', color: '#22A06B' },
  { label: 'Grasshopper', emoji: '🦗', role: 'Primary consumer', color: '#7CB342' },
  { label: 'Frog', emoji: '🐸', role: 'Secondary consumer', color: '#26A69A' },
  { label: 'Snake', emoji: '🐍', role: 'Tertiary consumer', color: '#8B5CF6' },
]

export function FoodChain({ revealStep = Infinity }: { revealStep?: number }) {
  const nodeW = 52, nodeH = 52, gap = 18
  const totalW = CHAIN.length * nodeW + (CHAIN.length - 1) * gap
  const svgW = totalW + 20
  const show = (s: number) => revealStep >= s

  return (
    <svg viewBox={`0 0 ${svgW} 90`} width="100%" style={{ maxWidth: 360 }} aria-hidden="true">
      {CHAIN.map(({ label, emoji, role, color }, i) => {
        if (!show(i + 1)) return null
        const cx = 10 + i * (nodeW + gap) + nodeW / 2
        return (
          <g key={label} className={anim.reveal}>
            {/* arrow leading into this node */}
            {i > 0 && (
              <g>
                <line
                  x1={10 + (i - 1) * (nodeW + gap) + nodeW}
                  y1={nodeH / 2 + 2}
                  x2={10 + i * (nodeW + gap)}
                  y2={nodeH / 2 + 2}
                  stroke="#FF6B5E"
                  strokeWidth={1.5}
                  pathLength={1}
                  strokeDasharray={1}
                  className={anim.drawLine}
                />
                <polygon
                  points={`${10 + i * (nodeW + gap)},${nodeH / 2 + 2} ${10 + i * (nodeW + gap) - 7},${nodeH / 2 - 3} ${10 + i * (nodeW + gap) - 7},${nodeH / 2 + 7}`}
                  fill="#FF6B5E"
                />
              </g>
            )}
            <circle cx={cx} cy={nodeH / 2 + 2} r={22} fill="var(--bg-elevated)" stroke={color} strokeWidth={2} />
            <text x={cx} y={nodeH / 2 + 8} textAnchor="middle" fontSize={18}>{emoji}</text>
            <text x={cx} y={nodeH + 16} textAnchor="middle" fontSize={9} fontWeight={600} fill="var(--text-primary)">{label}</text>
            <text x={cx} y={nodeH + 27} textAnchor="middle" fontSize={8} fill="var(--text-dim)">{role}</text>
          </g>
        )
      })}
    </svg>
  )
}
