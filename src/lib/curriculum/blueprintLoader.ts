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
 * PARSING IS SCHEMA-AWARE, NOT ORDINAL-KEYED (P0, 2026-08-05).
 *
 * The corpus contains several authoring generations that share the
 * "## Component N — Title" header grammar but order their components
 * differently, plus "## Section N — Title", "## N. Title" and "## C2 — Title"
 * variants. The loader previously dispatched on a format guess and then read
 * sections by ORDINAL POSITION, so any generation whose ordering differed from
 * the one the extractors were written against parsed to
 * `misconceptions: [], explanations: []` while still reporting `found: true` —
 * 958 of 1,333 blueprints (71.9%), including 214 of English's 216.
 *
 * The loader now:
 *   1. tokenizes every "## " heading into {ordinal, title, body}, whatever the
 *      heading grammar (parseSections / splitHeading);
 *   2. resolves sections BY MEANING against title vocabularies built from a
 *      census of the real corpus (MISCONCEPTION_SECTIONS / EXPLANATION_SECTIONS
 *      / SPINE_SECTIONS) — ordinals are retained but never load-bearing;
 *   3. reads fields tolerantly (readField): case-insensitive, with space,
 *      underscore and hyphen interchangeable, an optional [Pnn]/(Pnn) protocol
 *      tag, and bolded or plain bullet labels all accepted;
 *   4. reports any section that is PRESENT but yielded nothing via
 *      BlueprintContent.diagnostics, which loadBlueprintContent console.warn's.
 *      Silent data loss is a defect, never an outcome.
 *
 * Adding a new authoring generation therefore means adding a title pattern or
 * a field alias — not a new format branch. Coverage is locked by
 * src/tests/blueprintLoaderSchema.test.ts, which asserts zero diagnostics and
 * zero empty parses across the entire on-disk corpus.
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
  /** Concept spine (definition / why-it-matters), or null when unauthored. */
  conceptSpine: ConceptSpine | null
  /** Misconception entries. Empty ONLY when the blueprint authors none. */
  misconceptions: MisconceptionEntry[]
  /** Explanation entries. Empty ONLY when the blueprint authors none. */
  explanations: ExplanationEntry[]
  /**
   * Loud-failure channel. Non-empty means a role section was PRESENT in the
   * markdown but produced zero entries — the silent-data-loss condition that
   * cost 958 of 1,333 blueprints their authored content before the parser
   * became schema-aware. Each diagnostic is also console.warn'd once per
   * concept by loadBlueprintContent, and is asserted empty across the whole
   * corpus by src/tests/blueprintLoaderSchema.test.ts.
   *
   * Optional in the type so existing constructors of this shape keep
   * compiling; always populated by the loader itself.
   */
  diagnostics?: string[]
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

// ── Schema-aware section engine (P0 — replaces ordinal-keyed extractors) ─────
//
// WHY THIS EXISTS
// The previous extractors keyed on a section's ORDINAL POSITION within a
// format ("Component 1 is explanations, Component 3 is misconceptions").
// That is not a property the corpus guarantees. At least three authoring
// generations emit `## Component N — Title` headers with mutually
// incompatible orderings:
//
//   physics    Component 1 = Concept Explanation Blocks
//              Component 3 = Misconception Engine
//   english    Component 1 = Misconception Register        (≠ explanations)
//              Component 3 = Concrete Anchor [P06]         (≠ misconceptions)
//   mathematics Component 3 = Core Explanation
//              Component 6 = Misconception Registry
//
// Because `isComponentFormat()` only tested for the literal string
// "## Component 0 — ", all three matched the physics extractors, and the two
// that did not share physics' ordering silently produced
// `misconceptions: [], explanations: []` while still reporting `found: true`.
// Measured impact before this change: 958 of 1,333 blueprints (71.9%) parsed
// to empty content, including 214 of English's 216.
//
// The engine below resolves sections BY MEANING (heading title) rather than by
// ordinal, tolerates every heading grammar in the corpus, and parses fields
// case-, separator- and protocol-tag-insensitively. Ordinals are still read
// and retained, but are never load-bearing.

/** One `## ` section of a blueprint, normalized across every heading grammar. */
interface BlueprintSection {
  /** Ordinal when the heading carried one (`Component 3`, `Section 4`, `6.`). */
  ordinal: number | null
  /** Heading text with any ordinal prefix removed. */
  title: string
  /** Match key: lowercased, protocol tags and punctuation stripped. */
  key: string
  /** Everything between this heading and the next `## ` heading. */
  body: string
}

