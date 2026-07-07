/**
 * Automatic lesson decomposition (Phase 5 task 3) — splits one generated
 * lesson into the reusable teaching-action kinds a human teacher would
 * naturally produce inside a single explanation: a real-world example, a
 * memory trick, a summary, revision notes, a flashcard, an FAQ, a common
 * misconception note. Pure text parsing, no I/O, no LLM call.
 *
 * "Never hallucinate missing sections": a section is only emitted when a
 * recognizable heading for it is actually present in the text (e.g. a line
 * that IS "Summary:" or "**Real-world example**"). No section is invented,
 * reworded, or inferred from prose that merely discusses the same topic.
 * Whatever text precedes the first recognized heading (or the entire
 * lesson, if no heading is found at all) becomes the core_explanation —
 * every other kind must be explicitly labelled.
 */
import type { ExplanationKind } from './assetIdentity'

export interface DecomposedSection {
  familyKind: ExplanationKind
  content: string
}

interface SectionLabel {
  kind: ExplanationKind
  aliases: string[]
}

const SECTION_LABELS: SectionLabel[] = [
  { kind: 'real_world_example', aliases: ['real-world example', 'real world example', 'real-life example', 'application'] },
  { kind: 'memory_trick', aliases: ['memory trick', 'mnemonic', 'memory aid'] },
  { kind: 'summary', aliases: ['summary', 'key takeaways', 'key takeaway', 'tl;dr'] },
  { kind: 'revision_notes', aliases: ['revision notes', 'revision note', 'quick revision'] },
  { kind: 'flashcard', aliases: ['flashcard', 'flash card'] },
  { kind: 'faq', aliases: ['faq', 'frequently asked questions'] },
  { kind: 'common_misconception_note', aliases: ['common misconception', 'common mistake', 'misconception note'] },
]

function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// A heading line is a line that IS the label, optionally wrapped in markdown
// heading marks (#, ##...) or bold (**), optionally followed by a colon and
// inline content on the same line ("**Summary:** water boils at 100C").
// Requiring the label to start the line (after only decoration) is what
// keeps this from false-matching prose that merely mentions "for example".
function buildHeadingMatchers(): Array<{ kind: ExplanationKind; regex: RegExp }> {
  const matchers: Array<{ kind: ExplanationKind; regex: RegExp }> = []
  for (const { kind, aliases } of SECTION_LABELS) {
    for (const alias of [...aliases].sort((a, b) => b.length - a.length)) {
      matchers.push({
        kind,
        regex: new RegExp(`^\\s{0,3}(?:#{1,6}\\s*)?\\*{0,2}\\s*${escapeRegex(alias)}\\s*[*:]*\\s*(.*)$`, 'i'),
      })
    }
  }
  return matchers
}

const HEADING_MATCHERS = buildHeadingMatchers()

function matchHeadingLine(line: string): { kind: ExplanationKind; inlineContent: string } | null {
  for (const { kind, regex } of HEADING_MATCHERS) {
    const m = line.match(regex)
    if (m) return { kind, inlineContent: m[1].trim() }
  }
  return null
}

/** Splits raw lesson text into whichever labelled sections are actually present. */
export function decomposeLesson(rawContent: string): DecomposedSection[] {
  const lines = rawContent.replace(/\r\n/g, '\n').split('\n')
  const headings: Array<{ index: number; kind: ExplanationKind; inlineContent: string }> = []

  lines.forEach((line, index) => {
    const match = matchHeadingLine(line)
    if (match) headings.push({ index, ...match })
  })

  const sections: DecomposedSection[] = []

  const firstHeadingIndex = headings.length > 0 ? headings[0].index : lines.length
  const coreContent = lines.slice(0, firstHeadingIndex).join('\n').trim()
  if (coreContent.length > 0) {
    sections.push({ familyKind: 'core_explanation', content: coreContent })
  }

  headings.forEach((heading, i) => {
    const nextIndex = i + 1 < headings.length ? headings[i + 1].index : lines.length
    const bodyLines = lines.slice(heading.index + 1, nextIndex)
    const content = [heading.inlineContent, ...bodyLines].join('\n').trim()
    if (content.length > 0) {
      sections.push({ familyKind: heading.kind, content })
    }
  })

  return sections
}
