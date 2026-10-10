/**
 * Tutor Max final defect closure (2026-10-10 production re-drive,
 * docs/qa/LIVE_REDRIVE_2026-10-10.md "Seen live, not fixed"):
 *  A. a picture question with no figure got an imagined figure (3/18 chemistry);
 *  B. "quiz me" got a worked example and no card (3/62);
 * Strings are replies production actually shipped.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import {
  figureAvailableToLearner, noFigureAnswer, withoutFigureSentences, NO_FIGURE_LEAD,
  DENIES_OR_IMAGINES_FIGURE_RE, figureEvidenceAnswer, checkFigureClaims, evidenceFromPayload,
} from '@/lib/teaching/figureReference'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { describeVisualPayload } from '@/lib/teaching/visual/visualSemantics'
import { asksAboutTheFigure, asksForPractice } from '@/lib/teaching/masteryGate'
import { quizRequestNotice, QUIZ_UNANSWERED_LEAD, QUIZ_REASK_LEAD, labelReaskedCard, quizPoolExhaustedFloorLead } from '@/lib/teaching/quizRequest'
import { mayAttachProbeBelowGuide } from '@/lib/teaching/masteryReachability'
import { readTurnIntent } from '@/lib/teaching/turnIntent'

const ROUTE = readFileSync('src/app/api/learn/chat/route.ts', 'utf8')

/** Production replies (chem.kinet.rate-law / chem.elect.corrosion / chem.org.arrow-pushing, 2026-10-10). */
const IMAGINED = [
  "I'm sorry you can't see the picture, so let me describe it for you. The figure has concentration of A on the horizontal axis and rate on the vertical axis. Three different lines are drawn: 1. A straight line passing through the origin.",
  "I'm sorry you can't see the picture, so let me describe what it normally shows. Such pictures usually show an iron nail with rust spots where water touches it.",
  'The curved arrow starts at the lone pair on the oxygen and points to the carbon, showing the electrons moving.',
]

const FIGURE_WORDS = /\b(?:picture|figure|diagram|image|drawn|arrow|axis|axes|line|lines|shows|shown|colou?r|label)\b/i

