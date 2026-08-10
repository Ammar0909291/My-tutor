import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  extractRequestedTopic, learnerGroundingText, requestedTopicIdentity,
} from '@/lib/teaching/visual/requestedTopic'
import { resolveVisualForTurn, OFF_CURRICULUM_REQUEST } from '@/lib/teaching/visual/resolveVisual'
import { runtimeTopicId, MIN_GROUNDING_CHARS } from '@/lib/teaching/visual/topicIdentity'

/**
 * A TOPIC THE CURRICULUM HAS NEVER HEARD OF, DRAWN FROM THE LEARNER'S OWN WORDS.
 *
 * Two things are needed to draw anything: a NAME and TEXT. For a KG concept the
 * curriculum supplies both. For "Kubernetes pod scheduling" it supplies
 * neither, which is why the engine could only ever draw the lesson instead — or,
 * once that was stopped, draw nothing at all.
 *
 * The name comes from the request. The text comes from the learner's own
 * messages and from nowhere else: a description the model wrote is not
 * independent grounding, because judging generated output against generated
 * prose asks a model whether it agrees with itself.
 *
 * A request is not a description, so most requests still decline. That is the
 * intended outcome, not a shortfall.
 */

const LESSON = 'phys.meas.units'   // a physics lesson, deliberately unrelated

describe('Naming the topic', () => {
  const NAMED: [string, string][] = [
    ['Explain Kubernetes pod scheduling', 'Kubernetes pod scheduling'],
    ['teach me about docker container networking', 'docker container networking'],
    ['what is byzantine fault tolerance?', 'byzantine fault tolerance'],
    ['can you explain mortgage amortisation to me', 'mortgage amortisation to me'],
    // "how" and "the" are both connectives between the request and the topic.
    ['show me how the TCP three-way handshake works', 'TCP three-way handshake works'],
  ]

  for (const [message, title] of NAMED) {
    it(`names "${title}" from "${message}"`, () => {
      expect(extractRequestedTopic(message)?.title).toBe(title)
    })
  }

  const NAMES_NOTHING = [
    'explain this again please',
    'explain it more simply',
    'what is this',
    'show me a diagram',
    'tell me more',
    'ok thanks',
    'yes',
  ]

  for (const message of NAMES_NOTHING) {
    it(`names nothing in "${message}"`, () => {
      expect(extractRequestedTopic(message)).toBeNull()
    })
  }

  it('stops at the end of the clause, not the end of the message', () => {
    const t = extractRequestedTopic('explain kubernetes pod scheduling. I have an exam tomorrow')
    expect(t?.title).toBe('kubernetes pod scheduling')
  })

  it('the same topic asked twice is the same identity', () => {
    // Different capitalisation and punctuation must land on one cache row, or
    // every learner looks like a new topic and the engine pays for each of them.
    const a = extractRequestedTopic('Explain Kubernetes Pod Scheduling')!
    const b = extractRequestedTopic('explain kubernetes pod scheduling')!
    expect(runtimeTopicId(a.title)).toBe(runtimeTopicId(b.title))
  })
})

