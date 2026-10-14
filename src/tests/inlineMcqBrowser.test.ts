/**
 * THE QUESTION ABOVE THE ANSWER, IN A REAL BROWSER.
 *
 * Order, layout and legibility are not things a string test can see, so this renders the REAL `InlineMcqCard`
 * (server-rendered markup, the same bytes React produces for the app) with the app's REAL theme tokens
 * (`src/styles/tokens.css`, both themes) in real Chromium, inside a transcript built from the output of the REAL
 * restore rule (`withRestoredMcq`) over rows written by the REAL writer (`appendMcqToHistoryText`). The transcript
 * shell is a stand-in for LessonScreen's message list (the full screen needs a signed-in session and a model).
 *
 * Checks, at phone width (390) and desktop column width (1280), dark and light: the question's card is ABOVE the
 * learner's answer it was asked for, with every option, in order; nothing overflows horizontally even for a very long
 * unbroken option; text meets 4.5:1 on the card; the question appears exactly once per tutor turn; and reloading
 * (re-deriving the transcript from the stored rows) puts every question back in the same place.
 *
 * Chromium is located via PW_CHROMIUM_PATH, /opt/pw-browsers/chromium, or Playwright's own install. Without one the
 * suite is SKIPPED with a warning, unless REQUIRE_BROWSER_TESTS=1 makes a missing browser a failure.
 */
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { chromium, type Browser, type Page } from 'playwright'
import { appendMcqToHistoryText, type TutorMCQ } from '@/lib/teaching/mcq'
import { withRestoredMcq, type TranscriptMcq } from '@/lib/learn/mcqTranscript'
import { InlineMcqCard } from '@/components/learn/InlineMcqCard'
import { contrastRatio } from '@/lib/teaching/visual/figureAudit'
import { findChromium, REQUIRE_BROWSER } from './helpers/chromiumPath'

const CHROMIUM = findChromium()
const REQUIRED = REQUIRE_BROWSER
if (!CHROMIUM) console.warn(`[inlineMcqBrowser] no Chromium found — ${REQUIRED ? 'FAILING' : 'skipping'} the browser suite`)
const suite = CHROMIUM || REQUIRED ? describe : describe.skip

const TOKENS = readFileSync(join(process.cwd(), 'src/styles/tokens.css'), 'utf8')

interface Msg { id: string; role: 'user' | 'assistant'; content: string; mcq?: TranscriptMcq }

const LONG = 'Supercalifragilisticexpialidocious_and_then_some_more_unbroken_characters_to_force_a_wrap_0123456789'
const Q1: TutorMCQ = { question: 'Which of these is a vector quantity?', options: ['Speed', 'Velocity', 'Distance', 'Time'], correctIndex: 1 }
const Q2: TutorMCQ = { question: 'A car travels 100 m in 20 s. What is its average speed?', options: ['2 m/s', '5 m/s', LONG], correctIndex: 1 }

/** The stored rows of a short session, written by the real persistence writer. */
const STORED: Msg[] = [
  { id: 't1', role: 'assistant', content: appendMcqToHistoryText('Velocity has a direction as well as a size. Let us check that idea.', Q1) },
  { id: 'u1', role: 'user', content: 'Velocity' },
  { id: 't2', role: 'assistant', content: appendMcqToHistoryText('Correct. Now a calculation: speed is distance divided by time.', Q2) },
  { id: 'u2', role: 'user', content: '5 m/s' },
  { id: 't3', role: 'assistant', content: 'Yes — 100 / 20 = 5 m/s. That is the average speed.' },
  { id: 'u3', role: 'user', content: 'Can you explain why it is not 20?' },
]

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

/** Stand-in for LessonScreen's message list: prose, then the card, per tutor message; a bubble per learner message. */
function transcriptHtml(msgs: Msg[]): string {
  return msgs.map((m) => {
    if (m.role === 'user') return `<div class="msg user" data-message-id="${m.id}"><div class="bubble">${esc(m.content)}</div></div>`
    const card = m.mcq ? renderToStaticMarkup(createElement(InlineMcqCard, { ...m.mcq, label: 'Quick check' })) : ''
    return `<div class="msg tutor" data-message-id="${m.id}"><div class="prose">${esc(m.content)}</div>${card}</div>`
  }).join('')
}

