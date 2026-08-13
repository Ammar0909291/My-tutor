import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'

/**
 * HEADER DECLUTTER + COMPACT PROGRESS BAR + DIAGRAM PADDING.
 *
 * ── WHY THE PROGRESS BAR "DISAPPEARED" ──────────────────────────────────────
 * Traced against the actual file: `CompactLessonProgressBar` was never
 * removed — it stayed imported, wired to `masteryState.phase`, and rendered
 * in `PanelHeader` throughout (see the earlier fixes at commits 56b0f1a4 and
 * aeb5dfab, both still intact and re-verified here). What changed is that the
 * SAME `tall` (60px) header had accumulated real horizontal crowding since
 * then: a "More" (⋮) dropdown (Practice/Insights) plus the Got it/Not clear
 * pair, competing for space against Avatar + title + the bar itself +
 * Bookmark + Maximize — on a narrow viewport, or once every optional element
 * rendered simultaneously, the bar had far less room than its ~94px design
 * budget. This suite pins the actual fix: those four controls moved OUT of
 * the header into the bottom action row, so the header is back to
 * "Tutor Max | compact progress" with room to spare, and adds regression
 * coverage so the bar (and its header-only placement) cannot silently
 * regress again.
 */

const SRC = readFileSync(
  path.join(process.cwd(), 'src/components/learn/LessonScreen.tsx'),
  'utf8',
)

const HEADER_START = SRC.indexOf('<PanelHeader tall>')
const HEADER_END = SRC.indexOf('</PanelHeader>', HEADER_START)
const HEADER = SRC.slice(HEADER_START, HEADER_END)

describe('compact progress bar — present, wired, and NOT crowded out', () => {
  it('is imported and rendered exactly once in the Tutor Max header', () => {
    expect(SRC).toMatch(/import \{ CompactLessonProgressBar \} from '@\/components\/learn\/LessonProgressBar'/)
    const occurrences = (SRC.match(/<CompactLessonProgressBar/g) ?? []).length
    expect(occurrences).toBe(1)
    expect(HEADER).toContain('<CompactLessonProgressBar')
  })

  it('still reads the real server-authoritative phase, not invented state', () => {
    const idx = HEADER.indexOf('<CompactLessonProgressBar')
    const block = HEADER.slice(idx, idx + 200)
    expect(block).toContain('phase={masteryState?.phase}')
    expect(block).toContain('masteryVerified={masteryState?.verified === true}')
  })

  it('the header no longer also renders Got it/Not clear/Practice/Insights — the crowding source is gone', () => {
    expect(HEADER).not.toContain("t('lesson_got_it')")
    expect(HEADER).not.toContain("t('lesson_not_clear')")
    expect(HEADER).not.toContain("t('nav_practice')")
    expect(HEADER).not.toContain("t('lesson_insights_btn')")
    expect(HEADER).not.toContain('moreMenuOpen')
  })

  it('the header keeps only the branding, the bar, and the two panel-level controls (bookmark, maximize)', () => {
    expect(HEADER).toContain("t('lesson_tutor_max')")
    expect(HEADER).toContain('<CompactLessonProgressBar')
    expect(HEADER).toContain("t('lesson_bookmark')")
    expect(HEADER).toContain('setMaximizedPanel(')
  })

  it('the dead moreMenuOpen state and its Escape-key handler entry are both removed, not just unused', () => {
    expect(SRC).not.toContain('const [moreMenuOpen, setMoreMenuOpen] = useState(false)')
    expect(SRC).not.toContain('setMoreMenuOpen(false)')
  })
})

// ── THE BOTTOM ACTION ROW — the four relocated controls, functionally intact

const ACTIONS_START = SRC.indexOf('QUICK ACTIONS, WHERE THE LEARNER ACTUALLY IS')
const ACTIONS_END = SRC.indexOf("{/* Pill: attach + camera + textarea + mic", ACTIONS_START)
const ACTIONS_ROW = SRC.slice(ACTIONS_START, ACTIONS_END)

