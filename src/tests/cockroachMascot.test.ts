/**
 * The tutor mascot (cockroach-headed human, owner-directed 2026-10-01, replacing the eagle).
 * Guards: one drawing / four moods driven by a data attribute, server-safe component, no SVG ids
 * (dozens of instances share a page), motion in EVERY mood and size (never static) with a human blink,
 * reduced-motion softened not removed, and the eagle gone from the source tree.
 * 2026-10-01 revision: the earlier version asserted head/body motion was hero-only and that animation
 * was fully off under reduced motion / animated={false}; the owner then required the mascot to be
 * animated always, so those assertions were replaced by the ones below.
 */
import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'
import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'
import { CockroachMascot, type MascotMood } from '@/components/ui/candy/Mascot'

const ROOT = join(__dirname, '..', '..')
const TSX = readFileSync(join(ROOT, 'src/components/ui/candy/Mascot.tsx'), 'utf8')
const CYCLE = readFileSync(join(ROOT, 'src/components/ui/candy/MascotCycle.tsx'), 'utf8')
const CSS = readFileSync(join(ROOT, 'src/components/ui/candy/Mascot.module.css'), 'utf8')
const MOODS: MascotMood[] = ['serious', 'thinking', 'confused', 'laughing']

function walk(dir: string, out: string[] = []): string[] {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (/\.(ts|tsx)$/.test(f)) out.push(p)
  }
  return out
}

describe('CockroachMascot — moods', () => {
  it.each(MOODS)('renders the %s mood as a data attribute on one <svg>', (mood) => {
    const html = renderToStaticMarkup(createElement(CockroachMascot, { variant: 'hero', mood }))
    expect(html.match(/<svg/g)).toHaveLength(1)
    expect(html).toContain(`data-mood="${mood}"`)
  })

  it('defaults to serious', () => {
    expect(renderToStaticMarkup(createElement(CockroachMascot, { variant: 'logo' }))).toContain('data-mood="serious"')
  })

  it('every non-default mood has its own state block in the CSS (brows move in each)', () => {
    for (const mood of ['thinking', 'confused', 'laughing']) {
      expect(CSS).toContain(`.roach[data-mood='${mood}'] .browL`)
      expect(CSS).toContain(`.roach[data-mood='${mood}'] .browR`)
    }
  })

  it('each mood reveals exactly its own mouth', () => {
    expect(CSS).toContain(".roach[data-mood='thinking'] .mThink { opacity: 1; }")
    expect(CSS).toContain(".roach[data-mood='confused'] .mConfused { opacity: 1; }")
    expect(CSS).toContain(".roach[data-mood='laughing'] .mLaugh { opacity: 1; }")
  })

  it('laughing closes the eyes; thinking/confused show their props', () => {
    expect(CSS).toContain(".roach[data-mood='laughing'] .eyeOpen { opacity: 0; }")
    expect(CSS).toContain(".roach[data-mood='laughing'] .eyeShut { opacity: 1; }")
    expect(CSS).toContain(".roach[data-mood='thinking'] .bubble { opacity: 1; }")
    expect(CSS).toContain(".roach[data-mood='confused'] .question { opacity: 1; }")
  })
})

