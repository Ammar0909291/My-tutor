/**
 * Physics visual gap campaign, batch 14 (2026-09-30): the last physics concept,
 * phys.mech.power — kept unauthored until now as the no-asset live-generation
 * test fixture (the fixtures moved to a chemistry concept in the same commit).
 * Same rules as physicsCoreScenes.ts.
 */

import type { SceneSpec } from '@/lib/teaching/sceneSpec'
import { ROLE, arrow, dot, label, line } from './visualDesign'
import { P, rect } from './physicsCoreScenes'

/**
 * KG: "Power is the rate at which work is done or energy is transferred,
 * measured in watts." A 50 kg load lifted 6 m: W = mgh = 2943 J. A motor that
 * takes 12 s delivers 245 W; one that takes 6 s delivers twice that. On a
 * work–time graph the power is the slope.
 */
export const LIFT = { m: 50, g: 9.81, h: 6, tSlow: 12, tFast: 6 }
export function liftWork(): number { return LIFT.m * LIFT.g * LIFT.h }
export function power(work: number, t: number): number { return work / t }
export function buildPowerScene(): SceneSpec {
  const W = liftWork(), Ps = Math.round(power(W, LIFT.tSlow)), Pf = Math.round(power(W, LIFT.tFast))
  const HY = 0.7, B0 = -2.9, BH = 0.8, BX0 = -3.4, BX1 = -2.4, top = B0 + HY * LIFT.h
  const GX0 = 0.6, GY0 = -2.6, ST = 0.3, SW = 0.0015
  const gx = (t: number) => GX0 + t * ST, gy = (w: number) => GY0 + w * SW
  return {
    id: 'phys-power',
    title: 'Power: how fast work is done',
    sceneType: 'diagram',
    cameraDistance: 13,
    teachingGoal: 'Show power as the rate of doing work: lifting the same 50 kg load 6 m always takes W = mgh = 2943 J, but a motor that does it in 6 s has twice the power of one that takes 12 s — on a work–time graph, power is the slope.',
    ariaLabel: 'Left: a load raised six metres by a rope over a pulley. Right: a graph of work done against time. Two straight lines both reach 2943 joules: the slow motor after 12 seconds, the fast one after 6 seconds, which is twice as steep and then stays flat.',
    steps: [
      { narration: `A motor lifts a ${LIFT.m} kg load through ${LIFT.h} m. The work done against gravity is W = mgh = ${LIFT.m} × ${LIFT.g} × ${LIFT.h} = ${Math.round(W)} J, however long it takes.`, objects: [line(P(-4.4, B0 - 0.05), P(-1.4, B0 - 0.05), ROLE.reference, 0.05), ...rect(BX0, B0, BX1, B0 + BH, ROLE.aid), ...rect(BX0, top, BX1, top + BH, ROLE.output), dot(P((BX0 + BX1) / 2, top + BH + 0.9), ROLE.ink, 0.2), line(P((BX0 + BX1) / 2, top + BH), P((BX0 + BX1) / 2, top + BH + 0.9), ROLE.ink, 0.03), arrow(P(-1.9, B0 + BH / 2), P(-1.9, top + BH / 2), ROLE.aid), label(`h = ${LIFT.h} m`, P(-1.1, (B0 + top) / 2 + BH / 2), ROLE.aid, 'detail'), label(`m = ${LIFT.m} kg`, P((BX0 + BX1) / 2, B0 - 0.5), ROLE.ink, 'detail')] },
      { narration: `Plot the work done against time. The slow motor takes ${LIFT.tSlow} s: a straight line to ${Math.round(W)} J.`, objects: [arrow(P(GX0, GY0), P(gx(13) + 0.3, GY0), ROLE.reference), arrow(P(GX0, GY0), P(GX0, gy(3300)), ROLE.reference), label('time t (s)', P(gx(12), GY0 - 0.5), ROLE.ink, 'detail'), label('work W (J)', P(GX0 + 1.0, gy(3300) + 0.35), ROLE.ink, 'detail'), line(P(gx(0), gy(0)), P(gx(LIFT.tSlow), gy(W)), ROLE.output, 0.05), label(`slow: ${Ps} W`, P(gx(LIFT.tSlow) + 0.4, gy(W) - 0.9), ROLE.output, 'detail')] },
      { narration: `The fast motor does the same ${Math.round(W)} J in ${LIFT.tFast} s — twice as steep, twice the power. Power is the slope of the work–time graph: P = W/t.`, objects: [line(P(gx(0), gy(0)), P(gx(LIFT.tFast), gy(W)), ROLE.input, 0.05), line(P(gx(LIFT.tFast), gy(W)), P(gx(13), gy(W)), ROLE.input, 0.03), label(`fast: ${Pf} W`, P(gx(9.5), gy(W) + 0.4), ROLE.input, 'detail'), label(`P = W/t = ${Math.round(W)} J / ${LIFT.tSlow} s = ${Ps} W`, P(0, 3.6), ROLE.result, 'primary')] },
    ],
  }
}
