/**
 * Visualization Authoring Pipeline (VAP).
 *
 * Offline authoring system that produces VKR (`visualKnowledgeRegistry.ts`)
 * entries from existing educational assets — never a runtime component.
 *
 *   Knowledge Graph -> Explanation Memory -> VAP -> VKR -> VIE -> ADR 12 -> Renderer
 *
 * The VAP owns: reading canonical KG concepts, reading Explanation Memory
 * content, reading misconception metadata, reading prerequisite
 * relationships, producing DRAFT ConceptVisualKnowledge entries, validating
 * them, and exporting deterministic VKR records after human review.
 *
 * The VAP NEVER owns: the Tutor runtime, the Visualization Intelligence
 * Engine, ADR 12, rendering, SVG/HTML/Canvas, providers, cache,
 * VisualAsset, or renderer selection. It does not call the live database or
 * an LLM — every input arrives pre-fetched by the caller (see
 * `physicsAuthoringSource.ts` for how a caller assembles one), which is
 * what keeps this module pure, deterministic, and unit-testable offline.
 */

import { VISUAL_PURPOSES, VISUAL_FORM_CLASSES, validateVisualIntent, type VisualPurpose, type VisualFormClass, type CpaRung } from '../visualIntent'
import type { ConceptVisualKnowledge, VisualizationPattern, PrerequisiteMapping, MisconceptionMapping } from '../visualKnowledgeRegistry'

// ── Authoring interfaces (Input) ─────────────────────────────────────────

/** The canonical KG facts about a concept, as already exposed by
 *  `getKGNode()` in `src/lib/curriculum/knowledgeGraph.ts` — the VAP reads
 *  this shape, it does not redefine or re-fetch it. */
export interface AuthoringKgConcept {
  id: string
  title: string
  description: string
  prerequisites: readonly string[]
}

/** One captured Explanation Memory snippet for the concept (Phase 2/3,
 *  `explanationMemory.ts`) — plain text content only; the VAP never reads
 *  DB rows, review state, or scoring fields directly. */
export interface AuthoringExplanationSnippet {
  content: string
}

/** One misconception recorded for the concept, as authored in the
 *  Educational Brain's misconception libraries or captured at runtime. */
export interface AuthoringMisconception {
  text: string
  /** Optional guidance already known for this misconception; when absent
   *  the pipeline derives a generic guard from the concept's own claim. */
  guardance?: string
}

/** A domain-level authoring pattern: how concepts under a KG ID prefix
 *  (e.g. `phys.mech`) should default to being visualized absent
 *  concept-specific overrides. Subject packs (see `physicsAuthoringSource.ts`)
 *  supply these; the pipeline itself carries no subject-specific data. */
export interface DomainVisualizationDefault {
  prefix: string
  purpose: VisualPurpose
  formClass: VisualFormClass
  cpaRung: CpaRung
  mustVaryExactlyOne?: string
}

/** Everything the pipeline needs to author one concept's draft entry. All
 *  fields are pre-fetched by the caller — the VAP performs no I/O. */
export interface AuthoringSource {
  kgConcept: AuthoringKgConcept
  explanationSnippets: readonly AuthoringExplanationSnippet[]
  misconceptions: readonly AuthoringMisconception[]
  /** Domain defaults ordered most-specific-prefix-first; the first prefix
   *  match wins (same longest-match discipline as `visualRegistry.ts`). */
  domainDefaults: readonly DomainVisualizationDefault[]
  /** Existing partial VKR knowledge for this concept, if any (e.g. a prior
   *  DRAFT being re-authored) — fields present here are never overwritten
   *  by generation, only fields still missing are filled in. */
  existingKnowledge?: Partial<ConceptVisualKnowledge>
}

// ── Draft generation engine ──────────────────────────────────────────────

function matchDomainDefault(
  conceptId: string,
  domainDefaults: readonly DomainVisualizationDefault[],
): DomainVisualizationDefault | null {
  const matches = domainDefaults.filter(d => conceptId.startsWith(d.prefix))
  if (matches.length === 0) return null
  return [...matches].sort((a, b) => b.prefix.length - a.prefix.length)[0]
}

/** Trims an Explanation Memory snippet to a single-sentence claim. Purely
 *  textual, deterministic — takes the first sentence, falling back to the
 *  KG description when no snippet is available. */
function deriveClaim(kgConcept: AuthoringKgConcept, snippets: readonly AuthoringExplanationSnippet[]): string {
  const source = snippets[0]?.content?.trim() || kgConcept.description.trim()
  const firstSentence = source.split(/(?<=[.!?])\s/)[0]?.trim()
  const claim = firstSentence && firstSentence.length > 0 ? firstSentence : `${kgConcept.title} — ${kgConcept.description}`.trim()
  return claim.endsWith('.') || claim.endsWith('!') || claim.endsWith('?') ? claim : `${claim}.`
}

