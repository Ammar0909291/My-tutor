/**
 * TUTOR MAX "THINKING" INDICATOR — regression tests.
 *
 * Replaces the old blinking `•••` dots (bounceDot/.typing-dot, removed from
 * globals.css) with a breathing brain glyph + orbiting sparkle particles,
 * built on lucide-react's Brain/Sparkle icons. Two things made this file
 * possible to write at all, both explained in full where they live:
 *
 *   - `ThinkingBrain` and `shouldAutoScrollOnMessagesChange` are named
 *     exports from LessonScreen.tsx specifically so this pure, presentational
 *     component can be exercised directly — no DOM, no React renderer, no new
 *     test framework. A React function component is just a function that
 *     returns a plain object tree; calling it directly and walking that tree
 *     is a real, meaningful structural test, in the same "pure function,
 *     `environment: 'node'`" style as the rest of this suite.
 *   - vitest.config.ts now sets `oxc: { jsx: { runtime: 'automatic' } }` —
 *     without it, importing any `.tsx` file into a `.test.ts` fails outright
 *     ("invalid JS syntax"), because tsconfig.json's `"jsx": "preserve"`
 *     (correct for Next's own compiler) left Vite's transform with nothing to
 *     turn JSX into. See that config file's own comment for the full account.
 *
 * ROOT CAUSE OF THE OLD WRAP BUG, for the record (see LessonScreen.module.css
 * `.thinkingBrain` for the full account): the old markup was
 * `<TypingDots /><span>{label}</span>` as two siblings inside a Pill, and the
 * label span carried no `white-space: nowrap` / `flex-shrink: 0` — so on any
 * container narrower than the full phrase (a longer translation, a squeezed
 * split-view, a bumped accessibility font size), the browser was free to WRAP
 * THE LABEL TEXT ITSELF onto a second line, because a flex item's default
 * `min-width: auto` permits shrinking to its longest WORD's width, not its
 * full single-line width.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import postcss from 'postcss'
import type { ReactElement, ReactNode } from 'react'
import { ThinkingBrain, VisualPreparing } from '@/components/learn/ThinkingBrain'
import styles from '@/components/learn/ThinkingBrain.module.css'

/** Every element type in the tree, in document order — including the root. */
function collectTypes(node: ReactNode, out: string[] = []): string[] {
  if (node == null || typeof node === 'boolean') return out
  if (Array.isArray(node)) { node.forEach((n) => collectTypes(n, out)); return out }
  if (typeof node === 'object' && node !== null && 'type' in (node as Record<string, unknown>)) {
    const el = node as ReactElement<{ children?: ReactNode }>
    out.push(typeof el.type === 'string' ? el.type : '(component)')
    collectTypes(el.props?.children, out)
  }
  return out
}

/** Every plain-text leaf in the tree, concatenated — the visible text content. */
function collectText(node: ReactNode, out: string[] = []): string[] {
  if (node == null || typeof node === 'boolean') return out
  if (typeof node === 'string' || typeof node === 'number') { out.push(String(node)); return out }
  if (Array.isArray(node)) { node.forEach((n) => collectText(n, out)); return out }
  if (typeof node === 'object' && node !== null && 'type' in (node as Record<string, unknown>)) {
    collectText((node as ReactElement<{ children?: ReactNode }>).props?.children, out)
  }
  return out
}

const LABEL = 'Tutor Max is thinking'

describe('A — ThinkingBrain renders as one atomic root element', () => {
  it('the returned element is a single <span>, role=status, aria-label set to the label', () => {
    const el = ThinkingBrain({ label: LABEL }) as ReactElement<Record<string, unknown>>
    expect(el.type).toBe('span')
    expect(el.props.role).toBe('status')
    expect(el.props['aria-label']).toBe(LABEL)
  })

  it('carries the .thinkingBrain class from the CSS module (the atomic, non-wrapping wrapper)', () => {
    const el = ThinkingBrain({ label: LABEL }) as ReactElement<{ className?: string }>
    expect(el.props.className).toBe(styles.thinkingBrain)
  })
})

describe('B — the indicator can never wrap or split across two lines', () => {
  it('contains ZERO block-level <div> elements anywhere in the tree (default, with label)', () => {
    const el = ThinkingBrain({ label: LABEL })
    const types = collectTypes(el)
    expect(types).not.toContain('div')
    // every DOM-tag node is a span — nothing else could force a line break.
    expect(types.filter((t) => t !== '(component)')).toEqual(types.filter((t) => t !== '(component)').map(() => 'span'))
  })

  it('contains ZERO <div> elements in the compact (icon-only) variant either', () => {
    const el = ThinkingBrain({ label: LABEL, compact: true })
    expect(collectTypes(el)).not.toContain('div')
  })

  it('compact renders the icon stage only — no visible label text at all', () => {
    const el = ThinkingBrain({ label: LABEL, compact: true })
    expect(collectText(el).join('')).toBe('')
  })

  it('non-compact renders the exact label text once, visibly', () => {
    const el = ThinkingBrain({ label: LABEL })
    expect(collectText(el).join('')).toBe(LABEL)
  })

  it('a different label is honoured for both the visible text and the accessible name', () => {
    const other = 'Loading your lesson...'
    const el = ThinkingBrain({ label: other }) as ReactElement<Record<string, unknown>>
    expect(el.props['aria-label']).toBe(other)
    expect(collectText(el).join('')).toBe(other)
  })
})

