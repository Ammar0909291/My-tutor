/**
 * Physics coverage-driven KG extension, batch 13 (advanced tier, 2026-10-04):
 * a figure for special-purpose diodes. Same rules as physicsCoreScenes.ts: every
 * number drawn is computed here and pinned by
 * src/tests/physicsExtensionBatch13.test.ts.
 */

import type { SceneSpec, SceneObject } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, curve, label, line } from './visualDesign'
import { P, rect, type V3 } from './physicsCoreScenes'

// ── Special-purpose diodes ───────────────────────────────────────────────────

/** Currents (A) in a Zener regulator: series resistor, load, Zener. Zener off below V_Z. */
export function zenerCurrents(Vs: number, Vz: number, R: number, RL: number): { IR: number; IL: number; IZ: number } {
  if (Vs * RL / (R + RL) < Vz) { const I = Vs / (R + RL); return { IR: I, IL: I, IZ: 0 } }
  const IR = (Vs - Vz) / R, IL = Vz / RL
  return { IR, IL, IZ: IR - IL }
}
/** Photon wavelength (nm) for a band gap in eV: λ = hc/E. */
export function gapWavelengthNm(EgEv: number): number { return 1239.84 / EgEv }
export function seriesResistor(Vs: number, Vf: number, I: number): number { return (Vs - Vf) / I }
export const REG = { Vs: 12, Vz: 6.2, R: 100, RL: 620 }
export const LED_GAPS: [number, string][] = [[1.9, 'red'], [2.3, 'green'], [2.7, 'blue']]
export const SI_GAP = 1.12