function derivePattern(source: AuthoringSource): VisualizationPattern {
  const domainDefault = matchDomainDefault(source.kgConcept.id, source.domainDefaults)
  const purpose: VisualPurpose = domainDefault?.purpose ?? 'STRUCTURE-REVEAL'
  const formClass: VisualFormClass = domainDefault?.formClass ?? 'labelled-static-diagram'
  const cpaRung: CpaRung = domainDefault?.cpaRung ?? 'pictorial'
  const pattern: VisualizationPattern = {
    purpose,
    formClass,
    cpaRung,
    claim: deriveClaim(source.kgConcept, source.explanationSnippets),
  }
  if (purpose === 'CONTRAST-DISCRIMINATE') {
    pattern.mustVaryExactlyOne = domainDefault?.mustVaryExactlyOne ?? 'the single distinguishing property named in the concept title'
  }
  return pattern
}

function deriveLearningObjectives(kgConcept: AuthoringKgConcept): readonly string[] {
  return [`Explain ${kgConcept.title.toLowerCase()} using the concept's own visual representation`]
}

function derivePrerequisiteMappings(kgConcept: AuthoringKgConcept): readonly PrerequisiteMapping[] {
  return kgConcept.prerequisites.map(id => ({
    conceptId: id,
    reuses: 'the prerequisite concept\'s already-established visual convention, where applicable',
  }))
}

function deriveMisconceptionMappings(misconceptions: readonly AuthoringMisconception[], pattern: VisualizationPattern): readonly MisconceptionMapping[] {
  if (misconceptions.length > 0) {
    return misconceptions.map(m => ({
      misconception: m.text,
      guardance: m.guardance ?? `Visually contradict this misconception directly rather than merely restating the correct claim: ${pattern.claim}`,
    }))
  }
  // The VKR's own quality bar (visualKnowledgeRegistry.test.ts) requires at
  // least one misconception mapping per entry. Absent authored data, the
  // pipeline states this honestly as a review item rather than fabricating
  // a specific misconception it has no evidence for.
  return [{
    misconception: '(none captured yet — no Explanation Memory or misconception-library data was available for this concept at authoring time)',
    guardance: 'A human reviewer should supply a concept-specific misconception before this entry is approved.',
  }]
}

function draftAccessibilityGuidance(pattern: VisualizationPattern): string {
  return `State the following instructional claim in words, not just visually: ${pattern.claim}`
}

function deriveContinuationHints(kgConcept: AuthoringKgConcept, source: AuthoringSource): readonly string[] {
  // Concepts that list this one as a prerequisite are natural continuations.
  // The pipeline only has this concept's own prerequisite list as input, so
  // it cannot compute unlocks without a reverse index — left for the caller
  // to supply via existingKnowledge.continuationHints when known.
  return source.existingKnowledge?.continuationHints ?? []
}

/**
 * Generate a DRAFT ConceptVisualKnowledge entry from pre-fetched sources.
 * Deterministic: identical input always produces an identical output
 * object. Fields already present on `source.existingKnowledge` are kept
 * verbatim rather than regenerated, so re-running authoring on a
 * partially-reviewed draft never discards human edits.
 */
export function generateDraftVisualKnowledge(source: AuthoringSource): ConceptVisualKnowledge {
  const existing = source.existingKnowledge
  const pattern = derivePattern(source)

  return {
    conceptId: source.kgConcept.id,
    patterns: existing?.patterns ?? [pattern],
    learningObjectives: existing?.learningObjectives ?? deriveLearningObjectives(source.kgConcept),
    prerequisiteMappings: existing?.prerequisiteMappings ?? derivePrerequisiteMappings(source.kgConcept),
    misconceptionMappings: existing?.misconceptionMappings ?? deriveMisconceptionMappings(source.misconceptions, pattern),
    interactionRecommendations: existing?.interactionRecommendations ?? [],
    animationRecommendations: existing?.animationRecommendations ?? [
      `Animate the process the claim describes: ${pattern.claim}`,
    ],
    narrationRecommendations: existing?.narrationRecommendations ?? [`Name the concept explicitly when its visual is first shown: "${source.kgConcept.title}".`],
    emphasisTargets: existing?.emphasisTargets ?? [source.kgConcept.title],
    accessibilityGuidance: existing?.accessibilityGuidance ?? draftAccessibilityGuidance(pattern),
    assessmentHints: existing?.assessmentHints ?? [`Ask the learner to restate the claim: ${pattern.claim}`],
    continuationHints: deriveContinuationHints(source.kgConcept, source),
  }
}

// ── Validation interfaces ────────────────────────────────────────────────

export interface ValidationProblem {
  field: string
  message: string
}

/**
 * Structural + completeness validation for a draft entry. Mirrors the
 * quality bar `visualKnowledgeRegistry.test.ts` already enforces on
 * hand-authored entries, plus per-pattern VisualIntent structural
 * validation (reusing `validateVisualIntent`, never reimplementing it).
 * Returns an empty array when the entry is ready for human review.
 */