describe('B (CSS) — the compiled stylesheet actually enforces no-wrap containment', () => {
  const css = readFileSync(join(__dirname, '../components/learn/ThinkingBrain.module.css'), 'utf8')
  const root = postcss.parse(css)

  function declOf(selector: string, prop: string): string | undefined {
    let found: string | undefined
    root.walkRules(selector, (rule) => {
      rule.walkDecls(prop, (decl) => { found = decl.value })
    })
    return found
  }

  it('.thinkingBrain is a non-shrinking, non-wrapping inline-flex row', () => {
    expect(declOf('.thinkingBrain', 'white-space')).toBe('nowrap')
    expect(declOf('.thinkingBrain', 'flex-shrink')).toBe('0')
    expect(declOf('.thinkingBrain', 'display')).toBe('inline-flex')
  })

  it('.brainStage (the icon) is pinned at flex-shrink: 0 — it is never what gives way', () => {
    expect(declOf('.brainStage', 'flex-shrink')).toBe('0')
  })

  it('.thinkingLabel ellipsizes rather than wraps if space is ever genuinely insufficient', () => {
    expect(declOf('.thinkingLabel', 'overflow')).toBe('hidden')
    expect(declOf('.thinkingLabel', 'text-overflow')).toBe('ellipsis')
    expect(declOf('.thinkingLabel', 'min-width')).toBe('0')
  })
})

describe('C — reduced motion: a calm, static composition, not merely paused mid-animation', () => {
  const css = readFileSync(join(__dirname, '../components/learn/ThinkingBrain.module.css'), 'utf8')
  const root = postcss.parse(css)

  function reducedMotionDecls(): Record<string, string[]> {
    const map: Record<string, string[]> = {}
    root.walkAtRules('media', (atRule) => {
      if (!/prefers-reduced-motion:\s*reduce/.test(atRule.params)) return
      atRule.walkRules((rule) => {
        rule.walkDecls((decl) => {
          for (const sel of rule.selector.split(',').map((s) => s.trim())) {
            map[sel] = map[sel] ?? []
            map[sel].push(`${decl.prop}:${decl.value}`)
          }
        })
      })
    })
    return map
  }

  it('a prefers-reduced-motion: reduce block exists', () => {
    let found = false
    root.walkAtRules('media', (atRule) => { if (/prefers-reduced-motion:\s*reduce/.test(atRule.params)) found = true })
    expect(found).toBe(true)
  })

  it('disables animation on every animated part: the brain, the glow, both orbit rings, and the particles', () => {
    const decls = reducedMotionDecls()
    for (const selector of ['.brainIcon', '.brainGlow', '.orbitRing', '.particleDot']) {
      expect(decls[selector], `expected a reduced-motion rule for ${selector}`).toBeDefined()
      expect(decls[selector]).toContain('animation:none')
    }
  })

  it('gives the second orbit ring an explicit resting angle, so the two particles do not stack at rest', () => {
    const decls = reducedMotionDecls()
    expect(decls['.orbitRing2']).toBeDefined()
    expect(decls['.orbitRing2']!.some((d) => d.startsWith('transform:'))).toBe(true)
  })
})

describe('the old blinking dots are genuinely gone, not just unused', () => {
  it('globals.css no longer defines .typing-dot or @keyframes bounceDot', () => {
    const globalsCss = readFileSync(join(__dirname, '../app/globals.css'), 'utf8')
    expect(globalsCss).not.toMatch(/\.typing-dot\b/)
    expect(globalsCss).not.toMatch(/@keyframes\s+bounceDot\b/)
  })
})

// ─── The completion pass: orbital ring, travelling spark, preparing state ────

