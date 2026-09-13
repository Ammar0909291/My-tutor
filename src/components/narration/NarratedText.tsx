'use client'

/**
 * NarratedText — the ONE reusable read-along text renderer.
 *
 * Subject-agnostic: takes `segments` + `activeSegmentIndex` from
 * useNarrationPlayback and renders them as flowing text with the active
 * segment visually darker/more prominent than the rest — no subject, no
 * lesson type, no content-format assumption anywhere in this file.
 *
 * AUTO-SCROLL: keeps the active segment comfortably inside its own
 * scrollable container, without fighting a learner who is deliberately
 * scrolling. `scrollFollow.ts` (pure) decides WHETHER to scroll; this
 * component only supplies the real numbers (rects, timestamps) and tells
 * apart a scroll IT triggered from one the learner triggered — a `wheel`/
 * `touchmove` event only fires from real user input, never from
 * `scrollIntoView()`, so those (not the `scroll` event itself, which fires
 * for both) are what mark "the learner scrolled."
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
  /** Custom per-segment renderer (e.g. to reuse a caller's own markdown/math
   *  inline formatter). Defaults to plain text. */
  renderSegment?: (segment: NarrationSegment) => React.ReactNode
  activeColor?: string
  inactiveColor?: string
  className?: string
  style?: React.CSSProperties
}

export function NarratedText({
  segments, activeSegmentIndex, renderSegment, activeColor, inactiveColor, className, style,
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

  useEffect(() => {
    if (activeSegmentIndex === null) return
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
  }, [activeSegmentIndex])

  return (
    <div ref={containerRef} className={className} style={{ ...style, scrollBehavior: 'smooth' }}>
      {segments.map((segment, i) => {
        const isActive = i === activeSegmentIndex
        return (
          <span
            key={segment.id}
            ref={isActive ? activeRef : undefined}
            data-segment-id={segment.id}
            data-narration-active={isActive || undefined}
            style={{
              color: isActive ? (activeColor ?? 'var(--text-primary)') : (inactiveColor ?? 'var(--text-secondary)'),
              fontWeight: isActive ? 700 : 400,
              transition: 'color 150ms ease, font-weight 150ms ease',
              borderRadius: 4,
              padding: isActive ? '1px 3px' : undefined,
              background: isActive ? 'var(--coral-muted)' : 'transparent',
            }}
          >
            {renderSegment ? renderSegment(segment) : segment.text}
            {i < segments.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </div>
  )
}
