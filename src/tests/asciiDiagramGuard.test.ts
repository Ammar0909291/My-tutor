import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { stripUnbackedAsciiDiagram } from '@/lib/teaching/asciiDiagramGuard'

// Byte-for-byte the two real replies captured on a live account, 2026-09-14,
// asking "can you show me a diagram or picture for this?" with no figure
// attached — see the module's own header for the full reproduction.
const CHEM_FOUND_MATTER = 'Below is a simple text diagram that shows the decision tree you can use to classify any piece of matter:\n\n```\n ┌─────────────────────────────────────┐\n │ 1. Is the sample made of only one │\n │ kind of substance everywhere? │\n │ (pure) → ┌─────────────────────┐│\n │ (mixed) → │ 2. Can it be broken down││\n │ │ chemically into simpler││\n │ │ substances? (compound?)││\n │ └────────────┬──────────┘│\n │ │ │\n │ Yes (pure) │ │\n │ ┌───────────────┐ │ │\n │ │ Element │ │ │\n │ └───────────────┘ │ │\n │ │ │ │\n │ No (pure) │ │ │\n │ ┌───────────────┐ │ │\n │ │ Compound │ │ │\n │ └───────────────┘ │ │\n │ │ │\n │ No (mixed) ┌───────────────────┴──────┐\n │ │ Homogeneous or Heterogeneous│\n │ └─────────────────────────────┘\n```\n\n**Guidance:** Use the first yes/no question to decide if the sample is a pure substance or a mixture; if pure, the second question tells you whether it is an element or a compound.'

const CHEM_EQUIL_WEAK_ACID = 'I can describe a simple diagram in text for you:\n\n```\n HA(aq) ⇌ H⁺(aq) + A⁻(aq)\n ^ ^\n | |\n reactants products\n```\n\n* On the left is the weak acid (HA) that hasn’t fully split. \n* On the right are the hydrogen ions (H⁺) and the conjugate base (A⁻) that result from some of the acid molecules breaking apart. \n* The double arrow indicates that the reaction can go forward (dissociation) and backward (recombination) at the same time, reaching a balance called an equilibrium.'

// Byte-for-byte the THIRD real reply captured live re-verifying the fix for
// the two above (chem.found.matter, second question in the same session,
// deployed app, real account) — no code fence at all, plain ASCII.
const CHEM_GLASS_OF_WATER = 'Below is a simple, text‑based “diagram” of a glass of water and its key features. \n\n+-------------------+ ← Glass\n\n- The dots represent water molecules moving around.\n- The space inside the glass is the *volume* the water occupies.\n- The glass holds the water in a liquid state; if you heat it, the dots would spread out and turn into steam.'

describe('the two real reproduced cases', () => {
  it('chem.found.matter: box-drawing decision tree is removed whole, the lead-in dropped, the Guidance paragraph survives', () => {
    const result = stripUnbackedAsciiDiagram(CHEM_FOUND_MATTER, false)
    expect(result.stripped).toBe(true)
    expect(result.removedBlocks).toBe(1)
    expect(result.text).not.toMatch(/[─-╿]/)
    expect(result.text).not.toContain('```')
    expect(result.text).not.toMatch(/below is a simple text diagram/i)
    expect(result.text).toContain('Use the first yes/no question')
  })

  it('chem.equil.weak-acid: the equation survives, the pointer lines and floating labels are dropped, the bullets are untouched', () => {
    const result = stripUnbackedAsciiDiagram(CHEM_EQUIL_WEAK_ACID, false)
    expect(result.stripped).toBe(true)
    expect(result.removedBlocks).toBe(1)
    expect(result.text).not.toContain('```')
    // The real notation is kept — this is the case that shows a whole-block
    // strip would have been wrong.
    expect(result.text).toContain('HA(aq)')
    expect(result.text).toContain('H⁺(aq)')
    // The pointer symbols and the now-meaningless floating labels are gone.
    expect(result.text).not.toMatch(/\^\s*\^/)
    expect(result.text).not.toMatch(/reactants\s+products/)
    // The lead-in claimed "a diagram" — no longer true once the art is gone.
    expect(result.text).not.toMatch(/describe a simple diagram/i)
    // The prose explanation that actually teaches the concept survives whole.
    expect(result.text).toContain('On the left is the weak acid')
    expect(result.text).toContain('On the right are the hydrogen ions')
    expect(result.text).toContain('reaching a balance called an equilibrium')
  })

  it('chem.found.matter (glass of water): the unfenced "text diagram" is removed, the prose survives', () => {
    const result = stripUnbackedAsciiDiagram(CHEM_GLASS_OF_WATER, false)
    expect(result.stripped).toBe(true)
    expect(result.removedBlocks).toBe(1)
    expect(result.text).not.toMatch(/text[‑-]?based/i)
    expect(result.text).not.toContain('diagram')
    expect(result.text).not.toMatch(/\+-+\+/)
    expect(result.text).toContain('The dots represent water molecules moving around.')
    expect(result.text).toContain('volume')
    expect(result.text).toContain('turn into steam.')
  })
})