describe('D — the orbital ring and the travelling spark', () => {
  const css = readFileSync(join(__dirname, '../components/learn/ThinkingBrain.module.css'), 'utf8')
  const tree = ThinkingBrain({ label: 'Thinking' }) as any
  const stage = tree.props.children[0]
  const stageChildren = (Array.isArray(stage.props.children) ? stage.props.children : [stage.props.children]).flat()

  it('draws a real ring, not an implied one — a particle orbiting nothing reads as a stray dot', () => {
    expect(stageChildren.some((c: any) => c?.props?.className === styles.orbitTrack)).toBe(true)
    expect(css).toMatch(/\.orbitTrack\s*\{[^}]*border:/)
    expect(css).toMatch(/\.orbitTrack\s*\{[^}]*border-radius:\s*50%/)
  })

  it('turns the ring SLOWLY, and against the inner particle', () => {
    const rule = /\.orbitTrack\s*\{([^}]*)\}/.exec(css)![1]
    const duration = Number(/animation:[^;]*?(\d+(?:\.\d+)?)s/.exec(rule)![1])
    expect(duration).toBeGreaterThanOrEqual(5)
    expect(rule).toContain('reverse')
  })

  it('carries a spark that is absent most of the time, by construction', () => {
    expect(stageChildren.some((c: any) => c?.props?.className === styles.spark)).toBe(true)
    const frames = /@keyframes sparkTravel\s*\{([\s\S]*?)\n\}/.exec(css)![1]
    // Visible for a fifth of the cycle; transparent from 20% to 100%.
    expect(frames).toMatch(/20%[^}]*opacity:\s*0/)
    expect(frames).toMatch(/100%[^}]*opacity:\s*0/)
    expect(frames).toMatch(/4%[^}]*opacity:\s*0\.9/)
  })

  it('animates the spark on compositor-only properties, so it can never cause layout', () => {
    const frames = /@keyframes sparkTravel\s*\{([\s\S]*?)\n\}/.exec(css)![1]
    const properties = [...frames.matchAll(/([a-z-]+)\s*:/g)].map((m) => m[1])
    expect([...new Set(properties)].sort()).toEqual(['opacity', 'transform'])
  })

  it('sizes the spark orbit from the stage, so it tracks the ring at any size', () => {
    const style = stage.props.style
    expect(style['--orbit-radius']).toBe('16px')       // default size 34
    const big = ThinkingBrain({ label: 'x', size: 48 }) as any
    expect(big.props.children[0].props.style['--orbit-radius']).toBe('22px')
  })

  it('stops both under reduced motion, and leaves no spark hanging mid-orbit', () => {
    const block = /@media \(prefers-reduced-motion: reduce\)\s*\{([\s\S]*?)\n\}/g
    const blocks = [...css.matchAll(block)].map((m) => m[1]).join('\n')
    expect(blocks).toMatch(/\.orbitTrack, \.spark \{ animation: none; \}/)
    expect(blocks).toMatch(/\.spark \{ opacity: 0; \}/)
  })

  it('keeps the whole loop in the 1.5-2s band for the parts that read as a pulse', () => {
    for (const name of ['brainBreathe', 'brainGlowPulse']) {
      const rule = new RegExp(`animation:\\s*${name}\\s+(\\d+(?:\\.\\d+)?)s`)
      const seconds = Number(rule.exec(css)![1])
      expect(seconds, name).toBeGreaterThanOrEqual(1.5)
      expect(seconds, name).toBeLessThanOrEqual(2.5)
    }
  })
})

describe('E — "preparing the figure" is a different moment, and says so', () => {
  const css = readFileSync(join(__dirname, '../components/learn/ThinkingBrain.module.css'), 'utf8')
  const tree = VisualPreparing({}) as any

  it('announces itself politely rather than as an alert', () => {
    expect(tree.props.role).toBe('status')
    expect(tree.props['aria-live']).toBe('polite')
    expect(tree.props['aria-label']).toContain('figure')
  })

  it('says something different from "thinking" — the tutor has already replied', () => {
    const label = tree.props['aria-label'] as string
    expect(label.toLowerCase()).not.toContain('thinking')
    expect(label.toLowerCase()).toContain('preparing')
  })

  it('reserves the FIGURE\'s own box, so nothing moves when the figure lands', () => {
    const rule = /\.preparing\s*\{([^}]*)\}/.exec(css)![1]
    // The same three terms ThreeDVisual sizes its canvas with.
    expect(rule).toMatch(/aspect-ratio:\s*4 \/ 3/)
    expect(rule).toMatch(/min-height:\s*260px/)
    expect(rule).toMatch(/max-height:\s*min\(520px, 60vh\)/)
  })

  it('reuses the indicator rather than inventing a second visual language', () => {
    const children = (Array.isArray(tree.props.children) ? tree.props.children : [tree.props.children]).flat()
    expect(children.some((c: any) => c?.type === ThinkingBrain)).toBe(true)
  })

  it('is quieter than the thinking indicator — a smaller glyph, its own words', () => {
    const children = (Array.isArray(tree.props.children) ? tree.props.children : [tree.props.children]).flat()
    const brain = children.find((c: any) => c?.type === ThinkingBrain)
    expect(brain.props.size).toBeLessThan(34)
    expect(brain.props.compact).toBe(true)
  })
})
