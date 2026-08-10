import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { resolveVisualForTurn } from '@/lib/teaching/visual/resolveVisual'
import { startDeadline } from '@/lib/teaching/visual/turnDeadline'
import type { CriticReport } from '@/lib/teaching/visual/figureCritic'

/**
 * THE PIPELINE, END TO END, FOR A TOPIC NOBODY AUTHORED.
 *
 *   turn → need → identity → cache → generate → validate → critic → serve
 *
 * These are the properties that decide whether this engine can be left on
 * across thousands of topics, rather than the properties of any one stage:
 *
 *   · a topic the curriculum has never heard of can still be drawn
 *   · the SECOND learner on it costs nothing at all
 *   · every failure — budget, deadline, judge, uncertainty — is NO FIGURE,
 *     and the lesson continues in text
 *   · nothing anywhere promotes anything to ACTIVE
 */

/**
 * Genuinely outside every canonical Knowledge Graph. Deliberately NOT a science
 * topic: an earlier fixture used "sound waves", which the concept matcher
 * correctly resolved to phys.wave.sound-waves — curriculum winning over a
 * runtime identity is the intended behaviour, and it made the fixture useless
 * for testing the runtime path.
 */
const OFF_CURRICULUM = {
  title: 'Kubernetes Pod Scheduling',
  description:
    'The control-plane process that places a pending pod onto a node by filtering ' +
    'nodes that cannot run it and then scoring the ones that can.',
}

const ORIGINAL = { ...process.env }
beforeEach(() => {
  delete process.env.ENABLE_AI_SCENE_GENERATION
  delete process.env.VISUAL_AI_SCENE_ALLOWLIST
  delete process.env.VISUAL_AI_SCENE_REVIEW_ONLY
})
afterEach(() => {
  process.env.ENABLE_AI_SCENE_GENERATION = ORIGINAL.ENABLE_AI_SCENE_GENERATION
  process.env.VISUAL_AI_SCENE_ALLOWLIST = ORIGINAL.VISUAL_AI_SCENE_ALLOWLIST
  process.env.VISUAL_AI_SCENE_REVIEW_ONLY = ORIGINAL.VISUAL_AI_SCENE_REVIEW_ONLY
})

const promote: CriticReport = {
  dimensions: {
    relevance: { verdict: 'pass', reason: '' }, correctness: { verdict: 'pass', reason: '' },
    explanatoryValue: { verdict: 'pass', reason: '' }, grounding: { verdict: 'pass', reason: '' },
    rendering: { verdict: 'pass', reason: '' },
  },
  decision: 'promote', confidence: 1, judged: true,
}

/** A cache that behaves like the real one: shared across turns. */
const sharedCache = () => {
  const rows = new Map<string, string>()
  return {
    rows,
    client: {
      visualizationCache: {
        findUnique: async ({ where }: { where: { conceptKey: string } }) =>
          rows.has(where.conceptKey) ? { code: rows.get(where.conceptKey)! } : null,
        update: async (args: never) => {
          const a = args as unknown as { where: { conceptKey: string }; data: { code: string } }
          rows.set(a.where.conceptKey, a.data.code)
        },
        create: async ({ data }: { data: { conceptKey: string; code: string } }) => {
          rows.set(data.conceptKey, data.code)
        },
      },
    } as never,
  }
}

const figure = {
  type: 'process_flow', title: 'Kubernetes Pod Scheduling',
  steps: [{ title: 'Filter nodes that cannot run the pod' }, { title: 'Score the remaining nodes' }, { title: 'Bind the pod to the winner' }],
}
const openBudget = { countToday: async () => 0 }

const turn = (deps: Record<string, unknown>) =>
  resolveVisualForTurn(
    {
      message: 'show me a diagram of pod scheduling',
      // Nothing in the Knowledge Graph answers to this.
      lessonConceptId: 'phys.not.a.real.concept',
      subject: 'physics',
      learnerRequest: 'diagram' as const,
    },
    { runtimeTopic: OFF_CURRICULUM, budgetReader: openBudget, ...deps } as never,
  )

