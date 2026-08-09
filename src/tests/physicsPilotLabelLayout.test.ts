/**
 * M4 LABEL LAYOUT — a label must not be drawn on top of the geometry it names.
 *
 * The M4 release gate found three figures where, at 390px, a label sat across
 * the very thing it described. Measured in Chromium against the real canvas
 * (282×260 at that width), before the fix:
 *
 *   viscosity        "velocity gradient" spanned world x -4.45..0.17 at y=1.5 —
 *                    on the y=1.5 layer line, over that layer's arrow, and past
 *                    the THICK panel's right edge (-0.3) up against THIN, so it
 *                    read as belonging to both panels.
 *   calorimetry      "heat flows hot → cold" spanned x -1.85..3.92 at y=-0.42 —
 *                    across the hot block itself (x -1.55..-0.65, y -0.95..-0.05)
 *                    and out through the right wall at x=3.
 *   surface tension  "liquid climbs · rise h" spanned y -1.06..-1.59 across both
 *                    tube walls, which end at y=-1.3.
 *
 * Two more of the same class were found in calorimetry while fixing it: the
 * thermometer stem (x=2.2) ran through "both reach the same T_f", and the lower
 * heat arrow ran through "hot block".
 *
 * WHY THESE ASSERTIONS ARE BANDS, NOT BOXES. A label's rendered width depends
 * on font metrics that exist only in a browser, so a faithful box test cannot
 * run in Node. What IS exact is the geometry each label must stay clear of —
 * every line, plate and molecule below is read from the scene itself. So each
 * assertion states the free band the label was moved into. That is enough to
 * catch the regression that matters: someone moving a label back onto its
 * geometry. Chromium remains the final visual gate.
 *
 * LABEL-ON-LABEL is a different failure and is NOT asserted here: the viewport
 * model in `visual/layout.ts` predicts it exactly, and `visualLayoutSafety`
 * holds all three of these figures at zero collisions on every viewport. This
 * file covers what that model cannot see — a label sitting on GEOMETRY.
 */

import { describe, expect, it } from 'vitest'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { visibleObjects, type SceneObject, type SceneSpec } from '@/lib/teaching/sceneSpec'

function sceneOf(conceptId: string): SceneSpec {
  const d = resolveVisual({
    message: 'explain with diagram', lessonConceptId: conceptId,
    subject: 'physics', learnerRequest: 'diagram',
  })
  if (d.payload?.renderer !== 'scene') throw new Error(`${conceptId} has no scene`)
  return d.payload.sceneSpec
}

const objectsOf = (conceptId: string) => visibleObjects(sceneOf(conceptId), Infinity)

/** The label whose text starts with `text`, or a failure if it is gone. */
function labelAt(objects: readonly SceneObject[], text: string): { x: number; y: number } {
  const found = objects.find((o) => o.type === 'label' && (o.text ?? '').startsWith(text))
  expect(found, `label "${text}" is missing from the figure`).toBeDefined()
  const [x, y] = found!.position ?? [0, 0, 0]
  return { x, y }
}

describe('viscosity · the gradient label belongs to ONE panel and no arrow', () => {
  const objects = objectsOf('phys.mech.viscosity')
  const label = () => labelAt(objects, 'velocity gradient')

  it('sits below the fixed plate, clear of the whole arrow field', () => {
    // The plates are at y=0 and y=3, and every velocity arrow lies between
    // them. Anything at 0 <= y <= 3 is inside the drawing.
    expect(label().y).toBeLessThan(0)
  })

  it('is centred on the THICK panel, not between the two', () => {
    // THICK spans x -4.9..-0.3, THIN 0.3..4.9. A label centred at or right of
    // x=0 reads as a caption for both.
    expect(label().x).toBeLessThan(-1)
  })

  it('the equation is centred under both panels, since the law governs both', () => {
    const eq = labelAt(objects, 'F = η A')
    expect(Math.abs(eq.x)).toBeLessThan(0.5)
    expect(eq.y).toBeLessThan(0)
  })

  it('the panel captions stay on their own sides', () => {
    expect(labelAt(objects, 'THICK').x).toBeLessThan(0)
    expect(labelAt(objects, 'THIN').x).toBeGreaterThan(0)
    expect(labelAt(objects, 'lower η').x).toBeGreaterThan(0)
  })
})

