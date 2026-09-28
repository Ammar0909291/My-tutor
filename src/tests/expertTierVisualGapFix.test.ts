/**
 * CHEMISTRY EXPERT-TIER VISUAL GAP (2026-09-28).
 *
 * MEASURED live (disposable accounts, production): chem.org.pericyclic,
 * chem.dblock.organometallics and chem.poly.biodegradable returned ZERO figures
 * across 12 explicit diagram requests (4 each); the tutor fell back to
 * apologetic ASCII art every time.
 *
 * ROOT CAUSE (production `visualization_cache` + `visual_generation_outcome`):
 * none of the three had a Tier 0/1 binding, so each depended on Tier 3 — and
 * the generator answered `{type: "none"}` (`no-suitable-form`), its deliberate
 * decline. verdictCache.writeDecline stores that for 30 days, so every later
 * request stopped at `no-figure:declined-cached` without reaching generation
 * (pericyclic: declined 2026-09-17, hit 90 times; organometallics: 09-06, 37;
 * biodegradable: 09-28 10:36, right after the critic had rejected its cached
 * candidate). The decline cache worked as designed; the gap is content.
 *
 * FIX: a deterministic Tier 0 scene per concept from existing generators,
 * content taken only from each concept's Educational Brain entry. These tests
 * pin that each resolves to its own scene — including when the production
 * decline is still cached — and that the scene says what the EB says.
 */
import { describe, expect, it } from 'vitest'
import { resolveVisual, resolveVisualForTurn } from '@/lib/teaching/visual/resolveVisual'
import { buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'
import { declineKey } from '@/lib/teaching/visual/verdictCache'
import type { VisualizationCacheClient } from '@/lib/teaching/visuals/visualizationCache'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

const THE_THREE = ['chem.org.pericyclic', 'chem.dblock.organometallics', 'chem.poly.biodegradable'] as const

/** A cache holding exactly what production holds: a live decline for the concept. */
function declinedCache(conceptId: string): VisualizationCacheClient {
  const code = JSON.stringify({ reason: 'no-suitable-form', grounding: 'any', declinedAt: Date.now() })
  return {
    visualizationCache: {
      findUnique: async ({ where }) => (where.conceptKey === declineKey(conceptId) ? { code } : null),
      update: async () => ({}),
      create: async () => ({}),
    },
  }
}

const text = (s: SceneSpec) =>
  [s.title, s.teachingGoal ?? '', ...s.steps.flatMap((st) => [st.narration ?? '', ...st.objects.map((o) => o.text ?? '')])].join(' | ')

describe.each(THE_THREE)('%s resolves to its own Tier 0 scene', (conceptId) => {
  it('an explicit diagram request is answered with a figure of THIS concept', () => {
    const d = resolveVisual({ message: 'can you give me a diagram?', lessonConceptId: conceptId, learnerRequest: 'diagram' })
    expect(d.graphical).toBe(true)
    expect(d.provenance).toBe(`generator:${conceptId}:concept-authored`)
    expect(d.asset?.conceptId).toBe(conceptId)
  })

  it('is served even while production still caches a generator decline', async () => {
    const d = await resolveVisualForTurn(
      { message: 'can you give me a diagram?', lessonConceptId: conceptId, learnerRequest: 'diagram' },
      { cacheClient: declinedCache(conceptId) },
    )
    expect(d.graphical).toBe(true)
    expect(d.provenance).toBe(`generator:${conceptId}:concept-authored`)
  })

  it('every step is narrated and carries objects', () => {
    const s = buildCanonicalScene(null, conceptId)!
    expect(s.steps.length).toBeGreaterThanOrEqual(3)
    for (const st of s.steps) {
      expect((st.narration ?? '').length).toBeGreaterThan(0)
      expect(st.objects.length).toBeGreaterThan(0)
    }
  })
})

describe('the scenes say what the Educational Brain says', () => {
  it('pericyclic: the three families and their thermal Woodward–Hoffmann outcomes', () => {
    const t = text(buildCanonicalScene(null, 'chem.org.pericyclic')!)
    for (const s of ['Cycloaddition', 'Electrocyclic', 'Sigmatropic', 'Diels–Alder: thermally allowed',
      '[2+2]: thermally forbidden, photochemically allowed', '4n electrons: conrotatory when heated',
      '4n+2 electrons: disrotatory when heated']) expect(t).toContain(s)
  })

  it('organometallics: Wilkinson’s cycle returns to the 16-electron Rh(I) catalyst', () => {
    const s = buildCanonicalScene(null, 'chem.dblock.organometallics')!
    const t = text(s)
    for (const x of ['Oxidative addition of H₂', 'Migratory insertion', 'Reductive elimination', 'from 16 to 18 electrons'])
      expect(t).toContain(x)
    expect(s.steps.at(-1)!.narration).toBe('The cycle returns to Rh(I) catalyst, 16 e⁻: the sequence repeats.')
  })

  it('biodegradable: the backbone decides — bio-polyethylene is NOT biodegradable', () => {
    const s = buildCanonicalScene(null, 'chem.poly.biodegradable')!
    const carbon = s.steps.find((st) => (st.narration ?? '').startsWith('All-carbon backbone'))!
    expect(carbon.narration).toContain('not biodegradable, whatever the feedstock')
    expect(carbon.objects.map((o) => o.text)).toContain('Bio-polyethylene (from bio-based ethanol)')
    expect(text(s)).toContain('a conjugated π-system AND a doping step')
  })
})

/**
 * phys.astro.gravitational-waves (same fix, 2026-09-28). Live QA: 0 figures in
 * 4 explicit requests. Production logs (`[visual-critic-retry]`): every retry
 * candidate was a strain-vs-time GRAPH rejected before judging —
 * "equation does not compile — the plot would be blank" — because the
 * generator wrote `t`, π and 1e-21, none of which mathParser accepts.
 */
describe('phys.astro.gravitational-waves resolves to its own Tier 0 scene', () => {
  const id = 'phys.astro.gravitational-waves'

  it('is served on an explicit request, and while a stale reject is cached', async () => {
    const d = resolveVisual({ message: 'can you give me a diagram?', lessonConceptId: id, learnerRequest: 'diagram' })
    expect(d.graphical).toBe(true)
    expect(d.provenance).toBe(`generator:${id}:concept-authored`)
    const a = await resolveVisualForTurn(
      { message: 'give me a diagram', lessonConceptId: id, learnerRequest: 'diagram' },
      { cacheClient: declinedCache(id) },
    )
    expect(a.provenance).toBe(`generator:${id}:concept-authored`)
  })

  it('says what the Educational Brain says: no medium, strain h = ΔL/L, 1/r not 1/r²', () => {
    const t = text(buildCanonicalScene(null, id)!)
    for (const s of ['no medium is needed', 'h = ΔL/L', 'not 1/r² like a static field', 'GW150914'])
      expect(t).toContain(s)
  })
})
