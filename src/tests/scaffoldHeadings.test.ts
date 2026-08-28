import { describe, it, expect } from 'vitest'
import { stripScaffoldHeadings } from '@/lib/teaching/scaffoldHeadings'

// Every case below is a verbatim excerpt from a live production session on the
// real account, 2026-08-27, or a deliberate negative control.

describe('scaffold headings — the production turns that motivated this', () => {
  it('phys.astro.black-holes: numbered ### stage headings go, teaching stays', () => {
    const r = stripScaffoldHeadings(
      '### 1. Concrete Everyday Anchor\n'
      + 'Picture a small, sealed black box. If you drop a ball inside, it never comes back out.\n\n'
      + '### 2. Real‑Life Situation\n'
      + 'When a massive star runs out of fuel, its core collapses under its own gravity.\n\n'
      + '### 3. One‑Sentence Mental Picture\n'
      + 'A black hole is a region where gravity is so strong that all paths curve back inward.',
    )
    expect(r.removed).toHaveLength(3)
    expect(r.text).not.toMatch(/Concrete Everyday Anchor|Real.Life Situation|Mental Picture/)
    expect(r.text).toContain('Picture a small, sealed black box')
    expect(r.text).toContain('When a massive star runs out of fuel')
    expect(r.text).toContain('all paths curve back inward')
  })

  it('phys.qm.spin: a bold label with teaching on the same line keeps the teaching', () => {
    const r = stripScaffoldHeadings(
      '**Concrete everyday object** – a coin.\n'
      + '**Real‑life situation** – you flip a coin and it lands heads or tails.',
    )
    expect(r.removed).toHaveLength(2)
    expect(r.text).toBe('a coin.\nyou flip a coin and it lands heads or tails.')
  })

  it('phys.opt.refraction opening: "Formula (only if needed)" is the prompt copied out', () => {
    const r = stripScaffoldHeadings(
      '### 7. Formula (only if needed)\n'
      + 'When you are ready to predict angles, you will use Snell’s Law.',
    )
    expect(r.removed).toEqual(['7. Formula (only if needed)'])
    expect(r.text).toContain('predict angles')
  })

  it('phys.therm.kinetic-theory opening: the colon sits INSIDE the bold, not after it', () => {
    // The separator-required regex could never match "**Label:**" — there is
    // nothing but a space between the closing ** and the text. Reproduced on
    // the SAME deploy the first scaffold fix had already shipped to.
    const r = stripScaffoldHeadings(
      '**Real‑life situation:** A balloon in a room, a gas in a sealed bottle, air in a tire.\n'
      + '**Mental picture:** Tiny specks of air darting all over, bumping into each other.\n'
      + '**Plain‑language description:** In a gas, the molecules move freely and randomly.\n'
      + '**Concept name:** Kinetic theory of gases.',
    )
    expect(r.removed).toHaveLength(4)
    expect(r.text).not.toMatch(/\*\*(Real|Mental|Plain|Concept)/)
    expect(r.text).toContain('A balloon in a room')
    expect(r.text).toContain('Tiny specks of air darting')
    expect(r.text).toContain('the molecules move freely')
    expect(r.text).toContain('Kinetic theory of gases')
  })

  it('phys.mod.pn-junction opening: bullet-list labels, five in a row', () => {
    // The colon-inside-bold fix's regex still anchored on whitespace before
    // "**" and could never match a leading "- " bullet marker. Reproduced
    // on the SAME deploy that fix had already shipped to.
    const r = stripScaffoldHeadings(
      '- **Concrete object:** Imagine a door that only lets you pass through in one direction.\n'
      + '- **Real-life situation:** When you walk into a room, the door opens for you.\n'
      + '- **Mental picture:** Picture a gate that swings open toward the room.\n'
      + '- **Plain-language description:** A one-way door allows movement in one direction.\n'
      + '- **Concept name:** In electronics, this one-way behavior is achieved by a p-n junction.',
    )
    expect(r.removed).toHaveLength(5)
    expect(r.text).not.toMatch(/\*\*(Concrete object|Real-life situation|Mental picture|Plain-language description|Concept name)/)
    // Bullets survive — this is a list before and after, not a list turned prose.
    expect(r.text.split('\n').every((l) => l.startsWith('- '))).toBe(true)
    expect(r.text).toContain('Imagine a door')
    expect(r.text).toContain('the door opens for you')
    expect(r.text).toContain('swings open toward the room')
    expect(r.text).toContain('achieved by a p-n junction')
  })

  it('a bulleted stage label alone on its line is removed whole', () => {
    const r = stripScaffoldHeadings('* **Concept name:**\nThe rest of the lesson continues here.')
    expect(r.removed).toEqual(['Concept name:'])
    expect(r.text).toBe('The rest of the lesson continues here.')
  })

  it('drops the horizontal rules that only separated scaffold sections', () => {
    const r = stripScaffoldHeadings(
      '### 5. Concept name\nThis bending is called refraction.\n\n---\n\n### 6. Key vocabulary\nMedium: the material light travels through.',
    )
    expect(r.text).not.toMatch(/---/)
    expect(r.text).toContain('called refraction')
    expect(r.text).toContain('Medium: the material')
  })
})

describe('scaffold headings — what it must never touch', () => {
  it('leaves a turn with no scaffolding byte-for-byte identical', () => {
    const card =
      'A straw in water looks snapped at the waterline. Light leaving the underwater part '
      + 'travels slower in water than in air.\n\nLight passing from air into glass slows down. '
      + 'Does it bend towards the upright line or away from it?'
    const r = stripScaffoldHeadings(card)
    expect(r.text).toBe(card)
    expect(r.removed).toEqual([])
  })

  it('leaves a stage name that appears in ordinary prose', () => {
    const prose = 'Let us look at a real-life situation: a straw standing in a glass of water.'
    expect(stripScaffoldHeadings(prose).text).toBe(prose)
  })

  it('leaves a genuine heading that merely starts with a stage word', () => {
    const t = '### Formula for the critical angle\nThe angle depends on both materials.'
    expect(stripScaffoldHeadings(t).text).toBe(t)
  })

  it('leaves a bold emphasis that is not a stage label', () => {
    const t = '**Refraction** - light changing direction at a boundary.'
    expect(stripScaffoldHeadings(t).text).toBe(t)
  })

  it('leaves an ordinary bulleted term that is not a stage label', () => {
    const t = '- **Refraction:** light bending as it crosses a boundary.\n- **Reflection:** light bouncing back.'
    expect(stripScaffoldHeadings(t).text).toBe(t)
  })

  it('never returns an empty turn, even if the whole thing was scaffolding', () => {
    const only = '### 1. Concrete everyday object\n### 2. Real-life situation'
    expect(stripScaffoldHeadings(only).text).toBe(only)
    expect(stripScaffoldHeadings(only).removed).toEqual([])
  })

  it('is safe on empty and non-string input', () => {
    expect(stripScaffoldHeadings('').text).toBe('')
    expect(stripScaffoldHeadings(undefined as unknown as string).removed).toEqual([])
  })
})
