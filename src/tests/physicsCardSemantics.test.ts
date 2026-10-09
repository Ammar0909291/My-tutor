/**
 * PHYSICS SEMANTIC REVIEW — deterministic assertions for the figures that the
 * 2026-10-07 render audit left REVIEW_REQUIRED because no test established that
 * what they DRAW is what they SAY (docs/qa/PHYSICS_VISUAL_QUALITY_REPORT.md,
 * "REVIEW_REQUIRED follow-up — 2026-10-08").
 *
 * Every assertion here is derived from the geometry the component draws, never
 * from its label, and the claim it pins comes from the concept's Educational
 * Brain entry or the card's own contract — the file names which.
 */
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { TUNNEL, tunnelingCurves } from '@/components/school/visuals/QuantumTunneling'
import { ForceDiagram, FORCE_DIAGRAM } from '@/components/school/visuals/ForceDiagram'
import { DoubleSlit, DOUBLE_SLIT, barrierGeometry, detectionDots, fringeIntensity } from '@/components/school/visuals/DoubleSlit'
import { PotentialWell, POTENTIAL_WELL, wellLevels, wellWave } from '@/components/school/visuals/PotentialWell'
import { SternGerlach } from '@/components/school/visuals/SternGerlach'
import { cloudPoints, ORBITAL_LABELS } from '@/components/school/visuals/HydrogenOrbital3D'
import { BINS, COUNTS, MEAN_X, MEAN_LABEL } from '@/components/school/visuals/StatisticalDistribution3D'
import { resolveVisual } from '@/lib/teaching/visual/resolveVisual'
import { buildCollisionScene, checkCollisionConsistency } from '@/lib/teaching/sceneGenerators/momentumCollision.pure'
import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { PARTICLE_TREE, buildParticleClassificationScene } from '@/lib/teaching/sceneGenerators/physicsCoreScenesB10'
import { placeSceneLabels, viewportFromCanvas } from '@/lib/teaching/visual/layout'
import { complexityFor } from '@/lib/teaching/visual/visualComplexity'
import { buildRayOpticsScene, checkRayOpticsConsistency, type OpticsType } from '@/lib/teaching/sceneGenerators/rayOptics.pure'
import { WaveFunctionPlot, WAVE_FUNCTION, waveFunctionPoints } from '@/components/school/visuals/WaveFunctionPlot'
import { buildVectorProductsScene, VECTOR_PRODUCTS_PARAMS } from '@/lib/teaching/sceneGenerators/vectorProducts'
import { buildSiUnitsScene, buildDimensionsScene } from '@/lib/teaching/sceneGenerators/physicsCoreScenesB7'
import { LENS_POWER_PARAMS, buildLensPowerScene as buildLensPowerSceneAgain } from '@/lib/teaching/sceneGenerators/lensPower'
import { buildParticleConservationScene } from '@/lib/teaching/sceneGenerators/physicsCoreScenesB10'

/** A card's SVG as markup, every step revealed — what the learner finally sees. */
const markupOf = (component: Parameters<typeof createElement>[0]) => renderToStaticMarkup(createElement(component as never, { revealStep: Infinity }))
const num = (s: string | undefined) => Number(s)
const attr = (tag: string, name: string) => new RegExp(`\\s${name}="([^"]*)"`).exec(tag)?.[1]

// ── phys.qm.quantum-tunneling ────────────────────────────────────────────────
// EB: "the wave function inside the barrier is evanescent (real exponential
// decay), not oscillatory"; "the transmitted particle's energy EQUALS the
// incident particle's energy exactly"; a reduced-amplitude wave emerges.
describe('quantum tunneling card draws an evanescent barrier region', () => {
  const c = tunnelingCurves()

  it('inside the barrier ψ never changes sign and strictly decays (no oscillation)', () => {
    const signs = new Set(c.inside.map((p) => Math.sign(p.psi)))
    expect(signs.size).toBe(1)
    for (let i = 1; i < c.inside.length; i++) expect(Math.abs(c.inside[i].psi)).toBeLessThan(Math.abs(c.inside[i - 1].psi))
  })

  it('the decay is a true exponential: a constant ratio per equal step', () => {
    const ratios = c.inside.slice(1).map((p, i) => p.psi / c.inside[i].psi)
    for (const r of ratios) expect(r).toBeCloseTo(ratios[0], 9)
    expect(ratios[0]).toBeLessThan(1)
  })

  it('ψ is continuous across both barrier edges', () => {
    const last = <T,>(a: T[]) => a[a.length - 1]
    expect(last(c.incident).psi).toBeCloseTo(c.inside[0].psi, 9)
    expect(last(c.inside).psi).toBeCloseTo(c.transmitted[0].psi, 9)
    expect(last(c.incident).x).toBe(TUNNEL.barL)
    expect(c.transmitted[0].x).toBe(TUNNEL.barR)
  })

  it('the emerging wave is smaller than the incident wave, by exactly the decay it went through', () => {
    const amp = (pts: { psi: number }[]) => Math.max(...pts.map((p) => Math.abs(p.psi)))
    expect(amp(c.transmitted)).toBeLessThan(amp(c.incident))
    expect(amp(c.transmitted)).toBeCloseTo(c.inside[c.inside.length - 1].psi, 6)
    expect(c.transmittedAmp).toBeCloseTo(TUNNEL.amp * Math.exp(-TUNNEL.kappa), 9)
  })

  it('the incident and transmitted waves have the SAME wavelength (same energy either side)', () => {
    // Upward zero crossings, interpolated between samples; their spacing is one wavelength.
    const wavelength = (pts: { x: number; psi: number }[]) => {
      const up: number[] = []
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i]
        if (a.psi < 0 && b.psi >= 0) up.push(a.x + ((0 - a.psi) / (b.psi - a.psi)) * (b.x - a.x))
      }
      return (up[up.length - 1] - up[0]) / (up.length - 1)
    }
    // 30 samples per side is coarse; the interpolation error stays well under 1px of ~28.
    expect(Math.abs(wavelength(c.incident) - wavelength(c.transmitted))).toBeLessThan(1)
    expect(Math.abs(wavelength(c.incident) - TUNNEL.wavelength)).toBeLessThan(1)
  })
})

