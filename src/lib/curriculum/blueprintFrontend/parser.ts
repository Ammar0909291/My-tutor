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

// Separators observed in the live corpus: "Component N — Title" (phys),
// "Component N: Title" (math, landed 2026-07-16), "Section N — Title",
// "N. Title" (protocol format), "CN — Title" (compact expert-physics format).
const SECTION_HEADER_RE = /^##\s+(?:Component\s+\d+\s*[—:]\s*|Section\s+\d+\s+—\s+|C\d+\s+—\s+|\d+\.\s+)(.+)$/gm

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

/** Reads a scalar `key: value` field from a fenced metadata block.
 *  Case-insensitive and indentation-tolerant: the math corpus authors
 *  `STATUS:` / nested `KG_FIELDS:` children with leading whitespace, and the
 *  compact expert-physics format pads keys (`concept_id        : value`). */
function scalarField(block: string, ...keys: string[]): string | null {
  for (const key of keys) {
    // [ \t]* after the colon (not \s*): a bare "key:" line must yield no
    // value, not swallow the newline and capture the nested child line.
    const re = new RegExp(`^\\s*${key}\\s*:[ \\t]*(.+)$`, 'mi')
    const v = re.exec(block)?.[1]?.trim()
    if (v) return v
  }
  return null
}

/** Reads a `key: [a, b, c]` field (multi-line bracket continuation tolerated)
 *  or a YAML block list (`key:` followed by `- item` lines — the Concept
 *  Identity variant, e.g. phys.em.*). */
function listField(block: string, ...keys: string[]): string[] {
  for (const key of keys) {
    const bracketRe = new RegExp(`^\\s*${key}\\s*:\\s*\\[([\\s\\S]*?)\\]`, 'mi')
    const raw = bracketRe.exec(block)?.[1]
    if (raw !== undefined) {
      return raw.split(',').map((s) => s.trim()).filter((s) => s.length > 0)
    }
    const yamlRe = new RegExp(`^\\s*${key}\\s*:\\s*\\n((?:\\s+-\\s+.+\\n?)+)`, 'mi')
    const yamlRaw = yamlRe.exec(block)?.[1]
    if (yamlRaw !== undefined) {
      return yamlRaw
        .split('\n')
        .map((line) => /^\s+-\s+(.+)$/.exec(line)?.[1]?.trim() ?? '')
        .filter((s) => s.length > 0)
    }
  }
  return []
}

/** Section-format metadata variant: a markdown table `| Field | Value |` in
 *  the C0 section (e.g. phys.astro.*) instead of a fenced key:value block. */
function tableField(body: string, ...labels: string[]): string | null {
  for (const label of labels) {
    const re = new RegExp(`^\\|\\s*\\*{0,2}${label}\\*{0,2}\\s*\\|\\s*([^|\\n]+)\\|?\\s*$`, 'mi')
    const v = re.exec(body)?.[1]?.trim()
    if (v) return v
  }
  return null
}

