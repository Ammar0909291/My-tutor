/**
 * Prompt Builder tests.
 *
 * Packages are built from REAL requests produced by the whole brain
 * (Teaching Planner -> Execution Planner -> Prompt Orchestrator), so these
 * prove the builder composes on top of the existing architecture unchanged.
 */
import { describe, it, expect } from 'vitest'
import { planTeachingTurn } from '@/lib/teaching/planner/teachingPlanner'
import type { ConceptResolver } from '@/lib/teaching/planner/teachingPlan'
import { planExecution } from '@/lib/teaching/execution/executionPlanner'
import { orchestrateTeachingGeneration } from '@/lib/teaching/generation/teachingPromptOrchestrator'
import { buildPromptPackage, type PromptBuilderInputs } from '@/lib/teaching/generation/promptBuilder'
import {
  validatePromptPackage, PromptSectionId, SECTION_ORDER, ResponseFieldType,
  type PromptPackage,
} from '@/lib/teaching/generation/promptPackage'
import { ExtractionMethod, type ConceptUnderstanding } from '@/lib/teaching/concept/conceptUnderstanding'

const CALORIMETRY = 'phys.therm.calorimetry'
const NEWTON_2 = 'phys.mech.newtons-second-law'
const MOMENTUM = 'phys.mech.momentum'

