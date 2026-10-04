/**
 * Physics coverage-driven KG extension, batch 9 (advanced tier, 2026-10-04):
 * figures for the Earth–Moon–Sun system, stellar properties (HR diagram), the
 * distance ladder, and the Hall effect. Same rules as physicsCoreScenes.ts:
 * every number drawn is computed here and pinned by
 * src/tests/physicsExtensionBatch9.test.ts.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, dot, label, line } from './visualDesign'
import { P, circlePoints, rad, rect, type V3 } from './physicsCoreScenes'

// ── 1. Earth–Moon–Sun ────────────────────────────────────────────────────────

export const SKY = { lat: 28.6, tilt: 23.4, Msun: 1.989e30, Mmoon: 7.35e22, dSun: 1.496e11, dMoon: 3.844e8 }
export function noonHeight(lat: number, decl: number): number { return 90 - lat + decl }
/** Ground area lit by a beam of fixed cross-section ∝ 1/sin(height). */
export function spreadRatio(hHigh: number, hLow: number): number { return Math.sin(rad(hHigh)) / Math.sin(rad(hLow)) }
export function pullRatioSunMoon(s = SKY): number { return (s.Msun / s.Mmoon) * (s.dMoon / s.dSun) ** 2 }
export function tidalRatioMoonSun(s = SKY): number { return (s.Mmoon / s.Msun) * (s.dSun / s.dMoon) ** 3 }
export function buildEarthMoonSunScene(): SceneSpec {
  const hJ = noonHeight(SKY.lat, SKY.tilt), hD = noonHeight(SKY.lat, -SKY.tilt), W = 0.8, GY = 0.9, L = 2.6
  const beam = (x0: number, h: number, role: string): SceneObject[] => {
    const foot = W / Math.sin(rad(h)), dx = -L * Math.cos(rad(h)), dy = L * Math.sin(rad(h))
    return [line(P(x0, GY), P(x0 + foot, GY), role, 0.08), arrow(P(x0 + dx, GY + dy), P(x0, GY), role), arrow(P(x0 + foot + dx, GY + dy), P(x0 + foot, GY), role)]
  }
  const EX = 0, EY = -2.5, R = 1.4, mr = 0.28
  const moon = (ang: number, name: string): SceneObject[] => {
    const cx = EX + R * Math.cos(rad(ang)), cy = EY + R * Math.sin(rad(ang))
    return [curve(circlePoints(cx, cy, mr, 0, 2 * Math.PI, 24), ROLE.reference), curve(circlePoints(cx, cy, mr, rad(90), rad(270), 16), ROLE.input), label(name, P(cx + (ang === 180 ? -0.9 : ang === 0 ? 0.9 : 1.1), cy), ROLE.ink, 'detail')]
  }
  const tr = tidalRatioMoonSun()
  return {
    id: 'phys-earth-moon-sun',
    title: 'Seasons from tilt, phases from the lit half',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show that the seasons come from the tilt: at ${SKY.lat}°N the noon Sun is ${hJ.toFixed(1)}° high in June and ${hD.toFixed(1)}° in December, so the same beam spreads over ${spreadRatio(hJ, hD).toFixed(1)}× more ground in winter. Show the Moon's phases as our view of its permanently sunlit half, and note that the Moon's tidal effect is ${tr.toFixed(1)}× the Sun's.`,
    ariaLabel: `Top: two equal sunbeams striking flat ground, one steeply at ${hJ.toFixed(1)} degrees covering a short strip, one slanting at ${hD.toFixed(1)} degrees covering a longer strip. Bottom: Earth with the Moon drawn at four points of its orbit, sunlight coming from the left; each Moon is lit on its left half, and the labels give new, first quarter, full and last quarter.`,
    steps: [
      { narration: `June at ${SKY.lat}°N: the noon Sun is ${hJ.toFixed(1)}° high. December: ${hD.toFixed(1)}°. The same beam spreads over ${spreadRatio(hJ, hD).toFixed(1)} times more ground in December — weaker heating. The tilt, not the distance, makes the seasons.`, objects: [...beam(-2.8, hJ, ROLE.input), label(`June ${hJ.toFixed(1)}°`, P(-2.6, GY - 0.45), ROLE.input, 'detail'), ...beam(1.8, hD, ROLE.output), label(`December ${hD.toFixed(1)}°`, P(2.4, GY - 0.45), ROLE.output, 'detail'), line(P(-4.6, GY), P(4.6, GY), ROLE.reference, 0.03)] },
      { narration: 'Sunlight comes from the left, so every Moon is lit on its left half. What changes is how much of that lit half faces Earth: none at new moon, half at the quarters, all at full moon. Earth\'s shadow plays no part.', objects: [dot(P(EX, EY), ROLE.output, 0.3), label('Earth', P(EX, EY - 0.55), ROLE.output, 'detail'), arrow(P(-4.6, -1.0), P(-3.4, -1.0), ROLE.input), label('sunlight', P(-4.0, -0.6), ROLE.input, 'detail'), ...moon(180, 'new'), ...moon(270, 'first quarter'), ...moon(0, 'full'), ...moon(90, 'last quarter')] },
      { narration: `Tides come from the difference in pull across Earth, which falls off as 1/d³: though the Sun pulls Earth ${Math.round(pullRatioSunMoon())} times harder, the Moon's tidal effect is ${tr.toFixed(1)} times the Sun's.`, objects: [label(`tidal effect: Moon ${tr.toFixed(1)}× Sun`, P(2.8, -4.4), ROLE.result, 'primary')] },
    ],
  }
}

