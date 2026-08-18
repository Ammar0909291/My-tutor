import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import path from 'path'

/**
 * HEADER DECLUTTER + COMPACT PROGRESS BAR + DIAGRAM PADDING + FINAL LEARN
 * WINDOW UI RESTRUCTURE (Lesson/Code/Chat tabs removed, lesson identity
 * moved into the header, action controls collapsed into one push-up menu).
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
 * budget. Those four controls first moved OUT of the header into a bottom
 * action row (superseded), and now live inside the push-up Actions menu
 * (this file's later describe blocks) — the header itself stays exactly
 * "Tutor Max | lesson identity | compact progress | bookmark | maximize".
 *
 * ── THE FINAL RESTRUCTURE (this revision) ───────────────────────────────────
 * The current-production screenshot this task started from showed the
 * previous restructure had NOT reached the Learn window: a visible
 * Lesson/Code/Chat tab strip, and up to 8 always-visible action buttons
 * eating the mobile screen's vertical space. This suite now also pins:
 *   1. The tab strip and its `activeTab` state are gone entirely (not
 *      hidden with CSS — the state, the buttons and the mobile-only
 *      visibility classes that depended on it are removed from the source).
 *   2. Lesson identity ("Lesson N · Title") is rendered in the SAME
 *      PanelHeader as "Tutor Max", paired with CompactLessonProgressBar.
 *   3. The 8 action controls collapse into ONE real stateful push-up menu
 *      (`actionsMenuOpen`), closed by default, toggled ONLY by its own
 *      button — never by hover, never automatically.
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

  it('the header keeps branding, lesson identity, the bar, and the two panel-level controls (bookmark, maximize)', () => {
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

// ── LESSON IDENTITY, MOVED INTO THE TUTOR MAX HEADER ────────────────────────
//
// Standing UI instruction: with the Lesson/Code/Chat tab strip removed, the
// learner needs to see which lesson they're in from the SAME header, not a
// separate navigation surface. Paired visually with CompactLessonProgressBar
// (both live inside the same right-aligned block, per the mockup's two-line
// "Lesson N · Title" / "[progress]" pairing) — not a second card, not an
// oversized standalone title.

describe('lesson identity lives in the Tutor Max header, compactly', () => {
  it('renders "Lesson N · Title" using the existing progress_lesson_label key, gated on currentLessonData', () => {
    const idx = HEADER.indexOf("t('progress_lesson_label')")
    expect(idx).toBeGreaterThan(-1)
    const before = HEADER.slice(Math.max(0, idx - 700), idx)
    expect(before).toContain('currentLessonData && (')
    const after = HEADER.slice(idx, idx + 120)
    expect(after).toContain('currentLessonData.order')
    expect(after).toContain('currentLessonData.lessonTitle')
  })

  it('CompactLessonProgressBar sits in the SAME block as the lesson identity text, not a separate header slot', () => {
    const idx = HEADER.indexOf("t('progress_lesson_label')")
    const block = HEADER.slice(idx, idx + 900)
    expect(block).toContain('<CompactLessonProgressBar')
  })

  it('the identity text truncates rather than wrapping into a large header', () => {
    const idx = HEADER.indexOf("t('progress_lesson_label')")
    const block = HEADER.slice(Math.max(0, idx - 400), idx + 200)
    expect(block).toMatch(/whiteSpace:\s*'nowrap'/)
    expect(block).toMatch(/textOverflow:\s*'ellipsis'/)
    // Compact font, not an oversized standalone title.
    expect(block).toMatch(/fontSize:\s*12\.6/)
  })
})

// ── LESSON/CODE/CHAT TABS — REMOVED, NOT HIDDEN ─────────────────────────────
//
// The task's own root-cause rule: "Do not simply hide elements with CSS...
// Remove/restructure the obsolete Lesson/Code/Chat navigation architecture."
// These assertions fail on a CSS-only hide (className toggle) just as much as
// on the tabs still existing — the state, the buttons and the mobile-tab
// className branches must be gone from the source, not merely invisible.

describe('the Lesson/Code/Chat tab strip is removed, not hidden', () => {
  it('the activeTab state and its type are gone', () => {
    expect(SRC).not.toContain("useState<ActiveTab>('chat')")
    expect(SRC).not.toContain("type ActiveTab = 'curriculum' | 'code' | 'chat'")
    expect(SRC).not.toMatch(/\bconst \[activeTab, setActiveTab\]/)
  })

  it('no setActiveTab calls remain anywhere in the file', () => {
    expect(SRC).not.toContain('setActiveTab(')
  })

  it('the segmented-control tab strip markup (📚/💻/💬, lesson_tab_* labels) is gone', () => {
    expect(SRC).not.toContain("t('lesson_tab_lesson')")
    expect(SRC).not.toContain("t('lesson_tab_code')")
    expect(SRC).not.toContain("t('lesson_tab_chat')")
    expect(SRC).not.toMatch(/const icons = \['📚', '💻', '💬'\]/)
  })

  it('was not replaced with another large tab bar — no sibling segmented control was introduced', () => {
    // The only remaining tab-shaped construct in the file is the desktop
    // maximize/restore affordance, which is a single per-panel button, not a
    // multi-option strip. No new `role="tablist"` or segmented-control markup.
    expect(SRC).not.toContain('role="tablist"')
    expect(SRC).not.toContain("role='tablist'")
  })

  it('QuickActionsAndCheck (the tab-only mobile quick-actions rail) no longer exists as a component', () => {
    expect(SRC).not.toMatch(/function QuickActionsAndCheck/)
    expect(SRC).not.toContain('<QuickActionsAndCheck')
  })

  it('mobile shows the chat/teaching panel unconditionally; curriculum and code panels are desktop-only', () => {
    // Panel 1 (curriculum) and panel 2 (code/former quick-actions): hidden on
    // mobile unconditionally now, not toggled by a removed tab state.
    expect(SRC).toMatch(/PANEL 1 — CURRICULUM ROADMAP[\s\S]{0,200}<div className="hidden md:contents"/)
    // Panel 3 (chat): always rendered — "contents"/"flex", never gated.
    expect(SRC).toMatch(/PANEL 3 — TUTOR CHAT[\s\S]{0,300}<div className="contents"/)
  })
})

// ── THE PUSH-UP ACTIONS MENU — the 8 relocated controls, functionally intact

const ACTIONS_START = SRC.indexOf('ACTIONS MENU — a single push-up toggle')
const ACTIONS_END = SRC.indexOf("{/* Pill: attach + camera + textarea + mic", ACTIONS_START)
const ACTIONS_ROW = SRC.slice(ACTIONS_START, ACTIONS_END)

describe('push-up Actions menu — collapsed by default, one real toggle', () => {
  it('the menu marker region exists and is non-empty', () => {
    expect(ACTIONS_START).toBeGreaterThan(-1)
    expect(ACTIONS_ROW.length).toBeGreaterThan(0)
  })

  it('is driven by a single real stateful toggle, not a duplicate button tree', () => {
    expect(SRC).toMatch(/const \[actionsMenuOpen, setActionsMenuOpen\] = useState\(false\)/)
    // Exactly one toggle button flips it via a functional update.
    const toggles = (SRC.match(/setActionsMenuOpen\(\(v\) => !v\)/g) ?? []).length
    expect(toggles).toBe(1)
  })

  it('collapsed by default (initial state is false, not true)', () => {
    expect(SRC).toContain('useState(false)')
    expect(SRC).not.toMatch(/const \[actionsMenuOpen, setActionsMenuOpen\] = useState\(true\)/)
  })

  it('the toggle button carries aria-expanded reflecting the real state', () => {
    expect(ACTIONS_ROW).toContain('aria-expanded={actionsMenuOpen}')
  })

  it('all 8 controls (4 quick actions + Practice + Insights + Got it + Not clear) live inside the menu', () => {
    expect(ACTIONS_ROW).toContain('QUICK_ACTIONS[teachingLanguage]')
    expect(ACTIONS_ROW).toContain("{t('nav_practice')}")
    expect(ACTIONS_ROW).toContain("{t('lesson_insights_btn')}")
    expect(ACTIONS_ROW).toContain("{t('lesson_got_it')}")
    expect(ACTIONS_ROW).toContain("{t('lesson_not_clear')}")
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
    const block = ACTIONS_ROW.slice(idx, idx + 2400)
    expect(block).toContain("m.role === 'assistant' && !m.streaming")
    expect(block).toContain("sendMessage(sessionId, teachingLanguage === 'ru' ? 'Понял' : 'Got it', true)")
    expect(block).toContain("I don't understand, explain differently")
  })

  it('selecting any action closes the menu afterward', () => {
    const closes = (ACTIONS_ROW.match(/setActionsMenuOpen\(false\)/g) ?? []).length
    // The 4 quick actions share ONE mapped button template (one source
    // occurrence, fired per-click at runtime for whichever action was
    // tapped) + Practice + Insights + Got it + Not clear = 5 source call
    // sites covering all 8 controls.
    expect(closes).toBe(5)
  })

  it('the menu expands UPWARD from above its own toggle — bottom: 100%, absolutely positioned', () => {
    expect(ACTIONS_ROW).toContain("bottom: '100%'")
    expect(ACTIONS_ROW).toContain("position: 'absolute'")
  })

  it('never resizes the canvas: the popup is absolutely positioned relative to a wrapper the toggle also lives in', () => {
    const wrapperIdx = ACTIONS_ROW.indexOf("position: 'relative'")
    expect(wrapperIdx).toBeGreaterThan(-1)
    expect(wrapperIdx).toBeLessThan(ACTIONS_ROW.indexOf("bottom: '100%'"))
  })

  it('no hover handler opens or closes the menu — only the click toggle', () => {
    expect(ACTIONS_ROW).not.toMatch(/onMouseEnter.*setActionsMenuOpen/)
    expect(ACTIONS_ROW).not.toMatch(/onMouseLeave.*setActionsMenuOpen/)
  })

  it('does not render while an MCQ wizard is active, avoiding the overlap — the toggle itself still works', () => {
    expect(ACTIONS_ROW).toContain('actionsMenuOpen && !activeMcq &&')
  })

  it('has an internal scroll bound (maxHeight) rather than growing unbounded on a short viewport', () => {
    expect(ACTIONS_ROW).toMatch(/maxHeight:\s*'min\(60vh, 380px\)'/)
    expect(ACTIONS_ROW).toContain("overflowY: 'auto'")
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
    // The declaration MOVED from an inline style to `.canvasBubble` in the CSS
    // module. It had to: an inline style cannot carry a media query, and this
    // padding must shrink on a phone (see the mobile test below). The value is
    // byte-for-byte what the inline style set, so desktop is unchanged.
    expect(CSS).toMatch(/\.canvasBubble\s*\{[^}]*padding:\s*2px 0 0 2cm;/)
  })

  it('the explanation column carries a 2cm left indent before its text starts (canvas mode only)', () => {
    // Follow-up request: "indention should be 2cm then explanation should
    // start". One canvas-mode padding declaration governs both the top
    // alignment and the left indent — now `.canvasBubble` rather than an
    // inline style, for the media-query reason above.
    expect(CSS).toMatch(/\.canvasBubble\s*\{[^}]*padding:\s*2px 0 0 2cm;/)
    // The class is applied only in canvas mode...
    expect(TSX).toMatch(/hasCanvasVisual \? ` \$\{styles\.canvasBubble\}` : ''/)
    // ...and outside the canvas (no figure) the ordinary chat bubble keeps its
    // existing symmetric padding, unindented — the 2cm indent is canvas-only,
    // not a global bubble change. The false-branch literal must stay exactly
    // '14px 16px', and the true branch must set NO inline padding, or it would
    // override the responsive class.
    expect(TSX).toMatch(/padding: hasCanvasVisual \? undefined : '14px 16px'/)
  })

  it('THE DESKTOP INSETS ARE DROPPED ON PHONES — they were most of the screen', () => {
    // ── THIS TEST PREVIOUSLY ASSERTED THE DEFECT ──────────────────────────
    // It required the mobile block NOT to touch .canvasVisual/.canvasText, on
    // the reasoning that mobile must not "diverge" from desktop. Its own
    // comment recorded a Playwright check at 390px that found "no horizontal
    // overflow, no clipped or negative-width diagram frame" — all true, and
    // all blind to the actual failure, which is the opposite of overflow: the
    // figure was too SMALL to read.
    //
    // MEASURED against the real CSS in Chromium, before the fix:
    //   viewport 360 -> figure 101.3px wide  (226.8px of a 328px track was padding)
    //   viewport 390 -> figure 131.3px wide
    //   viewport 414 -> figure 155.3px wide
    // After: 328 / 358 / 382px respectively. Desktop at 1280 is unchanged
    // (padding still 113.386px per side, figure still 386.3px).
    //
    // Divergence from desktop is the POINT: 3cm and 2cm are half-column
    // devices, and below 900px the grid above has already collapsed to a
    // single column, so there is no half-column left to inset from.
    const block = CSS.match(/@media \(max-width: 900px\)\s*\{[\s\S]*?\n\}/)?.[0] ?? ''
    expect(block).toMatch(/grid-template-columns:\s*minmax\(0,\s*1fr\)/)
    // The figure gets its width back: no horizontal inset at all.
    expect(block).toMatch(/\.canvasVisual\s*\{[^}]*padding:\s*2px 0 12px;/)
    // The explanation loses its 2cm indent on a phone.
    expect(block).toMatch(/\.canvasBubble\s*\{[^}]*padding:\s*2px 0 0;/)
  })

  it('CASCADE ORDER: the base .canvasBubble precedes the media query', () => {
    // Caught by re-measuring, not by reading: the first version of this fix
    // appended `.canvasBubble`'s base rule to the END of the file, AFTER the
    // media query. Same specificity, so source order decides — the 2cm base
    // won on mobile too, and the measured indent was still 75.59px at 390px
    // while the figure width had correctly changed. Half a fix, and it looked
    // like a whole one everywhere except the number.
    expect(CSS.indexOf('.canvasBubble {')).toBeGreaterThan(-1)
    expect(CSS.indexOf('.canvasBubble {')).toBeLessThan(CSS.indexOf('@media (max-width: 900px)'))
  })

  it('ONE mobile block, not two — the overrides live with the collapse rule', () => {
    expect(CSS.match(/@media \(max-width: 900px\)/g)?.length).toBe(1)
  })

  it('DESKTOP IS UNTOUCHED — the base rules still carry the full insets', () => {
    // The mobile block must be an override, never a replacement: if these base
    // declarations were edited instead, the fix would have silently changed
    // the desktop design it was explicitly not allowed to touch.
    expect(paddingBlock).toMatch(/padding:\s*2px 3cm 3cm 3cm;/)
    expect(CSS).toMatch(/\.canvasBubble\s*\{\s*padding:\s*2px 0 0 2cm;\s*\}/)
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

// ── CHAT SPACE CLEANUP — footer removed, prev/next nav in the controls row ───
//
// "AI can make mistakes. Check important info." (lesson_ai_disclaimer) and the
// unit breadcrumb (currentUnit.title) are removed AT SOURCE — not hidden with CSS,
// not wrapped in display:none, not left in an empty container. The bottom of the
// Tutor Max panel now has exactly two rows:
//   1. [← Previous]  [More options]  [Next →]  — navigation + toggle combined
//   2. [📎 🖼  textarea  🎤  ➤]                — composer pill + send button
// The rejected paddingBottom:0 inline style (maximized-height workaround) is also
// reverted: .canvasVisual's CSS-module padding governs unconditionally again.

const INPUT_START = SRC.indexOf('── Input area ──')
const INPUT_END = SRC.indexOf('</Panel>', INPUT_START)
const INPUT_AREA = SRC.slice(INPUT_START, INPUT_END)

describe('footer cleanup — disclaimer and unit breadcrumb removed at source', () => {
  it('the input area marker exists and the slice is non-empty', () => {
    expect(INPUT_START).toBeGreaterThan(-1)
    expect(INPUT_AREA.length).toBeGreaterThan(0)
  })

  it('lesson_ai_disclaimer is NOT rendered in the input area', () => {
    expect(INPUT_AREA).not.toContain("t('lesson_ai_disclaimer')")
  })

  it('currentUnit.title is NOT rendered in the input area', () => {
    expect(INPUT_AREA).not.toContain('currentUnit.title')
  })

  it('no footer-shaped container (space-between flex, marginTop) remains after the send button', () => {
    // The removed footer was a `justifyContent: space-between` div with
    // `marginTop: 8` containing both strings. If only emptied (not removed),
    // it would still consume vertical space as an invisible gap.
    const afterSend = INPUT_AREA.slice(INPUT_AREA.lastIndexOf("t('lesson_send')"))
    expect(afterSend).not.toMatch(/justifyContent:\s*'space-between'/)
  })

  it('the .canvasVisual div carries no inline paddingBottom override', () => {
    // The rejected maximized-height workaround (paddingBottom: 0 when
    // maximizedPanel === 'chat') is reverted — the CSS-module rule governs.
    const idx = SRC.indexOf("className={hasCanvasVisual ? styles.canvasVisual : undefined}")
    expect(idx).toBeGreaterThan(-1)
    const window = SRC.slice(idx, idx + 200)
    expect(window).not.toContain('paddingBottom')
    expect(window).not.toContain("maximizedPanel === 'chat'")
  })
})

describe('nav + more-options row — Previous/Next buttons combined with More options', () => {
  it('Previous lesson button is present with nav_previous_lesson aria-label', () => {
    expect(INPUT_AREA).toContain("t('nav_previous_lesson')")
  })

  it('Previous lesson button calls startRevision and is disabled when no previous lesson exists', () => {
    const idx = INPUT_AREA.indexOf("t('nav_previous_lesson')")
    const block = INPUT_AREA.slice(Math.max(0, idx - 500), idx + 200)
    expect(block).toContain('startRevision')
    expect(block).toContain('previousLessonData')
    expect(block).toContain('disabled={!previousLessonData}')
  })

  it('Next lesson button is present with nav_next_lesson aria-label', () => {
    expect(INPUT_AREA).toContain("t('nav_next_lesson')")
  })

  it('Next lesson button calls requestLessonSwitch and is disabled when no next lesson exists', () => {
    const idx = INPUT_AREA.indexOf("t('nav_next_lesson')")
    const block = INPUT_AREA.slice(Math.max(0, idx - 500), idx + 200)
    expect(block).toContain('requestLessonSwitch')
    expect(block).toContain('nextLessonData')
    expect(block).toContain('disabled={!nextLessonData}')
  })

  it('More options toggle remains the single actionsMenuOpen flipper', () => {
    expect(INPUT_AREA).toContain('aria-expanded={actionsMenuOpen}')
    const toggles = (SRC.match(/setActionsMenuOpen\(\(v\) => !v\)/g) ?? []).length
    expect(toggles).toBe(1)
  })
})
