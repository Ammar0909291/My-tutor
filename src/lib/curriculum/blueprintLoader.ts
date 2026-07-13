/**
 * Blueprint Loader — Phase 1C / Phase 1D.
 *
 * Resolves a canonical concept ID (e.g. "phys.meas.units") to its
 * Teaching Blueprint file (docs/curriculum/blueprints/{id}.md), loads it,
 * and exposes two layers of data:
 *
 *   Blueprint         — structural metadata only (Phase 1C).
 *   BlueprintContent  — educational content from Sections 1, 4, 5 (Phase 1D).
 *
 * Blueprint format: blueprints using the new 16-section template have headers
 * of the form "## Section N — Name". Older blueprints use "## N. Name". Only
 * new-format blueprints yield populated BlueprintContent; old-format blueprints
 * return empty misconceptions/explanations and a null conceptSpine.
 *
 * Sections parsed (Phase 1D):
 *   Section 1 — Concept Spine   (definition, why-it-matters, quantities table)
 *   Section 4 — Misconception Library  (MC entries: title, probe, bridge, fix)
 *   Section 5 — Explanation Library    (Explanation A/B/C full texts)
 *
 * Sections intentionally NOT parsed:
 *   Section 2  Four-Stage CPA+ Mental Model
 *   Section 3  Why Beginners Fail
 *   Section 6  Analogy Library
 *   Section 7  Demonstration Library
 *   Section 8  Discovery Lesson
 *   Section 9  Teaching Actions
 *   Section 10 Voice Teaching
 *   Section 11 Assessment
 *   Section 12 Recovery Notes
 *   Section 13 Memory and Review
 *   Section 14 Transfer Map
 *   Section 15 Curriculum Feedback
 *
 * Caching: separate Maps for metadata and content — callers that only need
 * metadata pay no content-parsing cost.
 */

import fs from 'fs'
import path from 'path'

// ── Public types — metadata (Phase 1C) ───────────────────────────────────────

/** Structural metadata only — no educational content. */
export interface Blueprint {
  conceptId: string
  name: string
  /** Blueprint package status, typically "PACKAGE_READY". */
  status: string
  date: string
  frameworkVersion: string
  difficulty: string
  bloom: string
  masteryThreshold: number
  estimatedHours: number
  /** Session cap string from Section 0/Concept Profile, or null if absent. */
  sessionCap: string | null
  filePath: string
}

export type BlueprintResult =
  | { found: true; blueprint: Blueprint }
  | { found: false; reason: string }

// ── Public types — educational content (Phase 1D) ─────────────────────────────

export interface MisconceptionEntry {
  /** "MC-1", "MC-2", etc. */
  id: string
  /** The quoted title text after "MC-N: ". */
  title: string
  /** Probe question to surface the misconception. */
  probeQuestion: string
  /** Characteristic phrase a student with this misconception would use. */
  characteristicPhrase: string
  /** Bridge text (P30) — corrective explanation bridging old→new model. */
  bridge: string
  /** Replacement concept (P31) — what to install in place of the misconception. */
  replacementConcept: string
}

export interface ExplanationEntry {
  /** "A", "B", "C". */
  id: string
  /** E.g. "Intuitive", "Mathematical", "Historical/Discovery". */
  label: string
  /** Full explanation text. */
  text: string
}

export interface ConceptSpine {
  /** One-sentence definition of the concept. */
  definition: string
  /** Why this concept matters — contextual motivation paragraph. */
  whyItMatters: string
  /** Raw markdown table of core quantities/relations, or null if absent. */
  quantitiesTable: string | null
}

export interface BlueprintContent {
  conceptId: string
  /** Section 1 — Concept Spine, or null for old-format blueprints. */
  conceptSpine: ConceptSpine | null
  /** Section 4 — Misconception Library entries (may be empty). */
  misconceptions: MisconceptionEntry[]
  /** Section 5 — Explanation Library entries (may be empty). */
  explanations: ExplanationEntry[]
}

export type BlueprintContentResult =
  | { found: true; content: BlueprintContent }
  | { found: false; reason: string }

// ── Internal caches ───────────────────────────────────────────────────────────

