import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'

const read = (p: string) => readFileSync(join(process.cwd(), p), 'utf8')
const SRC = read('src/components/learn/LessonScreen.tsx')
const CSS = read('src/components/learn/LessonScreen.module.css')
const I18N = read('src/lib/i18n.ts')

// The Quick Check panel gained window controls (minimize / maximize / close).
// They are PRESENTATION ONLY: the invariant these tests defend is that no
// control can answer, grade, clear the pending assessment, or move mastery.
const gateIdx = SRC.indexOf("{activeMcq && !isStreaming && !lessonCompletion && quickCheckMode !== 'closed' && (")
const PANEL = SRC.slice(gateIdx, SRC.indexOf('/* CLOSED:', gateIdx))
const REOPEN = SRC.slice(SRC.indexOf('/* CLOSED:'), SRC.indexOf('{/* ── Input area ─'))

describe('Quick Check window controls — presentation state', () => {
  it('1. the window mode is its own state, separate from activeMcq', () => {
    expect(SRC).toContain("const [quickCheckWindow, setQuickCheckWindow] = useState<{ askedAt: number; mode: 'expanded' | 'minimized' | 'closed' } | null>(null)")
  })

  it('2. a newly served question always arrives expanded (mode is keyed on askedAt)', () => {
    expect(SRC).toContain('quickCheckWindow.askedAt === activeMcq.askedAt')
    expect(SRC).toMatch(/\?\s*quickCheckWindow\.mode\s*\n\s*:\s*'expanded'/)
  })

  it('3. all three controls exist with accessible labels', () => {
    for (const key of ['lc_qc_minimize', 'lc_qc_maximize', 'lc_qc_close']) {
      expect(PANEL).toContain(`aria-label={t('${key}')}`)
    }
    expect(PANEL).toContain('&#8211;') // minimize glyph
    expect(PANEL).toContain('&#9633;') // maximize glyph
    expect(PANEL).toContain('&#215;')  // close glyph
  })

  it('4. every control handler writes ONLY the window mode — no answer, no state change', () => {
    const handlers = [...PANEL.matchAll(/onClick=\{\(\) => (setQuickCheckWindow\([^)]*\))\}/g)]
    expect(handlers.length).toBe(3)
    for (const h of handlers) {
      expect(h[1]).toContain('askedAt: activeMcq.askedAt')
    }
    // The one forbidden thing: a control must never take the answer path.
    // Scoped to CODE only — the region's own explanatory comment names these
    // very identifiers, and a substring check would match the prose.
    const controlRegion = PANEL
      .slice(PANEL.indexOf('WINDOW CONTROLS'), PANEL.indexOf("{quickCheckMode === 'expanded' && ("))
      .split('\n')
      .filter((line) => !/^\s*(\/\*|\*|\/\/|ONLY `|clears activeMcq)/.test(line.trim()) && !line.includes('*/'))
      .join('\n')
    expect(controlRegion).not.toContain('sendMessage')
    expect(controlRegion).not.toContain('setActiveMcq')
    expect(controlRegion).not.toContain('setMasteryState')
    expect(controlRegion).not.toContain('setMcqHistoryLog')
    expect(controlRegion).not.toContain('pendingMcqMasteryBaselineRef')
  })

  it('5. minimize hides the question and options, keeps the labelled header', () => {
    expect(PANEL).toContain("{quickCheckMode === 'expanded' && (\n")
    expect(PANEL).toContain("{quickCheckMode === 'expanded' && activeMcq.options.map((option, i) => (")
    // the header label is outside the expanded guard
    expect(PANEL.indexOf("t('lc_quick_check_label')")).toBeLessThan(PANEL.indexOf("{quickCheckMode === 'expanded' &&"))
  })

  it('6. minimized shows a maximize control instead of minimize', () => {
    expect(PANEL).toContain("{quickCheckMode === 'expanded' ? (")
  })

  it('7. close hides the panel but leaves a reopen affordance — the MCQ is not lost', () => {
    const reopen = REOPEN
    expect(reopen).toContain("quickCheckMode === 'closed' && (")
    expect(reopen).toContain("aria-label={t('lc_qc_reopen')}")
    expect(reopen).toContain("mode: 'expanded'")
    expect(reopen).toContain('activeMcq && !isStreaming && !lessonCompletion')
    expect(reopen).not.toContain('setActiveMcq')
    expect(reopen).not.toContain('sendMessage')
  })

  it('8. the answer channel is untouched: tapping an option still routes through sendMessage', () => {
    expect(PANEL).toContain('void sendMessage(sessionId, option)')
    expect(PANEL).toContain('setActiveMcq(null)')
  })

  it('9. controls use the existing coral accent and are comfortably tappable on mobile', () => {
    const idx = CSS.indexOf('.quickCheckControl {')
    const block = CSS.slice(idx, idx + 500)
    expect(block).toContain('color: var(--coral)')
    const mobile = CSS.slice(CSS.lastIndexOf('@media (max-width: 640px)'))
    expect(mobile).toMatch(/\.quickCheckControl \{ width: 34px; height: 34px; \}/)
    const reopenCss = CSS.slice(CSS.indexOf('.quickCheckReopen {'))
    expect(reopenCss).toContain('min-height: 40px')
  })

  it('10. all three language blocks carry the new keys — no untranslated control', () => {
    for (const key of ['lc_qc_minimize', 'lc_qc_maximize', 'lc_qc_close', 'lc_qc_reopen']) {
      expect(I18N.split(`${key}:`).length - 1).toBe(3)
    }
  })

  it('11. Quick Check remains the ONLY visual owner of the MCQ — no duplicate in chat', () => {
    expect(SRC.split('activeMcq.options.map(').length - 1).toBe(1)
  })
})
