/**
 * Progressive response reveal — the client-side fallback for the
 * complete-response delivery path (no provider/server streaming exists;
 * see progressiveReveal.ts's own header for the investigation that
 * established this). These tests use a fake clock and a manual frame
 * queue instead of real timers/rAF, so they run instantly and
 * deterministically while exercising the exact same code path production
 * uses.
 */
import { describe, expect, it } from 'vitest'
import {
  computeRevealDurationMs,
  computeSafeBoundaries,
  createRevealController,
  firstRevealChunkLength,
  snapToSafeLength,
  type RevealControllerDeps,
} from '../lib/teaching/progressiveReveal'

// ─── A fake scheduler so the controller's rAF loop is fully deterministic ──
function makeFakeScheduler() {
  let now = 0
  let nextHandle = 1
  const pending = new Map<number, () => void>()
  return {
    now: () => now,
    requestFrame: (cb: () => void) => { const h = nextHandle++; pending.set(h, cb); return h },
    cancelFrame: (h: number) => { pending.delete(h) },
    /** Advance the clock and run whatever frame(s) were pending, as real rAF would. */
    advance(ms: number) {
      now += ms
      const due = [...pending.entries()]
      pending.clear()
      for (const [, cb] of due) cb()
    },
    pendingCount: () => pending.size,
  }
}

function driveToCompletion(text: string, frameStepMs = 16): {
  updates: number[]
  doneCount: number
  finalText: string | null
} {
  const scheduler = makeFakeScheduler()
  const updates: number[] = []
  let doneCount = 0
  let finalText: string | null = null
  const deps: RevealControllerDeps = {
    now: scheduler.now,
    requestFrame: scheduler.requestFrame,
    cancelFrame: scheduler.cancelFrame,
    onUpdate: (len) => updates.push(len),
    onDone: (t) => { doneCount++; finalText = t },
  }
  const controller = createRevealController(deps)
  controller.start(text)
  let guard = 0
  while (doneCount === 0 && guard++ < 10000) scheduler.advance(frameStepMs)
  return { updates, doneCount, finalText }
}

describe('computeSafeBoundaries — never splits a protected span', () => {
  it('always starts at 0 and ends at text.length', () => {
    for (const text of ['', 'a', 'hello world', 'one\ntwo\nthree']) {
      const b = computeSafeBoundaries(text)
      expect(b[0]).toBe(0)
      expect(b[b.length - 1]).toBe(text.length)
    }
  })

  it('is ascending and has no duplicates', () => {
    const b = computeSafeBoundaries('The kinetic energy formula is KE = 1/2 m v^2, applied here.')
    for (let i = 1; i < b.length; i++) expect(b[i]).toBeGreaterThan(b[i - 1])
  })

  it('never lands inside a $$...$$ display-math block', () => {
    const text = 'Here is the formula: $$E = mc^2$$ and that is the result.'
    const start = text.indexOf('$$')
    const end = text.indexOf('$$', start + 2) + 2
    const boundaries = computeSafeBoundaries(text)
    for (const p of boundaries) expect(p > start && p < end).toBe(false)
  })

  it('never lands inside a \\[...\\] display-math block', () => {
    const text = 'Newton\'s law: \\[F = ma\\] describes this relationship precisely.'
    const start = text.indexOf('\\[')
    const end = text.indexOf('\\]') + 2
    const boundaries = computeSafeBoundaries(text)
    for (const p of boundaries) expect(p > start && p < end).toBe(false)
  })

  it('never lands inside a \\(...\\) inline-math span', () => {
    const text = 'The variable \\(x^2 + y^2\\) represents a circle equation here.'
    const start = text.indexOf('\\(')
    const end = text.indexOf('\\)') + 2
    const boundaries = computeSafeBoundaries(text)
    for (const p of boundaries) expect(p > start && p < end).toBe(false)
  })

  it('never lands inside a fenced code block', () => {
    const text = 'Try this:\n```\nconst x = 1\nconsole.log(x)\n```\nDoes that make sense?'
    const start = text.indexOf('```')
    const end = text.indexOf('```', start + 3) + 3
    const boundaries = computeSafeBoundaries(text)
    for (const p of boundaries) expect(p > start && p < end).toBe(false)
  })

  it('never lands inside inline code, bold, or italic spans', () => {
    const text = 'Call `resolveAnswer()` on the **correct option** and check *carefully* please.'
    const spans = [
      [text.indexOf('`resolveAnswer()`'), text.indexOf('`resolveAnswer()`') + '`resolveAnswer()`'.length],
      [text.indexOf('**correct option**'), text.indexOf('**correct option**') + '**correct option**'.length],
      [text.indexOf('*carefully*'), text.indexOf('*carefully*') + '*carefully*'.length],
    ]
    const boundaries = computeSafeBoundaries(text)
    for (const [s, e] of spans) {
      for (const p of boundaries) expect(p > s && p < e).toBe(false)
    }
  })

  it('a mixed real-world tutor reply with multiple constructs stays fully safe', () => {
    const text = [
      'Great question! The **kinetic energy** of an object is given by',
      '$$KE = \\frac{1}{2}mv^2$$',
      'where \\(m\\) is mass and \\(v\\) is velocity. In code that looks like `ke = 0.5 * m * v**2`.',
      'Notice that *doubling* the speed quadruples the energy — try it yourself!',
    ].join('\n\n')
    const boundaries = computeSafeBoundaries(text)
    const ranges = [
      [text.indexOf('**kinetic energy**'), text.indexOf('**kinetic energy**') + '**kinetic energy**'.length],
      [text.indexOf('$$'), text.indexOf('$$', text.indexOf('$$') + 2) + 2],
      [text.indexOf('\\(m\\)'), text.indexOf('\\(m\\)') + '\\(m\\)'.length],
      [text.indexOf('\\(v\\)'), text.indexOf('\\(v\\)') + '\\(v\\)'.length],
      [text.indexOf('`ke = 0.5 * m * v**2`'), text.indexOf('`ke = 0.5 * m * v**2`') + '`ke = 0.5 * m * v**2`'.length],
      [text.indexOf('*doubling*'), text.indexOf('*doubling*') + '*doubling*'.length],
    ]
    for (const [s, e] of ranges) {
      for (const p of boundaries) expect(p > s && p < e).toBe(false)
    }
  })
})