const metaCache = new Map<string, Blueprint>()
const contentCache = new Map<string, BlueprintContent>()

// ── Path resolution ───────────────────────────────────────────────────────────

export function blueprintFilePath(conceptId: string): string {
  return path.join(process.cwd(), 'docs', 'curriculum', 'blueprints', `${conceptId}.md`)
}

// ── Metadata extractors (Phase 1C) ────────────────────────────────────────────

function extractHeader(content: string): {
  name: string; status: string; date: string; frameworkVersion: string
} {
  const name = /^# Teaching Blueprint:\s*(.+)$/m.exec(content)?.[1]?.trim() ?? ''
  // Old-format: "**Status:** PACKAGE_READY" in header.
  // New-format: "*PACKAGE_READY. V-..." at end of file.
  const status = (
    /\*\*Status:\*\*\s*(.+)$/m.exec(content)?.[1]?.trim()
    ?? /\*(PACKAGE_READY[^*]*)\*/.exec(content)?.[1]?.trim()
    ?? ''
  )
  const date = /\*\*Date:\*\*\s*(.+)$/m.exec(content)?.[1]?.trim() ?? ''
  const frameworkVersion = /\*\*Framework Version:\*\*\s*(.+)$/m.exec(content)?.[1]?.trim() ?? ''
  return { name, status, date, frameworkVersion }
}

function extractConceptProfile(content: string): {
  difficulty: string; bloom: string; masteryThreshold: number
  estimatedHours: number; sessionCap: string | null
} {
  // Old-format blueprints: fenced code block under "## 0. Concept Profile".
  const codeBlock = /## 0\. Concept Profile[\s\S]*?```([\s\S]*?)```/.exec(content)?.[1]
  if (codeBlock) {
    const field = (key: string): string =>
      new RegExp(`^${key}:\\s*(.+)$`, 'm').exec(codeBlock)?.[1]?.trim() ?? ''
    const difficultyRaw = field('difficulty')
    return {
      difficulty: difficultyRaw.replace(/\s*\(\d+\)$/, '').trim(),
      bloom: field('bloom'),
      masteryThreshold: parseFloat(field('mastery_threshold')) || 0,
      estimatedHours: parseFloat(field('estimated_hours')) || 0,
      sessionCap: field('session_cap').trim() || null,
    }
  }

  // New-format blueprints: markdown table under "## Section 0 — Concept Metadata".
  // Table rows: "| Field | Value |"
  const tableRow = (label: string): string => {
    const re = new RegExp(`\\|\\s*${label}\\s*\\|\\s*([^|\\n]+)\\|`, 'i')
    return re.exec(content)?.[1]?.trim() ?? ''
  }
  const difficulty = tableRow('Difficulty').toLowerCase()
  const bloom = tableRow('Bloom level').toLowerCase()
  const estimatedHours = parseFloat(tableRow('Estimated study hours') || tableRow('estimated_hours')) || 0
  const masteryThreshold = parseFloat(tableRow('mastery_threshold') || tableRow('Mastery threshold')) || 0

  return { difficulty, bloom, masteryThreshold, estimatedHours, sessionCap: null }
}

// ── Content extractors (Phase 1D) ─────────────────────────────────────────────

/**
 * Extracts the raw text of a numbered section using the new-format header
 * pattern "## Section N — Name". Returns null for old-format blueprints.
 */
function extractNewFormatSection(content: string, sectionNum: number): string | null {
  // Match "## Section N — ..." up to the next "## Section" header or end of file.
  const startRe = new RegExp(`## Section ${sectionNum} — [^\\n]+\\n`)
  const endRe = /^## Section \d+ — /m

  const startMatch = startRe.exec(content)
  if (!startMatch) return null

  const afterStart = content.slice(startMatch.index + startMatch[0].length)
  const endMatch = endRe.exec(afterStart)
  return endMatch ? afterStart.slice(0, endMatch.index).trim() : afterStart.trim()
}

