/**
 * A VECTOR FIGURE'S LABELS MUST CARRY DIRECTION.
 *
 * Measured on the real deployed tutor with a real learner account,
 * 2026-08-14, lesson `phys.meas.vector-addition`. The served scene was
 * `vector-3@0-4@90` — A of magnitude 3 drawn horizontally at 0°, B of
 * magnitude 4 drawn vertically at 90°, resultant 5 at 53.1°, all
 * scientifically correct and concept-specific. The SELECTION was right.
 *
 * The tutor narrated it as:
 *
 *   "one force pulling north with a strength of 3 newtons, and another force
 *    pulling east with a strength of 4 newtons"
 *
 * A and B swapped. Under that reading the resultant sits at atan(3/4) = 36.9°,
 * while the figure's own title says 53.1°. The learner is handed two
 * incompatible stories in one turn.
 *
 * WHAT THIS IS NOT: a missing-information defect. The visual contract already
 * carried the truth — the scene's stage narration says "Vector A has magnitude
 * 3 at 0°, and vector B has magnitude 4 at 90°" — and the model paraphrased it
 * wrongly regardless. Prompting harder is not a fix.
 *
 * WHAT THE DETERMINISTIC LAYER CAN DO: the contract binds one channel far more
 * tightly than the stage narration. It prints the figure's own text under
 * "TEXT WRITTEN ON THE FIGURE, exactly as the learner reads it" and instructs
 * the tutor to "use these words when you point at parts of it". While the
 * labels read "A (3)" and "B (4)", nothing the tutor claims about direction can
 * be contradicted by the picture the learner is looking at. With "A (3 at 0°)"
 * the claim and the figure are visibly in conflict, and the same string is what
 * reaches the model as quotable text.
 *
 * Compass words are deliberately NOT introduced: the scene has no north. The
 * angle is the figure's own measured quantity, and a figure must not make a
 * stronger claim than it can support.
 */
import { describe, it, expect } from 'vitest'
import { buildVectorScene, checkVectorConsistency } from '@/lib/teaching/sceneGenerators/vectorAddition'
import { describeVisualPayload, buildSemanticsBlock } from '@/lib/teaching/visual/visualSemantics'

const readableOf = (scene: ReturnType<typeof buildVectorScene>) =>
  describeVisualPayload({ renderer: 'scene', sceneSpec: scene } as never).readable ?? []

describe('the production case that exposed this', () => {
  const scene = buildVectorScene({ aMag: 3, aAngleDeg: 0, bMag: 4, bAngleDeg: 90 })

  it('is still the same correct figure', () => {
    expect(scene.id).toBe('vector-3@0-4@90')
    expect(scene.title).toContain('5')
    expect(scene.title).toContain('53.1')
  })

  it('names each vector WITH its angle in the on-figure text', () => {
    const readable = readableOf(scene)
    expect(readable).toContain('A (3 at 0°)')
    expect(readable).toContain('B (4 at 90°)')
    expect(readable).toContain('R (5 at 53.1°)')
  })

  it('puts the angles into the text the tutor is told to quote verbatim', () => {
    const block = buildSemanticsBlock(describeVisualPayload({ renderer: 'scene', sceneSpec: scene } as never))
    expect(block).toContain('exactly as the learner reads it')
    expect(block).toContain('A (3 at 0°)')
    expect(block).toContain('B (4 at 90°)')
  })

  it('describes both directions in the accessible label', () => {
    expect(scene.ariaLabel).toContain('0°')
    expect(scene.ariaLabel).toContain('90°')
    expect(scene.ariaLabel).toContain('53.1')
  })

  it('claims no compass direction the scene cannot support', () => {
    const text = [scene.ariaLabel ?? '', ...readableOf(scene)].join(' ').toLowerCase()
    for (const word of ['north', 'south', 'east', 'west']) expect(text).not.toContain(word)
  })
})

describe('the property holds for any vectors, not just the measured pair', () => {
  const cases: Array<[number, number, number, number]> = [
    [5, 30, 2, 120],
    [1, 0, 1, 90],
    [10, 45, 7, 200],
    [3, 350, 4, 10],
    [2.5, 0, 2.5, 180 - 1],
  ]

  it.each(cases)('A=%s@%s B=%s@%s labels every vector with its angle', (aMag, aAngleDeg, bMag, bAngleDeg) => {
    const scene = buildVectorScene({ aMag, aAngleDeg, bMag, bAngleDeg })
    const readable = readableOf(scene)
    // Every vector label that names a magnitude must also name an angle. The
    // moved copy of B is deliberately exempt: it is the SAME vector already
    // labelled, shown translated, and giving it a second angle would invite
    // the tutor to describe it as a third vector.
    const labelled = readable.filter((t) => /^[ABR] \(/.test(t) && t !== 'B (moved)')
    expect(labelled.length).toBe(3)
    for (const t of labelled) expect(t, `${t} has no angle`).toMatch(/ at -?\d+(\.\d+)?°\)$/)
  })

  it.each(cases)('A=%s@%s B=%s@%s still passes the independent consistency check', (aMag, aAngleDeg, bMag, bAngleDeg) => {
    // The labels are presentation. The geometry must be untouched, and the
    // generator's own law-of-cosines cross-check is what proves it.
    const params = { aMag, aAngleDeg, bMag, bAngleDeg }
    const result = checkVectorConsistency(buildVectorScene(params), params)
    expect(result.ok, JSON.stringify(result)).toBe(true)
  })

  it('normalises negative and over-360 angles rather than printing them raw', () => {
    const scene = buildVectorScene({ aMag: 3, aAngleDeg: -90, bMag: 4, bAngleDeg: 450 })
    const readable = readableOf(scene)
    expect(readable).toContain('A (3 at 270°)')
    expect(readable).toContain('B (4 at 90°)')
    expect(readable.join(' ')).not.toContain('-90')
    expect(readable.join(' ')).not.toContain('450')
  })
})