describe('snapToSafeLength', () => {
  it('returns the largest boundary <= idealLen', () => {
    expect(snapToSafeLength([0, 5, 11, 17], 12)).toBe(11)
    expect(snapToSafeLength([0, 5, 11, 17], 17)).toBe(17)
    expect(snapToSafeLength([0, 5, 11, 17], 100)).toBe(17)
    expect(snapToSafeLength([0, 5, 11, 17], 0)).toBe(0)
  })
  it('never overshoots the requested length', () => {
    const boundaries = computeSafeBoundaries('one two three four five six seven')
    for (let target = 0; target <= 34; target++) {
      expect(snapToSafeLength(boundaries, target)).toBeLessThanOrEqual(target)
    }
  })
})

describe('computeRevealDurationMs — bounded, so long responses stay fast', () => {
  it('is 0 for empty text', () => { expect(computeRevealDurationMs(0)).toBe(0) })
  it('has a floor for very short text', () => {
    expect(computeRevealDurationMs(1)).toBeGreaterThanOrEqual(50)
  })
  it('is capped regardless of how long the response is', () => {
    expect(computeRevealDurationMs(5000)).toBeLessThanOrEqual(900)
    expect(computeRevealDurationMs(50000)).toBeLessThanOrEqual(900)
  })
  it('scales up for a realistic mid-length reply before the cap', () => {
    const short = computeRevealDurationMs(40)
    const long = computeRevealDurationMs(400)
    expect(long).toBeGreaterThan(short)
  })
})

describe('firstRevealChunkLength — the bubble is never blank', () => {
  it('is less than the full length for a multi-word text', () => {
    const b = computeSafeBoundaries('This is a reasonably long tutor explanation with several words in it.')
    expect(firstRevealChunkLength(b)).toBeGreaterThan(0)
    expect(firstRevealChunkLength(b)).toBeLessThan(b[b.length - 1])
  })
  it('equals the full length for a single unsplittable token', () => {
    const b = computeSafeBoundaries('Yes')
    expect(firstRevealChunkLength(b)).toBe(b[b.length - 1])
  })
})

