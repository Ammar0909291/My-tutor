/**
 * Tutor Max final defect closure — BEHAVIOUR through the real chat route
 * (turn harness: real route, faked DB, scripted model). The companion
 * finalDefectClosure20261010.test.ts covers the pure modules; this file
 * asserts what the learner actually receives.
 *
 * The scripted model answers the two check passes by their system prompts, so
 * a test can make the checker say exactly what a production checker might.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { driveTurns, readLog, type TurnResult } from './support/turnHarness'
import { NO_FIGURE_LEAD } from '@/lib/teaching/figureReference'
import { QUIZ_UNANSWERED_LEAD } from '@/lib/teaching/quizRequest'
import { GROUNDED_CHECK_SYSTEM_PROMPT } from '@/lib/teaching/groundedProseCheck'
import { FACT_CHECK_SYSTEM_PROMPT } from '@/lib/teaching/factCheckPass'

const h = await vi.hoisted(async () => (await import('./support/turnHarness')).createHarness())
const checker = vi.hoisted(() => ({ grounded: '{"claims":[]}' as string | null, numeric: 'OK', groundedCalls: 0, numericCalls: 0, groundedUser: '' }))
vi.mock('@/lib/auth', () => ({ auth: () => h.auth() }))
vi.mock('@/lib/db/prisma', () => ({ prisma: h.prisma }))
vi.mock('@/lib/rateLimit', () => ({ checkRateLimit: async () => ({ allowed: true }), rateLimitResponse: () => new Response('{}', { status: 429 }) }))
vi.mock('@/lib/ai/router', async (o) => ({
  ...(await o<Record<string, unknown>>()),
  routeAI: (...a: unknown[]) => {
    const system = String(a[1] ?? '')
    if (system === GROUNDED_CHECK_SYSTEM_PROMPT) {
      checker.groundedCalls++
      checker.groundedUser = String((a[0] as Array<{ content: string }>)[0]?.content ?? '')
      return Promise.resolve({ text: checker.grounded, provider: 'harness', finishReason: 'stop' })
    }
    if (system === FACT_CHECK_SYSTEM_PROMPT) {
      checker.numericCalls++
      return Promise.resolve({ text: checker.numeric, provider: 'harness', finishReason: 'stop' })
    }
    return h.routeAI(...a)
  },
}))
const { POST } = await import('@/app/api/learn/chat/route')
beforeEach(() => {
  h.state.messages = []; h.state.snapshot = {}
  checker.grounded = '{"claims":[]}'; checker.numeric = 'OK'; checker.groundedCalls = 0; checker.numericCalls = 0; checker.groundedUser = ''
})
const text = (t: TurnResult) => String((t.body as { text?: string }).text ?? '')
const mcq = (t: TurnResult) => (t.body as { mcq?: { question: string; options: string[] } | null }).mcq ?? null

// ── Issue A ──────────────────────────────────────────────────────────────
const CORROSION = { subjectSlug: 'chemistry', conceptId: 'chem.elect.corrosion', lessonTitle: 'Corrosion' }
/** What production shipped on 864e3fd (chem.elect.corrosion, 2026-10-10). */
const IMAGINED = 'There is no picture in this lesson yet, so let me say it in words. It usually shows a piece of iron with two regions: one area where oxygen is plentiful (the cathode) and another where oxygen is scarce, such as under a rust-filled crevice (the anode). Electrons flow through the metal from the anode to the cathode.'
const PICTURE_Q = 'i dont understand this picture. what is it showing?'
const rrm = (concept: string) => ({ renderedRealityLog: [{ visualIdentity: 'scene:corrosion-cell', visualSemantics: 'Iron with an anodic and a cathodic region', sourcePipeline: 'detectedSceneSpec', matchedConcept: concept, turnPosition: 1 }] })

