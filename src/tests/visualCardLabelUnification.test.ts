import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import {
  VIEWPORTS, labelWrapWidth, projectLabelBoxes, LABEL_LINE_HEIGHT_RATIO,
  viewportFromCanvas,
} from '@/lib/teaching/visual/layout'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

/**
 * ONE LABEL ARCHITECTURE — the property, not the refactor.
 *
 * The engine had two learner-facing figure surfaces and only one of them could
 * reach the placement solver. Measured in this repository at the time:
 *
 *   430 VisualCard decisions   vs   44 scene decisions
 *
 * and every three.js VisualCard drew its labels itself — a hardcoded 11px with
 * a hardcoded BLACK halo, placed wherever the author typed, knowing nothing
 * about the other labels on the canvas. So the DOMINANT surface was the one
 * bypassing typography, theme and placement together.
 *
 * These tests pin the shape of the fix so it cannot quietly come apart: no
 * card may go back to drawing its own text, and the wrap contract that lets an
 * over-wide caption stay on the canvas must keep model and render agreeing.
 */

const VISUALS_DIR = join(process.cwd(), 'src/components/school/visuals')

const read = (file: string) => readFileSync(join(VISUALS_DIR, file), 'utf8')

/**
 * Source with comments removed.
 *
 * These files DOCUMENT the defect they fixed, quoting `<Html>` and the old
 * label props by name. Scanning raw text would flag the explanation as the
 * offence — so the scans below read code only.
 */
const code = (file: string) =>
  read(file).replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/^\s*\/\/.*$/gm, ' ')

/** Every component the VisualCard switch can actually render. */
function cardComponents(): string[] {
  const card = read('VisualCard.tsx')
  const names = [...card.matchAll(/case '[a-z_0-9]+':\s*return <(\w+)/g)].map((m) => m[1])
  return [...new Set(names)]
}

/** A component file, plus every local component file it pulls in. */
function withLocalImports(entry: string, seen = new Set<string>()): string[] {
  if (seen.has(entry)) return []
  seen.add(entry)
  let source: string
  try { source = read(`${entry}.tsx`) } catch { return [] }
  const local = [...source.matchAll(/from '\.\/(\w+)'/g)].map((m) => m[1])
  for (const dep of local) withLocalImports(dep, seen)
  return [...seen]
}

