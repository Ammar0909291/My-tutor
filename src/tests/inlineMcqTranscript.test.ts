/**
 * THE MULTIPLE-CHOICE QUESTION IS PART OF THE TUTOR MAX TRANSCRIPT — the card and the wiring around it.
 *
 * `mcqTranscript.test.ts` holds the pure rules. This file holds what cannot be a pure test: the card's markup
 * (server-rendered with the real component) and the facts about `LessonScreen` that make the conversation read
 * Tutor question → Learner answer → Tutor feedback — pinned on the source, in the same style as
 * `quickCheckWindowControls.test.ts`, because LessonScreen needs a browser session and a model to run for real.
 * The real-browser layout, order and contrast checks are in `inlineMcqBrowser.test.ts`.
 */
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { InlineMcqCard } from '@/components/learn/InlineMcqCard'

const read = (p: string) => readFileSync(join(process.cwd(), p), 'utf8')
const SRC = read('src/components/learn/LessonScreen.tsx')
const CARD_SRC = read('src/components/learn/InlineMcqCard.tsx')

const html = (question: string, options: string[]) =>
  renderToStaticMarkup(createElement(InlineMcqCard, { question, options, label: 'Quick check' }))

/** The code of LessonScreen with its comments blanked, so an assertion about code cannot be satisfied by prose. */
const CODE = SRC.replace(/\/\*[\s\S]*?\*\//g, (m) => ' '.repeat(m.length)).replace(/^\s*\/\/.*$/gm, '')

describe('InlineMcqCard — what the learner sees in the transcript', () => {
  const Q = 'Which of these is a vector quantity?'
  const OPTS = ['Speed', 'Velocity', 'Distance', 'Time']
  const markup = html(Q, OPTS)

  it('shows the full question text', () => {
    expect(markup).toContain(Q)
    expect(markup).toContain('data-inline-mcq-question')
  })

  it('shows every option, lettered A..D, in the order the tutor served them', () => {
    const letters = [...markup.matchAll(/data-inline-mcq-option="([A-D])"/g)].map((m) => m[1])
    expect(letters).toEqual(['A', 'B', 'C', 'D'])
    const at = OPTS.map((o) => markup.indexOf(`<span>${o}</span>`))
    expect(at.every((i) => i > 0)).toBe(true)
    expect([...at].sort((a, b) => a - b)).toEqual(at)
  })

  it('renders 2- and 3-option questions with exactly that many options', () => {
    expect(html('Q?', ['yes', 'no']).match(/data-inline-mcq-option=/g)).toHaveLength(2)
    expect(html('Q?', ['a', 'b', 'c']).match(/data-inline-mcq-option=/g)).toHaveLength(3)
  })

  it('is accessible: a labelled group, decorative letter badges hidden from the reader, a real ordered list', () => {
    expect(markup).toContain('role="group"')
    expect(markup).toContain('aria-label="Quick check"')
    expect(markup).toContain('<ol')
    expect(markup).toContain('aria-hidden="true"')
  })

  it('is visually distinct from a learner answer: a card with a left accent rule on the card surface', () => {
    expect(markup).toContain('border-left:3px solid var(--coral)')
    expect(markup).toContain('background:var(--bg-card)')
  })

  it('works in both themes and at phone width because it only uses theme tokens and wraps', () => {
    expect(markup).toContain('var(--text-primary)')
    expect(markup).toContain('var(--border-subtle)')
    expect(markup).toContain('overflow-wrap:anywhere')
    expect(markup).toContain('width:100%')
    expect(markup).not.toMatch(/min-width|#[0-9a-fA-F]{3,6}\b|rgb\(/)
  })

  it('is READ-ONLY: no button, no input, no handler — it cannot answer, grade or change server state', () => {
    expect(markup).not.toMatch(/<button|<input|<textarea|<a |onclick|tabindex/i)
    expect(CARD_SRC).not.toMatch(/\bon[A-Z][A-Za-z]+\s*=/)
    expect(CARD_SRC).not.toMatch(/useState|useEffect|fetch\(|sendMessage/)
  })

  it('escapes the question and options (model text is never injected as markup)', () => {
    const evil = html('<img src=x onerror=alert(1)>?', ['<b>a</b>', 'b'])
    expect(evil).not.toContain('<img')
    expect(evil).not.toContain('<b>a</b>')
    expect(evil).toContain('&lt;img')
  })
})

describe('LessonScreen wiring — the question is in the transcript, above the answer, once', () => {
  it('a SERVED question is attached to the tutor message that asked it (same object as the answer-less turn)', () => {
    expect(SRC).toMatch(/mcq\?: TranscriptMcq/)
    expect(CODE).toMatch(/const servedMcq = validTranscriptMcq\(rawMcq\)/)
    // The landed tutor message carries it — and the Quick Check state is fed from the very same value.
    expect(CODE).toMatch(/mcq: data\.lessonComplete\?\.complete === true \? undefined : \(servedMcq \?\? undefined\)/)
    expect(CODE).toMatch(/setActiveMcq\(\{\s*question: servedMcq\.question,\s*options: servedMcq\.options/)
  })

  it('all THREE history-restore paths rebuild the question through withRestoredMcq, before the figures are merged', () => {
    // The restored array is wrapped where it is built, so each path still hands `restored` to applyRestoredVisuals.
    expect(CODE.match(/const restored: ChatMsg\[\] = withRestoredMcq\(\(/g)).toHaveLength(3)
    expect(CODE.match(/applyRestoredVisuals\(restored,/g)).toHaveLength(3)
    // And no restore path hands the merge an array that skipped it.
    expect(CODE.match(/applyRestoredVisuals\(/g)).toHaveLength(3)
  })

  it('the card is rendered from msg.mcq on the TUTOR message, after the teaching canvas and before the learner turn', () => {
    const card = SRC.indexOf('<InlineMcqCard question={msg.mcq.question}')
    expect(card).toBeGreaterThan(0)
    expect(SRC.slice(card - 120, card)).toContain('!isUser && !msg.streaming && msg.mcq')
    // After the canvas that holds the prose and the figures; before the inline-practice card.
    expect(card).toBeGreaterThan(SRC.indexOf('{/* /teaching canvas */}'))
    expect(card).toBeLessThan(SRC.indexOf('{!isUser && !msg.streaming && msg.inlinePractice && ('))
  })

  it('the card is OUTSIDE the "Read more" fold, so a long reply can never hide the question', () => {
    const fold = SRC.indexOf('previewCache')
    expect(fold).toBeGreaterThan(0)
    const card = SRC.indexOf('<InlineMcqCard')
    // The card does not read the fold's state at all.
    expect(SRC.slice(card, card + 200)).not.toMatch(/previewCache|expanded|readMore/i)
  })

  it('uses the existing "Quick check" label — no new string', () => {
    expect(SRC).toContain("label={t('lc_quick_check_label')}")
  })

  it('the learner\'s answer is still an ordinary user message: a tapped option takes the same sendMessage path as typing', () => {
    // The option handler clears the panel, records the Tutor history entry, then sends the option TEXT as a message —
    // grading stays server-side against the stored probe; the inline card is not involved in answering at all.
    const handler = CODE.slice(CODE.indexOf('setActiveMcq(null)\n', CODE.indexOf('if (!sessionId) return\n', CODE.indexOf('questionIsVisible(quickCheckMode) && activeMcq.options.map'))))
    expect(handler.slice(0, 900)).toMatch(/setMcqHistoryLog\([\s\S]*?void sendMessage\(sessionId, option\)/)
  })

  it('Tutor history is untouched: still the secondary log, fed by the same entries, never by inline cards', () => {
    expect(SRC).toContain('const [mcqHistoryLog, setMcqHistoryLog] = useState<McqHistoryEntry[]>([])')
    expect(SRC).toContain('const [mcqHistoryOpen, setMcqHistoryOpen] = useState(false)')
    // Inline cards are derived from messages; the history log is a separate array and nothing copies one into the other.
    const writers = CODE.match(/setMessages\([^;]*mcqHistoryLog|setMcqHistoryLog\([^;]*messages\b/g)
    expect(writers).toBeNull()
  })

  it('expanding Tutor history cannot create inline questions: the cards render from messages only, not from the log', () => {
    const card = SRC.indexOf('<InlineMcqCard')
    const block = SRC.slice(card - 400, card + 300)
    expect(block).not.toContain('mcqHistoryLog')
    expect(block).not.toContain('mcqHistoryOpen')
  })

  it('the Quick Check panel is still the answering control: gate, window controls and option handler are intact', () => {
    expect(SRC).toContain("{activeMcq && !isStreaming && !lessonCompletion && panelIsVisible(quickCheckMode) && (")
    expect(CODE).toMatch(/setActiveMcq\(null\)/)
  })

  it('a question belongs to ONE lesson: every place that empties the transcript for another lesson clears the MCQ state too', () => {
    expect(CODE).toMatch(/const clearLessonMcqState = useCallback\(\(\) => \{[\s\S]*?setActiveMcq\(null\)[\s\S]*?setMcqHistoryLog\(\[\]\)[\s\S]*?setMcqHistoryOpen\(false\)[\s\S]*?pendingMcqMasteryBaselineRef\.current = null[\s\S]*?\}, \[\]\)/)
    // The Quick Check window mode is keyed on askedAt (a stale mode cannot hide a new question) and is written only by
    // the window controls — the reset deliberately does not touch it.
    const reset = CODE.slice(CODE.indexOf('const clearLessonMcqState'), CODE.indexOf('}, [])', CODE.indexOf('const clearLessonMcqState')))
    expect(reset).not.toContain('setQuickCheckWindow')
    // The four lesson-switch sites — advance (completeAndAdvance), staged preview, resetLessonContext and the
    // Resume/Restart gate's Restart (restartConceptFromGate) — each empty the transcript and clear the MCQ state
    // in the same breath, and no site empties it without clearing.
    expect(CODE.match(/setMessages\(\[\]\)\s*\n\s*clearLessonMcqState\(\)/g)).toHaveLength(4)
    expect(CODE.match(/setMessages\(\[\]\)/g)).toHaveLength(4)
    expect(CODE).toMatch(/const resetLessonContext = useCallback\(\(\) => \{\s*setMessages\(\[\]\)\s*\n\s*clearLessonMcqState\(\)/)
  })

  it('this fix adds no persistence: no new column, endpoint, table or message system', () => {
    const prisma = read('prisma/schema.prisma')
    expect(prisma).not.toMatch(/inlineMcq|transcriptMcq|mcqMessage/i)
    expect(CODE).not.toMatch(/\/api\/[a-z/-]*mcq/i)
  })
})