// ── Free-body diagram family: free-body-diagram · friction · normal-force · equilibrium ──
// KG/EB: a free-body diagram shows every external force on ONE body; friction opposes
// the (tendency of) relative motion; the normal force is the surface's perpendicular
// push on a body resting on it; static equilibrium means the forces balance.
describe('the shared force diagram draws what each of its four concepts says', () => {
  const svg = markupOf(ForceDiagram)
  const lines = [...svg.matchAll(/<line\b[^>]*marker-end="url\(#(\w+)\)"[^>]*>/g)].map((m) => ({
    tag: m[0], marker: m[1],
    x1: num(attr(m[0], 'x1')), y1: num(attr(m[0], 'y1')), x2: num(attr(m[0], 'x2')), y2: num(attr(m[0], 'y2')),
  }))
  const markers = new Map([...svg.matchAll(/<marker id="(\w+)"[^>]*><polygon points="([^"]+)"/g)].map((m) => [m[1], m[2].split(' ').map((p) => p.split(',').map(Number))]))

  /** With orient="auto" a marker is turned so its +x axis follows the line; its apex is the vertex farthest along its own x. */
  const headFollowsLine = (marker: string) => {
    const pts = markers.get(marker)!
    const apex = pts.reduce((a, b) => (b[0] > a[0] ? b : a))
    return apex[0] > Math.max(...pts.filter((p) => p !== apex).map((p) => p[0]))
  }
  const byColour = (hex: string) => lines.find((l) => l.tag.includes(`stroke="${hex}"`))!

  const applied = byColour('#22A06B'), friction = byColour('#3B82F6'), weight = byColour('#FF6B5E'), normal = byColour('#8B5CF6')

  it('draws all four forces, each with a head', () => {
    expect(lines).toHaveLength(4)
    for (const l of lines) expect(headFollowsLine(l.marker), `${l.marker} must point along its line`).toBe(true)
  })

  it('applied points right, FRICTION points LEFT (the head is at the far end, away from the body), weight down, normal up', () => {
    expect(applied.x2).toBeGreaterThan(applied.x1)
    expect(friction.x2).toBeLessThan(friction.x1)
    expect(weight.y2).toBeGreaterThan(weight.y1)
    expect(normal.y2).toBeLessThan(normal.y1)
    // Friction opposes the applied force: opposite signs along the same axis, same line of action.
    expect(Math.sign(friction.x2 - friction.x1)).toBe(-Math.sign(applied.x2 - applied.x1))
    expect(friction.y1).toBe(applied.y1)
  })

  it('every force is balanced by its opposite: equal lengths, so the body is in equilibrium', () => {
    expect(Math.abs(applied.x2 - applied.x1)).toBe(Math.abs(friction.x2 - friction.x1))
    expect(Math.abs(weight.y2 - weight.y1)).toBe(Math.abs(normal.y2 - normal.y1))
    expect(Math.abs(applied.x2 - applied.x1)).toBe(FORCE_DIAGRAM.horizontalLen)
  })

  it('all four lines of action pass through the body, so the net torque is zero too', () => {
    const { cx, boxW, boxH, groundY } = FORCE_DIAGRAM
    const cy = groundY - boxH / 2
    expect(applied.y1).toBe(cy)
    expect(friction.y1).toBe(cy)
    expect(weight.x1).toBe(cx)
    expect(normal.x1).toBe(cx)
    expect(Math.abs(applied.x1 - cx)).toBe(boxW / 2)
  })

  it('every arrow-head lies inside the drawing: none is cut off by the edge of the card', () => {
    const { width, height, headReach } = FORCE_DIAGRAM
    expect(svg).toContain(`viewBox="0 0 ${width} ${height}"`)
    for (const l of lines) {
      const len = Math.hypot(l.x2 - l.x1, l.y2 - l.y1)
      const tip = [l.x2 + ((l.x2 - l.x1) / len) * headReach, l.y2 + ((l.y2 - l.y1) / len) * headReach]
      expect(tip[0], `${l.marker} tip x`).toBeGreaterThanOrEqual(0)
      expect(tip[0], `${l.marker} tip x`).toBeLessThanOrEqual(width)
      expect(tip[1], `${l.marker} tip y`).toBeGreaterThanOrEqual(0)
      expect(tip[1], `${l.marker} tip y`).toBeLessThanOrEqual(height)
    }
    // ...and the labels beside them (the weight label is the lowest text)
    for (const m of svg.matchAll(/<text\b[^>]*\sy="([\d.]+)"/g)) expect(Number(m[1])).toBeLessThanOrEqual(height)
  })

  it('the body rests ON the ground (a normal force needs a contact)', () => {
    const rect = /<rect\b[^>]*>/.exec(svg)![0]
    const bottom = num(attr(rect, 'y')) + num(attr(rect, 'height'))
    expect(bottom).toBe(FORCE_DIAGRAM.groundY)
    const ground = [...svg.matchAll(/<line\b[^>]*>/g)].map((m) => m[0]).find((t) => !t.includes('marker-end') && attr(t, 'y1') === attr(t, 'y2') && num(attr(t, 'x2')) - num(attr(t, 'x1')) > 100)!
    expect(num(attr(ground, 'y1'))).toBe(bottom)
  })
})

// ── phys.qm.wave-function ────────────────────────────────────────────────────
// KG: ψ is an amplitude; its squared modulus is the probability DENSITY. The card
// must keep the two distinct and make the second follow from the first.
describe('wave-function card: |ψ|² is ψ squared, and the two are kept apart', () => {
  const pts = waveFunctionPoints()
  const svg = markupOf(WaveFunctionPlot)

  it('the density is exactly ψ² at every sample, so it is never negative', () => {
    for (const p of pts) {
      expect(p.density).toBeCloseTo(p.psi * p.psi, 12)
      expect(p.density).toBeGreaterThanOrEqual(0)
    }
  })

  it('ψ takes both signs (it is an amplitude), the density takes one', () => {
    expect(pts.some((p) => p.psi > 0.05)).toBe(true)
    expect(pts.some((p) => p.psi < -0.05)).toBe(true)
    expect(pts.every((p) => p.density >= 0)).toBe(true)
  })

  it('the density vanishes exactly where ψ does (the nodes) and peaks where |ψ| does', () => {
    const near = (a: number) => Math.abs(a) < 0.02
    for (const p of pts) if (near(p.psi)) expect(p.density).toBeLessThan(0.0005)
    const iMax = pts.reduce((best, p, i) => (Math.abs(p.psi) > Math.abs(pts[best].psi) ? i : best), 0)
    const dMax = pts.reduce((best, p, i) => (p.density > pts[best].density ? i : best), 0)
    expect(dMax).toBe(iMax)
  })

  it('the drawn curves are the numbers above: the red path sits at ψ² times the stated scale', () => {
    const paths = [...svg.matchAll(/<path\b[^>]*d="([^"]+)"[^>]*stroke="(#[0-9A-Fa-f]{6})"/g)].map((m) => ({ d: m[1], stroke: m[2] }))
    const ys = (d: string) => [...d.matchAll(/[ML] [\d.]+ ([\d.]+)/g)].map((m) => Number(m[1]))
    const blue = ys(paths.find((p) => p.stroke === '#3B9EFF')!.d)
    const red = ys(paths.find((p) => p.stroke === '#FF6B5E')!.d)
    expect(blue).toHaveLength(pts.length)
    pts.forEach((p, i) => {
      expect(blue[i]).toBeCloseTo(WAVE_FUNCTION.axisY - p.psi * WAVE_FUNCTION.amp, 1)
      expect(red[i]).toBeCloseTo(WAVE_FUNCTION.axisY - p.density * WAVE_FUNCTION.amp * WAVE_FUNCTION.densityScale, 1)
      expect(red[i]).toBeLessThanOrEqual(WAVE_FUNCTION.axisY + 0.05) // the density never goes below the axis
    })
  })

  it('both axis heads follow their axes (the y head used to point sideways), and the y axis names both curves', () => {
    const markers = [...svg.matchAll(/<marker id="(\w+)"[^>]*><polygon points="([^"]+)"/g)].map((m) => ({ id: m[1], pts: m[2].split(' ').map((q) => q.split(',').map(Number)) }))
    expect(markers.map((m) => m.id).sort()).toEqual(['wfAx', 'wfAy'])
    for (const m of markers) {
      const apex = m.pts.reduce((a, b) => (b[0] > a[0] ? b : a))
      expect(apex[0]).toBeGreaterThan(Math.max(...m.pts.filter((q) => q !== apex).map((q) => q[0])))
    }
    expect(svg).toContain('ψ, |ψ|²')
  })
})

// ── phys.mod.wave-particle-duality ───────────────────────────────────────────
// EB: each electron arrives as ONE localized dot; only the accumulated PATTERN of
// many dots is the interference pattern; the wave sets the probability of where a
// whole, unsplit particle lands. The card's own contract: "Particles passing through
// two slits build up a wave-like interference pattern on a screen".
describe('double-slit card: two equal slits, and particles that build up a pattern', () => {
  const { blocks, openings } = barrierGeometry()

  it('the two slits are equal in width and centred on the points the waves start from', () => {
    expect(openings).toHaveLength(2)
    const widths = openings.map((o) => o.to - o.from)
    expect(widths[0]).toBe(widths[1])
    expect(widths[0]).toBe(DOUBLE_SLIT.slitWidth)
    expect((openings[0].from + openings[0].to) / 2).toBe(DOUBLE_SLIT.slitTop)
    expect((openings[1].from + openings[1].to) / 2).toBe(DOUBLE_SLIT.slitBot)
  })

  it('the barrier is three solid blocks that tile the wall with exactly those two gaps', () => {
    expect(blocks).toHaveLength(3)
    expect(blocks[0].y).toBe(DOUBLE_SLIT.wallTop)
    expect(blocks[2].y + blocks[2].height).toBe(DOUBLE_SLIT.wallBottom)
    expect(blocks[0].y + blocks[0].height).toBe(openings[0].from)
    expect(blocks[1].y).toBe(openings[0].to)
    expect(blocks[1].y + blocks[1].height).toBe(openings[1].from)
    expect(blocks[2].y).toBe(openings[1].to)
  })

  it('the screen is centred midway between the slits, so the pattern is symmetric about the axis', () => {
    expect(DOUBLE_SLIT.centreY).toBe((DOUBLE_SLIT.slitTop + DOUBLE_SLIT.slitBot) / 2)
    for (const d of [5, 17, 30, 51]) expect(fringeIntensity(DOUBLE_SLIT.centreY + d)).toBeCloseTo(fringeIntensity(DOUBLE_SLIT.centreY - d), 12)
  })

  it('the particles are discrete dots on the screen, the same ones every render', () => {
    const dots = detectionDots()
    expect(dots).toHaveLength(DOUBLE_SLIT.detections)
    expect(detectionDots()).toEqual(dots)
    for (const d of dots) {
      expect(d.x).toBeGreaterThanOrEqual(DOUBLE_SLIT.screenX)
      expect(d.x).toBeLessThanOrEqual(DOUBLE_SLIT.screenX + 20)
      expect(d.y).toBeGreaterThanOrEqual(DOUBLE_SLIT.screenTop)
      expect(d.y).toBeLessThanOrEqual(DOUBLE_SLIT.screenBottom)
    }
    // (the one larger circle is the source)
    expect(markupOf(DoubleSlit).match(/<circle[^>]* r="1\.5"/g)?.length).toBe(DOUBLE_SLIT.detections)
  })

  it('the wave sets WHERE the dots land: far denser at the bright fringes than at the dark ones', () => {
    const dots = detectionDots()
    const { centreY, fringeSpacing } = DOUBLE_SLIT
    const phase = (y: number) => Math.abs((((y - centreY) % fringeSpacing) + fringeSpacing) % fringeSpacing - fringeSpacing / 2) // 0 at a dark fringe, spacing/2 at a bright one
    const near = (y: number) => Math.abs(y - centreY) < 40
    const bright = dots.filter((d) => near(d.y) && phase(d.y) > fringeSpacing / 2 - 5).length
    const dark = dots.filter((d) => near(d.y) && phase(d.y) < 5).length
    expect(bright).toBeGreaterThan(dark * 3)
  })

  it('and the pattern is symmetric about the axis within sampling noise', () => {
    const dots = detectionDots()
    const above = dots.filter((d) => d.y < DOUBLE_SLIT.centreY).length
    const below = dots.length - above
    expect(Math.abs(above - below)).toBeLessThan(dots.length * 0.2)
  })

  it('says what a dot is, so the picture is not read as a continuous wave', () => {
    // Neutral on purpose: this card also serves Young's experiment (phys.opt.youngs-experiment), a
    // light-wave lesson, so the caption must be true of photons and electrons alike.
    expect(markupOf(DoubleSlit)).toContain('one dot = one detection')
    // Kept short on purpose: the card's text is lifted to a 10 px floor, and the longer wording
    // ("the wave sets where dots land") ran under the barrier at 390 px (audit RD-02, 96 % visible).
    expect(markupOf(DoubleSlit)).toContain('wave sets where dots land')
  })
})

// ── phys.qm.particle-in-box ──────────────────────────────────────────────────
// KG: quantised energies Eₙ = n²π²ℏ²/(2mL²). The standing waves must vanish at the
// walls and have n half-wavelengths; the drawn levels must sit at n² units.
describe('potential-well card: levels at n², and genuine particle-in-a-box states', () => {
  const levels = wellLevels()
  const heightOf = (y: number) => POTENTIAL_WELL.floor - y

  it('the three levels are drawn to scale: height above the floor is n² times the first', () => {
    expect(levels.map((l) => l.n)).toEqual([1, 2, 3])
    for (const l of levels) expect(heightOf(l.y)).toBe(heightOf(levels[0].y) * l.n * l.n)
  })

  it('the labels say the same thing the picture shows (E2 = 4E₁, E3 = 9E₁)', () => {
    const svg = markupOf(PotentialWell)
    for (const l of levels.slice(1)) expect(svg).toContain(`E${l.n}=${l.n * l.n}E₁`)
    expect(svg).toContain('infinite square well')
  })

  it('each ψₙ is zero at BOTH walls (the boundary condition) and has exactly n−1 interior nodes', () => {
    for (const n of [1, 2, 3]) {
      const w = wellWave(n)
      expect(Math.abs(w[0].psi)).toBeLessThan(1e-9)
      expect(Math.abs(w[w.length - 1].psi)).toBeLessThan(1e-9)
      const interior = w.slice(1, -1).map((p) => Math.sign(Math.abs(p.psi) < 1e-9 ? 0 : p.psi))
      const crossings = interior.slice(1).filter((s, i) => s !== 0 && interior[i] !== 0 && s !== interior[i]).length + interior.filter((s) => s === 0).length
      expect(crossings).toBe(n - 1)
    }
  })

  it('the drawn states are orthonormal-shaped eigenstates: ⟨ψm|ψn⟩ = 0 for m ≠ n, and equal for m = n', () => {
    const dot = (m: number, n: number) => {
      const a = wellWave(m), b = wellWave(n)
      let sum = 0
      for (let i = 1; i < a.length; i++) sum += ((a[i].psi * b[i].psi + a[i - 1].psi * b[i - 1].psi) / 2) / (a.length - 1)
      return sum
    }
    for (const m of [1, 2, 3]) for (const n of [1, 2, 3]) {
      if (m === n) expect(dot(m, n)).toBeCloseTo(0.5, 2)
      else expect(Math.abs(dot(m, n))).toBeLessThan(1e-9)
    }
  })

  it('every wave stays inside the walls and clear of its neighbours', () => {
    const { amp, top, floor } = POTENTIAL_WELL
    for (const l of levels) {
      expect(l.y - amp).toBeGreaterThanOrEqual(top)
      expect(l.y + amp).toBeLessThanOrEqual(floor)
    }
    for (let i = 1; i < levels.length; i++) expect(levels[i - 1].y - levels[i].y).toBeGreaterThan(2 * amp)
  })
})

// ── phys.qm.spin ─────────────────────────────────────────────────────────────
// KG: spin is intrinsic, half-integer, shown by spatial quantisation in the
// Stern–Gerlach experiment: ONE beam in, exactly TWO spots out. The card must not
// describe spin as macroscopic rotation.
describe('Stern–Gerlach card: one beam in, two symmetric outcomes ±½, no classical spinning', () => {
  const svg = markupOf(SternGerlach)
  const tags = (name: string) => [...svg.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map((m) => m[0])
  const lines = tags('line').map((t) => ({ t, x1: num(attr(t, 'x1')), y1: num(attr(t, 'y1')), x2: num(attr(t, 'x2')), y2: num(attr(t, 'y2')), stroke: attr(t, 'stroke') }))
  const beams = lines.filter((l) => l.stroke === '#8B5CF6')
  const incoming = lines.find((l) => l.stroke === '#FF6B5E')!

  it('the incoming beam splits into exactly two paths from one point', () => {
    expect(beams).toHaveLength(2)
    expect(beams[0].x1).toBe(beams[1].x1)
    expect(beams[0].y1).toBe(beams[1].y1)
    expect(beams[0].y1).toBe(incoming.y1) // the split starts on the incoming beam's axis
  })

  it('the two deflections are equal and opposite about that axis', () => {
    expect(beams[0].y2 - beams[0].y1).toBe(-(beams[1].y2 - beams[1].y1))
    expect(beams[0].x2).toBe(beams[1].x2)
  })

  it('exactly two detector spots, one at the end of each path, labelled +½ and −½', () => {
    const spots = tags('circle').map((t) => ({ cx: num(attr(t, 'cx')), cy: num(attr(t, 'cy')) })).filter((c) => c.cx === beams[0].x2)
    expect(spots).toHaveLength(2)
    expect(spots.map((c) => c.cy).sort()).toEqual([beams[0].y2, beams[1].y2].sort())
    expect(svg).toContain('+½')
    expect(svg).toContain('−½')
  })

  it('states quantisation, and never calls spin a rotation', () => {
    expect(svg).toContain('only two outcomes')
    expect(svg.toLowerCase()).not.toMatch(/rotat|spinning|orbit|revolv/)
  })
})

// ── phys.qm.hydrogen-atom-qm ─────────────────────────────────────────────────
// Card contract: electrons occupy probability CLOUDS, not planetary orbits — a
// spherical 1s, a 2s with a radial node, a 2p with a nodal plane and two lobes.
describe('hydrogen orbital card: the cloud shapes are the orbitals they name', () => {
  const R = 2
  const radius = (p: number[]) => Math.hypot(p[0], p[1], p[2])

  it('1s is spherically symmetric about the nucleus and contained', () => {
    const pts = cloudPoints(600, R, '1s')
    expect(Math.max(...pts.map(radius))).toBeLessThanOrEqual(R + 1e-9)
    const mean = [0, 1, 2].map((k) => pts.reduce((a, p) => a + p[k], 0) / pts.length)
    for (const m of mean) expect(Math.abs(m)).toBeLessThan(0.1 * R)
    const spread = [0, 1, 2].map((k) => pts.reduce((a, p) => a + p[k] * p[k], 0) / pts.length)
    expect(Math.max(...spread) / Math.min(...spread)).toBeLessThan(1.3) // no preferred axis
  })

  it('2s has a RADIAL NODE: an inner core, an outer shell and a gap with no points between', () => {
    const rs = cloudPoints(600, R, '2s').map(radius)
    expect(rs.filter((r) => r > 0.35 * R + 1e-9 && r < 0.7 * R - 1e-9)).toHaveLength(0)
    expect(rs.filter((r) => r <= 0.35 * R + 1e-9).length).toBeGreaterThan(100)
    expect(rs.filter((r) => r >= 0.7 * R - 1e-9).length).toBeGreaterThan(100)
  })

  it('2p has a NODAL PLANE through the nucleus and two equal lobes either side of it, along one axis', () => {
    const pts = cloudPoints(600, R, '2p')
    expect(Math.min(...pts.map((p) => Math.abs(p[1])))).toBeGreaterThan(0.4 * R) // nothing near y = 0
    const up = pts.filter((p) => p[1] > 0).length
    const down = pts.filter((p) => p[1] < 0).length
    expect(Math.abs(up - down)).toBeLessThanOrEqual(2)
    expect(Math.max(...pts.map((p) => Math.abs(p[1])))).toBeGreaterThan(Math.max(...pts.map((p) => Math.hypot(p[0], p[2]))))
  })

  it('the side-by-side view names each cloud, and the name sits below the whole cloud it names', () => {
    const drawnRadius = { '1s': 0.8, '2s': 1.2, '2p': 1.4 } as const   // the radii the comparison clouds are drawn with
    expect(ORBITAL_LABELS.map((o) => o.text)).toEqual(['1s', '2s', '2p'])
    expect(ORBITAL_LABELS.map((o) => o.x)).toEqual([-3.2, 0, 3.2])
    for (const o of ORBITAL_LABELS) {
      const pts = cloudPoints(600, drawnRadius[o.text], o.text)
      const reach = Math.max(...pts.map(radius))
      expect(o.extent, o.text).toBeGreaterThanOrEqual(reach - 1e-9)   // the label's clearance covers the cloud
    }
  })
})

// ── phys.stat.probability-basics ─────────────────────────────────────────────
// The card draws a FREQUENCY histogram with its mean and spread. It must not draw
// probabilities above 1 or call a count a probability, and its mean line and its
// "symmetric" claim must be true of the data it draws.
describe('statistical distribution card: the mean line and the "symmetric" label are true of the data', () => {
  const total = COUNTS.reduce((a, b) => a + b, 0)

  it('the data are counts on a frequency axis, never probabilities', () => {
    expect(COUNTS.every((c) => Number.isInteger(c) && c >= 0)).toBe(true)
    expect(COUNTS.some((c) => c > 1)).toBe(true)
    expect(MEAN_LABEL.toLowerCase()).not.toContain('probab')
  })

  it('the histogram is symmetric about its centre bin, as the label claims', () => {
    expect(COUNTS).toEqual([...COUNTS].reverse())
    BINS.forEach((b, i) => expect(b + BINS[BINS.length - 1 - i]).toBeCloseTo(0, 12)) // bin centres mirror about zero
    expect(COUNTS.indexOf(Math.max(...COUNTS))).toBe(Math.floor(COUNTS.length / 2))
  })

  it('the red mean line is drawn exactly at the mean of the data', () => {
    const mean = BINS.reduce((a, b, i) => a + b * COUNTS[i], 0) / total
    expect(mean).toBeCloseTo(MEAN_X, 12)
  })

  it('the data are bell-shaped: counts rise to the centre and fall away', () => {
    const mid = Math.floor(COUNTS.length / 2)
    for (let i = 1; i <= mid; i++) expect(COUNTS[i]).toBeGreaterThanOrEqual(COUNTS[i - 1])
    for (let i = mid + 1; i < COUNTS.length; i++) expect(COUNTS[i]).toBeLessThanOrEqual(COUNTS[i - 1])
  })
})

// ── phys.mech.conservation-of-momentum ───────────────────────────────────────
// KG/EB: the TOTAL (vector-sum) momentum of an isolated system is unchanged even
// though individual momenta change. The figure must show masses and velocities and
// they must conserve the total — recomputed here from what is DRAWN.
describe('conservation of momentum is shown with numbers that conserve it', () => {
  const served = () => {
    const d = resolveVisual({ message: 'show me a diagram', lessonConceptId: 'phys.mech.conservation-of-momentum', learnerRequest: 'diagram', subject: 'physics' } as never)
    if (d.payload?.renderer !== 'scene') throw new Error('expected the collision scene')
    return d.payload.sceneSpec as SceneSpec
  }
  const drawnTotals = (spec: SceneSpec) => {
    const objs = spec.steps.flatMap((x) => x.objects)
    const mass = (id: string) => Number(/m\d=([\d.]+)/.exec(objs.find((o) => o.id === id)?.text ?? '')?.[1])
    const vel = (id: string) => { const v = objs.find((o) => o.id === id)!; return v.to![0] - v.from![0] }
    const m1 = mass('obj1-before'), m2 = mass('obj2-before')
    // Perfectly inelastic: the bodies stick, so there is one final velocity and the mass is m1 + m2.
    const stuck = !objs.some((o) => o.id === 'v2f')
    return { before: m1 * vel('u1') + m2 * vel('u2'), after: stuck ? (m1 + m2) * vel('v1f') : m1 * vel('v1f') + m2 * vel('v2f'), m1, m2 }
  }

  it('is served the collision generator (masses and velocities printed), not unlabeled spheres', () => {
    const spec = served()
    expect(spec.id.startsWith('collision-')).toBe(true)
    const text = spec.steps.flatMap((x) => x.objects).map((o) => o.text ?? '').join(' ')
    for (const token of ['m1=', 'm2=', 'u1=', 'u2=', 'v1f=', 'v2f=']) expect(text).toContain(token)
  })

  it('total momentum computed from the DRAWN vectors is the same before and after', () => {
    const t = drawnTotals(served())
    expect(Number.isFinite(t.before) && Number.isFinite(t.after)).toBe(true)
    expect(t.after).toBeCloseTo(t.before, 1)
    // ...although each body's own momentum changed (it is redistributed, not conserved per body):
    const objs = served().steps.flatMap((x) => x.objects)
    const dv1 = objs.find((o) => o.id === 'v1f')!.to![0] - objs.find((o) => o.id === 'v1f')!.from![0] - (objs.find((o) => o.id === 'u1')!.to![0] - objs.find((o) => o.id === 'u1')!.from![0])
    expect(Math.abs(dv1)).toBeGreaterThan(0.1)
  })

  it('the generator\'s own independent re-derivation agrees, for both collision types the learner can pick', () => {
    for (const collisionType of ['elastic', 'perfectly_inelastic'] as const) {
      const params = { m1: 2, m2: 1, u1: 3, u2: -2, collisionType }
      const spec = buildCollisionScene(params)
      expect(checkCollisionConsistency(spec, params)).toEqual({ ok: true, errors: [] })
      const t = drawnTotals(spec)
      expect(t.after).toBeCloseTo(t.before, 1)
    }
  })
})

// ── phys.particle.particle-classification ────────────────────────────────────
// KG: hadrons (composite, made of quarks, feel the strong force) split into
// baryons (3 quarks) and mesons (quark + antiquark); leptons are fundamental and
// do not feel the strong force. The figure is a tree, so the TREE must read right.
describe('particle classification tree: the structure is true, and it survives layout at every width', () => {
  // Authoritative particle data, independent of the figure: [quark content, baryon number, lepton number].
  const KNOWN = {
    p: { family: 'baryon', quarks: 3, B: 1 }, n: { family: 'baryon', quarks: 3, B: 1 },
    'π': { family: 'meson', quarks: 2, B: 0 }, K: { family: 'meson', quarks: 2, B: 0 },
    e: { family: 'lepton', L: 1 }, 'μ': { family: 'lepton', L: 1 }, 'τ': { family: 'lepton', L: 1 }, ν: { family: 'lepton', L: 1 },
  } as const
  const byId = (id: string) => PARTICLE_TREE.find((n) => n.id === id)!

  it('hadrons and leptons are the two children of "particles"; baryons and mesons are the children of hadrons', () => {
    const kids = (id: string) => PARTICLE_TREE.filter((n) => n.parent === id).map((n) => n.id).sort()
    expect(kids('particles')).toEqual(['hadrons', 'leptons'])
    expect(kids('hadrons')).toEqual(['baryons', 'mesons'])
    expect(kids('leptons')).toEqual(['lepton-list'])
    expect(byId('particles').parent).toBeNull()
  })

  it('the example particles sit under the right family', () => {
    const examples = (id: string) => byId(id).note?.split(/,\s*/) ?? []
    for (const sym of examples('baryons')) expect(KNOWN[sym as keyof typeof KNOWN]).toMatchObject({ family: 'baryon', quarks: 3, B: 1 })
    for (const sym of examples('mesons')) expect(KNOWN[sym as keyof typeof KNOWN]).toMatchObject({ family: 'meson', quarks: 2, B: 0 })
    for (const sym of byId('lepton-list').name.split(/,\s*/)) expect(KNOWN[sym as keyof typeof KNOWN]).toMatchObject({ family: 'lepton' })
  })

  it('every child hangs BELOW its parent, hadrons on the left of leptons, and notes directly under their names', () => {
    for (const n of PARTICLE_TREE) if (n.parent) expect(n.at[1]).toBeLessThan(byId(n.parent).at[1])
    expect(byId('hadrons').at[0]).toBeLessThan(byId('particles').at[0])
    expect(byId('leptons').at[0]).toBeGreaterThan(byId('particles').at[0])
    expect(byId('baryons').at[0]).toBeLessThan(byId('mesons').at[0])
    for (const kid of ['baryons', 'mesons']) expect(Math.abs(byId(kid).at[0] - byId('hadrons').at[0])).toBeLessThan(2.5)
  })

  it('names every node of the tree and stays inside the explainer\'s label budget (past it the root is the first label held back)', () => {
    const labels = buildParticleClassificationScene().steps.flatMap((x) => x.objects).filter((o) => o.type === 'label').map((o) => o.text)
    expect(labels.length).toBeLessThanOrEqual(complexityFor('intermediate').maxLabels)
    for (const n of PARTICLE_TREE) expect(labels, n.name).toContain(n.name)
    // The leaves' examples are not dropped: they are said in the step that introduces the leaves.
    const step2 = buildParticleClassificationScene().steps[1].narration
    expect(step2).toContain(`Baryons (${byId('baryons').note})`)
    expect(step2).toContain(`mesons (${byId('mesons').note})`)
  })

  it('at a phone, a desktop column and a tall desktop canvas, no label is pushed out of its place in the tree', () => {
    const spec = buildParticleClassificationScene()
    const sizes: Array<[number, number, number]> = [[282, 260, 390], [566, 272, 1280], [566, 380, 1280]]
    for (const [w, h, bw] of sizes) {
      const cum: SceneSpec['steps'][number]['objects'] = []
      for (const step of spec.steps) {
        cum.push(...step.objects)
        const placed = placeSceneLabels({ ...spec, steps: [{ objects: [...cum] }] }, viewportFromCanvas(w, h, bw))
        expect(placed.unresolved).toBe(0)
        for (const l of placed.labels) expect(l.movedPx, `${w}x${h}: "${l.text}" moved ${l.movedPx}px`).toBeLessThanOrEqual(16)
      }
    }
  })
})

// ── phys.opt.mirrors · phys.opt.lenses · phys.opt.lens-power ─────────────────
// KG: mirror formula 1/f = 1/v + 1/u; thin-lens formula 1/f = 1/v − 1/u. The numbers
// the figure PRINTS must satisfy the formula the lesson prints.
describe('ray-optics figures print u, f and v that satisfy the lesson\'s own formula', () => {
  const kinds: OpticsType[] = ['concave_mirror', 'convex_mirror', 'convex_lens', 'concave_lens']
  const cases = [{ objectDistance: 30, focalLength: 10, objectHeight: 5 }, { objectDistance: 8, focalLength: 12, objectHeight: 3 }, { objectDistance: 45, focalLength: 20, objectHeight: 4 }, { objectDistance: 15, focalLength: 6, objectHeight: 2 }]

  for (const opticsType of kinds) {
    it(`${opticsType}: the printed u, f, v satisfy ${opticsType.includes('mirror') ? '1/f = 1/v + 1/u' : '1/f = 1/v − 1/u'}`, () => {
      for (const c of cases) {
        const params = { opticsType, ...c }
        const spec = buildRayOpticsScene(params)
        const m = /u=(-?[\d.]+)cm, f=(-?[\d.]+)cm → v=(-?[\d.]+)cm/.exec(spec.title)
        expect(m, spec.title).not.toBeNull()
        const [u, f, v] = [Number(m![1]), Number(m![2]), Number(m![3])]
        const rhs = opticsType.includes('mirror') ? 1 / v + 1 / u : 1 / v - 1 / u
        expect(rhs).toBeCloseTo(1 / f, 2)
        // The object is on the incoming side; a concave element has a negative focal length.
        expect(u).toBeLessThan(0)
        expect(Math.sign(f)).toBe(opticsType === 'concave_mirror' || opticsType === 'concave_lens' ? -1 : 1)
        expect(checkRayOpticsConsistency(spec, params).ok).toBe(true)
      }
    })
  }

  it('the marked point on the axis is the mirror\'s POLE (P) but the lens\'s OPTICAL CENTRE (O), and F sits |f| from it on the right side', () => {
    for (const opticsType of kinds) {
      const spec = buildRayOpticsScene({ opticsType, objectDistance: 30, focalLength: 10, objectHeight: 5 })
      const objs = spec.steps.flatMap((x) => x.objects)
      const pole = objs.find((o) => o.id === 'pole')!
      expect(pole.text, opticsType).toBe(opticsType.includes('mirror') ? 'P' : 'O')
      expect(pole.position).toEqual([0, 0, 0])
      // F is on the side the formulas put it: concave mirror in front (−x, object side), convex mirror
      // behind (+x), convex lens beyond (+x, the side light leaves on), concave lens on the object side.
      const focusX = objs.find((o) => o.id === 'focus')!.position![0]
      const u = 30
      const objX = objs.find((o) => o.id === 'object')!.from![0]
      // The figure is drawn to one scale: focus distance / object distance = f / u.
      expect(Math.abs(focusX) / Math.abs(objX)).toBeCloseTo(10 / u, 2)
      const expectedSide = { concave_mirror: -1, convex_mirror: 1, convex_lens: 1, concave_lens: -1 }[opticsType]
      expect(Math.sign(focusX), opticsType).toBe(expectedSide)
    }
  })

  it('the lens / mirror itself is drawn: a plane through the pole, tall enough to take both principal rays', () => {
    for (const opticsType of kinds) {
      for (const c of cases) {
        const spec = buildRayOpticsScene({ opticsType, ...c })
        const objs = spec.steps.flatMap((x) => x.objects)
        const plane = objs.find((o) => o.id === (opticsType.includes('mirror') ? 'mirror-plane' : 'lens-plane'))
        expect(plane, `${opticsType} ${JSON.stringify(c)}`).toBeDefined()
        const [a, b] = plane!.points!
        expect(a[0]).toBe(0)
        expect(b[0]).toBe(0)
        expect(a[1]).toBeCloseTo(-b[1], 6)
        // Every point where a principal ray meets the element lies on it.
        for (const id of ['light-ray-parallel', 'light-ray-through-centre']) {
          const hit = objs.find((o) => o.id === id)!.points![1]
          expect(hit[0]).toBe(0)
          expect(Math.abs(hit[1])).toBeLessThanOrEqual(b[1] + 1e-9)
        }
      }
    }
  })

  it('the camera is framed to what is drawn: every point sits inside a 4:3 frame at the scene\'s own distance', () => {
    const tan = Math.tan((50 * Math.PI) / 360)
    for (const opticsType of kinds) {
      for (const c of [...cases, { objectDistance: 5, focalLength: 3, objectHeight: 12 }]) {
        const spec = buildRayOpticsScene({ opticsType, ...c })
        const halfH = tan * spec.cameraDistance!, halfW = halfH * (4 / 3)
        for (const o of spec.steps.flatMap((x) => x.objects)) {
          // A ray is a line that runs on to the frame's edge (a steep one leaves it at the top, as light
          // does), so only the bodies — object, image, element, points, label — must sit inside vertically.
          const isRay = typeof o.id === 'string' && (o.id.startsWith('light-ray') || o.id.startsWith('virtual-extension'))
          for (const p of [o.position, o.from, o.to, ...(o.points ?? [])].filter(Boolean) as number[][]) {
            expect(Math.abs(p[0]), `${opticsType} ${JSON.stringify(c)} ${o.id}`).toBeLessThanOrEqual(halfW)
            if (!isRay) expect(Math.abs(p[1]), `${opticsType} ${JSON.stringify(c)} ${o.id}`).toBeLessThanOrEqual(halfH)
          }
        }
      }
    }
  })

  it('the lens and the mirror served for the review concepts are exactly the worked cases (30 cm, 10 cm)', () => {
    const mirror = resolveVisual({ message: 'show me a diagram', lessonConceptId: 'phys.opt.mirrors', learnerRequest: 'diagram', subject: 'physics' } as never)
    const lens = resolveVisual({ message: 'show me a diagram', lessonConceptId: 'phys.opt.lenses', learnerRequest: 'diagram', subject: 'physics' } as never)
    if (mirror.payload?.renderer !== 'scene' || lens.payload?.renderer !== 'scene') throw new Error('expected scenes')
    expect(mirror.payload.sceneSpec.title).toBe('concave mirror: u=-30cm, f=-10cm → v=-15cm')
    expect(lens.payload.sceneSpec.title).toBe('convex lens: u=-30cm, f=10cm → v=15cm')
  })

  it('the rays are drawn through the points the formula gives: parallel ray through F, central ray undeviated, both meet at the image', () => {
    for (const opticsType of ['convex_lens', 'concave_mirror'] as const) {
      const spec = buildRayOpticsScene({ opticsType, objectDistance: 30, focalLength: 10, objectHeight: 5 })
      const objs = spec.steps.flatMap((x) => x.objects)
      const at = (id: string) => objs.find((o) => o.id === id)!
      const focus = at('focus').position!, image = at('image').to!
      const parallel = at('light-ray-parallel').points!, centre = at('light-ray-through-centre').points!
      // The parallel ray leaves the element and, extended, passes through the focus.
      const [hit, out] = [parallel[1], parallel[2]]
      const t = (focus[0] - hit[0]) / (out[0] - hit[0])
      expect(hit[1] + t * (out[1] - hit[1])).toBeCloseTo(focus[1], 1)
      // The ray through the centre/pole: a lens passes it on UNDEVIATED (same slope); a mirror
      // reflects it about the axis (slope reversed, same size).
      const [tip, mid, end] = centre
      const slopeIn = (mid[1] - tip[1]) / (mid[0] - tip[0]), slopeOut = (end[1] - mid[1]) / (end[0] - mid[0])
      expect(slopeOut).toBeCloseTo(opticsType === 'convex_lens' ? slopeIn : -slopeIn, 2)
      // Both rays pass through the image tip.
      for (const ray of [parallel, centre]) {
        const [a, b] = [ray[1], ray[2]]
        const k = (image[0] - a[0]) / (b[0] - a[0])
        expect(a[1] + k * (b[1] - a[1])).toBeCloseTo(image[1], 1)
      }
    }
  })
})

// ── scene text helpers ───────────────────────────────────────────────────────
type SceneObj = { type?: string; text?: string; position?: number[]; from?: number[]; to?: number[]; points?: number[][] }
const sceneObjects = (spec: SceneSpec) => spec.steps.flatMap((x) => x.objects as SceneObj[])
const sceneTexts = (spec: SceneSpec) => sceneObjects(spec).map((o) => o.text).filter((t): t is string => Boolean(t))

// ── phys.meas.vector-products ────────────────────────────────────────────────
// The existing vectorProductVisualSelection suite re-derives the perpendicular, the right-hand
// direction and |A||B| sinθ from the drawn endpoints. What it does not pin is that the two NUMBERS
// the figure prints (6 and 10.39) are what the drawn geometry measures — the label is not the proof.
describe('vector products: the printed 6 and 10.39 are what the drawn geometry measures', () => {
  const spec = buildVectorProductsScene()
  const objs = sceneObjects(spec) as Array<SceneObj & { color?: string }>
  const sub = (p: number[], q: number[]) => [p[0] - q[0], p[1] - q[1], p[2] - q[2]]
  const mag = (v: number[]) => Math.hypot(v[0], v[1], v[2])
  const crossV = (u: number[], v: number[]) => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]
  const k = VECTOR_PRODUCTS_PARAMS.scale

  it('right panel: the drawn parallelogram has area |A×B|, in the figure\'s own units (area / scale²)', () => {
    const arrows = objs.filter((o) => o.type === 'arrow' && o.from && o.to)
    const a = arrows.find((o) => o.to![2] !== 0 && o.from![2] === 0)!
    const b = arrows.find((o) => o !== a && JSON.stringify(o.from) === JSON.stringify(a.from) && o.to![2] === 0)!
    const A = sub(a.to!, a.from!), B = sub(b.to!, b.from!)
    const drawnArea = mag(crossV(A, B)) / (k * k)
    expect(drawnArea).toBeCloseTo(VECTOR_PRODUCTS_PARAMS.crossMagnitude, 1)
    expect(sceneTexts(spec)).toContain(`area = ${(Math.round(drawnArea * 100) / 100).toFixed(2)}`)
  })

  it('left panel: |B| × (drawn projection of A on B) is the printed dot product', () => {
    const proj = objs.find((o) => o.type === 'bond' && o.color === '#22c55e')!
    const projLen = mag(sub(proj.to!, proj.from!)) / k
    expect(VECTOR_PRODUCTS_PARAMS.bMag * projLen).toBeCloseTo(VECTOR_PRODUCTS_PARAMS.dotValue, 1)
    expect(sceneTexts(spec).some((t) => t.includes('= 6'))).toBe(true)
  })

  it('the dot product is a number and the cross product a vector, and the figure says each', () => {
    const t = sceneTexts(spec).join(' | ')
    expect(t).toMatch(/A · B = \|A\|\|B\| cos θ/)
    expect(t).toMatch(/a VECTOR/)
    expect(t).toMatch(/\|A×B\| = \|A\|\|B\| sin θ/)
  })
})

// ── phys.meas.units ──────────────────────────────────────────────────────────
// Reference, written independently of the generator: the SI's seven base quantities and units
// (SI brochure, 9th ed.), and the dimensions of the newton from F = m·a.
const SI_REFERENCE = new Map([['length', 'm'], ['mass', 'kg'], ['time', 's'], ['current', 'A'], ['temperature', 'K'], ['amount', 'mol'], ['luminous intensity', 'cd']])

/** "[L T⁻²]" → { L: 1, T: -2 }; superscripts are the figure's own notation. */
const SUP: Record<string, string> = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁻': '-' }
function dims(expr: string): Record<string, number> {
  const out: Record<string, number> = {}
  for (const m of expr.matchAll(/([LTM])([⁰¹²³⁻]*)/g)) {
    const e = m[2] ? Number([...m[2]].map((c) => SUP[c]).join('')) : 1
    out[m[1]] = (out[m[1]] ?? 0) + e
  }
  return out
}
const mul = (a: Record<string, number>, b: Record<string, number>) => {
  const out = { ...a }
  for (const [d, e] of Object.entries(b)) out[d] = (out[d] ?? 0) + e
  for (const d of Object.keys(out)) if (out[d] === 0) delete out[d]
  return out
}

describe('SI units figure: seven base units, and the newton built from them', () => {
  const t = sceneTexts(buildSiUnitsScene())

  it('draws exactly the seven SI base quantities with their SI units — no more, no fewer, none wrong', () => {
    const drawn = new Map(t.filter((x) => /^[a-z ]+: [A-Za-z]+$/.test(x)).map((x) => x.split(': ') as [string, string]))
    expect(drawn).toEqual(SI_REFERENCE)
  })

  it('1 N = 1 kg·m/s² is dimensionally F = m·a', () => {
    expect(t).toContain('1 N = 1 kg·m/s²')
    const newton = { M: 1, L: 1, T: -2 }
    expect(mul(dims('M'), dims('L T⁻²'))).toEqual(newton)
  })
})

// ── phys.meas.dimensions ─────────────────────────────────────────────────────
describe('dimensions figure: every bracket it prints is right, and its verdicts follow from them', () => {
  const t = sceneTexts(buildDimensionsScene())
  const bracket = (label: string) => dims(/\[[^\]]*\]$/.exec(label)?.[0] ?? '')

  it('v and u are speeds, [L T⁻¹]', () => {
    for (const q of ['v: [L T⁻¹]', 'u: [L T⁻¹]']) expect(t).toContain(q)
    expect(dims('L T⁻¹')).toEqual({ L: 1, T: -1 })
  })

  it('"at: [L T⁻²][T] = [L T⁻¹]" — the product really is the printed result, so v = u + at is consistent', () => {
    const line = t.find((x) => x.startsWith('at:'))!
    const [lhs, rhs] = line.slice(3).split('=')
    const factors = [...lhs.matchAll(/\[[^\]]*\]/g)].map((m) => dims(m[0]))
    expect(factors.reduce(mul, {})).toEqual(bracket(rhs.trim()))
    expect(bracket(rhs.trim())).toEqual(dims('L T⁻¹'))
  })

  it('"at²" is [L T⁻²][T²] = [L], which differs from a speed, so v = u + at² is inconsistent', () => {
    const line = t.find((x) => x.startsWith('at²:'))!
    const [lhs, rhs] = line.slice(4).split('≠')
    expect(bracket(lhs.trim())).toEqual(mul(dims('L T⁻²'), dims('T²')))
    expect(bracket(lhs.trim())).toEqual({ L: 1 })
    expect(bracket(lhs.trim())).not.toEqual(bracket(rhs.trim()))
    expect(t).toContain('consistent')
    expect(t).toContain('inconsistent')
  })
})

