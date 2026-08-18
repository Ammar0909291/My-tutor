/**
 * A GENERATED FIGURE MUST BE DESCRIBED AS WHAT IT IS.
 *
 * `representation` is the word the tutor is handed for the figure on screen —
 * the visual contract renders it as "A <representation> of <concept> is
 * attached to THIS response and the learner can see it right now."
 *
 * For a GENERATED scene that word used to be read off the concept's registry
 * row. But `primary` there names a static CARD, chosen from the cards that
 * happen to exist, and for several subjects no card matches the scene at all.
 *
 * MEASURED across the registry:
 *   bio.gen.mendels-laws / monohybrid-cross / dihybrid-cross
 *        primary 'food_chain'  →  generator builds a PUNNETT SQUARE
 *   bio.cell.mitosis / meiosis / cell-division
 *        primary 'food_chain'  →  generator builds CELL DIVISION
 *   bio.mol.dna-structure / dna-replication
 *        primary 'food_chain'  →  generator builds DNA BASE PAIRING
 *   math.stat.mean-median-mode
 *        primary 'number_line' →  generator builds a BAR CHART
 *
 * The rows are not careless — there is no punnett or DNA card to name — but
 * the tutor was told it had a food chain in front of it, and the contract's
 * rules then instruct it to teach from what is on screen.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { join } from 'path'
import { ACTIVATED_SCENE_KINDS } from '@/lib/teaching/visual/conceptSceneParams'

const SRC = readFileSync(join(process.cwd(), 'src/lib/teaching/visual/resolveVisual.ts'), 'utf8')
const TABLE = SRC.slice(
  SRC.indexOf('const SCENE_KIND_REPRESENTATION'),
  SRC.indexOf('function representationForVisualType'),
)
const mapped = new Map(
  [...TABLE.matchAll(/^\s{2}([a-z_0-9]+):\s*'([a-z_]+)'/gm)].map((m) => [m[1], m[2]] as const),
)

describe('every activated generator says what it builds', () => {
  it('EVERY activated scene kind has an explicit representation', () => {
    // The invariant that stops a new generator inheriting a stale card's word.
    const missing = ACTIVATED_SCENE_KINDS.filter((k) => !mapped.has(k))
    expect(missing).toEqual([])
  })

  it('the generator kind is consulted BEFORE the registry card', () => {
    expect(SRC).toContain('const fromKind = generatorKind ? SCENE_KIND_REPRESENTATION[generatorKind] : undefined')
    expect(SRC).toContain('if (fromKind) return fromKind')
  })

  it('the registry card is still the fallback — agreeing concepts are unchanged', () => {
    const after = SRC.slice(SRC.indexOf('if (fromKind) return fromKind'))
    expect(after).toContain('const registryVisual = getConceptVisualType(ctx.conceptId)')
    expect(after).toContain('representationForVisualType(registryVisual)')
  })
})

describe('the specific mislabels this closes', () => {
  it('a Punnett square is a punnett, not a food chain', () => {
    expect(mapped.get('punnett_square')).toBe('punnett')
  })

  it('cell division is a cell, and DNA is dna', () => {
    expect(mapped.get('cell_division')).toBe('cell')
    expect(mapped.get('dna_structure')).toBe('dna')
  })

  it('a bar chart is a chart, not a number line', () => {
    expect(mapped.get('statistics_bar_chart')).toBe('chart')
  })

  it('NOT ONE OF THEM IS food_chain — except the ecological one, which is a pyramid', () => {
    const bio = ['punnett_square', 'cell_division', 'dna_structure', 'ecological_pyramid']
    for (const k of bio) expect(mapped.get(k)).not.toBe('food_chain')
    expect(mapped.get('ecological_pyramid')).toBe('ecological_pyramid')
  })

  it('kinematics graphs are motion graphs, which is more specific than "graph"', () => {
    expect(mapped.get('kinematics_graphs')).toBe('motion_graph')
    expect(mapped.get('calculus_graph')).toBe('graph')
  })
})
