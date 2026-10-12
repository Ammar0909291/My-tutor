/**
 * THE PRODUCTION-AUDIT HARNESS MUST MEASURE THE FIGURE OF THE REPLY IT ASKED FOR.
 *
 * `/learn` lists the lesson's messages from every session, so a retry or a restored session leaves one figure per
 * reply on the page. The first harness took the first figure (18 retries kept measuring the first, short reply and the
 * report blamed the normal-force diagram for a fifth step the harness never looked at); "the last figure" fixed that
 * and is wrong as soon as anything sits after the target. This drives `selectTargetFigure` / `markFigure` (the code
 * scripts/qa/physicsProductionBrowserAudit.ts runs) in real Chromium on lesson pages built the way /learn builds them,
 * and proves the failure mode is detected, not only the happy path.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { chromium, type Browser, type Page } from 'playwright'
import { replyKey, selectTargetFigure, markFigure } from '../../scripts/qa/physicsVisual/figureAssociation'
import { findChromium, REQUIRE_BROWSER } from './helpers/chromiumPath'

const CHROMIUM = findChromium()
if (!CHROMIUM) console.warn(`[figureAssociationBrowser] no Chromium found — ${REQUIRE_BROWSER ? 'FAILING' : 'skipping'} the browser suite`)
const suite = CHROMIUM || REQUIRE_BROWSER ? describe : describe.skip

const REPLY = {
  short: 'Take a look at the diagram on your screen. An arrow pointing straight down is the weight of the block.',
  long: 'Here is a block resting on a flat table. The weight acts straight down. The table pushes straight up with the normal force. These two arrows are equal in length. Friction opposes any sliding. An applied push points the other way. Together these five arrows are the whole free-body diagram.',
  mid: 'The normal force is perpendicular to the surface: it points away from the table, never along it.',
  markdown: '**Force** is a push or a pull (measured in N). A diagram _shows_ each force as an arrow with a label.',
}
const stepsOf = (t: string) => t.split(/[.!?]+\s+/).filter(Boolean).length

type Msg = { text: string; figure?: 'card' | 'scene' | '3d-card'; tag?: string }
/** A lesson page as /learn renders it: a message block (text + its figure frame) per reply, oldest first. */
function lessonPage(msgs: Msg[], layout: 'stacked' | 'canvas' = 'stacked'): string {
  const fig = (m: Msg, i: number) => {
    if (m.figure === 'card') return `<div class="frame"><div role="figure" aria-label="Visual aid: Force Diagram" data-fixture="${m.tag ?? i}" data-fixture-steps="${stepsOf(m.text)}"><svg width="40" height="20"></svg></div></div>`
    if (m.figure === '3d-card') return `<div class="frame"><div role="figure" aria-label="Visual aid: Orbital" data-fixture="${m.tag ?? i}"><div data-scene-box></div></div></div>`
    if (m.figure === 'scene') return `<div class="frame" data-fixture="${m.tag ?? i}"><div data-scene-box></div><div>Play the stages <input type="range"></div></div>`
    return ''
  }
  const block = (m: Msg, i: number) => layout === 'stacked'
    ? `<div class="msg" data-message-id="m${i}"><div class="bubble">${m.text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/_(.+?)_/g, '<em>$1</em>')}</div>${fig(m, i)}</div>`
    : `<div class="msg" data-message-id="m${i}"><div class="left"><div class="bubble">${m.text}</div></div><div class="right">${fig(m, i)}</div></div>`
  return `<!doctype html><html><body><div id="list">${msgs.map(block).join('')}</div></body></html>`
}

