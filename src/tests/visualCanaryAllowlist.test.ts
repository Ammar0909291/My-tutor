/**
 * The scoped runtime-generation canary.
 *
 * Runtime generation had one global switch, so enabling it would have exposed
 * every uncurated concept (1,279 of 1,775) at once. Permission is now the
 * conjunction of a global flag and an explicit concept allowlist, and it is
 * checked before the cache is read — so it gates eligibility, not just
 * generation.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import {
  isRuntimeSceneGenerationAllowed, runtimeSceneAllowlist,
} from '@/lib/teaching/visual/flag'
import { generateConceptScene } from '@/lib/teaching/visual/visualEngine'
import { resolveVisualForTurn } from '@/lib/teaching/visual/resolveVisual'
import { buildVisualContractBlock } from '@/lib/teaching/visual/visualContract'
import { parseVisualSession } from '@/lib/teaching/visual/session'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'

// This file is about AUTHORIZATION, not about figure quality; the critic has
// its own tests. A passing judge keeps these assertions on the allowlist.
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


// M4 note: the engine fixture concept must have NO curated asset, or the
// resolver never reaches the engine. It was phys.therm.calorimetry until the
// M4 Physics pilot authored a real figure for that concept; it is now
// phys.mech.kinetic-energy, which is still genuinely assetless. The scene
// fixtures below were re-vocabularised to match, since the engine's anchor
// check compares the scene's own labels with the concept's KG text.
const CALORIMETRY = 'phys.mech.kinetic-energy'
const PROJECTILE = 'phys.mech.projectile-motion'   // curated generator
const DIM = 'phys.meas.dimensional-analysis'

const ctxFor = (conceptId: string) => {
  const n = getKGNode(conceptId)!
  return {
    conceptId, title: n.title, description: n.description ?? '',
    prerequisites: n.prerequisites ?? [], difficulty: n.difficulty,
  }
}

/** A scene that genuinely depicts kinetic energy — accepted when authorized. */
const calorimetryScene = (): SceneSpec => ({
  id: 'gen', title: 'Kinetic energy of a moving mass', sceneType: 'diagram',
  teachingGoal: 'Show how kinetic energy grows with speed.',
  steps: [
    { narration: 'A mass moves with some velocity.', objects: [
      { type: 'node', position: [-2, 0, 0], text: 'moving mass — kinetic energy' },
      { type: 'node', position: [2, 0, 0], text: 'faster mass — more kinetic energy' },
    ] },
    { narration: 'Kinetic energy grows with the square of velocity.', objects: [
      { type: 'arrow', from: [-1, 0, 0], to: [1, 0, 0], text: 'velocity v' },
    ] },
  ],
})

/** A cache already holding that accepted scene, keyed as the engine keys it. */
const warmCache = () => ({
  visualizationCache: {
    findUnique: async ({ where }: { where: { conceptKey: string } }) =>
      where.conceptKey === `scene:v1:${CALORIMETRY}`
        ? { code: JSON.stringify(calorimetryScene()) }
        : null,
    update: async () => undefined,
    create: async () => undefined,
  },
})

const coldCache = () => ({
  visualizationCache: {
    findUnique: async () => null,
    update: async () => undefined,
    create: async () => undefined,
  },
})

const ORIGINAL = { ...process.env }
beforeEach(() => {
  delete process.env.ENABLE_AI_SCENE_GENERATION
  delete process.env.VISUAL_AI_SCENE_ALLOWLIST
  delete process.env.VISUAL_AI_SCENE_AUTO
})
afterEach(() => {
  process.env.ENABLE_AI_SCENE_GENERATION = ORIGINAL.ENABLE_AI_SCENE_GENERATION
  process.env.VISUAL_AI_SCENE_ALLOWLIST = ORIGINAL.VISUAL_AI_SCENE_ALLOWLIST
})

const on = () => { process.env.ENABLE_AI_SCENE_GENERATION = 'true' }
/**
 * Authorize a concept for generation.
 *
 * `VISUAL_AI_SCENE_AUTO` is set alongside the allowlist because these tests
 * exercise the generate-AND-SERVE path. Since the trust lifecycle landed,
 * eligibility alone yields a scene that is generated, validated and HELD for
 * review — so a test that wants to observe a served figure must say that the
 * concept is trusted to serve, which is the separation the policy exists for.
 */
const allow = (v: string) => {
  process.env.VISUAL_AI_SCENE_ALLOWLIST = v
  process.env.VISUAL_AI_SCENE_AUTO = v
}