describe('createRevealController — end-to-end reveal behaviour', () => {
  it('req 1: eventually reveals exactly the original text, byte for byte', () => {
    const text = 'The **kinetic energy** is $$KE = \\frac{1}{2}mv^2$$ — a classic result.'
    const { finalText, doneCount } = driveToCompletion(text)
    expect(doneCount).toBe(1)
    expect(finalText).toBe(text)
  })

  it('req 1 (cont.): the last onUpdate before onDone always equals the full length', () => {
    const text = 'A moderately long explanation of Newton\'s first law, spanning several sentences and words.'
    const { updates } = driveToCompletion(text)
    expect(updates[updates.length - 1]).toBe(text.length)
  })

  it('req 2: first content appears before the response is fully rendered (long text)', () => {
    const text = 'This response is long enough that it should not reveal all at once on the very first frame of the animation.'
    const scheduler = makeFakeScheduler()
    const updates: number[] = []
    const controller = createRevealController({
      now: scheduler.now, requestFrame: scheduler.requestFrame, cancelFrame: scheduler.cancelFrame,
      onUpdate: (len) => updates.push(len), onDone: () => {},
    })
    controller.start(text)
    // Exactly one synchronous update (the seeded first chunk) has fired by
    // the time start() returns — before any frame has run.
    expect(updates.length).toBe(1)
    expect(updates[0]).toBeGreaterThan(0)
    expect(updates[0]).toBeLessThan(text.length)
  })

  it('req 3: a very short response completes synchronously, no frame scheduled', () => {
    const scheduler = makeFakeScheduler()
    let done = false
    const controller = createRevealController({
      now: scheduler.now, requestFrame: scheduler.requestFrame, cancelFrame: scheduler.cancelFrame,
      onUpdate: () => {}, onDone: () => { done = true },
    })
    controller.start('OK')
    expect(done).toBe(true)
    expect(scheduler.pendingCount()).toBe(0)
  })

  it('req 3 (cont.): empty text completes synchronously', () => {
    const scheduler = makeFakeScheduler()
    let done = false; let finalText: string | null = null
    const controller = createRevealController({
      now: scheduler.now, requestFrame: scheduler.requestFrame, cancelFrame: scheduler.cancelFrame,
      onUpdate: () => {}, onDone: (t) => { done = true; finalText = t },
    })
    controller.start('')
    expect(done).toBe(true)
    expect(finalText).toBe('')
  })

  it('req 4: a very long response still finishes within the capped duration budget', () => {
    const text = 'word '.repeat(2000).trim() // 9999 chars
    const scheduler = makeFakeScheduler()
    let done = false
    const controller = createRevealController({
      now: scheduler.now, requestFrame: scheduler.requestFrame, cancelFrame: scheduler.cancelFrame,
      onUpdate: () => {}, onDone: () => { done = true },
    })
    controller.start(text)
    scheduler.advance(1000) // past the 900ms cap
    expect(done).toBe(true)
  })

  it('req 9/12: cancel() stops all future updates and does not call onDone', () => {
    const scheduler = makeFakeScheduler()
    const updates: number[] = []
    let doneCount = 0
    const controller = createRevealController({
      now: scheduler.now, requestFrame: scheduler.requestFrame, cancelFrame: scheduler.cancelFrame,
      onUpdate: (len) => updates.push(len), onDone: () => { doneCount++ },
    })
    controller.start('This is a long enough response that it will not finish on the very first frame.')
    const updatesAtCancel = updates.length
    controller.cancel()
    scheduler.advance(2000) // would have finished long ago if not cancelled
    expect(updates.length).toBe(updatesAtCancel) // no further updates
    expect(doneCount).toBe(0)
  })

  it('req 9/10: starting a new reveal supersedes the old one — no orphaned callbacks fire for it', () => {
    const scheduler = makeFakeScheduler()
    const doneTexts: string[] = []
    const controller = createRevealController({
      now: scheduler.now, requestFrame: scheduler.requestFrame, cancelFrame: scheduler.cancelFrame,
      onUpdate: () => {}, onDone: (t) => doneTexts.push(t),
    })
    controller.start('First response, long enough to still be animating when interrupted by the next one.')
    scheduler.advance(10) // a little progress, not yet done
    controller.start('Second response — a new user message landed before the first one finished revealing.')
    scheduler.advance(2000)
    expect(doneTexts).toEqual(['Second response — a new user message landed before the first one finished revealing.'])
  })

  it('req 12: no duplicate and no lost chunks — revealed length is strictly increasing until done', () => {
    const text = 'One. Two. Three. Four. Five. Six. Seven. Eight. Nine. Ten sentences in this reply.'
    const { updates } = driveToCompletion(text)
    for (let i = 1; i < updates.length; i++) expect(updates[i]).toBeGreaterThan(updates[i - 1])
    expect(new Set(updates).size).toBe(updates.length) // no duplicate emissions
  })

  it('markdown/equation fixtures always end revealed exactly as authored (req 5/6)', () => {
    const fixtures = [
      '# Heading\n- one\n- two\n1. first\n2. second',
      'Inline math \\(a^2+b^2=c^2\\) and display $$\\int_0^1 x\\,dx$$ together.',
      '```js\nfunction f(x) { return x * 2 }\n```\nDone.',
    ]
    for (const text of fixtures) {
      const { finalText } = driveToCompletion(text)
      expect(finalText).toBe(text)
    }
  })
})
