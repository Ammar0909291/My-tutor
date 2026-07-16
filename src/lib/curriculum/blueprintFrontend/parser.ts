/**
 * Blueprint Front-End — Parser (Markdown → BlueprintAST).
 *
 * The corpus grammar survey (Phase 2, 2026-07-16, 373 files) found the
 * authored corpus spans at least SEVEN structural generations:
 *
 *   1. "## Component N — Title", MC as "### MC-SLUG", TA as "### TA-N — T [..]"
 *      (phys.mech.angular-momentum family)
 *   2. "## Component N — Title", MC as "### MC-N: MC-SLUG" (dual-id), TA as
 *      bold "**TA-N — Title [P..]**" (phys.stat.boltzmann-factor family)
 *   3. "## N. Title" protocol format, TA as "**TA-A01 — Title**"
 *      (English blueprints)
 *   4. "## Component N: Title" colon separators, registry-TABLE misconceptions,
 *      TA as "### Teaching Action A01 — Title" (mathematics corpus, 154 files)
 *   5. "## C0 — Concept Metadata" shorthand components, padded-key fenced
 *      metadata ("concept_id        : x"), TA as table rows "| TA-1 | P01 |…"
 *      (expert physics batches, 16 files)
 *   6. "## Section N — Title", metadata as a "| Field | Value |" TABLE with
 *      Title-Case keys, TA as priority-table rows with no TA ids at all
 *      (phys.astro/phys.qm Section format, 16 files)
 *   7. "## Component N — Concept Identity" yaml-fenced metadata with NESTED
 *      difficulty ("difficulty:\n  label: advanced"), teaching flow as a
 *      fenced Session Flow Script with "[TA-1 — Title]" bracket lines
 *      (phys.em Identity format, ~50 files)
 *
 * Design rule (unchanged from Phase 1, now enforced harder): the parser
 * adapts to the corpus — never the reverse. Section LOCATION is keyword-based
 * over normalized titles; item extraction runs EVERY known shape and merges.
 * A new authoring generation should at most add a keyword or one shape regex.
 */
import type {
  BlueprintAST, BlueprintMetadata, BlueprintMisconception,
  BlueprintTeachingAction, ParseResult, Diagnostic, BlueprintSourceSpan,
} from './types'

// ── Section splitting (format-agnostic) ──────────────────────────────────────

interface RawSection {
  title: string
  body: string
  startLine: number
}

/** Numbering prefixes stripped from `## ` titles so downstream lookup sees a
 *  clean concern name. Handles: "Component 4 — X", "Component 4: X",
 *  "Component 4 - X", "Component 4 (continued) — X", "Component Zero — X",
 *  "Section 9 — X", "C0 — X", "0. X". Anything unrecognized passes through
 *  verbatim (generic "## Title" headers are legitimate sections too). */
const TITLE_PREFIX_RE = new RegExp(
  '^(?:' +
    '(?:Component|Section)\\s+(?:\\d+|Zero|One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten|Eleven|Twelve)' +
    '(?:\\s*\\(continued\\))?\\s*(?:—|:|-|\\.)\\s*' +
    '|C\\d{1,2}\\s*(?:—|:|-)\\s*' +
    '|\\d+\\.\\s+' +
  ')', 'i',
)

function splitSections(content: string): RawSection[] {
  const headerRe = /^##\s+(.+)$/gm
  const matches: Array<{ title: string; index: number }> = []
  let m: RegExpExecArray | null
  while ((m = headerRe.exec(content)) !== null) {
    const raw = m[1].trim()
    const title = raw.replace(TITLE_PREFIX_RE, '').trim() || raw
    matches.push({ title, index: m.index })
  }
  const sections: RawSection[] = []
  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index
    const end = i + 1 < matches.length ? matches[i + 1].index : content.length
    const startLine = content.slice(0, start).split('\n').length
    sections.push({ title: matches[i].title, body: content.slice(start, end), startLine })
  }
  return sections
}

function findSection(sections: RawSection[], keywordRe: RegExp): RawSection | null {
  return sections.find((s) => keywordRe.test(s.title)) ?? null
}

function findSections(sections: RawSection[], keywordRe: RegExp): RawSection[] {
  return sections.filter((s) => keywordRe.test(s.title))
}