describe('permission is the conjunction of flag AND allowlist', () => {
  it('1. flag OFF + allowlisted concept => DENIED', () => {
    allow(CALORIMETRY)
    expect(isRuntimeSceneGenerationAllowed(CALORIMETRY)).toBe(false)
    process.env.ENABLE_AI_SCENE_GENERATION = 'false'
    expect(isRuntimeSceneGenerationAllowed(CALORIMETRY)).toBe(false)
  })

  it('2. flag ON + empty allowlist => DENIED (empty never means "all")', () => {
    on()
    expect(isRuntimeSceneGenerationAllowed(CALORIMETRY)).toBe(false)
    allow('')
    expect(isRuntimeSceneGenerationAllowed(CALORIMETRY)).toBe(false)
    allow('   ')
    expect(isRuntimeSceneGenerationAllowed(CALORIMETRY)).toBe(false)
    allow(',,,')
    expect(isRuntimeSceneGenerationAllowed(CALORIMETRY)).toBe(false)
  })

  it('3. flag ON + non-allowlisted concept => DENIED', () => {
    on(); allow(PROJECTILE)
    expect(isRuntimeSceneGenerationAllowed(CALORIMETRY)).toBe(false)
  })

  it('4. flag ON + exact allowlisted concept => ALLOWED', () => {
    on(); allow(CALORIMETRY)
    expect(isRuntimeSceneGenerationAllowed(CALORIMETRY)).toBe(true)
  })

  it('5. whitespace around entries and lookups is normalized', () => {
    on(); allow(`  ${CALORIMETRY} ,  ${PROJECTILE}  `)
    expect(isRuntimeSceneGenerationAllowed(CALORIMETRY)).toBe(true)
    expect(isRuntimeSceneGenerationAllowed(`  ${PROJECTILE}  `)).toBe(true)
  })

  it('6. multiple ids all work', () => {
    on(); allow(`${CALORIMETRY},${PROJECTILE},phys.opt.reflection`)
    for (const id of [CALORIMETRY, PROJECTILE, 'phys.opt.reflection']) {
      expect(isRuntimeSceneGenerationAllowed(id)).toBe(true)
    }
    expect(runtimeSceneAllowlist().size).toBe(3)
  })

  it('7+8. duplicates and empty entries are harmless', () => {
    on(); allow(`${CALORIMETRY},,${CALORIMETRY}, ,${CALORIMETRY}`)
    expect(isRuntimeSceneGenerationAllowed(CALORIMETRY)).toBe(true)
    expect(runtimeSceneAllowlist().size).toBe(1)
  })

  it('9. wildcards match nothing — a canary must not widen by typo', () => {
    on()
    for (const pattern of ['*', 'phys.*', 'phys.', '.*', 'phys.therm.*', '%']) {
      allow(pattern)
      expect(isRuntimeSceneGenerationAllowed(CALORIMETRY), pattern).toBe(false)
    }
  })

  it('10. a subject name is not a concept id', () => {
    on()
    for (const subject of ['physics', 'phys', 'Physics']) {
      allow(subject)
      expect(isRuntimeSceneGenerationAllowed(CALORIMETRY), subject).toBe(false)
    }
  })

  it('11. the mechanism is subject-agnostic', () => {
    on(); allow('eng.phonics.phonemic-awareness')
    expect(isRuntimeSceneGenerationAllowed('eng.phonics.phonemic-awareness')).toBe(true)
    expect(isRuntimeSceneGenerationAllowed(CALORIMETRY)).toBe(false)
  })

  it('a null/empty conceptId is never allowed', () => {
    on(); allow(CALORIMETRY)
    expect(isRuntimeSceneGenerationAllowed(null)).toBe(false)
    expect(isRuntimeSceneGenerationAllowed(undefined)).toBe(false)
    expect(isRuntimeSceneGenerationAllowed('')).toBe(false)
  })
})

