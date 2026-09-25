import { describe, it, expect, vi } from 'vitest'
import { withholdUngradedGateQuestion, cutBackToTeaching, dropUndeliveredCheckAnnouncements } from '@/lib/teaching/gateAssessment'
import { driveTurns, readLog } from './support/turnHarness'

/**
 * THE QUESTION DELIVERY CONTRACT:  an ANNOUNCEMENT may not exist without an
 * ARTIFACT.
 *
 * THE P0 (phys.mech.torque T13-T14, production audit). The tutor said, on two
 * consecutive turns, "Here's a quick question for you:" and "Here's the
 * question:", attached nothing (`mcq: null`), and the cooperative learner sat
 * at CHECK forever.
 *
 * The architecture already contained the invariant — `withholdUngradedGateQuestion`
 * exists precisely to stop an ungradeable question reaching a learner, and
 * `dropOrphanedLeadIn` already knew an introduction with nothing to introduce
 * is garbage. The BOUNDARY that was violated is that the whole repair was
 * gated on `poses` — "did the model ask a question?" — so a turn that
 * announced one and asked none took the early return and shipped unrepaired.
 *
 * These tests are written against the real function and the real route.
 */

const gate = (text: string, extra: Record<string, unknown> = {}) =>
  withholdUngradedGateQuestion({ text, phase: 'CHECK', hasStructuredMcq: false, ...extra } as never)

// The two strings production actually served.
const TORQUE_T13 = "Let's check your understanding. Here's a quick question for you:"
const TORQUE_T14 = "Good. Here's the question:"

describe('3 — an assessment announcement cannot be emitted without an artifact', () => {
  it.each([TORQUE_T13, TORQUE_T14])('the production string %j is repaired, not served', (text) => {
    const r = gate(text)
    expect(r.withheld).toBe(true)
    expect(r.reason).toBe('announced-question-never-delivered')
    expect(r.text).not.toContain('question for you:')
    expect(r.text).not.toContain("Here's the question:")
    expect(r.text.trim().length).toBeGreaterThan(0)   // never an empty turn
  })

  it('detection is structural, not a phrase list — any undelivered promise is caught', () => {
    for (const text of [
      'Try this one:', 'Consider the following:', 'Now answer this:',
      'Your turn — work out the following:', 'Here it is:',
    ]) {
      expect(gate(text).reason).toBe('announced-question-never-delivered')
    }
  })

  it('a truncated turn that stops on its own lead-in fails closed', () => {
    // The audit also reported responses truncated mid-sentence. A turn cut off
    // at its announcement is the same defect arriving by a different route, and
    // is closed here rather than by raising an output limit.
    expect(gate('Torque is r x F. Now here is the question:').withheld).toBe(true)
  })
})

describe('1 — a real artifact makes the announcement TRUE, and it must survive', () => {
  it('an attached structured MCQ leaves the lead-in alone', () => {
    const r = gate("Here's the question:", { hasStructuredMcq: true, attachedMcqQuestion: 'What is the torque?' })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe("Here's the question:")
  })

  it('a probe carried forward and rendered below leaves the lead-in alone', () => {
    const r = gate("Here's the question:", { questionOnScreen: true })
    expect(r.withheld).toBe(false)
    expect(r.text).toBe("Here's the question:")
  })
})

describe('negative controls — the repair does not fire where it must not', () => {
  it('ordinary teaching is untouched', () => {
    const t = 'Torque is the turning effect of a force about a pivot.'
    expect(gate(t)).toEqual({ text: t, withheld: false, reason: 'ok' })
  })

  it('a turn outside the mastery gate is untouched', () => {
    const r = gate("Here's a quick question for you:", { phase: 'OBSERVE', gateSoughtThisTurn: false })
    expect(r.withheld).toBe(false)
  })

  it('a confirmation tail is not an assessment announcement', () => {
    for (const t of ['Does that make sense?', 'Shall we carry on?']) {
      expect(gate(t).reason).toBe('ok')
    }
  })

  it('an excursion-blocked gate is still exempt (R4 stays fixed)', () => {
    const r = gate("Here's a quick question for you:", { gateBlockedByExcursion: true })
    expect(r.withheld).toBe(false)
  })

  it('a completed lesson is still exempt', () => {
    expect(gate("Here's the question:", { lessonCompleted: true }).withheld).toBe(false)
  })
})

