/**
 * Blueprint Loader — Phase 1C / Phase 1D / TQ-1 / TQ-2.
 *
 * Resolves a canonical concept ID (e.g. "phys.meas.units") to its
 * Teaching Blueprint file (docs/curriculum/blueprints/{id}.md), loads it,
 * and exposes two layers of data:
 *
 *   Blueprint         — structural metadata only (Phase 1C).
 *   BlueprintContent  — educational content from Sections 1, 4, 5 (Phase 1D).
 *
 * TQ-1/TQ-2: also loads the EB Concept Entry
 * (educational-brain/concepts/{subject}/{id}.md) and extracts:
 *   - Recovery notes: "shrink to:" question + M{n} recovery triggers
 *   - Analogy library: anti-analogies to avoid
 *   - Voice teaching: "what to listen for" detection cues
 *   - Explanation library: opening scenario (youngest/most concrete entry)
 *
 * Three blueprint formats exist in the corpus; all are handled:
 *
 *   Format A — Component-format (133 blueprints):
 *     Headers: "## Component N — Name"
 *     → extractComponentConceptSpine/MC/Explanations (full injection)
 *
 *   Format B — Protocol-format (47 blueprints, "## N. Title"):
 *     Section 1 = Learning Objectives, Section 5 = Protocol Library.
 *     → Concept spine extracted from Section 1 boundary statement +
 *       "**Core idea:**" / "**Key vocabulary:**" header fields when present.
 *     → Misconceptions: not in MC-N format; zero MC entries (graceful).
 *     → Explanations: not in Explanation X format; zero entries (graceful).
 *
 *   Format C — Section-format (14 blueprints, "## Section N — Name"):
 *     Section 1 = Concept Spine ("**Core Claim:**" or "**One-sentence definition:**")
 *     Section 4 = Misconception Library ("### MC-N:")
 *     Section 5 = Explanation Library ("### Explanation X — ")
 *     → Full injection (spine uses "**Core Claim:**" as fallback for definition).
 *
 * Sections parsed (Phase 1D):
 *   Section 1 — Concept Spine   (definition, why-it-matters, quantities table)
 *   Section 4 — Misconception Library  (MC entries: title, probe, bridge, fix)
 *   Section 5 — Explanation Library    (Explanation A/B/C full texts)
 *
 * Sections intentionally NOT parsed (blueprint file):
 *   Section 2  Four-Stage CPA+ Mental Model
 *   Section 3  Why Beginners Fail / Diagnostic Battery
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
 * (These sections are now sourced from the EB Concept Entry instead — TQ-1/TQ-2.)
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

// ── EB Concept Entry types (TQ-1 / TQ-2) ─────────────────────────────────────

/**
 * Teaching intelligence extracted from the EB Concept Entry
 * (educational-brain/concepts/{subject}/{id}.md).
 *
 * These fields fill the injection gap: the blueprint file carries execution
 * protocols; the EB entry carries the pedagogical intelligence (recovery
 * moves, voice cues, what to avoid). Both are now injected into every turn.
 */
export interface EBConceptContext {
  conceptId: string
  /**
   * TQ-1: "Shrink to" question from Recovery notes — the emergency anchor
   * when the learner is completely stuck. Verbatim as authored.
   */
  recoveryShrinkTo: string | null
  /**
   * TQ-1: Misconception-specific recovery triggers from Recovery notes.
   * Each is a named probe + action string, e.g. for M2: give this probe,
   * if answer is X then do Y.
   */
  recoveryTriggers: Array<{ label: string; text: string }>
  /**
   * TQ-1: Anti-analogies to avoid, from the Analogy library.
   * Each is the full "anti-analogy to avoid" note as authored.
   */
  antiAnalogies: string[]
  /**
   * TQ-1: Voice detection cues from Voice teaching "what to listen for".
   * Each entry maps a learner utterance pattern to its diagnostic implication.
   */
  voiceDetectionCues: string[]
  /**
   * TQ-2: Opening scenario — the youngest / most concrete explanation from
   * the Explanation library (Age 10-12, or first entry). Used to anchor the
   * lesson opening with a concrete scenario before any formal definition.
   */
  openingScenario: string | null
  /**
   * P1: Step-by-step teaching order from "## Teaching Sequence"
   * or "## Teaching actions". Raw authored text — inject verbatim as the
   * sequence the tutor must follow for this concept. Populated for any
   * subject whose EB entry carries this section (originally physics-only;
   * gate removed once chemistry's entries were confirmed to use the same
   * heading format).
   */
  teachingSequence: string | null
  /**
   * P1: Authored action dispatch table from "## Tutor Actions".
   * Maps student state to specific teaching action (e.g. WORKED-EXAMPLE, ANALOGY).
   * Populated for any subject whose EB entry carries this section.
   */
  tutorActions: string | null
  /**
   * P1: Questions to draw from, from "## Discovery Questions"
   * or "## Discovery lesson". Used as the authored question bank for this
   * concept. Populated for any subject whose EB entry carries this section.
   */
  discoveryQuestions: string | null
  /**
   * P1: What to watch for — mastery gate cues from
   * "## Assessment Signals" or "## Assessment". Populated for any subject
   * whose EB entry carries this section.
   */
  assessmentSignals: string | null
}