describe('the allowlist gates the CACHE, not just generation', () => {
  const scene = calorimetryScene()

  it('A. flag ON + allowlisted => a cached scene may be served', async () => {
    on(); allow(CALORIMETRY)
    const r = await generateConceptScene(ctxFor(CALORIMETRY), {
      cacheClient: warmCache() as never,
      generate: async () => { throw new Error('must not generate — cache should hit') },
    })
    expect(r.ok).toBe(true)
    if (r.ok) expect(r.cached).toBe(true)
  })

  it('B. flag ON + NOT allowlisted => cached scene MUST NOT be served', async () => {
    on(); allow(PROJECTILE)
    const r = await generateConceptScene(ctxFor(CALORIMETRY), {
      cacheClient: warmCache() as never,
      generate: async () => scene,
    })
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.reason).toBe('flag-off')
  })

  it('C. flag OFF + allowlisted => cached scene MUST NOT be served', async () => {
    allow(CALORIMETRY)
    const r = await generateConceptScene(ctxFor(CALORIMETRY), {
      cacheClient: warmCache() as never,
      generate: async () => scene,
    })
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.reason).toBe('flag-off')
  })

  it('15. an empty allowlist can generate nothing, cold cache or warm', async () => {
    on()
    for (const cache of [coldCache(), warmCache()]) {
      const r = await generateConceptScene(ctxFor(CALORIMETRY), {
        cacheClient: cache as never, generate: async () => scene,
      })
      expect(r.ok).toBe(false)
    }
  })
})

describe('nothing else changes', () => {
  it('12. curated visuals are unaffected by the allowlist', async () => {
    // Denied by every setting, yet the curated generator still renders.
    for (const setup of [() => {}, () => { on() }, () => { on(); allow('phys.nothing') }]) {
      setup()
      const d = await resolveVisualForTurn(
        { message: '', lessonConceptId: PROJECTILE, subject: 'physics', learnerRequest: 'diagram' },
        { cacheClient: coldCache() as never },
      )
      expect(d.source).toBe('registry')
      expect(d.graphical).toBe(true)
      expect(d.provenance).toContain('generator:')
    }
  })

  it('an unauthorized concept still yields NO FIGURE, never a substitute', async () => {
    on()
    const d = await resolveVisualForTurn(
      { message: '', lessonConceptId: CALORIMETRY, subject: 'physics', learnerRequest: 'diagram' },
      { cacheClient: warmCache() as never, generate: async () => calorimetryScene() },
    )
    expect(d.payload).toBeNull()
    expect(d.graphical).toBe(false)
    expect(d.source).toBe('none')
    const block = buildVisualContractBlock(d)
    expect(block).toContain('NO FIGURE IS ATTACHED')
    expect(block).not.toContain('ALREADY BEING RENDERED')
  })

  it('continuity, excursion and lesson-change behaviour are untouched', async () => {
    on(); allow(CALORIMETRY)
    const p = (s: unknown) => (s ? parseVisualSession(JSON.parse(JSON.stringify(s))) : null)
    const deps = { cacheClient: coldCache() as never, critic: passingCritic, generate: async () => calorimetryScene() }

    const open = await resolveVisualForTurn(
      { message: 'Show projectile motion.', lessonConceptId: DIM, subject: 'physics', learnerRequest: 'diagram' }, deps)
    expect(open.conceptId).toBe(PROJECTILE)
    expect(open.excursion).toBe(true)

    const answer = await resolveVisualForTurn(
      { message: 'ok', lessonConceptId: DIM, subject: 'physics',
        activeSession: p(open.session), lastAssistantAskedQuestion: true }, deps)
    expect(answer.conceptId).toBe(PROJECTILE)
    expect(answer.continuityReason).toBe('learner-answering-not-requesting')

    const moved = await resolveVisualForTurn(
      { message: 'continue', lessonConceptId: 'phys.mech.momentum', subject: 'physics',
        activeSession: p(open.session) }, deps)
    expect(moved.continuityReason).toBe('lesson-changed')
    expect(moved.conceptId).toBe('phys.mech.momentum')

    const medium = await resolveVisualForTurn(
      { message: 'show me a graph', lessonConceptId: 'phys.mech.kinematics-1d',
        subject: 'physics', learnerRequest: 'diagram' }, deps)
    expect(medium.conceptId).toBe('phys.mech.kinematics-1d')
  })

  it('an authorized concept generates and stays semantically gated', async () => {
    on(); allow(CALORIMETRY)
    const good = await resolveVisualForTurn(
      { message: '', lessonConceptId: CALORIMETRY, subject: 'physics', learnerRequest: 'diagram' },
      { cacheClient: coldCache() as never, critic: passingCritic, generate: async () => calorimetryScene() })
    expect(good.source).toBe('generated')
    expect(good.payload).not.toBeNull()

    // Authorization does not bypass the semantic gate.
    const drift: SceneSpec = {
      id: 'd', title: 'Wave Function psi(x)', sceneType: 'plot',
      steps: [{ narration: 'psi oscillates', objects: [
        { type: 'point', position: [0, 0, 0], text: 'psi' },
        { type: 'point', position: [1, 0, 0], text: 'probability density' },
      ] }],
    }
    const bad = await resolveVisualForTurn(
      { message: '', lessonConceptId: CALORIMETRY, subject: 'physics', learnerRequest: 'diagram' },
      { cacheClient: coldCache() as never, critic: passingCritic, generate: async () => drift })
    expect(bad.payload).toBeNull()
    expect(bad.provenance).toBe('no-figure:engine-not-anchored-to-concept')
  })
})