describe('bottom action row — Practice / Insights / Got it / Not clear', () => {
  it('all four now live in the bottom action row, alongside the existing quick actions', () => {
    expect(ACTIONS_ROW).toContain("{t('nav_practice')}")
    expect(ACTIONS_ROW).toContain("{t('lesson_insights_btn')}")
    expect(ACTIONS_ROW).toContain("{t('lesson_got_it')}")
    expect(ACTIONS_ROW).toContain("{t('lesson_not_clear')}")
    // The pre-existing four quick actions are still there too — nothing was
    // replaced, only added alongside.
    expect(ACTIONS_ROW).toContain('QUICK_ACTIONS[teachingLanguage]')
  })

  it('Practice/Insights preserve their exact gate and mutual-exclusivity toggle', () => {
    const idx = ACTIONS_ROW.indexOf("t('nav_practice')")
    const block = ACTIONS_ROW.slice(Math.max(0, idx - 300), idx)
    expect(block).toContain('currentLessonData?.topicSlug &&')
    expect(block).toContain('setInsightsOpen(false); setPracticeOpen((v) => !v)')
  })

  it('Got it/Not clear preserve their exact gate (only once the tutor has said something) and handler', () => {
    const idx = ACTIONS_ROW.indexOf("lastAssistant = [...messages].reverse()")
    expect(idx).toBeGreaterThan(-1)
    const block = ACTIONS_ROW.slice(idx, idx + 1600)
    expect(block).toContain("m.role === 'assistant' && !m.streaming")
    expect(block).toContain("sendMessage(sessionId, teachingLanguage === 'ru' ? 'Понял' : 'Got it', true)")
    expect(block).toContain("I don't understand, explain differently")
  })

  it('no floating/hover dropdown was reintroduced for these controls', () => {
    expect(ACTIONS_ROW).not.toContain('position: \'absolute\'')
    expect(ACTIONS_ROW).not.toContain('aria-haspopup')
  })
})

// ── DIAGRAM CONTAINER PADDING — 3cm on 3 sides, top corrected for alignment ──