// ── phys.particle.conservation-laws ──────────────────────────────────────────
// Particle table written here, independent of the generator's own BL table (B, L, charge Q).
const PARTICLES: Record<string, { B: number; L: number; Q: number }> = {
  n: { B: 1, L: 0, Q: 0 }, p: { B: 1, L: 0, Q: 1 }, 'e⁻': { B: 0, L: 1, Q: -1 },
  'e⁺': { B: 0, L: -1, Q: 1 }, 'ν̄ₑ': { B: 0, L: -1, Q: 0 }, γ: { B: 0, L: 0, Q: 0 },
}
const side = (s: string) => s.split('+').map((x) => x.trim())
const total = (names: string[], q: 'B' | 'L' | 'Q') => names.reduce((a, n) => a + PARTICLES[n][q], 0)

describe('conservation-laws figure: the printed tallies and verdicts are the ones the particles give', () => {
  const t = sceneTexts(buildParticleConservationScene())
  const reactions = t.filter((x) => x.includes('→'))

  it('draws the two reactions the lesson names: neutron decay and p → e⁺ + γ', () => {
    expect(reactions).toEqual(['n → p + e⁻ + ν̄ₑ', 'p → e⁺ + γ'])
  })

  it.each([0, 1])('reaction %i: each printed number equals the recomputed total, and ✓ / ✗ matches equality', (i) => {
    const [l, r] = reactions[i].split('→').map(side)
    const line = t.find((x) => /^B:/.test(x) && x.includes(i === 0 ? '✓' : '✗'))!
    const m = /B: (-?\d+) (=|≠) (-?\d+) (✓|✗)\s+L: (-?\d+) (=|≠) (-?\d+) (✓|✗)/.exec(line)!
    expect(m, line).not.toBeNull()
    expect([Number(m[1]), Number(m[3])]).toEqual([total(l, 'B'), total(r, 'B')])
    expect([Number(m[5]), Number(m[7])]).toEqual([total(l, 'L'), total(r, 'L')])
    for (const [rel, mark, a, b] of [[m[2], m[4], m[1], m[3]], [m[6], m[8], m[5], m[7]]]) {
      expect(rel === '=').toBe(a === b)
      expect(mark === '✓').toBe(a === b)
    }
  })

  it('neutron decay is allowed (B, L and charge all balance); proton decay breaks B and L but not charge', () => {
    const [nl, nr] = ['n', 'p + e⁻ + ν̄ₑ'].map(side)
    for (const q of ['B', 'L', 'Q'] as const) expect(total(nl, q)).toBe(total(nr, q))
    const [pl, pr] = ['p', 'e⁺ + γ'].map(side)
    expect(total(pl, 'B')).not.toBe(total(pr, 'B'))
    expect(total(pl, 'L')).not.toBe(total(pr, 'L'))
    expect(total(pl, 'Q')).toBe(total(pr, 'Q'))   // the forbidden reaction is not forbidden by charge
    expect(t).toContain('allowed')
    expect(t).toContain('forbidden')
  })
})