/**
 * Splits a `## ` heading into its optional ordinal and its title.
 * Handles every prefix grammar present in the corpus:
 *   "Component 3 — Concrete Anchor [P06]"   → 3, "Concrete Anchor [P06]"
 *   "Section 4 — Misconception Library"     → 4, "Misconception Library"
 *   "6. Misconception Engine"               → 6, "Misconception Engine"
 *   "Misconception Library"                 → null, "Misconception Library"
 */
function splitHeading(raw: string): { ordinal: number | null; title: string } {
  const labelled = /^(?:component|section|part|module)\s+(\d+)\s*[—–\-:.]*\s*(.*)$/i.exec(raw)
  if (labelled) return { ordinal: Number(labelled[1]), title: labelled[2].trim() }

  const numbered = /^(\d+)\s*[.)]\s*(.*)$/.exec(raw)
  if (numbered) return { ordinal: Number(numbered[1]), title: numbered[2].trim() }

  // Abbreviated component headers used by ~20 phys.qm/phys.stat blueprints:
  // "## C2 — Misconception Register", "## S4 — …".
  const abbreviated = /^[A-Z]{1,2}(\d+)\s*[—–\-:.]+\s*(.+)$/.exec(raw)
  if (abbreviated) return { ordinal: Number(abbreviated[1]), title: abbreviated[2].trim() }

  return { ordinal: null, title: raw.trim() }
}

/**
 * Normalizes a heading title for matching. Strips protocol tags ("[P06]",
 * "(P30)"), collapses all non-alphanumerics to single spaces, lowercases.
 * "Concrete Anchor [P06]" → "concrete anchor"
 * "Concept Explanation (Multi-Tier)" → "concept explanation multi tier"
 */
function normalizeHeadingKey(title: string): string {
  return title
    .replace(/[[(]\s*P\d+\s*[\])]/gi, ' ')
    .replace(/[^a-z0-9]+/gi, ' ')
    .trim()
    .toLowerCase()
}

/** Tokenizes a blueprint into its `## ` sections. Format-agnostic. */
function parseSections(content: string): BlueprintSection[] {
  const heads: Array<{ start: number; end: number; raw: string }> = []
  const re = /^##[ \t]+(.+?)[ \t]*$/gm
  let m: RegExpExecArray | null
  while ((m = re.exec(content)) !== null) {
    heads.push({ start: m.index, end: m.index + m[0].length, raw: m[1] })
  }

  return heads.map((h, i) => {
    const bodyEnd = i + 1 < heads.length ? heads[i + 1].start : content.length
    const { ordinal, title } = splitHeading(h.raw)
    return { ordinal, title, key: normalizeHeadingKey(title), body: content.slice(h.end, bodyEnd).trim() }
  })
}

/**
 * Returns every section whose key matches one of `patterns`, ordered by
 * pattern priority (earlier pattern = higher priority), then by document
 * order. Priority matters when a blueprint carries both a registry and a
 * repair protocol — e.g. "Misconception Register" must outrank
 * "Protocol B (Misconception Repair)".
 */
function sectionsByRole(sections: BlueprintSection[], patterns: RegExp[]): BlueprintSection[] {
  const out: BlueprintSection[] = []
  for (const pattern of patterns) {
    for (const s of sections) {
      if (pattern.test(s.key) && !out.includes(s)) out.push(s)
    }
  }
  return out
}

// Role vocabularies, highest priority first. Every entry below was taken from
// an actual heading census of docs/curriculum/blueprints (1,333 files) — none
// is speculative.
const MISCONCEPTION_SECTIONS = [
  /^misconception (registry|register|engine|library|profiles)/,
  /^misconceptions?$/,
  /\bmisconception\b/,
]

const EXPLANATION_SECTIONS = [
  /^concept explanation/,
  /^explanation library$/,
  /^explanations?$/,
  /^core explanation/,
  /^conceptual development sequence/,
  /^concrete anchor/,
  /^narrative spine/,
  /^learning objectives?$/,
  /\bexplanation\b/,
]

const SPINE_SECTIONS = [
  /^concept spine$/,
  /^core idea/,
  /^concept profile$/,
  /^concept metadata$/,
  /^concept identity/,
  /^concept snapshot$/,
  /^metadata/,
  /^cognitive map$/,
  /^learning objectives?$/,
]

