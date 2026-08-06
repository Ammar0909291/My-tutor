/**
 * Production migration — shadow mode, provider adapter, response parsing.
 *
 * Everything runs against the LIVE physics Knowledge Graph, so concept
 * resolution is exercised on real data rather than fixtures.
 */
import { describe, it, expect } from 'vitest'
import {
  captureShadow, compareToLegacy, summariseShadow, conceptIndexFor,
  MismatchKind, type LegacyDecision,
} from '@/lib/teaching/runtime/brainShadow'
import { toProviderRequest, renderSystemPrompt } from '@/lib/teaching/generation/providerAdapter'
import { parseTeachingGenerationResponse, ParseMode } from '@/lib/teaching/generation/responseParser'
import { validateTeachingGenerationResponse } from '@/lib/teaching/generation/teachingGenerationRequest'
import { resolveBrainMode, BrainMode } from '@/lib/teaching/runtime/brainRuntimeEntry'
import { validatePromptPackage } from '@/lib/teaching/generation/promptPackage'
import { ExecutionMode } from '@/lib/teaching/execution/executionPlan'

const CALORIMETRY = 'phys.therm.calorimetry'
const NEWTON_2 = 'phys.mech.newtons-second-law'

const shadowFor = (message: string, over: Partial<Parameters<typeof captureShadow>[0]> = {}) =>
  captureShadow({
    message, activeLessonConceptId: CALORIMETRY,
    subjectSlug: 'physics', language: 'en', ...over,
  })

describe('Phase 1 · shadow mode executes', () => {
  it('captures every artifact for a real turn', () => {
    const s = shadowFor("Explain Newton's Second Law with visualization.")!
    expect(s.concepts).toBeTruthy()
    expect(s.teachingPlan).toBeTruthy()
    expect(s.executionPlan).toBeTruthy()
    expect(s.generationRequest).toBeTruthy()
    expect(s.promptPackage).toBeTruthy()
    expect(s.providerRequest).toBeTruthy()
  })

  it('resolves the requested concept, not the lesson concept', () => {
    const s = shadowFor("Explain Newton's Second Law with visualization.")!
    expect(s.teachingPlan.targetConceptId).toBe(NEWTON_2)
    expect(s.executionPlan.executionMode).toBe(ExecutionMode.CONCEPT_EXCURSION)
  })

  it('never throws, whatever the input', () => {
    for (const message of ['', '   ', '???', 'a'.repeat(4000)]) {
      expect(() => shadowFor(message)).not.toThrow()
    }
  })

  it('memoises the concept index per subject', () => {
    expect(conceptIndexFor('physics')).toBe(conceptIndexFor('physics'))
    expect(conceptIndexFor('physics').length).toBeGreaterThan(200)
  })

  it('is deterministic across identical turns', () => {
    const a = shadowFor("Explain Newton's Second Law with visualization.")!
    const b = shadowFor("Explain Newton's Second Law with visualization.")!
    expect(a.promptPackage.packageId).toBe(b.promptPackage.packageId)
    expect(a.generationRequest).toEqual(b.generationRequest)
  })
})

describe('Phase 1 · production output unchanged', () => {
  it('the flag defaults to off, so the shadow block never runs', () => {
    expect(resolveBrainMode(undefined).mode).toBe(BrainMode.OFF)
    expect(resolveBrainMode('').mode).toBe(BrainMode.OFF)
  })

  it('active is still downgraded — this iteration must not activate the Brain', () => {
    const r = resolveBrainMode('active')
    expect(r.mode).not.toBe(BrainMode.ACTIVE)
    expect(r.downgradedFrom).toBe(BrainMode.ACTIVE)
  })

  it('capture produces no side effects a caller could observe', () => {
    const inputs = {
      message: "Explain Newton's Second Law", activeLessonConceptId: CALORIMETRY,
      subjectSlug: 'physics', language: 'en',
    }
    const before = JSON.stringify(inputs)
    captureShadow(inputs)
    expect(JSON.stringify(inputs)).toBe(before)
  })
})