// ── rollback-path safety ─────────────────────────────────────────────────────
// The legacy drafted generator in route.ts is unreachable while V2 owns the
// turn, but `!v2OwnsVisual` is precisely what VISUAL_RESOLVER_V2=0 produces.
// On that rollback path it previously ran on the global flag alone and would
// have generated for ANY concept, ignoring the allowlist.

describe('the V2 rollback path cannot bypass the allowlist', () => {
  const ROUTE = readFileSync(join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

  it('the legacy prose-seeded generator is gone from the route entirely', () => {
    // Stronger than the previous assertion, which only required the generator
    // to be GATED on !v2OwnsVisual + the allowlist. M1 removed the call, so
    // there is no rollback path that can reach it under any flag combination.
    const CODE = ROUTE.split('\n')
      .filter((line) => !line.trim().startsWith('//') && !line.trim().startsWith('*'))
      .join('\n')
    expect(CODE).not.toContain('generateSceneSpec(')
    expect(CODE).not.toContain('v2OwnsVisual')
    expect(CODE).not.toContain('legacySceneConceptId')
    // The unscoped global check must be gone from the route entirely.
    expect(ROUTE).not.toMatch(/isAiSceneGenerationEnabled\(\)/)
  })

  it('10. no duplicated env parsing — one authority, one parser', () => {
    // The route may MENTION the variables in comments; what matters is that it
    // never reads them. All parsing lives in the flag module.
    expect(ROUTE).not.toMatch(/process\.env\.ENABLE_AI_SCENE_GENERATION/)
    expect(ROUTE).not.toMatch(/process\.env\.VISUAL_AI_SCENE_ALLOWLIST/)
    // The route no longer consults the gate at all (M1): the only runtime
    // generation path is inside the engine, which is where the gate now lives.
    const ENGINE = readFileSync(join(process.cwd(), 'src/lib/teaching/visual/visualEngine.ts'), 'utf8')
    expect(ENGINE).toContain("import { isRuntimeSceneGenerationAllowed } from './flag'")
    // And the engine does not parse them either.
    expect(ENGINE).not.toMatch(/process\.env\./)
  })

  it('6. fails closed when no trustworthy concept id exists', () => {
    on(); allow(CALORIMETRY)
    // Unchanged behavioural guarantee: no concept id, no generation. The route
    // half of this assertion went away with the prose-seeded generator that
    // needed it — the engine is seeded from a resolved concept by construction.
    expect(isRuntimeSceneGenerationAllowed(null)).toBe(false)
    expect(isRuntimeSceneGenerationAllowed(undefined)).toBe(false)
    expect(isRuntimeSceneGenerationAllowed('')).toBe(false)
  })

  it('the six flag/allowlist states resolve as required', () => {
    // V2 ON/OFF does not change this helper — it is the same authority on both
    // paths, which is the property the rollback hazard needed.
    const cases: Array<[string, string | null, string, boolean]> = [
      ['A/F flag OFF',                 null,        CALORIMETRY, false],
      ['B/D flag ON + allowlisted',    CALORIMETRY, CALORIMETRY, true],
      ['C/E flag ON + not allowlisted', PROJECTILE, CALORIMETRY, false],
    ]
    for (const [name, list, concept, expected] of cases) {
      delete process.env.ENABLE_AI_SCENE_GENERATION
      delete process.env.VISUAL_AI_SCENE_ALLOWLIST
  delete process.env.VISUAL_AI_SCENE_AUTO
      if (list) { on(); allow(list) }
      expect(isRuntimeSceneGenerationAllowed(concept), name).toBe(expected)
    }
  })

  it('9. generated cache stays gated under rollback', async () => {
    // Same helper gates the cache read, so a V2 rollback cannot resurrect a
    // cached generated scene for a non-allowlisted concept.
    on(); allow(PROJECTILE)
    const r = await generateConceptScene(ctxFor(CALORIMETRY), {
      cacheClient: warmCache() as never,
      generate: async () => calorimetryScene(),
    })
    expect(r.ok).toBe(false)
    if (!r.ok) expect(r.reason).toBe('flag-off')
  })
})