// ── Tolerant field reading ────────────────────────────────────────────────────
//
// The same logical field is spelled differently by each generation:
//   **trigger_signal:**        (physics Misconception Engine)
//   **Trigger signal:**        (english Misconception Register, physics Profiles)
//   **Probe question:**        (Section format)
//   - **Probe:**               (Spine format)
//   **Bridge (P30):**          (Section format — parentheses)
//   **Bridge text [P30]:**     (english — brackets)
//   **bridge_text [P30]:**     (physics)
//
// readField() treats underscore and space as equivalent, ignores case, and
// tolerates an optional [Pnn]/(Pnn) protocol tag and an optional leading
// list bullet. This is what makes the parser generation-proof rather than
// generation-specific.

/**
 * Builds the alias fragment: "bridge text" → "bridge[\s_-]+text".
 * Space, underscore and hyphen are all treated as the same separator, so
 * "one sentence definition" matches "One-sentence definition",
 * "One_sentence_definition" and "one sentence definition" alike.
 */
function aliasPattern(alias: string): string {
  return alias.trim().split(/\s+/).map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('[\\s_-]+')
}

/**
 * Reads the first field in `block` matching any of `aliases`.
 * Returns '' when no alias is present — callers decide whether that is fatal.
 */
function readField(block: string, aliases: string[]): string {
  for (const alias of aliases) {
    const pat = aliasPattern(alias)
    const tag = `(?:[ \\t]*[[(][ \\t]*P\\d+[ \\t]*[\\])])?`
    const stop = `(?=\\n[ \\t]*(?:[-*+][ \\t]*)?\\*\\*|\\n[ \\t]*[-*+][ \\t]*[A-Z][^\\n:]{0,40}:|\\n[ \\t]*#{2,}|\\n[ \\t]*---|$)`

    const candidates = [
      // **Label [Pnn]:**  /  - **Label:**  — colon inside or outside the bold
      `(?:^|\\n)[ \\t]*(?:[-*+][ \\t]*)?\\*\\*[ \\t]*${pat}${tag}[ \\t]*:?[ \\t]*\\*\\*[ \\t]*:?[ \\t]*([\\s\\S]*?)${stop}`,
      // - Label: value  — unbolded bullet fields (math.found.* generation)
      `(?:^|\\n)[ \\t]*[-*+][ \\t]*${pat}${tag}[ \\t]*:[ \\t]*([\\s\\S]*?)${stop}`,
    ]

    for (const source of candidates) {
      const hit = new RegExp(source, 'i').exec(block)
      if (hit) {
        const value = hit[1].trim().replace(/^"|"$/g, '').replace(/\s+/g, ' ').trim()
        if (value) return value
      }
    }
  }
  return ''
}

/** Humanizes a slug id: "MC-C-AND-G-ARE-SINGLE" → "C And G Are Single". */
function humanizeSlug(slug: string): string {
  return slug
    .replace(/^MC[-–—]?/i, '')
    .replace(/[-_]+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase())
}

/** First quoted span, else first sentence — used when no explicit phrase field. */
function derivePhrase(probe: string): string {
  const quoted = /"([^"]{10,})"/.exec(probe)
  if (quoted) return quoted[1].trim()
  return probe.split(/(?<=[.!?])\s/)[0]?.trim() ?? ''
}

// ── Misconception extraction ──────────────────────────────────────────────────

const PROBE_ALIASES = [
  'trigger signal', 'probe question', 'probe', 'observable symptom',
  'conflict evidence', 'detection', 'symptom', 'trigger',
]
const PHRASE_ALIASES = [
  'characteristic phrase', 'diagnostic phrase', 'student says', 'student phrase',
]
const BRIDGE_ALIASES = [
  'bridge text', 'bridge', 'repair chain', 'correction path', 'repair', 'correction',
  'root cause',
]
const REPLACEMENT_ALIASES = [
  'replacement text', 'replacement concept', 'correct understanding', 'replacement', 'install',
]

/**
 * Parses `### MC-…` entry blocks. Covers every heading shape in the corpus:
 *   ### MC-1: "Title"          ### MC-1 — Title
 *   ### MC-1: Title            ### MC-SERIES-CAPACITORS-ADD-DIRECTLY
 * Numeric ids are preserved verbatim; slug ids are renumbered sequentially
 * (MC-1, MC-2, …) with the slug humanized into the title, matching the
 * long-standing behaviour of the physics Component extractor.
 */
