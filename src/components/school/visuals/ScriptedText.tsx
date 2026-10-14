import { Fragment } from 'react'
import { splitScripts } from '@/lib/teaching/visual/scriptedText'

/**
 * A script is 0.72 of its line, but never under the 10 px type floor the figure audit (RD-01) and the legibility pass hold every
 * glyph to — at a 12 px label 0.72em is 8.6 px, which the audit rightly failed (Carnot "T_h", "T_c", 2026-10-14). Where the floor
 * wins, the script is nearly as big as the line; the raised/lowered offset still tells it apart.
 */
export const SCRIPT_SIZE = 'max(10px, 0.72em)'

/**
 * Figure text with its subscripts and superscripts drawn as such (`T_h` → T with a small h below, `e^(iπ)` → e with a
 * raised iπ). Text without a script is returned as the bare string, so every other label renders exactly as before.
 * `line-height: 0` on the script keeps the line box — and therefore the height the label solver reserved — unchanged.
 */
export function ScriptedText({ text }: { text: string }) {
  const parts = splitScripts(text)
  if (parts.length === 1 && parts[0].kind === 'plain') return <>{text}</>
  return (
    <>
      {parts.map((p, i) => {
        if (p.kind === 'plain') return <Fragment key={i}>{p.text}</Fragment>
        const Tag = p.kind === 'sub' ? 'sub' : 'sup'
        return (
          <Tag
            key={i}
            style={{ fontSize: SCRIPT_SIZE, lineHeight: 0, position: 'relative', verticalAlign: 'baseline', top: p.kind === 'sub' ? '0.28em' : '-0.5em' }}
          >
            {p.text}
          </Tag>
        )
      })}
    </>
  )
}
