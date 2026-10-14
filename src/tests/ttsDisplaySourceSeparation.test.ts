/**
 * DISPLAY SOURCE ≠ SPEECH SOURCE.
 *
 * Reported 2026-10-14: after Play, a lesson card showed `**predicate**`, `\forall`, `\exists`, `\[...\]` and `\(...\)` as
 * raw characters. The browser reproduction and the lifecycle checks are in `ttsMarkdownLatexBrowser.test.ts`; this file
 * pins the separation itself, at the level where it can be stated exactly:
 *   - the DISPLAY source is the original message and is drawn by ONE renderer (`TutorMessageText` → `MessageContent`),
 *     which is given the display text and nothing else — so no narration state can reach it;
 *   - the SPEECH source is built from a COPY (`cleanTextForTTS`, the segmenter) inside the narration hook and never
 *     flows back into what is drawn;
 *   - LessonScreen wires the two the right way round, and no TTS handler writes message content.
 */
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MessageContent, TutorMessageText } from '@/components/learn/MessageContent'
import { displayText, narrationText, type CollapsibleMessageText } from '@/lib/learn/narratedMessageText'
import { buildNarrationSegments } from '@/lib/narration/segments'
import { cleanTextForTTS } from '@/lib/tts-cleaner'

const read = (p: string) => readFileSync(join(process.cwd(), p), 'utf8')
const LESSON = read('src/components/learn/LessonScreen.tsx')
const MESSAGE_CONTENT = read('src/components/learn/MessageContent.tsx')
const HOOK = read('src/hooks/useNarrationPlayback.ts')
const code = (src: string) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')

const FULL = [
  'A **predicate** is a statement about \\(x\\) that becomes true or false once you pick a value, like \\(T(x,y)\\) meaning "x teaches y".',
  '',
  '\\[\\forall x \\exists y\\, T(y,x)\\]',
  '',
  'reads "everyone is taught by someone", while',
  '',
  '\\[\\exists y \\forall x\\, T(y,x)\\]',
  '',
  '- *Italic* and **bold** items keep their formatting.',
].join('\n')

/** The visible text of server-rendered markup, with KaTeX's hidden TeX annotation and MathML copy removed. */
const visibleText = (html: string) => html
  .replace(/<annotation[\s\S]*?<\/annotation>/g, '')
  .replace(/<span class="katex-mathml">[\s\S]*?<\/span><span class="katex-html"/g, '<span class="katex-html"')
  .replace(/<[^>]+>/g, ' ')
const RAW = [/\*\*/, /\\forall/, /\\exists/, /\\\[/, /\\\]/, /\\\(/, /\\\)/]

describe('the display source: ONE renderer, given only the display text', () => {
  const html = renderToStaticMarkup(createElement(TutorMessageText, { displayText: FULL }))

  it('renders the message formatted: bold, italic, inline and display mathematics as KaTeX', () => {
    expect(html).toContain('<strong')
    expect(html).toContain('<em')
    expect((html.match(/class="katex"/g) ?? []).length).toBeGreaterThanOrEqual(4)
    expect((html.match(/class="katex-display"|display:block/g) ?? []).length).toBeGreaterThanOrEqual(2)
    for (const re of RAW) expect(visibleText(html), `raw ${re} in the visible text`).not.toMatch(re)
  })

  it('is exactly MessageContent inside the message-body wrapper — there is no second renderer to switch to', () => {
    const viaMessageContent = renderToStaticMarkup(createElement(MessageContent, { text: FULL, isUser: false }))
    expect(html).toContain(viaMessageContent)
  })

  it('the component has no narration/TTS input at all: its only prop is `displayText`', () => {
    const src = code(MESSAGE_CONTENT.slice(MESSAGE_CONTENT.indexOf('export function TutorMessageText')))
    expect(src).toContain('export function TutorMessageText({ displayText }: { displayText: string })')
    expect(src).not.toMatch(/narration|status|segment|speak|tts|playing|useState|useEffect|useRef/i)
  })

  it('output is a pure function of the display text: same text → same markup; and it never reads the clock or the environment', () => {
    expect(renderToStaticMarkup(createElement(TutorMessageText, { displayText: FULL }))).toBe(html)
    expect(code(MESSAGE_CONTENT)).not.toMatch(/Date\.now|Math\.random|window\.|document\./)
  })

  it('also handles the Read More preview and a plain-prose message through the same path', () => {
    const preview = renderToStaticMarkup(createElement(TutorMessageText, { displayText: FULL.split('\n')[0] }))
    expect(preview).toContain('<strong')
    expect((preview.match(/class="katex"/g) ?? []).length).toBe(2)
    expect(renderToStaticMarkup(createElement(TutorMessageText, { displayText: 'Just prose.' }))).toContain('Just prose.')
  })
})

