import { describe, it, expect } from 'vitest'
import { stripScaffoldHeadings, externallyNumberedHeadings } from '@/lib/teaching/scaffoldHeadings'

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
    // The label was standing in as the sentence's subject; what survives is
    // capitalized into a real sentence start rather than left as a fragment
    // — see the dedicated capitalization tests below for the production case
    // this generalizes from.
    expect(r.text).toBe('A coin.\nYou flip a coin and it lands heads or tails.')
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

  it('phys.rel.postulates opening: colon-inside-bold left a lowercase sentence fragment', () => {
    // Reproduced verbatim from production, 2026-08-27 — the label was
    // stripped correctly, but "a car moving..." is not a sentence.
    const r = stripScaffoldHeadings(
      '**Real-life situation:** a car moving at a steady speed on a straight road.',
    )
    expect(r.removed).toEqual(['Real-life situation:'])
    expect(r.text).toBe('A car moving at a steady speed on a straight road.')
  })

  it('capitalizes across a whole bulleted list, one label per line', () => {
    const r = stripScaffoldHeadings(
      '- **Concrete object:** a sealed box nobody can see inside.\n'
      + '- **Mental picture:** photons bouncing between two mirrors.',
    )
    expect(r.text).toBe(
      '- A sealed box nobody can see inside.\n'
      + '- Photons bouncing between two mirrors.',
    )
  })

  it('leaves an already-capitalized continuation untouched, byte for byte', () => {
    const r = stripScaffoldHeadings('**Concept name:** Kinetic theory of gases.')
    expect(r.text).toBe('Kinetic theory of gases.')
  })

  it('never invents a capital where there is no letter to capitalize', () => {
    // A number, a symbol or a formula opening the line has no uppercase form
    // — the comparison is a no-op, which is also what keeps a variable name
    // or unit from being mis-capitalized.
    expect(stripScaffoldHeadings('**Formula:** 5 m/s is the car\'s speed.').text)
      .toBe("5 m/s is the car's speed.")
    expect(stripScaffoldHeadings('**Concept name:** "momentum" is the term for this.').text)
      .toBe('"momentum" is the term for this.')
  })

  it('does not capitalize a shape-1/1b removal — there is no joined continuation to fix', () => {
    // Only Shape 2 (label + continuation on the SAME line) can leave a
    // fragment; a heading-only removal leaves the next line exactly as the
    // model wrote it, which is a separate sentence already.
    const r = stripScaffoldHeadings('### Real-life situation\na car moving at a steady speed.')
    expect(r.text).toBe('a car moving at a steady speed.')
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

/**
 * SHAPE 3 — THE NUMBERING GIVES IT AWAY WHEN THE WORDS DO NOT.
 *
 * MEASURED (production, phys.mech.friction, the opening turn from
 * /api/learn/lesson-init, 2026-09-01, real account, studied as a learner) —
 * on a deploy where this stripper was wired and working:
 *
 *   ### 1. A familiar scene
 *   ### 2. Where friction shows up
 *   ### 7. When a formula helps
 *   ### 8. Quick practice
 *
 * Not one of those four is a stage name, so every name-matching shape above
 * returned false and the whole scaffold reached the learner. The model
 * PARAPHRASED the stage list — the same failure mode the MCQ duplication had a
 * day earlier, and the same lesson: a rule keyed on the words is one
 * paraphrase from useless.
 *
 * The numbers are the tell, and they carry no words at all: four headings
 * numbered up to eight. Self-numbered headings run 1..n.
 */
describe('shape 3 — headings numbered out of a list the learner cannot see', () => {
  const LIVE_OPENING = [
    '**Lesson 22: Friction Forces**',
    "Today we'll learn how friction works and what equations predict it.",
    '### 1. A familiar scene',
    'Picture a heavy book lying on a kitchen table. When you try to slide it, it resists.',
    '',
    '### 2. Where friction shows up',
    "Every time you push a box across the floor you're dealing with friction.",
    '',
    '### 7. When a formula helps',
    'If you need to calculate the friction force, use f = μN.',
    '### 8. Quick practice',
    '**Question:** A 3 kg box rests on a flat table, μ_s = 0.6.',
  ].join('\n')

  it('strips all four paraphrased headings', () => {
    const r = stripScaffoldHeadings(LIVE_OPENING)
    expect(r.removed).toEqual([
      'A familiar scene', 'Where friction shows up', 'When a formula helps', 'Quick practice',
    ])
  })

  it('keeps every word of teaching that was under them', () => {
    const { text } = stripScaffoldHeadings(LIVE_OPENING)
    expect(text).toContain('Picture a heavy book lying on a kitchen table')
    expect(text).toContain("you're dealing with friction")
    expect(text).toContain('use f = μN')
    expect(text).toContain('A 3 kg box rests on a flat table')
    expect(text).toContain('**Lesson 22: Friction Forces**')
  })

  it('is blind to what the headings SAY — that is the point', () => {
    // The half of the problem the name list can never cover.
    const nonsense = '### 1. Aaa\nAlpha teaching.\n### 6. Bbb\nBeta teaching.'
    expect(stripScaffoldHeadings(nonsense).removed).toEqual(['Aaa', 'Bbb'])
    expect(stripScaffoldHeadings(nonsense).text).toContain('Alpha teaching.')
  })
})

describe('shape 3 leaves headings a tutor numbered themselves', () => {
  it('1, 2, 3 across three headings is untouched', () => {
    const t = '### 1. Setup\nA block on a table.\n### 2. Method\nPush it slowly.\n### 3. Result\nIt slips.'
    expect(stripScaffoldHeadings(t).removed).toEqual([])
    expect(stripScaffoldHeadings(t).text).toBe(t)
  })

  it('a long contiguous run from 1 is untouched, however long', () => {
    const t = Array.from({ length: 8 }, (_, i) => `### ${i + 1}. Section ${i + 1}\nTeaching ${i + 1}.`).join('\n')
    expect(stripScaffoldHeadings(t).removed).toEqual([])
  })

  it('a single stray numbered heading cannot trip it', () => {
    // Two are required, so one odd heading is never enough.
    const t = '### 2. Something\nTeaching under it.'
    expect(stripScaffoldHeadings(t).removed).toEqual([])
  })

  it('a repeated number cannot inflate the count into a false negative', () => {
    // Counting rows rather than DISTINCT numbers would make 1,1,2 look like
    // "three headings, max 2" and wave it through.
    const t = '### 1. A\nx.\n### 1. B\ny.\n### 2. C\nz.'
    expect(stripScaffoldHeadings(t).removed).toEqual([])
  })

  it('unnumbered headings are untouched', () => {
    const t = '### Friction\nFriction opposes motion.\n### Normal force\nThe surface pushes back.'
    expect(stripScaffoldHeadings(t).text).toBe(t)
  })
})

describe('shape 3 — the offset case is a deliberate positive', () => {
  it('headings starting at 2 are stripped, and that is intended', () => {
    // No hole, but no 1 either: a turn whose headings begin at 2 is continuing
    // a sequence the learner was never shown. Same defect, different clothes.
    // Recorded here as a decision rather than discovered later as a surprise.
    const t = '### 2. Alpha\nA.\n### 3. Beta\nB.\n### 4. Gamma\nC.'
    expect(stripScaffoldHeadings(t).removed).toEqual(['Alpha', 'Beta', 'Gamma'])
    expect(stripScaffoldHeadings(t).text).toContain('A.')
  })
})

describe('externallyNumberedHeadings — the arithmetic, pinned directly', () => {
  const idx = (lines: string[]) => [...externallyNumberedHeadings(lines)].sort((a, b) => a - b)

  it('1,2,7,8 over four headings fires', () => {
    expect(idx(['### 1. a', '### 2. b', '### 7. c', '### 8. d'])).toEqual([0, 1, 2, 3])
  })
  it('1,2,3 does not', () => {
    expect(idx(['### 1. a', '### 2. b', '### 3. c'])).toEqual([])
  })
  it('fewer than two headings never fires', () => {
    expect(idx(['### 9. a'])).toEqual([])
    expect(idx([])).toEqual([])
  })
})
