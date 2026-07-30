import { describe, it, expect } from 'vitest'
import {
  readRRM,
  createRRMEntry,
  buildRRMSnapshotDelta,
  hasVisualBeenRendered,
  currentRenderedVisual,
  buildRenderedRealityBlock,
  type RRMEntry,
  type RRMLog,
} from '@/lib/teaching/renderedRealityModel'

// ---------------------------------------------------------------------------
// readRRM — snapshot deserialization
// ---------------------------------------------------------------------------

describe('readRRM', () => {
  it('returns empty array for null snapshot', () => {
    expect(readRRM(null)).toEqual([])
  })

  it('returns empty array for snapshot without renderedRealityLog', () => {
    expect(readRRM({ memoryContext: 'test' })).toEqual([])
  })

  it('returns empty array for non-array renderedRealityLog', () => {
    expect(readRRM({ renderedRealityLog: 'invalid' })).toEqual([])
  })

  it('parses valid entries', () => {
    const entry: RRMEntry = {
      visualIdentity: 'force_diagram',
      visualSemantics: 'Force Diagram: An object showing the direction and nature of forces acting on it',
      sourcePipeline: 'responseVisual',
      matchedConcept: 'phys.mech.newtons-second-law',
      turnPosition: 1,
    }
    const log = readRRM({ renderedRealityLog: [entry] })
    expect(log).toHaveLength(1)
    expect(log[0]).toEqual(entry)
  })

  it('filters out invalid entries from the log', () => {
    const valid: RRMEntry = {
      visualIdentity: 'number_line',
      visualSemantics: 'A number line from -10 to 10',
      sourcePipeline: 'detectedVisualSpec',
      matchedConcept: null,
      turnPosition: 2,
    }
    const log = readRRM({
      renderedRealityLog: [
        valid,
        { bad: 'entry' },
        null,
        42,
        { visualIdentity: 'x' },
      ],
    })
    expect(log).toHaveLength(1)
    expect(log[0]).toEqual(valid)
  })

  it('preserves existing snapshot fields (backward compat)', () => {
    const snapshot = {
      currentConceptNodeId: 'phys.mech.forces',
      memoryContext: 'test',
      renderedRealityLog: [],
    }
    expect(readRRM(snapshot)).toEqual([])
  })
})

// ---------------------------------------------------------------------------
// createRRMEntry — entry creation
// ---------------------------------------------------------------------------

