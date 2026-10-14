/**
 * THE "READ MORE" PREVIEW NEVER ENDS INSIDE MARKDOWN OR LATEX.
 *
 * Live defect (2026-10-14, production, Test7 account): the collapsed preview of a long tutor message ended mid-construct
 * and the learner saw raw syntax under the "Read more" link:
 *   Euler's Formula:  `\(e^{z}=1 + z + \frac{z^{2}}{2!`        (the factorial "!" counted as a sentence end)
 *   Carnot Cycle:     `**“η = 1 − Tc/Th = 1 − 300/500 = 0.`     (the decimal point counted as a sentence end)
 * Expanding the message rendered both correctly, so the cut was the defect. These tests use the two real messages.
 */
import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { truncatePreview } from '@/lib/learn/previewTruncate'
import { MessageContent } from '@/components/learn/MessageContent'

/** The ORIGINAL implementation, verbatim — kept only to prove plain prose is unchanged and the defect is real. */
function legacyTruncate(text: string, n: number): { preview: string; hasMore: boolean } {
  const idx: number[] = []
  const re = /[.!?…]+[\s)]?/g; let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) idx.push(m.index + m[0].length)
  if (idx.length <= n) return { preview: text, hasMore: false }
  return { preview: text.slice(0, idx[n - 1]).trim(), hasMore: true }
}

/** Euler's Formula lesson, tutor turn T6 (production 2026-10-14). */
const EULER = 'First, let’s look at the part of the figure that reads **“e^(iθ) = cos θ + i sin θ.”** One might think this is just a convenient shortcut – a definition we choose so the symbols line up nicely. But the equality actually comes from the way the exponential function behaves when we extend it to complex numbers.\n\nThe exponential \\(e^{z}\\) can be written as an infinite sum (its power series):\n\\(e^{z}=1 + z + \\frac{z^{2}}{2!} + \\frac{z^{3}}{3!} + \\dots\\). If we plug in \\(z = i\\theta\\) and use the fact that \\(i^{2} = -1\\), the terms split into two separate series:\nthe even‑powered terms become the series for \\(\\cos\\theta\\) (all real), and the odd‑powered terms become \\(i\\) times the series for \\(\\sin\\theta\\) (all imaginary). That is why the exponential and the trigonometric expressions are *identical*, not merely a chosen notation.\n\nNow, turn the angle all the way to **θ = π** (the part of the figure labeled “θ = π”). The point lands at **e^(iπ) = −1**, and moving the “+ 1” across gives the famous **Euler’s identity** shown at the bottom of the figure: **e^(iπ) + 1 = 0**.'

/** Carnot Cycle lesson, tutor turn T2 (production 2026-10-14). */
const CARNOT = 'The Carnot‑cycle diagram is already displayed right beside this message. It shows a rectangular loop on a pressure–volume (P–V) graph with four distinct segments:\n\n* The bottom side (blue) reads **“T(c) = 300 K: heat out”** – the cold isotherm where the gas is compressed and releases heat \\(Q_c\\).\n* Two curved (grey) lines connect the isotherms; these are the adiabatic expansion and compression, where no heat is exchanged.\n* At the top of the figure you see **“η = 1 − T(c)/Tₕ = 1 − 300/500 = 0.4”**, the Carnot efficiency for these temperatures.'