describe('CockroachMascot — variants and structure', () => {
  it('logo is a head-and-antennae square crop; hero includes the shoulders', () => {
    const logo = renderToStaticMarkup(createElement(CockroachMascot, { variant: 'logo' }))
    const hero = renderToStaticMarkup(createElement(CockroachMascot, { variant: 'hero' }))
    expect(logo).toContain('viewBox="130 20 1000 1000"')
    expect(hero).toContain('viewBox="30 30 1200 1200"')
    expect(logo).toContain('width="38"')
    expect(hero).toContain('width="110"')
  })

  it('size prop applies', () => {
    const html = renderToStaticMarkup(createElement(CockroachMascot, { variant: 'hero', size: 64 }))
    expect(html).toContain('width="64"')
    expect(html).toContain('height="64"')
  })

  it('is decorative (aria-hidden) and defines no SVG ids, so many instances can share a page', () => {
    const html = renderToStaticMarkup(createElement(CockroachMascot, { variant: 'hero' }))
    expect(html).toContain('aria-hidden="true"')
    expect(html).not.toMatch(/\sid="/)
    expect(TSX).not.toMatch(/\bid=/)
  })

  it('stays a pure function usable from server trees; only the Cycle wrapper is a client component', () => {
    expect(TSX).not.toContain("'use client'")
    expect(TSX).not.toMatch(/\buse(State|Effect|Id|Ref)\b/)
    expect(CYCLE.startsWith("'use client'")).toBe(true)
  })
})

describe('CockroachMascot — never static, blinks like a human', () => {
  const rule = (mood: string, el: string) => new RegExp(`\\.roach\\[data-mood='${mood}'\\] \\.${el} \\{ animation:`)

  it('every mood animates the head and the antennae, for BOTH variants (rules are not .hero-scoped)', () => {
    for (const mood of MOODS) {
      expect(CSS, `${mood} head`).toMatch(rule(mood, 'head'))
      expect(CSS, `${mood} antL`).toMatch(rule(mood, 'antL'))
      expect(CSS, `${mood} antR`).toMatch(rule(mood, 'antR'))
    }
  })

  it('there is no prop (and no .still class) that can freeze the mascot', () => {
    expect(TSX).not.toMatch(/animated/)
    expect(CSS).not.toMatch(/\.still/)
    expect(CYCLE).not.toMatch(/animated/)
  })

  it('only the mood PROPS (hidden at logo size anyway) are hero-scoped', () => {
    const propsOnly = /\.(mLaugh|tearL|tearR|qmark|sweat|dot\d|trail\d|llL|llR)\b/
    for (const line of CSS.split('\n')) {
      if (!line.includes('animation:') || !line.trimStart().startsWith('.hero[')) continue
      expect(line, line).toMatch(propsOnly)
    }
  })

  it('blinks in every mood except laughing (eyes already shut), on a >5s irregular cycle', () => {
    expect(CSS).toContain(".roach:not([data-mood='laughing']) .eyeOpen { animation: blink 7.4s ease-in-out infinite; }")
  })

  it('the blink keyframes hold a quick DOUBLE blink plus a single one, each closing to ~6% height', () => {
    const k = CSS.match(/@keyframes blink \{([\s\S]*?)\n\}/)![1]
    expect(k.match(/scaleY\(0\.06\)/g)).toBeTruthy()
    expect((k.match(/\d+(?:\.\d+)?%/g) ?? []).filter((t) => t.includes('.')).length).toBeGreaterThanOrEqual(3) // three closures
    // each closure is ~1.7% of 7.4s ≈ 125 ms: between the surrounding open keyframes
    expect(k).toContain('39.7%')
    expect(k).toContain('43%')
    expect(k).toContain('81.7%')
  })

  it('both eyes blink together, lids dropping from above the eye centre', () => {
    expect(TSX.match(/styles\.eyeOpen/g)).toHaveLength(2)
    expect(CSS).toContain('.eyeOpen { transform-origin: 50% 35%;')
  })

  it('reduced motion drops the big motion but keeps a soft breath and the blink (never fully frozen)', () => {
    const m = CSS.slice(CSS.indexOf('@media (prefers-reduced-motion: reduce)'))
    expect(m).toContain('.roach, .roach * { animation: none !important; }')
    expect(m).toContain('.roach .head { animation: breatheSoft 6s ease-in-out infinite !important; }')
    expect(m).toContain('.eyeOpen { animation: blink 7.4s ease-in-out infinite !important; }')
  })

  it('animates transform/opacity only (no layout-triggering properties in keyframes)', () => {
    const keyframes = CSS.match(/@keyframes[^{]+\{(?:[^{}]|\{[^{}]*\})*\}/g) ?? []
    expect(keyframes.length).toBeGreaterThan(10)
    for (const k of keyframes) expect(k).not.toMatch(/\b(width|height|top|left|margin|padding)\s*:/)
  })
})

describe('the eagle is gone', () => {
  it('no source file still references EagleMascot', () => {
    const offenders = walk(join(ROOT, 'src'))
      .filter((f) => !f.includes('/tests/'))
      .filter((f) => readFileSync(f, 'utf8').includes('EagleMascot'))
    expect(offenders).toEqual([])
  })
})
