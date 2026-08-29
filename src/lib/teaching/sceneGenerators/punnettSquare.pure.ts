/**
 * punnettSquare — the PURE half (geometry, validation, consistency check).
 *
 * Split out of the module of the same name, whose remaining half is the LLM
 * parameter extractor. The split has ONE purpose: these builders must be
 * runnable in a BROWSER, so a learner can vary a parameter and see the figure
 * re-derived by the identical code that produced the one they were given.
 * `@/lib/ai/client` reaches the provider router, the AI budget and the rate
 * limiter — a server graph that must never enter a client bundle.
 *
 * Nothing about the geometry, the formulae or the checks changed in the split.
 * The original module re-exports everything here, so every existing importer
 * — the router, the harness scripts, the tests — is untouched.
 *
 * Purity is enforced by src/tests/sceneGeneratorPurity.test.ts, not by this
 * comment.
 */

import type { SceneObject, SceneSpec, Vec3 } from '../sceneSpec'
import { round, type ConsistencyResult } from './shared'

// ── Parameters (the ONLY thing the LLM extracts) ─────────────────────────────

export interface PunnettParams {
  /** Two-letter genotype, e.g. "Aa", "AA", "aa" — both letters must be the same letter (any case). */
  parent1Genotype: string
  /** Same constraints as parent1Genotype, and must use the SAME letter as parent1. */
  parent2Genotype: string
}

function isValidGenotype(g: unknown, letter?: string): g is string {
  if (typeof g !== 'string' || g.length !== 2) return false
  const chars = g.split('')
  const [c1, c2] = chars.map((c) => c.toLowerCase())
  if (c1 !== c2) return false
  if (letter && c1 !== letter.toLowerCase()) return false
  // At least one of the two characters must be uppercase OR both lowercase — i.e. valid
  // case combinations are AA, Aa, aA, aa (any order/case of the same letter).
  return true
}

export function validatePunnettParams(raw: unknown): PunnettParams | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>

  if (!isValidGenotype(o.parent1Genotype)) return null
  const letter = (o.parent1Genotype as string)[0].toLowerCase()
  if (!isValidGenotype(o.parent2Genotype, letter)) return null

  return { parent1Genotype: o.parent1Genotype as string, parent2Genotype: o.parent2Genotype as string }
}

// ── Deterministic genetics (allele combinatorics; never LLM-generated) ───────

/** Canonical form: dominant (uppercase) allele first if mixed, e.g. "aA" -> "Aa". */
function canonicalize(genotype: string): string {
  const [a, b] = genotype.split('')
  if (a === a.toUpperCase() && b !== b.toUpperCase()) return a + b
  if (b === b.toUpperCase() && a !== a.toUpperCase()) return b + a
  return a + b
}

function isDominantPhenotype(genotype: string): boolean {
  return genotype.split('').some((c) => c === c.toUpperCase())
}

interface PunnettGrid {
  /** Row/column alleles for each parent, e.g. parent1Alleles = ['A', 'a']. */
  parent1Alleles: string[]
  parent2Alleles: string[]
  /** 2x2 grid of canonicalized offspring genotypes: cells[row][col]. */
  cells: string[][]
  dominantCount: number
  recessiveCount: number
}

function buildGrid(p: PunnettParams): PunnettGrid {
  const parent1Alleles = p.parent1Genotype.split('')
  const parent2Alleles = p.parent2Genotype.split('')
  const cells = parent1Alleles.map((a) => parent2Alleles.map((b) => canonicalize(a + b)))
  const flat = cells.flat()
  const dominantCount = flat.filter(isDominantPhenotype).length
  const recessiveCount = flat.length - dominantCount
  return { parent1Alleles, parent2Alleles, cells, dominantCount, recessiveCount }
}

const CELL_SIZE = 6

