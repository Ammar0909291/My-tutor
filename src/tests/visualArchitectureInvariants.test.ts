/**
 * VISUAL ARCHITECTURE INVARIANTS — properties over the WHOLE live registry and
 * KG, not examples.
 *
 * Each block names the invariant it holds and the defect that motivated it
 * (visual architecture hardening, 2026-09-24). Where an invariant lives in the
 * route, the route source is read the same way the existing wiring tests do.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import {
  RETIRED_VISUAL_BINDINGS, RETIRED_ASSET_FINGERPRINTS, retiredAssetVerdict,
} from '@/lib/teaching/visual/retired'
import { figureFingerprint } from '@/lib/teaching/visual/fingerprint'
import { figureFingerprint as verdictCacheFingerprint } from '@/lib/teaching/visual/verdictCache'
import {
  lookupConceptVisualBinding, listDomainRules, DOMAIN_CARD_HOME, getConceptSceneGenerator,
} from '@/lib/teaching/visualRegistry'
import { buildCanonicalScene } from '@/lib/teaching/visual/conceptSceneParams'
import { describeVisualTurn, tierOf } from '@/lib/teaching/visual/turnRecord'
import type { VisualDecision } from '@/lib/teaching/visual/types'

const ROOT = process.cwd()
const ROUTE = readFileSync(join(ROOT, 'src/app/api/learn/chat/route.ts'), 'utf8')

/** Every KG concept id across every registered subject. */
const ALL_CONCEPTS: string[] = (() => {
  const ids: string[] = []
  for (const dir of ['mathematics', 'physics', 'chemistry', 'computer-science', 'biology', 'english']) {
    const f = join(ROOT, 'docs', dir, 'kg', 'graph.json')
    if (!existsSync(f)) continue
    const g = JSON.parse(readFileSync(f, 'utf8'))
    const cs: Array<{ id: string }> = Array.isArray(g.concepts) ? g.concepts : Object.values(g.concepts ?? g)
    for (const c of cs) ids.push(c.id)
  }
  return ids
})()

const resolve = (conceptId: string, message = '', learnerRequest: 'diagram' | null = null) =>
  resolveVisual({ message, lessonConceptId: conceptId, learnerRequest })

const DECISIONS = ALL_CONCEPTS.map((id) => [id, resolve(id)] as const)
const GRAPHICAL = DECISIONS.filter(([, d]) => d.graphical)

describe('corpus sanity', () => {
  it('the KG is loaded and a meaningful share of it draws something', () => {
    expect(ALL_CONCEPTS.length).toBeGreaterThan(1500)
    expect(GRAPHICAL.length).toBeGreaterThan(300)
  })
})

describe('RETIRED BAD VISUAL CANNOT BE SERVED', () => {
  const retired = Object.keys(RETIRED_VISUAL_BINDINGS)

  it('the retirement evidence and the retired-asset record cover exactly the same concepts', () => {
    expect(Object.keys(RETIRED_ASSET_FINGERPRINTS).sort()).toEqual([...retired].sort())
    for (const id of retired) expect(RETIRED_ASSET_FINGERPRINTS[id].length).toBeGreaterThan(0)
  })

  it.each(retired)('%s: no tier serves a retired asset or a broad rule, with or without a request', (id) => {
    for (const d of [resolve(id), resolve(id, 'show me a diagram', 'diagram')]) {
      if (!d.graphical) {
        expect(d.provenance).toBe('no-figure:retired-binding')
        continue
      }
      // Anything served for a retired concept must be a genuine replacement.
      expect(retiredAssetVerdict(id, {
        provenance: d.asset!.provenance, fingerprint: figureFingerprint(d.payload),
      })).toBe('replacement')
    }
  })

  it('the recorded fingerprints are what the retired tiers would still offer today (the record is honest)', () => {
    for (const id of retired) {
      const offered: string[] = []
      const scene = buildCanonicalScene(getConceptSceneGenerator(id), id)
      if (scene) offered.push(figureFingerprint({ renderer: 'scene', sceneSpec: scene }))
      const b = lookupConceptVisualBinding(id)
      if (b) offered.push(figureFingerprint({ renderer: 'card', visualType: b.entry.primary }))
      // Every asset still on offer was judged; a NEW one would be a replacement.
      for (const fp of offered) expect(RETIRED_ASSET_FINGERPRINTS[id]).toContain(fp)
    }
  })

  it('one fingerprint definition: the cache and the retirement hash identically', () => {
    const p = { renderer: 'card', visualType: 'food_chain' }
    expect(verdictCacheFingerprint(p)).toBe(figureFingerprint(p))
  })
})