export type EBConceptContextResult =
  | { found: true; context: EBConceptContext }
  | { found: false; reason: string }

// ── Internal caches ───────────────────────────────────────────────────────────

const metaCache = new Map<string, Blueprint>()
const contentCache = new Map<string, BlueprintContent>()
const ebContextCache = new Map<string, EBConceptContext>()

// ── Path resolution ───────────────────────────────────────────────────────────

export function blueprintFilePath(conceptId: string): string {
  return path.join(process.cwd(), 'docs', 'curriculum', 'blueprints', `${conceptId}.md`)
}

/** Maps a concept ID prefix to its subject folder under educational-brain/concepts/. */
function subjectFolderForConceptId(conceptId: string): string | null {
  if (conceptId.startsWith('phys.')) return 'physics'
  if (conceptId.startsWith('math.')) return 'mathematics'
  if (conceptId.startsWith('eng.')) return 'english'
  if (conceptId.startsWith('chem.')) return 'chemistry'
  if (conceptId.startsWith('bio.')) return 'biology'
  if (conceptId.startsWith('cs.')) return 'computer_science'
  return null
}

export function ebConceptEntryPath(conceptId: string): string | null {
  const subject = subjectFolderForConceptId(conceptId)
  if (!subject) return null
  return path.join(process.cwd(), 'educational-brain', 'concepts', subject, `${conceptId}.md`)
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

  const definition =
    /\*\*One-sentence definition:\*\*\s*\n([^\n]+)/.exec(raw)?.[1]?.trim() ??
    /\*\*Core Claim:\*\*\s+([^\n]+)/.exec(raw)?.[1]?.trim() ??
    ''
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

// ── Protocol-format extractors (Format B: ## N. Title) ───────────────────────
//
// 47 blueprints use a numbered-section format (## 0. Concept Profile,
// ## 1. Learning Objective, ## 6. Misconception Engine, etc.).  The standard
// Section-format and Component-format extractors do not match these headers,
// so all three injections returned empty/null for these foundational concepts.
// These extractors recover spine, misconceptions, and a learning-objective
// explanation from the Protocol-format structure.

function extractSpineFormatSection(content: string, sectionNum: number): string | null {
  // Matches "## N. Title" (no dash — only digits followed by dot).
  const startRe = new RegExp(`## ${sectionNum}\\. [^\\n]+\\n`)
  const endRe = /^## \d+\. /m

  const startMatch = startRe.exec(content)
  if (!startMatch) return null

  const afterStart = content.slice(startMatch.index + startMatch[0].length)
  const endMatch = endRe.exec(afterStart)
  return endMatch ? afterStart.slice(0, endMatch.index).trim() : afterStart.trim()
}

function extractSpineFormatConceptSpine(content: string): ConceptSpine | null {
  const raw = extractSpineFormatSection(content, 1)
  if (!raw) return null

  const definition =
    /\*\*One-sentence definition:\*\*\s+([^\n]+)/.exec(raw)?.[1]?.trim() ??
    /\*\*Core Claim:\*\*\s+([^\n]+)/.exec(raw)?.[1]?.trim() ??
    ''
  const whyMatch = /\*\*(?:Why it matters|The core insight):\*\*\s+([\s\S]+?)(?=\n\*\*|$)/.exec(raw)
  const whyItMatters = whyMatch?.[1]?.trim() ?? ''
  const tableMatch = /(\|[^\n]+\|\n\|[-| :]+\|\n(?:\|[^\n]+\|\n?)+)/.exec(raw)
  const quantitiesTable = tableMatch?.[1]?.trim() ?? null

  if (!definition && !whyItMatters) return null
  return { definition, whyItMatters, quantitiesTable }
}

function extractSpineFormatMisconceptions(content: string): MisconceptionEntry[] {
  const raw = extractSpineFormatSection(content, 4)
  if (!raw) return []

  const entries: MisconceptionEntry[] = []
  // Split on "### MC-N:" style headers used in Spine-format.
  const blocks = raw.split(/(?=### MC-\d+:)/).filter(b => /^### MC-\d+:/.test(b))

  let seq = 0
  for (const block of blocks) {
    seq++
    const headerMatch = /### (MC-\d+): "?([^"\n]+)"?/.exec(block)
    if (!headerMatch) continue
    const id = headerMatch[1]
    const title = headerMatch[2].trim()

    const probe = /- \*\*Probe:\*\*\s*"?([^"\n]+)"?/.exec(block)?.[1]?.trim() ?? ''
    const phrase = /- \*\*Characteristic phrase:\*\*\s*"?([^"\n]+)"?/.exec(block)?.[1]?.trim() ?? ''
    const bridge = /- \*\*Bridge \[P30\]:\*\*\s*"?([\s\S]+?)(?=\n- \*\*|\n###|$)/.exec(block)?.[1]?.trim() ?? ''
    const replacement = /- \*\*Replacement \[P31\]:\*\*\s*"?([\s\S]+?)(?=\n- \*\*|\n###|$)/.exec(block)?.[1]?.trim() ?? ''

    entries.push({ id, title, probeQuestion: probe, characteristicPhrase: phrase, bridge, replacementConcept: replacement })
  }
  return entries
}