/** Build a 3-step Punnett-square SceneSpec: the parents, the filled grid, then the phenotype ratio. */
export function buildPunnettSquareScene(params: PunnettParams): SceneSpec {
  const grid = buildGrid(params)
  const dominantLetter = params.parent1Genotype[0].toUpperCase()
  const recessiveLetter = dominantLetter.toLowerCase()

  const cellObjects: SceneObject[] = []
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 2; col++) {
      const x = round((col + 0.5) * CELL_SIZE)
      const y = round(-(row + 0.5) * CELL_SIZE)
      const genotype = grid.cells[row][col]
      cellObjects.push({
        type: 'label',
        id: `cell-${row}-${col}`,
        position: [x, y, 0],
        text: genotype,
        color: isDominantPhenotype(genotype) ? '#3b82f6' : '#ef4444',
      })
    }
  }

  const headerObjects: SceneObject[] = [
    { type: 'label', id: 'header-col-0', position: [round(0.5 * CELL_SIZE), round(CELL_SIZE * 0.4), 0], text: grid.parent2Alleles[0], color: '#22c55e' },
    { type: 'label', id: 'header-col-1', position: [round(1.5 * CELL_SIZE), round(CELL_SIZE * 0.4), 0], text: grid.parent2Alleles[1], color: '#22c55e' },
    { type: 'label', id: 'header-row-0', position: [round(-CELL_SIZE * 0.4), round(-0.5 * CELL_SIZE), 0], text: grid.parent1Alleles[0], color: '#f59e0b' },
    { type: 'label', id: 'header-row-1', position: [round(-CELL_SIZE * 0.4), round(-1.5 * CELL_SIZE), 0], text: grid.parent1Alleles[1], color: '#f59e0b' },
  ]

  const ratioPos: Vec3 = [round(CELL_SIZE), round(-2.5 * CELL_SIZE), 0]

  return {
    id: `punnett-${params.parent1Genotype}-${params.parent2Genotype}`,
    title: `Punnett Square: ${params.parent1Genotype} × ${params.parent2Genotype}`,
    sceneType: 'diagram',
    teachingGoal: 'Show how each parent’s alleles combine in a Punnett square to determine the genotype and phenotype ratio of the offspring.',
    cameraDistance: CELL_SIZE * 8,
    ariaLabel: `A 2 by 2 Punnett square crossing ${params.parent1Genotype} with ${params.parent2Genotype}, showing all four offspring genotypes.`,
    steps: [
      {
        narration: `Parent 1 has genotype ${params.parent1Genotype} (alleles ${grid.parent1Alleles.join(', ')}). Parent 2 has genotype ${params.parent2Genotype} (alleles ${grid.parent2Alleles.join(', ')}).`,
        objects: headerObjects,
      },
      {
        narration: `Each parent's alleles combine across the grid: ${grid.cells.flat().join(', ')} — the four possible offspring genotypes.`,
        objects: cellObjects,
      },
      {
        narration: `Since ${dominantLetter} is dominant over ${recessiveLetter}, the phenotype ratio is ${grid.dominantCount} dominant : ${grid.recessiveCount} recessive out of 4 offspring.`,
        objects: [
          { type: 'label', id: 'ratio', position: ratioPos, text: `${grid.dominantCount} dominant : ${grid.recessiveCount} recessive`, color: '#ef4444' },
        ],
      },
    ],
  }
}

// ── Safety-net consistency checker (deterministic, independent re-derivation) ─

export function checkPunnettConsistency(spec: SceneSpec, params: PunnettParams): ConsistencyResult {
  const errors: string[] = []
  const objs = spec.steps.flatMap((s) => s.objects)
  const grid = buildGrid(params)

  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 2; col++) {
      const cell = objs.find((o) => o.id === `cell-${row}-${col}`)
      if (!cell) {
        errors.push(`missing cell-${row}-${col}`)
        continue
      }
      if (cell.text !== grid.cells[row][col]) {
        errors.push(`cell-${row}-${col} text "${cell.text}" does not match re-derived "${grid.cells[row][col]}"`)
      }
    }
  }

  const ratio = objs.find((o) => o.id === 'ratio')
  const expectedRatio = `${grid.dominantCount} dominant : ${grid.recessiveCount} recessive`
  if (ratio?.text !== expectedRatio) {
    errors.push(`ratio label "${ratio?.text}" does not match re-derived "${expectedRatio}"`)
  }

  return { ok: errors.length === 0, errors }
}

