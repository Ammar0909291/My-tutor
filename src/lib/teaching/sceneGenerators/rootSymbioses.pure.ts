/**
 * Root symbioses — arbuscular vs ectomycorrhizal, and the rhizobium–legume nodule; authored for
 * bio.plant.mycorrhizae-plant-symbioses.
 *
 * WHY THIS EXISTS. The concept was served only the rhizobium–legume chain (root hair infection → nodule → low-oxygen
 * nodule → nitrogen fixation). The concept is "Mycorrhizae and Root Symbioses", and its Learning Objective opens with
 * the thing the figure omitted: "correctly distinguish arbuscular from ectomycorrhizal associations by WHERE the fungal
 * hyphae are located relative to root cells". Its Core Understanding is explicit that the rhizobium–legume symbiosis is "a
 * DIFFERENT, more specialised mutualism (between legume plants and rhizobium bacteria, not fungi)". A figure that drew one
 * half under the other's name implied they are the same relationship; this one draws both and keeps them apart.
 *
 * WHAT IT DRAWS, AND WHERE EACH CLAIM COMES FROM. Only what educational-brain/concepts/biology/
 * bio.plant.mycorrhizae-plant-symbioses.md states:
 *   · ARBUSCULAR: hyphae PENETRATE INTO the root cells and branch into tree-like arbuscules WITHIN the plant cell
 *     (outside the cell's own plasma membrane) — drawn as one hypha crossing a cell wall and branching inside it;
 *   · ECTOMYCORRHIZAL: hyphae stay OUTSIDE the cells — a dense sheath (mantle) around the root's exterior and a network
 *     BETWEEN the cells (the Hartig net), never inside one — drawn as a thick band on the surface and thin hyphae running
 *     down the cell walls;
 *   · the SHARED benefit: more absorptive surface for water and mineral uptake, in exchange for the plant's
 *     photosynthetically-derived sugars — two arrows, explained in the legend;
 *   · the RHIZOBIUM–LEGUME chain, in the entry's own order: root-hair infection, nodule formation, a low-oxygen nodule
 *     (leghaemoglobin binds free oxygen, protecting nitrogenase and still supplying the bacteria's respiration), then
 *     nitrogen fixation (nitrogenase turns N2 into ammonia, and works only because free oxygen is kept low).
 * The root cells are a stylised row of three; it is a schematic of WHERE the fungus is, not a micrograph. Nothing else
 * (no species, no nutrient quantities, no cell layers) is drawn.
 *
 * Seven stages: 1 arbuscular, 2 ectomycorrhizal, 3 the shared exchange, 4–7 the nodule chain. Six `label` objects in all
 * (the two panel titles, the three structures that carry the distinction, and the rhizobium heading); the chain's stage names
 * are node captions, as in every pathway figure.
 *
 * Pure and parameter-free.
 */

import type { SceneObject, SceneSpec, SceneStep, Vec3 } from '../sceneSpec'
import { ROLE, TIER, arrow } from './visualDesign'
import { round } from './shared'

const CELL = ROLE.result          // plant root cells
const HYPHA = ROLE.aid            // fungal hyphae
const WATER = ROLE.output         // water and minerals
const SUGAR = '#FFB020'           // sugars
const BACTERIA = '#2EC4B6'        // rhizobium

const Z = 0
const CELL_Y0 = -0.6
const CELL_Y1 = 1.8
const W = 1.25         // width of one root cell
// The arbuscule's widest twig (offset 0.8 in the sketch) reaches three quarters of the way to the cell wall: INSIDE the cell with clearance, never touching its wall
const K = (0.75 * (W / 2)) / 0.8

const noTrace = { trace: false } as const

function bond(id: string, a: [number, number], b: [number, number], color: string, thickness = 0.05): SceneObject {
  return { type: 'bond', id, from: [a[0], a[1], Z] as Vec3, to: [b[0], b[1], Z] as Vec3, color, thickness }
}

function hypha(id: string, pts: ReadonlyArray<[number, number]>, thickness = 0.07): SceneObject {
  return { type: 'path', id, points: pts.map((p) => [p[0], p[1], Z] as Vec3), color: HYPHA, thickness, radius: thickness * 0.8, properties: noTrace }
}