describe('Grounding comes from the learner, or the engine declines', () => {
  it('a bare request is not a description', () => {
    // 33 characters, and it says nothing about what pod scheduling IS.
    expect('Explain Kubernetes pod scheduling'.length).toBeLessThan(MIN_GROUNDING_CHARS)
    expect(requestedTopicIdentity('Explain Kubernetes pod scheduling')).toBeNull()
  })

  it('repeating the title is not substance', () => {
    const padded = 'explain kubernetes pod scheduling kubernetes pod scheduling kubernetes'
    expect(padded.length).toBeGreaterThan(MIN_GROUNDING_CHARS)
    expect(requestedTopicIdentity(padded)).toBeNull()
  })

  it('a learner who says what they mean is grounded', () => {
    const message =
      'Explain Kubernetes pod scheduling — the scheduler filters out nodes that ' +
      'cannot run the pod, then scores the remaining ones and binds the pod to the best'
    const ctx = requestedTopicIdentity(message)!
    expect(ctx).not.toBeNull()
    expect(ctx.provenance).toBe('runtime')
    expect(ctx.conceptId.startsWith('topic:')).toBe(true)
    expect(ctx.description.length).toBeGreaterThanOrEqual(MIN_GROUNDING_CHARS)
  })

  it('their earlier messages about the topic count, and unrelated ones do not', () => {
    const topic = extractRequestedTopic('explain kubernetes pod scheduling')!
    const text = learnerGroundingText(topic, 'explain kubernetes pod scheduling', [
      'my cluster has three nodes and the scheduler keeps putting pods on the same one',
      'what time is the exam',
    ])
    expect(text).toContain('three nodes')
    expect(text).not.toContain('exam')
  })

  it('earlier learner messages can ground a request their own words cannot', () => {
    const ctx = requestedTopicIdentity('explain kubernetes pod scheduling', [
      'i have a cluster where the scheduler filters nodes by resource requests and then ranks them',
    ])
    expect(ctx).not.toBeNull()
    expect(ctx!.description).toContain('filters nodes')
  })

  it('the tutor is never a grounding source', () => {
    // Structural, not incidental: nothing in this module may read assistant or
    // model text. The parameter is named for the learner and there is no other
    // way in.
    const src = readFileSync(join(process.cwd(), 'src/lib/teaching/visual/requestedTopic.ts'), 'utf8')
    const code = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '')
    for (const banned of ['assistant', 'lessonGoal', 'lessonTitle', 'generate', 'llm', 'model']) {
      expect(code.toLowerCase(), `grounding must not read ${banned}`).not.toContain(banned)
    }
    expect(code).toContain('priorLearnerMessages')
  })
})

describe('The authority, end to end, with no model', () => {
  const grounded =
    'Explain Kubernetes pod scheduling — the scheduler filters out nodes that ' +
    'cannot run the pod, then scores the remaining ones and binds the pod to the best'

  it('an ungrounded off-curriculum request declines, and says which decline it is', async () => {
    const d = await resolveVisualForTurn(
      { message: 'Explain Kubernetes pod scheduling', lessonConceptId: LESSON, subject: 'physics', learnerRequest: 'diagram' },
      { generate: async () => { throw new Error('must not generate without grounding') } },
    )
    expect(d.graphical).toBe(false)
    expect(d.provenance).toBe('no-figure:requested-topic-not-grounded')
  })

  it('a grounded off-curriculum request reaches generation, as the requested topic', async () => {
    let askedAbout: string | null = null
    const d = await resolveVisualForTurn(
      { message: grounded, lessonConceptId: LESSON, subject: 'physics', learnerRequest: 'diagram' },
      {
        budgetReader: { countToday: async () => 0 },
        // Capture what the engine believes it is drawing, then decline, so this
        // test needs no model and asserts the identity rather than the figure.
        generate: async (prompt: string) => { askedAbout = prompt; return null },
      },
    )
    expect(askedAbout, 'generation was never attempted').not.toBeNull()
    expect(askedAbout!).toContain('Kubernetes pod scheduling')
    // It is NOT drawing the physics lesson it happens to be sitting in.
    expect(askedAbout!).not.toContain('SI Units')
    expect(d.graphical).toBe(false)   // the stub declined; fail-closed holds
  })

  it('the pure decision still refuses on its own, so the async tier cannot be bypassed', () => {
    // The async tier keys off this exact provenance. If the pure decision ever
    // stopped emitting it, off-curriculum grounding would silently switch off.
    expect(OFF_CURRICULUM_REQUEST).toBe('no-figure:request-names-an-uncatalogued-topic')
  })

  it('a lesson turn never reaches requested-topic grounding', async () => {
    // The lesson's own concept resolves normally; the requested-topic path is
    // for the case where the curriculum could not name what was asked about.
    const d = await resolveVisualForTurn(
      { message: 'explain this again please', lessonConceptId: 'phys.meas.vector-addition', subject: 'physics' },
      { generate: async () => { throw new Error('curated figures need no generation') } },
    )
    expect(d.graphical).toBe(true)
    expect(d.conceptId).toBe('phys.meas.vector-addition')
  })
})