function extractConceptSpine(content: string): ConceptSpine | null {
  const raw = extractNewFormatSection(content, 1)
  if (!raw) return null

  const definition = /\*\*One-sentence definition:\*\*\s*\n([^\n]+)/.exec(raw)?.[1]?.trim() ?? ''
  const whyMatch = /\*\*Why it matters:\*\*\s*\n([\s\S]+?)(?=\n\*\*|$)/.exec(raw)
  const whyItMatters = whyMatch?.[1]?.trim() ?? ''

  // Extract the core quantities/relations markdown table, if present.
  const tableMatch = /(\|[^\n]+\|\n\|[-| :]+\|\n(?:\|[^\n]+\|\n?)+)/.exec(raw)
  const quantitiesTable = tableMatch?.[1]?.trim() ?? null

  if (!definition && !whyItMatters) return null
  return { definition, whyItMatters, quantitiesTable }
}

function extractMisconceptions(content: string): MisconceptionEntry[] {
  const raw = extractNewFormatSection(content, 4)
  if (!raw) return []

  // Split by "### MC-N:" subsection headers.
  const entries: MisconceptionEntry[] = []
  const mcBlocks = raw.split(/(?=### MC-\d+:)/).filter(b => b.trim().startsWith('### MC-'))

  for (const block of mcBlocks) {
    const idMatch = /### (MC-\d+): "([^"]+)"/.exec(block)
    if (!idMatch) continue
    const id = idMatch[1]
    const title = idMatch[2].trim()

    const probe = /\*\*Probe question:\*\*\s*"?([^"\n]+)"?/.exec(block)?.[1]?.trim() ?? ''
    const phrase = /\*\*Characteristic phrase:\*\*\s*"?([^"\n]+)"?/.exec(block)?.[1]?.trim() ?? ''
    const bridge = /\*\*Bridge \(P30\):\*\*\s*"?([\s\S]+?)(?=\n\*\*|$)/.exec(block)?.[1]?.trim() ?? ''
    const replacement = /\*\*Replacement concept \(P31\):\*\*\s*([\s\S]+?)(?=\n\*\*|$)/.exec(block)?.[1]?.trim() ?? ''

    entries.push({ id, title, probeQuestion: probe, characteristicPhrase: phrase, bridge, replacementConcept: replacement })
  }

  return entries
}