describe('createRRMEntry', () => {
  it('returns null when no visual fired', () => {
    const entry = createRRMEntry({
      visualType: null,
      visualSpec: null,
      sceneSpec: null,
      dynamicVisualizationCode: null,
      responseVisual: null,
      matchedConcept: null,
      turnNumber: 1,
    })
    expect(entry).toBeNull()
  })

  it('creates entry for responseVisual with VISUAL_META semantics', () => {
    const entry = createRRMEntry({
      visualType: 'force_diagram',
      visualSpec: null,
      sceneSpec: null,
      dynamicVisualizationCode: null,
      responseVisual: 'force_diagram',
      matchedConcept: 'phys.mech.forces',
      turnNumber: 3,
    })
    expect(entry).not.toBeNull()
    expect(entry!.visualIdentity).toBe('force_diagram')
    expect(entry!.sourcePipeline).toBe('responseVisual')
    expect(entry!.matchedConcept).toBe('phys.mech.forces')
    expect(entry!.turnPosition).toBe(3)
    expect(entry!.visualSemantics).toContain('Force Diagram')
    expect(entry!.visualSemantics).toContain('direction and nature of forces')
  })

  it('creates entry for detectedVisualSpec (graph)', () => {
    const entry = createRRMEntry({
      visualType: null,
      visualSpec: { type: 'graph', equation: 'y = 2x + 1', title: 'Linear function' },
      sceneSpec: null,
      dynamicVisualizationCode: null,
      responseVisual: null,
      matchedConcept: 'math.func.linear',
      turnNumber: 2,
    })
    expect(entry).not.toBeNull()
    expect(entry!.visualIdentity).toBe('graph')
    expect(entry!.sourcePipeline).toBe('detectedVisualSpec')
    expect(entry!.visualSemantics).toContain('y = 2x + 1')
    expect(entry!.visualSemantics).toContain('Linear function')
  })

  it('creates entry for detectedVisualSpec (number_line)', () => {
    const entry = createRRMEntry({
      visualType: null,
      visualSpec: { type: 'number_line', start: -10, end: 10, highlight: [3, -5] },
      sceneSpec: null,
      dynamicVisualizationCode: null,
      responseVisual: null,
      matchedConcept: null,
      turnNumber: 1,
    })
    expect(entry).not.toBeNull()
    expect(entry!.visualSemantics).toContain('-10')
    expect(entry!.visualSemantics).toContain('10')
    expect(entry!.visualSemantics).toContain('3, -5')
  })

  it('creates entry for detectedVisualSpec (geometry)', () => {
    const entry = createRRMEntry({
      visualType: null,
      visualSpec: { type: 'geometry', shape: 'triangle' },
      sceneSpec: null,
      dynamicVisualizationCode: null,
      responseVisual: null,
      matchedConcept: null,
      turnNumber: 1,
    })
    expect(entry).not.toBeNull()
    expect(entry!.visualSemantics).toContain('triangle')
  })

  it('creates entry for detectedVisualSpec (process_flow)', () => {
    const entry = createRRMEntry({
      visualType: null,
      visualSpec: { type: 'process_flow', steps: ['a', 'b', 'c'] },
      sceneSpec: null,
      dynamicVisualizationCode: null,
      responseVisual: null,
      matchedConcept: null,
      turnNumber: 1,
    })
    expect(entry).not.toBeNull()
    expect(entry!.visualSemantics).toContain('3 steps')
  })

  it('creates entry for detectedSceneSpec', () => {
    const entry = createRRMEntry({
      visualType: null,
      visualSpec: null,
      sceneSpec: { id: 'projectile_motion', title: 'Projectile Motion Simulation' },
      dynamicVisualizationCode: null,
      responseVisual: null,
      matchedConcept: 'phys.mech.projectile-motion',
      turnNumber: 5,
    })
    expect(entry).not.toBeNull()
    expect(entry!.visualIdentity).toBe('projectile_motion')
    expect(entry!.sourcePipeline).toBe('detectedSceneSpec')
    expect(entry!.visualSemantics).toContain('Projectile Motion Simulation')
  })

  it('creates entry for dynamicVisualizationCode', () => {
    const entry = createRRMEntry({
      visualType: null,
      visualSpec: null,
      sceneSpec: null,
      dynamicVisualizationCode: '<ReactCode />',
      responseVisual: null,
      matchedConcept: 'chem.bond.covalent',
      turnNumber: 4,
    })
    expect(entry).not.toBeNull()
    expect(entry!.visualIdentity).toBe('dynamic_visualization')
    expect(entry!.sourcePipeline).toBe('dynamicVisualizationCode')
    expect(entry!.visualSemantics).toContain('dynamically generated')
  })

  it('prioritizes detectedVisualSpec over responseVisual (mirrors route.ts guard)', () => {
    const entry = createRRMEntry({
      visualType: 'force_diagram',
      visualSpec: { type: 'graph', equation: 'y = x^2' },
      sceneSpec: null,
      dynamicVisualizationCode: null,
      responseVisual: 'force_diagram',
      matchedConcept: null,
      turnNumber: 1,
    })
    expect(entry!.sourcePipeline).toBe('detectedVisualSpec')
  })

  it('handles unknown responseVisual type gracefully', () => {
    const entry = createRRMEntry({
      visualType: 'unknown_type_xyz',
      visualSpec: null,
      sceneSpec: null,
      dynamicVisualizationCode: null,
      responseVisual: 'unknown_type_xyz',
      matchedConcept: null,
      turnNumber: 1,
    })
    expect(entry).not.toBeNull()
    expect(entry!.visualSemantics).toContain('unknown_type_xyz')
  })
})

