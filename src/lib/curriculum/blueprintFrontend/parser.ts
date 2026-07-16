/**
 * Blueprint Front-End — Parser (Markdown → BlueprintAST).
 *
 * The corpus audit (Phase 0) found the "Component-format" label covers at
 * least three structurally different header/numbering conventions in the
 * live 197-file corpus on `main`:
 *
 *   1. "## Component N — Title"  (angular-momentum.md: 10 components, one
 *      Misconception per "### MC-SLUG", TAs as "### TA-N — Title [...]")
 *   2. "## Component N — Title"  (boltzmann-factor.md: 16 components, a
 *      DIFFERENT internal layout — MC as "### MC-N: MC-SLUG", TAs as bold
 *      "**TA-N — Title [P.., P..]**" with primitives inline in brackets)
 *   3. "## N. Title"             (Protocol-format, e.g. English blueprints —
 *      TAs as bold "**TA-A01 — Title**" with a separate "Primitive sequence:"
 *      line, MC ids referenced inline in routing prose)
 *
 * This parser is deliberately format-agnostic: it locates C0-C9 CONCERNS by
 * keyword match against section titles (whatever numbering scheme is used),
 * and locates TA/MC entries by regex over TWO possible header shapes
 * (`### TA-x` / `**TA-x`) rather than assuming a fixed component number.
 * This is intentional — extending the corpus with a fourth numbering scheme
 * should not require a parser change, only a title keyword this file already
 * checks for.
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

const SECTION_HEADER_RE = /^##\s+(?:Component\s+\d+\s+—\s+|Section\s+\d+\s+—\s+|\d+\.\s+)(.+)$/gm

function splitSections(content: string): RawSection[] {
  const lines = content.split('\n')
  const matches: Array<{ title: string; index: number }> = []
  SECTION_HEADER_RE.lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = SECTION_HEADER_RE.exec(content)) !== null) {
    matches.push({ title: m[1].trim(), index: m.index })
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

// ── C0 metadata extraction ───────────────────────────────────────────────────

function extractFencedBlock(body: string): string | null {
  return /```(?:yaml|text)?\s*\n([\s\S]*?)```/.exec(body)?.[1] ?? null
}

/** Reads a scalar `key: value` field from a fenced metadata block. */
function scalarField(block: string, ...keys: string[]): string | null {
  for (const key of keys) {
    const re = new RegExp(`^${key}:\\s*(.+)$`, 'm')
    const v = re.exec(block)?.[1]?.trim()
    if (v) return v
  }
  return null
}

/** Reads a `key: [a, b, c]` field, tolerating multi-line bracket continuation. */
function listField(block: string, ...keys: string[]): string[] {
  for (const key of keys) {
    const re = new RegExp(`^${key}:\\s*\\[([\\s\\S]*?)\\]`, 'm')
    const raw = re.exec(block)?.[1]
    if (raw === undefined) continue
    return raw
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
  }
  return []
}

function extractMetadata(sections: RawSection[], conceptIdFromFilename: string): BlueprintMetadata {
  const c0 = findSection(sections, /concept (profile|metadata|identity)/i)
  const block = c0 ? extractFencedBlock(c0.body) : null

  if (!block) {
    return {
      conceptId: conceptIdFromFilename,
      name: '', difficultyRaw: '', bloom: '',
      masteryThreshold: null, estimatedHours: null,
      prerequisites: [], sessionCapRaw: null, status: '',
    }
  }

  const conceptId = scalarField(block, 'concept_id', 'id') ?? conceptIdFromFilename
  const name = scalarField(block, 'name') ?? ''
  const difficultyRaw = scalarField(block, 'difficulty') ?? ''
  const bloom = scalarField(block, 'bloom') ?? ''
  const masteryThresholdStr = scalarField(block, 'mastery_threshold')
  const estimatedHoursStr = scalarField(block, 'estimated_hours')
  const sessionCapRaw = scalarField(block, 'session_cap')
  const status = scalarField(block, 'status') ?? ''
  const prerequisites = listField(block, 'prerequisites', 'requires')

  return {
    conceptId,
    name,
    difficultyRaw,
    bloom,
    masteryThreshold: masteryThresholdStr ? parseFloat(masteryThresholdStr) : null,
    estimatedHours: estimatedHoursStr ? parseFloat(estimatedHoursStr) : null,
    prerequisites,
    sessionCapRaw,
    status,
  }
}

// ── C4 Teaching Actions extraction ───────────────────────────────────────────

const TA_HEADER_RE = /^(?:###\s+|\*\*)(TA-[A-Za-z0-9]+)\s*(?:—|-)\s*([^[\n*]+?)(?:\s*\[([^\]]*)\])?\s*\*{0,2}\s*$/gm

function extractTeachingActions(sections: RawSection[], file: string): BlueprintTeachingAction[] {
  const taSection =
    findSection(sections, /teaching action/i) ??
    findSection(sections, /protocol library/i) ??
    null
  // TAs may be scattered under a "Teaching Action Sequence" component OR
  // nested under per-state "Protocol A/B/..." subsections (Protocol-format).
  // Search the whole file body from that section onward if found, else the
  // full document (defensive — never silently return zero on a format we
  // haven't seen yet).
  const haystack = taSection ? taSection.body : sections.map((s) => s.body).join('\n')

  const headerMatches: Array<{ id: string; title: string; bracket: string | undefined; index: number }> = []
  TA_HEADER_RE.lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = TA_HEADER_RE.exec(haystack)) !== null) {
    headerMatches.push({ id: m[1], title: m[2].trim(), bracket: m[3], index: m.index })
  }

  const actions: BlueprintTeachingAction[] = []
  const seen = new Set<string>()
  for (let i = 0; i < headerMatches.length; i++) {
    const cur = headerMatches[i]
    if (seen.has(cur.id)) continue // duplicate header text matched twice by both header shapes
    seen.add(cur.id)
    const bodyStart = cur.index
    const bodyEnd = i + 1 < headerMatches.length ? headerMatches[i + 1].index : haystack.length
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

// ── C3 Misconceptions extraction ─────────────────────────────────────────────

const MC_HEADER_RE = /^###\s+(MC-[A-Za-z0-9_-]+)[:\s]*(.*)$/gm

function extractMisconceptions(sections: RawSection[], file: string): BlueprintMisconception[] {
  const mcSection =
    findSection(sections, /misconception/i) ??
    null
  const haystack = mcSection ? mcSection.body : sections.map((s) => s.body).join('\n')

  const out: BlueprintMisconception[] = []
  const seen = new Set<string>()
  MC_HEADER_RE.lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = MC_HEADER_RE.exec(haystack)) !== null) {
    const id = m[1]
    if (seen.has(id)) continue
    seen.add(id)
    const label = m[2].replace(/^["(]+|[")]+$/g, '').replace(/^:\s*/, '').trim()
    const startLine = haystack.slice(0, m.index).split('\n').length
    out.push({ id, label, span: { file, startLine, endLine: startLine } })
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
      message: `${file}: no recognizable section headers found (expected "## Component N — X", "## Section N — X", or "## N. X")`,
    })
    return { ast: null, diagnostics }
  }

  const metadata = extractMetadata(sections, conceptIdFromFilename)
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
    span,
  }

  return { ast, diagnostics }
}