// ── C0 metadata extraction ───────────────────────────────────────────────────

function extractFencedBlock(body: string): string | null {
  return /```(?:yaml|text)?\s*\n([\s\S]*?)```/.exec(body)?.[1] ?? null
}

/** Canonical key aliases — every payload format funnels through this map.
 *  Keys are normalized (lowercase, parentheticals dropped, non-alnum → _). */
const KEY_ALIASES: Record<string, string> = {
  concept_id: 'concept_id', blueprint_id: 'concept_id', id: 'concept_id',
  name: 'name', display_name: 'name', concept_name: 'name',
  difficulty: 'difficulty', kg_difficulty: 'difficulty', difficulty_label: 'difficulty',
  bloom: 'bloom', bloom_level: 'bloom', bloom_target: 'bloom',
  mastery_threshold: 'mastery_threshold', threshold: 'mastery_threshold',
  estimated_hours: 'estimated_hours', est_hours: 'estimated_hours', hours: 'estimated_hours',
  prerequisites: 'prerequisites', requires: 'prerequisites', prereqs: 'prerequisites',
  session_cap: 'session_cap',
  status: 'status', version: 'version',
}

function normalizeKey(rawKey: string): string | null {
  const k = rawKey
    .replace(/\(.*?\)/g, '')          // "requires (Tier-1)" → "requires"
    .replace(/[*`]/g, '')             // markdown emphasis only — underscores are snake_case!
    .trim().toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
  return KEY_ALIASES[k] ?? null
}

function cleanValue(v: string): string {
  return v.replace(/[*`]/g, '').trim()
}

/** Joins a `key: [a,\n  b, c]` bracket list that wraps across multiple lines
 *  into one logical line, so the per-line key:value pass below sees it whole
 *  (English/physics prerequisite lists commonly wrap for readability). */
function collapseBracketContinuations(text: string): string {
  return text.replace(/^([ \t]*[A-Za-z_][\w ()&/-]*?:[ \t]*\[)([\s\S]*?)(\])/gm, (whole, open, inner, close) => {
    return open + inner.replace(/\s*\n\s*/g, ' ') + close
  })
}

/** Normalizes a C0 payload — fenced block, markdown table, bullet list, or
 *  bare bold key-value lines — into canonical `key: value` pairs. */