function extractSpineFormatExplanations(content: string): ExplanationEntry[] {
  const raw = extractSpineFormatSection(content, 5)
  if (!raw) return []

  const entries: ExplanationEntry[] = []
  // Format: "**Explanation A — Label:**" (bold, not ### heading)
  const blocks = raw.split(/(?=\*\*Explanation [A-Z] — )/).filter(b => /^\*\*Explanation [A-Z] — /.test(b))

  for (const block of blocks) {
    const headerMatch = /\*\*Explanation ([A-Z]) — ([^*:]+)(?:\*\*:?|\*\*)\s*\n/.exec(block)
    if (!headerMatch) continue
    const id = headerMatch[1]
    const label = headerMatch[2].trim()
    const text = block.slice(block.indexOf('\n') + 1).trim()
    entries.push({ id, label, text })
  }
  return entries
}

function extractProtocolSection(content: string, sectionNum: number): string | null {
  const startRe = new RegExp(`## ${sectionNum}\\. [^\\n]+\\n`)
  const endRe = /^## \d+\. /m

  const startMatch = startRe.exec(content)
  if (!startMatch) return null

  const afterStart = content.slice(startMatch.index + startMatch[0].length)
  const endMatch = endRe.exec(afterStart)
  return endMatch ? afterStart.slice(0, endMatch.index).trim() : afterStart.trim()
}

function extractProtocolConceptSpine(content: string): ConceptSpine | null {
  const raw = extractProtocolSection(content, 0)
  if (!raw) return null

  const coreIdea = /\*\*Core idea:\*\*\s*([^\n]+(?:\n(?!\*\*)[^\n]+)*)/.exec(raw)?.[1]?.trim()
  const vocabMatch = /\*\*Key vocabulary:\*\*\s*([^\n]+)/.exec(raw)

  // Fallback: build a minimal definition from the concept name when no Core idea field.
  const nameMatch = /^name:\s*(.+)$/m.exec(raw)
  const domainMatch = /^domain:\s*(.+)$/m.exec(raw)
  const fallbackDef = nameMatch
    ? `${nameMatch[1].trim()} — a concept in ${domainMatch?.[1]?.trim() ?? 'physics'}.`
    : ''

  const definition = coreIdea ?? fallbackDef
  const whyItMatters = vocabMatch ? `Key vocabulary: ${vocabMatch[1].trim()}` : ''

  if (!definition && !whyItMatters) return null
  return { definition, whyItMatters, quantitiesTable: null }
}

