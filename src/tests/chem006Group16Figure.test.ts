/**
 * CHEM-006 (2026-10-05, #115 "Group 16 — Oxygen Family", account 7): the only
 * figure was a cached, model-generated "Contact Process for Sulfuric Acid"
 * flow, and the tutor taught the industrial process instead of the group. A
 * curated Tier-0 binding outranks generation (the PCD-041 precedent), so the
 * lesson now always gets the group's defining anomaly: the hydride boiling
 * points, with water as the outlier.
 */
import { describe, it, expect } from 'vitest'
import { buildCanonicalScene, CONCEPT_SCENE_OVERRIDES } from '@/lib/teaching/visual/conceptSceneParams'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'

const build = () => buildCanonicalScene(null, 'chem.pblock.group16') as never as { steps: Array<{ objects: Array<Record<string, unknown>> }>; title?: string }
const text = (spec: unknown) => JSON.stringify(spec)

describe('CHEM-006: Group 16 has its own curated figure', () => {
  it('is curated, valid and deterministic', () => {
    expect(CONCEPT_SCENE_OVERRIDES).toContain('chem.pblock.group16')
    const spec = build()
    expect(spec).not.toBeNull()
    expect(validateSceneSpec(spec as never).valid).toBe(true)
    expect(text(build())).toBe(text(build()))
  })
  it('shows the four hydrides with water highest, and is not the Contact Process', () => {
    const t = text(build())
    for (const h of ['H2O 373 K', 'H2S 213 K', 'H2Se 232 K', 'H2Te 271 K']) expect(t).toContain(h)
    expect(t).not.toMatch(/Contact Process|SO3|V2O5/)
  })
})
