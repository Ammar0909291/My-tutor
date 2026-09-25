/**
 * SYNTHETIC STUDENTS (roadmap items 0.7 / 0.8, owner decision 2026-09-24).
 *
 * Pins the parts of the runner that decide what a scorecard means: the launch
 * set, how each student answers, which tutor turns count as defects (with the
 * production text they were found in), and when a topic is called ready.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { PHYSICS_MECHANICS_LAUNCH_SET } from '../../scripts/qa/synthetic/launchSet'
import { PERSONAS, personaById, decideAct, initialPersonaState, leadingQuantity, type KeyedChoice } from '../../scripts/qa/synthetic/personas'
import { checkTurn, checkLesson, reachedMastery, STUCK_AFTER_TURNS, type TurnRecord, type TutorReply } from '../../scripts/qa/synthetic/checks'
import { buildScorecard, type RunFile, type LessonResult } from '../../scripts/qa/synthetic/scorecard'
import { keyFor } from '../../scripts/qa/synthetic/run'

const graph = JSON.parse(readFileSync(join(process.cwd(), 'docs/physics/kg/graph.json'), 'utf8'))
const nodes: Array<{ id: string; requires?: string[] }> = Array.isArray(graph) ? graph : (graph.concepts ?? graph.nodes ?? Object.values(graph)[0])
const byId = new Map(nodes.map((n) => [n.id, n]))

describe('the launch set', () => {
  it('26 physics mechanics topics, all in the live physics map', () => {
    expect(PHYSICS_MECHANICS_LAUNCH_SET).toHaveLength(26)
    for (const id of PHYSICS_MECHANICS_LAUNCH_SET) expect(byId.has(id), id).toBe(true)
  })
  it('in prerequisite order: every in-domain prerequisite comes earlier', () => {
    PHYSICS_MECHANICS_LAUNCH_SET.forEach((id, i) => {
      for (const r of byId.get(id)!.requires ?? []) {
        if (r.startsWith('phys.mech.')) expect(PHYSICS_MECHANICS_LAUNCH_SET.indexOf(r), `${id} needs ${r}`).toBeGreaterThanOrEqual(0)
        if (r.startsWith('phys.mech.')) expect(PHYSICS_MECHANICS_LAUNCH_SET.indexOf(r)).toBeLessThan(i)
      }
    })
  })
})

const Q = { question: 'Which quantity has both size and direction?', options: ['Distance', 'Displacement', 'Speed'] }
const KEY: KeyedChoice[] = [
  { text: 'Distance', isCorrect: false, misconceptionId: 'distance-is-displacement' },
  { text: 'Displacement', isCorrect: true },
  { text: 'Speed', isCorrect: false },
]

describe('the students answer by fixed rules, from the authored key', () => {
  it('beginner: first answer is the misconception option, second is right', () => {
    const p = personaById('beginner')
    let st = { ...initialPersonaState(), turn: 1 }
    const a1 = decideAct(p, st, Q, KEY); st = a1.next
    expect(a1.act).toMatchObject({ kind: 'answer', message: 'Distance', intendedCorrect: false, intent: 'misconception' })
    const a2 = decideAct(p, st, Q, KEY)
    expect(a2.act).toMatchObject({ kind: 'answer', message: 'Displacement', intendedCorrect: true })
  })
  it('careless: a plain wrong answer, not the misconception one', () => {
    const p = personaById('careless')
    const st = { ...initialPersonaState(), turn: 2, mcqAnswered: 1 }
    expect(decideAct(p, st, Q, KEY).act).toMatchObject({ message: 'Speed', intendedCorrect: false, intent: 'wrong' })
  })
  it('offtrack: interrupts a question once, then answers it', () => {
    const p = personaById('offtrack')
    const st = { ...initialPersonaState(), turn: 3 }
    const a = decideAct(p, st, Q, KEY)
    expect(a.act.kind).toBe('say')
    expect(decideAct(p, a.next, Q, KEY).act).toMatchObject({ kind: 'answer', intendedCorrect: true })
  })
  it('an unknown question is tapped as unkeyed, never guessed as right or wrong', () => {
    const a = decideAct(personaById('strong'), { ...initialPersonaState(), turn: 1 }, Q, null)
    expect(a.act).toMatchObject({ kind: 'answer', intent: 'unkeyed', intendedCorrect: null })
  })
  it('first turn with nothing on screen is the opener', () => {
    for (const p of PERSONAS) expect(decideAct(p, initialPersonaState(), null, null).act).toEqual({ kind: 'say', message: p.opener })
  })
  it('typed numbers: the leading quantity, digit groups folded', () => {
    expect(leadingQuantity('84 000 J')).toBe('84000 J')
    expect(leadingQuantity('3.0 mol')).toBe('3.0 mol')
    expect(leadingQuantity('Displacement')).toBeNull()
  })
})

const reply = (over: Partial<TutorReply> = {}): TutorReply => ({
  text: 'Displacement is the change in position.', provider: 'groq', mcq: null, figure: false,
  mastery: { phase: 'GUIDE', verifiedCheckCorrect: 0, verifiedPracticeCorrect: 0 }, lessonComplete: null, ...over,
})
const turn = (index: number, r: TutorReply, act: TurnRecord['act'] = { kind: 'say', message: 'ok' }, key: number | null = null): TurnRecord =>
  ({ index, act, reply: r, replyKeyCorrectIndex: key })
const answer = (message: string, intendedCorrect: boolean, question = 'q') =>
  ({ kind: 'answer' as const, message, typed: false, intent: intendedCorrect ? 'correct' as const : 'wrong' as const, intendedCorrect, question })

describe('defect checks, on production text', () => {
  it('false praise: "Correct — well done…" after a wrong answer (stoichiometry, 2026-09-24)', () => {
    const t = turn(2, reply({ text: "Correct — well done. I see you identified 'N₂' as the limiting reactant." }), answer('N₂ — there\'s less of it', false))
    expect(checkTurn(t, [turn(1, reply())]).map((f) => f.code)).toContain('false-praise')
  })
  it('false correction after a right answer', () => {
    const t = turn(2, reply({ text: 'Not quite — let us look again.' }), answer('Displacement', true))
    expect(checkTurn(t, [turn(1, reply())]).map((f) => f.code)).toContain('false-correction')
  })
  it('answer leak: the reply works out "3.0 mol of water" above that very question', () => {
    const mcq = { question: 'For 2H₂ + O₂ → 2H₂O, how many moles of water form from 3.0 mol of hydrogen with oxygen in excess?', options: ['3.0 mol', '1.5 mol', '6.0 mol', '2.0 mol'] }
    const t = turn(3, reply({ text: 'So, from 3.0 mol of hydrogen you can produce **3.0 mol of water**.', mcq }), undefined, 0)
    expect(checkTurn(t, [turn(1, reply())]).find((f) => f.code === 'answer-leak')?.severity).toBe('critical')
  })
  it('after-run 2: an answer that is the lesson\'s own concept name is teaching, not a leak', () => {
    const mcq = { question: 'Δx = x_f − x_i = −8 m. What type of quantity is this, and what does the negative sign mean?', options: ['Displacement — a vector; the negative sign means the net motion is leftward (negative direction)', 'Distance — negative just means it was measured backward'] }
    const t = turn(5, reply({ text: 'Where did you end up compared with your start is the displacement: nowhere, zero.', mcq }), undefined, 0)
    expect(checkTurn(t, [turn(1, reply())], { conceptTitle: 'Displacement and Distance' }).map((f) => f.code)).not.toContain('answer-leak')
    expect(checkTurn(t, [turn(1, reply())]).map((f) => f.code)).toContain('answer-leak') // without the concept, still flagged
  })
  it('a right answer at CHECK that moves no verified counter is flagged', () => {
    const prev = turn(1, reply({ mastery: { phase: 'CHECK', verifiedCheckCorrect: 0, verifiedPracticeCorrect: 0 } }))
    const t = turn(2, reply({ mastery: { phase: 'CHECK', verifiedCheckCorrect: 0, verifiedPracticeCorrect: 0 } }), answer('84000 J', true))
    expect(checkTurn(t, [prev]).map((f) => f.code)).toContain('correct-not-credited')
    const credited = turn(2, reply({ mastery: { phase: 'PRACTICE', verifiedCheckCorrect: 1, verifiedPracticeCorrect: 0 } }), answer('84000 J', true))
    expect(checkTurn(credited, [prev]).map((f) => f.code)).not.toContain('correct-not-credited')
  })
  it('an unauthored question at a counting phase is flagged; an authored one is not', () => {
    const prev = turn(1, reply({ mastery: { phase: 'PRACTICE' } }))
    expect(checkTurn(turn(2, reply({ mcq: Q }), undefined, null), [prev]).map((f) => f.code)).toContain('invented-question-at-gate')
    expect(checkTurn(turn(2, reply({ mcq: Q }), undefined, 1), [prev]).map((f) => f.code)).not.toContain('invented-question-at-gate')
  })
  it('one re-ask of a missed question is allowed; a third showing is a repeat', () => {
    const h = [turn(1, reply({ mcq: Q })), turn(2, reply(), answer('Distance', false, Q.question))]
    expect(checkTurn(turn(3, reply({ mcq: Q })), h).map((f) => f.code)).not.toContain('repeated-question')
    const h2 = [...h, turn(3, reply({ mcq: Q })), turn(4, reply(), answer('Speed', false, Q.question))]
    expect(checkTurn(turn(5, reply({ mcq: Q })), h2).map((f) => f.code)).toContain('repeated-question')
  })
  it('the content-free hold, markup and a phantom figure are caught', () => {
    const codes = checkTurn(turn(2, reply({ text: "Let's stay with this idea for a moment.\n\nIn the diagram above, the arrow shows <!--SIGNAL x-->" })), [turn(1, reply())]).map((f) => f.code)
    expect(codes).toEqual(expect.arrayContaining(['content-free-hold', 'machine-tag-leak', 'phantom-figure']))
  })
  it('a figure reference is fine once a figure has been shown', () => {
    const h = [turn(1, reply({ figure: true }))]
    expect(checkTurn(turn(2, reply({ text: 'In the diagram above, the arrow shows the push.' })), h).map((f) => f.code)).not.toContain('phantom-figure')
  })
  it('a completion claim without verified mastery is critical', () => {
    const t = turn(4, reply({ text: "You've completed this lesson! Next up is velocity.", mastery: { phase: 'PRACTICE', verified: false } }))
    expect(checkTurn(t, [turn(1, reply())]).map((f) => f.code)).toContain('false-completion-claim')
  })
  it('smoke run 2026-09-24: "give me a question" at CHECK answered by a demotion is critical', () => {
    const prev = turn(6, reply({ mastery: { phase: 'CHECK' } }))
    const t = turn(7, reply({ text: 'Consider this scenario: a car drives 60 km east, then 60 km west.', mastery: { phase: 'GUIDE' } }), { kind: 'say', message: 'can we move faster? give me a question' })
    const codes = checkTurn(t, [prev]).map((f) => f.code)
    expect(codes).toEqual(expect.arrayContaining(['demoted-without-wrong-answer', 'question-request-ignored']))
  })
  it('a step down after "I\'m lost" is the recovery design, not a finding', () => {
    const prev = turn(3, reply({ mastery: { phase: 'CHECK' } }))
    const t = turn(4, reply({ mastery: { phase: 'GUIDE' } }), { kind: 'say', message: "I'm lost, can you explain that differently?" })
    expect(checkTurn(t, [prev]).map((f) => f.code)).not.toContain('demoted-without-wrong-answer')
  })
  it('smoke run: an announced check with no question, and a content-free reply', () => {
    const codes = checkTurn(turn(11, reply({ text: 'Got it—let’s jump right in with a quick check.' })), [turn(10, reply())]).map((f) => f.code)
    expect(codes).toEqual(expect.arrayContaining(['announced-not-asked', 'content-free-reply']))
  })
  it('after-run 2: an offered check, or an announced one followed by a question, is not "announced-not-asked"', () => {
    const offer = 'That’s exactly right.\n\nWhenever you’re ready, just let me know and we can try a quick check to see how comfortable you feel with these ideas.'
    const asked = 'Displacement = final position − initial position.\n\n**Quick check:** If you walk 3 m east and then 4 m west, what do you notice about the total ground you covered?'
    for (const text of [offer, asked]) {
      expect(checkTurn(turn(8, reply({ text })), [turn(7, reply())]).map((f) => f.code)).not.toContain('announced-not-asked')
    }
  })
  it('smoke run: a bare "Here is your next question." after an answer', () => {
    const t = turn(3, reply({ text: 'Here is your next question.', mcq: Q }), answer('Displacement', true), 1)
    expect(checkTurn(t, [turn(2, reply())]).map((f) => f.code)).toContain('no-feedback-on-answer')
  })
  it('smoke run: "Let\'s pause … Worth another look later" for a learner who never answered wrong', () => {
    const h = [turn(3, reply(), answer('a', true)), turn(4, reply(), answer('b', true))]
    const t = turn(12, reply({ text: "Let's pause Displacement and Distance here for now. Worth another look later: Displacement and Distance.", lessonComplete: { complete: true }, mastery: { phase: 'DEMONSTRATE', verified: false } }))
    expect(checkTurn(t, h).find((f) => f.code === 'unfair-close')?.severity).toBe('critical')
    const withMiss = [...h, turn(5, reply(), answer('c', false))]
    expect(checkTurn(t, withMiss).map((f) => f.code)).not.toContain('unfair-close')
  })
  it('asking for a quiz in the very first message is not a finding (teach first is by design)', () => {
    const opened = { ...turn(0, reply()), act: { kind: 'open' as const } }
    const quizMe = { kind: 'say' as const, message: 'I already know the basics of this. can you quiz me?' }
    expect(checkTurn(turn(1, reply(), quizMe), [opened]).map((f) => f.code)).not.toContain('question-request-ignored')
    expect(checkTurn(turn(2, reply(), quizMe), [opened, turn(1, reply())]).map((f) => f.code)).toContain('question-request-ignored')
  })
  it('a clean teaching turn has no findings', () => {
    expect(checkTurn(turn(2, reply()), [turn(1, reply())])).toEqual([])
  })
  it(`stuck: ${STUCK_AFTER_TURNS} turns with no question, phase change or credit`, () => {
    const flat = Array.from({ length: STUCK_AFTER_TURNS + 1 }, (_, i) => turn(i, reply({ text: `different text ${i}` })))
    expect(checkLesson(flat).map((f) => f.code)).toEqual(['stuck'])
    expect(checkLesson(flat.slice(0, STUCK_AFTER_TURNS))).toEqual([])
  })
  it('mastery = verified, or 1 CHECK + 2 PRACTICE verified', () => {
    expect(reachedMastery({ verifiedCheckCorrect: 1, verifiedPracticeCorrect: 2 })).toBe(true)
    expect(reachedMastery({ verifiedCheckCorrect: 1, verifiedPracticeCorrect: 1 })).toBe(false)
  })
})

describe('the answer key comes from the authored corpus', () => {
  it('every launch topic has at least three single-answer questions the runner can mark', async () => {
    const { SEED_PROBES } = await import('@/lib/teaching/assets/brainSeedAssets')
    const { AUTHORED_PROBES } = await import('@/lib/teaching/assets/authoredSeedAssets')
    const { PHYSICS_BAND_GAP_PROBES } = await import('@/lib/teaching/assets/physicsBandGapAssets')
    const { PHYSICS_DEPTH_PROBES } = await import('@/lib/teaching/assets/physicsDepthSeedAssets')
    const all = [...SEED_PROBES, ...AUTHORED_PROBES, ...PHYSICS_BAND_GAP_PROBES, ...PHYSICS_DEPTH_PROBES]
    for (const id of PHYSICS_MECHANICS_LAUNCH_SET) {
      const keyed = all.filter((p) => p.conceptId === id && p.choices?.filter((c) => c.isCorrect).length === 1)
      expect(keyed.length, id).toBeGreaterThanOrEqual(3)
      const sample = keyed[0]
      expect(keyFor(sample.stem, sample.choices!.map((c) => c.text).reverse()), id).not.toBeNull()
    }
  })
  it('a model-written question with the same words but other options is not keyed', () => {
    expect(keyFor('Which quantity has both size and direction?', ['A', 'B'])).toBeNull()
  })
})

const lesson = (persona: string, topic: string, mastered: boolean, critical = 0): LessonResult => ({
  persona, topic, sessionId: 's', turns: [],
  findings: Array.from({ length: critical }, (_, i) => ({ code: 'false-praise', severity: 'critical' as const, turn: i, detail: 'x' })),
  summary: { turns: 10, mastered, turnsToMastery: mastered ? 8 : null, closed: false, stoppedBecause: '', finalPhase: null, verified: '' },
})
const run = (at: string, lessons: LessonResult[]): RunFile => ({
  version: 1, base: 'x', gitSha: null, startedAt: at, finishedAt: at, launchSet: ['phys.mech.velocity'],
  personas: ['beginner', 'strong'], maxTurns: 18, totalTurns: 20, lessons, accounts: [],
})

describe('readiness', () => {
  const good = (at: string) => run(at, [lesson('beginner', 'phys.mech.velocity', true), lesson('strong', 'phys.mech.velocity', true)])
  it('three clean runs where every persona masters -> ready', () => {
    const card = buildScorecard([good('1'), good('2'), good('3')])
    expect(card.topics[0].ready).toBe(true)
  })
  it('one run is never enough', () => {
    expect(buildScorecard([good('1')]).topics[0].notReady).toContain('1/3 runs')
  })
  it('one persona failing once, or one critical defect, blocks it', () => {
    const miss = run('3', [lesson('beginner', 'phys.mech.velocity', false), lesson('strong', 'phys.mech.velocity', true)])
    expect(buildScorecard([good('1'), good('2'), miss]).topics[0].ready).toBe(false)
    const crit = run('3', [lesson('beginner', 'phys.mech.velocity', true, 1), lesson('strong', 'phys.mech.velocity', true)])
    const card = buildScorecard([good('1'), good('2'), crit])
    expect(card.topics[0].ready).toBe(false)
    expect(card.critical).toHaveLength(1)
  })
})

describe('provider guard (2026-09-25: Groq spend limit, two runs served entirely by Gemini)', () => {
  const opts = { allowed: ['groq', 'memory'], maxOff: 2 }
  it('trips after two consecutive off-provider turns and stays tripped', async () => {
    const { providerGuard } = await import('../../scripts/qa/synthetic/run')
    const b = { used: 0, max: 100 } as { used: number; max: number; offProvider?: number; stopped?: string | null }
    expect(providerGuard(b, 'groq', opts)).toBeNull()
    expect(providerGuard(b, 'gemini', opts)).toBeNull()
    expect(providerGuard(b, 'gemini', opts)).toMatch(/provider fallback: 2 consecutive turns served by gemini/)
    expect(b.stopped).toMatch(/provider fallback/)
  })
  it('an allowed turn resets the count; a turn with no provider neither counts nor resets', async () => {
    const { providerGuard } = await import('../../scripts/qa/synthetic/run')
    const b = { used: 0, max: 100 } as { used: number; max: number; offProvider?: number; stopped?: string | null }
    providerGuard(b, 'gemini', opts)
    providerGuard(b, 'groq', opts)
    expect(providerGuard(b, 'gemini', opts)).toBeNull()
    expect(providerGuard(b, null, opts)).toBeNull()
    expect(providerGuard(b, 'openrouter', opts)).toMatch(/provider fallback/)
  })
  it('a lesson cut short by the guard is left out of the scorecard', () => {
    const lesson = (stoppedBecause: string, mastered: boolean) => ({
      persona: 'beginner', topic: 'phys.mech.force', sessionId: null, turns: [], findings: [],
      summary: { turns: 3, mastered, turnsToMastery: mastered ? 3 : null, closed: false, stoppedBecause, finalPhase: null, verified: '0/0' },
    })
    const run = (l: ReturnType<typeof lesson>, at: string) => ({
      version: 1 as const, base: 'x', gitSha: null, startedAt: at, finishedAt: at, launchSet: ['phys.mech.force'],
      personas: ['beginner'], maxTurns: 18, totalTurns: 3, lessons: [l], accounts: [],
    })
    const card = buildScorecard([run(lesson('mastered', true), 'a'), run(lesson('provider fallback: 2 consecutive turns served by gemini (allowed: groq)', false), 'b')], { requiredRuns: 1 })
    expect(card.topics[0].personas.beginner.attempts).toBe(1)
    expect(card.topics[0].personas.beginner.mastered).toBe(1)
  })
})

describe('ungradeable-question uses the production detector (2026-09-25)', () => {
  it('a readiness or confirmation check at CHECK is not flagged; a real question still is', () => {
    const at = (text: string) => checkTurn(turn(5, reply({ text, mastery: { phase: 'CHECK' } })), [turn(4, reply())]).map((f) => f.code)
    expect(at('Before we call this lesson finished, let\'s do 2 practice questions together — ready?')).not.toContain('ungradeable-question')
    expect(at('So the net force sets the acceleration — have I got that right?')).not.toContain('ungradeable-question')
    expect(at('A 2 kg cart feels a net force of 10 N. What is its acceleration?')).toContain('ungradeable-question')
  })
})

describe('unfair-close ignores lessons with unkeyed guesses (2026-09-25)', () => {
  it('a guess at a model-invented question may have been graded wrong, so no unfair-close', () => {
    const h = [turn(3, reply(), answer('a', true)), turn(4, reply(), { kind: 'answer', message: '40 N', typed: false, intent: 'unkeyed', intendedCorrect: null, question: 'q' } as never)]
    const t = turn(12, reply({ text: "Let's pause Friction Forces here for now. Worth another look later: Friction Forces.", lessonComplete: { complete: true }, mastery: { phase: 'GUIDE', verified: false } }))
    expect(checkTurn(t, h).map((f) => f.code)).not.toContain('unfair-close')
  })
})
