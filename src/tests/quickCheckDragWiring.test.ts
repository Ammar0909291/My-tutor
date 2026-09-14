import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

const read = (p: string) => readFileSync(join(process.cwd(), p), 'utf8')
const SRC = read('src/components/learn/LessonScreen.tsx')

// The Quick Check panel is draggable via its header only. These assertions
// defend the same invariants quickCheckWindowControls.test.ts already
// defends for minimize/maximize/close: the drag mechanism must never reach
// the answer options, must never touch activeMcq/mastery/server state, and
// must never persist to a database — plus its own new requirements
// (viewport-clamped, no text selection, window controls stay clickable).
const gateIdx = SRC.indexOf("{activeMcq && !isStreaming && !lessonCompletion && panelIsVisible(quickCheckMode) && (")
const PANEL = SRC.slice(gateIdx, SRC.indexOf('/* CLOSED:', gateIdx))
// The header row is the region between the drag-handle comment and the
// close-control's closing </div> that quickCheckWindowControls.test.ts
// already anchors its own "controlRegion" scan to.
const HEADER = PANEL.slice(PANEL.indexOf('DRAG HANDLE'), PANEL.indexOf('{questionIsVisible(quickCheckMode) && ('))
// Everything AFTER the header row (the question text + options) — must
// never receive a drag listener.
const BODY = PANEL.slice(PANEL.indexOf('{questionIsVisible(quickCheckMode) && ('))

describe('Quick Check panel — draggable via its header, and nothing else', () => {
  it('reuses the existing pure quickCheckDrag module — no bespoke inline drag math', () => {
    expect(SRC).toContain("import { nextDragOffset, clampDragOffset, ZERO_DRAG_OFFSET, type DragPoint } from '@/lib/learn/quickCheckDrag'")
  })

  it('the drag offset is component state, reset whenever a genuinely NEW question arrives (same askedAt-keying discipline as quickCheckWindow)', () => {
    expect(SRC).toContain('const [quickCheckDragOffset, setQuickCheckDragOffset] = useState<DragPoint>(ZERO_DRAG_OFFSET)')
    expect(SRC).toContain('useEffect(() => { setQuickCheckDragOffset(ZERO_DRAG_OFFSET) }, [activeMcq?.askedAt])')
  })

  it('there is no DB/API persistence call anywhere near the drag state — pure in-memory UI state only', () => {
    expect(SRC).not.toMatch(/quickCheckDragOffset[\s\S]{0,80}(fetch\(|sendMessage\(|\/api\/)/)
  })

  it('the drag pointer handlers live ONLY on the header row, not on the panel body (options)', () => {
    expect(HEADER).toContain('onPointerDown={handleQuickCheckHeaderPointerDown}')
    expect(HEADER).toContain('onPointerMove={handleQuickCheckHeaderPointerMove}')
    expect(HEADER).toContain('onPointerUp={endQuickCheckDrag}')
    expect(HEADER).toContain('onPointerCancel={endQuickCheckDrag}')
    expect(BODY).not.toContain('onPointerDown')
    expect(BODY).not.toContain('handleQuickCheckHeaderPointerDown')
  })

  it('the pointerdown handler bails out on a click that started on a <button> — window controls stay clickable and never start a drag', () => {
    const HOOK_SRC = SRC.slice(SRC.indexOf('const handleQuickCheckHeaderPointerDown'), SRC.indexOf('const handleQuickCheckHeaderPointerMove'))
    expect(HOOK_SRC).toContain("closest('button')")
    expect(HOOK_SRC.indexOf("closest('button')")).toBeLessThan(HOOK_SRC.indexOf('setPointerCapture'))
  })

  it('the header prevents text selection while dragging (userSelect none) and disables native touch scrolling (touchAction none) so a touch drag works', () => {
    expect(HEADER).toContain("userSelect: 'none'")
    expect(HEADER).toContain("WebkitUserSelect: 'none'")
    expect(HEADER).toContain("touchAction: 'none'")
  })

  it('the panel position is a CSS transform layered on top of the existing centering translate — the class/CSS layout itself is untouched', () => {
    expect(PANEL).toContain('transform: `translate(calc(-50% + ${quickCheckDragOffset.x}px), ${quickCheckDragOffset.y}px)`')
    // Still uses the SAME className/CSS module class as before — no second
    // floating-window system, no portal, no new overlay layer.
    expect(PANEL).toContain('className={quickCheckMode === \'minimized\' ? `${styles.quickCheckFloating} ${styles.quickCheckMinimized}` : styles.quickCheckFloating}')
  })

  it('dragging is clamped against the viewport via the pure clampDragOffset — never lets the panel go fully off-screen', () => {
    const MOVE_HANDLER = SRC.slice(SRC.indexOf('const handleQuickCheckHeaderPointerMove'), SRC.indexOf('const endQuickCheckDrag'))
    expect(MOVE_HANDLER).toContain('clampDragOffset(proposed, drag.naturalRect, { width: window.innerWidth, height: window.innerHeight })')
  })

  it('the drag handlers never touch activeMcq, mastery, or the answer channel — presentation only, same discipline as the window controls', () => {
    const DRAG_HANDLERS = SRC.slice(SRC.indexOf('const handleQuickCheckHeaderPointerDown'), SRC.indexOf('const endQuickCheckDrag') + 300)
    expect(DRAG_HANDLERS).not.toContain('setActiveMcq')
    expect(DRAG_HANDLERS).not.toContain('sendMessage')
    expect(DRAG_HANDLERS).not.toContain('setMasteryState')
  })

  it('window controls (minimize/maximize/close) remain present and unchanged inside the draggable header', () => {
    for (const key of ['lc_qc_minimize', 'lc_qc_maximize', 'lc_qc_close']) {
      expect(HEADER).toContain(`aria-label={t('${key}')}`)
    }
  })

  it('the answer options are rendered outside the drag handle entirely — clicking/tapping an answer is unaffected', () => {
    expect(BODY).toContain('void sendMessage(sessionId, option)')
  })
})