const PAGE = (theme: 'dark' | 'light', body: string) => `<!doctype html><html data-theme="${theme}"><head>
<meta name="viewport" content="width=device-width, initial-scale=1"><style>${TOKENS}
  body { margin:0; background:var(--bg-void); color:var(--text-primary); font:15px/1.5 system-ui, sans-serif; }
  #log { box-sizing:border-box; width:100%; padding:12px 16px; display:flex; flex-direction:column; gap:12px; }
  .msg { display:flex; flex-direction:column; align-items:flex-start; }
  .msg.user { align-items:flex-end; }
  .bubble { max-width:80%; padding:8px 12px; border-radius:14px; background:var(--coral-muted); border:1px solid var(--coral-border); }
  .prose { max-width:100%; overflow-wrap:anywhere; }
</style></head><body><div id="log">${body}</div></body></html>`

const rgb = (s: string): [number, number, number] => { const m = /rgba?\((\d+), (\d+), (\d+)/.exec(s)!; return [+m[1], +m[2], +m[3]] }

interface Layout {
  order: string[]                       // data-message-id / card markers in document order
  cards: { top: number; bottom: number; left: number; right: number; width: number; borderLeft: number; bg: string; owner: string }[]
  answers: { id: string; top: number }[]
  options: { owner: string; letters: string[]; texts: string[] }[]
  questionCount: Record<string, number>
  scrollWidth: number
  clientWidth: number
  colors: { owner: string; q: string; opt: string; label: string; badge: string; bg: string }[]
}

async function measure(page: Page, questions: string[]): Promise<Layout> {
  return page.evaluate((qs) => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-inline-mcq]'))
    const owner = (el: Element) => el.closest('[data-message-id]')!.getAttribute('data-message-id')!
    return {
      order: Array.from(document.querySelectorAll('[data-message-id], [data-inline-mcq]')).map((e) => e.hasAttribute('data-inline-mcq') ? `card@${owner(e)}` : e.getAttribute('data-message-id')!),
      cards: cards.map((c) => { const r = c.getBoundingClientRect(); const cs = getComputedStyle(c); return { top: r.top + scrollY, bottom: r.bottom + scrollY, left: r.left, right: r.right, width: r.width, borderLeft: parseFloat(cs.borderLeftWidth), bg: cs.backgroundColor, owner: owner(c) } }),
      answers: Array.from(document.querySelectorAll<HTMLElement>('.msg.user')).map((u) => ({ id: u.getAttribute('data-message-id')!, top: u.getBoundingClientRect().top + scrollY })),
      options: cards.map((c) => ({
        owner: owner(c),
        letters: Array.from(c.querySelectorAll('[data-inline-mcq-option]')).map((o) => o.getAttribute('data-inline-mcq-option')!),
        texts: Array.from(c.querySelectorAll('[data-inline-mcq-option] > span:last-child')).map((o) => o.textContent!),
      })),
      questionCount: Object.fromEntries(qs.map((q) => [q, (document.body.innerText.match(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) ?? []).length])),
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      colors: cards.map((c) => ({
        owner: owner(c),
        q: getComputedStyle(c.querySelector('[data-inline-mcq-question]')!).color,
        opt: getComputedStyle(c.querySelector('[data-inline-mcq-option] > span:last-child')!).color,
        label: getComputedStyle(c.firstElementChild!).color,
        badge: getComputedStyle(c.querySelector('[data-inline-mcq-option] > span[aria-hidden]')!).color,
        bg: getComputedStyle(c).backgroundColor,
      })),
    }
  }, questions)
}