describe('NON-VACUITY — these fail without the new protection', () => {
  it('the pre-fix predicate (poses-only) would have served both strings unrepaired', () => {
    // Reconstructs the exact early return that shipped the defect, using the
    // repo's own notion of "is there teaching left". `cutBackToTeaching`
    // returning '' proves the turn was NOTHING BUT an announcement — so the
    // old `poses === false` path returned text that contained no teaching and
    // no question. That is the stranded learner, reproduced.
    for (const text of [TORQUE_T13, TORQUE_T14]) {
      expect(cutBackToTeaching(text)).toBe('')          // nothing but a promise
      expect(gate(text).withheld).toBe(true)            // and it is now caught
    }
  })
})

// ── The route, end to end ────────────────────────────────────────────────────
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
  assetId: `probe-${n}`,
  conceptId: 'chem.elect.galvanic-cell',
  stem: `Q${n}: In a galvanic cell, where does oxidation occur?`,
  choices: [
    { text: `At the anode (${n})`, isCorrect: true },
    { text: `At the cathode (${n})`, isCorrect: false },
  ],
}))

describe('4 — a missing artifact cannot strand the learner, driven through the REAL route', () => {
  it('a model that announces a question and delivers none never reaches the learner', async () => {
    h.state.messages = []; h.state.snapshot = {}
    const res = await driveTurns(h, POST, [
      { learnerSays: 'ok', modelReplies: 'Oxidation releases electrons at one electrode.' },
      { learnerSays: 'go on', modelReplies: "Let's check your understanding. Here's a quick question for you:" },
      { learnerSays: 'I am ready', modelReplies: "Good. Here's the question:" },
    ], { probes: PROBES, conceptId: 'chem.elect.galvanic-cell', subjectSlug: 'chemistry' })

    for (const turn of res) {
      const body = turn.body as { text?: string; mcq?: unknown; mastery?: { verified?: boolean } }
      const text = body.text ?? ''
      // THE INVARIANT: announcing without an artifact is impossible.
      const promises = /:\s*$/.test(text.trim())
      if (promises) expect(body.mcq).toBeTruthy()
      // 14/15 — nothing was graded, so nothing may be claimed.
      expect(body.mastery?.verified).not.toBe(true)
    }
  })

  it('every turn leaves the learner a meaningful next action — text or a question', async () => {
    h.state.messages = []; h.state.snapshot = {}
    const res = await driveTurns(h, POST, [
      { learnerSays: 'ok', modelReplies: 'Electrons leave at the anode.' },
      { learnerSays: 'ready', modelReplies: "Here's the question:" },
      { learnerSays: 'still ready', modelReplies: "Here's a quick question for you:" },
      { learnerSays: 'and now?', modelReplies: "Try this one:" },
    ], { probes: PROBES, conceptId: 'chem.elect.galvanic-cell', subjectSlug: 'chemistry' })

    for (const turn of res) {
      const body = turn.body as { text?: string; mcq?: { question?: string } | null }
      const hasArtifact = Boolean(body.mcq?.question)
      const hasProse = (body.text ?? '').trim().length > 0
      expect(hasArtifact || hasProse).toBe(true)
    }
  })

  it('5/19 — repeated announcement turns do not starve the lesson into silence', async () => {
    h.state.messages = []; h.state.snapshot = {}
    const res = await driveTurns(h, POST, Array.from({ length: 6 }, (_, i) => ({
      learnerSays: i === 0 ? 'ok' : 'ready',
      modelReplies: i === 0 ? 'Oxidation happens at one electrode.' : "Here's the question:",
    })), { probes: PROBES, conceptId: 'chem.elect.galvanic-cell', subjectSlug: 'chemistry' })

    // The liveness machinery still runs: every turn is observed and reported.
    const last = res[res.length - 1]
    expect(readLog(last, '[learn/chat] TURN_EVENT')).not.toBeNull()
    expect((last.body as { text?: string }).text?.trim().length).toBeGreaterThan(0)
  })
})

