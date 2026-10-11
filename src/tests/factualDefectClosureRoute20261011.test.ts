/**
 * Targeted factual defect closure (2026-10-11) — BEHAVIOUR through the real
 * chat route (turn harness: real route, faked DB, scripted model and checker).
 * The checker's sources are the concept's real authored seed texts.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { driveTurns, readLog, type TurnResult } from './support/turnHarness'
import { GROUNDED_CHECK_SYSTEM_PROMPT, NAMED_EXAMPLE_LEAD, NAMED_EXAMPLE_REPEAT_LEAD, UNCOVERED_EXAMPLE_NOTE } from '@/lib/teaching/groundedProseCheck'
import { FACT_CHECK_SYSTEM_PROMPT } from '@/lib/teaching/factCheckPass'
import { BIOLOGY_EXTENSION_EXPLANATIONS, BIOLOGY_EXTENSION_PROBES } from '@/lib/teaching/assets/biologyExtensionSeedAssets'

const h = await vi.hoisted(async () => (await import('./support/turnHarness')).createHarness())
const checker = vi.hoisted(() => ({ grounded: '{"claims":[]}' as string | null }))
vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
vi.mock('@/lib/db/prisma', () => ({ prisma: h.prisma }))
vi.mock('@/lib/rateLimit', () => ({ checkRateLimit: async () => ({ allowed: true }), rateLimitResponse: () => new Response('{}', { status: 429 }) }))
vi.mock('@/lib/teaching/assets/explanationMemory', async (o) => ({
  ...(await o<Record<string, unknown>>()),
  loadConceptSourceTexts: async ({ conceptId }: { conceptId: string }) => [
    ...BIOLOGY_EXTENSION_EXPLANATIONS.filter((e) => e.conceptId === conceptId).map((e) => e.content),
    ...BIOLOGY_EXTENSION_PROBES.filter((p) => p.conceptId === conceptId).map((p) => `Question: ${p.stem} Correct answer: ${p.correctValue}`),
  ],
}))
vi.mock('@/lib/ai/router', async (o) => ({
  ...(await o<Record<string, unknown>>()),
  routeAI: (...a: unknown[]) => {
    const system = String(a[1] ?? '')
    if (system === GROUNDED_CHECK_SYSTEM_PROMPT) return Promise.resolve({ text: checker.grounded, provider: 'harness', finishReason: 'stop' })
    if (system === FACT_CHECK_SYSTEM_PROMPT) return Promise.resolve({ text: 'OK', provider: 'harness', finishReason: 'stop' })
    return h.routeAI(...a)
  },
}))
const { POST } = await import('@/app/api/learn/chat/route')
beforeEach(() => { h.state.messages = []; h.state.snapshot = {}; checker.grounded = '{"claims":[]}' })
const text = (t: TurnResult) => String((t.body as { text?: string }).text ?? '')
const INNATE = { subjectSlug: 'biology', conceptId: 'bio.behav.innate-behavior-instinct', lessonTitle: 'Innate Behaviour and Instinct' }

/** Production 3e7bdcc4 /learn reply (see factualDefectClosure20261011.test.ts). */
const STICKLEBACK = 'Imagine a male three‑spined stickleback fish swimming in a shallow pond. When it spots a female with a bright red belly—this red colour is the **sign stimulus**—the male instantly launches a stereotyped courtship display: it darts toward the female, flares its dorsal spines, and circles her in a precise sequence. Once the display starts, the fish continues the whole pattern even if the female moves away; the behaviour is largely unmodifiable and runs to completion.\n\nFor contrast, the knee‑jerk reflex is a single‑muscle response to a tap on the patellar tendon, requiring only a direct neural loop and no extended sequence. Unlike the stickleback’s courtship, the reflex stops as soon as the stimulus ends.'
/** Production 3e7bdcc4 "explain simpler" reply as written (sentence 8 was removed in production). */
const CAKE = 'I see this is still confusing, so let’s try a everyday‑life picture.\n\nThink of a **smoke alarm** in your kitchen. When smoke reaches the sensor, the alarm **immediately** goes off and you hear a loud beep—that’s like the **simple reflex** (the knee‑jerk reflex). It’s a direct, one‑step response to a stimulus, with no extra steps in between.\n\nNow picture a **birthday cake‑cutting ceremony**. First, someone lights the candles (the **sign stimulus**). Once the candles are lit, a whole sequence follows automatically: people sing “Happy Birthday,” the cake is cut, the frosting is served, and the party continues, even if the lights change or someone talks. That whole, pre‑programmed routine is the **fixed action pattern** (the courtship display, nest‑building example). The key is that the specific sign stimulus (the lit candles) triggers a long, stereotyped behavior that runs to completion largely on its own.'
const SENTENCE_8 = 'That whole, pre‑programmed routine is the **fixed action pattern** (the courtship display, nest‑building example).'