describe('pointer-line and Pass-3 removal still stay quiet while a real figure is on screen', () => {
  it('the weak-acid pointer-line/label case is left byte-identical when figureOnScreen is true', () => {
    expect(stripUnbackedAsciiDiagram(CHEM_EQUIL_WEAK_ACID, true)).toEqual({
      text: CHEM_EQUIL_WEAK_ACID, stripped: false, removedBlocks: 0,
    })
  })

  it('the unfenced "text diagram" (Pass 3) case is left byte-identical when figureOnScreen is true', () => {
    expect(stripUnbackedAsciiDiagram(CHEM_GLASS_OF_WATER, true)).toEqual({
      text: CHEM_GLASS_OF_WATER, stripped: false, removedBlocks: 0,
    })
  })
})

describe('box-drawing removal is UNCONDITIONAL (2026-09-19 widening — live reproduction)', () => {
  // ORIGINAL assertion here (superseded, not deleted): this same
  // CHEM_FOUND_MATTER fixture was expected byte-identical when
  // figureOnScreen=true, alongside the other two cases above. Re-driven live
  // on a disposable QA account (chem.found.matter, a real figure genuinely
  // rendered) the model produced this EXACT shape of box-drawing tree
  // DUPLICATING the figure already on screen, and the old blanket
  // `figureOnScreen` early-exit let it straight through — contradicting this
  // module's own absolute claim that box-drawing is never legitimate content
  // in any subject, regardless of whether a visual also exists. Box-drawing
  // removal is unconditional now; only pointer-line removal and Pass 3 (the
  // two cases above) stay figure-gated.
  it('the box-drawing decision tree is removed WHOLE even though a real figure is already on screen', () => {
    const result = stripUnbackedAsciiDiagram(CHEM_FOUND_MATTER, true)
    expect(result.stripped).toBe(true)
    expect(result.removedBlocks).toBe(1)
    expect(result.text).not.toMatch(/[─-╿]/)
    expect(result.text).not.toContain('```')
    expect(result.text).toContain('Use the first yes/no question')
  })

  it('is identical to the figureOnScreen=false result for pure box-drawing content — the flag no longer changes this outcome', () => {
    const withFigure = stripUnbackedAsciiDiagram(CHEM_FOUND_MATTER, true)
    const withoutFigure = stripUnbackedAsciiDiagram(CHEM_FOUND_MATTER, false)
    expect(withFigure).toEqual(withoutFigure)
  })
})

describe('Pass 3 (unfenced "text diagram") false-positive checks', () => {
  it('a markdown table is never touched', () => {
    const text = 'Here is a table:\n\n| Concept | Definition |\n| --- | --- |\n| Mass | Amount of matter |\n\nMakes sense?'
    expect(stripUnbackedAsciiDiagram(text, false)).toEqual({ text, stripped: false, removedBlocks: 0 })
  })

  it('a short arithmetic line is never touched (no 3-symbol run, no "text diagram" wording)', () => {
    const text = 'Solve this: 3 - 2 = 1. Simple subtraction.'
    expect(stripUnbackedAsciiDiagram(text, false)).toEqual({ text, stripped: false, removedBlocks: 0 })
  })

  it('naming both "text" and "diagram" is not enough on its own — the following paragraph must actually be art-shaped', () => {
    const text = 'This is a text diagram of the water cycle.\n\nEvaporation happens when the sun heats water and it rises as vapor.\n\nThen it condenses into clouds.'
    expect(stripUnbackedAsciiDiagram(text, false)).toEqual({ text, stripped: false, removedBlocks: 0 })
  })

  it('"diagram" alone, with no "text" nearby, is never touched even beside art-shaped text', () => {
    const text = 'Here is a diagram of the setup.\n\n+-------------------+\n\nThat represents the container.'
    // No word "text" anywhere near "diagram" — the co-occurrence requirement
    // is what makes this guard narrow; "diagram" alone is far too common a
    // word to key off by itself.
    expect(stripUnbackedAsciiDiagram(text, false)).toEqual({ text, stripped: false, removedBlocks: 0 })
  })
})

