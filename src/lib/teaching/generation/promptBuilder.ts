/**
 * Prompt Builder.
 *
 * Converts a `TeachingGenerationRequest` into exactly one `PromptPackage` for
 * a single LLM call. Pure, synchronous, deterministic.
 *
 * ASSEMBLY ONLY. Every line it emits comes from data it was given — the
 * request, or context the caller supplied. It regenerates nothing, infers
 * nothing, and decides nothing pedagogical: all of that was settled upstream
 * by the Brain. It never teaches, calls an LLM, renders, executes lessons, or
 * orchestrates.
 *
 * No database and no Prisma, which is why Explanation Memory content arrives
 * as a supplied input rather than being fetched here — `TeachingGenerationRequest`
 * carries no explanation assets, and that contract is not modified.
 */

import {
  PromptSectionId, SECTION_ORDER, ResponseFieldType,
  type PromptPackage, type PromptSection, type ResponseField,
  type ResponseSchema, type GenerationConstraints,
} from './promptPackage'
import type { TeachingGenerationRequest } from './teachingGenerationRequest'

// ── Supplied context ──────────────────────────────────────────────────────

/** One retrieved Explanation Memory asset. Supplied pre-fetched; this module
 *  performs no I/O. */
export interface SuppliedExplanationAsset {
  assetId: string
  content: string
}

/** Canonical Knowledge Graph facts for the target concept, supplied by the
 *  caller. The request carries the title but not the description. */
export interface SuppliedConceptFacts {
  conceptId: string
  title?: string
  description?: string
}

export interface PromptBuilderInputs {
  request: TeachingGenerationRequest
  /** Retrieved ACTIVE explanation assets, if any. */
  explanationMemory?: readonly SuppliedExplanationAsset[]
  conceptFacts?: SuppliedConceptFacts | null
}

// ── Stable text constants ─────────────────────────────────────────────────

const SECTION_HEADINGS: Readonly<Record<PromptSectionId, string>> = {
  TEACHING_CONTEXT: 'TEACHING CONTEXT',
  CONCEPT_CONTEXT: 'CONCEPT',
  EXPLANATION_MEMORY_CONTEXT: 'STORED EXPLANATIONS',
  MISCONCEPTION_CONTEXT: 'MISCONCEPTIONS TO GUARD AGAINST',
  VISUALIZATION_CONTEXT: 'VISUALIZATION',
  ASSESSMENT_CONTEXT: 'ASSESSMENT',
  CONVERSATION_CONTEXT: 'CONVERSATION',
}

const SYSTEM_PROMPT =
  'You are a tutor. Teach toward the learner\'s future competence, not their present comfort. ' +
  'Every decision about what to teach this turn has already been made and is stated below — follow it exactly. ' +
  'Do not choose a different concept, do not add teaching actions that were not requested, and do not skip ones that were.'

/** FNV-1a — deterministic, no clock, no randomness. */
function deterministicId(input: string): string {
  let hash = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193) >>> 0
  }
  return `prompt_${hash.toString(16).padStart(8, '0')}`
}

// ── Developer instructions ────────────────────────────────────────────────

function buildDeveloperInstructions(request: TeachingGenerationRequest): string[] {
  const out: string[] = []
  const c = request.constraints

  out.push(`Respond in ${c.language}.`)
  out.push(`Perform at most ${c.maxTeachingActions} teaching action this turn.`)

  if (request.disambiguationRequested) {
    // Disambiguation preempts teaching entirely, matching the plan.
    out.push('Do not teach this turn. Ask the learner which concept they meant, offering only the candidates listed.')
  } else {
    if (request.explanation.required) {
      out.push(request.explanation.definitionOnly
        ? 'Give a definition of the concept, not a full lesson.'
        : 'Explain the concept.')
    }
    if (request.workedExample.required && request.workedExample.showSteps) {
      out.push('Work the problem step by step; do not state only the result.')
    }
    if (request.revision.required && request.revision.retrievalFirst) {
      out.push('Prompt the learner to recall before re-teaching.')
    }
    if (request.visualization.required) {
      // Only point at a description when one actually exists. The VKR covers
      // a small subset of concepts; for the rest `intent` is null and there is
      // nothing below to teach toward, so a blanket instruction would dangle.
      out.push(request.visualization.intent
        ? 'Teach toward the visualization described below; assume the learner can see it.'
        : 'A visual for this concept is selected downstream. Teach the concept itself; do not describe a specific diagram.')
      out.push('Do not name a specific visual asset, image file, or component.')
    }
    if (request.assessment.required) {
      out.push('Ask exactly one assessment question, and do not answer it yourself.')
    }
  }

  if (c.maxQuestions === 0) out.push('Do not ask a question this turn.')
  else out.push(`Ask at most ${c.maxQuestions} question this turn.`)
  if (c.mustEndWithQuestion) out.push('End your response with the question.')

  if (request.lesson.mustReturnToLesson && request.lesson.resumeConceptId) {
    out.push(`This is a temporary departure from the lesson. Close by returning the learner to ${request.lesson.resumeConceptId}.`)
  }
  for (const claim of c.mustNotReveal) {
    out.push(`Do not state or give away: ${claim}`)
  }
  return out
}