// ── phys.astro.gravitational-waves ───────────────────────────────────────────
// EB (educational-brain/concepts/physics/…gravitational-waves.md): ripples of spacetime
// curvature that need no medium; amplitude falls as 1/r (not 1/r²); detected as a strain
// h = ΔL/L ~ 10⁻²¹. The scene is an ordered pathway, not a picture of a medium.
describe('gravitational-waves figure: the stages are in physical order and none claims a medium', () => {
  // Served through the production resolver, so this is the scene a learner is shown.
  const served = resolveVisual({ message: 'show me a diagram', lessonConceptId: 'phys.astro.gravitational-waves', learnerRequest: 'diagram', subject: 'physics' } as never)
  if (served.payload?.renderer !== 'scene') throw new Error('expected a scene for gravitational waves')
  const spec = served.payload.sceneSpec
  const nodes = sceneObjects(spec).filter((o) => o.type === 'node')
  const narration = spec.steps.map((x) => x.narration).join(' ')

  it('goes source → spacetime ripples → amplitude falling with distance → interferometer, left to right', () => {
    expect(nodes.map((n) => n.text)).toEqual(['Accelerating masses', 'Ripples in spacetime', 'Amplitude falls as 1/r', 'Interferometer measures strain'])
    const xs = nodes.map((n) => n.position![0])
    expect([...xs].sort((a, b) => a - b)).toEqual(xs)
  })

  it('says the wave needs no medium, and never describes spacetime waves as waves IN a medium', () => {
    expect(narration).toMatch(/no medium/i)
    expect(narration).not.toMatch(/\b(ether|aether|through the medium|medium vibrat)/i)
  })

  it('amplitude falls as 1/r like radiation, not 1/r² like a static field', () => {
    expect(narration).toMatch(/1\/r,? like radiation/)
    expect(narration).toMatch(/not 1\/r²/)
  })

  it('the detector measures strain h = ΔL/L (a ratio), of order 10⁻²¹', () => {
    expect(narration).toContain('h = ΔL/L')
    expect(narration).toContain('10⁻²¹')
  })
})