function extractExplanations(content: string): ExplanationEntry[] {
  const raw = extractNewFormatSection(content, 5)
  if (!raw) return []

  const entries: ExplanationEntry[] = []
  // Split by "### Explanation X — Label" subsection headers.
  const blocks = raw.split(/(?=### Explanation [A-Z] — )/).filter(b => b.trim().startsWith('### Explanation '))

  for (const block of blocks) {
    const headerMatch = /### Explanation ([A-Z]) — ([^\n]+)/.exec(block)
    if (!headerMatch) continue
    const id = headerMatch[1]
    const label = headerMatch[2].trim()
    // Strip the header line; the rest is the explanation text.
    const text = block.slice(block.indexOf('\n') + 1).trim()
    entries.push({ id, label, text })
  }

  return entries
}

// ── Public API — metadata (Phase 1C) ─────────────────────────────────────────

/**
 * Loads and returns the Blueprint metadata for the given conceptId.
 * Never throws — errors surface via { found: false }.
 */
export function loadBlueprint(conceptId: string): BlueprintResult {
  if (metaCache.has(conceptId)) {
    return { found: true, blueprint: metaCache.get(conceptId)! }
  }

  const filePath = blueprintFilePath(conceptId)
  if (!fs.existsSync(filePath)) {
    return { found: false, reason: `No blueprint file for concept "${conceptId}" at ${filePath}` }
  }

  let content: string
  try {
    content = fs.readFileSync(filePath, 'utf-8')
  } catch (err) {
    return { found: false, reason: `Failed to read blueprint: ${String(err)}` }
  }

  try {
    const header = extractHeader(content)
    const profile = extractConceptProfile(content)
    const blueprint: Blueprint = { conceptId, filePath, ...header, ...profile }
    metaCache.set(conceptId, blueprint)
    return { found: true, blueprint }
  } catch (err) {
    return { found: false, reason: `Failed to parse blueprint metadata: ${String(err)}` }
  }
}

export function getCachedBlueprint(conceptId: string): Blueprint | null {
  return metaCache.get(conceptId) ?? null
}

export function clearBlueprintCache(): void {
  metaCache.clear()
  contentCache.clear()
}

// ── Public API — educational content (Phase 1D) ───────────────────────────────

/**
 * Loads and returns the educational content (Sections 1, 4, 5) for the given
 * conceptId. Reads from the file-level cache — re-reads the file only if
 * neither metadata nor content has been cached yet.
 * Never throws — errors surface via { found: false }.
 */
export function loadBlueprintContent(conceptId: string): BlueprintContentResult {
  if (contentCache.has(conceptId)) {
    return { found: true, content: contentCache.get(conceptId)! }
  }

  const filePath = blueprintFilePath(conceptId)
  if (!fs.existsSync(filePath)) {
    return { found: false, reason: `No blueprint file for concept "${conceptId}"` }
  }

  let rawContent: string
  try {
    rawContent = fs.readFileSync(filePath, 'utf-8')
  } catch (err) {
    return { found: false, reason: `Failed to read blueprint: ${String(err)}` }
  }

  try {
    const content: BlueprintContent = {
      conceptId,
      conceptSpine: extractConceptSpine(rawContent),
      misconceptions: extractMisconceptions(rawContent),
      explanations: extractExplanations(rawContent),
    }
    contentCache.set(conceptId, content)
    return { found: true, content }
  } catch (err) {
    return { found: false, reason: `Failed to parse blueprint content: ${String(err)}` }
  }
}

// ── Prompt block builder (Phase 1D) ──────────────────────────────────────────

/**
 * Builds the BLUEPRINT CONTEXT system prompt block from educational content.
 * Advisory only — the tutor adapts to the conversation; this block is a
 * structured reference, not a script.
 *
 * Returns an empty string when content is empty (e.g. old-format blueprint).
 */
export function buildBlueprintContextBlock(content: BlueprintContent): string {
  const lines: string[] = []
  let hasContent = false

  // Section 1 — Concept Spine
  if (content.conceptSpine) {
    const { definition, whyItMatters, quantitiesTable } = content.conceptSpine
    if (definition || whyItMatters) {
      hasContent = true
      lines.push('\n\nBLUEPRINT CONTEXT')
      lines.push(`Concept: ${content.conceptId}`)

      if (definition) {
        lines.push('\nCONCEPT SPINE')
        lines.push(`Definition: ${definition}`)
      }
      if (whyItMatters) {
        lines.push(`Why it matters: ${whyItMatters}`)
      }
      if (quantitiesTable) {
        lines.push(`\nCore quantities:\n${quantitiesTable}`)
      }
    }
  }

  // Section 4 — Misconception Library
  if (content.misconceptions.length > 0) {
    if (!hasContent) {
      lines.push('\n\nBLUEPRINT CONTEXT')
      lines.push(`Concept: ${content.conceptId}`)
      hasContent = true
    }
    lines.push('\nKNOWN MISCONCEPTIONS — watch for these and address them directly if the student shows signs:')
    for (const mc of content.misconceptions) {
      lines.push(`\n${mc.id}: "${mc.title}"`)
      if (mc.probeQuestion) lines.push(`  Probe: ${mc.probeQuestion}`)
      if (mc.characteristicPhrase) lines.push(`  Watch for: "${mc.characteristicPhrase}"`)
      if (mc.bridge) lines.push(`  Correction: ${mc.bridge}`)
      if (mc.replacementConcept) lines.push(`  Install: ${mc.replacementConcept}`)
    }
  }

  // Section 5 — Explanation Library
  if (content.explanations.length > 0) {
    if (!hasContent) {
      lines.push('\n\nBLUEPRINT CONTEXT')
      lines.push(`Concept: ${content.conceptId}`)
      hasContent = true
    }
    lines.push('\nEXPLANATION LIBRARY — choose the explanation best suited to the student\'s level and the current teaching mode:')
    for (const exp of content.explanations) {
      lines.push(`\nExplanation ${exp.id} — ${exp.label}:\n${exp.text}`)
    }
  }

  if (!hasContent) return ''

  lines.push('\nUse this blueprint context to teach accurately. Do not reference "the blueprint" or these section labels directly to the student.')
  return lines.join('\n')
}