export function validateDraftVisualKnowledge(entry: ConceptVisualKnowledge): ValidationProblem[] {
  const problems: ValidationProblem[] = []

  if (!entry.conceptId || entry.conceptId.trim() === '') {
    problems.push({ field: 'conceptId', message: 'conceptId is required' })
  }
  if (entry.patterns.length === 0) {
    problems.push({ field: 'patterns', message: 'at least one visualization pattern is required' })
  }
  for (const [i, pattern] of entry.patterns.entries()) {
    const intentProblems = validateVisualIntent({
      purpose: pattern.purpose,
      claim: pattern.claim,
      formClass: pattern.formClass,
      constraints: pattern.mustVaryExactlyOne ? { mustVaryExactlyOne: pattern.mustVaryExactlyOne } : undefined,
    })
    for (const p of intentProblems) problems.push({ field: `patterns[${i}]`, message: p })
  }
  if (entry.learningObjectives.length === 0) {
    problems.push({ field: 'learningObjectives', message: 'at least one learning objective is required' })
  }
  if (entry.misconceptionMappings.length === 0) {
    problems.push({ field: 'misconceptionMappings', message: 'at least one misconception mapping is required' })
  }
  if (entry.interactionRecommendations.length === 0 && entry.animationRecommendations.length === 0) {
    problems.push({ field: 'interactionRecommendations/animationRecommendations', message: 'at least one of interaction or animation recommendations is required' })
  }
  if (entry.narrationRecommendations.length === 0) {
    problems.push({ field: 'narrationRecommendations', message: 'at least one narration recommendation is required' })
  }
  if (entry.emphasisTargets.length === 0) {
    problems.push({ field: 'emphasisTargets', message: 'at least one emphasis target is required' })
  }
  if (!entry.accessibilityGuidance || entry.accessibilityGuidance.trim() === '') {
    problems.push({ field: 'accessibilityGuidance', message: 'accessibilityGuidance is required' })
  }
  if (entry.assessmentHints.length === 0) {
    problems.push({ field: 'assessmentHints', message: 'at least one assessment hint is required' })
  }

  const banned = /\b(svg|canvas|<html|renderer|VisualAsset)\b/i
  if (banned.test(JSON.stringify(entry))) {
    problems.push({ field: '(entry)', message: 'entry must not reference rendering vocabulary (svg/canvas/html/renderer/VisualAsset) — VAP output is knowledge, not production content' })
  }

  return problems
}

// ── Draft -> human review -> approved pipeline ───────────────────────────

export type AuthoringStatus = 'draft' | 'invalid' | 'approved'

export interface AuthoringResult {
  status: AuthoringStatus
  entry: ConceptVisualKnowledge
  problems: readonly ValidationProblem[]
}

/**
 * Run the full offline pipeline for one concept: generate -> validate.
 * Never marks an entry 'approved' itself — approval is a human act
 * (`approveDraft` below), matching the Draft VKR Entry -> Human review ->
 * Approved VKR stages.
 */
export function runAuthoringPipeline(source: AuthoringSource): AuthoringResult {
  const entry = generateDraftVisualKnowledge(source)
  const problems = validateDraftVisualKnowledge(entry)
  return { status: problems.length === 0 ? 'draft' : 'invalid', entry, problems }
}

/**
 * Human review gate. Represents a reviewer accepting a validated draft.
 * Throws if the entry still has open validation problems — approval is
 * never possible on an entry that failed validation, closing the "Draft ->
 * Human review -> Approved" pipeline stage as a real gate rather than an
 * advisory label.
 */
export function approveDraft(result: AuthoringResult): ConceptVisualKnowledge {
  if (result.status === 'invalid' || result.problems.length > 0) {
    throw new Error(`Cannot approve an invalid draft for "${result.entry.conceptId}": ${result.problems.map(p => `${p.field}: ${p.message}`).join('; ')}`)
  }
  return result.entry
}

// ── Export interface ──────────────────────────────────────────────────────

/** Deterministic key order for a stable, diff-friendly export — object key
 *  insertion order in `ConceptVisualKnowledge` is not guaranteed to be
 *  stable across future edits, so export pins it explicitly. */
const EXPORT_KEY_ORDER: readonly (keyof ConceptVisualKnowledge)[] = [
  'conceptId', 'patterns', 'learningObjectives', 'prerequisiteMappings',
  'misconceptionMappings', 'interactionRecommendations', 'animationRecommendations',
  'narrationRecommendations', 'emphasisTargets', 'accessibilityGuidance',
  'assessmentHints', 'continuationHints',
]

function orderedEntry(entry: ConceptVisualKnowledge): Record<string, unknown> {
  const ordered: Record<string, unknown> = {}
  for (const key of EXPORT_KEY_ORDER) ordered[key] = entry[key]
  return ordered
}

/**
 * Export one or more approved entries as a deterministic, pretty-printed
 * JSON record — the artifact a human/CI step commits into the VKR's seed
 * data. Entries are sorted by conceptId so re-running the pipeline over an
 * unordered source list never produces a spurious diff.
 */
export function exportVkrRecords(entries: readonly ConceptVisualKnowledge[]): string {
  const sorted = [...entries].sort((a, b) => a.conceptId.localeCompare(b.conceptId))
  const record: Record<string, unknown> = {}
  for (const entry of sorted) record[entry.conceptId] = orderedEntry(entry)
  return JSON.stringify(record, null, 2)
}