function collectMetadataPairs(body: string): Map<string, string> {
  const pairs = new Map<string, string>()
  const put = (rawKey: string, rawValue: string) => {
    const key = normalizeKey(rawKey)
    const value = cleanValue(rawValue)
    if (key && value && !pairs.has(key)) pairs.set(key, value)
  }

  // 1. Fenced block: `key: value` lines, tolerant of padded keys
  //    ("concept_id        : x") and nested yaml children ("  label: advanced").
  const fenced = extractFencedBlock(body)
  if (fenced) {
    for (const line of collapseBracketContinuations(fenced).split('\n')) {
      const kv = /^\s*([A-Za-z_][\w ()&/-]*?)\s*:\s*(.+)$/.exec(line)
      if (kv) put(kv[1], kv[2])
    }
    // Nested difficulty label fallback: "difficulty:\n  label: advanced".
    if (!pairs.has('difficulty')) {
      const nested = /^\s*difficulty:\s*\n\s+(?:label|value):\s*(.+)$/im.exec(fenced)
      if (nested) put('difficulty', nested[1])
    }
  }

  // 2. Markdown table rows: "| Key | Value |" (skip header + separator rows).
  for (const row of body.matchAll(/^\|([^|\n]+)\|([^|\n]+)\|?.*$/gm)) {
    const keyCell = row[1].trim()
    if (/^[-—:\s]*$/.test(keyCell)) continue                      // separator row
    if (/^(field|key|property)$/i.test(keyCell.replace(/[*`]/g, '').trim())) continue // header row
    put(keyCell, row[2])
  }

  // 3. Bullet lists: "- **Key:** value" / "- Key: value" / "* Key — value".
  for (const b of body.matchAll(/^\s*[-*]\s+\*{0,2}([A-Za-z_][\w ()&/-]*?)\*{0,2}\s*[:—]\s*(.+)$/gm)) {
    put(b[1], b[2])
  }

  // 4. Bare bold pairs: "**Key:** value" (blueprint preamble convention).
  for (const kv of body.matchAll(/^\*\*([A-Za-z_][\w ()&/-]*?):?\*\*:?\s+(.+)$/gm)) {
    put(kv[1], kv[2])
  }

  // 5. Bare unfenced "key: value" lines (factor-theorem / Concept Profile
  //    families write the whole C0 payload as plain lines). Lowest priority —
  //    the alias whitelist keeps prose lines ("Note: …") from landing.
  for (const line of collapseBracketContinuations(body).split('\n')) {
    const kv = /^\s*([A-Za-z_][\w ()&/-]*?)\s*:\s*(.+)$/.exec(line)
    if (kv) put(kv[1], kv[2])
  }

  return pairs
}

function splitList(raw: string): string[] {
  // Separators observed in the corpus: comma, middot ("a · b"), semicolon.
  return raw
    .replace(/^\[|\]$/g, '')
    .split(/[,·;]/)
    .map((s) => s.trim().replace(/[*`]/g, ''))
    .filter((s) => s.length > 0 && !/^(none|n\/a|—|-)$/i.test(s))
}

/** YAML block list ("prerequisites:\n  - a\n  - b") inside a fenced payload. */
function yamlListField(fenced: string | null, ...keys: string[]): string[] {
  if (!fenced) return []
  for (const key of keys) {
    const yamlRe = new RegExp(`^\\s*${key}\\s*:\\s*\\n((?:\\s+-\\s+.+\\n?)+)`, 'mi')
    const yamlRaw = yamlRe.exec(fenced)?.[1]
    if (yamlRaw !== undefined) {
      return yamlRaw
        .split('\n')
        .map((line) => /^\s+-\s+(.+)$/.exec(line)?.[1]?.trim() ?? '')
        .filter((s) => s.length > 0)
    }
  }
  return []
}

const C0_SECTION_RE = /concept\s*(profile|metadata|identity)|^metadata(\s*(header|&.*))?$|identity\s*&/i

function extractMetadata(sections: RawSection[], source: string, conceptIdFromFilename: string): BlueprintMetadata {
  const c0 = findSection(sections, C0_SECTION_RE)
  // Fall back to the document preamble (text before the first ## section) —
  // some generations put "**ID:** x / **Status:** y" bold pairs there.
  const preamble = sections.length > 0 ? source.slice(0, source.indexOf('## ')) : source
  const body = c0?.body ?? ''

  const pairs = collectMetadataPairs(body)
  if (pairs.size === 0) {
    for (const [k, v] of collectMetadataPairs(preamble)) pairs.set(k, v)
  }

  const fenced = c0 ? extractFencedBlock(c0.body) : null
  let prerequisites = yamlListField(fenced, 'prerequisites', 'requires', 'prereqs')
  if (prerequisites.length === 0 && pairs.has('prerequisites')) {
    prerequisites = splitList(pairs.get('prerequisites')!)
  }

  const masteryThresholdStr = pairs.get('mastery_threshold')
  const estimatedHoursStr = pairs.get('estimated_hours')

  return {
    conceptId: pairs.get('concept_id') ?? conceptIdFromFilename,
    name: pairs.get('name') ?? '',
    difficultyRaw: pairs.get('difficulty') ?? '',
    bloom: pairs.get('bloom') ?? '',
    masteryThreshold: masteryThresholdStr ? parseFloat(masteryThresholdStr) : null,
    estimatedHours: estimatedHoursStr ? parseFloat(estimatedHoursStr) : null,
    prerequisites,
    sessionCapRaw: pairs.get('session_cap') ?? null,
    status: pairs.get('status') ?? '',
  }
}

// ── Teaching Actions extraction ──────────────────────────────────────────────

/** Section titles that CONTAIN teaching actions across all known generations. */
const TA_SECTION_RE =
  /teaching[\s-]*action|protocol\s*(a|b|c|library)\b|teaching\s*(flow|protocol)|teacher\s*action|instruction\s*sequence|session[\s-]*flow|action\s*sequence|lesson\s*composition/i

interface TaHit { id: string; title: string; bracket?: string; index: number }

/** Shape A/B/C — "### TA-x — Title [P..]", "**TA-x — Title [..]**",
 *  "### Teaching Action A01 — Title", "[TA-1 — Title]" script lines. */
const TA_SHAPES: Array<{ re: RegExp; id: (m: RegExpExecArray) => string; title: (m: RegExpExecArray) => string; bracket?: (m: RegExpExecArray) => string | undefined }> = [
  { // ### TA-x — Title [P..]   /   **TA-x — Title [..]**
    re: /^(?:#{2,4}\s+|\*\*)(TA-[A-Za-z0-9]+)\s*(?:—|-|·|:)\s*([^[\n*]+?)(?:\s*\[([^\]]*)\])?\s*\*{0,2}\s*$/gm,
    id: (m) => m[1], title: (m) => m[2].trim(), bracket: (m) => m[3],
  },
  { // ### Teaching Action A01 — Title  (mathematics corpus)
    re: /^#{2,4}\s+Teaching\s+Action\s+([A-Za-z]?\d+[A-Za-z]?)\s*(?:—|-|·|:)\s*([^\n]+?)\s*$/gim,
    id: (m) => `TA-${m[1]}`, title: (m) => m[2].trim(),
  },
  { // [TA-1 — Title ...]  bracket lines inside fenced Session Flow Scripts
    re: /^\[(TA-[A-Za-z0-9]+)\s*(?:—|-|·|:)\s*([^\]\n]+)\]\s*$/gm,
    id: (m) => m[1], title: (m) => m[2].trim(),
  },
  { // | TA-1 | P01 | Action-type | Detail |   table rows (C-shorthand C4)
    re: /^\|\s*(TA-[A-Za-z0-9]+)\s*\|([^|\n]*)\|([^|\n]*)(?:\|([^|\n]*))?.*$/gm,
    id: (m) => m[1],
    title: (m) => (m[3]?.trim() || m[2]?.trim() || '').slice(0, 120),
  },
  { // **TA-1 [P01 — Session Open]**  /  **TA-1 [EXPLAIN]:** Deliver ...
    // Bracket sits immediately after the id (no separator) — phys.em Identity
    // Session-Script and phys.mod Section-format Teaching Actions. Title
    // prefers the trailing prose after the closing bold; falls back to the
    // bracket content itself when the bracket IS the whole title (no trailer).
    re: /^\*\*(TA-[A-Za-z0-9]+)\s*\[([^\]]*)\]\s*:?\*\*:?\s*(.*)$/gm,
    id: (m) => m[1],
    title: (m) => (m[3]?.trim() || m[2]?.trim() || '').slice(0, 120),
    bracket: (m) => m[2],
  },
]

function extractTeachingActions(sections: RawSection[], file: string): BlueprintTeachingAction[] {
  const taSections = findSections(sections, TA_SECTION_RE)
  const haystack = taSections.length > 0
    ? taSections.map((s) => s.body).join('\n')
    : sections.map((s) => s.body).join('\n')

  const hits: TaHit[] = []
  const seen = new Set<string>()
  // Section-format priority-table rows are materialized directly (each row
  // is its own complete body); collected here, merged into the result below.
  const fromTableRows: BlueprintTeachingAction[] = []
  for (const shape of TA_SHAPES) {
    shape.re.lastIndex = 0
    let m: RegExpExecArray | null
    while ((m = shape.re.exec(haystack)) !== null) {
      const id = shape.id(m)
      if (seen.has(id)) continue
      seen.add(id)
      hits.push({ id, title: shape.title(m), bracket: shape.bracket?.(m), index: m.index })
    }
  }

  // Last-resort shapes, tried in order until one yields actions. Each row/line
  // carries its own complete body, so these materialize directly.
  const materialize = (sec: RawSection, rowIndex: number, id: string, title: string, text: string) => {
    const startLine = sec.startLine + sec.body.slice(0, rowIndex).split('\n').length - 1
    const primitives = [...new Set([...text.matchAll(/\bP\d{1,3}\b/g)].map((p) => p[0]))]
    const mcs = [...new Set([...text.matchAll(/\bMC-[A-Za-z0-9_-]+\b/g)].map((p) => p[0]))]
    fromTableRows.push({
      id, title: title.trim().slice(0, 120),
      primitives, referencedMisconceptionIds: mcs,
      span: { file, startLine, endLine: startLine },
    })
  }

  // Fallback A: a priority/action TABLE under a TA section with integer row
  // ids and no TA-x tokens anywhere (Section-format, e.g. phys.astro.*).
  if (hits.length === 0 && taSections.length > 0) {
    for (const sec of taSections) {
      const rowRe = /^\|\s*(\d{1,2})\s*\|\s*([^|\n]+)\|.*$/gm
      let row: RegExpExecArray | null
      while ((row = rowRe.exec(sec.body)) !== null) {
        const id = `TA-${row[1]}`
        if (seen.has(id)) continue
        seen.add(id)
        materialize(sec, row.index, id, row[2], row[0])
      }
    }
  }

  // Fallback B: Lesson-Composition/Session-Script stage lines — unindented
  // "[P01: session-open]" / "[P28: conflict-evidence] × 2" lines, each one an
  // action step whose primitive is the stage token (phys.em Identity format).
  if (hits.length === 0 && fromTableRows.length === 0 && taSections.length > 0) {
    let n = 0
    for (const sec of taSections) {
      const stageRe = /^\[(P\d{1,3})\s*[:—-]\s*([^\]\n]+)\](.*)$/gm
      let st: RegExpExecArray | null
      while ((st = stageRe.exec(sec.body)) !== null) {
        n += 1
        const id = `TA-${n}`
        if (seen.has(id)) continue
        seen.add(id)
        materialize(sec, st.index, id, st[2], st[0])
      }
    }
  }

  // Fallback C: plain BULLET actions under a TA section ("- Learner applies
  // formula … → trigger MC-1 bridge.") — Section-format prose actions.
  if (hits.length === 0 && fromTableRows.length === 0 && taSections.length > 0) {
    let n = 0
    for (const sec of taSections) {
      const bulletRe = /^[-*]\s+(.{10,})$/gm
      let b: RegExpExecArray | null
      while ((b = bulletRe.exec(sec.body)) !== null) {
        n += 1
        const id = `TA-${n}`
        if (seen.has(id)) continue
        seen.add(id)
        materialize(sec, b.index, id, b[1], b[0])
      }
    }
  }

  // Fallback D: numbered-list actions with a bold lead-in phrase
  // ("1. **Q-value review**: Confirm students can …") — phys.mod/phys.qm
  // Section-format Teaching Actions with no bullets, no TA-ids, no table.
  if (hits.length === 0 && fromTableRows.length === 0 && taSections.length > 0) {
    let n = 0
    for (const sec of taSections) {
      const numRe = /^\d+\.\s+\*\*([^*]+)\*\*:?\s*(.*)$/gm
      let nm: RegExpExecArray | null
      while ((nm = numRe.exec(sec.body)) !== null) {
        n += 1
        const id = `TA-${n}`
        if (seen.has(id)) continue
        seen.add(id)
        materialize(sec, nm.index, id, nm[1], nm[0])
      }
    }
  }

  // Fallback E: arrow-chained bracket stages, NOT line-anchored — a compact
  // "[P01 open] → [P41 diagnostic: …] → [MC-FOO: P28 conflict → P31 …]"
  // Session Flow, possibly several bracket stages per line and continuation
  // lines starting with "→ [...]" (phys.therm Narrative-Spine format). Each
  // bracket (whether it opens with a primitive or an MC id) is one action.
  if (hits.length === 0 && fromTableRows.length === 0 && taSections.length > 0) {
    let n = 0
    for (const sec of taSections) {
      const bracketRe = /\[((?:P\d{1,3}|MC-[A-Za-z0-9_-]+))\b([^\]]*)\]/g
      let br: RegExpExecArray | null
      while ((br = bracketRe.exec(sec.body)) !== null) {
        n += 1
        const id = `TA-${n}`
        if (seen.has(id)) continue
        seen.add(id)
        materialize(sec, br.index, id, br[2] || br[1], br[0])
      }
    }
  }

  hits.sort((a, b) => a.index - b.index)

  const actions: BlueprintTeachingAction[] = [...fromTableRows]
  for (let i = 0; i < hits.length; i++) {
    const cur = hits[i]
    const bodyStart = cur.index
    const bodyEnd = i + 1 < hits.length ? hits[i + 1].index : haystack.length
    const body = haystack.slice(bodyStart, bodyEnd)

    const primitiveSet = new Set<string>()
    if (cur.bracket) {
      for (const tok of cur.bracket.split(',')) {
        const p = /^P\d{1,3}$/.exec(tok.trim())
        if (p) primitiveSet.add(p[0])
      }
    }
    for (const p of body.matchAll(/\bP\d{1,3}\b/g)) primitiveSet.add(p[0])

    const mcSet = new Set<string>()
    for (const mc of body.matchAll(/\bMC-[A-Za-z0-9_-]+\b/g)) mcSet.add(mc[0])

    const startLine = haystack.slice(0, bodyStart).split('\n').length
    const endLine = haystack.slice(0, bodyEnd).split('\n').length

    actions.push({
      id: cur.id,
      title: cur.title,
      primitives: [...primitiveSet],
      referencedMisconceptionIds: [...mcSet],
      span: { file, startLine, endLine },
    })
  }
  return actions
}