describe('6/7/8/9 — the answer channel, and what must not be graded', () => {
  it('9 — a bare acknowledgement never grades an unseen question', async () => {
    h.state.messages = []; h.state.snapshot = {}
    const res = await driveTurns(h, POST, [
      { learnerSays: 'ok', modelReplies: 'Electrons leave at the anode.' },
      { learnerSays: 'yes', modelReplies: 'Good.' },
      { learnerSays: 'thanks', modelReplies: 'Glad that helped.' },
      { learnerSays: 'I understand', modelReplies: 'Great.' },
    ], { probes: PROBES, conceptId: 'chem.elect.galvanic-cell', subjectSlug: 'chemistry' })
    for (const t of res) {
      const m = (t.body as { mastery?: { verified?: boolean; checkCorrect?: number; practiceCorrect?: number } }).mastery
      expect(m?.verified).not.toBe(true)
      expect(m?.checkCorrect ?? 0).toBe(0)
      expect(m?.practiceCorrect ?? 0).toBe(0)
    }
  })

  it('6/7 — a substantive tapped answer is graded, and the same probe is not re-served', async () => {
    h.state.messages = []; h.state.snapshot = {}
    const res = await driveTurns(h, POST, [
      { learnerSays: 'ok', modelReplies: 'Oxidation happens at one electrode.' },
      // Tap the correct option of whatever probe is on screen.
      { learnerSays: (mcq) => mcq?.options.find((o) => o.includes('anode')) ?? 'ok', modelReplies: 'Right.' },
      { learnerSays: (mcq) => mcq?.options.find((o) => o.includes('anode')) ?? 'ok', modelReplies: 'Right again.' },
    ], { probes: PROBES, conceptId: 'chem.elect.galvanic-cell', subjectSlug: 'chemistry' })
    const served = res.map((t) => (t.body as { mcq?: { question?: string } | null }).mcq?.question).filter(Boolean)
    // 8 — an answered probe is never handed back.
    expect(new Set(served).size).toBe(served.length)
  })

  it('14/15 — no mastery is credited on a turn that graded nothing', async () => {
    h.state.messages = []; h.state.snapshot = {}
    const res = await driveTurns(h, POST, [
      { learnerSays: 'ok', modelReplies: 'Teaching.' },
      { learnerSays: 'hmm', modelReplies: "Correct! Well done. You've mastered this." },
    ], { probes: PROBES, conceptId: 'chem.elect.galvanic-cell', subjectSlug: 'chemistry' })
    const m = (res[1].body as { mastery?: { verified?: boolean } }).mastery
    expect(m?.verified).not.toBe(true)
  })
})

describe('10/11/12 — delivery requests stay on the current concept', () => {
  it.each([
    ['explain simpler', 'Explain that simpler please'],
    ['make it easier', 'can you make it easier'],
    ['quiz request', 'give me a quiz question now'],
    ['ask me', 'ask me something'],
    ['test me', 'test me on this'],
  ])('%s does not open an excursion away from the lesson concept', async (_n, says) => {
    h.state.messages = []; h.state.snapshot = {}
    const res = await driveTurns(h, POST, [
      { learnerSays: 'ok', modelReplies: 'Oxidation happens at the anode.' },
      { learnerSays: says, modelReplies: 'Here it is in simpler terms: electrons leave the anode.' },
    ], { probes: PROBES, conceptId: 'chem.elect.galvanic-cell', subjectSlug: 'chemistry' })
    const ex = readLog(res[1], '[learn/chat] EXCURSION_EVENT') as { kind?: string } | null
    // A delivery request is not a topic change: no excursion may OPEN on it.
    expect(ex?.kind).not.toBe('open')
  })
})

