'use client'
// Coordinate Plane — Sprint BW · animated Sprint R.1

import anim from './visualAnim.module.css'

const COLOR = '#FF6B5E'
/** A tick numeral sits ON a grid line (every x tick under its vertical line, every y tick on its horizontal one): a halo in the card surface colour keeps the line from striking through it (Mathematics render audit LY-02, math.alg.polynomial / quadratic-equation). */
/** The origin "0" sits just RIGHT of the y axis, under the x axis: at x = mid − 10 it collided with the x tick "−1" in the lesson page's font (render audit LY-01, lesson-scope pass). */
const HALO = { stroke: 'var(--bg-surface)', strokeWidth: 3, paintOrder: 'stroke' } as const

export function CoordinatePlane({ revealStep = Infinity }: { revealStep?: number }) {
  const size = 200, mid = size / 2, step = 20
  const ticks = [-4, -3, -2, -1, 1, 2, 3, 4]
  const show = (s: number) => revealStep >= s

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" style={{ maxWidth: 220 }} aria-hidden="true">
      {/* Step 2 — graph-paper grid (painted behind axes) */}
      {show(2) &&
        ticks.map((t) => (
          <g key={t} className={anim.reveal}>
            <line x1={mid + t * step} y1={8} x2={mid + t * step} y2={size - 8} stroke="#8B5CF6" strokeWidth={0.5} opacity={0.5} />
            <line x1={8} y1={mid + t * step} x2={size - 8} y2={mid + t * step} stroke="#8B5CF6" strokeWidth={0.5} opacity={0.5} />
          </g>
        ))}
      {/* Step 1 — draw the axes */}
      {show(1) && (
        <g className={anim.reveal}>
          <line x1={8} y1={mid} x2={size - 8} y2={mid} stroke="var(--text-secondary)" strokeWidth={1.5} pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          <line x1={mid} y1={8} x2={mid} y2={size - 8} stroke="var(--text-secondary)" strokeWidth={1.5} pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          <polygon points={`${size - 8},${mid} ${size - 14},${mid - 4} ${size - 14},${mid + 4}`} fill="var(--text-secondary)" />
          <polygon points={`${mid},8 ${mid - 4},14 ${mid + 4},14`} fill="var(--text-secondary)" />
          <text x={size - 6} y={mid - 6} fontSize={11} fontWeight={700} fill={COLOR}>x</text>
          <text x={mid + 6} y={12} fontSize={11} fontWeight={700} fill={COLOR}>y</text>
        </g>
      )}
      {/* Step 3 — tick labels */}
      {show(3) &&
        ticks.map((t) => (
          <g key={`lbl${t}`} className={anim.writeIn}>
            <text x={mid + t * step} y={mid + 14} textAnchor="middle" fontSize={8} fill="var(--text-dim)" {...HALO}>{t}</text>
            <text x={mid - 10} y={mid - t * step + 3} textAnchor="middle" fontSize={8} fill="var(--text-dim)" {...HALO}>{t}</text>
          </g>
        ))}
      {show(3) && <text className={anim.writeIn} x={mid + 4} y={mid + 14} fontSize={8} fill="var(--text-dim)" {...HALO}>0</text>}
      {/* Step 4 — plot the example point */}
      {show(4) && <circle className={anim.reveal} cx={mid + 2 * step} cy={mid - 3 * step} r={4} fill={COLOR} />}
      {/* Step 5 — reveal its coordinate label */}
      {show(5) && (
        <text className={anim.writeIn} x={mid + 2 * step + 6} y={mid - 3 * step - 4} fontSize={9} fill={COLOR} fontWeight={700}>(2,3)</text>
      )}
    </svg>
  )
}
