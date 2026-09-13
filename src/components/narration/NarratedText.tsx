'use client'

/**
 * NarratedText — the ONE reusable read-along text renderer.
 *
 * Subject-agnostic: takes `segments` + `activeSegmentIndex` + `activeWordIndex`
 * from useNarrationPlayback and renders each segment's words individually,
 * with the single word currently being spoken visually darker/more
 * prominent than the rest — no subject, no lesson type, no content-format
 * assumption anywhere in this file.
 *
 * WORD-LEVEL, NOT SENTENCE-LEVEL: each segment is rendered from its own
 * `renderedWords` token list (words.ts) — an ordered mix of 'word' and
 * 'space' tokens whose concatenation reproduces the segment's rendered text
 * exactly, so highlighting individual words never mangles whitespace or
 * punctuation. Only ONE word is ever marked active at a time (the segment
 * index + word index the caller supplies); every other word — spoken
 * already or not yet reached — renders in the same plain "normal" style,
 * matching this design's existing binary active/inactive scheme (there is
 * no separate "already spoken" visual state to preserve).
 *
 * AUTO-SCROLL: keeps the active WORD comfortably inside its own scrollable
 * container, without fighting a learner who is deliberately scrolling.
 * `scrollFollow.ts` (pure) decides WHETHER to scroll; this component only
 * supplies the real numbers (rects, timestamps) and tells apart a scroll IT
 * triggered from one the learner triggered — a `wheel`/`touchmove` event
 * only fires from real user input, never from `scrollIntoView()`, so those
 * (not the `scroll` event itself, which fires for both) are what mark "the
 * learner scrolled."
 */
import { useEffect, useRef } from 'react'
import type { NarrationSegment } from '@/lib/narration/types'
import { isComfortablyVisible, shouldAutoScroll, type Rect } from '@/lib/narration/scrollFollow'

/**
 * The element this component renders (`containerRef`) is a plain, non-
 * scrolling text wrapper — it auto-sizes to its content, so its own
 * bounding rect always fully contains every child span regardless of
 * whether that span is actually visible on screen. Checking visibility
 * against THAT rect would make `isComfortablyVisible` return true always,
 * silently disabling auto-scroll. The real "viewport" is whichever
 * scrollable ANCESTOR actually clips this content (e.g. the lesson's
 * messages list) — found generically here with no assumption about the
 * caller's DOM structure (this component must stay reusable outside
 * LessonScreen too), falling back to the browser viewport when no
 * scrollable ancestor exists.
 */
function findScrollContainerRect(el: HTMLElement | null): Rect {
  let node = el?.parentElement ?? null
  while (node && node !== document.body && node !== document.documentElement) {
    const style = window.getComputedStyle(node)
    const scrollsY = (style.overflowY === 'auto' || style.overflowY === 'scroll') && node.scrollHeight > node.clientHeight
    if (scrollsY) {
      const rect = node.getBoundingClientRect()
      return { top: rect.top, bottom: rect.bottom }
    }
    node = node.parentElement
  }
  return { top: 0, bottom: window.innerHeight }
}

export interface NarratedTextProps {
  segments: NarrationSegment[]
  activeSegmentIndex: number | null
  /** Index into `segments[activeSegmentIndex].renderedWords` (word-kind
   *  tokens only) — the single word to highlight. */
  activeWordIndex: number | null
  /** Custom per-segment renderer (e.g. to reuse a caller's own markdown/math
   *  inline formatter). When supplied, that segment opts OUT of automatic
   *  word-level highlighting — the caller owns its own rendering entirely.
   *  Defaults to the built-in word-by-word renderer. */
  renderSegment?: (segment: NarrationSegment) => React.ReactNode
  activeColor?: string
  inactiveColor?: string
  className?: string
  style?: React.CSSProperties
}

export function NarratedText({
  segments, activeSegmentIndex, activeWordIndex, renderSegment, activeColor, inactiveColor, className, style,
}: NarratedTextProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const activeRef = useRef<HTMLSpanElement | null>(null)
  const lastManualScrollAt = useRef<number | null>(null)
  const programmaticScrollUntil = useRef(0)

  // A real user gesture (wheel/touch/keyboard) marks "manual scroll" —
  // scrollIntoView() never dispatches these, so our own auto-follow can
  // never be mistaken for the learner's action.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const markManual = () => {
      if (Date.now() < programmaticScrollUntil.current) return
      lastManualScrollAt.current = Date.now()
    }
    el.addEventListener('wheel', markManual, { passive: true })
    el.addEventListener('touchmove', markManual, { passive: true })
    el.addEventListener('keydown', markManual)
    return () => {
      el.removeEventListener('wheel', markManual)
      el.removeEventListener('touchmove', markManual)
      el.removeEventListener('keydown', markManual)
    }
  }, [])

  // Follows the active WORD, not the whole sentence — re-runs on every word
  // advance, not just every segment change.
  useEffect(() => {
    if (activeSegmentIndex === null || activeWordIndex === null) return
    const container = containerRef.current
    const active = activeRef.current
    if (!container || !active) return
    if (!shouldAutoScroll(Date.now(), lastManualScrollAt.current)) return

    const containerRect = findScrollContainerRect(container)
    const activeRect = active.getBoundingClientRect()
    const margin = 24
    if (isComfortablyVisible(activeRect, containerRect, margin)) return

    // Mark the next ~600ms of scroll activity as "ours" so the smooth-scroll
    // this triggers can't itself be read back as a manual scroll.
    programmaticScrollUntil.current = Date.now() + 600
    active.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [activeSegmentIndex, activeWordIndex])

  return (
    <div ref={containerRef} className={className} style={{ ...style, scrollBehavior: 'smooth' }}>
      {segments.map((segment, segIdx) => {
        const isActiveSegment = segIdx === activeSegmentIndex
        return (
          <span key={segment.id} data-segment-id={segment.id}>
            {renderSegment
              ? renderSegment(segment)
              : segment.renderedWords.map((token, tokenIdx) => {
                  if (token.kind === 'space') return token.text
                  const isActiveWord = isActiveSegment && token.wordIndex === activeWordIndex
                  return (
                    <span
                      key={tokenIdx}
                      ref={isActiveWord ? activeRef : undefined}
                      data-word-index={token.wordIndex}
                      data-narration-active={isActiveWord || undefined}
                      style={{
                        color: isActiveWord ? (activeColor ?? 'var(--text-primary)') : (inactiveColor ?? 'var(--text-secondary)'),
                        fontWeight: isActiveWord ? 700 : 400,
                        transition: 'color 150ms ease, font-weight 150ms ease',
                        borderRadius: 3,
                        padding: isActiveWord ? '0 2px' : undefined,
                        background: isActiveWord ? 'var(--coral-muted)' : 'transparent',
                      }}
                    >
                      {token.text}
                    </span>
                  )
                })}
            {segIdx < segments.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </div>
  )
}
