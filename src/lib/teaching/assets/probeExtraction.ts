/**
 * Automatic probe extraction (Phase 5 task 4) — detects assessment items a
 * generated lesson already contains (MCQ, true/false, fill-in-the-blank,
 * short answer) and lifts them out as Probe Asset candidates. Pure text
 * parsing, no I/O, no LLM call, no invention: a probe is only extracted
 * when a recognizable pattern (a lettered option list, a "___" blank, an
 * explicit "Short answer:" label) is actually present in the text.
 */
import type { ProbeKind, ProbeChoice } from './assetIdentity'

export interface ExtractedProbe {
  probeKind: ProbeKind
  stem: string
  choices?: ProbeChoice[]
  correctValue?: string
}

const OPTION_LINE = /^\s*[([]?([A-Da-d])[).\]]\s+(.+)$/
const ANSWER_LINE = /^\s*(?:correct\s+)?answer\s*:?\s*\(?([A-Da-d])\)?\s*$/i
const CORRECT_MARK = /\s*[([]?(?:correct|✓)[)\]]?\s*$/i
const TRUE_FALSE_INLINE = /^\s*(.*\?)\s*\(?\s*true\s*\/\s*false\s*\)?\s*:?\s*$/i
const TRUE_FALSE_ANSWER = /^\s*(?:correct\s+)?answer\s*:?\s*(true|false)\s*$/i
const FILL_BLANK_MARK = /_{3,}|\[blank\]/i
const FILL_BLANK_ANSWER = /^\s*(?:correct\s+)?answer\s*:?\s*(.+)$/i
const SHORT_ANSWER_LABEL = /^\s*short\s*answer(?:\s*question)?\s*:?\s*(.*)$/i
const SAMPLE_ANSWER_LABEL = /^\s*(?:sample|expected|model)\s*answer\s*:?\s*(.+)$/i

function isBlank(line: string): boolean {
  return line.trim().length === 0
}

/** MCQ: a stem line followed by 2+ lettered option lines, optionally an
 * "Answer: X" line or an inline "(correct)" marker on one option. A
 * two-option True/False-worded set is reclassified as true_false. */
function tryOptionBlock(lines: string[], i: number): { probe: ExtractedProbe; nextIndex: number } | null {
  const stemLine = lines[i]
  if (isBlank(stemLine) || OPTION_LINE.test(stemLine)) return null

  let j = i + 1
  while (j < lines.length && isBlank(lines[j])) j++
  const options: { letter: string; text: string }[] = []
  while (j < lines.length) {
    const m = lines[j].match(OPTION_LINE)
    if (!m) break
    options.push({ letter: m[1].toUpperCase(), text: m[2].trim() })
    j++
  }
  if (options.length < 2) return null

  let correctLetter: string | null = null
  let nextIndex = j
  const answerLine = lines[j]
  if (answerLine) {
    const am = answerLine.match(ANSWER_LINE)
    if (am) {
      correctLetter = am[1].toUpperCase()
      nextIndex = j + 1
    }
  }

  const choices: ProbeChoice[] = options.map((o) => {
    const inlineCorrect = CORRECT_MARK.test(o.text)
    const text = o.text.replace(CORRECT_MARK, '').trim()
    return { text, isCorrect: inlineCorrect || o.letter === correctLetter }
  })

  const cleanedTexts = choices.map((c) => c.text.toLowerCase())
  if (choices.length === 2 && cleanedTexts.includes('true') && cleanedTexts.includes('false')) {
    const correct = choices.find((c) => c.isCorrect)
    return {
      probe: { probeKind: 'true_false', stem: stemLine.trim(), correctValue: correct?.text.toLowerCase() },
      nextIndex,
    }
  }

  return { probe: { probeKind: 'mcq', stem: stemLine.trim(), choices }, nextIndex }
}

/** True/False phrased inline: "Question? (True/False)" with an optional
 * following "Answer: True" line — no lettered options present. */
function tryInlineTrueFalse(lines: string[], i: number): { probe: ExtractedProbe; nextIndex: number } | null {
  const m = lines[i].match(TRUE_FALSE_INLINE)
  if (!m) return null
  let nextIndex = i + 1
  let correctValue: string | undefined
  if (lines[nextIndex]) {
    const am = lines[nextIndex].match(TRUE_FALSE_ANSWER)
    if (am) {
      correctValue = am[1].toLowerCase()
      nextIndex++
    }
  }
  return { probe: { probeKind: 'true_false', stem: m[1].trim(), correctValue }, nextIndex }
}

/** Fill-in-the-blank: a sentence containing "___" or "[blank]", with an
 * optional following "Answer: <value>" line. */
function tryFillBlank(lines: string[], i: number): { probe: ExtractedProbe; nextIndex: number } | null {
  const line = lines[i]
  if (isBlank(line) || !FILL_BLANK_MARK.test(line)) return null
  let nextIndex = i + 1
  let correctValue: string | undefined
  if (lines[nextIndex]) {
    const am = lines[nextIndex].match(FILL_BLANK_ANSWER)
    if (am) {
      correctValue = am[1].trim()
      nextIndex++
    }
  }
  return { probe: { probeKind: 'fill_blank', stem: line.trim(), correctValue }, nextIndex }
}

/** Short answer: an explicit "Short answer:" label, inline or on the next
 * line, with an optional following "Sample/Expected answer:" line. */
function tryShortAnswer(lines: string[], i: number): { probe: ExtractedProbe; nextIndex: number } | null {
  const m = lines[i].match(SHORT_ANSWER_LABEL)
  if (!m) return null
  let stem = m[1].trim()
  let nextIndex = i + 1
  if (stem.length === 0) {
    while (nextIndex < lines.length && isBlank(lines[nextIndex])) nextIndex++
    if (nextIndex >= lines.length) return null
    stem = lines[nextIndex].trim()
    nextIndex++
  }
  let correctValue: string | undefined
  if (lines[nextIndex]) {
    const am = lines[nextIndex].match(SAMPLE_ANSWER_LABEL)
    if (am) {
      correctValue = am[1].trim()
      nextIndex++
    }
  }
  return { probe: { probeKind: 'short_answer', stem, correctValue }, nextIndex }
}

const DETECTORS = [tryOptionBlock, tryInlineTrueFalse, tryFillBlank, tryShortAnswer]

/** Scans raw lesson text left to right, extracting whichever assessment
 * patterns are actually present. Detectors run in priority order per
 * position; a match consumes its lines so the same text is never
 * double-counted as two different probe kinds. */
export function extractProbes(rawContent: string): ExtractedProbe[] {
  const lines = rawContent.replace(/\r\n/g, '\n').split('\n')
  const probes: ExtractedProbe[] = []

  let i = 0
  while (i < lines.length) {
    let matched = false
    for (const detector of DETECTORS) {
      const result = detector(lines, i)
      if (result) {
        probes.push(result.probe)
        i = result.nextIndex
        matched = true
        break
      }
    }
    if (!matched) i++
  }

  return probes
}