// ── phys.opt.lens-power ──────────────────────────────────────────────────────
// KG / EB / blueprint: P = 1/f with f in METRES (dioptres, sign + for converging, − for diverging);
// thin lenses in contact: P_total = P₁ + P₂ (and NOT f_total = f₁ + f₂). The EB's worked numbers are
// f = 0.5 m → +2 D, and +5 D with −2 D → +3 D. Every power the figure prints is re-derived here from the
// SLOPE of the rays it draws: a parallel ray at height h leaves a thin lens of power P with slope −h·P/scale.
describe('lens power figure: the printed powers are the ones its drawn rays have, and they add', () => {
  const { scale, x0, ySingle, yPair, rayHeight: h, pSingle, pFirst, pSecond, pTotal } = LENS_POWER_PARAMS
  const served = () => {
    const d = resolveVisual({ message: 'show me a diagram', lessonConceptId: 'phys.opt.lens-power', learnerRequest: 'diagram', subject: 'physics' } as never)
    if (d.payload?.renderer !== 'scene') throw new Error('expected a scene for lens power')
    return { d, spec: d.payload.sceneSpec as SceneSpec }
  }
  const objById = (id: string) => sceneObjects(served().spec).find((o) => o.id === id) as (SceneObj & { from?: number[]; to?: number[] }) | undefined
  /** The power a drawn outgoing ray has: slope = −h·P/scale, with h its height above its axis at the lens. */
  const powerOf = (id: string, yAxis: number) => {
    const r = objById(id)!
    const height = r.from![1] - yAxis
    const slope = (r.to![1] - r.from![1]) / (r.to![0] - r.from![0])
    return (-slope * scale) / height
  }
  const text = () => sceneTexts(served().spec)
  const numberIn = (t: string) => Number(/([+−-]?\d+(?:\.\d+)?)\s*D/.exec(t.replace('−', '-'))?.[1])

  it('is served as an authored figure of THIS concept — not the single-lens sliders of phys.opt.lenses', () => {
    const { d, spec } = served()
    expect(d.asset?.scope).toBe('concept')
    expect(spec.id).toBe('phys-lens-power')
    expect(spec.parametric).toBeUndefined()
  })

  it('one lens: the drawn rays have power 1/f — the focus is where the printed f says, and the printed P is 1/f', () => {
    for (const id of ['ray-single-out-upper', 'ray-single-out-lower']) expect(powerOf(id, ySingle)).toBeCloseTo(pSingle, 6)
    const focus = objById('focus-single')!.position as number[]
    const fMetres = (focus[0] - x0) / scale
    expect(fMetres).toBeCloseTo(0.5, 6)
    expect(1 / fMetres).toBeCloseTo(pSingle, 6)
    // each outgoing ray really passes through that focus
    for (const id of ['ray-single-out-upper', 'ray-single-out-lower']) {
      const r = objById(id)!
      const t = (focus[0] - r.from![0]) / (r.to![0] - r.from![0])
      expect(r.from![1] + t * (r.to![1] - r.from![1])).toBeCloseTo(ySingle, 6)
    }
    expect(text()).toContain('f = 0.50 m')
    expect(text()).toContain('P = 1/f = +2 D')
  })

  it('the rays arrive parallel to the axis and are bent AT the lens plane', () => {
    for (const [id, yAxis, side] of [['ray-single-in-upper', ySingle, 1], ['ray-single-in-lower', ySingle, -1], ['ray-pair-in-upper', yPair, 1], ['ray-pair-in-lower', yPair, -1]] as const) {
      const r = objById(id)!
      expect(r.from![1]).toBeCloseTo(r.to![1], 9)                 // parallel to the axis
      expect(r.to![0]).toBeCloseTo(x0, 9)                         // ends at the lens plane
      expect(r.to![1] - yAxis).toBeCloseTo(side * h, 9)           // at the stated height
    }
    for (const id of ['ray-single-out-upper', 'ray-pair-out-upper', 'ray-first-alone']) expect(objById(id)!.from![0]).toBeCloseTo(x0, 9)
  })

  it('two lenses in contact: the +5 D lens alone has power 5, the pair has power 3, and the difference is the −2 D lens', () => {
    const alone = powerOf('ray-first-alone', yPair)
    const together = powerOf('ray-pair-out-upper', yPair)
    expect(alone).toBeCloseTo(pFirst, 6)
    expect(together).toBeCloseTo(pTotal, 6)
    expect(powerOf('ray-pair-out-lower', yPair)).toBeCloseTo(pTotal, 6)
    // what the second lens ADDS to the bend is its own power, with the sign the figure prints
    expect(together - alone).toBeCloseTo(pSecond, 6)
    // and the first lens's own focus is where +5 D puts it
    expect(((objById('focus-first')!.position as number[])[0] - x0) / scale).toBeCloseTo(1 / pFirst, 6)
    expect(((objById('focus-pair')!.position as number[])[0] - x0) / scale).toBeCloseTo(1 / pTotal, 6)
  })

  it('every number printed beside a lens is its power with the right sign, and the printed sum is the sum', () => {
    const t = text()
    expect(t).toContain('+5 D')
    expect(t).toContain('−2 D')
    expect(numberIn('+5 D') + numberIn('−2 D')).toBe(numberIn(t.find((x) => x.startsWith('P₁ + P₂'))!))
    expect(pFirst + pSecond).toBe(pTotal)
    expect(t).toContain('f = 0.33 m')
    // converging lenses are positive, diverging negative — and the symbols agree
    const widest = (id: string) => { const pts = objById(id)!.points as number[][]; const cx = pts.reduce((a, p) => a + p[0], 0) / pts.length; return { centre: Math.abs(pts.find((p) => Math.abs(p[1] - (pts[0][1] + pts[Math.floor(pts.length / 4)][1]) / 2) < 0.2)![0] - cx), ends: Math.abs(pts[0][0] - cx) } }
    expect(widest('lens-first').centre).toBeGreaterThan(widest('lens-first').ends)     // biconvex: widest in the middle
    expect(widest('lens-second').centre).toBeLessThan(widest('lens-second').ends)      // biconcave: pinched in the middle
  })

  it('powers add and focal lengths do not: the figure\'s own numbers rule out the misconception', () => {
    const f1 = 1 / pFirst, f2 = 1 / pSecond, fTotal = 1 / pTotal
    expect(f1 + f2).not.toBeCloseTo(fTotal, 3)                   // 0.20 + (−0.50) = −0.30, not 0.33
    expect(1 / f1 + 1 / f2).toBeCloseTo(1 / fTotal, 9)           // 1/f = 1/f₁ + 1/f₂
    const { spec } = served()
    const narration = spec.steps.map((s) => s.narration).join(' ')
    expect(narration).toMatch(/Powers add, focal lengths do not/)
    expect(narration).toMatch(/Thin lenses in contact only/)     // the stated limit (EB: Why Students Fail #3)
    expect(narration).toMatch(/METRES/)                           // the unit trap (EB: Why Students Fail #1)
  })

  it('the explanation panel\'s lines repeat the same arithmetic, and the legend names what the colours mean', () => {
    const { spec } = served()
    const lines = spec.explainer!.panels!.flatMap((p) => p.lines ?? [])
    expect(lines).toContain('f = 0.50 m → P = +2 D')
    expect(lines.some((l) => l.includes('+5 + (−2) = +3 D → f = 0.33 m'))).toBe(true)
    expect(spec.explainer!.legend!.map((l) => l.label)).toEqual(['Parallel ray in', 'Ray out', 'First lens alone', 'Focus'])
  })

  it('stays inside the authoring bounds, the label budget and every narration limit; labels keep their place at every width', () => {
    const { spec } = served()
    for (const o of sceneObjects(spec)) for (const p of [o.position, o.from, o.to, ...(o.points ?? [])].filter(Boolean) as number[][]) for (const c of p) expect(Math.abs(c)).toBeLessThanOrEqual(5)
    const labels = sceneObjects(spec).filter((o) => o.type === 'label')
    expect(labels.length).toBeLessThanOrEqual(complexityFor('intermediate').maxLabels)
    for (const st of spec.steps) expect((st.narration ?? '').length).toBeLessThan(220)
    expect(JSON.stringify(buildLensPowerSceneAgain())).toBe(JSON.stringify(spec))   // deterministic: a rehydrated session matches
    for (const [w, hh, bw] of [[282, 260, 390], [566, 272, 1280], [566, 380, 1280]] as Array<[number, number, number]>) {
      const cum: SceneSpec['steps'][number]['objects'] = []
      for (const step of spec.steps) {
        cum.push(...step.objects)
        const placed = placeSceneLabels({ ...spec, steps: [{ objects: [...cum] }] }, viewportFromCanvas(w, hh, bw))
        expect(placed.unresolved).toBe(0)
        for (const l of placed.labels) expect(l.movedPx, `${w}x${hh}: "${l.text}" moved ${l.movedPx}px`).toBeLessThanOrEqual(30)
      }
    }
  })
})