// ── 2. Stellar properties: the HR diagram ────────────────────────────────────

export const SUN = { R: 6.957e8, T: 5772 }
export const SIGMA = 5.670e-8
export function luminosityW(R: number, T: number): number { return 4 * Math.PI * R * R * SIGMA * T ** 4 }
export function radiusInSuns(LinSuns: number, T: number): number { return Math.sqrt(LinSuns) * (SUN.T / T) ** 2 }
export function wienPeakNm(T: number): number { return 2.898e-3 / T * 1e9 }
export const HR_STARS: Array<{ name: string; T: number; L: number }> = [
  { name: 'Sun', T: 5772, L: 1 }, { name: 'Betelgeuse', T: 3500, L: 1e5 }, { name: 'Rigel', T: 12000, L: 1.2e5 }, { name: 'Sirius B', T: 25000, L: 0.056 },
]
export function buildHrDiagramScene(): SceneSpec {
  const X = (T: number) => 4.2 - ((Math.log10(T) - 3.4) / 1.1) * 8.4
  const Y = (L: number) => -3.8 + (Math.log10(L) + 4) * 0.8
  const ms: Array<[number, number]> = [[3000, 0.001], [4000, 0.1], [5772, 1], [10000, 40], [20000, 2000], [30000, 1e5]]
  const msCurve: V3[] = Array.from({ length: 41 }, (_, i) => {
    const lt = Math.log10(3000) + (i / 40) * (Math.log10(30000) - Math.log10(3000))
    let k = 0; while (k < ms.length - 2 && Math.log10(ms[k + 1][0]) < lt) k++
    const [t0, l0] = ms[k], [t1, l1] = ms[k + 1], f = (lt - Math.log10(t0)) / (Math.log10(t1) - Math.log10(t0))
    return P(X(10 ** lt), Y(10 ** (Math.log10(l0) + f * (Math.log10(l1) - Math.log10(l0)))))
  })
  const star = (s: { name: string; T: number; L: number }, role: string): SceneObject[] => [dot(P(X(s.T), Y(s.L)), role, 0.13), label(`${s.name}: ${radiusInSuns(s.L, s.T) >= 10 ? Math.round(radiusInSuns(s.L, s.T)) : radiusInSuns(s.L, s.T).toFixed(radiusInSuns(s.L, s.T) < 0.1 ? 3 : 1)} R☉`, P(X(s.T) + (s.T < 5000 ? -0.6 : 0.6), Y(s.L) + 0.4), role, 'detail')]
  const [sun, bet, rig, wd] = HR_STARS
  return {
    id: 'phys-hr-diagram',
    title: 'The HR diagram: temperature runs right to left',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show the Hertzsprung–Russell diagram: luminosity up, temperature increasing to the LEFT. The main sequence runs diagonally; Betelgeuse (${bet.T} K, ${bet.L.toExponential(0)} L☉) is cool but luminous, so its radius is about ${Math.round(radiusInSuns(bet.L, bet.T))} R☉; Sirius B (${wd.T} K, ${wd.L} L☉) is hot but faint, about ${radiusInSuns(wd.L, wd.T).toFixed(3)} R☉ — from L = 4πR²σT⁴.`,
    ariaLabel: 'A graph with luminosity increasing upward and temperature increasing to the left. A diagonal band, the main sequence, runs from top left to bottom right with the Sun in the middle. Betelgeuse sits at the top right, Rigel at the top left, and the white dwarf Sirius B at the bottom left.',
    steps: [
      { narration: 'Luminosity (in Suns) goes up; surface temperature increases to the LEFT. Most stars lie on the diagonal main sequence; the Sun sits in the middle.', objects: [arrow(P(4.4, -4.2), P(-4.4, -4.2), ROLE.reference), arrow(P(4.4, -4.2), P(4.4, 4.4), ROLE.reference), label('hotter ←  temperature', P(-1.0, -4.6), ROLE.ink, 'detail'), label('luminosity', P(3.6, 4.6), ROLE.ink, 'detail'), curve(msCurve, ROLE.output), ...star(sun, ROLE.input)] },
      { narration: `Top right: Betelgeuse is cool (${bet.T} K, red) yet ${bet.L.toExponential(0)} times as luminous as the Sun, so L = 4πR²σT⁴ makes it huge — about ${Math.round(radiusInSuns(bet.L, bet.T))} R☉. Top left: Rigel, hot and blue-white.`, objects: [...star(bet, ROLE.input), ...star(rig, ROLE.aid), label('giants', P(X(bet.T), Y(bet.L) - 0.6), ROLE.input, 'detail')] },
      { narration: `Bottom left: Sirius B is hotter than the Sun (${wd.T} K) yet only ${wd.L} L☉, so it must be tiny — about ${radiusInSuns(wd.L, wd.T).toFixed(3)} R☉, roughly Earth-sized. A white dwarf.`, objects: [...star(wd, ROLE.result), label('white dwarfs', P(X(wd.T) + 0.4, Y(wd.L) - 0.5), ROLE.result, 'detail')] },
    ],
  }
}

// ── 3. Distance ladder ───────────────────────────────────────────────────────

export const H0 = 70 // km/s per Mpc
export const C_KMS = 3.0e5
export function parallaxDistancePc(pArcsec: number): number { return 1 / pArcsec }
export function redshift(observedNm: number, restNm: number): number { return (observedNm - restNm) / restNm }
export function hubbleDistanceMpc(vKms: number, h0 = H0): number { return vKms / h0 }
export function distanceModulusPc(m: number, M: number): number { return 10 ** ((m - M + 5) / 5) }
export function buildDistanceLadderScene(): SceneSpec {
  const SY = -3.4, EX = 1.3, star = P(-2.4, 2.4), sx = -2.4
  const z = redshift(669.4, 656.3), v = z * C_KMS, d = hubbleDistanceMpc(v)
  const GX0 = 0.8, GY0 = -3.4, KX = 3.4 / 120, KY = 6.4 / 8400
  const gal = (dm: number) => P(GX0 + dm * KX, GY0 + H0 * dm * KY)
  return {
    id: 'phys-distance-ladder',
    title: 'Parallax for near stars, Hubble\'s law for far galaxies',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show the bottom and top of the distance ladder: parallax, d = 1/p (Proxima Centauri, p = 0.768″, is ${parallaxDistancePc(0.768).toFixed(2)} pc away; a smaller angle means a farther star), and Hubble's law v = H₀d: a redshift z = ${z.toFixed(3)} gives v ≈ ${Math.round(v / 100) * 100} km/s and d ≈ ${Math.round(d)} Mpc for H₀ = ${H0} km/s/Mpc.`,
    ariaLabel: 'Left: the Sun with Earth at two opposite points of its orbit and lines from each Earth to a nearby star, making a small angle at the star. Right: a straight line through the origin of a graph of recession speed against distance, with one galaxy marked.',
    steps: [
      { narration: 'Earth at opposite sides of its orbit sees a nearby star from two directions. Half the angle between them is the parallax p; the distance in parsecs is 1/p.', objects: [dot(P(sx, SY), ROLE.input, 0.22), label('Sun', P(sx, SY - 0.5), ROLE.input, 'detail'), dot(P(sx - EX, SY), ROLE.output, 0.12), dot(P(sx + EX, SY), ROLE.output, 0.12), label('Earth (Jan)', P(sx - EX - 0.5, SY + 0.45), ROLE.output, 'detail'), label('Earth (Jul)', P(sx + EX + 0.5, SY + 0.45), ROLE.output, 'detail'), line(P(sx - EX, SY), star, ROLE.aid, 0.02), line(P(sx + EX, SY), star, ROLE.aid, 0.02), dot(star, ROLE.result, 0.14), label('p', P(sx, 1.6), ROLE.aid, 'detail'), label(`Proxima: p = 0.768″ → ${parallaxDistancePc(0.768).toFixed(2)} pc`, P(sx, 3.4), ROLE.result, 'detail')] },
      { narration: 'Smaller angle, farther star — beyond a few thousand parsecs the angle is too small to measure. Standard candles of known luminosity then take over, calibrated by parallax.', objects: [label('d (pc) = 1 / p (″)', P(sx, 4.3), ROLE.result, 'primary')] },
      { narration: `For distant galaxies: v = H₀d. A hydrogen line shifted from 656.3 to 669.4 nm gives z = ${z.toFixed(3)}, v ≈ ${Math.round(v / 100) * 100} km/s, d ≈ ${Math.round(d)} Mpc. Every galaxy sees the same law — there is no centre.`, objects: [arrow(P(GX0, GY0), P(4.6, GY0), ROLE.reference), arrow(P(GX0, GY0), P(GX0, 3.6), ROLE.reference), label('distance (Mpc)', P(3.4, GY0 - 0.45), ROLE.ink, 'detail'), label('v (km/s)', P(GX0 + 0.6, 3.9), ROLE.ink, 'detail'), line(gal(0), gal(120), ROLE.output, 0.04), dot(gal(d), ROLE.input, 0.13), label(`${Math.round(d)} Mpc, ${Math.round(v / 100) * 100} km/s`, P(gal(d)[0] + 0.3, gal(d)[1] + 0.5), ROLE.input, 'detail'), label(`v = H₀ d, H₀ = ${H0} km/s/Mpc`, P(2.7, -4.3), ROLE.result, 'detail')] },
    ],
  }
}