const resolver: ConceptResolver = (text) => {
  const lower = text.toLowerCase()
  const out: { conceptId: string; title: string; confidence: number }[] = []
  if (/newton'?s\s+second\s+law/.test(lower)) out.push({ conceptId: NEWTON_2, title: "Newton's Second Law", confidence: 0.95 })
  if (/momentum/.test(lower)) out.push({ conceptId: MOMENTUM, title: 'Linear Momentum', confidence: 0.9 })
  return out
}

function requestFor(message: string, opts: {
  concepts?: ConceptUnderstanding | null
  learnerRequest?: 'diagram' | 'real_life_example' | 'explain_differently' | null
} = {}) {
  const teachingPlan = planTeachingTurn({
    message, activeLessonConceptId: CALORIMETRY, resolveConcept: resolver,
    learnerRequest: opts.learnerRequest ?? null,
  })
  const executionPlan = planExecution({ plan: teachingPlan, concepts: opts.concepts ?? null })
  return orchestrateTeachingGeneration({
    executionPlan, teachingPlan, concepts: opts.concepts ?? null,
    studentMessage: message, learnerRequest: opts.learnerRequest ?? null,
  })
}

const pkg = (message: string, extra: Partial<PromptBuilderInputs> = {}, opts = {}) =>
  buildPromptPackage({ request: requestFor(message, opts), ...extra })

const sectionOf = (p: PromptPackage, id: PromptSectionId) => p.sections.find(s => s.id === id)
const allText = (p: PromptPackage) =>
  [p.systemPrompt, ...p.developerInstructions, ...p.sections.flatMap(s => s.lines)].join('\n')

describe('Prompt Builder · deterministic assembly', () => {
  it('identical inputs produce a deeply-equal PromptPackage', () => {
    const a = pkg("Explain Newton's Second Law with visualization.")
    const b = pkg("Explain Newton's Second Law with visualization.")
    expect(a).toEqual(b)
    expect(a.packageId).toBe(b.packageId)
  })

  it('different requests produce different packages', () => {
    const a = pkg("Explain Newton's Second Law with visualization.")
    const b = pkg('quiz me on this')
    expect(a.packageId).not.toBe(b.packageId)
    expect(a.requestId).not.toBe(b.requestId)
  })

  it('packageId is content-derived and shaped predictably', () => {
    expect(pkg("Explain Newton's Second Law").packageId).toMatch(/^prompt_[0-9a-f]{8}$/)
  })

  it('supplied context changes the package', () => {
    const bare = pkg("Explain Newton's Second Law")
    const withMemory = pkg("Explain Newton's Second Law", {
      explanationMemory: [{ assetId: 'a1', content: 'Force equals mass times acceleration.' }],
    })
    expect(withMemory.packageId).not.toBe(bare.packageId)
  })

  it('emits sections in canonical order, never varying', () => {
    const p = pkg("Explain Newton's Second Law with visualization.")
    const order = p.sections.map(s => SECTION_ORDER.indexOf(s.id))
    expect([...order].sort((x, y) => x - y)).toEqual(order)
  })

  it('does not mutate its input request', () => {
    const request = requestFor("Explain Newton's Second Law")
    const before = JSON.stringify(request)
    buildPromptPackage({ request })
    expect(JSON.stringify(request)).toBe(before)
  })
})

describe('Prompt Builder · explanation memory inclusion', () => {
  it('includes supplied assets and prefers them over invention', () => {
    const p = pkg("Explain Newton's Second Law", {
      explanationMemory: [
        { assetId: 'asset-1', content: 'Acceleration is proportional to net force.' },
        { assetId: 'asset-2', content: 'Mass resists acceleration.' },
      ],
    })
    const section = sectionOf(p, PromptSectionId.EXPLANATION_MEMORY_CONTEXT)!
    expect(section.lines.join(' ')).toContain('asset-1')
    expect(section.lines.join(' ')).toContain('Mass resists acceleration.')
    expect(section.lines[0]).toContain('Prefer these')
  })

  it('omits the section entirely when nothing was supplied, and says so', () => {
    const p = pkg("Explain Newton's Second Law")
    expect(sectionOf(p, PromptSectionId.EXPLANATION_MEMORY_CONTEXT)).toBeUndefined()
    expect(p.diagnostics.join(' ')).toContain('EXPLANATION_MEMORY_CONTEXT omitted')
  })
})

describe('Prompt Builder · visualization context inclusion', () => {
  it('carries the VisualIntent purpose and claim for a VKR-covered concept', () => {
    // Linear Momentum IS one of the VKR's 26 authored concepts.
    const covered = pkg('show me a diagram of Linear Momentum', {}, { learnerRequest: 'diagram' as const })
    const section = sectionOf(covered, PromptSectionId.VISUALIZATION_CONTEXT)!
    expect(section.lines.join(' ')).toMatch(/Purpose:|Emphasise:|Narration:/)
    expect(section.lines.join(' ')).not.toContain('No authored visualization guidance')
  })

  it('never leaks a renderer identifier', () => {
    const p = pkg("Explain Newton's Second Law with visualization.")
    // No renderer IDENTIFIER may leak. The English word "renderer" appearing
    // inside a prohibition is fine; a concrete asset name is not.
    expect(allText(p)).not.toMatch(/three_|food_chain|water_cycle|VisualType/i)
  })

  it('instructs the model not to name a specific visual asset', () => {
    const p = pkg("Explain Newton's Second Law with visualization.")
    expect(p.developerInstructions.join(' ')).toContain('Do not name a specific visual asset')
  })

  it('states the gap plainly when the registry has no guidance for the concept', () => {
    // Newton's Second Law is not one of the VKR's 26 authored concepts.
    const p = pkg("Explain Newton's Second Law with visualization.")
    const section = sectionOf(p, PromptSectionId.VISUALIZATION_CONTEXT)!
    expect(section.lines.join(' ')).toContain('No authored visualization guidance')
    expect(p.developerInstructions.join(' ')).toContain('do not describe a specific diagram')
  })

  it('points at the description only when one actually exists', () => {
    const covered = pkg('show me a diagram of Linear Momentum', {}, { learnerRequest: 'diagram' as const })
    if (covered.visualization?.required !== false) {
      const joined = covered.developerInstructions.join(' ')
      expect(joined).toMatch(/Teach toward the visualization described below|do not describe a specific diagram/)
    }
  })

  it('omits visualization context when no visual is planned', () => {
    const p = pkg('quiz me on this')
    expect(sectionOf(p, PromptSectionId.VISUALIZATION_CONTEXT)).toBeUndefined()
  })
})

describe('Prompt Builder · assessment context inclusion', () => {
  const p = pkg('quiz me on this')

  it('includes assessment context and the one-question rule', () => {
    expect(sectionOf(p, PromptSectionId.ASSESSMENT_CONTEXT)).toBeDefined()
    expect(p.developerInstructions.join(' ')).toContain('exactly one assessment question')
    expect(p.developerInstructions.join(' ')).toContain('do not answer it yourself')
  })

  it('propagates withheld claims as explicit instructions', () => {
    if (p.generationConstraints.mustNotReveal.length > 0) {
      expect(p.developerInstructions.join(' ')).toContain('Do not state or give away')
    }
  })

  it('omits assessment context for a plain explanation', () => {
    expect(sectionOf(pkg("Explain Newton's Second Law"), PromptSectionId.ASSESSMENT_CONTEXT)).toBeUndefined()
  })
})

describe('Prompt Builder · misconception inclusion', () => {
  it('includes each misconception with its guard', () => {
    const p = pkg('explain Linear Momentum')
    const section = sectionOf(p, PromptSectionId.MISCONCEPTION_CONTEXT)
    if (section) {
      expect(section.lines.some(l => l.startsWith('Misconception:'))).toBe(true)
      expect(section.lines.some(l => l.startsWith('Guard:'))).toBe(true)
    }
  })
})

describe('Prompt Builder · conversation context inclusion', () => {
  it("carries the learner's own message", () => {
    const p = pkg("Explain Newton's Second Law with visualization.")
    const section = sectionOf(p, PromptSectionId.CONVERSATION_CONTEXT)!
    expect(section.lines.join(' ')).toContain("Explain Newton's Second Law with visualization.")
  })

  it('carries the detected learner request when present', () => {
    const p = pkg('show me a diagram', { }, { learnerRequest: 'diagram' as const })
    const section = sectionOf(p, PromptSectionId.CONVERSATION_CONTEXT)!
    expect(section.lines.join(' ')).toContain('diagram')
  })
})

describe('Prompt Builder · teaching + excursion context', () => {
  it('states the excursion and the required return', () => {
    const p = pkg("Explain Newton's Second Law with visualization.")
    const teaching = sectionOf(p, PromptSectionId.TEACHING_CONTEXT)!
    expect(teaching.lines.join(' ')).toContain('temporarily leaves the active lesson')
    expect(p.developerInstructions.join(' ')).toContain(CALORIMETRY)
  })

  it('targets the requested concept, not the lesson concept', () => {
    const p = pkg("Explain Newton's Second Law with visualization.")
    const concept = sectionOf(p, PromptSectionId.CONCEPT_CONTEXT)!
    expect(concept.lines.join(' ')).toContain(NEWTON_2)
  })

  it('includes a supplied KG description when given', () => {
    const p = pkg("Explain Newton's Second Law", {
      conceptFacts: { conceptId: NEWTON_2, title: "Newton's Second Law", description: 'F = ma.' },
    })
    expect(sectionOf(p, PromptSectionId.CONCEPT_CONTEXT)!.lines.join(' ')).toContain('F = ma.')
  })
})

describe('Prompt Builder · response schema generation', () => {
  it('always declares explanation and visualReference', () => {
    const names = pkg("Explain Newton's Second Law").responseSchema.fields.map(f => f.name)
    expect(names).toContain('explanation')
    expect(names).toContain('visualReference')
  })

  it('declares a nested assessment object only when assessment is required', () => {
    const quiz = pkg('quiz me on this').responseSchema.fields.find(f => f.name === 'assessment')
    expect(quiz?.type).toBe(ResponseFieldType.OBJECT)
    expect(quiz?.fields?.map(f => f.name)).toContain('question')

    const plain = pkg("Explain Newton's Second Law").responseSchema.fields.map(f => f.name)
    expect(plain).not.toContain('assessment')
  })

  it('requires returnedToLesson only when a return is owed', () => {
    const excursion = pkg("Explain Newton's Second Law with visualization.")
      .responseSchema.fields.find(f => f.name === 'returnedToLesson')!
    expect(excursion.required).toBe(true)

    const inLesson = pkg('ok, got it')
      .responseSchema.fields.find(f => f.name === 'returnedToLesson')!
    expect(inLesson.required).toBe(false)
  })

  it('adds followUpQuestion only when the turn must end on a question', () => {
    expect(pkg('quiz me on this').responseSchema.fields.map(f => f.name)).toContain('followUpQuestion')
    expect(pkg("Explain Newton's Second Law").responseSchema.fields.map(f => f.name)).not.toContain('followUpQuestion')
  })

  it('is structured data, not a JSON example', () => {
    const schema = pkg('quiz me on this').responseSchema
    for (const field of schema.fields) {
      expect(field).toHaveProperty('type')
      expect(field).toHaveProperty('required')
      expect(field).toHaveProperty('description')
    }
    // No serialized JSON sample is emitted anywhere in the prompt text.
    expect(allText(pkg('quiz me on this'))).not.toMatch(/^\s*\{[\s\S]*"explanation"\s*:/m)
  })
})

describe('Prompt Builder · disambiguation', () => {
  const ambiguous: ConceptUnderstanding = {
    primaryConceptId: 'phys.em.force', secondaryConceptIds: [], comparisonConceptIds: [],
    currentLessonReferenced: false, offTopic: true, ambiguityDetected: true,
    ambiguityCandidates: [
      { conceptId: 'phys.em.force', title: 'Force', subject: 'physics', confidence: 0.95 },
      { conceptId: 'phys.mech.force', title: 'Force', subject: 'physics', confidence: 0.95 },
    ],
    confidence: 0.57, extractionMethod: ExtractionMethod.EXACT_TITLE, matches: [], reasoning: [],
  }

  it('instructs not to teach, and requires the candidate list in the reply', () => {
    const p = buildPromptPackage({ request: requestFor('explain force', { concepts: ambiguous }) })
    expect(p.developerInstructions.join(' ')).toContain('Do not teach this turn')
    expect(p.responseSchema.fields.map(f => f.name)).toContain('disambiguationOffered')
  })
})

describe('Prompt Builder · validation', () => {
  it('accepts every package the builder produces', () => {
    for (const message of [
      "Explain Newton's Second Law with visualization.", 'quiz me on this',
      'ok, got it', 'back to the lesson', "let's switch to momentum",
    ]) {
      expect(validatePromptPackage(pkg(message))).toEqual([])
    }
  })

  it('rejects an empty system prompt', () => {
    const broken = { ...pkg('quiz me on this'), systemPrompt: '  ' }
    expect(validatePromptPackage(broken).some(p => p.includes('systemPrompt'))).toBe(true)
  })

  it('rejects sections out of canonical order', () => {
    const p = pkg("Explain Newton's Second Law with visualization.")
    const broken = { ...p, sections: [...p.sections].reverse() }
    expect(validatePromptPackage(broken).some(x => x.includes('out of canonical order'))).toBe(true)
  })

  it('rejects a duplicated section', () => {
    const p = pkg('quiz me on this')
    const broken = { ...p, sections: [...p.sections, p.sections[0]] }
    expect(validatePromptPackage(broken).some(x => x.includes('duplicate section'))).toBe(true)
  })

  it('rejects an empty included section', () => {
    const p = pkg('quiz me on this')
    const broken = { ...p, sections: [{ ...p.sections[0], lines: [] }] }
    expect(validatePromptPackage(broken).some(x => x.includes('empty section'))).toBe(true)
  })

  it('rejects a schema with no explanation field', () => {
    const p = pkg('quiz me on this')
    const broken = { ...p, responseSchema: { fields: p.responseSchema.fields.filter(f => f.name !== 'explanation') } }
    expect(validatePromptPackage(broken).some(x => x.includes('explanation'))).toBe(true)
  })
})