describe('an ordinary fenced block is never touched', () => {
  it('leaves real code alone', () => {
    const text = 'Here is a Python loop:\n\n```python\nfor i in range(5):\n    print(i)\n```\n\nThat prints 0 through 4.'
    expect(stripUnbackedAsciiDiagram(text, false)).toEqual({ text, stripped: false, removedBlocks: 0 })
  })

  it('leaves a genuine multi-line equation with no pointer decoration alone', () => {
    const text = 'Solving step by step:\n\n```\nx + 2 = 5\nx = 5 - 2\nx = 3\n```\n\nSo x equals 3.'
    expect(stripUnbackedAsciiDiagram(text, false)).toEqual({ text, stripped: false, removedBlocks: 0 })
  })

  it('leaves text with no fenced block at all alone', () => {
    const text = 'A → B is a simple reaction, no diagram needed here.'
    expect(stripUnbackedAsciiDiagram(text, false)).toEqual({ text, stripped: false, removedBlocks: 0 })
  })

  it('a lead-in before an untouched fence is left alone too', () => {
    const text = 'Here is the code you asked for:\n\n```js\nconsole.log("hi")\n```\n\nRun it in your console.'
    expect(stripUnbackedAsciiDiagram(text, false)).toEqual({ text, stripped: false, removedBlocks: 0 })
  })
})

describe('edge cases', () => {
  it('a fence that is entirely decoration (no content at all) is removed with the lead-in', () => {
    const text = 'Here is a diagram:\n\n```\n^ ^\n| |\n```\n\nMakes sense now.'
    const result = stripUnbackedAsciiDiagram(text, false)
    expect(result.stripped).toBe(true)
    expect(result.text).not.toContain('```')
    expect(result.text).not.toMatch(/here is a diagram/i)
    expect(result.text).toContain('Makes sense now.')
  })

  it('a lead-in with no diagram word is kept even when the fence is processed', () => {
    const text = 'One example:\n\n```\n┌──┐\n│ x │\n└──┘\n```\n\nDone.'
    const result = stripUnbackedAsciiDiagram(text, false)
    expect(result.stripped).toBe(true)
    expect(result.text).toContain('One example:')
    expect(result.text).not.toContain('```')
    expect(result.text).toContain('Done.')
  })

  it('is a total function — never throws on empty or non-string-shaped input', () => {
    expect(() => stripUnbackedAsciiDiagram('', false)).not.toThrow()
    expect(stripUnbackedAsciiDiagram('', false)).toEqual({ text: '', stripped: false, removedBlocks: 0 })
    // @ts-expect-error — defensive runtime check for a value that should
    // never occur, mirroring the same guard in sibling repair modules.
    expect(() => stripUnbackedAsciiDiagram(null, false)).not.toThrow()
  })

  it('multiple fenced blocks in one reply are each evaluated independently', () => {
    const text =
      'First:\n\n```\n┌──┐\n│ x │\n└──┘\n```\n\n' +
      'Second, real code:\n\n```js\nconsole.log(1)\n```\n\nDone.'
    const result = stripUnbackedAsciiDiagram(text, false)
    expect(result.removedBlocks).toBe(1)
    expect(result.text).not.toMatch(/[─-╿]/)
    expect(result.text).toContain('console.log(1)')
  })
})

describe('route.ts wiring', () => {
  const route = fs.readFileSync(path.join(process.cwd(), 'src/app/api/learn/chat/route.ts'), 'utf8')

  it('is called with the same figureOnScreen the figure-reference guard already computed', () => {
    const at = route.indexOf('stripUnbackedAsciiDiagram(cleanText, figureOnScreen)')
    expect(at).toBeGreaterThan(-1)
    // Must sit AFTER figureOnScreen is derived and after the sibling
    // figure-reference guard, inside the same try block (so one catch
    // covers both, and a failure in either cannot break the turn).
    const figureOnScreenAt = route.indexOf('const figureOnScreen =')
    const siblingAt = route.indexOf('stripUnbackedFigureReferences(cleanText, figureOnScreen)')
    expect(figureOnScreenAt).toBeGreaterThan(-1)
    expect(siblingAt).toBeGreaterThan(-1)
    expect(figureOnScreenAt).toBeLessThan(siblingAt)
    expect(siblingAt).toBeLessThan(at)
  })

  it('writes cleanText from the result — the shipping text path, not merely imported', () => {
    const at = route.indexOf('stripUnbackedAsciiDiagram(cleanText, figureOnScreen)')
    const block = route.slice(at, at + 400)
    expect(block).toMatch(/cleanText = asciiDiagram\.text/)
  })
})