// ── 4. Hall effect ───────────────────────────────────────────────────────────

export const HALL = { e: 1.6e-19 }
export function hallVoltage(I: number, B: number, n: number, t: number, q = HALL.e): number { return (I * B) / (n * q * t) }
export function buildHallScene(): SceneSpec {
  const X0 = -3.6, X1 = 3.6, Y0 = -1.4, Y1 = 1.4
  const vCu = hallVoltage(5, 1, 8.5e28, 1e-4), vSemi = hallVoltage(0.01, 0.5, 1e22, 1e-4)
  const crosses: SceneObject[] = [-2.4, 0, 2.4].flatMap((x) => [-0.7, 0.7].map((y) => label('×', P(x, y), ROLE.aid, 'detail')))
  return {
    id: 'phys-hall-effect',
    title: 'The Hall effect: carriers pushed sideways until E balances qvB',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show the Hall effect: current along a strip with B into the page; the magnetic force pushes the carriers to one edge until the transverse field balances it, giving V_H = IB/(nqt). Copper (5 A, 1 T, 0.1 mm) gives ${(vCu * 1e6).toFixed(1)} μV; a semiconductor (10 mA, 0.5 T, 0.1 mm) gives ${(vSemi * 1000).toFixed(0)} mV — fewer carriers, bigger voltage.`,
    ariaLabel: 'A flat rectangular strip with a current arrow pointing right along it and crosses showing a magnetic field into the page. Minus signs are crowded along the top edge and plus signs along the bottom edge, with an electric field arrow across the strip and a voltmeter label for the Hall voltage.',
    steps: [
      { narration: 'Current flows along the strip; the magnetic field points into the page (×). Electrons drift opposite to the current.', objects: [...rect(X0, Y0, X1, Y1, ROLE.reference), ...crosses, arrow(P(-4.6, 0), P(-3.7, 0), ROLE.input), label('I', P(-4.2, 0.4), ROLE.input, 'detail'), label('B into page', P(0, 2.0), ROLE.aid, 'detail')] },
      { narration: 'The magnetic force pushes the electrons towards the top edge. Charge piles up: negative on top, positive left behind on the bottom. That makes an electric field across the strip.', objects: [...[-3, -1.8, -0.6, 0.6, 1.8, 3].map((x) => label('−', P(x, Y1 - 0.25), ROLE.output, 'detail')), ...[-3, -1.8, -0.6, 0.6, 1.8, 3].map((x) => label('+', P(x, Y0 + 0.25), ROLE.input, 'detail')), arrow(P(3.95, Y0 + 0.2), P(3.95, Y1 - 0.2), ROLE.result), label('E', P(4.35, 0), ROLE.result, 'detail')] },
      { narration: `The pile-up stops when qE = qv_dB. The Hall voltage across the strip is V_H = IB/(nqt): about ${(vCu * 1e6).toFixed(1)} μV in copper, ${(vSemi * 1000).toFixed(0)} mV in a semiconductor. Holes would charge the top edge positive — the sign reveals the carriers.`, objects: [label('V_H = I B / (n q t)', P(0, -2.6), ROLE.result, 'primary'), label(`copper ${(vCu * 1e6).toFixed(1)} μV · semiconductor ${(vSemi * 1000).toFixed(0)} mV`, P(0, -3.5), ROLE.result, 'detail')] },
    ],
  }
}