describe('VALID REPLACEMENT CAN OVERRIDE RETIRED DATA (pure verdict)', () => {
  const table = { 'x.retired': ['fOLD'] }
  it('the retired content is refused under any provenance', () => {
    for (const provenance of ['curated', 'generator', 'domain-default', 'generator-default', 'engine']) {
      expect(retiredAssetVerdict('x.retired', { provenance, fingerprint: 'fOLD' }, table)).toBe('retired-asset')
    }
  })
  it('a broad rule is never a replacement, even with new content', () => {
    expect(retiredAssetVerdict('x.retired', { provenance: 'domain-default', fingerprint: 'fNEW' }, table)).toBe('broad-rule')
    expect(retiredAssetVerdict('x.retired', { provenance: 'generator-default', fingerprint: 'fNEW' }, table)).toBe('broad-rule')
  })
  it('concept-authored new content IS the replacement — no row to delete', () => {
    expect(retiredAssetVerdict('x.retired', { provenance: 'generator', fingerprint: 'fNEW' }, table)).toBe('replacement')
    expect(retiredAssetVerdict('x.retired', { provenance: 'curated', fingerprint: 'fNEW' }, table)).toBe('replacement')
  })
})

describe('WRONG DOMAIN VISUAL CANNOT BE SERVED', () => {
  it('every served domain-default card is declared to illustrate the concept\'s domain', () => {
    for (const [id, d] of GRAPHICAL) {
      if (d.asset?.provenance !== 'domain-default') continue
      const b = lookupConceptVisualBinding(id)!
      expect(DOMAIN_CARD_HOME[b.entry.primary]).toContain(b.scope)
    }
  })

  it('the only unfaithful domain rule on file is bio.cell -> food_chain, and it serves nothing', () => {
    const unfaithful = listDomainRules().filter((r) => !r.faithful)
    expect(unfaithful).toEqual([{ prefix: 'bio.cell', primary: 'food_chain', faithful: false }])
    // A future bio.cell concept with no authored figure gets NO figure, not an ecology diagram.
    expect(lookupConceptVisualBinding('bio.cell.some-future-concept')).toBeNull()
  })

  it('UNRELATED DOMAIN FALLBACK REMAINS VALID — faithful domain rules still serve', () => {
    const b = lookupConceptVisualBinding('bio.eco.population-ecology')
    expect(b?.tier).toBe('domain')
    expect(b?.entry.primary).toBe('food_chain')
    expect(lookupConceptVisualBinding('math.calc.limits')?.entry.primary).toBe('coordinate_plane')
  })
})

describe('TIER ORDER IS DETERMINISTIC AND CORRECT', () => {
  it('resolving the same concept twice yields byte-identical decisions', () => {
    for (const [id, d] of DECISIONS.slice(0, 600)) expect(JSON.stringify(resolve(id))).toBe(JSON.stringify(d))
  })

  it('TIER 0 CONCEPT VISUAL BEATS DOMAIN FALLBACK: a buildable, unretired scene always wins over a domain card', () => {
    for (const [id, d] of DECISIONS) {
      if (id in RETIRED_VISUAL_BINDINGS) continue
      if (!buildCanonicalScene(getConceptSceneGenerator(id), id)) continue
      expect(d.payload?.renderer).toBe('scene')
      expect(tierOf(d)).toBe('tier0-generator')
    }
  })

  it('TIER 1 CURATED BEATS DOMAIN FALLBACK: an exact row is never shadowed by a prefix rule', () => {
    for (const [id, d] of DECISIONS) {
      if (id in RETIRED_VISUAL_BINDINGS) continue
      if (buildCanonicalScene(getConceptSceneGenerator(id), id)) continue
      if (lookupConceptVisualBinding(id)?.tier !== 'exact') continue
      expect(d.asset?.provenance).toBe('curated')
    }
  })

  it('SAFE ABSENCE: a concept with no scene and no binding draws nothing', () => {
    for (const [id, d] of DECISIONS) {
      if (buildCanonicalScene(getConceptSceneGenerator(id), id) || lookupConceptVisualBinding(id)) continue
      expect(d.graphical).toBe(false)
    }
  })
})

describe('TELEMETRY MATCHES ACTUAL PROVENANCE', () => {
  it('a scene is never named after a domain card (bio.cell scenes were reported as "food_chain")', () => {
    for (const [id, d] of GRAPHICAL) {
      if (d.payload?.renderer !== 'scene') continue
      const b = lookupConceptVisualBinding(id)
      if (b?.tier === 'domain') expect(d.representation).not.toBe(b.entry.primary)
      expect(d.representation).not.toBe('food_chain')
    }
    expect(resolve('bio.cell.apoptosis').representation).toBe('process')
  })

  it('CROSS-SUBJECT VISUAL CONTAMINATION IS IMPOSSIBLE: every decision is about the concept asked for', () => {
    for (const [id, d] of GRAPHICAL) {
      expect(d.conceptId).toBe(id)
      expect(d.asset?.conceptId).toBe(id)
    }
  })

  it('the tier is derived from the asset itself, for every graphical decision', () => {
    for (const [, d] of GRAPHICAL) expect(tierOf(d)).not.toBe('none')
    for (const [, d] of DECISIONS.filter(([, x]) => !x.graphical)) expect(tierOf(d)).toBe('none')
  })
})