function extractMisconceptionBlocks(body: string): MisconceptionEntry[] {
  // Two header grammars carry MC entries:
  //   ### MC-…                       (component / spine / section / protocol)
  //   **MC-1 (FOUNDATIONAL) — Title**  (math.found.* bold-header generation)
  const headerGrammars = [
    /^###[ \t]+(MC[-–—]?[A-Za-z0-9][A-Za-z0-9_-]*)[ \t]*(?:[:—–-][ \t]*)?(.*)$/gm,
    /^\*\*(MC[-–—]?[A-Za-z0-9][A-Za-z0-9_-]*)[^*\n—–]*?[—–:-][ \t]*([^*\n]+?)\*\*[ \t]*$/gm,
  ]

  let heads: Array<{ start: number; end: number; id: string; title: string }> = []
  for (const proto of headerGrammars) {
    const re = new RegExp(proto.source, proto.flags)
    const found: typeof heads = []
    let m: RegExpExecArray | null
    while ((m = re.exec(body)) !== null) {
      found.push({ start: m.index, end: m.index + m[0].length, id: m[1].trim(), title: m[2].trim() })
    }
    if (found.length > 0) { heads = found; break }
  }
  if (heads.length === 0) return []

  return heads.map((h, i) => {
    const block = body.slice(h.end, i + 1 < heads.length ? heads[i + 1].start : body.length)
    const isNumeric = /^MC[-–—]?\d+$/i.test(h.id)
    const title = (h.title.replace(/^"|"$/g, '').trim() || humanizeSlug(h.id)) || `Misconception ${i + 1}`
    const probe = readField(block, PROBE_ALIASES)
    const phrase = readField(block, PHRASE_ALIASES) || derivePhrase(probe)
    return {
      id: isNumeric ? h.id.replace(/^MC[-–—]?/i, 'MC-') : `MC-${i + 1}`,
      title,
      probeQuestion: probe,
      characteristicPhrase: phrase,
      bridge: readField(block, BRIDGE_ALIASES),
      replacementConcept: readField(block, REPLACEMENT_ALIASES),
    }
  })
}

/**
 * Parses the markdown-table misconception registry used by ~569 mathematics
 * blueprints: `| ID | Label | Description | Severity |`.
 *
 * Repair text for these lives in a sibling `### Protocol B — Repair Actions`
 * list (`- **B01 (targets MC-1)**: …`) inside the SAME section body, so it is
 * matched back onto each row here rather than being discarded.
 */
