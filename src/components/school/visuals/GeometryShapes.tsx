'use client'
// Geometry Shapes — Sprint BW · animated Sprint R.1

import anim from './visualAnim.module.css'

const TRI = '#FF6B5E', RECT = '#8B5CF6', CIRC = '#22A06B'

export function GeometryShapes({ revealStep = Infinity }: { revealStep?: number }) {
  const show = (s: number) => revealStep >= s
  return (
    <svg viewBox="0 0 300 100" width="100%" style={{ maxWidth: 320 }} aria-hidden="true">
      {/* Step 1 — draw the shape outlines */}
      {show(1) && (
        <g className={anim.reveal}>
          <polygon points="50,10 10,85 90,85" fill="none" stroke={TRI} strokeWidth={2} />
          <rect x={110} y={20} width={80} height={55} fill="none" stroke={RECT} strokeWidth={2} rx={2} />
          <circle cx={250} cy={47} r={35} fill="none" stroke={CIRC} strokeWidth={2} />
        </g>
      )}
      {/* Step 2 — reveal dimension markers */}
      {show(2) && (
        <g className={anim.reveal}>
          <path d="M 110 65 L 122 65 L 122 75" fill="none" stroke={RECT} strokeWidth={1.5} />
          <line x1={250} y1={47} x2={285} y2={47} stroke={CIRC} strokeWidth={1} strokeDasharray="3,2" />
          <text x={267} y={44} fontSize={8} fill={CIRC}>r</text>
          <text x={50} y={50} textAnchor="middle" fontSize={8} fill="var(--text-dim)">3 sides</text>
        </g>
      )}
      {/* Step 3 — name each shape */}
      {show(3) && (
        <g className={anim.writeIn}>
          <text x={50} y={95} textAnchor="middle" fontSize={10} fill="var(--text-secondary)">Triangle</text>
          <text x={150} y={95} textAnchor="middle" fontSize={10} fill="var(--text-secondary)">Rectangle</text>
          <text x={250} y={95} textAnchor="middle" fontSize={10} fill="var(--text-secondary)">Circle</text>
        </g>
      )}
      {/* Step 4 — reveal the formula / key fact */}
      {show(4) && (
        <text className={anim.writeIn} x={50} y={80} textAnchor="middle" fontSize={8} fill="var(--text-dim)">∠A + ∠B + ∠C = 180°</text>
      )}
    </svg>
  )
}