/** A row of three root cells: top and bottom walls plus four vertical walls. */
function cellRow(id: string, x0: number): SceneObject[] {
  const w = W
  const out: SceneObject[] = [
    bond(`${id}-top`, [x0, CELL_Y1], [x0 + 3 * w, CELL_Y1], CELL, 0.06),
    bond(`${id}-bottom`, [x0, CELL_Y0], [x0 + 3 * w, CELL_Y0], CELL, 0.06),
  ]
  for (let i = 0; i <= 3; i++) out.push(bond(`${id}-wall-${i}`, [x0 + i * w, CELL_Y0], [x0 + i * w, CELL_Y1], CELL, 0.06))
  return out
}

interface Pointer { id: string; text: string; at: [number, number]; pin: [number, number]; color: string; wrap?: number }

/** A label with a thin leader to the structure it names, and a small pin on it. */
function pointer(p: Pointer): SceneObject[] {
  const dx = p.pin[0] - p.at[0], dy = p.pin[1] - p.at[1]
  const len = Math.hypot(dx, dy) || 1
  const gap = 1.15 // clear of the label's own box (a leader starting inside it is an obstacle the solver moves the label away from)
  return [
    { type: 'label', id: p.id, position: [p.at[0], p.at[1], 0], text: p.text, color: p.color, size: TIER.detail, properties: { labelWrapUnits: p.wrap ?? 3.6 } },
    bond(`${p.id}-leader`, [round(p.at[0] + (dx / len) * gap), round(p.at[1] + (dy / len) * gap)], p.pin, ROLE.reference, 0.03),
    { type: 'node', id: `${p.id}-pin`, position: [p.pin[0], p.pin[1], Z], radius: 0.1, color: ROLE.ink },
  ]
}

const title = (id: string, text: string, at: [number, number]): SceneObject => (
  { type: 'label', id, position: [at[0], at[1], 0], text, color: HYPHA, size: TIER.primary, properties: { labelWrapUnits: 5.6 } }
)

export const ROOT_SYMBIOSES_SCENE_ID = 'root-symbioses'

