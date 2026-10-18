/**
 * ENGLISH STATIC FIGURES — what each figure states is checked against the concept's own sources.
 *
 * English served no static figure until 2026-10-18 (every English figure is model-generated at runtime). `eng.grammar.nouns` is the first with a
 * figure of its own: four groups (Person, Place, Thing, Idea) with example nouns. A figure in a language lesson is faithful only if every word it
 * shows is one the concept's own sources use and every claim it makes is one they make, so this test reads those sources (the KG description, the
 * teaching asset, the Educational Brain entry) and re-derives the figure from the DRAWN groups and labels. It is the semantic evidence the English
 * static-figure audit (scripts/qa/englishVisual/staticFigures.ts) records.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding } from '@/lib/teaching/visual/retired'
import { INSUFFICIENT_FOR_CONCEPT } from '@/lib/teaching/visual/scope'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'
import { payloadBlockers } from '@/lib/teaching/visual/figureAudit'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

type Obj = { type?: string; id?: string; text?: string }
const NOUNS = 'eng.grammar.nouns'
const served = (conceptId: string, request: 'diagram' | null) =>
  resolveVisual({ message: request ? 'show me a diagram' : '', lessonConceptId: conceptId, learnerRequest: request, subject: 'english' } as Parameters<typeof resolveVisual>[0])
const sceneOf = (conceptId: string): SceneSpec => {
  const d = served(conceptId, 'diagram')
  if (d.payload?.renderer !== 'scene') throw new Error(`${conceptId} does not serve a scene`)
  return d.payload.sceneSpec
}
const objs = (s: SceneSpec) => s.steps.flatMap((st) => st.objects as Obj[])

describe('eng.grammar.nouns is served its own figure, as a figure OF the concept', () => {
  it.each([null, 'diagram'] as const)('request %s', (req) => {
    const d = served(NOUNS, req)
    expect(d.graphical, d.provenance).toBe(true)
    expect(d.asset?.scope).toBe('concept')
    expect((d.payload as { sceneSpec?: { id?: string } }).sceneSpec?.id).toBe(`cell-comparison-${NOUNS}`)
    expect(isRetiredVisualBinding(NOUNS)).toBe(false)
    expect(INSUFFICIENT_FOR_CONCEPT.has(NOUNS)).toBe(false)
  })
  it('passes the scene validator and the figure audit that admits a figure to a learner', () => {
    const s = sceneOf(NOUNS)
    const v = validateSceneSpec(s) as { valid?: boolean; ok?: boolean; errors?: unknown }
    expect(v.valid ?? v.ok, JSON.stringify(v.errors ?? v)).toBe(true)
    expect(payloadBlockers({ renderer: 'scene', sceneSpec: s } as never)).toEqual([])
  })
})

describe('what the nouns figure states comes from the concept\'s own sources', () => {
  const kg = JSON.parse(readFileSync('docs/english/kg/graph.json', 'utf8'))
  const node = (Array.isArray(kg) ? kg : (kg.concepts ?? kg.nodes)).find((n: { id: string }) => n.id === NOUNS) as { description: string }
  const assetsRaw = JSON.parse(readFileSync('docs/english/teaching-assets/assets.json', 'utf8'))
  const findAsset = (x: unknown): { key_ideas: string[]; concept_summary: string } | undefined => {
    if (Array.isArray(x)) { for (const v of x) { const r = findAsset(v); if (r) return r }; return undefined }
    if (x && typeof x === 'object') { const o = x as Record<string, unknown>; if (o.concept_id === NOUNS) return o as never; for (const v of Object.values(o)) { const r = findAsset(v); if (r) return r } }
    return undefined
  }
  const asset = findAsset(assetsRaw)!
  const assetText = [asset.concept_summary, ...asset.key_ideas].join(' ')
  const ebText = readFileSync(`educational-brain/concepts/english/${NOUNS}.md`, 'utf8')
  const s = sceneOf(NOUNS)
  const groups = s.steps.map((st) => {
    const header = (st.objects as Obj[]).find((o) => o.type === 'node')!
    const items = (st.objects as Obj[]).filter((o) => o.type === 'label').map((o) => o.text!)
    return { label: header.text!, items, narration: st.narration ?? '' }
  })

  it('draws exactly the four kinds the KG description names, one group per stage, in that order', () => {
    expect(node.description).toMatch(/people, places, things, or ideas/)
    expect(groups.map((g) => g.label)).toEqual(['Person', 'Place', 'Thing', 'Idea'])
    s.steps.forEach((st, i) => expect(st.narration!.startsWith(`${groups[i].label}: `)).toBe(true))
  })

  it('every example word is one the concept\'s teaching asset or Educational Brain entry already uses', () => {
    const all = groups.flatMap((g) => g.items)
    expect(all).toEqual(['teacher', 'Ms. Chen', 'city', 'Paris', 'dog', 'book', 'happiness', 'freedom', 'honesty'])
    for (const word of all) expect(`${assetText}\n${ebText}`, word).toContain(word)
  })

  it('the capital-letter claim is true of the drawn examples and is the asset\'s own (proper nouns are capitalised)', () => {
    expect(assetText).toMatch(/capitalized/)
    const byLabel = Object.fromEntries(groups.map((g) => [g.label, g]))
    for (const label of ['Person', 'Place']) {
      expect(byLabel[label].narration).toContain('capital letter')
      const [general, particular] = byLabel[label].items
      expect(general).toBe(general.toLowerCase())                  // the general noun is lower-case
      expect(particular[0]).toBe(particular[0].toUpperCase())      // the particular one starts with a capital
    }
  })

  it('the idea group is the Educational Brain\'s point: abstract nouns (happiness, freedom, honesty) are still nouns although nothing can be touched', () => {
    const idea = groups.find((g) => g.label === 'Idea')!
    expect(ebText).toMatch(/abstract nouns like "happiness," "freedom," "honesty"/)
    expect(idea.narration).toContain('cannot touch')
    expect(idea.narration).toContain('still a noun')
    expect(groups.find((g) => g.label === 'Thing')!.narration).toContain('can touch')
  })

  it('states no number, no rule beyond the four kinds and the capital letter, and no internal concept id', () => {
    const text = [...objs(s).map((o) => o.text ?? ''), ...s.steps.map((st) => st.narration ?? ''), s.title, s.teachingGoal ?? ''].join(' ')
    expect(text).not.toMatch(/\d/)
    expect(text).not.toMatch(/\beng\.[a-z]+\.[a-z-]+/)
    expect(s.teachingGoal).toContain('names a person, a place, a thing or an idea')
  })
})