// ---------------------------------------------------------------------------
// buildRRMSnapshotDelta — persistence
// ---------------------------------------------------------------------------

describe('buildRRMSnapshotDelta', () => {
  it('wraps log in the correct snapshot key', () => {
    const log: RRMLog = [{
      visualIdentity: 'force_diagram',
      visualSemantics: 'test',
      sourcePipeline: 'responseVisual',
      matchedConcept: null,
      turnPosition: 1,
    }]
    const delta = buildRRMSnapshotDelta(log)
    expect(delta).toHaveProperty('renderedRealityLog')
    expect(delta.renderedRealityLog).toEqual(log)
  })

  it('produces empty array for empty log', () => {
    const delta = buildRRMSnapshotDelta([])
    expect(delta.renderedRealityLog).toEqual([])
  })
})

// ---------------------------------------------------------------------------
// hasVisualBeenRendered — ground-truth alreadyShown replacement
// ---------------------------------------------------------------------------

describe('hasVisualBeenRendered', () => {
  const log: RRMLog = [
    {
      visualIdentity: 'force_diagram',
      visualSemantics: 'test',
      sourcePipeline: 'responseVisual',
      matchedConcept: null,
      turnPosition: 1,
    },
    {
      visualIdentity: 'graph',
      visualSemantics: 'test',
      sourcePipeline: 'detectedVisualSpec',
      matchedConcept: null,
      turnPosition: 2,
    },
  ]

  it('returns true for a visual in the log', () => {
    expect(hasVisualBeenRendered(log, 'force_diagram')).toBe(true)
  })

  it('returns false for a visual NOT in the log', () => {
    expect(hasVisualBeenRendered(log, 'number_line')).toBe(false)
  })

  it('returns false for null visual type', () => {
    expect(hasVisualBeenRendered(log, null)).toBe(false)
  })

  it('returns false for empty log', () => {
    expect(hasVisualBeenRendered([], 'force_diagram')).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// currentRenderedVisual
// ---------------------------------------------------------------------------

describe('currentRenderedVisual', () => {
  it('returns null for empty log', () => {
    expect(currentRenderedVisual([])).toBeNull()
  })

  it('returns the last entry', () => {
    const log: RRMLog = [
      {
        visualIdentity: 'force_diagram',
        visualSemantics: 'first',
        sourcePipeline: 'responseVisual',
        matchedConcept: null,
        turnPosition: 1,
      },
      {
        visualIdentity: 'graph',
        visualSemantics: 'second',
        sourcePipeline: 'detectedVisualSpec',
        matchedConcept: null,
        turnPosition: 2,
      },
    ]
    expect(currentRenderedVisual(log)!.visualIdentity).toBe('graph')
  })
})

// ---------------------------------------------------------------------------
// buildRenderedRealityBlock — system prompt injection
// ---------------------------------------------------------------------------

describe('buildRenderedRealityBlock', () => {
  it('produces no-visual block for empty log', () => {
    const block = buildRenderedRealityBlock([])
    expect(block).toContain('No visual is currently displayed')
    expect(block).toContain('may NOT describe')
  })

  it('includes current visual details', () => {
    const log: RRMLog = [{
      visualIdentity: 'force_diagram',
      visualSemantics: 'Force Diagram: An object showing forces acting on it',
      sourcePipeline: 'responseVisual',
      matchedConcept: 'phys.mech.forces',
      turnPosition: 3,
    }]
    const block = buildRenderedRealityBlock(log)
    expect(block).toContain('RENDERED REALITY')
    expect(block).toContain('force_diagram')
    expect(block).toContain('Force Diagram: An object showing forces acting on it')
    expect(block).toContain('phys.mech.forces')
    expect(block).toContain('turn 3')
    expect(block).toContain('ONLY reference visual elements')
  })

  it('includes previous visuals history', () => {
    const log: RRMLog = [
      {
        visualIdentity: 'number_line',
        visualSemantics: 'A number line from -10 to 10',
        sourcePipeline: 'detectedVisualSpec',
        matchedConcept: null,
        turnPosition: 1,
      },
      {
        visualIdentity: 'force_diagram',
        visualSemantics: 'Forces on a block',
        sourcePipeline: 'responseVisual',
        matchedConcept: null,
        turnPosition: 3,
      },
    ]
    const block = buildRenderedRealityBlock(log)
    expect(block).toContain('CURRENT VISUAL (turn 3)')
    expect(block).toContain('PREVIOUS VISUALS THIS SESSION')
    expect(block).toContain('Turn 1: number_line')
  })

  it('caps history at 3 entries', () => {
    const entries: RRMLog = Array.from({ length: 6 }, (_, i) => ({
      visualIdentity: `visual_${i}`,
      visualSemantics: `Semantics ${i}`,
      sourcePipeline: 'responseVisual' as const,
      matchedConcept: null,
      turnPosition: i + 1,
    }))
    const block = buildRenderedRealityBlock(entries)
    expect(block).toContain('CURRENT VISUAL (turn 6)')
    expect(block).toContain('visual_2')
    expect(block).toContain('visual_3')
    expect(block).toContain('visual_4')
    expect(block).not.toContain('visual_0')
    expect(block).not.toContain('visual_1')
  })

  it('omits matched concept line when null', () => {
    const log: RRMLog = [{
      visualIdentity: 'graph',
      visualSemantics: 'A graph',
      sourcePipeline: 'detectedVisualSpec',
      matchedConcept: null,
      turnPosition: 1,
    }]
    const block = buildRenderedRealityBlock(log)
    expect(block).not.toContain('Matched concept')
  })

  it('handles discrepancy instruction', () => {
    const log: RRMLog = [{
      visualIdentity: 'force_diagram',
      visualSemantics: 'test',
      sourcePipeline: 'responseVisual',
      matchedConcept: null,
      turnPosition: 1,
    }]
    const block = buildRenderedRealityBlock(log)
    expect(block).toContain('discrepancy')
  })
})

// ---------------------------------------------------------------------------
// Transcript replay tests — ADR 15 failure class elimination
// ---------------------------------------------------------------------------

describe('transcript replay: visual mismatch prevention', () => {
  it('tutor cannot reference visual not in RRM (nonexistent objects)', () => {
    const block = buildRenderedRealityBlock([])
    expect(block).toContain('may NOT describe, reference, or ask questions about any diagram')
    expect(block).toContain('do NOT claim one is visible')
  })

  it('tutor references match rendered reality (visual mismatch eliminated)', () => {
    const log: RRMLog = [{
      visualIdentity: 'energy_level_diagram',
      visualSemantics: 'Energy Level Diagram: Atomic energy levels with absorption and emission transitions producing a spectral line',
      sourcePipeline: 'responseVisual',
      matchedConcept: 'phys.qm.quantum-numbers',
      turnPosition: 2,
    }]
    const block = buildRenderedRealityBlock(log)
    expect(block).toContain('energy_level_diagram')
    expect(block).toContain('Atomic energy levels')
    expect(block).toContain('absorption and emission transitions')
    expect(block).toContain('ONLY reference visual elements described above')
  })

  it('learner describing rendered UI: RRM provides comparison target', () => {
    const log: RRMLog = [{
      visualIdentity: 'three_molecular_shapes',
      visualSemantics: '3D Molecular Shapes: A 3D tetrahedral molecule built up from its atoms, bonds, overall geometry, labeled bond angles, and the final molecule',
      sourcePipeline: 'responseVisual',
      matchedConcept: 'chem.bond.molecular-geometry',
      turnPosition: 1,
    }]
    const block = buildRenderedRealityBlock(log)
    expect(block).toContain('tetrahedral molecule')
    expect(block).toContain('bond angles')
    expect(block).toContain('discrepancy rather than agreeing')
  })

  it('repeated recovery loops: RRM prevents confabulation source', () => {
    const log: RRMLog = [
      {
        visualIdentity: 'three_newton_forces',
        visualSemantics: "3D Newton's Forces: A 3D Newton's-laws simulation: an object, the gravity and normal force vectors, the net-force explanation, and the final balanced-force state",
        sourcePipeline: 'responseVisual',
        matchedConcept: 'phys.mech.conservative-forces',
        turnPosition: 1,
      },
    ]
    const block = buildRenderedRealityBlock(log)
    expect(block).toContain("Newton's Forces")
    expect(block).toContain('gravity and normal force vectors')
    expect(block).toContain('Do NOT invent')
  })

  it('repeated observation questions: RRM clarifies what is actually visible', () => {
    const emptyBlock = buildRenderedRealityBlock([])
    expect(emptyBlock).toContain('No visual is currently displayed')
    expect(emptyBlock).not.toContain('CURRENT VISUAL')

    const withVisual = buildRenderedRealityBlock([{
      visualIdentity: 'coordinate_plane',
      visualSemantics: 'Coordinate Plane: An x-y axis system for plotting points and lines',
      sourcePipeline: 'responseVisual',
      matchedConcept: null,
      turnPosition: 1,
    }])
    expect(withVisual).toContain('x-y axis system')
    expect(withVisual).toContain('CURRENT VISUAL')
  })

  it('Quantum Numbers transcript: energy level diagram correctly described', () => {
    const entry = createRRMEntry({
      visualType: 'energy_level_diagram',
      visualSpec: null,
      sceneSpec: null,
      dynamicVisualizationCode: null,
      responseVisual: 'energy_level_diagram',
      matchedConcept: 'phys.qm.quantum-numbers',
      turnNumber: 1,
    })
    expect(entry).not.toBeNull()
    expect(entry!.visualSemantics).toContain('Energy Level Diagram')
    expect(entry!.visualSemantics).toContain('absorption and emission transitions')

    const block = buildRenderedRealityBlock([entry!])
    expect(block).toContain('energy_level_diagram')
    expect(block).toContain('absorption and emission')
  })

  it('Molecular Orbital transcript: 3D molecular shapes correctly described', () => {
    const entry = createRRMEntry({
      visualType: 'three_molecular_shapes',
      visualSpec: null,
      sceneSpec: null,
      dynamicVisualizationCode: null,
      responseVisual: 'three_molecular_shapes',
      matchedConcept: 'chem.bond.molecular-geometry',
      turnNumber: 1,
    })
    expect(entry).not.toBeNull()
    expect(entry!.visualSemantics).toContain('3D Molecular Shapes')
    expect(entry!.visualSemantics).toContain('tetrahedral')

    const block = buildRenderedRealityBlock([entry!])
    expect(block).toContain('tetrahedral')
    expect(block).toContain('bond angles')
  })

  it('Conservative Forces transcript: force vectors correctly identified', () => {
    const entry = createRRMEntry({
      visualType: 'three_newton_forces',
      visualSpec: null,
      sceneSpec: null,
      dynamicVisualizationCode: null,
      responseVisual: 'three_newton_forces',
      matchedConcept: 'phys.mech.conservative-forces',
      turnNumber: 1,
    })
    expect(entry).not.toBeNull()
    expect(entry!.visualSemantics).toContain("Newton's Forces")
    expect(entry!.visualSemantics).toContain('gravity and normal force')
    expect(entry!.visualSemantics).toContain('balanced-force state')
  })
})

// ---------------------------------------------------------------------------
// Cross-turn perception continuity
// ---------------------------------------------------------------------------

describe('cross-turn perception continuity', () => {
  it('RRM accumulates across turns', () => {
    const turn1 = createRRMEntry({
      visualType: null,
      visualSpec: { type: 'graph', equation: 'y = x^2' },
      sceneSpec: null,
      dynamicVisualizationCode: null,
      responseVisual: null,
      matchedConcept: 'math.func.quadratic',
      turnNumber: 1,
    })!

    const logAfterTurn1: RRMLog = [turn1]
    const delta1 = buildRRMSnapshotDelta(logAfterTurn1)
    const restoredLog = readRRM({ renderedRealityLog: delta1.renderedRealityLog })
    expect(restoredLog).toHaveLength(1)

    const turn2 = createRRMEntry({
      visualType: 'force_diagram',
      visualSpec: null,
      sceneSpec: null,
      dynamicVisualizationCode: null,
      responseVisual: 'force_diagram',
      matchedConcept: 'phys.mech.forces',
      turnNumber: 2,
    })!

    const logAfterTurn2 = [...restoredLog, turn2]
    const block = buildRenderedRealityBlock(logAfterTurn2)
    expect(block).toContain('CURRENT VISUAL (turn 2)')
    expect(block).toContain('force_diagram')
    expect(block).toContain('PREVIOUS VISUALS')
    expect(block).toContain('Turn 1: graph')
  })

  it('session boundary: new session starts with empty RRM', () => {
    const freshLog = readRRM(null)
    expect(freshLog).toEqual([])
    const block = buildRenderedRealityBlock(freshLog)
    expect(block).toContain('No visual is currently displayed')
  })

  it('backward compat: old session without RRM field degrades gracefully', () => {
    const oldSnapshot = {
      currentConceptNodeId: 'phys.mech.forces',
      memoryContext: 'some context',
    }
    const log = readRRM(oldSnapshot)
    expect(log).toEqual([])
    const block = buildRenderedRealityBlock(log)
    expect(block).toContain('No visual is currently displayed')
  })
})

// ---------------------------------------------------------------------------
// Invariant enforcement
// ---------------------------------------------------------------------------

describe('ADR 15 invariants', () => {
  it('INV-1 (perception before reference): empty RRM prohibits visual references', () => {
    const block = buildRenderedRealityBlock([])
    expect(block).toContain('may NOT describe, reference, or ask questions')
  })

  it('INV-3 (semantic sufficiency): every entry has a non-empty semantic description', () => {
    const testCases = [
      { responseVisual: 'force_diagram' },
      { responseVisual: 'unknown_xyz' },
      { visualSpec: { type: 'graph', equation: 'y=x' } },
      { visualSpec: { type: 'number_line', start: 0, end: 10 } },
      { sceneSpec: { id: 'test', title: 'Test Scene' } },
      { dynamicVisualizationCode: 'code' },
    ]
    for (const tc of testCases) {
      const entry = createRRMEntry({
        visualType: null,
        visualSpec: null,
        sceneSpec: null,
        dynamicVisualizationCode: null,
        responseVisual: null,
        matchedConcept: null,
        turnNumber: 1,
        ...tc,
      })
      expect(entry, `Failed for ${JSON.stringify(tc)}`).not.toBeNull()
      expect(entry!.visualSemantics.length, `Empty semantics for ${JSON.stringify(tc)}`).toBeGreaterThan(0)
    }
  })

  it('INV-4 (session scope): readRRM from empty snapshot = empty log', () => {
    expect(readRRM({})).toEqual([])
    expect(readRRM(null)).toEqual([])
  })

  it('INV-5 (additive only): RRM absence produces no-visual block, not an error', () => {
    const block = buildRenderedRealityBlock([])
    expect(block).toBeTruthy()
    expect(block).toContain('No visual')
  })
})
