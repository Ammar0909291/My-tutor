'use client'
/**
 * Client half of the physics audit page: mounts the payload exactly as
 * LessonScreen does, inside the same VISUAL_FRAME box. See page.tsx.
 */
import { SceneSpecFigure } from '@/components/school/visuals/SceneSpecFigure'
import { VisualCard } from '@/components/school/visuals/VisualCard'
import { VisualRenderer } from '@/components/visuals/VisualRenderer'
import type { VisualPayload } from '@/lib/teaching/visual/types'

// LessonScreen's VISUAL_FRAME, verbatim (src/components/learn/LessonScreen.tsx).
const VISUAL_FRAME: React.CSSProperties = {
  width: '100%',
  maxWidth: 'min(100%, 720px)',
}

export function PhysicsAuditFigure({
  conceptId, provenance, payload, frameWidth,
}: { conceptId: string; provenance: string; payload: VisualPayload | null; frameWidth: number | null }) {
  return (
    <main
      data-audit-concept={conceptId}
      data-audit-provenance={provenance}
      data-audit-renderer={payload?.renderer ?? 'none'}
      style={{ padding: '12px var(--audit-pad, 16px)', background: 'var(--bg-primary)', minHeight: '100vh', color: 'var(--text-primary)' }}
    >
      <div data-audit-frame="" style={frameWidth ? { width: frameWidth, maxWidth: '100%' } : VISUAL_FRAME}>
        {payload?.renderer === 'scene' && <SceneSpecFigure spec={payload.sceneSpec} />}
        {payload?.renderer === 'card' && <VisualCard type={payload.visualType} autoPlay speed={4} />}
        {payload?.renderer === 'spec' && <VisualRenderer spec={payload.visualSpec} />}
        {(!payload || payload.renderer === 'ascii') && <p data-audit-nofigure="">NO FIGURE</p>}
      </div>
    </main>
  )
}