describe('Phase 2 · PromptPackage reaches the provider adapter', () => {
  const s = shadowFor("Explain Newton's Second Law with visualization.")!

  it('produces a routeAI-shaped request', () => {
    const req = s.providerRequest
    expect(Array.isArray(req.messages)).toBe(true)
    expect(req.messages[req.messages.length - 1].role).toBe('user')
    expect(typeof req.systemPrompt).toBe('string')
    expect(req.systemPrompt.length).toBeGreaterThan(0)
    expect(req.language).toBe('en')
    expect(typeof req.maxTokens).toBe('number')
  })

  it('carries the package contents into the system prompt', () => {
    const prompt = renderSystemPrompt(s.promptPackage)
    expect(prompt).toContain('RULES')
    expect(prompt).toContain('RESPONSE FORMAT')
    for (const section of s.promptPackage.sections) {
      expect(prompt).toContain(section.heading)
    }
  })

  it('describes the schema without emitting a JSON example', () => {
    const prompt = renderSystemPrompt(s.promptPackage)
    expect(prompt).toContain('Return these fields:')
    expect(prompt).not.toMatch(/^\s*\{[\s\S]*"explanation"\s*:/m)
  })

  it('includes supplied history ahead of the current message', () => {
    const req = toProviderRequest(s.promptPackage, 'now what?', {
      history: [{ role: 'user', content: 'earlier' }, { role: 'assistant', content: 'reply' }],
    })
    expect(req.messages.map(m => m.content)).toEqual(['earlier', 'reply', 'now what?'])
  })

  it('the package it adapts is structurally valid', () => {
    expect(validatePromptPackage(s.promptPackage)).toEqual([])
  })
})

describe('Phase 3 · provider response parses correctly', () => {
  const quiz = shadowFor('quiz me on this')!
  const plain = shadowFor("Explain Newton's Second Law")!

  it('parses a structured JSON reply', () => {
    const parsed = parseTeachingGenerationResponse(quiz.generationRequest, JSON.stringify({
      requestId: quiz.generationRequest.requestId,
      explanation: 'Force equals mass times acceleration.',
      visualReference: false,
      returnedToLesson: true,
      assessment: { question: 'What happens if force doubles?', options: ['a', 'b'] },
    }))
    expect(parsed.mode).toBe(ParseMode.STRUCTURED)
    expect(parsed.response.content).toContain('Force equals mass')
    expect(parsed.response.assessment?.question).toContain('force doubles')
    expect(parsed.response.assessment?.options).toEqual(['a', 'b'])
  })

  it('parses JSON inside a fenced block', () => {
    const parsed = parseTeachingGenerationResponse(plain.generationRequest,
      '```json\n{"explanation":"Fenced content.","visualReference":false,"returnedToLesson":true}\n```')
    expect(parsed.mode).toBe(ParseMode.STRUCTURED)
    expect(parsed.response.content).toBe('Fenced content.')
  })

  it('falls back to prose without losing the turn', () => {
    const parsed = parseTeachingGenerationResponse(plain.generationRequest,
      'Newton said the net force equals mass times acceleration.')
    expect(parsed.mode).toBe(ParseMode.PROSE_FALLBACK)
    expect(parsed.response.content).toContain('Newton said')
    // Nothing is inferred: unasserted flags stay false.
    expect(parsed.response.visualReferenced).toBe(false)
  })

  it('never throws on malformed input', () => {
    for (const raw of ['', '{{{', '```json\nnot json\n```', 'null']) {
      expect(() => parseTeachingGenerationResponse(plain.generationRequest, raw)).not.toThrow()
    }
  })

  it('defaults requestId to the request it answers', () => {
    const parsed = parseTeachingGenerationResponse(plain.generationRequest, '{"explanation":"x"}')
    expect(parsed.response.requestId).toBe(plain.generationRequest.requestId)
  })
})

describe('Phase 3 · TeachingGenerationResponse validates', () => {
  const quiz = shadowFor('quiz me on this')!

  it('reports valid for a conforming reply', () => {
    const parsed = parseTeachingGenerationResponse(quiz.generationRequest, JSON.stringify({
      explanation: 'text', visualReference: false, returnedToLesson: true,
      assessment: { question: 'q?' },
    }))
    expect(parsed.problems).toEqual([])
    expect(parsed.valid).toBe(true)
  })

  it('reports the reasons a reply is invalid instead of throwing', () => {
    const parsed = parseTeachingGenerationResponse(quiz.generationRequest, 'just prose, no assessment')
    expect(parsed.valid).toBe(false)
    expect(parsed.problems.some(p => p.includes('assessment was required'))).toBe(true)
  })

  it('agrees with the standalone validator', () => {
    const parsed = parseTeachingGenerationResponse(quiz.generationRequest, 'prose')
    expect(validateTeachingGenerationResponse(quiz.generationRequest, parsed.response))
      .toEqual([...parsed.problems])
  })
})

describe('Phase 4 · Brain and legacy outputs can be compared', () => {
  it('flags concept divergence on an off-topic turn as EXPECTED', () => {
    const s = shadowFor("Explain Newton's Second Law with visualization.")!
    const legacy: LegacyDecision = { conceptId: CALORIMETRY, visualResolved: true, learnerRequest: null }
    const mismatches = compareToLegacy(legacy, s)
    const concept = mismatches.find(m => m.kind === MismatchKind.CONCEPT_SELECTION)!
    expect(concept.legacy).toBe(CALORIMETRY)
    expect(concept.brain).toBe(NEWTON_2)
    expect(concept.note).toContain('Expected divergence')
  })

  it('flags an on-topic concept divergence as UNEXPECTED', () => {
    const s = shadowFor('ok, got it')!
    const legacy: LegacyDecision = { conceptId: 'phys.other', visualResolved: false, learnerRequest: null }
    const concept = compareToLegacy(legacy, s).find(m => m.kind === MismatchKind.CONCEPT_SELECTION)!
    expect(concept.note).toContain('Unexpected divergence')
  })

  it('reports no concept mismatch when both agree', () => {
    const s = shadowFor('ok, got it')!
    const legacy: LegacyDecision = { conceptId: CALORIMETRY, visualResolved: false, learnerRequest: null }
    expect(compareToLegacy(legacy, s).some(m => m.kind === MismatchKind.CONCEPT_SELECTION)).toBe(false)
  })

  it('flags the legacy visual-from-lesson-context divergence', () => {
    const s = shadowFor('ok, got it')!
    const legacy: LegacyDecision = { conceptId: CALORIMETRY, visualResolved: true, learnerRequest: null }
    const visual = compareToLegacy(legacy, s).find(m => m.kind === MismatchKind.VISUALIZATION_REQUEST)!
    expect(visual.legacy).toBe('true')
    expect(visual.brain).toBe('false')
  })

  it('records the excursion the legacy path cannot represent', () => {
    const s = shadowFor("Explain Newton's Second Law")!
    const legacy: LegacyDecision = { conceptId: CALORIMETRY, visualResolved: false, learnerRequest: null }
    expect(compareToLegacy(legacy, s).some(m => m.kind === MismatchKind.LESSON_CONTINUATION)).toBe(true)
  })

  it('summarises decisions only — never learner text', () => {
    const s = shadowFor("Explain Newton's Second Law with visualization.")!
    const line = summariseShadow(s, compareToLegacy(
      { conceptId: CALORIMETRY, visualResolved: true, learnerRequest: null }, s))
    expect(line).toContain('[brain/shadow]')
    expect(line).toContain(NEWTON_2)
    expect(line).not.toContain("Explain Newton's Second Law with visualization.")
  })
})
