/**
 * CHOICE-ONLY MCQ GRADING (owner-approved spec GB+, 2026-09-28).
 *
 * A reply is graded only when it is a tap / the exact option text, or names an
 * option letter explicitly at the start (optionally followed by an
 * explanation). Every inference rule that used to guess a choice from a
 * sentence (a letter anywhere, ordinals, containment, answer halves,
 * distinctive words, bare numbers) was removed: across 478 scripted
 * misconception sentences it credited 28 as CORRECT. Evidence: the Phase 1
 * offline replay (457 scripted physics lessons on production) and 65
 * anonymised real replies — fixture src/tests/fixtures/choiceOnlyGrading.json.
 *
 * Sections follow the implementation spec: 9 harmful patterns, 10 zero
 * regression, 11 the accepted false-negative cost, plus route-level proof that
 * an ungraded reply moves no correctness, mastery or progress.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import fixture from './fixtures/choiceOnlyGrading.json'
import { resolveMcqChoice, gradeMcqAnswer, engagesPendingOptions, type TutorMCQ } from '@/lib/teaching/mcq'
import { driveTurns, type TurnResult } from './support/turnHarness'

const h = await vi.hoisted(async () => (await import('./support/turnHarness')).createHarness())
vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
vi.mock('@/lib/db/prisma', () => ({ prisma: h.prisma }))
vi.mock('@/lib/rateLimit', () => ({ checkRateLimit: async () => ({ allowed: true }), rateLimitResponse: () => new Response('{}', { status: 429 }) }))
vi.mock('@/lib/ai/router', async (o) => ({ ...(await o<Record<string, unknown>>()), routeAI: (...a: unknown[]) => h.routeAI(...a) }))
const { POST } = await import('@/app/api/learn/chat/route')
beforeEach(() => { h.state.messages = []; h.state.snapshot = {} })

const quiz = (i: number): TutorMCQ => ({ question: fixture.quizzes[i].q, options: fixture.quizzes[i].o, correctIndex: 0 })
const mcq = (options: string[]): TutorMCQ => ({ question: 'q', options, correctIndex: 0 })

// ── 9. KNOWN HARMFUL PATTERNS — never graded ────────────────────────────────
describe('9. the known false-credit mechanism is gone', () => {
  it('fixture holds the 12 harmful sentences (28 turns), 6 measured phrases, the off-topic and Maxwell cases', () => {
    expect(fixture.harmful).toHaveLength(12)
    expect(fixture.measured).toHaveLength(6)
    expect(fixture.offTopic).toHaveLength(1)
    expect(fixture.maxwell).toHaveLength(1)
  })
  for (const group of ['harmful', 'measured', 'offTopic', 'maxwell'] as const) {
    for (const c of fixture[group]) {
      it(`[${group}] ${c.message.slice(0, 70)}`, () => {
        expect(resolveMcqChoice(c.message, quiz(c.quiz))).toBeNull()
      })
    }
  }
})

// ── 10. ZERO REGRESSION — taps, exact text, explicit letters, letter + explanation
describe('10. what a learner selects explicitly is graded exactly as before', () => {
  it(`Z1 all ${fixture.taps.length} recorded taps resolve to the tapped option`, () => {
    const wrong = fixture.taps.filter(([qi, i]) => resolveMcqChoice(fixture.quizzes[qi].o[i], quiz(qi)) !== i)
    expect(wrong).toEqual([])
  })
  it('Z2 exact option text typed with case / spacing / quote / dash variation', () => {
    for (const q of fixture.quizzes.slice(0, 200)) {
      q.o.forEach((o, i) => {
        const upper = `  ${o.toUpperCase()}  `
        if (q.o.filter((x) => x.toUpperCase() === o.toUpperCase()).length > 1) return
        expect(resolveMcqChoice(upper, mcq(q.o)), upper).toBe(i)
      })
    }
  })
  it('Z3 explicit letters, in every form, for every recorded quiz', () => {
    const forms = (L: string) => [L, L.toLowerCase() + ')', `(${L})`, `${L}.`, `option ${L}`, `I think ${L}`, `my answer is ${L}`, `${L} please`, `answer: ${L}`]
    for (const q of fixture.quizzes) {
      q.o.slice(0, 4).forEach((_, i) => {
        for (const f of forms('ABCD'[i])) expect(resolveMcqChoice(f, mcq(q.o)), f).toBe(i)
      })
    }
  })
  it('Z4 letter + explanation', () => {
    const D = mcq(['300 m east', '300 m west', '0 m', '600 m east'])
    const cases: Array<[string, number]> = [
      ['C, 0 m', 2], ['C) 0 m', 2], ['C because the two legs cancel', 2], ['C) because they cancel', 2],
      ['C. because they cancel', 2], ['C: they cancel', 2], ['C — they cancel', 2], ['(C) they cancel', 2],
      ['I think C because it has more energy there', 2], ['sir I think C because...', 2],
      ['A. But you haven\'t explained it earlier', 0], ['b since it points west', 1],
    ]
    for (const [m, i] of cases) expect(resolveMcqChoice(m, D), m).toBe(i)
  })
  it('Z4 the explanation can only reject, never pick a different option', () => {
    const D = mcq(['300 m east', '300 m west', '0 m', '600 m east'])
    expect(resolveMcqChoice('C) 300 m east', D)).toBeNull() // label and text disagree (R13)
    expect(resolveMcqChoice('A or C', D)).toBeNull()        // two options (R8)
    expect(resolveMcqChoice('A. or maybe C)', D)).toBeNull()
    expect(resolveMcqChoice('C?', D)).toBeNull()            // a question about C (R7)
  })
  it('Z5 the 65 real replies: every accepted form graded, every non-choice refused', () => {
    for (const r of fixture.real) {
      const got = resolveMcqChoice(r.message, mcq(r.o))
      const accepted = ['tap / exact option text', 'explicit letter', 'letter + option text', 'letter + comment', 'natural typed (case variant of option text)']
      if (accepted.includes(r.category)) expect(got, `#${r.n} ${r.message}`).toBe(r.truth)
      else expect(got, `#${r.n} ${r.message}`).toBeNull()
    }
  })
  it('Z7 symbol-only options, grouped numbers and case-only options keep their exact-match handling', () => {
    expect(resolveMcqChoice('Δx', mcq(['Δx', 'Δv', 'Δt']))).toBe(0)
    expect(resolveMcqChoice('84 000 J', mcq(['4200 J', '84 000 J', '840 J']))).toBe(1)
    expect(resolveMcqChoice('84000 J', mcq(['4200 J', '84 000 J', '840 J']))).toBe(1)
    expect(resolveMcqChoice('Homo sapiens', mcq(['Homo sapiens', 'homo sapiens', 'Homo Sapiens']))).toBe(0)
  })
  it('Z8 an option that is itself an acknowledgement word is still graded when tapped', () => {
    expect(gradeMcqAnswer('K', { ...mcq(['K', 'C', 'B12', 'B6']), correctIndex: 0 })).toEqual({ chosenIndex: 0, correct: true })
  })
})

// ── 11. THE ACCEPTED COST — these genuine answers are no longer graded ──────
describe('11. known false negatives (accepted cost, pinned so it stays visible)', () => {
  const real = (n: number) => fixture.real.find((r) => r.n === n)!
  it.each([35, 32, 48])('real reply #%i is refused', (n) => {
    const r = real(n)
    expect(resolveMcqChoice(r.message, mcq(r.o))).toBeNull()
  })
  it.each([
    ['i think it is the lowest point sir', ['At the highest point on the left', 'At the highest point on the right', 'At the LOWEST point in the MIDDLE', 'It moves at a constant speed']],
    ['2', ['2 m/s²', '50 m/s²', '0.5 m/s²', '15 m/s²']],
    ['i think 2 m/s2', ['2 m/s²', '50 m/s²', '0.5 m/s²', '15 m/s²']],
    ['a = 2 m/s^2', ['2 m/s²', '50 m/s²', '0.5 m/s²', '15 m/s²']],
    ['Toward the normal', ['Toward the normal — light bends toward the normal', 'Away from the normal — it speeds up']],
    ['the second one', ['Positive', 'Negative', 'Zero']],
    ['second', ['Positive', 'Negative', 'Zero']],
    ['i think it is negative', ['Positive', 'Negative', 'Zero']],
  ])('"%s" is refused', (m, options) => {
    expect(resolveMcqChoice(m, mcq(options))).toBeNull()
  })
  it('a refused answer that engages the options is still routed to "tap the choice you mean"', () => {
    const q = mcq(['Two arrows of equal length, one east then one west, from the same point.', 'One arrow pointing east.', 'Two points, no arrows.'])
    expect(resolveMcqChoice('the first one, two arrows same point', q)).toBeNull()
    expect(engagesPendingOptions('the first one, two arrows same point', q)).toBe(true)
  })
})

// ── ROUTE LEVEL — an ungraded reply moves nothing; the quiz stays answerable ─
const PROBES = [1, 2, 3, 4, 5].map((n) => ({
  assetId: `probe-${n}`, conceptId: 'phys.mech.impulse', stem: `Q${n}: A 2 kg ball slows from 6 m/s to 2 m/s. What is its change in momentum (case ${n})?`,
  choices: [
    { text: `−8 kg·m/s — the change opposes the motion (${n})`, isCorrect: true },
    { text: `16 kg·m/s — add the speeds (${n})`, isCorrect: false },
  ],
}))
const LANE = { probes: PROBES, subjectSlug: 'physics', conceptId: 'phys.mech.impulse', lessonTitle: 'Impulse' }
const onScreen = (t: TurnResult) => (t.body as { mcq?: { question: string; options: string[] } | null }).mcq ?? null
const ladder = (t: TurnResult) => JSON.parse(t.logs.find((l) => l.startsWith('[ladder] '))!.slice('[ladder] '.length))

async function quizUp(): Promise<TurnResult> {
  for (let i = 0; i < 14; i++) {
    const [t] = await driveTurns(h, POST, [{ learnerSays: 'ok', modelReplies: `Momentum is mass times velocity (${i}).` }], LANE)
    if (onScreen(t)) return t
  }
  throw new Error('no quiz was ever served')
}

describe('route: an ungraded reply earns nothing and leaves the quiz answerable', () => {
  it('a harmful-shape sentence with the model claiming "correct": no grade, no credit, SIGNAL suppressed, quiz still pending', async () => {
    const shown = await quizUp()
    const q = onScreen(shown)!
    const before = ladder(shown)
    const [t] = await driveTurns(h, POST, [{
      learnerSays: 'I think the change opposes the motion because the ball slows down so momentum goes down',
      modelReplies: 'Good thinking. <!--SIGNAL correctness="true" confidence="high"-->',
    }], LANE)
    const after = ladder(t)
    expect(after.serverGraded).toBe(false)
    expect(after.correctness ?? null).toBeNull()
    expect(t.logs.some((l) => l.includes('unresolved-pending-mcq-signal-suppressed'))).toBe(true)
    for (const k of ['verifiedCheck', 'verifiedPractice', 'check', 'practice']) expect(after[k], k).toBe(before[k])
    expect(t.logs.some((l) => l.includes('PROBE_OUTCOME'))).toBe(false)
    // The same quiz is still the pending one, so a tap on it is graded.
    const pending = (t.snapshot as { pendingMcq?: { question?: string } }).pendingMcq
    expect(pending?.question).toBe(q.question)
    const correct = q.options.find((o) => o.startsWith('−8'))!
    const [tap] = await driveTurns(h, POST, [{ learnerSays: correct, modelReplies: 'Well done.' }], LANE)
    expect(ladder(tap).serverGraded).toBe(true)
    expect(ladder(tap).correctness).toBe(true)
  }, 180_000)

  it('control: a correct tap is graded exactly as before', async () => {
    const shown = await quizUp()
    const q = onScreen(shown)!
    const before = ladder(shown)
    const [t] = await driveTurns(h, POST, [{ learnerSays: q.options.find((o) => o.startsWith('−8'))!, modelReplies: 'Right.' }], LANE)
    const after = ladder(t)
    expect(after.serverGraded).toBe(true)
    expect(after.correctness).toBe(true)
    // Counters move only at CHECK/PRACTICE (unchanged phase rules); the grade itself is the invariant here.
    expect(after.phaseAfter).toBeDefined()
    expect(before.serverGraded).toBe(false)
  }, 180_000)

  it('control: an explicit letter + explanation is graded', async () => {
    const shown = await quizUp()
    const q = onScreen(shown)!
    const letter = 'ABCD'[q.options.findIndex((o) => o.startsWith('−8'))]
    const [t] = await driveTurns(h, POST, [{ learnerSays: `${letter} because the change opposes the motion`, modelReplies: 'Right.' }], LANE)
    expect(ladder(t).serverGraded).toBe(true)
    expect(ladder(t).correctness).toBe(true)
  }, 180_000)
})
