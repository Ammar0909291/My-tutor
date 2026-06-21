'use client'
// Double-Slit Experiment — Quantum Physics visual (Visual Expansion Sprint).
// Reuses the Sprint R.1 progressive-reveal pattern: one teaching beat per step.
// Steps: 1 source → 2 barrier with two slits → 3 wavefronts → 4 screen →
// 5 interference fringe build-up.

import anim from './visualAnim.module.css'

export function DoubleSlit({ revealStep = Infinity }: { revealStep?: number }) {
  const show = (s: number) => revealStep >= s
  const slitTop = 70, slitBot = 100, barrierX = 150, screenX = 270
  // fringe positions on the screen (y), brighter near the centre
  const fringes = [40, 60, 85, 110, 130]
  return (
    <svg viewBox="0 0 300 170" width="100%" style={{ maxWidth: 340 }} aria-hidden="true">
      {/* Step 1 — coherent source */}
      {show(1) && (
        <g className={anim.reveal}>
          <circle cx={28} cy={85} r={7} fill="#8B5CF6" />
          <text x={28} y={108} textAnchor="middle" fontSize={9} fill="var(--text-secondary)" fontWeight={600}>source</text>
        </g>
      )}
      {/* Step 2 — barrier with two slits */}
      {show(2) && (
        <g className={anim.reveal}>
          <rect x={barrierX - 4} y={10} width={8} height={slitTop - 10} fill="var(--text-secondary)" />
          <rect x={barrierX - 4} y={slitTop + 6} width={8} height={slitBot - slitTop - 12} fill="var(--text-secondary)" />
          <rect x={barrierX - 4} y={slitBot + 6} width={8} height={150 - slitBot} fill="var(--text-secondary)" />
          <text x={barrierX} y={162} textAnchor="middle" fontSize={9} fill="var(--text-secondary)" fontWeight={600}>two slits</text>
        </g>
      )}
      {/* Step 3 — wavefronts emerging from each slit */}
      {show(3) && (
        <g className={anim.reveal}>
          {[1, 2, 3].map((i) => (
            <path key={`a${i}`} d={`M ${barrierX} ${slitTop} q ${18 * i} ${-6 * i} ${36 * i} 0`} fill="none" stroke="#3B9EFF" strokeWidth={1.4} opacity={0.7} pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          ))}
          {[1, 2, 3].map((i) => (
            <path key={`b${i}`} d={`M ${barrierX} ${slitBot} q ${18 * i} ${6 * i} ${36 * i} 0`} fill="none" stroke="#3B9EFF" strokeWidth={1.4} opacity={0.7} pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          ))}
        </g>
      )}
      {/* Step 4 — detection screen */}
      {show(4) && (
        <g className={anim.reveal}>
          <line x1={screenX} y1={20} x2={screenX} y2={150} stroke="var(--text-secondary)" strokeWidth={2} />
          <text x={screenX} y={162} textAnchor="middle" fontSize={9} fill="var(--text-secondary)" fontWeight={600}>screen</text>
        </g>
      )}
      {/* Step 5 — interference pattern (alternating bright bands) */}
      {show(5) && (
        <g className={anim.reveal}>
          {fringes.map((y, i) => {
            const intensity = 1 - Math.abs(i - 2) * 0.28
            return <rect key={y} x={screenX + 3} y={y - 6} width={14} height={12} rx={2} fill="#FF6B5E" opacity={intensity} />
          })}
          {fringes.map((y, i) => {
            const intensity = 1 - Math.abs(i - 2) * 0.28
            return <rect key={`m${y}`} x={screenX + 3} y={170 - y - 6} width={14} height={12} rx={2} fill="#FF6B5E" opacity={intensity} />
          })}
        </g>
      )}
    </svg>
  )
}
