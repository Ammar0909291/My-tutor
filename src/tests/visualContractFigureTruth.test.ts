/**
 * What the tutor is TOLD about a figure must match what the learner SEES.
 *
 * MEASURED on production (2026-09-27, bio.found.what-is-biology, "Give me a
 * diagram"): the figure draws six straight spokes in seven stages, but the
 * visual contract said "6 plotted curves" and "built in 6 stages" (listing
 * six — the count was taken after a six-stage cut). The tutor then told the
 * learner about "six curved arrows" and never taught the seventh stage.
 */
import { describe, expect, it } from 'vitest'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { buildSemanticsBlock, describeVisualPayload } from '@/lib/teaching/visual/visualSemantics'
import {
  ACTIVATED_SCENE_KINDS,
  CONCEPT_SCENE_OVERRIDES,
  buildCanonicalScene,
} from '@/lib/teaching/visual/conceptSceneParams'

const block = (s: SceneSpec) => buildSemanticsBlock(describeVisualPayload({ renderer: 'scene', sceneSpec: s } as never))
const scene = (kind: string | null, concept: string | null) => buildCanonicalScene(kind, concept)!

describe('the visual contract describes the figure truthfully', () => {
  it('the Biology hub: six straight lines, seven stages, the seventh included', () => {
    const text = block(scene(null, 'bio.found.what-is-biology'))
    expect(text).toContain('6 straight lines')
    expect(text).not.toMatch(/curve/i)
    expect(text).toContain('It is built in 7 stages')
    expect(text).toContain('(7) Genetics')
  })

  it('a genuinely curved path is still a plotted curve (projectile trajectory)', () => {
    expect(block(scene('projectile', null))).toMatch(/plotted curve/)
  })

  it('the longest Biology figure (12 levels of organisation) is described in full', () => {
    const s = scene(null, 'bio.found.biomes-levels-of-organisation')
    const text = block(s)
    expect(text).toContain('It is built in 12 stages')
    expect(text).toContain('(12) ')
  })

  it('a figure longer than the cap reports its real length and says the list is partial', () => {
    const s: SceneSpec = {
      id: 't', title: 'T', sceneType: 'diagram', teachingGoal: 'g',
      steps: Array.from({ length: 14 }, (_, i) => ({ narration: `Stage number ${i + 1}.`, objects: [] })),
    }
    const text = block(s)
    expect(text).toContain('It is built in 14 stages')
    expect(text).toContain('(the first 12 are listed)')
  })

  it('across the corpus: the stage count is the real count, and no straight connector is called a curve', () => {
    const offenders: string[] = []
    const all = [
      ...CONCEPT_SCENE_OVERRIDES.map((c) => [c, buildCanonicalScene(null, c)] as const),
      ...ACTIVATED_SCENE_KINDS.map((k) => [k, buildCanonicalScene(k, null)] as const),
    ]
    for (const [key, s] of all) {
      if (!s) continue
      const text = block(s)
      const narrated = new Set(s.steps.map((st) => st.narration?.trim()).filter(Boolean)).size
      const m = text.match(/It is built in (\d+) stages/)
      if (s.steps.length > 1 && narrated > 0 && (!m || Number(m[1]) !== narrated)) offenders.push(`${key}: stages ${m?.[1]} vs ${narrated}`)
      const paths = s.steps.flatMap((st) => st.objects).filter((o) => (o.type === 'path' || o.type === 'trajectory') && !o.text)
      if (paths.length && paths.every((p) => (p.points?.length ?? 0) <= 2) && /plotted curve/.test(text)) offenders.push(`${key}: straight paths called curves`)
    }
    expect(offenders).toEqual([])
  })
})
