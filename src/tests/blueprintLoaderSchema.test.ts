/**
 * Blueprint Loader — schema-compatibility regression suite.
 *
 * WHY THIS FILE EXISTS
 * The loader used to key sections on their ORDINAL POSITION ("Component 1 is
 * explanations, Component 3 is misconceptions"). Three authoring generations
 * emit `## Component N — Title` headers with mutually incompatible orderings,
 * so two of the three were parsed with the wrong extractors and produced
 * `misconceptions: []` / `explanations: []` while still reporting
 * `found: true`. Measured cost: 958 of 1,333 blueprints (71.9%) parsed to
 * empty content, including 214 of English's 216 — every one of them carrying
 * fully authored, professionally tagged teaching content that never reached
 * a learner.
 *
 * The invariant this suite defends: A SECTION THAT EXISTS IN THE MARKDOWN
 * MUST NEVER PARSE TO NOTHING SILENTLY. When it does, `diagnostics` must be
 * non-empty — the parser fails loudly rather than losing data quietly.
 *
 * Fixtures below are synthetic but grammar-accurate: every heading shape and
 * field spelling is copied from a real file in docs/curriculum/blueprints.
 */

import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { parseBlueprintContent, loadBlueprintContent } from '@/lib/curriculum/blueprintLoader'

// ── Fixtures — one per authoring generation ──────────────────────────────────

/** Generation A — physics Component schema (snake_case fields). */
const PHYSICS_COMPONENT = `# Teaching Blueprint: Capacitance

## Component 0 — Concept Identity

\`\`\`yaml
name: Capacitance
domain: phys.em
\`\`\`

## Component 1 — Concept Explanation Blocks

### Block 1-A — Intuitive
A capacitor stores charge by separating it across a gap.

### Block 1-B — Mathematical
C = Q / V.

## Component 3 — Misconception Engine

### MC-SERIES-CAPACITORS-ADD-DIRECTLY
- **trigger_signal:** Student applies "C_eq = C1 + C2" for series capacitors.
- **bridge_text [P30]:** Series capacitors add like parallel resistors.
- **replacement_text [P31]:** 1/C_eq = 1/C1 + 1/C2.

## Component 9 — Validation Checklist
`

/** Generation B — english Component schema. Same header grammar, DIFFERENT
 *  ordering (misconceptions at 1, anchor at 3) and Title Case field labels. */
const ENGLISH_COMPONENT = `# Teaching Blueprint: Consonant Sounds

## Component 0 — Concept Identity & Routing

\`\`\`yaml
name: Consonant Sounds
domain: english / phonics
\`\`\`

## Component 1 — Misconception Register

### MC-C-AND-G-ARE-SINGLE-SOUND-LETTERS
- **Trigger signal:** Student assumes "c" always represents /k/.
- **Conflict evidence [P28]:** "Say 'cat'. Now say 'city'. Same sound?"
- **Bridge text [P30]:** The letters 'c' and 'g' each represent TWO sounds.
- **Replacement text [P31]:** Check the very next letter first.

## Component 3 — Concrete Anchor [P06]

**Anchor scene — The consonant sound wall**

> Present picture cards, one per consonant sound.

## Component 4 — Conceptual Development Sequence

**TA-1 — Single Consonant Sound Production [C]**

Present each single-letter consonant in isolation.

**TA-2 — Consonants in Word-Initial Position [C]**

Present simple words; student isolates the initial sound.
`

/** Generation C — mathematics Component schema: metadata TABLE, table-driven
 *  misconception registry with a sibling repair list, prose core explanation. */
const MATH_COMPONENT = `# Teaching Blueprint: Addition

## Component 0 — Metadata

| Field | Value |
|---|---|
| concept_id | \`math.arith.addition\` |
| concept_name | Addition |
| domain | arithmetic |

## Component 3 — Core Explanation

**Addition combines two quantities into one total**: counting on from the
larger addend is the efficient strategy.

**Place value forces carrying**: ten ones become one ten.

## Component 6 — Misconception Registry

| ID | Name | Surface Pattern | Root Cause | Priority |
|---|---|---|---|---|
| MC-1 | CARRYING-BREAKDOWN | Writes 47+35 as 712 | Treats each column independently | FOUNDATIONAL |
| MC-2 | COMMUTATIVITY-UNKNOWN | Claims 5+3 differs from 3+5 | Models addition as sequential counting-on | SECONDARY |

### Protocol B — Repair Actions

- **B01 (targets MC-1)**: P27 name it, then re-walk the ten-ones exchange.
`