describe('diagram container — 3cm padding, top corrected to top-align with the explanation', () => {
  const CSS = readFileSync(
    path.join(process.cwd(), 'src/components/learn/LessonScreen.module.css'),
    'utf8',
  )
  const TSX = readFileSync(
    path.join(process.cwd(), 'src/components/learn/LessonScreen.tsx'),
    'utf8',
  )

  // .canvasVisual appears twice: once sharing the min-width:0 rule with
  // .canvasText, and once in its own standalone block carrying the padding
  // — find THAT one specifically rather than the first match.
  const paddingBlock = [...CSS.matchAll(/\.canvasVisual\s*\{[\s\S]*?\}/g)]
    .map((m) => m[0])
    .find((b) => b.includes('padding'))

  it('a standalone .canvasVisual rule with the padding exists', () => {
    expect(paddingBlock).toBeDefined()
  })

  it('right/bottom/left keep the full 3cm reduction; top does not', () => {
    // Anti-vacuity: pins the exact shorthand (top right bottom left), not
    // just "contains 3cm somewhere" — a uniform `padding: 3cm` would also
    // match a loose "contains 3cm" check while reintroducing the bug this
    // fix closes.
    expect(paddingBlock).toMatch(/padding:\s*2px 3cm 3cm 3cm;/)
  })

  it("top padding matches the tutor bubble's own top padding in canvas mode — pixel-aligned, not merely 'small'", () => {
    // ROOT CAUSE of the reported vertical drop: .teachingCanvas already sets
    // align-items: start, so both grid cells begin at the identical y — the
    // uniform 3cm padding on .canvasVisual alone pushed the figure's visible
    // content 3cm below that shared start line. The fix is this rule's top
    // value, not the grid. 2px is not arbitrary: it is the exact value the
    // left column's own Card carries in canvas mode.
    expect(TSX).toMatch(/padding: hasCanvasVisual \? '2px 0 0 2cm' : '14px 16px'/)
  })

  it('the explanation column carries a 2cm left indent before its text starts (canvas mode only)', () => {
    // Follow-up request: "indention should be 2cm then explanation should
    // start". Lives on the SAME inline padding shorthand as the top-alignment
    // fix above (left value), not a second rule — one canvas-mode padding
    // declaration governs both the top alignment and the left indent.
    expect(TSX).toMatch(/padding: hasCanvasVisual \? '2px 0 0 2cm' : '14px 16px'/)
    // Outside the canvas (no figure), the ordinary chat bubble keeps its
    // existing symmetric padding, unindented — the 2cm indent is canvas-only,
    // not a global bubble change. The false-branch literal must stay exactly
    // '14px 16px', not gain a matching left value of its own.
    const literal = TSX.match(/padding: hasCanvasVisual \? '2px 0 0 2cm' : '([^']*)'/)?.[1]
    expect(literal).toBe('14px 16px')
  })

  it('the 2cm indent and the top-alignment fix survive the mobile single-column collapse', () => {
    // Below 900px the canvas collapses to one column and the diagram moves
    // BELOW the explanation instead of beside it (pre-existing, deliberate —
    // see teachingCanvasLayout.test.ts). The Card's padding is an inline
    // style, not conditioned on the media query, so the same 2px-top/2cm-left
    // padding — and therefore the same indent — applies identically on
    // mobile. Verified visually with Playwright/Chromium at 390px and 768px
    // viewports against the real compiled CSS: indent measured at ~76.6px
    // (2cm) in both cases, no horizontal overflow, no clipped or negative-
    // width diagram frame.
    const block = CSS.match(/@media \(max-width: 900px\)[\s\S]*?\.teachingCanvas\s*\{[\s\S]*?\}/)?.[0] ?? ''
    expect(block).toMatch(/grid-template-columns:\s*minmax\(0,\s*1fr\)/)
    // The media query only touches .teachingCanvas's own track/gap — it must
    // not redefine .canvasVisual's padding or .canvasText's Card padding,
    // which would silently diverge mobile indentation/alignment from desktop.
    expect(block).not.toMatch(/\.canvasVisual/)
    expect(block).not.toMatch(/\.canvasText/)
  })

  it('padding sits INSIDE the existing column (box-sizing), never growing it', () => {
    expect(paddingBlock).toContain('box-sizing: border-box;')
  })

  it('.teachingCanvas still top-aligns both columns — the grid itself was never the problem', () => {
    const block = CSS.match(/\.teachingCanvas\s*\{[\s\S]*?\}/)?.[0] ?? ''
    expect(block).toMatch(/align-items:\s*start;/)
  })

  it('no per-diagram or topic-specific offset was introduced — the fix lives in the one shared layout rule', () => {
    // The instruction was explicit: no arbitrary negative margins on
    // individual diagrams, no topic-specific CSS, no per-visual offsets.
    // CANVAS_VISUAL_FRAME (the wrapper each renderer mounts inside) must
    // carry no margin/top override of its own.
    const frame = TSX.match(/const CANVAS_VISUAL_FRAME: React\.CSSProperties = \{[\s\S]*?\}/)?.[0] ?? ''
    expect(frame).not.toMatch(/margin/)
    expect(frame).not.toMatch(/paddingTop|top:/)
  })

  it('the 50/50 grid split itself is untouched — still exactly two equal tracks', () => {
    expect(CSS).toMatch(/grid-template-columns:\s*minmax\(0,\s*1fr\)\s+minmax\(0,\s*1fr\)/)
  })

  it('.canvasText (the explanation half) carries no new padding — only the diagram half changed', () => {
    const textBlock = CSS.match(/\.canvasText,\n\.canvasVisual\s*\{[\s\S]*?\}/)?.[0] ?? ''
    expect(textBlock).not.toMatch(/padding/)
  })

  it('no renderer component was touched by this change', () => {
    // The padding lives entirely in the CSS module; VisualCard/VisualRenderer/
    // SceneSpecFigure/DynamicVisualRenderer mount calls in LessonScreen.tsx
    // are unchanged from before this task (same components, same props,
    // still per-message via the teaching-canvas's own msg.* fields).
    expect(SRC).toContain('<VisualCard')
    expect(SRC).toContain('<VisualRenderer spec={msg.visualSpec} />')
    expect(SRC).toContain('<SceneSpecFigure spec={msg.sceneSpec} />')
    expect(SRC).toContain('<DynamicVisualRenderer code={msg.dynamicVisualizationCode} />')
  })
})
