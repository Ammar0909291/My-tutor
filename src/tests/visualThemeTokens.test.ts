/**
 * DAY-THEME VISUAL RENDERING — the semantic palette must work in both themes.
 *
 * THE DEFECT (reproduced in Chromium before the fix): the M4 figures rendered
 * correctly in dark and went effectively invisible in day theme. The figure
 * surface is themed (`var(--bg-surface)`: #161B22 dark, #F6F8FA light) but the
 * ink was not — every role was chosen against the dark canvas and baked into
 * the scene at generation time, so switching the theme painted #e2e8f0 text on
 * a #F6F8FA panel. That is 1.09:1. "air · rarer, n₂" and "glass · denser, n₁"
 * were unreadable in Total Internal Reflection while the coloured rays
 * survived, which is exactly the "disappears in light theme" report.
 *
 * THE FIX these tests pin: one semantic system, two sets of values, resolved
 * ROLE-WISE at render time (themeColor). The scene payload is unchanged and
 * theme-agnostic, so there is still one asset per concept and a restored
 * figure is byte-identical to the live one.
 *
 * Contrast is COMPUTED here (WCAG relative luminance), not asserted by comment.
 */

import { describe, expect, it } from 'vitest'
import { ROLE, ROLE_LIGHT, roleOf, themeColor, type Role } from '@/lib/teaching/sceneGenerators/visualDesign'
import { resolveVisual, restoreVisualSession } from '@/lib/teaching/visual/resolveVisual'
import { visibleObjects, type SceneSpec } from '@/lib/teaching/sceneSpec'
import { validateSceneSpec } from '@/lib/teaching/sceneSpecValidator'

/** The themed figure surface the scene is painted on — src/styles/tokens.css. */
const SURFACE = { dark: '#161B22', light: '#F6F8FA' } as const

function channel(v: number): number {
  const c = v / 255
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}
function luminance(hex: string): number {
  const h = hex.replace('#', '')
  const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16))
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}
/** WCAG contrast ratio between two hex colours. */
function contrast(a: string, b: string): number {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m)
  return (x + 0.05) / (y + 0.05)
}

const ROLES = Object.keys(ROLE) as Role[]
const PILOT = [
  'phys.therm.calorimetry',
  'phys.therm.first-law',
  'phys.opt.total-internal-reflection',
  'phys.wave.transverse-waves',
  'phys.wave.interference',
  'phys.mech.viscosity',
  'phys.mech.surface-tension',
] as const

function sceneOf(conceptId: string): SceneSpec {
  const d = resolveVisual({
    message: 'explain with diagram', lessonConceptId: conceptId,
    subject: 'physics', learnerRequest: 'diagram',
  })
  if (d.payload?.renderer !== 'scene') throw new Error(`${conceptId} has no scene`)
  return d.payload.sceneSpec
}

// ── the measurement that proves the bug and the fix ──────────────────────────

describe('the reported failure is measurable, and is fixed', () => {
  it('REPRODUCES it: the dark ink was invisible on the light surface', () => {
    // The pre-fix behaviour: the stored (dark) value used as-is in light theme.
    // Measured, not estimated: ink lands at 1.09:1 — invisible, which is the
    // "labels disappear" half of the report — and reference at 2.41:1, which
    // is the washed-out apparatus visible in the reproduction screenshot.
    // Both are far under the 4.5:1 bar the fix has to clear.
    expect(contrast(ROLE.ink, SURFACE.light)).toBeLessThan(1.5)
    expect(contrast(ROLE.reference, SURFACE.light)).toBeLessThan(3)
    expect(contrast(ROLE.reference, SURFACE.light)).toBeLessThan(4.5)
  })

  it('and the same roles are now readable in light theme', () => {
    expect(contrast(themeColor(ROLE.ink, 'light')!, SURFACE.light)).toBeGreaterThanOrEqual(4.5)
    expect(contrast(themeColor(ROLE.reference, 'light')!, SURFACE.light)).toBeGreaterThanOrEqual(4.5)
  })
})

describe('every semantic role resolves to a readable token in BOTH themes', () => {
  it.each(ROLES)('%s · dark', (role) => {
    const c = themeColor(ROLE[role], 'dark')!
    expect(c).toBe(ROLE[role])                       // dark is the stored value
    expect(contrast(c, SURFACE.dark)).toBeGreaterThanOrEqual(4.5)
  })

  it.each(ROLES)('%s · light', (role) => {
    const c = themeColor(ROLE[role], 'light')!
    expect(c).toBe(ROLE_LIGHT[role])
    expect(contrast(c, SURFACE.light)).toBeGreaterThanOrEqual(4.5)
  })

  it('the two themes cover the SAME roles — one system, not two palettes', () => {
    expect(Object.keys(ROLE_LIGHT).sort()).toEqual(ROLES.sort())
  })

  it('no light token is merely the dark one reused', () => {
    for (const role of ROLES) {
      expect(ROLE_LIGHT[role].toLowerCase(), role).not.toBe(ROLE[role].toLowerCase())
    }
  })

  it('roles stay distinguishable from each other in light theme', () => {
    // The colour language only survives if the roles remain separable.
    const seen = new Set(Object.values(ROLE_LIGHT).map((c) => c.toLowerCase()))
    expect(seen.size).toBe(ROLES.length)
  })

  it('and nothing is flattened to pure black or pure white', () => {
    for (const c of [...Object.values(ROLE), ...Object.values(ROLE_LIGHT)]) {
      expect(['#000000', '#000', '#ffffff', '#fff']).not.toContain(c.toLowerCase())
    }
  })
})