export function buildSpecialDiodesScene(): SceneSpec {
  const { IR, IL, IZ } = zenerCurrents(REG.Vs, REG.Vz, REG.R, REG.RL)
  const hi = zenerCurrents(14, REG.Vz, REG.R, REG.RL)
  // I–V curve: origin (OX, OY); 0.42 per volt, 1.6 per unit current (arbitrary)
  const OX = -1.4, OY = 2.6, SX = 0.42
  const iv: V3[] = []
  for (let k = 0; k <= 120; k++) {
    const V = -6.8 + (7.8 * k) / 120
    const I = V >= 0.6 ? Math.min(1.6, (V - 0.6) * 6) : V <= -REG.Vz ? -Math.min(1.6, (-REG.Vz - V) * 6) : 0
    iv.push(P(OX + V * SX, OY + I))
  }
  const roles = [ROLE.input, ROLE.result, ROLE.output]
  const leds: SceneObject[] = LED_GAPS.flatMap(([eg, name], i) => {
    const x = -3.8 + i * 1.5, top = -4.2 + eg * 1.1
    return [...rect(x - 0.35, -4.2, x + 0.35, top, roles[i]), label(`${eg} eV`, P(x, top + 0.35), roles[i], 'detail'), label(`${gapWavelengthNm(eg).toFixed(0)} nm ${name}`, P(x, -4.6), roles[i], 'detail')]
  })
  return {
    id: 'phys-special-diodes',
    title: 'One junction, four jobs: Zener, LED, photodiode, solar cell',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: `Show the diode I–V curve with its sharp reverse breakdown at V_Z = ${REG.Vz} V, and a Zener regulator (${REG.Vs} V, ${REG.R} Ω, ${REG.RL} Ω load) carrying ${(IR * 1000).toFixed(0)} mA in the resistor, ${(IL * 1000).toFixed(0)} mA in the load and ${(IZ * 1000).toFixed(0)} mA in the Zener (${(hi.IZ * 1000).toFixed(0)} mA at 14 V, load still ${REG.Vz} V); LED colour from the band gap, λ ≈ 1240/E_g (1.9 eV → ${gapWavelengthNm(1.9).toFixed(0)} nm, 2.7 eV → ${gapWavelengthNm(2.7).toFixed(0)} nm); a silicon photodiode cutoff of ${gapWavelengthNm(SI_GAP).toFixed(0)} nm and an unbiased solar cell.`,
    ariaLabel: `Top: a current–voltage graph that is flat near zero, rises steeply just above 0.6 volts forward, and drops steeply at minus ${REG.Vz} volts in reverse. Bottom left: three bars of increasing height for band gaps 1.9, 2.3 and 2.7 electronvolts, labelled red, green and blue with their wavelengths. Bottom right: notes on the photodiode and the solar cell.`,
    steps: [
      { narration: `The diode I–V curve: forward current rises above about 0.6 V; in reverse it blocks — until a Zener breaks down sharply at V_Z = ${REG.Vz} V. Breakdown does no harm if the current is limited.`, objects: [arrow(P(-4.6, OY), P(1.0, OY), ROLE.reference), arrow(P(OX, 0.8), P(OX, 4.6), ROLE.reference), label('V', P(1.2, OY - 0.3), ROLE.ink, 'detail'), label('I', P(OX + 0.3, 4.6), ROLE.ink, 'detail'), curve(iv, ROLE.output), label(`V_Z = −${REG.Vz} V`, P(OX - REG.Vz * SX, OY + 0.5), ROLE.output, 'detail'), label('forward', P(OX + 0.9, 4.4), ROLE.output, 'detail')] },
      { narration: `Zener regulator: ${REG.Vs} V supply, ${REG.R} Ω resistor, ${REG.RL} Ω load. The resistor drops ${(REG.Vs - REG.Vz).toFixed(1)} V, so ${(IR * 1000).toFixed(0)} mA; the load takes ${(IL * 1000).toFixed(0)} mA and the Zener ${(IZ * 1000).toFixed(0)} mA. At 14 V the Zener takes ${(hi.IZ * 1000).toFixed(0)} mA and the load stays at ${REG.Vz} V.`, objects: [label(`resistor ${(IR * 1000).toFixed(0)} mA`, P(3.2, 4.2), ROLE.ink, 'detail'), label(`load ${(IL * 1000).toFixed(0)} mA at ${REG.Vz} V`, P(3.2, 3.4), ROLE.aid, 'detail'), label(`Zener ${(IZ * 1000).toFixed(0)} mA`, P(3.2, 2.6), ROLE.result, 'primary'), label(`14 V supply: Zener ${(hi.IZ * 1000).toFixed(0)} mA`, P(3.2, 1.8), ROLE.result, 'detail')] },
      { narration: `LED: forward-biased, electrons fall across the band gap and give photons of energy ≈ E_g. λ ≈ 1240/E_g: 1.9 eV → ${gapWavelengthNm(1.9).toFixed(0)} nm red, 2.3 eV → ${gapWavelengthNm(2.3).toFixed(0)} nm green, 2.7 eV → ${gapWavelengthNm(2.7).toFixed(0)} nm blue. The material sets the colour, not the case.`, objects: [line(P(-4.4, -4.2), P(-0.6, -4.2), ROLE.reference, 0.02), ...leds, label('bigger gap → bluer light', P(-2.3, -0.4), ROLE.ink, 'detail')] },
      { narration: `Light in: a reverse-biased photodiode gives a current proportional to the light; silicon (E_g = ${SI_GAP} eV) stops responding beyond ${gapWavelengthNm(SI_GAP).toFixed(0)} nm. A solar cell needs no bias: its junction field separates the pairs, about 0.6 V, delivering power.`, objects: [label('photodiode: reverse bias, light → current', P(2.8, -1.4), ROLE.output, 'detail'), label(`Si cutoff ${gapWavelengthNm(SI_GAP).toFixed(0)} nm`, P(2.8, -2.2), ROLE.aid, 'detail'), label('solar cell: no bias, ≈ 0.6 V, power out', P(2.8, -3.2), ROLE.result, 'detail'), label(`LED resistor (5 V, 2.0 V, 20 mA): ${seriesResistor(5, 2.0, 0.02).toFixed(0)} Ω`, P(2.8, -4.2), ROLE.input, 'detail')] },
    ],
  }
}
