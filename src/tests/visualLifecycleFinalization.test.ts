/**
 * VISUAL LIFECYCLE FINALIZATION — the two semantics the hardening pass left
 * implicit, now explicit and pinned.
 *
 * A. RETIREMENT RETIRES AN ARTIFACT, NOT A CONCEPT (retired.ts, "WHAT
 *    RETIREMENT MEANS"). A retired artifact is refused on EVERY tier — the
 *    synchronous tiers and the approved/generated tiers alike. A figure of the
 *    concept with content the retirement never saw may serve. The register row
 *    is never removed because a replacement exists.
 *
 * B. PRECEDENCE IS BY SPECIFICITY. A human-approved figure of THIS concept
 *    beats a subject-wide card (a general illustration); an exact curated card
 *    and a Tier 0 scene still beat an approved figure; a subject-wide card is
 *    never replaced by a GENERATED figure. "Does this concept have an approved
 *    figure?" comes from an in-process index, never a per-turn query.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { GeneratedFigure } from '@/lib/teaching/visual/visualEngine'
import type { GenerationOutcome, GenerationOutcomeSink } from '@/lib/teaching/visual/generationOutcome'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

// The retirement table, extended at runtime by the test with the fingerprint
// of a figure that PASSES validation — the real retired scenes already fail
// it, which would leave the every-tier refusal untested.
const { EXTRA } = vi.hoisted(() => ({ EXTRA: { conceptId: '', fingerprints: [] as string[] } }))
vi.mock('@/lib/teaching/visual/retired', async (importOriginal) => {
  const real = await importOriginal<typeof import('@/lib/teaching/visual/retired')>()
  return {
    ...real,
    retiredAssetVerdict: (
      conceptId: string,
      asset: { provenance: string; fingerprint: string },
      table = real.RETIRED_ASSET_FINGERPRINTS,
    ) => real.retiredAssetVerdict(conceptId, asset, conceptId === EXTRA.conceptId
      ? { ...table, [conceptId]: [...(table[conceptId] ?? []), ...EXTRA.fingerprints] }
      : table),
  }
})

const prismaMock = vi.hoisted(() => ({ findMany: vi.fn() }))
vi.mock('@/lib/db/prisma', () => ({ prisma: { assetIdentity: { findMany: prismaMock.findMany } } }))

import { resolveVisual, resolveVisualForTurn } from '@/lib/teaching/visual/resolveVisual'
import { isRetiredVisualBinding, retirementReason, RETIRED_VISUAL_BINDINGS } from '@/lib/teaching/visual/retired'
import { validateGeneratedFigure } from '@/lib/teaching/visual/visualEngine'
import { kgTopicIdentity } from '@/lib/teaching/visual/topicIdentity'
import { figureFingerprint } from '@/lib/teaching/visual/fingerprint'
import { describeVisualTurn, tierOf } from '@/lib/teaching/visual/turnRecord'
import { hasActiveVisualFigure, resetApprovedFigureIndexForTests } from '@/lib/teaching/visual/generationOutcomeStore'
import { lookupConceptVisualBinding, domainRuleIsFaithful, listDomainRules } from '@/lib/teaching/visualRegistry'

const openBudget = { countToday: async () => 0 }
const passingCritic = async () => ({
  dimensions: {
    relevance: { verdict: 'pass' as const, reason: '' },
    correctness: { verdict: 'pass' as const, reason: '' },
    explanatoryValue: { verdict: 'pass' as const, reason: '' },
    grounding: { verdict: 'pass' as const, reason: '' },
    rendering: { verdict: 'pass' as const, reason: '' },
  },
  decision: 'promote' as const,
  confidence: 1,
  judged: true,
})
const noGeneration = async () => { throw new Error('generation must not be reached') }

function fakeCacheClient() {
  const rows = new Map<string, string>()
  return {
    visualizationCache: {
      findUnique: async ({ where }: { where: { conceptKey: string } }) => {
        const code = rows.get(where.conceptKey)
        return code ? { code } : null
      },
      update: async () => undefined,
      create: async ({ data }: { data: { conceptKey: string; code: string } }) => {
        if (!rows.has(data.conceptKey)) rows.set(data.conceptKey, data.code)
      },
      upsert: async ({ where, update }: { where: { conceptKey: string }; update: { code: string } }) => {
        rows.set(where.conceptKey, update.code)
      },
    },
  }
}
function fakeOutcomeSink() {
  const outcomes: GenerationOutcome[] = []
  const sink: GenerationOutcomeSink = { record: async (o) => { outcomes.push(o) } }
  return { outcomes, sink }
}

const pointScene = (title: string, labels: string[]): SceneSpec => ({
  id: `t-${labels[0]}`, title, sceneType: 'plot',
  steps: [{ narration: labels.join(' and '), objects: [
    ...labels.map((text, i) => ({ type: 'point' as const, position: [i, i + 1, 0] as [number, number, number], text })),
    { type: 'arrow' as const, from: [0, 1, 0] as [number, number, number], to: [1, 2, 0] as [number, number, number] },
  ] }],
} as SceneSpec)

// Retired (card has neither inductor nor capacitor) and no concept-authored scene.
const LC = 'phys.em.lc-circuits'
const LC_TITLE = 'LC Oscillations and Resonance'
const lcFigureA: GeneratedFigure = { kind: 'scene', scene: pointScene(LC_TITLE, ['inductor', 'capacitor']) }
const lcFigureB: GeneratedFigure = { kind: 'scene', scene: pointScene(LC_TITLE, ['capacitor', 'inductor', 'resonance']) }

// A subject-wide card concept (registry:domain-default:math.calc:coordinate_plane).
const LIMITS = 'math.calc.limits'
const limitsApproved: GeneratedFigure = {
  kind: 'scene',
  scene: pointScene('Limit of a Function', ['f(x) arbitrarily close', 'limit L', 'x close to a']),
}
// A faithful figure of a DIFFERENT concept (validation must refuse it for limits).
const photosynthesisFigure: GeneratedFigure = {
  kind: 'spec', spec: { type: 'process_flow', title: 'Photosynthesis', steps: [] } as never,
}

const turn = (conceptId: string, subject: string, request = true) => ({
  message: request ? 'show me a diagram' : 'ok go on',
  lessonConceptId: conceptId,
  subject,
  learnerRequest: request ? ('diagram' as const) : null,
})

/** The fingerprint serve() computes for a figure admitted as a scene. */
const servedFingerprint = (figure: GeneratedFigure, conceptId: string): string => {
  const v = validateGeneratedFigure(figure.kind === 'scene' ? figure.scene : figure.spec, kgTopicIdentity(conceptId)!)
  if (!v.ok) throw new Error(`fixture does not validate: ${v.reason}`)
  return figureFingerprint(v.figure.kind === 'scene'
    ? { renderer: 'scene', sceneSpec: v.figure.scene }
    : { renderer: 'spec', visualSpec: v.figure.spec })
}

