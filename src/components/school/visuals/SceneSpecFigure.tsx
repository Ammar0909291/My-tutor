'use client'
/**
 * SceneSpecFigure — the lesson surface's entry point to a 3D scene.
 *
 * It used to BE the presentation shell: a title, the current step's narration,
 * and Back/Next. That shell is now `ExplainerFigure`, which keeps the stepper
 * and adds everything a learner needs in order to read the figure without the
 * prose beside it — givens, the result, a legend, the explanation panels, the
 * key insight, the modes, and the variables they may move.
 *
 * This file stays as the seam. `LessonScreen` imports it by name, the dev
 * harnesses import it by name, and neither had to change for the frame to
 * ship — which is the whole reason the upgrade could be made in one place
 * rather than at every call site.
 */
import { ExplainerFigure } from './ExplainerFigure'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

export function SceneSpecFigure({ spec }: { spec: SceneSpec }) {
  return <ExplainerFigure spec={spec} />
}