// ── Sections ──────────────────────────────────────────────────────────────

function teachingContext(request: TeachingGenerationRequest): string[] {
  const lines = [
    `Intent: ${request.metadata.teachingIntent}`,
    `Lesson mode: ${request.lesson.lessonMode}`,
    `Execution mode: ${request.lesson.executionMode}`,
  ]
  if (request.lesson.activeLessonConceptId) lines.push(`Active lesson concept: ${request.lesson.activeLessonConceptId}`)
  if (request.lesson.isExcursion) lines.push('This turn temporarily leaves the active lesson.')
  if (request.lesson.resumeConceptId) lines.push(`Return afterwards to: ${request.lesson.resumeConceptId}`)
  return lines
}

function conceptContext(inputs: PromptBuilderInputs): string[] {
  const { request, conceptFacts } = inputs
  const lines: string[] = []
  if (request.concept.conceptId) lines.push(`Concept id: ${request.concept.conceptId}`)
  const title = conceptFacts?.title ?? request.concept.title
  if (title) lines.push(`Title: ${title}`)
  if (conceptFacts?.description) lines.push(`Description: ${conceptFacts.description}`)
  if (request.concept.comparisonConceptIds.length > 0) {
    lines.push(`Compare these concepts: ${request.concept.comparisonConceptIds.join(', ')}`)
  }
  if (request.concept.ambiguous) {
    lines.push(`Ambiguous — candidates: ${request.concept.ambiguityCandidateIds.join(', ')}`)
  }
  for (const objective of request.explanation.learningObjectives) {
    lines.push(`Objective: ${objective}`)
  }
  if (request.explanation.prerequisiteConceptIds.length > 0) {
    lines.push(`Assume already known: ${request.explanation.prerequisiteConceptIds.join(', ')}`)
  }
  return lines
}

function explanationMemoryContext(inputs: PromptBuilderInputs): string[] {
  const assets = inputs.explanationMemory ?? []
  if (assets.length === 0) return []
  const lines = ['Previously authored explanations for this concept. Prefer these over inventing new wording.']
  for (const asset of assets) lines.push(`[${asset.assetId}] ${asset.content}`)
  return lines
}

function misconceptionContext(request: TeachingGenerationRequest): string[] {
  return request.misconceptions.flatMap(m => [
    `Misconception: ${m.misconception}`,
    `Guard: ${m.guardance}`,
  ])
}

function visualizationContext(request: TeachingGenerationRequest): string[] {
  const v = request.visualization
  if (!v.required) return []
  const lines: string[] = []
  if (v.intent) {
    lines.push(`Purpose: ${v.intent.purpose}`)
    lines.push(`Claim the visual makes perceptible: ${v.intent.claim}`)
    if (v.intent.formClass) lines.push(`Form class: ${v.intent.formClass}`)
    if (v.intent.cpaRung) lines.push(`Representation level: ${v.intent.cpaRung}`)
  }
  for (const target of v.emphasisTargets) lines.push(`Emphasise: ${target}`)
  for (const note of v.narrationRecommendations) lines.push(`Narration: ${note}`)
  if (v.accessibilityRequirement) lines.push(`Must also be conveyed in words: ${v.accessibilityRequirement}`)
  // A visual was planned but the registry carries no authored guidance for
  // this concept. Say so plainly rather than emitting an empty section — the
  // gap is real and the model should not infer guidance that does not exist.
  if (lines.length === 0) {
    lines.push('No authored visualization guidance exists for this concept; a visual is still selected downstream.')
  }
  return lines
}

function assessmentContext(request: TeachingGenerationRequest): string[] {
  const a = request.assessment
  if (!a.required) return []
  const lines = a.assessmentHints.map(h => `Probe: ${h}`)
  if (a.mustNotRevealAnswer) lines.push('Do not reveal the answer in the same turn that asks it.')
  if (a.expectsStudentResponse) lines.push('The turn ends here; wait for the learner to answer.')
  return lines
}

function conversationContext(request: TeachingGenerationRequest): string[] {
  const c = request.conversation
  const lines = [`Learner said: ${c.studentMessage}`]
  if (c.previousConceptId) lines.push(`Previous turn concept: ${c.previousConceptId}`)
  if (c.learnerRequest) lines.push(`Detected learner request: ${c.learnerRequest}`)
  return lines
}