const ENV = {
  flag: process.env.ENABLE_AI_SCENE_GENERATION,
  allow: process.env.VISUAL_AI_SCENE_ALLOWLIST,
}
beforeEach(() => {
  process.env.ENABLE_AI_SCENE_GENERATION = 'true'
  process.env.VISUAL_AI_SCENE_ALLOWLIST = ''
  EXTRA.conceptId = ''
  EXTRA.fingerprints = []
})
afterEach(() => {
  process.env.ENABLE_AI_SCENE_GENERATION = ENV.flag
  process.env.VISUAL_AI_SCENE_ALLOWLIST = ENV.allow
})

// ───────────────────────────────────────────────────────────────────────────
describe('A. retirement retires an ARTIFACT, on every tier', () => {
  it('fixtures are real: the LC figures validate for lc-circuits, and the concept is retired', () => {
    expect(servedFingerprint(lcFigureA, LC)).not.toBe(servedFingerprint(lcFigureB, LC))
    expect(isRetiredVisualBinding(LC)).toBe(true)
  })

  it('1. a retired artifact offered by the APPROVED tier is refused', async () => {
    EXTRA.conceptId = LC
    EXTRA.fingerprints = [servedFingerprint(lcFigureA, LC)]
    const d = await resolveVisualForTurn(turn(LC, 'physics'), {
      enabled: () => true, policy: 'auto', critic: passingCritic, budgetReader: openBudget,
      findApprovedFigure: async () => lcFigureA, generate: noGeneration,
    })
    expect(d.graphical).toBe(false)
    expect(d.provenance).toBe('no-figure:retired-asset')
  })

  it('1b. a retired artifact produced by GENERATION is refused, and the ledger records it not served', async () => {
    EXTRA.conceptId = LC
    EXTRA.fingerprints = [servedFingerprint(lcFigureA, LC)]
    const { outcomes, sink } = fakeOutcomeSink()
    const d = await resolveVisualForTurn(turn(LC, 'physics'), {
      enabled: () => true, policy: 'auto', critic: passingCritic, budgetReader: openBudget,
      findApprovedFigure: async () => null, generate: async () => lcFigureA.kind === 'scene' ? lcFigureA.scene : null,
      cacheClient: fakeCacheClient() as never, outcomeSink: sink,
    })
    expect(d.graphical).toBe(false)
    expect(d.provenance).toBe('no-figure:retired-asset')
    await new Promise((r) => setTimeout(r, 0))
    const last = outcomes[outcomes.length - 1]
    expect(last?.result.ok && last.result.served).toBe(false)
  })

  it('2. new content for a retired concept is a REPLACEMENT and serves — the register row stays', async () => {
    EXTRA.conceptId = LC
    EXTRA.fingerprints = [servedFingerprint(lcFigureA, LC)]
    const d = await resolveVisualForTurn(turn(LC, 'physics'), {
      enabled: () => true, policy: 'auto', critic: passingCritic, budgetReader: openBudget,
      findApprovedFigure: async () => lcFigureB, generate: noGeneration,
    })
    expect(d.graphical).toBe(true)
    expect(tierOf(d)).toBe('tier2-approved')
    expect(isRetiredVisualBinding(LC)).toBe(true)
    expect(retirementReason(LC)).toMatch(/inductor/)
    expect(describeVisualTurn(d, { sceneSpec: (d.payload as { sceneSpec: unknown }).sceneSpec }, true).retirement)
      .toBe('replacement')
  })

  it('the retired CARD itself is never served, whatever the async tiers do', async () => {
    const d = await resolveVisualForTurn(turn(LC, 'physics'), {
      enabled: () => true, policy: 'auto', critic: passingCritic, budgetReader: openBudget,
      findApprovedFigure: async () => null, generate: async () => null,
      cacheClient: fakeCacheClient() as never,
    })
    expect(d.graphical).toBe(false)
    expect(d.payload?.renderer).not.toBe('card')
    // Telemetry keeps the suppression visible even when a later tier names the reason.
    expect(describeVisualTurn(d, {}, true)).toMatchObject({ retirement: 'suppressed', served: false })
  })

  it('3. unrelated retired concepts are unaffected (sync decision still no-figure:retired-binding)', () => {
    EXTRA.conceptId = LC
    EXTRA.fingerprints = ['fdeadbeef']
    for (const id of ['phys.em.rc-circuits', 'phys.mech.keplers-laws', 'chem.bond.ionic-bonding', 'cs.algo.flowcharts', 'phys.opt.reflection']) {
      expect(resolveVisual({ message: '', lessonConceptId: id }).provenance).toBe('no-figure:retired-binding')
    }
  })

  it('no retirement row was removed by this lifecycle (25 rows of evidence)', () => {
    expect(Object.keys(RETIRED_VISUAL_BINDINGS)).toHaveLength(25)
  })
})