suite('the harness measures the figure of the reply it asked for', { timeout: 60_000 }, () => {
  let browser: Browser
  beforeAll(async () => { browser = await chromium.launch({ executablePath: CHROMIUM ?? undefined, args: ['--no-sandbox'] }) }, 60_000)
  afterAll(async () => { await browser?.close() })
  const open = async (msgs: Msg[], layout?: 'stacked' | 'canvas'): Promise<Page> => {
    const page = await (await browser.newContext()).newPage()
    await page.setContent(lessonPage(msgs, layout))
    return page
  }
  const marked = (page: Page) => page.evaluate(() => {
    const frames = document.querySelectorAll('[data-audit-frame]')
    const f = frames[0]
    return { count: frames.length, tag: f?.getAttribute('data-fixture') ?? f?.querySelector('[data-fixture]')?.getAttribute('data-fixture') ?? f?.closest('[data-fixture]')?.getAttribute('data-fixture') ?? null, steps: f?.getAttribute('data-fixture-steps') ?? null }
  })

  it('a reply key is stable across markdown and punctuation', () => {
    expect(replyKey(REPLY.markdown)).toBe(replyKey(REPLY.markdown.replace(/\*\*/g, '').replace(/_/g, '')))
    expect(replyKey(REPLY.long).length).toBeGreaterThan(20)
  })

  it('SHORT THEN LONG: the long reply is selected, and the short one is not', async () => {
    const page = await open([{ text: REPLY.short, figure: 'card', tag: 'short' }, { text: REPLY.long, figure: 'card', tag: 'long' }])
    const sel = await selectTargetFigure(page, { replyText: REPLY.long })
    expect(sel).toMatchObject({ index: 1, total: 2, kind: 'card', selection: 'association', ambiguous: false })
    await markFigure(page, sel.index)
    expect(await marked(page)).toMatchObject({ count: 1, tag: 'long', steps: String(stepsOf(REPLY.long)) })
    await page.context().close()
  })

  it('LONG THEN SHORT: the first (long) one is selected when that was the reply asked for', async () => {
    const page = await open([{ text: REPLY.long, figure: 'card', tag: 'long' }, { text: REPLY.short, figure: 'card', tag: 'short' }])
    const sel = await selectTargetFigure(page, { replyText: REPLY.long })
    expect(sel.index).toBe(0)
    await markFigure(page, sel.index)
    expect((await marked(page)).tag).toBe('long')
    // "the last card" would have been the short one: the old rule's answer is wrong here, this rule's is right
    const selShort = await selectTargetFigure(page, { replyText: REPLY.short })
    expect(selShort.index).toBe(1)
    await page.context().close()
  })

  it('a figure AFTER the target does not become the target (target is in the middle)', async () => {
    const page = await open([
      { text: REPLY.short, figure: 'card', tag: 'a' },
      { text: REPLY.long, figure: 'card', tag: 'target' },
      { text: REPLY.mid, figure: 'card', tag: 'later-1' },
      { text: 'A restored older session: momentum is mass times velocity, a vector.', figure: 'card', tag: 'later-2' },
    ])
    const sel = await selectTargetFigure(page, { replyText: REPLY.long })
    expect(sel).toMatchObject({ index: 1, total: 4 })
    await markFigure(page, sel.index)
    expect((await marked(page)).tag).toBe('target')
    await page.context().close()
  })

  it('text-only messages between figures are ignored', async () => {
    const page = await open([{ text: REPLY.short, figure: 'card', tag: 'a' }, { text: 'Great — keep going, you are doing well on this.' }, { text: REPLY.mid, figure: 'card', tag: 'b' }, { text: 'And one more text-only line after.' }])
    expect((await selectTargetFigure(page, { replyText: REPLY.mid })).index).toBe(1)
    await page.context().close()
  })

  it('the same reply twice is flagged ambiguous and the LAST is taken (the retry)', async () => {
    const page = await open([{ text: REPLY.long, figure: 'card', tag: 'first' }, { text: REPLY.mid, figure: 'card', tag: 'x' }, { text: REPLY.long, figure: 'card', tag: 'retry' }])
    const sel = await selectTargetFigure(page, { replyText: REPLY.long })
    expect(sel).toMatchObject({ index: 2, ambiguous: true })
    await page.context().close()
  })

  it('A WRONG-CARD MEASUREMENT IS DETECTED: a reply that is not on the page (or whose figure cannot be tied to it) THROWS', async () => {
    const page = await open([{ text: REPLY.short, figure: 'card' }, { text: REPLY.mid, figure: 'card' }])
    await expect(selectTargetFigure(page, { replyText: REPLY.long })).rejects.toThrow(/WRONG_FIGURE: NO_FIGURE_TIED_TO_REPLY/)
    await expect(selectTargetFigure(page, {})).rejects.toThrow(/WRONG_FIGURE/)
    await page.context().close()
  })

  it('a reply whose own message has NO figure is not tied to a neighbour\'s figure', async () => {
    const page = await open([{ text: REPLY.long }, { text: REPLY.mid, figure: 'card', tag: 'neighbour' }])
    await expect(selectTargetFigure(page, { replyText: REPLY.long })).rejects.toThrow(/NO_FIGURE_TIED_TO_REPLY/)
    await page.context().close()
  })

  it('the matched message id is reported (evidence to keep with the screenshot)', async () => {
    const page = await open([{ text: REPLY.short, figure: 'card' }, { text: REPLY.long, figure: 'card' }])
    expect((await selectTargetFigure(page, { replyText: REPLY.long })).messageId).toBe('m1')
    await page.context().close()
  })

  it('a page that carries no message markers (a deployment that predates them) is refused, not guessed at', async () => {
    const page = await (await browser.newContext()).newPage()
    await page.setContent(lessonPage([{ text: REPLY.long, figure: 'card' }]).replace(/ data-message-id="m\d+"/g, ''))
    await expect(selectTargetFigure(page, { replyText: REPLY.long })).rejects.toThrow(/NO_MESSAGE_MARKERS/)
    await page.context().close()
  })

  it('an explicit index is honoured, recorded as explicit, and range-checked', async () => {
    const page = await open([{ text: REPLY.short, figure: 'card', tag: 'a' }, { text: REPLY.long, figure: 'card', tag: 'b' }, { text: REPLY.mid, figure: 'card', tag: 'c' }])
    expect(await selectTargetFigure(page, { index: 0 })).toMatchObject({ index: 0, selection: 'explicit' })
    await expect(selectTargetFigure(page, { index: 9 })).rejects.toThrow(/INDEX_OUT_OF_RANGE/)
    await page.context().close()
  })

  it('markdown in the reply does not break the tie (bold, italics, parentheses)', async () => {
    const page = await open([{ text: REPLY.short, figure: 'card', tag: 'a' }, { text: REPLY.markdown, figure: 'card', tag: 'md' }])
    const sel = await selectTargetFigure(page, { replyText: REPLY.markdown })
    expect(sel.index).toBe(1)
    await page.context().close()
  })

  it('the canvas layout (text in one column, figure in the other) still ties each figure to its own message', async () => {
    const page = await open([{ text: REPLY.short, figure: 'card', tag: 'a' }, { text: REPLY.long, figure: 'card', tag: 'b' }], 'canvas')
    expect((await selectTargetFigure(page, { replyText: REPLY.short })).index).toBe(0)
    expect((await selectTargetFigure(page, { replyText: REPLY.long })).index).toBe(1)
    await page.context().close()
  })

  it('scenes are figures too, and a 3D card\'s inner scene box is not counted as a second figure', async () => {
    const page = await open([{ text: REPLY.short, figure: '3d-card', tag: 'orbit' }, { text: REPLY.long, figure: 'scene', tag: 'scene' }, { text: REPLY.mid, figure: 'card', tag: 'card' }])
    const sel = await selectTargetFigure(page, { replyText: REPLY.long })
    expect(sel).toMatchObject({ total: 3, index: 1, kind: 'scene' })
    await markFigure(page, sel.index)
    expect((await marked(page)).count).toBe(1)
    await page.context().close()
  })

  it('marking moves the frame: exactly one frame is ever marked', async () => {
    const page = await open([{ text: REPLY.short, figure: 'card', tag: 'a' }, { text: REPLY.long, figure: 'card', tag: 'b' }])
    await markFigure(page, 0); await markFigure(page, 1)
    expect(await marked(page)).toMatchObject({ count: 1, tag: 'b' })
    await page.context().close()
  })
})