function extractMetadata(sections: RawSection[], conceptIdFromFilename: string): BlueprintMetadata {
  // The math corpus titles its C0 section just "Metadata".
  const c0 = findSection(sections, /concept (profile|metadata|identity)|^metadata$/i)
  // Protocol-format C0s author bare `key: value` lines with no fence — the
  // section body itself is the block then (scalarField keys are specific
  // enough that surrounding prose can't collide).
  const block = c0 ? (extractFencedBlock(c0.body) ?? (/^concept_id\s*:/m.test(c0.body) ? c0.body : null)) : null

  if (!block) {
    // Table-form C0 (Section-format corpus): read the same fields from
    // `| Field | Value |` rows before giving up.
    if (c0 && /^\|/m.test(c0.body)) {
      // Both label conventions appear in table C0s: Title-Case ("Concept ID",
      // phys.astro) and snake_case ("concept_id", math corpus).
      const masteryStr = tableField(c0.body, 'Mastery Threshold', 'mastery_threshold')
      const hoursStr = tableField(c0.body, 'Estimated Hours', 'Estimated study hours', 'estimated_hours')
      let prereqsRaw = tableField(c0.body, 'Prerequisites', 'prerequisites', 'requires \\(Tier-1\\)', 'requires') ?? ''
      if (!prereqsRaw) {
        // math variant: prerequisites live outside the table as a bold
        // "**prerequisites:** [a, b]" line in the same section.
        prereqsRaw = listField(c0.body.replace(/\*\*/g, ''), 'prerequisites', 'requires').join(', ')
      }
      return {
        conceptId: tableField(c0.body, 'Concept ID', 'concept_id') ?? conceptIdFromFilename,
        name: tableField(c0.body, 'Name', 'Display name', 'concept_name', 'name') ?? '',
        difficultyRaw: tableField(c0.body, 'Difficulty', 'difficulty') ?? '',
        bloom: tableField(c0.body, 'Bloom Level', 'Bloom', 'bloom') ?? '',
        masteryThreshold: masteryStr ? parseFloat(masteryStr) : null,
        estimatedHours: hoursStr ? parseFloat(hoursStr) : null,
        prerequisites: prereqsRaw
          .split(',').map((s) => s.trim()).filter((s) => s.length > 0 && s.toLowerCase() !== 'none'),
        sessionCapRaw: tableField(c0.body, 'Session Cap', 'session_cap', 'session_ta_cap'),
        status: tableField(c0.body, 'Status', 'status') ?? '',
      }
    }
    // Bullet-form C0: "- **Concept ID**: value" lines (phys.mod/qm/nuc corpus).
    if (c0 && /^-\s+\*\*Concept ID\*\*/m.test(c0.body)) {
      const bullet = (...labels: string[]): string | null => {
        for (const label of labels) {
          const re = new RegExp(`^-\\s+\\*\\*${label}\\*\\*\\s*:\\s*(.+)$`, 'mi')
          const v = re.exec(c0.body)?.[1]?.trim()
          if (v) return v
        }
        return null
      }
      const masteryStr = bullet('Mastery Threshold')
      const hoursStr = bullet('Estimated Hours')
      return {
        conceptId: bullet('Concept ID') ?? conceptIdFromFilename,
        name: bullet('Name') ?? '',
        difficultyRaw: bullet('Difficulty') ?? '',
        bloom: bullet('Bloom Level', 'Bloom') ?? '',
        masteryThreshold: masteryStr ? parseFloat(masteryStr) : null,
        estimatedHours: hoursStr ? parseFloat(hoursStr) : null,
        prerequisites: (bullet('Prerequisites') ?? '')
          .split(',').map((s) => s.trim()).filter((s) => s.length > 0 && s.toLowerCase() !== 'none'),
        sessionCapRaw: bullet('Session Cap'),
        status: bullet('Status') ?? '',
      }
    }
    return {
      conceptId: conceptIdFromFilename,
      name: '', difficultyRaw: '', bloom: '',
      masteryThreshold: null, estimatedHours: null,
      prerequisites: [], sessionCapRaw: null, status: '',
    }
  }

  const conceptId = scalarField(block, 'concept_id', 'BLUEPRINT_ID', 'id') ?? conceptIdFromFilename
  const name = scalarField(block, 'name', 'display_name', 'concept_name') ?? ''
  // Nested difficulty ("difficulty:\n  label: advanced" — phys.em yaml C0s)
  // falls back to the child label when no same-line value exists.
  const difficultyRaw = scalarField(block, 'difficulty', 'kg_difficulty') ??
    (/^\s*difficulty\s*:\s*\n\s+label\s*:\s*(.+)$/mi.exec(block)?.[1]?.trim() ?? '')
  const bloom = scalarField(block, 'bloom', 'bloom_target') ?? ''
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

// TA header separators in the corpus: "—" / "-" (phys, eng), "·" (math).
const TA_HEADER_RE = /^(?:###\s+|\*\*)(TA-[A-Za-z0-9]+)\s*(?:—|-|·)\s*([^[\n*]+?)(?:\s*\[([^\]]*)\])?\s*\*{0,2}\s*$/gm

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
  // Bracket-titled bold headers: "**TA-3 [P28 — Conflict Evidence: MC-1]**"
  // (phys.opt.* Session Script) and "**TA-1 [EXPLAIN]:** description"
  // (phys.stat.* Teaching Actions). Title = bracket text after any P-code.
  const bracketBoldRe = /^\*\*(TA-[A-Za-z0-9]+)\s*\[([^\]]*)\]\s*:?\s*\*\*/gm
  while ((m = bracketBoldRe.exec(haystack)) !== null) {
    const title = m[2].replace(/^P\d{1,3}\s*(?:—|-|:)?\s*/, '').trim() || m[1]
    headerMatches.push({ id: m[1], title, bracket: m[2], index: m.index })
  }
  // Long-form headers: "### Teaching Action A01 — Title" (math corpus) —
  // canonical id TA-A01, matching how routing prose cites them.
  const longFormRe = /^###\s+Teaching Action\s+([A-Za-z0-9]+)\s*(?:—|-|·)\s*(.+)$/gm
  while ((m = longFormRe.exec(haystack)) !== null) {
    headerMatches.push({ id: `TA-${m[1]}`, title: m[2].trim(), bracket: undefined, index: m.index })
  }
  headerMatches.sort((a, b) => a.index - b.index)

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
  if (actions.length > 0) return actions

  // ── Fallback shapes (each observed in the live physics corpus) ────────────

  // Shape 2 — bracket-TA lines inside a Session Flow Script fence:
  //   "[TA-1 — AC waveform and RMS: Block 1-A]" (phys.em.* Session Flow).
  // Each TA's body runs to the next bracket-TA line, so the [P..] primitive
  // lines that FOLLOW a TA (repairs, check-ins) attribute to it in sequence.
  const bracketTa = extractFromMatches(
    haystack, file,
    /^\[(TA-[A-Za-z0-9]+)\s*(?:—|-|:)\s*([^\]]+)\]\s*$/gm,
  )
  if (bracketTa.length > 0) return bracketTa

  // Shape 3 — table rows with explicit TA ids:
  //   "| TA-1 | P04 | Physical motivation | …detail… |" (compact C-format).
  const tableTa = extractFromTableRows(haystack, file)
  if (tableTa.length > 0) return tableTa

  // Shape 4 — numbered priority table under the Teaching Actions section:
  //   "| 1 | Compute tidal force … | trigger |" (Section-format, phys.astro.*).
  // Only inside an explicit TA section — a numbered table elsewhere is data.
  if (taSection) {
    const numbered = extractFromNumberedRows(taSection.body, file)
    if (numbered.length > 0) return numbered
  }

  // Shape 4b — numbered bold list under the Teaching Actions section:
  //   "1. **Operator concept**: Introduce operator as …" (phys.qm/mod corpus).
  if (taSection) {
    const out: BlueprintTeachingAction[] = []
    const itemRe = /^\d{1,2}\.\s+\*\*([^*]+)\*\*\s*:?\s*([^\n]*)$/gm
    let item: RegExpExecArray | null
    while ((item = itemRe.exec(taSection.body)) !== null) {
      const whole = item[0]
      const startLine = taSection.startLine + taSection.body.slice(0, item.index).split('\n').length - 1
      out.push({
        id: `TA-${out.length + 1}`,
        title: item[1].trim(),
        primitives: [...new Set([...whole.matchAll(/\bP\d{1,3}\b/g)].map((p) => p[0]))],
        referencedMisconceptionIds: [...new Set([...whole.matchAll(/\bMC-[A-Za-z0-9_-]+\b/g)].map((p) => p[0]))],
        span: { file, startLine, endLine: startLine },
      })
    }
    if (out.length > 0) return out
  }

  // Shape 5 — Lesson Composition Grammar stanzas: a fenced block of
  //   "[P01: session-open] → [P62: retrieval-seed] …" lines separated by
  // blank lines (phys.em.gauss-law style). One TA per stanza.
  const grammarSection = sections.find((s) => /lesson composition|session plan/i.test(s.title)) ??
    sections.find((s) => /session[- ]flow/i.test(s.title))
  if (grammarSection) {
    const fence = /```(?:text)?\s*\n([\s\S]*?)```/.exec(grammarSection.body)?.[1]
    if (fence) {
      const out: BlueprintTeachingAction[] = []
      let stanzas = fence.split(/\n\s*\n/).map((s) => s.trim()).filter((s) => /\[P\d/.test(s))
      // Arrow-chained single-block flows ("[P01 open] → [P41 …] → …" with no
      // blank-line stanza breaks, phys.therm.*): fall back to one TA per line.
      if (stanzas.length <= 1) {
        stanzas = fence.split('\n').map((s) => s.trim()).filter((s) => /\[P\d|\[MC-/.test(s))
      }
      for (const stanza of stanzas) {
        const label = /\[P\d{1,3}\s*(?:—|-|:|\s)\s*([^\]\n]+)\]/.exec(stanza)?.[1]?.trim()
        out.push({
          id: `TA-${out.length + 1}`,
          title: label ?? `Composition step ${out.length + 1}`,
          primitives: [...new Set([...stanza.matchAll(/\bP\d{1,3}\b/g)].map((p) => p[0]))],
          referencedMisconceptionIds: [...new Set([...stanza.matchAll(/\bMC-[A-Za-z0-9_-]+\b/g)].map((p) => p[0]))],
          span: { file, startLine: grammarSection.startLine, endLine: grammarSection.startLine },
        })
      }
      if (out.length > 0) return out
    }
  }

  return actions
}

/** Sequential id-bearing matches → TAs, each body running to the next match. */
function extractFromMatches(haystack: string, file: string, re: RegExp): BlueprintTeachingAction[] {
  const found: Array<{ id: string; title: string; index: number }> = []
  let m: RegExpExecArray | null
  while ((m = re.exec(haystack)) !== null) {
    found.push({ id: m[1], title: m[2].trim(), index: m.index })
  }
  const out: BlueprintTeachingAction[] = []
  const seen = new Set<string>()
  for (let i = 0; i < found.length; i++) {
    if (seen.has(found[i].id)) continue
    seen.add(found[i].id)
    const end = i + 1 < found.length ? found[i + 1].index : haystack.length
    const body = haystack.slice(found[i].index, end)
    out.push({
      id: found[i].id,
      title: found[i].title,
      primitives: [...new Set([...body.matchAll(/\bP\d{1,3}\b/g)].map((p) => p[0]))],
      referencedMisconceptionIds: [...new Set([...body.matchAll(/\bMC-[A-Za-z0-9_-]+\b/g)].map((p) => p[0]))],
      span: {
        file,
        startLine: haystack.slice(0, found[i].index).split('\n').length,
        endLine: haystack.slice(0, end).split('\n').length,
      },
    })
  }
  return out
}

/** "| TA-1 | P04 | Action-type | Detail |" rows — one TA per row. Title is
 *  the first non-primitive text cell after the id. */
function extractFromTableRows(haystack: string, file: string): BlueprintTeachingAction[] {
  const out: BlueprintTeachingAction[] = []
  const seen = new Set<string>()
  const rowRe = /^\|\s*(TA-[A-Za-z0-9]+)\s*\|(.+)$/gm
  let m: RegExpExecArray | null
  while ((m = rowRe.exec(haystack)) !== null) {
    if (seen.has(m[1])) continue
    seen.add(m[1])
    const cells = m[2].split('|').map((c) => c.trim()).filter((c) => c.length > 0)
    const title = cells.find((c) => !/^P\d{1,3}$/.test(c)) ?? m[1]
    const startLine = haystack.slice(0, m.index).split('\n').length
    out.push({
      id: m[1],
      title,
      primitives: [...new Set([...m[0].matchAll(/\bP\d{1,3}\b/g)].map((p) => p[0]))],
      referencedMisconceptionIds: [...new Set([...m[0].matchAll(/\bMC-[A-Za-z0-9_-]+\b/g)].map((p) => p[0]))],
      span: { file, startLine, endLine: startLine },
    })
  }
  return out
}

/** "| 1 | action text | trigger |" priority rows (Section-format Teaching
 *  Actions tables) — synthesized ids TA-1..TA-N from the priority column. */
function extractFromNumberedRows(sectionBody: string, file: string): BlueprintTeachingAction[] {
  const out: BlueprintTeachingAction[] = []
  const seen = new Set<string>()
  const rowRe = /^\|\s*(\d{1,2})\s*\|\s*([^|]+)\|([^\n]*)$/gm
  let m: RegExpExecArray | null
  while ((m = rowRe.exec(sectionBody)) !== null) {
    const id = `TA-${m[1]}`
    if (seen.has(id)) continue
    seen.add(id)
    const startLine = sectionBody.slice(0, m.index).split('\n').length
    out.push({
      id,
      title: m[2].trim(),
      primitives: [...new Set([...m[0].matchAll(/\bP\d{1,3}\b/g)].map((p) => p[0]))],
      referencedMisconceptionIds: [...new Set([...m[0].matchAll(/\bMC-[A-Za-z0-9_-]+\b/g)].map((p) => p[0]))],
      span: { file, startLine, endLine: startLine },
    })
  }
  return out
}

// ── C3 Misconceptions extraction ─────────────────────────────────────────────

const MC_HEADER_RE = /^###\s+(MC-[A-Za-z0-9_-]+)[:\s]*(.*)$/gm

function extractMisconceptions(sections: RawSection[], file: string): BlueprintMisconception[] {
  const mcSection =
    findSection(sections, /misconception/i) ??
    null
  const haystack = mcSection ? mcSection.body : sections.map((s) => s.body).join('\n')

  const headerMatches: Array<{ id: string; label: string; index: number }> = []
  const seen = new Set<string>()
  MC_HEADER_RE.lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = MC_HEADER_RE.exec(haystack)) !== null) {
    const id = m[1]
    if (seen.has(id)) continue
    seen.add(id)
    const label = m[2].replace(/^["(]+|[")]+$/g, '').replace(/^:\s*/, '').trim()
    headerMatches.push({ id, label, index: m.index })
  }

  const out: BlueprintMisconception[] = []
  for (let i = 0; i < headerMatches.length; i++) {
    const cur = headerMatches[i]
    // Body runs to the next MC header or the next ## section, whichever first.
    const nextMc = i + 1 < headerMatches.length ? headerMatches[i + 1].index : haystack.length
    const nextSection = haystack.indexOf('\n## ', cur.index)
    const end = nextSection !== -1 ? Math.min(nextMc, nextSection) : nextMc
    const body = haystack.slice(cur.index, end).trim()
    const startLine = haystack.slice(0, cur.index).split('\n').length
    const endLine = haystack.slice(0, end).split('\n').length
    out.push({ id: cur.id, label: cur.label, body, span: { file, startLine, endLine } })
    // Dual-id headers ("### MC-1: MC-HIGHER-N-IS-LOWER-ENERGY") define BOTH
    // spellings — routing prose cites either. Emit an alias entry so
    // downstream reference checks and repair routing resolve both.
    const slug = /^MC-[A-Za-z0-9_-]+/.exec(cur.label)?.[0]?.replace(/-+$/, '')
    if (slug && slug !== cur.id && !seen.has(slug)) {
      seen.add(slug)
      out.push({ id: slug, label: cur.label, body, span: { file, startLine, endLine } })
    }
  }
  if (out.length > 0) return out

  // Registry-table variant (math corpus): "| MC-1 | NAME | symptom … |" rows
  // inside the Misconception section, no ### headers. Each row is one MC;
  // the row itself (verbatim) is the body.
  if (mcSection) {
    const rowRe = /^\|\s*(MC-[A-Za-z0-9_-]+)\s*\|\s*([^|]+)\|([^\n]*)$/gm
    let row: RegExpExecArray | null
    while ((row = rowRe.exec(mcSection.body)) !== null) {
      const id = row[1]
      if (seen.has(id)) continue
      seen.add(id)
      const startLine = mcSection.startLine + mcSection.body.slice(0, row.index).split('\n').length - 1
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

  // Authored TA prose often refers to a misconception loosely:
  //   - truncated id     ("MC-BRACKET-ZERO" for "MC-BRACKET-ZERO-MEANS-INDEPENDENT")
  //   - slug-as-label    ("MC-BOHR-MODEL-…" when the MC is defined as
  //                       "### MC-1: MC-BOHR-MODEL-…" — id MC-1, slug in label)
  //   - dropped word     ("…-MORE-ENERGY-AT-ALL-TIMES" for
  //                       "…-MORE-ENERGY-STORED-AT-ALL-TIMES")
  // Resolve a reference to a defined id when the mapping is UNIQUE:
  // exact label-slug match, unique proper id-prefix, or a unique defined id
  // sharing ≥4 leading dash-segments. Ambiguous/unmatched refs are left
  // as-is for BFV04 to flag.
  const definedIds = misconceptions.map((mc) => mc.id)
  const definedSet = new Set(definedIds)
  const labelToId = new Map<string, string>()
  for (const mc of misconceptions) {
    const slug = /^MC-[A-Za-z0-9_-]+/.exec(mc.label)?.[0]?.replace(/-+$/, '')
    if (slug && !labelToId.has(slug)) labelToId.set(slug, mc.id)
  }
  const leadingSegs = (a: string, b: string): number => {
    const as = a.split('-'); const bs = b.split('-')
    let n = 0
    while (n < as.length && n < bs.length && as[n] === bs[n]) n++
    return n
  }
  for (const ta of teachingActions) {
    ta.referencedMisconceptionIds = [...new Set(ta.referencedMisconceptionIds.map((ref) => {
      if (definedSet.has(ref)) return ref
      const byLabel = labelToId.get(ref)
      if (byLabel) return byLabel
      const byPrefix = definedIds.filter((d) => d.startsWith(`${ref}-`))
      if (byPrefix.length === 1) return byPrefix[0]
      const bySegs = definedIds.filter((d) => leadingSegs(ref, d) >= 4)
      if (bySegs.length === 1) return bySegs[0]
      // Last resort: a paraphrased id ("MC-ADIABATIC-IS-ISOTHERMAL" for
      // "MC-ADIABATIC-MEANS-CONSTANT-TEMPERATURE") — resolve only when
      // exactly ONE defined MC shares the same topic segment ("MC-<TOPIC>-").
      const byTopic = definedIds.filter((d) => leadingSegs(ref, d) >= 2)
      return byTopic.length === 1 ? byTopic[0] : ref
    }))]
  }

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