// ───────────────────────────────────────────────────────────────────────────
describe('B. approved beats a SUBJECT-WIDE card; exact and Tier 0 still beat approved', () => {
  it('fixture is real: limits resolves to a subject-wide card, and its approved figure validates', () => {
    const d = resolveVisual({ message: '', lessonConceptId: LIMITS })
    expect(tierOf(d)).toBe('tier1-domain')
    expect(() => servedFingerprint(limitsApproved, LIMITS)).not.toThrow()
  })

  it('5. subject-wide + an approved figure -> the approved figure, and no generation', async () => {
    const d = await resolveVisualForTurn(turn(LIMITS, 'mathematics'), {
      enabled: () => true, policy: 'auto', critic: passingCritic, budgetReader: openBudget,
      hasApprovedFigure: async () => true, findApprovedFigure: async () => limitsApproved, generate: noGeneration,
    })
    expect(tierOf(d)).toBe('tier2-approved')
    expect(d.asset?.scope).toBe('concept')
    expect(d.session?.turns).toBe(0)
  })

  it('subject-wide + index says none -> the card, and the figure store is never read', async () => {
    let read = false
    const d = await resolveVisualForTurn(turn(LIMITS, 'mathematics'), {
      hasApprovedFigure: async () => false, findApprovedFigure: async () => { read = true; return limitsApproved },
      generate: noGeneration,
    })
    expect(tierOf(d)).toBe('tier1-domain')
    expect(read).toBe(false)
  })

  it('subject-wide + an unreadable index -> the card (fails toward what was shown before)', async () => {
    const d = await resolveVisualForTurn(turn(LIMITS, 'mathematics'), {
      hasApprovedFigure: async () => { throw new Error('db down') }, findApprovedFigure: async () => limitsApproved,
      generate: noGeneration,
    })
    expect(tierOf(d)).toBe('tier1-domain')
  })

  it('subject-wide + an approved figure that no longer validates -> the card, NEVER generation', async () => {
    const d = await resolveVisualForTurn(turn(LIMITS, 'mathematics'), {
      enabled: () => true, policy: 'auto', critic: passingCritic, budgetReader: openBudget,
      hasApprovedFigure: async () => true, findApprovedFigure: async () => photosynthesisFigure, generate: noGeneration,
    })
    expect(tierOf(d)).toBe('tier1-domain')
    expect(d.provenance).toBe('registry:domain-default:math.calc:coordinate_plane')
  })

  it('subject-wide + approved lookup returns nothing -> the card, never generation', async () => {
    const d = await resolveVisualForTurn(turn(LIMITS, 'mathematics'), {
      enabled: () => true, policy: 'auto', critic: passingCritic, budgetReader: openBudget,
      hasApprovedFigure: async () => true, findApprovedFigure: async () => null, generate: noGeneration,
    })
    expect(tierOf(d)).toBe('tier1-domain')
  })

  it('no index supplied -> behaviour is exactly the pre-change card', async () => {
    const d = await resolveVisualForTurn(turn(LIMITS, 'mathematics'), { findApprovedFigure: async () => limitsApproved })
    expect(tierOf(d)).toBe('tier1-domain')
  })

  it('4. an EXACT curated card beats an approved figure, and nothing is looked up', async () => {
    let asked = 0
    const d = await resolveVisualForTurn(turn('phys.qm.particle-in-box', 'physics'), {
      hasApprovedFigure: async () => { asked++; return true },
      findApprovedFigure: async () => { asked++; return limitsApproved },
    })
    expect(tierOf(d)).toBe('tier1-curated')
    expect(asked).toBe(0)
  })

  it('a Tier 0 scene beats an approved figure, and nothing is looked up', async () => {
    let asked = 0
    const d = await resolveVisualForTurn(turn('phys.mech.projectile-motion', 'physics'), {
      hasApprovedFigure: async () => { asked++; return true },
      findApprovedFigure: async () => { asked++; return null },
    })
    expect(tierOf(d)).toBe('tier0-generator')
    expect(asked).toBe(0)
  })

  it('deterministic: the same inputs give the same decision', async () => {
    const deps = { hasApprovedFigure: async () => true, findApprovedFigure: async () => limitsApproved }
    const a = await resolveVisualForTurn(turn(LIMITS, 'mathematics'), deps)
    const b = await resolveVisualForTurn(turn(LIMITS, 'mathematics'), deps)
    expect(a.provenance).toBe(b.provenance)
    expect(figureFingerprint(a.payload)).toBe(figureFingerprint(b.payload))
  })

  it('6. no wrong-subject card can win: every domain rule that decides is faithful', () => {
    for (const rule of listDomainRules()) {
      const probe = `${rule.prefix}zz-probe`
      const b = lookupConceptVisualBinding(probe)
      if (b?.tier === 'domain') expect(domainRuleIsFaithful({ prefix: rule.prefix, primary: b.entry.primary })).toBe(true)
    }
  })
})