describe('calorimetry · nothing is written across the vessel or its contents', () => {
  const objects = objectsOf('phys.therm.calorimetry')

  it('the heat-flow label is outside the vessel and below the insulation', () => {
    // Vessel floor y=-2.1; the hatch ticks hang to about y=-2.47.
    expect(labelAt(objects, 'heat flows').y).toBeLessThan(-2.5)
  })

  it('the hot-block label clears the lower heat arrow', () => {
    // That arrow runs from (-0.6,-0.85) to (0.75,-1.5).
    expect(labelAt(objects, 'hot block').y).toBeLessThan(-1.6)
  })

  it('the equilibrium label clears the thermometer stem', () => {
    // The stem is the vertical line at x=2.2. The label is centred, so pulling
    // its centre left of -1 keeps its right edge clear of the stem.
    expect(labelAt(objects, 'both reach').x).toBeLessThanOrEqual(-1)
  })

  it('the closing labels stack below the vessel without meeting each other', () => {
    const heat = labelAt(objects, 'heat flows').y
    const insulated = labelAt(objects, 'insulated').y
    const balance = labelAt(objects, 'heat lost').y
    expect(insulated).toBeLessThan(heat)
    expect(balance).toBeLessThan(insulated)
    // Each row is at least half a world unit clear of the next.
    expect(heat - insulated).toBeGreaterThanOrEqual(0.5)
    expect(insulated - balance).toBeGreaterThanOrEqual(0.5)
  })
})

describe('surface tension · labels stay off the molecules and off the tube', () => {
  const objects = objectsOf('phys.mech.surface-tension')

  it('the tension label clears both molecules and their arrows', () => {
    // Bulk molecule arrows reach y=-1.35 at the lowest; the surface molecule's
    // downward arrow occupies y 0.85..1.7. Below -2.1 is clear of both.
    expect(labelAt(objects, 'tension along').y).toBeLessThan(-2.1)
  })

  it('it stays under its own panel, left of the capillary side', () => {
    // The right panel's outside-level line starts at x=0.6.
    expect(labelAt(objects, 'tension along').x).toBeLessThan(-1)
  })

  it('the capillary label is below the tube, not across its walls', () => {
    // Both tube walls run from y=3.1 down to y=-1.3.
    expect(labelAt(objects, 'liquid climbs').y).toBeLessThan(-1.4)
  })

  it('and stays clear of the capillary equation below it', () => {
    const climbs = labelAt(objects, 'liquid climbs').y
    const eq = labelAt(objects, 'h = 2T').y
    expect(climbs - eq).toBeGreaterThanOrEqual(0.5)
  })

  it('both phenomena are still present — neither panel was collapsed', () => {
    expect(labelAt(objects, 'AT THE SURFACE').x).toBeLessThan(0)
    expect(labelAt(objects, 'CAPILLARY RISE').x).toBeGreaterThan(0)
    expect(labelAt(objects, 'meniscus')).toBeDefined()
    expect(labelAt(objects, 'balanced')).toBeDefined()
  })
})

describe('the teaching content of all three figures is unchanged', () => {
  it.each([
    ['phys.mech.viscosity', ['THICK', 'THIN', 'plate dragged', 'fixed plate', 'velocity gradient', 'F = η A', 'lower η']],
    ['phys.therm.calorimetry', ['insulated', 'water', 'thermometer', 'hot block', 'heat flows', 'both reach', 'heat lost']],
    ['phys.mech.surface-tension', ['AT THE SURFACE', 'liquid surface', 'balanced', 'nothing pulls it up',
      'tension along', 'CAPILLARY RISE', 'level outside', 'narrow tube', 'meniscus', 'liquid climbs', 'h = 2T']],
  ])('%s keeps every label it taught with', (conceptId, expected) => {
    const texts = objectsOf(conceptId).map((o) => o.text ?? '')
    for (const needle of expected) {
      expect(texts.some((t) => t.startsWith(needle)), `${conceptId} lost "${needle}"`).toBe(true)
    }
  })

  it('no label was added to compensate for the layout', () => {
    // Label counts, fixed at the values the gate measured in the browser.
    expect(objectsOf('phys.mech.viscosity').filter((o) => o.type === 'label')).toHaveLength(8)
    expect(objectsOf('phys.therm.calorimetry').filter((o) => o.type === 'label')).toHaveLength(7)
    expect(objectsOf('phys.mech.surface-tension').filter((o) => o.type === 'label')).toHaveLength(11)
  })
})