describe('SERVED STATE MATCHES LEARNER RESPONSE', () => {
  const scene = GRAPHICAL.find(([, d]) => d.payload?.renderer === 'scene')![1]
  const held: VisualDecision = { ...scene, session: { ...scene.session!, turns: 2 } }

  it('served is read from the response fields alone', () => {
    const r = describeVisualTurn(scene, { sceneSpec: (scene.payload as { sceneSpec: unknown }).sceneSpec }, false)
    expect(r).toMatchObject({ decided: true, served: true, onScreen: true, tier: 'tier0-generator' })
  })

  it('a HELD figure is decided and on screen, but not served by this message', () => {
    expect(describeVisualTurn(held, {}, false)).toMatchObject({ decided: true, served: false, onScreen: true, heldTurns: 2 })
  })

  it('a decided figure the response does not carry is NOT reported served', () => {
    expect(describeVisualTurn(scene, {}, false).served).toBe(false)
  })

  it('no figure carries its reason', () => {
    const none = resolve('phys.em.lc-circuits', 'please draw the circuit', 'diagram')
    expect(describeVisualTurn(none, {}, true)).toMatchObject({
      decided: false, served: false, onScreen: false, requested: true, tier: 'none', reason: 'no-figure:retired-binding',
    })
  })

  it('route: the turn event\'s visualServed is the response-derived record, not the decision', () => {
    expect(ROUTE).not.toMatch(/visualServed: resolvedVisualDecision\?\.graphical/)
    expect(ROUTE).toMatch(/visualServed: visualTurnServed,/)
    const record = ROUTE.indexOf("console.log('[learn/chat] VISUAL_TURN='")
    const clamp = ROUTE.indexOf('const visualFired = Boolean(detectedVisualSpec || detectedSceneSpec || responseVisual)')
    expect(clamp).toBeGreaterThan(0)
    expect(record).toBeGreaterThan(clamp)
  })
})

describe('NO FIGURE CLAIM WITHOUT FIGURE — the prompt never offers a figure V2 declined', () => {
  it('every "what can be shown" consumer after the resolver reads the V2-derived value', () => {
    const reconcile = ROUTE.indexOf('V2 IS THE ONLY SOURCE OF "WHAT CAN BE SHOWN"')
    expect(reconcile).toBeGreaterThan(0)
    expect(ROUTE.slice(reconcile, reconcile + 2000)).toMatch(/availableVisualHoisted = card \? card\.visualType : null/)
    // The diagram-request directive and the visual-first directive.
    expect(ROUTE).not.toMatch(/buildLearnerRequestBlock\(\s*learnerRequestHoisted, availableVisual,/)
    expect(ROUTE).toMatch(/decideVisualFirst\(availableVisualHoisted,/)
    expect(ROUTE).not.toMatch(/decideVisualFirst\(availableVisual,/)
  })

  it('the phantom-claim strip is gated on the V2 decision, never on the model\'s own tag', () => {
    expect(ROUTE).toMatch(/const anyVisualAttachedThisTurn = visualDecisionHoisted\?\.graphical === true/)
  })
})

describe('GENERATED FIGURES: every discard after generation corrects the served ledger', () => {
  // resolveVisualForTurn writes `served` as a pre-critic prediction when a
  // figure is generated; each exit that then discards the figure must append a
  // served:false correction (dcf9ceb). This holds that as a structural rule so
  // a new exit cannot silently forget it.
  const src = readFileSync(join(ROOT, 'src/lib/teaching/visual/resolveVisual.ts'), 'utf8')
  const fnStart = src.indexOf('export async function resolveVisualForTurn(')
  const body = src.slice(src.indexOf('const result = await generateConceptFigure(', fnStart), src.indexOf('\n}\n', fnStart))
  const lines = body.split('\n')
  // Exits that never had an ok figure to discard, or never predicted served:true.
  const EXEMPT = [/no-figure:engine-/, /no-figure:retry-\$\{retry\.reason\}/, /no-figure:held-for-review/]

  it('each no-figure exit is either exempt or immediately preceded by recordNotServed', () => {
    const exits = lines
      .map((l, i) => ({ l, i }))
      .filter(({ l }) => /return \{ \.\.\.decision, provenance: .no-figure:/.test(l))
    expect(exits.length).toBeGreaterThanOrEqual(6)
    for (const { l, i } of exits) {
      if (EXEMPT.some((re) => re.test(l))) continue
      const prev = lines.slice(Math.max(0, i - 2), i).join('\n')
      expect(prev, `exit without a served:false correction: ${l.trim()}`).toMatch(/recordNotServed\(/)
    }
  })
})