describe('BIO-024 through the route', () => {
  it('"give me example": the stickleback reply is replaced by the lesson\'s authored example; the false claim never reaches the learner', async () => {
    checker.grounded = JSON.stringify({ claims: [
      { sentence: 1, verdict: 'unsupported', named: true }, { sentence: 2, verdict: 'unsupported', named: true },
      { sentence: 3, verdict: 'supported', named: true }, { sentence: 5, verdict: 'unsupported', named: true },
    ] })
    const [t] = await driveTurns(h, POST, [{ learnerSays: 'give me example', modelReplies: STICKLEBACK }], INNATE)
    expect(text(t)).not.toMatch(/red belly|stickleback/i)
    expect(text(t)).toContain(NAMED_EXAMPLE_LEAD)
    expect(text(t)).toMatch(/like an elaborate courtship display or nest-building sequence/)
    expect(text(t)).toMatch(/like the knee-jerk reflex/)
    expect(text(t)).not.toContain(UNCOVERED_EXAMPLE_NOTE) // nothing uncovered is left to qualify
    expect(readLog(t, '[grounded-prose-check]')).toMatchObject({ named: 4, namedAction: 'replaced', qualified: false })
  }, 120_000)

  it('three example requests in a row: two different authored examples, then an honest repeat (production d10f8a09)', async () => {
    checker.grounded = JSON.stringify({ claims: [{ sentence: 2, verdict: 'unsupported', named: true }] })
    const [a, b, c] = await driveTurns(h, POST, [
      { learnerSays: 'give me example', modelReplies: STICKLEBACK },
      { learnerSays: 'give me another example', modelReplies: STICKLEBACK },
      { learnerSays: 'give me another example', modelReplies: STICKLEBACK },
    ], INNATE)
    expect(text(a)).toContain(NAMED_EXAMPLE_LEAD)
    expect(text(b)).toContain(NAMED_EXAMPLE_LEAD)
    expect(text(b)).not.toBe(text(a))
    expect(text(c)).toContain(NAMED_EXAMPLE_REPEAT_LEAD)
    for (const t of [a, b, c]) expect(text(t)).not.toMatch(/red belly|stickleback/i)
  }, 180_000)

  it('C-1 unchanged: the same reply with no named tags is qualified, not replaced', async () => {
    checker.grounded = JSON.stringify({ claims: [{ sentence: 1, verdict: 'unsupported' }, { sentence: 2, verdict: 'unsupported' }] })
    const [t] = await driveTurns(h, POST, [{ learnerSays: 'give me example', modelReplies: STICKLEBACK }], INNATE)
    expect(text(t)).toContain(UNCOVERED_EXAMPLE_NOTE)
    expect(text(t)).not.toContain(NAMED_EXAMPLE_LEAD)
    expect(readLog(t, '[grounded-prose-check]')).toMatchObject({ namedAction: 'none', qualified: true })
  }, 120_000)

  it('named claims on a turn that is not an example turn are left to the other checks', async () => {
    checker.grounded = JSON.stringify({ claims: [{ sentence: 2, verdict: 'unsupported', named: true }] })
    const [t] = await driveTurns(h, POST, [{ learnerSays: 'explain simpler', modelReplies: STICKLEBACK.replace('Imagine a male', 'Picture a male') }], INNATE)
    expect(text(t)).not.toContain(NAMED_EXAMPLE_LEAD)
    expect(readLog(t, '[grounded-prose-check]')).toMatchObject({ namedAction: 'none' })
  }, 120_000)
})

describe('Innate false positive through the route', () => {
  it('production 3e7bdcc4 "explain simpler": the analogy sentence the checker could not ground a correction for is kept', async () => {
    checker.grounded = JSON.stringify({ claims: [{ sentence: 8, verdict: 'contradicted', source_quote: 'like an elaborate courtship display or nest-building sequence', correction: 'That whole routine is like a fixed action pattern, comparable to an elaborate courtship display in animals.' }] })
    const [t] = await driveTurns(h, POST, [{ learnerSays: 'explain simpler', modelReplies: CAKE }], INNATE)
    expect(text(t)).toContain(SENTENCE_8)
    expect(readLog(t, '[grounded-prose-check]')).toMatchObject({ applied: 'none', rejected: ['ungrounded-correction-8', 'analogy-kept-8'] })
  }, 120_000)

  it('PAIRED: a genuinely unsupported claim in the same reply is still removed', async () => {
    const wrong = CAKE.replace('The key is that the specific sign stimulus', 'Fixed action patterns are learned from parents, so the specific sign stimulus')
    checker.grounded = JSON.stringify({ claims: [{ sentence: 9, verdict: 'unsupported', doubtful: true }] })
    const [t] = await driveTurns(h, POST, [{ learnerSays: 'explain simpler', modelReplies: wrong }], INNATE)
    expect(text(t)).not.toMatch(/learned from parents/)
    expect(text(t)).toContain(SENTENCE_8)
    expect(readLog(t, '[grounded-prose-check]')).toMatchObject({ applied: 'applied' })
  }, 120_000)
})