// ── the mapping itself ───────────────────────────────────────────────────────

describe('themeColor maps by ROLE, and touches nothing else', () => {
  it('recognises every palette colour', () => {
    for (const role of ROLES) expect(roleOf(ROLE[role])).toBe(role)
    expect(roleOf('#5B8DEF')).toBeNull()          // a pre-M4.1 generator default
    expect(roleOf(undefined)).toBeNull()
    expect(roleOf('')).toBeNull()
  })

  it('is case-insensitive about the stored hex', () => {
    expect(themeColor(ROLE.ink.toUpperCase(), 'light')).toBe(ROLE_LIGHT.ink)
  })

  it('leaves non-palette colours exactly as authored, in both themes', () => {
    for (const foreign of ['#5B8DEF', '#FFD166', '#9aa4b2', 'rebeccapurple']) {
      expect(themeColor(foreign, 'light')).toBe(foreign)
      expect(themeColor(foreign, 'dark')).toBe(foreign)
    }
  })

  it('dark rendering is byte-identical to before the fix', () => {
    for (const role of ROLES) expect(themeColor(ROLE[role], 'dark')).toBe(ROLE[role])
  })

  it('undefined stays undefined so renderer fallbacks still apply', () => {
    expect(themeColor(undefined, 'light')).toBeUndefined()
    expect(themeColor(null, 'dark')).toBeUndefined()
  })
})

// ── the seven pilot figures ──────────────────────────────────────────────────

describe('all seven M4 figures are theme-safe', () => {
  it.each(PILOT)('%s · every colour it uses resolves in both themes', (conceptId) => {
    const scene = sceneOf(conceptId)
    const colours = [...new Set(
      visibleObjects(scene, Infinity).map((o) => o.color).filter((c): c is string => !!c),
    )]
    expect(colours.length).toBeGreaterThan(0)
    for (const c of colours) {
      // Every colour these scenes use belongs to the semantic palette — no
      // scene invents its own, which is what makes one mapping sufficient.
      expect(roleOf(c), `${conceptId} uses non-semantic colour ${c}`).not.toBeNull()
      expect(contrast(themeColor(c, 'dark')!, SURFACE.dark)).toBeGreaterThanOrEqual(4.5)
      expect(contrast(themeColor(c, 'light')!, SURFACE.light)).toBeGreaterThanOrEqual(4.5)
    }
  })

  it.each(PILOT)('%s · stays structurally valid (geometry is theme-independent)', (conceptId) => {
    const scene = sceneOf(conceptId)
    expect(validateSceneSpec(scene).valid).toBe(true)
  })

  it.each(PILOT)('%s · the payload carries no theme — one asset serves both', (conceptId) => {
    const scene = sceneOf(conceptId)
    const json = JSON.stringify(scene)
    expect(json).not.toContain('data-theme')
    expect(json).not.toContain('"theme"')
    // The stored colours are the dark values; light is derived, never stored.
    for (const light of Object.values(ROLE_LIGHT)) {
      expect(json.toLowerCase()).not.toContain(light.toLowerCase())
    }
  })
})

// ── restoration (P1) inherits the fix ────────────────────────────────────────

describe('a RESTORED figure is theme-safe too', () => {
  it.each(PILOT)('%s · restored payload is identical, so it themes identically', (conceptId) => {
    const live = resolveVisual({
      message: 'explain with diagram', lessonConceptId: conceptId,
      subject: 'physics', learnerRequest: 'diagram',
    })
    const restored = restoreVisualSession(JSON.parse(JSON.stringify(live.session)))
    expect(restored).not.toBeNull()
    expect(JSON.stringify(restored!.payload)).toBe(JSON.stringify(live.payload))
    // Same payload + same renderer + render-time mapping ⇒ same theme behaviour.
    const payload = restored!.payload!
    if (payload.renderer === 'scene') {
      for (const o of visibleObjects(payload.sceneSpec, Infinity)) {
        if (!o.color) continue
        expect(contrast(themeColor(o.color, 'light')!, SURFACE.light)).toBeGreaterThanOrEqual(4.5)
      }
    }
  })
})
