/**
 * MessageContent — the ONE renderer of a lesson message's DISPLAY text: Markdown spans (bold, italic, inline code),
 * headings, bullet and numbered lists, and LaTeX through KaTeX (`\(...\)` inline, `\[...\]` / `$$...$$` display).
 *
 * Moved verbatim out of LessonScreen.tsx (no behaviour change) so that the message view and the tests share ONE
 * implementation. LessonScreen still imports `extractDisplayMath` and `renderInline` for LessonDocument.
 */
import { Fragment } from 'react'
import katex from 'katex'

// ─── MessageContent ───────────────────────────────────────────────────────────
// LaTeX math: the AI writes display math as \[...\] / $$...$$ (often spanning
// multiple lines) and inline math as \(...\). Deliberately NOT matching bare
// $...$ — that collides with plain currency mentions (economics/finance
// content). Display math is extracted from the FULL message text (via
// extractDisplayMath) before the caller splits it into lines/blocks, and
// swapped for a single-line placeholder so a multi-line \[...\] block
// survives line-splitting intact; renderInline then resolves placeholders
// (and matches inline \(...\) directly, since that never spans lines).
const DISPLAY_MATH_RE = /\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]/g
const PLACEHOLDER_RE = /(\d+)/
const INLINE_MATH_OR_PLACEHOLDER_RE = /(\\\([\s\S]+?\\\)|\d+)/g

export function extractDisplayMath(text: string): { text: string; blocks: string[] } {
  const blocks: string[] = []
  const replaced = text.replace(DISPLAY_MATH_RE, (m) => {
    blocks.push(m)
    return `${blocks.length - 1}`
  })
  return { text: replaced, blocks }
}

function renderMath(raw: string, key: string, displayMode: boolean): React.ReactNode {
  const content = raw.slice(2, -2).trim()
  let html: string
  try {
    html = katex.renderToString(content, { throwOnError: false, displayMode })
  } catch {
    return raw
  }
  return (
    <span
      key={key}
      style={displayMode ? { display: 'block', overflowX: 'auto', margin: '4px 0' } : undefined}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function renderMarkdownSpans(text: string, key: string, codeStyle: string): React.ReactNode {
  const re = /(\*\*[^*\n]+\*\*|\*[^*\n]+\*|`[^`\n]+`)/g
  const parts: React.ReactNode[] = []; let last = 0; let i = 0; let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    const raw = m[0]
    if (raw.startsWith('**')) parts.push(<strong key={`${key}-b${i}`} style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{raw.slice(2,-2)}</strong>)
    else if (raw.startsWith('*')) parts.push(<em key={`${key}-i${i}`} style={{ color: 'var(--text-secondary)' }}>{raw.slice(1,-1)}</em>)
    else parts.push(<code key={`${key}-c${i}`} className={codeStyle}>{raw.slice(1,-1)}</code>)
    last = m.index + raw.length; i++
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts.length === 0 ? text : parts
}

export function renderInline(text: string, key: string, codeStyle: string, mathBlocks: string[] = []): React.ReactNode {
  const parts: React.ReactNode[] = []; let last = 0; let mi = 0; let m: RegExpExecArray | null
  INLINE_MATH_OR_PLACEHOLDER_RE.lastIndex = 0
  while ((m = INLINE_MATH_OR_PLACEHOLDER_RE.exec(text)) !== null) {
    if (m.index > last) parts.push(renderMarkdownSpans(text.slice(last, m.index), `${key}-t${mi}`, codeStyle))
    const raw = m[0]
    const placeholder = raw.match(PLACEHOLDER_RE)
    if (placeholder) parts.push(renderMath(mathBlocks[Number(placeholder[1])] ?? '', `${key}-m${mi}`, true))
    else parts.push(renderMath(raw, `${key}-m${mi}`, false))
    last = m.index + raw.length; mi++
  }
  if (last < text.length) parts.push(renderMarkdownSpans(text.slice(last), `${key}-t${mi}`, codeStyle))
  return parts.length === 0 ? text : parts
}

/**
 * A model sometimes writes a whole list on ONE line ("- In the s-block … +2. - When you enter the p-block …"; chemistry QA 2026-10-14, "Modern Periodic Law"), and
 * this renderer is line-based, so the second item showed inside the first bullet as a stray " - ". Split a bullet's text at a list marker that can only be one: a
 * sentence end, whitespace, a dash / bullet, whitespace, then a capital letter. A dash inside a sentence ("Group 1 - the alkali metals") has no sentence end before
 * it and is left alone. Display only: the stored message, the narration text and the grading never see this.
 */
export function splitCollapsedBullets(bulletText: string): string[] {
  return bulletText.split(/(?<=[.!?])\s+[-•]\s+(?=\p{Lu})/u).map((t) => t.trim()).filter((t) => t.length > 0)
}

export function MessageContent({ text, isUser }: { text: string; isUser: boolean }) {
  const codeStyle = `px-1.5 py-0.5 rounded text-[0.82em] font-mono ${isUser ? 'bg-white/20' : 'bg-black/30'} ${isUser ? '' : 'text-[var(--coral)]'}`
  const { text: textWithPlaceholders, blocks: mathBlocks } = extractDisplayMath(text)
  return (
    <div className="space-y-1">
      {textWithPlaceholders.split('\n').map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />
        if (line.match(/^#+\s/)) return <p key={i} className="font-bold" style={{ color: 'var(--text-primary)' }}>{renderInline(line.replace(/^#+\s/, ''), `${i}`, codeStyle, mathBlocks)}</p>
        const bullet = line.match(/^[-•*]\s+(.*)$/)
        if (bullet) return (
          <Fragment key={i}>
            {splitCollapsedBullets(bullet[1]).map((item, j) => (
              <div key={j} className="flex gap-2">
                <span className="mt-0.5 shrink-0 text-xs" style={{ color: 'var(--coral)' }}>▸</span>
                <span>{renderInline(item, `${i}-${j}`, codeStyle, mathBlocks)}</span>
              </div>
            ))}
          </Fragment>
        )
        const num = line.match(/^(\d+)\.\s+(.*)$/)
        if (num) return (
          <div key={i} className="flex gap-2">
            <span className="tabular-nums text-xs mt-0.5 shrink-0 font-mono" style={{ color: 'var(--coral)' }}>{num[1]}.</span>
            <span>{renderInline(num[2], `${i}`, codeStyle, mathBlocks)}</span>
          </div>
        )
        return <p key={i}>{renderInline(line, `${i}`, codeStyle, mathBlocks)}</p>
      })}
    </div>
  )
}

/**
 * The body of a tutor message bubble: its DISPLAY text through MessageContent, and nothing else.
 *
 * It takes the display text and NOTHING ELSE — no narration/TTS state, no segments, no word index. That is the whole
 * point: what a learner reads is a pure function of the display source, so starting, pausing, finishing or failing a
 * narration can never change how it is drawn (the defect this closes: LessonScreen used to swap this for a
 * word-by-word plain-text view the moment narration left IDLE, which showed `**predicate**`, `\forall`, `\[...\]` and
 * `\(...\)` as raw characters). Speech preparation (`cleanTextForTTS`, segmentation) happens inside
 * useNarrationPlayback on a separate string and never reaches this component.
 */
export function TutorMessageText({ displayText }: { displayText: string }) {
  return (
    <div className="animate-message" style={{ fontSize: 15.6, lineHeight: 1.6, color: 'var(--text-primary)' }}>
      <MessageContent text={displayText} isUser={false} />
    </div>
  )
}