describe('one label architecture — no card draws its own text', () => {
  const reachable = new Set<string>()
  for (const component of cardComponents()) {
    for (const file of withLocalImports(component)) reachable.add(file)
  }

  it('finds the card corpus at all — a silent empty scan would pass everything', () => {
    expect(cardComponents().length).toBeGreaterThan(30)
    expect(reachable.size).toBeGreaterThan(30)
  })

  it('no component reachable from VisualCard imports drei <Html> directly', () => {
    // SceneLabel is the ONE leaf allowed to; everything else asks the layer.
    const offenders = [...reachable]
      .filter((f) => f !== 'SceneLabel')
      .filter((f) => {
        try { return /<Html[\s/>]/.test(code(`${f}.tsx`)) } catch { return false }
      })
    expect(offenders, `these draw their own labels: ${offenders.join(', ')}`).toEqual([])
  })

  it('SceneLabel is the only place a label halo is written', () => {
    const withShadow = [...reachable].filter((f) => {
      try { return /textShadow/.test(code(`${f}.tsx`)) } catch { return false }
    })
    expect(withShadow).toEqual(['SceneLabel'])
  })

  it('every three.js card that shows text routes it through the placement layer', () => {
    // Scoped to the CARDS themselves — the components the switch renders. A
    // primitive that forwards its own `label` prop is not the failure; a CARD
    // handing text to a primitive is, because that text never reaches the
    // solver. `aria-label` is excluded: it is the accessible name, not a
    // drawn label.
    const offenders = cardComponents().filter((f) => {
      let src: string
      try { src = code(`${f}.tsx`) } catch { return false }
      if (src.includes('SceneLabelLayer')) return false
      return /(?<![\w-])label=[{"]/.test(src)
    })
    expect(offenders, `these hand text to a primitive: ${offenders.join(', ')}`).toEqual([])
  })
})

describe('wrap contract — the model and the render describe the same box', () => {
  const mobile = VIEWPORTS.find((v) => v.name === 'mobile')!

  it('a label that fits is not wrapped', () => {
    expect(labelWrapWidth('crest', mobile)).toBeNull()
  })

  it('a label wider than the canvas IS wrapped, inside the canvas', () => {
    const long = 'Data moves up: storage to RAM to cache to CPU (faster, smaller each step)'
    const wrapAt = labelWrapWidth(long, mobile)
    expect(wrapAt).not.toBeNull()
    expect(wrapAt!).toBeLessThan(mobile.hostWidth)
  })

  it('the wrapped box is no wider than the wrap width — the whole point', () => {
    const long = 'Positive (left, up) versus negative (right, down) correlation across the set'
    const scene: SceneSpec = {
      id: 't', title: '', sceneType: 'diagram', cameraDistance: 10,
      steps: [{ objects: [{ type: 'label', text: long, position: [0, 0, 0] }] }],
    }
    const [box] = projectLabelBoxes(scene, mobile)
    const wrapAt = labelWrapWidth(long, mobile)!
    expect(box.right - box.left).toBeCloseTo(wrapAt, 5)
  })

  it('wrapping makes the box TALLER, never taller than the canvas', () => {
    const long = 'Mean at center (symmetric normal distribution) and the spread is the width'
    const scene = (text: string): SceneSpec => ({
      id: 't', title: '', sceneType: 'diagram', cameraDistance: 10,
      steps: [{ objects: [{ type: 'label', text, position: [0, 0, 0] }] }],
    })
    const [wrapped] = projectLabelBoxes(scene(long), mobile)
    const [single] = projectLabelBoxes(scene('short'), mobile)
    expect(wrapped.bottom - wrapped.top).toBeGreaterThan(single.bottom - single.top)
    expect(wrapped.bottom - wrapped.top).toBeLessThan(mobile.hostHeight)
  })

  it('the line-height the model reserves is exported for the renderer to use', () => {
    // Measured: the browser's own `normal` resolves to 1.5 here, which is 11%
    // taller than the model reserves — enough to overlap the label above.
    expect(LABEL_LINE_HEIGHT_RATIO).toBeGreaterThan(1)
    expect(read('SceneLabel.tsx')).toContain('LABEL_LINE_HEIGHT_RATIO')
  })

  it('a wrapped label states its WIDTH, not just a max — drei collapses a max', () => {
    // Inside drei's zero-width wrapper an inline-block shrinks to its minimum
    // content width; measured, that wrapped one caption to one word per line.
    const source = read('SceneLabel.tsx')
    expect(source).toMatch(/width: maxWidthPx/)
  })
})

describe('viewport model — canvas width and window width are different things', () => {
  it('vw-sized text is measured against the WINDOW, not the canvas', () => {
    // A VisualCard is capped far below the window width. Treating them as one
    // under-modelled every label by more than half its width.
    const card = viewportFromCanvas(534, 400, 1280)
    expect(card.hostWidth).toBe(534)
    expect(card.browserWidth).toBe(1280)
    expect(card.name).toBe('desktop')
  })

  it('falls back to the canvas width when no window width is supplied', () => {
    const full = viewportFromCanvas(992, 520)
    expect(full.browserWidth).toBe(992)
  })

  it('a narrow window is mobile even when its canvas is wide', () => {
    expect(viewportFromCanvas(340, 260, 390).name).toBe('mobile')
  })
})

describe('the label layer is the only consumer of the solver in the renderer', () => {
  it('SceneSpecRenderer no longer places labels itself', () => {
    const source = read('SceneSpecRenderer.tsx')
    expect(source).toContain('SceneLabelLayer')
    expect(source).not.toContain('placeSceneLabels')
  })

  it('the layer persists no screen coordinate — placement is derived every render', () => {
    const source = read('SceneLabelLayer.tsx')
    expect(source).not.toMatch(/localStorage|sessionStorage|fetch\(/)
    expect(source).toContain('useThree')
  })

  it('every visuals component still compiles into the directory it claims', () => {
    const files = readdirSync(VISUALS_DIR).filter((f) => f.endsWith('.tsx'))
    expect(files).toContain('SceneLabelLayer.tsx')
    expect(files).toContain('SceneLabel.tsx')
  })
})