// ───────────────────────────────────────────────────────────────────────────
describe('C. telemetry reports the selected provenance and the real served state', () => {
  it('8/9. approved-over-subject-wide is logged as tier2-approved; served comes from the response', async () => {
    const d = await resolveVisualForTurn(turn(LIMITS, 'mathematics'), {
      hasApprovedFigure: async () => true, findApprovedFigure: async () => limitsApproved,
    })
    const sceneSpec = (d.payload as { sceneSpec: unknown }).sceneSpec
    expect(describeVisualTurn(d, { sceneSpec }, true)).toMatchObject({
      tier: 'tier2-approved', assetId: `approved:${LIMITS}`, scope: 'concept', served: true, retirement: 'none',
    })
    // A held turn (nothing re-sent) is NOT served, whatever the decision says.
    expect(describeVisualTurn(d, {}, false).served).toBe(false)
  })

  it('a Tier 3 cache hit is distinguishable from a fresh generation', () => {
    const cached = { graphical: true, conceptId: 'x', asset: { provenance: 'engine', assetId: 'generated:x:cached' } }
    const fresh = { graphical: true, conceptId: 'x', asset: { provenance: 'engine', assetId: 'generated:x:fresh' } }
    expect(describeVisualTurn(cached as never, {}, false).cacheHit).toBe(true)
    expect(describeVisualTurn(fresh as never, {}, false).cacheHit).toBe(false)
  })
})