// ── Misconceptions extraction ────────────────────────────────────────────────

const MC_SECTION_RE = /misconception/i
// Captures an OPTIONAL leading short numeric id ("MC-1:") separately from the
// long slug id, so dual-id headers ("### MC-1: MC-HIGHER-N-IS-LOWER-ENERGY")
// register BOTH spellings — the corpus references misconceptions by either
// form depending on which authoring pass wrote the citing teaching action.
const MC_HEADER_RE = /^#{2,4}\s+(?:(MC-?\d+)[:\s]+)?(MC-[A-Za-z0-9_-]+)[:\s]*(.*)$/gm
const MC_SHORT_HEADER_RE = /^#{2,4}\s+(MC-?\d+)[:\s]+(.*)$/gm
const MC_BULLET_RE = /^\s*[-*]?\s*\*\*(MC-[A-Za-z0-9_-]+)\*\*\s*[—:\-]?\s*(.*)$/gm
// Bold-PARAGRAPH definitions: "**MC-1 (FOUNDATIONAL) — The product is
// commutative.**" — the whole line is bold, so the id is not individually
// wrapped (math.found.* Register format).
const MC_BOLD_LINE_RE = /^\*\*(MC-[A-Za-z0-9]+)\s*(?:\([^)]*\))?\s*(?:—|:|-)\s*(.+?)\*\*\s*$/gm

