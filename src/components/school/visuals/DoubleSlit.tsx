'use client'
// Double-Slit Experiment — Quantum Physics visual (Visual Expansion Sprint).
// Reuses the Sprint R.1 progressive-reveal pattern: one teaching beat per step.
// Steps: 1 source → 2 barrier with two slits → 3 wavefronts → 4 screen →
// 5 detections building the interference pattern dot by dot.

import anim from './visualAnim.module.css'

/** The drawing's geometry (viewBox units). */
export const DOUBLE_SLIT = {
  barrierX: 150, screenX: 270,
  slitTop: 70, slitBot: 100, slitWidth: 12,
  wallTop: 10, wallBottom: 150,
  /** Bright-fringe spacing on the screen, and the screen's centre line (midway between the slits). */
  fringeSpacing: 26, centreY: 85, screenTop: 20, screenBottom: 150,
  detections: 150,
} as const

/** The three solid blocks of the barrier, and the two openings between them. */
export function barrierGeometry() {
  const { slitTop, slitBot, slitWidth, wallTop, wallBottom } = DOUBLE_SLIT
  const h = slitWidth / 2
  const blocks = [
    { y: wallTop, height: slitTop - h - wallTop },
    { y: slitTop + h, height: slitBot - slitTop - slitWidth },
    { y: slitBot + h, height: wallBottom - (slitBot + h) },
  ]
  const openings = [
    { from: blocks[0].y + blocks[0].height, to: blocks[1].y },
    { from: blocks[1].y + blocks[1].height, to: blocks[2].y },
  ]
  return { blocks, openings }
}

/** Relative arrival probability at screen height y: two-slit fringes under a smooth envelope. */
export function fringeIntensity(y: number): number {
  const { centreY, fringeSpacing } = DOUBLE_SLIT
  const d = y - centreY
  return Math.pow(Math.cos((Math.PI * d) / fringeSpacing), 2) * Math.exp(-Math.pow(d / 62, 2))
}

/**
 * The detections: ONE dot per detection (an electron, or a single photon), each drawn at a place chosen with the
 * wave's intensity as its probability, so the fringes are visible only in how the dots
 * pile up — the Educational Brain's point ("each electron arrives as ONE localized dot…
 * only the accumulated PATTERN builds up an interference pattern"). Deterministic (a
 * fixed-seed generator), so the picture is the same on every render.
 */
export function detectionDots(): Array<{ x: number; y: number }> {
  const { screenX, screenTop, screenBottom, detections } = DOUBLE_SLIT
  let seed = 20260710
  const rand = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296 }
  const dots: Array<{ x: number; y: number }> = []
  while (dots.length < detections) {
    const y = screenTop + rand() * (screenBottom - screenTop)
    if (rand() < fringeIntensity(y)) dots.push({ x: screenX + 3 + rand() * 14, y })
  }
  return dots
}

export function DoubleSlit({ revealStep = Infinity }: { revealStep?: number }) {
  const show = (s: number) => revealStep >= s
  const { barrierX, screenX, slitTop, slitBot, screenTop, screenBottom } = DOUBLE_SLIT
  const { blocks } = barrierGeometry()
  const dots = detectionDots()
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
          {blocks.map((b) => (
            <rect key={b.y} x={barrierX - 4} y={b.y} width={8} height={b.height} fill="var(--text-secondary)" />
          ))}
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
          <line x1={screenX} y1={screenTop} x2={screenX} y2={screenBottom} stroke="var(--text-secondary)" strokeWidth={2} />
          <text x={screenX} y={162} textAnchor="middle" fontSize={9} fill="var(--text-secondary)" fontWeight={600}>screen</text>
        </g>
      )}
      {/* Step 5 — the particles arrive one by one; the pile-up is the interference pattern */}
      {show(5) && (
        <g className={anim.reveal}>
          {dots.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={1.5} fill="#FF6B5E" opacity={0.85} />
          ))}
          <text x={20} y={22} fontSize={9} fill="#FF6B5E" fontWeight={700}>one dot = one detection</text>
          <text x={20} y={34} fontSize={8} fill="var(--text-secondary)" fontWeight={600}>wave sets where dots land</text>
        </g>
      )}
    </svg>
  )
}