describe('a topic the curriculum has never heard of', () => {
  it('IS DRAWN — no allowlist entry, no KG node, no per-topic setup', async () => {
    const cache = sharedCache()
    const d = await turn({
      cacheClient: cache.client, critic: async () => promote, generate: async () => figure,
    })
    expect(d.graphical).toBe(true)
    expect(d.payload?.renderer).toBe('spec')
  })

  it('IS NOT PRESENTED AS CURRICULUM — the contract carries its provenance', async () => {
    const cache = sharedCache()
    const d = await turn({
      cacheClient: cache.client, critic: async () => promote, generate: async () => figure,
    })
    expect(d.asset?.provenance).toBe('engine-runtime-topic')
  })

  it('is refused when there is no grounding text to judge it against', async () => {
    const d = await resolveVisualForTurn(
      {
        message: 'show me a diagram of pod scheduling', lessonConceptId: 'phys.not.a.real.concept',
        subject: 'physics', learnerRequest: 'diagram',
      },
      {
        runtimeTopic: { title: 'Kubernetes Pod Scheduling', description: '' },
        budgetReader: openBudget, critic: async () => promote, generate: async () => figure,
      } as never,
    )
    expect(d.graphical).toBe(false)
  })
})

describe('THE SECOND LEARNER COSTS NOTHING', () => {
  it('no generation call and no judge call on the repeat turn', async () => {
    const cache = sharedCache()
    let generations = 0
    let judgements = 0
    const deps = {
      cacheClient: cache.client,
      critic: async () => { judgements++; return promote },
      generate: async () => { generations++; return figure },
    }

    const first = await turn(deps)
    expect(first.graphical).toBe(true)
    expect(generations).toBe(1)
    expect(judgements).toBe(1)

    const second = await turn(deps)
    expect(second.graphical).toBe(true)
    // The figure came from the cache and the verdict came from the cache.
    // This is the property that makes thousands of topics affordable.
    expect(generations).toBe(1)
    expect(judgements).toBe(1)
  })

  it('and the repeat serves the SAME figure, not a re-derived one', async () => {
    const cache = sharedCache()
    const deps = { cacheClient: cache.client, critic: async () => promote, generate: async () => figure }
    const a = await turn(deps)
    const b = await turn(deps)
    expect(b.payload).toEqual(a.payload)
  })
})

describe('every failure is NO FIGURE, and the lesson continues', () => {
  const base = () => ({ cacheClient: sharedCache().client, generate: async () => figure })

  it('the judge is unsure', async () => {
    const d = await turn({ ...base(), critic: async () => ({ ...promote, decision: 'hold' as const }) })
    expect(d.graphical).toBe(false)
    expect(d.provenance).toContain('critic-hold')
  })

  it('the judge fails it', async () => {
    const d = await turn({ ...base(), critic: async () => ({ ...promote, decision: 'reject' as const }) })
    expect(d.graphical).toBe(false)
  })

  it('the session budget is spent', async () => {
    const d = await turn({ ...base(), critic: async () => promote, sessionGenerationCount: 99 })
    expect(d.graphical).toBe(false)
    expect(d.provenance).toContain('session-budget-exhausted')
  })

  it('the budget cannot be read at all', async () => {
    const d = await resolveVisualForTurn(
      {
        message: 'show me a diagram of pod scheduling', lessonConceptId: 'phys.not.a.real.concept',
        subject: 'physics', learnerRequest: 'diagram',
      },
      { runtimeTopic: OFF_CURRICULUM, critic: async () => promote, generate: async () => figure } as never,
    )
    expect(d.graphical).toBe(false)
    expect(d.provenance).toContain('budget-unreadable')
  })

  it('THE DEADLINE IS SPENT BEFORE THE JUDGE — the figure is abandoned, not served', async () => {
    let now = 0
    const deadline = startDeadline(1_000, () => now)
    const d = await turn({
      ...base(),
      deadline,
      // Generation itself consumes the whole turn budget.
      generate: async () => { now += 2_000; return figure },
      critic: async () => { throw new Error('the judge must never be reached') },
    })
    expect(d.graphical).toBe(false)
    expect(d.provenance).toContain('deadline-before-critic')
  })

  it('the kill switch stops it entirely', async () => {
    process.env.ENABLE_AI_SCENE_GENERATION = 'false'
    const d = await turn({ ...base(), critic: async () => promote })
    expect(d.graphical).toBe(false)
  })
})

describe('nothing here promotes anything', () => {
  it('THE RESOLVER HAS NO PATH THAT WRITES AN ASSET STATUS', async () => {
    // A critic PASS makes a figure eligible to SERVE. It is not a promotion,
    // and there is deliberately no publisher dependency to supply: ACTIVE is
    // reachable only through the human review lifecycle.
    const cache = sharedCache()
    const d = await turn({
      cacheClient: cache.client, critic: async () => promote, generate: async () => figure,
    })
    expect(d.graphical).toBe(true)
    // Only the figure and its verdict were cached — no asset row, no status.
    expect([...cache.rows.keys()].every((k) => k.startsWith('scene:v1:'))).toBe(true)
  })
})