describe('the speech source is prepared from a copy and never replaces the display source', () => {
  it('speech preparation turns Markdown and LaTeX into speakable text …', () => {
    const spoken = cleanTextForTTS(FULL)
    for (const re of RAW) expect(spoken, `speech text still has ${re}`).not.toMatch(re)
    expect(spoken).toContain('predicate')
  })

  it('… without mutating the string it was given (display source untouched, byte for byte)', () => {
    const input = FULL
    const frozenCopy = `${FULL}`
    const out = cleanTextForTTS(input)
    expect(out).not.toBe(input)
    expect(input).toBe(frozenCopy)
    expect(input).toContain('**predicate**')
    expect(input).toContain('\\forall')
  })

  it('segments keep the raw source in `text` and the speakable form in `spokenText` — two fields, neither written over the other', () => {
    const segments = buildNarrationSegments(FULL, 'm1')
    expect(segments.length).toBeGreaterThan(1)
    // `text` is the segmenter's slice of the RAW source: this is exactly why it must never be drawn as the message.
    expect(segments.some((s) => /\*\*|\\\(|\\\[/.test(s.text))).toBe(true)
    // `spokenText` is what is sent to the speech provider.
    for (const s of segments) for (const re of RAW) expect(s.spokenText, `segment ${s.index} spoken text`).not.toMatch(re)
    // Building segments is repeatable and does not depend on, or alter, anything held by the display.
    expect(buildNarrationSegments(FULL, 'm1')).toEqual(segments)
  })

  it('the narration hook returns playback state only — it has no display-content field and imports no renderer', () => {
    const resultType = HOOK.slice(HOOK.indexOf('export interface UseNarrationPlaybackResult'), HOOK.indexOf('export function useNarrationPlayback'))
    const fields = [...resultType.matchAll(/^\s{2}(\w+)\??:/gm)].map((m) => m[1]).sort()
    expect(fields).toEqual(['activeSegmentIndex', 'activeWordIndex', 'isPlaying', 'pause', 'play', 'progressPercent', 'replay', 'segments', 'status', 'toggle'])
    expect(code(HOOK)).not.toMatch(/MessageContent|TutorMessageText|displayText|innerHTML|setMessages/)
  })
})

describe('what is displayed and what is spoken are both derived from the SAME original message — neither from the other', () => {
  const cached: CollapsibleMessageText = { full: FULL, preview: FULL.split('\n')[0], hasMore: true }

  it('the display text is the original source (Markdown and LaTeX intact), collapsed or expanded', () => {
    expect(displayText(cached, true, null)).toBe(FULL)
    expect(displayText(cached, false, null)).toBe(cached.preview)
    for (const t of [displayText(cached, true, null), displayText(cached, false, null)]) {
      expect(t).toContain('**predicate**')
      expect(t).toContain('\\(T(x,y)\\)')
    }
  })

  it('the narration text is the complete original message, independent of the collapse state', () => {
    expect(narrationText(cached, null)).toBe(FULL)
    expect(narrationText({ ...cached, hasMore: false }, null)).toBe(FULL)
  })
})

describe('LessonScreen wires them the right way round', () => {
  const block = LESSON.slice(LESSON.indexOf('<TutorNarratedMessage'), LESSON.indexOf('</TutorNarratedMessage>'))

  it('the tutor message body is TutorMessageText(displayText) unconditionally; narration state is read only by the controls', () => {
    expect(block).toContain('<TutorMessageText displayText={displayText} />')
    expect(code(block)).not.toMatch(/narration\.status\s*===\s*'IDLE'/)
    expect(block).not.toContain('NarratedText')
    expect(block).not.toContain('narration.segments')
  })

  it('the narration hook is fed the complete narration source, never the display text and never an already-spoken copy', () => {
    const opening = block.slice(0, block.indexOf('>') + 1)
    expect(opening).toContain('text={narrationSourceText}')
    expect(LESSON).toContain('? deriveNarrationText(cached, familiarityLine)')
    expect(LESSON).toContain('? deriveDisplayText(cached, isExpanded, familiarityLine)')
    // The lesson screen never builds speech text for the message view. Its one use of cleanTextForTTS is the request
    // body of the legacy server-TTS fetch (a throw-away copy handed to the provider); segments are built in the hook.
    expect(code(LESSON)).not.toMatch(/buildNarrationSegments|spokenText/)
    const speechUses = code(LESSON).split('\n').filter((l) => /cleanTextForTTS\(/.test(l))
    expect(speechUses).toHaveLength(1)
    expect(speechUses[0]).toContain('body: JSON.stringify({ text: cleanTextForTTS(req.text)')
  })

  it('no TTS handler writes message content: handleSpeak / handleStopSpeech never touch the message list', () => {
    const speak = LESSON.slice(LESSON.indexOf('const handleSpeak = useCallback'), LESSON.indexOf('const handleSpeak = useCallback') + 1400)
    expect(speak).not.toContain('setMessages')
    expect(LESSON.slice(LESSON.indexOf('const handleStopSpeech'), LESSON.indexOf('const handleStopSpeech') + 120)).not.toContain('setMessages')
  })

  it('the speaking state mirrored from voicePlayback is presentation only (a border colour), not a content switch', () => {
    const isSpeakingUses = [...code(LESSON).matchAll(/isSpeaking\b[^\n]*/g)].map((m) => m[0])
    expect(isSpeakingUses.some((l) => /MessageContent|TutorMessageText|displayText|content/.test(l))).toBe(false)
  })

  it('the Read More toggle still drives the display through the same component (expansion is the learner\'s choice, not TTS state)', () => {
    expect(LESSON).toContain("setExpanded((p) => ({ ...p, [msg.id]: !isExpanded }))")
    expect(block).toContain('cached?.hasMore')
  })
})