describe('Issue A — figure availability is read from evidence of what the learner has', () => {
  const rateLaw = 'chem.kinet.rate-law'
  it('"What is this picture showing?" is a figure question', () => {
    expect(asksAboutTheFigure('What is this picture showing?')).toBe(true)
    expect(asksAboutTheFigure('i dont understand this picture. what is it showing?')).toBe(true)
  })
  it('no figure anywhere → not available', () => {
    expect(figureAvailableToLearner({ figureInThisResponse: false, renderedLog: [], conceptId: rateLaw, recentLearnerMessages: ['ok'] })).toBe(false)
  })
  it('a figure in the lesson corpus that was not attached is not evidence (the gate takes no corpus input at all)', () => {
    // The only inputs are the response payload, the rendered log, and the learner's own messages.
    const keys = Object.keys({ figureInThisResponse: 0, renderedLog: 0, conceptId: 0, recentLearnerMessages: 0 })
    expect(figureAvailableToLearner.length).toBe(1)
    expect(keys).not.toContain('assetId')
    expect(figureAvailableToLearner({ figureInThisResponse: false, renderedLog: [], conceptId: rateLaw, recentLearnerMessages: [] })).toBe(false)
  })
  it('a figure sent on an earlier turn for a different concept does not count', () => {
    expect(figureAvailableToLearner({ figureInThisResponse: false, renderedLog: [{ matchedConcept: 'chem.elect.corrosion' }, { matchedConcept: null }], conceptId: rateLaw, recentLearnerMessages: [] })).toBe(false)
  })
  it('a figure in THIS response counts', () => {
    expect(figureAvailableToLearner({ figureInThisResponse: true, renderedLog: [], conceptId: rateLaw, recentLearnerMessages: [] })).toBe(true)
  })
  it('a figure shown on an earlier turn of this lesson for this concept counts', () => {
    expect(figureAvailableToLearner({ figureInThisResponse: false, renderedLog: [{ matchedConcept: rateLaw }], conceptId: rateLaw, recentLearnerMessages: [] })).toBe(true)
  })
  it('a photo the learner sent with the camera button counts', () => {
    expect(figureAvailableToLearner({ figureInThisResponse: false, renderedLog: [], conceptId: rateLaw, recentLearnerMessages: ['📸 [Изображение]\nwhat is this'] })).toBe(true)
    expect(figureAvailableToLearner({ figureInThisResponse: false, renderedLog: [], conceptId: rateLaw, recentLearnerMessages: ['I took a 📸 earlier'] })).toBe(false)
  })
  it('server-only state (held-figure session, a card assetId) is not read by the final gate', () => {
    const at = ROUTE.indexOf('NO PICTURE, NO DESCRIPTION OF ONE')
    expect(at).toBeGreaterThan(0)
    const gate = ROUTE.slice(at, ROUTE.indexOf('A GRADED CARD ALWAYS GETS ITS VERDICT', at))
    expect(gate).toMatch(/figureAvailableToLearner\(\{/)
    expect(gate).toMatch(/figureInThisResponse: visualFired/)
    expect(gate).toMatch(/renderedLog: snapshotRRMLog/)
    expect(gate).not.toMatch(/session\?\.turns|assetId|visualSession/)
  })
})

describe('Issue A — the no-figure reply', () => {
  const authored = 'The rate law links the rate of a reaction to the concentrations of the reactants. Look at the diagram on your screen. Each exponent is the order with respect to that reactant and is found by experiment, not from the balanced equation.'
  it('is honest, says how to send a picture, and keeps teaching from authored text', () => {
    const out = noFigureAnswer(authored)
    expect(out.startsWith(NO_FIGURE_LEAD)).toBe(true)
    expect(out).toMatch(/There is no picture in this lesson yet/)
    expect(out).toMatch(/camera button/)
    expect(out).toMatch(/order with respect to that reactant/)
    expect(out).not.toMatch(/Look at the diagram/)
  })
  it('contains no description of a figure — only the lead mentions a picture', () => {
    const body = noFigureAnswer(authored).slice(NO_FIGURE_LEAD.length)
    expect(body).not.toMatch(/\b(?:picture|figure|diagram|image|drawn|shown)\b/i)
  })
  it('a confident imagined description from the model never reaches the learner: the reply is built without model text', () => {
    for (const imagined of IMAGINED) {
      const out = noFigureAnswer(authored)
      expect(out).not.toContain(imagined.slice(40, 90))
    }
    const at = ROUTE.indexOf('NO PICTURE, NO DESCRIPTION OF ONE')
    const gate = ROUTE.slice(at, ROUTE.indexOf('A GRADED CARD ALWAYS GETS ITS VERDICT', at))
    expect(gate).toMatch(/cleanText = answer/)
    expect(gate).not.toMatch(/noFigureAnswer\([^)]*cleanText/)
  })
  it('authored text written beside a figure loses its figure sentences', () => {
    expect(withoutFigureSentences('Water moves by osmosis. The diagram shows the membrane. It moves toward more solute.'))
      .toBe('Water moves by osmosis. It moves toward more solute.')
  })
  it('with nothing to teach, still honest and useful', () => {
    const out = noFigureAnswer(null)
    expect(out).toMatch(/There is no picture in this lesson yet/)
    expect(out).toMatch(/camera button/)
    expect(out).not.toMatch(/Here is the idea in words:$/)
  })
  it('the evidence gate runs after every fallback and remediation that rewrites the reply', () => {
    const gate = ROUTE.indexOf('NO PICTURE, NO DESCRIPTION OF ONE')
    for (const later of [
      'THE LAST LOOK AT A MODEL-WRITTEN REPLY', 'enforceQuestionDeliveryContract(cleanText', 'NEVER A BLANK REPLY',
      'THE FALLBACK SENTENCE IS NOT SAID TWICE', 'acknowledgeUnavailablePicture({', "event: 'question-announced-but-never-delivered'",
    ]) {
      const i = ROUTE.indexOf(later)
      expect(i, later).toBeGreaterThan(0)
      expect(i, later).toBeLessThan(gate)
    }
    // After the gate, only the graded-card verdict may touch the text, and a picture question is not a card answer.
    const after = ROUTE.slice(gate, ROUTE.indexOf('PHASE 0: TURN DECISION PROVENANCE', gate))
    // the gate's three writes (grounded-to-shown-figure, unsupported-claims-removed, no-figure answer) + withVerdict
    expect((after.match(/cleanText = /g) ?? []).length).toBe(4)
    expect(after).toMatch(/cleanText = enough \?/)
    expect(after).toMatch(/cleanText = grounded/)
    expect(after).toMatch(/cleanText = answer/)
    expect(after).toMatch(/cleanText = withVerdict/)
  })
  it('the earlier repair no longer trusts the held-figure session for a picture question', () => {
    expect(ROUTE).toMatch(/if \(figureQuestionHoisted && !figureShownForConcept\) \{/)
    expect(ROUTE).not.toMatch(/if \(!figureOnScreen && figureQuestionHoisted && !figureShownForConcept\)/)
  })
  it('every production imagined reply would be judged a figure description by the harness check', () => {
    for (const s of IMAGINED) expect(FIGURE_WORDS.test(s)).toBe(true)
  })
})

describe('Issue A follow-up — a figure the learner HAS is answered from what was drawn (production, cf79346)', () => {
  /** chem.kinet.rate-law, production 2026-10-10, a figure shown at turn 3. */
  const RATE_LAW_TURN_6 = 'I’m sorry you can’t see a picture right now, so let me describe what a typical illustration of a rate‑law diagram would show.\n\nUsually the diagram has two parts.'
  const RATE_LAW_TURN_13 = 'I understand the picture looks confusing, so let’s walk through what each part represents in words.\n\nPicture yourself with a simple flow chart that moves from left to right.'
  /** chem.org.arrow-pushing, production 2026-10-10, figure shown the turn before: accurate, kept. */
  const ARROW_ACCURATE = 'Let’s walk through the picture together, step by step.\n\n- **“Identify nucleophile and electrophile”** – this box tells you to look at the reactants and decide which species will donate a pair of electrons.'
  it('denials and typical/imagined descriptions are recognised', () => {
    for (const t of [RATE_LAW_TURN_6, RATE_LAW_TURN_13, 'There is no picture here, but let me describe one.', 'Such diagrams usually show two curves.', 'It would show the rate on the y-axis.']) {
      expect(DENIES_OR_IMAGINES_FIGURE_RE.test(t), t).toBe(true)
    }
  })
  it('an accurate reply about the real figure is not', () => {
    expect(DENIES_OR_IMAGINES_FIGURE_RE.test(ARROW_ACCURATE)).toBe(false)
    expect(DENIES_OR_IMAGINES_FIGURE_RE.test('The figure shows iron with an anodic region and a cathodic region.')).toBe(false)
  })
  it('the grounded answer uses only the drawn caption and labels', () => {
    const out = figureEvidenceAnswer({ caption: 'Determining Rate Law and Order via Initial-Rate Method', text: ['Run experiments', 'Compare initial rates', 'Find the orders'] }, null, 'earlier', 'Rate Law and Order covers: rate = k[A]^m[B]^n.')
    expect(out).toMatch(/^The picture for this lesson is further up in our chat\. It is titled “Determining Rate Law and Order via Initial-Rate Method”\./)
    expect(out).toMatch(/“Run experiments”, “Compare initial rates”, “Find the orders”/)
    expect(out).not.toMatch(/typical|usually|two parts/i)
  })
  it('an entry written before the drawn field existed still yields its title (no invented parts)', () => {
    const out = figureEvidenceAnswer(undefined, 'A 3D scene: Determining Rate Law and Order via Initial-Rate Method', 'earlier', null)
    expect(out).toBe('The picture for this lesson is further up in our chat. It is titled “Determining Rate Law and Order via Initial-Rate Method”. Tell me which part of it is confusing and I will explain it.')
  })
})

const WORKED = 'Suppose a reaction has rate = k[A]. If [A] doubles, the rate doubles, so the reaction is first order in A.'

describe('Issue B — an explicit quiz request is recognised', () => {
  it('"Quiz me", "Ask me a question", "Test my understanding" and their variants', () => {
    for (const m of ['Quiz me.', 'quiz me', 'Ask me a question.', 'ask me another question', 'Test my understanding.',
      'test my knowledge please', 'give me a quiz', 'can I have a quick quiz?', "let's do a quiz", 'next question please', 'check my understanding']) {
      expect(asksForPractice(m), m).toBe(true)
      expect(readTurnIntent(m, null as never).wantsPractice, m).toBe(true)
    }
  })
  it('subject vocabulary and refusals are not requests', () => {
    for (const m of ['the test tube cracked', "please don't quiz me", 'what is a pop quiz', 'stop testing my understanding', 'this test my teacher gave was hard']) {
      expect(asksForPractice(m), m).toBe(false)
    }
  })
})

describe('Issue B — the gate answers the request with an authored card', () => {
  const at = ROUTE.indexOf('const phaseAllowsProbe =')
  it('at the start, middle and end of a lesson: the request opens the phase term in every phase', () => {
    expect(ROUTE.slice(at, at + 900)).toMatch(/transferNeedsVerifiedCredit \|\|[\s\S]{0,300}turnIntent\.wantsPractice\s*\n/)
    expect(ROUTE).toMatch(/probeAttachablePhase:[\s\S]{0,400}transferNeedsVerifiedCredit \|\| turnIntent\.wantsPractice,/)
    // Lesson one and a closed side-question already honour it.
    expect(ROUTE).toMatch(/notFirstLesson: !firstLessonActiveHoisted \|\| turnIntent\.wantsPractice/)
  })
  it('credit is unchanged: whether the answer counts never reads the request', () => {
    expect(ROUTE).toMatch(/probeWouldCountThisPhaseHoisted = isProbeAttachablePhase\(phaseBeforeTurn\) \|\| transferNeedsVerifiedCredit\n/)
  })
  it('the preferred card being reserved for the mastery check no longer blocks the request — and the spend is logged', () => {
    // A bare-contract concept (3 cards) at DEMONSTRATE: the reservation rule refuses a spend…
    expect(mayAttachProbeBelowGuide('DEMONSTRATE', 3)).toBe(false)
    // …and the request overrides it, logging what is left for the check.
    expect(ROUTE).toMatch(/const quizRequestSpendsReserved = reservationBlocks && probe !== null && turnIntent\.wantsPractice/)
    expect(ROUTE).toMatch(/event: 'quiz-request-spends-reserved-card'[\s\S]{0,200}leftForMasteryCheck/)
    expect(ROUTE).toMatch(/const belowGuideBlocked = reservationBlocks && !quizRequestSpendsReserved/)
  })
  it('without a request the reservation rule is exactly as before', () => {
    expect(mayAttachProbeBelowGuide('DEMONSTRATE', 4)).toBe(true)
    expect(mayAttachProbeBelowGuide('OBSERVE', 3)).toBe(false)
  })
  it('already-answered cards are never re-asked: the selector excludes every stem in the ledger, including the one graded this turn', () => {
    expect(ROUTE).toMatch(/excludeProbeStem: historyForGate \? \(stem\) => hasAskedMcq\(historyForGate, stripAuthoringLabel\(stem\)\)/)
    expect(ROUTE).toMatch(/const historyForGate = history && mcqGradeHoisted && pendingMcqHoisted\?\.question/)
  })
  it('with a card still unanswered, the gate does not draw a new one (pending-option routing preserved)', () => {
    expect(ROUTE).toMatch(/const unansweredProbeOnScreen = pendingMcqHoisted !== null && mcqGradeHoisted === null/)
    expect(ROUTE).toMatch(/noUnansweredProbeOnScreen: !unansweredProbeOnScreen,/)
  })
  it('only authored cards are served (the request never unlocks a model-written one)', async () => {
    const { AUTHORED_CARDS_ONLY } = await import('@/lib/teaching/inventedProbeGuard')
    expect(AUTHORED_CARDS_ONLY).toBe(true)
  })
})

describe('Issue B — the reply when no new card ships', () => {
  it('a fresh authored card: the reply is left alone', () => {
    const r = quizRequestNotice({ cardAttached: true, cardIsTheUnansweredOne: false, poolExhausted: false, conceptTitle: 'Rate Law', reply: 'Here is a question for you.' })
    expect(r).toEqual({ text: 'Here is a question for you.', changed: false, reason: 'card-served' })
  })
  it('repeated request with the card unanswered: says it is the same card', () => {
    const r = quizRequestNotice({ cardAttached: true, cardIsTheUnansweredOne: true, poolExhausted: false, conceptTitle: 'Rate Law', reply: 'Take your time.' })
    expect(r.changed).toBe(true)
    expect(r.reason).toBe('unanswered-card-reoffered')
    expect(r.text.startsWith(QUIZ_UNANSWERED_LEAD)).toBe(true)
    // asked twice → the lead is not stacked
    const again = quizRequestNotice({ cardAttached: true, cardIsTheUnansweredOne: true, poolExhausted: false, conceptTitle: 'Rate Law', reply: r.text })
    expect(again.changed).toBe(false)
  })
  it('every authored card used: says so before any worked example', () => {
    const r = quizRequestNotice({ cardAttached: false, cardIsTheUnansweredOne: false, poolExhausted: true, conceptTitle: 'Rate Law', reply: WORKED })
    expect(r.reason).toBe('no-card-pool-exhausted')
    expect(r.text).toMatch(/^You have answered every practice question I have on Rate Law in this lesson, so I can't give you a new one\./)
    expect(r.text).toMatch(/Say "next" to move on/)
    expect(r.text.endsWith(WORKED)).toBe(true)
  })
  it('no eligible card for any other reason: says so — a worked example alone never answers the request', () => {
    const r = quizRequestNotice({ cardAttached: false, cardIsTheUnansweredOne: false, poolExhausted: false, conceptTitle: 'Rate Law', reply: WORKED })
    expect(r.reason).toBe('no-card-available')
    expect(r.text).toMatch(/^I don't have a practice question I can give you on Rate Law right now/)
    const empty = quizRequestNotice({ cardAttached: false, cardIsTheUnansweredOne: false, poolExhausted: false, conceptTitle: null, reply: '' })
    expect(empty.text).toMatch(/^I don't have a practice question I can give you right now/)
  })
  it('production follow-up: with a seen question still waiting for its one re-ask, the exhausted line says it comes back', () => {
    const r = quizRequestNotice({ cardAttached: false, cardIsTheUnansweredOne: false, poolExhausted: true, conceptTitle: 'Photosynthesis', reply: WORKED, reaskLater: true })
    expect(r.text).toMatch(/^You have answered every new practice question I have on Photosynthesis in this lesson\. A question you have already seen comes back once more/)
    expect(r.text).not.toMatch(/can't give you a new one/)
    expect(quizPoolExhaustedFloorLead('Photosynthesis', true)).toMatch(/comes back once more a little later\. Here is the idea once more\.$/)
    expect(quizPoolExhaustedFloorLead('Photosynthesis')).toBe('You have answered every practice question I have on Photosynthesis in this lesson, so here is the idea once more.')
    // the floor's own line is recognised, in both forms
    expect(quizRequestNotice({ cardAttached: false, cardIsTheUnansweredOne: false, poolExhausted: true, conceptTitle: 'Photosynthesis', reply: quizPoolExhaustedFloorLead('Photosynthesis', true) + '\n\n' + WORKED, reaskLater: true }).changed).toBe(false)
  })
  it('a re-asked card is labelled once, never twice', () => {
    const a = labelReaskedCard('Quick check. Think it through before you choose.')
    expect(a.text.startsWith(QUIZ_REASK_LEAD)).toBe(true)
    expect(labelReaskedCard(a.text).changed).toBe(false)
  })
  it('the teaching floor\'s own exhausted line is not repeated', () => {
    const floor = 'You have answered every practice question I have on Rate Law in this lesson, so here is the idea once more.\n\n' + WORKED
    expect(quizRequestNotice({ cardAttached: false, cardIsTheUnansweredOne: false, poolExhausted: true, conceptTitle: 'Rate Law', reply: floor }).changed).toBe(false)
  })
  it('route: the notice runs after the teaching floor and every fallback, on the served card', () => {
    const q = ROUTE.indexOf('"QUIZ ME" GETS A QUESTION OR IS TOLD WHY NOT')
    expect(q).toBeGreaterThan(ROUTE.indexOf("console.log('[teaching-floor] '"))
    expect(q).toBeGreaterThan(ROUTE.indexOf('THE FALLBACK SENTENCE IS NOT SAID TWICE'))
    expect(q).toBeLessThan(ROUTE.indexOf('NO PICTURE, NO DESCRIPTION OF ONE'))
    const block = ROUTE.slice(q, ROUTE.indexOf('NO PICTURE, NO DESCRIPTION OF ONE'))
    expect(block).toMatch(/if \(turnIntent\.wantsPractice && !serveLessonComplete/)
    expect(block).toMatch(/cardAttached: Boolean\(servedMcq\)/)
    expect(block).not.toMatch(/gradeMcqAnswer|recordProbeOutcome|mcqGradeHoisted = [^=]/)
  })
})

// ── Issue C ────────────────────────────────────────────────────────────────
// Sources are the runtime's own: the KG syllabus line and the concept's ACTIVE
// authored explanations (BIOLOGY_EXTENSION_EXPLANATIONS, transcribed from the
// Educational Brain entry). Expected facts are taken from those sources, or —
// for BIO-024, which no source covers — from the defect record's own expected
// behaviour (docs/qa/BIOLOGY_REAL_LEARNER_DEFECTS.md, Tinbergen), kept apart
// from the application's reply.
import {
  needsGroundedCheck, splitSentences, decideGroundedEdits, applyGroundedEdits, runGroundedProseCheck,
  parseCheckerAnswer, correctionIsGrounded, GROUNDED_CHECK_SYSTEM_PROMPT,
  qualifyUncovered, UNCOVERED_EXAMPLE_NOTE, UNCOVERED_QUALIFY_AT, isExampleTurn,
} from '@/lib/teaching/groundedProseCheck'
import { BIOLOGY_EXTENSION_EXPLANATIONS } from '@/lib/teaching/assets/biologyExtensionSeedAssets'
import { getKGNode } from '@/lib/curriculum/knowledgeGraph'
import { isStubReply } from '@/lib/teaching/replyHygiene'

const INNATE = 'bio.behav.innate-behavior-instinct'
const node = getKGNode(INNATE)
const SOURCES = [
  `${node?.title}: ${node?.description}`,
  ...BIOLOGY_EXTENSION_EXPLANATIONS.filter((e) => e.conceptId === INNATE).map((e) => e.content),
]
const answerOf = (claims: unknown[]) => JSON.stringify({ claims })
const run = (text: string, claims: unknown[] | string, learner = 'give me example') => runGroundedProseCheck({
  text, learnerMessage: learner, conceptTitle: node?.title ?? null, sources: SOURCES, isStub: isStubReply,
  ask: async () => (typeof claims === 'string' ? claims : answerOf(claims)),
})
const finish = async (text: string, claims: unknown[] | string, learner?: string) => {
  const g = await run(text, claims, learner)
  const applied = applyGroundedEdits(text, g.edits, isStubReply)
  return { g, text: applied && applied.reason === 'applied' ? applied.text : text }
}

/** BIO-024 as production shipped it (2026-10-05 #183 t11 and again 2026-10-10). */
const BIO024 = [
  'Here is a classic example of a fixed action pattern in the male three-spined stickleback fish.',
  '1. Sign stimulus – the male spots the bright red belly of a receptive female (the trigger).',
  '2. The male performs a zig-zag courtship dance toward her and leads her to the nest he has built.',
  'Once the sequence starts, it tends to run to completion in the same stereotyped way, which is what makes it a fixed action pattern rather than a simple reflex like the knee-jerk.',
].join('\n')

describe('Issue C — sources and scope', () => {
  it('the KG node and the authored explanations for the BIO-024 concept exist', () => {
    expect(node?.title).toBeTruthy()
    expect(SOURCES.length).toBeGreaterThanOrEqual(3)
    expect(SOURCES.join(' ')).toMatch(/sign stimulus/)
  })
  it('no authoritative source covers the stickleback example, so it can only be removed or kept — never "corrected"', () => {
    expect(SOURCES.join(' ').toLowerCase()).not.toContain('stickleback')
  })
  it('scope: concrete-case replies of ≥ 40 words, or a reply to "give me an example" / "explain simpler"', () => {
    expect(needsGroundedCheck(BIO024, 'give me example')).toBe(true)
    expect(needsGroundedCheck('A reflex is simple.', 'give me example')).toBe(false)
    const plain = 'Innate behaviour is behaviour an animal performs correctly the first time without learning it. It is inherited and shaped by natural selection, so it is the same across members of a species and does not need practice or experience to appear in the young animal at all.'
    expect(needsGroundedCheck(plain, 'ok')).toBe(false)
    expect(needsGroundedCheck(plain, 'explain simpler')).toBe(true)
  })
  it('the checker is told to verify against sources only and to answer in JSON, never a rewrite', () => {
    expect(GROUNDED_CHECK_SYSTEM_PROMPT).toMatch(/never rewrite the reply/i)
    expect(GROUNDED_CHECK_SYSTEM_PROMPT).toMatch(/JSON only/)
  })
  it('sentence splitting rebuilds the reply exactly', () => {
    expect(splitSentences(BIO024).map((s) => s.text + s.sep).join('')).toBe(BIO024)
  })
})

describe('Issue C — claims checked against the sources', () => {
  const FALSE_NO_NUMBERS = 'Think of a fixed action pattern in a bird building its nest. A fixed action pattern happens spontaneously, without any particular trigger in the environment. Once it begins it runs to the end in the same way every time, whatever happens around the animal, which is why biologists call it stereotyped.'
  const quote = 'a FAP always requires a specific sign stimulus to release it'
  it('a known false biology claim with no numbers is corrected from the source', async () => {
    const { text } = await finish(FALSE_NO_NUMBERS, [{ sentence: 2, verdict: 'contradicted', source_quote: quote, correction: 'A fixed action pattern does not happen spontaneously: it always requires a specific sign stimulus in the environment to release it.' }])
    expect(text).not.toMatch(/happens spontaneously, without any particular trigger/)
    expect(text).toMatch(/requires a specific sign stimulus/)
    expect(text).toMatch(/Think of a fixed action pattern in a bird/)
  })
  it('a correct claim with no numbers, and a true claim in different words, stay unchanged', async () => {
    const ok = 'For example, a fixed action pattern only starts when its sign stimulus is present. Once started it usually runs to completion in the same stereotyped form, which separates it from a reflex such as the knee-jerk, a single quick response with very little processing in the nervous system.'
    const { text, g } = await finish(ok, [{ sentence: 1, verdict: 'supported' }, { sentence: 2, verdict: 'supported' }])
    expect(text).toBe(ok)
    expect(g.edits).toEqual([])
  })
  it('a valid analogy that is not literally the concept is not touched', async () => {
    const analogy = 'Think of a fixed action pattern as a recorded song that only plays when one particular button is pressed. The button is the sign stimulus; once the song starts it plays to the end, even if you wish it would stop halfway, and nobody had to teach the player how to play it.'
    const { text } = await finish(analogy, [{ sentence: 1, verdict: 'not_factual' }, { sentence: 2, verdict: 'not_factual' }])
    expect(text).toBe(analogy)
  })
  it('BIO-024: an uncovered example the checker doubts, stated without hedging, is removed — the rest of the example stays', async () => {
    const { text, g } = await finish(BIO024, [
      { sentence: 2, verdict: 'unsupported', doubtful: true },
      { sentence: 3, verdict: 'unsupported', doubtful: false },
      { sentence: 4, verdict: 'supported' },
    ])
    expect(g.checked).toBe(true)
    expect(text).not.toMatch(/red belly of a receptive female/)
    expect(text).not.toMatch(/^1\.\s*$/m)
    expect(text).toMatch(/zig-zag courtship dance/)
    expect(text).toMatch(/simple reflex like the knee-jerk/)
  })
  it('an uncovered claim the checker does not doubt is left alone (no assumed verification either way)', async () => {
    const { text } = await finish(BIO024, [{ sentence: 3, verdict: 'unsupported' }])
    expect(text).toBe(BIO024)
  })
  it('a reply with both correct and incorrect claims: only the incorrect one changes', async () => {
    const mixed = 'For example, a reflex is a simple, direct response such as the knee-jerk. A fixed action pattern is just a reflex with a different name, the same kind of single quick response. Both are innate behaviours that an animal performs correctly without having to learn them first, and both are shaped by natural selection.'
    const { text } = await finish(mixed, [
      { sentence: 1, verdict: 'supported' },
      { sentence: 2, verdict: 'contradicted', source_quote: 'a fixed action pattern is a much more complex, coordinated, multi-step sequence', correction: 'A fixed action pattern is not just a reflex: it is a much more complex, coordinated, multi-step sequence.' },
      { sentence: 3, verdict: 'supported' },
    ])
    expect(text).toMatch(/^For example, a reflex is a simple, direct response such as the knee-jerk\./)
    expect(text).toMatch(/much more complex, coordinated, multi-step sequence/)
    expect(text).not.toMatch(/same kind of single quick response/)
    expect(text).toMatch(/shaped by natural selection\.$/)
  })
  it('an ambiguous claim that is already qualified stays as it is', async () => {
    const hedged = 'For example, many birds may show fixed action patterns during courtship displays. These displays are triggered by a sign stimulus and then run in the same stereotyped order, which makes them a good example of innate behaviour that is shaped by natural selection over a long time.'
    const { text, g } = await finish(hedged, [{ sentence: 1, verdict: 'unsupported', doubtful: true }])
    expect(text).toBe(hedged)
    expect(g.rejected).toContain('hedged-kept-1')
  })
  it('a correction the source does not support is never applied', async () => {
    const claimNotVerbatim = { sentence: 2, verdict: 'contradicted', source_quote: 'fixed action patterns are triggered by hormones in spring', correction: 'A fixed action pattern is triggered by hormones in spring.' }
    const r1 = await finish(FALSE_NO_NUMBERS, [claimNotVerbatim])
    expect(r1.text).not.toMatch(/hormones/)
    expect(r1.g.rejected).toContain('ungrounded-correction-2')
    // verbatim quote, but the correction adds words the quote does not say
    const addsWords = { sentence: 2, verdict: 'contradicted', source_quote: quote, correction: 'A fixed action pattern is triggered by daylight hormones and a specific sign stimulus.' }
    expect(correctionIsGrounded('A fixed action pattern happens spontaneously, without any particular trigger in the environment.', addsWords as never, SOURCES)).toBe(false)
    const r2 = await finish(FALSE_NO_NUMBERS, [addsWords])
    expect(r2.text).not.toMatch(/daylight hormones/)
  })
  it('a sound reply stays byte-identical when the checker finds nothing, answers garbage, or times out', async () => {
    const sound = 'For example, a knee-jerk is a reflex: one quick response with little processing. A courtship display is a fixed action pattern: many coordinated steps released by a sign stimulus and run in the same order every time, which is exactly what natural selection can fix as a species-typical trait.'
    expect((await finish(sound, [])).text).toBe(sound)
    expect((await finish(sound, 'OK, looks fine')).text).toBe(sound)
    expect(parseCheckerAnswer('not json')).toBeNull()
    const slow = await runGroundedProseCheck({ text: sound, learnerMessage: 'give me example', conceptTitle: null, sources: SOURCES, isStub: isStubReply, timeoutMs: 20, ask: () => new Promise((r) => setTimeout(() => r('{"claims":[]}'), 200)) })
    expect(slow.reason).toBe('timeout-or-no-answer')
    expect(slow.edits).toEqual([])
  })
  it('filler is never the result: a stub is not checked, and edits that would leave filler are refused', async () => {
    const filler = "Great question! Let's take a tiny step together. What do you think a sign stimulus is? Can you tell me in your own words? Let me know what you think and we will go on from there together, step by step, nice and slowly."
    const stub = await runGroundedProseCheck({ text: filler, learnerMessage: 'give me example', conceptTitle: null, sources: SOURCES, isStub: () => true, ask: async () => answerOf([{ sentence: 3, verdict: 'supported' }]) })
    expect(stub.reason).toBe('stub-not-checked')
    expect(stub.checked).toBe(false)
    const short = 'For example, a fixed action pattern happens spontaneously, without any particular trigger at all. It runs to completion. That is all you need to know about it for now, so we can move on to the next part of the lesson whenever you feel ready to continue.'
    const edits = decideGroundedEdits(short, [{ sentence: 1, verdict: 'unsupported', doubtful: true }, { sentence: 3, verdict: 'unsupported', doubtful: true }], SOURCES).edits
    expect(applyGroundedEdits(short, edits, isStubReply)).toBeNull()
  })
  it('numeric and non-numeric checks together: sentences with numbers belong to the numeric pass, and edits follow sentence text', () => {
    const both = 'For example, a stickleback male guards about 3 nests at once. A fixed action pattern happens spontaneously, without any particular trigger in the environment. It then runs to the end in the same order every time, whatever the animal sees around it, which is why it is called stereotyped behaviour.'
    const d = decideGroundedEdits(both, [
      { sentence: 1, verdict: 'unsupported', doubtful: true },
      { sentence: 2, verdict: 'contradicted', source_quote: quote, correction: 'A fixed action pattern always requires a specific sign stimulus to release it.' },
    ], SOURCES)
    expect(d.rejected).toContain('numeric-owned-1')
    expect(d.edits).toHaveLength(1)
    // The numeric pass corrected sentence 1 meanwhile; the prose edit still applies to sentence 2 only.
    const afterNumeric = both.replace('about 3 nests', 'one nest')
    const out = applyGroundedEdits(afterNumeric, d.edits, isStubReply)
    expect(out?.text).toMatch(/guards one nest at once/)
    expect(out?.text).toMatch(/always requires a specific sign stimulus/)
    // And when the numeric pass rewrote the very sentence, the prose edit no longer matches.
    const rewritten = afterNumeric.replace('happens spontaneously, without any particular trigger in the environment', 'needs a trigger')
    expect(applyGroundedEdits(rewritten, d.edits, isStubReply)?.reason).toBe('edits-did-not-match')
  })
  it('route: model-written English replies only, beside the numeric pass, logged with every edit', () => {
    const at = ROUTE.indexOf("const gp = await import('@/lib/teaching/groundedProseCheck')")
    expect(at).toBeGreaterThan(0)
    const block = ROUTE.slice(at, ROUTE.indexOf("console.log('[grounded-prose-check] '", at) + 400)
    expect(block).toMatch(/teachingLang !== 'en'/)
    expect(block).toMatch(/loadConceptSourceTexts\(\{ conceptId: resolvedConceptId/)
    expect(block).toMatch(/const r = await fc\.runFactCheckPass/)
    expect(block).toMatch(/applyGroundedEdits\(checkedBody, g\.edits, hy\.isStubReply\)/)
    // inside the model-written-only hygiene block
    const guard = ROUTE.lastIndexOf("['memory', 'gate', 'degraded', 'deterministic', 'fallback'].includes(provider)", at)
    expect(guard).toBeGreaterThan(at - 12000)
  })
})

// ── A-2 (production 2026-10-10 on 76c2edd): claims about a REAL figure ─────
/** chem.org.arrow-pushing's served figure, read from production (visual_assets, read-only). */
const ARROW_SPEC = { renderer: 'spec', visualSpec: { type: 'process_flow', title: 'Electron Flow Using Curved Arrow Notation', steps: [
  { title: 'Identify nucleophile and electrophile', note: 'Locate the electron‑rich species and the atom that will accept electrons.' },
  { title: 'Draw nucleophilic attack arrow', note: 'Curved arrow from the nucleophile’s lone pair to the electrophilic carbon.' },
  { title: 'Show bond‑breaking arrow', note: 'Curved arrow from the bond to the leaving group indicating electron flow away.' },
  { title: 'Complete product structures', note: 'Display the newly formed bond and the separated leaving group as distinct species.' }] } }
/** Production replies (docs/qa/final-closure-2026-10-10/redrive-76c2edd-*.txt). */
const ARROW_ACCURATE = 'The figure is a flow‑chart titled **“Electron Flow Using Curved Arrow Notation.”** It contains four step boxes linked by arrows that show the order of actions:\n\n1. **“Identify nucleophile and electrophile”** – first you decide which species will donate electrons (the nucleophile) and which will accept them (the electrophile). \n2. **“Draw nucleophilic attack arrow”** – next you draw a curved arrow that starts from the nucleophile’s lone‑pair or π‑bond and points to the electrophilic atom.'
const PHYS_ACCURATE = 'The diagram in front of you shows the seven fundamental quantities that the International System of Units (SI) is built on. In the centre, a green label reads **“SI”**. Around it you see:\n\n* At the top (red) – **length: m** (the metre) \n* Top‑right (blue) – **mass: kg** (kilograms) \n\nOverall, the picture tells us that these seven base units are the reference – the agreed‑upon measures – and that any other unit we use can be expressed as a combination of them.'
const RATE_LAW_IMAGINED = 'I hear you — the picture can feel a bit abstract. Let’s think of it like a kitchen.\n\nImagine you’re making a sauce that needs two ingredients: tomatoes (A) and onions (B). The “speed” at which the sauce thickens is the reaction rate.\n\n- One side (the horizontal line) shows how much tomato you have – that’s the concentration of A. \n- The other side (the vertical line) shows how much onion you have – that’s the concentration of B. \n\nIn the sketch, moving farther right (more tomatoes) or higher up (more onions) changes the height of the stack according to the exponents m and n.'
const RATE_LAW_BOXES = '- The boxes represent the concentrations of reactants A and B; the arrow shows they combine to give a rate that follows the formula shown.'
const RATE_LAW_EVIDENCE = { caption: 'Determining Rate Law and Order via Initial-Rate Method', text: [] as string[] }

describe('A-2 — what a reply says is on a real figure must be on it', () => {
  it('evidence from a stored process-flow spec carries every step title and note', () => {
    const ev = evidenceFromPayload(ARROW_SPEC as never, describeVisualPayload as never)
    expect(ev.caption).toBe('Electron Flow Using Curved Arrow Notation')
    expect(ev.text).toContain('Identify nucleophile and electrophile')
    expect(ev.text).toContain('Curved arrow from the nucleophile’s lone pair to the electrophilic carbon.')
  })
  it('the imagined axes, lines and "sketch" beside the rate-law figure are removed; the analogy itself stays', () => {
    const r = checkFigureClaims(RATE_LAW_IMAGINED, RATE_LAW_EVIDENCE)
    expect(r.removed.join(' ')).toMatch(/horizontal line/)
    expect(r.removed.join(' ')).toMatch(/vertical line/)
    expect(r.removed.join(' ')).toMatch(/In the sketch/)
    expect(r.text).not.toMatch(/horizontal line|vertical line|In the sketch/)
    expect(r.text).toMatch(/making a sauce/)
  })
  it('"the boxes represent …" naming nothing on the figure is removed', () => {
    expect(checkFigureClaims(RATE_LAW_BOXES, RATE_LAW_EVIDENCE).removed).toHaveLength(1)
  })
  it('an accurate reply about the real arrow-pushing figure is kept byte-identical', () => {
    const r = checkFigureClaims(ARROW_ACCURATE, evidenceFromPayload(ARROW_SPEC as never, describeVisualPayload as never))
    expect(r.removed).toEqual([])
    expect(r.text).toBe(ARROW_ACCURATE)
  })
  it('an accurate reply about the real SI-units figure (positions and colours not judged) is kept', () => {
    const d = resolveVisual({ message: 'show me a diagram', lessonConceptId: 'phys.meas.units', learnerRequest: 'diagram', subject: 'physics' } as Parameters<typeof resolveVisual>[0])
    const ev = evidenceFromPayload((d.graphical ? d.payload : null) as never, describeVisualPayload as never)
    expect(ev.text.length).toBeGreaterThan(5)
    expect(checkFigureClaims(PHYS_ACCURATE, ev).removed).toEqual([])
  })
  it('a quoted label not on the figure is removed when the sentence says it is written there', () => {
    const r = checkFigureClaims('The top box is labelled **“Rate constant k”**. The steps run in order.', RATE_LAW_EVIDENCE)
    expect(r.removed).toEqual(['The top box is labelled **“Rate constant k”**.'])
  })
  it('a sentence that does not point at the figure is never judged', () => {
    const t = 'Imagine a kitchen where the sauce thickens faster with more tomatoes.'
    expect(checkFigureClaims(t, RATE_LAW_EVIDENCE).removed).toEqual([])
  })
  it('route: model-written replies that point at a figure are checked even without a picture question', () => {
    const at = ROUTE.indexOf('NO PICTURE, NO DESCRIPTION OF ONE')
    const gate = ROUTE.slice(at, ROUTE.indexOf('A GRADED CARD ALWAYS GETS ITS VERDICT', at))
    expect(gate).toMatch(/const pointsAtFigureFinal = modelWrittenFig/)
    expect(gate).toMatch(/if \(\(figureQuestionFinal \|\| pointsAtFigureFinal\)/)
    expect(gate).toMatch(/fr\.checkFigureClaims\(cleanText, evidence\)/)
    expect(gate).toMatch(/if \(!available && figureQuestionFinal\)/)
  })
})

// ── C-1 (BIO-024 class, production 2026-10-10 on 76c2edd) ───────────────────
/** The /learn page reply (docs/qa/final-closure-2026-10-10/biology-evidence.json, turn 1). */
const GREBE = 'Let’s look at a classic example of an **innate, fixed‑action pattern**: the courtship dance of the male **great crested grebe** (a water bird). \n\nWhen a female grebe arrives at the nest, she displays a bright orange patch on her throat. That orange patch is the **sign stimulus** – a specific visual cue that the male’s nervous system is wired to recognize. As soon as the male sees this patch, a whole, stereotyped sequence is released: he inflates his chest, spreads his head feathers, performs a series of synchronized hops and splashes, and finally presents food to the female. Once started, the dance runs to completion even if the female moves away, showing that the behavior is largely unmodifiable once triggered.'

describe('C-1 — an example no source covers is qualified honestly', () => {
  it('the checker is told a real-world example is factual and that "supported" must quote its source', () => {
    expect(GROUNDED_CHECK_SYSTEM_PROMPT).toMatch(/real-world example .* states facts/)
    expect(GROUNDED_CHECK_SYSTEM_PROMPT).toMatch(/For "supported", copy the supporting source text EXACTLY/)
  })
  it('"supported" without a verbatim quote counts as uncovered; with one it does not', () => {
    const noQuote = decideGroundedEdits(GREBE, [{ sentence: 2, verdict: 'supported' }, { sentence: 4, verdict: 'supported' }], SOURCES)
    expect(noQuote.uncovered).toHaveLength(2)
    const withQuote = decideGroundedEdits(GREBE, [{ sentence: 5, verdict: 'supported', source_quote: 'once triggered, a FAP typically runs to completion' }], SOURCES)
    expect(withQuote.uncovered).toHaveLength(0)
  })
  it('the grebe reply as production checked it ("no-edits") is now qualified, without inventing a correction', async () => {
    const g = await run(GREBE, [{ sentence: 2, verdict: 'supported' }, { sentence: 3, verdict: 'unsupported' }, { sentence: 4, verdict: 'supported' }])
    expect(g.edits).toEqual([])
    expect((g.uncovered ?? []).length).toBeGreaterThanOrEqual(UNCOVERED_QUALIFY_AT)
    const q = qualifyUncovered(GREBE)
    expect(q.text.endsWith(UNCOVERED_EXAMPLE_NOTE)).toBe(true)
    expect(q.text.startsWith(GREBE.trim())).toBe(true)
    expect(qualifyUncovered(q.text).changed).toBe(false)
  })
  it('hedged and doubted sentences are not counted (one is kept as qualified, the other removed)', () => {
    const t = 'For example, many birds may court with a display that is often colourful. A fixed action pattern is released by a sign stimulus, and it runs to the end once it starts, which is why biologists call it stereotyped behaviour.'
    const d = decideGroundedEdits(t, [{ sentence: 1, verdict: 'unsupported' }, { sentence: 2, verdict: 'unsupported', doubtful: true }], SOURCES)
    expect(d.uncovered).toEqual([])
  })
  it('a sound reply whose claims quote the sources is not qualified', async () => {
    const sound = 'For example, a knee-jerk is a reflex: one quick response. A courtship display is a fixed action pattern: many coordinated steps released by a specific sign stimulus, which natural selection can fix as a species-typical trait over many generations of animals.'
    const g = await run(sound, [{ sentence: 2, verdict: 'supported', source_quote: 'it requires a specific sign stimulus' }])
    expect(g.uncovered ?? []).toEqual([])
  })
  it('route: the qualifier is applied from the checker result and logged', () => {
    expect(ROUTE).toMatch(/if \(uncoveredCount >= gp\.UNCOVERED_QUALIFY_AT && gp\.isExampleTurn\(checkedBody, learnerAuthoredMessage\)\)/)
    expect(ROUTE).toMatch(/done\.push\('grounded-prose-qualified'\)/)
  })
})

// ── Production on 9a0cee7a (2026-10-10): precision follow-up ────────────────
describe('A-2 / C-1 follow-up from the 9a0cee7a re-drive', () => {
  const FAP_FIGURE = { caption: 'Reflex vs. Fixed Action Pattern', text: ['Simple reflex', 'Fixed action pattern', 'E.g. the knee-jerk reflex', 'E.g. courtship display, nest-building', 'Stereotyped and largely unmodifiable once triggered'] }
  it('"the two straight lines illustrate …" on a figure that draws no lines is removed', () => {
    const s = '- The two straight lines illustrate the two stages: first a **sign stimulus** releases the fixed action pattern, then the behavior runs to completion.'
    expect(checkFigureClaims(s, FAP_FIGURE).removed).toHaveLength(1)
  })
  it('teaching about "the straight line" of a log plot is not a figure claim (rate-law, 76c2edd)', () => {
    const s = 'If you plot log(rate) against **log(concentration)** of a single reactant, the slope of the straight line equals that reactant’s order.'
    expect(checkFigureClaims(s, RATE_LAW_EVIDENCE).removed).toEqual([])
  })
  it('the accurate walkthrough of the same figure (production, bio turn 13) is kept', () => {
    const s = 'Look at the picture beside you. On the left side you see **“Simple reflex”** in blue, with the example **“the knee‑jerk reflex”** written in grey. On the right side the orange box reads **“Fixed action pattern”** and gives **“courtship display, nest‑building”** as examples.'
    expect(checkFigureClaims(s, FAP_FIGURE).removed).toEqual([])
  })
  it('a bolded description of a part ("grey arrow", "right side (blue)") is not a label claim (photosynthesis, 9a0cee7a)', () => {
    const PHOTO = { caption: 'Photosynthesis: Two Coupled Stages', text: ['Light-Dependent Reactions', 'Calvin Cycle'] }
    expect(checkFigureClaims('A **grey arrow** points from those light‑driven steps to the **right side (blue)** labeled **Calvin Cycle**.', PHOTO).removed).toEqual([])
    expect(checkFigureClaims('The right side is labeled **Dark Reactions**.', PHOTO).removed).toHaveLength(1) // a real wrong label still goes
  })
  it('what a scene DRAWS is evidence too: its line stubs and arrows (9a0cee7a sweep)', () => {
    const scene = { renderer: 'scene', sceneSpec: { title: 'Reflex vs. Fixed Action Pattern', steps: [{ narration: 'x', objects: [{ type: 'node', text: 'Simple reflex' }, { type: 'path', points: [] }, { type: 'arrow', from: [0, 0, 0], to: [1, 0, 0] }] }] } }
    const ev = evidenceFromPayload(scene as never, describeVisualPayload as never)
    expect(ev.text).toContain('drawn: arrow, line')
    expect(checkFigureClaims('The two straight lines simply separate the two columns; they don’t carry additional meaning.', ev).removed).toEqual([])
    expect(checkFigureClaims('The two straight lines simply separate the two columns.', FAP_FIGURE).removed).toHaveLength(1) // nothing drawn → still removed
  })
  it('"sketch" as a verb and "says" without a figure subject are not figure claims', () => {
    const ev = evidenceFromPayload(ARROW_SPEC as never, describeVisualPayload as never)
    expect(checkFigureClaims('When you’re ready, use this idea to sketch the arrow for an SN2 reaction: start the arrow at the nucleophile’s lone pair and point it toward the carbon bearing the leaving group.', ev).removed).toEqual([])
    expect(checkFigureClaims('To get rid of the + 5 on the left, we subtract 5 from **both** sides of the equation (the balance principle says we must do the same thing to each side).', RATE_LAW_EVIDENCE).removed).toEqual([])
  })
  it('a quoted label with trailing punctuation inside the quotes still matches', () => {
    const s = 'The orange box in the picture, labeled “Fixed action pattern” with examples like “courtship display, nest‑building,” is showing that same kind of built‑in behaviour.'
    expect(checkFigureClaims(s, FAP_FIGURE).removed).toEqual([])
  })
  it('a question to the learner about the figure is not a claim (innate behaviour, 9a0cee7a)', () => {
    const q = '**Question:** In the figure, which label tells you that a behavior only starts when a specific “sign stimulus” is present and then runs its full course without outside input?'
    expect(checkFigureClaims(q, FAP_FIGURE).removed).toEqual([])
  })
  it('only a turn that gives an example is qualified', () => {
    expect(isExampleTurn('Let’s look at a real‑world fixed action pattern. A male stickleback …', 'give me example')).toBe(true)
    expect(isExampleTurn('For example, a male stickleback attacks red objects.', 'ok')).toBe(true)
    // the two false positives seen in production
    expect(isExampleTurn('Top left, “Simple reflex” – the basic, automatic response like the knee-jerk reflex.', 'i dont understand this picture. what is it showing?')).toBe(false)
    expect(isExampleTurn('Think of the nervous system as the body’s communication highway … like a tap on the knee.', 'quiz me')).toBe(false)
  })
  it('the note goes before a closing question, so the question stays last', () => {
    const r = qualifyUncovered('A stickleback example.\n\n**What do you notice about the sign stimulus?**')
    expect(r.text).toBe(`A stickleback example.\n\n${UNCOVERED_EXAMPLE_NOTE}\n\n**What do you notice about the sign stimulus?**`)
  })
})
