'use client'
/**
 * Client half of the physics audit page: mounts the payload exactly as
 * LessonScreen does, inside the same VISUAL_FRAME box. See page.tsx.
 */
import { SceneSpecFigure } from '@/components/school/visuals/SceneSpecFigure'
import { VisualCard } from '@/components/school/visuals/VisualCard'
import { VisualRenderer } from '@/components/visuals/VisualRenderer'
import type { VisualPayload } from '@/lib/teaching/visual/types'
import lessonStyles from '@/components/learn/LessonScreen.module.css'

// LessonScreen's VISUAL_FRAME, verbatim (src/components/learn/LessonScreen.tsx).
const VISUAL_FRAME: React.CSSProperties = {
  width: '100%',
  maxWidth: 'min(100%, 720px)',
}

export function PhysicsAuditFigure({
  conceptId, provenance, payload, frameWidth, lessonScope = false,
}: { conceptId: string; provenance: string; payload: VisualPayload | null; frameWidth: number | null; lessonScope?: boolean }) {
  return (
    <main
      data-audit-concept={conceptId}
      data-audit-provenance={provenance}
      data-audit-renderer={payload?.renderer ?? 'none'}
      data-audit-scope={lessonScope ? 'lesson' : 'global'}
      // `lessonScope` puts the figure under the SAME token scope the real lesson page uses (`.learnCandy` in LessonScreen.module.css: --sb-*, --coral, --text-*, --bg-*).
      // Default off, so the existing Physics / Chemistry / Biology audits are measured exactly as before.
      className={lessonScope ? lessonStyles.learnCandy : undefined}
      style={{ padding: '12px var(--audit-pad, 16px)', background: lessonScope ? 'var(--bg-void)' : 'var(--bg-primary)', minHeight: '100vh', color: 'var(--text-primary)' }}
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