/** True when every construct MessageContent draws specially is closed inside `s`. */
function isBalanced(s: string): boolean {
  const count = (re: RegExp) => (s.match(re) ?? []).length
  return count(/\\\(/g) === count(/\\\)/g)
    && count(/\\\[/g) === count(/\\\]/g)
    && count(/\$\$/g) % 2 === 0
    && count(/`/g) % 2 === 0
    && count(/\*\*/g) % 2 === 0
}

/** The visible text of server-rendered markup, minus KaTeX's hidden TeX annotation and MathML copy. */
const visibleText = (html: string) => html
  .replace(/<annotation[\s\S]*?<\/annotation>/g, '')
  .replace(/<span class="katex-mathml">[\s\S]*?<\/span><span class="katex-html"/g, '<span class="katex-html"')
  .replace(/<[^>]+>/g, ' ')
const RAW = [/\*\*/, /\\\(/, /\\\)/, /\\\[/, /\\\]/, /\\frac/, /\\forall/]

describe('the two real messages that showed raw syntax', () => {
  it('REPRODUCTION: the original truncation really did cut both of them mid-construct', () => {
    const euler = legacyTruncate(EULER, 4)
    const carnot = legacyTruncate(CARNOT, 4)
    expect(euler.hasMore).toBe(true)
    expect(isBalanced(euler.preview)).toBe(false)
    expect(euler.preview.endsWith('2!')).toBe(true)
    expect(carnot.hasMore).toBe(true)
    expect(isBalanced(carnot.preview)).toBe(false)
    expect(carnot.preview.endsWith('= 0.')).toBe(true)
  })

  it("Euler's Formula: the preview is balanced and renders without a single raw delimiter", () => {
    const { preview, hasMore } = truncatePreview(EULER, 4)
    expect(isBalanced(preview)).toBe(true)
    const html = renderToStaticMarkup(createElement(MessageContent, { text: preview, isUser: false }))
    for (const re of RAW) expect(visibleText(html), `raw ${re}`).not.toMatch(re)
    expect(html).toContain('class="katex"')
    expect(hasMore).toBe(true)
  })

  it('Carnot Cycle: the decimal point in 0.4 is not a sentence end, so the bold span stays whole', () => {
    const { preview } = truncatePreview(CARNOT, 4)
    expect(isBalanced(preview)).toBe(true)
    expect(preview).not.toMatch(/= 0\.$/)
    const html = renderToStaticMarkup(createElement(MessageContent, { text: preview, isUser: false }))
    for (const re of RAW) expect(visibleText(html), `raw ${re}`).not.toMatch(re)
  })

  it('the preview is always a leading part of the message, never rewritten', () => {
    for (const text of [EULER, CARNOT]) {
      const { preview } = truncatePreview(text, 4)
      expect(text.startsWith(preview)).toBe(true)
      expect(preview.length).toBeGreaterThan(40)
    }
  })
})

describe('what counts as a sentence end', () => {
  const cuts = (text: string, n: number) => truncatePreview(text, n).preview

  it('a decimal point, a version number and a unit are not sentence ends', () => {
    expect(cuts('Pi is about 3.14 and g is 9.8 m/s. Second sentence here. Third one. Fourth one. Fifth one.', 1)).toBe('Pi is about 3.14 and g is 9.8 m/s.')
  })

  it('a factorial inside maths is not a sentence end; one outside maths followed by a space is', () => {
    expect(cuts('We use \\(n!\\) here. Next. Third. Fourth. Fifth.', 1)).toBe('We use \\(n!\\) here.')
    expect(cuts('Wow! That is five factorial. Then more. And more. And even more.', 1)).toBe('Wow!')
  })

  it('abbreviations do not end a sentence', () => {
    expect(cuts('Some metals, e.g. iron and zinc, rust. Second. Third. Fourth. Fifth.', 1)).toBe('Some metals, e.g. iron and zinc, rust.')
    expect(cuts('See Fig. 3 for the setup. Second. Third. Fourth. Fifth.', 1)).toBe('See Fig. 3 for the setup.')
  })

  it('a sentence that ends inside or at the close of a bold or italic span cuts after the span, never inside it', () => {
    expect(cuts('This is **the key idea.** Then more text. Third. Fourth. Fifth.', 1)).toBe('This is **the key idea.**')
    expect(cuts('Look at **A. B** carefully. Second. Third. Fourth. Fifth.', 1)).toBe('Look at **A. B** carefully.')
  })

  it('display maths and inline code are never split', () => {
    const t = 'Consider\n\\[x = 1. + 2!\\]\nand `a.b()` too. Second. Third. Fourth. Fifth.'
    expect(isBalanced(cuts(t, 1))).toBe(true)
    expect(cuts(t, 1)).toBe('Consider\n\\[x = 1. + 2!\\]\nand `a.b()` too.')
  })

  it('a closing quote or bracket stays with its sentence', () => {
    expect(cuts('He said “stop.” Then left. Third. Fourth. Fifth.', 1)).toBe('He said “stop.”')
    expect(cuts('This holds (see above.) Then more. Third. Fourth. Fifth.', 1)).toBe('This holds (see above.)')
  })

  it('a message with n or fewer sentences is returned whole with hasMore false', () => {
    expect(truncatePreview('One. Two. Three. Four.', 4)).toEqual({ preview: 'One. Two. Three. Four.', hasMore: false })
    expect(truncatePreview('A single sentence with 3.5 inside', 4).hasMore).toBe(false)
  })
})

describe('plain prose behaves exactly as before', () => {
  const PROSE = [
    'Let us start. Forces change motion. A bigger force gives a bigger change. Mass resists that change. Heavier things accelerate less. Try it with a trolley.',
    'What is velocity? It is speed with a direction! Think of a car heading north… Then it turns. The speed may stay the same. The velocity does not.',
    'Plain text without any punctuation at all but long enough to be considered a message on its own',
  ]
  it.each(PROSE.map((p, i) => [i, p] as const))('prose %i: same preview and hasMore as the original for every n', (_i, p) => {
    for (let n = 1; n <= 6; n++) expect(truncatePreview(p, n)).toEqual(legacyTruncate(p, n))
  })
})

describe('property: no preview ever ends inside a construct, whatever the sentence order', () => {
  // Deterministic PRNG so a failure is reproducible.
  let seed = 20261014
  const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296 }
  const PIECES = [
    'Plain sentence about forces.', 'A value of 0.4 appears here.', 'The ratio is 3.14 or so.', 'Use \\(n!\\) to count.', 'Then \\(e^{z}=1+z+\\frac{z^{2}}{2!}+\\dots\\).',
    'It is **very important.** Remember it.', 'Say **“η = 1 − 300/500 = 0.4”** aloud.', 'This is *really. Honestly* key.', 'Run `a.b()` first.', 'Look at Fig. 2 here.',
    'Why? Because physics!', 'Display:\n\\[\\sum_{k=0}^{n} k! = x.\\]\nends here.', 'Costs about $3.50 each.', 'Some metals, e.g. iron, rust.',
  ]
  it('300 random messages x every n from 1 to 6', () => {
    for (let trial = 0; trial < 300; trial++) {
      const len = 4 + Math.floor(rnd() * 9)
      const text = Array.from({ length: len }, () => PIECES[Math.floor(rnd() * PIECES.length)]).join(rnd() < 0.5 ? ' ' : '\n')
      for (let n = 1; n <= 6; n++) {
        const { preview } = truncatePreview(text, n)
        expect(isBalanced(preview), `trial ${trial} n=${n}: ${JSON.stringify(preview.slice(-70))}`).toBe(true)
        expect(text.startsWith(preview)).toBe(true)
      }
    }
  })
})

describe('LessonScreen uses it', () => {
  const SRC = readFileSync(join(process.cwd(), 'src/components/learn/LessonScreen.tsx'), 'utf8')
  it('the preview cache calls truncatePreview, and the old private truncate() is gone', () => {
    expect(SRC).toContain("import { truncatePreview } from '@/lib/learn/previewTruncate'")
    expect(SRC).toContain('truncatePreview(full, 4)')
    expect(SRC).not.toMatch(/function truncate\(text: string, n: number\)/)
  })
})