function extractMisconceptionTable(body: string): MisconceptionEntry[] {
  const rows = body.split('\n').map(l => l.trim()).filter(l => l.startsWith('|') && l.endsWith('|'))
  if (rows.length < 2) return []

  /**
   * Splits a table row into cells on WHITESPACE-DELIMITED pipes only.
   *
   * Physics blueprints embed Dirac notation directly in table cells
   * ("|ψ⟩ = Σcₙ|n⟩"). Those pipes have no surrounding space, whereas every
   * genuine column delimiter in the corpus does. Splitting naively on "|"
   * shredded those rows into the wrong columns and silently truncated the
   * misconception text at the first ket.
   */
  const cells = (row: string): string[] => {
    const inner = row.replace(/^\|/, '').replace(/\|$/, '')
    // Strict pass: a delimiter has whitespace on BOTH sides. "|ψ⟩" (space
    // before, glyph after) and "Σcₙ|n⟩" (no space either side) both survive.
    const strict = inner.split(/[ \t]\|[ \t]/).map(c => c.trim())
    if (strict.length > 1) return strict
    // Fall back to a naive split for tables authored without padding.
    return inner.split('|').map(c => c.trim())
  }

  const header = cells(rows[0]).map(h => h.toLowerCase())
  const idCol = header.findIndex(h => /^id$/.test(h))
  const labelCol = header.findIndex(h => /label|^name$/.test(h))
  const descCol = header.findIndex(h =>
    /description|detail|belief|misconception|statement|surface pattern|pattern|symptom|behaviou?r/.test(h))
  const phraseCol = header.findIndex(h =>
    /diagnostic phrase|characteristic phrase|^phrase|trigger/.test(h))
  const bridgeCol = header.findIndex(h => /root cause|^cause|repair|bridge/.test(h))
  const fixCol = header.findIndex(h =>
    /correct understanding|correction|replacement|^fix/.test(h))
  if (idCol === -1 || (labelCol === -1 && descCol === -1)) return []

  // Repair actions keyed by the MC id they target.
  const repairs = new Map<string, string>()
  const repairRe = /^[ \t]*[-*+][ \t]*\*\*[^*]*?\(targets[ \t]+(MC[-–—]?\d+)\)\*\*[ \t]*:?[ \t]*([\s\S]*?)(?=\n[ \t]*[-*+][ \t]*\*\*|\n[ \t]*#{2,}|$)/gim
  let r: RegExpExecArray | null
  while ((r = repairRe.exec(body)) !== null) {
    repairs.set(r[1].toUpperCase().replace(/^MC[-–—]?/, 'MC-'), r[2].trim().replace(/\s+/g, ' '))
  }

  const entries: MisconceptionEntry[] = []
  for (const row of rows.slice(1)) {
    // Skip the markdown separator row (|---|---|), whose pipes carry no
    // surrounding whitespace and so survive the cell splitter as one blob.
    if (/^[|\s:-]+$/.test(row)) continue
    const c = cells(row)
    const rawId = (c[idCol] ?? '').replace(/`/g, '').trim()
    // Numeric ids (MC-1) are kept verbatim; slug ids (MC-DM-MIXED-IS-…) are
    // renumbered sequentially, matching extractMisconceptionBlocks.
    if (!/^MC[-–—]/i.test(rawId)) continue
    const numeric = /^MC[-–—]?\d+$/i.test(rawId)
    const id = numeric ? rawId.toUpperCase().replace(/^MC[-–—]?/, 'MC-') : `MC-${entries.length + 1}`
    const label = labelCol >= 0 ? c[labelCol] ?? '' : ''
    const description = descCol >= 0 ? c[descCol] ?? '' : ''
    const phrase = phraseCol >= 0 ? c[phraseCol] ?? '' : ''
    const fix = fixCol >= 0 ? c[fixCol] ?? '' : ''
    const title =
      (label ? humanizeSlug(label) : '') ||
      (!numeric ? humanizeSlug(rawId) : '') ||
      description.slice(0, 80) ||
      id
    entries.push({
      id,
      title,
      probeQuestion: description,
      characteristicPhrase: phrase || derivePhrase(description) || description.slice(0, 80),
      bridge: repairs.get(id) || (bridgeCol >= 0 ? c[bridgeCol] ?? '' : ''),
      replacementConcept: fix,
    })
  }
  return entries
}

// ── Explanation extraction ────────────────────────────────────────────────────

/**
 * Block-lead grammars for explanation entries, in priority order. Each capture
 * pair is (id, label). Every pattern below corresponds to a real, counted
 * grammar in the corpus.
 */
const EXPLANATION_BLOCK_RES: RegExp[] = [
  // ### Explanation A — Intuitive        (Section format)
  /^###[ \t]+Explanation[ \t]+([A-Z0-9]+)[ \t]*[—–:-][ \t]*(.+)$/gm,
  // **Explanation A — Intuitive:**       (Spine format)
  /^\*\*Explanation[ \t]+([A-Z0-9]+)[ \t]*[—–:-][ \t]*([^*]+?)\*\*:?[ \t]*$/gm,
  // ### Block 1-A — Title                (physics Component)
  /^###[ \t]+Block[ \t]+[\d]+[-.]([A-Z0-9]+)[ \t]*[—–:-][ \t]*(.+)$/gm,
  // **TA-1 — Title [C]**                 (english Conceptual Development Sequence)
  /^\*\*(TA-\d+)[ \t]*[—–:-][ \t]*([^*]+?)\*\*[ \t]*$/gm,
  // **Anchor scene — Title**             (english Concrete Anchor)
  /^\*\*(Anchor scene)[ \t]*[—–:-][ \t]*([^*]+?)\*\*[ \t]*$/gm,
]

/** Splits a section body on the first block grammar that matches it. */
function extractExplanationBlocks(body: string): ExplanationEntry[] {
  for (const proto of EXPLANATION_BLOCK_RES) {
    const re = new RegExp(proto.source, proto.flags)
    const heads: Array<{ start: number; end: number; id: string; label: string }> = []
    let m: RegExpExecArray | null
    while ((m = re.exec(body)) !== null) {
      heads.push({ start: m.index, end: m.index + m[0].length, id: m[1].trim(), label: m[2].trim() })
    }
    if (heads.length === 0) continue
    return heads.map((h, i) => ({
      id: h.id,
      label: h.label,
      text: body.slice(h.end, i + 1 < heads.length ? heads[i + 1].start : body.length).trim(),
    }))
  }
  return []
}

/**
 * Fallback for prose sections that carry no block grammar — notably the ~382
 * mathematics "Core Explanation" sections, which are bold-lead paragraphs:
 *   **The minimal polynomial requires three conditions**: <prose>
 * Each bold lead-in becomes one explanation entry. If there are no bold
 * lead-ins either, the whole section becomes a single entry, which is what
 * guarantees a present section can never parse to zero.
 */
function extractExplanationProse(body: string, sectionTitle: string): ExplanationEntry[] {
  const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const re = /^\*\*([^*\n]{3,160}?)\*\*[ \t]*:?[ \t]*/gm
  const heads: Array<{ start: number; end: number; label: string }> = []
  let m: RegExpExecArray | null
  while ((m = re.exec(body)) !== null) {
    heads.push({ start: m.index, end: m.index + m[0].length, label: m[1].trim() })
  }

  if (heads.length > 0) {
    const entries: ExplanationEntry[] = []

    // Prose sitting BEFORE the first bold lead-in is real explanation text and
    // must not be dropped just because it carries no label of its own.
    const preamble = body.slice(0, heads[0].start).trim()
    if (preamble.length > 0) entries.push({ id: 'A', label: sectionTitle, text: preamble })

    heads.forEach((h, i) => {
      const text = body.slice(h.end, i + 1 < heads.length ? heads[i + 1].start : body.length).trim()
      if (text.length > 0) {
        entries.push({ id: LETTERS[entries.length] ?? `X${entries.length}`, label: h.label, text })
      }
    })
    return entries
  }

  const text = body.trim()
  return text.length > 0 ? [{ id: 'A', label: sectionTitle, text }] : []
}

// ── Concept spine extraction ──────────────────────────────────────────────────

const DEFINITION_ALIASES = ['one sentence definition', 'core claim', 'core idea', 'definition', 'concept statement']
const WHY_ALIASES = ['why it matters', 'the core insight', 'core insight', 'significance', 'key vocabulary']

/**
 * Builds the ConceptSpine from the highest-priority identity/spine section.
 * Falls back through: explicit definition field → YAML `name`/`domain` block
 * (Component-format identity sections) → first bold lead-in → first paragraph.
 */
function extractSpine(sections: BlueprintSection[]): ConceptSpine | null {
  for (const s of sectionsByRole(sections, SPINE_SECTIONS)) {
    let definition = readField(s.body, DEFINITION_ALIASES)

    if (!definition) {
      const yaml = /```(?:yaml)?\s*([\s\S]*?)```/.exec(s.body)?.[1] ?? ''
      // Key spelling and colon spacing both vary by generation
      // ("name: X", "display_name      : X", "concept_name: X").
      const yamlField = (k: string): string =>
        new RegExp(`^[ \\t]*${k}[ \\t]*:[ \\t]*(.+)$`, 'im')
          .exec(yaml)?.[1]?.trim().replace(/^["']|["']$/g, '').replace(/\s+#.*$/, '') ?? ''
      const name = yamlField('name') || yamlField('display_name') || yamlField('concept_name')
      if (name) {
        const domain = yamlField('domain')
        definition = domain ? `${name} is a concept in ${domain}.` : `${name}.`
      }
    }

    if (!definition) {
      // `| Field | Value |` metadata tables — the generation used by ~580
      // mathematics blueprints, which carry no YAML block and no prose spine.
      const tableField = (k: string): string =>
        new RegExp(`^\\|\\s*${k}\\s*\\|\\s*([^|\\n]+?)\\s*\\|`, 'im')
          .exec(s.body)?.[1]?.replace(/`/g, '').trim() ?? ''
      const name = tableField('concept_name') || tableField('concept name') || tableField('name')
      if (name) {
        const domain = tableField('domain')
        definition = domain ? `${name} is a concept in ${domain}.` : `${name}.`
      }
    }

    if (!definition) {
      // Anchored to the section's FIRST non-empty line on purpose. Scanning the
      // whole body would happily return a mid-section label such as
      // "**Notation:**" in preference to the opening definitional paragraph
      // that precedes it.
      const firstLine = s.body.split('\n').map(l => l.trim()).find(l => l.length > 0) ?? ''
      const boldLead = /^(?:[-*+][ \t]*)?\*\*([^*\n]{3,200}?)\*\*[ \t]*:?[ \t]*(.*)$/.exec(firstLine)
      if (boldLead) definition = `${boldLead[1].trim()}${boldLead[2].trim() ? `: ${boldLead[2].trim()}` : ''}`
    }

    if (!definition) {
      // Paragraph fallback. Sub-headings are stripped rather than skipped so a
      // section that opens with "### Target Knowledge State" still yields its
      // prose instead of falling through to nothing.
      const para = s.body
        .split(/\n\s*\n/)
        .map(p => p.replace(/^(?:[ \t]*#{1,6}[^\n]*\n)+/, '').trim())
        .find(p => p.length > 20 && !p.startsWith('|') && !p.startsWith('```'))
      if (para) definition = para.replace(/\s+/g, ' ').slice(0, 400)
    }

    const whyItMatters = readField(s.body, WHY_ALIASES)
    const quantitiesTable = /(\|[^\n]+\|\n\|[-| :]+\|\n(?:\|[^\n]+\|\n?)+)/.exec(s.body)?.[1]?.trim() ?? null

    if (definition || whyItMatters) return { definition, whyItMatters, quantitiesTable }
  }
  return null
}

// ── Top-level content assembly ────────────────────────────────────────────────

/** Hard cap on explanation entries so a verbose section cannot flood the prompt. */
const MAX_EXPLANATIONS = 8

/**
 * Parses a blueprint's educational content using the schema-aware engine.
 *
 * `diagnostics` is the loud-failure channel required by the P0 remit: an entry
 * is appended whenever a role section IS PRESENT but yielded zero entries —
 * i.e. exactly the silent-data-loss condition this change exists to eliminate.
 */
export function parseBlueprintContent(conceptId: string, raw: string): BlueprintContent {
  const sections = parseSections(raw)
  const diagnostics: string[] = []

  const mcSections = sectionsByRole(sections, MISCONCEPTION_SECTIONS)
  let misconceptions: MisconceptionEntry[] = []
  for (const s of mcSections) {
    const parsed = extractMisconceptionBlocks(s.body)
    const entries = parsed.length > 0 ? parsed : extractMisconceptionTable(s.body)
    if (entries.length > 0) { misconceptions = entries; break }
  }
  if (misconceptions.length === 0 && mcSections.length > 0) {
    diagnostics.push(
      `misconception section(s) present but unparseable: ${mcSections.map(s => `"${s.title}"`).join(', ')}`,
    )
  }

  const expSections = sectionsByRole(sections, EXPLANATION_SECTIONS)
  const explanations: ExplanationEntry[] = []
  for (const s of expSections) {
    if (explanations.length >= MAX_EXPLANATIONS) break
    const blocks = extractExplanationBlocks(s.body)
    const entries = blocks.length > 0 ? blocks : extractExplanationProse(s.body, s.title)
    for (const e of entries) {
      if (explanations.length >= MAX_EXPLANATIONS) break
      if (e.text.length > 0) explanations.push(e)
    }
  }
  if (explanations.length === 0 && expSections.length > 0) {
    diagnostics.push(
      `explanation section(s) present but unparseable: ${expSections.map(s => `"${s.title}"`).join(', ')}`,
    )
  }

  const conceptSpine = extractSpine(sections)
  if (!conceptSpine && sectionsByRole(sections, SPINE_SECTIONS).length > 0) {
    diagnostics.push('spine section present but yielded no definition')
  }

  return { conceptId, conceptSpine, misconceptions, explanations, diagnostics }
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
    // Schema-aware parse — one path for every authoring generation. Sections
    // are resolved by MEANING (heading title), never by ordinal position, so a
    // new generation that reorders its components cannot silently zero out its
    // own content the way the previous ordinal-keyed dispatch did.
    const content = parseBlueprintContent(conceptId, rawContent)

    // Fail loudly. A present-but-unparseable section is a parser defect, not a
    // sparse blueprint, and must never pass unnoticed again.
    for (const d of content.diagnostics ?? []) {
      console.warn(`[blueprintLoader] ${conceptId}: ${d}`)
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