function extractProtocolMisconceptions(content: string): MisconceptionEntry[] {
  const raw = extractProtocolSection(content, 6)
  if (!raw) return []

  const entries: MisconceptionEntry[] = []
  const blocks = raw.split(/(?=### MC-\d+ — )/).filter(b => /^### MC-\d+ — /.test(b))

  let seq = 0
  for (const block of blocks) {
    seq++
    const headerMatch = /### (MC-\d+) — ([^\n]+)/.exec(block)
    if (!headerMatch) continue
    const id = headerMatch[1]
    const title = headerMatch[2].trim()

    const symptom = /\*\*Observable symptom:\*\*\s*([^\n]+(?:\n(?!\*\*)[^\n]+)*)/.exec(block)?.[1]?.trim() ?? ''
    const repairMatch = /\*\*Repair chain:\*\*\s*([^\n]+)/.exec(block)
    const bridge = repairMatch ? repairMatch[1].trim() : ''

    entries.push({ id, title, probeQuestion: symptom, characteristicPhrase: symptom.slice(0, 80), bridge, replacementConcept: '' })
  }
  return entries
}

function extractProtocolExplanations(content: string): ExplanationEntry[] {
  const raw = extractProtocolSection(content, 1)
  if (!raw) return []

  // Use the Learning Objective section as a single explanation entry.
  const text = raw.replace(/\*\*Accuracy threshold:[^*]+\*\*/g, '').trim()
  if (!text) return []
  return [{ id: 'A', label: 'Learning Objective', text }]
}

// ── Component-format extractors (Phase 2) ────────────────────────────────────
//
// 144 PACKAGE_READY + 51 READY blueprints use the older "## Component N —"
// format. Phase 2 activates these by mapping Component-format sections to the
// same BlueprintContent shape used by the new Section-format, so all physics
// blueprints feed into the Phase 1D prompt injection without file changes.
//
// Mapping:
//   Component 0 (Concept Identity)  → ConceptSpine (minimal — name + domain)
//   Component 1 (Explanation Blocks) → explanations[]
//   Component 3 (Misconception Engine) → misconceptions[]

/** True when the blueprint uses the old Component-format headers. */
function isComponentFormat(content: string): boolean {
  return /^## Component 0 — /m.test(content)
}

/** True when the blueprint uses the Protocol-format headers (## N. Title, ## 0. Concept Profile). */
function isProtocolFormat(content: string): boolean {
  return /^## 0\. Concept Profile/m.test(content)
}

/**
 * True when the blueprint uses the Spine-format headers
 * (## 0. Concept Metadata, ## 1. Concept Spine, ## 4. Misconception Library).
 * 24 phys.mod/qm/rel/stat blueprints use this format.
 */
function isSpineFormat(content: string): boolean {
  return /^## 0\. Concept Metadata/m.test(content)
}

/**
 * Extracts the raw text of a component section.
 * Returns null if the component header is absent.
 */
function extractComponentSection(content: string, componentNum: number): string | null {
  const startRe = new RegExp(`## Component ${componentNum} — [^\\n]+\\n`)
  const endRe = /^## Component \d+ — /m

  const startMatch = startRe.exec(content)
  if (!startMatch) return null

  const afterStart = content.slice(startMatch.index + startMatch[0].length)
  const endMatch = endRe.exec(afterStart)
  return endMatch ? afterStart.slice(0, endMatch.index).trim() : afterStart.trim()
}

/**
 * Builds a minimal ConceptSpine from Component 0's YAML block.
 * Returns null if the identity block is missing.
 */
function extractComponentConceptSpine(content: string): ConceptSpine | null {
  const raw = extractComponentSection(content, 0)
  if (!raw) return null

  // Pull from the YAML block inside Component 0.
  const yamlBlock = /```(?:yaml)?\s*([\s\S]*?)```/.exec(raw)?.[1] ?? ''
  const field = (key: string): string =>
    new RegExp(`^\\s*${key}:\\s*(.+)$`, 'm').exec(yamlBlock)?.[1]?.trim() ?? ''

  const name = field('name')
  const domain = field('domain')
  if (!name) return null

  return {
    definition: `${name} is a concept in ${domain || 'physics'}.`,
    whyItMatters: '',
    quantitiesTable: null,
  }
}

/**
 * Maps Component 1's "### Block 1-X — Title" subsections to ExplanationEntry[].
 * Block 1-A → id="A", Block 1-B → id="B", etc.
 */
function extractComponentExplanations(content: string): ExplanationEntry[] {
  const raw = extractComponentSection(content, 1)
  if (!raw) return []

  const entries: ExplanationEntry[] = []
  const blocks = raw.split(/(?=### Block 1-[A-Z] — )/).filter(b => /^### Block 1-[A-Z] — /.test(b))

  for (const block of blocks) {
    const headerMatch = /### Block 1-([A-Z]) — ([^\n]+)/.exec(block)
    if (!headerMatch) continue
    const id = headerMatch[1]
    const label = headerMatch[2].trim()
    const text = block.slice(block.indexOf('\n') + 1).trim()
    entries.push({ id, label, text })
  }

  return entries
}

/**
 * Maps Component 3's "### MC-SLUG" subsections to MisconceptionEntry[].
 * Assigns sequential ids MC-1, MC-2, … (Component format uses slug keys,
 * not numeric ids).
 */
function extractComponentMisconceptions(content: string): MisconceptionEntry[] {
  const raw = extractComponentSection(content, 3)
  if (!raw) return []

  const entries: MisconceptionEntry[] = []
  // Split by "### MC-" slug headers.
  const blocks = raw.split(/(?=### MC-)/).filter(b => b.trim().startsWith('### MC-'))

  let seq = 0
  for (const block of blocks) {
    seq++
    const headerMatch = /### (MC-[A-Z0-9_-]+)/.exec(block)
    if (!headerMatch) continue

    // Convert slug to readable title: MC-RMS-IS-AVERAGE → "RMS Is Average"
    const slugTitle = headerMatch[1]
      .replace(/^MC-/, '')
      .replace(/-/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, c => c.toUpperCase())

    const id = `MC-${seq}`

    // Extract fields from bullet-style entries.
    const trigger = /\*\*trigger_signal:\*\*\s*"?([^"\n]+)"?/.exec(block)?.[1]?.trim() ?? ''
    const bridge = /\*\*bridge_text \[P30\]:\*\*\s*"?([\s\S]+?)(?=\n- \*\*|\n---|\n##|$)/.exec(block)?.[1]?.trim() ?? ''
    const replacement = /\*\*replacement_text \[P31\]:\*\*\s*"?([\s\S]+?)(?=\n- \*\*|\n---|\n##|$)/.exec(block)?.[1]?.trim() ?? ''

    // Characteristic phrase: extract the quoted part of the trigger signal.
    const phraseMatch = /"([^"]{10,})"/.exec(trigger)
    const characteristicPhrase = phraseMatch?.[1]?.trim() ?? trigger.split('.')[0]?.trim() ?? ''

    entries.push({
      id,
      title: slugTitle,
      probeQuestion: trigger,
      characteristicPhrase,
      bridge,
      replacementConcept: replacement,
    })
  }

  return entries
}

// ── EB Concept Entry parsers (TQ-1 / TQ-2) ───────────────────────────────────

/**
 * Returns the raw text of the first matching `## SectionName` block.
 * Accepts an array of alternative heading names to support all three EB formats:
 *   - New STANDARD (Batch 4+): plain title, e.g. `## Teaching Sequence`
 *   - Old plain (Deliveries 5–14): plain title, e.g. `## Teaching actions`
 *   - Old numbered (some physics): numbered, e.g. `## 9. Teaching Actions (dispatch table)`
 * Each candidate is tried as both a plain match and a `\d+\. <candidate>` match.
 */
function extractEBSection(content: string, ...sectionTitles: string[]): string | null {
  for (const sectionTitle of sectionTitles) {
    // Try plain heading first, then numbered prefix variant.
    const patterns = [
      new RegExp(`^## ${sectionTitle}\\s*\\n`, 'mi'),
      new RegExp(`^## \\d+\\.\\s+${sectionTitle}[^\\n]*\\n`, 'mi'),
    ]
    for (const startRe of patterns) {
      const startMatch = startRe.exec(content)
      if (!startMatch) continue
      const afterStart = content.slice(startMatch.index + startMatch[0].length)
      const endMatch = /^## /m.exec(afterStart)
      const raw = endMatch ? afterStart.slice(0, endMatch.index).trim() : afterStart.trim()
      if (raw.length > 0) return raw
    }
  }
  return null
}

/**
 * TQ-1: Parses the recovery section of an EB entry.
 * Supports both formats:
 *   Old (Deliveries 5–14): "## Recovery notes" with "shrink to:" and M{n} trigger blocks.
 *   New (STANDARD §14):    "## Tutor Recovery Strategy" with numbered prose steps.
 */
function parseEBRecoveryNotes(content: string): {
  shrinkTo: string | null
  triggers: Array<{ label: string; text: string }>
} {
  // Try old heading first, then new heading.
  const raw = extractEBSection(content, 'Recovery notes', 'Tutor Recovery Strategy')
  if (!raw) return { shrinkTo: null, triggers: [] }

  const triggers: Array<{ label: string; text: string }> = []

  // OLD format: "shrink to: ..." sentence + M{n} trigger blocks.
  const shrinkMatch = /shrink to:\s*([^.]+(?:\.[^*\n]+)*)/i.exec(raw)
  if (shrinkMatch) {
    const shrinkTo = shrinkMatch[1].trim().replace(/\s+/g, ' ')
    const triggerRe = /\*(M\d+[^:]*(?:recovery[^:]*)?(?:trigger[^:]*)?)\*:\s*([\s\S]+?)(?=\n\n\*M\d+|\n\n\*[A-Z]|\n---|\n##|$)/gi
    let m: RegExpExecArray | null
    while ((m = triggerRe.exec(raw)) !== null) {
      const label = m[1].trim()
      const text = m[2].trim().replace(/\s+/g, ' ')
      if (text.length > 10) triggers.push({ label, text })
    }
    return { shrinkTo, triggers }
  }

  // NEW format: numbered steps — extract each step as a trigger and first sentence as shrinkTo.
  const stepRe = /^\d+\.\s+\*\*([^*]+)\*\*:\s*([\s\S]+?)(?=\n\d+\.|\n---|\n##|$)/gm
  let firstStep: string | null = null
  let m: RegExpExecArray | null
  while ((m = stepRe.exec(raw)) !== null) {
    const label = m[1].trim()
    const text = m[2].trim().replace(/\s+/g, ' ')
    if (text.length > 10) {
      if (!firstStep) firstStep = `${label}: ${text}`
      triggers.push({ label, text })
    }
  }

  // If no numbered bold steps, fall back to extracting each paragraph as a trigger.
  if (triggers.length === 0) {
    const paras = raw.split(/\n\n+/).filter(p => p.trim().length > 20)
    paras.forEach((p, i) => {
      triggers.push({ label: `Step ${i + 1}`, text: p.trim().replace(/\s+/g, ' ') })
    })
    firstStep = paras[0]?.trim().replace(/\s+/g, ' ') ?? null
  }

  // shrinkTo = opening sentence of the first step (the concrete anchor action).
  const shrinkTo = firstStep
    ? (firstStep.match(/^[^.!?]+[.!?]/)?.[0]?.trim() ?? firstStep.slice(0, 120))
    : null

  return { shrinkTo, triggers }
}

/**
 * TQ-1: Parses anti-analogy warnings from the analogy section of an EB entry.
 * Supports both formats:
 *   Old: "## Analogy library" with `**Anti-analogy to avoid**:` blocks.
 *   New: "## Analogies"       with `**Anti-analogy — <Name>**:` blocks.
 */
function parseEBAntiAnalogies(content: string): string[] {
  const raw = extractEBSection(content, 'Analogy library', 'Analogies')
  if (!raw) return []

  const results: string[] = []
  // Matches both "**Anti-analogy to avoid**:" (old) and "**Anti-analogy — ...**:" (new).
  const re = /\*\*Anti-analogy[^*]*\*\*:\s*([\s\S]+?)(?=\n- \*\*|\n\*\*|\n##|---|\n\n\*\*|$)/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(raw)) !== null) {
    const text = m[1].trim().replace(/\s+/g, ' ')
    if (text.length > 10) results.push(text)
  }
  return results
}

/**
 * TQ-1: Parses voice detection cues from the voice section of an EB entry.
 * Supports both formats:
 *   Old: "## Voice teaching"      with `*What to listen for*:` block.
 *   New: "## Voice Teaching Notes" with free prose — latency signals, avoidance notes.
 */
function parseEBVoiceDetectionCues(content: string): string[] {
  const raw = extractEBSection(content, 'Voice teaching', 'Voice Teaching Notes')
  if (!raw) return []

  // OLD format: explicit "What to listen for:" section.
  const listenMatch = /\*What to listen for\*:\s*([\s\S]+?)(?=\n\n\*|\n##|$)/i.exec(raw)
  if (listenMatch) {
    return listenMatch[1]
      .trim()
      .split(/;\s*|\n(?=learner )/)
      .map(s => s.trim().replace(/\s+/g, ' '))
      .filter(s => s.length > 10)
  }

  // NEW format: extract named signal sentences (latency signal, avoid notes, if-student-pauses).
  const cues: string[] = []
  const signalRe = /(?:Latency signal|if a student pauses|Avoid using|listen for|signal)[^:]*:\s*([^.\n]+\.)/gi
  let m: RegExpExecArray | null
  while ((m = signalRe.exec(raw)) !== null) {
    const text = m[1].trim().replace(/\s+/g, ' ')
    if (text.length > 10) cues.push(text)
  }
  // If no specific signals found, return the first prose sentence as a general cue.
  if (cues.length === 0) {
    const firstSentence = raw.match(/^([^.\n]+[.!?])/m)?.[1]?.trim()
    if (firstSentence && firstSentence.length > 10) cues.push(firstSentence)
  }
  return cues
}

/**
 * TQ-2: Extracts the opening / core explanation from an EB entry.
 * Supports both formats:
 *   Old: "## Explanation library" with `- **Age 10-12**:` age-banded bullets.
 *   New: "## Core Understanding"  with prose paragraphs.
 */
function parseEBOpeningScenario(content: string): string | null {
  // Try old Explanation library format first.
  const rawExplanation = extractEBSection(content, 'Explanation library')
  if (rawExplanation) {
    // Prefer "Age 10-12" entry (story/concrete anchor).
    const ageMatch = /- \*\*Age 10[–-]12[^*]*\*\*:\s*([\s\S]+?)(?=\n- \*\*|\n##|$)/i.exec(rawExplanation)
    if (ageMatch) return ageMatch[1].trim().replace(/\s+/g, ' ')
    // Fallback: first bullet entry regardless of label.
    const firstMatch = /- \*\*[^*]+\*\*:\s*([\s\S]+?)(?=\n- \*\*|\n##|$)/.exec(rawExplanation)
    if (firstMatch) return firstMatch[1].trim().replace(/\s+/g, ' ')
  }

  // Try new Core Understanding format — return the first prose paragraph (≤400 chars).
  const rawCore = extractEBSection(content, 'Core Understanding')
  if (rawCore) {
    const firstPara = rawCore.split(/\n\n+/)[0]?.trim()
    if (firstPara && firstPara.length > 20) {
      return firstPara.replace(/\s+/g, ' ').slice(0, 400)
    }
  }

  return null
}

// ── P1: Teaching Sequence / Tutor Actions / Discovery / Assessment ──────────

/**
 * P1: Extracts the teaching sequence / teaching actions section.
 * All three format variants are tried in order:
 *   New:     "## Teaching Sequence"
 *   Old:     "## Teaching actions"
 *   Numbered:"## 9. Teaching Actions (...)"
 * Returns the raw authored text, trimmed to ≤600 chars to stay within budget.
 */
function parseEBTeachingSequence(content: string): string | null {
  const raw = extractEBSection(content, 'Teaching Sequence', 'Teaching actions', 'Teaching Actions')
  if (!raw) return null
  return raw.slice(0, 600).trim()
}

/**
 * P1: Extracts the Tutor Actions dispatch block (new format only).
 * Old format embeds actions inside the Teaching actions section; new format has
 * a dedicated "## Tutor Actions" block with compact WORKED-EXAMPLE / ANALOGY
 * dispatch notation. Returns null if absent (graceful for old-format entries).
 */
function parseEBTutorActions(content: string): string | null {
  const raw = extractEBSection(content, 'Tutor Actions')
  if (!raw) return null
  return raw.slice(0, 400).trim()
}

/**
 * P1: Extracts discovery questions / discovery lesson.
 * Returns the authored question bank for this concept (raw text, ≤500 chars).
 */
function parseEBDiscoveryQuestions(content: string): string | null {
  const raw = extractEBSection(content, 'Discovery Questions', 'Discovery lesson', 'Discovery Lesson')
  if (!raw) return null
  return raw.slice(0, 500).trim()
}

/**
 * P1: Extracts assessment signals / mastery gate cues.
 * Returns the authored mastery-gate description for this concept (≤500 chars).
 */
function parseEBAssessmentSignals(content: string): string | null {
  const raw = extractEBSection(content, 'Assessment Signals', 'Assessment')
  if (!raw) return null
  return raw.slice(0, 500).trim()
}

// ── Public API — EB Concept Entry (TQ-1 / TQ-2) ──────────────────────────────

/**
 * Loads and parses the EB Concept Entry for the given conceptId.
 * Returns { found: false } gracefully when no EB entry exists yet.
 * Never throws.
 */
export function loadEBConceptContext(conceptId: string): EBConceptContextResult {
  if (ebContextCache.has(conceptId)) {
    return { found: true, context: ebContextCache.get(conceptId)! }
  }

  const filePath = ebConceptEntryPath(conceptId)
  if (!filePath || !fs.existsSync(filePath)) {
    return { found: false, reason: `No EB concept entry for "${conceptId}"` }
  }

  let raw: string
  try {
    raw = fs.readFileSync(filePath, 'utf-8')
  } catch (err) {
    return { found: false, reason: `Failed to read EB entry: ${String(err)}` }
  }

  try {
    const { shrinkTo, triggers } = parseEBRecoveryNotes(raw)
    // P1 teaching plan fields: format-agnostic section extraction (see
    // parseEBTeachingSequence et al.) — not physics-specific. Previously
    // gated to conceptId.startsWith('phys.'), which silently discarded
    // these fields for every other subject's EB entries even when the
    // entry carried correctly-headed "## Teaching Sequence" / "## Tutor
    // Actions" / "## Discovery Questions" / "## Assessment Signals"
    // sections (as chemistry's 186 entries do). Gate removed so any
    // subject whose EB entry has these sections gets the same Teaching
    // Sequence Executor treatment as physics — no new architecture.
    const context: EBConceptContext = {
      conceptId,
      recoveryShrinkTo: shrinkTo,
      recoveryTriggers: triggers,
      antiAnalogies: parseEBAntiAnalogies(raw),
      voiceDetectionCues: parseEBVoiceDetectionCues(raw),
      openingScenario: parseEBOpeningScenario(raw),
      teachingSequence: parseEBTeachingSequence(raw),
      tutorActions: parseEBTutorActions(raw),
      discoveryQuestions: parseEBDiscoveryQuestions(raw),
      assessmentSignals: parseEBAssessmentSignals(raw),
    }
    ebContextCache.set(conceptId, context)
    return { found: true, context }
  } catch (err) {
    return { found: false, reason: `Failed to parse EB entry: ${String(err)}` }
  }
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
  ebContextCache.clear()
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
    let content: BlueprintContent
    if (isComponentFormat(rawContent)) {
      // Phase 2: Component-format blueprint (## Component N —).
      content = {
        conceptId,
        conceptSpine: extractComponentConceptSpine(rawContent),
        misconceptions: extractComponentMisconceptions(rawContent),
        explanations: extractComponentExplanations(rawContent),
      }
    } else if (isProtocolFormat(rawContent)) {
      // Protocol-format blueprint (## N. Title, ## 0. Concept Profile — 47 foundational blueprints).
      content = {
        conceptId,
        conceptSpine: extractProtocolConceptSpine(rawContent),
        misconceptions: extractProtocolMisconceptions(rawContent),
        explanations: extractProtocolExplanations(rawContent),
      }
    } else if (isSpineFormat(rawContent)) {
      // Spine-format blueprint (## 0. Concept Metadata, ## 1. Concept Spine — 24 blueprints).
      content = {
        conceptId,
        conceptSpine: extractSpineFormatConceptSpine(rawContent),
        misconceptions: extractSpineFormatMisconceptions(rawContent),
        explanations: extractSpineFormatExplanations(rawContent),
      }
    } else {
      // Section-format blueprint (## Section N — Name — 14 blueprints).
      content = {
        conceptId,
        conceptSpine: extractConceptSpine(rawContent),
        misconceptions: extractMisconceptions(rawContent),
        explanations: extractExplanations(rawContent),
      }
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
 * Pass `ebContext` (TQ-1/TQ-2) to also inject recovery notes, anti-analogies,
 * voice detection cues, and the opening scenario from the EB Concept Entry.
 *
 * Pass `currentStepBlock` (Option B — Teaching Sequence Executor,
 * src/lib/teaching/teachingSequenceExecutor.ts) to replace the full
 * "TEACHING PLAN" advisory dump with the runtime-selected CURRENT
 * step only. When omitted, the full advisory dump is used as before
 * (concepts without an executor-selected step, or with no Teaching Plan
 * at all — populated for any subject whose EB entry has these sections,
 * not physics-specific despite the historical "P1" name).
 *
 * Returns an empty string when content is empty (e.g. old-format blueprint).
 */
export function buildBlueprintContextBlock(
  content: BlueprintContent,
  ebContext?: EBConceptContext | null,
  currentStepBlock?: string | null,
): string {
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

  // TQ-2 — Opening scenario (concrete anchor before any formal definition)
  if (ebContext?.openingScenario) {
    if (!hasContent) {
      lines.push('\n\nBLUEPRINT CONTEXT')
      lines.push(`Concept: ${content.conceptId}`)
      hasContent = true
    }
    lines.push('\nOPENING SCENARIO — start with this concrete anchor before any formal definition:')
    lines.push(ebContext.openingScenario)
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

  // TQ-1 — Anti-analogies (avoid these — they install misconceptions)
  if (ebContext?.antiAnalogies && ebContext.antiAnalogies.length > 0) {
    if (!hasContent) {
      lines.push('\n\nBLUEPRINT CONTEXT')
      lines.push(`Concept: ${content.conceptId}`)
      hasContent = true
    }
    lines.push('\nANALOGIES TO AVOID — these are known to install misconceptions; do not use them:')
    for (const aa of ebContext.antiAnalogies) {
      lines.push(`• ${aa}`)
    }
  }

  // TQ-1 — Voice detection cues
  if (ebContext?.voiceDetectionCues && ebContext.voiceDetectionCues.length > 0) {
    if (!hasContent) {
      lines.push('\n\nBLUEPRINT CONTEXT')
      lines.push(`Concept: ${content.conceptId}`)
      hasContent = true
    }
    lines.push('\nVOICE DETECTION — if you hear these, act immediately:')
    for (const cue of ebContext.voiceDetectionCues) {
      lines.push(`• ${cue}`)
    }
  }

  // TQ-1 — Recovery notes
  const hasRecovery =
    ebContext?.recoveryShrinkTo ||
    (ebContext?.recoveryTriggers && ebContext.recoveryTriggers.length > 0)

  if (hasRecovery) {
    if (!hasContent) {
      lines.push('\n\nBLUEPRINT CONTEXT')
      lines.push(`Concept: ${content.conceptId}`)
      hasContent = true
    }
    lines.push('\nRECOVERY NOTES — when the student is stuck or confused:')
    if (ebContext!.recoveryShrinkTo) {
      lines.push(`Emergency anchor (shrink to this when fully stuck): ${ebContext!.recoveryShrinkTo}`)
    }
    for (const t of ebContext!.recoveryTriggers) {
      lines.push(`${t.label}: ${t.text}`)
    }
  }

  // P1 — Teaching Plan (Teaching Sequence + Tutor Actions + Discovery + Assessment).
  // Historical name "hasPhysicsPlan" kept (originally physics-only; the
  // isPhysics gate that limited these fields to phys.* concepts has been
  // removed from loadEBConceptContext — this now populates for any subject
  // whose EB entry carries the section, chemistry included).
  const hasPhysicsPlan =
    ebContext?.teachingSequence ||
    ebContext?.tutorActions ||
    ebContext?.discoveryQuestions ||
    ebContext?.assessmentSignals

  // Option B (Teaching Sequence Executor): when the runtime has already
  // selected a current step, inject ONLY that step's contract — never the
  // full sequence, never future steps. This is what turns the plan from
  // advisory text (LLM free to explain before discovery, skip/repeat steps)
  // into an executed, one-step-at-a-time contract. Falls back to the full
  // advisory dump when no contract is available, preserving existing
  // behavior for non-physics concepts and physics concepts without a plan.
  if (currentStepBlock) {
    if (!hasContent) {
      lines.push('\n\nBLUEPRINT CONTEXT')
      lines.push(`Concept: ${content.conceptId}`)
      hasContent = true
    }
    lines.push(currentStepBlock)
  } else if (hasPhysicsPlan) {
    if (!hasContent) {
      lines.push('\n\nBLUEPRINT CONTEXT')
      lines.push(`Concept: ${content.conceptId}`)
      hasContent = true
    }
    lines.push('\nTEACHING PLAN — follow this authored expert sequence for this concept:')
    if (ebContext!.teachingSequence) {
      lines.push('\nTEACHING SEQUENCE (follow this order — do not invent a different order):')
      lines.push(ebContext!.teachingSequence)
    }
    if (ebContext!.tutorActions) {
      lines.push('\nTUTOR ACTIONS (use these specific actions for this concept):')
      lines.push(ebContext!.tutorActions)
    }
    if (ebContext!.discoveryQuestions) {
      lines.push('\nDISCOVERY QUESTIONS (draw from this authored bank — do not invent new ones when these are provided):')
      lines.push(ebContext!.discoveryQuestions)
    }
    if (ebContext!.assessmentSignals) {
      lines.push('\nMASTERY SIGNALS (what mastery looks like for this specific concept):')
      lines.push(ebContext!.assessmentSignals)
    }
  }

  if (!hasContent) return ''

  lines.push('\nUse this blueprint context to teach accurately. Do not reference "the blueprint" or these section labels directly to the student.')
  return lines.join('\n')
}
