'use client'
// Force Diagram — Sprint BW · animated Sprint R.1
// Reveals one force arrow per step so each force is taught individually.

import anim from './visualAnim.module.css'

export function ForceDiagram({ revealStep = Infinity }: { revealStep?: number }) {
  const cx = 150, cy = 90, boxW = 60, boxH = 40
  const show = (s: number) => revealStep >= s

  return (
    <svg viewBox="0 0 300 170" width="100%" style={{ maxWidth: 320 }} aria-hidden="true">
      {/* Step 1 — ground + object */}
      {show(1) && (
        <g className={anim.reveal}>
          <line x1={40} y1={130} x2={260} y2={130} stroke="var(--text-secondary)" strokeWidth={2} />
          {[50, 70, 90, 110, 130, 150, 170, 190, 210, 230, 250].map((x) => (
            <line key={x} x1={x} y1={130} x2={x - 8} y2={140} stroke="var(--text-secondary)" strokeWidth={1} />
          ))}
          <rect x={cx - boxW / 2} y={cy - boxH / 2} width={boxW} height={boxH} rx={4} fill="var(--bg-elevated)" stroke="#FF6B5E" strokeWidth={2} />
          <text x={cx} y={cy + 5} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--text-primary)">Object</text>
        </g>
      )}
      {/* Step 2 — Applied force */}
      {show(2) && (
        <g className={anim.reveal}>
          <line x1={cx + boxW / 2} y1={cy} x2={cx + boxW / 2 + 45} y2={cy} stroke="#22A06B" strokeWidth={2.5} markerEnd="url(#gArr)" pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          <text x={cx + boxW / 2 + 22} y={cy - 7} textAnchor="middle" fontSize={10} fill="#22A06B" fontWeight={600}>Applied</text>
        </g>
      )}
      {/* Step 3 — Friction */}
      {show(3) && (
        <g className={anim.reveal}>
          <line x1={cx - boxW / 2} y1={cy} x2={cx - boxW / 2 - 40} y2={cy} stroke="#3B82F6" strokeWidth={2.5} markerEnd="url(#bArr)" pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          <text x={cx - boxW / 2 - 20} y={cy - 7} textAnchor="middle" fontSize={10} fill="#3B82F6" fontWeight={600}>Friction</text>
        </g>
      )}
      {/* Step 4 — Weight */}
      {show(4) && (
        <g className={anim.reveal}>
          <line x1={cx} y1={cy + boxH / 2} x2={cx} y2={cy + boxH / 2 + 35} stroke="#FF6B5E" strokeWidth={2.5} markerEnd="url(#rArr)" pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          <text x={cx + 25} y={cy + boxH / 2 + 22} textAnchor="middle" fontSize={10} fill="#FF6B5E" fontWeight={600}>Weight (W=mg)</text>
        </g>
      )}
      {/* Step 5 — Normal */}
      {show(5) && (
        <g className={anim.reveal}>
          <line x1={cx} y1={cy - boxH / 2} x2={cx} y2={cy - boxH / 2 - 35} stroke="#8B5CF6" strokeWidth={2.5} markerEnd="url(#pArr)" pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          <text x={cx + 22} y={cy - boxH / 2 - 18} textAnchor="middle" fontSize={10} fill="#8B5CF6" fontWeight={600}>Normal (N)</text>
        </g>
      )}

      <defs>
        <marker id="gArr" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto"><polygon points="0,0 8,4 0,8" fill="#22A06B" /></marker>
        <marker id="bArr" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto"><polygon points="8,0 0,4 8,8" fill="#3B82F6" /></marker>
        <marker id="rArr" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto"><polygon points="0,0 8,4 0,8" fill="#FF6B5E" /></marker>
        <marker id="pArr" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto"><polygon points="0,8 8,4 0,0" fill="#8B5CF6" /></marker>
      </defs>
    </svg>
  )
}