describe('Issue A through the route', () => {
  it('no figure anywhere: the imagined description is replaced by the honest, teaching reply', async () => {
    const [, t] = await driveTurns(h, POST, [
      { learnerSays: 'ok', modelReplies: 'Corrosion is the slow destruction of a metal by chemical reaction with its surroundings, like iron rusting in damp air.' },
      { learnerSays: PICTURE_Q, modelReplies: IMAGINED },
    ], CORROSION)
    expect(text(t).startsWith(NO_FIGURE_LEAD)).toBe(true)
    expect(text(t)).not.toMatch(/It usually shows|two regions|rust-filled crevice/)
    expect(text(t)).toMatch(/camera button/)
    expect(text(t).length).toBeGreaterThan(NO_FIGURE_LEAD.length + 40) // the idea is still taught
    expect(readLog(t, '[figure-evidence]')).toMatchObject({ event: 'no-figure-evidence-reply-replaced', conceptId: 'chem.elect.corrosion' })
  }, 120_000)

  it('a figure shown earlier for THIS concept stays usable: the reply about it is kept', async () => {
    h.state.snapshot = rrm('chem.elect.corrosion')
    const about = 'The figure shows iron with an anodic region, where iron loses electrons, and a cathodic region, where oxygen gains them; electrons move through the metal between the two.'
    const [t] = await driveTurns(h, POST, [{ learnerSays: PICTURE_Q, modelReplies: about }], CORROSION)
    expect(text(t).startsWith(NO_FIGURE_LEAD)).toBe(false)
    expect(text(t)).toMatch(/anodic region/)
    expect(readLog(t, '[figure-evidence]')).toMatchObject({ event: 'figure-question', available: true, renderedConcepts: ['chem.elect.corrosion'] })
    expect(t.logs.some((l) => l.includes('no-figure-evidence-reply-replaced'))).toBe(false)
  }, 120_000)

  it('production follow-up (rate-law, cf79346): a figure that WAS shown, denied or imagined by the reply, is answered from what was drawn', async () => {
    h.state.snapshot = { renderedRealityLog: [{
      visualIdentity: 'scene:rate-law', visualSemantics: 'A 3D scene: Determining Rate Law and Order via Initial-Rate Method',
      sourcePipeline: 'detectedSceneSpec', matchedConcept: 'chem.elect.corrosion', turnPosition: 3,
      drawn: { caption: 'Corrosion of Iron: Anode and Cathode', text: ['Anode: Fe → Fe²⁺ + 2e⁻', 'Cathode: O₂ + 2H₂O + 4e⁻ → 4OH⁻'] },
    }] }
    const denied = 'I’m sorry you can’t see a picture right now, so let me describe what a typical illustration would show. Usually the diagram has two parts.'
    const [t] = await driveTurns(h, POST, [{ learnerSays: PICTURE_Q, modelReplies: denied }], CORROSION)
    expect(text(t)).toMatch(/^The picture for this lesson is further up in our chat\. It is titled “Corrosion of Iron: Anode and Cathode”\./)
    expect(text(t)).toMatch(/“Anode: Fe → Fe²⁺ \+ 2e⁻”/)
    expect(text(t)).not.toMatch(/typical|two parts|can’t see/)
    expect(t.logs.some((l) => l.includes('figure-reply-grounded-to-shown-figure'))).toBe(true)
  }, 120_000)

  it('a figure shown for a DIFFERENT concept is no evidence', async () => {
    h.state.snapshot = rrm('chem.kinet.rate-law')
    const [t] = await driveTurns(h, POST, [{ learnerSays: PICTURE_Q, modelReplies: IMAGINED }], CORROSION)
    expect(text(t).startsWith(NO_FIGURE_LEAD)).toBe(true)
    expect(text(t)).not.toMatch(/It usually shows/)
  }, 120_000)

  it('server-held figure state without a rendered figure (or a malformed log entry) is no evidence', async () => {
    h.state.snapshot = {
      visualSession: { conceptId: 'chem.elect.corrosion', turns: 3 },
      renderedRealityLog: [{ matchedConcept: 'chem.elect.corrosion' }], // malformed: no identity/pipeline/turn
    }
    const [t] = await driveTurns(h, POST, [{ learnerSays: PICTURE_Q, modelReplies: IMAGINED }], CORROSION)
    expect(text(t).startsWith(NO_FIGURE_LEAD)).toBe(true)
    expect(text(t)).not.toMatch(/It usually shows/)
  }, 120_000)

  it('a photo the learner sent with the camera button counts as a picture', async () => {
    h.state.messages = [{ id: 'm-photo', role: 'USER', content: '📸 [Изображение]\nwhat is this rust?', createdAt: new Date(Date.now() - 60_000) }]
    const about = 'In your photo the orange-brown flakes are rust: hydrated iron(III) oxide that forms where the iron met water and oxygen together over time.'
    const [t] = await driveTurns(h, POST, [{ learnerSays: 'i dont understand this picture', modelReplies: about }], CORROSION)
    expect(text(t).startsWith(NO_FIGURE_LEAD)).toBe(false)
    expect(text(t)).toMatch(/hydrated iron\(III\) oxide/)
  }, 120_000)
})