/** Generation D — Section format. */
const SECTION_FORMAT = `# Teaching Blueprint: Matter

## Section 1 — Concept Spine

**One-sentence definition:**
Matter is classified into elements, compounds and mixtures.

**Why it matters:**
It is the base of every later chemical idea.

## Section 4 — Misconception Library

### MC-1: "Homogeneous = pure substance"
**Probe question:** Is stainless steel a pure substance?
**Characteristic phrase:** "It looks the same throughout."
**Bridge (P30):** Looking uniform only tells you it is homogeneous.
**Replacement concept (P31):** Homogeneity and purity are independent.

## Section 5 — Explanation Library

### Explanation A — Intuitive
Two yes/no questions classify any sample.
`

/** Generation E — abbreviated component headers (## C2 —) plus a table whose
 *  cells contain Dirac notation pipes. */
const ABBREVIATED_WITH_DIRAC = `# Teaching Blueprint — Density Matrix

## C1 — Core Idea (one sentence)
The density matrix describes both pure and mixed states in one object.

## C2 — Misconception Register

| ID | Misconception | Diagnostic phrase | Correct understanding |
|----|--------------|-------------------|-----------------------|
| MC-DM-MIXED-IS-SUPERPOSITION | "A mixed state is like |ψ⟩ = Σcₙ|n⟩." | "Just a complicated wavefunction." | A superposition is a PURE state. |
`

// ── Generation coverage ───────────────────────────────────────────────────────

describe('blueprintLoader — every authoring generation parses', () => {
  it('Generation A (physics Component, snake_case fields)', () => {
    const c = parseBlueprintContent('phys.em.capacitance', PHYSICS_COMPONENT)
    expect(c.misconceptions).toHaveLength(1)
    expect(c.misconceptions[0].probeQuestion).toContain('C_eq = C1 + C2')
    expect(c.misconceptions[0].bridge).toContain('parallel resistors')
    expect(c.misconceptions[0].replacementConcept).toContain('1/C_eq')
    expect(c.explanations.map(e => e.id)).toEqual(['A', 'B'])
    expect(c.conceptSpine?.definition).toContain('Capacitance')
    expect(c.diagnostics).toEqual([])
  })

  it('Generation B (english Component — the regression that started this)', () => {
    const c = parseBlueprintContent('eng.phonics.consonants', ENGLISH_COMPONENT)
    // The exact failure being defended against: misconceptions live in
    // Component 1 here, not Component 3.
    expect(c.misconceptions).toHaveLength(1)
    expect(c.misconceptions[0].title).toMatch(/single sound letters/i)
    expect(c.misconceptions[0].probeQuestion).toContain('always represents /k/')
    expect(c.misconceptions[0].bridge).toContain('TWO sounds')
    expect(c.misconceptions[0].replacementConcept).toContain('next letter')
    // Anchor scene + both TA steps become explanation entries.
    expect(c.explanations.length).toBeGreaterThanOrEqual(3)
    expect(c.explanations.map(e => e.id)).toContain('TA-1')
    expect(c.diagnostics).toEqual([])
  })

  it('Generation C (mathematics — metadata table, table registry, prose)', () => {
    const c = parseBlueprintContent('math.arith.addition', MATH_COMPONENT)
    expect(c.conceptSpine?.definition).toBe('Addition is a concept in arithmetic.')
    expect(c.misconceptions).toHaveLength(2)
    expect(c.misconceptions[0].id).toBe('MC-1')
    expect(c.misconceptions[0].title).toBe('Carrying Breakdown')
    expect(c.misconceptions[0].probeQuestion).toContain('47+35')
    // Repair actions from the sibling Protocol B list are matched back on.
    expect(c.misconceptions[0].bridge).toContain('ten-ones exchange')
    expect(c.explanations).toHaveLength(2)
    expect(c.diagnostics).toEqual([])
  })

  it('Generation D (Section format)', () => {
    const c = parseBlueprintContent('chem.found.matter', SECTION_FORMAT)
    expect(c.conceptSpine?.definition).toContain('elements, compounds and mixtures')
    expect(c.conceptSpine?.whyItMatters).toContain('base of every later chemical idea')
    expect(c.misconceptions).toHaveLength(1)
    expect(c.misconceptions[0].id).toBe('MC-1')
    expect(c.misconceptions[0].characteristicPhrase).toContain('looks the same throughout')
    expect(c.explanations).toHaveLength(1)
    expect(c.diagnostics).toEqual([])
  })

  it('Generation E (abbreviated ## C2 headers; Dirac pipes survive)', () => {
    const c = parseBlueprintContent('phys.qm.density-matrix', ABBREVIATED_WITH_DIRAC)
    expect(c.conceptSpine?.definition).toContain('pure and mixed states')
    expect(c.misconceptions).toHaveLength(1)
    // A naive split on "|" truncated this at the first ket.
    expect(c.misconceptions[0].probeQuestion).toContain('|ψ⟩ = Σcₙ|n⟩')
    expect(c.misconceptions[0].replacementConcept).toContain('PURE state')
    expect(c.diagnostics).toEqual([])
  })
})