function extractMisconceptions(sections: RawSection[], file: string): BlueprintMisconception[] {
  const mcSections = findSections(sections, MC_SECTION_RE)
  const haystack = mcSections.length > 0
    ? mcSections.map((s) => s.body).join('\n')
    : sections.map((s) => s.body).join('\n')

  const headerMatches: Array<{ id: string; label: string; index: number }> = []
  const seen = new Set<string>()

  // Shape 1: "### MC-SLUG (…)" and dual-id "### MC-N: MC-SLUG" headers — the
  // long slug is always registered; when a short numeric prefix is ALSO
  // present on the same line, it is registered too (same span) so a citing
  // teaching action may use either spelling.
  MC_HEADER_RE.lastIndex = 0
  let m: RegExpExecArray | null
  const dualIdLines = new Set<number>()
  while ((m = MC_HEADER_RE.exec(haystack)) !== null) {
    const shortId = m[1] ? (m[1].startsWith('MC-') ? m[1] : m[1].replace(/^MC/, 'MC-')) : null
    const longId = m[2]
    const label = m[3].replace(/^["(]+|[")]+$/g, '').replace(/^:\s*/, '').trim()
    if (!seen.has(longId)) {
      seen.add(longId)
      headerMatches.push({ id: longId, label, index: m.index })
    }
    if (shortId && !seen.has(shortId)) {
      seen.add(shortId)
      headerMatches.push({ id: shortId, label, index: m.index })
    }
    if (shortId) dualIdLines.add(m.index)
  }
  // Shape 1b: plain short headers "### MC-1: Some label" with NO slug id
  // (already handled above when a slug follows; this covers slug-less files).
  MC_SHORT_HEADER_RE.lastIndex = 0
  while ((m = MC_SHORT_HEADER_RE.exec(haystack)) !== null) {
    if (dualIdLines.has(m.index)) continue // already fully handled by Shape 1
    const id = m[1].startsWith('MC-') ? m[1] : m[1].replace(/^MC/, 'MC-')
    if (seen.has(id)) continue
    seen.add(id)
    headerMatches.push({ id, label: m[2].trim(), index: m.index })
  }
  // Shape 2: bold bullet definitions "- **MC-SLUG** — label".
  MC_BULLET_RE.lastIndex = 0
  while ((m = MC_BULLET_RE.exec(haystack)) !== null) {
    const id = m[1]
    if (seen.has(id)) continue
    seen.add(id)
    headerMatches.push({ id, label: m[2].trim(), index: m.index })
  }
  // Shape 2b: bold-paragraph definitions "**MC-1 (FOUNDATIONAL) — label.**".
  MC_BOLD_LINE_RE.lastIndex = 0
  while ((m = MC_BOLD_LINE_RE.exec(haystack)) !== null) {
    const id = m[1]
    if (seen.has(id)) continue
    seen.add(id)
    headerMatches.push({ id, label: m[2].trim(), index: m.index })
  }

  headerMatches.sort((a, b) => a.index - b.index)

  const out: BlueprintMisconception[] = []
  for (let i = 0; i < headerMatches.length; i++) {
    const cur = headerMatches[i]
    const nextMc = i + 1 < headerMatches.length ? headerMatches[i + 1].index : haystack.length
    const nextSection = haystack.indexOf('\n## ', cur.index)
    const end = nextSection !== -1 ? Math.min(nextMc, nextSection) : nextMc
    const body = haystack.slice(cur.index, end).trim()
    const startLine = haystack.slice(0, cur.index).split('\n').length
    const endLine = haystack.slice(0, end).split('\n').length
    out.push({ id: cur.id, label: cur.label, body, span: { file, startLine, endLine } })
  }

  // Shape 3: registry-table rows "| MC-1 | LABEL | … |" (math + C-shorthand).
  // Runs even when headers were found — a file may define some MCs in a table
  // and elaborate others under headers; the seen-set prevents duplicates.
  for (const sec of mcSections) {
    const rowRe = /^\|\s*(MC-[A-Za-z0-9_-]+)\s*\|\s*([^|]+)\|([^\n]*)$/gm
    let row: RegExpExecArray | null
    while ((row = rowRe.exec(sec.body)) !== null) {
      const id = row[1]
      if (seen.has(id)) continue
      seen.add(id)
      const startLine = sec.startLine + sec.body.slice(0, row.index).split('\n').length - 1
      out.push({
        id,
        label: row[2].replace(/\*/g, '').trim(),
        body: row[0].trim(),
        span: { file, startLine, endLine: startLine },
      })
    }
  }
  return out
}

