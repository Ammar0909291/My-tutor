'use client'
// Number Line visual — Sprint BW · animated Sprint R.1

import anim from './visualAnim.module.css'

const COLOR = '#FF6B5E'

export function NumberLine({ revealStep = Infinity }: { revealStep?: number }) {
  const min = -5, max = 5, width = 300, height = 60
  const cx = (n: number) => ((n - min) / (max - min)) * (width - 40) + 20
  const midY = height / 2
  const show = (s: number) => revealStep >= s

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{ maxWidth: 320 }} aria-hidden="true">
      {/* Step 1 — draw the line + arrowheads */}
      {show(1) && (
        <g className={anim.reveal}>
          <line x1={18} y1={midY} x2={width - 18} y2={midY} stroke="var(--text-secondary)" strokeWidth={1.5}
            pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          <polygon points={`${width - 18},${midY} ${width - 26},${midY - 4} ${width - 26},${midY + 4}`} fill="var(--text-secondary)" />
          <polygon points={`18,${midY} 26,${midY - 4} 26,${midY + 4}`} fill="var(--text-secondary)" />
        </g>
      )}
      {/* Step 2 — add tick markers */}
      {show(2) &&
        Array.from({ length: max - min + 1 }, (_, i) => min + i).map((n) => (
          <line key={`t${n}`} className={anim.reveal} x1={cx(n)} y1={midY - 5} x2={cx(n)} y2={midY + 5}
            stroke="var(--text-secondary)" strokeWidth={n === 0 ? 2 : 1} />
        ))}
      {/* Step 3 — reveal number labels */}
      {show(3) &&
        Array.from({ length: max - min + 1 }, (_, i) => min + i).map((n) => (
          <text key={`l${n}`} className={anim.writeIn} x={cx(n)} y={midY + 18} textAnchor="middle" fontSize={10}
            fill={n === 0 ? COLOR : 'var(--text-primary)'} fontWeight={n === 0 ? 700 : 400}>{n}</text>
        ))}
      {/* Step 4 — highlight the zero / target point */}
      {show(4) && <circle className={anim.reveal} cx={cx(0)} cy={midY} r={4} fill={COLOR} />}
    </svg>
  )
}