// ── Tolerance requirements ────────────────────────────────────────────────────

describe('blueprintLoader — field-spelling tolerance', () => {
  const spellings = [
    ['snake_case', '**trigger_signal:** the student says X'],
    ['Title Case', '**Trigger signal:** the student says X'],
    ['UPPER CASE', '**TRIGGER SIGNAL:** the student says X'],
    ['hyphenated', '**Trigger-signal:** the student says X'],
    ['bulleted bold', '- **Trigger signal:** the student says X'],
    ['bulleted plain', '- Trigger: the student says X'],
  ] as const

  for (const [label, line] of spellings) {
    it(`reads the probe field written as ${label}`, () => {
      const md = `## Component 1 — Misconception Register\n\n### MC-1: Ordering\n${line}\n`
      const c = parseBlueprintContent('t.test.x', md)
      expect(c.misconceptions).toHaveLength(1)
      expect(c.misconceptions[0].probeQuestion).toContain('the student says X')
      expect(c.diagnostics).toEqual([])
    })
  }

  it('tolerates protocol tags in either bracket style', () => {
    const md = [
      '## Section 4 — Misconception Library',
      '',
      '### MC-1: Ordering',
      '**Bridge (P30):** parenthesised tag',
      '',
      '### MC-2: Repetition',
      '**Bridge text [P30]:** bracketed tag',
    ].join('\n')
    const c = parseBlueprintContent('t.test.x', md)
    expect(c.misconceptions[0].bridge).toBe('parenthesised tag')
    expect(c.misconceptions[1].bridge).toBe('bracketed tag')
  })
})

describe('blueprintLoader — component order is not load-bearing', () => {
  it('produces identical content when the ordinals are permuted', () => {
    const atOne = parseBlueprintContent('t.test.x',
      '## Component 1 — Misconception Register\n\n### MC-1: Ordering\n- **Trigger signal:** says X\n')
    const atSeven = parseBlueprintContent('t.test.x',
      '## Component 7 — Misconception Register\n\n### MC-1: Ordering\n- **Trigger signal:** says X\n')
    expect(atSeven.misconceptions).toEqual(atOne.misconceptions)
    expect(atOne.misconceptions).toHaveLength(1)
  })

  it('does not mistake a same-numbered section of a different meaning', () => {
    // Component 1 here is an anchor, NOT a misconception register — the
    // ordinal must not be enough to make it one.
    const c = parseBlueprintContent('t.test.x',
      '## Component 1 — Concrete Anchor [P06]\n\nSome anchor prose that is long enough to keep.\n')
    expect(c.misconceptions).toEqual([])
    expect(c.explanations.length).toBeGreaterThan(0)
    expect(c.diagnostics).toEqual([])
  })

  it('prefers a real registry over a repair protocol of a similar name', () => {
    const md = [
      '## Component 4 — Protocol B (Misconception Repair)',
      '',
      'Prose about repair sequencing, with no MC entries.',
      '',
      '## Component 6 — Misconception Registry',
      '',
      '### MC-1: Ordering',
      '- **Trigger signal:** says X',
    ].join('\n')
    const c = parseBlueprintContent('t.test.x', md)
    expect(c.misconceptions).toHaveLength(1)
    expect(c.misconceptions[0].probeQuestion).toContain('says X')
  })
})