// ── Response schema ───────────────────────────────────────────────────────

/** Derived deterministically from the request's own requirements. Structured
 *  description only — no JSON example is ever emitted. */
function buildResponseSchema(request: TeachingGenerationRequest): ResponseSchema {
  const fields: ResponseField[] = [{
    name: 'explanation',
    type: ResponseFieldType.TEXT,
    required: true,
    description: 'The learner-facing teaching text for this turn.',
  }, {
    name: 'visualReference',
    type: ResponseFieldType.BOOLEAN,
    required: true,
    description: 'Whether the teaching text assumes a visual is present. Do not name or select a visual.',
  }]

  if (request.assessment.required) {
    fields.push({
      name: 'assessment',
      type: ResponseFieldType.OBJECT,
      required: true,
      description: 'The single assessment question asked this turn.',
      fields: [
        { name: 'question', type: ResponseFieldType.TEXT, required: true, description: 'The question posed to the learner.' },
        { name: 'options', type: ResponseFieldType.TEXT_LIST, required: false, description: 'Answer options, when the question is multiple choice.' },
        { name: 'expectedAnswer', type: ResponseFieldType.TEXT, required: false, description: 'The correct answer. Never shown to the learner.' },
      ],
    })
  }
  if (request.workedExample.required) {
    fields.push({
      name: 'workedExample',
      type: ResponseFieldType.TEXT,
      required: true,
      description: 'The step-by-step working for the problem posed.',
    })
  }
  if (request.disambiguationRequested) {
    fields.push({
      name: 'disambiguationOffered',
      type: ResponseFieldType.TEXT_LIST,
      required: true,
      description: 'The candidate concepts offered to the learner to choose between.',
    })
  }
  if (request.constraints.mustEndWithQuestion) {
    fields.push({
      name: 'followUpQuestion',
      type: ResponseFieldType.TEXT,
      required: true,
      description: 'The question the response ends on.',
    })
  }
  fields.push({
    name: 'returnedToLesson',
    type: ResponseFieldType.BOOLEAN,
    required: request.lesson.mustReturnToLesson,
    description: 'Whether the response handed control back to the active lesson.',
  })
  fields.push({
    name: 'metadata',
    type: ResponseFieldType.OBJECT,
    required: false,
    description: 'Generation metadata echoed back for provenance.',
    fields: [
      { name: 'requestId', type: ResponseFieldType.TEXT, required: true, description: 'The requestId this reply answers.' },
    ],
  })
  return { fields }
}

// ── Entry point ───────────────────────────────────────────────────────────

/**
 * Assemble one PromptPackage. Deterministic: identical inputs always produce
 * a deeply-equal package, including its id.
 */
export function buildPromptPackage(inputs: PromptBuilderInputs): PromptPackage {
  const { request } = inputs

  const bodies: Record<PromptSectionId, string[]> = {
    TEACHING_CONTEXT: teachingContext(request),
    CONCEPT_CONTEXT: conceptContext(inputs),
    EXPLANATION_MEMORY_CONTEXT: explanationMemoryContext(inputs),
    MISCONCEPTION_CONTEXT: misconceptionContext(request),
    VISUALIZATION_CONTEXT: visualizationContext(request),
    ASSESSMENT_CONTEXT: assessmentContext(request),
    CONVERSATION_CONTEXT: conversationContext(request),
  }

  const sections: PromptSection[] = []
  const diagnostics: string[] = []
  for (const id of SECTION_ORDER) {
    const lines = bodies[id]
    if (lines.length === 0) { diagnostics.push(`${id} omitted — no content supplied.`); continue }
    sections.push({ id, heading: SECTION_HEADINGS[id], lines })
  }

  const developerInstructions = buildDeveloperInstructions(request)
  const responseSchema = buildResponseSchema(request)
  const generationConstraints: GenerationConstraints = {
    maxTeachingActions: request.constraints.maxTeachingActions,
    maxQuestions: request.constraints.maxQuestions,
    mustEndWithQuestion: request.constraints.mustEndWithQuestion,
    mustNotReveal: request.constraints.mustNotReveal,
    language: request.constraints.language,
  }

  diagnostics.push(`Assembled ${sections.length} section(s) and ${developerInstructions.length} developer instruction(s) for one generation.`)

  return {
    packageId: deterministicId([
      request.requestId,
      ...sections.map(s => `${s.id}:${s.lines.join('¶')}`),
      ...developerInstructions,
      ...responseSchema.fields.map(f => `${f.name}:${f.required}`),
    ].join('|')),
    requestId: request.requestId,
    systemPrompt: SYSTEM_PROMPT,
    developerInstructions,
    sections,
    responseSchema,
    generationConstraints,
    diagnostics,
  }
}