// ───────────────────────────────────────────────────────────────────────────
describe('D. the approved-figure index is not a per-turn query', () => {
  beforeEach(() => { resetApprovedFigureIndexForTests(); prismaMock.findMany.mockReset() })

  it('one narrow read serves every lookup until the TTL; conceptIds only', async () => {
    prismaMock.findMany.mockResolvedValue([{ conceptId: 'chem.found.stoichiometry' }])
    const t0 = 1_000_000
    expect(await hasActiveVisualFigure('chem.found.stoichiometry', t0)).toBe(true)
    expect(await hasActiveVisualFigure(LIMITS, t0 + 1000)).toBe(false)
    expect(await hasActiveVisualFigure('chem.found.stoichiometry', t0 + 9 * 60_000)).toBe(true)
    expect(prismaMock.findMany).toHaveBeenCalledTimes(1)
    const args = prismaMock.findMany.mock.calls[0][0]
    expect(args.select).toEqual({ conceptId: true })
    expect(args.where).toMatchObject({ family: 'VISUAL', status: 'ACTIVE' })
    await hasActiveVisualFigure(LIMITS, t0 + 11 * 60_000)
    expect(prismaMock.findMany).toHaveBeenCalledTimes(2)
  })

  it('an unreadable index answers "none" and backs off instead of re-querying every turn', async () => {
    prismaMock.findMany.mockRejectedValue(new Error('db down'))
    const t0 = 5_000_000
    expect(await hasActiveVisualFigure(LIMITS, t0)).toBe(false)
    expect(await hasActiveVisualFigure(LIMITS, t0 + 30_000)).toBe(false)
    expect(prismaMock.findMany).toHaveBeenCalledTimes(1)
  })

  it('the route supplies the index, not a second per-turn reader', async () => {
    const { readFileSync } = await import('fs')
    const route = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    expect(route).toMatch(/hasApprovedFigure: \(id: string\) => hasActiveVisualFigure\(id\)/)
    expect([...route.matchAll(/findApprovedFigure:/g)]).toHaveLength(1)
  })
})
