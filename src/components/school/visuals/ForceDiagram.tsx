'use client'
// Force Diagram — Sprint BW · animated Sprint R.1
// Reveals one force arrow per step so each force is taught individually.

import anim from './visualAnim.module.css'
import { useLanguage } from '@/components/ui/LanguageToggle'

/**
 * The drawing's geometry, as numbers, so a test can ask what is drawn.
 *
 * Three things the first version got wrong, each measured in the rendered card:
 *  - the friction arrow-head pointed AT the object, i.e. the same way as the applied
 *    force (its marker was drawn pointing left and `orient="auto"` then turned it
 *    around again for a leftward line) — friction appeared to help, not oppose;
 *  - the applied arrow (45) was longer than the friction arrow (40), so the diagram
 *    showed an unbalanced body, which is the wrong picture for Static Equilibrium and
 *    for friction holding a body still;
 *  - the body floated 20 units above the ground, so the "normal force from the surface"
 *    had no contact to come from.
 * And one thing the first FIX got wrong, seen only in the deployed page: seating the body on the ground
 * (y = 130) pushed the weight arrow's head 5 units past the bottom of the 170-unit drawing, where it was
 * cut flat. Each arrow's head extends HEAD_REACH beyond the end of its line (markers scale with the
 * stroke), so the ground is now 120 and every head lies inside the drawing.
 */
export const FORCE_DIAGRAM = {
  cx: 150, boxW: 60, boxH: 40,
  /** The ground line; the body's underside sits ON it. */
  groundY: 120,
  /** One arrow length per force pair, so equal pairs read as balanced. */
  horizontalLen: 45, verticalLen: 35,
  /** The drawing's own size (its viewBox). */
  width: 300, height: 170,
  /** How far an arrow-head's tip lies beyond the end of its line: marker 8 units x stroke 2.5, half of it past the ref point. */
  headReach: 10,
} as const

/** A horizontal arrow's label sits this far above its line — clear of the 20-unit arrow-head (markers scale with stroke width). */
const LABEL_LIFT = 13

export function ForceDiagram({ revealStep = Infinity }: { revealStep?: number }) {
  const { t } = useLanguage()
  const { cx, boxW, boxH, groundY, horizontalLen, verticalLen } = FORCE_DIAGRAM
  const cy = groundY - boxH / 2
  const show = (s: number) => revealStep >= s

  return (
    <svg viewBox={`0 0 ${FORCE_DIAGRAM.width} ${FORCE_DIAGRAM.height}`} width="100%" style={{ maxWidth: 320 }} aria-hidden="true">
      {/* Step 1 — ground + object */}
      {show(1) && (
        <g className={anim.reveal}>
          <line x1={40} y1={groundY} x2={260} y2={groundY} stroke="var(--text-secondary)" strokeWidth={2} />
          {[50, 70, 90, 110, 130, 150, 170, 190, 210, 230, 250].map((x) => (
            <line key={x} x1={x} y1={groundY} x2={x - 8} y2={groundY + 10} stroke="var(--text-secondary)" strokeWidth={1} />
          ))}
          <rect x={cx - boxW / 2} y={cy - boxH / 2} width={boxW} height={boxH} rx={4} fill="var(--bg-elevated)" stroke="#FF6B5E" strokeWidth={2} />
          <text x={cx} y={cy + 5} textAnchor="middle" fontSize={11} fontWeight={700} fill="var(--text-primary)">{t('viz_object')}</text>
        </g>
      )}
      {/* Step 2 — Applied force */}
      {show(2) && (
        <g className={anim.reveal}>
          <line x1={cx + boxW / 2} y1={cy} x2={cx + boxW / 2 + horizontalLen} y2={cy} stroke="#22A06B" strokeWidth={2.5} markerEnd="url(#gArr)" pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          <text x={cx + boxW / 2 + horizontalLen / 2} y={cy - LABEL_LIFT} textAnchor="middle" fontSize={10} fill="#22A06B" fontWeight={600}>{t('viz_applied')}</text>
        </g>
      )}
      {/* Step 3 — Friction */}
      {show(3) && (
        <g className={anim.reveal}>
          <line x1={cx - boxW / 2} y1={cy} x2={cx - boxW / 2 - horizontalLen} y2={cy} stroke="#3B82F6" strokeWidth={2.5} markerEnd="url(#bArr)" pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          <text x={cx - boxW / 2 - horizontalLen / 2} y={cy - LABEL_LIFT} textAnchor="middle" fontSize={10} fill="#3B82F6" fontWeight={600}>{t('viz_friction')}</text>
        </g>
      )}
      {/* Step 4 — Weight */}
      {show(4) && (
        <g className={anim.reveal}>
          <line x1={cx} y1={cy + boxH / 2} x2={cx} y2={cy + boxH / 2 + verticalLen} stroke="#FF6B5E" strokeWidth={2.5} markerEnd="url(#rArr)" pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          <text x={cx + 44} y={cy + boxH / 2 + 28} textAnchor="middle" fontSize={10} fill="#FF6B5E" fontWeight={600}>Weight (W=mg)</text>
        </g>
      )}
      {/* Step 5 — Normal */}
      {show(5) && (
        <g className={anim.reveal}>
          <line x1={cx} y1={cy - boxH / 2} x2={cx} y2={cy - boxH / 2 - verticalLen} stroke="#8B5CF6" strokeWidth={2.5} markerEnd="url(#pArr)" pathLength={1} strokeDasharray={1} className={anim.drawLine} />
          <text x={cx + 22} y={cy - boxH / 2 - 18} textAnchor="middle" fontSize={10} fill="#8B5CF6" fontWeight={600}>{t('viz_normal')}</text>
        </g>
      )}

      <defs>
        <marker id="gArr" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto"><polygon points="0,0 8,4 0,8" fill="#22A06B" /></marker>
        {/* Points along +x like every other marker here: orient="auto" turns it to follow the line (leftward for friction). */}
        <marker id="bArr" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto"><polygon points="0,0 8,4 0,8" fill="#3B82F6" /></marker>
        <marker id="rArr" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto"><polygon points="0,0 8,4 0,8" fill="#FF6B5E" /></marker>
        <marker id="pArr" markerWidth={8} markerHeight={8} refX={4} refY={4} orient="auto"><polygon points="0,8 8,4 0,0" fill="#8B5CF6" /></marker>
      </defs>
    </svg>
  )
}