suite('Inline MCQ card in the Tutor Max transcript — real Chromium', { timeout: 120_000 }, () => {
  let browser: Browser
  beforeAll(async () => {
    browser = await chromium.launch({ executablePath: CHROMIUM ?? undefined, args: ['--no-sandbox'] })
  }, 120_000)
  afterAll(async () => { await browser?.close() })

  const open = async (width: number, theme: 'dark' | 'light', msgs: Msg[]): Promise<Page> => {
    const page = await (await browser.newContext({ viewport: { width, height: 900 } })).newPage()
    await page.setContent(PAGE(theme, transcriptHtml(msgs)))
    return page
  }
  const QUESTIONS = [Q1.question, Q2.question]

  for (const [label, width] of [['mobile 390', 390], ['desktop 1280', 1280]] as const) {
    for (const theme of ['dark', 'light'] as const) {
      describe(`${label} / ${theme}`, () => {
        it('every question sits ABOVE the learner answer it was asked for, in conversation order', async () => {
          const page = await open(width, theme, withRestoredMcq(STORED))
          const l = await measure(page, QUESTIONS)
          // Document order: tutor turn, its card, the learner's answer, the next tutor turn …
          expect(l.order).toEqual(['t1', 'card@t1', 'u1', 't2', 'card@t2', 'u2', 't3', 'u3'])
          // Geometry agrees with the DOM: the card ends before its answer starts.
          const byId = Object.fromEntries(l.answers.map((a) => [a.id, a.top]))
          const card1 = l.cards.find((c) => c.owner === 't1')!
          const card2 = l.cards.find((c) => c.owner === 't2')!
          expect(card1.bottom).toBeLessThanOrEqual(byId.u1)
          expect(card2.bottom).toBeLessThanOrEqual(byId.u2)
          expect(card1.top).toBeLessThan(card2.top)
          await page.context().close()
        })

        it('shows every option, lettered in order, and the whole question', async () => {
          const page = await open(width, theme, withRestoredMcq(STORED))
          const l = await measure(page, QUESTIONS)
          expect(l.options.find((o) => o.owner === 't1')).toEqual({ owner: 't1', letters: ['A', 'B', 'C', 'D'], texts: Q1.options })
          expect(l.options.find((o) => o.owner === 't2')).toEqual({ owner: 't2', letters: ['A', 'B', 'C'], texts: Q2.options })
          // The question stays visible AFTER it was answered (u1 exists below it) — and appears exactly once.
          expect(l.questionCount[Q1.question]).toBe(1)
          expect(l.questionCount[Q2.question]).toBe(1)
          await page.context().close()
        })

        it('fits the viewport: no horizontal scroll, the card inside the page — even with a very long unbroken option', async () => {
          const page = await open(width, theme, withRestoredMcq(STORED))
          const l = await measure(page, QUESTIONS)
          expect(l.scrollWidth).toBeLessThanOrEqual(l.clientWidth)
          for (const c of l.cards) {
            expect(c.left).toBeGreaterThanOrEqual(0)
            expect(c.right).toBeLessThanOrEqual(l.clientWidth)
          }
          await page.context().close()
        })

        it('is visually distinct from the learner answer: a card on the card surface with a 3px accent rule', async () => {
          const page = await open(width, theme, withRestoredMcq(STORED))
          const l = await measure(page, QUESTIONS)
          for (const c of l.cards) expect(c.borderLeft).toBe(3)
          const bubbleBg = await page.evaluate(() => getComputedStyle(document.querySelector('.bubble')!).backgroundColor)
          for (const c of l.cards) expect(c.bg).not.toBe(bubbleBg)
          await page.context().close()
        })

        it('text meets 4.5:1 on the card (question, options, label) and the letter badge meets 3:1', async () => {
          const page = await open(width, theme, withRestoredMcq(STORED))
          const l = await measure(page, QUESTIONS)
          for (const c of l.colors) {
            const bg = rgb(c.bg)
            expect(contrastRatio(rgb(c.q), bg), `question ${theme}`).toBeGreaterThanOrEqual(4.5)
            expect(contrastRatio(rgb(c.opt), bg), `option ${theme}`).toBeGreaterThanOrEqual(4.5)
            expect(contrastRatio(rgb(c.label), bg), `label ${theme}`).toBeGreaterThanOrEqual(4.5)
            expect(contrastRatio(rgb(c.badge), bg), `badge ${theme}`).toBeGreaterThanOrEqual(3)
          }
          await page.context().close()
        })
      })
    }
  }

  describe('persistence — reload, reopen, older history', () => {
    it('after a reload the transcript re-derived from the stored rows shows the same questions in the same places as the live one', async () => {
      // LIVE: the served question attached to the tutor message (what the response handler does).
      const live: Msg[] = STORED.map((m) => {
        if (m.id === 't1') return { ...m, content: 'Velocity has a direction as well as a size. Let us check that idea.', mcq: { question: Q1.question, options: Q1.options } }
        if (m.id === 't2') return { ...m, content: 'Correct. Now a calculation: speed is distance divided by time.', mcq: { question: Q2.question, options: Q2.options } }
        return m
      })
      const restored = withRestoredMcq(STORED)
      const a = await open(390, 'dark', live)
      const b = await open(390, 'dark', restored)
      const [la, lb] = [await measure(a, QUESTIONS), await measure(b, QUESTIONS)]
      expect(lb.order).toEqual(la.order)
      expect(lb.options).toEqual(la.options)
      expect(lb.questionCount).toEqual({ [Q1.question]: 1, [Q2.question]: 1 })
      // The visible text of the whole transcript is identical live and reloaded.
      const text = (p: Page) => p.evaluate(() => document.body.innerText)
      expect(await text(b)).toBe(await text(a))
      await a.context().close(); await b.context().close()
    })

    it('without the restore rule the same rows would show the question only as trailing prose — the defect this fixes', async () => {
      const page = await open(390, 'dark', STORED)
      const l = await measure(page, QUESTIONS)
      expect(l.cards).toHaveLength(0)
      expect(l.order).not.toContain('card@t1')
      await page.context().close()
    })

    it('loading OLDER history in front keeps every question above its answer and adds no duplicates', async () => {
      const older: Msg[] = [
        { id: 'o1', role: 'assistant', content: appendMcqToHistoryText('Earlier: a quick warm-up.', { question: 'What does SI stand for?', options: ['Système International', 'Standard Index'], correctIndex: 0 }) },
        { id: 'ou1', role: 'user', content: 'Système International' },
      ]
      const page = await open(1280, 'light', withRestoredMcq([...older, ...STORED]))
      const l = await measure(page, [...QUESTIONS, 'What does SI stand for?'])
      expect(l.order).toEqual(['o1', 'card@o1', 'ou1', 't1', 'card@t1', 'u1', 't2', 'card@t2', 'u2', 't3', 'u3'])
      expect(l.questionCount).toEqual({ [Q1.question]: 1, [Q2.question]: 1, 'What does SI stand for?': 1 })
      await page.context().close()
    })

    it('a lesson with no questions shows none, and a second lesson\'s transcript never inherits the first one\'s', async () => {
      const lessonB: Msg[] = [{ id: 'b1', role: 'assistant', content: 'Welcome to a new lesson.' }, { id: 'bu1', role: 'user', content: 'Ready' }]
      const page = await open(390, 'dark', withRestoredMcq(lessonB))
      const l = await measure(page, QUESTIONS)
      expect(l.cards).toHaveLength(0)
      expect(l.questionCount).toEqual({ [Q1.question]: 0, [Q2.question]: 0 })
      await page.context().close()
    })

    it('free-text learner messages and plain tutor feedback render as before, between the question cards', async () => {
      const page = await open(390, 'dark', withRestoredMcq(STORED))
      const text = await page.evaluate(() => Array.from(document.querySelectorAll('.msg')).map((m) => (m as HTMLElement).innerText.split('\n')[0]))
      expect(text).toContain('Can you explain why it is not 20?')
      expect(text.some((t) => t.startsWith('Yes — 100 / 20 = 5 m/s'))).toBe(true)
      await page.context().close()
    })
  })
})