// ── Issue B ──────────────────────────────────────────────────────────────
const PROBES = [1, 2, 3].map((n) => ({
  assetId: `probe-${n}`, conceptId: 'phys.meas.units', stem: `Q${n}: Which of these is an SI base unit (set ${n})?`,
  choices: [{ text: `The kilogram (${n})`, isCorrect: true }, { text: `The newton (${n})`, isCorrect: false }, { text: `The joule (${n})`, isCorrect: false }],
}))
const UNITS = { subjectSlug: 'physics', conceptId: 'phys.meas.units', lessonTitle: 'SI Units and Measurement' }
const WORKED = 'For example, 2.5 km is 2.5 × 1000 m = 2500 m, because the prefix kilo means one thousand.'

describe('Issue B through the route', () => {
  it.each(['test my understanding', 'give me a quiz', 'Ask me a question.'])('"%s" at the start of a lesson gets an authored card', async (ask) => {
    const [, q] = await driveTurns(h, POST, [
      { learnerSays: "ok, let's start", modelReplies: 'Two friends measure a plank with different rulers.' },
      { learnerSays: ask, modelReplies: WORKED },
    ], { ...UNITS, probes: PROBES })
    expect(PROBES.map((p) => p.stem)).toContain(mcq(q)?.question)
  }, 120_000)

  it('repeated request with the card unanswered: the same card, said to be the same card; answered cards are never asked again', async () => {
    const [, first, again, answer, next] = await driveTurns(h, POST, [
      { learnerSays: "ok, let's start", modelReplies: 'Two friends measure a plank with different rulers.' },
      { learnerSays: 'quiz me', modelReplies: WORKED },
      { learnerSays: 'quiz me', modelReplies: WORKED },
      { learnerSays: (m) => m!.options.find((o) => o.startsWith('The kilogram'))!, modelReplies: 'Yes, the kilogram is an SI base unit.' },
      { learnerSays: 'quiz me', modelReplies: WORKED },
    ], { ...UNITS, probes: PROBES })
    expect(mcq(again)?.question).toBe(mcq(first)?.question)
    expect(text(again).startsWith(QUIZ_UNANSWERED_LEAD)).toBe(true)
    expect(readLog(answer, '[mcq-grade]')).toMatchObject({ correct: true })
    if (mcq(next)) expect(mcq(next)!.question).not.toBe(mcq(first)!.question)
    else expect(text(next)).toMatch(/^(?:You have answered every practice question|I don't have a practice question)/)
  }, 180_000)

  it('no authored card at all: an honest line first, never a worked example passed off as the quiz', async () => {
    const [, q] = await driveTurns(h, POST, [
      { learnerSays: "ok, let's start", modelReplies: 'Two friends measure a plank with different rulers.' },
      { learnerSays: 'quiz me', modelReplies: WORKED },
    ], { ...UNITS, probes: [] })
    expect(mcq(q)).toBeNull()
    expect(text(q)).toMatch(/^I don't have a practice question I can give you on .* right now/)
    expect(readLog(q, '[quiz-request]')).toMatchObject({ event: 'no-card-available' })
  }, 120_000)

  it('production follow-up (cf79346, bio): no new card at DEMONSTRATE while a missed one waits — the reply says it comes back', async () => {
    const ONE = [PROBES[0]]
    const [first, wrong, again] = await driveTurns(h, POST, [
      { learnerSays: 'quiz me', modelReplies: WORKED },
      { learnerSays: (m) => m!.options.find((o) => o.startsWith('The newton'))!, modelReplies: 'Not quite.' },
      { learnerSays: 'quiz me', modelReplies: WORKED },
    ], { ...UNITS, probes: ONE })
    expect(mcq(first)?.question).toBe(ONE[0].stem)
    expect(readLog(wrong, '[mcq-grade]')).toMatchObject({ correct: false })
    expect(mcq(again)).toBeNull()
    expect(text(again)).toMatch(/^You have answered every new practice question I have on .* in this lesson[.;] (?:A|a) question you have already seen comes back once more/)
    expect(text(again)).not.toMatch(/can't give you a new one/)
  }, 180_000)

  it('a wrong tap is still graded by the authored key only (strict grading unchanged)', async () => {
    const [, , wrong] = await driveTurns(h, POST, [
      { learnerSays: "ok, let's start", modelReplies: 'Two friends measure a plank with different rulers.' },
      { learnerSays: 'quiz me', modelReplies: WORKED },
      { learnerSays: (m) => m!.options.find((o) => o.startsWith('The newton'))!, modelReplies: 'Great job, that is right!' },
    ], { ...UNITS, probes: PROBES })
    expect(readLog(wrong, '[mcq-grade]')).toMatchObject({ correct: false })
  }, 180_000)
})

// ── Issue C ──────────────────────────────────────────────────────────────
const INNATE = { subjectSlug: 'biology', conceptId: 'bio.behav.innate-behavior-instinct', lessonTitle: 'Innate Behaviour and Instinct' }
/** BIO-024 as production shipped it. */
const BIO024 = [
  'Here is a classic example of a fixed action pattern in the male three-spined stickleback fish.',
  '1. Sign stimulus – the male spots the bright red belly of a receptive female (the trigger).',
  '2. The male performs a zig-zag courtship dance toward her and leads her to the nest he has built.',
  'Once the sequence starts, it tends to run to completion in the same stereotyped way, which is what makes it a fixed action pattern rather than a simple reflex like the knee-jerk.',
].join('\n')

describe('Issue C through the route', () => {
  it('BIO-024: the doubted, uncovered sentence is removed and the rest of the example reaches the learner', async () => {
    checker.grounded = JSON.stringify({ claims: [{ sentence: 2, verdict: 'unsupported', doubtful: true }, { sentence: 4, verdict: 'supported' }] })
    const [t] = await driveTurns(h, POST, [{ learnerSays: 'give me example', modelReplies: BIO024 }], INNATE)
    expect(checker.groundedCalls).toBe(1)
    expect(checker.groundedUser).toMatch(/SOURCES:/) // the KG line is always a source
    expect(text(t)).not.toMatch(/red belly of a receptive female/)
    expect(text(t)).toMatch(/zig-zag courtship dance/)
    expect(text(t)).toMatch(/simple reflex like the knee-jerk/)
    expect(readLog(t, '[grounded-prose-check]')).toMatchObject({ checked: true, applied: 'applied' })
  }, 120_000)

  it('checker failure (garbage answer) keeps the reply exactly', async () => {
    checker.grounded = 'Looks fine to me!'
    const [t] = await driveTurns(h, POST, [{ learnerSays: 'give me example', modelReplies: BIO024 }], INNATE)
    expect(text(t)).toMatch(/red belly of a receptive female/)
    expect(readLog(t, '[grounded-prose-check]')).toMatchObject({ checked: false, reason: 'unparseable' })
  }, 120_000)

  it('a model-proposed correction with no verbatim source quote is never shown to the learner', async () => {
    checker.grounded = JSON.stringify({ claims: [{ sentence: 2, verdict: 'contradicted', source_quote: 'the male stickleback reacts to a swollen silver belly', correction: '1. Sign stimulus – the male reacts to the swollen silver belly of a gravid female.' }] })
    const [t] = await driveTurns(h, POST, [{ learnerSays: 'give me example', modelReplies: BIO024 }], INNATE)
    expect(text(t)).not.toMatch(/swollen silver belly/)
    expect(readLog(t, '[grounded-prose-check]')).toMatchObject({ rejected: ['ungrounded-correction-2'] })
  }, 120_000)

  it('a short reply outside the scope is not sent to the checker', async () => {
    const [t] = await driveTurns(h, POST, [{ learnerSays: 'ok', modelReplies: 'A reflex is one quick, simple response.' }], INNATE)
    expect(checker.groundedCalls).toBe(0)
    expect(readLog(t, '[grounded-prose-check]')).toMatchObject({ checked: false })
  }, 120_000)
})
