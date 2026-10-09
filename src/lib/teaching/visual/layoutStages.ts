/**
 * Layout safety, stage by stage, under the label budget the learner actually gets.
 *
 * `checkSceneLayout` (layout.ts) answers "will EVERY label of this figure fit at once?". That is the right
 * question for an author deciding how much text a figure carries, and the wrong prediction of what a learner
 * sees: `ExplainerFigure` never puts every label up at once. It reveals the figure stage by stage and, at each
 * stage, shows at most `policy.maxLabels` annotations (`budgetLabels`: 5 beginner, 9 intermediate, unlimited
 * advanced), choosing by role and meeting the labels the current stage introduces first.
 *
 * Measured in Chromium (2026-10-08 Chemistry Visual Quality audit) the all-labels predicate over-predicted:
 * Born–Haber has 18 labels and the predicate says 18 mobile violations, while the browser's default view
 * showed three collisions, all of them one heading that has since moved. The two disagree because the predicate
 * ignored the budget the renderer applies.
 *
 * This module replays the renderer's own reveal — the same `budgetLabels`, the same `fresh` set, then the same
 * placement solver on exactly what would be on screen — so a unit test can say what the browser would say.
 * It adds no layout engine: every number here comes from layout.ts and visualComplexity.ts.
 *
 * Pure. No React, no DOM.
 */

import type { SceneObject, SceneSpec } from '@/lib/teaching/sceneSpec'
import type { CurriculumLevel } from '@/lib/curriculum/levels'
import { budgetLabels, complexityFor } from './visualComplexity'
import { checkSceneLayout, VIEWPORTS, type LayoutReport, type Viewport } from './layout'

/** `'complete'` is the view a learner gets BEFORE walking the stages: every step revealed, no stage "fresh". */
export type StageRef = number | 'complete'

export interface StageLayoutReport extends LayoutReport {
  /** 1-based stage the learner is on (cumulative reveal), or `'complete'` for the default, un-walked view. */
  stage: StageRef
  level: CurriculumLevel
}

/**
 * What the learner sees at `stage`: everything revealed so far, labels budgeted for the level.
 *
 * Two views exist and, when a figure has more labels than the budget, they can choose DIFFERENT labels from it:
 *  - a stage the learner has walked to (1…N): the labels that stage introduces are met first (`fresh`);
 *  - the complete view the figure opens on: every step revealed and no stage is "fresh", so ties keep authored
 *    order and the budget keeps the highest-priority roles regardless of which step introduced them.
 * The complete view is what a learner sees first, so it is checked as well as the walked stages.
 */
export function sceneAtStage(scene: SceneSpec, stage: StageRef, level: CurriculumLevel = 'intermediate'): SceneSpec {
  const policy = complexityFor(level)
  if (stage === 'complete') {
    const all: SceneObject[] = scene.steps.flatMap((s) => s.objects ?? [])
    return { ...scene, steps: [{ objects: budgetLabels(all, policy) }] }
  }
  const upTo = Math.min(Math.max(1, Math.round(stage)), scene.steps.length)
  const revealed: SceneObject[] = scene.steps.slice(0, upTo).flatMap((s) => s.objects ?? [])
  const fresh = new Set<SceneObject>(scene.steps[upTo - 1]?.objects ?? [])
  const shown = budgetLabels(revealed, policy, fresh)
  return { ...scene, steps: [{ objects: shown }] }
}

/** Layout of one stage at one viewport. */
export function checkStageLayout(scene: SceneSpec, stage: StageRef, viewport: Viewport, level: CurriculumLevel = 'intermediate'): StageLayoutReport {
  return { ...checkSceneLayout(sceneAtStage(scene, stage, level), viewport), stage, level }
}

/** The complete view and every stage × every supported viewport, for one learner level. */
export function checkSceneLayoutByStage(scene: SceneSpec, level: CurriculumLevel = 'intermediate'): StageLayoutReport[] {
  const out: StageLayoutReport[] = []
  const stages: StageRef[] = ['complete', ...Array.from({ length: scene.steps.length }, (_, i) => i + 1)]
  for (const stage of stages) {
    for (const viewport of VIEWPORTS) out.push(checkStageLayout(scene, stage, viewport, level))
  }
  return out
}
