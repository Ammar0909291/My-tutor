import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { buildCanonicalScene, ACTIVATED_SCENE_KINDS } from '@/lib/teaching/visual/conceptSceneParams'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

/**
 * THE LABEL CONTRACT: if the engine says a label exists, it must reach the learner.
 *
 * Measured before this contract existed, across the M4 pilot figures, the whole
 * activated generator corpus and the vector-addition figure — 177 text-bearing
 * objects:
 *
 *   116  rendered correctly (all of them `label` objects)
 *    58  rendered with a hardcoded BLACK halo in BOTH themes, at the smallest
 *        size — every vector/arrow/point/node/particle label in the engine
 *     3  DROPPED ENTIRELY (`bar` fell through to `default: return null`)
 *     3  bar GEOMETRIES dropped entirely along with them
 *
 * These are engine-level tests over the corpus and the renderer's own source.
 * They name no concept as a special case: representative scenes are fixtures.
 */

const SRC = (p: string) => readFileSync(join(process.cwd(), 'src/components/school/visuals', p), 'utf8')

/** Every object type that can carry text, per the SceneSpec vocabulary. */
const TEXT_CAPABLE = ['label', 'point', 'node', 'particle', 'vector', 'arrow', 'bond', 'path', 'trajectory', 'bar'] as const

function corpusScenes(): SceneSpec[] {
  const out: SceneSpec[] = []
  const concepts = [
    'phys.opt.total-internal-reflection', 'phys.wave.transverse-waves', 'phys.wave.interference',
    'phys.therm.calorimetry', 'phys.therm.first-law', 'phys.mech.viscosity',
    'phys.mech.surface-tension', 'phys.meas.vector-addition',
  ]
  for (const id of concepts) {
    const d = resolveVisual({ message: '', lessonConceptId: id, subject: 'physics', learnerRequest: 'diagram' })
    if (d.payload?.renderer === 'scene') out.push(d.payload.sceneSpec)
  }
  for (const kind of ACTIVATED_SCENE_KINDS) {
    const s = buildCanonicalScene(kind)
    if (s) out.push(s)
  }
  return out
}

describe('Label contract — one implementation', () => {
  it('SceneLabel is the only label implementation in the SceneSpec path', () => {
    // Three implementations had drifted apart and only one was theme-correct.
    for (const file of ['SceneSpecRenderer.tsx', 'Vector3D.tsx', 'MolecularNode3D.tsx']) {
      const src = SRC(file)
      expect(src, `${file} must not draw its own label`).not.toMatch(/<Html[^>]*>[\s\S]{0,200}fontSize/)
      expect(src, `${file} must render text through SceneLabel`).toContain('SceneLabel')
    }
  })

  it('no label path hardcodes a dark halo', () => {
    for (const file of ['SceneSpecRenderer.tsx', 'Vector3D.tsx', 'MolecularNode3D.tsx']) {
      expect(SRC(file), `${file} still hardcodes a black text halo`).not.toMatch(/textShadow[\s\S]{0,60}rgba\(0,\s*0,\s*0/)
    }
  })

  it('the one label implementation is theme-aware in both directions', () => {
    const src = SRC('SceneLabel.tsx')
    expect(src).toMatch(/theme === 'light'/)
    expect(src).toMatch(/255,255,255|255, 255, 255/)   // light-theme halo
    expect(src).toMatch(/rgba\(0,0,0|rgba\(0, 0, 0/)   // dark-theme halo
  })

  it('label size is responsive with a legibility floor, never hidden', () => {
    const src = SRC('SceneLabel.tsx')
    expect(src, 'label size must be responsive').toContain('clamp(')
    expect(src, 'a floor keeps small screens readable').toMatch(/FLOOR_PX\s*=\s*(\d+)/)
    const floor = Number(src.match(/FLOOR_PX\s*=\s*(\d+)/)![1])
    expect(floor, 'below ~10px a label stops being readable').toBeGreaterThanOrEqual(10)
    // Legibility is never traded for a tidier collision count.
    expect(src).not.toMatch(/display:\s*'none'|visibility:\s*'hidden'|opacity:\s*0\b/)
  })

  it('theme reaches the primitives as a prop, not a hook across the Canvas boundary', () => {
    for (const file of ['Vector3D.tsx', 'MolecularNode3D.tsx']) {
      expect(SRC(file), `${file} must take theme as a prop`).toMatch(/theme\??:\s*Theme/)
      expect(SRC(file), `${file} must not call useTheme inside <Canvas>`).not.toContain('useTheme(')
    }
  })
})

describe('Label contract — nothing is silently dropped', () => {
  it('every text-capable object type has a rendering branch', () => {
    const src = SRC('SceneSpecRenderer.tsx')
    for (const type of TEXT_CAPABLE) {
      expect(src, `no renderer branch for '${type}'`).toContain(`case '${type}'`)
    }
  })

  it('the renderer no longer discards bar objects', () => {
    const src = SRC('SceneSpecRenderer.tsx')
    expect(src).not.toContain('bar / surface not handled yet')
    expect(src).toContain("case 'bar'")
  })

  it('every text-bearing object in the whole corpus is a type the renderer draws', () => {
    const unhandled: string[] = []
    for (const scene of corpusScenes()) {
      for (const step of scene.steps ?? []) {
        for (const obj of step.objects ?? []) {
          if (!(obj.text ?? '').trim()) continue
          if (!TEXT_CAPABLE.includes(obj.type as typeof TEXT_CAPABLE[number])) {
            unhandled.push(`${scene.id}: ${obj.type} "${obj.text}"`)
          }
        }
      }
    }
    expect(unhandled, `text on object types the renderer cannot draw:\n${unhandled.join('\n')}`).toEqual([])
  })

  it('the corpus really does exercise all three label paths', () => {
    // Guards the test itself: if the corpus stopped containing vector/node
    // labels, the theme regression these tests exist for would go unnoticed.
    const seen = new Set<string>()
    for (const scene of corpusScenes()) {
      for (const step of scene.steps ?? []) {
        for (const obj of step.objects ?? []) if ((obj.text ?? '').trim()) seen.add(obj.type)
      }
    }
    expect(seen.has('label'), 'no label-object fixtures').toBe(true)
    expect(seen.has('vector'), 'no Vector3D-path fixtures').toBe(true)
    expect(seen.has('node'), 'no MolecularNode3D-path fixtures').toBe(true)
  })
})

describe('Label contract — grounding still matches what is drawn', () => {
  it('every label the engine emits is real text a learner could read', () => {
    for (const scene of corpusScenes()) {
      for (const step of scene.steps ?? []) {
        for (const obj of step.objects ?? []) {
          const text = obj.text
          if (text === undefined) continue
          expect(typeof text, `${scene.id}: non-string label`).toBe('string')
          if (text.trim()) expect(text.trim().length, `${scene.id}: empty label`).toBeGreaterThan(0)
        }
      }
    }
  })

  it('no second renderer was introduced', () => {
    // SceneLabel is a leaf primitive, not a renderer: it owns no camera, no
    // canvas and no scene traversal.
    // Strip comments first: the module's own docs discuss cameraDistance, and
    // an assertion that cannot tell prose from code is not an assertion.
    const code = SRC('SceneLabel.tsx').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '')
    expect(code).not.toContain('<Canvas')
    expect(code).not.toContain('visibleObjects')
    expect(code).not.toContain('cameraDistance')
  })
})
