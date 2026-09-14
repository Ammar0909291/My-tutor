import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { stripUnbackedAsciiDiagram } from '@/lib/teaching/asciiDiagramGuard'

// Byte-for-byte the two real replies captured on a live account, 2026-09-14,
// asking "can you show me a diagram or picture for this?" with no figure
// attached — see the module's own header for the full reproduction.
const CHEM_FOUND_MATTER = 'Below is a simple text diagram that shows the decision tree you can use to classify any piece of matter:\n\n```\n ┌─────────────────────────────────────┐\n │ 1. Is the sample made of only one │\n │ kind of substance everywhere? │\n │ (pure) → ┌─────────────────────┐│\n │ (mixed) → │ 2. Can it be broken down││\n │ │ chemically into simpler││\n │ │ substances? (compound?)││\n │ └────────────┬──────────┘│\n │ │ │\n │ Yes (pure) │ │\n │ ┌───────────────┐ │ │\n │ │ Element │ │ │\n │ └───────────────┘ │ │\n │ │ │ │\n │ No (pure) │ │ │\n │ ┌───────────────┐ │ │\n │ │ Compound │ │ │\n │ └───────────────┘ │ │\n │ │ │\n │ No (mixed) ┌───────────────────┴──────┐\n │ │ Homogeneous or Heterogeneous│\n │ └─────────────────────────────┘\n```\n\n**Guidance:** Use the first yes/no question to decide if the sample is a pure substance or a mixture; if pure, the second question tells you whether it is an element or a compound.'

const CHEM_EQUIL_WEAK_ACID = 'I can describe a simple diagram in text for you:\n\n```\n HA(aq) ⇌ H⁺(aq) + A⁻(aq)\n ^ ^\n | |\n reactants products\n```\n\n* On the left is the weak acid (HA) that hasn’t fully split. \n* On the right are the hydrogen ions (H⁺) and the conjugate base (A⁻) that result from some of the acid molecules breaking apart. \n* The double arrow indicates that the reaction can go forward (dissociation) and backward (recombination) at the same time, reaching a balance called an equilibrium.'

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
})

describe('never fires while a real figure is on screen', () => {
  it('leaves both reproduced cases byte-identical when figureOnScreen is true', () => {
    expect(stripUnbackedAsciiDiagram(CHEM_FOUND_MATTER, true)).toEqual({
      text: CHEM_FOUND_MATTER, stripped: false, removedBlocks: 0,
    })
    expect(stripUnbackedAsciiDiagram(CHEM_EQUIL_WEAK_ACID, true)).toEqual({
      text: CHEM_EQUIL_WEAK_ACID, stripped: false, removedBlocks: 0,
    })
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
