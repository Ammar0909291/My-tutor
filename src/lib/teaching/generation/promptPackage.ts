/**
 * PromptPackage — the deterministic prompt contract for ONE LLM call.
 *
 *   TeachingGenerationRequest -> Prompt Builder -> PromptPackage -> ONE LLM CALL
 *
 * This is the layer where prompt TEXT is finally allowed. Everything upstream
 * emits structured data; the builder assembles that data into the exact
 * strings a single generation receives. It never teaches, calls an LLM,
 * renders, executes lessons, or orchestrates.
 *
 * Data + enums only. Assembly lives in `promptBuilder.ts`.
 */

// ── Sections ──────────────────────────────────────────────────────────────

/** The ordered section vocabulary. Order here IS the assembly order, which is
 *  part of what makes the package deterministic. */
export const PromptSectionId = {
  TEACHING_CONTEXT: 'TEACHING_CONTEXT',
  CONCEPT_CONTEXT: 'CONCEPT_CONTEXT',
  EXPLANATION_MEMORY_CONTEXT: 'EXPLANATION_MEMORY_CONTEXT',
  MISCONCEPTION_CONTEXT: 'MISCONCEPTION_CONTEXT',
  VISUALIZATION_CONTEXT: 'VISUALIZATION_CONTEXT',
  ASSESSMENT_CONTEXT: 'ASSESSMENT_CONTEXT',
  CONVERSATION_CONTEXT: 'CONVERSATION_CONTEXT',
} as const
export type PromptSectionId = (typeof PromptSectionId)[keyof typeof PromptSectionId]

/** Canonical assembly order. A section absent from a package was omitted
 *  because it had no content — never because ordering varied. */
export const SECTION_ORDER: readonly PromptSectionId[] = [
  PromptSectionId.TEACHING_CONTEXT,
  PromptSectionId.CONCEPT_CONTEXT,
  PromptSectionId.EXPLANATION_MEMORY_CONTEXT,
  PromptSectionId.MISCONCEPTION_CONTEXT,
  PromptSectionId.VISUALIZATION_CONTEXT,
  PromptSectionId.ASSESSMENT_CONTEXT,
  PromptSectionId.CONVERSATION_CONTEXT,
]

export interface PromptSection {
  id: PromptSectionId
  /** Human-readable heading, stable per section id. */
  heading: string
  /** Body lines. Every line is assembled from supplied data — never inferred,
   *  never invented, never regenerated. */
  lines: readonly string[]
}

// ── Response schema ───────────────────────────────────────────────────────

/** Field value shapes the response may use. Structured description only —
 *  the builder never emits a JSON example. */
export const ResponseFieldType = {
  TEXT: 'TEXT',
  BOOLEAN: 'BOOLEAN',
  TEXT_LIST: 'TEXT_LIST',
  OBJECT: 'OBJECT',
} as const
export type ResponseFieldType = (typeof ResponseFieldType)[keyof typeof ResponseFieldType]

export interface ResponseField {
  name: string
  type: ResponseFieldType
  required: boolean
  /** What this field must contain. Not an example value. */
  description: string
  /** Populated for OBJECT fields. */
  fields?: readonly ResponseField[]
}

/** The expected shape of the single generation's reply, derived
 *  deterministically from the request's own requirements. */
export interface ResponseSchema {
  fields: readonly ResponseField[]
}

// ── Constraints ───────────────────────────────────────────────────────────

/** Hard limits carried through from the request, unchanged. */
export interface GenerationConstraints {
  maxTeachingActions: number
  maxQuestions: number
  mustEndWithQuestion: boolean
  mustNotReveal: readonly string[]
  language: string
}

// ── The package ───────────────────────────────────────────────────────────

export interface PromptPackage {
  /** Deterministic content hash — identical packages share an id. */
  packageId: string
  /** The request this was assembled from. */
  requestId: string
  /** Teaching stance and role. */
  systemPrompt: string
  /** Hard rules the generation must obey, one per line. */
  developerInstructions: readonly string[]
  /** Assembled context, in SECTION_ORDER. Empty sections are omitted. */
  sections: readonly PromptSection[]
  responseSchema: ResponseSchema
  generationConstraints: GenerationConstraints
  /** Assembly trace, including which sections were omitted and why. */
  diagnostics: readonly string[]
}

// ── Validation ────────────────────────────────────────────────────────────

/** Structural validation. Returns the reasons a package is malformed; empty
 *  means well-formed. Never judges prompt quality — not a structural property. */
export function validatePromptPackage(pkg: PromptPackage): string[] {
  const problems: string[] = []

  if (!pkg.packageId) problems.push('packageId is required')
  if (!pkg.requestId) problems.push('requestId is required')
  if (!pkg.systemPrompt || pkg.systemPrompt.trim() === '') {
    problems.push('systemPrompt is required and must be non-empty')
  }
  if (pkg.developerInstructions.length === 0) {
    problems.push('at least one developer instruction is required')
  }

  // Sections must be in canonical order, unique, and non-empty.
  const seen = new Set<PromptSectionId>()
  let lastIndex = -1
  for (const section of pkg.sections) {
    if (seen.has(section.id)) problems.push(`duplicate section: ${section.id}`)
    seen.add(section.id)
    const index = SECTION_ORDER.indexOf(section.id)
    if (index === -1) problems.push(`unknown section: ${section.id}`)
    else if (index < lastIndex) problems.push(`section out of canonical order: ${section.id}`)
    else lastIndex = index
    if (section.lines.length === 0) problems.push(`empty section included: ${section.id}`)
  }

  // The reply must always be able to carry teaching content.
  if (!pkg.responseSchema.fields.some(f => f.name === 'explanation')) {
    problems.push('responseSchema must always declare an `explanation` field')
  }
  for (const field of pkg.responseSchema.fields) {
    if (!field.name || field.name.trim() === '') problems.push('response field is missing a name')
    if (field.type === ResponseFieldType.OBJECT && (!field.fields || field.fields.length === 0)) {
      problems.push(`OBJECT field "${field.name}" declares no nested fields`)
    }
  }

  if (pkg.generationConstraints.maxTeachingActions < 1) {
    problems.push('maxTeachingActions must be at least 1')
  }
  if (pkg.generationConstraints.maxQuestions < 0) {
    problems.push('maxQuestions must not be negative')
  }
  if (!pkg.generationConstraints.language) problems.push('language is required')

  return problems
}