describe('17 — internal control markup never reaches the learner', () => {
  it('SIGNAL and MCQ tags are stripped from the served text', async () => {
    h.state.messages = []; h.state.snapshot = {}
    const res = await driveTurns(h, POST, [
      { learnerSays: 'ok', modelReplies: 'Teaching text.\n<!--SIGNAL:correct=true;confidence=high-->' },
      { learnerSays: 'go on', modelReplies: 'More teaching.\n<!--MCQ:{"question":"Q?","options":["a","b"],"correctIndex":0}-->' },
    ], { probes: PROBES, conceptId: 'chem.elect.galvanic-cell', subjectSlug: 'chemistry' })
    for (const t of res) {
      const text = (t.body as { text?: string }).text ?? ''
      expect(text).not.toContain('<!--')
      expect(text).not.toContain('SIGNAL')
      expect(text).not.toContain('correctIndex')
    }
  })
})

describe('NON-VACUITY for the final-response contract', () => {
  it('the route computes the served MCQ once and gates the repair on it', async () => {
    const { readFileSync } = await import('fs')
    const src = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')
    // One decision, reused — so the payload and the check cannot disagree.
    expect(src).toContain('const servedMcq = probeReleasedThisTurnHoisted')
    expect(src).toContain('if (!servedMcq) {')
    // The fallback is the concept's KG description when one exists (learner
    // pilot 2026-09-24: the plain continuation reached learners as three
    // content-free turns in a row), WITHHELD_QUESTION_CONTINUATION_TEXT otherwise.
    expect(src).toContain('let finalFallback = WITHHELD_QUESTION_CONTINUATION_TEXT')
    expect(src).toContain('enforceQuestionDeliveryContract(cleanText, finalFallback)')
    expect(src).toContain('mcq: servedMcq,')
    // The disambiguation lead-in may not outlive the list it names.
    expect(src).toContain('&& probeReleasedThisTurnHoisted !== true')
  })

  it('the enforcer is a no-op when an artifact exists, and repairs when none does', async () => {
    const { enforceQuestionDeliveryContract } = await import('@/lib/teaching/gateAssessment')
    // Called only when no artifact ships; with a promise it must repair.
    expect(enforceQuestionDeliveryContract("Good. Here's the question:", 'FALLBACK')).toBe('FALLBACK')
    // Teaching in its OWN paragraph survives; a promise sharing a paragraph
    // with its teaching takes the paragraph with it. That is
    // `cutBackToTeaching`'s existing, deliberate paragraph-wise scope — it
    // fails closed, which is the right direction for a delivery guard.
    expect(enforceQuestionDeliveryContract('Torque is r x F.\n\nNow here is the question:', 'FALLBACK'))
      .toBe('Torque is r x F.')
    expect(enforceQuestionDeliveryContract('Torque is r x F. Here is why:', 'FALLBACK')).toBe('FALLBACK')
    // No promise, no change — this is what proves the guard is not blanket.
    const plain = 'Torque is the turning effect of a force.'
    expect(enforceQuestionDeliveryContract(plain, 'FALLBACK')).toBe(plain)
  })
})

describe('a colon-ended check announcement with a figure pointer after it (synthetic run, 2026-09-25)', () => {
  const FIG = 'Take a look at the figure beside this message — it\'s a general illustration related to the topic.'
  it('the production reply loses the undelivered announcement', () => {
    const t = 'Sure! Here’s a quick check on acceleration:\n\n' + FIG
    const out = dropUndeliveredCheckAnnouncements(t)
    expect(out).not.toMatch(/quick check/i)
    expect(out).toContain('beside this message')
  })
  it('a verb lead-in to content is untouched', () => {
    const t = 'Let’s check the formula:\n\nv = u + at'
    expect(dropUndeliveredCheckAnnouncements(t)).toBe(t)
  })
  it('an announcement followed by its question is untouched', () => {
    const t = 'Here’s a quick check on acceleration:\n\nWhat is the unit of acceleration?'
    expect(dropUndeliveredCheckAnnouncements(t)).toBe(t)
  })
})
