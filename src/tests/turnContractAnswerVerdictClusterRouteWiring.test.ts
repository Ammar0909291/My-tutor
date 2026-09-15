/**
 * Batch 3 of the Typed Turn Contract migration (design doc §6, "answer-verdict
 * cluster"): `mcqGradeHoisted`, `unauthoredKeyGradeHoisted`,
 * `gradedAgainstServerKeyHoisted`, `signalVerificationStatusHoisted`,
 * `priorConfirmationsHoisted`, `consecutiveDontKnowsHoisted` collapsed into
 * `ServerGrade` (`resolvedGrade`/`gradeForVerdict`), read via `certifies`/
 * `mayStateVerdict`, at the confirmation, correction, gate-reveal, attribution
 * mirror and mastery-fold consumer sites.
 *
 * This drives the REAL route end to end across the three scenarios the design
 * doc names: correct+authored, wrong+authored, correct+model-invented (plus
 * a behaviour-neutral full-lesson sanity check). Unlike Batches 1-2, this
 * batch changes what the learner SEES, so these assertions are on the actual
 * reply text and mastery payload, not just log lines.
 *
 * Five probes, not the usual three — the gate's E1 rule
 * (`mayAttachProbeBelowGuide`) requires four AVAILABLE probes before it will
 * attach one below GUIDE phase (one spent, three must survive); with fewer,
 * the gate finds a probe but declines it ("below-guide-no-surplus") and
 * nothing is ever served to grade. Verified empirically against the real
 * route before writing these assertions, not assumed.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { driveTurns, readLog } from './support/turnHarness'
import { CONFIRMS_CORRECT } from '@/lib/teaching/answerConfirmation'

const h = await vi.hoisted(async () => (await import('./support/turnHarness')).createHarness())
vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
vi.mock('@/lib/db/prisma', () => ({ prisma: h.prisma }))
vi.mock('@/lib/rateLimit', () => ({
  checkRateLimit: async () => ({ allowed: true }),
  rateLimitResponse: () => new Response('{}', { status: 429 }),
}))
vi.mock('@/lib/ai/router', async (o) => ({
  ...(await o<Record<string, unknown>>()),
  routeAI: (...a: unknown[]) => h.routeAI(...a),
}))
const { POST } = await import('@/app/api/learn/chat/route')

const PROBES = [1, 2, 3, 4, 5].map((n) => ({
  assetId: `probe-${n}`, conceptId: 'chem.elect.galvanic-cell',
  stem: `Q${n}: In a galvanic cell, where does oxidation occur?`,
  choices: [
    { text: `At the anode (${n})`, isCorrect: true },
    { text: `At the cathode (${n})`, isCorrect: false },
    { text: `In the salt bridge (${n})`, isCorrect: false },
  ],
}))

beforeEach(() => { h.state.messages = []; h.state.snapshot = {} })

describe('Typed Turn Contract Batch 3 — answer-verdict cluster, real route', () => {
  it('correct + authored key: the reply confirms, no CONTRACT_ASSERT violation', async () => {
    const res = await driveTurns(h, POST, [
      { learnerSays: 'ready', modelReplies: 'Oxidation happens at one electrode.' },
      { learnerSays: (onScreen) => onScreen?.options?.[0] ?? 'the anode', modelReplies: 'Here is your next question.' },
    ], { probes: PROBES })
    for (const t of res) {
      expect(t.status).toBe(200)
      expect(readLog(t, '[learn/chat] CONTRACT_ASSERT=')).toBeNull()
    }
    const [, graded] = res
    const body = graded.body as { text?: string; mastery?: { unverifiedReason: string | null } }
    expect(CONFIRMS_CORRECT.test(body.text ?? '')).toBe(true)
    // A genuine authored-key correct grade must never carry an
    // "invented-key" excuse — see masteryGate.ts's unverifiedReasonFor.
    expect(body.mastery?.unverifiedReason).not.toBe('invented-key')
  })

  it('wrong + authored key: the confident confirmation never fires', async () => {
    const res = await driveTurns(h, POST, [
      { learnerSays: 'ready', modelReplies: 'Oxidation happens at one electrode.' },
      { learnerSays: (onScreen) => onScreen?.options?.[1] ?? 'the cathode', modelReplies: 'Here is your next question.' },
    ], { probes: PROBES })
    for (const t of res) {
      expect(t.status).toBe(200)
      expect(readLog(t, '[learn/chat] CONTRACT_ASSERT=')).toBeNull()
    }
    const [, graded] = res
    const body = graded.body as { text?: string; mastery?: { unverifiedReason: string | null } }
    // `correctForConfirmation` must be `false`, never `true`, on a genuinely
    // wrong authored-key answer — the confirmation phrase must not fire.
    expect(CONFIRMS_CORRECT.test(body.text ?? '')).toBe(false)
    expect(body.mastery?.unverifiedReason).not.toBe('invented-key')
  })

  it('correct + model-invented key: A4 holds (never CLEAN), and the confident confirmation is withheld', async () => {
    const res = await driveTurns(h, POST, [
      {
        learnerSays: 'hello',
        modelReplies: 'Electrons flow from anode to cathode.\n'
          + '<!--MCQ q="Which electrode gains electrons?" a="Anode" b="Cathode" correct="b"-->',
      },
      { learnerSays: (onScreen) => onScreen?.options?.[1] ?? 'Cathode', modelReplies: 'Nice work — moving on.' },
    ])
    for (const t of res) {
      expect(t.status).toBe(200)
      // A4: a model-invented grade must never be reported signalVerification
      // === 'CLEAN' — the exact invariant this batch's `resolvedGrade` must
      // not weaken. A violation here would mean the collapse broke the
      // downgrade `unauthoredKeyGradeHoisted` still performs untouched.
      // `readLog` already returns the parsed JSON (or null) — asserted
      // directly rather than re-parsed, so this branch is genuinely
      // exercised rather than silently skipped by a type mismatch.
      const violation = readLog(t, '[learn/chat] CONTRACT_ASSERT=') as { violations: string[] } | null
      if (violation) expect(violation.violations).not.toContain('A4')
    }
    const [, graded] = res
    const body = graded.body as { text?: string; mastery?: { unverifiedReason: string | null } }
    // The 2026-09-14 fix this batch preserves: an unauthored (model-invented)
    // key must not be confirmed with full confidence, however the model
    // itself phrased its own reply ("Nice work" survives verbatim — this is
    // NOT a strip, the confirmation was simply never injected).
    expect(CONFIRMS_CORRECT.test(body.text ?? '')).toBe(false)
    expect(body.text).toBe('Nice work — moving on.')
    // The mastery payload's own excuse must name exactly this reason — the
    // observable proof that `resolvedGrade`'s `unauthoredKey` field still
    // reaches the fold correctly.
    expect(body.mastery?.unverifiedReason).toBe('invented-key')
  })

  it('BEHAVIOUR-NEUTRAL: a tapped, authored-key lesson still reaches verified mastery', async () => {
    const res = await driveTurns(h, POST, Array.from({ length: 8 }, (_, i) => ({
      learnerSays: (mcq: { options: string[] } | null) =>
        mcq ? (mcq.options.find((o) => o.startsWith('At the anode')) ?? mcq.options[0]) : 'ok',
      modelReplies: `Teaching ${i}.`,
    })), { probes: PROBES })
    const m = res.map((t) => (t.body as { mastery?: { verified?: boolean } }).mastery).find((x) => x?.verified)
    expect(m).toMatchObject({ verified: true, checkCorrect: 1, practiceCorrect: 2 })
    for (const t of res) expect(readLog(t, '[learn/chat] CONTRACT_ASSERT=')).toBeNull()
  })
})
