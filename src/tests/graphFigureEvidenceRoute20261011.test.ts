/**
 * A-2 graph false positives (2026-10-11) — BEHAVIOUR through the real chat
 * route: a graph shown earlier in the lesson is recorded with what it draws
 * (rendered-reality `drawn`), and the final figure gate keeps accurate axis /
 * curve sentences while still removing an invented label.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { driveTurns, type TurnResult } from './support/turnHarness'
import { evidenceFromPayload } from '@/lib/teaching/figureReference'
import { describeVisualPayload } from '@/lib/teaching/visual/visualSemantics'
import { GROUNDED_CHECK_SYSTEM_PROMPT } from '@/lib/teaching/groundedProseCheck'
import { FACT_CHECK_SYSTEM_PROMPT } from '@/lib/teaching/factCheckPass'

const h = await vi.hoisted(async () => (await import('./support/turnHarness')).createHarness())
vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
vi.mock('@/lib/db/prisma', () => ({ prisma: h.prisma }))
vi.mock('@/lib/rateLimit', () => ({ checkRateLimit: async () => ({ allowed: true }), rateLimitResponse: () => new Response('{}', { status: 429 }) }))
vi.mock('@/lib/ai/router', async (o) => ({
  ...(await o<Record<string, unknown>>()),
  routeAI: (...a: unknown[]) => {
    const system = String(a[1] ?? '')
    if (system === GROUNDED_CHECK_SYSTEM_PROMPT) return Promise.resolve({ text: '{"claims":[]}', provider: 'harness', finishReason: 'stop' })
    if (system === FACT_CHECK_SYSTEM_PROMPT) return Promise.resolve({ text: 'OK', provider: 'harness', finishReason: 'stop' })
    return h.routeAI(...a)
  },
}))
const { POST } = await import('@/app/api/learn/chat/route')
const text = (t: TurnResult) => String((t.body as { text?: string }).text ?? '')
// The host lesson must be a concept with NO authored concept-level figure, otherwise the route serves (and describes) that figure
// instead of the spec graph recorded in the log. math.func.linear-function is the campaign's deliberately figure-less fixture
// (mathVisualCampaignAudit / visualCanaryConcept keep it so); math.arith.square-roots stopped being one when it got its own figure.
const SQRT_LESSON = { subjectSlug: 'mathematics', conceptId: 'math.func.linear-function', lessonTitle: 'Linear Function' }
const SQRT = { renderer: 'spec', visualSpec: { type: 'graph', title: 'Square root function', xLabel: 'x (unitless)', yLabel: '√x (unitless)', equation: 'x^0.5' } }
beforeEach(() => {
  h.state.messages = []
  h.state.snapshot = { renderedRealityLog: [{
    visualIdentity: 'spec:square-root-graph', visualSemantics: 'Square root function', sourcePipeline: 'detectedVisualSpec',
    matchedConcept: 'math.func.linear-function', turnPosition: 1, drawn: evidenceFromPayload(SQRT as never, describeVisualPayload as never),
  }] }
})
/** The production reply (d10f8a09) whose sentences were all removed. */
const ACCURATE = 'Here is what the graph shows.\n\n- The horizontal line is the **x‑axis**; it marks the input numbers (the numbers we are taking the square root of).\n- The vertical line is the **y‑axis**; it marks the output numbers (the square‑root values).\n\nAs you move rightward along the x‑axis, the y‑value on the curve tells you the square‑root of that x‑value. The grid behind the curve just helps you see where points lie.'

describe('A-2 graph evidence through the route', () => {
  it('a spec graph in a figure-less lesson: the accurate axis and curve description reaches the learner unchanged', async () => {
    const [t] = await driveTurns(h, POST, [{ learnerSays: 'i dont understand this picture. what is it showing?', modelReplies: ACCURATE }], SQRT_LESSON)
    expect(text(t)).toContain('The horizontal line is the **x‑axis**')
    expect(text(t)).toContain('The grid behind the curve')
    expect(t.logs.some((l) => l.includes('unsupported-figure-claims-removed'))).toBe(false)
  }, 120_000)

  it('NEGATIVE: an invented axis label on the same graph is still removed', async () => {
    const invented = ACCURATE.replace('The grid behind the curve just helps you see where points lie.', 'The x‑axis also carries the label **“time (s)”**.')
    const [t] = await driveTurns(h, POST, [{ learnerSays: 'i dont understand this picture. what is it showing?', modelReplies: invented }], SQRT_LESSON)
    expect(text(t)).not.toMatch(/time \(s\)/)
    expect(text(t)).toContain('The horizontal line is the **x‑axis**')
    expect(t.logs.some((l) => l.includes('unsupported-figure-claims-removed'))).toBe(true)
  }, 120_000)
})
