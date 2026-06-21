'use client'
// Stern–Gerlach — Quantum Physics visual (Phase 2 Visual Expansion).
// Builds the spin-measurement experiment: atom beam → inhomogeneous magnet →
// beam splits into spin-up / spin-down → two discrete detector spots. Reuses
// Sprint R.1 progressive reveal.
// Steps: 1 source + beam → 2 magnet field → 3 split paths → 4 detector spots →
//        5 quantization label (only two outcomes).

import anim from './visualAnim.module.css'

export function SternGerlach({ revealStep = Infinity }: { revealStep?: number }) {
  const show = (s: number) => revealStep >= s
  const srcX = 30, magX1 = 95, magX2 = 165, split = 185, screenX = 255
  const midY = 85
  return (
    <svg viewBox="0 0 300 165" width="100%" style={{ maxWidth: 340 }} aria-hidden="true">
      {/* Step 1 — atom source + incoming beam */}
      {show(1) && (
        <g className={anim.reveal}>
          <rect x={srcX - 14} y={midY - 12} width={20} height={24} rx={3} fill="#6B7280" />
          <text x={srcX - 4} y={midY + 26} textAnchor="middle" fontSize={8} fill="var(--text-secondary)">oven</text>
          <line x1={srcX + 8} y1={midY} x2={magX1} y2={midY} stroke="#FF6B5E" strokeWidth={2} pathLength={1} strokeDasharray={1} className={anim.drawLine} />
        </g>
      )}
      {/* Step 2 — inhomogeneous magnetic field */}
      {show(2) && (
        <g className={anim.reveal}>
          <rect x={magX1} y={midY - 30} width={magX2 - magX1} height={20} rx={2} fill="#3B9EFF" opacity={0.55} />
          <rect x={magX1} y={midY + 10} width={magX2 - magX1} height={20} rx={2} fill="#22A06B" opacity={0.55} />
          <text x={(magX1 + magX2) / 2} y={midY - 18} textAnchor="middle" fontSize={10} fill="#fff" fontWeight={700}>N</text>
          <text x={(magX1 + magX2) / 2} y={midY + 24} textAnchor="middle" fontSize={10} fill="#fff" fontWeight={700}>S</text>
          <line x1={magX1} y1={midY} x2={magX2} y2={midY} stroke="#FF6B5E" strokeWidth={2} />
        </g>
      )}
      {/* Step 3 — beam splits into two discrete paths */}
      {show(3) && (
        <g className={anim.reveal}>
          <line x1={magX2} y1={midY} x2={screenX} y2={midY - 38} stroke="#8B5CF6" strokeWidth={2} pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          <line x1={magX2} y1={midY} x2={screenX} y2={midY + 38} stroke="#8B5CF6" strokeWidth={2} pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          <text x={split + 8} y={midY - 30} fontSize={9} fill="#8B5CF6" fontWeight={700}>↑</text>
          <text x={split + 8} y={midY + 40} fontSize={9} fill="#8B5CF6" fontWeight={700}>↓</text>
        </g>
      )}
      {/* Step 4 — two discrete detector spots */}
      {show(4) && (
        <g className={anim.reveal}>
          <line x1={screenX} y1={midY - 52} x2={screenX} y2={midY + 52} stroke="var(--text-secondary)" strokeWidth={2} />
          <circle cx={screenX} cy={midY - 38} r={5} fill="#3B9EFF" />
          <circle cx={screenX} cy={midY + 38} r={5} fill="#22A06B" />
          <text x={screenX + 9} y={midY - 35} fontSize={9} fill="#3B9EFF" fontWeight={700}>+½</text>
          <text x={screenX + 9} y={midY + 41} fontSize={9} fill="#22A06B" fontWeight={700}>−½</text>
        </g>
      )}
      {/* Step 5 — quantization label */}
      {show(5) && (
        <g className={anim.reveal}>
          <text x={150} y={158} textAnchor="middle" fontSize={9} fill="var(--text-secondary)" fontWeight={600}>only two outcomes — spin is quantized, not continuous</text>
        </g>
      )}
    </svg>
  )
}
