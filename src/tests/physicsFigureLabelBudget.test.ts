/**
 * Every figure of the physics visual gap campaign fits the default label budget.
 *
 * At the intermediate level (the default) the explainer shows at most
 * `maxLabels` labels at once and holds back the lowest-priority ones (ink and
 * reference first). MEASURED 2026-09-30: batch 4's decay curve lost its N₀
 * label and Coulomb's law one "+q₂" that way — nothing warned the author. A
 * figure authored inside the budget shows the learner everything it names.
 */
import { describe, it, expect } from 'vitest'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { complexityFor } from '@/lib/teaching/visual/visualComplexity'
import * as b123 from '@/lib/teaching/sceneGenerators/physicsCoreScenes'
import * as b4 from '@/lib/teaching/sceneGenerators/physicsCoreScenesB4'
import * as b5 from '@/lib/teaching/sceneGenerators/physicsCoreScenesB5'
import * as b6 from '@/lib/teaching/sceneGenerators/physicsCoreScenesB6'
import * as b7 from '@/lib/teaching/sceneGenerators/physicsCoreScenesB7'
import * as b8 from '@/lib/teaching/sceneGenerators/physicsCoreScenesB8'
import * as b9 from '@/lib/teaching/sceneGenerators/physicsCoreScenesB9'
import * as b10 from '@/lib/teaching/sceneGenerators/physicsCoreScenesB10'
import * as b11 from '@/lib/teaching/sceneGenerators/physicsCoreScenesB11'
import * as b12 from '@/lib/teaching/sceneGenerators/physicsCoreScenesB12'
import * as b13 from '@/lib/teaching/sceneGenerators/physicsCoreScenesB13'
import * as b14 from '@/lib/teaching/sceneGenerators/physicsCoreScenesB14'

const builders = [b123, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14].flatMap((m) =>
  Object.entries(m).filter(([n, f]) => n.startsWith('build') && typeof f === 'function') as Array<[string, () => SceneSpec]>)

describe('campaign figures fit the intermediate label budget', () => {
  const max = complexityFor('intermediate').maxLabels
  it('covers every campaign builder', () => expect(builders.length).toBeGreaterThanOrEqual(45))
  it.each(builders)('%s', (_n, build) => {
    const labels = build().steps.flatMap((s) => s.objects).filter((o) => o.type === 'label')
    expect(labels.length).toBeLessThanOrEqual(max)
  })
})