describe('blueprintLoader — missing optional sections', () => {
  it('returns empty arrays and NO diagnostics when sections are absent', () => {
    const c = parseBlueprintContent('t.test.x',
      '## Component 0 — Concept Identity\n\n```yaml\nname: Thing\ndomain: t.test\n```\n\n## Component 9 — Validation Checklist\n\n- [x] done\n')
    expect(c.misconceptions).toEqual([])
    expect(c.explanations).toEqual([])
    // Absence is legitimate. Only present-but-unparseable is a defect.
    expect(c.diagnostics).toEqual([])
  })

  it('parses a blueprint with misconceptions but no explanations', () => {
    const c = parseBlueprintContent('t.test.x',
      '## Component 1 — Misconception Register\n\n### MC-1: Ordering\n- **Trigger signal:** says X\n')
    expect(c.misconceptions).toHaveLength(1)
    expect(c.explanations).toEqual([])
    expect(c.diagnostics).toEqual([])
  })
})

describe('blueprintLoader — fails loudly, never silently', () => {
  it('reports a misconception section that is present but unparseable', () => {
    const c = parseBlueprintContent('t.test.x',
      '## Component 1 — Misconception Register\n\nTBD — not yet authored in any recognised entry grammar.\n')
    expect(c.misconceptions).toEqual([])
    expect(c.diagnostics?.join(' ')).toMatch(/misconception section\(s\) present but unparseable/)
    expect(c.diagnostics?.join(' ')).toContain('Misconception Register')
  })

  it('reports an explanation section that is present but empty', () => {
    const c = parseBlueprintContent('t.test.x',
      '## Component 1 — Explanation Library\n\n## Component 2 — Validation Checklist\n\n- [x] done\n')
    expect(c.explanations).toEqual([])
    expect(c.diagnostics?.join(' ')).toMatch(/explanation section\(s\) present but unparseable/)
  })

  it('reports a spine section that yields no definition', () => {
    const c = parseBlueprintContent('t.test.x', '## Component 0 — Concept Metadata\n\n```\n\n```\n')
    expect(c.conceptSpine).toBeNull()
    expect(c.diagnostics?.join(' ')).toMatch(/spine section present/)
  })
})

// ── Corpus-wide invariant ─────────────────────────────────────────────────────
//
// The unit fixtures above prove each grammar is understood. This block proves
// the real corpus contains no generation the parser cannot interpret — which
// is the property that actually failed in production.

describe('blueprintLoader — real corpus invariants', () => {
  const dir = path.join(process.cwd(), 'docs', 'curriculum', 'blueprints')
  const ids = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter(f => f.endsWith('.md')).map(f => f.replace(/\.md$/, ''))
    : []

  it('has a blueprint corpus to check', () => {
    expect(ids.length).toBeGreaterThan(1000)
  })

  it('emits ZERO silent-data-loss diagnostics across the whole corpus', () => {
    const offenders: string[] = []
    for (const id of ids) {
      const r = loadBlueprintContent(id)
      if (r.found && (r.content.diagnostics?.length ?? 0) > 0) {
        offenders.push(`${id}: ${r.content.diagnostics!.join(' | ')}`)
      }
    }
    expect(offenders).toEqual([])
  })

  it('never returns both misconceptions and explanations empty', () => {
    const empty = ids.filter(id => {
      const r = loadBlueprintContent(id)
      return r.found && r.content.misconceptions.length === 0 && r.content.explanations.length === 0
    })
    expect(empty).toEqual([])
  })

  it('resolves a concept spine for every blueprint', () => {
    const missing = ids.filter(id => {
      const r = loadBlueprintContent(id)
      return r.found && !r.content.conceptSpine
    })
    expect(missing).toEqual([])
  })

  it('recovers misconceptions for every English blueprint (was 2 of 216)', () => {
    const eng = ids.filter(id => id.startsWith('eng.'))
    expect(eng.length).toBeGreaterThan(200)
    const withoutMc = eng.filter(id => {
      const r = loadBlueprintContent(id)
      return r.found && r.content.misconceptions.length === 0
    })
    expect(withoutMc).toEqual([])
  })

  it('keeps physics and chemistry at full misconception coverage', () => {
    for (const prefix of ['phys.', 'chem.']) {
      const subject = ids.filter(id => id.startsWith(prefix))
      const withoutMc = subject.filter(id => {
        const r = loadBlueprintContent(id)
        return r.found && r.content.misconceptions.length === 0
      })
      expect(withoutMc).toEqual([])
    }
  })
})