// ── Public entry point ───────────────────────────────────────────────────────

/**
 * Parses blueprint markdown into a BlueprintAST. Never throws — parse
 * failures surface as diagnostics with a null ast, matching the brain-compiler
 * convention (`parse()` in `src/lib/brain-compiler/parser.ts`).
 */
export function parseBlueprintMarkdown(file: string, source: string, conceptIdFromFilename: string): ParseResult {
  const diagnostics: Diagnostic[] = []

  if (source.trim().length === 0) {
    diagnostics.push({ code: 'BF001', severity: 'E', message: `${file}: empty file` })
    return { ast: null, diagnostics }
  }

  const sections = splitSections(source)
  if (sections.length === 0) {
    diagnostics.push({
      code: 'BF002', severity: 'E',
      message: `${file}: no "## " section headers found at all`,
    })
    return { ast: null, diagnostics }
  }

  const metadata = extractMetadata(sections, source, conceptIdFromFilename)
  if (!metadata.conceptId) {
    diagnostics.push({ code: 'BF003', severity: 'E', message: `${file}: could not determine concept_id (missing C0 metadata block and filename fallback)` })
  }

  const teachingActions = extractTeachingActions(sections, file)
  const misconceptions = extractMisconceptions(sections, file)

  const span: BlueprintSourceSpan = { file, startLine: 1, endLine: source.split('\n').length }

  const ast: BlueprintAST = {
    conceptId: metadata.conceptId,
    sourceFile: file,
    metadata,
    teachingActions,
    misconceptions,
    sectionsFound: sections.map((s) => s.title),
    sections: sections.map((s) => ({ title: s.title, body: s.body, startLine: s.startLine })),
    span,
  }

  return { ast, diagnostics }
}
