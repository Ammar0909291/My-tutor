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

// ── figures 2-4 (2026-10-20): the five feet, style-shifting, cohesion × coherence ───────────────────────────────────────────────────
// Each is the figure the concept's own teaching asset asks for (`visual_teaching_suggestions`), drawn. They were generated process flowcharts
// ("Steps in Discourse Analysis", "Sociolinguistic analysis workflow", "Analyzing Meter and Rhyme in a Poem") or, on the first ask, "I don't have
// a picture for this one" (hard-concept learner run, production, 2026-10-20). Faithfulness policy as for nouns: every word is one the sources use,
// every claim is one they make, and a number appears only if a source states it.
import * as EF from '@/lib/teaching/sceneGenerators/englishFigures'

const METER = 'eng.literature.meter-and-rhyme', SOCIO = 'eng.linguistics.sociolinguistics-intro', DISCOURSE = 'eng.linguistics.discourse-analysis-intro'
const findAssetFor = (x: unknown, id: string): Record<string, unknown> | undefined => {
  if (Array.isArray(x)) { for (const v of x) { const r = findAssetFor(v, id); if (r) return r }; return undefined }
  if (x && typeof x === 'object') { const o = x as Record<string, unknown>; if (o.concept_id === id) return o; for (const v of Object.values(o)) { const r = findAssetFor(v, id); if (r) return r } }
  return undefined
}
const norm = (t: string) => t.toLowerCase().replace(/[‘’']/g, "'").replace(/[“”]/g, '"')
const stems = (t: string) => (norm(t).match(/[a-z]{5,}/g) ?? []).map((w) => w.slice(0, 5))
const ASSETS = JSON.parse(readFileSync('docs/english/teaching-assets/assets.json', 'utf8'))
const sourcesOf = (id: string) => {
  const a = findAssetFor(ASSETS, id)!
  return norm([JSON.stringify(a.concept_summary), JSON.stringify(a.key_ideas), JSON.stringify(a.visual_teaching_suggestions), JSON.stringify(a.worked_example_blueprint), readFileSync(`educational-brain/concepts/english/${id}.md`, 'utf8')].join('\n'))
}
const textOf = (s: SceneSpec) => [...objs(s).map((o) => o.text ?? ''), ...s.steps.map((st) => st.narration ?? ''), s.title, s.teachingGoal ?? ''].join(' ')

const STYLE = 'eng.composition.style-voice-and-tone'
describe.each([
  [METER, 'meter-five-feet'], [SOCIO, 'sociolinguistics-style-shifting'], [DISCOURSE, 'discourse-cohesion-coherence'], [STYLE, 'style-voice-tone'],
] as const)('%s is served its own drawn figure (%s), from the concept\'s own sources', (id, sceneId) => {
  const s = sceneOf(id)
  const sources = sourcesOf(id)
  it.each([null, 'diagram'] as const)('is a concept-scope registry scene, not retired (request %s)', (req) => {
    const d = served(id, req)
    expect(d.graphical, d.provenance).toBe(true)
    expect(d.asset?.scope).toBe('concept')
    expect((d.payload as { sceneSpec?: { id?: string } }).sceneSpec?.id).toBe(sceneId)
    expect(isRetiredVisualBinding(id)).toBe(false)
    expect(INSUFFICIENT_FOR_CONCEPT.has(id)).toBe(false)
  })
  it('passes the scene validator and the figure audit that admits a figure to a learner', () => {
    const v = validateSceneSpec(s) as { valid?: boolean; ok?: boolean; errors?: unknown }
    expect(v.valid ?? v.ok, JSON.stringify(v.errors ?? v)).toBe(true)
    expect(payloadBlockers({ renderer: 'scene', sceneSpec: s } as never)).toEqual([])
    expect(s.steps.reduce((n, st) => n + (st.narration ?? '').length, 0)).toBeLessThan(1000)
  })
  it('every claim (title, goal, narration, labels) uses only words the concept\'s own sources use (5-letter stems)', () => {
    const sourceStems = new Set(stems(sources))
    const GENERIC = new Set(['figur', 'shown', 'other', 'there', 'their', 'which', 'these', 'about', 'where', 'whose', 'stage', 'large', 'small', 'drawn'])
    const missing = [...new Set(stems(textOf(s)))].filter((w) => !sourceStems.has(w) && !GENERIC.has(w))
    expect(missing, `${id}: words no source uses`).toEqual([])
  })
  it('states no internal concept id, and no number the sources do not state', () => {
    const t = textOf(s)
    expect(t).not.toMatch(/\beng\.[a-z]+\.[a-z-]+/)
    for (const n of t.match(/\d+%?/g) ?? []) expect(sources, `number ${n}`).toContain(n)
  })
})

describe('eng.literature.meter-and-rhyme: the five feet are drawn as beat diagrams, and the pattern each row spells is read back from the dot sizes', () => {
  const s = EF.buildFeetScene()
  const sources = sourcesOf(METER)
  it('draws the five feet the asset names, with the example the asset gives for each, one row each', () => {
    expect(EF.FEET.map((f) => f.name)).toEqual(['iamb', 'trochee', 'anapest', 'dactyl', 'spondee'])
    for (const f of EF.FEET) expect(sources, f.example).toContain(norm(f.example))
    expect(EF.checkFeetConsistency(s)).toEqual({ ok: true, errors: [] })
  })
  it('the drawn dot sizes spell each foot\'s pattern, and that pattern is the one the asset writes beside the foot\'s name', () => {
    EF.FEET.forEach((f, i) => {
      expect(EF.drawnPattern(s, i)).toBe(EF.footPatternText(f))
      expect(sources, f.name).toContain(`${f.name} (${EF.footPatternText(f)})`)
    })
  })
  it('the capitalised syllables of each example are its stressed beats (the stress the figure draws is the stress the word has)', () => {
    for (const f of EF.FEET) expect((f.example.match(/\b[A-Z]{2,}\b/g) ?? []).length).toBe(f.pattern.filter((p) => p === 's').length)
  })
  it('a row whose dots spell the wrong pattern is rejected', () => {
    const bad = JSON.parse(JSON.stringify(s)) as SceneSpec
    const row = (bad.steps.flatMap((st) => st.objects as Array<Obj & { position?: number[]; radius?: number }>)).filter((o) => o.type === 'node' && Math.abs(o.position![1] - EF.beatPosition(0, 0)[1]) < 1e-6)
    row.forEach((o) => { o.radius = o.radius === EF.R_STRESSED ? EF.R_UNSTRESSED : EF.R_STRESSED })   // iamb drawn as a trochee
    expect(EF.checkFeetConsistency(bad).ok).toBe(false)
  })
})

describe('eng.linguistics.sociolinguistics-intro: the style-shifting graph shows the order the asset states, strictly between 0% and 100%', () => {
  const s = EF.buildStyleShiftScene()
  const sources = sourcesOf(SOCIO)
  it('the asset states the order the points draw: highest at the gate, lower with the officer, lowest reading aloud', () => {
    expect(sources).toMatch(/highest at the gate, lower with the officer, lowest reading aloud/)
    expect(EF.SETTINGS).toEqual(['reading aloud', 'with the officer', 'at the gate'])
    expect(EF.checkStyleShiftConsistency(s)).toEqual({ ok: true, errors: [] })
    const ys = EF.RATE.map((_, i) => EF.pointOf(i)[1])
    expect([...ys].sort((a, b) => a - b)).toEqual(ys)
  })
  it('no point is on the 0% or 100% line: "no setting shows 0% or 100%" is the asset\'s own point', () => {
    expect(sources).toMatch(/no setting shows 0% or 100%/)
    for (let i = 0; i < EF.RATE.length; i++) { expect(EF.pointOf(i)[1]).toBeGreaterThan(EF.pointOf(0)[1] - EF.RATE[0] + EF.Y_FLOOR); expect(EF.pointOf(i)[1]).toBeLessThan(EF.pointOf(0)[1] - EF.RATE[0] + EF.Y_CEIL) }
  })
  it('the narration says the figure shows an ORDER, not measured values (the asset gives none)', () => {
    expect(s.steps.map((st) => st.narration).join(' ')).toMatch(/shows this order, not measured values/)
  })
  it('mutations: reversed order and a point on the 100% line are rejected', () => {
    const swapped = JSON.parse(JSON.stringify(s)) as SceneSpec
    const nodes = swapped.steps.flatMap((st) => st.objects as Array<Obj & { position?: number[] }>).filter((o) => o.type === 'node').sort((a, b) => a.position![0] - b.position![0])
    ;[nodes[0].position![1], nodes[2].position![1]] = [nodes[2].position![1], nodes[0].position![1]]
    expect(EF.checkStyleShiftConsistency(swapped).ok).toBe(false)
    const top = JSON.parse(JSON.stringify(s)) as SceneSpec
    const n = (top.steps.flatMap((st) => st.objects as Array<Obj & { position?: number[] }>)).filter((o) => o.type === 'node').sort((a, b) => a.position![0] - b.position![0])[2]
    n.position![1] = -3 + EF.Y_CEIL
    expect(EF.checkStyleShiftConsistency(top).ok).toBe(false)
  })
})

describe('eng.linguistics.discourse-analysis-intro: the cohesion × coherence grid pins the concept\'s own specimens where the concept puts them', () => {
  const s = EF.buildCohesionCoherenceScene()
  const sources = sourcesOf(DISCOURSE)
  it('the specimens are the concept\'s own: the tie-free coherent text, and the every-tie-kept scrambled one', () => {
    expect(sources).toContain('the gate stood open. nobody came.')
    expect(sources).toMatch(/keep every tie, scramble the propositions/)
    expect(EF.checkCohesionCoherenceConsistency(s)).toEqual({ ok: true, errors: [] })
  })
  it('the tie-free coherent text sits at few ties / full sense, and the scrambled one at many ties / no sense', () => {
    const gate = EF.SPECIMENS.find((x) => x.id === 'gate')!, ties = EF.SPECIMENS.find((x) => x.id === 'ties')!
    expect(gate.pos[0]).toBeLessThan(EF.MID.x); expect(gate.pos[1]).toBeGreaterThan(EF.MID.y)
    expect(ties.pos[0]).toBeGreaterThan(EF.MID.x); expect(ties.pos[1]).toBeLessThan(EF.MID.y)
  })
  it('the asset says the two come apart in both directions (the claim the grid makes visible)', () => {
    expect(sources).toMatch(/the two dissociate in both directions/)
  })
  it('a specimen pinned in the wrong quadrant is rejected', () => {
    const bad = JSON.parse(JSON.stringify(s)) as SceneSpec
    const n = (bad.steps.flatMap((st) => st.objects as Array<Obj & { position?: number[] }>)).filter((o) => o.type === 'node')[0]
    n.position![0] = EF.MID.x + 3
    expect(EF.checkCohesionCoherenceConsistency(bad).ok).toBe(false)
  })
})

// ── figure 5 (2026-10-21): style, voice and tone ───────────────────────────────────────────────────────────────────────────────────────
// The teaching asset asks for "a three-layer diagram: STYLE (observable choices) → projects → VOICE (persistent identity), with TONE as a per-piece
// dial on the side" and "a traceability table: stylistic effect ← the concrete choices producing it". The concept had no figure (learner run, 2026-10-21).
import * as ESF from '@/lib/teaching/sceneGenerators/englishStyleFigure'

describe('eng.composition.style-voice-and-tone: the three layers and two traceability rows are the asset\'s own, and the geometry says what they claim', () => {
  const s = ESF.buildStyleVoiceToneScene()
  const sources = sourcesOf(STYLE)
  const clone = () => JSON.parse(JSON.stringify(s)) as SceneSpec

  it('the asset names this diagram, the three terms and the two traces the figure draws', () => {
    expect(sources).toMatch(/a three-layer diagram: style \(observable choices\) → projects → voice \(persistent identity\), with tone as a per-piece dial/)
    expect(sources).toMatch(/voice persists, tone varies/)
    expect(sources).toMatch(/short declaratives read urgent/)
    expect(sources).toMatch(/long subordinated sentences read reflective/)
  })
  it('passes its own consistency check', () => { expect(ESF.checkStyleVoiceToneConsistency(s)).toEqual({ ok: true, errors: [] }) })
  it('STYLE is written above VOICE and the projecting arrow runs from the first down to the second', () => {
    expect(ESF.STYLE_AT[1]).toBeGreaterThan(ESF.VOICE_AT[1])
    const a = objs(s).find((o) => o.type === 'arrow') as unknown as { from: number[]; to: number[] }
    expect(a.from[1]).toBeGreaterThan(a.to[1])
  })
  it('the dial pointer lies inside its ring', () => {
    const [x, y] = ESF.pointerEnd()
    expect(Math.hypot(x - ESF.DIAL.c[0], y - ESF.DIAL.c[1])).toBeLessThan(ESF.DIAL.r)
  })
  it('each trace reads left to right, choice → effect, and is a pair the asset states', () => {
    for (const t of ESF.TRACES) {
      expect(t.choiceX).toBeLessThan(t.arrow[0]); expect(t.arrow[1]).toBeLessThan(t.effectX)
      expect(sources, `${t.choice} read ${t.effect}`).toContain(`${t.choice} read ${t.effect}`)
    }
  })
  it('states no number and says voice persists while tone varies', () => {
    const text = textOf(s)
    expect(text).not.toMatch(/\d/)
    expect(s.steps.map((st) => st.narration).join(' ')).toMatch(/Voice persists, tone varies/)
  })
  // Mutations: figures that look the same and say something false.
  it('STYLE written below VOICE (the layers the wrong way round) is rejected', () => {
    const bad = clone()
    const all = bad.steps.flatMap((st) => st.objects) as Array<{ type?: string; text?: string; position?: number[] }>
    const [sl, vl] = [all.find((o) => o.text === 'STYLE: observable choices')!, all.find((o) => o.text === 'VOICE: persistent identity')!]
    ;[sl.position![1], vl.position![1]] = [vl.position![1], sl.position![1]]
    expect(ESF.checkStyleVoiceToneConsistency(bad).errors.join(' ')).toMatch(/STYLE is not above VOICE/)
  })
  it('a dial pointer that pokes outside its ring is rejected', () => {
    const bad = clone()
    const p = (bad.steps.flatMap((st) => st.objects) as Array<{ type?: string; from?: number[]; to?: number[] }>).find((o) => o.type === 'bond' && o.from![0] === ESF.DIAL.c[0])!
    p.to = [p.to![0] + 3, p.to![1] + 3, 0]
    expect(ESF.checkStyleVoiceToneConsistency(bad).errors.join(' ')).toMatch(/pointer/)
  })
  it('an effect moved off its choice’s line is rejected', () => {
    const bad = clone()
    const e = (bad.steps.flatMap((st) => st.objects) as Array<{ type?: string; text?: string; position?: number[] }>).find((o) => o.text === 'urgent')!
    e.position![1] += 1.5
    expect(ESF.checkStyleVoiceToneConsistency(bad).ok).toBe(false)
  })
})