export function buildRootSymbiosesScene(): SceneSpec {
  // ── stage 1: arbuscular — hyphae INSIDE the cells ───────────────────────────────────────────────────────────────
  const AM_X0 = -4.9
  const midX = AM_X0 + 1.5 * W                     // centre of the middle cell
  const arbuscular: SceneObject[] = [
    ...cellRow('am-cells', AM_X0),
    hypha('am-hypha', [[midX - 2.1, 4.0], [midX - 1.0, 3.3], [midX - 0.35, 2.6], [midX, CELL_Y1], [midX, 0.9]], 0.09),
    // the arbuscule: a tree branching WITHIN the middle cell, every twig inside its walls
    hypha('am-arbuscule-a', [[midX, 0.9], [midX - 0.55 * K, 0.25], [midX - 0.8 * K, -0.4]], 0.06),
    hypha('am-arbuscule-b', [[midX, 0.9], [midX + 0.55 * K, 0.25], [midX + 0.8 * K, -0.4]], 0.06),
    hypha('am-arbuscule-c', [[midX, 0.9], [midX, 0.15], [midX - 0.15 * K, -0.45]], 0.06),
    hypha('am-arbuscule-d', [[midX - 0.55 * K, 0.25], [midX - 0.25 * K, -0.35]], 0.05),
    hypha('am-arbuscule-e', [[midX + 0.55 * K, 0.25], [midX + 0.3 * K, -0.35]], 0.05),
    title('am-title', 'Arbuscular', [midX, 4.9]),
    ...pointer({ id: 'am-arbuscule-label', text: 'Arbuscule: branches INSIDE the cell', at: [midX, -2.4], pin: [midX, 0.1], color: HYPHA, wrap: 5.4 }),
  ]

  // ── stage 2: ectomycorrhizal — hyphae OUTSIDE the cells ─────────────────────────────────────────────────────────
  const EM_X0 = 1.15
  const emEnd = EM_X0 + 3 * W
  const emMid = EM_X0 + 1.5 * W
  const ectomycorrhizal: SceneObject[] = [
    ...cellRow('em-cells', EM_X0),
    // the mantle: a dense sheath on the OUTSIDE of the root, two thick bands side by side
    bond('em-mantle-a', [EM_X0 - 0.2, 2.15], [emEnd + 0.2, 2.15], HYPHA, 0.2),
    bond('em-mantle-b', [EM_X0 - 0.2, 2.5], [emEnd + 0.2, 2.5], HYPHA, 0.2),
    // the Hartig net: thin hyphae running down the walls BETWEEN the cells — never through one
    hypha('em-hartig-a', [[EM_X0 + W, 2.0], [EM_X0 + W + 0.15, 1.5], [EM_X0 + W - 0.1, 1.0], [EM_X0 + W + 0.1, 0.5], [EM_X0 + W, 0.0]], 0.05),
    hypha('em-hartig-b', [[EM_X0 + 2 * W, 2.0], [EM_X0 + 2 * W + 0.15, 1.5], [EM_X0 + 2 * W - 0.1, 1.0], [EM_X0 + 2 * W + 0.1, 0.5], [EM_X0 + 2 * W, 0.0]], 0.05),
    // hyphae reaching out into the soil from the mantle
    hypha('em-soil-a', [[EM_X0 + 0.4, 2.7], [EM_X0 + 0.2, 3.4], [EM_X0, 4.0]], 0.05),
    hypha('em-soil-b', [[EM_X0 + 1.0, 2.7], [EM_X0 + 1.1, 3.5], [EM_X0 + 0.9, 4.1]], 0.05),
    title('em-title', 'Ectomycorrhiza', [emMid, 4.9]),
    // the mantle's name is a caption on its own pin (a leader this short would start inside the label's box)
    { type: 'node', id: 'em-mantle-pin', position: [emEnd - 0.5, 2.3, Z], radius: 0.1, color: ROLE.ink, text: 'Mantle (outside)', properties: { labelOffset: [0, 1.15, 0], labelWrapUnits: 6 } },
    ...pointer({ id: 'em-hartig-label', text: 'Hartig net: BETWEEN the cells', at: [emMid + 0.3, -2.4], pin: [EM_X0 + 2 * W + 0.02, 0.5], color: HYPHA, wrap: 5.4 }),
  ]

  // ── stage 3: the shared benefit ───────────────────────────────────────────────────────────────────────────────
  const exchange: SceneObject[] = [
    arrow([AM_X0 - 0.45, 3.5, 0], [AM_X0 - 0.45, 2.1, 0], WATER),
    arrow([AM_X0 - 0.85, 2.1, 0], [AM_X0 - 0.85, 3.5, 0], SUGAR),
    arrow([EM_X0 - 0.75, 3.5, 0], [EM_X0 - 0.75, 2.1, 0], WATER),
    arrow([EM_X0 - 1.15, 2.1, 0], [EM_X0 - 1.15, 3.5, 0], SUGAR),
  ]

  // ── stages 4–7: the rhizobium–legume nodule ───────────────────────────────────────────────────────────────────
  const CHAIN_Y = -6.5
  const xs = [-4.2, -1.4, 1.4, 4.2]
  const stageNode = (i: number, text: string): SceneObject => ({
    type: 'node', id: `rhizobium-${i}`, position: [xs[i], CHAIN_Y, Z], radius: 0.45, color: BACTERIA, text,
    // the captions of neighbouring nodes are wider than the nodes are apart: alternate them over two rows
    properties: { labelOffset: [0, i % 2 === 0 ? -1.0 : -2.3, 0], labelWrapUnits: 3.2 },
  })
  const chainArrow = (i: number): SceneObject => arrow([xs[i - 1] + 0.7, CHAIN_Y, 0], [xs[i] - 0.7, CHAIN_Y, 0], ROLE.reference)
  const heading: SceneObject = {
    type: 'label', id: 'rhizobium-heading', position: [0, -4.8, 0], text: 'Rhizobium–legume nodule: a different partner, bacteria not fungi',
    color: BACTERIA, size: TIER.detail, properties: { labelWrapUnits: 9 },
  }
  const infection: SceneObject[] = [heading, stageNode(0, 'Root hair infection')]
  const nodule: SceneObject[] = [stageNode(1, 'Nodule formation'), chainArrow(1)]
  const lowOxygen: SceneObject[] = [stageNode(2, 'Low-oxygen nodule'), chainArrow(2)]
  const fixation: SceneObject[] = [stageNode(3, 'Nitrogen fixation'), chainArrow(3)]

  // Kept short: the "What's happening?" panel is cut at 1000 characters, in whole lines, so seven narrations must total less than that or the last
  // stages (the oxygen-protected nodule, the fixation itself) vanish from the panel.
  const steps: SceneStep[] = [
    {
      intent: 'establish',
      narration:
        'Arbuscular: hyphae PENETRATE INTO the root cells and branch into tree-like arbuscules WITHIN the cell (outside its plasma membrane), giving close contact for nutrient exchange.',
      objects: arbuscular,
    },
    {
      intent: 'relate',
      narration:
        'Ectomycorrhizal: hyphae stay OUTSIDE the cells, as a dense sheath (the mantle) on the root and a network BETWEEN the cells (the Hartig net). The difference is WHERE the hyphae are.',
      objects: ectomycorrhizal,
    },
    {
      intent: 'relate',
      narration: 'Shared benefit: more absorptive surface for water and minerals, in exchange for the plant\'s sugars.',
      objects: exchange,
    },
    {
      intent: 'establish',
      narration: 'A DIFFERENT partner, bacteria not fungi: rhizobium infect the root hairs of a legume.',
      objects: infection,
    },
    {
      intent: 'relate',
      narration: 'Infection triggers nodule formation: root structures that house the bacteria.',
      objects: nodule,
    },
    {
      intent: 'relate',
      narration:
        'Nitrogenase is IRREVERSIBLY INACTIVATED by oxygen, so the nodule must stay low in free oxygen: plant-made leghaemoglobin binds it tightly yet still supplies oxygen for the bacteria\'s respiration.',
      objects: lowOxygen,
    },
    {
      intent: 'resolve',
      narration: 'Nitrogenase converts atmospheric N2 into ammonia (nitrogen fixation), working only because free oxygen is kept low.',
      objects: fixation,
    },
  ]

  return {
    id: ROOT_SYMBIOSES_SCENE_ID,
    title: 'Root Symbioses: Mycorrhizae and the Rhizobium–Legume Nodule',
    sceneType: 'diagram',
    teachingGoal:
      'Arbuscular and ectomycorrhizal fungi differ in WHERE their hyphae are relative to the root cells (inside, forming arbuscules, versus outside, as a mantle and Hartig net) while giving ' +
      'the same benefit; the rhizobium–legume nodule is a different, bacterial partnership in which leghaemoglobin\'s oxygen binding is what lets nitrogenase fix nitrogen.',
    cameraDistance: 18,
    ariaLabel:
      'Three root partnerships. Arbuscular mycorrhiza: a fungal hypha crosses a root cell wall and branches inside the cell. Ectomycorrhiza: a thick sheath of hyphae on the outside of the root and thin hyphae ' +
      'between the cells, none entering a cell. Both give the plant water and minerals and take sugars. Below, a different partnership with bacteria: root hair infection, nodule formation, a low-oxygen nodule, nitrogen fixation.',
    explainer: {
      legend: [
        { label: 'Plant root cells', color: CELL, shape: 'line' },
        { label: 'Fungal hyphae', color: HYPHA, shape: 'line' },
        { label: 'Water and minerals: fungus → plant', color: WATER, shape: 'arrow' },
        { label: 'Sugars: plant → fungus', color: SUGAR, shape: 'arrow' },
        { label: 'Rhizobium bacteria (nodule)', color: BACTERIA, shape: 'dot' },
      ],
      insight: {
        heading: 'Two kinds of mycorrhiza, and a different partner',
        bullets: [
          'Arbuscular: hyphae enter the root cells and branch into arbuscules. Ectomycorrhizal: hyphae stay outside, as a mantle and a Hartig net.',
          'Both extend the root\'s absorbing surface for water and minerals, in exchange for plant sugars.',
          'The rhizobium–legume nodule is bacteria, not fungi: nitrogenase fixes N2 only while leghaemoglobin keeps free oxygen low.',
        ],
      },
    },
    steps,
  }
}
